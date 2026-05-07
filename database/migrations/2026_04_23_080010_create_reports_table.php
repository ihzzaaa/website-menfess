<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('reports')) {
            Schema::create('reports', function (Blueprint $table) {
                $table->id();
                $table->foreignId('reporter_id')->constrained('users')->onDelete('cascade');
                $table->string('reportable_type');
                $table->unsignedBigInteger('reportable_id');
                $table->string('reason');
                $table->text('description')->nullable();
                $table->string('status')->default('pending');
                $table->foreignId('reviewed_by')->nullable()->constrained('admins')->onDelete('set null');
                $table->timestamp('reviewed_at')->nullable();
                $table->text('admin_notes')->nullable();
                $table->timestamps();
                
                $table->index(['reportable_type', 'reportable_id']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
