import { Dataset, DatasetKey } from './types';

export const datasets: Record<DatasetKey, Dataset> = {
  sales: {
    name: 'Sales & Marketing Performance',
    description: '14 rows • Regional consumer electronics sales data — ideal for conditional aggregations and lookups',
    headers: ['Region', 'Product', 'Quarter', 'Units', 'UnitPrice', 'Revenue', 'Profit', 'Segment'],
    rows: [
      ['North', 'Laptop', 'Q3', 107, 399, 42693, 10346, 'Enterprise'],
      ['North', 'Headphones', 'Q1', 52, 299, 15548, 3964, 'Consumer'],
      ['North', 'Smartphone', 'Q4', 101, 699, 70599, 22188, 'Enterprise'],
      ['South', 'Headphones', 'Q3', 116, 399, 46284, 11777, 'SMB'],
      ['North', 'Laptop', 'Q4', 69, 599, 41331, 14697, 'Consumer'],
      ['East', 'Laptop', 'Q4', 182, 299, 54418, 20445, 'SMB'],
      ['North', 'Tablet', 'Q3', 192, 399, 76608, 25490, 'Enterprise'],
      ['South', 'Tablet', 'Q1', 263, 399, 104937, 37634, 'SMB'],
      ['East', 'Headphones', 'Q3', 86, 599, 51514, 14261, 'Consumer'],
      ['East', 'Laptop', 'Q2', 181, 1299, 235119, 60936, 'SMB'],
      ['West', 'Tablet', 'Q2', 220, 599, 131780, 46763, 'Enterprise'],
      ['South', 'Laptop', 'Q3', 147, 599, 88053, 20304, 'Consumer'],
      ['East', 'Smartphone', 'Q4', 146, 1299, 189654, 55648, 'SMB'],
      ['South', 'Smartphone', 'Q3', 236, 999, 235764, 68030, 'Consumer']
    ]
  },
  finance: {
    name: 'Project Cash Flow Analysis',
    description: '6 rows • 5-year investment project cash flows — perfect for NPV and financial modeling practice',
    headers: ['Year', 'InitialOutlay', 'Revenue', 'OpEx', 'NetCashflow', 'Cumulative'],
    rows: [
      [0, -500000, 0, 0, -500000, -500000],
      [1, 0, 185000, 65000, 120000, -380000],
      [2, 0, 265000, 82000, 183000, -197000],
      [3, 0, 340000, 95000, 245000, 48000],
      [4, 0, 410000, 105000, 305000, 353000],
      [5, 0, 380000, 88000, 292000, 645000]
    ]
  },
  hr: {
    name: 'HR Talent & Compensation',
    description: '12 rows • Employee data across departments — great for AVERAGEIF, COUNTIFS and VLOOKUP',
    headers: ['EmpID', 'Department', 'RoleLevel', 'Salary', 'PerfScore', 'YearsExp', 'AttritionRisk'],
    rows: [
      ['E001', 'Finance', 'Senior', 115000, 4.2, 7, 'Low'],
      ['E002', 'Marketing', 'Mid', 82000, 3.8, 4, 'Medium'],
      ['E003', 'Operations', 'Senior', 98000, 4.5, 9, 'Low'],
      ['E004', 'Finance', 'Mid', 76500, 3.1, 3, 'High'],
      ['E005', 'HR', 'Senior', 92000, 4.0, 6, 'Low'],
      ['E006', 'Marketing', 'Senior', 108000, 4.7, 8, 'Low'],
      ['E007', 'Operations', 'Mid', 71000, 3.5, 5, 'Medium'],
      ['E008', 'Finance', 'Junior', 62000, 4.1, 2, 'Low'],
      ['E009', 'HR', 'Mid', 74500, 3.3, 4, 'High'],
      ['E010', 'Marketing', 'Mid', 85500, 3.9, 5, 'Medium'],
      ['E011', 'Operations', 'Senior', 102500, 4.3, 7, 'Low'],
      ['E012', 'Finance', 'Senior', 125000, 4.6, 11, 'Low']
    ]
  },
  ops: {
    name: 'Supply Chain & Inventory',
    description: '10 rows • Inventory & supplier data — useful for conditional counts and cost analysis',
    headers: ['SKU', 'Category', 'Stock', 'ReorderPoint', 'UnitCost', 'Supplier', 'LeadTimeDays'],
    rows: [
      ['SKU-101', 'Electronics', 245, 80, 189, 'TechSupply Co.', 12],
      ['SKU-204', 'Accessories', 890, 300, 24, 'GlobalParts Ltd', 5],
      ['SKU-305', 'Electronics', 67, 50, 445, 'TechSupply Co.', 18],
      ['SKU-412', 'Peripherals', 320, 150, 67, 'FastShip Inc.', 4],
      ['SKU-519', 'Accessories', 1250, 400, 19, 'GlobalParts Ltd', 7],
      ['SKU-633', 'Electronics', 92, 60, 312, 'PrimeComponents', 22],
      ['SKU-708', 'Peripherals', 410, 180, 55, 'FastShip Inc.', 3],
      ['SKU-811', 'Accessories', 680, 250, 31, 'GlobalParts Ltd', 6],
      ['SKU-922', 'Electronics', 155, 90, 278, 'PrimeComponents', 15],
      ['SKU-1033', 'Peripherals', 290, 120, 82, 'FastShip Inc.', 5]
    ]
  }
};

