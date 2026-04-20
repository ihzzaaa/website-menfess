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
        <div className="space-y-6">
            <Head title="User Management" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Manajemen Pengguna</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Kelola direktori user, verifikasi penjual, dan kontrol akun.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold border-gray-200 bg-white">
                        <UserX className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Block List
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold bg-black hover:bg-gray-900 border-none">
                        <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Verified Users
                    </Button>
                </div>
            </div>

            {/* User Directory & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Stats Summary */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Directory</p>
                        <h4 className="text-2xl font-black text-gray-900 leading-none">0</h4>
                        <div className="mt-4 pt-4 border-t border-gray-50 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Aktif</span>
                                <span className="text-xs font-bold text-green-600">0</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Banned</span>
                                <span className="text-xs font-bold text-red-600">0</span>
                            </div>
                        </div>
                    </div>

                    {/* Seller Verification Requests */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-gray-900">Seller Verification</h4>
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full">3 Baru</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">Permintaan centang verifikasi penjual di marketplace.</p>
                        <div className="space-y-3">
                             <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-900">John Doe</p>
                                        <p className="text-[10px] text-gray-400">Request: 2j lalu</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-1 hover:bg-green-100 text-green-600 rounded transition-colors"><Check className="w-3 h-3" /></button>
                                    <button className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"><X className="w-3 h-3" /></button>
                                </div>
                             </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-[10px] h-8 font-bold text-gray-400 hover:text-black">
                            Lihat Semua Request
                        </Button>
                    </div>
                </div>

                {/* Main User Table Placeholder */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {/* Table Controls */}
                        <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Cari user (email, nama, atau CID)..." 
                                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs focus:ring-1 focus:ring-black"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="h-9 px-3 rounded-lg text-xs border-gray-100">
                                    <Filter className="w-3.5 h-3.5 mr-2 text-gray-400" /> Filter
                                </Button>
                                <Button variant="outline" className="h-9 px-3 rounded-lg text-xs border-gray-100">
                                    <Shield className="w-3.5 h-3.5 mr-2 text-gray-400" /> Role
                                </Button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">User Details</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Auth</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Marketplace Role</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-50 mb-4">
                                                <UsersIcon className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <p className="text-sm font-bold text-gray-900">Belum ada user terdaftar</p>
                                            <p className="text-xs text-gray-400">Data pengguna akan muncul di sini setelah ada registrasi.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
                            <p className="text-[10px] font-bold text-gray-400">Showing 0 of 0 Users</p>
                            <div className="flex gap-2">
                                <Button disabled variant="outline" className="h-8 px-3 rounded-lg text-[10px] font-bold text-gray-400">Previous</Button>
                                <Button disabled variant="outline" className="h-8 px-3 rounded-lg text-[10px] font-bold text-gray-400">Next</Button>
                            </div>
                        </div>
                    </div>

                    {/* Account Controls Quick Access */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-4">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                <ShieldAlert className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-red-900 mb-1">Emergency Lockdown</h4>
                                <p className="text-[10px] text-red-700 leading-relaxed">Matikan fitur registrasi atau posting untuk menjaga stabilitas platform jika terjadi serangan bot.</p>
                            </div>
                         </div>
                         <div className="bg-gray-900 p-4 rounded-2xl text-white flex items-start gap-4">
                            <div className="p-2 bg-white/10 rounded-lg text-white">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold mb-1">Shadow Ban System</h4>
                                <p className="text-[10px] text-gray-400 leading-relaxed">User tidak bisa melihat postingan orang lain/postingan tidak terlihat publik tanpa notifikasi banned.</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
