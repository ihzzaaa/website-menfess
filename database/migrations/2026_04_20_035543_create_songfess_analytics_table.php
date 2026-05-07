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
        Schema::create('songfess_analytics', function (Blueprint $table) {
            $table->id();
            $table->string('song_title');
            $table->string('artist_name');
            $table->string('album_art')->nullable();
            $table->integer('play_count')->default(0);
            $table->timestamp('last_requested_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songfess_analytics');
    }
};
