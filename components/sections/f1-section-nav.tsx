"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
    { id: "hero", label: "01 // OVERVIEW" },
    { id: "hardware", label: "02 // ENGINEERING" },
    { id: "dynamics", label: "03 // DYNAMICS" },
    { id: "booking", label: "04 // TERMINAL" }
];

export default function F1SectionNav() {
    const [activeSection, setActiveSection] = useState("hero");
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            const sectionOffsets = SECTIONS.map(section => {
                const el = document.getElementById(section.id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // Add a 30% offset for more natural triggering
                    return { id: section.id, top: Math.abs(rect.top - window.innerHeight * 0.3) };
                }
                return { id: section.id, top: Infinity };
            });

            const closest = sectionOffsets.reduce((min, curr) => 
                curr.top < min.top ? curr : min
            );

            setActiveSection(closest.id);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Empty dependency array is safe now because we're just calling setActiveSection

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed top-1/2 left-8 md:left-12 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-8 pointer-events-none">
            {/* Progress Bar Background */}
            <div className="absolute left-[3px] top-0 bottom-0 w-[1px] bg-white/10" />
            
            {/* Active Progress Bar */}
            <motion.div 
                style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                className="absolute left-[3px] top-0 bottom-0 w-[1px] bg-primary shadow-[0_0_10px_#00ff95]"
            />

            {SECTIONS.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group flex items-center gap-6 pointer-events-auto transition-all"
                >
                    <div className="relative">
                        <div className={`w-2 h-2 rounded-full border border-white/20 transition-all duration-300 ${activeSection === section.id ? "bg-primary border-primary scale-125 shadow-[0_0_10px_#00ff95]" : "bg-transparent"}`} />
                    </div>
                    <span className={`text-[10px] font-mono tracking-[0.3em] transition-all duration-500 whitespace-nowrap ${activeSection === section.id ? "text-white translate-x-2" : "text-white/20 group-hover:text-white/60"}`}>
                        {section.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
