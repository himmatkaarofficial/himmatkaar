import Link from "next/link";
import { Clock3, Rocket, ShieldCheck } from "lucide-react";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-[#08170d] flex items-center justify-center p-4 sm:p-6 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[#0ae448]/5 blur-[140px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-[680px] relative z-10">
        <div className="bg-[#0e2417] rounded-2xl p-6 sm:p-10 md:p-12 border border-[#1a3a24] shadow-2xl">

          <div className="mb-4">
            <span className="annotation-curly inline-flex items-center gap-1.5">
              &#123; <Clock3 size={13} className="text-[#0ae448]" /> Coming Soon &#125;
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight leading-snug">
            Signup For Student And Coordinator Roles Will Be Added Soon<span className="text-[#0ae448]">.</span>
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-[#a8d5b5] mb-8 max-w-lg">
            We are currently supporting admin access only. Public signup is in progress and will be launched in a future update.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#08170d] rounded-xl p-5 border border-[#1a3a24]">
              <div className="flex items-center gap-2 mb-2 text-[#0ae448]">
                <ShieldCheck size={18} />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#0ae448]">Current Access</span>
              </div>
              <p className="text-xs sm:text-sm text-[#a8d5b5] leading-relaxed">Admin login is active and available now.</p>
            </div>
            <div className="bg-[#08170d] rounded-xl p-5 border border-[#1a3a24]">
              <div className="flex items-center gap-2 mb-2 text-[#0ae448]">
                <Rocket size={18} />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#0ae448]">Next Release</span>
              </div>
              <p className="text-xs sm:text-sm text-[#a8d5b5] leading-relaxed">Student and coordinator signup flows.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login">
              <button className="btn-gsap-cta w-full sm:w-auto justify-center">Go To Admin Login</button>
            </Link>
            <Link href="/">
              <button className="btn-gsap-ghost w-full sm:w-auto justify-center">Back To Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

