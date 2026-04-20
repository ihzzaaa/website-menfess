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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-black selection:text-white">
            <Head title="Admin Log in" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center shadow-lg">
                        <Lock className="w-7 h-7 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    Admin Portal
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Masuk untuk mengelola platform Menfess
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-10 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
                    
                    {status && (
                        <div className="mb-6 rounded-lg bg-gray-50 p-4 text-sm font-medium text-gray-900 border border-gray-200 flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-xs">✓</span> 
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                                Email Address
                            </Label>
                            <div className="mt-2 text-left">
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full rounded-lg border-gray-300 py-5 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black sm:text-sm transition-colors"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@example.com"
                                />
                                {errors.email && <InputError message={errors.email} className="mt-2 text-sm text-red-600 font-medium" />}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                                Password
                            </Label>
                            <div className="mt-2 relative text-left">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="block w-full rounded-lg border-gray-300 py-5 pr-10 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black sm:text-sm transition-colors"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <Eye className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </button>
                                {errors.password && <InputError message={errors.password} className="mt-2 text-sm text-red-600 font-medium" />}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData('remember', checked as boolean)}
                                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black data-[state=checked]:bg-black data-[state=checked]:border-black"
                                />
                                <Label htmlFor="remember" className="ml-2 block text-sm text-gray-900 cursor-pointer select-none">
                                    Ingat saya
                                </Label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-semibold text-gray-600 hover:text-black hover:underline underline-offset-4">
                                    Lupa password?
                                </a>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="w-full flex justify-center py-6 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-70 group"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        Masuk ke Dashboard
                                        <ArrowRight className="ml-2 -mr-1 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
                
                <div className="mt-8 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Menfess Platform. All rights reserved.
                </div>
            </div>
        </div>
    );
}
