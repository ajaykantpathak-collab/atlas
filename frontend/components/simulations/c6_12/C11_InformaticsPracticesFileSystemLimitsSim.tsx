'use client';
/**
 * C11_InformaticsPracticesFileSystemLimitsSim (Class 11 Informatics Practices)
 *
 * ELI5: A school keeps Diya's address in THREE flat files: attendance.dat,
 * fees.dat, exam.dat. Move her house in file mode and only ONE copy updates --
 * the others quietly go stale (redundancy -> inconsistency). Switch to a DBMS
 * and the fact lives ONCE: one UPDATE, every view agrees, queries become one
 * line of SQL instead of three hand-scans.
 */
import React, { useState } from 'react';

// ─── Knowledge-graph node wiring ───
const NODE_C11_CS_039 = 'c11_cs_039'; // Database management systems - DBMS concepts, schema, instances
const NODE_C11_CS_040 = 'c11_cs_040'; // Relational database - tables, keys, constraints
export const ALL_NODE_IDS = [NODE_C11_CS_039, NODE_C11_CS_040];

const FILES = ['attendance.dat', 'fees.dat', 'exam.dat'];
const REC_BYTES = 64;

export function C11_InformaticsPracticesFileSystemLimitsSim() {
  const [mode, setMode] = useState<'file' | 'db'>('file');
  const [copies, setCopies] = useState<string[]>(['12 MG Road', '12 MG Road', '12 MG Road']);
  const [kabir, setKabir] = useState(false);
  const [renamed, setRenamed] = useState(false);
  const [moves, setMoves] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const distinct = new Set(mode === 'db' ? [copies[2]] : copies).size;
  const mismatches = mode === 'db' ? 0 : distinct - 1;
  const factCopies = mode === 'db' ? 1 : 3;
  const students = kabir ? 2 : 1;
  const storageKB = (students * REC_BYTES * factCopies) / 1024;
  const writesPerChange = mode === 'db' ? 1 : 3;
  const queryMs = mode === 'db' ? 2 : FILES.length * 120;
  const answers = mode === 'db' ? [copies[2]] : copies;

  const say = (s: string) => setLog((l) => [s, ...l].slice(0, 3));
  const move = () => {
    const next = '48 Civil Lines';
    setMoves((mv) => mv + 1);
    if (mode === 'file') {
      setCopies((c) => [c[0], c[1], next]); // only the exam program got the memo
      say(`Move #${moves + 1}: exam.dat updated to "${next}". attendance.dat and fees.dat still say "${copies[0]}". Stale copies: 2.`);
    } else {
      setCopies((c) => [next, next, next]);
      say(`One UPDATE STUDENT SET addr='48 Civil Lines'. Every view now reads the same fact.`);
    }
  };
  const admit = () => {
    if (kabir) return;
    setKabir(true);
    say(mode === 'file' ? 'New admission: Kabir written into all 3 files (3 records, same fact duplicated).' : 'New admission: INSERT adds Kabir once. Storage grows by one row, not three.');
  };
  const query = () => {
    say(mode === 'file'
      ? `Office query: WHERE does Diya live? Scanned 3 files in ${(queryMs / 1000).toFixed(2)} s -- answers disagree!`
      : `SELECT addr FROM STUDENT WHERE name='Diya' -> 1 row in ${queryMs} ms.`);
  };
  const reset = () => { setCopies(['12 MG Road', '12 MG Road', '12 MG Road']); setKabir(false); setMoves(0); setLog([]); setRenamed(false); };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-400">CBSE Class 11 IP - Database Concepts</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Three Flat Files vs One Database</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs text-slate-400">Storage mode:</span>
        <div className="flex rounded-xl overflow-hidden border border-slate-700">
          <button onClick={() => { setMode('file'); say('Flat files: every program keeps its own copy of the data.'); }}
            className={`min-h-11 px-4 text-xs font-bold transition-all ${mode === 'file' ? 'bg-rose-700 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>Flat files</button>
          <button onClick={() => { setMode('db'); setCopies((c) => [c[2], c[2], c[2]]); say('DBMS: the fact now lives ONCE. All stale copies collapsed into one shared truth.'); }}
            className={`min-h-11 px-4 text-xs font-bold transition-all ${mode === 'db' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>DBMS</button>
        </div>
        <button onClick={move} className="min-h-11 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold transition-all">Diya moves house</button>
        <button onClick={admit} disabled={kabir} className="min-h-11 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-bold disabled:opacity-40 transition-all">New admission: Kabir</button>
        <button onClick={query} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-all">Office query: Diya&apos;s address?</button>
        <button onClick={() => { setRenamed((r) => !r); say(mode === 'file' ? 'exam.dat column renamed addr -> address. The other two programs were never told...' : 'ALTER TABLE STUDENT RENAME addr TO address. Metadata lives in the DBMS; every view keeps working.'); }}
          className={`min-h-11 px-4 rounded-xl text-xs font-bold border transition-all ${renamed ? 'bg-amber-700 border-amber-500 text-white' : 'bg-slate-800 hover:bg-slate-700 border-slate-700'}`}>
          Rename column addr {'>'} address
        </button>
      </div>

      {renamed && (
        <div className={`p-3 rounded-2xl border text-xs mb-3 ${mode === 'file' ? 'bg-rose-950/40 border-rose-800 text-rose-200' : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'}`}>
          {mode === 'file'
            ? 'Program-data dependence: attendance and fees programs read column "addr" and CRASH -- the file layout changed underneath them. Each program is welded to its own file format.'
            : 'Under a DBMS the column is described once in the schema. Programs ask the catalogue, not the bytes -- a rename is a one-line change, not three rewrites.'}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div className={`p-3 rounded-2xl border ${mode === 'file' ? 'border-rose-800 bg-rose-950/20' : 'border-slate-800 bg-slate-900/70'} transition-all`}>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{mode === 'file' ? 'Data as flat files (one copy per program)' : 'Data as one DBMS relation STUDENT'}</p>
          <div className="space-y-2">
            {(mode === 'file' ? FILES : ['STUDENT relation']).map((f, i) => {
              const stale = mode === 'file' && copies[i] !== copies[2];
              return (
                <div key={f} className={`p-2 rounded-lg border text-xs ${mode === 'file' ? (stale ? 'border-rose-600 bg-rose-950/40' : 'border-slate-700 bg-slate-950') : 'border-emerald-700 bg-emerald-950/30'}`}>
                  <div className="flex justify-between font-bold">
                    <span>{f}</span>
                    {mode === 'file' && <span className={stale ? 'text-rose-400' : 'text-emerald-400'}>{stale ? 'STALE' : 'current'}</span>}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-slate-300">
                    {mode === 'file' ? `Diya | addr: ${copies[i]}` : `${kabir ? 'Kabir, Diya' : 'Diya'} | addr: ${copies[2]} (single shared copy)`}
                  </div>
                  {mode === 'db' && <div className="mt-1 text-[10px] text-emerald-300">PRIMARY KEY keeps each fact once; every program reads this relation.</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-xl bg-slate-900 border border-indigo-800 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Copies of the fact</p>
              <p className="text-lg font-extrabold font-mono text-indigo-300">{factCopies}</p>
            </div>
            <div className={`p-2 rounded-xl border text-center ${mismatches > 0 ? 'bg-rose-950/60 border-rose-700' : 'bg-slate-900 border-slate-800'}`}>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Inconsistent copies</p>
              <p className={`text-lg font-extrabold font-mono ${mismatches > 0 ? 'text-rose-300' : 'text-emerald-300'}`}>{mismatches}</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-amber-800 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Writes per change</p>
              <p className="text-lg font-extrabold font-mono text-amber-300">{writesPerChange}</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Storage / query time</p>
              <p className="text-lg font-extrabold font-mono text-sky-300">{storageKB.toFixed(2)} KB / {queryMs >= 1000 ? (queryMs / 1000).toFixed(1) + ' s' : queryMs + ' ms'}</p>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] font-mono leading-relaxed min-h-24">
            {log.length === 0 ? <span className="text-slate-500">Press a button above and read the log...</span> : log.map((l, i) => (
              <p key={i} className={i === 0 ? 'text-slate-200' : 'text-slate-500'}>&gt; {l}</p>
            ))}
          </div>
          {mode === 'file' && distinct > 1 && answers.length > 1 && (
            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-800 text-xs text-rose-200">
              The office just asked one simple question and got {distinct} different answers: attendance says &quot;{copies[0]}&quot;, fees says &quot;{copies[1]}&quot;, exam says &quot;{copies[2]}&quot;. Which report card goes to the wrong house?
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <span className="font-bold text-emerald-300">Misconception killer:</span> flat files do not fail because they cannot store data -- they fail because the SAME fact lives in many places and quietly goes stale (redundancy breeding inconsistency). A DBMS stores each fact once in a shared schema, so one UPDATE is instantly true for every program.
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-900 border border-sky-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. In file mode move Diya twice, then run the office query. Count the stale copies and explain which file lies about her address.</p>
        <p className="mt-1">2. Admit Kabir in each mode and compare &quot;writes per change&quot; and storage -- why does the DBMS row grow by 1 while the files grow by 3?</p>
      </footer>
    </div>
  );
}

export default C11_InformaticsPracticesFileSystemLimitsSim;
