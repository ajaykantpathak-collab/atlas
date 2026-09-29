import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch11_p2: SimDef = {
    id: 'v3_c11_eng_w_ch11_p2',
    title: 'Coming (Poem) · Part 2/3',
    subtitle: 'Hear a thrush interrupt a suburb — and a poet who refuses to worship it.',
    classLevel: 11, subject: 'eng_w', topic: 'Coming (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch11'],
    nodeIds: ['c11_eng_w_cbse_11_007', 'c11_eng_w_cbse_11_008', 'c11_eng_w_cbse_11_009', 'c11_eng_w_cbse_11_010', 'c11_eng_w_cbse_11_011', 'c11_eng_w_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener catching spring arrive over brickwork', intro: 'A bare garden, an evening, one bird — and a grown man suddenly feeling like a child who walked in on something unexplained.', goal: 'Situate Larkin in The Movement and read the poem\'s shift from observation to inner recognition.' },
    discovery: {
        question: '\'Coming\' describes a thrush singing in a garden — so Larkin is a nature poet like Wordsworth, right?',
        options: ['No — Movement poets rejected Romantic nature-worship; the thrush merely \'astonishes the brickwork\' of an ordinary suburb', 'Yes — any poem about a bird is Romantic', 'Yes — the garden makes it a nature poem by definition', 'No — Larkin only ever wrote about libraries'],
        answer: 'No — Movement poets rejected Romantic nature-worship; the thrush merely \'astonishes the brickwork\' of an ordinary suburb',
        hook: 'Even the song is \'fresh-peeled\' — a kitchen verb, raw and domestic, not \'melodious\'; Larkin refuses the poetic word on purpose.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Coming\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_11_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the poem from houses at dusk to the thrush to a childhood memory, and explain the final simile of a child stumbling on \'adult reconciling.\'',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Coming\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'List two secondary themes present in Philip Larkin\'s poem "Coming" apart from the primary theme of spring\'s arrival.', options: [
                { text: 'Correct answer: (1) The contrast between childhood innocence and adult experience (the', outcome: 'Correct answer: (1) The contrast between childhood innocence and adult experience (the extended.' },
                { text: 'imagery', outcome: 'Not quite — Students frequently conflate the *subject* of the simile (childhood/adulthood) with the *theme*.', reveals: 'students-frequently-conflate-the-subject' },
                { text: 'metaphor', outcome: 'Not quite — Students frequently conflate the *subject* of the simile (childhood/adulthood) with the *theme*.', reveals: 'students-frequently-conflate-the-subject' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Coming\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from everyday language (not from the poem).', options: [
                { text: 'Imagery: Language that appeals to the senses, e.g., "The air smelled of wet earth and', outcome: 'Imagery: Language that appeals to the senses, e.g., "The air smelled of wet earth and jasmine.".' },
                { text: 'The air smelled of wet earth and jasmine', outcome: 'Not quite — Students often treat "fresh-peeled voice" as mere description of a bird\'s song rather than.', reveals: 'students-often-treat-fresh-peeled' },
                { text: 'like/as', outcome: 'Not quite — Students often treat "fresh-peeled voice" as mere description of a bird\'s song rather than.', reveals: 'students-often-treat-fresh-peeled' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Coming\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define irony and symbolism as literary devices in poetry. Give one generic example of each (not from "Coming").', options: [
                { text: '**Correct Answer:** Irony is a contrast between expectation and reality, or between what', outcome: '**Correct Answer:** Irony is a contrast between expectation and reality, or between what is said.' },
                { text: 'sarcasm', outcome: 'Not quite — Students often believe that because Philip Larkin is known for pessimism, *every* poem of his must.', reveals: 'because-philip-larkin-is-known' },
                { text: 'funny coincidence', outcome: 'Not quite — Students often believe that because Philip Larkin is known for pessimism, *every* poem of his must.', reveals: 'because-philip-larkin-is-known' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Coming\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define the term "connotation" as it applies to literary vocabulary analysis, and give one example from the poem "Coming" where a word\'s.', options: [
                { text: 'Connotation is the set of associated ideas, emotions, or cultural implications a word', outcome: 'Connotation is the set of associated ideas, emotions, or cultural implications a word carries.' },
                { text: 'foreheads just means the front of the house', outcome: 'Not quite — Students believe "vocabulary in context" means "guessing the dictionary definition from surrounding.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means "guessing the dictionary definition from surrounding.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Coming\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the grammatical form of "fresh-peeled" in the phrase "fresh-peeled voice" and state its function in the noun phrase.', options: [
                { text: '"Fresh-peeled" is a compound adjective (participial adjective) functioning as a', outcome: '"Fresh-peeled" is a compound adjective (participial adjective) functioning as a pre-modifier of the.' },
                { text: 'Fresh-peeled', outcome: 'Not quite — Students treat grammatical analysis as "labeling parts of speech" rather than explaining *why*.', reveals: 'students-treat-grammatical-analysis-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Coming\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question in poetry analysis?', options: [
                { text: 'A literal question asks for information explicitly stated in the poem (e.g., "What bird', outcome: 'A literal question asks for information explicitly stated in the poem (e.g., "What bird sings.' },
                { text: 'questions about the poem', outcome: 'Not quite — Students believe inferential questions allow "any personal opinion" because the answer isn\'t in the.', reveals: 'inferential-questions-allow-any-personal' },
                { text: 'any personal opinion', outcome: 'Not quite — Students believe inferential questions allow "any personal opinion" because the answer isn\'t in the.', reveals: 'inferential-questions-allow-any-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a poetry evening a senior performs Larkin\'s \'Coming\' and introduces it as \'a nature poem in the tradition of Wordsworth — spring arrives and the poet\'s soul is uplifted.\' You\'re asked to respond, and you know Larkin led The Movement, which rejected exactly that kind of romantic uplift.',
            decisions: [{ prompt: 'How should you frame what the poem is actually doing?', options: [
                { text: 'Correct the intro using context as a lens: Larkin and The Movement rejected romantic nature worship for clear, empirical verse about ordinary life. The thrush\'s song doesn\'t uplift — it \'astonishes the brickwork\', a small epiphany that triggers a private memory of \'adult reconciling\' and an unexplained happiness, not transcendence.', outcome: 'Context stops being trivia: knowing The Movement\'s anti-romantic stance is what lets you hear the poem\'s restrained, disenchanted register.' },
                { text: 'Let the intro stand — a bird announcing spring is a nature poem, and nature poems uplift the soul.', outcome: 'That\'s the exact reading Movement poetry was written against; it misses that nature here is a neutral backdrop for human psychology, not a spiritual force.', reveals: 'coming-is-romantic-nature-poem' },
                { text: 'Focus on Larkin\'s biography instead — the poem is really about his childhood in Coventry.', outcome: 'Biography is a lens, not the content: the poem uses a childhood memory but its point is the structural movement from boredom to sudden, inexplicable joy.', reveals: 'context-means-biography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'The bird announces spring; the speaker feels like a child who can\'t name the happiness — incomprehension is the point.',
            decisions: [{ prompt: 'What comes next? Coming (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Coming (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_007', difficulty: 'standard',
          question: 'Secondary themes in \'Coming\' — the supporting ideas and motifs that deepen the.',
          hint: 'Revisit the primary theme node (c11_eng_w_cbse_11_006) and the plot/structure node.',
          misconception: 'Students frequently conflate the *subject* of the simile (childhood/adulthood) with the *theme*, writing "The theme.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'Coming\'',
                  options: ['Secondary themes in \'Coming\'', '\'Coming\' (Woven Words, ch', 'The plot/narrative arc of \'Coming\'', 'The setting of \'Coming\''],
                  hint: 'Revisit the primary theme node (c11_eng_w_cbse_11_006) and the plot/structure node.',
                  misconception: 'Students frequently conflate the *subject* of the simile (childhood/adulthood) with the *theme*, writing "The theme is childhood" instead.' }
          ],
            remediations: { 'students-frequently-conflate-the-subject': { steps: ['Have the student draw a two-column table: Column A = "What the thrush *does*" (sings, announces spring, survives.', 'Ask: "Which column belongs to nature?', 'Which to human meaning-making?" 3.', 'Guide them to see the poem\'s tension lives in the arrows *from* Column A *to* Column B.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently conflate the *subject* of the simile (childhood/adulthood) with the *theme*, writing "The theme.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The poem\'s emotional power comes entirely from the primary theme of spring\'s arrival; the secondary themes are decorative." Defend your.', answer: 'Correct answer: The claim is false',
                  options: ['Correct answer: The claim is false', 'beautiful language'],
                  hint: 'Revisit the primary theme node (c11_eng_w_cbse_11_006) and the plot/structure node.',
                  misconception: 'Students frequently conflate the *subject* of the simile (childhood/adulthood) with the *theme*, writing "The theme is childhood" instead.' }
          ],
            remediations: { 'students-frequently-conflate-the-subject': { steps: ['Have the student draw a two-column table: Column A = "What the thrush *does*" (sings, announces spring, survives.', 'Ask: "Which column belongs to nature?', 'Which to human meaning-making?" 3.', 'Guide them to see the poem\'s tension lives in the arrows *from* Column A *to* Column B.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_008', difficulty: 'standard',
          question: 'Imagery in \'Coming\' — the vivid, sensory language that creates word-pictures.',
          hint: 'Review the tenor/vehicle/ground framework using c6_english_u1_005 examples, then apply.',
          misconception: 'Students often treat "fresh-peeled voice" as mere description of a bird\'s song rather than a metaphor that *creates*.',
          parts: [
                { id: 'a', prompt: 'The phrase "fresh-peeled voice" is a metaphor. Identify the tenor (target) and vehicle (source), then explain what quality of the thrush\'s song the metaphor.', answer: 'Tenor: the thrush\'s voice/song',
                  options: ['Tenor: the thrush\'s voice/song', 'sweetness', 'swaps tenor/vehicle or cites "sweetness" alone shows superficial reading'],
                  hint: 'Review the tenor/vehicle/ground framework using c6_english_u1_005 examples, then apply.',
                  misconception: 'Students often treat "fresh-peeled voice" as mere description of a bird\'s song rather than a metaphor that *creates* meaning.' }
          ],
            remediations: { 'students-often-treat-fresh-peeled': { steps: ['Return to the line "Its fresh-peeled voice / Astonishing the brickwork." 2.', 'Ask: "What does a peeled fruit look/feel/smell like?', 'Now apply each quality to a *sound*." 3.', 'Have the student say aloud: "The voice is wet, bright, exposed, without skin." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Coming\' — where opposite things are both true, or meaning.',
          hint: 'If stuck, return to c11_eng_w_cbse_11_008 and practice converting three metaphors from.',
          misconception: 'Students often believe that because Philip Larkin is known for pessimism, *every* poem of his must end.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'Coming\'',
                  options: ['Irony and paradox in \'Coming\'', '\'Coming\' (Woven Words, ch', 'The plot/narrative arc of \'Coming\'', 'The setting of \'Coming\''],
                  hint: 'If stuck, return to c11_eng_w_cbse_11_008 and practice converting three metaphors from "Coming".',
                  misconception: 'Students often believe that because Philip Larkin is known for pessimism, *every* poem of his must end in disappointment.' }
          ],
            remediations: { 'because-philip-larkin-is-known': { steps: ['If a student insists the poem is "really sad," guide them through a three-step correction: (1) Locate the exact line.', '(2) Ask: "Does the poem say he *stops* being happy?', 'Or that the happiness is an illusion?" (3) Re-read the simile: "Feel like a child / Who comes on a scene / Of adult.', 'Have them write one sentence explaining why "unusual laughter" is a *good* thing to not understand.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Coming\' — the words and phrases you must know to read the.',
          hint: 'If stuck, review the "Imagery and Metaphor" node (c11_eng_w_cbse_11_008) specifically the.',
          misconception: 'Students believe "vocabulary in context" means "guessing the dictionary definition from surrounding words." They treat.',
          parts: [
                { id: 'a', prompt: 'Apply the "Context Clue Strategy" to determine the meaning of "reconciling" in the phrase "adult reconciling" (Stanza 2).', answer: 'Locate the phrase: "scene / Of adult reconciling."',
                  options: ['Locate the phrase: "scene / Of adult reconciling."', 'reconciling means agreeing', 'forgotten boredom', 'vocabulary in context'],
                  hint: 'If stuck, review the "Imagery and Metaphor" node (c11_eng_w_cbse_11_008) specifically the section.',
                  misconception: 'Students believe "vocabulary in context" means "guessing the dictionary definition from surrounding words." They treat the poem as a puzzle.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['**Stop the "Synonym Swap" habit:** Give the student three words from the poem ("serene," "fresh-peeled," "reconciling").', 'For each, ask: "Write the dictionary definition.', 'Now write what the word *does* in this line that the dictionary definition cannot do." Force them to articulate the.', '**Sensory Mapping:** Have them draw the "fresh-peeled voice" – not the bird, but the *act of peeling* and the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_011', difficulty: 'standard',
          question: 'Language and style in \'Coming\' — how the writer chose words, sentences and tone.',
          hint: 'Review Class 6 Grammar: Adjectives and Adverbs (c6_english_u3_028) for word classes, and.',
          misconception: 'Students treat grammatical analysis as "labeling parts of speech" rather than explaining *why* a poet chooses.',
          parts: [
                { id: 'a', prompt: 'Identify the grammatical form of "fresh-peeled" in the phrase "fresh-peeled voice" and state its function in the noun phrase.', answer: '"Fresh-peeled" is a compound adjective (participial adjective) functioning as a',
                  options: ['"Fresh-peeled" is a compound adjective (participial adjective) functioning as a', 'Fresh-peeled'],
                  hint: 'Review Class 6 Grammar: Adjectives and Adverbs (c6_english_u3_028) for word classes, and Class 6.',
                  misconception: 'Students treat grammatical analysis as "labeling parts of speech" rather than explaining *why* a poet chooses a specific structure.' }
          ],
            remediations: { 'students-treat-grammatical-analysis-as': { steps: ['If a student cannot move beyond labeling, give them this 3-step remediation: (1) Take one line ("Light, chill and.', '(2) Read both aloud and note the difference in rhythm, focus, and mental image.', '(3) Write one sentence explaining *what the grammar does* (e.g., "Putting adjectives after \'Light\' makes us see the.', 'Repeat with "Astonishing the brickwork" vs "It astonishes the brickwork."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Coming\' — questions answered straight from the text.',
          hint: 'If stuck, review c11_eng_w_cbse_11_008 (Literary Devices: Imagery and Metaphor) and.',
          misconception: 'Students believe inferential questions allow "any personal opinion" because the answer isn\'t in the text.',
          parts: [
                { id: 'a', prompt: 'In the poem "Coming," the line "Light, chill and yellow, / Bathes the serene / Foreheads of houses" appears.', answer: 'This is an inferential statement',
                  options: ['This is an inferential statement', 'any personal opinion', 'present assumptions as facts in board exams', 'inferential questions allow "any personal opinion"'],
                  hint: 'If stuck, review c11_eng_w_cbse_11_008 (Literary Devices: Imagery and Metaphor) and practice.',
                  misconception: 'Students believe inferential questions allow "any personal opinion" because the answer isn\'t in the text.' },
                { id: 'b', prompt: 'Analyze the relationship between the two scenes in the poem: the thrush in the garden (stanza 1) and the child witnessing "adult reconciling" (stanza 2).', answer: 'The literal scene',
                  options: ['The literal scene', 'any personal opinion', 'inferential questions allow "any personal opinion"'],
                  hint: 'If stuck, review c11_eng_w_cbse_11_008 (Literary Devices: Imagery and Metaphor) and practice.',
                  misconception: 'Students believe inferential questions allow "any personal opinion" because the answer isn\'t in the text.' }
          ],
            remediations: { 'inferential-questions-allow-any-personal': { steps: ['If a student cannot distinguish literal from inferential, do this 3-step remediation: (1) Give them three questions.', '(2) For the inferential one, require them to write the literal evidence first (quote lines), then write "This.', '(3) Practice with a new short poem (e.g., a haiku from the textbook) using the same scaffold.', 'Do not move to critical thinking until they consistently produce evidence-inference pairs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
