'use client';

/**
 * SunEnergyGame — Learn about the Sun as a natural source of energy,
 * solar energy in daily life (solar cooker, solar cell, solar heater),
 * renewable vs. non-renewable sources, and energy conservation.
 *
 * CISCE Nodes: c3_phy_003, c3_phy_004, c3_phy_005, c3_phy_006
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: 'The Sun: Natural Source of Energy ☀️',
    text: 'The sun is a natural source of energy — a huge glowing ball that gives us light and heat! Without the sun, our world would be dark and freezing cold.',
    emoji: '☀️',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'The sun is a natural source of energy, giving us light and heat! Without the sun, our world would be dark and freezing cold.',
  },
  {
    title: 'Solar Energy in Daily Life 🔋',
    text: 'We capture the sun\'s power using solar devices! Solar panels turn sunlight into electricity. Solar cookers cook food without fire. Solar heaters warm our water!',
    emoji: '🍳',
    bgColor: 'from-yellow-400 to-amber-500',
    spoken: 'We capture the sun power using solar devices! Solar panels turn sunlight into electricity. Solar cookers cook food, and solar heaters warm water!',
  },
  {
    title: 'Renewable Energy Sources 🌬️',
    text: 'Renewable energy sources never run out and come from nature! Sunlight, wind, flowing water, and biomass can be used again and again because nature replaces them quickly.',
    emoji: '🌱',
    bgColor: 'from-emerald-400 to-green-500',
    spoken: 'Renewable energy sources never run out and come from nature! Sunlight, wind, water, and biomass can be used again and again.',
  },
  {
    title: 'Non-Renewable Energy Sources 🪨',
    text: 'Coal, petroleum, and natural gas are non-renewable! They formed millions of years ago from ancient buried plants and animals. Once used up, they are gone forever.',
    emoji: '⛏️',
    bgColor: 'from-stone-500 to-neutral-700',
    spoken: 'Coal, petroleum, and natural gas are non-renewable! They formed millions of years ago and once used up, they are gone forever.',
  },
  {
    title: 'Conservation of Energy 💡',
    text: 'Conserve energy by switching off lights and fans when leaving a room! Saving electricity saves coal and gas at power stations, reduces pollution, and protects our Earth.',
    emoji: '💡',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'Conserve energy by switching off lights and fans when leaving a room! Saving electricity protects our Earth and reduces pollution.',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';

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

// ─── Challenges (8 progressive: identify → sort → apply) ──────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What is the SUN\'s main role for Earth?',
    answer: 'It gives light and heat energy',
    options: [
      'It gives light and heat energy',
      'It provides fresh drinking water directly',
      'It creates artificial electricity with switches',
    ],
    hint: 'Think about what you feel when you stand in the morning sun: warmth and brightness!',
    misconception: 'The sun gives us light and heat, which are forms of energy! Sunshine is not just brightness — it is natural energy that warms our skin and helps plants grow.',
  },
  {
    type: 'identify',
    question: 'What does a SOLAR PANEL do?',
    answer: 'Converts sunlight into electricity',
    options: [
      'Converts sunlight into electricity',
      'Cooks rice using a curved mirror',
      'Heats water in rooftop pipes',
    ],
    hint: 'A solar panel is a flat board made of solar cells that makes power for homes and streetlights!',
    misconception: 'A solar cell/panel converts sunlight directly into electricity to run lights and fans! Cooking food is done by a solar cooker, and heating water is done by a solar heater.',
  },
  {
    type: 'sort',
    question: 'Drag each solar device to its correct daily life use!',
    answer: 'sort',
    options: [],
    hint: 'Solar panel = electricity, Solar cooker = cooks food, Solar heater = heats water, Solar cell = stores energy!',
    misconception: 'Each solar device has a special job! Cookers cook food with heat, panels make electricity, heaters warm water, and cells store solar power in batteries.',
    sortItems: [
      { id: 'dev-panel', label: 'Solar Panel', icon: 'solar-panel', correctBin: 'bin-elec' },
      { id: 'dev-cooker', label: 'Solar Cooker', icon: 'solar-cooker', correctBin: 'bin-cook' },
      { id: 'dev-heater', label: 'Solar Heater', icon: 'solar-heater', correctBin: 'bin-heat' },
      { id: 'dev-cell', label: 'Solar Cell', icon: 'sun-icon', correctBin: 'bin-store' },
    ],
    bins: [
      { id: 'bin-elec', label: 'Makes Electricity ⚡', color: '#3B82F6' },
      { id: 'bin-cook', label: 'Cooks Food 🍳', color: '#F59E0B' },
      { id: 'bin-heat', label: 'Heats Water 💧', color: '#EF4444' },
      { id: 'bin-store', label: 'Stores Energy 🔋', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is a RENEWABLE source of energy?',
    answer: 'Sunlight',
    options: ['Sunlight', 'Coal', 'Petrol'],
    hint: 'Renewable means nature replaces it quickly and it never runs out. Which one is an endless gift from the sky?',
    misconception: 'Sunlight is renewable because the sun rises every day and never runs out! Coal and petrol are non-renewable because they take millions of years to form and will one day be finished.',
  },
  {
    type: 'sort',
    question: 'Drag each energy source to Renewable or Non-Renewable!',
    answer: 'sort',
    options: [],
    hint: 'Sun, wind, water = renewable (never run out)! Coal, petrol, gas = non-renewable (take millions of years to form)!',
    misconception: 'Remember the test: can nature replace it quickly? Sun, wind, and water are replaced by nature immediately, while coal and petroleum take millions of years underground.',
    sortItems: [
      { id: 'src-sun', label: 'Sunlight', icon: 'sun-icon', correctBin: 'bin-renewable' },
      { id: 'src-wind', label: 'Wind', icon: 'wind-turbine', correctBin: 'bin-renewable' },
      { id: 'src-coal', label: 'Coal', icon: 'coal', correctBin: 'bin-nonrenewable' },
      { id: 'src-petrol', label: 'Petrol', icon: 'petrol', correctBin: 'bin-nonrenewable' },
    ],
    bins: [
      { id: 'bin-renewable', label: 'Renewable 🌿', color: '#22C55E' },
      { id: 'bin-nonrenewable', label: 'Non-Renewable 🪨', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Why are coal and petroleum called NON-RENEWABLE?',
    answer: 'They take millions of years to form and will run out',
    options: [
      'They take millions of years to form and will run out',
      'They are made by machines in factories every day',
      'They give too much clean oxygen to the air',
    ],
    hint: 'Think about how long they took to form deep inside the Earth from ancient buried plants and animals.',
    misconception: 'Coal and petrol are non-renewable because they took millions of years to form under pressure and we are using them much faster than they can ever be replaced!',
  },
  {
    type: 'sort',
    question: 'Drag each action to Save Energy or Waste Energy!',
    answer: 'sort',
    options: [],
    hint: 'Turning off lights and walking = save energy! Leaving lights on and empty rooms running = waste energy!',
    misconception: 'Energy conservation means using power wisely! Switching off lights and fans saves electricity, which saves coal at power stations and keeps our air clean.',
    sortItems: [
      { id: 'act-off', label: 'Switch off lights', icon: 'switch-off', correctBin: 'bin-save' },
      { id: 'act-walk', label: 'Walk short distances', icon: 'light-bulb', correctBin: 'bin-save' },
      { id: 'act-on', label: 'Leave lights on', icon: 'light-bulb', correctBin: 'bin-waste' },
      { id: 'act-ac', label: 'Keep AC on empty room', icon: 'fan', correctBin: 'bin-waste' },
    ],
    bins: [
      { id: 'bin-save', label: 'Save Energy ✅', color: '#22C55E' },
      { id: 'bin-waste', label: 'Waste Energy ⚠️', color: '#EF4444' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each energy fact to True or False!',
    answer: 'sort',
    options: [],
    hint: 'Sun is renewable and free = True! Coal will last forever = False!',
    misconception: 'The sun will shine for billions of years, making solar energy clean and free! But coal and petroleum are limited, so we must conserve energy carefully.',
    sortItems: [
      { id: 'fact-sun', label: 'Sun is renewable', icon: 'sun-icon', correctBin: 'bin-true' },
      { id: 'fact-coal', label: 'Coal lasts forever', icon: 'coal', correctBin: 'bin-false' },
    ],
    bins: [
      { id: 'bin-true', label: 'True ✅', color: '#22C55E' },
      { id: 'bin-false', label: 'False ❌', color: '#EF4444' },
    ],
  },
];

// ─── Solar Engineer Mascot: Sana ──────────────────────────────

function SanaMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-300"
          >
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
              ? { y: [0, -4, 0] }
              : { rotate: [0, 5, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          {/* Hard hat */}
          <path d="M22 25 Q37 10 52 25 L55 30 L20 30 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <rect x="18" y="28" width="38" height="4" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
          {/* Face */}
          <circle cx="37" cy="42" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="32" cy="40" r="2" fill="#1E3A8A" />
          <circle cx="42" cy="40" r="2" fill="#1E3A8A" />
          {/* Smile */}
          <path d="M33 47 Q37 51 41 47" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Sun badge on shirt */}
          <circle cx="37" cy="68" r="6" fill="#F59E0B" />
          <circle cx="37" cy="68" r="3" fill="#FEF3C7" />
          {/* Lab coat / Shirt */}
          <path d="M25 56 L37 60 L49 56 L52 82 L22 82 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
          {/* Wrench in hand */}
          <path d="M12 55 L20 62 L18 64 L10 57 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          <circle cx="10" cy="56" r="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          {/* Feet */}
          <ellipse cx="30" cy="86" rx="5" ry="3" fill="#1E293B" />
          <ellipse cx="44" cy="86" rx="5" ry="3" fill="#1E293B" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Custom SVG Scene Background ──────────────────────────────

function SolarSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="40%" stopColor="#7DD3FC" />
            <stop offset="70%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#skyGrad)" />
        {/* Ground */}
        <rect x="0" y={height - 110} width={width} height="110" fill="url(#groundGrad)" />
      </svg>

      {/* Bright Sun */}
      <motion.div className="absolute top-6 left-8" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="65" height="65" viewBox="0 0 65 65">
          <circle cx="32" cy="32" r="20" fill="#FBBF24" opacity="0.9" />
          <circle cx="32" cy="32" r="14" fill="#F59E0B" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="32" y1="32" x2={32 + 28 * Math.cos(angle * Math.PI / 180)} y2={32 + 28 * Math.sin(angle * Math.PI / 180)} stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          ))}
        </svg>
      </motion.div>

      {/* Wind Turbine in background */}
      <div className="absolute bottom-24 right-16 opacity-75">
        <svg width="50" height="90" viewBox="0 0 50 90">
          <line x1="25" y1="30" x2="25" y2="90" stroke="#94A3B8" strokeWidth="3" />
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '25px 30px' }}>
            <line x1="25" y1="30" x2="25" y2="5" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
            <line x1="25" y1="30" x2="5" y2="45" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
            <line x1="25" y1="30" x2="45" y2="45" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
            <circle cx="25" cy="30" r="3" stroke="#64748B" strokeWidth="1" fill="#CBD5E1" />
          </motion.g>
        </svg>
      </div>

      {/* Rooftop Solar Panels */}
      <div className="absolute bottom-20 left-12 opacity-80">
        <svg width="70" height="50" viewBox="0 0 70 50">
          <polygon points="10,25 35,10 60,25" fill="#EF4444" />
          <rect x="22" y="22" width="26" height="15" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" rx="1" />
          <line x1="35" y1="22" x2="35" y2="37" stroke="#38BDF8" strokeWidth="1" />
          <line x1="22" y1="29" x2="48" y2="29" stroke="#38BDF8" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom SVG Interactive Objects (Rules Check 2) ──────���────

function SunIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="14" fill="#FBBF24" />
      <circle cx="25" cy="25" r="10" fill="#F59E0B" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line key={angle} x1="25" y1="25" x2={25 + 20 * Math.cos(angle * Math.PI / 180)} y2={25 + 20 * Math.sin(angle * Math.PI / 180)} stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function SolarPanelIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="10" width="40" height="26" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" rx="2" />
      <line x1="25" y1="10" x2="25" y2="36" stroke="#38BDF8" strokeWidth="1.5" />
      <line x1="5" y1="23" x2="45" y2="23" stroke="#38BDF8" strokeWidth="1.5" />
      <line x1="25" y1="36" x2="25" y2="44" stroke="#64748B" strokeWidth="3" />
      <line x1="15" y1="44" x2="35" y2="44" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SolarCookerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      {/* Curved dish */}
      <path d="M10 20 Q25 42 40 20 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
      {/* Pot in center */}
      <rect x="20" y="16" width="10" height="8" fill="#334155" rx="1" />
      <path d="M22 16 L28 16" stroke="#F8FAFC" strokeWidth="1.5" />
      {/* Rays */}
      <line x1="12" y1="10" x2="20" y2="18" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="10" x2="30" y2="18" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SolarHeaterIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="15" width="34" height="22" fill="#1E293B" stroke="#EF4444" strokeWidth="2" rx="2" />
      <line x1="8" y1="22" x2="42" y2="22" stroke="#EF4444" strokeWidth="1" />
      <line x1="8" y1="29" x2="42" y2="29" stroke="#EF4444" strokeWidth="1" />
      {/* Tank on top */}
      <rect x="12" y="6" width="26" height="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" rx="2" />
    </svg>
  );
}

function WindTurbineIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <line x1="25" y1="20" x2="25" y2="46" stroke="#64748B" strokeWidth="3" />
      <circle cx="25" cy="20" r="3" fill="#475569" />
      <line x1="25" y1="20" x2="25" y2="5" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="20" x2="10" y2="28" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="20" x2="40" y2="28" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CoalIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M12 32 L18 18 L32 16 L40 28 L34 40 L16 38 Z" fill="#334155" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 25 L26 22 L28 30 Z" fill="#475569" />
    </svg>
  );
}

function PetrolIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="15" y="15" width="20" height="28" fill="#DC2626" stroke="#991B1B" strokeWidth="2" rx="3" />
      <rect x="20" y="8" width="10" height="7" fill="#B91C1C" rx="1" />
      <path d="M25 22 L25 32 M20 27 L30 27" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LightBulbIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 8 C16 8, 10 15, 10 22 C10 27, 14 31, 18 34 L18 38 L32 38 L32 34 C36 31, 40 27, 40 22 C40 15, 34 8, 25 8 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
      <rect x="20" y="38" width="10" height="5" fill="#94A3B8" />
    </svg>
  );
}

function FanIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="5" fill="#334155" />
      <ellipse cx="25" cy="12" rx="4" ry="10" fill="#38BDF8" />
      <ellipse cx="25" cy="38" rx="4" ry="10" fill="#38BDF8" />
      <ellipse cx="12" cy="25" rx="10" ry="4" fill="#38BDF8" />
      <ellipse cx="38" cy="25" rx="10" ry="4" fill="#38BDF8" />
    </svg>
  );
}

function SwitchOffIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="12" y="10" width="26" height="30" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" rx="4" />
      <circle cx="25" cy="25" r="8" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
      <line x1="25" y1="17" x2="25" y2="25" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'sun-icon': return <SunIcon size={size} />;
    case 'solar-panel': return <SolarPanelIcon size={size} />;
    case 'solar-cooker': return <SolarCookerIcon size={size} />;
    case 'solar-heater': return <SolarHeaterIcon size={size} />;
    case 'wind-turbine': return <WindTurbineIcon size={size} />;
    case 'coal': return <CoalIcon size={size} />;
    case 'petrol': return <PetrolIcon size={size} />;
    case 'light-bulb': return <LightBulbIcon size={size} />;
    case 'fan': return <FanIcon size={size} />;
    case 'switch-off': return <SwitchOffIcon size={size} />;
    default: return <SunIcon size={size} />;
  }
}

