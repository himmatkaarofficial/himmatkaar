"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  "6-month intensive leadership training",
  "One-on-one mentorship from industry experts",
  "Access to exclusive workshops and events",
  "Networking opportunities with alumni and partners",
  "Certificate of completion",
];

export default function Fellowship() {
  return (
    <div className="min-h-screen bg-[#08170d] text-white overflow-x-hidden">
      <Navbar />
      <main className="pt-20">
        <section className="bg-[#08170d] pt-6 pb-16 sm:pt-8 sm:pb-20 relative overflow-hidden">
          {/* Ambient Glow */}
          <div 
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#0ae448]/5 blur-[120px] pointer-events-none rounded-full" 
            aria-hidden="true" 
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm text-[#8ea896] hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="mb-4">
              <span className="annotation-curly">
                &#123; Programme &#125;
              </span>
            </div>
            <h1 
              className="mb-4 text-white font-bold leading-[1.05] tracking-tight max-w-3xl"
              style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
            >
              Fellowship{" "}
              <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                Program!
              </span>
            </h1>
            <p className="mb-10 text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] max-w-2xl font-normal">
              Our Fellowship Program is designed to nurture emerging leaders through intensive mentorship, skill development, and community engagement.
            </p>

            {/* Benefits Cards Grid */}
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
                Program <span className="text-[#0ae448]">Benefits!</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="bg-[#0e2417] rounded-xl p-6 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#0ae448] uppercase tracking-widest block mb-3">
                        &#123; Benefit 0{i + 1} &#125;
                      </span>
                      <p className="text-base font-semibold text-white group-hover:text-[#0ae448] transition-colors leading-relaxed">{b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link href="/launchpad">
                <button className="btn-gsap-cta">View Launchpad <ArrowRight size={14} /></button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
