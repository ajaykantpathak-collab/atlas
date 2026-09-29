import type { SimDef } from '../../engine/types';

/** v3 generated — c8_gram_ch83 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_gram_ch83: SimDef = {
    id: 'v3_c8_gram_ch83',
    title: 'The verb agrees with the head of the subject.',
    subtitle: 'Covers head-noun agreement with decoys. Does NOT cover indefinites, collectives,.',
    classLevel: 8, subject: 'gram', topic: 'The verb agrees with the head of the subject.',
    chapters: ['c8_gram_ch83'],
    nodeIds: ['c8_gram_cbse_83_001', 'c8_gram_ch83_002', 'c8_gram_ch83_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'Strip surgery: \'The colour of the walls ___ (is/are) fading.\' Delete \'of the walls\' → \'the colour IS fading\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'The verb agrees with the head of the.', text: 'The verb agrees with the head of the subject, not with whatever noun stands nearest. \'The bunch of keys IS on the table\' — \'bunch\' is the head, \'keys\' is a decoy inside an of-phrase.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c8_gram_ch83_002', title: 'Identify each idea',
          dissect: { specimen: 'The verb agrees with the head of the subject.', spots: [
            { id: 's1', label: 'The verb agrees with the', prompt: 'Which idea is this? — The verb agrees with the head of the subject, not with whatever noun stands nearest.', answer: 'The verb agrees with the', options: ['The verb agrees with the', 'Agreement traps centre on distributive', 'In there isare constructions the'] },
            { id: 's2', label: 'Agreement traps centre on distributive', prompt: 'Which idea is this? — Agreement traps centre on distributive and indefinite subjects: \'each\', \'every\'.', answer: 'Agreement traps centre on distributive', options: ['Agreement traps centre on distributive', 'The verb agrees with the', 'In there isare constructions the'] },
            { id: 's3', label: 'In there isare constructions the', prompt: 'Which idea is this? — In \'there is/are\' constructions the grammatical subject follows the verb, so agreement.', answer: 'In there isare constructions the', options: ['In there isare constructions the', 'The verb agrees with the', 'Agreement traps centre on distributive'] }
          ] } },
        { type: 'build', nodeId: 'c8_gram_cbse_83_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['In there-sentences, look past \'there\' to the noun after the.', 'Agree with the surviving head.', 'Cross out of-phrases and comma-inserts.', 'Find the verb, ask \'who/what + verb\'.'], answer: 'Find the verb, ask \'who/what + verb\'. Cross out of-phrases and comma-inserts. Agree with the surviving head. In there-sentences, look past \'there\' to the noun after the.' } },
        { type: 'case', nodeId: 'c8_gram_ch83_003', title: 'You made it',
          caseStudy: { intro: 'You finished The verb agrees with the head of the subject. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c8_gram_cbse_83_001', difficulty: 'standard',
          question: 'The verb agrees with the head of the subject, not with whatever noun stands.',
          hint: 'Work step by step.',
          misconception: 'Students agree with the nearest noun (\'the walls are\') and treat \'as well as\' like \'and\' — the two most common concord.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The verb agrees with the head of the subject, not with whatever noun stands nearest',
                  options: ['The verb agrees with the head of the subject, not with whatever noun stands nearest', 'Agreement traps centre on distributive and indefinite subjects: \'each\', \'every\',', 'In \'there is/are\' constructions the grammatical subject follows the verb, so agreement is'],
                  hint: 'Recall the definition.',
                  misconception: 'Students agree with the nearest noun (\'the walls are\') and treat \'as well as\' like \'and\' — the two most common concord errors at this level.' }
          ],
            remediations: { 'students-agree-with-the-nearest': { steps: ['Find the verb, ask \'who/what + verb\'.', 'Cross out of-phrases and comma-inserts.', 'Agree with the surviving head.', 'In there-sentences, look past \'there\' to the noun after the verb.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch83_002', difficulty: 'standard',
          question: 'Agreement traps centre on distributive and indefinite subjects: \'each\'.',
          hint: 'Work step by step.',
          misconception: 'Students let the nearest plural noun win — \'Each of the boys have\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Agreement traps centre on distributive and indefinite subjects: \'each\', \'every\',',
                  options: ['Agreement traps centre on distributive and indefinite subjects: \'each\', \'every\',', 'The verb agrees with the head of the subject, not with whatever noun stands nearest', 'In \'there is/are\' constructions the grammatical subject follows the verb, so agreement is'],
                  hint: 'Recall the definition.',
                  misconception: 'Students let the nearest plural noun win — \'Each of the boys have\'. The trap words govern alone; the of-phrase is a decoy.' }
          ],
            remediations: { 'students-let-the-nearest-plural': { steps: ['Box the trap word (each/every/neither/either).', 'If it stands alone with an of-phrase, the verb is singular.', 'If joined by or/nor, measure from the nearer subject.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch83_003', difficulty: 'standard',
          question: 'In \'there is/are\' constructions the grammatical subject follows the verb,.',
          hint: 'Work step by step.',
          misconception: 'Students let \'there\' pull the verb to singular by reflex — \'There is many reasons\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In \'there is/are\' constructions the grammatical subject follows the verb, so agreement is',
                  options: ['In \'there is/are\' constructions the grammatical subject follows the verb, so agreement is', 'The verb agrees with the head of the subject, not with whatever noun stands nearest', 'Agreement traps centre on distributive and indefinite subjects: \'each\', \'every\','],
                  hint: 'Recall the definition.',
                  misconception: 'Students let \'there\' pull the verb to singular by reflex — \'There is many reasons\'.' }
          ],
            remediations: { 'students-let-there-pull-the': { steps: ['Delete \'there\' mentally and find the noun the verb describes.', 'For quantity phrases, memorise the split: \'a number of\' = plural, \'the number of\' = singular.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
