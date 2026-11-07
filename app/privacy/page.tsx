import Link from "next/link";
import { ArrowLeft, Shield, Sparkles, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    text: "We collect information you provide directly, such as your full name, email address, contact phone/WhatsApp number, university affiliation, and details submitted through fellowship application forms, event registrations, or newsletter subscriptions.",
  },
  {
    title: "2. How We Use Information",
    text: "We utilize collected data to administer educational programs, process cohort admissions, coordinate mentor pairings, communicate workshop updates, evaluate program outcomes, and improve our services.",
  },
  {
    title: "3. Data Sharing & Security",
    text: "HimmatKaar does not sell or rent personal information to third parties. We only share necessary details with trusted educational partners and facilitators involved directly in cohort operations or as required by law.",
  },
  {
    title: "4. Data Retention & Protection",
    text: "We implement industry-standard administrative and technical security measures to protect user data from unauthorized access, loss, or alteration.",
  },
  {
    title: "5. Your Rights & Preferences",
    text: "You retain the right to review, update, or request deletion of your personal records from our database by contacting our data coordinator.",
  },
  {
    title: "6. Questions & Contact",
    text: "For any privacy-related inquiries, please reach out to our team directly through our contact portal.",
    link: { href: '/contact', label: 'Go to Contact Support' },
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#07190e] text-white flex flex-col font-sans selection:bg-[#2d7a46] selection:text-white">
      <Navbar />
      
      <main className="pt-20 flex-grow">
        
        {/* ── Dark Forest Header ── */}
        <section className="bg-gradient-to-b from-[#0c2616] to-[#07190e] py-16 sm:py-20 border-b border-[#1d442a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-lg bg-[#07190e]/80 border border-[#1d442a] text-[#a3caad] hover:text-white hover:border-[#389456] transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <ArrowLeft size={14} className="text-[#389456]" /> Back to Home
            </Link>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#07190e] border border-[#1d442a] text-[#f3ae29] text-xs font-mono uppercase tracking-widest mb-4">
              <Shield size={14} className="text-[#f3ae29]" />
              <span>Legal & Transparency</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
              Privacy{" "}
              <span className="text-[#389456]">
                Policy
              </span>
            </h1>
            <p className="text-xs font-mono text-[#a3caad] uppercase tracking-wider">Effective date: March 30, 2026</p>
          </div>
        </section>

        {/* ── CRISP LIGHT SECTION: Clauses ── */}
        <section className="bg-[#f8faf7] py-16 sm:py-24 border-b border-[#e2ede4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="space-y-6">
              {sections.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2ede4] hover:border-[#2d7a46]/50 transition-all duration-300 shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#2d7a46] uppercase tracking-wider">
                      Section 0{i + 1}
                    </span>
                    <CheckCircle2 size={16} className="text-[#2d7a46]" />
                  </div>
                  <h2 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#0c2616] mb-3 group-hover:text-[#2d7a46] transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                    {s.text}
                  </p>
                  {s.link && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <Link 
                        href={s.link.href} 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e8f5ec] text-[#2d7a46] font-semibold text-xs font-mono uppercase tracking-wider hover:bg-[#2d7a46] hover:text-white transition-colors"
                      >
                        {s.link.label}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
