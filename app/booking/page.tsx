"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BlurReveal } from "@/components/blur-reveal";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Users, ChevronRight } from "lucide-react";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-container">
        <div className="container mx-auto">
          <BlurReveal>
            <span className="text-[#00ffd2] font-mono tracking-[0.5em] uppercase text-xs mb-6 block">
              [ RESERVATION TERMINAL ]
            </span>
          </BlurReveal>
          <BlurReveal>
            <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8] mb-12">
              INITIATE <br />
              <span className="text-white/20">PROCESS.</span>
            </h1>
          </BlurReveal>
        </div>
      </section>

      {/* Process Placeholder */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                    <BlurReveal>
                        <h2 className="text-3xl md:text-5xl font-bold italic uppercase tracking-tight">System Initialization <br /> in Progress</h2>
                    </BlurReveal>
                    <BlurReveal>
                        <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                          We are currently calibrating the booking engines for our Mumbai and Surat terminals. Our high-precision reservation system will be online shortly.
                        </p>
                    </BlurReveal>
                    
                    <div className="space-y-6">
                        <ProcessStep number="01" title="Select Your Zone" description="Choose from VR Arena, F1 Simulators, or Private Decks." />
                        <ProcessStep number="02" title="Pick Your Slot" description="Available daily from 11:00 AM to 02:00 AM." />
                        <ProcessStep number="03" title="Lock the Session" description="Instant confirmation via encrypted terminal link." />
                    </div>

                    <BlurReveal>
                        <div className="pt-8">
                             <Link 
                                href="/#events"
                                className="inline-flex items-center gap-4 text-xs font-mono tracking-[0.4em] uppercase text-[#00ffd2] hover:text-white transition-colors group"
                             >
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                                Return to Hub
                             </Link>
                        </div>
                    </BlurReveal>
                </div>

                <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] z-10" />
                    <motion.div 
                        animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-40 h-40 border-t-2 border-[#00ffd2] rounded-full shadow-[0_0_50px_rgba(0,255,210,0.3)] animate-pulse"
                    />
                    <span className="absolute z-20 font-mono text-[10px] tracking-[0.6em] animate-pulse">CALIBRATING</span>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
    return (
        <BlurReveal>
            <div className="flex gap-8 group">
                <span className="text-[#00ffd2] font-mono text-xs pt-1">{number}</span>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold italic uppercase group-hover:text-[#00ffd2] transition-colors">{title}</h3>
                    <p className="text-sm text-white/30">{description}</p>
                </div>
            </div>
        </BlurReveal>
    )
}
