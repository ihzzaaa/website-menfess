<?php

namespace App\Http\Controllers\Admin;

use App\Models\SongfessAnalytic;
use App\Models\SongfessFilter;
use App\Models\SongfessMessage;
use App\Models\MarketplaceItem;
use App\Models\Sponsor;
use App\Models\User;
use App\Models\Setting;
use App\Models\ProfanityWord;
use App\Models\MenfessPost;
use App\Models\MenfessComment;
use App\Models\CoinTransaction;
use App\Models\Poll;
use App\Models\PollVote;
use App\Models\KycRequest;
use App\Models\Category;
use App\Models\MenfessCategory;
use App\Services\ProfanityService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController
{
    // ======================================================
    // DASHBOARD (Real Stats)
    // ======================================================

    public function index()
    {
        $rulesSetting = Setting::where('key', 'community_rules')->where('group', 'general')->first();
        $rules = [
            'title' => '',
            'content' => ''
        ];
        
        if ($rulesSetting) {
            $decoded = json_decode($rulesSetting->value, true);
            if (is_array($decoded)) {
                $rules = [
                    'title' => $decoded['title'] ?? '',
                    'content' => $decoded['content'] ?? ''
                ];
            } else {
                // Fallback for old string format
                $rules['content'] = $rulesSetting->value;
            }
        }

        // Real stats from database
        $stats = [
            'menfess_today' => MenfessPost::whereDate('created_at', today())->count(),
            'total_users' => User::count(),
            'pending_kyc' => KycRequest::where('status', 'pending')->count(),
            'total_menfess' => MenfessPost::count(),
            'total_coins' => User::sum('coin_balance'),
            'total_songs' => SongfessMessage::count(),
            'marketplace_items' => MarketplaceItem::where('status', 'approved')->count(),
            'reported_posts' => MenfessPost::where('report_count', '>=', 1)->count(),
        ];
        
        return Inertia::render('Admin/Dashboard', [
            'rules' => $rules,
            'stats' => $stats,
        ]);
    }

    // ======================================================
    // MENFESS MANAGEMENT (NEW)
    // ======================================================

    public function menfessManagement(Request $request)
    {
        $query = MenfessPost::with(['user', 'comments', 'category'])
            ->withCount('comments');

        // Filters
        if ($request->filter === 'reported') {
            $query->where('report_count', '>=', 1)->orderBy('report_count', 'desc');
        } elseif ($request->filter === 'pinned') {
            $query->where('is_pinned', true);
        } elseif ($request->filter === 'hidden') {
            $query->where('is_visible', false);
        } elseif ($request->filter === 'wtb') {
            $query->where('is_wtb', true);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // Search
        if ($request->search) {
            $query->where('content', 'like', '%' . $request->search . '%')
                  ->orWhere('alias_name', 'like', '%' . $request->search . '%');
        }

        if ($request->category_id) {
            $query->where('menfess_category_id', $request->category_id);
        }

        $posts = $query->paginate(20)->withQueryString();

        $stats = [
            'total' => MenfessPost::count(),
            'reported' => MenfessPost::where('report_count', '>=', 1)->count(),
            'pinned' => MenfessPost::where('is_pinned', true)->count(),
            'hidden' => MenfessPost::where('is_visible', false)->count(),
            'wtb' => MenfessPost::where('is_wtb', true)->count(),
        ];

        return Inertia::render('Admin/MenfessManagement', [
            'posts' => $posts,
            'categories' => MenfessCategory::all(),
            'stats' => $stats,
            'filters' => [
                'filter' => $request->filter ?? 'all',
                'search' => $request->search ?? '',
                'category_id' => $request->category_id ?? '',
            ],
        ]);
    }

    public function toggleMenfessVisibility(MenfessPost $post)
    {
        $post->is_visible = !$post->is_visible;
        $post->save();

        $status = $post->is_visible ? 'Menfess restored!' : 'Menfess taken down!';
        return back()->with('status', $status);
    }

    public function togglePinMenfess(MenfessPost $post)
    {
        $post->is_pinned = !$post->is_pinned;
        $post->pinned_until = $post->is_pinned ? now()->addHours(24) : null;
        $post->save();

        $status = $post->is_pinned ? 'Menfess pinned for 24 hours!' : 'Menfess unpinned!';
        return back()->with('status', $status);
    }

    public function deleteMenfess(MenfessPost $post)
    {
        $post->delete();
        return back()->with('status', 'Menfess deleted completely!');
    }

    // --- Menfess Category CRUD ---

    public function storeMenfessCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'color_theme' => 'nullable|string|max:50',
        ]);

        $slug = \Illuminate\Support\Str::slug($request->name);
        $count = MenfessCategory::where('slug', 'like', $slug . '%')->count();
        if ($count > 0) $slug .= '-' . ($count + 1);

        MenfessCategory::create([
            'name' => $request->name,
            'slug' => $slug,
            'color_theme' => $request->color_theme ?? 'zinc',
            'is_active' => true,
        ]);

        return back()->with('status', 'Kategori chat berhasil ditambahkan.');
    }

    public function updateMenfessCategory(Request $request, MenfessCategory $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'color_theme' => 'nullable|string|max:50',
        ]);

        $category->update([
            'name' => $request->name,
            'color_theme' => $request->color_theme ?? 'zinc',
        ]);

        return back()->with('status', 'Kategori chat diperbarui.');
    }

    public function deleteMenfessCategory(MenfessCategory $category)
    {
        // Unlink
        MenfessPost::where('menfess_category_id', $category->id)->update(['menfess_category_id' => null]);
        $category->delete();
        return back()->with('status', 'Kategori chat dihapus.');
    }

    public function toggleMenfessCategory(MenfessCategory $category)
    {
        $category->is_active = !$category->is_active;
        $category->save();
        return back()->with('status', 'Status kategori diperbarui.');
    }

    // ======================================================
    // USER MANAGEMENT (UPGRADED — Real Data)
    // ======================================================

    public function users(Request $request)
    {
        $query = User::withCount(['menfessPosts', 'marketplaceItems', 'songfessMessages']);

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filter === 'blocked') {
            $query->where('is_blocked', true);
        } elseif ($request->filter === 'shadow_banned') {
            $query->where('is_shadow_banned', true);
        } elseif ($request->filter === 'verified') {
            $query->where('is_verified_seller', true);
        }

        $users = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        $kycRequests = KycRequest::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'asc')
            ->get();

        $userStats = [
            'total' => User::count(),
            'active' => User::where('is_blocked', false)->where('is_shadow_banned', false)->count(),
            'blocked' => User::where('is_blocked', true)->count(),
            'shadow_banned' => User::where('is_shadow_banned', true)->count(),
            'verified_sellers' => User::where('is_verified_seller', true)->count(),
            'pending_kyc' => $kycRequests->count(),
        ];

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'kycRequests' => $kycRequests,
            'userStats' => $userStats,
            'filters' => [
                'search' => $request->search ?? '',
                'filter' => $request->filter ?? 'all',
            ],
        ]);
    }

    public function toggleShadowBan(User $user)
    {
        $user->is_shadow_banned = !$user->is_shadow_banned;
        $user->save();

        $status = $user->is_shadow_banned ? 'User shadow banned!' : 'Shadow ban lifted!';
        return back()->with('status', $status);
    }

    public function toggleVerifiedSeller(User $user)
    {
        $user->is_verified_seller = !$user->is_verified_seller;
        $user->save();

        $status = $user->is_verified_seller ? 'Seller verified!' : 'Seller verification removed!';
        return back()->with('status', $status);
    }

    public function adjustUserCoin(Request $request, User $user)
    {
        $request->validate([
            'amount' => 'required|integer',
            'reason' => 'required|string|max:255',
        ]);

        $amount = $request->amount;
        $type = $amount >= 0 ? 'earn' : 'burn';

        CoinTransaction::create([
            'user_id' => $user->id,
            'amount' => abs($amount),
            'type' => $type,
            'reason' => $request->reason . ' (Admin adjustment)',
        ]);

        $user->coin_balance = max(0, $user->coin_balance + $amount);
        $user->save();

        return back()->with('status', "Coin adjusted by {$amount} for {$user->name}!");
    }

    // ======================================================
    // KYC APPROVAL
    // ======================================================

    public function approveKyc(KycRequest $kyc)
    {
        $kyc->status = 'approved';
        $kyc->reviewed_at = now();
        $kyc->save();

        // Auto-set verified seller
        $kyc->user->is_verified_seller = true;
        $kyc->user->save();

        return back()->with('status', 'KYC approved! Seller is now verified.');
    }

    public function rejectKyc(Request $request, KycRequest $kyc)
    {
        $kyc->status = 'rejected';
        $kyc->admin_notes = $request->admin_notes;
        $kyc->reviewed_at = now();
        $kyc->save();

        return back()->with('status', 'KYC rejected.');
    }

    // ======================================================
    // POLLS (UPGRADED — Real Data)
    // ======================================================

    public function polls()
    {
        $polls = Poll::withCount('votes')
            ->orderByRaw("CASE WHEN status = 'live' THEN 0 WHEN status = 'draft' THEN 1 ELSE 2 END")
            ->orderBy('created_at', 'desc')
            ->get();

        // Get vote distribution for each poll
        $polls->each(function ($poll) {
            $voteDistribution = [];
            $options = $poll->options ?? [];
            foreach ($options as $index => $option) {
                $voteDistribution[$index] = PollVote::where('poll_id', $poll->id)
                    ->where('selected_option', $index)
                    ->count();
            }
            $poll->vote_distribution = $voteDistribution;
        });

        $stats = [
            'total' => Poll::count(),
            'live' => Poll::where('status', 'live')->count(),
            'draft' => Poll::where('status', 'draft')->count(),
            'closed' => Poll::where('status', 'closed')->count(),
            'total_votes' => PollVote::count(),
        ];

        return Inertia::render('Admin/Polls', [
            'polls' => $polls,
            'pollStats' => $stats,
        ]);
    }

    public function storePoll(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:500',
            'options' => 'required|array|min:2|max:6',
            'options.*' => 'required|string|max:200',
            'status' => 'nullable|string|in:draft,live',
        ]);

        Poll::create([
            'question' => $request->question,
            'options' => $request->options,
            'status' => $request->status ?? 'draft',
            'coin_reward' => 1,
        ]);

        return back()->with('status', 'Poll created successfully!');
    }

    public function togglePollStatus(Poll $poll)
    {
        $statusCycle = ['draft' => 'live', 'live' => 'closed', 'closed' => 'draft'];
        $poll->status = $statusCycle[$poll->status] ?? 'draft';
        $poll->save();

        return back()->with('status', "Poll status changed to {$poll->status}!");
    }

    public function deletePoll(Poll $poll)
    {
        $poll->delete();
        return back()->with('status', 'Poll deleted!');
    }

    // ======================================================
    // CONTENT MODERATION (existing)
    // ======================================================

    public function moderation()
    {
        $reportedPosts = MenfessPost::with('user')
            ->where('report_count', '>=', 1)
            ->orderBy('report_count', 'desc')
            ->get();

        $pinnedPosts = MenfessPost::with('user')
            ->where('is_pinned', true)
            ->orderBy('pinned_until', 'asc')
            ->get();

        $pinnedCostSetting = Setting::where('key', 'pinned_cost')->where('group', 'coin_economy')->first();

        $profanityWords = ProfanityWord::orderBy('word', 'asc')->get();

        return Inertia::render('Admin/Moderation', [
            'reportedPosts' => $reportedPosts,
            'pinnedPosts' => $pinnedPosts,
            'pinnedCost' => $pinnedCostSetting ? (int) $pinnedCostSetting->value : 50,
            'profanityWords' => $profanityWords,
        ]);
    }

    // ======================================================
    // MARKETPLACE (existing)
    // ======================================================

    public function marketplace()
    {
        $pendingItems = MarketplaceItem::with(['user', 'category'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'asc')
            ->get();

        $approvedItems = MarketplaceItem::with(['user', 'category'])
            ->where('status', 'approved')
            ->orderBy('updated_at', 'desc')
            ->get();

        $rejectedItems = MarketplaceItem::with(['user', 'category'])
            ->where('status', 'rejected')
            ->orderBy('updated_at', 'desc')
            ->get();

        $featuredItems = MarketplaceItem::with(['user', 'category'])
            ->where('is_featured', true)
            ->orderBy('featured_until', 'desc')
            ->get();

        $categories = Category::withCount('marketplaceItems')
            ->orderBy('sort_order')
            ->get();

        $totalItems = MarketplaceItem::count();
        $approvedCount = MarketplaceItem::where('status', 'approved')->count();
        $rejectedCount = MarketplaceItem::where('status', 'rejected')->count();
        $featuredCount = MarketplaceItem::where('is_featured', true)->count();

        return Inertia::render('Admin/Marketplace', [
            'pendingItems' => $pendingItems,
            'approvedItems' => $approvedItems,
            'rejectedItems' => $rejectedItems,
            'featuredItems' => $featuredItems,
            'categories' => $categories,
            'totalItems' => $totalItems,
            'approvedCount' => $approvedCount,
            'rejectedCount' => $rejectedCount,
            'featuredCount' => $featuredCount,
        ]);
    }

    public function approveMarketplaceItem(MarketplaceItem $item)
    {
        $item->status = 'approved';
        $item->save();
        return back()->with('status', 'Item approved successfully.');
    }

    public function rejectMarketplaceItem(MarketplaceItem $item)
    {
        $item->status = 'rejected';
        $item->save();
        return back()->with('status', 'Item rejected successfully.');
    }

    // --- Category CRUD ---

    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $slug = \Illuminate\Support\Str::slug($request->name);
        $count = Category::where('slug', 'like', $slug . '%')->count();
        if ($count > 0) $slug .= '-' . ($count + 1);

        Category::create([
            'name' => $request->name,
            'slug' => $slug,
            'icon' => $request->icon,
            'description' => $request->description,
            'sort_order' => Category::max('sort_order') + 1,
            'is_active' => true,
        ]);

        return back()->with('status', 'Kategori berhasil ditambahkan.');
    }

    public function updateCategory(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category->update([
            'name' => $request->name,
            'icon' => $request->icon,
            'description' => $request->description,
        ]);

        return back()->with('status', 'Kategori berhasil diperbarui.');
    }

    public function deleteCategory(Category $category)
    {
        MarketplaceItem::where('category_id', $category->id)->update(['category_id' => null]);
        $category->delete();
        return back()->with('status', 'Kategori berhasil dihapus.');
    }

    public function toggleCategoryStatus(Category $category)
    {
        $category->is_active = !$category->is_active;
        $category->save();
        return back()->with('status', 'Status kategori diperbarui.');
    }

    // --- Featured Items ---

    public function toggleFeaturedItem(MarketplaceItem $item)
    {
        $item->is_featured = !$item->is_featured;
        $item->featured_until = $item->is_featured ? now()->addDays(7) : null;
        $item->save();
        return back()->with('status', $item->is_featured ? 'Item dijadikan featured.' : 'Featured status dihapus.');
    }

    // ======================================================
    // NOTIFICATIONS / WA CENTER (existing)
    // ======================================================

    public function notifications()
    {
        $rulesSetting = Setting::where('key', 'rules')->where('group', 'notification_settings')->first();
        
        $rules = [
            'title' => '',
            'content' => ''
        ];
        
        if ($rulesSetting) {
            $decoded = json_decode($rulesSetting->value, true);
            if (is_array($decoded)) {
                $rules = [
                    'title' => $decoded['title'] ?? '',
                    'content' => $decoded['content'] ?? ''
                ];
            } else {
                $rules['content'] = $rulesSetting->value;
            }
        }

        return Inertia::render('Admin/Notifications', [
            'notificationRules' => $rules,
        ]);
    }

    public function updateNotificationSettings(Request $request)
    {
        Setting::updateOrCreate(
            ['key' => 'rules', 'group' => 'notification_settings'],
            ['value' => json_encode([
                'title' => $request->title ?? '',
                'content' => $request->content ?? ''
            ])]
        );

        return back()->with('status', 'Notification settings updated successfully!');
    }

    // ======================================================
    // SPONSORS (existing)
    // ======================================================

    public function sponsors()
    {
        $pendingSponsors = Sponsor::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'asc')
            ->get();
            
        $totalPendingCount = Sponsor::where('status', 'pending')->count();
        
        $rulesSetting = Setting::where('key', 'rules')->where('group', 'sponsor_settings')->first();

        $sponsorHistory = Sponsor::with('user')
            ->whereIn('status', ['active', 'rejected', 'deleted'])
            ->orderBy('updated_at', 'desc')
            ->get();

        // Active sponsors (currently running)
        $activeSponsors = Sponsor::with('user')
            ->where('status', 'active')
            ->orderBy('expires_at', 'asc')
            ->get();

        // Activity log - recent actions (last 10 non-pending sponsors ordered by updated_at)
        $activityLog = Sponsor::with('user')
            ->where('status', '!=', 'pending')
            ->orderBy('updated_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($sponsor) {
                $actionMap = [
                    'active' => 'Iklan disetujui/diaktifkan',
                    'rejected' => 'Iklan ditolak',
                    'deleted' => 'Iklan dihapus'
                ];
                return [
                    'id' => $sponsor->id,
                    'action' => $actionMap[$sponsor->status] ?? 'Status berubah',
                    'title' => $sponsor->title ?? 'Tanpa Judul',
                    'user_name' => $sponsor->user->name ?? 'Unknown',
                    'status' => $sponsor->status,
                    'time' => $sponsor->updated_at->diffForHumans(),
                ];
            });

        // Revenue stats 
        $stats = [
            'total_all' => Sponsor::count(),
            'total_active' => Sponsor::where('status', 'active')->count(),
            'total_rejected' => Sponsor::where('status', 'rejected')->count(),
            'total_deleted' => Sponsor::where('status', 'deleted')->count(),
        ];

        // Default empty rules if not set
        $rules = $rulesSetting ? json_decode($rulesSetting->value, true) : ['title' => '', 'content' => ''];

        return Inertia::render('Admin/Sponsors', [
            'pendingSponsors' => $pendingSponsors,
            'sponsorHistory' => $sponsorHistory,
            'activeSponsors' => $activeSponsors,
            'activityLog' => $activityLog,
            'stats' => $stats,
            'totalPendingCount' => $totalPendingCount,
            'sponsorRules' => $rules
        ]);
    }

    public function updateSponsorSettings(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
        ]);

        Setting::updateOrCreate(
            ['key' => 'rules', 'group' => 'sponsor_settings'],
            ['value' => json_encode([
                'title' => $request->title ?? '',
                'content' => $request->content ?? ''
            ])]
        );

        return back()->with('status', 'Sponsor settings updated successfully!');
    }

    public function approveSponsor(Request $request, Sponsor $sponsor)
    {
        $sponsor->status = 'active';
        $sponsor->expires_at = null; // Permanent
        $sponsor->save();

        return back()->with('status', 'Sponsor banner approved and now active!');
    }

    public function storeSponsor(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|max:5120', // Max 5MB
        ]);

        $imagePath = $request->file('image')->store('banners', 'public');

        Sponsor::create([
            'user_id' => null,
            'title' => $request->title,
            'description' => $request->description,
            'image_path' => $imagePath,
            'status' => 'active',
            'expires_at' => null // Permanent
        ]);

        return back()->with('status', 'Banner sponsor berhasil diunggah dan langsung aktif!');
    }

    public function rejectSponsor(Sponsor $sponsor)
    {
        $sponsor->status = 'rejected';
        $sponsor->save();

        return back()->with('status', 'Sponsor banner rejected.');
    }

    public function deleteSponsor(Sponsor $sponsor)
    {
        if ($sponsor->image_path) {
            Storage::disk('public')->delete($sponsor->image_path);
        }
        $sponsor->delete();

        return back()->with('status', 'Sponsor banner deleted permanently.');
    }

    public function softDeleteSponsor(Sponsor $sponsor)
    {
        $sponsor->status = 'deleted';
        $sponsor->save();

        return back()->with('status', 'Iklan telah dihapus dan dipindahkan ke riwayat.');
    }

    public function restoreSponsor(Sponsor $sponsor)
    {
        $sponsor->status = 'pending';
        $sponsor->expires_at = null;
        $sponsor->save();

        return back()->with('status', 'Sponsor banner restored to pending queue.');
    }

    // ======================================================
    // MUSICAL MENFESS / SONGFESS (existing)
    // ======================================================

    public function musicalMenfess()
    {
        return Inertia::render('Admin/MusicalMenfess', [
            'analytics' => SongfessAnalytic::orderBy('play_count', 'desc')->limit(10)->get(),
            'filters' => SongfessFilter::where('is_active', true)->get(),
            'messages' => SongfessMessage::with('user')->orderBy('created_at', 'desc')->get(),
            'settings' => Setting::where('group', 'musical_menfess')->get()->pluck('value', 'key'),
            'profanityWords' => ProfanityWord::orderBy('word', 'asc')->get(),
        ]);
    }

    public function deleteSongfessMessage(SongfessMessage $message)
    {
        $message->delete();
        return back()->with('status', 'Message deleted successfully!');
    }

    public function toggleBlockUser(User $user)
    {
        $user->is_blocked = !$user->is_blocked;
        $user->save();

        $status = $user->is_blocked ? 'User blocked!' : 'User unblocked!';
        return back()->with('status', $status);
    }

    public function toggleMusicalSetting(Request $request)
    {
        $request->validate([
            'key' => 'required|string',
            'value' => 'required',
        ]);

        Setting::updateOrCreate(
            ['key' => $request->key, 'group' => 'musical_menfess'],
            ['value' => $request->value]
        );

        return back()->with('status', 'Setting updated successfully!');
    }

    // ======================================================
    // PROFILE (existing)
    // ======================================================

    public function profile()
    {
        return Inertia::render('Admin/Profile', [
            'admin' => Auth::guard('admin')->user(),
        ]);
    }

    public function updateRules(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
        ]);

        Setting::updateOrCreate(
            ['key' => 'community_rules', 'group' => 'general'],
            ['value' => json_encode([
                'title' => $request->title ?? '',
                'content' => $request->content ?? ''
            ])]
        );

        return back()->with('status', 'Community rules updated successfully!');
    }

    public function updateProfile(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins,email,' . $admin->id,
            'password' => 'nullable|string|min:8|confirmed',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $admin->name = $request->name;
        $admin->email = $request->email;

        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($admin->avatar) {
                Storage::disk('public')->delete($admin->avatar);
            }
            
            $path = $request->file('avatar')->store('avatars', 'public');
            $admin->avatar = $path;
        }

        if ($request->filled('password')) {
            $admin->password = Hash::make($request->password);
        }

        $admin->save();

        return back()->with('status', 'Profile updated successfully!');
    }

    // ======== PROFANITY WORDS CRUD ========

    public function storeProfanityWord(Request $request)
    {
        $request->validate([
            'word' => 'required|string|max:255',
            'category' => 'nullable|string|max:50',
        ]);

        ProfanityWord::firstOrCreate(
            ['word' => mb_strtolower(trim($request->word))],
            ['category' => $request->category ?? 'general', 'is_active' => true]
        );

        return back()->with('status', 'Kata kasar berhasil ditambahkan!');
    }

    public function deleteProfanityWord(ProfanityWord $profanityWord)
    {
        $profanityWord->delete();
        return back()->with('status', 'Kata kasar berhasil dihapus!');
    }

    public function toggleProfanityWord(ProfanityWord $profanityWord)
    {
        $profanityWord->is_active = !$profanityWord->is_active;
        $profanityWord->save();
        return back()->with('status', 'Status kata kasar diperbarui!');
    }

    public function checkProfanity(Request $request)
    {
        $request->validate(['text' => 'required|string']);
        $matches = ProfanityService::check($request->text);

        return response()->json([
            'is_profane' => count($matches) > 0,
            'matches' => $matches,
        ]);
    }
}
