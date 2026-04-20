<?php

namespace App\Http\Controllers\Admin;

use App\Models\SongfessAnalytic;
use App\Models\SongfessFilter;
use App\Models\SongfessMessage;
use App\Models\User;
use App\Models\Setting;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function users()
    {
        return Inertia::render('Admin/Users');
    }

    public function moderation()
    {
        return Inertia::render('Admin/Moderation');
    }

    public function marketplace()
    {
        return Inertia::render('Admin/Marketplace');
    }

    public function polls()
    {
        return Inertia::render('Admin/Polls');
    }

    public function notifications()
    {
        return Inertia::render('Admin/Notifications');
    }

    public function sponsors()
    {
        return Inertia::render('Admin/Sponsors');
    }

    public function musicalMenfess()
    {
        return Inertia::render('Admin/MusicalMenfess', [
            'analytics' => SongfessAnalytic::orderBy('play_count', 'desc')->limit(10)->get(),
            'filters' => SongfessFilter::where('is_active', true)->get(),
            'messages' => SongfessMessage::with('user')->orderBy('created_at', 'desc')->get(),
            'settings' => Setting::where('group', 'musical_menfess')->get()->pluck('value', 'key'),
        ]);
    }

    public function deleteSongfessMessage(SongfessMessage $message)
    {
        $message->delete();
        return back()->with('status', 'Message deleted successfully!');
    }

    public function toggleBlockUser(User $user)
    {
        $user->is_blocked = !$user->is_blocked;
        $user->save();

        $status = $user->is_blocked ? 'User blocked!' : 'User unblocked!';
        return back()->with('status', $status);
    }

    public function toggleMusicalSetting(Request $request)
    {
        $request->validate([
            'key' => 'required|string',
            'value' => 'required',
        ]);

        Setting::updateOrCreate(
            ['key' => $request->key, 'group' => 'musical_menfess'],
            ['value' => $request->value]
        );

        return back()->with('status', 'Setting updated successfully!');
    }

    public function profile()
    {
        return Inertia::render('Admin/Profile', [
            'admin' => Auth::guard('admin')->user(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins,email,' . $admin->id,
            'password' => 'nullable|string|min:8|confirmed',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $admin->name = $request->name;
        $admin->email = $request->email;

        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($admin->avatar) {
                Storage::disk('public')->delete($admin->avatar);
            }
            
            $path = $request->file('avatar')->store('avatars', 'public');
            $admin->avatar = $path;
        }

        if ($request->filled('password')) {
            $admin->password = Hash::make($request->password);
        }

        $admin->save();

        return back()->with('status', 'Profile updated successfully!');
    }
}
