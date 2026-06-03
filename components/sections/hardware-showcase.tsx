"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { BlurReveal } from "../blur-reveal";

const RIGS = [
    {
        id: "red",
        img: "/f1 red.png",
        name: "Red Bull Racing",
        accent: "#00E0FF",
        smoke: "rgba(0, 224, 255, 0.15)",
        parts: [
            {
                id: "wheel",
                title: "Direct Drive Wheel",
                desc: "Feel every vibration of the track. Industrial-grade motors provide instantaneous feedback.",
                position: { top: "31%", left: "56%" },
                card: "top-right"
            },
            {
                id: "pedals",
                title: "Haptic Pedals",
                desc: "Precision braking at 300km/h. Load-cell tech mimics real F1 cockpit pressure.",
                position: { top: "33%", left: "36%" },
                card: "top-left"
            },
            {
                id: "actuators",
                title: "Motion Actuators",
                desc: "Full-body immersion. High-frequency pistons simulate every bump and kerb.",
                position: { top: "82%", left: "26%" },
                card: "bottom-left"
            },
            {
                id: "cockpit-red",
                title: "Red Bull Cockpit",
                desc: "Elite ergonomics. The authentic low-seating position for maximum stability.",
                position: { top: "35%", left: "72%" },
                card: "bottom-right"
            }
        ]
    },
    {
        id: "fer",
        img: "/f1 fer.png",
        name: "Scuderia Ferrari",
        accent: "#FF2800",
        smoke: "rgba(255, 40, 0, 0.2)",
        parts: [
            {
                id: "cockpit-fer",
                title: "Ferrari Cockpit",
                desc: "Legendary Rosso Corsa craftsmanship. Precision carbon-fiber engineering.",
                position: { top: "35%", left: "72%" },
                card: "bottom-right"
            }
        ]
    },
    {
        id: "mcc",
        img: "/f1 mcc.png",
        name: "McLaren Racing",
        accent: "#FF8000",
        smoke: "rgba(255, 128, 0, 0.2)",
        parts: [
            {
                id: "cockpit-mcc",
                title: "McLaren Cockpit",
                desc: "Papaya performance. Ultralight composite materials for rapid response.",
                position: { top: "35%", left: "72%" },
                card: "bottom-right"
            }
        ]
    },
    {
        id: "mec",
        img: "/f1 mec.png",
        name: "Mercedes-AMG",
        accent: "#00A19B",
        smoke: "rgba(0, 161, 155, 0.2)",
        parts: [
            {
                id: "cockpit-mec",
                title: "Mercedes Cockpit",
                desc: "Silver Arrows precision. Ergonomically optimized for endurance racing.",
                position: { top: "35%", left: "72%" },
                card: "bottom-right"
            }
        ]
    }
];

export default function HardwareShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section ref={containerRef} className="relative h-[800vh] bg-black">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Dynamic Smoky Atmosphere */}
                <SmokyBackground progress={smoothProgress} />

                {/* Background Text Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] whitespace-nowrap z-0">
                    <h2 className="text-[30vw] font-black italic uppercase tracking-tighter text-white">SIMULATOR</h2>
                </div>

                {/* Global Rig Display Area */}
                <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center z-10">

                    {/* Rig Images Layer */}
                    {RIGS.map((rig, i) => (
                        <RigImage
                            key={rig.id}
                            rig={rig}
                            index={i}
                            total={RIGS.length}
                            progress={smoothProgress}
                        />
                    ))}

                    {/* Hotspots and Cards Layer */}
                    {RIGS.map((rig, i) => (
                        <RigDetaills
                            key={`details-${rig.id}`}
                            rig={rig}
                            index={i}
                            total={RIGS.length}
                            progress={smoothProgress}
                        />
                    ))}
                </div>

                {/* Title / Brand Display */}
                <BrandIndicator progress={smoothProgress} />

            </div>
        </section>
    );
}

