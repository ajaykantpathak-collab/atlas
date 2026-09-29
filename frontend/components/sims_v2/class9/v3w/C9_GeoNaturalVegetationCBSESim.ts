import type { SimDef } from '../../engine/types';
import C9_GeoNaturalVegetationCBSESim from '../../../simulations/c6_12_new/C9_GeoNaturalVegetationCBSESim';

/** v3 wrapped master — C9_GeoNaturalVegetationCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_geonaturalvegetationcbsesim: SimDef = {
    id: 'v3w_c9_geonaturalvegetationcbsesim',
    title: 'Weathering: Physical, Chemical and Biological',
    subtitle: 'This node covers the three weathering types, their mechanisms (e.g., frost wedging,.',
    classLevel: 9, subject: 'science', topic: 'Weathering: Physical, Chemical and Biological',
    chapters: [],
    nodeIds: ['c9_geo_ch1_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are standing on a hillside near Bengaluru in the Deccan Plateau and notice large, curved sheets.', goal: 'Master Weathering: Physical, Chemical and Biological.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Weathering is the in-situ breakdown and.', text: 'Weathering is the in-situ breakdown and decomposition of rocks and minerals at or near the Earth\'s surface through physical (mechanical), chemical, and biological processes, without significant.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_geo_ch1_7', title: 'Weathering is the in-situ breakdown and.',
          scaffold: { problem: 'A roadcut near Hyderabad (Deccan Plateau) exposes massive granite with curved, concentric fractures peeling off in sheets 10-50 cm thick.',
            steps: [
            { text: 'Identify the rock type and structure – massive, coarse-grained granite, homogeneous, no bedding planes.' },
            { text: 'Recall the relevant principle – exfoliation (sheeting) due to pressure release (unloading) and thermal.' },
            { text: 'Apply to the specific scenario – Deccan Plateau has high diurnal temperature range (Class 7: c7_geo_ch02_003) causing.' },
            { text: 'Analyze the mechanism – tensile stresses develop parallel to the surface, fracturing the rock into concentric shells;.' },
            { text: 'Verify and interpret – the residue is grus (coarse sand + clay), which forms sandy loam soils typical of the region;.', faded: true, blankAnswer: 'The dominant process is physical weathering by exfoliation.' }
            ] } }
    ],
    explore: { component: C9_GeoNaturalVegetationCBSESim, prompt: 'Explore the interactive — Weathering: Physical, Chemical and Biological' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch1_7', difficulty: 'standard',
          question: 'Weathering is the in-situ breakdown and decomposition of rocks and minerals at.',
          hint: 'Revise the rock cycle (c9_geo_ch1_1) and India\'s climate regions (c7_geo_ch03_006,.',
          misconception: 'Students often believe that physical weathering (like block disintegration) only occurs in hot deserts due to daily.',
          parts: [
                { id: 'a', prompt: 'Define weathering and state how it differs from erosion in terms of material movement.', answer: 'Weathering is the in-situ breakdown of rocks without significant movement of the',
                  options: ['Weathering is the in-situ breakdown of rocks without significant movement of the', 'weathering moves rocks downhill'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that physical weathering (like block disintegration) only occurs in hot deserts due to daily temperature extremes,.' },
                { id: 'b', prompt: 'A sandstone cliff in the Vindhya Range shows honeycomb-like cavities (tafoni).', answer: 'The dominant process is physical weathering by salt crystallization (haloclasty)',
                  options: ['The dominant process is physical weathering by salt crystallization (haloclasty)', 'wind erosion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that physical weathering (like block disintegration) only occurs in hot deserts due to daily temperature extremes,.' }
          ],
            remediations: { 'physical-weathering-like-block-disintegration': { steps: ['Show a topographic map of the Himalayas (c9_geo_ch1_4 region) highlighting elevations >3000 m.', 'Use temperature data from Leh (Class 7 weather diary skills) to plot daily min/max in winter, counting freeze-thaw days.', 'Compare photos of Ladakh scree slopes (frost-shattered angular debris) with Thar Desert sandstone blocks (thermal.', 'Have students mark "frost weathering zone" and "thermal weathering zone" on an outline map of India, reinforcing that.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
