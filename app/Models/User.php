<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'email', 'password', 'is_blocked', 'coin_balance', 'is_shadow_banned', 'is_verified_seller', 'google_id', 'avatar_url'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    // Supaya API selalu mengirimkan nilai koin milik si user ke frontend secara otomatis
    protected $appends = ['coin_balance'];
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_blocked' => 'boolean',
            'is_shadow_banned' => 'boolean',
            'is_verified_seller' => 'boolean',
        ];
    }

    public function marketplaceItems()
    {
        return $this->hasMany(MarketplaceItem::class);
    }

    public function sponsors()
    {
        return $this->hasMany(Sponsor::class);
    }

    public function menfessPosts()
    {
        return $this->hasMany(MenfessPost::class);
    }

    public function coinTransactions()
    {
        return $this->hasMany(CoinTransaction::class);
    }

    public function kycRequest()
    {
        return $this->hasOne(KycRequest::class)->latest();
    }

    public function songfessMessages()
    {
        return $this->hasMany(SongfessMessage::class);
    }

    public function menfessComments()
    {
        return $this->hasMany(MenfessComment::class);
    }

    public function menfessAliases()
    {
        return $this->hasMany(MenfessAlias::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function pollVotes()
    {
        return $this->hasMany(PollVote::class);
    }

    public function pointTransactions()
    {
        return $this->hasMany(PointTransaction::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'reporter_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
    
    // Logika Pintar: Menarik semua Koin masuk dikurangi Koin yang dibakar
    public function getCoinBalanceAttribute(): int
    {
        $earned = \App\Models\PointTransaction::where('user_id', $this->id)->where('type', 'earn')->sum('amount');
        $spent = \App\Models\PointTransaction::where('user_id', $this->id)->where('type', 'spend')->sum('amount');
        return max(0, $earned - $spent);
    }
}
