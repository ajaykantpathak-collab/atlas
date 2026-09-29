'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ─── Custom SVG Icon Components ──���──────────────────────────────

function LeverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Lever icon">
      <polygon points="30,35 20,50 40,50" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1.5" />
      <line x1="10" y1="35" x2="50" y2="35" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
      <circle cx="15" cy="27" r="6" fill="#EF4444" />
      <path d="M42 25 L48 20 L54 25 Z" fill="#3B82F6" />
    </svg>
  );
}

function PulleyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Pulley icon">
      <circle cx="30" cy="20" r="12" fill="none" stroke="#4B5563" strokeWidth="4" />
      <circle cx="30" cy="20" r="4" fill="#1F2937" />
      <path d="M18 20 L18 45" stroke="#374151" strokeWidth="2.5" strokeDasharray="3,3" />
      <path d="M42 20 L42 35" stroke="#374151" strokeWidth="2.5" strokeDasharray="3,3" />
      <rect x="36" y="35" width="12" height="10" rx="2" fill="#EF4444" />
    </svg>
  );
}

function ScrewIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Screw icon">
      <rect x="26" y="10" width="8" height="40" rx="2" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1.5" />
      <ellipse cx="30" cy="12" rx="12" ry="4" fill="#D1D5DB" stroke="#4B5563" strokeWidth="1.5" />
      <path d="M26 20 Q34 24, 26 28 Q34 32, 26 36 Q34 40, 26 44" fill="none" stroke="#4B5563" strokeWidth="2" />
    </svg>
  );
}

function WedgeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Wedge icon">
      <polygon points="10,45 50,30 10,15" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="6" y="27" width="8" height="6" fill="#78350F" rx="1" />
    </svg>
  );
}

function WheelAxleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Wheel and Axle icon">
      <circle cx="30" cy="30" r="18" fill="none" stroke="#374151" strokeWidth="4" />
      <circle cx="30" cy="30" r="6" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <line x1="30" y1="12" x2="30" y2="48" stroke="#4B5563" strokeWidth="2" />
      <line x1="12" y1="30" x2="48" y2="30" stroke="#4B5563" strokeWidth="2" />
    </svg>
  );
}

function InclinedPlaneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Inclined Plane icon">
      <polygon points="10,45 50,45 50,20" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1.5" />
      <rect x="20" y="25" width="10" height="10" rx="1" fill="#3B82F6" />
      <path d="M15 32 L22 28" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Class1LeverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Class 1 Lever icon">
      <polygon points="30,35 22,48 38,48" fill="#F59E0B" />
      <line x1="12" y1="35" x2="48" y2="35" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <circle cx="16" cy="27" r="5" fill="#EF4444" />
      <rect x="42" y="25" width="8" height="10" fill="#3B82F6" rx="1" />
    </svg>
  );
}

function Class2LeverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Class 2 Lever icon">
      <circle cx="12" cy="40" r="6" fill="#374151" />
      <line x1="12" y1="40" x2="48" y2="25" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <rect x="26" y="27" width="10" height="10" fill="#EF4444" rx="1" />
      <path d="M48 25 L52 20" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Class3LeverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Class 3 Lever icon">
      <circle cx="12" cy="40" r="6" fill="#374151" />
      <line x1="12" y1="40" x2="48" y2="25" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 33 L30 22" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <rect x="44" y="22" width="8" height="8" fill="#3B82F6" rx="1" />
    </svg>
  );
}

function ArmLeverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Human arm lever icon">
      <path d="M15 40 L35 40 L45 20" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="35" cy="40" r="5" fill="#EF4444" />
      <path d="M25 40 Q30 30, 35 35" stroke="#3B82F6" strokeWidth="4" fill="none" />
      <rect x="42" y="15" width="8" height="8" fill="#10B981" rx="1" />
    </svg>
  );
}

function WrenchIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Wrench icon">
      <path d="M15 45 L35 25 M32 18 Q38 12, 45 19 Q52 26, 46 32 L35 25" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="43" cy="22" r="3" fill="#F3F4F6" />
    </svg>
  );
}

function ToolboxIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-label="Toolbox icon">
      <rect x="12" y="24" width="36" height="24" rx="3" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      <path d="M22 24 L22 18 Q30 14, 38 18 L38 24" fill="none" stroke="#1F2937" strokeWidth="3" />
      <rect x="25" y="32" width="10" height="6" rx="1" fill="#F3F4F6" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'lever': return <LeverIcon size={size} />;
    case 'pulley': return <PulleyIcon size={size} />;
    case 'screw': return <ScrewIcon size={size} />;
    case 'wedge': return <WedgeIcon size={size} />;
    case 'wheel': return <WheelAxleIcon size={size} />;
    case 'ramp': return <InclinedPlaneIcon size={size} />;
    case 'class1': return <Class1LeverIcon size={size} />;
    case 'class2': return <Class2LeverIcon size={size} />;
    case 'class3': return <Class3LeverIcon size={size} />;
    case 'arm': return <ArmLeverIcon size={size} />;
    case 'wrench': return <WrenchIcon size={size} />;
    case 'toolbox': return <ToolboxIcon size={size} />;
    default: return <LeverIcon size={size} />;
  }
}

// ─── Mechanics Workshop Background ────────────────────────────

function WorkshopBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="workshop-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="workbench" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#workshop-sky)" />
        <rect y={height * 0.8} width={width} height={height * 0.2} fill="url(#workbench)" />
        {/* Workshop tool racks and gear outlines */}
        <circle cx="100" cy="70" r="35" fill="none" stroke="#475569" strokeWidth="5" strokeDasharray="10,6" opacity="0.4" />
        <circle cx={width - 90} cy="90" r="45" fill="none" stroke="#475569" strokeWidth="6" strokeDasharray="14,8" opacity="0.3" />
        <rect x="60" y={height * 0.8} width={width - 120} height="10" fill="#92400E" opacity="0.8" />
      </svg>
    </div>
  );
}

// ─── Mechanic Mira Mascot ─────────────────────────────────────

