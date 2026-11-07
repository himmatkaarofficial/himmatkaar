"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, MessageSquare, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", university: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState<number>(0);

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
    { icon: Mail, title: 'Email Us', items: ['hello@himmatkaar.com', 'admissions@himmatkaar.com'], note: 'Direct email support within 24 hours' },
    { icon: Phone, title: 'Helpline & WhatsApp', items: ['0342-4853908', 'Mon–Fri, 9am–5pm PKT'], note: 'Direct WhatsApp and voice admissions query' },
    { icon: MapPin, title: 'Faisalabad Headquarters', items: ['Faisalabad, Pakistan', 'Local Campus Hubs'], note: 'On-ground campus workshops & local cohorts' },
  ];

  const timeline = [
    { stage: "01", title: "Form Submission", desc: "Applications reviewed within 48 to 72 hours" },
    { stage: "02", title: "Diagnostic Screening", desc: "Interviews & problem-solving task for shortlisted applicants" },
    { stage: "03", title: "Cohort Admission", desc: "Final fellowship decisions communicated directly via email" },
    { stage: "04", title: "Orientation & Launch", desc: "Cohort onboarding, mentor matching, and kit distribution" },
  ];

  return (
    <div className="min-h-screen bg-[#07190e] text-white flex flex-col font-sans selection:bg-[#2d7a46] selection:text-white">
      <Navbar />

      <main className="pt-20 flex-grow">

        {/* ── Page Header ── */}
        <section className="bg-gradient-to-b from-[#0c2616] to-[#07190e] py-16 sm:py-20 border-b border-[#1d442a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#07190e] border border-[#1d442a] text-[#f3ae29] text-xs font-mono uppercase tracking-widest mb-4">
                <MessageSquare size={14} className="text-[#f3ae29]" />
                <span>Get in Touch & Inquire</span>
              </div>
              <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1] max-w-3xl">
                Start Your{" "}
                <span className="text-[#389456]">
                  Journey
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#d1e7d8] max-w-2xl font-normal leading-relaxed">
                Whether you&apos;re ready to apply for the LaunchPad fellowship, explore corporate partnerships, or apply as a campus ambassador, our team is here for you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CRISP LIGHT SECTION: Contact Info & Form ── */}
        <section className="bg-[#f8faf7] py-16 sm:py-24 border-b border-[#e2ede4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-5 gap-8">

              {/* Left — Contact Channels & Timeline */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 flex flex-col gap-6"
              >
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e8f5ec] text-[#2d7a46] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                    <Sparkles size={14} className="text-[#2d7a46]" /> Channels & Support
                  </span>
                  <h3 className="font-serif-heading text-2xl font-bold text-[#0c2616] mb-1">Reach Out Directly</h3>
                  <p className="text-xs text-slate-600 mb-4">Click any channel below to highlight connection details:</p>
                </div>

                <div className="space-y-4">
                  {contactItems.map((item, i) => {
                    const IconComponent = item.icon;
                    const isSelected = selectedChannelId === i;
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedChannelId(i)}
                        className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                          isSelected
                            ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-lg ring-2 ring-[#2d7a46]/30 scale-[1.02]"
                            : "bg-white text-slate-900 border-[#e2ede4] hover:border-[#2d7a46]/50 shadow-sm"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <IconComponent 
                            size={22} 
                            className={`shrink-0 mt-0.5 ${isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"}`} 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className={`text-xs font-mono font-bold uppercase tracking-wider ${
                                isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"
                              }`}>
                                {item.title}
                              </p>
                              {isSelected && (
                                <span className="text-[10px] font-mono text-[#389456] bg-[#163e24] px-2 py-0.5 rounded font-semibold">
                                  Active
                                </span>
                              )}
                            </div>
                            {item.items.map((line, j) => (
                              <p key={j} className={`text-sm font-semibold leading-snug ${
                                isSelected ? "text-white" : "text-[#0c2616]"
                              }`}>
                                {line}
                              </p>
                            ))}
                            <p className={`text-xs mt-2 ${
                              isSelected ? "text-[#a3caad]" : "text-slate-500"
                            }`}>
                              {item.note}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Crisp White Application Timeline Card */}
                <div className="bg-white rounded-2xl p-6 border border-[#e2ede4] shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} className="text-[#2d7a46]" />
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0c2616]">
                      Application & Response Timeline
                    </p>
                  </div>
                  <ul className="space-y-3.5">
                    {timeline.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-[#e8f5ec] text-[#2d7a46] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {step.stage}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-[#0c2616]">{step.title}</p>
                          <p className="text-xs text-slate-600 leading-snug">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Right — Crisp White Form Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e2ede4] shadow-md">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e8f5ec] text-[#2d7a46] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                    <Send size={13} className="text-[#2d7a46]" /> Direct Message Form
                  </span>
                  <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#0c2616] mb-2 tracking-tight">
                    Send Us an Inquiry or Application
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mb-8 leading-relaxed">
                    Please provide accurate details so our admissions committee or partnerships team can connect with you.
                  </p>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#e8f5ec] rounded-2xl p-8 sm:p-12 text-center border border-[#2d7a46]/40"
                    >
                      <CheckCircle2 size={48} className="text-[#2d7a46] mx-auto mb-4" />
                      <h3 className="font-serif-heading text-2xl font-bold text-[#0c2616] mb-2">Message Successfully Sent!</h3>
                      <p className="text-sm text-slate-700 max-w-md mx-auto">
                        Thank you for reaching out to HimmatKaar. An admissions coordinator will review your submission and reply shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 mb-1.5">
                            Full Name *
                          </label>
                          <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            className="w-full bg-[#f8faf7] border border-[#e2ede4] rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-[#2d7a46] focus:bg-white outline-none transition-colors" 
                            placeholder="e.g. Ayesha Khan" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 mb-1.5">
                            Email Address *
                          </label>
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            className="w-full bg-[#f8faf7] border border-[#e2ede4] rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-[#2d7a46] focus:bg-white outline-none transition-colors" 
                            placeholder="name@example.com" 
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 mb-1.5">
                            Phone / WhatsApp *
                          </label>
                          <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            className="w-full bg-[#f8faf7] border border-[#e2ede4] rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-[#2d7a46] focus:bg-white outline-none transition-colors" 
                            placeholder="+92 3XX XXXXXXX" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 mb-1.5">
                            University / Organization *
                          </label>
                          <input 
                            type="text" 
                            name="university" 
                            value={formData.university} 
                            onChange={handleChange} 
                            required 
                            className="w-full bg-[#f8faf7] border border-[#e2ede4] rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-[#2d7a46] focus:bg-white outline-none transition-colors" 
                            placeholder="e.g. NUST / LUMS / UET / Other" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 mb-1.5">
                          How can we support your journey? *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full bg-[#f8faf7] border border-[#e2ede4] rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-[#2d7a46] focus:bg-white outline-none transition-colors resize-none"
                          placeholder="Tell us about your educational background, which program you're interested in, or any questions you have..."
                        />
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit" 
                          className="w-full py-4 rounded-xl bg-[#2d7a46] text-white font-bold hover:bg-[#389456] transition-colors flex items-center justify-center gap-2 shadow-md text-sm sm:text-base"
                        >
                          Submit Inquiry <Send size={16} />
                        </button>
                        <p className="text-[11px] font-mono text-slate-500 text-center mt-3">
                          By submitting this form, you agree to our privacy policy and terms of communications.
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
