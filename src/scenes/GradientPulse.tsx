import { motion } from "motion/react";

export default function GradientPulse({ word }: { word: string }) {
  return (
    <div className="scene gradient-pulse">
      <motion.div
        className="pulse-glow"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.h1
        className="pulse-text"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {word}
      </motion.h1>
    </div>
  );
}
