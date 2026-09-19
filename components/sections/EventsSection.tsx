"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EventCard } from "@/components/ui/EventCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
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
            { id: "1", title: "Startup Pitch Competition 2026", date: "2026-03-25", image: "/events/event-slide-1.jpg", description: "Compete for seed funding and mentorship opportunities with leading investors." },
            { id: "2", title: "Tech Skills & AI Bootcamp", date: "2026-04-10", image: "/events/event-slide-2.jpg", description: "Intensive bootcamp covering web development, mobile apps, and AI fundamentals." },
            { id: "3", title: "Community Earth & Social Impact Summit", date: "2026-04-20", image: "/events/event-slide-4.jpg", description: "Join social entrepreneurs and changemakers to discuss sustainable community solutions." }
          ]);
        }
      } catch {
        setEvents([
          { id: "1", title: "Startup Pitch Competition 2026", date: "2026-03-25", image: "/events/event-slide-1.jpg", description: "Compete for seed funding and mentorship opportunities with leading investors." },
          { id: "2", title: "Tech Skills & AI Bootcamp", date: "2026-04-10", image: "/events/event-slide-2.jpg", description: "Intensive bootcamp covering web development, mobile apps, and AI fundamentals." },
          { id: "3", title: "Community Earth & Social Impact Summit", date: "2026-04-20", image: "/events/event-slide-4.jpg", description: "Join social entrepreneurs and changemakers to discuss sustainable community solutions." }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <section className="bg-[#08170d] py-20 md:py-28 border-t border-[#1a3a24] text-white relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#0ae448]/5 blur-[120px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

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
                &#123; Upcoming Events &#125;
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.08]">
              Upcoming{" "}
              <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                Events!
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] max-w-lg font-normal">
              Join us for exciting events, workshops, and community opportunities across Pakistan.
            </p>
          </div>
          <Link href="/events" className="btn-gsap-ghost flex-shrink-0 self-start sm:self-auto">
            View All Events <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-16">
            <p className="font-mono text-sm text-[#a8d5b5]/60 animate-pulse">Loading events...</p>
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
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

