import { Head } from '@inertiajs/react';
import { 
    ShoppingBag, 
    Tag, 
    Star, 
    Trash2, 
    Edit, 
    Plus,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    ChevronDown,
    LayoutGrid,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Marketplace() {
    return (
        <div className="space-y-6 text-left">
            <Head title="Marketplace Oversight" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Marketplace Oversight</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Meninjau postingan jualan, kelola kategori, dan produk unggulan.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold border-gray-200 bg-white">
                        <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Categories
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-10 text-[10px] sm:text-xs font-bold bg-black hover:bg-gray-900 border-none px-4">
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Featured Item
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Stats Summary Area */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Listing</p>
                        <h4 className="text-2xl font-black text-gray-900">0</h4>
                    </div>

                    <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform">
                            <AlertCircle className="w-12 h-12 text-orange-600" />
                        </div>
                        <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">Pending Review</h4>
                        <p className="text-2xl font-black text-orange-700">0</p>
                        <p className="text-[10px] text-orange-600 mt-2">Postingan yang belum diverifikasi.</p>
                    </div>

                    {/* Category List Preview */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-gray-900">Kategori</h4>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Plus className="w-3 h-3" /></Button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group">
                                <span className="text-xs font-medium text-gray-700 truncate">Pakaian & Fashion</span>
                                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                                    <button className="p-1 hover:bg-gray-200 rounded"><Edit className="w-2.5 h-2.5" /></button>
                                    <button className="p-1 hover:bg-red-100 text-red-500 rounded"><Trash2 className="w-2.5 h-2.5" /></button>
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-[10px] h-8 font-bold text-gray-400 hover:text-black">
                            Kelola Semua Kategori
                        </Button>
                    </div>
                </div>

                {/* Listing Management Table Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                        {/* Filters Container */}
                        <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/50">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Cari postingan, seller, atau produk..." 
                                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs focus:ring-1 focus:ring-black"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="h-9 px-3 rounded-lg text-xs border-gray-100 bg-white">
                                    <Filter className="w-3.5 h-3.5 mr-2 text-gray-400" /> Filter
                                </Button>
                                <Button variant="outline" className="h-9 px-3 rounded-lg text-xs border-gray-100 bg-white">
                                    <Star className="w-3.5 h-3.5 mr-2 text-gray-400" /> Featured
                                </Button>
                            </div>
                        </div>

                        {/* List Area Placeholder */}
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                            <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-6">
                                <ShoppingBag className="w-8 h-8 text-gray-200" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Listing Masih Kosong</h3>
                            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                                Semua postingan barang dari pengguna akan muncul di sini untuk Anda tinjau dan moderasi.
                            </p>
                        </div>

                        {/* Summary Footer */}
                        <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-[10px] font-bold text-gray-500">0 Live</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                    <span className="text-[10px] font-bold text-gray-500">0 Pending</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button disabled variant="outline" className="h-8 px-4 rounded-lg text-[10px] font-bold">Prev</Button>
                                <Button disabled variant="outline" className="h-8 px-4 rounded-lg text-[10px] font-bold">Next</Button>
                            </div>
                        </div>
                    </div>

                    {/* Featured items preview */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-6 bg-black rounded-2xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                                <Star className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">Featured Items Control</h4>
                                <p className="text-[10px] text-gray-400">Atur barang mana saja yang mau "dipajang" di halaman depan.</p>
                            </div>
                        </div>
                        <Button className="mt-4 sm:mt-0 bg-white text-black hover:bg-gray-100 rounded-xl px-6 h-10 text-xs font-bold relative z-10">
                            Kelola Preview
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
