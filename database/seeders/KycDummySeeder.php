<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\KycRequest;

class KycDummySeeder extends Seeder
{
    public function run()
    {
        $names = ['Agus Kotak', 'Siti Pro', 'Budi Marketplace', 'Rina Jualan', 'Eko Seller'];
        
        foreach ($names as $index => $name) {
            $user = User::create([
                'name' => $name,
                'email' => strtolower(str_replace(' ', '.', $name)) . '@example.com',
                'password' => bcrypt('password'),
            ]);

            KycRequest::create([
                'user_id' => $user->id,
                'ktp_image_path' => "kyc/sample_ktp_{$index}.jpg",
                'status' => 'pending',
                'created_at' => now()->subHours(rand(1, 24)),
            ]);
        }
    }
}
