import React from "react";
import { Scroll } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import Hero from "./Hero";
import Reveal from "@/components/shared/animations/Reveal";

const features = [
  {
    title: "Immersive 3D Audio",
    subtitle: "Spatial Sound",
    description:
      "Experience sound like never before with our advanced spatial audio engine. Every note, every whisper — positioned in 3D space around you.",
    stats: [
      { value: "360°", label: "Spatial Audio" },
      { value: "24bit", label: "Hi-Res" },
    ],
    align: "right" as const,
  },
  {
    title: "Adaptive Noise Cancelling",
    subtitle: "Pure Silence",
    description:
      "AI-powered noise cancellation that adapts to your environment in real-time. From busy streets to quiet offices — always the perfect level.",
    stats: [
      { value: "-45dB", label: "Reduction" },
      { value: "4 Mics", label: "Array" },
    ],
    align: "left" as const,
  },
  {
    title: "Seamless Connectivity",
    subtitle: "Zero Latency",
    description:
      "Bluetooth 5.3 with multipoint connection. Switch between devices instantly — no pairing screens, no interruptions.",
    stats: [
      { value: "BT 5.3", label: "Protocol" },
      { value: "15m", label: "Range" },
    ],
    align: "right" as const,
  },
  {
    title: "All-Day Comfort",
    subtitle: "Ergonomic Design",
    description:
      "Memory foam ear cushions and adaptive headband distribute weight evenly. Designed for marathon listening sessions without fatigue.",
    stats: [
      { value: "250g", label: "Weight" },
      { value: "40h", label: "Battery" },
    ],
    align: "left" as const,
  },
];

const HomeOverlay: React.FC = () => {
  return (
    <Scroll html>
      <div className="w-screen">
        {/* Hero */}
        <section className="h-screen w-full px-6 sm:px-10">
          <Hero />
        </section>

        {/* Feature Sections */}
        {features.map((feature, index) => (
          <FeatureSection key={index} {...feature} index={index} />
        ))}

        {/* Footer CTA */}
        <FooterSection />
      </div>
    </Scroll>
  );
};

const FeatureSection = ({
  title,
  subtitle,
  description,
  stats,
  align,
  index,
}: (typeof features)[number] & { index: number }) => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const isRight = align === "right";

  return (
    <section
      ref={ref}
      className={`h-screen w-full flex items-center px-6 sm:px-10 ${
        isRight ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-lg ${isRight ? "text-right" : "text-left"}`}
      >
        {inView && (
          <>
            {/* Subtitle tag */}
            <Reveal transition={{ delay: 0.2, duration: 0.6 }}>
              <span className="text-accent text-xs tracking-[0.25em] uppercase font-medium">
                {subtitle}
              </span>
            </Reveal>

            {/* Title */}
            <Reveal transition={{ delay: 0.4, duration: 0.8 }}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-5 leading-[1.05] tracking-tight">
                <span className="gradient-text">{title}</span>
              </h2>
            </Reveal>

            {/* Description */}
            <Reveal transition={{ delay: 0.6, duration: 0.7 }}>
              <p className="text-white/40 text-base sm:text-lg font-light leading-relaxed mb-8">
                {description}
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal transition={{ delay: 0.8, duration: 0.6 }}>
              <div
                className={`flex gap-6 ${
                  isRight ? "justify-end" : "justify-start"
                }`}
              >
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="glass rounded-xl px-5 py-3 flex flex-col items-center min-w-[80px]"
                  >
                    <span className="text-white font-bold text-lg">
                      {stat.value}
                    </span>
                    <span className="text-white/30 text-xs mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
};

const FooterSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10"
    >
      {inView && (
        <div className="text-center max-w-2xl">
          <Reveal transition={{ delay: 0.3, duration: 0.8 }}>
            <span className="text-accent text-xs tracking-[0.3em] uppercase font-medium">
              Ready to elevate?
            </span>
          </Reveal>

          <Reveal transition={{ delay: 0.5, duration: 1 }}>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mt-4 mb-6 leading-[1] tracking-tighter">
              <span className="gradient-text">Experience it</span>
              <br />
              <span className="gradient-text-accent">yourself.</span>
            </h2>
          </Reveal>

          <Reveal transition={{ delay: 0.8, duration: 0.7 }}>
            <p className="text-white/40 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-md mx-auto">
              Premium sound deserves a premium experience. Start yours today.
            </p>
          </Reveal>

          <Reveal transition={{ delay: 1, duration: 0.6 }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:scale-105 active:scale-95">
                Order Now — $299.99
              </button>
              <button className="px-8 py-3.5 rounded-xl glass text-white/60 font-light transition-all duration-300 hover:text-white hover:bg-white/5">
                Learn More
              </button>
            </div>
          </Reveal>

          <Reveal transition={{ delay: 1.2, duration: 0.5 }}>
            <div className="flex items-center justify-center gap-8 mt-12">
              <span className="text-white/20 text-xs">Free Shipping</span>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <span className="text-white/20 text-xs">2-Year Warranty</span>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <span className="text-white/20 text-xs">30-Day Returns</span>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
};

export default HomeOverlay;
