"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events?limit=3&status=upcoming');
        const data = await response.json();

        if (response.ok) {
          setEvents(data.events || []);
        } else {
          setError(data.error || 'Failed to fetch events');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading || events.length === 0) {
    return null;
  }

  const displayEvents = events;

  return (
    <section style={{ background: 'var(--color-canvas)', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header — left-aligned per July Fund convention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="badge-gallery badge-emerald inline-flex mb-5">
            Events
          </span>
          <h2
            className="font-portrait"
            style={{ fontSize: '40px', color: 'var(--color-text-primary)' }}
          >
            Invent Your Future With Us
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: '15px',
              lineHeight: 1.3,
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-sans-gallery)',
              maxWidth: '480px',
            }}
          >
            Join our upcoming events and connect with like-minded changemakers
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-charcoal)',
                  borderRadius: 'var(--radius-cards)',
                  height: '360px',
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        )}

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {displayEvents.slice(0, 3).map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{
                background: 'var(--color-charcoal)',
                borderRadius: 'var(--radius-cards)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image tile — 12px radius inside the card */}
              <div
                style={{
                  margin: '20px 20px 0',
                  borderRadius: 'var(--radius-images)',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '200px',
                }}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                {/* Status badge overlay */}
                <span
                  className="badge-gallery badge-gold absolute top-3 right-3"
                  style={{ fontSize: '8px', padding: '4px 10px' }}
                >
                  {event.status === 'upcoming' ? 'Upcoming' : event.status}
                </span>
              </div>

              {/* Card body */}
              <div style={{ padding: '20px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Date */}
                <p
                  className="label-gallery mb-3"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {formatDate(event.date)}
                </p>

                {/* Title */}
                <h3
                  className="font-portrait mb-3"
                  style={{ fontSize: '26px', color: 'var(--color-text-primary)', flex: 1 }}
                >
                  {event.title}
                </h3>

                {/* Ghost pill button */}
                <div className="mt-auto">
                  <Link href="/events">
                    <button className="btn-ghost-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      Event Details <ArrowRight size={11} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events */}
        <div className="mt-10">
          <Link href="/events">
            <button className="btn-filled-pill">
              View All Events <ArrowRight size={13} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
