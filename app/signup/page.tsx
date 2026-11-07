import Link from "next/link";
import { Clock3, Rocket, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";
import Image from "next/image";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-[#07190e] text-white flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-[#2d7a46] selection:text-white relative overflow-hidden">
      
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[#2d7a46]/10 blur-[140px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-[640px] relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-lg bg-[#0c2616] border border-[#1d442a] text-[#a3caad] hover:text-white hover:border-[#389456] transition-colors text-xs font-mono uppercase tracking-wider"
        >
          <ArrowLeft size={14} className="text-[#389456]" /> Back to Homepage
        </Link>

        <div className="bg-[#0c2616] rounded-3xl p-8 sm:p-12 border border-[#1d442a] shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#2d7a46]/40 relative">
              <Image src="/himmatkaar-logo.jpg" alt="Himmatkaar Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="font-serif-heading text-lg font-bold text-white block">HimmatKaar</span>
            </div>
          </div>

          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#07190e] border border-[#1d442a] text-[#f3ae29] text-xs font-mono font-semibold uppercase tracking-wider">
              <Clock3 size={13} className="text-[#f3ae29]" /> Public Registration In Progress
            </span>
          </div>

          <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight leading-snug">
            Student & Coordinator Signups Opening Soon
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-[#d1e7d8] mb-8 font-normal">
            We are actively expanding the platform to support direct student onboarding, personalized milestone trackers, and campus coordinator portals.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#07190e] rounded-2xl p-5 border border-[#1d442a]">
              <div className="flex items-center gap-2 mb-2 text-[#389456]">
                <ShieldCheck size={18} className="text-[#389456]" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-white">Current Access</span>
              </div>
              <p className="text-xs text-[#a3caad] leading-relaxed">Admin & Mentor access is active and accessible via the portal login.</p>
            </div>
            <div className="bg-[#07190e] rounded-2xl p-5 border border-[#1d442a]">
              <div className="flex items-center gap-2 mb-2 text-[#f3ae29]">
                <Rocket size={18} className="text-[#f3ae29]" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-white">Next Cohort</span>
              </div>
              <p className="text-xs text-[#a3caad] leading-relaxed">Open registration for Cohort 2026 fellows will be announced shortly.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/login" className="flex-1">
              <button className="w-full py-3.5 rounded-xl bg-[#2d7a46] text-white font-bold hover:bg-[#389456] transition-colors text-sm shadow-md">
                Go to Portal Login
              </button>
            </Link>
            <Link href="/contact" className="flex-1">
              <button className="w-full py-3.5 rounded-xl bg-[#07190e] border border-[#1d442a] text-[#d1e7d8] font-semibold hover:text-white hover:border-[#389456] transition-colors text-sm">
                Submit Admissions Inquiry
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
