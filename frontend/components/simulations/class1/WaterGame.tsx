'use client';
/**
 * WaterGame - Learn about water: uses, sources, conservation, reuse
 *
 * CISCE Nodes: c1_chem_001 (Uses of water), c1_chem_002 (Sources of water),
 *              c1_chem_003 (Judicious use), c1_chem_004 (Reuse in family)
 * Enrichment: c1_chemistry_enrichment_part1-4
 *
 * ELI5: "Water is a helper in every home. We use it to drink, cook, wash,
 *   bathe, and water plants. Water comes from taps, wells, rivers, ponds,
 *   lakes, and rain. We must use it carefully and reuse it when we can!"
 *
 * Misconceptions (from enrichment):
 *   1. "Water is only for drinking" → "No! Water is used for cooking, bathing,
 *      washing clothes, washing utensils, watering plants, and giving to animals!"
 *   2. "Every cleaning job needs water" → "No! Sweeping with a broom and folding
 *      dry clothes do NOT need water! Only wet cleaning uses water!"
 *   3. "Water only comes from a tap" → "No! Water comes from wells, hand pumps,
 *      rivers, ponds, lakes, rain, and water tankers too!"
 *   4. "Reuse and recycle are the same" → "No! Reuse means using the same water
 *      again at home. Recycle means cleaning water in a big plant!"
 *   5. "Let the tap run while brushing" → "No! That wastes water! Turn it off
 *      and use a mug!"
 *
 * Story: "Help Dr. Pipa the Water Droplet sort water activities, find water
 *   sources, and learn to save and reuse water! Become a Water Hero!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG water scene background (sky, clouds, rain, river, ground)
 * - Custom SVG water source components (well, tap, river, pond, lake, rain, tanker)
 * - Custom SVG water droplet mascot (Dr. Pipa) with lab coat
 * - Drag-and-drop: drag water items into sorting bins
 * - 8 progressive challenges: identify uses → identify sources → sort → save/reuse
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API
 * - Procedural sound effects (drop, success, celebration)
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
    { title: 'Water is a Helper! 💧', text: 'Water helps us every day! We drink it, cook with it, bathe with it, wash clothes and utensils, and water plants! It is a daily helper in every home!', emoji: '💧', bgColor: 'from-cyan-400 to-blue-500', spoken: 'Water helps us every day! We drink it, cook with it, bathe with it, wash clothes and utensils, and water plants!' },
    { title: 'With or Without Water? 🚰', text: 'Some jobs need water - bathing, cooking, washing. Some jobs do NOT need water - sweeping with a broom, folding dry clothes, dusting! Can you tell the difference?', emoji: '🧹', bgColor: 'from-blue-400 to-indigo-500', spoken: 'Some jobs need water like bathing, cooking, and washing. Some jobs do not need water like sweeping, folding clothes, and dusting!' },
    { title: 'Where Does Water Come From? 🏞️', text: 'Water comes from many places! Taps, wells, hand pumps, rivers, ponds, lakes, rain, and water tankers are all sources of water!', emoji: '🌊', bgColor: 'from-teal-400 to-cyan-500', spoken: 'Water comes from many places! Taps, wells, hand pumps, rivers, ponds, lakes, rain, and water tankers are all sources of water!' },
    { title: 'Save Water! 💪', text: 'Fresh water is limited! Close taps tightly, use a mug for bathing, fix leaks. Do not let water overflow or run while brushing! Every drop counts!', emoji: '🪣', bgColor: 'from-green-400 to-emerald-500', spoken: 'Fresh water is limited! Close taps tightly, use a mug for bathing, fix leaks. Do not let water overflow or run while brushing!' },
    { title: 'Reuse Water! 🔄', text: 'Reuse means using the same water again! Vegetable wash water can water plants. Leftover drinking water can clean tables. Washing machine water can mop floors!', emoji: '🌱', bgColor: 'from-emerald-400 to-teal-500', spoken: 'Reuse means using the same water again! Vegetable wash water can water plants. Leftover drinking water can clean tables!' },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_use' | 'identify_source' | 'sort_uses' | 'sort_sources' | 'identify_habit' | 'sort_habits';
interface Challenge {
    type: ChallengeType;
    question: string;
    answer: string;
    options: string[];
    hint: string;
    misconception: string;
    // For sort challenges
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
        question: 'Which of these jobs NEEDS water?',
        answer: 'Cooking rice',
        options: ['Cooking rice', 'Sweeping the floor', 'Folding dry clothes'],
        hint: 'Think: does this job use water? Cooking rice needs water to soften the grains!',
        misconception: 'Cooking rice NEEDS water! Without water, the rice stays hard and burns! Sweeping and folding do NOT need water - they are dry jobs!',
    },
    {
        type: 'identify_use',
        question: 'Which of these jobs does NOT need water?',
        answer: 'Dusting the shelf',
        options: ['Bathing', 'Washing utensils', 'Dusting the shelf'],
        hint: 'Dusting uses a dry cloth! No water needed! Bathing and washing both need water!',
        misconception: 'Dusting the shelf does NOT need water - it uses a dry cloth! Bathing and washing utensils both NEED water! Not every cleaning job needs water!',
    },
    {
        type: 'identify_source',
        question: 'Which of these is a source of water?',
        answer: 'Well',
        options: ['Well', 'Television', 'Chair'],
        hint: 'A source is a place we get water FROM! A well has water at the bottom!',
        misconception: 'A well is a source of water - it is a deep hole with water! A TV and a chair are NOT sources! Sources are places water comes from: taps, wells, rivers, rain!',
    },
    {
        type: 'identify_source',
        question: 'Which of these is NOT a source of water?',
        answer: 'Book',
        options: ['River', 'Rainwater', 'Book'],
        hint: 'A river has water! Rain gives water! A book does not give water!',
        misconception: 'A book is NOT a source of water! Rivers and rainwater ARE sources! Sources are places we get water from - not everyday objects like books!',
    },
    {
        type: 'sort_uses',
        question: 'Drag each job into the right bin! Does it need water or not?',
        answer: 'sort',
        options: [],
        hint: 'Bathing, cooking, washing = need water! Sweeping, folding = no water!',
        misconception: 'Think carefully! If the job uses water to do it well, it goes in "Needs Water"! Dry jobs like sweeping and folding go in "No Water"!',
        sortItems: [
            { id: 'bathe', label: 'Bathing', emoji: '🚿', correctBin: 'water' },
            { id: 'cook', label: 'Cooking', emoji: '🍚', correctBin: 'water' },
            { id: 'sweep', label: 'Sweeping', emoji: '🧹', correctBin: 'no-water' },
            { id: 'fold', label: 'Folding clothes', emoji: '👔', correctBin: 'no-water' },
        ],
        bins: [
            { id: 'water', label: 'Needs Water 💧', color: '#3B82F6' },
            { id: 'no-water', label: 'No Water 🚫', color: '#F59E0B' },
        ],
    },
    {
        type: 'sort_sources',
        question: 'Drag each item! Is it a water source or not?',
        answer: 'sort',
        options: [],
        hint: 'Taps, wells, rivers, rain = water sources! TVs, chairs, books = not sources!',
        misconception: 'A source is where water comes FROM! Taps, wells, rivers, and rain give us water! TVs and chairs do not give water!',
        sortItems: [
            { id: 'tap', label: 'Tap water', emoji: '🚰', correctBin: 'source' },
            { id: 'river', label: 'River', emoji: '🏞️', correctBin: 'source' },
            { id: 'tv', label: 'Television', emoji: '📺', correctBin: 'not-source' },
            { id: 'chair', label: 'Chair', emoji: '🪑', correctBin: 'not-source' },
        ],
        bins: [
            { id: 'source', label: 'Water Source ✅', color: '#22C55E' },
            { id: 'not-source', label: 'Not a Source ❌', color: '#EF4444' },
        ],
    },
    {
        type: 'identify_habit',
        question: 'Which action SAVES water?',
        answer: 'Use a mug for bathing',
        options: ['Use a mug for bathing', 'Let the tap run while brushing', 'Let the bucket overflow'],
        hint: 'Using a mug takes only the water you need! Running taps and overflowing buckets waste water!',
        misconception: 'Using a mug SAVES water - you take only what you need! Letting the tap run or the bucket overflow WASTES water! Fresh water is limited - every drop counts!',
    },
    {
        type: 'sort_habits',
        question: 'Drag each action! Does it save water or waste water?',
        answer: 'sort',
        options: [],
        hint: 'Closing taps, reusing water, fixing leaks = save! Running taps, overflowing, throwing water = waste!',
        misconception: 'Good habits save water: close taps, use mugs, reuse water, fix leaks! Bad habits waste water: running taps, overflowing, throwing water away!',
        sortItems: [
            { id: 'close-tap', label: 'Close tap after use', emoji: '🚰', correctBin: 'save' },
            { id: 'reuse-veg', label: 'Reuse vegetable water for plants', emoji: '🥬', correctBin: 'save' },
            { id: 'let-run', label: 'Let tap run while brushing', emoji: '💦', correctBin: 'waste' },
            { id: 'overflow', label: 'Let bucket overflow', emoji: '🌊', correctBin: 'waste' },
        ],
        bins: [
            { id: 'save', label: 'Save Water ✅', color: '#22C55E' },
            { id: 'waste', label: 'Wastes Water ⚠️', color: '#EF4444' },
        ],
    },
];
// ─── Dr. Pipa Mascot (Water Droplet Scientist) ────────────────
function DrPipa({ mood, speaking }: {
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
        <svg width="70" height="85" viewBox="0 0 70 85">
          {/* Water droplet body */}
          <defs>
            <linearGradient id="droplet-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8"/>
              <stop offset="100%" stopColor="#0284C7"/>
            </linearGradient>
            <radialGradient id="droplet-shine" cx="0.3" cy="0.3" r="0.4">
              <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
          </defs>
          {/* Droplet shape */}
          <path d="M35 5 C25 20, 15 35, 15 50 C15 65, 24 75, 35 75 C46 75, 55 65, 55 50 C55 35, 45 20, 35 5 Z" fill="url(#droplet-body)" stroke="#0369A1" strokeWidth="1.5"/>
          {/* Shine */}
          <ellipse cx="28" cy="35" rx="6" ry="10" fill="url(#droplet-shine)"/>
          {/* Lab coat collar */}
          <path d="M22 48 L35 52 L48 48 L48 58 L35 62 L22 58 Z" fill="white" stroke="#E0E7FF" strokeWidth="1"/>
          {/* Eyes */}
          <circle cx="28" cy="38" r="4" fill="white"/>
          <circle cx="42" cy="38" r="4" fill="white"/>
          <circle cx="29" cy="39" r="2.5" fill="#1E3A8A"/>
          <circle cx="43" cy="39" r="2.5" fill="#1E3A8A"/>
          <circle cx="30" cy="38" r="1" fill="white"/>
          <circle cx="44" cy="38" r="1" fill="white"/>
          {/* Smile */}
          <path d="M29 44 Q35 48 41 44" stroke="#0369A1" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Tiny bow tie */}
          <path d="M30 52 L35 55 L40 52 L40 57 L35 54 L30 57 Z" fill="#EF4444"/>
          {/* Arms */}
          <ellipse cx="16" cy="52" rx="3" ry="7" fill="#0284C7" transform="rotate(-20 16 52)"/>
          <ellipse cx="54" cy="52" rx="3" ry="7" fill="#0284C7" transform="rotate(20 54 52)"/>
          {/* Feet */}
          <ellipse cx="28" cy="78" rx="4" ry="3" fill="#0369A1"/>
          <ellipse cx="42" cy="78" rx="4" ry="3" fill="#0369A1"/>
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
// ─── Water Scene Background ───────────────────────────────────
function WaterScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 30%, #87CEEB 50%, #4FC3F7 70%, #0288D1 100%)' }}/>
      {/* Sun */}
      <motion.div className="absolute top-3 left-3" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="15" fill="#FFD700" opacity="0.9"/>
          <circle cx="25" cy="25" r="10" fill="#FFC107"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="25" y1="25" x2={25 + 22 * Math.cos(angle * Math.PI / 180)} y2={25 + 22 * Math.sin(angle * Math.PI / 180)} stroke="#FFD700" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>))}
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-8 left-1/4 opacity-70" animate={{ x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="70" height="30" viewBox="0 0 70 30">
          <ellipse cx="22" cy="18" rx="16" ry="11" fill="white"/>
          <ellipse cx="40" cy="14" rx="20" ry="13" fill="white"/>
          <ellipse cx="52" cy="18" rx="14" ry="9" fill="white"/>
        </svg>
      </motion.div>
      <motion.div className="absolute top-14 right-1/4 opacity-60" animate={{ x: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="55" height="25" viewBox="0 0 55 25">
          <ellipse cx="18" cy="15" rx="13" ry="9" fill="white"/>
          <ellipse cx="32" cy="12" rx="16" ry="11" fill="white"/>
          <ellipse cx="42" cy="15" rx="11" ry="7" fill="white"/>
        </svg>
      </motion.div>
      {/* Rain drops */}
      <motion.div className="absolute top-20 left-10" animate={{ y: [0, 200, 0], opacity: [0, 0.6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeIn' }}>
        <svg width="20" height="30" viewBox="0 0 20 30">
          <path d="M10 0 C6 8, 3 15, 3 20 C3 25, 6 28, 10 28 C14 28, 17 25, 17 20 C17 15, 14 8, 10 0 Z" fill="#4FC3F7" opacity="0.7"/>
        </svg>
      </motion.div>
      <motion.div className="absolute top-24 right-16" animate={{ y: [0, 180, 0], opacity: [0, 0.5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeIn', delay: 1 }}>
        <svg width="16" height="24" viewBox="0 0 20 30">
          <path d="M10 0 C6 8, 3 15, 3 20 C3 25, 6 28, 10 28 C14 28, 17 25, 17 20 C17 15, 14 8, 10 0 Z" fill="#4FC3F7" opacity="0.6" />
        </svg>
      </motion.div>
      {/* River at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(180deg, #4FC3F7 0%, #0288D1 50%, #01579B 100%)' }} />
      {/* River waves */}
      <motion.div className="absolute bottom-16 left-0 right-0" animate={{ x: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="100%" height="20" viewBox="0 0 480 20" preserveAspectRatio="none">
          <path d="M0 10 Q60 0, 120 10 T240 10 T360 10 T480 10" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
        </svg>
      </motion.div>
      <motion.div className="absolute bottom-10 left-0 right-0" animate={{ x: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="100%" height="15" viewBox="0 0 480 15" preserveAspectRatio="none">
          <path d="M0 8 Q80 0, 160 8 T320 8 T480 8" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
        </svg>
      </motion.div>
      {/* Water lily on river */}
      <div className="absolute bottom-8 left-8 opacity-80">
        <svg width="30" height="20" viewBox="0 0 30 20">
          <ellipse cx="15" cy="12" rx="12" ry="6" fill="#4CAF50" />
          <path d="M15 12 L3 6 M15 12 L27 6 M15 12 L15 4" stroke="#388E3C" strokeWidth="1" />
          <circle cx="15" cy="10" r="3" fill="#FFC107" />
        </svg>
      </div>
    </div>
  );
}

// ─── Water Source SVG Icons ───────────────────────────────────

function WellIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Stone wall */}
      <rect x="15" y="25" width="30" height="25" fill="#8D6E63" stroke="#5D4037" strokeWidth="1.5" rx="2" />
      {/* Well opening (dark) */}
      <ellipse cx="30" cy="27" rx="12" ry="4" fill="#1A237E" />
      {/* Roof posts */}
      <rect x="12" y="10" width="3" height="18" fill="#6D4C41" />
      <rect x="45" y="10" width="3" height="18" fill="#6D4C41" />
      {/* Roof */}
      <path d="M8 12 L30 2 L52 12 Z" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1" />
      {/* Bucket on rope */}
      <line x1="30" y1="8" x2="30" y2="22" stroke="#5D4037" strokeWidth="1" />
      <rect x="26" y="22" width="8" height="6" fill="#A1887F" stroke="#5D4037" strokeWidth="1" rx="1" />
    </svg>
  );
}

function TapIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Pipe */}
      <rect x="10" y="20" width="25" height="6" fill="#78909C" stroke="#546E7A" strokeWidth="1" rx="2" />
      {/* Tap body */}
      <rect x="30" y="15" width="10" height="12" fill="#90A4AE" stroke="#546E7A" strokeWidth="1" rx="2" />
      {/* Handle */}
      <circle cx="35" cy="13" r="4" fill="#EF5350" stroke="#C62828" strokeWidth="1" />
      {/* Water drop */}
      <path d="M35 30 C33 33, 31 36, 31 38 C31 40, 33 41, 35 41 C37 41, 39 40, 39 38 C39 36, 37 33, 35 30 Z" fill="#4FC3F7" />
      {/* Basin */}
      <path d="M25 42 L45 42 L42 50 L28 50 Z" fill="#B0BEC5" stroke="#78909C" strokeWidth="1" />
    </svg>
  );
}

function RiverIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Banks */}
      <path d="M0 20 L60 20 L60 25 L0 25 Z" fill="#8BC34A" />
      <path d="M0 45 L60 45 L60 50 L0 50 Z" fill="#8BC34A" />
      {/* River */}
      <rect x="0" y="25" width="60" height="20" fill="#4FC3F7" />
      {/* Waves */}
      <path d="M5 30 Q15 27, 25 30 T45 30 T55 30" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M5 37 Q15 34, 25 37 T45 37 T55 37" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Fish */}
      <ellipse cx="40" cy="35" rx="5" ry="3" fill="#FF9800" />
      <path d="M35 35 L32 33 L32 37 Z" fill="#FF9800" />
    </svg>
  );
}

function RainIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Cloud */}
      <ellipse cx="22" cy="20" rx="14" ry="10" fill="#90A4AE" />
      <ellipse cx="38" cy="16" rx="16" ry="12" fill="#78909C" />
      <ellipse cx="45" cy="22" rx="10" ry="7" fill="#90A4AE" />
      {/* Rain drops */}
      <path d="M18 32 C16 35, 15 37, 15 38 C15 39, 16 40, 18 40 C20 40, 21 39, 21 38 C21 37, 20 35, 18 32 Z" fill="#4FC3F7" />
      <path d="M30 34 C28 37, 27 39, 27 40 C27 41, 28 42, 30 42 C32 42, 33 41, 33 40 C33 39, 32 37, 30 34 Z" fill="#4FC3F7" />
      <path d="M42 32 C40 35, 39 37, 39 38 C39 39, 40 40, 42 40 C44 40, 45 39, 45 38 C45 37, 44 35, 42 32 Z" fill="#4FC3F7" />
    </svg>
  );
}

function PondIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Grass border */}
      <path d="M5 30 Q10 25, 15 30 Q20 25, 25 30 Q30 25, 35 30 Q40 25, 45 30 Q50 25, 55 30" stroke="#4CAF50" strokeWidth="2" fill="none" />
      {/* Pond water */}
      <ellipse cx="30" cy="38" rx="22" ry="12" fill="#4FC3F7" stroke="#0288D1" strokeWidth="1.5" />
      {/* Lily pad */}
      <ellipse cx="22" cy="36" rx="6" ry="3" fill="#66BB6A" />
      {/* Ripples */}
      <ellipse cx="35" cy="40" rx="8" ry="3" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
      <ellipse cx="35" cy="40" rx="4" ry="1.5" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  );
}

function TankerIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Tank */}
      <rect x="8" y="15" width="30" height="20" fill="#42A5F5" stroke="#1565C0" strokeWidth="1.5" rx="4" />
      {/* Water drop on tank */}
      <path d="M23 10 C21 13, 20 15, 20 16 C20 17, 21 18, 23 18 C25 18, 26 17, 26 16 C26 15, 25 13, 23 10 Z" fill="#4FC3F7" />
      {/* Cab */}
      <rect x="38" y="18" width="14" height="17" fill="#EF5350" stroke="#C62828" strokeWidth="1" rx="2" />
      {/* Window */}
      <rect x="40" y="20" width="10" height="7" fill="#81D4FA" rx="1" />
      {/* Wheels */}
      <circle cx="18" cy="40" r="5" fill="#424242" />
      <circle cx="18" cy="40" r="2" fill="#757575" />
      <circle cx="45" cy="40" r="5" fill="#424242" />
      <circle cx="45" cy="40" r="2" fill="#757575" />
      {/* Road */}
      <rect x="0" y="46" width="60" height="4" fill="#9E9E9E" />
    </svg>
  );
}

