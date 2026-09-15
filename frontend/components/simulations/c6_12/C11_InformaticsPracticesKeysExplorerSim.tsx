'use client';

import React, { useState } from 'react';

// ─── RELATIONAL MODEL: keys, degree, cardinality, referential integrity ───
type Student = { adm: string; name: string; aadhaar: string; house: string };
const STUDENTS: Student[] = [
  { adm: 'S01', name: 'Aarav', aadhaar: '1122-3344', house: 'Blue' },
  { adm: 'S02', name: 'Diya', aadhaar: '5566-7788', house: 'Green' },
  { adm: 'S03', name: 'Kabir', aadhaar: '9900-1122', house: 'Red' },
  { adm: 'S04', name: 'Meera', aadhaar: '3344-5566', house: 'Blue' },
  { adm: 'S05', name: 'Rohan', aadhaar: '7788-9900', house: 'Yellow' },
];
type Mark = { adm: string; subject: string; marks: number };
const MARKS: Mark[] = [
  { adm: 'S01', subject: 'IP', marks: 92 },
  { adm: 'S02', subject: 'IP', marks: 88 },
  { adm: 'S03', subject: 'IP', marks: 79 },
  { adm: 'S03', subject: 'ENG', marks: 85 },
  { adm: 'S04', subject: 'IP', marks: 95 },
];

const COLS = [
  { id: 'adm', label: 'AdmNo' },
  { id: 'name', label: 'Name' },
  { id: 'aadhaar', label: 'AadhaarNo' },
  { id: 'house', label: 'House' },
] as const;
type ColId = (typeof COLS)[number]['id'];

const keyInfo = (col: ColId): { title: string; verdict: string; tone: 'good' | 'warn' | 'bad' } => {
  switch (col) {
    case 'adm':
      return { title: 'AdmNo', verdict: 'PRIMARY KEY candidate: unique and NOT NULL for every tuple. It is the chosen identity of the row.', tone: 'good' };
    case 'aadhaar':
      return { title: 'AadhaarNo', verdict: 'CANDIDATE KEY: also unique and non-null, so it COULD have been the primary key. A relation may have several candidate keys but only one primary key.', tone: 'good' };
    case 'name':
      return { title: 'Name', verdict: 'NOT a key: two students could share a name, so it cannot uniquely identify a tuple (would need a composite key).', tone: 'warn' };
    default:
      return { title: 'House', verdict: 'NOT a key: it repeats across many tuples. Useful as an ATTRIBUTE for grouping, never for identification.', tone: 'bad' };
  }
};

