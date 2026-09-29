'use client';

/**
 * DigestionGame — Learn about the human digestive and excretory systems
 *
 * CISCE Nodes: c4_bio_006 (Digestive system organs), c4_bio_007 (Functions of digestive organs),
 *              c4_bio_008 (Excretory system organs and functions)
 * Enrichment: c4_biology_enrichment_part6-8
 *
 * ELI5: "Your body is like an amazing factory! Food enters your mouth, gets chewed by teeth and mixed with saliva, travels down the food pipe into the stomach where it is churned with juices, passes into the small intestine to soak up all the nutrients into your blood, and the rest goes to the large intestine where water is absorbed! Meanwhile, your kidneys act like water filters to clean your blood and make urine, while your skin cools you down with sweat!"
 *
 * Misconceptions (from enrichment):
 *   1. "Digestion happens only in the stomach" → "No! Digestion begins in the mouth where teeth chew food and saliva starts breaking down starch!"
 *   2. "The liver digests food directly" → "No! The liver does not hold food; it produces bile which helps digest fats!"
 *   3. "The large intestine absorbs nutrients" → "No! The small intestine absorbs nutrients into the blood. The large intestine absorbs water from leftover waste!"
 *   4. "Excretion just means passing urine" → "No! Excretion is the removal of nitrogenous waste like urea, excess salts, and water through kidneys (urine) and skin (sweat)!"
 *   5. "Kidneys make urine directly from food" → "No! Kidneys filter blood, separating waste from useful substances to form urine!"
 *
 * Story: "Join Dr. Devika in her anatomy lab to explore the wonderful digestive and excretory systems, sort organs, learn their functions, and become a Health Hero!"
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ─── SVG Icon Components for Digestive & Excretory Organs ─────

function MouthIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="22" ry="16" fill="#F48FB1" stroke="#C2185B" strokeWidth="2" />
      <path d="M12 30 Q30 44 48 30" fill="#880E4F" />
      {/* Teeth */}
      <rect x="18" y="18" width="5" height="7" fill="white" rx="1" />
      <rect x="25" y="17" width="5" height="8" fill="white" rx="1" />
      <rect x="32" y="17" width="5" height="8" fill="white" rx="1" />
      <rect x="39" y="18" width="5" height="7" fill="white" rx="1" />
      {/* Tongue */}
      <ellipse cx="30" cy="38" rx="8" ry="5" fill="#E91E63" />
    </svg>
  );
}

function OesophagusIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="22" y="5" width="16" height="50" fill="#FFCCBC" stroke="#D84315" strokeWidth="2" rx="4" />
      <line x1="22" y1="15" x2="38" y2="15" stroke="#D84315" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="22" y1="25" x2="38" y2="25" stroke="#D84315" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="22" y1="35" x2="38" y2="35" stroke="#D84315" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="22" y1="45" x2="38" y2="45" stroke="#D84315" strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  );
}

function StomachIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 12 C35 10, 48 20, 42 38 C38 50, 22 52, 16 42 C12 35, 15 20, 20 12 Z" fill="#FF8A65" stroke="#D84315" strokeWidth="2" />
      <path d="M22 20 Q32 25 35 35" stroke="#BF360C" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SmallIntestineIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 15 Q30 5 45 15 Q55 25 45 35 Q30 45 35 55 Q20 50 15 35 Q10 25 15 15 Z" fill="#FFAB91" stroke="#E64A19" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 20 Q30 15 38 25 Q42 35 30 40 Q20 42 22 25" stroke="#D84315" strokeWidth="2" fill="none" />
    </svg>
  );
}

function LargeIntestineIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="12" width="36" height="36" rx="8" fill="none" stroke="#8D6E63" strokeWidth="6" strokeLinecap="round" />
      <circle cx="16" cy="42" r="4" fill="#6D4C41" />
    </svg>
  );
}

function LiverIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 25 C10 15, 30 10, 50 18 C55 25, 45 45, 25 45 C15 45, 10 35, 10 25 Z" fill="#8E24AA" stroke="#4A148C" strokeWidth="2" />
      <ellipse cx="38" cy="28" r="4" fill="#BA68C8" />
    </svg>
  );
}

function KidneyIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C45 10, 50 25, 42 42 C38 50, 22 50, 18 42 C10 25, 15 10, 30 10 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
      <path d="M30 20 Q24 30 30 40" fill="none" stroke="#FFCDD2" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function UreterIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 8 Q35 30 30 52" fill="none" stroke="#F44336" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="30" cy="8" r="6" fill="#D32F2F" />
    </svg>
  );
}

function BladderIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 12 C45 12, 48 35, 38 48 L22 48 C12 35, 15 12, 30 12 Z" fill="#42A5F5" stroke="#1565C0" strokeWidth="2" />
      <rect x="27" y="48" width="6" height="8" fill="#1976D2" rx="2" />
    </svg>
  );
}

function SweatIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C24 22, 16 34, 16 42 C16 50, 22 54, 30 54 C38 54, 44 50, 44 42 C44 34, 36 22, 30 10 Z" fill="#29B6F6" stroke="#0288D1" strokeWidth="2" />
      <ellipse cx="25" cy="40" r="3" fill="white" opacity="0.6" />
    </svg>
  );
}

function WaterGlassIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 12 L22 48 L38 48 L42 12 Z" fill="none" stroke="#0288D1" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 22 L22 46 L38 46 L40 22 Z" fill="#81D4FA" opacity="0.8" />
    </svg>
  );
}

function SalivaIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 12 C24 24, 18 36, 18 44 C18 51, 23 55, 30 55 C37 55, 42 51, 42 44 C42 36, 36 24, 30 12 Z" fill="#80DEEA" stroke="#00838F" strokeWidth="2" />
      <ellipse cx="26" cy="42" r="3" fill="white" opacity="0.7" />
    </svg>
  );
}

function BileIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 12 C24 24, 18 36, 18 44 C18 51, 23 55, 30 55 C37 55, 42 51, 42 44 C42 36, 36 24, 30 12 Z" fill="#D4E157" stroke="#827717" strokeWidth="2" />
      <ellipse cx="26" cy="42" r="3" fill="white" opacity="0.7" />
    </svg>
  );
}

function VilliIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 40 L15 20 L20 35 L25 15 L30 38 L35 18 L40 36 L45 22 L50 40 Z" fill="#FF7043" stroke="#D84315" strokeWidth="2" strokeLinejoin="round" />
      <rect x="10" y="40" width="40" height="10" fill="#BF360C" rx="2" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'mouth': return <MouthIcon size={size} />;
    case 'oesophagus': return <OesophagusIcon size={size} />;
    case 'stomach': return <StomachIcon size={size} />;
    case 'small-intestine': return <SmallIntestineIcon size={size} />;
    case 'large-intestine': return <LargeIntestineIcon size={size} />;
    case 'liver': return <LiverIcon size={size} />;
    case 'kidney': return <KidneyIcon size={size} />;
    case 'ureter': return <UreterIcon size={size} />;
    case 'bladder': return <BladderIcon size={size} />;
    case 'urethra': return <BladderIcon size={size} />;
    case 'skin': return <SweatIcon size={size} />;
    case 'water': return <WaterGlassIcon size={size} />;
    case 'fibre': return <SmallIntestineIcon size={size} />;
    case 'doctor': return <KidneyIcon size={size} />;
    case 'exercise': return <SweatIcon size={size} />;
    case 'junk': return <StomachIcon size={size} />;
    case 'hold': return <BladderIcon size={size} />;
    case 'pancreas': return <LiverIcon size={size} />;
    default: return <MouthIcon size={size} />;
  }
}

// ─── Dr. Devika Mascot (Friendly Doctor with Lab Coat & Stethoscope) ──

