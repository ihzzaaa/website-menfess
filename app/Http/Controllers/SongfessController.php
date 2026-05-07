<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SongfessMessage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;

class SongfessController extends Controller
{
    /**
     * Tampilkan Feed Songfess Public
     */
    public function index(Request $request)
    {
        $query = SongfessMessage::where('status', 'approved');

        // PENGEMBANGAN: Fitur Dedicated Recipient Search
        // Pengguna bisa mengetik namanya (misal: "Helmi") untuk mencari apakah ada orang yang mengirimkan lagufess untuk mereka.
        if ($search = $request->input('search_name')) {
            $query->where('recipient_name', 'ilike', '%' . $search . '%');
        }

        $messages = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Main/SongfessFeed', [
            'messages' => $messages,
            'filters' => $request->only(['search_name'])
        ]);
    }

    /**
     * Endpoint penyimpanan pengiriman lagu
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipient_name' => 'required|string|max:255',
            'song_title' => 'required|string|max:255',
            'artist_name' => 'required|string|max:255',
            'album_art' => 'nullable|url',
            'message' => 'required|string|max:1000',
            'is_anonymous' => 'boolean',
        ]);

        // Kalau anonim, nama disamarkan, kalau tidak, pakai nama asli (atau inputan Frontend via form terpisah juga boleh)
        $isAnonymous = $request->boolean('is_anonymous', true);
        $validated['sender_name'] = $isAnonymous ? 'Seseorang' : (Auth::check() ? Auth::user()->name : 'Mahasiswa');
        $validated['user_id'] = Auth::check() ? Auth::id() : 1;
        $validated['status'] = 'pending'; // Wajib pending sesuai arsitektur moderasi Admin Jo

        // ENGINE MODERASI: Saring kata-kata kotor dari pesan yang dimasukkan
        $validated['message'] = $this->applyWordFilter($validated['message']);

        $songfess = SongfessMessage::create($validated);

        if (Auth::check()) {
            \App\Models\PointTransaction::create([
                'user_id' => Auth::id(),
                'amount' => 1, 
                'type' => 'earn',
                'description' => 'Menerbitkan Pesan Songfess',
                'reference_type' => SongfessMessage::class,
                'reference_id' => $songfess->id
            ]);
        }

        return redirect()->back()->with('success', 'Pesan Musical Menfess berhasil dikirim. Menunggu kurasi admin!');
    }

    /**
     * Mendapatkan Token Spotify secara Behind-The-Scenes (menjaga Client Secret aman)
     */
    private function getSpotifyToken()
    {
        // Token spotify valid selama 3600 detik (1 jam), Cache selama 58 menit saja
        return Cache::remember('spotify_access_token', 3480, function () {
            $clientId = env('SPOTIFY_CLIENT_ID');
            $clientSecret = env('SPOTIFY_CLIENT_SECRET');

            if (!$clientId || !$clientSecret) {
                return null;
            }

            $response = Http::asForm()->withBasicAuth($clientId, $clientSecret)
                ->post('https://accounts.spotify.com/api/token', [
                    'grant_type' => 'client_credentials'
                ]);

            if ($response->successful()) {
                return $response->json('access_token');
            }

            return null;
        });
    }

    /**
     * API Internal untuk dicari oleh Frontend (Live Search Audio)
     */
    public function searchSpotify(Request $request)
    {
        $query = $request->input('q');
        if (!$query) return response()->json([]);

        $token = $this->getSpotifyToken();
        
        if (!$token) {
            return response()->json(['error' => 'Server Configuration: Spotify API Keys are missing / invalid.'], 500);
        }

        $response = Http::withToken($token)->get('https://api.spotify.com/v1/search', [
            'q' => $query,
            'type' => 'track',
            'limit' => 5
        ]);

        if ($response->successful()) {
            $tracks = $response->json('tracks.items');
            $result = collect($tracks)->map(function ($track) {
                return [
                    'spotify_id' => $track['id'],
                    'song_title' => $track['name'],
                    'artist_name' => collect($track['artists'])->pluck('name')->implode(', '),
                    'album_art' => $track['album']['images'][0]['url'] ?? null,
                    'preview_url' => $track['preview_url'] // Sayangnya saat ini kebijakan baru Spotify terkadang meng-null kan preview_url untuk banyak lagu
                ];
            });
            return response()->json($result);
        }

        return response()->json(['error' => 'Gagal mengambil data dari Spotify.'], 500);
    }

    /**
     * Engine Moderasi: Sensor Kata Kotor (Word Filter)
     */
    private function applyWordFilter(string $content): string
    {
        $filters = \Illuminate\Support\Facades\Cache::remember('word_filters', 3600, function () {
            return \App\Models\WordFilter::where('is_active', true)->get();
        });

        foreach ($filters as $filter) {
            $replacement = $filter->replacement ?? str_repeat('*', mb_strlen($filter->word));
            $content = str_ireplace($filter->word, $replacement, $content);
        }

        return $content;
    }
}
