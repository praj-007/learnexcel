import { Dataset } from './types';

function colLetterToIndex(letter: string): number {
  return letter.toUpperCase().charCodeAt(0) - 65;
}

function parseCellRef(ref: string): { col: number; row: number } | null {
  const match = ref.match(/([A-Z]+)(\d+)/);
  if (!match) return null;
  return {
    col: colLetterToIndex(match[1]),
    row: parseInt(match[2]) - 2
  };
}

function getRangeValues(rangeStr: string, data: Dataset): number[] {
  const match = rangeStr.match(/([A-Z]+)(\d+)?:([A-Z]+)(\d+)?/);
  if (!match) return [];

  const startCol = colLetterToIndex(match[1]);
  let startRow = match[2] ? parseInt(match[2]) - 2 : 0;
  const endCol = colLetterToIndex(match[3]);
  let endRow = match[4] ? parseInt(match[4]) - 2 : data.rows.length - 1;

  if (startCol !== endCol) {
    // Prototype limitation: single column ranges only
  }

  const values: number[] = [];
  for (let r = Math.max(0, startRow); r <= Math.min(data.rows.length - 1, endRow); r++) {
    const val = data.rows[r][startCol];
    const num = parseFloat(String(val));
    if (!isNaN(num)) values.push(num);
  }
  return values;
}

