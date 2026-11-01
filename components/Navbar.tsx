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
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 15);

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        // Scrolling down -> hide navbar
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up / swiping down -> reveal navbar
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Track active section on home page if available
  useEffect(() => {
    const sections = ["hero", "about", "programs", "offerings", "launchpad", "events"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const dropdownMenuStyle: React.CSSProperties = {
    background: "#0c2616",
    border: "1px solid #1d442a",
    borderRadius: "12px",
    boxShadow: "0 14px 35px rgba(0,0,0,0.55)",
  };

  const dropdownLinkStyle: React.CSSProperties = {
    display: "block",
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#e8f5ec",
    transition: "background 0.2s, color 0.2s",
    borderRadius: "8px",
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6"
      >
        <div
          className={`max-w-[1280px] mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 h-[72px] flex items-center justify-between border ${
            scrolled
              ? "bg-[#0c2616]/95 border-[#1d442a] shadow-2xl backdrop-blur-xl"
              : "bg-[#0c2616]/90 border-[#1d442a]/80 backdrop-blur-lg shadow-lg"
          }`}
        >
          {/* Brand Lockup: Logo + Brand Name + Urdu Script + EMPOWERING YOUTH */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/himmatkaar-logo.jpg"
              alt="Himmatkaar Logo"
              width={38}
              height={38}
              className="rounded-lg ring-1 ring-[#1d442a] group-hover:ring-[#389456] transition-all duration-300"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-none">
                  Himmatkaar
                </span>
                <span className="font-urdu text-sm text-[#a3caad] leading-none opacity-90 hidden xs:inline" dir="rtl">
                  ہمت کار
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#f3ae29] font-medium uppercase mt-0.5">
                Empowering Youth
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-[#389456] ${
                activeSection === "hero" || !activeSection ? "text-[#e8f5ec] font-semibold" : "text-[#a3caad]"
              }`}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#389456] cursor-pointer ${
                  activeSection === "about" ? "text-white font-semibold" : "text-[#a3caad]"
                }`}
                aria-label="About Us menu"
                aria-expanded={aboutDropdownOpen}
                aria-haspopup="true"
              >
                About Us <ChevronDown size={14} className="text-[#a3caad] transition-transform duration-200" />
              </button>
              {aboutDropdownOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-56 z-50"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <div style={dropdownMenuStyle} className="p-2 space-y-1">
                    <Link href="/about" style={dropdownLinkStyle} className="hover:bg-[#10321e] hover:text-[#389456]">
                      About Himmatkaar
                    </Link>
                    <Link href="/team" style={dropdownLinkStyle} className="hover:bg-[#10321e] hover:text-[#389456]">
                      Our Team
                    </Link>
                    <Link href="/ambassadors" style={dropdownLinkStyle} className="hover:bg-[#10321e] hover:text-[#389456]">
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
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#389456] cursor-pointer ${
                  activeSection === "programs" || activeSection === "offerings" || activeSection === "launchpad"
                    ? "text-white font-semibold"
                    : "text-[#a3caad]"
                }`}
                aria-label="Programme menu"
                aria-expanded={programDropdownOpen}
                aria-haspopup="true"
              >
                Programme <ChevronDown size={14} className="text-[#a3caad] transition-transform duration-200" />
              </button>
              {programDropdownOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-56 z-50"
                  onMouseEnter={() => setProgramDropdownOpen(true)}
                  onMouseLeave={() => setProgramDropdownOpen(false)}
                >
                  <div style={dropdownMenuStyle} className="p-2 space-y-1">
                    <Link href="/launchpad" style={dropdownLinkStyle} className="hover:bg-[#10321e] hover:text-[#389456]">
                      Launchpad Overview
                    </Link>
                    <Link href="/technical-workshops" style={dropdownLinkStyle} className="hover:bg-[#10321e] hover:text-[#389456]">
                      Technical Workshops
                    </Link>
                    <Link href="/networking-events" style={dropdownLinkStyle} className="hover:bg-[#10321e] hover:text-[#389456]">
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
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#389456] cursor-pointer ${
                  activeSection === "events" ? "text-white font-semibold" : "text-[#a3caad]"
                }`}
                aria-label="Happenings menu"
                aria-expanded={happeningsDropdownOpen}
                aria-haspopup="true"
              >
                Happenings <ChevronDown size={14} className="text-[#a3caad] transition-transform duration-200" />
              </button>
              {happeningsDropdownOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-56 z-50"
                  onMouseEnter={() => setHappeningsDropdownOpen(true)}
                  onMouseLeave={() => setHappeningsDropdownOpen(false)}
                >
                  <div style={dropdownMenuStyle} className="p-2 space-y-1">
                    <Link href="/events/upcoming" style={dropdownLinkStyle} className="hover:bg-[#10321e] hover:text-[#389456]">
                      Upcoming Events
                    </Link>
                    <Link href="/events" style={dropdownLinkStyle} className="hover:bg-[#10321e] hover:text-[#389456]">
                      Events
                    </Link>
                    <Link href="/blog" style={dropdownLinkStyle} className="hover:bg-[#10321e] hover:text-[#389456]">
                      Blog
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/contact" className="text-sm font-medium text-[#a3caad] hover:text-[#389456] transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Desktop Soft Rounded CTAs (Strictly No Pill Shapes) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="btn-gsap-ghost !py-2 !px-4.5 !text-sm !rounded-xl"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="btn-gsap-cta !py-2 !px-4.5 !text-sm !rounded-xl"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Toggle Button (Soft Rounded) */}
          <button
            className="lg:hidden text-white flex items-center p-2 rounded-xl border border-[#1d442a] hover:bg-[#0c2616] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer (Soft Rounded 2XL Container) */}
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
            className="fixed top-24 left-3 right-3 z-40 lg:hidden overflow-hidden bg-[#0c2616]/98 backdrop-blur-2xl border border-[#1d442a] rounded-2xl shadow-2xl"
          >
            <div className="flex flex-col gap-1 py-6 px-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-white font-medium text-[16px] hover:text-[#389456]">Home</Link>
              <div className="hairline-divider my-2" />
              <p className="annotation-curly mb-1">About Us</p>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-[#e8f5ec] hover:text-[#389456]">About Himmatkaar</Link>
              <Link href="/team" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-[#e8f5ec] hover:text-[#389456]">Our Team</Link>
              <Link href="/ambassadors" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-[#e8f5ec] hover:text-[#389456]">Ambassadors</Link>
              <div className="hairline-divider my-2" />
              <p className="annotation-curly mb-1">Programme</p>
              <Link href="/launchpad" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-[#e8f5ec] hover:text-[#389456]">Launchpad Overview</Link>
              <Link href="/technical-workshops" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-[#e8f5ec] hover:text-[#389456]">Technical Workshops</Link>
              <Link href="/networking-events" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-[#e8f5ec] hover:text-[#389456]">Networking Events</Link>
              <div className="hairline-divider my-2" />
              <p className="annotation-curly mb-1">Happenings</p>
              <Link href="/events/upcoming" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-[#e8f5ec] hover:text-[#389456]">Upcoming Events</Link>
              <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-[#e8f5ec] hover:text-[#389456]">Events</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="pl-3 py-2 text-[15px] text-[#e8f5ec] hover:text-[#389456]">Blog</Link>
              <div className="hairline-divider my-2" />
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-white font-medium text-[16px] hover:text-[#389456]">Contact Us</Link>
              <div className="hairline-divider my-2" />
              <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn-gsap-ghost text-center flex-1 !rounded-xl">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="btn-gsap-cta text-center flex-1 !rounded-xl">
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
