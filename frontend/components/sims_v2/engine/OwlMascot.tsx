'use client';
/**
 * OwlMascot — real SVG mascot for junior mode.
 * Moods: happy | thinking | celebrate. Renders Vidya the owl with
 * animated wings, blinking eyes, and a speech bubble.
 */
import { motion } from 'framer-motion';

export function OwlMascot({ mood, speech }: {
    mood: 'happy' | 'thinking' | 'celebrate';
    speech: string | null;
}) {
    const celebrate = mood === 'celebrate';
    return (
        <div className="absolute bottom-4 left-4 z-20 flex items-end gap-2 pointer-events-none">
            <motion.div
                animate={celebrate
                    ? { rotate: [0, -8, 8, 0], scale: [1, 1.12, 1], y: [0, -8, 0] }
                    : { y: [0, -4, 0] }}
                transition={celebrate ? { duration: 0.6 } : { repeat: Infinity, duration: 2.4 }}
                className="select-none">
                <svg width="90" height="100" viewBox="0 0 90 100">
                    {/* body */}
                    <ellipse cx="45" cy="55" rx="30" ry="38" fill="#8b5cf6" />
                    <ellipse cx="45" cy="62" rx="20" ry="26" fill="#c4b5fd" />
                    {/* wings */}
                    <motion.ellipse cx="16" cy="58" rx="9" ry="20" fill="#7c3aed"
                        animate={celebrate ? { rotate: [0, -25, 0] } : {}}
                        style={{ originX: '16px', originY: '40px' }} />
                    <motion.ellipse cx="74" cy="58" rx="9" ry="20" fill="#7c3aed"
                        animate={celebrate ? { rotate: [0, 25, 0] } : {}}
                        style={{ originX: '74px', originY: '40px' }} />
                    {/* eyes */}
                    <circle cx="34" cy="42" r="11" fill="white" />
                    <circle cx="56" cy="42" r="11" fill="white" />
                    <motion.circle cx="34" cy="44" r={mood === 'thinking' ? 4 : 5} fill="#1e293b"
                        animate={{ y: mood === 'thinking' ? [0, 1, 0] : 0 }}
                        transition={{ repeat: Infinity, duration: 2 }} />
                    <motion.circle cx="56" cy="44" r={mood === 'thinking' ? 4 : 5} fill="#1e293b"
                        animate={{ y: mood === 'thinking' ? [0, 1, 0] : 0 }}
                        transition={{ repeat: Infinity, duration: 2 }} />
                    {/* beak */}
                    <path d="M45 50 L41 56 L49 56 Z" fill="#f59e0b" />
                    {/* brow for thinking mood */}
                    {mood === 'thinking' && (
                        <>
                            <line x1="26" y1="30" x2="42" y2="34" stroke="#4c1d95" strokeWidth="3" strokeLinecap="round" />
                            <line x1="64" y1="30" x2="48" y2="34" stroke="#4c1d95" strokeWidth="3" strokeLinecap="round" />
                        </>
                    )}
                    {/* graduation cap for celebrate */}
                    {celebrate && (
                        <>
                            <rect x="28" y="14" width="34" height="8" rx="2" fill="#1e293b" />
                            <rect x="40" y="8" width="10" height="10" fill="#334155" />
                            <line x1="62" y1="18" x2="62" y2="30" stroke="#f59e0b" strokeWidth="2" />
                            <circle cx="62" cy="32" r="3" fill="#f59e0b" />
                        </>
                    )}
                    {/* feet */}
                    <ellipse cx="35" cy="94" rx="8" ry="4" fill="#f59e0b" />
                    <ellipse cx="55" cy="94" rx="8" ry="4" fill="#f59e0b" />
                </svg>
            </motion.div>
            {speech && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/95 rounded-2xl rounded-bl-none px-3 py-2 shadow-lg border-2 border-amber-300 max-w-[220px] mb-6">
                    <p className="text-xs font-bold text-gray-800">{speech}</p>
                </motion.div>
            )}
        </div>
    );
}
