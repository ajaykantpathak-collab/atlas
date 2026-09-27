/**
 * GENERATED registry -- aggregated compiled SimDefs
 * (backend/its/competency/simdef_compiler.py).
 * Existing curated sims keep routing priority; generated sims
 * fill the MISSING/PARTIAL node gaps.
 */
import type { SimDef } from '../engine/types';
import { C6_BIO_GEN } from './6_bio_gen';
import { C6_CHEM_GEN } from './6_chem_gen';
import { C6_CIV_GEN } from './6_civ_gen';
import { C6_ENG_GEN } from './6_eng_gen';
import { C6_GEO_GEN } from './6_geo_gen';
import { C6_GRAM_GEN } from './6_gram_gen';
import { C6_HIN_GEN } from './6_hin_gen';
import { C6_HIST_GEN } from './6_hist_gen';
import { C6_MATH_GEN } from './6_math_gen';
import { C6_PHY_GEN } from './6_phy_gen';

export const GENERATED_SIMS: SimDef[] = [
  ...C6_BIO_GEN,
  ...C6_CHEM_GEN,
  ...C6_CIV_GEN,
  ...C6_ENG_GEN,
  ...C6_GEO_GEN,
  ...C6_GRAM_GEN,
  ...C6_HIN_GEN,
  ...C6_HIST_GEN,
  ...C6_MATH_GEN,
  ...C6_PHY_GEN,
];

/** node id -> generated sim id (first compiled cluster wins) */
export const GENERATED_NODE_SIM: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const s of GENERATED_SIMS) for (const n of s.nodeIds ?? []) if (!m[n]) m[n] = s.id;
  return m;
})();
