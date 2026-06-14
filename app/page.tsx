'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import WhyExcel from '../components/WhyExcel';
import Curriculum from '../components/Curriculum';
import InteractiveExamples from '../components/InteractiveExamples';
import Quizzes from '../components/Quizzes';
import FormulaLab from '../components/FormulaLab';
import Playground from '../components/Playground';
import LessonModal from '../components/LessonModal';
import PlanModal from '../components/PlanModal';
import { DatasetKey } from '../lib/types';

export default function LearnExcelPage() {
  const [lessonIndex, setLessonIndex] = useState<number | null>(null);
  const [showPlan, setShowPlan] = useState(false);
  const [pendingGuided, setPendingGuided] = useState<string | null>(null);

  const openLesson = (idx: number) => setLessonIndex(idx);
  const closeLesson = () => setLessonIndex(null);

  const handleTryFormula = (formula: string, ds?: DatasetKey) => {
    // Scroll to playground and prefill
    const pg = document.getElementById('playground');
    pg?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // After scroll, update the playground via custom event or direct (simple approach: set on window for Playground to pick)
    setTimeout(() => {
      const input = document.getElementById('formulaInput') as HTMLInputElement;
      if (input) {
        input.value = formula;
        // Trigger evaluation by dispatching input + Enter simulation
        input.dispatchEvent(new Event('input', { bubbles: true }));
        setTimeout(() => {
          const evalBtn = input.parentElement?.querySelector('button');
          evalBtn?.click();
        }, 120);
      }
    }, 850);
  };

  const handleFocusFormula = (formulaType: string) => {
    const pg = document.getElementById('playground');
    pg?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // The Playground has focusFormulaPractice behavior built-in via quick examples.
    // We enhance by also preloading a sensible formula in the bar after switch happens internally.
    setTimeout(() => {
      const input = document.getElementById('formulaInput') as HTMLInputElement;
      if (input) {
        // Map a few good starters
        const starters: Record<string, string> = {
          SUMIF: '=SUMIF(A2:A15,"North",F2:F15)',
          COUNTIFS: '=COUNTIFS(A2:A15,"East",B2:B15,"Laptop")',
          AVERAGEIF: '=AVERAGEIF(B2:B13,"Finance",D2:D13)',
          VLOOKUP: '=VLOOKUP("E006",A2:G13,4,FALSE)',
          INDEXMATCH: '=INDEX(D2:D13,MATCH("E006",A2:A13,0))',
          SUMPRODUCT: '=SUMPRODUCT((A2:A15="North")*(F2:F15))',
          IFSCENARIOS: '=IF(E3>0,"Positive","Review")',
          NPV: 'Use the NPV slider in the Examples section',
        };
        if (starters[formulaType]) {
          input.value = starters[formulaType];
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }, 900);
  };

  const handleStartGuided = (type: string) => {
    // Pass to Playground via state
    setPendingGuided(type);
    const pg = document.getElementById('playground');
    pg?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <Hero />
      <StatsBar />

      <WhyExcel />

      <Curriculum onOpenLesson={openLesson} />

      <InteractiveExamples />

      <Quizzes />

      <FormulaLab 
        onFocusFormula={handleFocusFormula} 
        onStartGuided={handleStartGuided} 
      />

      <Playground 
        onStartGuidedFromOutside={pendingGuided} 
        clearOutsideTrigger={() => setPendingGuided(null)} 
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-screen-xl mx-auto px-8 text-center text-xs text-slate-500">
          <p><strong>MBA Excel Mastery Dashboard</strong> — Fully functional prototype built for MBA students. 
          This interactive experience demonstrates the proposed learning platform.</p>
          <p className="mt-1">Full production version would include user accounts, progress tracking, downloadable practice files, AI formula tutor, and LMS integration.</p>
          <div className="mt-4 flex justify-center gap-x-6 text-teal-600">
            <span className="cursor-pointer hover:underline" onClick={() => setShowPlan(true)}>View Full Project Plan &amp; Roadmap</span>
            <span>•</span>
            <span className="cursor-pointer hover:underline" onClick={() => window.location.reload()}>Reload Demo</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LessonModal 
        index={lessonIndex} 
        onClose={closeLesson} 
        onTryFormula={handleTryFormula} 
      />
      {showPlan && <PlanModal onClose={() => setShowPlan(false)} />}
    </div>
  );
}
