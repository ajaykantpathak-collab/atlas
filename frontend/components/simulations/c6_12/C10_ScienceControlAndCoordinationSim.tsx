'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Class 10 Science -- Control and Coordination
 * Race a reflex arc (spinal cord shortcut) against a voluntary response
 * (route via the brain). Signal speed depends on myelination.
 * Self-contained: react + tailwind only.
 */

type NodeId = 'skin' | 'sensory' | 'cord' | 'brain' | 'motor' | 'muscle';

const STOPS: { id: NodeId; label: string; x: number; y: number }[] = [
  { id: 'skin', label: 'Hand (receptor)', x: 60, y: 250 },
  { id: 'sensory', label: 'Sensory neuron', x: 170, y: 170 },
  { id: 'cord', label: 'Spinal cord (relay)', x: 230, y: 95 },
  { id: 'brain', label: 'Brain (thinks!)', x: 230, y: 30 },
  { id: 'motor', label: 'Motor neuron', x: 300, y: 170 },
  { id: 'muscle', label: 'Muscle (pull away)', x: 400, y: 250 },
];

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
    nodeId: 'c10_bio_cbse_02_001',
    q: 'A student touches a Mimosa (touch-me-not) leaf and it folds; she touches a hot cup and pulls her hand away. Which pairing identifies both responses correctly?',
    options: [
      'Mimosa folding = nastic movement (thigmonasty) of plant cells; hand withdrawal = reflex action via the spinal cord in animals',
      'Both are reflex actions because both are fast',
      'Both are tropic movements because both are directional',
      'Mimosa folding is a voluntary action; hand withdrawal is involuntary',
    ],
    answer: 0,
    why: 'Mimosa uses turgor/volume changes in pulvinus cells -- a nastic (non-directional) movement, no growth involved. Hand withdrawal is an animal reflex arc: receptor -> sensory neuron -> spinal cord -> motor neuron -> muscle. The circulatory system is needed to deliver the animal\'s chemical signals (hormones) but plants mainly use local chemical and electrical signals.',
  },
  {
    nodeId: 'c10_bio_cbse_02_001',
    q: 'Evaluate: "Plants are less coordinated than animals because they lack a brain."',
    options: [
      'Inaccurate -- plants coordinate using chemical signals (auxin and other hormones) and electrical impulses, but lacking a nervous system means responses are slower and often growth-based',
      'Accurate -- plants have no coordination at all',
      'Accurate -- plants only respond to touch',
      'Inaccurate -- plants have a brain in the root tip',
    ],
    answer: 0,
    why: 'Plants DO coordinate: phototropism is driven by a chemical signal (auxin) produced in the shoot tip; Mimosa folds via turgor shifts. What plants lack is fast neural circuitry, so many plant responses are slow growth movements rather than instant muscle action.',
  },
  {
    nodeId: 'c10_bio_cbse_02_002',
    q: 'Name the three main parts of a typical neuron and their functions.',
    options: [
      'Dendrite receives information; axon conducts the impulse away from the cell body; axon terminals release chemicals (neurotransmitters) into the synapse',
      'Dendrite secretes hormone; axon digests food; synapse stores blood',
      'Dendrite contracts; axon receives; synapse insulates',
      'Cell body carries oxygen; axon stores glucose; dendrite moves the limb',
    ],
    answer: 0,
    why: 'Information flows dendrite -> cell body -> axon -> axon terminals -> synapse. At the synapse the electrical impulse triggers release of a chemical neurotransmitter that crosses the gap to the next neuron -- this chemical step is why transmission is one-way.',
  },
  {
    nodeId: 'c10_bio_cbse_02_002',
    q: 'In multiple sclerosis the myelin sheath is damaged but the axon is intact. Why does signal speed collapse?',
    options: [
      'The myelin sheath electrically insulates the axon so the impulse jumps between nodes at up to ~120 m/s; without it the impulse crawls at ~1 m/s',
      'Myelin produces the neurotransmitter',
      'Myelin carries the impulse instead of the axon',
      'Myelin supplies glucose to the neuron',
    ],
    answer: 0,
    why: 'Myelin is the insulation that enables saltatory conduction -- the sim\'s "Myelination" slider shows 1 m/s vs 120 m/s. Also evaluate: "neurons cannot divide, so all damage is permanent" is broadly true for most neurons (they rarely divide), but the nervous system can still recover some function by forming new connections, and PNS axons can regrow slowly.',
  },
  {
    nodeId: 'c10_bio_cbse_02_003',
    q: 'A doctor taps the patellar tendon and the lower leg kicks. Why is this reflex possible without the brain?',
    options: [
      'The reflex arc is completed in the spinal cord: muscle spindle -> sensory neuron -> relay neuron -> motor neuron -> thigh muscle, so the kick happens before the brain is even informed',
      'The leg muscles think for themselves',
      'The tap sends a signal directly to the cerebrum',
      'Tendons are connected to the medulla',
    ],
    answer: 0,
    why: 'The knee-jerk is a two-neuron spinal reflex -- the brain is notified afterwards, not consulted. Design check (classroom): sit relaxed with legs hanging, tap below the kneecap with a rubber hammer; the kick is involuntary. Contrast: a fielder catching a ball is NOT a reflex -- it is a voluntary, learned action routed through the cerebrum.',
  },
  {
    nodeId: 'c10_bio_cbse_02_004',
    q: 'Which brain part controls involuntary actions like heartbeat, breathing, and blood pressure?',
    options: [
      'Medulla in the hindbrain',
      'Cerebrum in the forebrain',
      'Cerebellum in the hindbrain',
      'Thalamus',
    ],
    answer: 0,
    why: 'Hindbrain: medulla (involuntary vital functions -- heartbeat, breathing, vomiting, BP) and cerebellum (balance, posture, precision of voluntary movement). Forebrain: cerebrum (thinking, voluntary actions), thalamus (relay), hypothalamus (temperature, hunger, hormone control). A head-injury patient who stops breathing has medulla damage.',
  },
  {
    nodeId: 'c10_bio_cbse_02_004',
    q: 'A fielder dives, lands awkwardly, and gets up WITHOUT losing balance. Which part saved the balance?',
    options: [
      'Cerebellum -- it maintains posture and equilibrium during voluntary movement',
      'Cerebrum -- it stores balance memories',
      'Medulla -- it controls balance reflexes',
      'Spinal cord -- it balances the body',
    ],
    answer: 0,
    why: 'Cerebellum = balance and fine coordination of voluntary motion. Classroom check: close your eyes and touch your nose-tip (finger-nose test) -- cerebellum. Compare with the sim: the voluntary route spends extra time through the brain because conscious decisions are costly.',
  },
  {
    nodeId: 'c10_bio_cbse_02_005',
    q: 'Define phototropism and geotropism with the correct directional responses.',
    options: [
      'Phototropism: shoot bends TOWARD light (positive), root away (negative). Geotropism: root grows TOWARD gravity (positive), shoot away (negative)',
      'Both shoots and roots bend toward light and gravity',
      'Phototropism is root bending toward gravity',
      'Neither is directional',
    ],
    answer: 0,
    why: 'Shoots are positively phototropic and negatively geotropic; roots the reverse. Horizontal bean seedling in darkness: root curves down, shoot curves up -- proving gravity alone (not light) drives the response.',
  },
  {
    nodeId: 'c10_bio_cbse_02_005',
    q: 'In phototropism, why does the shaded side of the shoot grow FASTER? And what did the cut-tip-on-agar experiment prove?',
    options: [
      'Auxin diffuses away from light to the shaded flank and stimulates cell ELONGATION there; the agar-block experiment proved a diffusable chemical (not the tip itself) causes bending',
      'Light stimulates cell division on the shaded side',
      'The lit side dies and collapses',
      'Auxin makes cells divide on the lit side',
    ],
    answer: 0,
    why: 'Auxin is synthesised in the shoot tip, migrates to the shaded side, and promotes elongation -- so the shaded side lengthens more and the shoot curves toward light. Cutting the tip stops bending; placing the cut tip on agar and putting the agar on a decapitated shoot restores bending -- the signal is a chemical. Design check: mustard seedlings with root tips removed fail to bend downward -- root tip is the gravity-sensing site.',
  },
  {
    nodeId: 'c10_bio_cbse_02_006',
    q: 'Why does Mimosa fold on touch but NOT bend toward the touch point the way a shoot bends toward light?',
    options: [
      'Thigmonasty is a NON-directional nastic movement driven by turgor changes at the pulvinus; tropisms are directional growth movements driven by unequal auxin',
      'Mimosa cannot sense direction',
      'Mimosa has auxin but no water',
      'Leaves never show directional movement',
    ],
    answer: 0,
    why: 'Nasty (nastic) = direction of response independent of the stimulus direction, powered by ATP-driven ion pumps changing turgor -- very fast (seconds). Tropic = growth toward/away from the stimulus direction, slower. Venus flytrap closing is ALSO nastic (thigmonasty), not tropic: the trap does not grow toward the insect.',
  },
  {
    nodeId: 'c10_bio_cbse_02_007',
    q: 'Match the plant hormone to its role: phototropic bending, stem elongation and germination, cell division/delaying leaf ageing, wilting-and-dormancy.',
    options: [
      'Auxin -- bending; Gibberellin -- elongation and germination; Cytokinin -- cell division and anti-ageing; Abscisic acid -- wilting response and dormancy',
      'Auxin -- wilting; ABA -- bending; Gibberellin -- ageing; Cytokinin -- dormancy',
      'Ethylene -- bending; Auxin -- germination; ABA -- cell division; Cytokinin -- dormancy',
      'All four are made by the same tissue with identical effects',
    ],
    answer: 0,
    why: 'Auxin (shoot tip) -- phototropism and rooting in cuttings. Gibberellin -- stem elongation AND breaking seed dormancy (so "gibberellin has no role in germination" is FALSE). Cytokinin promotes cell division and delays senescence, antagonising ABA which induces senescence and stomatal closure. A seed fails to germinate despite water/oxygen/warmth when abscisic acid keeps it dormant.',
  },
  {
    nodeId: 'c10_bio_cbse_02_008',
    q: 'Why is insulin NOT secreted by the pituitary even though the pituitary is the "master gland"?',
    options: [
      'The pituitary controls other ENDOCRINE glands via tropic hormones, but insulin comes from the beta cells of the pancreatic islets, which respond directly to blood glucose',
      'The pituitary has no blood supply',
      'Insulin is a neurotransmitter',
      'The master gland is the thyroid',
    ],
    answer: 0,
    why: 'The pituitary (at the base of the brain, master gland) secretes growth hormone and tropic hormones (e.g. TSH, ACTH). Insulin and glucagon come from the pancreas: beta cells -> insulin (lowers glucose), alpha cells -> glucagon (raises it). After a carbohydrate meal: glucose rises -> beta cells secrete insulin -> cells uptake glucose -> level returns to normal (negative feedback).',
  },
  {
    nodeId: 'c10_bio_cbse_02_008',
    q: 'How does hormonal coordination differ from nervous coordination?',
    options: [
      'Nerves: electrical, fast (ms), short-lived, targeted; hormones: chemical via blood, slower (seconds to days), widespread and longer-lasting',
      'Hormones travel through nerves',
      'Nervous signals last for days',
      'Hormones act only on neurons',
    ],
    answer: 0,
    why: 'Nervous = high-speed electrical impulse + neurotransmitter across synapses. Hormonal = chemicals transported by blood to target organs, slower but sustained -- ideal for growth, metabolism, puberty. Adrenaline shows both systems cooperating: the nervous system detects danger, the adrenal medulla floods blood with adrenaline.',
  },
  {
    nodeId: 'c10_bio_cbse_02_009',
    q: 'A person not using iodised salt develops a swollen neck (goitre). What is the chain of cause and effect?',
    options: [
      'Iodine is essential for thyroxine synthesis; without it the thyroid enlarges (goitre) and low thyroxine slows basal metabolic rate; in children severe deficiency causes stunted growth and mental retardation (cretinism)',
      'Iodine deficiency makes the pancreas swell',
      'Goitre is caused by excess thyroxine',
      'Iodine is needed only for bones',
    ],
    answer: 0,
    why: 'Thyroid hormone = thyroxine (contains iodine), regulating basal metabolic rate. Deficiency -> goitre; childhood deficiency -> cretinism (stunted growth, puffy face, mental retardation). Evaluate: "extra iodine always cures goitre and restores normal metabolism" is FALSE -- some goitres have other causes and excess iodine itself can disrupt the thyroid.',
  },
  {
    nodeId: 'c10_bio_cbse_02_010',
    q: 'Seeing a snake, a student\'s pupils dilate and blood shifts from digestion to muscles within seconds. Which gland, which region, and why both heart rate AND bronchiole dilation?',
    options: [
      'Adrenaline from the adrenal medulla; it prepares fight-or-flight so more oxygen must reach muscles -- heart pumps faster and bronchioles widen to maximise O2 intake',
      'Insulin from the pancreas; it stores energy',
      'Thyroxine from the thyroid; it slows the body',
      'Adrenaline from the adrenal cortex; it digests food faster',
    ],
    answer: 0,
    why: 'Adrenaline is secreted by the adrenal medulla (inner region) of the adrenal gland above the kidney. One hormone, many target organs: heart (rate up), bronchioles (dilate), liver (glycogen -> glucose), gut (constricts). That is how a single chemical signal coordinates a whole-body emergency response.',
  },
  {
    nodeId: 'c10_bio_cbse_02_011',
    q: 'Why must insulin be injected rather than swallowed, and how do Type 1 and Type 2 diabetes differ?',
    options: [
      'Insulin is a protein digested in the gut if swallowed; Type 1 = immune destruction of beta cells (little/no insulin, early onset); Type 2 = cells resistant to insulin (adult onset, insulin may be normal/high)',
      'Insulin is a steroid absorbed only through skin; both types are identical',
      'Insulin is destroyed by stomach acid and both types are caused by sugar intake',
      'Tablets work fine; injection is only traditional',
    ],
    answer: 0,
    why: 'Protein hormones are digested by peptidases -- hence injection (glucagon can even be given as an emergency nasal spray). Type 1: primary defect is beta-cell loss -> insulin deficient. Type 2: primary defect is insulin resistance; metformin improves sensitivity rather than forcing the pancreas to make more insulin.',
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

export function C10_ScienceControlAndCoordinationSim() {
  const [route, setRoute] = useState<'reflex' | 'voluntary'>('reflex');
  const [myelin, setMyelin] = useState(60); // m/s
  const [pathLen, setPathLen] = useState(1.0); // metres of nerve
  const [fired, setFired] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const stimulus = useCallback(() => {
    clearTimers();
    setFired(true);
    setActiveIdx(0);
    setElapsed(0);

    // build path: reflex skips the brain hop, voluntary goes cord -> brain -> cord
    const path: NodeId[] = route === 'reflex'
      ? ['skin', 'sensory', 'cord', 'motor', 'muscle']
      : ['skin', 'sensory', 'cord', 'brain', 'cord', 'motor', 'muscle'];

    const legLen = (pathLen * 2) / (path.length - 1); // total nerve route = 2 x arm distance
    const brainDelay = route === 'voluntary' ? 0.25 : 0; // s to "decide"
    const totalTime = (path.length - 1) * (legLen / myelin) + brainDelay;

    let t = 0;
    path.forEach((_, i) => {
      if (i === 0) return;
      t += i === path.length - 1 ? 0 : legLen / myelin;
      if (route === 'voluntary' && i === 4) t += brainDelay; // after brain visit
      const stopTime = t * 1000;
      timersRef.current.push(setTimeout(() => setActiveIdx(i), stopTime));
    });
    timersRef.current.push(
      setTimeout(() => setElapsed(totalTime * 1000), totalTime * 1000 + 50)
    );
  }, [route, myelin, pathLen]);

  const reflexTime = (5 * ((pathLen * 2) / 4) / myelin) * 1000;
  const voluntaryTime = (6 * ((pathLen * 2) / 4) / myelin + 0.25) * 1000;

  const isActive = (node: NodeId, idx: number) => {
    const path: NodeId[] = route === 'reflex'
      ? ['skin', 'sensory', 'cord', 'motor', 'muscle']
      : ['skin', 'sensory', 'cord', 'brain', 'cord', 'motor', 'muscle'];
    if (idx >= path.length) {
      // cord appears twice in voluntary: map extra to same visual node
      return false;
    }
    return fired && path[Math.min(activeIdx, path.length - 1)] === node;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-fuchsia-950/80 rounded-2xl border border-fuchsia-700">⚡</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Class 10 -- Control and Coordination</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Reflex Arc vs Voluntary Action Race</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            {/* body outline hint */}
            <line x1={230} y1={60} x2={230} y2={130} stroke="#334155" strokeWidth={14} strokeLinecap="round" opacity={0.5} />
            {/* brain */}
            <ellipse cx={230} cy={30} rx={46} ry={22}
              fill={isActive('brain', 3) ? '#e879f9' : '#4c1d95'} stroke="#a78bfa" strokeWidth={2}
              className="transition-colors duration-200" />
            <text x={230} y={35} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#fff">BRAIN</text>
            {/* spinal cord */}
            <rect x={216} y={70} width={28} height={60} rx={10}
              fill={isActive('cord', 2) || isActive('cord', 4) ? '#e879f9' : '#312e81'} stroke="#a78bfa" strokeWidth={2}
              className="transition-colors duration-200" />
            <text x={260} y={105} fontSize={10} fill="#94a3b8">spinal cord</text>
            {/* nerves + nodes */}
            {STOPS.filter((s) => s.id !== 'brain' && s.id !== 'cord').map((s) => (
              <g key={s.id}>
                <circle cx={s.x} cy={s.y} r={11}
                  fill={fired && activeIdx >= 0 && STOPS.filter((q) => q.id !== 'brain' && q.id !== 'cord').findIndex((q) => q.id === s.id) <= activeIdx + (route === 'voluntary' && activeIdx >= 4 ? 1 : 0) ? '#22c55e' : '#1e293b'}
                  stroke="#38bdf8" strokeWidth={2} className="transition-all duration-200" />
                <text x={s.x} y={s.y + 28} textAnchor="middle" fontSize={9} fill="#94a3b8">
                  {s.label.split(' (')[0]}
                </text>
              </g>
            ))}
            {/* connecting lines */}
            <polyline points="60,250 170,170 230,95" fill="none" stroke="#38bdf8" strokeWidth={2} strokeDasharray="5 4" opacity={0.7} />
            <polyline points="230,95 300,170 400,250" fill="none" stroke="#38bdf8" strokeWidth={2} strokeDasharray="5 4" opacity={0.7} />
            {route === 'voluntary' && (
              <polyline points="244,90 244,42 230,52" fill="none" stroke="#e879f9" strokeWidth={2.5} strokeDasharray="4 3" />
            )}
            {/* impulse dot travels along the polyline roughly */}
            {fired && (
              <circle r={7} fill="#fde047">
                <animate attributeName="opacity" values="1;1" dur="0.1s" />
              </circle>
            )}
          </svg>
          <div className="text-center text-xs mt-1">
            {fired ? (
              elapsed > 0 ? (
                <span className="font-mono font-bold text-emerald-400">
                  Response in {(elapsed / 1000).toFixed(3)} s via the {route === 'reflex' ? 'spinal reflex arc (brain informed later!)' : 'brain (conscious decision)'}
                </span>
              ) : (
                <span className="text-amber-300">impulse travelling...</span>
              )
            ) : (
              <span className="text-slate-500">Press the stimulus button to fire a signal</span>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setRoute('reflex'); setFired(false); setActiveIdx(-1); setElapsed(0); }}
                className={`py-2 rounded-xl text-xs font-bold ${route === 'reflex' ? 'bg-fuchsia-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Reflex arc
              </button>
              <button onClick={() => { setRoute('voluntary'); setFired(false); setActiveIdx(-1); setElapsed(0); }}
                className={`py-2 rounded-xl text-xs font-bold ${route === 'voluntary' ? 'bg-fuchsia-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Voluntary (via brain)
              </button>
            </div>
            <button onClick={stimulus}
              className="w-full py-3 rounded-xl text-sm font-black bg-amber-500 text-slate-950 hover:bg-amber-400 transition animate-pulse">
              STIMULUS: touch the hot cup!
            </button>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Myelination (axon speed)</span>
                <span className="font-mono font-bold text-emerald-400">{myelin} m/s</span>
              </div>
              <input type="range" min={1} max={120} value={myelin} aria-label="myelination speed"
                onChange={(e) => { setMyelin(Number(e.target.value)); setFired(false); }} className="w-full accent-emerald-500" />
              <p className="text-[10px] text-slate-500">Unmyelinated ~1 m/s; myelinated up to 120 m/s</p>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Arm-to-cord path length</span>
                <span className="font-mono font-bold text-sky-400">{pathLen.toFixed(1)} m</span>
              </div>
              <input type="range" min={0.3} max={2} step={0.1} value={pathLen} aria-label="path length"
                onChange={(e) => { setPathLen(Number(e.target.value)); setFired(false); }} className="w-full accent-sky-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-slate-950 rounded-xl p-3 border border-fuchsia-800/60">
              <p className="text-[10px] text-slate-500 uppercase">Reflex time</p>
              <p className="font-mono font-black text-lg text-fuchsia-300">{reflexTime.toFixed(0)} ms</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase">Voluntary time</p>
              <p className="font-mono font-black text-lg text-slate-300">{voluntaryTime.toFixed(0)} ms</p>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              The reflex arc cuts the brain out of the emergency loop: receptor, sensory neuron, spinal
              cord relay, motor neuron, muscle. Saving the brain-visit (~0.25 s of thinking) plus the
              shorter wire is why you lift your hand BEFORE you feel the pain. Hormones (adrenaline) are
              the second, slower messaging system.
            </p>
          </div>

          <div className="bg-fuchsia-950/40 rounded-2xl border border-fuchsia-800/50 p-4 text-xs">
            <p className="font-bold text-fuchsia-300 mb-1">What to try</p>
            <p>1. Set myelination to 1 m/s -- which reaction now feels dangerously slow, and what disease mimics this?</p>
            <p>2. Predict the reflex time for a giraffe (path ~2 m) at 100 m/s, then verify with the slider.</p>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

export default C10_ScienceControlAndCoordinationSim;
