<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'options',
        'status',
        'scheduled_for',
        'coin_reward',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'array',
            'scheduled_for' => 'datetime',
        ];
    }

    public function votes()
    {
        return $this->hasMany(PollVote::class);
    }

    public function totalVotes(): int
    {
        return $this->votes()->count();
    }
}
