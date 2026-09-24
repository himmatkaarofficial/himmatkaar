import Link from "next/link";
import { ArrowLeft, Cookie, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cookieSections = [
  {
    title: "1. What Are Cookies",
    text: "Cookies are compact text files stored on your local device or browser when you visit our website. They enable the platform to remember your navigation state, authentication tokens, and display preferences.",
  },
  {
    title: "2. How We Use Cookies",
    text: "We use essential functional cookies to keep users authenticated in the portal, secure form submissions, and anonymous analytical cookies to measure site engagement and improve page responsiveness.",
  },
  {
    title: "3. Managing Your Cookie Preferences",
    text: "You can adjust your browser preferences at any time to block or delete cookies. Please note that disabling essential cookies may impact specific dashboard and authentication functionalities.",
  },
  {
    title: "4. Inquiries & Contact",
    text: "If you have questions regarding our cookie practices, please contact our support team.",
    link: { href: "/contact", label: "Contact HimmatKaar" }
  }
];

export default function CookiePolicyPage() {
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
              <Cookie size={14} className="text-[#f3ae29]" />
              <span>Browsing Preferences</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
              Cookie{" "}
              <span className="text-[#389456]">
                Policy
              </span>
              <span className="font-urdu block text-2xl sm:text-3xl text-[#f3ae29] font-normal mt-2">
                کوکیز کی پالیسی
              </span>
            </h1>
            <p className="text-xs font-mono text-[#a3caad] uppercase tracking-wider">Effective date: March 30, 2026</p>
          </div>
        </section>

        {/* ── CRISP LIGHT SECTION: Cookie Clauses ── */}
        <section className="bg-[#f8faf7] py-16 sm:py-24 border-b border-[#e2ede4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="space-y-6">
              {cookieSections.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2ede4] hover:border-[#2d7a46]/50 transition-all duration-300 shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#2d7a46] uppercase tracking-wider">
                      Item 0{i + 1}
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
