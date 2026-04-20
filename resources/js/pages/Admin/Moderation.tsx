import { Head } from '@inertiajs/react';
import { 
    MessageSquare, 
    AlertTriangle, 
    Skull, 
    History, 
    Pin,
    Search,
    Shield,
    Trash2,
    Eye,
    CheckCircle2,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Moderation() {
    return (
        <div className="space-y-6 text-left">
            <Head title="Content Moderation" />

            {/* Title & Description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">CONTENT MODERATION</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Pusat kendali Menfess, moderasi laporan, dan manajemen kata terlarang.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed">
                        <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Audit Trail
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 px-6 italic transition-all">
                        <Skull className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" /> Banned Words
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                {/* Report Queue Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 shadow-sm overflow-hidden text-left relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <AlertTriangle className="w-40 h-40 text-white" />
                        </div>
                        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-950/20 relative z-10">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" />
                                <h3 className="text-sm font-black text-white uppercase tracking-widest italic leading-none">REPORT QUEUE</h3>
                            </div>
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] italic">0 Laporan Pending</span>
                        </div>
                        
                        <div className="p-12 text-center relative z-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-zinc-900 border border-zinc-800 mb-6 shadow-inner group-hover:border-red-600/30 transition-colors">
                                <CheckCircle2 className="w-8 h-8 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
                            </div>
                            <h4 className="text-lg font-black text-white uppercase italic tracking-widest mb-2">Semua Bersih!</h4>
                            <p className="text-[11px] text-zinc-500 font-medium italic">Tidak ada pesan atau balasan yang dilaporkan saat ini.</p>
                        </div>
                    </div>

                    {/* Pinned Menfess Management */}
                    <div className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 shadow-sm overflow-hidden text-left relative overflow-hidden">
                        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-950/20 text-left">
                            <div className="flex items-center gap-3">
                                <Pin className="w-5 h-5 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" />
                                <h3 className="text-sm font-black text-white uppercase tracking-widest italic">PINNED MENFESS CONTROL</h3>
                            </div>
                            <Button variant="ghost" size="sm" className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic hover:text-white transition-colors border border-dashed border-zinc-800 rounded-xl h-9 px-4">Atur Biaya Pin</Button>
                        </div>
                        <div className="p-8 text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 rounded-[2rem] border border-dashed border-zinc-800 bg-zinc-950/30 flex flex-col items-center justify-center text-center group hover:border-red-600/30 transition-all">
                                    <Pin className="w-8 h-8 text-zinc-800 mb-4 group-hover:text-red-900/50 transition-colors" />
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic tracking-[0.2em]">Slot Pin 1 Kosong</p>
                                </div>
                                <div className="p-8 rounded-[2rem] border border-dashed border-zinc-800 bg-zinc-950/30 flex flex-col items-center justify-center text-center group hover:border-red-600/30 transition-all">
                                    <Pin className="w-8 h-8 text-zinc-800 mb-4 group-hover:text-red-900/50 transition-colors" />
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic tracking-[0.2em]">Slot Pin 2 Kosong</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panels */}
                <div className="space-y-6 text-left">
                    {/* Banned Words Preview */}
                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left">
                        <h4 className="text-[11px] font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest italic">
                            <Shield className="w-5 h-5 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" /> Banned Words List
                        </h4>
                        <div className="flex flex-wrap gap-2.5 mb-10">
                            <span className="px-3.5 py-1.5 bg-zinc-950 text-zinc-400 text-[10px] font-black rounded-xl flex items-center gap-2 border border-zinc-800 italic group hover:border-red-600/50 hover:text-white transition-all">
                                kasar <X className="w-3 h-3 text-red-600 cursor-pointer" />
                            </span>
                            <span className="px-3.5 py-1.5 bg-zinc-950 text-zinc-400 text-[10px] font-black rounded-xl flex items-center gap-2 border border-zinc-800 italic group hover:border-red-600/50 hover:text-white transition-all">
                                rasis <X className="w-3 h-3 text-red-600 cursor-pointer" />
                            </span>
                        </div>
                        <div className="relative group">
                            <input 
                                type="text" 
                                placeholder="Tambah kata baru..." 
                                className="w-full text-[11px] px-5 py-4 bg-zinc-950 border border-zinc-900 rounded-[1.5rem] focus:ring-1 focus:ring-red-600/30 text-white placeholder:text-zinc-800 italic font-medium group-hover:border-zinc-800 transition-all pr-24"
                            />
                            <Button className="absolute right-2 top-2 h-10 px-4 text-[10px] font-black uppercase tracking-widest rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 hover:border-red-600/30 italic transition-all">Tambah</Button>
                        </div>
                    </div>

                    {/* Audit Trail Preview */}
                    <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white text-left border border-zinc-800 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-[0.02] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="flex items-center justify-between mb-8 relative z-10">
                           <h4 className="text-[11px] font-black flex items-center gap-3 uppercase tracking-widest italic">
                                <History className="w-5 h-5 text-red-600" /> Real-time Audit
                           </h4>
                           <Eye className="w-4 h-4 text-zinc-600" />
                        </div>
                        <div className="space-y-4 relative z-10">
                            <div className="p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 group/item hover:border-red-600/30 transition-colors">
                                <p className="text-[10px] font-black text-red-600 mb-1.5 uppercase italic tracking-widest">Admin Action</p>
                                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium italic">Sistem menghapus pesan berisi kata terlarang "rasis".</p>
                            </div>
                            <div className="p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 italic text-zinc-700">
                                <p className="text-[11px] leading-relaxed font-medium">Belum ada aktivitas audit tambahan di balik layar.</p>
                            </div>
                        </div>
                    </div>

                    {/* System Auto-Moderation Rules */}
                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left">
                        <h4 className="text-[11px] font-black text-white mb-8 uppercase tracking-widest italic">Auto-Mod Rules</h4>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between group">
                                <span className="text-[11px] text-zinc-500 font-bold italic uppercase tracking-tighter group-hover:text-zinc-300 transition-colors">Auto-delete Reports (3+)</span>
                                <div className="w-10 h-5 bg-zinc-800 rounded-full cursor-pointer p-1 flex justify-start border border-zinc-700">
                                    <div className="w-3 h-3 bg-zinc-500 rounded-full shadow-lg transition-all"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between group">
                                <span className="text-[11px] text-zinc-500 font-bold italic uppercase tracking-tighter group-hover:text-zinc-300 transition-colors">Auto-shadowban Toxic</span>
                                <div className="w-10 h-5 bg-red-600/20 rounded-full cursor-pointer p-1 flex justify-end border border-red-500/30 transition-all">
                                    <div className="w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
