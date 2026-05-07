import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { 
    MessageSquare, 
    Eye, 
    EyeOff, 
    Pin, 
    PinOff,
    Trash2, 
    Search,
    AlertTriangle,
    ThumbsUp,
    ThumbsDown,
    Filter,
    ShoppingBag,
    MessageCircle,
    TrendingUp,
    Shield,
    Tag,
    Plus,
    Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "@/components/ui/dialog";
import { toast } from 'sonner';

interface MenfessUser {
    id: number;
    name: string;
    email: string;
    is_shadow_banned: boolean;
}

interface MenfessCategory {
    id: number;
    name: string;
    slug: string;
    color_theme: string;
    is_active: boolean;
}

interface MenfessPostItem {
    id: number;
    user_id: number;
    content: string;
    alias_name: string | null;
    is_visible: boolean;
    is_pinned: boolean;
    pinned_until: string | null;
    report_count: number;
    upvote_count: number;
    downvote_count: number;
    is_wtb: boolean;
    created_at: string;
    user?: MenfessUser;
    category?: MenfessCategory | null;
    comments_count: number;
}

interface PaginatedPosts {
    data: MenfessPostItem[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

interface Props {
    posts: PaginatedPosts;
    stats: {
        total: number;
        reported: number;
        pinned: number;
        hidden: number;
        wtb: number;
    };
    categories: MenfessCategory[];
    filters: {
        filter: string;
        search: string;
        category_id: string;
    };
}

export default function MenfessManagement({ posts, stats, categories = [], filters }: Props) {
    const [search, setSearch] = useState(filters.search);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);

    // Category State
    const [isCatOpen, setIsCatOpen] = useState(false);
    const [isCatDeleteOpen, setIsCatDeleteOpen] = useState(false);
    const [catToDeleteId, setCatToDeleteId] = useState<number | null>(null);
    const [editCat, setEditCat] = useState<MenfessCategory | null>(null);
    const [catName, setCatName] = useState('');
    const [catColor, setCatColor] = useState('zinc');
    const [processingCat, setProcessingCat] = useState(false);

    const handleFilter = (filter: string) => {
        router.get('/admin/menfess', { filter, search: filters.search, category_id: filters.category_id }, { preserveState: true, preserveScroll: true });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/menfess', { filter: filters.filter, search, category_id: filters.category_id }, { preserveState: true, preserveScroll: true });
    };

    const handleCategoryFilter = (categoryId: string) => {
        router.get('/admin/menfess', { filter: filters.filter, search: filters.search, category_id: categoryId }, { preserveState: true, preserveScroll: true });
    };

    const openNewCat = () => {
        setEditCat(null);
        setCatName('');
        setCatColor('zinc');
        setIsCatOpen(true);
    };

    const openEditCat = (cat: MenfessCategory) => {
        setEditCat(cat);
        setCatName(cat.name);
        setCatColor(cat.color_theme);
        setIsCatOpen(true);
    };

    const saveCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!catName.trim()) return;
        setProcessingCat(true);

        if (editCat) {
            router.put(`/admin/menfess/categories/${editCat.id}`, { name: catName, color_theme: catColor }, {
                preserveScroll: true,
                onSuccess: () => { setIsCatOpen(false); toast.success('Kategori diperbarui!'); },
                onFinish: () => setProcessingCat(false)
            });
        } else {
            router.post('/admin/menfess/categories', { name: catName, color_theme: catColor }, {
                preserveScroll: true,
                onSuccess: () => { setCatName(''); setCatColor('zinc'); toast.success('Kategori ditambahkan!'); },
                onFinish: () => setProcessingCat(false)
            });
        }
    };

    const deleteCategory = (id: number) => {
        setCatToDeleteId(id);
        setIsCatDeleteOpen(true);
    };

    const confirmDeleteCategory = () => {
        if (catToDeleteId) {
            router.delete(`/admin/menfess/categories/${catToDeleteId}`, { 
                preserveScroll: true, 
                onSuccess: () => {
                    setIsCatDeleteOpen(false);
                    setCatToDeleteId(null);
                    toast.success('Kategori dihapus!');
                }
            });
        }
    };

    const toggleCategory = (id: number) => {
        router.put(`/admin/menfess/categories/${id}/toggle`, {}, { preserveScroll: true, onSuccess: () => toast.success('Status kategori diubah!') });
    };

    const handleToggleVisibility = (id: number) => {
        router.put(`/admin/menfess/${id}/toggle-visibility`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Visibility toggled!'),
        });
    };

    const handleTogglePin = (id: number) => {
        router.put(`/admin/menfess/${id}/toggle-pin`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Pin status updated!'),
        });
    };

    const confirmDelete = () => {
        if (postToDelete) {
            router.delete(`/admin/menfess/${postToDelete}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsDeleteOpen(false);
                    setPostToDelete(null);
                    toast.success('Menfess deleted!');
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        setPostToDelete(id);
        setIsDeleteOpen(true);
    };

    const filterTabs = [
        { key: 'all', label: 'Semua', count: stats.total },
        { key: 'reported', label: 'Dilaporkan', count: stats.reported },
        { key: 'pinned', label: 'Pinned', count: stats.pinned },
        { key: 'hidden', label: 'Hidden', count: stats.hidden },
        { key: 'wtb', label: 'WTB', count: stats.wtb },
    ];

    return (
        <div className="space-y-6 text-left">
            <Head title="Menfess Management" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">MENFESS MANAGEMENT</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Kelola semua curhatan anonim, takedown, pin, dan monitor laporan.</p>
                </div>
                <Button onClick={openNewCat} variant="outline" className="rounded-xl h-9 sm:h-11 text-[10px] sm:text-xs font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white italic border-dashed shrink-0">
                    <Tag className="w-4 h-4 mr-2" /> Kategori
                </Button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                    { label: 'Total', value: stats.total, icon: MessageSquare, color: 'text-white' },
                    { label: 'Dilaporkan', value: stats.reported, icon: AlertTriangle, color: 'text-red-500' },
                    { label: 'Pinned', value: stats.pinned, icon: Pin, color: 'text-yellow-500' },
                    { label: 'Hidden', value: stats.hidden, icon: EyeOff, color: 'text-zinc-500' },
                    { label: 'WTB', value: stats.wtb, icon: ShoppingBag, color: 'text-blue-500' },
                ].map((s, i) => (
                    <div key={i} className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50 group hover:bg-zinc-900/60 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <s.icon className={`w-4 h-4 ${s.color}`} />
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">{s.label}</span>
                        </div>
                        <p className="text-2xl font-black text-white italic tracking-tighter">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Filter Tabs + Search */}
            <div className="bg-zinc-900/40 rounded-[2rem] border border-zinc-800/50 overflow-hidden">
                <div className="p-4 border-b border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/20">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {filterTabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => handleFilter(tab.key)}
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all border ${
                                    filters.filter === tab.key 
                                    ? 'bg-red-600/20 border-red-600/50 text-red-500' 
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:text-zinc-400'
                                }`}
                            >
                                {tab.label} <span className="ml-1 opacity-60">{tab.count}</span>
                            </button>
                        ))}
                        <select
                            value={filters.category_id}
                            onChange={(e) => handleCategoryFilter(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] rounded-xl px-3 py-1.5 h-[34px] focus:ring-1 focus:ring-red-600/50 font-black uppercase tracking-widest italic"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari menfess..."
                            className="w-full pl-11 pr-5 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-[11px] focus:ring-1 focus:ring-red-600/30 text-white placeholder:text-zinc-700 italic font-medium"
                        />
                    </form>
                </div>

                {/* Posts List */}
                <div className="divide-y divide-zinc-800/50 max-h-[700px] overflow-y-auto custom-scrollbar">
                    {posts.data.length > 0 ? (
                        posts.data.map((post) => (
                            <div key={post.id} className={`p-5 hover:bg-zinc-900/30 transition-all group ${!post.is_visible ? 'opacity-50' : ''}`}>
                                <div className="flex gap-4">
                                    {/* Content Area */}
                                    <div className="flex-1 min-w-0 text-left">
                                        {/* Status Badges */}
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {post.is_pinned && (
                                                <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[9px] font-black rounded-lg border border-yellow-500/20 italic uppercase tracking-wider">📌 PINNED</span>
                                            )}
                                            {!post.is_visible && (
                                                <span className="px-2 py-0.5 bg-zinc-800 text-zinc-500 text-[9px] font-black rounded-lg border border-zinc-700 italic uppercase tracking-wider">HIDDEN</span>
                                            )}
                                            {post.report_count > 0 && (
                                                <span className="px-2 py-0.5 bg-red-600/10 text-red-500 text-[9px] font-black rounded-lg border border-red-500/20 italic uppercase tracking-wider">⚠ {post.report_count} REPORTS</span>
                                            )}
                                            {post.is_wtb && (
                                                <span className="px-2 py-0.5 bg-blue-600/10 text-blue-400 text-[9px] font-black rounded-lg border border-blue-500/20 italic uppercase tracking-wider">🛒 WTB</span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <p className="text-sm text-zinc-300 leading-relaxed mb-3 line-clamp-3 font-medium">{post.content}</p>

                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-[10px] text-zinc-600 font-black uppercase tracking-wider italic flex-wrap">
                                            <span className="flex items-center gap-1">
                                                <Shield className="w-3 h-3" />
                                                {post.alias_name || 'Anonymous'}
                                            </span>
                                            {post.category && (
                                                <span className={`px-2 py-0.5 rounded border italic text-[9px]
                                                    ${post.category.color_theme === 'zinc' ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : ''}
                                                    ${post.category.color_theme === 'blue' ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' : ''}
                                                    ${post.category.color_theme === 'red' ? 'bg-red-900/30 text-red-400 border-red-500/30' : ''}
                                                    ${post.category.color_theme === 'emerald' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30' : ''}
                                                    ${post.category.color_theme === 'orange' ? 'bg-orange-900/30 text-orange-400 border-orange-500/30' : ''}
                                                    ${post.category.color_theme === 'violet' ? 'bg-violet-900/30 text-violet-400 border-violet-500/30' : ''}
                                                `}>
                                                    {post.category.name}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <ThumbsUp className="w-3 h-3 text-green-600" /> {post.upvote_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <ThumbsDown className="w-3 h-3 text-red-600" /> {post.downvote_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageCircle className="w-3 h-3" /> {post.comments_count}
                                            </span>
                                            <span>{new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                                        <button
                                            onClick={() => handleToggleVisibility(post.id)}
                                            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all border border-zinc-700/50"
                                            title={post.is_visible ? 'Takedown' : 'Restore'}
                                        >
                                            {post.is_visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => handleTogglePin(post.id)}
                                            className={`p-2 rounded-xl transition-all border border-zinc-700/50 ${post.is_pinned ? 'bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/30' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-yellow-500'}`}
                                            title={post.is_pinned ? 'Unpin' : 'Pin 24h'}
                                        >
                                            {post.is_pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2 rounded-xl bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white transition-all border border-zinc-700/50"
                                            title="Delete permanently"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-16 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-zinc-900 border border-zinc-800 mb-6 shadow-inner">
                                <MessageSquare className="w-8 h-8 text-zinc-800" />
                            </div>
                            <h4 className="text-sm font-black text-white uppercase italic tracking-widest mb-2">Belum Ada Menfess</h4>
                            <p className="text-[11px] text-zinc-600 font-medium italic">Data curhatan anonim dari user akan muncul di sini.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="p-4 bg-zinc-950/50 border-t border-zinc-800/50 flex items-center justify-between">
                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest italic">
                        Page {posts.current_page} of {posts.last_page} ({posts.total} total)
                    </p>
                    <div className="flex gap-2">
                        <Button
                            disabled={posts.current_page <= 1}
                            onClick={() => router.get('/admin/menfess', { ...filters, page: posts.current_page - 1 }, { preserveState: true })}
                            variant="outline"
                            className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-500 border-dashed"
                        >
                            Previous
                        </Button>
                        <Button
                            disabled={posts.current_page >= posts.last_page}
                            onClick={() => router.get('/admin/menfess', { ...filters, page: posts.current_page + 1 }, { preserveState: true })}
                            variant="outline"
                            className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900/50 text-zinc-500 border-dashed"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            {/* Category Management Dialog */}
            <Dialog open={isCatOpen} onOpenChange={(v)=>{setIsCatOpen(v);if(!v)setEditCat(null);}}>
                <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[600px] p-0 overflow-hidden rounded-[2rem]">
                    <div className="p-8">
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-lg font-black italic tracking-widest uppercase flex items-center gap-2">
                                <Tag className="w-5 h-5 text-red-600"/>
                                {editCat ? 'EDIT KATEGORI CHAT' : 'KATEGORI CHAT MENFESS'}
                            </DialogTitle>
                            <DialogDescription className="text-zinc-500 text-[11px] italic font-black">
                                Kelola kategori (Anjem, Kost, dll) yang dapat digunakan oleh user saat posting menfess.
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Form */}
                            <div className="space-y-4">
                                <form onSubmit={saveCategory} className="space-y-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Nama Kategori</label>
                                        <Input 
                                            value={catName} 
                                            onChange={e=>setCatName(e.target.value)} 
                                            placeholder="Contoh: Anjem" 
                                            className="bg-zinc-950 border-zinc-800 text-white h-10 rounded-xl text-[11px] italic"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Warna Badge</label>
                                        <select 
                                            value={catColor}
                                            onChange={e=>setCatColor(e.target.value)}
                                            className="w-full bg-zinc-950 border-zinc-800 text-white h-10 rounded-xl text-[11px] italic px-3"
                                        >
                                            <option value="zinc">Abu-abu (Default)</option>
                                            <option value="blue">Biru</option>
                                            <option value="emerald">Hijau</option>
                                            <option value="orange">Orange</option>
                                            <option value="violet">Ungu</option>
                                            <option value="red">Merah</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        {editCat && (
                                            <Button type="button" onClick={openNewCat} variant="outline" className="flex-1 h-9 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest italic">Batal Edit</Button>
                                        )}
                                        <Button type="submit" disabled={processingCat || !catName.trim()} className="flex-1 h-9 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[9px] font-black uppercase tracking-widest italic shadow-lg shadow-red-600/20">
                                            {editCat ? 'Update' : 'Tambah'}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* List */}
                            <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                {categories.map(cat => (
                                    <div key={cat.id} className={`flex items-center justify-between p-3 bg-zinc-900/80 rounded-xl border border-zinc-800/50 group/c transition-all ${!cat.is_active ? 'opacity-50' : ''}`}>
                                        <div className="min-w-0 flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full flex-shrink-0 bg-${cat.color_theme}-500`}></div>
                                            <span className="text-[11px] font-bold text-white truncate italic uppercase">{cat.name}</span>
                                        </div>
                                        <div className="flex opacity-0 group-hover/c:opacity-100 transition-opacity gap-1">
                                            <button onClick={()=>toggleCategory(cat.id)} className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-white rounded-lg">
                                                {cat.is_active ? <EyeOff className="w-3 h-3"/> : <Eye className="w-3 h-3"/>}
                                            </button>
                                            <button onClick={()=>openEditCat(cat)} className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-white rounded-lg">
                                                <Edit className="w-3 h-3"/>
                                            </button>
                                            <button onClick={()=>deleteCategory(cat.id)} className="p-1.5 hover:bg-red-950 text-red-500 rounded-lg">
                                                <Trash2 className="w-3 h-3"/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {categories.length === 0 && (
                                    <div className="text-center py-8 text-zinc-600 italic text-[11px] font-medium border border-zinc-800/50 border-dashed rounded-xl">Belum ada kategori.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Category Delete Confirmation Modal */}
            <Dialog open={isCatDeleteOpen} onOpenChange={setIsCatDeleteOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[400px] p-0 overflow-hidden rounded-[2rem]">
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-red-600/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 border border-red-600/20">
                            <Trash2 className="w-8 h-8 text-red-600"/>
                        </div>
                        <h3 className="text-lg font-black italic tracking-widest uppercase mb-2">HAPUS KATEGORI?</h3>
                        <p className="text-zinc-500 text-[11px] italic font-black mb-8">
                            Menfess yang menggunakan kategori ini tidak akan dihapus, hanya kategorinya saja yang akan dikosongkan.
                        </p>
                        <div className="flex gap-3">
                            <Button 
                                onClick={() => setIsCatDeleteOpen(false)} 
                                className="flex-1 h-12 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest italic"
                            >
                                Batal
                            </Button>
                            <Button 
                                onClick={confirmDeleteCategory} 
                                className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-red-600/20"
                            >
                                Ya, Hapus
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[400px] p-0 overflow-hidden rounded-[2rem]">
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-red-600/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 border border-red-600/20">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-black italic tracking-widest uppercase mb-2">HAPUS MENFESS?</h3>
                        <p className="text-zinc-500 text-[11px] italic font-black mb-8 leading-relaxed">Apakah Anda yakin ingin menghapus menfess ini secara permanen? Tindakan ini tidak bisa dibatalkan.</p>
                        <div className="flex gap-3">
                            <Button onClick={() => setIsDeleteOpen(false)} className="flex-1 h-12 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest italic">Batal</Button>
                            <Button onClick={confirmDelete} className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-red-600/20">Ya, Hapus</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
