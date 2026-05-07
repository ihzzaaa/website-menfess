<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    /**
     * Redirect User ke Halaman Login Google
     */
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Menerima callback kembalian dari Server Google
     */
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            // Check apakah user tersebut sudah pernah ada di database kita
            $user = User::where('google_id', $googleUser->id)
                        ->orWhere('email', $googleUser->email)
                        ->first();
                        
            if (!$user) {
                // Registrasi Otomatis!
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'password' => Hash::make(Str::random(16)), // Dummy password karena SSO
                    'google_id' => $googleUser->id,
                    'avatar_url' => $googleUser->avatar ?? null,
                    'email_verified_at' => now(), // Google User sudah pasti tervalidasi email
                ]);
            } else {
                // Jika user login pake metode konvensional sebelumnya, kita update google_id-nya
                if (!$user->google_id) {
                    $user->update([
                        'google_id' => $googleUser->id,
                        'avatar_url' => $googleUser->avatar ?? $user->avatar_url,
                    ]);
                }
            }

            Auth::login($user);

            return redirect()->intended('/');
            
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Gagal memproses autentikasi via Google SSO.');
        }
    }
}
