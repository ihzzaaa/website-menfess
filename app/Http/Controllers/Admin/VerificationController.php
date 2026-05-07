<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SellerVerification;

class VerificationController extends Controller
{
    /**
     * Administrator Setujui Formulir Verifikasi KYC
     */
    public function approve(Request $request, SellerVerification $verification)
    {
        if ($verification->status !== 'pending') {
            return back()->with('error', 'Status verifikasi sudah pernah diproses sebelumnya.');
        }

        // 1. Ubah status form pengajuan
        $verification->update([
            'status' => 'approved',
            'admin_notes' => 'Telah disetujui dan diverifikasi oleh sistem administrasi.'
        ]);

        // 2. Aktifkan LENCANA CENTANG BIRU pada Akun User
        $verification->user->update([
            'is_verified_seller' => true
        ]);

        // 3. Integrasi Lonceng: Beritahu Sender bahwa ia sudah terverifikasi!
        $verification->user->notify(new \App\Notifications\MenfessReplyNotification(
            'Selamat! Pengajuan Verifikasi Akun Seller (KTP) telah disetujui. Kamu sekarang memiliki lencana Centang Biru di Marketplace.', 
            'Pusat Bantuan', 
            url('/dashboard')
        ));

        return back()->with('success', 'Akun ' . $verification->user->name . ' resmi mendapatkan Centang Biru!');
    }

    /**
     * Administrator Menolak Formulir Verifikasi karena Blur/Palsu
     */
    public function reject(Request $request, SellerVerification $verification)
    {
        $request->validate([
            'admin_notes' => 'required|string|max:200' // Alasan penolakan wajib diisi
        ]);

        if ($verification->status !== 'pending') {
            return back()->with('error', 'Status verifikasi sudah pernah diproses sebelumnya.');
        }

        $verification->update([
            'status' => 'rejected',
            'admin_notes' => $request->admin_notes
        ]);

        // Beritahu alasan penolakannya lewat Lonceng
        $verification->user->notify(new \App\Notifications\MenfessReplyNotification(
            'Mohon maaf, pengajuan verifikasi KTP-mu ditolak. Alasan Admin: ' . $request->admin_notes, 
            'Pusat Bantuan', 
            url('/dashboard')
        ));

        return back()->with('success', 'Formulir berhasil ditolak lalu disekolahkan ke User kembali.');
    }
}
