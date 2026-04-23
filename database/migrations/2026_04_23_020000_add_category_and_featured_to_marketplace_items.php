<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('marketplace_items', function (Blueprint $table) {
            if (!Schema::hasColumn('marketplace_items', 'category_id')) {
                $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null')->after('user_id');
            }
            if (!Schema::hasColumn('marketplace_items', 'is_featured')) {
                $table->boolean('is_featured')->default(false)->after('status');
            }
            if (!Schema::hasColumn('marketplace_items', 'featured_until')) {
                $table->timestamp('featured_until')->nullable()->after('is_featured');
            }
        });
    }

    public function down(): void
    {
        Schema::table('marketplace_items', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn(['category_id', 'is_featured', 'featured_until']);
        });
    }
};
