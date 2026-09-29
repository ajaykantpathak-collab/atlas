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

// ─── SVG ICON COMPONENTS (Topic Specific) ─────────────────────

function EmailIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="14" width="48" height="32" rx="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M6 18 L30 34 L54 18" fill="none" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="27" r="5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
    </svg>
  );
}

function SearchEngineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="14" width="48" height="32" rx="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
      <circle cx="26" cy="28" r="9" fill="none" stroke="#2563EB" strokeWidth="3" />
      <line x1="33" y1="35" x2="44" y2="46" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 20 L20 20" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ShoppingCartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 16 H16 L22 36 H46 L50 20 H18" fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="44" r="4" fill="#475569" />
      <circle cx="42" cy="44" r="4" fill="#475569" />
      <rect x="28" y="24" width="14" height="10" fill="#F472B6" rx="2" />
    </svg>
  );
}

function ELearningIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="20" width="40" height="26" rx="4" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <polygon points="30,8 52,18 30,28 8,18" fill="#059669" />
      <line x1="44" y1="21" x2="44" y2="34" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      <circle cx="44" cy="35" r="2" fill="#FBBF24" />
      <rect x="16" y="26" width="16" height="3" fill="white" rx="1" />
      <rect x="16" y="32" width="12" height="3" fill="white" rx="1" />
    </svg>
  );
}

function CloudStorageIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 40 H44 C48.4 40 52 36.4 52 32 C52 28.1 49.2 24.8 45.4 24.2 C44.2 17.5 38.5 12.5 31.5 12.5 C26.3 12.5 21.8 15.5 19.6 19.9 C14.4 20.5 10.5 24.9 10.5 30.2 C10.5 35.6 14.9 40 16 40 Z" fill="#0EA5E9" stroke="#0284C7" strokeWidth="2" />
      <polyline points="24,30 30,24 36,30" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="30" y1="24" x2="30" y2="36" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function AttachmentIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 38 L38 22 C41.3 18.7 46.7 18.7 50 22 C53.3 25.3 53.3 30.7 50 34 L30 54 C24.5 59.5 15.5 59.5 10 54 C4.5 48.5 4.5 39.5 10 34 L30 14 C34.1 9.9 40.9 9.9 45 14 C49.1 18.1 49.1 24.9 45 29 L27 47" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PasswordIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="14" y="24" width="32" height="26" rx="4" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />
      <path d="M20 24 V16 C20 10.5 24.5 6 30 6 C35.5 6 40 10.5 40 16 V24" fill="none" stroke="#6D28D9" strokeWidth="4" strokeLinecap="round" />
      <circle cx="30" cy="35" r="3" fill="#FEF08A" />
      <path d="M30 38 V44" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CyberShieldIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 6 L50 14 V30 C50 42 39 51 30 54 C21 51 10 42 10 30 V14 L30 6 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <polyline points="20,30 27,37 40,22" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogoTurtleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="14" ry="18" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <circle cx="30" cy="12" r="7" fill="#34D399" stroke="#047857" strokeWidth="2" />
      <ellipse cx="14" cy="24" rx="4" ry="7" fill="#059669" transform="rotate(-30 14 24)" />
      <ellipse cx="46" cy="24" rx="4" ry="7" fill="#059669" transform="rotate(30 46 24)" />
      <ellipse cx="16" cy="42" rx="4" ry="7" fill="#059669" transform="rotate(20 16 42)" />
      <ellipse cx="44" cy="42" rx="4" ry="7" fill="#059669" transform="rotate(-20 44 42)" />
    </svg>
  );
}

function SquareShapeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="12" width="36" height="36" fill="none" stroke="#3B82F6" strokeWidth="4" rx="2" />
      <circle cx="12" cy="12" r="4" fill="#EF4444" />
    </svg>
  );
}

function TriangleShapeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,10 52,48 8,48" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="30" cy="10" r="4" fill="#EF4444" />
    </svg>
  );
}

function PolygonShapeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,8 50,22 42,48 18,48 10,22" fill="none" stroke="#8B5CF6" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="30" cy="8" r="4" fill="#EF4444" />
    </svg>
  );
}