// ─── Sort Card Component (for drag-and-drop challenges) ───────

function renderSortIcon(id: string, size: number = 48) {
  if (id.includes('well')) return <WellIcon size={size} />;
  if (id.includes('source')) return <WellIcon size={size} />;
  if (id.includes('tap')) return <TapIcon size={size} />;
  if (id.includes('close-tap')) return <TapIcon size={size} />;
  if (id.includes('let-run')) return <TapIcon size={size} />;
  if (id.includes('river')) return <RiverIcon size={size} />;
  if (id.includes('rain')) return <RainIcon size={size} />;
  if (id.includes('pond')) return <PondIcon size={size} />;
  if (id.includes('tanker')) return <TankerIcon size={size} />;
  if (id.includes('tank')) return <TankerIcon size={size} />;
  if (id.includes('bathe')) return <TapIcon size={size} />;
  if (id.includes('cook')) return <TapIcon size={size} />;
  if (id.includes('sweep')) return <PondIcon size={size} />;
  if (id.includes('save')) return <TapIcon size={size} />;
  if (id.includes('waste')) return <TapIcon size={size} />;
  if (id.includes('reuse')) return <RiverIcon size={size} />;
  if (id.includes('overflow')) return <TapIcon size={size} />;
  if (id.includes('fold')) return <TapIcon size={size} />;
  if (id.includes('chair')) return <WellIcon size={size} />;
  if (id.includes('tv')) return <WellIcon size={size} />;
  if (id.includes('not-source')) return <WellIcon size={size} />;
  if (id.includes('no-water')) return <WellIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2 border-2 border-sky-200`} style={{ width: 110, height: 95 }}>
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
      <div className="text-sm font-bold" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── Teaching Screen ──────────────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  useEffect(() => {
        // No TTS - sound effects only
        }, [slide]);

  const next = () => {audioManager.play('tap');
    if (slide < total - 1) {setSlide(s => s + 1);}
    else {audioManager.play('success');
      onStart();
    }
  };
  const prev = () => {audioManager.play('tap');
    if (slide > 0) setSlide(s => s - 1);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${current.bgColor} flex flex-col items-center justify-center p-8`} style={{ width, height }} onPointerDown={() => { audioManager.unlock(); }}>
      {/* Progress dots */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: total }).map((_, i) => (<div key={i} className="rounded-full transition-all" style={{ width: i === slide ? 28 : 8, height: 8, backgroundColor: i === slide ? 'white' : 'rgba(255,255,255,0.4)' }}/>))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={slide} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: 'spring', stiffness: 200 }} className="flex flex-col items-center text-center max-w-2xl">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="mb-6">
            <span style={{ fontSize: 80 }}>{current.emoji}</span>
          </motion.div>
          <h2 className="text-white text-3xl font-bold mb-4 drop-shadow-lg">{current.title}</h2>
          <p className="text-white/90 text-lg leading-relaxed">{current.text}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4">
        {slide > 0 && <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={prev} className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl px-6 py-3 text-base">← Back</motion.button>}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={next} className="bg-white text-cyan-600 font-bold rounded-xl px-8 py-3 text-base shadow-lg">
          {slide < total - 1 ? 'Next →' : "Let’s Play! 🎮"}


        </motion.button>
      </div>
    </div>);
}
// ─── Main Game Component ──────────────────────────────────────
export interface WaterGameProps {
    onComplete?: (score: number) => void;
    width?: number;
    height?: number;
}
export function WaterGame({ onComplete, width = 720, height = 560 }: WaterGameProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [challengeIdx, setChallengeIdx] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [errors, setErrors] = useState(0);
    const [stars, setStars] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [sparklePos, setSparklePos] = useState<{
        x: number;
        y: number;
        id: number;
    } | null>(null);
    const [allComplete, setAllComplete] = useState(false);
    const [pipaMood, setPipaMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [pipaSpeaking, setPipaSpeaking] = useState<string | null>(null);
    const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // Drag-and-drop state for sort challenges
    const [placedItems, setPlacedItems] = useState<Set<string>>(new Set());
    const [wrongItemId, setWrongItemId] = useState<string | null>(null);
    const [hoveringBin, setHoveringBin] = useState<string | null>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const challenge = CHALLENGES[challengeIdx];
    const isSortChallenge = challenge.type === 'sort_uses' || challenge.type === 'sort_sources' || challenge.type === 'sort_habits';
    // ─── Answer handling (multiple choice) ───────────────────
    const handleAnswer = useCallback((answer: string) => {
        if (showFeedback)
            return;
        setSelectedAnswer(answer);
        const correct = answer === challenge.answer;
        setIsCorrect(correct);
        setShowFeedback(true);
        setShowHint(false);
        if (correct) {
            audioManager.play('success');
            setPipaMood('celebrate');
            setPipaSpeaking('Correct! You are a star!');
            speechManager.speak('Correct! You are a star!');
            setStars(s => s + 1);
            setSparklePos({ x: width / 2, y: height / 2, id: Date.now() });
            setTimeout(() => {
                if (challengeIdx < CHALLENGES.length - 1) {
                    setChallengeIdx(ci => ci + 1);
                    setSelectedAnswer(null);
                    setShowFeedback(false);
                    setIsCorrect(false);
                    setPipaMood('happy');
                    setPipaSpeaking(null);
                }
                else {
                    setAllComplete(true);
                    setShowConfetti(true);
                    setShowSuccess(true);
                    audioManager.play('celebration');
                    setPipaSpeaking('You are a Water Hero!');
                    speechManager.speak('You are a Water Hero!');
                    const score = Math.max(0, Math.min(100, 100 - errors * 5));
                    onComplete?.(score);
                }
            }, 2200);
        }
        else {
            audioManager.play('error');
            setPipaMood('thinking');
            setPipaSpeaking(challenge.misconception);
            speechManager.speak(challenge.misconception);
            setErrors(e => e + 1);
            if (feedbackTimerRef.current)
                clearTimeout(feedbackTimerRef.current);
            feedbackTimerRef.current = setTimeout(() => {
                setShowFeedback(false);
                setSelectedAnswer(null);
                setIsCorrect(false);
                setPipaMood('happy');
                setPipaSpeaking(null);
            }, 4500);
        }
    }, [challenge, showFeedback, challengeIdx, errors, width, height, onComplete]);
    // ─── Drag-and-drop handling (sort challenges) ────────────
    const handleDragStart = useCallback((id: string) => {
        setDraggingId(id);
        audioManager.play('pickup');
    }, []);
    const handleDragEnd = useCallback((id: string, x: number, y: number): boolean => {
        setDraggingId(null);
        if (!isSortChallenge || !challenge.sortItems || !challenge.bins)
            return false;
        const item = challenge.sortItems.find(it => it.id === id);
        if (!item)
            return false;
        // Check which bin the item was dropped on
        const binHeight = 80;
        const binWidth = 180;
        const binY = height - 110;
        const binSpacing = 30;
        const totalBinsWidth = challenge.bins.length * binWidth + (challenge.bins.length - 1) * binSpacing;
        const binStartX = (width - totalBinsWidth) / 2;
        let droppedBin: string | null = null;
        for (let i = 0; i < challenge.bins.length; i++) {
            const bx = binStartX + i * (binWidth + binSpacing);
            if (x >= bx && x <= bx + binWidth && y >= binY && y <= binY + binHeight) {
                droppedBin = challenge.bins[i].id;
                break;
            }
        }
        setHoveringBin(null);
        if (!droppedBin)
            return false; // Spring back
        if (droppedBin === item.correctBin) {
            // Correct placement
            audioManager.play('drop-correct');
            setPlacedItems(prev => { const s = new Set(prev); s.add(id); return s; });
            setSparklePos({ x, y, id: Date.now() });
            setPipaMood('happy');
            setPipaSpeaking(`${item.label} - correct!`);
            speechManager.speak(`${item.label} - correct!`);
            // Check if all items placed
            if (placedItems.size + 1 >= challenge.sortItems.length) {
                // All sorted correctly!
                setStars(s => s + 1);
                setTimeout(() => {
                    if (challengeIdx < CHALLENGES.length - 1) {
                        setChallengeIdx(ci => ci + 1);
                        setPlacedItems(new Set());
                        setWrongItemId(null);
                        setPipaMood('happy');
                        setPipaSpeaking(null);
                    }
                    else {
                        setAllComplete(true);
                        setShowConfetti(true);
                        setShowSuccess(true);
                        audioManager.play('celebration');
                        setPipaSpeaking('You are a Water Hero!');
                        speechManager.speak('You are a Water Hero!');
                        const score = Math.max(0, Math.min(100, 100 - errors * 5));
                        onComplete?.(score);
                    }
                }, 1500);
            }
            return true; // Snap to bin
        }
        else {
            // Wrong placement
            audioManager.play('drop-wrong');
            setWrongItemId(id);
            setPipaMood('thinking');
            setPipaSpeaking(challenge.misconception);
            speechManager.speak(challenge.misconception);
            setErrors(e => e + 1);
            setTimeout(() => {
                setWrongItemId(null);
                setPipaMood('happy');
                setPipaSpeaking(null);
            }, 3000);
            return false; // Spring back
        }
    }, [isSortChallenge, challenge, placedItems, challengeIdx, errors, width, height, onComplete]);
    // ─── Hint ────────────────────────────────────────────────
    const handleHint = useCallback(() => {
        audioManager.play('hint');
        setShowHint(true);
        setPipaMood('thinking');
        setPipaSpeaking(challenge.hint);
        speechManager.speak(challenge.hint);
        setTimeout(() => {
            setShowHint(false);
            setPipaMood('happy');
            setPipaSpeaking(null);
        }, 5000);
    }, [challenge]);
    // ─── Auto-hint after inactivity ──────────────────────────
    useEffect(() => {
        if (screen === 'play' && !showFeedback && !allComplete && !draggingId) {
            hintTimerRef.current = setTimeout(() => {
                if (!showHint)
                    handleHint();
            }, 10000);
        }
        return () => {
            speechManager.stop();
            if (hintTimerRef.current)
                clearTimeout(hintTimerRef.current);
        };
    }, [screen, challengeIdx, showFeedback, showHint, allComplete, draggingId, handleHint]);
    // ─── Reset sort state on challenge change ────────────────
    useEffect(() => {
        setPlacedItems(new Set());
        setWrongItemId(null);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setIsCorrect(false);
    }, [challengeIdx]);
    // ─── Render: Teaching ────────────────────────────────────
    if (screen === 'teaching') {
        return <TeachingScreen onStart={() => setScreen('play')} width={width} height={height}/>;
    }
    // ─── Render: Play ────────────────────────────────────────
    const progress = ((challengeIdx + (isCorrect || (isSortChallenge && placedItems.size === (challenge.sortItems?.length || 0)) ? 1 : 0)) / CHALLENGES.length) * 100;
    // Calculate bin positions for sort challenges
    const binHeight = 80;
    const binWidth = 180;
    const binY = height - 110;
    const binSpacing = 30;
    const totalBinsWidth = isSortChallenge && challenge.bins ? challenge.bins.length * binWidth + (challenge.bins.length - 1) * binSpacing : 0;
    const binStartX = (width - totalBinsWidth) / 2;
    // Card starting positions (spread across top area)
    const cardStartY = 160;
    const cardSpacing = 130;
    return (<div className="relative overflow-hidden rounded-2xl" style={{ width, height }} onPointerDown={() => { audioManager.unlock(); }} onPointerMove={(e) => {
            if (draggingId && isSortChallenge && challenge.bins) {
                const rect = e.currentTarget.getBoundingClientRect();
                const px = e.clientX - rect.left;
                const py = e.clientY - rect.top;
                for (let i = 0; i < challenge.bins.length; i++) {
                    const bx = binStartX + i * (binWidth + binSpacing);
                    if (px >= bx && px <= bx + binWidth && py >= binY && py <= binY + binHeight) {
                        setHoveringBin(challenge.bins[i].id);
                        return;
                    }
                }
                setHoveringBin(null);
            }
        }}>
      {/* Scene background */}
      <WaterScene width={width} height={height}/>

      {/* Instruction bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-base">
              {allComplete ? 'You are a Water Hero!' : challenge.question}
            </p>
            <p className="text-white/60 text-sm">
              {allComplete ? 'All levels complete!' : `Problem ${challengeIdx + 1} of ${CHALLENGES.length}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StarRow count={stars} total={CHALLENGES.length}/>
            <button onClick={handleHint} className="text-white/70 hover:text-white transition-colors" aria-label="Hint">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 16v-4M12 8h.01" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-[60px] left-4 right-4 z-20 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}/>
      </div>

      {/* Dr. Pipa mascot */}
      <DrPipa mood={pipaMood} speaking={pipaSpeaking}/>

      {/* Main content area */}
      <div className="absolute top-32 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-4 px-6 z-10">

        {/* Multiple choice challenges */}
        {!isSortChallenge && (<>
            {/* Show relevant SVG icon for identify challenges */}
            {challenge.type === 'identify_source' && (<motion.div key={`icon-${challengeIdx}`} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex gap-4 mb-2">
                {challenge.options.map((opt) => {
                    const icon = opt === 'Well' ? <WellIcon size={70}/> :
                        opt === 'River' ? <RiverIcon size={70}/> :
                            opt === 'Rainwater' ? <RainIcon size={70}/> :
                                opt === 'Pond' ? <PondIcon size={70}/> :
                                    opt === 'Tap water' ? <TapIcon size={70}/> :
                                        opt === 'Water tanker' ? <TankerIcon size={70}/> :
                                            <span style={{ fontSize: 56 }}>{opt === 'Television' ? '📺' : opt === 'Chair' ? '🪑' : opt === 'Book' ? '📖' : '❓'}</span>;
                    return <div key={opt}>{icon}</div>;
                })}
              </motion.div>)}

            {/* Answer options */}
            <div className="flex flex-col gap-3 w-full max-w-lg mt-2">
              {challenge.options.map((option) => (<motion.button key={option} onClick={() => handleAnswer(option)} disabled={showFeedback} whileHover={{ scale: showFeedback ? 1 : 1.03 }} whileTap={{ scale: showFeedback ? 1 : 0.97 }} className={`px-6 py-4 rounded-xl font-bold text-lg transition-all ${selectedAnswer === option
                    ? isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    : showFeedback && option === challenge.answer
                        ? 'bg-green-500/60 text-white'
                        : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'}`}>
                  {option}
                </motion.button>))}
            </div>
          </>)}
        {/* Sort challenges (drag-and-drop) */}
        {isSortChallenge && challenge.sortItems && challenge.bins && (<div className="relative w-full" style={{ height: height - 160 }}>
            {/* Sort cards (draggable) */}
            {challenge.sortItems.map((item, i) => {
                const cardX = 40 + (i % 4) * cardSpacing;
                const cardY = cardStartY + Math.floor(i / 4) * 80;
                return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={cardX} y={cardY} placed={placedItems.has(item.id)} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}

            {/* Sort bins */}
            {challenge.bins.map((bin, i) => {
                const bx = binStartX + i * (binWidth + binSpacing);
                return (<SortBin key={bin.id} label={bin.label} color={bin.color} x={bx} y={binY} width={binWidth} height={binHeight} isHovering={hoveringBin === bin.id}/>);
            })}

            {/* Wrong item feedback */}
            <AnimatePresence>
              {wrongItemId && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl text-sm text-center max-w-md bg-red-500/40 text-red-100 backdrop-blur-sm">
                  ⚠️ {challenge.misconception}
                </motion.div>)}
            </AnimatePresence>
          </div>)}

        {/* Feedback for multiple choice */}
        <AnimatePresence>
          {showFeedback && !isCorrect && !isSortChallenge && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-4 py-3 rounded-xl text-base text-center max-w-2xl bg-red-500/30 text-red-100 backdrop-blur-sm">
              ⚠️ {challenge.misconception}
            </motion.div>)}
        </AnimatePresence>

        {/* Hint */}
        <AnimatePresence>
          {showHint && !showFeedback && (<HintBubble message={`💡 ${challenge.hint}`} onComplete={() => setShowHint(false)}/>)}
        </AnimatePresence>
      </div>

      {/* Feedback overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {showSuccess && (<SuccessBanner message={allComplete ? 'You are a Water Hero! 🎉' : 'Correct! 🎉'} onComplete={() => setShowSuccess(false)}/>)}
      {sparklePos && (<SparkleBurst key={sparklePos.id} x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>)}
    </div>);
}
