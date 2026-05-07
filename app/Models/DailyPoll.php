<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyPoll extends Model
{
    protected $fillable = [
        'question', 'starts_at', 'ends_at', 'is_active', 'result_sent', 'total_votes'
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'is_active' => 'boolean',
        'result_sent' => 'boolean',
    ];

    public function options()
    {
        return $this->hasMany(PollOption::class);
    }

    public function votes()
    {
        return $this->hasMany(PollVote::class);
    }
}
