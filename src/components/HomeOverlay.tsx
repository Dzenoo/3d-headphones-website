import { Scroll } from "@react-three/drei";
import React from "react";
import Hero from "./Hero";

const HomeOverlay: React.FC = () => {
  return (
    <Scroll html>
      <div className="px-10 w-screen">
        <Section hero>
          <Hero />
        </Section>
        <Section align="right">
          <div className="flex flex-col gap-5 justify-start pt-60 ">
            <div>
              <h1 className="font-bold text-5xl text-white">
                Immersive 3D Audio
              </h1>
            </div>
            <div className="max-w-xl">
              <p className="text-lg text-white">
                Experience sound like never before with our advanced 3D audio
                technology. Enjoy a fully immersive auditory experience that
                places you at the center of your favorite music, movies, and
                games.
              </p>
            </div>
          </div>
        </Section>
        <Section align="left">
          <div className="flex flex-col gap-5 justify-start">
            <div>
              <h1 className="font-bold text-5xl text-white">
                Noise Cancelling
              </h1>
            </div>
            <div className="max-w-xl">
              <p className="text-lg text-white">
                Block out the world and focus on what matters. Our cutting-edge
                noise cancelling technology ensures that you can enjoy your
                audio
              </p>
            </div>
          </div>
        </Section>
        <Section align="right">
          <div className="flex flex-col gap-5 justify-start">
            <div>
              <h1 className="font-bold text-5xl text-white">
                Wireless Connectivity
              </h1>
            </div>
            <div className="max-w-xl">
              <p className="text-lg text-white">
                Say goodbye to tangled wires. With seamless wireless
                connectivity, our headphones provide the freedom and convenience
                you need, whether you're on the go or relaxing at home.
              </p>
            </div>
          </div>
        </Section>
        <Section align="left">
          <div className="flex flex-col gap-5 justify-start">
            <div>
              <h1 className="font-bold text-5xl text-white">
                Comfort-Focused Design
              </h1>
            </div>
            <div className="max-w-xl">
              <p className="text-lg text-white">
                Designed with your comfort in mind, our headphones feature plush
                ear cushions and an ergonomic design that ensures a perfect fit
                for extended listening sessions.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </Scroll>
  );
};

const Section = ({
  children,
  hero,
  align,
}: {
  hero?: boolean;
  children: React.ReactNode;
  align?: "left" | "right" | "center";
}) => {
  const alignmentClass =
    align === "right"
      ? "flex flex-col items-end"
      : align === "left"
      ? "flex flex-col items-start"
      : "flex flex-col items-center";

  return (
    <section className={`h-screen w-full ${hero ? null : alignmentClass}`}>
      {children}
    </section>
  );
};

export default HomeOverlay;
