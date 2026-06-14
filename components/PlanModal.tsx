'use client';

export default function PlanModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="px-8 pt-8 pb-6 bg-slate-900 text-white">
          <h3 className="font-display text-3xl tracking-tighter">Full Project Plan &amp; Roadmap</h3>
          <p className="text-white/60 mt-1">How to build the complete MBA Excel Mastery platform</p>
        </div>

        <div className="p-8 text-sm max-h-[65vh] overflow-auto space-y-6">
          <div>
            <h5 className="font-semibold mb-2 flex items-center gap-x-2">🎯 Vision</h5>
            <p>A self-contained, beautiful web app that teaches practical Excel through MBA-relevant datasets and a powerful sandbox. Goal: Take students from basic SUM to confident financial modeling in 4-6 weeks of self-paced learning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <h5 className="font-semibold mb-2">Phase 1</h5>
              <ul className="text-xs space-y-1 text-slate-600 list-disc pl-4">
                <li>Finalize 8 modules + 25 formulas</li>
                <li>Curate 4 rich datasets (prototyped)</li>
                <li>Write lesson content + business context</li>
                <li>Design Figma wireframes</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Phase 2</h5>
              <ul className="text-xs space-y-1 text-slate-600 list-disc pl-4">
                <li>Build core SPA (Next.js + TS)</li>
                <li>Full formula engine + real xlsx (SheetJS)</li>
                <li>Quiz engine + progress sync</li>
                <li>Deploy on Vercel + optional Supabase</li>
              </ul>
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Tech Stack (Current)</h5>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-slate-100 rounded-2xl">Next.js 16 + Tailwind + TS</span>
              <span className="px-3 py-1 bg-slate-100 rounded-2xl">Client-side formula simulator</span>
              <span className="px-3 py-1 bg-slate-100 rounded-2xl">localStorage progress</span>
              <span className="px-3 py-1 bg-slate-100 rounded-2xl">Framer Motion</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl text-xs">
            <strong className="block mb-1">This prototype demonstrates:</strong> 
            Full interactive table editing, 8+ formula support (SUMIF family, VLOOKUP, aggregates), dataset switching, live examples, quizzes with instant feedback, and professional UX.
          </div>
        </div>

        <div className="px-8 py-5 border-t flex justify-between items-center bg-slate-50">
          <div className="text-xs text-slate-500">Built with ❤️ for future business leaders</div>
          <button onClick={onClose} className="px-6 py-2 text-sm font-semibold bg-slate-900 text-white rounded-2xl">Close</button>
        </div>
      </div>
    </div>
  );
}
