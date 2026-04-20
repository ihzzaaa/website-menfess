import { Head } from '@inertiajs/react';
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
    BookOpen
} from 'lucide-react';
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

export default function Dashboard({ status }: DashboardProps) {
    const stats = [
        { label: 'Menfess Hari Ini', value: '452', icon: MessageSquare, trend: '+12%', color: 'text-red-500' },
        { label: 'User Online', value: '84', icon: Users, trend: '+5%', color: 'text-blue-500' },
        { label: 'Verifikasi Pending', value: '12', icon: CheckCircle2, trend: '-2', color: 'text-orange-500' },
        { label: 'Total Postingan', value: '12.4K', icon: ShoppingBag, trend: '+1.2K', color: 'text-purple-500' },
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
                    <div key={index} className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/50 shadow-sm hover:bg-zinc-900/60 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="flex items-center justify-between mb-5 relative z-10">
                            <div className={`p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700/50 group-hover:border-red-500/50 transition-colors`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-800 px-2 py-0.5 rounded-lg border border-zinc-700/50">{stat.trend}</span>
                        </div>
                        <h3 className="text-3xl font-black text-white leading-none mb-2 tracking-tighter">{stat.value}</h3>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                             <div className="w-1 h-1 bg-red-600 rounded-full"></div> {stat.label}
                        </p>
                    </div>
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
                            <p className="text-zinc-500 text-[11px] mb-10 font-medium leading-relaxed italic max-w-[180px]">Atur dan perbarui peraturan komunitas Menfess & Marketplace kita.</p>
                            <button className="w-full py-4 bg-zinc-950 text-zinc-400 border border-dashed border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-red-500 hover:border-red-600/30 transition-all shadow-xl italic">
                                Kelola Peraturan
                            </button>
                        </div>
                    </div>

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
