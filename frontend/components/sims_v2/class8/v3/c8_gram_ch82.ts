import type { SimDef } from '../../engine/types';

/** v3 generated — c8_gram_ch82 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_gram_ch82: SimDef = {
    id: 'v3_c8_gram_ch82',
    title: 'Reported speech retells what someone said.',
    subtitle: 'Covers statement reporting. Does NOT cover questions and commands (82_002).',
    classLevel: 8, subject: 'gram', topic: 'Reported speech retells what someone said.',
    chapters: ['c8_gram_ch82'],
    nodeIds: ['c8_gram_cbse_82_001', 'c8_gram_cbse_82_002', 'c8_gram_ch82_003', 'c8_gram_ch82_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'The camera moves: direct speech is the speaker\'s camera; reported speech is the reporter\'s camera.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Reported speech retells what someone.', text: 'Reported speech retells what someone said without quoting them: \'I am tired,\' she said → \'She said (that) she was tired.\' Three things move together — tense steps back, pronouns re-anchor to the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c8_gram_cbse_82_002', title: 'Identify each idea',
          dissect: { specimen: 'Reported speech retells what someone said.', spots: [
            { id: 's1', label: 'Reported speech retells what someone', prompt: 'Which idea is this? — Reported speech retells what someone said without quoting them: \'I am tired,\' she said →.', answer: 'Reported speech retells what someone', options: ['Reported speech retells what someone', 'Reported questions and commands change', 'Reported yesno questions are introduced', 'The backshift rule is conditional'] },
            { id: 's2', label: 'Reported questions and commands change', prompt: 'Which idea is this? — Reported questions and commands change shape, not just tense: questions lose their.', answer: 'Reported questions and commands change', options: ['Reported questions and commands change', 'Reported speech retells what someone', 'Reported yesno questions are introduced', 'The backshift rule is conditional'] },
            { id: 's3', label: 'Reported yesno questions are introduced', prompt: 'Which idea is this? — Reported yes/no questions are introduced by \'asked + if/whether\' and take statement word.', answer: 'Reported yesno questions are introduced', options: ['Reported yesno questions are introduced', 'Reported speech retells what someone', 'Reported questions and commands change', 'The backshift rule is conditional'] },
            { id: 's4', label: 'The backshift rule is conditional', prompt: 'Which idea is this? — The backshift rule is conditional on the reporting verb\'s tense: with a past reporting.', answer: 'The backshift rule is conditional', options: ['The backshift rule is conditional', 'Reported speech retells what someone', 'Reported questions and commands change', 'Reported yesno questions are introduced'] }
          ] } },
        { type: 'build', nodeId: 'c8_gram_cbse_82_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['said + that / told + object + that.', 'Deictics shift (now→then, here→there, this→that, today→that.', 'Tense steps back (am→was, will→would, can→could).', 'Pronouns re-anchor to the reporter\'s view.'], answer: 'Pronouns re-anchor to the reporter\'s view. Tense steps back (am→was, will→would, can→could). Deictics shift (now→then, here→there, this→that, today→that. said + that / told + object + that.' } },
        { type: 'case', nodeId: 'c8_gram_ch82_004', title: 'You made it',
          caseStudy: { intro: 'You finished Reported speech retells what someone said. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c8_gram_cbse_82_001', difficulty: 'standard',
          question: 'Reported speech retells what someone said without quoting them: \'I am tired,\'.',
          hint: 'Work step by step.',
          misconception: 'Students shift the verb but leave pronouns and pointing words anchored to the original speaker — \'He said he is tired.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reported speech retells what someone said without quoting them: \'I am tired,\' she said →',
                  options: ['Reported speech retells what someone said without quoting them: \'I am tired,\' she said →', 'Reported questions and commands change shape, not just tense: questions lose their', 'Reported yes/no questions are introduced by \'asked + if/whether\' and take statement word', 'The backshift rule is conditional on the reporting verb\'s tense: with a past reporting'],
                  hint: 'Recall the definition.',
                  misconception: 'Students shift the verb but leave pronouns and pointing words anchored to the original speaker — \'He said he is tired today\' — a half-done.' }
          ],
            remediations: { 'students-shift-the-verb-but': { steps: ['Pronouns re-anchor to the reporter\'s view.', 'Tense steps back (am→was, will→would, can→could).', 'Deictics shift (now→then, here→there, this→that, today→that day).', 'said + that / told + object + that.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_cbse_82_002', difficulty: 'standard',
          question: 'Reported questions and commands change shape, not just tense: questions lose.',
          hint: 'Work step by step.',
          misconception: 'Students keep question grammar inside reports (\'asked where did I go\'), glue commands with \'that\' (\'told that sit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reported questions and commands change shape, not just tense: questions lose their',
                  options: ['Reported questions and commands change shape, not just tense: questions lose their', 'Reported speech retells what someone said without quoting them: \'I am tired,\' she said →', 'Reported yes/no questions are introduced by \'asked + if/whether\' and take statement word', 'The backshift rule is conditional on the reporting verb\'s tense: with a past reporting'],
                  hint: 'Recall the definition.',
                  misconception: 'Students keep question grammar inside reports (\'asked where did I go\'), glue commands with \'that\' (\'told that sit down\'), and drop the.' }
          ],
            remediations: { 'students-keep-question-grammar-inside': { steps: ['Type-check — yes/no → if/whether; wh- → keep the wh-word; command → to-infinitive.', 'Kill question order and do-support.', 'Commands need an object — who is being told.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch82_003', difficulty: 'standard',
          question: 'Reported yes/no questions are introduced by \'asked + if/whether\' and take.',
          hint: 'Work step by step.',
          misconception: 'Students keep the question shape inside the report — \'He asked if was I tired\' — as if quoting with an if attached.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reported yes/no questions are introduced by \'asked + if/whether\' and take statement word',
                  options: ['Reported yes/no questions are introduced by \'asked + if/whether\' and take statement word', 'Reported speech retells what someone said without quoting them: \'I am tired,\' she said →', 'Reported questions and commands change shape, not just tense: questions lose their', 'The backshift rule is conditional on the reporting verb\'s tense: with a past reporting'],
                  hint: 'Recall the definition.',
                  misconception: 'Students keep the question shape inside the report — \'He asked if was I tired\' — as if quoting with an if attached.' }
          ],
            remediations: { 'students-keep-the-question-shape': { steps: ['Strip the question: drop do-support and inversion, add \'asked if/whether\', backshift the verb, then sweep every.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch82_004', difficulty: 'standard',
          question: 'The backshift rule is conditional on the reporting verb\'s tense: with a past.',
          hint: 'Work step by step.',
          misconception: 'Students backshift blindly — every report gets \'was\'. The rule is conditional: present reporting verbs freeze the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The backshift rule is conditional on the reporting verb\'s tense: with a past reporting',
                  options: ['The backshift rule is conditional on the reporting verb\'s tense: with a past reporting', 'Reported speech retells what someone said without quoting them: \'I am tired,\' she said →', 'Reported questions and commands change shape, not just tense: questions lose their', 'Reported yes/no questions are introduced by \'asked + if/whether\' and take statement word'],
                  hint: 'Recall the definition.',
                  misconception: 'Students backshift blindly — every report gets \'was\'. The rule is conditional: present reporting verbs freeze the tense, and universal.' }
          ],
            remediations: { 'students-backshift-blindly-every-report': { steps: ['Underline the reporting verb first.', 'Past → backshift; present/future → keep the tense.', 'Then ask: is the reported clause a timeless fact?'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
