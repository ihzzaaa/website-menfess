<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenfessAlias extends Model
{
    protected $fillable = [
        'user_id', 'menfess_post_id', 'alias_name'
    ];

    const UPDATED_AT = null;

    public function post()
    {
        return $this->belongsTo(MenfessPost::class, 'menfess_post_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
