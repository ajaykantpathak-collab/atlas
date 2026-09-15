'use client';
/**
 * ComputerSkillsC1_5Sim - Computer skills foundations for Classes 1-5.
 *
 * CISCE Nodes: c1_comp_001 through c5_comp_010
 * Enrichment: c1_computer_enrichment through c5_computer_enrichment
 *
 * ELI5: "A computer is an electronic device that helps us do many things!
 *   It has parts like the monitor (screen), keyboard (typing), and mouse (clicking).
 *   Input devices send data IN, output devices show data OUT. Files store information
 *   in folders. Stay safe online - never share personal info with strangers!"
 *
 * Misconceptions (from enrichment):
 *   1. "CPU and monitor are the same" -> "No! CPU is the brain, monitor is the screen!"
 *   2. "Keyboard is an output device" -> "No! Keyboard is INPUT - it sends data to the computer!"
 *   3. "Software is something you can touch" -> "No! Software is instructions/programs. Hardware is physical!"
 *   4. "Files and folders are the same" -> "No! Files hold data, folders hold files!"
 *   5. "It's safe to share your address online" -> "No! Never share personal info with strangers!"
 *
 * Story: "Join Techie Tara at the Computer Discovery Lab! Learn about computer parts,
 *   sort input vs output devices, organize files into folders, and earn your
 *   Computer Explorer Badge!"
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';
// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
    { title: 'What is a Computer? 💻', text: 'A computer is an electronic device that processes data and performs tasks! It can do calculations, play music, draw pictures, and connect us to the whole world. Computers follow instructions called programs!', emoji: '💻', bgColor: 'from-sky-400 to-blue-500' },
    { title: 'Parts of a Computer 🖥️', text: 'Every computer has main parts: the Monitor (screen that shows pictures), CPU (the brain), Keyboard (for typing letters), and Mouse (for clicking). Speakers play sound and the printer makes paper copies!', emoji: '🖥️', bgColor: 'from-cyan-400 to-teal-500' },
    { title: 'Input and Output Devices ⌨️', text: 'Input devices send data INTO the computer (keyboard, mouse, microphone). Output devices give information OUT of the computer (monitor, printer, speakers). Some devices like touchscreens do both!', emoji: '⌨️', bgColor: 'from-violet-400 to-purple-500' },
    { title: 'Files and Folders 📁', text: 'Computers store information in files - just like papers in folders! A file is one piece of data (document, picture, video). A folder holds many files. File extensions show the type: .txt, .jpg, .mp3!', emoji: '📁', bgColor: 'from-amber-400 to-orange-500' },
    { title: 'Internet Safety 🛡️', text: 'The internet is wonderful for learning, but stay safe! Never share your name, address, or phone number with strangers online. Use strong passwords. Always ask a trusted adult if something feels wrong!', emoji: '🛡️', bgColor: 'from-rose-400 to-pink-500' },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_part' | 'identify_device' | 'sort_io' | 'identify_software' | 'identify_extension' | 'sort_files' | 'identify_safety' | 'identify_logo';
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
        type: 'identify_part',
        question: 'What do we CALL the part of the computer that shows pictures and movies?',
        answer: 'Monitor',
        options: ['Monitor', 'Keyboard', 'Mouse'],
        hint: 'Think about where you LOOK at while using the computer - the screen!',
        misconception: 'The Monitor is the screen that shows everything we see. A keyboard is for typing and a mouse is for clicking. The monitor never types or clicks!',
    },
    {
        type: 'identify_device',
        question: 'Which device do we use to CLICK and POINT at things on the screen?',
        answer: 'Mouse',
        options: ['Scanner', 'Mouse', 'Webcam'],
        hint: 'You move this small device on your desk to move the arrow on screen!',
        misconception: 'The Mouse helps us point and click! A scanner copies pictures, a webcam takes videos. Only the mouse moves the cursor on the screen!',
    },
    {
        type: 'sort_io',
        question: 'Drag each device: Is it INPUT or OUTPUT?',
        answer: 'sort',
        options: [],
        hint: 'Input sends data INTO the computer (keyboard, mouse). Output shows data FROM the computer (monitor, printer)!',
        misconception: 'Input devices send data TO the computer: keyboard types letters, mouse clicks. Output devices show data FROM the computer: monitor displays, printer prints. Never mix them up!',
        sortItems: [
            { id: 'keyboard', label: 'Keyboard', emoji: '⌨️', correctBin: 'input' },
            { id: 'mouse', label: 'Mouse', emoji: '🖱️', correctBin: 'input' },
            { id: 'monitor', label: 'Monitor', emoji: '🖥️', correctBin: 'output' },
            { id: 'printer', label: 'Printer', emoji: '🖨️', correctBin: 'output' },
        ],
        bins: [
            { id: 'input', label: 'Input (Data IN) ⌨️', color: '#3B82F6' },
            { id: 'output', label: 'Output (Data OUT) 🖨️', color: '#EF4444' },
        ],
    },
    {
        type: 'identify_software',
        question: 'What do we call the instructions that tell a computer what to do?',
        answer: 'Software',
        options: ['Software', 'Cable', 'Mousepad'],
        hint: 'Programs, apps, and games are all types of this. You cannot touch it!',
        misconception: 'Software is the set of instructions/programs like apps and games. Cables and mousepads are physical things (hardware). Software is NOT something you can touch!',
    },
    {
        type: 'identify_extension',
        question: 'A file for a PICTURE usually ends with which extension?',
        answer: '.jpg',
        options: ['.txt', '.jpg', '.mp3'],
        hint: 'This is a common picture file format used in cameras and on the web!',
        misconception: '.jpg is for PICTURES! .txt is for text files (documents), .mp3 is for audio (music). Each extension tells you what type of file it is!',
    },
    {
        type: 'sort_files',
        question: 'Drag each file to its correct folder!',
        answer: 'sort',
        options: [],
        hint: 'Pictures go in Images, songs go in Music, documents go in Documents, videos go in Videos!',
        misconception: 'Each file type belongs in its matching folder: .jpg/.png are pictures (Images), .mp3 is audio (Music), .txt/.doc are documents (Documents), .mp4 is video (Videos). Keep files organized!',
        sortItems: [
            { id: 'photo', label: 'photo.jpg', emoji: '🖼️', correctBin: 'images' },
            { id: 'song', label: 'song.mp3', emoji: '🎵', correctBin: 'music' },
            { id: 'doc', label: 'homework.txt', emoji: '📄', correctBin: 'documents' },
            { id: 'video', label: 'movie.mp4', emoji: '🎬', correctBin: 'videos' },
        ],
        bins: [
            { id: 'images', label: 'Images 🖼️', color: '#10B981' },
            { id: 'music', label: 'Music 🎵', color: '#F59E0B' },
            { id: 'documents', label: 'Documents 📄', color: '#3B82F6' },
            { id: 'videos', label: 'Videos 🎬', color: '#EF4444' },
        ],
    },
    {
        type: 'identify_safety',
        question: 'Which of these is NOT safe to share online?',
        answer: 'Your Home Address',
        options: ['Your Favourite Colour', 'Your Home Address', 'A Drawing You Made'],
        hint: 'Think about information that could help a stranger find you in real life!',
        misconception: 'Your address, phone number, and school name are PERSONAL details that strangers could misuse! Favourite colours and drawings are safe to share. Never share personal info online!',
    },
    {
        type: 'identify_logo',
        question: 'In LOGO turtle graphics, what does "FD 50" do?',
        answer: 'Moves forward 50 pixels',
        options: ['Turns right 50 degrees', 'Moves forward 50 pixels', 'Changes colour'],
        hint: 'FD stands for Forward. The number tells the turtle how far to move!',
        misconception: 'FD means FORWARD! FD 50 moves the turtle forward 50 pixels. RT would turn right, BK would go back. Always remember: FD = Forward, RT = Right Turn, BK = Back!',
    },
];
// ─── Techie Tara Mascot (Friendly Computer Teacher) ───────────
function TechieTara({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-sky-300">
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
            <radialGradient id="tara-face-grad" cx="0.4" cy="0.3" r="0.7">
              <stop offset="0%" stopColor="#FFEFD5"/>
              <stop offset="60%" stopColor="#FFD1A9"/>
              <stop offset="100%" stopColor="#E0A96D"/>
            </radialGradient>
            <linearGradient id="tara-shirt-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8"/>
              <stop offset="100%" stopColor="#0369A1"/>
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="40" cy="28" r="18" fill="url(#tara-face-grad)" stroke="#E0A96D" strokeWidth="1.5"/>
          {/* Hair (short bob) */}
          <path d="M22 25 C20 12, 60 12, 58 25 C58 30, 55 32, 55 32 C55 32, 50 16, 40 16 C30 16, 25 32, 25 32 C25 32, 22 30, 22 25 Z" fill="#1E293B"/>
          {/* Glasses */}
          <circle cx="33" cy="28" r="6" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
          <circle cx="47" cy="28" r="6" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
          <line x1="39" y1="28" x2="41" y2="28" stroke="#1E293B" strokeWidth="1.5"/>
          {/* Eyes inside glasses */}
          <circle cx="33" cy="28" r="2.5" fill="#1E293B"/>
          <circle cx="47" cy="28" r="2.5" fill="#1E293B"/>
          <circle cx="34" cy="27" r="0.8" fill="white"/>
          <circle cx="48" cy="27" r="0.8" fill="white"/>
          {/* Rosy Cheeks */}
          <ellipse cx="28" cy="33" rx="3" ry="1.5" fill="#FDA4AF" opacity="0.7"/>
          <ellipse cx="52" cy="33" rx="3" ry="1.5" fill="#FDA4AF" opacity="0.7"/>
          {/* Smile */}
          <path d="M36 35 Q40 39 44 35" stroke="#0284C7" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Blue Tech Shirt with gradient */}
          <path d="M24 45 L40 50 L56 45 L62 80 L18 80 Z" fill="url(#tara-shirt-grad)" stroke="#0369A1" strokeWidth="1.5"/>
          {/* Binary digits on shirt */}
          <text x="28" y="58" fontSize="5" fill="white" fontWeight="bold">101</text>
          <text x="42" y="58" fontSize="5" fill="white" fontWeight="bold">010</text>
          <text x="32" y="68" fontSize="5" fill="white" fontWeight="bold">110</text>
          {/* Tablet held in left hand */}
          <rect x="16" y="60" width="14" height="18" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5"/>
          <rect x="18" y="62" width="10" height="12" rx="1" fill="#0EA5E9"/>
          {/* Code lines on tablet screen */}
          <line x1="19" y1="65" x2="26" y2="65" stroke="white" strokeWidth="0.5" opacity="0.7"/>
          <line x1="19" y1="68" x2="24" y2="68" stroke="white" strokeWidth="0.5" opacity="0.7"/>
          <line x1="19" y1="71" x2="27" y2="71" stroke="white" strokeWidth="0.5" opacity="0.7"/>
          {/* Hand holding tablet */}
          <circle cx="23" cy="76" r="3.5" fill="url(#tara-face-grad)" stroke="#E0A96D" strokeWidth="1"/>
          {/* Laptop badge on shirt */}
          <rect x="48" y="60" width="12" height="7" rx="1" fill="white" stroke="#0369A1" strokeWidth="1"/>
          <line x1="48" y1="67" x2="60" y2="67" stroke="#0369A1" strokeWidth="1.5"/>
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
// ─── Computer Lab Scene Background ────────────────────────────
function ComputerLabBackground({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Layered lab gradient (wall → floor) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 30%, #F0F9FF 60%, #DBEAFE 100%)' }}/>

      {/* Lab Window with city view */}
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
          {/* Buildings through window */}
          <rect x="15" y="15" width="8" height="18" fill="#475569" opacity="0.5"/>
          <rect x="25" y="10" width="10" height="23" fill="#64748B" opacity="0.5"/>
          <rect x="60" y="12" width="8" height="21" fill="#475569" opacity="0.5"/>
          <rect x="70" y="8" width="12" height="25" fill="#64748B" opacity="0.5"/>
          {/* Building windows */}
          <rect x="17" y="18" width="2" height="2" fill="#FBBF24" opacity="0.7"/>
          <rect x="20" y="22" width="2" height="2" fill="#FBBF24" opacity="0.7"/>
          <rect x="63" y="16" width="2" height="2" fill="#FBBF24" opacity="0.7"/>
          <rect x="73" y="14" width="2" height="2" fill="#FBBF24" opacity="0.7"/>
        </svg>
      </div>

      {/* Computer Lab Poster on Wall */}
      <div className="absolute top-6 right-12 opacity-30">
        <svg width="80" height="100" viewBox="0 0 80 100">
          <rect x="3" y="3" width="74" height="94" rx="4" fill="white" stroke="#0284C7" strokeWidth="2"/>
          {/* Monitor diagram inside poster */}
          <rect x="15" y="15" width="50" height="35" rx="3" fill="#334155" stroke="#1E293B" strokeWidth="1.5"/>
          <rect x="18" y="18" width="44" height="29" rx="1" fill="#0EA5E9"/>
          <rect x="30" y="52" width="20" height="6" fill="#64748B"/>
          <rect x="22" y="58" width="36" height="4" rx="2" fill="#334155"/>
          {/* Keyboard below */}
          <rect x="18" y="68" width="44" height="10" rx="2" fill="#475569" stroke="#334155" strokeWidth="1"/>
          <text x="40" y="90" fontSize="7" fill="#0284C7" textAnchor="middle" fontWeight="bold">COMPUTER</text>
        </svg>
      </div>

      {/* Computer Desk with Monitor (topic-specific!) */}
      <div className="absolute bottom-20 left-6 opacity-35">
        <svg width="100" height="70" viewBox="0 0 100 70">
          {/* Desk */}
          <rect x="5" y="50" width="90" height="6" rx="2" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5"/>
          <rect x="10" y="56" width="4" height="12" fill="#64748B"/>
          <rect x="86" y="56" width="4" height="12" fill="#64748B"/>
          {/* Monitor on desk (uses MonitorIcon style!) */}
          <rect x="30" y="15" width="40" height="28" rx="3" fill="#334155" stroke="#1E293B" strokeWidth="2"/>
          <rect x="33" y="18" width="34" height="22" rx="1" fill="#0EA5E9"/>
          <path d="M36 21 L42 21 L39 28 L36 28 Z" fill="white" opacity="0.2"/>
          <rect x="42" y="43" width="16" height="5" fill="#64748B"/>
          <rect x="34" y="48" width="32" height="3" rx="1" fill="#334155"/>
          {/* Keyboard on desk */}
          <rect x="25" y="48" width="50" height="3" rx="1" fill="#475569"/>
        </svg>
      </div>

      {/* Server rack in corner (topic-specific!) */}
      <div className="absolute bottom-20 right-8 opacity-30">
        <svg width="50" height="70" viewBox="0 0 50 70">
          <rect x="5" y="5" width="40" height="60" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="2"/>
          {/* Server units */}
          <rect x="8" y="8" width="34" height="8" rx="1" fill="#334155" stroke="#475569" strokeWidth="0.5"/>
          <circle cx="12" cy="12" r="1.5" fill="#10B981"/>
          <circle cx="16" cy="12" r="1.5" fill="#10B981"/>
          <rect x="8" y="18" width="34" height="8" rx="1" fill="#334155" stroke="#475569" strokeWidth="0.5"/>
          <circle cx="12" cy="22" r="1.5" fill="#10B981"/>
          <circle cx="16" cy="22" r="1.5" fill="#F59E0B"/>
          <rect x="8" y="28" width="34" height="8" rx="1" fill="#334155" stroke="#475569" strokeWidth="0.5"/>
          <circle cx="12" cy="32" r="1.5" fill="#10B981"/>
          <circle cx="16" cy="32" r="1.5" fill="#10B981"/>
          <rect x="8" y="38" width="34" height="8" rx="1" fill="#334155" stroke="#475569" strokeWidth="0.5"/>
          <circle cx="12" cy="42" r="1.5" fill="#EF4444"/>
          <circle cx="16" cy="42" r="1.5" fill="#10B981"/>
          <rect x="8" y="48" width="34" height="8" rx="1" fill="#334155" stroke="#475569" strokeWidth="0.5"/>
          <circle cx="12" cy="52" r="1.5" fill="#10B981"/>
          <circle cx="16" cy="52" r="1.5" fill="#10B981"/>
        </svg>
      </div>

      {/* Floating binary digits */}
      <motion.div className="absolute top-12 left-32 opacity-20" animate={{ y: [0, 8, 0], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        <svg width="40" height="50" viewBox="0 0 40 50">
          <text x="5" y="15" fontSize="10" fill="#0284C7" fontWeight="bold">1</text>
          <text x="20" y="25" fontSize="10" fill="#0284C7" fontWeight="bold">0</text>
          <text x="10" y="35" fontSize="10" fill="#0284C7" fontWeight="bold">1</text>
          <text x="25" y="45" fontSize="10" fill="#0284C7" fontWeight="bold">1</text>
        </svg>
      </motion.div>

      {/* Floating shield (internet safety) */}
      <motion.div className="absolute top-16 right-24 opacity-20" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity }}>
        <svg width="30" height="35" viewBox="0 0 30 35">
          <path d="M15 2 L27 7 L27 18 C27 25, 21 30, 15 33 C9 30, 3 25, 3 18 L3 7 Z" fill="#10B981" stroke="#059669" strokeWidth="1.5"/>
          <path d="M10 16 L14 20 L20 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Floor with circuit pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(180deg, #DBEAFE 0%, #BFDBFE 100%)', borderTop: '2px solid #93C5FD' }}>
        <svg className="w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 720 64">
          <pattern id="circuit-floor" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="20" x2="15" y2="20" stroke="#0284C7" strokeWidth="0.5"/>
            <line x1="15" y1="20" x2="15" y2="35" stroke="#0284C7" strokeWidth="0.5"/>
            <line x1="15" y1="35" x2="40" y2="35" stroke="#0284C7" strokeWidth="0.5"/>
            <circle cx="15" cy="20" r="1.5" fill="#0284C7"/>
            <circle cx="15" cy="35" r="1.5" fill="#0284C7"/>
          </pattern>
          <rect width="720" height="64" fill="url(#circuit-floor)"/>
        </svg>
      </div>
    </div>);
}
// ─── Topic-Specific SVG Components ────────────────────────────
function MonitorIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <linearGradient id="comp-monitor-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8"/>
          <stop offset="100%" stopColor="#0284C7"/>
        </linearGradient>
      </defs>
      <rect x="5" y="8" width="50" height="35" rx="3" fill="#334155" stroke="#1E293B" strokeWidth="2"/>
      <rect x="9" y="12" width="42" height="27" rx="1" fill="url(#comp-monitor-screen)"/>
      {/* Screen shine */}
      <path d="M12 15 L20 15 L16 25 L12 25 Z" fill="white" opacity="0.2"/>
      <rect x="22" y="44" width="16" height="6" fill="#64748B"/>
      <rect x="14" y="50" width="32" height="4" rx="2" fill="#334155"/>
    </svg>);
}
function KeyboardIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="20" width="50" height="25" rx="3" fill="#475569" stroke="#334155" strokeWidth="2"/>
      <rect x="10" y="24" width="6" height="5" rx="1" fill="#94A3B8"/>
      <rect x="19" y="24" width="6" height="5" rx="1" fill="#94A3B8"/>
      <rect x="28" y="24" width="6" height="5" rx="1" fill="#94A3B8"/>
      <rect x="37" y="24" width="6" height="5" rx="1" fill="#94A3B8"/>
      <rect x="46" y="24" width="6" height="5" rx="1" fill="#94A3B8"/>
      <rect x="14" y="32" width="32" height="5" rx="1" fill="#94A3B8"/>
    </svg>);
}
function MouseIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="14" ry="20" fill="#475569" stroke="#334155" strokeWidth="2"/>
      <line x1="30" y1="14" x2="30" y2="30" stroke="#334155" strokeWidth="1.5"/>
      <circle cx="30" cy="24" r="2" fill="#94A3B8"/>
    </svg>);
}
function PrinterIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="22" width="44" height="22" rx="3" fill="#475569" stroke="#334155" strokeWidth="2"/>
      <rect x="15" y="10" width="30" height="14" rx="2" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5"/>
      <rect x="15" y="44" width="30" height="10" rx="1" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5"/>
      <circle cx="45" cy="30" r="2" fill="#10B981"/>
    </svg>);
}
function CPUIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="comp-cpu-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#7DD3FC"/>
          <stop offset="60%" stopColor="#0EA5E9"/>
          <stop offset="100%" stopColor="#0369A1"/>
        </radialGradient>
      </defs>
      <rect x="12" y="12" width="36" height="36" rx="4" fill="#1E293B" stroke="#0F172A" strokeWidth="2"/>
      <rect x="18" y="18" width="24" height="24" rx="2" fill="url(#comp-cpu-grad)" stroke="#0284C7" strokeWidth="1.5"/>
      <text x="30" y="33" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">CPU</text>
      <line x1="12" y1="20" x2="6" y2="20" stroke="#64748B" strokeWidth="2"/>
      <line x1="12" y1="30" x2="6" y2="30" stroke="#64748B" strokeWidth="2"/>
      <line x1="12" y1="40" x2="6" y2="40" stroke="#64748B" strokeWidth="2"/>
      <line x1="48" y1="20" x2="54" y2="20" stroke="#64748B" strokeWidth="2"/>
      <line x1="48" y1="30" x2="54" y2="30" stroke="#64748B" strokeWidth="2"/>
      <line x1="48" y1="40" x2="54" y2="40" stroke="#64748B" strokeWidth="2"/>
    </svg>);
}
function FolderIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M5 12 L5 48 L55 48 L55 18 L30 18 L24 12 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
      <rect x="5" y="20" width="50" height="28" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5"/>
      <line x1="15" y1="30" x2="45" y2="30" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
      <line x1="15" y1="36" x2="45" y2="36" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
      <line x1="15" y1="42" x2="35" y2="42" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
    </svg>);
}
function ShieldIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 5 L50 12 L50 28 C50 38, 42 46, 30 52 C18 46, 10 38, 10 28 L10 12 Z" fill="#10B981" stroke="#059669" strokeWidth="2"/>
      <path d="M20 28 L27 35 L40 20" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
}
function ScratchCatIcon({ size = 50 }: { size?: number }) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="comp-cat-grad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FDBA74"/>
          <stop offset="60%" stopColor="#F97316"/>
          <stop offset="100%" stopColor="#C2410C"/>
        </radialGradient>
      </defs>
      {/* Cat head */}
      <ellipse cx="30" cy="32" rx="16" ry="14" fill="url(#comp-cat-grad)" stroke="#EA580C" strokeWidth="2"/>
      {/* Ears */}
      <path d="M16 22 L12 12 L22 18 Z" fill="#F97316" stroke="#EA580C" strokeWidth="1.5"/>
      <path d="M44 22 L48 12 L38 18 Z" fill="#F97316" stroke="#EA580C" strokeWidth="1.5"/>
      {/* Eyes */}
      <circle cx="24" cy="28" r="3" fill="white" stroke="#1E293B" strokeWidth="1"/>
      <circle cx="36" cy="28" r="3" fill="white" stroke="#1E293B" strokeWidth="1"/>
      <circle cx="24" cy="28" r="1.5" fill="#1E293B"/>
      <circle cx="36" cy="28" r="1.5" fill="#1E293B"/>
      {/* Nose & mouth */}
      <path d="M28 35 L30 37 L32 35 Z" fill="#EA580C"/>
      <path d="M30 37 Q26 40, 24 38 M30 37 Q34 40, 36 38" stroke="#1E293B" strokeWidth="1" fill="none"/>
      {/* Whiskers */}
      <line x1="10" y1="34" x2="20" y2="35" stroke="#1E293B" strokeWidth="1"/>
      <line x1="10" y1="38" x2="20" y2="38" stroke="#1E293B" strokeWidth="1"/>
      <line x1="40" y1="35" x2="50" y2="34" stroke="#1E293B" strokeWidth="1"/>
      <line x1="40" y1="38" x2="50" y2="38" stroke="#1E293B" strokeWidth="1"/>
    </svg>);
}
// ─── Sort Card Component ──────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('keyboard'))
        return <KeyboardIcon size={size}/>;
    if (id.includes('mouse'))
        return <MouseIcon size={size}/>;
    if (id.includes('monitor'))
        return <MonitorIcon size={size}/>;
    if (id.includes('printer'))
        return <PrinterIcon size={size}/>;
    if (id.includes('photo') || id.includes('images'))
        return <div className="text-4xl">🖼️</div>;
    if (id.includes('song') || id.includes('music'))
        return <div className="text-4xl">🎵</div>;
    if (id.includes('doc') || id.includes('documents'))
        return <div className="text-4xl">📄</div>;
    if (id.includes('video') || id.includes('videos'))
        return <div className="text-4xl">🎬</div>;
    if (id.includes('input'))
        return <div className="text-4xl">⬇️</div>;
    if (id.includes('output'))
        return <div className="text-4xl">⬆️</div>;
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
      <ComputerLabBackground width={width} height={height}/>
      <TechieTara mood="happy" speaking={null}/>

      {/* Header */}
      <div className="z-10 flex flex-col items-center mt-2">
        <h1 className="text-2xl font-black text-sky-600 drop-shadow">Techie Tara's Computer Lab</h1>
        <p className="text-sm font-bold text-gray-600">Computer Skills - CISCE Discovery</p>
      </div>

      {/* Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className={`z-10 w-full max-w-lg rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${current.bgColor} text-white flex flex-col items-center text-center my-auto`}>
        <span className="text-6xl mb-3">{current.emoji}</span>
        <h2 className="text-2xl font-black mb-3">{current.title}</h2>
        <p className="text-lg font-medium leading-relaxed">{current.text}</p>
        {/* Slide-specific visuals */}
        {slide === 0 && <div className="mt-3 opacity-80"><CPUIcon size={50}/></div>}
        {slide === 1 && <div className="mt-3 flex gap-2 opacity-80"><MonitorIcon size={36}/><KeyboardIcon size={36}/><MouseIcon size={36}/></div>}
        {slide === 2 && <div className="mt-3 flex gap-2 opacity-80"><KeyboardIcon size={36}/><div className="text-3xl">➡️</div><MonitorIcon size={36}/></div>}
        {slide === 3 && <div className="mt-3 opacity-80"><FolderIcon size={50}/></div>}
        {slide === 4 && <div className="mt-3 opacity-80"><ShieldIcon size={50}/></div>}
      </motion.div>

      {/* Navigation Footer */}
      <div className="z-10 w-full max-w-lg flex items-center justify-between pb-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-4 py-2 rounded-xl font-bold shadow ${slide === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-sky-600 hover:bg-sky-50'}`}>
          ⬅️ Back
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-sky-600 w-6' : 'bg-white/60'}`}/>))}
        </div>

        <button onClick={handleNext} className="px-6 py-2 rounded-xl font-bold bg-sky-600 text-white shadow-lg hover:bg-sky-700 flex items-center gap-1">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>);
}
// ─── Main Game Component ─────────────────────────────────────
export interface ComputerSkillsC1_5SimProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
export function ComputerSkillsC1_5Sim({ width = 720, height = 560, onComplete }: ComputerSkillsC1_5SimProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showSparkle, setShowSparkle] = useState(false);
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Techie Tara. Let us learn about computers!');
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
    return (<div className="relative flex flex-col select-none overflow-hidden bg-sky-100 rounded-3xl shadow-2xl" style={{ width, height }}>
      <ComputerLabBackground width={width} height={height}/>
      <TechieTara mood={mascotMood} speaking={mascotSpeech}/>

      {screen === 'teaching' ? (<TeachingScreen onStart={() => { setScreen('play'); audioManager.play('tap'); }} width={width} height={height}/>) : gameOver ? (
        /* Completion Screen */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-30 bg-white/95">
          <Confetti onComplete={() => { }}/>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-center">
            <span className="text-7xl mb-3">🏆</span>
            <h1 className="text-3xl font-black text-sky-600 mb-2">Computer Explorer Badge Earned!</h1>
            <p className="text-lg font-bold text-gray-700 mb-4">You successfully completed Techie Tara's computer challenges!</p>
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
            }} className="px-6 py-3 bg-sky-600 text-white font-black rounded-2xl shadow-xl hover:bg-sky-700">
              Play Again 🔄
            </button>
          </motion.div>
        </div>) : (
        /* Play Screen */
        <div className="relative flex flex-col justify-between h-full p-4 z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-sky-600 bg-sky-100 px-3 py-1 rounded-xl shadow">
                Challenge {currentIdx + 1} of {CHALLENGES.length}
              </span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length}/>
          </div>

          {/* Question Box */}
          <div className="my-2 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border-2 border-sky-200 text-center max-w-xl mx-auto w-full">
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
                {challenge.options.map((option) => (<motion.button key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(option)} className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-xl border-3 border-sky-300 hover:border-sky-500 font-extrabold text-gray-800 text-base">
                    {option === 'Monitor' ? <MonitorIcon size={45}/> :
                        option === 'Keyboard' ? <KeyboardIcon size={45}/> :
                            option === 'Mouse' ? <MouseIcon size={45}/> :
                                option === 'Scanner' ? <div className="text-4xl mb-1">📠</div> :
                                    option === 'Webcam' ? <div className="text-4xl mb-1">📷</div> :
                                        option === 'Software' ? <div className="text-4xl mb-1">💾</div> :
                                            option === 'Cable' ? <div className="text-4xl mb-1">🔌</div> :
                                                option === 'Mousepad' ? <div className="text-4xl mb-1">🖱️</div> :
                                                    option === '.txt' ? <div className="text-4xl mb-1">📄</div> :
                                                        option === '.jpg' ? <div className="text-4xl mb-1">🖼️</div> :
                                                            option === '.mp3' ? <div className="text-4xl mb-1">🎵</div> :
                                                                option === 'Your Home Address' ? <div className="text-4xl mb-1">🏠</div> :
                                                                    option === 'Your Favourite Colour' ? <div className="text-4xl mb-1">🎨</div> :
                                                                        option === 'A Drawing You Made' ? <div className="text-4xl mb-1">✏️</div> :
                                                                            option === 'Moves forward 50 pixels' ? <ScratchCatIcon size={45}/> :
                                                                                option === 'Turns right 50 degrees' ? <div className="text-4xl mb-1">↪️</div> :
                                                                                    option === 'Changes colour' ? <div className="text-4xl mb-1">🎨</div> :
                                                                                        <div className="text-3xl mb-1">💻</div>}
                    <span className="mt-2">{option}</span>
                  </motion.button>))}
              </div>)}
          </div>

          {/* Footer status */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-2">
            <span>Errors: {errors}</span>
            <span>Techie Tara's Computer Lab 💻</span>
          </div>
        </div>)}
    </div>);
}
export default ComputerSkillsC1_5Sim;
