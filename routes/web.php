<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\MenfessController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\SongfessController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\SellerVerificationController;

// Public Routes (Menfess diposisikan sebagai halaman depan)
Route::get('/', [LandingPageController::class, 'index'])->name('home');
Route::get('/menfess', [MenfessController::class, 'index'])->name('menfess.index');
Route::get('/menfess/{post}', [MenfessController::class, 'show'])->name('menfess.show');

Route::get('/marketplace', [MarketplaceController::class, 'index'])->name('marketplace.index');
Route::get('/marketplace/{slug}', [MarketplaceController::class, 'show'])->name('marketplace.show');

Route::get('/songfess', [SongfessController::class, 'index'])->name('songfess.index');
Route::get('/api/spotify/search', [SongfessController::class, 'searchSpotify'])->name('songfess.api.search');

// REST Integrations Public Endpoint
Route::get('/api/polls/active', [PollController::class, 'activePoll'])->name('polls.active');
Route::get('/auth/google', [SocialAuthController::class, 'redirect'])->name('google.login');
Route::get('/auth/google/callback', [SocialAuthController::class, 'callback']);

// User dashboard dan aksi yang butuh Login (untuk regular users)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
    
    // Auth Lonceng API
    Route::get('/api/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/api/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    
    // Fitur Aduan Moderasi
    Route::post('/report', [ReportController::class, 'store'])->name('report.store');
    
    // Fitur Pengajuan Verifikasi Seller
    Route::post('/seller-verification/apply', [SellerVerificationController::class, 'store'])->name('seller.verify');

    Route::post('/menfess', [MenfessController::class, 'store'])->name('menfess.store');
    Route::post('/menfess/{post}/comment', [MenfessController::class, 'reply'])->name('menfess.reply');
    Route::post('/menfess/{post}/vote', [MenfessController::class, 'votePost'])->name('menfess.vote');
    Route::post('/menfess-comments/{comment}/vote', [MenfessController::class, 'voteComment'])->name('menfess.comment.vote');
    
    // Interaksi Share & Repost & WTB & Koin VIP/PIN
    Route::post('/menfess/{post}/share', [MenfessController::class, 'share'])->name('menfess.share');
    Route::post('/menfess/{post}/repost', [MenfessController::class, 'repost'])->name('menfess.repost');
    Route::post('/menfess/{post}/share/wtb', [MenfessController::class, 'shareToMarketplace'])->name('menfess.wtb');
    Route::post('/menfess/{post}/pin', [MenfessController::class, 'pin'])->name('menfess.pin');

    // Marketplace
    Route::post('/marketplace', [MarketplaceController::class, 'store'])->name('marketplace.store');
    
    Route::post('/songfess', [SongfessController::class, 'store'])->name('songfess.store');
    
    Route::post('/polls/{poll}/vote', [PollController::class, 'vote'])->name('polls.vote');

    // PANEL ADMIN MODERASI VERIFIKASI (Seharusnya berada dalam auth:admin middleware kelak)
    Route::post('/admin/seller-verification/{verification}/approve', [\App\Http\Controllers\Admin\VerificationController::class, 'approve'])->name('admin.seller.approve');
    Route::post('/admin/seller-verification/{verification}/reject', [\App\Http\Controllers\Admin\VerificationController::class, 'reject'])->name('admin.seller.reject');
    
    // PANEL ADMIN USER MANAGEMENT
    Route::post('/admin/users/{user}/shadow-ban', [\App\Http\Controllers\Admin\UserController::class, 'shadowBan'])->name('admin.users.shadow_ban');
});

require __DIR__.'/settings.php';

