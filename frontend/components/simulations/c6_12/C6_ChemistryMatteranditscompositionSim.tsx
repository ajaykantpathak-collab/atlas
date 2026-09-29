'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ─── ICSE CHEMISTRY CLASS 6 NODE IDS ───
const NODE_C6_CHEM_001 = 'c6_chem_001';
const NODE_C6_CHEM_002 = 'c6_chem_002';
const NODE_C6_CHEM_003 = 'c6_chem_003';
const NODE_C6_CHEM_004 = 'c6_chem_004';
const NODE_C6_CHEM_005 = 'c6_chem_005';
const NODE_C6_CHEM_006 = 'c6_chem_006';
const NODE_C6_CHEM_007 = 'c6_chem_007';
const NODE_C6_CHEM_008 = 'c6_chem_008';

const ALL_NODE_IDS = [
  NODE_C6_CHEM_001,
  NODE_C6_CHEM_002,
  NODE_C6_CHEM_003,
  NODE_C6_CHEM_004,
  NODE_C6_CHEM_005,
  NODE_C6_CHEM_006,
  NODE_C6_CHEM_007,
  NODE_C6_CHEM_008,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Matter Mystery Laboratory',
  intro: 'You are a young chemist exploring the fundamental question: what is everything made of? From the chair you sit on to the air you breathe, you will investigate matter, its states, elements, compounds, and mixtures through hands-on experiments.',
  context: 'Explore 8 key chemistry concepts: Matter & Composition, Particle Nature, Physical Changes, Chemical Changes, Elements, Compounds, Mixtures, and Separation Techniques.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A student blows air into a balloon and it expands. Then they place the filled balloon on a sensitive balance and it shows a slightly higher reading than the empty balloon. What does this prove about air?',
  options: [
    'Air is not matter because we cannot see it',
    'Air is matter because it has mass and occupies space',
    'Air is a solid because the balloon keeps its shape',
    'Air is energy because it makes the balloon move',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: matter has TWO properties — mass (weight) and volume (takes up space). The balloon got bigger (space) and heavier (mass).',
};

// ─── TEACHING SLIDES ───
interface TeachingSlide {
  nodeId: string;
  title: string;
  content: string;
  visualType: 'particle-model' | 'state-change' | 'chemical-change' | 'element-tiles' | 'compound-builder' | 'mixture-sorter' | 'separation-funnel' | 'composition-chart';
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    nodeId: NODE_C6_CHEM_001,
    title: 'What is Matter?',
    content: 'Matter is anything that has mass and occupies space. A stone has mass and takes up room. Water has mass and fills a glass. Air has mass (a filled balloon is heavier) and occupies space (the balloon expands). Light, heat, and shadows are NOT matter — they have no mass and no volume.',
    visualType: 'composition-chart',
  },
  {
    nodeId: NODE_C6_CHEM_002,
    title: 'Particle Nature of Matter',
    content: 'All matter is made of tiny particles too small to see. In solids, particles are packed tightly in a fixed pattern. In liquids, particles are close but can slide past each other. In gases, particles are far apart and move freely. This explains why solids keep their shape, liquids flow, and gases spread everywhere.',
    visualType: 'particle-model',
  },
  {
    nodeId: NODE_C6_CHEM_003,
    title: 'Physical Changes',
    content: 'A physical change is when matter changes form but no new substance is formed. Ice melting into water, water boiling into steam, and salt dissolving in water are all physical changes — the substance is still the same, just in a different state. These changes are usually reversible.',
    visualType: 'state-change',
  },
  {
    nodeId: NODE_C6_CHEM_004,
    title: 'Chemical Changes',
    content: 'A chemical change is when a new substance is formed. Burning paper produces ash and smoke — completely different from paper. Iron rusting forms a new substance. Signs of chemical change: color change, gas produced, temperature change, light emitted, or a precipitate forms. These changes are hard to reverse.',
    visualType: 'chemical-change',
  },
  {
    nodeId: NODE_C6_CHEM_005,
    title: 'Elements',
    content: 'An element is a pure substance made of only one kind of atom. Gold, oxygen, iron, and carbon are all elements. Each element has a chemical symbol (Au for gold, O for oxygen, Fe for iron). There are 118 known elements. Some are metals (shiny, conduct electricity), some are non-metals (dull, poor conductors).',
    visualType: 'element-tiles',
  },
];

