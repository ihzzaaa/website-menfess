<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenfessPost;
use App\Models\MenfessComment;
use App\Models\MenfessAlias;
use App\Models\AliasPool;

class MenfessSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Suntik Alias Pool Sedikit Saja
        $pools = [
            ['adjective' => 'Si Kucing', 'noun' => 'Pemalu'],
            ['adjective' => 'Si Macan', 'noun' => 'Sambat'],
            ['adjective' => 'Si Pinguin', 'noun' => 'Lapar'],
            ['adjective' => 'Si Mahasiswa', 'noun' => 'Gila'],
        ];
        
        foreach ($pools as $pool) {
            AliasPool::create(['adjective' => $pool['adjective'], 'noun' => $pool['noun'], 'is_active' => true]);
        }

        // 2. Suntik Curhatan Menfess
        $post1 = MenfessPost::create([
            'user_id' => 1,
            'content' => 'Gila, tugas pak Bambang malam ini bikin begadang. Ada yang dari kelompok 3 nggak di sini?',
            'upvote_count' => 12,
            'downvote_count' => 0,
            'comment_count' => 2,
            'share_count' => 5,
            'is_visible' => true,
            'status' => 'active',
        ]);

        $post2 = MenfessPost::create([
            'user_id' => 1,
            'content' => 'Lulus tepat waktu atau lulus di waktu yang tepat ya? Ngerasa insecure lihat circle temen-temen udh pada kerja.',
            'upvote_count' => 45,
            'downvote_count' => 2,
            'comment_count' => 0,
            'share_count' => 1,
            'is_visible' => true,
            'status' => 'active',
        ]);

        // 3. Suntik Balasan untuk Post 1
        MenfessAlias::create(['user_id' => 2, 'menfess_post_id' => $post1->id, 'alias_name' => 'Si Kucing Pemalu']);
        MenfessComment::create([
            'menfess_post_id' => $post1->id,
            'user_id' => 2,
            'content' => 'Gass lekung semangat begadang brow!',
            'upvote_count' => 2,
            'downvote_count' => 0,
            'is_visible' => true,
            'status' => 'active',
        ]);
        
        $aliasTS = MenfessAlias::create(['user_id' => 1, 'menfess_post_id' => $post1->id, 'alias_name' => 'TS / Sender']);
        MenfessComment::create([
            'menfess_post_id' => $post1->id,
            'user_id' => 1,
            'content' => 'Makasih bro atas support nya.',
            'upvote_count' => 1,
            'downvote_count' => 0,
            'is_visible' => true,
            'status' => 'active',
        ]);
    }
}
