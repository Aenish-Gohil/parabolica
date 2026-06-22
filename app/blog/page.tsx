"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundEffects } from "@/components/background-effects";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Trophy, Clock, Zap, MapPin, ChevronRight, Activity, Users, Settings, Database, Share2 } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const [currentRace, setCurrentRace] = useState({
    name: "Spanish Grand Prix",
    location: "Circuit de Barcelona-Catalunya",
    status: "LIVE - LAP 44/66",
    leader: "Max Verstappen",
    gap: "-0.244s",
    fastestLap: "L. Norris (1:17.377)",
  });

  const standings = [
    { rank: 1, driver: "Max Verstappen", team: "Red Bull", points: 194 },
    { rank: 2, driver: "Charles Leclerc", team: "Ferrari", points: 138 },
    { rank: 3, driver: "Lando Norris", team: "McLaren", points: 131 },
    { rank: 4, driver: "Carlos Sainz", team: "Ferrari", points: 108 },
    { rank: 5, driver: "Sergio Perez", team: "Red Bull", points: 107 },
  ];

  const constructors = [
    { rank: 1, team: "Red Bull Racing", points: 301 },
    { rank: 2, team: "Ferrari", points: 252 },
    { rank: 3, team: "McLaren", points: 212 },
  ];

  const posts = [
    {
      id: 1,
      title: "The Physics of Ground Effect in 2024",
      excerpt: "Deep dive into the venturi tunnels and porpoising challenges faced by top teams in the current era of Formula 1 regulations.",
      category: "Tech Analysis",
      readTime: "8 min read",
      date: "June 20, 2024",
      image: "/blog-hero.png",
      content: "Full analysis including CFD snapshots and telemetry comparisons..."
    },
    {
      id: 2,
      title: "Mastering the Parabolica: Curve 11 Analysis",
      excerpt: "Why the namesake of our studio is the most critical corner in world racing. A simulator driver's guide to the perfect line.",
      category: "Simulation",
      readTime: "5 min read",
      date: "June 18, 2024",
      image: "/assets/menu/f1.png",
    },
    {
      id: 3,
      title: "Next-Gen Haptics: Feeling the Kerbs",
      excerpt: "How our new D-BOX system translates every micro-vibration from the virtual track to your spine.",
      category: "Engineering",
      readTime: "6 min read",
      date: "June 15, 2024",
      image: "/assets/menu/vr.png",
    },
  ];

  return (
    <main className="min-h-screen bg-[#060606] text-white selection:bg-[#00ffd2] selection:text-black">
      <Navbar />
      
      <div className="fixed inset-0 z-0">
        <BackgroundEffects variant="noise" opacity={0.04} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#060606]" />
        {/* Animated Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00ffd2]/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">
        
        {/* SEO Hidden Header */}
        <header className="sr-only">
          <h1>Parabolica Intel - F1 News, Live Data, and Simulation Tech</h1>
          <p>The technical core of sim-racing and VR engineering.</p>
        </header>

        {/* Live Terminal Header */}
        <section className="mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-3xl"
          >
            <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              
              {/* Left Content */}
              <div className="lg:w-2/3 p-8 md:p-14">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    <span className="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase">Live Telemetry</span>
                  </div>
                  <span className="text-[10px] text-white/30 font-mono tracking-widest">SIGNAL STRENGTH: OPTIMAL</span>
                </div>
                
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 italic uppercase leading-none">
                  {currentRace.name}
                </h2>
                
                <div className="flex flex-wrap gap-8 text-white/50 mb-12">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#00ffd2]" />
                    <span className="text-sm font-bold tracking-tight">{currentRace.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-[#00ffd2]" />
                    <span className="text-sm font-bold tracking-tight">{currentRace.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  <Stat label="Leader" value={currentRace.leader} />
                  <Stat label="Interval" value={currentRace.gap} color="text-[#00ffd2]" />
                  <Stat label="Fastest Lap" value={currentRace.fastestLap} />
                  <Stat label="Track Temp" value="44°C" />
                </div>
              </div>

              {/* Right Visual */}
              <div className="lg:w-1/3 relative group min-h-[400px]">
                <Image 
                  src="/blog-hero.png" 
                  alt="Formula 1 Racing Night" 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:bg-gradient-to-l" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                   <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                      <p className="text-[10px] font-black text-[#00ffd2] uppercase tracking-[0.3em] mb-1">Weather Forecast</p>
                      <p className="text-sm font-bold italic">PRECIPITATION RISK: 12%</p>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-16">
            
            <SectionHeader title="Technical Transmissions" count={posts.length} />

            <div className="grid gap-12">
              {posts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="relative w-full md:w-80 h-56 rounded-[1.5rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ring-1 ring-white/10">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {post.category}
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center py-2">
                       <div className="flex items-center gap-4 text-[10px] text-white/30 font-bold uppercase tracking-widest mb-4">
                          <span>{post.date}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span>{post.readTime}</span>
                       </div>
                       <h3 className="text-3xl md:text-4xl font-black leading-[1.1] mb-4 group-hover:text-[#00ffd2] transition-colors tracking-tighter italic">
                         {post.title}
                       </h3>
                       <p className="text-white/50 text-sm leading-relaxed mb-6 font-light">
                         {post.excerpt}
                       </p>
                       <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#00ffd2] group/btn">
                             Initiate Read <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                          <button className="text-white/20 hover:text-white transition-colors">
                             <Share2 size={16} />
                          </button>
                       </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Intelligence Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Live Standings */}
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <h3 className="text-xs font-black tracking-[0.4em] uppercase text-[#00ffd2] mb-8 italic flex items-center gap-2">
                <Users className="w-4 h-4" /> Driver Intel
              </h3>
              
              <div className="space-y-6">
                {standings.map((s) => (
                  <div key={s.driver} className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-white/20 group-hover:text-[#00ffd2] transition-colors">0{s.rank}</span>
                      <div>
                        <p className="text-sm font-bold tracking-tight">{s.driver}</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">{s.team}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white/60">{s.points} PTS</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-10 py-4 rounded-xl border border-white/5 hover:border-[#00ffd2]/30 hover:bg-[#00ffd2]/5 text-[10px] font-black uppercase tracking-widest transition-all">
                Full Standings Data
              </button>
            </div>

            {/* Constructor Intel */}
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10">
              <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white/30 mb-8 italic">Constructor Hub</h3>
              <div className="space-y-6">
                {constructors.map((c) => (
                  <div key={c.team} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold">{c.team}</span>
                      <span className="text-white/40">{c.points}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(c.points/standings[0].points) * 100}%` }}
                        className="h-full bg-[#00ffd2]" 
                       />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Newsletter */}
            <div className="p-8 rounded-[2rem] bg-[#00ffd2] text-black">
              <h3 className="text-xs font-black tracking-[0.4em] uppercase mb-4 italic">The Inside Line</h3>
              <p className="text-sm font-bold mb-6 leading-snug">Private telemetry reports and track guides sent weekly.</p>
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder="PILOT ID (EMAIL)" 
                  className="w-full bg-black/10 border border-black/10 rounded-xl px-4 py-3 text-xs font-bold placeholder:text-black/40 outline-none focus:border-black/30 transition-colors uppercase"
                />
                <button className="w-full bg-black text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[0.98] transition-transform">
                  Synchronize
                </button>
              </div>
            </div>

          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Stat({ label, value, color = "text-white" }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-mono">{label}</p>
      <p className={`text-xl font-black tracking-tight italic ${color}`}>{value}</p>
    </div>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-black italic tracking-tighter uppercase">{title}</h2>
        <span className="text-[10px] font-mono text-white/30 px-2 py-0.5 border border-white/10 rounded">DRIVE_ID: {count}</span>
      </div>
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00ffd2] hover:text-black transition-all cursor-pointer">
           <Database size={14} />
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00ffd2] hover:text-black transition-all cursor-pointer">
           <Settings size={14} />
        </div>
      </div>
    </div>
  );
}
