<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DailyPoll;
use App\Models\PollOption;
use App\Models\PollVote;
use App\Models\PointTransaction;
use Illuminate\Support\Facades\Auth;

class PollController extends Controller
{
    /**
     * Mengembalikan Data Daily Poll yang Sedang Berjalan Hari Ini
     * (Khusus Endpoint ini direturn berwujud JSON karena poling biasanya di-inject sebagai Widget di pojok layar Frontend)
     */
    public function activePoll()
    {
        $poll = DailyPoll::with(['options' => function($q) {
                $q->orderBy('sort_order', 'asc');
            }])
            ->where('is_active', true)
            ->where('starts_at', '<=', now())
            ->where(function($q) {
                $q->where('ends_at', '>=', now())
                  ->orWhereNull('ends_at');
            })
            ->latest()
            ->first();

        if (!$poll) {
            return response()->json(['data' => null]);
        }

        $userId = Auth::check() ? Auth::id() : 1;
        
        // Mengecek perlindungan "Apakah User ini Pernah Ngevote Sebelumnya?"
        $userVote = PollVote::where('daily_poll_id', $poll->id)
            ->where('user_id', $userId)
            ->first();

        $pollData = $poll->toArray();
        $pollData['has_voted'] = $userVote ? true : false;
        $pollData['user_voted_option_id'] = $userVote ? $userVote->poll_option_id : null;

        // Rahasia Taktis: Hasil persentase voting hanya akan dinampakan jika user tersebut sudah ikut voting!
        if ($userVote && $poll->total_votes > 0) {
            foreach ($pollData['options'] as &$option) {
                $option['percentage'] = round(($option['vote_count'] / $poll->total_votes) * 100, 1);
            }
        }

        return response()->json(['data' => $pollData]);
    }

    /**
     * Menerima Suara/Pilihan dari User pada Daily Poll tertentu
     */
    public function vote(Request $request, DailyPoll $poll)
    {
        $request->validate([
            'poll_option_id' => 'required|exists:poll_options,id'
        ]);

        if (!$poll->is_active || ( $poll->ends_at && $poll->ends_at < now() )) {
            return back()->with('error', 'Sesi voting untuk poling ini sudah ditutup.');
        }

        $userId = Auth::check() ? Auth::id() : 1;

        $hasVoted = PollVote::where('daily_poll_id', $poll->id)
            ->where('user_id', $userId)
            ->exists();

        if ($hasVoted) {
            return back()->with('error', 'Kamu sudah memberikan suara untuk poling ini.');
        }

        // Catat vote di database
        PollVote::create([
            'daily_poll_id' => $poll->id,
            'poll_option_id' => $request->poll_option_id,
            'user_id' => $userId
        ]);

        // Kalkulasikan/Naikkan jumlah agregat suara
        PollOption::where('id', $request->poll_option_id)->increment('vote_count');
        $poll->increment('total_votes');

        // FITUR GAMIFIKASI REWARD: Berikan Poin karena Ia sudah berpartisipasi meramaikan web!
        if (Auth::check()) {
            PointTransaction::create([
                'user_id' => $userId,
                'amount' => 5, // Kita asumsikan 1 vote dihargai 5 Koin
                'type' => 'earn',
                'description' => 'Berpartisipasi dalam Daily Poll',
                'reference_type' => DailyPoll::class,
                'reference_id' => $poll->id
            ]);
        }

        return back()->with('success', 'Suaramu berhasil direkam! +5 Koin Menfess buat kamu.');
    }
}