// Debug test route
Route::get('/test-auth', function () {
    $result = \Illuminate\Support\Facades\Auth::guard('admin')->attempt([
        'email' => 'admin@gmail.com',
        'password' => 'admin123'
    ]);
    return response()->json([
        'auth_result' => $result,
        'admin_user' => \App\Models\Admin::where('email', 'admin@gmail.com')->first(),
    ]);
});

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('admin.login')->middleware('guest:admin');
    Route::post('/login', [AuthController::class, 'login'])->middleware('guest:admin');
    Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout')->middleware('auth:admin');
    
    Route::middleware('auth:admin')->group(function () {
        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::post('/settings/update-rules', [DashboardController::class, 'updateRules'])->name('admin.settings.update-rules');

        // Menfess Management (NEW)
        Route::get('/menfess', [DashboardController::class, 'menfessManagement'])->name('admin.menfess');
        Route::put('/menfess/{post}/toggle-visibility', [DashboardController::class, 'toggleMenfessVisibility'])->name('admin.menfess.toggle-visibility');
        Route::put('/menfess/{post}/toggle-pin', [DashboardController::class, 'togglePinMenfess'])->name('admin.menfess.toggle-pin');
        Route::delete('/menfess/{post}', [DashboardController::class, 'deleteMenfess'])->name('admin.menfess.delete');

        // User Management
        Route::get('/users', [DashboardController::class, 'users'])->name('admin.users');
        Route::post('/users/{user}/toggle-block', [DashboardController::class, 'toggleBlockUser'])->name('admin.users.toggle-block');
        Route::put('/users/{user}/toggle-shadow-ban', [DashboardController::class, 'toggleShadowBan'])->name('admin.users.toggle-shadow-ban');
        Route::put('/users/{user}/toggle-verified', [DashboardController::class, 'toggleVerifiedSeller'])->name('admin.users.toggle-verified');
        Route::post('/users/{user}/adjust-coin', [DashboardController::class, 'adjustUserCoin'])->name('admin.users.adjust-coin');

        // KYC Approval
        Route::put('/kyc/{kyc}/approve', [DashboardController::class, 'approveKyc'])->name('admin.kyc.approve');
        Route::put('/kyc/{kyc}/reject', [DashboardController::class, 'rejectKyc'])->name('admin.kyc.reject');

        // Content Moderation
        Route::get('/moderation', [DashboardController::class, 'moderation'])->name('admin.moderation');

        // Menfess Categories
        Route::post('/menfess/categories', [DashboardController::class, 'storeMenfessCategory'])->name('admin.menfess.categories.store');
        Route::put('/menfess/categories/{category}', [DashboardController::class, 'updateMenfessCategory'])->name('admin.menfess.categories.update');
        Route::delete('/menfess/categories/{category}', [DashboardController::class, 'deleteMenfessCategory'])->name('admin.menfess.categories.delete');
        Route::put('/menfess/categories/{category}/toggle', [DashboardController::class, 'toggleMenfessCategory'])->name('admin.menfess.categories.toggle');

        // Marketplace
        Route::get('/marketplace', [DashboardController::class, 'marketplace'])->name('admin.marketplace');
        Route::put('/marketplace/{item}/approve', [DashboardController::class, 'approveMarketplaceItem'])->name('admin.marketplace.approve');
        Route::put('/marketplace/{item}/reject', [DashboardController::class, 'rejectMarketplaceItem'])->name('admin.marketplace.reject');
        Route::put('/marketplace/{item}/toggle-featured', [DashboardController::class, 'toggleFeaturedItem'])->name('admin.marketplace.toggle-featured');

        // Categories
        Route::post('/marketplace/categories', [DashboardController::class, 'storeCategory'])->name('admin.categories.store');
        Route::put('/marketplace/categories/{category}', [DashboardController::class, 'updateCategory'])->name('admin.categories.update');
        Route::delete('/marketplace/categories/{category}', [DashboardController::class, 'deleteCategory'])->name('admin.categories.delete');
        Route::put('/marketplace/categories/{category}/toggle', [DashboardController::class, 'toggleCategoryStatus'])->name('admin.categories.toggle');
        
        // Polls (UPGRADED)
        Route::get('/polls', [DashboardController::class, 'polls'])->name('admin.polls');
        Route::post('/polls', [DashboardController::class, 'storePoll'])->name('admin.polls.store');
        Route::put('/polls/{poll}/toggle-status', [DashboardController::class, 'togglePollStatus'])->name('admin.polls.toggle-status');
        Route::delete('/polls/{poll}', [DashboardController::class, 'deletePoll'])->name('admin.polls.delete');

        // Notifications / WA Center
        Route::get('/notifications', [DashboardController::class, 'notifications'])->name('admin.notifications');
        Route::post('/notifications/settings', [DashboardController::class, 'updateNotificationSettings'])->name('admin.notifications.settings');

        // Sponsors
        Route::get('/sponsors', [DashboardController::class, 'sponsors'])->name('admin.sponsors');
        Route::post('/sponsors', [DashboardController::class, 'storeSponsor'])->name('admin.sponsors.store');
        Route::post('/sponsors/settings', [DashboardController::class, 'updateSponsorSettings'])->name('admin.sponsors.settings');
        Route::put('/sponsors/{sponsor}/approve', [DashboardController::class, 'approveSponsor'])->name('admin.sponsors.approve');
        Route::put('/sponsors/{sponsor}/reject', [DashboardController::class, 'rejectSponsor'])->name('admin.sponsors.reject');
        Route::delete('/sponsors/{sponsor}/delete', [DashboardController::class, 'deleteSponsor'])->name('admin.sponsors.delete');
        Route::put('/sponsors/{sponsor}/soft-delete', [DashboardController::class, 'softDeleteSponsor'])->name('admin.sponsors.soft-delete');
        Route::put('/sponsors/{sponsor}/restore', [DashboardController::class, 'restoreSponsor'])->name('admin.sponsors.restore');

        // Musical Menfess / Songfess
        Route::get('/musical-menfess', [DashboardController::class, 'musicalMenfess'])->name('admin.musical-menfess');
        Route::post('/settings/toggle-musical', [DashboardController::class, 'toggleMusicalSetting'])->name('admin.settings.toggle-musical');
        Route::delete('/musical-menfess/{message}', [DashboardController::class, 'deleteSongfessMessage'])->name('admin.musical-menfess.delete');

        // Profanity Words (was missing from routes!)
        Route::post('/profanity-words', [DashboardController::class, 'storeProfanityWord'])->name('admin.profanity-words.store');
        Route::delete('/profanity-words/{profanityWord}', [DashboardController::class, 'deleteProfanityWord'])->name('admin.profanity-words.delete');
        Route::put('/profanity-words/{profanityWord}/toggle', [DashboardController::class, 'toggleProfanityWord'])->name('admin.profanity-words.toggle');
        Route::post('/profanity-check', [DashboardController::class, 'checkProfanity'])->name('admin.profanity-check');

        // Profile
        Route::get('/profile', [DashboardController::class, 'profile'])->name('admin.profile');
        Route::patch('/profile', [DashboardController::class, 'updateProfile'])->name('admin.profile.update');
    });
});
