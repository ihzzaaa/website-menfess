<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('menfess_posts', function (Blueprint $table) {
            // Menautkan menfess ke kategori marketplace jika user menjadikannya postingan "WTB"
            $table->foreignId('marketplace_category_id')->nullable()->constrained('categories')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('menfess_posts', function (Blueprint $table) {
            $table->dropForeign(['marketplace_category_id']);
            $table->dropColumn('marketplace_category_id');
        });
    }
};
