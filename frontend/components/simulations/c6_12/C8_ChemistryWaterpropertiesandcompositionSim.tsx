"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
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
// CONSTANTS & NODE DEFINITIONS
// ==========================================
const ALL_NODE_IDS = ['c8_chem_017', 'c8_chem_018', 'c8_chem_019', 'c8_chem_020'] as const;
type NodeId = typeof ALL_NODE_IDS[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  code: string;
  icseTopic: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c8_chem_017: {
    id: 'c8_chem_017',
    title: 'Water - Properties & Composition',
    code: 'c8_chem_017',
    icseTopic: 'Composition (H2O 2:1 ratio), Electrolysis, Universal Solvent, Physical Properties'
  },
  c8_chem_018: {
    id: 'c8_chem_018',
    title: 'Water - Treatment & Pollution',
    code: 'c8_chem_018',
    icseTopic: 'Sewage, Industrial Waste, Sedimentation, Filtration, Chlorination, Boiling, RWH'
  },
  c8_chem_019: {
    id: 'c8_chem_019',
    title: 'Carbon Bonding & Catenation',
    code: 'c8_chem_019',
    icseTopic: 'Electronic Config (2,4), Tetravalency, Covalent Sharing, Catenation Chains & Rings'
  },
  c8_chem_020: {
    id: 'c8_chem_020',
    title: 'Carbon Dioxide - Prep & Properties',
    code: 'c8_chem_020',
    icseTopic: 'CaCO3 + 2HCl reaction, Gas jar collection (Upward displacement), Limewater test'
  }
};

// ==========================================
// TYPES & DATA INTERFACES
// ==========================================
type ViewMode = 'discovery' | 'learn' | 'lab' | 'challenge' | 'summary';

interface DiscoveryOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface TeachingSlide {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  content: string[];
  eli5: string;
  visualType: 'electrolysis' | 'solvent' | 'treatment' | 'tetravalency' | 'catenation' | 'co2_lab';
  keyTakeaway: string;
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  type: 'mcq' | 'build_molecule' | 'order_steps' | 'reaction_balance';
  question: string;
  options?: string[];
  correctAnswer: number | string | string[];
  explanation: string;
  misconceptionId?: string;
  hint: string;
}

// ==========================================
// INTERACTIVE VISUAL COMPONENTS
// ==========================================

