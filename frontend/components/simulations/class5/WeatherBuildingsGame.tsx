'use client';

/**
 * WeatherBuildingsGame — Learn about weather & climate, plants & animals, food, and local buildings
 *
 * CISCE Nodes: c5_evs_005 (Weather and climate), c5_evs_006 (Importance of plants and animals),
 *              c5_evs_007 (Dependence on environment for food), c5_evs_008 (Buildings in the locality)
 * Enrichment: c5_evs_enrichment_part5-8
 *
 * ELI5: "Weather is what you see outside today, while climate is the average weather over many years!
 *   Plants give us oxygen, food, and medicine, while animals help us and keep nature in balance.
 *   We eat healthy combinations like rice and dal for energy and body building.
 *   Our locality has wonderful buildings like schools, hospitals, and post offices that help us every day!"
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: "Weather & Climate ☀️",
    text: "Weather is the day-to-day condition of the atmosphere (sunny, rainy, windy). Climate is the average weather over 30+ years. Weather elements include temperature (thermometer, °C), rainfall (rain gauge, mm), wind, humidity, and sunshine. Weather affects what we wear and do each day!",
    emoji: "🌤️",
    bgColor: "from-gold-400 to-gold-600",
    spoken: "Weather is what happens day to day, while climate is the long-term pattern over many years. We measure temperature with a thermometer and rainfall with a rain gauge!"
  },
  {
    title: "Importance of Plants 🌱",
    text: "Plants give us oxygen through photosynthesis, food (rice, fruits, vegetables), timber, medicine (neem, tulsi), and fibre (cotton, jute). Their roots hold soil and prevent soil erosion. Land plants like banyan and neem grow on soil, while aquatic plants like lotus and algae grow in water!",
    emoji: "🌳",
    bgColor: "from-emerald-400 to-green-600",
    spoken: "Plants give us oxygen, food, medicine, and prevent soil erosion with their strong roots. Land plants grow on soil, while aquatic plants like lotus grow in water!"
  },
  {
    title: "Importance of Animals & Habitats 🐄",
    text: "Animals provide food (milk, eggs), labour (bullocks ploughing), wool, silk, and manure. Bees pollinate flowers and birds disperse seeds. Land animals (cows, tigers) live on soil, aquatic animals (fish, turtles) live in water, and some like frogs live in both. This balance keeps ecosystems healthy!",
    emoji: "🐾",
    bgColor: "from-amber-400 to-orange-600",
    spoken: "Animals give us milk, wool, and labour, and help plants through pollination and seed dispersal. Land animals live on soil, aquatic animals live in water, and frogs live in both!"
  },
  {
    title: "Healthy Food Combinations 🍛",
    text: "Foods are grouped by function: body-building (proteins like dal, milk, eggs), energy-giving (carbohydrates like rice, wheat, potatoes), and protective (vitamins and minerals like fruits, vegetables). A balanced Indian thali has all three groups in the right proportions. Avoid junk food — it lacks nutrients!",
    emoji: "🥗",
    bgColor: "from-rose-400 to-pink-600",
    spoken: "A healthy Indian thali combines energy-giving rice, body-building dal, and protective vegetables. A balanced diet has all food groups in the right proportions. Avoid junk food!"
  },
  {
    title: "Buildings in the Locality 🏫",
    text: "Community buildings serve our daily needs: school for education, health centre/hospital for medical care, post office for letters and parcels, police station for safety, bank for money, and market for goods. We can draw simple maps of our locality using symbols to show where these buildings stand near roads and homes!",
    emoji: "🏥",
    bgColor: "from-purple-400 to-gold-600",
    spoken: "Schools teach us, hospitals heal us, post offices keep us connected, and banks keep our money safe. We can draw simple maps to show where these buildings are in our community!"
  },
];

// ─── Custom SVG Icons for Interactive Objects ──────────────────

function WeatherIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="22" cy="22" r="10" fill="#FACC15" />
      <path d="M15 38 C15 32, 22 30, 28 34 C34 30, 42 34, 40 40 C45 40, 45 48, 38 48 L18 48 C12 48, 12 40, 15 38 Z" fill="#94A3B8" />
      <line x1="20" y1="52" x2="18" y2="56" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="52" x2="26" y2="56" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="52" x2="34" y2="56" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SunnyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="14" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line
          key={angle}
          x1={30 + 20 * Math.cos((angle * Math.PI) / 180)}
          y1={30 + 20 * Math.sin((angle * Math.PI) / 180)}
          x2={30 + 26 * Math.cos((angle * Math.PI) / 180)}
          y2={30 + 26 * Math.sin((angle * Math.PI) / 180)}
          stroke="#EAB308"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function RainyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 28 C12 20, 22 18, 30 22 C38 18, 48 22, 46 30 C52 30, 52 40, 44 40 L14 40 C8 40, 8 30, 12 28 Z" fill="#64748B" stroke="#475569" strokeWidth="2" />
      <line x1="20" y1="46" x2="17" y2="54" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="46" x2="27" y2="54" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="46" x2="37" y2="54" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CloudyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M14 32 C14 24, 24 22, 32 26 C39 21, 48 26, 46 34 C51 35, 52 44, 44 44 L16 44 C10 44, 10 35, 14 32 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
      <path d="M22 24 C22 18, 30 16, 36 20 C41 17, 47 21, 45 27" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LandPlantIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="27" y="32" width="6" height="20" fill="#92400E" />
      <circle cx="30" cy="24" r="14" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
      <circle cx="22" cy="20" r="10" fill="#4ADE80" />
      <circle cx="38" cy="20" r="10" fill="#4ADE80" />
      <rect x="15" y="52" width="30" height="4" fill="#78350F" rx="2" />
    </svg>
  );
}

function WaterPlantIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 45 Q30 38, 50 45 Q30 52, 10 45 Z" fill="#38BDF8" opacity="0.6" />
      <path d="M30 46 L30 26" stroke="#15803D" strokeWidth="2" />
      <path d="M30 26 C22 18, 22 34, 30 26 Z" fill="#F472B6" />
      <path d="M30 26 C38 18, 38 34, 30 26 Z" fill="#F472B6" />
      <ellipse cx="20" cy="46" rx="8" ry="3" fill="#10B981" />
      <ellipse cx="40" cy="48" rx="10" ry="3" fill="#10B981" />
    </svg>
  );
}

function LandAnimalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <circle cx="18" cy="26" r="8" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <circle cx="14" cy="24" r="1.5" fill="#0F172A" />
      <path d="M12 22 L8 18" stroke="#334155" strokeWidth="2" />
      <rect x="20" y="40" width="3" height="12" fill="#334155" />
      <rect x="26" y="40" width="3" height="12" fill="#334155" />
      <rect x="38" y="40" width="3" height="12" fill="#334155" />
      <rect x="44" y="40" width="3" height="12" fill="#334155" />
      <path d="M48 30 Q54 28, 52 38" fill="none" stroke="#334155" strokeWidth="2" />
    </svg>
  );
}

function WaterAnimalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M14 30 Q30 16, 44 30 Q30 44, 14 30 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <path d="M42 24 L52 16 L48 30 L52 44 L42 36 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <circle cx="22" cy="27" r="2" fill="#0F172A" />
      <path d="M28 20 Q32 15, 36 22" fill="none" stroke="#0284C7" strokeWidth="2" />
    </svg>
  );
}

function HealthyFoodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="34" rx="24" ry="12" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
      <ellipse cx="30" cy="36" rx="18" ry="8" fill="#F8FAFC" />
      <circle cx="22" cy="34" r="5" fill="#F97316" />
      <circle cx="32" cy="33" r="6" fill="#22C55E" />
      <circle cx="40" cy="35" r="4" fill="#EAB308" />
    </svg>
  );
}

function SchoolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,10 52,22 8,22" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <rect x="14" y="22" width="32" height="28" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <rect x="25" y="36" width="10" height="14" fill="#3B82F6" />
      <rect x="18" y="26" width="6" height="6" fill="#FACC15" stroke="#334155" strokeWidth="1" />
      <rect x="36" y="26" width="6" height="6" fill="#FACC15" stroke="#334155" strokeWidth="1" />
      <rect x="10" y="50" width="40" height="4" fill="#64748B" />
    </svg>
  );
}

function HealthCentreIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="20" width="36" height="30" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <polygon points="30,8 46,20 14,20" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <rect x="25" y="28" width="10" height="16" fill="#EF4444" />
      <rect x="21" y="31" width="18" height="10" fill="#EF4444" />
      <rect x="10" y="50" width="40" height="4" fill="#64748B" />
    </svg>
  );
}

function PostOfficeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="22" width="36" height="28" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <polygon points="30,10 50,22 10,22" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      <rect x="22" y="32" width="16" height="12" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
      <path d="M22 32 L30 38 L38 32" fill="none" stroke="#334155" strokeWidth="1.5" />
      <rect x="10" y="50" width="40" height="4" fill="#64748B" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'weather': return <WeatherIcon size={size} />;
    case 'sunny': return <SunnyIcon size={size} />;
    case 'rainy': return <RainyIcon size={size} />;
    case 'cloudy': return <CloudyIcon size={size} />;
    case 'land-plant': return <LandPlantIcon size={size} />;
    case 'water-plant': return <WaterPlantIcon size={size} />;
    case 'land-animal': return <LandAnimalIcon size={size} />;
    case 'water-animal': return <WaterAnimalIcon size={size} />;
    case 'healthy-food': return <HealthyFoodIcon size={size} />;
    case 'school': return <SchoolIcon size={size} />;
    case 'health-centre': return <HealthCentreIcon size={size} />;
    case 'post-office': return <PostOfficeIcon size={size} />;
    default: return <WeatherIcon size={size} />;
  }
}

// ─── Challenges (8 progressive challenges) ────────────────────

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
    question: 'What is the main difference between WEATHER and CLIMATE?',
    answer: 'Weather is day-to-day condition, climate is average pattern over many years',
    options: [
      'Weather is day-to-day condition, climate is average pattern over many years',
      'Weather and climate are exactly the same thing',
      'Weather is measured over years, climate is daily'
    ],
    hint: 'Think about time scale: one changes overnight, the other takes thirty years or more!',
    misconception: 'Weather and climate are NOT the same! Weather is the short-term day-to-day condition of the atmosphere, whereas climate is the average weather pattern measured over thirty years or more.',
  },
  {
    type: 'sort',
    question: 'Drag each weather element to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Temperature measures hot and cold, rainfall measures water drops, and clouds cover the sky!',
    misconception: 'Remember: temperature measures hot/cold in Celsius, rainfall measures water in millimetres, and cloudy describes the sky condition!',
    sortItems: [
      { id: 'w1', label: 'Sunny (Clear Sky)', icon: 'sunny', correctBin: 'bin-sunny' },
      { id: 'w2', label: 'Rainy (Water Drops)', icon: 'rainy', correctBin: 'bin-rainy' },
      { id: 'w3', label: 'Cloudy (Sky Covered)', icon: 'cloudy', correctBin: 'bin-cloudy' },
    ],
    bins: [
      { id: 'bin-sunny', label: 'Sunny ☀️', color: '#FACC15' },
      { id: 'bin-rainy', label: 'Rainy 🌧️', color: '#38BDF8' },
      { id: 'bin-cloudy', label: 'Cloudy ☁️', color: '#94A3B8' },
    ],
  },
  {
    type: 'identify',
    question: 'Why are plants important for the environment and living things?',
    answer: 'They give oxygen, food, shelter, and prevent soil erosion',
    options: [
      'They give oxygen, food, shelter, and prevent soil erosion',
      'They cause air pollution and take up space',
      'They have no use for animals or humans'
    ],
    hint: 'Think about what green leaves release during photosynthesis and what roots do in soil!',
    misconception: 'Plants are essential! They give us oxygen through photosynthesis, food, timber, medicine, and their roots hold soil firmly to prevent soil erosion.',
  },
  {
    type: 'sort',
    question: 'Drag each plant or animal to its correct habitat: Land vs Water!',
    answer: 'sort',
    options: [],
    hint: 'Mango trees and cows live on soil. Lotus flowers and fish live in ponds and rivers!',
    misconception: 'Land plants and animals live on soil and air (mango tree, cow), while aquatic plants and animals live entirely in water (lotus, fish)!',
    sortItems: [
      { id: 'p1', label: 'Mango Tree', icon: 'land-plant', correctBin: 'land' },
      { id: 'a1', label: 'Cow', icon: 'land-animal', correctBin: 'land' },
      { id: 'p2', label: 'Lotus Flower', icon: 'water-plant', correctBin: 'water' },
      { id: 'a2', label: 'Fish', icon: 'water-animal', correctBin: 'water' },
    ],
    bins: [
      { id: 'land', label: 'Land Habitat 🌳', color: '#22C55E' },
      { id: 'water', label: 'Water Habitat 💧', color: '#3B82F6' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is a HEALTHY food combination (balanced diet)?',
    answer: 'Rice with dal and vegetables',
    options: [
      'Rice with dal and vegetables',
      'Only chocolate and soft drinks',
      'Only potato chips and candy'
    ],
    hint: 'A balanced meal needs energy-giving foods, body-building proteins, and protective vitamins together!',
    misconception: 'Eating only junk food or sweets lacks proteins and vitamins! A healthy combination (balanced diet) combines energy foods (rice), body-building proteins (dal), and protective vegetables.',
  },
  {
    type: 'sort',
    question: 'Drag each food item to its correct food group!',
    answer: 'sort',
    options: [],
    hint: 'Rice gives energy, dal builds muscles, and vegetables protect us from disease!',
    misconception: 'Remember: rice and wheat are energy-giving carbohydrates, dal and pulses are body-building proteins, and fruits/vegetables are protective vitamins and minerals!',
    sortItems: [
      { id: 'f1', label: 'Healthy Meal Plate', icon: 'healthy-food', correctBin: 'balanced' },
      { id: 'f2', label: 'Land Plant Food', icon: 'land-plant', correctBin: 'plant-src' },
    ],
    bins: [
      { id: 'balanced', label: 'Balanced Plate 🥗', color: '#EC4899' },
      { id: 'plant-src', label: 'Plant Source 🌱', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'Which building in the locality provides EDUCATION for children?',
    answer: 'School',
    options: ['School', 'Health centre', 'Post office'],
    hint: 'It has classrooms, a library, and a playground where teachers help children learn!',
    misconception: 'The school is the place of learning where children study, read in the library, and play! Health centres treat illness, and post offices handle letters.',
  },
  {
    type: 'sort',
    question: 'Drag each community building to its correct community service!',
    answer: 'sort',
    options: [],
    hint: 'Schools teach children, hospitals treat patients, and post offices send letters and parcels!',
    misconception: 'Each community building has a specific job: school for education, health centre for medical care, and post office for letters, parcels, and savings!',
    sortItems: [
      { id: 'b-school', label: 'School Building', icon: 'school', correctBin: 'education' },
      { id: 'b-health', label: 'Health Centre', icon: 'health-centre', correctBin: 'medical' },
      { id: 'b-post', label: 'Post Office', icon: 'post-office', correctBin: 'mail' },
    ],
    bins: [
      { id: 'education', label: 'Education 🏫', color: '#3B82F6' },
      { id: 'medical', label: 'Medical Care 🏥', color: '#EF4444' },
      { id: 'mail', label: 'Mail & Parcels ✉️', color: '#F97316' },
    ],
  },
];

// ─── Kabir Community Worker Mascot ─────────────────────────────

function KabirMascot({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
            <linearGradient id="kabir-vest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="kabir-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="37.5" cy="28" r="16" fill="url(#kabir-face)" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Hair & Cap */}
          <path d="M21 26 C21 14, 54 14, 54 26 Z" fill="#1E293B" />
          <rect x="30" y="10" width="20" height="4" fill="#3B82F6" rx="2" />
          {/* Eyes */}
          <circle cx="31" cy="27" r="2" fill="#1E293B" />
          <circle cx="44" cy="27" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 34 Q37.5 38 42 34" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Vest body */}
          <path d="M22 44 L37.5 48 L53 44 L55 75 L20 75 Z" fill="url(#kabir-vest)" stroke="#1E40AF" strokeWidth="1.5" />
          {/* Badge */}
          <circle cx="30" cy="55" r="5" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
          {/* Arms */}
          <ellipse cx="16" cy="55" rx="4" ry="10" fill="#60A5FA" transform="rotate(-15 16 55)" />
          <ellipse cx="59" cy="55" rx="4" ry="10" fill="#60A5FA" transform="rotate(15 59 55)" />
          {/* Feet */}
          <ellipse cx="28" cy="82" rx="5" ry="3" fill="#334155" />
          <ellipse cx="47" cy="82" rx="5" ry="3" fill="#334155" />
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

