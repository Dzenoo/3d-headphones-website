import React from "react";
import { Scroll } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import Hero from "./Hero";
import Reveal from "@/components/shared/animations/Reveal";

const HomeOverlay: React.FC = () => {
  return (
    <Scroll html>
      <div className="px-10 w-screen">
        <Section hero>{() => <Hero />}</Section>
        <Section align="right">
          {(inView) => {
            const title = (
              <h1 className="font-bold text-5xl text-white">
                Immersive 3D Audio
              </h1>
            );
            const description = (
              <p className="text-lg text-white">
                Experience sound like never before with our advanced 3D audio
                technology. Enjoy a fully immersive auditory experience that
                places you at the center of your favorite music, movies, and
                games.
              </p>
            );

            return (
              <div className="flex flex-col gap-5 justify-start pt-60 ">
                <div>
                  {inView ? (
                    <Reveal transition={{ delay: 0.5, damping: 10 }}>
                      {title}
                    </Reveal>
                  ) : (
                    title
                  )}
                </div>
                <div className="max-w-xl">
                  {inView ? (
                    <Reveal transition={{ delay: 0.5, damping: 10 }}>
                      {description}
                    </Reveal>
                  ) : (
                    description
                  )}
                </div>
              </div>
            );
          }}
        </Section>
        <Section align="left">
          {(inView) => {
            const title = (
              <h1 className="font-bold text-5xl text-white">
                Noise Cancelling
              </h1>
            );
            const description = (
              <p className="text-lg text-white">
                Block out the world and focus on what matters. Our cutting-edge
                noise cancelling technology ensures that you can enjoy your
                audio
              </p>
            );

            return (
              <div className="flex flex-col gap-5 justify-start">
                <div>
                  {inView ? (
                    <Reveal transition={{ delay: 0.5, damping: 10 }}>
                      {title}
                    </Reveal>
                  ) : (
                    title
                  )}
                </div>
                <div className="max-w-xl">
                  {inView ? (
                    <Reveal transition={{ delay: 0.5, damping: 10 }}>
                      {description}
                    </Reveal>
                  ) : (
                    description
                  )}
                </div>
              </div>
            );
          }}
        </Section>
        <Section align="right">
          {(inView) => {
            const title = (
              <h1 className="font-bold text-5xl text-white">
                Wireless Connectivity
              </h1>
            );
            const description = (
              <p className="text-lg text-white">
                Say goodbye to tangled wires. With seamless wireless
                connectivity, our headphones provide the freedom and convenience
                you need, whether you're on the go or relaxing at home.
              </p>
            );

            return (
              <div className="flex flex-col gap-5 justify-start">
                <div>
                  {inView ? (
                    <Reveal transition={{ delay: 0.5, damping: 10 }}>
                      {title}
                    </Reveal>
                  ) : (
                    title
                  )}
                </div>
                <div className="max-w-xl">
                  {inView ? (
                    <Reveal transition={{ delay: 0.5, damping: 10 }}>
                      {description}
                    </Reveal>
                  ) : (
                    description
                  )}
                </div>
              </div>
            );
          }}
        </Section>
        <Section align="left">
          {(inView) => {
            const title = (
              <h1 className="font-bold text-5xl text-white">
                Comfort-Focused Design
              </h1>
            );
            const description = (
              <p className="text-lg text-white">
                Designed with your comfort in mind, our headphones feature plush
                ear cushions and an ergonomic design that ensures a perfect fit
                for extended listening sessions.
              </p>
            );

            return (
              <div className="flex flex-col gap-5 justify-start">
                <div>
                  {inView ? (
                    <Reveal transition={{ delay: 0.5, damping: 10 }}>
                      {title}
                    </Reveal>
                  ) : (
                    title
                  )}
                </div>
                <div className="max-w-xl">
                  {inView ? (
                    <Reveal transition={{ delay: 0.5, damping: 10 }}>
                      {description}
                    </Reveal>
                  ) : (
                    description
                  )}
                </div>
              </div>
            );
          }}
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
  children: (inView?: boolean) => React.ReactNode;
  hero?: boolean;
  align?: "left" | "right" | "center";
}) => {
  const alignmentClass =
    align === "right"
      ? "flex flex-col items-end"
      : align === "left"
      ? "flex flex-col items-start"
      : "flex flex-col items-center";

  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className={`h-screen w-full ${hero ? "" : alignmentClass}`}
    >
      {children(inView)}
    </section>
  );
};

export default HomeOverlay;
