import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    text: "We may collect information you provide directly, such as your name, email address, phone number, and any details submitted through forms, event registrations, newsletters, or applications.",
  },
  {
    title: "2. How We Use Information",
    text: "We use your information to provide programs, process applications, communicate updates, improve our services, and support community engagement initiatives.",
  },
  {
    title: "3. Data Sharing",
    text: "We do not sell personal data. We may share data with trusted service providers that help us run our platform, where necessary to operate services, comply with legal obligations, or protect user safety.",
  },
  {
    title: "4. Data Security",
    text: "We use reasonable administrative and technical safeguards to protect personal information. No method of transmission or storage is 100% secure, but we continuously improve our security practices.",
  },
  {
    title: "5. Your Choices",
    text: "You may request access, correction, or deletion of your personal information, subject to legal and operational requirements.",
  },
  {
    title: "6. Contact",
    text: "For privacy-related questions, contact us through our contact page.",
    link: { href: '/contact', label: 'Go to Contact Page' },
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-text-primary)', overflowX: 'hidden' }}>
      <Navbar />
      <main className="pt-20">
        <section className="bg-[#08170d] py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-[#0ae448] hover:text-white transition-colors uppercase">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="mb-4">
              <span className="annotation-curly">&#123; Legal Compliance &#125;</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
              Privacy{" "}
              <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                Policy!
              </span>
            </h1>
            <p className="text-xs font-mono text-[#8ea896] uppercase tracking-wider mb-10">Effective date: March 30, 2026</p>

            <div className="space-y-4">
              {sections.map((s, i) => (
                <div
                  key={i}
                  className="bg-[#0e2417] rounded-xl p-6 sm:p-8 border border-[#1a3a24] hover:border-[#0ae448]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-[#0ae448] uppercase tracking-widest">&#123; Clause 0{i + 1} &#125;</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#0ae448] transition-colors">{s.title}</h2>
                  <p className="text-sm sm:text-base leading-relaxed text-[#8ea896] font-normal">{s.text}</p>
                  {s.link && (
                    <div className="mt-4">
                      <Link href={s.link.href} className="btn-gsap-ghost inline-flex">
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
