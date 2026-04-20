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
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Content Moderation</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Pusat kendali Menfess, moderasi laporan, dan manajemen kata terlarang.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold border-gray-200 bg-white">
                        <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Audit Trail
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold bg-black hover:bg-gray-900 border-none">
                        <Skull className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Banned Words
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                {/* Report Queue Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-500" />
                                <h3 className="text-sm font-bold text-gray-900">Report Queue</h3>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">0 Laporan Pending</span>
                        </div>
                        
                        <div className="p-8 text-center bg-white">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-50 mb-4">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                            </div>
                            <h4 className="text-sm font-bold text-gray-900">Semua Bersih!</h4>
                            <p className="text-xs text-gray-500">Tidak ada pesan atau balasan yang dilaporkan saat ini.</p>
                        </div>
                    </div>

                    {/* Pinned Menfess Management */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-white text-left">
                            <div className="flex items-center gap-2">
                                <Pin className="w-4 h-4 text-blue-500" />
                                <h3 className="text-sm font-bold text-gray-900">Pinned Menfess Control</h3>
                            </div>
                            <Button variant="ghost" size="sm" className="text-[10px] font-bold text-gray-400">Atur Biaya Pin</Button>
                        </div>
                        <div className="p-6 bg-white text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                                    <Pin className="w-5 h-5 text-gray-300 mb-2" />
                                    <p className="text-[10px] font-bold text-gray-400">Slot Pin 1 Kosong</p>
                                </div>
                                <div className="p-4 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                                    <Pin className="w-5 h-5 text-gray-300 mb-2" />
                                    <p className="text-[10px] font-bold text-gray-400">Slot Pin 2 Kosong</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panels */}
                <div className="space-y-6 text-left">
                    {/* Banned Words Preview */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-left">
                        <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-red-500" /> Banned Words List
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg flex items-center gap-1 border border-gray-200">
                                kasar <X className="w-2 h-2 cursor-pointer" />
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg flex items-center gap-1 border border-gray-200">
                                rasis <X className="w-2 h-2 cursor-pointer" />
                            </span>
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Tambah kata baru..." 
                                className="w-full text-[10px] px-3 py-2 bg-gray-50 border-none rounded-lg focus:ring-1 focus:ring-black"
                            />
                            <Button className="absolute right-1 top-1 h-6 px-3 text-[10px] rounded-md bg-black">Tambah</Button>
                        </div>
                    </div>

                    {/* Audit Trail Preview */}
                    <div className="bg-gray-900 p-5 rounded-2xl text-white text-left">
                        <div className="flex items-center justify-between mb-4">
                           <h4 className="text-xs font-bold flex items-center gap-2">
                                <History className="w-4 h-4 text-blue-400" /> Real-time Audit
                           </h4>
                           <Eye className="w-3 h-3 text-gray-500" />
                        </div>
                        <div className="space-y-3 opacity-80">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-[9px] font-bold text-blue-400 mb-0.5">Admin Action</p>
                                <p className="text-[9px] text-gray-300 leading-tight">Sistem menghapus pesan berisi kata terlarang "rasis".</p>
                            </div>
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-[9px] font-bold text-blue-400 mb-0.5">Audit Lookup</p>
                                <p className="text-[10px] text-gray-300 leading-tight italic">Belum ada aktivitas audit di balik layar.</p>
                            </div>
                        </div>
                    </div>

                    {/* System Auto-Moderation */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-left">
                        <h4 className="text-xs font-bold text-gray-900 mb-4">Auto-Mod Rules</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-gray-500 font-medium">Auto-delete Reports (3+)</span>
                                <div className="w-8 h-4 bg-gray-100 rounded-full cursor-pointer p-0.5 flex justify-start">
                                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-gray-500 font-medium">Auto-shadowban Toxic</span>
                                <div className="w-8 h-4 bg-black rounded-full cursor-pointer p-0.5 flex justify-end">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
