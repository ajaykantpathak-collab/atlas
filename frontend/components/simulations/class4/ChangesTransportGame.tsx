'use client';

/**
 * ChangesTransportGame — Learn about natural and man-made features of a locality,
 * positive and negative effects of changes, types of shelter and houses,
 * communication methods, and modes of transport.
 *
 * CISCE Nodes: c4_evs_004, c4_evs_005, c4_evs_006, c4_evs_007, c4_evs_008
 *
 * ELI5: "Our locality has natural wonders like rivers and hills, and man-made
 *   buildings and roads! We build houses for shelter, send letters and calls
 *   to talk to friends, and travel by road, rail, water, and air!"
 *
 * Mascot: Postman Prakash — a friendly postman with a mail bag, a bicycle badge,
 *   a letter, and a phone.
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

// ─── SVG Icon Components ──────────────────────────────────────

function NaturalFeatureIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Hills */}
      <path d="M5 50 L25 20 L45 50 Z" fill="#66BB6A" stroke="#388E3C" strokeWidth="1.5" />
      <path d="M25 50 L42 28 L60 50 Z" fill="#81C784" stroke="#43A047" strokeWidth="1.5" />
      {/* River */}
      <path d="M0 50 Q20 40, 35 50 Q50 60, 60 48" fill="none" stroke="#29B6F6" strokeWidth="4" strokeLinecap="round" />
      {/* Sun */}
      <circle cx="50" cy="12" r="7" fill="#FFCA28" />
    </svg>
  );
}

function ManMadeFeatureIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Building */}
      <rect x="15" y="20" width="30" height="30" fill="#90A4AE" stroke="#455A64" strokeWidth="1.5" rx="1" />
      {/* Windows */}
      <rect x="20" y="25" width="6" height="8" fill="#FFF59D" />
      <rect x="34" y="25" width="6" height="8" fill="#FFF59D" />
      <rect x="20" y="38" width="6" height="8" fill="#FFF59D" />
      <rect x="34" y="38" width="6" height="8" fill="#FFF59D" />
      {/* Roof / Chimney */}
      <polygon points="12,20 30,8 48,20" fill="#E57373" stroke="#C62828" strokeWidth="1.5" />
      <rect x="36" y="10" width="4" height="6" fill="#B0BEC5" />
    </svg>
  );
}

function TreeCutIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Stump */}
      <ellipse cx="30" cy="45" rx="12" ry="6" fill="#8D6E63" stroke="#5D4037" strokeWidth="1.5" />
      <path d="M18 45 L18 38 C18 35, 42 35, 42 38 L42 45" fill="#A1887F" stroke="#5D4037" strokeWidth="1.5" />
      {/* Rings on stump */}
      <ellipse cx="30" cy="41" rx="6" ry="2" fill="#D7CCC8" />
      {/* Fallen trunk / sad vibe */}
      <rect x="32" y="42" width="22" height="6" rx="3" fill="#A1887F" transform="rotate(25 32 42)" />
      {/* Warning cross */}
      <path d="M40 12 L50 22 M50 12 L40 22" stroke="#E53935" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ParkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Ground */}
      <ellipse cx="30" cy="48" rx="26" ry="8" fill="#81C784" />
      {/* Slide / playground */}
      <rect x="25" y="25" width="4" height="20" fill="#78909C" />
      <path d="M15 25 L27 25 L27 22 L15 25 Z" fill="#FF7043" />
      <path d="M27 25 L45 42" stroke="#42A5F5" strokeWidth="4" strokeLinecap="round" />
      {/* Small tree */}
      <circle cx="12" cy="30" r="8" fill="#66BB6A" />
      <rect x="11" y="36" width="2" height="10" fill="#8D6E63" />
      {/* Smile */}
      <path d="M36 22 Q40 18 44 22" stroke="#AB47BC" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function HouseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="28" width="30" height="22" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" rx="1" />
      <polygon points="12,28 30,12 48,28" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1.5" />
      <rect x="26" y="38" width="8" height="12" fill="#795548" />
      <rect x="18" y="32" width="8" height="8" fill="#81D4FA" stroke="#0288D1" strokeWidth="1" />
      <rect x="34" y="32" width="8" height="8" fill="#81D4FA" stroke="#0288D1" strokeWidth="1" />
    </svg>
  );
}

function HutIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Mud walls */}
      <rect x="16" y="30" width="28" height="20" fill="#A1887F" stroke="#4E342E" strokeWidth="1.5" rx="1" />
      {/* Thatch roof */}
      <polygon points="12,30 30,14 48,30" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="2" />
      {/* Wooden door */}
      <rect x="26" y="38" width="8" height="12" fill="#6D4C41" />
    </svg>
  );
}

function ApartmentIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="8" width="24" height="44" fill="#CFD8DC" stroke="#37474F" strokeWidth="1.5" rx="1" />
      <rect x="22" y="12" width="5" height="6" fill="#81D4FA" />
      <rect x="33" y="12" width="5" height="6" fill="#81D4FA" />
      <rect x="22" y="22" width="5" height="6" fill="#81D4FA" />
      <rect x="33" y="22" width="5" height="6" fill="#81D4FA" />
      <rect x="22" y="32" width="5" height="6" fill="#81D4FA" />
      <rect x="33" y="32" width="5" height="6" fill="#81D4FA" />
      <rect x="26" y="42" width="8" height="10" fill="#546E7A" />
    </svg>
  );
}

function StiltHouseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Stilts */}
      <rect x="18" y="36" width="3" height="16" fill="#5D4037" />
      <rect x="39" y="36" width="3" height="16" fill="#5D4037" />
      {/* House body */}
      <rect x="12" y="20" width="36" height="18" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" rx="1" />
      {/* Roof */}
      <polygon points="10,20 30,8 50,20" fill="#E65100" stroke="#BF360C" strokeWidth="1.5" />
      {/* Water at bottom */}
      <rect x="5" y="48" width="50" height="6" fill="#29B6F6" rx="2" />
    </svg>
  );
}

function LetterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="18" width="36" height="26" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="1.5" rx="2" />
      <path d="M12 18 L30 32 L48 18" fill="none" stroke="#F57F17" strokeWidth="1.5" />
      <circle cx="40" cy="24" r="5" fill="#E53935" />
    </svg>
  );
}

function PhoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="20" y="10" width="20" height="40" fill="#37474F" stroke="#263238" strokeWidth="1.5" rx="3" />
      <rect x="23" y="15" width="14" height="26" fill="#81D4FA" rx="1" />
      <circle cx="30" cy="46" r="2" fill="#B0BEC5" />
    </svg>
  );
}

function EmailIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="20" fill="#42A5F5" stroke="#1565C0" strokeWidth="1.5" />
      <path d="M20 25 L30 33 L40 25" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="18" y="22" width="24" height="16" fill="none" stroke="white" strokeWidth="2" rx="2" />
    </svg>
  );
}

function BusIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="20" width="40" height="22" fill="#FFEE58" stroke="#FBC02D" strokeWidth="1.5" rx="3" />
      <rect x="14" y="23" width="8" height="7" fill="#81D4FA" rx="1" />
      <rect x="26" y="23" width="8" height="7" fill="#81D4FA" rx="1" />
      <rect x="38" y="23" width="8" height="7" fill="#81D4FA" rx="1" />
      <circle cx="18" cy="44" r="5" fill="#37474F" />
      <circle cx="42" cy="44" r="5" fill="#37474F" />
    </svg>
  );
}

function TrainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="18" width="36" height="24" fill="#E53935" stroke="#B71C1C" strokeWidth="1.5" rx="3" />
      <rect x="16" y="22" width="10" height="8" fill="#81D4FA" rx="1" />
      <rect x="30" y="22" width="14" height="8" fill="#81D4FA" rx="1" />
      <circle cx="20" cy="45" r="4" fill="#37474F" />
      <circle cx="40" cy="45" r="4" fill="#37474F" />
      <rect x="22" y="10" width="6" height="8" fill="#78909C" />
    </svg>
  );
}

function ShipIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Hull */}
      <path d="M10 38 L15 48 L45 48 L50 38 Z" fill="#37474F" stroke="#263238" strokeWidth="1.5" />
      {/* Cabins */}
      <rect x="22" y="24" width="16" height="14" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="1.5" rx="1" />
      <rect x="26" y="16" width="8" height="8" fill="#EF5350" rx="1" />
      {/* Water */}
      <rect x="5" y="50" width="50" height="6" fill="#29B6F6" rx="2" />
    </svg>
  );
}

function AeroplaneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 8 L34 24 L52 30 L52 35 L34 32 L30 48 L26 32 L8 35 L8 30 L26 24 Z" fill="#90A4AE" stroke="#37474F" strokeWidth="1.5" />
      <circle cx="30" cy="20" r="3" fill="#81D4FA" />
    </svg>
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
    title: 'Natural & Man-Made Features 🌳',
    text: 'A locality has natural features like rivers, hills, and trees that exist without humans, and man-made features like roads, buildings, and bridges built by people!',
    emoji: '🏞️',
    bgColor: 'from-cyan-400 to-blue-500',
    spoken: 'A locality has natural features like rivers, hills, and trees, and man-made features like roads and buildings built by people!',
  },
  {
    title: 'Positive & Negative Effects ⚖️',
    text: 'Man-made changes like building roads give better transport and shelter, but clearing forests or filling ponds causes animals to lose homes and makes areas hotter!',
    emoji: '🏗️',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'Man-made changes bring both positive effects like better transport and negative effects like loss of trees and animal homes.',
  },
  {
    title: 'Types of Houses & Shelter 🏠',
    text: 'We need shelter for safety from weather and wild animals! Kutcha houses use mud and thatch in villages, while pucca houses use bricks and cement in cities.',
    emoji: '🛖',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'We need shelter for safety from weather. Kutcha houses use mud and thatch, while pucca houses use bricks and cement.',
  },
  {
    title: 'Ways of Communication 💌',
    text: 'Communication connects people! We send letters through post offices, talk on telephones and mobile phones, and send instant emails over the internet!',
    emoji: '📱',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Communication connects people! We send letters through post offices, talk on phones, and send instant emails over the internet.',
  },
  {
    title: 'Modes of Transport 🚂',
    text: 'Transport moves people and goods! Road transport uses buses and cars, rail transport uses trains, water transport uses ships, and air transport uses aeroplanes!',
    emoji: '✈️',
    bgColor: 'from-purple-400 to-pink-500',
    spoken: 'Transport moves people and goods across four modes: road, rail, water, and air!',
  },
];

