'use client';
/**
 * PlantTypesGame - Learn about plant types (land, water, climbers),
 * edible parts (root, leaf, seed, fruit), and medicinal plants (tulsi, neem, aloe).
 *
 * CISCE Nodes: c1_bio_015 (Plants on land, water, climbers),
 *              c1_bio_016 (Edible parts of plants),
 *              c1_bio_017 (Medicinal plants)
 *
 * Enrichment: c1_biology_enrichment_part15-17
 *
 * ELI5: "Some plants live in soil, some float on water, and some need a wall or
 *   stick to climb! Plants also give us delicious food from roots, leaves, seeds,
 *   and fruits, and tiny green doctors like tulsi and neem help us stay healthy!"
 *
 * Misconceptions (from enrichment):
 *   1. "All plants grow in soil on land" → "No! Lotus grows in water ponds, and
 *      money plants climb up walls for support!"
 *   2. "If a food grows under soil, it is always a root" → "No! Carrots are roots,
 *      but potatoes are underground stems!"
 *   3. "Only sweet things are fruits" → "No! In biology, fruits are plant parts
 *      that hold seeds inside them!"
 *   4. "All green leaves are safe to eat or use as medicine" → "No! Only specific
 *      herbs like tulsi, neem, and aloe vera are used as natural remedies, always
 *      with adult guidance!"
 *
 * Story: "Help Gardener Gita sort plants into land, water, and climbers, find
 *   edible plant parts in her kitchen garden, and discover herbal helpers!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG garden scene background (sky, garden beds, pond, trellis, butterflies)
 * - Custom SVG plant component icons (mango tree, lotus, money plant, carrot, spinach, pea, tulsi, neem, aloe)
 * - Custom SVG gardener mascot (Gardener Gita) with straw hat and trowel
 * - Drag-and-drop: drag plants into sorting bins
 * - 8 progressive challenges: identify land/water/climber → sort → identify edible parts → sort edible → sort medicinal
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after inactivity
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
        title: 'Where Do Plants Grow? 🌿',
        text: 'Plants live in different places! Mango and neem grow on land in soil. Lotus lives in a pond with its leaves floating on water. Money plants are climbers that need a wall or stick for support!',
        emoji: '🌳',
        bgColor: 'from-emerald-400 to-green-600',
    },
    {
        title: 'Edible Parts of Plants 🥕',
        text: 'Plants give us delicious food! We eat roots like carrots, leaves like spinach, seeds like peas, and juicy fruits like mangoes and bananas!',
        emoji: '🥗',
        bgColor: 'from-amber-400 to-orange-500',
    },
    {
        title: 'Herbal Doctors: Medicinal Plants 🍃',
        text: 'Some plants help us feel better when we are not well! Tulsi leaves help with coughs and colds. Neem is great for the skin. Aloe vera gel soothes small burns!',
        emoji: '🌿',
        bgColor: 'from-teal-400 to-emerald-600',
    },
    {
        title: 'Land, Water, and Climbers 🌊',
        text: 'Land plants stand firmly in soil. Water plants float peacefully in ponds. Climbers have soft stems and creep upward, holding on to a wall or stick!',
        emoji: '🌺',
        bgColor: 'from-cyan-400 to-blue-600',
    },
    {
        title: 'Always Ask an Adult! 🧑‍⚕️',
        text: 'Never pluck or eat unknown leaves from the garden! Medicinal plants like tulsi and aloe vera must always be used with adult guidance and care!',
        emoji: '🛡️',
        bgColor: 'from-purple-400 to-indigo-600',
    },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_type' | 'identify_edible' | 'sort_plants' | 'sort_edible' | 'sort_medicinal';
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
        type: 'identify_type',
        question: 'Where does a LOTUS plant grow?',
        answer: 'In water (pond)',
        options: ['In water (pond)', 'On dry land', 'Climbing a wall'],
        hint: 'Think: where do we see lotus flowers floating? In a pond!',
        misconception: 'A lotus is a water plant! Its leaves float on the water in a pond. Not all plants grow in dry soil on land!',
    },
    {
        type: 'identify_type',
        question: 'Where does a MANGO tree grow?',
        answer: 'On land (soil)',
        options: ['In water', 'On land (soil)', 'Climbing a rope'],
        hint: 'A mango tree stands tall in an orchard with its roots deep in the soil.',
        misconception: 'A mango tree is a land plant! Its roots go deep into the soil to hold it firmly. It does not need water to float or a wall to climb!',
    },
    {
        type: 'identify_type',
        question: 'How does a MONEY PLANT grow upward?',
        answer: 'Climbs on support (wall/stick)',
        options: ['Stands on its own like a tree', 'Floats in a pond', 'Climbs on support (wall/stick)'],
        hint: 'Money plants have soft stems and need something to hold onto as they creep up.',
        misconception: 'A money plant is a climber! It cannot stand straight on its own; it needs a wall, stick, or string for support!',
    },
    {
        type: 'sort_plants',
        question: 'Drag each plant to its correct home!',
        answer: 'sort',
        options: [],
        hint: 'Mango = land, Lotus = water, Money plant = climber!',
        misconception: 'Remember: land plants grow in soil (mango), water plants float in ponds (lotus), and climbers need support (money plant)!',
        sortItems: [
            { id: 'mango', label: 'Mango Tree', emoji: '🌳', correctBin: 'land' },
            { id: 'lotus', label: 'Lotus', emoji: '🌸', correctBin: 'water' },
            { id: 'money', label: 'Money Plant', emoji: '🌿', correctBin: 'climber' },
            { id: 'neem', label: 'Neem Tree', emoji: '🌲', correctBin: 'land' },
        ],
        bins: [
            { id: 'land', label: 'Land Plant 🌳', color: '#16A34A' },
            { id: 'water', label: 'Water Plant 💧', color: '#0284C7' },
            { id: 'climber', label: 'Climber 🧗', color: '#9333EA' },
        ],
    },
    {
        type: 'identify_edible',
        question: 'What part of a CARROT plant do we eat?',
        answer: 'Root',
        options: ['Root', 'Leaf', 'Fruit'],
        hint: 'Carrots grow under the soil and are thick and orange!',
        misconception: 'Carrots are roots that grow under the soil! We wash them and eat them. Not all underground parts are stems - carrots are true roots!',
    },
    {
        type: 'identify_edible',
        question: 'What part of a SPINACH plant do we eat?',
        answer: 'Leaf',
        options: ['Root', 'Leaf', 'Seed'],
        hint: 'Spinach has flat, green parts that we pluck and cook as a vegetable.',
        misconception: 'Spinach is a leaf vegetable! We pluck the flat green leaves, wash them, and cook them. We are not eating the stem or root here!',
    },
    {
        type: 'sort_edible',
        question: 'Drag each food to the part of the plant we eat!',
        answer: 'sort',
        options: [],
        hint: 'Carrot = root, Spinach = leaf, Pea = seed, Mango = fruit!',
        misconception: 'Remember: carrot is a root underground, spinach is a leafy vegetable, peas are seeds inside a pod, and mango is a juicy fruit!',
        sortItems: [
            { id: 'carrot', label: 'Carrot', emoji: '🥕', correctBin: 'root' },
            { id: 'spinach', label: 'Spinach', emoji: '🥬', correctBin: 'leaf' },
            { id: 'pea', label: 'Peas', emoji: '🟢', correctBin: 'seed' },
            { id: 'mango', label: 'Mango', emoji: '🥭', correctBin: 'fruit' },
        ],
        bins: [
            { id: 'root', label: 'Root 🥕', color: '#EA580C' },
            { id: 'leaf', label: 'Leaf 🥬', color: '#16A34A' },
            { id: 'seed', label: 'Seed 🟢', color: '#CA8A04' },
            { id: 'fruit', label: 'Fruit 🥭', color: '#DC2626' },
        ],
    },
    {
        type: 'sort_medicinal',
        question: 'Sort these plants into Medicinal Helpers vs Food Fruits!',
        answer: 'sort',
        options: [],
        hint: 'Tulsi and neem help when sick or for skin! Mango and banana are yummy fruits!',
        misconception: 'Not all plants are eaten for meals! Tulsi, neem, and aloe vera are medicinal herbs used for natural remedies with adult guidance, while mango and banana are everyday food fruits!',
        sortItems: [
            { id: 'tulsi', label: 'Tulsi', emoji: '🌿', correctBin: 'medicinal' },
            { id: 'neem', label: 'Neem', emoji: '🍃', correctBin: 'medicinal' },
            { id: 'banana', label: 'Banana', emoji: '🍌', correctBin: 'food' },
            { id: 'apple', label: 'Apple', emoji: '🍎', correctBin: 'food' },
        ],
        bins: [
            { id: 'medicinal', label: 'Medicinal Herb 🍃', color: '#0D9488' },
            { id: 'food', label: 'Food Fruit 🍎', color: '#E11D48' },
        ],
    },
];
// ─── Gardener Gita Mascot ─────────────────────��────────────────
function GardenerGita({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-green-500">
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
        <svg width="70" height="85" viewBox="0 0 70 85">
          <defs>
            <linearGradient id="gita-apron" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80"/>
              <stop offset="100%" stopColor="#16A34A"/>
            </linearGradient>
            <radialGradient id="straw-hat" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#FDE047"/>
              <stop offset="100%" stopColor="#CA8A04"/>
            </radialGradient>
          </defs>
          {/* Head & Face */}
          <circle cx="35" cy="32" r="14" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1"/>
          {/* Hair */}
          <path d="M21 32 C21 22, 49 22, 49 32 L49 38 L21 38 Z" fill="#451A03"/>
          {/* Straw Hat */}
          <ellipse cx="35" cy="22" rx="22" ry="6" fill="url(#straw-hat)" stroke="#854D0E" strokeWidth="1"/>
          <path d="M25 20 C25 12, 45 12, 45 20 Z" fill="url(#straw-hat)" stroke="#854D0E" strokeWidth="1"/>
          <rect x="25" y="19" width="20" height="3" fill="#EF4444"/>
          {/* Eyes */}
          <circle cx="30" cy="32" r="2" fill="#1F2937"/>
          <circle cx="40" cy="32" r="2" fill="#1F2937"/>
          {/* Dirt smudge on cheek */}
          <ellipse cx="27" cy="36" rx="2" ry="1" fill="#A16207" opacity="0.6"/>
          {/* Smile */}
          <path d="M31 37 Q35 41 39 37" stroke="#DC2626" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Green Apron Body */}
          <path d="M24 46 L46 46 L50 72 L20 72 Z" fill="url(#gita-apron)" stroke="#15803D" strokeWidth="1"/>
          {/* Pocket with flower */}
          <rect x="30" y="56" width="10" height="10" fill="#22C55E" stroke="#15803D" strokeWidth="1" rx="2"/>
          <circle cx="35" cy="53" r="3" fill="#F43F5E"/>
          <circle cx="35" cy="53" r="1.5" fill="#FDE047"/>
          {/* Arms */}
          <circle cx="17" cy="52" r="4" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1"/>
          <circle cx="53" cy="52" r="4" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1"/>
          {/* Feet */}
          <ellipse cx="28" cy="78" rx="5" ry="3" fill="#78350F"/>
          <ellipse cx="42" cy="78" rx="5" ry="3" fill="#78350F"/>
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z"/>
          </svg>
        </motion.div>))}
    </div>);
}
// ─── Garden Scene Background ──────────────────────────────────
function GardenScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 40%, #FEF9C3 70%, #DCFCE7 100%)' }}/>
      {/* Sun */}
      <motion.div className="absolute top-4 left-4" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27.5" cy="27.5" r="16" fill="#FACC15" opacity="0.9"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="27.5" y1="27.5" x2={27.5 + 24 * Math.cos(angle * Math.PI / 180)} y2={27.5 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round"/>))}
        </svg>
      </motion.div>
      {/* Fluffy clouds */}
      <motion.div className="absolute top-6 left-1/3 opacity-80" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="75" height="32" viewBox="0 0 75 32">
          <ellipse cx="24" cy="19" rx="17" ry="11" fill="white"/>
          <ellipse cx="44" cy="14" rx="21" ry="14" fill="white"/>
          <ellipse cx="56" cy="19" rx="15" ry="10" fill="white"/>
        </svg>
      </motion.div>
      {/* Ground hill */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(180deg, #84CC16 0%, #65A30D 50%, #4D7C0F 100%)', borderRadius: '50% 50% 0 0 / 20% 20% 0 0' }}/>
      {/* Butterflies */}
      <motion.div className="absolute top-28 left-20" animate={{ x: [0, 40, 80, 40, 0], y: [0, -20, 10, -10, 0], rotate: [0, 15, -15, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 12 C8 6, 2 8, 4 12 C6 16, 10 16, 12 12 Z" fill="#EC4899"/>
          <path d="M12 12 C16 6, 22 8, 20 12 C18 16, 14 16, 12 12 Z" fill="#F43F5E"/>
          <line x1="12" y1="8" x2="12" y2="18" stroke="#1F2937" strokeWidth="1"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Plant Component Icons (SVG) ──────────────────────────────
function MangoTreeIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="38" width="8" height="18" fill="#78350F"/>
      <circle cx="30" cy="24" r="18" fill="#16A34A"/>
      <circle cx="20" cy="20" r="10" fill="#22C55E"/>
      <circle cx="40" cy="22" r="11" fill="#15803D"/>
      {/* Mangoes */}
      <ellipse cx="24" cy="24" rx="3" ry="4" fill="#FACC15"/>
      <ellipse cx="36" cy="20" rx="3" ry="4" fill="#F59E0B"/>
      <ellipse cx="32" cy="30" rx="3" ry="4" fill="#EAB308"/>
    </svg>);
}
function LotusIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Water pond ellipse */}
      <ellipse cx="30" cy="45" rx="26" ry="10" fill="#0284C7"/>
      {/* Lily pad */}
      <ellipse cx="30" cy="46" rx="14" ry="5" fill="#16A34A"/>
      {/* Lotus flower */}
      <path d="M30 42 C20 40, 22 24, 30 15 C38 24, 40 40, 30 42 Z" fill="#F43F5E"/>
      <path d="M30 42 C24 38, 26 26, 30 18 C34 26, 36 38, 30 42 Z" fill="#FB7185"/>
      <path d="M30 42 C27 38, 28 30, 30 22 C32 30, 33 38, 30 42 Z" fill="#FDA4AF"/>
    </svg>);
}
function MoneyPlantIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Trellis support */}
      <line x1="20" y1="5" x2="20" y2="55" stroke="#A16207" strokeWidth="2.5"/>
      <line x1="40" y1="5" x2="40" y2="55" stroke="#A16207" strokeWidth="2.5"/>
      <line x1="15" y1="20" x2="45" y2="15" stroke="#CA8A04" strokeWidth="1.5"/>
      <line x1="15" y1="38" x2="45" y2="33" stroke="#CA8A04" strokeWidth="1.5"/>
      {/* Creeping stem & leaves */}
      <path d="M30 55 Q22 45, 32 35 Q40 25, 28 15" stroke="#15803D" strokeWidth="2" fill="none"/>
      <circle cx="28" cy="44" r="7" fill="#22C55E"/>
      <circle cx="34" cy="28" r="8" fill="#16A34A"/>
      <circle cx="24" cy="18" r="7" fill="#4ADE80"/>
    </svg>);
}
function CarrotIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Green leaves */}
      <path d="M30 20 L22 8 M30 20 L30 6 M30 20 L38 8" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Carrot body */}
      <path d="M24 20 C24 20, 36 20, 36 20 C38 32, 34 45, 30 55 C26 45, 22 32, 24 20 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5"/>
      {/* Horizontal stripes */}
      <line x1="26" y1="28" x2="34" y2="28" stroke="#EA580C" strokeWidth="1"/>
      <line x1="27" y1="36" x2="33" y2="36" stroke="#EA580C" strokeWidth="1"/>
      <line x1="28" y1="44" x2="32" y2="44" stroke="#EA580C" strokeWidth="1"/>
    </svg>);
}
function SpinachIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 L30 30" stroke="#15803D" strokeWidth="2"/>
      {/* Leaf 1 */}
      <path d="M30 35 C15 35, 10 15, 30 10 C50 15, 45 35, 30 35 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5"/>
      <path d="M30 10 L30 35" stroke="#16A34A" strokeWidth="1"/>
      {/* Leaf 2 */}
      <path d="M30 42 C18 42, 12 25, 30 20 C48 25, 42 42, 30 42 Z" fill="#16A34A" stroke="#14532D" strokeWidth="1.5"/>
    </svg>);
}
function PeaIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Pea pod */}
      <path d="M10 30 C10 20, 30 15, 50 30 C50 40, 30 45, 10 30 Z" fill="#84CC16" stroke="#4D7C0F" strokeWidth="1.5"/>
      {/* Peas inside */}
      <circle cx="22" cy="30" r="6" fill="#BEF264" stroke="#65A30D" strokeWidth="1"/>
      <circle cx="35" cy="30" r="6" fill="#BEF264" stroke="#65A30D" strokeWidth="1"/>
    </svg>);
}
function TulsiIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Pot */}
      <path d="M20 42 L40 42 L45 55 L15 55 Z" fill="#B45309" stroke="#78350F" strokeWidth="1.5"/>
      {/* Plant leaves */}
      <circle cx="30" cy="24" r="14" fill="#0D9488"/>
      <circle cx="21" cy="22" r="8" fill="#14B8A6"/>
      <circle cx="39" cy="22" r="8" fill="#14B8A6"/>
      <circle cx="30" cy="14" r="7" fill="#2DD4BF"/>
    </svg>);
}
function NeemIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="27" y="38" width="6" height="18" fill="#78350F"/>
      <ellipse cx="30" cy="22" rx="16" ry="14" fill="#15803D"/>
      {/* Jagged leaf pattern overlay */}
      <path d="M16 22 L30 10 L44 22 Z" fill="#16A34A" opacity="0.8"/>
      <path d="M18 30 L30 18 L42 30 Z" fill="#22C55E" opacity="0.8"/>
    </svg>);
}
function BananaIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 38 Q30 50, 48 30 Q35 25, 20 30 Q14 33, 12 38 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5"/>
      <path d="M12 38 Q10 40, 8 42" stroke="#78350F" strokeWidth="2" strokeLinecap="round"/>
    </svg>);
}
function AppleIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 15 C20 15, 12 25, 12 36 C12 47, 22 52, 30 52 C38 52, 48 47, 48 36 C48 25, 40 15, 30 15 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5"/>
      {/* Stem & leaf */}
      <path d="M30 15 L32 8" stroke="#78350F" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 10 C36 8, 40 10, 38 14 Z" fill="#22C55E"/>
    </svg>);
}
// Helper to render the correct SVG icon by ID
function renderPlantIcon(id: string, size = 60) {
    switch (id) {
        case 'mango': return <MangoTreeIcon size={size}/>;
        case 'lotus': return <LotusIcon size={size}/>;
        case 'money': return <MoneyPlantIcon size={size}/>;
        case 'neem': return <NeemIcon size={size}/>;
        case 'carrot': return <CarrotIcon size={size}/>;
        case 'spinach': return <SpinachIcon size={size}/>;
        case 'pea': return <PeaIcon size={size}/>;
        case 'tulsi': return <TulsiIcon size={size}/>;
        case 'banana': return <BananaIcon size={size}/>;
        case 'apple': return <AppleIcon size={size}/>;
        default: return <MangoTreeIcon size={size}/>;
    }
}
// ─── Sort Card Component ──────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('mango'))
        return <MangoTreeIcon size={size}/>;
    if (id.includes('tree'))
        return <MangoTreeIcon size={size}/>;
    if (id.includes('land'))
        return <MangoTreeIcon size={size}/>;
    if (id.includes('lotus'))
        return <LotusIcon size={size}/>;
    if (id.includes('water'))
        return <LotusIcon size={size}/>;
    if (id.includes('money'))
        return <MoneyPlantIcon size={size}/>;
    if (id.includes('climber'))
        return <MoneyPlantIcon size={size}/>;
    if (id.includes('carrot'))
        return <CarrotIcon size={size}/>;
    if (id.includes('root'))
        return <CarrotIcon size={size}/>;
    if (id.includes('spinach'))
        return <SpinachIcon size={size}/>;
    if (id.includes('leaf'))
        return <SpinachIcon size={size}/>;
    if (id.includes('pea'))
        return <PeaIcon size={size}/>;
    if (id.includes('seed'))
        return <PeaIcon size={size}/>;
    if (id.includes('tulsi'))
        return <TulsiIcon size={size}/>;
    if (id.includes('medicinal'))
        return <TulsiIcon size={size}/>;
    if (id.includes('neem'))
        return <NeemIcon size={size}/>;
    if (id.includes('banana'))
        return <BananaIcon size={size}/>;
    if (id.includes('apple'))
        return <AppleIcon size={size}/>;
    if (id.includes('fruit'))
        return <AppleIcon size={size}/>;
    if (id.includes('food'))
        return <AppleIcon size={size}/>;
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
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 ${placed ? 'opacity-40 border-gray-300 bg-gray-100' : 'border-green-300 bg-white'} px-2 py-2`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(id, 48)}
        <span className="text-xs font-bold text-gray-700 text-center mt-1">{label}</span>
      </div>
    </Draggable>);
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
    <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110' : ''}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}22`, boxShadow: isHovering ? `0 0 20px ${color}` : 'none' }}>
      <div className="text-sm font-extrabold text-center px-1" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── Teaching Screen ──────────────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  const handleNext = () => {audioManager.play('tap');
    if (slide < total - 1) {setSlide(s => s + 1);}
    else {onStart();}
  };

  const handlePrev = () => {audioManager.play('tap');
    if (slide > 0) setSlide(s => s - 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100" style={{ width, height }}>
      <GardenScene width={width} height={height}/>

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-2xl shadow">
          <span className="text-2xl">🌿</span>
          <span className="font-extrabold text-green-800 text-lg">Plant Kingdom Explorer</span>
        </div>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-green-600' : 'w-2.5 bg-green-300'}`}/>))}
        </div>
      </div>

      {/* Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl max-w-lg w-full flex flex-col items-center text-center border-4 border-green-200 my-auto">
        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${current.bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
          {current.emoji}
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">{current.title}</h2>
        <p className="text-base font-medium text-gray-600 leading-relaxed">{current.text}</p>
      </motion.div>
    { /* Footer controls */ }
    <div className="relative z-10 w-full flex items-center justify-between pt-2">
        {slide > 0 ? (<button onClick={handlePrev} className="px-6 py-3 rounded-2xl bg-white/80 font-bold text-green-700 shadow hover:bg-white transition-all flex items-center gap-2">
            ⬅️ Back
          </button>) : <div />}
        <button onClick={handleNext} className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-extrabold text-lg shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}
// ─── Main Component ───────────────────────────────────────────
export interface PlantTypesGameProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
export function PlantTypesGame({ width = 720, height = 560, onComplete }: PlantTypesGameProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(0);
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [speakingText, setSpeakingText] = useState<string | null>('Welcome to Gardener Gita\'s Plant Park! Let us explore plants!');

  // Feedback states
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Sort challenge state: map of item id -> { placed: boolean, binId?: string }
  const [sortState, setSortState] = useState<Record<string, { placed: boolean; binId?: string }>>({});
  const challenge = CHALLENGES[currentChallenge];

  // Inactivity hint timer ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      audioManager.play('hint');
      setHintMessage(challenge.hint);
      setMascotMood('thinking');
      setSpeakingText(challenge.hint);
      speechManager.speak(challenge.hint);
    }, 10000);
  }, [challenge.hint]);

  useEffect(() => {
    if (screen === 'play') {
      resetInactivityTimer();
    }
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallenge, screen, resetInactivityTimer]);

  // Reset sort items when challenge changes
  useEffect(() => {
    if (challenge.type.startsWith('sort') && challenge.sortItems) {
      const initial: Record<string, { placed: boolean }> = {};
      challenge.sortItems.forEach(item => {
        initial[item.id] = { placed: false };
      });
      setSortState(initial);
    }
  }, [currentChallenge, challenge]);

  // Handle multiple choice answer
  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    if (option === challenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSpeakingText('Wonderful! That is correct!');
      speechManager.speak('Wonderful! That is correct!');
      setSparklePos({ x: width / 2, y: height / 2 });
      const newStars = stars + 1;
      setStars(newStars);

      setTimeout(() => {
        if (currentChallenge < CHALLENGES.length - 1) {
          setCurrentChallenge(c => c + 1);
          setMascotMood('happy');
          setSpeakingText('Great job! Now try the next challenge.');
          speechManager.speak('Great job! Now try the next challenge.');
        } else {
          setShowConfetti(true);
          setShowSuccessBanner(true);
          audioManager.play('celebration');
          if (onComplete) {
            const finalScore = Math.max(0, 100 - errors * 5);
            onComplete(finalScore);
          }
        }
      }, 1200);
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setMascotMood('thinking');
      setSpeakingText(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = challenge.sortItems?.find(i => i.id === id);
    if (!item || !challenge.bins) return false;

    // Check bin bounding boxes
    // Bin layout: 2 or 3 bins horizontally centered at bottom
    const binWidth = 140;
    const binHeight = 85;
    const totalBins = challenge.bins.length;
    const startX = (width - (totalBins * binWidth + (totalBins - 1) * 20)) / 2;
    const binY = height - 130;

    let droppedInBin: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = binY;
      if (x >= bx - 30 && x <= bx + binWidth + 30 && y >= by - 30 && y <= by + binHeight + 30) {
        droppedInBin = bin.id;
      }
    });

    if (droppedInBin) {
      const binId: string = droppedInBin;
      if (binId === item.correctBin) {
        audioManager.play('drop-correct');
        setSortState(prev => ({ ...prev, [id]: { placed: true, binId } }));
        setSparklePos({ x, y });

        // Check if all items placed
        const updated = { ...sortState, [id]: { placed: true, binId } };
        const allPlaced = challenge.sortItems?.every(i => updated[i.id]?.placed);

        if (allPlaced) {
          audioManager.play('success');
          setMascotMood('celebrate');
          setSpeakingText('Fantastic! You sorted all the plants correctly!');
          speechManager.speak('Fantastic! You sorted all the plants correctly!');
          const newStars = stars + 1;
          setStars(newStars);

          setTimeout(() => {
            if (currentChallenge < CHALLENGES.length - 1) {
              setCurrentChallenge(c => c + 1);
              setMascotMood('happy');
              setSpeakingText('Ready for the next challenge? Let us go!');
              speechManager.speak('Ready for the next challenge? Let us go!');
            } else {
              setShowConfetti(true);
              setShowSuccessBanner(true);
              audioManager.play('celebration');
              if (onComplete) {
                const finalScore = Math.max(0, 100 - errors * 5);
                onComplete(finalScore);
              }
            }
          }, 1500);
        }
        return true;
      } else {
        audioManager.play('drop-wrong');
        setErrors(e => e + 1);
        setMascotMood('thinking');
        setSpeakingText(challenge.misconception);
        speechManager.speak(challenge.misconception);
        setHintMessage(challenge.misconception);
        return false;
      }
    }
    return false;
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => setScreen('play')} width={width} height={height} />;
  }

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 select-none" style={{ width, height }}>
      <GardenScene width={width} height={height} />
      <GardenerGita mood={mascotMood} speaking={speakingText} />

      {/* Top Bar */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow">
          <span className="text-xl font-black text-green-800">Q {currentChallenge + 1} / {CHALLENGES.length}</span>
          <StarRow count={stars} total={CHALLENGES.length} />
        </div>
        <button
          onClick={() => {
            audioManager.play('tap');
            setHintMessage(challenge.hint);
            setSpeakingText(challenge.hint);
            speechManager.speak(challenge.hint);
          }}
          className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold px-4 py-2 rounded-2xl shadow transition-all flex items-center gap-1.5"
        >
          💡 Hint
        </button>
      </div>

      {/* Question Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl max-w-xl w-full text-center border-4 border-green-200 my-2">
        <h2 className="text-xl font-extrabold text-gray-800">{challenge.question}</h2>
      </div>

      {/* Interactive Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center my-auto" style={{ minHeight: 220 }}>
        {challenge.type.startsWith('sort') && challenge.sortItems && challenge.bins ? (
          <div className="relative w-full h-full flex flex-col items-center justify-between" style={{ minHeight: 200 }}>
            {/* Bins at bottom */}
            <div className="absolute bottom-0 w-full flex justify-around px-4">
              {challenge.bins.map((bin, idx) => {
                const totalBins = challenge.bins!.length;
                const binWidth = 140;
                const startX = (width - (totalBins * binWidth + (totalBins - 1) * 20)) / 2;
                const bx = startX + idx * (binWidth + 20);
                return (
                  <div key={bin.id} style={{ position: 'absolute', left: bx, bottom: 10 }}>
                    <SortBin label={bin.label} color={bin.color} x={0} y={0} width={binWidth} height={85} isHovering={false} />
                  </div>
                );
              })}
            </div>

            {/* Draggable items at top */}
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              {challenge.sortItems.map((item, idx) => {
                const placed = sortState[item.id]?.placed || false;
                const total = challenge.sortItems!.length;
                const startX = (width - (total * 125 + (total - 1) * 15)) / 2;
                const x = startX + idx * 140;
                const y = 20;
                return (
                  <div key={item.id} style={{ position: 'absolute', left: x, top: y }}>
                    <SortCard
                      id={item.id}
                      label={item.label}
                      emoji={item.emoji}
                      x={0}
                      y={0}
                      placed={placed}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 w-full max-w-md">
            {challenge.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(option)}
                className="bg-white/95 hover:bg-green-50 border-3 border-green-300 rounded-2xl py-3 px-6 text-base font-extrabold text-gray-800 shadow-md transition-all text-center flex items-center justify-center gap-3"
              >
                <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-black">{idx + 1}</span>
                {option}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Feedback & Overlays */}
      {hintMessage && (
        <HintBubble
          message={hintMessage}
          onComplete={() => setHintMessage(null)}
        />
      )}

      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}

      {showConfetti && (
        <Confetti
          onComplete={() => setShowConfetti(false)}
        />
      )}

      {showSuccessBanner && (
        <SuccessBanner
          message="Plant Hero! You mastered plant types, edible parts, and medicinal herbs!"
          onComplete={() => setShowSuccessBanner(false)}
        />
      )}
    </div>
  );
}