// ─── CHALLENGES ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'sort' | 'build' | 'predict' | 'match' | 'identify';
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  difficulty: 'foundation' | 'standard' | 'advanced';
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch1',
    nodeId: NODE_C6_CHEM_001,
    type: 'classify',
    title: 'Matter or Not Matter?',
    question: 'Which of the following is NOT matter?',
    options: ['A stone', 'A bottle of water', 'Heat from the sun', 'Air in a balloon'],
    correctIndex: 2,
    explanation: 'Heat from the sun is a form of energy, not matter. It has no mass and does not occupy space. Stones, water, and air all have mass and volume.',
    hint: 'Matter must have BOTH mass and volume. Energy does not have mass.',
    difficulty: 'foundation',
  },
  {
    id: 'ch2',
    nodeId: NODE_C6_CHEM_001,
    type: 'classify',
    title: 'Classify the Shadow',
    question: 'A shadow on the wall — is it matter?',
    options: ['Yes, because it has a shape', 'No, because it has no mass and no volume', 'Yes, because it blocks light', 'No, because it is too dark'],
    correctIndex: 1,
    explanation: 'A shadow is just a dark area where light is blocked. It has no mass (cannot be weighed) and no volume (does not occupy space as a substance). It is NOT matter.',
    hint: 'Can you weigh a shadow? Can you put it in a container?',
    difficulty: 'foundation',
  },
  {
    id: 'ch3',
    nodeId: NODE_C6_CHEM_002,
    type: 'predict',
    title: 'Particle Arrangement',
    question: 'In which state of matter are particles packed most tightly together?',
    options: ['Gas', 'Liquid', 'Solid', 'They are the same in all states'],
    correctIndex: 2,
    explanation: 'In solids, particles are packed tightly in a fixed pattern. This is why solids keep their shape and are hard to compress. Liquid particles are close but can move. Gas particles are far apart.',
    hint: 'Think about which state keeps its own shape — that is the one with the tightest packing.',
    difficulty: 'foundation',
  },
  {
    id: 'ch4',
    nodeId: NODE_C6_CHEM_003,
    type: 'classify',
    title: 'Physical or Chemical Change?',
    question: 'Ice melting into water is what type of change?',
    options: ['Chemical change — new substance formed', 'Physical change — same substance, different state', 'Both physical and chemical', 'Neither — nothing happened'],
    correctIndex: 1,
    explanation: 'Ice melting is a physical change. The substance is still water (H₂O), just in liquid form instead of solid. No new substance was created. You can freeze it back into ice.',
    hint: 'Can you reverse it? If yes, it is likely a physical change.',
    difficulty: 'standard',
  },
  {
    id: 'ch5',
    nodeId: NODE_C6_CHEM_004,
    type: 'classify',
    title: 'Identify the Chemical Change',
    question: 'Which of these is a CHEMICAL change?',
    options: ['Dissolving sugar in water', 'Melting butter', 'Burning a piece of wood', 'Boiling water to make steam'],
    correctIndex: 2,
    explanation: 'Burning wood produces ash, smoke, and gases — completely new substances. This is a chemical change. The other options are physical changes — the substance stays the same.',
    hint: 'Look for a new substance being formed. Burning always creates new substances.',
    difficulty: 'standard',
  },
  {
    id: 'ch6',
    nodeId: NODE_C6_CHEM_005,
    type: 'match',
    title: 'Match the Element Symbol',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctIndex: 2,
    explanation: 'Au comes from the Latin word "aurum" meaning gold. Ag is silver (argentum). Chemical symbols often come from Latin names, not English ones.',
    hint: 'The symbol for gold comes from its ancient Latin name, not English.',
    difficulty: 'standard',
  },
  {
    id: 'ch7',
    nodeId: NODE_C6_CHEM_006,
    type: 'classify',
    title: 'Element or Compound?',
    question: 'Water (H₂O) is an example of a:',
    options: ['Element — made of one kind of atom', 'Compound — two or more elements chemically combined', 'Mixture — elements physically mixed', 'Neither — it is not a pure substance'],
    correctIndex: 1,
    explanation: 'Water is a compound. It is made of two elements — hydrogen (H) and oxygen (O) — chemically combined in a fixed ratio of 2:1. You cannot separate them by physical methods.',
    hint: 'Water has two different types of atoms bonded together in a fixed ratio.',
    difficulty: 'advanced',
  },
  {
    id: 'ch8',
    nodeId: NODE_C6_CHEM_007,
    type: 'sort',
    title: 'Mixture or Pure Substance?',
    question: 'Which of the following is a MIXTURE (not a pure substance)?',
    options: ['Distilled water', 'Oxygen gas', 'Salt water', 'Iron filings'],
    correctIndex: 2,
    explanation: 'Salt water is a mixture — salt and water are physically combined and can be separated by evaporation. Distilled water is a pure compound. Oxygen and iron are pure elements.',
    hint: 'A mixture combines substances that can be separated by physical methods.',
    difficulty: 'advanced',
  },
  {
    id: 'ch9',
    nodeId: NODE_C6_CHEM_008,
    type: 'match',
    title: 'Choose the Separation Method',
    question: 'How would you separate salt from salt water?',
    options: ['Filtration', 'Evaporation', 'Magnetic separation', 'Using a separating funnel'],
    correctIndex: 1,
    explanation: 'Evaporation separates salt from water. When you heat salt water, the water evaporates (turns to gas) and the salt is left behind as solid crystals.',
    hint: 'Think about what happens when you leave salt water in the sun — the water disappears and the salt remains.',
    difficulty: 'advanced',
  },
  {
    id: 'ch10',
    nodeId: NODE_C6_CHEM_002,
    type: 'predict',
    title: 'Particle Movement Prediction',
    question: 'If you heat a gas, what happens to its particles?',
    options: ['They slow down and get closer', 'They speed up and spread further apart', 'They stop moving entirely', 'They turn into a liquid immediately'],
    correctIndex: 1,
    explanation: 'Heating a gas gives particles more energy. They move faster and spread further apart. This is why a sealed container of gas can explode if heated — the particles push harder against the walls.',
    hint: 'Heat means energy. More energy means faster movement.',
    difficulty: 'advanced',
  },
];

