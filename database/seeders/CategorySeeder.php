<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'Pakaian & Fashion', 'slug' => 'pakaian-fashion', 'icon' => '👕', 'description' => 'Baju, celana, jaket, dan aksesoris fashion lainnya', 'sort_order' => 1],
            ['name' => 'Elektronik', 'slug' => 'elektronik', 'icon' => '📱', 'description' => 'Gadget, laptop, charger, dan perangkat elektronik', 'sort_order' => 2],
            ['name' => 'Buku & Alat Tulis', 'slug' => 'buku-alat-tulis', 'icon' => '📚', 'description' => 'Buku kuliah, novel, alat tulis, dan perlengkapan belajar', 'sort_order' => 3],
            ['name' => 'Makanan & Minuman', 'slug' => 'makanan-minuman', 'icon' => '🍜', 'description' => 'Jajanan, frozen food, minuman, dan catering', 'sort_order' => 4],
            ['name' => 'Jasa & Freelance', 'slug' => 'jasa-freelance', 'icon' => '💼', 'description' => 'Jasa desain, joki tugas, les privat, dan freelancing', 'sort_order' => 5],
            ['name' => 'Kos & Kontrakan', 'slug' => 'kos-kontrakan', 'icon' => '🏠', 'description' => 'Info kos, kontrakan, dan sewa tempat tinggal', 'sort_order' => 6],
            ['name' => 'Tiket & Voucher', 'slug' => 'tiket-voucher', 'icon' => '🎫', 'description' => 'Tiket konser, event kampus, voucher diskon', 'sort_order' => 7],
            ['name' => 'Olahraga & Hobi', 'slug' => 'olahraga-hobi', 'icon' => '⚽', 'description' => 'Peralatan olahraga, alat musik, dan perlengkapan hobi', 'sort_order' => 8],
            ['name' => 'Kendaraan', 'slug' => 'kendaraan', 'icon' => '🏍️', 'description' => 'Motor, sepeda, helm, dan aksesoris kendaraan', 'sort_order' => 9],
            ['name' => 'Lainnya', 'slug' => 'lainnya', 'icon' => '📦', 'description' => 'Barang lain yang tidak masuk kategori di atas', 'sort_order' => 10],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(['slug' => $cat['slug']], $cat);
        }
    }
}
