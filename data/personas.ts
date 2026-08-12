import { Persona, QuizQuestion } from "../types/persona";

export const PERSONAS: Record<string, Persona> = {
  midnight_splurger: {
    id: "midnight_splurger",
    emoji: "🌙",
    title: "THE MIDNIGHT SPLURGER",
    tagline: "Buys first. Regrets never.",
    shopsAt: "10PM – 1AM",
    weakness: "Flash countdowns",
    vibe: "Aesthetic but chaotic",
    categories: [
      { label: "Beauty", percent: 70 },
      { label: "Fashion", percent: 60 },
      { label: "Tech", percent: 30 }
    ],
    gradientFrom: "#1a0533",
    gradientTo: "#0d1f3c",
    accentColor: "#8B5CF6",
    recommendedCategory: "beauty"
  },
  flash_drop_hunter: {
    id: "flash_drop_hunter",
    emoji: "⚡",
    title: "THE FLASH DROP HUNTER",
    tagline: "If it's limited, it's already in cart.",
    shopsAt: "Whenever drops hit",
    weakness: "Exclusivity badges",
    vibe: "Competitive. Strategic.",
    categories: [
      { label: "Tech", percent: 80 },
      { label: "Fashion", percent: 65 },
      { label: "Beauty", percent: 20 }
    ],
    gradientFrom: "#0a1628",
    gradientTo: "#1a2a0a",
    accentColor: "#4F3FF0",
    recommendedCategory: "tech"
  },
  glow_curator: {
    id: "glow_curator",
    emoji: "✨",
    title: "THE GLOW CURATOR",
    tagline: "Skincare is self-care. Cart is art.",
    shopsAt: "Sunday mornings",
    weakness: "Before/after demos",
    vibe: "Intentional. Radiant.",
    categories: [
      { label: "Beauty", percent: 90 },
      { label: "Lifestyle", percent: 55 },
      { label: "Fashion", percent: 30 }
    ],
    gradientFrom: "#2e1a0a",
    gradientTo: "#1f0d1f",
    accentColor: "#f472b6",
    recommendedCategory: "beauty"
  },
  fit_archivist: {
    id: "fit_archivist",
    emoji: "👗",
    title: "THE FIT ARCHIVIST",
    tagline: "Every outfit tells a story. Yours is a novel.",
    shopsAt: "Friday evenings",
    weakness: "Trend-first drops",
    vibe: "Curated. Bold. Consistent.",
    categories: [
      { label: "Fashion", percent: 95 },
      { label: "Beauty", percent: 50 },
      { label: "Lifestyle", percent: 25 }
    ],
    gradientFrom: "#1a0a2e",
    gradientTo: "#2e0a1a",
    accentColor: "#e879f9",
    recommendedCategory: "fashion"
  },
  research_rat: {
    id: "research_rat",
    emoji: "🎯",
    title: "THE RESEARCH RAT",
    tagline: "Five tabs open. Still watching the review.",
    shopsAt: "Weekends with coffee",
    weakness: "Comparison charts",
    vibe: "Deliberate. Thorough. Loyal.",
    categories: [
      { label: "Tech", percent: 75 },
      { label: "Beauty", percent: 60 },
      { label: "Fashion", percent: 40 }
    ],
    gradientFrom: "#0a1a2e",
    gradientTo: "#0a2e1a",
    accentColor: "#34d399",
    recommendedCategory: "tech"
  },
  hype_chaser: {
    id: "hype_chaser",
    emoji: "🔥",
    title: "THE HYPE CHASER",
    tagline: "If everyone wants it, I needed it yesterday.",
    shopsAt: "The moment it drops",
    weakness: "Viewer count spikes",
    vibe: "Fast. Loud. First.",
    categories: [
      { label: "Fashion", percent: 85 },
      { label: "Tech", percent: 70 },
      { label: "Beauty", percent: 45 }
    ],
    gradientFrom: "#2e0a0a",
    gradientTo: "#1a0a00",
    accentColor: "#fb923c",
    recommendedCategory: "fashion"
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "A product you've been eyeing drops in 3 minutes. You...",
    subtext: "Be honest. We don't judge here.",
    options: [
      {
        id: "q1_a",
        label: "Buy it before I even think",
        emoji: "🛒",
        scores: { midnight_splurger: 3, flash_drop_hunter: 2, hype_chaser: 3 }
      },
      {
        id: "q1_b",
        label: "Open 4 tabs, read reviews, miss it",
        emoji: "📱",
        scores: { research_rat: 3, glow_curator: 2 }
      },
      {
        id: "q1_c",
        label: "Watch it sell out. Seethe. Move on.",
        emoji: "😤",
        scores: { fit_archivist: 2, research_rat: 2 }
      }
    ]
  },
  {
    id: "q2",
    question: "Your cart is a window into your soul. What's in it?",
    subtext: "No judgment. Okay maybe a little.",
    options: [
      {
        id: "q2_a",
        label: "Serums, mists, glow everything",
        emoji: "✨",
        scores: { glow_curator: 3, midnight_splurger: 1 }
      },
      {
        id: "q2_b",
        label: "Fits. Fits. More fits.",
        emoji: "👗",
        scores: { fit_archivist: 3, hype_chaser: 2 }
      },
      {
        id: "q2_c",
        label: "Gadgets I definitely need",
        emoji: "🎧",
        scores: { flash_drop_hunter: 3, research_rat: 2, hype_chaser: 1 }
      }
    ]
  },
  {
    id: "q3",
    question: "You shop best when...",
    subtext: "Your peak performance hours.",
    options: [
      {
        id: "q3_a",
        label: "It's midnight and everyone's asleep",
        emoji: "🌙",
        scores: { midnight_splurger: 3, glow_curator: 1 }
      },
      {
        id: "q3_b",
        label: "There's a countdown and stakes are high",
        emoji: "⚡",
        scores: { flash_drop_hunter: 3, hype_chaser: 3 }
      },
      {
        id: "q3_c",
        label: "Slow morning, full research mode",
        emoji: "☕",
        scores: { research_rat: 3, fit_archivist: 2, glow_curator: 1 }
      }
    ]
  }
];

export const TIEBREAKER_PRIORITY = [
  "hype_chaser",
  "midnight_splurger",
  "flash_drop_hunter",
  "glow_curator",
  "fit_archivist",
  "research_rat"
] as const;
