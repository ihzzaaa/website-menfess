<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;

// Home - redirect ke admin login
Route::get('/', function () {
    return redirect('/admin/login');
})->name('home');

// User dashboard (untuk regular users - menggunakan Fortify)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
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
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('/users', [DashboardController::class, 'users'])->name('admin.users');
        Route::get('/moderation', [DashboardController::class, 'moderation'])->name('admin.moderation');
        Route::get('/marketplace', [DashboardController::class, 'marketplace'])->name('admin.marketplace');
        Route::get('/polls', [DashboardController::class, 'polls'])->name('admin.polls');
        Route::get('/notifications', [DashboardController::class, 'notifications'])->name('admin.notifications');
        Route::get('/sponsors', [DashboardController::class, 'sponsors'])->name('admin.sponsors');
    });
});
