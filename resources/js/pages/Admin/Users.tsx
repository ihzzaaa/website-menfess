import { Head } from '@inertiajs/react';
import { 
    Users as UsersIcon, 
    UserCheck, 
    UserX, 
    ShieldAlert, 
    Search,
    Filter,
    MoreVertical,
    Check,
    X,
    Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Users() {
    return (
        <div className="space-y-6 text-left">
            <Head title="User Management" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">MANAJEMEN PENGGUNA</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Kelola direktori user, verifikasi penjual, dan kontrol akun.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed">
                        <UserX className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Block List
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 px-6 italic transition-all">
                        <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" /> Verified Users
                    </Button>
                </div>
            </div>

            {/* User Directory & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Stats Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-zinc-800/50 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-[0.02] rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500"></div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 italic">TOTAL DIRECTORY</p>
                        <h4 className="text-3xl font-black text-white leading-none tracking-tighter italic">1,248</h4>
                        <div className="mt-6 pt-6 border-t border-zinc-800/50 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Aktif</span>
                                <span className="text-xs font-black text-green-500 italic uppercase">1,232</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Banned</span>
                                <span className="text-xs font-black text-red-600 italic uppercase shadow-[0_0_10px_rgba(220,38,38,0.15)]">16</span>
                            </div>
                        </div>
                    </div>

                    {/* Seller Verification Requests */}
                    <div className="bg-zinc-900/40 p-7 rounded-[2rem] border border-zinc-800/50 shadow-sm relative overflow-hidden text-left">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Seller Verification</h4>
                            <span className="px-2.5 py-1 bg-red-600/10 text-red-500 text-[9px] font-black rounded-xl border border-red-500/20 italic tracking-widest">3 BARU</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mb-8 italic font-medium leading-relaxed">Permintaan centang verifikasi penjual di marketplace.</p>
                        <div className="space-y-4">
                             <div className="p-3 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 flex items-center justify-between group hover:bg-zinc-950 transition-colors border-dashed">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50 text-white text-xs font-black italic">J</div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-white uppercase italic">John Doe</p>
                                        <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-tighter italic">2j lalu</p>
                                    </div>
                                </div>
                                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 hover:bg-green-600/20 text-green-500 rounded-lg transition-colors border border-green-500/10"><Check className="w-3.5 h-3.5" /></button>
                                    <button className="p-1.5 hover:bg-red-600/20 text-red-600 rounded-lg transition-colors border border-red-500/10"><X className="w-3.5 h-3.5" /></button>
                                </div>
                             </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-8 text-[10px] h-10 font-black text-zinc-500 hover:text-white uppercase tracking-[0.2em] italic transition-all border border-dashed border-zinc-800 rounded-xl">
                            Lihat Semua
                        </Button>
                    </div>
                </div>

                {/* Main User Table Placeholder */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 shadow-sm overflow-hidden text-left">
                        {/* Table Controls */}
                        <div className="p-6 border-b border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/20">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input 
                                    type="text" 
                                    placeholder="Cari user (email, nama, atau CID)..." 
                                    className="w-full pl-11 pr-5 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-[11px] focus:ring-1 focus:ring-red-600/30 text-white placeholder:text-zinc-800 italic font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white italic border-dashed">
                                    <Filter className="w-3.5 h-3.5 mr-2 text-red-600" /> Filter
                                </Button>
                                <Button variant="outline" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white italic border-dashed">
                                    <Shield className="w-3.5 h-3.5 mr-2 text-red-600" /> Role
                                </Button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-zinc-950/50">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] italic">User Details</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] italic">Status Auth</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] italic">Marketplace Role</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] italic text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    <tr className="hover:bg-zinc-900/50 transition-colors group">
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-zinc-900 border border-zinc-800 mb-6 shadow-inner group-hover:border-red-600/30 transition-all duration-500">
                                                <UsersIcon className="w-8 h-8 text-zinc-800 group-hover:text-red-900/50 transition-colors" />
                                            </div>
                                            <p className="text-sm font-black text-white uppercase italic tracking-[0.2rem] mb-2">Belum ada user terdaftar</p>
                                            <p className="text-[11px] text-zinc-600 font-medium italic">Data pengguna akan muncul di sini setelah ada registrasi.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-6 bg-zinc-950/50 border-t border-zinc-800/50 flex items-center justify-between">
                            <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest italic">Showing 0 of 0 Users</p>
                            <div className="flex gap-2">
                                <Button disabled variant="outline" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-800 border-dashed">Previous</Button>
                                <Button disabled variant="outline" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-800 border-dashed">Next</Button>
                            </div>
                        </div>
                    </div>

                    {/* Account Controls Quick Access */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6">
                         <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 flex items-start gap-6 shadow-sm group relative overflow-hidden hover:border-red-600/30 transition-all">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-[0.02] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                             <div className="p-4 bg-zinc-950 rounded-2xl text-red-600 border border-zinc-800 shadow-inner group-hover:border-red-600/50 transition-colors shrink-0">
                                <ShieldAlert className="w-8 h-8 shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
                            </div>
                            <div className="relative z-10 text-left">
                                <h4 className="text-base font-black text-white mb-2 uppercase italic tracking-widest leading-none">EMERGENCY LOCKDOWN</h4>
                                <p className="text-[11px] text-zinc-500 leading-relaxed italic font-medium">Matikan fitur registrasi atau posting untuk menjaga stabilitas platform jika terjadi serangan bot.</p>
                            </div>
                         </div>
                         <div className="bg-zinc-900 p-6 rounded-[2.5rem] border border-zinc-800 flex items-start gap-5 group relative overflow-hidden hover:bg-zinc-950 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                            <div className="p-3.5 bg-zinc-800 rounded-2xl text-red-600 border border-zinc-700 relative z-10 group-hover:border-red-600/50 transition-colors">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div className="relative z-10 text-left">
                                <h4 className="text-sm font-black text-white mb-2 uppercase italic tracking-widest">SHADOW BAN SYSTEM</h4>
                                <p className="text-[11px] text-zinc-500 leading-relaxed italic font-medium">User tidak bisa melihat postingan orang lain/postingan tidak terlihat publik tanpa notifikasi banned.</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
