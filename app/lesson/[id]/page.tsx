'use client';

import React from 'react';
import Link from 'next/link';
import { lessonData } from '../../../lib/lessonData';
import { Lesson, LessonScenario } from '../../../lib/types';

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const [lesson, setLesson] = React.useState<Lesson | null>(null);
  const [id, setId] = React.useState<string>('');

  React.useEffect(() => {
    params.then(({ id: paramId }) => {
      setId(paramId);
      const found = lessonData.find(l => l.num === paramId);
      setLesson(found || null);
    });
  }, [params]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-lg">Loading lesson...</p>
          <Link href="/" className="text-teal-600 underline mt-4 block">Back to home</Link>
        </div>
      </div>
    );
  }

  const loadScenarioIntoPlayground = (scenario: LessonScenario) => {
    // Navigate to home with param so the main page picks it up and loads into Playground
    window.location.href = `/?loadScenario=${scenario.id}#playground`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <Link href="/" className="flex items-center gap-x-2 text-sm font-medium text-slate-600 hover:text-slate-900">
              ← Back to Curriculum
            </Link>
            <div className="text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded font-mono">MODULE {lesson.num}</div>
          </div>
          <Link 
            href="/#playground" 
            className="text-sm px-4 py-2 bg-slate-900 text-white rounded-2xl hover:bg-black transition-colors"
          >
            Open Full Playground
          </Link>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 pt-10 pb-20">
        {/* Lesson Header - large and focused */}
        <div className="max-w-4xl">
          <div className="text-xs font-bold tracking-[2px] text-teal-600 mb-3">LESSON {lesson.num}</div>
          <h1 className="text-5xl font-semibold tracking-tighter leading-none text-slate-900 mb-4">
            {lesson.title}
          </h1>
          <p className="text-2xl text-slate-600 leading-tight max-w-3xl">
            {lesson.objective}
          </p>
        </div>

        {/* Why it matters - prominent */}
        <div className="max-w-4xl mt-12">
          <div className="uppercase text-sm font-semibold tracking-widest text-teal-600 mb-3">WHY THIS MATTERS IN REAL LIFE</div>
          <div className="prose prose-xl max-w-none text-slate-700">
            <p className="text-[17px] leading-relaxed">{lesson.whyItMatters}</p>
          </div>
        </div>

        {/* Core Concepts - readable cards */}
        {lesson.concepts.length > 0 && (
          <div className="mt-14 max-w-5xl">
            <div className="uppercase text-sm font-semibold tracking-widest text-teal-600 mb-4">CORE CONCEPTS • EXPLAINED CLEARLY</div>
            <div className="grid gap-6">
              {lesson.concepts.map((concept, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8">
                  <h3 className="text-2xl font-semibold tracking-tight mb-3">{concept.name}</h3>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">{concept.simple}</p>

                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-[15px]">
                    <div>
                      <div className="font-semibold text-emerald-600 mb-1.5">Use this when...</div>
                      <p className="text-slate-600">{concept.whenToUse}</p>
                    </div>
                    {concept.whenNot && (
                      <div>
                        <div className="font-semibold text-rose-600 mb-1.5">Avoid or use something else when...</div>
                        <p className="text-slate-600">{concept.whenNot}</p>
                      </div>
                    )}
                  </div>

                  {concept.syntaxBreakdown && (
                    <div className="mt-6">
                      <div className="text-xs uppercase tracking-wider font-medium text-slate-500 mb-2">SYNTAX</div>
                      <pre className="bg-slate-950 text-emerald-300 p-5 rounded-2xl text-[15px] font-mono leading-relaxed overflow-x-auto">{concept.syntaxBreakdown}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* THE MAIN FOCUS: Scenario-Based Thinking Breakdowns */}
        {lesson.scenarios.length > 0 && (
          <div className="mt-16">
            <div className="max-w-4xl">
              <div className="uppercase text-sm font-semibold tracking-widest text-teal-600 mb-3">REAL SCENARIOS • HOW TO BREAK DOWN THE THINKING</div>
              <h2 className="text-3xl font-semibold tracking-tight mb-3">Learn by seeing exactly how to think through the problem</h2>
              <p className="text-lg text-slate-600">These are the actual situations you will face. Read the context, then study the step-by-step thinking before looking at the formula.</p>
            </div>

            <div className="mt-8 space-y-8">
              {lesson.scenarios.map((scenario, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-teal-600 text-sm font-bold tracking-wider">SCENARIO {idx + 1}</div>
                      <h3 className="text-2xl font-semibold tracking-tight mt-1">{scenario.title}</h3>
                    </div>
                    <button
                      onClick={() => loadScenarioIntoPlayground(scenario)}
                      className="shrink-0 px-6 py-3 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold rounded-2xl text-sm transition-all flex items-center gap-x-2"
                    >
                      Load this scenario into the Playground →
                    </button>
                  </div>

                  {/* Context */}
                  <div className="mt-6">
                    <div className="text-xs uppercase font-semibold tracking-wider text-slate-500 mb-1.5">THE SITUATION</div>
                    <p className="text-lg leading-relaxed text-slate-700">{scenario.context}</p>
                  </div>

                  {/* The Question - highlighted */}
                  <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
                    <div className="text-xs uppercase font-semibold tracking-wider text-amber-600 mb-1.5">THE ACTUAL QUESTION YOU NEED TO ANSWER</div>
                    <p className="text-xl font-medium text-slate-900 leading-tight">{scenario.question}</p>
                  </div>

                  {/* Thinking Breakdown - the star of the page */}
                  <div className="mt-8">
                    <div className="text-xs uppercase font-semibold tracking-wider text-teal-600 mb-4">HOW TO BREAK THIS DOWN (YOUR THINKING PROCESS)</div>
                    
                    <div className="space-y-4">
                      {scenario.thinking.map((step, stepIdx) => (
                        <div key={stepIdx} className="flex gap-4 items-start bg-slate-50 border border-slate-100 rounded-2xl p-5">
                          <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-lg font-semibold flex-shrink-0 mt-0.5">
                            {stepIdx + 1}
                          </div>
                          <div className="text-[17px] leading-relaxed text-slate-800 pt-1">
                            {step}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* The Formula - big and clear */}
                  <div className="mt-8">
                    <div className="text-xs uppercase font-semibold tracking-wider text-slate-500 mb-2">THE FORMULA THAT SOLVES IT</div>
                    <div className="bg-slate-950 text-emerald-300 font-mono text-xl md:text-2xl p-6 rounded-2xl overflow-x-auto border border-slate-800">
                      {scenario.formula}
                    </div>
                    <button 
                      onClick={() => navigator.clipboard.writeText(scenario.formula)}
                      className="mt-2 text-xs px-3 py-1 text-teal-700 hover:bg-teal-50 rounded border border-teal-200"
                    >
                      Copy formula
                    </button>
                  </div>

                  {/* Explanation */}
                  <div className="mt-6 p-5 bg-white border border-slate-200 rounded-2xl">
                    <div className="text-xs uppercase font-semibold tracking-wider text-emerald-600 mb-1.5">WHY THIS FORMULA + THIS THINKING WORKS</div>
                    <p className="text-[16px] leading-relaxed text-slate-700">{scenario.explanation}</p>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => loadScenarioIntoPlayground(scenario)}
                      className="w-full md:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl text-base flex items-center justify-center gap-x-3"
                    >
                      Load the exact data + this formula into the live Playground
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Common Mistakes if present */}
        {lesson.commonMistakes.length > 0 && (
          <div className="mt-12 max-w-4xl">
            <div className="uppercase text-sm font-semibold tracking-widest text-rose-600 mb-3">COMMON MISTAKES</div>
            <ul className="space-y-2 text-[17px] text-slate-700">
              {lesson.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex gap-3">• {mistake}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Practice prompts */}
        {lesson.practicePrompts.length > 0 && (
          <div className="mt-12 max-w-4xl">
            <div className="uppercase text-sm font-semibold tracking-widest text-teal-600 mb-3">QUICK PRACTICE PROMPTS</div>
            <div className="flex flex-wrap gap-3">
              {lesson.practicePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const url = `/?loadScenario=${lesson.scenarios[0]?.id || ''}#playground`;
                    // Fallback simple load
                    window.location.href = `/?formula=${encodeURIComponent(p.formula)}&dataset=${p.ds || 'sales'}#playground`;
                  }}
                  className="px-5 py-3 border border-slate-300 hover:bg-white rounded-2xl text-sm"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer navigation */}
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <Link href="/" className="text-teal-600 hover:underline">← Back to all modules</Link>
          <Link href="/#playground" className="font-medium px-6 py-3 bg-white border border-slate-300 rounded-2xl hover:bg-slate-50">
            Go to the full Formula Playground →
          </Link>
        </div>
      </div>
    </div>
  );
}
