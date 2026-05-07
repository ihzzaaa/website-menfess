<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('menfess_posts', function (Blueprint $table) {
            $table->foreignId('menfess_category_id')->nullable()->constrained('menfess_categories')->onDelete('set null')->after('user_id');
        });
    }

    public function down(): void
    {
        Schema::table('menfess_posts', function (Blueprint $table) {
            $table->dropForeign(['menfess_category_id']);
            $table->dropColumn('menfess_category_id');
        });
    }
};
