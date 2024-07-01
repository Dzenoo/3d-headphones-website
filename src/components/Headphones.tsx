"use client";
import * as THREE from "three";
import { Center, useGLTF, useScroll } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

const Headphones: React.FC = () => {
  const { scene } = useGLTF("./models/headphones.glb");

  const ref = useRef<any>();
  const tl = useRef<any>();

  const scroll = useScroll();

  useFrame(() => {
    if (tl) {
      tl.current.seek(scroll.offset * tl.current!.duration());
    }
  });

  useEffect(() => {
    tl.current = gsap.timeline();

    tl.current!.to(ref.current!.position, {
      duration: 0.1,
      y: -0.1,
    });
  }, []);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        if (child.name === "Circle") {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#000000"),
            roughness: 0.5,
            metalness: 1.0,
          });
        } else if (
          child.name === "Speaker_Right" ||
          child.name === "Speaker_Left"
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#000000"),
            roughness: 0.5,
            metalness: 0.7,
          });
        } else if (
          child.name === "Squis_Right" ||
          child.name === "Squis_Left"
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#000000"),
            roughness: 0.7,
            metalness: 0.9,
          });
        }
      }
    });
  }, [scene]);

  return (
    <Center>
      <primitive ref={ref} object={scene}></primitive>
    </Center>
  );
};

export default Headphones;
