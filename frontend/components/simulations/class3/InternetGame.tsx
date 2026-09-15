'use client';

/**
 * InternetGame — Learn about the Internet, web browsers, URLs, and safe browsing
 *
 * CISCE Nodes: c3_cs_009 (The Internet - introduction, definition, basic concepts),
 *              c3_cs_010 (Web browser - opening, address bar, navigating websites)
 * Enrichment: c3_cs_enrichment_part9, c3_cs_enrichment_part10
 *
 * ELI5: "The Internet is a giant web that connects millions of computers all
 *   over the world. To visit websites, you open a web browser like Chrome or Edge,
 *   type the website address (URL) in the address bar, and press Enter!"
 *
 * Misconceptions (from enrichment):
 *   1. "The Internet is a single computer or Google" → "No! The Internet is a worldwide
 *      network of millions of connected computers. Google is just one website on it!"
 *   2. "Internet and web browser are the same" → "No! The web browser is a program
 *      (like Chrome) that lets you explore the Internet, which is the giant network!"
 *   3. "Address bar and search box are the same" → "No! The address bar at the top
 *      is for typing a known URL. The search box in the middle is for keywords!"
 *   4. "You can type anything in the address bar" → "No! You must type a valid URL
 *      without spaces, like https://www.wikipedia.org!"
 *   5. "All buttons at the top of the browser do the same thing" → "No! Back goes
 *      to the previous page, forward goes next, and refresh reloads the page!"
 *
 * Story: "Help Web Guide Waseem explore the global internet network, open browsers,
 *   type website URLs, and learn safe browsing habits!"
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
    title: 'What is the Internet? 🌍',
    text: 'The Internet is a vast worldwide network that connects millions of computers all over the world! It lets people share information, watch learning videos, and talk across countries instantly.',
    emoji: '🌐',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'The Internet is a vast worldwide network that connects millions of computers all over the world. It lets people share information, watch learning videos, and talk across countries instantly.',
  },
  {
    title: 'What is a Web Browser? 🖥️',
    text: 'A web browser is a special computer program like Google Chrome or Microsoft Edge. It acts as a door into the Internet, helping you look at websites, pictures, and games!',
    emoji: '🧭',
    bgColor: 'from-cyan-400 to-blue-500',
    spoken: 'A web browser is a special computer program like Google Chrome or Microsoft Edge. It acts as a door into the internet, helping you look at websites, pictures, and games.',
  },
  {
    title: 'The Address Bar & URL 🔗',
    text: 'At the top of your browser window is the address bar. This is where you type a website address called a URL (Uniform Resource Locator), like https://www.wikipedia.org, with NO spaces!',
    emoji: '⌨️',
    bgColor: 'from-teal-400 to-cyan-500',
    spoken: 'At the top of your browser window is the address bar. This is where you type a website address called a URL, like wikipedia.org, with no spaces.',
  },
  {
    title: 'Navigating Pages ⬅️➡️',
    text: 'Use the Back button to return to the previous page you looked at. Use the Forward button to go ahead again. If a page does not load right, click the circular Refresh button to reload it!',
    emoji: '🔄',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'Use the back button to return to the previous page you looked at. Use the forward button to go ahead again. If a page does not load right, click the circular refresh button to reload it.',
  },
  {
    title: 'Safe Browsing Habits 🛡️',
    text: 'Always ask your parents before visiting new websites. Never share your home address or personal details online. Safe internet explorers are smart and careful explorers!',
    emoji: '🔒',
    bgColor: 'from-indigo-400 to-purple-500',
    spoken: 'Always ask your parents before visiting new websites. Never share your home address or personal details online. Safe internet explorers are smart and careful explorers.',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_net' | 'identify_device' | 'sort_uses' | 'identify_browser' | 'sort_browser_parts' | 'identify_address' | 'sort_steps' | 'sort_safety';

interface Challenge {
  type: ChallengeType;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  sortItems?: { id: string; label: string; icon: string; correctBin: string }[];
  bins?: { id: string; label: string; color: string }[];
}

// ─── Challenges (8 progressive: identify → sort → apply) ──────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_net',
    question: 'What is the Internet?',
    answer: 'A network connecting computers all over the world',
    options: [
      'A network connecting computers all over the world',
      'A single computer in your classroom',
      'A video game software program',
    ],
    hint: 'Think about millions of computers linked together like a giant spider web across the planet!',
    misconception: 'The Internet is NOT a single computer or a game! It is a massive worldwide network of connected computers sharing information.',
  },
  {
    type: 'identify_device',
    question: 'What do you need to connect to the Internet?',
    answer: 'An internet connection and a device',
    options: [
      'An internet connection and a device',
      'Only a sharp pencil and paper',
      'Only a heavy wooden desk',
    ],
    hint: 'You need a device like a tablet, laptop, or phone, plus an internet connection like Wi-Fi!',
    misconception: 'Pencils and desks cannot connect you to the web! You need an electronic device and an internet connection (Wi-Fi or broadband).',
  },
  {
    type: 'sort_uses',
    question: 'Drag each activity to its correct Internet category!',
    answer: 'sort',
    options: [],
    hint: 'Think: are you searching for facts, chatting with someone, or watching a fun video?',
    misconception: 'The Internet has many uses! Searching facts is Information, video calls are Communication, and online games are Entertainment.',
    sortItems: [
      { id: 'search', label: 'Search facts', icon: 'search', correctBin: 'info' },
      { id: 'video-call', label: 'Video call', icon: 'tablet', correctBin: 'comm' },
      { id: 'game', label: 'Play online game', icon: 'globe', correctBin: 'ent' },
      { id: 'class', label: 'Online lesson', icon: 'website', correctBin: 'learn' },
    ],
    bins: [
      { id: 'info', label: 'Information 🔍', color: '#3B82F6' },
      { id: 'comm', label: 'Communication 💬', color: '#10B981' },
      { id: 'ent', label: 'Entertainment 🎮', color: '#F59E0B' },
      { id: 'learn', label: 'Learning 📚', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify_browser',
    question: 'What is a Web Browser?',
    answer: 'A software to open and view websites',
    options: [
      'A software to open and view websites',
      'A heavy iron computer hardware box',
      'A dangerous computer virus',
    ],
    hint: 'Programs like Google Chrome or Microsoft Edge help you view websites on the Internet.',
    misconception: 'A web browser is NOT hardware or a virus! It is a software program (like Chrome or Edge) used to open and look at websites.',
  },
  {
    type: 'sort_browser_parts',
    question: 'Drag each browser part to its correct function!',
    answer: 'sort',
    options: [],
    hint: 'Where do you type the URL? Where do you click to go back?',
    misconception: 'Every browser part has a special job! The address bar takes URLs, tabs open multiple pages, and the back button returns to previous pages.',
    sortItems: [
      { id: 'addr', label: 'Address Bar', icon: 'address-bar', correctBin: 'url-bin' },
      { id: 'back', label: 'Back Button', icon: 'back', correctBin: 'prev-bin' },
      { id: 'refresh', label: 'Refresh Button', icon: 'refresh', correctBin: 'reload-bin' },
      { id: 'tab', label: 'Browser Tab', icon: 'tab', correctBin: 'multi-bin' },
    ],
    bins: [
      { id: 'url-bin', label: 'Type URL 🔗', color: '#3B82F6' },
      { id: 'prev-bin', label: 'Go Previous ⬅️', color: '#10B981' },
      { id: 'reload-bin', label: 'Reload Page 🔄', color: '#F59E0B' },
      { id: 'multi-bin', label: 'Multiple Pages 📑', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify_address',
    question: 'What should you type in the address bar?',
    answer: 'The website address (URL) like www.google.com',
    options: [
      'The website address (URL) like www.google.com',
      'A private letter to your best friend',
      'Your secret computer password',
    ],
    hint: 'The address bar is specifically for entering complete web addresses (URLs) without spaces.',
    misconception: 'You never type letters or passwords in the address bar! You type website URLs like https://www.wikipedia.org.',
  },
  {
    type: 'sort_steps',
    question: 'Drag the steps to visit a website in correct order (1 to 3)!',
    answer: 'sort',
    options: [],
    hint: 'First open the browser, then type the URL in the address bar, then press Enter!',
    misconception: 'Order matters! You cannot type a URL before opening the browser, and you must press Enter after typing the address.',
    sortItems: [
      { id: 'step1', label: '1. Open Browser', icon: 'browser', correctBin: 'b1' },
      { id: 'step2', label: '2. Type URL', icon: 'address-bar', correctBin: 'b2' },
      { id: 'step3', label: '3. Press Enter', icon: 'link', correctBin: 'b3' },
    ],
    bins: [
      { id: 'b1', label: 'Step 1 🖥️', color: '#3B82F6' },
      { id: 'b2', label: 'Step 2 ⌨️', color: '#10B981' },
      { id: 'b3', label: 'Step 3 ↵', color: '#F59E0B' },
    ],
  },
  {
    type: 'sort_safety',
    question: 'Drag each action to Safe or Unsafe Internet practice!',
    answer: 'sort',
    options: [],
    hint: 'Are you protecting your privacy and asking adults for help?',
    misconception: 'Safe explorers ask parents before visiting new sites and never share personal information online! Unknown links can be risky.',
    sortItems: [
      { id: 'safe1', label: 'Ask parents first', icon: 'home-icon', correctBin: 'safe' },
      { id: 'safe2', label: 'Keep info private', icon: 'wifi', correctBin: 'safe' },
      { id: 'unsafe1', label: 'Share address online', icon: 'tablet', correctBin: 'unsafe' },
      { id: 'unsafe2', label: 'Click unknown links', icon: 'link', correctBin: 'unsafe' },
    ],
    bins: [
      { id: 'safe', label: 'Safe Practice 🛡️', color: '#22C55E' },
      { id: 'unsafe', label: 'Unsafe Practice ⚠️', color: '#EF4444' },
    ],
  },
];

// ─── Web Guide Waseem Mascot ──────────────────────────────────

function WaseemMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-blue-300"
          >
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
              ? { y: [0, -5, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          {/* Globe backpack */}
          <circle cx="20" cy="50" r="14" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
          <path d="M10 50 Q20 40, 30 50 Q20 60, 10 50" fill="none" stroke="white" strokeWidth="1" opacity="0.8" />
          <path d="M20 36 Q15 50, 20 64" fill="none" stroke="white" strokeWidth="1" opacity="0.8" />
          {/* Body / Explorer vest */}
          <rect x="25" y="45" width="26" height="30" rx="6" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
          <rect x="33" y="52" width="10" height="14" rx="2" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
          {/* Head */}
          <circle cx="38" cy="28" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Explorer hat */}
          <ellipse cx="38" cy="18" rx="16" ry="5" fill="#D97706" />
          <path d="M26 18 Q38 10, 50 18 Z" fill="#B45309" />
          <circle cx="38" cy="15" r="3" fill="#60A5FA" />
          {/* Wi-Fi Pin on hat */}
          <path d="M36 8 A4 4 0 0 1 40 8" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="10" r="1" fill="#3B82F6" />
          {/* Eyes */}
          <circle cx="33" cy="27" r="2.5" fill="#1F2937" />
          <circle cx="43" cy="27" r="2.5" fill="#1F2937" />
          {/* Smile */}
          <path d="M34 33 Q38 37 42 33" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Tablet in hand */}
          <rect x="48" y="50" width="14" height="18" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
          <rect x="50" y="52" width="10" height="12" rx="1" fill="#38BDF8" />
          {/* Feet */}
          <ellipse cx="31" cy="78" rx="5" ry="4" fill="#78350F" />
          <ellipse cx="45" cy="78" rx="5" ry="4" fill="#78350F" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row ─────────────────────────────────────────────────

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

