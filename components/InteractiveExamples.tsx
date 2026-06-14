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
          <span className="text-teal-600 text-sm font-bold tracking-widest">LEARN BY DOING</span>
          <h2 className="section-header tracking-tighter">Interactive Business Examples</h2>
          <p className="text-slate-600 mt-2 max-w-md">Real scenarios MBA students face. Edit the data or parameters and see formulas update live.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Regional */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-700 rounded">MARKETING</span>
              <span className="text-xs text-slate-400">SUMIF • AVERAGEIF</span>
            </div>
            <h5 className="font-semibold text-lg">Regional Revenue Analysis</h5>
            <p className="text-xs text-slate-500 mt-1 mb-4">Calculate total and average revenue by region from the sales dataset.</p>

            <div className="bg-slate-50 rounded-2xl p-4 mb-4">
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
            <button onClick={() => calculateRegional(region)} className="w-full py-2 text-sm font-semibold bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-colors">
              Calculate with Current Data
            </button>
            <div className="mt-3 text-[10px] text-center text-slate-400">Formula used: =SUMIF(RegionCol, selectedRegion, RevenueCol)</div>
          </div>

          {/* NPV */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-700 rounded">FINANCE</span>
              <span className="text-xs text-slate-400">NPV • IRR</span>
            </div>
            <h5 className="font-semibold text-lg">Project NPV Calculator</h5>
            <p className="text-xs text-slate-500 mt-1 mb-4">Adjust discount rate and see how it impacts project viability (5-year cash flows).</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500">Discount Rate (%)</label>
                <div className="flex items-center gap-x-3">
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
                <div className="text-[10px] mt-1 opacity-50">Initial outlay: $500,000 • Positive = Value creating project</div>
              </div>
            </div>
            <button onClick={() => calculateNPV(discountRate)} className="mt-4 w-full py-2 text-sm font-semibold border border-slate-300 hover:bg-slate-50 rounded-2xl transition-colors">Recalculate NPV</button>
          </div>

          {/* HR */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-2.5 py-1 bg-violet-100 text-violet-700 rounded">HR / OB</span>
              <span className="text-xs text-slate-400">COUNTIF • AVERAGEIFS</span>
            </div>
            <h5 className="font-semibold text-lg">Talent &amp; Compensation Insights</h5>
            <p className="text-xs text-slate-500 mt-1 mb-4">Analyze salary distribution and performance by department.</p>

            <div className="grid grid-cols-3 gap-3 text-center mb-4">
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
            <button onClick={calculateHR} className="w-full py-2 text-sm font-semibold bg-violet-600 text-white rounded-2xl hover:bg-violet-700 transition-colors">Refresh HR Metrics</button>
          </div>
        </div>
      </div>
    </div>
  );
}
