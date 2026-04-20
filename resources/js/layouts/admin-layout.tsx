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
    Settings
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
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-black' : 'text-gray-500 group-hover:text-white'}`} />
            <span className="flex-1 text-left">{label}</span>
            {active && <ChevronRight className="w-3 h-3" />}
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
                <div className="p-5 border-b border-gray-800 flex-shrink-0 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/5">
                            <span className="text-black font-bold text-xl">M</span>
                        </div>
                        <div>
                            <h2 className="text-base font-bold tracking-tight">Menfess</h2>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Admin Panel</p>
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
                        <div key={idx} className="space-y-2">
                            <p className="px-3 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
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
                <div className="p-4 border-t border-gray-800 bg-black/50 backdrop-blur-xl flex-shrink-0">
                    <div 
                        onClick={() => handleNavigate('/admin/profile')}
                        className={`flex items-center gap-3 p-2.5 mb-3 rounded-2xl border transition-colors cursor-pointer group ${
                            isActive('/admin/profile') ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5 hover:bg-white/10'
                        }`}
                    >
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 overflow-hidden">
                            {(usePage().props.auth as any).admin?.avatar_url ? (
                                <img 
                                    src={(usePage().props.auth as any).admin.avatar_url} 
                                    alt="Avatar" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-black font-bold text-sm">
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
            <div className="flex-1 min-w-0 flex flex-col transition-all duration-300 lg:ml-64">
                {/* Top Sticky Header */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 h-16 shrink-0">
                    <div className="flex items-center justify-between px-4 sm:px-6 h-full">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setSidebarOpen(true)} 
                                className="lg:hidden p-2 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100"
                            >
                                <Menu className="w-5 h-5 text-gray-900" />
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-[1px] bg-gray-200 hidden sm:block"></div>
                                <h1 className="text-xs font-bold text-gray-900 capitalize italic tracking-wide">
                                    {(url ? url.split('/').pop() : 'Dashboard')?.replace('-', ' ') || 'Dashboard'}
                                </h1>
                            </div>
                        </div>
                        
                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex -space-x-2 mr-1">
                                <div className="w-7 h-7 rounded-full border-2 border-white bg-green-500 shadow-sm" title="System Online"></div>
                                <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">+3</div>
                            </div>
                            <button className="relative p-2.5 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100 group">
                                <Bell className="w-4 h-4 text-gray-500 group-hover:text-black transition-colors" />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content Body */}
                <main className="p-4 sm:p-6 lg:p-8 flex-1">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
