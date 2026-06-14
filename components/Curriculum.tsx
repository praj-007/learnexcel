'use client';

import { lessonData } from '../lib/lessonData';
import { Lesson } from '../lib/types';

interface CurriculumProps {
  onOpenLesson: (index: number) => void;
}

export default function Curriculum({ onOpenLesson }: CurriculumProps) {
  const modules = [
    { title: "Data Aggregation & Summaries", pills: ["SUM / AVERAGE", "COUNT / SUBTOTAL", "SUMIF / COUNTIF"] },
    { title: "Lookups & Data Retrieval", pills: ["VLOOKUP / XLOOKUP", "INDEX + MATCH", "HLOOKUP"] },
    { title: "Financial Modeling", pills: ["NPV / IRR", "PMT / FV / PV", "RATE / NPER"] },
    { title: "Logical & Conditional Logic", pills: ["IF / IFS / SWITCH", "AND / OR / NOT", "IFERROR / IFNA"] },
    { title: "Text, Dates & Cleaning", pills: ["TEXT / CONCAT", "LEFT / MID / RIGHT", "EOMONTH / NETWORKDAYS"] },
    { title: "Dynamic Arrays & Modern Excel", pills: ["FILTER / SORT", "UNIQUE / TRANSPOSE", "SUMPRODUCT"] },
    { title: "Statistical Analysis", pills: ["CORREL / COVARIANCE", "PERCENTILE / RANK", "FORECAST / SLOPE"] },
    { title: "Visualization & Dashboards", pills: ["Charts & PivotCharts", "Conditional Formatting", "Slicers & Sparklines"] },
  ];

  return (
    <div id="curriculum" className="max-w-screen-2xl mx-auto px-8 py-12 bg-white border-y border-slate-200">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full tracking-wider">STRUCTURED PATH</span>
            <h2 className="section-header tracking-tighter mt-2">8 Modules • From Basics to Mastery</h2>
          </div>
          <div className="text-right text-sm text-slate-500 hidden md:block">
            Each module includes interactive examples,<br />business context &amp; practice exercises
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod, idx) => (
            <div
              key={idx}
              onClick={() => onOpenLesson(idx)}
              className="module-card cursor-pointer bg-white border border-slate-200 hover:border-teal-300 rounded-3xl p-5 group"
            >
              <div className="flex justify-between">
                <div className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg w-fit">MODULE {(idx + 1).toString().padStart(2, '0')}</div>
                <span className="text-slate-300 group-hover:text-teal-500 transition-colors">→</span>
              </div>
              <h4 className="font-semibold text-xl mt-4 mb-1 tracking-tight">{mod.title}</h4>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {mod.pills.map((p, pi) => (
                  <span key={pi} className="formula-pill px-2.5 py-px bg-teal-50 text-teal-700 rounded-md">{p}</span>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4">{lessonData[idx]?.content ? 'Real MBA use cases + live demos' : 'Interactive examples and practice'}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">All modules include downloadable .xlsx practice files (in full version) and live interactive demos.</p>
        </div>
      </div>
    </div>
  );
}
