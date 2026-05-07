<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenfessShare extends Model
{
    protected $fillable = [
        'menfess_post_id', 'share_token'
    ];

    const UPDATED_AT = null;

    public function post()
    {
        return $this->belongsTo(MenfessPost::class, 'menfess_post_id');
    }
}
