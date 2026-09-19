"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth";

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--color-espresso)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-controls)',
  padding: '12px 16px 12px 44px',
  color: 'var(--color-text-primary)',
  fontSize: '14px',
  fontFamily: 'var(--font-sans-gallery)',
  outline: 'none',
};

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
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', display: 'flex', color: 'var(--color-text-primary)' }}>

      {/* ── Left — Hero Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'var(--color-field-forest)' }}>
        <div className="absolute inset-0" style={{ background: 'rgba(13,40,24,0.55)', zIndex: 1 }} />
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80")' }}
        />
        <div className="relative z-10 flex flex-col justify-between h-full p-16 text-white">
          <Link href="/" className="flex items-center gap-3 w-fit hover:opacity-80 transition-opacity">
            <Image src="/himmatkaar-logo.jpg" alt="Himmatkaar Logo" width={40} height={40} style={{ borderRadius: 'var(--radius-controls)' }} />
            <span className="font-portrait" style={{ fontSize: '20px', color: 'var(--color-text-primary)' }}>Himmatkaar</span>
          </Link>
          <div>
            <span className="badge-gallery badge-gold inline-flex mb-5">Admin Portal</span>
            <h1 className="font-portrait mb-4" style={{ fontSize: '40px', color: 'var(--color-text-primary)', maxWidth: '400px' }}>
              Empowering the youth of tomorrow.
            </h1>
            <p style={{ fontSize: '15px', lineHeight: 1.3, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)', maxWidth: '360px' }}>
              Join a community dedicated to growth, innovation, and leadership. Your journey to excellence starts here.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right — Form Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8" style={{ background: 'var(--color-canvas)' }}>
        <div className="w-full" style={{ maxWidth: '400px' }}>
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/himmatkaar-logo.jpg" alt="Himmatkaar Logo" width={36} height={36} style={{ borderRadius: 'var(--radius-controls)' }} />
              <span className="font-portrait" style={{ fontSize: '18px', color: 'var(--color-text-primary)' }}>Himmatkaar</span>
            </Link>
          </div>

          <span className="badge-gallery badge-mint inline-flex mb-5">Secure Login</span>
          <h2 className="font-portrait mb-2" style={{ fontSize: '35px', color: 'var(--color-text-primary)' }}>Login</h2>
          <p className="mb-8" style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)' }}>
            Sign in to access your dashboard account.
          </p>

          <div style={{ background: 'var(--color-charcoal)', borderRadius: 'var(--radius-cards)', padding: '32px', border: '1px solid var(--color-border)' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div style={{ background: 'rgba(185,83,74,0.15)', border: '1px solid rgba(185,83,74,0.3)', borderRadius: 'var(--radius-controls)', padding: '10px 14px', fontSize: '12px', color: '#e07a73', fontFamily: 'var(--font-sans-gallery)', letterSpacing: '0.08em' }}>
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)', marginBottom: '6px' }} htmlFor="email">
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={inputStyle}
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)', marginBottom: '6px' }} htmlFor="password">
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    style={{ ...inputStyle, paddingRight: '44px' }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
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
                className="btn-filled-pill w-full justify-center"
                style={{ width: '100%', fontSize: '10px', padding: '12px 20px', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? <><Loader2 className="animate-spin" size={14} /> Signing in…</> : 'Log In'}
              </button>
            </form>
          </div>

          <p className="label-gallery mt-6 text-center" style={{ color: 'var(--color-text-muted)' }}>
            Public signup is coming soon for other roles.
          </p>
        </div>
      </div>
    </div>
  );
}
