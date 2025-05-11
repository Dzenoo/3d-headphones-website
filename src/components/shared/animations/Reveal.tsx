"use client";

import React from "react";
import { motion, MotionProps } from "motion/react";

interface RevealProps extends MotionProps {
  children: React.ReactNode;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  initial,
  animate,
  transition,
  ...props
}) => {
  const defaultInitial = {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    opacity: 0,
    y: 50,
  };

  const defaultAnimate = {
    clipPath: "polygon(0 0, 100% 0, 100% 130%, 0 100%)",
    opacity: 1,
    y: 0,
  };

  const defaultTransition = {
    duration: 1,
    ease: "easeOut",
    damping: 12,
    stiffness: 100,
  };

  const mergedInitial = Object.assign({}, defaultInitial, initial);
  const mergedAnimate = Object.assign({}, defaultAnimate, animate);
  const mergedTransition = Object.assign({}, defaultTransition, transition);

  return (
    <motion.div
      initial={mergedInitial}
      animate={mergedAnimate}
      transition={mergedTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
