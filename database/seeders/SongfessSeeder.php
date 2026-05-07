<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SongfessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample Analytics
        \App\Models\SongfessAnalytic::insert([
            ['song_title' => 'Satu Bulan', 'artist_name' => 'Bernadya', 'play_count' => 1250, 'created_at' => now(), 'updated_at' => now()],
            ['song_title' => 'Rumah Ke Rumah', 'artist_name' => 'Hindia', 'play_count' => 980, 'created_at' => now(), 'updated_at' => now()],
            ['song_title' => 'Rayuan Perempuan Gila', 'artist_name' => 'Nadin Amizah', 'play_count' => 840, 'created_at' => now(), 'updated_at' => now()],
            ['song_title' => 'Tujuh Belas', 'artist_name' => 'Tulus', 'play_count' => 710, 'created_at' => now(), 'updated_at' => now()],
            ['song_title' => 'Gala Bunga Matahari', 'artist_name' => 'Sal Priadi', 'play_count' => 650, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Sample Filters
        \App\Models\SongfessFilter::insert([
            ['pattern' => 'Lagu Kasar - Artist X', 'reason' => 'Lirik tidak senonoh', 'created_at' => now(), 'updated_at' => now()],
            ['pattern' => 'Hinaan - Artist Y', 'reason' => 'Melecehkan nama institusi', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Sample Settings
        \App\Models\Setting::updateOrCreate(
            ['key' => 'copyright_compliance_mode', 'group' => 'musical_menfess'],
            ['value' => '0']
        );
    }
}
