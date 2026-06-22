"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundEffects } from "@/components/background-effects";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#060606] text-white">
      <Navbar />
      
      <div className="fixed inset-0 z-0">
        <BackgroundEffects variant="noise" opacity={0.03} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#060606]" />
      </div>

      <div className="relative z-10 pt-40 pb-24 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="border-b border-white/10 pb-12">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase mb-4">Terms of Service</h1>
            <p className="text-xs font-mono tracking-[0.4em] text-white/30 uppercase">Operational Protocol: 2026.01</p>
          </div>

          <section className="space-y-6">
            <h2 className="text-xl font-bold italic text-[#00ffd2] uppercase tracking-widest">01 / Acceptance of Protocols</h2>
            <p className="text-white/60 leading-relaxed font-light">
              By entering the Parabolica VR Arena or F1 Simulation zone, you agree to comply with all safety operational protocols. Failure to follow marshal instructions may result in session termination without refund.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold italic text-[#00ffd2] uppercase tracking-widest">02 / Liability Release</h2>
            <p className="text-white/60 leading-relaxed font-light">
              Participants acknowledge that VR and high-motion simulation can cause motion sickness or disorientation. Parabolica Studio is not responsible for physical symptoms arising from standard hardware operation.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold italic text-[#00ffd2] uppercase tracking-widest">03 / Booking & Refunds</h2>
            <p className="text-white/60 leading-relaxed font-light">
              Cancellations must be made 24 hours prior to the scheduled mission. Credits or rescheduling are at the discretion of the Terminal Manager. Late arrivals may result in reduced mission time.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold italic text-[#00ffd2] uppercase tracking-widest">04 / Code of Conduct</h2>
            <p className="text-white/60 leading-relaxed font-light">
              We maintain a zero-tolerance policy for harassment or deliberate equipment misuse. Pilots must respect the arena boundaries and the digital integrity of the sim-racing leagues.
            </p>
          </section>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
