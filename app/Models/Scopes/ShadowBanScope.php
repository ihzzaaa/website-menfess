<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class ShadowBanScope implements Scope
{
    /**
     * Sihir Hukuman Gantung: Terapkan scope ke Query Builder Eloquent.
     */
    public function apply(Builder $builder, Model $model)
    {
        // 1. Jika Auth User sedang login dan dia punya hak khusus (contoh: id = 1 adalah admin)
        // Admin bisa melihat semuanya, kita lepas Scopenya.
        if (Auth::check() && Auth::id() === 1) { // Sesuaikan dengan logika admin system kelak
            return;
        }

        // 2. Terapkan Pembatasan:
        // Konten hanya dirender JIKA milik user biasa yang tidak kena Banned, 
        // ATAU jika itu adalah konten miliknya sendiri (Ia tak menyadari kalau dia kena banned).
        $builder->where(function ($query) {
            $query->whereDoesntHave('user', function ($q) {
                $q->where('is_shadow_banned', true);
            })->orWhere('user_id', Auth::id());
        });
    }
}
