"use client";

import Headphones from "@/components/Headphones";
import Experience from "@/components/setup/Experience";
import Lights from "@/components/setup/Lights";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <Canvas flat>
      <Experience />
      <Lights />
      <Headphones />
    </Canvas>
  );
}
