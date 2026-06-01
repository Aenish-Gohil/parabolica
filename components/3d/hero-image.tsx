"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the parallax effect
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation and movement
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize mouse position from -0.5 to 0.5
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 z-5 flex items-center justify-center md:justify-end overflow-hidden pointer-events-none"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-[300px] h-[400px] sm:w-[450px] sm:h-[600px] lg:w-[550px] lg:h-[750px] md:mr-10 lg:mr-20 pointer-events-auto"
      >
        {/* Floating Background Glow (Integrated with theme) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent)] blur-3xl" />

        {/* The Image with Radial Fading Mask to remove the gray background edges */}
        <div 
          className="relative w-full h-full"
          style={{
            maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 80%)",
          }}
        >
           <Image 
             src="/hero-slider/image.png" 
             alt="Parabolica Hero" 
             fill 
             className="object-cover mix-blend-lighten dark:mix-blend-normal opacity-90"
             priority
           />
        </div>

        {/* 3D Decorative Floating Text/Elements */}
        <motion.div 
           style={{ translateZ: 100, x: translateX, y: translateY }}
           className="absolute top-1/4 -left-10 text-primary/20 font-black text-6xl select-none"
        >
          01
        </motion.div>
        
        <motion.div 
           style={{ translateZ: 150 }}
           className="absolute bottom-1/4 -right-10 whitespace-nowrap text-foreground/5 font-black text-8xl rotate-90 select-none"
        >
          PARABOLICA
        </motion.div>

        {/* Dynamic Light Reflection */}
        <motion.div 
           style={{ 
             translateX: useTransform(mouseX, [-0.5, 0.5], [50, -50]),
             translateY: useTransform(mouseY, [-0.5, 0.5], [50, -50]),
             translateZ: 200
           }}
           className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
