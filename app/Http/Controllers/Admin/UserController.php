<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Vonis Eksekusi Hukuman Gantung (Shadow Ban)
     */
    public function shadowBan(Request $request, User $user)
    {
        // Toggle (Nyala / Mati)
        $user->update([
            'is_shadow_banned' => !$user->is_shadow_banned
        ]);

        $statusMessage = $user->is_shadow_banned 
            ? "Telah resmi divonis Hukuman Gantung (Shadow Banned)! Seluruh jejak transaksinya, curhatannya, dan produknya akan seketika gaib dari pandangan orang lain."
            : "Telah dimaafkan dari hukuman gantung.";

        return back()->with('success', 'User ' . $user->name . ' ' . $statusMessage);
    }
}
