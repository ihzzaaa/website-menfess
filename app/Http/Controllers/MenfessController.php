<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MenfessPost;
use App\Models\MenfessComment;
use App\Models\MenfessAlias;
use App\Models\AliasPool;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;
use App\Jobs\SendWhatsAppBroadcast;

class MenfessController extends Controller
{
    /**
     * Menampilkan timeline feed utama Menfess
     */
    public function index(Request $request)
    {
        // Menarik data termasuk Post asli jika si post tersebut adalah hasil sebuah Repost.
        $query = MenfessPost::with(['originalPost'])->withCount(['comments'])
            ->where('is_visible', true)
            ->where('status', 'active');
        
        // Sorting filter (Trending vs Terbaru)
        if ($request->input('sort') === 'trending') {
            $query->orderByDesc('upvote_count')->orderByDesc('created_at');
        } else {
            $query->latest();
        }

        $posts = $query->paginate(15);
        
        // Hilangkan data identitas user pengirim demi anonimitas di Frontend
        $posts->getCollection()->transform(function ($post) {
            $post->makeHidden(['user_id']);
            return $post;
        });

        // Ihza akan merender halaman ini di react (folder: resources/js/pages/Main/MenfessFeed)
        return Inertia::render('Main/MenfessFeed', [
            'posts' => $posts,
            'filter' => $request->only('sort')
        ]);
    }

    /**
     * Tampilan detail satu post Menfess beserta komentarnya
     */
    public function show(MenfessPost $post)
    {
        if (!$post->is_visible || $post->status !== 'active') {
            abort(404);
        }

        $post->loadCount(['comments']);
        $post->makeHidden(['user_id']);

        // Ambil comments secara ascending (dari terlama ke terbaru)
        $comments = MenfessComment::where('menfess_post_id', $post->id)
            ->where('is_visible', true)
            ->where('status', 'active')
            ->orderBy('created_at', 'asc')
            ->get();
            
        // Map alias_name untuk tiap user ke dalam komentar (agar user_id tetap anonim di view)
        $comments->transform(function ($comment) use ($post) {
            $alias = MenfessAlias::where('menfess_post_id', $post->id)
                                 ->where('user_id', $comment->user_id)
                                 ->first();
            $comment->author_alias = $alias ? $alias->alias_name : 'Anonymous';
            $comment->makeHidden(['user_id']);
            return $comment;
        });

        return Inertia::render('Main/MenfessDetail', [
            'post' => $post,
            'comments' => $comments
        ]);
    }

    /**
     * Post Menfess Baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            // File media dipelajari di kesempatan selanjutnya
        ]);

        $filteredContent = $this->applyWordFilter($request->input('content'));

        $post = MenfessPost::create([
            'user_id' => Auth::check() ? Auth::id() : 1, // Fallback untuk testing sebelum fortify berjalan penuh di front
            'content' => $filteredContent,
            'upvote_count' => 0,
            'downvote_count' => 0,
            'comment_count' => 0,
            'share_count' => 0,
            'is_visible' => true,
            'status' => 'active',
        ]);

        // FITUR GAMIFIKASI: Berikan ++Koin jika user yg mendaftar ikut memposting
        if (Auth::check()) {
            \App\Models\PointTransaction::create([
                'user_id' => Auth::id(),
                'amount' => 1, 
                'type' => 'earn',
                'description' => 'Menerbitkan Kiriman / Thread Menfess Baru',
                'reference_type' => MenfessPost::class,
                'reference_id' => $post->id
            ]);
        }

        // PELATUK TRIGGER BROADCAST WHATSAPP (Akan ditangani pekerja backend Server secraa damai)
        SendWhatsAppBroadcast::dispatch($filteredContent, $post->id, 'post');

        return redirect()->route('menfess.index')->with('success', 'Pesan menfess berhasil mengudara terbang angin kawan!');
    }

    /**
     * Kirim Balasan (Komentar) dalam Post Menfess
     */
    public function reply(Request $request, MenfessPost $post)
    {
        $request->validate([
            'content' => 'required|string|max:500',
        ]);

        $userId = Auth::check() ? Auth::id() : 1; 

        // Generate atau dapatkan alias nama untuk thread ini
        $alias = MenfessAlias::where('user_id', $userId)
            ->where('menfess_post_id', $post->id)
            ->first();

        if (!$alias) {
            $aliasName = $this->generateAlias($post, $userId);
            MenfessAlias::create([
                'user_id' => $userId,
                'menfess_post_id' => $post->id,
                'alias_name' => $aliasName,
            ]);
        }

        $filteredContent = $this->applyWordFilter($request->input('content'));

        $comment = MenfessComment::create([
            'menfess_post_id' => $post->id,
            'user_id' => $userId,
            'content' => $filteredContent,
            'is_visible' => true,
            'status' => 'active',
        ]);

        $post->increment('comment_count');

        // FITUR GAMIFIKASI: Berikan ++Koin apresiasi karena berinteraksi
        if (Auth::check()) {
            \App\Models\PointTransaction::create([
                'user_id' => Auth::id(),
                'amount' => 1, 
                'type' => 'earn',
                'description' => 'Membalas cuitan pengguna lain',
                'reference_type' => MenfessComment::class,
                'reference_id' => $comment->id
            ]);
        }

        // PELATUK TRIGGER BROADCAST WHATSAPP (Khusus komentar / orang nimbrung)
        SendWhatsAppBroadcast::dispatch($filteredContent, $post->id, 'reply');

        if ($post->user_id && $post->user_id !== $userId) {
            $post->user->notify(new \App\Notifications\MenfessReplyNotification(
                $request->input('content'), 
                $alias->alias_name ?? 'Seseorang', 
                url('/menfess/' . $post->id)
            ));
        }

        return back()->with('success', 'Berhasil ikut menunggangi balasan!');
    }

