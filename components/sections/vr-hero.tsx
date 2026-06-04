"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BlurReveal } from "../blur-reveal";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function VRHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    // Animated smoke particles on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Smoke particle
        type Particle = { x: number; y: number; r: number; alpha: number; vx: number; vy: number; va: number };
        const particles: Particle[] = [];

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 80 + Math.random() * 180,
                alpha: Math.random() * 0.12,
                vx: (Math.random() - 0.5) * 0.15,
                vy: -Math.random() * 0.3 - 0.1,
                va: (Math.random() - 0.5) * 0.0003,
            });
        }

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
                g.addColorStop(0, `rgba(255,107,0,${p.alpha})`);
                g.addColorStop(0.5, `rgba(255,60,0,${p.alpha * 0.3})`);
                g.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;
                p.alpha += p.va;
                if (p.alpha < 0.01) p.alpha = 0.01;
                if (p.alpha > 0.14) p.va *= -1;
                if (p.y + p.r < 0) { p.y = canvas.height + p.r; p.x = Math.random() * canvas.width; }
                if (p.x < -p.r || p.x > canvas.width + p.r) p.vx *= -1;
            });
            animId = requestAnimationFrame(tick);
        };
        tick();

        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">

            {/* Smoke canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

            {/* Grid overlay */}
            <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Vignette */}
            <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)]" />

            {/* Top / bottom smoke fades */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-[3] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-[3] pointer-events-none" />

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 text-center">

                <BlurReveal>
                    <span className="text-primary font-mono tracking-[0.5em] uppercase text-[10px] mb-6 block">
                        Arena Series // Ver. 2.0 · Neural Link Protocol
                    </span>
                </BlurReveal>

                <BlurReveal>
                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6">
                        STEP INTO<br />
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(135deg, #ff6b00 0%, #ff3000 50%, rgba(255,255,255,0.15) 100%)" }}
                        >
                            ANOTHER WORLD
                        </span>
                    </h1>
                </BlurReveal>

                <BlurReveal>
                    <p className="max-w-xl mx-auto text-white/40 text-sm md:text-base leading-relaxed mb-4 font-light italic">
                        The boundary between digital and physical is{" "}
                        <span className="text-white not-italic font-semibold">gone</span>. Your body enters our arena.
                        Your mind enters the game. The question is — are you{" "}
                        <span className="text-primary font-semibold not-italic">curious enough</span> to find out what's on the other side?
                    </p>
                </BlurReveal>

                <BlurReveal>
                    <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em] mb-10">
                        ⚡ Real haptics · 4K visual · &lt;5ms latency · Full-body immersion
                    </p>
                </BlurReveal>

                {/* Desktop: Enter button */}
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <Link href="/vr-world">
                            <motion.button
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(255,107,0,0.3)",
                                        "0 0 50px rgba(255,107,0,0.7)",
                                        "0 0 20px rgba(255,107,0,0.3)",
                                    ],
                                }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                                className="group relative overflow-hidden border border-primary px-12 py-5 uppercase tracking-[0.4em] text-xs font-mono text-white bg-primary/10 hover:bg-primary transition-all duration-500"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <span className="relative z-10 group-hover:text-black transition-colors font-black">
                                    ▶ Enter Virtual World
                                </span>
                                <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                            </motion.button>
                        </Link>
                        <span className="text-white/20 font-mono text-[9px] tracking-[0.3em] uppercase">
                            Direct portal · No download needed
                        </span>
                    </motion.div>
                )}

                {/* Mobile: scroll prompt instead of VR world link */}
                {isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <div className="border border-white/20 px-8 py-4 text-center">
                            <p className="text-white/60 font-mono text-[10px] uppercase tracking-[0.3em] leading-relaxed">
                                🖥️ Virtual World requires a desktop browser<br />
                                Scroll down to explore the gear
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <span className="text-white/20 font-mono text-[9px] tracking-[0.4em] uppercase">Scroll</span>
                <ChevronDown className="w-4 h-4 text-white/20" />
            </motion.div>
        </section>
    );
}
