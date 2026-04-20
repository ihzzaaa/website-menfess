import { Head, router } from '@inertiajs/react';
import { 
    Music, 
    BarChart3, 
    Filter, 
    ShieldAlert, 
    Eye, 
    Trash2, 
    Search,
    TrendingUp,
    AlertCircle,
    Play,
    Pause,
    MoreVertical,
    Clock,
    Lock,
    UserX,
    MessageSquare,
    Music2,
    Heart,
    ShieldCheck
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    is_blocked: boolean;
    avatar_url?: string;
}

interface SongfessMessage {
    id: number;
    user_id: number | null;
    sender_name: string | null;
    recipient_name: string;
    song_title: string;
    artist_name: string | null;
    album_art: string | null;
    message: string;
    is_anonymous: boolean;
    status: string;
    created_at: string;
    user?: User;
}

interface SongfessAnalytic {
    id: number;
    song_title: string;
    artist_name: string;
    play_count: number;
}

interface SongfessFilter {
    id: number;
    pattern: string;
    reason: string;
}

interface MusicalMenfessProps {
    analytics: SongfessAnalytic[];
    filters: SongfessFilter[];
    messages: SongfessMessage[];
    settings: {
        copyright_compliance_mode?: string
    };
}

const COLORS = ['#000', '#111', '#222', '#333', '#444'];

