"use client";
import { useEffect } from "react";
import Hero from "@/components/sections/hero";
import HardwareShowcase from "@/components/sections/hardware-showcase";
import F1Dynamics from "@/components/sections/f1-dynamics";
import F1BookingCTA from "@/components/sections/f1-booking-cta";
import F1SectionNav from "@/components/sections/f1-section-nav";
import F1ReturnHome from "@/components/sections/f1-return-home";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";
import { BackgroundCar } from "@/components/background-car";
import { useLenis } from "@/components/smooth-scroll";

export default function F1Page() {
  const lenis = useLenis();

  useEffect(() => {
    // Force scroll to top on mount
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);
  return (
    <>
      <ScrollProgress />
      <F1SectionNav />

      <main className="relative min-h-screen">
        <BackgroundCar />

        <div className="relative z-10 w-full">
          <div id="hero"><Hero /></div>
          <div id="hardware"><HardwareShowcase /></div>
          <div id="dynamics"><F1Dynamics /></div>
          <div id="booking"><F1BookingCTA /></div>
          <F1ReturnHome />
        </div>
      </main>
      <Footer />
    </>
  );
}