'use client';

import { useState } from 'react';
import { quizQuestions } from '../lib/quizData';
import { QuizQuestion } from '../lib/types';

export default function Quizzes() {
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [feedbacks, setFeedbacks] = useState<Record<number, { correct: boolean; text: string }>>({});
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);

  const recordMCQ = (qIdx: number, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setFeedbacks(prev => { const copy = { ...prev }; delete copy[qIdx]; return copy; });
  };

  const recordFormula = (qIdx: number, value: string) => {
    setAnswers(prev => ({ ...prev, [qIdx]: value.trim() }));
  };

  const grade = () => {
    let correctCount = 0;
    const newFeedbacks: Record<number, { correct: boolean; text: string }> = {};

    quizQuestions.forEach((q: QuizQuestion, idx: number) => {
      const userAns = answers[idx];
      let isCorrect = false;

      if (q.type === 'mcq') {
        isCorrect = parseInt(String(userAns)) === q.answer;
      } else {
        const normUser = (String(userAns || '')).toUpperCase().replace(/\s+/g, '');
        const normAns = String(q.answer).toUpperCase().replace(/\s+/g, '');
        isCorrect = normUser.includes(normAns.substring(0, 12)) || normUser === normAns;
      }

      if (isCorrect) correctCount++;
      newFeedbacks[idx] = {
        correct: isCorrect,
        text: q.explanation
      };
    });

    setFeedbacks(newFeedbacks);
    const finalScore = { correct: correctCount, total: quizQuestions.length };
    setScore(finalScore);

    if (correctCount === quizQuestions.length) {
      // Simple confetti
      launchConfetti();
    }
  };

  const reset = () => {
    setAnswers({});
    setFeedbacks({});
    setScore(null);
  };

  function launchConfetti() {
    const colors = ['#0D9488', '#14B8A6', '#5EEAD4'];
    for (let i = 0; i < 70; i++) {
      setTimeout(() => {
        const conf = document.createElement('div');
        conf.style.position = 'fixed';
        conf.style.zIndex = '99999';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.top = '-12px';
        conf.style.width = '8px';
        conf.style.height = '8px';
        conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        conf.style.background = colors[Math.floor(Math.random() * colors.length)];
        conf.style.opacity = String(Math.random() + 0.5);
        document.body.appendChild(conf);

        const dur = Math.random() * 2200 + 2100;
        conf.animate([
          { transform: `translateY(0) rotate(0)`, opacity: conf.style.opacity },
          { transform: `translateY(${window.innerHeight + 140}px) rotate(${Math.random() * 580 - 180}deg)`, opacity: 0 }
        ], { duration: dur, easing: 'cubic-bezier(0.25,0.1,0.25,1)' }).onfinish = () => conf.remove();
      }, i * 1.6);
    }
  }

  return (
    <div id="quizzes" className="max-w-screen-2xl mx-auto px-8 py-12 bg-slate-900 text-white rounded-t-3xl">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-teal-400 text-sm font-bold tracking-[1.5px]">TEST YOUR MASTERY</span>
            <h2 className="section-header tracking-tighter text-white">Quick Formula Challenges</h2>
          </div>
          {score && (
            <div className="bg-white/10 px-5 py-2 rounded-2xl text-sm font-medium flex items-center gap-x-2">
              Your Score: <span className="font-mono text-xl font-semibold text-teal-400">{score.correct}/{score.total}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizQuestions.map((q, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 quiz-card">
              <div className="text-xs text-teal-400 font-bold mb-1.5">QUESTION {idx + 1}</div>
              <div className="font-medium mb-4">{q.q}</div>

              {q.type === 'mcq' && q.options && (
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <label key={oIdx} className="flex items-start gap-x-2.5 cursor-pointer text-sm p-2 rounded-xl hover:bg-white/5">
                      <input 
                        type="radio" 
                        name={`q${idx}`} 
                        value={oIdx} 
                        checked={answers[idx] === oIdx}
                        onChange={() => recordMCQ(idx, oIdx)}
                        className="mt-1 accent-teal-500" 
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.type === 'formula' && (
                <input 
                  type="text" 
                  placeholder="=Your formula here" 
                  className="w-full bg-white/10 border border-white/20 focus:border-teal-400 rounded-2xl px-4 py-2.5 text-sm font-mono placeholder:text-white/40"
                  onBlur={(e) => recordFormula(idx, e.target.value)}
                  defaultValue={String(answers[idx] || '')}
                />
              )}

              {feedbacks[idx] && (
                <div className={`mt-3 text-xs p-3 rounded-2xl ${feedbacks[idx].correct ? 'bg-emerald-900/30 text-emerald-300' : 'bg-rose-900/30 text-rose-300'}`}>
                  {feedbacks[idx].correct ? '✅ Correct! ' : '❌ Not quite. '}
                  {feedbacks[idx].text}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-x-4">
          <button 
            onClick={grade} 
            className="px-10 py-3 bg-white text-slate-900 font-semibold rounded-2xl flex items-center gap-x-3 hover:bg-teal-50 transition-colors"
          >
            Submit All Answers <span>✓</span>
          </button>
          <button onClick={reset} className="px-6 py-3 text-sm border border-white/30 hover:bg-white/5 rounded-2xl flex items-center gap-x-2">
            Reset Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