    /**
     * Vote sebuah Post
     */
    public function votePost(Request $request, MenfessPost $post)
    {
        return $this->handleVote($post, $request->input('type', 'up'));
    }

    /**
     * Vote sebuah Komentar
     */
    public function voteComment(Request $request, MenfessComment $comment)
    {
        return $this->handleVote($comment, $request->input('type', 'up'));
    }

    /**
     * Main Core Logic untuk mencegah double vote
     */
    private function handleVote($model, $type)
    {
        $userId = Auth::check() ? Auth::id() : 1;
        $vote = Vote::where('user_id', $userId)
            ->where('votable_id', $model->id)
            ->where('votable_type', get_class($model))
            ->first();

        if ($vote) {
            if ($vote->type === $type) {
                // User klik ulang, remove vote nya (Toggle)
                $vote->delete();
                $model->decrement($type === 'up' ? 'upvote_count' : 'downvote_count');
            } else {
                // User mengubah preferensi vote
                $model->decrement($vote->type === 'up' ? 'upvote_count' : 'downvote_count');
                $vote->update(['type' => $type]);
                $model->increment($type === 'up' ? 'upvote_count' : 'downvote_count');
            }
            return back();
        }

        Vote::create([
            'user_id' => $userId,
            'votable_id' => $model->id,
            'votable_type' => get_class($model),
            'type' => $type
        ]);

        $model->increment($type === 'up' ? 'upvote_count' : 'downvote_count');
        return back();
    }

    /**
     * Alokasi Random Nama Pool atau Tetapkan sbg "TS"
     */
    private function generateAlias(MenfessPost $post, $userId)
    {
        if ($post->user_id === $userId) {
            return 'TS / Sender'; // Sang Pembuat Postingan
        }

        // Ambil random 1 nama dan kata sifat dari Pool yang di seed
        $pool = AliasPool::where('is_active', true)->inRandomOrder()->first();
        $name = $pool ? ($pool->adjective . ' ' . $pool->noun) : 'Anonim User';
        
        $exists = MenfessAlias::where('menfess_post_id', $post->id)->where('alias_name', $name)->exists();
        if ($exists) {
            return $name . ' ' . rand(1, 999);
        }
        
        return $name;
    }

    /**
     * Membagikan Postingan Menfess (Generate Share Token)
     */
    public function share(Request $request, MenfessPost $post)
    {
        $token = \Illuminate\Support\Str::random(10);
        
        \App\Models\MenfessShare::create([
            'menfess_post_id' => $post->id,
            'share_token' => $token,
        ]);

        $post->increment('share_count');

        $shareUrl = url('/s/' . $token); // Ihza dapat mencegat endpoint /s/token ini di frontend
        
        return back()->with('success', 'Tautan berhasil disalin!')->with('share_url', $shareUrl);
    }

