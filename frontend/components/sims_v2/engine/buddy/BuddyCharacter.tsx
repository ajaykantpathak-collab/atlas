'use client';
/**
 * BuddyCharacter — the buddy kids bond with. A chubby little dragon.
 *
 * Built like a rigged character, not a sticker:
 *  - pupils FOLLOW the cursor (the single biggest "alive" signal)
 *  - breathing cycle, random blinks, ear follow-through on jumps
 *  - squash & stretch on celebrate, lean-in on curious
 *  - stages: egg → spark → cub → drake → legend (size + accessories grow)
 *  - swappable renderer: the buddy system doesn't care what's drawn here
 */
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { BuddyMood, BuddyStage } from './buddyStore';

const PALETTES: Record<string, { body: string; belly: string; dark: string; cheek: string; horn: string }> = {
    violet: { body: '#a78bfa', belly: '#ede9fe', dark: '#7c3aed', cheek: '#f9a8d4', horn: '#fcd34d' },
    teal:   { body: '#5eead4', belly: '#f0fdfa', dark: '#0d9488', cheek: '#fda4af', horn: '#fcd34d' },
    rose:   { body: '#fda4af', belly: '#fff1f2', dark: '#e11d48', cheek: '#fbcfe8', horn: '#a5f3fc' },
    amber:  { body: '#fcd34d', belly: '#fefce8', dark: '#d97706', cheek: '#fca5a5', horn: '#a78bfa' },
};

export interface BuddyCharacterProps {
    mood: BuddyMood;
    stage: BuddyStage;
    color?: string;
    size?: number;               // px width; default scales by stage
}

