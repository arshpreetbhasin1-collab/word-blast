import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Typewriter({ word }: { word: string }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    let deleting = false;
    setShown("");
    const id = setInterval(() => {
      if (!deleting) {
        i++;
        setShown(word.slice(0, i));
        if (i === word.length) {
          deleting = true;
          i += 8; // pause at full word before deleting
        }
      } else {
        i--;
        setShown(word.slice(0, Math.max(i, 0)));
        if (i <= 0) {
          deleting = false;
          i = 0;
        }
      }
    }, 140);
    return () => clearInterval(id);
  }, [word]);

  return (
    <div className="scene typewriter-scene">
      <div className="typewriter-box">
        <span className="typewriter-text">{shown}</span>
        <motion.span
          className="cursor"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        >
          |
        </motion.span>
      </div>
    </div>
  );
}
