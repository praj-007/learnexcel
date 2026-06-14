import { Lesson, DatasetKey } from './types';

export const lessonData: Lesson[] = [
  {
    num: "01",
    title: "Data Aggregation & Summaries",
    content: `<p class="mb-4">Master the foundational formulas every analyst uses daily. These functions power everything from quick summaries to sophisticated conditional reporting.</p>
      <h6 class="font-semibold mt-6 mb-2">Key Formulas</h6>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li><strong>SUM / AVERAGE / COUNT</strong> — Core aggregation</li>
        <li><strong>SUMIF / COUNTIF / AVERAGEIF</strong> — Conditional logic (single criteria)</li>
        <li><strong>SUMIFS / COUNTIFS / AVERAGEIFS</strong> — Multiple criteria (Excel 2007+)</li>
        <li><strong>SUBTOTAL</strong> — Ignores hidden/filtered rows (great for filtered tables)</li>
      </ul>
      <h6 class="font-semibold mt-6 mb-2">MBA Business Context</h6>
      <p class="text-sm">You receive a raw sales export from the CRM. Your manager wants "Total revenue by region for Q3" and "Average deal size for Enterprise segment only". These formulas let you deliver the answer in under 60 seconds without Pivot Tables.</p>`,
    tryFormulas: [
      { label: "Total Revenue (All)", formula: "=SUM(F2:F15)", ds: "sales" as DatasetKey },
      { label: "Revenue - North Region", formula: "=SUMIF(A2:A15,\"North\",F2:F15)", ds: "sales" as DatasetKey },
      { label: "Deals by East Region", formula: "=COUNTIF(A2:A15,\"East\")", ds: "sales" as DatasetKey }
    ]
  },
  {
    num: "02",
    title: "Lookups & Data Retrieval",
    content: `<p class="mb-4">Stop copying and pasting between sheets. Learn to pull data dynamically from master tables — essential for building clean models and automated reports.</p>
      <h6 class="font-semibold mt-6 mb-2">Key Formulas</h6>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li><strong>VLOOKUP / HLOOKUP</strong> — Classic vertical/horizontal lookup</li>
        <li><strong>XLOOKUP</strong> — Modern replacement (Excel 365/2021)</li>
        <li><strong>INDEX + MATCH</strong> — The powerful dynamic duo (gold standard)</li>
      </ul>
      <h6 class="font-semibold mt-6 mb-2">MBA Business Context</h6>
      <p class="text-sm">You have a transaction log and a separate employee master. You need to add "Department" and "Manager" to every row for your leadership report. VLOOKUP or INDEX+MATCH solves this instantly.</p>`,
    tryFormulas: [
      { label: "Lookup Revenue for East entry", formula: "=VLOOKUP(\"East\",A2:H15,6,FALSE)", ds: "sales" as DatasetKey },
      { label: "Get Salary for E006", formula: "=VLOOKUP(\"E006\",A2:G13,4,FALSE)", ds: "hr" as DatasetKey }
    ]
  },
  {
    num: "03",
    title: "Financial Modeling",
    content: `<p class="mb-4">The formulas that separate MBA candidates who can model from those who cannot. Non-negotiable for finance, consulting, and strategy roles.</p>
      <h6 class="font-semibold mt-6 mb-2">Key Formulas</h6>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li><strong>NPV / XNPV</strong> — Discount future cash flows</li>
        <li><strong>IRR / XIRR</strong> — Project return rate</li>
        <li><strong>PMT / FV / PV / RATE / NPER</strong> — Loan & annuity calculations</li>
      </ul>
      <h6 class="font-semibold mt-6 mb-2">MBA Business Context</h6>
      <p class="text-sm">Your PE case: "Is this $500k investment in a 5-year project attractive at 12% hurdle?" Build cash flows, NPV, IRR, then sensitivity table.</p>`,
    tryFormulas: [
      { label: "Open NPV Calculator", formula: "Use the NPV calculator in Examples section", ds: "finance" as DatasetKey }
    ]
  },
  {
    num: "04",
    title: "Logical & Conditional Logic",
    content: `<p class="mb-4">Build scenario models and data quality rules that react intelligently to your numbers.</p>
      <h6 class="font-semibold mt-6 mb-2">Key Formulas</h6>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li><strong>IF / IFS / SWITCH</strong> — Branching logic</li>
        <li><strong>AND / OR / NOT</strong> — Combine conditions</li>
        <li><strong>IFERROR / IFNA</strong> — Clean error handling</li>
      </ul>`,
    tryFormulas: [
      { label: "Scenario Flag (Finance)", formula: "=IF(E3>0,\"Positive\",\"Review\")", ds: "finance" as DatasetKey }
    ]
  },
  {
    num: "05",
    title: "Text, Dates & Cleaning",
    content: `<p class="mb-4">Clean messy imports and build fiscal calendars like a pro.</p>`,
    tryFormulas: []
  },
  {
    num: "06",
    title: "Dynamic Arrays & Modern Excel",
    content: `<p class="mb-4">Build reactive dashboards without VBA or PivotTables using FILTER, SORT, UNIQUE and more (Excel 365+).</p>`,
    tryFormulas: [
      { label: "Practice COUNTIFS (proxy)", formula: "=COUNTIFS(A2:A15,\"North\",B2:B15,\"Laptop\")", ds: "sales" as DatasetKey }
    ]
  },
  {
    num: "07",
    title: "Statistical Analysis",
    content: `<p class="mb-4">CORREL, PERCENTILE, FORECAST and more for market analysis and scoring.</p>`,
    tryFormulas: []
  },
  {
    num: "08",
    title: "Visualization & Dashboards",
    content: `<p class="mb-4">Turn numbers into executive-ready stories with charts, conditional formatting and slicers.</p>`,
    tryFormulas: []
  }
];
