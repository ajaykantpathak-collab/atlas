import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c12_gram_ch80 Traffic Control (punctuation + editing passages).
 * Nodes: c12_gram_cbse_80_001, 80_002. */
export const c12_gram_ch80: SimDef = {
    id: 'v3w_c12_gram_ch80',
    title: 'Traffic Control',
    subtitle: 'Commas separate but never join, semicolons join equals, apostrophes mark possession — and editing passages hide one fault per line',
    classLevel: 12, subject: 'english-grammar', topic: 'Punctuation and editing',
    chapters: ['c12_gram_ch80'],
    nodeIds: ['c12_gram_cbse_80_001', 'c12_gram_cbse_80_002'],
    emoji: '🚦', theme: { bg: 'from-slate-900 to-red-950', accent: 'red', scene: 'senior' },

    scenario: {
        role: 'a traffic controller for clauses — deciding where they may merge, where they must stop, and who owns what',
        intro: 'Punctuation is not decoration — it is traffic law. The comma splice, the semicolon-join, the colon-intro, and the apostrophe-border are all enforceable rules.',
        goal: 'Fix comma splices three legal ways, deploy semicolons and colons correctly, police apostrophes, and audit editing passages by category.',
    },
    discovery: {
        question: '"The concert was cancelled, many fans were disappointed." — legal?',
        options: [
            'No — comma splice: two independent clauses need a conjunction, semicolon, or full stop',
            'Yes — the comma joins related ideas',
            'Yes — commas join any clauses',
            'No — needs a colon',
        ],
        answer: 'No — comma splice: two independent clauses need a conjunction, semicolon, or full stop',
        hook: 'The comma\'s superpower myth: it separates, it never joins. Joining needs semicolon, conjunction, or a full stop.',
    },
    teaching: [
        { title: 'The joiner hierarchy', text: 'Two independent clauses: conjunction + comma, or semicolon, or full stop. Never a comma alone.', emoji: '⛓️', bgColor: 'from-red-500 to-rose-600' },
        { title: 'The apostrophe border', text: 'Possession and contraction only — never plurals. "its" = possession, "it\'s" = it is. "the 1990s", not "the 1990\'s".', emoji: '✋', bgColor: 'from-rose-500 to-pink-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c12_gram_cbse_80_001', title: 'Three legal fixes',
          scaffold: {
            problem: 'Fix the splice: "It rained, we stayed home."',
            steps: [
                { text: 'Diagnose: two independent clauses joined by a comma alone = splice.' },
                { text: 'Fix A — add a coordinator: "It rained, so we stayed home."' },
                { text: 'Fix B — semicolon: "It rained; we stayed home."', faded: true },
                { text: 'Fix C — full stop: "It rained. We stayed home."', faded: true },
                { text: 'You fix: "The bell rang, everyone left." → ', blankAnswer: 'The bell rang; everyone left (or: rang, so / rang. Everyone)' },
            ],
          } },
        { type: 'dissect', nodeId: 'c12_gram_cbse_80_001', title: 'Apostrophe audit',
          dissect: { specimen: 'the borders of possession',
          spots: [
            { id: 's1', label: 'its', prompt: '"Its raining so the dog lost it\'s bone." — fix both.', answer: 'It\'s raining / its bone — expand "it is" to test the apostrophe', options: ['It\'s raining / its bone — expand "it is" to test the apostrophe', 'both are correct', 'Its\' raining / its bone', 'remove both apostrophes'] },
            { id: 's2', label: 'plurals', prompt: '"Fresh apple\'s for sale" — the fault?', answer: 'plurals take no apostrophe — "apples"', options: ['plurals take no apostrophe — "apples"', 'apple\'s → apples\'', 'fresh needs a comma', 'no fault'] },
            { id: 's3', label: 'decades', prompt: '"the 1990\'s" — the fault?', answer: 'decade plurals take no apostrophe — "the 1990s"', options: ['decade plurals take no apostrophe — "the 1990s"', 'correct — it shows the decade', 'should be 1990s\'', 'needs the apostrophe moved'] },
          ] } },
        { type: 'case', nodeId: 'c12_gram_cbse_80_002', title: 'The editing checklist',
          caseStudy: {
            intro: 'Editing passages hide one error per line across four categories — tense, concord, determiners, word-form. Audit by category, not by vibe.',
            decisions: [
              { prompt: '"One of my friend have gone to Delhi last week." — count the faults.', options: [
                  { text: 'Two — "friend" → "friends" (one of + plural) and "have" → "has" (head is "one")', outcome: 'Correct — both the one-of rule and the head-agreement fired.' },
                  { text: 'One — "have" → "has"', outcome: 'Half the audit — "one of my friend" also breaks the rule: one of + PLURAL noun.', reveals: 'single-pass' },
                ] },
              { prompt: '"He discussed about the problem." — the error?', options: [
                  { text: '"discussed about" → "discussed" — discuss takes no preposition', outcome: 'Correct — a complete verb carrying a redundant partner.' },
                  { text: 'the problem → a problem', outcome: 'The article is legal — the redundancy is the fault. Hunt word-form errors by category.', reveals: 'category-blind' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c12_gram_cbse_80_002', title: 'Editing speed round', drill: { kind: 'fill', count: 4, level: 5 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c12_gram_cbse_80_001', difficulty: 'standard',
          question: '"The exam was hard ___ it was fair." — comma or semicolon?',
          options: [
              { text: 'Semicolon — two independent clauses, closely related, no conjunction' },
              { text: 'Comma — the ideas are related', reveals: 'comma-power' },
              { text: 'Colon — the second explains the first', reveals: 'colon-misfire' },
          ],
          answer: 'Semicolon — two independent clauses, closely related, no conjunction',
          remediations: {
              'comma-power': { steps: ['A comma alone between independent clauses = splice.', 'Legal joins: comma + conjunction, semicolon, or full stop.'] },
              'colon-misfire': { steps: ['Colons introduce lists/explanations — "it was fair" does not explain "hard", it contrasts it.', 'Balanced related clauses take the semicolon.'] },
          },
          hint: 'Does the second clause explain the first, or balance it?',
          misconception: 'comma-power belief — the comma as universal joiner' },
        { type: 'mcq', nodeId: 'c12_gram_cbse_80_001', difficulty: 'standard',
          question: '"The students book\'s were stolen" — find both errors.',
          options: [
              { text: '"students\'" (possessive after s) and "books" (plural, no apostrophe)' },
              { text: 'only "book\'s" → "books"', reveals: 'single-pass' },
              { text: '"student\'s books"', reveals: 'plural-miss' },
          ],
          answer: '"students\'" (possessive after s) and "books" (plural, no apostrophe)',
          remediations: {
              'single-pass': { steps: ['Apostrophe errors come in pairs — check EVERY apostrophe in the line.', 'students\' = possessive; books = plain plural.'] },
              'plural-miss': { steps: ['"student\'s" would mean ONE student — the books belonged to students, plural.', 'Plural possessive: students\'.'] },
          },
          hint: 'Two apostrophes, two different rules.',
          misconception: 'students fix one apostrophe and stop — both borders were violated' },
        { type: 'mcq', nodeId: 'c12_gram_cbse_80_002', difficulty: 'advanced',
          question: 'Edit: "The news are really shocked everyone in the village."',
          options: [
              { text: '"are really shocked" → "really shocked" — news is singular AND shocked needs no auxiliary here' },
              { text: '"are" → "is" only', reveals: 'single-pass' },
              { text: '"shocked" → "shocking" only', reveals: 'single-pass' },
          ],
          answer: '"are really shocked" → "really shocked" — news is singular AND shocked needs no auxiliary here',
          remediations: {
              'single-pass': { steps: ['Two faults stacked — "news" is singular (drop are / use was) and "shocked" as a verb needs no be-auxiliary.', 'Editing passages demand category-complete audits: verb form AND concord.'] },
          },
          hint: 'Check the verb form AND the agreement — both fired.',
          misconception: 'single-pass auditing — the first found error ends the search' },
        { type: 'sort', nodeId: 'c12_gram_cbse_80_002', difficulty: 'foundation',
          question: 'Sort the errors by category:',
          sortItems: [
              { id: 'a', label: 'didn\'t went', emoji: '⏪', correctBin: 'tense' },
              { id: 'b', label: 'one of my friend', emoji: '👥', correctBin: 'concord' },
              { id: 'c', label: 'less students', emoji: '📉', correctBin: 'determiner' },
              { id: 'd', label: 'discuss about', emoji: '💬', correctBin: 'wordform' },
              { id: 'e', label: 'return back', emoji: '🔙', correctBin: 'wordform' },
              { id: 'f', label: 'an university', emoji: '🎓', correctBin: 'determiner' },
          ],
          bins: [
              { id: 'tense', label: 'TENSE/FORM', color: '#ef4444' },
              { id: 'concord', label: 'CONCORD', color: '#f59e0b' },
              { id: 'determiner', label: 'DETERMINER', color: '#0ea5e9' },
              { id: 'wordform', label: 'WORD-FORM/PREP', color: '#8b5cf6' },
          ],
          hint: 'The four editing categories — audit each line against all four.',
          misconception: 'students hunt errors by feel instead of running the four-category checklist' },
        { type: 'subpart', nodeId: 'c12_gram_cbse_80_001', difficulty: 'advanced',
          question: '"It rained, we stayed home." — produce all three legal repairs.',
          hint: 'Conjunction, semicolon, or full stop.',
          misconception: 'knows one fix — the repair menu is incomplete',
          parts: [
              { id: 'a', prompt: 'Fix with a coordinator.',
                answer: 'It rained, so we stayed home.',
                options: ['It rained, so we stayed home.', 'It rained, and we stayed home — no contrast', 'It rained, we stayed home.'],
                hint: 'so/and/but + comma joins legally.',
                misconception: 'comma alone kept' },
              { id: 'b', prompt: 'Fix with a semicolon.',
                answer: 'It rained; we stayed home.',
                options: ['It rained; we stayed home.', 'It rained: we stayed home.', 'It rained — we stayed home.'],
                hint: 'Semicolon joins balanced clauses without a conjunction.',
                misconception: 'wrong joiner chosen' },
              { id: 'c', prompt: 'Why does a colon NOT work here?',
                answer: 'colons introduce lists/explanations — "stayed home" is a result, not an explanation of "rained"',
                options: ['colons introduce lists/explanations — "stayed home" is a result, not an explanation of "rained"', 'colons are informal', 'colons need capitals', 'colons are for time'],
                hint: 'Colon = "namely" — is the second clause a "namely"?',
                misconception: 'colon/semicolon boundary unclear' },
          ] },
    ],

    reflect: { prompts: ['Which splice-fix is your default — and are the other two ready?', 'How does "it is" testing settle its/it\'s?'] },
    successLine: 'Traffic controlled — every clause-join legal, every apostrophe on the right side of the border.',
    tryAgainLine: 'The comma separates; it never joins. Audit by category, never by vibe.',
};
