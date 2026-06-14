'use client';

import Link from 'next/link';

const modules = [
  { id: '01', title: "Data Aggregation & Summaries", pills: ["SUM / AVERAGE", "COUNT / SUBTOTAL", "SUMIF / COUNTIF"] },
  { id: '02', title: "Lookups & Data Retrieval", pills: ["VLOOKUP / XLOOKUP", "INDEX + MATCH", "HLOOKUP"] },
  { id: '03', title: "Financial Modeling", pills: ["NPV / IRR", "PMT / FV / PV", "RATE / NPER"] },
  { id: '04', title: "Logical & Conditional Logic", pills: ["IF / IFS / SWITCH", "AND / OR / NOT", "IFERROR / IFNA"] },
  { id: '05', title: "Text, Dates & Cleaning", pills: ["TEXT / CONCAT", "LEFT / MID / RIGHT", "EOMONTH / NETWORKDAYS"] },
  { id: '06', title: "Dynamic Arrays & Modern Excel", pills: ["FILTER / SORT", "UNIQUE / TRANSPOSE", "SUMPRODUCT"] },
  { id: '07', title: "Statistical Analysis", pills: ["CORREL / COVARIANCE", "PERCENTILE / RANK", "FORECAST / SLOPE"] },
  { id: '08', title: "Visualization & Dashboards", pills: ["Charts & PivotCharts", "Conditional Formatting", "Slicers & Sparklines"] },
];

export default function Curriculum() {
  return (
    <div id="curriculum" className="max-w-screen-2xl mx-auto px-8 py-12 bg-white border-y border-slate-200">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full tracking-wider">STRUCTURED PATH</span>
            <h2 className="section-header tracking-tighter mt-2">8 Modules • From Basics to Mastery</h2>
          </div>
          <div className="text-right text-sm text-slate-500 hidden md:block">
            Real scenarios • Step-by-step thinking breakdowns • Hands-on practice
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod) => (
            <Link
              key={mod.id}
              href={`/lesson/${mod.id}`}
              className="module-card block bg-white border border-slate-200 hover:border-teal-300 rounded-3xl p-5 group no-underline"
            >
              <div className="flex justify-between">
                <div className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg w-fit">MODULE {mod.id}</div>
                <span className="text-slate-300 group-hover:text-teal-500 transition-colors">→</span>
              </div>
              <h4 className="font-semibold text-xl mt-4 mb-1 tracking-tight text-slate-900">{mod.title}</h4>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {mod.pills.map((p, pi) => (
                  <span key={pi} className="formula-pill px-2.5 py-px bg-teal-50 text-teal-700 rounded-md">{p}</span>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4">Click to dive deep into real scenarios and thinking steps</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">Each lesson focuses on breaking down business problems into clear formula decisions with examples.</p>
        </div>
      </div>
    </div>
  );
}
