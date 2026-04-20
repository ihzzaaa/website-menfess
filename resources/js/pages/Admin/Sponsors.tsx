import { Head } from '@inertiajs/react';
import { 
    Gift, 
    Upload, 
    Image as ImageIcon, 
    Calendar, 
    ExternalLink, 
    Trash2, 
    MoreVertical, 
    Plus,
    LayoutGrid,
    Clock,
    AlertCircle,
    GripVertical,
    Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Sponsors() {
    return (
        <div className="space-y-6 text-left">
            <Head title="Sponsor & Banner Management" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">SPONSOR & BANNER MANAGEMENT</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Kelola gambar carousel, urutan sponsor, dan masa berlaku iklan.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Ad History
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 px-6 italic transition-all">
                        <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" /> Upload Banner
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Carousel & Banner Manager */}
                <div className="lg:col-span-2 space-y-6 text-left">
                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                             <ImageIcon className="w-48 h-48 text-white" />
                        </div>
                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <h3 className="text-sm font-black text-white flex items-center gap-3 uppercase tracking-widest italic">
                                <ImageIcon className="w-5 h-5 text-red-600" /> Active Carousel
                            </h3>
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none bg-zinc-950/50 px-4 py-2 rounded-full border border-zinc-800 italic">0/5 Active Slots</span>
                        </div>
                        
                        {/* Banner Slot Placeholder */}
                        <div className="space-y-4 relative z-10">
                             <div className="p-12 border-2 border-dashed border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center bg-zinc-950/30 group/slot hover:border-red-600/30 transition-all duration-500">
                                <div className="w-20 h-20 rounded-[2rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner transition-transform group-hover/slot:scale-110 duration-500">
                                    <ImageIcon className="w-10 h-10 text-zinc-800" />
                                </div>
                                <h4 className="text-sm font-black text-white uppercase italic tracking-widest">Belum Ada Banner Aktif</h4>
                                <p className="text-[11px] text-zinc-600 max-w-[260px] mx-auto mt-2 leading-relaxed italic font-medium">
                                    Unggah gambar promosi atau sponsor untuk ditampilkan di halaman utama website.
                                </p>
                                <Button className="mt-8 h-12 px-10 rounded-2xl bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 text-[10px] font-black uppercase tracking-widest italic shadow-xl transition-all">
                                    <Plus className="w-4 h-4 mr-2 text-red-600" /> Tambah Banner Pertama
                                </Button>
                             </div>
                        </div>
                    </div>

                    {/* Expiry Management List Placeholder */}
                    <div className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 shadow-sm overflow-hidden text-left min-h-[350px] flex flex-col group">
                        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-950/20 text-left relative z-10">
                            <h3 className="text-sm font-black text-white flex items-center gap-3 uppercase tracking-widest italic">
                                <Clock className="w-5 h-5 text-red-600" /> Ad Expiry Monitor
                            </h3>
                            <Button variant="ghost" size="sm" className="h-9 px-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest italic hover:text-white transition-all">Filter By Date</Button>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent opacity-50"></div>
                            <div className="w-20 h-20 rounded-[1.8rem] bg-zinc-900 border border-zinc-800/50 flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-500">
                                <Calendar className="w-8 h-8 text-zinc-800" />
                            </div>
                            <h4 className="text-sm font-black text-white leading-none uppercase italic tracking-widest relative z-10">Tidak Ada Iklan Terjadwal</h4>
                            <p className="text-[11px] text-zinc-600 max-w-[320px] leading-relaxed mx-auto italic mt-3 font-medium relative z-10 text-center">
                                Iklan dengan masa berlaku terbatas akan muncul di sini untuk memudahkan Anda memantau durasi kontrak sponsor.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Side Control & Preview Area */}
                <div className="space-y-6 text-left">
                    <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white text-left relative overflow-hidden group border border-zinc-800 shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                        <h4 className="text-[11px] font-black mb-8 flex items-center gap-3 relative z-10 text-white uppercase tracking-widest italic">
                            <Eye className="w-5 h-5 text-red-600" /> Live Preview
                        </h4>
                        <div className="aspect-[16/9] w-full bg-zinc-950 rounded-[2rem] border border-zinc-800/80 flex flex-col items-center justify-center relative z-10 group-hover:border-red-600/30 transition-all duration-500 shadow-inner">
                            <ImageIcon className="w-12 h-12 text-zinc-800 opacity-30 mb-3" />
                            <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest leading-none italic">Mobile Home Preview</p>
                        </div>
                        <div className="mt-8 flex flex-col gap-3 relative z-10">
                           <div className="p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 flex items-center justify-between group/row hover:border-zinc-700 transition-colors">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Carousel Speed</span>
                                <span className="text-[10px] font-black text-white italic">5s (Auto)</span>
                           </div>
                           <div className="p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 flex items-center justify-between group/row hover:border-zinc-700 transition-colors">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Banner Format</span>
                                <span className="text-[10px] font-black text-white italic">Responsive</span>
                           </div>
                        </div>
                    </div>

                    {/* Guidelines & Rules */}
                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-[0.02] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                        <h4 className="text-[11px] font-black text-white mb-8 flex items-center gap-3 leading-none uppercase tracking-widest italic relative z-10">
                            <AlertCircle className="w-5 h-5 text-red-600" /> Upload Rules
                        </h4>
                        <div className="space-y-6 relative z-10">
                            <div className="flex items-start gap-4 group/item">
                                <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-black text-zinc-500 shrink-0 group-hover/item:border-red-600/50 group-hover/item:text-white transition-all italic">1</div>
                                <p className="text-[11px] text-zinc-500 leading-relaxed italic font-medium group-hover/item:text-zinc-300 transition-colors">Rekomendasi rasio gambar adalah 16:9 atau 21:9 untuk tampilan optimal di desktop & mobile.</p>
                            </div>
                            <div className="flex items-start gap-4 group/item">
                                <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-black text-zinc-500 shrink-0 group-hover/item:border-red-600/50 group-hover/item:text-white transition-all italic">2</div>
                                <p className="text-[11px] text-zinc-500 leading-relaxed italic font-medium group-hover/item:text-zinc-300 transition-colors">Ukuran file maksimal per gambar adalah 2MB dalam format .JPG atau .PNG guna menjaga kecepatan load.</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-8 h-10 text-[10px] font-black text-zinc-600 hover:text-white uppercase tracking-[0.2em] italic border border-dashed border-zinc-800 rounded-xl transition-all">
                            Selengkapnya
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
