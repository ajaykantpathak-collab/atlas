'use client';
/**
 * BodyGame - Learn about personal details, external body parts, and sense organs.
 *
 * CISCE Nodes: c1_bio_001 (Personal details), c1_bio_002 (External body parts), c1_bio_003 (Sense organs)
 * Enrichment: c1_biology_enrichment_part1-3
 *
 * ELI5: "You are a special person with a unique full name, birthday, and address.
 *   Your body has wonderful external parts like head, arms, legs, and face.
 *   You also have five special sense organs: eyes see, ears hear, nose smells,
 *   tongue tastes, and skin feels touch!"
 *
 * Misconceptions (from enrichment):
 *   1. "Eyes eat food" -> "No! Eyes are for seeing. We eat with our mouth!"
 *   2. "Elbow and knee are the same" -> "No! The elbow is in the arm, and the knee is in the leg!"
 *   3. "Hand is the part that joins the arm" -> "No! The wrist joins the hand to the arm!"
 *   4. "Nose can taste food" -> "No! The nose smells and the tongue tastes!"
 *   5. "Just say first name only" -> "No! Always say your full name with your surname!"
 *
 * Story: "Join Doctor Disha at the Health Discovery Clinic! Help her explore
 *   body parts, sort sense organs, and earn your Master Health Badge!"
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';
// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
    { title: 'Who Am I? 🌟', text: 'Every person has a unique identity! You have a full name (first name and surname), a parent\'s name, home address, phone number, and a special birthday date!', emoji: '🏷️', bgColor: 'from-pink-400 to-rose-500' },
    { title: 'External Body Parts 👤', text: 'External body parts are the parts we can see on the outside! We have a head, face, neck, chest, shoulders, arms, elbows, hands, fingers, legs, knees, and feet!', emoji: '👐', bgColor: 'from-gold-400 to-gold-500' },
    { title: 'Parts of the Face & Hand 👁️✋', text: 'Your face has eyes, nose, ears, mouth, and cheeks. Your hand has a palm, four fingers, a thumb, and a wrist that joins your hand to your arm!', emoji: '✋', bgColor: 'from-teal-400 to-gold-500' },
    { title: 'Five Special Sense Organs 👀👂', text: 'We have five special sense organs that help us know the world! Eyes see, ears hear, nose smells, tongue tastes, and skin feels touch!', emoji: '🧠', bgColor: 'from-purple-400 to-gold-500' },
    { title: 'Each Organ Has Its Own Job! 🛑', text: 'Each sense organ does only its own work! Eyes do not smell, nose does not taste, and ears do not see. Never confuse your body parts!', emoji: '⭐', bgColor: 'from-amber-400 to-orange-500' },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_use' | 'identify_source' | 'sort_uses' | 'sort_sources' | 'identify_habit' | 'sort_habits' | 'sort_body' | 'sort_senses';
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
        question: 'Which sense organ helps us SEE a bright red rose?',
        answer: 'Eyes',
        options: ['Eyes', 'Ears', 'Nose'],
        hint: 'Think: what do we use for sight and colours?',
        misconception: 'Eyes are for seeing! Ears are for hearing and nose is for smelling. Eyes do not eat or smell!',
    },
    {
        type: 'identify_use',
        question: 'Which sense organ helps us HEAR the music or a bell?',
        answer: 'Ears',
        options: ['Tongue', 'Ears', 'Skin'],
        hint: 'Think: where do sounds enter our head?',
        misconception: 'Ears are for hearing sounds! The tongue tastes and skin feels touch. Ears never see or taste!',
    },
    {
        type: 'identify_source',
        question: 'Where is the ELBOW located on the human body?',
        answer: 'On the arm',
        options: ['On the arm', 'On the leg', 'On the head'],
        hint: 'Think: does your elbow bend in your arm or your leg?',
        misconception: 'The elbow is the joint in the arm! The knee is the joint in the leg. Never mix up elbow and knee!',
    },
    {
        type: 'sort_body',
        question: 'Drag each body part to where it belongs!',
        answer: 'sort',
        options: [],
        hint: 'Eyes go on face, elbow goes on arm, knee goes on leg!',
        misconception: 'Make sure you put each part in the right place: face parts go on the face, arm joints on the arm, leg joints on the leg!',
        sortItems: [
            { id: 'eye', label: 'Eyes', emoji: '👀', correctBin: 'face' },
            { id: 'elbow', label: 'Elbow', emoji: '💪', correctBin: 'arm' },
            { id: 'knee', label: 'Knee', emoji: '🦵', correctBin: 'leg' },
        ],
        bins: [
            { id: 'face', label: 'Face 😃', color: '#EC4899' },
            { id: 'arm', label: 'Arm 💪', color: '#3B82F6' },
            { id: 'leg', label: 'Leg 🦵', color: '#10B981' },
        ],
    },
    {
        type: 'identify_habit',
        question: 'Which part joins the hand to the arm?',
        answer: 'Wrist',
        options: ['Wrist', 'Knee', 'Ankle'],
        hint: 'Think: what is the name of the connector right above your palm?',
        misconception: 'The wrist joins the hand to the arm! A knee is on the leg and an ankle is near the foot. Hand is not a single part - it has palm, fingers, thumb, and wrist!',
    },
    {
        type: 'identify_source',
        question: 'What does the TONGUE help us do?',
        answer: 'Taste food',
        options: ['Taste food', 'Hear music', 'Smell flowers'],
        hint: 'Think: when you eat a sweet mango, what part tells you it is sweet?',
        misconception: 'The tongue gives us the sense of taste! It tells us if food is sweet, sour, salty, or bitter. The tongue never hears or smells!',
    },
    {
        type: 'sort_senses',
        question: 'Drag each sense organ to its correct sense!',
        answer: 'sort',
        options: [],
        hint: 'Eyes see, ears hear, nose smells, tongue tastes, skin feels!',
        misconception: 'Each organ has its own special job! Eyes = Sight, Ears = Hearing, Nose = Smell, Tongue = Taste, Skin = Touch!',
        sortItems: [
            { id: 'eyes', label: 'Eyes', emoji: '👀', correctBin: 'sight' },
            { id: 'ears', label: 'Ears', emoji: '👂', correctBin: 'hearing' },
            { id: 'nose', label: 'Nose', emoji: '👃', correctBin: 'smell' },
            { id: 'tongue', label: 'Tongue', emoji: '👅', correctBin: 'taste' },
        ],
        bins: [
            { id: 'sight', label: 'Sight 👀', color: '#3B82F6' },
            { id: 'hearing', label: 'Hearing 👂', color: '#10B981' },
            { id: 'smell', label: 'Smell 👃', color: '#F59E0B' },
            { id: 'taste', label: 'Taste 👅', color: '#EC4899' },
        ],
    },
    {
        type: 'sort_habits',
        question: 'Is this statement CORRECT or WRONG?',
        answer: 'Wrong',
        options: ['Correct', 'Wrong'],
        hint: 'Statement: "Eyes eat food and nose helps us hear music."',
        misconception: 'This statement is completely wrong! Eyes see pictures, they do not eat food! Nose smells odours, ears hear music! Never mix up organ functions!',
    },
];
// ─── Doctor Disha Mascot (Female Doctor Mascot) ───────────────
function DoctorDisha({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-pink-300">
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
            <radialGradient id="disha-face-grad" cx="0.4" cy="0.3" r="0.7">
              <stop offset="0%" stopColor="#FFEFD5"/>
              <stop offset="60%" stopColor="#FFD1A9"/>
              <stop offset="100%" stopColor="#E0A96D"/>
            </radialGradient>
            <linearGradient id="disha-coat-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white"/>
              <stop offset="100%" stopColor="#F1F5F9"/>
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="40" cy="28" r="18" fill="url(#disha-face-grad)" stroke="#E0A96D" strokeWidth="1.5"/>
          {/* Hair */}
          <path d="M22 28 C22 15, 58 15, 58 28 C58 32, 55 35, 55 35 C55 35, 50 18, 40 18 C30 18, 25 35, 25 35 C25 35, 22 32, 22 28 Z" fill="#4A3525"/>
          {/* Doctor Head Mirror / Cap */}
          <ellipse cx="40" cy="14" rx="12" ry="4" fill="white" stroke="#CBD5E1" strokeWidth="1"/>
          <circle cx="40" cy="14" r="3" fill="#38BDF8"/>
          {/* Eyes */}
          <circle cx="33" cy="26" r="2.5" fill="#1E293B"/>
          <circle cx="47" cy="26" r="2.5" fill="#1E293B"/>
          <circle cx="34" cy="25" r="0.8" fill="white"/>
          <circle cx="48" cy="25" r="0.8" fill="white"/>
          {/* Rosy Cheeks */}
          <ellipse cx="30" cy="31" rx="3" ry="1.5" fill="#FDA4AF" opacity="0.8"/>
          <ellipse cx="50" cy="31" rx="3" ry="1.5" fill="#FDA4AF" opacity="0.8"/>
          {/* Smile */}
          <path d="M36 33 Q40 37 44 33" stroke="#E11D48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* White Lab Coat with gradient */}
          <path d="M24 45 L40 50 L56 45 L62 80 L18 80 Z" fill="url(#disha-coat-grad)" stroke="#CBD5E1" strokeWidth="1.5"/>
          {/* Coat lapel */}
          <path d="M35 46 L40 56 L45 46" stroke="#E2E8F0" strokeWidth="1.5" fill="none"/>
          {/* Stethoscope around neck + held in hand */}
          <path d="M33 46 Q28 55 30 62" stroke="#64748B" strokeWidth="2" fill="none"/>
          <path d="M47 46 Q52 55 50 62" stroke="#64748B" strokeWidth="2" fill="none"/>
          <path d="M30 62 Q35 68 40 65" stroke="#64748B" strokeWidth="2" fill="none"/>
          <path d="M50 62 Q45 68 40 65" stroke="#64748B" strokeWidth="2" fill="none"/>
          {/* Stethoscope chest piece held in left hand */}
          <circle cx="28" cy="68" r="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5"/>
          <circle cx="28" cy="68" r="2.5" fill="#0284C7"/>
          {/* Hand holding stethoscope */}
          <circle cx="28" cy="72" r="4" fill="url(#disha-face-grad)" stroke="#E0A96D" strokeWidth="1"/>
          {/* Red Cross Badge on coat */}
          <rect x="50" y="55" width="9" height="9" rx="2" fill="white" stroke="#EF4444" strokeWidth="1.5"/>
          <path d="M54.5 57 L54.5 62 M52 59.5 L57 59.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
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
// ─── Body Scene Background ────────────────────────────────────
function BodySceneBackground({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Layered clinic wall gradient (sky → wall → floor) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 30%, #F0FDF4 60%, #DCFCE7 100%)' }}/>

      {/* Clinic Wall Window */}
      <div className="absolute top-8 left-8 opacity-40">
        <svg width="100" height="80" viewBox="0 0 100 80">
          <rect x="3" y="3" width="94" height="74" rx="4" fill="white" stroke="#0284C7" strokeWidth="3"/>
          <line x1="50" y1="3" x2="50" y2="77" stroke="#0284C7" strokeWidth="2"/>
          <line x1="3" y1="40" x2="97" y2="40" stroke="#0284C7" strokeWidth="2"/>
          {/* Sky through window */}
          <rect x="6" y="6" width="41" height="31" fill="#7DD3FC" opacity="0.5"/>
          <rect x="53" y="6" width="41" height="31" fill="#7DD3FC" opacity="0.5"/>
          <rect x="6" y="43" width="41" height="31" fill="#BAE6FD" opacity="0.5"/>
          <rect x="53" y="43" width="41" height="31" fill="#BAE6FD" opacity="0.5"/>
          {/* Cloud through window */}
          <ellipse cx="25" cy="18" rx="8" ry="4" fill="white" opacity="0.6"/>
          <ellipse cx="70" cy="55" rx="10" ry="5" fill="white" opacity="0.6"/>
        </svg>
      </div>

      {/* Anatomy Poster on Wall (uses FullBodyDiagram!) */}
      <div className="absolute top-6 right-12 opacity-30">
        <svg width="90" height="120" viewBox="0 0 90 120">
          <rect x="3" y="3" width="84" height="114" rx="4" fill="white" stroke="#0284C7" strokeWidth="2"/>
          {/* Mini body diagram inside poster */}
          <circle cx="45" cy="22" r="10" fill="#FFD1A9" stroke="#E0A96D" strokeWidth="1"/>
          <circle cx="42" cy="21" r="1" fill="#1E293B"/>
          <circle cx="48" cy="21" r="1" fill="#1E293B"/>
          <path d="M42 25 Q45 27 48 25" stroke="#E11D48" strokeWidth="0.8" fill="none"/>
          <rect x="41" y="30" width="8" height="5" fill="#FFD1A9"/>
          <path d="M30 35 L60 35 L63 70 L27 70 Z" fill="#0EA5E9" stroke="#0284C7" strokeWidth="1"/>
          <path d="M37 45 C37 43, 40 41, 42 43 C44 41, 47 43, 47 45 C47 48, 42 52, 42 52 C42 52, 37 48, 37 45 Z" fill="#EF4444"/>
          <path d="M30 36 L24 55 L26 58" stroke="#FFD1A9" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M60 36 L66 55 L64 58" stroke="#FFD1A9" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M35 70 L33 95 L35 98" stroke="#1E40AF" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M55 70 L57 95 L55 98" stroke="#1E40AF" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <text x="45" y="115" fontSize="7" fill="#0284C7" textAnchor="middle" fontWeight="bold">ANATOMY</text>
        </svg>
      </div>

      {/* Exam Table in corner */}
      <div className="absolute bottom-20 left-6 opacity-35">
        <svg width="90" height="50" viewBox="0 0 90 50">
          {/* Table top */}
          <rect x="5" y="10" width="80" height="12" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2"/>
          {/* Padding */}
          <rect x="8" y="8" width="74" height="6" rx="3" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="1"/>
          {/* Legs */}
          <rect x="10" y="22" width="4" height="25" fill="#64748B"/>
          <rect x="76" y="22" width="4" height="25" fill="#64748B"/>
          {/* Paper roll at end */}
          <rect x="80" y="14" width="8" height="8" rx="2" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1"/>
        </svg>
      </div>

      {/* Medical Chart on wall */}
      <div className="absolute top-32 left-32 opacity-25">
        <svg width="60" height="50" viewBox="0 0 60 50">
          <rect x="2" y="2" width="56" height="46" rx="2" fill="white" stroke="#10B981" strokeWidth="1.5"/>
          <line x1="8" y1="12" x2="50" y2="12" stroke="#10B981" strokeWidth="0.8"/>
          <line x1="8" y1="20" x2="40" y2="20" stroke="#10B981" strokeWidth="0.8"/>
          <line x1="8" y1="28" x2="45" y2="28" stroke="#10B981" strokeWidth="0.8"/>
          <line x1="8" y1="36" x2="35" y2="36" stroke="#10B981" strokeWidth="0.8"/>
          {/* Heart symbol */}
          <path d="M48 38 C48 36, 50 35, 51 36 C52 35, 54 36, 54 38 C54 40, 51 42, 51 42 C51 42, 48 40, 48 38 Z" fill="#EF4444"/>
        </svg>
      </div>

      {/* Floating Heart Pulse Line */}
      <motion.div className="absolute top-20 left-44 opacity-25" animate={{ x: [0, 10, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="30" viewBox="0 0 80 30">
          <path d="M0 15 L15 15 L20 5 L25 25 L30 10 L35 20 L40 15 L80 15" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Floating Pill / Capsule */}
      <motion.div className="absolute bottom-24 right-12 opacity-30" animate={{ rotate: [0, 360], y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
        <svg width="40" height="20" viewBox="0 0 40 20">
          <rect x="2" y="2" width="36" height="16" rx="8" fill="#F43F5E" stroke="#E11D48" strokeWidth="1.5"/>
          <rect x="2" y="2" width="18" height="16" rx="8" fill="#FDA4AF"/>
          <line x1="20" y1="2" x2="20" y2="18" stroke="#E11D48" strokeWidth="1"/>
        </svg>
      </motion.div>

      {/* Floating Medical Cross */}
      <motion.div className="absolute top-36 right-32 opacity-20" animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 3, repeat: Infinity }}>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M8 2 L12 2 L12 8 L18 8 L18 12 L12 12 L12 18 L8 18 L8 12 L2 12 L2 8 L8 8 Z" fill="#10B981"/>
        </svg>
      </motion.div>

      {/* Floor with medical tile pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(180deg, #DCFCE7 0%, #BBF7D0 100%)', borderTop: '2px solid #86EFAC' }}>
        <svg className="w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 720 64">
          <pattern id="floor-tiles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none"/>
            <line x1="0" y1="0" x2="40" y2="0" stroke="#10B981" strokeWidth="0.5"/>
            <line x1="0" y1="0" x2="0" y2="40" stroke="#10B981" strokeWidth="0.5"/>
            <path d="M15 15 L25 15 L25 25 L15 25 Z" fill="none" stroke="#059669" strokeWidth="0.5"/>
          </pattern>
          <rect width="720" height="64" fill="url(#floor-tiles)"/>
        </svg>
      </div>
    </div>);
}
// ─── Topic-Specific SVG Components ────────────────────────────
function EyeIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="eye-iris-grad" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#7DD3FC"/>
          <stop offset="60%" stopColor="#0284C7"/>
          <stop offset="100%" stopColor="#075985"/>
        </radialGradient>
        <radialGradient id="eye-white-grad" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="white"/>
          <stop offset="80%" stopColor="#F0F9FF"/>
          <stop offset="100%" stopColor="#E0F2FE"/>
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="30" rx="24" ry="15" fill="url(#eye-white-grad)" stroke="#0284C7" strokeWidth="2.5"/>
      <circle cx="30" cy="30" r="9" fill="url(#eye-iris-grad)"/>
      <circle cx="30" cy="30" r="4" fill="#0F172A"/>
      <circle cx="27" cy="27" r="2.5" fill="white"/>
      {/* Eyelashes */}
      <path d="M10 25 L6 18 M20 18 L18 11 M30 16 L30 8 M40 18 L42 11 M50 25 L54 18" stroke="#0F172A" strokeWidth="2" strokeLinecap="round"/>
    </svg>);
}
function EarIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="ear-skin-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FFF7ED"/>
          <stop offset="60%" stopColor="#FED7AA"/>
          <stop offset="100%" stopColor="#C2410C"/>
        </radialGradient>
      </defs>
      <path d="M20 15 C10 15, 10 45, 25 48 C35 50, 45 40, 42 30 C40 22, 32 20, 32 28 C32 35, 38 38, 35 42 C30 45, 20 40, 20 28 Z" fill="url(#ear-skin-grad)" stroke="#C2410C" strokeWidth="2"/>
      <path d="M22 22 C18 25, 18 38, 25 42" stroke="#9A3412" strokeWidth="1.5" fill="none" opacity="0.5"/>
    </svg>);
}
function NoseIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C26 25, 22 42, 28 45 C34 48, 38 42, 38 42" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="25" cy="44" rx="3" ry="2" fill="#92400E"/>
      <ellipse cx="35" cy="44" rx="3" ry="2" fill="#92400E"/>
    </svg>);
}
function MouthIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <linearGradient id="mouth-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F87171"/>
          <stop offset="50%" stopColor="#EF4444"/>
          <stop offset="100%" stopColor="#B91C1C"/>
        </linearGradient>
      </defs>
      <path d="M15 25 Q30 45 45 25 Z" fill="url(#mouth-grad)" stroke="#B91C1C" strokeWidth="2"/>
      <path d="M15 25 Q30 32 45 25" fill="#FCA5A5"/>
      <path d="M22 28 Q30 36 38 28" fill="white"/>
      {/* Teeth row */}
      <rect x="20" y="25" width="4" height="5" rx="1" fill="white" stroke="#CBD5E1" strokeWidth="0.5"/>
      <rect x="25" y="25" width="4" height="5" rx="1" fill="white" stroke="#CBD5E1" strokeWidth="0.5"/>
      <rect x="30" y="25" width="4" height="5" rx="1" fill="white" stroke="#CBD5E1" strokeWidth="0.5"/>
      <rect x="35" y="25" width="4" height="5" rx="1" fill="white" stroke="#CBD5E1" strokeWidth="0.5"/>
    </svg>);
}
function HandIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="hand-skin-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FFF7ED"/>
          <stop offset="60%" stopColor="#FED7AA"/>
          <stop offset="100%" stopColor="#C2410C"/>
        </radialGradient>
      </defs>
      <rect x="20" y="30" width="20" height="20" rx="5" fill="url(#hand-skin-grad)" stroke="#C2410C" strokeWidth="2"/>
      {/* Fingers */}
      <rect x="18" y="15" width="4" height="18" rx="2" fill="#FED7AA" stroke="#C2410C" strokeWidth="1.5"/>
      <rect x="24" y="12" width="4" height="20" rx="2" fill="#FED7AA" stroke="#C2410C" strokeWidth="1.5"/>
      <rect x="30" y="12" width="4" height="20" rx="2" fill="#FED7AA" stroke="#C2410C" strokeWidth="1.5"/>
      <rect x="36" y="15" width="4" height="18" rx="2" fill="#FED7AA" stroke="#C2410C" strokeWidth="1.5"/>
      {/* Thumb */}
      <rect x="40" y="28" width="14" height="5" rx="2.5" fill="#FED7AA" stroke="#C2410C" strokeWidth="1.5"/>
    </svg>);
}
function TongueIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="tongue-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FCA5A5"/>
          <stop offset="60%" stopColor="#EF4444"/>
          <stop offset="100%" stopColor="#991B1B"/>
        </radialGradient>
      </defs>
      <path d="M15 20 C15 15, 25 10, 35 12 C45 14, 50 22, 48 30 C46 38, 38 42, 30 42 C22 42, 15 36, 15 28 Z" fill="url(#tongue-grad)" stroke="#B91C1C" strokeWidth="2"/>
      <path d="M20 25 C25 22, 35 22, 42 26" stroke="#F87171" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Taste buds */}
      <circle cx="25" cy="30" r="1.5" fill="#DC2626"/>
      <circle cx="35" cy="30" r="1.5" fill="#DC2626"/>
      <circle cx="30" cy="35" r="1.5" fill="#DC2626"/>
    </svg>);
}
function SkinIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="skin-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FFF7ED"/>
          <stop offset="60%" stopColor="#FED7AA"/>
          <stop offset="100%" stopColor="#C2410C"/>
        </radialGradient>
      </defs>
      {/* Fingerprint pattern */}
      <circle cx="30" cy="30" r="22" fill="url(#skin-grad)" stroke="#C2410C" strokeWidth="2"/>
      <path d="M18 30 C18 22, 24 18, 30 18 C36 18, 42 22, 42 30" stroke="#92400E" strokeWidth="1.5" fill="none"/>
      <path d="M20 34 C20 26, 25 22, 30 22 C35 22, 40 26, 40 34" stroke="#92400E" strokeWidth="1.5" fill="none"/>
      <path d="M22 38 C22 30, 26 26, 30 26 C34 26, 38 30, 38 38" stroke="#92400E" strokeWidth="1.5" fill="none"/>
      <path d="M24 42 C24 34, 27 30, 30 30 C33 30, 36 34, 36 42" stroke="#92400E" strokeWidth="1.5" fill="none"/>
    </svg>);
}
function FullBodyDiagram({ size = 120 }: {
    size?: number;
}) {
    return (<svg width={size} height={size * 1.5} viewBox="0 0 80 120">
      <defs>
        <radialGradient id="body-skin-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FFEFD5"/>
          <stop offset="60%" stopColor="#FFD1A9"/>
          <stop offset="100%" stopColor="#E0A96D"/>
        </radialGradient>
        <radialGradient id="body-heart-grad" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FCA5A5"/>
          <stop offset="60%" stopColor="#EF4444"/>
          <stop offset="100%" stopColor="#991B1B"/>
        </radialGradient>
      </defs>
      {/* Head */}
      <circle cx="40" cy="15" r="12" fill="url(#body-skin-grad)" stroke="#E0A96D" strokeWidth="1.5"/>
      {/* Eyes */}
      <circle cx="36" cy="14" r="1.5" fill="#1E293B"/>
      <circle cx="44" cy="14" r="1.5" fill="#1E293B"/>
      {/* Smile */}
      <path d="M36 18 Q40 21 44 18" stroke="#E11D48" strokeWidth="1" fill="none" strokeLinecap="round"/>
      {/* Neck */}
      <rect x="36" y="26" width="8" height="6" fill="#FFD1A9" stroke="#E0A96D" strokeWidth="1"/>
      {/* Body / Torso */}
      <path d="M25 32 L55 32 L58 60 L22 60 Z" fill="#0EA5E9" stroke="#0284C7" strokeWidth="1.5"/>
      {/* Heart (left side - correct anatomy!) */}
      <path d="M32 42 C32 39, 35 37, 37 39 C39 37, 42 39, 42 42 C42 46, 37 50, 37 50 C37 50, 32 46, 32 42 Z" fill="url(#body-heart-grad)" stroke="#B91C1C" strokeWidth="1"/>
      {/* Lungs */}
      <ellipse cx="30" cy="45" rx="4" ry="7" fill="#FECACA" stroke="#EF4444" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="50" cy="45" rx="4" ry="7" fill="#FECACA" stroke="#EF4444" strokeWidth="1" opacity="0.7"/>
      {/* Arms */}
      <path d="M25 34 L18 55 L20 58" stroke="#FFD1A9" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M55 34 L62 55 L60 58" stroke="#FFD1A9" strokeWidth="5" fill="none" strokeLinecap="round"/>
      {/* Hands */}
      <circle cx="19" cy="58" r="3" fill="#FFD1A9" stroke="#E0A96D" strokeWidth="1"/>
      <circle cx="61" cy="58" r="3" fill="#FFD1A9" stroke="#E0A96D" strokeWidth="1"/>
      {/* Legs */}
      <path d="M30 60 L28 95 L30 98" stroke="#1E40AF" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <path d="M50 60 L52 95 L50 98" stroke="#1E40AF" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Feet */}
      <ellipse cx="29" cy="100" rx="4" ry="3" fill="#334155"/>
      <ellipse cx="51" cy="100" rx="4" ry="3" fill="#334155"/>
      {/* Labels */}
      <text x="40" y="118" fontSize="6" fill="#0284C7" textAnchor="middle" fontWeight="bold">HUMAN BODY</text>
    </svg>);
}
// ─── Sort Card Component ──────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('eye'))
        return <EyeIcon size={size}/>;
    if (id.includes('sight'))
        return <EyeIcon size={size}/>;
    if (id.includes('ear'))
        return <EarIcon size={size}/>;
    if (id.includes('hearing'))
        return <EarIcon size={size}/>;
    if (id.includes('nose'))
        return <NoseIcon size={size}/>;
    if (id.includes('smell'))
        return <NoseIcon size={size}/>;
    if (id.includes('mouth'))
        return <MouthIcon size={size}/>;
    if (id.includes('tongue'))
        return <TongueIcon size={size}/>;
    if (id.includes('taste'))
        return <TongueIcon size={size}/>;
    if (id.includes('skin'))
        return <SkinIcon size={size}/>;
    if (id.includes('feel'))
        return <SkinIcon size={size}/>;
    if (id.includes('hand'))
        return <HandIcon size={size}/>;
    if (id.includes('arm'))
        return <HandIcon size={size}/>;
    if (id.includes('elbow'))
        return <HandIcon size={size}/>;
    if (id.includes('knee'))
        return <HandIcon size={size}/>;
    if (id.includes('leg'))
        return <HandIcon size={size}/>;
    if (id.includes('face'))
        return <EyeIcon size={size}/>;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2 border-2 border-gold-200`} style={{ width: 110, height: 95 }}>
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
      <BodySceneBackground width={width} height={height}/>
      <DoctorDisha mood="happy" speaking={null}/>

      {/* Header */}
      <div className="z-10 flex flex-col items-center mt-2">
        <h1 className="text-2xl font-black text-pink-600 drop-shadow">Doctor Disha's Health Clinic</h1>
        <p className="text-sm font-bold text-gray-600">Class 1 Biology - CISCE Discovery</p>
      </div>

      {/* Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className={`z-10 w-full max-w-lg rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${current.bgColor} text-white flex flex-col items-center text-center my-auto`}>
        <span className="text-6xl mb-3">{current.emoji}</span>
        <h2 className="text-2xl font-black mb-3">{current.title}</h2>
        <p className="text-lg font-medium leading-relaxed">{current.text}</p>
        {/* Slide-specific visual */}
        {slide === 1 && <div className="mt-3 opacity-80"><FullBodyDiagram size={80}/></div>}
        {slide === 3 && <div className="mt-3 flex gap-2 opacity-80"><EyeIcon size={36}/><EarIcon size={36}/><NoseIcon size={36}/><TongueIcon size={36}/><SkinIcon size={36}/></div>}
      </motion.div>

      {/* Navigation Footer */}
      <div className="z-10 w-full max-w-lg flex items-center justify-between pb-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-4 py-2 rounded-xl font-bold shadow ${slide === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-pink-600 hover:bg-pink-50'}`}>
          ⬅️ Back
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-pink-600 w-6' : 'bg-white/60'}`}/>))}
        </div>

        <button onClick={handleNext} className="px-6 py-2 rounded-xl font-bold bg-pink-600 text-white shadow-lg hover:bg-pink-700 flex items-center gap-1">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>);
}
// ─── Main Game Component ─────────────────────────────────────
export interface BodyGameProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
export function BodyGame({ width = 720, height = 560, onComplete }: BodyGameProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showSparkle, setShowSparkle] = useState(false);
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Doctor Disha. Let us learn about our body!');
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
            // Bin layout positions based on index
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
                // Check if all items placed
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
    return (<div className="relative flex flex-col select-none overflow-hidden bg-gold-100 rounded-3xl shadow-2xl" style={{ width, height }}>
      <BodySceneBackground width={width} height={height}/>
      <DoctorDisha mood={mascotMood} speaking={mascotSpeech}/>

      {screen === 'teaching' ? (<TeachingScreen onStart={() => { setScreen('play'); audioManager.play('tap'); }} width={width} height={height}/>) : gameOver ? (
        /* Completion Screen */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-30 bg-white/95">
          <Confetti onComplete={() => { }}/>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-center">
            <span className="text-7xl mb-3">🏆</span>
            <h1 className="text-3xl font-black text-pink-600 mb-2">Master Health Badge Earned!</h1>
            <p className="text-lg font-bold text-gray-700 mb-4">You successfully completed Doctor Disha's clinic challenges!</p>
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
            }} className="px-6 py-3 bg-pink-600 text-white font-black rounded-2xl shadow-xl hover:bg-pink-700">
              Play Again 🔄
            </button>
          </motion.div>
        </div>) : (
        /* Play Screen */
        <div className="relative flex flex-col justify-between h-full p-4 z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-pink-600 bg-pink-100 px-3 py-1 rounded-xl shadow">
                Challenge {currentIdx + 1} of {CHALLENGES.length}
              </span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length}/>
          </div>

          {/* Question Box */}
          <div className="my-2 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border-2 border-pink-200 text-center max-w-xl mx-auto w-full">
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
                {challenge.options.map((option) => (<motion.button key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(option)} className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-xl border-3 border-pink-300 hover:border-pink-500 font-extrabold text-gray-800 text-base">
                    {option === 'Eyes' ? <EyeIcon size={45}/> :
                        option === 'Ears' ? <EarIcon size={45}/> :
                            option === 'Nose' ? <NoseIcon size={45}/> :
                                option === 'Tongue' ? <TongueIcon size={45}/> :
                                    option === 'Skin' ? <SkinIcon size={45}/> :
                                        option === 'Wrist' ? <HandIcon size={45}/> :
                                            option === 'On the arm' ? <HandIcon size={45}/> :
                                                option === 'Taste food' ? <TongueIcon size={45}/> :
                                                    option === 'Correct' ? <div className="text-4xl mb-1">✅</div> :
                                                        option === 'Wrong' ? <div className="text-4xl mb-1">❌</div> :
                                                            <div className="text-3xl mb-1">🏥</div>}
                    <span className="mt-2">{option}</span>
                  </motion.button>))}
              </div>)}
          </div>

          {/* Footer status */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-2">
            <span>Errors: {errors}</span>
            <span>Doctor Disha's Health Clinic 🩺</span>
          </div>
        </div>)}
    </div>);
}
