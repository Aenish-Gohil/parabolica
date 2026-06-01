"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, OrbitControls, useTexture } from "@react-three/drei";

function LiquidBlobMask({ onTextureUpdate }: { onTextureUpdate: (tex: THREE.Texture) => void }) {
    const { size, gl } = useThree();
    const rtOutput = useMemo(() => new THREE.WebGLRenderTarget(size.width, size.height), [size]);
    const fbTexture = useMemo(() => new THREE.FramebufferTexture(size.width, size.height), [size]);

    const rtCamera = useMemo(() => new THREE.Camera(), []);
    const rtScene = useMemo(() => {
        const s = new THREE.Scene();
        const geom = new THREE.PlaneGeometry(2, 2);
        const mat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        
        (mat as any).onBeforeCompile = (shader: any) => {
            shader.uniforms.dTime = { value: 0 };
            shader.uniforms.aspect = { value: size.width / size.height };
            shader.uniforms.pointer = { value: new THREE.Vector2().setScalar(10) };
            shader.uniforms.pointerDown = { value: 1 };
            shader.uniforms.pointerRadius = { value: 0.35 };
            shader.uniforms.pointerDuration = { value: 2.5 };
            shader.uniforms.fbTexture = { value: fbTexture };

            shader.fragmentShader = `
                uniform float dTime;
                uniform float aspect;
                uniform vec2 pointer;
                uniform float pointerDown;
                uniform float pointerRadius;
                uniform float pointerDuration;
                uniform sampler2D fbTexture;
                ${shader.fragmentShader}
            `.replace(
                `#include <color_fragment>`,
                `#include <color_fragment>
                float duration = pointerDuration;
                float rVal = texture2D(fbTexture, vUv).r;
                rVal -= clamp(dTime / duration, 0., 0.1);
                rVal = clamp(rVal, 0., 1.0);
                
                float f = 0.0;
                if (pointerDown > 0.5){
                  vec2 uv = (vUv - 0.5) * 2.0 * vec2(aspect, 1.0);
                  vec2 mouse = pointer * vec2(aspect, 1.0);
                  f = 1.0 - smoothstep(pointerRadius * 0.1, pointerRadius, distance(uv, mouse));
                }
                rVal += f * 0.15;
                rVal = clamp(rVal, 0.0, 1.0);
                diffuseColor.rgb = vec3(rVal);
                `
            );
            mat.userData.uniforms = shader.uniforms;
        };
        
        mat.defines = { "USE_UV": "" };
        const mesh = new THREE.Mesh(geom, mat);
        s.add(mesh);
        return { scene: s, mesh };
    }, [size, fbTexture]);

    const pointer = useRef(new THREE.Vector2().setScalar(10));

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("pointermove", handleMove);
        return () => window.removeEventListener("pointermove", handleMove);
    }, []);

    useFrame((_, delta) => {
        const uniforms = rtScene.mesh.material.userData.uniforms;
        if (uniforms) {
            uniforms.dTime.value = delta;
            uniforms.pointer.value.copy(pointer.current);
            uniforms.aspect.value = size.width / size.height;
        }

        gl.setRenderTarget(rtOutput);
        gl.render(rtScene.scene, rtCamera);
        gl.copyFramebufferToTexture(fbTexture, new THREE.Vector2(0, 0));
        gl.setRenderTarget(null);

        onTextureUpdate(rtOutput.texture);
    });

    return null;
}

function Experience() {
    const [blobTexture, setBlobTexture] = useState<THREE.Texture | null>(null);
    const { scene: headScene } = useGLTF("https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb");
    const { scene: helmetScene } = useGLTF("https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf");
    
    // Use useTexture for better reactive loading
    const revealTexture = useTexture("/hero-slider/image.png");

    const headRef = useRef<THREE.Group>(null!);
    const helmetRef = useRef<THREE.Group>(null!);

    useEffect(() => {
        const head = headScene.children[0] as THREE.Mesh;
        if (head) {
            head.geometry.rotateY(Math.PI * 0.01);
            head.material = new THREE.MeshMatcapMaterial({ color: 0xeeeeee });
        }
    }, [headScene]);

    useEffect(() => {
        const helmet = helmetScene.children[0] as THREE.Mesh;
        if (revealTexture) {
            revealTexture.flipY = false;
        }

        if (helmet && helmet.material) {
            const redBullMaterial = new THREE.MeshStandardMaterial({
                color: 0x0c1d36, // Navy blue (Red Bull base)
                metalness: 0.8,
                roughness: 0.2,
            });
            
            (redBullMaterial as any).onBeforeCompile = (shader: any) => {
                shader.uniforms.texBlob = { value: blobTexture };
                shader.uniforms.texReveal = { value: revealTexture };
                shader.vertexShader = `
                    varying vec4 vPosProj;
                    varying vec2 vUvLocal;
                    ${shader.vertexShader}
                `.replace(
                    `#include <project_vertex>`,
                    `#include <project_vertex>
                    vPosProj = gl_Position;
                    vUvLocal = uv;
                    `
                );
                shader.fragmentShader = `
                    uniform sampler2D texBlob;
                    uniform sampler2D texReveal;
                    varying vec4 vPosProj;
                    varying vec2 vUvLocal;
                    ${shader.fragmentShader}
                `.replace(
                    `#include <clipping_planes_fragment>`,
                    `
                    vec2 blobUV = ((vPosProj.xy / vPosProj.w) + 1.0) * 0.5;
                    vec4 blobData = texture(texBlob, blobUV);
                    
                    // Discard the helmet entirely if it's not under the hover "blob"
                    if (blobData.r < 0.01) discard;
                    
                    // Within the blob, show the image.png texture
                    vec4 revealedColor = texture(texReveal, vUvLocal);
                    diffuseColor.rgb = revealedColor.rgb;
                    
                    #include <clipping_planes_fragment>
                    `
                );
                redBullMaterial.userData.shader = shader;
            };
            helmet.material = redBullMaterial;
        }
    }, [helmetScene, blobTexture, revealTexture]);

    useFrame((state) => {
        const currentHelmet = helmetScene.children[0] as THREE.Mesh;
        if (currentHelmet && currentHelmet.material) {
            const mat = currentHelmet.material as any;
            if (mat.userData.shader) {
                mat.userData.shader.uniforms.texBlob.value = blobTexture;
            }
        }

        const time = state.clock.getElapsedTime();
        const rotationVal = Math.sin(time * 0.2) * 0.05;
        if (headRef.current) headRef.current.rotation.y = rotationVal;
        if (helmetRef.current) helmetRef.current.rotation.y = rotationVal;
    });

    return (
        <group position={[6, -1.0, 0]} scale={1.1}>
            <primitive object={headScene} ref={headRef} />
            <primitive 
                object={helmetScene} 
                ref={helmetRef} 
                scale={3.6} 
                position={[0, 1.45, 0.7]} 
                rotation={[Math.PI * 0.5, 0, 0]}
            />
            <LiquidBlobMask onTextureUpdate={setBlobTexture} />
        </group>
    );
}

export function HelmetExperience() {
    return (
        <div className="absolute inset-0 z-5">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={30} />
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.5}
                />
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                <pointLight position={[-5, 5, 10]} intensity={1.5} />
                <Experience />
            </Canvas>
        </div>
    );
}
