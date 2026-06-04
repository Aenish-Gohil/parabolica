"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlurReveal } from "../blur-reveal";
import { Users, MapPin, Clock, Shield } from "lucide-react";

const STATS = [
    { icon: Users,   value: "8",        label: "Players per Session" },
    { icon: MapPin,  value: "1200 sqft", label: "Arena Floor Area" },
    { icon: Clock,   value: "45 min",   label: "Average Session" },
    { icon: Shield,  value: "100%",     label: "Safety Certified" },
];

export default function VRArena() {
    return (
        <section className="relative py-24 md:py-40 bg-black overflow-hidden">

            {/* Smoke layers */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(0,255,149,0.04)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[url('/intro/scanlines.png')] opacity-[0.02]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <BlurReveal>
                        <span className="text-primary font-mono tracking-[0.5em] uppercase text-[10px] mb-4 block">
                            The Battlefield // Live Arena
                        </span>
                    </BlurReveal>
                    <BlurReveal>
                        <h2 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter leading-tight">
                            STEP INSIDE<br />
                            <span className="text-white/20" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                                THE ARENA
                            </span>
                        </h2>
                    </BlurReveal>
                    <BlurReveal>
                        <p className="max-w-2xl mx-auto text-white/40 text-sm md:text-base leading-relaxed mt-6 font-light">
                            A dedicated physical arena where players gear up with full headsets, haptic vests, and motion controllers —
                            then enter the <span className="text-white font-medium">same digital world together</span>.
                            Real space. Virtual stakes.
                        </p>
                    </BlurReveal>
                </div>

                {/* Full-width Arena image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="relative mb-16 overflow-hidden"
                    style={{ maxHeight: 560 }}
                >
                    <img
                        src="/vr_arena_hero.png"
                        alt="VR Arena"
                        className="w-full object-cover object-center"
                        style={{ maxHeight: 560 }}
                    />

                    {/* Smoke overlays on image edges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40 pointer-events-none" />

                    {/* Live badge */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/70 border border-red-500/40 backdrop-blur-sm px-4 py-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400 font-mono text-[9px] tracking-[0.4em] uppercase">Live Arena</span>
                    </div>

                    {/* Corner marks */}
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
                </motion.div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05]">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex flex-col items-center justify-center p-8 bg-black text-center group hover:bg-primary/5 transition-all duration-500"
                        >
                            <stat.icon className="w-5 h-5 text-primary mb-3" />
                            <div className="text-3xl md:text-5xl font-black italic text-white tracking-tight mb-1">{stat.value}</div>
                            <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
