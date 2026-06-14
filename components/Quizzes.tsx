'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../lib/quizData';
import { QuizQuestion } from '../lib/types';

export default function Quizzes() {
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [feedbacks, setFeedbacks] = useState<Record<number, { correct: boolean; text: string }>>({});
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);

  const totalQuestions = quizQuestions.length;

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
    const finalScore = { correct: correctCount, total: totalQuestions };
    setScore(finalScore);
    setIsReviewing(true);
    setCurrentIndex(0);

    if (correctCount === totalQuestions) {
      launchConfetti();
    }
  };

  const reset = () => {
    setAnswers({});
    setFeedbacks({});
    setScore(null);
    setCurrentIndex(0);
    setIsReviewing(false);
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentIndex(index);
    }
  };

  const getNextUnansweredIndex = (start: number): number => {
    // First look for unanswered questions after the current one
    for (let i = start + 1; i < totalQuestions; i++) {
      if (answers[i] === undefined) {
        return i;
      }
    }
    // Then wrap around to surface any previously skipped questions
    for (let i = 0; i <= start; i++) {
      if (answers[i] === undefined) {
        return i;
      }
    }
    // All answered — just advance normally (will allow cycling if needed)
    return (start + 1) % totalQuestions;
  };

  const goNext = () => {
    const nextIndex = getNextUnansweredIndex(currentIndex);
    setCurrentIndex(nextIndex);
  };

  const goPrev = () => goToQuestion(currentIndex - 1);

  const currentQuestion = quizQuestions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const currentFeedback = feedbacks[currentIndex];

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

  // Helper to make focused/quoted parts bold + italic
  const renderQuestionText = (text: string) => {
    // Highlight content inside single quotes and key phrases
    let html = text.replace(/'([^']+)'/g, "<strong><em>'$1'</em></strong>");
    // Also highlight formulas if they appear in questions
    html = html.replace(/=([A-Z]+IF\([^)]+\)|[A-Z]+\([^)]+\))/g, "<strong><em>$&</em></strong>");
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const getPersonalizedFeedback = (idx: number) => {
    const q = quizQuestions[idx];
    const fb = feedbacks[idx];
    if (!fb) return '';

    const userAns = answers[idx];
    let userDisplay = '';
    if (q.type === 'mcq' && q.options) {
      userDisplay = q.options[parseInt(String(userAns))] || 'No answer';
    } else {
      userDisplay = String(userAns || 'No answer');
    }

    const correctDisplay = q.type === 'mcq' && q.options 
      ? q.options[q.answer as number] 
      : q.answer;

    if (fb.correct) {
      return `Caddy, you nailed it! ${q.explanation}`;
    } else {
      return `Caddy, here's what went wrong. You went with “${userDisplay}”. The correct answer is “${correctDisplay}”. ${q.explanation} Think about the number of conditions in the question — that usually tells you whether to reach for the single or plural version of the function.`;
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10 bg-slate-900 text-white rounded-t-3xl">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="text-teal-400 text-sm font-bold tracking-[1.5px]">TEST YOUR MASTERY</span>
            <h2 className="text-4xl font-semibold tracking-tighter">Quick Formula Challenges</h2>
            <p className="text-slate-400 mt-1">Navigate the cards, answer as you go, then review with Caddy.</p>
          </div>
          
          {score && (
            <div className="bg-white/10 px-6 py-3 rounded-2xl text-sm font-medium flex items-center gap-x-3">
              Your Score: <span className="font-mono text-2xl font-semibold text-teal-400">{score.correct}/{score.total}</span>
            </div>
          )}
        </div>

        {!isReviewing ? (
          /* Interactive Card Navigation */
          <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-teal-400 font-medium">
                Question {currentIndex + 1} of {totalQuestions}
              </div>
              <div className="flex gap-1.5">
                {quizQuestions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToQuestion(i)}
                    className={`w-8 h-1.5 rounded-full transition-all ${
                      i === currentIndex 
                        ? 'bg-teal-400' 
                        : answers[i] !== undefined 
                          ? 'bg-white/40' 
                          : 'bg-white/20'
                    }`}
                    aria-label={`Go to question ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Animated Question Card */}
            <div className="min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 80, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -80, y: 20, scale: 0.96 }}
                  transition={{ 
                    type: "spring", 
                    bounce: 0.35, 
                    duration: 0.55 
                  }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col min-h-[340px]"
                >
                  <div className="text-xs text-teal-400 font-bold tracking-wider mb-3">
                    QUESTION {currentIndex + 1}
                  </div>

                  <div className="text-2xl font-medium leading-tight mb-8">
                    {renderQuestionText(currentQuestion.q)}
                  </div>

                  {/* Answer Area */}
                  <div className="flex-1 min-h-0 overflow-auto">
                    {currentQuestion.type === 'mcq' && currentQuestion.options && (
                      <div className="space-y-2.5">
                        {currentQuestion.options.map((opt, oIdx) => (
                          <label 
                            key={oIdx} 
                            className="flex items-start gap-x-3 cursor-pointer text-[15px] p-3.5 rounded-2xl border border-white/10 hover:bg-white/5 active:bg-white/10 transition-colors break-words"
                          >
                            <input 
                              type="radio" 
                              name={`q${currentIndex}`} 
                              checked={currentAnswer === oIdx}
                              onChange={() => recordMCQ(currentIndex, oIdx)}
                              className="mt-1 accent-teal-500" 
                            />
                            <span className="leading-snug">{renderQuestionText(opt)}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {currentQuestion.type === 'formula' && (
                      <div>
                        <input 
                          type="text" 
                          placeholder="=Your formula here"
                          className="w-full bg-white/10 border border-white/20 focus:border-teal-400 rounded-2xl px-5 py-3.5 text-base font-mono placeholder:text-white/40"
                          value={String(currentAnswer || '')}
                          onChange={(e) => recordFormula(currentIndex, e.target.value)}
                        />
                        <p className="text-xs text-white/50 mt-2">Tip: Use the exact syntax like =COUNTIF(range,"criteria")</p>
                      </div>
                    )}
                  </div>

                  {/* Answer status in card */}
                  {answers[currentIndex] !== undefined && (
                    <div className="mt-4 text-sm text-emerald-400 flex items-center gap-x-2">
                      ✓ Answered
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button 
                onClick={goPrev} 
                disabled={currentIndex === 0}
                className="px-6 py-3 text-sm border border-white/30 hover:bg-white/5 rounded-2xl disabled:opacity-40 flex items-center gap-x-2 transition-colors"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-x-2">
                {Object.keys(answers).length < totalQuestions ? (
                  <button 
                    onClick={goNext}
                    className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-2xl hover:bg-teal-50 transition-colors"
                  >
                    Next unanswered →
                  </button>
                ) : (
                  <button 
                    onClick={grade}
                    className="px-10 py-3 bg-white text-slate-900 font-semibold rounded-2xl flex items-center gap-x-3 hover:bg-teal-50 transition-colors"
                  >
                    Submit All Answers <span>✓</span>
                  </button>
                )}
              </div>

              <button 
                onClick={reset} 
                className="px-6 py-3 text-sm border border-white/30 hover:bg-white/5 rounded-2xl flex items-center gap-x-2 transition-colors"
              >
                Reset
              </button>
            </div>

            {Object.keys(answers).length < totalQuestions && (
              <p className="text-center text-xs text-white/50 mt-4">
                Answer all questions to unlock the full review with Caddy
              </p>
            )}
          </div>
        ) : (
          /* Review Mode - Go through each with Caddy */
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-teal-400 text-sm font-bold tracking-[1.5px] mb-2">REVIEW WITH CADDY</div>
              <h3 className="text-3xl font-semibold tracking-tight">Let's walk through your answers, Caddy</h3>
              <p className="text-slate-400 mt-2">Here's where things clicked and where we can sharpen your thinking.</p>
            </div>

            <div className="space-y-6">
              {quizQuestions.map((q, idx) => {
                const isCorrect = feedbacks[idx]?.correct;
                const userAns = answers[idx];
                let userDisplay = '—';
                if (q.type === 'mcq' && q.options) {
                  userDisplay = q.options[parseInt(String(userAns))] || '—';
                } else if (userAns) {
                  userDisplay = String(userAns);
                }

                const correctDisplay = q.type === 'mcq' && q.options 
                  ? q.options[q.answer as number] 
                  : q.answer;

                return (
                  <div key={idx} className={`rounded-3xl p-7 border ${isCorrect ? 'border-emerald-800/60 bg-emerald-950/20' : 'border-rose-800/60 bg-rose-950/20'}`}>
                    <div className="flex items-start gap-x-3">
                      <div className={`text-xs font-bold px-3 py-1 rounded-full mt-1 ${isCorrect ? 'bg-emerald-900/50 text-emerald-300' : 'bg-rose-900/50 text-rose-300'}`}>
                        {isCorrect ? 'CORRECT' : 'NEEDS WORK'}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-white/60 mb-1">QUESTION {idx + 1}</div>
                        <div className="text-xl font-medium leading-snug mb-4">
                          {renderQuestionText(q.q)}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <div className="text-white/60 text-xs mb-1">YOU ANSWERED</div>
                            <div className={`font-mono p-3 rounded-2xl ${isCorrect ? 'bg-white/10' : 'bg-rose-950/60 line-through'}`}>
                              {userDisplay}
                            </div>
                          </div>
                          <div>
                            <div className="text-white/60 text-xs mb-1">THE RIGHT ANSWER</div>
                            <div className="font-mono p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/50">
                              {renderQuestionText(String(correctDisplay))}
                            </div>
                          </div>
                        </div>

                        <div className="text-[15px] leading-relaxed text-white/90 bg-black/30 p-5 rounded-2xl">
                          {getPersonalizedFeedback(idx)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center gap-x-4">
              <button 
                onClick={reset} 
                className="px-8 py-3 border border-white/40 hover:bg-white/5 rounded-2xl font-medium"
              >
                Try Again, Caddy
              </button>
              <a 
                href="/#playground" 
                className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-2xl hover:bg-teal-50 transition-colors"
              >
                Head to the Playground for More Practice →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
