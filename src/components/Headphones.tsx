"use client";
import * as THREE from "three";
import { Center, useGLTF, useScroll } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

const Headphones: React.FC = () => {
  const { scene } = useGLTF("./models/headphones.glb");

  const ref = useRef<THREE.Object3D>(null);
  const tl = useRef<GSAPTimeline | null>(null);

  const scroll = useScroll();

  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }
  });

  useEffect(() => {
    if (ref.current) {
      tl.current = gsap.timeline();

      const positions = [
        { x: -1.5, y: -0.1, z: 0.5 },
        { x: 1.5, y: 0, z: -0.5 },
        { x: -0.5, y: 1.5, z: 1 },
        { x: 1.5, y: 0, z: 1.0 },
      ];

      const rotations = [
        { x: 0, y: 1.5, z: 0 },
        { x: 0, y: -1.5, z: 0 },
        { x: 1.5, y: 1.5, z: 0 },
        { x: 0, y: 0, z: 0 },
      ];

      positions.forEach((pos, i) => {
        tl.current!.to(
          ref.current!.position,
          {
            duration: 0.5,
            x: pos.x,
            y: pos.y,
            z: pos.z,
          },
          i * 0.5
        );
        tl.current!.to(
          ref.current!.rotation,
          {
            duration: 0.5,
            x: rotations[i].x,
            y: rotations[i].y,
            z: rotations[i].z,
          },
          i * 0.5
        );
      });
    }
  }, []);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name === "Circle") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#000000"),
            roughness: 0.5,
            metalness: 1.0,
          });
        } else if (
          mesh.name === "Speaker_Right" ||
          mesh.name === "Speaker_Left"
        ) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#000000"),
            roughness: 0.5,
            metalness: 0.7,
          });
        } else if (mesh.name === "Squis_Right" || mesh.name === "Squis_Left") {
          mesh.material = new THREE.MeshStandardMaterial({
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
      <primitive ref={ref} object={scene} />
    </Center>
  );
};

export default Headphones;
