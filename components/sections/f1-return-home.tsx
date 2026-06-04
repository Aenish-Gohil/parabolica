"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlurReveal } from "../blur-reveal";

export default function F1ReturnHome() {
  return (
    <section className="py-20 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <BlurReveal>
            <h3 className="text-white/20 font-mono tracking-[0.5em] uppercase text-[10px] mb-8">End of Terminal</h3>
        </BlurReveal>
        
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link 
                href="/" 
                className="group flex items-center gap-4 bg-white/5 hover:bg-white text-white hover:text-black px-8 py-4 rounded-full border border-white/10 transition-all duration-300"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-black italic uppercase tracking-widest text-sm">Return to Main Hub</span>
            </Link>
        </motion.div>
      </div>
    </section>
  );
}
