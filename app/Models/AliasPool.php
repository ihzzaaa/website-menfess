<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AliasPool extends Model
{
    protected $table = 'alias_pool';

    protected $fillable = [
        'adjective', 'noun', 'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
