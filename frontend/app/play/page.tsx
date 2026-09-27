'use client';

/**
 * Play — kid-friendly game selection page.
 *
 * Subjects as glass cards, then games within each subject.
 * Atlas design: near-black + gold, font-display headings, motion entrances.
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadManifest, loadGame } from '@/lib/game-loader';
import { api } from '@/lib/api';

// OFF-01: offline write queue — game results that can't reach the server
// are parked in localStorage and flushed on next load (no silent loss).
const OUTBOX_KEY = 'atlas_game_outbox';
function queueGameResult(gameFile: string, score: number) {
  try {
    const q = JSON.parse(localStorage.getItem(OUTBOX_KEY) || '[]');
    q.push({ gameFile, score, at: Date.now() });
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(q.slice(-50)));
  } catch {}
}
async function flushGameOutbox() {
  try {
    const q = JSON.parse(localStorage.getItem(OUTBOX_KEY) || '[]');
    if (!q.length) return;
    const left: typeof q = [];
    for (const item of q) {
      try {
        await api.post('/api/progress/game-result', { gameFile: item.gameFile, score: item.score });
      } catch { left.push(item); }
    }
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(left));
  } catch {}
}
import { MasteryStore, type MasteryRecord } from '@/lib/game-engine/MasteryStore';
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
  hindi: { emoji: '🅰️', name: 'Hindi' },
  computer: { emoji: '💻', name: 'Computer' },
};

// ─── Entry placement check — 8 adaptive questions recommend a starting class ─
// Runs once (localStorage 'atlas_placement'), child can retake anytime.
interface PlacementQ { level: number; q: string; options: string[]; answer: string; }
const PLACEMENT_QS: PlacementQ[] = [
  { level: 1, q: 'How many fingers on 2 hands?', options: ['5', '10', '20'], answer: '10' },
  { level: 1, q: 'Which is a vowel letter?', options: ['B', 'A', 'T'], answer: 'A' },
  { level: 2, q: '15 + 7 = ?', options: ['21', '22', '12'], answer: '22' },
  { level: 2, q: 'Which sentence is correct?', options: ['she go school', 'She goes to school.', 'school go she'], answer: 'She goes to school.' },
  { level: 3, q: '24 ÷ 6 = ?', options: ['3', '4', '6'], answer: '4' },
  { level: 3, q: '"Quick" means the same as:', options: ['slow', 'fast', 'lazy'], answer: 'fast' },
  { level: 4, q: 'Half of 36 + 4 = ?', options: ['22', '18', '40'], answer: '22' },
  { level: 4, q: 'Opposite of "ancient" is:', options: ['old', 'modern', 'historic'], answer: 'modern' },
  { level: 5, q: '0.5 as a fraction is:', options: ['1/5', '1/2', '5/1'], answer: '1/2' },
  { level: 5, q: 'Which connects two sentences?', options: ['noun', 'because', 'slowly'], answer: 'because' },
];
const PLACE_KEY = 'atlas_placement';

function PlacementCheck({ onDone }: { onDone: (level: number) => void }) {
  const [i, setI] = useState(0);
  const [right, setRight] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [level, setLevel] = useState(2); // running estimate
  const q = PLACEMENT_QS[i];
  const last = i === PLACEMENT_QS.length - 1;

  const pick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    const ok = opt === q.answer;
    if (ok) { setRight(r => r + 1); setLevel(l => Math.min(5, Math.max(l, q.level + 1))); }
    else setLevel(l => Math.min(l, q.level));
    setTimeout(() => { setPicked(null); setI(n => n + 1); }, 700);
  };

  if (i >= PLACEMENT_QS.length) {
    const rec = Math.max(1, Math.min(5, level));
    return (
      <div className="text-center">
        <div className="text-5xl mb-3">🎯</div>
        <h2 className="text-2xl font-black mb-2" style={{ fontFamily: DISPLAY_FONT, color: GOLD_PALE }}>
          You got {right}/{PLACEMENT_QS.length}!
        </h2>
        <p className="text-sm mb-5" style={{ color: TEXT_SECONDARY }}>
          Best starting point: <b style={{ color: GOLD_PALE }}>Class {rec}</b> games.
          {rec >= 4 ? ' You\'re strong — games will unlock fast!' : ' Build up with the earlier games first!'}
        </p>
        <button onClick={() => onDone(rec)}
          className="px-8 py-3 rounded-2xl font-black text-sm"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_CORE})`, color: '#1a1a1f' }}>
          Start at Class {rec} →
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center gap-1.5 mb-4">
        {PLACEMENT_QS.map((_, j) => (
          <div key={j} className="w-2 h-2 rounded-full" style={{ background: j < i ? MINT : j === i ? GOLD : 'rgba(255,255,255,0.15)' }} />
        ))}
      </div>
      <p className="text-center text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: TEXT_MUTED }}>
        Placement check {i + 1}/{PLACEMENT_QS.length}
      </p>
      <p className="text-center text-lg font-bold mb-5" style={{ color: TEXT_PRIMARY }}>{q.q}</p>
      <div className="flex flex-col gap-2">
        {q.options.map(opt => (
          <button key={opt} onClick={() => pick(opt)} disabled={!!picked}
            className="px-4 py-3 rounded-2xl font-bold text-sm border-2 transition-all text-left"
            style={{
              background: picked === opt ? (opt === q.answer ? 'rgba(52,211,153,0.2)' : 'rgba(244,63,94,0.2)') : 'rgba(255,255,255,0.05)',
              borderColor: picked === opt ? (opt === q.answer ? MINT : '#f43f5e') : 'rgba(255,255,255,0.1)',
              color: TEXT_PRIMARY,
            }}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function getSubjectKey(gameFile: string): string {
  const f = gameFile.toLowerCase();
  // English strand (junior English games are prefixed "Eng"). startsWith, not
  // includes: 'eng' as a substring would catch "MapsLengthGame" (l-ENG-th).
  if (f.startsWith('eng') || f.includes('english') || f.includes('phonics') ||
      f.includes('grammar')) return 'english';
  // Hindi strand — Hin-prefixed games (varnamala, matras, words).
  if (f.startsWith('hin') || f.includes('hindi') || f.includes('varnamala') ||
      f.includes('matra')) return 'hindi';
  // Social studies (geography family: globe/continents/landforms).
  if (f.includes('globe') || f.includes('continent') || f.includes('landform') ||
      f.includes('monument') || f.includes('festival')) return 'social';
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

/** Kid-friendly titles for games whose camel-split reads poorly ("Eng Syn Ant").
 *  Keyed by `c{class}_{gameFile}` (EngTensesGame/EngReadingGame exist in two
 *  classes with different content), falling back to the bare gameFile. */
