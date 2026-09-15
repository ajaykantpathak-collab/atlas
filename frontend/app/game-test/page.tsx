'use client';

import { useState, useEffect } from 'react';
import { LazyGameRenderer } from '@/components/simulations/GameRenderer';
import { loadGame, loadManifest } from '@/lib/game-loader';
import type { GameData } from '@/lib/game-engine/types';

export default function GameEngineTestPage() {
  const [allGames, setAllGames] = useState<Array<{ gameFile: string; classLevel: number }>>([]);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    loadManifest().then(manifest => {
      setAllGames(manifest.map(g => ({
        gameFile: g.gameFile,
        classLevel: g.classLevel,
      })));
    });
  }, []);

  const gamesForClass = allGames.filter(g => g.classLevel === selectedClass);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 p-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-white">Games</h1>
          {selectedGame && (
            <button
              onClick={() => { setSelectedGame(null); setScore(null); }}
              className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all"
            >
              ← Back to Games
            </button>
          )}
        </div>

        {/* Class & Game selector — hidden when a game is active */}
        {!selectedGame && (
          <>
            {/* Class selector */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(c => (
                <button
                  key={c}
                  onClick={() => { setSelectedClass(c); setSelectedGame(null); setScore(null); }}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${
                    selectedClass === c
                      ? 'bg-indigo-500 text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Class {c}
                </button>
              ))}
            </div>

            {/* Game selector for selected class */}
            <div className="flex flex-wrap gap-2 mb-6">
              {gamesForClass.map(g => {
                const displayName = g.gameFile
                  .replace(/Game$/, '')
                  .replace(/([A-Z])/g, ' $1')
                  .trim();
                return (
                  <button
                    key={`c${g.classLevel}_${g.gameFile}`}
                    onClick={() => handleSelectGame(g.classLevel, g.gameFile)}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                      'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {displayName}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Game renderer */}
        {loading && (
          <div className="flex items-center justify-center w-[720px] h-[560px] bg-white/10 rounded-3xl">
            <div className="text-white font-semibold">Loading...</div>
          </div>
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
              <div className="bg-white/10 rounded-xl p-4 text-white">
                <span className="font-bold">Final Score: {score}/100</span>
              </div>
            )}
          </div>
        )}

        {!selectedGame && !loading && (
          <div className="flex items-center justify-center w-[720px] h-[560px] bg-white/5 rounded-3xl border-2 border-dashed border-white/20">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">🎮</div>
              <div>Pick a game above to start</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
