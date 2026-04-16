import { Head, router } from '@inertiajs/react';
import { LogOut, Menu, X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface NotificationsProps {
    status?: string;
}

export default function Notifications({ status }: NotificationsProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    const handleNavigate = (path: string) => {
        window.location.href = path;
    };

    const menuItems = [
        { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
        { icon: '👥', label: 'Users', path: '/admin/users' },
        { icon: '💬', label: 'Moderation', path: '/admin/moderation' },
        { icon: '🛍️', label: 'Marketplace', path: '/admin/marketplace' },
        { icon: '📋', label: 'Polls', path: '/admin/polls' },
        { icon: '📢', label: 'Notifications', path: '/admin/notifications', active: true },
        { icon: '🎁', label: 'Sponsors', path: '/admin/sponsors' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100">
            <Head title="Notifications Center" />

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b-2 border-cyan-200/50 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)} 
                            className="p-2 hover:bg-cyan-100 rounded-lg transition-colors"
                        >
                            {sidebarOpen ? (
                                <X className="w-6 h-6 text-cyan-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-cyan-700" />
                            )}
                        </button>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            Menfess Admin
                        </h1>
                    </div>
                    <Button 
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white/60 backdrop-blur-lg border-r-2 border-cyan-200/50 p-6 overflow-hidden`}>
                    <nav className="space-y-3">
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => handleNavigate(item.path)}
                                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                                    item.active
                                        ? 'bg-cyan-100/80 border-2 border-cyan-300 text-cyan-700'
                                        : 'hover:bg-cyan-50 border-2 border-transparent text-cyan-600'
                                }`}
                            >
                                {item.icon} {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="mb-6 flex items-center gap-2">
                        <button 
                            onClick={() => handleNavigate('/admin/dashboard')}
                            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Back
                        </button>
                    </div>

                    {status && (
                        <div className="mb-6 rounded-xl bg-green-100 border-2 border-green-400 p-4 text-green-700 font-semibold">
                            ✓ {status}
                        </div>
                    )}
                    
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 border-2 border-cyan-200/50 shadow-lg text-center min-h-96 flex items-center justify-center">
                        <div>
                            <div className="text-6xl mb-4">📢</div>
                            <h2 className="text-3xl font-bold text-cyan-700 mb-2">Notifications Center</h2>
                            <p className="text-cyan-600 font-semibold">Halaman untuk WhatsApp & notifikasi akan diisi di sini</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
