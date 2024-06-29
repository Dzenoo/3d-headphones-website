"use client";

import Headphones from "@/components/Headphones";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <Canvas flat>
      <Headphones />
    </Canvas>
  );
}
