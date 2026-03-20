"use client";

import React from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

const PostProcessing: React.FC = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette offset={0.3} darkness={0.7} />
    </EffectComposer>
  );
};

export default PostProcessing;
