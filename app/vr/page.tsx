"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgress from "@/components/scroll-progress";
import Footer from "@/components/footer";
import VRHero        from "@/components/sections/vr-hero";
import VRHeadset     from "@/components/sections/vr-headset";
import VRController  from "@/components/sections/vr-controller";
import VRHaptics     from "@/components/sections/vr-haptics";
import VRArena       from "@/components/sections/vr-arena";
import VRGames       from "@/components/sections/vr-games";
import VRBookingCTA  from "@/components/sections/vr-booking-cta";
import { useLenis }  from "@/components/smooth-scroll";

export default function VRArenaPage() {
    const [isCalibrating, setIsCalibrating] = useState(true);
    const lenis = useLenis();

    useEffect(() => {
        const timer = setTimeout(() => setIsCalibrating(false), 3000);
        if (lenis) lenis.scrollTo(0, { immediate: true });
        return () => clearTimeout(timer);
    }, [lenis]);

    return (
        <main className="bg-black min-h-screen text-white overflow-hidden">
            <ScrollProgress />

            {/* ── Calibration intro ── */}
            <AnimatePresence>
                {isCalibrating && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 text-center"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="w-32 h-32 border-t-2 border-r-2 border-primary rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-primary font-mono text-xs animate-pulse tracking-[0.5em]">PARABOLICA VR</span>
                            </div>
                        </div>
                        <h2 className="mt-8 font-black italic uppercase tracking-widest text-xl">Calibrating Nexus...</h2>
                        <p className="mt-2 text-white/20 font-mono text-[10px] uppercase tracking-[0.2em]">
                            Synchronizing Haptic Vests // Initializing Neural Link
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Page sections ── */}
            <div className={`transition-opacity duration-1000 ${isCalibrating ? "opacity-0" : "opacity-100"}`}>
                {/* 1. Hero — smoky, pulsing Enter button */}
                <VRHero />

                {/* 2. VR Headset — gear section 1 */}
                <VRHeadset />

                {/* 3. VR Controller — gear section 2 */}
                <VRController />

                {/* 4. Haptic Vest — gear section 3 */}
                <VRHaptics />

                {/* 5. The Arena — physical venue */}
                <VRArena />

                {/* 6. Choose Your Virtual Destiny — game library */}
                <VRGames />

                {/* 7. Book a session CTA */}
                <VRBookingCTA />

                <Footer />
            </div>
        </main>
    );
}
