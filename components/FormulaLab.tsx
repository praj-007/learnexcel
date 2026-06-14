'use client';

import { guidedExercises } from '../lib/guidedExercises';

interface Props {
  onFocusFormula: (type: string) => void;
  onStartGuided: (type: string) => void;
}

export default function FormulaLab({ onFocusFormula, onStartGuided }: Props) {
  const cards = [
    { key: 'SUMIF', label: 'SUMIF', desc: 'Conditional sum by region, segment, product', best: 'Sales dashboards', guided: true },
    { key: 'COUNTIFS', label: 'COUNTIFS', desc: 'Count rows matching multiple conditions', best: 'Multi-dimensional analysis', guided: true },
    { key: 'AVERAGEIF', label: 'AVERAGEIF', desc: 'Average only matching rows (e.g. by dept)', best: 'HR & compensation', guided: false },
    { key: 'VLOOKUP', label: 'VLOOKUP', desc: 'Pull data from another table by ID/key', best: 'Data merging', guided: false },
    { key: 'NPV', label: 'NPV + IRR', desc: 'Project valuation & return rate', best: 'Finance cases', guided: false },
    { key: 'DYNAMIC', label: 'FILTER / UNIQUE', desc: 'Modern dynamic arrays (Excel 365)', best: 'Clean dashboards', guided: false },
    { key: 'INDEXMATCH', label: 'INDEX + MATCH', desc: 'The most powerful & flexible lookup combo', best: 'Two-way lookups', guided: true },
    { key: 'SUMPRODUCT', label: 'SUMPRODUCT', desc: 'Weighted sums & conditional logic without IFS', best: 'Weighted averages', guided: true },
    { key: 'IFSCENARIOS', label: 'IF / IFS', desc: 'Scenario modeling & conditional logic', best: 'Base / Bull / Bear cases', guided: true },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-8 pt-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <span className="text-teal-600 text-sm font-bold tracking-widest">FOCUSED LEARNING</span>
            <h2 className="section-header tracking-tighter">Formula Mastery Lab</h2>
            <p className="text-slate-600 text-sm">Pick a formula → We load the best dataset + pre-fill a strong example → Practice until it clicks.</p>
          </div>
          <button 
            onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="hidden md:flex items-center text-sm px-5 py-2 border border-teal-200 text-teal-700 rounded-2xl hover:bg-teal-50"
          >
            Go to full Playground →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {cards.map((c, i) => (
            <div 
              key={i} 
              onClick={() => onFocusFormula(c.key)} 
              className="group bg-white border border-slate-200 hover:border-teal-400 transition-all rounded-2xl p-4 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="font-mono text-sm font-semibold text-teal-700">{c.label}</div>
                <span className="text-teal-400 group-hover:translate-x-0.5 transition">→</span>
              </div>
              <div className="text-xs mt-1 text-slate-500">{c.desc}</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-[10px] text-emerald-600 font-medium">Best for: {c.best}</div>
                {c.guided && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onStartGuided(c.key); }} 
                    className="text-[10px] px-3 py-1 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium"
                  >
                    Guided Practice
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
