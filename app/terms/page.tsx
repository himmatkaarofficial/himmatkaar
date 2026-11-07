import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    text: "By accessing or utilizing the HimmatKaar website, applications, bootcamps, and educational materials, you agree to comply with and be bound by these Terms of Use. If you do not agree, please discontinue use immediately.",
  },
  {
    title: "2. Platform Usage & Code of Conduct",
    text: "You agree to utilize our platform exclusively for lawful educational and professional growth purposes. Submitting fraudulent application credentials, misrepresenting academic affiliations, or disrupting community spaces is strictly prohibited.",
  },
  {
    title: "3. Intellectual Property Rights",
    text: "All workshop curriculums, case studies, graphic materials, and software frameworks provided by HimmatKaar are protected by intellectual property laws and remain the exclusive property of the HimmatKaar Foundation.",
  },
  {
    title: "4. Third-Party Integrations & Links",
    text: "Our platform may contain links to external third-party resources, software repositories, or employer partners. HimmatKaar is not liable for external content or privacy practices.",
  },
  {
    title: "5. Limitation of Liability",
    text: "All programs, mentorship sessions, and materials are provided on an 'as is' and 'as available' basis without warranties of any kind. HimmatKaar is not liable for indirect or consequential damages.",
  },
  {
    title: "6. Modifications to Terms",
    text: "We reserve the right to revise or modify these Terms at our discretion. Continued use of our services following any modifications constitutes acceptance of the updated terms.",
  },
  {
    title: "7. Contact & Legal Inquiries",
    text: "For questions regarding these terms, please contact our legal and administrative team directly.",
    link: { href: "/contact", label: "Contact HimmatKaar" }
  }
];

export default function TermsPage() {
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
              <FileText size={14} className="text-[#f3ae29]" />
              <span>User Agreement</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
              Terms of{" "}
              <span className="text-[#389456]">
                Service
              </span>
            </h1>
            <p className="text-xs font-mono text-[#a3caad] uppercase tracking-wider">Effective date: March 30, 2026</p>
          </div>
        </section>

        {/* ── CRISP LIGHT SECTION: Terms Clauses ── */}
        <section className="bg-[#f8faf7] py-16 sm:py-24 border-b border-[#e2ede4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="space-y-6">
              {termsSections.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2ede4] hover:border-[#2d7a46]/50 transition-all duration-300 shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#2d7a46] uppercase tracking-wider">
                      Clause 0{i + 1}
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
