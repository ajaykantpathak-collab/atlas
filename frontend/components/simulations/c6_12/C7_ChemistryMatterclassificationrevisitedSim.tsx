"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ---------------------------------------------------------------------------
// NODE IDENTIFIERS & METADATA
// ---------------------------------------------------------------------------

const NODE_C7_CHEM_001 = 'c7_chem_001';
const NODE_C7_CHEM_002 = 'c7_chem_002';
const NODE_C7_CHEM_003 = 'c7_chem_003';
const NODE_C7_CHEM_004 = 'c7_chem_004';
const NODE_C7_CHEM_005 = 'c7_chem_005';
const NODE_C7_CHEM_006 = 'c7_chem_006';
const NODE_C7_CHEM_007 = 'c7_chem_007';
const NODE_C7_CHEM_008 = 'c7_chem_008';

const ALL_NODE_IDS = [
  NODE_C7_CHEM_001,
  NODE_C7_CHEM_002,
  NODE_C7_CHEM_003,
  NODE_C7_CHEM_004,
  NODE_C7_CHEM_005,
  NODE_C7_CHEM_006,
  NODE_C7_CHEM_007,
  NODE_C7_CHEM_008,
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

const NODE_TITLES: Record<NodeId, string> = {
  [NODE_C7_CHEM_001]: 'Matter - Classification Revisited',
  [NODE_C7_CHEM_002]: 'Kinetic Theory of Matter',
  [NODE_C7_CHEM_003]: 'Physical Changes - Reversible & Irreversible',
  [NODE_C7_CHEM_004]: 'Chemical Changes - Characteristics',
  [NODE_C7_CHEM_005]: 'Chemical Reactions in Daily Life',
  [NODE_C7_CHEM_006]: 'Elements - Metals & Non-Metals Revisited',
  [NODE_C7_CHEM_007]: 'Compounds - Types & Formation',
  [NODE_C7_CHEM_008]: 'Mixtures - Homogeneous & Heterogeneous',
};

// ---------------------------------------------------------------------------
// TYPES & INTERFACES
// ---------------------------------------------------------------------------

type TabType = 'discovery' | 'slides' | 'lab' | 'challenges' | 'srs';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  color: string;
  radius: number;
}

interface Slide {
  id: number;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  badgeText: string;
  content: string[];
  eli5: string;
  keyTakeaway: string;
  visualType: 'kinetic' | 'classification' | 'reaction' | 'bonding' | 'mixture';
}

interface Challenge {
  id: number;
  nodeId: NodeId;
  title: string;
  instruction: string;
  questionText: string;
  type: 'mcq' | 'sort' | 'bonding' | 'lab_action';
  options?: string[];
  correctIndex?: number;
  sortItems?: { name: string; category: string }[];
  sortCategories?: string[];
  bondingType?: 'ionic' | 'covalent';
  hint: string;
  explanation: string;
  misconceptionId?: string;
}

interface ComponentProps {
  onComplete?: (score: number) => void;
  initialNodeId?: NodeId;
}

// ---------------------------------------------------------------------------
// KINETIC CANVAS SIMULATOR COMPONENT
// ---------------------------------------------------------------------------

interface KineticSimProps {
  temperature: number; // 0 (Ice) to 100 (Steam)
  stateMode: 'solid' | 'liquid' | 'gas';
  containerWidth?: number;
  containerHeight?: number;
}

