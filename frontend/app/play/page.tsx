'use client';

/**
 * TopicSelector — kid-friendly topic/game selection page.
 *
 * Shows subjects as colorful cards, then games within each subject.
 * Replaces the developer-style /game-test page for young students.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadManifest, loadGame } from '@/lib/game-loader';
import { LazyGameRenderer } from '@/components/simulations/GameRenderer';
import type { GameData } from '@/lib/game-engine/types';
import { LearningAnalytics } from '@/lib/game-engine/analytics/LearningAnalytics';

interface ManifestEntry {
  gameFile: string;
  classLevel: number;
  subject: string;
  title: string;
}

const SUBJECT_META: Record<string, { emoji: string; color: string; name: string }> = {
  maths: { emoji: '🔢', color: 'from-blue-400 to-indigo-500', name: 'Maths' },
  science: { emoji: '🔬', color: 'from-green-400 to-emerald-500', name: 'Science' },
  evs: { emoji: '🌍', color: 'from-amber-400 to-orange-500', name: 'EVS' },
  english: { emoji: '📖', color: 'from-pink-400 to-rose-500', name: 'English' },
  social: { emoji: '🗺️', color: 'from-purple-400 to-violet-500', name: 'Social Studies' },
  computer: { emoji: '💻', color: 'from-cyan-400 to-blue-500', name: 'Computer' },
};

function getSubjectKey(gameFile: string): string {
  const f = gameFile.toLowerCase();
  if (f.includes('add') || f.includes('sub') || f.includes('mul') || f.includes('div') ||
      f.includes('count') || f.includes('number') || f.includes('pattern') || f.includes('shape') ||
      f.includes('fraction') || f.includes('decimal') || f.includes('percent') ||
      f.includes('angle') || f.includes('area') || f.includes('perimeter') ||
      f.includes('integer') || f.includes('factor') || f.includes('large')) return 'maths';
  if (f.includes('computer') || f.includes('software') || f.includes('internet') || f.includes('powerpoint') || f.includes('word')) return 'computer';
  if (f.includes('plant') || f.includes('animal') || f.includes('body') || f.includes('health') ||
      f.includes('circulatory') || f.includes('skeletal') || f.includes('matter') || f.includes('mixture') ||
      f.includes('solution') || f.includes('float') || f.includes('light') || f.includes('sound') ||
      f.includes('energy') || f.includes('machine') || f.includes('ecosystem') || f.includes('reproduction')) return 'science';
  return 'evs';
}

export default function PlayPage() {
  const [allGames, setAllGames] = useState<ManifestEntry[]>([]);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [masteredTopics, setMasteredTopics] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedClass = localStorage.getItem('atlas_student_class');
      if (savedClass) setSelectedClass(parseInt(savedClass));
    }

    loadManifest().then(manifest => {
      const games = manifest.map(g => ({
        gameFile: g.gameFile,
        classLevel: g.classLevel,
        subject: getSubjectKey(g.gameFile),
        title: g.gameFile.replace(/Game$/, '').replace(/([A-Z])/g, ' $1').trim(),
      }));
      setAllGames(games);
    });

    const analytics = new LearningAnalytics();
    analytics.init('student_001', 'Student', 1);
    const mastered = analytics.getMasteredTopics();
    setMasteredTopics(new Set(mastered.map(m => `${m.subject}/${m.topic}`)));
  }, []);

  const gamesForClass = allGames.filter(g => g.classLevel === selectedClass);
  const subjectsAvailable = Array.from(new Set(gamesForClass.map(g => g.subject)));
  const gamesForSubject = selectedSubject
    ? gamesForClass.filter(g => g.subject === selectedSubject)
    : [];

  const handleSelectGame = async (classLevel: number, gameFile: string) => {
    setLoading(true);
    setScore(null);
    setSelectedGame(null);
    try {
      const data = await loadGame(classLevel, gameFile);
      setSelectedGame(data);
    } catch (err) {
      console.error('Failed to load game:', err);
    }
    setLoading(false);
  };

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-2 sm:p-4 flex flex-col items-center">
        <div className="w-full max-w-3xl mb-4 flex justify-between items-center px-2">
          <button
            onClick={() => { setSelectedGame(null); setScore(null); }}
            className="px-4 py-2 rounded-xl bg-white text-indigo-600 font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            ← Back to Topics
          </button>
          {score !== null && (
            <div className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-bold text-sm">
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-indigo-600 mb-2">
            Pick Your Adventure! 🎯
          </h1>
          <p className="text-gray-500">Choose a subject to start learning</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map(c => (
            <button
              key={c}
              onClick={() => { setSelectedClass(c); setSelectedSubject(null); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                selectedClass === c
                  ? 'bg-indigo-500 text-white shadow-lg scale-105'
                  : 'bg-white text-indigo-400 hover:bg-indigo-50 shadow'
              }`}
            >
              Class {c}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!selectedSubject && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {subjectsAvailable.map(subjectKey => {
                const meta = SUBJECT_META[subjectKey] || SUBJECT_META.evs;
                const gameCount = gamesForClass.filter(g => g.subject === subjectKey).length;
                return (
                  <motion.button
                    key={subjectKey}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSubject(subjectKey)}
                    className={`flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br ${meta.color} text-white shadow-lg hover:shadow-xl transition-all`}
                  >
                    <span className="text-4xl mb-2">{meta.emoji}</span>
                    <span className="text-lg font-black">{meta.name}</span>
                    <span className="text-xs opacity-80 mt-1">{gameCount} games</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {selectedSubject && (
            <motion.div
              key="games"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="px-4 py-2 rounded-xl bg-white text-indigo-600 font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  ← Back
                </button>
                <h2 className="text-xl font-black text-gray-700">
                  {SUBJECT_META[selectedSubject]?.emoji} {SUBJECT_META[selectedSubject]?.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gamesForSubject.map((g, i) => {
                  const isMastered = masteredTopics.has(`${g.subject}/${g.gameFile}`);
                  return (
                    <motion.button
                      key={g.gameFile}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectGame(g.classLevel, g.gameFile)}
                      className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${SUBJECT_META[selectedSubject]?.color} flex items-center justify-center text-white font-bold text-sm`}>
                          {i + 1}
                        </div>
                        <span className="font-bold text-gray-700">{g.title}</span>
                      </div>
                      {isMastered && (
                        <span className="text-green-500 text-xl">⭐</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
            <div className="text-center">
              <div className="text-5xl mb-4 animate-bounce">🎮</div>
              <p className="text-lg font-bold text-indigo-600">Loading your game...</p>
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
          <a href="/my-world" className="text-indigo-500 hover:text-indigo-600 font-semibold">🌍 My World</a>
          <a href="/parent-dashboard" className="text-indigo-500 hover:text-indigo-600 font-semibold">📊 Parent Dashboard</a>
          <a href="/" className="text-indigo-500 hover:text-indigo-600 font-semibold">🏠 Home</a>
        </div>
      </div>
    </div>
  );
}
