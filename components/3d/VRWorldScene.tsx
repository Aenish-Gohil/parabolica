"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import PlayerController from "./PlayerController";
import City from "./City";

const CITY_BOUNDS = {
    minX: -4.78,
    maxX: 4.70,
    minZ: -5.84,
    maxZ: 5.72,
};

export default function VRWorldScene() {
    const router = useRouter();

    // Press Q → exit to /vr (works even while pointer is locked)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "q") {
                document.exitPointerLock?.();
                router.push("/vr");
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [router]);

    const exitToVR = () => {
        document.exitPointerLock?.();
        router.push("/vr");
    };

    return (
        <div style={{ width: "100%", height: "100%", position: "relative", cursor: "none" }}>

            {/* ── Full-screen 3D Canvas ── */}
            <Canvas
                camera={{ position: [0, 1.8, 5], fov: 75 }}
                style={{ width: "100%", height: "100%" }}
            >
                <color attach="background" args={["#0a0a0a"]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 20, 10]} intensity={2} castShadow />
                <pointLight position={[0, 5, 0]} intensity={0.8} color="#ff6b00" />
                <hemisphereLight args={["#1a1a2e", "#000000", 0.4]} />

                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[200, 200]} />
                    <meshStandardMaterial color="#111111" />
                </mesh>

                <City />
                <PlayerController bounds={CITY_BOUNDS} />
            </Canvas>

            {/* ── Crosshair ── */}
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 20, height: 20, pointerEvents: "none", zIndex: 10,
            }}>
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.7)", transform: "translateY(-50%)" }} />
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.7)", transform: "translateX(-50%)" }} />
            </div>

            {/* ── Top-left HUD: controls info + exit button ── */}
            <div style={{
                position: "absolute", top: 20, left: 20, zIndex: 20,
                display: "flex", flexDirection: "column", gap: 8,
            }}>
                {/* Controls legend */}
                <div style={{
                    background: "rgba(0,0,0,0.55)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    padding: "10px 16px",
                    fontFamily: "monospace",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    lineHeight: 2,
                    pointerEvents: "none",
                }}>
                    <div><span style={{ color: "#ff6b00" }}>WASD</span> · Move</div>
                    <div><span style={{ color: "#ff6b00" }}>MOUSE</span> · Look</div>
                    <div><span style={{ color: "#ff6b00" }}>ESC</span> · Unlock cursor</div>
                    <div><span style={{ color: "#ff6b00" }}>Q</span> · Exit world</div>
                </div>

                {/* Exit button */}
                <button
                    onClick={exitToVR}
                    style={{
                        background: "rgba(0,0,0,0.6)",
                        border: "1px solid rgba(255,107,0,0.4)",
                        backdropFilter: "blur(8px)",
                        color: "#ff6b00",
                        fontFamily: "monospace",
                        fontSize: 10,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        padding: "8px 16px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                        (e.target as HTMLButtonElement).style.background = "rgba(255,107,0,0.15)";
                        (e.target as HTMLButtonElement).style.borderColor = "rgba(255,107,0,0.9)";
                    }}
                    onMouseLeave={e => {
                        (e.target as HTMLButtonElement).style.background = "rgba(0,0,0,0.6)";
                        (e.target as HTMLButtonElement).style.borderColor = "rgba(255,107,0,0.4)";
                    }}
                >
                    ← Return to VR Arena
                </button>
            </div>

            {/* ── Fading bottom hint ── */}
            <div style={{
                position: "absolute", bottom: 24, left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "monospace", fontSize: 10,
                letterSpacing: "0.4em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                pointerEvents: "none", zIndex: 10,
                animation: "fadeHint 6s ease forwards",
                whiteSpace: "nowrap",
            }}>
                Click to look around · WASD to move · Q to exit
            </div>

            <style>{`
                @keyframes fadeHint {
                    0%,50% { opacity: 1; }
                    100%   { opacity: 0; }
                }
            `}</style>
        </div>
    );
}