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

export interface Lesson {
  num: string;
  title: string;
  content: string; // HTML string for simplicity (matches original)
  tryFormulas?: Array<{ label: string; formula: string; ds?: DatasetKey }>;
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
