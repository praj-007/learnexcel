import { QuizQuestion } from './types';

export const quizQuestions: QuizQuestion[] = [
  {
    q: "You need the total revenue only for the 'North' region. Which formula is correct?",
    type: "mcq",
    options: [
      "=SUMIF(A2:A15,\"North\",F2:F15)",
      "=SUM(F2:F15) WHERE Region=\"North\"",
      "=VLOOKUP(\"North\",F:F,1,FALSE)",
      "=AVERAGEIF(F2:F15,\"North\",A2:A15)"
    ],
    answer: 0,
    explanation: "SUMIF is the correct conditional sum. The criteria range comes first, then the criteria, then the sum range."
  },
  {
    q: "Which formula returns the salary of employee ID 'E006' from an HR table where EmpID is in column A and Salary in column D?",
    type: "mcq",
    options: [
      "=INDEX(D:D, MATCH(\"E006\",A:A,0))",
      "=VLOOKUP(\"E006\",A2:G13,4,FALSE)",
      "=HLOOKUP(\"E006\",A2:G13,4,FALSE)",
      "Both A and B work correctly"
    ],
    answer: 3,
    explanation: "Both INDEX+MATCH and VLOOKUP work here. VLOOKUP is simpler when lookup column is leftmost."
  },
  {
    q: "Write a formula that counts how many deals had more than 150 units sold (Units column = D).",
    type: "formula",
    answer: "=COUNTIF(D2:D15,\">150\")",
    explanation: "Use COUNTIF with the > operator inside quotes for numeric criteria."
  },
  {
    q: "In a 5-year project with cash flows in E2:E7 (including initial negative outlay), what formula gives the Net Present Value at 10% discount rate?",
    type: "mcq",
    options: [
      "=NPV(0.1, E3:E7) - 500000",
      "=NPV(10%, E2:E7)",
      "=XNPV(0.1, E2:E7, years_range)",
      "=SUM(E2:E7)/(1.1^5)"
    ],
    answer: 0,
    explanation: "Excel's NPV assumes the first value is at t=1. So you calculate NPV of future CFs then subtract the initial investment (at t=0)."
  },
  {
    q: "You want the average profit only for 'SMB' segment deals. Correct formula?",
    type: "formula",
    answer: "=AVERAGEIF(H2:H15,\"SMB\",G2:G15)",
    explanation: "AVERAGEIF(criteria_range, criteria, average_range). Order matters."
  },
  {
    q: "Which modern Excel function would dynamically filter the sales table to show only Q3 deals without using filters or Pivot?",
    type: "mcq",
    options: [
      "=FILTER(A2:H15, C2:C15=\"Q3\")",
      "=QUERY(A2:H15, \"where C = 'Q3'\")",
      "=UNIQUE(FILTER(...))",
      "This requires Power Query"
    ],
    answer: 0,
    explanation: "The FILTER function (Excel 365/2021) is perfect for dynamic, formula-based views of your data."
  }
];
