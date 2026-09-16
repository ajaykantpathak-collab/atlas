'use client';

/**
 * Games — full game library across classes 1–5.
 * Atlas design: near-black + gold, glass cards, motion entrances.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LazyGameRenderer } from '@/components/simulations/GameRenderer';
import { loadGame, loadManifest } from '@/lib/game-loader';
import type { GameData } from '@/lib/game-engine/types';

// ─── Atlas palette ──────────────────────────────────────────────

const GOLD = '#f59e0b';
const GOLD_CORE = '#fbbf24';
const GOLD_PALE = '#fde68a';
const GOLD_LIGHT = '#fcd34d';
const MINT = '#34d399';
const TEXT_PRIMARY = '#f0f0f5';
const TEXT_SECONDARY = '#9a9aa8';
const TEXT_MUTED = '#6b6b7a';
const TEXT_BODY = '#c9c9d4';
const DISPLAY_FONT = 'var(--font-display), sans-serif';
const BODY_FONT = "'Plus Jakarta Sans', sans-serif";

/** "ShapeSortGame" → "Shape Sort Game" — friendly, no raw file slugs. */
function friendlyGameTitle(gameFile: string): string {
  return gameFile
    .replace(/Game$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim();
}

function Shimmer({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`rounded-full ${className}`}
      style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
      animate={{ opacity: [0.35, 0.9, 0.35] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay }}
      aria-hidden="true"
    />
  );
}

