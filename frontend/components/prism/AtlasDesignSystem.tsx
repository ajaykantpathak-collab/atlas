'use client'
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  Compass, BookOpen, Flame, Trophy, Star, Zap, ArrowRight,
  Search, ChevronRight, Menu, X, Moon, Sun, Volume2,
  Play, Pause, Heart, Sparkles, Globe, Map, Flag,
  Award, Target, TrendingUp, Clock, Users, Settings,
  Home, GraduationCap, Calculator, Atom, Palette,
  Music, Film, Utensils, Plane, Microscope, Code,
  BarChart3, Layers, Wind, Droplets, Mountain,
  TreePine, Flower2, SunMedium, CloudMoon, SunDim, Leaf,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// § 1 · ATLAS DESIGN TOKENS — "The Atlas Palette"
// A warm, living color system that shifts between dawn, day, dusk, night
// ═══════════════════════════════════════════════════════════════════

export const ATLAS_TOKENS = {
  // ── Brand Identity ──────────────────────────────────────────────
  brand: {
    gold:       '#F5A623',   // Primary warm gold — energy, warmth, achievement
    goldLight:  '#FFD080',
    goldDark:   '#C7841A',
    goldMuted:  'rgba(245,166,35,0.15)',
    prismWhite: '#FFFAF0',   // Warm white, not clinical
  },

  // ── Background / Surface Architecture ───────────────────────────
  // 4-tier surface system: void → deep → surface → elevated → glass
  surface: {
    void:       '#06060F',   // Deepest background
    voidAlt:    '#0C0C1A',   // Slightly lighter void for depth
    deep:       '#111128',   // Panel backgrounds
    deepAlt:    '#161635',
    surface:    '#1C1C3A',   // Cards, modals
    surfaceAlt: '#222250',
    elevated:   '#282860',   // Elevated elements
    elevatedAlt:'#303078',
  },

  // ── Text Hierarchy ──────────────────────────────────────────────
  text: {
    primary:    '#F0EAD6',   // Warm cream — legible, warm
    secondary:  '#A09DB8',   // Muted lavender-gray
    tertiary:   '#6B6890',   // Nearly ghostly
    disabled:   '#4A4870',
    inverted:   '#0C0C1A',   // Text on light surfaces
  },

  // ── Border & Overlay ────────────────────────────────────────────
  border: {
    subtle:   'rgba(255,250,240,0.06)',
    default:  'rgba(255,250,240,0.10)',
    strong:   'rgba(255,250,240,0.18)',
    focus:    'rgba(245,166,35,0.5)',
  },
  overlay: {
    light:    'rgba(6,6,15,0.4)',
    medium:   'rgba(6,6,15,0.65)',
    heavy:    'rgba(6,6,15,0.85)',
  },

  // ── Subject Biomes — 26 Subjects ────────────────────────────────
  // Each has a core, glow, soft, and dark variant
  subjects: {
    // Languages
    english:        { core: '#F472B6', glow: 'rgba(244,114,182,0.4)',  soft: '#FBCFE8', dark: '#831843', biome: 'Ink Rivers',     icon: BookOpen },
    hindi:          { core: '#FB923C', glow: 'rgba(251,146,60,0.4)',   soft: '#FED7AA', dark: '#7C2D12', biome: 'Saffron Hills',   icon: BookOpen },
    sanskrit:      { core: '#FBBF24', glow: 'rgba(251,191,36,0.4)',   soft: '#FEF08A', dark: '#713F12', biome: 'Sacred Groves',   icon: BookOpen },
    // Sciences
    physics:        { core: '#38BDF8', glow: 'rgba(56,189,248,0.4)',  soft: '#BAE6FD', dark: '#0C4A6E', biome: 'Crystal Peaks',   icon: Atom },
    chemistry:      { core: '#4ADE80', glow: 'rgba(74,222,128,0.4)',  soft: '#BBF7D0', dark: '#14532D', biome: 'Molecular Valleys',icon: Droplets },
    biology:        { core: '#FB7185', glow: 'rgba(251,113,133,0.4)', soft: '#FECDD3', dark: '#881337', biome: 'Living Grove',    icon: TreePine },
    // STEM
    mathematics:    { core: '#A78BFA', glow: 'rgba(167,139,250,0.4)',soft: '#DDD6FE', dark: '#4C1D95', biome: 'Geometric Plains', icon: Calculator },
    computerSci:    { core: '#22D3EE', glow: 'rgba(34,211,238,0.4)', soft: '#A5F3FC', dark: '#164E63', biome: 'Circuit Spires',  icon: Code },
    // Social Sciences
    history:        { core: '#FB923C', glow: 'rgba(251,146,60,0.4)', soft: '#FED7AA', dark: '#7C2D12', biome: 'Time Ruins',      icon: Clock },
    geography:      { core: '#34D399', glow: 'rgba(52,211,153,0.4)', soft: '#A7F3D0', dark: '#064E3B', biome: 'Topo Highlands',  icon: Globe },
    civics:         { core: '#FCD34D', glow: 'rgba(252,211,77,0.4)', soft: '#FEF08A', dark: '#78350F', biome: 'Civic Plaza',     icon: Users },
    economics:      { core: '#A3E635', glow: 'rgba(163,230,53,0.4)', soft: '#D9F99D', dark: '#365314', biome: 'Market Valleys',  icon: TrendingUp },
    // Commerce
    accounts:       { core: '#2DD4BF', glow: 'rgba(45,212,191,0.4)', soft: '#99F6E4', dark: '#134E4A', biome: 'Ledger Gardens',  icon: BarChart3 },
    commerce:       { core: '#818CF8', glow: 'rgba(129,140,248,0.4)',soft: '#C7D2FE', dark: '#312E81', biome: 'Trade Spires',    icon: TrendingUp },
    business:       { core: '#C084FC', glow: 'rgba(192,132,252,0.4)',soft: '#E9D5FF', dark: '#581C87', biome: 'Enterprise Dome', icon: Layers },
    // Arts & Applied
    homeSci:        { core: '#FB7185', glow: 'rgba(251,113,133,0.4)',soft: '#FECDD3', dark: '#881337', biome: 'Hearth Gardens',   icon: Utensils },
    fineArts:       { core: '#E879F9', glow: 'rgba(232,121,249,0.4)',soft: '#F5D0FE', dark: '#701A75', biome: 'Palette Caverns',  icon: Palette },
    music:          { core: '#C084FC', glow: 'rgba(192,132,252,0.4)',soft: '#E9D5FF', dark: '#581C87', biome: 'Harmonic Fields',  icon: Music },
    environmentalSci:{ core: '#84CC16', glow: 'rgba(132,204,22,0.4)',soft: '#D9F99D', dark: '#365314', biome: 'Verdant Wilds',    icon: Leaf },
    // Others
    physicalEd:     { core: '#F97316', glow: 'rgba(249,115,22,0.4)', soft: '#FED7AA', dark: '#7C2D12', biome: 'Arena Plains',     icon: Flame },
    moralScience:   { core: '#FBBF24', glow: 'rgba(251,191,36,0.4)',soft: '#FEF08A', dark: '#713F12', biome: 'Wisdom Temple',    icon: Star },
    sociology:      { core: '#EC4899', glow: 'rgba(236,72,153,0.4)', soft: '#FBCFE8', dark: '#831843', biome: 'Society Gardens',  icon: Users },
    massComm:       { core: '#6366F1', glow: 'rgba(99,102,241,0.4)', soft: '#C7D2FE', dark: '#312E81', biome: 'Signal Towers',    icon: Zap },
    biotechnology:  { core: '#10B981', glow: 'rgba(16,185,129,0.4)',soft: '#A7F3D0', dark: '#064E3B', biome: 'Gene Gardens',     icon: Microscope },
    legalStudies:   { core: '#EF4444', glow: 'rgba(239,68,68,0.4)',  soft: '#FECACA', dark: '#7F1D1D', biome: 'Forum Halls',      icon: Award },
    yoga:           { core: '#8B5CF6', glow: 'rgba(139,92,246,0.4)', soft: '#DDD6FE', dark: '#4C1D95', biome: 'Serene Summit',    icon: Wind },
  } as const,

  // ── Mastery Progression ─────────────────────────────────────────
  // A student's journey: unknown → learning → familiar → mastered
  mastery: {
    unknown:  { core: '#4A4870', glow: 'rgba(74,72,112,0.2)', label: 'Not Explored', pct: 0 },
    learning: { core: '#F5A623', glow: 'rgba(245,166,35,0.4)',  label: 'Learning',    pct: 33 },
    familiar: { core: '#22D3EE', glow: 'rgba(34,211,238,0.4)',  label: 'Familiar',    pct: 66 },
    mastered: { core: '#F5A623', glow: 'rgba(245,166,35,0.6)',  label: 'Mastered',    pct: 100 },
  },

  // ── Time-of-Day Ambience ────────────────────────────────────────
  ambience: {
    dawn:   { sky: ['#1a1040', '#4a2080', '#f5a623'], ground: '#2a1540', ambient: 'rgba(245,166,35,0.08)' },
    day:    { sky: ['#0f0c29', '#1a237e', '#4a90d9'], ground: '#141430', ambient: 'rgba(74,144,217,0.05)' },
    dusk:   { sky: ['#0c0c20', '#4a1060', '#c03060'], ground: '#1a0a20', ambient: 'rgba(192,48,96,0.08)' },
    night:  { sky: ['#040408', '#080820', '#0c0c30'], ground: '#08081a', ambient: 'rgba(100,100,200,0.04)' },
  },

  // ── Typography ──────────────────────────────────────────────────
  fonts: {
    display: "'Space Grotesk', 'Outfit', 'Syne', system-ui, sans-serif",
    body:    "'Source Serif 4', 'Crimson Text', Georgia, serif",
    mono:    "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
    hindi:   "'Noto Sans Devanagari', 'Poppins', system-ui, sans-serif",
  },

  typeScale: {
    '6xl': { size: '4.5rem', lineHeight: '1.05', weight: 700 },
    '5xl': { size: '3.5rem', lineHeight: '1.08', weight: 700 },
    '4xl': { size: '2.75rem', lineHeight: '1.1',  weight: 700 },
    '3xl': { size: '2.25rem', lineHeight: '1.12', weight: 600 },
    '2xl': { size: '1.75rem', lineHeight: '1.15', weight: 600 },
    xl:   { size: '1.375rem', lineHeight: '1.2',  weight: 500 },
    lg:   { size: '1.125rem', lineHeight: '1.35', weight: 500 },
    base: { size: '1rem',     lineHeight: '1.65', weight: 400 },
    sm:   { size: '0.875rem', lineHeight: '1.5',  weight: 400 },
    xs:   { size: '0.75rem',  lineHeight: '1.4',  weight: 400 },
  },

  // ── Spacing ─────────────────────────────────────────────────────
  space: {
    0: '0', 1: '4px', 2: '8px', 3: '12px', 4: '16px',
    5: '20px', 6: '24px', 8: '32px', 10: '40px', 12: '48px',
    16: '64px', 20: '80px', 24: '96px', 32: '128px',
  },

  // ── Radius ─────────────────────────────────────────────────────
  radius: {
    none: '0', sm: '6px', md: '10px', lg: '16px', xl: '24px',
    '2xl': '32px', full: '9999px', blob: '60% 40% 50% 50% / 50% 60% 40% 50%',
  },

  // ── Shadows ─────────────────────────────────────────────────────
  shadows: {
    glow:      '0 0 20px rgba(245,166,35,0.3), 0 0 60px rgba(245,166,35,0.1)',
    glowSoft:  '0 0 12px rgba(245,166,35,0.15), 0 0 40px rgba(245,166,35,0.05)',
    card:      '0 2px 8px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2)',
    cardHover: '0 4px 16px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.3), 0 0 30px rgba(245,166,35,0.08)',
    elevated:  '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
    inner:     'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.05)',
  },

  // ── Backdrop Filters ────────────────────────────────────────────
  glass: {
    subtle:   'blur(8px) saturate(1.2)',
    default:  'blur(16px) saturate(1.4)',
    strong:   'blur(24px) saturate(1.6)',
    morphism: 'blur(40px) saturate(1.8)',
  },

  // ── Animation Durations ─────────────────────────────────────────
  duration: {
    instant: 0.1, fast: 0.2, normal: 0.3, slow: 0.5, slower: 0.8, glacial: 1.5,
  },
  easing: {
    out:    [0.16, 1, 0.3, 1],
    inOut:  [0.65, 0, 0.35, 1],
    spring: [0.34, 1.56, 0.64, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// § 2 · ATLAS LOGO — "Luminaris Compass"
// A compass rose that IS the world — 8 cardinal points as constellation
// nodes orbiting a glowing core. The compass points are the 26 subjects
// waiting to be explored. Animated at rest, iconic at any size.
// ═══════════════════════════════════════════════════════════════════

interface AtlasLogoProps {
  size?: number | string;
  variant?: 'mark' | 'wordmark' | 'hero';
  className?: string;
  animated?: boolean;
  color?: string;
}

export const AtlasLogo: React.FC<AtlasLogoProps> = ({
  size = 48,
  variant = 'mark',
  className = '',
  animated = true,
  color = '#F5A623',
}) => {
  const svgSize = typeof size === 'number' ? size : (parseInt(size) || 48);
  const isHero = variant === 'hero';
  const isSmall = !isHero && svgSize < 40;
  const viewBox = 0;

  // Small sizes: simplified compass — bold, legible, no fine detail
  if (isSmall) {
    const isWordmark = variant === 'wordmark';
    const compass = (
      <>
        {/* Rim */}
        <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="6" strokeOpacity="0.35" />
        {/* Cardinal needles */}
        <path d="M50 8 L58 42 L50 50 L42 42 Z" fill={color} />
        <path d="M50 92 L58 58 L50 50 L42 58 Z" fill={color} fillOpacity="0.45" />
        <path d="M8 50 L42 42 L50 50 L42 58 Z" fill={color} fillOpacity="0.45" />
        <path d="M92 50 L58 42 L50 50 L58 58 Z" fill={color} fillOpacity="0.45" />
        {/* Core */}
        <circle cx="50" cy="50" r="10" fill={color} />
        <circle cx="50" cy="50" r="4" fill="#FFFAF0" />
      </>
    );
    return (
      <svg
        width={isWordmark ? svgSize * 3.4 : svgSize} height={svgSize}
        viewBox={isWordmark ? '0 0 340 100' : '0 0 100 100'} fill="none"
        xmlns="http://www.w3.org/2000/svg" className={className}
        role="img" aria-label="ATLAS"
      >
        {compass}
        {isWordmark && (
          <text
            x="118" y="50" dominantBaseline="central"
            fill="#F0EAD6" fontSize="52" fontWeight="800"
            fontFamily="'Space Grotesk', 'Syne', system-ui, sans-serif"
            letterSpacing="6"
          >
            ATLAS
          </text>
        )}
      </svg>
    );
  }

  // Compass node positions (8 points + 8 intercardinals = 16 nodes)
  const compassNodes = (() => {
    const nodes: { angle: number; r: number; label: string; size: number }[] = [];
    const cardinalR = 0.82;
    const interR = 0.55;

    // Cardinal directions
    const cardinalLabels = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 2;
      nodes.push({ angle, r: i % 2 === 0 ? cardinalR : interR, label: cardinalLabels[i], size: i % 2 === 0 ? 1 : 0.65 });
    }
    return nodes;
  })();

  const cx = 50, cy = 50, r = 42;

  const getNodePos = (angle: number, radius: number) => ({
    x: cx + Math.cos(angle) * r * radius,
    y: cy + Math.sin(angle) * r * radius,
  });

  return (
    <svg
      width={isHero ? svgSize : svgSize}
      height={isHero ? svgSize * 0.35 : svgSize}
      viewBox={isHero ? '0 0 500 175' : '0 0 100 100'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ATLAS — Your Map to Mastery"
    >
      <defs>
        <radialGradient id="logo-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="50%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="logo-inner-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFAF0" stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </radialGradient>
        <filter id="logo-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="logo-text-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── OUTER AURA ── */}
      <motion.circle
        cx={isHero ? 65 : 50} cy={isHero ? 65 : 50}
        r={isHero ? 55 : 42}
        fill="url(#logo-core-glow)"
        animate={animated ? {
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.08, 1],
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── OUTER RING — Compass Rim ── */}
      <motion.circle
        cx={isHero ? 65 : 50} cy={isHero ? 65 : 50}
        r={isHero ? 48 : 38}
        fill="none"
        stroke={color}
        strokeWidth={isHero ? 1.5 : 1.2}
        strokeOpacity={0.3}
        strokeDasharray="8 4"
        animate={animated ? { rotate: 360, opacity: [0.2, 0.4, 0.2] } : {}}
        transition={{ rotate: { duration: 60, repeat: Infinity, ease: 'linear' }, opacity: { duration: 4, repeat: Infinity } }}
        style={{ transformOrigin: `${isHero ? 65 : 50}px ${isHero ? 65 : 50}px` }}
      />

      {/* ── INNER RING — World Boundary ── */}
      <circle
        cx={isHero ? 65 : 50} cy={isHero ? 65 : 50}
        r={isHero ? 36 : 28}
        fill="none"
        stroke={color}
        strokeWidth={isHero ? 1 : 0.8}
        strokeOpacity={0.2}
      />

      {/* ── COMPASS ROSE — Cardinal Lines ── */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const angle = (deg * Math.PI) / 180;
        const isCardinal = deg % 90 === 0;
        const innerR = isCardinal ? 0.15 : 0.3;
        const x1 = cx + Math.cos(angle) * r * innerR;
        const y1 = cy + Math.sin(angle) * r * innerR;
        const x2 = cx + Math.cos(angle) * r * 0.88;
        const y2 = cy + Math.sin(angle) * r * 0.88;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color}
            strokeWidth={isCardinal ? (isHero ? 1.8 : 1.2) : (isHero ? 0.8 : 0.5)}
            strokeOpacity={isCardinal ? 0.7 : 0.2}
            strokeLinecap="round"
          />
        );
      })}

      {/* ── CONSTELLATION NODES ── */}
      {compassNodes.map((node, i) => {
        const pos = getNodePos(node.angle, node.r);
        const s = node.size * (isHero ? 5 : 3.5);
        return (
          <motion.circle
            key={i}
            cx={pos.x} cy={pos.y} r={s || 3}
            fill={color}
            filter="url(#logo-glow-filter)"
            initial={{ opacity: 0.3, r: s || 3 }}
            animate={animated ? {
              opacity: [0.3, 0.9 + (node.size || 1) * 0.1, 0.3],
              r: [s || 3, (s || 3) * 1.5, s || 3],
            } : {}}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        );
      })}

      {/* ── CORE — The World ── */}
      <motion.g>
        {/* Core aura */}
        <motion.circle
          cx={cx} cy={cy}
          r={isHero ? 14 : 10}
          fill="url(#logo-core-glow)"
          initial={{ r: isHero ? 14 : 10, opacity: 0.6 }}
          animate={animated ? { r: [isHero ? 14 : 10, isHero ? 17 : 12, isHero ? 14 : 10], opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Core solid */}
        <circle cx={cx} cy={cy} r={isHero ? 8 : 5.5} fill="url(#logo-inner-glow)" />
        {/* Inner highlight */}
        <circle cx={cx} cy={cy} r={isHero ? 3 : 2} fill="#FFFAF0" opacity="0.9" />
      </motion.g>

      {/* ── WORDMARK ── */}
      {variant !== 'mark' && (
        <g filter="url(#logo-text-glow)">
          {/* ATLAS text */}
          <motion.text
            x={isHero ? 140 : 62}
            y={isHero ? 85 : 68}
            fontFamily="'Space Grotesk', 'Outfit', system-ui, sans-serif"
            fontWeight={700}
            fontSize={isHero ? 38 : 14}
            fill={color}
            letterSpacing={isHero ? 8 : 3}
            animate={animated ? { opacity: [0.85, 1, 0.85] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ATLAS
          </motion.text>
          {/* Tagline */}
          {isHero && (
            <motion.text
              x={140}
              y={108}
              fontFamily="'Source Serif 4', Georgia, serif"
              fontWeight={400}
              fontSize={11}
              fill="#A09DB8"
              letterSpacing={4}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              YOUR MAP TO MASTERY
            </motion.text>
          )}
          {/* Decorative dot */}
          <circle cx={isHero ? 125 : 58} cy={isHero ? 80 : 66} r={isHero ? 3 : 1.5} fill={color} opacity="0.6" />
        </g>
      )}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// § 3 · ATLAS HERO — "The Living World"
// Interactive Canvas 2D landscape — procedural terrain, atmospheric
// depth, subject territories as glowing biomes, roaming companion
// ═══════════════════════════════════════════════════════════════════

interface LivingWorldHeroProps {
  onEnter?: () => void;
}

interface TerrainPoint {
  x: number;
  y: number;
  amp: number;
  freq: number;
  speed: number;
  color: string;
}

export const AtlasHero: React.FC<LivingWorldHeroProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'day' | 'dusk' | 'night'>('day');
  const [hoveredTerritory, setHoveredTerritory] = useState<string | null>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const companionRef = useRef({ x: 0.5, y: 0.6, vx: 0, vy: 0, phase: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });

    // Check territory hover
    const w2 = rect.width;
    const h2 = rect.height;
    let hovered: string | null = null;
    for (const t of territories) {
      const dx = e.clientX - rect.left - t.x * w2;
      const dy = e.clientY - rect.top - t.y * h2;
      if (Math.sqrt(dx * dx + dy * dy) < t.size * w2 * 0.6) {
        hovered = t.id;
      }
    }
    setHoveredTerritory(hovered);
    canvas.style.cursor = hovered ? 'pointer' : 'default';
  };

  // Subject territories on the landscape
  const territories = useMemo(() => [
    { id: 'physics',   name: 'Physics',   biome: 'Crystal Peaks',    color: '#38BDF8', x: 0.25, y: 0.38, size: 0.12 },
    { id: 'chemistry', name: 'Chemistry', biome: 'Molecular Valleys',color: '#4ADE80', x: 0.45, y: 0.42, size: 0.11 },
    { id: 'biology',   name: 'Biology',   biome: 'Living Grove',     color: '#FB7185', x: 0.65, y: 0.36, size: 0.13 },
    { id: 'maths',     name: 'Mathematics',biome:'Geometric Plains', color: '#A78BFA', x: 0.35, y: 0.52, size: 0.14 },
    { id: 'cs',        name: 'Computer Sci',biome:'Circuit Spires',  color: '#22D3EE', x: 0.55, y: 0.50, size: 0.10 },
    { id: 'geo',       name: 'Geography', biome: 'Topo Highlands',   color: '#34D399', x: 0.75, y: 0.48, size: 0.11 },
    { id: 'english',   name: 'English',   biome: 'Ink Rivers',       color: '#F472B6', x: 0.20, y: 0.55, size: 0.09 },
    { id: 'evs',       name: 'EVS',       biome: 'Verdant Wilds',    color: '#84CC16', x: 0.80, y: 0.40, size: 0.10 },
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random() * 0.6,
      size: Math.random() * 1.5 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 2 + 1,
    }));

    const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }[] = [];

    const getAmbience = (t: number) => {
      const h = new Date().getHours();
      if (h >= 5 && h < 8) return ATLAS_TOKENS.ambience.dawn;
      if (h >= 8 && h < 17) return ATLAS_TOKENS.ambience.day;
      if (h >= 17 && h < 20) return ATLAS_TOKENS.ambience.dusk;
      return ATLAS_TOKENS.ambience.night;
    };

    const noise = (x: number, freq: number): number => {
      return Math.sin(x * freq) * 0.5 + Math.sin(x * freq * 2.3 + 1.3) * 0.3 + Math.sin(x * freq * 0.7 + 2.1) * 0.2;
    };

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      timeRef.current += 0.016;
      const t = timeRef.current;
      const amb = getAmbience(t);

      ctx.clearRect(0, 0, w, h);

      // ── Sky gradient ──
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      amb.sky.forEach((c, i) => {
        skyGrad.addColorStop(i / (amb.sky.length - 1), c);
      });
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Stars (visible at night) ──
      const hour = new Date().getHours();
      const starOpacity = hour >= 20 || hour < 5 ? 0.8 : hour >= 18 ? 0.3 : hour >= 6 ? 0.1 : 0;
      if (starOpacity > 0) {
        stars.forEach(star => {
          const twinkle = Math.sin(t * star.speed + star.twinkle) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,250,240,${twinkle * starOpacity})`;
          ctx.fill();
        });
      }

      // ── Celestial body (sun/moon) ──
      const sunX = w * 0.5 + Math.sin(t * 0.05) * w * 0.2;
      const sunY = h * 0.15 + Math.cos(t * 0.03) * h * 0.05;
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 80);
      sunGrad.addColorStop(0, 'rgba(245,166,35,0.9)');
      sunGrad.addColorStop(0.3, 'rgba(245,166,35,0.3)');
      sunGrad.addColorStop(1, 'rgba(245,166,35,0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Sun disc
      ctx.beginPath();
      ctx.arc(sunX, sunY, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,220,150,0.95)';
      ctx.fill();

      // ── Far mountains ──
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 3) {
        const nx = x / w;
        const y = h * 0.45 + noise(nx + t * 0.02, 3) * h * 0.08 + noise(nx * 2, 7) * h * 0.04;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      const farGrad = ctx.createLinearGradient(0, h * 0.35, 0, h * 0.65);
      farGrad.addColorStop(0, 'rgba(30,20,60,0.9)');
      farGrad.addColorStop(1, 'rgba(20,15,40,0.4)');
      ctx.fillStyle = farGrad;
      ctx.fill();

      // ── Mid mountains ──
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 2) {
        const nx = x / w;
        const y = h * 0.55 + noise(nx * 1.5 + 1.2, 4) * h * 0.1 + noise(nx * 3 + 0.5, 9) * h * 0.05;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      const midGrad = ctx.createLinearGradient(0, h * 0.48, 0, h * 0.75);
      midGrad.addColorStop(0, 'rgba(22,18,50,0.95)');
      midGrad.addColorStop(1, 'rgba(15,12,35,0.6)');
      ctx.fillStyle = midGrad;
      ctx.fill();

      // ── Near terrain ──
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 2) {
        const nx = x / w;
        const baseY = h * 0.68;
        const terrainY = baseY
          + noise(nx * 2 + 2.5, 3) * h * 0.06
          + noise(nx * 4 + 1.8, 7) * h * 0.025
          + mousePos.y * h * 0.03;
        ctx.lineTo(x, terrainY);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      const nearGrad = ctx.createLinearGradient(0, h * 0.6, 0, h);
      nearGrad.addColorStop(0, '#111128');
      nearGrad.addColorStop(1, '#0B0B1A');
      ctx.fillStyle = nearGrad;
      ctx.fill();

      // ── Terrain grid lines ──
      ctx.strokeStyle = 'rgba(245,166,35,0.03)';
      ctx.lineWidth = 0.5;
      for (let row = 0; row < 12; row++) {
        const rowY = h * 0.65 + row * h * 0.035;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const nx = x / w;
          const terrainY = rowY + noise(nx * 2 + row * 0.5, 4) * 15;
          x === 0 ? ctx.moveTo(x, terrainY) : ctx.lineTo(x, terrainY);
        }
        ctx.stroke();
      }

      // ── Subject Territories ──
      territories.forEach(territory => {
        const tx = territory.x * w;
        const ty = territory.y * h;
        const isHovered = hoveredTerritory === territory.id;
        const pulse = Math.sin(t * 1.5 + territory.x * 10) * 0.3 + 0.7;

        // Territory glow
        const glowR = territory.size * w * (isHovered ? 1.5 : 1) * pulse;
        const glow = ctx.createRadialGradient(tx, ty, 0, tx, ty, glowR);
        const subjectColor = ATLAS_TOKENS.subjects[territory.id as keyof typeof ATLAS_TOKENS.subjects]?.core || territory.color;
        glow.addColorStop(0, `${subjectColor}${isHovered ? '55' : '30'}`);
        glow.addColorStop(0.5, `${subjectColor}15`);
        glow.addColorStop(1, `${subjectColor}00`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(tx, ty, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Territory boundary (organic blob)
        ctx.beginPath();
        const points = 32;
        for (let i = 0; i <= points; i++) {
          const a = (i / points) * Math.PI * 2;
          const wobble = noise(a + t * 0.3 + territory.x, 5) * territory.size * w * 0.2;
          const rx = territory.size * w * 0.5 + wobble;
          const ry = territory.size * h * 0.5 + wobble * 0.8;
          const px = tx + Math.cos(a) * rx;
          const py = ty + Math.sin(a) * ry;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = `${subjectColor}08`;
        ctx.fill();
        ctx.strokeStyle = `${subjectColor}${isHovered ? '60' : '25'}`;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Biome label
        ctx.font = `${isHovered ? 11 : 9}px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = `${subjectColor}${isHovered ? 'FF' : 'AA'}`;
        ctx.textAlign = 'center';
        ctx.fillText(isHovered ? territory.name : territory.biome, tx, ty - territory.size * h * 0.3);

        if (isHovered) {
          ctx.font = '8px "Source Serif 4", serif';
          ctx.fillStyle = '#A09DB8';
          ctx.fillText('Click to explore →', tx, ty + territory.size * h * 0.4);
        }

        // Floating particles in territory
        if (Math.random() < 0.03) {
          particles.push({
            x: tx + (Math.random() - 0.5) * territory.size * w,
            y: ty + (Math.random() - 0.5) * territory.size * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.5 - 0.1,
            life: 1,
            color: subjectColor,
            size: Math.random() * 2 + 0.5,
          });
        }
      });

      // ── Companion (Lumina) ──
      const comp = companionRef.current;
      // Wander behavior
      const targetX = 0.5 + Math.sin(t * 0.3) * 0.3 + mousePos.x * 0.15;
      const targetY = 0.55 + Math.cos(t * 0.4) * 0.1 + mousePos.y * 0.05;
      comp.vx += (targetX - comp.x) * 0.003;
      comp.vy += (targetY - comp.y) * 0.003;
      comp.vx *= 0.98;
      comp.vy *= 0.98;
      comp.x += comp.vx;
      comp.y += comp.vy;
      comp.x = Math.max(0.1, Math.min(0.9, comp.x));
      comp.y = Math.max(0.3, Math.min(0.75, comp.y));

      const compPx = comp.x * w;
      const compPy = comp.y * h;
      const compPulse = Math.sin(t * 2 + comp.phase) * 0.3 + 0.7;

      // Lumina glow
      const compGlow = ctx.createRadialGradient(compPx, compPy, 0, compPx, compPy, 40 * compPulse);
      compGlow.addColorStop(0, 'rgba(245,166,35,0.5)');
      compGlow.addColorStop(0.5, 'rgba(245,166,35,0.1)');
      compGlow.addColorStop(1, 'rgba(245,166,35,0)');
      ctx.fillStyle = compGlow;
      ctx.beginPath();
      ctx.arc(compPx, compPy, 40 * compPulse, 0, Math.PI * 2);
      ctx.fill();

      // Lumina body (small glowing orb)
      ctx.beginPath();
      ctx.arc(compPx, compPy, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,220,150,${0.7 + compPulse * 0.3})`;
      ctx.fill();

      // Lumina trail
      ctx.beginPath();
      ctx.moveTo(compPx, compPy);
      for (let i = 1; i <= 6; i++) {
        const trailX = compPx - comp.vx * i * 8;
        const trailY = compPy - comp.vy * i * 8 + Math.sin(t * 3 + i) * 2;
        ctx.lineTo(trailX, trailY);
      }
      ctx.strokeStyle = `rgba(245,166,35,${0.3 - compPulse * 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Trail dots
      for (let i = 1; i <= 4; i++) {
        const dotX = compPx - comp.vx * i * 8;
        const dotY = compPy - comp.vy * i * 8 + Math.sin(t * 3 + i) * 2;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 1.5 - i * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,166,35,${0.4 - i * 0.08})`;
        ctx.fill();
      }

      // ── Update & draw particles ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.008;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.life * 80).toString(16).padStart(2, '0');
        ctx.fill();
      }

      // ── Atmospheric fog ──
      const fogGrad = ctx.createLinearGradient(0, h * 0.6, 0, h);
      fogGrad.addColorStop(0, 'rgba(12,12,26,0)');
      fogGrad.addColorStop(1, 'rgba(12,12,26,0.5)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Vignette ──
      const vigGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.7);
      vigGrad.addColorStop(0, 'rgba(6,6,15,0)');
      vigGrad.addColorStop(1, 'rgba(6,6,15,0.6)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, w, h);

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [mousePos, hoveredTerritory, territories]);

  return (
    <section
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      style={{ background: '#06060F' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
      />

      {/* ── Hero Content Overlay ── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-6 pointer-events-auto inline-flex justify-center"
          >
            <AtlasLogo size={72} variant="hero" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{
              fontFamily: "'Space Grotesk', system-ui",
              background: 'linear-gradient(135deg, #FFFAF0 0%, #F5A623 50%, #FFD080 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(245,166,35,0.3))',
            }}
          >
            Your World of Knowledge
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl mb-10 max-w-xl mx-auto"
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              color: '#A09DB8',
              lineHeight: 1.7,
            }}
          >
            Explore 26 territories across 12 grades. Every subject is a world.
            Every lesson is a path. Every answer, a step toward mastery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 pointer-events-auto justify-center"
          >
            <button
              onClick={onEnter}
              className="group relative px-8 py-4 rounded-2xl font-semibold text-base overflow-hidden"
              style={{
                fontFamily: "'Space Grotesk', system-ui",
                background: 'linear-gradient(135deg, #F5A623, #C7841A)',
                color: '#0C0C1A',
                boxShadow: '0 4px 24px rgba(245,166,35,0.4), 0 0 60px rgba(245,166,35,0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Enter the World
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #FFD080, #F5A623)' }}
              />
            </button>
            <button
              className="px-8 py-4 rounded-2xl font-semibold text-base"
              style={{
                fontFamily: "'Space Grotesk', system-ui",
                background: 'rgba(255,250,240,0.05)',
                color: '#F0EAD6',
                border: '1px solid rgba(255,250,240,0.12)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease',
              }}
            >
              <span className="flex items-center gap-2">
                <Play size={16} />
                Watch the World
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* ── Floating Stats ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 md:gap-16"
        >
          {[
            { value: '26', label: 'Subjects', icon: Globe },
            { value: '12', label: 'Grades', icon: GraduationCap },
            { value: '50K+', label: 'Lessons', icon: BookOpen },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', system-ui", color: '#F5A623' }}>
                {stat.value}
              </div>
              <div className="text-xs mt-1 flex items-center gap-1 justify-center" style={{ color: '#6B6890' }}>
                <stat.icon size={12} /> {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style={{ borderColor: 'rgba(245,166,35,0.3)' }}>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full"
            style={{ background: '#F5A623' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════
// § 4 · ATLAS COMPANION — "Lumina"
// A constellation spirit — bird-shaped glowing entity that drifts
// beside the student, reacts to interactions, and provides gentle
// guidance. Not childish — elegant, ethereal.
// ═══════════════════════════════════════════════════════════════════

interface AtlasCompanionProps {
  mood?: 'idle' | 'happy' | 'thinking' | 'celebrating';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AtlasCompanion: React.FC<AtlasCompanionProps> = ({
  mood = 'idle',
  message,
  size = 'md',
  interactive = true,
  onClick,
  className = '',
}) => {
  const [hovered, setHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [activeMessage, setActiveMessage] = useState('');

  const messages = {
    idle: ['Keep exploring...', 'The path reveals itself', 'Curiosity leads to mastery'],
    happy: ['You\'re on fire! 🔥', 'Amazing progress!', 'The world celebrates with you'],
    thinking: ['Let me guide you...', 'Which path shall we take?', 'Knowledge awaits...'],
    celebrating: ['You did it!', 'A new territory conquered!', 'Mastery grows!'],
  };

  const sizes = { sm: 40, md: 64, lg: 96 };
  const svgSize = sizes[size] ?? 64;

  const handleClick = () => {
    if (!interactive) return;
    const msgs = messages[mood];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    setActiveMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
    onClick?.();
  };

  // Mood-based colors
  const moodColors = {
    idle:    { core: '#F5A623', glow: 'rgba(245,166,35,0.6)' },
    happy:   { core: '#4ADE80', glow: 'rgba(74,222,128,0.7)' },
    thinking:{ core: '#A78BFA', glow: 'rgba(167,139,250,0.6)' },
    celebrating: { core: '#FBBF24', glow: 'rgba(251,191,36,0.8)' },
  };
  const colors = moodColors[mood];

  return (
    <div
      className={`relative inline-flex flex-col items-center ${className}`}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
    >
      {/* ── Message Bubble ── */}
      <AnimatePresence>
        {(showMessage || (hovered && interactive)) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-2xl z-20"
            style={{
              background: 'rgba(28,28,58,0.95)',
              border: '1px solid rgba(245,166,35,0.3)',
              backdropFilter: 'blur(16px)',
              boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 20px ${colors.glow}`,
            }}
          >
            <p className="text-xs" style={{ fontFamily: "'Source Serif 4', serif", color: '#F0EAD6' }}>
              {showMessage ? activeMessage : messages[mood][0]}
            </p>
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
              style={{ background: 'rgba(28,28,58,0.95)', borderRight: '1px solid rgba(245,166,35,0.3)', borderBottom: '1px solid rgba(245,166,35,0.3)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SVG Companion ── */}
      <motion.div
        animate={hovered ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={handleClick}
        className={`${interactive ? 'cursor-pointer' : ''}`}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <defs>
            <radialGradient id={`lumina-glow-${mood}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.core} stopOpacity="0.8" />
              <stop offset="50%" stopColor={colors.core} stopOpacity="0.2" />
              <stop offset="100%" stopColor={colors.core} stopOpacity="0" />
            </radialGradient>
            <filter id="lumina-blur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Outer glow */}
          <motion.circle
            cx="50" cy="50" r={svgSize > 60 ? 40 : 30}
            fill={`url(#lumina-glow-${mood})`}
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Constellation body — bird shape made of connected nodes */}
          <g opacity="0.9">
            {/* Head */}
            <motion.circle
              cx="50" cy="35" r={size === 'sm' ? 3 : 4.5}
              fill={colors.core}
              filter="url(#lumina-blur)"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Body */}
            <motion.circle
              cx="50" cy="52" r={size === 'sm' ? 4 : 6}
              fill={colors.core}
              filter="url(#lumina-blur)"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
            />
            {/* Heart */}
            <circle cx="50" cy="52" r={size === 'sm' ? 1.5 : 2.5} fill="#FFFAF0" opacity="0.8" />

            {/* Wings */}
            <motion.g animate={{ rotate: mood === 'celebrating' ? [0, -5, 5, 0] : [0, -2, 2, 0] }}
              transition={{ duration: mood === 'celebrating' ? 0.4 : 2, repeat: Infinity }}>
              {/* Left wing */}
              {[
                { x: 32, y: 48 }, { x: 22, y: 40 }, { x: 18, y: 45 },
                { x: 20, y: 52 }, { x: 28, y: 55 },
              ].map((p, i) => (
                <motion.circle
                  key={`lw${i}`}
                  cx={p.x} cy={p.y} r={size === 'sm' ? 1.2 : 1.8}
                  fill={colors.core}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
              {/* Left wing connections */}
              {[[50,52,32,48],[32,48,22,40],[22,40,18,45],[18,45,20,52],[20,52,28,55]].map((c,i) => (
                <line key={`lwc${i}`} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]}
                  stroke={colors.core} strokeWidth="0.5" opacity="0.3" />
              ))}

              {/* Right wing */}
              {[
                { x: 68, y: 48 }, { x: 78, y: 40 }, { x: 82, y: 45 },
                { x: 80, y: 52 }, { x: 72, y: 55 },
              ].map((p, i) => (
                <motion.circle
                  key={`rw${i}`}
                  cx={p.x} cy={p.y} r={size === 'sm' ? 1.2 : 1.8}
                  fill={colors.core}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, delay: i * 0.1 + 0.1 }}
                />
              ))}
              {/* Right wing connections */}
              {[[50,52,68,48],[68,48,78,40],[78,40,82,45],[82,45,80,52],[80,52,72,55]].map((c,i) => (
                <line key={`rwc${i}`} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]}
                  stroke={colors.core} strokeWidth="0.5" opacity="0.3" />
              ))}
            </motion.g>

            {/* Tail feathers */}
            {[
              { x: 50, y: 62 }, { x: 46, y: 70 }, { x: 50, y: 73 }, { x: 54, y: 70 },
            ].map((p, i) => (
              <motion.circle
                key={`tail${i}`}
                cx={p.x} cy={p.y} r={size === 'sm' ? 1 : 1.5}
                fill={colors.core}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
            {[[50,62,46,70],[46,70,50,73],[50,73,54,70]].map((c,i) => (
              <line key={`tc${i}`} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]}
                stroke={colors.core} strokeWidth="0.4" opacity="0.25" />
            ))}

            {/* Eyes */}
            <circle cx="46" cy="33" r={size === 'sm' ? 0.8 : 1.2} fill="#FFFAF0" />
            <circle cx="54" cy="33" r={size === 'sm' ? 0.8 : 1.2} fill="#FFFAF0" />
            <motion.circle
              cy="33" r={size === 'sm' ? 0.4 : 0.6} fill="#0C0C1A"
              initial={{ cx: 46.5 }}
              animate={mood === 'thinking' ? { cx: [46.5, 45, 54, 53, 46.5] } : { cx: 46.5 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.circle
              cy="33" r={size === 'sm' ? 0.4 : 0.6} fill="#0C0C1A"
              initial={{ cx: 55.5 }}
              animate={mood === 'thinking' ? { cx: [55.5, 53, 46, 47, 55.5] } : { cx: 55.5 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </g>

          {/* Floating sparkles */}
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 35 + Math.sin(Date.now() * 0.002 + i) * 5;
            return (
              <motion.circle
                key={`sparkle${i}`}
                cx={50 + Math.cos(angle) * radius}
                cy={50 + Math.sin(angle) * radius}
                r={size === 'sm' ? 0.8 : 1.5}
                fill={colors.core}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}
              />
            );
          })}
        </svg>
      </motion.div>

      {size === 'lg' && (
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-xs mt-2"
          style={{ fontFamily: "'Source Serif 4', serif", color: colors.core, opacity: 0.7 }}
        >
          Lumina
        </motion.p>
      )}
    </div>
  );
};

