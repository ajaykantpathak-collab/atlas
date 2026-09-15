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

// ─── Custom SVG Icons for Health, Food & Diseases ────────────────

function HealthyFoodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2" />
      <path d="M20 32 Q30 20, 40 32 Q40 42, 30 42 Q20 42, 20 32 Z" fill="#81C784" />
      <circle cx="25" cy="26" r="4" fill="#E53935" />
      <circle cx="35" cy="28" r="3" fill="#FFB300" />
      <circle cx="30" cy="36" r="3.5" fill="#43A047" />
    </svg>
  );
}

function JunkFoodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#FFEBEE" stroke="#E53935" strokeWidth="2" />
      <rect x="18" y="22" width="24" height="6" rx="3" fill="#FFCA28" />
      <rect x="20" y="28" width="20" height="8" rx="2" fill="#D7CCC8" />
      <rect x="18" y="36" width="24" height="6" rx="3" fill="#FFCA28" />
      <circle cx="30" cy="25" r="1.5" fill="#E65100" />
    </svg>
  );
}

function VitaminIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="22" y="15" width="16" height="30" rx="8" fill="#AB47BC" stroke="#7B1FA2" strokeWidth="2" />
      <path d="M22 30 L38 30 L38 43 C38 47, 34 47, 30 47 C26 47, 22 47, 22 43 Z" fill="#E1BEE7" />
      <text x="30" y="36" fontSize="12" fontWeight="bold" fill="#4A148C" textAnchor="middle">V</text>
    </svg>
  );
}

function MineralIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,10 48,22 42,44 18,44 12,22" fill="#90CAF9" stroke="#1565C0" strokeWidth="2" />
      <polygon points="30,16 42,24 38,40 22,40 18,24" fill="#E3F2FD" />
      <text x="30" y="34" fontSize="11" fontWeight="bold" fill="#0D47A1" textAnchor="middle">Fe</text>
    </svg>
  );
}

function FoodPyramidIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,10 50,48 10,48" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="2" />
      <line x1="20" y1="30" x2="40" y2="30" stroke="#FBC02D" strokeWidth="1.5" />
      <line x1="15" y1="39" x2="45" y2="39" stroke="#FBC02D" strokeWidth="1.5" />
      <text x="30" y="24" fontSize="9" fontWeight="bold" fill="#F57F17" textAnchor="middle">Fats</text>
      <text x="30" y="35" fontSize="9" fontWeight="bold" fill="#F57F17" textAnchor="middle">Protein</text>
      <text x="30" y="45" fontSize="9" fontWeight="bold" fill="#F57F17" textAnchor="middle">Grains</text>
    </svg>
  );
}

function HeartHealthIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 C30 50, 12 36, 12 24 C12 16, 18 12, 24 12 C28 12, 30 16, 30 16 C30 16, 32 12, 36 12 C42 12, 48 16, 48 24 C48 36, 30 50, 30 50 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
      <path d="M22 22 Q26 18, 30 22" stroke="#FFCDD2" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ExerciseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="15" r="6" fill="#388E3C" />
      <path d="M30 21 L30 38 M30 26 L20 32 M30 26 L40 32 M30 38 L22 50 M30 38 L38 50" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function FirstAidIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="14" y="20" width="32" height="26" rx="4" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
      <path d="M22 18 L38 18 L38 20 L22 20 Z" fill="#B71C1C" />
      <rect x="27" y="27" width="6" height="12" fill="#FFFFFF" />
      <rect x="24" y="30" width="12" height="6" fill="#FFFFFF" />
    </svg>
  );
}

function AppleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 15 C35 12, 42 16, 40 24 C44 26, 47 33, 44 42 C41 50, 35 52, 30 52 C25 52, 19 50, 16 42 C13 33, 16 26, 20 24 C18 16, 25 12, 30 15 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="1.5" />
      <path d="M30 15 Q33 8, 38 10" stroke="#795548" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="36" cy="11" rx="4" ry="2" fill="#4CAF50" transform="rotate(30 36 11)" />
    </svg>
  );
}

function BurgerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Top bun */}
      <path d="M15 26 C15 16, 45 16, 45 26 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="1.5" />
      {/* Patty */}
      <rect x="14" y="27" width="32" height="7" rx="3" fill="#5D4037" />
      {/* Cheese & Lettuce */}
      <path d="M14 34 L46 34 L44 38 L16 38 Z" fill="#81C784" />
      <path d="M16 38 L44 38 L42 42 L18 42 Z" fill="#FFEE58" />
      {/* Bottom bun */}
      <path d="M16 42 C16 42, 44 42, 44 46 C44 48, 16 48, 16 42 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="1.5" />
    </svg>
  );
}

function MilkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 18 L40 18 L37 50 L23 50 Z" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="1.5" />
      <path d="M22 24 L38 24 L36.5 48 L23.5 48 Z" fill="#FFFFFF" />
      <ellipse cx="30" cy="24" rx="8" ry="3" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1" />
      <text x="30" y="38" fontSize="10" fontWeight="bold" fill="#1565C0" textAnchor="middle">MILK</text>
    </svg>
  );
}

function VegetableIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="32" r="14" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
      <path d="M30 18 Q35 10, 38 14 Q35 18, 30 18 Z" fill="#81C784" />
      <path d="M22 28 Q30 24, 38 32" stroke="#A5D6A7" strokeWidth="2" fill="none" />
      <path d="M25 36 Q30 32, 35 40" stroke="#A5D6A7" strokeWidth="2" fill="none" />
    </svg>
  );
}

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: "Junk Food and Its Effects 🍔",
    text: "Junk food is food high in fat, sugar, and salt but low in nutrients. Regular consumption leads to obesity, tooth decay, low energy, and weakened immunity. Choose healthy Indian foods like sprouts, fruit chaat, and idli!",
    emoji: "🍔",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "Junk food is high in fat, sugar, and salt but low in nutrients. Eating too much junk food causes obesity, tooth decay, and low energy.",
  },
  {
    title: "Deficiency Diseases 🛡️",
    text: "When our diet lacks specific nutrients for a long time, we get deficiency diseases. Lack of Vitamin C causes scurvy (bleeding gums). Lack of Vitamin D and calcium causes rickets (weak bones).",
    emoji: "🛡️",
    bgColor: "from-emerald-400 to-teal-500",
    spoken: "Deficiency diseases happen when our diet lacks specific nutrients. For example, lack of vitamin C causes scurvy, and lack of vitamin D causes rickets.",
  },
  {
    title: "Iron & Vitamin Deficiencies 🩸",
    text: "Lack of iron causes anaemia, making us feel tired and pale (prevent with green leafy vegetables and jaggery). Lack of Vitamin A causes night blindness. Lack of Iodine causes goitre (swollen neck).",
    emoji: "🩸",
    bgColor: "from-blue-400 to-indigo-500",
    spoken: "Lack of iron causes anaemia, making you feel tired and weak. Vitamin A prevents night blindness, and iodine prevents goitre.",
  },
  {
    title: "Lifestyle Diseases 🏃‍♂️",
    text: "Lifestyle diseases develop over years due to poor daily habits like eating junk food, lack of exercise, stress, and sleeping late. Common examples include diabetes, obesity, high blood pressure, and heart disease.",
    emoji: "🏃‍♂️",
    bgColor: "from-purple-400 to-pink-500",
    spoken: "Lifestyle diseases develop over time due to poor eating habits and lack of physical activity, such as diabetes and high blood pressure.",
  },
  {
    title: "Preventing Disease & Staying Healthy ✨",
    text: "We can prevent lifestyle and deficiency diseases by eating a balanced diet with fruits, vegetables, pulses, and whole grains, exercising daily, drinking plenty of water, and sleeping for eight hours!",
    emoji: "✨",
    bgColor: "from-cyan-400 to-blue-600",
    spoken: "Protect yourself by eating a balanced diet, exercising daily, drinking enough water, and getting plenty of rest.",
  },
];

