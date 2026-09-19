"use client";

import { useState } from "react";

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
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[540px]">
      {success && (
        <div
          className="mb-4 px-4 py-3 rounded-full bg-[#0ae448]/10 border border-[#0ae448]/40 text-[#0ae448] font-mono text-xs uppercase tracking-wider flex items-center gap-2"
          role="alert"
          aria-live="polite"
        >
          <span className="w-2 h-2 rounded-full bg-[#0ae448] shadow-[0_0_8px_#0ae448]" />
          Successfully subscribed to newsletter!
        </div>
      )}
      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-full bg-red-950/40 border border-red-500/40 text-red-300 font-mono text-xs uppercase tracking-wider"
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
        <input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-[#08170d] border border-[#1a3a24] rounded-full px-6 py-3.5 text-white placeholder-[#a8d5b5]/50 focus:outline-none focus:border-[#0ae448] focus:ring-1 focus:ring-[#0ae448] transition-all text-sm sm:text-base font-normal"
          aria-label="Email address for newsletter subscription"
          aria-describedby={error ? "newsletter-error" : undefined}
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-gsap-cta disabled:opacity-50 whitespace-nowrap justify-center"
          aria-label={submitting ? 'Subscribing to newsletter' : 'Subscribe to newsletter'}
        >
          {submitting ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}

