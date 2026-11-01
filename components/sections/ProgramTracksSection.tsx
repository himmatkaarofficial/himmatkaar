"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrackCard } from "@/components/ui/TrackCard";

interface Track {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  trajectory?: string[];
}

interface ProgramTracksSectionProps {
  tracks: Track[];
}

const TRACK_THEMES = [
  {
    badgeLabel: "Track 01 · Launchpad",
    trackNumber: "01",
    trajectory: ["Fundamentals", "Mentorship", "Live Placement"],
  },
  {
    badgeLabel: "Track 02 · Technical",
    trackNumber: "02",
    trajectory: ["Code & Tools", "Live Project", "Portfolio"],
  },
  {
    badgeLabel: "Track 03 · Networking",
    trackNumber: "03",
    trajectory: ["Meet Leaders", "Build Network", "Get Hired"],
  },
];

export const ProgramTracksSection: React.FC<ProgramTracksSectionProps> = ({ tracks }) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  return (
    <section id="programs" className="bg-[#0a2012] py-20 sm:py-24 lg:py-28 relative border-t border-[#1d442a]">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4">
            <span className="annotation-curly">
              Program Initiatives
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-4">
            Three Pathways to{" "}
            <span className="text-[#389456] italic">
              Impact!
            </span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#a3caad] font-normal">
            Choose your direction. Click any pathway to highlight its trajectory, accelerate high-demand skills, build real projects, and connect directly with industry leaders.
          </p>
        </motion.div>

        {/* Track Cards Responsive Grid: 1 col (mobile), 2 col (tablet), 3 col (desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {tracks.map((track, index) => {
            const theme = TRACK_THEMES[index % TRACK_THEMES.length];
            const isActive = activeTrackIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="h-full"
              >
                <TrackCard
                  icon={track.icon}
                  title={track.title}
                  description={track.description}
                  href={track.href}
                  badgeLabel={theme.badgeLabel}
                  trackNumber={theme.trackNumber}
                  trajectory={track.trajectory || theme.trajectory}
                  isActive={isActive}
                  onClick={() => setActiveTrackIndex(index)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};



