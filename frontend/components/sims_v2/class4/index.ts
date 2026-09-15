/**
 * sims_v2/class4 — registry.
 * Math-Magic-4 + EVS (Looking Around-4) + language.
 */
import type { SimDef } from '../engine/types';
import { class4MathSims } from './maths';
import { class4EvsSims } from './evs';
import { class4LanguageSims } from './language';
import { csSims } from '../shared/cs';
import { scienceSims } from '../shared/science';

export const CLASS4_SIMS: SimDef[] = [
    ...class4MathSims,
    ...class4EvsSims,
    ...class4LanguageSims,
    // Computer Science + Science enrichment
    ...csSims.filter(s => s.classLevel === 4),
    ...scienceSims.filter(s => s.classLevel === 4),
];

export const class4ById = new Map(CLASS4_SIMS.map(s => [s.id, s]));
