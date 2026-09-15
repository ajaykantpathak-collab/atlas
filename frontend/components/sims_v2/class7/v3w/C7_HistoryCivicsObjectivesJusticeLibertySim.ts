import type { SimDef } from '../../engine/types';
import C7_HistoryCivicsObjectivesJusticeLibertySim from '../../../simulations/c6_12/C7_HistoryCivicsObjectivesJusticeLibertySim';

/** v3 wrapped master — C7_HistoryCivicsObjectivesJusticeLibertySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_historycivicsobjectivesjusticelibertysim: SimDef = {
    id: 'v3w_c7_historycivicsobjectivesjusticelibertysim',
    title: 'Objectives Justice Liberty',
    subtitle: 'Covers the meaning, values, and ideals enshrined in the Preamble to the Indian.',
    classLevel: 7, subject: 'history', topic: 'Preamble to the Constitution: Values and Ideals',
    chapters: [],
    nodeIds: ['c7_civ_ch02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are reading the opening page of a thick, important book of rules for a school club, and the very.', goal: 'Master Objectives Justice Liberty.' },
    discovery: {
        question: 'What are the five key descriptive terms used in the Preamble to define the nature of the Indian State?',
        options: ['The correct answer is Sovereign, Socialist, Secular, Democratic, and Republic', 'Fundamental Rights', 'Justice, Liberty, Equality, Fraternity'],
        answer: 'The correct answer is Sovereign, Socialist, Secular, Democratic, and Republic',
        hook: 'Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights, believing they can.',
    },
    teaching: [
        { title: 'The Preamble to the Indian Constitution is.', text: 'The Preamble to the Indian Constitution is an introductory statement that outlines the guiding values, ideals, and objectives of the nation, such as justice, liberty, equality, and fraternity,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_civ_ch02_010', title: 'The Preamble to the Indian Constitution.',
          scaffold: { problem: 'A local government body decides to allow only people belonging to a particular linguistic group to run businesses in the main market.',
            steps: [
            { text: 'Identify the discriminatory action taken by the local government body against a specific linguistic group.' },
            { text: 'Recall the Preamble ideals relating to equality of status and opportunity, as well as fraternity assuring the dignity.' },
            { text: 'Apply the principle of equality to linguistic diversity, recognizing that all citizens regardless of language have an.' },
            { text: 'Analyze how restricting business rights based on language undermines both secular/democratic harmony and economic.' },
            { text: 'Conclude that the policy violates the Preamble\'s promise of Equality and Fraternity because it creates artificial.', faded: true, blankAnswer: 'The policy violates Equality and Fraternity because it.' }
            ] } }
    ],
    explore: { component: C7_HistoryCivicsObjectivesJusticeLibertySim, prompt: 'Explore the interactive — Objectives Justice Liberty' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_civ_ch02_010', difficulty: 'standard',
          question: 'The Preamble to the Indian Constitution is an introductory statement that.',
          hint: 'Review democratic ideals and fundamental rights from Grade 6 civics to see how.',
          misconception: 'Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights, believing they can.',
          parts: [
                { id: 'a', prompt: 'What are the five key descriptive terms used in the Preamble to define the nature of the Indian State?', answer: 'The correct answer is Sovereign, Socialist, Secular, Democratic, and Republic',
                  options: ['The correct answer is Sovereign, Socialist, Secular, Democratic, and Republic', 'Fundamental Rights', 'Justice, Liberty, Equality, Fraternity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights, believing they can directly file a.' },
                { id: 'b', prompt: 'Why is India described as a "Republic" rather than a monarchy in the Preamble?', answer: 'India is a Republic',
                  options: ['India is a Republic', 'My Preamble rights were violated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights, believing they can directly file a.' },
                { id: 'c', prompt: 'A local sports club in your neighborhood denies membership to children from certain communities.', answer: 'The correct answer is Equality and Fraternity',
                  options: ['The correct answer is Equality and Fraternity', 'Sovereignty', 'My Preamble rights were violated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights, believing they can directly file a.' }
          ],
            remediations: { 'the-preamble-is-a-legally': { steps: ['To fix this, explain that the Preamble is like the "title track" or "mission statement" of a movie or organization—it.', 'Show students that while courts look at the Preamble to understand the spirit of the law, actual legal complaints must.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
