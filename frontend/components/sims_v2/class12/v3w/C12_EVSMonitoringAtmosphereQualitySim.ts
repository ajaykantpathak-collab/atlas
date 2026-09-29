import type { SimDef } from '../../engine/types';
import C12_EVSMonitoringAtmosphereQualitySim from '../../../simulations/c6_12/C12_EVSMonitoringAtmosphereQualitySim';

/** v3 wrapped master — C12_EVSMonitoringAtmosphereQualitySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_evsmonitoringatmospherequalitysim: SimDef = {
    id: 'v3w_c12_evsmonitoringatmospherequalitysim',
    title: 'Remote Sensing: Principle and Applications in Geography',
    subtitle: 'Covers the principle of remote sensing (EMR spectrum, energy interactions), sensor types.',
    classLevel: 12, subject: 'evs', topic: 'Remote Sensing: Principle and Applications in Geography',
    chapters: [],
    nodeIds: ['c12_geo_cbse_21_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a farmer in Punjab trying to decide how much fertilizer to apply to your wheat crop.', goal: 'Master Remote Sensing: Principle and Applications in Geography.' },
    discovery: {
        question: 'A student claims: "RISAT-1 uses C-band synthetic aperture radar (SAR) so it can see through clouds and operate at night, making it better than Cartosat-2 for.',
        options: ['The statement is partially correct but overgeneralized', 'RISAT is always better', 'better'],
        answer: 'The statement is partially correct but overgeneralized',
        hook: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop.',
    },
    teaching: [
        { title: 'Remote sensing is the science and technology.', text: 'Remote sensing is the science and technology of acquiring information about an object, area, or phenomenon through the analysis of data obtained by a device (sensor) that is not in physical contact.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_21_010', title: 'Remote sensing is the science and.',
          scaffold: { problem: 'A farmer in Haryana wants to monitor wheat crop health at flowering stage (March) using free satellite data.',
            steps: [
            { text: 'Identify requirements — wheat flowering in March needs cloud-free optical data (passive sensor), red and NIR bands for.' },
            { text: 'Evaluate Indian satellites — Cartosat-2: no NIR band (reject); Resourcesat-2 LISS-III: 23.5 m, 4 bands (green, red,.' },
            { text: 'Select Sentinel-2 MSI — provides Band 4 (Red, 10 m) and Band 8 (NIR, 10 m) for NDVI; also red-edge bands (Band 5,6,7).' },
            { text: 'Compute NDVI = (Band8 - Band4)/(Band8 + Band4) for each pixel; map values 0.5-0.8 indicate healthy flowering wheat.' },
            { text: 'Validate with ground truth — visit 5-10 fields, measure LAI or chlorophyll, correlate with NDVI.', faded: true, blankAnswer: 'Use Sentinel-2 MSI (free, 10 m, 5-day revisit, red+NIR.' }
            ] } }
    ],
    explore: { component: C12_EVSMonitoringAtmosphereQualitySim, prompt: 'Explore the interactive — Remote Sensing: Principle and Applications in Geography' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_010', difficulty: 'standard',
          question: 'Remote sensing is the science and technology of acquiring information about an.',
          hint: 'If stuck on sensor selection, revisit c11_geo_cbse_26_005 (Resolution Types) and make a.',
          misconception: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop.',
          parts: [
                { id: 'a', prompt: 'A student claims: "RISAT-1 uses C-band synthetic aperture radar (SAR) so it can see through clouds and operate at night, making it better than Cartosat-2 for.', answer: 'The statement is partially correct but overgeneralized',
                  options: ['The statement is partially correct but overgeneralized', 'RISAT is always better', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop health, flood.' },
                { id: 'b', prompt: 'You are given a Resourcesat-2 LISS-IV image (spatial resolution 5.8 m, 3 spectral bands: green, red, NIR) of a 10 km × 10 km agricultural region.', answer: '**Steps**: 1) Area = 10 km × 10 km = 100 km² = 100 × 10⁶ m²',
                  options: ['**Steps**: 1) Area = 10 km × 10 km = 100 km² = 100 × 10⁶ m²', 'more pixels = better', 'higher spatial resolution is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop health, flood.' },
                { id: 'c', prompt: 'Compare the temporal resolution of Cartosat-2 (revisit 4-5 days) and a geostationary satellite like INSAT-3D (revisit 15-30 minutes).', answer: 'monitoring rapid flood inundation in Assam during monsoon, (',
                  options: ['monitoring rapid flood inundation in Assam during monsoon, (', 'Cartosat for floods', 'higher spatial resolution is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop health, flood.' }
          ],
            remediations: { 'higher-spatial-resolution-is-always': { steps: ['Revisit c11_geo_cbse_26_003 (Electromagnetic Spectrum) and c11_geo_cbse_26_004 (Active vs Passive Sensors) to rebuild.', 'Create a comparison table: Sensor | Platform | Spatial Res | Spectral Bands | Temporal Res | Best For.', 'Fill for 5 Indian satellites.', 'Take a specific case (e.g., "map paddy area in West Bengal in July") and reason step-by-step: cloud cover?'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop.',
          parts: [
                { id: 'a', prompt: 'Assess the suitability of using only the panchromatic band (0.5-0.75 µm, 0.8 m resolution) of Cartosat-2 for estimating crop health over a large region.', answer: 'Panchromatic band lacks spectral resolution',
                  options: ['Panchromatic band lacks spectral resolution', 'panchromatic is high resolution so it\'s best', 'higher spatial resolution is always better', '"higher spatial resolution is always better" and choose Cartosat-2 (0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop health, flood.' }
          ],
            remediations: { 'higher-spatial-resolution-is-always': { steps: ['Revisit c11_geo_cbse_26_003 (Electromagnetic Spectrum) and c11_geo_cbse_26_004 (Active vs Passive Sensors) to rebuild.', 'Create a comparison table: Sensor | Platform | Spatial Res | Spectral Bands | Temporal Res | Best For.', 'Fill for 5 Indian satellites.', 'Take a specific case (e.g., "map paddy area in West Bengal in July") and reason step-by-step: cloud cover?'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
