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
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Musical Menfess Moderation</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Analisis tren lagu dan moderasi pesan yang menyertakan musik.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold border-gray-200 bg-white shadow-sm">
                        <ShieldAlert className="w-4 h-4 mr-2" /> Dedicated Filter
                    </Button>
                    <Button 
                        onClick={toggleCopyrightMode}
                        className={`rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold border-none px-4 shadow-lg transition-all ${
                            isCopyrightMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-black hover:bg-gray-900 text-white'
                        }`}
                    >
                        <Lock className="w-4 h-4 mr-2" /> {isCopyrightMode ? 'Copyright Active' : 'Copyright Mode'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Song Analytics Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left">
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-left">
                            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 leading-none">
                                <BarChart3 className="w-4 h-4 text-pink-500" /> Song Analytics
                            </h3>
                            <p className="text-[11px] text-gray-500 mt-1 italic">Daftar lagu paling sering dikirim oleh pengguna hari ini.</p>
                        </div>
                    </div>

                    <div className="h-64 sm:h-80">
                         {chartData.length > 0 ? (
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical" margin={{left: -20, right: 30}}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="name" 
                                        type="category" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        width={120}
                                        tick={{fontSize: 8, fill: '#6b7280', fontWeight: 600}}
                                    />
                                    <Tooltip 
                                        cursor={{fill: '#f9fafb'}}
                                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px'}}
                                    />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                          ) : (
                             <div className="h-full flex items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <p className="text-xs text-gray-400 italic">Belum ada data analitik lagu tersedia.</p>
                            </div>
                          )}
                    </div>
                </div>

                {/* Copyright & Health Panel */}
                <div className="space-y-6 text-left">
                    <div className={`p-6 rounded-3xl text-white relative overflow-hidden group transition-all duration-500 ${isCopyrightMode ? 'bg-red-600' : 'bg-black'}`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:rotate-12 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-xs font-bold flex items-center gap-2">
                                     <Lock className="w-4 h-4 text-blue-400" /> Copyright Compliance
                                </h4>
                                <div 
                                    onClick={toggleCopyrightMode}
                                    className="w-8 h-4 bg-white/20 rounded-full cursor-pointer p-0.5 flex shadow-inner relative"
                                >
                                    <div className={`w-3 h-3 bg-white rounded-full transition-all duration-300 ${isCopyrightMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-100/70 leading-relaxed mb-6 italic">
                                {isCopyrightMode 
                                    ? 'Mode Kepatuhan Hak Cipta sedang AKTIF. Player musik disembunyikan secara global.' 
                                    : 'Aktifkan mode ini untuk mematikan player musik sementara jika terjadi kendala lisensi API.'}
                            </p>
                            <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center justify-between">
                                <span className="text-[10px] text-white/50 font-medium italic">API Health Status</span>
                                <span className="text-[10px] font-bold text-green-400 flex items-center gap-1.5 italic">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div> NORMAL
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Dedicated Filter Info */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left">
                        <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                             <Filter className="w-4 h-4 text-gray-400" /> Active Filters ({filters.length})
                        </h4>
                        <div className="space-y-3">
                            {filters.length > 0 ? (
                                filters.map(filter => (
                                    <div key={filter.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                                        <span className="text-[10px] font-bold text-gray-700 italic leading-none">{filter.pattern}</span>
                                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100 italic">Blocked</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[10px] text-gray-400 italic">Tidak ada filter aktif.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Moderation Feed */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                             <Clock className="w-5 h-5 text-gray-400" /> Live Feedback & Moderation
                        </h3>
                        <div className="flex items-center gap-2">
                             <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                <input type="text" placeholder="Cari pesan..." className="pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs focus:ring-1 focus:ring-black w-48 shadow-sm" />
                             </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {messages.length > 0 ? (
                            messages.map((msg) => (
                                <div key={msg.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500">
                                    <div className="p-6 flex-1 flex flex-col">
                                        {/* Sender Header */}
                                        <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-gray-900 flex items-center justify-center text-white text-xs font-black shrink-0 overflow-hidden">
                                                    {msg.user?.avatar_url ? (
                                                        <img src={msg.user.avatar_url} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span>{msg.user?.name.charAt(0).toUpperCase() || 'G'}</span>
                                                    )}
                                                </div>
                                                <div className="text-left">
                                                    <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1 leading-none">
                                                        {msg.is_anonymous ? 'Anonymous' : (msg.user?.name || msg.sender_name || 'Guest User')}
                                                        {msg.user?.is_blocked && <ShieldAlert className="w-3 h-3 text-red-500" />}
                                                    </h4>
                                                    <p className="text-[10px] text-gray-400 mt-1 font-medium">{new Date(msg.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                 <button 
                                                    onClick={() => handleDeleteMessage(msg.id)}
                                                    className="p-2 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-xl transition-colors"
                                                 >
                                                     <Trash2 className="w-4 h-4" />
                                                 </button>
                                                 {msg.user && (
                                                     <button 
                                                        onClick={() => handleToggleBlock(msg.user!)}
                                                        className={`p-2 hover:bg-gray-50 rounded-xl transition-colors ${msg.user.is_blocked ? 'text-blue-500' : 'text-gray-300 hover:text-black'}`}
                                                     >
                                                         <UserX className="w-4 h-4" />
                                                     </button>
                                                 )}
                                            </div>
                                        </div>

                                        {/* Message Body (Handwritten Aesthetic) */}
                                        <div className="flex-1 bg-[#fdfbf7] p-5 rounded-2xl border-l-4 border-black/5 relative mb-4 flex flex-col justify-center min-h-[120px] shadow-inner">
                                            <div className="absolute top-2 right-2 opacity-[0.03]">
                                                <MessageSquare className="w-12 h-12 text-black" />
                                            </div>
                                            <p className="italic text-gray-600 text-xs sm:text-sm leading-relaxed relative z-10" style={{ fontFamily: 'cursive' }}>
                                                "{msg.message}"
                                            </p>
                                            <p className="text-[10px] font-bold text-gray-400 mt-4 text-right uppercase tracking-widest leading-none">
                                                — For: <span className="text-black italic">{msg.recipient_name}</span>
                                            </p>
                                        </div>

                                        {/* Song Info Footer */}
                                        <div className="bg-gray-50 -mx-6 -mb-6 p-4 border-t border-gray-100 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
                                                {msg.album_art ? (
                                                    <img src={msg.album_art} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Music2 className="w-5 h-5 text-pink-400" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <h5 className="text-[10px] font-black text-gray-900 truncate uppercase tracking-tight">{msg.song_title}</h5>
                                                <p className="text-[9px] text-gray-500 truncate font-medium">{msg.artist_name}</p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-100 shadow-xs shrink-0">
                                                <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                                                <span className="text-[10px] font-black text-gray-900 italic">4.8</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="lg:col-span-3 bg-white p-12 rounded-[2.5rem] border border-gray-100 text-center shadow-sm border-dashed">
                                <Music className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">No Recent Messages</h4>
                                <p className="text-[10px] text-gray-400 mt-2 italic">Moderasi pesan yang masuk akan muncul di sini.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
