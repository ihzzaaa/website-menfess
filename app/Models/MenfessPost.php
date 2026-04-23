<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenfessPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'menfess_category_id',
        'content',
        'alias_name',
        'is_visible',
        'is_pinned',
        'pinned_until',
        'report_count',
        'upvote_count',
        'downvote_count',
        'is_wtb',
    ];

    protected function casts(): array
    {
        return [
            'is_visible' => 'boolean',
            'is_pinned' => 'boolean',
            'is_wtb' => 'boolean',
            'pinned_until' => 'datetime',
        ];
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

    public function votes()
    {
        return $this->hasMany(MenfessVote::class);
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
