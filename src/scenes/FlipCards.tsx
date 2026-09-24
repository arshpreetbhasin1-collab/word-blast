import { motion } from "motion/react";

export default function FlipCards({ word }: { word: string }) {
  const letters = word.split("");
  return (
    <div className="scene flip-cards">
      {letters.map((letter, i) => (
        <div className="flip-card-wrap" key={`${letter}-${i}-${word}`}>
          <motion.div
            className="flip-card"
            animate={{ rotateY: [0, 360] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 1.2,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          >
            {letter === " " ? " " : letter}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