// ─── MISCONCEPTIONS ───
const MISCONCEPTIONS = [
  {
    nodeId: NODE_C6_CHEM_001,
    misconception: 'Air is not matter because we cannot see it',
    correction: 'Air IS matter. A filled balloon is heavier than an empty one (mass) and it expands (volume). Invisible does not mean not matter.',
  },
  {
    nodeId: NODE_C6_CHEM_002,
    misconception: 'Particles in solids do not move at all',
    correction: 'Particles in solids vibrate in place. They do have energy and movement, but they stay in their fixed positions.',
  },
  {
    nodeId: NODE_C6_CHEM_003,
    misconception: 'Dissolving sugar means it disappeared',
    correction: 'Sugar does not disappear. Its particles spread through the water. The total mass stays the same — you can get the sugar back by evaporating the water.',
  },
  {
    nodeId: NODE_C6_CHEM_004,
    misconception: 'All color changes are chemical changes',
    correction: 'Not all color changes are chemical. Adding food coloring to water changes color but is a physical change. A chemical change produces a NEW substance with different properties.',
  },
  {
    nodeId: NODE_C6_CHEM_005,
    misconception: 'Elements and compounds are the same',
    correction: 'Elements are made of one kind of atom (like gold). Compounds are made of two or more elements chemically bonded (like water = H + O).',
  },
];

// ─── DEFAULT PROPS ───
interface SimProps {
  onComplete?: (score: number) => void;
  enrichmentData?: {
    misconceptions?: typeof MISCONCEPTIONS;
    diagnosticQuestions?: Array<{ q: string; a: string }>;
  };
}

const DEFAULT_PROPS: SimProps = {
  onComplete: (score: number) => {},
  enrichmentData: {
    misconceptions: MISCONCEPTIONS,
    diagnosticQuestions: [
      { q: 'Define matter and give two examples.', a: 'Matter is anything that has mass and occupies space. Examples: stone, water, air.' },
      { q: 'Why is a shadow not matter?', a: 'A shadow has no mass and no volume. It is just absence of light.' },
      { q: 'What are the three states of matter?', a: 'Solid, liquid, and gas.' },
      { q: 'Is dissolving salt in water a physical or chemical change?', a: 'Physical change — no new substance is formed.' },
      { q: 'What is an element?', a: 'A pure substance made of only one kind of atom.' },
      { q: 'What is a compound? Give an example.', a: 'Two or more elements chemically combined in fixed ratio. Example: water (H₂O).' },
      { q: 'How is a mixture different from a compound?', a: 'In a mixture, substances are physically combined and can be separated. In a compound, elements are chemically bonded.' },
      { q: 'How do you separate salt from water?', a: 'By evaporation — water turns to gas, salt remains.' },
    ],
  },
};

