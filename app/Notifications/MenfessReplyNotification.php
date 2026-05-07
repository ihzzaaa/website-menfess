<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MenfessReplyNotification extends Notification
{
    use Queueable;

    private $replyContent;
    private $replierName;
    private $postUrl;

    /**
     * Create a new notification instance.
     */
    public function __construct($replyContent, $replierName, $postUrl)
    {
        $this->replyContent = $replyContent;
        $this->replierName = $replierName;
        $this->postUrl = $postUrl;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        // Untuk saat ini, lonceng notifikasi hanya ditampung di Database.
        // Jika butuh Email atau WA, kita bisa tambahkan 'mail' atau channel custom
        return ['database']; 
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Menfess Baru Saja Dibalas!',
            'message' => $this->replierName . ' membalas menfess kamu: "' . \Illuminate\Support\Str::limit($this->replyContent, 60) . '"',
            'action_url' => $this->postUrl,
            'icon' => '💬', // Icon UI 
        ];
    }
}
