import { ArrowDown } from "lucide-react";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex-grow flex justify-center items-center">
        <h1 className="text-white font-bold text-7xl text-center max-sm:text-5xl">
          Elevate Your Listening Experience
        </h1>
      </div>
      <div className="flex justify-between gap-28 w-full items-center mb-[7em] max-md:flex-col">
        <div className="flex md:w-1/3">
          <div className="p-5 rounded-full bg-blue-700 text-white w-fit h-fit">
            15.99$
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center p-5 border rounded-full w-fit m-auto">
          <div className="w-5 h-5 bg-white rounded-full animate-bounce"></div>
          <ArrowDown color="white" />
        </div>
        <div className="flex justify-end md:w-1/3">
          <div className="md:max-w-sm max-md:text-center">
            <p className="text-white font-light text-lg">
              Welcome to the ultimate 3D audio experience with our cutting-edge
              headphones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
