/**
 * sims_v2/class2 — registry.
 * Math-Magic-2 (all 15 chapters) + language + world themes.
 */
import type { SimDef } from '../engine/types';
import {
    c2Shapes, c2Groups, c2Measure, c2Place,
    c2Patterns, c2Week, c2Arith, c2Data,
} from './maths';
import { class2LanguageSims } from './language';
import { class2WorldSims } from './world';
import { csSims } from '../shared/cs';

export const CLASS2_SIMS: SimDef[] = [
    // Math-Magic-2 (all 15 chapters)
    c2Shapes, c2Groups, c2Measure, c2Place,
    c2Patterns, c2Week, c2Arith, c2Data,
    // World Around Us
    ...class2WorldSims,
    // English + Hindi
    ...class2LanguageSims,
    // Computer Science
    ...csSims.filter(s => s.classLevel === 2),
];

export const class2ById = new Map(CLASS2_SIMS.map(s => [s.id, s]));
