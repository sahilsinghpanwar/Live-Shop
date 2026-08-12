export type PersonaId =
  | "midnight_splurger"
  | "flash_drop_hunter"
  | "glow_curator"
  | "fit_archivist"
  | "research_rat"
  | "hype_chaser";

export interface QuizOption {
  id: string;
  label: string;
  emoji: string;
  scores: Partial<Record<PersonaId, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtext: string;
  options: QuizOption[]; // always 3 options
}

export interface Persona {
  id: PersonaId;
  emoji: string;
  title: string;           // e.g. "THE MIDNIGHT SPLURGER"
  tagline: string;         // e.g. "Buys first. Regrets never."
  shopsAt: string;         // e.g. "10PM – 1AM"
  weakness: string;        // e.g. "Limited drops"
  vibe: string;            // e.g. "Aesthetic but practical"
  categories: {
    label: string;
    percent: number;
  }[];                     // 3 items, percent 0-100
  gradientFrom: string;    // CSS color for card gradient
  gradientTo: string;
  accentColor: string;     // for highlights on result card
  recommendedCategory: "beauty" | "fashion" | "tech" | "lifestyle";
}

export interface QuizState {
  phase: "intro" | "quiz" | "calculating" | "result";
  currentQuestion: number;   // 0, 1, 2
  answers: string[];         // option ids selected
  result: Persona | null;
}
