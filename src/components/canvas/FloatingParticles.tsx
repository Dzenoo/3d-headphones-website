"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";

const particleTexture = "/textures/particles/1.png";

const PARTICLE_COUNT = 150;

const FloatingParticles: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);
  const texture = useLoader(THREE.TextureLoader, particleTexture);

  const { angles, radii, heights, speeds } = useMemo(() => {
    const angles = new Float32Array(PARTICLE_COUNT);
    const radii = new Float32Array(PARTICLE_COUNT);
    const heights = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      angles[i] = Math.random() * Math.PI * 2;
      radii[i] = 1.5 + Math.random() * 3;
      heights[i] = (Math.random() - 0.5) * 4;
      speeds[i] = 0.02 + Math.random() * 0.04;
    }

    return { angles, radii, heights, speeds };
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = Math.cos(angles[i]) * radii[i];
      pos[i * 3 + 1] = heights[i];
      pos[i * 3 + 2] = Math.sin(angles[i]) * radii[i];
    }
    return pos;
  }, [angles, radii, heights]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const angle = angles[i] + time * speeds[i];
      const r = radii[i];

      posArray[i3] = Math.cos(angle) * r;
      posArray[i3 + 1] = heights[i] + Math.sin(time * 0.3 + i) * 0.15;
      posArray[i3 + 2] = Math.sin(angle) * r;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#a5b4fc"
        size={0.01}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaMap={texture}
      />
    </points>
  );
};

export default FloatingParticles;
