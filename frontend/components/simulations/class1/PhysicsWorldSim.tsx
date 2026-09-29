'use client';
/**
 * PhysicsWorldSim - Physics foundations for Classes 1-5.
 *
 * CISCE Nodes: c1_phy_001 through c5_phy_010
 * Enrichment: c1_physics_enrichment through c5_physics_enrichment
 *
 * ELI5: "Physics is the science of how things move and work! Push and pull are
 *   forces that make objects move. Light travels in straight lines and makes
 *   shadows. The Sun gives us light and heat. Magnets attract some metals.
 *   Sound travels through air to our ears!"
 *
 * Misconceptions (from enrichment):
 *   1. "Heavy things fall faster" -> "No! In vacuum all things fall at the same speed!"
 *   2. "Light needs air to travel" -> "No! Light travels through empty space (vacuum)!"
 *   3. "Shadows are made by darkness" -> "No! Shadows are made when objects BLOCK light!"
 *   4. "Magnets attract all metals" -> "No! Magnets only attract iron, not all metals!"
 *   5. "The Sun moves across the sky" -> "No! The Earth rotates - the Sun stays still!"
 *
 * Story: "Join Physics Pals Pip and Panda at the Science Discovery Park!
 *   Explore forces, sort light vs shadow, match magnets, and earn your
 *   Physics Explorer Badge!"
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';
// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
    { title: 'Push and Pull Forces 💪', text: 'A force is a push or a pull that makes things move, stop, or change direction! When you push a swing, it goes forward. When you pull a door, it opens. Forces are everywhere in our daily life!', emoji: '💪', bgColor: 'from-orange-400 to-red-500' },
    { title: 'Light and Shadows ☀️', text: 'Light travels in straight lines from the Sun. When a solid object blocks the light, it makes a SHADOW! Long shadows happen in the morning and evening. Short shadows happen at noon when the Sun is high!', emoji: '☀️', bgColor: 'from-yellow-400 to-amber-500' },
    { title: 'The Sun and Earth 🌍', text: 'The Sun stays in one place and gives us light and heat. The Earth ROTATES (spins) on its axis once every 24 hours - this makes day and night! The Earth also ORBITS (goes around) the Sun once a year!', emoji: '🌍', bgColor: 'from-gold-400 to-gold-500' },
    { title: 'Magnets and Metals 🧲', text: 'Magnets are special objects that attract (pull) certain metals! Magnets attract IRON, but they do NOT attract all metals. Aluminium and copper are not attracted to magnets. Magnets have two ends: North and South poles!', emoji: '🧲', bgColor: 'from-purple-400 to-gold-500' },
    { title: 'Sound Travels Through Air 🔊', text: 'Sound travels through air as invisible waves! When something vibrates (shakes), it makes sound. The sound waves travel through air to our ears. Sound cannot travel through a vacuum (empty space with no air)!', emoji: '🔊', bgColor: 'from-teal-400 to-gold-500' },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_force' | 'identify_shadow' | 'sort_forces' | 'identify_sun' | 'sort_magnets' | 'identify_sound' | 'sort_lightshadow' | 'identify_rotation';
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
        type: 'identify_force',
        question: 'When you OPEN a door by pulling the handle towards you, what kind of force is it?',
        answer: 'Pull',
        options: ['Push', 'Pull', 'Twist'],
        hint: 'You are bringing the door towards you. What do we call that?',
        misconception: 'Pulling the door towards you is a PULL force! A push moves things away from you. A twist rotates things. Opening a door by the handle is a pull!',
    },
    {
        type: 'identify_shadow',
        question: 'When does your shadow become the LONGEST?',
        answer: 'Morning and Evening',
        options: ['Noon', 'Morning and Evening', 'Midnight'],
        hint: 'Think about when the Sun is low in the sky vs high up!',
        misconception: 'Shadows are longest in the morning and evening when the Sun is LOW in the sky! At noon the Sun is high, so shadows are short. The lower the Sun, the longer the shadow!',
    },
    {
        type: 'sort_forces',
        question: 'Drag each action: Is it a PUSH or a PULL?',
        answer: 'sort',
        options: [],
        hint: 'Push = move away from you. Pull = bring towards you!',
        misconception: 'A PUSH moves things away from you (kicking a ball, closing a drawer). A PULL brings things towards you (opening a drawer, tug of war). Never confuse the direction of the force!',
        sortItems: [
            { id: 'kick', label: 'Kick a Ball', emoji: '⚽', correctBin: 'push' },
            { id: 'drawer-open', label: 'Open Drawer', emoji: '📦', correctBin: 'pull' },
            { id: 'cart', label: 'Push Cart', emoji: '🛒', correctBin: 'push' },
            { id: 'tug', label: 'Tug of War', emoji: '🪢', correctBin: 'pull' },
        ],
        bins: [
            { id: 'push', label: 'Push (Away) ⬇️', color: '#EF4444' },
            { id: 'pull', label: 'Pull (Towards) ⬆️', color: '#3B82F6' },
        ],
    },
    {
        type: 'identify_sun',
        question: 'Why do we have DAY and NIGHT on Earth?',
        answer: 'Earth rotates on its axis',
        options: ['The Sun moves around Earth', 'Earth rotates on its axis', 'The Moon blocks the Sun'],
        hint: 'Think: does the Sun move, or does the Earth spin?',
        misconception: 'The Earth ROTATES (spins) on its axis once every 24 hours! The Sun stays still. The side of Earth facing the Sun has day, the other side has night. The Sun does NOT move around the Earth!',
    },
    {
        type: 'sort_magnets',
        question: 'Drag each item: Will a MAGNET attract it or NOT?',
        answer: 'sort',
        options: [],
        hint: 'Magnets attract IRON objects, not all metals! Think about what each item is made of!',
        misconception: 'Magnets only attract IRON and steel (which contains iron). They do NOT attract aluminium, copper, plastic, or wood. Not all metals are magnetic - only iron-based ones!',
        sortItems: [
            { id: 'nail', label: 'Iron Nail', emoji: '🔩', correctBin: 'attract' },
            { id: 'key', label: 'Iron Key', emoji: '🗝️', correctBin: 'attract' },
            { id: 'coin', label: 'Copper Coin', emoji: '🪙', correctBin: 'noattract' },
            { id: 'plastic', label: 'Plastic Toy', emoji: '🧸', correctBin: 'noattract' },
        ],
        bins: [
            { id: 'attract', label: 'Magnet Attracts 🧲', color: '#EF4444' },
            { id: 'noattract', label: 'No Attraction ❌', color: '#6B7280' },
        ],
    },
    {
        type: 'identify_sound',
        question: 'Sound CANNOT travel through which of these?',
        answer: 'Vacuum (empty space)',
        options: ['Air', 'Water', 'Vacuum (empty space)'],
        hint: 'Sound needs something to travel through. What has nothing in it?',
        misconception: 'Sound needs a medium to travel - it moves through air, water, and solids as waves. A VACUUM has no air, no water, nothing! So sound cannot travel through a vacuum!',
    },
    {
        type: 'sort_lightshadow',
        question: 'Drag each item: Does it MAKE LIGHT or BLOCK LIGHT?',
        answer: 'sort',
        options: [],
        hint: 'Things that glow (Sun, lamp, candle) make light. Solid things (wall, tree, book) block light and make shadows!',
        misconception: 'Light SOURCES make light: Sun, lamp, candle, torch. Solid objects BLOCK light and make shadows: wall, tree, book. Light travels in straight lines and cannot pass through solid objects!',
        sortItems: [
            { id: 'sun', label: 'Sun', emoji: '☀️', correctBin: 'light' },
            { id: 'lamp', label: 'Lamp', emoji: '💡', correctBin: 'light' },
            { id: 'wall', label: 'Wall', emoji: '🧱', correctBin: 'block' },
            { id: 'tree', label: 'Tree', emoji: '🌳', correctBin: 'block' },
        ],
        bins: [
            { id: 'light', label: 'Makes Light ☀️', color: '#F59E0B' },
            { id: 'block', label: 'Blocks Light 🌑', color: '#334155' },
        ],
    },
    {
        type: 'identify_rotation',
        question: 'How long does the Earth take to complete ONE rotation (spin) on its axis?',
        answer: '24 hours',
        options: ['1 hour', '24 hours', '365 days'],
        hint: 'Think: how long is one full day and night cycle?',
        misconception: 'The Earth takes 24 HOURS (one day) to rotate once on its axis! This is what gives us day and night. 365 days is how long the Earth takes to ORBIT (go around) the Sun - that is one year!',
    },
];
// ─── Physics Pals Mascot (Pip the Panda Scientist) ────────────
function PipPanda({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-orange-300">
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
            <linearGradient id="pip-coat-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white"/>
              <stop offset="100%" stopColor="#F1F5F9"/>
            </linearGradient>
          </defs>
          {/* Panda head (white) */}
          <circle cx="40" cy="28" r="18" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
          {/* Panda ears (black) */}
          <circle cx="24" cy="16" r="6" fill="#1E293B"/>
          <circle cx="56" cy="16" r="6" fill="#1E293B"/>
          {/* Eye patches (black) */}
          <ellipse cx="33" cy="26" rx="5" ry="6" fill="#1E293B" transform="rotate(-15 33 26)"/>
          <ellipse cx="47" cy="26" rx="5" ry="6" fill="#1E293B" transform="rotate(15 47 26)"/>
          {/* Eyes (white dots in patches) */}
          <circle cx="34" cy="27" r="2" fill="white"/>
          <circle cx="46" cy="27" r="2" fill="white"/>
          <circle cx="34" cy="27" r="1" fill="#1E293B"/>
          <circle cx="46" cy="27" r="1" fill="#1E293B"/>
          {/* Black nose */}
          <ellipse cx="40" cy="32" rx="2.5" ry="2" fill="#1E293B"/>
          {/* Smile */}
          <path d="M36 35 Q40 38 44 35" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Lab coat with gradient */}
          <path d="M24 45 L40 50 L56 45 L62 80 L18 80 Z" fill="url(#pip-coat-grad)" stroke="#CBD5E1" strokeWidth="1.5"/>
          {/* Coat lapel */}
          <path d="M35 46 L40 56 L45 46" stroke="#E2E8F0" strokeWidth="1.5" fill="none"/>
          {/* Orange bow tie */}
          <path d="M35 48 L40 52 L45 48 L45 54 L40 52 L35 54 Z" fill="#F97316" stroke="#EA580C" strokeWidth="1"/>
          {/* Atom symbol on coat */}
          <circle cx="52" cy="62" r="3" fill="#F97316"/>
          <ellipse cx="52" cy="62" rx="6" ry="2.5" fill="none" stroke="#F97316" strokeWidth="1.2"/>
          <ellipse cx="52" cy="62" rx="6" ry="2.5" fill="none" stroke="#F97316" strokeWidth="1.2" transform="rotate(60 52 62)"/>
          <ellipse cx="52" cy="62" rx="6" ry="2.5" fill="none" stroke="#F97316" strokeWidth="1.2" transform="rotate(120 52 62)"/>
          {/* Compass held in left hand */}
          <circle cx="24" cy="65" r="8" fill="white" stroke="#64748B" strokeWidth="2"/>
          <circle cx="24" cy="65" r="6" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1"/>
          {/* Compass needle */}
          <path d="M24 60 L26 65 L24 63 L22 65 Z" fill="#EF4444"/>
          <path d="M24 70 L22 65 L24 67 L26 65 Z" fill="#334155"/>
          <text x="24" y="59" fontSize="3" fill="#1E293B" textAnchor="middle" fontWeight="bold">N</text>
          {/* Hand holding compass */}
          <circle cx="24" cy="72" r="3.5" fill="white" stroke="#1E293B" strokeWidth="1"/>
          {/* Feet (black) */}
          <ellipse cx="32" cy="88" rx="5" ry="3.5" fill="#1E293B"/>
          <ellipse cx="48" cy="88" rx="5" ry="3.5" fill="#1E293B"/>
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
// ─── Science Park Scene Background ────────────────────────────
function ScienceParkBackground({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Layered park gradient (sky → park → grass) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 30%, #FEF9C3 60%, #D1FAE5 100%)' }}/>

      {/* Park Window with sky view */}
      <div className="absolute top-8 left-8 opacity-40">
        <svg width="100" height="80" viewBox="0 0 100 80">
          <rect x="3" y="3" width="94" height="74" rx="4" fill="white" stroke="#F59E0B" strokeWidth="3"/>
          <line x1="50" y1="3" x2="50" y2="77" stroke="#F59E0B" strokeWidth="2"/>
          <line x1="3" y1="40" x2="97" y2="40" stroke="#F59E0B" strokeWidth="2"/>
          {/* Sky through window */}
          <rect x="6" y="6" width="41" height="31" fill="#FEF3C7" opacity="0.5"/>
          <rect x="53" y="6" width="41" height="31" fill="#FEF3C7" opacity="0.5"/>
          <rect x="6" y="43" width="41" height="31" fill="#FDE68A" opacity="0.5"/>
          <rect x="53" y="43" width="41" height="31" fill="#FDE68A" opacity="0.5"/>
          {/* Mini sun through window */}
          <circle cx="25" cy="18" r="6" fill="#FBBF24" opacity="0.6"/>
          <line x1="25" y1="8" x2="25" y2="11" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
          <line x1="15" y1="18" x2="18" y2="18" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
          <line x1="32" y1="18" x2="35" y2="18" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
          {/* Mini tree through window */}
          <rect x="70" y="52" width="3" height="12" fill="#92400E"/>
          <circle cx="71" cy="50" r="7" fill="#10B981" opacity="0.6"/>
        </svg>
      </div>

      {/* Physics Formula Poster on Wall */}
      <div className="absolute top-6 right-12 opacity-30">
        <svg width="80" height="100" viewBox="0 0 80 100">
          <rect x="3" y="3" width="74" height="94" rx="4" fill="white" stroke="#F59E0B" strokeWidth="2"/>
          {/* Atom diagram inside poster */}
          <circle cx="40" cy="40" r="4" fill="#F97316"/>
          <ellipse cx="40" cy="40" rx="20" ry="8" fill="none" stroke="#F97316" strokeWidth="1.5"/>
          <ellipse cx="40" cy="40" rx="20" ry="8" fill="none" stroke="#F97316" strokeWidth="1.5" transform="rotate(60 40 40)"/>
          <ellipse cx="40" cy="40" rx="20" ry="8" fill="none" stroke="#F97316" strokeWidth="1.5" transform="rotate(120 40 40)"/>
          <text x="40" y="75" fontSize="8" fill="#F59E0B" textAnchor="middle" fontWeight="bold">F = m × a</text>
          <text x="40" y="88" fontSize="6" fill="#F97316" textAnchor="middle">PHYSICS</text>
        </svg>
      </div>

      {/* Experiment Table with Pendulum (topic-specific!) */}
      <div className="absolute bottom-20 left-6 opacity-35">
        <svg width="100" height="80" viewBox="0 0 100 80">
          {/* Table */}
          <rect x="5" y="55" width="90" height="6" rx="2" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5"/>
          <rect x="10" y="61" width="4" height="15" fill="#64748B"/>
          <rect x="86" y="61" width="4" height="15" fill="#64748B"/>
          {/* Pendulum stand */}
          <rect x="45" y="15" width="3" height="40" fill="#475569"/>
          <rect x="35" y="15" width="25" height="3" rx="1" fill="#475569"/>
          {/* Pendulum string */}
          <line x1="50" y1="18" x2="50" y2="45" stroke="#334155" strokeWidth="1.5"/>
          {/* Pendulum bob */}
          <circle cx="50" cy="48" r="5" fill="#F97316" stroke="#EA580C" strokeWidth="1.5"/>
          {/* Pendulum arc */}
          <path d="M35 48 Q50 35 65 48" stroke="#F97316" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="2,2"/>
          {/* Weights on table */}
          <rect x="20" y="48" width="8" height="7" rx="1" fill="#334155" stroke="#1E293B" strokeWidth="1"/>
          <rect x="22" y="43" width="4" height="5" rx="1" fill="#475569"/>
        </svg>
      </div>

      {/* Ramp with ball in corner (topic-specific!) */}
      <div className="absolute bottom-20 right-8 opacity-35">
        <svg width="70" height="60" viewBox="0 0 70 60">
          {/* Ramp */}
          <path d="M5 55 L60 55 L60 50 L20 50 L20 15 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5"/>
          {/* Ball on ramp */}
          <circle cx="30" cy="38" r="6" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5"/>
          {/* Motion arrows */}
          <path d="M40 38 L52 38" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M52 38 L48 35 L48 41 Z" fill="#3B82F6"/>
          {/* Ground line */}
          <line x1="5" y1="55" x2="65" y2="55" stroke="#64748B" strokeWidth="2"/>
        </svg>
      </div>

      {/* Sun decoration (animated rotating) */}
      <motion.div className="absolute top-12 left-32 opacity-25" animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
        <svg width="50" height="50" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="12" fill="#FBBF24"/>
          <g stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
            <line x1="30" y1="8" x2="30" y2="14"/>
            <line x1="30" y1="46" x2="30" y2="52"/>
            <line x1="8" y1="30" x2="14" y2="30"/>
            <line x1="46" y1="30" x2="52" y2="30"/>
            <line x1="14" y1="14" x2="18" y2="18"/>
            <line x1="42" y1="42" x2="46" y2="46"/>
            <line x1="46" y1="14" x2="42" y2="18"/>
            <line x1="14" y1="46" x2="18" y2="42"/>
          </g>
        </svg>
      </motion.div>

      {/* Floating magnet */}
      <motion.div className="absolute top-16 right-28 opacity-20" animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="35" height="30" viewBox="0 0 40 35">
          <path d="M8 5 L8 20 C8 28, 14 30, 20 30 C26 30, 32 28, 32 20 L32 5" fill="none" stroke="#EF4444" strokeWidth="5" strokeLinecap="round"/>
          <rect x="6" y="2" width="6" height="5" fill="#3B82F6" stroke="#1E40AF" strokeWidth="0.5"/>
          <rect x="28" y="2" width="6" height="5" fill="#EF4444" stroke="#991B1B" strokeWidth="0.5"/>
        </svg>
      </motion.div>

      {/* Floor with grass and ruler pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(180deg, #D1FAE5 0%, #A7F3D0 100%)', borderTop: '2px solid #6EE7B7' }}>
        <svg className="w-full h-full opacity-25" preserveAspectRatio="none" viewBox="0 0 720 64">
          <pattern id="physics-floor" x="0" y="0" width="30" height="20" patternUnits="userSpaceOnUse">
            <path d="M5 20 L5 12 M10 20 L10 8 M15 20 L15 14 M20 20 L20 10 M25 20 L25 16" stroke="#10B981" strokeWidth="1" fill="none"/>
            <line x1="0" y1="20" x2="30" y2="20" stroke="#F59E0B" strokeWidth="0.5"/>
          </pattern>
          <rect width="720" height="64" fill="url(#physics-floor)"/>
        </svg>
      </div>
    </div>);
}
// ─── Topic-Specific SVG Components ────────────────────────────
function SunIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="phy-sun-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FEF3C7"/>
          <stop offset="60%" stopColor="#FBBF24"/>
          <stop offset="100%" stopColor="#D97706"/>
        </radialGradient>
      </defs>
      <circle cx="30" cy="30" r="12" fill="url(#phy-sun-grad)" stroke="#F59E0B" strokeWidth="2"/>
      {/* Sun shine */}
      <ellipse cx="26" cy="26" rx="3" ry="4" fill="white" opacity="0.3"/>
      <g stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
        <line x1="30" y1="6" x2="30" y2="14"/>
        <line x1="30" y1="46" x2="30" y2="54"/>
        <line x1="6" y1="30" x2="14" y2="30"/>
        <line x1="46" y1="30" x2="54" y2="30"/>
        <line x1="13" y1="13" x2="18" y2="18"/>
        <line x1="42" y1="42" x2="47" y2="47"/>
        <line x1="47" y1="13" x2="42" y2="18"/>
        <line x1="13" y1="47" x2="18" y2="42"/>
      </g>
    </svg>);
}
function MagnetIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 15 L15 35 C15 45, 25 50, 30 50 C35 50, 45 45, 45 35 L45 15" fill="none" stroke="#EF4444" strokeWidth="6" strokeLinecap="round"/>
      <rect x="12" y="10" width="9" height="8" fill="#3B82F6" stroke="#1E40AF" strokeWidth="1"/>
      <rect x="39" y="10" width="9" height="8" fill="#EF4444" stroke="#991B1B" strokeWidth="1"/>
      <text x="16" y="16" fontSize="5" fill="white" fontWeight="bold" textAnchor="middle">N</text>
      <text x="43" y="16" fontSize="5" fill="white" fontWeight="bold" textAnchor="middle">S</text>
    </svg>);
}
function EarthIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="phy-earth-grad" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#60A5FA"/>
          <stop offset="60%" stopColor="#3B82F6"/>
          <stop offset="100%" stopColor="#1E40AF"/>
        </radialGradient>
        <radialGradient id="phy-earth-shine" cx="0.3" cy="0.3" r="0.4">
          <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="30" cy="30" r="22" fill="url(#phy-earth-grad)" stroke="#1E40AF" strokeWidth="2"/>
      <path d="M12 25 C18 20, 25 22, 28 28 C32 34, 40 32, 45 28 C48 25, 50 30, 48 35 C44 42, 35 45, 28 42 C20 38, 14 35, 12 25 Z" fill="#10B981" stroke="#059669" strokeWidth="1.5"/>
      <circle cx="30" cy="30" r="22" fill="url(#phy-earth-shine)"/>
    </svg>);
}
function CompassIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="white" stroke="#64748B" strokeWidth="2"/>
      <circle cx="30" cy="30" r="20" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1"/>
      {/* Needle */}
      <path d="M30 8 L34 30 L30 27 L26 30 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1"/>
      <path d="M30 52 L26 30 L30 33 L34 30 Z" fill="#334155" stroke="#1E293B" strokeWidth="1"/>
      {/* Directions */}
      <text x="30" y="6" fontSize="6" fill="#1E293B" textAnchor="middle" fontWeight="bold">N</text>
      <text x="30" y="57" fontSize="6" fill="#1E293B" textAnchor="middle" fontWeight="bold">S</text>
      <text x="54" y="33" fontSize="6" fill="#1E293B" textAnchor="middle" fontWeight="bold">E</text>
      <text x="6" y="33" fontSize="6" fill="#1E293B" textAnchor="middle" fontWeight="bold">W</text>
      <circle cx="30" cy="30" r="2" fill="#1E293B"/>
    </svg>);
}
function ShadowIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Sun */}
      <circle cx="48" cy="12" r="6" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5"/>
      {/* Object (tree) */}
      <rect x="22" y="20" width="4" height="20" fill="#92400E"/>
      <circle cx="24" cy="18" r="10" fill="#10B981" stroke="#059669" strokeWidth="1.5"/>
      {/* Shadow on ground */}
      <ellipse cx="14" cy="45" rx="14" ry="3" fill="#1E293B" opacity="0.35"/>
      {/* Light rays */}
      <line x1="44" y1="15" x2="28" y2="22" stroke="#FBBF24" strokeWidth="1" opacity="0.5" strokeDasharray="2,2"/>
      <line x1="46" y1="18" x2="20" y2="35" stroke="#FBBF24" strokeWidth="1" opacity="0.5" strokeDasharray="2,2"/>
    </svg>);
}
function SoundWaveIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Speaker */}
      <rect x="5" y="22" width="10" height="16" rx="2" fill="#475569" stroke="#334155" strokeWidth="1.5"/>
      <path d="M15 22 L25 15 L25 45 L15 38 Z" fill="#64748B" stroke="#334155" strokeWidth="1.5"/>
      {/* Sound waves */}
      <path d="M30 20 Q34 30, 30 40" stroke="#0EA5E9" strokeWidth="2" fill="none"/>
      <path d="M37 15 Q43 30, 37 45" stroke="#0EA5E9" strokeWidth="2" fill="none" opacity="0.7"/>
      <path d="M44 10 Q52 30, 44 50" stroke="#0EA5E9" strokeWidth="2" fill="none" opacity="0.5"/>
    </svg>);
}
function ForceArrowIcon({ size = 50, direction = 'right' }: { size?: number; direction?: string }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {direction === 'right' ? (
        <>
          <line x1="8" y1="30" x2="45" y2="30" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
          <path d="M45 30 L38 24 L38 36 Z" fill="#EF4444"/>
          <text x="25" y="20" fontSize="8" fill="#EF4444" textAnchor="middle" fontWeight="bold">PUSH</text>
        </>
      ) : (
        <>
          <line x1="15" y1="30" x2="52" y2="30" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
          <path d="M15 30 L22 24 L22 36 Z" fill="#3B82F6"/>
          <text x="35" y="20" fontSize="8" fill="#3B82F6" textAnchor="middle" fontWeight="bold">PULL</text>
        </>
      )}
    </svg>);
}
// ─── Sort Card Component ──────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('sun') || id.includes('light'))
        return <SunIcon size={size}/>;
    if (id.includes('lamp'))
        return <div className="text-4xl">💡</div>;
    if (id.includes('wall'))
        return <div className="text-4xl">🧱</div>;
    if (id.includes('tree'))
        return <div className="text-4xl">🌳</div>;
    if (id.includes('nail') || id.includes('key') || id.includes('attract'))
        return <MagnetIcon size={size}/>;
    if (id.includes('coin'))
        return <div className="text-4xl">🪙</div>;
    if (id.includes('plastic'))
        return <div className="text-4xl">🧸</div>;
    if (id.includes('kick'))
        return <div className="text-4xl">⚽</div>;
    if (id.includes('drawer'))
        return <div className="text-4xl">📦</div>;
    if (id.includes('cart'))
        return <div className="text-4xl">🛒</div>;
    if (id.includes('tug'))
        return <div className="text-4xl">🪢</div>;
    if (id.includes('push'))
        return <div className="text-4xl">⬇️</div>;
    if (id.includes('pull'))
        return <div className="text-4xl">⬆️</div>;
    if (id.includes('block'))
        return <div className="text-4xl">🌑</div>;
    if (id.includes('noattract'))
        return <div className="text-4xl">❌</div>;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2 border-2 border-orange-200`} style={{ width: 110, height: 95 }}>
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
      <ScienceParkBackground width={width} height={height}/>
      <PipPanda mood="happy" speaking={null}/>

      {/* Header */}
      <div className="z-10 flex flex-col items-center mt-2">
        <h1 className="text-2xl font-black text-orange-600 drop-shadow">Pip's Physics Discovery Park</h1>
        <p className="text-sm font-bold text-gray-600">Physics Foundations - CISCE Discovery</p>
      </div>

      {/* Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className={`z-10 w-full max-w-lg rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${current.bgColor} text-white flex flex-col items-center text-center my-auto`}>
        <span className="text-6xl mb-3">{current.emoji}</span>
        <h2 className="text-2xl font-black mb-3">{current.title}</h2>
        <p className="text-lg font-medium leading-relaxed">{current.text}</p>
        {/* Slide-specific visuals */}
        {slide === 0 && <div className="mt-3 flex gap-2 opacity-80"><ForceArrowIcon size={40} direction="right"/><ForceArrowIcon size={40} direction="left"/></div>}
        {slide === 1 && <div className="mt-3 opacity-80"><ShadowIcon size={60}/></div>}
        {slide === 2 && <div className="mt-3 opacity-80"><EarthIcon size={50}/></div>}
        {slide === 3 && <div className="mt-3 opacity-80"><CompassIcon size={50}/></div>}
        {slide === 4 && <div className="mt-3 opacity-80"><SoundWaveIcon size={50}/></div>}
      </motion.div>

      {/* Navigation Footer */}
      <div className="z-10 w-full max-w-lg flex items-center justify-between pb-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-4 py-2 rounded-xl font-bold shadow ${slide === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-orange-600 hover:bg-orange-50'}`}>
          ⬅️ Back
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-orange-600 w-6' : 'bg-white/60'}`}/>))}
        </div>

        <button onClick={handleNext} className="px-6 py-2 rounded-xl font-bold bg-orange-600 text-white shadow-lg hover:bg-orange-700 flex items-center gap-1">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>);
}
// ─── Main Game Component ─────────────────────────────────────
export interface PhysicsWorldSimProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
export function PhysicsWorldSim({ width = 720, height = 560, onComplete }: PhysicsWorldSimProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showSparkle, setShowSparkle] = useState(false);
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Pip the Panda. Let us explore physics!');
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
    return (<div className="relative flex flex-col select-none overflow-hidden bg-amber-100 rounded-3xl shadow-2xl" style={{ width, height }}>
      <ScienceParkBackground width={width} height={height}/>
      <PipPanda mood={mascotMood} speaking={mascotSpeech}/>

      {screen === 'teaching' ? (<TeachingScreen onStart={() => { setScreen('play'); audioManager.play('tap'); }} width={width} height={height}/>) : gameOver ? (
        /* Completion Screen */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-30 bg-white/95">
          <Confetti onComplete={() => { }}/>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-center">
            <span className="text-7xl mb-3">🏆</span>
            <h1 className="text-3xl font-black text-orange-600 mb-2">Physics Explorer Badge Earned!</h1>
            <p className="text-lg font-bold text-gray-700 mb-4">You successfully completed Pip's physics challenges!</p>
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
            }} className="px-6 py-3 bg-orange-600 text-white font-black rounded-2xl shadow-xl hover:bg-orange-700">
              Play Again 🔄
            </button>
          </motion.div>
        </div>) : (
        /* Play Screen */
        <div className="relative flex flex-col justify-between h-full p-4 z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-orange-600 bg-orange-100 px-3 py-1 rounded-xl shadow">
                Challenge {currentIdx + 1} of {CHALLENGES.length}
              </span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length}/>
          </div>

          {/* Question Box */}
          <div className="my-2 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border-2 border-orange-200 text-center max-w-xl mx-auto w-full">
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
                {challenge.options.map((option) => (<motion.button key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(option)} className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-xl border-3 border-orange-300 hover:border-orange-500 font-extrabold text-gray-800 text-base">
                    {option === 'Pull' ? <ForceArrowIcon size={45} direction="left"/> :
                        option === 'Push' ? <ForceArrowIcon size={45} direction="right"/> :
                            option === 'Twist' ? <div className="text-4xl mb-1">�</div> :
                                option === 'Morning and Evening' ? <ShadowIcon size={45}/> :
                                    option === 'Noon' ? <SunIcon size={45}/> :
                                        option === 'Midnight' ? <div className="text-4xl mb-1">🌙</div> :
                                            option === 'Earth rotates on its axis' ? <EarthIcon size={45}/> :
                                                option === 'The Sun moves around Earth' ? <div className="text-4xl mb-1">☀️</div> :
                                                    option === 'The Moon blocks the Sun' ? <div className="text-4xl mb-1">🌑</div> :
                                                        option === 'Vacuum (empty space)' ? <div className="text-4xl mb-1">🌌</div> :
                                                            option === 'Air' ? <div className="text-4xl mb-1">💨</div> :
                                                                option === 'Water' ? <div className="text-4xl mb-1">💧</div> :
                                                                    option === '24 hours' ? <div className="text-4xl mb-1">🕐</div> :
                                                                        option === '1 hour' ? <div className="text-4xl mb-1">⏰</div> :
                                                                            option === '365 days' ? <div className="text-4xl mb-1">📅</div> :
                                                                                <div className="text-3xl mb-1">🔬</div>}
                    <span className="mt-2">{option}</span>
                  </motion.button>))}
              </div>)}
          </div>

          {/* Footer status */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-2">
            <span>Errors: {errors}</span>
            <span>Pip's Physics Discovery Park 🔬</span>
          </div>
        </div>)}
    </div>);
}
export default PhysicsWorldSim;
