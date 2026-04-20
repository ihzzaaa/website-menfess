<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AuthController extends Controller
{
    /**
     * Display the admin login view.
     */
    public function showLoginForm(): Response
    {
        return Inertia::render('Admin/Login', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming admin authentication request.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Log untuk debugging
        \Log::info('Admin login attempt', [
            'email' => $credentials['email'],
            'remember' => $request->boolean('remember'),
            'request_type' => $request->header('X-Inertia') ? 'Inertia' : 'Regular'
        ]);

        if (Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            \Log::info('Admin login successful', [
                'email' => $credentials['email'],
                'admin_id' => Auth::guard('admin')->id()
            ]);

            return redirect()->intended(route('admin.dashboard'));
        }

        \Log::warning('Admin login failed', ['email' => $credentials['email']]);

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    /**
     * Destroy an authenticated session.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login')->with('status', 'Anda berhasil logout.');
    }
}