export interface QuickExample {
  label: string;        // Natural language business question
  formula: string;
  thinking: string[];   // Step-by-step thinking explanation
  func: string;         // Function category for filtering/display
}

export function getExampleChips(datasetKey: DatasetKey): QuickExample[] {
  if (datasetKey === 'sales') {
    return [
      {
        label: "What is our total revenue across all deals?",
        formula: "=SUM(F2:F15)",
        thinking: [
          "I need a grand total of one column → use SUM",
          "No conditions or filters mentioned → plain SUM on the Revenue column",
          "Identify the range F2:F15 which contains all revenue values"
        ],
        func: "SUM"
      },
      {
        label: "How much revenue came only from the North region?",
        formula: "=SUMIF(A2:A15,\"North\",F2:F15)",
        thinking: [
          "The question has one filter: only North region",
          "I need to sum Revenue, but only when Region matches 'North'",
          "Use SUMIF: criteria range (Region column A), the criteria (\"North\"), then the sum range (Revenue F)"
        ],
        func: "SUMIF"
      },
      {
        label: "How many deals happened in the East region?",
        formula: "=COUNTIF(A2:A15,\"East\")",
        thinking: [
          "I need to count the number of rows that match one condition",
          "The condition is on the Region column (A)",
          "COUNTIF is the right tool for counting with a single criteria"
        ],
        func: "COUNTIF"
      },
      {
        label: "What is the average revenue per deal for only SMB customers?",
        formula: "=AVERAGEIF(H2:H15,\"SMB\",F2:F15)",
        thinking: [
          "I need an average (not total or count)",
          "Only for one segment: SMB",
          "AVERAGEIF with criteria range = Segment (H), criteria = \"SMB\", average range = Revenue (F)"
        ],
        func: "AVERAGEIF"
      },
      {
        label: "Count how many Laptop deals were made specifically in the East region",
        formula: "=COUNTIFS(A2:A15,\"East\",B2:B15,\"Laptop\")",
        thinking: [
          "The question has TWO conditions at the same time (East AND Laptop)",
          "Single condition functions like COUNTIF won't work",
          "Use COUNTIFS and pair each criteria range with its value: Region + \"East\", then Product + \"Laptop\""
        ],
        func: "COUNTIFS"
      },
      {
        label: "What is the total Profit only for Enterprise deals in Q3?",
        formula: "=SUMIFS(G2:G15,A2:A15,\"Enterprise\",C2:C15,\"Q3\")",
        thinking: [
          "Need total of Profit (column G)",
          "Two filters: Segment must be Enterprise AND Quarter must be Q3",
          "SUMIFS(sum_range, criteria1_range, criteria1, criteria2_range, criteria2)"
        ],
        func: "SUMIFS"
      },
      {
        label: "What was the Revenue for the East region using a lookup?",
        formula: "=VLOOKUP(\"East\",A2:H15,6,FALSE)",
        thinking: [
          "I have a key value (East) and want to pull a value from the same table",
          "VLOOKUP looks down the first column for a match",
          "Then returns the value from column 6 (Revenue) in that row. FALSE = exact match"
        ],
        func: "VLOOKUP"
      },
      {
        label: "Calculate total Revenue for North using SUMPRODUCT as alternative",
        formula: "=SUMPRODUCT((A2:A15=\"North\")*(F2:F15))",
        thinking: [
          "SUMPRODUCT can do conditional sums without IF",
          "Create a true/false array for Region = \"North\"",
          "Multiply that array by the Revenue values (true becomes 1, false 0)",
          "SUMPRODUCT automatically sums only the matching values"
        ],
        func: "SUMPRODUCT"
      }
    ];
  }

  if (datasetKey === 'finance') {
    return [
      {
        label: "What is the total net cash flow over the entire project?",
        formula: "=SUM(E2:E7)",
        thinking: ["Simple total of the NetCashflow column E", "No filters needed"],
        func: "SUM"
      },
      {
        label: "What is the average yearly revenue across the 5 years?",
        formula: "=AVERAGE(C3:C7)",
        thinking: ["Need average of Revenue column", "Skip the year 0 row which has 0 revenue"],
        func: "AVERAGE"
      },
      {
        label: "How many years had positive net cash flow?",
        formula: "=COUNTIF(E2:E7,\">0\")",
        thinking: [
          "Count rows where NetCashflow is greater than zero",
          "Use COUNTIF with the greater-than operator inside quotes"
        ],
        func: "COUNTIF"
      },
      {
        label: "What was the highest net cash flow in any single year?",
        formula: "=MAX(E2:E7)",
        thinking: ["Find the maximum value in the NetCashflow column"],
        func: "MAX"
      },
      {
        label: "Label each year: Excellent if >200k, Positive if >0, else Review Needed",
        formula: "=IFS(E3>200000,\"Excellent\",E3>0,\"Positive\",TRUE,\"Review Needed\")",
        thinking: [
          "Multiple thresholds → use IFS",
          "Test conditions in order from strictest to loosest",
          "Use TRUE as the final catch-all condition"
        ],
        func: "IFS"
      }
    ];
  }

  if (datasetKey === 'hr') {
    return [
      {
        label: "What is the average salary in the Finance department?",
        formula: "=AVERAGEIF(B2:B13,\"Finance\",D2:D13)",
        thinking: [
          "Need average salary",
          "Only for rows where Department = Finance",
          "AVERAGEIF(criteria_range, criteria, average_range)"
        ],
        func: "AVERAGEIF"
      },
      {
        label: "How many employees are high performers (score above 4)?",
        formula: "=COUNTIF(E2:E13,\">4\")",
        thinking: ["Count rows where PerfScore (column E) is greater than 4"],
        func: "COUNTIF"
      },
      {
        label: "What is the total salary cost for the entire team?",
        formula: "=SUM(D2:D13)",
        thinking: ["Simple sum of the Salary column"],
        func: "SUM"
      },
      {
        label: "Look up the salary for employee ID E006",
        formula: "=VLOOKUP(\"E006\",A2:G13,4,FALSE)",
        thinking: [
          "Find the row with EmpID E006",
          "Return the value from column 4 (Salary)",
          "Use FALSE for exact match"
        ],
        func: "VLOOKUP"
      },
      {
        label: "Find salary for E006 using the more flexible INDEX + MATCH",
        formula: "=INDEX(D2:D13,MATCH(\"E006\",A2:A13,0))",
        thinking: [
          "First use MATCH to find the position of E006 in the ID column",
          "Then use INDEX to retrieve the salary from the same row in the salary column",
          "This approach works even if the lookup column is not on the left"
        ],
        func: "INDEX+MATCH"
      },
      {
        label: "Count employees who are Senior AND have Low attrition risk",
        formula: "=COUNTIFS(C2:C13,\"Senior\",G2:G13,\"Low\")",
        thinking: [
          "Two conditions that must both be true",
          "COUNTIFS for multiple criteria",
          "RoleLevel column + \"Senior\", then AttritionRisk column + \"Low\""
        ],
        func: "COUNTIFS"
      }
    ];
  }

  // ops dataset
  return [
    {
      label: "What is the total value of current inventory?",
      formula: "=SUMPRODUCT(C2:C11,F2:F11)",
      thinking: [
        "Need to multiply stock by unit cost for each item, then sum",
        "SUMPRODUCT handles the array multiplication and summing in one step"
      ],
      func: "SUMPRODUCT"
    },
    {
      label: "How many items are below their reorder point?",
      formula: "=COUNTIF(C2:C11,\"<\"&D2:D11)",
      thinking: ["Count rows where Stock is less than the ReorderPoint for that row"],
      func: "COUNTIF"
    },
    {
      label: "What is the average lead time across all suppliers?",
      formula: "=AVERAGE(G2:G11)",
      thinking: ["Simple average of the LeadTimeDays column"],
      func: "AVERAGE"
    },
    {
      label: "What is the maximum stock level for Electronics items only?",
      formula: "=MAXIFS(C2:C11,B2:B11,\"Electronics\")",
      thinking: [
        "Find the max stock, but only among Electronics category",
        "MAXIFS(max_range, criteria_range, criteria)"
      ],
      func: "MAXIFS"
    },
    {
      label: "Calculate total inventory value for items from TechSupply Co.",
      formula: "=SUMIF(F2:F11,\"TechSupply Co.\",C2:C11*F2:F11)",
      thinking: [
        "Filter by supplier, then sum (stock * unit cost)",
        "Can combine SUMIF thinking with array math"
      ],
      func: "SUMIF"
    }
  ];
}
