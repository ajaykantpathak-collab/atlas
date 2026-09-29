import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c9_gram_ch80 The Marker Game (board-tested tenses + editing).
 * Nodes: c9_gram_cbse_80_001, 80_002. */
export const c9_gram_ch80: SimDef = {
    id: 'v3w_c9_gram_ch80',
    title: 'The Marker Game',
    subtitle: 'Boards never ask "what is the tense" — they hide markers and watch whether you can read them',
    classLevel: 9, subject: 'english-grammar', topic: 'Tenses through markers and editing',
    chapters: ['c9_gram_ch80'],
    nodeIds: ['c9_gram_cbse_80_001', 'c9_gram_cbse_80_002'],
    emoji: '🎯', theme: { bg: 'from-slate-900 to-gold-950', accent: 'indigo', scene: 'senior' },

    scenario: {
        role: 'an examiner\'s adversary — you find the marker they hid before they find your error',
        intro: 'Every tense item hides a marker — since, for, by the time, while, already, yet, before. The gap-fill is a decoding exercise, not a vocabulary test.',
        goal: 'Read markers before touching verbs, audit verbs in editing format, and stop the four signature tense sins.',
    },
    discovery: {
        question: '"I ___ here since 2019." — am, have been, or was?',
        options: [
            'have been — "since" demands the perfect family; the marker decides before the verb matters',
            'am — I am still here',
            'was — 2019 is past',
            'had been — it started earlier',
        ],
        answer: 'have been — "since" demands the perfect family; the marker decides before the verb matters',
        hook: 'The Hindi version "main 2019 se yahan hoon" feels like present — English says the since-marker overrides that instinct.',
    },
    teaching: [
        { title: 'Markers → cells', text: 'since/for → perfect family; while → continuous background; before/by the time → past perfect on the earlier event.', emoji: '🗺️', bgColor: 'from-gold-500 to-gold-600' },
        { title: 'The four sins', text: 'Wrong form for the marker, double past ("didn\'t went"), missing auxiliary ("she reading"), tense drift mid-sentence.', emoji: '🚨', bgColor: 'from-gold-500 to-purple-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c9_gram_cbse_80_001', title: 'Marker first',
          scaffold: {
            problem: '"She ___ (teach) here for ten years."',
            steps: [
                { text: 'Underline the marker: "for ten years".' },
                { text: '"for" + duration → perfect family.' },
                { text: '"has been teaching" (still teaching) or "has taught" — never "is teaching".', faded: true },
                { text: 'You: "The train ___ before we reached." → ', blankAnswer: 'had left' },
            ],
          } },
        { type: 'dissect', nodeId: 'c9_gram_cbse_80_002', title: 'The editing audit',
          dissect: { specimen: 'the four tense sins in lines',
          spots: [
            { id: 's1', label: 'double-past', prompt: '"He didn\'t went to the doctor." — the error and fix?', answer: '"went" → "go" — after did/didn\'t the verb returns to base', options: ['"went" → "go" — after did/didn\'t the verb returns to base', 'didn\'t → did not', 'doctor needs the', 'no error'] },
            { id: 's2', label: 'drift', prompt: '"She was cooking and eats dinner." — the fault?', answer: 'tense drift — "eats" → "ate"; one zone, one tense family', options: ['tense drift — "eats" → "ate"; one zone, one tense family', 'was cooking → cooked', 'and → but', 'no error'] },
            { id: 's3', label: 'missing-aux', prompt: '"Look! The baby crawl towards the door." — fix?', answer: 'crawl → is crawling — "look!" demands present continuous with its be', options: ['crawl → is crawling — "look!" demands present continuous with its be', 'crawl → crawls', 'look → looking', 'towards → toward'] },
          ] } },
        { type: 'case', nodeId: 'c9_gram_cbse_80_001', title: 'Stative check',
          caseStudy: {
            intro: 'Markers cannot force -ing onto verbs that refuse it — statives stay simple.',
            decisions: [
              { prompt: '"I ___ (not understand) this chapter — please explain again."', options: [
                  { text: 'do not understand — stative verb, no continuous', outcome: 'Correct — states are already ongoing; -ing double-marks.' },
                  { text: 'am not understanding — it is happening now', outcome: 'The now-ness is real but the verb is stative — understand, know, believe refuse -ing.', reveals: 'stative-ing' },
                ] },
              { prompt: '"She is tasting the soup" vs "The soup is tasting good" — which is legal?', options: [
                  { text: 'The first — tasting = the action of sampling; the second needs "tastes good"', outcome: 'Correct — the same verb flips stative/dynamic by meaning.' },
                  { text: 'Both are legal', outcome: '"The soup is tasting" makes the soup perform the action — meaning decides the category.', reveals: 'stative-ing' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c9_gram_cbse_80_001', title: 'Marker speed round', drill: { kind: 'fill', count: 4, level: 4 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c9_gram_cbse_80_001', difficulty: 'standard',
          question: '"She ___ (teach) here for ten years."',
          options: [
              { text: 'has been teaching / has taught — "for" demands the perfect family' },
              { text: 'is teaching — she still teaches', reveals: 'marker-blind' },
              { text: 'taught — ten years ago', reveals: 'marker-blind' },
          ],
          answer: 'has been teaching / has taught — "for" demands the perfect family',
          remediations: {
              'marker-blind': { steps: ['Underline the time expression BEFORE touching the verb.', 'for + duration → perfect family. since + start-point → perfect family.', 'Hindi instinct says "is teaching" — the English marker says otherwise.'] },
          },
          hint: 'Underline "for ten years" first.',
          misconception: 'students choose tense by translating from Hindi, ignoring the marker' },
        { type: 'mcq', nodeId: 'c9_gram_cbse_80_002', difficulty: 'standard',
          question: 'Edit: "He didn\'t went to school yesterday."',
          options: [
              { text: 'went → go — "did" already carries the past; main verb returns to base' },
              { text: 'went → gone', reveals: 'double-past' },
              { text: 'didn\'t → hadn\'t', reveals: 'had-misplace' },
          ],
          answer: 'went → go — "did" already carries the past; main verb returns to base',
          remediations: {
              'double-past': { steps: ['did/didn\'t + BASE form — the past lives in "did" alone.', 'didn\'t went and didn\'t goed are both double-marking.'] },
              'had-misplace': { steps: ['No earlier-vs-later ordering exists — "had" has no job here.', 'Simple negation: didn\'t + base.'] },
          },
          hint: 'Where does the past already live in this sentence?',
          misconception: 'double-past marking — the past carried twice' },
        { type: 'mcq', nodeId: 'c9_gram_cbse_80_002', difficulty: 'standard',
          question: 'Edit: "Look! The baby crawl towards the door."',
          options: [
              { text: 'crawl → is crawling — "Look!" demands present continuous including its be' },
              { text: 'crawl → crawls', reveals: 'signal-blind' },
              { text: 'correct as written', reveals: 'missing-aux' },
          ],
          answer: 'crawl → is crawling — "Look!" demands present continuous including its be',
          remediations: {
              'signal-blind': { steps: ['"Look!" and "Listen!" are continuous-signals — the action rolls NOW.', 'Present continuous = is/am/are + V-ing — the be is half the tense.'] },
              'missing-aux': { steps: ['"baby crawl" lacks agreement AND the continuous marker demands more.', 'Two faults: marker-reading and the missing auxiliary.'] },
          },
          hint: 'What does "Look!" signal about the action?',
          misconception: 'students read for spelling in editing tasks and miss tense errors entirely' },
        { type: 'sort', nodeId: 'c9_gram_cbse_80_001', difficulty: 'foundation',
          question: 'Sort the markers — perfect family or continuous?',
          sortItems: [
              { id: 'a', label: 'since 2019', emoji: '📆', correctBin: 'perf' },
              { id: 'b', label: 'while', emoji: '🎬', correctBin: 'cont' },
              { id: 'c', label: 'for ten years', emoji: '⏳', correctBin: 'perf' },
              { id: 'd', label: 'at this moment', emoji: '⚡', correctBin: 'cont' },
              { id: 'e', label: 'already', emoji: '✅', correctBin: 'perf' },
              { id: 'f', label: 'look! / now', emoji: '👀', correctBin: 'cont' },
          ],
          bins: [
              { id: 'perf', label: 'PERFECT FAMILY', color: '#22c55e' },
              { id: 'cont', label: 'CONTINUOUS', color: '#0ea5e9' },
          ],
          hint: 'Duration markers → perfect. In-progress markers → continuous.',
          misconception: 'students don\'t sort markers before choosing' },
        { type: 'subpart', nodeId: 'c9_gram_cbse_80_001', difficulty: 'advanced',
          question: '"The train ___ (leave) before we reached." — work the ordering.',
          hint: '"before" orders the events — earlier gets the had.',
          misconception: 'reads clauses in order rather than using "before" to order them',
          parts: [
              { id: 'a', prompt: 'Which event is earlier — leaving or reaching?',
                answer: 'the leaving',
                options: ['the leaving', 'the reaching', 'simultaneous'],
                hint: '"before we reached" — the leaving precedes.',
                misconception: 'clause-order reading instead of logic-order' },
              { id: 'b', prompt: 'So the blank takes…',
                answer: 'had left — past perfect on the earlier event',
                options: ['had left — past perfect on the earlier event', 'left — simple past', 'has left — present perfect'],
                hint: 'Earlier of two past events → had + V3.',
                misconception: 'simple past used for the earlier event' },
          ] },
    ],

    reflect: { prompts: ['Which of the four sins is your habit?', 'How does "since" beat the Hindi instinct?'] },
    successLine: 'You read markers before verbs — the examiner\'s hiding spots are all mapped.',
    tryAgainLine: 'Underline the time-word first. Every time.',
};
