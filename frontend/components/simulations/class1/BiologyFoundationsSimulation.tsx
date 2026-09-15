'use client';
/**
 * BiologyFoundationsSimulation - Foundation biology for Classes 1-5.
 *
 * CISCE Nodes: c1_bio_001, c1_bio_002, c1_bio_003, c2_bio_001, c2_bio_002
 * Enrichment: c1_biology_enrichment_part1-3, c2_biology_enrichment
 *
 * ELI5: "Biology is the science of LIFE! Living things grow, need food,
 *   breathe, and respond to their surroundings. Your body has amazing organs
 *   like the heart, lungs, brain, and skin. Food gives you energy from four
 *   food groups. Stay clean and healthy to learn and play better!"
 *
 * Misconceptions (from enrichment):
 *   1. "Plants are not living because they don't move" -> "Plants ARE living! They grow, breathe, and respond to sunlight!"
 *   2. "Heart is on the right side" -> "No! The heart is on the LEFT side of your chest!"
 *   3. "We have only 4 senses" -> "No! We have 5 senses including TOUCH!"
 *   4. "Bones are dry and lifeless" -> "No! Living bones have blood vessels and marrow!"
 *   5. "Only eat one type of food" -> "No! A balanced meal needs all four food groups!"
 *
 * Story: "Join Bio Buddy the friendly scientist at the Living Things Lab!
 *   Explore what makes things alive, sort body organs, build healthy meals,
 *   and earn your Biology Explorer Badge!"
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';
// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
    { title: 'What is Biology? 🧬', text: 'Biology is the science of LIFE! It studies all living things - from tiny bacteria to tall trees, from small insects to giant elephants. Everything that is alive is part of biology!', emoji: '🧬', bgColor: 'from-green-400 to-emerald-500' },
    { title: 'Living vs Non-Living 🌿', text: 'Living things GROW, need FOOD, can MOVE, BREATHE, REPRODUCE (make babies), and RESPOND to their surroundings. Non-living things like rocks and tables do not do these things!', emoji: '🌱', bgColor: 'from-teal-400 to-cyan-500' },
    { title: 'Amazing Body Organs 🫀', text: 'Your body has amazing organs! The HEART pumps blood, the LUNGS help you breathe, the BRAIN thinks and controls everything, and the SKIN protects you. There are 206 bones and about 600 muscles!', emoji: '🫀', bgColor: 'from-rose-400 to-pink-500' },
    { title: 'Four Food Groups 🍎', text: 'Food gives us ENERGY! There are FOUR food groups: Carbohydrates (rice, bread) for energy, Proteins (eggs, beans) for growth, Vitamins (fruits, vegetables) for health, and Fats (butter, oil) for warmth!', emoji: '🍎', bgColor: 'from-amber-400 to-orange-500' },
    { title: 'Health and Hygiene 🧼', text: 'Stay clean and healthy! Brush teeth TWICE daily, wash hands before eating, bathe every day, eat balanced meals, drink clean water, and sleep 8-10 hours. A healthy body learns better!', emoji: '🧼', bgColor: 'from-blue-400 to-indigo-500' },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_living' | 'identify_organ' | 'sort_food' | 'identify_sense' | 'sort_living' | 'identify_habit' | 'sort_organs' | 'identify_foodgroup';
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
        type: 'identify_living',
        question: 'Which of these is a LIVING thing?',
        answer: 'Rose Plant',
        options: ['Rose Plant', 'Rock', 'Table'],
        hint: 'Living things grow, need food, and breathe. Which one does these things?',
        misconception: 'A Rose Plant is LIVING! It grows, needs water and sunlight, and responds to its surroundings. Rocks and tables do not grow or breathe!',
    },
    {
        type: 'identify_organ',
        question: 'Which organ pumps blood through your entire body?',
        answer: 'Heart',
        options: ['Lungs', 'Heart', 'Brain'],
        hint: 'It beats about 72 times per minute and is on the LEFT side of your chest!',
        misconception: 'The HEART pumps blood! It is on the LEFT side of your chest, not the right. Lungs help you breathe and the brain thinks. The heart never stops working!',
    },
    {
        type: 'sort_food',
        question: 'Drag each food to its correct food group!',
        answer: 'sort',
        options: [],
        hint: 'Rice gives energy (Carbs). Eggs help you grow (Protein). Apple keeps you healthy (Vitamins). Butter stores energy (Fats)!',
        misconception: 'Each food belongs to one group: Carbohydrates give energy, Proteins help growth, Vitamins protect health, and Fats store energy. Never mix them up!',
        sortItems: [
            { id: 'rice', label: 'Rice', emoji: '🍚', correctBin: 'carbs' },
            { id: 'egg', label: 'Egg', emoji: '🥚', correctBin: 'protein' },
            { id: 'apple', label: 'Apple', emoji: '🍎', correctBin: 'vitamins' },
            { id: 'butter', label: 'Butter', emoji: '🧈', correctBin: 'fats' },
        ],
        bins: [
            { id: 'carbs', label: 'Carbs (Energy) 🍚', color: '#F59E0B' },
            { id: 'protein', label: 'Protein (Growth) 🥚', color: '#EF4444' },
            { id: 'vitamins', label: 'Vitamins (Health) 🍎', color: '#10B981' },
            { id: 'fats', label: 'Fats (Warmth) 🧈', color: '#8B5CF6' },
        ],
    },
    {
        type: 'identify_sense',
        question: 'How many senses do human beings have?',
        answer: '5',
        options: ['4', '5', '6'],
        hint: 'Think: see, hear, smell, taste, and... touch! Count them all!',
        misconception: 'Humans have 5 senses! The fifth is TOUCH, controlled by the skin - the largest organ in your body. Some people forget touch, but it is just as important as the other four!',
    },
    {
        type: 'sort_living',
        question: 'Drag each item: Is it LIVING or NON-LIVING?',
        answer: 'sort',
        options: [],
        hint: 'Living things grow, need food, and breathe. Plants are living! Rocks and cars are not!',
        misconception: 'Living things GROW, need FOOD, BREATHE, and RESPOND. Plants ARE living even though they move slowly! Rocks, tables, and cars are non-living because they do not grow or breathe!',
        sortItems: [
            { id: 'fish', label: 'Fish', emoji: '🐟', correctBin: 'living' },
            { id: 'tree', label: 'Tree', emoji: '🌳', correctBin: 'living' },
            { id: 'rock', label: 'Rock', emoji: '🪨', correctBin: 'nonliving' },
            { id: 'car', label: 'Car', emoji: '🚗', correctBin: 'nonliving' },
        ],
        bins: [
            { id: 'living', label: 'Living 🌱', color: '#10B981' },
            { id: 'nonliving', label: 'Non-Living 🪨', color: '#6B7280' },
        ],
    },
    {
        type: 'identify_habit',
        question: 'How many times a day should you brush your teeth?',
        answer: 'Twice',
        options: ['Once', 'Twice', 'Thrice'],
        hint: 'Dentists say: morning and night! Bacteria grow overnight and after every meal!',
        misconception: 'Brush TWICE daily - morning and night! Bacteria build up overnight and after meals. Brushing only once leaves bacteria that cause cavities and bad breath!',
    },
    {
        type: 'sort_organs',
        question: 'Drag each organ to what it does!',
        answer: 'sort',
        options: [],
        hint: 'Heart pumps blood, Lungs help breathe, Brain thinks, Skin feels touch!',
        misconception: 'Each organ has its own special job! Heart = pumps blood, Lungs = breathing, Brain = thinking and control, Skin = touch and protection. Never mix up organ functions!',
        sortItems: [
            { id: 'heart', label: 'Heart', emoji: '🫀', correctBin: 'pump' },
            { id: 'lungs', label: 'Lungs', emoji: '🫁', correctBin: 'breathe' },
            { id: 'brain', label: 'Brain', emoji: '🧠', correctBin: 'think' },
            { id: 'skin', label: 'Skin', emoji: '🖐️', correctBin: 'feel' },
        ],
        bins: [
            { id: 'pump', label: 'Pumps Blood 🫀', color: '#EF4444' },
            { id: 'breathe', label: 'Helps Breathe 🫁', color: '#3B82F6' },
            { id: 'think', label: 'Thinks & Controls 🧠', color: '#8B5CF6' },
            { id: 'feel', label: 'Feels Touch 🖐️', color: '#F59E0B' },
        ],
    },
    {
        type: 'identify_foodgroup',
        question: 'Ravi ate rice, fish, and spinach. Which food group is MISSING for a balanced meal?',
        answer: 'Fats & Oils',
        options: ['Fruits', 'Fats & Oils', 'Dairy', 'Sugar'],
        hint: 'A balanced meal needs all four groups: Carbs, Proteins, Vitamins, and... Fats!',
        misconception: 'A balanced meal needs ALL four food groups! Rice = Carbs, Fish = Protein, Spinach = Vitamins. The missing group is Fats & Oils (butter, oil, ghee). Sugar is NOT a food group!',
    },
];
// ─── Bio Buddy Mascot (Friendly Scientist) ────────────────────
function BioBuddy({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-green-300">
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
        <svg width="80" height="95" viewBox="0 0 80 95">
          <defs>
            <radialGradient id="bio-face-grad" cx="0.4" cy="0.3" r="0.7">
              <stop offset="0%" stopColor="#FFEFD5"/>
              <stop offset="60%" stopColor="#FFD1A9"/>
              <stop offset="100%" stopColor="#E0A96D"/>
            </radialGradient>
            <linearGradient id="bio-coat-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white"/>
              <stop offset="100%" stopColor="#F0FDF4"/>
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="40" cy="28" r="18" fill="url(#bio-face-grad)" stroke="#E0A96D" strokeWidth="1.5"/>
          {/* Hair (curly scientist) */}
          <path d="M22 25 C20 15, 30 10, 40 12 C50 10, 60 15, 58 25 C58 22, 55 20, 50 20 C45 18, 35 18, 30 20 C25 20, 22 22, 22 25 Z" fill="#3B2410"/>
          {/* Lab goggles strap */}
          <rect x="20" y="24" width="40" height="3" fill="#1E293B"/>
          {/* Goggle lenses */}
          <circle cx="33" cy="28" r="5" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
          <circle cx="47" cy="28" r="5" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
          {/* Eyes inside goggles */}
          <circle cx="33" cy="28" r="2" fill="#1E293B"/>
          <circle cx="47" cy="28" r="2" fill="#1E293B"/>
          <circle cx="34" cy="27" r="0.7" fill="white"/>
          <circle cx="48" cy="27" r="0.7" fill="white"/>
          {/* Rosy Cheeks */}
          <ellipse cx="28" cy="33" rx="3" ry="1.5" fill="#FDA4AF" opacity="0.7"/>
          <ellipse cx="52" cy="33" rx="3" ry="1.5" fill="#FDA4AF" opacity="0.7"/>
          {/* Smile */}
          <path d="M36 35 Q40 39 44 35" stroke="#059669" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* White Lab Coat with gradient */}
          <path d="M24 45 L40 50 L56 45 L62 80 L18 80 Z" fill="url(#bio-coat-grad)" stroke="#CBD5E1" strokeWidth="1.5"/>
          {/* Coat lapel */}
          <path d="M35 46 L40 56 L45 46" stroke="#E2E8F0" strokeWidth="1.5" fill="none"/>
          {/* Green Leaf Badge (biology symbol) */}
          <circle cx="52" cy="58" r="6" fill="#10B981" stroke="#059669" strokeWidth="1"/>
          <path d="M49 55 Q52 52 55 55 Q52 61 49 55 Z" fill="white"/>
          {/* DNA strand on coat */}
          <path d="M30 50 Q33 55 30 60 Q33 65 30 70" stroke="#10B981" strokeWidth="1.5" fill="none"/>
          <path d="M38 50 Q35 55 38 60 Q35 65 38 70" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
          <line x1="31" y1="53" x2="37" y2="53" stroke="#8B5CF6" strokeWidth="1"/>
          <line x1="31" y1="60" x2="37" y2="60" stroke="#8B5CF6" strokeWidth="1"/>
          <line x1="31" y1="67" x2="37" y2="67" stroke="#8B5CF6" strokeWidth="1"/>
          {/* Magnifying glass held in left hand */}
          <circle cx="24" cy="68" r="7" fill="none" stroke="#64748B" strokeWidth="2.5"/>
          <circle cx="24" cy="68" r="5" fill="#BAE6FD" opacity="0.4"/>
          <line x1="29" y1="73" x2="34" y2="80" stroke="#64748B" strokeWidth="3" strokeLinecap="round"/>
          {/* Hand holding magnifying glass */}
          <circle cx="24" cy="72" r="3.5" fill="url(#bio-face-grad)" stroke="#E0A96D" strokeWidth="1"/>
          {/* Feet */}
          <ellipse cx="32" cy="88" rx="5" ry="3.5" fill="#334155"/>
          <ellipse cx="48" cy="88" rx="5" ry="3.5" fill="#334155"/>
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
// ─── Biology Lab Scene Background ─────────────────────────────
function BioLabBackground({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Layered lab gradient (wall → floor) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 30%, #F0FDF4 60%, #DCFCE7 100%)' }}/>

      {/* Lab Window with garden view */}
      <div className="absolute top-8 left-8 opacity-40">
        <svg width="100" height="80" viewBox="0 0 100 80">
          <rect x="3" y="3" width="94" height="74" rx="4" fill="white" stroke="#059669" strokeWidth="3"/>
          <line x1="50" y1="3" x2="50" y2="77" stroke="#059669" strokeWidth="2"/>
          <line x1="3" y1="40" x2="97" y2="40" stroke="#059669" strokeWidth="2"/>
          {/* Garden through window */}
          <rect x="6" y="6" width="41" height="31" fill="#86EFAC" opacity="0.5"/>
          <rect x="53" y="6" width="41" height="31" fill="#86EFAC" opacity="0.5"/>
          <rect x="6" y="43" width="41" height="31" fill="#BBF7D0" opacity="0.5"/>
          <rect x="53" y="43" width="41" height="31" fill="#BBF7D0" opacity="0.5"/>
          {/* Small tree through window */}
          <rect x="22" y="20" width="3" height="12" fill="#92400E"/>
          <circle cx="23" cy="18" r="7" fill="#10B981" opacity="0.6"/>
          <rect x="72" y="55" width="3" height="12" fill="#92400E"/>
          <circle cx="73" cy="53" r="7" fill="#10B981" opacity="0.6"/>
        </svg>
      </div>

      {/* Anatomy / Cell Poster on Wall */}
      <div className="absolute top-6 right-12 opacity-30">
        <svg width="80" height="100" viewBox="0 0 80 100">
          <rect x="3" y="3" width="74" height="94" rx="4" fill="white" stroke="#059669" strokeWidth="2"/>
          {/* Cell diagram inside poster */}
          <circle cx="40" cy="40" r="25" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5"/>
          <circle cx="40" cy="40" r="10" fill="#10B981" stroke="#047857" strokeWidth="1"/>
          <circle cx="37" cy="37" r="3" fill="#065F46"/>
          <ellipse cx="28" cy="30" rx="3" ry="2" fill="#34D399" opacity="0.7"/>
          <ellipse cx="52" cy="48" rx="3" ry="2" fill="#34D399" opacity="0.7"/>
          <text x="40" y="85" fontSize="7" fill="#059669" textAnchor="middle" fontWeight="bold">CELL</text>
        </svg>
      </div>

      {/* Lab Table with Microscope */}
      <div className="absolute bottom-20 left-6 opacity-35">
        <svg width="100" height="70" viewBox="0 0 100 70">
          {/* Table */}
          <rect x="5" y="50" width="90" height="6" rx="2" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5"/>
          <rect x="10" y="56" width="4" height="12" fill="#64748B"/>
          <rect x="86" y="56" width="4" height="12" fill="#64748B"/>
          {/* Microscope on table */}
          <rect x="35" y="42" width="20" height="8" rx="2" fill="#475569"/>
          <rect x="40" y="20" width="8" height="22" rx="2" fill="#334155"/>
          <circle cx="44" cy="16" r="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5"/>
          <rect x="42" y="8" width="4" height="8" fill="#334155"/>
          {/* Petri dish on table */}
          <ellipse cx="70" cy="48" rx="10" ry="3" fill="#F0F9FF" stroke="#94A3B8" strokeWidth="1"/>
          <ellipse cx="70" cy="47" rx="8" ry="2" fill="#D1FAE5" opacity="0.6"/>
        </svg>
      </div>

      {/* Plant in pot in corner (topic-specific!) */}
      <div className="absolute bottom-20 right-8 opacity-35">
        <svg width="60" height="70" viewBox="0 0 60 70">
          {/* Pot */}
          <path d="M15 50 L45 50 L42 65 L18 65 Z" fill="#C2410C" stroke="#9A3412" strokeWidth="1.5"/>
          <rect x="14" y="48" width="32" height="4" rx="1" fill="#9A3412"/>
          {/* Stem */}
          <path d="M30 48 L30 25" stroke="#065F46" strokeWidth="2.5"/>
          {/* Leaves */}
          <path d="M30 35 C20 30, 15 22, 18 15 C25 12, 30 20, 30 28" fill="#10B981" stroke="#059669" strokeWidth="1.5"/>
          <path d="M30 30 C40 27, 45 20, 42 13 C35 10, 30 18, 30 26" fill="#10B981" stroke="#059669" strokeWidth="1.5"/>
          <path d="M30 22 C25 18, 22 12, 25 8 C28 6, 30 12, 30 18" fill="#34D399" stroke="#059669" strokeWidth="1"/>
        </svg>
      </div>

      {/* Floating DNA helix decoration */}
      <motion.div className="absolute top-12 left-32 opacity-20" animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="40" height="60" viewBox="0 0 40 60">
          <path d="M8 5 Q20 15 8 25 Q20 35 8 45 Q20 55 8 60" stroke="#10B981" strokeWidth="2" fill="none"/>
          <path d="M32 5 Q20 15 32 25 Q20 35 32 45 Q20 55 32 60" stroke="#3B82F6" strokeWidth="2" fill="none"/>
          <line x1="10" y1="10" x2="30" y2="10" stroke="#8B5CF6" strokeWidth="1"/>
          <line x1="13" y1="22" x2="27" y2="22" stroke="#8B5CF6" strokeWidth="1"/>
          <line x1="10" y1="35" x2="30" y2="35" stroke="#8B5CF6" strokeWidth="1"/>
          <line x1="13" y1="48" x2="27" y2="48" stroke="#8B5CF6" strokeWidth="1"/>
        </svg>
      </motion.div>

      {/* Floating Heart Beat */}
      <motion.div className="absolute top-16 right-24 opacity-20" animate={{ scale: [1, 1.2, 1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path d="M15 25 C15 25, 5 18, 5 11 C5 7, 8 5, 11 5 C13 5, 15 7, 15 9 C15 7, 17 5, 19 5 C22 5, 25 7, 25 11 C25 18, 15 25, 15 25 Z" fill="#EF4444"/>
        </svg>
      </motion.div>

      {/* Floor with lab tile pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(180deg, #DCFCE7 0%, #BBF7D0 100%)', borderTop: '2px solid #86EFAC' }}>
        <svg className="w-full h-full opacity-25" preserveAspectRatio="none" viewBox="0 0 720 64">
          <pattern id="grass-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M5 20 L5 12 M10 20 L10 8 M15 20 L15 14" stroke="#10B981" strokeWidth="1" fill="none"/>
          </pattern>
          <rect width="720" height="64" fill="url(#grass-pattern)"/>
        </svg>
      </div>
    </div>);
}
// ─── Topic-Specific SVG Components ────────────────────────────
function HeartIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="bio-heart-grad" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FCA5A5"/>
          <stop offset="60%" stopColor="#EF4444"/>
          <stop offset="100%" stopColor="#991B1B"/>
        </radialGradient>
      </defs>
      <path d="M30 50 C30 50, 10 35, 10 22 C10 15, 16 10, 22 10 C26 10, 29 13, 30 16 C31 13, 34 10, 38 10 C44 10, 50 15, 50 22 C50 35, 30 50, 30 50 Z" fill="url(#bio-heart-grad)" stroke="#B91C1C" strokeWidth="2"/>
      <path d="M20 20 L24 24 L28 18" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Shine */}
      <ellipse cx="20" cy="18" rx="3" ry="5" fill="white" opacity="0.4" transform="rotate(-20 20 18)"/>
    </svg>);
}
function LungsIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 L30 25" stroke="#64748B" strokeWidth="2"/>
      <path d="M20 25 C15 25, 12 35, 15 45 C18 50, 22 48, 25 42 C27 35, 25 28, 20 25 Z" fill="#FECACA" stroke="#EF4444" strokeWidth="1.5"/>
      <path d="M40 25 C45 25, 48 35, 45 45 C42 50, 38 48, 35 42 C33 35, 35 28, 40 25 Z" fill="#FECACA" stroke="#EF4444" strokeWidth="1.5"/>
    </svg>);
}
function BrainIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="bio-brain-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FDE68A"/>
          <stop offset="60%" stopColor="#FBBF24"/>
          <stop offset="100%" stopColor="#B45309"/>
        </radialGradient>
      </defs>
      <path d="M30 12 C20 12, 15 18, 15 25 C12 27, 12 33, 15 35 C15 40, 20 45, 25 45 L35 45 C40 45, 45 40, 45 35 C48 33, 48 27, 45 25 C45 18, 40 12, 30 12 Z" fill="url(#bio-brain-grad)" stroke="#D97706" strokeWidth="2"/>
      <path d="M22 20 Q25 25 22 30 M30 18 Q33 25 30 32 M38 20 Q41 25 38 30" stroke="#92400E" strokeWidth="1.5" fill="none"/>
      {/* Center fold */}
      <path d="M30 12 L30 45" stroke="#92400E" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>);
}
function LeafIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="bio-leaf-grad" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#6EE7B7"/>
          <stop offset="60%" stopColor="#10B981"/>
          <stop offset="100%" stopColor="#065F46"/>
        </radialGradient>
      </defs>
      <path d="M30 8 C18 12, 12 25, 15 40 C20 48, 35 50, 45 42 C50 35, 48 20, 38 12 C35 10, 32 9, 30 8 Z" fill="url(#bio-leaf-grad)" stroke="#059669" strokeWidth="2"/>
      <path d="M20 40 Q30 30 40 20" stroke="#065F46" strokeWidth="1.5" fill="none"/>
      {/* Vein details */}
      <path d="M25 35 Q28 30 32 28 M28 38 Q31 33 35 31" stroke="#065F46" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>);
}
function FoodPlateIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Plate */}
      <ellipse cx="30" cy="35" rx="22" ry="8" fill="white" stroke="#94A3B8" strokeWidth="1.5"/>
      <ellipse cx="30" cy="33" rx="22" ry="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5"/>
      {/* Food groups on plate */}
      <ellipse cx="20" cy="31" rx="6" ry="4" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1"/>
      <ellipse cx="35" cy="30" rx="5" ry="3" fill="#EF4444" stroke="#DC2626" strokeWidth="1"/>
      <circle cx="42" cy="32" r="4" fill="#10B981" stroke="#059669" strokeWidth="1"/>
      <ellipse cx="28" cy="33" rx="4" ry="2.5" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="1"/>
    </svg>);
}
function ToothIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 10 C15 10, 12 15, 12 22 C12 30, 15 40, 18 48 C20 52, 24 50, 25 45 C26 40, 27 35, 30 35 C33 35, 34 40, 35 45 C36 50, 40 52, 42 48 C45 40, 48 30, 48 22 C48 15, 45 10, 40 10 C35 10, 32 13, 30 13 C28 13, 25 10, 20 10 Z" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
      {/* Sparkle */}
      <path d="M22 20 L24 24 L22 28 L20 24 Z" fill="#FBBF24"/>
    </svg>);
}
function SoapIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Soap bar */}
      <rect x="12" y="20" width="36" height="24" rx="6" fill="#67E8F9" stroke="#0891B2" strokeWidth="2"/>
      <rect x="15" y="23" width="30" height="6" rx="3" fill="#A5F3FC" opacity="0.6"/>
      {/* Bubbles */}
      <circle cx="20" cy="15" r="4" fill="#BAE6FD" stroke="#0891B2" strokeWidth="1" opacity="0.7"/>
      <circle cx="35" cy="12" r="3" fill="#BAE6FD" stroke="#0891B2" strokeWidth="1" opacity="0.7"/>
      <circle cx="45" cy="16" r="3.5" fill="#BAE6FD" stroke="#0891B2" strokeWidth="1" opacity="0.7"/>
    </svg>);
}
function CellIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="bio-cell-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#F0FDF4"/>
          <stop offset="60%" stopColor="#D1FAE5"/>
          <stop offset="100%" stopColor="#A7F3D0"/>
        </radialGradient>
        <radialGradient id="bio-nucleus-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#34D399"/>
          <stop offset="60%" stopColor="#10B981"/>
          <stop offset="100%" stopColor="#065F46"/>
        </radialGradient>
      </defs>
      {/* Cell membrane */}
      <circle cx="30" cy="30" r="22" fill="url(#bio-cell-grad)" stroke="#059669" strokeWidth="2"/>
      {/* Nucleus */}
      <circle cx="30" cy="30" r="8" fill="url(#bio-nucleus-grad)" stroke="#047857" strokeWidth="1.5"/>
      <circle cx="28" cy="28" r="2" fill="#065F46"/>
      {/* Organelles */}
      <ellipse cx="20" cy="22" rx="3" ry="2" fill="#34D399" opacity="0.7"/>
      <ellipse cx="40" cy="35" rx="3" ry="2" fill="#34D399" opacity="0.7"/>
      <ellipse cx="22" cy="40" rx="2.5" ry="1.5" fill="#34D399" opacity="0.7"/>
    </svg>);
}
// ─── Sort Card Component ──────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('heart'))
        return <HeartIcon size={size}/>;
    if (id.includes('pump'))
        return <HeartIcon size={size}/>;
    if (id.includes('lungs'))
        return <LungsIcon size={size}/>;
    if (id.includes('breathe'))
        return <LungsIcon size={size}/>;
    if (id.includes('brain'))
        return <BrainIcon size={size}/>;
    if (id.includes('think'))
        return <BrainIcon size={size}/>;
    if (id.includes('skin') || id.includes('feel'))
        return <div className="text-4xl">🖐️</div>;
    if (id.includes('rice') || id.includes('carbs'))
        return <div className="text-4xl">🍚</div>;
    if (id.includes('egg') || id.includes('protein'))
        return <div className="text-4xl">🥚</div>;
    if (id.includes('apple') || id.includes('vitamins'))
        return <div className="text-4xl">🍎</div>;
    if (id.includes('butter') || id.includes('fats'))
        return <div className="text-4xl">🧈</div>;
    if (id.includes('fish') || id.includes('tree') || id.includes('living'))
        return <div className="text-4xl">{id.includes('fish') ? '🐟' : id.includes('tree') ? '🌳' : '🌱'}</div>;
    if (id.includes('rock') || id.includes('car') || id.includes('nonliving'))
        return <div className="text-4xl">{id.includes('rock') ? '🪨' : '🚗'}</div>;
    if (id.includes('leaf'))
        return <LeafIcon size={size}/>;
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
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2 border-2 border-green-200`} style={{ width: 110, height: 95 }}>
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
    return (<div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110' : ''}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}22`, boxShadow: isHovering ? `0 0 20px ${color}` : 'none' }}>
      <div className="text-sm font-extrabold" style={{ color }}>{label}</div>
    </div>);
}
// ─── Teaching Screen ──────────────────────────────────────────
function TeachingScreen({ onStart, width, height }: {
    onStart: () => void;
    width: number;
    height: number;
}) {
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

    return (<div className="relative flex flex-col items-center justify-between p-6 select-none" style={{ width, height }}>
      <BioLabBackground width={width} height={height}/>
      <BioBuddy mood="happy" speaking={null}/>

      {/* Header */}
      <div className="z-10 flex flex-col items-center mt-2">
        <h1 className="text-2xl font-black text-green-600 drop-shadow">Bio Buddy's Living Things Lab</h1>
        <p className="text-sm font-bold text-gray-600">Biology Foundations - CISCE Discovery</p>
      </div>

      {/* Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className={`z-10 w-full max-w-lg rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${current.bgColor} text-white flex flex-col items-center text-center my-auto`}>
        <span className="text-6xl mb-3">{current.emoji}</span>
        <h2 className="text-2xl font-black mb-3">{current.title}</h2>
        <p className="text-lg font-medium leading-relaxed">{current.text}</p>
        {/* Slide-specific visuals */}
        {slide === 0 && <div className="mt-3 opacity-80"><CellIcon size={60}/></div>}
        {slide === 1 && <div className="mt-3 flex gap-2 opacity-80"><LeafIcon size={36}/><div className="text-4xl">🪨</div></div>}
        {slide === 2 && <div className="mt-3 flex gap-2 opacity-80"><HeartIcon size={36}/><LungsIcon size={36}/><BrainIcon size={36}/></div>}
        {slide === 3 && <div className="mt-3 opacity-80"><FoodPlateIcon size={60}/></div>}
        {slide === 4 && <div className="mt-3 flex gap-2 opacity-80"><ToothIcon size={36}/><SoapIcon size={36}/></div>}
      </motion.div>

      {/* Navigation Footer */}
      <div className="z-10 w-full max-w-lg flex items-center justify-between pb-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-4 py-2 rounded-xl font-bold shadow ${slide === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-green-600 hover:bg-green-50'}`}>
          ⬅️ Back
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-green-600 w-6' : 'bg-white/60'}`}/>))}
        </div>

        <button onClick={handleNext} className="px-6 py-2 rounded-xl font-bold bg-green-600 text-white shadow-lg hover:bg-green-700 flex items-center gap-1">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>);
}
// ─── Main Game Component ─────────────────────────────────────
export interface BiologyFoundationsSimulationProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
export function BiologyFoundationsSimulation({ width = 720, height = 560, onComplete }: BiologyFoundationsSimulationProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showSparkle, setShowSparkle] = useState(false);
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Bio Buddy. Let us explore living things!');
    const [gameOver, setGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    // Sort challenge state
    const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
    const [itemCoords, setItemCoords] = useState<Record<string, {
        x: number;
        y: number;
    }>>({});
    const [hoverBin, setHoverBin] = useState<string | null>(null);
    const challenge = CHALLENGES[currentIdx];
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    // Reset inactivity timer
    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current)
            clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = setTimeout(() => {
            setShowHint(true);
            audioManager.play('hint');
            setMascotMood('thinking');
            setMascotSpeech(challenge.hint);
            speechManager.speak(challenge.hint);
        }, 10000);
    }, [challenge.hint]);
    useEffect(() => {
        if (screen === 'play' && !gameOver) {
            resetInactivityTimer();
        }
        return () => {
            speechManager.stop();
            if (inactivityTimerRef.current)
                clearTimeout(inactivityTimerRef.current);
        };
    }, [currentIdx, screen, gameOver, resetInactivityTimer]);
    // Init sort item coordinates
    useEffect(() => {
        if (challenge.type.startsWith('sort') && challenge.sortItems) {
            const coords: Record<string, {
                x: number;
                y: number;
            }> = {};
            challenge.sortItems.forEach((item, i) => {
                coords[item.id] = { x: 50 + i * 130, y: 380 };
            });
            setItemCoords(coords);
            setPlacedItems({});
        }
    }, [currentIdx, challenge]);
    // Handle Multiple Choice Answer
    const handleAnswer = (option: string) => {
        audioManager.play('tap');
        resetInactivityTimer();
        setShowHint(false);
        if (option === challenge.answer) {
            audioManager.play('success');
            setStars((s) => s + 1);
            setMascotMood('celebrate');
            setMascotSpeech('Fantastic! You got it right! 🎉');
            speechManager.speak('Fantastic! You got it right! 🎉');
            setShowSuccess(true);
            setShowSparkle(true);
            setTimeout(() => {
                setShowSuccess(false);
                setShowSparkle(false);
                advanceChallenge();
            }, 1500);
        }
        else {
            audioManager.play('error');
            setErrors((e) => e + 1);
            setMascotMood('thinking');
            setMascotSpeech(challenge.misconception);
            speechManager.speak(challenge.misconception);
            setShowHint(true);
        }
    };
    // Drag and Drop handlers
    const handleDragStart = (_id: string) => {
        audioManager.play('pickup');
        resetInactivityTimer();
    };
    const handleDragEnd = (id: string, x: number, y: number): boolean => {
        if (!challenge.bins || !challenge.sortItems)
            return false;
        // Check bin collision
        const bins = challenge.bins;
        let targetBin: string | null = null;
        for (let i = 0; i < bins.length; i++) {
            const b = bins[i];
            const bx = 40 + i * 210;
            const by = 130;
            const bw = 190;
            const bh = 200;
            if (x + 55 >= bx && x + 55 <= bx + bw && y + 47 >= by && y + 47 <= by + bh) {
                targetBin = b.id;
                break;
            }
        }
        if (targetBin) {
            const item = challenge.sortItems.find((si) => si.id === id);
            if (item && item.correctBin === targetBin) {
                audioManager.play('success');
                setPlacedItems((prev) => ({ ...prev, [id]: true }));
                setMascotMood('happy');
                setMascotSpeech('Great sorting! 👍');
                speechManager.speak('Great sorting! 👍');
                const newPlaced = { ...placedItems, [id]: true };
                const allDone = challenge.sortItems.every((si) => newPlaced[si.id]);
                if (allDone) {
                    audioManager.play('celebration');
                    setStars((s) => s + 1);
                    setMascotMood('celebrate');
                    setMascotSpeech('All sorted correctly! You are a superstar! ⭐');
                    speechManager.speak('All sorted correctly! You are a superstar! ⭐');
                    setShowSuccess(true);
                    setShowSparkle(true);
                    setTimeout(() => {
                        setShowSuccess(false);
                        setShowSparkle(false);
                        advanceChallenge();
                    }, 2000);
                }
                return true;
            }
            else {
                audioManager.play('error');
                setErrors((e) => e + 1);
                setMascotMood('thinking');
                setMascotSpeech(challenge.misconception);
                speechManager.speak(challenge.misconception);
                setShowHint(true);
                return false;
            }
        }
        else {
            audioManager.play('error');
            return false;
        }
    };
    const advanceChallenge = () => {
        if (currentIdx < CHALLENGES.length - 1) {
            setCurrentIdx((c) => c + 1);
            setMascotMood('happy');
            setMascotSpeech('Let us try the next challenge!');
            speechManager.speak('Let us try the next challenge!');
        }
        else {
            setGameOver(true);
            audioManager.play('celebration');
            const finalS = Math.max(0, 100 - errors * 5);
            setFinalScore(finalS);
            if (onComplete)
                onComplete(finalS);
        }
    };
    return (<div className="relative flex flex-col select-none overflow-hidden bg-green-100 rounded-3xl shadow-2xl" style={{ width, height }}>
      <BioLabBackground width={width} height={height}/>
      <BioBuddy mood={mascotMood} speaking={mascotSpeech}/>

      {screen === 'teaching' ? (<TeachingScreen onStart={() => { setScreen('play'); audioManager.play('tap'); }} width={width} height={height}/>) : gameOver ? (
        /* Completion Screen */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-30 bg-white/95">
          <Confetti onComplete={() => { }}/>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-center">
            <span className="text-7xl mb-3">🏆</span>
            <h1 className="text-3xl font-black text-green-600 mb-2">Biology Explorer Badge Earned!</h1>
            <p className="text-lg font-bold text-gray-700 mb-4">You successfully completed Bio Buddy's lab challenges!</p>
            <div className="flex gap-2 mb-6">
              <StarRow count={stars} total={CHALLENGES.length}/>
            </div>
            <div className="text-xl font-extrabold text-gray-800 mb-6">Final Score: {finalScore} / 100</div>
            <button onClick={() => {
                setScreen('teaching');
                setCurrentIdx(0);
                setStars(0);
                setErrors(0);
                setGameOver(false);
            }} className="px-6 py-3 bg-green-600 text-white font-black rounded-2xl shadow-xl hover:bg-green-700">
              Play Again 🔄
            </button>
          </motion.div>
        </div>) : (
        /* Play Screen */
        <div className="relative flex flex-col justify-between h-full p-4 z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-green-600 bg-green-100 px-3 py-1 rounded-xl shadow">
                Challenge {currentIdx + 1} of {CHALLENGES.length}
              </span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length}/>
          </div>

          {/* Question Box */}
          <div className="my-2 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border-2 border-green-200 text-center max-w-xl mx-auto w-full">
            <h3 className="text-lg font-black text-gray-800">{challenge.question}</h3>
          </div>

          {/* Challenge Content */}
          <div className="relative flex-1 flex items-center justify-center my-auto">
            {showSuccess && <SuccessBanner message="Great job!" onComplete={() => setShowSuccess(false)}/>}
            {showHint && <HintBubble message={challenge.hint} onComplete={() => setShowHint(false)}/>}
            {showSparkle && <SparkleBurst x={width / 2} y={height / 2} onComplete={() => setShowSparkle(false)}/>}

            {challenge.type.startsWith('sort') && challenge.sortItems && challenge.bins ? (
            /* Sort Challenge View */
            <div className="relative w-full h-[320px]">
                {/* Bins */}
                {challenge.bins.map((b, i) => {
                    const bw = 180;
                    const bx = 40 + i * 210;
                    return (<SortBin key={b.id} label={b.label} color={b.color} x={bx} y={120} width={bw} height={180} isHovering={false}/>);
                })}
                {/* Draggable Items */}
                {challenge.sortItems.map((item) => {
                    const coords = itemCoords[item.id] || { x: 50, y: 380 };
                    return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={coords.x} y={coords.y} placed={!!placedItems[item.id]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
                })}
              </div>) : (
            /* Multiple Choice View */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl">
                {challenge.options.map((option) => (<motion.button key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(option)} className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-xl border-3 border-green-300 hover:border-green-500 font-extrabold text-gray-800 text-base">
                    {option === 'Heart' ? <HeartIcon size={45}/> :
                        option === 'Lungs' ? <LungsIcon size={45}/> :
                            option === 'Brain' ? <BrainIcon size={45}/> :
                                option === 'Rose Plant' ? <LeafIcon size={45}/> :
                                    option === 'Rock' ? <div className="text-4xl mb-1">🪨</div> :
                                        option === 'Table' ? <div className="text-4xl mb-1">🪵</div> :
                                            option === 'Twice' ? <ToothIcon size={45}/> :
                                                option === 'Once' ? <div className="text-4xl mb-1">🪥</div> :
                                                    option === '5' ? <div className="text-4xl mb-1">🖐️</div> :
                                                        option === '4' ? <div className="text-4xl mb-1">✋</div> :
                                                            option === 'Fats & Oils' ? <FoodPlateIcon size={45}/> :
                                                                option === 'Sugar' ? <div className="text-4xl mb-1">🍬</div> :
                                                                    <div className="text-3xl mb-1">🔬</div>}
                    <span className="mt-2">{option}</span>
                  </motion.button>))}
              </div>)}
          </div>

          {/* Footer status */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-2">
            <span>Errors: {errors}</span>
            <span>Bio Buddy's Living Things Lab 🧬</span>
          </div>
        </div>)}
    </div>);
}
export default BiologyFoundationsSimulation;