// ─── VISUAL COMPONENT: Particle Model (Canvas) ───
function ParticleModelCanvas({ state }: { state: 'solid' | 'liquid' | 'gas' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = [];

    const config = {
      solid: { count: 36, speed: 0.2, spacing: 50, jitter: 2 },
      liquid: { count: 30, speed: 1.5, spacing: 45, jitter: 10 },
      gas: { count: 12, speed: 3, spacing: 80, jitter: 30 },
    };

    const cfg = config[state];
    const cols = 6;
    const startX = 60;
    const startY = 40;

    for (let i = 0; i < cfg.count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      particles.push({
        x: startX + col * cfg.spacing + (state === 'gas' ? Math.random() * 200 : 0),
        y: startY + row * cfg.spacing + (state === 'gas' ? Math.random() * 150 : 0),
        vx: (Math.random() - 0.5) * cfg.speed,
        vy: (Math.random() - 0.5) * cfg.speed,
        r: state === 'solid' ? 12 : state === 'liquid' ? 10 : 8,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        if (state !== 'solid') {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < p.r || p.x > canvas.width - p.r) p.vx *= -1;
          if (p.y < p.r || p.y > canvas.height - p.r) p.vy *= -1;

          if (state === 'liquid') {
            if (p.x < 20) p.vx = Math.abs(p.vx);
            if (p.x > canvas.width - 20) p.vx = -Math.abs(p.vx);
            if (p.y < 20) p.vy = Math.abs(p.vy);
            if (p.y > canvas.height - 20) p.vy = -Math.abs(p.vy);
          }
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, '#10b981');
        grad.addColorStop(1, '#059669');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (state === 'solid') {
          ctx.strokeStyle = '#34d39944';
          ctx.lineWidth = 2;
          const col = particles.indexOf(p) % cols;
          const row = Math.floor(particles.indexOf(p) / cols);
          if (col < cols - 1 && particles.indexOf(p) + 1 < particles.length) {
            const next = particles[particles.indexOf(p) + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
          }
          if (row < Math.ceil(cfg.count / cols) - 1 && particles.indexOf(p) + cols < particles.length) {
            const below = particles[particles.indexOf(p) + cols];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(below.x, below.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [state]);

  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={240}
      className="rounded-lg shadow-inner border border-emerald-800/30"
      style={{ background: '#1a1a2e' }}
    />
  );
}

// ─── VISUAL COMPONENT: Element Tiles (SVG) ───
function ElementTilesSVG() {
  const elements = [
    { symbol: 'H', name: 'Hydrogen', color: '#fbbf24', type: 'Non-metal' },
    { symbol: 'O', name: 'Oxygen', color: '#fbbf24', type: 'Non-metal' },
    { symbol: 'C', name: 'Carbon', color: '#fbbf24', type: 'Non-metal' },
    { symbol: 'N', name: 'Nitrogen', color: '#fbbf24', type: 'Non-metal' },
    { symbol: 'Fe', name: 'Iron', color: '#60a5fa', type: 'Metal' },
    { symbol: 'Au', name: 'Gold', color: '#60a5fa', type: 'Metal' },
    { symbol: 'Cu', name: 'Copper', color: '#60a5fa', type: 'Metal' },
    { symbol: 'Ag', name: 'Silver', color: '#60a5fa', type: 'Metal' },
  ];

  return (
    <svg width={360} height={180} className="rounded-lg shadow-inner">
      <rect width={360} height={180} fill="#1a1a2e" rx={8} />
      {elements.map((el, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 20 + col * 85;
        const y = 20 + row * 75;
        return (
          <g key={el.symbol}>
            <rect x={x} y={y} width={70} height={60} rx={6} fill={el.color} opacity={0.2} stroke={el.color} strokeWidth={2} />
            <text x={x + 35} y={y + 28} textAnchor="middle" fill={el.color} fontSize={20} fontWeight="bold">
              {el.symbol}
            </text>
            <text x={x + 35} y={y + 45} textAnchor="middle" fill={el.color} fontSize={9} opacity={0.8}>
              {el.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── VISUAL COMPONENT: State Change Diagram (SVG) ───
function StateChangeSVG() {
  return (
    <svg width={360} height={160} className="rounded-lg shadow-inner">
      <rect width={360} height={160} fill="#1a1a2e" rx={8} />

      {/* Ice (solid) */}
      <g transform="translate(20, 30)">
        <rect width={70} height={70} rx={6} fill="#93c5fd33" stroke="#93c5fd" strokeWidth={2} />
        <text x={35} y={90} textAnchor="middle" fill="#93c5fd" fontSize={12}>ICE</text>
        <text x={35} y={105} textAnchor="middle" fill="#93c5fd" fontSize={9}>Solid</text>
        {/* Packed circles */}
        {[15, 35, 55].map((cx, ci) =>
          [15, 35, 55].map((cy, ri) => (
            <circle key={`${ci}-${ri}`} cx={cx} cy={cy} r={8} fill="#93c5fd88" />
          ))
        )}
      </g>

      {/* Arrow 1 */}
      <g transform="translate(100, 65)">
        <line x1={0} y1={0} x2={30} y2={0} stroke="#fbbf24" strokeWidth={2} markerEnd="url(#arrow1)" />
        <text x={15} y={-8} textAnchor="middle" fill="#fbbf24" fontSize={9}>melt</text>
      </g>

      {/* Water (liquid) */}
      <g transform="translate(140, 30)">
        <rect width={70} height={70} rx={6} fill="#34d39933" stroke="#34d399" strokeWidth={2} />
        <text x={35} y={90} textAnchor="middle" fill="#34d399" fontSize={12}>WATER</text>
        <text x={35} y={105} textAnchor="middle" fill="#34d399" fontSize={9}>Liquid</text>
        {/* Looser circles */}
        <circle cx={20} cy={20} r={8} fill="#34d39988" />
        <circle cx={45} cy={30} r={8} fill="#34d39988" />
        <circle cx={30} cy={50} r={8} fill="#34d39988" />
        <circle cx={55} cy={55} r={8} fill="#34d39988" />
      </g>

      {/* Arrow 2 */}
      <g transform="translate(220, 65)">
        <line x1={0} y1={0} x2={30} y2={0} stroke="#f87171" strokeWidth={2} markerEnd="url(#arrow2)" />
        <text x={15} y={-8} textAnchor="middle" fill="#f87171" fontSize={9}>boil</text>
      </g>

      {/* Steam (gas) */}
      <g transform="translate(260, 30)">
        <rect width={70} height={70} rx={6} fill="#fbbf2433" stroke="#fbbf24" strokeWidth={2} />
        <text x={35} y={90} textAnchor="middle" fill="#fbbf24" fontSize={12}>STEAM</text>
        <text x={35} y={105} textAnchor="middle" fill="#fbbf24" fontSize={9}>Gas</text>
        {/* Spread circles */}
        <circle cx={15} cy={15} r={6} fill="#fbbf2488" />
        <circle cx={50} cy={25} r={6} fill="#fbbf2488" />
        <circle cx={35} cy={45} r={6} fill="#fbbf2488" />
        <circle cx={60} cy={55} r={6} fill="#fbbf2488" />
        <circle cx={20} cy={60} r={6} fill="#fbbf2488" />
      </g>

      <defs>
        <marker id="arrow1" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#fbbf24" />
        </marker>
        <marker id="arrow2" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#f87171" />
        </marker>
      </defs>
    </svg>
  );
}

// ─── VISUAL COMPONENT: Composition Chart (SVG) ───
function CompositionChartSVG() {
  return (
    <svg width={360} height={200} className="rounded-lg shadow-inner">
      <rect width={360} height={200} fill="#1a1a2e" rx={8} />

      {/* Matter circle */}
      <circle cx={180} cy={100} r={85} fill="#10b98122" stroke="#10b981" strokeWidth={2} />
      <text x={180} y={30} textAnchor="middle" fill="#10b981" fontSize={14} fontWeight="bold">MATTER</text>
      <text x={180} y={48} textAnchor="middle" fill="#10b981" fontSize={10}>has mass + volume</text>

      {/* Solids */}
      <g transform="translate(110, 70)">
        <rect width={50} height={50} rx={4} fill="#60a5fa44" stroke="#60a5fa" strokeWidth={1.5} />
        <text x={25} y={30} textAnchor="middle" fill="#60a5fa" fontSize={10}>Solid</text>
      </g>

      {/* Liquids */}
      <g transform="translate(170, 70)">
        <rect width={50} height={50} rx={4} fill="#34d39944" stroke="#34d399" strokeWidth={1.5} />
        <text x={25} y={30} textAnchor="middle" fill="#34d399" fontSize={10}>Liquid</text>
      </g>

      {/* Gases */}
      <g transform="translate(230, 70)">
        <rect width={50} height={50} rx={4} fill="#fbbf2444" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={25} y={30} textAnchor="middle" fill="#fbbf24" fontSize={10}>Gas</text>
      </g>

      {/* NOT matter */}
      <g transform="translate(30, 140)">
        <rect width={80} height={40} rx={4} fill="#ef444422" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4,2" />
        <text x={40} y={25} textAnchor="middle" fill="#ef4444" fontSize={9}>NOT matter</text>
      </g>
      <text x={70} y={130} textAnchor="middle" fill="#ef4444" fontSize={8}>light, heat, shadow</text>

      {/* Examples */}
      <text x={180} y={155} textAnchor="middle" fill="#94a3b8" fontSize={8}>Examples: stone, water, air</text>
    </svg>
  );
}

// ─── VISUAL COMPONENT: Chemical Change (SVG) ───
function ChemicalChangeSVG() {
  return (
    <svg width={360} height={160} className="rounded-lg shadow-inner">
      <rect width={360} height={160} fill="#1a1a2e" rx={8} />

      {/* Wood */}
      <g transform="translate(20, 40)">
        <rect width={80} height={60} rx={6} fill="#92400e88" stroke="#92400e" strokeWidth={2} />
        <text x={40} y={35} textAnchor="middle" fill="#fbbf24" fontSize={12}>WOOD</text>
        <text x={40} y={50} textAnchor="middle" fill="#fbbf24" fontSize={9}>reactant</text>
      </g>

      {/* Arrow with flame */}
      <g transform="translate(110, 60)">
        <line x1={0} y1={10} x2={50} y2={10} stroke="#f87171" strokeWidth={2} markerEnd="url(#flame)" />
        <text x={25} y={0} textAnchor="middle" fill="#f87171" fontSize={16}>🔥</text>
        <text x={25} y={30} textAnchor="middle" fill="#f87171" fontSize={9}>burn</text>
      </g>

      {/* Ash + Smoke */}
      <g transform="translate(180, 30)">
        <rect width={60} height={40} rx={4} fill="#6b728088" stroke="#6b7280" strokeWidth={2} />
        <text x={30} y={25} textAnchor="middle" fill="#d1d5db" fontSize={11}>ASH</text>
      </g>
      <g transform="translate(180, 80)">
        <rect width={60} height={30} rx={4} fill="#37415188" stroke="#374151" strokeWidth={2} />
        <text x={30} y={20} textAnchor="middle" fill="#9ca3af" fontSize={10}>SMOKE</text>
      </g>

      {/* New substances label */}
      <text x={290} y={60} textAnchor="middle" fill="#f87171" fontSize={9}>NEW</text>
      <text x={290} y={72} textAnchor="middle" fill="#f87171" fontSize={9}>substances</text>

      <defs>
        <marker id="flame" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#f87171" />
        </marker>
      </defs>
    </svg>
  );
}

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Gases Do Not Have Any Mass or Weight",
    description: "Students often believe that air and other gases have no mass because they are invisible and float freely around us. They assume only solids and liquids count as matter with measurable weight.",
    correction: "Air and all gases are matter, meaning they possess mass and occupy space. When a balloon is inflated with air, it becomes heavier than a deflated balloon, demonstrating gas mass. The invisible particles of gas still have weight, even though they are spread far apart.",
  },
  {
    id: "misc_2",
    title: "Fine Powders and Granules Are Liquids",
    description: "Students frequently classify granulated substances like salt, sugar, or sand as liquids because they can be poured and take the shape of their container. They confuse the collective behavior of small solids with liquid flow.",
    correction: "Granules of salt or sand are small individual solids, each maintaining a fixed shape and definite volume. While a collection of granules flows together, a single grain does not change its shape to match the container. Therefore, powders are classified as solids, not liquids.",
  },
  {
    id: "misc_3",
    title: "Dissolved Substances Disappear and Stop Existing",
    description: "When a solid like sugar or salt dissolves completely in water, students think the solid has disappeared and no longer exists. They believe dissolving is a process where matter is destroyed.",
    correction: "Dissolving is a physical change where solid particles break apart and spread evenly between liquid particles without being destroyed. The dissolved substance retains its chemical identity and mass, which can be proven by tasting the solution or evaporating the liquid to recover the solid. Thus, total mass is conserved during dissolution.",
  },
  {
    id: "misc_4",
    title: "Compounds Retain Properties of Their Constituent Elements",
    description: "Students often think that a compound like water retains the individual properties of hydrogen and oxygen, just as a mixture does. They assume chemical combining is identical to physical mixing.",
    correction: "In a compound, elements combine chemically in a fixed ratio to form an entirely new substance with unique properties. For example, explosive hydrogen gas and oxygen gas combine to form water, which extinguishes fires. Unlike physical mixtures, constituent elements lose their original properties when forming a compound.",
  },
  {
    id: "misc_5",
    title: "Changes of State Are Chemical Changes",
    description: "Students often assume that changing state from ice to water produces a brand-new chemical substance because the appearance changes dramatically. They view state changes as irreversible chemical reactions.",
    correction: "Phase changes like melting, freezing, and boiling are physical changes because no new substance is formed. Ice, liquid water, and steam are all composed of the exact same chemical molecules. Only the energy and distance between the particles change during these reversible processes.",
  },
];

// ─── MAIN COMPONENT ───
export default function C6_ChemistryMatteranditscompositionSim(props: SimProps = DEFAULT_PROPS) {
  const { onComplete } = props;
  const [viewMode, setViewMode] = useState<'discovery' | 'slides' | 'challenges' | 'summary'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(100);
  const [errors, setErrors] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });
  const [particleState, setParticleState] = useState<'solid' | 'liquid' | 'gas'>('solid');
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>({});
  const [masteryLevels, setMasteryLevels] = useState<Record<string, string>>({});
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  const [challengeResults, setChallengeResults] = useState<Record<string, boolean>>({});

  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subjectConfig = SUBJECT_CONFIG['chem'] || { name: 'Chemistry', emoji: '⚗️', color: '#10b981' };

  // Initialize BKT states
  useEffect(() => {
    const states: Record<string, ReturnType<typeof createBKTState>> = {};
    const levels: Record<string, string> = {};
    for (const nodeId of ALL_NODE_IDS) {
      states[nodeId] = createBKTState();
      levels[nodeId] = 'not-started';
    }
    setBktStates(states);
    setMasteryLevels(levels);

    speechManager.speak('Welcome to the Matter Mystery Laboratory! Let us explore what everything is made of.');
    audioManager.play('whoosh');
  }, []);

  // Auto-hint after 10s inactivity
  const resetHintTimer = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 10000);
  }, []);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [resetHintTimer, currentChallenge, currentSlide, viewMode]);

  // Handle discovery question answer
  const handleDiscoveryAnswer = (idx: number) => {
    audioManager.play('tap');
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Air is matter because it has mass and occupies space.');
      setShowSparkle(true);
      setSparklePos({ x: 300, y: 200 });
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Remember: matter has both mass and volume.');
      setShowHint(true);
      audioManager.play('hint');
      return;
    }
    setTimeout(() => {
      setViewMode('slides');
      audioManager.play('whoosh');
    }, 1500);
  };

  // Handle slide navigation
  const nextSlide = () => {
    audioManager.play('whoosh');
    if (currentSlide < TEACHING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
      const slide = TEACHING_SLIDES[currentSlide + 1];
      speechManager.speak(slide.title);
    } else {
      setViewMode('challenges');
      speechManager.speak('Time for challenges! Let us test what you have learned.');
      audioManager.play('chime');
    }
  };

  const prevSlide = () => {
    audioManager.play('tap');
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  // Handle challenge answer
  const handleChallengeAnswer = (idx: number) => {
    if (showResult) return;
    audioManager.play('tap');
    setSelectedAnswer(idx);
    setShowResult(true);

    const challenge = CHALLENGES[currentChallenge];
    const isCorrect = idx === challenge.correctIndex;

    // Update BKT
    const bktState = bktStates[challenge.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(bktState, isCorrect);
    const mastery = getMasteryLevel(updatedBkt.pKnown);
    setBktStates(prev => ({ ...prev, [challenge.nodeId]: updatedBkt }));
    setMasteryLevels(prev => ({ ...prev, [challenge.nodeId]: mastery }));

    // Update challenge results
    setChallengeResults(prev => ({ ...prev, [challenge.id]: isCorrect }));

    // Update SM-2 spaced repetition
    const reviewItem = createReviewItem(challenge.nodeId, challenge.title);
    const quality = isCorrect ? 5 : 2;
    sm2Update(reviewItem, quality, 0);

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Correct! Well done.');
      setShowConfetti(true);
      setShowSparkle(true);
      setSparklePos({ x: 300, y: 250 });
      setTimeout(() => {
        setShowConfetti(false);
        setShowSparkle(false);
      }, 2000);
      setCompletedNodes(prev => new Set(prev).add(challenge.nodeId));
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Let us look at the explanation.');
      setErrors(errors + 1);
      setScore(Math.max(0, 100 - (errors + 1) * 5));
      setShowHint(true);
      audioManager.play('hint');
    }
  };

  // Next challenge
  const nextChallenge = () => {
    audioManager.play('whoosh');
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);

    if (currentChallenge < CHALLENGES.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
    } else {
      // All challenges done
      setViewMode('summary');
      speechManager.speak('All challenges complete! Let us see your results.');
      audioManager.play('celebration');
      setShowSuccess(true);
      setShowConfetti(true);

      // Record scores
      for (const nodeId of ALL_NODE_IDS) {
        recordGameScore([nodeId], score);
      }

      if (onComplete) onComplete(score);
    }
  };

  // Get adaptive difficulty
  const getAdaptiveDifficulty = (): 'foundation' | 'standard' | 'advanced' => {
    const challenge = CHALLENGES[currentChallenge];
    if (!challenge) return 'foundation';
    const mastery = masteryLevels[challenge.nodeId];
    if (mastery === 'mastered' || mastery === 'proficient') return 'advanced';
    if (mastery === 'developing') return 'standard';
    return challenge.difficulty;
  };

  // Render visual based on slide type
  const renderSlideVisual = (visualType: string) => {
    switch (visualType) {
      case 'particle-model':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2 mb-2">
              {(['solid', 'liquid', 'gas'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => {
                    setParticleState(s);
                    audioManager.play('tap');
                    speechManager.speak(`${s} state selected.`);
                  }}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    particleState === s
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <ParticleModelCanvas state={particleState} />
            <p className="text-xs text-gray-400 text-center max-w-xs">
              {particleState === 'solid' && 'Particles are tightly packed in a fixed pattern. They vibrate but stay in place.'}
              {particleState === 'liquid' && 'Particles are close but can slide past each other. Liquids flow and take the shape of their container.'}
              {particleState === 'gas' && 'Particles are far apart and move freely. Gases spread to fill any container.'}
            </p>
          </div>
        );
      case 'state-change':
        return <StateChangeSVG />;
      case 'chemical-change':
        return <ChemicalChangeSVG />;
      case 'element-tiles':
        return <ElementTilesSVG />;
      case 'composition-chart':
        return <CompositionChartSVG />;
      default:
        return <CompositionChartSVG />;
    }
  };

  const progress = viewMode === 'slides'
    ? ((currentSlide + 1) / TEACHING_SLIDES.length) * 100
    : viewMode === 'challenges'
    ? ((currentChallenge + 1) / CHALLENGES.length) * 100
    : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span>{subjectConfig.emoji}</span>
              {SCENARIO.title}
            </h1>
            <p className="text-sm text-gray-400 mt-1">{SCENARIO.context}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white">Score: {score}</div>
            <div className="text-xs text-gray-400">Errors: {errors}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>
              {viewMode === 'slides' && `Slide ${currentSlide + 1}/${TEACHING_SLIDES.length}`}
              {viewMode === 'challenges' && `Challenge ${currentChallenge + 1}/${CHALLENGES.length}`}
              {viewMode === 'discovery' && 'Discovery'}
              {viewMode === 'summary' && 'Complete'}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Discovery Mode */}
        {viewMode === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-emerald-800/30"
          >
            <h2 className="text-xl font-bold text-white mb-2">🤔 Discovery Question</h2>
            <p className="text-gray-300 mb-4">{SCENARIO.intro}</p>
            <div className="bg-emerald-900/20 rounded-xl p-4 mb-4">
              <p className="text-white font-medium mb-4">{DISCOVERY_QUESTION.question}</p>
              <div className="space-y-2">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    className="w-full text-left px-4 py-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-200 transition-colors border border-transparent hover:border-emerald-600/50"
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </motion.button>
                ))}
              </div>
            </div>
            <HintBubble show={showHint} text={DISCOVERY_QUESTION.hintAfter} />
          </motion.div>
        )}

        {/* Slides Mode */}
        {viewMode === 'slides' && (
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-emerald-800/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-emerald-400">
                📖 {TEACHING_SLIDES[currentSlide].title}
              </h2>
              <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                {TEACHING_SLIDES[currentSlide].nodeId}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-300 leading-relaxed">{TEACHING_SLIDES[currentSlide].content}</p>
              </div>
              <div className="flex items-center justify-center">
                {renderSlideVisual(TEACHING_SLIDES[currentSlide].visualType)}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 disabled:opacity-30 hover:bg-gray-600 transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={nextSlide}
                className="px-6 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors font-medium"
              >
                {currentSlide < TEACHING_SLIDES.length - 1 ? 'Next →' : 'Start Challenges →'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Challenges Mode */}
        {viewMode === 'challenges' && (
          <motion.div
            key={currentChallenge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-emerald-800/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                🧪 {CHALLENGES[currentChallenge].title}
              </h2>
              <span className={`text-xs px-2 py-1 rounded ${
                getAdaptiveDifficulty() === 'foundation' ? 'bg-gold-900/50 text-gold-300' :
                getAdaptiveDifficulty() === 'standard' ? 'bg-yellow-900/50 text-yellow-300' :
                'bg-red-900/50 text-red-300'
              }`}>
                {getAdaptiveDifficulty()}
              </span>
            </div>

            <p className="text-gray-300 mb-4">{CHALLENGES[currentChallenge].question}</p>

            <div className="space-y-2 mb-4">
              {CHALLENGES[currentChallenge].options.map((opt, idx) => {
                const isCorrect = idx === CHALLENGES[currentChallenge].correctIndex;
                const isSelected = idx === selectedAnswer;
                let className = 'w-full text-left px-4 py-3 rounded-lg transition-colors border ';

                if (showResult) {
                  if (isCorrect) {
                    className += 'bg-emerald-900/50 border-emerald-500 text-emerald-200';
                  } else if (isSelected) {
                    className += 'bg-red-900/50 border-red-500 text-red-200';
                  } else {
                    className += 'bg-gray-700/30 border-transparent text-gray-500';
                  }
                } else {
                  className += 'bg-gray-700/50 hover:bg-gray-700 text-gray-200 border-transparent hover:border-emerald-600/50';
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleChallengeAnswer(idx)}
                    disabled={showResult}
                    className={className}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                    {showResult && isCorrect && ' ✓'}
                    {showResult && isSelected && !isCorrect && ' ✗'}
                  </motion.button>
                );
              })}
            </div>

            {/* Result explanation */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4"
              >
                <div className={`rounded-lg p-4 ${
                  selectedAnswer === CHALLENGES[currentChallenge].correctIndex
                    ? 'bg-emerald-900/30 border border-emerald-700/50'
                    : 'bg-red-900/30 border border-red-700/50'
                }`}>
                  <p className="text-sm text-gray-300">
                    <strong className={selectedAnswer === CHALLENGES[currentChallenge].correctIndex ? 'text-emerald-400' : 'text-red-400'}>
                      {selectedAnswer === CHALLENGES[currentChallenge].correctIndex ? 'Correct! ' : 'Incorrect. '}
                    </strong>
                    {CHALLENGES[currentChallenge].explanation}
                  </p>
                </div>
              </motion.div>
            )}

            <HintBubble show={showHint} text={CHALLENGES[currentChallenge]?.hint || ''} />

            {showResult && (
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextChallenge}
                  className="px-6 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors font-medium"
                >
                  {currentChallenge < CHALLENGES.length - 1 ? 'Next Challenge →' : 'See Results →'}
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* Summary Mode */}
        {viewMode === 'summary' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-emerald-800/30 text-center"
          >
            <h2 className="text-3xl font-bold text-emerald-400 mb-4">🎉 Laboratory Complete!</h2>
            <p className="text-gray-300 mb-6">You explored matter, particles, changes, elements, compounds, and mixtures.</p>

            <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
              <div className="bg-gray-700/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-emerald-400">{score}</div>
                <div className="text-xs text-gray-400">Final Score</div>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-gold-400">{CHALLENGES.length - errors}</div>
                <div className="text-xs text-gray-400">Correct</div>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-red-400">{errors}</div>
                <div className="text-xs text-gray-400">Errors</div>
              </div>
            </div>

            {/* Node mastery summary */}
            <div className="bg-gray-700/30 rounded-xl p-4 mb-6 max-w-md mx-auto">
              <h3 className="text-sm font-bold text-gray-300 mb-2">Nodes Covered</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {ALL_NODE_IDS.map(nid => (
                  <span
                    key={nid}
                    className={`text-xs px-2 py-1 rounded ${
                      completedNodes.has(nid)
                        ? 'bg-emerald-900/50 text-emerald-300'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {nid}
                  </span>
                ))}
              </div>
            </div>

            {/* Real-world activity */}
            <div className="bg-emerald-900/20 rounded-xl p-4 max-w-md mx-auto mb-6">
              <h3 className="text-sm font-bold text-emerald-400 mb-2">🌍 Real-World Activity</h3>
              <p className="text-xs text-gray-300">
                Go to your kitchen. Find 5 items and classify each as: solid, liquid, or gas.
                Then identify if each is an element, compound, or mixture.
                Write your answers in a notebook and discuss with a friend!
              </p>
            </div>

            <button
              onClick={() => {
                audioManager.play('tap');
                speechManager.speak('Great work! You are now a matter expert.');
                audioManager.play('celebration');
                if (onComplete) onComplete(score);
              }}
              className="px-8 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors font-bold text-lg"
            >
              Finish ⚗️
            </button>
          </motion.div>
        )}

        {/* Feedback Components */}
        <Confetti show={showConfetti} />
        <SuccessBanner show={showSuccess} text="All Challenges Complete!" />
        <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

        {/* Misconception Checklist */}
        <div className="text-left space-y-3 pt-4 border-t border-slate-800 mt-6">
          <h3 className="text-sm font-bold text-amber-300">Common Misconception Checklist:</h3>
          <div className="grid grid-cols-1 gap-2">
            {MISCONCEPTIONS_CHECKLIST.map((m) => (
              <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
                <div className="font-bold text-rose-400">{m.title}</div>
                <div className="text-slate-400">{m.description}</div>
                <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
