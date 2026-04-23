import { Head, useForm } from '@inertiajs/react';
import { Loader2, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    status?: string;
}

export default function AdminLogin({ status }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: 'admin@gmail.com',
        password: 'admin123',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login', {
            onFinish: () => setData('password', ''),
        });
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-red-600 selection:text-white relative overflow-hidden">
            <Head title="Admin Log in" />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600 opacity-[0.03] rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-600 opacity-[0.03] rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent opacity-50"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-left">
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-[2rem] bg-zinc-800 flex items-center justify-center border border-zinc-700 shadow-lg group hover:border-red-600/30 transition-all duration-700">
                        <Lock className="w-8 h-8 text-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)] animate-pulse" />
                    </div>
                </div>
                <h2 className="mt-8 text-center text-2xl font-black text-white italic tracking-[0.3em] uppercase">
                    ADMIN PORTAL
                </h2>
                <p className="mt-3 text-center text-[9px] text-zinc-600 font-black uppercase tracking-[0.4em] italic">
                    ENTERING RESTRICTED AREA
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <div className="bg-gradient-to-b from-zinc-800/50 to-zinc-900/60 backdrop-blur-xl py-12 px-6 shadow-2xl sm:rounded-[3rem] sm:px-12 border border-zinc-700/50">
                    
                    {status && (
                        <div className="mb-8 rounded-2xl bg-zinc-800/40 p-5 text-[10px] font-black text-red-500 border border-red-500/10 flex items-center gap-4 uppercase tracking-widest italic shadow-lg">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-600/10 text-red-500 text-[10px] border border-red-500/20 shrink-0">✓</span> 
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-8 text-left">
                        <div>
                            <Label htmlFor="email" className="block text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1 mb-3 italic">
                                EMAIL ADDRESS
                            </Label>
                            <div className="relative group">
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full rounded-2xl border border-zinc-700/80 bg-zinc-800 shadow-lg shadow-black/60 h-14 pl-6 text-zinc-100 text-xs placeholder-zinc-500 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/30 transition-all font-medium italic group-hover:border-zinc-600"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@menfess.id"
                                />
                                {errors.email && <InputError message={errors.email} className="mt-2.5 text-[9px] text-red-500 font-black uppercase italic tracking-widest ml-1" />}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password" className="block text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1 mb-3 italic">
                                PASSWORD
                            </Label>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="block w-full rounded-2xl border border-zinc-700/80 bg-zinc-800 shadow-lg shadow-black/60 h-14 pl-6 pr-12 text-zinc-100 text-xs placeholder-zinc-500 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/30 transition-all font-medium italic group-hover:border-zinc-600"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-zinc-800 hover:text-red-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                                    ) : (
                                        <Eye className="h-4 w-4" aria-hidden="true" />
                                    )}
                                </button>
                                {errors.password && <InputError message={errors.password} className="mt-2.5 text-[9px] text-red-500 font-black uppercase italic tracking-widest ml-1" />}
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData('remember', checked as boolean)}
                                    className="h-4 w-4 rounded border border-zinc-700/80 bg-zinc-800 shadow-sm shadow-black/60 text-red-600 focus:ring-red-600/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 transition-all font-medium"
                                />
                                <Label htmlFor="remember" className="ml-3 block text-[10px] text-zinc-700 font-black uppercase tracking-widest cursor-pointer select-none italic hover:text-zinc-500 transition-colors">
                                    INGAT SAYA
                                </Label>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button
                                type="submit"
                                className="w-full h-16 rounded-[2rem] bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white hover:border-red-600/30 transition-all group shadow-2xl relative overflow-hidden italic text-[11px] font-black uppercase tracking-[0.3em]"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                        AUTH...
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center gap-3">
                                        MASUK KE DASHBOARD
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2 text-red-600" aria-hidden="true" />
                                    </div>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
                
                <div className="mt-12 text-center text-[9px] font-black text-zinc-800 uppercase tracking-[0.5em] italic">
                    &copy; {new Date().getFullYear()} MENFESS OVERSIGHT SYSTEM. All rights secured.
                </div>
            </div>
        </div>
    );
}
