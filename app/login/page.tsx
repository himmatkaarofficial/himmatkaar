"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { signIn } from "@/lib/auth";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(formData.email, formData.password);
      router.push("/dashboard/admin");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07190e] text-white flex flex-col lg:flex-row font-sans selection:bg-[#2d7a46] selection:text-white">

      {/* ── Left — Hero Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0c2616] border-r border-[#1d442a]">
        <div
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07190e]/95 via-[#07190e]/60 to-[#07190e]/30 z-10" />
        <div className="relative z-20 flex flex-col justify-between h-full p-16 text-white w-full">
          <Link href="/" className="inline-flex items-center gap-3 w-fit group">
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#2d7a46]/40 relative">
              <Image src="/himmatkaar-logo.jpg" alt="Himmatkaar Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="font-serif-heading text-xl font-bold text-white block">HimmatKaar</span>
              <span className="font-urdu text-sm text-[#f3ae29]">ہمت کار پورٹل</span>
            </div>
          </Link>
          
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#07190e]/90 border border-[#1d442a] text-[#f3ae29] text-xs font-mono uppercase tracking-widest mb-4">
              <ShieldCheck size={14} className="text-[#f3ae29]" />
              <span>Administrative Gateway</span>
            </div>
            <h1 className="font-serif-heading text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Empowering the youth of Pakistan.
            </h1>
            <p className="text-base text-[#d1e7d8] leading-relaxed font-normal">
              Sign in to manage curriculum milestones, verify student portfolios, and coordinate nationwide events.
            </p>
          </div>

          <div className="text-xs font-mono text-[#a3caad]">
            © {new Date().getFullYear()} HimmatKaar Foundation. All rights reserved.
          </div>
        </div>
      </div>

      {/* ── Right — Form Panel (Crisp Light Canvas) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[#f8faf7] text-slate-900">
        <div className="w-full max-w-[440px]">
          
          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-lg bg-white border border-[#e2ede4] text-slate-600 hover:text-[#0c2616] hover:border-[#2d7a46] transition-colors text-xs font-mono uppercase tracking-wider shadow-sm"
          >
            <ArrowLeft size={14} className="text-[#2d7a46]" /> Return Home
          </Link>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#2d7a46]/30 relative">
              <Image src="/himmatkaar-logo.jpg" alt="Himmatkaar Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="font-serif-heading text-lg font-bold text-[#0c2616]">HimmatKaar</span>
              <span className="font-urdu text-xs text-[#2d7a46] block">ہمت کار</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e2ede4] shadow-lg">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e8f5ec] text-[#2d7a46] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                <Sparkles size={13} className="text-[#2d7a46]" /> Secure Portal
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#0c2616]">
                Portal Login
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Enter your credentials to access the administrative dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2d7a46]" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-[#f8faf7] border border-[#e2ede4] rounded-xl pl-10 pr-4 py-3 text-slate-900 text-sm focus:border-[#2d7a46] focus:bg-white outline-none transition-colors"
                    placeholder="admin@himmatkaar.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 mb-1.5" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2d7a46]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full bg-[#f8faf7] border border-[#e2ede4] rounded-xl pl-10 pr-10 py-3 text-slate-900 text-sm focus:border-[#2d7a46] focus:bg-white outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#2d7a46] text-white font-bold hover:bg-[#389456] transition-colors text-sm shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
              >
                {loading ? <><Loader2 className="animate-spin" size={16} /> Signing in…</> : 'Log In to Dashboard'}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center text-xs font-mono text-slate-500">
            Need student registration?{" "}
            <Link href="/signup" className="text-[#2d7a46] font-bold hover:underline">
              Check upcoming open access
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
