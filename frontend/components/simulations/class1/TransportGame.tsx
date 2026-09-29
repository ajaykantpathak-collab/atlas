'use client';
/**
 * TransportGame - Learn modes of transport (land, water, air) and how vehicles move
 *
 * CISCE Nodes: c1_phy_004 (Modes of transport), c1_phy_005 (Vehicles move on land, water, air)
 * Enrichment: c1_physics_enrichment_part4.marker, c1_physics_enrichment_part5.marker
 *
 * ELI5: "Transport means how we travel from one place to another. There are
 *   three kinds. Land transport runs on the ground - like a car on a road.
 *   Water transport floats on water - like a boat on a pond. Air transport
 *   flies in the sky - like an aeroplane, just like a bird soaring."
 *
 * Misconceptions (from enrichment):
 *   1. "A ship and a car are both land transport because both carry people" →
 *      "A ship travels on water, so it is water transport! The mode is decided
 *      by WHERE the vehicle travels, not by whether it carries people."
 *   2. "A helicopter is air transport but an aeroplane is not, because it is bigger" →
 *      "Both fly in the sky, so both are air transport! Size does not decide the mode."
 *   3. "Emergency vehicles are a separate fourth mode" → "An ambulance is a road
 *      vehicle, so it belongs to land transport! There are still only three modes."
 *   4. "A boat rolls on the water like a car rolls on the road" → "A boat does NOT
 *      roll - it floats! Rolling needs a solid surface. Water is liquid. The correct
 *      action word for water is float, not roll!"
 *   5. "An aeroplane floats in the sky" → "An aeroplane does NOT float - it flies!
 *      Floating is what happens on water. The sky is air. The correct word is fly!"
 *
 * Story: "Meet Conductor Chiku the Train Engine! Help sort vehicles into land,
 *   water, and air groups, and learn how each one moves - roll, float, fly!"
 *
 * 14-point checklist:
 * - Custom SVG transport scene (road, river, sky with clouds)
 * - Custom SVG vehicles (car, bus, train, boat, ship, aeroplane, helicopter, bicycle)
 * - Unique mascot: Conductor Chiku (train engine with cap)
 * - Draggable sorting into land/water/air bins
 * - 5 teaching slides
 * - 8 progressive challenges (identify → sort → apply)
 * - Misconception feedback from enrichment
 * - StarRow, Confetti, SuccessBanner, HintBubble, SparkleBurst
 * - audioManager + speechManager
 * - 600+ lines
 * - TypeScript clean
 * - onComplete callback
 * - Auto-hint after inactivity
 * - Progressive difficulty
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';
// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
    { title: 'Three Modes of Transport! 🚗', text: 'Transport means how we travel from one place to another. There are THREE modes: land, water, and air! A car runs on a road. A boat floats on water. An aeroplane flies in the sky!', emoji: '🚗', bgColor: 'from-gold-400 to-gold-500', spoken: 'Transport means how we travel. There are three modes: land, water, and air! A car runs on a road. A boat floats on water. An aeroplane flies in the sky!' },
    { title: 'Land Transport 🚗🚌🚲', text: 'Land transport moves on the ground - on roads, railway tracks, or paths! Cars, buses, trains, bicycles, motorcycles, and bullock carts are all land transport. They stay on a solid surface!', emoji: '🚗', bgColor: 'from-amber-400 to-orange-500', spoken: 'Land transport moves on the ground on roads or tracks! Cars, buses, trains, and bicycles are all land transport. They stay on a solid surface!' },
    { title: 'Water Transport ⛵🚢', text: 'Water transport floats on water - rivers, lakes, ponds, and seas! Boats, ships, ferries, and rafts are water transport. A boat floats on water like a leaf floating on a puddle!', emoji: '⛵', bgColor: 'from-gold-400 to-gold-500', spoken: 'Water transport floats on water! Boats, ships, ferries, and rafts are water transport. A boat floats on water like a leaf floating on a puddle!' },
    { title: 'Air Transport ✈️🚁', text: 'Air transport flies through the sky! Aeroplanes, helicopters, gliders, and hot-air balloons are air transport. An aeroplane flies in the sky like a bird soaring through the air!', emoji: '✈️', bgColor: 'from-gold-400 to-gold-500', spoken: 'Air transport flies through the sky! Aeroplanes, helicopters, gliders, and hot-air balloons are air transport. An aeroplane flies like a bird soaring!' },
    { title: 'How They Move! 🛞🚣🪽', text: 'Land vehicles ROLL on wheels! Water vehicles FLOAT on water! Air vehicles FLY with wings! Remember: roll for land, float for water, fly for air! Three actions for three modes!', emoji: '🛞', bgColor: 'from-emerald-400 to-teal-500', spoken: 'Land vehicles roll on wheels! Water vehicles float on water! Air vehicles fly with wings! Remember: roll for land, float for water, fly for air!' },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_mode' | 'identify_vehicle' | 'sort_modes' | 'identify_action' | 'sort_actions';
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
        type: 'identify_mode',
        question: 'A car runs on a road. Which mode of transport is it?',
        answer: 'Land transport',
        options: ['Land transport', 'Water transport', 'Air transport'],
        hint: 'A car runs on a road on the ground! What mode travels on the ground?',
        misconception: 'A car runs on a road on land, so it is LAND transport! The mode is decided by WHERE the vehicle travels - on the ground, on water, or in the sky!',
    },
    {
        type: 'identify_mode',
        question: 'A boat floats on a river. Which mode of transport is it?',
        answer: 'Water transport',
        options: ['Land transport', 'Water transport', 'Air transport'],
        hint: 'A boat floats on water! What mode travels on water?',
        misconception: 'A boat floats on water, so it is WATER transport! The mode is decided by WHERE the vehicle travels - a boat travels on water, not on land or in the sky!',
    },
    {
        type: 'identify_mode',
        question: 'An aeroplane flies in the sky. Which mode of transport is it?',
        answer: 'Air transport',
        options: ['Land transport', 'Water transport', 'Air transport'],
        hint: 'An aeroplane flies in the sky! What mode travels in the sky?',
        misconception: 'An aeroplane flies in the sky, so it is AIR transport! The mode is decided by WHERE the vehicle travels - in the air, not on land or water!',
    },
    {
        type: 'identify_vehicle',
        question: 'Which of these is a WATER transport vehicle?',
        answer: 'Ship',
        options: ['Bus', 'Ship', 'Helicopter'],
        hint: 'A ship sails on the sea! A bus runs on a road. A helicopter flies in the sky.',
        misconception: 'A ship is WATER transport - it sails on the sea! A bus is land transport (runs on roads). A helicopter is air transport (flies in the sky). The mode is decided by where the vehicle travels, not by size or how many people it carries!',
    },
    {
        type: 'sort_modes',
        question: 'Drag each vehicle into the right mode! Land, water, or air?',
        answer: 'sort',
        options: [],
        hint: 'Car and bus = land! Boat and ship = water! Aeroplane and helicopter = air!',
        misconception: 'Ask: where does this vehicle travel? On the ground = land. On water = water. In the sky = air. A car runs on a road, a boat floats on water, a plane flies in the sky!',
        sortItems: [
            { id: 'car', label: 'Car', emoji: '🚗', correctBin: 'land' },
            { id: 'boat', label: 'Boat', emoji: '⛵', correctBin: 'water' },
            { id: 'plane', label: 'Aeroplane', emoji: '✈️', correctBin: 'air' },
            { id: 'train', label: 'Train', emoji: '🚂', correctBin: 'land' },
            { id: 'ship', label: 'Ship', emoji: '🚢', correctBin: 'water' },
            { id: 'heli', label: 'Helicopter', emoji: '🚁', correctBin: 'air' },
        ],
        bins: [
            { id: 'land', label: 'Land 🚗', color: '#F59E0B' },
            { id: 'water', label: 'Water ⛵', color: '#3B82F6' },
            { id: 'air', label: 'Air ✈️', color: '#8B5CF6' },
        ],
    },
    {
        type: 'identify_action',
        question: 'How does a CAR move?',
        answer: 'Rolls on wheels',
        options: ['Rolls on wheels', 'Floats on water', 'Flies with wings'],
        hint: 'A car has round wheels that turn and roll on the road, like a ball you push!',
        misconception: 'A car ROLLS on wheels! The round wheels turn and roll forward on the road, like a ball you push. A car does NOT float (that is for water) or fly (that is for air)! Roll for land, float for water, fly for air!',
    },
    {
        type: 'identify_action',
        question: 'How does a BOAT move?',
        answer: 'Floats on water',
        options: ['Rolls on wheels', 'Floats on water', 'Flies with wings'],
        hint: 'A boat has no wheels! It floats on top of the water and is pushed by oars or an engine!',
        misconception: 'A boat FLOATS on water! It does NOT roll - rolling needs a solid surface like a road. Water is liquid, so wheels cannot roll on it. The boat floats on top and moves with oars, sails, or an engine. The correct word for water is float, not roll!',
    },
    {
        type: 'sort_actions',
        question: 'Drag each vehicle to how it moves! Roll, float, or fly?',
        answer: 'sort',
        options: [],
        hint: 'Car and bus = roll! Boat and ship = float! Aeroplane and helicopter = fly!',
        misconception: 'Match the action to the medium! Land vehicles roll on wheels. Water vehicles float on water. Air vehicles fly with wings. Do not mix them up - a car does not float, a boat does not roll, a plane does not float!',
        sortItems: [
            { id: 'bus', label: 'Bus', emoji: '🚌', correctBin: 'roll' },
            { id: 'bicycle', label: 'Bicycle', emoji: '🚲', correctBin: 'roll' },
            { id: 'ferry', label: 'Ferry', emoji: '⛴️', correctBin: 'float' },
            { id: 'raft', label: 'Raft', emoji: '🛶', correctBin: 'float' },
            { id: 'glider', label: 'Glider', emoji: '🪂', correctBin: 'fly' },
            { id: 'balloon', label: 'Hot-air balloon', emoji: '🎈', correctBin: 'fly' },
        ],
        bins: [
            { id: 'roll', label: 'Roll 🛞', color: '#F59E0B' },
            { id: 'float', label: 'Float 🚣', color: '#3B82F6' },
            { id: 'fly', label: 'Fly 🪽', color: '#8B5CF6' },
        ],
    },
];
// ─── Conductor Chiku Mascot (Train Engine with Cap) ───────────
function ConductorChiku({ mood, speaking }: {
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
                ? { x: [0, 3, 0] }
                : { rotate: [0, 5, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          {/* Smokestack */}
          <rect x="50" y="10" width="8" height="14" fill="#37474F"/>
          {/* Smoke puffs */}
          <circle cx="54" cy="8" r="4" fill="#B0BEC5" opacity="0.7"/>
          <circle cx="60" cy="5" r="3" fill="#B0BEC5" opacity="0.5"/>
          {/* Engine body */}
          <rect x="15" y="24" width="45" height="30" rx="4" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1.5"/>
          {/* Cabin */}
          <rect x="35" y="20" width="20" height="14" rx="2" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5"/>
          {/* Window */}
          <rect x="38" y="22" width="14" height="9" rx="1" fill="#81D4FA"/>
          {/* Conductor cap on top of cabin */}
          <ellipse cx="45" cy="18" rx="10" ry="3" fill="#1A237E"/>
          <rect x="40" y="14" width="10" height="5" fill="#1A237E" rx="1"/>
          <circle cx="45" cy="13" r="2" fill="#FFD700"/>
          {/* Face on engine body */}
          <circle cx="25" cy="36" r="4" fill="white"/>
          <circle cx="32" cy="36" r="4" fill="white"/>
          <circle cx="26" cy="37" r="2.5" fill="#1A237E"/>
          <circle cx="33" cy="37" r="2.5" fill="#1A237E"/>
          <circle cx="27" cy="36" r="1" fill="white"/>
          <circle cx="34" cy="36" r="1" fill="white"/>
          <path d="M25 42 Q29 45 33 42" stroke="#1A237E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Cowcatcher */}
          <path d="M15 54 L10 58 L15 58 Z" fill="#FFD700" stroke="#F57F17" strokeWidth="1"/>
          {/* Wheels */}
          <circle cx="25" cy="58" r="7" fill="#424242" stroke="#212121" strokeWidth="1.5"/>
          <circle cx="25" cy="58" r="3" fill="#757575"/>
          <circle cx="50" cy="58" r="7" fill="#424242" stroke="#212121" strokeWidth="1.5"/>
          <circle cx="50" cy="58" r="3" fill="#757575"/>
          {/* Wheel spokes */}
          <line x1="25" y1="51" x2="25" y2="65" stroke="#212121" strokeWidth="1"/>
          <line x1="18" y1="58" x2="32" y2="58" stroke="#212121" strokeWidth="1"/>
          <line x1="50" y1="51" x2="50" y2="65" stroke="#212121" strokeWidth="1"/>
          <line x1="43" y1="58" x2="57" y2="58" stroke="#212121" strokeWidth="1"/>
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
// ─── Transport Scene Background (sky, road, river) ────────────
function TransportScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="transport-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87CEEB"/>
            <stop offset="40%" stopColor="#B0E0E6"/>
            <stop offset="60%" stopColor="#E0F7FA"/>
          </linearGradient>
        </defs>
        <rect width="720" height="560" fill="url(#transport-sky)"/>
      </svg>
      {/* Sun */}
      <motion.div className="absolute top-3 left-3" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
        <svg width="45" height="45" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="13" fill="#FFD700" opacity="0.9"/>
          <circle cx="25" cy="25" r="9" fill="#FFC107"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="25" y1="25" x2={25 + 20 * Math.cos(angle * Math.PI / 180)} y2={25 + 20 * Math.sin(angle * Math.PI / 180)} stroke="#FFD700" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>))}
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-6 left-1/3 opacity-70" animate={{ x: [0, 50, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="70" height="30" viewBox="0 0 70 30">
          <ellipse cx="22" cy="18" rx="16" ry="11" fill="white"/>
          <ellipse cx="40" cy="14" rx="20" ry="13" fill="white"/>
          <ellipse cx="52" cy="18" rx="14" ry="9" fill="white"/>
        </svg>
      </motion.div>
      <motion.div className="absolute top-12 right-1/4 opacity-60" animate={{ x: [0, -40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="55" height="25" viewBox="0 0 55 25">
          <ellipse cx="18" cy="15" rx="13" ry="9" fill="white"/>
          <ellipse cx="32" cy="12" rx="16" ry="11" fill="white"/>
          <ellipse cx="42" cy="15" rx="11" ry="7" fill="white"/>
        </svg>
      </motion.div>
      {/* Aeroplane flying in sky */}
      <motion.div className="absolute top-10 left-0" animate={{ x: [-60, width + 60] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>
        <svg width="40" height="20" viewBox="0 0 40 20">
          <ellipse cx="20" cy="10" rx="14" ry="4" fill="#E0E0E0" stroke="#9E9E9E" strokeWidth="0.5"/>
          <path d="M14 10 L8 4 L8 16 Z" fill="#BDBDBD"/>
          <path d="M26 10 L32 6 L32 14 Z" fill="#BDBDBD"/>
          <circle cx="28" cy="10" r="1.5" fill="#42A5F5"/>
        </svg>
      </motion.div>
      {/* River band (middle) */}
      <div className="absolute left-0 right-0" style={{ top: height * 0.45, height: height * 0.15, background: 'linear-gradient(180deg, #4FC3F7 0%, #0288D1 50%, #01579B 100%)' }}/>
      {/* River waves */}
      <motion.div className="absolute left-0 right-0" style={{ top: height * 0.45 + 5 }} animate={{ x: [0, 25, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="100%" height="15" viewBox="0 0 480 15" preserveAspectRatio="none">
          <path d="M0 8 Q60 0, 120 8 T240 8 T360 8 T480 8" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5"/>
        </svg>
      </motion.div>
      {/* Boat on river */}
      <motion.div className="absolute" style={{ top: height * 0.45 + 10, left: width * 0.3 }} animate={{ x: [0, 30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="35" height="20" viewBox="0 0 35 20">
          <path d="M5 15 L30 15 L27 19 L8 19 Z" fill="#8D6E63"/>
          <line x1="17" y1="15" x2="17" y2="3" stroke="#5D4037" strokeWidth="1.5"/>
          <path d="M17 4 L27 12 L17 12 Z" fill="white" stroke="#E0E0E0" strokeWidth="0.5"/>
        </svg>
      </motion.div>
      {/* Road (bottom) */}
      <div className="absolute left-0 right-0 bottom-0" style={{ height: height * 0.25, background: 'linear-gradient(180deg, #6D4C41 0%, #4E342E 100%)' }}/>
      {/* Road lane markings */}
      <div className="absolute left-0 right-0 flex justify-around" style={{ bottom: height * 0.12 }}>
        {Array.from({ length: 8 }).map((_, i) => (<div key={i} style={{ width: 20, height: 4, background: '#FFEB3B', opacity: 0.8, borderRadius: 2 }}/>))}
      </div>
      {/* Car on road */}
      <motion.div className="absolute" style={{ bottom: height * 0.05, left: width * 0.15 }} animate={{ x: [0, 60, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="40" height="22" viewBox="0 0 40 22">
          <rect x="4" y="8" width="32" height="10" rx="3" fill="#EF4444"/>
          <path d="M10 8 L14 2 L26 2 L30 8 Z" fill="#EF4444"/>
          <rect x="12" y="4" width="16" height="5" rx="1" fill="#81D4FA"/>
          <circle cx="12" cy="19" r="4" fill="#212121"/>
          <circle cx="12" cy="19" r="2" fill="#616161"/>
          <circle cx="28" cy="19" r="4" fill="#212121"/>
          <circle cx="28" cy="19" r="2" fill="#616161"/>
        </svg>
      </motion.div>
      {/* Trees on roadside */}
      <div className="absolute" style={{ bottom: height * 0.2, left: 10 }}>
        <svg width="25" height="35" viewBox="0 0 25 35">
          <rect x="10" y="20" width="5" height="12" fill="#6D4C41"/>
          <circle cx="12" cy="15" r="10" fill="#4CAF50"/>
          <circle cx="8" cy="12" r="6" fill="#66BB6A"/>
          <circle cx="16" cy="12" r="6" fill="#66BB6A"/>
        </svg>
      </div>
      <div className="absolute" style={{ bottom: height * 0.2, right: 10 }}>
        <svg width="25" height="35" viewBox="0 0 25 35">
          <rect x="10" y="20" width="5" height="12" fill="#6D4C41"/>
          <circle cx="12" cy="15" r="10" fill="#4CAF50"/>
          <circle cx="8" cy="12" r="6" fill="#66BB6A"/>
          <circle cx="16" cy="12" r="6" fill="#66BB6A"/>
        </svg>
      </div>
    </div>);
}
// ─── Vehicle SVG Icons ────────────────────────────────────────
function CarIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 40">
      <rect x="6" y="16" width="48" height="16" rx="4" fill="#EF4444" stroke="#B71C1C" strokeWidth="1.5"/>
      <path d="M14 16 L20 4 L40 4 L46 16 Z" fill="#EF4444" stroke="#B71C1C" strokeWidth="1.5"/>
      <rect x="18" y="6" width="24" height="9" rx="1" fill="#81D4FA" stroke="#4FC3F7" strokeWidth="1"/>
      <line x1="30" y1="6" x2="30" y2="15" stroke="#B71C1C" strokeWidth="1"/>
      <circle cx="16" cy="33" r="6" fill="#212121" stroke="#000" strokeWidth="1"/>
      <circle cx="16" cy="33" r="3" fill="#616161"/>
      <circle cx="44" cy="33" r="6" fill="#212121" stroke="#000" strokeWidth="1"/>
      <circle cx="44" cy="33" r="3" fill="#616161"/>
      {/* Headlight */}
      <circle cx="52" cy="20" r="2" fill="#FFEB3B"/>
    </svg>);
}
function BusIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 45">
      <rect x="4" y="8" width="52" height="28" rx="3" fill="#FFC107" stroke="#F57F17" strokeWidth="1.5"/>
      <rect x="8" y="12" width="10" height="8" rx="1" fill="#81D4FA"/>
      <rect x="22" y="12" width="10" height="8" rx="1" fill="#81D4FA"/>
      <rect x="36" y="12" width="10" height="8" rx="1" fill="#81D4FA"/>
      <rect x="48" y="12" width="6" height="8" rx="1" fill="#81D4FA"/>
      <rect x="8" y="24" width="44" height="6" fill="#FF8F00" opacity="0.5"/>
      <circle cx="16" cy="38" r="5" fill="#212121"/>
      <circle cx="16" cy="38" r="2.5" fill="#616161"/>
      <circle cx="44" cy="38" r="5" fill="#212121"/>
      <circle cx="44" cy="38" r="2.5" fill="#616161"/>
    </svg>);
}
function TrainIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 45">
      <rect x="8" y="6" width="44" height="26" rx="4" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5"/>
      <rect x="12" y="10" width="14" height="10" rx="1" fill="#81D4FA"/>
      <rect x="34" y="10" width="14" height="10" rx="1" fill="#81D4FA"/>
      <rect x="12" y="24" width="36" height="4" fill="#0D47A1" opacity="0.5"/>
      <rect x="26" y="2" width="6" height="6" fill="#37474F"/>
      <circle cx="18" cy="36" r="5" fill="#212121"/>
      <circle cx="18" cy="36" r="2.5" fill="#616161"/>
      <circle cx="42" cy="36" r="5" fill="#212121"/>
      <circle cx="42" cy="36" r="2.5" fill="#616161"/>
      <path d="M8 32 L4 36 L8 36 Z" fill="#FFD700"/>
    </svg>);
}
function BoatIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 45">
      <path d="M8 30 L52 30 L46 40 L14 40 Z" fill="#8D6E63" stroke="#5D4037" strokeWidth="1.5"/>
      <line x1="30" y1="30" x2="30" y2="6" stroke="#5D4037" strokeWidth="2"/>
      <path d="M30 8 L48 28 L30 28 Z" fill="white" stroke="#E0E0E0" strokeWidth="1"/>
      <path d="M30 8 L30 28 L14 28 Z" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1"/>
      {/* Water ripples */}
      <path d="M4 42 Q12 40, 20 42 T36 42 T56 42" stroke="#4FC3F7" strokeWidth="1.5" fill="none" opacity="0.6"/>
    </svg>);
}
function ShipIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 50">
      <path d="M6 32 L54 32 L48 44 L12 44 Z" fill="#455A64" stroke="#263238" strokeWidth="1.5"/>
      <rect x="22" y="18" width="16" height="14" fill="#90A4AE" stroke="#546E7A" strokeWidth="1"/>
      <rect x="25" y="20" width="10" height="6" fill="#81D4FA"/>
      <rect x="14" y="24" width="8" height="8" fill="#78909C" stroke="#546E7A" strokeWidth="1"/>
      <rect x="38" y="24" width="8" height="8" fill="#78909C" stroke="#546E7A" strokeWidth="1"/>
      <line x1="30" y1="18" x2="30" y2="4" stroke="#37474F" strokeWidth="1.5"/>
      <rect x="28" y="6" width="4" height="8" fill="#EF5350"/>
      {/* Smokestacks */}
      <rect x="20" y="10" width="5" height="10" fill="#37474F"/>
      <rect x="36" y="10" width="5" height="10" fill="#37474F"/>
      <circle cx="22" cy="8" r="2" fill="#B0BEC5" opacity="0.6"/>
      <circle cx="38" cy="8" r="2" fill="#B0BEC5" opacity="0.6"/>
      {/* Water */}
      <path d="M2 46 Q12 44, 22 46 T42 46 T58 46" stroke="#4FC3F7" strokeWidth="1.5" fill="none" opacity="0.6"/>
    </svg>);
}
function AeroplaneIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 50">
      <ellipse cx="30" cy="25" rx="22" ry="5" fill="#E0E0E0" stroke="#9E9E9E" strokeWidth="1.5"/>
      <path d="M18 25 L6 12 L6 38 Z" fill="#BDBDBD" stroke="#9E9E9E" strokeWidth="1"/>
      <path d="M42 25 L54 18 L54 32 Z" fill="#BDBDBD" stroke="#9E9E9E" strokeWidth="1"/>
      <path d="M24 22 L30 8 L36 22 Z" fill="#90A4AE" stroke="#546E7A" strokeWidth="1"/>
      <rect x="28" y="22" width="4" height="8" fill="#EF5350"/>
      {/* Window */}
      <circle cx="38" cy="25" r="2" fill="#42A5F5"/>
      <circle cx="44" cy="25" r="1.5" fill="#42A5F5"/>
    </svg>);
}
function HelicopterIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 50">
      {/* Main rotor */}
      <line x1="10" y1="8" x2="50" y2="8" stroke="#37474F" strokeWidth="2"/>
      <line x1="30" y1="8" x2="30" y2="16" stroke="#37474F" strokeWidth="1.5"/>
      {/* Body */}
      <ellipse cx="28" cy="26" rx="14" ry="8" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5"/>
      <rect x="36" y="22" width="10" height="6" rx="2" fill="#388E3C"/>
      {/* Window */}
      <ellipse cx="22" cy="24" rx="5" ry="4" fill="#81D4FA"/>
      {/* Tail */}
      <rect x="38" y="24" width="18" height="3" fill="#4CAF50"/>
      <rect x="52" y="20" width="4" height="10" fill="#388E3C"/>
      {/* Tail rotor */}
      <line x1="54" y1="22" x2="54" y2="32" stroke="#37474F" strokeWidth="1.5"/>
      {/* Skids */}
      <line x1="18" y1="36" x2="38" y2="36" stroke="#37474F" strokeWidth="2"/>
      <line x1="20" y1="34" x2="20" y2="36" stroke="#37474F" strokeWidth="1"/>
      <line x1="36" y1="34" x2="36" y2="36" stroke="#37474F" strokeWidth="1"/>
    </svg>);
}
function BicycleIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 45">
      <circle cx="15" cy="32" r="9" fill="none" stroke="#212121" strokeWidth="2"/>
      <circle cx="45" cy="32" r="9" fill="none" stroke="#212121" strokeWidth="2"/>
      <line x1="15" y1="32" x2="45" y2="32" stroke="#212121" strokeWidth="1.5"/>
      <line x1="15" y1="32" x2="30" y2="18" stroke="#212121" strokeWidth="1.5"/>
      <line x1="45" y1="32" x2="30" y2="18" stroke="#212121" strokeWidth="1.5"/>
      <line x1="30" y1="18" x2="30" y2="32" stroke="#212121" strokeWidth="1.5"/>
      <line x1="30" y1="18" x2="38" y2="12" stroke="#212121" strokeWidth="2"/>
      <path d="M36 10 L42 10 L40 14 L34 14 Z" fill="#212121"/>
      <circle cx="15" cy="32" r="2" fill="#616161"/>
      <circle cx="45" cy="32" r="2" fill="#616161"/>
    </svg>);
}
// ─── Sort Card Component (for drag-and-drop challenges) ───────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('car'))
        return <CarIcon size={size}/>;
    if (id.includes('roll'))
        return <CarIcon size={size}/>;
    if (id.includes('land'))
        return <CarIcon size={size}/>;
    if (id.includes('bus'))
        return <BusIcon size={size}/>;
    if (id.includes('train'))
        return <TrainIcon size={size}/>;
    if (id.includes('boat'))
        return <BoatIcon size={size}/>;
    if (id.includes('raft'))
        return <BoatIcon size={size}/>;
    if (id.includes('float'))
        return <BoatIcon size={size}/>;
    if (id.includes('water'))
        return <BoatIcon size={size}/>;
    if (id.includes('ship'))
        return <ShipIcon size={size}/>;
    if (id.includes('ferry'))
        return <ShipIcon size={size}/>;
    if (id.includes('plane'))
        return <AeroplaneIcon size={size}/>;
    if (id.includes('air'))
        return <AeroplaneIcon size={size}/>;
    if (id.includes('fly'))
        return <AeroplaneIcon size={size}/>;
    if (id.includes('heli'))
        return <HelicopterIcon size={size}/>;
    if (id.includes('balloon'))
        return <HelicopterIcon size={size}/>;
    if (id.includes('glider'))
        return <HelicopterIcon size={size}/>;
    if (id.includes('bicycle'))
        return <BicycleIcon size={size}/>;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2`} style={{ width: 110, height: 95 }}>
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
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={next} className="bg-white text-gold-600 font-bold rounded-xl px-8 py-3 text-base shadow-lg">
          {slide < total - 1 ? 'Next →' : "Let’s Play! 🎮"}


        </motion.button>
      </div>
    </div>);
}
// ─── Main Game Component ──────────────────────────────────────
export interface TransportGameProps {
    onComplete?: (score: number) => void;
    width?: number;
    height?: number;
}
export function TransportGame({ onComplete, width = 720, height = 560 }: TransportGameProps) {
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
    const [chikuMood, setChikuMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [chikuSpeaking, setChikuSpeaking] = useState<string | null>(null);
    const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // Drag-and-drop state for sort challenges
    const [placedItems, setPlacedItems] = useState<Set<string>>(new Set());
    const [wrongItemId, setWrongItemId] = useState<string | null>(null);
    const [hoveringBin, setHoveringBin] = useState<string | null>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const challenge = CHALLENGES[challengeIdx];
    const isSortChallenge = challenge.type === 'sort_modes' || challenge.type === 'sort_actions';
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
            setChikuMood('celebrate');
            setChikuSpeaking('Correct! You are a star!');
            setStars(s => s + 1);
            setSparklePos({ x: width / 2, y: height / 2, id: Date.now() });
            setTimeout(() => {
                if (challengeIdx < CHALLENGES.length - 1) {
                    setChallengeIdx(ci => ci + 1);
                    setSelectedAnswer(null);
                    setShowFeedback(false);
                    setIsCorrect(false);
                    setChikuMood('happy');
                    setChikuSpeaking(null);
                }
                else {
                    setAllComplete(true);
                    setShowConfetti(true);
                    setShowSuccess(true);
                    audioManager.play('celebration');
                    setChikuSpeaking('You are a Transport Expert!');
                    const score = Math.max(0, Math.min(100, 100 - errors * 5));
                    onComplete?.(score);
                }
            }, 2200);
        }
        else {
            audioManager.play('error');
            setChikuMood('thinking');
            setChikuSpeaking(challenge.misconception);
            setErrors(e => e + 1);
            if (feedbackTimerRef.current)
                clearTimeout(feedbackTimerRef.current);
            feedbackTimerRef.current = setTimeout(() => {
                setShowFeedback(false);
                setSelectedAnswer(null);
                setIsCorrect(false);
                setChikuMood('happy');
                setChikuSpeaking(null);
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
        const binWidth = 160;
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
            setChikuMood('happy');
            setChikuSpeaking(`${item.label} - correct!`);
            // Check if all items placed
            if (placedItems.size + 1 >= challenge.sortItems.length) {
                // All sorted correctly!
                setStars(s => s + 1);
                setTimeout(() => {
                    if (challengeIdx < CHALLENGES.length - 1) {
                        setChallengeIdx(ci => ci + 1);
                        setPlacedItems(new Set());
                        setWrongItemId(null);
                        setChikuMood('happy');
                        setChikuSpeaking(null);
                    }
                    else {
                        setAllComplete(true);
                        setShowConfetti(true);
                        setShowSuccess(true);
                        audioManager.play('celebration');
                        setChikuSpeaking('You are a Transport Expert!');
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
            setChikuMood('thinking');
            setChikuSpeaking(challenge.misconception);
            setErrors(e => e + 1);
            setTimeout(() => {
                setWrongItemId(null);
                setChikuMood('happy');
                setChikuSpeaking(null);
            }, 3000);
            return false; // Spring back
        }
    }, [isSortChallenge, challenge, placedItems, challengeIdx, errors, width, height, onComplete]);
    // ─── Hint ────────────────────────────────────────────────
    const handleHint = useCallback(() => {
        audioManager.play('hint');
        setShowHint(true);
        setChikuMood('thinking');
        setChikuSpeaking(challenge.hint);
        setTimeout(() => {
            setShowHint(false);
            setChikuMood('happy');
            setChikuSpeaking(null);
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
    const binWidth = 160;
    const binY = height - 110;
    const binSpacing = 30;
    const totalBinsWidth = isSortChallenge && challenge.bins ? challenge.bins.length * binWidth + (challenge.bins.length - 1) * binSpacing : 0;
    const binStartX = (width - totalBinsWidth) / 2;
    // Card starting positions (spread across top area)
    const cardStartY = 150;
    const cardSpacing = 130;
    // Helper to render the right vehicle icon
    const renderVehicleIcon = (label: string, size = 70) => {
        switch (label) {
            case 'Car': return <CarIcon size={size}/>;
            case 'Bus': return <BusIcon size={size}/>;
            case 'Train': return <TrainIcon size={size}/>;
            case 'Boat': return <BoatIcon size={size}/>;
            case 'Ship': return <ShipIcon size={size}/>;
            case 'Aeroplane': return <AeroplaneIcon size={size}/>;
            case 'Helicopter': return <HelicopterIcon size={size}/>;
            case 'Bicycle': return <BicycleIcon size={size}/>;
            default: return <span style={{ fontSize: 56 }}>{label === 'Bullock cart' ? '🛒' : '❓'}</span>;
        }
    };
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
      <TransportScene width={width} height={height}/>

      {/* Instruction bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-base">
              {allComplete ? 'You are a Transport Expert!' : challenge.question}
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
        <motion.div className="h-full bg-gradient-to-r from-amber-400 to-gold-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}/>
      </div>

      {/* Conductor Chiku mascot */}
      <ConductorChiku mood={chikuMood} speaking={chikuSpeaking}/>

      {/* Main content area */}
      <div className="absolute top-32 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-4 px-6 z-10">

        {/* Multiple choice challenges */}
        {!isSortChallenge && (<>
            {/* Show relevant SVG icon for identify challenges */}
            {(challenge.type === 'identify_vehicle' || challenge.type === 'identify_action') && (<motion.div key={`icon-${challengeIdx}`} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex gap-4 mb-2">
                {challenge.options.map((opt) => (<div key={opt}>{renderVehicleIcon(opt)}</div>))}
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
            {challenge.sortItems!.map((item, i) => {
                const itemsPerRow = challenge.sortItems!.length <= 4 ? 4 : 3;
                const cardX = 30 + (i % itemsPerRow) * cardSpacing;
                const cardY = cardStartY + Math.floor(i / itemsPerRow) * 80;
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
      {showSuccess && (<SuccessBanner message={allComplete ? 'You are a Transport Expert! 🎉' : 'Correct! 🎉'} onComplete={() => setShowSuccess(false)}/>)}
      {sparklePos && (<SparkleBurst key={sparklePos.id} x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>)}
    </div>);
}
