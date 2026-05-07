<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SongfessFilter extends Model
{
    protected $fillable = [
        'pattern',
        'reason',
        'is_active',
    ];
}