    /**
     * Merepost Menfess
     */
    public function repost(Request $request, MenfessPost $post)
    {
        $request->validate([
            'repost_comment' => 'nullable|string|max:500',
        ]);

        $originalId = $post->is_repost ? $post->original_post_id : $post->id;

        MenfessPost::create([
            'user_id' => Auth::check() ? Auth::id() : 1,
            'content' => '', 
            'upvote_count' => 0,
            'downvote_count' => 0,
            'comment_count' => 0,
            'share_count' => 0,
            'is_visible' => true,
            'status' => 'active',
            'is_repost' => true,
            'original_post_id' => $originalId,
            'repost_comment' => $request->repost_comment,
        ]);

        return redirect()->route('menfess.index')->with('success', 'Menfess ini berhasil kamu post ulang di dindingmu!');
    }

    /**
     * Share Menfess ke Bursa WTB Marketplace
     */
    public function shareToMarketplace(Request $request, MenfessPost $post)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id'
        ]);

        // Verifikasi identitas. Hanya Sender asli yang bisa mendaftarkannya ke WTB
        $userId = Auth::check() ? Auth::id() : 1;
        if ($post->user_id !== $userId) {
            return back()->with('error', 'Hanya Pengirim asli curhatan ini yang berhak memasukkannya ke bursa Marketplace WTB.');
        }

        $post->update([
            'marketplace_category_id' => $request->category_id
        ]);

        return redirect()->route('marketplace.index')->with('success', 'Pesanmu sukses ditempel di Mading WTB Marketplace!');
    }

    /**
     * Membeli Hak Istimewa (VIP Pin) Menggunakan Mata Uang Koin Gamifikasi
     */
    public function pin(Request $request, MenfessPost $post)
    {
        $user = Auth::user();

        // 1. Validasi Kepemilikan 
        if ($post->user_id !== $user->id && $user->id !== 1) {
            return back()->with('error', 'Hanya pengirim asli yang bisa memasang status VIP Pinned pada curhatannya sedniri.');
        }

        // 2. Proteksi Anti Double-Bayar
        if ($post->is_pinned && $post->pinned_until > now()) {
            return back()->with('error', 'Curhatan ini sedang menikmati masa tayang VIP hingga ' . $post->pinned_until->diffForHumans());
        }

        // 3. Validasi Cek Dompet Koin (Harga: 50 Koin Virtual)
        $cost = 50;
        if ($user->coin_balance < $cost) {
            return back()->with('error', 'Koinmu tidak cukup! Kamu butuh 50 koin untuk fitur Pinned. Rajinlah membalas curhatan orang lain tiap hari untuk dapat +1 koin/balasan.');
        }

        // 4. Pelunasan & Bakar Koin
        \App\Models\PointTransaction::create([
            'user_id' => $user->id,
            'amount' => $cost,
            'type' => 'spend',
            'description' => 'Membeli Hak Tayang VIP Pinned (24 Jam)',
            'reference_type' => MenfessPost::class,
            'reference_id' => $post->id
        ]);

        // 5. Berikan efek 
        $post->update([
            'is_pinned' => true,
            'pinned_until' => now()->addHours(24)
        ]);

        return back()->with('success', 'Tahta berhasil direbut! Menfessmu akan tak terkalahkan di posisi teratas selama 24 Jam.');
    }

    /**
     * Engine Moderasi: Sensor Kata Kotor (Word Filter)
     */
    private function applyWordFilter(string $content): string
    {
        // Cache data kamus kata kotor selama 1 jam agar database tidak dijebol
        $filters = \Illuminate\Support\Facades\Cache::remember('word_filters', 3600, function () {
            return \App\Models\WordFilter::where('is_active', true)->get();
        });

        foreach ($filters as $filter) {
            // Jika admin tidak mendefinisikan replacement, gunakan sensor asterisk ***
            $replacement = $filter->replacement ?? str_repeat('*', mb_strlen($filter->word));
            
            // Replaces kata (case-insensitive) menggunakan str_ireplace lebih aman untuk bahasa gaul
            $content = str_ireplace($filter->word, $replacement, $content);
        }

        return $content;
    }
}
