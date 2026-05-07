<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PollOption extends Model
{
    protected $fillable = [
        'daily_poll_id', 'label', 'vote_count', 'sort_order'
    ];

    public function poll()
    {
        return $this->belongsTo(DailyPoll::class, 'daily_poll_id');
    }

    public function votes()
    {
        return $this->hasMany(PollVote::class);
    }
}
