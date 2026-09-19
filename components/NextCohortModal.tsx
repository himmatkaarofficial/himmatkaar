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
  Send,
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-lg overflow-hidden z-10 my-8 shadow-2xl bg-[#0e2417] border border-[#1a3a24] rounded-2xl text-white"
          >
            {/* Modal Header */}
            <div className="relative p-6 sm:p-8 text-center bg-[#08170d] border-b border-[#1a3a24]">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all bg-[#0e2417] border border-[#1a3a24] text-white hover:text-[#0ae448] hover:border-[#0ae448]"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              <div className="w-16 h-16 rounded-full bg-[#0e2417] border border-[#0ae448]/40 text-[#0ae448] flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(10,228,72,0.15)]">
                <GraduationCap size={32} />
              </div>

              <div className="mb-2">
                <span className="annotation-curly inline-flex items-center gap-1.5">
                  &#123; <Sparkles size={12} className="text-[#0ae448]" /> Cohort 1 Completed &#125;
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                Next Cohort Opening Soon<span className="text-[#0ae448]">.</span>
              </h3>

              <p className="text-sm text-[#a8d5b5] max-w-sm mx-auto leading-relaxed">
                Cohort 1 has wrapped up. Leave your email to receive early access when applications open.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 bg-[#0e2417]">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 text-center text-white bg-[#08170d] border border-[#0ae448]/40 rounded-xl shadow-inner"
                >
                  <CheckCircle2 size={40} className="mx-auto mb-3 text-[#0ae448]" />
                  <h4 className="text-xl font-bold mb-1 text-white">You&apos;re on the priority list!</h4>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#a8d5b5]">
                    We&apos;ll notify you via email as soon as Cohort 2 dates are announced.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#a8d5b5] mb-2 font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-5 py-3.5 text-sm bg-[#08170d] border border-[#1a3a24] rounded-full text-white placeholder-[#a8d5b5]/40 focus:outline-none focus:border-[#0ae448] focus:ring-1 focus:ring-[#0ae448] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-gsap-cta w-full flex items-center justify-center gap-2"
                  >
                    <span>Get Notified for Cohort 2</span>
                    <Send size={14} />
                  </button>
                </form>
              )}

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-[#1a3a24] text-center">
                <p className="font-mono text-xs uppercase tracking-wider text-[#a8d5b5] mb-4">
                  Follow us for real-time updates
                </p>
                <div className="flex justify-center items-center gap-3">
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
                      className="w-10 h-10 rounded-full bg-[#08170d] border border-[#1a3a24] text-white hover:text-[#0ae448] hover:border-[#0ae448] flex items-center justify-center transition-colors"
                    >
                      <social.icon size={18} />
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
