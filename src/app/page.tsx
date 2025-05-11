"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import Headphones from "@/components/canvas/3d-models/Headphones";
import HomeOverlay from "@/components/pages/home/HomeOverlay";
import Experience from "@/components/canvas/setup/Experience";
import Lights from "@/components/canvas/setup/Lights";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Canvas flat>
        <ScrollControls pages={5} damping={0.5}>
          <HomeOverlay />
          <Headphones />
        </ScrollControls>
        <Experience />
        <Lights />
      </Canvas>
    </>
  );
}
