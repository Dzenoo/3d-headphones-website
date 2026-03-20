"use client";

import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";

const LoadingScreen: React.FC = () => {
  const { progress } = useProgress();
  const [visible, setVisible] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const target = Math.round(progress);
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => setVisible(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-white/40 font-light">
              Pulse Audio
            </span>
          </motion.div>

          {/* Progress number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-12"
          >
            <span className="text-8xl font-bold tabular-nums tracking-tight text-white/90 max-sm:text-6xl">
              {displayProgress}
            </span>
            <span className="text-2xl font-light text-white/30 ml-1 max-sm:text-xl">
              %
            </span>
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-xs tracking-[0.2em] uppercase text-white/20"
          >
            Loading experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
