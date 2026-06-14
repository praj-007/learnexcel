import { GuidedExercise, DatasetKey } from './types';

export const guidedExercises: Record<string, GuidedExercise> = {
  'SUMIF': {
    title: "SUMIF — Regional Revenue",
    objective: "Calculate the total Revenue for all deals in the 'North' region.",
    dataset: 'sales' as DatasetKey,
    steps: [
      "Identify the criteria range (Region column → usually column A)",
      "Identify the criteria value ('North')",
      "Identify the sum range (Revenue column → usually column F)",
      "Write the formula using SUMIF"
    ],
    expectedAnswers: [
      "=SUMIF(A2:A15,\"North\",F2:F15)",
      "=sumif(a2:a15,\"north\",f2:f15)"
    ],
    solution: "=SUMIF(A2:A15,\"North\",F2:F15)",
    hint: "Remember the order: =SUMIF(criteria_range, criteria, sum_range)"
  },
  'COUNTIFS': {
    title: "COUNTIFS — Multi-criteria Count",
    objective: "Count how many Laptop deals were made in the 'East' region.",
    dataset: 'sales' as DatasetKey,
    steps: [
      "First criteria pair: Region = 'East' (column A)",
      "Second criteria pair: Product = 'Laptop' (column B)",
      "Use COUNTIFS because we have two conditions"
    ],
    expectedAnswers: [
      "=COUNTIFS(A2:A15,\"East\",B2:B15,\"Laptop\")",
      "=countifs(a2:a15,\"east\",b2:b15,\"laptop\")"
    ],
    solution: "=COUNTIFS(A2:A15,\"East\",B2:B15,\"Laptop\")",
    hint: "COUNTIFS uses pairs: criteria_range1, criteria1, criteria_range2, criteria2, ..."
  },
  'INDEXMATCH': {
    title: "INDEX + MATCH — Flexible Lookup",
    objective: "Find the Salary of employee ID 'E006' using INDEX + MATCH (more flexible than VLOOKUP).",
    dataset: 'hr' as DatasetKey,
    steps: [
      "Use MATCH to find the row number of 'E006' in the EmpID column (column A)",
      "Use INDEX to return the value from the Salary column (column D) at that row number"
    ],
    expectedAnswers: [
      "=INDEX(D2:D13,MATCH(\"E006\",A2:A13,0))",
      "=index(d2:d13,match(\"e006\",a2:a13,0))"
    ],
    solution: "=INDEX(D2:D13,MATCH(\"E006\",A2:A13,0))",
    hint: "INDEX(return_range, MATCH(lookup_value, lookup_range, 0))"
  },
  'SUMPRODUCT': {
    title: "SUMPRODUCT — Conditional Weighted Sum",
    objective: "Calculate total Revenue only for deals in the North region using SUMPRODUCT.",
    dataset: 'sales' as DatasetKey,
    steps: [
      "Create a condition that checks if Region = 'North' → returns TRUE/FALSE array",
      "Multiply that array by the Revenue column",
      "SUMPRODUCT automatically sums only the matching values"
    ],
    expectedAnswers: [
      "=SUMPRODUCT((A2:A15=\"North\")*(F2:F15))",
      "=sumproduct((a2:a15=\"north\")*(f2:f15))"
    ],
    solution: "=SUMPRODUCT((A2:A15=\"North\")*(F2:F15))",
    hint: "SUMPRODUCT is powerful for conditional logic without needing COUNTIFS/SUMIFS in some cases"
  },
  'IFSCENARIOS': {
    title: "IF / IFS — Scenario Flagging",
    objective: "Using the Finance dataset, label years based on Net Cashflow: 'Excellent' if > 200,000, 'Positive' if > 0, otherwise 'Review Needed'.",
    dataset: 'finance' as DatasetKey,
    steps: [
      "Use IFS (preferred in modern Excel) for multiple conditions",
      "Condition 1: If NetCashflow (column E) > 200000 → return \"Excellent\"",
      "Condition 2: If NetCashflow > 0 → return \"Positive\"",
      "Final catch-all: Use TRUE → return \"Review Needed\""
    ],
    expectedAnswers: [
      "=IFS(E3>200000,\"Excellent\",E3>0,\"Positive\",TRUE,\"Review Needed\")",
      "=ifs(e3>200000,\"excellent\",e3>0,\"positive\",true,\"review needed\")"
    ],
    solution: "=IFS(E3>200000,\"Excellent\",E3>0,\"Positive\",TRUE,\"Review Needed\")",
    hint: "IFS checks conditions in order. TRUE as the last condition acts as 'else'."
  },
  'VLOOKUP': {
    title: "VLOOKUP — Classic Data Lookup",
    objective: "Using the HR dataset, find the Salary of employee 'E006' using VLOOKUP.",
    dataset: 'hr' as DatasetKey,
    steps: [
      "Identify the lookup value ('E006')",
      "Define the table array (A2:G13)",
      "Specify the column index number for Salary (column 4)",
      "Use FALSE for exact match"
    ],
    expectedAnswers: [
      "=VLOOKUP(\"E006\",A2:G13,4,FALSE)",
      "=vlookup(\"e006\",a2:g13,4,false)"
    ],
    solution: "=VLOOKUP(\"E006\",A2:G13,4,FALSE)",
    hint: "VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])"
  },
  'AVERAGEIF': {
    title: "AVERAGEIF — Conditional Average",
    objective: "Calculate average salary in the Finance department using the HR data.",
    dataset: 'hr' as DatasetKey,
    steps: [
      "Criteria range is Department column (B)",
      "Criteria value is 'Finance'",
      "Average range is the Salary column (D)"
    ],
    expectedAnswers: [
      "=AVERAGEIF(B2:B13,\"Finance\",D2:D13)",
      "=averageif(b2:b13,\"finance\",d2:d13)"
    ],
    solution: "=AVERAGEIF(B2:B13,\"Finance\",D2:D13)",
    hint: "AVERAGEIF(criteria_range, criteria, average_range)"
  }
};
