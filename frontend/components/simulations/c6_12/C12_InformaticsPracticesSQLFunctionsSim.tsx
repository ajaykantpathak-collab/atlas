'use client';

import React, { useMemo, useState } from 'react';

// ─── A REAL TABLE: every result below is computed from these rows, not memorised ───
type Emp = { id: string; name: string; dept: string; salary: number; comm: number | null };
const EMP: Emp[] = [
  { id: 'E1', name: 'Aarav', dept: 'SALES', salary: 42000, comm: 5000 },
  { id: 'E2', name: 'Diya', dept: 'SALES', salary: 38000, comm: null },
  { id: 'E3', name: 'Kabir', dept: 'HR', salary: 35000, comm: 3000 },
  { id: 'E4', name: 'Meera', dept: 'IT', salary: 55000, comm: 7000 },
  { id: 'E5', name: 'Rohan', dept: 'IT', salary: 48000, comm: null },
  { id: 'E6', name: 'Sara', dept: 'HR', salary: 33000, comm: 2500 },
  { id: 'E7', name: 'Vivaan', dept: 'IT', salary: 62000, comm: 8000 },
  { id: 'E8', name: 'Ishaan', dept: 'SALES', salary: 45000, comm: null },
];

const QUERIES = [
  { id: 'count_star', label: 'COUNT(*)', sql: 'SELECT COUNT(*) FROM EMP;' },
  { id: 'count_comm', label: 'COUNT(COMM)', sql: 'SELECT COUNT(COMM) FROM EMP;' },
  { id: 'sum', label: 'SUM(SALARY)', sql: 'SELECT SUM(SALARY) FROM EMP;' },
  { id: 'avg', label: 'AVG(SALARY)', sql: 'SELECT AVG(SALARY) FROM EMP;' },
  { id: 'maxmin', label: 'MAX / MIN', sql: 'SELECT MAX(SALARY), MIN(SALARY) FROM EMP;' },
  { id: 'group', label: 'GROUP BY', sql: 'SELECT DEPT, COUNT(*) FROM EMP GROUP BY DEPT;' },
  { id: 'having', label: 'GROUP BY + HAVING', sql: 'SELECT DEPT, AVG(SALARY) FROM EMP GROUP BY DEPT HAVING AVG(SALARY) > X;' },
];

