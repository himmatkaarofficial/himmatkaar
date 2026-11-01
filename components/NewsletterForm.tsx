"use client";

import { useState } from "react";
import { Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setEmail("");
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error || 'Failed to subscribe');
      }
    } catch {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[560px]">
      {success && (
        <div
          className="mb-4 px-4 py-3 rounded-xl bg-[#e8f5ec] border border-[#2d7a46] text-[#2d7a46] font-mono text-xs uppercase tracking-wider flex items-center gap-2"
          role="alert"
          aria-live="polite"
        >
          <CheckCircle2 size={16} className="text-[#2d7a46]" />
          Successfully subscribed to Himmatkaar newsletter!
        </div>
      )}
      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-300 text-red-700 font-mono text-xs uppercase tracking-wider"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        aria-label="Newsletter subscription form"
      >
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <div className="relative flex-1">
          {/* Naked Mail Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a6b53] pointer-events-none">
            <Mail size={18} />
          </div>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#f8faf7] border border-[#d8e6db] rounded-xl pl-11 pr-4 py-3.5 text-[#07190e] placeholder-[#4a6b53]/60 focus:outline-none focus:border-[#2d7a46] focus:ring-1 focus:ring-[#2d7a46] transition-all text-sm font-normal shadow-sm"
            aria-label="Email address for newsletter subscription"
            aria-describedby={error ? "newsletter-error" : undefined}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="btn-gsap-cta disabled:opacity-50 whitespace-nowrap justify-center !rounded-xl !py-3.5 !px-6"
          aria-label={submitting ? 'Subscribing to newsletter' : 'Subscribe to newsletter'}
        >
          <span>{submitting ? 'Subscribing…' : 'SUBSCRIBE'}</span>
          <ArrowUpRight size={16} className="text-[#f3ae29]" />
        </button>
      </form>
    </div>
  );
}


