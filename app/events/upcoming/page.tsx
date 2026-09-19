"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Clock, ArrowRight, Loader2, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  image: string;
  status: string;
}

const EVENT_HERO_IMAGES = [
  "/events/event-slide-1.jpg",
  "/events/event-slide-2.jpg",
  "/events/event-slide-3.jpg",
  "/events/event-slide-4.jpg",
];

const CARD_COLORS = ['var(--color-field-forest)', 'var(--color-field-deep)', 'var(--color-charcoal)'];

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % EVENT_HERO_IMAGES.length);
    }, 5000);
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
        const response = await fetch('/api/events?status=upcoming', { cache: 'no-store' });
        const data = await response.json();
        if (response.ok) setEvents(data.events || []);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const fallbackEvents = [
    { id: '1', title: "Startup Pitch Competition 2026", date: "2026-03-25", time: "10:00 AM - 5:00 PM", location: "Karachi Expo Center", image: "/event-leadership.jpg", description: "Compete for seed funding and mentorship opportunities. Present your startup idea to leading investors.", status: "Registration Open", type: "Competition" },
    { id: '2', title: "Tech Skills Bootcamp", date: "2026-04-10", time: "9:00 AM - 6:00 PM", location: "Lahore Innovation Hub", image: "/event-workshop.jpg", description: "Intensive bootcamp covering web development, mobile apps, and AI fundamentals with hands-on projects.", status: "Early Bird", type: "Bootcamp" },
    { id: '3', title: "Social Impact Summit", date: "2026-04-20", time: "2:00 PM - 8:00 PM", location: "Islamabad Convention Hall", image: "/event-openhouse.jpg", description: "Join social entrepreneurs and changemakers to discuss sustainable solutions for community challenges.", status: "Coming Soon", type: "Summit" },
  ];

  const displayEvents = events.length > 0 ? events : fallbackEvents;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-text-primary)', overflowX: 'hidden' }}>
      <Navbar />

      <main className="pt-20">

        {/* ── Page Hero with Animated Background Carousel (Same as Homepage Hero) ── */}
        <section className="relative text-white flex items-center overflow-hidden py-4 sm:py-6">
          {/* Full-bleed Animated Image Carousel */}
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

          {/* Dark Monograph Vignette Overlay */}
          <div className="absolute inset-0 z-10" style={{ background: 'rgba(13,40,24,0.72)' }} />
          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, rgba(13,40,24,0.65), transparent)' }} />

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-16 sm:pt-6 sm:pb-20 relative z-20 w-full">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 label-gallery text-[var(--color-text-muted)] hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="annotation-curly">
                  &#123; What&apos;s Next &#125;
                </span>
              </div>
              <h1 
                className="mb-4 text-white font-bold leading-[1.05] tracking-tight max-w-3xl"
                style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
              >
                Join Our Upcoming{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Events!
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] max-w-2xl font-normal">
                Don&apos;t miss out on these exciting opportunities to learn, network, and grow with Himmatkaar.
              </p>
            </motion.div>
          </div>

          {/* Carousel Prev Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-full transition-all"
            style={{ border: '1px solid var(--color-border)', background: 'rgba(13,40,24,0.5)' }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Carousel Next Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-full transition-all"
            style={{ border: '1px solid var(--color-border)', background: 'rgba(13,40,24,0.5)' }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Carousel Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
            {EVENT_HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: index === currentImageIndex ? '28px' : '8px',
                  background: index === currentImageIndex
                    ? 'var(--color-badge-gold)'
                    : 'rgba(255,255,255,0.3)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ── Events Grid ── */}
        <section style={{ background: 'var(--color-canvas)', padding: '60px 0 80px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin" size={40} style={{ color: 'var(--color-badge-gold)' }} />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    style={{ background: CARD_COLORS[idx % CARD_COLORS.length], borderRadius: 'var(--radius-cards)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border)' }}
                  >
                    <div style={{ margin: '20px 20px 0', borderRadius: 'var(--radius-images)', overflow: 'hidden', position: 'relative', height: '200px', flexShrink: 0 }}>
                      <Image src={event.image} alt={event.title} fill className="object-cover" sizes="400px" />
                      <span className="badge-gallery badge-gold absolute top-3 right-3" style={{ fontSize: '8px', padding: '4px 10px' }}>
                        {event.status}
                      </span>
                    </div>
                    <div style={{ padding: '20px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 className="font-portrait mb-3" style={{ fontSize: '22px', color: 'var(--color-text-primary)', flex: 1 }}>{event.title}</h3>
                      <p style={{ fontSize: '13px', lineHeight: 1.3, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)', marginBottom: '14px' }}>{event.description}</p>
                      <div className="space-y-1.5 mb-5">
                        <p className="label-gallery flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                          <Calendar size={10} /> {formatDate(event.date)}
                        </p>
                        <p className="label-gallery flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                          <Clock size={10} /> {event.time}
                        </p>
                        <p className="label-gallery flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                          <MapPin size={10} /> {event.location}
                        </p>
                        {(event as any).attendees && (
                          <p className="label-gallery flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                            <Users size={10} /> {(event as any).attendees}
                          </p>
                        )}
                      </div>
                      <Link href="/signup">
                        <button className="btn-filled-pill w-full justify-center" style={{ width: '100%', fontSize: '10px', padding: '10px 20px' }}>
                          Register Now <ArrowRight size={12} />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section style={{ background: 'var(--color-canvas)', padding: '0 0 80px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ background: 'var(--color-charcoal)', borderRadius: 'var(--radius-cards)', padding: '60px 40px', border: '1px solid var(--color-border)' }}
            >
              <span className="badge-gallery badge-mint inline-flex mb-5">Newsletter</span>
              <h2 className="font-portrait mb-4" style={{ fontSize: '35px', color: 'var(--color-text-primary)' }}>Stay Updated</h2>
              <p className="mb-8" style={{ fontSize: '15px', lineHeight: 1.3, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)', maxWidth: '480px' }}>
                Subscribe to our newsletter to get notified about upcoming events
              </p>
              <div className="flex flex-col sm:flex-row gap-3" style={{ maxWidth: '480px' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{ flex: 1, background: 'var(--color-espresso)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-buttons)', padding: '10px 20px', color: 'var(--color-text-primary)', fontSize: '13px', fontFamily: 'var(--font-sans-gallery)', outline: 'none' }}
                />
                <button className="btn-filled-pill">Subscribe</button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