// ─── Internet Scene Background ────────────────────────────────

function InternetScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="net-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <radialGradient id="glow" cx="0.5" cy="0.3" r="0.6">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#net-sky)" />
        <circle cx={width / 2} cy={height / 3} r={200} fill="url(#glow)" />

        {/* Network grid lines */}
        <g stroke="#60A5FA" strokeWidth="0.8" opacity="0.25">
          <line x1="0" y1="100" x2={width} y2="100" />
          <line x1="0" y1="200" x2={width} y2="200" />
          <line x1="0" y1="300" x2={width} y2="300" />
          <line x1="120" y1="0" x2="120" y2={height} />
          <line x1="240" y1="0" x2="240" y2={height} />
          <line x1="360" y1="0" x2="360" y2={height} />
          <line x1="480" y1="0" x2="480" y2={height} />
          <line x1="600" y1="0" x2="600" y2={height} />
        </g>
      </svg>

      {/* Floating web nodes */}
      <motion.div className="absolute top-10 left-12 opacity-80" animate={{ y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="#3B82F6" opacity="0.3" />
          <circle cx="20" cy="20" r="8" fill="#60A5FA" />
          <path d="M10 20 H30 M20 10 V30" stroke="#93C5FD" strokeWidth="2" />
        </svg>
      </motion.div>

      <motion.div className="absolute top-24 right-20 opacity-70" animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="45" height="45" viewBox="0 0 45 45">
          <rect x="5" y="5" width="35" height="25" rx="4" fill="#0EA5E9" opacity="0.4" />
          <line x1="5" y1="12" x2="40" y2="12" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="10" cy="8" r="1.5" fill="#FFF" />
          <circle cx="15" cy="8" r="1.5" fill="#FFF" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Custom SVG Component Icons for Sort Cards ─────────────────

function GlobeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M6 30 H54 M30 6 V54 M12 18 Q30 26, 48 18 M12 42 Q30 34, 48 42" stroke="#93C5FD" strokeWidth="2" fill="none" />
    </svg>
  );
}

function WifiIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="45" r="4" fill="#10B981" />
      <path d="M18 33 A18 18 0 0 1 42 33" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M10 23 A28 28 0 0 1 50 23" stroke="#34D399" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M2 13 A38 38 0 0 1 58 13" stroke="#6EE7B7" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BrowserIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="10" width="48" height="40" rx="6" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <rect x="6" y="10" width="48" height="10" rx="6" fill="#E2E8F0" />
      <circle cx="12" cy="15" r="2" fill="#EF4444" />
      <circle cx="18" cy="15" r="2" fill="#F59E0B" />
      <circle cx="24" cy="15" r="2" fill="#22C55E" />
      <rect x="30" y="13" width="20" height="4" rx="2" fill="#CBD5E1" />
      <rect x="12" y="26" width="36" height="18" rx="2" fill="#E0F2FE" />
    </svg>
  );
}

function AddressBarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="4" y="16" width="52" height="28" rx="6" fill="#1E293B" />
      <rect x="8" y="20" width="44" height="20" rx="4" fill="#FFFFFF" />
      <text x="14" y="34" fontSize="11" fontWeight="bold" fill="#0284C7">www</text>
      <circle cx="48" cy="30" r="5" fill="#3B82F6" />
      <path d="M46 30 L50 30" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="26" cy="26" r="14" fill="none" stroke="#F59E0B" strokeWidth="4" />
      <line x1="36" y1="36" x2="48" y2="48" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" fill="#FDE68A" />
    </svg>
  );
}

function WebsiteIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
      <rect x="14" y="14" width="32" height="8" rx="2" fill="#DCFCE7" />
      <rect x="14" y="26" width="20" height="4" rx="1" fill="#86EFAC" />
      <rect x="14" y="34" width="28" height="4" rx="1" fill="#86EFAC" />
      <rect x="14" y="42" width="16" height="4" rx="1" fill="#86EFAC" />
    </svg>
  );
}

function LinkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 38 L14 38 A10 10 0 0 1 14 22 L22 22" stroke="#8B5CF6" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M38 22 L46 22 A10 10 0 0 1 46 38 L38 38" stroke="#8B5CF6" strokeWidth="4" fill="none" strokeLinecap="round" />
      <line x1="22" y1="30" x2="38" y2="30" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function TabIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M8 22 Q12 14, 20 14 H40 Q48 14, 52 22 V42 H8 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <rect x="14" y="20" width="20" height="6" rx="2" fill="#38BDF8" />
    </svg>
  );
}

function RefreshIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 A20 20 0 1 1 14 20" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M10 12 L14 22 L24 18" fill="#F59E0B" />
    </svg>
  );
}

function HomeIconComponent({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 L8 28 V50 H22 V36 H38 V50 H52 V28 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
    </svg>
  );
}

function BackIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <path d="M38 30 H20 M26 22 L18 30 L26 38" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TabletIconComponent({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="8" width="36" height="44" rx="6" fill="#334155" stroke="#0F172A" strokeWidth="2" />
      <rect x="16" y="14" width="28" height="32" rx="2" fill="#38BDF8" />
      <circle cx="30" cy="49" r="1.5" fill="#94A3B8" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'globe': return <GlobeIcon size={size} />;
    case 'wifi': return <WifiIcon size={size} />;
    case 'browser': return <BrowserIcon size={size} />;
    case 'address-bar': return <AddressBarIcon size={size} />;
    case 'search': return <SearchIcon size={size} />;
    case 'website': return <WebsiteIcon size={size} />;
    case 'link': return <LinkIcon size={size} />;
    case 'tab': return <TabIcon size={size} />;
    case 'refresh': return <RefreshIcon size={size} />;
    case 'home-icon': return <HomeIconComponent size={size} />;
    case 'back': return <BackIcon size={size} />;
    case 'tablet': return <TabletIconComponent size={size} />;
    default: return <GlobeIcon size={size} />;
  }
}

