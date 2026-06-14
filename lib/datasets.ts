import { Dataset, DatasetKey, ExampleChip } from './types';

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

export function getExampleChips(datasetKey: DatasetKey): ExampleChip[] {
  if (datasetKey === 'sales') {
    return [
      { label: 'Total Revenue', formula: '=SUM(F2:F15)' },
      { label: 'Avg Units (North)', formula: '=AVERAGEIF(A2:A15,"North",D2:D15)' },
      { label: 'Count East deals', formula: '=COUNTIF(A2:A15,"East")' },
      { label: 'Sum Profit by SMB', formula: '=SUMIF(H2:H15,"SMB",G2:G15)' },
      { label: 'VLOOKUP Revenue (East Laptop Q2)', formula: '=VLOOKUP("East",A2:H15,6,FALSE)' }
    ];
  }
  if (datasetKey === 'finance') {
    return [
      { label: 'Total Net Cashflow', formula: '=SUM(E2:E7)' },
      { label: 'Avg Revenue (Yr1-5)', formula: '=AVERAGE(C3:C7)' },
      { label: 'Count positive years', formula: '=COUNTIF(E2:E7,">0")' },
      { label: 'Max Cashflow Year', formula: '=MAX(E2:E7)' }
    ];
  }
  if (datasetKey === 'hr') {
    return [
      { label: 'Avg Finance Salary', formula: '=AVERAGEIF(B2:B13,"Finance",D2:D13)' },
      { label: 'High Performers (Score>4)', formula: '=COUNTIF(E2:E13,">4")' },
      { label: 'Total Salary Cost', formula: '=SUM(D2:D13)' },
      { label: 'VLOOKUP Emp E006 Salary', formula: '=VLOOKUP("E006",A2:G13,4,FALSE)' }
    ];
  }
  // ops
  return [
    { label: 'Total Inventory Value', formula: '=SUMPRODUCT(C2:C11,F2:F11)' },
    { label: 'Items below reorder', formula: '=COUNTIF(C2:C11,"<"&D2:D11)' },
    { label: 'Avg Lead Time', formula: '=AVERAGE(G2:G11)' },
    { label: 'Max Stock Electronics', formula: '=MAXIFS(C2:C11,B2:B11,"Electronics")' }
  ];
}