// AnimatePresence polyfill
import { AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════
// § 5 · ATLAS TERRITORY — "Subject Biomes"
// Each subject is a distinct biome territory. The card shows the
// world location, biome type, mastery progress, and visual identity.
// Hovering reveals the landscape within.
// ═══════════════════════════════════════════════════════════════════

interface AtlasTerritoryProps {
  subjectId: keyof typeof ATLAS_TOKENS.subjects;
  mastery?: number; // 0-100
  lessonsCompleted?: number;
  totalLessons?: number;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export const AtlasTerritory: React.FC<AtlasTerritoryProps> = ({
  subjectId,
  mastery = 0,
  lessonsCompleted = 0,
  totalLessons = 20,
  onClick,
  className = '',
  compact = false,
}) => {
  const subject = ATLAS_TOKENS.subjects[subjectId];
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  if (!subject) return null;

  const Icon = subject.icon as React.FC<{ size?: number; strokeWidth?: number }>;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // Terrain generation for biome preview
  const terrainLines = useMemo(() => {
    const lines: { y: number; amp: number; freq: number; speed: number }[] = [];
    for (let i = 0; i < 5; i++) {
      lines.push({
        y: 0.4 + i * 0.12,
        amp: 0.03 + Math.random() * 0.02,
        freq: 3 + Math.random() * 4,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    return lines;
  }, [subjectId]);

  if (compact) {
    return (
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors"
        style={{
          background: hovered ? 'rgba(28,28,58,0.9)' : 'rgba(28,28,58,0.4)',
          border: `1px solid ${hovered ? subject.core + '40' : 'rgba(255,250,240,0.06)'}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${subject.core}20` }}
        >
          <span style={{ color: subject.core, display: 'flex' }}><Icon size={16} strokeWidth={2} /></span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate" style={{ fontFamily: "'Space Grotesk', system-ui", color: '#F0EAD6' }}>
            {subjectId.charAt(0).toUpperCase() + subjectId.slice(1)}
          </div>
        </div>
        <div className="text-xs font-medium" style={{ color: subject.core }}>
          {mastery}%
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="group relative w-full text-left overflow-hidden"
      style={{
        background: 'rgba(17,17,40,0.8)',
        border: `1px solid ${hovered ? subject.core + '40' : 'rgba(255,250,240,0.06)'}`,
        borderRadius: '20px',
        backdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.3), 0 0 40px ${subject.glow}`
          : '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* ── Biome Background ── */}
      <div className="relative h-40 overflow-hidden" style={{ borderRadius: '20px 20px 0 0' }}>
        {/* Terrain sky */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${subject.dark}60 0%, ${subject.dark}20 50%, transparent 100%)`,
          }}
        />

        {/* Terrain contour lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
          {terrainLines.map((line, i) => {
            const baseY = line.y * 100;
            const points = Array.from({ length: 40 }, (_, j) => {
              const x = (j / 39) * 100;
              const y = baseY + Math.sin((x / 100) * Math.PI * line.freq + Date.now() * 0.001 * line.speed) * 3;
              return `${x},${y}`;
            }).join(' ');
            return (
              <motion.polyline
                key={i}
                points={points}
                fill="none"
                stroke={subject.core}
                strokeWidth={0.3}
                strokeOpacity={0.4 + i * 0.05}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />
            );
          })}
        </svg>

        {/* Subject icon in terrain */}
        <motion.div
          animate={{
            y: hovered ? -5 : 0,
            scale: hovered ? 1.1 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `${subject.core}15`,
              border: `1px solid ${subject.core}30`,
              boxShadow: `0 0 30px ${subject.glow}`,
            }}
          >
            <span style={{ color: subject.core, display: 'flex' }}><Icon size={32} strokeWidth={1.5} /></span>
          </div>
        </motion.div>

        {/* Biome name */}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-xs italic" style={{ fontFamily: "'Source Serif 4', serif", color: subject.core, opacity: 0.7 }}>
            {subject.biome}
          </p>
        </div>

        {/* Tilt parallax overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${subject.glow} 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* ── Card Body ── */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className="text-lg font-semibold"
              style={{ fontFamily: "'Space Grotesk', system-ui", color: '#F0EAD6' }}
            >
              {subjectId.charAt(0).toUpperCase() + subjectId.slice(1)}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: '#6B6890', fontFamily: "'Source Serif 4', serif" }}>
              {lessonsCompleted} of {totalLessons} lessons
            </p>
          </div>
          <motion.div
            animate={{ rotate: hovered ? 15 : 0 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <ArrowRight size={18} style={{ color: '#6B6890' }} />
          </motion.div>
        </div>

        {/* Mastery progress bar */}
        <div className="relative">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,250,240,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${subject.core}80, ${subject.core})`,
                boxShadow: `0 0 10px ${subject.glow}`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${mastery}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs" style={{ color: '#6B6890', fontFamily: "'Space Grotesk', system-ui" }}>
              {mastery === 0 ? 'Not started' : mastery < 33 ? 'Beginning' : mastery < 66 ? 'Learning' : mastery < 100 ? 'Advancing' : 'Mastered'}
            </span>
            <span className="text-xs font-medium" style={{ color: subject.core, fontFamily: "'Space Grotesk', system-ui" }}>
              {mastery}%
            </span>
          </div>
        </div>
      </div>

      {/* Corner glow on hover */}
      {hovered && (
        <motion.div
          layoutId={`territory-glow-${subjectId}`}
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: subject.glow, filter: 'blur(40px)', opacity: 0.3 }}
        />
      )}
    </motion.button>
  );
};

// ═══════════════════════════════════════════════════════════════════
// § 6 · ATLAS MASTERY MONUMENT — "Achievements as Landmarks"
// Achievements aren't badges — they're MONUMENTS rising from the world.
// Each monument tells a story through its architecture and glow.
// ═══════════════════════════════════════════════════════════════════

interface MonumentTier {
  name: string;
  color: string;
  height: number;
  icon: string;
}

const MONUMENT_TIERS: Record<string, MonumentTier> = {
  bronze: { name: 'Bronze', color: '#FB923C', height: 40, icon: '◆' },
  silver: { name: 'Silver', color: '#A09DB8', height: 60, icon: '◇' },
  gold:   { name: 'Gold',   color: '#F5A623', height: 80, icon: '★' },
  prism:  { name: 'Prism',  color: '#A78BFA', height: 100, icon: '✦' },
};

interface AtlasMasteryMonumentProps {
  title: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'prism';
  earnedAt?: string;
  xpReward?: number;
  onView?: () => void;
  className?: string;
  showWorld?: boolean;
}

export const AtlasMasteryMonument: React.FC<AtlasMasteryMonumentProps> = ({
  title,
  description,
  tier = 'bronze',
  earnedAt,
  xpReward = 0,
  onView,
  className = '',
  showWorld = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const monTier = MONUMENT_TIERS[tier];
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const pts = Array.from({ length: tier === 'prism' ? 12 : tier === 'gold' ? 8 : 5 }, (_, i) => ({
      x: (Math.random() - 0.5) * 100,
      y: -Math.random() * monTier.height * 0.5,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
    }));
    setParticles(pts);
  }, [tier, monTier.height]);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onView}
      className="relative cursor-pointer group"
      style={{ width: 180, height: 200 }}
    >
      {/* ── World pedestal ── */}
      {showWorld && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-3 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${monTier.color}30, transparent)` }}
        />
      )}

      {/* ── Monument SVG ── */}
      <svg viewBox="0 0 180 200" className="w-full h-full" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`mon-${tier}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={monTier.color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={monTier.color} stopOpacity="0.4" />
          </linearGradient>
          <filter id="mon-glow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="mon-glow-strong">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Base platform */}
        <rect x="50" y="185" width="80" height="8" rx="4"
          fill={`${monTier.color}20`} stroke={`${monTier.color}40`} strokeWidth="0.5" />

        {/* Monument shaft */}
        <motion.rect
          x="72" y={`${185 - monTier.height}`}
          width="36" height={monTier.height}
          rx="4"
          fill={`url(#mon-${tier})`}
          stroke={`${monTier.color}60`}
          strokeWidth="0.5"
          initial={{ scaleY: 0, transformOrigin: 'bottom' }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Tier stripes */}
        {[0.25, 0.5, 0.75].map((pos, i) => (
          <rect
            key={`stripe${i}`}
            x="72" y={185 - monTier.height * pos}
            width="36" height="2"
            fill={monTier.color}
            opacity={0.5 + i * 0.1}
          />
        ))}

        {/* Monument cap */}
        <motion.g
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <polygon
            points={`90,${185 - monTier.height} 72,${185 - monTier.height + 15} 108,${185 - monTier.height + 15}`}
            fill={monTier.color}
            opacity="0.8"
          />
        </motion.g>

        {/* Top icon */}
        <motion.text
          x="90" y={185 - monTier.height + 8}
          textAnchor="middle"
          fontSize="10"
          fill="#FFFAF0"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
        >
          {monTier.icon}
        </motion.text>

        {/* Glow aura */}
        <motion.rect
          x="72" y={`${185 - monTier.height}`}
          width="36" height={monTier.height}
          rx="4"
          fill={`url(#mon-${tier})`}
          filter="url(#mon-glow)"
          animate={{ opacity: hovered ? 0.5 : 0.15 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <motion.circle
            key={i}
            cx={90 + p.x}
            cy={185 - monTier.height + p.y}
            r={p.size ?? 1}
            fill={monTier.color}
            animate={{
              y: [0, -20 - p.y],
              opacity: [0, 0.8, 0],
              x: [0, (Math.random() - 0.5) * 20],
            }}
            transition={{
              duration: 3 + p.delay,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Tier label */}
        <text x="90" y="200" textAnchor="middle" fontSize="7" fill={monTier.color} opacity="0.8"
          fontFamily="'Space Grotesk', sans-serif" fontWeight="600">
          {monTier.name.toUpperCase()}
        </text>
      </svg>

      {/* ── Info overlay ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        className="absolute -bottom-16 left-0 right-0 text-center"
      >
        <p className="text-xs font-medium truncate" style={{ fontFamily: "'Space Grotesk', system-ui", color: monTier.color }}>
          {title}
        </p>
        {xpReward > 0 && (
          <p className="text-xs mt-0.5" style={{ color: '#6B6890', fontFamily: "'Space Grotesk', system-ui" }}>
            +{xpReward} XP
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// § 7 · CORE UI COMPONENTS — Atlas UI Kit
// ═══════════════════════════════════════════════════════════════════

// ── AtlasCard ──────────────────────────────────────────────────────

type CardVariant = 'default' | 'strong' | 'glass' | 'morphism' | 'subject';
type CardPadding = 'sm' | 'md' | 'lg' | 'none';

interface AtlasCardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  onClick?: () => void;
  glowColor?: string;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const cardVariants: Record<CardVariant, React.CSSProperties> = {
  default: {
    background: 'rgba(28,28,58,0.6)',
    border: '1px solid rgba(255,250,240,0.06)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  strong: {
    background: 'rgba(28,28,58,0.85)',
    border: '1px solid rgba(255,250,240,0.1)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
  },
  glass: {
    background: 'rgba(28,28,58,0.4)',
    border: '1px solid rgba(255,250,240,0.08)',
    backdropFilter: 'blur(24px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  morphism: {
    background: 'rgba(28,28,58,0.3)',
    border: '1px solid rgba(255,250,240,0.05)',
    backdropFilter: 'blur(40px) saturate(1.5)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  },
  subject: {
    background: 'rgba(28,28,58,0.7)',
    border: '1px solid rgba(255,250,240,0.08)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  },
};

const cardPadding: Record<CardPadding, string> = {
  none: '0',
  sm: '12px',
  md: '20px',
  lg: '28px',
};

export const AtlasCard: React.FC<AtlasCardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
  glowColor,
  className = '',
  header,
  footer,
}) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const style: React.CSSProperties = {
    ...cardVariants[variant],
    borderRadius: '20px',
    padding: padding === 'none' ? undefined : cardPadding[padding],
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    overflow: 'hidden',
  };

  if (hoverable && onClick) {
    style.transform = hovered ? 'translateY(-4px)' : 'translateY(0)';
    style.boxShadow = hovered
      ? '0 8px 32px rgba(0,0,0,0.3), 0 0 40px rgba(245,166,35,0.08)'
      : '0 2px 8px rgba(0,0,0,0.2)';
  }

  return (
    <motion.div
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => { hoverable && setHovered(false); }}
      onMouseMove={handleMouseMove}
      whileHover={hoverable && onClick ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Mouse-follow glow */}
      {hoverable && hovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${glowColor || 'rgba(245,166,35,0.06)'} 0%, transparent 50%)`,
          }}
        />
      )}

      {header && <div className="mb-3">{header}</div>}
      {children}
      {footer && <div className="mt-3">{footer}</div>}
    </motion.div>
  );
};

// ── AtlasButton ─────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'fab';
type ButtonSize = 'sm' | 'md' | 'lg';

interface AtlasButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  glow?: boolean;
}

const buttonVariants: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #F5A623, #C7841A)',
    color: '#0C0C1A',
    border: 'none',
    fontWeight: 600,
  },
  secondary: {
    background: 'rgba(255,250,240,0.06)',
    color: '#F0EAD6',
    border: '1px solid rgba(255,250,240,0.12)',
  },
  ghost: {
    background: 'transparent',
    color: '#A09DB8',
    border: 'none',
  },
  icon: {
    background: 'rgba(28,28,58,0.6)',
    color: '#A09DB8',
    border: '1px solid rgba(255,250,240,0.06)',
    borderRadius: '12px',
    padding: '8px',
  },
  fab: {
    background: 'linear-gradient(135deg, #F5A623, #C7841A)',
    color: '#0C0C1A',
    border: 'none',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(245,166,35,0.4)',
  },
};

const buttonSizes: Record<ButtonSize, { padding: string; fontSize: string; gap: string }> = {
  sm: { padding: '8px 14px', fontSize: '0.8rem', gap: '6px' },
  md: { padding: '12px 20px', fontSize: '0.9rem', gap: '8px' },
  lg: { padding: '16px 28px', fontSize: '1rem', gap: '10px' },
};

export const AtlasButton: React.FC<AtlasButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  fullWidth = false,
  glow = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    onClick?.();
    setTimeout(() => setRipple(null), 600);
  };

  const baseStyle: React.CSSProperties = {
    ...buttonVariants[variant],
    ...buttonSizes[size],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: buttonSizes[size].gap,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    fontFamily: "'Space Grotesk', system-ui",
    fontSize: buttonSizes[size].fontSize,
    borderRadius: variant === 'fab' ? '16px' : '12px',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    overflow: 'hidden',
    width: fullWidth ? '100%' : 'auto',
    transform: hovered && !disabled ? 'translateY(-1px)' : 'translateY(0)',
  };

  if (variant === 'primary' && glow && !disabled) {
    baseStyle.boxShadow = hovered
      ? '0 4px 24px rgba(245,166,35,0.5), 0 0 60px rgba(245,166,35,0.15)'
      : '0 2px 12px rgba(245,166,35,0.3)';
  }

  if (hovered && !disabled && variant === 'secondary') {
    baseStyle.background = 'rgba(255,250,240,0.1)';
    baseStyle.borderColor = 'rgba(255,250,240,0.2)';
  }

  return (
    <motion.button
      className={className}
      style={baseStyle}
      onClick={handleClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); }}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
    >
      {/* Ripple effect */}
      {ripple && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            background: variant === 'primary' ? 'rgba(255,255,255,0.3)' : 'rgba(245,166,35,0.2)',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {/* Loading spinner */}
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          style={{ borderRightColor: 'transparent' }}
        />
      )}

      {!loading && icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </motion.button>
  );
};

// ── AtlasInput ──────────────────────────────────────────────────────

interface AtlasInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'search' | 'email' | 'password';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const AtlasInput: React.FC<AtlasInputProps> = ({
  placeholder,
  value = '',
  onChange,
  type = 'text',
  size = 'md',
  label,
  error,
  icon,
  disabled = false,
  className = '',
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value.length > 0);
  }, [value]);

  const sizes = {
    sm: { padding: '8px 12px', fontSize: '0.8rem', height: 36 },
    md: { padding: '12px 16px', fontSize: '0.9rem', height: 44 },
    lg: { padding: '14px 20px', fontSize: '1rem', height: 52 },
  };
  const s = sizes[size];

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-xs font-medium mb-1.5" style={{
          fontFamily: "'Space Grotesk', system-ui",
          color: focused ? '#F5A623' : '#A09DB8',
          transition: 'color 0.2s',
        }}>
          {label}
        </label>
      )}
      <div
        className="relative flex items-center rounded-xl transition-all duration-300"
        style={{
          height: s.height,
          background: 'rgba(28,28,58,0.4)',
          border: `1px solid ${focused ? 'rgba(245,166,35,0.5)' : error ? 'rgba(239,68,68,0.5)' : 'rgba(255,250,240,0.08)'}`,
          boxShadow: focused
            ? '0 0 0 3px rgba(245,166,35,0.1), 0 0 20px rgba(245,166,35,0.05)'
            : 'none',
        }}
      >
        {icon && (
          <div className="pl-3.5 flex-shrink-0" style={{ color: focused ? '#F5A623' : '#6B6890' }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => { onChange?.(e.target.value); setHasValue(e.target.value.length > 0); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent outline-none"
          style={{
            padding: s.padding,
            fontSize: s.fontSize,
            fontFamily: "'Space Grotesk', system-ui",
            color: '#F0EAD6',
            '::placeholder': { color: '#4A4870' },
          } as React.CSSProperties}
        />
        {hasValue && !disabled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-3 p-1 rounded-lg hover:bg-white/5"
            onClick={() => onChange?.('')}
            style={{ color: '#6B6890' }}
          >
            <X size={14} />
          </motion.button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs mt-1.5"
          style={{ fontFamily: "'Space Grotesk', system-ui", color: '#EF4444' }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// ── AtlasBadge ──────────────────────────────────────────────────────

type BadgeVariant = 'subject' | 'difficulty' | 'mastery' | 'streak' | 'level' | 'status';
type BadgeSize = 'sm' | 'md' | 'lg';

interface AtlasBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: string;
  icon?: React.ReactNode;
  animated?: boolean;
  className?: string;
}

const badgeStyles: Record<BadgeVariant, React.CSSProperties> = {
  subject: {
    background: 'rgba(56,189,248,0.12)',
    border: '1px solid rgba(56,189,248,0.2)',
    color: '#38BDF8',
  },
  difficulty: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    color: '#F87171',
  },
  mastery: {
    background: 'rgba(245,166,35,0.1)',
    border: '1px solid rgba(245,166,35,0.2)',
    color: '#F5A623',
  },
  streak: {
    background: 'rgba(249,115,22,0.12)',
    border: '1px solid rgba(249,115,22,0.2)',
    color: '#FB923C',
  },
  level: {
    background: 'rgba(167,139,250,0.12)',
    border: '1px solid rgba(167,139,250,0.2)',
    color: '#A78BFA',
  },
  status: {
    background: 'rgba(74,222,128,0.1)',
    border: '1px solid rgba(74,222,128,0.2)',
    color: '#4ADE80',
  },
};

const badgeSizes: Record<BadgeSize, { padding: string; fontSize: string; gap: string; dot: number }> = {
  sm: { padding: '3px 8px', fontSize: '0.65rem', gap: '4px', dot: 4 },
  md: { padding: '4px 10px', fontSize: '0.75rem', gap: '5px', dot: 5 },
  lg: { padding: '6px 14px', fontSize: '0.85rem', gap: '6px', dot: 6 },
};

export const AtlasBadge: React.FC<AtlasBadgeProps> = ({
  label,
  variant = 'subject',
  size = 'md',
  color,
  icon,
  animated = false,
  className = '',
}) => {
  const bs = badgeSizes[size];
  const baseStyle: React.CSSProperties = {
    ...badgeStyles[variant],
    ...(color && { background: `${color}15`, borderColor: `${color}30`, color }),
    display: 'inline-flex',
    alignItems: 'center',
    gap: bs.gap,
    padding: bs.padding,
    fontSize: bs.fontSize,
    fontFamily: "'Space Grotesk', system-ui",
    fontWeight: 600,
    borderRadius: '9999px',
    lineHeight: 1.2,
    transition: 'all 0.3s ease',
  };

  return (
    <motion.span
      className={className}
      style={baseStyle}
      animate={animated ? { opacity: [0, 1], scale: [0.8, 1] } : undefined}
      transition={animated ? { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } : undefined}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {variant === 'streak' && (
        <span
          className="rounded-full flex-shrink-0"
          style={{ width: bs.dot, height: bs.dot, background: '#FB923C' }}
        />
      )}
      {label}
    </motion.span>
  );
};

// ── AtlasProgress ──────────────────────────────────────────────────

interface AtlasProgressProps {
  value: number; // 0-100
  variant?: 'linear' | 'circular' | 'xp';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showValue?: boolean;
  color?: string;
  animated?: boolean;
  className?: string;
}

export const AtlasProgress: React.FC<AtlasProgressProps> = ({
  value,
  variant = 'linear',
  size = 'md',
  label,
  showValue = true,
  color = '#F5A623',
  animated = true,
  className = '',
}) => {
  const safeValue = Math.max(0, Math.min(100, value));

  if (variant === 'circular') {
    const sizes = { sm: 40, md: 56, lg: 80 };
    const svgSize = sizes[size] ?? 56;
    const strokeW = size === 'sm' ? 3 : size === 'md' ? 4 : 5;
    const radius = (svgSize - strokeW * 2) / 2;
    const circumference = radius * 2 * Math.PI;
    const dashoffset = circumference - (safeValue / 100) * circumference;

    return (
      <div className={`relative inline-flex flex-col items-center ${className}`}>
        <svg width={svgSize} height={svgSize} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={svgSize / 2} cy={svgSize / 2} r={radius}
            fill="none"
            stroke="rgba(255,250,240,0.06)"
            strokeWidth={strokeW}
          />
          {/* Progress */}
          <motion.circle
            cx={svgSize / 2} cy={svgSize / 2} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: animated ? dashoffset : circumference }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: 'none' }}
        >
          {showValue && (
            <span className="font-bold" style={{
              fontFamily: "'Space Grotesk', system-ui",
              fontSize: size === 'sm' ? '0.65rem' : size === 'md' ? '0.8rem' : '1.1rem',
              color: '#F0EAD6',
            }}>
              {Math.round(safeValue)}%
            </span>
          )}
        </div>
        {label && (
          <span className="text-xs mt-1.5" style={{ fontFamily: "'Space Grotesk', system-ui", color: '#6B6890' }}>
            {label}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'xp') {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs font-medium" style={{ fontFamily: "'Space Grotesk', system-ui", color: '#A09DB8' }}>{label}</span>}
          {showValue && <span className="text-xs font-bold" style={{ fontFamily: "'Space Grotesk', system-ui", color }}>{Math.round(safeValue)}%</span>}
        </div>
        <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,250,240,0.05)' }}>
          {/* XP track texture */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(255,250,240,0.02) 6px, rgba(255,250,240,0.02) 7px)',
          }} />
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${color}90, ${color})`,
              boxShadow: `0 0 12px ${color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${safeValue}%` }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Glow tip */}
          {safeValue > 0 && (
            <motion.div
              className="absolute top-0 bottom-0 w-1 rounded-full"
              style={{ background: '#FFFAF0', boxShadow: `0 0 8px ${color}80` }}
              initial={{ left: 0 }}
              animate={{ left: `${safeValue}%` }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>
      </div>
    );
  }

  // Linear (default)
  const heights = { sm: 4, md: 8, lg: 14 };
  const heightsFont = { sm: '0.7rem', md: '0.8rem', lg: '0.9rem' };

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-xs font-medium" style={{ fontFamily: "'Space Grotesk', system-ui", color: '#A09DB8' }}>
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-bold" style={{ fontFamily: "'Space Grotesk', system-ui", color: '#F0EAD6' }}>
              {Math.round(safeValue)}%
            </span>
          )}
        </div>
      )}
      <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,250,240,0.05)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 8px ${color}30`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${safeValue}%` }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

