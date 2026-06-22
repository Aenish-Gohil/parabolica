"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { useLenis } from "@/components/smooth-scroll";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  const { content } = useLanguage();
  const lenis = useLenis();
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent, id: string) => {
    const isHomePage = pathname === "/";
    if (isHomePage) {
      // Only on home page: prevent default and use smooth scroll
      e.preventDefault();
      const el = document.getElementById(id);
      if (lenis && el) {
        lenis.scrollTo(el, { offset: -80 });
      } else if (el) {
        // Lenis not ready, fallback to native scroll
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // On any other page: do NOT preventDefault — let href="/#section" navigate normally
  };

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Brand Info */}
          <div className="flex flex-col gap-8">
            <Link href="/" onClick={() => { if (pathname === "/") lenis?.scrollTo(0); }}>
              <img src="/logo_final.png?v=2" alt="Parabolica" className="h-8 w-auto object-contain brightness-125" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light uppercase tracking-tighter">
              THE ARCHITECTURE OF IMMERSION. REDEFINING THE BOUNDARIES OF VR GAMING AND HIGH-PERFORMANCE SIMULATION.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/parabolica.space?igsh=YXhlZTN6aWl5NWxr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00ffd2] hover:text-black hover:border-[#00ffd2] transition-all" title="Instagram (Main)">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com/@parabolica.mumbai?si=iE4pk3mzroDVwxMS" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00ffd2] hover:text-black hover:border-[#00ffd2] transition-all" title="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://www.linkedin.com/company/parabolica-entertainment-india-private-limited/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00ffd2] hover:text-black hover:border-[#00ffd2] transition-all" title="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-8">
            <h4 className="text-xs font-mono tracking-[0.4em] uppercase text-[#00ffd2]">Navigation</h4>
            <nav className="flex flex-col gap-4 text-sm font-light text-white/60">
              <Link href="/#home" onClick={(e) => handleScroll(e, "home")} className="hover:text-white transition-colors">HOME</Link>
              <Link href="/#about" onClick={(e) => handleScroll(e, "about")} className="hover:text-white transition-colors">ABOUT</Link>
              <Link href="/#projects" onClick={(e) => handleScroll(e, "projects")} className="hover:text-white transition-colors">EXPERIENCES</Link>
              <Link href="/#events" onClick={(e) => handleScroll(e, "events")} className="hover:text-white transition-colors">EVENTS</Link>
              <Link href="/booking" className="hover:text-white transition-colors">BOOKING</Link>
              <Link href="/blog" className="hover:text-white transition-colors">BLOG</Link>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-8 col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-xs font-mono tracking-[0.4em] uppercase text-[#00ffd2]">Terminals & Locations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mumbai */}
                <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">Mumbai Terminal</span>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      NEW LINK ROAD, OPP. CITI MALL, <br />
                      ANDHERI WEST, MUMBAI
                    </p>
                    <div className="flex flex-col gap-2">
                        <a href="tel:+919702437855" className="flex items-center gap-2 text-xs text-[#00ffd2] hover:underline">
                          <Phone size={12} /> +91 97024 37855
                        </a>
                        <a href="tel:+918369990344" className="flex items-center gap-2 text-xs text-[#00ffd2] hover:underline">
                          <Phone size={12} /> +91 83699 90344
                        </a>
                        <a href="mailto:mumbai.parabolica@co.in" className="flex items-center gap-2 text-xs text-[#00ffd2] hover:underline">
                          <Mail size={12} /> mumbai.parabolica@co.in
                        </a>
                    </div>
                </div>

                {/* Surat */}
                <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">Surat Terminal</span>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      OPP. CB PATEL CLUB, 3RD FLOOR <br />
                      BESIDE OF NINIS KITCHEN, VESU SURAT
                    </p>
                    <div className="flex flex-col gap-2">
                        <a href="tel:+919702437855" className="flex items-center gap-2 text-xs text-[#00ffd2] hover:underline">
                          <Phone size={12} /> +91 97024 37855
                        </a>
                        <a href="tel:+918369990344" className="flex items-center gap-2 text-xs text-[#00ffd2] hover:underline">
                          <Phone size={12} /> +91 83699 90344
                        </a>
                        <a href="mailto:surat.parabolica@co.in" className="flex items-center gap-2 text-xs text-[#00ffd2] hover:underline">
                          <Mail size={12} /> surat.parabolica@co.in
                        </a>
                    </div>
                </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5">
          <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
            © {new Date().getFullYear()} PARABOLICA // ALL RIGHTS RESERVED
          </span>
          <div className="flex gap-8 text-[10px] font-mono text-white/20 tracking-widest uppercase">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
