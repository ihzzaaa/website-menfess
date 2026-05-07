<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfanityWord;

class ProfanitySeeder extends Seeder
{
    public function run()
    {
        // Clear existing words to prevent duplicates during testing
        ProfanityWord::truncate();

        $baseWords = [
            'anjing', 'babi', 'monyet', 'bangsat', 'keparat', 'bajingan', 'kampret', 'kunyuk', 'asu', 'celeng',
            'jancuk', 'jancok', 'dancuk', 'diancuk', 'jamput', 'jembut', 'memek', 'kontol', 'peler', 'pepek',
            'pantek', 'pukimak', 'kimak', 'kerek', 'sundala', 'telaso', 'bodoh', 'goblok', 'tolol', 'idiot',
            'bego', 'dungu', 'pekok', 'gila', 'sinting', 'sarap', 'miring', 'edan', 'gendeng', 'sedeng',
            'lonte', 'pelacur', 'perek', 'jablay', 'bispar', 'ayamkampus', 'mucikari', 'germo', 'homo', 'maho',
            'lesbi', 'bencong', 'banci', 'waria', 'autis', 'cacat', 'bangke', 'sampah', 'bedebah', 'sialan',
            'brengsek', 'tai', 'telek', 'berak', 'taik', 'najis', 'haram', 'bangkai', 'kampungan', 'ndeso',
            'katrok', 'norak', 'alay', 'jamet', 'kuper', 'cupu', 'cemen', 'banci', 'kecoak', 'lintah',
            'parasit', 'benalu', 'koruptor', 'maling', 'pencuri', 'copet', 'jambret', 'begal', 'rampok', 'bajak',
            'pemerkosa', 'pembunuh', 'psikopat', 'pedofil', 'bajingan', 'lonte', 'sundal', 'cabul', 'mesum', 'porno',
            'bokep', 'ngentot', 'ngewe', 'ewean', 'kentu', 'sepong', 'toket', 'payudara', 'susu', 'tete',
            'tetek', 'puki', 'vagina', 'penis', 'zakar', 'pelir', 'biji', 'pantat', 'burit', 'silit',
            'dubur', 'bool', 'ngaceng', 'sange', 'coli', 'onani', 'masturbasi', 'ejakulasi', 'mani', 'sperma',
            'peju', 'lendir', 'pelumas', 'peler', 'bijuh', 'tempik', 'turuk', 'itil', 'klitoris', 'jembut',
            'bulu', 'ketek', 'bau', 'busuk', 'bacin', 'apek', 'pesing', 'tengik', 'anyir', 'amis',
            'jelek', 'buruk', 'cacat', 'pincang', 'buta', 'tuli', 'bisu', 'lumpuh', 'kusta', 'kurap',
            'kudis', 'panu', 'kadas', 'koreng', 'borok', 'nanah', 'lendir', 'dahak', 'ingus', 'upil',
            'kotoran', 'najis', 'jijik', 'muak', 'benci', 'dendam', 'marah', 'murka', 'emosi', 'kesal',
            'sial', 'apes', 'celaka', 'bencana', 'musibah', 'kutuk', 'laknat', 'azab', 'neraka', 'iblis',
            'setan', 'jin', 'dedemit', 'genderuwo', 'pocong', 'kuntilanak', 'sundel', 'tuyul', 'babi', 'ngepet',
            // Adding more to reach ~200 basic words
            'brengsek', 'pecundang', 'pengecut', 'hina', 'nista', 'rendahan', 'gembel', 'gelandangan', 'pengemis', 'anakharam',
            'jadah', 'haramjadah', 'lonte', 'pelacur', 'perek', 'jablay', 'cabo', 'lont', 'binal', 'jalang',
            'lacur', 'tunasusila', 'PSK', 'mucikari', 'germo', 'hidunghbelang', 'pedofilia', 'incest', 'sodomi', 'bestiality',
            'nekrofilia', 'zoofilia', 'eksibisionis', 'voyeur', 'sadis', 'masokis', 'BDSM', 'fetish', 'orgasme', 'klimaks',
            'titit', 'burung', 'otong', 'pisang', 'sosis', 'terong', 'timun', 'apem', 'kue', 'kerang'
        ];

        $leetspeak = [
            '4nj1ng', '4njing', 'anj1ng', '4nj!ng', 'anj!ng', '@njing', '4nj1n9', 'anj1n9', 'anjingg', 'anjjiiing',
            'b4b1', 'b4bi', 'bab1', 'b@bi', 'b@b1', 'b4b!', 'bab!', 'babiq', 'babik', 'b4bik',
            'm0ny3t', 'm0nyet', 'mony3t', 'monyettt', 'mony3tt', 'm0ny3tt', 'm0nyettt', 'monyetq', 'm0nyetq', 'monyetk',
            'b4ngs4t', 'b4ngsat', 'bangs4t', 'b@ngsat', 'b@ngs4t', 'bangsatt', 'b4ngs4tt', 'b4ngsatt', 'bangs4tt', 'bangsad',
            'k3p4r4t', 'k3parat', 'kep4rat', 'kepar4t', 'k3p4rat', 'k3par4t', 'kep4r4t', 'keparatt', 'k3p4r4tt', 'keparadd',
            'b4j1ng4n', 'b4jingan', 'baj1ngan', 'bajing4n', 'b4j1ngan', 'b4jing4n', 'baj1ng4n', 'b@jingan', 'b@j1ngan', 'bajingann',
            'k4mpr3t', 'k4mpret', 'kampr3t', 'k@mpret', 'kampretq', 'kamprett', 'k4mpr3tt', 'k4mprett', 'kampr3tt', 'kampredd',
            'k0nt0l', 'k0ntol', 'kont0l', 'k0nt0ll', 'k0ntoll', 'kont0ll', 'kontoll', 'k0nt0lq', 'k0ntolq', 'kont0lq',
            'p3m3k', 'p3mek', 'pem3k', 'p3m3kk', 'p3mekk', 'pem3kk', 'mem3k', 'm3m3k', 'm3mek', 'm3m3kk',
            'j4ncuk', 'j4nc0k', 'janc0k', 'j4ncuq', 'jancuq', 'j4ncok', 'j4ncuk', 'd4ncuk', 'd4nc0k', 'danc0k',
            't41', 't4i', 'ta1', 't@i', 't@1', 'taik', 't4ik', 't41k', 't@ik', 't@1k',
            'g0bl0k', 'g0blok', 'gobl0k', 'g0bl0kk', 'g0blokk', 'gobl0kk', 'goblokk', 'g0bl0kq', 'g0blokq', 'gobl0kq',
            't0l0l', 't0lol', 'tol0l', 't0l0ll', 't0loll', 'tol0ll', 'tololl', 't0l0lq', 't0lolq', 'tol0lq',
            '1d10t', '1diot', 'id1ot', '1d10tt', '1diott', 'id1ott', 'idiott', '1d10tq', '1diotq', 'id1otq',
            'b3g0', 'b3go', 'beg0', 'b3g0o', 'b3goo', 'beg0o', 'begoo', 'b3g0q', 'b3goq', 'beg0q',
            'j4bl4y', 'j4blay', 'jabl4y', 'j@blay', 'j@bl4y', 'jablayy', 'j4bl4yy', 'j4blayy', 'jabl4yy', 'jablayq',
            'p3r3k', 'p3rek', 'per3k', 'p3r3kk', 'p3rekk', 'per3kk', 'perekk', 'p3r3kq', 'p3rekq', 'per3kq',
            'l0nt3', 'l0nte', 'lont3', 'l0nt3e', 'l0ntee', 'lont3e', 'lontee', 'l0nt3q', 'l0nteq', 'lont3q',
            'ng3nt0t', 'ng3ntot', 'ngent0t', 'ng3nt0tt', 'ng3ntott', 'ngent0tt', 'ngentott', 'ng3w3', 'ng3we', 'ngew3'
        ];

        // Combine and remove exact duplicates just in case
        $allWords = array_unique(array_merge($baseWords, $leetspeak));

        $insertData = [];
        foreach ($allWords as $word) {
            if (!empty(trim($word))) {
                $insertData[] = [
                    'word' => strtolower($word),
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Insert in chunks to avoid query length limits
        $chunks = array_chunk($insertData, 50);
        foreach ($chunks as $chunk) {
            ProfanityWord::insert($chunk);
        }
    }
}
