"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BlurReveal } from "../blur-reveal";
import {
  Zap,
  Cpu,
  Settings,
  Activity,
  Users,
  Gauge,
  Gamepad2,
  Dna
} from "lucide-react";

const DYNAMICS = [
  {
    main: "4DOF",
    sub: "Motion Platform",
    desc: "Precision actuators simulating heave, pitch, roll, and lateral surge for true immersion.",
    icon: Zap
  },
  {
    main: "Force",
    sub: "Feedback Steering",
    desc: "Industrial-grade Direct Drive motors providing up to 25Nm of raw, authentic torque.",
    icon: Gauge
  },
  {
    main: "MOZA",
    sub: "Racing Pedals",
    desc: "High-precision load-cell technology for millimetric braking and acceleration control.",
    icon: Settings
  },
  {
    main: "Formula",
    sub: "Cockpit",
    desc: "Ergonomically engineered seating position identical to a real F1 monocoque.",
    icon: Gamepad2
  },
  {
    main: "Realistic",
    sub: "G-Forces",
    desc: "Advanced motion algorithms that replicate the physical strain of high-speed cornering.",
    icon: Dna
  },
  {
    main: "Real-Time",
    sub: "Physics",
    desc: "Ultra-low latency processing ensuring every track detail is felt instantaneously.",
    icon: Cpu
  },
  {
    main: "Multiplayer",
    sub: "Racing",
    desc: "Compete against other drivers in the terminal or globally in synchronized sessions.",
    icon: Users
  },
  {
    main: "Performance",
    sub: "Analytics",
    desc: "Deep-dive telemetry data to analyze your lap times and improve your racing line.",
    icon: Activity
  }
];

function TiltCard({ item, index }: { item: typeof DYNAMICS[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative h-full w-full bg-[#0a0a0a] border border-white/10 p-8 cursor-pointer overflow-hidden"
    >
      {/* Bent Corner Effect (Lando Style) */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-[#1a1a1a] translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-white/10 z-20" />

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-300">
            <item.icon className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-white/20 tracking-[0.3em]">0{index + 1}</span>
        </div>

        <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-[0.9] mb-4">
          <span className="text-primary block">{item.main}</span>
          <span className="text-white/40 block group-hover:text-white transition-colors duration-300">{item.sub}</span>
        </h3>

        <p className="text-xs text-white/30 leading-relaxed font-light group-hover:text-white/60 transition-colors duration-300">
          {item.desc}
        </p>
      </div>

      {/* Hover Backdrop Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function F1Dynamics() {
  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Cinematic Smokey Background */}
      <div className="absolute inset-0 z-0">
        {/* Main Glow */}
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full" />

        {/* Moving Smoke Particles */}
        <motion.div
          animate={{
            x: [-10, 10, -10],
            y: [-20, 20, -20],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,255,155,0.05)_0%,transparent_50%)]"
        />

        {/* Grainy Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-16 md:mb-24">
          <BlurReveal>
            <span className="text-primary font-mono tracking-[0.5em] uppercase text-xs mb-4 block">The Science of Racing</span>
          </BlurReveal>
          <BlurReveal>
            <h2 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter leading-tight mb-8">
              BEYOND SIMULATION:<br />
              <span className="text-white/40">THE DYNAMICS OF SPEED</span>
            </h2>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DYNAMICS.map((item, i) => (
            <TiltCard key={item.main} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
