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
        { label: 'Menfess Hari Ini', value: '452', icon: MessageSquare, trend: '+12%', color: 'bg-blue-500' },
        { label: 'User Online', value: '84', icon: Users, trend: '+5%', color: 'bg-green-500' },
        { label: 'Verifikasi Pending', value: '12', icon: CheckCircle2, trend: '-2', color: 'bg-orange-500' },
        { label: 'Total Postingan', value: '12.4K', icon: ShoppingBag, trend: '+1.2K', color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <Head title="Admin Overview" />

            {/* Welcome & Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Statistik & Monitoring</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Gambaran real-time performa platform Anda hari ini.</p>
                </div>
                <div className="flex items-center self-start sm:self-auto gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest leading-none">WA Gateway</span>
                    </div>
                    <div className="h-4 w-px bg-gray-100"></div>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full leading-none">Connected</span>
                    <Smartphone className="w-3.5 h-3.5 text-gray-400" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 rounded-xl ${stat.color} bg-opacity-10 text-white`}>
                                <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.trend}</span>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">{stat.value}</h3>
                        <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-base font-bold text-gray-900">Traffic Peak Hours</h3>
                            <p className="text-xs text-gray-500">Jam-jam paling ramai orang "galau" atau "belanja".</p>
                        </div>
                        <select className="text-xs font-bold bg-gray-50 border-none rounded-lg px-3 py-1.5 focus:ring-black">
                            <option>Hari Ini</option>
                            <option>7 Hari Terakhir</option>
                        </select>
                    </div>
                    <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockChartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 600}}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 600}}
                                />
                                <Tooltip 
                                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px'}}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#000" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorValue)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Side Panels */}
                <div className="space-y-6">
                    {/* User Rules Management */}
                    <div className="bg-black p-6 rounded-2xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-1">User Rules</h3>
                            <p className="text-gray-400 text-xs mb-6">Atur dan perbarui peraturan komunitas Menfess & Marketplace.</p>
                            <button className="w-full py-2.5 bg-white text-black rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors">
                                Kelola Peraturan
                            </button>
                        </div>
                    </div>

                    {/* Quick Monitoring */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                             <TrendingUp className="w-4 h-4" /> Real-time Activity
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <MessageSquare className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">Menfess Masuk</p>
                                        <p className="text-[10px] text-gray-500">2 menit yang lalu</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-green-600">+1</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                        <Users className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">User Baru</p>
                                        <p className="text-[10px] text-gray-500">15 menit yang lalu</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-green-600">+3</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                                        <AlertCircle className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">Laporan Baru</p>
                                        <p className="text-[10px] text-gray-500">1 jam yang lalu</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-red-600">+2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
