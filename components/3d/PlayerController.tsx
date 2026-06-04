"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Bounds {
    minX: number; maxX: number;
    minZ: number; maxZ: number;
}

export default function PlayerController({ bounds }: { bounds: Bounds }) {
    const { camera, gl } = useThree();
    const euler    = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
    const keys     = useRef({ w: false, a: false, s: false, d: false });
    const spawned  = useRef(false);

    useEffect(() => {
        const canvas = gl.domElement;

        // ── Spawn ──
        if (!spawned.current) {
            camera.position.set(0, 1.8, 5);
            camera.rotation.order = "YXZ";
            euler.current.set(0, 0, 0);
            camera.rotation.copy(euler.current);
            spawned.current = true;
        }

        // ── Click canvas → request pointer lock ──
        const onClick = () => {
            if (document.pointerLockElement !== canvas) {
                canvas.requestPointerLock();
            }
        };
        canvas.addEventListener("click", onClick);

        // ── Mouse look (only when locked) ──
        const onMouseMove = (e: MouseEvent) => {
            if (document.pointerLockElement !== canvas) return;
            const sensitivity = 0.0018;
            euler.current.y -= e.movementX * sensitivity;
            euler.current.x -= e.movementY * sensitivity;
            // Clamp vertical look: can't flip upside-down
            euler.current.x = THREE.MathUtils.clamp(euler.current.x, -Math.PI / 2.2, Math.PI / 2.2);
            camera.rotation.copy(euler.current);
        };
        document.addEventListener("mousemove", onMouseMove);

        // ── WASD ──
        const onKeyDown = (e: KeyboardEvent) => {
            const k = e.key.toLowerCase();
            if (k in keys.current) keys.current[k as keyof typeof keys.current] = true;
        };
        const onKeyUp = (e: KeyboardEvent) => {
            const k = e.key.toLowerCase();
            if (k in keys.current) keys.current[k as keyof typeof keys.current] = false;
        };
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            canvas.removeEventListener("click", onClick);
            document.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        };
    }, [camera, gl]);

    useFrame((_, delta) => {
        const speed = 6 * delta;

        // Forward/right from current yaw only (no Y component)
        const yaw = euler.current.y;
        const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
        const right   = new THREE.Vector3( Math.cos(yaw), 0, -Math.sin(yaw));

        if (keys.current.w) camera.position.addScaledVector(forward, speed);
        if (keys.current.s) camera.position.addScaledVector(forward, -speed);
        if (keys.current.d) camera.position.addScaledVector(right,   speed);
        if (keys.current.a) camera.position.addScaledVector(right,   -speed);

        // ── Hard boundary clamp ──
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, bounds.minX, bounds.maxX);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, bounds.minZ, bounds.maxZ);

        // Lock eye height
        camera.position.y = 1.8;
    });

    return null;
}