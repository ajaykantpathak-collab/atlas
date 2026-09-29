import type { SimDef } from '../../engine/types';
import C6_HistoryCivicsAshokasConversionBuddhismSim from '../../../simulations/c6_12/C6_HistoryCivicsAshokasConversionBuddhismSim';

/** v3 wrapped master — C6_HistoryCivicsAshokasConversionBuddhismSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_historycivicsashokasconversionbuddhismsim: SimDef = {
    id: 'v3w_c6_historycivicsashokasconversionbuddhismsim',
    title: 'The Spread of Buddhism Under Ashoka',
    subtitle: 'This node covers the methods of expansion (edicts, stupas, missionaries) and the.',
    classLevel: 6, subject: 'history', topic: 'The Spread of Buddhism Under Ashoka',
    chapters: [],
    nodeIds: ['c6_history_ch05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you have a great idea for a community project, but only a few people know about it.', goal: 'Master The Spread of Buddhism Under Ashoka.' },
    discovery: {
        question: 'If Ashoka wanted to reach people who could not read, which of his methods would be most effective?',
        options: ['He would use stupas and viharas', 'forced', 'Ashoka "forced" people to become Buddhists'],
        answer: 'He would use stupas and viharas',
        hook: 'Students often think Ashoka "forced" people to become Buddhists.',
    },
    teaching: [
        { title: 'The spread of Buddhism under Ashoka refers.', text: 'The spread of Buddhism under Ashoka refers to the transformation of a small, local religious group into a major world religion through the royal support and administrative efforts of the Mauryan.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_history_ch05_011', title: 'The spread of Buddhism under Ashoka.',
          caseStudy: { intro: 'Imagine you have a great idea for a community project, but only a few people know about it. How do you make sure the whole country hears about it?',
            decisions: [{ prompt: 'What were the two types of structures Ashoka built to help spread Buddhism?', options: [
                { text: 'Ashoka built stupas (dome-shaped monuments containing relics) and viharas (monasteries)', outcome: 'Ashoka built stupas (dome-shaped monuments containing relics) and viharas (monasteries).' },
                { text: 'forced', outcome: 'Not quite — Students often think Ashoka "forced" people to become Buddhists.', reveals: 'ashoka-forced-people-to-become' },
                { text: 'Ashoka "forced" people to become Buddhists', outcome: 'Not quite — Students often think Ashoka "forced" people to become Buddhists.', reveals: 'ashoka-forced-people-to-become' }
            ] }] } }
    ],
    explore: { component: C6_HistoryCivicsAshokasConversionBuddhismSim, prompt: 'Explore the interactive — The Spread of Buddhism Under Ashoka' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch05_011', difficulty: 'standard',
          question: 'The spread of Buddhism under Ashoka refers to the transformation of a small,.',
          hint: 'Review the shift in Ashoka’s policy from "Conquest by Force" to "Conquest by Dharma."',
          misconception: 'Students often think Ashoka "forced" people to become Buddhists.',
          parts: [
                { id: 'a', prompt: 'If Ashoka wanted to reach people who could not read, which of his methods would be most effective?', answer: 'He would use stupas and viharas',
                  options: ['He would use stupas and viharas', 'forced', 'Ashoka "forced" people to become Buddhists'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Ashoka "forced" people to become Buddhists. However, Ashoka used moral persuasion and public messaging, not violence.' }
          ],
            remediations: { 'ashoka-forced-people-to-become': { steps: ['Explain that after the Kalinga war, Ashoka specifically turned away from war and violence.', 'Point out that "edicts" were about "moral conduct" (Dharma), which are suggestions for how to live, not laws that can.', 'Ask the student: "If you want to be a good person, can someone force you to do it, or do you have to choose?"'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
