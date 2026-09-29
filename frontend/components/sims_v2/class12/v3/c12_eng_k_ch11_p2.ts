import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch11_p2: SimDef = {
    id: 'v3_c12_eng_k_ch11_p2',
    title: 'The Wild Swans at Coole (Poem) · Part 2/3',
    subtitle: 'The swans haven\'t grown old — that\'s the wound',
    classLevel: 12, subject: 'eng_k', topic: 'The Wild Swans at Coole (Poem) · Part 2/3',
    chapters: ['c12_eng_k_ch11'],
    nodeIds: ['c12_eng_k_cbse_11_007', 'c12_eng_k_cbse_11_008', 'c12_eng_k_cbse_11_009', 'c12_eng_k_cbse_11_010', 'c12_eng_k_cbse_11_011', 'c12_eng_k_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist poetry reader', intro: 'Nineteen years of the same lake, the same count, the same wings — and everything around them has changed.', goal: 'Read The Wild Swans at Coole through Yeats\'s 1916 world — Coole, Lady Gregory, the Rising — and its elegy for permanence.' },
    discovery: {
        question: 'Fifty-one, twice rejected, his country in revolt — Yeats counts the swans at Coole for the nineteenth autumn and finds them \'unwearied.\' What are the swans really measuring?',
        options: ['His own losses — their permanent passion throws his sore heart, failed loves and shaken Ireland into painful relief', 'Just the swan population', 'The lake\'s ecology', 'Nothing — it\'s a nature poem'],
        answer: 'His own losses — their permanent passion throws his sore heart, failed loves and shaken Ireland into painful relief',
        hook: '\'Nineteenth autumn\' is arithmetic with memory: 1916 minus nineteen lands on 1897, the year he met Lady Gregory — and in 1916 the Easter Rising and his final rejection arrived together. Without that scaffold the poem is pretty birds; with it, an elegy for a vanishing world.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'The Wild Swans at Coole\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_11_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Make the count with him: fix the autumn arithmetic, weigh public collapse against private loss, and trace how the swans\' sudden flight \'scattering wheeling\' becomes everything he can no longer hold.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'The Wild Swans at Coole\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in poetry, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate idea that supports, contrasts with, or expands the', outcome: 'A secondary theme is a subordinate idea that supports, contrasts with, or expands the primary.' },
                { text: 'autumn', outcome: 'Not quite — Students frequently confuse **topics** (swans, autumn, water, aging) with **themes** (statements.', reveals: 'students-frequently-confuse-topics-swans' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'The Wild Swans at Coole\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'What is the definition of a metaphor, and how does it differ from a simile?', options: [
                { text: 'A metaphor directly states that one thing *is* another (e.g., "The swans are eternal', outcome: 'A metaphor directly states that one thing *is* another (e.g., "The swans are eternal youth"), while.' },
                { text: 'like a bell', outcome: 'Not quite — Students often treat **every comparison in the poem as a metaphor**, labeling "bell-beat of their.', reveals: 'students-often-treat-every-comparison' },
                { text: 'like/as', outcome: 'Not quite — Students often treat **every comparison in the poem as a metaphor**, labeling "bell-beat of their.', reveals: 'students-often-treat-every-comparison' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'The Wild Swans at Coole\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'What is the primary irony in "The Wild Swans at Coole"?', options: [
                { text: 'The primary irony is the contrast between the swans\' apparent timelessness', outcome: 'The primary irony is the contrast between the swans\' apparent timelessness — they are "unwearied,".' },
                { text: 'the swans are beautiful but the poet is sad', outcome: 'Not quite — Students often confuse the *poet\'s sadness* with the *irony itself*, writing "The irony is that the.', reveals: 'students-often-confuse-the-poet' },
                { text: 'The irony is that the poet is sad seeing the swans', outcome: 'Not quite — Students often confuse the *poet\'s sadness* with the *irony itself*, writing "The irony is that the.', reveals: 'students-often-confuse-the-poet' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'The Wild Swans at Coole\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the dictionary meaning of the word "clamorous" as used in the line "And scatter wheeling in great broken rings / Upon their.', options: [
                { text: 'The dictionary meaning of "clamorous" is "making a loud and confused noise', outcome: 'The dictionary meaning of "clamorous" is "making a loud and confused noise; vehement in protest.' },
                { text: 'clamorous', outcome: 'Not quite — Students believe "vocabulary in context" means writing the dictionary definition of a difficult.', reveals: 'vocabulary-in-context-means-writing' },
                { text: 'making a loud and confused noise', outcome: 'Not quite — Students believe "vocabulary in context" means writing the dictionary definition of a difficult.', reveals: 'vocabulary-in-context-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'The Wild Swans at Coole\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the rhyme scheme of the first stanza of "The Wild Swans at Coole" as represented in the NCERT text (A, B, C, B, D, E) and state.', options: [
                { text: 'The rhyme scheme is ABCBDE (beauty/A, dry/B, water/C, sky/B, stones/D, swans/E)', outcome: 'The rhyme scheme is ABCBDE (beauty/A, dry/B, water/C, sky/B, stones/D, swans/E).' },
                { text: 'incorrect', outcome: 'Not quite — Students frequently treat poetic grammar as "incorrect" or "broken" English — e.g., marking "The.', reveals: 'students-frequently-treat-poetic-grammar' },
                { text: 'broken', outcome: 'Not quite — Students frequently treat poetic grammar as "incorrect" or "broken" English — e.g., marking "The.', reveals: 'students-frequently-treat-poetic-grammar' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'The Wild Swans at Coole\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the defining difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question\'s answer is explicitly stated in the text (e.g., "How many swans does', outcome: 'A literal question\'s answer is explicitly stated in the text (e.g., "How many swans does the poet.' },
                { text: 'inferential questions are just harder', outcome: 'Not quite — Students believe inferential questions invite "any interpretation" and that personal feelings.', reveals: 'inferential-questions-invite-any-interpretation' },
                { text: 'any interpretation', outcome: 'Not quite — Students believe inferential questions invite "any interpretation" and that personal feelings.', reveals: 'inferential-questions-invite-any-interpretation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Back at a childhood lake for the first time in twenty years, a middle-aged alum watches the birds scatter unchanged and says bitterly, \'they\'re the same — only I\'ve aged.\'',
            decisions: [{ prompt: 'How does Yeats frame that bitterness?', options: [
                { text: 'As the real subject — \'The Wild Swans at Coole\' holds both truths at once: the swans\' brilliant continuity and the speaker\'s nineteenth autumn; the pain is the gap, and naming it is the poem\'s consolation.', outcome: 'Continuity in the world plus change in the self is exactly the tension Yeats sits with — the swans aren\'t mocking him; they\'re measuring time.' },
                { text: 'He\'s right to be bitter — unchanging things exist to reproach the aging.', outcome: 'The poem reads permanence as beautiful, not mocking; turning it into an accusation is the bitterness talking.', reveals: 'permanence-as-reproach' },
                { text: 'Cheer up — nothing really changes, including him.', outcome: 'That denies the poem\'s whole grief; Yeats insists the change in the observer is real and counts.', reveals: 'change-blindness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a landscape as a man\'s ledger of losses — modernist poetry where history hides inside private symbols.',
            decisions: [{ prompt: 'What comes next? The Wild Swans at Coole (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Wild Swans at Coole (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_007', difficulty: 'standard',
          question: 'Secondary themes in \'The Wild Swans at Coole\' — the supporting ideas and motifs.',
          hint: 'If stuck, review the "Topic vs. Theme" distinction using the Class 11 "A Photograph" node.',
          misconception: 'Students frequently confuse **topics** (swans, autumn, water, aging) with **themes** (statements about those topics).',
          parts: [
                { id: 'a', prompt: 'Apply the concept of secondary themes to a new context: In Robert Frost\'s "Stopping by Woods on a Snowy Evening," the primary theme is the tension between duty.', answer: 'Secondary theme: **The quiet beauty and hypnotic power of the natural world as a',
                  options: ['Secondary theme: **The quiet beauty and hypnotic power of the natural world as a', 'the horse is confused', 'promises must be kept'],
                  hint: 'If stuck, review the "Topic vs. Theme" distinction using the Class 11 "A Photograph" node.',
                  misconception: 'Students frequently confuse **topics** (swans, autumn, water, aging) with **themes** (statements about those topics).' }
          ],
            remediations: { 'students-frequently-confuse-topics-swans': { steps: ['**Immediate remediation:** Have the student complete this sentence frame for three topics from the poem: "The poem.', '**Revisit node c11_eng_h_cbse_07_007 (Theme: Secondary Themes in "A Photograph")** — analyze how that node.', '**Re-diagnostic:** Give the student a new 4-line unseen poem excerpt.', 'Ask: "State one primary theme and one secondary theme as full sentences." Grade only on whether they are *statements*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse **topics** (swans, autumn, water, aging) with **themes** (statements about those topics).',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The secondary theme of \'The Wild Swans at Coole\' is simply that nature is beautiful, which is obvious and doesn\'t add much to the.', answer: '**Refute.** The claim reduces a complex thematic strand to a cliché',
                  options: ['**Refute.** The claim reduces a complex thematic strand to a cliché', 'autumn beauty'],
                  hint: 'If stuck, review the "Topic vs. Theme" distinction using the Class 11 "A Photograph" node.',
                  misconception: 'Students frequently confuse **topics** (swans, autumn, water, aging) with **themes** (statements about those topics).' }
          ],
            remediations: { 'students-frequently-confuse-topics-swans': { steps: ['**Immediate remediation:** Have the student complete this sentence frame for three topics from the poem: "The poem.', '**Revisit node c11_eng_h_cbse_07_007 (Theme: Secondary Themes in "A Photograph")** — analyze how that node.', '**Re-diagnostic:** Give the student a new 4-line unseen poem excerpt.', 'Ask: "State one primary theme and one secondary theme as full sentences." Grade only on whether they are *statements*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_008', difficulty: 'standard',
          question: 'Imagery in \'The Wild Swans at Coole\' — the vivid, sensory language that creates.',
          hint: 'If stuck on identifying devices, return to c6_english_u1_005 (basic definitions) and.',
          misconception: 'Students often treat **every comparison in the poem as a metaphor**, labeling "bell-beat of their wings" (metaphor).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery in \'The Wild Swans at Coole\'',
                  options: ['Imagery in \'The Wild Swans at Coole\'', '\'The Wild Swans at Coole\' (Kaleidoscope, ch', 'The plot/narrative arc of \'The Wild Swans at Coole\'', 'The setting of \'The Wild Swans at Coole\''],
                  hint: 'If stuck on identifying devices, return to c6_english_u1_005 (basic definitions) and do the.',
                  misconception: 'Students often treat **every comparison in the poem as a metaphor**, labeling "bell-beat of their wings" (metaphor), "wheeling in great.' }
          ],
            remediations: { 'students-often-treat-every-comparison': { steps: ['**Revisit definitions**: Go to c6_english_u1_005 (Metaphor, Imagery basics) and c7_engl_ch01_008 (Imagery in nature.', 'Re-read the definitions and examples there.', '**Device-hunt drill**: Take stanza 2 of "Wild Swans." List *every* phrase.', 'For each, write: (a) Device name (Imagery type / Metaphor / Personification / N/A), (b) Sense appealed to (if imagery).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_009', difficulty: 'standard',
          question: 'Irony and paradox in \'The Wild Swans at Coole\' — where opposite things are both.',
          hint: 'If stuck, review how to annotate for "tension" or "contrast" in a poem (see.',
          misconception: 'Students often confuse the *poet\'s sadness* with the *irony itself*, writing "The irony is that the poet is sad seeing.',
          parts: [
                { id: 'a', prompt: 'What is the primary irony in "The Wild Swans at Coole"?', answer: 'The primary irony is the contrast between the swans\' apparent timelessness',
                  options: ['The primary irony is the contrast between the swans\' apparent timelessness', 'the swans are beautiful but the poet is sad', 'The irony is that the poet is sad seeing the swans', 'unwearied'],
                  hint: 'If stuck, review how to annotate for "tension" or "contrast" in a poem (see c12_eng_k_cbse_11_008.',
                  misconception: 'Students often confuse the *poet\'s sadness* with the *irony itself*, writing "The irony is that the poet is sad seeing the swans." The.' }
          ],
            remediations: { 'students-often-confuse-the-poet': { steps: ['Re-read the poem focusing only on time markers (autumn, nineteenth, twilight, old, still, awake some day).', 'Make a two-column table: "Swans described as..." vs.', '"Poet described as..." — fill with exact phrases.', 'Identify three symbols (water, swans, autumn) and write one sentence for each: "This symbol represents X because the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_010', difficulty: 'standard',
          question: 'Key vocabulary of \'The Wild Swans at Coole\' — the words and phrases you must.',
          hint: 'If the student cannot connect a word to an image or theme, return to node.',
          misconception: 'Students believe "vocabulary in context" means writing the dictionary definition of a difficult word found in the text.',
          parts: [
                { id: 'a', prompt: 'What is the dictionary meaning of the word "clamorous" as used in the line "And scatter wheeling in great broken rings / Upon their clamorous wings"?', answer: 'The dictionary meaning of "clamorous" is "making a loud and confused noise',
                  options: ['The dictionary meaning of "clamorous" is "making a loud and confused noise', 'clamorous', 'making a loud and confused noise', 'beautiful'],
                  hint: 'If the student cannot connect a word to an image or theme, return to node c12_eng_k_cbse_11_008.',
                  misconception: 'Students believe "vocabulary in context" means writing the dictionary definition of a difficult word found in the text.' }
          ],
            remediations: { 'vocabulary-in-context-means-writing': { steps: ['Have the student list 5 words they found difficult in the poem.', 'For each word, create a two-column table: Column A = dictionary definition; Column B = "What the word does in this.', 'Ask the student to read the two columns aloud and explain the difference in their own words.', 'Re-administer Diagnostic Question 2 (the "still" polysemy question) as a re-diagnostic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_011', difficulty: 'standard',
          question: 'Language and style in \'The Wild Swans at Coole\' — how the writer chose words.',
          hint: 'Review c6_english_u2_018 (Tenses -- Present and Past) and c11_eng_h_cbse_01_011 (Grammar.',
          misconception: 'Students frequently treat poetic grammar as "incorrect" or "broken" English — e.g., marking "The trees are in their.',
          parts: [
                { id: 'a', prompt: 'Identify the rhyme scheme of the first stanza of "The Wild Swans at Coole" as represented in the NCERT text (A, B, C, B, D, E) and state the grammatical.', answer: 'The rhyme scheme is ABCBDE (beauty/A, dry/B, water/C, sky/B, stones/D, swans/E)',
                  options: ['The rhyme scheme is ABCBDE (beauty/A, dry/B, water/C, sky/B, stones/D, swans/E)', 'incorrect', 'broken', 'The trees are in their autumn beauty'],
                  hint: 'Review c6_english_u2_018 (Tenses -- Present and Past) and c11_eng_h_cbse_01_011 (Grammar: Language.',
                  misconception: 'Students frequently treat poetic grammar as "incorrect" or "broken" English — e.g., marking "The trees are in their autumn beauty" as.' }
          ],
            remediations: { 'students-frequently-treat-poetic-grammar': { steps: ['If a student cannot distinguish deliberate poetic inversion from syntactic error, do this 3-step remediation: (1) Give.', '(2) Have them identify the tense of every verb in stanza 2 and plot them on a timeline: which show duration?', 'which show a single completed event?', 'which show a general truth?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_012', difficulty: 'standard',
          question: 'Literal comprehension of \'The Wild Swans at Coole\' — questions answered.',
          hint: 'If stuck, review c12_eng_k_cbse_11_010 (Vocabulary) for word meanings and.',
          misconception: 'Students believe inferential questions invite "any interpretation" and that personal feelings (e.g., "I feel the swans.',
          parts: [
                { id: 'a', prompt: 'In the poem, the line "The nineteenth autumn has come upon me / Since I first made my count" appears.', answer: 'This is a literal statement',
                  options: ['This is a literal statement', 'inferential', 'any interpretation', 'I feel the swans are sad'],
                  hint: 'If stuck, review c12_eng_k_cbse_11_010 (Vocabulary) for word meanings and c12_eng_k_cbse_11_002.',
                  misconception: 'Students believe inferential questions invite "any interpretation" and that personal feelings (e.g., "I feel the swans are sad") are valid.' },
                { id: 'b', prompt: 'Compare the two questions: (A) "What time of day is described in the first stanza?" (B) "Why does the poet contrast the \'still sky\' with the \'clamorous wings\'.', answer: '(A) is literal: the text says "Under the October twilight"',
                  options: ['(A) is literal: the text says "Under the October twilight"', 'any interpretation', 'I feel the swans are sad', 'inference'],
                  hint: 'If stuck, review c12_eng_k_cbse_11_010 (Vocabulary) for word meanings and c12_eng_k_cbse_11_002.',
                  misconception: 'Students believe inferential questions invite "any interpretation" and that personal feelings (e.g., "I feel the swans are sad") are valid.' }
          ],
            remediations: { 'inferential-questions-invite-any-interpretation': { steps: ['If a student cannot distinguish literal from inferential, give them three questions from the NCERT "Understanding the.', 'Ask them to highlight the exact words in the poem that answer each.', 'connect to poet\'s life?"), they will find no single line — that\'s inferential.', 'For "How many swans?" they find "nine-and-fifty" — that\'s literal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
