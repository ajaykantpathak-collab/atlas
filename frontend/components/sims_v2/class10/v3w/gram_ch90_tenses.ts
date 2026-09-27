import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c10_gram_ch90 The Twelve Rooms (tense system).
 * Nodes: c10_gram_cbse_90_001 (grid), 90_002 (statives), 90_003 (markers). */
export const c10_gram_ch90: SimDef = {
    id: 'v3w_c10_gram_ch90',
    title: 'The Twelve Rooms',
    subtitle: 'One action, twelve grammatical outfits — learn to move a verb through time and aspect',
    classLevel: 10, subject: 'english-grammar', topic: 'Tenses — the 12-form grid',
    chapters: ['c10_gram_ch90'],
    nodeIds: ['c10_gram_cbse_90_001', 'c10_gram_cbse_90_002', 'c10_gram_cbse_90_003'],
    emoji: '⏳', theme: { bg: 'from-slate-900 to-indigo-950', accent: 'indigo', scene: 'senior' },

    scenario: {
        role: 'a translator rebuilding a timeline after the verbs were scrambled',
        intro: 'Every English sentence lives in exactly one of twelve rooms — three times crossed with four aspects. Boards never ask "what is the past tense?" — they ask "which room does this sentence live in?"',
        goal: 'Navigate the 3×4 tense grid on demand: place any verb phrase in its cell, then move it to another cell without losing the meaning.',
    },
    discovery: {
        question: '"She has finished" and "She had finished" — which one is about the past?',
        options: [
            'Only "had finished" — "has finished" is anchored to now',
            'Both are past — "finished" is a past word',
            'Neither — both are present forms',
            '"has finished" is the older past',
        ],
        answer: 'Only "had finished" — "has finished" is anchored to now',
        hook: 'The tense lives in the HELPER, not the main verb — "has" is present, "had" is past, "finished" just sits there.',
    },
    teaching: [
        { title: 'The Grid', text: 'Rows = time (present/past/future). Columns = aspect — how the action is viewed: simple, continuous, perfect, perfect-continuous.', emoji: '🗂️', bgColor: 'from-indigo-500 to-violet-600' },
        { title: 'Aspect is not time', text: 'Perfect means "completed but connected to a reference point" — has finished connects to NOW, had finished to a PAST point.', emoji: '🔗', bgColor: 'from-violet-500 to-purple-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c10_gram_cbse_90_001', title: 'Move one idea across the grid',
          scaffold: {
            problem: 'Take "Riya writes a letter" and produce the same fact in past-perfect and future-continuous.',
            steps: [
                { text: 'Fix the fact: Riya + write + letter. Only the verb phrase may change.' },
                { text: 'Past row + perfect column → "had written": Riya had written a letter (before something else happened).' },
                { text: 'Future row + continuous column → "will be writing": Riya will be writing a letter (at some future moment).', faded: true },
                { text: 'Now you: same fact, present-perfect-continuous → Riya ___', blankAnswer: 'has been writing a letter' },
            ],
          } },
        { type: 'dissect', nodeId: 'c10_gram_cbse_90_002', title: 'The stative trap',
          dissect: { specimen: 'verbs that refuse -ing',
          spots: [
            { id: 's1', label: 'know', prompt: '"I am knowing the answer." Why is this broken?', answer: 'know is stative — a state is already continuous, so -ing double-marks it', options: ['know is stative — a state is already continuous, so -ing double-marks it', 'know is irregular', 'the sentence needs a time marker', 'knowing is the wrong participle'] },
            { id: 's2', label: 'have', prompt: '"I am having lunch" — legal. Why does have get a pass?', answer: 'here have = eat (an action), not possess — the same verb flips category with meaning', options: ['here have = eat (an action), not possess — the same verb flips category with meaning', 'have is never stative', 'lunch makes it continuous', 'present continuous is always allowed'] },
            { id: 's3', label: 'understand', prompt: '"I am not understanding this chapter" — board-correct version?', answer: 'I do not understand this chapter — understand is stative', options: ['I do not understand this chapter — understand is stative', 'I am not understanding this chapter is fine', 'I did not understand this chapter', 'I will not understand this chapter'] },
          ] } },
        { type: 'case', nodeId: 'c10_gram_cbse_90_003', title: 'Read the marker, not the verb',
          caseStudy: {
            intro: 'Examiners plant time-markers that dictate the tense before you even look at the verb. Read the marker first.',
            decisions: [
              { prompt: '"She ___ (live) in Pune since 2018." Which form?', options: [
                  { text: 'has been living — since + point of time licenses perfect-continuous', outcome: 'Correct — "since" drags the action into the present. The marker decides, not the verb.' },
                  { text: 'is living — it is happening now', outcome: 'Not quite — "since 2018" spans past-to-now; plain present continuous ignores the duration.', reveals: 'marker-blind' },
                  { text: 'lived — 2018 is in the past', outcome: 'Not quite — "since" means she STILL lives there; simple past would end it.', reveals: 'marker-blind' },
                ] },
              { prompt: '"While she ___ (cook), the phone rang." Which form?', options: [
                  { text: 'was cooking — while frames the background film, the ring is the snapshot', outcome: 'Correct — the ongoing action takes continuous; the interrupting event takes simple past.' },
                  { text: 'cooked — both events are past', outcome: 'Not quite — then the phone rings after dinner, not during it. While needs the continuous background.', reveals: 'while-inversion' },
                  { text: 'had cooked — she finished before the call', outcome: 'Not quite — "while" means the ring interrupted her mid-cooking, not after.', reveals: 'while-inversion' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c10_gram_cbse_90_001', title: 'Assemble the perfect-continuous',
          build: {
            prompt: 'Order the blocks into present-perfect-continuous: "they / for two hours / have been / rehearsing"',
            blocks: ['they', 'for two hours', 'have been', 'rehearsing'],
            answer: 'they have been rehearsing for two hours',
          } },
        { type: 'drill', nodeId: 'c10_gram_cbse_90_003', title: 'Marker-speed round', drill: { kind: 'fill', count: 4, level: 4 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c10_gram_cbse_90_001', difficulty: 'standard',
          question: '"At this moment, the baby ___ (cry)." — which form and why?',
          options: [
              { text: 'is crying — "at this moment" marks ongoing action in present time' },
              { text: 'cries — habitual actions use simple present', reveals: 'marker-blind' },
              { text: 'is cried — passive fits because the baby is acted upon', reveals: 'voice-confusion' },
              { text: 'has cried — the crying just completed', reveals: 'aspect-blind' },
          ],
          answer: 'is crying — "at this moment" marks ongoing action in present time',
          remediations: {
              'marker-blind': { steps: ['Underline the time expression FIRST — it decides before the verb does.', '"At this moment/now/right now" licenses present continuous.', 'Rebuild: subject + is/are + V-ing.'] },
              'voice-confusion': { steps: ['Passive = be + V3 (is cried). Crying is something the baby DOES, not receives.', 'Ask: who performs the action? If the subject performs it, stay active.'] },
              'aspect-blind': { steps: ['"Has cried" = perfect = completed-with-relevance. But "at this moment" says it is still happening.', 'Ongoing right now → continuous column, present row → is crying.'] },
          },
          hint: 'Find the time marker before touching the verb.',
          misconception: 'students pick tense by the verb\'s feel instead of the sentence\'s time-marker' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_90_002', difficulty: 'standard',
          question: '"At the moment I ___ (believe) every word he says."',
          options: [
              { text: 'believe — stative verb; "at the moment" cannot force -ing onto a state' },
              { text: 'am believing — the time-marker demands continuous', reveals: 'stative-ing' },
              { text: 'believed — past tense matches a past moment', reveals: 'marker-blind' },
          ],
          answer: 'believe — stative verb; "at the moment" cannot force -ing onto a state',
          remediations: {
              'stative-ing': { steps: ['The test: can you DO it on purpose for a duration? You cannot "do" believing — it is a state.', 'Statives (know, believe, love, own, seem, understand) take simple forms even with moment-markers.'] },
              'marker-blind': { steps: ['"At the moment" is present-time, not past — rule out past forms first.', 'Then check the verb type before adding -ing.'] },
          },
          hint: 'Can you do "believing" for ten minutes straight?',
          misconception: 'students let time-markers trigger a continuous reflex without checking whether the verb can take -ing' },
        { type: 'sort', nodeId: 'c10_gram_cbse_90_001', difficulty: 'foundation',
          question: 'Sort these into time rows — which row does each live in?',
          sortItems: [
              { id: 'a', label: 'She has finished', emoji: '✅', correctBin: 'present' },
              { id: 'b', label: 'She had finished', emoji: '⏪', correctBin: 'past' },
              { id: 'c', label: 'She will be finishing', emoji: '⏩', correctBin: 'future' },
              { id: 'd', label: 'She is finishing', emoji: '▶️', correctBin: 'present' },
          ],
          bins: [
              { id: 'past', label: 'PAST', color: '#ef4444' },
              { id: 'present', label: 'PRESENT', color: '#22c55e' },
              { id: 'future', label: 'FUTURE', color: '#3b82f6' },
          ],
          hint: 'Read the auxiliary: has/is = present, had = past, will = future.',
          misconception: 'students read the participle as the tense-carrier instead of the auxiliary' },
        { type: 'order', nodeId: 'c10_gram_cbse_90_003', difficulty: 'standard',
          question: '"By the time we reached, the train ___." — order the reasoning steps:',
          sortItems: [
              { id: 's1', label: 'Spot "by the time" — it orders two past events', emoji: '🔍', correctBin: 'p1' },
              { id: 's2', label: 'The earlier event takes past perfect', emoji: '⏮️', correctBin: 'p2' },
              { id: 's3', label: 'Reaching is the later event → the leaving is earlier', emoji: '🧭', correctBin: 'p3' },
              { id: 's4', label: 'Answer: had left', emoji: '✅', correctBin: 'p4' },
          ],
          bins: [
              { id: 'p1', label: '1', color: '#6366f1' },
              { id: 'p2', label: '2', color: '#8b5cf6' },
              { id: 'p3', label: '3', color: '#a855f7' },
              { id: 'p4', label: '4', color: '#22c55e' },
          ],
          hint: '"By the time" always asks which of two past events came first.',
          misconception: 'students treat both past events as simultaneous — missing that "by the time" encodes ordering' },
        { type: 'subpart', nodeId: 'c10_gram_cbse_90_003', difficulty: 'advanced',
          question: 'The two-event machine: "When the bell rang, the students ___ (already, leave) the hall."',
      hint: 'Work the parts in order — each answer feeds the next.',
      misconception: 'rushes to the final answer without building the chain',
          parts: [
              { id: 'a', prompt: 'Which event happened FIRST — the ringing or the leaving?',
                answer: 'the leaving',
                options: ['the leaving', 'the ringing', 'both at once'],
                hint: '"Already" signals the leaving was complete before the bell.',
                misconception: 'cannot order two past events' },
              { id: 'b', prompt: 'So which tense does the leaving take?',
                answer: 'past perfect',
                options: ['past perfect', 'simple past', 'past continuous'],
                hint: 'Earlier of two past events → had + V3.',
                misconception: 'uses simple past for both events' },
              { id: 'c', prompt: 'Write the complete sentence.',
                answer: 'When the bell rang, the students had already left the hall.',
                options: ['When the bell rang, the students had already left the hall.', 'When the bell rang, the students already left the hall.', 'When the bell had rung, the students already left the hall.'],
                hint: 'rang stays simple (later event); leaving goes perfect (earlier event).',
                misconception: 'shifts the wrong verb into past perfect' },
          ] },
    ],

    reflect: { prompts: ['Which helper verb secretly carries the tense — can you spot it instantly now?', 'Tell a friend why "I am knowing" is broken.'] },
    successLine: 'You navigate the tense grid like a native speaker — markers first, verbs second.',
    tryAgainLine: 'The grid is still fuzzy — find the time-marker before choosing, every single time.',
};
