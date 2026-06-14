'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import WhyExcel from '../components/WhyExcel';
import Curriculum from '../components/Curriculum';
import InteractiveExamples from '../components/InteractiveExamples';
import FormulaLab from '../components/FormulaLab';
import Playground from '../components/Playground';
import PlanModal from '../components/PlanModal';
import { DatasetKey, LessonScenario } from '../lib/types';
import { lessonData } from '../lib/lessonData';

export default function LearnExcelPage() {
  const [showPlan, setShowPlan] = useState(false);
  const [pendingGuided, setPendingGuided] = useState<string | null>(null);

  const handleTryFormula = (formula: string, ds?: DatasetKey) => {
    const pg = document.getElementById('playground');
    pg?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      const input = document.getElementById('formulaInput') as HTMLInputElement;
      if (input) {
        input.value = formula;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        setTimeout(() => {
          const evalBtn = input.parentElement?.querySelector('button');
          if (evalBtn) evalBtn.click();
        }, 120);
      }
    }, 850);
  };

  const handleFocusFormula = (formulaType: string) => {
    const pg = document.getElementById('playground');
    pg?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      const input = document.getElementById('formulaInput') as HTMLInputElement;
      if (input) {
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
    setPendingGuided(type);
    const pg = document.getElementById('playground');
    pg?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Support loading scenarios from lesson pages via URL (e.g. /?loadScenario=01-s1)
  const handleLoadScenario = (scenario: LessonScenario) => {
    const pg = document.getElementById('playground');
    pg?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      handleTryFormula(scenario.formula, scenario.dataset);
      
      setTimeout(() => {
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translate(-50%,0);background:#0F172A;color:white;padding:12px 20px;border-radius:9999px;font-size:13px;z-index:99999;max-width:620px;box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.2)';
        toast.innerHTML = `
          <div style="font-weight:600;margin-bottom:4px">Scenario thinking:</div>
          <div style="opacity:0.9">${scenario.thinking.join(' → ')}</div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.transition = 'all 0.35s ease';
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 300);
        }, 6200);
      }, 900);
    }, 650);
  };

  // Auto-load scenario if URL has ?loadScenario=01-s1 (from lesson pages) - pure client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const loadScenarioParam = urlParams.get('loadScenario');
      
      if (loadScenarioParam) {
        for (const lesson of lessonData) {
          const found = lesson.scenarios?.find(s => s.id === loadScenarioParam);
          if (found) {
            // Clean the URL
            const url = new URL(window.location.href);
            url.searchParams.delete('loadScenario');
            window.history.replaceState({}, '', url.toString());
            
            handleLoadScenario(found);
            break;
          }
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <Hero />
      <StatsBar />

      <WhyExcel />

      <Curriculum />

      <InteractiveExamples />

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
      {/* Lesson content moved to dedicated /lesson/[id] pages for focused reading */}
      {showPlan && <PlanModal onClose={() => setShowPlan(false)} />}
    </div>
  );
}
