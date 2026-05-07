<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    /**
     * Submit Laporan terhadap Konten Pelanggaran (Polymorphic: Menfess, Komentar, Prodduk)
     */
    public function store(Request $request)
    {
        $request->validate([
            'reportable_id' => 'required|integer',
            'reportable_type' => 'required|string|in:MenfessPost,MenfessComment,Product',
            'reason' => 'required|string|max:100', // SARA, Pornoografi, SPAM, dll.
            'description' => 'nullable|string|max:500',
        ]);

        // Konversi string model ke namespace Laravel lengkap
        $fullModelPath = 'App\\Models\\' . $request->reportable_type;
        
        if (!class_exists($fullModelPath)) {
            return response()->json(['error' => 'Tipe pelaporan tidak valid'], 400);
        }

        $userId = Auth::check() ? Auth::id() : 1;

        // Anti Spam: 1 Pengguna = 1 Report pada 1 Entitas 
        $existingReport = Report::where('reporter_id', $userId)
            ->where('reportable_id', $request->reportable_id)
            ->where('reportable_type', $fullModelPath)
            ->first();

        if ($existingReport) {
            return back()->with('error', 'Kamu sudah melaporkan jejak digital tersebut sebelumnya. Moderator kami sedang menindaknya.');
        }

        Report::create([
            'reporter_id' => $userId,
            'reportable_type' => $fullModelPath,
            'reportable_id' => $request->reportable_id,
            'reason' => $request->reason,
            'description' => $request->description,
            'status' => 'pending', 
        ]);

        // =============== ALGORITMA DE-PLATFORMASI OTOMATIS ================
        // Jika ada laporan organik berjumlah 5 dalam satu entitas yang sama, SENSOR otomatis (Takedown)!
        $totalReports = Report::where('reportable_id', $request->reportable_id)
            ->where('reportable_type', $fullModelPath)
            ->count();

        if ($totalReports >= 5) {
            $model = $fullModelPath::find($request->reportable_id);
            if ($model) {
                if (in_array($request->reportable_type, ['MenfessPost', 'MenfessComment'])) {
                    // Matikan jarak pandang publik
                    $model->update(['is_visible' => false, 'status' => 'suspended']);
                } elseif ($request->reportable_type === 'Product') {
                    // Tolak produk dari etalase Marketplace
                    $model->update(['status' => 'rejected']);
                }
            }
        }

        return back()->with('success', 'Aduan Lampu Merah🚨 berhasil dibunyikan! Identitasmu 100% terjaga kerahasiaannya oleh sistem.');
    }
}
