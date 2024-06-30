import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="flex justify-between items-center gap-10 flex-col h-full">
      <div className="pt-80">
        <h1 className="text-white font-bold text-7xl">
          Elevate Your Listening Experience
        </h1>
      </div>
      <div className=" justify-self-end pb-28 max-w-sm">
        <p className="text-white font-light text-xl">
          Welcome to the ultimate 3D audio experience with our cutting-edge
          headphones.
        </p>
      </div>
    </div>
  );
};

export default Hero;
