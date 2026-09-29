import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c8_gram_ch80 The Ten Cells (complete tense grid + sequence).
 * Nodes: c8_gram_cbse_80_001, 80_002. */
export const c8_gram_ch80: SimDef = {
    id: 'v3w_c8_gram_ch80',
    title: 'The Ten Cells',
    subtitle: 'Three times, three-plus aspects, and the markers that choose the cell before you touch the verb',
    classLevel: 8, subject: 'english-grammar', topic: 'The complete tense grid and sequence of tenses',
    chapters: ['c8_gram_ch80'],
    nodeIds: ['c8_gram_cbse_80_001', 'c8_gram_cbse_80_002'],
    emoji: '🗂️', theme: { bg: 'from-slate-900 to-gold-950', accent: 'indigo', scene: 'junior' },

    scenario: {
        role: 'a timeline engineer placing every action in its correct cell',
        intro: 'The tense grid is now complete — and the marker words (since, for, by the time, while, already, yet) choose the cell before the verb is even touched.',
        goal: 'Place any verb in the right cell using markers, separate perfect from perfect-continuous, and run sequence-of-tenses harmony.',
    },
    discovery: {
        question: '"I ___ here since 2019." — am, have been, or was?',
        options: [
            'have been — "since" drags the action into now; the perfect family answers it',
            'am — I am still here now',
            'was — 2019 is in the past',
            'had been — it started long ago',
        ],
        answer: 'have been — "since" drags the action into now; the perfect family answers it',
        hook: 'Since + starting point demands the perfect family — the marker decides, the verb obeys.',
    },
    teaching: [
        { title: 'Markers choose the cell', text: 'since/for → perfect family; by the time → past perfect on the earlier event; while → continuous background; already/yet → perfect.', emoji: '🚦', bgColor: 'from-gold-500 to-gold-600' },
        { title: 'The time-zone rule', text: 'A past main clause drags subordinate verbs back — "He said he was tired." Still-true facts may stay present — "the earth IS round."', emoji: '🌐', bgColor: 'from-gold-500 to-purple-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c8_gram_cbse_80_001', title: 'Marker first, verb second',
          scaffold: {
            problem: '"She ___ (wait) for the bus since morning."',
            steps: [
                { text: 'Underline the marker: "since morning".' },
                { text: 'Since + still-going → present perfect continuous.' },
                { text: '"has been waiting" — the since-marker anchored it; "is waiting" ignores the duration.', faded: true },
                { text: 'You: "I ___ (know) him for years." → ', blankAnswer: 'have known' },
            ],
          } },
        { type: 'dissect', nodeId: 'c8_gram_cbse_80_002', title: 'The time-zone rule',
          dissect: { specimen: 'past main clause drags subordinates back',
          spots: [
            { id: 's1', label: 'drag', prompt: '"I did not know that she ___ a doctor." — is or was?', answer: 'was — the past main clause sets a past zone', options: ['was — the past main clause sets a past zone', 'is — she still is one', 'were — plural sounds right', 'had been — deeper past'] },
            { id: 's2', label: 'exempt', prompt: '"The teacher explained that the sun ___ in the east." — rose or rises?', answer: 'rises — universal truths resist backshift', options: ['rises — universal truths resist backshift', 'rose — past zone rules all', 'will rise — prediction', 'has risen — perfect fit'] },
            { id: 's3', label: 'purpose', prompt: '"He worked hard so that he ___ pass." may or might?', answer: 'might — past main drags the purpose modal back', options: ['might — past main drags the purpose modal back', 'may — purpose always takes may', 'can — ability fits', 'will — the result is future'] },
          ] } },
        { type: 'case', nodeId: 'c8_gram_cbse_80_001', title: 'Perfect or perfect-continuous?',
          caseStudy: {
            intro: 'Same family, different feel: "I have waited an hour" (done-ish) vs "I have been waiting an hour" (still waiting).',
            decisions: [
              { prompt: 'The bus still has not come — which emphasizes the ongoing wait?', options: [
                  { text: 'I have been waiting for an hour — duration still running', outcome: 'Correct — continuous marks the action still in progress.' },
                  { text: 'I have waited for an hour — same thing', outcome: 'Close, but simple-perfect reads as completed — the wait is over. Ongoing wait needs the continuous.', reveals: 'perfect-blur' },
                ] },
              { prompt: '"I ___ him for years." (know) — which form?', options: [
                  { text: 'have known — know is stative; the perfect family answers "for"', outcome: 'Correct — statives refuse -ing even inside perfect-continuous territory.' },
                  { text: 'have been knowing — duration emphasized', outcome: 'Statives never take -ing — "for years" wants perfect, but "know" blocks continuous. Have known.', reveals: 'stative-ing' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c8_gram_cbse_80_001', title: 'Marker speed round', drill: { kind: 'fill', count: 4, level: 3 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c8_gram_cbse_80_001', difficulty: 'standard',
          question: '"By the time the guests arrived, we ___ (finish) cooking."',
          options: [
              { text: 'had finished — "by the time" orders two past events; earlier takes past perfect' },
              { text: 'finished — both are past', reveals: 'order-blind' },
              { text: 'have finished — it connects to now', reveals: 'bridge-misapply' },
          ],
          answer: 'had finished — "by the time" orders two past events; earlier takes past perfect',
          remediations: {
              'order-blind': { steps: ['"By the time" explicitly orders — one event finished before the other.', 'Earlier = had + V3; later = simple past.'] },
              'bridge-misapply': { steps: ['Both events are dead-past — no bridge to now exists.', 'Past perfect is the ordering tool, not present perfect.'] },
          },
          hint: 'Which event finished first? Mark it.',
          misconception: 'students flatten two ordered past events into one tense' },
        { type: 'mcq', nodeId: 'c8_gram_cbse_80_002', difficulty: 'standard',
          question: '"When I was young, I believed that stars ___ tiny lamps." are/were?',
          options: [
              { text: 'were — the belief was false, so no truth-exemption applies' },
              { text: 'are — stars still exist', reveals: 'exempt-misapply' },
          ],
          answer: 'were — the belief was false, so no truth-exemption applies',
          remediations: {
              'exempt-misapply': { steps: ['The exemption covers facts that ARE true — stars being tiny lamps was never true.', 'False beliefs take the past zone like everything else.'] },
          },
          hint: 'Is the believed thing actually true?',
          misconception: 'students apply the truth-exemption to things merely believed, not true' },
        { type: 'mcq', nodeId: 'c8_gram_cbse_80_001', difficulty: 'advanced',
          question: 'Which is right: "I am knowing him for years" or "I have known him for years"?',
          options: [
              { text: 'have known — stative + for-marker; perfect family, no -ing' },
              { text: 'am knowing — the knowing is ongoing', reveals: 'stative-ing' },
          ],
          answer: 'have known — stative + for-marker; perfect family, no -ing',
          remediations: {
              'stative-ing': { steps: ['"For years" demands perfect family — but "know" is stative and refuses -ing.', 'Resolution: simple perfect — "have known". The two rules meet and both must be satisfied.'] },
          },
          hint: 'Two rules collide: for → perfect family; know → no -ing.',
          misconception: 'stative-ing plus marker-blindness at once — the compound error' },
        { type: 'sort', nodeId: 'c8_gram_cbse_80_001', difficulty: 'standard',
          question: 'Sort the markers by the cell they choose:',
          sortItems: [
              { id: 'a', label: 'since morning', emoji: '🌅', correctBin: 'perf' },
              { id: 'b', label: 'by the time', emoji: '⏮️', correctBin: 'pp' },
              { id: 'c', label: 'while', emoji: '🎬', correctBin: 'cont' },
              { id: 'd', label: 'for two years', emoji: '📆', correctBin: 'perf' },
              { id: 'e', label: 'already', emoji: '✅', correctBin: 'perf' },
              { id: 'f', label: 'at 8 pm yesterday', emoji: '🕗', correctBin: 'cont' },
          ],
          bins: [
              { id: 'perf', label: 'PERFECT FAMILY', color: '#22c55e' },
              { id: 'cont', label: 'CONTINUOUS', color: '#0ea5e9' },
              { id: 'pp', label: 'PAST PERFECT', color: '#8b5cf6' },
          ],
          hint: 'since/for/already → perfect. while/at-a-moment → continuous. by-the-time → past perfect.',
          misconception: 'students choose tense by feel instead of reading the marker' },
        { type: 'subpart', nodeId: 'c8_gram_cbse_80_002', difficulty: 'advanced',
          question: '"He said that he ___ finish the work the next day." — run the zone rule.',
          hint: 'Past reporting zone pulls everything back one step.',
          misconception: 'keeps the speaker\'s modal (will) inside a past zone',
          parts: [
              { id: 'a', prompt: 'The main clause "He said" sets which zone?',
                answer: 'past — everything subordinate steps back',
                options: ['past — everything subordinate steps back', 'present — said is reporting now', 'future — the work is future'],
                hint: 'The reporting verb is past.',
                misconception: 'does not see main clause as zone-setter' },
              { id: 'b', prompt: 'So "will" becomes…',
                answer: 'would',
                options: ['would', 'will', 'shall'],
                hint: 'will→would is the backshift.',
                misconception: 'keeps will inside past zone' },
              { id: 'c', prompt: 'And "tomorrow" (if it had appeared) becomes…',
                answer: 'the next day',
                options: ['the next day', 'tomorrow', 'yesterday'],
                hint: 'Deictics re-anchor to the reporter\'s now.',
                misconception: 'deictics left unshifted' },
          ] },
    ],

    reflect: { prompts: ['Which marker fools you most — since or by-the-time?', 'When can a past-zone sentence legally keep present tense?'] },
    successLine: 'The grid is yours — markers read, zones obeyed, exemptions applied.',
    tryAgainLine: 'Marker first, zone second, verb last — in that order.',
};
