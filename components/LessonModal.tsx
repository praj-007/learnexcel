'use client';

import { lessonData } from '../lib/lessonData';
import { DatasetKey } from '../lib/types';

interface Props {
  index: number | null;
  onClose: () => void;
  onTryFormula: (formula: string, ds?: DatasetKey) => void;
}

export default function LessonModal({ index, onClose, onTryFormula }: Props) {
  if (index === null) return null;
  const data = lessonData[index] || lessonData[0];

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        className="lesson-modal bg-white w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <div className="px-8 pt-8 pb-5 border-b flex justify-between items-start">
          <div>
            <div className="text-xs font-bold text-teal-600 tracking-[1.5px]">MODULE {data.num}</div>
            <div className="text-3xl font-semibold tracking-tighter">{data.title}</div>
          </div>
          <button onClick={onClose} className="text-3xl leading-none text-slate-300 hover:text-slate-500">×</button>
        </div>

        <div className="p-8 overflow-auto flex-1 text-sm">
          <div dangerouslySetInnerHTML={{ __html: data.content }} className="prose prose-sm max-w-none text-slate-700" />

          {data.tryFormulas && data.tryFormulas.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h6 className="font-semibold mb-3 flex items-center gap-x-2">💻 Try it live in the Playground</h6>
              <div className="flex flex-wrap gap-2">
                {data.tryFormulas.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        onTryFormula(item.formula, item.ds);
                      }, 280);
                    }}
                    className="px-4 py-2 text-xs font-medium bg-white border border-teal-200 hover:bg-teal-50 text-teal-700 rounded-2xl flex items-center gap-x-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-5 bg-slate-50 flex justify-end gap-x-3 border-t">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900">Close</button>
          <button 
            onClick={() => {
              onClose();
              setTimeout(() => {
                document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
              }, 180);
            }} 
            className="px-6 py-2.5 text-sm font-semibold bg-teal-600 text-white rounded-2xl"
          >
            Go to Playground
          </button>
        </div>
      </div>
    </div>
  );
}
