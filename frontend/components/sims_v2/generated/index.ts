/**
 * GENERATED registry -- aggregated compiled SimDefs
 * (backend/its/competency/simdef_compiler.py).
 * Existing curated sims keep routing priority; generated sims
 * fill the MISSING/PARTIAL node gaps.
 */
import type { SimDef } from '../engine/types';
import { C10_BIO_GEN } from './10_bio_gen';
import { C10_CHEM_GEN } from './10_chem_gen';
import { C10_CIV_GEN } from './10_civ_gen';
import { C10_ECO_GEN } from './10_eco_gen';
import { C10_ENG_GEN } from './10_eng_gen';
import { C10_GEO_GEN } from './10_geo_gen';
import { C10_HIST_GEN } from './10_hist_gen';
import { C10_MATH_GEN } from './10_math_gen';
import { C11_ACC_GEN } from './11_acc_gen';
import { C11_BIO_GEN } from './11_bio_gen';
import { C11_BIOTECH_GEN } from './11_biotech_gen';
import { C11_BS_GEN } from './11_bs_gen';
import { C11_CHEM_GEN } from './11_chem_gen';
import { C11_CS_GEN } from './11_cs_gen';
import { C11_ECO_GEN } from './11_eco_gen';
import { C11_ENG_H_GEN } from './11_eng_h_gen';
import { C11_ENG_S_GEN } from './11_eng_s_gen';
import { C11_ENG_W_GEN } from './11_eng_w_gen';
import { C11_GEO_GEN } from './11_geo_gen';
import { C11_HIN_AR_GEN } from './11_hin_ar_gen';
import { C11_HIN_V_GEN } from './11_hin_v_gen';
import { C11_HIST_GEN } from './11_hist_gen';
import { C11_HS_GEN } from './11_hs_gen';
import { C11_IP_GEN } from './11_ip_gen';
import { C11_MATH_GEN } from './11_math_gen';
import { C11_PHY_GEN } from './11_phy_gen';
import { C11_PS_GEN } from './11_ps_gen';
import { C11_PSY_GEN } from './11_psy_gen';
import { C11_SOC_GEN } from './11_soc_gen';
import { C11_STAT_GEN } from './11_stat_gen';
import { C12_ACC_GEN } from './12_acc_gen';
import { C12_BIO_GEN } from './12_bio_gen';
import { C12_BIOTECH_GEN } from './12_biotech_gen';
import { C12_BS_GEN } from './12_bs_gen';
import { C12_CA_GEN } from './12_ca_gen';
import { C12_CHEM_GEN } from './12_chem_gen';
import { C12_CS_GEN } from './12_cs_gen';
import { C12_ECO_GEN } from './12_eco_gen';
import { C12_ENG_F_GEN } from './12_eng_f_gen';
import { C12_ENG_K_GEN } from './12_eng_k_gen';
import { C12_ENG_V_GEN } from './12_eng_v_gen';
import { C12_GEO_GEN } from './12_geo_gen';
import { C12_HIN_A_GEN } from './12_hin_a_gen';
import { C12_HIN_AL_GEN } from './12_hin_al_gen';
import { C12_HIN_AR_GEN } from './12_hin_ar_gen';
import { C12_HIN_V_GEN } from './12_hin_v_gen';
import { C12_HIST_GEN } from './12_hist_gen';
import { C12_HS_GEN } from './12_hs_gen';
import { C12_IP_GEN } from './12_ip_gen';
import { C12_MATH_GEN } from './12_math_gen';
import { C12_PHY_GEN } from './12_phy_gen';
import { C12_PS_GEN } from './12_ps_gen';
import { C12_PSY_GEN } from './12_psy_gen';
import { C12_SOC_GEN } from './12_soc_gen';
import { C6_BIO_GEN } from './6_bio_gen';
import { C6_CHEM_GEN } from './6_chem_gen';
import { C6_CIV_GEN } from './6_civ_gen';
import { C6_ENG_GEN } from './6_eng_gen';
import { C6_GEO_GEN } from './6_geo_gen';
import { C6_HIST_GEN } from './6_hist_gen';
import { C6_MATH_GEN } from './6_math_gen';
import { C6_PHY_GEN } from './6_phy_gen';
import { C7_BIO_GEN } from './7_bio_gen';
import { C7_CHEM_GEN } from './7_chem_gen';
import { C7_CIV_GEN } from './7_civ_gen';
import { C7_ECO_GEN } from './7_eco_gen';
import { C7_ENG_GEN } from './7_eng_gen';
import { C7_GEO_GEN } from './7_geo_gen';
import { C7_HIST_GEN } from './7_hist_gen';
import { C7_MATH_GEN } from './7_math_gen';
import { C7_PHY_GEN } from './7_phy_gen';
import { C8_BIO_GEN } from './8_bio_gen';
import { C8_CHEM_GEN } from './8_chem_gen';
import { C8_CIV_GEN } from './8_civ_gen';
import { C8_ECO_GEN } from './8_eco_gen';
import { C8_ENG_GEN } from './8_eng_gen';
import { C8_GEO_GEN } from './8_geo_gen';
import { C8_HIST_GEN } from './8_hist_gen';
import { C8_MATH_GEN } from './8_math_gen';
import { C8_PHY_GEN } from './8_phy_gen';
import { C9_BIO_GEN } from './9_bio_gen';
import { C9_CHEM_GEN } from './9_chem_gen';
import { C9_CIV_GEN } from './9_civ_gen';
import { C9_ECO_GEN } from './9_eco_gen';
import { C9_ENG_GEN } from './9_eng_gen';
import { C9_GEO_GEN } from './9_geo_gen';
import { C9_HIST_GEN } from './9_hist_gen';
import { C9_MATH_GEN } from './9_math_gen';
import { C9_PHY_GEN } from './9_phy_gen';

