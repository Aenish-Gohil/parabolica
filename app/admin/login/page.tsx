"use client";

import { useState } from "react";
import { supabaseAdmin as supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Shield, Lock, User, ArrowRight, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { verifyAdmin } from "@/lib/api";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // 1. Authenticate with Supabase
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            // 2. CHECK VIA FASTAPI BACKEND (Bypasses RLS blocks)
            try {
                const adminData = await verifyAdmin();
                
                // 3. Redirect to their assigned terminal
                const target = adminData.terminal === 'ALL' ? '/admin/surat' : `/admin/${adminData.terminal.toLowerCase()}`;
                router.push(target);
            } catch (err: any) {
                // If the backend says no, they aren't an admin
                console.error("ADMIN VERIFY FAILED:", err);
                await supabase.auth.signOut();
                throw new Error("ACCESS DENIED: Neural signature not found in Admin Registry.");
            }

        } catch (err: any) {
            setError(err.message || "Authentication Failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#00ffd2] selection:text-black">
            <Navbar />
            
            <div className="container mx-auto px-6 pt-40 pb-20 flex flex-col items-center justify-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md space-y-12"
                >
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-white/[0.03] border-2 border-white/10 flex items-center justify-center rounded-sm group">
                                <Shield className="w-10 h-10 text-[#00ffd2] group-hover:scale-110 transition-transform" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Mission Control</h1>
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Authorized Personnel Only // Sector Lock Active</p>
                    </div>

                    <form onSubmit={handleAdminLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <input 
                                    type="email"
                                    placeholder="ADMIN EMAIL"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/[0.03] border-2 border-white/10 p-5 pl-12 text-sm font-mono uppercase outline-none focus:border-[#00ffd2] transition-all"
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <input 
                                    type="password"
                                    placeholder="ACCESS KEY"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/[0.03] border-2 border-white/10 p-5 pl-12 text-sm font-mono uppercase outline-none focus:border-[#00ffd2] transition-all"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3"
                            >
                                <Terminal className="w-4 h-4 text-red-500" />
                                <span className="text-[10px] font-mono text-red-500 uppercase font-bold tracking-widest">{error}</span>
                            </motion.div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#00ffd2] text-black py-6 font-black italic uppercase text-xl hover:bg-white transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                        >
                            {loading ? "AUTHENTICATING..." : (
                                <>
                                    OPEN SECTOR GATE <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-12 border-t border-white/5 text-center">
                        <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                            System Monitoring Active. All unauthorized access attempts are logged and transmitted to Cyber Ops.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
