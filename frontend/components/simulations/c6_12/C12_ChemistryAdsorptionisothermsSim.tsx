"use client";

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

// ==========================================
// NODE IDS & CONSTANTS
// ==========================================
const NODE_IDS = {
  ADSORPTION: 'c12_chem_031',
  CATALYSIS: 'c12_chem_032',
  COLLOIDS: 'c12_chem_033',
  COLLOID_PROPS: 'c12_chem_034',
  EMULSIONS: 'c12_chem_035',
  METALLURGY_PRINCIPLES: 'c12_chem_036',
  ORE_CONCENTRATION: 'c12_chem_037',
  CRUDE_EXTRACTION: 'c12_chem_038',
  ELLINGHAM_THERMO: 'c12_chem_039',
  REFINING: 'c12_chem_040'
} as const;

const ALL_NODE_IDS = Object.values(NODE_IDS);

// ==========================================
// TYPES & INTERFACES
// ==========================================
type ViewMode = 'discovery' | 'slides' | 'sandbox' | 'challenges' | 'summary';

interface Challenge {
  id: string;
  nodeId: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  misconceptionTip: string;
  difficulty: 'foundation' | 'standard' | 'advanced';
}

interface Slide {
  id: number;
  title: string;
  nodeId: string;
  conceptTitle: string;
  visualType: 'isotherms' | 'catalysis' | 'colloids' | 'ellingham' | 'refining';
  content: string;
  keyTakeaway: string;
}

// ==========================================
// ENRICHMENT MISCONCEPTIONS & DIAGNOSTICS
// ==========================================
const MISCONCEPTIONS_MAP: Record<string, string> = {
  [NODE_IDS.ADSORPTION]: "Freundlich isotherm is valid ONLY at moderate pressures; Langmuir assumes monolayer coverage with fixed equivalent sites.",
  [NODE_IDS.CATALYSIS]: "A catalyst lowers activation energy for both directions equally; it does NOT alter equilibrium yield or Gibbs free energy change.",
  [NODE_IDS.COLLOIDS]: "Colloids are heterogeneous (1-1000 nm). They are NOT true solutions, and dispersed phase + medium are distinct.",
  [NODE_IDS.COLLOID_PROPS]: "In Electrophoresis colloidal particles move; in Electro-osmosis the medium moves. Hardy-Schulze rule: higher opposite charge coagulates faster.",
  [NODE_IDS.EMULSIONS]: "Emulsions require an emulsifier (surfactant) to lower interfacial tension. Oil-in-Water (Milk) vs Water-in-Oil (Butter).",
  [NODE_IDS.METALLURGY_PRINCIPLES]: "Gangue is the unwanted impurity; Flux is added to combine with gangue to form lighter, fusible Slag.",
  [NODE_IDS.ORE_CONCENTRATION]: "Magnetic separation requires a naturally magnetic ore (Magnetite Fe3O4); Froth flotation selectively oils sulphide ores.",
  [NODE_IDS.CRUDE_EXTRACTION]: "Roasting is heating in EXCESS air (sulphides -> oxides + SO2); Calcination is in RESTRICTED air (carbonates -> oxides + CO2).",
  [NODE_IDS.ELLINGHAM_THERMO]: "Reduction is spontaneous when ΔG° < 0. On an Ellingham diagram, a lower oxide line can reduce a higher oxide line.",
  [NODE_IDS.REFINING]: "Anode mud contains unreactive noble metals settling below the dissolving anode. Pure metal deposits at the Cathode."
};

// ==========================================
// TEACHING SLIDES DATA
// ==========================================
const TEACHING_SLIDES: Slide[] = [
  {
    id: 1,
    title: "Surface Chemistry & Adsorption Isotherms",
    nodeId: NODE_IDS.ADSORPTION,
    conceptTitle: "Freundlich vs Langmuir Isotherms",
    visualType: 'isotherms',
    content: "Adsorption is a surface phenomenon measured as mass adsorbed per gram of solid (x/m). Freundlich isotherm (x/m = k·P^(1/n)) works at moderate pressure. Langmuir isotherm (x/m = aP / (1 + bP)) assumes monolayer coverage on fixed equivalent sites and correctly predicts saturation limit (a/b) at high pressure.",
    keyTakeaway: "Freundlich linearizes on log-log plot (slope = 1/n); Langmuir reaches horizontal plateau at high pressure due to site saturation."
  },
  {
    id: 2,
    title: "Catalysis & Activation Energy",
    nodeId: NODE_IDS.CATALYSIS,
    conceptTitle: "Lowering Energy Barriers",
    visualType: 'catalysis',
    content: "A catalyst speeds up reactions by providing an alternative pathway with lower Activation Energy (Ea). It speeds up forward and reverse reactions equally, reaching equilibrium faster without changing Keq or ΔG.",
    keyTakeaway: "Heterogeneous catalysis works via Adsorption -> Reaction on Active Sites -> Desorption (e.g. Haber process with Fe, Hydrogenation with Ni)."
  },
  {
    id: 3,
    title: "Colloids, Emulsions & Properties",
    nodeId: NODE_IDS.COLLOIDS,
    conceptTitle: "Tyndall Effect & Hardy-Schulze Rule",
    visualType: 'colloids',
    content: "Colloids (1-1000 nm) scatter light (Tyndall effect) and dance in Brownian motion. Electrophoresis moves charged particles. Hardy-Schulze rule states that ions of opposite charge with higher valency have vastly superior coagulating power (Al³⁺ > Mg²⁺ > Na⁺).",
    keyTakeaway: "Emulsions (liquid in liquid) are O/W (milk) or W/O (butter), stabilized by surfactants reducing interfacial tension."
  },
  {
    id: 4,
    title: "Metallurgy & Ellingham Diagrams",
    nodeId: NODE_IDS.ELLINGHAM_THERMO,
    conceptTitle: "Thermodynamics of Oxide Reduction",
    visualType: 'ellingham',
    content: "Ellingham diagrams plot ΔG° vs T for oxide formation. Lower lines represent more stable oxides. A reductant line lying BELOW a metal oxide line can reduce it. Carbon (C -> CO) has a negative slope (ΔS > 0), making it an ultra-effective reductant at high furnace temperatures.",
    keyTakeaway: "Spontaneous reduction requires net ΔG° < 0. Temperature at crossing point determines where carbon can reduce iron oxide."
  },
  {
    id: 5,
    title: "Extraction & Metal Refining",
    nodeId: NODE_IDS.REFINING,
    conceptTitle: "Froth Flotation & Refining Methods",
    visualType: 'refining',
    content: "Sulphides are concentrated by Froth Flotation (pine oil wets sulphide, air bubbles float it). Crude metal is extracted by Roasting (excess air) or Calcination. Refining purifies crude metal: Electrolytic (Cu), Zone Refining for semiconductors (Si, Ge), and Vapour Phase (Mond/van Arkel).",
    keyTakeaway: "Electrolytic refining: Impure metal Anode dissolves, pure metal Cathode thickens, noble metal impurities drop as Anode Mud."
  }
];

