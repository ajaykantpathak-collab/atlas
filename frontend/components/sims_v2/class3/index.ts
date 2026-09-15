/**
 * sims_v2/class3 — registry.
 * Math-Magic-3 + EVS (Looking Around/Our Wondrous World) + language.
 * EVS becomes a real subject from Class 3.
 */
import type { SimDef } from '../engine/types';
import {
    c3LookFrom, c3Numbers, c3GiveTake, c3Shapes, c3Time,
    c3Times, c3Share, c3Money, c3Patterns, c3Charts, c3Measure2,
} from './maths';
import { class3EvsSims } from './evs';
import { class3LanguageSims } from './language';
import { csSims } from '../shared/cs';
import { scienceSims } from '../shared/science';

export const CLASS3_SIMS: SimDef[] = [
    c3LookFrom, c3Numbers, c3GiveTake, c3Shapes, c3Time,
    c3Times, c3Share, c3Money, c3Patterns, c3Charts, c3Measure2,
    ...class3EvsSims,
    ...class3LanguageSims,
    // Computer Science + Science enrichment
    ...csSims.filter(s => s.classLevel === 3),
    ...scienceSims.filter(s => s.classLevel === 3),
];

export const class3ById = new Map(CLASS3_SIMS.map(s => [s.id, s]));
