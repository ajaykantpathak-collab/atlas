'use client';
/**
 * islandStore — the child's knowledge made visible.
 *
 * The island IS the mastery graph: each completed sim plants/grows a real
 * thing in its zone. Three zones for Class 1:
 *   maths  → Crystal Meadow (numbers, shapes, money → crystals & flowers)
 *   lang   → Word Grove (letters, rhymes, stories → letter trees, butterflies)
 *   world  → Wild Valley (air, water, animals → creatures & elements move in)
 *
 * completing a sim → one item grows in its zone, persisted.
 * More sims in a zone = denser, richer flora. The buddy lives on the island.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type IslandZone = 'maths' | 'lang' | 'world';

export interface GrownItem {
    simId: string;
    zone: IslandZone;
    emoji: string;           // the thing that grew
    at: string;              // when
}

// sim subject/topic → island zone
export function zoneFor(sim: { subject: string; id: string }): IslandZone {
    if (sim.subject === 'maths') return 'maths';
    if (sim.subject === 'english' || sim.subject === 'hindi') return 'lang';
    return 'world';
}

// what each sim grows on the island — the knowledge made literal
export const SIM_FLORA: Record<string, string> = {
    // maths zone → crystals, number flowers, structures
    c1_shapes: '💎', c1_counting: '🔢', c1_addsub: '➕', c1_time: '🕐',
    c1_measure: '⚖️', c1_bignum: '🔮', c1_data: '📊', c1_patterns: '🌀',
    c1_money: '🪙', c1_howmany: '🎯',
    // lang zone → letter trees, word butterflies, story books
    c1_eng_letters: '🔤', c1_eng_rhyme: '🎵', c1_eng_words: '📖', c1_eng_story: '📜',
    c1_hin_varna: '🕉️', c1_hin_words: '🪔', c1_hin_rhyme: '🎶',
    // world zone → real things move in
    c1_air: '🌬️', c1_water: '💧', c1_food: '🌾', c1_plants: '🌳',
    c1_animals: '🦋', c1_body: '❤️', c1_clean: '🫧', c1_safety: '🛡️',
    c1_transport: '🚗', c1_hood: '🏡', c1_sky: '⭐',
};

export interface IslandState {
    grown: GrownItem[];                 // what's grown so far
    completedSims: string[];            // sim ids
    grownAt: Record<string, string>;    // simId → iso time

    grow: (simId: string, sim: { subject: string; id: string }) => void;
    reset: () => void;
}

export const useIslandStore = create<IslandState>()(
    persist(
        (set, get) => ({
            grown: [],
            completedSims: [],
            grownAt: {},

            grow: (simId, sim) => {
                if (get().completedSims.includes(simId)) return;   // already grown
                const item: GrownItem = {
                    simId,
                    zone: zoneFor(sim),
                    emoji: SIM_FLORA[simId] ?? '🌱',
                    at: new Date().toISOString(),
                };
                set(s => ({
                    grown: [...s.grown, item],
                    completedSims: [...s.completedSims, simId],
                    grownAt: { ...s.grownAt, [simId]: item.at },
                }));
            },
            reset: () => set({ grown: [], completedSims: [], grownAt: {} }),
        }),
        { name: 'island-v1' },
    ),
);
