<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenfessVote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'menfess_post_id',
        'type',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(MenfessPost::class, 'menfess_post_id');
    }
}