// ==========================================
// MASTER CHALLENGES ARRAY (8+ Progressive)
// ==========================================
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    nodeId: NODE_IDS.ADSORPTION,
    title: 'Adsorption Isotherm Limits',
    question: 'A student plots log(x/m) against log P for nitrogen gas on activated charcoal and gets a straight line with slope 0.5 and y-intercept 0.3010. What are the values of n and k in the Freundlich isotherm?',
    options: [
      'n = 2, k = 2',
      'n = 0.5, k = 0.301',
      'n = 2, k = 0.301',
      'n = 0.5, k = 2'
    ],
    correctIndex: 0,
    explanation: 'In log(x/m) = log k + (1/n)log P, slope = 1/n = 0.5 ⇒ n = 2. Intercept = log k = 0.3010 ⇒ k = 10^0.3010 = 2.',
    misconceptionTip: MISCONCEPTIONS_MAP[NODE_IDS.ADSORPTION],
    difficulty: 'standard'
  },
  {
    id: 'ch_2',
    nodeId: NODE_IDS.CATALYSIS,
    title: 'Catalyst & Equilibrium Position',
    question: 'Finely divided iron is added as a catalyst in the Haber process for manufacturing ammonia. What is the precise effect of iron on the equilibrium constant K_p and reaction yield?',
    options: [
      'Increases K_p and increases ammonia yield',
      'Decreases activation energy for forward reaction only, shifting equilibrium right',
      'Does not change K_p or yield; lowers E_a equally for forward and reverse reactions',
      'Increases total ΔG° making the process more exothermic'
    ],
    correctIndex: 2,
    explanation: 'A catalyst lowers E_a for BOTH forward and reverse pathways by the same amount. It accelerates the rate of reaching equilibrium but leaves K_p, yield, and ΔG° unchanged.',
    misconceptionTip: MISCONCEPTIONS_MAP[NODE_IDS.CATALYSIS],
    difficulty: 'foundation'
  },
  {
    id: 'ch_3',
    nodeId: NODE_IDS.COLLOIDS,
    title: 'Colloidal Classification',
    question: 'Which pair correctly pairs the colloidal dispersion type with its dispersed phase and dispersion medium?',
    options: [
      'Milk: Liquid in Solid (Gel)',
      'Butter: Water droplets wetted in fat medium (Water-in-Oil Emulsion)',
      'Smoke: Gas dispersed in Solid (Solid Sol)',
      'Whipped Cream: Liquid dispersed in Gas (Aerosol)'
    ],
    correctIndex: 1,
    explanation: 'Butter is a Water-in-Oil (W/O) emulsion where water droplets are dispersed inside continuous solid fat medium.',
    misconceptionTip: MISCONCEPTIONS_MAP[NODE_IDS.COLLOIDS],
    difficulty: 'foundation'
  },
  {
    id: 'ch_4',
    nodeId: NODE_IDS.COLLOID_PROPS,
    title: 'Hardy-Schulze Coagulation Power',
    question: 'For the coagulation of a negatively charged Arsenious Sulphide (As₂S₃) sol, arrange the following electrolytes in INCREASING order of coagulating efficiency: NaCl, MgCl₂, Al₂(SO₄)₃.',
    options: [
      'Al₂(SO₄)₃ < MgCl₂ < NaCl',
      'NaCl < MgCl₂ < Al₂(SO₄)₃',
      'MgCl₂ < NaCl < Al₂(SO₄)₃',
      'All three have equal coagulating power according to Faraday'
    ],
    correctIndex: 1,
    explanation: 'According to Hardy-Schulze rule, coagulation of a negative sol requires positive counter-ions. Higher positive charge gives much higher coagulating power: Na⁺ (1+) < Mg²⁺ (2+) < Al³⁺ (3+).',
    misconceptionTip: MISCONCEPTIONS_MAP[NODE_IDS.COLLOID_PROPS],
    difficulty: 'standard'
  },
  {
    id: 'ch_5',
    nodeId: NODE_IDS.EMULSIONS,
    title: 'Emulsion Tests & Identification',
    question: 'A laboratory sample of butter is subjected to electrical conductivity and dilution tests. What are the expected observations?',
    options: [
      'High electrical conductivity; dilutes readily with added water',
      'Zero/Low electrical conductivity; dilutes with organic oil solvent but NOT water',
      'Turns blue with CuSO₄ aqueous solution; conducts electricity strongly',
      'Spontaneously separates into gas without an emulsifying agent'
    ],
    correctIndex: 1,
    explanation: 'Butter is a Water-in-Oil (W/O) emulsion. Since the continuous outer phase is oil (non-polar), it does not conduct electricity and can only be diluted with oil/organic solvent.',
    misconceptionTip: MISCONCEPTIONS_MAP[NODE_IDS.EMULSIONS],
    difficulty: 'standard'
  },
  {
    id: 'ch_6',
    nodeId: NODE_IDS.METALLURGY_PRINCIPLES,
    title: 'Gangue, Flux and Slag',
    question: 'During blast furnace extraction of iron from haematite containing silica (SiO₂) gangue, limestone (CaCO₃) is added. What is the exact chemical role of limestone?',
    options: [
      'Acts as a reducing agent converting Fe₂O₃ to Fe',
      'Decomposes to CaO (basic flux) which reacts with acidic SiO₂ gangue to form molten CaSiO₃ slag',
      'Acts as an oxidising agent to burn off sulphur impurities',
      'Lowers the melting point of iron from 1538°C to room temperature'
    ],
    correctIndex: 1,
    explanation: 'Limestone CaCO₃ decomposes to CaO (basic flux). CaO reacts with acidic silica gangue: CaO + SiO₂ -> CaSiO₃ (fusible slag that floats on molten iron).',
    misconceptionTip: MISCONCEPTIONS_MAP[NODE_IDS.METALLURGY_PRINCIPLES],
    difficulty: 'standard'
  },
  {
    id: 'ch_7',
    nodeId: NODE_IDS.ORE_CONCENTRATION,
    title: 'Concentration of Ores',
    question: 'Pine oil and sodium ethyl xanthate are added to a tank containing powdered Galena (PbS) ore and water with air blowing through. Why?',
    options: [
      'Pine oil dissolves lead while xanthate precipitates quartz gangue',
      'Sulphide particles are preferentially wetted by pine oil and collector, floating up as froth with air bubbles',
      'It magnetizes galena so an electromagnet can pull it out',
      'It converts galena into lead nitrate in aqueous phase'
    ],
    correctIndex: 1,
    explanation: 'Froth Flotation: Pine oil & xanthates act as collectors that selectively make sulphide ore non-wettable by water. Sulphides stick to rising air bubbles, forming a skimmed froth.',
    misconceptionTip: MISCONCEPTIONS_MAP[NODE_IDS.ORE_CONCENTRATION],
    difficulty: 'standard'
  },
  {
    id: 'ch_8',
    nodeId: NODE_IDS.CRUDE_EXTRACTION,
    title: 'Roasting vs Calcination',
    question: 'Which of the following chemical reactions represents CALCINATION?',
    options: [
      '2 ZnS + 3 O₂ -> 2 ZnO + 2 SO₂ (excess air)',
      'ZnCO₃ -> ZnO + CO₂ (limited/no air)',
      'Cr₂O₃ + 2 Al -> 2 Cr + Al₂O₃',
      'Cu₂S + 2 Cu₂O -> 6 Cu + SO₂'
    ],
    correctIndex: 1,
    explanation: 'Calcination is heating carbonate or hydrated ores in absence/restricted air to decompose them into oxides and release CO₂/H₂O. Roasting uses excess oxygen on sulphides to release SO₂.',
    misconceptionTip: MISCONCEPTIONS_MAP[NODE_IDS.CRUDE_EXTRACTION],
    difficulty: 'foundation'
  },
  {
    id: 'ch_9',
    nodeId: NODE_IDS.ELLINGHAM_THERMO,
    title: 'Ellingham Diagram Analysis',
    question: 'On an Ellingham diagram, the line for 2C + O₂ -> 2CO slopes DOWNWARD with increasing temperature, whereas 2Mg + O₂ -> 2MgO slopes UPWARD. Why can carbon reduce MgO only at very high temperatures?',
    options: [
      'Carbon has higher atomic mass than Magnesium',
      'For 2C + O₂ -> 2CO, ΔS° > 0 so ΔG° becomes more negative with rising T; above crossing T, carbon line is lower than MgO line',
      'MgO becomes liquid at 100°C while CO decomposes',
      'Carbon acts as a catalyst rather than a chemical reductant'
    ],
    correctIndex: 1,
    explanation: 'In 2C(s) + O₂(g) -> 2CO(g), gas moles increase from 1 to 2, so ΔS° > 0. Thus ΔG° = ΔH° - TΔS° decreases rapidly with temperature. Above the line crossing point, carbon\'s line drops below MgO, making net ΔG° negative.',
    misconceptionTip: MISCONCEPTIONS_MAP[NODE_IDS.ELLINGHAM_THERMO],
    difficulty: 'advanced'
  },
  {
    id: 'ch_10',
    nodeId: NODE_IDS.REFINING,
    title: 'Electrolytic Refining & Anode Mud',
    question: 'In the electrolytic refining of crude blister copper containing traces of iron, nickel, silver, and gold, what happens at the electrodes and bottom of the cell?',
    options: [
      'Pure copper dissolves at cathode and deposits on anode; gold floats on top',
      'Impure copper anode dissolves; pure copper deposits on cathode; noble metals (Ag, Au) settle as Anode Mud',
      'Iron and Nickel settle as anode mud while Copper and Gold stay in sulphate solution',
      'All impurities deposit on the cathode alongside pure copper'
    ],
    correctIndex: 1,
    explanation: 'At Anode (+): Cu -> Cu²⁺ + 2e⁻. Active metals (Fe, Ni) dissolve into solution. Less reactive noble metals (Ag, Au, Pt) do not oxidise and drop as valuable Anode Mud. Pure Cu deposits at Cathode (-).',
    misconceptionTip: MISCONCEPTIONS_MAP[NODE_IDS.REFINING],
    difficulty: 'advanced'
  }
];

