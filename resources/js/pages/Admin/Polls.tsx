import { Head } from '@inertiajs/react';
import { 
    ClipboardList, 
    Calendar, 
    Clock, 
    Send, 
    Smartphone, 
    Plus,
    MoreVertical,
    BarChart3,
    CheckCircle2,
    XCircle,
    DraftingCompass,
    Timer,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Polls() {
    return (
        <div className="space-y-6 text-left">
            <Head title="Daily Polls Configurator" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Daily Polls Configurator</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Atur jadwal polling harian dan kelola bank soal otomatis.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold border-gray-200 bg-white shadow-sm">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Bank Soal
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold bg-black hover:bg-gray-900 border-none px-4 shadow-lg shadow-black/10">
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Buat Polling
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Scheduler Visualizer */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-500" /> Weekly Schedule
                            </h3>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                                <Timer className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Next Release: 00:00 AM</span>
                            </div>
                        </div>

                        {/* Schedule Timeline */}
                        <div className="grid grid-cols-7 gap-3">
                            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, i) => (
                                <div key={day} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${i === 0 ? 'bg-black border-black shadow-lg shadow-black/10' : 'bg-gray-50 border-gray-100 opacity-50'}`}>
                                    <span className={`text-[10px] font-bold ${i === 0 ? 'text-gray-400' : 'text-gray-400'}`}>{day}</span>
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${i === 0 ? 'bg-white text-black' : 'bg-gray-200 text-gray-400'}`}>
                                        <ClipboardList className="w-4 h-4" />
                                    </div>
                                    <span className={`text-[8px] font-black uppercase ${i === 0 ? 'text-white' : 'text-gray-500'}`}>{i === 0 ? 'LIVE' : 'DRAFT'}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                            <DraftingCompass className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                            <h4 className="text-sm font-bold text-gray-900">Poll Scheduler Pipeline</h4>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-2 italic">
                                Belum ada draf polling yang dijadwalkan untuk minggu ini. Silakan tambahkan dari Bank Soal.
                            </p>
                        </div>
                    </div>

                    {/* Quick Trigger Section */}
                    <div className="bg-black p-6 rounded-3xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-2xl">
                                    <Smartphone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">Manual Result Trigger</h4>
                                    <p className="text-[10px] text-gray-400 max-w-xs leading-relaxed mt-1">
                                        Gunakan ini jika sistem otomatis gagal mengirim hasil polling ke WhatsApp Channel.
                                    </p>
                                </div>
                            </div>
                            <Button className="bg-white text-black hover:bg-gray-100 h-10 px-6 rounded-xl text-xs font-bold shrink-0">
                                <Send className="w-3.5 h-3.5 mr-2" /> Kirim Hasil Sekarang
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Analytics Area */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left">
                        <h4 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-purple-500" /> Interaction Stats
                        </h4>
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-500">Voters Ratio</span>
                                    <span className="text-xs font-black text-gray-900">0%</span>
                                </div>
                                <div className="h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                    <div className="h-full bg-purple-500 w-0 transition-all duration-1000"></div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Total Votes</p>
                                    <h5 className="text-xl font-black text-gray-900 leading-none">0</h5>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Avg/Day</p>
                                    <h5 className="text-xl font-black text-gray-900 leading-none">0</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Log / Alert */}
                    <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                            <AlertCircle className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold text-blue-900 mb-1 leading-none">Auto-Release Active</h4>
                            <p className="text-[10px] text-blue-700 leading-relaxed italic">
                                Polling akan otomatis diperbarui setiap malam pukul 00:00 (WIB).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
