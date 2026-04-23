<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenfessComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'menfess_post_id',
        'user_id',
        'content',
        'alias_name',
        'is_visible',
        'report_count',
    ];

    protected function casts(): array
    {
        return [
            'is_visible' => 'boolean',
        ];
    }

    public function post()
    {
        return $this->belongsTo(MenfessPost::class, 'menfess_post_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
