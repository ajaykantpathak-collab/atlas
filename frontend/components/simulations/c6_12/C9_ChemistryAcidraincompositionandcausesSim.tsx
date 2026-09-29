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

// --- NODE IDENTIFIERS ---
const NODE_ACID_RAIN = 'c9_chem_051';
const NODE_GLOBAL_WARMING = 'c9_chem_052';
const NODE_OZONE_DEPLETION = 'c9_chem_053';
const NODE_WATER_POLLUTION = 'c9_chem_054';

const ALL_NODE_IDS = [
  'c9_chem_051',
  'c9_chem_052',
  'c9_chem_053',
  'c9_chem_054'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// --- INTERFACES ---
interface DiagnosticQuestion {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  misconceptionId?: string;
}

interface SlideData {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  definition: string;
  walkthrough: string;
  eli5: string;
  equations?: string[];
  interactiveMode: 'acid_rain' | 'greenhouse' | 'ozone' | 'water';
}

interface MisconceptionData {
  id: string;
  misconception: string;
  correction: string;
}

interface InteractiveState {
  so2Emission: number;
  noxEmission: number;
  co2Level: number;
  ch4Level: number;
  cfcLevel: number;
  sewageRunoff: number;
  fertilizerRunoff: number;
}

// --- MISCONCEPTION DATABASE ---
const MISCONCEPTIONS: Record<string, MisconceptionData> = {
  co2_acid_rain: {
    id: 'co2_acid_rain',
    misconception: 'Carbon dioxide is the main cause of acid rain.',
    correction: 'Normal rain is slightly acidic (pH ~5.6) due to CO2 forming carbonic acid. Acid rain (pH < 5.0) is caused by oxides of sulphur (SO2) and nitrogen (NOx).'
  },
  basic_oxides: {
    id: 'basic_oxides',
    misconception: 'SO2 and NO2 are basic or amphoteric oxides.',
    correction: 'SO2, SO3, NO, and NO2 are acidic non-metallic oxides because they react with water to form sulphuric and nitric acids.'
  },
  so2_greenhouse: {
    id: 'so2_greenhouse',
    misconception: 'Sulphur dioxide is a major greenhouse gas.',
    correction: 'SO2 causes acid rain. The 4 major greenhouse gases in Class 9 ICSE are water vapour, carbon dioxide, methane, and oxides of nitrogen (NOx).'
  },
  cfc_physical_hole: {
    id: 'cfc_physical_hole',
    misconception: 'CFCs physically tear holes in the ozone layer.',
    correction: 'UV light breaks CFCs in the stratosphere, releasing chlorine atoms that chemically break down O3 into O2 in catalytic cycles.'
  },
  ozone_always_harmful: {
    id: 'ozone_always_harmful',
    misconception: 'Ozone is always a harmful atmospheric pollutant.',
    correction: 'Ground-level ozone is a toxic pollutant in smog, but stratospheric ozone (15-35 km) is essential as it shields Earth from harmful UV rays.'
  },
  minamata_lead: {
    id: 'minamata_lead',
    misconception: 'Minamata disease is caused by lead or cadmium poisoning.',
    correction: 'Minamata disease is specifically caused by methylmercury poisoning from industrial wastewater accumulated in fish.'
  },
  electrophoresis_pollution: {
    id: 'electrophoresis_pollution',
    misconception: 'Electrophoresis is the standard primary method for cleaning all river pollution.',
    correction: 'Electrophoresis relates to colloid chemistry; water pollution prevention relies on sewage treatment, industrial effluent neutralization, and agricultural runoff control.'
  }
};

// --- TEACHING SLIDES ---
const TEACHING_SLIDES: SlideData[] = [
  {
    id: 'slide_051',
    nodeId: NODE_ACID_RAIN,
    title: '1. Acid Rain: Composition & Causes',
    subtitle: 'From Fossil Fuel Combustion to Corrosive Precipitation',
    definition: 'Acid rain is precipitation with a pH below 5.0 (normal rain is ~5.6 due to dissolved CO2) caused by atmospheric oxides of sulphur and nitrogen dissolving in water droplets.',
    walkthrough: 'Fossil fuels contain sulphur impurities. When burned, S + O2 → SO2. Further oxidation gives 2SO2 + O2 → 2SO3, which reacts with cloud water: SO3 + H2O → H2SO4 (Sulphuric Acid). In high-temp internal combustion engines, atmospheric nitrogen reacts with oxygen: N2 + O2 → 2NO, which oxidises to 2NO2 + O2 → 2NO2, then 2NO2 + H2O → HNO3 + HNO2 (Nitric & Nitrous Acid).',
    eli5: 'When factories burn dirty coal or engines get super hot, sulphur and nitrogen turn into acidic gases. These mix with rain clouds, turning rain into a weak acid that damages marble statues (like the Taj Mahal) and washes nutrients out of soil.',
    equations: [
      'S + O2 → SO2',
      '2SO2 + O2 → 2SO3',
      'SO3 + H2O → H2SO4',
      'N2 + O2 → 2NO (at >1000°C)',
      '2NO + O2 → 2NO2',
      '2NO2 + H2O → HNO3 + HNO2'
    ],
    interactiveMode: 'acid_rain'
  },
  {
    id: 'slide_052',
    nodeId: NODE_GLOBAL_WARMING,
    title: '2. Global Warming & Greenhouse Gases',
    subtitle: 'The Thermal Blanket of Earth\'s Lower Atmosphere',
    definition: 'Global warming is the gradual rise in Earth\'s average atmospheric temperature caused by greenhouse gases trapping outgoing longwave infrared (heat) radiation.',
    walkthrough: 'Sunlight hits Earth as shortwave radiation. Earth warms up and emits heat as longwave infrared. Greenhouse gases absorb this infrared and re-radiate it back to the surface. The 4 primary ICSE syllabus greenhouse gases are Water Vapour (H2O), Carbon Dioxide (CO2), Methane (CH4), and Oxides of Nitrogen (NOx).',
    eli5: 'Think of Earth wearing a cozy blanket. Earth needs some blanket to stay warm! But burning coal, rice farming (methane), and car exhausts make the blanket too thick, trapping too much heat.',
    equations: [
      'Solar Radiation (Shortwave) → Passes through atmosphere',
      'Earth Re-emits Infrared (Longwave Heat)',
      'Greenhouse Gases (CO2, CH4, NOx, H2O) → Absorb & Re-radiate Heat'
    ],
    interactiveMode: 'greenhouse'
  },
  {
    id: 'slide_053',
    nodeId: NODE_OZONE_DEPLETION,
    title: '3. Ozone Layer & Depletion',
    subtitle: 'Stratospheric UV Shield vs. Chlorofluorocarbons',
    definition: 'Ozone (O3) in the stratosphere (15–35 km) shields Earth from harmful UV-B and UV-C radiation. Depletion occurs when CFCs release chlorine atoms under UV light, accelerating O3 breakdown.',
    walkthrough: 'Ozone formation is a 2-step natural cycle: (1) O2 + UV (hv) → O + O. (2) O + O2 + M → O3 + M (where M is a stabilizing third molecule like N2). CFCs (from old fridges and propellants) rise to the stratosphere where UV breaks off Cl atoms that destroy O3 molecules.',
    eli5: 'Stratospheric ozone is like a natural pair of sunglasses for the Earth. CFCs break the sunglasses, letting UV rays reach Earth—causing skin burns, eye damage, and harming crops.',
    equations: [
      'O2 + hv (UV) → O + O',
      'O + O2 + M → O3 + M (Stabilized Ozone)',
      'CFC + UV → Cl· (Reactive Chlorine Atom)',
      'Cl· + O3 → ClO· + O2 (Ozone Destruction)'
    ],
    interactiveMode: 'ozone'
  },
  {
    id: 'slide_054',
    nodeId: NODE_WATER_POLLUTION,
    title: '4. Water Pollution & Dissolved Oxygen',
    subtitle: 'Aquatic Ecosystem Balance, Minamata Disease & Eutrophication',
    definition: 'Water pollution alters water chemistry, reducing Dissolved Oxygen (DO) required by aquatic life and introducing toxic heavy metals, plastics, pesticides, and raw sewage.',
    walkthrough: 'Natural water carries Dissolved Oxygen (~8-14 mg/L) essential for fish respiration. Sewage & agricultural fertilizers (nitrates/phosphates) trigger rapid algal blooms (Eutrophication). When algae die, bacteria decompose them, consuming DO and creating dead zones. Toxic heavy metals like Methylmercury accumulate up the food chain, causing neurological Minamata Disease.',
    eli5: 'Fish need invisible oxygen dissolved in water to breathe. When dirty sewage or fertilizers enter ponds, algae grow crazy fast. When algae rot, bacteria steal all the oxygen, suffocating the fish!',
    equations: [
      'High Sewage / Fertilizer → Algal Bloom (Eutrophication)',
      'Decomposition of Algae → High Biological Oxygen Demand (BOD)',
      'Dissolved Oxygen Drops → Aquatic Animal Mortality',
      'Methylmercury Concentration → Biomagnification → Minamata Disease'
    ],
    interactiveMode: 'water'
  }
];

// --- DIAGNOSTIC & MASTERY CHALLENGES (8 Progressive Challenges) ---
const CHALLENGES: DiagnosticQuestion[] = [
  {
    id: 'ch_1',
    nodeId: NODE_ACID_RAIN,
    question: 'Normal rain has a pH around 5.6 due to dissolved carbon dioxide forming carbonic acid. What pH threshold defines Acid Rain, and which two acids are its MAIN constituents?',
    options: [
      'pH < 7.0; Carbonic acid and Hydrochloric acid',
      'pH < 5.0; Sulphuric acid (H2SO4) and Nitric acid (HNO3)',
      'pH < 3.0; Formic acid and Acetic acid',
      'pH < 5.6; Sulphurous acid and Phosphoric acid'
    ],
    correctAnswer: 1,
    explanation: 'Acid rain is defined as precipitation with pH below 5.0. It is primarily caused by oxides of sulphur (SO2 → H2SO4) and nitrogen (NO2 → HNO3).',
    misconceptionId: 'co2_acid_rain'
  },
  {
    id: 'ch_2',
    nodeId: NODE_ACID_RAIN,
    question: 'Why do vehicle internal combustion engines produce oxides of nitrogen (NOx) even when petrol/diesel fuel contains virtually NO nitrogen?',
    options: [
      'Nitrogen is produced as a byproduct of fuel combustion reactions.',
      'High engine temperatures (>1000°C) supply kinetic energy to break N2 triple bonds in air, forcing atmospheric N2 and O2 to combine.',
      'Nitrogen is added to engine oil as a lubricant coolant.',
      'Catalytic converters synthesize nitrogen dioxide directly from carbon deposits.'
    ],
    correctAnswer: 1,
    explanation: 'Air is ~78% N2 and 21% O2. At high combustion temperatures inside engine cylinders, N2 + O2 → 2NO occurs, which then oxidises in air to NO2.',
    misconceptionId: 'basic_oxides'
  },
  {
    id: 'ch_3',
    nodeId: NODE_GLOBAL_WARMING,
    question: 'Which list contains ONLY the four primary greenhouse gases specified in the ICSE Class 9 syllabus?',
    options: [
      'Sulphur dioxide, Carbon monoxide, Ozone, Hydrogen',
      'Water vapour, Carbon dioxide, Methane, Oxides of nitrogen',
      'Chlorofluorocarbons, Helium, Oxygen, Nitrogen gas',
      'Ammonia, Methane, Carbon dioxide, Sulphur trioxide'
    ],
    correctAnswer: 1,
    explanation: 'The four core ICSE syllabus greenhouse gases are Water Vapour (H2O), Carbon Dioxide (CO2), Methane (CH4), and Oxides of Nitrogen (NOx). Sulphur dioxide causes acid rain, not global warming.',
    misconceptionId: 'so2_greenhouse'
  },
  {
    id: 'ch_4',
    nodeId: NODE_GLOBAL_WARMING,
    question: 'How do flooded paddy fields (rice paddies) in states like West Bengal and Punjab contribute to the greenhouse effect?',
    options: [
      'Waterlogged, oxygen-poor soil encourages anaerobic bacteria to generate Methane (CH4).',
      'Rice leaves absorb oxygen and release excess Sulphur Dioxide.',
      'Flooded soil traps solar UV light and transforms it into ozone.',
      'Fertilizers react with water to absorb all atmospheric oxygen.'
    ],
    correctAnswer: 0,
    explanation: 'Submerged paddy soils are anaerobic (oxygen-starved). Methanogenic bacteria break down organic matter producing Methane gas (CH4), a potent greenhouse gas.',
    misconceptionId: 'so2_greenhouse'
  },
  {
    id: 'ch_5',
    nodeId: NODE_OZONE_DEPLETION,
    question: 'In the stratospheric ozone formation process: O + O2 + M → O3 + M, what is the crucial chemical role of the third body "M"?',
    options: [
      'M acts as a catalyst by supplying additional free chlorine atoms.',
      'M absorbs excess kinetic energy released during bond formation to prevent the newly formed O3 from immediately splitting apart.',
      'M is a UV photon that splits oxygen molecules.',
      'M neutralizes nitric acid droplets in the stratosphere.'
    ],
    correctAnswer: 1,
    explanation: 'The third body M (usually an inert N2 or O2 molecule) absorbs excess reaction enthalpy. Without M, the hot O3 molecule would immediately dissociate back into O + O2.',
    misconceptionId: 'cfc_physical_hole'
  },
  {
    id: 'ch_6',
    nodeId: NODE_OZONE_DEPLETION,
    question: 'A student claims: "Ozone is a toxic air pollutant, so destroying the ozone layer is actually beneficial for health." How should you evaluate this statement?',
    options: [
      'Completely correct; ozone causes breathing problems everywhere.',
      'Incorrect; while ground-level (tropospheric) ozone is a toxic pollutant in smog, stratospheric ozone (15-35 km) is essential because it blocks harmful UV-B and UV-C rays.',
      'Correct; stratospheric ozone causes global warming while ground ozone is harmless.',
      'Incorrect; ozone in the stratosphere produces oxygen gas needed for clouds.'
    ],
    correctAnswer: 1,
    explanation: 'Location matters! Tropospheric ozone near ground is a harmful respiratory pollutant. Stratospheric ozone shields Earth from high-energy UV radiation.',
    misconceptionId: 'ozone_always_harmful'
  },
  {
    id: 'ch_7',
    nodeId: NODE_WATER_POLLUTION,
    question: 'What is the specific cause and manifestation of Minamata Disease, a historical milestone in water pollution history?',
    options: [
      'Lead poisoning from old water pipes causing bone decay.',
      'Methylmercury industrial discharge bioaccumulating in marine fish, causing severe neurological damage, paralysis, and sensory loss.',
      'Arsenic contamination in groundwater leading to skin lesions.',
      'Fluoride excess causing dental and skeletal fluorosis.'
    ],
    correctAnswer: 1,
    explanation: 'Minamata disease in Japan was caused by industrial discharge of methylmercury into Minamata Bay. Mercury bioaccumulated up the food chain into fish consumed by humans.',
    misconceptionId: 'minamata_lead'
  },
  {
    id: 'ch_8',
    nodeId: NODE_WATER_POLLUTION,
    question: 'When raw sewage and excessive agricultural fertilizers run off into a freshwater pond, why do fish suffocate and die?',
    options: [
      'Nitrates and phosphates poison fish gills directly upon contact.',
      'Nutrients cause massive algal blooms; when algae die, aerobic decomposer bacteria multiply rapidly, consuming dissolved oxygen (high BOD) and dropping DO levels.',
      'Sewage turns water into a strong base with pH > 12.',
      'Algae block carbon dioxide from escaping into the sky.'
    ],
    correctAnswer: 1,
    explanation: 'Nutrient enrichment (Eutrophication) causes rapid algal growth. As algae rot, decomposer bacteria consume the dissolved oxygen (high BOD), leading to fish suffocation.',
    misconceptionId: 'electrophoresis_pollution'
  }
];

// --- DISCOVERY PREDICTION QUESTION ---
const DISCOVERY_QUESTION = {
  question: 'Imagine two test tubes: Tube A has pure distilled water exposed to clean air. Tube B has cloud water collected downwind from a coal-fired power plant. If you drop universal indicator into both, what color changes will you observe?',
  options: [
    'Tube A turns bright red (pH 1); Tube B turns deep blue (pH 14)',
    'Tube A turns slightly green-yellow (pH ~5.6); Tube B turns orange-red (pH < 4.5)',
    'Both tubes turn purple (pH 10)',
    'Tube A turns red; Tube B remains completely clear'
  ],
  correctAnswer: 1,
  explanation: 'Clean atmospheric CO2 naturally makes normal rain slightly acidic (pH 5.6, green-yellow indicator). SO2 and NOx from coal power plants dissolve to form strong sulphuric and nitric acids, driving pH below 4.5 (orange-red indicator).'
};

// --- SIMULATION VISUAL COMPONENT 1: ATMOSPHERIC & ACID RAIN CANVASES ---
const InteractiveAcidRainVisualizer: React.FC<{
  so2: number;
  nox: number;
  onSO2Change: (v: number) => void;
  onNOxChange: (v: number) => void;
}> = ({ so2, nox, onSO2Change, onNOxChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate Rain pH
  const totalPollution = so2 * 1.2 + nox * 1.0;
  const calculatedPH = Math.max(3.2, Number((5.6 - (totalPollution / 100) * 2.2).toFixed(1)));

  // Chemical Equations formed
  const activeEquations = useMemo(() => {
    const list = [];
    if (so2 > 15) list.push('SO2 + H2O → H2SO3 (Sulphurous Acid)');
    if (so2 > 50) list.push('2SO2 + O2 → 2SO3  |  SO3 + H2O → H2SO4 (Sulphuric Acid)');
    if (nox > 15) list.push('N2 + O2 → 2NO  |  2NO + O2 → 2NO2');
    if (nox > 50) list.push('2NO2 + H2O → HNO3 + HNO2 (Nitric & Nitrous Acid)');
    return list;
  }, [so2, nox]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky Background gradient depending on pH
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (calculatedPH < 4.2) {
        skyGrad.addColorStop(0, '#3b1c1c');
        skyGrad.addColorStop(1, '#5c2d18');
      } else if (calculatedPH < 5.0) {
        skyGrad.addColorStop(0, '#333045');
        skyGrad.addColorStop(1, '#4a4436');
      } else {
        skyGrad.addColorStop(0, '#1e3a8a');
        skyGrad.addColorStop(1, '#0284c7');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Industrial Chimney & Smoke
      ctx.fillStyle = '#475569';
      ctx.fillRect(40, 160, 35, 100);
      ctx.fillRect(100, 180, 25, 80);

      // Smoke particles (SO2 & NOx)
      const particleCount = Math.floor((so2 + nox) / 3);
      ctx.fillStyle = calculatedPH < 4.5 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(203, 213, 225, 0.3)';
      for (let i = 0; i < particleCount; i++) {
        const px = (55 + Math.sin(t + i) * 30 + (i * 12)) % (canvas.width * 0.7);
        const py = 150 - ((t * 20 + i * 15) % 120);
        ctx.beginPath();
        ctx.arc(px, py, 4 + (i % 5), 0, Math.PI * 2);
        ctx.fill();
      }

      // Clouds
      ctx.fillStyle = calculatedPH < 4.5 ? '#4b5563' : '#cbd5e1';
      ctx.beginPath();
      ctx.arc(200, 50, 30, 0, Math.PI * 2);
      ctx.arc(240, 40, 40, 0, Math.PI * 2);
      ctx.arc(280, 50, 30, 0, Math.PI * 2);
      ctx.fill();

      // Acid Rain Drops
      const dropCount = Math.floor(30 + totalPollution / 2);
      ctx.strokeStyle = calculatedPH < 4.5 ? '#f87171' : '#38bdf8';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < dropCount; i++) {
        const rx = 160 + ((i * 17) % 240);
        const ry = (60 + (t * 100 + i * 23) % 180);
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 2, ry + 10);
        ctx.stroke();
      }

      // Ground & Monument (Taj Mahal Representation)
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, 240, canvas.width, 40);

      // Marble Monument corroded by Acid Rain
      ctx.fillStyle = calculatedPH < 4.3 ? '#d1d5db' : '#ffffff';
      // Dome
      ctx.beginPath();
      ctx.arc(360, 220, 20, Math.PI, 0);
      ctx.fill();
      // Base
      ctx.fillRect(335, 220, 50, 20);
      // Corrosion spots if high acidity
      if (calculatedPH < 4.5) {
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.arc(350, 225, 3, 0, Math.PI * 2);
        ctx.arc(368, 215, 2.5, 0, Math.PI * 2);
        ctx.arc(340, 230, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [so2, nox, calculatedPH, totalPollution]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-xl text-white my-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-3 gap-2">
        <h3 className="font-bold text-lg text-emerald-400 flex items-center gap-2">
          🧪 Interactive Atmospheric Acid Rain Reactor
        </h3>
        <div className={`px-4 py-1.5 rounded-full font-mono text-sm font-bold shadow ${
          calculatedPH < 4.5 ? 'bg-red-600 text-white animate-pulse' : calculatedPH < 5.0 ? 'bg-amber-500 text-slate-900' : 'bg-emerald-500 text-slate-900'
        }`}>
          Rainfall pH: {calculatedPH} {calculatedPH < 5.0 ? '(Acidic Precipitation)' : '(Normal Rain)'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-7 relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
          <canvas ref={canvasRef} width={450} height={280} className="w-full h-auto block" />
        </div>

        <div className="lg:col-span-5 space-y-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex justify-between mb-1">
              <span>Fossil Fuel Burning (SO2 Emissions)</span>
              <span>{so2}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={so2}
              onChange={(e) => onSO2Change(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-rose-300 flex justify-between mb-1">
              <span>High-Temp Combustion (NOx Emissions)</span>
              <span>{nox}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={nox}
              onChange={(e) => onNOxChange(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-xs">
            <span className="font-bold text-gold-400 block mb-1">Active Chemical Reactions:</span>
            {activeEquations.length === 0 ? (
              <span className="text-slate-500 italic">Increase emissions to trigger gas-cloud reactions.</span>
            ) : (
              <ul className="space-y-1 font-mono text-emerald-300">
                {activeEquations.map((eq, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-amber-400">›</span> {eq}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SIMULATION VISUAL COMPONENT 2: GREENHOUSE BLANKET VISUALIZER ---
const InteractiveGreenhouseVisualizer: React.FC<{
  co2: number;
  ch4: number;
  onCO2Change: (v: number) => void;
  onCH4Change: (v: number) => void;
}> = ({ co2, ch4, onCO2Change, onCH4Change }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Temperature anomaly based on greenhouse concentration
  const tempAnomaly = Number(((co2 * 0.025) + (ch4 * 0.035)).toFixed(2));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Earth Globe at bottom
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 360, 220, Math.PI, 0);
      ctx.fill();

      // Green continents on globe
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(canvas.width / 2 - 40, 180, 45, 0, Math.PI * 2);
      ctx.arc(canvas.width / 2 + 50, 190, 35, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric Greenhouse Blanket Layer Thickness
      const blanketThickness = 15 + (co2 + ch4) * 0.35;
      const blanketOpacity = 0.2 + (co2 + ch4) * 0.006;

      ctx.strokeStyle = `rgba(239, 68, 68, ${blanketOpacity})`;
      ctx.lineWidth = blanketThickness;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 360, 255, Math.PI, 0);
      ctx.stroke();

      // Solar Radiation Incoming (Yellow rays)
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3;
      for (let i = 0; i < 4; i++) {
        const x = 70 + i * 100;
        const offset = (t * 40 + i * 15) % 100;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 20, Math.min(140, offset + 40));
        ctx.stroke();
      }

      // Outgoing Infrared Rays (Red wavy lines trapped / reflected by blanket)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 5; i++) {
        const startX = 90 + i * 70;
        ctx.beginPath();
        ctx.moveTo(startX, 150);
        // Wave up towards blanket
        for (let y = 150; y >= 110; y -= 5) {
          const waveX = startX + Math.sin(y * 0.15 + t * 5) * 6;
          ctx.lineTo(waveX, y);
        }
        ctx.stroke();

        // Reflected heat ray coming back down if blanket is thick
        if (co2 + ch4 > 25) {
          ctx.strokeStyle = 'rgba(248, 113, 113, 0.7)';
          ctx.beginPath();
          ctx.moveTo(startX, 110);
          ctx.lineTo(startX + 15, 165);
          ctx.stroke();
        }
      }

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, [co2, ch4]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-xl text-white my-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-3 gap-2">
        <h3 className="font-bold text-lg text-amber-400 flex items-center gap-2">
          🌍 Greenhouse Gas Thermal Trapping Simulator
        </h3>
        <div className={`px-4 py-1.5 rounded-full font-mono text-sm font-bold shadow ${
          tempAnomaly > 3.0 ? 'bg-red-600 text-white animate-bounce' : tempAnomaly > 1.5 ? 'bg-amber-500 text-slate-900' : 'bg-emerald-500 text-slate-900'
        }`}>
          Global Temp Anomaly: +{tempAnomaly}°C
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-7 relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
          <canvas ref={canvasRef} width={450} height={260} className="w-full h-auto block" />
        </div>

        <div className="lg:col-span-5 space-y-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gold-300 flex justify-between mb-1">
              <span>Carbon Dioxide (CO2 - Thermal Power & Vehicles)</span>
              <span>{co2} ppm</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={co2}
              onChange={(e) => onCO2Change(Number(e.target.value))}
              className="w-full accent-gold-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex justify-between mb-1">
              <span>Methane (CH4 - Paddy Fields & Cattle)</span>
              <span>{ch4} ppb</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={ch4}
              onChange={(e) => onCH4Change(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
            <span className="font-bold text-amber-300 block">Atmospheric Thermal Mechanics:</span>
            <p className="text-slate-300">
              Greenhouse gases absorb longwave infrared emitted by Earth and re-radiate heat back down, thickening Earth\'s atmospheric thermal blanket.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SIMULATION VISUAL COMPONENT 3: OZONE LAYER SHIELD SIMULATOR ---
const InteractiveOzoneVisualizer: React.FC<{
  cfc: number;
  onCFCChange: (v: number) => void;
}> = ({ cfc, onCFCChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const ozoneThickness = Math.max(10, Math.floor(100 - cfc * 0.85));
  const uvTransmission = Math.min(95, Math.floor(5 + cfc * 0.85));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Atmosphere Space
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stratospheric Ozone Layer Shield (Blue-cyan band)
      const layerOpacity = ozoneThickness / 100;
      ctx.fillStyle = `rgba(6, 182, 212, ${layerOpacity * 0.7})`;
      ctx.fillRect(0, 80, canvas.width, 50);

      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 80, canvas.width, 50);

      // Label inside ozone layer
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`STRATOSPHERIC OZONE LAYER (O3 Density: ${ozoneThickness}%)`, 20, 110);

      // UV Radiation Rays from Sun (Purple/violet arrows coming down)
      const uvCount = 7;
      for (let i = 0; i < uvCount; i++) {
        const x = 30 + i * 60;
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 3;

        // Top ray to ozone
        ctx.beginPath();
        ctx.moveTo(x, 10);
        ctx.lineTo(x, 80);
        ctx.stroke();

        // Rays passing through depending on CFC depletion
        if (cfc > 10 && i % Math.max(1, Math.floor(100 / (cfc + 1))) === 0) {
          ctx.strokeStyle = '#e879f9';
          ctx.beginPath();
          ctx.moveTo(x, 130);
          ctx.lineTo(x, 220);
          ctx.stroke();

          // Hit ground warning
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.arc(x, 220, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Chlorine radicals (Cl) destroying O3 molecules visually
      if (cfc > 20) {
        ctx.fillStyle = '#facc15'; // Chlorine dot
        for (let k = 0; k < Math.floor(cfc / 15); k++) {
          const cx = (k * 90 + t * 30) % canvas.width;
          ctx.beginPath();
          ctx.arc(cx, 105, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#000000';
          ctx.font = '9px monospace';
          ctx.fillText('Cl', cx - 4, 108);
          ctx.fillStyle = '#facc15';
        }
      }

      // Earth surface at bottom
      ctx.fillStyle = '#166534';
      ctx.fillRect(0, 220, canvas.width, 40);
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px sans-serif';
      ctx.fillText('Earth Surface (Human Skin / Phytoplankton Ecosystem)', 20, 240);

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, [cfc, ozoneThickness]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-xl text-white my-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-3 gap-2">
        <h3 className="font-bold text-lg text-gold-400 flex items-center gap-2">
          🛡️ Stratospheric Ozone Shield & CFC Depletion Engine
        </h3>
        <div className={`px-4 py-1.5 rounded-full font-mono text-sm font-bold shadow ${
          uvTransmission > 40 ? 'bg-rose-600 text-white animate-pulse' : 'bg-gold-600 text-white'
        }`}>
          UV Radiation Reaching Earth: {uvTransmission}%
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-7 relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
          <canvas ref={canvasRef} width={450} height={260} className="w-full h-auto block" />
        </div>

        <div className="lg:col-span-5 space-y-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gold-300 flex justify-between mb-1">
              <span>CFC Release (Refrigerants & Aerosols)</span>
              <span>{cfc}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={cfc}
              onChange={(e) => onCFCChange(Number(e.target.value))}
              className="w-full accent-gold-500 cursor-pointer"
            />
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
            <span className="font-bold text-gold-300 block">Formation vs Catalytic Breakdown:</span>
            <p className="font-mono text-xs text-emerald-300">
              Formation: O2 + hv → O + O <br />
              O + O2 + M → O3 + M
            </p>
            <p className="text-slate-300 text-xs mt-1">
              CFCs release reactive chlorine (Cl·) under stratospheric UV light, decomposing O3 molecules back into O2.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SIMULATION VISUAL COMPONENT 4: WATER POLLUTION & DO RIVER SIMULATOR ---
const InteractiveWaterVisualizer: React.FC<{
  sewage: number;
  fertilizer: number;
  onSewageChange: (v: number) => void;
  onFertilizerChange: (v: number) => void;
}> = ({ sewage, fertilizer, onSewageChange, onFertilizerChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate Dissolved Oxygen (DO in mg/L)
  const dissolvedOxygen = Math.max(1.0, Number((9.5 - (sewage * 0.05 + fertilizer * 0.035)).toFixed(1)));
  const eutrophicationLevel = Math.min(100, Math.floor(fertilizer * 0.8 + sewage * 0.3));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Water body background (Turns murky green/brown if polluted)
      const r = Math.floor(14 + eutrophicationLevel * 0.8);
      const g = Math.floor(116 - eutrophicationLevel * 0.4 + (fertilizer > 30 ? 60 : 0));
      const b = Math.floor(144 - eutrophicationLevel * 1.1);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Algal Bloom Surface Layer (Green scum)
      if (eutrophicationLevel > 20) {
        ctx.fillStyle = `rgba(34, 197, 94, ${eutrophicationLevel / 120})`;
        ctx.fillRect(0, 0, canvas.width, 35);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px sans-serif';
        ctx.fillText('Surface Algal Bloom (Eutrophication Layer)', 15, 22);
      }

      // Fish rendering (alive vs floating dead based on DO)
      const fishAlive = dissolvedOxygen > 4.0;
      const fishCount = 3;

      for (let i = 0; i < fishCount; i++) {
        const fx = 80 + i * 120;
        const fy = fishAlive ? 140 + Math.sin(t + i) * 15 : 45; // Dead fish float up!

        ctx.fillStyle = fishAlive ? '#f97316' : '#94a3b8';
        ctx.beginPath();
        ctx.ellipse(fx, fy, 18, 10, fishAlive ? 0 : Math.PI, 0, Math.PI * 2);
        ctx.fill();

        // Fish tail
        ctx.beginPath();
        ctx.moveTo(fx + (fishAlive ? -18 : 18), fy);
        ctx.lineTo(fx + (fishAlive ? -28 : 28), fy - 8);
        ctx.lineTo(fx + (fishAlive ? -28 : 28), fy + 8);
        ctx.closePath();
        ctx.fill();

        // Fish eye (X if dead)
        ctx.fillStyle = '#000000';
        if (fishAlive) {
          ctx.beginPath();
          ctx.arc(fx + 10, fy - 3, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.font = '10px sans-serif';
          ctx.fillText('x', fx - 5, fy + 3);
        }
      }

      // Oxygen bubbles in water if DO is healthy
      if (dissolvedOxygen > 5.0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let bIdx = 0; bIdx < 8; bIdx++) {
          const bx = (bIdx * 55 + t * 20) % canvas.width;
          const by = 200 - ((t * 30 + bIdx * 25) % 150);
          ctx.beginPath();
          ctx.arc(bx, by, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, [sewage, fertilizer, dissolvedOxygen, eutrophicationLevel]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-xl text-white my-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-3 gap-2">
        <h3 className="font-bold text-lg text-teal-400 flex items-center gap-2">
          0💧 River Ecosystem & Dissolved Oxygen Simulator
        </h3>
        <div className={`px-4 py-1.5 rounded-full font-mono text-sm font-bold shadow ${
          dissolvedOxygen < 4.0 ? 'bg-red-600 text-white animate-bounce' : 'bg-teal-500 text-slate-900'
        }`}>
          Dissolved Oxygen: {dissolvedOxygen} mg/L {dissolvedOxygen < 4.0 ? '(Hypoxia / Fish Kill)' : '(Healthy)'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-7 relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
          <canvas ref={canvasRef} width={450} height={260} className="w-full h-auto block" />
        </div>

        <div className="lg:col-span-5 space-y-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex justify-between mb-1">
              <span>Untreated Sewage Waste</span>
              <span>{sewage}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={sewage}
              onChange={(e) => onSewageChange(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex justify-between mb-1">
              <span>Agricultural Fertilizers (NO3- / PO4 3-)</span>
              <span>{fertilizer}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={fertilizer}
              onChange={(e) => onFertilizerChange(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
            <span className="font-bold text-teal-300 block">Eutrophication Mechanics:</span>
            <p className="text-slate-300 text-xs">
              Excess nutrients → Algal Bloom → Bacterial Decomposition → High BOD → Dissolved Oxygen Depletion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Pure Rain is Completely Neutral with a pH of 7.0",
    description: "Students often believe that unpolluted rain is strictly neutral with a pH of 7.0, and any degree of acidity makes it acid rain.",
    correction: "Normal rainwater is naturally slightly acidic with a pH of around 5.6 due to dissolved atmospheric carbon dioxide forming weak carbonic acid. Rain is technically classified as acid rain only when its pH falls below 5.6 due to atmospheric reactions involving sulfur dioxide and nitrogen oxides. Therefore, a slight natural acidity is standard, but strong mineral acids cause true acid rain.",
  },
  {
    id: "misc_2",
    title: "Acid Rain Causes Severe Instant Chemical Burns on Human Skin",
    description: "Students frequently imagine that acid rain acts like concentrated laboratory acid, immediately burning human skin or clothes upon direct contact.",
    correction: "Acid rain is far too dilute to burn human skin or cause immediate physical pain upon contact. The primary danger of acid rain lies in its gradual, long-term ecological destruction, such as leaching soil nutrients, harming aquatic ecosystems, and eroding marble structures over time. Walking in acid rain carries no greater direct chemical burn risk to skin than walking in normal rain.",
  },
  {
    id: "misc_3",
    title: "Carbon Dioxide Emission is the Main Cause of Acid Rain",
    description: "Students often confuse greenhouse gases with acid-forming pollutants and assume carbon dioxide is the primary cause of acid rain.",
    correction: "Carbon dioxide forms weak carbonic acid, which accounts only for the natural, baseline acidity of unpolluted rain. True acid rain is primarily caused by industrial emissions of sulfur dioxide (SO2) and nitrogen oxides (NOx) produced from burning fossil fuels in power plants and vehicles. In the atmosphere, these gases react with oxygen and water to form much stronger acids, namely sulfuric acid (H2SO4) and nitric acid (HNO3).",
  },
  {
    id: "misc_4",
    title: "Acid Rain Only Falls Directly Over Industrial and Urban Areas",
    description: "Students assume that acid rain occurs exclusively in the immediate geographical locations where factories and vehicles emit pollutants.",
    correction: "Atmospheric wind currents can transport precursor gases like sulfur dioxide and nitrogen oxides hundreds of kilometers away from their original industrial sources before precipitation occurs. Consequently, pristine rural environments, mountain lakes, and remote forests far from urban centers frequently suffer severe damage from acid rain. The environmental impact is widespread and not limited to the site of industrial emissions.",
  },
  {
    id: "misc_5",
    title: "Acid Rain Consists Entirely of Pure Undiluted Strong Acids",
    description: "Students sometimes believe that clouds store pure sulfuric or nitric acid that falls down as liquid acid rather than rain.",
    correction: "Acid rain is standard water precipitation that contains very low concentrations of dissolved mineral acids. While these trace acids lower the rainwater's pH to values typically between 4.0 and 5.0, the precipitation remains overwhelmingly composed of water molecules. The term describes rain with increased hydrogen ion concentration, not concentrated atmospheric acid.",
  },
];

export default function C9_ChemistryAcidraincompositionandcausesSim() {
  // Navigation & Mode State
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'sim' | 'challenge' | 'summary'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Interactive Simulator Controls State
  const [interactiveState, setInteractiveState] = useState<InteractiveState>({
    so2Emission: 40,
    noxEmission: 35,
    co2Level: 50,
    ch4Level: 30,
    cfcLevel: 25,
    sewageRunoff: 30,
    fertilizerRunoff: 20
  });

  // Discovery Question State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Challenge Mode State
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [activeMisconception, setActiveMisconception] = useState<MisconceptionData | null>(null);

  // UI Feedback States
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // SRS & BKT Mastery Engine States
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>({
    [NODE_ACID_RAIN]: createBKTState(),
    [NODE_GLOBAL_WARMING]: createBKTState(),
    [NODE_OZONE_DEPLETION]: createBKTState(),
    [NODE_WATER_POLLUTION]: createBKTState()
  });

  // Inactivity Auto-Hint Timer (10 seconds)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenge' && !challengeSubmitted) {
        const hintText = 'Consider the specific chemical formulas and atmospheric layers described in your ICSE textbook.';
        setCurrentHint(hintText);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [activeTab, challengeSubmitted]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentChallengeIndex, resetInactivityTimer]);

  // Handle Discovery Submission
  const handleDiscoverySubmit = (index: number) => {
    setDiscoveryAnswer(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctAnswer) {
      audioManager.play('success');
      speechManager.speak('Excellent prediction! Acid pollutants significantly lower rainfall pH.');
    } else {
      audioManager.play('error');
      speechManager.speak('Good try! Let us explore how dissolved gases change rainwater pH.');
    }
  };

  // Handle Challenge Submission & BKT Update
  const handleChallengeSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedChallengeOption === null) return;
    setChallengeSubmitted(true);

    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: rect.left + rect.width / 2, y: rect.top });

    const challenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = selectedChallengeOption === challenge.correctAnswer;
    const currentNodeId = challenge.nodeId;

    // Update BKT State
    const updatedBKT = bktUpdate(bktStates[currentNodeId], isCorrect);
    setBktStates(prev => ({ ...prev, [currentNodeId]: updatedBKT }));

    // Update SRS Item
    const reviewItem = createReviewItem(challenge.id, 'Chemistry');
    sm2Update(reviewItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200);

      setScore(prev => prev + 100 + streak * 10);
      setStreak(prev => prev + 1);
      speechManager.speak('Correct! Outstanding chemistry deduction.');

      if (streak + 1 >= 3) {
        setShowConfetti(true);
        audioManager.play('celebration');
        setTimeout(() => setShowConfetti(false), 2500);
      }
    } else {
      audioManager.play('drop-wrong');
      setStreak(0);
      if (challenge.misconceptionId && MISCONCEPTIONS[challenge.misconceptionId]) {
        setActiveMisconception(MISCONCEPTIONS[challenge.misconceptionId]);
        speechManager.speak(MISCONCEPTIONS[challenge.misconceptionId].correction);
      } else {
        speechManager.speak('Not quite right. Review the underlying chemical reactions.');
      }
    }
  };

  const nextChallenge = () => {
    setSelectedChallengeOption(null);
    setChallengeSubmitted(false);
    setActiveMisconception(null);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      // Save mastery to localStorage on completion
      ALL_NODE_IDS.forEach(id => {
        const level = masteryProb(bktStates[id]);
        const numericScore = Math.round(level * 100);
        recordGameScore(Object.values(ALL_NODE_IDS), numericScore);
      });
      setActiveTab('summary');
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed the Environmental Chemistry Laboratory.');
    }
  };

  const currentSlide = TEACHING_SLIDES[currentSlideIndex];
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Overall Mastery Calculation
  const overallMastery = useMemo(() => {
    const total = ALL_NODE_IDS.reduce((acc, id) => acc + bktStates[id].pKnown, 0);
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 select-none" onClick={resetInactivityTimer}>
      {/* HEADER BAR */}
      <header className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-gold-600 flex items-center justify-center text-2xl shadow-lg">
            🧪
          </div>
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Class 9 ICSE Chemistry Laboratory
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Environmental Chemistry: Acid Rain, Global Warming, Ozone & Water Pollution
            </p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'discovery' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Predict
          </button>
          <button
            onClick={() => { setActiveTab('learn'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'learn' ? 'bg-gold-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Concepts
          </button>
          <button
            onClick={() => { setActiveTab('sim'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'sim' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Lab Sim
          </button>
          <button
            onClick={() => { setActiveTab('challenge'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'challenge' ? 'bg-rose-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Challenges ({currentChallengeIndex + 1}/{CHALLENGES.length})
          </button>
        </nav>

        {/* BKT Mastery Display */}
        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mastery Index</span>
            <span className="text-sm font-mono font-bold text-emerald-400">{overallMastery}%</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-300">
            {overallMastery > 80 ? 'A+' : overallMastery > 50 ? 'B' : 'C'}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto">
        {/* TAB 1: DISCOVERY QUESTION */}
        {activeTab === 'discovery' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                Guided Discovery Phase
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-2">
                Predict & Observe Before Learning
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDiscoverySubmit(idx)}
                  disabled={discoverySubmitted}
                  className={`p-4 rounded-xl text-left border text-sm font-medium transition flex items-center justify-between ${
                    discoverySubmitted
                      ? idx === DISCOVERY_QUESTION.correctAnswer
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : discoveryAnswer === idx
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span>{option}</span>
                  {discoverySubmitted && idx === DISCOVERY_QUESTION.correctAnswer && (
                    <span className="text-emerald-400 font-bold">✓ Correct</span>
                  )}
                </button>
              ))}
            </div>

            {discoverySubmitted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-3">
                <h4 className="font-bold text-emerald-400 text-sm">Chemistry Explanation:</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {DISCOVERY_QUESTION.explanation}
                </p>
                <button
                  onClick={() => { setActiveTab('learn'); audioManager.play('whoosh'); }}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg"
                >
                  Continue to Interactive Lessons →
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* TAB 2: VISUAL TEACHING SLIDES */}
        {activeTab === 'learn' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Slide Navigation Buttons */}
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Module {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentSlideIndex(prev => Math.max(0, prev - 1));
                    audioManager.play('swoop');
                  }}
                  disabled={currentSlideIndex === 0}
                  className="px-3 py-1.5 bg-slate-800 disabled:opacity-40 rounded-lg text-xs font-bold hover:bg-slate-700 transition"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => {
                    if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                      setCurrentSlideIndex(prev => prev + 1);
                      audioManager.play('swoop');
                    } else {
                      setActiveTab('sim');
                      audioManager.play('whoosh');
                    }
                  }}
                  className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-emerald-400 transition"
                >
                  {currentSlideIndex < TEACHING_SLIDES.length - 1 ? 'Next Module →' : 'Launch Full Simulator →'}
                </button>
              </div>
            </div>

            {/* Slide Content */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-1">
                  Node ID: {currentSlide.nodeId}
                </span>
                <h2 className="text-2xl font-extrabold text-white">{currentSlide.title}</h2>
                <p className="text-xs text-slate-400">{currentSlide.subtitle}</p>
              </div>

              {/* Dynamic Interactive Mini Visualizer depending on slide */}
              {currentSlide.interactiveMode === 'acid_rain' && (
                <InteractiveAcidRainVisualizer
                  so2={interactiveState.so2Emission}
                  nox={interactiveState.noxEmission}
                  onSO2Change={(v) => setInteractiveState(prev => ({ ...prev, so2Emission: v }))}
                  onNOxChange={(v) => setInteractiveState(prev => ({ ...prev, noxEmission: v }))}
                />
              )}

              {currentSlide.interactiveMode === 'greenhouse' && (
                <InteractiveGreenhouseVisualizer
                  co2={interactiveState.co2Level}
                  ch4={interactiveState.ch4Level}
                  onCO2Change={(v) => setInteractiveState(prev => ({ ...prev, co2Level: v }))}
                  onCH4Change={(v) => setInteractiveState(prev => ({ ...prev, ch4Level: v }))}
                />
              )}

              {currentSlide.interactiveMode === 'ozone' && (
                <InteractiveOzoneVisualizer
                  cfc={interactiveState.cfcLevel}
                  onCFCChange={(v) => setInteractiveState(prev => ({ ...prev, cfcLevel: v }))}
                />
              )}

              {currentSlide.interactiveMode === 'water' && (
                <InteractiveWaterVisualizer
                  sewage={interactiveState.sewageRunoff}
                  fertilizer={interactiveState.fertilizerRunoff}
                  onSewageChange={(v) => setInteractiveState(prev => ({ ...prev, sewageRunoff: v }))}
                  onFertilizerChange={(v) => setInteractiveState(prev => ({ ...prev, fertilizerRunoff: v }))}
                />
              )}

              {/* Text Explanations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">Formal ICSE Definition</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentSlide.definition}</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">ELI5 Simple Analogy</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentSlide.eli5}</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-gold-400 text-xs uppercase tracking-wider">Detailed Chemical Walkthrough</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{currentSlide.walkthrough}</p>
                {currentSlide.equations && (
                  <div className="mt-2 bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 space-y-1">
                    <span className="text-slate-400 block font-sans text-[10px] uppercase tracking-wider">Required Chemical Equations:</span>
                    {currentSlide.equations.map((eq, i) => (
                      <div key={i}>• {eq}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: FULL MULTI-ENVIRONMENT SIMULATOR */}
        {activeTab === 'sim' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 mb-4 gap-2">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">
                    Integrated Atmospheric & Hydrosphere Sandbox
                  </h2>
                  <p className="text-xs text-slate-400">
                    Adjust human activities and instantly observe systemic environmental impacts.
                  </p>
                </div>
                <button
                  onClick={() => { setActiveTab('challenge'); audioManager.play('whoosh'); }}
                  className="px-5 py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg"
                >
                  Start ICSE Challenges →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InteractiveAcidRainVisualizer
                  so2={interactiveState.so2Emission}
                  nox={interactiveState.noxEmission}
                  onSO2Change={(v) => setInteractiveState(prev => ({ ...prev, so2Emission: v }))}
                  onNOxChange={(v) => setInteractiveState(prev => ({ ...prev, noxEmission: v }))}
                />
                <InteractiveGreenhouseVisualizer
                  co2={interactiveState.co2Level}
                  ch4={interactiveState.ch4Level}
                  onCO2Change={(v) => setInteractiveState(prev => ({ ...prev, co2Level: v }))}
                  onCH4Change={(v) => setInteractiveState(prev => ({ ...prev, ch4Level: v }))}
                />
                <InteractiveOzoneVisualizer
                  cfc={interactiveState.cfcLevel}
                  onCFCChange={(v) => setInteractiveState(prev => ({ ...prev, cfcLevel: v }))}
                />
                <InteractiveWaterVisualizer
                  sewage={interactiveState.sewageRunoff}
                  fertilizer={interactiveState.fertilizerRunoff}
                  onSewageChange={(v) => setInteractiveState(prev => ({ ...prev, sewageRunoff: v }))}
                  onFertilizerChange={(v) => setInteractiveState(prev => ({ ...prev, fertilizerRunoff: v }))}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: ADAPTIVE CHALLENGES */}
        {activeTab === 'challenge' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Question {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Syllabus Target: {currentChallenge.nodeId}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Score</span>
                  <span className="text-sm font-bold font-mono text-amber-400">{score}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Streak</span>
                  <span className="text-sm font-bold font-mono text-emerald-400">🔥 {streak}</span>
                </div>
              </div>
            </div>

            {/* Question Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentChallenge.question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {currentChallenge.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedChallengeOption(idx);
                      audioManager.play('pop');
                    }}
                    disabled={challengeSubmitted}
                    className={`p-4 rounded-xl text-left border text-sm font-medium transition flex items-center justify-between ${
                      selectedChallengeOption === idx
                        ? challengeSubmitted
                          ? idx === currentChallenge.correctAnswer
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950 border-rose-500 text-rose-200'
                          : 'bg-slate-800 border-gold-500 text-white shadow-lg ring-1 ring-gold-500'
                        : challengeSubmitted && idx === currentChallenge.correctAnswer
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{option}</span>
                    {challengeSubmitted && idx === currentChallenge.correctAnswer && (
                      <span className="text-emerald-400 font-bold text-xs">✓ Correct</span>
                    )}
                  </button>
                ))}
              </div>

              {!challengeSubmitted ? (
                <button
                  onClick={handleChallengeSubmit}
                  disabled={selectedChallengeOption === null}
                  className="w-full py-3.5 bg-emerald-500 disabled:opacity-40 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition shadow-xl"
                >
                  Submit Answer
                </button>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider mb-1">
                      ICSE Examiner Explanation
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentChallenge.explanation}
                    </p>
                  </div>

                  {/* Misconception Alert Bubble if student got it wrong */}
                  {activeMisconception && (
                    <div className="p-4 bg-rose-950/90 border border-rose-500/50 rounded-xl space-y-1">
                      <span className="font-bold text-rose-300 text-xs block">
                        ⚠️ Common Misconception Detected: {activeMisconception.misconception}
                      </span>
                      <p className="text-xs text-rose-100">
                        {activeMisconception.correction}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => { nextChallenge(); audioManager.play('whoosh'); }}
                    className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-extrabold text-sm rounded-xl transition shadow-xl"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Final Laboratory Report →'}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 5: FINAL SUMMARY & MASTERY REPORT */}
        {activeTab === 'summary' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-4xl shadow-inner">
              🏆
            </div>

            <div>
              <h2 className="text-3xl font-black text-white">Laboratory Complete!</h2>
              <p className="text-xs text-slate-400 mt-1">
                You have mastered Class 9 ICSE Environmental Chemistry nodes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {ALL_NODE_IDS.map(id => {
                const bkt = bktStates[id];
                const masteryPct = Math.round(bkt.pKnown * 100);
                return (
                  <div key={id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block font-mono">{id}</span>
                    <span className="text-xl font-extrabold text-emerald-400 font-mono">{masteryPct}%</span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {masteryPct > 75 ? 'Mastered' : 'Reviewing'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-w-md mx-auto text-xs text-slate-300">
              <span className="font-bold text-amber-400 block mb-1">Total Score Achieved:</span>
              <span className="text-2xl font-black font-mono text-amber-300">{score} Points</span>
            </div>

            <button
              onClick={() => {
                setCurrentChallengeIndex(0);
                setSelectedChallengeOption(null);
                setChallengeSubmitted(false);
                setScore(0);
                setStreak(0);
                setActiveTab('discovery');
                audioManager.play('chime');
              }}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition shadow-xl"
            >
              Restart Simulation Laboratory
            </button>
          </motion.div>
        )}
      </main>

      {/* OVERLAY FEEDBACK COMPONENTS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="ICSE Environmental Chemistry Mastered!" />
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
  );
}