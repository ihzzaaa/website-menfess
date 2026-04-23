<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('menfess_comments')) {
            Schema::table('menfess_comments', function (Blueprint $table) {
                if (!Schema::hasColumn('menfess_comments', 'alias_name')) {
                    $table->string('alias_name')->nullable();
                }
                if (!Schema::hasColumn('menfess_comments', 'report_count')) {
                    $table->unsignedInteger('report_count')->default(0);
                }
                // is_visible might already exist
                if (!Schema::hasColumn('menfess_comments', 'is_visible')) {
                    $table->boolean('is_visible')->default(true);
                }
            });
        } else {
            Schema::create('menfess_comments', function (Blueprint $table) {
                $table->id();
                $table->foreignId('menfess_post_id')->constrained()->onDelete('cascade');
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->text('content');
                $table->string('alias_name')->nullable();
                $table->boolean('is_visible')->default(true);
                $table->unsignedInteger('report_count')->default(0);
                $table->timestamps();
                $table->index(['menfess_post_id', 'created_at']);
            });
        }
    }

    public function down(): void
    {
        // ...
    }
};