function DrDevika({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-gold-300"
          >
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
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
          <defs>
            <linearGradient id="doctor-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F7FA" />
            </linearGradient>
            <radialGradient id="doctor-face" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#FFE0B2" />
              <stop offset="100%" stopColor="#FFCC80" />
            </radialGradient>
          </defs>
          {/* Body / Lab Coat */}
          <path d="M20 50 L25 85 L50 85 L55 50 Z" fill="url(#doctor-coat)" stroke="#00ACC1" strokeWidth="2" />
          {/* Stethoscope */}
          <path d="M30 38 Q37 55 45 38" fill="none" stroke="#37474F" strokeWidth="2.5" />
          <circle cx="37" cy="55" r="4" fill="#00ACC1" />
          {/* Head */}
          <circle cx="37.5" cy="28" r="16" fill="url(#doctor-face)" stroke="#EF6C00" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M21 26 C21 15, 54 15, 54 26 C50 20, 25 20, 21 26 Z" fill="#4E342E" />
          {/* Eyes */}
          <circle cx="31" cy="27" r="2.5" fill="#263238" />
          <circle cx="44" cy="27" r="2.5" fill="#263238" />
          <circle cx="32" cy="26" r="1" fill="white" />
          <circle cx="45" cy="26" r="1" fill="white" />
          {/* Smile */}
          <path d="M33 34 Q37.5 38 42 34" stroke="#D84315" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Head Mirror / Band */}
          <rect x="21" y="20" width="33" height="4" fill="#B0BEC5" rx="1" />
          <circle cx="37.5" cy="22" r="3" fill="#ECEFF1" stroke="#37474F" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

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

// ─── Scene Background with SVG Gradient ───────────────────────

function SceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-bg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F7FA" />
            <stop offset="50%" stopColor="#B2EBF2" />
            <stop offset="100%" stopColor="#80DEEA" />
          </linearGradient>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BCAAA4" />
            <stop offset="100%" stopColor="#8D6E63" />
          </linearGradient>
        </defs>
        {/* Lab wall */}
        <rect width={width} height={height * 0.75} fill="url(#lab-bg-grad)" />
        {/* Lab floor */}
        <rect y={height * 0.75} width={width} height={height * 0.25} fill="url(#floor-grad)" />
        {/* Medical Chart on wall */}
        <rect x="50" y="30" width="120" height="90" fill="white" stroke="#00838F" strokeWidth="3" rx="4" />
        <circle cx="110" cy="65" r="22" fill="#FFCDD2" stroke="#E53935" strokeWidth="2" />
        <path d="M110 50 Q120 65 110 80" fill="none" stroke="#C62828" strokeWidth="2" />
        <text x="75" y="110" fontSize="10" fontWeight="bold" fill="#006064">DIGESTIVE SYSTEM</text>
        {/* Second Chart */}
        <rect x="190" y="30" width="100" height="90" fill="white" stroke="#00838F" strokeWidth="3" rx="4" />
        <path d="M220 50 L260 50 L260 80 L220 80 Z" fill="#BBDEFB" stroke="#1E88E5" strokeWidth="2" rx="4" />
        <text x="210" y="110" fontSize="10" fontWeight="bold" fill="#006064">KIDNEY FILTER</text>
      </svg>
    </div>
  );
}

// ─── Sort Card Component ──────────────────────────────────────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-gold-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({ label, color, x, y, width, height, isHovering, onMouseEnter, onMouseLeave }: {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}22`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-extrabold text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Teaching Slides (EXACTLY 5 slides) ────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: 'Welcome to the Digestive System! 🦷',
    text: 'Digestion begins in the mouth! Teeth cut, tear, and grind food into tiny pieces, while saliva wets the food and starts breaking down starch so it can be swallowed easily.',
    emoji: '🦷',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Digestion begins in the mouth! Teeth cut and grind food, while saliva wets it and starts breaking down starch!',
  },
  {
    title: 'The Food Pipe & Stomach! 🍲',
    text: 'The food pipe (oesophagus) carries chewed food down to the stomach. The stomach is a muscular bag that churns food with strong digestive juices and acid to form a soupy mixture!',
    emoji: '🍲',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'The food pipe carries food to the stomach. The stomach churns food with acid and digestive juices into a soupy mixture!',
  },
  {
    title: 'Small & Large Intestines! 🌀',
    text: 'The small intestine is a long coiled tube where nutrients are absorbed into the blood. The large intestine absorbs water from leftover waste before it leaves the body.',
    emoji: '🌀',
    bgColor: 'from-teal-400 to-gold-500',
    spoken: 'The small intestine absorbs nutrients into the blood, while the large intestine absorbs water from leftover waste!',
  },
  {
    title: 'The Liver and Bile! 🫀',
    text: 'The liver is a large reddish-brown organ that produces a liquid called bile. Bile helps the body to digest fats! Remember, the liver does not hold food directly.',
    emoji: '🫀',
    bgColor: 'from-purple-400 to-gold-500',
    spoken: 'The liver produces bile, which helps the body to digest fats! The liver is a vital helper in digestion.',
  },
  {
    title: 'The Excretory System & Kidneys! 💧',
    text: 'The kidneys are two bean-shaped organs that filter blood and remove waste as urine. The skin also helps by releasing sweat. Drink plenty of water to keep your body clean!',
    emoji: '💧',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'The kidneys filter blood and make urine, and skin releases sweat. Drink plenty of water to keep your excretory system healthy!',
  },
];