export function C12_InformaticsPracticesSQLFunctionsSim() {
  const [qid, setQid] = useState('count_star');
  const [havingX, setHavingX] = useState(40000);
  const [showExec, setShowExec] = useState(true);

  // ─── MINI QUERY ENGINE: results computed from EMP every time ───
  const result = useMemo(() => {
    const depts = Array.from(new Set(EMP.map((e) => e.dept)));
    switch (qid) {
      case 'count_star':
        return { head: ['COUNT(*)'], rows: [[String(EMP.length)]], activeRows: EMP.map((e) => e.id), activeCol: null as string | null, note: 'COUNT(*) counts rows, even rows full of NULLs.' };
      case 'count_comm': {
        const n = EMP.filter((e) => e.comm !== null).length;
        return { head: ['COUNT(COMM)'], rows: [[String(n)]], activeRows: EMP.map((e) => e.id), activeCol: 'comm', note: `COUNT(column) skips NULLs: ${8 - n} employees have no commission.` };
      }
      case 'sum':
        return { head: ['SUM(SALARY)'], rows: [[EMP.reduce((s, e) => s + e.salary, 0).toLocaleString('en-IN')]], activeRows: EMP.map((e) => e.id), activeCol: 'salary', note: 'SUM ignores NULLs too -- here SALARY has none.' };
      case 'avg': {
        const avg = EMP.reduce((s, e) => s + e.salary, 0) / EMP.length;
        return { head: ['AVG(SALARY)'], rows: [[avg.toLocaleString('en-IN', { maximumFractionDigits: 2 })]], activeRows: EMP.map((e) => e.id), activeCol: 'salary', note: 'AVG = SUM / COUNT of non-null values.' };
      }
      case 'maxmin': {
        const mx = Math.max(...EMP.map((e) => e.salary));
        const mn = Math.min(...EMP.map((e) => e.salary));
        return { head: ['MAX(SALARY)', 'MIN(SALARY)'], rows: [[mx.toLocaleString('en-IN'), mn.toLocaleString('en-IN')]], activeRows: EMP.filter((e) => e.salary === mx || e.salary === mn).map((e) => e.id), activeCol: 'salary', note: 'The extreme rows light up -- MAX and MIN scan the whole column.' };
      }
      case 'group': {
        const rows = depts.map((d) => [d, String(EMP.filter((e) => e.dept === d).length)]);
        return { head: ['DEPT', 'COUNT(*)'], rows, activeRows: EMP.map((e) => e.id), activeCol: 'dept', note: 'One output row per department -- grouping squashes 8 rows into 3.' };
      }
      default: {
        const rows = depts
          .map((d) => ({ d, avg: EMP.filter((e) => e.dept === d).reduce((s, e) => s + e.salary, 0) / EMP.filter((e) => e.dept === d).length }))
          .filter((g) => g.avg > havingX)
          .map((g) => [g.d, g.avg.toLocaleString('en-IN', { maximumFractionDigits: 2 })]);
        const keep = new Set(rows.map((r) => r[0]));
        return { head: ['DEPT', 'AVG(SALARY)'], rows, activeRows: EMP.filter((e) => keep.has(e.dept)).map((e) => e.id), activeCol: 'salary', note: `HAVING filters GROUPS after aggregation (WHERE cannot see AVG). X = ${havingX.toLocaleString('en-IN')}.` };
      }
    }
  }, [qid, havingX]);

  const q = QUERIES.find((v) => v.id === qid) || QUERIES[0];
  const reset = () => {
    setQid('count_star');
    setHavingX(40000);
    setShowExec(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-400">CBSE Class 12 Informatics Practices - Querying and SQL Functions</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Aggregate Functions Stepper (live table)</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-sky-950 border border-sky-700 text-sky-300">SQL Engine</span>
      </header>

      {/* QUERY PICKER + CONTROLS */}
      <div className="flex flex-wrap gap-2 mb-3">
        {QUERIES.map((v) => (
          <button key={v.id} onClick={() => setQid(v.id)} className={`min-h-11 px-3 rounded-xl text-xs font-mono font-bold border ${qid === v.id ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className={`p-3 bg-slate-900 rounded-2xl border border-slate-800 ${qid !== 'having' ? 'opacity-50' : ''}`}>
          <label className="text-xs text-slate-400 flex justify-between">
            <span>HAVING threshold X</span>
            <span className="text-amber-300 font-mono font-bold">Rs {havingX.toLocaleString('en-IN')}</span>
          </label>
          <input type="range" min={30000} max={60000} step={1000} value={havingX} aria-label="HAVING average salary threshold"
            onChange={(e) => setHavingX(Number(e.target.value))} disabled={qid !== 'having'} className="w-full mt-2 min-h-11 accent-amber-500" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowExec(!showExec)} className={`flex-1 min-h-11 px-3 rounded-2xl text-xs font-bold border ${showExec ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            {showExec ? 'Row highlighting: ON' : 'Row highlighting: OFF'}
          </button>
          <button onClick={reset} className="min-h-11 px-4 rounded-2xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
        </div>
      </div>

      {/* SQL + TABLE + RESULT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">EMP table (8 tuples, 5 columns)</p>
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700">
                {['EID', 'NAME', 'DEPT', 'SALARY', 'COMM'].map((h) => (
                  <th key={h} className={`py-1 px-1 text-left ${result.activeCol === h.toLowerCase() ? 'text-amber-300' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EMP.map((e) => {
                const lit = showExec && result.activeRows.includes(e.id);
                return (
                  <tr key={e.id} className={`border-b border-slate-800 transition-all duration-300 ${lit ? 'bg-indigo-950/70' : 'opacity-60'}`}>
                    <td className="py-1 px-1">{e.id}</td>
                    <td className="py-1 px-1">{e.name}</td>
                    <td className={`py-1 px-1 ${result.activeCol === 'dept' && lit ? 'text-amber-300 font-bold' : ''}`}>{e.dept}</td>
                    <td className={`py-1 px-1 ${result.activeCol === 'salary' && lit ? 'text-amber-300 font-bold' : ''}`}>{e.salary.toLocaleString('en-IN')}</td>
                    <td className={`py-1 px-1 ${result.activeCol === 'comm' && lit ? 'text-amber-300 font-bold' : ''}`}>{e.comm === null ? 'NULL' : e.comm.toLocaleString('en-IN')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Query being executed</p>
            <p className="text-xs font-mono text-emerald-300 bg-slate-950 p-2 rounded-lg border border-slate-800 break-words">
              {q.sql.replace('X', havingX.toLocaleString('en-IN'))}
            </p>
            <p className="text-xs text-slate-400 mt-2">{result.note}</p>
          </div>
          <div className="bg-slate-900 rounded-2xl border border-emerald-800 p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Result ({result.rows.length} row{result.rows.length === 1 ? '' : 's'})</p>
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="text-amber-300 border-b border-slate-700">
                  {result.head.map((h) => (<th key={h} className="py-1 px-1 text-left">{h}</th>))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((r, i) => (
                  <tr key={i} className="text-emerald-200">
                    {r.map((cell, j) => (<td key={j} className="py-1 px-1">{cell}</td>))}
                  </tr>
                ))}
                {result.rows.length === 0 && (<tr><td className="py-1 px-1 text-rose-300">empty set</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mt-4 mb-3">
        <p>
          <span className="font-bold text-sky-300">Execution order:</span> FROM --&gt; WHERE --&gt; GROUP BY --&gt; HAVING --&gt; SELECT.
          <span className="font-bold text-amber-300"> Misconception killer:</span> COUNT(*) and COUNT(COMM) give different answers
          on this very table (8 vs 5) -- aggregates silently skip NULLs, and WHERE can never filter on an aggregate like AVG.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-900 border border-sky-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Run COUNT(*) then COUNT(COMM) and read the highlighted rows -- explain the 3 missing employees in terms of NULL.</p>
        <p className="mt-1">2. Use GROUP BY + HAVING and slide X from 30000 upward: which department drops out first, and at exactly what X does the result become empty?</p>
      </footer>
    </div>
  );
}

export default C12_InformaticsPracticesSQLFunctionsSim;
