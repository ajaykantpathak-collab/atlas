import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c11_gram_ch82+83 The Reality Ladder & The Harmony Rule.
 * Nodes: c11_gram_cbse_82_001, 82_002, 83_001. */
export const c11_gram_ch8283: SimDef = {
    id: 'v3w_c11_gram_ch8283',
    title: 'The Reality Ladder & The Harmony Rule',
    subtitle: 'Three conditionals measure distance from reality — and every subordinate clause must harmonize with its main clause\'s tense-zone',
    classLevel: 11, subject: 'english-grammar', topic: 'Conditionals, advanced non-finites, sequence of tenses',
    chapters: ['c11_gram_ch82', 'c11_gram_ch83'],
    nodeIds: ['c11_gram_cbse_82_001', 'c11_gram_cbse_82_002', 'c11_gram_cbse_83_001'],
    emoji: '🪜', theme: { bg: 'from-slate-900 to-gold-950', accent: 'blue', scene: 'senior' },

    scenario: {
        role: 'a probability physicist measuring how far each if-sentence stands from reality',
        intro: 'Type 1 could happen. Type 2 is a present that is not. Type 3 is a past that is gone. And once a main clause sets a tense-zone, every subordinate must fall in line.',
        goal: 'Build all three conditionals including inversions, run advanced non-finite forms (perfect/passive infinitive, preposition-gerund), and enforce tense harmony.',
    },
    discovery: {
        question: '"If I ___ the lottery, I would travel." — win, won, or would win?',
        options: [
            'won — unreal present: if + past, would + base',
            'would win — both halves take would',
            'win — lottery is still possible',
            'had won — deepest past',
        ],
        answer: 'won — unreal present: if + past, would + base',
        hook: '"would" inside the if-clause is the classic half-mix — the two halves of a conditional come as a SET.',
    },
    teaching: [
        { title: 'The three rungs', text: 'Type 1: if + present, will. Type 2: if + past, would. Type 3: if + past perfect, would have + V3. Never mix halves across types.', emoji: '🪜', bgColor: 'from-gold-500 to-gold-600' },
        { title: 'The harmony law', text: 'Past main → past-family subordinates: may→might, will→would. Future-in-time-clause stays present: "when I arrive", never "when I will arrive".', emoji: '🎼', bgColor: 'from-gold-500 to-gold-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c11_gram_cbse_82_001', title: 'Reality-status first',
          scaffold: {
            problem: '"If she had studied, she ___ passed."',
            steps: [
                { text: 'Ask reality-status: "had studied" = past that did not happen → Type 3.' },
                { text: 'Type 3 halves go together: had + V3 → would have + V3.' },
                { text: '"would have passed" — never mix a Type-1 result into a Type-3 frame.', faded: true },
                { text: 'You: "If I were you, I ___ apologize." → ', blankAnswer: 'would' },
            ],
          } },
        { type: 'dissect', nodeId: 'c11_gram_cbse_82_002', title: 'The non-finite traps',
          dissect: { specimen: 'four senior errors',
          spots: [
            { id: 's1', label: 'prep-gerund', prompt: '"He apologised for to be late." — the fault?', answer: '"for to be" → "for being" — after ANY preposition, verbs go gerund', options: ['"for to be" → "for being" — after ANY preposition, verbs go gerund', 'apologised → apologized', 'late → lately', 'no error'] },
            { id: 's2', label: 'perfect-inf', prompt: '"She is believed to live abroad since 2010." — the fault?', answer: '"to live" → "to have been living" — the living precedes the believing', options: ['"to live" → "to have been living" — the living precedes the believing', 'believed → believing', 'since → for', 'no error'] },
            { id: 's3', label: 'causative', prompt: '"The teacher made us to rewrite the essay." — the fault?', answer: '"to rewrite" → "rewrite" — make/let + object takes the bare infinitive', options: ['"to rewrite" → "rewrite" — make/let + object takes the bare infinitive', 'made → make', 'us → we', 'essay needs the'] },
          ] } },
        { type: 'case', nodeId: 'c11_gram_cbse_83_001', title: 'Zone-enforcer',
          caseStudy: {
            intro: 'A past main clause drags subordinate verbs back — and future time-clauses refuse "will".',
            decisions: [
              { prompt: '"He worked day and night so that he ___ support his family." may or might?', options: [
                  { text: 'might — the past main clause pulls the purpose modal back', outcome: 'Correct — may→might is zone-harmony.' },
                  { text: 'may — purpose always takes may', outcome: 'In a PRESENT zone, yes — but "worked" sets a past zone and drags it.', reveals: 'zone-blind' },
                ] },
              { prompt: '"I will phone you as soon as I ___ home." reach or will reach?', options: [
                  { text: 'reach — future time-clauses take present form', outcome: 'Correct — "when I will arrive" is the classic Hindi-transfer error.' },
                  { text: 'will reach — the arrival is future', outcome: 'The future meaning is real, but after when/as soon as it wears present form — "will" is banned.', reveals: 'hindi-transfer' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c11_gram_cbse_82_001', title: 'Conditional speed round', drill: { kind: 'fill', count: 4, level: 5 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c11_gram_cbse_82_001', difficulty: 'standard',
          question: '"If she had studied, she ___ passed."',
          options: [
              { text: 'would have passed — Type 3 halves go together: had+V3, would have+V3' },
              { text: 'will have passed', reveals: 'half-mix' },
              { text: 'would pass', reveals: 'half-mix' },
          ],
          answer: 'would have passed — Type 3 halves go together: had+V3, would have+V3',
          remediations: {
              'half-mix': { steps: ['Conditional halves are a SET — mixing across types is the signature error.', 'Type 3 = if + past perfect + would have + V3. Both halves, always.'] },
          },
          hint: 'Read the if-half first — it names the type.',
          misconception: 'students mix conditional halves — a Type-1 result inside a Type-3 frame' },
        { type: 'mcq', nodeId: 'c11_gram_cbse_82_001', difficulty: 'advanced',
          question: 'Rewrite without "if": "If I had known, I would have helped."',
          options: [
              { text: 'Had I known, I would have helped.' },
              { text: 'If had I known, I would have helped.', reveals: 'if-kept' },
              { text: 'I had known, I would have helped.', reveals: 'inversion-drop' },
          ],
          answer: 'Had I known, I would have helped.',
          remediations: {
              'if-kept': { steps: ['Inversion REPLACES "if" — you cannot keep both.', 'Drop "if" + front the auxiliary: Had I known / Were I you / Should he come.'] },
              'inversion-drop': { steps: ['The auxiliary must front — "I had known" reads as a plain clause, losing the conditional force.'] },
          },
          hint: 'Drop "if", front the auxiliary.',
          misconception: 'formal inversion misunderstood — either "if" is kept or the auxiliary never fronts' },
        { type: 'mcq', nodeId: 'c11_gram_cbse_82_002', difficulty: 'advanced',
          question: '"He apologised for ___ late." being / to be / be?',
          options: [
              { text: 'being — after ANY preposition, verbs go gerund' },
              { text: 'to be — infinitives follow verbs', reveals: 'prep-gerund' },
              { text: 'be — the base form is neutral', reveals: 'prep-gerund' },
          ],
          answer: 'being — after ANY preposition, verbs go gerund',
          remediations: {
              'prep-gerund': { steps: ['The preposition-gerund rule is absolute: for/at/on/after/about + V-ing.', '"for to be" is never legal English.'] },
          },
          hint: '"for" is a preposition — what must follow it?',
          misconception: '"to + V" used after prepositions — the prep-gerund absolute rule unknown' },
        { type: 'sort', nodeId: 'c11_gram_cbse_83_001', difficulty: 'standard',
          question: 'Sort: which modal fits the past reporting zone?',
          sortItems: [
              { id: 'a', label: 'will → would', emoji: '🔄', correctBin: 'shift' },
              { id: 'b', label: 'may → might', emoji: '🔄', correctBin: 'shift' },
              { id: 'c', label: 'can → could', emoji: '🔄', correctBin: 'shift' },
              { id: 'd', label: 'must → must/had to', emoji: '⚠️', correctBin: 'special' },
              { id: 'e', label: 'am → is', emoji: '❌', correctBin: 'wrong' },
          ],
          bins: [
              { id: 'shift', label: 'STANDARD BACKSHIFT', color: '#22c55e' },
              { id: 'special', label: 'SPECIAL (must → had to)', color: '#f59e0b' },
              { id: 'wrong', label: 'WRONG DIRECTION', color: '#ef4444' },
          ],
          hint: 'Most modals step back one; "must" has a special partner; never shift forwards.',
          misconception: 'students shift modals inconsistently — "must" especially resists naive backshift' },
        { type: 'subpart', nodeId: 'c11_gram_cbse_82_002', difficulty: 'advanced',
          question: '"She is believed ___ (live) abroad since 2010." — the perfect-infinitive call.',
          hint: 'Which happened first — the living or the believing?',
          misconception: 'plain infinitive loses the time-order between the two events',
          parts: [
              { id: 'a', prompt: 'Which event is earlier?',
                answer: 'the living — it precedes the believing',
                options: ['the living — it precedes the believing', 'the believing', 'simultaneous'],
                hint: 'She lived there before people believed it.',
                misconception: 'time-order unread' },
              { id: 'b', prompt: 'So the blank takes…',
                answer: 'to have been living / to have lived — perfect infinitive',
                options: ['to have been living / to have lived — perfect infinitive', 'to live', 'living'],
                hint: 'Earlier non-finite event → to have + V3.',
                misconception: 'perfect infinitive unknown' },
          ] },
    ],

    reflect: { prompts: ['Which conditional type trips you — and why does the if-half name it?', 'Why is "when I will arrive" wrong when the meaning is future?'] },
    successLine: 'Reality-status measured, halves matched, zones harmonized — the ladder is climbed.',
    tryAgainLine: 'Read the if-half to name the type; read the main clause to set the zone.',
};
