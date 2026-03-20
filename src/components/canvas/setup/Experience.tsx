import { Environment } from "@react-three/drei";
import React from "react";

const Experience: React.FC = () => {
  return (
    <Environment preset="night" environmentIntensity={0.4} />
  );
};

export default Experience;
