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

function NetworkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="15" cy="15" r="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="45" cy="15" r="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="30" cy="45" r="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <line x1="21" y1="18" x2="39" y2="18" stroke="#93C5FD" strokeWidth="3" />
      <line x1="19" y1="21" x2="26" y2="39" stroke="#93C5FD" strokeWidth="3" />
      <line x1="41" y1="21" x2="34" y2="39" stroke="#93C5FD" strokeWidth="3" />
    </svg>
  );
}

function ISPIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="20" width="8" height="35" fill="#64748B" />
      <polygon points="30,5 20,20 40,20" fill="#EF4444" />
      <path d="M15 15 Q30 5 45 15" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M10 25 Q30 10 50 25" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="22" y="52" width="16" height="5" fill="#334155" rx="2" />
    </svg>
  );
}

function WWWIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="10" ry="24" fill="none" stroke="#E0F2FE" strokeWidth="2" />
      <line x1="6" y1="30" x2="54" y2="30" stroke="#E0F2FE" strokeWidth="2" />
      <line x1="10" y1="15" x2="50" y2="15" stroke="#E0F2FE" strokeWidth="1.5" />
      <line x1="10" y1="45" x2="50" y2="45" stroke="#E0F2FE" strokeWidth="1.5" />
    </svg>
  );
}

function URLIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="15" width="50" height="30" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" rx="6" />
      <text x="12" y="35" fill="#1E293B" fontSize="11" fontFamily="monospace" fontWeight="bold">www..</text>
      <circle cx="48" cy="30" r="5" fill="#10B981" />
    </svg>
  );
}

function HTTPIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="12" width="44" height="36" fill="#1E293B" rx="6" />
      <text x="13" y="36" fill="#38BDF8" fontSize="13" fontFamily="monospace" fontWeight="bold">HTTP</text>
      <rect x="42" y="24" width="6" height="12" fill="#22C55E" rx="2" />
    </svg>
  );
}

function ModemIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="30" width="40" height="18" fill="#475569" rx="4" />
      <line x1="38" y1="30" x2="45" y2="15" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="39" r="2.5" fill="#22C55E" />
      <circle cx="28" cy="39" r="2.5" fill="#38BDF8" />
      <circle cx="36" cy="39" r="2.5" fill="#EAB308" />
    </svg>
  );
}

function SearchEngineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="15" width="48" height="30" fill="white" stroke="#94A3B8" strokeWidth="2" rx="8" />
      <circle cx="26" cy="30" r="8" fill="none" stroke="#2563EB" strokeWidth="3" />
      <line x1="32" y1="36" x2="40" y2="44" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BrowserIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="10" width="48" height="40" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" rx="4" />
      <rect x="6" y="10" width="48" height="12" fill="#CBD5E1" rx="4" />
      <circle cx="12" cy="16" r="2" fill="#EF4444" />
      <circle cx="18" cy="16" r="2" fill="#F59E0B" />
      <circle cx="24" cy="16" r="2" fill="#22C55E" />
      <rect x="12" y="26" width="36" height="8" fill="white" rx="2" />
    </svg>
  );
}

function TabIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 24 C10 20, 14 18, 18 18 L32 18 C36 18, 40 20, 40 24 L40 24 L10 24 Z" fill="#3B82F6" />
      <rect x="8" y="24" width="44" height="22" fill="#E2E8F0" rx="3" />
    </svg>
  );
}

function BookmarkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,8 36,22 52,23 39,34 44,50 30,41 16,50 21,34 8,23 24,22" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    </svg>
  );
}

function HistoryIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="20" fill="none" stroke="#8B5CF6" strokeWidth="4" />
      <polyline points="30,16 30,30 40,35" fill="none" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 A20 20 0 1 1 12 22" fill="none" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" />
      <polygon points="12,12 12,24 22,20" fill="#06B6D4" />
    </svg>
  );
}

function HomeButtonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,8 8,26 15,26 15,50 45,50 45,26 52,26" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" />
      <rect x="24" y="34" width="12" height="16" fill="white" />
    </svg>
  );
}

