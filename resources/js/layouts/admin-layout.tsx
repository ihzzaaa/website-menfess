import { router, usePage } from '@inertiajs/react';
import { 
    LogOut, 
    Menu, 
    X, 
    LayoutDashboard, 
    Users, 
    MessageSquare, 
    ShoppingBag, 
    ClipboardList, 
    Bell, 
    Gift,
    Music,
    ChevronRight,
    Settings,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, ReactNode, useEffect } from 'react';

interface SidebarItemProps {
    icon: any;
    label: string;
    path: string;
    active: boolean;
    onClick: (path: string) => void;
}

function SidebarItem({ icon: Icon, label, path, active, onClick }: SidebarItemProps) {
    return (
        <button
            onClick={() => onClick(path)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden ${
                active
                    ? 'bg-zinc-800/80 text-white shadow-lg'
                    : 'text-zinc-500 hover:bg-zinc-800/40 hover:text-white'
            }`}
        >
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-red-600 rounded-r-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
            )}
            <Icon className={`w-4 h-4 transition-colors ${active ? 'text-red-500' : 'text-zinc-500 group-hover:text-white'}`} />
            <span className="flex-1 text-left">{label}</span>
            {active && <ChevronRight className="w-3 h-3 text-red-500" />}
        </button>
    );
}


export default function AdminLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Default false for mobile
    const { url } = usePage();

    // Close sidebar on route change (for mobile)
    useEffect(() => {
        setSidebarOpen(false);
    }, [url]);

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    const handleNavigate = (path: string) => {
        router.visit(path);
    };

    const isActive = (path: string) => url.startsWith(path);

    const menuGroups = [
        {
            title: 'Utama',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
            ]
        },
        {
            title: 'Marketplace',
            items: [
                { icon: ShoppingBag, label: 'Marketplace', path: '/admin/marketplace' },
            ]
        },
        {
            title: 'Moderasi',
            items: [
                { icon: FileText, label: 'Menfess Manager', path: '/admin/menfess' },
                { icon: MessageSquare, label: 'Content Moderation', path: '/admin/moderation' },
                { icon: Music, label: 'Musical Menfess', path: '/admin/musical-menfess' },
            ]
        },
        {
            title: 'Sistem',
            items: [
                { icon: Users, label: 'User Management', path: '/admin/users' },
                { icon: ClipboardList, label: 'Daily Polls', path: '/admin/polls' },
                { icon: Bell, label: 'WhatsApp Center', path: '/admin/notifications' },
                { icon: Gift, label: 'Sponsor & Banner', path: '/admin/sponsors' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
            {/* Backdrop Overlay (Mobile only) */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-[45] lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside 
                className={`fixed left-0 top-0 h-full bg-black text-white transition-transform duration-300 z-50 flex flex-col w-64 border-r border-gray-800 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Sidebar Header */}
                <div className="p-6 border-b border-zinc-900/50 flex-shrink-0 flex items-center justify-between bg-zinc-950/20">
                    <div className="flex items-center gap-3.5 group">
                        <div className="w-11 h-11 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 shadow-inner group-hover:border-red-600/30 transition-all duration-500">
                            <span className="text-red-600 font-black text-2xl italic tracking-tighter shadow-[0_0_15px_rgba(220,38,38,0.2)]">M</span>
                        </div>

                        <div className="text-left">
                            <h2 className="text-sm font-black tracking-[0.2em] text-white uppercase italic leading-none mb-1.5">MENFESS</h2>
                            <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.3em] leading-none italic">ADMIN PORTAL</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSidebarOpen(false)} 
                        className="lg:hidden p-2 hover:bg-gray-800 rounded-xl transition-colors text-gray-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
                    {menuGroups.map((group, idx) => (
                        <div key={idx} className="space-y-4">
                            <p className="px-3 text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-1 border-l-2 border-transparent">
                                {group.title}
                            </p>

                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <SidebarItem
                                        key={item.path}
                                        {...item}
                                        active={isActive(item.path)}
                                        onClick={handleNavigate}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-zinc-900 bg-black flex-shrink-0">
                    <div 
                        onClick={() => handleNavigate('/admin/profile')}
                        className={`flex items-center gap-3 p-2.5 mb-3 rounded-2xl border transition-colors cursor-pointer group ${
                            isActive('/admin/profile') ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800'
                        }`}
                    >
                        <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 overflow-hidden border border-zinc-700">
                            {(usePage().props.auth as any).admin?.avatar_url ? (
                                <img 
                                    src={(usePage().props.auth as any).admin.avatar_url} 
                                    alt="Avatar" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white font-bold text-sm">
                                    {(usePage().props.auth as any).admin?.name?.charAt(0).toUpperCase() || 'A'}
                                </span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-xs font-bold truncate text-white">
                                {(usePage().props.auth as any).admin?.name || 'Admin'}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate group-hover:text-gray-400 transition-colors">
                                {(usePage().props.auth as any).admin?.email || 'admin@gmail.com'}
                            </p>
                        </div>
                        <Settings className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <Button 
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 bg-transparent text-gray-400 border-gray-800 hover:bg-red-500 hover:text-white hover:border-red-500 h-10 text-[11px] font-bold rounded-xl transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col transition-all duration-300 lg:ml-64 bg-black">
                {/* Top Sticky Header */}
                <header className="sticky top-0 z-40 bg-black border-b border-zinc-900 h-16 shrink-0">
                    <div className="flex items-center justify-between px-4 sm:px-6 h-full">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setSidebarOpen(true)} 
                                className="lg:hidden p-2 hover:bg-zinc-900 rounded-xl transition-colors border border-zinc-800"
                            >
                                <Menu className="w-5 h-5 text-white" />
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block"></div>
                                <h1 className="text-xs font-black text-white capitalize italic tracking-widest">
                                    {(url ? url.split('/').pop() : 'Dashboard')?.replace('-', ' ') || 'Dashboard'}
                                </h1>
                            </div>
                        </div>
                        
                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            <button className="relative p-2.5 hover:bg-zinc-900 rounded-xl transition-all border border-transparent hover:border-zinc-800 group">
                                <Bell className="w-4 h-4 text-zinc-500 group-hover:text-red-500 transition-colors" />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full"></span>
                            </button>
                        </div>
                    </div>
                </header>


                {/* Page Content Body */}
                <main className="p-4 sm:p-6 lg:p-8 flex-1 dark">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>

    );
}
