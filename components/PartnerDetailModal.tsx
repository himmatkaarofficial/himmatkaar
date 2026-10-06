"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Building2, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

export interface PartnerDetail {
  id?: string;
  name: string;
  logo_url: string;
  category?: "managing" | "tech";
  description?: string;
  website_url?: string;
}

interface PartnerDetailModalProps {
  partner: PartnerDetail | null;
  onClose: () => void;
}

export default function PartnerDetailModal({
  partner,
  onClose,
}: PartnerDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (partner) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [partner, onClose]);

  if (!partner) return null;

  const isTech = partner.category === "tech";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-[#0c2616] border border-[#1d442a] rounded-2xl shadow-2xl overflow-hidden text-white my-8"
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1d442a] bg-[#0a2012]/80">
            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${
                  isTech
                    ? "bg-[#10321e] text-[#f3ae29] border-[#f3ae29]/40 flex items-center gap-1.5"
                    : "bg-[#10321e] text-[#389456] border-[#275836] flex items-center gap-1.5"
                }`}
              >
                {isTech ? <Cpu size={13} /> : <Building2 size={13} />}
                {isTech ? "Tech Partner" : "Managing Partner"}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#a3caad] hover:text-white hover:bg-[#10321e] rounded-xl transition-all font-mono text-xs flex items-center gap-1 cursor-pointer"
            >
              <X size={16} /> Close
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* White Logo Card Container */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl border border-[#2d7a46]/30 shadow-lg relative h-40 w-full">
              <div className="relative w-full h-full max-w-[200px]">
                <Image
                  src={partner.logo_url}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="300px"
                />
              </div>
            </div>

            {/* Partner Info */}
            <div className="text-center sm:text-left space-y-2">
              <h3 className="font-serif-heading text-2xl font-bold text-white tracking-tight">
                {partner.name}
              </h3>
              <p className="text-xs font-mono text-[#389456] uppercase tracking-wider font-semibold">
                Official HimmatKaar Collaborative Partner
              </p>
            </div>

            {/* Details Description */}
            <div className="bg-[#0a2012] border border-[#1d442a] rounded-xl p-5">
              <p className="text-xs font-mono text-[#f3ae29] uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                <Sparkles size={14} /> Partner Overview & Mission
              </p>
              <p className="text-sm text-[#d1e7d8] leading-relaxed">
                {partner.description ||
                  `${partner.name} collaborates with HimmatKaar to empower youth, provide industrial exposure, and create professional growth pathways across Pakistan.`}
              </p>
            </div>

            {/* Website Link if available */}
            {partner.website_url && (
              <a
                href={partner.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2d7a46] hover:bg-[#389456] text-white rounded-xl text-xs font-bold font-mono transition-all shadow-md cursor-pointer"
              >
                <ExternalLink size={15} /> Visit Official Website
              </a>
            )}

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#1d442a] flex items-center justify-between text-xs font-mono text-[#a3caad]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#389456]" /> Verified Partner
              </span>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#10321e] hover:bg-[#163c24] text-[#d1e7d8] border border-[#1d442a] rounded-xl font-mono font-bold text-xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
