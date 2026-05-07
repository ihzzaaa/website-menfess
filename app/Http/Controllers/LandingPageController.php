<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MenfessPost;
use App\Models\Product;
use App\Models\Sponsor;
use App\Models\DailyPoll;
use App\Models\SongfessMessage;

class LandingPageController extends Controller
{
    /**
     * Membungkus seluruh entitas penting untuk beranda depan dalam satu lemparan Payload
     */
    public function index()
    {
        // 1. Trending Menfess (Top 5 berdasarkan Upvote tertinggi minggu ini / sepanjang waktu)
        $trendingMenfess = MenfessPost::withCount('comments')
            ->where('is_visible', true)
            ->where('status', 'active')
            ->orderByDesc('upvote_count')
            ->take(5)
            ->get()
            ->makeHidden(['user_id']); // Wajib! Pastikan privasi identitas pemposting terjaga dari API Inspection

        // 2. Cuplikan Produk Terbaru di Marketplace (Top 6 untuk Grid/Carousel)
        $latestProducts = Product::with(['images', 'category', 'user'])
            ->where('status', 'active') // Mengikuti nomenklatur model Marketplace yang sudah kita buat
            ->latest()
            ->take(6)
            ->get();
            
        // 3. Highlight Songfess Terbaru (Top 3 PESAN MUSIK)
        // (Pastikan pesan dirender hanya bila sudah diapprove oleh admin, kita pakai fallback pending/approved tergantung config sistem)
        $latestSongfess = SongfessMessage::latest()
            ->take(3)
            ->get()
            ->makeHidden(['user_id']);

        // 4. Partner Sponsor (Highlight khusus)
        // Misalkan ada banner iklan perusahaan
        $sponsors = Sponsor::latest()->take(5)->get(); 

        // 5. Daily Poll yang sedang berjalan hari ini (Optional injection for hero area)
        $activePoll = DailyPoll::with(['options' => function($q) {
                $q->orderBy('sort_order', 'asc');
            }])
            ->where('is_active', true)
            ->where('starts_at', '<=', now())
            ->where(function($q) {
                $q->where('ends_at', '>=', now())
                  ->orWhereNull('ends_at');
            })
            ->latest()
            ->first();

        // MENGEMAS SELURUH BEBAN INI KE 1 RUTE REAKSI: 'Home/LandingPage'
        // Ihza (Frontend) akan sangat berbahagia karena tidak perlu ngoding 5 fetch request terpisah :)
        return Inertia::render('Home/LandingPage', [
            'trending_menfess' => $trendingMenfess,
            'latest_products' => $latestProducts,
            'latest_songfess'  => $latestSongfess,
            'sponsors' => $sponsors,
            'active_poll' => $activePoll
        ]);
    }
}
