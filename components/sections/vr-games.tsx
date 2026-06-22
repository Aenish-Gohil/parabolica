"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BlurReveal } from "../blur-reveal";

const GAMES = [
  {
    title: "Shadow Strike",
    type: "Tactical Shooter",
    difficulty: "Challenging",
    color: "#00ff95"
  },
  {
    title: "Space Racer",
    type: "High-Speed Racing",
    difficulty: "Easy to Learn",
    color: "#00e0ff"
  },
  {
    title: "Cyber Defense",
    type: "Guard the Base",
    difficulty: "Intermediate",
    color: "#ff00e0"
  },
  {
    title: "Vortex Legend",
    type: "Epic Adventure",
    difficulty: "Advanced",
    color: "#fffb00"
  }
];

export default function VRGames() {
    const router = useRouter();
    return (
        <section className="py-24 md:py-32 bg-black relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <BlurReveal>
                            <span className="text-primary font-mono tracking-[0.5em] uppercase text-[10px] mb-4 block">Simulation Library</span>
                        </BlurReveal>
                        <BlurReveal>
                            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight">
                                PICK YOUR<br />
                                <span className="text-white/40">ADVENTURE</span>
                            </h2>
                        </BlurReveal>
                    </div>
                    <BlurReveal>
                        <p className="text-white/20 text-xs font-mono uppercase tracking-widest max-w-xs md:text-right">
                            Ready for launch // All systems green
                        </p>
                    </BlurReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {GAMES.map((game, i) => (
                        <motion.div
                            key={game.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative h-[450px] bg-[#0a0a0a] border border-white/5 overflow-hidden cursor-pointer"
                        >
                            {/* Animated Background Gradient */}
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                style={{ background: `radial-gradient(circle at center, ${game.color}, transparent)` }}
                            />

                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                <div>
                                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-2 block">{game.type}</span>
                                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white group-hover:text-primary transition-colors">{game.title}</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-white/20">DIFFICULTY</span>
                                        <span className="text-[10px] font-mono text-white" style={{ color: game.color }}>{game.difficulty}</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-white/10" />
                                    <button
                                        onClick={() => router.push("/vr-world")}
                                        className="w-full py-3 bg-white/5 border border-white/10 text-white font-black italic uppercase tracking-widest text-[10px] group-hover:bg-white group-hover:text-black transition-all"
                                    >
                                        Initialize Sim
                                    </button>
                                </div>
                            </div>

                            {/* Scanline Effect */}
                            <div 
                                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{
                                    backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)",
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
