import { Head } from '@inertiajs/react';
import { Loader2, ArrowRight, Lock, Cloud, Eye, EyeOff } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    status?: string;
}

const animationStyles = `
  @keyframes float-cloud {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  @keyframes drift {
    0%, 100% { transform: translateX(0px); }
    50% { transform: translateX(20px); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-float-cloud {
    animation: float-cloud 4s ease-in-out infinite;
  }
  .animate-drift {
    animation: drift 5s ease-in-out infinite;
  }
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  .animate-slide-down {
    animation: slide-down 0.7s ease-out;
  }
  .cloud-shape {
    border-radius: 50px;
    box-shadow: inset 8px 8px 0 rgba(255,255,255,0.8), inset -8px -8px 0 rgba(255,255,255,0.5);
  }
`;

export default function AdminLogin({ status }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('remember', remember ? '1' : '0');

            // Get CSRF token
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            if (token) {
                formData.append('_token', token);
            }

            const response = await fetch('/admin/login', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });

            if (response.ok || response.status === 200) {
                // Success - redirect to dashboard
                window.location.href = '/admin/dashboard';
            } else if (response.status === 422) {
                // Validation errors
                const data = await response.json();
                setErrors(data.errors || {});
                setIsLoading(false);
            } else {
                setErrors({ email: 'Login gagal. Silakan coba lagi.' });
                setIsLoading(false);
            }
        } catch (err) {
            console.error('Login error:', err);
            setErrors({ email: 'Terjadi kesalahan. Silakan coba lagi.' });
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden selection:bg-cyan-200 selection:text-cyan-900">
            <style>{animationStyles}</style>
            <Head title="Admin Log in" />

            {/* Whimsical Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-300 via-blue-200 to-cyan-200" />
            
            {/* Decorative Clouds */}
            <div className="absolute top-8 left-8 w-24 h-16 opacity-70 animate-float-cloud" style={{ animationDelay: '0s' }}>
                <Cloud className="w-full h-full text-white drop-shadow-lg" fill="white" />
            </div>
            <div className="absolute top-24 right-12 w-32 h-20 opacity-60 animate-float-cloud" style={{ animationDelay: '1s' }}>
                <Cloud className="w-full h-full text-white drop-shadow-lg" fill="white" />
            </div>
            <div className="absolute bottom-20 left-1/4 w-28 h-16 opacity-50 animate-drift" style={{ animationDelay: '2s' }}>
                <Cloud className="w-full h-full text-white drop-shadow-md" fill="white" />
            </div>
            <div className="absolute bottom-32 right-1/3 w-36 h-24 opacity-60 animate-float-cloud" style={{ animationDelay: '3s' }}>
                <Cloud className="w-full h-full text-white drop-shadow-lg" fill="white" />
            </div>

            {/* Floating Shapes */}
            <div className="absolute top-1/3 right-8 w-6 h-6 rounded-full bg-yellow-300 opacity-60 animate-pulse-glow shadow-lg" />
            <div className="absolute bottom-1/3 left-10 w-8 h-8 rounded-full bg-pink-300 opacity-50 animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-purple-300 opacity-40 animate-pulse" style={{ animationDuration: '4s' }} />

            <div className="relative z-10 w-full max-w-md px-6 sm:px-0 animate-slide-down">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm shadow-2xl">
                        <Lock className="w-10 h-10 text-cyan-600" />
                    </div>
                    <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                        Admin Portal
                    </h1>
                    <p className="mt-4 text-xl font-bold text-cyan-700">
                        Kelola Platform Menfess
                    </p>
                </div>

                {/* Main Card */}
                <div className="relative">
                    {/* Card Container */}
                    <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 shadow-2xl border-4 border-white/60 relative overflow-hidden">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400" />

                        {status && (
                            <div className="mb-6 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 p-4 text-sm font-bold text-green-700 border-2 border-green-300 flex items-center gap-2">
                                <span>✓</span> {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-base font-bold text-cyan-700 flex items-center gap-2">
                                    📧 Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    className="w-full rounded-2xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-50 to-blue-50 px-5 py-3 text-base font-medium text-cyan-900 placeholder-cyan-400 transition-all focus:border-cyan-500 focus:outline-none focus:ring-3 focus:ring-cyan-300/50 focus:bg-white"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                />
                                {errors.email && <InputError message={errors.email} className="text-sm font-bold text-red-600" />}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-3">
                                <Label htmlFor="password" className="text-base font-bold text-cyan-700 flex items-center gap-2">
                                    🔐 Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={password}
                                        className="w-full rounded-2xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-50 to-blue-50 px-5 py-3 pr-12 text-base font-medium text-cyan-900 placeholder-cyan-400 transition-all focus:border-cyan-500 focus:outline-none focus:ring-3 focus:ring-cyan-300/50 focus:bg-white"
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-cyan-600 hover:text-cyan-700 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <InputError message={errors.password} className="text-sm font-bold text-red-600" />}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <Label className="flex cursor-pointer items-center gap-3">
                                    <Checkbox
                                        name="remember"
                                        checked={remember}
                                        onCheckedChange={(checked) => setRemember(checked as boolean)}
                                        className="w-5 h-5 rounded-lg border-2 border-cyan-400 bg-white text-cyan-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 transition-colors"
                                    />
                                    <span className="text-base font-semibold text-cyan-700">Ingat saya</span>
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="group relative w-full mt-8 py-4 font-bold text-lg text-white transition-all duration-300 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1"
                                style={{
                                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                                }}
                                disabled={isLoading}
                            >
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                
                                <div className="relative flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <span>🚀 Masuk ke Dashboard</span>
                                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                                        </>
                                    )}
                                </div>
                            </Button>
                        </form>

                        {/* Bottom Accent */}
                        <div className="mt-6 text-center">
                            <p className="text-sm font-bold text-cyan-600">
                                ⚡ Menfess Admin Dashboard
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer decorative element */}
                <div className="mt-8 text-center">
                    <div className="inline-block px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border-2 border-white/80">
                        <p className="text-sm font-semibold text-cyan-700">✨ Platform Control Center ✨</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
