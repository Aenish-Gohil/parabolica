"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { useLenis } from "@/components/smooth-scroll";
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  const { content } = useLanguage();
  const lenis = useLenis();

  const handleScroll = (id: string) => {
    const isHomePage = window.location.pathname === "/";
    if (isHomePage) {
        const el = document.getElementById(id);
        if (lenis && el) {
            lenis.scrollTo(el, { offset: -80 });
        }
    }
  };

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-8">
            <Link href="/" onClick={() => lenis?.scrollTo(0)}>
                <img src="/logo_final.png?v=2" alt="Parabolica" className="h-4 w-auto object-contain opacity-80" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
              THE ARCHITECTURE OF IMMERSION. PARABOLICA IS A HIGH-OCTANE TECHNOLOGICAL SANCTUARY WHERE THE PHYSICAL AND DIGITAL BLUR.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-8">
            <h4 className="text-xs font-mono tracking-[0.4em] uppercase text-[#00ffd2]">Navigation</h4>
            <nav className="flex flex-col gap-4 text-sm font-light text-white/60">
              <Link href="/#home" onClick={() => handleScroll("home")} className="hover:text-white transition-colors">HOME</Link>
              <Link href="/#about" onClick={() => handleScroll("about")} className="hover:text-white transition-colors">ABOUT</Link>
              <Link href="/#projects" onClick={() => handleScroll("projects")} className="hover:text-white transition-colors">EXPERIENCES</Link>
              <Link href="/#events" onClick={() => handleScroll("events")} className="hover:text-white transition-colors">EVENTS</Link>
              <Link href="/booking" className="hover:text-white transition-colors">BOOKING</Link>
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
                    <a href="tel:+919999999999" className="flex items-center gap-2 text-xs text-[#00ffd2] hover:underline">
                      <Phone size={12} /> +91 99999 99999
                    </a>
                </div>

                {/* Surat */}
                <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">Surat Terminal</span>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      OPP. CB PATEL CLUB, 3RD FLOOR <br />
                      BESIDE OF NINIS KITCHEN, VESU SURAT
                    </p>
                    <a href="tel:+918888888888" className="flex items-center gap-2 text-xs text-[#00ffd2] hover:underline">
                      <Phone size={12} /> +91 88888 88888
                    </a>
                </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-8">
                <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[#00ffd2]" />
                    <span className="text-sm text-white/60">hello@parabolica.com</span>
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
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
