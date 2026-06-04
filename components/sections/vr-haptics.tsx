"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlurReveal } from "../blur-reveal";
import { Zap, Shield, Target, Waves } from "lucide-react";

const HAPTIC_POINTS = [
    {
        id: "shoulders",
        title: "Impact Sensors",
        desc: "Feel the recoil of your weapon or a brush against a wall in the virtual corridors.",
        pos: { top: "25%", left: "50%" },
        icon: Target
    },
    {
        id: "core",
        title: "Vibration Core",
        desc: "The primary haptic engine that replicates whole-body shocks and proximity alerts.",
        pos: { top: "50%", left: "50%" },
        icon: Waves
    },
    {
        id: "sides",
        title: "Directional Feedback",
        desc: "Tactile response for side-on damage or environmental pressure waves.",
        pos: { top: "60%", left: "30%" },
        icon: Shield
    },
    {
        id: "back",
        title: "Rear Detection",
        desc: "A dedicated vibration array for incoming fire or objects located behind the player.",
        pos: { top: "45%", left: "70%" },
        icon: Zap
    }
];

export default function VRHaptics() {
    return (
        <section className="py-24 md:py-32 bg-[#020202] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Visual Side */}
                    <div className="relative group">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative z-10"
                        >
                            <img 
                                src="/haptic_vest_hero.png" 
                                alt="Haptic Vest Tech" 
                                className="w-full max-w-lg mx-auto drop-shadow-[0_0_50px_rgba(0,255,150,0.2)]"
                            />

                            {/* Live Hotspots */}
                            {HAPTIC_POINTS.map((point, i) => (
                                <motion.div
                                    key={point.id}
                                    style={{ top: point.pos.top, left: point.pos.left }}
                                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                                >
                                    <div className="relative group/point">
                                        <div className="w-4 h-4 bg-primary rounded-full animate-ping opacity-75" />
                                        <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#00ff95]" />
                                        
                                        {/* Hover Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 bg-black/90 border border-white/10 rounded-sm opacity-0 group-hover/point:opacity-100 transition-all scale-75 group-hover/point:scale-100 pointer-events-none">
                                            <h4 className="text-white font-black uppercase italic tracking-tighter text-sm mb-1">{point.title}</h4>
                                            <p className="text-[10px] text-white/40 leading-tight">{point.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Background Pulse */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[100px] rounded-full animate-pulse" />
                    </div>

                    {/* Text Side */}
                    <div className="relative z-10">
                        <BlurReveal>
                            <span className="text-primary font-mono tracking-[0.5em] uppercase text-[10px] mb-4 block">Haptic Sync Technology</span>
                        </BlurReveal>
                        <BlurReveal>
                            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight mb-8">
                                FEEL EVERY<br />
                                <span className="text-white/40">SINGLE IMPACT</span>
                            </h2>
                        </BlurReveal>
                        <BlurReveal>
                            <p className="text-white/40 text-sm md:text-base leading-relaxed mb-12 font-light">
                                Our arena doesn't just show you a world—it makes you feel it. Using the revolutionary <span className="text-white font-medium">B-VIBE Haptic System</span>, every shot fired and every environmental change is translated into localized vibrations across your body.
                            </p>
                        </BlurReveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {HAPTIC_POINTS.slice(0, 2).map((point) => (
                                <div key={point.id} className="p-6 bg-white/5 border border-white/10 rounded-sm group hover:bg-primary transition-all duration-500">
                                    <point.icon className="w-6 h-6 text-primary group-hover:text-black mb-4 transition-colors" />
                                    <h3 className="text-sm font-black uppercase italic tracking-widest text-white group-hover:text-black transition-colors mb-2">{point.title}</h3>
                                    <p className="text-[11px] text-white/40 group-hover:text-black/60 leading-relaxed transition-colors">{point.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
