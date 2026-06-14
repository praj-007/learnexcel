import { Lesson, DatasetKey } from './types';

export const lessonData: Lesson[] = [
  // ==================== MODULE 01 ====================
  {
    num: "01",
    title: "Data Aggregation & Summaries",
    objective: "Confidently calculate totals, averages, and counts — with or without conditions — using the right function for the question you're asked.",
    whyItMatters: "In almost every internship, consulting case, or first job, someone will hand you a messy export and say: 'Can you quickly tell me how much revenue we made from Enterprise clients in the West last quarter?' You will either look like a hero who answers in 30 seconds, or you'll be stuck copying and pasting for an hour. These are the formulas that separate people who 'know Excel' from people who actually use it to answer real business questions.",

    concepts: [
      {
        name: "SUM, AVERAGE, COUNT (The Building Blocks)",
        simple: "These are your basic tools. SUM adds numbers. AVERAGE finds the middle. COUNT tells you how many things exist. Think of them as 'give me the total / middle / size of this pile of numbers'. No conditions yet — just the whole pile.",
        whenToUse: "When you need an overall number with no filtering. Total revenue this year. Average salary in the company. How many employees we have.",
        whenNot: "When the stakeholder says 'but only for North region' or 'only Enterprise deals'. Then you need the IF versions.",
        syntaxBreakdown: "SUM(range) → =SUM(F2:F15) adds every number in F2 to F15.",
        basicExample: "=SUM(F2:F15) gives total revenue across all regions and segments."
      },
      {
        name: "COUNTIF / SUMIF / AVERAGEIF (One Condition)",
        simple: "Add the word 'IF' when you have ONE rule. 'I want the total, but only if Region is North.' Excel looks at each row, checks your rule, and only includes the rows that pass the test. It's like having a bouncer at a club who only lets in people from one city.",
        whenToUse: "When your question contains one clear filter: 'total sales in the North', 'number of people who scored above 4', 'average deal size for Enterprise only'.",
        whenNot: "When you need two or more filters at the same time ('North AND Enterprise AND Q3'). Then COUNTIF will fail you — you need COUNTIFS.",
        syntaxBreakdown: "=SUMIF(criteria_range, criteria, sum_range)\n=COUNTIF(criteria_range, criteria)\n=AVERAGEIF(criteria_range, criteria, average_range)",
        basicExample: "=SUMIF(A2:A15, \"North\", F2:F15) → Only adds Revenue when the Region column says 'North'."
      },
      {
        name: "COUNTIFS / SUMIFS / AVERAGEIFS (Multiple Conditions)",
        simple: "The plural 'S' version is for when your question has the word 'and'. 'How many Laptop deals happened in the East region?' = two conditions on the same rows. Excel checks every row against ALL your rules before deciding whether to count or sum it. All conditions must be true for that row (AND logic).",
        whenToUse: "Any time the business question mentions more than one attribute together: 'Enterprise clients in the West', 'High performers with more than 5 years experience', 'Q3 deals over $50k'.",
        whenNot: "When you only have one filter — using COUNTIFS for a single condition is overkill and harder to read.",
        syntaxBreakdown: "=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)\n=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...)",
        basicExample: "=COUNTIFS(A2:A15,\"East\", B2:B15,\"Laptop\") → Counts rows where Region=East AND Product=Laptop."
      }
    ],

    scenarios: [
      {
        id: "s1",
        title: "Regional Revenue Report",
        context: "You are a marketing analyst. Your boss walks over and says: 'I need to know how much total revenue we generated from the North region last quarter for the board deck.'",
        question: "What is the total Revenue only for deals where Region = 'North'?",
        thinking: [
          "I need a total → I will use SUM or SUMIF",
          "But not every row — only the North ones → I need a condition",
          "The condition is on the Region column (column A)",
          "I want to add up the Revenue column (column F) when the condition is met"
        ],
        formula: "=SUMIF(A2:A15,\"North\",F2:F15)",
        dataset: "sales",
        explanation: "SUMIF is perfect here because we have exactly one condition (Region = North). The function checks each row in A, and only when it matches 'North' does it add the corresponding value from F."
      },
      {
        id: "s2",
        title: "How Many Enterprise Deals in the East?",
        context: "The sales director asks in a meeting: 'Quick question — how many deals did we close with Enterprise clients specifically in the East region? I need it for the forecast model.'",
        question: "Count the number of rows where Region is 'East' AND Segment is 'Enterprise'.",
        thinking: [
          "I need to count rows → COUNT or COUNTIF/COUNTIFS",
          "The question has two filters at the same time: East region + Enterprise segment",
          "This is 'and' logic → I need the plural version (COUNTIFS)",
          "I will check Region column first, then Segment column"
        ],
        formula: "=COUNTIFS(A2:A15,\"East\",H2:H15,\"Enterprise\")",
        dataset: "sales",
        explanation: "COUNTIF would only let you apply one rule. COUNTIFS lets you stack as many rules as you want. Every row must satisfy ALL rules to be counted. This is the most common real-world pattern."
      },
      {
        id: "s3",
        title: "Average Deal Size for SMB Only",
        context: "Finance wants to understand pricing power by segment. 'What is our average revenue per deal for SMB customers? I suspect it's lower than Enterprise.'",
        question: "Calculate the average Revenue for all deals where the Segment is 'SMB'.",
        thinking: [
          "Average of Revenue → AVERAGE or AVERAGEIF",
          "Only for one specific segment → add the IF condition",
          "Only one condition (Segment = SMB) → AVERAGEIF is enough and cleaner than AVERAGEIFS"
        ],
        formula: "=AVERAGEIF(H2:H15,\"SMB\",F2:F15)",
        dataset: "sales",
        explanation: "This is the classic single-criterion case. Using AVERAGEIFS here would work but is unnecessary. Always use the simplest tool that answers the exact question."
      }
    ],

    commonMistakes: [
      "Using SUM instead of SUMIF when the boss said 'only for North'.",
      "Using COUNTIF when you actually have two conditions (Region + Product). Result will be wrong.",
      "Putting the sum range in the wrong position in SUMIF (it must come after the criteria).",
      "Forgetting quotes around text criteria like \"North\"."
    ],

    practicePrompts: [
      { label: "Total revenue across everything", formula: "=SUM(F2:F15)", ds: "sales", hint: "Start simple — no conditions." },
      { label: "Revenue only from the North region", formula: "=SUMIF(A2:A15,\"North\",F2:F15)", ds: "sales", hint: "One condition → SUMIF" },
      { label: "How many deals were made in the East?", formula: "=COUNTIF(A2:A15,\"East\")", ds: "sales", hint: "Single filter on Region." },
      { label: "Count Enterprise deals that happened in Q3", formula: "=COUNTIFS(H2:H15,\"Enterprise\",C2:C15,\"Q3\")", ds: "sales", hint: "Two conditions → COUNTIFS" },
      { label: "Average revenue per SMB deal", formula: "=AVERAGEIF(H2:H15,\"SMB\",F2:F15)", ds: "sales", hint: "Single condition average." }
    ]
  },

  // ==================== MODULE 02 ====================
  {
    num: "02",
    title: "Lookups & Data Retrieval",
    objective: "Pull information from one table into another without copy-paste. Master both the classic VLOOKUP and the more powerful INDEX + MATCH combination.",
    whyItMatters: "Real business data almost never lives in one perfect table. You will constantly receive a list of transactions and a separate 'master' file (customers, employees, products). Your job is to combine them instantly and accurately. Doing this manually is how errors happen and hours disappear.",

    concepts: [
      {
        name: "VLOOKUP (The Classic)",
        simple: "VLOOKUP = Vertical Lookup. It looks down the first column of a table until it finds a match, then returns a value from a column to the right. Think of it as 'I have an ID, give me the name/price/department that belongs to that ID'.",
        whenToUse: "When your lookup value is in the leftmost column of your reference table, and you need data from a column to its right.",
        whenNot: "When you need to look to the left of the ID column, or when the column order might change (VLOOKUP breaks if columns are inserted).",
        syntaxBreakdown: "=VLOOKUP(lookup_value, table_array, col_index_num, FALSE)\nFALSE = exact match (almost always what you want).",
        basicExample: "=VLOOKUP(\"E006\", A2:G13, 4, FALSE) → Find employee E006 and return whatever is in the 4th column (Salary)."
      },
      {
        name: "INDEX + MATCH (The Flexible Power Tool)",
        simple: "This is the combination most pros actually use. MATCH finds the position (row number) of a value. INDEX then goes to that position in another column and returns the value. It doesn't care about left or right — it works in any direction.",
        whenToUse: "Almost always the better choice in real models. Especially when columns might move or you need to look leftward.",
        whenNot: "When you're in a huge hurry and the data is perfectly set up for VLOOKUP (rare).",
        syntaxBreakdown: "MATCH(lookup_value, lookup_range, 0) → gives you the row position\nINDEX(return_range, row_position) → gives you the value at that position",
        basicExample: "=INDEX(D2:D13, MATCH(\"E006\", A2:A13, 0)) → Find where E006 lives, then return the salary from the same row."
      }
    ],

    scenarios: [
      {
        id: "s1",
        title: "Enriching a Transaction Log with Employee Data",
        context: "You received 500 rows of expense transactions. Each row only has an Employee ID. Leadership wants the report to show the employee's Department and Job Level next to every transaction.",
        question: "For every transaction, pull the Department and Salary band from the master HR table using the EmpID.",
        thinking: [
          "I have an ID in my main table that exists in the HR master",
          "I need to bring back information that lives in another table",
          "This is a classic lookup problem",
          "I can use VLOOKUP (easy) or INDEX+MATCH (more robust)"
        ],
        formula: "=VLOOKUP(EmpID_cell, HR_table_range, 2, FALSE)   // for Department\n=INDEX(Department_range, MATCH(EmpID_cell, ID_range, 0))",
        dataset: "hr",
        explanation: "Every time you need to 'enrich' one dataset with fields from another using a common key (ID, SKU, Region code), you are doing a lookup. This is one of the top 5 most used skills in analyst roles."
      }
    ],

    commonMistakes: [
      "Using VLOOKUP and then inserting a column in the middle of the table later (everything breaks).",
      "Forgetting FALSE at the end (it does approximate match and returns wrong data).",
      "Looking up text without making sure both sides have no extra spaces."
    ],

    practicePrompts: [
      { label: "Find Salary for employee E006 using VLOOKUP", formula: "=VLOOKUP(\"E006\",A2:G13,4,FALSE)", ds: "hr", hint: "Classic VLOOKUP pattern." },
      { label: "Find Salary for E006 using INDEX + MATCH (more flexible)", formula: "=INDEX(D2:D13,MATCH(\"E006\",A2:A13,0))", ds: "hr", hint: "This is the pattern you should learn deeply." }
    ]
  },

  // ==================== MODULE 03 ====================
  {
    num: "03",
    title: "Financial Modeling",
    objective: "Build basic project valuation models and understand the time value of money using NPV and IRR.",
    whyItMatters: "Every finance, private equity, or strategy interview will ask you to build or interpret an NPV or IRR model. These formulas tell you whether a project or investment is actually creating value.",

    concepts: [
      {
        name: "NPV (Net Present Value)",
        simple: "Money today is worth more than money in the future (you could invest it). NPV discounts all future cash flows back to today's dollars and subtracts the initial investment. Positive NPV = the project creates value.",
        whenToUse: "When deciding whether to invest in a project, buy a company, or launch a new product line.",
        syntaxBreakdown: "=NPV(rate, value1, value2, ...) — rate is the discount rate (e.g. 12% = 0.12). Note: NPV assumes first value is at t=1.",
        basicExample: "NPV of future cash flows minus initial outlay at t=0."
      },
      {
        name: "IRR (Internal Rate of Return)",
        simple: "The single discount rate that makes NPV exactly zero. It's the 'break-even' return rate of the project. If IRR is higher than your required return (hurdle rate), do the project.",
        whenToUse: "When you want to express the return of a project as a percentage that you can compare to other opportunities or your cost of capital."
      }
    ],

    scenarios: [
      {
        id: "s1",
        title: "Should we invest in this 5-year project?",
        context: "Private equity case: Initial investment of $500k. The project is expected to generate the following net cash flows over 5 years. Your firm's hurdle rate is 12%.",
        question: "Is this project value-creating? What is the NPV at 12%?",
        thinking: [
          "List all cash flows in order (year 0 is negative)",
          "Use NPV function carefully (it starts discounting from year 1)",
          "Subtract the initial outlay that happens at time zero"
        ],
        formula: "=NPV(0.12, future_cashflows) - initial_investment",
        dataset: "finance",
        explanation: "This is the core of almost every DCF or investment memo you will ever write."
      }
    ],

    commonMistakes: [
      "Forgetting that NPV in Excel assumes the first cash flow occurs at the end of period 1.",
      "Using the wrong discount rate (always tie it to the risk of the project)."
    ],

    practicePrompts: [
      { label: "Calculate NPV at current discount rate (see Examples section)", formula: "Use the NPV slider in Interactive Examples", ds: "finance" }
    ]
  },

  // ==================== MODULE 04 ====================
  {
    num: "04",
    title: "Logical & Conditional Logic",
    objective: "Build formulas that make decisions: 'If this happens, do that. Otherwise do something else.' Model different business scenarios cleanly.",
    whyItMatters: "Business is full of rules: 'If profit > 200k, mark as Excellent. If between 0 and 200k, mark Positive. Otherwise flag for review.' These formulas turn raw data into actionable categories and automated scenario models.",

    concepts: [
      {
        name: "IF — The Basic Decision Maker",
        simple: "IF asks a yes/no question and returns one answer if true, another if false. It's the foundation of all logic in Excel.",
        whenToUse: "Simple either/or situations.",
        syntaxBreakdown: "=IF(logical_test, value_if_true, value_if_false)"
      },
      {
        name: "IFS — Multiple Conditions in Order",
        simple: "IFS lets you test many conditions in sequence. It stops at the first one that is true. The last condition is usually TRUE (catch-all).",
        whenToUse: "When you have 3+ scenarios (Base / Bull / Bear, Excellent / Good / Review, etc.). Much cleaner than nested IFs.",
        syntaxBreakdown: "=IFS(condition1, result1, condition2, result2, TRUE, catch_all)"
      },
      {
        name: "AND / OR — Combine Conditions",
        simple: "AND = all conditions must be true. OR = at least one condition must be true. Use these inside IF or IFS when your rule is more complex than a single test.",
        whenToUse: "When a business rule has multiple requirements (e.g. score > 4 AND experience > 5)."
      }
    ],

    scenarios: [
      {
        id: "s1",
        title: "Project Performance Flag",
        context: "You built a 5-year cash flow model. Leadership wants a quick status column: 'Excellent' if Net Cashflow > 200k, 'Positive' if > 0, otherwise 'Review Needed'.",
        question: "Automatically label each year based on its Net Cashflow performance.",
        thinking: [
          "Multiple thresholds → IFS is the cleanest tool",
          "First check the highest bar (Excellent)",
          "Then the middle bar (Positive)",
          "Everything else falls to the catch-all"
        ],
        formula: "=IFS(E3>200000,\"Excellent\",E3>0,\"Positive\",TRUE,\"Review Needed\")",
        dataset: "finance",
        explanation: "IFS reads top to bottom. The first condition that is true wins. TRUE as the last condition acts as 'else'."
      },
      {
        id: "s2",
        title: "High Performer + Experienced",
        context: "HR wants to identify 'High Potential' employees who should be fast-tracked: Performance Score > 4 AND Years of Experience > 5.",
        question: "Flag employees who meet both criteria.",
        thinking: [
          "Two conditions that must BOTH be true → use AND inside IF",
          "If either is missing → 'Standard'"
        ],
        formula: "=IF(AND(E2>4,F2>5),\"High Performer\",\"Standard\")",
        dataset: "hr",
        explanation: "AND and OR are your friends when real business rules have multiple requirements."
      }
    ],

    commonMistakes: [
      "Writing huge nested IFs instead of using IFS (unreadable and error-prone).",
      "Using OR when you actually needed AND (or vice versa)."
    ],

    practicePrompts: [
      { label: "Flag years as Excellent / Positive / Review Needed", formula: "=IFS(E3>200000,\"Excellent\",E3>0,\"Positive\",TRUE,\"Review Needed\")", ds: "finance", hint: "Perfect use case for IFS." },
      { label: "High Performer if score >4 AND experience >5", formula: "=IF(AND(E2>4,F2>5),\"High Performer\",\"Standard\")", ds: "hr" }
    ]
  },

  // Modules 05-08 — solid but shorter for now
  {
    num: "05",
    title: "Text, Dates & Cleaning",
    objective: "Clean ugly imported data and create proper date-based calculations (fiscal calendars, lead time, aging, etc.).",
    whyItMatters: "Most data you receive in the real world is dirty. Bank statements, ERP exports, CRM dumps — they all need cleaning before you can analyze them.",
    concepts: [
      { name: "TEXT, LEFT, MID, RIGHT, CONCAT", simple: "Extract or combine pieces of text. Essential for cleaning IDs, names, dates stored as text.", whenToUse: "When you need to pull the year from a date string or build clean labels.", syntaxBreakdown: "=TEXT(date,\"MMM-YYYY\"), =LEFT(cell,4), =CONCAT(A2,\" - \",B2)", basicExample: "" },
      { name: "EOMONTH, NETWORKDAYS, DATE", simple: "Move intelligently between months and count only working days.", whenToUse: "Fiscal reporting, project timelines, SLA calculations.", syntaxBreakdown: "=EOMONTH(date,1) gives last day of next month." }
    ],
    scenarios: [],
    commonMistakes: [],
    practicePrompts: []
  },
  {
    num: "06",
    title: "Dynamic Arrays & Modern Excel",
    objective: "Stop using Pivot Tables for everything. Use FILTER, SORT, UNIQUE, and TRANSPOSE to create live, formula-driven views of your data.",
    whyItMatters: "Modern Excel (365/2021) lets you build dashboards that update automatically when source data changes — no manual refresh, no VBA.",
    concepts: [
      { name: "FILTER", simple: "Returns only the rows that meet your criteria as a dynamic spill range.", whenToUse: "When you want a live filtered view without using AutoFilter or Pivot.", syntaxBreakdown: "=FILTER(array, include, [if_empty])" },
      { name: "UNIQUE + SORT", simple: "Get distinct values and sort them automatically.", whenToUse: "Creating dropdown lists, unique category reports, clean dashboards." }
    ],
    scenarios: [
      {
        id: "s1",
        title: "Live view of only Q3 deals",
        context: "You want a clean table that shows only Q3 transactions that updates the moment you add new data.",
        question: "Create a dynamic filtered table of all Q3 rows.",
        thinking: ["I don't want to copy-paste or use filters manually", "FILTER will spill the matching rows automatically"],
        formula: "=FILTER(A2:H15, C2:C15=\"Q3\")",
        dataset: "sales",
        explanation: "This is one of the biggest productivity upgrades in modern Excel."
      }
    ],
    commonMistakes: [],
    practicePrompts: []
  },
  {
    num: "07",
    title: "Statistical Analysis",
    objective: "Move beyond simple averages. Understand relationships, rank performance, and create basic forecasts using Excel's statistical functions.",
    whyItMatters: "Good analysts don't just report 'average salary is X'. They can say 'Salary and performance are correlated at 0.72' or 'Top 10% of performers are above Y'.",
    concepts: [
      { name: "CORREL & COVARIANCE", simple: "Measure how two variables move together.", whenToUse: "Marketing mix modeling, compensation analysis, risk." },
      { name: "PERCENTILE, RANK, LARGE/SMALL", simple: "Understand distribution and identify top/bottom performers.", whenToUse: "Performance reviews, outlier detection, segmentation." },
      { name: "FORECAST.LINEAR & SLOPE", simple: "Project future values based on historical relationship.", whenToUse: "Simple forecasting, what-if analysis." }
    ],
    scenarios: [],
    commonMistakes: [],
    practicePrompts: []
  },
  {
    num: "08",
    title: "Visualization & Dashboards",
    objective: "Turn numbers into clear stories using charts, conditional formatting, and clean layout principles that executives actually understand.",
    whyItMatters: "The best analysis is useless if no one can understand it in 10 seconds. Great dashboards drive decisions.",
    concepts: [
      { name: "Charts & PivotCharts", simple: "Choose the right chart for the message (not the default).", whenToUse: "Comparison, trend, composition, distribution." },
      { name: "Conditional Formatting", simple: "Make the important numbers pop automatically (red for bad, green for good, data bars, icon sets).", whenToUse: "Any table that people will actually look at." },
      { name: "Slicers & Sparklines", simple: "Interactive filters and tiny inline trend lines.", whenToUse: "Executive dashboards and one-page reports." }
    ],
    scenarios: [],
    commonMistakes: [],
    practicePrompts: []
  }
];
