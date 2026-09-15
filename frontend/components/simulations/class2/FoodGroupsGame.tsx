'use client';

/**
 * FoodGroupsGame — Learn about food categories, functions, and healthy vs junk food
 *
 * CISCE Nodes: c2_bio_002 (Food categories), c2_bio_003 (Food functions), c2_bio_004 (Healthy and junk food)
 * Enrichment: c2_biology_enrichment_part2-4
 *
 * ELI5: "Food is like a team with five groups. Cereals give you energy, like rice and wheat.
 *   Dals help you grow strong, like moong and toor. Fruits and vegetables are full of vitamins
 *   to keep you healthy, like apple, banana, carrot, and spinach. Milk makes your bones strong.
 *   Healthy food builds our body, while junk food has too much sugar, salt, and fat!"
 *
 * Misconceptions (from enrichment):
 *   1. "Only raw milk counts as a milk product" → "No! Paneer, curd, cheese, butter, and ghee are all milk products!"
 *   2. "Sweet items are always fruits and green items are always vegetables" → "No! Spinach is a green vegetable, but green mango is a fruit!"
 *   3. "Vitamins are medicines that the doctor gives" → "No! Vitamins are useful nutrients found in fresh fruits and vegetables!"
 *   4. "Only sweet foods give energy" → "No! Cereals like rice, wheat, and bajra are the true energy-giving foods!"
 *   5. "Chips are healthy because they are made from potatoes" → "No! Chips are fried and salted junk food with very little nutrition!"
 *
 * Story: "Help Aunty Annapoorna sort food into the right categories, discover food functions,
 *   and pick healthy foods for a strong, happy body!"
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
    title: 'Five Big Food Groups! 🌾',
    text: 'Food is sorted into five categories! Cereals give us energy (rice, wheat). Dals give us protein to grow (toor, moong). Fruits and vegetables give vitamins to stay healthy (apple, carrot)! Milk makes bones strong!',
    emoji: '🌾',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Food is sorted into five categories: cereals, dals, fruits, vegetables, and milk products!',
  },
  {
    title: 'Cereals & Dals — Energy & Growth! 🍚',
    text: 'Cereals like rice and wheat give us power to run and play! Dals like moong and toor are protein-rich seeds that build strong muscles and repair our body!',
    emoji: '🍚',
    bgColor: 'from-yellow-400 to-amber-500',
    spoken: 'Cereals give us energy to play, and dals help build our muscles and body!',
  },
  {
    title: 'Fruits & Vegetables — Our Shield! 🍎',
    text: 'Fruits like mango and banana, and vegetables like spinach and carrots, give us vitamins and minerals. They act like a shield against germs to keep us healthy!',
    emoji: '🍎',
    bgColor: 'from-red-400 to-pink-500',
    spoken: 'Fruits and vegetables give us vitamins and minerals to protect us from getting sick!',
  },
  {
    title: 'Milk & Milk Products! 🥛',
    text: 'Milk comes from animals and is packed with calcium! Curd, paneer, cheese, butter, and ghee are all wonderful milk products that make our bones and teeth strong!',
    emoji: '🥛',
    bgColor: 'from-blue-400 to-cyan-500',
    spoken: 'Milk and milk products like curd and paneer give us calcium for strong bones and teeth!',
  },
  {
    title: 'Healthy Food vs Junk Food! 🥗🍔',
    text: 'Healthy food like fresh fruits, dal, and roti gives our body rich nutrition. Junk food like chips, cola, and candy has too much sugar, salt, and fat — eat it rarely!',
    emoji: '🥗',
    bgColor: 'from-green-400 to-emerald-500',
    spoken: 'Healthy food gives us nutrition, but junk food has too much sugar, salt, and fat!',
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

// ─── Challenges (8 progressive: identify → sort) ──────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Which of these is a CEREAL (food grain for energy)?',
    answer: 'Rice',
    options: ['Rice', 'Apple', 'Milk'],
    hint: 'Cereals are grains that give us energy! Think: what is eaten as a grain like rice or wheat?',
    misconception: 'Rice is a cereal grain that gives us energy! Apple is a fruit and milk is a dairy product. Cereals are energy-giving grains, not fruits or milk!',
  },
  {
    type: 'identify',
    question: 'Which of these is a DAL (pulse for body building)?',
    answer: 'Moong dal',
    options: ['Moong dal', 'Carrot', 'Bread'],
    hint: 'Dals are dried seeds of plants packed with protein! Think: toor, moong, or chana!',
    misconception: 'Moong dal is a pulse rich in protein for building muscles! Carrot is a root vegetable and bread is baked wheat. Dals are dried protein seeds!',
  },
  {
    type: 'sort',
    question: 'Drag each food to its correct category group!',
    answer: 'sort',
    options: [],
    hint: 'Match each item to its family: rice is cereal, moong is dal, apple is fruit, carrot is vegetable, milk is dairy!',
    misconception: 'Remember your categories! Rice is a cereal, moong dal is a pulse, apple is a fruit, carrot is a vegetable, and milk is a dairy product!',
    sortItems: [
      { id: 'rice', label: 'Rice', icon: 'cereal', correctBin: 'cereal' },
      { id: 'dal', label: 'Moong Dal', icon: 'dal', correctBin: 'dal' },
      { id: 'apple', label: 'Apple', icon: 'fruit', correctBin: 'fruit' },
      { id: 'carrot', label: 'Carrot', icon: 'vegetable', correctBin: 'vegetable' },
      { id: 'milk', label: 'Milk', icon: 'milk', correctBin: 'milk' },
    ],
    bins: [
      { id: 'cereal', label: 'Cereal 🌾', color: '#D97706' },
      { id: 'dal', label: 'Dal 🫘', color: '#B45309' },
      { id: 'fruit', label: 'Fruit 🍎', color: '#DC2626' },
      { id: 'vegetable', label: 'Vegetable 🥕', color: '#16A34A' },
      { id: 'milk', label: 'Milk 🥛', color: '#2563EB' },
    ],
  },
  {
    type: 'identify',
    question: 'Which food gives us ENERGY to work and play?',
    answer: 'Rice and chapati',
    options: ['Rice and chapati', 'Dal', 'Amla'],
    hint: 'Energy-giving foods are cereals like rice and wheat chapatis! They act like fuel for our body.',
    misconception: 'Rice and chapati are cereals that give us steady energy! Dal builds the body with protein, and amla provides immunity vitamins, but cereals are the main energy source!',
  },
  {
    type: 'identify',
    question: 'Which food helps BUILD our muscles and body?',
    answer: 'Dal and milk',
    options: ['Dal and milk', 'Rice', 'Chips'],
    hint: 'Body-building foods contain protein! Think of pulses (dals) and animal foods like milk and paneer.',
    misconception: 'Dal and milk are body-building foods full of protein and calcium! Rice gives energy, and chips are junk food. Protein repairs cells and helps us grow tall!',
  },
  {
    type: 'identify',
    question: 'Which food gives vitamins to PROTECT us from germs?',
    answer: 'Fresh fruits and vegetables',
    options: ['Fresh fruits and vegetables', 'Burger', 'Cola'],
    hint: 'Protective foods are fresh fruits and vegetables like guavas, carrots, and spinach!',
    misconception: 'Fresh fruits and vegetables provide vitamins and minerals that act like a shield against illness! Burgers and cola are junk food with no vitamins!',
  },
  {
    type: 'sort',
    question: 'Drag each food to Healthy Food or Junk Food!',
    answer: 'sort',
    options: [],
    hint: 'Fresh fruits, vegetables, milk, and home-cooked meals are healthy! Fried chips and sweet cola are junk!',
    misconception: 'Healthy foods (apples, dal, milk) give us nutrition and vitamins. Junk foods (chips, cola, candy) have too much sugar, salt, and fat and can spoil our teeth!',
    sortItems: [
      { id: 'apple-h', label: 'Fresh Apple', icon: 'fruit', correctBin: 'healthy' },
      { id: 'milk-h', label: 'Milk', icon: 'milk', correctBin: 'healthy' },
      { id: 'chips-j', label: 'Fried Chips', icon: 'junk', correctBin: 'junk' },
      { id: 'cola-j', label: 'Cola Drink', icon: 'junk', correctBin: 'junk' },
    ],
    bins: [
      { id: 'healthy', label: 'Healthy Food 🥗', color: '#16A34A' },
      { id: 'junk', label: 'Junk Food 🍔', color: '#DC2626' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each food to its correct BODY FUNCTION!',
    answer: 'sort',
    options: [],
    hint: 'Cereals give energy, dals and milk build the body, fruits and vegetables protect us!',
    misconception: 'Every food has a job! Rice gives energy, dal and milk build the body, and fruits and vegetables protect against sickness!',
    sortItems: [
      { id: 'rice-e', label: 'Rice', icon: 'cereal', correctBin: 'energy' },
      { id: 'dal-b', label: 'Moong Dal', icon: 'dal', correctBin: 'building' },
      { id: 'spinach-p', label: 'Spinach', icon: 'vegetable', correctBin: 'protective' },
      { id: 'milk-b', label: 'Milk', icon: 'milk', correctBin: 'building' },
    ],
    bins: [
      { id: 'energy', label: 'Energy ���', color: '#D97706' },
      { id: 'building', label: 'Building 🧱', color: '#2563EB' },
      { id: 'protective', label: 'Protective 🛡️', color: '#16A34A' },
    ],
  },
];

// ─── Aunty Annapoorna Mascot ──────────────────────────────────

function AuntyAnnapoorna({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-300"
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
          <defs>
            <linearGradient id="saree-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="basket-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>
          {/* Body / Saree */}
          <path d="M22 55 Q15 75, 10 88 L65 88 Q60 75, 53 55 Z" fill="url(#saree-grad)" stroke="#065F46" strokeWidth="1.5" />
          {/* Blouse */}
          <rect x="25" y="42" width="25" height="18" fill="#F59E0B" rx="4" />
          {/* Face */}
          <circle cx="37" cy="30" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          {/* Gray hair bun */}
          <circle cx="37" cy="14" r="7" fill="#9CA3AF" />
          {/* Bindi */}
          <circle cx="37" cy="26" r="2" fill="#DC2626" />
          {/* Eyes */}
          <circle cx="32" cy="30" r="2" fill="#1F2937" />
          <circle cx="42" cy="30" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M33 36 Q37 40 41 36" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Basket in hands */}
          <path d="M20 60 L25 72 L50 72 L55 60 Z" fill="url(#basket-grad)" stroke="#78350F" strokeWidth="1" />
          <ellipse cx="37" cy="60" rx="17" ry="5" fill="#F59E0B" />
          {/* Apple and carrot in basket */}
          <circle cx="33" cy="58" r="4" fill="#DC2626" />
          <path d="M40 60 L44 54 L46 56 Z" fill="#16A34A" />
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