export default function GameEngineTestPage() {
  const [allGames, setAllGames] = useState<Array<{ gameFile: string; classLevel: number }>>([]);
  const [manifestLoaded, setManifestLoaded] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    loadManifest()
      .then(manifest => {
        setAllGames(manifest.map(g => ({
          gameFile: g.gameFile,
          classLevel: g.classLevel,
        })));
        setManifestLoaded(true);
      })
      .catch(() => setManifestLoaded(true));
  }, []);

  const gamesForClass = allGames.filter(g => g.classLevel === selectedClass);

  const handleSelectGame = async (classLevel: number, gameFile: string) => {
    setLoading(true);
    setScore(null);
    setSelectedGame(null);
    setLoadError(null);
    try {
      const data = await loadGame(classLevel, gameFile);
      setSelectedGame(data);
    } catch (err) {
      console.error('Failed to load game:', err);
      setLoadError(friendlyGameTitle(gameFile));
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen p-4 overflow-x-hidden"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(251,191,36,0.06) 0%, #0a0a0f 45%, #060609 100%)',
        color: TEXT_PRIMARY,
        fontFamily: BODY_FONT,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1
              className="text-3xl font-black"
              style={{
                fontFamily: DISPLAY_FONT,
                background: 'linear-gradient(135deg, #fde68a, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Games
            </h1>
            <p className="text-sm mt-1" style={{ color: TEXT_SECONDARY }}>
              Learn through play — pick a class, then a game.
            </p>
          </div>
          {selectedGame && (
            <button
              onClick={() => { setSelectedGame(null); setScore(null); }}
              className="px-4 py-2 rounded-xl font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-95"
              style={{
                fontFamily: DISPLAY_FONT,
                color: TEXT_PRIMARY,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              ← Back to Games
            </button>
          )}
        </div>

        {/* Class & Game selector — hidden when a game is active */}
        {!selectedGame && (
          <>
            {/* Class selector */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(c => (
                <button
                  key={c}
                  onClick={() => { setSelectedClass(c); setSelectedGame(null); setScore(null); setLoadError(null); }}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${
                    selectedClass === c ? 'scale-105' : 'hover:scale-[1.03]'
                  }`}
                  style={{
                    fontFamily: DISPLAY_FONT,
                    background: selectedClass === c
                      ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                      : 'rgba(255,255,255,0.04)',
                    color: selectedClass === c ? '#131118' : TEXT_SECONDARY,
                    border: selectedClass === c ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: selectedClass === c ? '0 4px 20px rgba(251,191,36,0.3)' : 'none',
                  }}
                >
                  Class {c}
                </button>
              ))}
            </div>

            {/* Game selector for selected class */}
            <div className="flex flex-wrap gap-2 mb-6">
              {gamesForClass.map(g => (
                <button
                  key={`c${g.classLevel}_${g.gameFile}`}
                  onClick={() => handleSelectGame(g.classLevel, g.gameFile)}
                  className="px-3 py-1.5 rounded-lg font-semibold text-xs transition-all hover:scale-[1.04] active:scale-95"
                  style={{
                    fontFamily: BODY_FONT,
                    background: 'rgba(245,158,11,0.08)',
                    color: GOLD_PALE,
                    border: '1px solid rgba(245,158,11,0.2)',
                  }}
                >
                  {friendlyGameTitle(g.gameFile)}
                </button>
              ))}
            </div>

            {/* Honest empty state — manifest loaded but no games for this class */}
            {manifestLoaded && !loading && gamesForClass.length === 0 && (
              <div className="glass-card rounded-3xl p-10 text-center max-w-md mx-auto">
                <div className="text-4xl mb-3" aria-hidden="true">🎮</div>
                <h2 className="text-lg font-bold mb-2" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
                  No games for Class {selectedClass} yet
                </h2>
                <p className="text-sm mb-5" style={{ color: TEXT_SECONDARY }}>
                  This class collection is still being built — try another class.
                </p>
                <button
                  onClick={() => setSelectedClass(c => (c % 5) + 1)}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
                  style={{
                    fontFamily: DISPLAY_FONT,
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: '#131118',
                  }}
                >
                  Browse Class {(selectedClass % 5) + 1}
                </button>
              </div>
            )}
          </>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div
            className="glass-card rounded-3xl p-6 max-w-[720px]"
            style={{ height: 560 }}
            role="status"
            aria-live="polite"
            aria-label="Loading game"
          >
            <div className="flex justify-between mb-5">
              <Shimmer className="h-6 w-40" delay={0.05} />
              <Shimmer className="h-6 w-24" delay={0.15} />
            </div>
            <Shimmer className="h-44 w-full rounded-2xl" delay={0.25} />
            <div className="mt-5 space-y-3">
              <Shimmer className="h-4 w-full" delay={0.35} />
              <Shimmer className="h-4 w-4/5" delay={0.45} />
              <Shimmer className="h-4 w-3/5" delay={0.55} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Shimmer className="h-12 w-full rounded-xl" delay={0.65} />
              <Shimmer className="h-12 w-full rounded-xl" delay={0.75} />
            </div>
            <p className="text-sm mt-6 text-center" style={{ color: TEXT_SECONDARY }}>
              Loading your game…
            </p>
          </div>
        )}

        {/* Friendly error state */}
        {loadError && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 max-w-md"
            style={{
              background: 'rgba(239,68,68,0.07)',
              border: '1px solid rgba(239,68,68,0.25)',
            }}
            role="alert"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">😕</span>
              <div className="flex-1">
                <p className="font-semibold mb-1" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
                  {loadError} didn&apos;t start
                </p>
                <p className="text-sm mb-3" style={{ color: TEXT_SECONDARY }}>
                  Something interrupted the loading. Pick it again from the list above.
                </p>
                <button
                  onClick={() => setLoadError(null)}
                  className="rounded-xl px-4 py-2 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
                  style={{
                    fontFamily: DISPLAY_FONT,
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: '#131118',
                  }}
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {selectedGame && !loading && (
          <div className="space-y-4">
            <LazyGameRenderer
              gameData={selectedGame}
              onComplete={(s) => setScore(s)}
              width={720}
              height={560}
            />

            {score !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-4 inline-block"
                style={{ border: '1px solid rgba(52,211,153,0.3)' }}
              >
                <span className="font-bold" style={{ fontFamily: DISPLAY_FONT, color: MINT }}>
                  Final Score: {score}/100
                </span>
              </motion.div>
            )}
          </div>
        )}

        {!selectedGame && !loading && gamesForClass.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card flex items-center justify-center rounded-3xl max-w-[720px]"
            style={{ height: 320, border: '1px dashed rgba(245,158,11,0.3)' }}
          >
            <div className="text-center" style={{ color: TEXT_SECONDARY }}>
              <div className="text-4xl mb-2" aria-hidden="true">🎮</div>
              <div>Pick a game above to start</div>
              <Link
                href="/play"
                className="inline-block mt-4 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: GOLD_PALE }}
              >
                Or open the kid-friendly game picker →
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
