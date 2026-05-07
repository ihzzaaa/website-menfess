<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('menfess_posts')) {
            Schema::table('menfess_posts', function (Blueprint $table) {
                if (!Schema::hasColumn('menfess_posts', 'alias_name')) {
                    $table->string('alias_name')->nullable();
                }
                if (!Schema::hasColumn('menfess_posts', 'is_visible')) {
                    $table->boolean('is_visible')->default(true);
                }
                if (!Schema::hasColumn('menfess_posts', 'report_count')) {
                    $table->unsignedInteger('report_count')->default(0);
                }
                if (!Schema::hasColumn('menfess_posts', 'is_wtb')) {
                    $table->boolean('is_wtb')->default(false);
                }
            });
        } else {
            Schema::create('menfess_posts', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->text('content');
                $table->string('alias_name')->nullable();
                $table->boolean('is_visible')->default(true);
                $table->boolean('is_pinned')->default(false);
                $table->timestamp('pinned_until')->nullable();
                $table->unsignedInteger('report_count')->default(0);
                $table->unsignedInteger('upvote_count')->default(0);
                $table->unsignedInteger('downvote_count')->default(0);
                $table->boolean('is_wtb')->default(false);
                $table->timestamps();
                $table->index(['is_visible', 'created_at']);
                $table->index('is_pinned');
            });
        }
    }

    public function down(): void
    {
        // Don't drop the table in down if we just added columns
    }
};
