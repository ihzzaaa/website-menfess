<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\WhatsAppService;

class SendWhatsAppBroadcast implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $message;
    protected $postId;
    protected $type;

    /**
     * @param string $message  (Teks curhatan atau balasan)
     * @param int $postId      (ID dari referensi post agar bisa dilink)
     * @param string $type     ('post' untuk curhatan baru, 'reply' untuk balasan)
     */
    public function __construct(string $message, int $postId, string $type = 'post')
    {
        $this->message = $message;
        $this->postId = $postId;
        $this->type = $type; 
    }

    /**
     * Tangani logic merangkai teks ala Twitter Autobase lalu distribusikan
     */
    public function handle(WhatsAppService $waService): void
    {
        // 1. URL dinamis website agar pembaca di WA bisa ngeklik link
        // Sesuai gambar referensi: https://zonaunnesfess.my.id/?post_id=69e872...
        $websiteUrl = url('/menfess/' . $this->postId);

        if ($this->type === 'post') {
            // Gaya Bahasa "Cuitan Baru"
            $hashtag = "#KAMPUS" . $this->postId . " (Umum)";
            $finalText = $this->message . "\n\n" . 
                         "-------------\n" .
                         "💌 " . $hashtag . "\n" .
                         "💬 Balas/Lihat di: " . $websiteUrl;

        } else {
            // Gaya Bahasa "Seseorang nimbrung membalas cuitan"
            $finalText = "Seseorang baru saja membalas curhatanmu:\n\n" .
                         "\"" . $this->message . "\"\n\n" .
                         "-------------\n" .
                         "💬 Ikut membalas di: " . $websiteUrl;
        }

        // 2. Eksekusi tembakan jaringan (Otomatis ditangani Laravel Queue di belakang layar!)
        $waService->sendBroadcast($finalText);
    }
}
