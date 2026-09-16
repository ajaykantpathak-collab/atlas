/**
 * sims_browser/subjectTheme — subject identity for the Simulation Gallery.
 *
 * SIM_INDEX stores ~50 raw subject codes ('phy', 'physics', 'eng_f',
 * 'hin_ar', 'bs', ...) that often duplicate each other (physics + phy).
 * This module normalizes every alias into a canonical GROUP (what the
 * filter chips select) while keeping a precise per-card LABEL (the CBSE
 * book where that distinction is real, e.g. "English · Flamingo") and a
 * stable hex accent color per group.
 *
 * Zero fake data: unknown codes fall back to a humanized label + gold.
 */

export interface SubjectIdentity {
    /** canonical filter group — what a subject chip selects */
    group: string;
    /** precise display label shown on cards / badges */
    label: string;
    /** hex accent for the card bar, dots and chips */
    color: string;
}

/** gold — the Atlas fallback accent */
export const GOLD = '#fbbf24';

/** canonical group → display label + accent color */
const GROUPS: Record<string, { label: string; color: string }> = {
    'Physics': { label: 'Physics', color: '#60a5fa' },
    'Chemistry': { label: 'Chemistry', color: '#c084fc' },
    'Biology': { label: 'Biology', color: '#34d399' },
    'Science': { label: 'Science', color: '#2dd4bf' },
    'Mathematics': { label: 'Mathematics', color: '#818cf8' },
    'EVS': { label: 'EVS', color: '#a3e635' },
    'History': { label: 'History', color: '#fbbf24' },
    'Geography': { label: 'Geography', color: '#22d3ee' },
    'Civics': { label: 'Civics', color: '#fb7185' },
    'Political Science': { label: 'Political Science', color: '#f87171' },
    'Economics': { label: 'Economics', color: '#4ade80' },
    'Accountancy': { label: 'Accountancy', color: '#f472b6' },
    'Computerised Accounting': { label: 'Computerised Accounting', color: '#f9a8d4' },
    'Business Studies': { label: 'Business Studies', color: '#fb923c' },
    'Psychology': { label: 'Psychology', color: '#fdba74' },
    'Sociology': { label: 'Sociology', color: '#e879f9' },
    'Statistics': { label: 'Statistics', color: '#93c5fd' },
    'Biotechnology': { label: 'Biotechnology', color: '#6ee7b7' },
    'Computer Science': { label: 'Computer Science', color: '#67e8f9' },
    'Informatics Practices': { label: 'Informatics Practices', color: '#7dd3fc' },
    'Home Science': { label: 'Home Science', color: '#fca5a5' },
    'English': { label: 'English', color: '#f0abfc' },
    'Hindi': { label: 'Hindi', color: '#fde68a' },
};

/** raw SIM_INDEX code → { group, optional precise card label } */
const ALIASES: Record<string, { group: string; label?: string }> = {
    physics: { group: 'Physics' }, phy: { group: 'Physics' },
    chemistry: { group: 'Chemistry' }, chem: { group: 'Chemistry' },
    biology: { group: 'Biology' }, bio: { group: 'Biology' },
    science: { group: 'Science' },
    mathematics: { group: 'Mathematics' }, math: { group: 'Mathematics' }, maths: { group: 'Mathematics' },
    evs: { group: 'EVS' },
    history: { group: 'History' }, hist: { group: 'History' }, histciv: { group: 'History', label: 'History & Civics' },
    geography: { group: 'Geography' }, geo: { group: 'Geography' },
    civics: { group: 'Civics' }, civ: { group: 'Civics' },
    political_science: { group: 'Political Science' }, ps: { group: 'Political Science' }, pol: { group: 'Political Science' }, polsci: { group: 'Political Science' },
    economics: { group: 'Economics' }, eco: { group: 'Economics' },
    accountancy: { group: 'Accountancy' }, acc: { group: 'Accountancy' },
    computerised_accounting: { group: 'Computerised Accounting' }, ca: { group: 'Computerised Accounting' },
    business_studies: { group: 'Business Studies' }, bs: { group: 'Business Studies' }, bst: { group: 'Business Studies' },
    psychology: { group: 'Psychology' }, psy: { group: 'Psychology' },
    sociology: { group: 'Sociology' }, soc: { group: 'Sociology' },
    statistics: { group: 'Statistics' }, stat: { group: 'Statistics' },
    biotechnology: { group: 'Biotechnology' }, biotech: { group: 'Biotechnology' },
    computer_science: { group: 'Computer Science' }, cs: { group: 'Computer Science' }, comp: { group: 'Computer Science' },
    informatics_practices: { group: 'Informatics Practices' }, ip: { group: 'Informatics Practices' },
    home_science: { group: 'Home Science' }, hs: { group: 'Home Science' },
    english: { group: 'English' }, eng: { group: 'English' }, engl: { group: 'English' },
    // CBSE English textbooks / electives — same filter group, precise card label
    eng_h: { group: 'English', label: 'English · Hornbill' },
    eng_f: { group: 'English', label: 'English · Flamingo' },
    eng_v: { group: 'English', label: 'English · Vistas' },
    eng_s: { group: 'English', label: 'English · Snapshots' },
    eng_w: { group: 'English', label: 'English · Woven Words' },
    eng_k: { group: 'English', label: 'English · Kaleidoscope' },
    // CBSE Hindi textbooks
    hin_ar: { group: 'Hindi', label: 'Hindi · Aroh' },
    hin_v: { group: 'Hindi', label: 'Hindi · Vitan' },
    hin_a: { group: 'Hindi', label: 'Hindi · Antra' },
    hin_al: { group: 'Hindi', label: 'Hindi · Antral' },
    hin: { group: 'Hindi' }, hindi: { group: 'Hindi' },
};

const identityCache = new Map<string, SubjectIdentity>();

/** Resolve a raw subject code into group + label + color (memoized —
 *  called once per card per filter pass over 3,018 sims). */
export function subjectIdentity(raw: string): SubjectIdentity {
    const cached = identityCache.get(raw);
    if (cached) return cached;
    const alias = ALIASES[raw];
    let identity: SubjectIdentity;
    if (alias) {
        const g = GROUPS[alias.group]!;
        identity = { group: alias.group, label: alias.label ?? g.label, color: g.color };
    } else {
        const label = (raw || 'General').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        identity = { group: label, label, color: GOLD };
    }
    identityCache.set(raw, identity);
    return identity;
}

/** Accent color for a canonical group name (used by filter chips). */
export function groupColor(group: string): string {
    return GROUPS[group]?.color ?? GOLD;
}

/** Distinct chapters covered by a sim's node ids, e.g.
 *  ['c10_bio_cbse_01_001', 'c10_bio_cbse_02_004'] → 2.
 *  Falls back to the sim's own chapter id, then 1 — never fabricated. */
export function chapterCount(nodeIds: readonly string[], fallbackChapter?: string): number {
    const seen = new Set<string>();
    for (const n of nodeIds) {
        const m = n.match(/ch0*(\d+)/i);
        if (m) seen.add(m[1]);
    }
    if (seen.size) return seen.size;
    if (fallbackChapter && /ch0*\d+/i.test(fallbackChapter)) return 1;
    return nodeIds.length ? 1 : 0;
}
