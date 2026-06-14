'use client';

export default function Hero() {
  return (
    <div className="max-w-screen-2xl mx-auto px-8 pt-12 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-x-2 bg-white shadow-sm border border-slate-200 rounded-full px-4 py-1 mb-6">
            <span className="text-teal-600 text-xs font-bold tracking-[1.5px]">FOR MBA STUDENTS</span>
          </div>

          <h1 className="font-display text-6xl lg:text-7xl leading-[1.05] tracking-tighter font-semibold">
            Master Excel.<br />
            <span className="text-teal-600">Lead with data.</span>
          </h1>

          <p className="mt-6 max-w-lg text-xl text-slate-600">
            The interactive dashboard to learn 25+ essential Excel formulas through 
            real MBA-relevant business data from Finance, Marketing, HR &amp; Operations.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-slate-900 hover:bg-black transition-all text-white font-semibold rounded-2xl flex items-center gap-x-3 text-base shadow-lg shadow-slate-900/20"
            >
              <span>Browse Curriculum</span>
              <span aria-hidden>→</span>
            </button>
            <button
              onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 transition-all font-semibold rounded-2xl flex items-center gap-x-3 text-base"
            >
              🚀 Launch Playground
            </button>
          </div>

          <div className="flex items-center gap-x-8 mt-10">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-slate-200 border border-white rounded-full overflow-hidden ring-1 ring-slate-200">
                <img src="https://i.pravatar.cc/32?img=28" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="w-8 h-8 bg-slate-200 border border-white rounded-full overflow-hidden ring-1 ring-slate-200">
                <img src="https://i.pravatar.cc/32?img=32" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="w-8 h-8 bg-slate-200 border border-white rounded-full overflow-hidden ring-1 ring-slate-200">
                <img src="https://i.pravatar.cc/32?img=47" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">2,847</span> MBAs learning this semester
            </div>
          </div>
        </div>

        {/* Hero visual mock */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium">MBA Excel Dashboard</div>
                <div className="text-[10px] px-2 py-0.5 bg-white/10 rounded">LIVE</div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/10 rounded-2xl p-3">
                  <div className="text-emerald-400 text-xl font-semibold">$1.24M</div>
                  <div className="text-[10px] opacity-60 mt-0.5">Total Revenue</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3">
                  <div className="text-amber-400 text-xl font-semibold">+47%</div>
                  <div className="text-[10px] opacity-60 mt-0.5">Proficiency Gain</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3">
                  <div className="text-teal-400 text-xl font-semibold">28</div>
                  <div className="text-[10px] opacity-60 mt-0.5">Formulas Mastered</div>
                </div>
              </div>
              <div className="mt-4 text-[10px] text-white/50 font-mono">=SUMIF(Region,"North",Revenue) → $328k</div>
            </div>
          </div>

          <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-3 flex items-center gap-x-3">
            <div>
              <div className="text-xs text-slate-500">Avg. proficiency gain</div>
              <div className="font-semibold text-2xl text-emerald-600">+47%</div>
            </div>
            <span className="text-3xl">📈</span>
          </div>
        </div>
      </div>
    </div>
  );
}
