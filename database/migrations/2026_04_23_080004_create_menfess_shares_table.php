<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('menfess_shares')) {
            Schema::create('menfess_shares', function (Blueprint $table) {
                $table->id();
                $table->foreignId('menfess_post_id')->constrained()->onDelete('cascade');
                $table->string('share_token')->unique();
                $table->timestamp('created_at')->useCurrent();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('menfess_shares');
    }
};