// ─── RENDER SORT ICON MAPPING ────────────────────────────────���

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'email': return <EmailIcon size={size} />;
    case 'search': return <SearchEngineIcon size={size} />;
    case 'shopping': return <ShoppingCartIcon size={size} />;
    case 'elearning': return <ELearningIcon size={size} />;
    case 'cloud': return <CloudStorageIcon size={size} />;
    case 'attachment': return <AttachmentIcon size={size} />;
    case 'password': return <PasswordIcon size={size} />;
    case 'cybershield': return <CyberShieldIcon size={size} />;
    case 'turtle': return <LogoTurtleIcon size={size} />;
    case 'square': return <SquareShapeIcon size={size} />;
    case 'triangle': return <TriangleShapeIcon size={size} />;
    case 'polygon': return <PolygonShapeIcon size={size} />;
    default: return <EmailIcon size={size} />;
  }
}

// ─── INTERNET & LOGO SCENE BACKGROUND ─────────────────────────

function InternetSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="cyber-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="60%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <radialGradient id="cyber-glow" cx="0.5" cy="0.3" r="0.6">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#cyber-sky)" />
        <rect width={width} height={height} fill="url(#cyber-glow)" />
        {/* Network grid lines */}
        <line x1="0" y1="120" x2={width} y2="120" stroke="#38BDF8" strokeWidth="0.8" opacity="0.25" />
        <line x1="0" y1="240" x2={width} y2="240" stroke="#38BDF8" strokeWidth="0.8" opacity="0.25" />
        <line x1="0" y1="360" x2={width} y2="360" stroke="#38BDF8" strokeWidth="0.8" opacity="0.25" />
        <line x1="150" y1="0" x2="150" y2={height} stroke="#818CF8" strokeWidth="0.8" opacity="0.2" />
        <line x1="450" y1="0" x2="450" y2={height} stroke="#818CF8" strokeWidth="0.8" opacity="0.2" />
        {/* Floating digital nodes */}
        <circle cx="80" cy="70" r="4" fill="#38BDF8" opacity="0.7" />
        <circle cx="280" cy="90" r="5" fill="#C084FC" opacity="0.6" />
        <circle cx="580" cy="70" r="4" fill="#34D399" opacity="0.7" />
        <line x1="80" y1="70" x2="280" y2="90" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
        <line x1="280" y1="90" x2="580" y2="70" stroke="#C084FC" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}

// ─── NAVIGATOR NIKHIL MASCOT ──────────────────────────────────

