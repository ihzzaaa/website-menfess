<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SongfessMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = \App\Models\User::create([
            'name' => 'Budi Setiawan',
            'email' => 'budi@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        $user2 = \App\Models\User::create([
            'name' => 'Siti Aminah',
            'email' => 'siti@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        \App\Models\SongfessMessage::create([
            'user_id' => $user1->id,
            'sender_name' => 'Budi',
            'recipient_name' => 'Fitriani',
            'song_title' => 'Sial',
            'artist_name' => 'Mahalini',
            'album_art' => 'https://i.scdn.co/image/ab67616d0000b273eb663806e00b84bb724e858a',
            'message' => 'Semoga kamu suka lagu ini, ingat waktu kita di kafe dulu?',
            'is_anonymous' => false,
            'status' => 'approved',
        ]);

        \App\Models\SongfessMessage::create([
            'user_id' => $user2->id,
            'sender_name' => 'Siti',
            'recipient_name' => 'Agus',
            'song_title' => 'Rayu',
            'artist_name' => 'Marion Jola',
            'album_art' => 'https://i.scdn.co/image/ab67616d0000b273b40097a87e5b15b3c4f9f6e1',
            'message' => 'Lagu ini cuma buat kamu yang selalu ada buat aku.',
            'is_anonymous' => true,
        ]);

        \App\Models\SongfessMessage::create([
            'sender_name' => 'Guest',
            'recipient_name' => 'Dina',
            'song_title' => 'Tak Dianggap',
            'artist_name' => 'Lyodra',
            'album_art' => 'https://i.scdn.co/image/ab67616d0000b273e970f5e71f4b0f9f3c1d1a1b',
            'message' => 'Mungkin aku memang nggak berarti buat kamu.',
            'is_anonymous' => true,
        ]);
    }
}
