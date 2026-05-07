<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('alias_pool')) {
            Schema::create('alias_pool', function (Blueprint $table) {
                $table->id();
                $table->string('adjective');
                $table->string('noun');
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('alias_pool');
    }
};