export function C11_InformaticsPracticesKeysExplorerSim() {
  const [table, setTable] = useState<'students' | 'marks'>('students');
  const [col, setCol] = useState<ColId>('adm');
  const [deleted, setDeleted] = useState(false);

  const students = deleted ? STUDENTS.filter((s) => s.adm !== 'S03') : STUDENTS;
  const orphans = MARKS.filter((m) => !students.some((s) => s.adm === m.adm));
  const info = keyInfo(col);
  const toneClass = info.tone === 'good' ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' : info.tone === 'warn' ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-rose-950/60 border-rose-700 text-rose-300';

  const reset = () => {
    setTable('students');
    setCol('adm');
    setDeleted(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-400">CBSE Class 11 Informatics Practices - Database Concepts</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Keys Explorer: what makes a row unique?</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-sky-950 border border-sky-700 text-sky-300">Relational Model</span>
      </header>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setTable('students')} className={`min-h-11 px-4 rounded-xl text-xs font-bold border ${table === 'students' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>STUDENT table</button>
        <button onClick={() => setTable('marks')} className={`min-h-11 px-4 rounded-xl text-xs font-bold border ${table === 'marks' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>MARKS table</button>
        <button onClick={() => setDeleted(!deleted)} className={`min-h-11 px-4 rounded-xl text-xs font-bold border ${deleted ? 'bg-rose-950/60 border-rose-700 text-rose-300' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>
          {deleted ? 'Restore student S03' : 'Delete student S03'}
        </button>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* STUDENT TABLE */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">
            STUDENT -- degree {COLS.length} attributes, cardinality {students.length} tuples -- click a column
          </p>
          <table className="w-full text-xs font-mono">
            <thead>
              <tr>
                {COLS.map((c) => (
                  <th key={c.id}>
                    <button onClick={() => { setTable('students'); setCol(c.id); }}
                      className={`px-1.5 py-1 rounded-t border-b-2 font-mono text-[11px] transition-all ${col === c.id && table === 'students' ? 'border-amber-400 text-amber-300 bg-amber-950/40' : 'border-slate-700 text-slate-400 hover:text-slate-200'}`}>
                      {c.label}{c.id === 'adm' ? ' *' : ''}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.adm} className="border-t border-slate-800">
                  <td className="py-1 px-1.5 text-indigo-300 font-bold">{s.adm}</td>
                  <td className="py-1 px-1.5">{s.name}</td>
                  <td className="py-1 px-1.5">{s.aadhaar}</td>
                  <td className="py-1 px-1.5">{s.house}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MARKS TABLE */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">
            MARKS -- AdmNo is a FOREIGN KEY referencing STUDENT.AdmNo
          </p>
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700">
                <th className="text-left px-1.5">AdmNo (FK)</th>
                <th className="text-left px-1.5">Subject</th>
                <th className="text-left px-1.5">Marks</th>
              </tr>
            </thead>
            <tbody>
              {MARKS.map((m, i) => {
                const orphan = deleted && m.adm === 'S03';
                return (
                  <tr key={i} className={`border-t border-slate-800 transition-all duration-300 ${orphan ? 'bg-rose-950/70' : ''}`}>
                    <td className={`py-1 px-1.5 font-bold ${orphan ? 'text-rose-300' : 'text-indigo-300'}`}>{m.adm}{orphan ? ' !!' : ''}</td>
                    <td className="py-1 px-1.5">{m.subject}</td>
                    <td className="py-1 px-1.5">{m.marks}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {deleted && (
            <p className="text-[11px] text-rose-300 mt-2 font-mono">
              {orphans.length > 0
                ? `${orphans.length} MARKS row(s) reference a deleted student: referential integrity is BROKEN. A real DBMS rejects this DELETE.`
                : 'No orphan rows: the delete is safe.'}
            </p>
          )}
        </div>
      </div>

      {/* VERDICT PANEL */}
      <div className={`p-4 rounded-2xl border mb-3 ${toneClass}`}>
        <p className="text-sm font-extrabold">{table === 'marks' ? 'Foreign key check' : `Column: ${info.title}`}</p>
        <p className="text-xs mt-1">
          {table === 'marks'
            ? 'Every AdmNo in MARKS must exist in STUDENT. That single rule (referential integrity) is what stops your school report cards from pointing at ghosts. Click the STUDENT table and try the columns, or delete S03 to see the classic orphan-row disaster.'
            : info.verdict}
        </p>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p>
          <span className="font-bold text-sky-300">Vocabulary check:</span> a relation is the TABLE, a tuple is a ROW, an attribute is a
          COLUMN. Degree = number of attributes; cardinality = number of tuples.
          <span className="font-bold text-amber-300"> Misconception killer:</span> a primary key is not just &quot;the first column&quot; --
          it is ANY attribute (or attribute set) that is unique and non-null, chosen from the candidate keys.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-900 border border-sky-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Click AdmNo vs AadhaarNo in STUDENT: both pass the uniqueness test. Why does a table still declare only ONE of them as the primary key?</p>
        <p className="mt-1">2. Delete S03 and count the orphan rows in MARKS. Write the two ways a real database could have prevented this.</p>
      </footer>
    </div>
  );
}

export default C11_InformaticsPracticesKeysExplorerSim;
