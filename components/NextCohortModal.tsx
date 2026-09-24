"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Twitter, 
  CheckCircle2, 
  ArrowUpRight,
  GraduationCap
} from "lucide-react";

interface NextCohortModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NextCohortModal({ isOpen, onClose }: NextCohortModalProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
        onClose();
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container (Soft Rounded 2XL) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-lg overflow-hidden z-10 my-8 shadow-2xl bg-[#0c2616] border border-[#1d442a] rounded-2xl text-white"
          >
            {/* Modal Header */}
            <div className="relative p-6 sm:p-8 text-center bg-[#0a2012] border-b border-[#1d442a]">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-[#0c2616] border border-[#1d442a] text-[#a3caad] hover:text-white hover:border-[#389456]"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              {/* Naked Graduation Icon */}
              <div className="text-[#389456] flex justify-center mb-3">
                <GraduationCap size={38} />
              </div>

              <div className="mb-2">
                <span className="annotation-curly inline-flex items-center gap-1.5 !text-xs">
                  <Sparkles size={13} className="text-[#f3ae29]" /> Cohort 1 Completed
                </span>
              </div>

              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                Next Cohort Opening Soon<span className="text-[#389456]">.</span>
              </h3>

              <p className="text-sm text-[#a3caad] max-w-sm mx-auto leading-relaxed">
                Cohort 1 has wrapped up. Leave your email to receive priority invitation when applications open.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 bg-[#0c2616]">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 text-center text-white bg-[#0a2012] border border-[#389456] rounded-xl shadow-inner"
                >
                  <CheckCircle2 size={36} className="mx-auto mb-3 text-[#389456]" />
                  <h4 className="font-serif-heading text-xl font-bold mb-1 text-white">You&apos;re on the priority list!</h4>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#a3caad]">
                    We&apos;ll notify you via email as soon as Cohort 2 dates are announced.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#d1e7d8] mb-2 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3.5 text-sm bg-[#0a2012] border border-[#1d442a] rounded-xl text-white placeholder-[#a3caad]/40 focus:outline-none focus:border-[#389456] focus:ring-1 focus:ring-[#389456] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gsap-cta w-full flex items-center justify-center gap-2 !rounded-xl !py-3.5"
                  >
                    <span>Get Notified for Cohort 2</span>
                    <ArrowUpRight size={16} className="text-[#f3ae29]" />
                  </button>
                </form>
              )}

              {/* Social Channels (Naked Icons) */}
              <div className="mt-8 pt-6 border-t border-[#1d442a] text-center">
                <p className="font-mono text-xs uppercase tracking-wider text-[#a3caad] mb-4">
                  Follow us for real-time updates
                </p>
                <div className="flex justify-center items-center gap-4">
                  {[
                    { icon: Linkedin, href: "https://www.linkedin.com/company/himmatkaar/", label: "LinkedIn" },
                    { icon: Instagram, href: "https://www.instagram.com/himmatkaar", label: "Instagram" },
                    { icon: Facebook, href: "https://www.facebook.com/himmatkaar", label: "Facebook" },
                    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-[#a3caad] hover:text-[#f3ae29] hover:scale-110 transition-all p-1"
                    >
                      <social.icon size={19} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