// ── AtlasSkeleton ───────────────────────────────────────────────────

interface AtlasSkeletonProps {
  variant?: 'card' | 'list' | 'text' | 'avatar' | 'territory';
  count?: number;
  className?: string;
}

export const AtlasSkeleton: React.FC<AtlasSkeletonProps> = ({
  variant = 'card',
  count = 1,
  className = '',
}) => {
  const shimmer = {
    background: 'linear-gradient(90deg, rgba(255,250,240,0.03) 0%, rgba(255,250,240,0.08) 50%, rgba(255,250,240,0.03) 100%)',
    backgroundSize: '200% 100%',
  };

  const shimmerAnim = {
    backgroundPosition: ['0% 0%', '200% 0%', '0% 0%'],
    transition: { duration: 2, repeat: Infinity, ease: 'linear' },
  };

  const renderCard = () => (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(28,28,58,0.4)', border: '1px solid rgba(255,250,240,0.04)' }}>
      <motion.div className="h-36" style={{ ...shimmer }} animate={shimmerAnim} />
      <div className="p-5 space-y-3">
        <motion.div className="h-5 rounded-lg w-3/4" style={{ ...shimmer }} animate={shimmerAnim} />
        <motion.div className="h-3 rounded-md w-1/2" style={{ ...shimmer }} animate={{ ...shimmerAnim, transition: { ...shimmerAnim.transition, delay: 0.1 } }} />
        <motion.div className="h-2 rounded-full w-full" style={{ ...shimmer }} animate={{ ...shimmerAnim, transition: { ...shimmerAnim.transition, delay: 0.2 } }} />
      </div>
    </div>
  );

  const renderList = () => (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(28,28,58,0.3)' }}>
          <motion.div className="w-10 h-10 rounded-xl flex-shrink-0" style={{ ...shimmer }} animate={shimmerAnim} />
          <div className="flex-1 space-y-2">
            <motion.div className="h-4 rounded-md w-2/3" style={{ ...shimmer }} animate={shimmerAnim} />
            <motion.div className="h-3 rounded-md w-1/3" style={{ ...shimmer }} animate={{ ...shimmerAnim, transition: { ...shimmerAnim.transition, delay: 0.1 } }} />
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderText = () => (
    <div className="space-y-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="h-3 rounded-md"
          style={{ ...shimmer, width: `${60 + Math.random() * 35}%` }}
          animate={shimmerAnim}
        />
      ))}
    </div>
  );

  const renderAvatar = () => (
    <div className="flex items-center gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <motion.div className="w-10 h-10 rounded-full flex-shrink-0" style={{ ...shimmer }} animate={shimmerAnim} />
          <div className="space-y-2">
            <motion.div className="h-4 rounded-md w-24" style={{ ...shimmer }} animate={shimmerAnim} />
            <motion.div className="h-3 rounded-md w-16" style={{ ...shimmer }} animate={{ ...shimmerAnim, transition: { ...shimmerAnim.transition, delay: 0.1 } }} />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTerritory = () => (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(28,28,58,0.4)', border: '1px solid rgba(255,250,240,0.04)' }}>
      <motion.div className="h-36" style={{ ...shimmer }} animate={shimmerAnim} />
      <div className="p-5 space-y-3">
        <motion.div className="h-5 rounded-lg w-1/3" style={{ ...shimmer }} animate={shimmerAnim} />
        <motion.div className="h-2 rounded-full w-full" style={{ ...shimmer }} animate={{ ...shimmerAnim, transition: { ...shimmerAnim.transition, delay: 0.2 } }} />
      </div>
    </div>
  );

  const renderers = { card: renderCard, list: renderList, text: renderText, avatar: renderAvatar, territory: renderTerritory };

  return <div className={className}>{renderers[variant]()}</div>;
};

