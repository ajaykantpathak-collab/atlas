'use client';
/**
 * BuddyHome — the buddy's world, built like a real scene.
 *
 * Layered parallax depth: sky → sun/moon → far hills → near hills →
 * ground → props → buddy. Day/night cycle from real clock. World items
 * are drawn scene elements placed deliberately (nest in the tree,
 * lantern by the door, bunting strung overhead) — not floating emoji.
 *
 * Unlocks at stage-ups fill the world: nest, flower patch, lantern,
 * tree, bird friend, pond, cat friend, victory bunting.
 */
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { useBuddyStore, STAGE_NAMES, STAGE_XP } from './buddyStore';
import { BuddyCharacter } from './BuddyCharacter';

// ─── drawn world items (deliberate placement) ────────────────
function WorldItems({ unlocked }: { unlocked: Set<string> }) {
    return (
        <g>
            {/* big tree — stage 3 */}
            {unlocked.has('tree') && (
                <g>
                    <path d="M38 118 L42 84 L34 84 L46 62 L58 84 L50 84 L54 118 Z" fill="#8d6e63" />
                    <ellipse cx="46" cy="52" rx="30" ry="26" fill="#4ade80" />
                    <ellipse cx="28" cy="62" rx="18" ry="15" fill="#22c55e" />
                    <ellipse cx="64" cy="62" rx="18" ry="15" fill="#22c55e" />
                    <ellipse cx="40" cy="44" rx="16" ry="12" fill="#86efac" opacity="0.7" />
                    {/* nest in the tree — stage 1 item sits here once tree exists */}
                    {unlocked.has('nest') && (
                        <g>
                            <ellipse cx="52" cy="70" rx="10" ry="5" fill="#a16207" />
                            <path d="M43 68 q9 -5 18 0" stroke="#854d0e" strokeWidth="1.5" fill="none" />
                            <circle cx="49" cy="66" r="2" fill="#fef3c7" />
                            <circle cx="55" cy="66" r="2" fill="#fef3c7" />
                        </g>
                    )}
                    {/* bird friend on a branch — stage 3 */}
                    {unlocked.has('friend_bird') && (
                        <motion.g animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                            <circle cx="30" cy="48" r="6" fill="#f87171" />
                            <circle cx="28" cy="45" r="3.5" fill="#fca5a5" />
                            <circle cx="27" cy="44" r="1" fill="#1e293b" />
                            <path d="M24 45 l-3 1 3 1 Z" fill="#f59e0b" />
                        </motion.g>
                    )}
                </g>
            )}

            {/* standalone nest on ground if no tree yet */}
            {unlocked.has('nest') && !unlocked.has('tree') && (
                <g>
                    <ellipse cx="230" cy="118" rx="12" ry="6" fill="#a16207" />
                    <circle cx="227" cy="115" r="2.5" fill="#fef3c7" />
                    <circle cx="233" cy="115" r="2.5" fill="#fef3c7" />
                </g>
            )}

            {/* flower patch — stage 2 */}
            {unlocked.has('flower') && (
                <g>
                    {[0, 1, 2, 3].map(i => (
                        <g key={i} transform={`translate(${185 + i * 16} ${122 - (i % 2) * 4})`}>
                            <line x1="0" y1="0" x2="0" y2="-8" stroke="#16a34a" strokeWidth="1.5" />
                            {[0, 1, 2, 3, 4].map(p => (
                                <circle key={p} cx={Math.cos(p * 1.256) * 4} cy={-10 + Math.sin(p * 1.256) * 4}
                                    r="2.5" fill={['#f472b6', '#fb923c', '#a78bfa', '#f87171'][i % 4]} />
                            ))}
                            <circle cx="0" cy="-10" r="2" fill="#fde047" />
                        </g>
                    ))}
                </g>
            )}

            {/* lantern by the den door — stage 2, glows at night */}
            {unlocked.has('lamp') && (
                <g>
                    <line x1="95" y1="86" x2="95" y2="98" stroke="#475569" strokeWidth="2" />
                    <rect x="90" y="98" width="10" height="12" rx="3" fill="#334155" />
                    <motion.circle cx="95" cy="104" r="4" fill="#fde047"
                        animate={{ opacity: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: 2 }} />
                    <motion.circle cx="95" cy="104" r="8" fill="#fde047" opacity="0.2"
                        animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 2 }} />
                </g>
            )}

            {/* pond — stage 4 */}
            {unlocked.has('fountain') && (
                <g>
                    <ellipse cx="205" cy="122" rx="26" ry="8" fill="#7dd3fc" />
                    <ellipse cx="205" cy="120" rx="26" ry="7" fill="#38bdf8" />
                    <motion.ellipse cx="205" cy="120" rx="12" ry="3" fill="none" stroke="#e0f2fe" strokeWidth="1.5"
                        animate={{ rx: [8, 20], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
                    <motion.path d="M205 118 q-3 -14 0 -18 q3 4 0 18" stroke="#bae6fd" strokeWidth="3" fill="none"
                        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.4 }} />
                </g>
            )}

            {/* cat friend by the den — stage 4 */}
            {unlocked.has('friend_cat') && (
                <motion.g animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
                    <ellipse cx="72" cy="116" rx="9" ry="6" fill="#fbbf24" />
                    <circle cx="65" cy="110" r="5.5" fill="#fcd34d" />
                    <path d="M61 106 l-1 -4 4 2 M69 106 l1 -4 -4 2" stroke="#f59e0b" strokeWidth="1.5" fill="#fcd34d" />
                    <circle cx="63" cy="109" r="0.8" fill="#1e293b" /><circle cx="67" cy="109" r="0.8" fill="#1e293b" />
                    <motion.path d="M80 116 q8 -2 6 -10" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round"
                        animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}
                        style={{ transformOrigin: '80px 116px' }} />
                </motion.g>
            )}

            {/* victory bunting strung across — stage 4 */}
            {unlocked.has('banner') && (
                <g>
                    <path d="M20 30 Q140 62 260 30" stroke="#64748b" strokeWidth="1.5" fill="none" />
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                        const t = i / 7, x = 20 + t * 240, y = 30 + Math.sin(t * Math.PI) * 14 + 6;
                        return <path key={i} d={`M${x} ${y} l5 0 l-2.5 7 Z`} fill={['#f472b6', '#fbbf24', '#38bdf8', '#4ade80'][i % 4]} />;
                    })}
                </g>
            )}
        </g>
    );
}

