"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundEffects } from "@/components/background-effects";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPage() {
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase mb-4">Privacy Policy</h1>
            <p className="text-xs font-mono tracking-[0.4em] text-white/30 uppercase">Last Updated: June 2026</p>
          </div>

          <section className="space-y-6">
            <h2 className="text-xl font-bold italic text-[#00ffd2] uppercase tracking-widest">01 / Data Collection</h2>
            <p className="text-white/60 leading-relaxed font-light">
              Parabolica Studio collects minimal data required to provide our VR and simulation services. This includes contact information (Name, Email, Phone) provided during booking and telemetry data during simulation sessions for performance analysis.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold italic text-[#00ffd2] uppercase tracking-widest">02 / Usage of Information</h2>
            <p className="text-white/60 leading-relaxed font-light">
              Your information is used strictly for scheduling, authenticating pilot sessions, and improving the fidelity of our virtual environments. We do not sell player data to third-party entities.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold italic text-[#00ffd2] uppercase tracking-widest">03 / Security</h2>
            <p className="text-white/60 leading-relaxed font-light">
              We employ military-grade encryption for all stored pilot profiles and financial transactions. Our terminal servers are shielded against unauthorized intrusion to protect the integrity of the Parabolica network.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold italic text-[#00ffd2] uppercase tracking-widest">04 / Contact</h2>
            <p className="text-white/60 leading-relaxed font-light">
              For inquiries regarding your digital footprint within the studio, contact our Data Protection Officer at your respective terminal email (Mumbai or Surat).
            </p>
          </section>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
