<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SellerVerification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SellerVerificationController extends Controller
{
    /**
     * Mengirim form aplikasi KYC "Centang Biru"
     */
    public function store(Request $request)
    {
        $request->validate([
            'fullname_ktp' => 'required|string|max:100',
            'nik' => 'required|digits:16|unique:seller_verifications,nik',
            'ktp_image' => 'required|image|mimes:jpeg,png,jpg|max:5120', // Max 5MB file KTP
            'face_image' => 'required|image|mimes:jpeg,png,jpg|max:5120', // Max 5MB Foto Wajah/Selfie
        ]);

        $userId = Auth::check() ? Auth::id() : 1;

        // Cek proteksi ganda jika API ditembak maling
        if (Auth::check() && Auth::user()->is_verified_seller) {
            return back()->with('error', 'Status akunmu sudah Verified Seller! (Centang Biru)');
        }

        // Mencegah spam submit pengajuan
        $existing = SellerVerification::where('user_id', $userId)
            ->whereIn('status', ['pending'])
            ->first();

        if ($existing) {
            return back()->with('error', 'Kamu masih memiliki berkas pengajuan yang mengantri. Harap tunggu verifikasi Admin Jo.');
        }

        // KEAMANAN KETAT TINGKAT TINGGI:
        // Foto tidak dimasukkan ke dalam `public`, tapi ditaruh di Storage Backend Tertutup `private`
        $ktpPath = $request->file('ktp_image')->store('private/kyc_documents');
        $facePath = $request->file('face_image')->store('private/kyc_documents');

        SellerVerification::create([
            'user_id' => $userId,
            'fullname_ktp' => $request->fullname_ktp,
            'nik' => $request->nik,
            'ktp_image_path' => $ktpPath,
            'face_image_path' => $facePath,
            'status' => 'pending'
        ]);

        return back()->with('success', 'Formulir Identitasmu sukses digudangkan! Tunggu tim Admin memverifikasi (1x24 jam).');
    }
}
