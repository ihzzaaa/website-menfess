import { Head, useForm, usePage } from '@inertiajs/react';
import { 
    User, 
    Mail, 
    Lock, 
    ShieldCheck, 
    Save, 
    AlertCircle,
    CheckCircle2,
    KeyRound,
    Camera,
    Trash2,
    Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';

interface Admin {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    avatar_url: string | null;
}


interface ProfileProps {
    admin: Admin;
    status?: string;
}

export default function Profile({ admin, status }: ProfileProps) {
    const fileInput = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(admin.avatar_url);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: admin.name,
        email: admin.email,
        password: '',
        password_confirmation: '',
        avatar: null as File | null,
        _method: 'PATCH', // Spoofing for multipart/form-data
    });

    useEffect(() => {
        if (status) {
            toast.success(status);
            reset('password', 'password_confirmation');
        }
    }, [status]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/profile', {
            preserveScroll: true,
            onSuccess: () => reset('password', 'password_confirmation')
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('avatar', file);
            setPreview(URL.createObjectURL(file));
        }
    };


    return (
        <div className="space-y-6 text-left">
            <Head title="Admin Profile" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight italic tracking-widest uppercase">PROFIL ADMIN</h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Kelola identitas dan keamanan akun administrator Anda.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Information Form */}
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Information Section */}
                        <div className="bg-zinc-900/40 p-6 sm:p-10 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                                <User className="w-48 h-48 text-white" />
                            </div>
                            
                            <h3 className="text-sm font-black text-white mb-10 flex items-center gap-3 uppercase tracking-widest italic">
                                <ShieldCheck className="w-5 h-5 text-red-600" /> Informasi Pribadi
                            </h3>

                            <div className="flex flex-col md:flex-row gap-10 items-start mb-10 border-b border-zinc-800/50 pb-10 relative z-10">
                                {/* Photo Upload Circle */}
                                <div className="relative group shrink-0 self-center md:self-start">
                                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2.5rem] overflow-hidden border-4 border-zinc-800 shadow-2xl bg-zinc-950 flex items-center justify-center group-hover:border-red-600/50 transition-colors">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-12 h-12 text-zinc-800" />
                                        )}
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => fileInput.current?.click()}
                                        className="absolute -bottom-2 -right-2 p-3 bg-red-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-transform active:scale-95 border-4 border-zinc-900"
                                    >
                                        <Camera className="w-4 h-4" />
                                    </button>
                                    <input 
                                        type="file" 
                                        ref={fileInput}
                                        onChange={handleFileChange}
                                        className="hidden" 
                                        accept="image/*"
                                    />
                                </div>

                                <div className="flex-1 space-y-3">
                                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic leading-none">Foto Profil</h4>
                                    <p className="text-[11px] text-zinc-500 italic max-w-xs leading-relaxed font-medium">
                                        Unggah foto profil Anda di sini. Disarankan gambar persegi dengan ukuran minimal 400x400px. Maksimal 2MB.
                                    </p>
                                    <div className="flex items-center gap-3 pt-4">
                                        <Button 
                                            type="button"
                                            onClick={() => fileInput.current?.click()}
                                            variant="outline" 
                                            className="h-10 rounded-xl text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all italic border-dashed"
                                        >
                                            <Upload className="w-3.5 h-3.5 mr-2 text-red-600" /> Pilih File
                                        </Button>
                                        {preview !== admin.avatar_url && (
                                            <Button 
                                                type="button"
                                                onClick={() => {
                                                    setPreview(admin.avatar_url);
                                                    setData('avatar', null);
                                                }}
                                                variant="ghost" 
                                                className="h-10 rounded-xl text-[10px] font-black text-red-500 hover:bg-red-500/10 uppercase tracking-widest italic"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 mr-2" /> Batal
                                            </Button>
                                        )}
                                    </div>
                                    {errors.avatar && <p className="text-[10px] text-red-500 font-bold italic mt-3 uppercase tracking-tighter">{errors.avatar}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1 italic">Nama Lengkap</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input 
                                            type="text" 
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full pl-12 pr-5 py-3 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-[13px] focus:ring-1 focus:ring-red-600 text-white placeholder:text-zinc-700 transition-all font-medium"
                                            placeholder="Masukkan nama lengkap..."
                                        />
                                    </div>
                                    {errors.name && <p className="text-[10px] text-red-500 font-black ml-1 italic uppercase tracking-tighter">{errors.name}</p>}
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1 italic">Alamat Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input 
                                            type="email" 
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full pl-12 pr-5 py-3 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-[13px] focus:ring-1 focus:ring-red-600 text-white placeholder:text-zinc-700 transition-all font-medium"
                                            placeholder="admin@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="text-[10px] text-red-500 font-black ml-1 italic uppercase tracking-tighter">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="bg-zinc-900/40 p-6 sm:p-10 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left">
                            <h3 className="text-sm font-black text-white mb-10 flex items-center gap-3 uppercase tracking-widest italic">
                                <Lock className="w-5 h-5 text-red-600" /> Keamanan Akun
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1 italic">Password Baru</label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input 
                                            type="password" 
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            className="w-full pl-12 pr-5 py-3 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-[13px] focus:ring-1 focus:ring-red-600 text-white placeholder:text-zinc-700 transition-all font-medium"
                                            placeholder="Kosongkan jika tidak ganti..."
                                        />
                                    </div>
                                    {errors.password && <p className="text-[10px] text-red-500 font-black ml-1 italic uppercase tracking-tighter">{errors.password}</p>}
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1 italic">Konfirmasi Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input 
                                            type="password" 
                                            value={data.password_confirmation}
                                            onChange={e => setData('password_confirmation', e.target.value)}
                                            className="w-full pl-12 pr-5 py-3 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-[13px] focus:ring-1 focus:ring-red-600 text-white placeholder:text-zinc-700 transition-all font-medium"
                                            placeholder="Ulangi password baru..."
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-10 p-5 bg-zinc-950/50 rounded-[1.5rem] border border-zinc-800 flex items-start gap-4">
                                <div className="p-2.5 bg-zinc-900 rounded-xl text-red-600 border border-zinc-800 shadow-inner">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <p className="text-[11px] text-zinc-500 italic leading-relaxed font-medium">
                                    Pastikan password terdiri dari minimal 8 karakter dan merupakan kombinasi unik untuk menjaga keamanan akses dashboard Anda.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button 
                                disabled={processing}
                                className="bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-red-600/30 px-12 h-14 rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center gap-4 italic border-none"
                            >
                                {processing ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Save className="w-5 h-5 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" />
                                )}
                                SIMPAN PERUBAHAN
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Identity Card Sidebar */}
                <div className="space-y-6 text-left">
                    <div className="bg-zinc-900 p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl border border-zinc-800/50">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600 opacity-[0.03] rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="w-20 h-20 rounded-3xl bg-zinc-800 flex items-center justify-center mb-8 shadow-2xl overflow-hidden border-2 border-zinc-700/50 group-hover:border-red-600/50 transition-colors">
                            {admin.avatar_url ? (
                                <img src={admin.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white font-black text-3xl italic">{admin.name.charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        <h4 className="text-2xl font-black mb-1 italic tracking-widest leading-none uppercase">{admin.name}</h4>
                        <p className="text-zinc-600 text-[11px] mb-10 font-bold uppercase tracking-wider">{admin.email}</p>
                        
                        <div className="space-y-4 pt-8 border-t border-zinc-800">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest italic">ROLE</span>
                                <span className="text-[10px] bg-red-600/10 text-red-500 px-3 py-1 rounded-full font-black italic border border-red-500/20">SUPER_ADMIN</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest italic">STATUS</span>
                                <span className="text-[10px] text-green-500 flex items-center gap-2 font-black italic">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" /> TERVERIFIKASI
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800/50 shadow-sm text-left">
                        <h4 className="text-[11px] font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest italic">
                             <CheckCircle2 className="w-5 h-5 text-red-600" /> Security Checklist
                        </h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <p className="text-[11px] text-zinc-400 leading-relaxed font-bold italic">Email terhubung sudah terverifikasi.</p>
                            </div>
                            <div className="flex items-start gap-4 opacity-40">
                                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600 shrink-0 border border-zinc-700">
                                    <div className="w-2 h-2 bg-zinc-700 rounded-full" />
                                </div>
                                <p className="text-[11px] text-zinc-600 leading-relaxed italic font-bold">Autentikasi 2 Faktor (Coming Soon).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