// ─── Kitchen Scene Background ─────────────────────────────────

function KitchenScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Wall gradient (warm kitchen yellow) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 50%, #F59E0B 100%)' }} />
      {/* Window showing blue sky */}
      <div className="absolute top-6 left-8 w-28.5 h-36 bg-sky-200 border-4 border-amber-800 rounded-t-xl overflow-hidden shadow-inner" style={{ width: 110, height: 140 }}>
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200" />
        {/* Sun */}
        <circle cx="80" cy="40" r="14" fill="#FACC15" />
        {/* Cloud */}
        <ellipse cx="40" cy="50" rx="18" ry="9" fill="white" opacity="0.8" />
        {/* Window pane crosses */}
        <div className="absolute inset-0 border-r-2 border-b-2 border-amber-800 opacity-60" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }} />
      </div>
      {/* Wooden kitchen counter at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-amber-900 border-t-8 border-amber-950" />
      <div className="absolute bottom-24 left-0 right-0 h-4 bg-amber-800 opacity-80" />
      {/* Thali plate on counter */}
      <div className="absolute bottom-6 left-12 opacity-85">
        <svg width="90" height="45" viewBox="0 0 90 45">
          <ellipse cx="45" cy="22" rx="42" ry="18" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
          <ellipse cx="45" cy="22" rx="36" ry="14" fill="#F3F4F6" />
          {/* Small bowls on thali */}
          <ellipse cx="30" cy="20" rx="9" ry="6" fill="#FBBF24" />
          <ellipse cx="60" cy="20" rx="9" ry="6" fill="#EF4444" />
        </svg>
      </div>
    </div>
  );
}

