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
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Profil Admin</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Kelola identitas dan keamanan akun administrator Anda.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Information Form */}
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Information Section */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                                <User className="w-40 h-40 text-black" />
                            </div>
                            
                            <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-blue-500" /> Informasi Pribadi
                            </h3>

                            <div className="flex flex-col md:flex-row gap-8 items-start mb-8 border-b border-gray-50 pb-8">
                                {/* Photo Upload Circle */}
                                <div className="relative group shrink-0 self-center md:self-start">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] overflow-hidden border-4 border-gray-50 shadow-inner bg-gray-100 flex items-center justify-center">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-10 h-10 text-gray-300" />
                                        )}
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => fileInput.current?.click()}
                                        className="absolute -bottom-2 -right-2 p-2.5 bg-black text-white rounded-2xl shadow-xl hover:scale-110 transition-transform active:scale-95"
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

                                <div className="flex-1 space-y-2">
                                    <h4 className="text-sm font-bold text-gray-900">Foto Profil</h4>
                                    <p className="text-[11px] text-gray-500 italic max-w-xs leading-relaxed">
                                        Unggah foto profil Anda di sini. Disarankan gambar persegi dengan ukuran minimal 400x400px. Maksimal 2MB.
                                    </p>
                                    <div className="flex items-center gap-2 pt-2">
                                        <Button 
                                            type="button"
                                            onClick={() => fileInput.current?.click()}
                                            variant="outline" 
                                            className="h-8 rounded-xl text-[10px] font-bold border-gray-100"
                                        >
                                            <Upload className="w-3 h-3 mr-1.5" /> Pilih File
                                        </Button>
                                        {preview !== admin.avatar_url && (
                                            <Button 
                                                type="button"
                                                onClick={() => {
                                                    setPreview(admin.avatar_url);
                                                    setData('avatar', null);
                                                }}
                                                variant="ghost" 
                                                className="h-8 rounded-xl text-[10px] font-bold text-red-500 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-3 h-3 mr-1.5" /> Batalkan
                                            </Button>
                                        )}
                                    </div>
                                    {errors.avatar && <p className="text-[10px] text-red-500 font-bold italic mt-2">{errors.avatar}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="text" 
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-black transition-all"
                                            placeholder="Masukkan nama lengkap..."
                                        />
                                    </div>
                                    {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1 italic">{errors.name}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Alamat Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="email" 
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-black transition-all"
                                            placeholder="admin@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1 italic">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm text-left">
                            <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-red-500" /> Keamanan Akun
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password Baru</label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="password" 
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-black transition-all"
                                            placeholder="Kosongkan jika tidak ingin ganti..."
                                        />
                                    </div>
                                    {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1 italic">{errors.password}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Konfirmasi Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="password" 
                                            value={data.password_confirmation}
                                            onChange={e => setData('password_confirmation', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-black transition-all"
                                            placeholder="Ulangi password baru..."
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
                                <div className="p-2 bg-white rounded-xl text-orange-500">
                                    <AlertCircle className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] text-gray-500 italic leading-relaxed">
                                    Pastikan password terdiri dari minimal 8 karakter dan merupakan kombinasi unik untuk menjaga keamanan akses dashboard Anda.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button 
                                disabled={processing}
                                className="bg-black hover:bg-gray-900 text-white px-8 h-12 rounded-2xl font-bold shadow-lg shadow-black/10 transition-all flex items-center gap-2"
                            >
                                {processing ? (
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Info / Session Sidebar */}
                <div className="space-y-6">
                    <div className="bg-gray-900 p-8 rounded-[2rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-xl overflow-hidden">
                            {admin.avatar_url ? (
                                <img src={admin.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-black font-black text-2xl">{admin.name.charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        <h4 className="text-xl font-bold mb-1">{admin.name}</h4>
                        <p className="text-gray-400 text-xs mb-8">{admin.email}</p>
                        
                        <div className="space-y-3 pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Role</span>
                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-bold">SUPER_ADMIN</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Status</span>
                                <span className="text-[10px] text-green-400 flex items-center gap-1.5 font-bold">
                                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" /> TERVERIFIKASI
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left">
                        <h4 className="text-xs font-bold text-gray-900 mb-6 flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4 text-green-500" /> Security Checklist
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 opacity-100">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                    <CheckCircle2 className="w-3 h-3" />
                                </div>
                                <p className="text-[10px] text-gray-600 leading-relaxed font-medium">Email terhubung sudah terverifikasi.</p>
                            </div>
                            <div className="flex items-start gap-3 opacity-60">
                                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                </div>
                                <p className="text-[10px] text-gray-400 leading-relaxed italic">Aktifkan Autentikasi 2 Faktor (Coming Soon).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