// ─── Challenges ───────────────────────────────────────────────

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
    question: 'Which of these is a NATURAL feature of a locality?',
    answer: 'A river',
    options: ['A river', 'A road', 'A building'],
    hint: 'Think: which one exists in nature without being built by people?',
    misconception: 'A river is a natural feature because it flows in nature without human building! Roads and buildings are man-made features constructed by people.',
  },
  {
    type: 'sort',
    question: 'Drag each feature to Natural or Man-Made!',
    answer: 'sort',
    options: [],
    hint: 'Rivers and hills are natural. Roads and buildings are man-made!',
    misconception: 'Natural features exist without people (rivers, hills). Man-made features are constructed by people (roads, buildings, bridges)!',
    sortItems: [
      { id: 'river', label: 'River', icon: 'river', correctBin: 'natural' },
      { id: 'hill', label: 'Hill', icon: 'natural', correctBin: 'natural' },
      { id: 'road', label: 'Road', icon: 'road', correctBin: 'manmade' },
      { id: 'building', label: 'Building', icon: 'building', correctBin: 'manmade' },
    ],
    bins: [
      { id: 'natural', label: 'Natural Feature 🌿', color: '#22C55E' },
      { id: 'manmade', label: 'Man-Made Feature 🏗️', color: '#3B82F6' },
    ],
  },
  {
    type: 'identify',
    question: 'What is a NEGATIVE effect of cutting down forests to build roads?',
    answer: 'Birds and animals lose their homes',
    options: ['Birds and animals lose their homes', 'People get better transport', 'Children get a place to play'],
    hint: 'Think about what happens to the wildlife when trees are cut down.',
    misconception: 'When forests are cleared, birds and animals lose their homes! Better transport is a positive effect, not a negative one.',
  },
  {
    type: 'sort',
    question: 'Drag each change to Positive or Negative effect!',
    answer: 'sort',
    options: [],
    hint: 'Better transport and shelter are positive. Loss of trees and animal homes are negative!',
    misconception: 'Man-made changes bring both sides: positive effects give transport and shelter, while negative effects include loss of trees and wildlife habitats.',
    sortItems: [
      { id: 'transport', label: 'Better roads & transport', icon: 'road', correctBin: 'positive' },
      { id: 'shelter', label: 'Houses for shelter', icon: 'house', correctBin: 'positive' },
      { id: 'loss-trees', label: 'Loss of trees & habitats', icon: 'tree-cut', correctBin: 'negative' },
      { id: 'hotter-area', label: 'Area gets hotter', icon: 'tree-cut', correctBin: 'negative' },
    ],
    bins: [
      { id: 'positive', label: 'Positive Effect ✅', color: '#22C55E' },
      { id: 'negative', label: 'Negative Effect ⚠️', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Why do humans need SHELTER?',
    answer: 'To protect from rain, heat, cold, and wild animals',
    options: ['To protect from rain, heat, cold, and wild animals', 'To show off wealth', 'To store furniture only'],
    hint: 'Think about what weather and dangers a house protects you from.',
    misconception: 'Shelter is essential to protect us from rain, heat, cold, and wild animals! It is not just for furniture or showing off.',
  },
  {
    type: 'sort',
    question: 'Drag each house to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Kutcha uses mud and thatch. Pucca uses bricks and cement. Stilts keep out floods!',
    misconception: 'Kutcha houses are temporary (mud/thatch), pucca houses are permanent (bricks/cement), and stilt houses stand on poles to stay safe from flood water.',
    sortItems: [
      { id: 'kutcha', label: 'Kutcha House (Mud)', icon: 'hut', correctBin: 'bin-kutcha' },
      { id: 'pucca', label: 'Pucca House (Bricks)', icon: 'house', correctBin: 'bin-pucca' },
      { id: 'stilt', label: 'Stilt House (Floods)', icon: 'stilt', correctBin: 'bin-stilt' },
    ],
    bins: [
      { id: 'bin-kutcha', label: 'Kutcha (Mud/Thatch)', color: '#A1887F' },
      { id: 'bin-pucca', label: 'Pucca (Bricks/Cement)', color: '#3B82F6' },
      { id: 'bin-stilt', label: 'Stilt (On Poles)', color: '#00ACC1' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is the FASTEST mode of communication?',
    answer: 'Telephone / Mobile phone',
    options: ['Telephone / Mobile phone', 'Postal letter', 'Message carried by a person'],
    hint: 'Think: which one connects you instantly by voice across long distances?',
    misconception: 'A telephone or mobile phone is much faster than a postal letter because it connects you instantly by voice or internet messages across any distance!',
  },
  {
    type: 'sort',
    question: 'Drag each vehicle to its correct transport mode!',
    answer: 'sort',
    options: [],
    hint: 'Buses are road, trains are rail, ships are water, aeroplanes are air!',
    misconception: 'Transport has four modes: road (buses, cars), rail (trains), water (ships, boats), and air (aeroplanes, helicopters). Match each vehicle to where it travels!',
    sortItems: [
      { id: 'bus', label: 'Bus (Road)', icon: 'bus', correctBin: 'road' },
      { id: 'train', label: 'Train (Rail)', icon: 'train', correctBin: 'rail' },
      { id: 'ship', label: 'Ship (Water)', icon: 'ship', correctBin: 'water' },
      { id: 'plane', label: 'Aeroplane (Air)', icon: 'plane', correctBin: 'air' },
    ],
    bins: [
      { id: 'road', label: 'Road Transport 🚌', color: '#F59E0B' },
      { id: 'rail', label: 'Rail Transport 🚂', color: '#EF4444' },
      { id: 'water', label: 'Water Transport 🚢', color: '#3B82F6' },
      { id: 'air', label: 'Air Transport ✈️', color: '#8B5CF6' },
    ],
  },
];

// ─── Postman Prakash Mascot ───────────────────────────────────

function PostmanPrakash({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-orange-400"
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
        <svg width="75" height="85" viewBox="0 0 75 85">
          {/* Postman Khaki Cap */}
          <ellipse cx="37" cy="15" rx="18" ry="7" fill="#D4A373" stroke="#A98467" strokeWidth="1.5" />
          <rect x="25" y="12" width="24" height="6" fill="#CCD5AE" rx="2" />
          {/* Head */}
          <circle cx="37" cy="26" r="13" fill="#F4A261" stroke="#E76F51" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="32" cy="24" r="2" fill="#264653" />
          <circle cx="42" cy="24" r="2" fill="#264653" />
          {/* Smile */}
          <path d="M33 30 Q37 34 41 30" stroke="#264653" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Khaki Uniform Body */}
          <path d="M22 42 L25 68 L50 68 L53 42 Z" fill="#E9C46A" stroke="#B5838D" strokeWidth="1.5" rx="3" />
          {/* Mail Bag Strap & Bag */}
          <path d="M22 45 L50 60" stroke="#8D6E63" strokeWidth="3" />
          <rect x="42" y="55" width="18" height="15" fill="#A1887F" rx="3" stroke="#5D4037" strokeWidth="1" />
          {/* Letter sticking out */}
          <rect x="45" y="50" width="10" height="8" fill="white" stroke="#B0BEC5" strokeWidth="1" />
          {/* Feet */}
          <ellipse cx="30" cy="74" rx="5" ry="3" fill="#3E2723" />
          <ellipse cx="44" cy="74" rx="5" ry="3" fill="#3E2723" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Town & Transport Scene Background ────────────────────────

function TownScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="town-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="40%" stopColor="#3B82F6" />
            <stop offset="80%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#town-sky)" />
      </svg>
      {/* Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27" cy="27" r="16" fill="#FBBF24" opacity="0.9" />
          <circle cx="27" cy="27" r="11" fill="#F59E0B" />
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-10 left-1/4 opacity-70" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="65" height="30" viewBox="0 0 65 30">
          <ellipse cx="20" cy="18" rx="15" ry="10" fill="white" />
          <ellipse cx="38" cy="14" rx="18" ry="12" fill="white" />
          <ellipse cx="50" cy="18" rx="12" ry="8" fill="white" />
        </svg>
      </motion.div>
      {/* Road at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-slate-700 border-t-4 border-yellow-400" />
      <div className="absolute bottom-12 left-0 right-0 flex justify-around opacity-70">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-12 h-2 bg-yellow-300 rounded" />
        ))}
      </div>
    </div>
  );
}

// ─── Render Sort Icon Helper ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'river': return <NaturalFeatureIcon size={size} />;
    case 'hill': return <NaturalFeatureIcon size={size} />;
    case 'road': return <BusIcon size={size} />;
    case 'building': return <ManMadeFeatureIcon size={size} />;
    case 'house': return <HouseIcon size={size} />;
    case 'hut': return <HutIcon size={size} />;
    case 'stilt': return <StiltHouseIcon size={size} />;
    case 'tree-cut': return <TreeCutIcon size={size} />;
    case 'bus': return <BusIcon size={size} />;
    case 'train': return <TrainIcon size={size} />;
    case 'ship': return <ShipIcon size={size} />;
    case 'plane': return <AeroplaneIcon size={size} />;
    default: return <ManMadeFeatureIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-indigo-200 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} p-2`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
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
  isHovering: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}25`,
        borderColor: color,
      }}
    >
      <span className="text-xs sm:text-sm font-extrabold text-gray-900 text-center px-2">{label}</span>
      <div className="absolute bottom-2 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Drop Here</div>
    </div>
  );
}

// ─── Main Game Component ─��────────────────────────────────────

export interface ChangesTransportGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ChangesTransportGame({ width = 720, height = 560, onComplete }: ChangesTransportGameProps) {
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
      const numItems = currentChallenge.sortItems.length;
      const startX = Math.max(20, (width - numItems * 130) / 2);
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: startX + idx * 130, y: height - 170 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, width, height]);

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
      const msg = "Great job! You understand changes and transport!";
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
      const compMsg = "Wonderful! You are a brilliant EVS star!";
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
    const binWidth = Math.min(150, (width - 60) / numBins);
    const binHeight = 90;
    const startX = (width - (numBins * binWidth + (numBins - 1) * 15)) / 2;
    const binY = 160;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 15);
      const by = binY;
      if (x >= bx && x <= bx + binWidth && y >= by && y <= by + binHeight) {
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
        const msg = "Fantastic! You sorted the transport and changes perfectly!";
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
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 font-sans flex flex-col items-center justify-between"
      style={{ width, height }}
    >
      <TownScene width={width} height={height} />
      <PostmanPrakash mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full px-6 py-3 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white font-extrabold px-3 py-1 rounded-full text-xs shadow">
            Class 4 EVS
          </div>
          <span className="text-white font-bold text-sm tracking-wide">
            {screen === 'teaching' ? 'Learning Adventure' : `Challenge ${challengeIdx + 1} of ${CHALLENGES.length}`}
          </span>
        </div>
        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <StarRow count={Math.min(3, Math.floor(score / 25) + 1)} total={3} />
            <div className="text-white font-black text-sm bg-indigo-500/80 px-3 py-1 rounded-full shadow">
              Score: {score}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center p-6">
        {screen === 'teaching' ? (
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className={`w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl text-white flex flex-col items-center text-center border-4 border-white/30`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 tracking-wide drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed mb-6 drop-shadow-sm">{TEACHING_SLIDES[slideIdx].text}</p>
            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(slideIdx - 1);
                }}
                disabled={slideIdx === 0}
                className={`px-5 py-2 rounded-xl font-bold text-sm bg-white/20 hover:bg-white/30 transition ${slideIdx === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                Previous
              </button>
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, idx) => (
                  <div key={idx} className={`w-3 h-3 rounded-full ${idx === slideIdx ? 'bg-white scale-125' : 'bg-white/40'} transition-all`} />
                ))}
              </div>
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(slideIdx + 1);
                  } else {
                    audioManager.play('success');
                    setScreen('play');
                  }
                }}
                className="px-6 py-2 rounded-xl font-extrabold text-sm bg-white text-indigo-700 shadow-lg hover:bg-indigo-50 transition"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next'}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl flex flex-col items-center justify-center">
            {/* Question Card */}
            <motion.div
              key={challengeIdx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-indigo-300 flex flex-col items-center text-center mb-6"
            >
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4">{currentChallenge.question}</h3>

              {/* Multiple Choice Challenge */}
              {currentChallenge.type === 'identify' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                  {currentChallenge.options.map(opt => {
                    const isSelected = selectedOpt === opt;
                    const isCorrectAns = opt === currentChallenge.answer;
                    let btnStyle = 'bg-indigo-50 border-indigo-200 text-indigo-900 hover:bg-indigo-100';
                    if (selectedOpt) {
                      if (isCorrectAns) btnStyle = 'bg-green-500 border-green-600 text-white font-bold shadow-lg scale-105';
                      else if (isSelected) btnStyle = 'bg-red-500 border-red-600 text-white font-bold';
                      else btnStyle = 'bg-gray-100 border-gray-200 text-gray-400 opacity-50';
                    }
                    return (
                      <button
                        key={opt}
                        onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                        disabled={selectedOpt === currentChallenge.answer}
                        className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all duration-200 flex items-center justify-center ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sort Challenge */}
              {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
                <div className="w-full h-56 relative flex items-center justify-center">
                  {/* Bins */}
                  <div className="absolute top-2 left-0 right-0 flex justify-around px-4">
                    {currentChallenge.bins.map((bin, idx) => {
                      const numBins = currentChallenge.bins!.length;
                      const binWidth = Math.min(150, (width - 60) / numBins);
                      const startX = (width - (numBins * binWidth + (numBins - 1) * 15)) / 2;
                      const bx = startX + idx * (binWidth + 15);
                      return (
                        <SortBin
                          key={bin.id}
                          label={bin.label}
                          color={bin.color}
                          x={bx - (width - 640) / 2}
                          y={10}
                          width={binWidth}
                          height={90}
                          isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                        />
                      );
                    })}
                  </div>

                  {/* Draggable Items */}
                  {currentChallenge.sortItems.map(item => {
                    const pos = itemPositions[item.id] || { x: 50, y: 150 };
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
            </motion.div>

            {/* Hint Button */}
            {!selectedOpt && currentChallenge.type === 'identify' && (
              <button
                onClick={handleShowHint}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold rounded-full shadow-lg transition flex items-center gap-2 text-sm"
              >
                💡 Need a Hint?
              </button>
            )}

            {/* Next Challenge Button for MCQ when answered correctly */}
            {selectedOpt === currentChallenge.answer && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-base rounded-2xl shadow-xl hover:from-green-600 hover:to-emerald-700 transition"
              >
                Next Challenge 🚀
              </motion.button>
            )}

            {/* Next Challenge Button for Sort when all items placed */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-base rounded-2xl shadow-xl hover:from-green-600 hover:to-emerald-700 transition mt-4"
              >
                Next Challenge 🚀
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Feedback overlays */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
