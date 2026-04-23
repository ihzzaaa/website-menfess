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
        if (Schema::hasTable('profanity_words')) {
            Schema::table('profanity_words', function (Blueprint $table) {
                if (!Schema::hasColumn('profanity_words', 'word')) {
                    $table->string('word')->unique()->after('id');
                }
                if (!Schema::hasColumn('profanity_words', 'is_active')) {
                    $table->boolean('is_active')->default(true)->after('word');
                }
            });
        } else {
            Schema::create('profanity_words', function (Blueprint $table) {
                $table->id();
                $table->string('word')->unique();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profanity_words');
    }
};
