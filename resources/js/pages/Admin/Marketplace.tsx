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
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">MARKETPLACE OVERSIGHT</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Meninjau postingan jualan, kelola kategori, dan produk unggulan.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button variant="outline" className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed">
                        <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Categories
                    </Button>
                    <Button className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 px-6 italic transition-all">
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" /> Featured Item
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Stats Summary Area */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-zinc-800/50 shadow-sm relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                             <ShoppingBag className="w-24 h-24 text-white" />
                        </div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 italic">TOTAL LISTING</p>
                        <h4 className="text-3xl font-black text-white italic tracking-tighter shadow-smShadow">0</h4>
                    </div>

                    <div className="bg-zinc-900/40 p-7 rounded-[2rem] border border-zinc-800/50 relative overflow-hidden group shadow-sm hover:border-red-600/30 transition-all">
                        <div className="absolute top-0 right-0 p-5 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
                            <AlertCircle className="w-20 h-20 text-white" />
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 shadow-inner">
                                <AlertCircle className="w-5 h-5 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" />
                            </div>
                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic leading-none">PENDING REVIEW</h4>
                        </div>
                        <div className="flex items-baseline gap-2">
                             <p className="text-4xl font-black text-white italic tracking-tighter">0</p>
                             <p className="text-[10px] text-zinc-700 font-black uppercase italic tracking-widest leading-none">Items</p>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-6 font-medium italic leading-relaxed">Postingan yang belum diverifikasi admin.</p>
                    </div>

                    {/* Category List Preview */}
                    <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-zinc-800/50 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Kategori</h4>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:bg-red-600/10 rounded-xl transition-all"><Plus className="w-4 h-4" /></Button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3.5 bg-zinc-950/50 rounded-[1.2rem] group border border-zinc-800/50 hover:border-red-600/30 transition-all">
                                <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white truncate italic uppercase tracking-tighter transition-colors">Pakaian & Fashion</span>
                                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1.5">
                                    <button className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-white rounded-lg transition-colors"><Edit className="w-3 h-3" /></button>
                                    <button className="p-1.5 hover:bg-red-950 text-red-500 rounded-lg transition-colors"><Trash2 className="w-3 h-3" /></button>
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-8 text-[10px] h-10 font-black text-zinc-600 hover:text-white uppercase tracking-[0.2em] italic border border-dashed border-zinc-800 rounded-xl transition-all">
                            Kelola Semua Kategori
                        </Button>
                    </div>
                </div>

                {/* Listing Management Table Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 shadow-sm overflow-hidden min-h-[450px] flex flex-col group">
                        {/* Filters Container */}
                        <div className="p-6 border-b border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/20 relative z-10">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                <input 
                                    type="text" 
                                    placeholder="Cari postingan, seller, atau produk..." 
                                    className="w-full pl-12 pr-6 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-[11px] focus:ring-1 focus:ring-red-600 text-white placeholder:text-zinc-700 italic"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed">
                                    <Filter className="w-3.5 h-3.5 mr-2 text-red-600" /> Filter
                                </Button>
                                <Button variant="outline" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed">
                                    <Star className="w-3.5 h-3.5 mr-2 text-red-600" /> Featured
                                </Button>
                            </div>
                        </div>

                        {/* List Area Placeholder */}
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent opacity-50"></div>
                            <div className="w-24 h-24 rounded-[2rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 shadow-inner relative z-10">
                                <ShoppingBag className="w-10 h-10 text-zinc-800" />
                            </div>
                            <h3 className="text-lg font-black text-white mb-3 uppercase italic tracking-widest relative z-10">Listing Masih Kosong</h3>
                            <p className="text-[11px] text-zinc-600 max-w-xs leading-relaxed font-medium italic relative z-10">
                                Semua postingan barang dari pengguna akan muncul di sini untuk Anda tinjau dan moderasi.
                            </p>
                        </div>

                        {/* Summary Footer */}
                        <div className="p-6 bg-zinc-950/50 border-t border-zinc-800/50 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">0 LIVE</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">0 PENDING</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button disabled variant="outline" className="h-9 px-5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-800 border-zinc-800 bg-zinc-900 italic border-dashed">Prev</Button>
                                <Button disabled variant="outline" className="h-9 px-5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-800 border-zinc-800 bg-zinc-900 italic border-dashed">Next</Button>
                            </div>
                        </div>
                    </div>

                    {/* Featured items preview */}
                    <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-zinc-900 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl border border-zinc-800/50">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600 opacity-[0.03] rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="flex items-center gap-6 relative z-10 text-left">
                            <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700 shadow-xl group-hover:border-red-600/50 transition-colors">
                                <Star className="w-8 h-8 text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
                            </div>
                            <div>
                                <h4 className="text-base font-black uppercase tracking-widest italic leading-none mb-2">FEATURED ITEMS CONTROL</h4>
                                <p className="text-[11px] text-zinc-600 font-medium italic">Atur barang mana saja yang mau "dipajang" di halaman depan.</p>
                            </div>
                        </div>
                        <Button className="mt-8 sm:mt-0 bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 rounded-2xl px-10 h-12 text-[10px] font-black uppercase tracking-[0.2em] italic relative z-10 shadow-2xl transition-all border-none">
                            <Plus className="w-4 h-4 mr-2 text-red-600" /> KELOLA PREVIEW
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
