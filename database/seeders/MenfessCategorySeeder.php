<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenfessCategory;

class MenfessCategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'General', 'slug' => 'general', 'color_theme' => 'zinc'],
            ['name' => 'Curhat', 'slug' => 'curhat', 'color_theme' => 'blue'],
            ['name' => 'Anjem', 'slug' => 'anjem', 'color_theme' => 'emerald'],
            ['name' => 'Kost & Kontrakan', 'slug' => 'kost-kontrakan', 'color_theme' => 'orange'],
            ['name' => 'Tugas & Akademik', 'slug' => 'tugas-akademik', 'color_theme' => 'violet'],
            ['name' => 'Lost & Found', 'slug' => 'lost-found', 'color_theme' => 'red'],
        ];

        foreach ($categories as $cat) {
            MenfessCategory::firstOrCreate(['slug' => $cat['slug']], $cat);
        }
    }
}
