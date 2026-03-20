import React from "react";

const Lights: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.8} color="#a0a0ff" />
      {/* Key light - main illumination from upper right */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      {/* Accent light - purple/indigo from the left */}
      <pointLight position={[-4, 2, 3]} intensity={3} color="#6366f1" distance={12} decay={2} />
      {/* Rim light - subtle backlight */}
      <pointLight position={[0, -2, -5]} intensity={1.5} color="#818cf8" distance={10} decay={2} />
      {/* Fill light from below */}
      <pointLight position={[0, -3, 2]} intensity={0.5} color="#4338ca" distance={8} decay={2} />
    </>
  );
};

export default Lights;
