"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrackCard } from "@/components/ui/TrackCard";

interface Track {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

interface ProgramTracksSectionProps {
  tracks: Track[];
}

const TRACK_THEMES = [
  {
    badgeLabel: "Track 01 · Launchpad",
  },
  {
    badgeLabel: "Track 02 · Workshops",
  },
  {
    badgeLabel: "Track 03 · Networking",
  },
];

export const ProgramTracksSection: React.FC<ProgramTracksSectionProps> = ({ tracks }) => {
  return (
    <section className="bg-[#08170d] py-20 sm:py-24 lg:py-28 relative border-t border-[#1a3a24]">
      {/* Ambient green glow */}
      <div className="glow-green-orb w-[400px] h-[400px] top-1/3 -left-32 opacity-25" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <div className="mb-4 sm:mb-5">
            <span className="annotation-curly">
              Our Tracks
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-4">
            Three Pathways to{" "}
            <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
              Impact!
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] font-normal max-w-xl">
            Explore our initiatives designed to empower your journey from student to industry leader.
          </p>
        </motion.div>

        {/* Track Cards Responsive Grid: 1 col (mobile), 2 col (tablet), 3 col (laptop/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => {
            const theme = TRACK_THEMES[index % TRACK_THEMES.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <TrackCard
                  icon={track.icon}
                  title={track.title}
                  description={track.description}
                  href={track.href}
                  badgeLabel={theme.badgeLabel}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


