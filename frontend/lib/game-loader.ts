/**
 * Game Data Loader — Loads game JSON files at runtime
 *
 * Fetches game data from /data/games/{class}_{gameFile}.json
 * Caches loaded games in memory.
 */

import type { GameData } from '../lib/game-engine/types';

const gameCache = new Map<string, GameData>();

/**
 * Load a game by class level and game file name.
 * Example: loadGame(1, 'CountingGame') -> loads /data/games/c1_CountingGame.json
 */
export async function loadGame(classLevel: number, gameFile: string): Promise<GameData> {
  const cacheKey = `c${classLevel}_${gameFile}`;

  if (gameCache.has(cacheKey)) {
    return gameCache.get(cacheKey)!;
  }

  const response = await fetch(`/data/games/${cacheKey}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load game: ${cacheKey} (${response.status})`);
  }

  const data = await response.json() as GameData;
  gameCache.set(cacheKey, data);
  return data;
}

/**
 * Load a game by its CISCE node ID.
 * Searches the manifest for the matching node.
 */
export async function loadGameByNodeId(nodeId: string): Promise<GameData | null> {
  // Load manifest
  const manifestResponse = await fetch('/data/games/_manifest.json');
  if (!manifestResponse.ok) return null;

  const manifest = await manifestResponse.json() as Array<{
    gameFile: string;
    classLevel: number;
    cisceNodes: string[];
  }>;

  // Find game with matching node
  const entry = manifest.find(g => g.cisceNodes.includes(nodeId));
  if (!entry) return null;

  return loadGame(entry.classLevel, entry.gameFile);
}

/**
 * Get all games for a class level.
 */
export async function loadGamesForClass(classLevel: number): Promise<GameData[]> {
  const manifestResponse = await fetch('/data/games/_manifest.json');
  if (!manifestResponse.ok) return [];

  const manifest = await manifestResponse.json() as Array<{
    gameFile: string;
    classLevel: number;
    cisceNodes: string[];
  }>;

  const games = manifest
    .filter(g => g.classLevel === classLevel)
    .map(g => loadGame(classLevel, g.gameFile));

  return Promise.all(games);
}

/**
 * Get the full manifest.
 */
export async function loadManifest(): Promise<Array<{
  gameFile: string;
  classLevel: number;
  cisceNodes: string[];
  mascot: string;
  slideCount: number;
  challengeCount: number;
  dataFile: string;
}>> {
  const response = await fetch('/data/games/_manifest.json');
  if (!response.ok) return [];
  return response.json();
}

/**
 * Preload a game into cache (for prefetching).
 */
export async function preloadGame(classLevel: number, gameFile: string): Promise<void> {
  try {
    await loadGame(classLevel, gameFile);
  } catch {
    // Ignore preload errors
  }
}
