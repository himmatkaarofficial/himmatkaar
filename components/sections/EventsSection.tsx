"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EventCard } from "@/components/ui/EventCard";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  location?: string;
}

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events?limit=3&status=upcoming");
        const data = await response.json();
        if (response.ok && data.events && data.events.length > 0) {
          setEvents(data.events);
        } else {
          setEvents([
            { id: "1", title: "Startup Pitch Competition 2026", date: "2026-03-25", image: "/events/event-slide-1.jpg", description: "Compete for seed funding and mentorship opportunities with leading industry executives.", location: "Faisalabad" },
            { id: "2", title: "Tech Skills & AI Masterclass", date: "2026-04-10", image: "/events/event-slide-2.jpg", description: "Intensive training covering web development, modern cloud tooling, and AI fundamentals.", location: "Lahore / Online" },
            { id: "3", title: "Community Youth Impact Summit", date: "2026-04-20", image: "/events/event-slide-4.jpg", description: "Join social entrepreneurs and changemakers to build scalable local community initiatives.", location: "Islamabad" }
          ]);
        }
      } catch {
        setEvents([
          { id: "1", title: "Startup Pitch Competition 2026", date: "2026-03-25", image: "/events/event-slide-1.jpg", description: "Compete for seed funding and mentorship opportunities with leading industry executives.", location: "Faisalabad" },
          { id: "2", title: "Tech Skills & AI Masterclass", date: "2026-04-10", image: "/events/event-slide-2.jpg", description: "Intensive training covering web development, modern cloud tooling, and AI fundamentals.", location: "Lahore / Online" },
          { id: "3", title: "Community Youth Impact Summit", date: "2026-04-20", image: "/events/event-slide-4.jpg", description: "Join social entrepreneurs and changemakers to build scalable local community initiatives.", location: "Islamabad" }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <section id="events" className="bg-[#0a2012] py-20 md:py-28 border-t border-[#1d442a] text-white relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <div className="mb-3">
              <span className="annotation-curly">
                Upcoming Events
              </span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.08]">
              Upcoming{" "}
              <span className="text-[#389456] italic">
                Events!
              </span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#a3caad] max-w-lg font-normal">
              Join us for exciting masterclasses, fellowship meetups, and leadership opportunities across Pakistan.
            </p>
          </div>
          <Link href="/events" className="btn-gsap-ghost flex-shrink-0 self-start sm:self-auto !rounded-xl">
            <span>View All Events</span>
            <ArrowUpRight size={16} className="text-[#f3ae29]" />
          </Link>
        </motion.div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-16">
            <p className="font-mono text-sm text-[#a3caad]/70 animate-pulse">Loading events...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <EventCard
                  image={event.image}
                  title={event.title}
                  date={new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  description={event.description}
                  location={event.location}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

