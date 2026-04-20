import { Head } from '@inertiajs/react';
import { 
    Bell, 
    Send, 
    MessageSquare, 
    Smartphone, 
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    Info,
    History,
    AlertCircle,
    Activity,
    LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Notifications() {
    return (
        <div className="space-y-6 text-left">
            <Head title="WhatsApp & Notification Center" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">WhatsApp & Notification Center</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Kirim pengumuman broadcast dan pantau log pengiriman pesan.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold border-gray-200 bg-white">
                        <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Message Logs
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold bg-black hover:bg-gray-900 border-none px-4">
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Broadcast Message
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Broadcast Center */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <Send className="w-4 h-4 text-black" /> Broadcast Message
                            </h3>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WhatsApp Channel Subscriber</span>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Pesan Pengumuman</label>
                                <textarea 
                                    placeholder="Tulis pengumuman Anda di sini... gunakan {name} untuk mention nama jika tersedia."
                                    className="w-full h-32 p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-1 focus:ring-black placeholder-gray-400"
                                />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100 text-left">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                                        <Info className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-blue-900 leading-none mb-1">Target: Seluruh Subscriber</p>
                                        <p className="text-[9px] text-blue-700 italic leading-none">Estimasi 0 pengiriman via WA Gateway.</p>
                                    </div>
                                </div>
                                <Button className="bg-black text-white hover:bg-gray-900 h-9 px-6 rounded-xl text-[10px] font-bold shrink-0">
                                    Kirim Sekarang
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Message Logs Table Placeholder */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-left min-h-[300px] flex flex-col">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-white text-left">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <History className="w-4 h-4 text-gray-400" /> Recent Logs
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                                    <input type="text" placeholder="Cari log..." className="pl-8 pr-3 py-1.5 bg-gray-50 border-none rounded-lg text-[10px] focus:ring-1 focus:ring-black w-32" />
                                </div>
                                <Button variant="outline" size="sm" className="h-7 px-3 text-[10px] border-gray-100"><Filter className="w-3 h-3 mr-1" /> Type</Button>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white text-left">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                                <Activity className="w-7 h-7 text-gray-200" />
                            </div>
                            <h4 className="text-sm font-bold text-gray-900">Log Pesan Masih Kosong</h4>
                            <p className="text-[11px] text-gray-500 max-w-[200px] leading-relaxed mx-auto">
                                Segala aktivitas notifikasi dan pesan broadcast akan tercatat di sini.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Status Area */}
                <div className="space-y-6 text-left">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left">
                        <h4 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-green-500" /> Gateway Status
                        </h4>
                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest leading-none">Connection</span>
                                    <span className="text-[10px] font-bold text-green-600 leading-none">ONLINE</span>
                                </div>
                                <div className="h-1.5 bg-green-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5 italic">Total Sent</p>
                                    <h5 className="text-lg font-black text-gray-900 leading-none">0</h5>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5 italic">Failed</p>
                                    <h5 className="text-lg font-black text-red-600 leading-none">0</h5>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-6 h-10 border-gray-100 text-[10px] font-bold text-gray-500 hover:text-black rounded-xl">
                            <LogOut className="w-3.5 h-3.5 mr-2" /> Reconnect Gateway
                        </Button>
                    </div>

                    {/* Notification Tips */}
                    <div className="bg-gray-900 p-6 rounded-3xl text-white text-left shadow-lg shadow-black/10">
                        <h4 className="text-xs font-bold mb-4 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-400" /> Notification Rules
                        </h4>
                        <ul className="space-y-3 opacity-80">
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                                <p className="text-[10px] leading-relaxed italic">Broadcast maksimal dikirim 1x sehari untuk menghindari SPAM rating oleh WhatsApp.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                                <p className="text-[10px] leading-relaxed italic">Gunakan format markdown sederhana {`*tebal*`} atau {`_miring_`} untuk pesan WA.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