// ─── Challenges (EXACTLY 8 challenges) ─────────────���──────────

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

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Where does digestion BEGIN in the human body?',
    answer: 'In the mouth, where teeth chew and saliva wets food',
    options: [
      'In the stomach, where acid mixes food',
      'In the mouth, where teeth chew and saliva wets food',
      'In the small intestine, where nutrients are absorbed',
    ],
    hint: 'Think about the very first step when you take a bite of food!',
    misconception: 'Many students think digestion starts in the stomach! In truth, digestion begins right in the mouth, where teeth chew food and saliva starts breaking down starch.',
  },
  {
    type: 'identify',
    question: 'What does the STOMACH do in digestion?',
    answer: 'Churns food with digestive juices and acid to break it down',
    options: [
      'Absorbs nutrients into blood',
      'Stores waste before it leaves the body',
      'Churns food with digestive juices and acid to break it down',
    ],
    hint: 'Think of the stomach as a muscular bag that mixes and churns food!',
    misconception: 'The stomach does not absorb most nutrients (that happens in the small intestine). Its main job is to churn food with acid and digestive juices into a soupy mixture.',
  },
  {
    type: 'sort',
    question: 'Drag each digestive organ to its correct position in the journey of food!',
    answer: 'sort',
    options: [],
    hint: 'Remember the order: Mouth → Oesophagus → Stomach → Small Intestine → Large Intestine!',
    misconception: 'Make sure you follow the correct order of the digestive tract: mouth first, then oesophagus, stomach, small intestine, and large intestine.',
    sortItems: [
      { id: 'm1', label: 'Mouth (Chews food)', icon: 'mouth', correctBin: 'b1' },
      { id: 'm2', label: 'Oesophagus (Pushes down)', icon: 'oesophagus', correctBin: 'b2' },
      { id: 'm3', label: 'Stomach (Churns with acid)', icon: 'stomach', correctBin: 'b3' },
      { id: 'm4', label: 'Small Intestine (Absorbs)', icon: 'small-intestine', correctBin: 'b4' },
      { id: 'm5', label: 'Large Intestine (Water)', icon: 'large-intestine', correctBin: 'b5' },
    ],
    bins: [
      { id: 'b1', label: '1. Mouth 🦷', color: '#0288D1' },
      { id: 'b2', label: '2. Oesophagus 🎯', color: '#E65100' },
      { id: 'b3', label: '3. Stomach 🍲', color: '#7B1FA2' },
      { id: 'b4', label: '4. Small Intestine 🌀', color: '#2E7D32' },
      { id: 'b5', label: '5. Large Intestine 🟫', color: '#8D6E63' },
    ],
  },
  {
    type: 'identify',
    question: 'Which organ produces BILE that helps digest fats?',
    answer: 'The liver',
    options: ['The stomach', 'The liver', 'The kidneys'],
    hint: 'It is a large reddish-brown organ that is not part of the food tube!',
    misconception: 'The liver does not hold food like a bag. Instead, it produces bile, a liquid that helps the body digest fats!',
  },
  {
    type: 'sort',
    question: 'Drag each organ to its correct primary function!',
    answer: 'sort',
    options: [],
    hint: 'Match each organ with what it does best in the body!',
    misconception: 'Remember: the small intestine absorbs nutrients into the blood, while the large intestine absorbs water from leftover waste!',
    sortItems: [
      { id: 's1', label: 'Mouth: Saliva & chewing', icon: 'mouth', correctBin: 'bin-mouth' },
      { id: 's2', label: 'Stomach: Churns with acid', icon: 'stomach', correctBin: 'bin-stomach' },
      { id: 's3', label: 'Small Intestine: Absorbs nutrients', icon: 'small-intestine', correctBin: 'bin-small' },
      { id: 's4', label: 'Large Intestine: Absorbs water', icon: 'large-intestine', correctBin: 'bin-large' },
    ],
    bins: [
      { id: 'bin-mouth', label: 'Mouth 🦷', color: '#0288D1' },
      { id: 'bin-stomach', label: 'Stomach 🍲', color: '#7B1FA2' },
      { id: 'bin-small', label: 'Small Intestine 🌀', color: '#2E7D32' },
      { id: 'bin-large', label: 'Large Intestine 🟫', color: '#8D6E63' },
    ],
  },
  {
    type: 'identify',
    question: 'What are the tiny finger-like projections in the small intestine that absorb nutrients?',
    answer: 'Villi',
    options: ['Villi', 'Plaque', 'Enamel'],
    hint: 'They line the small intestine and increase surface area for nutrient absorption!',
    misconception: 'Villi are tiny finger-like structures in the small intestine. Enamel is on teeth, and plaque builds up on teeth, not in the intestines!',
  },
  {
    type: 'sort',
    question: 'Drag each excretory organ to its correct function!',
    answer: 'sort',
    options: [],
    hint: 'The excretory system cleans the body by removing waste like urine and sweat!',
    misconception: 'Kidneys filter blood to make urine, ureters carry urine to the bladder, and skin removes sweat!',
    sortItems: [
      { id: 'e1', label: 'Kidneys: Filter blood & make urine', icon: 'kidney', correctBin: 'bin-kidney' },
      { id: 'e2', label: 'Ureters: Carry urine to bladder', icon: 'ureter', correctBin: 'bin-ureter' },
      { id: 'e3', label: 'Bladder: Stores urine', icon: 'bladder', correctBin: 'bin-bladder' },
      { id: 'e4', label: 'Skin: Removes sweat', icon: 'skin', correctBin: 'bin-skin' },
    ],
    bins: [
      { id: 'bin-kidney', label: 'Kidneys 🫀', color: '#D32F2F' },
      { id: 'bin-ureter', label: 'Ureters 🪄', color: '#F57C00' },
      { id: 'bin-bladder', label: 'Bladder 💧', color: '#1976D2' },
      { id: 'bin-skin', label: 'Skin 💦', color: '#00838F' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each item to Keep Excretory System Healthy or Harm It!',
    answer: 'sort',
    options: [],
    hint: 'Drinking water and eating fibre keep your cleaning systems working smoothly!',
    misconception: 'Drinking plenty of water, eating fibre, and visiting the toilet when needed keep your excretory system healthy. Holding urine or eating junk food harms it!',
    sortItems: [
      { id: 'h1', label: 'Drink plenty of water', icon: 'water', correctBin: 'healthy' },
      { id: 'h2', label: 'Eat fibre-rich foods', icon: 'fibre', correctBin: 'healthy' },
      { id: 'h3', label: 'Hold urine too long', icon: 'hold', correctBin: 'harm' },
      { id: 'h4', label: 'Eat only junk food', icon: 'junk', correctBin: 'harm' },
    ],
    bins: [
      { id: 'healthy', label: 'Healthy Habits ✅', color: '#2E7D32' },
      { id: 'harm', label: 'Harmful Habits ❌', color: '#C62828' },
    ],
  },
];

// ─── Component Props ──────────────────────────────────────────

export interface DigestionGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function DigestionGame({ width = 720, height = 560, onComplete }: DigestionGameProps) {
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

  const handleShowHint = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [currentChallenge]);

  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 30 + idx * 135, y: height - 165 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

  const handleAnswerClick = (opt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    setIsIncorrect(false);
    setSelectedOpt(opt);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x, y });
      setScore(prev => prev + 10);
      const msg = 'Great job! You know your digestion facts!';
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
      const compMsg = 'Wonderful! You are a brilliant Health Hero!';
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

    // Check bin collision — positions must match the SortBin render positions
    const binCount = currentChallenge.bins.length;
    const binSpacing = binCount <= 4 ? 165 : 130;
    const binStartX = binCount <= 4 ? 40 : Math.max(10, (width - binCount * binSpacing) / 2);
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = binStartX + idx * binSpacing;
      const binY = 140;
      const binW = binSpacing - 10;
      const binH = 175;
      if (x >= binX - 15 && x <= binX + binW + 15 && y >= binY - 15 && y <= binY + binH + 15) {
        droppedBinId = bin.id;
      }
    });

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
        const msg = 'Fantastic! You sorted the digestion journey perfectly!';
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
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans bg-gold-900"
      style={{ width, height }}
    >
      <SceneBackground width={width} height={height} />

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between z-30 shadow-sm border-b border-gold-100">
        <div className="flex items-center gap-3">
          <span className="text-xl">🩺</span>
          <div>
            <h1 className="text-sm font-black text-gold-900">Dr. Devika's Digestion Lab</h1>
            <p className="text-[10px] text-gold-700 font-semibold">ICSE Class 4 Biology</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">Challenge {challengeIdx + 1}/8</span>
              <div className="w-24 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-500 transition-all duration-300"
                  style={{ width: `${((challengeIdx + 1) / 8) * 100}%` }}
                />
              </div>
            </div>
            <StarRow count={Math.floor(score / 15)} total={5} />
          </div>
        )}

        <button
          onClick={() => {
            audioManager.play('tap');
            if (screen === 'teaching') setScreen('play');
            else {
              setScreen('teaching');
              setSlideIdx(0);
              setChallengeIdx(0);
              setScore(0);
              setErrors(0);
            }
          }}
          className="px-4 py-1.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-xs rounded-xl shadow hover:opacity-90 transition active:scale-95"
        >
          {screen === 'teaching' ? 'Start Game 🚀' : 'Restart 🔄'}
        </button>
      </div>

      <DrDevika mood={mascotMood} speaking={speakingText} />

      {/* ─── TEACHING SCREEN ────────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 pb-8 px-8 flex flex-col items-center justify-center z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            className={`w-full max-w-xl rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow max-w-lg mb-6">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                disabled={slideIdx === 0}
                onClick={() => {
                  audioManager.play('tap');
                  setSlideIdx(prev => Math.max(0, prev - 1));
                }}
                className={`px-4 py-2 rounded-xl font-bold text-sm bg-white/20 backdrop-blur hover:bg-white/30 transition ${slideIdx === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                ⬅️ Previous
              </button>

              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-white scale-125' : 'bg-white/40'}`}
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
                className="px-5 py-2 rounded-xl font-bold text-sm bg-white text-gold-900 shadow-lg hover:bg-gold-50 transition active:scale-95"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Let\'s Play! 🚀' : 'Next ➡️'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── PLAY SCREEN ────────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-20 pb-6 px-6 flex flex-col items-center justify-between z-10">
          {/* Question Banner */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg max-w-xl w-full text-center border-2 border-gold-200 mt-2">
            <h2 className="text-base font-black text-gray-800">{currentChallenge.question}</h2>
          </div>

          {/* Multiple Choice Challenge */}
          {currentChallenge.type === 'identify' && currentChallenge.options && (
            <div className="grid grid-cols-1 gap-3 w-full max-w-lg my-auto">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = 'bg-white text-gray-800 border-gold-200 hover:bg-gold-50';
                if (selectedOpt) {
                  if (isCorrectOpt) btnStyle = 'bg-green-500 text-white border-green-600 shadow-lg scale-102';
                  else if (isSelected) btnStyle = 'bg-red-500 text-white border-red-600';
                  else btnStyle = 'bg-gray-100 text-gray-400 opacity-50';
                }
                return (
                  <motion.button
                    key={i}
                    whileHover={!selectedOpt ? { scale: 1.02 } : {}}
                    whileTap={!selectedOpt ? { scale: 0.98 } : {}}
                    disabled={selectedOpt === currentChallenge.answer}
                    onClick={e => handleAnswerClick(opt, e)}
                    className={`p-4 rounded-2xl font-bold text-sm border-2 shadow transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrectOpt && <span className="text-xl">✅</span>}
                    {selectedOpt && isSelected && !isCorrectOpt && <span className="text-xl">❌</span>}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Sort Challenge */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full flex-1 my-2">
              {/* Bins */}
              <div className="flex justify-around px-4 pt-2">
                {currentChallenge.bins.map((bin, idx) => {
                  const binCount = currentChallenge.bins!.length;
                  const binSpacing = binCount <= 4 ? 165 : 130;
                  const binStartX = binCount <= 4 ? 40 : Math.max(10, (width - binCount * binSpacing) / 2);
                  const binX = binStartX + idx * binSpacing;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={binX}
                      y={140}
                      width={binSpacing - 10}
                      height={175}
                      isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                    />
                  );
                })}
              </div>

              {/* Draggable Items */}
              {currentChallenge.sortItems.map(item => (
                <SortCard
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  x={itemPositions[item.id]?.x || 50}
                  y={itemPositions[item.id]?.y || 360}
                  placed={placedItems[item.id] || false}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>
          )}

          {/* Bottom Controls / Feedback */}
          <div className="w-full max-w-xl flex items-center justify-between mt-auto mb-2 px-2">
            <button
              onClick={handleShowHint}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition active:scale-95"
            >
              💡 Need a Hint?
            </button>

            {(selectedOpt === currentChallenge.answer || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black text-sm rounded-xl shadow-lg flex items-center gap-2 transition active:scale-95"
              >
                <span>Continue</span>
                <span>➡️</span>
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* ─── FEEDBACK OVERLAYS ──────────────────────────────────── */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
