"use client";
import * as THREE from "three";
import { Center, useGLTF } from "@react-three/drei";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScrollBasedAnimation } from "@/hooks/useScrollBasedAnimation";

const Headphones: React.FC = () => {
  const { scene } = useGLTF("./models/headphones.glb");

  const ref = useRef<THREE.Object3D>(null);

  useScrollBasedAnimation(ref, {
    positions: [
      new THREE.Vector3(-1.5, -0.1, 0.5),
      new THREE.Vector3(1.5, 0, -0.5),
      new THREE.Vector3(-0.5, 1.5, 1),
      new THREE.Vector3(1.5, 0, 1.0),
      new THREE.Vector3(0, 0, 0),
    ],
    rotations: [
      new THREE.Euler(0, 1.5, 0),
      new THREE.Euler(0, -1.5, 0),
      new THREE.Euler(1.5, 1.5, 0),
      new THREE.Euler(0.1, 0.5, 0.7),
      new THREE.Euler(0, 0, 0),
    ],
  });

  const uniforms = {
    uColor: { value: new THREE.Color("#1b1b1b") },
    uTime: { value: 0 },
  };

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

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

                    vec3 light = vec3(0.0);
                    light += directionalLight(vec3(1.0, 1.0, 1.0), 2.0, normal, vec3(0.0, 0.0, 3.0), viewDirection, 17.0);
                    color *= light;

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

  useLayoutEffect(() => {
    const updateScale = () => {
      if (ref.current) {
        const screenWidth = window.innerWidth;
        const scale = screenWidth < 768 ? 0.7 : 1;
        ref.current.scale.set(scale, scale, scale);
      }
    };

    window.addEventListener("resize", updateScale);
    updateScale();

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <Center>
      <primitive ref={ref} object={scene} />
    </Center>
  );
};

export default Headphones;
