'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 EVS NODE IDENTIFIERS ───
const NODE_C11_EVS_021 = 'c11_evs_021'; // International legal regimes - trade & environment
const NODE_C11_EVS_022 = 'c11_evs_022'; // Technological evolution - hi-tech, low-tech, intermediate, appropriate
const NODE_C11_EVS_023 = 'c11_evs_023'; // Renewable energy - limitations of conventional, renewable sources
const NODE_C11_EVS_024 = 'c11_evs_024'; // Health and environment - disease as indicator, prevention
const NODE_C11_EVS_025 = 'c11_evs_025'; // Traditional systems of medicine - Ayurveda, Unani
const NODE_C11_EVS_026 = 'c11_evs_026'; // Ecosystem analysis - complex systems, critical variables
const NODE_C11_EVS_027 = 'c11_evs_027'; // Human-environment interactions - quantity vs quality
const NODE_C11_EVS_028 = 'c11_evs_028'; // Design of solutions - generating options, lateral thinking

const ALL_NODE_IDS = [
  NODE_C11_EVS_021,
  NODE_C11_EVS_022,
  NODE_C11_EVS_023,
  NODE_C11_EVS_024,
  NODE_C11_EVS_025,
  NODE_C11_EVS_026,
  NODE_C11_EVS_027,
  NODE_C11_EVS_028,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Global Eco-Trade & Sustainable Development Summit',
  intro: 'You are India’s Chief Environmental Policy Strategist representing the country at a multilateral forum. Indian textile and chemical exporters in Gujarat face EU REACH restrictions, coastal shrimp fisheries navigate WTO trade barriers under GATT Article XX, and rural communities are transitioning through intermediate technologies, AYUSH conservation parks, and ecological decoupling.',
  context: 'Balance international trade rules, appropriate technology selection, complex ecosystem thresholds, traditional medicine biodiversity links, and lateral thinking designs to secure sustainable development.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 1998, the WTO ruled on the famous "Shrimp-Turtle" case. Sea turtles were dying in trawling nets. Why was the US import ban on Indian shrimp struck down despite turtles being an endangered species under GATT Article XX(g)?',
  options: [
    'Turtles do not qualify as "exhaustible natural resources" under WTO law',
    'The US ban was applied discriminatorily without technology transfer or equal phase-in time',
    'Environmental protection is strictly forbidden in all international trade treaties',
    'India proved that sea turtles do not migrate across international maritime borders'
  ],
  correctIndex: 1,
  hintAfter: 'Conservation was valid under XX(g), but the Chapeau of Article XX forbids arbitrary discrimination! Let us explore how international law, technology, health, and ecosystems connect.',
};

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (PREDICT-THEN-VERIFY) ───
interface PredictionQuestion {
  id: string;
  nodeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  explanation: string;
}

const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    nodeId: NODE_C11_EVS_021,
    question: 'Prediction: If a nation sets Conservation Focus to 100% under GATT Article XX(g) but keeps Non-Discrimination at 30% and denies technology transfer, what will the WTO panel rule?',
    options: [
      'The measure passes unconditionally because ecological conservation overrides all trade rules',
      'The measure is struck down for violating the Article XX Chapeau (arbitrary/disguised discrimination)',
      'The WTO awards monetary damages to the importing nation automatically',
      'The dispute is dismissed because the WTO has zero environmental jurisdiction'
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 1 (GATT Trade Simulator): Set Conservation to 100%, Non-Discrimination to 30%, and Tech Transfer to "NO" to verify the dispute ruling.',
    explanation: 'Article XX(g) legitimises the conservation goal, but the Chapeau prevents arbitrary discrimination. Without fair phase-ins and tech transfer (Shrimp-Turtle ruling), the trade barrier fails.'
  },
  {
    id: 'pred_2',
    nodeId: NODE_C11_EVS_026,
    question: 'Prediction: In a lake ecosystem, what will happen to the State Variable (Dissolved Oxygen) when the Critical Variable (Phosphorus Inflow) exceeds 0.05 mg/L?',
    options: [
      'Dissolved oxygen will rise sharply because algae produce surplus oxygen throughout the water column',
      'Dissolved oxygen will plummet below the critical hypoxia tipping point (< 2.0 mg/L) due to microbial decomposition',
      'Phosphorus immediately turns the water into potable alkaline mineral water',
      'Dissolved oxygen remains fixed at 8.5 mg/L regardless of nutrient concentration'
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 3 (Lake Eutrophication): Move the Phosphorus slider past 0.05 mg/L and observe how Dissolved Oxygen crashes into Hypoxic Collapse.',
    explanation: 'Surplus phosphorus triggers surface algal blooms. When algae die, benthic aerobic bacteria consume dissolved oxygen during decomposition, collapsing DO below 2 mg/L (fish kill threshold).'
  }
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS ('WHAT DO YOU NOTICE?') ───
interface ObservationQuestion {
  id: string;
  nodeId: string;
  question: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    nodeId: NODE_C11_EVS_027,
    question: 'Observation: In the Decoupling Dynamics graph (Lab 4), what observable pattern emerges when BOTH Renewable Energy and Circular Economy are activated?',
    observableOptions: [
      'GDP growth collapses to negative while pollution rises exponentially',
      'The AQI impact curve bends downward while GDP growth continues upward (Absolute Decoupling)',
      'Both curves merge into an identical horizontal flatline at zero',
      'Air pollution rises at double the rate of GDP expansion'
    ],
    correctIndex: 1,
    explanation: 'Absolute decoupling is visually demonstrated when the economic output trajectory moves upward while the pollutant emission curve simultaneously declines.'
  },
  {
    id: 'obs_2',
    nodeId: NODE_C11_EVS_022,
    question: 'Observation: In the Technology Spectrum matrix (Lab 2), how do Schumacher’s Intermediate Technologies compare with Hi-Tech automated systems?',
    observableOptions: [
      'Intermediate technology combines high local adaptability with low capital cost and minimal resource footprint',
      'Hi-Tech robotics provide the highest local social adaptability and zero capital investment',
      'Low-tech tools require megawatt nuclear grid connections',
      'All four technology tiers share identical capital, energy, and social adaptability scores'
    ],
    correctIndex: 0,
    explanation: 'Intermediate technology bridges primitive tools and prohibitive hi-tech by optimising for local human skills, low capital barriers, and decentralised ecological resilience.'
  }
];

// ─── SVG DIAGRAM 1: GATT ARTICLE XX LEGAL TEST SCALE ───
function GattLegalScaleSvg({
  conservationScore,
  nonDiscriminationScore,
  techTransfer,
}: {
  conservationScore: number;
  nonDiscriminationScore: number;
  techTransfer: boolean;
}) {
  const tiltAngle = ((conservationScore - nonDiscriminationScore) / 100) * 16;
  const isCompliant = conservationScore >= 50 && nonDiscriminationScore >= 60 && techTransfer;

  return (
    <svg viewBox="0 0 400 160" className="w-full h-auto bg-slate-950/80 rounded-xl border border-slate-800 p-2">
      <defs>
        <linearGradient id="scaleBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <text x="200" y="16" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
        WTO Legal Regime Balance: Article XX(g) vs Chapeau
      </text>

      <polygon points="190,135 210,135 200,60" fill="#475569" stroke="#334155" strokeWidth="1" />
      <circle cx="200" cy="60" r="5" fill="#38bdf8" />
      <rect x="150" y="135" width="100" height="8" rx="3" fill="#334155" />

      <g transform={`rotate(${tiltAngle}, 200, 60)`}>
        <rect x="50" y="58" width="300" height="5" rx="2" fill="url(#scaleBeamGrad)" />
        <line x1="70" y1="60" x2="70" y2="85" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2,2" />
        <path d="M 40 85 Q 70 100 100 85 Z" fill="#065f46" stroke="#10b981" strokeWidth="1.5" />
        <text x="70" y="112" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">
          Art. XX(g) {conservationScore}%
        </text>
        <text x="70" y="123" fill="#94a3b8" fontSize="8" textAnchor="middle">
          Conservation Legitimacy
        </text>

        <line x1="330" y1="60" x2="330" y2="85" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2,2" />
        <path d="M 300 85 Q 330 100 360 85 Z" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="330" y="112" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">
          Chapeau {nonDiscriminationScore}%
        </text>
        <text x="330" y="123" fill="#94a3b8" fontSize="8" textAnchor="middle">
          Non-Discrimination
        </text>
      </g>

      <rect
        x="130"
        y="145"
        width="140"
        height="14"
        rx="4"
        fill={isCompliant ? '#064e3b' : '#450a0a'}
        stroke={isCompliant ? '#10b981' : '#ef4444'}
      />
      <text
        x="200"
        y="155"
        fill={isCompliant ? '#6ee7b7' : '#fca5a5'}
        fontSize="9"
        textAnchor="middle"
        fontWeight="bold"
      >
        {isCompliant ? '✓ WTO COMPLIANT REGIME' : '⚠ TRADE LAW VIOLATION'}
      </text>
    </svg>
  );
}