const FRIENDLY_TITLES: Record<string, string> = {
  EngAlphabetGame: 'Alphabet Adventure',
  'c1_EngAbcMatchGame': 'Big & Small Letters',
  EngPhonicsGame: 'First Sounds',
  EngRhymeGame: 'Rhyme Time',
  EngBlendsGame: 'Sound Blends',
  EngSightWordsGame: 'Sight Word Stars',
  EngSentencesGame: 'Sentence Magic',
  EngNounsGame: 'Naming Words',
  EngVowelsGame: 'Vowel Power',
  'c3_EngReadingGame': 'Little Readers',
  EngVerbsGame: 'Action Words',
  EngOppositesGame: 'Opposite Day',
  'c4_EngTensesGame': 'Tense Time Machine',
  'c5_EngTensesGame': 'Tense Treasures',
  EngSynAntGame: 'Synonyms & Antonyms',
  EngPunctuationGame: 'Punctuation Police',
  EngComprehensionGame: 'Story Detective',
  EngGrammarGame: 'Grammar Gym',
  'c5_EngReadingGame': 'Passage Champions',
  EngSentenceGame: 'Sentence Builders',
};

/** "ShapeSortGame" → "Shape Sort Game" — friendly, no raw file slugs. */
function friendlyGameTitle(gameFile: string, classLevel?: number): string {
  // AdditionGame deliberately mixes addition AND subtraction challenges —
  // the plain "Addition" title misled students about what they'd practice.
  if (gameFile === 'AdditionGame') return 'Add & Subtract';
  const keyed = classLevel ? FRIENDLY_TITLES[`c${classLevel}_${gameFile}`] : undefined;
  if (keyed || FRIENDLY_TITLES[gameFile]) return keyed || FRIENDLY_TITLES[gameFile];
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
  const [mastery, setMastery] = useState<Record<string, MasteryRecord>>({});
  const [simMap, setSimMap] = useState<Record<string, string>>({});
  const [retryToken, setRetryToken] = useState(0);
  const [placing, setPlacing] = useState(false);

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
      } else if (!localStorage.getItem(PLACE_KEY)) {
        setPlacing(true);   // first visit — run the placement check
      }
    }

    loadManifest().then(manifest => {
      const games = manifest.map(g => ({
        gameFile: g.gameFile,
        classLevel: g.classLevel,
        subject: getSubjectKey(g.gameFile),
        title: friendlyGameTitle(g.gameFile, g.classLevel),
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
    setMastery(MasteryStore.getAll());
    fetch('/data/games/_sim_map.json').then(r => r.ok ? r.json() : {}).then(setSimMap).catch(() => {});
    flushGameOutbox();  // OFF-01: push any parked game results on reconnect
    // NAV-01 sync-down: seed local mastery from the backend record —
    // a fresh device or cleared browser gets its progress back.
    api.get<Array<{ gameFile: string; bestScore: number; attempts: number; mastered: boolean }>>(
      '/api/progress/game-mastery'
    ).then(rows => {
      const merged = MasteryStore.mergeFromBackend(rows || []);
      setMastery(merged);
    }).catch(() => {});
  }, []);

  const gamesForClass = allGames.filter(g => g.classLevel === selectedClass);
  const subjectsAvailable = Array.from(new Set(gamesForClass.map(g => g.subject)));
  const gamesForSubject = selectedSubject
    ? gamesForClass.filter(g => g.subject === selectedSubject)
    : [];

  // ── Today's mission — the weakest subject's next unmastered game.
  // Not decoration: weakest-area-first is the highest-yield next step. ──
  const todayMission = useMemo(() => {
    if (!gamesForClass.length || selectedSubject) return null;
    const subjScore = subjectsAvailable.map(s => {
      const games = gamesForClass.filter(g => g.subject === s);
      const done = games.filter(g => mastery[g.gameFile]?.mastered).length;
      return { s, ratio: games.length ? done / games.length : 1, done, total: games.length };
    }).filter(x => x.total > 0).sort((a, b) => a.ratio - b.ratio);
    const weakest = subjScore.find(x => x.done < x.total);
    if (!weakest) return { allDone: true } as const;
    const target = gamesForClass.find(g => g.subject === weakest.s && !mastery[g.gameFile]?.mastered)
      ?? gamesForClass.find(g => g.subject === weakest.s);
    if (!target) return null;
    return {
      subject: weakest.s,
      game: target,
      simId: simMap[target.gameFile],
      done: weakest.done,
      total: weakest.total,
      allDone: false as const,
    };
  }, [gamesForClass, subjectsAvailable, selectedSubject, mastery, simMap]);

  const handleSelectGame = useCallback(async (classLevel: number, gameFile: string) => {
    setLoading(true);
    setScore(null);
    setSelectedGame(null);
    setLoadError(null);
    try {
      const data = await loadGame(classLevel, gameFile);
      if (simMap[gameFile]) data.simId = simMap[gameFile];
      setSelectedGame(data);
    } catch (err) {
      console.error('Failed to load game:', err);
      setLoadError({ gameTitle: friendlyGameTitle(gameFile, classLevel) });
    }
    setLoading(false);
  }, [simMap]);

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

  if (placing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
        style={{ background: 'radial-gradient(ellipse at top, rgba(251,191,36,0.08) 0%, #0a0a0f 45%, #060609 100%)', fontFamily: BODY_FONT }}>
        <div className="w-full max-w-md rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <PlacementCheck onDone={(level) => {
            localStorage.setItem(PLACE_KEY, String(level));
            localStorage.setItem('atlas_student_class', String(level));
            setSelectedClass(level);
            setPlacing(false);
          }} />
        </div>
      </div>
    );
  }

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
            {friendlyGameTitle(selectedGame.gameFile, selectedGame.classLevel)}
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
          onComplete={(s) => {
            setScore(s);
            const rec = MasteryStore.record(`${selectedGame.gameFile}`, s);
            setMastery(m => ({ ...m, [rec.gameFile]: rec }));
            // NAV-01: also persist to the backend — streaks, daily goals,
            // and parent dashboards all read activity_log; localStorage
            // alone left junior play invisible. Fire-and-forget; a dropped
            // log never blocks the child.
            api.post('/api/progress/game-result', {
              gameFile: selectedGame.gameFile,
              score: s,
              mastered: rec.mastered,
              subject: selectedGame.subject,
              classLevel: selectedGame.classLevel,
              title: (selectedGame as { title?: string }).title,
              simId: selectedGame.simId,
            }).catch(() => queueGameResult(selectedGame.gameFile, s));
          }}
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

        {/* ── Today's mission — weakest subject's next unmastered game ── */}
        {!selectedSubject && todayMission && (
          <div className="mb-6">
            {!todayMission.allDone && todayMission.game ? (
              <button
                onClick={() => handleSelectGame(todayMission.game!.classLevel, todayMission.game!.gameFile)}
                className="w-full text-left rounded-3xl p-5 transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(52,211,153,0.08))',
                  border: '1px solid rgba(251,191,36,0.3)',
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🎯</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: GOLD }}>
                      Today's mission — {SUBJECT_META[todayMission.subject]?.name ?? todayMission.subject} needs you ({todayMission.done}/{todayMission.total} done)
                    </p>
                    <p className="text-base font-black truncate mt-0.5" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
                      {todayMission.game.title}
                    </p>
                  </div>
                  {todayMission.simId && (
                    <Link href={`/sims-v2/${todayMission.simId}`} onClick={e => e.stopPropagation()}
                      className="shrink-0 px-3 py-2 rounded-xl text-xs font-black"
                      style={{ background: 'rgba(52,211,153,0.15)', color: MINT, border: '1px solid rgba(52,211,153,0.3)' }}>
                      🧪 Sim
                    </Link>
                  )}
                </div>
              </button>
            ) : (
              <div className="rounded-3xl p-5 text-center"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)' }}>
                <p className="text-sm font-black" style={{ color: MINT }}>🌟 Every game in Class {selectedClass} is mastered — try a harder class!</p>
              </div>
            )}

            {/* FLUENCY-HISTORY: recent reading pace (wpm) from the
                FluencyMeter log — NIPUN fluency tracked over time. */}
            <FluencyTrend />
          </div>
        )}

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
                  const seq = gamesForSubject.map(x => x.gameFile);
                  const isMastered =
                    mastery[g.gameFile]?.mastered ||
                    masteredTopics.has(g.gameFile) ||
                    masteredTopics.has(`${g.subject}:${g.gameFile}`) ||
                    masteredTopics.has(`${g.subject}/${g.gameFile}`);
                  const locked = !MasteryStore.isUnlocked(g.gameFile, i, seq);
                  const prevTitle = i > 0 ? gamesForSubject[i - 1]?.title ?? '' : '';
                  return (
                    <motion.button
                      key={g.gameFile}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={locked ? {} : { scale: 1.02 }}
                      whileTap={locked ? {} : { scale: 0.98 }}
                      onClick={() => { if (!locked) handleSelectGame(g.classLevel, g.gameFile); }}
                      disabled={locked}
                      className="glass-card flex items-center justify-between p-4 rounded-2xl transition-all text-left"
                      style={locked ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                          style={{
                            fontFamily: DISPLAY_FONT,
                            background: locked
                              ? 'rgba(255,255,255,0.08)'
                              : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                            color: locked ? '#9ca3af' : '#131118',
                          }}
                        >
                          {locked ? '🔒' : i + 1}
                        </div>
                        <div>
                          <span className="font-bold block" style={{ color: TEXT_BODY }}>{g.title}</span>
                          {locked && (
                            <span className="text-xs" style={{ color: TEXT_SECONDARY }}>
                              {MasteryStore.lockHint(prevTitle)}
                            </span>
                          )}
                        </div>
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

/** FluencyTrend — reading-pace history from the FluencyMeter log.
 *  Shows the last few wpm readings so a child (and parent) can see
 *  speed going up over days, not just a single score. */
function FluencyTrend() {
  const [reads, setReads] = useState<{ wpm: number }[]>([]);
  useEffect(() => {
    try {
      const log = JSON.parse(localStorage.getItem('atlas_fluency_log') || '[]');
      setReads(log.slice(-6));
    } catch { setReads([]); }
  }, []);
  if (!reads.length) return null;
  const last = reads[reads.length - 1]?.wpm ?? 0;
  const first = reads[0]?.wpm ?? last;
  const delta = last - first;
  return (
    <div className="mt-4 rounded-2xl p-4"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p className="text-xs font-bold text-white/70 mb-2">📖 Reading pace</p>
      <div className="flex items-end gap-2 h-14">
        {reads.map((r, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-t-md transition-all"
              style={{
                height: `${Math.max(8, (r.wpm / Math.max(...reads.map(x => x.wpm), 1)) * 40)}px`,
                background: r.wpm >= 90 ? '#34d399' : r.wpm >= 60 ? '#fbbf24' : '#f87171',
              }} />
            <span className="text-[9px] text-white/40">{r.wpm}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-white/50 mt-2">
        {last} words/min{reads.length > 1 ? ` (${delta >= 0 ? '+' : ''}${delta} since first read)` : ''}
      </p>
    </div>
  );
}
