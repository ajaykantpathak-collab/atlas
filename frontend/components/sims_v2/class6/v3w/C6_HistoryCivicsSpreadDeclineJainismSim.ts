import type { SimDef } from '../../engine/types';
import C6_HistoryCivicsSpreadDeclineJainismSim from '../../../simulations/c6_12/C6_HistoryCivicsSpreadDeclineJainismSim';

/** v3 wrapped master — C6_HistoryCivicsSpreadDeclineJainismSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_historycivicsspreaddeclinejainismsim: SimDef = {
    id: 'v3w_c6_historycivicsspreaddeclinejainismsim',
    title: 'Spread Decline Jainism',
    subtitle: 'This node covers the methods of expansion (edicts, stupas, missionaries) and the.',
    classLevel: 6, subject: 'history', topic: 'The Spread of Buddhism Under Ashoka',
    chapters: [],
    nodeIds: ['c6_history_ch05_011', 'c6_history_ch05_012', 'c6_history_ch05_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you have a great idea for a community project, but only a few people know about it.', goal: 'Master Spread Decline Jainism.' },
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
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_012', title: 'The Post-Mauryan period refers to the.',
          caseStudy: { intro: 'Imagine your school team, which was once the largest and strongest in the city, suddenly loses its head coach and begins to break into smaller, independent.',
            decisions: [{ prompt: 'Who was the general that ended the Mauryan dynasty and established the Shunga dynasty?', options: [
                { text: 'The general was Pushyamitra Shunga', outcome: 'The general was Pushyamitra Shunga. A wrong answer here suggests the student is confusing the.' },
                { text: 'conquered', outcome: 'Not quite — Students often assume the Mauryan Empire was "conquered" by an outside force, when in fact, the.', reveals: 'the-mauryan-empire-was-conquered' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_013', title: 'The Gupta Empire was a powerful Indian.',
          caseStudy: { intro: 'Have you ever noticed how some school years feel like everything goes right—you make new friends, do well in sports, and learn new things easily?',
            decisions: [{ prompt: 'Who was the founder of the Gupta Empire and in what year did he begin his rule?', options: [
                { text: 'The founder was Chandragupta I, who began his rule around 320 CE', outcome: 'The founder was Chandragupta I, who began his rule around 320 CE.' },
                { text: 'Chandragupta', outcome: 'Not quite — Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named.', reveals: 'students-often-confuse-the-gupta' },
                { text: 'they are the same time period', outcome: 'Not quite — Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named.', reveals: 'students-often-confuse-the-gupta' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_history_ch05_012', title: 'Identify each idea',
          dissect: { specimen: 'Spread Decline Jainism', spots: [
            { id: 's1', label: 'The spread of Buddhism under', prompt: 'Which idea is this? — The spread of Buddhism under Ashoka refers to the transformation of a small, local.', answer: 'The spread of Buddhism under', options: ['The spread of Buddhism under', 'The Post-Mauryan period refers to', 'The Gupta Empire was a'] },
            { id: 's2', label: 'The Post-Mauryan period refers to', prompt: 'Which idea is this? — The Post-Mauryan period refers to the era following the decline of the Mauryan Empire.', answer: 'The Post-Mauryan period refers to', options: ['The Post-Mauryan period refers to', 'The spread of Buddhism under', 'The Gupta Empire was a'] },
            { id: 's3', label: 'The Gupta Empire was a', prompt: 'Which idea is this? — The Gupta Empire was a powerful Indian dynasty founded by Chandragupta I in 320 CE that.', answer: 'The Gupta Empire was a', options: ['The Gupta Empire was a', 'The spread of Buddhism under', 'The Post-Mauryan period refers to'] }
          ] } }
    ],
    explore: { component: C6_HistoryCivicsSpreadDeclineJainismSim, prompt: 'Explore the interactive — Spread Decline Jainism' },
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
            remediations: { 'ashoka-forced-people-to-become': { steps: ['Explain that after the Kalinga war, Ashoka specifically turned away from war and violence.', 'Point out that "edicts" were about "moral conduct" (Dharma), which are suggestions for how to live, not laws that can.', 'Ask the student: "If you want to be a good person, can someone force you to do it, or do you have to choose?"'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_012', difficulty: 'standard',
          question: 'The Post-Mauryan period refers to the era following the decline of the Mauryan.',
          hint: 'Review the concept of "Successors" in the Mauryan dynasty.',
          misconception: 'Students often assume the Mauryan Empire was "conquered" by an outside force, when in fact, the text notes it declined.',
          parts: [
                { id: 'a', prompt: 'Who was the general that ended the Mauryan dynasty and established the Shunga dynasty?', answer: 'The general was Pushyamitra Shunga',
                  options: ['The general was Pushyamitra Shunga', 'conquered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume the Mauryan Empire was "conquered" by an outside force, when in fact, the text notes it declined due to weak.' },
                { id: 'b', prompt: 'If you were a trader living in the northwest after the Mauryans declined, why might you see new people like the Indo-Greeks settling near you?', answer: 'You would see them',
                  options: ['You would see them', 'superpower', 'conquered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume the Mauryan Empire was "conquered" by an outside force, when in fact, the text notes it declined due to weak.' }
          ],
            remediations: { 'the-mauryan-empire-was-conquered': { steps: ['Direct the student to re-read the transition of power from the last Mauryan emperor to his general.', 'Ask: "If a captain of a ship quits, does the ship get destroyed by a storm, or does the crew start taking different.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume the Mauryan Empire was "conquered" by an outside force, when in fact, the text notes it declined.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to say that the entire Indian subcontinent was ruled by one single authority after 185 BCE? Why or why not?', answer: 'No, it is not accurate',
                  options: ['No, it is not accurate', 'conquered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume the Mauryan Empire was "conquered" by an outside force, when in fact, the text notes it declined due to weak.' }
          ],
            remediations: { 'the-mauryan-empire-was-conquered': { steps: ['Direct the student to re-read the transition of power from the last Mauryan emperor to his general.', 'Ask: "If a captain of a ship quits, does the ship get destroyed by a storm, or does the crew start taking different.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_013', difficulty: 'standard',
          question: 'The Gupta Empire was a powerful Indian dynasty founded by Chandragupta I in 320.',
          hint: 'Review the definition of an "Empire" in the previous chapter to understand the scale of.',
          misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They.',
          parts: [
                { id: 'a', prompt: 'Who was the founder of the Gupta Empire and in what year did he begin his rule?', answer: 'The founder was Chandragupta I, who began his rule around 320 CE',
                  options: ['The founder was Chandragupta I, who began his rule around 320 CE', 'Chandragupta', 'they are the same time period'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They think they are the same.' },
                { id: 'b', prompt: 'Why do historians refer to the Gupta period as the "Golden Age"?', answer: 'It is called the Golden Age',
                  options: ['It is called the Golden Age', 'Golden Age', 'Chandragupta'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They think they are the same.' },
                { id: 'c', prompt: 'Compare the roles of Samudragupta and Chandragupta II in the development of the empire.', answer: 'Samudragupta is known for expanding the empire through military conquest, while',
                  options: ['Samudragupta is known for expanding the empire through military conquest, while', 'conquest', 'reaching a peak'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They think they are the same.' }
          ],
            remediations: { 'students-often-confuse-the-gupta': { steps: ['Look at the timeline provided in your textbook.', 'Ask the student: "Which came first—the Mauryan Empire or the Gupta Empire?" If they are unsure, have them draw a line.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to say the Gupta Empire was only successful because of its kings? Why or why not?', answer: 'It is not entirely accurate',
                  options: ['It is not entirely accurate', 'top-down', 'Chandragupta', 'they are the same time period'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They think they are the same.' }
          ],
            remediations: { 'students-often-confuse-the-gupta': { steps: ['Look at the timeline provided in your textbook.', 'Ask the student: "Which came first—the Mauryan Empire or the Gupta Empire?" If they are unsure, have them draw a line.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
