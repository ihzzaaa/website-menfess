<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenfessCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'color_theme',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function posts()
    {
        return $this->hasMany(MenfessPost::class);
    }
}
