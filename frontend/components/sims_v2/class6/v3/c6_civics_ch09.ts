import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch09 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch09: SimDef = {
    id: 'v3_c6_civics_ch09',
    title: 'Family and Community',
    subtitle: 'This node covers the meaning of family and community and their roles in a child\'s life.',
    classLevel: 6, subject: 'civics', topic: 'Family and Community',
    chapters: ['c6_civics_ch09'],
    nodeIds: ['c6_civics_ch09_001', 'c6_civics_ch09_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Draw a circle around the people you live with — that is your family.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is the difference between economic and non-economic work?',
        options: ['Economic work is done for payment', 'real work', 'only paid jobs count as "real work'],
        answer: 'Economic work is done for payment',
        hook: 'Students often think only paid jobs count as "real work." Non-economic work — household labour, caregiving.',
    },
    teaching: [
        { title: 'What family and community mean', text: 'A family is a group of people related by birth, marriage, or adoption who live together and share responsibilities — it may be a nuclear family (parents and children) or a joint family (with.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['What family and community', 'The value and dignity'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch09_001', title: 'What family and community mean',
          caseStudy: { intro: 'Draw a circle around the people you live with — that is your family.',
            decisions: [{ prompt: 'What is a family? Name its two main types.', options: [
                { text: 'A family is a group of people related by birth, marriage, or adoption who live together', outcome: 'A family is a group of people related by birth, marriage, or adoption who live together and share.' },
                { text: 'people in a house', outcome: 'Not quite — Students often think "community" just means the neighbourhood.', reveals: 'community-just-means-the-neighbourhood' },
                { text: 'community', outcome: 'Not quite — Students often think "community" just means the neighbourhood.', reveals: 'community-just-means-the-neighbourhood' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch09_002', title: 'The value and dignity of work',
          caseStudy: { intro: 'List the people your morning depends on: the milk seller, the bus driver, the teacher, the farmer who grew your breakfast — all working so your day runs.',
            decisions: [{ prompt: 'What is the difference between economic and non-economic work?', options: [
                { text: 'Economic work is done for payment', outcome: 'Economic work is done for payment — it earns income, like a farmer selling crops.' },
                { text: 'real work', outcome: 'Not quite — Students often think only paid jobs count as "real work." Non-economic work — household labour.', reveals: 'only-paid-jobs-count-as' },
                { text: 'only paid jobs count as "real work', outcome: 'Not quite — Students often think only paid jobs count as "real work." Non-economic work — household labour.', reveals: 'only-paid-jobs-count-as' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch09_002', title: 'You made it',
          caseStudy: { intro: 'You finished Family and Community — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch09_002', difficulty: 'standard',
          question: 'Work is any activity done with effort for a purpose — it can be economic (paid.',
          hint: 'If stuck, revisit "Family and Community" — the people among whom work happens.',
          misconception: 'Students often think only paid jobs count as "real work." Non-economic work — household labour, caregiving.',
          parts: [
                { id: 'a', prompt: 'What is the difference between economic and non-economic work?', answer: 'Economic work is done for payment',
                  options: ['Economic work is done for payment', 'real work', 'only paid jobs count as "real work'],
                  hint: 'If stuck, revisit "Family and Community" — the people among whom work happens.',
                  misconception: 'Students often think only paid jobs count as "real work." Non-economic work — household labour, caregiving, volunteering — is real work.' }
          ],
            remediations: { 'only-paid-jobs-count-as': { steps: ['If the student treats work as only "a job," list their own day — who cooked, who cleaned, who taught, who drove — and.', 'Then ask "what would happen if nobody did the unpaid work?" — the answer reveals its value.', 'Finish with one unpaid task the student can take on this week.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think only paid jobs count as "real work." Non-economic work — household labour, caregiving.',
          parts: [
                { id: 'a', prompt: 'Why is it wrong to look down on a sweeper\'s work?', answer: 'The sweeper\'s work keeps streets clean and prevents disease',
                  options: ['The sweeper\'s work keeps streets clean and prevents disease', 'real work', 'only paid jobs count as "real work'],
                  hint: 'If stuck, revisit "Family and Community" — the people among whom work happens.',
                  misconception: 'Students often think only paid jobs count as "real work." Non-economic work — household labour, caregiving, volunteering — is real work.' }
          ],
            remediations: { 'only-paid-jobs-count-as': { steps: ['If the student treats work as only "a job," list their own day — who cooked, who cleaned, who taught, who drove — and.', 'Then ask "what would happen if nobody did the unpaid work?" — the answer reveals its value.', 'Finish with one unpaid task the student can take on this week.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
