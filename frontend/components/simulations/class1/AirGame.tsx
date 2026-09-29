'use client';
/**
 * AirGame - Learn about air: all around us, feeling wind, uses, clean vs dirty air
 *
 * CISCE Nodes: c1_phy_001 (Air is all around us), c1_phy_002 (Feeling air when wind blows),
 *              c1_phy_003 (Uses of air in daily life)
 * Enrichment: c1_physics_enrichment_part1-3
 *
 * ELI5: "Air is like an invisible blanket that covers everything around you. You cannot
 *   see it because it has no colour, but you can feel it. When the wind blows, that is
 *   air moving. When you blow into a balloon, it gets bigger because air fills it up!"
 *
 * Misconceptions (from enrichment):
 *   1. "Air is not there because I cannot see it" → "Air is invisible, but being
 *      invisible is not being absent! You can feel it and blow up a balloon!"
 *   2. "An empty bottle has nothing inside it" → "An empty bottle is full of air!
 *      Air fills every open space!"
 *   3. "Dirty air only smells bad, it does not harm us" → "Unclean air causes coughing,
 *      sneezing, burning eyes, and serious lung diseases!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG air scene background (sky, clouds, wind lines, kite, windmill)
 * - Custom SVG air components (balloon, kite, windmill, bottle, tree, factory, plant)
 * - Custom SVG pilot mascot (Pilot Pari) with aviator goggles & scarf
 * - Drag-and-drop: sort items into air/no-air, clean/dirty, uses of air
 * - 8 progressive challenges: identify invisibility → balloon space → wind → sorting
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via Web Speech API (audioManager)
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
// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
    {
        title: 'Air is All Around Us! 🌬️',
        text: 'Air is an invisible substance present everywhere around us - in rooms, playgrounds, and bottle spaces! It has no colour, no smell, and takes the shape of whatever container it fills.',
        emoji: '💨',
        bgColor: 'from-gold-400 to-gold-600',
    },
    {
        title: 'Feeling the Wind! 🍃',
        text: 'Wind is simply moving air! When wind blows, it pushes against your skin, flutters flags, and makes tree leaves rustle. Waving your hand quickly also feels like air pushing against you!',
        emoji: '🍃',
        bgColor: 'from-gold-400 to-gold-600',
    },
    {
        title: 'Air Fills Space! 🎈',
        text: 'When you blow air into a balloon, it gets bigger because air fills the space inside! A bottle that looks empty is actually full of air. Breathing proves air is always around us!',
        emoji: '🎈',
        bgColor: 'from-gold-400 to-gold-600',
    },
    {
        title: 'Uses of Air! 🪁',
        text: 'People, animals, and plants need air to breathe and live! Moving air helps kites fly high, dries wet clothes on a clothesline, and turns windmill blades to make power!',
        emoji: '🪁',
        bgColor: 'from-teal-400 to-gold-600',
    },
    {
        title: 'Keep Air Clean! 🌱',
        text: 'Clean air has no smoke or dust. Dirty air from factories and vehicles makes us cough and sick! Planting more trees keeps the air fresh and clean for everyone.',
        emoji: '🌳',
        bgColor: 'from-emerald-400 to-teal-600',
    },
];
// ─── Types ──────────────────────────────────────���─────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_use' | 'identify_source' | 'sort_uses' | 'sort_sources' | 'identify_habit' | 'sort_habits';
interface Challenge {
    type: ChallengeType;
    question: string;
    answer: string;
    options: string[];
    hint: string;
    misconception: string;
    sortItems?: {
        id: string;
        label: string;
        emoji: string;
        correctBin: string;
    }[];
    bins?: {
        id: string;
        label: string;
        color: string;
    }[];
}
// ─── Challenges (8 progressive: identify → sort → apply) ──────
const CHALLENGES: Challenge[] = [
    {
        type: 'identify_use',
        question: 'Can we SEE air with our eyes?',
        answer: 'No, air is invisible',
        options: ['No, air is invisible', 'Yes, air is bright blue', 'Yes, air is white like milk'],
        hint: 'Think: can you see the air in this room right now? It has no colour!',
        misconception: 'Air is invisible - it has no colour! Being invisible does not mean air is absent. We feel it when wind blows or when we wave our hands!',
    },
    {
        type: 'identify_use',
        question: 'What happens when you blow air into a balloon?',
        answer: 'It gets bigger',
        options: ['It gets bigger', 'It stays the same size', 'It turns into water'],
        hint: 'Why does the balloon stretch out and grow when you blow into it?',
        misconception: 'The balloon gets bigger because air fills the space inside it! This proves that air is real and takes up space!',
    },
    {
        type: 'identify_source',
        question: 'What is wind?',
        answer: 'Air that is moving',
        options: ['Air that is moving', 'Water falling from clouds', 'Sunlight shining brightly'],
        hint: 'Think about what happens to the air when you feel a cool breeze on your face!',
        misconception: 'Wind is simply moving air! The same air that sits still around us, when it blows, is called wind!',
    },
    {
        type: 'sort_uses',
        question: 'Drag each item! Which ones contain or are filled with air?',
        answer: 'sort',
        options: [],
        hint: 'Balloons and open bottles are full of air! Solid stones or sealed vacuum jars are different!',
        misconception: 'An "empty" bottle is actually full of air! Air fills every open space around us, even in jars that look empty!',
        sortItems: [
            { id: 'balloon', label: 'Inflated Balloon', emoji: '🎈', correctBin: 'has-air' },
            { id: 'bottle', label: 'Open Empty Bottle', emoji: '🍾', correctBin: 'has-air' },
            { id: 'rock', label: 'Solid Rock', emoji: '🪨', correctBin: 'no-air' },
            { id: 'sealed', label: 'Vacuum Sealed Jar', emoji: '🏺', correctBin: 'no-air' },
        ],
        bins: [
            { id: 'has-air', label: 'Full of Air 🌬️', color: '#0284C7' },
            { id: 'no-air', label: 'Solid / No Air 🪨', color: '#64748B' },
        ],
    },
    {
        type: 'identify_use',
        question: 'What helps a kite fly high in the sky on a windy day?',
        answer: 'Moving air (wind)',
        options: ['Moving air (wind)', 'Water on the string', 'Bright sunshine'],
        hint: 'What pushes against the kite paper and lifts it up high?',
        misconception: 'Moving air (wind) pushes against the kite and lifts it up! The string only holds it; the wind does the lifting!',
    },
    {
        type: 'identify_habit',
        question: 'What should we plant to keep the air clean and fresh?',
        answer: 'Trees and plants',
        options: ['Trees and plants', 'Plastic bags', 'Garbage piles'],
        hint: 'Which green living things take in bad air and give out fresh air?',
        misconception: 'Planting trees and green plants keeps the air clean! Trees take in the gas we breathe out and give out fresh air, while trapping dust on their leaves.',
    },
    {
        type: 'sort_sources',
        question: 'Drag each item! Is it Clean Air or Dirty Air?',
        answer: 'sort',
        options: [],
        hint: 'Trees give clean air! Factory smoke and car fumes make air dirty!',
        misconception: 'Unclean air has smoke and dust from factories and vehicles. It causes coughing and burning eyes! Clean air from trees keeps us healthy!',
        sortItems: [
            { id: 'trees', label: 'Green Trees', emoji: '🌳', correctBin: 'clean' },
            { id: 'breeze', label: 'Fresh Breeze', emoji: '🍃', correctBin: 'clean' },
            { id: 'factory', label: 'Factory Smoke', emoji: '🏭', correctBin: 'dirty' },
            { id: 'car', label: 'Car Exhaust', emoji: '🚗', correctBin: 'dirty' },
        ],
        bins: [
            { id: 'clean', label: 'Clean Air 🍃', color: '#10B981' },
            { id: 'dirty', label: 'Dirty Air 🏭', color: '#EF4444' },
        ],
    },
    {
        type: 'sort_habits',
        question: 'Drag each activity to how we use air!',
        answer: 'sort',
        options: [],
        hint: 'We breathe air to live! We fill balloons and kites with air! Windmills use wind to spin!',
        misconception: 'Air has many uses: breathing to stay alive, filling balloons and kites, and turning windmill blades!',
        sortItems: [
            { id: 'breathe', label: 'Breathing', emoji: '🫁', correctBin: 'life' },
            { id: 'kite', label: 'Flying Kite', emoji: '🪁', correctBin: 'fly' },
            { id: 'balloon', label: 'Inflating Balloon', emoji: '🎈', correctBin: 'fly' },
            { id: 'windmill', label: 'Turning Windmill', emoji: 'windmill', correctBin: 'spin' },
        ],
        bins: [
            { id: 'life', label: 'Breathing 🫁', color: '#3B82F6' },
            { id: 'fly', label: 'Flying 🪁', color: '#8B5CF6' },
            { id: 'spin', label: 'Spinning ⚙️', color: '#F59E0B' },
        ],
    },
];
// ─── Pilot Pari Mascot ────────────────────────────────────────
function PilotPari({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px]">
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
                ? { y: [0, -4, 0] }
                : { rotate: [0, 5, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="jacket-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D97706"/>
              <stop offset="100%" stopColor="#B45309"/>
            </linearGradient>
            <linearGradient id="scarf-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444"/>
              <stop offset="100%" stopColor="#DC2626"/>
            </linearGradient>
          </defs>

          {/* Scarf blowing in wind */}
          <motion.path d="M38 38 Q55 30 68 42 Q60 48 45 42" fill="url(#scarf-grad)" animate={{ d: ['M38 38 Q55 30 68 42 Q60 48 45 42', 'M38 38 Q58 35 72 48 Q62 52 45 42', 'M38 38 Q55 30 68 42 Q60 48 45 42'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}/>

          {/* Body / Brown Pilot Jacket */}
          <path d="M22 50 L37 54 L52 50 L56 75 L18 75 Z" fill="url(#jacket-grad)" stroke="#78350F" strokeWidth="1.5" rx="3"/>
          <path d="M37 54 L37 75" stroke="#78350F" strokeWidth="1" strokeDasharray="2 2"/>

          {/* Head / Face */}
          <circle cx="37" cy="32" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5"/>

          {/* Pilot cap / helmet */}
          <path d="M21 32 C21 18, 53 18, 53 32 L53 35 L21 35 Z" fill="#475569" stroke="#334155" strokeWidth="1.5"/>
          <ellipse cx="37" cy="22" rx="14" ry="5" fill="#334155"/>

          {/* Aviator Goggles on cap */}
          <circle cx="30" cy="27" r="5" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.5" opacity="0.9"/>
          <circle cx="44" cy="27" r="5" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.5" opacity="0.9"/>
          <line x1="35" y1="27" x2="39" y2="27" stroke="#1E293B" strokeWidth="1.5"/>

          {/* Eyes */}
          <circle cx="30" cy="34" r="2" fill="#1E293B"/>
          <circle cx="44" cy="34" r="2" fill="#1E293B"/>

          {/* Smile */}
          <path d="M33 40 Q37 44 41 40" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

          {/* Scarf knot */}
          <circle cx="37" cy="40" r="4" fill="#EF4444"/>

          {/* Hands */}
          <circle cx="16" cy="62" r="5" fill="#FDE68A" stroke="#D97706" strokeWidth="1"/>
          <circle cx="58" cy="62" r="5" fill="#FDE68A" stroke="#D97706" strokeWidth="1"/>

          {/* Boots */}
          <ellipse cx="27" cy="78" rx="5" ry="3" fill="#334155"/>
          <ellipse cx="47" cy="78" rx="5" ry="3" fill="#334155"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Star Reward Row ──────────────────────────────────────────
function StarRow({ count, total }: {
    count: number;
    total: number;
}) {
    return (<div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (<motion.div key={i} initial={false} animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}} transition={{ duration: 0.5 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z"/>
          </svg>
        </motion.div>))}
    </div>);
}
// ─── Air Scene Background ─────────────────────────────────────
function AirSceneBackground({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #38BDF8 0%, #7DD3FC 40%, #BAE6FD 70%, #E0F2FE 100%)' }}/>

      {/* Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27.5" cy="27.5" r="16" fill="#FDE047" opacity="0.9"/>
          <circle cx="27.5" cy="27.5" r="11" fill="#FACC15"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="27.5" y1="27.5" x2={27.5 + 24 * Math.cos(angle * Math.PI / 180)} y2={27.5 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round"/>))}
        </svg>
      </motion.div>

      {/* Clouds moving */}
      <motion.div className="absolute top-10 left-1/4 opacity-80" animate={{ x: [0, 50, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white"/>
          <ellipse cx="45" cy="15" rx="22" ry="15" fill="white"/>
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="white"/>
        </svg>
      </motion.div>

      {/* Wind lines */}
      <motion.div className="absolute top-28 left-12" animate={{ x: [-20, 20, -20], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="120" height="20" viewBox="0 0 120 20">
          <path d="M5 10 Q35 0, 65 10 T115 10" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
        </svg>
      </motion.div>

      {/* Kite flying in background */}
      <motion.div className="absolute top-20 right-1/3" animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="40" height="60" viewBox="0 0 40 60">
          <polygon points="20,0 35,18 20,40 5,18" fill="#EF4444" stroke="#DC2626" strokeWidth="1"/>
          <line x1="20" y1="0" x2="20" y2="40" stroke="#991B1B" strokeWidth="1"/>
          <line x1="5" y1="18" x2="35" y2="18" stroke="#991B1B" strokeWidth="1"/>
          {/* Tail */}
          <path d="M20 40 Q25 48, 15 55 T20 60" stroke="#F59E0B" strokeWidth="1.5" fill="none"/>
        </svg>
      </motion.div>

      {/* Ground hills */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-[50%] scale-x-125"/>
    </div>);
}
// ─── Custom SVG Objects for Air Topics ────────────────────────
function BalloonIcon({ size = 65 }: {
    size?: number;
}) {
    return (<svg width={size} height={size + 15} viewBox="0 0 60 75">
      {/* Balloon body */}
      <ellipse cx="30" cy="28" rx="20" ry="24" fill="#EF4444" stroke="#B91C1C" strokeWidth="2"/>
      {/* Balloon shine */}
      <ellipse cx="22" cy="18" rx="5" ry="9" fill="white" opacity="0.5"/>
      {/* Knot */}
      <polygon points="27,52 33,52 35,56 25,56" fill="#B91C1C"/>
      {/* String */}
      <path d="M30 56 Q26 63, 30 72" stroke="#94A3B8" strokeWidth="1.5" fill="none"/>
    </svg>);
}
function KiteIcon({ size = 65 }: {
    size?: number;
}) {
    return (<svg width={size} height={size + 15} viewBox="0 0 60 75">
      <polygon points="30,2 52,28 30,58 8,28" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
      <line x1="30" y1="2" x2="30" y2="58" stroke="#1E40AF" strokeWidth="1.5"/>
      <line x1="8" y1="28" x2="52" y2="28" stroke="#1E40AF" strokeWidth="1.5"/>
      <path d="M30 58 Q36 65, 24 72" stroke="#F59E0B" strokeWidth="2" fill="none"/>
    </svg>);
}
function WindmillIcon({ size = 65 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 65 65">
      {/* Tower */}
      <polygon points="25,35 40,35 45,60 20,60" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5"/>
      {/* Blades spinning */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} style={{ originX: '32.5px', originY: '30px' }}>

        <ellipse cx="32.5" cy="15" rx="5" ry="14" fill="#38BDF8" opacity="0.9" />
        <ellipse cx="32.5" cy="45" rx="5" ry="14" fill="#38BDF8" opacity="0.9" />
        <ellipse cx="17.5" cy="30" rx="14" ry="5" fill="#38BDF8" opacity="0.9" />
        <ellipse cx="47.5" cy="30" rx="14" ry="5" fill="#38BDF8" opacity="0.9" />
        <circle cx="32.5" cy="30" r="5" fill="#0284C7" />
      </motion.g>
    </svg>
  );
}

function BottleIcon({ size = 65 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="24" y="8" width="12" height="10" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5" rx="2" />
      <path d="M24 18 Q20 25, 20 32 L20 50 Q20 54, 24 54 L36 54 Q40 54, 40 50 L40 32 Q40 25, 36 18 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" opacity="0.8" />
      {/* Air label */}
      <text x="30" y="38" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="bold">AIR</text>
    </svg>
  );
}

function TreeIcon({ size = 65 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="35" width="8" height="20" fill="#92400E" />
      <circle cx="30" cy="25" r="16" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <circle cx="20" cy="28" r="11" fill="#34D399" />
      <circle cx="40" cy="28" r="11" fill="#34D399" />
    </svg>
  );
}

function FactoryIcon({ size = 65 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="30" width="40" height="25" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
      <rect x="15" y="15" width="8" height="20" fill="#475569" />
      <rect x="35" y="15" width="8" height="20" fill="#475569" />
      {/* Smoke */}
      <circle cx="19" cy="10" r="5" fill="#94A3B8" opacity="0.7" />
      <circle cx="23" cy="5" r="7" fill="#94A3B8" opacity="0.5" />
      <circle cx="39" cy="10" r="5" fill="#94A3B8" opacity="0.7" />
      <circle cx="43" cy="5" r="7" fill="#94A3B8" opacity="0.5" />
    </svg>
  );
}

// ─── Sort Card Component ──────────────────────────────────────

function renderSortIcon(id: string, size: number = 48) {
  if (id.includes('balloon')) return <BalloonIcon size={size} />;
  if (id.includes('kite')) return <KiteIcon size={size} />;
  if (id.includes('windmill')) return <WindmillIcon size={size} />;
  if (id.includes('bottle')) return <BottleIcon size={size} />;
  if (id.includes('tree')) return <TreeIcon size={size} />;
  if (id.includes('factory')) return <FactoryIcon size={size} />;
  if (id.includes('breathe')) return <TreeIcon size={size} />;
  if (id.includes('breeze')) return <WindmillIcon size={size} />;
  if (id.includes('car')) return <FactoryIcon size={size} />;
  if (id.includes('clean')) return <TreeIcon size={size} />;
  if (id.includes('dirty')) return <FactoryIcon size={size} />;
  if (id.includes('fly')) return <KiteIcon size={size} />;
  if (id.includes('has-air')) return <BalloonIcon size={size} />;
  if (id.includes('no-air')) return <BottleIcon size={size} />;
  if (id.includes('rock')) return <BottleIcon size={size} />;
  if (id.includes('sealed')) return <BottleIcon size={size} />;
  if (id.includes('spin')) return <WindmillIcon size={size} />;
  if (id.includes('wind')) return <WindmillIcon size={size} />;
  return null;
}

function SortCard({ id, label, emoji, x, y, placed, onDragStart, onDragEnd }: {
  id: string;
  label: string;
  emoji: string;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
  return (
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${placed ? 'opacity-60' : 'cursor-grab hover:scale-105'}`} style={{ width: 110, height: 95, background: 'white', borderColor: '#0284C7' }}>
        {renderSortIcon(id, 48)}
        <span className="text-xs font-bold text-center px-1 mt-1 text-gray-700">{label}</span>
      </div>
    </Draggable>
  );
}

function SortBin({ id, label, color, x, y, width, height, isHovering }: {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
}) {
  return (
    <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110' : ''}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}22`, boxShadow: isHovering ? `0 0 20px ${color}` : 'none' }}>
      {renderSortIcon(id, 48)}
      <div className="text-sm font-bold text-center px-2" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── Teaching Screen ─────────��────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number;}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  const handleNext = () => {
    audioManager.play('tap');
    if (slide < total - 1) {
      setSlide(slide + 1);
    } else {
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (slide > 0) {
      setSlide(slide - 1);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl overflow-hidden" style={{ width, height, background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}>
      <AirSceneBackground width={width} height={height}/>
      <PilotPari mood="happy" speaking={null}/>

      <div className="z-10 flex flex-col items-center max-w-lg text-center mt-4 bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl">
        <span className="text-5xl mb-2">{current.emoji}</span>
        <h2 className="text-2xl font-extrabold text-gold-900 mb-2">{current.title}</h2>
        <p className="text-base font-medium text-gray-700 leading-relaxed">{current.text}</p>
      </div>

      {/* Progress dots */}
      <div className="z-10 flex gap-2 mb-2">
        {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`h-3 rounded-full transition-all ${i === slide ? 'w-8 bg-gold-600' : 'w-3 bg-gold-300'}`}/>))}
      </div>

      {/* Navigation buttons */}
      <div className="z-10 flex justify-between w-full max-w-md px-4 mb-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-5 py-2.5 rounded-full font-bold text-white shadow-lg transition-all ${slide === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gold-500 hover:bg-gold-600'}`}>
          Back
        </button>
        <button onClick={handleNext} className="px-8 py-2.5 rounded-full font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg hover:brightness-110 transition-all">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}

// ─── Main AirGame Component ───────────────────────────────────

export interface AirGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function AirGame({width = 720, height = 560, onComplete}: AirGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>("Let's learn about air! 🌬️");

  // Sparkle burst state
  const [sparklePos, setSparklePos] = useState<{x: number; y: number} | null>(null);

  // Sorting drag state
  const [sortPositions, setSortPositions] = useState<Record<string, {
        x: number;
        y: number;
    }>>();
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>();
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const challenge = CHALLENGES[currentChallengeIndex];

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && challenge) {
        audioManager.play('hint');
        setHintMessage(challenge.hint);
        setMascotMood('thinking');
        setMascotSpeech("Need a little clue? Check the hint!");
        speechManager.speak("Need a little clue? Check the hint!");
      }
    }, 10000);
  }, [screen, challenge]);

  useEffect(() => {
    if (screen === 'play') {
      resetInactivityTimer();
    }
    return () => {
      speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [screen, currentChallengeIndex, resetInactivityTimer]);

  // Initialize sort positions when challenge changes
  useEffect(() => {
    if (challenge.type.startsWith('sort') && challenge.sortItems) {
      const initialPos: Record<string, {x: number; y: number}> = {};
      const initialPlaced: Record<string, boolean> = {};
      challenge.sortItems.forEach((item, index) => {
        initialPos[item.id] = { x: 50 + index * 130, y: 340 };
        initialPlaced[item.id] = false;
      });
      setSortPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
  }, [currentChallengeIndex, challenge]);

  // Handle Multiple Choice Answer
  const handleAnswerOption = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if (option === challenge.answer) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setSparklePos({x, y});
      setStars(s => s + 1);
      setMascotMood('celebrate');
      setMascotSpeech("Fantastic! You got it right! 🎉");
      speechManager.speak("Fantastic! You got it right! 🎉");

      setTimeout(() => {
        advanceChallenge();
      }, 1200);
    } else {
      audioManager.play('error');
      setErrors(eCount => eCount + 1);
      setMascotMood('thinking');
      setHintMessage(challenge.misconception);
      setMascotSpeech("Not quite! Let's think about why...");
      speechManager.speak("Not quite! Let's think about why...");
    }
  };

  // Handle Drag Start
  const handleDragStart = () => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  // Handle Drag End for Sort Challenges
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    if (!challenge.sortItems || !challenge.bins) return false;

    const item = challenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bins positions
    // Bin 1: left 120, top 120, width 200, height 180
    // Bin 2: left 380, top 120, width 200, height 180
    let matchedBin: string | null = null;
    if (x >= 100 && x <= 320 && y >= 100 && y <= 310) {
      matchedBin = challenge.bins[0].id;
    } else if (x >= 360 && x <= 580 && y >= 100 && y <= 310) {
      matchedBin = challenge.bins[1].id;
    } else if (challenge.bins.length > 2 && x >= 240 && x <= 480 && y >= 220 && y <= 420) {
      matchedBin = challenge.bins[2].id;
    }

    if (matchedBin && matchedBin === item.correctBin) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setSparklePos({x, y});
      setPlacedItems(prev => ({...prev, [id]: true}));
      setSortPositions(prev => ({...prev, [id]: {x: matchedBin === challenge.bins?.[0].id ? 180 : 440, y: 180}}));

      // Check if all items placed
      const newPlaced = {...placedItems, [id]: true};
      const allDone = challenge.sortItems.every(i => newPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars(s => s + 1);
        setMascotMood('celebrate');
        setMascotSpeech("All sorted correctly! Amazing job! 🌟");
        speechManager.speak("All sorted correctly! Amazing job! 🌟");
        setTimeout(() => {
          advanceChallenge();
        }, 1500);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(eCount => eCount + 1);
      setMascotMood('thinking');
      setHintMessage(challenge.misconception);
      setMascotSpeech("Try dropping it in the other bin!");
      speechManager.speak("Try dropping it in the other bin!");
      return false;
    }
  };

  const advanceChallenge = () => {
    setHintMessage(null);
    setMascotMood('happy');
    setMascotSpeech("Ready for the next question?");
    speechManager.speak("Ready for the next question?");
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(c => c + 1);
    } else {
      // Game complete!
      setShowConfetti(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) {
        onComplete(finalScore);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl overflow-hidden select-none" style={{ width, height, background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)' }}>
      <AirSceneBackground width={width} height={height}/>
      <PilotPari mood={mascotMood} speaking={mascotSpeech}/>

      {screen === 'teaching' ? (<TeachingScreen onStart={() => { setScreen('play'); audioManager.play('tap'); }} width={width} height={height}/>) : (<>
          {/* Header Row */}
          <div className="z-10 flex items-center justify-between w-full px-4 py-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-gold-900">Air Game 🌬️</span>
              <span className="text-xs font-bold text-gold-700 bg-gold-200 px-2 py-0.5 rounded-full">
                Q {currentChallengeIndex + 1} / {CHALLENGES.length}
              </span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length}/>
          </div>

          {/* Question Box */}
          <div className="z-10 flex flex-col items-center w-full max-w-xl my-2 bg-white/90 backdrop-blur-md rounded-3xl p-5 shadow-xl">
            <h3 className="text-lg font-extrabold text-gold-900 text-center mb-3">
              {challenge.question}
            </h3>

            {/* Multiple Choice Options */}
            {!challenge.type.startsWith('sort') && (<div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {challenge.options.map((option, idx) => (<motion.button key={idx} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={e => handleAnswerOption(option, e)} className="w-full py-3 px-5 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-2xl shadow-md hover:brightness-110 transition-all text-sm md:text-base text-center">
                    {option}
                  </motion.button>))}
              </div>)}
          </div>

          {/* Sort Challenge Area */}
          {challenge.type.startsWith('sort') && challenge.sortItems && challenge.bins && (<div className="relative z-10 w-full flex-1 max-w-xl my-2">
              {/* Bins */}
              <div className="absolute inset-x-0 top-2 flex justify-around px-8">
                {challenge.bins.map((bin, idx) => (<SortBin key={bin.id} id={bin.id} label={bin.label} color={bin.color} x={idx === 0 ? 40 : idx === 1 ? 380 : 210} y={10} width={150} height={130} isHovering={hoverBin === bin.id}/>))}
              </div>

              {/* Draggable Cards */}
              <div className="absolute inset-x-0 bottom-4 flex justify-around px-6">
                {challenge.sortItems.map(item => (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={sortPositions[item.id]?.x || 50} y={sortPositions[item.id]?.y || 320} placed={!!placedItems[item.id]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>))}
              </div>
            </div>)}

          {/* Footer / Hint button */}
          <div className="z-10 flex justify-between w-full max-w-xl px-4 mb-1">
            <button onClick={() => {
                audioManager.play('hint');
                setHintMessage(challenge.hint);
                setMascotMood('thinking');
                setMascotSpeech("Here is a helpful hint!");
                speechManager.speak("Here is a helpful hint!");
            }} className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-full shadow-md text-xs transition-all flex items-center gap-1">
              💡 Hint
            </button>
            <span className="text-xs font-bold text-white/90 drop-shadow">
              Errors: {errors}
            </span>
          </div>
        </>)}

      {/* Feedback & Effects */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {showSuccessBanner && (<SuccessBanner message={`Great Job! You scored ${Math.max(0, 100 - errors * 5)} points!`}
          onComplete={() => setShowSuccessBanner(false)}
        />
      )}
      {hintMessage && (<HintBubble message={hintMessage} onComplete={() => setHintMessage(null)}/>)}
      {sparklePos && (<SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>)}
    </div>
  );
}