// ─── RENDER SORT ICON MAPPING ───────────────────────��─────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'isp': return <ISPIcon size={size} />;
    case 'www': return <WWWIcon size={size} />;
    case 'url': return <URLIcon size={size} />;
    case 'http': return <HTTPIcon size={size} />;
    case 'modem': return <ModemIcon size={size} />;
    case 'step1': return <BrowserIcon size={size} />;
    case 'step2': return <SearchEngineIcon size={size} />;
    case 'step3': return <RefreshIcon size={size} />;
    case 'step4': return <SearchEngineIcon size={size} />;
    case 'step5': return <TabIcon size={size} />;
    case 'step6': return <WWWIcon size={size} />;
    case 'title': return <BrowserIcon size={size} />;
    case 'address': return <URLIcon size={size} />;
    case 'tabs': return <TabIcon size={size} />;
    case 'bookmarks': return <BookmarkIcon size={size} />;
    case 'history': return <HistoryIcon size={size} />;
    case 'refresh': return <RefreshIcon size={size} />;
    case 'home': return <HomeButtonIcon size={size} />;
    case 'act-tabs': return <TabIcon size={size} />;
    case 'act-history': return <HistoryIcon size={size} />;
    case 'act-refresh': return <RefreshIcon size={size} />;
    case 'act-home': return <HomeButtonIcon size={size} />;
    case 'act-bookmarks': return <BookmarkIcon size={size} />;
    default: return <NetworkIcon size={size} />;
  }
}

// ─── INTERNET SCENE BACKGROUND ────────────────────────────────

function InternetSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="cyber-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="cyber-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#cyber-sky)" />
        {/* Network grid lines */}
        <line x1="0" y1="100" x2={width} y2="100" stroke="#38BDF8" strokeWidth="0.5" opacity="0.2" />
        <line x1="0" y1="200" x2={width} y2="200" stroke="#38BDF8" strokeWidth="0.5" opacity="0.2" />
        <line x1="0" y1="300" x2={width} y2="300" stroke="#38BDF8" strokeWidth="0.5" opacity="0.2" />
        <line x1="0" y1="400" x2={width} y2="400" stroke="#38BDF8" strokeWidth="0.5" opacity="0.2" />
        {/* Floating digital nodes */}
        <circle cx="100" cy="80" r="3" fill="#38BDF8" opacity="0.6" />
        <circle cx="300" cy="60" r="4" fill="#818CF8" opacity="0.6" />
        <circle cx="550" cy="90" r="3" fill="#38BDF8" opacity="0.5" />
        <circle cx="650" cy="150" r="5" fill="#34D399" opacity="0.5" />
        <line x1="100" y1="80" x2="300" y2="60" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
        <line x1="300" y1="60" x2="550" y2="90" stroke="#818CF8" strokeWidth="1" opacity="0.3" />
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
            className="mb-1 bg-white/95 backdrop-blur rounded-xl px-3 py-2 shadow-xl max-w-[220px] border border-blue-200"
          >
            <p className="text-xs font-bold text-slate-800">{speaking}</p>
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
            <linearGradient id="nikhil-suit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <radialGradient id="nikhil-face" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#F97316" />
            </radialGradient>
          </defs>
          {/* Compass Badge on Hat */}
          <ellipse cx="37.5" cy="22" rx="18" ry="12" fill="#1E293B" />
          <path d="M 19 22 Q 37.5 12 56 22 Z" fill="#3B82F6" />
          {/* Head */}
          <circle cx="37.5" cy="35" r="15" fill="url(#nikhil-face)" stroke="#C2410C" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="43" cy="33" r="2.5" fill="#1E293B" />
          {/* Smile */}
          <path d="M 33 41 Q 37.5 45 42 41" stroke="#9A3412" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Body / Explorer vest */}
          <path d="M 22 50 L 53 50 L 58 78 L 17 78 Z" fill="url(#nikhil-suit)" stroke="#1E40AF" strokeWidth="1.5" />
          {/* Magnifying glass in hand */}
          <circle cx="60" cy="65" r="8" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="55" y1="70" x2="48" y2="77" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
          {/* Explorer compass badge on chest */}
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
    title: "What is the Internet & WWW? 🌐",
    text: "A computer network links computers together. The Internet is the world's largest network! The WWW (World Wide Web) is the massive library of websites that runs on the Internet.",
    emoji: "🌐",
    bgColor: "from-blue-600 to-indigo-700",
    spoken: "A computer network links computers together. The Internet is the world's largest network! The World Wide Web is the massive library of websites that runs on the Internet."
  },
  {
    title: "ISP, URL, and HTTP 📡",
    text: "An ISP (like Jio, Airtel, or BSNL) gives you Internet access. A URL is a web address like https://www.india.gov.in. HTTP is the rule protocol for sending web pages!",
    emoji: "📡",
    bgColor: "from-indigo-600 to-purple-700",
    spoken: "An ISP like Jio or Airtel gives you Internet access. A URL is a web address. HTTP is the rule protocol for sending web pages!"
  },
  {
    title: "The Magic Modem ⚡",
    text: "A modem is a device that converts digital computer signals into signals that can travel over telephone or fibre-optic cables, and back again!",
    emoji: "⚡",
    bgColor: "from-purple-600 to-pink-700",
    spoken: "A modem is a device that converts digital computer signals into signals that can travel over telephone or fibre-optic cables, and back again!"
  },
  {
    title: "Search Engines & Keywords 🔍",
    text: "A search engine like Google helps you find web pages. Instead of a long sentence, type short, important words called keywords, like 'Bengal tiger India'!",
    emoji: "🔍",
    bgColor: "from-blue-500 to-cyan-600",
    spoken: "A search engine like Google helps you find web pages. Instead of a long sentence, type short, important words called keywords!"
  },
  {
    title: "Web Browser Components 🗂️",
    text: "Browsers have title bars, address bars for URLs, tabs to keep multiple pages open, bookmarks for saved shortcuts, history to see past visits, and refresh buttons!",
    emoji: "🗂️",
    bgColor: "from-cyan-600 to-teal-700",
    spoken: "Browsers have title bars, address bars for URLs, tabs for multiple pages, bookmarks for saved shortcuts, and history!"
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
    question: "What is the INTERNET?",
    answer: "The world's largest computer network connecting millions of computers globally",
    options: [
      "The world's largest computer network connecting millions of computers globally",
      "A single computer in a school lab",
      "A type of computer game software"
    ],
    hint: "Think: is it one computer or millions connected worldwide?",
    misconception: "The Internet is NOT just one computer or a game! It is the world's largest computer network that links millions of computers across the entire globe!"
  },
  {
    type: 'sort',
    question: "Drag each Internet term to its correct definition!",
    answer: "sort",
    options: [],
    hint: "Match ISP to company, WWW to websites, URL to address, HTTP to protocol, and Modem to signal converter!",
    misconception: "Remember: ISP is the provider company (Jio/Airtel), WWW is the web library, URL is the address, HTTP is the transfer protocol, and Modem converts signals!",
    sortItems: [
      { id: 'isp-item', label: 'ISP (Jio/Airtel)', icon: 'isp', correctBin: 'bin-isp' },
      { id: 'www-item', label: 'WWW (Websites)', icon: 'www', correctBin: 'bin-www' },
      { id: 'url-item', label: 'URL (Web address)', icon: 'url', correctBin: 'bin-url' },
      { id: 'modem-item', label: 'Modem (Translator)', icon: 'modem', correctBin: 'bin-modem' }
    ],
    bins: [
      { id: 'bin-isp', label: 'ISP Company 📡', color: '#3B82F6' },
      { id: 'bin-www', label: 'WWW Websites 🌐', color: '#10B981' },
      { id: 'bin-url', label: 'URL Address 🔗', color: '#F59E0B' },
      { id: 'bin-modem', label: 'Modem Device ⚡', color: '#8B5CF6' }
    ]
  },
  {
    type: 'identify',
    question: "What does an ISP (Internet Service Provider) do?",
    answer: "Gives people and organisations access to the Internet",
    options: [
      "Gives people and organisations access to the Internet",
      "Makes computer hardware and keyboards",
      "Creates and designs individual web pages"
    ],
    hint: "Think: companies like Jio and Airtel provide what service to your house?",
    misconception: "An ISP does NOT manufacture hardware or write web pages! An ISP is a company like Jio, Airtel, or BSNL that gives you an account and access to the Internet."
  },
  {
    type: 'sort',
    question: "Drag each step of searching on the Internet in correct order!",
    answer: "sort",
    options: [],
    hint: "Start by opening the browser, then type keywords, press Enter, check results, and click!",
    misconception: "The correct search flow: 1. Open browser -> 2. Go to search engine -> 3. Type keywords -> 4. Press Enter -> 5. Review results -> 6. Click relevant link!",
    sortItems: [
      { id: 'step-1', label: '1. Open browser', icon: 'step1', correctBin: 'bin-order' },
      { id: 'step-2', label: '2. Type keywords', icon: 'step2', correctBin: 'bin-order' },
      { id: 'step-3', label: '3. Press Enter', icon: 'step3', correctBin: 'bin-order' }
    ],
    bins: [
      { id: 'bin-order', label: 'Search Steps 🔍', color: '#0EA5E9' }
    ]
  },
  {
    type: 'identify',
    question: "What is a SEARCH ENGINE like Google?",
    answer: "A tool that helps you find information on the Internet using keywords",
    options: [
      "A tool that helps you find information on the Internet using keywords",
      "A piece of hardware that converts telephone signals",
      "A printer that prints out web pages on paper"
    ],
    hint: "Think: what do you use Google for when you have a school project?",
    misconception: "A search engine is NOT a printer or modem! It is a special website program like Google that searches millions of pages and brings back matching results for your keywords."
  },
  {
    type: 'sort',
    question: "Drag each browser component to its correct function!",
    answer: "sort",
    options: [],
    hint: "Title bar shows page title, Address bar has URL, Tabs keep multiple pages open, Bookmarks save shortcuts!",
    misconception: "Remember: Title bar = page name; Address bar = URL box; Tabs = multiple open pages; Bookmarks = saved favourite shortcuts; History = past visited pages!",
    sortItems: [
      { id: 'act-tabs', label: 'Tabs (Multi-pages)', icon: 'act-tabs', correctBin: 'bin-tabs' },
      { id: 'act-bookmarks', label: 'Bookmarks (Saved)', icon: 'act-bookmarks', correctBin: 'bin-bookmarks' },
      { id: 'act-history', label: 'History (Past logs)', icon: 'act-history', correctBin: 'bin-history' },
      { id: 'act-refresh', label: 'Refresh (Reload)', icon: 'act-refresh', correctBin: 'bin-refresh' }
    ],
    bins: [
      { id: 'bin-tabs', label: 'Tabs 📑', color: '#3B82F6' },
      { id: 'bin-bookmarks', label: 'Bookmarks ⭐', color: '#F59E0B' },
      { id: 'bin-history', label: 'History 🕒', color: '#8B5CF6' },
      { id: 'bin-refresh', label: 'Refresh 🔄', color: '#06B6D4' }
    ]
  },
  {
    type: 'identify',
    question: "What are BOOKMARKS in a web browser?",
    answer: "Saved shortcuts to your favourite websites so you do not have to type the URL again",
    options: [
      "Saved shortcuts to your favourite websites so you do not have to type the URL again",
      "A list of downloaded computer virus files",
      "Printed paper copies of web pages"
    ],
    hint: "Think: why do you click the star icon in a browser?",
    misconception: "Bookmarks do NOT store viruses or print paper! They are saved shortcuts that remember website URLs so you can visit your favourite sites instantly with one click."
  },
  {
    type: 'sort',
    question: "Drag each browser feature to what it helps you do!",
    answer: "sort",
    options: [],
    hint: "Tabs switch pages, History checks past visits, Refresh reloads, Home goes to starting page!",
    misconception: "Remember: Tabs let you switch pages without closing them; History lets you see past websites; Refresh gets the latest version; Home returns to your start page!",
    sortItems: [
      { id: 's-tab', label: 'Switch open pages', icon: 'act-tabs', correctBin: 'bin-tab-fn' },
      { id: 's-hist', label: 'See past website visits', icon: 'act-history', correctBin: 'bin-hist-fn' },
      { id: 's-ref', label: 'Reload page for updates', icon: 'act-refresh', correctBin: 'bin-ref-fn' }
    ],
    bins: [
      { id: 'bin-tab-fn', label: 'Tabs Function 📑', color: '#3B82F6' },
      { id: 'bin-hist-fn', label: 'History Function 🕒', color: '#8B5CF6' },
      { id: 'bin-ref-fn', label: 'Refresh Function 🔄', color: '#06B6D4' }
    ]
  }
];

