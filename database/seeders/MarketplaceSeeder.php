<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class MarketplaceSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Kategori Inti
        $catElektronik = Category::create([
            'name' => 'Elektronik & Gadget',
            'slug' => 'elektronik-gadget',
            'icon' => '💻',
            'description' => 'HP, Laptop, aksesoris komputer.',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $catFashion = Category::create([
            'name' => 'Fashion Mahasiswa',
            'slug' => 'fashion-mahasiswa',
            'icon' => '👕',
            'description' => 'Thrift, Jaket himpunan, kemeja.',
            'sort_order' => 2,
            'is_active' => true,
        ]);

        // 2. Buat Dummy Produk Sedikit Saja
        $products = [
            [
                'user_id' => 1,
                'category_id' => $catElektronik->id,
                'title' => 'Macbook Pro M1 Ex Pemakaian Skripsi',
                'slug' => 'macbook-pro-m1-ex-skripsi',
                'description' => 'Mulus pemakaian pribadi buat moding dan skripsi. CC battery 120.',
                'price' => 12500000.00,
                'condition' => 'used',
                'whatsapp_number' => '081234567890',
                'status' => 'active',
                'is_promoted' => true, // Dipromote agar di atas
            ],
            [
                'user_id' => 1,
                'category_id' => $catFashion->id,
                'title' => 'Hoodie H&M Bekas warna Navy',
                'slug' => 'hoodie-hnm-bekas-navy',
                'description' => 'Nggak muat lagi karena abis ospek berat badan nambah. Rp50k angkut.',
                'price' => 50000.00,
                'condition' => 'used',
                'whatsapp_number' => '081234567890',
                'status' => 'active',
                'is_promoted' => false,
            ],
            [
                'user_id' => 1,
                'category_id' => $catFashion->id,
                'title' => 'Kemeja Flannel Uniqlo Size L',
                'slug' => 'kemeja-flannel-uniqlo-l',
                'description' => 'Jual rugi, kemeja andalan nyari gebetan. Masih bagus banget.',
                'price' => 85000.00,
                'condition' => 'like_new',
                'whatsapp_number' => '08987654321',
                'status' => 'active',
                'is_promoted' => false,
            ],
        ];

        foreach ($products as $prod) {
            Product::create($prod);
        }
    }
}
