<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SellerVerification extends Model
{
    protected $fillable = [
        'user_id', 
        'fullname_ktp', 
        'nik', 
        'ktp_image_path', 
        'face_image_path',
        'status', 
        'admin_notes'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
