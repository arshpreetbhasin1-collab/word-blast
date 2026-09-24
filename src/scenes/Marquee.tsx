import { motion } from "motion/react";

export default function Marquee({ word }: { word: string }) {
  const line = Array(12).fill(word).join("  •  ");
  return (
    <div className="scene marquee-scene">
      <motion.div
        className="marquee-row"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      >
        <span>{line}&nbsp;&nbsp;•&nbsp;&nbsp;{line}</span>
      </motion.div>
      <motion.div
        className="marquee-row reverse"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      >
        <span>{line}&nbsp;&nbsp;•&nbsp;&nbsp;{line}</span>
      </motion.div>
    </div>
  );
}
