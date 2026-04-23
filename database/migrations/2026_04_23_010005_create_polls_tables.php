<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // The pgsql-schema.sql dump has an old, different relational structure for polls
        // (daily_polls, poll_options, poll_votes). We are replacing it with a simpler JSON-based one.
        
        // Drop the old tables to avoid conflicts
        Schema::dropIfExists('poll_votes');
        Schema::dropIfExists('poll_options');
        Schema::dropIfExists('daily_polls');
        
        if (!Schema::hasTable('polls')) {
            Schema::create('polls', function (Blueprint $table) {
                $table->id();
                $table->string('question');
                $table->json('options');
                $table->enum('status', ['draft', 'live', 'closed'])->default('draft');
                $table->timestamp('scheduled_for')->nullable();
                $table->unsignedInteger('coin_reward')->default(1);
                $table->timestamps();
                $table->index('status');
            });
        }

        // We already dropped poll_votes, so we can safely create our new structure
        Schema::create('poll_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('poll_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unsignedInteger('selected_option');
            $table->timestamps();
            $table->unique(['poll_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('poll_votes');
        Schema::dropIfExists('polls');
    }
};
