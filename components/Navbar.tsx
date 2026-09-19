"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
  const [happeningsDropdownOpen, setHappeningsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownMenuStyle: React.CSSProperties = {
    background: "#0e2417",
    border: "1px solid #1a3a24",
    borderRadius: "8px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  };

  const dropdownLinkStyle: React.CSSProperties = {
    display: "block",
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#ffffff",
    transition: "background 0.18s, color 0.18s",
    borderRadius: "6px",
  };

  const navLinkStyle: React.CSSProperties = {
    fontSize: "15px",
    fontWeight: 500,
    color: "#ffffff",
    textDecoration: "none",
    transition: "color 0.18s",
    letterSpacing: "-0.01em",
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(8,23,13,0.96)"
            : "rgba(8,23,13,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #1a3a24",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[74px] flex items-center justify-between">
          {/* Logo with Green Dot Accent */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/himmatkaar-logo.jpg"
              alt="Himmatkaar Logo"
              width={34}
              height={34}
              className="rounded-full group-hover:opacity-90 transition-opacity duration-300 ring-1 ring-[#1a3a24]"
            />
            <span
              className="flex items-center gap-1.5 text-lg sm:text-xl font-bold text-white tracking-tight"
            >
              Himmatkaar
              <span className="w-2 h-2 rounded-full bg-[#0ae448] inline-block animate-pulse" />
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/" style={navLinkStyle} className="hover:text-[#0ae448]">
              Home
            </Link>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-[#0ae448] transition-colors"
                style={navLinkStyle}
                aria-label="About Us menu"
                aria-expanded={aboutDropdownOpen}
                aria-haspopup="true"
              >
                About Us <ChevronDown size={14} className="text-[#a8d5b5] mt-0.5" />
              </button>
              {aboutDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-0 pt-2 w-56 z-50"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <div style={dropdownMenuStyle} className="py-2 px-2">
                    <Link href="/about" style={dropdownLinkStyle} className="hover:bg-[#132f1f] hover:text-[#0ae448] block">
                      About Himmatkaar
                    </Link>
                    <Link href="/team" style={dropdownLinkStyle} className="hover:bg-[#132f1f] hover:text-[#0ae448] block">
                      Our Team
                    </Link>
                    <Link href="/ambassadors" style={dropdownLinkStyle} className="hover:bg-[#132f1f] hover:text-[#0ae448] block">
                      Ambassadors
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Programme Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProgramDropdownOpen(true)}
              onMouseLeave={() => setProgramDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-[#0ae448] transition-colors"
                style={navLinkStyle}
                aria-label="Programme menu"
                aria-expanded={programDropdownOpen}
                aria-haspopup="true"
              >
                Programme <ChevronDown size={14} className="text-[#a8d5b5] mt-0.5" />
              </button>
              {programDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-0 pt-2 w-56 z-50"
                  onMouseEnter={() => setProgramDropdownOpen(true)}
                  onMouseLeave={() => setProgramDropdownOpen(false)}
                >
                  <div style={dropdownMenuStyle} className="py-2 px-2">
                    <Link href="/launchpad" style={dropdownLinkStyle} className="hover:bg-[#132f1f] hover:text-[#0ae448] block">
                      Launchpad Overview
                    </Link>
                    <Link href="/technical-workshops" style={dropdownLinkStyle} className="hover:bg-[#132f1f] hover:text-[#0ae448] block">
                      Technical Workshops
                    </Link>
                    <Link href="/networking-events" style={dropdownLinkStyle} className="hover:bg-[#132f1f] hover:text-[#0ae448] block">
                      Networking Events
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Happenings Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHappeningsDropdownOpen(true)}
              onMouseLeave={() => setHappeningsDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-[#0ae448] transition-colors"
                style={navLinkStyle}
                aria-label="Happenings menu"
                aria-expanded={happeningsDropdownOpen}
                aria-haspopup="true"
              >
                Happenings <ChevronDown size={14} className="text-[#a8d5b5] mt-0.5" />
              </button>
              {happeningsDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-0 pt-2 w-56 z-50"
                  onMouseEnter={() => setHappeningsDropdownOpen(true)}
                  onMouseLeave={() => setHappeningsDropdownOpen(false)}
                >
                  <div style={dropdownMenuStyle} className="py-2 px-2">
                    <Link href="/events/upcoming" style={dropdownLinkStyle} className="hover:bg-[#132f1f] hover:text-[#0ae448] block">
                      Upcoming Events
                    </Link>
                    <Link href="/events" style={dropdownLinkStyle} className="hover:bg-[#132f1f] hover:text-[#0ae448] block">
                      Events
                    </Link>
                    <Link href="/blog" style={dropdownLinkStyle} className="hover:bg-[#132f1f] hover:text-[#0ae448] block">
                      Blog
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/contact" style={navLinkStyle} className="hover:text-[#0ae448]">
              Contact Us
            </Link>
          </nav>

          {/* Desktop Outlined Pill CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="btn-gsap-ghost !py-2.5 !px-5 !text-sm"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="btn-gsap-cta !py-2.5 !px-5 !text-sm"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-white flex items-center p-2 rounded-lg border border-[#1a3a24] hover:bg-[#0e2417] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="fixed top-[74px] left-0 right-0 z-40 lg:hidden overflow-hidden bg-[#08170d]/98 backdrop-blur-xl border-b border-[#1a3a24]"
          >
            <div className="flex flex-col gap-1 py-6 px-6 max-h-[calc(100vh-74px)] overflow-y-auto">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-white font-medium text-[16px] hover:text-[#0ae448]">Home</Link>
              <div className="hairline-divider my-2" />
              <p className="annotation-curly mb-1">About Us</p>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-white/90 hover:text-[#0ae448]">About Himmatkaar</Link>
              <Link href="/team" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-white/90 hover:text-[#0ae448]">Our Team</Link>
              <Link href="/ambassadors" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-white/90 hover:text-[#0ae448]">Ambassadors</Link>
              <div className="hairline-divider my-2" />
              <p className="annotation-curly mb-1">Programme</p>
              <Link href="/launchpad" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-white/90 hover:text-[#0ae448]">Launchpad Overview</Link>
              <Link href="/technical-workshops" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-white/90 hover:text-[#0ae448]">Technical Workshops</Link>
              <Link href="/networking-events" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-white/90 hover:text-[#0ae448]">Networking Events</Link>
              <div className="hairline-divider my-2" />
              <p className="annotation-curly mb-1">Happenings</p>
              <Link href="/events/upcoming" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-white/90 hover:text-[#0ae448]">Upcoming Events</Link>
              <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-white/90 hover:text-[#0ae448]">Events</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-white/90 hover:text-[#0ae448]">Blog</Link>
              <div className="hairline-divider my-2" />
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-white font-medium text-[16px] hover:text-[#0ae448]">Contact Us</Link>
              <div className="hairline-divider my-2" />
              <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn-gsap-ghost text-center flex-1">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="btn-gsap-cta text-center flex-1">
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
