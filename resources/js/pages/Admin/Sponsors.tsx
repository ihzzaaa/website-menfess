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
    Eye,
    Zap,
    Activity,
    DollarSign,
    TrendingUp,
    CheckCircle2,
    XCircle,
    Timer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface SponsorItem {
    id: number;
    user: { name: string; avatar?: string; email: string };
    title: string | null;
    description: string | null;
    image_path: string;
    status: string;
    expires_at: string | null;
    created_at: string;
}

interface ActivityLogItem {
    id: number;
    action: string;
    title: string;
    user_name: string;
    status: string;
    time: string;
}

interface Stats {
    total_all: number;
    total_active: number;
    total_rejected: number;
    total_deleted: number;
}

interface Props {
    pendingSponsors?: SponsorItem[];
    sponsorHistory?: SponsorItem[];
    activeSponsors?: SponsorItem[];
    activityLog?: ActivityLogItem[];
    stats?: Stats;
    totalPendingCount?: number;
    sponsorRules?: { title: string; content: string };
    sponsorDuration?: number;
}

export default function Sponsors({ pendingSponsors = [], sponsorHistory = [], activeSponsors = [], activityLog = [], stats = { total_all: 0, total_active: 0, total_rejected: 0, total_deleted: 0 }, totalPendingCount = 0, sponsorRules }: Props) {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [reviewingSponsor, setReviewingSponsor] = useState<SponsorItem | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const { data: uploadData, setData: setUploadData, post: postUpload, processing: isUploading, reset: resetUpload } = useForm({
        title: '',
        description: '',
        image: null as File | null,
    });

    const { data: settingsData, setData: setSettingsData, post: saveSettings, processing: isSavingSettings } = useForm({
        title: sponsorRules?.title || "",
        content: sponsorRules?.content || "",
    });

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        saveSettings('/admin/sponsors/settings', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Pengaturan Sponsor berhasil disimpan!');
                setIsSettingsModalOpen(false);
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal menyimpan pengaturan.');
            },
        });
    };

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postUpload('/admin/sponsors', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Banner berhasil diunggah!');
                setIsUploadModalOpen(false);
                resetUpload();
            },
            onError: () => toast.error('Gagal mengunggah banner.')
        });
    };

    // Sync form data if props update (Inertia refresh)
    useEffect(() => {
        setSettingsData({
            title: sponsorRules?.title || "",
            content: sponsorRules?.content || "",
        });
    }, [sponsorRules]);

    const handleApprove = (id: number) => {
        router.put(`/admin/sponsors/${id}/approve`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Iklan Sponsor disetujui & mulai tayang!'),
            onError: () => toast.error('Gagal menyetujui iklan.')
        });
    };

    const handleReject = (id: number) => {
        router.put(`/admin/sponsors/${id}/reject`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Upload Banner ditolak!'),
            onError: () => toast.error('Gagal menolak banner.')
        });
    };

    const handleDeleteHistory = (id: number) => {
        setConfirmDeleteId(id);
    };

    const confirmDelete = () => {
        if (confirmDeleteId !== null) {
            router.delete(`/admin/sponsors/${confirmDeleteId}/delete`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Iklan berhasil dihapus permanen!');
                    setConfirmDeleteId(null);
                },
                onError: () => toast.error('Gagal menghapus iklan.')
            });
        }
    };

    const handleRestoreHistory = (id: number) => {
        router.put(`/admin/sponsors/${id}/restore`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Iklan dikembalikan ke daftar antrean!'),
            onError: () => toast.error('Gagal mengembalikan iklan.')
        });
    };

    const handleSoftDelete = (id: number) => {
        router.put(`/admin/sponsors/${id}/soft-delete`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Iklan dihapus dan dipindahkan ke riwayat.'),
            onError: () => toast.error('Gagal menghapus iklan.')
        });
    };

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
                    <Button onClick={() => setIsHistoryModalOpen(true)} variant="outline" className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Ad History
                    </Button>
                    <Button onClick={() => setIsUploadModalOpen(true)} className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 px-6 italic transition-all">
                        <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" /> Upload Banner
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Carousel & Banner Manager */}
                <div className="lg:col-span-2 space-y-6 text-left flex flex-col h-full">
                    <div className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative group overflow-hidden flex flex-col flex-1 min-h-[400px]">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                             <ImageIcon className="w-48 h-48 text-white" />
                        </div>
                        <div className="flex items-center justify-between p-8 border-b border-zinc-800/50 bg-zinc-950/20 relative z-10">
                            <h3 className="text-sm font-black text-white flex items-center gap-3 uppercase tracking-widest italic">
                                <ImageIcon className="w-5 h-5 text-red-600" /> Pengajuan Iklan ({totalPendingCount})
                            </h3>
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none bg-zinc-950/50 px-4 py-2 rounded-full border border-zinc-800 italic">
                                Unapproved: {totalPendingCount}
                            </span>
                        </div>
                        
                        <div className="flex-1 flex flex-col max-h-[600px] overflow-y-auto custom-scrollbar p-6 gap-4 relative z-10">
                            {pendingSponsors.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
                                    <div className="w-20 h-20 rounded-[2rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner">
                                        <ImageIcon className="w-8 h-8 text-zinc-800" />
                                    </div>
                                    <h4 className="text-sm font-black text-white uppercase italic tracking-widest mb-2">Belum Ada Pengajuan</h4>
                                    <p className="text-[11px] leading-relaxed italic font-medium max-w-[250px] mx-auto">
                                        Saat ini tidak ada user yang mengajukan iklan/banner ke sponsor.
                                    </p>
                                </div>
                            ) : (
                                pendingSponsors.map((sponsor) => (
                                    <div key={sponsor.id} className="bg-zinc-950/50 p-5 rounded-3xl border border-zinc-800 flex flex-col xl:flex-row gap-6 shadow-sm group hover:border-zinc-700 transition-all">
                                        {/* Banner Visual */}
                                        <div className="w-full xl:w-64 aspect-[16/9] rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0 relative flex items-center justify-center">
                                            {sponsor.image_path ? (
                                                <div className="w-full h-full relative">
                                                    <img 
                                                        src={sponsor.image_path.startsWith('http') ? sponsor.image_path : `/storage/${sponsor.image_path}`} 
                                                        alt="Banner" 
                                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                        onError={(e) => {
                                                            // Fallback for mock/broken images
                                                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/18181b/3f3f46?text=Banner+Sponsor';
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="text-[10px] text-zinc-700 font-black italic uppercase tracking-widest">No Banner</div>
                                            )}
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-base font-black text-white italic tracking-wide mb-1 flex justify-between items-start">
                                                    {sponsor.title || 'Tanpa Judul'}
                                                </h4>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                                                        {sponsor.user.avatar ? <img src={`/storage/${sponsor.user.avatar}`} alt="Avatar" className="w-full h-full object-cover" /> : <div className="text-[8px] text-zinc-500 font-bold uppercase">{sponsor.user.name[0]}</div>}
                                                    </div>
                                                    <p className="text-[10px] text-zinc-500 font-bold italic tracking-wider">Posted by: <span className="text-zinc-300">{sponsor.user.name}</span></p>
                                                </div>
                                                {sponsor.description && (
                                                    <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50 mb-4">
                                                        <p className="text-[11px] text-zinc-400 font-medium italic line-clamp-2">{sponsor.description}</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-end gap-2 mt-4 xl:mt-0 xl:self-end flex-wrap">
                                                <Button onClick={() => setReviewingSponsor(sponsor)} variant="outline" className="h-9 w-9 p-0 rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all" title="Review Iklan">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button onClick={() => handleSoftDelete(sponsor.id)} variant="outline" className="h-9 w-9 p-0 rounded-xl border-zinc-700 bg-zinc-900 hover:bg-red-950/50 text-zinc-500 hover:text-red-500 transition-all" title="Hapus Iklan">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                                <Button onClick={() => handleReject(sponsor.id)} variant="outline" className="h-9 px-5 rounded-xl border-red-900/30 bg-zinc-900 hover:bg-red-950/30 text-red-500 hover:text-red-400 transition-all italic font-black uppercase text-[10px] tracking-widest">
                                                    Tolak
                                                </Button>
                                                <Button onClick={() => handleApprove(sponsor.id)} className="h-9 px-5 rounded-xl bg-green-600 hover:bg-green-500 text-white transition-all italic font-black uppercase text-[10px] tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.3)] border-none">
                                                    Terima
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Side Control & Info Area */}
                <div className="space-y-6 text-left">

                    {/* Iklan Aktif Saat Ini */}
                    <div className="bg-zinc-900 p-6 rounded-[2.5rem] text-white text-left relative overflow-hidden group border border-zinc-800 shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-600 opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                        <h4 className="text-[11px] font-black mb-5 flex items-center gap-3 relative z-10 text-white uppercase tracking-widest italic">
                            <Zap className="w-5 h-5 text-green-500" /> Iklan Aktif Saat Ini
                            <span className="ml-auto text-[9px] bg-green-600/20 text-green-500 px-2 py-0.5 rounded-full">{activeSponsors.length}</span>
                        </h4>
                        <div className="space-y-3 max-h-[180px] overflow-y-auto custom-scrollbar pr-1 relative z-10">
                            {activeSponsors.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-6 text-zinc-600">
                                    <Zap className="w-8 h-8 mb-2 opacity-20" />
                                    <p className="text-[10px] font-black uppercase tracking-widest italic">Tidak ada iklan aktif</p>
                                </div>
                            ) : (
                                activeSponsors.map((ad) => (
                                    <div key={ad.id} className="p-3 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 flex items-center gap-3 group/row hover:border-green-600/20 transition-colors">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                            {ad.image_path ? (
                                                <img 
                                                    src={ad.image_path.startsWith('http') ? ad.image_path : `/storage/${ad.image_path}`}
                                                    alt="" className="w-full h-full object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/18181b/3f3f46?text=Ad'; }}
                                                />
                                            ) : <ImageIcon className="w-4 h-4 text-zinc-700" />}
                                        </div>
                                        <div className="flex-1 min-w-0 flex items-center justify-between">
                                            <div>
                                                <p className="text-[11px] font-black text-white italic truncate">{ad.title || 'Tanpa Judul'}</p>
                                                <p className="text-[9px] text-zinc-500 italic font-medium">oleh {ad.user?.name || 'Sistem'}</p>
                                            </div>
                                            <div className="flex items-center gap-1 flex-shrink-0 bg-zinc-900/50 px-2 py-1 rounded-lg border border-zinc-800">
                                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                <span className="text-[9px] text-zinc-500 font-black italic">Active</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Log Aktivitas Terakhir */}
                    <div className="bg-zinc-900/40 p-6 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                        <h4 className="text-[11px] font-black mb-5 flex items-center gap-3 relative z-10 text-white uppercase tracking-widest italic">
                            <Activity className="w-5 h-5 text-blue-500" /> Log Aktivitas
                        </h4>
                        <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-1 relative z-10">
                            {activityLog.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-6 text-zinc-600">
                                    <Activity className="w-8 h-8 mb-2 opacity-20" />
                                    <p className="text-[10px] font-black uppercase tracking-widest italic">Belum ada aktivitas</p>
                                </div>
                            ) : (
                                activityLog.map((log, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-900/50 transition-colors">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                            log.status === 'active' ? 'bg-green-600/10' :
                                            log.status === 'rejected' ? 'bg-red-600/10' :
                                            log.status === 'deleted' ? 'bg-orange-600/10' :
                                            'bg-zinc-800'
                                        }`}>
                                            {log.status === 'active' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> :
                                             log.status === 'rejected' ? <XCircle className="w-3.5 h-3.5 text-red-500" /> :
                                             log.status === 'deleted' ? <Trash2 className="w-3.5 h-3.5 text-orange-500" /> :
                                             <Clock className="w-3.5 h-3.5 text-zinc-500" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-zinc-300 font-bold italic truncate">
                                                {log.action}: <span className="text-white">{log.title}</span>
                                            </p>
                                            <p className="text-[9px] text-zinc-600 italic">{log.user_name || 'Sistem'} · {log.time}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Info Pemasukan / Statistik */}
                    <div className="bg-zinc-900/40 p-6 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600 opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                        <h4 className="text-[11px] font-black mb-5 flex items-center gap-3 relative z-10 text-white uppercase tracking-widest italic">
                            <DollarSign className="w-5 h-5 text-yellow-500" /> Info & Statistik
                        </h4>
                        <div className="grid grid-cols-2 gap-3 relative z-10">
                            <div className="p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 text-center group/stat hover:border-green-600/20 transition-colors">
                                <p className="text-2xl font-black text-green-500 italic leading-none mb-1">{stats.total_active}</p>
                                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">Aktif</p>
                            </div>
                            <div className="p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 text-center group/stat hover:border-zinc-600/20 transition-colors">
                                <p className="text-2xl font-black text-white italic leading-none mb-1">{stats.total_all}</p>
                                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">Total</p>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 flex items-center justify-between group/row hover:border-yellow-600/20 transition-colors relative z-10">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-yellow-500" />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Approval Rate</span>
                            </div>
                            <span className="text-sm font-black text-yellow-500 italic">
                                {stats.total_all > 0 ? Math.round((stats.total_active / stats.total_all) * 100) : 0}%
                            </span>
                        </div>
                    </div>

                    {/* Guidelines & Settings Form (Now in Modal) */}
                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                             <AlertCircle className="w-48 h-48 text-white" />
                        </div>
                        <div className="relative z-10 text-left">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center mb-8 shadow-inner border border-zinc-800 group-hover:border-red-600/30 transition-all duration-500">
                                <AlertCircle className="w-7 h-7 text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
                            </div>
                            <h3 className="text-base font-black italic tracking-widest mb-3 leading-none uppercase text-white">SETTING SPONSOR</h3>
                            
                            <div className="space-y-4 mb-10 max-h-[150px] overflow-y-auto custom-scrollbar pr-2 mt-6">
                                {sponsorRules?.title && (
                                    <p className="text-red-500 text-[11px] font-black italic uppercase tracking-[0.2em] leading-tight mb-2">
                                        {sponsorRules.title}
                                    </p>
                                )}
                                
                                <div className="space-y-2">
                                    {sponsorRules?.content ? (
                                        sponsorRules.content.split('\n').filter(r => r.trim() !== '').map((rule, idx) => (
                                            <div key={idx} className="flex gap-2 items-start group/rule">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                                                <p className="text-zinc-500 text-[10px] font-medium leading-tight italic">{rule.trim()}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-zinc-600 text-[10px] italic font-medium">Belum ada peraturan sponsor yang diatur.</p>
                                    )}
                                </div>
                            </div>
                            <Button 
                                onClick={() => setIsSettingsModalOpen(true)}
                                variant="outline"
                                className="w-full py-8 bg-zinc-950 text-zinc-400 border border-dashed border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-red-500 hover:border-red-600/30 transition-all shadow-xl italic h-auto"
                            >
                                Kelola Pengaturan
                            </Button>
                        </div>
                    </div>

                    {/* Settings Modal */}
                    <Dialog open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen}>
                        <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[500px] p-0 overflow-hidden rounded-[2.5rem]">
                            <div className="p-8">
                                <DialogHeader className="mb-8">
                                    <DialogTitle className="text-xl font-black italic tracking-widest uppercase">KELOLA SPONSOR</DialogTitle>
                                    <DialogDescription className="text-zinc-500 text-[11px] italic uppercase tracking-widest font-black">
                                        Atur masa tayang iklan dan syarat & ketentuan pemasangan banner.
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
                                                placeholder="Contoh: Rules Upload Sponsor"
                                                className="bg-zinc-900 border-zinc-800 text-zinc-200 text-[11px] h-14 px-6 rounded-2xl focus:border-red-600/30 focus:ring-1 focus:ring-red-600/20 italic font-black uppercase tracking-widest"
                                            />
                                        </div>
                                        <div className="space-y-2.5">
                                            <Label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic ml-1">
                                                Isi Peraturan (Gunakan Enter)
                                            </Label>
                                            <Textarea
                                                value={settingsData.content}
                                                onChange={(e) => setSettingsData('content', e.target.value)}
                                                placeholder="Masukkan rincian ketentuan..."
                                                className="bg-zinc-900 border-zinc-800 text-zinc-200 text-[11px] min-h-[200px] p-6 rounded-[2rem] focus:border-red-600/30 focus:ring-1 focus:ring-red-600/20 leading-relaxed italic resize-none custom-scrollbar"
                                            />
                                        </div>
                                    </div>

                                    <DialogFooter className="pt-4 border-t border-zinc-900 sm:justify-start">
                                        <Button
                                            type="submit"
                                            disabled={isSavingSettings}
                                            className="w-full h-14 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all"
                                        >
                                            {isSavingSettings ? 'MENYIMPAN...' : 'SIMPAN PENGATURAN'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* History Modal */}
                    <Dialog open={isHistoryModalOpen} onOpenChange={setIsHistoryModalOpen}>
                        <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[700px] p-0 overflow-hidden rounded-[2.5rem]">
                            <div className="p-8">
                                <DialogHeader className="mb-6">
                                    <DialogTitle className="text-xl font-black italic tracking-widest uppercase flex items-center gap-3">
                                        <Clock className="text-zinc-500 w-6 h-6" /> RIWAYAT IKLAN
                                    </DialogTitle>
                                    <DialogDescription className="text-zinc-500 text-[11px] italic uppercase tracking-widest font-black">
                                        Daftar iklan yang sudah di-ACC, kedaluwarsa, maupun yang ditolak sebelumnya.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2 pb-4">
                                    {sponsorHistory.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-600">
                                            <Clock className="w-12 h-12 mb-4 opacity-30" />
                                            <p className="text-[11px] font-black uppercase tracking-widest italic">Belum Ada Riwayat Iklan</p>
                                        </div>
                                    ) : (
                                        sponsorHistory.map((item) => (
                                            <div key={item.id} className="bg-zinc-900/50 p-4 rounded-3xl border border-zinc-800 flex flex-col sm:flex-row gap-4 items-center">
                                                <div className="w-full sm:w-32 aspect-[16/9] rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                    {item.image_path ? (
                                                        <img 
                                                            src={item.image_path.startsWith('http') ? item.image_path : `/storage/${item.image_path}`} 
                                                            alt="Banner" 
                                                            className="w-full h-full object-cover opacity-60"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/18181b/3f3f46?text=Banner+Sponsor';
                                                            }}
                                                        />
                                                    ) : (
                                                        <ImageIcon className="w-5 h-5 text-zinc-700" />
                                                    )}
                                                </div>
                                                <div className="flex-1 text-left w-full">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-[9px] font-black italic uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                                            item.status === 'active' ? 'bg-green-600/20 text-green-500' :
                                                            item.status === 'rejected' ? 'bg-red-600/20 text-red-500' :
                                                            item.status === 'deleted' ? 'bg-orange-600/20 text-orange-500' :
                                                            'bg-zinc-800 text-zinc-400'
                                                        }`}>
                                                            {item.status === 'deleted' ? 'dihapus' : item.status}
                                                        </span>
                                                        <h4 className="text-sm font-black text-white italic tracking-wide truncate">
                                                            {item.title || 'Tanpa Judul'}
                                                        </h4>
                                                    </div>
                                                    <p className="text-[10px] text-zinc-500 font-bold italic tracking-wider mb-2">
                                                        Oleh: {item.user?.name || 'Sistem (Admin)'}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                                                    <Button onClick={() => handleRestoreHistory(item.id)} variant="outline" className="flex-1 sm:flex-none h-8 px-4 rounded-xl border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white italic font-black uppercase text-[9px] tracking-widest">
                                                        Kembalikan
                                                    </Button>
                                                    <Button onClick={() => handleDeleteHistory(item.id)} variant="outline" className="flex-1 sm:flex-none h-8 px-4 rounded-xl border-red-900/30 bg-zinc-950 hover:bg-red-900/50 text-red-500 transition-all italic font-black uppercase text-[9px] tracking-widest">
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Review Sponsor Modal */}
                    <Dialog open={!!reviewingSponsor} onOpenChange={(open) => { if (!open) setReviewingSponsor(null); }}>
                        <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[600px] p-0 overflow-hidden rounded-[2.5rem]">
                            {reviewingSponsor && (
                                <div className="p-8">
                                    <DialogHeader className="mb-6">
                                        <DialogTitle className="text-xl font-black italic tracking-widest uppercase flex items-center gap-3">
                                            <Eye className="text-red-600 w-6 h-6" /> REVIEW IKLAN
                                        </DialogTitle>
                                        <DialogDescription className="text-zinc-500 text-[11px] italic uppercase tracking-widest font-black">
                                            Tinjau detail lengkap iklan sebelum mengambil keputusan.
                                        </DialogDescription>
                                    </DialogHeader>

                                    {/* Full Banner Preview */}
                                    <div className="w-full aspect-[16/9] rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden mb-6">
                                        {reviewingSponsor.image_path ? (
                                            <img 
                                                src={reviewingSponsor.image_path.startsWith('http') ? reviewingSponsor.image_path : `/storage/${reviewingSponsor.image_path}`}
                                                alt="Banner Preview" 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/18181b/3f3f46?text=Banner+Sponsor';
                                                }}
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <ImageIcon className="w-12 h-12 text-zinc-700" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic mb-1">Judul Iklan</p>
                                            <h3 className="text-lg font-black text-white italic">{reviewingSponsor.title || 'Tanpa Judul'}</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                                                {reviewingSponsor.user?.avatar ? 
                                                    <img src={`/storage/${reviewingSponsor.user.avatar}`} alt="" className="w-full h-full object-cover" /> : 
                                                    <div className="text-[9px] text-zinc-500 font-bold uppercase">{reviewingSponsor.user?.name?.[0] || 'A'}</div>
                                                }
                                            </div>
                                            <p className="text-[11px] text-zinc-400 italic font-bold">Diajukan oleh: <span className="text-white">{reviewingSponsor.user?.name || 'Admin'}</span></p>
                                        </div>
                                        {reviewingSponsor.description && (
                                            <div>
                                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic mb-2">Deskripsi / Pesan</p>
                                                <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800/50">
                                                    <p className="text-[12px] text-zinc-300 font-medium italic leading-relaxed whitespace-pre-line">{reviewingSponsor.description}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <DialogFooter className="pt-6 mt-6 border-t border-zinc-900 flex-row gap-2">
                                        <Button onClick={() => { handleSoftDelete(reviewingSponsor.id); setReviewingSponsor(null); }} variant="outline" className="flex-1 h-12 rounded-xl border-zinc-700 bg-zinc-900 hover:bg-red-950/30 text-zinc-400 hover:text-red-500 italic font-black uppercase text-[10px] tracking-widest">
                                            <Trash2 className="w-3.5 h-3.5 mr-2" /> Hapus
                                        </Button>
                                        <Button onClick={() => { handleReject(reviewingSponsor.id); setReviewingSponsor(null); }} variant="outline" className="flex-1 h-12 rounded-xl border-red-900/30 bg-zinc-900 hover:bg-red-950/30 text-red-500 hover:text-red-400 italic font-black uppercase text-[10px] tracking-widest">
                                            Tolak
                                        </Button>
                                        <Button onClick={() => { handleApprove(reviewingSponsor.id); setReviewingSponsor(null); }} className="flex-1 h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white italic font-black uppercase text-[10px] tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.3)] border-none">
                                            Terima
                                        </Button>
                                    </DialogFooter>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>

                    {/* Upload Modal */}
                    <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
                        <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[500px] p-0 overflow-hidden rounded-[2.5rem]">
                            <div className="p-8">
                                <DialogHeader className="mb-6">
                                    <DialogTitle className="text-xl font-black italic tracking-widest uppercase flex items-center gap-3">
                                        <Upload className="text-red-600 w-6 h-6" /> UPLOAD BANNER
                                    </DialogTitle>
                                    <DialogDescription className="text-zinc-500 text-[11px] italic uppercase tracking-widest font-black">
                                        Tambahkan iklan eksklusif. Iklan akan langsung berstatus aktif dan tayang permanen.
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleUploadSubmit} className="space-y-6">
                                    {/* Custom File Upload Area */}
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic ml-1">
                                            Poster / Banner
                                        </Label>
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                id="file-upload" 
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setUploadData('image', e.target.files?.[0] || null)}
                                            />
                                            <label 
                                                htmlFor="file-upload" 
                                                className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${
                                                    uploadData.image ? 'border-red-600/50 bg-red-950/10' : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700'
                                                }`}
                                            >
                                                {uploadData.image ? (
                                                    <div className="flex flex-col items-center text-green-500">
                                                        <CheckCircle2 className="w-8 h-8 mb-2" />
                                                        <span className="text-[11px] font-black italic uppercase tracking-widest">{uploadData.image.name}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center text-zinc-500">
                                                        <ImageIcon className="w-8 h-8 mb-3 opacity-50" />
                                                        <span className="text-[11px] font-black italic uppercase tracking-widest">Pilih Gambar Banner</span>
                                                        <span className="text-[9px] mt-1 italic">Max 5MB (JPG, PNG)</span>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-2.5">
                                        <Label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic ml-1">
                                            Judul Iklan
                                        </Label>
                                        <Input
                                            value={uploadData.title}
                                            onChange={(e) => setUploadData('title', e.target.value)}
                                            placeholder="Contoh: Promo Spesial Mahasiswa"
                                            className="bg-zinc-900 border-zinc-800 text-zinc-200 text-[11px] h-12 px-6 rounded-2xl focus:border-red-600/30 focus:ring-1 focus:ring-red-600/20 italic font-black"
                                        />
                                    </div>

                                    <div className="space-y-2.5">
                                        <Label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic ml-1">
                                            Deskripsi Lengkap
                                        </Label>
                                        <Textarea
                                            value={uploadData.description}
                                            onChange={(e) => setUploadData('description', e.target.value)}
                                            placeholder="Deskripsi, syarat dan ketentuan promo..."
                                            className="bg-zinc-900 border-zinc-800 text-zinc-200 text-[11px] min-h-[100px] p-5 rounded-2xl focus:border-red-600/30 focus:ring-1 focus:ring-red-600/20 leading-relaxed italic resize-none custom-scrollbar"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isUploading || !uploadData.image}
                                        className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all mt-4"
                                    >
                                        {isUploading ? 'MENGUNGGAH...' : 'UPLOAD DAN TAYANGKAN'}
                                    </Button>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>
                    {/* Confirm Delete Dialog */}
                    <Dialog open={confirmDeleteId !== null} onOpenChange={(open) => { if (!open) setConfirmDeleteId(null); }}>
                        <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[400px] p-0 overflow-hidden rounded-[2.5rem]">
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-red-600/10 flex items-center justify-center mx-auto mb-6">
                                    <Trash2 className="w-8 h-8 text-red-500" />
                                </div>
                                <DialogHeader className="mb-6">
                                    <DialogTitle className="text-lg font-black italic tracking-widest uppercase text-center">
                                        Hapus Permanen?
                                    </DialogTitle>
                                    <DialogDescription className="text-zinc-500 text-[11px] italic uppercase tracking-widest font-black text-center">
                                        Iklan dan file gambar akan dihapus selamanya. Tindakan ini tidak bisa dibatalkan.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex-row gap-3 sm:justify-center">
                                    <Button onClick={() => setConfirmDeleteId(null)} variant="outline" className="flex-1 h-12 rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white italic font-black uppercase text-[10px] tracking-widest">
                                        Batal
                                    </Button>
                                    <Button onClick={confirmDelete} className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white italic font-black uppercase text-[10px] tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.3)] border-none">
                                        Ya, Hapus
                                    </Button>
                                </DialogFooter>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
