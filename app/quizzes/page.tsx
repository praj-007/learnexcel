'use client';

import Link from 'next/link';
import Quizzes from '../../components/Quizzes';

export default function QuizzesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <Link href="/" className="flex items-center gap-x-3">
              <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div>
                <span className="font-display text-xl font-semibold tracking-tighter">MBA Excel</span>
                <span className="font-display text-xl font-semibold tracking-tighter text-teal-600">Mastery</span>
              </div>
            </Link>
            <div className="text-sm text-slate-500">/ Quizzes</div>
          </div>

          <div className="flex items-center gap-x-3">
            <Link 
              href="/" 
              className="text-sm px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
            >
              Back to Home
            </Link>
            <Link 
              href="/#playground" 
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 transition-colors text-white text-sm font-semibold rounded-xl flex items-center gap-x-2"
            >
              Open Playground
            </Link>
          </div>
        </div>
      </div>

      {/* Page intro */}
      <div className="max-w-screen-xl mx-auto px-6 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-x-2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4">
          TEST YOUR MASTERY
        </div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-4">Quick Formula Challenges</h1>
        <p className="text-xl text-slate-600 max-w-md mx-auto">
          6 questions to see how well you can apply the formulas in real business scenarios. 
          Get instant feedback and explanations.
        </p>
      </div>

      {/* Quizzes component - full focus */}
      <div className="bg-slate-900 text-white py-10 rounded-t-3xl">
        <div className="max-w-screen-2xl mx-auto px-6">
          <Quizzes />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-screen-xl mx-auto px-6 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl font-semibold tracking-tight mb-3">Want to practice hands-on instead?</h3>
          <p className="text-slate-600 mb-6">
            The Formula Playground lets you experiment with real datasets and get instant results while you learn.
          </p>
          <Link 
            href="/#playground" 
            className="inline-flex items-center px-8 py-3.5 bg-slate-900 hover:bg-black text-white font-semibold rounded-2xl text-base"
          >
            Launch the Playground →
          </Link>
        </div>

        <div className="mt-12 text-xs text-slate-400">
          Scores are saved locally in your browser. Refreshing the page will reset the quiz.
        </div>
      </div>
    </div>
  );
}
