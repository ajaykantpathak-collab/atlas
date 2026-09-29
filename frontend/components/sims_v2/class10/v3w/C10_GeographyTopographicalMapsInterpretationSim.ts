import type { SimDef } from '../../engine/types';
import C10_GeographyTopographicalMapsInterpretationSim from '../../../simulations/c6_12/C10_GeographyTopographicalMapsInterpretationSim';

/** v3 wrapped master — C10_GeographyTopographicalMapsInterpretationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_geographytopographicalmapsinterpretationsim: SimDef = {
    id: 'v3w_c10_geographytopographicalmapsinterpretationsim',
    title: 'Conservation of Minerals and Energy Resources: Need and Methods',
    subtitle: 'Covers the need for conservation (finite nature, increasing demand, environmental impact).',
    classLevel: 10, subject: 'geography', topic: 'Conservation of Minerals and Energy Resources: Need and Methods',
    chapters: [],
    nodeIds: ['c10_geo_cbse_05_008', 'c10_geo_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are in a household in Jharkhand where electricity cuts are frequent, and you see diesel.', goal: 'Master Conservation of Minerals and Energy Resources: Need and Methods.' },
    discovery: {
        question: 'State the primary geological reason why minerals like haematite and bauxite are considered non-renewable resources.',
        options: ['Minerals like haematite and bauxite form through extremely slow', 'they are deep underground', 'we use them fast'],
        answer: 'Minerals like haematite and bauxite form through extremely slow',
        hook: 'Students think "conservation of minerals" means only "do not use them" or "recycle paper/plastic", missing that mineral.',
    },
    teaching: [
        { title: 'Conservation of minerals and energy.', text: 'Conservation of minerals and energy resources refers to the planned and sustainable management of finite mineral deposits (like iron ore, bauxite, coal) and energy sources (like petroleum, natural.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_geo_cbse_05_008', title: 'Conservation of minerals and energy.',
          scaffold: { problem: 'A steel plant in Bhilai uses 2 million tonnes of haematite ore (Fe₂O₃) annually with 60% Fe content.',
            steps: [
            { text: 'Calculate current iron output: 2,000,000 tonnes ore × 0.60 Fe content = 1,200,000 tonnes Fe contained.' },
            { text: 'Calculate current iron recovered: 1,200,000 × (1 - 0.15) = 1,020,000 tonnes Fe.' },
            { text: 'Calculate required ore with new tech for same output: Let X = new ore needed.' },
            { text: 'Annual ore saved = 2,000,000 - 1,789,474 = 210,526 tonnes haematite.' },
            { text: 'Interpret: Saving 210,526 tonnes ore/year reduces mining excavation, transport fuel, and crushing energy — conserving.', faded: true, blankAnswer: '210,526 tonnes of haematite ore saved annually; conserves.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_05_006', title: 'Non-conventional energy sources are.',
          scaffold: { problem: 'A company wants to set up a 500 MW solar photovoltaic plant in India.',
            steps: [
            { text: 'Identify the geographical parameter that dominates solar PV viability — Global Horizontal Irradiance (GHI) measured in.' },
            { text: 'Recall/estimate GHI for each site: Jaisalmer (Thar Desert) ~6.5 kWh/m²/day, 325+ clear days; Kanyakumari (coastal tip).' },
            { text: 'Assess land availability: Jaisalmer has vast contiguous government wasteland (low opportunity cost); Kanyakumari has.' },
            { text: 'Evaluate grid connectivity: Jaisalmer connected to Green Energy Corridor (765 kV lines to national grid); Kanyakumari.' },
            { text: 'Water for cleaning: Jaisalmer has scarce groundwater but robotic dry-cleaning tech deployed; Kanyakumari has water but.' },
            { text: 'Rank and justify: 1st Jaisalmer (best balance of high GHI, land, grid, proven tech); 2nd Leh (highest GHI but.', faded: true, blankAnswer: 'Jaisalmer (Rajasthan) is the optimal site — it combines the.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_geo_cbse_05_006', title: 'Identify each idea',
          dissect: { specimen: 'Conservation of Minerals and Energy Resources: Need and Methods', spots: [
            { id: 's1', label: 'Conservation of minerals and energy', prompt: 'Which idea is this? — Conservation of minerals and energy resources refers to the planned and sustainable.', answer: 'Conservation of minerals and energy', options: ['Conservation of minerals and energy', 'Non-conventional energy sources are renewable'] },
            { id: 's2', label: 'Non-conventional energy sources are renewable', prompt: 'Which idea is this? — Non-conventional energy sources are renewable, inexhaustible energy resources that do not.', answer: 'Non-conventional energy sources are renewable', options: ['Non-conventional energy sources are renewable', 'Conservation of minerals and energy'] }
          ] } }
    ],
    explore: { component: C10_GeographyTopographicalMapsInterpretationSim, prompt: 'Explore the interactive — Conservation of Minerals and Energy Resources: Need and Methods' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_008', difficulty: 'standard',
          question: 'Conservation of minerals and energy resources refers to the planned and.',
          hint: 'If stuck, revisit c8_geo_ch1_3 (renewable vs non-renewable classification) and.',
          misconception: 'Students think "conservation of minerals" means only "do not use them" or "recycle paper/plastic", missing that mineral.',
          parts: [
                { id: 'a', prompt: 'State the primary geological reason why minerals like haematite and bauxite are considered non-renewable resources.', answer: 'Minerals like haematite and bauxite form through extremely slow',
                  options: ['Correct answer: Minerals like haematite and bauxite form through extremely slow', 'they are deep underground', 'we use them fast'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "conservation of minerals" means only "do not use them" or "recycle paper/plastic", missing that mineral conservation.' }
          ],
            remediations: { 'conservation-of-minerals-means-only': { steps: ['Revisit c8_geo_ch1_3 (renewable vs non-renewable) and c8_geo_ch1_11 (conservation principles) to rebuild the.', 'Create a two-column table: "Mineral Conservation Method" vs "Energy Conservation Method" with 3 rows each, using NCERT.', 'Practice one case-based question on "How does improving thermal power plant efficiency conserve both coal and.'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_006', difficulty: 'standard',
          question: 'Non-conventional energy sources are renewable, inexhaustible energy resources.',
          hint: 'If stuck, revisit Class 9 Atmosphere chapter (c9_geo_ch2_3, c9_geo_ch2_4) for pressure.',
          misconception: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label: (a) the state with the highest installed wind power capacity, (b) the mountain pass enabling wind funneling in that.', answer: 'the state with the highest installed wind power capacity, (',
                  options: ['the state with the highest installed wind power capacity, (', 'interior Madhya Pradesh', 'Sunderbans'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse coastline length with.' }
          ],
            remediations: { 'india-has-huge-tidal-energy': { steps: ['Show the student a tidal range map of India (from NCERT Class 10 Fig 5.12 or MNRE atlas) — highlight that only Gujarat.', 'Use a simple funnel diagram — pour water into a wide tray vs a narrow-necked bottle — to demonstrate how constriction.', 'Have them calculate theoretical power: P = 0.5 × ρ × A × v³ — show that at v = 1 m/s (typical open coast), power is.', 'Assign a 3-mark board-style question: "Why is tidal energy restricted to Gujarat?" — require the three keywords:.'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse.',
          parts: [
                { id: 'a', prompt: 'Design a state-level renewable energy transition plan for a hypothetical state "X" that has: (i) 280 clear-sky days/year, (ii) a 200 km coastline with average.', answer: 'Priority 1: Solar',
                  options: ['Priority 1: Solar', 'India has huge tidal energy potential'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse coastline length with.' }
          ],
            remediations: { 'india-has-huge-tidal-energy': { steps: ['Show the student a tidal range map of India (from NCERT Class 10 Fig 5.12 or MNRE atlas) — highlight that only Gujarat.', 'Use a simple funnel diagram — pour water into a wide tray vs a narrow-necked bottle — to demonstrate how constriction.', 'Have them calculate theoretical power: P = 0.5 × ρ × A × v³ — show that at v = 1 m/s (typical open coast), power is.', 'Assign a 3-mark board-style question: "Why is tidal energy restricted to Gujarat?" — require the three keywords:.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
