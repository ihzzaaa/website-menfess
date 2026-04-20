<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SongfessMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sender_name',
        'recipient_name',
        'song_title',
        'artist_name',
        'album_art',
        'message',
        'is_anonymous',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
