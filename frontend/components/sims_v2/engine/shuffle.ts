/**
 * shuffle.ts — deterministic display-order shuffle.
 * Content authored/generated with the correct option first must not teach
 * students "always pick the first answer". Seed by stable content (question
 * text) so the order is fixed per item — no re-render reshuffling, and the
 * same student sees the same order on replay.
 */
export function shuffled<T>(arr: readonly T[], seed: string): T[] {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
        const j = Math.abs(h | 0) % (i + 1);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
