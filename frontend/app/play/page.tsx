'use client';

/**
 * Play — kid-friendly game selection page.
 *
 * Subjects as glass cards, then games within each subject.
 * Atlas design: near-black + gold, font-display headings, motion entrances.
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { loadManifest, loadGame } from '@/lib/game-loader';
import { LazyGameRenderer } from '@/components/simulations/GameRenderer';
import type { GameData } from '@/lib/game-engine/types';
import { LearningAnalytics } from '@/lib/game-engine/analytics/LearningAnalytics';

// ─── Atlas palette (matches /practice) ──────────────────────────

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

interface ManifestEntry {
  gameFile: string;
  classLevel: number;
  subject: string;
  title: string;
}

const SUBJECT_META: Record<string, { emoji: string; name: string }> = {
  maths: { emoji: '🔢', name: 'Maths' },
  science: { emoji: '🔬', name: 'Science' },
  evs: { emoji: '🌍', name: 'EVS' },
  english: { emoji: '📖', name: 'English' },
  social: { emoji: '🗺️', name: 'Social Studies' },
  computer: { emoji: '💻', name: 'Computer' },
};

function getSubjectKey(gameFile: string): string {
  const f = gameFile.toLowerCase();
  if (f.includes('add') || f.includes('sub') || f.includes('mul') || f.includes('div') ||
      f.includes('count') || f.includes('number') || f.includes('pattern') || f.includes('shape') ||
      f.includes('fraction') || f.includes('decimal') || f.includes('percent') ||
      f.includes('angle') || f.includes('area') || f.includes('perimeter') ||
      f.includes('integer') || f.includes('factor') || f.includes('large') ||
      f.includes('mentalmath') || f.includes('operation') || f.includes('measurement') ||
      f.includes('time') || f.includes('weight') || f.includes('data')) return 'maths';
  if (f.includes('computer') || f.includes('software') || f.includes('internet') ||
      f.includes('powerpoint') || f.includes('word') || f.includes('windows') ||
      f.includes('paint') || f.includes('scratch') || f.includes('logo') ||
      f.includes('algorithm') || f.includes('file')) return 'computer';
  if (f.includes('plant') || f.includes('animal') || f.includes('body') || f.includes('health') ||
      f.includes('circulatory') || f.includes('skeletal') || f.includes('matter') ||
      f.includes('mixture') || f.includes('solution') || f.includes('float') ||
      f.includes('light') || f.includes('sound') || f.includes('energy') ||
      f.includes('machine') || f.includes('ecosystem') || f.includes('reproduction') ||
      f.includes('digestion') || f.includes('disease') || f.includes('bird') ||
      f.includes('insect') || f.includes('force') || f.includes('friction') ||
      f.includes('solar') || f.includes('eclipse') || f.includes('weather') ||
      f.includes('air') || f.includes('water') || f.includes('food') ||
      f.includes('skin') || f.includes('adaptation') || f.includes('living')) return 'science';
  return 'evs';
}

/** "ShapeSortGame" → "Shape Sort Game" — friendly, no raw file slugs. */
function friendlyGameTitle(gameFile: string): string {
  return gameFile
    .replace(/Game$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim();
}

export default function PlayPage() {
  const [allGames, setAllGames] = useState<ManifestEntry[]>([]);
  const [manifestLoaded, setManifestLoaded] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<{ gameTitle: string } | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [masteredTopics, setMasteredTopics] = useState<Set<string>>(new Set());
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let savedClass = 1;
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('atlas_student_class');
      if (saved) {
        const n = parseInt(saved, 10);
        if (n >= 1 && n <= 5) {
          savedClass = n;
          setSelectedClass(n);
        }
      }
    }

    loadManifest().then(manifest => {
      const games = manifest.map(g => ({
        gameFile: g.gameFile,
        classLevel: g.classLevel,
        subject: getSubjectKey(g.gameFile),
        title: friendlyGameTitle(g.gameFile),
      }));
      setAllGames(games);
      setManifestLoaded(true);
    }).catch(() => setManifestLoaded(true));

    const analytics = new LearningAnalytics();
    analytics.init('atlas_local_student', 'Student', savedClass);
    const mastered = analytics.getMasteredTopics();
    const keys = new Set<string>();
    mastered.forEach(m => {
      keys.add(m.topic);
      keys.add(`${m.subject}:${m.topic}`);
      keys.add(`${m.subject}/${m.topic}`);
    });
    setMasteredTopics(keys);
  }, []);

  const gamesForClass = allGames.filter(g => g.classLevel === selectedClass);
  const subjectsAvailable = Array.from(new Set(gamesForClass.map(g => g.subject)));
  const gamesForSubject = selectedSubject
    ? gamesForClass.filter(g => g.subject === selectedSubject)
    : [];

  const handleSelectGame = useCallback(async (classLevel: number, gameFile: string) => {
    setLoading(true);
    setScore(null);
    setSelectedGame(null);
    setLoadError(null);
    try {
      const data = await loadGame(classLevel, gameFile);
      setSelectedGame(data);
    } catch (err) {
      console.error('Failed to load game:', err);
      setLoadError({ gameTitle: friendlyGameTitle(gameFile) });
    }
    setLoading(false);
  }, []);

  const retryLastGame = useCallback(() => {
    setRetryToken(t => t + 1);
  }, []);

  // Retry: re-attempt the last failed game once the token changes.
  useEffect(() => {
    if (retryToken === 0) return;
    const last = gamesForSubject.find(g => loadError && g.title === loadError.gameTitle)
      ?? gamesForClass.find(g => loadError && g.title === loadError.gameTitle);
    if (last) handleSelectGame(last.classLevel, last.gameFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryToken]);

  if (selectedGame) {
    return (
      <div
        className="min-h-screen p-2 sm:p-4 flex flex-col items-center"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(251,191,36,0.06) 0%, #0a0a0f 45%, #060609 100%)',
          color: TEXT_PRIMARY,
          fontFamily: BODY_FONT,
        }}
      >
        <div className="w-full max-w-3xl mb-4 flex justify-between items-center px-2 gap-3">
          <button
            onClick={() => { setSelectedGame(null); setScore(null); }}
            className="px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
            style={{
              fontFamily: DISPLAY_FONT,
              color: TEXT_PRIMARY,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            ← Back to Games
          </button>
          <span className="text-sm font-semibold truncate" style={{ fontFamily: DISPLAY_FONT, color: GOLD_PALE }}>
            {friendlyGameTitle(selectedGame.gameFile)}
          </span>
          {score !== null && (
            <div
              className="px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap"
              style={{
                fontFamily: DISPLAY_FONT,
                background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.3)',
                color: MINT,
              }}
            >
              Score: {score}/100
            </div>
          )}
        </div>
        <LazyGameRenderer
          gameData={selectedGame}
          onComplete={(s) => setScore(s)}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 sm:p-8"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(251,191,36,0.06) 0%, #0a0a0f 45%, #060609 100%)',
        color: TEXT_PRIMARY,
        fontFamily: BODY_FONT,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-black mb-2"
            style={{
              fontFamily: DISPLAY_FONT,
              background: 'linear-gradient(135deg, #fde68a, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Pick Your Adventure! 🎯
          </h1>
          <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
            Choose a subject to start learning
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map(c => (
            <button
              key={c}
              onClick={() => { setSelectedClass(c); setSelectedSubject(null); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
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

        <AnimatePresence mode="wait">
          {!selectedSubject && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {subjectsAvailable.map((subjectKey, i) => {
                const meta = SUBJECT_META[subjectKey] || SUBJECT_META.evs;
                const gameCount = gamesForClass.filter(g => g.subject === subjectKey).length;
                return (
                  <motion.button
                    key={subjectKey}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 160, damping: 20 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSubject(subjectKey)}
                    className="glass-card flex flex-col items-center justify-center p-6 rounded-3xl transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="text-4xl mb-2" aria-hidden="true">{meta.emoji}</span>
                    <span className="text-lg font-black" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
                      {meta.name}
                    </span>
                    <span className="text-xs mt-1" style={{ color: GOLD_PALE }}>
                      {gameCount} {gameCount === 1 ? 'game' : 'games'}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {selectedSubject && (
            <motion.div
              key={`games-${selectedSubject}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
                  style={{
                    fontFamily: DISPLAY_FONT,
                    color: TEXT_PRIMARY,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  ← Back
                </button>
                <h2 className="text-xl font-black" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
                  {SUBJECT_META[selectedSubject]?.emoji} {SUBJECT_META[selectedSubject]?.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gamesForSubject.map((g, i) => {
                  const isMastered =
                    masteredTopics.has(g.gameFile) ||
                    masteredTopics.has(`${g.subject}:${g.gameFile}`) ||
                    masteredTopics.has(`${g.subject}/${g.gameFile}`);
                  return (
                    <motion.button
                      key={g.gameFile}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectGame(g.classLevel, g.gameFile)}
                      className="glass-card flex items-center justify-between p-4 rounded-2xl transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                          style={{
                            fontFamily: DISPLAY_FONT,
                            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                            color: '#131118',
                          }}
                        >
                          {i + 1}
                        </div>
                        <span className="font-bold" style={{ color: TEXT_BODY }}>{g.title}</span>
                      </div>
                      {isMastered && (
                        <span className="text-xl" style={{ color: GOLD_LIGHT }} aria-label="Mastered">⭐</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Honest empty state — a class with no games yet */}
        {manifestLoaded && !loading && !selectedSubject && gamesForClass.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-10 text-center max-w-md mx-auto"
          >
            <div className="text-5xl mb-3" aria-hidden="true">🎈</div>
            <h3 className="text-lg font-bold mb-2" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
              No games for Class {selectedClass} yet
            </h3>
            <p className="text-sm mb-5" style={{ color: TEXT_SECONDARY }}>
              We&apos;re building this collection. Try another class, or sharpen skills with practice questions.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
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
              <Link
                href="/practice"
                className="rounded-xl px-5 py-2.5 text-sm font-medium transition-colors"
                style={{
                  fontFamily: DISPLAY_FONT,
                  color: GOLD_PALE,
                  border: '1px solid rgba(245,158,11,0.3)',
                  backgroundColor: 'rgba(245,158,11,0.06)',
                }}
              >
                Practice instead
              </Link>
            </div>
          </motion.div>
        )}

        {/* Friendly error state — a game that failed to load */}
        {loadError && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 max-w-md mx-auto mt-6"
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
                  {loadError.gameTitle} didn&apos;t start
                </p>
                <p className="text-sm mb-3" style={{ color: TEXT_SECONDARY }}>
                  Something interrupted the loading. Nothing was lost — give it another go.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={retryLastGame}
                    className="rounded-xl px-4 py-2 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
                    style={{
                      fontFamily: DISPLAY_FONT,
                      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      color: '#131118',
                    }}
                  >
                    Try again
                  </button>
                  <button
                    onClick={() => setLoadError(null)}
                    className="rounded-xl px-4 py-2 text-sm font-medium transition-colors"
                    style={{
                      fontFamily: DISPLAY_FONT,
                      color: TEXT_SECONDARY,
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                    }}
                  >
                    Pick another game
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading overlay */}
        {loading && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(6,6,9,0.8)', backdropFilter: 'blur(6px)' }}
            role="status"
            aria-live="polite"
          >
            <div className="text-center">
              <motion.div
                className="w-14 h-14 rounded-full mx-auto mb-5"
                style={{
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(251,191,36,0.2)',
                  borderTopColor: GOLD_CORE,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              />
              <motion.p
                className="text-lg font-bold"
                style={{ fontFamily: DISPLAY_FONT, color: GOLD_LIGHT }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                Loading your game…
              </motion.p>
              <p className="text-xs mt-1" style={{ color: TEXT_MUTED }}>
                Slides, challenges and surprises are on the way
              </p>
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm pb-8">
          <Link href="/my-world" className="font-semibold transition-colors hover:opacity-80" style={{ color: GOLD_PALE }}>
            🌍 My World
          </Link>
          <Link href="/parent-dashboard" className="font-semibold transition-colors hover:opacity-80" style={{ color: GOLD_PALE }}>
            📊 Parent Dashboard
          </Link>
          <Link href="/" className="font-semibold transition-colors hover:opacity-80" style={{ color: GOLD_PALE }}>
            🏠 Home
          </Link>
        </div>
      </div>
    </div>
  );
}
