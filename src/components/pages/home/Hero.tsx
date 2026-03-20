import React from "react";
import Reveal from "@/components/shared/animations/Reveal";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen pt-28 pb-12">
      {/* Top label */}
      <div className="flex justify-center">
        <Reveal transition={{ delay: 0.8, duration: 0.8 }}>
          <div className="glass rounded-full px-5 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/50">
              Next-Gen Audio Experience
            </span>
          </div>
        </Reveal>
      </div>

      {/* Center title */}
      <div className="flex flex-col items-center gap-6 -mt-10">
        <Reveal transition={{ delay: 1, duration: 1 }}>
          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-center leading-[0.9] tracking-tighter">
            <span className="gradient-text">Elevate</span>
            <br />
            <span className="gradient-text-accent">Your Sound</span>
          </h1>
        </Reveal>
        <Reveal transition={{ delay: 1.3, duration: 0.8 }}>
          <p className="text-white/40 text-base sm:text-lg text-center max-w-md font-light leading-relaxed">
            Immersive 3D audio engineered for those who demand perfection.
          </p>
        </Reveal>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-end w-full max-md:flex-col max-md:items-center max-md:gap-8">
        {/* Price */}
        <Reveal transition={{ delay: 1.5 }}>
          <div className="flex items-baseline gap-1">
            <span className="text-white/30 text-sm font-light">From</span>
            <span className="text-white text-3xl font-bold tracking-tight">
              $299
            </span>
            <span className="text-white/30 text-sm font-light">.99</span>
          </div>
        </Reveal>

        {/* Scroll indicator */}
        <Reveal transition={{ delay: 1.7 }}>
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">
              Scroll to explore
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
              <div className="w-full h-3 bg-accent animate-scroll-down" />
            </div>
          </div>
        </Reveal>

        {/* Quick spec */}
        <Reveal transition={{ delay: 1.5 }}>
          <div className="flex gap-6">
            <div className="text-right">
              <p className="text-white text-sm font-medium">40h</p>
              <p className="text-white/30 text-xs">Battery</p>
            </div>
            <div className="w-[1px] bg-white/10" />
            <div className="text-right">
              <p className="text-white text-sm font-medium">-45dB</p>
              <p className="text-white/30 text-xs">ANC</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Hero;
