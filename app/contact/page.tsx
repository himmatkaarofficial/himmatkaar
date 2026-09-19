"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--color-espresso)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-controls)',
  padding: '12px 16px',
  color: 'var(--color-text-primary)',
  fontSize: '14px',
  fontFamily: 'var(--font-sans-gallery)',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '9px',
  fontWeight: 700,
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
  fontFamily: 'var(--font-sans-gallery)',
  marginBottom: '6px',
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", university: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", university: "", message: "" });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    { icon: <Mail size={18} style={{ color: 'var(--color-badge-gold)' }} />, title: 'Email Us', items: ['hello@himmatkaar.com'], bg: 'var(--color-field-deep)' },
    { icon: <Phone size={18} style={{ color: 'var(--color-badge-mint)' }} />, title: 'Call Us', items: ['0342-4853908', 'Mon–Fri, 9am–5pm PKT'], bg: 'var(--color-field-olive)' },
    { icon: <MapPin size={18} style={{ color: 'var(--color-badge-gold)' }} />, title: 'Visit Us', items: ['Remote', 'Serving students nationwide'], bg: 'var(--color-field-deep)' },
  ];

  const timeline = [
    "Applications reviewed within 1 week",
    "Interviews scheduled for shortlisted candidates",
    "Final decisions communicated within 2 weeks",
    "Next cohort begins orientation soon",
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-text-primary)', overflowX: 'hidden' }}>
      <Navbar />

      <main className="pt-20">

        {/* ── Page Header ── */}
        <section style={{ background: 'var(--color-canvas)', padding: '24px 0 40px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="annotation-curly">
                  &#123; Get in Touch &#125;
                </span>
              </div>
              <h1 
                className="mb-4 text-white font-bold leading-[1.05] tracking-tight max-w-3xl"
                style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
              >
                Start Your{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Journey!
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] max-w-2xl font-normal">
                Whether you&apos;re ready to apply for the fellowship, want to become a mentor, or just have a question, we&apos;d love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Main Content ── */}
        <section className="bg-[#08170d] pb-20 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-5 gap-8">

              {/* Left — Contact Info & Timeline Cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 flex flex-col gap-4"
              >
                {contactItems.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#0e2417] rounded-xl p-6 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 flex items-start gap-4 group"
                  >
                    <div className="p-2.5 rounded-lg bg-[#08170d] border border-[#1a3a24] text-[#0ae448] shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-mono text-[#0ae448] tracking-widest uppercase mb-1">&#123; {item.title} &#125;</p>
                      {item.items.map((line, j) => (
                        <p key={j} className="text-sm sm:text-base text-white font-medium leading-snug">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Timeline Card */}
                <div className="bg-[#0e2417] rounded-xl p-6 border border-[#1a3a24] mt-2">
                  <p className="text-xs font-mono text-[#0ae448] tracking-widest uppercase mb-4">&#123; Application Timeline &#125;</p>
                  <ul className="space-y-3.5">
                    {timeline.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#08170d] border border-[#0ae448]/40 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-mono font-bold text-[#0ae448]">{i + 1}</span>
                        </div>
                        <span className="text-xs sm:text-sm text-[#8ea896] leading-snug font-normal">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Right — Form Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-3"
              >
                <div className="bg-[#0e2417] rounded-2xl p-6 sm:p-10 border border-[#1a3a24]">
                  <span className="annotation-curly mb-3 inline-block">&#123; Application Form &#125;</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
                    Fill in your details to apply or inquire.
                  </h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#08170d] rounded-xl p-8 sm:p-12 text-center border border-[#0ae448]/40"
                    >
                      <CheckCircle2 size={48} className="text-[#0ae448] mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-sm text-[#8ea896] font-normal">
                        Thank you for reaching out. We&apos;ll get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#8ea896] mb-1">Full Name *</label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#08170d] border border-[#1a3a24] rounded-lg px-4 py-3 text-white text-sm focus:border-[#0ae448] outline-none transition-colors" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#8ea896] mb-1">Email Address *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#08170d] border border-[#1a3a24] rounded-lg px-4 py-3 text-white text-sm focus:border-[#0ae448] outline-none transition-colors" placeholder="john@example.com" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#8ea896] mb-1">Phone Number *</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-[#08170d] border border-[#1a3a24] rounded-lg px-4 py-3 text-white text-sm focus:border-[#0ae448] outline-none transition-colors" placeholder="+92 XXX XXXXXXX" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#8ea896] mb-1">University / College *</label>
                          <input type="text" name="university" value={formData.university} onChange={handleChange} required className="w-full bg-[#08170d] border border-[#1a3a24] rounded-lg px-4 py-3 text-white text-sm focus:border-[#0ae448] outline-none transition-colors" placeholder="Your institution name" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-[#8ea896] mb-1">Why do you want to join? *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full bg-[#08170d] border border-[#1a3a24] rounded-lg px-4 py-3 text-white text-sm focus:border-[#0ae448] outline-none transition-colors resize-none"
                          placeholder="Tell us about your background, goals, and why you're a great fit for HimmatKaar..."
                        />
                      </div>
                      <div className="pt-2">
                        <button type="submit" className="btn-gsap-cta w-full justify-center flex items-center gap-2">
                          Submit Application <Send size={14} />
                        </button>
                        <p className="text-[11px] font-mono text-[#8ea896] text-center mt-3">
                          By submitting, you agree to our privacy policy and terms of service.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