// ─── Sort Card Component ──────────────────────────────���───────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{ left: x, top: y, width, height, borderColor: color, backgroundColor: `${color}15` }}
    >
      <span className="text-xs font-black text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface SunEnergyGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function SunEnergyGame({ width = 720, height = 560, onComplete }: SunEnergyGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Sana the Solar Engineer! Let us explore the Sun and energy!');
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Sort state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});

  // Inactivity timer
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech narration
  useEffect(() => {
    if (screen === 'teaching') {
      speechManager.speak(TEACHING_SLIDES[slideIdx].spoken);
      setMascotSpeech(TEACHING_SLIDES[slideIdx].text);
    } else if (screen === 'play' && !gameOver) {
      speechManager.speak(currentChallenge.question);
      setMascotSpeech(currentChallenge.question);
    }
    return () => {
      speechManager.stop();
    };
  }, [screen, slideIdx, challengeIdx, gameOver, currentChallenge]);

  // Inactivity hint trigger
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play') {
        audioManager.play('hint');
        setShowHint(true);
        setMascotMood('thinking');
        speechManager.speak(currentChallenge.hint);
      }
    }, 10000);
  }, [currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Multiple choice answer check
  const handleSelectOption = (opt: string) => {
    if (feedback !== null) return;
    setSelectedOption(opt);
    resetInactivityTimer();

    if (opt === currentChallenge.answer) {
      setFeedback('correct');
      audioManager.play('success');
      speechManager.speak('Great job! That is correct!');
      setMascotSpeech('Fantastic! You got it right!');
      setMascotMood('celebrate');
      setScore(prev => prev + 15);
      setSparklePos({ x: width / 2, y: height / 2 });

      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
        setSparklePos(null);
        setMascotMood('happy');
        advanceChallenge();
      }, 1800);
    } else {
      setFeedback('incorrect');
      audioManager.play('error');
      setErrors(prev => prev + 1);
      speechManager.speak(currentChallenge.misconception);
      setMascotSpeech(currentChallenge.misconception);
      setMascotMood('thinking');

      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
        setMascotMood('happy');
      }, 2500);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Find bin coordinates
    const binWidth = 140;
    const binHeight = 110;
    const binY = height - 160;

    let targetBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 160;
      if (x >= binX - 20 && x <= binX + binWidth + 20 && y >= binY - 20 && y <= binY + binHeight + 20) {
        targetBinId = bin.id;
      }
    });

    if (targetBinId && targetBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updated = { ...placedItems, [id]: true };
      setPlacedItems(updated);

      // Check if all items placed
      const allDone = currentChallenge.sortItems?.every(i => updated[i.id]);
      if (allDone) {
        audioManager.play('success');
        speechManager.speak('Amazing sorting! All correct!');
        setMascotSpeech('Wonderful! You sorted everything correctly!');
        setMascotMood('celebrate');
        setShowConfetti(true);
        setScore(prev => prev + 20);

        setTimeout(() => {
          setShowConfetti(false);
          setPlacedItems({});
          setMascotMood('happy');
          advanceChallenge();
        }, 2200);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      speechManager.speak(currentChallenge.misconception);
      setMascotSpeech(currentChallenge.misconception);
      setMascotMood('thinking');
      setTimeout(() => setMascotMood('happy'), 2000);
      return false;
    }
  };

  const advanceChallenge = () => {
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
      setShowHint(false);
    } else {
      setGameOver(true);
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You are a certified Solar Energy Expert!');
      setMascotSpeech('You did it! You are a true Solar Engineer!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative overflow-hidden bg-sky-100 select-none flex flex-col items-center justify-between" style={{ width, height }}>
      {/* Background scene */}
      <SolarSceneBackground width={width} height={height} />

      {/* Mascot Sana */}
      <SanaMascot mood={mascotMood} speaking={mascotSpeech} />

      {/* Confetti & feedback overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showHint && (
        <HintBubble
          message={currentChallenge.hint}
          onComplete={() => {
            setShowHint(false);
            resetInactivityTimer();
          }}
        />
      )}

      {/* ─── TEACHING SCREEN ──────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full p-6">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-black text-amber-800 drop-shadow-sm">🌞 Sun & Energy Explorer</h1>
            <div className="flex gap-1.5">
              {TEACHING_SLIDES.map((_, idx) => (
                <div key={idx} className={`h-2.5 rounded-full transition-all ${idx === slideIdx ? 'w-8 bg-amber-600' : 'w-2.5 bg-amber-300'}`} />
              ))}
            </div>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl max-w-lg w-full text-center border-4 border-white/60`}
            style={{ minHeight: 280 }}
          >
            <span className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between w-full max-w-lg">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-2.5 rounded-2xl font-bold text-white shadow-md transition-all ${slideIdx === 0 ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 active:scale-95'}`}
            >
              Back
            </button>
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                }
              }}
              className="px-8 py-2.5 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg hover:from-emerald-600 hover:to-green-700 active:scale-95"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─────────────────────────────────── */}
      {screen === 'play' && !gameOver && (
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full p-6">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-amber-900 bg-amber-200/90 px-3 py-1 rounded-full shadow">
                Question {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <StarRow count={Math.floor(score / 15)} total={8} />
            </div>
            <button
              onClick={() => {
                audioManager.play('tap');
                setShowHint(true);
                speechManager.speak(currentChallenge.hint);
                setMascotSpeech(currentChallenge.hint);
                setMascotMood('thinking');
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3 py-1 rounded-xl shadow text-xs flex items-center gap-1 active:scale-95"
            >
              💡 Hint
            </button>
          </div>

          {/* Question Box */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-xl max-w-xl w-full border-2 border-amber-300 text-center my-2">
            <h2 className="text-lg font-black text-gray-800">{currentChallenge.question}</h2>
          </div>

          {/* Interactive Area: Multiple Choice OR Sort */}
          {currentChallenge.type === 'identify' && (
            <div className="flex flex-col gap-3 w-full max-w-md my-auto">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrectAnswer = opt === currentChallenge.answer;
                let btnStyle = 'bg-white hover:bg-amber-50 text-gray-800 border-amber-200';
                if (feedback !== null) {
                  if (isCorrectAnswer) btnStyle = 'bg-green-500 text-white border-green-600 scale-105';
                  else if (isSelected && !isCorrectAnswer) btnStyle = 'bg-red-500 text-white border-red-600';
                  else btnStyle = 'bg-gray-100 text-gray-400 opacity-50';
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: feedback === null ? 1.02 : 1 }}
                    whileTap={{ scale: feedback === null ? 0.98 : 1 }}
                    onClick={() => handleSelectOption(opt)}
                    disabled={feedback !== null}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md border-2 transition-all text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    <span className="text-xs font-normal opacity-60">#{idx + 1}</span>
                  </motion.button>
                );
              })}
            </div>
          )}

          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full max-w-xl" style={{ height: 260 }}>
              {/* Bins at bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-around">
                {currentChallenge.bins.map((bin, idx) => (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={20 + idx * 160}
                    y={120}
                    width={140}
                    height={110}
                    isHovering={false}
                  />
                ))}
              </div>

              {/* Draggable items at top */}
              <div className="absolute top-2 left-0 right-0 flex justify-around">
                {currentChallenge.sortItems.map((item, idx) => {
                  const placed = !!placedItems[item.id];
                  return (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={30 + idx * 155}
                      y={10}
                      placed={placed}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Feedback Banner */}
          <AnimatePresence>
            {feedback === 'correct' && <SuccessBanner message="Brilliant! That's correct! 🎉" onComplete={() => {}} />}
          </AnimatePresence>
        </div>
      )}

      {/* ─── GAME OVER SCREEN ────────────────────────────── */}
      {gameOver && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-md w-full border-4 border-amber-300 flex flex-col items-center"
          >
            <span className="text-6xl mb-3">🌟</span>
            <h2 className="text-3xl font-black text-amber-800 mb-2">Solar Master!</h2>
            <p className="text-gray-600 font-semibold mb-4">You completed all challenges and mastered solar energy!</p>
            <div className="bg-amber-100 rounded-2xl p-4 w-full mb-6">
              <p className="text-sm font-bold text-amber-900">Final Score: {Math.max(0, 100 - errors * 5)} / 100</p>
              <p className="text-xs text-amber-700 mt-1">Mistakes made: {errors}</p>
            </div>
            <button
              onClick={() => {
                audioManager.play('tap');
                setGameOver(false);
                setChallengeIdx(0);
                setScore(0);
                setErrors(0);
                setScreen('teaching');
                setSlideIdx(0);
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black px-8 py-3 rounded-2xl shadow-lg active:scale-95"
            >
              Play Again 🔄
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
