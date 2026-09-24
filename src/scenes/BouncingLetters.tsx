import { motion } from "motion/react";

const COLORS = ["#ff5f7e", "#ffb238", "#4ade80", "#38bdf8", "#a78bfa", "#f472b6"];

export default function BouncingLetters({ word }: { word: string }) {
  const letters = word.split("");
  return (
    <div className="scene bouncing-letters">
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}-${word}`}
          className="big-letter"
          style={{ color: COLORS[i % COLORS.length] }}
          initial={{ y: -300, opacity: 0, rotate: -20 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 12,
            delay: i * 0.06,
          }}
          drag
          dragElastic={0.4}
          dragConstraints={{ top: -40, bottom: 40, left: -40, right: 40 }}
          dragSnapToOrigin
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
          whileDrag={{ scale: 1.4, zIndex: 10 }}
        >
          {letter === " " ? " " : letter}
        </motion.span>
      ))}
    </div>
  );
}