export function BuddyCharacter({ mood, stage, color = 'violet', size }: BuddyCharacterProps) {
    const p = PALETTES[color] ?? PALETTES.violet;
    const ref = useRef<HTMLDivElement>(null);

    // pupil tracking
    const mx = useMotionValue(0.5); const my = useMotionValue(0.5);
    useEffect(() => {
        const h = (e: MouseEvent) => {
            const r = ref.current?.getBoundingClientRect();
            if (!r) return;
            mx.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
            my.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
        };
        window.addEventListener('mousemove', h);
        return () => window.removeEventListener('mousemove', h);
    }, [mx, my]);
    const px = useTransform(mx, [0, 1], [-3.5, 3.5]);
    const py = useTransform(my, [0, 1], [-2.5, 2.5]);

    // random blinks
    const [blink, setBlink] = useState(false);
    useEffect(() => {
        const t = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 140); },
            2600 + Math.random() * 2400);
        return () => clearInterval(t);
    }, []);

    const celebrate = mood === 'celebrate';
    const worried = mood === 'worried';
    const thinking = mood === 'thinking';
    const happy = mood === 'happy' || celebrate;
    const sleepy = mood === 'sleepy';

    const w = size ?? (stage === 0 ? 110 : stage === 1 ? 130 : stage === 2 ? 160 : stage === 3 ? 190 : 220);

    // ── stage 0: the egg ──
    if (stage === 0) {
        return (
            <motion.div ref={ref} className="select-none" style={{ width: w }}
                animate={{ rotate: [0, -3, 3, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
                <svg viewBox="0 0 120 140" width="100%">
                    <ellipse cx="60" cy="128" rx="34" ry="6" fill="#000" opacity="0.12" />
                    <ellipse cx="60" cy="72" rx="42" ry="55" fill="#fdf4ff" stroke="#d8b4fe" strokeWidth="4" />
                    <ellipse cx="60" cy="72" rx="42" ry="55" fill="url(#eggShine)" opacity="0.5" />
                    <path d="M42 52 q6 -8 12 0" stroke="#d8b4fe" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M66 88 q6 8 12 0" stroke="#d8b4fe" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <circle cx="48" cy="66" r="4" fill="#d8b4fe" opacity="0.6" />
                    <circle cx="74" cy="60" r="3" fill="#d8b4fe" opacity="0.6" />
                    <defs><radialGradient id="eggShine" cx="35%" cy="25%"><stop offset="0%" stopColor="#fff"/><stop offset="100%" stopColor="#fff" stopOpacity="0"/></radialGradient></defs>
                    {/* crack appears near hatch */}
                    <path d="M48 44 l6 8 -5 6 8 8" stroke="#a78bfa" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
                </svg>
            </motion.div>
        );
    }

    const scale = 0.85 + stage * 0.08;      // body grows each stage
    return (
        <div ref={ref} className="select-none" style={{ width: w }}>
            <motion.div
                animate={celebrate
                    ? { y: [0, -26, 0, -14, 0], scaleY: [1, 1.06, 0.9, 1.04, 1], scaleX: [1, 0.94, 1.1, 0.97, 1] }
                    : { y: [0, -6, 0] }}
                transition={celebrate ? { duration: 0.9, repeat: 2 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
                <svg viewBox="0 0 160 175" width="100%">
                    <defs>
                        <radialGradient id={`bdy-${color}`} cx="38%" cy="30%">
                            <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
                            <stop offset="45%" stopColor={p.body} />
                            <stop offset="100%" stopColor={p.dark} />
                        </radialGradient>
                        <linearGradient id={`horn-${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor={p.horn} />
                        </linearGradient>
                    </defs>

                    {/* ground shadow */}
                    <motion.ellipse cx="80" cy="164" rx="42" ry="7" fill="#000" opacity="0.14"
                        animate={celebrate ? { scaleX: [1, 0.8, 1, 0.9, 1] } : {}} />

                    <g transform={`translate(80 96) scale(${scale}) translate(-80 -96)`}>
                        {/* tail */}
                        <motion.path d="M118 120 q22 6 16 -14" fill="none" stroke={p.dark} strokeWidth="9" strokeLinecap="round"
                            animate={{ rotate: [0, 8, 0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 2.6 }}
                            style={{ transformOrigin: '118px 120px' }} />

                        {/* horns — chunky rounded cones, follow-through on movement */}
                        <motion.g style={{ transformOrigin: '52px 42px' }}
                            animate={celebrate ? { rotate: [0, -14, 0] } : { rotate: [0, -4, 0] }}
                            transition={celebrate ? { duration: 0.9 } : { repeat: Infinity, duration: 3.2 }}>
                            <path d="M44 46 C38 32 40 20 52 12 C56 22 58 34 54 46 Z" fill={`url(#horn-${color})`} stroke={p.dark} strokeWidth="2.5" strokeLinejoin="round" />
                            <path d="M46 30 q5 -2 8 0" stroke={p.dark} strokeWidth="1.5" fill="none" opacity="0.4" />
                        </motion.g>
                        <motion.g style={{ transformOrigin: '108px 42px' }}
                            animate={celebrate ? { rotate: [0, 14, 0] } : { rotate: [0, 4, 0] }}
                            transition={celebrate ? { duration: 0.9 } : { repeat: Infinity, duration: 3.2, delay: 0.15 }}>
                            <path d="M116 46 C122 32 120 20 108 12 C104 22 102 34 106 46 Z" fill={`url(#horn-${color})`} stroke={p.dark} strokeWidth="2.5" strokeLinejoin="round" />
                            <path d="M114 30 q-5 -2 -8 0" stroke={p.dark} strokeWidth="1.5" fill="none" opacity="0.4" />
                        </motion.g>

                        {/* body — breathing */}
                        <motion.g style={{ transformOrigin: '80px 100px' }}
                            animate={sleepy ? { scaleY: [1, 1.02, 1] } : { scaleY: [1, 1.03, 1], scaleX: [1, 1.015, 1] }}
                            transition={{ repeat: Infinity, duration: sleepy ? 4 : 2.4, ease: 'easeInOut' }}>
                            <ellipse cx="80" cy="98" rx="52" ry="58" fill={`url(#bdy-${color})`} />
                            {/* belly patch */}
                            <ellipse cx="80" cy="112" rx="32" ry="36" fill={p.belly} opacity="0.95" />
                            {/* rim light */}
                            <path d="M40 70 q-8 28 6 52" fill="none" stroke="#fff" strokeWidth="5" opacity="0.35" strokeLinecap="round" />

                            {/* little arms */}
                            <motion.path d="M32 96 q-14 6 -10 18" fill="none" stroke={p.dark} strokeWidth="9" strokeLinecap="round"
                                animate={celebrate ? { rotate: [0, -30, 0] } : {}} style={{ transformOrigin: '32px 96px' }} />
                            <motion.path d="M128 96 q14 6 10 18" fill="none" stroke={p.dark} strokeWidth="9" strokeLinecap="round"
                                animate={celebrate ? { rotate: [0, 30, 0] } : {}} style={{ transformOrigin: '128px 96px' }} />

                            {/* feet */}
                            <ellipse cx="58" cy="152" rx="14" ry="8" fill={p.dark} />
                            <ellipse cx="102" cy="152" rx="14" ry="8" fill={p.dark} />
                            <ellipse cx="55" cy="150" rx="5" ry="3" fill="#fff" opacity="0.3" />
                            <ellipse cx="99" cy="150" rx="5" ry="3" fill="#fff" opacity="0.3" />
                        </motion.g>

                        {/* face group */}
                        <g>
                            {/* eyes — anime style: gradient iris + layered highlights */}
                            <defs>
                                <radialGradient id={`iris-${color}`} cx="40%" cy="35%">
                                    <stop offset="0%" stopColor="#7dd3fc" />
                                    <stop offset="45%" stopColor="#0ea5e9" />
                                    <stop offset="100%" stopColor="#1e3a8a" />
                                </radialGradient>
                                <radialGradient id={`eyeSh-${color}`} cx="35%" cy="30%">
                                    <stop offset="0%" stopColor="#fff" />
                                    <stop offset="70%" stopColor="#f8fafc" />
                                    <stop offset="100%" stopColor="#e2e8f0" />
                                </radialGradient>
                            </defs>
                            {/* eye whites */}
                            <ellipse cx="62" cy="72" rx="13" ry={blink ? 1.5 : (worried ? 14 : 15)} fill={`url(#eyeSh-${color})`} stroke={p.dark} strokeWidth="1.5" />
                            <ellipse cx="98" cy="72" rx="13" ry={blink ? 1.5 : (worried ? 14 : 15)} fill={`url(#eyeSh-${color})`} stroke={p.dark} strokeWidth="1.5" />
                            {!blink && !sleepy && (
                                <>
                                    {/* iris — gradient, cursor-following */}
                                    <motion.circle cx="62" cy="74" r={worried ? 7 : 8} fill={`url(#iris-${color})`} style={{ x: px, y: py }} />
                                    <motion.circle cx="98" cy="74" r={worried ? 7 : 8} fill={`url(#iris-${color})`} style={{ x: px, y: py }} />
                                    {/* pupil */}
                                    <motion.circle cx="62" cy="74" r={worried ? 3.2 : 3.8} fill="#0f172a" style={{ x: px, y: py }} />
                                    <motion.circle cx="98" cy="74" r={worried ? 3.2 : 3.8} fill="#0f172a" style={{ x: px, y: py }} />
                                    {/* layered highlights — the "alive" sparkle */}
                                    <motion.circle cx="58.5" cy="69.5" r="3" fill="#fff" style={{ x: px, y: py }} />
                                    <motion.circle cx="94.5" cy="69.5" r="3" fill="#fff" style={{ x: px, y: py }} />
                                    <motion.circle cx="65" cy="78" r="1.4" fill="#fff" opacity="0.8" style={{ x: px, y: py }} />
                                    <motion.circle cx="101" cy="78" r="1.4" fill="#fff" opacity="0.8" style={{ x: px, y: py }} />
                                </>
                            )}
                            {sleepy && (
                                <>
                                    <path d="M52 72 q10 8 20 0" stroke={p.dark} strokeWidth="3.5" fill="none" strokeLinecap="round" />
                                    <path d="M88 72 q10 8 20 0" stroke={p.dark} strokeWidth="3.5" fill="none" strokeLinecap="round" />
                                </>
                            )}

                            {/* brows — worried/celebrate */}
                            {worried && (
                                <>
                                    <path d="M50 54 q12 -4 20 4" stroke={p.dark} strokeWidth="3" fill="none" strokeLinecap="round" />
                                    <path d="M110 54 q-12 -4 -20 4" stroke={p.dark} strokeWidth="3" fill="none" strokeLinecap="round" />
                                </>
                            )}

                            {/* cheeks */}
                            <ellipse cx="46" cy="92" rx="8" ry="5" fill={p.cheek} opacity={happy || celebrate ? 0.85 : 0.45} />
                            <ellipse cx="114" cy="92" rx="8" ry="5" fill={p.cheek} opacity={happy || celebrate ? 0.85 : 0.45} />

                            {/* mouth */}
                            {celebrate || happy ? (
                                <path d="M68 96 q12 14 24 0" fill={worried ? 'none' : '#7f1d4d'} stroke={p.dark} strokeWidth="3" strokeLinecap="round" />
                            ) : worried ? (
                                <path d="M70 102 q10 -8 20 0" fill="none" stroke={p.dark} strokeWidth="3" strokeLinecap="round" />
                            ) : thinking ? (
                                <path d="M72 100 q8 -3 16 0" fill="none" stroke={p.dark} strokeWidth="3" strokeLinecap="round" />
                            ) : sleepy ? (
                                <ellipse cx="80" cy="100" rx="6" ry="4" fill="#7f1d4d" opacity="0.7" />
                            ) : (
                                <path d="M70 98 q10 8 20 0" fill="none" stroke={p.dark} strokeWidth="3" strokeLinecap="round" />
                            )}
                            {/* tongue when celebrating */}
                            {celebrate && <ellipse cx="80" cy="104" rx="6" ry="4" fill="#fb7185" />}
                        </g>

                        {/* accessories by stage */}
                        {stage >= 2 && (   /* scarf — wraps neck, tail end flutters */
                            <g>
                                <path d="M50 118 q30 12 60 0 q2 8 -4 12 q-26 10 -52 0 q-6 -4 -4 -12 Z" fill="#f59e0b" stroke={p.dark} strokeWidth="2.5" />
                                <motion.path d="M104 124 q16 2 18 18 q-12 2 -20 -6 Z" fill="#fbbf24" stroke={p.dark} strokeWidth="2"
                                    animate={{ rotate: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
                                    style={{ transformOrigin: '104px 124px' }} />
                            </g>
                        )}
                        {stage >= 3 && (   /* shoulder gems */
                            <>
                                <circle cx="36" cy="86" r="5" fill={p.horn} stroke={p.dark} strokeWidth="1.5" />
                                <circle cx="124" cy="86" r="5" fill={p.horn} stroke={p.dark} strokeWidth="1.5" />
                            </>
                        )}
                        {stage >= 4 && (   /* crown — seated between the horns */
                            <g>
                                <path d="M66 30 l4 -14 10 8 10 -8 4 14 q-14 5 -28 0 Z" fill={p.horn} stroke={p.dark} strokeWidth="2.5" strokeLinejoin="round" />
                                <circle cx="80" cy="18" r="3.5" fill="#f472b6" stroke={p.dark} strokeWidth="1.5" />
                            </g>
                        )}

                        {/* thought dots when thinking */}
                        {thinking && (
                            <g>
                                <motion.circle cx="118" cy="48" r="3" fill={p.dark} opacity="0.6"
                                    animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ repeat: Infinity, duration: 1.4 }} />
                                <motion.circle cx="128" cy="38" r="2.2" fill={p.dark} opacity="0.6"
                                    animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.25 }} />
                            </g>
                        )}

                        {/* hearts burst on celebrate */}
                        {celebrate && (
                            <>
                                {[0, 1, 2].map(i => (
                                    <motion.text key={i} x={30 + i * 45} y={20} fontSize="16"
                                        animate={{ y: [-4, -22], opacity: [0, 1, 0], scale: [0.6, 1.1] }}
                                        transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity }}>💜</motion.text>
                                ))}
                            </>
                        )}
                        {/* Zzz when sleepy */}
                        {sleepy && (
                            <motion.text x="112" y="34" fontSize="18" fill={p.dark} fontWeight="900"
                                animate={{ y: [0, -14], opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1.8 }}>Z</motion.text>
                        )}
                    </g>
                </svg>
            </motion.div>
        </div>
    );
}