const KineticMatterCanvas: React.FC<KineticSimProps> = ({
  temperature,
  stateMode,
  containerWidth = 360,
  containerHeight = 240,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particleCount = 36;
    const particles: Particle[] = [];

    // Create particles in a lattice for solid, or loose grid
    const cols = 6;
    const rows = 6;
    const spacingX = 30;
    const spacingY = 30;
    const startX = (containerWidth - cols * spacingX) / 2 + 15;
    const startY = containerHeight - rows * spacingY - 20;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bx = startX + c * spacingX;
        const by = startY + r * spacingY;
        particles.push({
          x: bx,
          y: by,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          baseX: bx,
          baseY: by,
          color: stateMode === 'solid' ? '#38bdf8' : stateMode === 'liquid' ? '#60a5fa' : '#f43f5e',
          radius: 8,
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, containerWidth, containerHeight);

      // Draw Container Box
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.strokeRect(10, 10, containerWidth - 20, containerHeight - 20);

      const speedFactor = 0.2 + (temperature / 100) * 3.5;

      particles.forEach((p) => {
        if (stateMode === 'solid') {
          // Vibrate around lattice position
          const jitter = (temperature / 20) * (Math.random() - 0.5) * 4;
          p.x = p.baseX + jitter;
          p.y = p.baseY + jitter;
        } else if (stateMode === 'liquid') {
          // Slide and stay near bottom
          p.x += p.vx * speedFactor;
          p.y += p.vy * speedFactor + 0.3; // subtle gravity

          // Keep in liquid region
          if (p.x < 25 || p.x > containerWidth - 25) p.vx *= -1;
          if (p.y < containerHeight - 120) p.vy = Math.abs(p.vy);
          if (p.y > containerHeight - 25) {
            p.y = containerHeight - 25;
            p.vy *= -1;
          }
        } else {
          // Gas - free movement all over box
          p.x += p.vx * speedFactor * 1.8;
          p.y += p.vy * speedFactor * 1.8;

          if (p.x < 25 || p.x > containerWidth - 25) p.vx *= -1;
          if (p.y < 25 || p.y > containerHeight - 25) p.vy *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = stateMode === 'gas' ? 8 : 3;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw particle motion tail in gas
        if (stateMode === 'gas') {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 4, p.y - p.vy * 4);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Draw Inter-particle Space / Attraction Overlay Text
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '12px sans-serif';
      ctx.fillText(
        stateMode === 'solid'
          ? 'Space: Very Small | Attraction: Strong | Motion: Vibration'
          : stateMode === 'liquid'
          ? 'Space: Moderate | Attraction: Medium | Motion: Sliding'
          : 'Space: Very Large | Attraction: Negligible | Motion: Rapid Random',
        20,
        28
      );

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [temperature, stateMode, containerWidth, containerHeight]);

  return (
    <div className="relative flex flex-col items-center bg-slate-900 p-3 rounded-xl border border-slate-700 shadow-inner">
      <canvas
        ref={canvasRef}
        width={containerWidth}
        height={containerHeight}
        className="rounded-lg bg-slate-950 shadow-md"
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// BONDING VISUALIZER COMPONENT
// ---------------------------------------------------------------------------

interface BondingVisualizerProps {
  type: 'ionic' | 'covalent';
  step: number;
  onStepChange?: (step: number) => void;
}

const BondingVisualizer: React.FC<BondingVisualizerProps> = ({ type, step, onStepChange }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-slate-100 flex flex-col items-center">
      <div className="text-sm font-semibold text-emerald-400 mb-2">
        {type === 'ionic' ? 'Ionic Bonding: Electron Transfer (Na + Cl → NaCl)' : 'Covalent Bonding: Electron Sharing (H₂O)'}
      </div>

      <div className="w-full h-48 relative flex items-center justify-around bg-slate-950 rounded-lg border border-slate-800 p-4 overflow-hidden">
        {type === 'ionic' ? (
          <>
            {/* Sodium Atom / Ion */}
            <motion.div
              className="flex flex-col items-center"
              animate={{ x: step >= 1 ? 20 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full border-2 border-amber-400 border-dashed flex items-center justify-center relative">
                <div className="w-10 h-10 rounded-full bg-amber-500/30 border border-amber-400 flex items-center justify-center text-xs font-bold text-amber-200">
                  {step >= 2 ? 'Na⁺' : 'Na'}
                </div>
                {/* Valence Electron */}
                {step < 2 && (
                  <motion.div
                    className="w-4 h-4 rounded-full bg-amber-400 absolute shadow-lg shadow-amber-400/50"
                    style={{ top: -8 }}
                    animate={step === 1 ? { x: 120, y: 10 } : {}}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                )}
              </div>
              <span className="text-xs text-amber-300 mt-2">
                {step >= 2 ? 'Na⁺ Ion (Lost 1 e⁻)' : 'Sodium Atom (1 Valence e⁻)'}
              </span>
            </motion.div>

            {/* Chlorine Atom / Ion */}
            <motion.div
              className="flex flex-col items-center"
              animate={{ x: step >= 1 ? -20 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 rounded-full border-2 border-emerald-400 border-dashed flex items-center justify-center relative">
                <div className="w-12 h-12 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-200">
                  {step >= 2 ? 'Cl⁻' : 'Cl'}
                </div>
                {/* Transferred electron attached */}
                {step >= 2 && (
                  <div className="w-4 h-4 rounded-full bg-amber-400 absolute top-0 right-2 ring-2 ring-emerald-300" />
                )}
              </div>
              <span className="text-xs text-emerald-300 mt-2">
                {step >= 2 ? 'Cl⁻ Ion (Gained 1 e⁻)' : 'Chlorine Atom (7 Valence e⁻)'}
              </span>
            </motion.div>
          </>
        ) : (
          <>
            {/* Covalent Water Molecule */}
            <div className="flex items-center justify-center relative w-full h-full">
              {/* Oxygen Center */}
              <motion.div
                className="w-24 h-24 rounded-full border-2 border-gold-400 bg-gold-950/60 flex items-center justify-center relative shadow-lg shadow-gold-500/20"
                animate={{ scale: step >= 1 ? 1.05 : 1 }}
              >
                <span className="text-xs font-bold text-gold-200">Oxygen (O)</span>

                {/* Hydrogen 1 */}
                <motion.div
                  className="w-16 h-16 rounded-full border-2 border-gold-400 bg-gold-950/70 absolute flex items-center justify-center"
                  style={{ left: -36, top: 20 }}
                  animate={{ x: step >= 1 ? 12 : 0 }}
                >
                  <span className="text-[10px] font-bold text-gold-200">H</span>
                  {/* Shared pair highlight */}
                  {step >= 1 && (
                    <div className="w-3 h-3 rounded-full bg-yellow-300 absolute right-0 top-6 ring-2 ring-gold-400 shadow-md animate-pulse" />
                  )}
                </motion.div>

                {/* Hydrogen 2 */}
                <motion.div
                  className="w-16 h-16 rounded-full border-2 border-gold-400 bg-gold-950/70 absolute flex items-center justify-center"
                  style={{ right: -36, top: 20 }}
                  animate={{ x: step >= 1 ? -12 : 0 }}
                >
                  <span className="text-[10px] font-bold text-gold-200">H</span>
                  {/* Shared pair highlight */}
                  {step >= 1 && (
                    <div className="w-3 h-3 rounded-full bg-yellow-300 absolute left-0 top-6 ring-2 ring-gold-400 shadow-md animate-pulse" />
                  )}
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            audioManager.play('tap');
            onStepChange?.(0);
          }}
          className={`px-3 py-1 rounded text-xs font-semibold ${
            step === 0 ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          1. Initial Atoms
        </button>
        <button
          onClick={() => {
            audioManager.play(type === 'ionic' ? 'whoosh' : 'sparkle');
            onStepChange?.(1);
          }}
          className={`px-3 py-1 rounded text-xs font-semibold ${
            step === 1 ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          {type === 'ionic' ? '2. Electron Transfer' : '2. Share Electron Pair'}
        </button>
        <button
          onClick={() => {
            audioManager.play('celebration');
            onStepChange?.(2);
          }}
          className={`px-3 py-1 rounded text-xs font-semibold ${
            step === 2 ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          3. Bonded Compound
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// TEACHING SLIDES DATA
// ---------------------------------------------------------------------------

const TEACHING_SLIDES: Slide[] = [
  {
    id: 1,
    nodeId: NODE_C7_CHEM_001,
    title: '1. Matter - Classification Revisited',
    subtitle: 'State Spectacles vs. Composition Spectacles',
    badgeText: 'c7_chem_001',
    content: [
      'Matter is anything that has mass and occupies space.',
      'By STATE: Solids have fixed shape & volume (vibrating particles packed tightly). Liquids flow and take container shape. Gases have high energy particles moving in all directions.',
      'By COMPOSITION: Pure Substances (Elements made of 1 kind of atom, Compounds made of chemically locked atoms in fixed ratio) vs. Mixtures (physically blended in variable ratio).',
    ],
    eli5: 'Think of matter as Lego blocks! One color of block alone is an Element. Two colors snapped together tightly in a set recipe is a Compound. A bucket of random loose blocks is a Mixture!',
    keyTakeaway: 'State is about physical particle spacing; Composition is about whether building blocks are chemically locked.',
    visualType: 'classification',
  },
  {
    id: 2,
    nodeId: NODE_C7_CHEM_002,
    title: '2. Kinetic Theory & Conservation of Mass',
    subtitle: 'Particles in Motion & Closed Reactions',
    badgeText: 'c7_chem_002',
    content: [
      'Postulates: All matter is made of tiny moving particles. Higher heat = faster movement.',
      'Inter-particle attraction is strongest in solids, moderate in liquids, and negligible in gases.',
      'Law of Conservation of Mass: Total mass of reactants = Total mass of products in a closed system (e.g. BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl remains exactly 125 g).',
    ],
    eli5: 'When ice melts, water molecules don’t disappear or turn into new particles—they just break out of their rigid lattice dance!',
    keyTakeaway: 'Heat increases kinetic energy. Matter rearranged in reactions never loses or gains mass overall.',
    visualType: 'kinetic',
  },
  {
    id: 3,
    nodeId: NODE_C7_CHEM_003,
    title: '3. Physical Changes: Reversible vs Irreversible',
    subtitle: 'Same Particles, New Arrangement',
    badgeText: 'c7_chem_003',
    content: [
      'Physical Change: Transformation where appearance changes, but NO new substance is formed.',
      'Reversible Physical Changes: Original state recovered by changing temperature/conditions (Melting ice, Sublimation of camphor, Dissolving salt in water).',
      'Irreversible Physical Changes: Shape or size permanently altered, but particles remain identical (Tearing paper, Breaking glass tumbler).',
    ],
    eli5: 'Cutting paper breaks the sheet, but the pieces are still paper! Freezing water turns it solid, but it is still H₂O!',
    keyTakeaway: 'If the chemical particle identity stays the same, it is a physical change—whether you can undo it or not!',
    visualType: 'reaction',
  },
  {
    id: 4,
    nodeId: NODE_C7_CHEM_004,
    title: '4. Chemical Changes & Their Characteristics',
    subtitle: 'Recognizing New Substances',
    badgeText: 'c7_chem_004',
    content: [
      'Chemical Change: Process converting substances into entirely NEW substances with different chemical properties.',
      '4 Characteristics: 1) Formation of new substance, 2) Irreversible colour change (e.g., silvery iron turning reddish-brown rust), 3) Gas evolution / odor, 4) Energy change (heat/light emitted or absorbed).',
      'Sublimation of camphor is PHYSICAL (camphor gas cools back to solid camphor), whereas curdling of milk is CHEMICAL (lactic acid creates sour new curd).',
    ],
    eli5: 'When milk turns into sour curd, you cannot un-sour it back into smooth milk—a brand new sour substance was made!',
    keyTakeaway: 'Always look for evidence of a NEW substance with new properties, not just a surface cosmetic change.',
    visualType: 'reaction',
  },
  {
    id: 5,
    nodeId: NODE_C7_CHEM_005,
    title: '5. Chemical Reactions in Daily Life',
    subtitle: 'Chemistry in Kitchens, Gardens & Bodies',
    badgeText: 'c7_chem_005',
    content: [
      'Rusting: Iron reacting slowly with oxygen & humidity to form flaky iron oxide (Fe₂O₃·nH₂O). Prevented by painting or galvanising.',
      'Cooking Roti: Raw dough heated on a tawa creates new aromatic brown compounds. Irreversible!',
      'Digestion & Burning: Stomach acids/enzymes break down food into simple glucose/amino acids; LPG gas burning releases CO₂, steam, heat & light.',
    ],
    eli5: 'Baking bread or rusting a gate are chemical reactions happening right around you every day!',
    keyTakeaway: 'Daily processes like digestion, cooking, and rusting are natural chemical factories.',
    visualType: 'reaction',
  },
  {
    id: 6,
    nodeId: NODE_C7_CHEM_006,
    title: '6. Elements: Metals, Non-Metals & Metalloids',
    subtitle: 'Properties & Physical Separation Principles',
    badgeText: 'c7_chem_006',
    content: [
      'Metals (Copper, Gold, Iron): Lustrous (shiny), malleable (hammered into sheets), ductile (wires), good conductors.',
      'Non-Metals (Sulphur, Oxygen): Dull, brittle, poor conductors (except graphite conductor!).',
      'Metalloids (Silicon, Boron): Intermediate properties, vital for electronics (computer chips).',
      'Separation Principle: Use physical differences (Magnetism for iron filings, Solubility for salt/sand, Density for oil/water).',
    ],
    eli5: 'Copper wire shines and bends to carry current. Yellow sulphur powder crumbles if you tap it. Silicon is the smart middle-child used in microchips!',
    keyTakeaway: 'Separation relies on physical property differences without breaking chemical bonds.',
    visualType: 'mixture',
  },
  {
    id: 7,
    nodeId: NODE_C7_CHEM_007,
    title: '7. Compounds: Types & Chemical Formation',
    subtitle: 'Ionic Transfer vs. Covalent Sharing',
    badgeText: 'c7_chem_007',
    content: [
      'Compounds form when 2+ different elements combine chemically in a fixed mass ratio.',
      'Ionic Bonding: Metal + Non-metal. Electron transfer creates positive and negative ions that attract strongly (e.g. NaCl table salt).',
      'Covalent Bonding: Non-metal + Non-metal. Atoms share electron pairs to become stable while remaining neutral overall (e.g. H₂O water, CO₂).',
    ],
    eli5: 'Ionic is giving away a marble so both players are happy. Covalent is sharing a blanket together on a cold night!',
    keyTakeaway: 'Metal + Non-metal = Ionic transfer; Non-metal + Non-metal = Covalent sharing.',
    visualType: 'bonding',
  },
  {
    id: 8,
    nodeId: NODE_C7_CHEM_008,
    title: '8. Mixtures: Homogeneous vs Heterogeneous',
    subtitle: 'Uniform Solutions vs. Separate Layers',
    badgeText: 'c7_chem_008',
    content: [
      'Homogeneous Mixture: Uniform composition throughout. Individual parts invisible (Salt solution, clean Air).',
      'Heterogeneous Mixture: Non-uniform composition with distinct visible phases/layers (Kerosene + Water, Sand + Water, CaCO₃ + NaCl).',
      'Separation Funnel separates immiscible liquids by density; Filtration + Evaporation separates CaCO₃ from NaCl.',
    ],
    eli5: 'Salt water looks completely smooth everywhere (Homogeneous). Kerosene floating on water shows two clear layers (Heterogeneous)!',
    keyTakeaway: 'Homogeneous mixtures look identical in every drop; Heterogeneous mixtures show separate parts or layers.',
    visualType: 'mixture',
  },
];

// ---------------------------------------------------------------------------
// ADAPTIVE CHALLENGES DATA (Mapped to all 8 nodes)
// ---------------------------------------------------------------------------

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    nodeId: NODE_C7_CHEM_001,
    title: 'Challenge 1: Classifying Matter',
    instruction: 'Identify the state and composition category of an Iron Nail and Tap Water.',
    questionText: 'An Iron Nail used in school carpentry is pure iron atoms. How is it classified by State and Composition?',
    type: 'mcq',
    options: [
      'Solid & Element',
      'Solid & Mixture',
      'Liquid & Compound',
      'Gas & Pure Substance',
    ],
    correctIndex: 0,
    hint: 'An iron nail has fixed shape (Solid) and contains only iron atoms (Element).',
    explanation: 'Correct! The iron nail has very small inter-particle space (Solid) and consists of only one type of atom (Element).',
    misconceptionId: 'm1_element_compound',
  },
  {
    id: 2,
    nodeId: NODE_C7_CHEM_002,
    title: 'Challenge 2: Mass Conservation in Flask',
    instruction: 'Predict reaction mass using the Kinetic Theory and Mass Conservation.',
    questionText: 'In a closed conical flask, 125 g of barium chloride and sodium sulphate solution react to form a white precipitate. What is the total mass after the reaction?',
    type: 'mcq',
    options: ['Exactly 125 g', '100 g (mass lost as precipitate)', '150 g (mass gained)', '0 g'],
    correctIndex: 0,
    hint: 'In a closed system, matter cannot be created or destroyed during a chemical reaction.',
    explanation: 'Spot on! The Law of Conservation of Mass guarantees that total reactant mass (125 g) equals total product mass (125 g).',
    misconceptionId: 'm2_mass_loss',
  },
  {
    id: 3,
    nodeId: NODE_C7_CHEM_003,
    title: 'Challenge 3: Physical Change Sorting',
    instruction: 'Sort the changes into Reversible vs Irreversible Physical Changes.',
    type: 'sort',
    questionText: 'Categorize each physical change correctly:',
    sortCategories: ['Reversible Physical Change', 'Irreversible Physical Change'],
    sortItems: [
      { name: 'Melting of Ice', category: 'Reversible Physical Change' },
      { name: 'Sublimation of Camphor', category: 'Reversible Physical Change' },
      { name: 'Dissolving Salt in Water', category: 'Reversible Physical Change' },
      { name: 'Cutting a Sheet of Paper', category: 'Irreversible Physical Change' },
      { name: 'Breaking a Glass Tumbler', category: 'Irreversible Physical Change' },
    ],
    hint: 'Reversible changes can regain their original form by reversing temperature/conditions; cutting/breaking permanently alters shape.',
    explanation: 'Excellent! Sublimation, melting, and dissolving are reversible physical changes. Cutting and breaking paper/glass are irreversible physical changes because no new substance is formed.',
  },
  {
    id: 4,
    nodeId: NODE_C7_CHEM_004,
    title: 'Challenge 4: Chemical Characteristics',
    instruction: 'Distinguish physical sublimation from chemical curdling/rusting.',
    questionText: 'Why is Sublimation of Camphor classified as a PHYSICAL change while Curdling of Milk is a CHEMICAL change?',
    type: 'mcq',
    options: [
      'Camphor vapour cools back to identical solid camphor (no new substance); Curdling forms new sour lactic acid curd.',
      'Camphor forms a new substance while milk does not.',
      'Both are chemical changes because both disappear.',
      'Curdling is reversible by freezing.',
    ],
    correctIndex: 0,
    hint: 'Check if the original substance can be recovered upon cooling without forming a new chemical entity.',
    explanation: 'Correct! Camphor vapour returns to solid camphor upon cooling (physical). Milk turning to curd creates new lactic acid compounds with sour taste and texture (chemical).',
    misconceptionId: 'm3_camphor_sublimation',
  },
  {
    id: 5,
    nodeId: NODE_C7_CHEM_005,
    title: 'Challenge 5: Daily Life Reactions',
    instruction: 'Analyze everyday household phenomena.',
    questionText: 'Which of the following pair represents ONLY chemical reactions in daily life?',
    type: 'mcq',
    options: [
      'Rusting of an iron gate & Digestion of food in the stomach',
      'Melting ice in nimbu pani & Ironing a cotton shirt',
      'Tearing paper into bits & Dissolving sugar in tea',
      'Boiling water in a kettle & Evaporating seawater',
    ],
    correctIndex: 0,
    hint: 'Look for examples where a new substance is permanently produced (e.g., rust oxide, digested nutrients).',
    explanation: 'Great job! Rusting forms iron oxide and digestion breaks food into simple new molecules. Both produce new substances!',
  },
  {
    id: 6,
    nodeId: NODE_C7_CHEM_006,
    title: 'Challenge 6: Mixture Separation Strategy',
    instruction: 'Design a step-by-step separation plan for Iron Filings + Sulphur + Salt.',
    questionText: 'What is the correct order of physical methods to separate a mixture of Iron Filings, Sulphur Powder, and Common Salt?',
    type: 'mcq',
    options: [
      '1. Use Magnet (removes Iron) -> 2. Add Water & Filter (leaves Sulphur residue) -> 3. Evaporate Filtrate (recovers Salt)',
      '1. Filter directly -> 2. Use Magnet -> 3. Distil',
      '1. Heat to burn sulphur -> 2. Filter -> 3. Magnet',
      '1. Add water first to dissolve Iron and Sulphur',
    ],
    correctIndex: 0,
    hint: 'Exploit physical differences: Magnetism for Iron, Solubility in water for Salt, Insoluble residue for Sulphur.',
    explanation: 'Perfect! Magnet pulls out magnetic iron. Water dissolves salt while sulphur remains insoluble. Filtering traps sulphur, and evaporating recovers salt crystals!',
  },
  {
    id: 7,
    nodeId: NODE_C7_CHEM_007,
    title: 'Challenge 7: Compound Bonding Identification',
    instruction: 'Determine bonding type based on element categories.',
    questionText: 'Sodium (Metal) reacts with Chlorine (Non-Metal) to form NaCl. Carbon (Non-Metal) reacts with Oxygen (Non-Metal) to form CO₂. Which bonding occurs in each?',
    type: 'mcq',
    options: [
      'NaCl = Ionic Bonding (electron transfer); CO₂ = Covalent Bonding (electron sharing)',
      'NaCl = Covalent Bonding; CO₂ = Ionic Bonding',
      'Both are Ionic Bonding',
      'Both are Covalent Bonding',
    ],
    correctIndex: 0,
    hint: 'Metal + Non-metal transfers electrons (Ionic). Non-metal + Non-metal shares electrons (Covalent).',
    explanation: 'Correct! Sodium transfers an electron to chlorine to form ionic NaCl. Carbon shares electron pairs with oxygen to form covalent CO₂.',
  },
  {
    id: 8,
    nodeId: NODE_C7_CHEM_008,
    title: 'Challenge 8: Mixture Type & Separation Tool',
    instruction: 'Classify Kerosene + Water and choose the correct separation tool.',
    questionText: 'A mixture of Kerosene and Water is shaken. It forms two clear layers because kerosene is less dense and immiscible. How is this mixture classified, and how is it separated?',
    type: 'mcq',
    options: [
      'Heterogeneous Mixture; separated using a Separating Funnel',
      'Homogeneous Mixture; separated by simple Filtration',
      'Compound; separated by Electrolysis',
      'Homogeneous Mixture; separated using a Magnet',
    ],
    correctIndex: 0,
    hint: 'Two distinct visible liquid layers mean it is heterogeneous. Density difference allows draining lower water layer first.',
    explanation: 'Awesome! Non-uniform distinct layers = Heterogeneous mixture. A separating funnel lets you drain the denser water layer from the bottom, leaving kerosene!',
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Thinking any substance made of molecules must be a compound",
    description: "Students often believe that if a substance exists as molecules, such as oxygen gas or ozone, it must be a compound. They assume elements can only exist as single, unbonded individual atoms.",
    correction: "An element consists of only one type of atom, but these identical atoms can join together to form molecules like O2 or N2. A compound, by contrast, requires two or more different types of elements chemically bonded together in a fixed ratio. Therefore, molecules can represent both elements and compounds depending on atom variety.",
  },
  {
    id: "misc_2",
    title: "Believing compounds retain properties of their constituent elements",
    description: "Students frequently think that a compound exhibits a combination of the physical and chemical properties of its individual elements. For example, they expect water (H2O) to support burning because it contains oxygen gas.",
    correction: "When elements chemically combine to form a compound, a chemical change occurs that forms a completely new substance with unique properties. The original properties of the constituent elements are entirely lost during this reaction. In contrast, only physical mixtures retain the individual properties of their constituent parts.",
  },
  {
    id: "misc_3",
    title: "Classifying colloids like milk as homogeneous true solutions",
    description: "Students often assume that because liquids like milk, ink, or fog look uniform to the naked eye, they are true homogeneous solutions. They confuse visual smoothness with uniform distribution at the particle level.",
    correction: "Colloids appear uniform to the naked eye, but they are actually heterogeneous mixtures containing tiny dispersed particles that do not settle. These particles are larger than those in a true solution and scatter light, creating the Tyndall effect. Under high magnification, the distinct phases of a colloid become clearly visible.",
  },
  {
    id: "misc_4",
    title: "Assuming dissolved solids in solutions disappear or form compounds",
    description: "Many students believe that when salt or sugar dissolves completely in water, the solid is permanently destroyed or turned into liquid. Others confuse dissolution with a chemical reaction that creates a brand-new compound.",
    correction: "Dissolving is a physical process where solute particles separate and fit into spaces between solvent particles without changing chemically. The solid solute is still present throughout the liquid mixture and retains its identity. This is proven because the original solid can be recovered unchanged using simple physical evaporation.",
  },
  {
    id: "misc_5",
    title: "Believing compounds can be separated using physical separation methods",
    description: "Students often confuse compounds with mixtures and think that elements in a compound can be separated using physical techniques like filtration or evaporation.",
    correction: "The elements in a compound are joined together by strong chemical bonds that cannot be broken by physical separation methods. Only chemical reactions or electrochemical processes, such as electrolysis, can decompose a compound into its constituent elements. Physical methods like filtration can only separate the components of physical mixtures.",
  },
];

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function C7_ChemistryMatterclassificationrevisitedSim({
  onComplete,
  initialNodeId = NODE_C7_CHEM_001,
}: ComponentProps) {
  // State variables
  const [activeTab, setActiveTab] = useState<TabType>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Discovery predictor state
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Interactive Lab state
  const [simStateMode, setSimStateMode] = useState<'solid' | 'liquid' | 'gas'>('solid');
  const [simTemp, setSimTemp] = useState<number>(10);
  const [bondingType, setBondingType] = useState<'ionic' | 'covalent'>('ionic');
  const [bondingStep, setBondingStep] = useState<number>(0);

  // Challenge system state
  const [selectedMcqOption, setSelectedMcqOption] = useState<number | null>(null);
  const [sortUserMapping, setSortUserMapping] = useState<Record<string, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    text: string;
  }>({ show: false, isCorrect: false, text: '' });

  // Game mechanics & Mastery state
  const [score, setScore] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  // BKT & SRS States
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  const [srsItems, setSrsItems] = useState<Record<NodeId, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id, 'Chemistry');
    });
    return initial as Record<NodeId, ReturnType<typeof createReviewItem>>;
  });

  // Audio & Speech initialization triggers
  useEffect(() => {
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the ICSE Class 7 Chemistry Matter and Reactions Laboratory!');
  }, []);

  // Temperature sync with particle state mode
  useEffect(() => {
    if (simTemp < 30) {
      setSimStateMode('solid');
    } else if (simTemp < 75) {
      setSimStateMode('liquid');
    } else {
      setSimStateMode('gas');
    }
  }, [simTemp]);

  // Overall Mastery Calculation
  const overallMasteryPercent = useMemo(() => {
    const masteries = ALL_NODE_IDS.map((id) => masteryProb(bktStates[id]));
    const avg = masteries.reduce((a, b) => a + b, 0) / masteries.length;
    return Math.round(avg * 100);
  }, [bktStates]);

  // Handler for Discovery Question
  const handleDiscoverySubmit = (choice: number) => {
    setDiscoveryAnswer(choice);
    setDiscoverySubmitted(true);
    if (choice === 0) {
      audioManager.play('drop-correct');
      speechManager.speak('Correct prediction! Salt and water are physically mixed and can be separated by evaporation.');
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Good try! Actually, salt water is a mixture because the salt can be recovered by simple evaporation without breaking chemical bonds.');
    }
  };

  // Handler for Challenge Answers
  const handleChallengeSubmit = () => {
    const currentChallenge = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;
    let feedbackText = '';

    if (currentChallenge.type === 'mcq') {
      if (selectedMcqOption === currentChallenge.correctIndex) {
        isCorrect = true;
        feedbackText = currentChallenge.explanation;
      } else {
        isCorrect = false;
        feedbackText = `Incorrect. ${currentChallenge.hint}`;
      }
    } else if (currentChallenge.type === 'sort') {
      const allCorrect = currentChallenge.sortItems?.every(
        (item) => sortUserMapping[item.name] === item.category
      );
      if (allCorrect && Object.keys(sortUserMapping).length === (currentChallenge.sortItems?.length || 0)) {
        isCorrect = true;
        feedbackText = currentChallenge.explanation;
      } else {
        isCorrect = false;
        feedbackText = 'Some items are sorted incorrectly. Double check physical reversibility!';
      }
    }

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);

      const newScore = score + 125;
      setScore(newScore);

      // BKT & SRS update
      const targetNode = currentChallenge.nodeId;
      const updatedBkt = bktUpdate(bktStates[targetNode], true);
      setBktStates((prev) => ({ ...prev, [targetNode]: updatedBkt }));

      const updatedSrs = sm2Update(srsItems[targetNode], 5, 0); // Grade 5 for correct
      setSrsItems((prev) => ({ ...prev, [targetNode]: updatedSrs }));

      recordGameScore(Object.values(ALL_NODE_IDS), 100);

      if (!completedChallenges.includes(currentChallenge.id)) {
        setCompletedChallenges((prev) => [...prev, currentChallenge.id]);
      }

      speechManager.speak('Excellent work! You mastered this concept.');

      if (completedChallenges.length + 1 === CHALLENGES.length) {
        setShowConfetti(true);
        audioManager.play('celebration');
        onComplete?.(newScore);
      }
    } else {
      audioManager.play('error');
      audioManager.play('drop-wrong');

      const targetNode = currentChallenge.nodeId;
      const updatedBkt = bktUpdate(bktStates[targetNode], false);
      setBktStates((prev) => ({ ...prev, [targetNode]: updatedBkt }));

      const updatedSrs = sm2Update(srsItems[targetNode], 2, 0); // Grade 2 for incorrect
      setSrsItems((prev) => ({ ...prev, [targetNode]: updatedSrs }));

      speechManager.speak('Not quite right. Read the hint and try again.');
    }

    setChallengeFeedback({
      show: true,
      isCorrect,
      text: feedbackText,
    });
  };

  const nextChallenge = () => {
    setSelectedMcqOption(null);
    setSortUserMapping({});
    setChallengeFeedback({ show: false, isCorrect: false, text: '' });
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('swoop');
    }
  };

  const prevChallenge = () => {
    setSelectedMcqOption(null);
    setSortUserMapping({});
    setChallengeFeedback({ show: false, isCorrect: false, text: '' });
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex((prev) => prev - 1);
      audioManager.play('swoop');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col items-center">
      <SparkleBurst show={showSparkle} x={300} y={200} />
      <Confetti show={showConfetti} />

      {/* TOP BAR / HEADER */}
      <header className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-gold-500/30">
            ⚗️
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
              ICSE Class 7 Chemistry: Matter & Reactions
            </h1>
            <p className="text-xs text-slate-400">Nodes c7_chem_001 to c7_chem_008</p>
          </div>
        </div>

        {/* Score & Mastery Badges */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <span className="text-xs text-slate-400">Score</span>
            <span className="text-sm font-bold text-amber-400">{score} pts</span>
          </div>

          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <span className="text-xs text-slate-400">BKT Mastery</span>
            <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-500"
                style={{ width: `${overallMasteryPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-400">{overallMasteryPercent}%</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-5xl flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('discovery');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'discovery'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>🔍</span> 1. Predict & Discover
        </button>

        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('slides');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'slides'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>📖</span> 2. Visual Lessons ({TEACHING_SLIDES.length})
        </button>

        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('lab');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'lab'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>🧪</span> 3. Interactive Lab
        </button>

        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('challenges');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'challenges'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>🎯</span> 4. Adaptive Challenges ({completedChallenges.length}/{CHALLENGES.length})
        </button>

        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('srs');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'srs'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>🧠</span> 5. SRS Spaced Repetition
        </button>
      </nav>

      {/* TAB CONTENT AREA */}
      <main className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-8 shadow-2xl relative min-h-[500px]">
        {/* TAB 1: DISCOVERY PREDICTOR */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gold-950 to-gold-950 border border-gold-800/50 rounded-xl p-5">
              <span className="text-xs font-bold tracking-wider text-gold-400 uppercase">
                Discovery Scenario
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                The Curious Case of Salt Water from Sambhar Lake
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                A student dissolves 2 spoonfuls of common salt into warm water until it completely disappears.
                The liquid looks identical everywhere. The student claims:
                <br />
                <em className="text-amber-300">
                  "Because the salt disappeared and the liquid looks smooth throughout, this salt water MUST be a PURE COMPOUND."
                </em>
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-200">
                Predict: Is the student correct or incorrect?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => handleDiscoverySubmit(0)}
                  className={`p-4 rounded-xl border text-left text-sm transition-all ${
                    discoveryAnswer === 0
                      ? 'bg-gold-950 border-gold-500 text-gold-200 ring-2 ring-gold-500'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-white mb-1">A. INCORRECT</div>
                  Salt water is a Homogeneous Mixture, NOT a pure compound! The salt and water are physically mixed in variable proportion and can be separated by evaporation.
                </button>

                <button
                  onClick={() => handleDiscoverySubmit(1)}
                  className={`p-4 rounded-xl border text-left text-sm transition-all ${
                    discoveryAnswer === 1
                      ? 'bg-rose-950 border-rose-500 text-rose-200 ring-2 ring-rose-500'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-white mb-1">B. CORRECT</div>
                  Because it looks identical everywhere and salt particles disappeared, it transformed into a brand new compound.
                </button>
              </div>
            </div>

            {discoverySubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${
                  discoveryAnswer === 0
                    ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                    : 'bg-amber-950/60 border-amber-800 text-amber-200'
                }`}
              >
                <div className="font-bold mb-1 flex items-center gap-2">
                  <span>{discoveryAnswer === 0 ? '🎉 Spot On!' : '💡 Learning Insight'}</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Looking uniform only tells us that a mixture is <strong>HOMOGENEOUS</strong>. A compound requires atoms to be chemically joined in a fixed mass ratio (e.g. H₂O). In salt water, you can dissolve a little salt or a lot of salt (variable proportion), and evaporating the water leaves pure salt crystals behind!
                </p>

                <button
                  onClick={() => {
                    audioManager.play('swoop');
                    setActiveTab('slides');
                  }}
                  className="mt-4 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
                >
                  Proceed to Visual Lessons →
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* TAB 2: VISUAL LESSON SLIDES */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            {/* Slide Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-800">
                  {TEACHING_SLIDES[currentSlideIndex].badgeText}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">
                  {TEACHING_SLIDES[currentSlideIndex].title}
                </h2>
                <p className="text-xs text-slate-400">
                  {TEACHING_SLIDES[currentSlideIndex].subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => {
                    audioManager.play('pop');
                    setCurrentSlideIndex((prev) => prev - 1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
                >
                  ← Prev
                </button>
                <span className="text-xs text-slate-400 font-mono">
                  {currentSlideIndex + 1} / {TEACHING_SLIDES.length}
                </span>
                <button
                  disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    audioManager.play('pop');
                    setCurrentSlideIndex((prev) => prev + 1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-gold-600 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold-500 shadow-md"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Main Visual Widget for current slide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'kinetic' ? (
                  <div className="space-y-3">
                    <KineticMatterCanvas temperature={simTemp} stateMode={simStateMode} />
                    <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 font-semibold min-w-[70px]">
                        Temp ({simTemp}°C)
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={simTemp}
                        onChange={(e) => setSimTemp(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-gold-400 uppercase min-w-[50px]">
                        {simStateMode}
                      </span>
                    </div>
                  </div>
                ) : TEACHING_SLIDES[currentSlideIndex].visualType === 'bonding' ? (
                  <BondingVisualizer
                    type={bondingType}
                    step={bondingStep}
                    onStepChange={setBondingStep}
                  />
                ) : (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center min-h-[220px]">
                    <div className="text-4xl mb-3">
                      {currentSlideIndex === 0
                        ? '🧱'
                        : currentSlideIndex === 2
                        ? '🧊'
                        : currentSlideIndex === 3
                        ? '🧪'
                        : currentSlideIndex === 4
                        ? '🔥'
                        : currentSlideIndex === 5
                        ? '⚡'
                        : '🥛'}
                    </div>
                    <p className="text-xs text-gold-300 font-semibold text-center">
                      Interactive Chemistry Visual Model
                    </p>
                    <div className="text-[11px] text-slate-400 text-center mt-2 max-w-xs">
                      {TEACHING_SLIDES[currentSlideIndex].keyTakeaway}
                    </div>
                  </div>
                )}
              </div>

              {/* Text Explanations */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                    Core Concepts
                  </h4>
                  <ul className="space-y-2">
                    {TEACHING_SLIDES[currentSlideIndex].content.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <span className="text-gold-400 mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gold-950/40 border border-gold-800/60 p-3 rounded-xl">
                  <span className="text-[11px] font-bold text-gold-300 uppercase block mb-1">
                    💡 ELI5 Analogy
                  </span>
                  <p className="text-xs text-gold-200 leading-relaxed">
                    {TEACHING_SLIDES[currentSlideIndex].eli5}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INTERACTIVE LAB */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white">Interactive Chemistry Sandbox Lab</h2>
                <p className="text-xs text-slate-400">
                  Manipulate state, temperature, electron bonding, and mixtures in real-time.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    audioManager.play('pop');
                    setBondingType('ionic');
                    setBondingStep(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    bondingType === 'ionic' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Ionic Lab
                </button>
                <button
                  onClick={() => {
                    audioManager.play('pop');
                    setBondingType('covalent');
                    setBondingStep(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    bondingType === 'covalent' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Covalent Lab
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kinetic Matter Chamber */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-gold-400 uppercase">
                  1. Thermal Kinetic Engine
                </h3>
                <KineticMatterCanvas temperature={simTemp} stateMode={simStateMode} />
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400 font-semibold">
                    <span>Ice (Solid)</span>
                    <span>Water (Liquid)</span>
                    <span>Steam (Gas)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={simTemp}
                    onChange={(e) => setSimTemp(Number(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Bonding Chamber */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-emerald-400 uppercase">
                  2. Chemical Bonding Simulator
                </h3>
                <BondingVisualizer
                  type={bondingType}
                  step={bondingStep}
                  onStepChange={setBondingStep}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ADAPTIVE CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Stepper Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  {CHALLENGES[currentChallengeIndex].title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentChallengeIndex === 0}
                  onClick={prevChallenge}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
                >
                  ← Prev
                </button>
                <button
                  disabled={currentChallengeIndex === CHALLENGES.length - 1}
                  onClick={nextChallenge}
                  className="px-3 py-1.5 rounded-lg bg-gold-600 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold-500"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Challenge Question & Options */}
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                <p className="text-xs text-slate-400 mb-1 font-semibold">
                  {CHALLENGES[currentChallengeIndex].instruction}
                </p>
                <p className="text-sm font-bold text-slate-100 leading-relaxed">
                  {CHALLENGES[currentChallengeIndex].questionText}
                </p>
              </div>

              {/* MCQ TYPE */}
              {CHALLENGES[currentChallengeIndex].type === 'mcq' && (
                <div className="grid grid-cols-1 gap-3">
                  {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedMcqOption(idx);
                      }}
                      className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedMcqOption === idx
                          ? 'bg-gold-950 border-gold-500 text-gold-200 ring-2 ring-gold-500/40'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px]">
                        {selectedMcqOption === idx ? '✓' : ''}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* SORT TYPE */}
              {CHALLENGES[currentChallengeIndex].type === 'sort' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CHALLENGES[currentChallengeIndex].sortCategories?.map((cat, cIdx) => (
                      <div
                        key={cIdx}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-3 min-h-[140px]"
                      >
                        <h4 className="text-xs font-bold text-gold-400 border-b border-slate-800 pb-2 mb-2">
                          {cat}
                        </h4>
                        <div className="space-y-2">
                          {CHALLENGES[currentChallengeIndex].sortItems
                            ?.filter((item) => sortUserMapping[item.name] === cat)
                            .map((item, iIdx) => (
                              <div
                                key={iIdx}
                                className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs font-semibold text-slate-200 flex justify-between items-center"
                              >
                                <span>{item.name}</span>
                                <button
                                  onClick={() => {
                                    audioManager.play('pop');
                                    setSortUserMapping((prev) => {
                                      const next = { ...prev };
                                      delete next[item.name];
                                      return next;
                                    });
                                  }}
                                  className="text-rose-400 hover:text-rose-300 text-xs font-bold px-1"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Unsorted Items Palette */}
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[11px] text-slate-400 font-bold uppercase block mb-2">
                      Tap item then select category:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {CHALLENGES[currentChallengeIndex].sortItems
                        ?.filter((item) => !sortUserMapping[item.name])
                        .map((item, idx) => (
                          <div key={idx} className="flex gap-1 items-center bg-slate-900 border border-slate-700 rounded-lg p-1.5">
                            <span className="text-xs text-slate-200 px-1 font-semibold">{item.name}</span>
                            {CHALLENGES[currentChallengeIndex].sortCategories?.map((cat, catIdx) => (
                              <button
                                key={catIdx}
                                onClick={() => {
                                  audioManager.play('drop-correct');
                                  setSortUserMapping((prev) => ({
                                    ...prev,
                                    [item.name]: cat,
                                  }));
                                }}
                                className="bg-slate-800 hover:bg-gold-700 text-slate-300 hover:text-white px-2 py-0.5 rounded text-[10px] font-bold"
                              >
                                {catIdx === 0 ? 'Reversible' : 'Irreversible'}
                              </button>
                            ))}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBMIT BUTTON & FEEDBACK BANNER */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  💡 {showHint ? 'Hide Hint' : 'Need Hint?'}
                </button>

                <button
                  onClick={handleChallengeSubmit}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30 transition-all"
                >
                  Submit Answer ✓
                </button>
              </div>

              {/* HINT BUBBLE */}
              <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex].hint} />

              {/* FEEDBACK DISPLAY */}
              <AnimatePresence>
                {challengeFeedback.show && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl border ${
                      challengeFeedback.isCorrect
                        ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-700 text-rose-200'
                    }`}
                  >
                    <div className="font-bold text-xs uppercase mb-1 flex items-center gap-2">
                      <span>{challengeFeedback.isCorrect ? '✓ Correct!' : '✕ Needs Review'}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{challengeFeedback.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* TAB 5: SRS SPACED REPETITION SUMMARY */}
        {activeTab === 'srs' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white">
                SRS Memory Review Engine (SM-2 Algorithm)
              </h2>
              <p className="text-xs text-slate-400">
                Spaced repetition schedules your review intervals to guarantee long-term ICSE board retention.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {ALL_NODE_IDS.map((nodeId) => {
                const item = srsItems[nodeId];
                const bkt = bktStates[nodeId];
                const mastery = Math.round(masteryProb(bkt) * 100);

                return (
                  <div
                    key={nodeId}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-gold-400 bg-gold-950/60 px-1.5 py-0.5 rounded border border-gold-800/50">
                        {nodeId}
                      </span>
                      <h4 className="text-xs font-bold text-slate-200 mt-1.5 line-clamp-2">
                        {NODE_TITLES[nodeId]}
                      </h4>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Mastery</span>
                        <span className="font-bold text-emerald-400">{mastery}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full transition-all duration-300"
                          style={{ width: `${mastery}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                        <span>Interval: {item.interval}d</span>
                        <span>Ease: {item.easeFactor.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-5xl mt-6 text-center text-xs text-slate-500">
        Brilliant-Quality Chemistry Interactive Simulation • ICSE Class 7 • Chapter: Matter & Chemical Reactions
      </footer>
    </div>
  );
}