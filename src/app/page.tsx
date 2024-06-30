"use client";

import Headphones from "@/components/Headphones";
import Experience from "@/components/setup/Experience";
import Lights from "@/components/setup/Lights";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <Canvas flat>
      <OrbitControls />
      <Experience />
      <Lights />
      <Headphones />
    </Canvas>
  );
}
