import { Scroll } from "@react-three/drei";
import React from "react";
import Hero from "./Hero";

const HomeOverlay: React.FC = () => {
  return (
    <Scroll html>
      <div className="px-10 w-screen">
        <Section>
          <Hero />
        </Section>
        <Section>
          <h1>HERO</h1>
        </Section>
        <Section>
          <h1>HERO</h1>
        </Section>
        <Section>
          <h1>HERO</h1>
        </Section>
        <Section>
          <h1>HERO</h1>
        </Section>
      </div>
    </Scroll>
  );
};

const Section = ({ children }: { children: React.ReactNode }) => {
  return <section className="h-screen w-full">{children}</section>;
};

export default HomeOverlay;
