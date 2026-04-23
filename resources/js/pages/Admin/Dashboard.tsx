import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    MessageSquare, 
    ShoppingBag, 
    Activity,
    TrendingUp,
    Smartphone,
    CheckCircle2,
    Clock,
    AlertCircle,
    BookOpen,
    Plus,
    Trash2
} from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

interface DashboardProps {
    status?: string;
    rules: {
        title: string;
        content: string;
    };
    stats?: {
        menfess_today: number;
        total_users: number;
        pending_kyc: number;
        total_menfess: number;
        total_coins: number;
        total_songs: number;
        marketplace_items: number;
        reported_posts: number;
    };
}

const mockChartData = [
    { name: '00:00', value: 120 },
    { name: '03:00', value: 80 },
    { name: '06:00', value: 400 },
    { name: '09:00', value: 900 },
    { name: '12:00', value: 750 },
    { name: '15:00', value: 850 },
    { name: '18:00', value: 1200 },
    { name: '21:00', value: 1100 },
];

export default function Dashboard({ status, rules, stats: backendStats }: DashboardProps) {
    const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
    
    const { data: rulesData, setData: setRulesData, post: postRules, processing: rulesProcessing } = useForm({
        title: rules?.title || "",
        content: rules?.content || "",
    });

    useEffect(() => {
        if (rules) {
            setRulesData({
                title: rules.title || "",
                content: rules.content || "",
            });
        }
    }, [rules]);

    const handleSaveRules = (e: React.FormEvent) => {
        e.preventDefault();
        postRules('/admin/settings/update-rules', {
            onSuccess: () => {
                setIsRulesModalOpen(false);
                toast.success('Peraturan berhasil diperbarui!');
            },
            onError: () => {
                toast.error('Gagal memperbarui peraturan.');
            }
        });
    };

    const stats = [
        { label: 'Menfess Hari Ini', value: String(backendStats?.menfess_today ?? 0), icon: MessageSquare, trend: `${backendStats?.total_menfess ?? 0} total`, color: 'text-red-500', description: 'Total curhatan yang diposting hari ini.', href: '/admin/menfess' },
        { label: 'Total User', value: String(backendStats?.total_users ?? 0), icon: Users, trend: `${backendStats?.total_songs ?? 0} songs`, color: 'text-blue-500', description: 'Jumlah pengguna aktif terdaftar di platform.', href: '/admin/users' },
        { label: 'Verifikasi Pending', value: String(backendStats?.pending_kyc ?? 0), icon: CheckCircle2, trend: `${backendStats?.reported_posts ?? 0} reports`, color: 'text-orange-500', description: 'Antrian pengajuan KYC (Centang Biru) penjual.', href: '/admin/users' },
        { label: 'Koin Beredar', value: String(backendStats?.total_coins ?? 0), icon: ShoppingBag, trend: `${backendStats?.marketplace_items ?? 0} items`, color: 'text-purple-500', description: 'Total saldo koin virtual yang dimiliki pengguna.', href: '/admin/marketplace' },
    ];

    return (
        <div className="space-y-6 text-left">
            <Head title="Admin Overview" />

            {/* Welcome & Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest">STATISTIK & MONITORING</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Gambaran real-time performa platform Anda hari ini.</p>
                </div>
                <div className="flex items-center self-start sm:self-auto gap-3 bg-zinc-900/50 px-4 py-2.5 rounded-xl border border-zinc-800 shadow-sm backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">WA Gateway</span>
                    </div>
                    <div className="h-4 w-px bg-zinc-800"></div>
                    <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full leading-none border border-red-500/20 italic">CONNECTED</span>
                    <Smartphone className="w-3.5 h-3.5 text-zinc-600" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Link key={index} href={stat.href} className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/50 shadow-sm hover:bg-zinc-900/60 hover:border-zinc-700 transition-all group relative overflow-hidden block">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="flex items-center justify-between mb-5 relative z-10">
                            <div className={`p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700/50 group-hover:border-red-500/50 transition-colors`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-800 px-2 py-0.5 rounded-lg border border-zinc-700/50">{stat.trend}</span>
                        </div>
                        <h3 className="text-3xl font-black text-white leading-none mb-2 tracking-tighter">{stat.value}</h3>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                             <div className="w-1 h-1 bg-red-600 rounded-full flex-shrink-0"></div> {stat.label}
                        </p>
                        {stat.description && (
                            <p className="text-[9px] text-zinc-600 mt-2.5 font-medium italic leading-relaxed">
                                {stat.description}
                            </p>
                        )}
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Chart */}
                <div className="lg:col-span-2 bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800/50 shadow-sm text-left">
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-left">
                            <h3 className="text-base font-black text-white italic tracking-widest flex items-center gap-2">
                                <Activity className="w-4 h-4 text-red-600" /> TRAFFIC PEAK HOURS
                            </h3>
                            <p className="text-[11px] text-zinc-500 mt-1 italic">Jam-jam paling ramai orang "galau" atau "belanja".</p>
                        </div>
                        <select className="text-[10px] font-black bg-zinc-800 text-white border-zinc-700 rounded-xl px-4 py-2 focus:ring-red-600 border shadow-sm uppercase tracking-wider">
                            <option>Hari Ini</option>
                            <option>7 Hari Terakhir</option>
                        </select>
                    </div>
                    <div className="h-72 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockChartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 9, fill: '#52525b', fontWeight: 900}}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 9, fill: '#52525b', fontWeight: 900}}
                                />
                                <Tooltip 
                                    contentStyle={{borderRadius: '16px', backgroundColor: '#09090b', border: '1px solid #27272a', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)', fontSize: '10px', color: '#fff'}}
                                    itemStyle={{color: '#ef4444', fontWeight: 900}}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#ef4444" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#colorValue)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Side Panels */}
                <div className="space-y-6 text-left">
                    {/* User Rules Management */}
                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                             <BookOpen className="w-48 h-48 text-white" />
                        </div>
                        <div className="relative z-10 text-left">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center mb-8 shadow-inner border border-zinc-800 group-hover:border-red-600/30 transition-all duration-500">
                                <BookOpen className="w-7 h-7 text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
                            </div>
                            <h3 className="text-base font-black italic tracking-widest mb-3 leading-none uppercase text-white">USER RULES</h3>
                            <div className="space-y-4 mb-10 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                                {rules?.title && (
                                    <p className="text-red-500 text-[11px] font-black italic uppercase tracking-[0.2em] leading-tight mb-2">
                                        {rules.title}
                                    </p>
                                )}
                                
                                <div className="space-y-2">
                                    {rules?.content ? (
                                        rules.content.split('\n').filter(r => r.trim() !== '').map((rule, idx) => (
                                            <div key={idx} className="flex gap-2 items-start group/rule">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                                                <p className="text-zinc-500 text-[10px] font-medium leading-tight italic">{rule.trim()}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-zinc-600 text-[10px] italic font-medium">Belum ada peraturan komunitas yang diatur.</p>
                                    )}
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsRulesModalOpen(true)}
                                className="w-full py-4 bg-zinc-950 text-zinc-400 border border-dashed border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-red-500 hover:border-red-600/30 transition-all shadow-xl italic"
                            >
                                Kelola Peraturan
                            </button>
                        </div>
                    </div>

                    <Dialog open={isRulesModalOpen} onOpenChange={setIsRulesModalOpen}>
                        <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[500px] p-0 overflow-hidden rounded-[2.5rem]">
                            <div className="p-8">
                                <DialogHeader className="mb-8">
                                    <DialogTitle className="text-xl font-black italic tracking-widest uppercase">KELOLA PERATURAN</DialogTitle>
                                    <DialogDescription className="text-zinc-500 text-[11px] italic uppercase tracking-widest font-black">
                                        Atur poin-poin peraturan komunitas Menfess & Marketplace.
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleSaveRules} className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="space-y-2.5">
                                            <Label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic ml-1">
                                                Judul Peraturan (Misal: Aturan Marketplace)
                                            </Label>
                                            <Input
                                                value={rulesData.title}
                                                onChange={(e) => setRulesData('title', e.target.value)}
                                                className="bg-zinc-900 border-zinc-800 text-zinc-200 text-[11px] h-14 px-6 rounded-2xl focus:border-red-600/30 focus:ring-1 focus:ring-red-600/20 italic font-black uppercase tracking-widest"
                                                placeholder="Judul besar peraturan..."
                                            />
                                        </div>

                                        <div className="space-y-2.5">
                                            <Label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic ml-1">
                                                Isi Peraturan (Gunakan Enter untuk setiap poin)
                                            </Label>
                                            <Textarea
                                                value={rulesData.content}
                                                onChange={(e) => setRulesData('content', e.target.value)}
                                                className="bg-zinc-900 border-zinc-800 text-zinc-200 text-[11px] min-h-[250px] p-6 rounded-[2rem] focus:border-red-600/30 focus:ring-1 focus:ring-red-600/20 leading-relaxed italic resize-none custom-scrollbar"
                                                placeholder="Contoh:&#10;1. Dilarang spam pesan&#10;2. Jaga etika dalam bertransaksi"
                                            />
                                        </div>
                                    </div>

                                    <DialogFooter className="pt-4 border-t border-zinc-900 sm:justify-start">
                                        <Button
                                            type="submit"
                                            disabled={rulesProcessing}
                                            className="w-full h-14 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all"
                                        >
                                            {rulesProcessing ? 'MENYIMPAN...' : 'SIMPAN PERATURAN'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Quick Monitoring */}
                    <div className="bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800/50 shadow-sm text-left">
                        <h3 className="text-[11px] font-black text-white mb-6 flex items-center gap-2 uppercase tracking-widest italic">
                             <TrendingUp className="w-4 h-4 text-red-600" /> Real-time Activity
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50 group-hover:border-red-500/50 transition-colors">
                                        <MessageSquare className="w-5 h-5 text-zinc-400 group-hover:text-red-500 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white italic leading-none">Menfess Masuk</p>
                                        <p className="text-[9px] text-zinc-500 mt-1 font-bold">2 menit yang lalu</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-red-600 bg-red-600/10 px-2 py-0.5 rounded-lg">+1</span>
                            </div>
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50 group-hover:border-blue-500/50 transition-colors">
                                        <Users className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white italic leading-none">User Baru</p>
                                        <p className="text-[9px] text-zinc-500 mt-1 font-bold">15 menit yang lalu</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-blue-600 bg-blue-600/10 px-2 py-0.5 rounded-lg">+3</span>
                            </div>
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50 group-hover:border-orange-500/50 transition-colors">
                                        <AlertCircle className="w-5 h-5 text-zinc-400 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white italic leading-none">Laporan Baru</p>
                                        <p className="text-[9px] text-zinc-500 mt-1 font-bold">1 jam yang lalu</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-orange-600 bg-orange-600/10 px-2 py-0.5 rounded-lg">+2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
