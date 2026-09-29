"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPES & NODE DEFINITIONS
// ==========================================
type NodeId = 'c6_chem_017' | 'c6_chem_018' | 'c6_chem_019';
const ALL_NODE_IDS: NodeId[] = ['c6_chem_017', 'c6_chem_018', 'c6_chem_019'];

interface Props {
  onComplete?: (score: number) => void;
}

interface Misconception {
  id: string;
  statement: string;
  correction: string;
  nodeId: NodeId;
}

interface DiagnosticQuestion {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  misconceptionId?: string;
}

// ==========================================
// SCENARIOS & ENRICHMENT DATA
// ==========================================
const SCENARIO = {
  title: "Gases of Air & Water Properties Laboratory",
  subtitle: "Explore Nitrogen, CO₂, Acid Rain, and the Physical & Chemical Wonders of Water!",
  description: "Investigate how atmospheric gases react, simulate acid rain on marble heritage monuments, explore water's particle states from ice to steam, and perform live chemical experiments with active metals and oxides."
};

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'm_co2_acidic',
    statement: "All gases or oxides in air are basic, or CO₂ is harmless and unreactive in rain.",
    correction: "CO₂, SO₂, and NOx are acidic oxides. They dissolve in rainwater to form carbonic, sulphurous, and nitric acids, turning rain acidic.",
    nodeId: 'c6_chem_017'
  },
  {
    id: 'm_taj_colour',
    statement: "The Taj Mahal turns yellow because rainwater is yellow, not due to a chemical reaction.",
    correction: "Acid rain (containing sulphuric/nitric acid) chemically corrodes the marble (calcium carbonate: CaCO₃) forming calcium salts, destroying its lustre and causing yellowing.",
    nodeId: 'c6_chem_017'
  },
  {
    id: 'm_steam_new_substance',
    statement: "Boiling water turns it into steam which is a new substance, making boiling a chemical change.",
    correction: "Steam is still water (H₂O) in the gaseous state. Boil/condensation are physical & reversible changes; no new molecules are created.",
    nodeId: 'c6_chem_018'
  },
  {
    id: 'm_water_only_solvent',
    statement: "Water is only a passive solvent that dissolves things; it never takes part in chemical reactions.",
    correction: "Water is chemically active! It reacts violently with reactive metals (2Na + 2H₂O → 2NaOH + H₂↑) and reacts with quicklime (CaO + H₂O → Ca(OH)₂ + heat).",
    nodeId: 'c6_chem_019'
  },
  {
    id: 'm_nh4cl_cold_chemical',
    statement: "When ammonium chloride dissolves in water and feels cold, a new chemical substance has formed.",
    correction: "Dissolving NH₄Cl is a physical endothermic dissolution. Separating the crystals absorbs heat energy, but evaporating water yields pure NH₄Cl again.",
    nodeId: 'c6_chem_019'
  }
];

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'q1',
    nodeId: 'c6_chem_017',
    question: "Which gas makes up approximately 78% of dry air and helps dilute oxygen's reactivity while providing essential nitrogen for plant fertilizers?",
    options: ["Carbon Dioxide (0.04%)", "Oxygen (21%)", "Nitrogen (78%)", "Argon (0.93%)"],
    correctIndex: 2,
    explanation: "Nitrogen (78%) is the largest component of air. It is relatively unreactive at room temperature, dilutes oxygen, and is vital for plant growth when converted into nitrates."
  },
  {
    id: 'q2',
    nodeId: 'c6_chem_017',
    question: "When CO₂ gas is bubbled through clear limewater [Ca(OH)₂], what visual reaction occurs and why?",
    options: [
      "It turns milky white due to insoluble Calcium Carbonate (CaCO₃) formation.",
      "It turns bright blue because an acid neutralizes it.",
      "It catches fire with a pop sound.",
      "No visible change occurs because CO₂ is unreactive."
    ],
    correctIndex: 0,
    explanation: "Ca(OH)₂ + CO₂ → CaCO₃↓ (white precipitate) + H₂O. The formation of insoluble calcium carbonate turns limewater milky, which is the standard chemical test for CO₂."
  },
  {
    id: 'q3',
    nodeId: 'c6_chem_017',
    question: "Why does acid rain cause yellowing and corrosion on white marble structures like the Taj Mahal?",
    options: [
      "Raindrops carry yellow dust from industrial chimneys.",
      "Acidic oxides (SO₂, NOx) in rain form acids that react chemically with the marble's Calcium Carbonate (CaCO₃).",
      "Nitrogen gas in air directly bleaches the stone.",
      "Water washes away the surface paint on marble."
    ],
    correctIndex: 1,
    explanation: "Marble is Calcium Carbonate (CaCO₃). Acidic rain containing H₂SO₄ and HNO₃ reacts with CaCO₃ to produce soluble salts, corroding and discolouring the marble.",
    misconceptionId: 'm_taj_colour'
  },
  {
    id: 'q4',
    nodeId: 'c6_chem_018',
    question: "At normal atmospheric pressure, what are the fixed boiling point and freezing point of pure water?",
    options: [
      "Boiling: 100°C | Freezing: 0°C",
      "Boiling: 0°C | Freezing: 100°C",
      "Boiling: 80°C | Freezing: -10°C",
      "Boiling: 50°C | Freezing: 0°C"
    ],
    correctIndex: 0,
    explanation: "Pure water freezes at 0°C and boils at 100°C under 1 atm pressure. These fixed points define key state changes on the Celsius scale."
  },
  {
    id: 'q5',
    nodeId: 'c6_chem_018',
    question: "Why is the conversion of water into steam at 100°C classified as a physical change rather than a chemical change?",
    options: [
      "Because steam is a light blue gas.",
      "Because no new substance is formed; steam consists of H₂O molecules that can condense back into liquid water.",
      "Because boiling requires electricity.",
      "Because steam has a different chemical formula from liquid water."
    ],
    correctIndex: 1,
    explanation: "State changes alter particle spacing and kinetic energy, not chemical composition. Steam is gaseous H₂O and can cool back into liquid water (reversible).",
    misconceptionId: 'm_steam_new_substance'
  },
  {
    id: 'q6',
    nodeId: 'c6_chem_019',
    question: "What happens when a small piece of active Sodium metal (Na) is dropped into water (H₂O)?",
    options: [
      "It dissolves harmlessly like sugar.",
      "It reacts vigorously, forming Sodium Hydroxide (NaOH) and releasing Hydrogen gas (H₂↑).",
      "It freezes the water instantly into ice.",
      "It turns into carbon dioxide gas."
    ],
    correctIndex: 1,
    explanation: "2Na + 2H₂O → 2NaOH + H₂↑. Water acts as a chemical reactant with alkali metals, liberating flammable hydrogen gas and forming an alkaline solution."
  },
  {
    id: 'q7',
    nodeId: 'c6_chem_019',
    question: "When Quicklime (Calcium Oxide, CaO) is added to water in a beaker, the mixture boils with a hissing sound and gets very hot. What chemical product is formed?",
    options: [
      "Slaked Lime [Calcium Hydroxide, Ca(OH)₂]",
      "Calcium Nitrate [Ca(NO₃)₂]",
      "Sodium Chloride [NaCl]",
      "Pure Oxygen gas"
    ],
    correctIndex: 0,
    explanation: "CaO + H₂O → Ca(OH)₂ + heat. This highly exothermic reaction produces Slaked Lime (Calcium Hydroxide), demonstrating water as an active chemical reactant."
  },
  {
    id: 'q8',
    nodeId: 'c6_chem_019',
    question: "Which of the following events is a PHYSICAL change, not a chemical change?",
    options: [
      "Adding Quicklime (CaO) to water",
      "Dropping Sodium metal into water",
      "Dissolving Sugar or Salt in water",
      "Respiration in living cells releasing energy"
    ],
    correctIndex: 2,
    explanation: "Dissolving sugar in water is a physical dissolution. No chemical bonds are broken/formed, sugar remains sweet, and evaporating water recovers pure sugar crystals.",
    misconceptionId: 'm_nh4cl_cold_chemical'
  }
];

