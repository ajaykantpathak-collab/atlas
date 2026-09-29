'use client';

import React, { useCallback, useState } from 'react';

/**
 * Class 10 Science -- Heredity
 * Mendel's laws on a live Punnett square: choose both parent genotypes,
 * compute phenotype ratios, then sample offspring and compare with theory.
 * Self-contained: react + tailwind only.
 */

type Geno = 'TT' | 'Tt' | 'tt';

const GENOTYPES: Geno[] = ['TT', 'Tt', 'tt'];

const PARENT_INFO: Record<Geno, { label: string; gametes: string[] }> = {
  TT: { label: 'Homozygous tall (pure)', gametes: ['T', 'T'] },
  Tt: { label: 'Heterozygous tall (hybrid)', gametes: ['T', 't'] },
  tt: { label: 'Homozygous dwarf', gametes: ['t', 't'] },
};

// ─── Class 10 board-depth drill bank ───
// Targets uncovered board diagnostics for this chapter's nodes
// (see backend/its/competency/CLASS10_NODE_DEPTH.json). Static and deterministic.
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_bio_cbse_04_002',
    q: 'An F1 plant (Rr, round seeds) is self-pollinated. Which outcome does Mendel expect, and what does the 1:2:1 under it mean?',
    options: [
      'Phenotypes 3 round : 1 wrinkled, with genotypes 1 RR : 2 Rr : 1 tt-equivalent (rr) -- the hidden r reappears because gametes carry ONE allele each (Law of Segregation)',
      'All round, because round is dominant',
      '1 round : 1 wrinkled only',
      'All wrinkled, because r finally meets r',
    ],
    answer: 0,
    why: 'Set both parents to Rr in the sim: the Punnett square shows RR, Rr, Rr, rr. Round is any genotype containing R (3/4); wrinkled only rr (1/4). The 3:1 PHENOTYPIC ratio hides a 1:2:1 GENOTYPIC ratio -- the F1 looked uniformly round yet carried a masked recessive that F2 reveals. That is the Law of Segregation: the two alleles of a pair separate cleanly during gamete formation, so each gamete gets exactly one.',
  },
];

