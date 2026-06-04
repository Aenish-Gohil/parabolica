"use client";

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export default function City() {
    const { scene } = useGLTF("/models/city.glb") as { scene: THREE.Group };

    return <primitive object={scene} />;
}