// ==========================================
// VISUAL COMPONENTS (CANVAS / SVG)
// ==========================================

// Visual 1: Air composition & animated molecules
const AirCompositionVisualizer: React.FC<{ activeGas: string; onSelectGas: (gas: string) => void }> = ({ activeGas, onSelectGas }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Particle pool: 78 N2 (blue), 21 O2 (red), 1 CO2 (green)
    const particles: { x: number; y: number; vx: number; vy: number; type: 'N2' | 'O2' | 'CO2' }[] = [];
    
    for (let i = 0; i < 78; i++) {
      particles.push({
        x: Math.random() * (width - 20) + 10,
        y: Math.random() * (height - 20) + 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        type: 'N2'
      });
    }
    for (let i = 0; i < 21; i++) {
      particles.push({
        x: Math.random() * (width - 20) + 10,
        y: Math.random() * (height - 20) + 10,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        type: 'O2'
      });
    }
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: Math.random() * (width - 20) + 10,
        y: Math.random() * (height - 20) + 10,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        type: 'CO2'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw container boundary
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(5, 5, width - 10, height - 10);

      // Render particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 12 || p.x > width - 12) p.vx *= -1;
        if (p.y < 12 || p.y > height - 12) p.vy *= -1;

        ctx.beginPath();
        let color = '#3b82f6'; // N2
        let radius = 4;

        if (p.type === 'O2') {
          color = '#ef4444';
          radius = 5;
        } else if (p.type === 'CO2') {
          color = '#10b981';
          radius = 6;
        }

        // Highlight selected gas
        if (activeGas !== 'ALL' && p.type !== activeGas) {
          color = 'rgba(148, 163, 184, 0.2)';
        }

        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // If selected, draw glow
        if (activeGas === p.type) {
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeGas]);

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-3">
        <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Atmospheric Gas Mixture (100 Particles)</span>
        <div className="flex gap-2">
          {['ALL', 'N2', 'O2', 'CO2'].map((gas) => (
            <button
              key={gas}
              onClick={() => {
                audioManager.play('tap');
                onSelectGas(gas);
              }}
              className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                activeGas === gas
                  ? 'bg-gold-500 text-white font-bold shadow-md shadow-gold-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {gas === 'ALL' ? 'Show All' : gas === 'N2' ? 'Nitrogen (78%)' : gas === 'O2' ? 'Oxygen (21%)' : 'CO₂ (0.04%)'}
            </button>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} width={380} height={180} className="rounded-lg bg-slate-950 border border-slate-800" />
      <div className="grid grid-cols-3 gap-2 w-full mt-3 text-center text-xs">
        <div className="bg-gold-950/60 border border-gold-800/50 p-2 rounded-lg text-gold-300">
          <div className="font-bold text-sm">78% N₂</div>
          <div className="text-[10px] text-slate-400">Unreactive diluent; essential for fertilizers</div>
        </div>
        <div className="bg-red-950/60 border border-red-800/50 p-2 rounded-lg text-red-300">
          <div className="font-bold text-sm">21% O₂</div>
          <div className="text-[10px] text-slate-400">Supports combustion & cellular respiration</div>
        </div>
        <div className="bg-emerald-950/60 border border-emerald-800/50 p-2 rounded-lg text-emerald-300">
          <div className="font-bold text-sm">0.04% CO₂</div>
          <div className="text-[10px] text-slate-400">Photosynthesis gas; turns limewater milky</div>
        </div>
      </div>
    </div>
  );
};