// ─── SVG DIAGRAM 2: LAKE EUTROPHICATION DYNAMICS ───
function EutrophicationDiagramSvg({
  phosphorus,
  dissolvedOxygen,
  isHypoxic,
}: {
  phosphorus: number;
  dissolvedOxygen: number;
  isHypoxic: boolean;
}) {
  const algalCoverage = Math.min(260, Math.round(phosphorus * 2600));

  return (
    <svg viewBox="0 0 400 160" className="w-full h-auto bg-slate-950/80 rounded-xl border border-slate-800 p-2">
      <text x="200" y="15" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
        Ecosystem Feedback: Phosphorus Loading → Dissolved Oxygen
      </text>

      <rect x="20" y="24" width="360" height="120" rx="8" fill="#0f172a" stroke="#334155" />
      <path
        d="M 20 65 Q 110 58 200 65 T 380 65 L 380 140 Q 200 145 20 140 Z"
        fill={isHypoxic ? '#450a0a' : '#042f2e'}
        stroke={isHypoxic ? '#dc2626' : '#0d9488'}
        strokeWidth="1.5"
      />

      <path d="M 20 30 L 70 65" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3,3" />
      <text x="50" y="42" fill="#fbbf24" fontSize="8" fontWeight="bold">Fertiliser P-Inflow ({phosphorus} mg/L)</text>

      <rect x="60" y="62" width={algalCoverage} height="6" rx="3" fill={isHypoxic ? '#84cc16' : '#22c55e'} opacity="0.85" />
      <text x="200" y="58" fill="#a3e635" fontSize="8" textAnchor="middle">
        Algal Bloom (Blocks Sunlight & Absorbs Nutrients)
      </text>

      {isHypoxic ? (
        <g>
          <path d="M 120 110 Q 135 105 150 110 Q 135 115 120 110 Z" fill="#94a3b8" />
          <circle cx="145" cy="109" r="1.5" fill="#ef4444" />
          <path d="M 250 120 Q 265 115 280 120 Q 265 125 250 120 Z" fill="#94a3b8" />
          <text x="200" y="115" fill="#f87171" fontSize="9" textAnchor="middle" fontWeight="bold">
            ⚠ Severe Hypoxia (DO &lt; 2.0 mg/L) - Mass Fish Kill
          </text>
        </g>
      ) : (
        <g>
          <path d="M 140 105 Q 160 98 180 105 Q 160 112 140 105 Z" fill="#38bdf8" />
          <circle cx="172" cy="104" r="1.5" fill="#0f172a" />
          <path d="M 270 95 Q 290 88 310 95 Q 290 102 270 95 Z" fill="#38bdf8" />
          <text x="200" y="110" fill="#34d399" fontSize="9" textAnchor="middle" fontWeight="bold">
            ✓ Healthy Aerobic State (DO: {dissolvedOxygen} mg/L)
          </text>
        </g>
      )}

      <rect x="270" y="128" width="105" height="14" rx="3" fill="#020617" stroke="#475569" />
      <text x="322" y="138" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">
        State Var: {dissolvedOxygen} mg/L DO
      </text>
    </svg>
  );
}