// ─── Topic-Specific SVG Object Components ─────────────────────

function CerealIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="38" rx="20" ry="12" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
      <ellipse cx="30" cy="35" rx="16" ry="8" fill="#FDE68A" />
      {/* Rice grains inside */}
      <ellipse cx="24" cy="35" rx="3" ry="1.5" fill="white" transform="rotate(-20 24 35)" />
      <ellipse cx="30" cy="36" rx="3" ry="1.5" fill="white" transform="rotate(10 30 36)" />
      <ellipse cx="36" cy="34" rx="3" ry="1.5" fill="white" transform="rotate(-10 36 34)" />
    </svg>
  );
}

function DalIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="38" rx="20" ry="12" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
      <ellipse cx="30" cy="35" rx="16" ry="8" fill="#F59E0B" />
      {/* Yellow dal lentils */}
      <circle cx="23" cy="35" r="2.5" fill="#FEF3C7" />
      <circle cx="30" cy="37" r="2.5" fill="#FEF3C7" />
      <circle cx="37" cy="35" r="2.5" fill="#FEF3C7" />
      <circle cx="27" cy="33" r="2.5" fill="#FEF3C7" />
    </svg>
  );
}

function FruitIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Apple */}
      <circle cx="22" cy="36" r="12" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
      <path d="M22 22 Q24 18, 27 20" stroke="#78350F" strokeWidth="2" fill="none" />
      <path d="M26 18 Q30 16, 28 22" fill="#16A34A" />
      {/* Banana */}
      <path d="M35 30 Q45 25, 52 38 Q45 42, 38 36 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
    </svg>
  );
}

function VegetableIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Carrot */}
      <path d="M22 25 L35 48 L40 45 L28 22 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
      <path d="M25 22 Q20 15, 18 12 Q24 16, 28 22" fill="#16A34A" />
      {/* Tomato */}
      <circle cx="44" cy="40" r="10" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
      <path d="M44 30 Q45 27, 48 29" fill="#16A34A" />
    </svg>
  );
}

function MilkIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Glass */}
      <path d="M20 20 L24 48 L36 48 L40 20 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
      {/* Milk inside */}
      <path d="M22 26 L24 46 L36 46 L38 26 Z" fill="white" />
      {/* Straw */}
      <line x1="38" y1="12" x2="28" y2="35" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function JunkFoodIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Burger */}
      <ellipse cx="30" cy="25" rx="16" ry="7" fill="#F59E0B" />
      <rect x="15" y="25" width="30" height="5" fill="#84CC16" rx="2" />
      <rect x="14" y="30" width="32" height="6" fill="#B45309" rx="2" />
      <ellipse cx="30" cy="38" rx="16" ry="7" fill="#D97706" />
    </svg>
  );
}

// ─── Render Helper for Sort Item Icons ────────────────────────

function renderFoodIcon(iconName: string, size: number = 48) {
  if (iconName === 'cereal') return <CerealIcon size={size} />;
  if (iconName === 'dal') return <DalIcon size={size} />;
  if (iconName === 'fruit') return <FruitIcon size={size} />;
  if (iconName === 'vegetable') return <VegetableIcon size={size} />;
  if (iconName === 'milk') return <MilkIcon size={size} />;
  if (iconName === 'junk') return <JunkFoodIcon size={size} />;
  return <CerealIcon size={size} />;
}

