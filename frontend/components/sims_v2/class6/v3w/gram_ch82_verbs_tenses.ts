import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c6_gram_ch82 The Time Gears (verbs + simple/continuous).
 * Nodes: c6_gram_cbse_82_001, 82_002, 82_003. */
export const c6_gram_ch82: SimDef = {
    id: 'v3_c6_gram_ch82',
    title: 'The Time Gears',
    subtitle: 'Every sentence has an engine word — and it changes shape for yesterday, today, and tomorrow',
    classLevel: 6, subject: 'english-grammar', topic: 'Verbs and simple tenses',
    chapters: ['c6_gram_ch82'],
    nodeIds: ['c6_gram_cbse_82_001', 'c6_gram_cbse_82_002', 'c6_gram_cbse_82_003'],
    emoji: '⚙️', theme: { bg: 'from-slate-900 to-amber-950', accent: 'amber', scene: 'junior' },

    scenario: {
        role: 'a time mechanic who sets every verb to the right gear',
        intro: 'The same action wears three gears — walk, walked, will walk. Your job: spot the engine word and set its gear to match the sentence\'s time.',
        goal: 'Find verbs reliably (including tricky -ing subjects), choose simple vs continuous, and run the interrupted-action pattern.',
    },
    discovery: {
        question: '"Swimming in the morning keeps me healthy." — which word is the verb?',
        options: [
            'keeps — "swimming" is the subject here, the activity as a thing',
            'swimming — it is the action word',
            'morning — it tells the time',
            'healthy — it describes the result',
        ],
        answer: 'keeps — "swimming" is the subject here, the activity as a thing',
        hook: 'An -ing word can be the NAME of an activity — the real verb is the word that drives the sentence.',
    },
    teaching: [
        { title: 'The engine word', text: 'Verbs name actions (run, eat) or states (is, seem). Helpers like is/was/will ride along and carry the time.', emoji: '🔧', bgColor: 'from-amber-500 to-orange-600' },
        { title: 'Habit or happening-now?', text: 'Simple present = habits and facts (daily, always). Continuous = the film rolling NOW (is/am/are + V-ing).', emoji: '🎬', bgColor: 'from-orange-500 to-rose-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c6_gram_cbse_82_002', title: 'Habit or now?',
          scaffold: {
            problem: '"Look! The baby ___ (cry)." vs "The baby ___ (cry) every night."',
            steps: [
                { text: 'Signal words decide: look!/now → film playing → continuous.' },
                { text: 'every night → habit → simple present.' },
                { text: 'So: "is crying" and "cries".', faded: true },
                { text: 'You: "She ___ (read) at this moment." → ', blankAnswer: 'is reading' },
            ],
          } },
        { type: 'dissect', nodeId: 'c6_gram_cbse_82_003', title: 'The interrupted action',
          dissect: { specimen: 'was/were + V-ing cut by a sudden event',
          spots: [
            { id: 's1', label: 'background', prompt: '"While she ___ (cook), the phone rang." Which form?', answer: 'was cooking — the film running in the background', options: ['was cooking — the film running in the background', 'cooked — both are past', 'had cooked — she finished first', 'is cooking — it is continuous'] },
            { id: 's2', label: 'interrupter', prompt: 'And "the phone rang" — why simple past?', answer: 'the ring is the snapshot event that cuts the film', options: ['the ring is the snapshot event that cuts the film', 'it should be was ringing', 'rang is a mistake', 'both should be continuous'] },
            { id: 's3', label: 'did-rule', prompt: '"He didn\'t went to school." — the fix?', answer: 'didn\'t go — after "did" the verb returns to base form', options: ['didn\'t go — after "did" the verb returns to base form', 'didn\'t went is correct', 'didn\'t goed', 'not went'] },
          ] } },
        { type: 'case', nodeId: 'c6_gram_cbse_82_003', title: 'Will or going to?',
          caseStudy: {
            intro: 'Both talk about the future — but one is a fresh decision and one is a plan already made.',
            decisions: [
              { prompt: '"I have decided — I ___ visit Agra this summer."', options: [
                  { text: 'am going to — the plan already exists', outcome: 'Correct — "going to" carries decided plans.' },
                  { text: 'will — future is future', outcome: 'Not quite — "I have decided" signals an existing plan, and going-to is its carrier.', reveals: 'will-default' },
                ] },
              { prompt: '"The sky is dark — it ___ rain."', options: [
                  { text: 'is going to — evidence-based prediction', outcome: 'Correct — visible signs point to going-to.' },
                  { text: 'will — predictions always take will', outcome: 'Often true, but visible evidence prefers going-to — both accepted, going-to is sharper here.', reveals: 'will-default' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c6_gram_cbse_82_001', title: 'Find-the-verb speed round', drill: { kind: 'fill', count: 4, level: 2 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c6_gram_cbse_82_001', difficulty: 'foundation',
          question: '"The tired boy slept soundly." — is "tired" a verb here?',
          options: [
              { text: 'No — "tired" describes the boy; "slept" is the verb' },
              { text: 'Yes — it is a past-form word', reveals: 'shape-test' },
              { text: 'Yes — there are two verbs', reveals: 'shape-test' },
          ],
          answer: 'No — "tired" describes the boy; "slept" is the verb',
          remediations: {
              'shape-test': { steps: ['Past-form words can describe nouns — the verb is the word the sentence cannot lose.', 'Delete "tired" — the sentence survives. Delete "slept" — it collapses. That is the test.'] },
          },
          hint: 'Which word can the sentence not live without?',
          misconception: 'students label any past-form word a verb — job in the sentence decides, not shape' },
        { type: 'mcq', nodeId: 'c6_gram_cbse_82_002', difficulty: 'standard',
          question: 'Fix: "I am going to school every day."',
          options: [
              { text: 'I go to school every day — "every day" is a habit, so simple present' },
              { text: 'I am going to school every day is correct — going is an action', reveals: 'continuous-default' },
              { text: 'I will go to school every day', reveals: 'gear-confusion' },
          ],
          answer: 'I go to school every day — "every day" is a habit, so simple present',
          remediations: {
              'continuous-default': { steps: ['Signal words rule: daily/every day/always/usually → simple present.', 'Continuous is only for actions rolling right now.'] },
              'gear-confusion': { steps: ['"every day" is present-habit, not future — will is for tomorrow, not for routines.'] },
          },
          hint: 'Habit or happening-now?',
          misconception: 'students default to continuous whenever the action feels current' },
        { type: 'mcq', nodeId: 'c6_gram_cbse_82_002', difficulty: 'standard',
          question: 'Spell the -ing forms: swim, dance, sit.',
          options: [
              { text: 'swimming, dancing, sitting' },
              { text: 'swiming, danceing, siting', reveals: 'ing-spelling' },
              { text: 'swimming, danceing, sitting', reveals: 'ing-partial' },
          ],
          answer: 'swimming, dancing, sitting',
          remediations: {
              'ing-spelling': { steps: ['Short vowel + single consonant → double it: swim→swimming, sit→sitting.', 'Silent e → drop it: dance→dancing, write→writing.'] },
              'ing-partial': { steps: ['danceing keeps the silent e — drop it: dancing.'] },
          },
          hint: 'Double the consonant after a short vowel; drop silent e.',
          misconception: 'the two -ing spelling rules are not yet automatic' },
        { type: 'sort', nodeId: 'c6_gram_cbse_82_001', difficulty: 'foundation',
          question: 'Sort each word: verb (engine) or not-a-verb here?',
          sortItems: [
              { id: 'a', label: 'slept (in "the boy slept")', emoji: '😴', correctBin: 'verb' },
              { id: 'b', label: 'swimming (in "swimming is fun")', emoji: '🏊', correctBin: 'notverb' },
              { id: 'c', label: 'is (in "the soup is hot")', emoji: '🍲', correctBin: 'verb' },
              { id: 'd', label: 'tired (in "the tired dog")', emoji: '🐕', correctBin: 'notverb' },
          ],
          bins: [
              { id: 'verb', label: 'VERB', color: '#22c55e' },
              { id: 'notverb', label: 'NOT A VERB HERE', color: '#ef4444' },
          ],
          hint: 'Being-verbs (is/was) are still verbs — and -ing words can be names of activities.',
          misconception: 'students miss being-verbs and mislabel -ing words doing noun-jobs' },
        { type: 'subpart', nodeId: 'c6_gram_cbse_82_003', difficulty: 'standard',
          question: '"While we ___ (play) cricket, it started to rain." — build it step by step.',
          hint: 'One action was a film; the other was a snapshot.',
          misconception: 'flattens both events into one tense — the while-pattern needs two different forms',
          parts: [
              { id: 'a', prompt: 'Which action was in progress — the playing or the raining?',
                answer: 'the playing',
                options: ['the playing', 'the raining', 'both at once'],
                hint: '"While" frames the background film.',
                misconception: 'cannot see the background/interruption structure' },
              { id: 'b', prompt: 'So the blank takes…',
                answer: 'were playing',
                options: ['were playing', 'played', 'had played'],
                hint: 'Background film → past continuous.',
                misconception: 'uses simple past for the background action' },
              { id: 'c', prompt: 'And "it started to rain" stays simple past because…',
                answer: 'it is the interrupting event — the snapshot',
                options: ['it is the interrupting event — the snapshot', 'it is the background', 'both take continuous'],
                hint: 'Short events cut in with simple past.',
                misconception: 'thinks both events share one tense' },
          ] },
    ],

    reflect: { prompts: ['Film or snapshot — which test will you use first?', 'Why does "didn\'t went" hurt the ear?'] },
    successLine: 'Every engine found, every gear set — your verbs run on time.',
    tryAgainLine: 'Find the engine first, then read the signal words before choosing the gear.',
};
