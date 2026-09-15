import type { SimDef } from '../../engine/types';
import C9_EVSForestEcosystemsTropicalSim from '../../../simulations/c6_12/C9_EVSForestEcosystemsTropicalSim';

/** v3 wrapped master — C9_EVSForestEcosystemsTropicalSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_evsforestecosystemstropicalsim: SimDef = {
    id: 'v3w_c9_evsforestecosystemstropicalsim',
    title: 'Forest Ecosystems Tropical',
    subtitle: 'This node covers the three weathering types, their mechanisms (e.g., frost wedging,.',
    classLevel: 9, subject: 'evs', topic: 'Weathering: Physical, Chemical and Biological',
    chapters: [],
    nodeIds: ['c9_geo_ch1_7', 'c9_geo_ch1_12'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are standing on a hillside near Bengaluru in the Deccan Plateau and notice large, curved sheets.', goal: 'Master Forest Ecosystems Tropical.' },
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
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch1_12', title: 'Natural hazards are extreme geophysical.',
          scaffold: { problem: 'A village in the Kumaon Himalayas (Uttarakhand) sits on a 35° slope of weathered phyllite, 200 m above a river that is actively eroding its.',
            steps: [
            { text: 'Identify the geological setting — phyllite is a foliated metamorphic rock with low shear strength along foliation.' },
            { text: 'Evaluate slope angle — 35° exceeds the angle of repose for weathered phyllite (~30°), making it inherently unstable.' },
            { text: 'Analyze toe erosion — river undercutting removes lateral support, increasing driving forces on the slope mass.' },
            { text: 'Assess rainfall — 2500 mm concentrated in 2 months causes rapid pore water pressure rise, reducing effective stress and.' },
            { text: 'Factor in deforestation — loss of root cohesion (typically 5-15 kPa) and reduced evapotranspiration leave slopes.' },
            { text: 'Synthesize — All four factors (lithology, slope, toe erosion, rainfall, vegetation loss) align → Very High hazard.', faded: true, blankAnswer: 'Very High landslide hazard. The slope is critically.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_geo_ch1_12', title: 'Identify each idea',
          dissect: { specimen: 'Forest Ecosystems Tropical', spots: [
            { id: 's1', label: 'Weathering is the in-situ breakdown', prompt: 'Which idea is this? — Weathering is the in-situ breakdown and decomposition of rocks and minerals at or near.', answer: 'Weathering is the in-situ breakdown', options: ['Weathering is the in-situ breakdown', 'Natural hazards are extreme geophysical'] },
            { id: 's2', label: 'Natural hazards are extreme geophysical', prompt: 'Which idea is this? — Natural hazards are extreme geophysical or hydrometeorological events — such as.', answer: 'Natural hazards are extreme geophysical', options: ['Natural hazards are extreme geophysical', 'Weathering is the in-situ breakdown'] }
          ] } }
    ],
    explore: { component: C9_EVSForestEcosystemsTropicalSim, prompt: 'Explore the interactive — Forest Ecosystems Tropical' },
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
