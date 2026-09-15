'use client';
/**
 * buddyStore — persistent buddy state (zustand + localStorage).
 *
 * The buddy is a relationship, not a decoration:
 *   stages:   egg → spark → cub → drake → legend   (earned via stars)
 *   mood:     idle | happy | thinking | celebrate | worried | sleepy
 *   bond:     interactions accumulate — the buddy remembers you
 *   world:    unlocked items fill the home scene
 *
 * Stars from sims feed the buddy (1 star = 10xp). Stage thresholds:
 *   0 egg (0xp), 1 spark (30xp), 2 cub (100xp), 3 drake (250xp), 4 legend (500xp)
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BuddyStage = 0 | 1 | 2 | 3 | 4;
export type BuddyMood = 'idle' | 'happy' | 'thinking' | 'celebrate' | 'worried' | 'sleepy';

export const STAGE_XP = [0, 30, 100, 250, 500];
export const STAGE_NAMES = ['Mystery Egg', 'Spark', 'Cub', 'Drake', 'Legend'];

export interface BuddyState {
    name: string;
    color: string;                    // 'violet' | 'teal' | 'rose' | 'amber'
    xp: number;
    stage: BuddyStage;
    mood: BuddyMood;
    totalStars: number;
    sessionsCount: number;
    lastVisit: string | null;
    unlockedItems: string[];          // world items: 'flower','lantern','nest','friend_cat',...
    justLeveledUp: boolean;

    feed: (stars: number) => void;
    setMood: (m: BuddyMood) => void;
    setName: (n: string) => void;
    setColor: (c: string) => void;
    visit: () => void;
    unlock: (item: string) => void;
    clearLevelUp: () => void;
}

function stageFor(xp: number): BuddyStage {
    let s: BuddyStage = 0;
    for (let i = 0; i < STAGE_XP.length; i++) if (xp >= STAGE_XP[i]) s = i as BuddyStage;
    return s;
}

// items the world auto-unlocks at each stage
const STAGE_ITEMS: Record<number, string[]> = {
    1: ['nest'],
    2: ['flower', 'lamp'],
    3: ['tree', 'friend_bird'],
    4: ['fountain', 'friend_cat', 'banner'],
};

export const useBuddyStore = create<BuddyState>()(
    persist(
        (set, get) => ({
            name: 'Momo',
            color: 'violet',
            xp: 0,
            stage: 0,
            mood: 'idle',
            totalStars: 0,
            sessionsCount: 0,
            lastVisit: null,
            unlockedItems: [],
            justLeveledUp: false,

            feed: (stars) => {
                if (stars <= 0) return;
                const xp = get().xp + stars * 10;
                const stage = stageFor(xp);
                const leveled = stage > get().stage;
                const items = new Set(get().unlockedItems);
                if (leveled) for (const it of STAGE_ITEMS[stage] ?? []) items.add(it);
                set({
                    xp, stage,
                    totalStars: get().totalStars + stars,
                    justLeveledUp: leveled,
                    mood: 'celebrate',
                    unlockedItems: Array.from(items),
                });
            },
            setMood: (mood) => set({ mood }),
            setName: (name) => set({ name }),
            setColor: (color) => set({ color }),
            unlock: (item) => set(s => ({ unlockedItems: Array.from(new Set([...s.unlockedItems, item])) })),
            clearLevelUp: () => set({ justLeveledUp: false }),
            visit: () => set(s => ({
                sessionsCount: s.sessionsCount + 1,
                lastVisit: new Date().toISOString(),
                mood: 'happy',
            })),
        }),
        { name: 'buddy-v1' },
    ),
);
