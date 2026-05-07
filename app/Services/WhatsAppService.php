<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    /**
     * Tembak API Fonnte untuk Broadcasting ke Channel/Grup WA AutoBase Kampus
     */
    public function sendBroadcast(string $message)
    {
        $token = config('services.fonnte.token');
        $target = config('services.fonnte.target');

        // Proteksi cegah error jika lupa config .env
        if (!$token || !$target) {
            Log::warning('WhatsApp Broadcast dibatalkan: Token atau Target Channel belum diatur di .env');
            return false;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => $token,
            ])->post('https://api.fonnte.com/send', [
                'target' => $target,
                'message' => $message,
                'typing' => false,
                'delay' => '1',
            ]);

            if ($response->successful()) {
                Log::info('Autobase Broadcaster Sukses.', ['target' => $target]);
                return true;
            } else {
                Log::error('Gagal mengirim WhatsApp', ['response' => $response->json()]);
                return false;
            }
        } catch (\Exception $e) {
            Log::error('Koneksi Putus ke Gateway WhatsApp API.', ['msg' => $e->getMessage()]);
            return false;
        }
    }
}
