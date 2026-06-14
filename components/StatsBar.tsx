export default function StatsBar() {
  const stats = [
    { icon: "📚", value: "8", label: "Learning Modules" },
    { icon: "🧮", value: "28", label: "Key Formulas Covered" },
    { icon: "🗄️", value: "4", label: "Real Business Datasets" },
    { icon: "∞", value: "∞", label: "Practice in Sandbox" },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-2 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100 rounded-[20px] overflow-hidden">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white px-6 py-5 flex items-center gap-x-4">
              <div className="w-11 h-11 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl">
                {s.icon}
              </div>
              <div>
                <div className="text-3xl font-semibold tracking-tighter">{s.value}</div>
                <div className="text-xs font-medium text-slate-500 -mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
