"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import Headphones from "@/components/canvas/3d-models/Headphones";
import HomeOverlay from "@/components/pages/home/HomeOverlay";
import Experience from "@/components/canvas/setup/Experience";
import Lights from "@/components/canvas/setup/Lights";
import LoadingScreen from "@/components/shared/LoadingScreen";
import CameraRig from "@/components/canvas/CameraRig";
import FloatingParticles from "@/components/canvas/FloatingParticles";
import PostProcessing from "@/components/canvas/PostProcessing";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Canvas flat gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 8, 25]} />
        <CameraRig />
        <ScrollControls pages={6} damping={0.4}>
          <HomeOverlay />
          <Headphones />
          <FloatingParticles />
        </ScrollControls>
        <Experience />
        <Lights />
        <PostProcessing />
      </Canvas>
    </>
  );
}
