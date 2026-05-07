<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenfessPost;
use App\Models\MenfessCategory;
use App\Models\User;

class MenfessDummySeeder extends Seeder
{
    public function run()
    {
        // Clear existing posts to avoid clutter
        MenfessPost::truncate();

        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Menfess User',
                'email' => 'menfess@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        $categories = MenfessCategory::all();

        $posts = [
            [
                'user_id' => $user->id,
                'menfess_category_id' => $categories->where('slug', 'anjem')->first()?->id,
                'content' => '[Anjem] Ada yang mau bareng dari Sekaran ke Simpang Lima sore ini jam 4? Seat kosong 1, motor Beat merah. DM ya!',
                'alias_name' => 'BeatMerah99',
                'is_visible' => true,
                'is_pinned' => false,
                'report_count' => 0,
            ],
            [
                'user_id' => $user->id,
                'menfess_category_id' => $categories->where('slug', 'kost-kontrakan')->first()?->id,
                'content' => 'Info kost putri daerah Gang Rambutan yang include wifi dan air lancar dong. Budget max 600rb. Makasih sender!',
                'alias_name' => 'MabaBingung',
                'is_visible' => true,
                'is_pinned' => true,
                'pinned_until' => now()->addDays(1),
                'report_count' => 0,
            ],
            [
                'user_id' => $user->id,
                'menfess_category_id' => $categories->where('slug', 'curhat')->first()?->id,
                'content' => 'Gila ya, tugas semester ini bener-bener gak ada habisnya. Baru selesai laporan satu, eh udah nongol lagi kuis mendadak. Semangat pejuang skripsi!',
                'alias_name' => 'SiPalingSambat',
                'is_visible' => true,
                'is_pinned' => false,
                'report_count' => 2, // Dummy report for testing
            ],
        ];

        foreach ($posts as $post) {
            MenfessPost::create($post);
        }
    }
}
