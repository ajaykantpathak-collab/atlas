import type { SimDef } from '../../engine/types';

/** v3 generated — c10_gram_ch91 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_gram_ch91: SimDef = {
    id: 'v3_c10_gram_ch91',
    title: 'Subject–verb agreement is decided by the HEAD.',
    subtitle: 'Covers head-noun identification and the decoy structures (prepositional phrases.',
    classLevel: 10, subject: 'gram', topic: 'Subject–verb agreement is decided by the HEAD.',
    chapters: ['c10_gram_ch91'],
    nodeIds: ['c10_gram_cbse_91_001', 'c10_gram_cbse_91_002', 'c10_gram_cbse_91_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'Take \'The leader, along with his followers, ___ (is/are) here.\' Cover everything after the comma — the.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Subject–verb agreement is decided by.', text: 'Subject–verb agreement is decided by the HEAD of the subject phrase, never by the noun nearest the verb. \'The box of chocolates is empty\' — \'box\' is the head, \'chocolates\' is a prepositional decoy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c10_gram_cbse_91_002', title: 'Identify each idea',
          dissect: { specimen: 'Subject–verb agreement is decided by the HEAD.', spots: [
            { id: 's1', label: 'Subjectverb agreement is decided by', prompt: 'Which idea is this? — Subject–verb agreement is decided by the HEAD of the subject phrase, never by the noun.', answer: 'Subjectverb agreement is decided by', options: ['Subjectverb agreement is decided by', 'Indefinite pronouns have fixed agreement', 'Collective nouns team committee jury'] },
            { id: 's2', label: 'Indefinite pronouns have fixed agreement', prompt: 'Which idea is this? — Indefinite pronouns have fixed agreement: each/every/everyone/someone/nobody are always.', answer: 'Indefinite pronouns have fixed agreement', options: ['Indefinite pronouns have fixed agreement', 'Subjectverb agreement is decided by', 'Collective nouns team committee jury'] },
            { id: 's3', label: 'Collective nouns team committee jury', prompt: 'Which idea is this? — Collective nouns (team, committee, jury, family) take singular when the group acts as one.', answer: 'Collective nouns team committee jury', options: ['Collective nouns team committee jury', 'Subjectverb agreement is decided by', 'Indefinite pronouns have fixed agreement'] }
          ] } },
        { type: 'build', nodeId: 'c10_gram_cbse_91_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Find the verb.', 'Ask \'who/what + verb?\' — that phrase is the subject.', 'Cross out prepositional phrases and as-well-as inserts.', 'Agree with what survives.'], answer: 'Find the verb. Ask \'who/what + verb?\' — that phrase is the subject. Cross out prepositional phrases and as-well-as inserts. Agree with what survives.' } },
        { type: 'case', nodeId: 'c10_gram_cbse_91_003', title: 'You made it',
          caseStudy: { intro: 'You finished Subject–verb agreement is decided by the HEAD. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c10_gram_cbse_91_001', difficulty: 'standard',
          question: 'Subject–verb agreement is decided by the HEAD of the subject phrase, never.',
          hint: 'Work step by step.',
          misconception: 'Students agree the verb with the nearest noun (\'the box of chocolates are\') — proximity agreement — and treat \'as well.',
          parts: [
                { id: 'a', prompt: '\'The captain, as well as the players, ___ (was/were) congratulated.\'', answer: '\'was\' — \'as well as\' is a parenthetical insert, not a coordinator',
                  options: ['\'was\' — \'as well as\' is a parenthetical insert, not a coordinator', 'as-well-as = and, the exact misconception this node exists to kill'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students agree the verb with the nearest noun (\'the box of chocolates are\') — proximity agreement — and treat \'as well as / along with\'.' }
          ],
            remediations: { 'students-agree-the-verb-with': { steps: ['Find the verb.', 'Ask \'who/what + verb?\' — that phrase is the subject.', 'Cross out prepositional phrases and as-well-as inserts inside it.', 'Agree with what survives.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_91_002', difficulty: 'standard',
          question: 'Indefinite pronouns have fixed agreement: each/every/everyone/someone/nobody.',
          hint: 'Work step by step.',
          misconception: 'Students think \'everyone/everybody\' is plural because it means \'all people\' — semantic plurality — and write \'everyone.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Indefinite pronouns have fixed agreement: each/every/everyone/someone/nobody are always',
                  options: ['Indefinite pronouns have fixed agreement: each/every/everyone/someone/nobody are always', 'Subject–verb agreement is decided by the HEAD of the subject phrase, never by the noun', 'Collective nouns (team, committee, jury, family) take singular when the group acts as one'],
                  hint: 'Recall the definition.',
                  misconception: 'Students think \'everyone/everybody\' is plural because it means \'all people\' — semantic plurality — and write \'everyone are\'.' }
          ],
            remediations: { 'everyone-everybody-is-plural-because': { steps: ['Name the subject word.', 'If it\'s an indefinite, check which box it lives in.', 'For some/all/most, agree with the noun after \'of\'.', 'For neither-nor, agree with the subject CLOSER to the verb.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_91_003', difficulty: 'standard',
          question: 'Collective nouns (team, committee, jury, family) take singular when the group.',
          hint: 'Work step by step.',
          misconception: 'Students mark by spelling — anything ending in \'s\' gets a plural verb (\'the news are\'), and collectives get memorized.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Collective nouns (team, committee, jury, family) take singular when the group acts as one',
                  options: ['Collective nouns (team, committee, jury, family) take singular when the group acts as one', 'Subject–verb agreement is decided by the HEAD of the subject phrase, never by the noun', 'Indefinite pronouns have fixed agreement: each/every/everyone/someone/nobody are always'],
                  hint: 'Recall the definition.',
                  misconception: 'Students mark by spelling — anything ending in \'s\' gets a plural verb (\'the news are\'), and collectives get memorized as always-singular.' }
          ],
            remediations: { 'students-mark-by-spelling-anything': { steps: ['For collectives ask \'acting as one unit, or as separate members?\'', 'For -s words, check the fixed-form list first.', 'For \'a pair of scissors/trousers\', agree with \'pair\' (singular).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
