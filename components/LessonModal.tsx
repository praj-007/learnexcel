'use client';

import { lessonData } from '../lib/lessonData';
import { DatasetKey, LessonScenario } from '../lib/types';

interface Props {
  index: number | null;
  onClose: () => void;
  onTryFormula: (formula: string, ds?: DatasetKey) => void;
  onLoadScenario?: (scenario: LessonScenario) => void;
}

export default function LessonModal({ index, onClose, onTryFormula, onLoadScenario }: Props) {
  if (index === null) return null;
  const data = lessonData[index] || lessonData[0];

  const loadScenario = (scenario: LessonScenario) => {
    onClose();
    // Give time for modal to close then load into playground with context
    setTimeout(() => {
      if (onLoadScenario) {
        onLoadScenario(scenario);
      } else {
        // Fallback: at least switch dataset and set formula
        onTryFormula(scenario.formula, scenario.dataset);
      }
    }, 280);
  };

  const loadSimplePrompt = (formula: string, ds?: DatasetKey) => {
    onClose();
    setTimeout(() => {
      onTryFormula(formula, ds);
    }, 280);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        className="lesson-modal bg-white w-full max-w-4xl xl:max-w-5xl rounded-3xl shadow-2xl max-h-[92vh] overflow-hidden flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 pt-7 pb-5 border-b bg-slate-50 flex justify-between items-start">
          <div>
            <div className="text-xs font-bold text-teal-600 tracking-[1.5px] mb-1">MODULE {data.num}</div>
            <div className="text-3xl font-semibold tracking-tighter">{data.title}</div>
            <div className="mt-2 text-sm text-slate-600 max-w-3xl">{data.objective}</div>
          </div>
          <button onClick={onClose} className="text-3xl leading-none text-slate-300 hover:text-slate-500 mt-1">×</button>
        </div>

        <div className="p-8 overflow-auto flex-1 text-sm space-y-8">
          {/* Why it matters */}
          <div>
            <div className="uppercase text-xs font-bold tracking-widest text-teal-600 mb-2">WHY THIS MATTERS</div>
            <p className="text-slate-700 leading-relaxed">{data.whyItMatters}</p>
          </div>

          {/* Core Concepts - explained simply */}
          {data.concepts.length > 0 && (
            <div>
              <div className="uppercase text-xs font-bold tracking-widest text-teal-600 mb-3">CORE CONCEPTS (explained simply)</div>
              <div className="space-y-4">
                {data.concepts.map((concept, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-2xl p-5 bg-white">
                    <div className="font-semibold text-lg tracking-tight mb-1">{concept.name}</div>
                    <p className="text-slate-700 mb-3">{concept.simple}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-medium text-emerald-600">✓ Use this when:</span>
                        <p className="mt-1 text-slate-600">{concept.whenToUse}</p>
                      </div>
                      {concept.whenNot && (
                        <div>
                          <span className="font-medium text-rose-600">✗ Avoid when:</span>
                          <p className="mt-1 text-slate-600">{concept.whenNot}</p>
                        </div>
                      )}
                    </div>
                    
                    {concept.syntaxBreakdown && (
                      <div className="mt-3">
                        <span className="font-medium text-xs text-slate-500">Syntax</span>
                        <pre className="mt-1 bg-slate-900 text-emerald-300 text-xs p-3 rounded-xl overflow-x-auto font-mono">{concept.syntaxBreakdown}</pre>
                      </div>
                    )}
                    
                    {concept.basicExample && (
                      <div className="mt-2 text-xs text-slate-500">
                        Example: <span className="font-mono text-slate-700">{concept.basicExample}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real Business Scenarios — the heart of the learning experience */}
          {data.scenarios.length > 0 && (
            <div>
              <div className="uppercase text-xs font-bold tracking-widest text-teal-600 mb-3">REAL BUSINESS SCENARIOS</div>
              <p className="text-xs text-slate-500 mb-4">These are the exact kinds of questions you will be asked in real jobs and case interviews. Click any scenario to load the data and the exact formula into the Playground with the thinking explained.</p>
              
              <div className="space-y-4">
                {data.scenarios.map((scenario) => (
                  <div key={scenario.id} className="border border-slate-200 rounded-2xl p-5 hover:border-teal-300 transition-colors bg-white">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="font-semibold text-base tracking-tight">{scenario.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{scenario.context}</div>
                      </div>
                      <button 
                        onClick={() => loadScenario(scenario)}
                        className="text-xs px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-medium flex-shrink-0"
                      >
                        Load Scenario in Playground →
                      </button>
                    </div>

                    <div className="mt-3 text-sm">
                      <span className="font-medium">The actual question: </span>
                      <span className="text-slate-700">{scenario.question}</span>
                    </div>

                    {/* How to think about it */}
                    <div className="mt-3">
                      <div className="text-xs font-semibold text-slate-500 mb-1">How to think about it (step by step):</div>
                      <ol className="list-decimal pl-5 text-xs space-y-0.5 text-slate-600">
                        {scenario.thinking.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-3 flex items-center gap-x-3">
                      <div>
                        <span className="text-xs font-medium text-slate-500">Correct formula:</span>
                        <div className="font-mono text-sm bg-slate-900 text-emerald-300 px-3 py-1 rounded-xl mt-0.5 inline-block">{scenario.formula}</div>
                      </div>
                      <button 
                        onClick={() => loadScenario(scenario)}
                        className="text-xs px-3 py-1.5 border border-teal-200 hover:bg-teal-50 rounded-2xl text-teal-700"
                      >
                        Load this + data
                      </button>
                    </div>

                    <div className="mt-2 text-xs text-emerald-700 bg-emerald-50 p-2 rounded-xl">
                      <strong>Why it works:</strong> {scenario.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {data.commonMistakes.length > 0 && (
            <div>
              <div className="uppercase text-xs font-bold tracking-widest text-rose-600 mb-2">COMMON MISTAKES TO AVOID</div>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                {data.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          )}

          {/* Practice Building Blocks */}
          {data.practicePrompts.length > 0 && (
            <div>
              <div className="uppercase text-xs font-bold tracking-widest text-teal-600 mb-3">PRACTICE BUILDING BLOCKS</div>
              <div className="flex flex-wrap gap-2">
                {data.practicePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => loadSimplePrompt(p.formula, p.ds)}
                    className="px-4 py-2 text-sm bg-white border border-teal-200 hover:bg-teal-50 text-teal-700 rounded-2xl flex items-center gap-x-2"
                  >
                    {p.label}
                    {p.hint && <span className="text-[10px] text-slate-400">({p.hint})</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-8 py-5 bg-slate-50 flex justify-between items-center border-t text-sm">
          <button onClick={onClose} className="px-6 py-2.5 font-medium text-slate-600 hover:text-slate-900">Close</button>
          
          <div className="flex gap-x-3">
            <button 
              onClick={() => {
                onClose();
                setTimeout(() => {
                  document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
                }, 180);
              }} 
              className="px-6 py-2.5 font-semibold border border-slate-300 hover:bg-white rounded-2xl"
            >
              Just go to Playground
            </button>
            <button 
              onClick={() => {
                onClose();
                setTimeout(() => {
                  document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
                }, 180);
              }} 
              className="px-6 py-2.5 font-semibold bg-teal-600 text-white rounded-2xl"
            >
              Start Practicing →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
