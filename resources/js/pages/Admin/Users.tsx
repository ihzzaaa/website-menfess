import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Users as UsersIcon, UserCheck, UserX, ShieldAlert, Search, Filter,
    Check, X, Shield, Coins, Eye, EyeOff, BadgeCheck, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

interface UserItem {
    id: number; name: string; email: string; coin_balance: number;
    is_blocked: boolean; is_shadow_banned: boolean; is_verified_seller: boolean;
    created_at: string; menfess_posts_count: number; marketplace_items_count: number; songfess_messages_count: number;
}
interface PaginatedUsers { data: UserItem[]; current_page: number; last_page: number; total: number; }
interface KycItem { id: number; user: { id: number; name: string; email: string }; ktp_image_path: string; status: string; created_at: string; }
interface Props {
    users: PaginatedUsers; kycRequests: KycItem[];
    userStats: { total: number; active: number; blocked: number; shadow_banned: number; verified_sellers: number; pending_kyc: number; };
    filters: { search: string; filter: string; };
}

export default function Users({ users, kycRequests = [], userStats, filters }: Props) {
    const [search, setSearch] = useState(filters.search);
    const [coinModal, setCoinModal] = useState<UserItem | null>(null);
    const { data: coinData, setData: setCoinData, post: postCoin, processing: coinProcessing, reset: resetCoin } = useForm({ amount: 0, reason: '' });

    const handleSearch = (e: React.FormEvent) => { e.preventDefault(); router.get('/admin/users', { filter: filters.filter, search }, { preserveState: true }); };
    const handleFilter = (f: string) => router.get('/admin/users', { filter: f, search: filters.search }, { preserveState: true });
    const handleBlock = (id: number) => router.post(`/admin/users/${id}/toggle-block`, {}, { preserveScroll: true, onSuccess: () => toast.success('Status updated!') });
    const handleShadowBan = (id: number) => router.put(`/admin/users/${id}/toggle-shadow-ban`, {}, { preserveScroll: true, onSuccess: () => toast.success('Shadow ban toggled!') });
    const handleVerified = (id: number) => router.put(`/admin/users/${id}/toggle-verified`, {}, { preserveScroll: true, onSuccess: () => toast.success('Verified status updated!') });
    const handleApproveKyc = (id: number) => router.put(`/admin/kyc/${id}/approve`, {}, { preserveScroll: true, onSuccess: () => toast.success('KYC approved!') });
    const handleRejectKyc = (id: number) => router.put(`/admin/kyc/${id}/reject`, {}, { preserveScroll: true, onSuccess: () => toast.success('KYC rejected.') });
    const handleCoinSubmit = (e: React.FormEvent) => {
        e.preventDefault(); if (!coinModal) return;
        postCoin(`/admin/users/${coinModal.id}/adjust-coin`, { preserveScroll: true, onSuccess: () => { setCoinModal(null); resetCoin(); toast.success('Coin adjusted!'); } });
    };

    const filterTabs = [
        { key: 'all', label: 'Semua', count: userStats.total },
        { key: 'blocked', label: 'Blocked', count: userStats.blocked },
        { key: 'shadow_banned', label: 'Shadow Ban', count: userStats.shadow_banned },
        { key: 'verified', label: 'Verified', count: userStats.verified_sellers },
    ];

    return (
        <div className="space-y-6 text-left">
            <Head title="User Management" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">MANAJEMEN PENGGUNA</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Kelola direktori user, verifikasi penjual, shadow ban, dan koin.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Stats */}
                    <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-zinc-800/50 shadow-sm">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 italic">TOTAL DIRECTORY</p>
                        <h4 className="text-3xl font-black text-white leading-none tracking-tighter italic">{userStats.total.toLocaleString()}</h4>
                        <div className="mt-6 pt-6 border-t border-zinc-800/50 space-y-4">
                            <div className="flex items-center justify-between"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Aktif</span><span className="text-xs font-black text-green-500 italic">{userStats.active.toLocaleString()}</span></div>
                            <div className="flex items-center justify-between"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Blocked</span><span className="text-xs font-black text-red-600 italic">{userStats.blocked}</span></div>
                            <div className="flex items-center justify-between"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Shadow Banned</span><span className="text-xs font-black text-orange-500 italic">{userStats.shadow_banned}</span></div>
                            <div className="flex items-center justify-between"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Verified Sellers</span><span className="text-xs font-black text-blue-500 italic">{userStats.verified_sellers}</span></div>
                        </div>
                    </div>

                    {/* KYC Requests */}
                    <div className="bg-zinc-900/40 p-7 rounded-[2rem] border border-zinc-800/50 shadow-sm text-left">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">KYC Verification</h4>
                            {kycRequests.length > 0 && <span className="px-2.5 py-1 bg-red-600/10 text-red-500 text-[9px] font-black rounded-xl border border-red-500/20 italic tracking-widest">{kycRequests.length} BARU</span>}
                        </div>
                        <p className="text-[11px] text-zinc-500 mb-6 italic font-medium leading-relaxed">Permintaan verifikasi centang biru penjual marketplace.</p>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                            {kycRequests.length > 0 ? kycRequests.map(kyc => (
                                <div key={kyc.id} className="p-3 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 group hover:bg-zinc-950 transition-colors border-dashed">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50 text-white text-xs font-black italic">{kyc.user.name.charAt(0)}</div>
                                            <div className="text-left">
                                                <p className="text-[10px] font-black text-white uppercase italic">{kyc.user.name}</p>
                                                <p className="text-[9px] text-zinc-700 font-bold italic">{new Date(kyc.created_at).toLocaleDateString('id-ID')}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <button onClick={() => handleApproveKyc(kyc.id)} className="p-1.5 hover:bg-green-600/20 text-green-500 rounded-lg transition-colors border border-green-500/10"><Check className="w-3.5 h-3.5" /></button>
                                            <button onClick={() => handleRejectKyc(kyc.id)} className="p-1.5 hover:bg-red-600/20 text-red-600 rounded-lg transition-colors border border-red-500/10"><X className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-[10px] text-zinc-600 italic font-medium text-center py-4">Tidak ada permintaan KYC pending.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main User Table */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 shadow-sm overflow-hidden text-left">
                        {/* Controls */}
                        <div className="p-4 border-b border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/20">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {filterTabs.map(tab => (
                                    <button key={tab.key} onClick={() => handleFilter(tab.key)}
                                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic border transition-all ${filters.filter === tab.key ? 'bg-red-600/20 border-red-600/50 text-red-500' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:text-zinc-400'}`}>
                                        {tab.label} <span className="ml-1 opacity-60">{tab.count}</span>
                                    </button>
                                ))}
                            </div>
                            <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari user..." className="w-full pl-11 pr-5 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-[11px] focus:ring-1 focus:ring-red-600/30 text-white placeholder:text-zinc-800 italic font-medium" />
                            </form>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-zinc-950/50">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em] italic">User</th>
                                        <th className="px-4 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em] italic">Koin</th>
                                        <th className="px-4 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em] italic">Status</th>
                                        <th className="px-4 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em] italic">Posts</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em] italic text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {users.data.length > 0 ? users.data.map(user => (
                                        <tr key={user.id} className="hover:bg-zinc-900/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center text-white text-xs font-black border border-zinc-700/50">{user.name.charAt(0).toUpperCase()}</div>
                                                    <div>
                                                        <p className="text-xs font-black text-white italic flex items-center gap-1.5">{user.name} {user.is_verified_seller && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />}</p>
                                                        <p className="text-[10px] text-zinc-600 font-medium">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <button onClick={() => { setCoinModal(user); setCoinData({ amount: 0, reason: '' }); }} className="flex items-center gap-1 text-xs font-black text-yellow-500 hover:text-yellow-400 transition-colors cursor-pointer">
                                                    <Coins className="w-3.5 h-3.5" /> {user.coin_balance}
                                                </button>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {user.is_blocked && <span className="px-2 py-0.5 bg-red-600/10 text-red-500 text-[9px] font-black rounded-lg border border-red-500/20 italic">BLOCKED</span>}
                                                    {user.is_shadow_banned && <span className="px-2 py-0.5 bg-orange-600/10 text-orange-500 text-[9px] font-black rounded-lg border border-orange-500/20 italic">SHADOW</span>}
                                                    {!user.is_blocked && !user.is_shadow_banned && <span className="px-2 py-0.5 bg-green-600/10 text-green-500 text-[9px] font-black rounded-lg border border-green-500/20 italic">ACTIVE</span>}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-[10px] font-black text-zinc-500 italic">{user.menfess_posts_count}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-1.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleBlock(user.id)} className={`p-1.5 rounded-lg border transition-all text-[9px] ${user.is_blocked ? 'bg-red-600/20 text-red-500 border-red-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700 hover:text-red-500'}`} title="Block/Unblock"><UserX className="w-3.5 h-3.5" /></button>
                                                    <button onClick={() => handleShadowBan(user.id)} className={`p-1.5 rounded-lg border transition-all ${user.is_shadow_banned ? 'bg-orange-600/20 text-orange-500 border-orange-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700 hover:text-orange-500'}`} title="Shadow Ban"><EyeOff className="w-3.5 h-3.5" /></button>
                                                    <button onClick={() => handleVerified(user.id)} className={`p-1.5 rounded-lg border transition-all ${user.is_verified_seller ? 'bg-blue-600/20 text-blue-500 border-blue-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700 hover:text-blue-500'}`} title="Toggle Verified"><BadgeCheck className="w-3.5 h-3.5" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-zinc-900 border border-zinc-800 mb-6 shadow-inner"><UsersIcon className="w-8 h-8 text-zinc-800" /></div>
                                            <p className="text-sm font-black text-white uppercase italic tracking-widest mb-2">Belum ada user terdaftar</p>
                                            <p className="text-[11px] text-zinc-600 font-medium italic">Data pengguna akan muncul setelah registrasi.</p>
                                        </td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="p-4 bg-zinc-950/50 border-t border-zinc-800/50 flex items-center justify-between">
                            <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest italic">Page {users.current_page} of {users.last_page} ({users.total} users)</p>
                            <div className="flex gap-2">
                                <Button disabled={users.current_page <= 1} onClick={() => router.get('/admin/users', { ...filters, page: users.current_page - 1 }, { preserveState: true })} variant="outline" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-500 border-dashed">Previous</Button>
                                <Button disabled={users.current_page >= users.last_page} onClick={() => router.get('/admin/users', { ...filters, page: users.current_page + 1 }, { preserveState: true })} variant="outline" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-500 border-dashed">Next</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coin Adjustment Modal */}
            <Dialog open={!!coinModal} onOpenChange={() => setCoinModal(null)}>
                <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[400px] p-0 overflow-hidden rounded-[2rem]">
                    <div className="p-8">
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-lg font-black italic tracking-widest uppercase flex items-center gap-2"><Coins className="w-5 h-5 text-yellow-500" /> ADJUST KOIN</DialogTitle>
                            <DialogDescription className="text-zinc-500 text-[11px] italic font-black">{coinModal?.name} — Balance: {coinModal?.coin_balance}</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCoinSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Jumlah (negatif = kurangi)</label>
                                <Input type="number" value={coinData.amount} onChange={e => setCoinData('amount', parseInt(e.target.value) || 0)} className="bg-zinc-900 border-zinc-800 text-white h-12 rounded-xl text-sm font-black" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Alasan</label>
                                <Input value={coinData.reason} onChange={e => setCoinData('reason', e.target.value)} placeholder="Misal: Bonus event, Penalty, dll" className="bg-zinc-900 border-zinc-800 text-white h-12 rounded-xl text-[11px] italic" />
                            </div>
                            <Button type="submit" disabled={coinProcessing || !coinData.reason} className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                                {coinProcessing ? 'PROCESSING...' : 'ADJUST KOIN'}
                            </Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
