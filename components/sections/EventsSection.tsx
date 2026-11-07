"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EventCard } from "@/components/ui/EventCard";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EventDetailModal, { EventDetail } from "@/components/EventDetailModal";

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<EventDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events?limit=50&status=upcoming", { cache: "no-store" });
        const data = await response.json();
        if (response.ok && data.events && data.events.length > 0) {
          setEvents(data.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Failed to fetch upcoming events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  // Only show this section if upcoming events have been added via admin panel
  if (loading || events.length === 0) {
    return null;
  }

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
              Join us for exciting masterclasses, fellowship meetups, and leadership opportunities in Faisalabad. Click any card for details.
            </p>
          </div>
          <Link href="/events" className="btn-gsap-ghost flex-shrink-0 self-start sm:self-auto !rounded-xl">
            <span>View All Events</span>
            <ArrowUpRight size={16} className="text-[#f3ae29]" />
          </Link>
        </motion.div>

        {/* Events Grid */}
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
                date={formatDate(event.date)}
                description={event.description}
                location={event.location}
                onClick={() => setSelectedEvent(event)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </section>
  );
};
