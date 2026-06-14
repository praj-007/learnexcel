'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { datasets, getExampleChips } from '../lib/datasets';
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

  const loadQuickExample = (exFormula: string) => {
    setFormula(exFormula);
    setTimeout(() => runEvaluate(exFormula), 50);
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
      pg.style.minHeight = '92vh';
      pg.style.background = 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)';
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
    <div id="playground" className={`max-w-screen-2xl mx-auto px-8 pt-10 pb-20 ${isFocusMode ? 'full-playground' : ''}`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-y-4 mb-6">
          <div>
            <div className="flex items-center gap-x-3">
              <span className="px-4 py-1.5 bg-teal-600 text-white text-xs font-bold tracking-[1px] rounded-2xl">SANDBOX</span>
              <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 font-medium rounded-2xl">No sign-up required • Changes are local</span>
              <button 
                onClick={enterFocusMode} 
                className="ml-2 text-xs px-3 py-1 bg-white border border-teal-300 text-teal-700 rounded-2xl hover:bg-teal-50 flex items-center gap-x-1"
              >
                ⤢ Focus Mode
              </button>
            </div>
            <h2 className="section-header tracking-tighter mt-1">Formula Playground</h2>
            <p className="text-slate-600">Edit cells • Try any formula • Instant results. The safest place to break things and learn.</p>
          </div>

          <div className="flex items-center gap-x-2 text-xs">
            <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 text-xs">
              {(['sales', 'finance', 'hr', 'ops'] as DatasetKey[]).map((k) => (
                <div
                  key={k}
                  onClick={() => switchDataset(k)}
                  className={`dataset-tab px-4 py-1.5 rounded-[14px] cursor-pointer font-medium ${currentKey === k ? 'active bg-white shadow-sm' : ''}`}
                  id={`tab-${k}`}
                >
                  {k === 'sales' && 'Sales & Marketing'}
                  {k === 'finance' && 'Financials'}
                  {k === 'hr' && 'HR Analytics'}
                  {k === 'ops' && 'Operations'}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-xl shadow-slate-900/5 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-slate-50 border-b flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <span className="text-teal-600">📋</span>
              <div>
                <span className="font-semibold">{currentData.name}</span>
                <span className="text-xs text-slate-500 block -mt-0.5">{currentData.description}</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <button onClick={resetDataset} className="text-xs px-4 h-9 flex items-center gap-x-2 border border-slate-300 hover:bg-white rounded-2xl text-slate-600">
                ↺ Reset Data
              </button>
              <button onClick={exportCSV} className="text-xs px-4 h-9 flex items-center gap-x-2 bg-slate-900 text-white rounded-2xl hover:bg-black">
                ⬇ Export CSV
              </button>
              {isFocusMode && (
                <button onClick={exitFocusMode} className="text-xs px-4 h-9 bg-slate-900 text-white rounded-2xl">Exit Full View</button>
              )}
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Table */}
            <div className="xl:col-span-7">
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="text-xs font-semibold text-slate-500 tracking-wider">EDITABLE DATA GRID <span className="font-normal">(click any cell to edit)</span></div>
                <div className="text-[10px] text-emerald-600 flex items-center">⟳ Live updates</div>
              </div>

              <div className="data-table-container bg-white rounded-2xl border border-slate-200 shadow-inner" style={{ maxHeight: isFocusMode ? '520px' : '380px' }}>
                <table className="excel-table w-full text-sm">
                  <thead>
                    <tr>
                      {currentData.headers.map((h, i) => {
                        const colL = String.fromCharCode(65 + i);
                        return (
                          <th key={i} className="px-3 py-2.5 text-left text-xs font-semibold tracking-wider border-b border-slate-700">
                            {h}<br /><span className="text-[9px] opacity-50 font-mono">{colL}</span>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.rows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        {row.map((cell, ci) => (
                          <td 
                            key={ci} 
                            contentEditable 
                            suppressContentEditableWarning
                            onBlur={(e) => updateCell(ri, ci, e.currentTarget.textContent || '')}
                            className="px-3 py-2 text-sm focus:outline-none hover:bg-teal-50/30 transition-colors playground-cell"
                            style={{ textAlign: typeof cell === 'number' ? 'right' : 'left', fontFamily: typeof cell === 'number' ? 'monospace' : 'inherit' }}
                          >
                            {typeof cell === 'number' ? cell.toLocaleString() : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-[10px] text-center text-slate-400 mt-1.5">Tip: Change numbers to simulate what-if scenarios. Then re-evaluate your formula.</div>
            </div>

            {/* Controls */}
            <div className="xl:col-span-5 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <div className="text-xs font-semibold text-slate-500 tracking-wider">FORMULA BAR</div>
                  <div className="text-[10px] text-teal-600 cursor-pointer" onClick={() => alert('Supported: SUM, AVERAGE, COUNT, MAX, MIN, SUMIF/COUNTIF/AVERAGEIF family, VLOOKUP. See Help in full version.')}>Supported functions →</div>
                </div>
                <div className="flex">
                  <input
                    id="formulaInput"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    onKeyUp={handleFormulaKey}
                    placeholder='=SUMIF(A2:A15, "North", F2:F15)'
                    className="formula-bar flex-1 border border-slate-300 focus:border-teal-500 transition-colors rounded-l-2xl px-4 py-3 text-sm font-medium outline-none"
                  />
                  <button onClick={() => runEvaluate()} className="px-8 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 transition-colors text-white font-semibold rounded-r-2xl text-sm">
                    EVALUATE
                  </button>
                </div>
              </div>

              {/* Result */}
              <div className="bg-slate-900 rounded-2xl p-5 text-white">
                <div className="text-xs opacity-60 mb-1">RESULT</div>
                <div className="playground-result text-emerald-400 font-mono min-h-[38px] flex items-center">
                  {error ? <span className="text-rose-400">{error}</span> : formatResult(result)}
                </div>
                {error && <div className="text-rose-400 text-xs mt-1">{error}</div>}
              </div>

              {/* Quick chips */}
              <div>
                <div className="text-xs font-semibold text-slate-500 tracking-wider mb-2 px-1">QUICK EXAMPLES FOR THIS DATASET</div>
                <div className="flex flex-wrap gap-2">
                  {currentExamples.map((ex, i) => (
                    <div 
                      key={i} 
                      onClick={() => loadQuickExample(ex.formula)}
                      className="px-3 py-1 bg-white border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-colors text-xs rounded-2xl cursor-pointer flex items-center gap-x-1.5"
                    >
                      <span className="font-medium">{ex.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 flex items-start gap-x-2">
                💡 Formulas support ranges like F2:F15. Use quotes for text criteria. Full parser supports SUMIF family, VLOOKUP and aggregates.
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-slate-500">This playground is a fully functional client-side Excel formula simulator. In production it would support 50+ functions + real .xlsx via SheetJS.</p>
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
