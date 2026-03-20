"use client";
import * as THREE from "three";
import { Center, useGLTF, useScroll } from "@react-three/drei";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScrollBasedAnimation } from "@/hooks/useScrollBasedAnimation";

const Headphones: React.FC = () => {
  const { scene } = useGLTF("./models/headphones.glb");
  const ref = useRef<THREE.Object3D>(null);
  const scroll = useScroll();

  // Store references to dynamic materials
  const accentMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const shaderMaterialsRef = useRef<THREE.ShaderMaterial[]>([]);

  useScrollBasedAnimation(ref, {
    positions: [
      new THREE.Vector3(-1.5, -0.1, 0.5),
      new THREE.Vector3(1.5, 0, -0.5),
      new THREE.Vector3(-0.5, 1.5, 1),
      new THREE.Vector3(1.5, 0, 1.0),
      new THREE.Vector3(-0.5, 0, 0.5),
      new THREE.Vector3(0, 0.3, 2),
    ],
    rotations: [
      new THREE.Euler(0, 1.5, 0),
      new THREE.Euler(0, -1.5, 0),
      new THREE.Euler(1.5, 1.5, 0),
      new THREE.Euler(0.1, 0.5, 0.7),
      new THREE.Euler(0, -0.8, 0),
      new THREE.Euler(0.2, 0, 0),
    ],
  });

  const uniforms = useRef({
    uColor: { value: new THREE.Color("#1b1b1b") },
    uAccentColor: { value: new THREE.Color("#6366f1") },
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollOffset = scroll.offset;

    uniforms.current.uTime.value = time;
    uniforms.current.uScrollProgress.value = scrollOffset;

    // Color shift based on scroll — cycles through accent colors
    const hue = 0.65 + scrollOffset * 0.15; // indigo → violet range
    const accentColor = new THREE.Color().setHSL(hue, 0.7, 0.55);

    accentMaterialsRef.current.forEach((mat) => {
      mat.emissive.lerp(accentColor, 0.03);
    });

    shaderMaterialsRef.current.forEach((mat) => {
      mat.uniforms.uAccentColor.value.lerp(accentColor, 0.03);
    });
  });

  useEffect(() => {
    const accentMats: THREE.MeshStandardMaterial[] = [];
    const shaderMats: THREE.ShaderMaterial[] = [];

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        if (mesh.name === "Circle") {
          const mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#0a0a0a"),
            roughness: 0.3,
            metalness: 1.0,
            emissive: new THREE.Color("#6366f1"),
            emissiveIntensity: 0.1,
          });
          mesh.material = mat;
          accentMats.push(mat);
        } else if (
          mesh.name === "Speaker_Right" ||
          mesh.name === "Speaker_Left"
        ) {
          const mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#0a0a0a"),
            roughness: 0.2,
            metalness: 0.9,
            emissive: new THREE.Color("#6366f1"),
            emissiveIntensity: 0.05,
          });
          mesh.material = mat;
          accentMats.push(mat);
        } else if (
          mesh.name === "Squis_Right" ||
          mesh.name === "Squis_Left"
        ) {
          const mat = new THREE.ShaderMaterial({
            vertexShader: `
              varying vec3 vNormal;
              varying vec3 vPosition;
              varying vec2 vUv;
              uniform float uTime;
              uniform float uScrollProgress;

              void main() {
                vec3 transformed = position;

                float waveAmplitude = 0.08 + uScrollProgress * 0.05;
                float waveFrequency = 3.0;
                float wave = sin(transformed.x * waveFrequency + uTime * 2.0) * waveAmplitude;
                wave += sin(transformed.z * waveFrequency * 0.5 + uTime * 1.5) * waveAmplitude * 0.5;
                transformed.y += wave;

                vec4 modelPosition = modelMatrix * vec4(transformed, 1.0);
                gl_Position = projectionMatrix * viewMatrix * modelPosition;

                vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
                vNormal = modelNormal.xyz;
                vPosition = modelPosition.xyz;
                vUv = uv;
              }
            `,
            fragmentShader: `
              uniform vec3 uColor;
              uniform vec3 uAccentColor;
              uniform float uTime;
              uniform float uScrollProgress;
              varying vec3 vNormal;
              varying vec3 vPosition;
              varying vec2 vUv;

              vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower) {
                vec3 lightDirection = normalize(lightPosition);
                vec3 lightReflection = reflect(-lightDirection, normal);
                float shading = max(0.0, dot(normal, lightDirection));
                float specular = pow(max(0.0, -dot(lightReflection, viewDirection)), specularPower);
                return lightColor * lightIntensity * (shading + specular);
              }

              void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDirection = normalize(vPosition - cameraPosition);

                // Mix base color with accent based on scroll
                vec3 baseColor = uColor;
                vec3 color = mix(baseColor, uAccentColor * 0.3, uScrollProgress * 0.4);

                // Fresnel edge glow
                float fresnel = pow(1.0 - abs(dot(normal, -viewDirection)), 3.0);
                color += uAccentColor * fresnel * 0.4;

                vec3 light = vec3(0.0);
                light += directionalLight(vec3(1.0), 1.5, normal, vec3(0.0, 0.0, 3.0), viewDirection, 20.0);
                light += directionalLight(uAccentColor, 0.8, normal, vec3(-3.0, 2.0, 1.0), viewDirection, 10.0);
                color *= light;

                // Subtle color pulse
                color += uAccentColor * 0.02 * sin(uTime * 2.0);

                gl_FragColor = vec4(color, 1.0);
                #include <tonemapping_fragment>
                #include <colorspace_fragment>
              }
            `,
            uniforms: uniforms.current,
          });
          mesh.material = mat;
          shaderMats.push(mat);
        } else {
          // Default material for other parts
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#111111"),
            roughness: 0.4,
            metalness: 0.8,
          });
        }
      }
    });

    accentMaterialsRef.current = accentMats;
    shaderMaterialsRef.current = shaderMats;
  }, [scene]);

  useLayoutEffect(() => {
    const updateScale = () => {
      if (ref.current) {
        const screenWidth = window.innerWidth;
        const scale = screenWidth < 768 ? 0.65 : 1;
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
