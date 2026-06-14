'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { datasets, getExampleChips, QuickExample } from '../lib/datasets';
import { DatasetKey, Dataset } from '../lib/types';
import { evaluateFormula, formatResult } from '../lib/formulaEvaluator';
import { guidedExercises } from '../lib/guidedExercises';

interface Props {
  onStartGuidedFromOutside?: string | null;
  clearOutsideTrigger?: () => void;
}

export default function Playground({ onStartGuidedFromOutside, clearOutsideTrigger }: Props) {
  const [currentKey, setCurrentKey] = useState<DatasetKey>('sales');
  const [currentData, setCurrentData] = useState<Dataset>(() => JSON.parse(JSON.stringify(datasets.sales)));
  const [formula, setFormula] = useState('=SUM(F2:F15)');
  const [result, setResult] = useState<string | number>('—');
  const [error, setError] = useState<string>('');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [originalDisplays, setOriginalDisplays] = useState<Record<string, string>>({});

  const [guidedModal, setGuidedModal] = useState<{ type: string; exercise: any } | null>(null);
  const [guidedInput, setGuidedInput] = useState('');
  const [guidedFeedback, setGuidedFeedback] = useState('');

  const [selectedExample, setSelectedExample] = useState<QuickExample | null>(null);

  // Sidebar toggle for giving the sheet maximum possible width
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load initial data
  useEffect(() => {
    const initial = JSON.parse(JSON.stringify(datasets.sales));
    setCurrentData(initial);
    
    // Preload formula
    setTimeout(() => {
      setFormula('=SUM(F2:F15)');
      const res = evaluateFormula('=SUM(F2:F15)', initial);
      setResult(res.result);
      setError(res.error || '');
    }, 600);

    // Initial example calculations (handled in parent examples too)
  }, []);

  const switchDataset = (key: DatasetKey) => {
    const copy = JSON.parse(JSON.stringify(datasets[key]));
    setCurrentKey(key);
    setCurrentData(copy);
    setResult('—');
    setError('');
    setFormula('');
    setSelectedExample(null);
  };

  const resetDataset = () => {
    if (!confirm('Reset this dataset to original values?')) return;
    const copy = JSON.parse(JSON.stringify(datasets[currentKey]));
    setCurrentData(copy);
    setResult('—');
  };

  const exportCSV = () => {
    if (!currentData) return;
    let csv = currentData.headers.join(',') + '\n';
    currentData.rows.forEach(row => {
      csv += row.map(cell => {
        if (typeof cell === 'string' && cell.includes(',')) return `"${cell}"`;
        return cell;
      }).join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentKey}-data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateCell = (rowIdx: number, colIdx: number, newVal: string) => {
    const copy = { ...currentData, rows: currentData.rows.map(r => [...r]) };
    let val: string | number = newVal.trim();
    if (!isNaN(parseFloat(val)) && isFinite(Number(val))) {
      val = parseFloat(val);
    }
    copy.rows[rowIdx][colIdx] = val;
    setCurrentData(copy);

    // Hint to re-eval
    if (result !== '—' && result !== '') {
      setResult(String(result) + ' (data changed)');
    }
  };

  const runEvaluate = useCallback((input?: string) => {
    const toEval = input ?? formula;
    if (!toEval.trim()) return;
    const res = evaluateFormula(toEval, currentData);
    setResult(res.result);
    setError(res.error || '');
  }, [formula, currentData]);

  const handleFormulaKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runEvaluate();
    }
  };

  const loadQuickExample = (ex: QuickExample) => {
    setFormula(ex.formula);
    setSelectedExample(ex);
    setTimeout(() => runEvaluate(ex.formula), 50);
  };

  // Focus / Fullscreen mode
  const enterFocusMode = () => {
    if (isFocusMode) {
      exitFocusMode();
      return;
    }
    const sections = ['why', 'curriculum', 'examples', 'quizzes'];
    const saved: Record<string, string> = {};
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        saved[id] = el.style.display;
        el.style.display = 'none';
      }
    });
    setOriginalDisplays(saved);
    setIsFocusMode(true);

    const pg = document.getElementById('playground');
    if (pg) {
      pg.style.minHeight = '86vh';
      pg.style.background = 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)';
      // Hide the tiny footer note in full mode for even more sheet real estate
      const footerNote = pg.querySelector('.playground-card > div:last-child');
      if (footerNote) (footerNote as HTMLElement).style.display = 'none';
    }
    setTimeout(() => {
      document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const exitFocusMode = () => {
    Object.keys(originalDisplays).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = originalDisplays[id] || '';
    });
    const pg = document.getElementById('playground');
    if (pg) {
      pg.style.minHeight = '';
      pg.style.background = '';
      const footerNote = pg.querySelector('.playground-card > div:last-child');
      if (footerNote) (footerNote as HTMLElement).style.display = '';
    }
    setIsFocusMode(false);
    setTimeout(() => {
      document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  // Guided practice
  const startGuided = (type: string) => {
    const ex = guidedExercises[type];
    if (!ex) {
      alert("Guided exercise coming soon!");
      return;
    }
    if (currentKey !== ex.dataset) {
      switchDataset(ex.dataset);
    }
    setGuidedModal({ type, exercise: ex });
    // Prefill starter
    let starter = '';
    if (type === 'SUMIF') starter = '=SUMIF(A2:A15,"",F2:F15)';
    else if (type === 'COUNTIFS') starter = '=COUNTIFS(A2:A15,"",B2:B15,"")';
    else if (type === 'INDEXMATCH') starter = '=INDEX(D2:D13,MATCH("",A2:A13,0))';
    setGuidedInput(starter);
    setGuidedFeedback('');
    setTimeout(() => document.getElementById('guidedInput')?.focus(), 180);
  };

  const checkGuided = () => {
    if (!guidedModal) return;
    const ex = guidedModal.exercise;
    const user = guidedInput.trim().replace(/\s+/g, '');
    const correct = ex.expectedAnswers.map((a: string) => a.replace(/\s+/g, '').toLowerCase());

    const isGood = correct.some((c: string) => user.toLowerCase() === c);
    if (isGood) {
      setGuidedFeedback('✅ Excellent! That\'s correct. Great job.');
      // persist progress
      const progress = JSON.parse(localStorage.getItem('mbaExcelProgress') || '{}');
      progress[guidedModal.type] = true;
      localStorage.setItem('mbaExcelProgress', JSON.stringify(progress));
    } else {
      setGuidedFeedback(`❌ Not quite. ${ex.hint}`);
    }
  };

  const showGuidedSolution = () => {
    if (!guidedModal) return;
    setGuidedInput(guidedModal.exercise.solution);
    setGuidedFeedback('💡 Solution shown. Study why it works, then try yourself.');
  };

  const closeGuided = () => {
    setGuidedModal(null);
    setGuidedInput('');
    setGuidedFeedback('');
  };

  const nextGuided = () => {
    if (!guidedModal) return;
    const types = Object.keys(guidedExercises);
    const currIdx = types.indexOf(guidedModal.type);
    const next = types[(currIdx + 1) % types.length];
    closeGuided();
    setTimeout(() => startGuided(next), 380);
  };

  // External trigger support (from FormulaLab)
  useEffect(() => {
    if (onStartGuidedFromOutside) {
      startGuided(onStartGuidedFromOutside);
      clearOutsideTrigger?.();
    }
  }, [onStartGuidedFromOutside]);

  const currentExamples = getExampleChips(currentKey);

  // Keyboard: / focuses formula
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName === 'BODY') {
        e.preventDefault();
        const input = document.getElementById('formulaInput') as HTMLInputElement;
        input?.focus();
        input?.select();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div id="playground" className={`max-w-screen-2xl mx-auto px-6 md:px-8 pt-6 pb-12 ${isFocusMode ? 'full-playground' : ''}`}>
      {/* Compact header - less vertical waste */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-2">
            <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold tracking-[1px] rounded-2xl">SANDBOX</span>
            <span className="hidden sm:inline text-xs px-2.5 py-1 bg-emerald-100 text-emerald-700 font-medium rounded-2xl">Live • No sign-up • Local only</span>
          </div>
          <button 
            onClick={enterFocusMode} 
            className="text-xs px-3 py-1.5 bg-white border border-teal-300 text-teal-700 rounded-2xl hover:bg-teal-50 flex items-center gap-x-1.5 font-medium"
          >
            ⤢ {isFocusMode ? 'Exit Full View' : 'Maximize View'}
          </button>
        </div>

        {/* Dataset tabs - compact */}
        <div className="flex items-center gap-x-1 text-xs">
          <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-0.5 text-xs shadow-sm">
            {(['sales', 'finance', 'hr', 'ops'] as DatasetKey[]).map((k) => (
              <div
                key={k}
                onClick={() => switchDataset(k)}
                className={`dataset-tab px-3.5 py-1.5 rounded-[12px] cursor-pointer font-medium transition-all ${currentKey === k ? 'active bg-white shadow-sm text-teal-700' : 'text-slate-600 hover:text-slate-900'}`}
                id={`tab-${k}`}
              >
                {k === 'sales' && 'Sales'}
                {k === 'finance' && 'Finance'}
                {k === 'hr' && 'HR'}
                {k === 'ops' && 'Ops'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main playground card - designed to dominate space */}
      <div className="playground-card bg-white border border-slate-200 shadow-xl shadow-slate-900/5 rounded-3xl overflow-hidden flex flex-col">
        {/* Compact dataset header bar */}
        <div className="px-4 py-3 bg-slate-50 border-b flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-x-3 min-w-0">
            <span className="text-teal-600 text-lg">📊</span>
            <div className="min-w-0">
              <span className="font-semibold text-base tracking-tight">{currentData.name}</span>
              <span className="hidden md:inline text-xs text-slate-500 ml-2 truncate align-middle">{currentData.description}</span>
            </div>
          </div>

          <div className="flex items-center gap-x-2 flex-shrink-0">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="text-xs px-3 h-8 flex items-center gap-x-1.5 border border-slate-300 hover:bg-white rounded-2xl text-slate-600 transition-colors"
              title={sidebarOpen ? "Hide sidebar for bigger sheet" : "Show examples sidebar"}
            >
              {sidebarOpen ? '⤵ Hide examples' : '⤴ Show examples'}
            </button>
            <button onClick={resetDataset} className="text-xs px-3.5 h-8 flex items-center gap-x-1.5 border border-slate-300 hover:bg-white rounded-2xl text-slate-600">
              ↺ Reset
            </button>
            <button onClick={exportCSV} className="text-xs px-3.5 h-8 flex items-center gap-x-1.5 bg-slate-900 text-white rounded-2xl hover:bg-black">
              ⬇ CSV
            </button>
          </div>
        </div>

        {/* Excel-style Formula Toolbar - full width, prominent, sits right above the sheet */}
        <div className="px-4 py-3 bg-white border-b flex items-center gap-x-3 flex-shrink-0">
          <div className="text-xs font-semibold text-slate-500 w-14 flex-shrink-0 tracking-wider">fx</div>
          
          <div className="flex-1 flex items-center gap-x-2 min-w-0">
            <input
              id="formulaInput"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              onKeyUp={handleFormulaKey}
              placeholder='=SUMIF(A2:A15,"North",F2:F15)   — press Enter or click Evaluate'
              className="formula-bar flex-1 border border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition-all rounded-2xl px-4 py-2.5 text-[15px] font-medium outline-none bg-slate-50"
            />
            <button 
              onClick={() => runEvaluate()} 
              className="px-7 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 transition-colors text-white font-semibold rounded-2xl text-sm h-11 flex items-center whitespace-nowrap"
            >
              EVALUATE
            </button>
          </div>

          {/* Prominent live result - right in the toolbar like Excel status bar */}
          <div className="hidden md:flex items-center gap-x-2 bg-slate-900 text-white rounded-2xl px-4 py-1.5 flex-shrink-0">
            <div className="text-[10px] uppercase tracking-widest opacity-60">Result</div>
            <div className="playground-result text-emerald-400 font-mono text-xl min-w-[110px] text-right leading-none">
              {error ? <span className="text-rose-400 text-base">Error</span> : formatResult(result)}
            </div>
          </div>
        </div>

        {error && (
          <div className="px-4 py-1 text-xs text-rose-500 bg-rose-50 border-b">{error}</div>
        )}

        {/* Main content area - table takes MAX space */}
        <div className="playground-main flex-1 p-3 md:p-4 min-h-0">
          <div className="flex gap-3 h-full">
            {/* THE SHEET - as big as possible */}
            <div className={`playground-table-area flex-1 min-w-0 transition-all ${!sidebarOpen ? 'w-full' : ''}`}>
              <div className="flex items-center justify-between mb-1.5 px-1">
                <div className="text-xs font-semibold text-slate-500 tracking-wider flex items-center gap-x-2">
                  EDITABLE DATA GRID 
                  <span className="font-normal text-slate-400">(click any cell to edit values)</span>
                </div>
                <div className="text-[10px] text-emerald-600 flex items-center gap-x-1">
                  <span className="hidden md:inline">Live updates</span> ⟳
                </div>
              </div>

              <div className="data-table-container bg-white rounded-2xl border border-slate-200 shadow-inner flex-1 overflow-auto">
                <table className="excel-table w-full text-sm">
                  <thead>
                    <tr>
                      {/* Row number header (Excel style) */}
                      <th className="px-2 py-2 text-center text-[10px] font-bold bg-slate-800 text-white border-r border-slate-600 w-9">#</th>
                      {currentData.headers.map((h, i) => {
                        const colL = String.fromCharCode(65 + i);
                        return (
                          <th key={i} className="px-3 py-2.5 text-left text-xs font-semibold tracking-wider border-b border-slate-700">
                            {h}<br /><span className="text-[9px] opacity-60 font-mono">{colL}</span>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.rows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        {/* Row number */}
                        <td className="px-2 py-1.5 text-center text-[10px] font-mono text-slate-400 border-r bg-slate-100 select-none">
                          {ri + 2}
                        </td>
                        {row.map((cell, ci) => (
                          <td 
                            key={ci} 
                            contentEditable 
                            suppressContentEditableWarning
                            onBlur={(e) => updateCell(ri, ci, e.currentTarget.textContent || '')}
                            className="px-3 py-2 text-sm focus:outline-none hover:bg-teal-50/40 transition-colors playground-cell"
                            style={{ 
                              textAlign: typeof cell === 'number' ? 'right' : 'left', 
                              fontFamily: typeof cell === 'number' ? 'ui-monospace, monospace' : 'inherit',
                              minWidth: '92px'
                            }}
                          >
                            {typeof cell === 'number' ? cell.toLocaleString() : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-[10px] text-center text-slate-400 mt-1.5">
                Tip: Edit numbers directly to simulate scenarios. Re-evaluate formulas after changes.
              </div>
            </div>

            {/* Compact right sidebar - only when open. Keeps examples accessible without stealing sheet space */}
            {sidebarOpen && (
              <div className="w-72 xl:w-80 flex-shrink-0 border-l border-slate-100 pl-3 hidden lg:flex flex-col">
                <div className="text-xs font-semibold text-slate-500 tracking-wider mb-2 px-1">QUICK EXAMPLES</div>
                
                <div className="flex flex-col gap-1.5 mb-4">
                  {currentExamples.map((ex, i) => {
                    const isActive = selectedExample?.formula === ex.formula;
                    return (
                      <div 
                        key={i} 
                        onClick={() => loadQuickExample(ex)}
                        className={`px-3 py-2 border rounded-2xl cursor-pointer flex items-center justify-between group transition-all text-xs ${isActive 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-teal-50'}`}
                      >
                        <span className="font-medium text-slate-700 group-hover:text-teal-700 leading-snug">{ex.label}</span>
                        <span className="font-mono text-[10px] text-teal-600/70 group-hover:text-teal-600 ml-2 shrink-0">→</span>
                      </div>
                    );
                  })}
                </div>

                {/* Step-by-step explanations for the active example */}
                {selectedExample && (
                  <div className="mb-3 p-3 bg-teal-50 border border-teal-200 rounded-2xl">
                    <div className="text-[10px] font-semibold text-teal-700 tracking-wider mb-1.5">STEP-BY-STEP THINKING</div>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      {selectedExample.thinking.map((step, i) => (
                        <div key={i} className="flex gap-1.5">
                          <span className="font-mono text-teal-600 font-semibold shrink-0">{i + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-3 border-t text-[10px] text-slate-500 leading-snug">
                  Supported: <span className="font-medium text-slate-600">SUM, AVERAGE, COUNT, MAX, MIN, SUMIF/COUNTIF/AVERAGEIF, SUMIFS/COUNTIFS, VLOOKUP, INDEX+MATCH, SUMPRODUCT, IFS, MAXIFS</span>.
                  <div className="mt-2 text-[9px]">Use quotes for text criteria. Ranges like A2:A15 or F2:F15.</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Very small footer note */}
        <div className="px-4 pb-3 pt-1 text-center">
          <p className="text-[10px] text-slate-400">Client-side Excel simulator. Changes don’t persist. Full version will support 50+ functions + real .xlsx files.</p>
        </div>
      </div>

      {/* Guided Modal */}
      {guidedModal && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) closeGuided(); }}>
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-8 pt-8 pb-6 border-b bg-slate-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold text-teal-600 tracking-wider">GUIDED PRACTICE</div>
                  <h3 className="text-2xl font-semibold tracking-tight">{guidedModal.exercise.title}</h3>
                </div>
                <button onClick={closeGuided} className="text-3xl leading-none text-slate-400 hover:text-slate-600">×</button>
              </div>
              <p className="mt-3 text-slate-600">{guidedModal.exercise.objective}</p>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <div className="text-xs font-semibold text-slate-500 mb-2">STEPS TO FOLLOW</div>
                <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700">
                  {guidedModal.exercise.steps.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ol>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500">Your Formula</label>
                <div className="flex mt-1">
                  <input 
                    id="guidedInput"
                    value={guidedInput}
                    onChange={(e) => setGuidedInput(e.target.value)}
                    className="flex-1 border border-slate-300 focus:border-teal-500 rounded-l-2xl px-4 py-3 font-mono text-sm outline-none"
                    placeholder="=SUMIF(...)"
                  />
                  <button onClick={checkGuided} className="px-8 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-r-2xl text-sm">Check Answer</button>
                </div>
                {guidedFeedback && <div className="mt-3 text-sm">{guidedFeedback}</div>}
              </div>
            </div>

            <div className="px-8 py-5 bg-slate-50 border-t flex justify-between items-center">
              <button onClick={showGuidedSolution} className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-x-1">💡 Show Solution</button>
              <div className="flex gap-x-3">
                <button onClick={closeGuided} className="px-5 py-2 text-sm font-medium text-slate-600">Close</button>
                <button onClick={nextGuided} className="px-5 py-2 text-sm font-semibold bg-slate-900 text-white rounded-2xl">Next Challenge →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
