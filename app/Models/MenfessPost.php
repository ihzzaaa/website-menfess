<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenfessPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'menfess_category_id', 'content', 'alias_name', 
        'media_path', 'media_type', 'is_pinned', 'pinned_until', 
        'is_sponsored', 'is_repost', 'original_post_id', 'repost_comment', 
        'upvote_count', 'downvote_count', 'comment_count', 'share_count', 
        'report_count', 'is_visible', 'status', 'marketplace_category_id', 'is_wtb'
    ];

    protected function casts(): array
    {
        return [
            'is_visible' => 'boolean',
            'is_pinned' => 'boolean',
            'is_sponsored' => 'boolean',
            'is_repost' => 'boolean',
            'is_wtb' => 'boolean',
            'pinned_until' => 'datetime',
        ];
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope(new \App\Models\Scopes\ShadowBanScope);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(MenfessComment::class);
    }

    public function category()
    {
        return $this->belongsTo(MenfessCategory::class, 'menfess_category_id');
    }

    public function aliases()
    {
        return $this->hasMany(MenfessAlias::class);
    }

    public function votes()
    {
        return $this->morphMany(Vote::class, 'votable');
    }

    public function originalPost()
    {
        return $this->belongsTo(MenfessPost::class, 'original_post_id');
    }

    public function marketplaceCategory()
    {
        return $this->belongsTo(Category::class, 'marketplace_category_id');
    }

    public function reposts()
    {
        return $this->hasMany(MenfessPost::class, 'original_post_id');
    }

    /**
     * Scope: only posts visible to public (not hidden, user not shadow-banned)
     */
    public function scopeVisibleToPublic($query)
    {
        return $query->where('is_visible', true)
            ->whereHas('user', fn($q) => $q->where('is_shadow_banned', false));
    }
}
