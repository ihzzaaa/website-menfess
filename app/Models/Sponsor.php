<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'description', 'image_path', 'status', 'expires_at',
        'name', 'image_url', 'redirect_link', 'starts_at', 'ends_at', 'is_active', 'click_count', 'view_count'
    ];

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
