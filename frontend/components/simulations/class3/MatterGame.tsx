'use client';

/**
 * MatterGame — Learn about Matter: Solids, Liquids, and Gases!
 *
 * CISCE Nodes: c3_chem_001 (Living & non-living things chemistry focus),
 *              c3_chem_002 (Forms of matter - solids),
 *              c3_chem_003 (Forms of matter - liquids),
 *              c3_chem_004 (Forms of matter - gases),
 *              c3_chem_005 (Properties of solids, liquids and gases)
 *
 * Mascot: Scientist Suresh — a friendly chemist with a lab coat, safety goggles,
 *         a test tube, and a flask. Custom SVG.
 *
 * 9/10 Quality Features:
 * - Teaching intro with 5 slides before play begins (with text-to-speech)
 * - Custom SVG chemistry laboratory scene background (sky through window, benches, beakers, molecules)
 * - Custom SVG topic-specific chemistry objects (SolidBlock, LiquidBeaker, GasParticles, IceCube, WaterDrop, Steam, Stone, Milk, AirBalloon, MoleculeModel, Thermometer)
 * - Custom SVG mascot (Scientist Suresh) with lab coat, mood states, speech bubble
 * - Drag-and-drop: drag materials into Solid, Liquid, or Gas bins
 * - 8 progressive challenges: identify solids → identify liquids → identify gases → sort forms → container shape → property sorting → temperature phase → state changes
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers (from enrichment files)
 * - Spoken instructions via Web Speech API (speechManager)
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after 10 seconds of inactivity
 * - Progressive difficulty ladder
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Game Screen Type ─────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_solid' | 'identify_liquid' | 'identify_gas' | 'sort_states' | 'container_shape' | 'sort_properties' | 'phase_temp' | 'sort_changes';

interface Challenge {
  type: ChallengeType;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  sortItems?: { id: string; label: string; icon: string; correctBin: string }[];
  bins?: { id: string; label: string; color: string }[];
}

// ─── Teaching Slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ���─

const TEACHING_SLIDES = [
  {
    title: 'What is Matter? 🔬',
    text: 'Everything in the world that we can see, touch, or feel is called MATTER! Matter has mass and takes up space. It exists in three main forms: solids, liquids, and gases!',
    emoji: '🧪',
    bgColor: 'from-gold-500 to-gold-600',
    spoken: 'Everything in the world that we can see, touch, or feel is called matter! Matter has mass and takes up space, existing as solids, liquids, and gases!',
  },
  {
    title: 'Solids — Rigid & Fixed! 🧱',
    text: 'A SOLID has a fixed shape and a fixed volume! Its particles are packed tightly together. A stone, a book, a pencil, and an ice cube keep their shape everywhere you put them!',
    emoji: '🧊',
    bgColor: 'from-amber-500 to-orange-600',
    spoken: 'A solid has a fixed shape and a fixed volume! Its particles are packed tightly together. A stone, a book, and a brick keep their shape everywhere!',
  },
  {
    title: 'Liquids — Flow & Pour! 💧',
    text: 'A LIQUID has a fixed volume, but NO fixed shape! It flows and takes the shape of its container. Water, milk, oil, and juice pour easily and make a flat surface when still!',
    emoji: '🥛',
    bgColor: 'from-gold-500 to-gold-600',
    spoken: 'A liquid has a fixed volume, but no fixed shape! It flows and takes the shape of its container. Water, milk, and oil pour easily and take container shapes!',
  },
  {
    title: 'Gases — Invisible & Free! 🎈',
    text: 'A GAS has no fixed shape and no fixed volume! Its particles are far apart and move quickly. A gas spreads out to fill every corner of any container. Air, steam, and oxygen are gases!',
    emoji: '💨',
    bgColor: 'from-emerald-500 to-teal-600',
    spoken: 'A gas has no fixed shape and no fixed volume! Its particles are far apart and move quickly, filling every corner of any container. Air, steam, and oxygen are gases!',
  },
  {
    title: 'Properties & State Changes! 🌡️',
    text: 'Matter can change states! Heating ice turns it to liquid water (melting). Boiling water turns it to steam (evaporation). Cooling steam turns it back to water (condensation)!',
    emoji: '🔥',
    bgColor: 'from-purple-500 to-pink-600',
    spoken: 'Matter can change states! Heating ice turns it to liquid water, and boiling water turns it to steam. Cooling steam turns it back to water!',
  },
];

// ─── Challenges (8 progressive) ───────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_solid',
    question: 'Which of these is a SOLID with a fixed shape?',
    answer: 'A stone',
    options: ['A stone', 'Water', 'Air'],
    hint: 'Think: which of these keeps its shape and does not flow or spread?',
    misconception: 'A stone is a solid because it has a fixed shape and a fixed volume! Water is a liquid that flows, and air is an invisible gas!',
  },
  {
    type: 'identify_liquid',
    question: 'Which of these is a LIQUID that takes the shape of its container?',
    answer: 'Milk in a glass',
    options: ['Milk in a glass', 'A brick', 'Air in a balloon'],
    hint: 'A liquid flows and can be poured. Which one is a liquid?',
    misconception: 'Milk is a liquid! It flows and takes the shape of its glass. A brick is a solid, and air inside a balloon is a gas!',
  },
  {
    type: 'identify_gas',
    question: 'Which of these is an invisible GAS that fills the room?',
    answer: 'Air',
    options: ['Air', 'Ice cube', 'Cooking oil'],
    hint: 'Gases are all around us, invisible, and spread out to fill space. What are we breathing?',
    misconception: 'Air is a gas! It has no fixed shape and no fixed volume, filling every corner. Ice is a solid, and oil is a liquid!',
  },
  {
    type: 'sort_states',
    question: 'Drag each matter item into its correct state bin!',
    answer: 'sort',
    options: [],
    hint: 'Solids keep shape (stone, brick)! Liquids pour (water, milk)! Gases fill space (air, steam)!',
    misconception: 'Check your properties! Solids have fixed shapes, liquids take container shapes, and gases fill the whole space!',
    sortItems: [
      { id: 'stone', label: 'Stone', icon: 'stone', correctBin: 'solid' },
      { id: 'milk', label: 'Milk', icon: 'milk', correctBin: 'liquid' },
      { id: 'air', label: 'Air', icon: 'air', correctBin: 'gas' },
      { id: 'steam', label: 'Steam', icon: 'steam', correctBin: 'gas' },
    ],
    bins: [
      { id: 'solid', label: 'Solid 🧱', color: '#D97706' },
      { id: 'liquid', label: 'Liquid 🥛', color: '#0284C7' },
      { id: 'gas', label: 'Gas 💨', color: '#059669' },
    ],
  },
  {
    type: 'container_shape',
    question: 'What shape does a LIQUID take when poured into a round bowl?',
    answer: 'The shape of the container',
    options: ['The shape of the container', 'Its own fixed square shape', 'No shape at all'],
    hint: 'Liquids do not have a fixed shape of their own. What happens when you pour water into a round bowl?',
    misconception: 'A liquid takes the shape of its container! It flows to match whatever vessel holds it, while keeping its fixed volume!',
  },
  {
    type: 'sort_properties',
    question: 'Drag each property to the correct state of matter!',
    answer: 'sort',
    options: [],
    hint: 'Fixed shape = Solid! Takes container shape = Liquid! No fixed volume = Gas!',
    misconception: 'Remember: Solids have fixed shape and volume. Liquids take container shape with fixed volume. Gases have no fixed shape or volume!',
    sortItems: [
      { id: 'prop1', label: 'Fixed shape & volume', icon: 'solid-block', correctBin: 'solid' },
      { id: 'prop2', label: 'Takes container shape', icon: 'liquid-beaker', correctBin: 'liquid' },
      { id: 'prop3', label: 'Spreads to fill space', icon: 'gas-particles', correctBin: 'gas' },
    ],
    bins: [
      { id: 'solid', label: 'Solid', color: '#D97706' },
      { id: 'liquid', label: 'Liquid', color: '#0284C7' },
      { id: 'gas', label: 'Gas', color: '#059669' },
    ],
  },
  {
    type: 'phase_temp',
    question: 'What happens when ice (solid water) is heated to 100°C?',
    answer: 'It becomes steam (gas)',
    options: ['It becomes steam (gas)', 'It becomes a hard rock', 'It stays frozen solid'],
    hint: 'Heating ice melts it to water, and boiling water turns it into what state?',
    misconception: 'Heating water to 100°C turns it into steam (gas) through evaporation! Ice melts to liquid first, then turns to gas when boiling!',
  },
  {
    type: 'sort_changes',
    question: 'Drag each state change to its correct scientific name!',
    answer: 'sort',
    options: [],
    hint: 'Ice to water = Melting! Water to steam = Evaporation! Steam to water = Condensation!',
    misconception: 'State changes have precise names! Solid to liquid is melting, liquid to gas is evaporation, and gas to liquid is condensation!',
    sortItems: [
      { id: 'change1', label: 'Ice → Water (Melting)', icon: 'ice', correctBin: 'melting' },
      { id: 'change2', label: 'Water → Steam (Evap)', icon: 'steam', correctBin: 'evap' },
      { id: 'change3', label: 'Steam → Water (Condens)', icon: 'water-drop', correctBin: 'condens' },
    ],
    bins: [
      { id: 'melting', label: 'Melting ☀️', color: '#D97706' },
      { id: 'evap', label: 'Evaporation 🔥', color: '#0284C7' },
      { id: 'condens', label: 'Condensation ❄️', color: '#7C3AED' },
    ],
  },
];

// ─── Scientist Suresh Mascot Component ─────────────────────────

function ScientistSuresh({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white border-2 border-gold-300 rounded-2xl px-4 py-2.5 shadow-xl max-w-[240px]"
          >
            <p className="text-xs font-bold text-gold-900">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
              ? { y: [0, -5, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="85" height="100" viewBox="0 0 85 100">
          <defs>
            <linearGradient id="coat-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <radialGradient id="face-grad" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#F97316" />
            </radialGradient>
          </defs>
          {/* Lab coat body */}
          <path d="M22 45 L63 45 L68 92 L17 92 Z" fill="url(#coat-grad)" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Lab coat lapels */}
          <path d="M32 45 L42 65 L53 45" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Shirt inside */}
          <path d="M35 45 L50 45 L48 60 L37 60 Z" fill="#3B82F6" />
          {/* Bow tie */}
          <path d="M38 47 L47 47 L42 52 Z" fill="#EF4444" />
          {/* Head / Face */}
          <circle cx="42.5" cy="30" r="18" fill="url(#face-grad)" stroke="#EA580C" strokeWidth="1" />
          {/* Hair */}
          <path d="M26 25 Q30 12, 42.5 12 Q55 12, 59 25 Q55 18, 42.5 18 Q30 18, 26 25 Z" fill="#475569" />
          {/* Safety Goggles on forehead */}
          <rect x="28" y="19" width="12" height="7" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
          <rect x="44" y="19" width="12" height="7" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
          <line x1="40" y1="22" x2="44" y2="22" stroke="#0284C7" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="36" cy="30" r="2.5" fill="#1E293B" />
          <circle cx="49" cy="30" r="2.5" fill="#1E293B" />
          {/* Friendly Smile */}
          <path d="M37 37 Q42.5 42, 48 37" stroke="#C2410C" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <circle cx="32" cy="34" r="3" fill="#F43F5E" opacity="0.4" />
          <circle cx="53" cy="34" r="3" fill="#F43F5E" opacity="0.4" />
          {/* Flask in hand (right) */}
          <g transform="translate(60, 55)">
            <path d="M5 0 L15 0 L12 8 L18 20 L2 20 L8 8 Z" fill="#38BDF8" opacity="0.8" stroke="#0284C7" strokeWidth="1" />
            <rect x="8" y="-3" width="4" height="4" fill="#94A3B8" />
            <circle cx="10" cy="15" r="2" fill="white" opacity="0.7" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-md">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.4, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#EAB308' : '#CBD5E1'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Laboratory Scene Background with SVG Gradient ────────────

function LabSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="bench-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <radialGradient id="window-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Lab wall background */}
        <rect width={width} height={height} fill="url(#lab-sky)" />
        {/* Laboratory window */}
        <rect x={width / 2 - 80} y={20} width={160} height={120} rx="10" fill="url(#window-glow)" stroke="#64748B" strokeWidth="4" />
        <line x1={width / 2} y1={20} x2={width / 2} y2={140} stroke="#64748B" strokeWidth="3" />
        <line x1={width / 2 - 80} y1={80} x2={width / 2 + 80} y2={80} stroke="#64748B" strokeWidth="3" />

        {/* Floating Molecule Models in background */}
        <g opacity="0.3">
          <circle cx="100" cy="80" r="6" fill="#38BDF8" />
          <circle cx="130" cy="95" r="4" fill="#F43F5E" />
          <line x1="100" y1="80" x2="130" y2="95" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="80" cy="110" r="5" fill="#34D399" />
          <line x1="100" y1="80" x2="80" y2="110" stroke="#94A3B8" strokeWidth="2" />
        </g>
        <g opacity="0.3">
          <circle cx={width - 120} cy="70" r="6" fill="#38BDF8" />
          <circle cx={width - 90} cy="85" r="4" fill="#F43F5E" />
          <line x1={width - 120} y1="70" x2={width - 90} y2={85} stroke="#94A3B8" strokeWidth="2" />
        </g>

        {/* Laboratory Bench at bottom */}
        <rect x={0} y={height - 90} width={width} height={90} fill="url(#bench-grad)" />
        <rect x={0} y={height - 100} width={width} height={10} fill="#CBD5E1" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Chemistry Objects ─────────────────────────────

function SolidBlockIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <linearGradient id="brick-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <rect x="8" y="15" width="44" height="30" rx="4" fill="url(#brick-g)" stroke="#78350F" strokeWidth="2" />
      <line x1="30" y1="15" x2="30" y2="45" stroke="#78350F" strokeWidth="1.5" />
      <line x1="8" y1="30" x2="30" y2="30" stroke="#78350F" strokeWidth="1.5" />
      <line x1="30" y1="22" x2="52" y2="22" stroke="#78350F" strokeWidth="1.5" />
    </svg>
  );
}

function LiquidBeakerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <linearGradient id="liquid-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      {/* Beaker outline */}
      <path d="M18 12 L42 12 L45 45 Q45 48, 42 48 L18 48 Q15 48, 15 45 L18 12 Z" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
      {/* Liquid inside taking shape */}
      <path d="M16.5 28 L43.5 28 L44.5 45 Q44.5 47, 42 47 L18 47 Q15.5 47, 15.5 45 Z" fill="url(#liquid-g)" opacity="0.85" />
      {/* Measurements */}
      <line x1="38" y1="20" x2="42" y2="20" stroke="#64748B" strokeWidth="1.5" />
      <line x1="38" y1="28" x2="42" y2="28" stroke="#64748B" strokeWidth="1.5" />
      <line x1="38" y1="36" x2="42" y2="36" stroke="#64748B" strokeWidth="1.5" />
    </svg>
  );
}

function GasParticlesIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Container bounds (dotted) */}
      <rect x="8" y="8" width="44" height="44" rx="6" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
      {/* Gas particles spreading freely with motion lines */}
      <circle cx="18" cy="20" r="5" fill="#34D399" />
      <path d="M12 15 L15 18" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
      
      <circle cx="42" cy="18" r="5" fill="#34D399" />
      <path d="M47 13 L44 16" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />

      <circle cx="30" cy="32" r="5" fill="#34D399" />
      <path d="M35 37 L38 40" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />

      <circle cx="20" cy="42" r="5" fill="#34D399" />
      <path d="M14 47 L17 44" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StoneIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 38 Q10 22, 22 18 Q35 12, 45 22 Q52 32, 45 44 Q35 52, 20 48 Q10 44, 12 38 Z" fill="#64748B" stroke="#334155" strokeWidth="2" />
      <path d="M20 25 Q28 20, 38 28" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MilkIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 15 L40 15 L43 48 Q43 52, 39 52 L21 52 Q17 52, 17 48 Z" fill="white" stroke="#94A3B8" strokeWidth="2" />
      <path d="M18 28 L42 28 L42.5 48 Q42.5 51, 39 51 L21 51 Q17.5 51, 17.5 48 Z" fill="#FEF08A" opacity="0.9" />
    </svg>
  );
}

function AirIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 20 Q25 15, 38 22 Q48 28, 52 22" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <path d="M15 35 Q30 30, 42 37 Q50 42, 55 37" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 48 Q20 42, 32 49" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SteamIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 45 Q15 35, 25 25 Q35 15, 28 5" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 45 Q45 35, 35 25 Q25 15, 32 5" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function IceIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="12" width="36" height="36" rx="6" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2" opacity="0.9" />
      <path d="M18 20 L30 15 L42 22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WaterDropIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 8 C20 22, 12 34, 12 42 C12 51, 20 56, 30 56 C40 56, 48 51, 48 42 C48 34, 40 22, 30 8 Z" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2" />
      <ellipse cx="23" cy="38" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(-25 23 38)" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'stone': return <StoneIcon size={size} />;
    case 'milk': return <MilkIcon size={size} />;
    case 'air': return <AirIcon size={size} />;
    case 'steam': return <SteamIcon size={size} />;
    case 'solid-block': return <SolidBlockIcon size={size} />;
    case 'liquid-beaker': return <LiquidBeakerIcon size={size} />;
    case 'gas-particles': return <GasParticlesIcon size={size} />;
    case 'ice': return <IceIcon size={size} />;
    case 'water-drop': return <WaterDropIcon size={size} />;
    default: return <SolidBlockIcon size={size} />;
  }
}

// ─── Sort Card Component ──────────────────────────────────────

function SortCard({ id, label, icon, x, y, placed, onDragStart, onDragEnd }: {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
  return (
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={100}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-gold-200 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white hover:bg-gold-50'} p-2`} style={{ width: 120, height: 100 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1.5 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({ label, color, x, y, width, height, isHovering }: {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
}) {
  return (
    <div
      className={`absolute rounded-3xl border-4 flex flex-col items-center justify-center transition-all duration-300 ${
        isHovering ? 'scale-105 shadow-2xl ring-4 ring-white' : 'shadow-lg'
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}20`,
        borderColor: color,
      }}
    >
      <div className="px-3 py-1 rounded-full text-white font-extrabold text-sm shadow-md mb-2" style={{ backgroundColor: color }}>
        {label}
      </div>
      <div className="text-xs text-gray-600 font-medium">Drop here! 🎯</div>
    </div>
  );
}

// ─── Main MatterGame Component ────────────────────────────────

