"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  ArrowUpRight,
  Lock,
  CheckCircle2,
  Sparkles,
  X,
  Share2
} from "lucide-react";

export interface EventDetail {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  type?: string;
  image: string;
  status?: string;
  registration_link?: string;
  registration_closed?: boolean;
}

interface EventDetailModalProps {
  event: EventDetail | null;
  onClose: () => void;
}

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  // ESC Key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (event) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const isUpcoming =
    (event.status || "").toLowerCase() === "upcoming" ||
    (event.status || "").toLowerCase().includes("registration") ||
    (event.status || "").toLowerCase().includes("early") ||
    (event.status || "").toLowerCase().includes("coming");

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

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
          className="relative z-10 w-full max-w-2xl bg-[#0c2616] border border-[#1d442a] rounded-2xl shadow-2xl overflow-hidden text-white my-8"
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
                  isUpcoming
                    ? "bg-[#10321e] text-[#389456] border-[#275836]"
                    : "bg-[#162a1c] text-[#a3caad] border-[#1d442a]"
                }`}
              >
                {isUpcoming ? "• Upcoming Event" : "• Past Event Showcase"}
              </span>
              {event.type && (
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#275836]/40 text-[#f3ae29] border border-[#f3ae29]/30">
                  {event.type}
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

          {/* Banner Image */}
          {event.image && (
            <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-[#07190e]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c2616] via-transparent to-transparent opacity-90" />
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Title */}
            <div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {event.title}
              </h2>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0a2012] border border-[#1d442a] rounded-xl p-4 text-xs font-mono text-[#d1e7d8]">
              <div className="flex items-center gap-2.5">
                <Calendar size={16} className="text-[#f3ae29] shrink-0" />
                <div>
                  <span className="text-[#a3caad]/70 block text-[10px] uppercase">Date</span>
                  <span className="font-semibold">{formatDate(event.date)}</span>
                </div>
              </div>

              {event.time && (
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-[#389456] shrink-0" />
                  <div>
                    <span className="text-[#a3caad]/70 block text-[10px] uppercase">Time</span>
                    <span className="font-semibold">{event.time}</span>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-center gap-2.5 sm:col-span-2">
                  <MapPin size={16} className="text-[#389456] shrink-0" />
                  <div>
                    <span className="text-[#a3caad]/70 block text-[10px] uppercase">Location</span>
                    <span className="font-semibold">{event.location}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-xs font-mono text-[#389456] uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#f3ae29]" /> Event Details &amp; Overview
              </p>
              <p className="text-sm text-[#d1e7d8] leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Action Bar / Registration Status */}
            <div className="pt-4 border-t border-[#1d442a] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#a3caad]">
                {event.registration_closed ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-800/60 text-red-300 font-bold">
                    <Lock size={14} /> Registration Closed
                  </span>
                ) : isUpcoming ? (
                  <span className="inline-flex items-center gap-1.5 text-[#389456]">
                    <CheckCircle2 size={15} /> Registrations Open
                  </span>
                ) : (
                  <span className="text-[#a3caad]/80">Event Completed</span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {isUpcoming && !event.registration_closed && event.registration_link ? (
                  <a
                    href={event.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2d7a46] hover:bg-[#389456] text-white rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-[#389456]/20 cursor-pointer"
                  >
                    <span>Register Now</span>
                    <ArrowUpRight size={16} className="text-[#f3ae29]" />
                  </a>
                ) : isUpcoming && !event.registration_closed ? (
                  <button
                    onClick={() => alert("Registration link will be updated soon!")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2d7a46]/80 hover:bg-[#2d7a46] text-white rounded-xl font-semibold text-sm transition-all cursor-pointer"
                  >
                    <span>Registration Details</span>
                    <ArrowUpRight size={16} className="text-[#f3ae29]" />
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#10321e] hover:bg-[#163c24] text-[#d1e7d8] border border-[#1d442a] rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
