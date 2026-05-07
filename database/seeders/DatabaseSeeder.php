<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed admin account
        $this->call([
            AdminSeeder::class,
        ]);

        // Manual insert raw users without invoking Factory to avoid two_factor_secret column issues
        \App\Models\User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => \Illuminate\Support\Facades\Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        \App\Models\User::firstOrCreate(
            ['email' => 'test2@example.com'],
            [
                'name' => 'Test User ke Dua',
                'password' => \Illuminate\Support\Facades\Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            MarketplaceSeeder::class,
            MenfessSeeder::class,
        ]);
    }
}
