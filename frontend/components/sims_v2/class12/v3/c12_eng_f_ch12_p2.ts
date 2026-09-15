import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch12_p2: SimDef = {
    id: 'v3_c12_eng_f_ch12_p2',
    title: 'A Thing of Beauty (Poem) · Part 2/3',
    subtitle: 'Written by a dying man — beauty as a lifeline, not a luxury',
    classLevel: 12, subject: 'eng_f', topic: 'A Thing of Beauty (Poem) · Part 2/3',
    chapters: ['c12_eng_f_ch12'],
    nodeIds: ['c12_eng_f_cbse_12_007', 'c12_eng_f_cbse_12_008', 'c12_eng_f_cbse_12_009', 'c12_eng_f_cbse_12_010', 'c12_eng_f_cbse_12_011', 'c12_eng_f_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Romantic poetry scholar', intro: 'A shepherd dreams of the moon and wanders the earth for her. Keats turned that myth into a survival manual.', goal: 'Read A Thing of Beauty through its Romantic frame: the Endymion myth, nature as healing force, and beauty as answer to suffering.' },
    discovery: {
        question: 'A student reads Keats and shrugs: \'beauty makes us happy — it\'s a poem about pretty things.\' Written by a dying 25-year-old, what did they skip?',
        options: ['The suffering the beauty is fighting — despondence, gloomy days, dearth of noble natures; beauty doesn\'t erase the pall, it lifts it so we endure', 'Nothing — pretty things, happy poem', 'Keats hated nature', 'It\'s a love poem to a real woman'],
        answer: 'The suffering the beauty is fighting — despondence, gloomy days, dearth of noble natures; beauty doesn\'t erase the pall, it lifts it so we endure',
        hook: 'For the Romantics beauty isn\'t decoration — it\'s survival equipment. Keats, a surgeon who abandoned medicine and was dying of TB, builds his case on Endymion\'s endless quest: a thing of beauty is \'an endless fountain of immortal drink\' precisely because life is short and dark.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, supporting ideas in a literary work that complement and enrich the primary theme, often revealing nuanced perspectives on social, psychological, or philosophical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_12_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Argue beauty\'s case like a Romantic: decode the Endymion myth as the engine, weigh the \'flowery band\' that binds us to earth despite everything, and test whether a gulmohar at noon can do what Keats claims.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re driving past a roadside stall selling wild berries and squash — you\'re in a hurry, the paint on their sign is crooked, and you barely glance.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme in terms of textual prominence and.', options: [
                { text: 'A secondary theme is a supporting idea that runs parallel to the primary theme, developed', outcome: 'A secondary theme is a supporting idea that runs parallel to the primary theme, developed through.' },
                { text: 'minor topics', outcome: 'Not quite — Students consistently confuse **secondary themes** with **literary devices** — e.g., listing.', reveals: 'students-consistently-confuse-secondary-themes' },
                { text: 'subplots', outcome: 'Not quite — Students consistently confuse **secondary themes** with **literary devices** — e.g., listing.', reveals: 'students-consistently-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are standing at a highway dhaba on the outskirts of your city: you see the dusty shelves with packaged snacks, hear the roar of SUVs speeding past.',
            decisions: [{ prompt: 'What is the difference between imagery and metaphor in poetry? Give a one-sentence definition for each.', options: [
                { text: 'Imagery is language that appeals to the five senses to create a sensory experience', outcome: 'Imagery is language that appeals to the five senses to create a sensory experience; metaphor is.' },
                { text: 'like/as', outcome: 'Not quite — Students often think "imagery" only means visual description (pictures in the mind) and miss.', reveals: 'imagery-only-means-visual-description' },
                { text: 'imagery', outcome: 'Not quite — Students often think "imagery" only means visual description (pictures in the mind) and miss.', reveals: 'imagery-only-means-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the poem and stumble on the phrase "greedy good-doers, beneficent beasts of prey." You know the individual words, but together they.',
            decisions: [{ prompt: 'Define "vocabulary in context" as a literary analysis skill. How does it differ from looking up a word in a dictionary?', options: [
                { text: 'Vocabulary in context is the practice of determining a word\'s meaning, tone, and function', outcome: 'Vocabulary in context is the practice of determining a word\'s meaning, tone, and function based.' },
                { text: 'crossly', outcome: 'Not quite — Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write.', reveals: 'students-treat-vocabulary-in-context' },
                { text: 'word meaning is static and ignores authorial craft', outcome: 'Not quite — Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading a social media post where someone writes, "Never have I seen such beauty" instead of "I have never seen such beauty." The inverted.',
            decisions: [{ prompt: 'Identify the part of speech and grammatical function of "pled" in the line "A roadside stand that too pathetically pled."', options: [
                { text: '"Pled" is the past tense verb (past participle also possible) functioning as the main', outcome: '"Pled" is the past tense verb (past participle also possible) functioning as the main verb of the.' },
                { text: 'pathetically', outcome: 'Not quite — Students often treat poetic syntax as "wrong grammar" and try to "correct" it to standard prose.', reveals: 'students-often-treat-poetic-syntax' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend, worn down by exams and bad news, dismisses your suggestion to sit in the park or watch the sunset: \'pretty things don\'t fix real problems\'.',
            decisions: [{ prompt: 'What would Keats answer?', options: [
                { text: 'Beauty is a resource, not a remedy — \'a joy forever\' doesn\'t solve the problem but it loosens despair\'s \'pall\' and keeps the spirit capable of facing it.', outcome: 'Keats, writing through grief, argued beauty is how humans endure suffering — survival equipment, not decoration.' },
                { text: 'He\'s right — sunsets are escapism, and only solutions matter.', outcome: 'The poem\'s claim is precisely that despair itself is the deeper problem; beauty restores the will that solving requires.', reveals: 'beauty-is-escapism' },
                { text: 'Sort of — but only if the sunset actually removes the problem.', outcome: 'That demands of beauty a job it never claimed; its power is renewing the sufferer, not deleting the suffering.', reveals: 'beauty-must-solve' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend beauty as necessity, not luxury — and read the mythology as argument, not ornament. This poem is where imagery becomes philosophy.',
            decisions: [{ prompt: 'What comes next? A Thing of Beauty (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Thing of Beauty (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, supporting ideas in a literary work that.',
          hint: 'If stuck, return to node 006 and re-do the "thesis statement" exercise — then ask: "What.',
          misconception: 'Students consistently confuse **secondary themes** with **literary devices** — e.g., listing "irony," "imagery,".',
          parts: [
                { id: 'a', prompt: 'Compare the secondary theme of *false urban promises* ("the life of the moving-pictures\' promise / That the party in power is said to be keeping from us") with.', answer: 'The interaction creates a pincer movement: false promises *raise* expectations',
                  options: ['The interaction creates a pincer movement: false promises *raise* expectations', 'imagery', 'personification'],
                  hint: 'If stuck, return to node 006 and re-do the "thesis statement" exercise — then ask: "What *other*.',
                  misconception: 'Students consistently confuse **secondary themes** with **literary devices** — e.g., listing "irony," "imagery," or "personification".' }
          ],
            remediations: { 'students-consistently-confuse-secondary-themes': { steps: ['Have the student re-read only Stanzas 3 and 6 aloud, marking every verb associated with the "greedy good-doers" (bought.', 'Ask: "What is the *direction* of these actions?', 'Guide them to formulate: "The poem argues that welfare ______." 4.', 'Repeat for the poet\'s verbs in Stanza 7 (feel, bear, owning, wonder, like, offer).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse **secondary themes** with **literary devices** — e.g., listing "irony," "imagery,".',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The secondary theme of \'loss of traditional rhythm\' (destroy their sleeping at night the ancient way) is the most politically radical.', answer: 'The claim is **defensible and textually grounded**',
                  options: ['The claim is **defensible and textually grounded**', 'imagery', 'personification'],
                  hint: 'If stuck, return to node 006 and re-do the "thesis statement" exercise — then ask: "What *other*.',
                  misconception: 'Students consistently confuse **secondary themes** with **literary devices** — e.g., listing "irony," "imagery," or "personification".' }
          ],
            remediations: { 'students-consistently-confuse-secondary-themes': { steps: ['Have the student re-read only Stanzas 3 and 6 aloud, marking every verb associated with the "greedy good-doers" (bought.', 'Ask: "What is the *direction* of these actions?', 'Guide them to formulate: "The poem argues that welfare ______." 4.', 'Repeat for the poet\'s verbs in Stanza 7 (feel, bear, owning, wonder, like, offer).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, return to c7_engl_ch01_008 and practice the "sense hunt" exercise on a simpler.',
          misconception: 'Students often think "imagery" only means visual description (pictures in the mind) and miss auditory, tactile.',
          parts: [
                { id: 'a', prompt: 'Find one metaphor in the poem that describes the government/social agencies.', answer: '"greedy good-doers, beneficent beasts of prey"',
                  options: ['"greedy good-doers, beneficent beasts of prey"', 'flower of cities', 'imagery'],
                  hint: 'If stuck, return to c7_engl_ch01_008 and practice the "sense hunt" exercise on a simpler nature.',
                  misconception: 'Students often think "imagery" only means visual description (pictures in the mind) and miss auditory, tactile, olfactory, and kinesthetic.' }
          ],
            remediations: { 'imagery-only-means-visual-description': { steps: ['Revisit c6_english_u1_005 (Poetic Devices: Rhyme Scheme, Metaphor, Imagery) and c7_engl_ch01_008 (Literary Devices.', 'Do a "sense hunt": take any stanza of the poem and label every sensory word with S (sight), H (sound), T (touch),.', 'For metaphor, use the "X is Y" test: rewrite each suspected metaphor as "X is Y" and see if it makes sense without.', 'Re-attempt Diagnostic Questions 2 and 3 after this exercise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_009', difficulty: 'standard',
          question: 'Irony in poetry is a contrast between expectation and reality — where the.',
          hint: 'Review the metaphor identification exercise in c12_eng_f_cbse_12_008, focusing on "flower.',
          misconception: 'Students often confuse irony with mere coincidence or bad luck.',
          parts: [
                { id: 'a', prompt: 'Identify one symbol in the poem (other than the roadside stand itself) and explain what abstract idea it represents.', answer: 'The "childish longing" waiting "near the open window" for "the squeal of brakes"',
                  options: ['The "childish longing" waiting "near the open window" for "the squeal of brakes"', 'wild berries', 'picks a concrete object (e'],
                  hint: 'Review the metaphor identification exercise in c12_eng_f_cbse_12_008, focusing on "flower.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['Re-read the poem aloud, pausing at every line that feels like a "twist." Ask: "What is expected here?', 'Who benefits from the gap?" 2.', 'List all concrete nouns in the poem (shed, signs, berries, window, car, gas, window, pain).', 'For each, ask: "Does this object appear again?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, review the "4-column vocabulary table" method from Class 11 Hornbill Chapter 1.',
          misconception: 'Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write dictionary-style.',
          parts: [
                { id: 'a', prompt: 'In the line "The polished traffic passed with a mind ahead," what does "polished" suggest about the city dwellers in this context?', answer: 'sophisticated/urbane but indifferent, (',
                  options: ['sophisticated/urbane but indifferent, (', 'crossly'],
                  hint: 'If stuck, review the "4-column vocabulary table" method from Class 11 Hornbill Chapter 1.',
                  misconception: 'Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write dictionary-style definitions in exams.' },
                { id: 'b', prompt: 'Analyze the word "childish" in "childish longing in vain" (stanza 4). Does it belittle the rural poor or evoke sympathy?', answer: 'It evokes profound sympathy, not belittlement',
                  options: ['It evokes profound sympathy, not belittlement', 'it shows they are naive', 'the trusting sorrow of what is unsaid', 'the party in power is said to be keeping from us'],
                  hint: 'If stuck, review the "4-column vocabulary table" method from Class 11 Hornbill Chapter 1.',
                  misconception: 'Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write dictionary-style definitions in exams.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Re-read the poem aloud, circling every word that feels "heavy" or surprising (e.g., "artless," "beneficent,".', 'For each, write: "Literal meaning: ___ | Context clue: ___ | Connotation here: ___ | Thematic link: ___" in a 4-column.', 'Practice CBSE-style 3-marker: "Explain the significance of the phrase \'greedy good-doers\' in the poem." Use the PEEL.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the study of how syntactic.',
          hint: 'If stuck, review "Sentence Structure and Types of Sentences" (c6_english_u4_038) and.',
          misconception: 'Students often treat poetic syntax as "wrong grammar" and try to "correct" it to standard prose, losing the emotional.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet uses inversion in "At having the landscape marred with the artless paint / Of signs that with N turned wrong and.', answer: 'The inversion ("signs that with N turned wrong and S turned wrong") places the',
                  options: ['The inversion ("signs that with N turned wrong and S turned wrong") places the', 'artless paint'],
                  hint: 'If stuck, review "Sentence Structure and Types of Sentences" (c6_english_u4_038) and practice.',
                  misconception: 'Students often treat poetic syntax as "wrong grammar" and try to "correct" it to standard prose, losing the emotional force.' }
          ],
            remediations: { 'students-often-treat-poetic-syntax': { steps: ['Review the difference between prescriptive grammar (rules for standard writing) and descriptive grammar (how language.', 'Re-read c12_eng_f_cbse_12_008 (Imagery and Metaphor) to see how syntax serves imagery.', 'Practice: Take three inverted lines from the poem, rewrite them in standard order, then write a one-sentence.', 'Check understanding by explaining the effect of the parenthetical "(this crossly)" to a peer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_012', difficulty: 'standard',
          question: 'Literal comprehension involves retrieving information directly stated in the.',
          hint: 'If stuck, review c11_eng_h_cbse_01_012 (literal vs inferential in prose) and practice.',
          misconception: 'Students often treat inferential questions as "guessing the author\'s mind" and write subjective opinions like "I think.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Literal comprehension involves retrieving information directly stated in the poem (who,',
                  options: ['Literal comprehension involves retrieving information directly stated in the poem (who,', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'Plot and Narrative Structure in a poem refers to the organization of events, images, and', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_012 (literal vs inferential in prose) and practice with a simple.',
                  misconception: 'Students often treat inferential questions as "guessing the author\'s mind" and write subjective opinions like "I think the poet feels sad".' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['If a student cannot separate literal from inferential, take these steps: 1) Give them a 4-line excerpt from the poem.', '2) Ask them to underline every fact directly stated (literal).', '3) Ask them to circle every word that suggests something beyond the literal (inferential triggers).', '4) Have them write one literal and one inferential question for that excerpt, then swap with a peer to answer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