// 1. Interactive Electrolysis Visualizer (c8_chem_017)
const ElectrolysisVisualizer: React.FC<{
  currentVoltage: number;
  onVoltageChange: (v: number) => void;
}> = ({ currentVoltage, onVoltageChange }) => {
  const [h2Volume, setH2Volume] = useState(0);
  const [o2Volume, setO2Volume] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentVoltage > 0) {
      interval = setInterval(() => {
        setH2Volume((prev) => Math.min(prev + currentVoltage * 0.4, 80));
        setO2Volume((prev) => Math.min(prev + currentVoltage * 0.2, 40));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [currentVoltage]);

  const resetSim = () => {
    audioManager.play('tap');
    setH2Volume(0);
    setO2Volume(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white flex flex-col items-center">
      <div className="text-sm font-semibold text-cyan-400 mb-2 flex items-center justify-between w-full">
        <span>Electrolysis of Water (Acidulated H₂O)</span>
        <span className="text-xs bg-cyan-950 text-cyan-300 px-2 py-1 rounded border border-cyan-800">
          Ratio H₂:O₂ = 2:1
        </span>
      </div>

      <svg width="340" height="220" viewBox="0 0 340 220" className="bg-slate-950 rounded-lg shadow-inner">
        {/* Beaker Container */}
        <path d="M 50,40 L 50,180 Q 50,195 65,195 L 275,195 Q 290,195 290,180 L 290,40" fill="none" stroke="#475569" strokeWidth="4" />
        {/* Acidulated Water Fill */}
        <rect x="54" y="60" width="232" height="130" fill="#0284c7" fillOpacity="0.25" rx="4" />
        
        {/* Left Test Tube - Cathode (Hydrogen) */}
        <rect x="90" y="30" width="40" height="140" fill="none" stroke="#94a3b8" strokeWidth="2" rx="2" />
        {/* Gas collection region in cathode tube */}
        <rect x="92" y="32" width="36" height={h2Volume} fill="#0ea5e9" fillOpacity="0.8" rx="1" />
        <text x="110" y={32 + Math.max(12, h2Volume / 2)} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          {h2Volume > 8 ? `H₂ (${(h2Volume / 2).toFixed(0)} mL)` : ''}
        </text>

        {/* Right Test Tube - Anode (Oxygen) */}
        <rect x="210" y="30" width="40" height="140" fill="none" stroke="#94a3b8" strokeWidth="2" rx="2" />
        {/* Gas collection region in anode tube */}
        <rect x="212" y="32" width="36" height={o2Volume} fill="#f43f5e" fillOpacity="0.8" rx="1" />
        <text x="230" y={32 + Math.max(12, o2Volume / 2)} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          {o2Volume > 8 ? `O₂ (${o2Volume.toFixed(0)} mL)` : ''}
        </text>

        {/* Electrodes */}
        <rect x="105" y="100" width="10" height="85" fill="#334155" />
        <rect x="225" y="100" width="10" height="85" fill="#334155" />

        {/* Battery Wiring */}
        <path d="M 110,185 L 110,210 L 150,210" fill="none" stroke="#ef4444" strokeWidth="3" />
        <path d="M 230,185 L 230,210 L 190,210" fill="none" stroke="#3b82f6" strokeWidth="3" />
        {/* DC Battery symbol */}
        <rect x="150" y="200" width="40" height="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" rx="3" />
        <text x="170" y="213" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">DC Power</text>

        {/* Dynamic Gas Bubbles when active */}
        {currentVoltage > 0 && (
          <>
            <circle cx="110" cy="140" r="2.5" fill="#e0f2fe" className="animate-ping" />
            <circle cx="106" cy="115" r="3" fill="#e0f2fe" />
            <circle cx="114" cy="90" r="2" fill="#e0f2fe" />

            <circle cx="230" cy="150" r="2" fill="#ffe4e6" className="animate-ping" />
            <circle cx="226" cy="125" r="2.5" fill="#ffe4e6" />
          </>
        )}

        {/* Cathode / Anode Labels */}
        <text x="110" y="25" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Cathode (-)</text>
        <text x="230" y="25" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">Anode (+)</text>
      </svg>

      <div className="flex items-center space-x-4 mt-3 w-full max-w-xs justify-between">
        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-300 font-medium">Voltage:</label>
          <input
            type="range"
            min="0"
            max="12"
            value={currentVoltage}
            onChange={(e) => {
              const val = Number(e.target.value);
              onVoltageChange(val);
              if (val > 0) audioManager.play('pop');
            }}
            className="w-24 accent-cyan-500 cursor-pointer"
          />
          <span className="text-xs font-mono text-cyan-400 w-6">{currentVoltage}V</span>
        </div>
        <button
          onClick={resetSim}
          className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 transition"
        >
          Reset Gas
        </button>
      </div>
    </div>
  );
};

// 2. Water Treatment Pipeline Visualizer (c8_chem_018)
const TreatmentPipelineVisualizer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    { name: 'Raw Water & Screening', desc: 'Removes floating twigs, leaves & large plastic debris.', color: '#38bdf8' },
    { name: 'Sedimentation', desc: 'Heavy muddy silt settles to bottom of large settling tanks.', color: '#f59e0b' },
    { name: 'Sand & Gravel Filtration', desc: 'Fine suspended particles are trapped in multi-layered sand beds.', color: '#10b981' },
    { name: 'Chlorination', desc: 'Measured dose of Chlorine gas/bleach destroys pathogenic bacteria & viruses.', color: '#a855f7' },
    { name: 'Safe Potable Tap Water', desc: 'Purity verified: Clear, odorless, germ-free water distributed to households.', color: '#06b6d4' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
      <div className="text-sm font-semibold text-emerald-400 mb-3 flex justify-between items-center">
        <span>Municipal Water Purification Pipeline</span>
        <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
          Step {activeStage + 1} of 5
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {stages.map((stage, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveStage(idx);
              audioManager.play('tap');
            }}
            className={`p-2 rounded-lg text-xs flex flex-col items-center justify-center transition border ${
              activeStage === idx
                ? 'bg-slate-800 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mb-1"
              style={{ backgroundColor: stage.color, color: '#000' }}
            >
              {idx + 1}
            </div>
            <span className="text-[10px] text-center font-medium leading-tight">{stage.name}</span>
          </button>
        ))}
      </div>

      {/* Stage Visual Display */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/2 flex justify-center">
          <svg width="220" height="130" viewBox="0 0 220 130" className="bg-slate-900 rounded-md border border-slate-800">
            {activeStage === 0 && (
              <g>
                <rect x="20" y="20" width="180" height="90" fill="#1e3a8a" fillOpacity="0.4" rx="4" />
                <line x1="80" y1="20" x2="80" y2="110" stroke="#f59e0b" strokeWidth="4" strokeDasharray="4 2" />
                <circle cx="50" cy="50" r="6" fill="#854d0e" />
                <rect x="40" y="75" width="15" height="8" fill="#166534" />
                <text x="130" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold">Screen Mesh</text>
              </g>
            )}
            {activeStage === 1 && (
              <g>
                <path d="M 30,30 L 30,100 Q 30,110 40,110 L 180,110 Q 190,110 190,100 L 190,30" fill="#0284c7" fillOpacity="0.3" stroke="#475569" strokeWidth="2" />
                <rect x="32" y="90" width="156" height="18" fill="#78350f" rx="2" />
                <text x="110" y="103" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">Settled Mud / Silt Layer</text>
                <text x="110" y="55" textAnchor="middle" fill="#7dd3fc" fontSize="11">Clarified Water</text>
              </g>
            )}
            {activeStage === 2 && (
              <g>
                <rect x="40" y="20" width="140" height="90" fill="#0284c7" fillOpacity="0.2" stroke="#475569" />
                <rect x="42" y="75" width="136" height="15" fill="#d97706" />
                <rect x="42" y="90" width="136" height="18" fill="#475569" />
                <text x="110" y="86" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Fine Sand Bed</text>
                <text x="110" y="102" textAnchor="middle" fill="#e2e8f0" fontSize="9">Coarse Gravel Bed</text>
              </g>
            )}
            {activeStage === 3 && (
              <g>
                <rect x="40" y="20" width="140" height="90" fill="#0284c7" fillOpacity="0.4" stroke="#a855f7" strokeWidth="2" />
                <circle cx="90" cy="55" r="8" fill="#a855f7" className="animate-pulse" />
                <text x="90" y="58" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Cl₂</text>
                <circle cx="130" cy="70" r="8" fill="#a855f7" className="animate-pulse" />
                <text x="130" y="73" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Cl₂</text>
                <text x="110" y="105" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontWeight="bold">Disinfection Chamber</text>
              </g>
            )}
            {activeStage === 4 && (
              <g>
                <path d="M 110,25 Q 140,70 140,95 A 30,30 0 1,1 80,95 Q 80,70 110,25 Z" fill="#06b6d4" stroke="#67e8f9" strokeWidth="2" />
                <text x="110" y="100" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Pure H₂O</text>
              </g>
            )}
          </svg>
        </div>

        <div className="w-full md:w-1/2">
          <h4 className="text-base font-bold text-emerald-300 mb-1">{stages[activeStage].name}</h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">{stages[activeStage].desc}</p>
          <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px] text-amber-300">
            <strong>Exam Tip:</strong> Boiling destroys microbes but DOES NOT remove dissolved heavy metals or chemical toxins. Filtration removes suspended solids, while Chlorination kills bacteria!
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Carbon Bonding & Catenation Visualizer (c8_chem_019)
const CarbonBondingVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'tetravalency' | 'catenation_chain' | 'benzene_ring'>('tetravalency');

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-amber-400">Carbon Covalent Bonding Architecture</span>
        <div className="flex space-x-1">
          <button
            onClick={() => { setMode('tetravalency'); audioManager.play('tap'); }}
            className={`text-xs px-2.5 py-1 rounded font-medium transition ${
              mode === 'tetravalency' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Methane (CH₄)
          </button>
          <button
            onClick={() => { setMode('catenation_chain'); audioManager.play('tap'); }}
            className={`text-xs px-2.5 py-1 rounded font-medium transition ${
              mode === 'catenation_chain' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Ethane (C₂H₆ Chain)
          </button>
          <button
            onClick={() => { setMode('benzene_ring'); audioManager.play('tap'); }}
            className={`text-xs px-2.5 py-1 rounded font-medium transition ${
              mode === 'benzene_ring' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Benzene (Ring)
          </button>
        </div>
      </div>

      <div className="bg-slate-950 rounded-lg p-4 flex flex-col items-center">
        <svg width="320" height="180" viewBox="0 0 320 180" className="bg-slate-900 rounded border border-slate-800">
          {mode === 'tetravalency' && (
            <g>
              {/* Central Carbon */}
              <circle cx="160" cy="90" r="22" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
              <text x="160" y="95" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">C</text>
              <text x="160" y="125" textAnchor="middle" fill="#fcd34d" fontSize="9">Valency = 4</text>

              {/* 4 Hydrogen Atoms */}
              {/* Top H */}
              <line x1="160" y1="68" x2="160" y2="35" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="160" cy="25" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="160" y="29" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">H</text>

              {/* Bottom H */}
              <line x1="160" y1="112" x2="160" y2="145" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="160" cy="155" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="160" y="159" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">H</text>

              {/* Left H */}
              <line x1="138" y1="90" x2="105" y2="90" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="95" cy="90" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="95" y="94" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">H</text>

              {/* Right H */}
              <line x1="182" y1="90" x2="215" y2="90" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="225" cy="90" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="225" y="94" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">H</text>
            </g>
          )}

          {mode === 'catenation_chain' && (
            <g>
              {/* Carbon 1 */}
              <circle cx="110" cy="90" r="20" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
              <text x="110" y="95" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">C₁</text>

              {/* Carbon 2 */}
              <circle cx="210" cy="90" r="20" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
              <text x="210" y="95" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">C₂</text>

              {/* C-C Covalent Link (Catenation) */}
              <line x1="130" y1="90" x2="190" y2="90" stroke="#f59e0b" strokeWidth="4" />
              <text x="160" y="82" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="bold">C-C Bond</text>

              {/* H bonds around C1 */}
              <line x1="110" y1="70" x2="110" y2="40" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="110" cy="32" r="11" fill="#0284c7" />
              <text x="110" y="36" textAnchor="middle" fill="#fff" fontSize="9">H</text>

              <line x1="110" y1="110" x2="110" y2="140" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="110" cy="148" r="11" fill="#0284c7" />
              <text x="110" y="152" textAnchor="middle" fill="#fff" fontSize="9">H</text>

              <line x1="90" y1="90" x2="65" y2="90" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="57" cy="90" r="11" fill="#0284c7" />
              <text x="57" y="94" textAnchor="middle" fill="#fff" fontSize="9">H</text>

              {/* H bonds around C2 */}
              <line x1="210" y1="70" x2="210" y2="40" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="210" cy="32" r="11" fill="#0284c7" />
              <text x="210" y="36" textAnchor="middle" fill="#fff" fontSize="9">H</text>

              <line x1="210" y1="110" x2="210" y2="140" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="210" cy="148" r="11" fill="#0284c7" />
              <text x="210" y="152" textAnchor="middle" fill="#fff" fontSize="9">H</text>

              <line x1="230" y1="90" x2="255" y2="90" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="263" cy="90" r="11" fill="#0284c7" />
              <text x="263" y="94" textAnchor="middle" fill="#fff" fontSize="9">H</text>
            </g>
          )}

          {mode === 'benzene_ring' && (
            <g>
              {/* Hexagonal Carbon Ring */}
              <polygon points="160,30 215,60 215,120 160,150 105,120 105,60" fill="none" stroke="#f59e0b" strokeWidth="3" />
              <circle cx="160" cy="90" r="30" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />
              
              <circle cx="160" cy="30" r="12" fill="#d97706" />
              <circle cx="215" cy="60" r="12" fill="#d97706" />
              <circle cx="215" cy="120" r="12" fill="#d97706" />
              <circle cx="160" cy="150" r="12" fill="#d97706" />
              <circle cx="105" cy="120" r="12" fill="#d97706" />
              <circle cx="105" cy="60" r="12" fill="#d97706" />

              <text x="160" y="94" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">Benzene Ring C₆H₆</text>
            </g>
          )}
        </svg>

        <div className="mt-3 text-xs text-slate-300 text-center leading-relaxed">
          {mode === 'tetravalency' && (
            <p><strong>Tetravalency:</strong> Carbon (Config 2,4) has 4 valence electrons and forms <strong>4 covalent shared pairs</strong> to achieve octet stability.</p>
          )}
          {mode === 'catenation_chain' && (
            <p><strong>Catenation:</strong> Carbon atoms form strong, stable self-links (C-C bonds) creating infinite straight and branched organic chains.</p>
          )}
          {mode === 'benzene_ring' && (
            <p><strong>Cyclic Structures:</strong> Carbon catenation also forms stable closed rings with alternating single and double bonds!</p>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. CO2 Laboratory Preparation & Limewater Test Visualizer (c8_chem_020)
const CO2LabPrepVisualizer: React.FC = () => {
  const [acidPoured, setAcidPoured] = useState(false);
  const [bubbles, setBubbles] = useState(false);
  const [limewaterState, setLimewaterState] = useState<'clear' | 'milky' | 'clear_excess'>('clear');

  const startReaction = () => {
    audioManager.play('pop');
    setAcidPoured(true);
    setBubbles(true);
    setLimewaterState('clear');

    setTimeout(() => {
      audioManager.play('chime');
      setLimewaterState('milky');
    }, 2500);

    setTimeout(() => {
      audioManager.play('sparkle');
      setLimewaterState('clear_excess');
    }, 6000);
  };

  const resetPrep = () => {
    audioManager.play('tap');
    setAcidPoured(false);
    setBubbles(false);
    setLimewaterState('clear');
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-rose-400">Lab Preparation of Carbon Dioxide (CO₂)</span>
        <button
          onClick={acidPoured ? resetPrep : startReaction}
          className={`text-xs px-3 py-1 rounded font-bold transition ${
            acidPoured ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-rose-500 hover:bg-rose-600 text-slate-950'
          }`}
        >
          {acidPoured ? 'Reset Apparatus' : 'Pour Dilute HCl Acid'}
        </button>
      </div>

      <div className="bg-slate-950 rounded-lg p-3 flex flex-col items-center">
        <svg width="340" height="190" viewBox="0 0 340 190" className="bg-slate-900 rounded border border-slate-800">
          {/* Reaction Flask (Conical Flask) */}
          <path d="M 70,70 L 40,160 Q 35,170 50,170 L 130,170 Q 145,170 140,160 L 110,70 Z" fill="none" stroke="#64748b" strokeWidth="2" />
          {/* Marble Chips CaCO3 */}
          <circle cx="70" cy="160" r="6" fill="#cbd5e1" />
          <circle cx="85" cy="162" r="7" fill="#cbd5e1" />
          <circle cx="102" cy="159" r="6.5" fill="#94a3b8" />
          <text x="88" y="150" textAnchor="middle" fill="#f8fafc" fontSize="8" fontWeight="bold">CaCO₃ Chips</text>

          {/* Liquid Acid level in Flask */}
          {acidPoured && (
            <path d="M 52,130 L 128,130 L 136,160 Q 140,167 130,167 L 50,167 Q 40,167 44,160 Z" fill="#ef4444" fillOpacity="0.3" />
          )}

          {/* Thistle Funnel */}
          <path d="M 82,20 L 92,20 L 92,145 L 82,145 Z" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M 75,10 L 99,10 L 87,20 Z" fill="none" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Delivery Tube to Gas Jar / Limewater Test Tube */}
          <path d="M 98,65 L 98,40 L 230,40 L 230,120" fill="none" stroke="#38bdf8" strokeWidth="3" />

          {/* Limewater Test Tube */}
          <rect x="210" y="80" width="40" height="90" fill="none" stroke="#64748b" strokeWidth="2" rx="3" />
          <rect
            x="212"
            y="110"
            width="36"
            height="58"
            fill={
              limewaterState === 'clear'
                ? '#38bdf8'
                : limewaterState === 'milky'
                ? '#f8fafc'
                : '#7dd3fc'
            }
            fillOpacity={limewaterState === 'milky' ? 0.9 : 0.3}
            rx="2"
          />

          {/* Effervescence Bubbles */}
          {bubbles && (
            <>
              <circle cx="80" cy="120" r="2" fill="#ffffff" className="animate-ping" />
              <circle cx="95" cy="110" r="2.5" fill="#ffffff" />
              <circle cx="230" cy="140" r="3" fill="#ffffff" className="animate-bounce" />
            </>
          )}

          {/* Text Labels */}
          <text x="90" y="30" textAnchor="end" fill="#fca5a5" fontSize="9">Dil. HCl</text>
          <text x="230" y="75" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
            {limewaterState === 'clear' && 'Lime Water Ca(OH)₂'}
            {limewaterState === 'milky' && 'Milky CaCO₃ (s)'}
            {limewaterState === 'clear_excess' && 'Clear Ca(HCO₃)₂ (aq)'}
          </text>
        </svg>

        {/* Chemical Equation Bar */}
        <div className="mt-3 text-[11px] font-mono bg-slate-900 border border-slate-800 p-2 rounded text-center w-full">
          {acidPoured ? (
            <span className="text-rose-300">
              CaCO₃ (s) + 2HCl (aq) → CaCl₂ (aq) + H₂O (l) + <strong>CO₂ (g)↑</strong>
            </span>
          ) : (
            <span className="text-slate-400">Press button above to add dilute HCl to CaCO₃ marble chips</span>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// DISCOVERY QUESTION (PREDICT BEFORE LEARN)
// ==========================================
const DISCOVERY_DATA = {
  question: "When electricity breaks down pure acidulated water in an electrolysis cell, bubbles of Hydrogen (H₂) and Oxygen (O₂) collect at the cathode and anode. What volume ratio of H₂ to O₂ gas will be produced?",
  options: [
    {
      id: 'opt1',
      text: '1 : 1 by volume (equal amounts of hydrogen and oxygen)',
      isCorrect: false,
      explanation: 'Incorrect. Water is not made of equal volumes of hydrogen and oxygen.'
    },
    {
      id: 'opt2',
      text: '2 : 1 by volume (twice as much Hydrogen as Oxygen)',
      isCorrect: true,
      explanation: 'Correct! The formula H₂O tells us that each water molecule contains 2 Hydrogen atoms for every 1 Oxygen atom. Electrolysis yields H₂:O₂ in a 2:1 volume ratio!'
    },
    {
      id: 'opt3',
      text: '1 : 2 by volume (twice as much Oxygen as Hydrogen)',
      isCorrect: false,
      explanation: 'Incorrect. Remember that the formula of water is H₂O, not HO₂.'
    },
    {
      id: 'opt4',
      text: '8 : 1 by mass and volume',
      isCorrect: false,
      explanation: 'Incorrect. 8:1 is the ratio by MASS (since oxygen atom mass is 16 and 2 hydrogens mass is 2). But by VOLUME, the ratio is 2:1!'
    }
  ]
};

// ==========================================
// TEACHING SLIDES DATA
// ==========================================
const SLIDES_DATA: TeachingSlide[] = [
  {
    id: 'slide_017_1',
    nodeId: 'c8_chem_017',
    title: 'Water: Composition & Electrolysis',
    subtitle: 'Why Water is a Compound (H₂O) with Fixed 2:1 Volume Ratio',
    content: [
      'Water (H₂O) is a chemical compound formed by 2 Hydrogen atoms combined chemically with 1 Oxygen atom.',
      'During Electrolysis (decomposing water with electricity), Hydrogen gas collects at the CATHODE (- electrode) and Oxygen gas collects at the ANODE (+ electrode).',
      'The volume of Hydrogen collected is exactly TWICE the volume of Oxygen (2:1 ratio by volume).',
      'Water properties are totally different from its elements: Hydrogen is inflammable and Oxygen supports burning, but Water extinguishes fire!'
    ],
    eli5: 'Water is like a Lego model made of 2 blue Hydrogen bricks and 1 red Oxygen brick. When you zap it with electricity, you get twice as many blue gas bubbles as red ones!',
    visualType: 'electrolysis',
    keyTakeaway: 'Water formula H₂O is proven by electrolysis yielding H₂ and O₂ in a 2:1 volume ratio.'
  },
  {
    id: 'slide_017_2',
    nodeId: 'c8_chem_017',
    title: 'Water as the Universal Solvent',
    subtitle: 'Solute, Solvent, Solution & Physical Constants',
    content: [
      'Solute: The substance that dissolves (e.g., Sodium Chloride salt, Sugar, Copper Sulphate).',
      'Solvent: The liquid that does the dissolving (Water is called the Universal Solvent because of its polar molecular shape).',
      'Solution: The homogeneous mixture formed (Solute + Solvent).',
      'Physical Constants of Pure Water: Boiling Point = 100°C (at 1 atm), Freezing Point = 0°C, Density = 1 g/cm³ at 4°C.'
    ],
    eli5: 'When you stir sugar into water, sugar is the solute guest, water is the solvent host, and sweet water is the happy solution party where sugar particles spread evenly everywhere!',
    visualType: 'solvent',
    keyTakeaway: 'Solutions are homogeneous mixtures where solute stays spread evenly without disappearing or settling.'
  },
  {
    id: 'slide_018_1',
    nodeId: 'c8_chem_018',
    title: 'Water Pollution & Treatment',
    subtitle: 'Causes of Pollution & Municipal Treatment Pipeline',
    content: [
      'Causes of Pollution: Sewage (human waste & soap), Industrial Waste (heavy metals & acids), Agricultural Runoff (pesticides & fertilizers), and Oil Spills.',
      'Municipal Purification Steps: 1) Screening → 2) Sedimentation (mud settles) → 3) Filtration (sand/gravel beds) → 4) Chlorination (kills bacteria).',
      'Boiling at Home: Kills pathogenic bacteria and germs, BUT DOES NOT remove heavy metals, dissolved industrial chemicals, or pesticides!',
      'Conservation: Rainwater Harvesting (RWH) recharges underground aquifers and prevents water scarcity.'
    ],
    eli5: 'Clear water is not always pure water! Microbes and poisons can be invisible. Filtering removes dirt, but chlorination or boiling is needed to kill tiny sick germs.',
    visualType: 'treatment',
    keyTakeaway: 'Municipal water treatment combines sedimentation, filtration, and chlorination for safe drinking water.'
  },
  {
    id: 'slide_019_1',
    nodeId: 'c8_chem_019',
    title: 'Carbon Bonding & Tetravalency',
    subtitle: 'Electronic Configuration (2,4) and Covalent Electron Sharing',
    content: [
      'Carbon has Atomic Number 6. Electronic Configuration = 2, 4 (2 inner, 4 valence electrons).',
      'Tetravalency: Needs 4 more electrons to achieve stable octet (8). Losing or gaining 4 electrons takes too much energy, so Carbon SHARES 4 electron pairs.',
      'Covalent Bonding: Bonds formed by mutual sharing of electron pairs.',
      'Carbon forms 4 single covalent bonds in Methane (CH₄) and Ethane (C₂H₆).'
    ],
    eli5: 'Carbon is an atom with 4 friendly open hands. It holds hands with 4 Hydrogen friends to make Methane!',
    visualType: 'tetravalency',
    keyTakeaway: 'Carbon has valency 4 (tetravalent) and completes its octet exclusively by sharing electrons (covalent bonds).'
  },
  {
    id: 'slide_019_2',
    nodeId: 'c8_chem_019',
    title: 'Carbon Catenation & Rings',
    subtitle: 'Why Millions of Organic Compounds Exist',
    content: [
      'Catenation: The unique ability of Carbon atoms to link with other Carbon atoms to form long straight chains, branched chains, and closed rings.',
      'Straight Chains: e.g., Ethane (C₂H₆), Propane (C₃H₈), Butane (C₄H₁₀).',
      'Cyclic Rings: e.g., Benzene (C₆H₆) ring structure.',
      'Together, Tetravalency + Catenation explain why Carbon forms millions of organic compounds in living organisms, fuels, and plastics!'
    ],
    eli5: 'Carbon atoms can join hands with each other in long chains, side branches, or circular ring dances like a long line of railway carriages!',
    visualType: 'catenation',
    keyTakeaway: 'Catenation is self-linking of carbon atoms into chains and rings, forming the backbone of organic chemistry.'
  },
  {
    id: 'slide_020_1',
    nodeId: 'c8_chem_020',
    title: 'Carbon Dioxide (CO₂): Prep & Properties',
    subtitle: 'Lab Reaction CaCO₃ + 2HCl and Limewater Chemical Test',
    content: [
      'Lab Preparation: Action of dilute Hydrochloric acid on Marble Chips (Calcium Carbonate): CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑.',
      'Gas Collection: Upward displacement of air because CO₂ is heavier/denser than air (Molecular Mass = 44 vs Air ≈ 29).',
      'Properties: Colourless, odourless, non-combustible, extinguishes flames (used in fire extinguishers).',
      'Limewater Test: CO₂ turns clear Limewater Ca(OH)₂ MILKY due to insoluble CaCO₃ precipitate. Excess CO₂ makes milkiness disappear forming soluble Ca(HCO₃)₂.'
    ],
    eli5: 'When acid hits marble, fizzy CO₂ gas pours out! It is heavy like syrup so it sinks into the gas jar, puts out candles, and turns limewater cloudy white like milk.',
    visualType: 'co2_lab',
    keyTakeaway: 'CO₂ is prepared by CaCO₃ + 2HCl, collected by upward displacement of air, and turns limewater milky.'
  }
];

// ==========================================
// ADAPTIVE CHALLENGES (MIN 8 PROGRESSIVE)
// ==========================================
const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'c1',
    nodeId: 'c8_chem_017',
    title: 'Electrolysis Gas Volume Ratio',
    type: 'mcq',
    question: 'During the electrolysis of acidulated water, 40 cm³ of Hydrogen gas is collected at the cathode. What volume of Oxygen gas will be collected at the anode?',
    options: [
      '80 cm³',
      '40 cm³',
      '20 cm³',
      '10 cm³'
    ],
    correctAnswer: 2,
    explanation: 'Since water has the formula H₂O, electrolysis decomposes water into Hydrogen and Oxygen in a 2:1 volume ratio. If H₂ is 40 cm³, O₂ will be half of that, which is 20 cm³.',
    hint: 'Hydrogen and Oxygen volumes are in a 2:1 ratio (H₂ is double the volume of O₂).'
  },
  {
    id: 'c2',
    nodeId: 'c8_chem_017',
    title: 'Identify Solute and Solvent',
    type: 'mcq',
    question: 'When blue Copper Sulphate crystals are stirred into water until a clear blue liquid forms, which statement correctly identifies the components?',
    options: [
      'Copper sulphate is solvent, water is solute',
      'Copper sulphate is solute, water is solvent, blue liquid is solution',
      'Copper sulphate is solution, water is solute',
      'Copper sulphate has disappeared from the liquid completely'
    ],
    correctAnswer: 1,
    explanation: 'The solid being dissolved (Copper sulphate) is the solute, the liquid doing the dissolving (water) is the solvent, and the homogeneous mixture is the solution.',
    hint: 'Solute is what gets dissolved; solvent is what dissolves it.'
  },
  {
    id: 'c3',
    nodeId: 'c8_chem_018',
    title: 'Municipal Water Purification Order',
    type: 'mcq',
    question: 'Select the CORRECT chronological sequence of steps in a municipal water treatment plant before tap distribution:',
    options: [
      'Chlorination → Screening → Sedimentation → Filtration',
      'Screening → Sedimentation → Filtration → Chlorination',
      'Filtration → Chlorination → Screening → Sedimentation',
      'Sedimentation → Chlorination → Filtration → Screening'
    ],
    correctAnswer: 1,
    explanation: 'First large debris is screened, then heavy silt settles in sedimentation tanks, finer particles are filtered through sand beds, and finally chlorine is added to disinfect germs.',
    hint: 'Large debris first, heavy mud second, sand filter third, disinfectant last.'
  },
  {
    id: 'c4',
    nodeId: 'c8_chem_018',
    title: 'Boiling vs Chemical Contamination',
    type: 'mcq',
    question: 'A student claims: "Because our well water was boiled for 10 minutes, it is completely pure and safe even though factory liquid waste leaked nearby." Why is the student WRONG?',
    options: [
      'Boiling cools down the water too quickly',
      'Boiling kills microbes but DOES NOT remove dissolved heavy metals, industrial acids, or toxic chemicals',
      'Boiling turns pure water into hydrogen gas',
      'Boiling adds salt to the water'
    ],
    correctAnswer: 1,
    explanation: 'Boiling destroys living biological germs (bacteria/viruses), but dissolved non-volatile chemical pollutants like lead, mercury, and acids remain in the water.',
    hint: 'Boiling kills living germs, but does it evaporate heavy metals out?'
  },
  {
    id: 'c5',
    nodeId: 'c8_chem_019',
    title: 'Carbon Valence Electrons & Tetravalency',
    type: 'mcq',
    question: 'Carbon has atomic number 6. How many valence electrons does it have, and how many covalent bonds does it form to satisfy the octet rule?',
    options: [
      '2 valence electrons, forms 2 ionic bonds',
      '4 valence electrons, forms 4 covalent bonds (Tetravalent)',
      '6 valence electrons, forms 6 single bonds',
      '4 valence electrons, loses 4 electrons to form C⁴⁺'
    ],
    correctAnswer: 1,
    explanation: 'Electronic configuration of Carbon (Z=6) is 2,4. Having 4 valence electrons, it shares 4 pairs with other atoms, exhibiting tetravalency.',
    hint: 'Look at electronic config 2,4. How many electrons in outer shell?'
  },
  {
    id: 'c6',
    nodeId: 'c8_chem_019',
    title: 'Definition of Catenation',
    type: 'mcq',
    question: 'What is the unique chemical property known as CATENATION?',
    options: [
      'The ability of carbon to dissolve in water',
      'The property of carbon atoms self-linking with each other to form long chains and rings',
      'The process of carbon reacting with oxygen to produce fire',
      'The ability of carbon to form ionic salts with metals'
    ],
    correctAnswer: 1,
    explanation: 'Catenation is the remarkable self-bonding property of carbon atoms linking together via stable C-C covalent bonds to form chains and rings.',
    hint: 'Think of paper clips linking together into a long chain.'
  },
  {
    id: 'c7',
    nodeId: 'c8_chem_020',
    title: 'Carbon Dioxide Lab Reaction Equation',
    type: 'mcq',
    question: 'Which balanced chemical equation represents the standard laboratory preparation of Carbon Dioxide gas?',
    options: [
      'C + O₂ → CO₂',
      'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',
      'Ca(OH)₂ + CO₂ → CaCO₃ + H₂O',
      '2NaHCO₃ → Na₂CO₃ + H₂O + CO₂'
    ],
    correctAnswer: 1,
    explanation: 'In the laboratory, CO₂ is prepared by reacting marble chips (Calcium Carbonate CaCO₃) with dilute Hydrochloric acid (HCl).',
    hint: 'Reactants are Marble chips (CaCO₃) and dilute acid (HCl).'
  },
  {
    id: 'c8',
    nodeId: 'c8_chem_020',
    title: 'CO₂ Gas Collection Method',
    type: 'mcq',
    question: 'Carbon dioxide gas is collected in a gas jar by UPWARD DISPLACEMENT OF AIR because:',
    options: [
      'CO₂ is lighter than air and floats up',
      'CO₂ is denser (heavier) than air and settles to the bottom of the jar',
      'CO₂ dissolves rapidly in air',
      'CO₂ reacts violently with atmospheric oxygen'
    ],
    correctAnswer: 1,
    explanation: 'CO₂ has molecular mass 44, whereas air average mass is ~29. Because CO₂ is denser than air, it sinks to the bottom and pushes lighter air upwards and out.',
    hint: 'Compare molecular mass of CO₂ (44) with Air (~29).'
  },
  {
    id: 'c9',
    nodeId: 'c8_chem_020',
    title: 'The Limewater Test Disappearance',
    type: 'mcq',
    question: 'When CO₂ is bubbled through limewater for a long time, the initial milky cloudiness DISAPPEARS. Why?',
    options: [
      'The milkiness evaporates into air',
      'Insoluble Calcium Carbonate turns into SOLUBLE Calcium Bicarbonate [Ca(HCO₃)₂]',
      'Limewater turns into hydrochloric acid',
      'Calcium carbonate breaks back into carbon gas'
    ],
    correctAnswer: 1,
    explanation: 'Short bubbling forms insoluble CaCO₃ (milky). Excess bubbling with H₂O + CO₂ converts it to soluble Calcium Bicarbonate Ca(HCO₃)₂, clearing the liquid.',
    hint: 'Excess CO₂ converts insoluble carbonate into soluble bicarbonate.'
  },
  {
    id: 'c10',
    nodeId: 'c8_chem_018',
    title: 'Water Conservation & Water Audit',
    type: 'mcq',
    question: 'A family of 4 calculates they consume 600 Litres of water daily. Which action will effectively conserve water and recharge groundwater without cost?',
    options: [
      'Boiling all washing water before throwing it away',
      'Installing rooftop Rainwater Harvesting (RWH) to collect rain into recharge wells',
      'Adding chlorine bleach to the garden soil',
      'Leaving taps open during brushing to clean the sink'
    ],
    correctAnswer: 1,
    explanation: 'Rooftop Rainwater Harvesting collects clean rain and directs it into underground aquifers or storage, conserving water sustainably.',
    hint: 'Which technique captures natural rainfall to replenish aquifers?'
  }
];

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Ice is denser than liquid water because it is solid",
    description: "Students believe that since ice is a solid, it must be denser than liquid water and sink. They assume that all substances in their solid state are denser than their liquid state.",
    correction: "Water exhibits anomalous expansion, expanding when it freezes into ice due to the formation of an open cage-like crystal structure. This makes ice less dense than liquid water, allowing it to float. Consequently, liquid water reaches its maximum density at 4°C, not at its freezing point.",
  },
  {
    id: "misc_2",
    title: "Boiling water breaks chemical bonds to form hydrogen and oxygen",
    description: "Students often confuse phase changes with chemical reactions, believing that boiling breaks the H₂O molecule into hydrogen and oxygen gases. They think steam is a mixture of separate hydrogen and oxygen atoms.",
    correction: "Boiling is a physical change that breaks weak intermolecular forces between water molecules, not the strong covalent bonds within them. Steam consists of gaseous H₂O molecules that retain the exact chemical composition of liquid water. Chemical decomposition of water into hydrogen and oxygen requires electrolysis, not simple heating.",
  },
  {
    id: "misc_3",
    title: "Electrolysis yields equal volumes of hydrogen and oxygen gas",
    description: "Students assume that electrolysis produces equal volumes of hydrogen and oxygen gas because water is made of two elements. They overlook the atomic ratio represented in the chemical formula.",
    correction: "The chemical formula of water is H₂O, meaning it contains two hydrogen atoms for every one oxygen atom. During electrolysis, hydrogen gas collects at the cathode and oxygen gas at the anode in a 2:1 volume ratio. Therefore, the volume of hydrogen gas produced is double the volume of oxygen gas.",
  },
  {
    id: "misc_4",
    title: "Water should burn because it contains hydrogen and oxygen",
    description: "Students believe water must be combustible because hydrogen is highly flammable and oxygen supports burning. They expect a chemical compound to retain the properties of its constituent elements.",
    correction: "When hydrogen and oxygen chemically combine to form water, a compound with entirely new properties is produced. Water is actually the stable product of hydrogen combustion, meaning it cannot burn further under normal conditions. As a result, water acts as a fire extinguisher rather than a fuel.",
  },
  {
    id: "misc_5",
    title: "Water always boils at 100 degrees Celsius everywhere",
    description: "Students think 100°C is an absolute, unchangeable boiling point for water in all situations. They fail to realize how atmospheric pressure and dissolved impurities alter boiling behavior.",
    correction: "The boiling point of pure water is 100°C only at standard atmospheric pressure (1 atm). At higher altitudes where atmospheric pressure is lower, water boils at temperatures below 100°C. Additionally, adding dissolved solutes like common salt increases the boiling point of water above 100°C.",
  },
];

export default function C8_ChemistryWaterpropertiesandcompositionSim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // State variables
  const [viewMode, setViewMode] = useState<ViewMode>('discovery');
  const [discoverySelected, setDiscoverySelected] = useState<string | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 300, y: 200 });

  // Interactive Sim internal state
  const [simVoltage, setSimVoltage] = useState<number>(6);

  // SRS & BKT State tracking per node
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>({
    c8_chem_017: createBKTState(),
    c8_chem_018: createBKTState(),
    c8_chem_019: createBKTState(),
    c8_chem_020: createBKTState()
  });

  // Dynamic sound playback wrapper
  const playSound = (sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch {
      // fallback safety
    }
  };

  // Voice narration wrapper
  const speakText = (text: string) => {
    try {
      speechManager.speak(text);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      speechManager.speak('Remember the key concept.');
      speechManager.speak('You are doing well!');
    } catch {
      // fallback safety
    }
  };

  // Auto hint timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (viewMode === 'challenge' && !challengeSubmitted) {
        setShowHint(true);
        playSound('chime');
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, [viewMode, currentChallengeIdx, challengeSubmitted]);

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = (optId: string) => {
    setDiscoverySelected(optId);
    setDiscoverySubmitted(true);
    const chosen = DISCOVERY_DATA.options.find((o) => o.id === optId);
    if (chosen?.isCorrect) {
      playSound('success');
      speakText('Excellent prediction! The ratio of Hydrogen to Oxygen in water is 2 to 1 by volume.');
    } else {
      playSound('error');
      speakText('Good try! Let us explore why water yields 2 volumes of Hydrogen for 1 volume of Oxygen.');
    }
  };

  // Handle Challenge Answer Submission
  const handleChallengeSubmit = () => {
    if (selectedAnswer === null) return;
    const currChallenge = CHALLENGES_DATA[currentChallengeIdx];
    const correct = selectedAnswer === currChallenge.correctAnswer;
    setIsCorrect(correct);
    setChallengeSubmitted(true);

    const nodeId = currChallenge.nodeId;
    // BKT & SRS Updates
    const updatedBKT = bktUpdate(bktStates[nodeId], correct);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    // Local Storage SRS update
    const reviewItem = createReviewItem(currChallenge.id, 'Chemistry');
    sm2Update(reviewItem, correct ? 5 : 1, 0);

    if (correct) {
      playSound('drop-correct');
      playSound('sparkle');
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setScore((prev) => prev + 10);
      speakText('Splendid! That is correct chemistry!');
    } else {
      playSound('drop-wrong');
      speakText('Not quite. Review the chemical reasoning below.');
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    playSound('whoosh');
    setSelectedAnswer(null);
    setChallengeSubmitted(false);
    setShowHint(false);
    setShowSparkle(false);

    if (currentChallengeIdx < CHALLENGES_DATA.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    } else {
      // Finish simulation
      setViewMode('summary');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      playSound('celebration');
      speakText('Congratulations! You have mastered Water and Carbon Dioxide chemistry!');

      // Save scores to mastery store
      ALL_NODE_IDS.forEach((id) => {
        const level = getMasteryLevel(bktStates[id]);
        recordGameScore(Object.values(ALL_NODE_IDS), score + 100);
      });

      if (onComplete) {
        onComplete(score + 100);
      }
    }
  };

  // Current active challenge
  const currentChallenge = CHALLENGES_DATA[currentChallengeIdx];
  const currentSlide = SLIDES_DATA[currentSlideIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Unlocked! Water & Carbon Chemistry Complete" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* HEADER BAR */}
      <header className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4 flex flex-col md:flex-row items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3 mb-2 md:mb-0">
          <div className="w-10 h-10 rounded-lg bg-cyan-600 flex items-center justify-center font-bold text-white text-lg shadow-md">
            H₂O
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 leading-tight">
              ICSE Class 8 Chemistry: Water & Carbon Compounds
            </h1>
            <p className="text-xs text-slate-400">
              Nodes: c8_chem_017 • c8_chem_018 • c8_chem_019 • c8_chem_020
            </p>
          </div>
        </div>

        {/* Navigation Mode Buttons & Score */}
        <div className="flex items-center space-x-2">
          <div className="bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg text-xs font-mono text-cyan-400 mr-2">
            Score: <span className="text-white font-bold">{score}</span>
          </div>

          <button
            onClick={() => { setViewMode('discovery'); playSound('tap'); }}
            className={`text-xs px-2.5 py-1.5 rounded-lg transition font-medium ${
              viewMode === 'discovery' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Predict
          </button>
          <button
            onClick={() => { setViewMode('learn'); playSound('tap'); }}
            className={`text-xs px-2.5 py-1.5 rounded-lg transition font-medium ${
              viewMode === 'learn' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Teach Slides
          </button>
          <button
            onClick={() => { setViewMode('lab'); playSound('tap'); }}
            className={`text-xs px-2.5 py-1.5 rounded-lg transition font-medium ${
              viewMode === 'lab' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Virtual Lab
          </button>
          <button
            onClick={() => { setViewMode('challenge'); playSound('tap'); }}
            className={`text-xs px-2.5 py-1.5 rounded-lg transition font-medium ${
              viewMode === 'challenge' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Challenges
          </button>
        </div>
      </header>

      {/* NODE MASTERY BADGES BAR */}
      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {ALL_NODE_IDS.map((id) => {
          const meta = NODE_METADATA[id];
          const bkt = bktStates[id];
          const masteryPct = Math.round(bkt.pKnown * 100);

          return (
            <div key={id} className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-mono text-cyan-400">{meta.code}</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                  {masteryPct}%
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-200 truncate mb-1.5">{meta.title}</div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${masteryPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-4xl flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* 1. DISCOVERY VIEW */}
          {viewMode === 'discovery' && (
            <motion.div
              key="discovery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-2xl"
            >
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Discovery Hypothesis</span>
                <span>•</span>
                <span>Predict Before You Learn</span>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-white mb-4 leading-snug">
                {DISCOVERY_DATA.question}
              </h2>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {DISCOVERY_DATA.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleDiscoverySubmit(opt.id)}
                    disabled={discoverySubmitted}
                    className={`p-3.5 rounded-xl border text-left text-sm transition flex justify-between items-center ${
                      discoverySelected === opt.id
                        ? opt.isCorrect
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {discoverySubmitted && opt.isCorrect && (
                      <span className="text-emerald-400 font-bold text-xs ml-2">✓ Correct</span>
                    )}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 leading-relaxed mb-4">
                  <strong className="text-cyan-400 block mb-1">Scientific Explanation:</strong>
                  {DISCOVERY_DATA.options.find((o) => o.id === discoverySelected)?.explanation}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setViewMode('learn');
                    playSound('whoosh');
                  }}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm shadow-lg transition"
                >
                  Proceed to Teaching Concepts →
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. TEACH SLIDES VIEW */}
          {viewMode === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-2xl flex flex-col"
            >
              {/* Slide Navigation Header */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase">
                    Slide {currentSlideIdx + 1} of {SLIDES_DATA.length} • {NODE_METADATA[currentSlide.nodeId].title}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold text-white leading-tight">
                    {currentSlide.title}
                  </h2>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => {
                      if (currentSlideIdx > 0) {
                        setCurrentSlideIdx((p) => p - 1);
                        playSound('tap');
                      }
                    }}
                    disabled={currentSlideIdx === 0}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs rounded text-slate-200"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => {
                      if (currentSlideIdx < SLIDES_DATA.length - 1) {
                        setCurrentSlideIdx((p) => p + 1);
                        playSound('tap');
                      } else {
                        setViewMode('lab');
                        playSound('whoosh');
                      }
                    }}
                    className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-xs font-bold rounded text-white"
                  >
                    {currentSlideIdx < SLIDES_DATA.length - 1 ? 'Next →' : 'Go to Lab →'}
                  </button>
                </div>
              </div>

              {/* Slide Visual & Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                {/* Custom SVG Visual per slide */}
                <div className="flex flex-col justify-center">
                  {currentSlide.visualType === 'electrolysis' && (
                    <ElectrolysisVisualizer currentVoltage={simVoltage} onVoltageChange={setSimVoltage} />
                  )}
                  {currentSlide.visualType === 'solvent' && (
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white flex flex-col items-center">
                      <span className="text-xs font-bold text-cyan-400 mb-2">Dissolution: NaCl in Water</span>
                      <svg width="260" height="150" viewBox="0 0 260 150" className="bg-slate-950 rounded border border-slate-800">
                        <rect x="30" y="30" width="200" height="100" fill="#0284c7" fillOpacity="0.3" rx="4" />
                        <circle cx="70" cy="70" r="8" fill="#ef4444" />
                        <text x="70" y="73" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Na⁺</text>
                        <circle cx="110" cy="90" r="10" fill="#10b981" />
                        <text x="110" y="93" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Cl⁻</text>
                        <circle cx="160" cy="60" r="8" fill="#ef4444" />
                        <circle cx="190" cy="100" r="10" fill="#10b981" />
                        <text x="130" y="140" textAnchor="middle" fill="#7dd3fc" fontSize="10">Polar H₂O molecules surround ions</text>
                      </svg>
                    </div>
                  )}
                  {currentSlide.visualType === 'treatment' && <TreatmentPipelineVisualizer />}
                  {currentSlide.visualType === 'tetravalency' && <CarbonBondingVisualizer />}
                  {currentSlide.visualType === 'catenation' && <CarbonBondingVisualizer />}
                  {currentSlide.visualType === 'co2_lab' && <CO2LabPrepVisualizer />}
                </div>

                {/* Explanation text */}
                <div className="flex flex-col justify-between">
                  <div className="space-y-2 mb-3">
                    <h3 className="text-sm font-semibold text-cyan-300">{currentSlide.subtitle}</h3>
                    <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                      {currentSlide.content.map((bullet, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-cyan-400 mr-2 font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ELI5 Box */}
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      ELI5 Analogy:
                    </span>
                    <p className="text-xs text-slate-300 italic leading-relaxed">"{currentSlide.eli5}"</p>
                  </div>
                </div>
              </div>

              {/* Takeaway footer */}
              <div className="bg-cyan-950/60 border border-cyan-800/60 p-2.5 rounded-lg flex items-center justify-between text-xs text-cyan-200">
                <span><strong>Key Takeaway:</strong> {currentSlide.keyTakeaway}</span>
              </div>
            </motion.div>
          )}

          {/* 3. VIRTUAL LAB VIEW */}
          {viewMode === 'lab' && (
            <motion.div
              key="lab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase">Interactive Chemistry Lab</span>
                  <h2 className="text-lg font-bold text-white">Hands-On Chemistry Workbench</h2>
                </div>
                <button
                  onClick={() => {
                    setViewMode('challenge');
                    playSound('whoosh');
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition"
                >
                  Start Adaptive Challenges →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-300 mb-2">Sim 1: Electrolysis of Water</h3>
                  <ElectrolysisVisualizer currentVoltage={simVoltage} onVoltageChange={setSimVoltage} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-300 mb-2">Sim 2: Lab Preparation of CO₂</h3>
                  <CO2LabPrepVisualizer />
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. ADAPTIVE CHALLENGES VIEW */}
          {viewMode === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-2xl"
            >
              {/* Challenge Header */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-cyan-400">
                      Challenge {currentChallengeIdx + 1} of {CHALLENGES_DATA.length}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      Node: {currentChallenge.nodeId}
                    </span>
                  </div>
                  <h2 className="text-base md:text-lg font-bold text-white mt-1">
                    {currentChallenge.title}
                  </h2>
                </div>

                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs px-2.5 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded hover:bg-amber-900 transition flex items-center space-x-1"
                >
                  <span>💡 Hint</span>
                </button>
              </div>

              {/* Hint Bubble Component */}
              <HintBubble show={showHint} text={currentChallenge.hint} />

              {/* Question Text */}
              <div className="mb-5 text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                {currentChallenge.question}
              </div>

              {/* Multiple Choice Options */}
              {currentChallenge.options && (
                <div className="grid grid-cols-1 gap-2.5 mb-5">
                  {currentChallenge.options.map((optionText, idx) => {
                    const isSelected = selectedAnswer === idx;
                    let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (challengeSubmitted) {
                      if (idx === currentChallenge.correctAnswer) {
                        optionStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected) {
                        optionStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200 font-semibold ring-1 ring-cyan-500';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!challengeSubmitted) {
                            setSelectedAnswer(idx);
                            playSound('tap');
                          }
                        }}
                        disabled={challengeSubmitted}
                        className={`p-3 rounded-xl border text-left text-xs md:text-sm transition flex items-center justify-between ${optionStyle}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-300">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{optionText}</span>
                        </div>
                        {challengeSubmitted && idx === currentChallenge.correctAnswer && (
                          <span className="text-emerald-400 text-xs font-bold">✓ Correct</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Detailed Explanation Banner on Submit */}
              {challengeSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border text-xs leading-relaxed mb-5 ${
                    isCorrect
                      ? 'bg-emerald-950/70 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/70 border-rose-800 text-rose-200'
                  }`}
                >
                  <strong className="block text-sm mb-1 font-bold">
                    {isCorrect ? '🎉 Outstanding Answer!' : '⚠️ Learning Opportunity:'}
                  </strong>
                  {currentChallenge.explanation}
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                {!challengeSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={selectedAnswer === null}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded-xl font-bold text-sm shadow-lg transition"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg transition"
                  >
                    {currentChallengeIdx < CHALLENGES_DATA.length - 1 ? 'Next Challenge →' : 'Complete Module 🎉'}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* 5. SUMMARY VIEW */}
          {viewMode === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 text-center shadow-2xl flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-3xl mb-4 shadow-lg">
                🏆
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Class 8 ICSE Chemistry Mastery Achieved!</h2>
              <p className="text-xs text-slate-300 max-w-md mb-6 leading-relaxed">
                You have successfully completed interactive simulations and adaptive challenges for Water (Composition, Treatment) and Carbon (Bonding, CO₂ Preparation).
              </p>

              {/* Score breakdown */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl w-full max-w-md mb-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <span className="text-xs text-slate-400 block">Final Score</span>
                  <span className="text-2xl font-bold text-cyan-400">{score + 100} pts</span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-slate-400 block">Nodes Mastered</span>
                  <span className="text-2xl font-bold text-emerald-400">4 / 4</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setCurrentChallengeIdx(0);
                    setSelectedAnswer(null);
                    setChallengeSubmitted(false);
                    setViewMode('challenge');
                    playSound('tap');
                  }}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition"
                >
                  Retry Challenges
                </button>
                <button
                  onClick={() => {
                    setViewMode('learn');
                    setCurrentSlideIdx(0);
                    playSound('tap');
                  }}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition"
                >
                  Review Slide Concepts
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
      <footer className="w-full max-w-4xl mt-6 pt-3 border-t border-slate-900 text-center text-[11px] text-slate-500 flex justify-between items-center">
        <span>ICSE Class 8 Chemistry Interactive Learning Module</span>
        <span>Brilliant.org Design Pattern • SRS & BKT Engine</span>
      </footer>
    </div>
  );
}

// ==========================================
// DEFAULT PROPS / METADATA
// ==========================================
C8_ChemistryWaterpropertiesandcompositionSim.defaultProps = {
  nodeIds: ALL_NODE_IDS
};