// ─── Sort Card Component ──────────────────────────────────────

function SortCard({ item, x, y, placed, onDragStart, onDragEnd }: {
  item: { id: string; label: string; icon: string; correctBin: string };
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
  return (
    <Draggable
      id={item.id}
      x={x}
      y={y}
      draggable={!placed}
      placed={placed}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      width={110}
      height={95}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${
          placed ? 'opacity-40 bg-gray-100' : 'bg-white'
        } p-2`}
        style={{ width: 110, height: 95 }}
      >
        {renderFoodIcon(item.icon, 44)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 truncate max-w-full">
          {item.label}
        </span>
      </div>
    </Draggable>
  );
}

// ─── Main Game Component ─────────────────────────────────────

export interface FoodGroupsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function FoodGroupsGame({ width = 720, height = 560, onComplete }: FoodGroupsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>('Welcome! Let us learn about healthy food and food groups!');

  // Sort challenge state
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number; placed: boolean }>>({});

  const challenge = CHALLENGES[challengeIdx];
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && challenge) {
        setHintMsg(challenge.hint);
        setMascotMood('thinking');
        audioManager.play('hint');
      }
    }, 10000);
  }, [screen, challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Initialize sort item positions
  useEffect(() => {
    if (challenge && challenge.type === 'sort' && challenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number; placed: boolean }> = {};
      challenge.sortItems.forEach((item, index) => {
        // Arrange items horizontally at the bottom
        const startX = width / 2 - (challenge.sortItems!.length * 60);
        initialPos[item.id] = {
          x: Math.max(20, startX + index * 125),
          y: height - 130,
          placed: false,
        };
      });
      setItemPositions(initialPos);
    }
  }, [challengeIdx, challenge, width, height]);

  // Handle teaching slide navigation
  const handleNextSlide = () => {
    audioManager.play('tap');
    if (currentSlide < TEACHING_SLIDES.length - 1) {
      const next = currentSlide + 1;
      setCurrentSlide(next);
      setSpeakingText(TEACHING_SLIDES[next].spoken);
      speechManager.speak(TEACHING_SLIDES[next].spoken);
    } else {
      audioManager.play('whoosh');
      setScreen('play');
      setSpeakingText('Let us start our food game! Pick the correct answer!');
      speechManager.speak('Let us start our food game! Pick the correct answer!');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (currentSlide > 0) {
      const prev = currentSlide - 1;
      setCurrentSlide(prev);
      setSpeakingText(TEACHING_SLIDES[prev].spoken);
      speechManager.speak(TEACHING_SLIDES[prev].spoken);
    }
  };

  // Handle multiple-choice answer
  const handleAnswer = (option: string, e: React.MouseEvent) => {
    resetInactivityTimer();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (option === challenge.answer) {
      audioManager.play('success');
      setSparklePos({ x, y });
      setMascotMood('celebrate');
      setSpeakingText('Wonderful! That is correct!');
      speechManager.speak('Wonderful! That is correct!');
      setSuccessMsg('Fantastic job! You got it right!');
      const newStars = stars + 1;
      setStars(newStars);

      setTimeout(() => {
        if (challengeIdx < CHALLENGES.length - 1) {
          setChallengeIdx(challengeIdx + 1);
          setMascotMood('happy');
          setSpeakingText('Now try this next challenge!');
          speechManager.speak('Now try this next challenge!');
        } else {
          setShowConfetti(true);
          audioManager.play('celebration');
          setSpeakingText('You are a true Food Hero!');
          speechManager.speak('You are a true Food Hero!');
          const finalScore = Math.max(0, 100 - errors * 5);
          if (onComplete) onComplete(finalScore);
        }
      }, 1500);
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setSpeakingText(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMsg(challenge.misconception);
    }
  };

  // Handle drag end for sort challenges
  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    if (!challenge || !challenge.sortItems || !challenge.bins) return false;

    const item = challenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bins area (top/middle of screen)
    // Bins are roughly around y: 150 to 320
    if (y >= 120 && y <= 350) {
      // Determine nearest bin based on x coordinate
      const binWidth = width / challenge.bins.length;
      const binIndex = Math.floor(x / binWidth);
      const targetBin = challenge.bins[Math.min(binIndex, challenge.bins.length - 1)];

      if (targetBin && targetBin.id === item.correctBin) {
        audioManager.play('drop-correct');
        setItemPositions(prev => ({
          ...prev,
          [id]: { x: targetBin.id === 'cereal' ? 50 : 200, y: 220, placed: true },
        }));

        // Check if all items are placed
        const updated = { ...itemPositions, [id]: { x: 0, y: 0, placed: true } };
        const allPlaced = challenge.sortItems.every(i => updated[i.id]?.placed);

        if (allPlaced) {
          audioManager.play('success');
          setMascotMood('celebrate');
          setSpeakingText('All items sorted correctly! Amazing!');
          speechManager.speak('All items sorted correctly! Amazing!');
          setSuccessMsg('Perfect sorting! You know your food groups!');
          const newStars = stars + 1;
          setStars(newStars);

          setTimeout(() => {
            if (challengeIdx < CHALLENGES.length - 1) {
              setChallengeIdx(challengeIdx + 1);
              setMascotMood('happy');
              setSpeakingText('Ready for the next challenge?');
              speechManager.speak('Ready for the next challenge?');
            } else {
              setShowConfetti(true);
              audioManager.play('celebration');
              setSpeakingText('You are a certified Food Hero!');
              speechManager.speak('You are a certified Food Hero!');
              const finalScore = Math.max(0, 100 - errors * 5);
              if (onComplete) onComplete(finalScore);
            }
          }, 1800);
        }
        return true;
      } else {
        audioManager.play('drop-wrong');
        setErrors(prev => prev + 1);
        setMascotMood('thinking');
        setSpeakingText(challenge.misconception);
        speechManager.speak(challenge.misconception);
        setHintMsg(challenge.misconception);
        return false;
      }
    }
    audioManager.play('drop-wrong');
    return false;
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-amber-50 flex flex-col items-center justify-between font-sans"
      style={{ width, height }}
    >
      {/* Background Kitchen Scene */}
      <KitchenScene width={width} height={height} />

      {/* Aunty Annapoorna Mascot */}
      <AuntyAnnapoorna mood={mascotMood} speaking={speakingText} />

      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-20 z-20 flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl px-4 py-2 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍲</span>
          <span className="font-extrabold text-amber-900 text-sm">Food Groups & Nutrition</span>
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && <StarRow count={stars} total={CHALLENGES.length} />}
          <button
            onClick={() => {
              audioManager.play('tap');
              setScreen(screen === 'teaching' ? 'play' : 'teaching');
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow transition"
          >
            {screen === 'teaching' ? 'Start Game 🎮' : 'Review Rules 📚'}
          </button>
        </div>
      </div>

      {/* ─── TEACHING SCREEN ──────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8 pt-20 pb-6">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[currentSlide].bgColor} text-white flex flex-col items-center text-center`}
          >
            <span className="text-5xl mb-3">{TEACHING_SLIDES[currentSlide].emoji}</span>
            <h2 className="text-xl font-extrabold mb-2">{TEACHING_SLIDES[currentSlide].title}</h2>
            <p className="text-sm font-medium leading-relaxed opacity-95">
              {TEACHING_SLIDES[currentSlide].text}
            </p>
          </motion.div>

          {/* Navigation dots & buttons */}
          <div className="flex items-center justify-between w-full max-w-lg mt-6 px-4">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className={`px-4 py-2 rounded-xl font-bold text-sm shadow transition ${
                currentSlide === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-amber-800 hover:bg-amber-100'
              }`}
            >
              ← Back
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentSlide ? 'bg-amber-600 scale-125' : 'bg-amber-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className="px-5 py-2 rounded-xl font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white shadow-lg transition"
            >
              {currentSlide === TEACHING_SLIDES.length - 1 ? 'Start Game 🚀' : 'Next →'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ──────────────────────────────────────── */}
      {screen === 'play' && challenge && (
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full pt-20 pb-6 px-6">
          {/* Question Box */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg w-full max-w-xl text-center border-2 border-amber-300">
            <div className="text-xs font-bold text-amber-600 mb-1">
              Challenge {challengeIdx + 1} of {CHALLENGES.length}
            </div>
            <h2 className="text-base font-extrabold text-gray-800">{challenge.question}</h2>
          </div>

          {/* Challenge Content */}
          {challenge.type === 'identify' && (
            <div className="flex flex-wrap items-center justify-center gap-4 my-auto w-full max-w-xl">
              {challenge.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={e => handleAnswer(opt, e)}
                  className="bg-white hover:bg-amber-50 border-3 border-amber-400 text-amber-900 font-extrabold text-sm px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 transition min-w-[160px] justify-center"
                >
                  <span className="text-2xl">
                    {opt.includes('Rice') || opt.includes('chapati') ? '🍚' : opt.includes('Apple') ? '🍎' : opt.includes('Milk') ? '🥛' : opt.includes('Moong') ? '🫘' : opt.includes('Carrot') ? '🥕' : opt.includes('Bread') ? '🍞' : opt.includes('Amla') ? '🍋' : opt.includes('Dal') ? '🥣' : opt.includes('Chips') ? '🍟' : opt.includes('Burger') ? '🍔' : opt.includes('Cola') ? '🥤' : '🥗'}
                  </span>
                  <span>{opt}</span>
                </motion.button>
              ))}
            </div>
          )}

          {challenge.type === 'sort' && challenge.sortItems && challenge.bins && (
            <div className="relative w-full flex-1 flex flex-col justify-between my-2">
              {/* Bins Drop Targets */}
              <div className="flex justify-around items-center w-full px-2 gap-2 mt-2">
                {challenge.bins.map(bin => (
                  <div
                    key={bin.id}
                    className="flex flex-col items-center justify-center rounded-2xl border-4 border-dashed border-amber-400 bg-white/70 backdrop-blur-sm p-3 shadow-md"
                    style={{ minWidth: 100, minHeight: 110, borderColor: bin.color }}
                  >
                    <span className="text-xs font-extrabold text-gray-800 text-center">{bin.label}</span>
                  </div>
                ))}
              </div>

              {/* Draggable Items */}
              <div className="relative w-full h-32 flex justify-center items-center">
                {challenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: 0, placed: false };
                  return (
                    <SortCard
                      key={item.id}
                      item={item}
                      x={pos.x}
                      y={pos.y}
                      placed={pos.placed}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Hint button */}
          <button
            onClick={() => {
              audioManager.play('hint');
              setHintMsg(challenge.hint);
              setMascotMood('thinking');
            }}
            className="text-xs font-bold text-amber-800 bg-amber-200/80 hover:bg-amber-300 px-4 py-2 rounded-xl shadow transition mt-2"
          >
            💡 Need a hint?
          </button>
        </div>
      )}

      {/* ─── Feedback & Overlays ──────────────────────────────── */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}
    </div>
  );
}
