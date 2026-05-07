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
        Schema::create('seller_verifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            
            // Data Sensitif (PII - Personally Identifiable Information)
            $table->string('fullname_ktp');
            $table->string('nik', 16)->unique();
            
            // Path folder storage penyimpanan foto (disimpan di /storage/app/private/)
            $table->string('ktp_image_path');
            $table->string('face_image_path');
            
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable(); // Alasan penolakan / Note Admin Jo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seller_verifications');
    }
};