// ─── Community Scene Background ───────────────────────────────

function CommunityScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="community-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
          <linearGradient id="roof-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#community-sky)" />
        {/* Ground */}
        <rect x="0" y={height - 110} width={width} height="110" fill="#16A34A" />
        <rect x="0" y={height - 110} width={width} height="12" fill="#22C55E" />

        {/* Distant school silhouette */}
        <rect x={width - 180} y={height - 210} width="100" height="100" fill="#CBD5E1" opacity="0.6" />
        <polygon points={`${width - 180},${height - 210} ${width - 130},${height - 250} ${width - 80},${height - 210}`} fill="#94A3B8" opacity="0.6" />

        {/* Distant clinic silhouette */}
        <rect x="60" y={height - 190} width="90" height="80" fill="#CBD5E1" opacity="0.6" />
        <polygon points={`60,${height - 190} 105,${height - 220} 150,${height - 190}`} fill="#60A5FA" opacity="0.6" />
      </svg>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface WeatherBuildingsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function WeatherBuildingsGame({ width = 720, height = 560, onComplete }: WeatherBuildingsGameProps) {
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
        newPos[item.id] = { x: 40 + idx * 130, y: height - 160 };
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
      const compMsg = "Wonderful! You are a brilliant star!";
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
    currentChallenge.bins.forEach(bin => {
      const binEl = document.getElementById(`bin-${bin.id}`);
      if (binEl) {
        const rect = binEl.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          droppedBinId = bin.id;
        }
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
    <div
      className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl border-4 border-amber-300 bg-gradient-to-b from-gold-300 to-emerald-400 flex flex-col justify-between"
      style={{ width, height }}
    >
      <CommunityScene width={width} height={height} />
      <KabirMascot mood={mascotMood} speaking={speakingText} />

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-amber-600 tracking-wide">Weather & Community</span>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full border border-amber-300">
            Class 5 EVS
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shadow-inner">
            <span className="text-sm font-bold text-amber-700">⭐ {score}</span>
          </div>
          {screen === 'play' && (
            <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700">Level {challengeIdx + 1} / {CHALLENGES.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        {screen === 'teaching' ? (
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-xl w-full flex flex-col items-center text-center border-4 border-amber-300"
          >
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium text-gray-600 leading-relaxed mb-8">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full">
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-amber-500' : 'w-2.5 bg-gray-300'}`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                {slideIdx > 0 && (
                  <button
                    onClick={() => setSlideIdx(prev => prev - 1)}
                    className="px-5 py-2.5 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  >
                    Back
                  </button>
                )}
                {slideIdx < TEACHING_SLIDES.length - 1 ? (
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setSlideIdx(prev => prev + 1);
                    }}
                    className="px-6 py-2.5 rounded-xl font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-md transition"
                  >
                    Next ➜
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      audioManager.play('success');
                      setScreen('play');
                    }}
                    className="px-7 py-2.5 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg transition animate-bounce"
                  >
                    Start Game! 🚀
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl flex flex-col items-center">
            {/* Question Card */}
            <motion.div
              key={challengeIdx}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl w-full border-2 border-amber-300 mb-6 text-center"
            >
              <h3 className="text-lg font-bold text-gray-800">{currentChallenge.question}</h3>
            </motion.div>

            {/* Challenge Body */}
            {currentChallenge.type === 'identify' ? (
              <div className="grid grid-cols-1 gap-3 w-full max-w-lg mb-6">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectOpt = opt === currentChallenge.answer;
                  let btnBg = 'bg-white hover:bg-amber-50 text-gray-800 border-gray-200';
                  if (selectedOpt) {
                    if (isCorrectOpt) btnBg = 'bg-emerald-500 text-white border-emerald-600';
                    else if (isSelected) btnBg = 'bg-rose-500 text-white border-rose-600';
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => !selectedOpt && handleAnswerClick(opt, e)}
                      className={`p-4 rounded-xl font-bold border-2 shadow-md transition text-left text-sm flex items-center justify-between ${btnBg}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrectOpt && <span className="text-lg">✅</span>}
                      {selectedOpt && isSelected && !isCorrectOpt && <span className="text-lg">❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                {/* Bins */}
                <div className="flex justify-center gap-6 mb-8 w-full">
                  {currentChallenge.bins?.map(bin => {
                    const isOver = false;
                    return (
                      <div
                        key={bin.id}
                        id={`bin-${bin.id}`}
                        className={`w-40 h-32 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center p-3 transition shadow-lg bg-white/80 ${isOver ? 'border-amber-500 bg-amber-50' : 'border-gray-300'}`}
                        style={{ borderColor: bin.color }}
                      >
                        <span className="text-sm font-black text-gray-700 text-center">{bin.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Draggable items */}
                <div className="flex justify-center gap-4 flex-wrap w-full">
                  {currentChallenge.sortItems?.map(item => {
                    const placed = placedItems[item.id] || false;
                    const pos = itemPositions[item.id] || { x: 0, y: 0 };
                    return (
                      <Draggable
                        key={item.id}
                        id={item.id}
                        x={pos.x}
                        y={pos.y}
                        draggable={!placed}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        width={110}
                        height={95}
                      >
                        <div
                          className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 bg-white cursor-grab active:cursor-grabbing ${placed ? 'opacity-40' : 'hover:scale-105'} transition-transform`}
                          style={{ width: 110, height: 95 }}
                        >
                          {renderSortIcon(item.icon, 44)}
                          <span className="text-[10px] font-bold text-gray-700 text-center mt-1 px-1">{item.label}</span>
                        </div>
                      </Draggable>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action / Next Button */}
            {(selectedOpt || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="mt-4 px-8 py-3 rounded-xl font-black bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➜' : 'Complete Game! 🏆'}
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-md shadow-inner">
        <StarRow count={Math.floor(score / 15)} total={5} />
        <button
          onClick={handleShowHint}
          className="px-4 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 font-bold text-amber-800 text-xs shadow transition flex items-center gap-1.5"
        >
          💡 Need Hint?
        </button>
      </div>

      {/* Feedback & Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