export const GENERATED_SIMS: SimDef[] = [
  ...C10_BIO_GEN,
  ...C10_CHEM_GEN,
  ...C10_CIV_GEN,
  ...C10_ECO_GEN,
  ...C10_ENG_GEN,
  ...C10_GEO_GEN,
  ...C10_HIST_GEN,
  ...C10_MATH_GEN,
  ...C11_ACC_GEN,
  ...C11_BIO_GEN,
  ...C11_BIOTECH_GEN,
  ...C11_BS_GEN,
  ...C11_CHEM_GEN,
  ...C11_CS_GEN,
  ...C11_ECO_GEN,
  ...C11_ENG_H_GEN,
  ...C11_ENG_S_GEN,
  ...C11_ENG_W_GEN,
  ...C11_GEO_GEN,
  ...C11_HIN_AR_GEN,
  ...C11_HIN_V_GEN,
  ...C11_HIST_GEN,
  ...C11_HS_GEN,
  ...C11_IP_GEN,
  ...C11_MATH_GEN,
  ...C11_PHY_GEN,
  ...C11_PS_GEN,
  ...C11_PSY_GEN,
  ...C11_SOC_GEN,
  ...C11_STAT_GEN,
  ...C12_ACC_GEN,
  ...C12_BIO_GEN,
  ...C12_BIOTECH_GEN,
  ...C12_BS_GEN,
  ...C12_CA_GEN,
  ...C12_CHEM_GEN,
  ...C12_CS_GEN,
  ...C12_ECO_GEN,
  ...C12_ENG_F_GEN,
  ...C12_ENG_K_GEN,
  ...C12_ENG_V_GEN,
  ...C12_GEO_GEN,
  ...C12_HIN_A_GEN,
  ...C12_HIN_AL_GEN,
  ...C12_HIN_AR_GEN,
  ...C12_HIN_V_GEN,
  ...C12_HIST_GEN,
  ...C12_HS_GEN,
  ...C12_IP_GEN,
  ...C12_MATH_GEN,
  ...C12_PHY_GEN,
  ...C12_PS_GEN,
  ...C12_PSY_GEN,
  ...C12_SOC_GEN,
  ...C6_BIO_GEN,
  ...C6_CHEM_GEN,
  ...C6_CIV_GEN,
  ...C6_ENG_GEN,
  ...C6_GEO_GEN,
  ...C6_HIST_GEN,
  ...C6_MATH_GEN,
  ...C6_PHY_GEN,
  ...C7_BIO_GEN,
  ...C7_CHEM_GEN,
  ...C7_CIV_GEN,
  ...C7_ECO_GEN,
  ...C7_ENG_GEN,
  ...C7_GEO_GEN,
  ...C7_HIST_GEN,
  ...C7_MATH_GEN,
  ...C7_PHY_GEN,
  ...C8_BIO_GEN,
  ...C8_CHEM_GEN,
  ...C8_CIV_GEN,
  ...C8_ECO_GEN,
  ...C8_ENG_GEN,
  ...C8_GEO_GEN,
  ...C8_HIST_GEN,
  ...C8_MATH_GEN,
  ...C8_PHY_GEN,
  ...C9_BIO_GEN,
  ...C9_CHEM_GEN,
  ...C9_CIV_GEN,
  ...C9_ECO_GEN,
  ...C9_ENG_GEN,
  ...C9_GEO_GEN,
  ...C9_HIST_GEN,
  ...C9_MATH_GEN,
  ...C9_PHY_GEN,
];

/** node id -> generated sim id (first compiled cluster wins) */
export const GENERATED_NODE_SIM: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const s of GENERATED_SIMS) for (const n of s.nodeIds ?? []) if (!m[n]) m[n] = s.id;
  return m;
})();