// ─── Challenges ───────────────────────────────────────────────

const CHALLENGES = [
  {
    type: 'identify' as ChallengeType,
    question: "Which of these is a deficiency disease caused by lack of Vitamin C?",
    answer: "Scurvy",
    options: ["Scurvy", "Diabetes", "Obesity", "Heart disease"],
    hint: "Think about sailors who had no fresh fruits and got bleeding gums!",
    misconception: "Scurvy is caused by a lack of vitamin C and makes gums spongy and bleeding. Diabetes and obesity are lifestyle diseases, not vitamin deficiencies.",
  },
  {
    type: 'sort' as ChallengeType,
    question: "Drag each food item to Healthy Food or Junk Food!",
    answer: "sort",
    options: [],
    hint: "Fresh fruits and green vegetables are healthy; burgers and chips are junk food!",
    misconception: "Junk food is high in fat, sugar, and salt with low nutrients (like burgers and chips), whereas healthy food gives vitamins, proteins, and fibre (like apples and milk).",
    sortItems: [
      { id: 'apple', label: 'Fresh Apple', icon: 'apple', correctBin: 'healthy' },
      { id: 'veg', label: 'Green Veggies', icon: 'veg', correctBin: 'healthy' },
      { id: 'milk', label: 'Glass of Milk', icon: 'milk', correctBin: 'healthy' },
      { id: 'burger', label: 'Tasty Burger', icon: 'burger', correctBin: 'junk' },
    ],
    bins: [
      { id: 'healthy', label: 'Healthy Food 🥗', color: '#10B981' },
      { id: 'junk', label: 'Junk Food 🍟', color: '#EF4444' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: "What disease is caused by deficiency of iron in the diet?",
    answer: "Anaemia",
    options: ["Anaemia", "Rickets", "Goitre", "Night blindness"],
    hint: "This condition makes a person feel weak, tired, and pale because blood carries less oxygen.",
    misconception: "Anaemia is caused by an iron deficiency. Rickets is lack of Vitamin D/calcium, goitre is lack of iodine, and night blindness is lack of Vitamin A.",
  },
  {
    type: 'sort' as ChallengeType,
    question: "Drag each deficiency disease to its missing nutrient!",
    answer: "sort",
    options: [],
    hint: "Scurvy = Vitamin C, Rickets = Vitamin D & Calcium, Night Blindness = Vitamin A, Goitre = Iodine!",
    misconception: "Each deficiency disease links directly to a missing nutrient. Mixing them up leads to wrong prevention methods! Scurvy is Vitamin C, Rickets is Vitamin D & calcium.",
    sortItems: [
      { id: 'scurvy', label: 'Scurvy', icon: 'vitamin', correctBin: 'vitc' },
      { id: 'rickets', label: 'Rickets', icon: 'mineral', correctBin: 'vitd' },
      { id: 'goitre', label: 'Goitre', icon: 'mineral', correctBin: 'iodine' },
      { id: 'anaemia', label: 'Anaemia', icon: 'mineral', correctBin: 'iron' },
    ],
    bins: [
      { id: 'vitc', label: 'Vitamin C 🍊', color: '#F59E0B' },
      { id: 'vitd', label: 'Vitamin D & Ca 🦴', color: '#3B82F6' },
      { id: 'iodine', label: 'Iodine 🧂', color: '#8B5CF6' },
      { id: 'iron', label: 'Iron 🩸', color: '#EF4444' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: "Which of these is a lifestyle disease caused by poor daily habits?",
    answer: "Diabetes",
    options: ["Diabetes", "Scurvy", "Rickets", "Beriberi"],
    hint: "It relates to how the body handles sugar after years of unhealthy eating and little exercise.",
    misconception: "Diabetes and hypertension are lifestyle diseases caused by diet and lack of exercise. Scurvy and rickets are deficiency diseases caused by missing nutrients.",
  },
  {
    type: 'sort' as ChallengeType,
    question: "Drag each lifestyle disease or habit to its main cause!",
    answer: "sort",
    options: [],
    hint: "Obesity = overeating & no exercise; Diabetes = too much sugar & poor diet!",
    misconception: "Lifestyle diseases are not caused by germs. They develop due to poor food habits, lack of physical activity, and stress accumulating over time.",
    sortItems: [
      { id: 'obesity', label: 'Obesity', icon: 'burger', correctBin: 'excess' },
      { id: 'diabetes', label: 'Diabetes', icon: 'food-pyr', correctBin: 'sugar' },
      { id: 'hypertension', label: 'High BP', icon: 'heart', correctBin: 'salt' },
      { id: 'active', label: 'Exercise', icon: 'exercise', correctBin: 'good' },
    ],
    bins: [
      { id: 'excess', label: 'Too much junk food 🍔', color: '#EF4444' },
      { id: 'sugar', label: 'Excess sugar & carbs 🍩', color: '#F59E0B' },
      { id: 'salt', label: 'Too much salt & stress 🧂', color: '#8B5CF6' },
      { id: 'good', label: 'Active & Healthy ⚽', color: '#10B981' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: "What should you do to prevent lifestyle diseases effectively?",
    answer: "Eat balanced diet and exercise regularly",
    options: [
      "Eat balanced diet and exercise regularly",
      "Eat more junk food and watch TV all day",
      "Skip breakfast and sleep late every night",
      "Avoid all physical activity and drink soda"
    ],
    hint: "Prevention requires healthy food choices, physical movement, and good rest!",
    misconception: "Lifestyle diseases are prevented by healthy habits: balanced nutrition, daily sports or exercise, proper sleep, and drinking enough water.",
  },
  {
    type: 'sort' as ChallengeType,
    question: "Drag each health action to its correct prevention goal!",
    answer: "sort",
    options: [],
    hint: "Drink milk = Build bones; Exercise daily = Prevent lifestyle disease; Eat fruits = Boost immunity!",
    misconception: "Different healthy actions serve different roles: milk builds bones with calcium, exercise prevents lifestyle diseases, and fruits provide immunity-boosting vitamins.",
    sortItems: [
      { id: 'milk', label: 'Drink Milk', icon: 'milk', correctBin: 'bones' },
      { id: 'exercise', label: 'Exercise Daily', icon: 'exercise', correctBin: 'lifestyle' },
      { id: 'fruit', label: 'Eat Fresh Fruits', icon: 'apple', correctBin: 'immunity' },
      { id: 'water', label: 'Drink 8 Glasses Water', icon: 'first-aid', correctBin: 'hydration' },
    ],
    bins: [
      { id: 'bones', label: 'Strong Bones 🦴', color: '#3B82F6' },
      { id: 'lifestyle', label: 'Stop Lifestyle Illness 🏃‍♂️', color: '#10B981' },
      { id: 'immunity', label: 'Boost Immunity 🍊', color: '#F59E0B' },
      { id: 'hydration', label: 'Stay Hydrated 💧', color: '#06B6D4' },
    ],
  },
];

// ─── Nurse Nina Mascot ────────────────────────────────────────

function NurseNina({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-emerald-200"
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
          {/* Head & Face */}
          <circle cx="37.5" cy="30" r="17" fill="#FFE0B2" stroke="#FFCC80" strokeWidth="1.5" />
          {/* Nurse Cap */}
          <path d="M22 20 Q37.5 12, 53 20 L48 10 L27 10 Z" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
          <rect x="33" y="12" width="9" height="6" fill="#E53935" rx="1" />
          <rect x="34.5" y="10" width="6" height="10" fill="#E53935" rx="1" />
          {/* Hair */}
          <path d="M22 25 Q37.5 16, 53 25" fill="none" stroke="#5D4037" strokeWidth="3" />
          {/* Uniform */}
          <path d="M20 47 L37.5 54 L55 47 L58 80 L17 80 Z" fill="#E0F2F1" stroke="#80CBC4" strokeWidth="1.5" />
          <path d="M28 47 L37.5 58 L47 47" fill="#FFFFFF" stroke="#80CBC4" strokeWidth="1" />
          {/* Red Cross Badge */}
          <rect x="34" y="58" width="7" height="7" fill="#E53935" rx="1" />
          <rect x="32" y="60" width="11" height="3" fill="#E53935" rx="1" />
          {/* Eyes & Smile */}
          <circle cx="31" cy="27" r="2" fill="#37474F" />
          <circle cx="44" cy="27" r="2" fill="#37474F" />
          <path d="M33 34 Q37.5 38, 42 34" stroke="#D32F2F" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row ─────────────────────────────────────────────────

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

// ─── Clinic Scene Background ───────────────────────────────────

function ClinicSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="clinic-bg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2F1" />
            <stop offset="50%" stopColor="#B2DFDB" />
            <stop offset="70%" stopColor="#E8F5E9" />
            <stop offset="100%" stopColor="#C8E6C9" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#clinic-bg-grad)" />
      </svg>
      {/* Clinic Window / Sun */}
      <div className="absolute top-6 left-12 opacity-30">
        <svg width="100" height="120" viewBox="0 0 100 120">
          <rect x="10" y="10" width="80" height="100" rx="4" fill="#FFFFFF" stroke="#00796B" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="110" stroke="#00796B" strokeWidth="2" />
          <line x1="10" y1="60" x2="90" y2="60" stroke="#00796B" strokeWidth="2" />
          <circle cx="50" cy="35" r="14" fill="#FFD54F" />
        </svg>
      </div>
      {/* Wall Charts Silhouette */}
      <div className="absolute top-8 right-32 opacity-25">
        <svg width="80" height="90" viewBox="0 0 80 90">
          <rect x="5" y="5" width="70" height="80" fill="#FFFFFF" stroke="#37474F" strokeWidth="2" />
          <polygon points="40,15 65,65 15,65" fill="#FBC02D" />
          <text x="40" y="80" fontSize="10" fontWeight="bold" fill="#37474F" textAnchor="middle">FOOD PYRAMID</text>
        </svg>
      </div>
      {/* Greenery on floor */}
      <div className="absolute bottom-4 left-16 flex gap-12">
        <svg width="25" height="30" viewBox="0 0 25 30"><circle cx="12" cy="10" r="8" fill="#4CAF50" /><path d="M12 18 L12 30" stroke="#2E7D32" strokeWidth="3" /></svg>
        <svg width="25" height="30" viewBox="0 0 25 30"><circle cx="12" cy="10" r="8" fill="#81C784" /><path d="M12 18 L12 30" stroke="#388E3C" strokeWidth="3" /></svg>
      </div>
    </div>
  );
}

// ─── Sort Item Icon Renderer ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'apple': return <AppleIcon size={size} />;
    case 'veg': return <VegetableIcon size={size} />;
    case 'milk': return <MilkIcon size={size} />;
    case 'burger': return <BurgerIcon size={size} />;
    case 'vitamin': return <VitaminIcon size={size} />;
    case 'mineral': return <MineralIcon size={size} />;
    case 'food-pyr': return <FoodPyramidIcon size={size} />;
    case 'heart': return <HeartHealthIcon size={size} />;
    case 'exercise': return <ExerciseIcon size={size} />;
    case 'first-aid': return <FirstAidIcon size={size} />;
    default: return <HealthyFoodIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-emerald-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : 'shadow'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}20`,
        borderColor: color,
      }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-1 shadow" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-extrabold text-gray-800 text-center px-1">{label}</span>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface HealthDiseasesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function HealthDiseasesGame({ width = 720, height = 560, onComplete }: HealthDiseasesGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 140, y: height - 150 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

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
      const compMsg = "Wonderful! You are a brilliant health champion!";
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
    currentChallenge.bins.forEach((bin, idx) => {
      const binWidth = 140;
      const binHeight = 90;
      const binX = 40 + idx * 160;
      const binY = 190;
      if (x >= binX && x <= binX + binWidth && y >= binY && y <= binY + binHeight) {
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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-teal-50 flex flex-col justify-between select-none" style={{ width, height }}>
      <ClinicSceneBg width={width} height={height} />
      <NurseNina mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-teal-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-teal-600 text-white font-black px-3 py-1 rounded-full text-xs shadow">
            {screen === 'teaching' ? 'LEARN' : `CHALLENGE ${challengeIdx + 1}/8`}
          </div>
          <StarRow count={Math.min(5, Math.floor(score / 15))} total={5} />
        </div>
        <h1 className="text-base font-extrabold text-teal-900 tracking-wide">Health & Diseases 🩺</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShowHint}
            className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full text-xs font-bold shadow transition flex items-center gap-1"
          >
            💡 Hint
          </button>
          <span className="text-sm font-bold text-teal-700">Score: {score}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        {screen === 'teaching' ? (
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-xl p-6 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-xl flex flex-col items-center text-center`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm leading-relaxed mb-6 font-medium">{TEACHING_SLIDES[slideIdx].text}</p>
            <div className="flex justify-between w-full items-center">
              <button
                onClick={() => {
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-xs disabled:opacity-40"
              >
                ← Back
              </button>
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === slideIdx ? 'bg-white' : 'bg-white/40'}`} />
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
                className="px-5 py-2 bg-white text-gray-800 hover:bg-teal-50 rounded-xl font-bold text-xs shadow"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game 🚀' : 'Next →'}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl flex flex-col items-center">
            {/* Question Card */}
            <motion.div
              key={challengeIdx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-teal-100 text-center mb-6 w-full"
            >
              <h2 className="text-base font-extrabold text-teal-900">{currentChallenge.question}</h2>
            </motion.div>

            {/* Challenge Content */}
            {currentChallenge.type === 'identify' ? (
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg mb-4">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectOpt = opt === currentChallenge.answer;
                  let btnBg = 'bg-white hover:bg-teal-50 text-teal-900 border-teal-200';
                  if (selectedOpt) {
                    if (isCorrectOpt) btnBg = 'bg-emerald-500 text-white border-emerald-600';
                    else if (isSelected) btnBg = 'bg-rose-500 text-white border-rose-600';
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null && isCorrectOpt}
                      className={`p-3 rounded-2xl font-bold text-xs shadow-md border-2 transition flex items-center justify-center text-center ${btnBg}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="relative w-full h-72 mb-4">
                {/* Bins */}
                <div className="flex justify-around absolute top-2 w-full px-2">
                  {currentChallenge.bins?.map((bin, idx) => (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={40 + idx * 160}
                      y={10}
                      width={140}
                      height={90}
                      isHovering={hoveredBin === bin.id}
                      onMouseEnter={() => setHoveredBin(bin.id)}
                      onMouseLeave={() => setHoveredBin(null)}
                    />
                  ))}
                </div>

                {/* Draggable Items */}
                {currentChallenge.sortItems?.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: 190 };
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

            {/* Next / Continue Button for Identify Challenges */}
            {selectedOpt === currentChallenge.answer && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg text-xs"
              >
                Continue 🚀
              </motion.button>
            )}

            {/* Next Button for Sort Challenges when all items are placed */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg text-xs"
              >
                Continue 🚀
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Feedback Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
