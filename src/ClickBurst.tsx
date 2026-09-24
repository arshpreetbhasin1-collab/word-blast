import { motion } from "motion/react";

export interface Burst {
  id: number;
  x: number;
  y: number;
}

const COLORS = ["#ff5f7e", "#ffb238", "#4ade80", "#38bdf8", "#a78bfa", "#f472b6"];

export default function ClickBurst({
  burst,
  word,
  onComplete,
}: {
  burst: Burst;
  word: string;
  onComplete: (id: number) => void;
}) {
  const particles = Array.from({ length: 8 });
  return (
    <div
      className="burst-anchor"
      style={{ left: burst.x, top: burst.y }}
      onAnimationEnd={() => onComplete(burst.id)}
    >
      {particles.map((_, i) => {
        const angle = (360 / particles.length) * i;
        const distance = 60 + Math.random() * 40;
        const dx = Math.cos((angle * Math.PI) / 180) * distance;
        const dy = Math.sin((angle * Math.PI) / 180) * distance;
        return (
          <motion.span
            key={i}
            className="burst-particle"
            style={{ color: COLORS[i % COLORS.length] }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onAnimationComplete={() => i === particles.length - 1 && onComplete(burst.id)}
          >
            {word.charAt(i % word.length) || "•"}
          </motion.span>
        );
      })}
    </div>
  );
}
