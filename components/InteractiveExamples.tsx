'use client';

import { useState } from 'react';
import { datasets } from '../lib/datasets';

export default function InteractiveExamples() {
  // Regional
  const [region, setRegion] = useState('North');
  const [totalRev, setTotalRev] = useState(0);
  const [avgRev, setAvgRev] = useState(0);

  const calculateRegional = (selected: string) => {
    const data = datasets.sales;
    let total = 0;
    let count = 0;
    data.rows.forEach(row => {
      if (row[0] === selected) {
        total += Number(row[5]);
        count++;
      }
    });
    setTotalRev(total);
    setAvgRev(count > 0 ? Math.round(total / count) : 0);
  };

  // NPV
  const [discountRate, setDiscountRate] = useState(12);
  const [npv, setNpv] = useState(128450);

  const calculateNPV = (rate: number) => {
    setDiscountRate(rate);
    const cashflows = [-500000, 120000, 183000, 245000, 305000, 292000];
    const r = rate / 100;
    let val = 0;
    for (let t = 0; t < cashflows.length; t++) {
      val += cashflows[t] / Math.pow(1 + r, t);
    }
    setNpv(Math.round(val));
  };

  // HR
  const [hrAvg, setHrAvg] = useState(92400);
  const [hrHigh, setHrHigh] = useState(18);
  const [hrAttr, setHrAttr] = useState(12);

  const calculateHR = () => {
    const data = datasets.hr;
    let finSal: number[] = [];
    let high = 0;
    let risk = 0;
    data.rows.forEach(row => {
      if (row[1] === 'Finance') finSal.push(Number(row[3]));
      if (Number(row[4]) > 4.0) high++;
      if (row[6] === 'High') risk++;
    });
    const avg = finSal.length ? Math.round(finSal.reduce((a, b) => a + b, 0) / finSal.length) : 0;
    setHrAvg(avg);
    setHrHigh(high);
    setHrAttr(Math.round((risk / data.rows.length) * 100));
  };

  return (
    <div id="examples" className="max-w-screen-2xl mx-auto px-8 py-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-8">
          <span className="text-teal-600 text-sm font-bold tracking-widest">REAL BUSINESS QUESTIONS</span>
          <h2 className="section-header tracking-tighter">See the Thinking in Action</h2>
          <p className="text-slate-600 mt-2 max-w-lg">
            These are the exact kinds of questions you'll face in cases, internships, and your first job. 
            Watch how the right formula turns a vague request into a clear answer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Regional Revenue - SUMIF / AVERAGEIF */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-700 rounded">MARKETING</span>
              <span className="text-xs text-slate-400">SUMIF • AVERAGEIF</span>
            </div>

            <div className="mb-4">
              <div className="font-semibold text-lg leading-tight">Your manager says:</div>
              <div className="mt-1 text-[15px] font-medium italic text-slate-700">
                “Give me total revenue and average deal size for only the North region.”
              </div>
            </div>

            <div className="text-xs text-slate-500 mb-3">What formula would you reach for?</div>

            <div className="bg-slate-50 rounded-2xl p-4 mb-4 flex-1">
              <div className="flex justify-between text-xs mb-2">
                <div><span className="font-medium">Select Region:</span></div>
                <select 
                  value={region} 
                  onChange={(e) => { setRegion(e.target.value); calculateRegional(e.target.value); }}
                  className="text-sm border border-slate-300 rounded-lg px-2 py-0.5"
                >
                  {['North', 'South', 'East', 'West'].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-xs text-slate-500">Total Revenue</div>
                  <div className="font-mono text-xl font-semibold text-teal-600">${totalRev.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Avg Revenue / Deal</div>
                  <div className="font-mono text-xl font-semibold text-teal-600">${avgRev.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="text-[10px] font-medium text-teal-700 mb-1">The formula:</div>
              <div className="font-mono text-sm bg-slate-900 text-emerald-300 px-3 py-2 rounded-xl mb-2">
                =SUMIF(Region, "North", Revenue)
              </div>
              <div className="text-xs text-slate-600 mb-3">
                One condition (Region = North) → use the single-criteria IF version. 
                This is the exact pattern taught in Module 1.
              </div>
              <button 
                onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-2 text-sm font-semibold border border-teal-200 hover:bg-teal-50 text-teal-700 rounded-2xl transition-colors"
              >
                See the full thinking in Lesson 1 →
              </button>
            </div>
          </div>

          {/* Project NPV - Financial Modeling */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-700 rounded">FINANCE</span>
              <span className="text-xs text-slate-400">NPV • IRR</span>
            </div>

            <div className="mb-4">
              <div className="font-semibold text-lg leading-tight">Your PE case asks:</div>
              <div className="mt-1 text-[15px] font-medium italic text-slate-700">
                “Is this $500k investment worth it at a 12% hurdle rate?”
              </div>
            </div>

            <div className="text-xs text-slate-500 mb-3">How sensitive is the answer to your discount rate assumption?</div>

            <div className="space-y-4 flex-1">
              <div>
                <label className="text-xs font-medium text-slate-500">Discount Rate (%)</label>
                <div className="flex items-center gap-x-3 mt-1">
                  <input 
                    type="range" min="5" max="25" step="0.5" value={discountRate} 
                    onChange={(e) => calculateNPV(parseFloat(e.target.value))}
                    className="flex-1 accent-teal-600" 
                  />
                  <div className="w-14 text-right">
                    <span className="font-mono font-semibold">{discountRate.toFixed(1)}</span><span className="text-xs">%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-4 text-sm">
                <div className="flex justify-between items-baseline">
                  <div className="text-xs opacity-60">NET PRESENT VALUE</div>
                  <div className={`font-mono text-2xl font-semibold ${npv > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ${npv.toLocaleString()}
                  </div>
                </div>
                <div className="text-[10px] mt-1 opacity-60">
                  {npv > 0 ? "Positive → the project creates value at this rate" : "Negative → the project destroys value"}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs text-slate-600 mb-2">
                NPV tells you whether future cash flows are worth more than the initial investment when discounted at your required return.
              </div>
              <button 
                onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-2 text-sm font-semibold border border-blue-200 hover:bg-blue-50 text-blue-700 rounded-2xl transition-colors"
              >
                Master NPV &amp; IRR in Module 3 →
              </button>
            </div>
          </div>

          {/* HR Analytics - Multi-condition */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 bg-violet-100 text-violet-700 rounded">HR / OB</span>
              <span className="text-xs text-slate-400">COUNTIFS • AVERAGEIFS</span>
            </div>

            <div className="mb-4">
              <div className="font-semibold text-lg leading-tight">Leadership wants to know:</div>
              <div className="mt-1 text-[15px] font-medium italic text-slate-700">
                “What’s the average salary in Finance, and how many high performers do we have across departments?”
              </div>
            </div>

            <div className="text-xs text-slate-500 mb-3">This requires filtering on multiple dimensions at once.</div>

            <div className="grid grid-cols-3 gap-3 text-center mb-4 flex-1 content-start">
              <div className="bg-slate-50 rounded-2xl p-3">
                <div className="text-xs text-slate-500">Avg Salary (Finance)</div>
                <div className="font-mono text-lg font-semibold">${hrAvg.toLocaleString()}</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3">
                <div className="text-xs text-slate-500">High Performers</div>
                <div className="font-mono text-lg font-semibold">{hrHigh}</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3">
                <div className="text-xs text-slate-500">Attrition Risk</div>
                <div className="font-mono text-lg font-semibold text-rose-600">{hrAttr}%</div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="text-xs text-slate-600 mb-2">
                One condition? Use COUNTIF / AVERAGEIF.<br />
                Multiple conditions at the same time? You need the plural versions (COUNTIFS / AVERAGEIFS).
              </div>
              <button 
                onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-2 text-sm font-semibold border border-violet-200 hover:bg-violet-50 text-violet-700 rounded-2xl transition-colors"
              >
                See when to use COUNTIFS vs COUNTIF →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          These are warm-ups. The real learning happens when you connect the pattern to the full lesson + practice in the Playground.
        </div>
      </div>
    </div>
  );
}
