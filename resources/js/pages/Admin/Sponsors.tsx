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
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Sponsor & Banner Management</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Kelola gambar carousel, urutan sponsor, dan masa berlaku iklan.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold border-gray-200 bg-white shadow-sm">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Ad History
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold bg-black hover:bg-gray-900 border-none px-4 shadow-lg shadow-black/10">
                        <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Upload Banner
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Carousel & Banner Manager */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-purple-500" /> Active Carousel
                            </h3>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">0/5 Active Slots</span>
                        </div>
                        
                        {/* Banner Slot Placeholder */}
                        <div className="space-y-4">
                             <div className="p-8 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-center bg-gray-50/30">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                    <ImageIcon className="w-8 h-8 text-gray-200" />
                                </div>
                                <h4 className="text-sm font-bold text-gray-900">Belum Ada Banner Aktif</h4>
                                <p className="text-xs text-gray-500 max-w-[240px] mx-auto mt-2 leading-relaxed">
                                    Unggah gambar promosi atau sponsor untuk ditampilkan di halaman utama website.
                                </p>
                                <Button className="mt-6 h-9 px-6 rounded-xl bg-black text-white hover:bg-gray-900 text-[10px] font-bold">
                                    Tambah Banner Pertama
                                </Button>
                             </div>
                        </div>
                    </div>

                    {/* Expiry Management List Placeholder */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-left min-h-[300px] flex flex-col">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-white text-left">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-400" /> Ad Expiry Monitor
                            </h3>
                            <Button variant="ghost" size="sm" className="h-7 px-3 text-[10px] font-bold text-gray-400">Filter By Date</Button>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white text-left">
                            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
                                <Calendar className="w-6 h-6 text-orange-200" />
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 leading-none">Tidak Ada Iklan Terjadwal</h4>
                            <p className="text-[11px] text-gray-500 max-w-[300px] leading-relaxed mx-auto italic mt-2.5">
                                Iklan dengan masa berlaku terbatas akan muncul di sini untuk memudahkan Anda memantau durasi kontrak sponsor.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Side Control & Preview Area */}
                <div className="space-y-6 text-left">
                    <div className="bg-gray-900 p-6 rounded-3xl text-white text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                        <h4 className="text-sm font-bold mb-6 flex items-center gap-2 relative z-10 text-white">
                            <Eye className="w-4 h-4 text-blue-400" /> Live Preview
                        </h4>
                        <div className="aspect-[16/9] w-full bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center relative z-10">
                            <ImageIcon className="w-10 h-10 text-gray-700 opacity-30 mb-2" />
                            <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-none">Mobile Home Preview</p>
                        </div>
                        <div className="mt-6 flex flex-col gap-2 relative z-10">
                           <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-gray-300">Carousel Speed</span>
                                <span className="text-[10px] font-bold text-white">5s (Auto)</span>
                           </div>
                           <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-gray-300">Banner Format</span>
                                <span className="text-[10px] font-bold text-white">Responsive</span>
                           </div>
                        </div>
                    </div>

                    {/* Guidelines & Rules */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left">
                        <h4 className="text-xs font-bold text-gray-900 mb-6 flex items-center gap-2 leading-none">
                            <AlertCircle className="w-4 h-4 text-orange-500" /> Upload Rules
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0">1</div>
                                <p className="text-[10px] text-gray-500 leading-relaxed italic">Rekomendasi rasio gambar adalah 16:9 atau 21:9 untuk tampilan optimal di desktop & mobile.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0">2</div>
                                <p className="text-[10px] text-gray-500 leading-relaxed italic">Ukuran file maksimal per gambar adalah 2MB dalam format .JPG atau .PNG guna menjaga kecepatan load.</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-6 h-9 text-[10px] font-bold text-gray-400 hover:text-black rounded-xl">
                            Selengkapnya
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
