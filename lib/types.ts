export type DatasetKey = 'sales' | 'finance' | 'hr' | 'ops';

export interface Dataset {
  name: string;
  description: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface ExampleChip {
  label: string;
  formula: string;
}

export interface LessonScenario {
  id: string;
  title: string;
  context: string;           // The business situation
  question: string;          // What the stakeholder actually needs
  thinking: string[];        // Step-by-step "how a human thinks about this"
  formula: string;
  dataset: DatasetKey;
  explanation: string;       // Why this formula works here
}

export interface LessonConcept {
  name: string;
  simple: string;            // "For dummies" explanation + analogy
  whenToUse: string;
  whenNot?: string;
  syntaxBreakdown?: string;
  basicExample?: string;
}

export interface Lesson {
  num: string;
  title: string;
  objective: string;         // "By the end of this module you will be able to..."
  whyItMatters: string;      // Real pain / career impact
  concepts: LessonConcept[];
  scenarios: LessonScenario[];
  commonMistakes: string[];
  practicePrompts: Array<{ label: string; formula: string; ds?: DatasetKey; hint?: string }>;
}

export interface QuizQuestion {
  q: string;
  type: 'mcq' | 'formula';
  options?: string[];
  answer: number | string;
  explanation: string;
}

export interface GuidedExercise {
  title: string;
  objective: string;
  dataset: DatasetKey;
  steps: string[];
  expectedAnswers: string[];
  solution: string;
  hint: string;
}

export interface Progress {
  [key: string]: boolean;
}
