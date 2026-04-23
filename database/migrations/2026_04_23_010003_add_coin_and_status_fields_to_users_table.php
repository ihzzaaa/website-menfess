<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'coin_balance')) {
                $table->unsignedInteger('coin_balance')->default(0)->after('password');
            }
            // is_shadow_banned and is_verified_seller may already exist from schema dump
            if (!Schema::hasColumn('users', 'is_shadow_banned')) {
                $table->boolean('is_shadow_banned')->default(false)->after('is_blocked');
            }
            if (!Schema::hasColumn('users', 'is_verified_seller')) {
                $table->boolean('is_verified_seller')->default(false)->after('is_shadow_banned');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['coin_balance', 'is_shadow_banned', 'is_verified_seller']);
        });
    }
};