// Visual 2: Taj Mahal Acid Rain Corrosion Simulator
const TajMahalAcidRainVisualizer: React.FC = () => {
  const [rainPh, setRainPh] = useState<number>(6.5); // 6.5 = normal, 3.5 = severe acid rain
  const [isRaining, setIsRaining] = useState<boolean>(false);

  const calculateCorrosionPercent = useMemo(() => {
    if (rainPh >= 5.6) return 0;
    return Math.min(100, Math.round(((5.6 - rainPh) / 2.6) * 100));
  }, [rainPh]);

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
          Acid Rain & Marble Heritage Corrosion
        </span>
        <button
          onClick={() => {
            audioManager.play('pop');
            setIsRaining(!isRaining);
          }}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            isRaining ? 'bg-gold-600 text-white animate-pulse' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {isRaining ? '🌧️ Rain Simulation ACTIVE' : 'Start Rain Simulation'}
        </button>
      </div>

      {/* pH Slider */}
      <div className="w-full bg-slate-950 p-3 rounded-lg border border-slate-800 mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Rainfall pH Level:</span>
          <span className={`font-bold ${rainPh < 5.0 ? 'text-red-400' : rainPh < 5.6 ? 'text-amber-400' : 'text-emerald-400'}`}>
            pH {rainPh.toFixed(1)} ({rainPh < 5.6 ? 'Acidic Rain' : 'Normal Rain'})
          </span>
        </div>
        <input
          type="range"
          min="3.0"
          max="7.0"
          step="0.1"
          value={rainPh}
          onChange={(e) => {
            setRainPh(parseFloat(e.target.value));
            audioManager.play('chime');
          }}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>pH 3.0 (Acid Rain: SO₂ + NOx)</span>
          <span>pH 5.6 (Threshold)</span>
          <span>pH 7.0 (Pure Water)</span>
        </div>
      </div>

      {/* Simulation Box */}
      <div className="relative w-full h-48 bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/30 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Animated Rain drops */}
        {isRaining && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: (i * 18) % 360, opacity: 0.8 }}
                animate={{ y: 200, opacity: 0.2 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6 + (i % 5) * 0.1,
                  delay: (i % 7) * 0.08
                }}
                className={`absolute w-0.5 h-4 rounded-full ${rainPh < 5.0 ? 'bg-red-400' : 'bg-gold-400'}`}
              />
            ))}
          </div>
        )}

        {/* Taj Mahal SVG Graphic */}
        <svg viewBox="0 0 300 160" className="w-64 h-40">
          {/* Base Platform */}
          <rect x="30" y="130" width="240" height="20" fill={rainPh < 5.0 ? '#854d0e' : '#cbd5e1'} rx="2" />
          
          {/* Main Body */}
          <rect
            x="70"
            y="70"
            width="160"
            height="60"
            fill={
              rainPh < 4.0
                ? '#a16207'
                : rainPh < 5.0
                ? '#d97706'
                : rainPh < 5.6
                ? '#fef08a'
                : '#f8fafc'
            }
            transition="fill 0.5s ease"
          />

          {/* Central Arch */}
          <path d="M 120 130 L 120 95 Q 150 80 180 95 L 180 130 Z" fill="#1e293b" />

          {/* Main Central Dome */}
          <path
            d="M 115 70 Q 115 25 150 20 Q 185 25 185 70 Z"
            fill={
              rainPh < 4.0
                ? '#b45309'
                : rainPh < 5.0
                ? '#f59e0b'
                : rainPh < 5.6
                ? '#fef9c3'
                : '#ffffff'
            }
          />
          <line x1="150" y1="20" x2="150" y2="10" stroke="#f59e0b" strokeWidth="2" />

          {/* Minarets Left & Right */}
          <rect x="40" y="40" width="12" height="90" fill={rainPh < 5.0 ? '#a16207' : '#f1f5f9'} />
          <path d="M 38 40 Q 46 25 54 40 Z" fill={rainPh < 5.0 ? '#78350f' : '#cbd5e1'} />

          <rect x="248" y="40" width="12" height="90" fill={rainPh < 5.0 ? '#a16207' : '#f1f5f9'} />
          <path d="M 246 40 Q 254 25 262 40 Z" fill={rainPh < 5.0 ? '#78350f' : '#cbd5e1'} />

          {/* Corrosion Overlay Effects */}
          {calculateCorrosionPercent > 0 && (
            <text x="150" y="110" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">
              ⚠️ CORROSION: {calculateCorrosionPercent}%
            </text>
          )}
        </svg>

        {/* Floating chemical reaction tag */}
        <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 border border-slate-700 rounded p-1.5 text-center text-[11px] text-slate-300">
          <span className="font-mono text-amber-300">CaCO₃ (Marble) + H₂SO₄ (Acid Rain) → CaSO₄ + H₂O + CO₂↑</span>
        </div>
      </div>
    </div>
  );
};

