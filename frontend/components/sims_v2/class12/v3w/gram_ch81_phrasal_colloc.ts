import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c12_gram_ch81 The Fused Words (phrasal verbs + preposition collocations).
 * Nodes: c12_gram_cbse_81_001, 81_002. */
export const c12_gram_ch81: SimDef = {
    id: 'v3w_c12_gram_ch81',
    title: 'The Fused Words',
    subtitle: 'put off = postpone, not "put off the table" — phrasal verbs fuse, prepositions marry their partners, and pronouns force the split',
    classLevel: 12, subject: 'english-grammar', topic: 'Phrasal verbs and preposition collocations',
    chapters: ['c12_gram_ch81'],
    nodeIds: ['c12_gram_cbse_81_001', 'c12_gram_cbse_81_002'],
    emoji: '🧲', theme: { bg: 'from-slate-900 to-emerald-950', accent: 'emerald', scene: 'senior' },

    scenario: {
        role: 'a decoder who knows verb+particle pairs are single units — and that every verb has already chosen its preposition',
        intro: '"Put off the meeting" is fine; "put off it" is not. "Different from" is right; "different than" is the board\'s favourite error. These are learned units, not computed phrases.',
        goal: 'Read phrasal verbs as fused units, apply the pronoun-splitting rule, and supply the fixed preposition for the high-frequency collocations.',
    },
    discovery: {
        question: '"Please turn ___ the volume" → replace "the volume" with "it". Where does "it" go?',
        options: [
            'turn it down — pronouns must split separable phrasal verbs',
            'turn down it — the object follows the unit',
            'down it turn — front the particle',
            'it turn down — pronouns lead',
        ],
        answer: 'turn it down — pronouns must split separable phrasal verbs',
        hook: 'Noun objects may split or stay together; pronouns MUST split — "turn down it" is never legal.',
    },
    teaching: [
        { title: 'The pronoun rule', text: 'Separable verbs split around pronouns: turn it down, pick her up, put it off. Inseparables never split: look after her, run into him.', emoji: '✂️', bgColor: 'from-emerald-500 to-teal-600' },
        { title: 'The married pairs', text: 'different FROM, married TO, afraid OF, insist ON, good AT. And the redundant partners: discuss (no about), return (no back), comprise (no of).', emoji: '💍', bgColor: 'from-teal-500 to-cyan-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c12_gram_cbse_81_001', title: 'The splitting test',
          scaffold: {
            problem: '"She put off the meeting." → replace "the meeting" with "it".',
            steps: [
                { text: 'Is the phrasal verb separable? "put off the meeting" / "put the meeting off" — both legal → separable.' },
                { text: 'Pronoun objects MUST split: "put it off".' },
                { text: '"put off it" is never legal.', faded: true },
                { text: 'You: "pick up the phone" → with "it" → ', blankAnswer: 'pick it up' },
            ],
          } },
        { type: 'dissect', nodeId: 'c12_gram_cbse_81_001', title: 'Fused or literal?',
          dissect: { specimen: 'particle meanings that do not add up',
          spots: [
            { id: 's1', label: 'put-off', prompt: '"The match was put off." — what does "put off" mean here?', answer: 'postponed — the fused meaning, not anything about putting', options: ['postponed — the fused meaning, not anything about putting', 'removed from a surface', 'canceled forever', 'disliked'] },
            { id: 's2', label: 'look-after', prompt: '"She looks the baby after" — legal?', answer: 'no — "look after" is inseparable; "she looks after the baby"', options: ['no — "look after" is inseparable; "she looks after the baby"', 'yes — object can split', 'yes — after is movable', 'looks → looked only'] },
            { id: 's3', label: 'run-into', prompt: '"I ran into an old friend." — meaning?', answer: 'met by chance — the fused meaning, not a collision', options: ['met by chance — the fused meaning, not a collision', 'physically collided', 'ran towards', 'chased'] },
          ] } },
        { type: 'case', nodeId: 'c12_gram_cbse_81_002', title: 'The correction list',
          caseStudy: {
            intro: 'The boards\' favourite errors — every one is a married pair violated or a redundant partner added.',
            decisions: [
              { prompt: '"She is different ___ her sister."', options: [
                  { text: 'from — the fixed partner; "different than" is the classic error', outcome: 'Correct — the collocation is different FROM.' },
                  { text: 'than — comparison needs than', outcome: 'The logic feels right but the pair is fixed — different FROM, like "married to" and "similar to".', reveals: 'different-than' },
                ] },
              { prompt: '"We discussed about the plan and returned back." — how many faults?', options: [
                  { text: 'Two — "discussed about" → "discussed"; "returned back" → "returned"', outcome: 'Correct — both partners are redundant; the verbs are complete.' },
                  { text: 'One — only "discussed about"', outcome: 'Half the audit — "returned back" is equally redundant.', reveals: 'redundancy-blind' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c12_gram_cbse_81_002', title: 'Collocation speed round', drill: { kind: 'fill', count: 4, level: 5 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c12_gram_cbse_81_001', difficulty: 'standard',
          question: '"Please turn ___ down" — where does "it" go in "turn down the volume"?',
          options: [
              { text: 'turn it down — pronouns must split separable phrasal verbs' },
              { text: 'turn down it — object follows the unit', reveals: 'pronoun-placement' },
              { text: 'down it turn — particle fronts', reveals: 'scramble' },
          ],
          answer: 'turn it down — pronouns must split separable phrasal verbs',
          remediations: {
              'pronoun-placement': { steps: ['Noun objects may split or stay together — pronoun objects MUST split.', 'turn it down, pick her up, put it off — never "turn down it".'] },
              'scramble': { steps: ['The particle never leads — the unit is verb + particle around the pronoun.'] },
          },
          hint: 'Pronouns go INSIDE the unit, not after it.',
          misconception: 'students place pronouns after the particle — the splitting rule is not learned' },
        { type: 'mcq', nodeId: 'c12_gram_cbse_81_001', difficulty: 'standard',
          question: '"She ran ___ an old friend at the market." into / after / across?',
          options: [
              { text: 'into — "ran into" = met by chance; the particle carries the fused meaning' },
              { text: 'after — she chased the friend', reveals: 'literal-read' },
              { text: 'across — she crossed paths', reveals: 'literal-read' },
          ],
          answer: 'into — "ran into" = met by chance; the particle carries the fused meaning',
          remediations: {
              'literal-read': { steps: ['Phrasal verbs fuse — the meaning lives in the unit, not the parts.', '"run into" = meet by chance; "ran after" = chased; different sentences entirely.'] },
          },
          hint: 'Did she chase the friend or bump into them?',
          misconception: 'students read particles literally — the fused meaning is missed' },
        { type: 'mcq', nodeId: 'c12_gram_cbse_81_002', difficulty: 'standard',
          question: '"He is married ___ a doctor." with / to / by?',
          options: [
              { text: 'to — "married to" is the fixed partner; "married with" is Hindi-transfer' },
              { text: 'with — marriage is togetherness', reveals: 'hindi-transfer' },
              { text: 'by — the agent needs by', reveals: 'voice-bleed' },
          ],
          answer: 'to — "married to" is the fixed partner; "married with" is Hindi-transfer',
          remediations: {
              'hindi-transfer': { steps: ['Prepositions do not translate — they are married to their verbs.', 'married TO, angry WITH, different FROM — learn them as units.'] },
              'voice-bleed': { steps: ['"married by" would make the doctor the officiant\'s tool — the partner is "to".'] },
          },
          hint: 'Prepositions are memorized partnerships, not logic.',
          misconception: 'students translate Hindi postpositions — "married with" (se shaadi) is the classic transfer' },
        { type: 'sort', nodeId: 'c12_gram_cbse_81_002', difficulty: 'foundation',
          question: 'Match each to its married preposition:',
          sortItems: [
              { id: 'a', label: 'afraid', emoji: '😨', correctBin: 'of' },
              { id: 'b', label: 'insist', emoji: '💪', correctBin: 'on' },
              { id: 'c', label: 'good', emoji: '⭐', correctBin: 'at' },
              { id: 'd', label: 'married', emoji: '💍', correctBin: 'to' },
              { id: 'e', label: 'different', emoji: '↔️', correctBin: 'from' },
          ],
          bins: [
              { id: 'of', label: 'OF', color: '#ef4444' },
              { id: 'on', label: 'ON', color: '#f59e0b' },
              { id: 'at', label: 'AT', color: '#22c55e' },
              { id: 'to', label: 'TO', color: '#0ea5e9' },
              { id: 'from', label: 'FROM', color: '#8b5cf6' },
          ],
          hint: 'afraid OF, insist ON, good AT, married TO, different FROM.',
          misconception: 'students guess prepositions by meaning — they are fixed partnerships' },
        { type: 'subpart', nodeId: 'c12_gram_cbse_81_001', difficulty: 'advanced',
          question: '"She ran into her teacher" — literal or fused?',
          hint: 'Was it a collision or a coincidence?',
          misconception: 'literal reading of fused units',
          parts: [
              { id: 'a', prompt: 'The meaning is…',
                answer: 'met by chance — "ran into" is a fused unit',
                options: ['met by chance — "ran into" is a fused unit', 'collided with her teacher', 'ran towards the teacher'],
                hint: 'The parts do not sum to the meaning.',
                misconception: 'literal particle reading' },
              { id: 'b', prompt: 'If the teacher became a pronoun, the legal form is…',
                answer: 'ran into her — inseparables never split, even for pronouns',
                options: ['ran into her — inseparables never split, even for pronouns', 'ran her into', 'into her ran'],
                hint: '"run into" is glued — unlike "turn it down".',
                misconception: 'splitting rule misapplied to inseparables' },
          ] },
    ],

    reflect: { prompts: ['Which collocation do you get wrong by instinct — different-than or married-with?', 'When MUST a pronoun split a phrasal verb?'] },
    successLine: 'Fused units read whole, pronouns split right, married prepositions all paired.',
    tryAgainLine: 'Learn them as units — parts do not sum, and partners do not swap.',
};
