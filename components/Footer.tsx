"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#07190e] text-white border-t border-[#1d442a] pt-20 relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1: Logo, Brand Lockup with Urdu Calligraphy & Naked Social Links */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/himmatkaar-logo.jpg"
                alt="HimmatKaar Logo"
                width={36}
                height={36}
                className="rounded-lg ring-1 ring-[#1d442a]"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-white leading-none">
                    Himmatkaar
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#a3caad] font-semibold uppercase mt-0.5">
                  Faisalabad, Pakistan
                </span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-[#a3caad] mb-6 max-w-sm">
              Building a vibrant ecosystem where every young person in Faisalabad develops the courage and capability to lead transformative impact.
            </p>

            {/* Social Links (Naked Icons without circular wrappers) */}
            <div className="flex items-center gap-4">
              {[
                { href: "https://www.instagram.com/himmatkaar", icon: <Instagram size={19} />, label: "Instagram" },
                { href: "https://www.linkedin.com/company/himmatkaar/", icon: <Linkedin size={19} />, label: "LinkedIn" },
                { href: "https://www.facebook.com/himmatkaar", icon: <Facebook size={19} />, label: "Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-[#a3caad] hover:text-[#f3ae29] hover:scale-110 transition-all p-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <span className="font-mono text-xs text-[#f3ae29] block mb-5 font-semibold tracking-wider uppercase">
              • Platform
            </span>
            <ul className="space-y-3">
              {[
                { label: "Our Mission", href: "/about" },
                { label: "Core Team", href: "/core-team" },
                { label: "Launchpad Overview", href: "/launchpad" },
                { label: "Impact Reports", href: "/impact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#a3caad] hover:text-[#e8f5ec] transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <span className="font-mono text-xs text-[#f3ae29] block mb-5 font-semibold tracking-wider uppercase">
              • Resources
            </span>
            <ul className="space-y-3">
              {[
                { label: "Technical Workshops", href: "/technical-workshops" },
                { label: "Networking Events", href: "/networking-events" },
                { label: "Upcoming Events", href: "/events/upcoming" },
                { label: "Partner with Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#a3caad] hover:text-[#e8f5ec] transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Quick Newsletter */}
          <div>
            <span className="font-mono text-xs text-[#f3ae29] block mb-5 font-semibold tracking-wider uppercase">
              • Contact Us
            </span>
            <div className="space-y-2 mb-6 text-sm text-[#a3caad] font-mono">
              <p>Email: hello@himmatkaar.com</p>
              <p>Phone: 0342-4853908</p>
              <p>Location: Faisalabad / Remote</p>
            </div>
            
            <span className="font-mono text-xs text-[#d1e7d8] block mb-2 font-semibold tracking-wider">
              Quick Subscribe
            </span>
            <form className="flex flex-col sm:flex-row gap-2" aria-label="Footer newsletter subscription">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="flex-1 bg-[#0a2012] border border-[#1d442a] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#a3caad]/40 focus:outline-none focus:border-[#389456] focus:ring-1 focus:ring-[#389456]"
              />
              <button
                type="button"
                className="btn-gsap-cta !py-2.5 !px-4 !text-xs !rounded-xl whitespace-nowrap"
                aria-label="Subscribe to newsletter"
              >
                <span>Subscribe</span>
                <ArrowUpRight size={13} className="text-[#f3ae29]" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Urdu Footer Note */}
        <div className="mt-16 pt-6 pb-8 border-t border-[#1d442a] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#a3caad]/70 font-mono">
          <div className="flex items-center gap-2">
            <p>© 2026 Himmatkaar. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookie-policy" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#389456] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

