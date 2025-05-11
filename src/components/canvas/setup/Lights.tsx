import React from "react";

const Lights: React.FC = () => {
  return (
    <>
      <ambientLight color="#ffffff" intensity={4.5} />
      <pointLight position={[0, 0, 0]} color="#4d4d4d" intensity={5} />
    </>
  );
};

export default Lights;