// ─── PROPS & EXPORT ───────────────────────────────────────────

export interface InternetBrowserGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function InternetBrowserGame({ width = 720, height = 560, onComplete }: InternetBrowserGameProps) {
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
  
  const [, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
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

  const handleShowHint = useCallback(() => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  }, [currentChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [handleShowHint]);

  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, currentChallenge, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 30 + idx * 125, y: height - 165 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, currentChallenge]);

  const handleAnswerClick = (opt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    setIsIncorrect(false);
    setSelectedOpt(opt);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x, y });
      setScore(prev => prev + 10);
      const msg = "Great job! You know how the internet works!";
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
      const compMsg = "Wonderful! You are an Internet Star!";
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

    // Bin hit detection (simplified bounds check or default acceptance for step challenges)
    let droppedBinId = item.correctBin;
    if (currentChallenge.bins.length === 1) {
      droppedBinId = currentChallenge.bins[0].id;
    } else {
      // Check proximity to bins
      currentChallenge.bins.forEach((bin) => {
        const binElem = document.getElementById(`bin-${bin.id}`);
        if (binElem) {
          const rect = binElem.getBoundingClientRect();
          if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            droppedBinId = bin.id;
          }
        }
      });
    }

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
        const msg = "Fantastic! You sorted the browser parts perfectly!";
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
    <div className="relative overflow-hidden rounded-2xl shadow-2xl select-none bg-slate-900 font-sans" style={{ width, height }}>
      <InternetSceneBackground width={width} height={height} />
      <NavigatorNikhil mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TEACHING SCREEN ─────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 bg-gradient-to-b from-slate-900/90 to-slate-950/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700">
              <span className="text-xl">{TEACHING_SLIDES[slideIdx].emoji}</span>
              <span className="text-sm font-bold text-slate-200">Internet Explorer Guide ({slideIdx + 1}/5)</span>
            </div>
            <StarRow count={slideIdx} total={5} />
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`my-auto mx-auto max-w-xl p-6 rounded-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl border border-white/20 text-white text-center`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-xl font-bold text-white shadow-md transition-all ${slideIdx === 0 ? 'bg-slate-700 opacity-40 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600'}`}
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
                  audioManager.play('whoosh');
                }
              }}
              className="px-6 py-2.5 rounded-xl font-black text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg transform hover:scale-105 transition-all"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10 bg-slate-950/80 backdrop-blur-sm">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600/30 border border-blue-400/40 px-3 py-1 rounded-xl text-blue-300 font-bold text-xs">
                Question {challengeIdx + 1} of {CHALLENGES.length}
              </div>
              <div className="bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-xl text-amber-300 font-bold text-xs flex items-center gap-1">
                ⭐ Score: {score}
              </div>
            </div>
            <button
              onClick={handleShowHint}
              className="bg-purple-600/40 border border-purple-400/40 hover:bg-purple-600/60 text-purple-200 px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-md"
            >
              💡 Hint
            </button>
          </div>

          {/* Question Box */}
          <div className="my-2 bg-slate-900/90 border border-slate-700 rounded-2xl p-4 shadow-xl max-w-xl mx-auto w-full text-center">
            <h3 className="text-lg font-black text-white">{currentChallenge.question}</h3>
          </div>

          {/* Challenge Content Area */}
          <div className="relative flex-1 flex flex-col items-center justify-center my-2" style={{ minHeight: 220 }}>
            {/* Multiple Choice Type */}
            {currentChallenge.type === 'identify' && (
              <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnColor = 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700';
                  if (isSelected) {
                    btnColor = isCorrectAnswer ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-rose-600 text-white border-rose-400';
                  } else if (isIncorrect && isCorrectAnswer) {
                    btnColor = 'bg-emerald-600/70 text-white border-emerald-400';
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      className={`p-3.5 rounded-xl font-bold text-sm text-left border shadow-lg transition-all flex items-center justify-between ${btnColor}`}
                    >
                      <span>{opt}</span>
                      <span className="text-lg">{idx === 0 ? '💻' : idx === 1 ? '🌐' : '⚡'}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sort Type (Drag and Drop) */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="w-full h-full flex flex-col justify-between">
                {/* Bins */}
                <div className="flex justify-center gap-3 flex-wrap mb-4">
                  {currentChallenge.bins.map(bin => (
                    <div
                      key={bin.id}
                      id={`bin-${bin.id}`}
                      className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-600 bg-slate-900/80 p-3 shadow-inner"
                      style={{ width: 140, height: 95, borderColor: bin.color }}
                    >
                      <span className="text-xs font-black text-center text-white">{bin.label}</span>
                    </div>
                  ))}
                </div>

                {/* Draggable Items */}
                <div className="flex justify-center gap-4 flex-wrap pb-2">
                  {currentChallenge.sortItems.map(item => {
                    const placed = placedItems[item.id];
                    return (
                      <Draggable
                        key={item.id}
                        id={item.id}
                        x={0}
                        y={0}
                        draggable={!placed}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        width={110}
                        height={90}
                      >
                        <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border border-slate-700 ${placed ? 'opacity-30' : 'bg-slate-800'} px-2 py-1`} style={{ width: 110, height: 90 }}>
                          {renderSortIcon(item.icon, 38)}
                          <span className="text-[10px] font-bold text-slate-200 text-center mt-1">{item.label}</span>
                        </div>
                      </Draggable>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-800">
            <div className="text-xs text-slate-400 font-medium">
              Errors: <span className="text-rose-400 font-bold">{errors}</span>
            </div>
            {((selectedOpt && selectedOpt === currentChallenge.answer) || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="px-6 py-2 rounded-xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-all text-sm"
              >
                Continue ➡️
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
