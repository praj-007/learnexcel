export default function WhyExcel() {
  const reasons = [
    { icon: "📈", title: "Data-Driven Decisions", desc: "From case competitions to consulting interviews, Excel lets you analyze data faster than anyone else in the room." },
    { icon: "💰", title: "Financial Modeling", desc: "Build DCF models, LBOs, and sensitivity analyses. Recruiters in IB/PE/VC expect advanced Excel fluency." },
    { icon: "👥", title: "Cross-Functional Impact", desc: "Marketing ROI, supply chain optimization, HR analytics — one tool to speak the language of every department." },
    { icon: "🚀", title: "Career Multiplier", desc: "Top MBA grads with strong Excel skills report faster promotions and higher starting offers in analytics-heavy roles." },
  ];

  return (
    <div id="why" className="max-w-screen-2xl mx-auto px-8 pt-16 pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-teal-600 text-sm font-bold tracking-widest">THE MBA ADVANTAGE</span>
          <h2 className="section-header tracking-tighter">Why Excel is your<br />superpower in business school</h2>
        </div>
        <a href="#playground" className="hidden md:flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700">
          Jump to practice <span className="ml-2">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {reasons.map((r, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-3xl">
            <div className="w-9 h-9 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-5 text-lg">{r.icon}</div>
            <h4 className="font-semibold text-lg mb-2">{r.title}</h4>
            <p className="text-sm text-slate-600">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
