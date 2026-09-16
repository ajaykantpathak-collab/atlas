import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c6_gram_ch81 The Naming Lab (noun families, pronouns, plurals).
 * Nodes: c6_gram_cbse_81_001, 81_002, 81_003. */
export const c6_gram_ch81: SimDef = {
    id: 'v3_c6_gram_ch81',
    title: 'The Naming Lab',
    subtitle: 'Every noun has a family, every pronoun points back to someone, and plurals follow five rules',
    classLevel: 6, subject: 'english-grammar', topic: 'Nouns, pronouns and plurals',
    chapters: ['c6_gram_ch81'],
    nodeIds: ['c6_gram_cbse_81_001', 'c6_gram_cbse_81_002', 'c6_gram_cbse_81_003'],
    emoji: '🏷️', theme: { bg: 'from-slate-900 to-green-950', accent: 'green', scene: 'junior' },

    scenario: {
        role: 'a librarian who must file every naming-word into its correct drawer',
        intro: 'Nouns come in families — names, groups, things you can touch, and things you cannot. Pronouns are the stand-ins that must match exactly who they replace.',
        goal: 'File every noun into its family, match pronouns to their real owners, and build plurals by the five rules.',
    },
    discovery: {
        question: 'Which of these can you NOT touch: mountain, honesty, chair, river?',
        options: [
            'honesty — you can only feel its effects, never touch it',
            'mountain — it is too big to touch',
            'river — water keeps moving',
            'none — you can touch all of them',
        ],
        answer: 'honesty — you can only feel its effects, never touch it',
        hook: 'The touch test sorts concrete from abstract — size and difficulty do not matter, only senses do.',
    },
    teaching: [
        { title: 'The four families', text: 'Proper = one special name (capital). Collective = one word for a group. Abstract = untouchable idea. Common = everything else.', emoji: '🗄️', bgColor: 'from-green-500 to-emerald-600' },
        { title: 'Pronouns point back', text: 'A pronoun replaces a noun — but it must match the right owner, not the nearest word.', emoji: '👉', bgColor: 'from-emerald-500 to-teal-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c6_gram_cbse_81_001', title: 'File the noun',
          scaffold: {
            problem: 'Sort: "kindness", "flock", "Mumbai", "chair"',
            steps: [
                { text: 'Mumbai — a specific name → proper (capital letter).' },
                { text: 'flock — one word for a whole group → collective.' },
                { text: 'kindness — can you touch it? No → abstract.', faded: true },
                { text: 'chair — touchable, ordinary → common.', faded: true },
                { text: 'You file "team": it is ___', blankAnswer: 'collective' },
            ],
          } },
        { type: 'dissect', nodeId: 'c6_gram_cbse_81_002', title: 'Who does it point to?',
          dissect: { specimen: 'pronoun puzzles',
          spots: [
            { id: 's1', label: 'owner', prompt: '"The girls gave the boys their ball back." — whose ball?', answer: 'the girls\' — "their" points to the owner (girls), not the nearest noun (boys)', options: ['the girls\' — "their" points to the owner (girls), not the nearest noun (boys)', 'the boys\' — nearest noun wins', 'nobody can tell', 'the ball\'s own'] },
            { id: 's2', label: 'apostrophe', prompt: '"its" vs "it\'s" — which is the possessive?', answer: 'its — the apostrophe in it\'s always means "it is"', options: ['its — the apostrophe in it\'s always means "it is"', 'it\'s — apostrophe shows possession', 'both work', 'neither is possessive'] },
            { id: 's3', label: 'ambiguity', prompt: '"Ravi told Mohan he had won." — who won?', answer: 'cannot tell — "he" points at two people; the sentence must be rewritten', options: ['cannot tell — "he" points at two people; the sentence must be rewritten', 'Ravi — subjects win', 'Mohan — the last name wins', 'both won'] },
          ] } },
        { type: 'build', nodeId: 'c6_gram_cbse_81_003', title: 'Build the plural',
          build: {
            prompt: 'Put the plural-forming steps in order for "baby":',
            blocks: ['consonant + y ending → drop y', 'add ies', 'babies'],
            answer: 'consonant + y ending → drop y, add ies, babies',
          } },
        { type: 'drill', nodeId: 'c6_gram_cbse_81_003', title: 'Plural speed round', drill: { kind: 'fill', count: 4, level: 2 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c6_gram_cbse_81_001', difficulty: 'foundation',
          question: '"Strength" — abstract or concrete? A wrestler has lots of it!',
          options: [
              { text: 'Abstract — you cannot touch strength itself, only its effects' },
              { text: 'Concrete — wrestlers visibly have it', reveals: 'owner-test' },
              { text: 'Collective — it describes a group of muscles', reveals: 'family-blind' },
          ],
          answer: 'Abstract — you cannot touch strength itself, only its effects',
          remediations: {
              'owner-test': { steps: ['Test the word, not its owner — you touch the wrestler, not the strength.', 'Abstract = idea/quality/feeling: kindness, fear, strength, honesty.'] },
              'family-blind': { steps: ['Collective = one word naming a group (team, flock, army). Strength names a quality — abstract.'] },
          },
          hint: 'Test the word itself, not who owns it.',
          misconception: 'students test the owner instead of the word — "wrestlers have strength" does not make strength touchable' },
        { type: 'mcq', nodeId: 'c6_gram_cbse_81_002', difficulty: 'standard',
          question: '"Its raining, so the dog lost it\'s bone." — fix both.',
          options: [
              { text: "It's raining / its bone — apostrophe = it is; possession = no apostrophe" },
              { text: 'Both keep apostrophes — possession needs them', reveals: 'apostrophe-flip' },
              { text: 'Its raining / its bone — remove both', reveals: 'apostrophe-flip' },
          ],
          answer: "It's raining / its bone — apostrophe = it is; possession = no apostrophe",
          remediations: {
              'apostrophe-flip': { steps: ['it\'s = it is. Expand it aloud — if "it is" fits, keep the apostrophe.', 'its (possessive) has NO apostrophe — like his, hers, theirs, which also carry none.'] },
          },
          hint: 'Say "it is" out loud — does the sentence still work?',
          misconception: 'students think apostrophe = possession — for its/it\'s the rule is exactly backwards' },
        { type: 'mcq', nodeId: 'c6_gram_cbse_81_003', difficulty: 'foundation',
          question: '"I have many homeworks and two luggages." — what is wrong?',
          options: [
              { text: 'Both are uncountable — much homework, two pieces of luggage' },
              { text: 'Only luggage is wrong', reveals: 'partial-uncountable' },
              { text: 'Nothing is wrong', reveals: 'uncountable-blind' },
          ],
          answer: 'Both are uncountable — much homework, two pieces of luggage',
          remediations: {
              'partial-uncountable': { steps: ['Homework and luggage are both mass nouns — neither pluralizes.', 'Mass nouns need counters: pieces of, bits of, items of.'] },
              'uncountable-blind': { steps: ['Some nouns name stuff, not things — water, rice, homework, luggage, furniture.', 'Stuff cannot be counted one-two-three, so no -s. Use "much" or a counter word.'] },
          },
          hint: 'Can you count them one, two, three?',
          misconception: 'students pluralize mass nouns by habit — uncountables never take -s' },
        { type: 'sort', nodeId: 'c6_gram_cbse_81_001', difficulty: 'foundation',
          question: 'File each noun into its family drawer:',
          sortItems: [
              { id: 'a', label: 'honesty', emoji: '💭', correctBin: 'abstract' },
              { id: 'b', label: 'team', emoji: '👥', correctBin: 'collective' },
              { id: 'c', label: 'Delhi', emoji: '🏙️', correctBin: 'proper' },
              { id: 'd', label: 'pencil', emoji: '✏️', correctBin: 'common' },
              { id: 'e', label: 'courage', emoji: '🦁', correctBin: 'abstract' },
              { id: 'f', label: 'army', emoji: '🪖', correctBin: 'collective' },
          ],
          bins: [
              { id: 'proper', label: 'PROPER', color: '#f59e0b' },
              { id: 'collective', label: 'COLLECTIVE', color: '#8b5cf6' },
              { id: 'abstract', label: 'ABSTRACT', color: '#0ea5e9' },
              { id: 'common', label: 'COMMON', color: '#22c55e' },
          ],
          hint: 'Name → proper. Group → collective. Untouchable idea → abstract. Ordinary thing → common.',
          misconception: 'students sort by word difficulty instead of what the noun names' },
        { type: 'subpart', nodeId: 'c6_gram_cbse_81_003', difficulty: 'standard',
          question: 'Pluralize the tricky set: knife, mouse, sheep.',
          hint: 'Check each against the five rules before answering.',
          misconception: 'applies +s universally — the irregular and unchanged rebels break the habit',
          parts: [
              { id: 'a', prompt: 'knife → ?',
                answer: 'knives',
                options: ['knives', 'knifes', 'knifes\''],
                hint: 'f/fe endings drop to v + es.',
                misconception: 'f→ves rule not learned' },
              { id: 'b', prompt: 'mouse → ?',
                answer: 'mice',
                options: ['mice', 'mouses', 'mices'],
                hint: 'A memorized rebel — no rule builds it.',
                misconception: 'irregulars unknown' },
              { id: 'c', prompt: 'sheep → ?',
                answer: 'sheep',
                options: ['sheep', 'sheeps', 'sheepes'],
                hint: 'Some nouns never change — sheep, deer, fish.',
                misconception: 'adds -s to unchanged plurals' },
          ] },
    ],

    reflect: { prompts: ['Which family is hardest to spot — abstract or collective?', 'Explain its vs it\'s to a younger student.'] },
    successLine: 'Every word filed correctly — families, owners, and plural rules all locked.',
    tryAgainLine: 'File by what the word names, not what it looks like — touch test first.',
};
