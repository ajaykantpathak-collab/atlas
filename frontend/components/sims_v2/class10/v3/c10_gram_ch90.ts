import type { SimDef } from '../../engine/types';

/** v3 generated — c10_gram_ch90 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_gram_ch90: SimDef = {
    id: 'v3_c10_gram_ch90',
    title: 'English has exactly twelve tense forms — three.',
    subtitle: 'Covers the structure and meaning of all 12 forms with regular verbs.',
    classLevel: 10, subject: 'gram', topic: 'English has exactly twelve tense forms — three.',
    chapters: ['c10_gram_ch90'],
    nodeIds: ['c10_gram_cbse_90_001', 'c10_gram_cbse_90_002', 'c10_gram_cbse_90_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'Draw the grid on the board: rows = time, columns = aspect. Take ONE idea — \'Riya writes a letter\' — and move.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'English has exactly twelve tense forms.', text: 'English has exactly twelve tense forms — three times (present, past, future) crossed with four aspects (simple, continuous, perfect, perfect-continuous).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c10_gram_cbse_90_002', title: 'Identify each idea',
          dissect: { specimen: 'English has exactly twelve tense forms — three.', spots: [
            { id: 's1', label: 'English has exactly twelve tense', prompt: 'Which idea is this? — English has exactly twelve tense forms — three times (present, past, future) crossed with.', answer: 'English has exactly twelve tense', options: ['English has exactly twelve tense', 'Stative verbs know believe', 'Certain adverbials and structures force'] },
            { id: 's2', label: 'Stative verbs know believe', prompt: 'Which idea is this? — Stative verbs — know, believe, love, own, seem, understand — describe states, not.', answer: 'Stative verbs know believe', options: ['Stative verbs know believe', 'English has exactly twelve tense', 'Certain adverbials and structures force'] },
            { id: 's3', label: 'Certain adverbials and structures force', prompt: 'Which idea is this? — Certain adverbials and structures force specific tense choices: \'since/for\' demands.', answer: 'Certain adverbials and structures force', options: ['Certain adverbials and structures force', 'English has exactly twelve tense', 'Stative verbs know believe'] }
          ] } },
        { type: 'build', nodeId: 'c10_gram_cbse_90_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Strip the sentence to subject + main verb + helpers.', 'Ask \'is it done, ongoing, or completed-but-connected?\' →.', 'Ask \'when does the action happen?\' → that fixes the row.', 'Rebuild the verb phrase from the cell, not from memory.'], answer: 'Strip the sentence to subject + main verb + helpers. Ask \'when does the action happen?\' → that fixes the row. Ask \'is it done, ongoing, or completed-but-connected?\' →. Rebuild the verb phrase from the cell, not from memory.' } },
        { type: 'case', nodeId: 'c10_gram_cbse_90_003', title: 'You made it',
          caseStudy: { intro: 'You finished English has exactly twelve tense forms — three. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c10_gram_cbse_90_001', difficulty: 'standard',
          question: 'English has exactly twelve tense forms — three times (present, past, future).',
          hint: 'Work step by step.',
          misconception: 'Students believe the tense name describes the verb alone (\'wrote = past tense of write\') and miss that aspect — the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'English has exactly twelve tense forms',
                  options: ['English has exactly twelve tense forms', 'Stative verbs — know, believe, love, own, seem, understand — describe states, not', 'Certain adverbials and structures force specific tense choices: \'since/for\' demands'],
                  hint: 'Recall the definition.',
                  misconception: 'Students believe the tense name describes the verb alone (\'wrote = past tense of write\') and miss that aspect — the helper verbs — carries.' }
          ],
            remediations: { 'the-tense-name-describes-the': { steps: ['Strip the sentence to subject + main verb + helpers.', 'Ask \'when does the action happen?\' → that fixes the row.', 'Ask \'is it done, ongoing, or completed-but-connected?\' → that fixes the column.', 'Rebuild the verb phrase from the cell, not from memory.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_90_002', difficulty: 'standard',
          question: 'Stative verbs — know, believe, love, own, seem, understand — describe states.',
          hint: 'Work step by step.',
          misconception: 'Students memorize a stative list without the state-vs-action test, so they freeze on unlisted verbs — and they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Stative verbs — know, believe, love, own, seem, understand — describe states, not',
                  options: ['Stative verbs — know, believe, love, own, seem, understand — describe states, not', 'English has exactly twelve tense forms', 'Certain adverbials and structures force specific tense choices: \'since/for\' demands'],
                  hint: 'Recall the definition.',
                  misconception: 'Students memorize a stative list without the state-vs-action test, so they freeze on unlisted verbs — and they over-apply the rule, writing.' }
          ],
            remediations: { 'students-memorize-a-stative-list': { steps: ['Ask \'is this something you DO, or something that IS?\'', 'If it IS (a state), use simple form.', 'Check the trap verbs — think/have/see/taste — and ask which meaning is intended before deciding.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_90_003', difficulty: 'standard',
          question: 'Certain adverbials and structures force specific tense choices: \'since/for\'.',
          hint: 'Work step by step.',
          misconception: 'Students ignore markers and translate from their mother tongue — Hindi \'main 2019 se yahan hoon\' feels like present,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Certain adverbials and structures force specific tense choices: \'since/for\' demands',
                  options: ['Certain adverbials and structures force specific tense choices: \'since/for\' demands', 'English has exactly twelve tense forms', 'Stative verbs — know, believe, love, own, seem, understand — describe states, not'],
                  hint: 'Recall the definition.',
                  misconception: 'Students ignore markers and translate from their mother tongue — Hindi \'main 2019 se yahan hoon\' feels like present, so they write \'I.' }
          ],
            remediations: { 'students-ignore-markers-and-translate': { steps: ['Underline every time expression BEFORE choosing the tense.', 'Match marker → licensed form (since/for → perfect; by the time → perfect; while → continuous).', 'Check if a second verb needs the interrupting-event form (simple past).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
