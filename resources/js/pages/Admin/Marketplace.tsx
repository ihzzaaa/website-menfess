import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { ShoppingBag, Tag, Star, Trash2, Edit, Plus, CheckCircle2, XCircle, AlertCircle, Eye, EyeOff, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from 'sonner';

interface CategoryItem { id: number; name: string; slug: string; icon: string|null; description: string|null; is_active: boolean; marketplace_items_count: number; }
interface MarketItem { id: number; user: { name: string; email: string }; category?: CategoryItem|null; title: string; description: string; price: string; image_path: string|null; status: string; is_featured: boolean; featured_until: string|null; created_at: string; updated_at: string; }
interface Props { pendingItems: MarketItem[]; approvedItems: MarketItem[]; rejectedItems: MarketItem[]; featuredItems: MarketItem[]; categories: CategoryItem[]; totalItems: number; approvedCount: number; rejectedCount: number; featuredCount: number; }

export default function Marketplace({ pendingItems=[], approvedItems=[], rejectedItems=[], featuredItems=[], categories=[], totalItems=0, approvedCount=0, rejectedCount=0, featuredCount=0 }: Props) {
    const [tab, setTab] = useState('pending');
    const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
    const [isCatOpen, setIsCatOpen] = useState(false);
    const [isFeatOpen, setIsFeatOpen] = useState(false);
    const [editCat, setEditCat] = useState<CategoryItem|null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [catToDelete, setCatToDelete] = useState<number|null>(null);
    const { data, setData, post, put, processing, reset } = useForm({ name: '', icon: '', description: '' });

    const handleApprove = (id: number) => router.put(`/admin/marketplace/${id}/approve`, {}, { preserveScroll: true, onSuccess: () => toast.success('Iklan disetujui!') });
    const handleReject = (id: number) => router.put(`/admin/marketplace/${id}/reject`, {}, { preserveScroll: true, onSuccess: () => toast.success('Iklan ditolak!') });
    const handleToggleFeatured = (id: number) => router.put(`/admin/marketplace/${id}/toggle-featured`, {}, { preserveScroll: true, onSuccess: () => toast.success('Featured updated!') });

    const handleSaveCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (editCat) { put(`/admin/marketplace/categories/${editCat.id}`, { preserveScroll: true, onSuccess: () => { setEditCat(null); reset(); toast.success('Kategori diperbarui!'); } }); }
        else { post('/admin/marketplace/categories', { preserveScroll: true, onSuccess: () => { reset(); toast.success('Kategori ditambahkan!'); } }); }
    };
    const openEditCat = (cat: CategoryItem) => { setEditCat(cat); setData({ name: cat.name, icon: cat.icon||'', description: cat.description||'' }); setIsCatOpen(true); };
    const openNewCat = () => { setEditCat(null); reset(); setIsCatOpen(true); };
    const confirmDeleteCat = () => { if(catToDelete) router.delete(`/admin/marketplace/categories/${catToDelete}`, { preserveScroll:true, onSuccess:()=>{ setIsDeleteOpen(false); setCatToDelete(null); toast.success('Kategori dihapus!'); } }); };
    const handleToggleCatStatus = (id: number) => router.put(`/admin/marketplace/categories/${id}/toggle`, {}, { preserveScroll:true, onSuccess:()=>toast.success('Status kategori diperbarui!') });

    const tabs = [
        { key:'pending', label:'Pending', count:pendingItems.length, color:'text-yellow-500' },
        { key:'approved', label:'Approved', count:approvedCount, color:'text-green-500' },
        { key:'rejected', label:'Rejected', count:rejectedCount, color:'text-red-500' },
    ];
    let currentItems = tab==='pending' ? pendingItems : tab==='approved' ? approvedItems : rejectedItems;
    if (selectedCatId) {
        currentItems = currentItems.filter(item => item.category?.id === selectedCatId);
    }

    const renderItem = (item: MarketItem) => (
        <div key={item.id} className={`bg-zinc-950/50 p-5 rounded-3xl border border-zinc-800 flex flex-col sm:flex-row gap-5 group hover:border-zinc-700 transition-all ${item.status==='rejected'?'opacity-60':''}`}>
            <div className="w-full sm:w-44 h-44 sm:h-28 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {item.image_path ? <img src={`/storage/${item.image_path}`} alt="" className="w-full h-full object-cover" /> : <Package className="w-8 h-8 text-zinc-800" />}
            </div>
            <div className="flex-1 flex flex-col justify-between text-left min-w-0">
                <div>
                    <div className="flex justify-between items-start mb-1.5 gap-2">
                        <h4 className="text-base font-black text-white italic tracking-wide truncate">{item.title}</h4>
                        <span className="text-red-500 font-black text-sm italic whitespace-nowrap">Rp {Number(item.price).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center"><span className="text-[8px] text-zinc-500 font-bold uppercase">{item.user.name[0]}</span></div>
                            <p className="text-[10px] text-zinc-500 font-bold italic">by <span className="text-zinc-300">{item.user.name}</span></p>
                        </div>
                        {item.category && <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[9px] font-black rounded-lg border border-zinc-700 italic">{item.category.icon||'📦'} {item.category.name}</span>}
                        {item.is_featured && <span className="px-2 py-0.5 bg-red-600/10 text-red-500 text-[9px] font-black rounded-lg border border-red-500/20 italic">⭐ FEATURED</span>}
                        <span className={`px-2 py-0.5 text-[9px] font-black rounded-lg border italic uppercase ${item.status==='approved'?'bg-green-600/10 text-green-500 border-green-500/20':item.status==='rejected'?'bg-red-600/10 text-red-500 border-red-500/20':'bg-yellow-600/10 text-yellow-500 border-yellow-500/20'}`}>{item.status}</span>
                    </div>
                    <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50"><p className="text-xs text-zinc-400 font-medium italic leading-relaxed line-clamp-2">{item.description}</p></div>
                </div>
                <div className="flex items-center justify-between mt-3">
                    <span className="text-[9px] text-zinc-700 italic font-bold">{new Date(item.updated_at||item.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</span>
                    {item.status==='pending' && (
                        <div className="flex gap-2">
                            <Button onClick={()=>handleReject(item.id)} variant="outline" className="h-9 px-4 rounded-xl border-red-900/30 bg-zinc-900 hover:bg-red-950/30 text-red-500 italic font-black uppercase text-[9px] tracking-widest"><XCircle className="w-3 h-3 mr-1.5" />Tolak</Button>
                            <Button onClick={()=>handleApprove(item.id)} className="h-9 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white italic font-black uppercase text-[9px] tracking-widest border-none"><CheckCircle2 className="w-3 h-3 mr-1.5" />Terima</Button>
                        </div>
                    )}
                    {item.status==='approved' && (
                        <Button onClick={()=>handleToggleFeatured(item.id)} variant="outline" className={`h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest italic ${item.is_featured?'bg-red-600/20 border-red-600/50 text-red-500':'bg-zinc-900 border-zinc-800 text-zinc-600 hover:text-white'}`}>
                            <Star className={`w-3 h-3 mr-1.5 ${item.is_featured?'fill-red-500':''}`} />{item.is_featured?'Unfeatured':'Featured'}
                        </Button>
                    )}
                    {item.status==='rejected' && (
                        <Button onClick={()=>handleApprove(item.id)} variant="outline" className="h-9 px-4 rounded-xl bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-green-500 hover:border-green-500/30 italic font-black uppercase text-[9px] tracking-widest"><CheckCircle2 className="w-3 h-3 mr-1.5" />Restore</Button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 text-left">
            <Head title="Marketplace Oversight" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div><h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">MARKETPLACE OVERSIGHT</h2><p className="text-xs sm:text-sm text-zinc-500 mt-1">Meninjau postingan jualan, kelola kategori, dan produk unggulan.</p></div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button onClick={openNewCat} variant="outline" className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white italic border-dashed"><Tag className="w-4 h-4 mr-2" />Categories</Button>
                    <Button onClick={()=>setIsFeatOpen(true)} className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 px-6 italic"><Plus className="w-4 h-4 mr-2 text-red-600" />Featured Item</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-zinc-800/50">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 italic">TOTAL LISTING</p>
                        <h4 className="text-3xl font-black text-white italic tracking-tighter">{totalItems}</h4>
                        <div className="mt-4 pt-4 border-t border-zinc-800/50 space-y-3">
                            <div className="flex justify-between"><span className="text-[10px] font-black text-zinc-500 uppercase italic">Approved</span><span className="text-xs font-black text-green-500 italic">{approvedCount}</span></div>
                            <div className="flex justify-between"><span className="text-[10px] font-black text-zinc-500 uppercase italic">Pending</span><span className="text-xs font-black text-yellow-500 italic">{pendingItems.length}</span></div>
                            <div className="flex justify-between"><span className="text-[10px] font-black text-zinc-500 uppercase italic">Rejected</span><span className="text-xs font-black text-red-500 italic">{rejectedCount}</span></div>
                            <div className="flex justify-between"><span className="text-[10px] font-black text-zinc-500 uppercase italic">Featured</span><span className="text-xs font-black text-red-400 italic">{featuredCount}</span></div>
                        </div>
                    </div>
                    <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-zinc-800/50">
                        <div className="flex items-center justify-between mb-5"><h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Kategori</h4><Button onClick={openNewCat} variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:bg-red-600/10 rounded-xl"><Plus className="w-4 h-4" /></Button></div>
                        <div className="space-y-2 max-h-[280px] overflow-y-auto custom-scrollbar">
                            {categories.map(cat=>(
                                <div key={cat.id} onClick={() => setSelectedCatId(selectedCatId === cat.id ? null : cat.id)} className={`cursor-pointer flex items-center justify-between p-3 rounded-[1.2rem] group/c border transition-all ${!cat.is_active?'opacity-40':''} ${selectedCatId === cat.id ? 'bg-red-950/10 border-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.15)]' : 'bg-zinc-950/50 border-zinc-800/50 hover:border-red-600/30'}`}>
                                    <div className="flex items-center gap-2 min-w-0"><span className="text-sm">{cat.icon||'📦'}</span><div className="min-w-0"><span className={`text-[10px] font-bold truncate italic uppercase block transition-colors ${selectedCatId === cat.id ? 'text-red-400' : 'text-zinc-400 group-hover/c:text-white'}`}>{cat.name}</span><span className="text-[9px] text-zinc-700 font-bold italic">{cat.marketplace_items_count} items</span></div></div>
                                    <div className="flex opacity-0 group-hover/c:opacity-100 transition-opacity gap-1">
                                        <button onClick={()=>handleToggleCatStatus(cat.id)} className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-white rounded-lg">{cat.is_active?<EyeOff className="w-3 h-3"/>:<Eye className="w-3 h-3"/>}</button>
                                        <button onClick={()=>openEditCat(cat)} className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-white rounded-lg"><Edit className="w-3 h-3"/></button>
                                        <button onClick={()=>{setCatToDelete(cat.id);setIsDeleteOpen(true);}} className="p-1.5 hover:bg-red-950 text-red-500 rounded-lg"><Trash2 className="w-3 h-3"/></button>
                                    </div>
                                </div>
                            ))}
                            {categories.length===0 && <p className="text-[11px] text-zinc-700 italic text-center py-6">Belum ada kategori.</p>}
                        </div>
                    </div>
                </div>

                {/* Main */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 overflow-hidden flex flex-col">
                        {/* Tabs */}
                        <div className="p-4 border-b border-zinc-800/50 bg-zinc-950/20 flex items-center gap-2 flex-wrap">
                            {tabs.map(t=>(
                                <button key={t.key} onClick={()=>setTab(t.key)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all border ${tab===t.key?'bg-red-600/20 border-red-600/50 text-red-500':'bg-zinc-900 border-zinc-800 text-zinc-600 hover:text-zinc-400'}`}>
                                    {t.label} <span className={`ml-1.5 ${t.color}`}>{t.count}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 max-h-[600px] overflow-y-auto custom-scrollbar p-6 space-y-4">
                            {currentItems.length===0?(
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="w-20 h-20 rounded-[2rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6"><ShoppingBag className="w-8 h-8 text-zinc-800"/></div>
                                    <h3 className="text-sm font-black text-white uppercase italic tracking-widest mb-2">Tidak Ada Data</h3>
                                    <p className="text-[11px] text-zinc-600 italic font-medium">Belum ada item dengan status {tab} {selectedCatId ? 'untuk kategori ini' : ''}.</p>
                                </div>
                            ):currentItems.map(renderItem)}
                        </div>
                        <div className="p-4 bg-zinc-950/50 border-t border-zinc-800/50 flex items-center gap-6">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-[10px] font-black text-zinc-600 uppercase italic">{approvedCount} Approved</span></div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div><span className="text-[10px] font-black text-zinc-600 uppercase italic">{pendingItems.length} Pending</span></div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="text-[10px] font-black text-zinc-600 uppercase italic">{rejectedCount} Rejected</span></div>
                        </div>
                    </div>

                    {/* Featured Banner */}
                    <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-zinc-900 rounded-[2.5rem] text-white relative overflow-hidden group border border-zinc-800/50">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600 opacity-[0.03] rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="flex items-center gap-6 relative z-10 text-left">
                            <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:border-red-600/50 transition-colors"><Star className="w-8 h-8 text-red-600"/></div>
                            <div><h4 className="text-base font-black uppercase tracking-widest italic leading-none mb-2">FEATURED ITEMS ({featuredItems.length})</h4><p className="text-[11px] text-zinc-600 font-medium italic">Atur barang yang dipajang di halaman depan.</p></div>
                        </div>
                        <Button onClick={()=>setIsFeatOpen(true)} className="mt-6 sm:mt-0 bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 rounded-2xl px-10 h-12 text-[10px] font-black uppercase tracking-[0.2em] italic relative z-10"><Plus className="w-4 h-4 mr-2 text-red-600"/>KELOLA PREVIEW</Button>
                    </div>
                </div>
            </div>

            {/* Categories Modal */}
            <Dialog open={isCatOpen} onOpenChange={(v)=>{setIsCatOpen(v);if(!v){setEditCat(null);reset();}}}>
                <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[500px] p-0 overflow-hidden rounded-[2rem]">
                    <div className="p-8">
                        <DialogHeader className="mb-6"><DialogTitle className="text-lg font-black italic tracking-widest uppercase flex items-center gap-2"><Tag className="w-5 h-5 text-red-600"/>{editCat?'EDIT KATEGORI':'TAMBAH KATEGORI'}</DialogTitle><DialogDescription className="text-zinc-500 text-[11px] italic font-black">Kategori untuk mengelompokkan produk marketplace.</DialogDescription></DialogHeader>
                        <form onSubmit={handleSaveCategory} className="space-y-5">
                            <div className="space-y-2"><label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Nama</label><Input value={data.name} onChange={e=>setData('name',e.target.value)} placeholder="Contoh: Pakaian & Fashion" className="bg-zinc-900 border-zinc-800 text-white h-12 rounded-xl text-[11px] italic"/></div>
                            <div className="space-y-2"><label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Icon (Emoji)</label><Input value={data.icon} onChange={e=>setData('icon',e.target.value)} placeholder="👕" className="bg-zinc-900 border-zinc-800 text-white h-12 rounded-xl text-[11px] italic"/></div>
                            <div className="space-y-2"><label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Deskripsi</label><Input value={data.description} onChange={e=>setData('description',e.target.value)} placeholder="Deskripsi singkat..." className="bg-zinc-900 border-zinc-800 text-white h-12 rounded-xl text-[11px] italic"/></div>
                            <div className="flex gap-3 pt-2">
                                <Button type="button" onClick={()=>{setIsCatOpen(false);setEditCat(null);reset();}} className="flex-1 h-12 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest italic">Batal</Button>
                                <Button type="submit" disabled={processing||!data.name.trim()} className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-red-600/20">{editCat?'Update':'Simpan'}</Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Featured Modal */}
            <Dialog open={isFeatOpen} onOpenChange={setIsFeatOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[600px] p-0 overflow-hidden rounded-[2rem]">
                    <div className="p-8">
                        <DialogHeader className="mb-6"><DialogTitle className="text-lg font-black italic tracking-widest uppercase flex items-center gap-2"><Star className="w-5 h-5 text-red-600"/>FEATURED ITEMS CONTROL</DialogTitle><DialogDescription className="text-zinc-500 text-[11px] italic font-black">Pilih produk yang akan ditampilkan di halaman depan selama 7 hari.</DialogDescription></DialogHeader>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                            {approvedItems.length>0?approvedItems.map(item=>(
                                <div key={item.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${item.is_featured?'bg-red-600/5 border-red-600/30':'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700'}`}>
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex-shrink-0 flex items-center justify-center">{item.image_path?<img src={`/storage/${item.image_path}`} className="w-full h-full object-cover rounded-xl"/>:<Package className="w-5 h-5 text-zinc-600"/>}</div>
                                        <div className="min-w-0"><p className="text-[11px] font-black text-white italic truncate">{item.title}</p><p className="text-[9px] text-zinc-600 font-bold italic">Rp {Number(item.price).toLocaleString('id-ID')} · {item.user.name}</p></div>
                                    </div>
                                    <Button onClick={()=>handleToggleFeatured(item.id)} variant="outline" className={`h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest italic ${item.is_featured?'bg-red-600/20 border-red-600/50 text-red-500':'bg-zinc-900 border-zinc-800 text-zinc-600 hover:text-white'}`}><Star className={`w-3 h-3 mr-1.5 ${item.is_featured?'fill-red-500':''}`}/>{item.is_featured?'Featured':'Set Featured'}</Button>
                                </div>
                            )):<div className="text-center py-12"><Package className="w-12 h-12 text-zinc-800 mx-auto mb-4"/><p className="text-[11px] text-zinc-700 italic font-bold">Belum ada produk approved.</p></div>}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Category */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[400px] p-0 overflow-hidden rounded-[2rem]">
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-red-600/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 border border-red-600/20"><Trash2 className="w-8 h-8 text-red-600"/></div>
                        <h3 className="text-lg font-black italic tracking-widest uppercase mb-2">HAPUS KATEGORI?</h3>
                        <p className="text-zinc-500 text-[11px] italic font-black mb-8">Semua produk dalam kategori ini akan menjadi tanpa kategori.</p>
                        <div className="flex gap-3">
                            <Button onClick={()=>setIsDeleteOpen(false)} className="flex-1 h-12 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest italic">Batal</Button>
                            <Button onClick={confirmDeleteCat} className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-red-600/20">Ya, Hapus</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
