"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Users, ArrowUpRight, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventDetailModal, { EventDetail } from "@/components/EventDetailModal";

const EVENT_HERO_IMAGES = [
  "/events/event-slide-1.jpg",
  "/events/event-slide-2.jpg",
  "/events/event-slide-3.jpg",
  "/events/event-slide-4.jpg",
];

export default function Events() {
  const [events, setEvents] = useState<EventDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  // Background carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % EVENT_HERO_IMAGES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % EVENT_HERO_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + EVENT_HERO_IMAGES.length) % EVENT_HERO_IMAGES.length);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events?status=all', { cache: 'no-store' });
        const data = await response.json();
        if (response.ok && data.events && data.events.length > 0) {
          setEvents(data.events);
        } else {
          setEvents([
            { id: '1', title: "Youth Leadership Summit 2025", date: "2025-12-15", location: "Karachi Convention Center", image: "/events/event-slide-1.jpg", description: "A transformative summit bringing together young leaders from across Pakistan to discuss innovation and social impact.", type: "Summit", time: "09:00 AM", status: "past" },
            { id: '2', title: "Innovation & Tech Workshop Series", date: "2025-11-20", location: "Lahore Tech Hub", image: "/events/event-slide-2.jpg", description: "Hands-on workshops focused on design thinking, product development, and entrepreneurship skills.", type: "Workshop", time: "02:00 PM", status: "past" },
            { id: '3', title: "Faisalabad Community Open House", date: "2025-10-10", location: "Faisalabad Executive Center", image: "/events/event-slide-4.jpg", description: "An open house event showcasing student projects and connecting with community partners.", type: "Open House", time: "10:00 AM", status: "past" },
          ]);
        }
      } catch {
        setEvents([
          { id: '1', title: "Youth Leadership Summit 2025", date: "2025-12-15", location: "Karachi Convention Center", image: "/events/event-slide-1.jpg", description: "A transformative summit bringing together young leaders from across Pakistan to discuss innovation and social impact.", type: "Summit", time: "09:00 AM", status: "past" },
          { id: '2', title: "Innovation & Tech Workshop Series", date: "2025-11-20", location: "Lahore Tech Hub", image: "/events/event-slide-2.jpg", description: "Hands-on workshops focused on design thinking, product development, and entrepreneurship skills.", type: "Workshop", time: "02:00 PM", status: "past" },
          { id: '3', title: "Faisalabad Community Open House", date: "2025-10-10", location: "Faisalabad Executive Center", image: "/events/event-slide-4.jpg", description: "An open house event showcasing student projects and connecting with community partners.", type: "Open House", time: "10:00 AM", status: "past" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a2012] text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-24">

        {/* ── Page Hero with Animated Background Carousel ── */}
        <section className="relative text-white flex items-center overflow-hidden min-h-[550px] py-16 sm:py-20">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={EVENT_HERO_IMAGES[currentImageIndex]}
                alt={`Himmatkaar Event Slide ${currentImageIndex + 1}`}
                fill
                priority={currentImageIndex === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#07190e]/85 via-[#0a2012]/60 to-[#0c2616]/30" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a2012] via-transparent to-black/30" />
          <div className="absolute inset-0 z-10 bg-grid-subtle opacity-40 pointer-events-none" />

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-20 w-full">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm font-mono text-[#a3caad] hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back to Home
            </Link>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="mb-4">
                <span className="annotation-curly">
                  Himmatkaar Events Showcase
                </span>
              </div>
              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
                Empowering Conferences,{" "}
                <span className="text-[#389456] italic">Summits &amp; Workshops!</span>
              </h1>
              <p className="text-base sm:text-xl text-[#d1e7d8] font-normal leading-relaxed mb-8">
                Explore our past impact summits and upcoming masterclasses designed to build real-world leadership and skills across Pakistan. Click any event card to view full details.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/events/upcoming" className="btn-gsap-cta flex items-center gap-2 !rounded-xl !py-3.5 !px-7">
                  <span>Explore Upcoming Events</span>
                  <ArrowUpRight size={18} className="text-[#f3ae29]" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <button
            onClick={prevImage}
            className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-xl border border-[#1d442a] bg-[#0c2616]/80 hover:bg-[#10321e] hover:border-[#389456] transition-all backdrop-blur-md"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} className="text-[#e8f5ec]" />
          </button>
          <button
            onClick={nextImage}
            className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-xl border border-[#1d442a] bg-[#0c2616]/80 hover:bg-[#10321e] hover:border-[#389456] transition-all backdrop-blur-md"
            aria-label="Next image"
          >
            <ChevronRight size={22} className="text-[#e8f5ec]" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {EVENT_HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="h-2 rounded-sm transition-all duration-300"
                style={{
                  width: index === currentImageIndex ? '28px' : '8px',
                  background: index === currentImageIndex ? '#f3ae29' : 'rgba(232,245,236,0.3)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ── Events Grid ── */}
        <section className="bg-[#0a2012] py-20 border-t border-[#1d442a]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-[#389456]" size={40} />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {events.map((event, idx) => {
                  const isUpcoming = (event.status || "").toLowerCase() === "upcoming";
                  return (
                    <motion.div
                      key={event.id || idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      onClick={() => setSelectedEvent(event)}
                      className="bg-[#0c2616] rounded-2xl overflow-hidden border border-[#1d442a] hover:border-[#389456] transition-all duration-300 shadow-xl flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="relative h-52 w-full overflow-hidden bg-[#0a2012]">
                          <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="400px" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0c2616] via-transparent to-transparent opacity-75" />
                          <span className={`absolute top-3 right-3 !text-[10px] !py-1 !px-2.5 !rounded-md font-mono font-bold uppercase ${
                            isUpcoming ? "badge-category-green" : "bg-[#0a2012]/90 text-[#a3caad] border border-[#1d442a]"
                          }`}>
                            {isUpcoming ? "Upcoming Event" : "Past Event"}
                          </span>
                        </div>
                        
                        <div className="p-5">
                          <h3 className="font-serif-heading text-lg font-bold text-white group-hover:text-[#d1e7d8] transition-colors">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-3 border-t border-[#1d442a]/80 flex items-center justify-between text-xs font-mono">
                        <div className="space-y-1">
                          <p className="flex items-center gap-2 text-[#d1e7d8]">
                            <Calendar size={13} className="text-[#f3ae29]" /> {formatDate(event.date)}
                          </p>
                          <p className="flex items-center gap-2 text-[#a3caad]">
                            <MapPin size={13} className="text-[#389456]" /> {event.location}
                          </p>
                        </div>
                        <span className="text-[#389456] group-hover:text-[#f3ae29] font-bold uppercase tracking-wider flex items-center gap-0.5 transition-colors">
                          Details <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── Upcoming Events CTA ── */}
        <section className="bg-[#0a2012] pb-24">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0c2616] rounded-2xl p-8 sm:p-12 border border-[#1d442a] shadow-2xl relative overflow-hidden"
            >
              <span className="badge-gold !rounded-md !px-3 !py-1 !text-xs inline-flex mb-4">
                • Upcoming Sessions
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mb-3">
                Don&apos;t Miss Our Next Event
              </h2>
              <p className="text-base leading-relaxed text-[#a3caad] max-w-lg mb-8">
                Reserve your seat for upcoming webinars, leadership workshops, and pitch competitions across Pakistan.
              </p>
              <Link href="/events/upcoming" className="btn-gsap-cta inline-flex items-center gap-2 !rounded-xl !py-3.5 !px-8">
                <span>View All Upcoming Events</span>
                <ArrowUpRight size={18} className="text-[#f3ae29]" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      <Footer />
    </div>
  );
}
