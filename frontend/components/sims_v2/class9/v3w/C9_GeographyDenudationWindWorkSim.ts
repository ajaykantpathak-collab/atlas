import type { SimDef } from '../../engine/types';
import C9_GeographyDenudationWindWorkSim from '../../../simulations/c6_12/C9_GeographyDenudationWindWorkSim';

/** v3 wrapped master — C9_GeographyDenudationWindWorkSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_geographydenudationwindworksim: SimDef = {
    id: 'v3w_c9_geographydenudationwindworksim',
    title: 'Earthquakes: Causes, Measurement and Effects',
    subtitle: 'Covers causes (elastic rebound theory, plate boundaries), measurement (Richter scale.',
    classLevel: 9, subject: 'geography', topic: 'Earthquakes: Causes, Measurement and Effects',
    chapters: [],
    nodeIds: ['c9_geo_ch1_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you feel a sudden shaking while sitting in your classroom in Delhi — the fan swings, windows rattle,.', goal: 'Master Earthquakes: Causes, Measurement and Effects.' },
    discovery: {
        question: 'Explain why the Richter scale is logarithmic and what it means when an earthquake of magnitude 6 releases approximately 32 times more energy than a magnitude 5.',
        options: ['The Richter scale is logarithmic (base 10 for amplitude, ~32 for energy)', 'magnitude 6 is just 1 unit bigger than 5', 'a magnitude 7 earthquake always causes more destruction than magnitude 6'],
        answer: 'The Richter scale is logarithmic (base 10 for amplitude, ~32 for energy)',
        hook: 'Students believe that the magnitude of an earthquake (Richter number) directly determines the damage everywhere — e.g.,.',
    },
    teaching: [
        { title: 'An earthquake is a sudden release of.', text: 'An earthquake is a sudden release of accumulated strain energy in the Earth\'s crust that generates seismic waves, causing ground shaking; it originates at a point called the focus (hypocenter) inside.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_geo_ch1_6', title: 'An earthquake is a sudden release of.',
          scaffold: { problem: 'The 2001 Bhuj earthquake (Gujarat) had a magnitude of 7.7 on the Richter scale.',
            steps: [
            { text: 'Identify the formula for energy ratio: Energy ratio = 10^(1.5 × (M2 - M1)).' },
            { text: 'Substitute M2 = 7.7 (Bhuj), M1 = 6.2 (Latur): Difference = 1.5.' },
            { text: 'Calculate exponent: 1.5 × 1.5 = 2.25.' },
            { text: 'Compute 10^2.25 = 10^2 × 10^0.25 ≈ 100 × 1.78 = 178. So Bhuj released ~178 times more energy.' },
            { text: 'Interpret: Despite 178× more energy, Bhuj\'s death toll was only ~2× Latur\'s because: (a) Bhuj epicenter was in sparsely.', faded: true, blankAnswer: 'Bhuj released approximately 178 times more energy than.' }
            ] } }
    ],
    explore: { component: C9_GeographyDenudationWindWorkSim, prompt: 'Explore the interactive — Earthquakes: Causes, Measurement and Effects' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch1_6', difficulty: 'standard',
          question: 'An earthquake is a sudden release of accumulated strain energy in the Earth\'s.',
          hint: 'Revisit c9_geo_ch1_3 "Types of Plate Movements" and draw cross-sections showing stress.',
          misconception: 'Students believe that the magnitude of an earthquake (Richter number) directly determines the damage everywhere — e.g.,.',
          parts: [
                { id: 'a', prompt: 'Explain why the Richter scale is logarithmic and what it means when an earthquake of magnitude 6 releases approximately 32 times more energy than a magnitude 5.', answer: 'The Richter scale is logarithmic (base 10 for amplitude, ~32 for energy)',
                  options: ['The Richter scale is logarithmic (base 10 for amplitude, ~32 for energy)', 'magnitude 6 is just 1 unit bigger than 5', 'a magnitude 7 earthquake always causes more destruction than magnitude 6'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the magnitude of an earthquake (Richter number) directly determines the damage everywhere — e.g., "a magnitude 7.' },
                { id: 'b', prompt: 'A seismograph station records P-waves arriving at 10:00:00 and S-waves at 10:02:30.', answer: 'Step 1: Time difference = 150 seconds',
                  options: ['Step 1: Time difference = 150 seconds', 'a magnitude 7 earthquake always causes more destruction than magnitude 6'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the magnitude of an earthquake (Richter number) directly determines the damage everywhere — e.g., "a magnitude 7.' }
          ],
            remediations: { 'the-magnitude-of-an-earthquake': { steps: ['Use a shake-table demo or video showing identical model houses on rock vs.', 'Plot isoseismal lines for a real Indian quake (e.g., 2011 Sikkim M6.9) on a map — note how intensity drops irregularly.', 'Calculate energy difference between M6 and M7 (32×) but then compare death tolls: 1993 Latur M6.2 (~10,000 deaths) vs.', 'Have students write a one-paragraph explanation using terms: focus depth, alluvial amplification, building.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that the magnitude of an earthquake (Richter number) directly determines the damage everywhere — e.g.,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Building codes based on seismic zoning maps (like India\'s Zone V) are sufficient to prevent earthquake casualties." Consider the 2001.', answer: 'The statement is false',
                  options: ['The statement is false', 'Zone V codes will save everyone', 'a magnitude 7 earthquake always causes more destruction than magnitude 6'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the magnitude of an earthquake (Richter number) directly determines the damage everywhere — e.g., "a magnitude 7.' },
                { id: 'b', prompt: 'Design a community-level earthquake preparedness plan for a village in the Indo-Gangetic plain (high liquefaction potential, Zone IV).', answer: 'one structural measure, (',
                  options: ['one structural measure, (', 'a magnitude 7 earthquake always causes more destruction than magnitude 6'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the magnitude of an earthquake (Richter number) directly determines the damage everywhere — e.g., "a magnitude 7.' }
          ],
            remediations: { 'the-magnitude-of-an-earthquake': { steps: ['Use a shake-table demo or video showing identical model houses on rock vs.', 'Plot isoseismal lines for a real Indian quake (e.g., 2011 Sikkim M6.9) on a map — note how intensity drops irregularly.', 'Calculate energy difference between M6 and M7 (32×) but then compare death tolls: 1993 Latur M6.2 (~10,000 deaths) vs.', 'Have students write a one-paragraph explanation using terms: focus depth, alluvial amplification, building.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
