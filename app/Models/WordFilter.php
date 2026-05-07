<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WordFilter extends Model
{
    protected $fillable = [
        'word', 'replacement', 'is_active', 'severity'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
