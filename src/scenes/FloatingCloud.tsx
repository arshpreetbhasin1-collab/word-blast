import { useMemo } from "react";
import { motion } from "motion/react";

const COLORS = ["#ff5f7e", "#ffb238", "#4ade80", "#38bdf8", "#a78bfa", "#f472b6", "#fde68a"];

export default function FloatingCloud({ word }: { word: string }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 90,
        size: 0.6 + Math.random() * 1.8,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 6,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 60 - 30,
      })),
    [word]
  );

  return (
    <div className="scene floating-cloud">
      {bubbles.map((b) => (
        <motion.span
          key={b.id}
          className="floating-word"
          style={{ left: `${b.left}%`, fontSize: `${b.size}rem`, color: b.color }}
          initial={{ y: "110vh", opacity: 0, rotate: 0 }}
          animate={{ y: "-20vh", opacity: [0, 1, 1, 0], rotate: b.rotate }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
