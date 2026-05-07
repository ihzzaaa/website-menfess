<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SongfessAnalytic extends Model
{
    protected $table = 'songfess_analytics';
    
    protected $fillable = [
        'song_title',
        'artist_name',
        'album_art',
        'play_count',
        'last_requested_at',
    ];
}