// ── AtlasEmptyState ─────────────────────────────────────────────────

interface AtlasEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const AtlasEmptyState: React.FC<AtlasEmptyStateProps> = ({
  icon = <Compass size={48} strokeWidth={1} />,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6 p-4 rounded-3xl"
        style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.1)' }}
      >
        <div style={{ color: '#F5A623', opacity: 0.7 }}>
          {icon}
        </div>
      </motion.div>
      <h3
        className="text-xl font-semibold mb-2"
        style={{ fontFamily: "'Space Grotesk', system-ui", color: '#F0EAD6' }}
      >
        {title}
      </h3>
      <p
        className="text-sm max-w-sm mb-6"
        style={{ fontFamily: "'Source Serif 4', serif", color: '#6B6890', lineHeight: 1.7 }}
      >
        {description}
      </p>
      {action}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// § 8 · ATLAS MOTION SYSTEM — "Atlas Movement"
// Framer-motion variants for every interaction pattern in the app.
// Movement feels organic — like elements appearing in a living world.
// ═══════════════════════════════════════════════════════════════════

export const ATLAS_MOTION = {
  // ── Page Transitions ────────────────────────────────────────────
  // Entering a subject should feel like stepping through a portal
  pageEnter: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },

  // Staggered world assembly — elements arrive like terrain forming
  pageStagger: {
    initial: { opacity: 0, y: 30, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },

  // ── Card Interactions ───────────────────────────────────────────
  // Cards feel alive — depth, breathing, magnetic glow
  cardHover: {
    rest: {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    hover: {
      y: -6,
      scale: 1.02,
      boxShadow: '0 12px 40px rgba(0,0,0,0.3), 0 0 40px rgba(245,166,35,0.06)',
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  },

  // 3D tilt on mouse move for cards
  cardTilt: (mouseX: number, mouseY: number) => ({
    rotateX: (mouseY - 0.5) * -8,
    rotateY: (mouseX - 0.5) * 8,
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  }),

  // ── List Entrance ───────────────────────────────────────────────
  // Items appear organically — like growth spreading
  listItem: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.06,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  },

  // ── Mastery Progress ────────────────────────────────────────────
  // The bar fills like water rising — satisfying, alive
  masteryFill: {
    initial: { width: '0%', opacity: 0 },
    animate: (pct: number) => ({
      width: `${pct}%`,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  },

  // Shimmer when mastery crosses a threshold
  masterySpark: {
    initial: { opacity: 0, scale: 1 },
    animate: { opacity: [0, 1, 0], scale: [1, 1.5, 2] },
    transition: { duration: 1.5, ease: 'easeOut' },
  },

  // ── Loading → Content ───────────────────────────────────────────
  // The world assembling itself
  worldAssemble: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: 'easeOut' },
  },

  // Individual elements appearing with slight delay
  worldAppear: (index: number = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }),

  // ── Micro-interactions ──────────────────────────────────────────
  // Button ripple (handled in component, but variants for scale)
  buttonPress: {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },

  // Badge pop-in
  badgePop: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 500, damping: 15, delay: 0.1 },
  },

  // Floating notification
  notificationSlide: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },

  // XP counter increment
  xpCount: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.3, 1] },
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },

  // Streak flame grow
  streakGrow: {
    initial: { scale: 0, rotate: -10 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 500, damping: 12 },
  },

  // Companion float
  companionFloat: {
    animate: {
      y: [0, -8, 0],
      x: [0, 3, -3, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },

  // Modal entrance
  modalEnter: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },

  // Tab indicator slide
  tabIndicator: {
    initial: { left: 0, width: 0 },
    animate: (left: number, width: number) => ({
      left,
      width,
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    }),
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// § 9 · COMPOSITE DEMO — "A Day in the Atlas World"
// Demonstrates all components working together
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// § DEMO — Truncated (will be generated separately)
// ═══════════════════════════════════════════════════════════════════
