<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Ambil data lonceng merah pengguna saat ini via JSON Array
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user) return response()->json([]);

        // Mengambil fitur unreadNotifications bawaan Laravel
        $notifications = $user->unreadNotifications;

        return response()->json(['data' => $notifications]);
    }

    /**
     * Ubah status lonceng menjadi sudah dibaca
     */
    public function markAsRead($id)
    {
        $user = Auth::user();
        if (!$user) return response()->json(['success' => false], 401);

        $notification = $user->notifications()->where('id', $id)->first();
        if ($notification) {
            $notification->markAsRead();
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Lonceng tidak ditemukan'], 404);
    }
}
