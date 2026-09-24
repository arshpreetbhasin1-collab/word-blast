export const WORD_BANK = [
  "BOOM",
  "GROOVY",
  "ELECTRIC",
  "COSMIC",
  "SPARK",
  "VIVID",
  "RADICAL",
  "NEON",
  "PIXEL",
  "SUPERNOVA",
  "GLOW",
  "RUSH",
];

export function randomWord(current?: string) {
  const pool = WORD_BANK.filter((w) => w !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}