function MechanicMira({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-400"
          >
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
              ? { y: [0, -4, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="70" height="85" viewBox="0 0 70 85" aria-label="Mechanic Mira avatar">
          {/* Cap */}
          <path d="M22 24 Q35 12, 48 24 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
          <rect x="18" y="24" width="36" height="5" rx="2.5" fill="#B91C1C" />
          {/* Head & Face */}
          <circle cx="35" cy="40" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="30" cy="38" r="2" fill="#1F2937" />
          <circle cx="40" cy="38" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M31 45 Q35 49, 39 45" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Overalls */}
          <path d="M22 54 L35 50 L48 54 L52 75 L18 75 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
          {/* Wrench Badge */}
          <path d="M32 60 L38 66" stroke="#F3F4F6" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1" aria-label={`Score: ${count} of ${total} stars`}>
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

// ─── Teaching Slides ──────────────────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Why Do We Need Machines? 🛠️",
    text: "A machine helps us do work more easily by reducing the effort needed! It changes the size or direction of force so heavy tasks become simple.",
    emoji: "🛠️",
    bgColor: "from-gold-600 to-gold-700",
    spoken: "A machine helps us do work more easily by reducing the effort needed!",
  },
  {
    title: "Simple Machines ⚙️",
    text: "Simple machines are basic devices with few or no parts. The main types are levers, pulleys, screws, wedges, wheels and axles, and inclined planes!",
    emoji: "⚙️",
    bgColor: "from-amber-600 to-orange-700",
    spoken: "Simple machines include levers, pulleys, screws, wedges, wheels and axles, and inclined planes!",
  },
  {
    title: "Levers and Their Classes ⚖️",
    text: "A lever is a rigid bar that turns around a fixed point called the fulcrum. Levers have 3 classes depending on which part is in the middle: Fulcrum (Class 1), Load (Class 2), or Effort (Class 3).",
    emoji: "⚖️",
    bgColor: "from-emerald-600 to-teal-700",
    spoken: "Levers have three classes depending on whether the fulcrum, load, or effort is in the middle!",
  },
  {
    title: "Class I, II, and III Levers 🎚️",
    text: "Class 1: Fulcrum in middle (seesaw). Class 2: Load in middle (wheelbarrow). Class 3: Effort in middle (tongs). Remember F-L-E for the middle part!",
    emoji: "🎚️",
    bgColor: "from-purple-600 to-gold-800",
    spoken: "Class 1 has fulcrum in the middle, Class 2 has load in the middle, and Class 3 has effort in the middle!",
  },
  {
    title: "Levers in the Human Body 💪",
    text: "Your body is a natural machine! The elbow is a Class 3 lever where your bicep muscle provides effort between the joint and the hand load.",
    emoji: "💪",
    bgColor: "from-red-600 to-rose-700",
    spoken: "Your body is full of levers, like your elbow acting as a Class 3 lever!",
  },
];

// ─── Challenges Definition ────────────────────────────────────

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBin {
  id: string;
  label: string;
  color: string;
}

interface Challenge {
  type: ChallengeType;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  sortItems?: SortItem[];
  bins?: SortBin[];
}

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Why do we use machines in daily life?',
    answer: 'To make work easier and reduce effort',
    options: [
      'To make work easier and reduce effort',
      'To make work harder and heavier',
      'To increase the time taken for tasks',
      'To add more weight to every object',
    ],
    hint: 'Think about why a wheelbarrow or a pulley helps you move heavy things!',
    misconception: 'Machines do not eliminate work entirely, nor do they make tasks harder. They reduce the effort needed or change the direction of force!',
  },
  {
    type: 'sort',
    question: 'Drag each simple machine to its correct type!',
    answer: 'sort',
    options: [],
    hint: 'Seesaw = Lever, Flag rope = Pulley, Jar lid = Screw, Knife = Wedge, Door knob = Wheel & axle, Ramp = Inclined plane!',
    misconception: 'Make sure to match the working principle: screw has threads, wedge splits, pulley uses rope over a wheel!',
    sortItems: [
      { id: 's1', label: 'Seesaw', icon: 'lever', correctBin: 'bin-lever' },
      { id: 's2', label: 'Flag pole rope', icon: 'pulley', correctBin: 'bin-pulley' },
      { id: 's3', label: 'Jar lid', icon: 'screw', correctBin: 'bin-screw' },
      { id: 's4', label: 'Knife blade', icon: 'wedge', correctBin: 'bin-wedge' },
      { id: 's5', label: 'Doorknob', icon: 'wheel', correctBin: 'bin-wheel' },
      { id: 's6', label: 'Ramp', icon: 'ramp', correctBin: 'bin-ramp' },
    ],
    bins: [
      { id: 'bin-lever', label: 'Lever', color: '#3B82F6' },
      { id: 'bin-pulley', label: 'Pulley', color: '#10B981' },
      { id: 'bin-screw', label: 'Screw', color: '#F59E0B' },
      { id: 'bin-wedge', label: 'Wedge', color: '#EF4444' },
      { id: 'bin-wheel', label: 'Wheel & Axle', color: '#8B5CF6' },
      { id: 'bin-ramp', label: 'Inclined Plane', color: '#06B6D4' },
    ],
  },
  {
    type: 'identify',
    question: 'In a Class 1 lever, where is the fulcrum located?',
    answer: 'Between the load and the effort',
    options: [
      'Between the load and the effort',
      'At the far end near the load only',
      'At the far end near the effort only',
      'There is no fulcrum in a Class 1 lever',
    ],
    hint: 'Think of a seesaw where the pivot point is right in the middle!',
    misconception: 'In Class 1 levers (like scissors or seesaws), the fulcrum is always between the load and the effort.',
  },
  {
    type: 'sort',
    question: 'Drag each tool to its correct lever class!',
    answer: 'sort',
    options: [],
    hint: 'Seesaw & scissors = Class 1. Wheelbarrow & nutcracker = Class 2. Tweezers & fishing rod = Class 3!',
    misconception: 'Check what is in the middle: fulcrum = Class 1, load = Class 2, effort = Class 3!',
    sortItems: [
      { id: 'l1', label: 'Seesaw', icon: 'class1', correctBin: 'c1' },
      { id: 'l2', label: 'Scissors', icon: 'class1', correctBin: 'c1' },
      { id: 'l3', label: 'Wheelbarrow', icon: 'class2', correctBin: 'c2' },
      { id: 'l4', label: 'Nutcracker', icon: 'class2', correctBin: 'c2' },
      { id: 'l5', label: 'Tweezers', icon: 'class3', correctBin: 'c3' },
      { id: 'l6', label: 'Fishing rod', icon: 'class3', correctBin: 'c3' },
    ],
    bins: [
      { id: 'c1', label: 'Class 1 Lever', color: '#3B82F6' },
      { id: 'c2', label: 'Class 2 Lever', color: '#10B981' },
      { id: 'c3', label: 'Class 3 Lever', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify',
    question: 'Which lever class has the load between the fulcrum and the effort?',
    answer: 'Class 2',
    options: [
      'Class 2',
      'Class 1',
      'Class 3',
      'None of the above',
    ],
    hint: 'Think of a wheelbarrow where the wheel is the fulcrum at one end, handles are effort at the other, and soil is in the middle!',
    misconception: 'Class 2 levers have the load in the middle (e.g. wheelbarrow, nutcracker). Class 3 has the effort in the middle.',
  },
  {
    type: 'sort',
    question: 'Sort each lever characteristic to its correct lever class!',
    answer: 'sort',
    options: [],
    hint: 'Fulcrum in middle = Class 1. Load in middle = Class 2. Effort in middle = Class 3!',
    misconception: 'Remember F-L-E: Fulcrum middle is Class 1, Load middle is Class 2, Effort middle is Class 3!',
    sortItems: [
      { id: 'ch1', label: 'Fulcrum in middle', icon: 'class1', correctBin: 'bin-c1' },
      { id: 'ch2', label: 'Load in middle', icon: 'class2', correctBin: 'bin-c2' },
      { id: 'ch3', label: 'Effort in middle', icon: 'class3', correctBin: 'bin-c3' },
    ],
    bins: [
      { id: 'bin-c1', label: 'Class 1', color: '#3B82F6' },
      { id: 'bin-c2', label: 'Class 2', color: '#10B981' },
      { id: 'bin-c3', label: 'Class 3', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify',
    question: 'The human arm (bicep to forearm lifting a weight) is an example of which lever class?',
    answer: 'Class 3',
    options: [
      'Class 3',
      'Class 1',
      'Class 2',
      'Not a lever',
    ],
    hint: 'The elbow is the joint (fulcrum), the hand holding the weight is the load, and the bicep muscle pulls in between!',
    misconception: 'The human arm is a Class 3 lever because the effort supplied by the bicep muscle is applied between the elbow joint and the hand load.',
  },
  {
    type: 'sort',
    question: 'Drag each body part or action to its correct lever class!',
    answer: 'sort',
    options: [],
    hint: 'Arm elbow & jaw = Class 3. Foot standing on toes = Class 2. Neck tilting back = Class 1!',
    misconception: 'Analyze where the muscle pulls: the bicep in the arm and jaw muscles pull in the middle, making them Class 3 levers!',
    sortItems: [
      { id: 'b1', label: 'Arm lifting weight', icon: 'arm', correctBin: 'bc3' },
      { id: 'b2', label: 'Jaw chewing food', icon: 'arm', correctBin: 'bc3' },
      { id: 'b3', label: 'Foot standing on toes', icon: 'arm', correctBin: 'bc2' },
      { id: 'b4', label: 'Neck tilting head back', icon: 'arm', correctBin: 'bc1' },
    ],
    bins: [
      { id: 'bc1', label: 'Class 1 Body', color: '#3B82F6' },
      { id: 'bc2', label: 'Class 2 Body', color: '#10B981' },
      { id: 'bc3', label: 'Class 3 Body', color: '#F59E0B' },
    ],
  },
];

// ─── Sort Card & Bin Components ───────────────────────────────

interface SortCardProps {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}

function SortCard({ id, label, icon, x, y, placed, onDragStart, onDragEnd }: SortCardProps) {
  return (
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={100} height={85}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 100, height: 85 }}>
        {renderSortIcon(icon, 36)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

interface SortBinProps {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovered: boolean;
}

function SortBin({ id, label, color, x, y, width, height, isHovered }: SortBinProps) {
  return (
    <div
      id={id}
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovered ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{ left: x, top: y, width, height, borderColor: color, backgroundColor: `${color}15` }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 text-white font-bold text-xs" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-black text-gray-800 text-center px-1">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface SimpleMachinesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function SimpleMachinesGame({ width = 720, height = 560, onComplete }: SimpleMachinesGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const currentChallenge = CHALLENGES[challengeIdx];

  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpeakingText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  const handleShowHint = useCallback(() => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  }, [currentChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [handleShowHint]);

  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, currentChallenge, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      const count = currentChallenge.sortItems.length;
      const startX = Math.max(20, (width - count * 105) / 2);
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: startX + idx * 105, y: height - 130 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, width]);

  const handleAnswerClick = (opt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    setSelectedOpt(opt);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x, y });
      setScore(prev => prev + 10);
      const msg = "Great job! That is correct!";
      setSuccessMsg(msg);
      setSpeakingText(msg);
      speechManager.speak(msg);
    } else {
      audioManager.play('error');
      setMascotMood('thinking');
      setIsIncorrect(true);
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  const advanceChallenge = () => {
    setSelectedOpt(null);
    setIsIncorrect(false);
    setSuccessMsg(null);
    setHintMsg(null);
    setSparklePos(null);
    setMascotMood('happy');
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      const compMsg = "Wonderful! You are a brilliant master mechanic!";
      setSpeakingText(compMsg);
      speechManager.speak(compMsg);
      if (onComplete) onComplete(finalScore);
    }
  };

  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    let droppedBinId: string | null = null;
    const numBins = currentChallenge.bins.length;
    const binWidth = Math.floor((width - 40) / numBins) - 10;
    const binHeight = 80;
    const binY = height - 230;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = 20 + idx * (binWidth + 10);
      const by = binY;
      if (x >= bx && x <= bx + binWidth && y >= by && y <= by + binHeight) {
        droppedBinId = bin.id;
      }
    });

    setHoveredBin(null);

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setSparklePos({ x, y });

      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setScore(prev => prev + 15);
        const msg = "Fantastic sorting! All correct!";
        setSuccessMsg(msg);
        setSpeakingText(msg);
        speechManager.speak(msg);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans bg-slate-900 text-white flex flex-col items-center justify-between"
      style={{ width, height }}
    >
      <WorkshopBackground width={width} height={height} />
      <MechanicMira mood={mascotMood} speaking={speakingText} />

      {/* Header bar */}
      <div className="w-full px-6 py-3 flex items-center justify-between z-10 bg-slate-800/80 backdrop-blur border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Simple Machines & Levers
          </span>
          <span className="text-xs bg-slate-700 px-2.5 py-1 rounded-full text-amber-300 font-bold border border-slate-600">
            Class 5 • ICSE
          </span>
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-300">Score: {score}</span>
              <StarRow count={Math.min(5, Math.floor(score / 20) + 1)} total={5} />
            </div>
          )}
          <button
            onClick={() => {
              audioManager.play('tap');
              if (screen === 'teaching') {
                setScreen('play');
              } else {
                setScreen('teaching');
                setSlideIdx(0);
              }
            }}
            className="px-3 py-1.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white rounded-xl text-xs font-bold shadow transition transform active:scale-95"
          >
            {screen === 'teaching' ? 'Play Game 🎮' : 'Review Guide 📖'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full relative flex flex-col items-center justify-center p-4 z-10">
        {screen === 'teaching' ? (
          <motion.div
            key="teaching"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center max-w-lg bg-slate-800/90 backdrop-blur rounded-3xl p-6 border-2 border-slate-700 shadow-2xl text-center"
          >
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-xl font-black text-amber-300 mb-2">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed mb-6 font-medium">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            <div className="flex items-center justify-between w-full mt-2">
              <button
                disabled={slideIdx === 0}
                onClick={() => {
                  audioManager.play('tap');
                  setSlideIdx(prev => Math.max(0, prev - 1));
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${slideIdx === 0 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
              >
                ⬅️ Previous
              </button>

              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${i === slideIdx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-600'}`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    setScreen('play');
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 shadow"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game 🚀' : 'Next ➡️'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="play"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center w-full max-w-2xl px-4"
          >
            {/* Challenge Progress */}
            <div className="w-full flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <button
                onClick={handleShowHint}
                className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-xl text-xs font-bold transition"
              >
                💡 Hint
              </button>
            </div>

            {/* Question Card */}
            <div className="w-full bg-slate-800/90 backdrop-blur rounded-2xl p-4 border-2 border-slate-700 shadow-xl mb-4 text-center">
              <h3 className="text-base font-black text-white">
                {currentChallenge.question}
              </h3>
            </div>

            {/* Challenge Body */}
            {currentChallenge.type === 'identify' ? (
              <div className="grid grid-cols-1 gap-2.5 w-full max-w-md mb-4">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnStyle = 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-white';
                  if (selectedOpt) {
                    if (isCorrectAnswer) {
                      btnStyle = 'bg-emerald-600 border-emerald-400 text-white font-black';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-600 border-rose-400 text-white font-black animate-shake';
                    } else {
                      btnStyle = 'bg-slate-800/50 border-slate-700 text-gray-500';
                    }
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                      whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                      disabled={selectedOpt !== null}
                      onClick={e => handleAnswerClick(opt, e)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-sm font-bold shadow transition flex items-center justify-center text-center ${btnStyle}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="w-full h-[260px] relative mb-4">
                {/* Bins */}
                {currentChallenge.bins && currentChallenge.bins.map((bin, idx) => {
                  const numBins = currentChallenge.bins?.length || 1;
                  const binWidth = Math.floor((width - 40) / numBins) - 10;
                  const binHeight = 75;
                  const bx = 20 + idx * (binWidth + 10);
                  const by = height - 230;
                  return (
                    <SortBin
                      key={bin.id}
                      id={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={bx}
                      y={by}
                      width={binWidth}
                      height={binHeight}
                      isHovered={hoveredBin === bin.id}
                    />
                  );
                })}

                {/* Draggable Sort Cards */}
                {currentChallenge.sortItems && currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: height - 130 };
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
            )}

            {/* Advance / Success Banner Trigger */}
            {(selectedOpt === currentChallenge.answer || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center mt-2"
              >
                <button
                  onClick={advanceChallenge}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black rounded-2xl shadow-xl transition transform active:scale-95"
                >
                  Continue 🚀
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Feedback & Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
