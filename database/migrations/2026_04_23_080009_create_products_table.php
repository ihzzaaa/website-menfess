<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('products')) {
            Schema::create('products', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->foreignId('category_id')->constrained()->onDelete('cascade');
                $table->string('title');
                $table->string('slug')->unique();
                $table->text('description')->nullable();
                $table->decimal('price', 15, 2);
                $table->string('condition')->nullable();
                $table->string('whatsapp_number')->nullable();
                $table->string('status')->default('active');
                $table->boolean('is_promoted')->default(false);
                $table->timestamp('promoted_until')->nullable();
                $table->boolean('is_paid')->default(false);
                $table->integer('view_count')->default(0);
                $table->timestamps();
                $table->softDeletes();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
