import { useState } from "react";
import { motion } from "motion/react";

export default function OrbitRing({ word }: { word: string }) {
  const count = 10;
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="scene orbit-ring"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="orbit-track"
        animate={paused ? undefined : { rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: count }).map((_, i) => {
          const angle = (360 / count) * i;
          return (
            <span
              key={i}
              className="orbit-word"
              style={{
                transform: `rotate(${angle}deg) translate(min(38vw, 260px)) rotate(-${angle}deg)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </motion.div>
      <motion.div
        className="orbit-center"
        animate={{ scale: paused ? 1.15 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {word}
      </motion.div>
    </div>
  );
}
