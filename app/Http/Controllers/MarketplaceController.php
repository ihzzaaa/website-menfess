<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class MarketplaceController extends Controller
{
    /**
     * Tampilkan katalog utama Marketplace dengan filter/pencarian
     */
    public function index(Request $request)
    {
        $query = Product::with(['category', 'images', 'user'])
            ->where('status', 'active');

        // Logic fitur Search Text
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                // Catatan: Jika migrasi database MySQL gunakan 'like', kalau Postgres pakai 'ilike' (case-insensitive)
                $q->where('title', 'ilike', '%' . $search . '%')
                  ->orWhere('description', 'ilike', '%' . $search . '%');
            });
        }

        // Logic filter kategori
        if ($categorySlug = $request->input('category')) {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        // Sorting Standar: Yang terbaru muncul duluan
        $query->latest();

        $products = $query->paginate(12)->withQueryString();

        $categories = Category::where('is_active', true)->orderBy('sort_order')->get();

        // DATA 3: Mengambil Bursa WTB (Want to Buy / Jembatan Menfess)
        $wtbRequests = \App\Models\MenfessPost::with(['marketplaceCategory'])
            ->whereNotNull('marketplace_category_id')
            ->where('is_visible', true)
            ->where('status', 'active')
            ->latest()
            ->take(8)
            ->get()
            ->makeHidden(['user_id']); // Restriksi keamanan User ID layaknya menfess utama
            
        // Ihza akan merender halaman ini menggunakan React komponen 'Main/Marketplace'
        return Inertia::render('Main/Marketplace', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only('search', 'category'),
            'wtb_requests' => $wtbRequests
        ]);
    }

    /**
     * Tampilkan Detail 1 Produk secara spesifik berdasarkan Slug
     */
    public function show($slug)
    {
        $product = Product::with(['user', 'category', 'images'])
            ->where('slug', $slug)
            ->where('status', 'active')
            ->firstOrFail();

        // Increment fitur View Count
        // Saya pasang proteksi session key agar 1 IP yang merefresh page ratusan kali hanya dihitung 1x view
        $viewedKey = 'viewed_products_' . $product->id;
        if (!session()->has($viewedKey)) {
            $product->increment('view_count');
            session()->put($viewedKey, true);
        }

        // Mengambil produk serupa (Related Products) dari kategori yang sama secara random
        $relatedProducts = Product::with(['images'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', 'active')
            ->inRandomOrder()
            ->take(4)
            ->get();

        return Inertia::render('Main/MarketplaceDetail', [
            'product' => $product,
            'related' => $relatedProducts
        ]);
    }

    /**
     * Request Upload Produk Baru oleh User
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'condition' => 'required|in:new,used,like_new',
            'whatsapp_number' => 'nullable|string|max:20',
        ]);

        // Auto-generate Slug yang unik, misal "sepatu-bekas-1"
        $slugBase = Str::slug($validated['title']);
        $slug = $slugBase;
        $counter = 1;

        while (Product::where('slug', $slug)->exists()) {
            $slug = $slugBase . '-' . $counter;
            $counter++;
        }

        $validated['slug'] = $slug;
        $validated['user_id'] = Auth::check() ? Auth::id() : 1; // Fallback jika autentikasi belum jalan
        $validated['status'] = 'active'; 

        $product = Product::create($validated);

        // TODO In Further Phase: Implementation module pengunggahan media di sini (simpan path ke $product->images())

        return redirect()->route('marketplace.index')->with('success', 'Produk jualanmu berhasil terbit di katalog!');
    }
}
