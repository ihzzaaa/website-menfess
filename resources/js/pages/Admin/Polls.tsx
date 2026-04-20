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
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">DAILY POLLS CONFIGURATOR</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Atur jadwal polling harian dan kelola bank soal otomatis.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Bank Soal
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 px-6 italic transition-all">
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" /> Buat Polling
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Scheduler Visualizer */}
                <div className="lg:col-span-2 space-y-6 text-left">
                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                             <Clock className="w-40 h-40 text-white" />
                        </div>
                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <h3 className="text-sm font-black text-white flex items-center gap-3 uppercase tracking-widest italic">
                                <Clock className="w-5 h-5 text-red-600" /> Weekly Schedule
                            </h3>
                            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-950/50 rounded-full border border-zinc-800 italic">
                                <Timer className="w-3.5 h-3.5 text-red-600" />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Next Release: 00:00 AM</span>
                            </div>
                        </div>

                        {/* Schedule Timeline */}
                        <div className="grid grid-cols-7 gap-3 relative z-10">
                            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, i) => (
                                <div key={day} className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-500 ${i === 0 ? 'bg-zinc-900 border-red-600/30 shadow-2xl shadow-red-900/10' : 'bg-zinc-950/30 border-zinc-800/50 opacity-40 hover:opacity-100 hover:border-zinc-700'}`}>
                                    <span className={`text-[10px] font-black uppercase tracking-widest italic ${i === 0 ? 'text-white' : 'text-zinc-700'}`}>{day}</span>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${i === 0 ? 'bg-zinc-950 text-red-600 border-red-600/20 shadow-inner' : 'bg-zinc-900 text-zinc-800 border-zinc-800'}`}>
                                        <ClipboardList className="w-5 h-5 shadow-[0_0_10px_rgba(220,38,38,0.2)]" />
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-tighter italic ${i === 0 ? 'text-red-500' : 'text-zinc-800'}`}>{i === 0 ? 'LIVE' : 'DRAFT'}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-10 p-10 bg-zinc-950/30 rounded-[2rem] border border-dashed border-zinc-800 text-center relative z-10">
                            <DraftingCompass className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                            <h4 className="text-sm font-black text-white uppercase italic tracking-widest">Poll Scheduler Pipeline</h4>
                            <p className="text-[11px] text-zinc-600 max-w-sm mx-auto mt-2 font-medium italic">
                                Belum ada draf polling yang dijadwalkan untuk minggu ini. Silakan tambahkan dari Bank Soal.
                            </p>
                        </div>
                    </div>

                    {/* Quick Trigger Section */}
                    <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group border border-zinc-800 shadow-2xl">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600 opacity-[0.03] rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 relative z-10 text-left">
                            <div className="flex items-start gap-5 text-left">
                                <div className="p-4 bg-zinc-800 rounded-[1.5rem] border border-zinc-700 group-hover:border-red-600/50 transition-colors">
                                    <Smartphone className="w-8 h-8 text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-base font-black uppercase tracking-widest italic leading-none mb-2">MANUAL RESULT TRIGGER</h4>
                                    <p className="text-[11px] text-zinc-500 max-w-xs leading-relaxed italic font-medium">
                                        Gunakan ini jika sistem otomatis gagal mengirim hasil polling ke WhatsApp Channel.
                                    </p>
                                </div>
                            </div>
                            <Button className="bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 h-12 px-10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic shadow-2xl transition-all border-none w-full sm:w-auto">
                                <Send className="w-4 h-4 mr-2 text-red-600" /> Kirim Hasil Sekarang
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Analytics Area */}
                <div className="space-y-6 text-left">
                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                             <BarChart3 className="w-32 h-32 text-white" />
                        </div>
                        <h4 className="text-[11px] font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest italic relative z-10">
                            <BarChart3 className="w-5 h-5 text-red-600" /> Interaction Stats
                        </h4>
                        <div className="space-y-8 relative z-10">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Voters Ratio</span>
                                    <span className="text-[10px] font-black text-white italic">0.0%</span>
                                </div>
                                <div className="h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 shadow-inner">
                                    <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-0 transition-all duration-1000 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-zinc-950/50 rounded-[1.8rem] border border-zinc-800/50 group-hover:border-zinc-700 transition-colors">
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] leading-none mb-2 italic">Total Votes</p>
                                    <h5 className="text-2xl font-black text-white leading-none italic tracking-tighter">0</h5>
                                </div>
                                <div className="p-5 bg-zinc-950/50 rounded-[1.8rem] border border-zinc-800/50 group-hover:border-zinc-700 transition-colors">
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] leading-none mb-2 italic">Avg/Day</p>
                                    <h5 className="text-2xl font-black text-white leading-none italic tracking-tighter">0</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Log / Alert */}
                    <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 flex items-start gap-5 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="p-3 bg-red-600/10 border border-red-500/20 rounded-xl text-red-600 shadow-inner relative z-10">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div className="relative z-10 text-left">
                            <h4 className="text-[11px] font-black text-white mb-2 uppercase italic tracking-widest">AUTO-RELEASE ACTIVE</h4>
                            <p className="text-[10px] text-zinc-500 leading-relaxed italic font-medium">
                                Polling akan otomatis diperbarui setiap malam pukul 00:00 (WIB).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
