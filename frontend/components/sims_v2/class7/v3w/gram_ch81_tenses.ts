import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c7_gram_ch81 Film vs Snapshot (continuous + perfect tenses).
 * Nodes: c7_gram_cbse_81_001, 81_002, 81_003. */
export const c7_gram_ch81: SimDef = {
    id: 'v3w_c7_gram_ch81',
    title: 'Film vs Snapshot',
    subtitle: 'Continuous is the movie playing, perfect is the bridge to now, and "had" is the flashback',
    classLevel: 7, subject: 'english-grammar', topic: 'Continuous and perfect tenses',
    chapters: ['c7_gram_ch81'],
    nodeIds: ['c7_gram_cbse_81_001', 'c7_gram_cbse_81_002', 'c7_gram_cbse_81_003'],
    emoji: '🎬', theme: { bg: 'from-slate-900 to-rose-950', accent: 'rose', scene: 'junior' },

    scenario: {
        role: 'a film editor deciding which actions are still rolling and which are done',
        intro: 'Some actions are films in progress, some are finished snapshots, and some are finished-but-still-matter. Each gets its own verb costume.',
        goal: 'Run the film/snapshot test, use the bridge-to-now rule for present perfect, and order two past events with "had".',
    },
    discovery: {
        question: '"I have lost my keys" vs "I lost my keys yesterday" — what is the real difference?',
        options: [
            'The first still matters now (still lost); the second is a closed, dated story',
            'No difference — both are past',
            'The first is more formal',
            'The second is wrong grammar',
        ],
        answer: 'The first still matters now (still lost); the second is a closed, dated story',
        hook: 'Present perfect builds a bridge to now; simple past locks the event in a box.',
    },
    teaching: [
        { title: 'Film or snapshot?', text: 'be + V-ing = action in progress (the film). Simple = completed or habit (the snapshot).', emoji: '🎥', bgColor: 'from-rose-500 to-pink-600' },
        { title: 'The bridge and the flashback', text: 'have/has + V3 = past action connected to now (bridge). had + V3 = the earlier of two past events (flashback).', emoji: '🌉', bgColor: 'from-pink-500 to-fuchsia-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c7_gram_cbse_81_001', title: 'The film test',
          scaffold: {
            problem: '"At 8 pm yesterday, I ___ (do) my homework."',
            steps: [
                { text: 'Ask: film or snapshot? A specific moment caught mid-action → film.' },
                { text: 'Film needs be + V-ing; past time → was.' },
                { text: '"was doing" — the homework was in progress at 8.', faded: true },
                { text: 'You: "Right now, she ___ (paint) a picture." → ', blankAnswer: 'is painting' },
            ],
          } },
        { type: 'dissect', nodeId: 'c7_gram_cbse_81_002', title: 'The dated-perfect trap',
          dissect: { specimen: 'present perfect vs simple past',
          spots: [
            { id: 's1', label: 'bridge', prompt: '"I have finished my homework just now." — why is this legal?', answer: '"just now" bridges to now — the finishing matters in the present', options: ['"just now" bridges to now — the finishing matters in the present', 'it is actually wrong', 'just is a past word', 'homework is uncountable'] },
            { id: 's2', label: 'box', prompt: '"She has visited Agra last year." — what breaks?', answer: '"last year" is a dead time-stamp — perfect cannot carry finished time; use "visited"', options: ['"last year" is a dead time-stamp — perfect cannot carry finished time; use "visited"', 'has should be had', 'visited should be visit', 'nothing breaks'] },
            { id: 's3', label: 'V3', prompt: '"I have saw the film." — the error?', answer: '"saw" is simple past; perfect needs the participle "seen" — have + V3', options: ['"saw" is simple past; perfect needs the participle "seen" — have + V3', 'have should be has', 'the film needs the', 'saw is fine after have'] },
          ] } },
        { type: 'case', nodeId: 'c7_gram_cbse_81_003', title: 'Order the flashback',
          caseStudy: {
            intro: 'Two past events, one earlier — "had" is the timestamp marking which came first.',
            decisions: [
              { prompt: '"When we arrived, the film ___ (start)."', options: [
                  { text: 'had started — the starting precedes the arriving', outcome: 'Correct — earlier event takes past perfect.' },
                  { text: 'started — both events are past', outcome: 'That makes them simultaneous — but "when we arrived" demands ordering.', reveals: 'event-flatten' },
                ] },
              { prompt: 'Is "I had gone to the market and bought vegetables" right?', options: [
                  { text: 'No — no flashback needed; plain sequence "went and bought"', outcome: 'Correct — "had" with no earlier-vs-later contrast is an error.' },
                  { text: 'Yes — had makes it formal', outcome: 'Past perfect is not a formal style — it is an ordering tool. No second event, no "had".', reveals: 'had-style' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c7_gram_cbse_81_002', title: 'Signal-word speed round', drill: { kind: 'fill', count: 4, level: 3 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c7_gram_cbse_81_001', difficulty: 'standard',
          question: '"While we ___ (play) cricket, it started to rain."',
          options: [
              { text: 'were playing — the film running when the rain interrupted' },
              { text: 'played — both events are past', reveals: 'film-flatten' },
              { text: 'had played — we finished first', reveals: 'had-misplace' },
          ],
          answer: 'were playing — the film running when the rain interrupted',
          remediations: {
              'film-flatten': { steps: ['"While" sets a background film — it needs was/were + V-ing.', 'The interrupting event (started) stays simple past — two different tenses for two different roles.'] },
              'had-misplace': { steps: ['Past perfect marks the EARLIER of two past events — but the playing was still running, not finished before the rain.'] },
          },
          hint: 'Which action was a film and which was a snapshot?',
          misconception: 'students flatten the while-pattern into one tense' },
        { type: 'mcq', nodeId: 'c7_gram_cbse_81_002', difficulty: 'standard',
          question: '"She has visited Agra last year." — edit it.',
          options: [
              { text: 'She visited Agra last year — dead time-stamps force simple past' },
              { text: 'She had visited Agra last year', reveals: 'had-misplace' },
              { text: 'It is already correct', reveals: 'dated-perfect' },
          ],
          answer: 'She visited Agra last year — dead time-stamps force simple past',
          remediations: {
              'dated-perfect': { steps: ['Present perfect CANNOT carry yesterday/ago/last-week words.', 'Those words lock the event in a closed box — simple past only.'] },
              'had-misplace': { steps: ['No earlier-vs-later ordering exists here — "had" has no job.', 'Dated past = simple past. Save "had" for two-event ordering.'] },
          },
          hint: 'Is "last year" a bridge or a box?',
          misconception: 'students use present perfect with finished time — the dated-perfect error' },
        { type: 'mcq', nodeId: 'c7_gram_cbse_81_003', difficulty: 'advanced',
          question: '"The show ___ (end) before we got tickets."',
          options: [
              { text: 'had ended — "before" orders the events; earlier takes past perfect' },
              { text: 'ended — before already shows the order', reveals: 'had-misplace' },
              { text: 'has ended — the result matters now', reveals: 'bridge-blind' },
          ],
          answer: 'had ended — "before" orders the events; earlier takes past perfect',
          remediations: {
              'had-misplace': { steps: ['"Before" explicitly orders two past events — grammar must mark the earlier one.', 'Earlier = had + V3; later = simple past.'] },
              'bridge-blind': { steps: ['Both events are dead-past — the bridge-to-now (has) does not apply here.'] },
          },
          hint: 'Which event is earlier? Mark it with "had".',
          misconception: 'students read clauses in order instead of using before/after to order events' },
        { type: 'sort', nodeId: 'c7_gram_cbse_81_002', difficulty: 'standard',
          question: 'Sort the time expressions — bridge (perfect) or box (simple past)?',
          sortItems: [
              { id: 'a', label: 'since 2019', emoji: '🌉', correctBin: 'bridge' },
              { id: 'b', label: 'yesterday', emoji: '📦', correctBin: 'box' },
              { id: 'c', label: 'already', emoji: '✅', correctBin: 'bridge' },
              { id: 'd', label: 'two hours ago', emoji: '⏰', correctBin: 'box' },
              { id: 'e', label: 'never', emoji: '🚫', correctBin: 'bridge' },
              { id: 'f', label: 'in 2015', emoji: '📅', correctBin: 'box' },
          ],
          bins: [
              { id: 'bridge', label: 'BRIDGE → perfect', color: '#22c55e' },
              { id: 'box', label: 'BOX → simple past', color: '#ef4444' },
          ],
          hint: 'Connected-to-now words bridge; dead dated words box.',
          misconception: 'students do not read signal words before choosing the tense' },
        { type: 'subpart', nodeId: 'c7_gram_cbse_81_002', difficulty: 'advanced',
          question: '"I ___ never ___ (see) the Taj Mahal." — build it correctly.',
          hint: '"never" is a life-experience signal.',
          misconception: 'writes "have never saw" — the broken participle error',
          parts: [
              { id: 'a', prompt: 'Which tense does "never" license?',
                answer: 'present perfect — life experience up to now',
                options: ['present perfect — life experience up to now', 'simple past', 'present continuous'],
                hint: 'Never = from birth until now = bridge word.',
                misconception: 'does not read never as a perfect-signal' },
              { id: 'b', prompt: 'Complete the sentence.',
                answer: 'I have never seen the Taj Mahal.',
                options: ['I have never seen the Taj Mahal.', 'I have never saw the Taj Mahal.', 'I never seen the Taj Mahal.'],
                hint: 'have + never + V3 (seen).',
                misconception: 'uses past form instead of past participle after have' },
          ] },
    ],

    reflect: { prompts: ['Which signal words are bridges and which are boxes — can you list three each?', 'When is "had" an error even though it is grammatical?'] },
    successLine: 'Films, snapshots, bridges, flashbacks — you read time like an editor.',
    tryAgainLine: 'Markers first, then the test: film, box, or bridge?',
};
