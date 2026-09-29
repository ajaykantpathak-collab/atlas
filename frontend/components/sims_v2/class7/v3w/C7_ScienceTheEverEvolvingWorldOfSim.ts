import type { SimDef } from '../../engine/types';
import C7_ScienceTheEverEvolvingWorldOfSim from '../../../simulations/c6_12/C7_ScienceTheEverEvolvingWorldOfSim';

/** v3 wrapped master — C7_ScienceTheEverEvolvingWorldOfSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_sciencetheeverevolvingworldofsim: SimDef = {
    id: 'v3w_c7_sciencetheeverevolvingworldofsim',
    title: 'Science as an Ongoing Process of Discovery',
    subtitle: 'Covers the nature of science as a self-correcting, continuous process of inquiry and.',
    classLevel: 7, subject: 'science', topic: 'Science as an Ongoing Process of Discovery',
    chapters: [],
    nodeIds: ['c7_physics_ch01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Observe how a simple household ceiling fan running at high speed creates a blur, making individual blades.', goal: 'Master Science as an Ongoing Process of Discovery.' },
    discovery: {
        question: 'What term best describes the scientific habit of questioning established ideas and testing them against new evidence rather than accepting them blindly?',
        options: ['Scientific temper', 'memorization', 'assumption'],
        answer: 'Scientific temper',
        hook: 'Students often think science is a static collection of absolute "facts" memorized from a textbook, rather than an.',
    },
    teaching: [
        { title: 'Science is an ongoing, evolving process of.', text: 'Science is an ongoing, evolving process of discovery where observations, experiments, and reasoning continuously refine our understanding of the natural world, measured through the accumulation of.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch01_010', title: 'Science is an ongoing, evolving process.',
          scaffold: { problem: 'A student records the temperature of boiling water in a school science lab over three consecutive days.',
            steps: [
            { text: 'Identify the given values with units: $T_1 = 99.0\\text{ °C}$, $T_2 = 99.2\\text{ °C}$, $T_3 = 98.9\\text{ °C}$.' },
            { text: 'Set up the formula for average temperature: $\\text{Average } T = \\frac{T_1 + T_2 + T_3}{n}$, where $n = 3$.' },
            { text: 'Substitute the numerical values and units into the equation: $\\text{Average } T = \\frac{99.0\\text{ °C} + 99.2\\text{ °C}.' },
            { text: 'Compute the sum and divide, tracking units: Sum $= 297.1\\text{ °C}$; $\\text{Average } T = \\frac{297.1\\text{ °C}}{3} =.' },
            { text: 'Verify if the answer is physically reasonable (water boils near 100 °C depending on atmospheric pressure) and state.', faded: true, blankAnswer: '99.03 °C' }
            ] } }
    ],
    explore: { component: C7_ScienceTheEverEvolvingWorldOfSim, prompt: 'Explore the interactive — Science as an Ongoing Process of Discovery' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch01_010', difficulty: 'standard',
          question: 'Science is an ongoing, evolving process of discovery where observations,.',
          hint: 'Review c6_physics_ch01_002 to reinforce how observations lead to logical conclusions.',
          misconception: 'Students often think science is a static collection of absolute "facts" memorized from a textbook, rather than an.',
          parts: [
                { id: 'a', prompt: 'What term best describes the scientific habit of questioning established ideas and testing them against new evidence rather than accepting them blindly?', answer: 'Scientific temper',
                  options: ['Scientific temper', 'memorization', 'assumption'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think science is a static collection of absolute "facts" memorized from a textbook, rather than an active, ongoing method of.' }
          ],
            remediations: { 'science-is-a-static-collection': { steps: ['To fix this misconception, guide the student to compare how a specific topic (like light or heat) was understood.', 'Have them perform a simple experiment where their first measurement of a moving toy car\'s speed differs slightly from a.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