function NavigatorNikhil({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white/95 backdrop-blur rounded-xl px-3 py-2 shadow-xl max-w-[220px] border border-gold-200"
          >
            <p className="text-xs font-bold text-slate-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
              ? { y: [0, -4, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="nikhil-suit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <radialGradient id="nikhil-face" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#F97316" />
            </radialGradient>
          </defs>
          <ellipse cx="37.5" cy="22" rx="18" ry="12" fill="#1E293B" />
          <path d="M 19 22 Q 37.5 12 56 22 Z" fill="#3B82F6" />
          <circle cx="37.5" cy="35" r="15" fill="url(#nikhil-face)" stroke="#C2410C" strokeWidth="1" />
          <circle cx="32" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="43" cy="33" r="2.5" fill="#1E293B" />
          <path d="M 33 41 Q 37.5 45 42 41" stroke="#9A3412" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 22 50 L 53 50 L 58 78 L 17 78 Z" fill="url(#nikhil-suit)" stroke="#1E40AF" strokeWidth="1.5" />
          <circle cx="60" cy="65" r="8" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="55" y1="70" x2="48" y2="77" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="37.5" cy="62" r="5" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
          <polygon points="37.5,58 39,62 37.5,66 36,62" fill="white" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── STAR ROW ─────────────────────────────────────────────────

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

// ─── TEACHING SLIDES (5 Slides) ───────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Internet Services — Email & Search 📧",
    text: "Email lets you send and receive electronic messages instantly across the Internet! Search engines like Google help you find information on any topic instantly.",
    emoji: "📧",
    bgColor: "from-gold-600 to-gold-700",
    spoken: "Email lets you send and receive electronic messages instantly across the Internet! Search engines like Google help you find information on any topic instantly."
  },
  {
    title: "Online Shopping, E-Learning & Cloud 🛒",
    text: "Online shopping lets you buy goods from websites like Amazon and Flipkart. E-learning brings education home via BYJU's or DIKSHA. Cloud storage keeps files safe on remote servers!",
    emoji: "🛒",
    bgColor: "from-gold-600 to-purple-700",
    spoken: "Online shopping lets you buy goods from websites like Amazon and Flipkart. E-learning brings education home. Cloud storage keeps files safe on remote servers!"
  },
  {
    title: "Composing & Sending Emails ✉️",
    text: "To send an email, fill in the To address, write a clear Subject, type the body message, attach files if needed with the paperclip icon, and click Send! Received mail goes to your Inbox.",
    emoji: "✉️",
    bgColor: "from-purple-600 to-pink-700",
    spoken: "To send an email, fill in the To address, write a clear Subject, type the body message, attach files with the paperclip icon, and click Send!"
  },
  {
    title: "Internet Safety & Strong Passwords 🛡️",
    text: "Never share your full name, home address, phone number, or school name online. Use strong passwords with mixed letters and numbers, and never share them with anyone!",
    emoji: "🛡️",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Never share your full name, home address, phone number, or school name online. Use strong passwords with mixed letters and numbers, and never share them with anyone!"
  },
  {
    title: "LOGO REPEAT Command & Shapes 🐢",
    text: "The LOGO REPEAT command runs instructions multiple times! A square uses REPEAT 4 [FD 100 RT 90]. The turning angle for any regular polygon is 360 divided by the number of sides.",
    emoji: "🐢",
    bgColor: "from-gold-600 to-teal-700",
    spoken: "The LOGO REPEAT command runs instructions multiple times! A square uses REPEAT 4 [FD 100 RT 90]. The turning angle for any regular polygon is 360 divided by the number of sides."
  }
];

// ─── CHALLENGES (8 Progressive Challenges) ────────────────────

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
    question: "Which Internet service allows you to send and receive electronic messages almost instantly?",
    answer: "Email",
    options: [
      "Email",
      "Cloud storage",
      "Online shopping"
    ],
    hint: "Think: what electronic service replaced paper letters for fast messaging?",
    misconception: "Email is short for electronic mail, used for sending messages instantly over the Internet. Cloud storage is for saving files, and online shopping is for buying goods!"
  },
  {
    type: 'sort',
    question: "Drag each Internet service to its correct definition!",
    answer: "sort",
    options: [],
    hint: "Match Email to messaging, Search to finding info, Shopping to buying goods, E-learning to studying online, and Cloud to saving files!",
    misconception: "Remember each Internet service has a specific job: Email sends messages, Search finds info, Online shopping buys products, E-learning teaches online, and Cloud storage saves files on remote servers.",
    sortItems: [
      { id: 's1', label: 'Email', icon: 'email', correctBin: 'bin-email' },
      { id: 's2', label: 'Search Engine', icon: 'search', correctBin: 'bin-search' },
      { id: 's3', label: 'Online Shopping', icon: 'shopping', correctBin: 'bin-shopping' },
      { id: 's4', label: 'E-Learning', icon: 'elearning', correctBin: 'bin-elearning' }
    ],
    bins: [
      { id: 'bin-email', label: 'Send Messages 📧', color: '#3B82F6' },
      { id: 'bin-search', label: 'Find Info 🔍', color: '#10B981' },
      { id: 'bin-shopping', label: 'Buy Goods 🛒', color: '#EC4899' },
      { id: 'bin-elearning', label: 'Study Online 🎓', color: '#8B5CF6' }
    ]
  },
  {
    type: 'identify',
    question: "What is an email ATTACHMENT?",
    answer: "A separate file like a picture or document sent along with an email message",
    options: [
      "A separate file like a picture or document sent along with an email message",
      "The email subject line title",
      "The recipient email address in the To field"
    ],
    hint: "Think: what do you attach using a paperclip icon when emailing a photo?",
    misconception: "An attachment is NOT the subject line or address! It is a separate file (like a photo or PDF worksheet) that travels alongside your email message."
  },
  {
    type: 'sort',
    question: "Drag each email part to its correct description!",
    answer: "sort",
    options: [],
    hint: "Match To to recipient address, Subject to title, Body to message text, and Attachment to file!",
    misconception: "Remember: The To field holds the recipient address, Subject is the short title, Body is the main message text, and Attachment is the extra file sent with the email.",
    sortItems: [
      { id: 'e1', label: 'To Field', icon: 'email', correctBin: 'bin-to' },
      { id: 'e2', label: 'Subject Line', icon: 'search', correctBin: 'bin-subject' },
      { id: 'e3', label: 'Email Body', icon: 'elearning', correctBin: 'bin-body' },
      { id: 'e4', label: 'Attachment', icon: 'attachment', correctBin: 'bin-att' }
    ],
    bins: [
      { id: 'bin-to', label: 'Recipient Address ✉️', color: '#3B82F6' },
      { id: 'bin-subject', label: 'Short Title 🏷️', color: '#F59E0B' },
      { id: 'bin-body', label: 'Main Message 📝', color: '#10B981' },
      { id: 'bin-att', label: 'Attached File 📎', color: '#8B5CF6' }
    ]
  },
  {
    type: 'identify',
    question: "Which of these is a safe Internet practice?",
    answer: "Use strong passwords with mixed letters and numbers and keep them secret",
    options: [
      "Use strong passwords with mixed letters and numbers and keep them secret",
      "Share your home address and phone number with online strangers",
      "Write your password on a paper on your desk for everyone to see"
    ],
    hint: "Think: should you share personal details or keep passwords secure?",
    misconception: "Sharing personal information or writing passwords where others can see them is unsafe! Always use strong passwords with mixed letters and numbers and keep them completely secret."
  },
  {
    type: 'sort',
    question: "Sort these practices into Safe or Unsafe Internet habits!",
    answer: "sort",
    options: [],
    hint: "Strong passwords and asking adults are Safe. Sharing addresses and passwords are Unsafe!",
    misconception: "Remember: Using strong passwords and keeping personal details private are safe habits. Sharing passwords or giving your home address to strangers online are major cyber safety risks.",
    sortItems: [
      { id: 'h1', label: 'Strong Password', icon: 'password', correctBin: 'bin-safe' },
      { id: 'h2', label: 'Sharing Address', icon: 'cybershield', correctBin: 'bin-unsafe' },
      { id: 'h3', label: 'Different Passwords', icon: 'password', correctBin: 'bin-safe' },
      { id: 'h4', label: 'Sharing Password', icon: 'cybershield', correctBin: 'bin-unsafe' }
    ],
    bins: [
      { id: 'bin-safe', label: 'Safe Habit ✅', color: '#10B981' },
      { id: 'bin-unsafe', label: 'Unsafe Habit ❌', color: '#EF4444' }
    ]
  },
  {
    type: 'identify',
    question: "In LOGO programming, what does the REPEAT command do?",
    answer: "Runs a set of commands inside brackets multiple times without rewriting them",
    options: [
      "Runs a set of commands inside brackets multiple times without rewriting them",
      "Deletes all turtle drawings from the screen",
      "Saves the computer program file to cloud storage"
    ],
    hint: "Think: what does 'repeat' mean in daily life when doing an action over and over?",
    misconception: "The REPEAT command does NOT delete drawings or save files! It is a loop construct that executes a block of commands multiple times efficiently."
  },
  {
    type: 'sort',
    question: "Drag each LOGO REPEAT command to the shape it draws!",
    answer: "sort",
    options: [],
    hint: "Square is REPEAT 4, Triangle is REPEAT 3, Hexagon is REPEAT 6, and Circle is REPEAT 360!",
    misconception: "Remember the 360 divided by sides rule: Square has 4 sides (90° turn), Triangle has 3 sides (120° turn), Hexagon has 6 sides (60° turn), and Circle uses 360 tiny steps!",
    sortItems: [
      { id: 'l1', label: 'Square (4 sides)', icon: 'square', correctBin: 'bin-sq' },
      { id: 'l2', label: 'Triangle (3 sides)', icon: 'triangle', correctBin: 'bin-tri' },
      { id: 'l3', label: 'Hexagon (6 sides)', icon: 'polygon', correctBin: 'bin-hex' },
      { id: 'l4', label: 'Circle (Smooth curve)', icon: 'turtle', correctBin: 'bin-cir' }
    ],
    bins: [
      { id: 'bin-sq', label: 'REPEAT 4 [FD 100 RT 90]', color: '#3B82F6' },
      { id: 'bin-tri', label: 'REPEAT 3 [FD 100 RT 120]', color: '#F59E0B' },
      { id: 'bin-hex', label: 'REPEAT 6 [FD 100 RT 60]', color: '#8B5CF6' },
      { id: 'bin-cir', label: 'REPEAT 360 [FD 1 RT 1]', color: '#10B981' }
    ]
  }
];

// ─── SORT CARD & BIN COMPONENTS ───────────────────────────────

interface SortCardProps {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}

function SortCard({ id, label, icon, x, y, placed, onDragStart, onDragEnd }: SortCardProps) {
  return (
    <Draggable
      id={id}
      x={x}
      y={y}
      draggable={!placed}
      placed={placed}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      width={110}
      height={90}
    >
      <div
        className="flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-amber-300 bg-white cursor-grab active:cursor-grabbing select-none transition-transform hover:scale-105"
        style={{ width: 110, height: 90 }}
      >
        {renderSortIcon(icon, 38)}
        <span className="text-[10px] font-bold text-slate-700 text-center mt-1 px-1 line-clamp-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────

export interface InternetLogoGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function InternetLogoGame({ width = 720, height = 560, onComplete }: InternetLogoGameProps) {
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
      const count = currentChallenge.sortItems.length;
      const startX = Math.max(20, (width - count * 120) / 2);
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: startX + idx * 125, y: height - 130 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, width]);

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
      const compMsg = "Wonderful! You are a brilliant Internet and LOGO expert!";
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

    // Find bin under drop coordinate (x, y)
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach(bin => {
      const el = document.getElementById(bin.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (
          x >= rect.left - 30 &&
          x <= rect.right + 30 &&
          y >= rect.top - 30 &&
          y <= rect.bottom + 30
        ) {
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
      className="relative select-none overflow-hidden font-sans rounded-3xl shadow-2xl border-4 border-gold-500 bg-slate-900"
      style={{ width, height }}
    >
      <InternetSceneBackground width={width} height={height} />
      <NavigatorNikhil mood={mascotMood} speaking={speakingText} />

      {/* TOP HEADER BAR */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900/80 backdrop-blur border-b border-gold-500/30 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gold-600 rounded-xl shadow-md text-white flex items-center justify-center">
            <LogoTurtleIcon size={24} />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-wide">Internet & LOGO Adventure</h1>
            <p className="text-[10px] font-medium text-gold-300">Class 5 • ICSE Computer Science</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-800/90 px-3 py-1.5 rounded-full border border-gold-500/40">
            <span className="text-xs font-bold text-yellow-400">Score: {score}</span>
          </div>
          {screen === 'play' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">
                Level {challengeIdx + 1}/{CHALLENGES.length}
              </span>
              <StarRow count={Math.min(challengeIdx, 8)} total={8} />
            </div>
          )}
        </div>
      </div>

      {/* TEACHING SCREEN */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 pb-6 px-8 flex flex-col justify-between z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            {TEACHING_SLIDES.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === slideIdx ? 'w-8 bg-gold-400' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex-1 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} p-8 shadow-2xl border border-white/20 flex flex-col items-center justify-center text-center text-white my-2`}
          >
            <div className="text-6xl mb-4 p-4 bg-white/10 rounded-2xl backdrop-blur">
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black mb-3 text-yellow-300 tracking-wide">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-sm md:text-base leading-relaxed max-w-lg font-medium text-slate-100">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
          </motion.div>

          <div className="flex justify-between items-center px-4">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg transition-all ${
                slideIdx === 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                  audioManager.play('success');
                }
              }}
              className="px-8 py-3 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl hover:from-emerald-400 hover:to-teal-500 transition-all transform hover:scale-105"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? "Start Challenges 🚀" : "Next ➡️"}
            </button>
          </div>
        </div>
      )}

      {/* PLAY SCREEN */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-20 pb-6 px-6 flex flex-col justify-between z-10">
          {/* QUESTION HEADER */}
          <div className="bg-slate-800/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-gold-500/40 flex items-center justify-between">
            <div className="flex items-center gap-3 max-w-xl">
              <div className="p-2 bg-gold-600/30 rounded-xl border border-gold-400/40">
                <SearchEngineIcon size={32} />
              </div>
              <h3 className="text-sm md:text-base font-bold text-white">
                {currentChallenge.question}
              </h3>
            </div>
            <button
              onClick={handleShowHint}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center gap-1"
            >
              💡 Hint
            </button>
          </div>

          {/* IDENTIFY CHALLENGE TYPE */}
          {currentChallenge.type === 'identify' && (
            <div className="grid grid-cols-1 gap-3 my-auto max-w-xl mx-auto w-full">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentChallenge.answer;
                let btnStyle = "bg-slate-800/90 border-slate-700 text-white hover:bg-slate-750";

                if (selectedOpt) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/50";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-900/50";
                  } else {
                    btnStyle = "bg-slate-800/40 border-slate-700/50 text-slate-500";
                  }
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                    whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                    onClick={e => !selectedOpt && handleAnswerClick(opt, e)}
                    disabled={selectedOpt !== null}
                    className={`p-4 rounded-2xl border-2 font-bold text-left text-sm md:text-base transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-black/30">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* SORT CHALLENGE TYPE */}
          {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
            <div className="flex-1 flex flex-col justify-around my-2">
              {/* BINS CONTAINER */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {currentChallenge.bins.map(bin => (
                  <div
                    key={bin.id}
                    id={bin.id}
                    className="h-28 rounded-2xl border-2 border-dashed border-gold-400/50 bg-slate-800/60 backdrop-blur p-3 flex flex-col items-center justify-center text-center shadow-lg transition-colors"
                  >
                    <span className="text-xs font-black text-gold-200">{bin.label}</span>
                    <span className="text-[10px] text-slate-400 mt-1">Drop item here</span>
                  </div>
                ))}
              </div>

              {/* DRAGGABLE CARDS */}
              <div className="relative h-28 w-full mt-4">
                {currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 0, y: 0 };
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
            </div>
          )}

          {/* CONTINUE BUTTON FOR SORT COMPLETION */}
          {currentChallenge.type === 'sort' &&
            currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={advanceChallenge}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold rounded-2xl shadow-xl hover:from-emerald-400 hover:to-teal-500 transition-all transform hover:scale-105"
                >
                  Continue 🚀
                </button>
              </div>
            )}

          {/* CONTINUE BUTTON FOR IDENTIFY CORRECT ANSWER */}
          {currentChallenge.type === 'identify' && selectedOpt === currentChallenge.answer && (
            <div className="flex justify-center mt-2">
              <button
                onClick={advanceChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold rounded-2xl shadow-xl hover:from-emerald-400 hover:to-teal-500 transition-all transform hover:scale-105"
              >
                Continue 🚀
              </button>
            </div>
          )}

          {/* RETRY BUTTON FOR IDENTIFY INCORRECT ANSWER */}
          {isIncorrect && (
            <div className="flex justify-center mt-2">
              <button
                onClick={() => {
                  setSelectedOpt(null);
                  setIsIncorrect(false);
                  setHintMsg(null);
                  setMascotMood('happy');
                }}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-lg transition-all"
              >
                Try Again 🔄
              </button>
            </div>
          )}
        </div>
      )}

      {/* FEEDBACK OVERLAYS */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
      )}
    </div>
  );
}

export default InternetLogoGame;