// ─── SVG DIAGRAM 3: DECOUPLING CURVES (GDP VS EMISSIONS) ───
function DecouplingCurvesSvg({
  gdp,
  aqi,
  isDecoupled,
}: {
  gdp: number;
  aqi: number;
  isDecoupled: boolean;
}) {
  const gdpY = 130 - (gdp / 12) * 80;
  const aqiY = 130 - Math.min(100, (aqi / 400) * 90);

  return (
    <svg viewBox="0 0 400 160" className="w-full h-auto bg-slate-950/80 rounded-xl border border-slate-800 p-2">
      <text x="200" y="15" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
        Decoupling Dynamics: Economic Output vs Pollution Intensity
      </text>

      <line x1="45" y1="25" x2="45" y2="135" stroke="#475569" strokeWidth="1.5" />
      <line x1="45" y1="135" x2="375" y2="135" stroke="#475569" strokeWidth="1.5" />
      <text x="40" y="25" fill="#94a3b8" fontSize="8" textAnchor="end">Metric</text>
      <text x="375" y="145" fill="#94a3b8" fontSize="8" textAnchor="end">Time / Investment</text>

      <path
        d={`M 45 120 Q 180 90 350 ${gdpY}`}
        fill="none"
        stroke="#10b981"
        strokeWidth="2.5"
      />
      <circle cx="350" cy={gdpY} r="4" fill="#10b981" />
      <text x="355" y={gdpY - 3} fill="#34d399" fontSize="9" fontWeight="bold">GDP Growth ({gdp}%)</text>

      <path
        d={
          isDecoupled
            ? `M 45 100 Q 180 85 350 ${aqiY}`
            : `M 45 110 Q 180 70 350 ${aqiY}`
        }
        fill="none"
        stroke={isDecoupled ? '#38bdf8' : '#ef4444'}
        strokeWidth="2.5"
        strokeDasharray={isDecoupled ? '4,3' : 'none'}
      />
      <circle cx="350" cy={aqiY} r="4" fill={isDecoupled ? '#38bdf8' : '#ef4444'} />
      <text x="355" y={aqiY + 10} fill={isDecoupled ? '#38bdf8' : '#f87171'} fontSize="9" fontWeight="bold">
        AQI Impact ({aqi})
      </text>

      <rect
        x="60"
        y="32"
        width="140"
        height="18"
        rx="4"
        fill={isDecoupled ? '#064e3b' : '#3b0764'}
        stroke={isDecoupled ? '#10b981' : '#a855f7'}
      />
      <text
        x="130"
        y="44"
        fill={isDecoupled ? '#6ee7b7' : '#d8b4fe'}
        fontSize="8.5"
        textAnchor="middle"
        fontWeight="bold"
      >
        {isDecoupled ? '✓ ABSOLUTE DECOUPLING' : '⚠ COUPLED RESOURCE CONSUMPTION'}
      </text>
    </svg>
  );
}

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_f',
    nodeId: NODE_C11_EVS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which GATT Article XX exception specifically permits trade restrictions relating to the "conservation of exhaustible natural resources"?',
    options: ['Article XX(a)', 'Article XX(b)', 'Article XX(g)', 'Article XX(d)'],
    correctIndex: 2,
    explanation: 'GATT Article XX(g) covers measures relating to the conservation of exhaustible natural resources, while Article XX(b) covers measures necessary to protect human, animal, or plant life or health.',
    hints: [
      'Look for the paragraph that deals with natural resources rather than health directly.',
      'Article XX(b) is for life/health; the other key environmental paragraph is XX(g).',
      'Select Article XX(g).'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02_f',
    nodeId: NODE_C11_EVS_022,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'British economist E.F. Schumacher coined the term "Intermediate Technology" in his 1973 book "Small is Beautiful". What is its core definition?',
    options: [
      'Fully automated, capital-intensive robotic systems designed for mass production',
      'Small-scale, decentralised, affordable, and culturally appropriate technology',
      'Primitive, purely muscle-powered pre-industrial tools like wooden ploughs',
      'Nuclear reactors and supercomputers modified for urban use'
    ],
    correctIndex: 1,
    explanation: 'Intermediate technology bridges the gap between unproductive low-tech and unaffordable hi-tech, providing decentralised, low-cost solutions like family biogas plants and improved chulhas.',
    hints: [
      'Think about technology that sits between high-cost Western automation and low-output primitive methods.',
      'It focuses on local affordability, decentralisation, and job creation.',
      'Schumacher advocated for small-scale, decentralised, and affordable solutions.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03_f',
    nodeId: NODE_C11_EVS_025,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the Ayurvedic Tridoshas with their governing physiological elements and functions.',
    dragItems: [
      { label: 'Vata (Air/Space - Movement)', targetId: 'box_vata' },
      { label: 'Pitta (Fire - Digestion/Metabolism)', targetId: 'box_pitta' },
      { label: 'Kapha (Earth/Water - Structure/Immunity)', targetId: 'box_kapha' }
    ],
    correctMapping: {
      box_vata: 'Vata (Air/Space - Movement)',
      box_pitta: 'Pitta (Fire - Digestion/Metabolism)',
      box_kapha: 'Kapha (Earth/Water - Structure/Immunity)'
    },
    explanation: 'The Tridosha doctrine identifies Vata (motion/circulation), Pitta (heat/digestion), and Kapha (lubrication/structure). Balance equals health; imbalance (vikriti) leads to disease.',
    hints: [
      'Vata represents air and ether governing nerve impulses and movement.',
      'Pitta represents fire and thermal digestion/metabolism.',
      'Kapha represents earth and water, providing physical stability and lubrication.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04_f',
    nodeId: NODE_C11_EVS_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was the environmental transmission route and pollutant responsible for the 1950s Minamata disease in Japan?',
    options: [
      'Air-borne inhalation of sulphur dioxide from coal plants',
      'Water-borne bioaccumulation of methylmercury in marine seafood',
      'Vector-borne spread of Plasmodium through Aedes mosquitoes',
      'Food-borne bacterial contamination of unpasteurised milk'
    ],
    correctIndex: 1,
    explanation: 'Minamata disease was caused by methylmercury discharged into Minamata Bay, which bioaccumulated in fish and shellfish and poisoned human consumers.',
    hints: [
      'Remember that Minamata occurred in a coastal bay involving seafood consumption.',
      'The toxic heavy metal involved was organic mercury (methylmercury).',
      'Select water-borne bioaccumulation of methylmercury.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_05_f',
    nodeId: NODE_C11_EVS_026,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In ecosystem analysis, what is the functional difference between a "Critical Variable" and a "State Variable"?',
    options: [
      'Critical variables are biotic while state variables are always abiotic',
      'Critical variables drive system change (levers), while state variables describe current condition (readings)',
      'State variables can be manipulated by humans, whereas critical variables cannot be measured',
      'There is no difference; both terms refer to general ecosystem indicators'
    ],
    correctIndex: 1,
    explanation: 'Critical variables (like nutrient inflow or soil carbon) drive the ecosystem state, while state variables (like dissolved oxygen or pH) act as vital sign readings describing its condition.',
    hints: [
      'Think of a room thermostat: the heater knob drives temperature, while the thermometer reads the temperature.',
      'One is the causal driver; the other is the measurable diagnostic indicator.',
      'Critical variables drive changes; state variables describe current condition.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_06_f',
    nodeId: NODE_C11_EVS_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which cognitive block occurs when someone sees a discarded plastic bottle only as a liquid container, failing to imagine it as a drip irrigation emitter or sand brick?',
    options: ['Confirmation bias', 'Functional fixedness', 'Mental set', 'Cultural taboo'],
    correctIndex: 1,
    explanation: 'Functional fixedness is the mental block that restricts an individual to seeing an object only in its traditional or intended role.',
    hints: [
      'It refers to fixing an object strictly to its original "function".',
      'It prevents seeing alternative uses for ordinary materials.',
      'Select functional fixedness.'
    ],
  },
  {
    id: 'ch_07_f',
    nodeId: NODE_C11_EVS_023,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is biomass combustion classified as "carbon-neutral" rather than "zero-emission"?',
    options: [
      'It produces no carbon dioxide or smoke whatsoever during burning',
      'The CO2 emitted during combustion was recently captured from the atmosphere during plant photosynthesis',
      'Biomass consumes nitrogen oxides and turns them into oxygen',
      'International law exempts all agricultural fuels from greenhouse gas reporting'
    ],
    correctIndex: 1,
    explanation: 'Biomass burning does emit CO2, but because the plants absorbed that exact carbon from the active carbon cycle during their recent growth, net atmospheric carbon addition is near zero.',
    hints: [
      'Does burning wood or dung release smoke? Yes, so emissions are not zero.',
      'Think about the closed short-term biological carbon cycle.',
      'The emitted carbon was recently absorbed during plant growth.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_08_s',
    nodeId: NODE_C11_EVS_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A toxic waste shipment from an industrialised country arrives at Gujarat’s Alang ship-breaking yard without prior informed consent. Under which international treaty is this transboundary hazardous waste movement regulated for India?',
    options: ['The Bamako Convention', 'The Basel Convention', 'The Kyoto Protocol', 'The Montreal Protocol'],
    correctIndex: 1,
    explanation: 'India is a signatory to the Basel Convention (1989), which governs global transboundary movements of hazardous wastes. The Bamako Convention is strictly an African regional treaty.',
    hints: [
      'CISCE examiners specifically flag that students confuse Basel with Bamako.',
      'Bamako applies only to Africa; Basel is the global convention ratified by India.',
      'The treaty applying to Gujarat is the Basel Convention.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_09_s',
    nodeId: NODE_C11_EVS_024,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Workers in the agate-grinding workshops of Khambhat, Gujarat, show severe respiratory illness. Identify the occupational hazard and its corresponding causative agent.',
    options: [
      'Byssinosis caused by raw cotton dust inhalation',
      'Asbestosis caused by serpentine mineral fibres',
      'Silicosis caused by crystalline silica dust inhalation from stone grinding',
      'Minamata syndrome caused by cadmium fumes'
    ],
    correctIndex: 2,
    explanation: 'Agate cutting and stone crushing generate fine crystalline silica dust, causing silicosis — an irreversible fibrotic lung disease classified as an occupational hazard.',
    hints: [
      'Agate is a silica-rich chalcedony gemstone.',
      'Dry grinding of stone produces silica dust.',
      'Silicosis is the specific occupational disease in Khambhat.'
    ],
  },
  {
    id: 'ch_10_s',
    nodeId: NODE_C11_EVS_026,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of eutrophication events in a lake when agricultural runoff occurs.',
    sortItems: [
      'Excess Phosphorus/Nitrogen fertiliser enters lake (Critical Driver)',
      'Rapid algal bloom covers the surface and blocks sunlight',
      'Algae die and benthic aerobic bacteria decompose them',
      'Dissolved Oxygen plummets below 2 mg/L, causing massive fish mortality (Tipping Point)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Eutrophication begins with nutrient loading (critical variable), triggering algal explosion, microbial respiration during decomposition, and finally hypoxia/anoxia (state variable collapse).',
    hints: [
      'First comes agricultural fertiliser inflow.',
      'Next, algae proliferate on the surface.',
      'Decomposition by bacteria consumes oxygen.',
      'Finally, oxygen crash leads to fish kills.'
    ],
  },
  {
    id: 'ch_11_s',
    nodeId: NODE_C11_EVS_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'India committed at COP26 to install 500 GW of non-fossil electric capacity by 2030. If solar is planned to deliver 280 GW and wind 140 GW, how many GW remain for biomass, hydro, and other renewables?',
    correctAnswer: 80,
    tolerance: 1,
    unit: 'GW',
    explanation: '500 GW total target - (280 GW solar + 140 GW wind) = 500 - 420 = 80 GW allocated to biomass, small/large hydro, and nuclear.',
    hints: [
      'Add solar (280) and wind (140) first: 280 + 140 = 420 GW.',
      'Subtract 420 GW from the 500 GW 2030 target.',
      '500 - 420 = 80 GW.'
    ],
  },
  {
    id: 'ch_12_s',
    nodeId: NODE_C11_EVS_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'In the Delhi air pollution dilemma, what represents the classic trade-off between "quantity of life" and "quality of environment"?',
    options: [
      'High GDP and vehicle ownership rose, while winter AQI collapsed past 400 (Severe)',
      'Forest cover expanded by 40% while agricultural yields dropped to zero',
      'Industrial output was entirely halted, causing instant atmospheric purification with zero economic loss',
      'Population declined drastically while particulate emissions increased ten-fold'
    ],
    correctIndex: 0,
    explanation: 'Quantity of life (GDP, automotive mobility, material throughput) expanded rapidly, but without decoupling, environmental quality (AQI, respiratory health) deteriorated to severe crisis levels.',
    hints: [
      'Identify the metric of economic expansion vs the metric of environmental degradation.',
      'GDP and vehicles measure quantity; AQI measures quality.',
      'Quantity rose (GDP/vehicles) while quality fell (AQI > 400).'
    ],
  },
  {
    id: 'ch_13_s',
    nodeId: NODE_C11_EVS_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A remote village in Jharkhand has abundant sunshine but no electrical grid. Families burn kerosene lamps indoors, causing respiratory distress. Which solution represents an "Appropriate Technology"?',
    options: [
      'Building a 1000 MW nuclear power station inside the village',
      'Distributing solar-powered LED lanterns with local maintenance kits',
      'Reverting exclusively to animal oil wick lamps from pre-history',
      'Installing diesel mega-generators requiring imported fuel tankers'
    ],
    correctIndex: 1,
    explanation: 'Solar lanterns are appropriate because they match the local resource (abundant sun), bypass grid absence, eliminate toxic indoor kerosene fumes, and remain economically accessible.',
    hints: [
      'Appropriate technology is context-matched to local resources and needs.',
      'Jharkhand has strong solar insolation and off-grid hamlets.',
      'Solar lanterns fit local environmental, social, and economic realities.'
    ],
  },
  {
    id: 'ch_14_s',
    nodeId: NODE_C11_EVS_025,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does the AYUSH National Mission on Medicinal Plants turn traditional healthcare into a driver of biodiversity conservation?',
    options: [
      'By banning all plant-based medicines and replacing them with petrochemical drugs',
      'By incentivising commercial farming of 8,000+ native medicinal species, reducing wild over-harvesting',
      'By clear-felling tropical forests to construct concrete Ayurvedic hospitals',
      'By genetically modifying wild herbs so they can only grow in test tubes'
    ],
    correctIndex: 1,
    explanation: 'Promoting the structured cultivation of herbs (like ashwagandha, tulsi, senna) gives rural communities an economic incentive to conserve native plant genetics while stopping destructive wild harvesting.',
    hints: [
      'Traditional medicine relies on over 8,000 plant species.',
      'Cultivation in farmlands prevents over-extraction in wild forests.',
      'It creates an economic model for conserving botanical biodiversity.'
    ],
  },
  {
    id: 'ch_15_s',
    nodeId: NODE_C11_EVS_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Japanese engineers eliminated high-speed tunnel sonic booms on the Shinkansen bullet train by reshaping its nose cone to match the kingfisher’s beak. Which design principle does this demonstrate?',
    options: ['Functional Fixedness', 'Biomimicry / Analogy from nature', 'Confirmation bias', 'Mental set repetition'],
    correctIndex: 1,
    explanation: 'Biomimicry copies underlying functional physical principles evolved by nature (fluid dynamics of the kingfisher beak transitioning between air and water) to solve engineering and environmental problems.',
    hints: [
      'It uses nature’s biological designs as inspiration for engineering.',
      'The kingfisher plunges into water smoothly without splashing.',
      'Select Biomimicry.'
    ],
  },
  {
    id: 'ch_16_a',
    nodeId: NODE_C11_EVS_021,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct a WTO-compliant Environmental Trade Clause for an Indian bilateral agreement that avoids the Shrimp-Turtle dispute pitfalls.',
    availableParts: [
      'Mutual Eco-label Recognition',
      'Technology Transfer & Assistance',
      'Arbitrary Unilateral Trade Embargo',
      'Joint Environmental Review Mechanism',
      'Concealed Domestic Protectionist Tariffs'
    ],
    targetState: 'Mutual Eco-label Recognition Technology Transfer & Assistance Joint Environmental Review Mechanism',
    validationHint: 'Select all three constructive, non-discriminatory, cooperative provisions while excluding protectionist elements.',
    explanation: 'A compliant green trade clause requires non-discrimination, mutual standards recognition, technology sharing, and bilateral review — avoiding unilateral discriminatory bans.',
    hints: [
      'Include mutual recognition of environmental certification.',
      'Include capacity building and technology transfer.',
      'Do NOT include unilateral embargoes or disguised protectionism.'
    ],
  },
  {
    id: 'ch_17_a',
    nodeId: NODE_C11_EVS_027,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Denmark grew its GDP by ~40% between 1990 and 2020 while reducing GHG emissions by >40%. What environmental economic phenomenon does this prove?',
    options: [
      'Economic growth and environmental degradation are permanently and inextricably linked',
      'Absolute decoupling of GDP growth from environmental impact is achievable through clean tech and policy',
      'Developing nations can only protect nature by forcing negative economic growth',
      'Environmental regulations inevitably bankrupt national industries'
    ],
    correctIndex: 1,
    explanation: 'Absolute decoupling occurs when economic indicators (GDP) rise while absolute resource consumption and emissions decrease through renewable energy, energy efficiency, and circular material flows.',
    hints: [
      'Notice that GDP went UP while emissions went DOWN.',
      'This breaks the assumption that growth MUST destroy nature.',
      'This is called absolute decoupling.'
    ],
  },
  {
    id: 'ch_18_a',
    nodeId: NODE_C11_EVS_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A lake monitoring team in Kashmir measures Dissolved Oxygen = 1.8 mg/L and Total Phosphorus = 0.12 mg/L. What is the ecological diagnosis and recommended policy action?',
    options: [
      'The lake is in pristine oligotrophic balance; increase agricultural fertiliser runoff',
      'Hypoxic crisis past tipping point; immediately enforce catchment fertiliser diversion and emergency aeration',
      'The lake has excess oxygen; introduce toxic chemicals to suppress aquatic plant growth',
      'State variables are irrelevant; monitor only tourism ticket sales'
    ],
    correctIndex: 1,
    explanation: 'DO < 2 mg/L indicates severe hypoxia (fish kill danger) caused by phosphorus loading crossing the critical threshold (>0.05 mg/L), requiring urgent catchment source control.',
    hints: [
      'Healthy water requires DO > 6 mg/L; below 2 mg/L is lethal to fish.',
      'Phosphorus > 0.05 mg/L triggers severe eutrophication.',
      'The lake is experiencing hypoxic collapse requiring emergency intervention.'
    ],
  },
  {
    id: 'ch_19_a',
    nodeId: NODE_C11_EVS_023,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare nuclear power with solar photovoltaics on safety, waste longevity, and grid baseload capability in India.',
    options: [
      'Nuclear offers high energy density and zero-carbon baseload, but carries long-lived radioactive waste risks and catastrophic hazard (Chernobyl/Fukushima); solar is safe and scalable but intermittent',
      'Solar produces radioactive tailings while nuclear generates zero toxic residues',
      'Nuclear energy is intermittent at night while solar panels generate steady power 24/7',
      'Both sources have identical land footprints, identical costs, and zero safety considerations'
    ],
    correctIndex: 0,
    explanation: 'Nuclear provides high-density non-intermittent baseload but suffers from catastrophic accident risks and millenary waste disposal challenges; solar is safe, clean, and rapidly deployable but intermittent.',
    hints: [
      'Evaluate energy density vs intermittency and waste profile.',
      'Nuclear runs continuously (baseload) but has radioactive waste; solar needs sun.',
      'Select the balanced assessment identifying nuclear risks and solar intermittency.'
    ],
  },
  {
    id: 'ch_20_a',
    nodeId: NODE_C11_EVS_028,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Using Edward de Bono’s Lateral Thinking "Random Entry" with the trigger word "SPONGE", which urban flood design solution is generated for flood-prone Indian cities like Chennai or Mumbai?',
    options: [
      'Building solid concrete vertical floodwalls to speed water into neighbouring districts',
      'Developing "Sponge City" infrastructure with permeable pavements, bioswales, and urban retention wetlands',
      'Paving all city parks with waterproof asphalt to prevent ground absorption',
      'Dredging rivers deeper while eliminating all natural floodplain vegetation'
    ],
    correctIndex: 1,
    explanation: 'The random entry "sponge" forces the mind to conceptualise an urban landscape that absorbs, retains, purifies, and slowly releases stormwater rather than rushing runoff into overloaded drains.',
    hints: [
      'What does a sponge do with water? It absorbs and holds it.',
      'Translate this property into urban landscaping: permeable roads, wetlands, retention basins.',
      'Select the "Sponge City" concept.'
    ],
  },
  {
    id: 'ch_21_a',
    nodeId: NODE_C11_EVS_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does the modern "One Health" approach represent a superior environmental health paradigm compared to hospital-centric curative medicine?',
    options: [
      'It focuses exclusively on building larger private tertiary care hospitals in urban centres',
      'It integrates human, animal, and ecosystem surveillance to stop zoonotic and environmental disease at the ecological source',
      'It eliminates all medical vaccination programs and relies entirely on natural herd immunity',
      'It restricts health inspections to human workplaces without examining water or vectors'
    ],
    correctIndex: 1,
    explanation: 'One Health recognises that 70%+ of emerging pathogens and environmental toxins cross human-animal-ecosystem interfaces. Upstream ecological surveillance prevents outbreaks before hospitals are overwhelmed.',
    hints: [
      'One Health connects three interconnected pillars: humans, animals, and environment.',
      'Prevention at the ecological source is far more effective than clinical treatment after outbreak.',
      'Select the integrated human-animal-ecosystem surveillance option.'
    ],
  },
  {
    id: 'ch_22_a',
    nodeId: NODE_C11_EVS_022,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Sort these water provision technologies in order of increasing Energy Intensity and Capital Cost (from lowest/most sustainable to highest/most energy-intensive).',
    sortItems: [
      'Traditional Himalayan Naula / Step-well (Gravity and natural spring recharge)',
      'Intermediate Pedal-powered reciprocating hand pump',
      'Appropriate Solar PV submersible borewell pump',
      'Hi-Tech Automated Multi-stage Seawater Reverse Osmosis Desalination Plant'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Traditional step-wells rely on zero external energy. Pedal pumps use human effort. Solar pumps use renewable direct generation. Industrial desalination requires massive capital and electrical megawatt inputs.',
    hints: [
      'Start with the gravity-fed traditional step-well.',
      'Next is human-powered mechanical intermediate tech.',
      'Then decentralised solar electricity.',
      'Finish with the high-energy automated industrial plant.'
    ],
  }
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'GATT Article XX & The Trade-Environment Scale',
    instruction: 'Adjust the "Conservation Focus" and "Non-Discrimination" dials to see how WTO panels test environmental trade restrictions.',
    interactionType: 'trade-simulator',
    nodeId: NODE_C11_EVS_021,
  },
  {
    title: 'Technology Spectrum & The Schumacher Index',
    instruction: 'Slide between Low-Tech, Intermediate, and Hi-Tech to observe trade-offs in capital, energy intensity, and job creation.',
    interactionType: 'tech-spectrum',
    nodeId: NODE_C11_EVS_022,
  },
  {
    title: 'Ecosystem Critical Thresholds & State Indicators',
    instruction: 'Pump agricultural phosphorus into the lake model and watch when Dissolved Oxygen drops below the critical hypoxia threshold.',
    interactionType: 'lake-eutrophication',
    nodeId: NODE_C11_EVS_026,
  },
  {
    title: 'The Decoupling Matrix: Quantity vs Quality',
    instruction: 'Activate Clean Energy and Circular Water policies to decouple GDP growth from Air and Water pollution.',
    interactionType: 'decoupling-lab',
    nodeId: NODE_C11_EVS_027,
  },
  {
    title: 'Lateral Thinking & Biomimetic Solutions',
    instruction: 'Select a natural organism to uncover how its functional biological mechanism solves an urban environmental challenge.',
    interactionType: 'biomimicry-lab',
    nodeId: NODE_C11_EVS_028,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Sustainability Officer Policy Brief',
  description: 'Apply the concepts learned today to develop an Environmental Action Plan for an Indian manufacturing hub (e.g., Surat textile cluster or Khambhat agate district).',
  steps: [
    'Audit compliance with EU REACH and Basel Convention transboundary hazardous waste norms.',
    'Replace fossil thermal boilers with rooftop solar PV and agricultural biomass gasifiers.',
    'Deploy wet dust suppression and respiratory monitoring to eliminate occupational silicosis under the Factories Act.',
    'Set up closed-loop water effluent treatment to prevent phosphorus and dye runoff into local water bodies.',
    'Use biomimetic passive cooling inspired by termite mounds to cut factory air conditioning loads.'
  ]
};

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_EVS_021,
  title: 'ISC Class 11 EVS: International Legal Regimes & Sustainable Systems',
  definition: 'An integrated study of international trade-environment legal regimes (WTO GATT Art XX, Basel vs Bamako, REACH), technological models (Schumacher intermediate tech), renewable transitions, environmental health bio-indicators, AYUSH traditional medical biodiversity linkages, complex ecosystem dynamics (critical vs state variables), quantity vs quality decoupling, and lateral thinking design solutions.',
  eli5: 'Explore how nations trade without ruining nature, how simple smart tech beats dirty machines, how sick lakes and workers warn us of pollution, and how copying nature’s tricks can fix modern cities.',
  misconceptions: [
    { misconception: 'Basel and Bamako are interchangeable treaties for hazardous waste in India.', correction: 'India is a party to the Basel Convention; the Bamako Convention is strictly for the African continent.' },
    { misconception: 'GATT Article XX gives absolute carte-blanche rights to ban any import on green grounds.', correction: 'Measures must pass the Article XX Chapeau, proving no arbitrary discrimination or disguised trade barrier.' },
    { misconception: 'Appropriate technology always means primitive, low-tech, or crude tools.', correction: 'Appropriate technology is context-matched to local resources, ecology, and economics (e.g., solar LED lanterns).' },
    { misconception: 'Biomass energy is completely zero-emission.', correction: 'Biomass emits CO2 during combustion, but is carbon-neutral because plants recently absorbed that carbon.' },
    { misconception: 'Critical variables and state variables in ecosystems are identical.', correction: 'Critical variables are causal drivers (nutrient inflow), while state variables describe current condition (dissolved oxygen).' },
  ],
  masteryCriteria: 'Demonstrate holistic mastery of WTO trade-environment law, intermediate tech, renewables, environmental health surveillance, traditional AYUSH systems, ecosystem variables, economic decoupling, and lateral thinking designs.',
};

// ─── MAIN COMPONENT ───
function C11_EVSInternationalLegalRegimesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Science', emoji: '🌿', color: 'emerald' };

  // Navigation & Phases
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);

  // Prediction & Observation Interactive States
  const [predIndex, setPredIndex] = useState(0);
  const [selectedPredAnswer, setSelectedPredAnswer] = useState<number | null>(null);
  const [predSubmitted, setPredSubmitted] = useState(false);

  const [obsIndex, setObsIndex] = useState(0);
  const [selectedObsAnswer, setSelectedObsAnswer] = useState<number | null>(null);
  const [obsSubmitted, setObsSubmitted] = useState(false);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive Lab 1: Trade Simulator State
  const [conservationScore, setConservationScore] = useState(80);
  const [nonDiscriminationScore, setNonDiscriminationScore] = useState(40);
  const [techTransferEnabled, setTechTransferEnabled] = useState(false);

  // Interactive Lab 2: Tech Spectrum State
  const [techModeIndex, setTechModeIndex] = useState(1);

  // Interactive Lab 3: Lake Eutrophication Simulator State
  const [phosphorusLoading, setPhosphorusLoading] = useState(0.02);
  const [aerationActive, setAerationActive] = useState(false);

  // Interactive Lab 4: Decoupling Matrix State
  const [gdpTarget, setGdpTarget] = useState(8);
  const [renewablesActive, setRenewablesActive] = useState(false);
  const [circularEconomyActive, setCircularEconomyActive] = useState(false);

  // Interactive Lab 5: Biomimicry State
  const [selectedBiomimicId, setSelectedBiomimicId] = useState<string>('kingfisher');

  // Challenge Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Persistent BKT & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES ───
  const wtoVerdict = useMemo(() => {
    if (conservationScore < 50) return { status: 'Failed XX(g)', color: 'text-rose-400', desc: 'Lacks genuine environmental conservation justification.' };
    if (nonDiscriminationScore < 60 || !techTransferEnabled) {
      return { status: 'Violates Chapeau', color: 'text-amber-400', desc: 'Legitimate conservation, but struck down due to arbitrary/discriminatory application (Shrimp-Turtle ruling).' };
    }
    return { status: 'WTO Compliant', color: 'text-emerald-400', desc: 'Legitimate XX(g) measure applied fairly, transparently, and with mutual cooperation.' };
  }, [conservationScore, nonDiscriminationScore, techTransferEnabled]);

  const lakeState = useMemo(() => {
    let baseDO = 8.5 - (phosphorusLoading * 80);
    if (aerationActive) baseDO += 3.5;
    const currentDO = Math.max(0.4, Math.min(10.0, baseDO));
    const isHypoxic = currentDO < 2.0;
    const isStressed = currentDO < 4.0;
    const algalDensity = Math.min(100, Math.round(phosphorusLoading * 1200));

    return {
      dissolvedOxygen: Number(currentDO.toFixed(2)),
      algalDensity,
      isHypoxic,
      isStressed,
      status: isHypoxic ? 'Hypoxic Collapse (Fish Kills)' : isStressed ? 'Stressed Ecosystem' : 'Healthy Oligotrophic / Mesotrophic',
      badgeColor: isHypoxic ? 'bg-rose-900 text-rose-300 border-rose-600' : isStressed ? 'bg-amber-900 text-amber-300 border-amber-600' : 'bg-emerald-900 text-emerald-300 border-emerald-600'
    };
  }, [phosphorusLoading, aerationActive]);

  const decouplingStats = useMemo(() => {
    let baseAQI = 120 + (gdpTarget * 35);
    if (renewablesActive) baseAQI -= (gdpTarget * 20);
    if (circularEconomyActive) baseAQI -= 60;
    const finalAQI = Math.max(45, Math.round(baseAQI));
    const isAbsoluteDecoupled = renewablesActive && circularEconomyActive;
    return {
      aqi: finalAQI,
      category: finalAQI > 300 ? 'Severe (Hazardous)' : finalAQI > 200 ? 'Poor' : finalAQI > 100 ? 'Moderate' : 'Good / Clean',
      decouplingType: isAbsoluteDecoupled ? 'Absolute Decoupling' : renewablesActive ? 'Relative Decoupling' : 'Coupled (High Pollution)'
    };
  }, [gdpTarget, renewablesActive, circularEconomyActive]);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECTS ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; radius: number; speed: number }[] = [];

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 1.5 + Math.random() * 3,
        speed: 0.3 + Math.random() * 0.8,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, lakeState.isHypoxic ? '#450a0a' : '#042f2e');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = lakeState.isHypoxic ? 'rgba(239, 68, 68, 0.5)' : 'rgba(52, 211, 153, 0.6)';
        ctx.fill();
      });

      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`State Reading: ${lakeState.dissolvedOxygen} mg/L DO | Driver: ${phosphorusLoading} mg/L P`, 15, 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [lakeState.isHypoxic, lakeState.dissolvedOxygen, phosphorusLoading]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! You understood the Shrimp-Turtle distinction.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToPredict = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToObserve = useCallback(() => {
    setPhase('observe');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string, event?: React.MouseEvent) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (event) {
      setSparklePos({ x: event.clientX, y: event.clientY });
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowSparkle(true);
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && activeChallenge.sortItems) {
        prev = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback((e: React.MouseEvent) => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer, e);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleTabSwitch = useCallback((index: number) => {
    setCurrentSlide(index);
    audioManager.play('tap');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans min-h-[850px] flex flex-col justify-between">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-lg shadow-emerald-900/30"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-800"
              >
                ISC Class 11 EVS
              </motion.span>
              <span className="text-xs text-slate-400">Section 7: Legal Regimes & Technology</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Indicator Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {(['discovery', 'predict', 'explore', 'observe', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.div
              key={p}
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {p}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="my-auto py-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-2xl border border-emerald-700/50 shadow-xl"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                <span>🌍</span>
                <span>GLOBAL POLICY SCENARIO</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-emerald-900/40 text-xs text-emerald-300"
              >
                <strong>Core Challenge:</strong> {SCENARIO.context}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Discovery Question (Non-Graded)</span>
                <span className="text-xs text-slate-500">Test Your Instincts</span>
              </div>
              <p className="text-base text-white font-semibold">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 gap-2.5">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={discoveryAnswered}
                    onClick={() => handleDiscoveryAnswer(i)}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`p-3.5 text-left text-sm rounded-xl font-medium transition-all ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-950'
                          : 'bg-slate-950/60 border border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800 space-y-3"
                >
                  <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed">
                    💡 <strong>Insight:</strong> GATT Article XX permits conservation bans under XX(g), but the Chapeau prevents arbitrary discrimination. The US failed because it didn’t negotiate or assist Asian exporters equally!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToPredict}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/50 flex items-center gap-2"
                  >
                    <span>Proceed to Prediction Phase (Predict-Then-Verify)</span>
                    <span>→</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 1.5: BRILLIANT PREDICTION QUESTIONS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'predict' && (
          <motion.div
            key="predict"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="my-auto py-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-700/50 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1">
                  <span>🔮</span> Predict-Then-Verify (Question {predIndex + 1} of {PREDICTION_QUESTIONS.length})
                </span>
                <span className="text-xs text-slate-400 font-mono">{PREDICTION_QUESTIONS[predIndex].nodeId}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-3">{PREDICTION_QUESTIONS[predIndex].question}</h2>

              <div className="grid grid-cols-1 gap-2.5">
                {PREDICTION_QUESTIONS[predIndex].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={predSubmitted}
                    onClick={() => {
                      setSelectedPredAnswer(i);
                      setPredSubmitted(true);
                      audioManager.play(i === PREDICTION_QUESTIONS[predIndex].correctIndex ? 'success' : 'pop');
                    }}
                    className={`p-3.5 text-left text-sm rounded-xl font-medium transition-all ${
                      predSubmitted
                        ? i === PREDICTION_QUESTIONS[predIndex].correctIndex
                          ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100 shadow-lg'
                          : selectedPredAnswer === i
                          ? 'bg-rose-950/70 border border-rose-500 text-rose-200'
                          : 'bg-slate-950/60 border border-slate-800 text-slate-500 opacity-50'
                        : 'bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {predSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-gold-950/40 rounded-xl border border-gold-800 space-y-3"
                >
                  <p className="text-xs sm:text-sm text-gold-300">
                    🔬 <strong>Verification Clue:</strong> {PREDICTION_QUESTIONS[predIndex].verifyInstruction}
                  </p>
                  <p className="text-xs text-slate-300">
                    {PREDICTION_QUESTIONS[predIndex].explanation}
                  </p>

                  <div className="flex justify-end pt-2">
                    {predIndex < PREDICTION_QUESTIONS.length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setPredIndex(p => p + 1);
                          setSelectedPredAnswer(null);
                          setPredSubmitted(false);
                          audioManager.play('whoosh');
                        }}
                        className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg"
                      >
                        Next Prediction →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdvanceToExploration}
                        className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg"
                      >
                        Enter Interactive Labs to Verify →
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 py-2"
          >
            {/* Lab Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTabSwitch(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    currentSlide === idx
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step.title.split(':')[0]}</span>
                </motion.button>
              ))}
            </div>

            {/* Interactive Lab Container */}
            <motion.div
              layout
              className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400">Lab {currentSlide + 1}:</span>
                    <span>{EXPLORATION_STEPS[currentSlide].title}</span>
                  </h3>
                  <p className="text-xs text-amber-400 mt-0.5">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-xs text-slate-500 font-mono"
                >
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </motion.span>
              </div>

              {/* LAB 1: GATT XX TRADE SIMULATOR */}
              {currentSlide === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <GattLegalScaleSvg
                    conservationScore={conservationScore}
                    nonDiscriminationScore={nonDiscriminationScore}
                    techTransfer={techTransferEnabled}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <motion.div
                      whileHover={{ borderColor: '#10b981' }}
                      className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Article XX(g) Conservation Legitimacy</span>
                        <span className="text-emerald-400 font-bold">{conservationScore}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={conservationScore}
                        onChange={(e) => setConservationScore(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Set conservation score"
                      />

                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Article XX Chapeau (Non-Discrimination & Fairness)</span>
                        <span className="text-emerald-400 font-bold">{nonDiscriminationScore}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={nonDiscriminationScore}
                        onChange={(e) => setNonDiscriminationScore(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Set non discrimination score"
                      />

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-slate-300">TED Technology Transfer Provided to Exporters?</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setTechTransferEnabled(!techTransferEnabled)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            techTransferEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {techTransferEnabled ? 'YES (Offered)' : 'NO (Withheld)'}
                        </motion.button>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ borderColor: '#38bdf8' }}
                      className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs text-slate-400 uppercase font-bold">WTO Dispute Panel Status</span>
                        <div className={`text-lg font-black mt-1 ${wtoVerdict.color}`}>{wtoVerdict.status}</div>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">{wtoVerdict.desc}</p>
                      </div>
                      <div className="mt-4 p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                        <strong>Shrimp-Turtle Rule:</strong> A green goal passes XX(g) only if the Chapeau prevents arbitrary unilateral bans.
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* LAB 2: TECHNOLOGY SPECTRUM */}
              {currentSlide === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Low-Tech (Bullock Cart/Hand Pump)', 'Intermediate (Biogas/Chulha)', 'Hi-Tech (Nuclear/Robotics)', 'Appropriate (Solar Lanterns)'].map((tName, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setTechModeIndex(i);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-left text-xs font-bold transition-all ${
                          techModeIndex === i
                            ? 'bg-emerald-600 text-white border border-emerald-400 shadow-md'
                            : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {tName}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <div>
                      <span className="text-xs text-slate-400">Capital Cost & Investment</span>
                      <div className="h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-amber-500"
                          initial={{ width: '0%' }}
                          animate={{ width: techModeIndex === 2 ? '95%' : techModeIndex === 3 ? '40%' : techModeIndex === 1 ? '30%' : '10%' }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Energy & Resource Footprint</span>
                      <div className="h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-rose-500"
                          initial={{ width: '0%' }}
                          animate={{ width: techModeIndex === 2 ? '90%' : techModeIndex === 3 ? '15%' : techModeIndex === 1 ? '20%' : '5%' }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Local Social Adaptability</span>
                      <div className="h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500"
                          initial={{ width: '0%' }}
                          animate={{ width: techModeIndex === 2 ? '25%' : techModeIndex === 3 ? '95%' : techModeIndex === 1 ? '90%' : '75%' }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* LAB 3: LAKE EUTROPHICATION */}
              {currentSlide === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <EutrophicationDiagramSvg
                    phosphorus={phosphorusLoading}
                    dissolvedOxygen={lakeState.dissolvedOxygen}
                    isHypoxic={lakeState.isHypoxic}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-6 space-y-3">
                      <canvas ref={canvasRef} width={450} height={140} className="w-full rounded-xl border border-slate-800 shadow-inner" />
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Phosphorus Inflow (Critical Variable):</span>
                        <span className="text-emerald-400 font-mono font-bold">{phosphorusLoading} mg/L</span>
                      </div>
                      <input
                        type="range"
                        min={0.005}
                        max={0.100}
                        step={0.005}
                        value={phosphorusLoading}
                        onChange={(e) => setPhosphorusLoading(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Set phosphorus fertilizer inflow"
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-bold">STATE VARIABLE READING</span>
                          <motion.span
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className={`text-xs px-2 py-0.5 rounded-full border ${lakeState.badgeColor}`}
                          >
                            {lakeState.status}
                          </motion.span>
                        </div>
                        <div className="text-3xl font-black text-white mt-2 font-mono">
                          {lakeState.dissolvedOxygen} <span className="text-sm font-normal text-slate-400">mg/L DO</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                          Threshold Alert: DO below <strong>4.0 mg/L</strong> causes biological stress; below <strong>2.0 mg/L</strong> causes fish kill collapse.
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setAerationActive(!aerationActive)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                          aerationActive ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {aerationActive ? '✓ Emergency Aerators Active (+3.5 mg/L DO)' : '+ Activate Emergency Micro-Aerators'}
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* LAB 4: DECOUPLING MATRIX */}
              {currentSlide === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <DecouplingCurvesSvg
                    gdp={gdpTarget}
                    aqi={decouplingStats.aqi}
                    isDecoupled={renewablesActive && circularEconomyActive}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ borderColor: '#10b981' }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Target GDP Growth (Quantity):</span>
                        <span className="text-emerald-400 font-bold font-mono">{gdpTarget}%</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={12}
                        value={gdpTarget}
                        onChange={(e) => setGdpTarget(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Set GDP growth rate"
                      />

                      <div className="space-y-2 pt-2">
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={renewablesActive}
                            onChange={(e) => setRenewablesActive(e.target.checked)}
                            className="rounded text-emerald-500"
                          />
                          <span>Mandate 60% Renewable Energy Grid (Bhadla Solar & Wind)</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={circularEconomyActive}
                            onChange={(e) => setCircularEconomyActive(e.target.checked)}
                            className="rounded text-emerald-500"
                          />
                          <span>Enforce Circular Economy & 70% Industrial Water Recycling</span>
                        </label>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ borderColor: '#38bdf8' }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs text-slate-400 uppercase font-bold">Predicted Winter Air Quality (AQI)</span>
                        <div className="text-3xl font-black text-white mt-1 font-mono">{decouplingStats.aqi}</div>
                        <div className={`text-xs font-bold mt-1 ${decouplingStats.aqi > 200 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {decouplingStats.category}
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block font-bold">Economic Decoupling Regime:</span>
                        <span className="text-xs text-emerald-300 font-bold">{decouplingStats.decouplingType}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* LAB 5: BIOMIMICRY & LATERAL THINKING */}
              {currentSlide === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'kingfisher', name: 'Kingfisher Beak', domain: 'Fluid Dynamics / Sonic Booms' },
                      { id: 'termite', name: 'Termite Mound', domain: 'Passive Ventilation / Architecture' },
                      { id: 'lotus', name: 'Lotus Leaf', domain: 'Self-Cleaning Nanotexture' },
                    ].map((bio) => (
                      <motion.button
                        key={bio.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedBiomimicId(bio.id)}
                        className={`p-3 rounded-xl text-left transition-all ${
                          selectedBiomimicId === bio.id
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        <div className="text-xs font-bold">{bio.name}</div>
                        <div className="text-[10px] text-slate-400">{bio.domain}</div>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-2"
                  >
                    {selectedBiomimicId === 'kingfisher' && (
                      <p className="text-slate-200">
                        🚅 <strong>Shinkansen Train:</strong> When trains rush into tunnels, high air pressure creates a sonic boom. By mimicking the kingfisher’s beak shape—which enters water seamlessly without splashing—engineers reduced aerodynamic resistance by 30% and eliminated sound blasts.
                      </p>
                    )}
                    {selectedBiomimicId === 'termite' && (
                      <p className="text-slate-200">
                        🏢 <strong>Eastgate Centre & Ahmedabad Green Buildings:</strong> Termite mounds stay precisely 31°C despite 40°C external swings by continuously opening and closing convection chimneys. Architecture copying this uses 90% less air-conditioning energy.
                      </p>
                    )}
                    {selectedBiomimicId === 'lotus' && (
                      <p className="text-slate-200">
                        🌱 <strong>Self-Cleaning Superhydrophobic Coatings:</strong> Microscopic wax pillars on lotus leaves prevent water from spreading; rolling droplets pick up dirt. Paint mimicking this eliminates toxic chemical detergents on building facades.
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={() => handleTabSwitch(Math.max(0, currentSlide - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 disabled:opacity-30"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs text-slate-500 font-mono">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTabSwitch(currentSlide + 1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToObserve}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950"
                >
                  Proceed to Observation Questions →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2.5: BRILLIANT OBSERVATION QUESTIONS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'observe' && (
          <motion.div
            key="observe"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="my-auto py-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-teal-950/60 via-slate-900 to-slate-900 rounded-2xl border border-teal-700/50 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1">
                  <span>🧐</span> What Do You Notice? (Question {obsIndex + 1} of {OBSERVATION_QUESTIONS.length})
                </span>
                <span className="text-xs text-slate-400 font-mono">{OBSERVATION_QUESTIONS[obsIndex].nodeId}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-3">{OBSERVATION_QUESTIONS[obsIndex].question}</h2>

              <div className="grid grid-cols-1 gap-2.5">
                {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={obsSubmitted}
                    onClick={() => {
                      setSelectedObsAnswer(i);
                      setObsSubmitted(true);
                      audioManager.play(i === OBSERVATION_QUESTIONS[obsIndex].correctIndex ? 'success' : 'pop');
                    }}
                    className={`p-3.5 text-left text-sm rounded-xl font-medium transition-all ${
                      obsSubmitted
                        ? i === OBSERVATION_QUESTIONS[obsIndex].correctIndex
                          ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100 shadow-lg'
                          : selectedObsAnswer === i
                          ? 'bg-rose-950/70 border border-rose-500 text-rose-200'
                          : 'bg-slate-950/60 border border-slate-800 text-slate-500 opacity-50'
                        : 'bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {obsSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-teal-950/40 rounded-xl border border-teal-800 space-y-3"
                >
                  <p className="text-xs text-slate-300">
                    💡 <strong>Observation Explanation:</strong> {OBSERVATION_QUESTIONS[obsIndex].explanation}
                  </p>

                  <div className="flex justify-end pt-2">
                    {obsIndex < OBSERVATION_QUESTIONS.length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setObsIndex(o => o + 1);
                          setSelectedObsAnswer(null);
                          setObsSubmitted(false);
                          audioManager.play('whoosh');
                        }}
                        className="px-5 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold shadow-lg"
                      >
                        Next Observation Question →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdvanceToSandbox}
                        className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg"
                      >
                        Enter Multi-Parameter Sandbox →
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="my-auto space-y-4 py-4"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-white">🧪 Multi-Parameter Environmental Sandbox</h3>
                <p className="text-xs text-slate-400">Tweak all driving variables simultaneously to see holistic systemic feedback.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950"
              >
                Ready for Assessment Challenges →
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold text-emerald-400 uppercase">Trade & Legal Controls</span>
                <div className="text-xs text-slate-400">Non-Discrimination: {nonDiscriminationScore}%</div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={nonDiscriminationScore}
                  onChange={(e) => setNonDiscriminationScore(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                  aria-label="Sandbox non discrimination score"
                />
                <div className="text-xs text-slate-300 font-bold">{wtoVerdict.status}</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold text-gold-400 uppercase">Ecosystem Inflows</span>
                <div className="text-xs text-slate-400">Phosphorus: {phosphorusLoading} mg/L</div>
                <input
                  type="range"
                  min={0.005}
                  max={0.100}
                  step={0.005}
                  value={phosphorusLoading}
                  onChange={(e) => setPhosphorusLoading(Number(e.target.value))}
                  className="w-full accent-gold-500"
                  aria-label="Sandbox phosphorus loading"
                />
                <div className="text-xs text-slate-300 font-bold">{lakeState.dissolvedOxygen} mg/L DO ({lakeState.status})</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold text-amber-400 uppercase">Industrial Decoupling</span>
                <div className="text-xs text-slate-400">GDP Target: {gdpTarget}% Growth</div>
                <input
                  type="range"
                  min={2}
                  max={12}
                  value={gdpTarget}
                  onChange={(e) => setGdpTarget(Number(e.target.value))}
                  className="w-full accent-amber-500"
                  aria-label="Sandbox GDP target"
                />
                <div className="text-xs text-slate-300 font-bold">Predicted AQI: {decouplingStats.aqi}</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4 py-2"
          >
            {/* Challenge Progress Header */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-mono text-[11px]">{activeChallenge.nodeId}</span>
              </div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  difficulty === 'foundation' ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600'
                  : difficulty === 'advanced' ? 'bg-rose-900/80 text-rose-300 border border-rose-600'
                  : 'bg-gold-900/80 text-gold-300 border border-gold-600'
                }`}
              >
                {difficulty} Tier ({activeChallenge.competencyLevel})
              </motion.span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-5 rounded-2xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed mb-4">
                {activeChallenge.question}
              </p>

              {/* MCQ Options */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={showExplanation}
                      onClick={(e) => handleAnswer(i, e)}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`p-3 text-left text-xs sm:text-sm rounded-xl font-medium transition-all ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100 shadow-lg'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag-Label Challenge */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        className="px-3 py-1.5 bg-emerald-800 rounded-lg text-white text-xs font-bold cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['box_vata', 'box_pitta', 'box_kapha'].map((targetId) => (
                      <motion.div
                        key={targetId}
                        whileHover={{ borderColor: '#34d399' }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[80px] flex items-center justify-center"
                      >
                        <span className="text-xs text-slate-400 font-mono">
                          {droppedLabels[targetId] || `Drop ${targetId.replace('box_', '').toUpperCase()} label here`}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAnswer(droppedLabels, e)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Check Tridosha Labels
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Challenge */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {(sortArrangement.length === activeChallenge.sortItems.length
                      ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                      : activeChallenge.sortItems
                    ).map((item, displayIndex) => (
                      <motion.div
                        key={displayIndex}
                        whileHover={{ scale: 1.01 }}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIndex))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIndex);
                        }}
                        className="p-3 bg-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3 border border-slate-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-slate-400 flex items-center justify-center text-xs font-bold">
                          {displayIndex + 1}
                        </span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleSortSubmit(e)}
                    disabled={showExplanation}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Verify Sequence
                  </motion.button>
                </div>
              )}

              {/* Numeric Input Challenge */}
              {activeChallenge.type === 'numeric' && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <span className="text-xs text-slate-400 font-bold">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAnswer(numericInput, e)}
                    disabled={showExplanation}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              )}

              {/* Construct Challenge */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (!constructParts.includes(part)) {
                            setConstructParts(prev => [...prev, part]);
                            audioManager.play('tap');
                          }
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-200 border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-emerald-900/80 border border-emerald-600 rounded-lg text-xs text-emerald-200 flex items-center gap-2"
                      >
                        <span>{part}</span>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-300 text-xs font-bold"
                        >
                          ✕
                        </motion.button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click elements above to construct the clause.</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAnswer(constructParts.join(' '), e)}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Validate Constructed Clause
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-emerald-950/40 border border-emerald-800 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step-by-Step Rationale</span>
                  <span className="text-[11px] text-slate-400">NEP 2020 Conceptual Mastery</span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-emerald-400">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded-lg shadow"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 py-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-3"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-4xl inline-block"
              >
                🏆
              </motion.span>
              <h2 className="text-2xl font-black text-white">Assessment Complete!</h2>
              <p className="text-sm text-slate-300">
                Final Score: <span className="font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span> | BKT Mastery: <span className="font-bold uppercase text-emerald-400">{masteryLevel}</span>
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-700 text-xs sm:text-sm text-emerald-200"
              >
                {errors === 0
                  ? 'PERFECT SCORE! You have mastered international legal regimes, intermediate technologies, and ecosystem thresholds completely!'
                  : errors <= 3
                  ? 'Great work! You demonstrated strong conceptual clarity. Review the specific feedback below to polish your answers for the CISCE exam.'
                  : 'Good effort! You are building understanding step-by-step. Review your misconception profile below and re-explore the labs.'}
              </motion.div>
            </motion.div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300">Your Misconception Diagnostic Profile:</h3>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-rose-900/60 text-xs space-y-1"
                    >
                      <p className="text-rose-300 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ {m.correction}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* SPACED REPETITION VISIBILITY */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-5 bg-gradient-to-r from-slate-900 via-gold-950/40 to-slate-900 rounded-2xl border border-gold-700/60 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-lg">🧠</span>
                  <span className="font-extrabold text-gold-300 text-sm uppercase tracking-wider">SM-2 Spaced Repetition Schedule</span>
                </div>
                <p className="text-xs text-slate-300">
                  Optimal memory retention schedule based on your error count ({errors} errors):
                </p>
                <div className="text-sm font-bold text-emerald-400 pt-1">
                  📅 Recommended Review: {errors === 0 ? 'Review in 7 days (Mastered)' : errors <= 3 ? 'Review in 3 days (Reinforce)' : 'Review in 1 day (Targeted Practice)'}
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gold-900/60 border border-gold-500 rounded-xl text-center"
              >
                <span className="text-xs text-gold-200 block uppercase font-mono">Next Interval</span>
                <span className="text-lg font-black text-white font-mono">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</span>
              </motion.div>
            </motion.div>

            {/* Real World Policy Activity */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-5 bg-gradient-to-br from-slate-900 to-emerald-950/50 rounded-2xl border border-emerald-800 space-y-3"
            >
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 3 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-emerald-400 font-bold">{i + 1}.</span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_EVSInternationalLegalRegimesSim;