// ─── the scene ───────────────────────────────────────────────
export function BuddyHome({ width = 720, height = 340, compact = false }: {
    width?: number; height?: number; compact?: boolean;
}) {
    const buddy = useBuddyStore();
    const visit = useBuddyStore(s => s.visit);
    useEffect(() => { visit(); }, [visit]);

    const unlocked = useMemo(() => new Set(buddy.unlockedItems), [buddy.unlockedItems]);
    const hour = new Date().getHours();
    const night = hour < 6 || hour >= 19;

    const nextXp = STAGE_XP[Math.min(buddy.stage + 1, 4)];
    const progress = buddy.stage >= 4 ? 1 : (buddy.xp - STAGE_XP[buddy.stage]) / (nextXp - STAGE_XP[buddy.stage]);

    return (
        <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-amber-300 select-none"
            style={{ width, height }}>
            <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 280 140" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7dd3fc" /><stop offset="60%" stopColor="#bae6fd" /><stop offset="100%" stopColor="#fef9c3" />
                    </linearGradient>
                    <linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e1b4b" /><stop offset="70%" stopColor="#312e81" /><stop offset="100%" stopColor="#4c1d95" />
                    </linearGradient>
                    <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={night ? '#1e3a2f' : '#86efac'} /><stop offset="100%" stopColor={night ? '#14291f' : '#4ade80'} />
                    </linearGradient>
                    <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={night ? '#16301f' : '#4ade80'} /><stop offset="100%" stopColor={night ? '#0f2417' : '#22c55e'} />
                    </linearGradient>
                </defs>

                {/* sky */}
                <rect width="280" height="140" fill={night ? 'url(#skyNight)' : 'url(#skyDay)'} />

                {/* sun or moon */}
                {night ? (
                    <g>
                        <circle cx="238" cy="24" r="13" fill="#fef9c3" />
                        <circle cx="234" cy="20" r="10" fill="#1e1b4b" opacity="0.9" />
                        {[0, 1, 2, 3, 4, 5, 6].map(i => (
                            <motion.circle key={i} cx={20 + i * 38} cy={14 + (i % 3) * 12} r="1.2" fill="#fff"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2 + i * 0.4 }} />
                        ))}
                    </g>
                ) : (
                    <g>
                        <circle cx="238" cy="24" r="15" fill="#fde047" />
                        <circle cx="238" cy="24" r="21" fill="#fde047" opacity="0.25" />
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                            <line key={i} x1={238 + Math.cos(i * 0.785) * 19} y1={24 + Math.sin(i * 0.785) * 19}
                                x2={238 + Math.cos(i * 0.785) * 24} y2={24 + Math.sin(i * 0.785) * 24}
                                stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                        ))}
                    </g>
                )}

                {/* drifting clouds (day) / faint clouds (night) */}
                <motion.g animate={{ x: [-30, 300] }} transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}>
                    <ellipse cx="0" cy="26" rx="20" ry="7" fill="#fff" opacity={night ? 0.15 : 0.85} />
                    <ellipse cx="12" cy="22" rx="14" ry="6" fill="#fff" opacity={night ? 0.15 : 0.85} />
                </motion.g>
                <motion.g animate={{ x: [300, -60] }} transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}>
                    <ellipse cx="0" cy="46" rx="16" ry="6" fill="#fff" opacity={night ? 0.12 : 0.7} />
                </motion.g>

                {/* far hills */}
                <path d="M0 105 Q70 78 140 100 Q210 122 280 96 L280 140 L0 140 Z" fill="url(#hillFar)" opacity="0.85" />

                {/* den — a proper burrow home */}
                <g>
                    <ellipse cx="66" cy="108" rx="30" ry="22" fill="#8b7ec8" />
                    <ellipse cx="66" cy="106" rx="30" ry="20" fill="#a78bfa" />
                    <path d="M44 116 a22 22 0 0 1 44 0 Z" fill="#5b21b6" />
                    <path d="M48 116 a18 18 0 0 1 36 0 Z" fill="#3b0764" />
                    {/* door glow at night */}
                    {night && <ellipse cx="66" cy="112" rx="12" ry="8" fill="#fde047" opacity="0.3" />}
                    {/* window */}
                    <circle cx="82" cy="98" r="4.5" fill={night ? '#fde047' : '#dbeafe'} stroke="#5b21b6" strokeWidth="1.5" />
                    {/* chimney */}
                    <rect x="52" y="82" width="7" height="10" rx="2" fill="#94a3b8" />
                    <motion.path d="M55 80 q3 -4 0 -8" stroke="#e2e8f0" strokeWidth="2.5" fill="none" strokeLinecap="round"
                        animate={{ opacity: [0, 0.7, 0], y: [0, -4] }} transition={{ repeat: Infinity, duration: 3 }} />
                </g>

                {/* near hill / ground */}
                <path d="M0 118 Q90 104 160 114 Q230 124 280 112 L280 140 L0 140 Z" fill="url(#hillNear)" />

                {/* grass tufts + stones */}
                {[30, 110, 150, 200, 250].map(x => (
                    <g key={x} stroke={night ? '#166534' : '#16a34a'} strokeWidth="1.5" strokeLinecap="round">
                        <line x1={x} y1="128" x2={x - 3} y2="122" /><line x1={x} y1="128" x2={x} y2="121" /><line x1={x} y1="128" x2={x + 3} y2="122" />
                    </g>
                ))}
                <ellipse cx="130" cy="130" rx="6" ry="3" fill="#94a3b8" opacity="0.7" />
                <ellipse cx="255" cy="126" rx="8" ry="4" fill="#94a3b8" opacity="0.6" />
                <ellipse cx="100" cy="133" rx="5" ry="2.5" fill="#94a3b8" opacity="0.5" />

                {/* world items — placed scene elements */}
                <WorldItems unlocked={unlocked} />

                {/* fireflies at night */}
                {night && [0, 1, 2, 3].map(i => (
                    <motion.circle key={i} cx={60 + i * 55} cy={90 + (i % 2) * 20} r="1.8" fill="#fde047"
                        animate={{ x: [0, 12, -8, 0], y: [0, -10, 4, 0], opacity: [0.2, 1, 0.4, 0.8] }}
                        transition={{ repeat: Infinity, duration: 5 + i, ease: 'easeInOut' }} />
                ))}
            </svg>

            {/* the buddy — lives in the scene, sized to fit the world */}
            <div className="absolute" style={{ left: '40%', bottom: compact ? 2 : 8 }}>
                <BuddyCharacter mood={night && buddy.mood === 'idle' ? 'sleepy' : buddy.mood}
                    stage={buddy.stage} color={buddy.color} size={compact ? 60 : 95} />
            </div>

            {/* HUD */}
            <div className="absolute top-3 left-3 bg-white/90 rounded-2xl px-4 py-2 shadow border-2 border-amber-200 backdrop-blur">
                <div className="flex items-center gap-2">
                    <span className="font-black text-gold-900">{buddy.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-700">
                        {STAGE_NAMES[buddy.stage]}
                    </span>
                </div>
                <div className="w-36 h-2 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-gold-400 to-fuchsia-500 rounded-full"
                        animate={{ width: `${Math.round(progress * 100)}%` }} />
                </div>
                <div className="text-[10px] font-bold text-gray-500 mt-0.5">
                    {buddy.stage >= 4 ? 'MAX LEVEL 🌟' : `${buddy.xp} / ${nextXp} XP to ${STAGE_NAMES[buddy.stage + 1]}`}
                </div>
            </div>

            {/* level-up celebration */}
            {buddy.justLeveledUp && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 z-30 backdrop-blur-sm"
                    onClick={buddy.clearLevelUp}>
                    <motion.div initial={{ scale: 0.6, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-white rounded-3xl p-6 text-center shadow-2xl border-4 border-amber-400">
                        <div className="text-5xl mb-2">🎉</div>
                        <h3 className="text-xl font-black text-gray-800">{buddy.name} grew into a {STAGE_NAMES[buddy.stage]}!</h3>
                        <p className="text-sm text-gray-500 font-bold mt-1">New things appeared in your world!</p>
                        <p className="text-[10px] text-gray-400 mt-3">tap to continue</p>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