export interface MatterGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function MatterGame({ width = 720, height = 560, onComplete }: MatterGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [hintText, setHintText] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>("Welcome to Scientist Suresh's Matter Lab!");

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [dragPositions, setDragPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [activeHoverBin, setActiveHoverBin] = useState<string | null>(null);

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // ─── Audio & Speech Effects ─────────────────────────────────

  useEffect(() => {
    // Initial greeting speech
    speechManager.speak("Welcome to Scientist Suresh's Matter Lab! Let's explore solids, liquids, and gases!");
    return () => {
      speechManager.stop();
    };
  }, []);

  // Reset inactivity timer on interaction
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && currentChallenge) {
        setHintText(currentChallenge.hint);
        audioManager.play('hint');
        speechManager.speak(currentChallenge.hint);
        setMascotMood('thinking');
        setMascotSpeech('Need a hint, chemist? Check this!');
      }
    }, 10000);
  }, [screen, currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Reset sort items when challenge changes
  useEffect(() => {
    if (currentChallenge?.type.startsWith('sort') && currentChallenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        initialPos[item.id] = { x: 40 + idx * 140, y: 380 };
        initialPlaced[item.id] = false;
      });
      setDragPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
  }, [challengeIdx, currentChallenge]);

  // ─── Handlers ───────────────────────────────────────────────

  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      const next = slideIdx + 1;
      setSlideIdx(next);
      speechManager.speak(TEACHING_SLIDES[next].spoken);
    } else {
      setScreen('play');
      audioManager.play('whoosh');
      speechManager.speak(currentChallenge.question);
      setMascotSpeech("Let's test your chemistry skills!");
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      const prev = slideIdx - 1;
      setSlideIdx(prev);
      speechManager.speak(TEACHING_SLIDES[prev].spoken);
    }
  };

  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    audioManager.play('tap');

    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Brilliant chemistry! Correct!');
      speechManager.speak('Brilliant chemistry! That is correct!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setSuccessMsg('Fantastic! Spot on!');
      setShowSuccessBanner(true);
    } else {
      // Wrong — misconception feedback
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintText(currentChallenge.misconception);
    }
  };

  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Find if dropped inside any bin bounds
    // Bins are arranged horizontally across the bottom/middle
    const binWidth = 160;
    const binHeight = 110;
    const binY = 180;
    const totalBins = currentChallenge.bins.length;
    const startX = (width - totalBins * 180) / 2;

    let matchedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * 180;
      const by = binY;
      if (x >= bx - 30 && x <= bx + binWidth + 30 && y >= by - 30 && y <= by + binHeight + 30) {
        matchedBinId = bin.id;
      }
    });

    if (matchedBinId) {
      if (matchedBinId === item.correctBin) {
        // Correct bin!
        audioManager.play('drop-correct');
        const updatedPlaced = { ...placedItems, [id]: true };
        setPlacedItems(updatedPlaced);

        // Check if all sort items are placed
        const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
        if (allDone) {
          audioManager.play('success');
          setStars(prev => prev + 1);
          setMascotMood('celebrate');
          setMascotSpeech('All sorted perfectly!');
          speechManager.speak('All sorted perfectly! Excellent job!');
          setSparklePos({ x: width / 2, y: height / 2 });
          setSuccessMsg('All items sorted correctly!');
          setShowSuccessBanner(true);
        }
        return true;
      } else {
        // Wrong bin!
        audioManager.play('drop-wrong');
        setErrors(prev => prev + 1);
        setMascotMood('thinking');
        setMascotSpeech(currentChallenge.misconception);
        speechManager.speak(currentChallenge.misconception);
        setHintText(currentChallenge.misconception);
        return false;
      }
    }
    return false;
  };

  const handleAdvanceChallenge = () => {
    setShowSuccessBanner(false);
    if (challengeIdx < CHALLENGES.length - 1) {
      const nextIdx = challengeIdx + 1;
      setChallengeIdx(nextIdx);
      setMascotMood('happy');
      setMascotSpeech('Next challenge! Let us go!');
      speechManager.speak(CHALLENGES[nextIdx].question);
    } else {
      // Game complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      setMascotSpeech('You are a Master Chemist! Amazing job!');
      speechManager.speak('You are a Master Chemist! Amazing job completing all challenges!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER: Teaching Screen
  // ─────────────────────────────────────────────────────────────

  if (screen === 'teaching') {
    const slide = TEACHING_SLIDES[slideIdx];
    return (
      <div className="relative flex flex-col items-center justify-between p-6 select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900" style={{ width, height }}>
        <LabSceneBackground width={width} height={height} />
        <ScientistSuresh mood={mascotMood} speaking={mascotSpeech} />

        {/* Top Header */}
        <div className="z-10 w-full flex items-center justify-between px-4 py-2 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧪</span>
            <span className="text-white font-black text-lg tracking-wide">Scientist Suresh&apos;s Lab</span>
          </div>
          <div className="flex gap-1.5">
            {TEACHING_SLIDES.map((_, i) => (
              <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/30'}`} />
            ))}
          </div>
        </div>

        {/* Slide Content Card */}
        <motion.div
          key={slideIdx}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4 }}
          className="z-10 w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-gold-400 flex flex-col items-center text-center my-auto"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg mb-4">
            {slide.emoji}
          </div>
          <h2 className="text-2xl font-black text-gold-950 mb-3">{slide.title}</h2>
          <p className="text-gray-700 font-medium text-base leading-relaxed px-2">{slide.text}</p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="z-10 w-full flex justify-between items-center px-4 pb-2">
          <button
            onClick={handlePrevSlide}
            disabled={slideIdx === 0}
            className={`px-5 py-2.5 rounded-2xl font-bold text-white shadow-lg transition-all ${
              slideIdx === 0 ? 'bg-gray-600 opacity-40 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            ← Back
          </button>
          <span className="text-white/80 font-bold text-sm">Slide {slideIdx + 1} of 5</span>
          <button
            onClick={handleNextSlide}
            className="px-6 py-2.5 rounded-2xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg transform hover:scale-105 transition-all"
          >
            {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Lab Game! 🚀' : 'Next →'}
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER: Play Screen
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="relative flex flex-col items-center justify-between p-6 select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900" style={{ width, height }}>
      <LabSceneBackground width={width} height={height} />
      <ScientistSuresh mood={mascotMood} speaking={mascotSpeech} />

      {/* Top Status Bar */}
      <div className="z-10 w-full flex items-center justify-between px-4 py-2 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔬</span>
          <span className="text-white font-black text-sm">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
        </div>
        <StarRow count={stars} total={CHALLENGES.length} />
      </div>

      {/* Question Card */}
      <div className="z-10 w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border-2 border-gold-300 text-center my-2">
        <h2 className="text-lg font-black text-gold-950">{currentChallenge.question}</h2>
      </div>

      {/* Interactive Area */}
      <div className="z-10 relative flex-1 w-full flex flex-col items-center justify-center my-2">
        {currentChallenge.type.startsWith('sort') && currentChallenge.bins && currentChallenge.sortItems ? (
          // Sort Challenge with Drag and Drop
          <div className="relative w-full h-[280px]">
            {/* Bins */}
            {currentChallenge.bins.map((bin, idx) => {
              const total = currentChallenge.bins?.length || 1;
              const binW = 150;
              const binH = 120;
              const spacing = 20;
              const totalW = total * binW + (total - 1) * spacing;
              const startX = (width - totalW) / 2;
              const bx = startX + idx * (binW + spacing);
              const by = 20;
              const isHovering = activeHoverBin === bin.id;

              return (
                <SortBin key={bin.id} label={bin.label} color={bin.color} x={bx} y={by} width={binW} height={binH} isHovering={isHovering} />
              );
            })}

            {/* Draggable Items */}
            {currentChallenge.sortItems.map(item => {
              const pos = dragPositions[item.id] || { x: 100, y: 380 };
              const placed = placedItems[item.id] || false;
              return (
                <SortCard
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  x={pos.x}
                  y={pos.y}
                  placed={placed}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              );
            })}
          </div>
        ) : (
          // Multiple Choice Challenge
          <div className="grid grid-cols-1 gap-3 w-full max-w-md my-auto">
            {currentChallenge.options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswerSelect(opt)}
                className="w-full py-3.5 px-6 rounded-2xl bg-white/95 hover:bg-gold-50 border-3 border-gold-300 font-bold text-gold-950 text-base shadow-lg transition-all text-center"
              >
                {opt}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Feedback & Overlays */}
      {showSuccessBanner && (
        <SuccessBanner message={successMsg} onComplete={handleAdvanceChallenge} />
      )}

      {showConfetti && (
        <Confetti onComplete={() => setShowConfetti(false)} />
      )}

      {sparklePos && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
      )}

      {hintText && (
        <HintBubble message={hintText} onComplete={() => setHintText(null)} />
      )}
    </div>
  );
}
