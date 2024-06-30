"use client";
import * as THREE from "three";
import { Center, useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Headphones: React.FC = () => {
  const { scene } = useGLTF("./models/headphones.glb");

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        if (child.name === "Circle") {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#000000"),
            roughness: 0.7,
            metalness: 0.8,
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
      <primitive object={scene}></primitive>
    </Center>
  );
};

export default Headphones;
