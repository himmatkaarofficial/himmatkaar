import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050f08] text-white border-t border-[#1a3a24] pt-20 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#0ae448]/5 blur-[120px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1: Logo, Dot Accent and Social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/himmatkaar-logo.jpg"
                alt="HimmatKaar Logo"
                width={34}
                height={34}
                className="rounded-full ring-1 ring-[#0ae448]/30"
              />
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                HimmatKaar
                <span className="w-2 h-2 rounded-full bg-[#0ae448] shadow-[0_0_8px_#0ae448] inline-block" />
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#a8d5b5] mb-6 max-w-sm">
              Building a global ecosystem where every young person has the courage and the capability to lead meaningful change.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://www.instagram.com/himmatkaar", icon: <Instagram size={16} />, label: "Instagram" },
                { href: "https://www.linkedin.com/company/himmatkaar/", icon: <Linkedin size={16} />, label: "LinkedIn" },
                { href: "https://www.facebook.com/himmatkaar", icon: <Facebook size={16} />, label: "Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-[#1a3a24] bg-[#08170d] flex items-center justify-center text-white hover:border-[#0ae448] hover:text-[#0ae448] hover:shadow-[0_0_12px_rgba(10,228,72,0.2)] transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <span className="font-mono text-xs text-[#0ae448] block mb-5 font-semibold tracking-wider">
              &#123; Platform &#125;
            </span>
            <ul className="space-y-3">
              {[
                { label: "Our Mission", href: "/about" },
                { label: "Core Team", href: "/core-team" },
                { label: "Launchpad", href: "/launchpad" },
                { label: "Impact Reports", href: "/impact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#a8d5b5] hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <span className="font-mono text-xs text-[#0ae448] block mb-5 font-semibold tracking-wider">
              &#123; Resources &#125;
            </span>
            <ul className="space-y-3">
              {[
                { label: "Technical Workshops", href: "/technical-workshops" },
                { label: "Networking Events", href: "/networking-events" },
                { label: "Upcoming Events", href: "/events/upcoming" },
                { label: "Partner with Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#a8d5b5] hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Quick Newsletter */}
          <div>
            <span className="font-mono text-xs text-[#0ae448] block mb-5 font-semibold tracking-wider">
              &#123; Contact Us &#125;
            </span>
            <div className="space-y-2 mb-6 text-sm text-[#a8d5b5] font-mono">
              <p>Email: hello@himmatkaar.com</p>
              <p>Phone: 0342-4853908</p>
              <p>Location: Remote</p>
            </div>
            <span className="font-mono text-xs text-[#0ae448] block mb-2 font-semibold tracking-wider">
              &#123; Stay Updated &#125;
            </span>
            <p className="text-xs text-[#a8d5b5]/80 mb-3">
              Get the latest impact stories and opportunities.
            </p>
            <form className="flex flex-col sm:flex-row gap-2" aria-label="Footer newsletter subscription">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="flex-1 bg-[#08170d] border border-[#1a3a24] rounded-full px-4 py-2.5 text-xs text-white placeholder-[#a8d5b5]/40 focus:outline-none focus:border-[#0ae448] focus:ring-1 focus:ring-[#0ae448]"
              />
              <button
                type="button"
                className="btn-gsap-cta !py-2.5 !px-4 !text-xs whitespace-nowrap"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-16 pt-6 pb-8 border-t border-[#1a3a24] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#a8d5b5]/60 font-mono">
          <p>
            © 2026 Himmatkaar. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Cookie Policy", href: "/cookie-policy" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#0ae448] transition-colors"
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

