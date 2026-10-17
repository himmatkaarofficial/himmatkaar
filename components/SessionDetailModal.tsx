"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Award, 
  Camera, 
  BookOpen,
  Sparkles,
  Maximize2,
  Linkedin,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { CohortSession, SessionPhoto } from "@/lib/cohort1-data";

interface SessionDetailModalProps {
  session: CohortSession | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SessionDetailModal({
  session,
  isOpen,
  onClose,
}: SessionDetailModalProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const photos = session?.sessionPhotos || [];
  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  const openPhoto = (index: number) => setSelectedPhotoIndex(index);
  const closePhoto = () => setSelectedPhotoIndex(null);
  const goNext = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
  }, [selectedPhotoIndex, photos.length]);
  const goPrev = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
  }, [selectedPhotoIndex, photos.length]);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedPhotoIndex !== null) {
          closePhoto();
        } else {
          onClose();
        }
      } else if (e.key === "ArrowRight" && selectedPhotoIndex !== null) {
        goNext();
      } else if (e.key === "ArrowLeft" && selectedPhotoIndex !== null) {
        goPrev();
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
  }, [isOpen, onClose, selectedPhotoIndex, goNext, goPrev]);

  if (!session) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#08170d]/90 backdrop-blur-xl transition-opacity"
          />

          {/* Main Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.05 }}
            className="relative w-full max-w-4xl bg-[#08170d] border border-[#1a3a24] rounded-2xl overflow-hidden z-10 my-6 max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(10,228,72,0.15)]"
          >
            {/* Modal Header Banner */}
            <div className="relative bg-[#0e2417] border-b border-[#1a3a24] text-white p-6 sm:p-8 shrink-0">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all bg-[#08170d] border border-[#1a3a24] text-[#8ea896] hover:text-[#0ae448] hover:border-[#0ae448]/50"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                <span className="font-mono text-xs font-bold text-[#0ae448] bg-[#08170d] border border-[#1a3a24] px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#0ae448]" /> Cohort 1 • Session {session.sessionNumber}
                </span>
                <span className="font-mono text-xs text-[#a8d5b5] bg-[#08170d] border border-[#1a3a24] px-3 py-1 rounded-full">
                  {session.category}
                </span>
                <span className="font-mono text-xs font-semibold text-[#0ae448] bg-[#0ae448]/10 border border-[#0ae448]/30 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={13} /> Completed
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight pr-10 mb-4 leading-snug">
                {session.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono uppercase text-[#8ea896]">
                <div className="flex items-center gap-2 bg-[#08170d] px-3 py-1.5 rounded-lg border border-[#1a3a24]">
                  <Calendar size={14} className="text-[#0ae448]" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#08170d] px-3 py-1.5 rounded-lg border border-[#1a3a24]">
                  <Clock size={14} className="text-[#0ae448]" />
                  <span>{session.time}</span>
                </div>
              </div>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1 custom-green-scrollbar bg-[#08170d]">
              {/* Mentor Profile Card */}
              <div className="bg-[#0e2417] rounded-xl border border-[#1a3a24] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-[#0ae448]/40 transition-all">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-[#0ae448]/40 shadow-lg">
                  <Image
                    src={session.mentor.photoUrl}
                    alt={session.mentor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-semibold text-[#0ae448] bg-[#08170d] border border-[#1a3a24] px-2.5 py-0.5 rounded-md">
                      {session.mentor.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 mb-1 font-sans">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {session.mentor.name}
                    </h3>
                    {session.mentor.linkedin && (
                      <a
                        href={session.mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0a66c2]/20 hover:bg-[#0a66c2]/30 text-[#70b5f9] border border-[#0a66c2]/40 rounded-lg text-xs font-semibold transition-all shrink-0"
                      >
                        <Linkedin size={14} /> LinkedIn
                      </a>
                    )}
                  </div>
                  <p className="text-xs font-mono text-[#a8d5b5] mb-2.5 flex items-center gap-1.5">
                    <Award size={14} className="text-[#0ae448]" />
                    Expertise: <span className="text-white font-semibold">{session.mentor.expertise}</span>
                  </p>
                  <p className="text-sm text-[#8ea896] leading-relaxed">
                    {session.mentor.bio}
                  </p>
                </div>
              </div>

              {/* Session Summary */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2.5 tracking-tight">
                  <BookOpen size={18} className="text-[#0ae448]" />
                  Session Summary
                </h4>
                <div className="bg-[#0e2417] rounded-xl p-5 border border-[#1a3a24] text-sm text-[#8ea896] leading-relaxed font-normal">
                  {session.summary}
                </div>
              </div>

              {/* Key Takeaways & Learnings */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2.5 tracking-tight">
                  <CheckCircle2 size={18} className="text-[#0ae448]" />
                  Key Takeaways &amp; Learnings
                </h4>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {session.keyTakeaways.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0e2417] rounded-xl p-4 border border-[#1a3a24] flex items-start gap-3 hover:border-[#0ae448]/40 transition-all"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#08170d] border border-[#1a3a24] text-[#0ae448] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={13} />
                      </div>
                      <span className="text-xs sm:text-sm text-[#a8d5b5] font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Moments & Photos Gallery */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5 tracking-tight">
                    <Camera size={18} className="text-[#0ae448]" />
                    Session Moments &amp; Highlights
                  </h4>
                  <span className="font-mono text-xs text-[#8ea896] bg-[#0e2417] px-3 py-1 rounded-full border border-[#1a3a24]">
                    {session.sessionPhotos.length} Photos Captured
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {session.sessionPhotos.map((photo) => (
                    <div
                      key={photo.id}
                    onClick={() => openPhoto(session.sessionPhotos.indexOf(photo))}
                      className="group relative overflow-hidden cursor-pointer aspect-[4/3] bg-[#0e2417] rounded-xl border border-[#1a3a24] hover:border-[#0ae448] transition-all duration-300 shadow-md"
                    >
                      <Image
                        src={photo.url}
                        alt={photo.caption}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08170d] via-[#08170d]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                        <p className="text-xs font-medium text-white line-clamp-2 leading-tight">
                          {photo.caption}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#0ae448] uppercase tracking-wider font-semibold mt-1">
                          <Maximize2 size={11} /> Expand Photo
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-[#0e2417] border-t border-[#1a3a24] p-4 sm:px-8 flex items-center justify-between shrink-0">
              <span className="font-mono text-xs text-[#8ea896] hidden sm:inline-block">
                &#123; Himmatkaar LaunchPad • Cohort 1 Archive &#125;
              </span>
              <button
                onClick={onClose}
                className="btn-gsap-cta text-sm !py-2.5 !px-6 w-full sm:w-auto text-center justify-center cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </motion.div>

          {/* Lightbox Photo Preview Sub-Modal */}
          <AnimatePresence>
            {selectedPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              onClick={closePhoto}
                className="fixed inset-0 z-60 bg-[#08170d]/95 backdrop-blur-2xl flex items-center justify-center p-4"
              >
                <button
                  onClick={closePhoto}
                  className="absolute top-6 right-6 text-white bg-[#0e2417] hover:bg-[#132f1f] p-2.5 rounded-full border border-[#1a3a24] hover:border-[#0ae448]"
                >
                  <X size={22} />
                </button>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-4xl w-full bg-[#08170d] border border-[#1a3a24] rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* Photo Counter */}
                  <div className="flex items-center justify-between px-4 pt-3 pb-1">
                    <span className="font-mono text-xs text-[#8ea896]">
                      {selectedPhotoIndex !== null ? selectedPhotoIndex + 1 : 0} / {photos.length}
                    </span>
                    <div className="flex items-center gap-1">
                      {photos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedPhotoIndex(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            i === selectedPhotoIndex ? "bg-[#0ae448] w-4" : "bg-[#1a3a24] hover:bg-[#0ae448]/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative aspect-[16/10] w-full bg-[#08170d]">
                    <Image
                      src={selectedPhoto!.url}
                      alt={selectedPhoto!.caption}
                      fill
                      className="object-contain"
                    />

                    {/* Prev Button */}
                    {photos.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#08170d]/80 hover:bg-[#0ae448]/20 border border-[#1a3a24] hover:border-[#0ae448] text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    )}

                    {/* Next Button */}
                    {photos.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); goNext(); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#08170d]/80 hover:bg-[#0ae448]/20 border border-[#1a3a24] hover:border-[#0ae448] text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                      >
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </div>

                  <div className="p-4 text-center bg-[#0e2417] border-t border-[#1a3a24]">
                    <p className="text-white font-medium text-sm sm:text-base">
                      {selectedPhoto!.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}