// ==========================================
// VISUAL COMPONENT 1: ADSORPTION ISOTHERMS
// ==========================================
const AdsorptionVisualizer: React.FC = () => {
  const [pressure, setPressure] = useState<number>(50); // 0 to 100
  const [temp, setTemp] = useState<number>(300); // 200K to 400K
  const [isothermType, setIsothermType] = useState<'freundlich' | 'langmuir'>('langmuir');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute x/m values
  const { xm, curvePoints } = useMemo(() => {
    const points: { p: number; xm: number }[] = [];
    let currentXm = 0;

    for (let p = 1; p <= 100; p += 2) {
      let val = 0;
      if (isothermType === 'freundlich') {
        // x/m = k * P^(1/n). k drops with T.
        const k = (1000 / temp) * 0.5;
        const n = 2;
        val = k * Math.pow(p, 1 / n);
      } else {
        // Langmuir: x/m = (a * P) / (1 + b * P)
        const a = (800 / temp) * 0.15;
        const b = 0.05;
        val = (a * p) / (1 + b * p);
      }
      points.push({ p, xm: val });
      if (Math.abs(p - pressure) < 2) currentXm = val;
    }
    return { xm: currentXm, curvePoints: points };
  }, [pressure, temp, isothermType]);

  // Render Canvas Particle Surface Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Surface baseline (Adsorbent solid m)
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 140, canvas.width, 40);

    // Adsorption sites on surface (10 sites)
    const siteCount = 12;
    const siteSpacing = canvas.width / siteCount;
    
    // Fraction of occupied sites proportional to xm
    const occupiedFraction = Math.min(1, xm / (isothermType === 'langmuir' ? 12 : 25));
    const occupiedCount = Math.round(occupiedFraction * siteCount);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Solid Adsorbent Surface (m)', 10, 168);

    for (let i = 0; i < siteCount; i++) {
      const x = i * siteSpacing + siteSpacing / 2;
      const y = 130;

      // Draw site cup
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y + 10, 12, 0, Math.PI, false);
      ctx.stroke();

      if (i < occupiedCount) {
        // Gas molecule stuck (Adsorbate x)
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(x, y + 4, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0284c7';
        ctx.stroke();
      }
    }

    // Unadsorbed flying gas molecules in chamber
    const freeGasCount = Math.round((pressure / 10) * (300 / temp));
    ctx.fillStyle = '#a855f7';
    for (let g = 0; g < freeGasCount; g++) {
      const gx = (g * 37 + pressure * 3) % (canvas.width - 20) + 10;
      const gy = (g * 23 + temp) % 100 + 10;
      ctx.beginPath();
      ctx.arc(gx, gy, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [pressure, temp, xm, isothermType]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-lg font-bold text-gold-400 flex items-center gap-2">
          <span>🧪</span> Adsorption Isotherm Surface Lab
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => { setIsothermType('freundlich'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              isothermType === 'freundlich' ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Freundlich (x/m = kP¹/ⁿ)
          </button>
          <button
            onClick={() => { setIsothermType('langmuir'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              isothermType === 'langmuir' ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Langmuir (Monolayer Saturation)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Graph SVG */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 relative h-56 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-mono">Amount Adsorbed (x/m) vs Pressure (P)</span>
          <svg viewBox="0 0 300 160" className="w-full h-40 overflow-visible">
            {/* Grid lines */}
            <line x1="30" y1="130" x2="280" y2="130" stroke="#334155" strokeWidth="1.5" />
            <line x1="30" y1="10" x2="30" y2="130" stroke="#334155" strokeWidth="1.5" />
            
            {/* Axes Labels */}
            <text x="280" y="145" fill="#94a3b8" fontSize="10">P</text>
            <text x="10" y="15" fill="#94a3b8" fontSize="10">x/m</text>

            {/* Isotherm Curve */}
            {curvePoints.length > 1 && (
              <path
                d={curvePoints.reduce((acc, pt, idx) => {
                  const x = 30 + (pt.p / 100) * 240;
                  const maxY = isothermType === 'freundlich' ? 30 : 15;
                  const y = 130 - (pt.xm / maxY) * 110;
                  return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                }, '')}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
            )}

            {/* Current Point */}
            {(() => {
              const curX = 30 + (pressure / 100) * 240;
              const maxY = isothermType === 'freundlich' ? 30 : 15;
              const curY = 130 - (xm / maxY) * 110;
              return (
                <g>
                  <circle cx={curX} cy={curY} r="5" fill="#f43f5e" className="animate-pulse" />
                  <line x1={curX} y1={curY} x2={curX} y2="130" stroke="#f43f5e" strokeDasharray="3,3" />
                  <line x1="30" y1={curY} x2={curX} y2={curY} stroke="#f43f5e" strokeDasharray="3,3" />
                </g>
              );
            })()}
          </svg>
          <div className="flex justify-between text-xs font-mono text-gold-300 bg-slate-900/80 p-1.5 rounded">
            <span>P = {pressure} atm</span>
            <span>T = {temp} K</span>
            <span>x/m = {xm.toFixed(2)} g/g</span>
          </div>
        </div>

        {/* Canvas Molecular Surface Simulation */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
          <div className="text-xs text-slate-400 font-mono mb-1">Microscopic Surface Chamber Simulation</div>
          <canvas ref={canvasRef} width={300} height={180} className="w-full h-36 bg-slate-900 rounded" />
          
          {/* Controls */}
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Gas Pressure (P):</span>
              <input
                type="range"
                min="5"
                max="100"
                value={pressure}
                onChange={(e) => setPressure(Number(e.target.value))}
                className="w-32 accent-gold-400"
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Temperature (T):</span>
              <input
                type="range"
                min="200"
                max="400"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-32 accent-amber-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VISUAL COMPONENT 2: CATALYSIS ENERGY PROFILE
// ==========================================
const CatalysisVisualizer: React.FC = () => {
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0); // 0: Reactants, 1: Adsorbed, 2: Reacted, 3: Desorbed

  const handleNextStep = () => {
    audioManager.play('pop');
    setStep((prev) => (prev + 1) % 4);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
          <span>⚡</span> Catalysis & Activation Energy Barrier
        </h3>
        <button
          onClick={() => {
            setHasCatalyst(!hasCatalyst);
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            hasCatalyst ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
          }`}
        >
          {hasCatalyst ? '✅ Catalyst Active (Finely Divided Ni/Fe)' : '❌ No Catalyst'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Reaction Coordinate Curve */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 h-56 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-mono">Potential Energy vs Reaction Progress</span>
          <svg viewBox="0 0 300 160" className="w-full h-44">
            {/* Axis */}
            <line x1="30" y1="140" x2="280" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="30" y1="20" x2="30" y2="140" stroke="#475569" strokeWidth="2" />

            {/* Uncatalysed Curve (Higher Peak) */}
            <path
              d="M 30 110 C 100 10, 150 10, 200 110 L 280 130"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeDasharray={hasCatalyst ? '4,4' : 'none'}
              opacity={hasCatalyst ? 0.4 : 1}
            />

            {/* Catalysed Curve (Lower Peak) */}
            {hasCatalyst && (
              <path
                d="M 30 110 C 90 60, 150 60, 200 110 L 280 130"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />
            )}

            {/* Labels */}
            <text x="35" y="105" fill="#e2e8f0" fontSize="10">Reactants (N₂ + H₂)</text>
            <text x="220" y="125" fill="#e2e8f0" fontSize="10">Products (2NH₃)</text>
            
            {/* Ea arrow */}
            <line x1="120" y1="110" x2="120" y2={hasCatalyst ? '60' : '20'} stroke="#f59e0b" strokeWidth="2" />
            <text x="125" y={hasCatalyst ? '75' : '40'} fill="#f59e0b" fontSize="10" fontWeight="bold">
              Ea ({hasCatalyst ? 'Lowered' : 'High'})
            </text>
          </svg>
        </div>

        {/* Adsorption Mechanism Animation */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
          <div className="text-xs text-slate-400 font-mono">Heterogeneous Surface Steps (Haber / Hydrogenation)</div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 h-32 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Catalyst Surface */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-slate-700 border-t border-slate-500 flex items-center justify-around px-2 text-[10px] text-slate-300 font-mono">
              <span>Fe / Ni Catalyst Active Sites</span>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="text-2xl mb-1">⚛️ ⚛️</div>
                  <div className="text-xs text-gold-300 font-medium">1. Reactants Diffusion towards Surface</div>
                </motion.div>
              )}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="text-2xl mb-1 translate-y-3">📍 📍</div>
                  <div className="text-xs text-amber-300 font-medium">2. Adsorption & Activation (Bonds Weakened)</div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="text-2xl mb-1 translate-y-3">💥 🔗</div>
                  <div className="text-xs text-emerald-300 font-medium">3. Chemical Reaction on Active Surface</div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -10 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="text-2xl mb-1">✨ 🪶</div>
                  <div className="text-xs text-purple-300 font-medium">4. Desorption of Product Molecules</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleNextStep}
            className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-lg transition"
          >
            Step Mechanism ({step + 1} / 4) ➔
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VISUAL COMPONENT 3: COLLOID & TYNDALL BEAM
// ==========================================
const ColloidVisualizer: React.FC = () => {
  const [particleSize, setParticleSize] = useState<number>(10); // 0.5nm (True Sol), 10nm (Colloid), 2000nm (Suspension)
  const [electrophoresisOn, setElectrophoresisOn] = useState<boolean>(false);
  const [addedCoagulant, setAddedCoagulant] = useState<'none' | 'Na' | 'Mg' | 'Al'>('none');

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Type derived from size
  const typeLabel = useMemo(() => {
    if (particleSize < 1) return { name: 'True Solution', status: 'Clear / No Scattering', color: 'text-emerald-400' };
    if (particleSize <= 1000) return { name: 'Colloidal Sol (1-1000 nm)', status: 'Tyndall Beam Visible!', color: 'text-gold-400' };
    return { name: 'Suspension (>1000 nm)', status: 'Coarse / Rapid Settling', color: 'text-amber-400' };
  }, [particleSize]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h3 className="text-lg font-bold text-gold-300 flex items-center gap-2">
          <span>✨</span> Colloids, Tyndall Beam & Coagulation
        </h3>
        <div className={`text-xs px-3 py-1 rounded-full font-bold bg-slate-800 ${typeLabel.color}`}>
          {typeLabel.name}: {typeLabel.status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Tyndall Scattering Tank */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden">
          <div className="text-xs text-slate-400 font-mono mb-2">Laser Beam Light Path Simulation</div>
          
          <div className="relative h-36 bg-slate-900/90 rounded border border-slate-800 flex items-center overflow-hidden">
            {/* Torch Laser Source */}
            <div className="w-8 h-12 bg-red-600 rounded-r-md flex items-center justify-center font-bold text-[10px] text-white z-10 shadow-lg">
              LASER
            </div>

            {/* Beam inside beaker */}
            {particleSize >= 1 && particleSize <= 1000 && (
              <div
                className="h-8 bg-gradient-to-r from-red-500/80 via-red-400/90 to-red-500/80 blur-sm flex-1 animate-pulse"
                style={{ opacity: Math.min(1, particleSize / 100) }}
              />
            )}
            {particleSize < 1 && (
              <div className="h-0.5 bg-red-500/20 flex-1" />
            )}
            {particleSize > 1000 && (
              <div className="h-16 bg-red-500/30 flex-1 blur-md" />
            )}

            {/* Particles bouncing */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute rounded-full transition-all duration-1000 ${
                    electrophoresisOn ? 'translate-x-20' : ''
                  } ${addedCoagulant !== 'none' ? 'translate-y-10 scale-125 bg-amber-500' : 'bg-gold-300'}`}
                  style={{
                    width: `${Math.max(3, Math.min(16, particleSize / 20))}px`,
                    height: `${Math.max(3, Math.min(16, particleSize / 20))}px`,
                    top: `${(i * 19) % 80 + 10}%`,
                    left: `${(i * 31) % 70 + 15}%`,
                    opacity: 0.8
                  }}
                />
              ))}
            </div>

            {/* Electrophoresis Electrodes */}
            {electrophoresisOn && (
              <div className="absolute inset-y-0 inset-x-2 pointer-events-none flex justify-between items-center text-xs font-bold">
                <span className="bg-gold-600 px-1 py-3 rounded text-white font-mono">Cathode (-)</span>
                <span className="bg-rose-600 px-1 py-3 rounded text-white font-mono">Anode (+)</span>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-300">Particle Size:</span>
            <input
              type="range"
              min="0.2"
              max="1500"
              value={particleSize}
              onChange={(e) => setParticleSize(Number(e.target.value))}
              className="w-40 accent-gold-400"
            />
            <span className="font-mono text-gold-300 w-16 text-right">{particleSize.toFixed(0)} nm</span>
          </div>
        </div>

        {/* Hardy-Schulze Rule Interactive Lab */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 font-mono mb-2">Hardy-Schulze Rule: Coagulation of Negative Sol (As₂S₃)</div>
            <p className="text-xs text-slate-300 mb-3">
              Add electrolytes to test coagulating efficiency. Higher valency counter-ion neutralizes surface charge faster!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <button
              onClick={() => { setAddedCoagulant('Na'); audioManager.play('drop-correct'); }}
              className={`p-2 rounded border text-xs font-bold ${
                addedCoagulant === 'Na' ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}
            >
              NaCl (Na⁺)
              <div className="text-[10px] text-slate-400 font-normal">Valency +1 (Weak)</div>
            </button>
            <button
              onClick={() => { setAddedCoagulant('Mg'); audioManager.play('drop-correct'); }}
              className={`p-2 rounded border text-xs font-bold ${
                addedCoagulant === 'Mg' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}
            >
              MgCl₂ (Mg²⁺)
              <div className="text-[10px] text-slate-400 font-normal">Valency +2 (Moderate)</div>
            </button>
            <button
              onClick={() => { setAddedCoagulant('Al'); audioManager.play('drop-correct'); }}
              className={`p-2 rounded border text-xs font-bold ${
                addedCoagulant === 'Al' ? 'bg-rose-600 border-rose-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}
            >
              AlCl₃ (Al³⁺)
              <div className="text-[10px] text-slate-400 font-normal">Valency +3 (Strongest!)</div>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setElectrophoresisOn(!electrophoresisOn);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                electrophoresisOn ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {electrophoresisOn ? '⚡ Electrophoresis Active' : '🔌 Apply Electric Field'}
            </button>
            {addedCoagulant !== 'none' && (
              <button
                onClick={() => setAddedCoagulant('none')}
                className="text-xs text-slate-400 underline hover:text-white"
              >
                Reset Sol
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VISUAL COMPONENT 4: ELLINGHAM DIAGRAM
// ==========================================
const EllinghamVisualizer: React.FC = () => {
  const [temp, setTemp] = useState<number>(1000); // 400°C to 2000°C
  const [selectedTarget, setSelectedTarget] = useState<'Fe' | 'Al' | 'Cr'>('Fe');

  // Lines equations approx: ΔG = ΔH - TΔS
  // 1. 2Fe + O2 -> 2FeO : ΔG = -500 + 0.1 * T
  // 2. 4/3 Al + O2 -> 2/3 Al2O3 : ΔG = -1050 + 0.2 * T
  // 3. 4/3 Cr + O2 -> 2/3 Cr2O3 : ΔG = -750 + 0.16 * T
  // 4. 2C + O2 -> 2CO : ΔG = -220 - 0.18 * T (Slope DOWNWARD!)

  const getDeltaG = useCallback((type: string, t: number) => {
    switch (type) {
      case 'Fe': return -500 + 0.1 * t;
      case 'Al': return -1050 + 0.2 * t;
      case 'Cr': return -750 + 0.16 * t;
      case 'CO': return -220 - 0.18 * t;
      default: return 0;
    }
  }, []);

  const targetDG = getDeltaG(selectedTarget, temp);
  const carbonDG = getDeltaG('CO', temp);
  const isFeasible = carbonDG < targetDG;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
          <span>📈</span> Ellingham Diagram & Thermodynamic Feasibility
        </h3>
        <div className="flex gap-2">
          {(['Fe', 'Cr', 'Al'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setSelectedTarget(m); audioManager.play('tap'); }}
              className={`px-3 py-1 rounded text-xs font-bold ${
                selectedTarget === m ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Reduce {m === 'Fe' ? 'Fe₂O₃' : m === 'Cr' ? 'Cr₂O₃' : 'Al₂O₃'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Diagram SVG */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 h-60 flex flex-col justify-between">
          <div className="text-xs text-slate-400 font-mono">ΔG° (kJ/mol O₂) vs Temperature (°C)</div>
          
          <svg viewBox="0 0 300 180" className="w-full h-44 overflow-visible">
            {/* Axis */}
            <line x1="30" y1="160" x2="280" y2="160" stroke="#475569" strokeWidth="1.5" />
            <line x1="30" y1="20" x2="30" y2="160" stroke="#475569" strokeWidth="1.5" />
            <text x="270" y="175" fill="#94a3b8" fontSize="9">T (°C)</text>
            <text x="5" y="15" fill="#94a3b8" fontSize="9">ΔG°</text>

            {/* Line 2C + O2 -> 2CO (Downward!) */}
            <line x1="30" y1="90" x2="280" y2="150" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="220" y="142" fill="#f59e0b" fontSize="9" fontWeight="bold">2C + O₂ ➔ 2CO</text>

            {/* Target Line */}
            {selectedTarget === 'Fe' && (
              <line x1="30" y1="60" x2="280" y2="110" stroke="#f43f5e" strokeWidth="2.5" />
            )}
            {selectedTarget === 'Cr' && (
              <line x1="30" y1="35" x2="280" y2="85" stroke="#a855f7" strokeWidth="2.5" />
            )}
            {selectedTarget === 'Al' && (
              <line x1="30" y1="15" x2="280" y2="55" stroke="#38bdf8" strokeWidth="2.5" />
            )}

            {/* Temperature Cursor Line */}
            {(() => {
              const cx = 30 + ((temp - 400) / 1600) * 250;
              return (
                <g>
                  <line x1={cx} y1="20" x2={cx} y2="160" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
                  <circle cx={cx} cy="100" r="4" fill="#10b981" />
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Thermodynamic Prediction Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 font-mono mb-2">Reduction Feasibility Analysis</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Target Oxide ΔG°:</span>
                <span className="font-mono text-slate-200">{targetDG.toFixed(0)} kJ/mol</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Carbon (2C➔2CO) ΔG°:</span>
                <span className="font-mono text-amber-400">{carbonDG.toFixed(0)} kJ/mol</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1 font-bold">
                <span className="text-slate-300">Net ΔG° (Reduction):</span>
                <span className={`font-mono ${isFeasible ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {(targetDG - carbonDG).toFixed(0)} kJ/mol
                </span>
              </div>
            </div>

            <div className={`mt-4 p-3 rounded-lg border text-xs font-semibold ${
              isFeasible
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
            }`}>
              {isFeasible ? (
                <>✅ SPONTANEOUS! Carbon line lies BELOW target oxide line at {temp}°C. Carbon effectively reduces the oxide in blast furnace.</>
              ) : (
                <>❌ NON-SPONTANEOUS! Target oxide is too stable. Carbon line lies above oxide line at {temp}°C. Requires higher T or Electrolysis.</>
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Furnace Temperature (T):</span>
              <span className="font-mono text-emerald-400">{temp} °C</span>
            </div>
            <input
              type="range"
              min="400"
              max="2000"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VISUAL COMPONENT 5: REFINING & CONCENTRATION
// ==========================================
const RefiningVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flotation' | 'electrolytic'>('electrolytic');
  const [cellCurrent, setCellCurrent] = useState<number>(5); // Amperes

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
          <span>🏭</span> Ore Concentration & Electrolytic Metal Refining
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveTab('electrolytic'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded text-xs font-bold ${
              activeTab === 'electrolytic' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Electrolytic Copper Cell
          </button>
          <button
            onClick={() => { setActiveTab('flotation'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded text-xs font-bold ${
              activeTab === 'flotation' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Froth Flotation Tank
          </button>
        </div>
      </div>

      {activeTab === 'electrolytic' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Cell Diagram */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 h-56 relative flex flex-col justify-between overflow-hidden">
            <div className="text-xs text-slate-400 font-mono">Electrolytic Refining Cell (CuSO₄ + H₂SO₄)</div>

            <div className="relative h-36 bg-slate-900 rounded border border-slate-800 p-2 flex justify-around items-end">
              {/* Electrolyte liquid */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gold-600/30 border-t border-gold-400/50" />

              {/* Anode (Impure Cu Slab) */}
              <div className="w-8 bg-amber-800 border-2 border-amber-600 rounded-t h-28 z-10 flex flex-col items-center justify-start pt-1 text-[9px] font-bold text-amber-200">
                Anode (+)
                <span className="text-[8px] text-amber-300">Dissolves</span>
              </div>

              {/* Cathode (Pure Cu Sheet) */}
              <div className="w-6 bg-amber-500 border-2 border-amber-300 rounded-t h-28 z-10 flex flex-col items-center justify-start pt-1 text-[9px] font-bold text-slate-950">
                Cathode (-)
                <span className="text-[8px]">Pure Cu</span>
              </div>

              {/* Anode Mud at bottom */}
              <div className="absolute bottom-1 left-4 w-16 h-3 bg-slate-950 border border-amber-500/40 rounded text-[8px] text-amber-400 flex items-center justify-center font-mono">
                Anode Mud (Ag, Au)
              </div>
            </div>
          </div>

          {/* Cell Equations & Controls */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs text-slate-400 font-mono">Electrode Reactions</div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-xs font-mono">
                <span className="text-amber-400">Anode (+):</span> Cu(impure) ➔ Cu²⁺ + 2e⁻
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-xs font-mono">
                <span className="text-emerald-400">Cathode (-):</span> Cu²⁺ + 2e⁻ ➔ Cu(pure)
              </div>
              <p className="text-[11px] text-slate-300">
                Active impurities (Fe, Ni) remain in solution as sulphate salts; unreactive noble metals (Ag, Au, Pt) drop to the bottom as highly valuable <strong className="text-amber-300">Anode Mud</strong>.
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Cell Current: {cellCurrent} A</span>
              <button
                onClick={() => {
                  setCellCurrent((c) => (c % 15) + 5);
                  audioManager.play('swoop');
                }}
                className="px-3 py-1 bg-purple-600 text-white rounded font-bold hover:bg-purple-500"
              >
                Increase Current ⚡
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 h-56 flex flex-col justify-between relative overflow-hidden">
          <div className="text-xs text-slate-400 font-mono">Froth Flotation Tank for Sulphide Ores (Galena PbS / ZnS)</div>

          <div className="relative h-40 bg-slate-900 rounded border border-slate-800 overflow-hidden flex flex-col justify-between p-2">
            {/* Froth Layer on top */}
            <div className="h-8 bg-amber-500/40 border-b border-amber-400 flex items-center justify-around text-xs font-bold text-amber-200">
              <span>🫧 Froth Layer (Sulphide + Pine Oil)</span>
            </div>

            {/* Water + Gangue at bottom */}
            <div className="flex-1 bg-gold-950/40 flex items-end justify-between px-4 pb-2">
              <div className="text-[10px] text-slate-400 font-mono">
                Water-wetted Gangue (Silica) Sinks to Bottom
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Freundlich Adsorption Isotherm Holds True at All Pressure Ranges",
    description: "Students often believe that the Freundlich equation (x/m = k·P^(1/n)) applies universally across all pressure conditions, assuming adsorption increases indefinitely with pressure.",
    correction: "The Freundlich adsorption isotherm is strictly an empirical relationship valid only over a limited, moderate range of pressures. At high pressures, the term 1/n approaches 0, causing x/m to become constant (x/m = k) and independent of pressure. Beyond this saturation point, further increases in pressure fail to increase the extent of adsorption.",
  },
  {
    id: "misc_2",
    title: "Chemisorption Always Decreases Continuously with Increasing Temperature",
    description: "Students frequently confuse the temperature effect on physisorption with chemisorption, believing both types of adsorption decrease monotonically as temperature rises.",
    correction: "Unlike physisorption which decreases continuously with temperature due to its exothermic nature, chemisorption initially increases with temperature before decreasing. Chemisorption requires an activation energy to form chemical bonds with the surface, so initial heating accelerates adsorption. Once peak adsorption is attained, higher thermal energy causes desorption to dominate.",
  },
  {
    id: "misc_3",
    title: "Freundlich Isotherm Assumes the Formation of Monolayer Adsorption",
    description: "Students often mix up theoretical assumptions, believing that the Freundlich isotherm model describes single-layer gas molecule attachment on uniform adsorption sites.",
    correction: "The Langmuir isotherm theoretically assumes unimolecular (monolayer) adsorption on a surface containing equivalent, non-interacting fixed sites. In contrast, the Freundlich isotherm is an empirical model that accounts for multilayer adsorption on heterogeneous surfaces with non-uniform binding energies. Freundlich does not explicitly account for monolayer saturation limits at very high pressures.",
  },
  {
    id: "misc_4",
    title: "The Value of Exponent 1/n Can Be Any Real Number",
    description: "Students assume that the exponent 1/n in the Freundlich equation can take any positive or negative numerical value depending on experimental conditions.",
    correction: "The fractional exponent 1/n in the Freundlich isotherm strictly ranges between 0 and 1 (meaning n > 1). When 1/n = 0, adsorption becomes independent of pressure, representing saturation at high pressure. When 1/n = 1, x/m = k·P, showing direct linear pressure dependence at very low pressure.",
  },
  {
    id: "misc_5",
    title: "All Adsorption Isotherms Represent Completely Reversible Physical Processes",
    description: "Students tend to believe that all gas-solid adsorption isotherms represent fully reversible equilibrium states that easily desorb along the exact same curve upon pressure reduction.",
    correction: "Physisorption isotherms are fully reversible because adsorbates are held by weak van der Waals forces, allowing easy desorption. Chemisorption involves high-energy chemical bond formation, making the process highly specific and generally irreversible. Consequently, removing a chemisorbed gas requires high energy or produces altered compound species rather than simple reversible desorption.",
  },
];

export default function C12_ChemistryAdsorptionisothermsSim() {
  const [mode, setMode] = useState<ViewMode>('slides');
  const [slideIdx, setSlideIdx] = useState<number>(0);
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Discovery predict state
  const [prediction, setPrediction] = useState<string | null>(null);

  // BKT state per node
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const currentSlide = TEACHING_SLIDES[slideIdx];
  const currentChallenge = CHALLENGES[challengeIdx];

  // Narration speech on slide change
  useEffect(() => {
    if (mode === 'slides' && currentSlide) {
      speechManager.speak(currentSlide.title + '. ' + currentSlide.keyTakeaway);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
    }
  }, [mode, slideIdx, currentSlide]);

  // Handle Challenge Submission
  const handleAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    const isCorrect = optionIdx === currentChallenge.correctIndex;
    const targetNode = currentChallenge.nodeId;

    // Audio & Speech
    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Correct! Excellent chemical reasoning.');
      setShowSparkle(true);
      setScore((s) => s + 10);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the concept tip carefully.');
    }

    // BKT & SRS Update
    const updatedBkt = bktUpdate(bktStates[targetNode] || createBKTState(), isCorrect);
    setBktStates((prev) => ({ ...prev, [targetNode]: updatedBkt }));

    const item = createReviewItem(currentChallenge.id, 'Chemistry');
    sm2Update(item, isCorrect ? 5 : 2, 0);
    recordGameScore(ALL_NODE_IDS, isCorrect ? 10 : 0);
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setShowSparkle(false);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx((prev) => prev + 1);
      audioManager.play('whoosh');
    } else {
      setShowConfetti(true);
      setShowSuccess(true);
      audioManager.play('celebration');
      setMode('summary');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Top Header Navigation */}
      <header className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="text-xs font-mono text-gold-400 font-bold uppercase tracking-wider">
            Class 12 ISC Chemistry • Surface Chemistry & Metallurgy
          </div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span>⚗️</span> Adsorption, Colloids & Extraction Laboratory
          </h1>
        </div>

        <nav className="flex gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setMode('slides')}
            className={`px-3 py-1.5 rounded-lg transition ${
              mode === 'slides' ? 'bg-gold-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            📚 Interactive Lessons
          </button>
          <button
            onClick={() => setMode('sandbox')}
            className={`px-3 py-1.5 rounded-lg transition ${
              mode === 'sandbox' ? 'bg-gold-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            🧪 Sandbox Lab
          </button>
          <button
            onClick={() => setMode('challenges')}
            className={`px-3 py-1.5 rounded-lg transition ${
              mode === 'challenges' ? 'bg-gold-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            🏆 Master Challenges ({challengeIdx + 1}/{CHALLENGES.length})
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-5xl flex-1 flex flex-col">
        {/* INTERACTIVE LESSONS SLIDES */}
        {mode === 'slides' && (
          <div className="space-y-6">
            {/* Visualizer based on Slide Visual Type */}
            {currentSlide.visualType === 'isotherms' && <AdsorptionVisualizer />}
            {currentSlide.visualType === 'catalysis' && <CatalysisVisualizer />}
            {currentSlide.visualType === 'colloids' && <ColloidVisualizer />}
            {currentSlide.visualType === 'ellingham' && <EllinghamVisualizer />}
            {currentSlide.visualType === 'refining' && <RefiningVisualizer />}

            {/* Slide Explanation Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">
                  Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
                </span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-semibold">
                  Node: {currentSlide.nodeId}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{currentSlide.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{currentSlide.content}</p>
              
              <div className="p-3 bg-gold-950/40 border border-gold-500/30 rounded-lg text-xs font-medium text-gold-200">
                💡 <strong>Key Board Examination Takeaway:</strong> {currentSlide.keyTakeaway}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    if (slideIdx > 0) setSlideIdx((s) => s - 1);
                    audioManager.play('tap');
                  }}
                  disabled={slideIdx === 0}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-200"
                >
                  ◀ Previous Slide
                </button>
                <div className="flex gap-1">
                  {TEACHING_SLIDES.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === slideIdx ? 'bg-gold-400 w-6' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                {slideIdx < TEACHING_SLIDES.length - 1 ? (
                  <button
                    onClick={() => {
                      setSlideIdx((s) => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-2 rounded-lg bg-gold-500 text-slate-950 font-bold text-xs hover:bg-gold-400"
                  >
                    Next Slide ▶
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMode('challenges');
                      audioManager.play('celebration');
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
                  >
                    Start Challenges 🚀
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SANDBOX LAB */}
        {mode === 'sandbox' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
              🛠️ <strong>Sandbox Mode:</strong> Freely test parameters across all 5 core surface chemistry and extraction modules below.
            </div>
            <AdsorptionVisualizer />
            <CatalysisVisualizer />
            <ColloidVisualizer />
            <EllinghamVisualizer />
            <RefiningVisualizer />
          </div>
        )}

        {/* MASTER CHALLENGES */}
        {mode === 'challenges' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-gold-400 font-bold">
                  Challenge {challengeIdx + 1} of {CHALLENGES.length}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-slate-800 px-3 py-1 rounded-full">
                  Score: {score} pts
                </span>
              </div>

              <h2 className="text-lg font-bold text-white mb-2">{currentChallenge.title}</h2>
              <p className="text-sm text-slate-200 mb-6 leading-relaxed">{currentChallenge.question}</p>

              <div className="space-y-3 mb-6">
                {currentChallenge.options.map((opt, idx) => {
                  let btnClass = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700';
                  if (selectedOption !== null) {
                    if (idx === currentChallenge.correctIndex) {
                      btnClass = 'bg-emerald-600 border-emerald-400 text-white font-bold';
                    } else if (idx === selectedOption) {
                      btnClass = 'bg-rose-600 border-rose-400 text-white font-bold';
                    } else {
                      btnClass = 'bg-slate-900 border-slate-800 text-slate-500 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition flex items-center justify-between ${btnClass}`}
                    >
                      <span>{opt}</span>
                      {selectedOption !== null && idx === currentChallenge.correctIndex && <span>✅</span>}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 border border-slate-800 rounded-xl mb-4">
                  <div className="text-xs font-bold text-gold-400 mb-1">Explanation & Mastery Insight:</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentChallenge.explanation}</p>
                </motion.div>
              )}

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-slate-400 underline hover:text-white"
                >
                  {showHint ? 'Hide Concept Tip' : '💡 Need a Hint?'}
                </button>
                {selectedOption !== null && (
                  <button
                    onClick={handleNextChallenge}
                    className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 text-xs font-bold rounded-lg transition"
                  >
                    Next Challenge ➔
                  </button>
                )}
              </div>

              <HintBubble show={showHint} text={currentChallenge.misconceptionTip} />
            </div>
          </div>
        )}

        {/* SUMMARY / MASTERY REPORT */}
        {mode === 'summary' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-6 shadow-2xl">
            <div className="text-5xl mb-2">🎉</div>
            <h2 className="text-2xl font-black text-white">Surface Chemistry & Metallurgy Mastered!</h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              You have completed all 10 core Class 12 ISC nodes covering adsorption isotherms, catalysis, colloids, Ellingham diagrams, and metal refining.
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 inline-block font-mono text-gold-400 text-lg font-bold">
              Final Score: {score} / {CHALLENGES.length * 10} pts
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setChallengeIdx(0);
                  setSelectedOption(null);
                  setScore(0);
                  setMode('challenges');
                  audioManager.play('tap');
                }}
                className="px-6 py-2.5 bg-gold-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-gold-400"
              >
                Retry Challenges 🔄
              </button>
              <button
                onClick={() => {
                  setMode('sandbox');
                  audioManager.play('tap');
                }}
                className="px-6 py-2.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-700"
              >
                Return to Lab 🧪
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All Metallurgy & Surface Nodes Completed!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
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
  );
}