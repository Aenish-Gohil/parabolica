"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlurReveal } from "../blur-reveal";
import { Hand, Crosshair, Zap, RotateCcw } from "lucide-react";

const CONTROLS = [
    {
        icon: Hand,
        key: "Grip Trigger",
        action: "Pick Up Weapons & Objects",
        desc: "Squeeze the grip trigger to grab guns, shields, or any in-game object. Natural, instinctive feel.",
        color: "#ff6b00",
    },
    {
        icon: Crosshair,
        key: "Index Trigger",
        action: "Fire / Interact",
        desc: "Pull to shoot, cast abilities, or interact with the environment. Hair-trigger response < 2ms.",
        color: "#00ff95",
    },
    {
        icon: Zap,
        key: "Thumbstick",
        action: "Move & Sprint",
        desc: "Left stick to move through the arena. Push forward and hold grip to activate sprint mode.",
        color: "#00e0ff",
    },
    {
        icon: RotateCcw,
        key: "Menu Button",
        action: "Reload / Inventory",
        desc: "Quick-press to reload your weapon. Hold for 1s to open inventory and swap loadouts mid-game.",
        color: "#ff00e0",
    },
];

export default function VRController() {
    return (
        <section className="relative py-24 md:py-40 bg-[#020202] overflow-hidden">

            {/* Smoky atmosphere — mirrored side */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_70%_60%_at_80%_50%,rgba(0,255,149,0.06)_0%,transparent_70%)]" />
                <div className="absolute bottom-0 left-0 w-[50%] h-full bg-[radial-gradient(ellipse_60%_70%_at_10%_80%,rgba(255,107,0,0.05)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[url('/intro/scanlines.png')] opacity-[0.025]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <BlurReveal>
                        <span className="text-primary font-mono tracking-[0.5em] uppercase text-[10px] mb-4 block">
                            Hardware // Tier 2
                        </span>
                    </BlurReveal>
                    <BlurReveal>
                        <h2 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter leading-tight">
                            YOUR HANDS.<br />
                            <span className="text-white/20" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                                YOUR WEAPONS.
                            </span>
                        </h2>
                    </BlurReveal>
                    <BlurReveal>
                        <p className="max-w-2xl mx-auto text-white/40 text-sm md:text-base leading-relaxed mt-6 font-light">
                            Every gesture, every grip — translated into the virtual world in real time.
                            Our <span className="text-white font-medium">precision motion controllers</span> are the link between your instincts and the battlefield.
                        </p>
                    </BlurReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Controls list */}
                    <div className="space-y-4">
                        {CONTROLS.map((ctrl, i) => (
                            <motion.div
                                key={ctrl.key}
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.12, duration: 0.7 }}
                                className="group flex gap-5 p-6 bg-white/[0.03] border border-white/[0.07] hover:border-white/20 transition-all duration-500"
                            >
                                <div
                                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center border"
                                    style={{ borderColor: `${ctrl.color}30`, background: `${ctrl.color}10` }}
                                >
                                    <ctrl.icon className="w-5 h-5" style={{ color: ctrl.color }} />
                                </div>
                                <div>
                                    <div className="text-[9px] font-mono tracking-[0.4em] uppercase mb-1" style={{ color: ctrl.color }}>
                                        {ctrl.key}
                                    </div>
                                    <div className="text-white font-black italic uppercase tracking-tight text-sm mb-1">
                                        {ctrl.action}
                                    </div>
                                    <div className="text-[11px] text-white/30 leading-relaxed">{ctrl.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Controller image */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,149,0.12)_0%,transparent_70%)] blur-2xl" />
                        <img
                            src="/vr_controller_hero.png"
                            alt="VR Controller"
                            className="relative z-10 w-full max-w-md mx-auto drop-shadow-[0_0_80px_rgba(0,255,149,0.25)]"
                        />

                        {/* Ping dots */}
                        {[
                            { top: "20%", left: "60%", label: "INDEX TRIGGER" },
                            { top: "55%", left: "25%", label: "GRIP" },
                            { top: "75%", left: "55%", label: "THUMBSTICK" },
                        ].map((dot) => (
                            <div
                                key={dot.label}
                                className="absolute z-20 group/dot"
                                style={{ top: dot.top, left: dot.left }}
                            >
                                <div className="w-3 h-3 bg-primary rounded-full animate-ping opacity-60" />
                                <div className="absolute inset-0 w-3 h-3 bg-primary rounded-full" />
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/80 border border-white/10 px-3 py-1 whitespace-nowrap opacity-0 group-hover/dot:opacity-100 transition-opacity">
                                    <span className="text-[9px] font-mono text-primary tracking-widest uppercase">{dot.label}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
