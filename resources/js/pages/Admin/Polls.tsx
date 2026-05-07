import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
    ClipboardList, Plus, Trash2, Play, Pause, BarChart3, CheckCircle2, XCircle, Timer, AlertCircle, Send, Smartphone, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from 'sonner';

interface PollItem {
    id: number; question: string; options: string[]; status: string;
    scheduled_for: string | null; coin_reward: number; votes_count: number;
    vote_distribution: Record<number, number>; created_at: string;
}
interface Props {
    polls: PollItem[];
    pollStats: { total: number; live: number; draft: number; closed: number; total_votes: number; };
}

export default function Polls({ polls = [], pollStats }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [pollToDelete, setPollToDelete] = useState<number | null>(null);
    const [options, setOptions] = useState(['', '']);
    const { data, setData, post, processing, reset } = useForm({ question: '', options: ['', ''], status: 'draft' as string });

    const addOption = () => { if (options.length < 6) { setOptions([...options, '']); } };
    const removeOption = (idx: number) => { if (options.length > 2) { const n = options.filter((_, i) => i !== idx); setOptions(n); } };
    const updateOption = (idx: number, val: string) => { const n = [...options]; n[idx] = val; setOptions(n); };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const filteredOptions = options.filter(o => o.trim() !== '');
        if (filteredOptions.length < 2) { toast.error('Minimal 2 opsi!'); return; }
        data.options = filteredOptions;
        post('/admin/polls', { preserveScroll: true, onSuccess: () => { setIsCreateOpen(false); reset(); setOptions(['', '']); toast.success('Poll created!'); } });
    };

    const handleToggleStatus = (id: number) => router.put(`/admin/polls/${id}/toggle-status`, {}, { preserveScroll: true, onSuccess: () => toast.success('Status updated!') });
    
    const confirmDelete = () => {
        if (pollToDelete) {
            router.delete(`/admin/polls/${pollToDelete}`, { 
                preserveScroll: true, 
                onSuccess: () => {
                    setIsDeleteOpen(false);
                    setPollToDelete(null);
                    toast.success('Poll deleted!');
                } 
            });
        }
    };

    const handleDelete = (id: number) => { 
        setPollToDelete(id);
        setIsDeleteOpen(true);
    };

    const statusColors: Record<string, string> = { draft: 'bg-zinc-800 text-zinc-400 border-zinc-700', live: 'bg-green-600/10 text-green-500 border-green-500/20', closed: 'bg-red-600/10 text-red-500 border-red-500/20' };
    const statusLabels: Record<string, string> = { draft: 'DRAFT', live: 'LIVE', closed: 'CLOSED' };

    return (
        <div className="space-y-6 text-left">
            <Head title="Daily Polls Configurator" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">DAILY POLLS CONFIGURATOR</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Buat, kelola, dan pantau polling harian komunitas.</p>
                </div>
                <Button onClick={() => setIsCreateOpen(true)} className="rounded-xl h-11 text-xs font-black uppercase tracking-widest bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 px-6 italic transition-all self-start sm:self-auto">
                    <Plus className="w-4 h-4 mr-2 text-red-600" /> Buat Polling
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                    { label: 'Total', value: pollStats.total, color: 'text-white' },
                    { label: 'Live', value: pollStats.live, color: 'text-green-500' },
                    { label: 'Draft', value: pollStats.draft, color: 'text-zinc-400' },
                    { label: 'Closed', value: pollStats.closed, color: 'text-red-500' },
                    { label: 'Total Votes', value: pollStats.total_votes, color: 'text-yellow-500' },
                ].map((s, i) => (
                    <div key={i} className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50">
                        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic mb-1">{s.label}</p>
                        <p className={`text-2xl font-black italic tracking-tighter ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Polls List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {polls.length > 0 ? polls.map(poll => {
                    const totalVotes = poll.votes_count || 0;
                    return (
                        <div key={poll.id} className="bg-zinc-900/40 rounded-[2rem] border border-zinc-800/50 shadow-sm overflow-hidden group hover:bg-zinc-900/60 transition-all">
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <span className={`px-2.5 py-1 text-[9px] font-black rounded-lg border italic uppercase tracking-widest ${statusColors[poll.status]}`}>
                                        {statusLabels[poll.status]}
                                    </span>
                                    <div className="flex gap-1.5">
                                        <button onClick={() => handleToggleStatus(poll.id)} className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-white border border-zinc-700 transition-all" title="Toggle Status">
                                            {poll.status === 'live' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                        </button>
                                        <button onClick={() => handleDelete(poll.id)} className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-red-500 border border-zinc-700 transition-all" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>

                                {/* Question */}
                                <h3 className="text-sm font-black text-white mb-5 leading-relaxed italic">{poll.question}</h3>

                                {/* Options with vote bars */}
                                <div className="space-y-3">
                                    {poll.options.map((option, idx) => {
                                        const count = poll.vote_distribution?.[idx] || 0;
                                        const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                                        return (
                                            <div key={idx} className="relative overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-950/50 group/opt">
                                                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent transition-all duration-700" style={{ width: `${pct}%` }} />
                                                <div className="relative z-10 flex items-center justify-between px-4 py-3">
                                                    <span className="text-[11px] font-bold text-zinc-300 italic">{option}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black text-zinc-500 italic">{count} votes</span>
                                                        <span className="text-[10px] font-black text-red-500 italic">{pct}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800/50">
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">{totalVotes} total votes</span>
                                    <span className="text-[9px] text-zinc-700 italic font-bold">{new Date(poll.created_at).toLocaleDateString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="lg:col-span-2 bg-zinc-900/20 p-20 rounded-[3rem] border border-zinc-800 text-center border-dashed">
                        <ClipboardList className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                        <h4 className="text-base font-black text-zinc-600 uppercase tracking-widest italic">Belum Ada Polling</h4>
                        <p className="text-[11px] text-zinc-700 mt-3 italic font-bold">Buat polling pertama Anda dengan tombol di atas.</p>
                    </div>
                )}
            </div>

            {/* Create Poll Modal */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[500px] p-0 overflow-hidden rounded-[2rem]">
                    <div className="p-8">
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-lg font-black italic tracking-widest uppercase flex items-center gap-2"><ClipboardList className="w-5 h-5 text-red-600" /> BUAT POLLING BARU</DialogTitle>
                            <DialogDescription className="text-zinc-500 text-[11px] italic font-black">Tambahkan pertanyaan dan minimal 2 opsi jawaban.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Pertanyaan</label>
                                <Input value={data.question} onChange={e => setData('question', e.target.value)} placeholder="Contoh: Kantin mana yang paling enak?" className="bg-zinc-900 border-zinc-800 text-white h-12 rounded-xl text-[11px] italic" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Opsi Jawaban</label>
                                {options.map((opt, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <Input value={opt} onChange={e => updateOption(idx, e.target.value)} placeholder={`Opsi ${idx + 1}`} className="bg-zinc-900 border-zinc-800 text-white h-10 rounded-xl text-[11px] italic flex-1" />
                                        {options.length > 2 && <button type="button" onClick={() => removeOption(idx)} className="p-2 text-red-600 hover:bg-red-600/10 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>}
                                    </div>
                                ))}
                                {options.length < 6 && <button type="button" onClick={addOption} className="w-full py-2.5 border border-dashed border-zinc-800 rounded-xl text-[10px] font-black text-zinc-600 hover:text-white hover:border-zinc-700 transition-all italic uppercase tracking-widest">+ Tambah Opsi</button>}
                            </div>
                            <div className="flex gap-3">
                                <Button type="submit" onClick={() => setData('status', 'draft')} disabled={processing || !data.question.trim()} className="flex-1 h-12 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest italic">Simpan Draft</Button>
                                <Button type="submit" onClick={() => setData('status', 'live')} disabled={processing || !data.question.trim()} className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic">Go Live</Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-900 text-white sm:max-w-[400px] p-0 overflow-hidden rounded-[2rem]">
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-red-600/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 border border-red-600/20">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-black italic tracking-widest uppercase mb-2">HAPUS POLLING?</h3>
                        <p className="text-zinc-500 text-[11px] italic font-black mb-8 leading-relaxed">Tindakan ini tidak bisa dibatalkan. Semua data voting akan hilang secara permanen.</p>
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
