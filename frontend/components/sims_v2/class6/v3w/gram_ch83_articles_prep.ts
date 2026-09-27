import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c6_gram_ch83 Little Words, Big Jobs (articles, prepositions, conjunctions).
 * Nodes: c6_gram_cbse_83_001, 83_002, 83_003. */
export const c6_gram_ch83: SimDef = {
    id: 'v3w_c6_gram_ch83',
    title: 'Little Words, Big Jobs',
    subtitle: 'a/an/the chooses by sound and shared knowledge, prepositions place things, conjunctions carry the logic',
    classLevel: 6, subject: 'english-grammar', topic: 'Articles, prepositions and conjunctions',
    chapters: ['c6_gram_ch83'],
    nodeIds: ['c6_gram_cbse_83_001', 'c6_gram_cbse_83_002', 'c6_gram_cbse_83_003'],
    emoji: '🧩', theme: { bg: 'from-slate-900 to-violet-950', accent: 'violet', scene: 'junior' },

    scenario: {
        role: 'a puzzle solver placing the smallest pieces that hold sentences together',
        intro: 'The smallest words do the biggest jobs — a/an/the, in/on/at, and/but/because. Put the wrong one in and the whole picture shifts.',
        goal: 'Choose articles by the story rule, place prepositions by the calendar and picture tests, and pick conjunctions by logic.',
    },
    discovery: {
        question: '"I saw a bird. ___ bird sat on a branch." — a, an, or the for the second mention?',
        options: [
            'the — now we both know WHICH bird',
            'a — it is still just a bird',
            'an — bird starts with a vowel when spoken fast',
            'no word needed',
        ],
        answer: 'the — now we both know WHICH bird',
        hook: 'First mention = a (new). Second mention = the (we both know it). That is the whole story-rule.',
    },
    teaching: [
        { title: 'The story rule', text: 'a/an introduces something new; the points at something we both know. And an listens to SOUND — an hour, a university.', emoji: '📖', bgColor: 'from-violet-500 to-purple-600' },
        { title: 'The calendar and the picture', text: 'Time: at + clock, on + day, in + month. Space: in = inside, on = surface, between = two, among = a crowd.', emoji: '📅', bgColor: 'from-purple-500 to-fuchsia-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c6_gram_cbse_83_001', title: 'Run the story rule',
          scaffold: {
            problem: '"I saw ___ elephant. ___ elephant was drinking water."',
            steps: [
                { text: 'First mention — new to the story → "a/an".' },
                { text: 'elephant starts with a vowel sound → "an".' },
                { text: 'Second mention — we know which one → "the".', faded: true },
                { text: 'So: "an elephant … the elephant".', faded: true },
                { text: 'You: "She bought ___ orange. ___ orange was sweet." → ', blankAnswer: 'an, the' },
            ],
          } },
        { type: 'dissect', nodeId: 'c6_gram_cbse_83_001', title: 'The an-trap',
          dissect: { specimen: 'sound decides, not spelling',
          spots: [
            { id: 's1', label: 'hour', prompt: 'Why "an hour" when h is a consonant?', answer: 'the h is silent — an follows SOUND, and hour starts with a vowel sound', options: ['the h is silent — an follows SOUND, and hour starts with a vowel sound', 'h is always silent', 'hour is special', 'an before all time words'] },
            { id: 's2', label: 'university', prompt: 'Why "a university" when u is a vowel?', answer: 'it starts with a yoo- consonant sound — sound, not spelling', options: ['it starts with a yoo- consonant sound — sound, not spelling', 'u is not a real vowel', 'long words take a', 'it is an exception'] },
            { id: 's3', label: 'M.A.', prompt: '"an M.A." — why an?', answer: 'the letter name starts with a vowel sound (em-)', options: ['the letter name starts with a vowel sound (em-)', 'M is a vowel letter', 'degrees take an', 'it is irregular'] },
          ] } },
        { type: 'case', nodeId: 'c6_gram_cbse_83_003', title: 'Pick the logic-joiner',
          caseStudy: {
            intro: 'Every conjunction names a logic — and adds, but contrasts, because gives the reason, so gives the result.',
            decisions: [
              { prompt: '"He was tired ___ he kept working."', options: [
                  { text: 'but — keeping working contradicts the tiredness: contrast', outcome: 'Correct — opposite directions take "but".' },
                  { text: 'and — two facts joined', outcome: 'Not quite — the second fact fights the first; that is contrast, not addition.', reveals: 'and-default' },
                  { text: 'so — tiredness caused working', outcome: 'That would mean tiredness made him work — backwards logic.', reveals: 'logic-flip' },
                ] },
              { prompt: '"She was hungry ___ she ate two sandwiches."', options: [
                  { text: 'so — hunger caused the eating', outcome: 'Correct — cause first, result second.' },
                  { text: 'because — hunger is the reason', outcome: 'Because would flip it: "she ate because she was hungry" — same fact, different order. But the blank sits between cause and result, so "so" fits.', reveals: 'because-so-swap' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c6_gram_cbse_83_002', title: 'Preposition speed round', drill: { kind: 'fill', count: 4, level: 2 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c6_gram_cbse_83_001', difficulty: 'foundation',
          question: '"___ European country" — a or an?',
          options: [
              { text: 'a — "European" starts with a yoo- consonant sound' },
              { text: 'an — E is a vowel letter', reveals: 'letter-match' },
          ],
          answer: 'a — "European" starts with a yoo- consonant sound',
          remediations: {
              'letter-match': { steps: ['Say the word aloud — the first SOUND decides, not the first letter.', 'yoo-sounds take a: a university, a European, a one-rupee coin.'] },
          },
          hint: 'Say it aloud — what is the first sound?',
          misconception: 'students apply a/an to spelling, not pronunciation' },
        { type: 'mcq', nodeId: 'c6_gram_cbse_83_002', difficulty: 'foundation',
          question: '"The meeting is ___ Monday ___ 3 o\'clock ___ July."',
          options: [
              { text: 'on, at, in — day takes on, clock takes at, month takes in' },
              { text: 'in, on, at', reveals: 'calendar-scramble' },
              { text: 'at, on, in', reveals: 'calendar-scramble' },
          ],
          answer: 'on, at, in — day takes on, clock takes at, month takes in',
          remediations: {
              'calendar-scramble': { steps: ['The calendar rule: AT exact times (at 5 pm), ON days and dates (on Monday, on 15 August), IN longer stretches (in July, in 2024, in the morning).'] },
          },
          hint: 'Clock → at. Day → on. Month → in.',
          misconception: 'students mix the at/on/in calendar rule randomly' },
        { type: 'mcq', nodeId: 'c6_gram_cbse_83_002', difficulty: 'standard',
          question: '"She travels ___ bus daily." in or on?',
          options: [
              { text: 'on — public transport takes "on" (bus, train, plane)' },
              { text: 'in — she sits inside the bus', reveals: 'hindi-inside' },
          ],
          answer: 'on — public transport takes "on" (bus, train, plane)',
          remediations: {
              'hindi-inside': { steps: ['English divides transport oddly: ON for bus/train/plane/ship, IN for car/taxi.', 'It is a convention, not a picture — memorize the split.'] },
          },
          hint: 'Is it public transport or a private car?',
          misconception: 'students translate "inside the vehicle" literally — English uses "on" for public transport' },
        { type: 'mcq', nodeId: 'c6_gram_cbse_83_003', difficulty: 'standard',
          question: 'Which is wrong and why: "I wanted tea, but I drank tea."',
          options: [
              { text: '"but" promises a contrast that never arrives — should be "and"' },
              { text: 'It is correct — but joins any two clauses', reveals: 'but-pause' },
              { text: '"tea" should not repeat', reveals: 'word-focus' },
          ],
          answer: '"but" promises a contrast that never arrives — should be "and"',
          remediations: {
              'but-pause': { steps: ['"but" is not a pause-word — it signals CONTRAST.', 'Same direction → and. Opposite → but. Choice → or.'] },
              'word-focus': { steps: ['The repetition is fine; the joiner is wrong — wanted and drank move the same direction.'] },
          },
          hint: 'Does the second half fight the first?',
          misconception: 'students hear "but" as a pause-word, not a contrast-signal' },
        { type: 'sort', nodeId: 'c6_gram_cbse_83_003', difficulty: 'foundation',
          question: 'Sort the joiners by the logic they carry:',
          sortItems: [
              { id: 'a', label: 'and', emoji: '➕', correctBin: 'add' },
              { id: 'b', label: 'but', emoji: '↔️', correctBin: 'contrast' },
              { id: 'c', label: 'because', emoji: '❓', correctBin: 'cause' },
              { id: 'd', label: 'so', emoji: '➡️', correctBin: 'result' },
              { id: 'e', label: 'or', emoji: '🔀', correctBin: 'choice' },
          ],
          bins: [
              { id: 'add', label: 'ADD', color: '#22c55e' },
              { id: 'contrast', label: 'CONTRAST', color: '#ef4444' },
              { id: 'cause', label: 'CAUSE', color: '#0ea5e9' },
              { id: 'result', label: 'RESULT', color: '#8b5cf6' },
              { id: 'choice', label: 'CHOICE', color: '#f59e0b' },
          ],
          hint: 'because goes before the cause; so goes before the result.',
          misconception: 'students swap because/so — reversing cause and effect' },
    ],

    reflect: { prompts: ['Which trap caught you — the yoo-sound or the on-the-bus rule?', 'Say the calendar rule to a friend.'] },
    successLine: 'The little words are locked — sound, calendar, and logic all working.',
    tryAgainLine: 'Sound decides a/an, the calendar decides at/on/in, and logic decides the joiner.',
};
