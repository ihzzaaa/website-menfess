<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenfessComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'menfess_post_id', 'user_id', 'parent_id', 'content', 'alias_name',
        'upvote_count', 'downvote_count', 'report_count', 'is_visible', 'status'
    ];

    protected function casts(): array
    {
        return [
            'is_visible' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new \App\Models\Scopes\ShadowBanScope);
    }

    public function post()
    {
        return $this->belongsTo(MenfessPost::class, 'menfess_post_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function parent()
    {
        return $this->belongsTo(MenfessComment::class, 'parent_id');
    }

    public function replies()
    {
        return $this->hasMany(MenfessComment::class, 'parent_id');
    }

    public function votes()
    {
        return $this->morphMany(Vote::class, 'votable');
    }
}
