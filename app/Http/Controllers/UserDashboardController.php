<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserDashboardController extends Controller
{
    /**
     * Tampilkan Profil Setting / Dashboard Personal User
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Ambil riwayat post menfess yang dibuat user ini
        // (Publik tidak bisa melihat siapa yang mengupload, tapi user sendiri bisa melihat karyanya di sini)
        $myMenfess = $user->menfessPosts()
            ->withCount(['comments', 'votes as upvotes' => function($q) {
                $q->where('type', 'up');
            }])
            ->latest()
            ->paginate(5, ['*'], 'menfess_page');

        // Ambil riwayat produk jualan user ini
        $myProducts = $user->products()
            ->with('category')
            ->latest()
            ->paginate(5, ['*'], 'produk_page');
            
        // Ambil riwayat transaksi poin (Gamification module)
        $pointHistory = $user->pointTransactions()
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('Main/UserDashboard', [
            'user' => $user,
            'my_menfess' => $myMenfess,
            'my_products' => $myProducts,
            'point_history' => $pointHistory
        ]);
    }
}
