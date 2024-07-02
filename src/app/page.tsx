"use client";

import Headphones from "@/components/Headphones";
import HomeOverlay from "@/components/HomeOverlay";
import Experience from "@/components/setup/Experience";
import Lights from "@/components/setup/Lights";
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <Canvas flat>
      <ScrollControls pages={5} damping={0.25}>
        <HomeOverlay />
        <Headphones />
      </ScrollControls>
      <Experience />
      <Lights />
    </Canvas>
  );
}
