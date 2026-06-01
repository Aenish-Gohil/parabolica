"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function BackgroundCar() {
  const { scrollYProgress } = useScroll();
  
  // Subtle parallax move
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 0.1]); // Increased initial opacity

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none flex items-center justify-center overflow-hidden bg-background">
      <motion.div 
        style={{ y, scale, opacity }}
        className="relative w-full h-full max-w-[1400px] flex items-center justify-center translate-y-[-10%]"
      >
        <Image
          src="/hero-slider/2026mclarencarright.png"
          alt="McLaren background"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
      
      {/* Soft Vignette to help car blend into background colors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-60" />
    </div>
  );
}
