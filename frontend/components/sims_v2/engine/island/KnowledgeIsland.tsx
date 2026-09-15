'use client';
/**
 * KnowledgeIsland — the child's mastery rendered as a living island.
 *
 * Three zones, each themed by subject:
 *   left  = Crystal Meadow (maths)   — crystals & number flowers
 *   mid   = Word Grove (language)    — letter trees & books
 *   right = Wild Valley (world)      — creatures & elements
 *
 * Each completed sim grows one item in its zone with a pop-in spring.
 * The buddy walks the island. Empty zones look sparse → kids WANT to
 * fill them. The island is the progress report a parent can read.
 */
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { useIslandStore } from './islandStore';
import { useBuddyStore } from '../buddy/buddyStore';
import { BuddyCharacter } from '../buddy/BuddyCharacter';

const ZONES = [
    { id: 'maths', name: 'Crystal Meadow', x: 0,   w: 90,  color: '#a78bfa', sky: '#c4b5fd', ground: '#8b5cf6' },
    { id: 'lang',  name: 'Word Grove',     x: 95,  w: 90,  color: '#34d399', sky: '#a7f3d0', ground: '#10b981' },
    { id: 'world', name: 'Wild Valley',    x: 190, w: 90,  color: '#fbbf24', sky: '#fde68a', ground: '#f59e0b' },
] as const;

// item slot positions inside each zone (x offsets within zone, y)
const SLOTS = [
    { dx: 12, y: 96 }, { dx: 34, y: 102 }, { dx: 56, y: 98 }, { dx: 22, y: 108 },
    { dx: 46, y: 110 }, { dx: 68, y: 104 }, { dx: 10, y: 116 }, { dx: 40, y: 118 },
    { dx: 62, y: 114 }, { dx: 26, y: 122 }, { dx: 74, y: 120 },
];

export function KnowledgeIsland({ width = 760, height = 380, compact = false }: {
    width?: number; height?: number; compact?: boolean;
}) {
    const island = useIslandStore();
    const buddy = useBuddyStore();
    const visit = useBuddyStore(s => s.visit);
    useEffect(() => { visit(); }, [visit]);

    const byZone = useMemo(() => {
        const m: Record<string, typeof island.grown> = { maths: [], lang: [], world: [] };
        island.grown.forEach(g => m[g.zone]?.push(g));
        return m;
    }, [island.grown]);

    const total = island.grown.length;

    return (
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 select-none"
            style={{ width, height }}>
            <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 280 150" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="isSky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7dd3fc" /><stop offset="65%" stopColor="#e0f2fe" /><stop offset="100%" stopColor="#fef3c7" />
                    </linearGradient>
                    <radialGradient id="isShine" cx="50%" cy="20%">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.6" /><stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <rect width="280" height="150" fill="url(#isSky)" />
                <circle cx="140" cy="60" r="60" fill="url(#isShine)" />
                <circle cx="248" cy="26" r="14" fill="#fde047" />
                <circle cx="248" cy="26" r="20" fill="#fde047" opacity="0.2" />
                {/* clouds */}
                <motion.g animate={{ x: [-40, 320] }} transition={{ repeat: Infinity, duration: 70, ease: 'linear' }}>
                    <ellipse cx="0" cy="24" rx="18" ry="6" fill="#fff" opacity="0.85" />
                </motion.g>
                <motion.g animate={{ x: [320, -60] }} transition={{ repeat: Infinity, duration: 95, ease: 'linear' }}>
                    <ellipse cx="0" cy="42" rx="14" ry="5" fill="#fff" opacity="0.7" />
                </motion.g>

                {/* floating island base — rocky underside */}
                <path d="M30 88 Q140 76 250 88 L232 118 Q140 132 48 118 Z" fill="#94a3b8" />
                <path d="M48 118 Q140 132 232 118 L222 128 Q140 140 58 128 Z" fill="#64748b" />
                {/* hanging rocks */}
                <path d="M70 122 l4 10 -6 -2 Z M140 128 l5 12 -7 -3 Z M200 122 l5 9 -7 -1 Z" fill="#64748b" />

                {/* zone grounds */}
                {ZONES.map(z => (
                    <g key={z.id}>
                        <ellipse cx={z.x + z.w / 2} cy="86" rx={z.w / 2 + 4} ry="16" fill={z.ground} />
                        <ellipse cx={z.x + z.w / 2} cy="82" rx={z.w / 2} ry="13" fill={z.sky} opacity="0.55" />
                    </g>
                ))}

                {/* zone props — themed scenery even when empty */}
                {/* maths: crystal spires */}
                <path d="M20 92 l5 -14 5 14 Z M36 94 l4 -10 4 10 Z" fill="#c4b5fd" opacity="0.6" />
                {/* lang: a bare tree */}
                <path d="M118 96 L120 80 L114 80 L124 68 L132 80 L126 80 L128 96 Z" fill="#65a30d" opacity="0.5" />
                {/* world: a hill bump + flower stem */}
                <path d="M236 96 q10 -12 20 0" fill="#84cc16" opacity="0.5" />

                {/* grown items — knowledge made visible */}
                {island.grown.map((g, i) => {
                    const zone = ZONES.find(z => z.id === g.zone)!;
                    const slot = SLOTS[i % SLOTS.length];
                    const x = zone.x + slot.dx;
                    const y = slot.y;
                    return (
                        <motion.g key={g.simId}
                            initial={{ scale: 0, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}>
                            <ellipse cx={x} cy={y + 6} rx="7" ry="2.5" fill="#000" opacity="0.12" />
                            <motion.g animate={{ y: [0, -3, 0] }}
                                transition={{ repeat: Infinity, duration: 2.5 + (i % 3) * 0.4 }}>
                                <text x={x} y={y} fontSize="15" textAnchor="middle">{g.emoji}</text>
                            </motion.g>
                        </motion.g>
                    );
                })}
            </svg>

            {/* the buddy walks the island */}
            <div className="absolute" style={{ left: '47%', bottom: 26 }}>
                <BuddyCharacter mood={buddy.mood} stage={buddy.stage} color={buddy.color}
                    size={compact ? 52 : 78} />
            </div>

            {/* HUD — name + per-zone mastery */}
            <div className="absolute top-3 left-3 bg-white/90 rounded-2xl px-4 py-2.5 shadow border-2 border-amber-200 backdrop-blur">
                <div className="font-black text-gray-800 text-sm">{buddy.name}'s Island</div>
                <div className="flex gap-3 mt-1.5">
                    {ZONES.map(z => (
                        <div key={z.id} className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: z.color }} />
                            <span className="text-[10px] font-bold text-gray-600">{byZone[z.id].length}</span>
                        </div>
                    ))}
                    <span className="text-[10px] font-black text-amber-600">{total} grown 🌱</span>
                </div>
            </div>

            {/* empty-state hint */}
            {total === 0 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 rounded-2xl px-4 py-2 shadow border-2 border-amber-200">
                    <p className="text-xs font-bold text-gray-700 text-center">
                        Your island is empty — complete a sim and watch something grow! 🌱
                    </p>
                </div>
            )}
        </div>
    );
}