function DepthDrill() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, done: 0 });
  const item = DEPTH_QUIZ[idx];
  const answered = picked !== null;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    setScore((s) => ({ right: s.right + (i === item.answer ? 1 : 0), done: s.done + 1 }));
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-amber-800/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Board-depth drill</p>
        <span className="text-[11px] font-mono text-slate-400">
          {idx + 1}/{DEPTH_QUIZ.length} -- {score.right}/{score.done} correct
        </span>
      </div>
      <p className="text-sm text-slate-200 leading-relaxed">{item.q}</p>
      <div className="space-y-1.5">
        {item.options.map((opt, i) => {
          const state = !answered
            ? 'bg-slate-800 hover:bg-slate-700 border-slate-700'
            : i === item.answer
              ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100'
              : i === picked
                ? 'bg-rose-900/60 border-rose-600 text-rose-100'
                : 'bg-slate-800/40 border-slate-800 opacity-60';
          return (
            <button key={i} onClick={() => pick(i)} disabled={answered}
              className={`w-full text-left px-3 py-2 rounded-xl border text-xs leading-snug transition ${state}`}>
              <span className="font-bold mr-1.5">{'ABCD'[i]}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="text-xs leading-relaxed text-amber-200 bg-amber-950/40 border border-amber-800/50 rounded-xl px-3 py-2">
          <span className="font-bold">Misconception killed: </span>
          {item.why}
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={() => { setIdx((i) => (i + 1) % DEPTH_QUIZ.length); setPicked(null); }}
          className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 transition">
          Next question
        </button>
        <button onClick={() => { setIdx(0); setPicked(null); setScore({ right: 0, done: 0 }); }}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-900 transition">
          Reset
        </button>
      </div>
    </div>
  );
}

export function C10_ScienceHereditySim() {
  const [p1, setP1] = useState<Geno>('Tt');
  const [p2, setP2] = useState<Geno>('Tt');
  const [sample, setSample] = useState<{ geno: string; pheno: 'tall' | 'dwarf' }[]>([]);

  const g1 = PARENT_INFO[p1].gametes;
  const g2 = PARENT_INFO[p2].gametes;

  const grid: string[][] = [0, 1].map((r) => [0, 1].map((c) => {
    const pair = [g1[c], g2[r]].sort().join('');
    return pair;
  }));

  const flat = grid.flat();
  const counts = flat.reduce<Record<string, number>>((acc, g) => {
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});
  const tall = flat.filter((g) => g.includes('T')).length;
  const dwarf = 4 - tall;

  const phenotypeRatio = (tall / 4) * 100;

  const sampleOffspring = useCallback(() => {
    const out: { geno: string; pheno: 'tall' | 'dwarf' }[] = [];
    for (let i = 0; i < 16; i++) {
      const a = g1[Math.floor(Math.random() * 2)];
      const b = g2[Math.floor(Math.random() * 2)];
      const geno = [a, b].sort().join('');
      out.push({ geno, pheno: geno.includes('T') ? 'tall' : 'dwarf' });
    }
    setSample(out);
  }, [g1, g2]);

  const sampleTall = sample.filter((s) => s.pheno === 'tall').length;

  const picker = (label: string, val: Geno, set: (g: Geno) => void, color: string) => (
    <div>
      <p className="text-[11px] text-slate-400 mb-1">{label}</p>
      <div className="grid grid-cols-3 gap-1.5">
        {GENOTYPES.map((g) => (
          <button key={g} onClick={() => { set(g); setSample([]); }}
            className={`py-1.5 rounded-lg text-xs font-mono font-bold transition ${val === g ? `${color}` : 'bg-slate-800 hover:bg-slate-700'}`}>
            {g}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 mt-1">{PARENT_INFO[val].label} -- gametes {PARENT_INFO[val].gametes.join(', ')}</p>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-lime-950/80 rounded-2xl border border-lime-700">🧬</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-lime-400">Class 10 -- Heredity</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Punnett Square: Mendel&apos;s Pea Height Gene</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
          <svg viewBox="0 0 380 320" className="w-full">
            {/* parent gamete labels */}
            <text x={95} y={40} fontSize={13} fontWeight="bold" fill="#38bdf8" textAnchor="middle">{p1} (father plant)</text>
            <text x={30} y={120} fontSize={13} fontWeight="bold" fill="#f472b6">{p2}</text>
            <text x={30} y={138} fontSize={10} fill="#f472b6">(mother)</text>
            {/* grid */}
            <rect x={80} y={50} width={260} height={200} fill="none" stroke="#475569" strokeWidth={2} />
            <line x1={210} y1={50} x2={210} y2={250} stroke="#475569" strokeWidth={2} />
            <line x1={80} y1={150} x2={340} y2={150} stroke="#475569" strokeWidth={2} />
            {g1.map((g, c) => (
              <text key={`t${c}`} x={145 + c * 130} y={42} fontSize={15} fontWeight="bold" fill="#38bdf8" textAnchor="middle">{g}</text>
            ))}
            {g2.map((g, r) => (
              <text key={`l${r}`} x={62} y={105 + r * 100} fontSize={15} fontWeight="bold" fill="#f472b6" textAnchor="middle">{g}</text>
            ))}
            {/* cells */}
            {[0, 1].map((r) => [0, 1].map((c) => {
              const geno = grid[r][c];
              const isTall = geno.includes('T');
              const hatch = geno === 'Tt';
              return (
                <g key={`c${r}${c}`}>
                  <rect x={84 + c * 130} y={54 + r * 100} width={122} height={92} rx={8}
                    fill={isTall ? (hatch ? '#65a30d33' : '#4d7c0f55') : '#7f1d1d44'} stroke={isTall ? '#84cc16' : '#f87171'} strokeWidth={2}
                    className="transition-all duration-300" />
                  <text x={145 + c * 130} y={105 + r * 100} fontSize={22} fontWeight="black" textAnchor="middle" fill={isTall ? '#bef264' : '#fecaca'}>
                    {geno}
                  </text>
                  <text x={145 + c * 130} y={126 + r * 100} fontSize={10} textAnchor="middle" fill="#94a3b8">
                    {isTall ? 'tall' : 'dwarf'} {hatch ? '(hybrid)' : '(pure)'}
                  </text>
                </g>
              );
            }))}
          </svg>
          <div className="flex gap-3 text-xs justify-center mt-2">
            <span className="px-3 py-1 rounded-lg bg-lime-950 text-lime-300 font-mono">TT {counts['TT'] || 0}/4</span>
            <span className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 font-mono">Tt {counts['Tt'] || 0}/4</span>
            <span className="px-3 py-1 rounded-lg bg-rose-950 text-rose-300 font-mono">tt {counts['tt'] || 0}/4</span>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            {picker('Parent 1 genotype', p1, setP1, 'bg-gold-600')}
            {picker('Parent 2 genotype', p2, setP2, 'bg-pink-600')}
            <div className="grid grid-cols-2 gap-2">
              <button onClick={sampleOffspring}
                className="py-2 rounded-xl text-xs font-bold bg-lime-600 hover:bg-lime-500 transition">
                Sample 16 seeds
              </button>
              <button onClick={() => setSample([])}
                className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 transition">
                Clear sample
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-lime-800/60 p-4 text-sm space-y-2">
            <p className="text-slate-300">
              Predicted phenotype ratio: <span className="font-black text-lime-300 text-lg">{tall} tall : {dwarf} dwarf</span>{' '}
              ({phenotypeRatio.toFixed(0)}% tall)
            </p>
            <p className="text-xs text-slate-500">
              Genotypic note: {counts['Tt'] ? `${counts['Tt']}/4 heterozygous -- carriers of the hidden t.` : 'no hybrids in this cross.'}
            </p>
            {sample.length > 0 && (
              <div className="pt-2 border-t border-slate-800">
                <p className="text-xs text-slate-300">
                  Your 16-seed sample: <span className="text-lime-300 font-bold">{sampleTall} tall</span>, {16 - sampleTall} dwarf
                  ({((sampleTall / 16) * 100).toFixed(0)}% tall vs {phenotypeRatio.toFixed(0)}% expected)
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {sample.map((s, i) => (
                    <span key={i} className={`w-7 h-7 rounded flex items-center justify-center text-[9px] font-mono font-bold ${s.pheno === 'tall' ? 'bg-lime-900 text-lime-200' : 'bg-rose-900 text-rose-200'}`}>
                      {s.geno}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              T is dominant: one copy is enough to be tall, so Tt looks exactly like TT -- yet it quietly
              carries t. Only tt shows the dwarf phenotype. That is why the 3:1 ratio appears when two
              hybrids cross, and why traits can skip a generation.
            </p>
          </div>

          <div className="bg-lime-950/40 rounded-2xl border border-lime-800/50 p-4 text-xs">
            <p className="font-bold text-lime-300 mb-1">What to try</p>
            <p>1. Cross Tt x tt (a test cross). What ratio proves the tall parent was hybrid, not pure?</p>
            <p>2. Sample 16 seeds from Tt x Tt five times. How often do you hit exactly the 3:1 ratio?</p>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

export default C10_ScienceHereditySim;