// Visual 3: Water Heating & Particle State Interconversion
const WaterStateParticleCanvas: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(25); // -20°C to 120°C
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stateName = useMemo(() => {
    if (temperature < 0) return { name: "SOLID ICE", color: "text-gold-300", desc: "Fixed rigid crystal lattice; particles vibrate in position." };
    if (temperature === 0) return { name: "MELTING POINT (0°C)", color: "text-emerald-400", desc: "Solid ice melting into liquid water at equilibrium." };
    if (temperature < 100) return { name: "LIQUID WATER", color: "text-gold-400", desc: "Fluid state; particles slide past each other smoothly." };
    if (temperature === 100) return { name: "BOILING POINT (100°C)", color: "text-amber-400", desc: "Rapid vaporization throughout the liquid forming steam." };
    return { name: "GASEOUS STEAM", color: "text-red-400", desc: "Gas state; H₂O molecules move rapidly with large gaps." };
  }, [temperature]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = canvas.width;
    const height = canvas.height;

    // 36 Water molecules
    const particles = Array.from({ length: 36 }, (_, idx) => {
      const col = idx % 6;
      const row = Math.floor(idx / 6);
      return {
        baseX: 120 + col * 24,
        baseY: 80 + row * 20,
        x: 120 + col * 24,
        y: 80 + row * 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Beaker outline
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(80, 20);
      ctx.lineTo(80, 150);
      ctx.lineTo(300, 150);
      ctx.lineTo(300, 20);
      ctx.stroke();

      // Kinetic speed scaling factor
      const speedFactor = temperature <= 0 ? 0.3 : Math.min(6, 0.5 + (temperature / 20));

      particles.forEach((p) => {
        if (temperature < 0) {
          // Solid: vibrate around crystal lattice
          p.x = p.baseX + (Math.sin(Date.now() * 0.01 + p.baseY) * 1.5);
          p.y = p.baseY + (Math.cos(Date.now() * 0.01 + p.baseX) * 1.5);
        } else if (temperature < 100) {
          // Liquid: slide in beaker bottom
          p.x += p.vx * (speedFactor * 0.5);
          p.y += p.vy * (speedFactor * 0.5);

          if (p.x < 90 || p.x > 290) p.vx *= -1;
          if (p.y < 90 || p.y > 142) p.vy *= -1;
        } else {
          // Gas (Steam): expand freely out of beaker
          p.x += p.vx * speedFactor;
          p.y += p.vy * speedFactor;

          if (p.x < 30 || p.x > 350) p.vx *= -1;
          if (p.y < 10 || p.y > 150) p.vy *= -1;
        }

        // Draw H2O molecule (1 Oxygen red, 2 Hydrogen white)
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = temperature > 99 ? '#f87171' : temperature < 0 ? '#38bdf8' : '#60a5fa';
        ctx.fill();

        // Hydrogen ears
        ctx.beginPath();
        ctx.arc(p.x - 5, p.y - 4, 3, 0, Math.PI * 2);
        ctx.arc(p.x + 5, p.y - 4, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [temperature]);

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
          Water Physical States & Interconversion
        </span>
        <span className={`text-xs font-bold ${stateName.color}`}>{stateName.name}</span>
      </div>

      <canvas ref={canvasRef} width={380} height={160} className="rounded-lg bg-slate-950 border border-slate-800 mb-3" />

      {/* Temperature Control */}
      <div className="w-full bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Temperature Thermometer:</span>
          <span className="font-bold text-amber-400 font-mono">{temperature}°C</span>
        </div>
        <input
          type="range"
          min="-20"
          max="120"
          value={temperature}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setTemperature(val);
            if (val === 0 || val === 100) audioManager.play('sparkle');
            else audioManager.play('tap');
          }}
          className="w-full accent-gold-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>-20°C (Ice)</span>
          <span className="text-gold-400 font-bold">0°C (Melting/Freezing)</span>
          <span className="text-gold-400">25°C (Room Temp)</span>
          <span className="text-amber-400 font-bold">100°C (Boiling)</span>
          <span>120°C (Steam)</span>
        </div>
      </div>
      <p className="text-[11px] text-slate-400 mt-2 text-center italic">{stateName.desc}</p>
    </div>
  );
};

// Visual 4: Chemical Properties Reaction Lab (Sodium, Quicklime, Sugar, NH4Cl)
const WaterChemicalReactionLab: React.FC = () => {
  const [selectedSubstance, setSelectedSubstance] = useState<'SODIUM' | 'QUICKLIME' | 'SUGAR' | 'NH4CL'>('QUICKLIME');
  const [reactionActive, setReactionActive] = useState<boolean>(false);
  const [tempDelta, setTempDelta] = useState<number>(0);

  const performReaction = (substance: 'SODIUM' | 'QUICKLIME' | 'SUGAR' | 'NH4CL') => {
    setSelectedSubstance(substance);
    setReactionActive(true);
    audioManager.play('whoosh');

    if (substance === 'QUICKLIME') {
      setTempDelta(45); // Heating up exothermic
      speechManager.speak("Quicklime reacts with water producing slaked lime and releasing tremendous heat!");
    } else if (substance === 'SODIUM') {
      setTempDelta(60);
      speechManager.speak("Sodium reacts violently with water, releasing hydrogen gas and forming sodium hydroxide!");
    } else if (substance === 'NH4CL') {
      setTempDelta(-12); // Endothermic cooling
      speechManager.speak("Ammonium chloride dissolves physically, absorbing heat and making the beaker cold.");
    } else {
      setTempDelta(0);
      speechManager.speak("Sugar dissolves physically in water. No chemical change occurs.");
    }

    setTimeout(() => {
      audioManager.play('sparkle');
    }, 800);
  };

  const reactionDetails = useMemo(() => {
    switch (selectedSubstance) {
      case 'QUICKLIME':
        return {
          title: "Quicklime (CaO) + Water (H₂O)",
          type: "CHEMICAL CHANGE (Exothermic)",
          equation: "CaO + H₂O → Ca(OH)₂ + Heat",
          obs: "Hissing sound, vigorous boiling, turns into Slaked Lime, temperature rises +45°C."
        };
      case 'SODIUM':
        return {
          title: "Sodium Metal (Na) + Water (H₂O)",
          type: "CHEMICAL CHANGE (Vigorous Reactant)",
          equation: "2Na + 2H₂O → 2NaOH + H₂↑ + Heat",
          obs: "Sodium darts on water surface, fizzes rapidly, releases H₂ gas, forms alkaline NaOH."
        };
      case 'NH4CL':
        return {
          title: "Ammonium Chloride (NH₄Cl) + Water (H₂O)",
          type: "PHYSICAL DISSOLUTION (Endothermic)",
          equation: "NH₄Cl (s) + H₂O (l) → NH₄⁺ (aq) + Cl⁻ (aq)",
          obs: "Solid vanishes, solution cools down (-12°C). Evaporating water yields original crystals."
        };
      case 'SUGAR':
        return {
          title: "Sugar (C₁₂H₂₂O₁₁) + Water (H₂O)",
          type: "PHYSICAL DISSOLUTION",
          equation: "Sugar (solid) → Sugar (solution in water)",
          obs: "Sugar molecules disperse. Sweet taste remains; pure sugar recovered by evaporation."
        };
    }
  }, [selectedSubstance]);

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Water Chemical & Physical Reaction Workbench
        </span>
      </div>

      {/* Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mb-3">
        {(['QUICKLIME', 'SODIUM', 'SUGAR', 'NH4CL'] as const).map((item) => (
          <button
            key={item}
            onClick={() => performReaction(item)}
            className={`p-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center border ${
              selectedSubstance === item
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>{item === 'QUICKLIME' ? '🧪 Quicklime (CaO)' : item === 'SODIUM' ? '⚡ Sodium (Na)' : item === 'SUGAR' ? '🍬 Sugar' : '🧊 NH₄Cl'}</span>
          </button>
        ))}
      </div>

      {/* Visual Display Box */}
      <div className="relative w-full h-44 bg-slate-950 rounded-lg border border-slate-800 p-4 flex flex-col justify-between overflow-hidden">
        {/* Animated reaction graphics inside beaker */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className={`w-32 h-32 rounded-full blur-2xl ${tempDelta > 0 ? 'bg-amber-500' : tempDelta < 0 ? 'bg-gold-500' : 'bg-emerald-500'}`} />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-bold text-slate-100">{reactionDetails.title}</h4>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                reactionDetails.type.includes('CHEMICAL')
                  ? 'bg-red-900/80 text-red-200 border border-red-700'
                  : 'bg-gold-900/80 text-gold-200 border border-gold-700'
              }`}
            >
              {reactionDetails.type}
            </span>
          </div>
          <div className="text-xs font-mono text-emerald-400 mt-2 bg-slate-900 p-2 rounded border border-slate-800">
            {reactionDetails.equation}
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Observation:</span>
            <span className="text-slate-200 text-[11px]">{reactionDetails.obs}</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800 flex flex-col justify-center items-center">
            <span className="text-slate-400 text-[10px]">Temp Shift:</span>
            <span className={`text-base font-bold ${tempDelta > 0 ? 'text-amber-400' : tempDelta < 0 ? 'text-gold-400' : 'text-slate-300'}`}>
              {tempDelta > 0 ? `+${tempDelta}°C 🔥` : tempDelta < 0 ? `${tempDelta}°C ❄️` : '0°C (Constant)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// TEACHING SLIDES DATA
// ==========================================
const TEACHING_SLIDES = [
  {
    id: 'slide1',
    title: "1. Composition of Air: Nitrogen & Carbon Dioxide",
    content: `Air is a homogeneous mixture of gases surrounding Earth. Nitrogen (N₂) makes up 78%, Oxygen (O₂) 21%, Argon 0.93%, and Carbon Dioxide (CO₂) 0.04%. Although CO₂ exists in a tiny percentage, it is indispensable for photosynthesis in green plants. Nitrogen acts as an unreactive diluent that prevents atmospheric combustion from burning out of control, while providing raw material for essential plant nitrogen fertilizers.`,
    nodeId: 'c6_chem_017' as NodeId,
    visualType: 'AIR_COMPOSITION'
  },
  {
    id: 'slide2',
    title: "2. Acid Rain & Taj Mahal Chemical Corrosion",
    content: `When factories and fossil fuels burn, acidic oxides such as Sulphur Dioxide (SO₂), Nitrogen Oxides (NOx), and Carbon Dioxide (CO₂) escape into clouds. These acidic oxides dissolve in rain droplets forming carbonic acid, sulphurous acid, and nitric acid. When acid rain falls on white marble (Calcium Carbonate, CaCO₃) monuments like the Taj Mahal, a chemical reaction occurs: CaCO₃ + Acid → Calcium Salts + Water + CO₂. This corrodes the marble, turning its white shine into a rough, yellowed surface.`,
    nodeId: 'c6_chem_017' as NodeId,
    visualType: 'ACID_RAIN'
  },
  {
    id: 'slide3',
    title: "3. Water - Fixed Physical Properties & State Changes",
    content: `Pure water (H₂O) is a transparent, colourless, odourless liquid at room temperature. At 1 atm pressure, pure water has fixed physical points: Freezing Point at 0°C and Boiling Point at 100°C. State interconversions (Melting, Freezing, Evaporation, Boiling, Condensation) are physical and reversible changes because H₂O molecules remain chemically identical throughout solid ice, liquid water, and gaseous steam.`,
    nodeId: 'c6_chem_018' as NodeId,
    visualType: 'WATER_STATES'
  },
  {
    id: 'slide4',
    title: "4. Water as an Active Chemical Reactant",
    content: `Water is not merely a passive solvent; it actively participates in chemical reactions! When active alkali metals like Sodium (Na) touch water, a violent exothermic reaction produces Sodium Hydroxide (NaOH) and releases Hydrogen gas (2Na + 2H₂O → 2NaOH + H₂↑). Water also reacts with metal oxides: Quicklime (CaO) + Water (H₂O) → Slaked Lime [Ca(OH)₂] + tremendous heat evolution!`,
    nodeId: 'c6_chem_019' as NodeId,
    visualType: 'WATER_REACTIONS'
  },
  {
    id: 'slide5',
    title: "5. Physical Dissolution vs Chemical Reaction in Water",
    content: `How do we distinguish physical dissolution from a true chemical reaction in water? Dissolving Sugar or Salt in water is physical: no new chemical bonds form, taste is retained, and evaporating water yields pure sugar crystals back. Dissolving Ammonium Chloride (NH₄Cl) absorbs heat (endothermic cooling), but is also physical. In contrast, reacting Quicklime (CaO) with water produces a NEW chemical compound (Slaked Lime, Ca(OH)₂) with irreversible heat release and sound!`,
    nodeId: 'c6_chem_019' as NodeId,
    visualType: 'WATER_REACTIONS'
  }
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST: { id: string; title: string; description: string; correction: string }[] = [
  {
    id: "misc_1",
    title: "Humans breathe only oxygen and exhale only carbon dioxide",
    description: "Students often believe that inhaled air consists strictly of pure oxygen and exhaled air contains strictly carbon dioxide. They assume nitrogen and other gases are filtered out before entering the lungs.",
    correction: "Inhaled air is the normal atmospheric mixture containing 78% nitrogen, 21% oxygen, and tiny amounts of other gases. The body absorbs only a portion of the oxygen and releases carbon dioxide into the exhaled mixture. Therefore, exhaled air still contains mostly nitrogen along with about 16% oxygen and 4% carbon dioxide.",
  },
  {
    id: "misc_2",
    title: "Plants absorb nitrogen gas directly from air through their leaves",
    description: "Since nitrogen makes up 78% of the air, students assume plants absorb it directly through leaf stomata just as they do with carbon dioxide.",
    correction: "Plants cannot use elemental nitrogen gas directly from the atmosphere. They rely on nitrogen-fixing bacteria in the soil or root nodules to convert atmospheric nitrogen into usable nitrogen compounds like nitrates. Plants then absorb these dissolved compounds through their root system to synthesize proteins.",
  },
  {
    id: "misc_3",
    title: "Plants use carbon dioxide for respiration instead of oxygen gas",
    description: "Students confuse photosynthesis with respiration and believe plants breathe in carbon dioxide and breathe out oxygen continuously without needing oxygen.",
    correction: "Plants perform photosynthesis to prepare food using carbon dioxide, but like all living organisms, they also perform respiration day and night using oxygen to release energy. During daytime, the oxygen produced by photosynthesis exceeds the oxygen consumed by respiration, which conceals the fact that plants are using oxygen.",
  },
  {
    id: "misc_4",
    title: "The greenhouse effect is entirely harmful to Earth's survival",
    description: "Students frequently view the greenhouse effect solely as a dangerous environmental problem caused by human pollution that must be completely eliminated.",
    correction: "The natural greenhouse effect is an essential process that traps heat to keep Earth warm enough to sustain life. Without naturally occurring greenhouse gases like carbon dioxide, Earth's average temperature would drop to around -18°C. Environmental harm occurs only when excessive human activities increase carbon dioxide levels, causing global warming beyond normal limits.",
  },
  {
    id: "misc_5",
    title: "Carbon dioxide makes up a large percentage of atmospheric air",
    description: "Because carbon dioxide is heavily emphasized in lessons about photosynthesis and climate change, students often assume it forms a major fraction of the air.",
    correction: "Carbon dioxide is a trace gas that makes up only about 0.04% of Earth's atmosphere by volume. Nitrogen (78%) and oxygen (21%) together make up almost 99% of the total air. Despite its very small percentage, carbon dioxide plays a critical role in sustaining plant life and maintaining global thermal balance.",
  },
];

// ==========================================
// MAIN SIMULATION COMPONENT
// ==========================================
export default function C6_ChemistryCarbondioxideandnitrogeninairSim({ onComplete }: Props) {
  // Navigation / Tab state
  const [activeTab, setActiveTab] = useState<'DISCOVERY' | 'SLIDES' | 'INTERACTIVE_LAB' | 'CHALLENGES' | 'SUMMARY'>('DISCOVERY');
  
  // Interactive Gas Visualizer state
  const [selectedGas, setSelectedGas] = useState<string>('ALL');

  // Slide state
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Challenge / Diagnostic state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);

  // Prediction Discovery State
  const [predictionAnswer, setPredictionAnswer] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);

  // SRS & BKT Tracking State
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>({
    c6_chem_017: createBKTState(),
    c6_chem_018: createBKTState(),
    c6_chem_019: createBKTState()
  });

  const [srsItems, setSrsItems] = useState<Record<NodeId, ReturnType<typeof createReviewItem>>>({
    c6_chem_017: createReviewItem('c6_chem_017', 'Chemistry'),
    c6_chem_018: createReviewItem('c6_chem_018', 'Chemistry'),
    c6_chem_019: createReviewItem('c6_chem_019', 'Chemistry')
  });

  // UI FX States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Auto-hint timer (10s inactivity)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'CHALLENGES' && !isAnswerSubmitted) {
        const q = DIAGNOSTIC_QUESTIONS[currentChallengeIndex];
        setCurrentHint(`💡 Hint: Think about whether new chemical bonds are made or if it's a state/dissolution change!`);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [activeTab, currentChallengeIndex, isAnswerSubmitted]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex, activeTab]);

  // Handle Discovery Predict answer
  const handlePredictionSubmit = (optionIdx: number) => {
    audioManager.play('tap');
    setPredictionAnswer(optionIdx);
    setPredictionSubmitted(true);

    if (optionIdx === 1) {
      // Correct prediction: Acid rain forms sulphuric/nitric acid reacting with CaCO3
      audioManager.play('drop-correct');
      speechManager.speak("Spot on! Acid rain chemically reacts with the marble's calcium carbonate.");
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("Interesting guess! Let's explore how acidic oxides chemically corrode marble stone.");
    }
  };

  // Handle Challenge Option Click
  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    audioManager.play('tap');
    setSelectedOption(index);
  };

  // Handle Challenge Answer Submission
  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const currentQ = DIAGNOSTIC_QUESTIONS[currentChallengeIndex];
    const correct = selectedOption === currentQ.correctIndex;
    setIsAnswerSubmitted(true);
    setIsCorrect(correct);

    const targetNode = currentQ.nodeId;

    // Update BKT & SRS
    const updatedBKT = bktUpdate(bktStates[targetNode], correct);
    const updatedSRS = sm2Update(srsItems[targetNode], correct ? 5 : 2, 0);

    setBktStates(prev => ({ ...prev, [targetNode]: updatedBKT }));
    setSrsItems(prev => ({ ...prev, [targetNode]: updatedSRS }));

    if (correct) {
      audioManager.play('drop-correct');
      setShowSparkle(true);
      setScore(prev => prev + 10);
      speechManager.speak("Excellent! That's chemically accurate!");
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("Not quite right. Read the chemical explanation below!");
      if (currentQ.misconceptionId) {
        const misc = MISCONCEPTIONS.find(m => m.id === currentQ.misconceptionId);
        if (misc) {
          setCurrentHint(`⚠️ Common Misconception: ${misc.statement} -> Correction: ${misc.correction}`);
          setShowHint(true);
        }
      }
    }
  };

  // Move to next challenge
  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setShowHint(false);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);

    if (currentChallengeIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      // Completed all challenges
      setActiveTab('SUMMARY');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak("Congratulations! You have mastered Carbon Dioxide, Nitrogen, and Water properties!");

      // Save Game Score
      recordGameScore(Object.values(ALL_NODE_IDS), score + 10);

      if (onComplete) onComplete(score + 10);
    }
  };

  // Render current slide visual component
  const renderSlideVisual = (visualType: string) => {
    switch (visualType) {
      case 'AIR_COMPOSITION':
        return <AirCompositionVisualizer activeGas={selectedGas} onSelectGas={setSelectedGas} />;
      case 'ACID_RAIN':
        return <TajMahalAcidRainVisualizer />;
      case 'WATER_STATES':
        return <WaterStateParticleCanvas />;
      case 'WATER_REACTIONS':
        return <WaterChemicalReactionLab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 font-sans flex flex-col items-center">
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Achieved! Gas & Water Chemistry Complete!" />
      {showSparkle && <SparkleBurst show={true} x={300} y={200} />}

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Header Bar */}
        <div className="bg-slate-900/90 border-b border-slate-800 p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-gold-500/20 text-gold-400 border border-gold-500/30 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
                Class 6 ICSE Chemistry
              </span>
              <span className="text-xs text-slate-400">c6_chem_017 • c6_chem_018 • c6_chem_019</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-100 mt-1">{SCENARIO.title}</h1>
          </div>

          {/* Navigation Tab Buttons */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['DISCOVERY', 'SLIDES', 'INTERACTIVE_LAB', 'CHALLENGES', 'SUMMARY'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  audioManager.play('tap');
                  setActiveTab(tab);
                  setShowHint(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-gold-600 text-white shadow-md shadow-gold-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab === 'DISCOVERY'
                  ? '🔮 Predict'
                  : tab === 'SLIDES'
                  ? '📚 Concept Slides'
                  : tab === 'INTERACTIVE_LAB'
                  ? '🧪 Visual Lab'
                  : tab === 'CHALLENGES'
                  ? `🎯 Quiz (${currentChallengeIndex + 1}/${DIAGNOSTIC_QUESTIONS.length})`
                  : '🏆 Summary'}
              </button>
            ))}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-950 h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-400 h-full transition-all duration-300"
            style={{
              width: `${
                activeTab === 'DISCOVERY'
                  ? 10
                  : activeTab === 'SLIDES'
                  ? 25 + (currentSlideIndex / TEACHING_SLIDES.length) * 25
                  : activeTab === 'INTERACTIVE_LAB'
                  ? 60
                  : activeTab === 'CHALLENGES'
                  ? 65 + (currentChallengeIndex / DIAGNOSTIC_QUESTIONS.length) * 30
                  : 100
              }%`
            }}
          />
        </div>

        {/* Content View Area */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
          {/* ========================================== */}
          {/* TAB 1: DISCOVERY PREDICTION QUESTION */}
          {/* ========================================== */}
          {activeTab === 'DISCOVERY' && (
            <div className="flex flex-col gap-4">
              <div className="bg-gold-950/40 border border-gold-800/60 p-4 rounded-xl">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-1">
                  🔍 Discovery Predictor Challenge
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  Imagine rain falling on the historic white marble Taj Mahal in Agra. Why does the smooth white marble slowly corrode and turn yellowish over time?
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  "Rainwater simply carries yellow dust particles from nearby highways.",
                  "Acidic oxides (SO₂, NOx) in air dissolve in rain forming acids that chemically react with the marble's Calcium Carbonate (CaCO₃).",
                  "Sunlight turns rainwater into acid which bleaches away the surface paint.",
                  "Nitrogen gas in air directly attaches to marble, giving it a yellow dye."
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePredictionSubmit(idx)}
                    disabled={predictionSubmitted}
                    className={`p-3.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                      predictionAnswer === idx
                        ? idx === 1
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100'
                          : 'bg-red-900/60 border-red-500 text-red-100'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {predictionSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-2"
                >
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">Chemical Insight:</span> Marble is Calcium Carbonate (CaCO₃). Industrial waste gases (SO₂ and NOx) act as acidic oxides. They dissolve in rainwater to form sulphuric and nitric acids, corroding CaCO₃ into calcium salts, which destroys its lustre and causes yellowing!
                  </p>
                  <button
                    onClick={() => {
                      audioManager.play('whoosh');
                      setActiveTab('SLIDES');
                    }}
                    className="self-end bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                  >
                    Continue to Concept Slides →
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 2: VISUAL TEACHING SLIDES */}
          {/* ========================================== */}
          {activeTab === 'SLIDES' && (
            <div className="flex flex-col gap-4">
              {/* Slide Navigation Header */}
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 px-2">
                  Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={currentSlideIndex === 0}
                    onClick={() => {
                      audioManager.play('whoosh');
                      setCurrentSlideIndex(prev => prev - 1);
                    }}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg transition-all"
                  >
                    ← Prev
                  </button>
                  <button
                    disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                    onClick={() => {
                      audioManager.play('whoosh');
                      setCurrentSlideIndex(prev => prev + 1);
                    }}
                    className="px-3 py-1 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Slide Content Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-base font-bold text-gold-300">
                    {TEACHING_SLIDES[currentSlideIndex].title}
                  </h3>

                  {/* Interactive Visual Component */}
                  {renderSlideVisual(TEACHING_SLIDES[currentSlideIndex].visualType)}

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {TEACHING_SLIDES[currentSlideIndex].content}
                  </p>
                </motion.div>
              </AnimatePresence>

              {currentSlideIndex === TEACHING_SLIDES.length - 1 && (
                <button
                  onClick={() => {
                    audioManager.play('sparkle');
                    setActiveTab('INTERACTIVE_LAB');
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20"
                >
                  Enter Interactive Laboratory Workbench →
                </button>
              )}
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 3: INTERACTIVE LAB SANDBOX */}
          {/* ========================================== */}
          {activeTab === 'INTERACTIVE_LAB' && (
            <div className="flex flex-col gap-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  🧪 Hands-on Interactive Chemistry Workbench
                </h3>
                <p className="text-xs text-slate-300">
                  Switch between physical state interconversion and water chemical reactions below to observe how temperature, particles, and chemical reactants behave!
                </p>
              </div>

              {/* Water States Component */}
              <WaterStateParticleCanvas />

              {/* Water Chemical Workbench */}
              <WaterChemicalReactionLab />

              <button
                onClick={() => {
                  audioManager.play('whoosh');
                  setActiveTab('CHALLENGES');
                }}
                className="w-full bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-gold-600/20"
              >
                Proceed to Adaptive Mastery Challenges →
              </button>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 4: ADAPTIVE CHALLENGES & QUIZ */}
          {/* ========================================== */}
          {activeTab === 'CHALLENGES' && (
            <div className="flex flex-col gap-4">
              {/* Question Header Info */}
              <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                <span className="font-bold text-gold-400">
                  Question {currentChallengeIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <div className="flex gap-3 text-slate-400 font-mono">
                  <span>Score: <strong className="text-amber-400">{score}</strong></span>
                  <span>Mastery: <strong className="text-emerald-400">
                    {Math.round(
                      (masteryProb(bktStates['c6_chem_017']) +
                        masteryProb(bktStates['c6_chem_018']) +
                        masteryProb(bktStates['c6_chem_019'])) / 3 * 100
                    )}%
                  </strong></span>
                </div>
              </div>

              {/* Question Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-slate-100 leading-snug">
                  {DIAGNOSTIC_QUESTIONS[currentChallengeIndex].question}
                </h3>
              </div>

              {/* Options List */}
              <div className="grid grid-cols-1 gap-2">
                {DIAGNOSTIC_QUESTIONS[currentChallengeIndex].options.map((option, idx) => {
                  let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750';

                  if (isAnswerSubmitted) {
                    if (idx === DIAGNOSTIC_QUESTIONS[currentChallengeIndex].correctIndex) {
                      btnStyle = 'bg-emerald-900/80 border-emerald-500 text-emerald-100 font-bold';
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-red-900/80 border-red-500 text-red-100 font-bold';
                    } else {
                      btnStyle = 'bg-slate-900 border-slate-800 text-slate-500 opacity-50';
                    }
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-gold-700 border-gold-400 text-white font-bold ring-2 ring-gold-400/30';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isAnswerSubmitted}
                      className={`p-3 rounded-xl text-left text-xs transition-all border flex items-center justify-between ${btnStyle}`}
                    >
                      <span>
                        <strong className="mr-2">{String.fromCharCode(65 + idx)}.</strong>
                        {option}
                      </span>
                      {isAnswerSubmitted && idx === DIAGNOSTIC_QUESTIONS[currentChallengeIndex].correctIndex && (
                        <span className="text-emerald-400 text-xs font-bold">✓ Correct</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit / Next Actions */}
              <div className="flex justify-between items-center mt-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20"
                  >
                    Check Chemical Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="w-full bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-gold-600/20"
                  >
                    {currentChallengeIndex < DIAGNOSTIC_QUESTIONS.length - 1 ? 'Next Question →' : 'Complete Challenge & View Summary →'}
                  </button>
                )}
              </div>

              {/* Feedback Explanation Box */}
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200'
                      : 'bg-red-950/50 border-red-800 text-red-200'
                  }`}
                >
                  <span className="font-bold block mb-1">
                    {isCorrect ? '✅ Correct Explanation:' : '❌ Chemical Explanation:'}
                  </span>
                  {DIAGNOSTIC_QUESTIONS[currentChallengeIndex].explanation}
                </motion.div>
              )}

              {/* Hint Bubble */}
              <HintBubble show={showHint} text={currentHint} />
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 5: SUMMARY & MASTERY CARD */}
          {/* ========================================== */}
          {activeTab === 'SUMMARY' && (
            <div className="flex flex-col gap-4 text-center">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl mb-3">
                  🏆
                </div>
                <h2 className="text-xl font-extrabold text-slate-100">Simulations & Concepts Completed!</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  You have mastered the chemical roles of Nitrogen, Carbon Dioxide, Acid Rain corrosion, Water Physical States, and Water Chemical Reactions!
                </p>

                {/* Score Summary */}
                <div className="grid grid-cols-3 gap-3 w-full my-5">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Final Score</span>
                    <span className="text-lg font-extrabold text-amber-400">{score} pts</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">BKT Mastery</span>
                    <span className="text-lg font-extrabold text-emerald-400">
                      {Math.round(
                        (masteryProb(bktStates['c6_chem_017']) +
                          masteryProb(bktStates['c6_chem_018']) +
                          masteryProb(bktStates['c6_chem_019'])) / 3 * 100
                      )}%
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Nodes Mastered</span>
                    <span className="text-lg font-extrabold text-gold-400">3 / 3</span>
                  </div>
                </div>

                {/* Node Status Pills */}
                <div className="flex flex-col gap-2 w-full text-left mb-4">
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-gold-300">c6_chem_017</span>
                      <span className="text-slate-400 block text-[11px]">Carbon Dioxide & Nitrogen in Air</span>
                    </div>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                      MASTERED
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-gold-300">c6_chem_018</span>
                      <span className="text-slate-400 block text-[11px]">Water - Physical Properties & State Changes</span>
                    </div>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                      MASTERED
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-gold-300">c6_chem_019</span>
                      <span className="text-slate-400 block text-[11px]">Water - Chemical Properties & Reactions</span>
                    </div>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                      MASTERED
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveTab('DISCOVERY');
                    setCurrentChallengeIndex(0);
                    setScore(0);
                  }}
                  className="bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all"
                >
                  🔄 Restart Laboratory & Quiz
                </button>
              </div>
            </div>
          )}
        </div>

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