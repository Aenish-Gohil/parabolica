"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlurReveal } from "../blur-reveal";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";

export default function F1BookingCTA() {
  return (
    <section className="py-24 md:py-40 bg-black relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,155,0.08)_0%,transparent_70%)]" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        {/* Animated Track Lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-[800px] h-[800px] border border-primary/20 rounded-full" 
            />
            <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                className="absolute w-[1000px] h-[1000px] border border-primary/10 rounded-full" 
            />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
                <BlurReveal>
                    <span className="inline-flex items-center gap-2 text-primary font-mono tracking-[0.5em] uppercase text-xs mb-8 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        Next Race: Today
                    </span>
                </BlurReveal>

                <BlurReveal>
                    <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-12">
                        THE GRID IS<br />
                        <span className="text-white">WAITING FOR YOU</span>
                    </h2>
                </BlurReveal>

                <BlurReveal>
                    <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto mb-16 leading-relaxed font-light">
                        Experience the raw power of professional F1 simulation. Secure your simulator session and join the elite ranks of Parabolica drivers.
                    </p>
                </BlurReveal>

                <BlurReveal>
                    <Link href="/booking" className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-12 py-6">
                        <div className="absolute inset-0 bg-primary group-hover:bg-white transition-colors duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        
                        <span className="relative flex items-center gap-3 text-black font-black uppercase italic tracking-widest text-lg">
                            Secure Your Seat
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>

                        <div className="absolute -inset-4 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </BlurReveal>

                <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5" />
                        <span className="text-xs uppercase font-mono tracking-widest text-white">Daily Slots</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs uppercase font-mono tracking-widest text-white">Live Monitoring</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