export default function MusicalMenfess({ analytics, filters, messages, settings }: MusicalMenfessProps) {
    const isCopyrightMode = settings.copyright_compliance_mode === '1';

    const toggleCopyrightMode = () => {
        router.post('/admin/settings/toggle-musical', {
            key: 'copyright_compliance_mode',
            value: isCopyrightMode ? '0' : '1'
        }, {
            preserveScroll: true,
            onSuccess: () => toast.success('Copyright mode updated'),
            onError: (errors) => toast.error('Failed to update setting')
        });
    };

    const handleDeleteMessage = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
            router.delete(`/admin/musical-menfess/${id}`, {
                preserveScroll: true,
                onSuccess: () => toast.success('Pesan berhasil dihapus')
            });
        }
    };

    const handleToggleBlock = (user: User) => {
        const action = user.is_blocked ? 'membuka blokir' : 'memblokir';
        if (confirm(`Apakah Anda yakin ingin ${action} user ${user.name}?`)) {
            router.post(`/admin/users/${user.id}/toggle-block`, {}, {
                preserveScroll: true,
                onSuccess: () => toast.success(user.is_blocked ? 'User unblocked' : 'User blocked')
            });
        }
    };

    const chartData = analytics.map(item => ({
        name: `${item.artist_name} - ${item.song_title}`,
        count: item.play_count
    }));

    return (
        <div className="space-y-6 text-left">
            <Head title="Musical Menfess Moderation" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">MUSICAL MENFESS MODERATION</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Analisis tren lagu dan moderasi pesan yang menyertakan musik.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed">
                        <ShieldAlert className="w-4 h-4 mr-2 text-red-600" /> Dedicated Filter
                    </Button>
                    <Button 
                        onClick={toggleCopyrightMode}
                        className={`rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all italic px-6 shadow-xl border ${
                            isCopyrightMode 
                            ? 'bg-zinc-950 border-red-600/50 text-red-500 shadow-red-900/10' 
                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'
                        }`}
                    >
                        <Lock className={`w-4 h-4 mr-2 ${isCopyrightMode ? 'text-red-500' : 'text-zinc-600'}`} /> {isCopyrightMode ? 'Copyright Active' : 'Copyright Mode'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Song Analytics Chart */}
                <div className="lg:col-span-2 bg-zinc-900/40 p-6 rounded-[2rem] border border-zinc-800/50 shadow-sm text-left">
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-left">
                            <h3 className="text-base font-black text-white flex items-center gap-2 leading-none uppercase italic tracking-widest">
                                <BarChart3 className="w-4 h-4 text-red-600" /> Song Analytics
                            </h3>
                            <p className="text-[11px] text-zinc-500 mt-1 italic font-medium">Daftar lagu paling sering dikirim oleh pengguna hari ini.</p>
                        </div>
                    </div>

                    <div className="h-64 sm:h-80">
                         {chartData.length > 0 ? (
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical" margin={{left: -20, right: 30}}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#18181b" />
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="name" 
                                        type="category" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        width={120}
                                        tick={{fontSize: 8, fill: '#52525b', fontWeight: 900}}
                                    />
                                    <Tooltip 
                                        cursor={{fill: '#18181b'}}
                                        contentStyle={{borderRadius: '16px', backgroundColor: '#09090b', border: '1px solid #27272a', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)', fontSize: '10px', color: '#fff'}}
                                    />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#27272a'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                          ) : (
                             <div className="h-full flex items-center justify-center bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-800">
                                <p className="text-xs text-zinc-600 italic font-bold">Belum ada data analitik lagu tersedia.</p>
                            </div>
                          )}
                    </div>
                </div>

                {/* Copyright & Health Panel */}
                <div className="space-y-6 text-left">
                    <div className={`p-8 rounded-[2rem] text-white relative overflow-hidden group transition-all duration-500 shadow-xl bg-zinc-900/40 border ${isCopyrightMode ? 'border-red-600/30' : 'border-zinc-800/50'}`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-[0.02] rounded-full -mr-16 -mt-16 group-hover:rotate-12 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 italic text-zinc-500">
                                     <Lock className="w-4 h-4 text-red-600" /> COPYRIGHT COMPLIANCE
                                </h4>
                                <div 
                                    onClick={toggleCopyrightMode}
                                    className={`w-10 h-5 rounded-full cursor-pointer p-1 flex shadow-inner relative transition-all duration-300 ${isCopyrightMode ? 'bg-red-600/20 border border-red-600/30' : 'bg-zinc-800 border border-zinc-700'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full shadow-lg transition-all duration-300 ${isCopyrightMode ? 'translate-x-5 bg-red-500 shadow-red-900/40' : 'translate-x-0 bg-zinc-600'}`}></div>
                                </div>
                            </div>
                            <p className="text-[11px] text-zinc-500 leading-relaxed mb-10 italic font-medium">
                                {isCopyrightMode 
                                    ? 'Mode Kepatuhan Hak Cipta sedang AKTIF. Player musik disembunyikan secara global.' 
                                    : 'Aktifkan mode ini untuk mematikan player musik sementara jika terjadi kendala lisensi API.'}
                            </p>
                            <div className="p-5 bg-zinc-950/50 rounded-2xl border border-zinc-800 flex items-center justify-between">
                                <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest italic">API Health Status</span>
                                <span className="text-[10px] font-black text-green-500 flex items-center gap-2 italic">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div> NORMAL
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Dedicated Filter Info */}
                    <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-zinc-800/50 shadow-sm text-left">
                        <h4 className="text-[11px] font-black text-white mb-6 flex items-center gap-2 uppercase tracking-widest italic">
                             <Filter className="w-4 h-4 text-red-600" /> Active Filters ({filters.length})
                        </h4>
                        <div className="space-y-3">
                            {filters.length > 0 ? (
                                filters.map(filter => (
                                    <div key={filter.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/30">
                                        <span className="text-[10px] font-black text-white italic leading-none">{filter.pattern}</span>
                                        <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20 italic">Blocked</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[10px] text-zinc-600 italic font-bold">Tidak ada filter aktif.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Moderation Feed */}
                <div className="lg:col-span-3 space-y-8 mt-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase italic tracking-widest">
                             <Clock className="w-6 h-6 text-red-600" /> Live Feedback & Moderation
                        </h3>
                        <div className="flex items-center gap-3">
                             <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input type="text" placeholder="Cari pesan..." className="pl-11 pr-5 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-xs focus:ring-1 focus:ring-red-600 w-64 shadow-inner text-white" />
                             </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {messages.length > 0 ? (
                            messages.map((msg) => (
                                <div key={msg.id} className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 shadow-sm overflow-hidden flex flex-col group hover:bg-zinc-900/60 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/5">
                                    <div className="p-7 flex-1 flex flex-col">
                                        {/* Sender Header */}
                                        <div className="flex items-center justify-between mb-6 border-b border-zinc-800/50 pb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-white text-sm font-black shrink-0 overflow-hidden border border-zinc-700/50">
                                                    {msg.user?.avatar_url ? (
                                                        <img src={msg.user.avatar_url} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span>{msg.user?.name.charAt(0).toUpperCase() || 'G'}</span>
                                                    )}
                                                </div>
                                                <div className="text-left">
                                                    <h4 className="text-xs font-black text-white flex items-center gap-1.5 leading-none uppercase italic tracking-tight">
                                                        {msg.is_anonymous ? 'Anonymous' : (msg.user?.name || msg.sender_name || 'Guest User')}
                                                        {msg.user?.is_blocked && <ShieldAlert className="w-3.5 h-3.5 text-red-600" />}
                                                    </h4>
                                                    <p className="text-[10px] text-zinc-500 mt-2 font-black uppercase tracking-widest">{new Date(msg.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                 <button 
                                                    onClick={() => handleDeleteMessage(msg.id)}
                                                    className="p-2.5 bg-zinc-800 hover:bg-red-600 text-zinc-500 hover:text-white rounded-xl transition-all border border-zinc-700/50 shadow-lg"
                                                 >
                                                     <Trash2 className="w-4 h-4" />
                                                 </button>
                                                 {msg.user && (
                                                     <button 
                                                        onClick={() => handleToggleBlock(msg.user!)}
                                                        className={`p-2.5 rounded-xl transition-all border border-zinc-700/50 shadow-lg ${msg.user.is_blocked ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-500 hover:text-white hover:bg-red-600'}`}
                                                     >
                                                         <UserX className="w-4 h-4" />
                                                     </button>
                                                 )}
                                            </div>
                                        </div>

                                        {/* Message Body (Handwritten Aesthetic on Dark) */}
                                        <div className="flex-1 bg-zinc-950/50 p-6 rounded-[2rem] border-l-4 border-red-600 relative mb-6 flex flex-col justify-center min-h-[140px] shadow-inner group-hover:bg-zinc-950/80 transition-colors">
                                            <div className="absolute top-4 right-4 opacity-[0.05]">
                                                <MessageSquare className="w-16 h-16 text-white" />
                                            </div>
                                            <p className="italic text-zinc-300 text-sm sm:text-base leading-relaxed relative z-10" style={{ fontFamily: 'cursive' }}>
                                                "{msg.message}"
                                            </p>
                                            <p className="text-[10px] font-black text-red-500 mt-6 text-right uppercase tracking-[0.2em] leading-none italic">
                                                — FOR: <span className="text-white">{msg.recipient_name}</span>
                                            </p>
                                        </div>

                                        {/* Song Info Footer */}
                                        <div className="bg-zinc-950 -mx-7 -mb-7 p-5 border-t border-zinc-800/50 flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-zinc-900 shadow-xl flex items-center justify-center overflow-hidden border border-zinc-800 shrink-0">
                                                {msg.album_art ? (
                                                    <img src={msg.album_art} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Music2 className="w-6 h-6 text-red-500" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <h5 className="text-[10px] font-black text-white truncate uppercase tracking-widest mb-1 italic">{msg.song_title}</h5>
                                                <p className="text-[9px] text-zinc-500 truncate font-black uppercase tracking-tight">{msg.artist_name}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800 shadow-inner shrink-0">
                                                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                                                <span className="text-[10px] font-black text-white italic tracking-tighter">4.8</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="lg:col-span-3 bg-zinc-900/20 p-20 rounded-[3rem] border border-zinc-800 text-center shadow-inner border-dashed">
                                <Music className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                                <h4 className="text-base font-black text-zinc-600 uppercase tracking-[0.3em] italic">No Recent Messages</h4>
                                <p className="text-[11px] text-zinc-700 mt-3 italic font-bold">Moderasi pesan yang masuk akan muncul di sini.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
