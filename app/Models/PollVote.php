<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PollVote extends Model
{
    protected $fillable = [
        'daily_poll_id', 'poll_option_id', 'user_id'
    ];

    const UPDATED_AT = null;

    public function poll()
    {
        return $this->belongsTo(DailyPoll::class, 'daily_poll_id');
    }

    public function option()
    {
        return $this->belongsTo(PollOption::class, 'poll_option_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