export function evaluateFormula(input: string, currentData: Dataset): { result: string | number; error?: string } {
  const trimmed = input.trim();
  if (!trimmed.startsWith('=')) {
    return { result: '—', error: 'Formula must start with =' };
  }

  const formula = trimmed.slice(1).toUpperCase().trim();

  try {
    // Basic aggregates
    if (formula.startsWith('SUM(')) {
      const range = formula.match(/SUM\(([^)]+)\)/)?.[1] || '';
      const values = getRangeValues(range, currentData);
      const res = values.reduce((a, b) => a + b, 0);
      return { result: res };
    }
    if (formula.startsWith('AVERAGE(')) {
      const range = formula.match(/AVERAGE\(([^)]+)\)/)?.[1] || '';
      const values = getRangeValues(range, currentData);
      const res = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      return { result: res };
    }
    if (formula.startsWith('COUNT(')) {
      const range = formula.match(/COUNT\(([^)]+)\)/)?.[1] || '';
      const values = getRangeValues(range, currentData);
      return { result: values.length };
    }
    if (formula.startsWith('MAX(')) {
      const range = formula.match(/MAX\(([^)]+)\)/)?.[1] || '';
      const values = getRangeValues(range, currentData);
      return { result: Math.max(...values) };
    }
    if (formula.startsWith('MIN(')) {
      const range = formula.match(/MIN\(([^)]+)\)/)?.[1] || '';
      const values = getRangeValues(range, currentData);
      return { result: Math.min(...values) };
    }

    // SUMIF / COUNTIF / AVERAGEIF + multi variants
    if (
      formula.startsWith('SUMIF(') || formula.startsWith('COUNTIF(') || formula.startsWith('AVERAGEIF(') ||
      formula.startsWith('SUMIFS(') || formula.startsWith('COUNTIFS(') || formula.startsWith('AVERAGEIFS(')
    ) {
      const isMulti = formula.includes('IFS(');
      const funcName = formula.split('(')[0];

      if (isMulti) {
        const argsStr = formula.match(/\((.*)\)/)?.[1] || '';
        const rawArgs = argsStr.split(',').map(a => a.trim().replace(/["']/g, ''));

        if (rawArgs.length < 2 || rawArgs.length % 2 !== 0) {
          throw new Error(`${funcName} requires criteria_range + criteria pairs`);
        }

        const criteriaPairs: { range: string; crit: string | number }[] = [];
        for (let i = 0; i < rawArgs.length - (funcName.includes('COUNTIFS') ? 0 : 1); i += 2) {
          let crit: string | number = rawArgs[i + 1];
          const numCrit = parseFloat(String(crit));
          if (!isNaN(numCrit)) crit = numCrit;
          criteriaPairs.push({ range: rawArgs[i], crit });
        }

        let valueRangeStr: string | null = null;
        if (funcName.includes('SUMIFS') || funcName.includes('AVERAGEIFS')) {
          valueRangeStr = rawArgs[rawArgs.length - 1];
        }

        let matchCount = 0;
        let total = 0;

        for (let r = 0; r < currentData.rows.length; r++) {
          let rowMatches = true;
          for (const pair of criteriaPairs) {
            const colIdx = parseCellRef(pair.range.split(':')[0])?.col ?? 0;
            const cellVal = currentData.rows[r][colIdx];
            const crit = pair.crit;
            let matchesThis = false;
            if (typeof crit === 'number') {
              matchesThis = parseFloat(String(cellVal)) === crit;
            } else {
              matchesThis = String(cellVal).toUpperCase() === String(crit).toUpperCase();
            }
            if (!matchesThis) {
              rowMatches = false;
              break;
            }
          }
          if (rowMatches) {
            matchCount++;
            if (valueRangeStr && (funcName.includes('SUMIFS') || funcName.includes('AVERAGEIFS'))) {
              const valCol = parseCellRef(valueRangeStr.split(':')[0])?.col ?? 0;
              total += parseFloat(String(currentData.rows[r][valCol])) || 0;
            }
          }
        }

        if (funcName.includes('COUNTIFS')) return { result: matchCount };
        if (funcName.includes('SUMIFS')) return { result: total };
        if (funcName.includes('AVERAGEIFS')) return { result: matchCount > 0 ? total / matchCount : 0 };
      } else {
        // Single criteria
        let argsMatch;
        if (funcName === 'SUMIF') argsMatch = formula.match(/SUMIF\(([^,]+),\s*["']?([^"']+)["']?\s*,\s*([^)]+)\)/);
        else if (funcName === 'COUNTIF') argsMatch = formula.match(/COUNTIF\(([^,]+),\s*["']?([^"']+)["']?\s*\)/);
        else if (funcName === 'AVERAGEIF') argsMatch = formula.match(/AVERAGEIF\(([^,]+),\s*["']?([^"']+)["']?\s*,\s*([^)]+)\)/);

        if (!argsMatch) throw new Error(`Invalid ${funcName} syntax`);

        const critRangeStr = argsMatch[1];
        let criteria: string | number = argsMatch[2];
        const valueRangeStr = argsMatch[3] || null;

        const numCriteria = parseFloat(String(criteria));
        if (!isNaN(numCriteria)) criteria = numCriteria;

        const critRef = parseCellRef(critRangeStr.split(':')[0]);
        if (!critRef) throw new Error('Bad criteria range');

        const critCol = critRef.col;
        const startRow = Math.max(0, critRef.row);
        const endRow = Math.min(currentData.rows.length - 1, parseCellRef(critRangeStr.split(':')[1] || critRangeStr.split(':')[0])?.row || currentData.rows.length - 1);

        let total = 0;
        let matches = 0;

        for (let r = startRow; r <= endRow; r++) {
          const cellVal = currentData.rows[r][critCol];
          let isMatch = false;
          if (typeof criteria === 'number') {
            isMatch = parseFloat(String(cellVal)) === criteria;
          } else {
            isMatch = String(cellVal).toUpperCase() === String(criteria).toUpperCase();
          }
          if (isMatch) {
            matches++;
            if (valueRangeStr && (funcName === 'SUMIF' || funcName === 'AVERAGEIF')) {
              const valCol = parseCellRef(valueRangeStr.split(':')[0])?.col ?? 0;
              total += parseFloat(String(currentData.rows[r][valCol])) || 0;
            }
          }
        }

        if (funcName === 'COUNTIF') return { result: matches };
        if (funcName === 'SUMIF') return { result: total };
        if (funcName === 'AVERAGEIF') return { result: matches > 0 ? total / matches : 0 };
      }
    }

    // VLOOKUP simplified
    if (formula.startsWith('VLOOKUP(')) {
      const args = formula.match(/VLOOKUP\(([^,]+),\s*([^,]+),\s*(\d+)(?:,\s*(FALSE|TRUE))?\)/);
      if (!args) throw new Error('Invalid VLOOKUP syntax. Example: =VLOOKUP("North", A2:H15, 6, FALSE)');

      let lookupVal = args[1].replace(/["']/g, '').trim();
      const tableRange = args[2];
      const colIdx = parseInt(args[3]) - 1;

      const startCell = parseCellRef(tableRange.split(':')[0]);
      if (!startCell) throw new Error('Bad table range');

      let found: string | number | null = null;
      for (let r = startCell.row; r < currentData.rows.length; r++) {
        if (String(currentData.rows[r][startCell.col]).toUpperCase() === String(lookupVal).toUpperCase()) {
          found = currentData.rows[r][colIdx];
          break;
        }
      }
      return { result: found !== null ? found : '#N/A' };
    }

    return { 
      result: '—', 
      error: 'Unsupported formula. Try: SUM, AVERAGE, COUNT, MAX, MIN, SUMIF/COUNTIF/AVERAGEIF, SUMIFS/COUNTIFS/AVERAGEIFS, VLOOKUP' 
    };
  } catch (e: any) {
    return { result: 'Error', error: e.message || 'Error evaluating formula' };
  }
}

export function formatResult(result: string | number): string {
  if (typeof result === 'number') {
    return result.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  return String(result);
}
