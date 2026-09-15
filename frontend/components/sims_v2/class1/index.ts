/**
 * sims_v2/class1 — registry.
 *
 * All Class 1 sims (Math-Magic-1 all 13 chapters + World Around Us themes).
 * Each entry is a SimDef rendered by engine/SimPlayer — no per-sim components.
 */
import type { SimDef } from '../engine/types';
import {
    c1Shapes, c1Counting, c1AddSub, c1Time, c1Measure,
    c1BigNumbers, c1Data, c1Patterns, c1Money, c1HowMany,
} from './maths';
import { class1WorldSims } from './world';
import { class1LanguageSims } from './language';
import { csSims } from '../shared/cs';

export const CLASS1_SIMS: SimDef[] = [
    // Math-Magic-1 (all 13 chapters)
    c1Shapes, c1Counting, c1AddSub, c1Time, c1Measure,
    c1BigNumbers, c1Data, c1Patterns, c1Money, c1HowMany,
    // World Around Us
    ...class1WorldSims,
    // English + Hindi
    ...class1LanguageSims,
    // Computer Science
    ...csSims.filter(s => s.classLevel === 1),
];

export const class1ById = new Map(CLASS1_SIMS.map(s => [s.id, s]));
