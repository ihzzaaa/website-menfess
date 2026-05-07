<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PollVote extends Model
{
    use HasFactory;

    protected $fillable = [
        'poll_id', 'daily_poll_id', 'poll_option_id', 'user_id', 'selected_option'
    ];

    public function poll()
    {
        return $this->belongsTo(Poll::class);
    }

    public function dailyPoll()
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
