"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlurReveal } from "../blur-reveal";
import Link from "next/link";
import { MoveRight, ShieldCheck } from "lucide-react";

export default function VRBookingCTA() {
  return (
    <section className="py-24 md:py-40 bg-black relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,155,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
                <BlurReveal>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full mb-12">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/60">Fully Sanitized Hardware // Ready for Sync</span>
                    </div>
                </BlurReveal>

                <BlurReveal>
                    <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-12">
                        READY TO<br />
                        <span className="text-primary">DIVE IN?</span>
                    </h2>
                </BlurReveal>

                <BlurReveal>
                    <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto mb-16 leading-relaxed font-light">
                        Come alone or bring your squad. We're open every day, and your first adventure is just a few clicks away.
                    </p>
                </BlurReveal>

                <BlurReveal>
                    <Link href="/booking" className="group relative inline-flex items-center gap-6 bg-primary px-12 py-6 overflow-hidden">
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 text-black font-black uppercase italic tracking-[0.2em] text-lg flex items-center gap-4">
                            Enter the Arena
                            <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </span>
                    </Link>
                </BlurReveal>
                
                <div className="mt-24">
                    <Link href="/" className="text-white/20 hover:text-white font-mono text-[10px] uppercase tracking-[0.5em] transition-colors">
                        ← Exit to Reality
                    </Link>
                </div>
            </div>
        </div>
    </section>
  );
}