function SmokyBackground({ progress }: { progress: MotionValue<number> }) {
    const smokeColors = RIGS.map(r => r.smoke);
    const background = useTransform(
        progress,
        [0, 0.25, 0.5, 0.75, 1],
        [smokeColors[0], smokeColors[0], smokeColors[1], smokeColors[2], smokeColors[3]]
    );

    return (
        <motion.div
            style={{
                background: useTransform(background, v => `radial-gradient(circle at 50% 50%, ${v} 0%, transparent 70%)`)
            }}
            className="absolute inset-0 z-0 pointer-events-none transition-all duration-1000"
        >
            {/* Moving Grainy Smoke Layers */}
            <motion.div
                animate={{
                    x: [-20, 20],
                    y: [-10, 10],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20 mix-blend-screen bg-[url('/intro/scanlines.png')] bg-repeat"
            />
        </motion.div>
    );
}

function RigImage({ rig, index, total, progress }: { rig: any, index: number, total: number, progress: MotionValue<number> }) {
    const start = index / total;
    const end = (index + 1) / total;

    const opacity = useTransform(progress, [start - 0.05, start, end - 0.05, end], [0, 1, 1, 0]);
    const scale = useTransform(progress, [start - 0.05, start, end], [1.05, 1, 0.95]);

    return (
        <motion.div
            style={{ opacity, scale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <img
                src={rig.img}
                alt={rig.name}
                className="w-full h-full max-w-5xl object-contain p-12"
            />
        </motion.div>
    );
}

function RigDetaills({ rig, index, total, progress }: { rig: any, index: number, total: number, progress: MotionValue<number> }) {
    const rigStart = index / total;
    const rigEnd = (index + 1) / total;

    return (
        <div className="absolute inset-0 pointer-events-none">
            {rig.parts.map((part: any, partIndex: number) => {
                let partStart, partEnd;
                if (rig.id === "red") {
                    const step = (rigEnd - rigStart) / rig.parts.length;
                    partStart = rigStart + (partIndex * step);
                    partEnd = rigStart + ((partIndex + 1) * step);
                } else {
                    partStart = rigStart;
                    partEnd = rigEnd;
                }

                return (
                    <React.Fragment key={part.id}>
                        <Hotspot
                            part={part}
                            start={partStart}
                            end={partEnd}
                            progress={progress}
                            color={rig.accent}
                        />
                        <InfoCard
                            part={part}
                            start={partStart}
                            end={partEnd}
                            progress={progress}
                            color={rig.accent}
                            index={partIndex}
                        />
                    </React.Fragment>
                );
            })}
        </div>
    );
}

function Hotspot({ part, start, end, progress, color }: { part: any, start: number, end: number, progress: MotionValue<number>, color: string }) {
    const opacity = useTransform(progress, [start - 0.02, start, end - 0.02, end], [0, 1, 1, 0]);
    const scale = useTransform(progress, [start - 0.02, start, end - 0.02, end], [0.5, 1.5, 1.5, 0.5]);

    return (
        <motion.div
            style={{
                top: part.position.top,
                left: part.position.left,
                opacity,
                scale
            }}
            className="hidden md:block absolute z-30 -translate-x-1/2 -translate-y-1/2"
        >
            <div className="relative flex items-center justify-center">
                <div
                    className="w-6 h-6 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center"
                    style={{ backgroundColor: color }}
                >
                    <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div style={{ borderColor: color }} className="absolute w-12 h-12 border-2 opacity-30 rounded-full animate-ping" />
            </div>
        </motion.div>
    );
}

function InfoCard({ part, start, end, progress, color, index }: { part: any, start: number, end: number, progress: MotionValue<number>, color: string, index: number }) {
    const opacity = useTransform(progress, [start - 0.02, start, end - 0.02, end], [0, 1, 1, 0]);
    const y = useTransform(progress, [start - 0.02, start, end - 0.02, end], [20, 0, 0, -20]);

    const getCardPosition = (pos: string) => {
        switch (pos) {
            case "top-left": return "top-[15%] left-[5%]";
            case "top-right": return "top-[15%] right-[5%]";
            case "bottom-left": return "bottom-[15%] left-[5%]";
            case "bottom-right": return "bottom-[15%] right-[5%]";
            default: return "bottom-[15%] right-[5%]";
        }
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute z-40 w-full max-w-sm px-6 ${getCardPosition(part.card)}`}
        >
            <div className="p-8 rounded-sm bg-black/95 border border-white/5 shadow-2xl relative">
                <div style={{ backgroundColor: color }} className="absolute top-0 left-0 w-1.5 h-full" />
                <div className="relative z-10">
                    <span style={{ color }} className="text-[10px] font-mono tracking-[0.5em] uppercase mb-4 block">Ref // 0{index + 1}</span>
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-4 text-white">{part.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed font-light">{part.desc}</p>
                </div>
            </div>
        </motion.div>
    );
}

function BrandIndicator({ progress }: { progress: MotionValue<number> }) {
    const opacity = useTransform(progress, [0, 0.05], [0, 1]);
    const activeRig = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [RIGS[0].name, RIGS[0].name, RIGS[1].name, RIGS[2].name, RIGS[3].name]);
    const activeColor = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [RIGS[0].accent, RIGS[0].accent, RIGS[1].accent, RIGS[2].accent, RIGS[3].accent]);

    return (
        <motion.div
            style={{ opacity }}
            className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-50 pointer-events-none"
        >
            <span className="text-white/20 font-mono tracking-[0.5em] uppercase text-[10px] mb-2 block">Parabolica Edition</span>
            <motion.h2
                style={{ color: activeColor }}
                className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter"
            >
                {activeRig}
            </motion.h2>
        </motion.div>
    );
}
