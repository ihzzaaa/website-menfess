import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Props {
    notificationRules?: { title: string; content: string };
}

export default function Notifications({ notificationRules }: Props) {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const { data: settingsData, setData: setSettingsData, post: saveSettings, processing: isSavingSettings } = useForm({
        title: notificationRules?.title || "",
        content: notificationRules?.content || "",
    });

    useEffect(() => {
        setSettingsData({
            title: notificationRules?.title || "",
            content: notificationRules?.content || "",
        });
    }, [notificationRules]);

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        saveSettings('/admin/notifications/settings', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Pengaturan Notifikasi berhasil disimpan!');
                setIsSettingsModalOpen(false);
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal menyimpan pengaturan.');
            },
        });
    };
    return (
        <div className="space-y-6 text-left">
            <Head title="WhatsApp & Notification Center" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">WHATSAPP & NOTIFICATION CENTER</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Kirim pengumuman broadcast dan pantau log pengiriman pesan.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed">
                        <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Message Logs
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 px-6 italic transition-all">
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" /> Broadcast Message
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Broadcast Center */}
                <div className="lg:col-span-2 space-y-6 text-left">
                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                             <Bell className="w-40 h-40 text-white" />
                        </div>
                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <h3 className="text-sm font-black text-white flex items-center gap-3 uppercase tracking-widest italic">
                                <Send className="w-5 h-5 text-red-600" /> Broadcast Message
                            </h3>
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] italic">WhatsApp Channel Subscriber</span>
                        </div>
                        
                        <div className="space-y-6 relative z-10">
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1 italic">Pesan Pengumuman</label>
                                <textarea 
                                    placeholder="Tulis pengumuman Anda di sini... gunakan {name} untuk mention nama jika tersedia."
                                    className="w-full h-40 p-6 bg-zinc-950/50 border border-zinc-800 rounded-[2rem] text-[13px] focus:ring-1 focus:ring-red-600 text-white placeholder:text-zinc-800 italic font-medium leading-relaxed"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-between p-7 bg-zinc-950/50 rounded-[2rem] border border-zinc-800 text-left gap-6 group/promo hover:border-red-600/30 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-inner">
                                        <Info className="w-6 h-6 text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-white uppercase tracking-widest italic leading-none mb-2">Target: Seluruh Subscriber</p>
                                        <p className="text-[10px] text-zinc-600 italic leading-none font-medium">Estimasi 0 pengiriman via WA Gateway.</p>
                                    </div>
                                </div>
                                <Button className="bg-zinc-900 border border-dashed border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 hover:border-red-600/30 h-12 px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic shadow-xl transition-all w-full sm:w-auto">
                                    <Send className="w-4 h-4 mr-2 text-red-600" /> Kirim Sekarang
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Message Logs Table Placeholder */}
                    <div className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 shadow-sm overflow-hidden text-left min-h-[350px] flex flex-col group">
                        <div className="p-6 border-b border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-950/20 relative z-10 gap-4">
                            <h3 className="text-sm font-black text-white flex items-center gap-3 uppercase tracking-widest italic">
                                <History className="w-5 h-5 text-red-600" /> Recent Logs
                            </h3>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                    <input type="text" placeholder="Cari log..." className="pl-10 pr-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-xl text-[10px] focus:ring-1 focus:ring-red-600 w-40 text-white italic" />
                                </div>
                                <Button variant="outline" size="sm" className="h-9 px-4 text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white italic border-dashed rounded-xl">
                                    <Filter className="w-3.5 h-3.5 mr-2 text-red-600" /> Type
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent opacity-50"></div>
                            <div className="w-20 h-20 rounded-[1.8rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner relative z-10 transition-transform group-hover:scale-110 duration-500">
                                <Activity className="w-8 h-8 text-zinc-800" />
                            </div>
                            <h4 className="text-sm font-black text-white uppercase italic tracking-widest relative z-10">Log Pesan Masih Kosong</h4>
                            <p className="text-[11px] text-zinc-600 max-w-[220px] leading-relaxed mx-auto font-medium italic relative z-10">
                                Segala aktivitas notifikasi dan pesan broadcast akan tercatat di sini.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Status Area */}
                <div className="space-y-6 text-left">
                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left">
                        <h4 className="text-[11px] font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest italic">
                            <Smartphone className="w-5 h-5 text-red-600" /> Gateway Status
                        </h4>
                        <div className="space-y-6">
                            <div className="p-5 bg-zinc-950/50 rounded-[2rem] border border-zinc-800/80 group">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] leading-none italic">Connection</span>
                                    <span className="text-[10px] font-black text-green-500 leading-none italic uppercase tracking-widest">ONLINE</span>
                                </div>
                                <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 shadow-inner">
                                    <div className="h-full bg-green-500 w-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-950/50 rounded-[1.8rem] border border-zinc-800 shadow-sm group hover:border-zinc-700 transition-all">
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] leading-none mb-2 italic">Total Sent</p>
                                    <h5 className="text-2xl font-black text-white leading-none italic tracking-tighter">0</h5>
                                </div>
                                <div className="p-4 bg-zinc-950/50 rounded-[1.8rem] border border-zinc-800 shadow-sm group hover:border-red-900/50 transition-all">
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] leading-none mb-2 italic">Failed</p>
                                    <h5 className="text-2xl font-black text-red-600 leading-none italic tracking-tighter">0</h5>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-8 h-12 border-zinc-800 bg-zinc-950/50 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-2xl transition-all italic border-dashed">
                            <LogOut className="w-4 h-4 mr-2" /> Reconnect Gateway
                        </Button>
                    </div>

                    {/* Notification Tips (Dynamic) */}
                    <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white text-left shadow-2xl border border-zinc-800/50 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-[0.02] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                        <h4 className="text-[11px] font-black mb-8 flex items-center gap-3 uppercase tracking-widest italic relative z-10">
                            <AlertCircle className="w-5 h-5 text-red-600" /> KELOLA NOTIFIKASI
                        </h4>
                        
                        <div className="space-y-4 mb-10 max-h-[150px] overflow-y-auto custom-scrollbar pr-2 mt-6 relative z-10">
                            {notificationRules?.title && (
                                <p className="text-red-500 text-[11px] font-black italic uppercase tracking-[0.2em] leading-tight mb-2">
                                    {notificationRules.title}
                                </p>
                            )}
                            
                            <div className="space-y-2">
                                {notificationRules?.content ? (
                                    notificationRules.content.split('\n').filter(r => r.trim() !== '').map((rule, idx) => (
                                        <div key={idx} className="flex items-start gap-4 group/item">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)] group-hover/item:scale-150 transition-transform"></div>
                                            <p className="text-[11px] text-zinc-500 leading-relaxed italic font-medium group-hover/item:text-zinc-300 transition-colors">{rule.trim()}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-zinc-600 text-[10px] italic font-medium">Belum ada peraturan notifikasi yang diatur.</p>
                                )}
                            </div>
                        </div>

                        <Button 
                            onClick={() => setIsSettingsModalOpen(true)}
                            variant="outline"
                            className="w-full relative z-10 py-8 bg-zinc-950 text-zinc-400 border border-dashed border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-red-500 hover:border-red-600/30 transition-all shadow-xl italic h-auto"
                        >
                            Kelola Pengaturan
                        </Button>
                    </div>

                    {/* Settings Modal */}
                    <Dialog open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen}>
                        <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[500px] p-0 overflow-hidden rounded-[2.5rem]">
                            <div className="p-8">
                                <DialogHeader className="mb-8">
                                    <DialogTitle className="text-xl font-black italic tracking-widest uppercase">KELOLA NOTIFIKASI</DialogTitle>
                                    <DialogDescription className="text-zinc-500 text-[11px] italic uppercase tracking-widest font-black">
                                        Atur petunjuk penggunaan fitur WhatsApp & Notifikasi di sini.
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleSaveSettings} className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="space-y-2.5">
                                            <Label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic ml-1">
                                                Judul Syarat & Ketentuan
                                            </Label>
                                            <Input
                                                value={settingsData.title}
                                                onChange={(e) => setSettingsData('title', e.target.value)}
                                                placeholder="Contoh: ATURAN BROADCAST WA"
                                                className="bg-zinc-900 border-zinc-800 text-zinc-200 text-[11px] h-12 px-6 rounded-2xl focus:border-red-600/30 focus:ring-1 focus:ring-red-600/20 italic font-black"
                                            />
                                        </div>
                                        <div className="space-y-2.5">
                                            <Label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic ml-1">
                                                Daftar Peraturan (Tiap baris jadi poin)
                                            </Label>
                                            <Textarea
                                                value={settingsData.content}
                                                onChange={(e) => setSettingsData('content', e.target.value)}
                                                placeholder="1. Maksimal 1x per hari...&#13;&#10;2. Gunakan *tebal* untuk..."
                                                className="bg-zinc-900 border-zinc-800 text-zinc-200 text-[11px] min-h-[150px] p-5 rounded-2xl focus:border-red-600/30 focus:ring-1 focus:ring-red-600/20 leading-relaxed italic resize-none custom-scrollbar"
                                            />
                                        </div>
                                    </div>
                                    
                                    <Button
                                        type="submit"
                                        disabled={isSavingSettings}
                                        className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all"
                                    >
                                        {isSavingSettings ? 'MENYIMPAN...' : 'SIMPAN PENGATURAN'}
                                    </Button>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
