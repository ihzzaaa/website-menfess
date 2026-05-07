<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\MarketplaceItem;
use App\Models\Category;

class MarketplaceDummySeeder extends Seeder
{
    public function run()
    {
        // Clear existing items first to avoid confusion
        MarketplaceItem::truncate();

        $cats = Category::all();
        $users = User::all();
        if ($users->isEmpty()) {
            $users = collect([
                User::create(['name'=>'Rina Jualan','email'=>'rina.jualan@example.com','password'=>bcrypt('password')]),
                User::create(['name'=>'Budi Marketplace','email'=>'budi.mp@example.com','password'=>bcrypt('password')]),
                User::create(['name'=>'Siti Pro','email'=>'siti.pro@example.com','password'=>bcrypt('password')]),
            ]);
        }

        // Item 1
        MarketplaceItem::create([
            'user_id' => $users[0]->id,
            'category_id' => $cats->where('slug','pakaian-fashion')->first()?->id,
            'title' => 'Jaket Hoodie UNNES Limited Edition',
            'description' => "Jaket hoodie eksklusif edisi terbatas dengan bordir logo UNNES premium. Bahan fleece tebal, sangat nyaman untuk cuaca dingin Semarang. Ukuran L, warna navy. Kondisi 95% like new, baru dipakai 2x. Bonus stiker UNNES!",
            'price' => 185000,
            'status' => 'pending',
        ]);

        // Item 2
        MarketplaceItem::create([
            'user_id' => $users[1]->id,
            'category_id' => $cats->where('slug','elektronik')->first()?->id,
            'title' => 'Charger Laptop Asus Original 65W',
            'description' => "Charger laptop Asus original 65W, cocok untuk seri VivoBook dan ZenBook. Kabel masih mulus, tidak pernah digulung paksa. Output 19V 3.42A. Jual karena sudah ganti laptop. COD sekitar kampus UNNES Sekaran.",
            'price' => 120000,
            'status' => 'pending',
        ]);

        // Item 3
        MarketplaceItem::create([
            'user_id' => $users[2]->id,
            'category_id' => $cats->where('slug','buku-alat-tulis')->first()?->id,
            'title' => 'Paket Buku Kalkulus + Fisika Dasar Semester 1',
            'description' => "Jual paket buku: Kalkulus (Purcell edisi 9) dan Fisika Dasar (Halliday). Kondisi buku 80%, ada highlight di beberapa bab tapi masih sangat layak pakai. Cocok untuk mahasiswa MIPA/Teknik semester 1-2.",
            'price' => 75000,
            'status' => 'pending',
        ]);
    }
}
