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

  const uniforms = {
    uColor: { value: new THREE.Color("#1b1b1b") },
    uTime: { value: 0 },
  };

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();

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
          mesh.material = new THREE.ShaderMaterial({
            vertexShader: `
              varying vec3 vNormal;
              varying vec3 vPosition;
              uniform float uTime;

              void main() {
                vec3 transformed = position;

                // Apply wave effect
                float waveAmplitude = 0.1;
                float waveFrequency = 2.0;
                transformed.y += sin(transformed.x * waveFrequency + uTime) * waveAmplitude;

                vec4 modelPosition = modelMatrix * vec4(transformed, 1.0);
                gl_Position = projectionMatrix * viewMatrix * modelPosition;

                vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
                vNormal = modelNormal.xyz;
                vPosition = modelPosition.xyz;
              }
            `,
            fragmentShader: `
              uniform vec3 uColor;
              varying vec3 vNormal;
              varying vec3 vPosition;

              vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower) {
                  vec3 lightDirection = normalize(lightPosition);
                  vec3 lightReflection = reflect(-lightDirection, normal);
                  float shading = dot(normal, lightDirection);
                  shading = max(0.0, shading);
                  float specular = -dot(lightReflection, viewDirection);
                  specular = max(0.0, specular);
                  specular = pow(specular, specularPower);
                  return lightColor * lightIntensity * shading + lightColor * lightIntensity * specular;
              }

               void main() {
                    vec3 normal = normalize(vNormal);

                    vec3 viewDirection = normalize(vPosition - cameraPosition);

                    vec3 color = uColor;

                    // Lights
                    vec3 light = vec3(0.0);
                    light += directionalLight(vec3(1.0, 1.0, 1.0), 2.0, normal, vec3(0.0, 0.0, 3.0), viewDirection, 17.0);
                    color *= light;

                    // Final color
                    gl_FragColor = vec4(color, 1.0);
                    #include <tonemapping_fragment>
                    #include <colorspace_fragment>
              }
            `,
            uniforms,
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
