import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function CameraRig() {
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const initialValuesRef = useRef<{
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
  }>({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoordinates({
        x: (e.clientX / window.innerWidth - 0.5) * 0.05,
        y: (e.clientY / window.innerHeight - 0.5) * 0.05,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const camera = state.camera;

    if (!initialValuesRef.current) {
      initialValuesRef.current = {
        position: {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
        },
        rotation: {
          x: camera.rotation.x,
          y: camera.rotation.y,
          z: camera.rotation.z,
        },
      };
    }

    const targetRotationX =
      initialValuesRef.current.rotation.x - mouseCoordinates.x;
    const targetRotationY =
      initialValuesRef.current.rotation.y - mouseCoordinates.y;

    camera.rotation.x += (targetRotationX - camera.rotation.x) * delta * 3;
    camera.rotation.y += (targetRotationY - camera.rotation.y) * delta * 3;
  });

  return null;
}

export default CameraRig;
