"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ first_name: "", last_name: "", phone: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '8px',
    border: '1px solid #1a3a24',
    background: '#08170d',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
      {success && (
        <div 
          className="px-4 py-3 rounded-full bg-[#0ae448]/10 border border-[#0ae448]/40 text-[#0ae448] font-mono text-xs uppercase tracking-wider flex items-center gap-2"
          role="alert"
          aria-live="polite"
        >
          <span className="w-2 h-2 rounded-full bg-[#0ae448] shadow-[0_0_8px_#0ae448]" />
          Message sent successfully! We will get back to you soon.
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first-name" className="sr-only">First Name</label>
          <input 
            id="first-name"
            type="text" 
            placeholder="First Name" 
            required
            value={formData.first_name}
            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
            style={inputStyle}
            aria-label="First Name"
          />
        </div>
        <div>
          <label htmlFor="last-name" className="sr-only">Last Name</label>
          <input 
            id="last-name"
            type="text" 
            placeholder="Last Name" 
            required
            value={formData.last_name}
            onChange={(e) => setFormData({...formData, last_name: e.target.value})}
            style={inputStyle}
            aria-label="Last Name"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">Phone</label>
        <input 
          id="phone"
          type="tel" 
          placeholder="Phone Number" 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          style={inputStyle}
          aria-label="Phone number"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <input 
          id="email"
          type="email" 
          placeholder="Email Address" 
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={inputStyle}
          aria-label="Email address"
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea 
          id="message"
          placeholder="Your Message" 
          rows={5} 
          required
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          style={{ ...inputStyle, resize: 'none' }}
          aria-label="Your message"
        ></textarea>
      </div>
      <button 
        type="submit" 
        disabled={submitting}
        className="btn-gsap-cta w-full md:w-auto"
        aria-label={submitting ? 'Sending message' : 'Submit message'}
      >
        {submitting ? 'Sending...' : 'Submit Message'}
      </button>
    </form>
  );
}
