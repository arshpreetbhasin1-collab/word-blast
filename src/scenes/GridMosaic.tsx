import { motion } from "motion/react";

const ROWS = 5;
const COLS = 8;

export default function GridMosaic({ word }: { word: string }) {
  const cells = Array.from({ length: ROWS * COLS });
  return (
    <div className="scene grid-mosaic">
      <div className="mosaic-grid">
        {cells.map((_, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;
          const delay = (row + col) * 0.04;
          return (
            <motion.div
              key={`${i}-${word}`}
              className="mosaic-cell"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay, duration: 0.5, ease: "backOut" }}
            >
              {word}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
