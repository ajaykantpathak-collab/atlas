/**
 * sims_v2/class5 — registry.
 * Math-Magic-5 + EVS (Looking Around-5) + language.
 * Last junior year — biggest jump: decimals, factors, area, volume, angles.
 */
import type { SimDef } from '../engine/types';
import { class5MathSims } from './maths';
import { class5EvsSims } from './evs';
import { class5LanguageSims } from './language';
import { csSims } from '../shared/cs';
import { scienceSims } from '../shared/science';

export const CLASS5_SIMS: SimDef[] = [
    ...class5MathSims,
    ...class5EvsSims,
    ...class5LanguageSims,
    // Computer Science + Science enrichment
    ...csSims.filter(s => s.classLevel === 5),
    ...scienceSims.filter(s => s.classLevel === 5),
];

export const class5ById = new Map(CLASS5_SIMS.map(s => [s.id, s]));
