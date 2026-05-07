<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'user_id', 'category_id', 'title', 'slug', 'description',
        'price', 'condition', 'whatsapp_number', 'status',
        'is_promoted', 'promoted_until', 'is_paid', 'view_count'
    ];

    protected $casts = [
        'is_promoted' => 'boolean',
        'is_paid' => 'boolean',
        'price' => 'decimal:2',
        'promoted_until' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new \App\Models\Scopes\ShadowBanScope);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
