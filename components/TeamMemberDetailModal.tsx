"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  MapPin,
  GraduationCap,
  Sparkles,
  X,
  UserCheck,
  Building2,
  Award
} from "lucide-react";
import TeamCardImage from "@/components/TeamCardImage";

export interface TeamMemberDetail {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  city?: string;
  university?: string;
  type?: "core-team" | "ambassador" | "team";
}

interface TeamMemberDetailModalProps {
  member: TeamMemberDetail | null;
  onClose: () => void;
}

export default function TeamMemberDetailModal({
  member,
  onClose,
}: TeamMemberDetailModalProps) {
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (member) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [member, onClose]);

  if (!member) return null;

  const isAmbassador =
    member.type === "ambassador" ||
    (member.role || "").toLowerCase().includes("ambassador") ||
    !!member.city;

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
          className="relative z-10 w-full max-w-lg bg-[#0c2616] border border-[#1d442a] rounded-2xl shadow-2xl overflow-hidden text-white my-8"
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
                  isAmbassador
                    ? "bg-[#10321e] text-[#f3ae29] border-[#f3ae29]/40"
                    : "bg-[#10321e] text-[#389456] border-[#275836]"
                }`}
              >
                {isAmbassador ? "• Campus Ambassador" : "• Core Team Leadership"}
              </span>
              {member.city && (
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#275836]/40 text-[#a3caad] border border-[#275836]">
                  📍 {member.city}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#a3caad] hover:text-white hover:bg-[#10321e] rounded-xl transition-all font-mono text-xs flex items-center gap-1 cursor-pointer"
            >
              <X size={16} /> Close
            </button>
          </div>

          {/* Profile Card Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Member Profile Avatar & Main Titles */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#2d7a46] shrink-0 shadow-xl bg-[#0a2012]">
                <TeamCardImage
                  src={member.image}
                  alt={member.name}
                  name={member.name}
                  sizes="150px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-[#389456] uppercase tracking-wider font-semibold mb-3">
                  {member.role}
                </p>

                {member.university && (
                  <p className="text-xs font-mono text-[#a3caad] flex items-center justify-center sm:justify-start gap-1.5 mb-3">
                    <GraduationCap size={14} className="text-[#f3ae29]" />
                    <span>{member.university}</span>
                  </p>
                )}

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Linkedin size={15} /> View LinkedIn Profile
                  </a>
                )}
              </div>
            </div>

            {/* Member Bio / Profile Details */}
            {member.bio && (
              <div className="bg-[#0a2012] border border-[#1d442a] rounded-xl p-5">
                <p className="text-xs font-mono text-[#f3ae29] uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                  <Sparkles size={14} /> Profile &amp; Background
                </p>
                <p className="text-sm text-[#d1e7d8] leading-relaxed">
                  {member.bio}
                </p>
              </div>
            )}

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#1d442a] flex items-center justify-between text-xs font-mono text-[#a3caad]">
              <span className="flex items-center gap-1.5">
                <UserCheck size={14} className="text-[#389456]" /> Verified HimmatKaar Representative
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
