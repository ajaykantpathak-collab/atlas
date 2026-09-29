'use client';

import React, { useMemo, useState } from 'react';

// ─── RESTRICTION ENZYMES: recognition site, cut offset, 5' overhang ───
const ENZYMES = [
  { id: 'EcoRI', site: 'GAATTC', overhang: 'AATT', inVector: true },
  { id: 'BamHI', site: 'GGATCC', overhang: 'GATC', inVector: true },
  { id: 'HindIII', site: 'AAGCTT', overhang: 'AGCT', inVector: false },
];

const INSERT = 'ATCGAATTCTTAGGATCCTTGCAAGCTTATCG';

const findCuts = (seq: string, site: string) => {
  const cuts: number[] = [];
  for (let i = 0; i <= seq.length - site.length; i++) {
    if (seq.slice(i, i + site.length) === site) cuts.push(i + 1); // cut 1 base into the site
  }
  return cuts;
};

export function C12_BiotechnologyGeneCloningSim() {
  const [enzymeId, setEnzymeId] = useState('EcoRI');
  const [cutDone, setCutDone] = useState(false);
  const [ligated, setLigated] = useState(false);

  const enzyme = ENZYMES.find((e) => e.id === enzymeId) || ENZYMES[0];
  const cutSites = useMemo(() => findCuts(INSERT, enzyme.site), [enzyme]);
  const fragments = useMemo(() => {
    if (!cutDone || cutSites.length === 0) return [INSERT];
    const out: string[] = [];
    let prev = 0;
    cutSites.forEach((c) => {
      out.push(INSERT.slice(prev, c));
      prev = c;
    });
    out.push(INSERT.slice(prev));
    return out;
  }, [cutDone, cutSites]);

  const pick = (id: string) => {
    setEnzymeId(id);
    setCutDone(false);
    setLigated(false);
  };

  const reset = () => pick('EcoRI');

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">CBSE Class 12 Biotechnology - Gene Cloning</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Restriction Enzyme Cutter &amp; Ligase Bench</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">Clone Lab</span>
      </header>

      <p className="text-xs text-slate-400 mb-3 max-w-3xl">
        This 33-bp human DNA fragment holds the gene you want. Pick a restriction enzyme, cut the insert, then try to ligate
        it into a plasmid vector that only contains EcoRI and BamHI sites.
      </p>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="flex flex-col gap-2">
          {ENZYMES.map((e) => (
            <button key={e.id} onClick={() => pick(e.id)} className={`min-h-11 px-3 rounded-xl text-xs font-mono font-bold border ${enzymeId === e.id ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
              {e.id} site {e.site.slice(0, 1)}^{e.site.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => { setCutDone(true); setLigated(false); }} className="min-h-11 px-4 rounded-2xl text-sm font-bold bg-emerald-600 border border-emerald-500 text-white hover:bg-emerald-500">
            Cut insert with {enzyme.id}
          </button>
          <button onClick={() => cutDone && setLigated(true)} disabled={!cutDone} className={`min-h-11 px-4 rounded-2xl text-sm font-bold border ${cutDone ? 'bg-gold-600 border-gold-500 text-white hover:bg-gold-500' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
            Open plasmid + ligate insert
          </button>
          <button onClick={reset} className="min-h-11 px-4 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset bench</button>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-2">
          <p className="text-slate-400 flex justify-between"><span>Cut sites found</span><span className="font-mono font-bold text-gold-300">{cutSites.length} site(s)</span></p>
          <p className="text-slate-400 flex justify-between"><span>Fragments</span><span className="font-mono font-bold text-gold-300">{cutDone ? fragments.length : 1}</span></p>
          <p className="text-slate-400 flex justify-between"><span>5&apos; overhang</span><span className="font-mono font-bold text-amber-300">5&apos;-{enzyme.overhang}-3&apos;</span></p>
        </div>
      </div>

      {/* INSERT DNA */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 mb-4">
        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Insert DNA (5&apos; to 3&apos;) -- {cutDone ? `cut at ${cutSites.map((c) => 'base ' + c).join(', ') || 'no site!'}` : 'intact'}</p>
        <div className="flex flex-wrap items-center gap-1 font-mono text-sm">
          {fragments.map((f, i) => (
            <React.Fragment key={i}>
              <span className={`px-1.5 py-1 rounded-lg break-all ${cutDone && i > 0 ? 'bg-amber-950/70 border border-amber-600 text-amber-200' : 'bg-slate-950 border border-slate-700 text-slate-200'}`}>{f}</span>
              {cutDone && i < fragments.length - 1 && <span className="text-rose-400 font-bold">&#9986;</span>}
            </React.Fragment>
          ))}
        </div>
        {cutDone && cutSites.length === 0 && (
          <p className="mt-2 text-xs font-bold text-rose-300">No {enzyme.site} site exists in this insert -- nothing was cut. Try another enzyme.</p>
        )}
      </div>

      {/* PLASMID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
          <svg viewBox="0 0 220 210" className="w-full h-52" preserveAspectRatio="xMidYMid meet">
            <circle cx="110" cy="105" r="80" fill="none" stroke={ligated ? '#34d399' : '#64748b'} strokeWidth="10" className="transition-all duration-500" />
            {ligated && (
              <path d="M 110 25 A 80 80 0 0 1 188 125" fill="none" stroke="#fbbf24" strokeWidth="14" strokeLinecap="round" />
            )}
            <circle cx="110" cy="45" r="5" fill="#f472b6" />
            <text x="110" y="32" fill="#f9a8d4" fontSize="9" textAnchor="middle">ori</text>
            <circle cx="170" cy="65" r="5" fill="#38bdf8" />
            <text x="182" y="60" fill="#7dd3fc" fontSize="9" textAnchor="middle">ampR</text>
            <text x="110" y="200" fill="#94a3b8" fontSize="10" textAnchor="middle">
              {ligated ? 'Recombinant plasmid: insert spliced in' : cutDone ? 'Vector opened by same enzyme, ready to ligate' : 'Circular plasmid vector'}
            </text>
          </svg>
        </div>
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Ligation report</p>
          {!cutDone && <p className="text-xs text-slate-400">Cut the insert first. Enzymes are molecular scissors; DNA ligase is the glue.</p>}
          {cutDone && !ligated && cutSites.length > 0 && enzyme.inVector && (
            <p className="text-xs text-amber-300">Matching sticky ends: insert overhang {enzyme.overhang} pairs with the opened vector&apos;s {enzyme.overhang}. Press ligate.</p>
          )}
          {cutDone && !ligated && !enzyme.inVector && (
            <p className="text-xs font-bold text-rose-300">The vector has no {enzyme.id} site -- it cannot be opened with this enzyme, so no cloning is possible.</p>
          )}
          {ligated && (
            <p className="text-xs font-bold text-emerald-300">Success: phosphodiester bonds sealed by ligase. Sticky ends {enzyme.overhang} annealed first because A pairs with T and G with C.</p>
          )}
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
            Misconception killer: restriction enzymes do NOT cut DNA anywhere -- they recognise one exact palindrome-like site.
            Same enzyme on both DNA pieces = complementary sticky ends; random cuts = ends that can never anneal.
          </p>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Cut with BamHI and count fragments and bases per fragment. Which fragment is bigger, and what does size mean on a gel?</p>
        <p className="mt-1">2. Choose HindIII and try to ligate. Read the failure report -- then explain why HindIII-digested insert DNA would still fit into a HindIII-digested vector that actually had the site.</p>
      </footer>
    </div>
  );
}

export default C12_BiotechnologyGeneCloningSim;