// ─── Sort Card Component ──────────────────────────────────────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-blue-200 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

interface SortBinProps {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
}

function SortBin({ label, color, x, y, width, height, isHovering }: SortBinProps) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 shadow-inner transition-all duration-200 ${isHovering ? 'scale-105 bg-blue-50' : 'bg-white/90'}`}
      style={{ left: x, top: y, width, height, borderColor: color }}
    >
      <span className="text-xs font-bold text-gray-800 text-center">{label}</span>
      <div className="w-10 h-1.5 rounded-full mt-1 opacity-60" style={{ backgroundColor: color }} />
    </div>
  );
}

// ─── Main Component Props & Export ────────────────────────────

export interface InternetGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function InternetGame({ width = 720, height = 560, onComplete }: InternetGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Web Guide Waseem! Let us explore the Internet!');

  // Sort challenge states
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // Inactivity timer ref for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide
  useEffect(() => {
    if (screen === 'teaching') {
      speechManager.speak(TEACHING_SLIDES[slideIdx].spoken);
      setMascotSpeech(TEACHING_SLIDES[slideIdx].text.substring(0, 50) + '...');
    }
  }, [screen, slideIdx]);

  // Speak challenge question when it changes
  useEffect(() => {
    if (screen === 'play') {
      speechManager.speak(currentChallenge.question);
      setMascotSpeech(currentChallenge.question);
      setPlacedItems({});
    }
  }, [screen, challengeIdx, currentChallenge]);

  // Reset inactivity timer on interaction
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && currentChallenge) {
        setActiveHint(currentChallenge.hint);
        audioManager.play('hint');
        speechManager.speak(currentChallenge.hint);
        setMascotSpeech('Need a hint? Check this out!');
        setMascotMood('thinking');
      }
    }, 10000);
  }, [currentChallenge, screen]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Handle teaching next/prev
  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(prev => prev + 1);
    } else {
      setScreen('play');
      audioManager.play('whoosh');
      setMascotSpeech('Great! Now let us start our internet journey!');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      setSlideIdx(prev => prev - 1);
    }
  };

  // Multiple choice answer handler
  const handleOptionSelect = (option: string) => {
    resetInactivityTimer();
    if (option === currentChallenge.answer) {
      // Correct
      audioManager.play('success');
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! That is correct!');
      speechManager.speak('Fantastic! That is correct!');
      setSparklePos({ x: width / 2, y: height / 2 });

      setTimeout(() => {
        if (challengeIdx < CHALLENGES.length - 1) {
          setChallengeIdx(prev => prev + 1);
          setMascotMood('happy');
        } else {
          // Game complete!
          setShowConfetti(true);
          audioManager.play('celebration');
          const finalScore = Math.max(0, 100 - errors * 5);
          setSuccessMsg(`Amazing Explorer! Score: ${finalScore}/100`);
          speechManager.speak('Wonderful job! You have mastered the Internet and Web Browsers!');
          if (onComplete) onComplete(finalScore);
        }
      }, 1500);
    } else {
      // Wrong
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setActiveHint(currentChallenge.misconception);
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    setActiveDragId(id);
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    setActiveDragId(null);
    if (!currentChallenge.bins || !currentChallenge.sortItems) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check which bin (if any) the item was dropped into
    // Bins are arranged in a grid or row at the bottom/middle
    let droppedBinId: string | null = null;
    const binWidth = 140;
    const binHeight = 90;
    const startX = 40;
    const binY = 320;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = binY;
      if (x >= bx - 20 && x <= bx + binWidth + 20 && y >= by - 20 && y <= by + binHeight + 20) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = currentChallenge.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpeech('Spot on! You sorted everything correctly!');
        speechManager.speak('Spot on! You sorted everything correctly!');
        setSparklePos({ x: width / 2, y: height / 2 });

        setTimeout(() => {
          if (challengeIdx < CHALLENGES.length - 1) {
            setChallengeIdx(prev => prev + 1);
            setMascotMood('happy');
            setPlacedItems({});
          } else {
            setShowConfetti(true);
            audioManager.play('celebration');
            const finalScore = Math.max(0, 100 - errors * 5);
            setSuccessMsg(`Amazing Explorer! Score: ${finalScore}/100`);
            speechManager.speak('Wonderful job! You are a certified Internet Expert!');
            if (onComplete) onComplete(finalScore);
          }
        }, 1800);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setActiveHint(currentChallenge.misconception);
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  const handleHintClose = () => {
    setActiveHint(null);
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl shadow-2xl select-none font-sans flex flex-col justify-between"
      style={{ width, height, backgroundColor: '#0F172A' }}
    >
      {/* Background Scene */}
      <InternetScene width={width} height={height} />

      {/* Mascot Waseem */}
      <WaseemMascot mood={mascotMood} speaking={mascotSpeech} />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
            <span className="text-lg">🌐</span>
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white">Internet & Web Browser</h1>
            <p className="text-[11px] font-medium text-blue-300">Class 3 • Computer Science</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700">
              <span className="text-xs font-bold text-gray-300">Level {challengeIdx + 1}/{CHALLENGES.length}</span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length} />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        {screen === 'teaching' ? (
          // TEACHING SCREEN
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-xl rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} p-6 text-white shadow-2xl flex flex-col items-center text-center relative border border-white/20`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-xl font-extrabold mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm leading-relaxed font-medium bg-black/20 p-4 rounded-2xl mb-6 backdrop-blur-sm">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-2 mb-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'bg-white w-6' : 'bg-white/40'}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between w-full px-4">
              <button
                onClick={handlePrevSlide}
                disabled={slideIdx === 0}
                className={`px-4 py-2 rounded-xl font-bold text-sm bg-black/30 hover:bg-black/40 transition-all ${slideIdx === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                ← Back
              </button>
              <button
                onClick={handleNextSlide}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white text-blue-900 shadow-lg hover:bg-blue-50 transition-all cursor-pointer"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Playing! 🚀' : 'Next →'}
              </button>
            </div>
          </motion.div>
        ) : (
          // PLAY SCREEN
          <div className="w-full max-w-2xl flex flex-col items-center">
            {/* Question Card */}
            <motion.div
              key={challengeIdx}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-700 w-full mb-6 text-center"
            >
              <h2 className="text-base font-bold text-white">{currentChallenge.question}</h2>
            </motion.div>

            {/* Challenge Type Renderer */}
            {currentChallenge.answer !== 'sort' ? (
              // Multiple Choice
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {currentChallenge.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionSelect(option)}
                    className="w-full py-3.5 px-5 bg-slate-800/90 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg border border-slate-700 hover:border-blue-400 transition-all text-sm text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>{option}</span>
                    <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-xs text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </motion.button>
                ))}
              </div>
            ) : (
              // Drag and Drop Sort Challenge
              <div className="relative w-full h-[320px] bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700 p-4">
                {/* Bins */}
                {currentChallenge.bins && currentChallenge.bins.map((bin, idx) => {
                  const binWidth = 135;
                  const binHeight = 90;
                  const startX = 35 + idx * (binWidth + 15);
                  const binY = 210;
                  const isHovering = activeDragId !== null;

                  return (
                    <SortBin
                      key={bin.id}
                      id={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={startX}
                      y={binY}
                      width={binWidth}
                      height={binHeight}
                      isHovering={isHovering}
                    />
                  );
                })}

                {/* Draggable Cards */}
                {currentChallenge.sortItems && currentChallenge.sortItems.map((item, idx) => {
                  const cardWidth = 115;
                  const startX = 40 + idx * 135;
                  const startY = 30;
                  const isPlaced = !!placedItems[item.id];

                  return (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={startX}
                      y={startY}
                      placed={isPlaced}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Navigation / Status */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-slate-900/80 backdrop-blur-md border-t border-slate-700">
        <div className="text-xs text-slate-400 font-medium">
          Errors: <span className="text-red-400 font-bold">{errors}</span>
        </div>
        <button
          onClick={() => {
            setActiveHint(currentChallenge.hint);
            audioManager.play('hint');
            speechManager.speak(currentChallenge.hint);
          }}
          className="px-4 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-xs font-bold transition-all border border-blue-500/30 cursor-pointer"
        >
          💡 Need Hint?
        </button>
      </div>

      {/* Feedback Modals & Effects */}
      <AnimatePresence>
        {activeHint && (
          <HintBubble message={activeHint} onComplete={handleHintClose} />
        )}
        {successMsg && (
          <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />
        )}
        {showConfetti && (
          <Confetti onComplete={() => setShowConfetti(false)} />
        )}
        {sparklePos && (
          <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
