<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sponsor;
use App\Models\User;

class SponsorDummySeeder extends Seeder
{
    public function run()
    {
        // Clear existing sponsors to avoid mess
        Sponsor::truncate();

        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Sponsor Tester',
                'email' => 'sponsor@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        $sponsors = [
            [
                'user_id' => $user->id,
                'title' => 'Kedai Kopi Kampus',
                'description' => 'Sponsor untuk banner promo diskon 50% bagi mahasiswa UNNES setiap hari Jumat. Kedai berlokasi di depan pintu gerbang utama.',
                'image_path' => 'sponsors/dummy1.jpg',
                'status' => 'pending',
                'expires_at' => now()->addMonths(1),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Jasa Print 24 Jam',
                'description' => 'Layanan cetak dokumen dan skripsi cepat 24 jam. Butuh tempat di slot banner samping untuk meningkatkan jangkauan ke mahasiswa semester akhir.',
                'image_path' => 'sponsors/dummy2.jpg',
                'status' => 'pending',
                'expires_at' => now()->addMonths(2),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Event Seminar Nasional IT',
                'description' => 'Seminar nasional teknologi yang akan diadakan di GSG UNNES. Membutuhkan publikasi melalui banner sponsor utama selama 1 bulan.',
                'image_path' => 'sponsors/dummy3.jpg',
                'status' => 'pending',
                'expires_at' => now()->addDays(30),
            ],
        ];

        foreach ($sponsors as $sponsor) {
            Sponsor::create($sponsor);
        }
    }
}
