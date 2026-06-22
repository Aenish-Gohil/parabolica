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
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-10"
                        >
                            <img 
                                src="/haptic_vest_hero.png" 
                                alt="Haptic Vest Tech" 
                                className="w-full max-w-lg mx-auto drop-shadow-[0_0_50px_rgba(0,255,150,0.2)]"
                            />
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
                                <span className="text-white/40">SINGLE HIT</span>
                            </h2>
                        </BlurReveal>
                        <BlurReveal>
                            <p className="text-white/40 text-sm md:text-base leading-relaxed mb-12 font-light">
                                Ever wondered what it feels like to be inside a game? Our haptic vests let you literally <span className="text-white font-medium">feel the world</span>. From the gentle tap of a raindrop to the powerful recoil of a laser blast, your entire body will react to the environment, making every mission feel incredibly real.
                            </p>
                        </BlurReveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {HAPTIC_POINTS.slice(0, 4).map((point, i) => (
                                <motion.div 
                                    key={point.id} 
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="p-6 bg-white/5 border border-white/10 rounded-sm group hover:bg-primary transition-all duration-300 cursor-default"
                                >
                                    <point.icon className="w-6 h-6 text-primary group-hover:text-black mb-4 transition-colors" />
                                    <h3 className="text-sm font-black uppercase italic tracking-widest text-white group-hover:text-black transition-colors mb-2">{point.title}</h3>
                                    <p className="text-[11px] text-white/40 group-hover:text-black/60 leading-relaxed transition-colors">{point.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
