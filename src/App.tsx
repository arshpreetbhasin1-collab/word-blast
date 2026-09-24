import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import BouncingLetters from "./scenes/BouncingLetters";
import Marquee from "./scenes/Marquee";
import Typewriter from "./scenes/Typewriter";
import FloatingCloud from "./scenes/FloatingCloud";
import GridMosaic from "./scenes/GridMosaic";
import FlipCards from "./scenes/FlipCards";
import GradientPulse from "./scenes/GradientPulse";
import OrbitRing from "./scenes/OrbitRing";
import ClickBurst, { type Burst } from "./ClickBurst";
import { randomWord } from "./wordBank";

const SCENES = [
  { key: "bounce", label: "🎈 Bouncing", Component: BouncingLetters },
  { key: "marquee", label: "🎬 Marquee", Component: Marquee },
  { key: "typewriter", label: "⌨️ Typewriter", Component: Typewriter },
  { key: "cloud", label: "☁️ Floating", Component: FloatingCloud },
  { key: "grid", label: "🧩 Mosaic", Component: GridMosaic },
  { key: "flip", label: "🃏 Flip Cards", Component: FlipCards },
  { key: "pulse", label: "💫 Pulse", Component: GradientPulse },
  { key: "orbit", label: "🪐 Orbit", Component: OrbitRing },
];

const AUTOPLAY_MS = 5000;

export default function App() {
  const [word, setWord] = useState("HELLO");
  const [draft, setDraft] = useState("HELLO");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const burstId = useRef(0);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setSceneIndex((i) => (i + 1) % SCENES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, sceneIndex]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.key === "ArrowRight") {
        setSceneIndex((i) => (i + 1) % SCENES.length);
      } else if (e.key === "ArrowLeft") {
        setSceneIndex((i) => (i - 1 + SCENES.length) % SCENES.length);
      } else if (e.code === "Space") {
        e.preventDefault();
        setAutoplay((a) => !a);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scene = SCENES[sceneIndex];
  const Scene = scene.Component;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = draft.trim();
    if (trimmed) setWord(trimmed.toUpperCase());
  }

  function handleSurprise() {
    const w = randomWord(word);
    setDraft(w);
    setWord(w);
  }

  function handleStagePointer(e: React.MouseEvent<HTMLDivElement>) {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glowRef.current.style.left = `${e.clientX - rect.left}px`;
    glowRef.current.style.top = `${e.clientY - rect.top}px`;
  }

  function handleStageClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = burstId.current++;
    setBursts((b) => [...b, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  }

  function removeBurst(id: number) {
    setBursts((b) => b.filter((burst) => burst.id !== id));
  }

  return (
    <div className="app-shell">
      <div className="ambient-blobs">
        <motion.div
          className="blob blob-a"
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="blob blob-b"
          animate={{ x: [0, -50, 40, 0], y: [0, 50, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="blob blob-c"
          animate={{ x: [0, 30, -60, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.header
        className="app-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="app-title">WORD BLAST</span>
        <span className="app-subtitle">
          type a word &middot; click the stage to pop it &middot; ←/→ to switch scenes &middot; space to pause
        </span>
      </motion.header>

      <div
        className="stage"
        ref={stageRef}
        onMouseMove={handleStagePointer}
        onClick={handleStageClick}
      >
        <div ref={glowRef} className="stage-glow" />
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.key + word}
            className="stage-inner"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.4 }}
          >
            <Scene word={word} />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {bursts.map((b) => (
            <ClickBurst key={b.id} burst={b} word={word} onComplete={removeBurst} />
          ))}
        </AnimatePresence>

        {autoplay && (
          <motion.div
            key={`progress-${scene.key}-${word}`}
            className="autoplay-progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
          />
        )}
      </div>

      <motion.div
        className="control-panel"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 22 }}
      >
        <form onSubmit={handleSubmit} className="word-form">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type any word..."
            maxLength={24}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Blast it
          </motion.button>
          <motion.button
            type="button"
            className="surprise-btn"
            onClick={handleSurprise}
            whileHover={{ scale: 1.05, rotate: [0, -6, 6, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            🎲 Surprise me
          </motion.button>
        </form>

        <div className="scene-picker">
          {SCENES.map((s, i) => (
            <motion.button
              key={s.key}
              className={`chip ${i === sceneIndex ? "active" : ""}`}
              onClick={() => setSceneIndex(i)}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              {s.label}
            </motion.button>
          ))}
          <motion.button
            className={`chip autoplay ${autoplay ? "active" : ""}`}
            onClick={() => setAutoplay((a) => !a)}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
          >
            {autoplay ? "⏸ Autoplay" : "▶ Autoplay"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
