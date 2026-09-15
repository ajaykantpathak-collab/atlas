import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch13_p2: SimDef = {
    id: 'v3_c11_eng_w_ch13_p2',
    title: 'The World is too Much With Us (Poem) · Part 2/3',
    subtitle: 'Read a sonnet\'s turn as the hinge between diagnosis and desperation.',
    classLevel: 11, subject: 'eng_w', topic: 'The World is too Much With Us (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch13'],
    nodeIds: ['c11_eng_w_cbse_13_007', 'c11_eng_w_cbse_13_008', 'c11_eng_w_cbse_13_009', 'c11_eng_w_cbse_13_010', 'c11_eng_w_cbse_13_011', 'c11_eng_w_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Romantic watching a world too busy to see the sea', intro: 'Rush hour on a metro platform, 1802 edition — everyone \'getting and spending,\' nobody feeling the wind.', goal: 'Identify the Petrarchan octave-sestet structure and interpret the pagan wish correctly.' },
    discovery: {
        question: 'Wordsworth cries \'Great God! I\'d rather be / A Pagan suckled in a creed outworn.\' Is he renouncing his faith?',
        options: ['No — it\'s hyperbole against a society that commodifies nature; \'Pagan\' means perceiving divinity in sea and wind, not atheism', 'Yes — he is formally converting to paganism', 'Yes — the sestet rejects all religion equally', 'No — he is only being ironic about mythology'],
        answer: 'No — it\'s hyperbole against a society that commodifies nature; \'Pagan\' means perceiving divinity in sea and wind, not atheism',
        hook: 'He addresses the Christian God while damning the Christian-age marketplace — the creed he\'d swap is \'getting and spending,\' not worship itself.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subsidiary ideas or motifs that support, complicate, or enrich the primary theme of a literary work; in this poem, they include the critique of industrial materialism.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_13_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the sonnet at the volta — octave as diagnosis, sestet as desperate wish — and test whether the turn could land anywhere but line 9.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are scrolling through social media late at night, surrounded by notifications, yet you feel a vague emptiness — that is the modern version.',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "a sordid boon" in line 4, and which two words create the oxymoron?', options: [
                { text: '"A sordid boon" means a base or morally degraded gift', outcome: '"A sordid boon" means a base or morally degraded gift; the oxymoron is formed by "sordid" (ignoble.' },
                { text: 'outworn', outcome: 'Not quite — Students often treat "secondary themes" as a list of unrelated topics (e.g., "the sea", "Greek.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'advanced', outcome: 'Not quite — Students often treat "secondary themes" as a list of unrelated topics (e.g., "the sea", "Greek.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are standing on a crowded metro platform in Delhi during rush hour — everyone staring at phones, rushing, buying, selling — and you suddenly notice.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, giving one example of each from the poem *without quoting full lines* (describe the.', options: [
                { text: 'Imagery: Language appealing to senses (e.g., the visual/tactile image of the sea exposing', outcome: 'Imagery: Language appealing to senses (e.g., the visual/tactile image of the sea exposing its chest.' },
                { text: 'metaphor with a simile (', outcome: 'Not quite — Students often treat imagery as *only* visual description ("pictures in the mind") and miss.', reveals: 'students-often-treat-imagery-as' },
                { text: 'like/as', outcome: 'Not quite — Students often treat imagery as *only* visual description ("pictures in the mind") and miss.', reveals: 'students-often-treat-imagery-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the poem and stumble on the phrase "a sordid boon" – you know \'boon\' usually means a blessing, but \'sordid\' means dirty or selfish.',
            decisions: [{ prompt: 'What is the meaning of the phrase "a sordid boon" in the context of the poem\'s opening lines?', options: [
                { text: 'The phrase "a sordid boon" means a base or selfish gift; the poet suggests that humanity', outcome: 'The phrase "a sordid boon" means a base or selfish gift; the poet suggests that humanity has traded.' },
                { text: 'lay waste our powers', outcome: 'Not quite — Students often think that vocabulary in context means simply replacing the word with a synonym from.', reveals: 'vocabulary-in-context-means-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re reading the poem aloud and stumble over "The World is too much with us; late and soon" - the word order feels unusual, almost backwards.',
            decisions: [{ prompt: 'Identify the grammatical term for the word order in "The World is too much with us; late and soon" where the adverbial phrase "late and.', options: [
                { text: 'The term is **syntactic inversion** (or anastrophe)', outcome: 'The term is **syntactic inversion** (or anastrophe). Standard English word order would place the.' },
                { text: 'fronting', outcome: 'Not quite — Students confuse **grammatical archaism** (outdated forms that follow systematic rules of earlier.', reveals: 'students-confuse-grammatical-archaism-outdated' },
                { text: 'ellipsis', outcome: 'Not quite — Students confuse **grammatical archaism** (outdated forms that follow systematic rules of earlier.', reveals: 'students-confuse-grammatical-archaism-outdated' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in your Class 11 English exam and see a question: "Why does the poet wish to be a Pagan?" Your heart races because the word "Pagan".',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "a sordid boon" in line 4 of the poem?', options: [
                { text: '"A sordid boon" literally means a base, ignoble, or morally degraded gift', outcome: '"A sordid boon" literally means a base, ignoble, or morally degraded gift.' },
                { text: 'a great gift', outcome: 'Not quite — Students believe inferential questions are "opinion questions" with no right answer, so they write.', reveals: 'inferential-questions-are-opinion-questions' },
                { text: 'opinion questions', outcome: 'Not quite — Students believe inferential questions are "opinion questions" with no right answer, so they write.', reveals: 'inferential-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a weekend trip to the hills your friends spend the whole time filming stories, checking prices online, and planning purchases. Someone quotes \'the world is too much with us\' and another friend jokes, \'So Wordsworth wanted everyone to become atheists and worship sea gods?\'',
            decisions: [{ prompt: 'How do you explain what the sonnet is really arguing?', options: [
                { text: 'Explain the sonnet\'s turn: the octave diagnoses \'getting and spending\' — modern life wasting our powers and making us \'out of tune\' with sea and wind. At the volta he\'d \'rather be a Pagan\' — meaning a pre-Christian who saw divinity *in* nature (Proteus, Triton) — because even that beats a world that commodifies nature while claiming to be Christian.', outcome: '\'Pagan\' isn\'t atheism — it\'s Wordsworth\'s shocking contrast between a worldview that sacralises nature and a modernity too busy buying to see it.' },
                { text: 'Agree — Wordsworth rejected religion, so \'Pagan\' means he wanted a godless world.', outcome: 'That\'s the common misreading: \'Pagan\' here means a polytheist who perceives the divine within natural forces — the opposite of irreligion.', reveals: 'pagan-means-atheist' },
                { text: 'Say the poem has no real argument — it\'s just fourteen lines of pretty nature description.', outcome: 'The Petrarchan structure is the argument: octave states the problem, sestet offers the desperate alternative — it\'s an intellectual journey, not scenery.', reveals: 'sonnet-has-no-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'Eight lines to convict \'getting and spending,\' six to imagine a creed that still heard the sea — the hinge is the poem\'s whole argument.',
            decisions: [{ prompt: 'What comes next? The World is too Much With Us (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The World is too Much With Us (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_007', difficulty: 'standard',
          question: 'Secondary themes are the subsidiary ideas or motifs that support, complicate.',
          hint: 'If stuck, review the definition of "theme" vs. "topic" from Class 9/10 (e.g.',
          misconception: 'Students often treat "secondary themes" as a list of unrelated topics (e.g., "the sea", "Greek myths", "the moon").',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the phrase "a sordid boon" in line 4, and which two words create the oxymoron?', answer: '"A sordid boon" means a base or morally degraded gift',
                  options: ['"A sordid boon" means a base or morally degraded gift', 'outworn', 'advanced'],
                  hint: 'If stuck, review the definition of "theme" vs. "topic" from Class 9/10 (e.g., c9_engl_ch1_4) and.',
                  misconception: 'Students often treat "secondary themes" as a list of unrelated topics (e.g., "the sea", "Greek myths", "the moon") instead of recognizing.' },
                { id: 'b', prompt: 'Identify two images from the octave (first eight lines) that personify nature as vulnerable or suppressed, and explain how each supports the secondary theme.', answer: '1) "The Sea that bares her bosom to the moon"',
                  options: ['1) "The Sea that bares her bosom to the moon"', 'outworn', 'advanced'],
                  hint: 'If stuck, review the definition of "theme" vs. "topic" from Class 9/10 (e.g., c9_engl_ch1_4) and.',
                  misconception: 'Students often treat "secondary themes" as a list of unrelated topics (e.g., "the sea", "Greek myths", "the moon") instead of recognizing.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Return to the primary theme (node 13_006) and write it in one sentence.', 'Draw a two-column table: left column = phrases from the poem that *support* the primary theme; right column = phrases.', 'Label each right-column cluster with a noun phrase (e.g., "commodification of the heart", "myth as resistance").', 'Verify that each label can be written as a complete sentence stating a claim about the primary theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review Class 8 "Cherry Tree" poem analysis (c8_engl_ch4_15) for imagery-practice, and.',
          misconception: 'Students often treat imagery as *only* visual description ("pictures in the mind") and miss auditory, tactile.',
          parts: [
                { id: 'a', prompt: 'Explain how the auditory imagery in "The Winds that will be howling at all hours" differs in effect from the visual imagery in "The Sea that bares her bosom.', answer: 'The sea image is visual and maternal',
                  options: ['The sea image is visual and maternal', 'nature descriptions', 'like/as', 'sordid boon'],
                  hint: 'Review Class 8 "Cherry Tree" poem analysis (c8_engl_ch4_15) for imagery-practice, and Class 7 "King.',
                  misconception: 'Students often treat imagery as *only* visual description ("pictures in the mind") and miss auditory, tactile, olfactory, gustatory, and.' },
                { id: 'b', prompt: 'Analyze the relationship between the metaphor "we have given our hearts away, a sordid boon" and the earlier imagery of "getting and spending".', answer: '"Getting and spending" is commercial imagery (transactional verbs)',
                  options: ['"Getting and spending" is commercial imagery (transactional verbs)', 'we sold our feelings for money', 'like/as', 'sordid boon'],
                  hint: 'Review Class 8 "Cherry Tree" poem analysis (c8_engl_ch4_15) for imagery-practice, and Class 7 "King.',
                  misconception: 'Students often treat imagery as *only* visual description ("pictures in the mind") and miss auditory, tactile, olfactory, gustatory, and.' }
          ],
            remediations: { 'students-often-treat-imagery-as': { steps: ['Re-read the poem *only for sound*: circle every word with a noise (howling, blow, horn).', 'Re-read *only for touch*: circle temperature/texture words (bares, bosom, sleeping, suckled, rising).', 'For each metaphor, write the equation: Tenor = Vehicle (e.g., Heart = Currency; Profit = Sordid Boon; Speaker = Pagan.', 'Write one sentence per device: "This [device] makes the reader feel [sensation/emotion], which supports the theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat imagery as *only* visual description ("pictures in the mind") and miss auditory, tactile.',
          parts: [
                { id: 'a', prompt: 'Evaluate which is more effective for the poem\'s critique: the extended metaphor of the "Pagan suckled in a creed outworn" or the classical allusions to Proteus.', answer: 'The "Pagan" metaphor is more effective',
                  options: ['The "Pagan" metaphor is more effective', 'more poetic', 'like/as', 'sordid boon'],
                  hint: 'Review Class 8 "Cherry Tree" poem analysis (c8_engl_ch4_15) for imagery-practice, and Class 7 "King.',
                  misconception: 'Students often treat imagery as *only* visual description ("pictures in the mind") and miss auditory, tactile, olfactory, gustatory, and.' }
          ],
            remediations: { 'students-often-treat-imagery-as': { steps: ['Re-read the poem *only for sound*: circle every word with a noise (howling, blow, horn).', 'Re-read *only for touch*: circle temperature/texture words (bares, bosom, sleeping, suckled, rising).', 'For each metaphor, write the equation: Tenor = Vehicle (e.g., Heart = Currency; Profit = Sordid Boon; Speaker = Pagan.', 'Write one sentence per device: "This [device] makes the reader feel [sensation/emotion], which supports the theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'Review Class 10 irony in "A Letter to God" (c10_engl_cbse_01_007) and symbolism in "Two.',
          misconception: 'Students often confuse irony with mere coincidence or bad luck.',
          parts: [
                { id: 'a', prompt: 'Identify one symbol in the poem (other than Proteus or Triton) and explain what abstract idea it represents. Quote the line(s) supporting your choice.', answer: '"The Sea that bares her bosom to the moon" symbolizes nature\'s vulnerability and',
                  options: ['"The Sea that bares her bosom to the moon" symbolizes nature\'s vulnerability and', 'picks a symbol but cannot link it to the theme of nature vs'],
                  hint: 'Review Class 10 irony in "A Letter to God" (c10_engl_cbse_01_007) and symbolism in "Two Stories.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student cannot distinguish irony from contradiction, give them two sentences: "The fire station burned down".', '"It rained on my wedding day" (coincidence, not irony unless context makes it so).', 'Ask them to explain why the first is ironic (expectation of safety vs.', 'reality) and the second is not necessarily.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the meaning of words.',
          hint: 'If stuck, review the theme node (c11_eng_w_cbse_13_006) and the imagery node.',
          misconception: 'Students often think that vocabulary in context means simply replacing the word with a synonym from a dictionary.',
          parts: [
                { id: 'a', prompt: 'Compare the effect of the word \'forlorn\' in "Have glimpses that would make me less forlorn" with its everyday meaning.', answer: 'Everyday \'forlorn\' means lonely or miserable',
                  options: ['Everyday \'forlorn\' means lonely or miserable', 'out of tune'],
                  hint: 'If stuck, review the theme node (c11_eng_w_cbse_13_006) and the imagery node.',
                  misconception: 'Students often think that vocabulary in context means simply replacing the word with a synonym from a dictionary.' }
          ],
            remediations: { 'vocabulary-in-context-means-simply': { steps: ['If a student falls back on dictionary definitions, guide them through a 3‑step context‑clue routine: (1) Locate the.', '(2) Identify the speaker\'s tone and the dominant imagery in that stanza.', '(3) Ask: "What does this word DO here?', 'Does it create contrast, irony, sound pattern, or thematic resonance?" Then have them rewrite the line with a synonym.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'Review relative clause structure and pronoun-antecedent agreement from Class 10 grammar.',
          misconception: 'Students confuse **grammatical archaism** (outdated forms that follow systematic rules of earlier English) with.',
          parts: [
                { id: 'a', prompt: 'Identify the grammatical term for the word order in "The World is too much with us; late and soon" where the adverbial phrase "late and soon" appears after the.', answer: 'The term is **syntactic inversion** (or anastrophe)',
                  options: ['The term is **syntactic inversion** (or anastrophe)', 'fronting', 'ellipsis'],
                  hint: 'Review relative clause structure and pronoun-antecedent agreement from Class 10 grammar.',
                  misconception: 'Students confuse **grammatical archaism** (outdated forms that follow systematic rules of earlier English) with **poetic license**.' },
                { id: 'b', prompt: 'Analyze the conditional construction in "Great God! I\'d rather be / A Pagan suckled in a creed outworn; / So might I, standing on this pleasant lea, / Have.', answer: 'The construction uses **subjunctive/conditional mood** in a **counterfactual',
                  options: ['The construction uses **subjunctive/conditional mood** in a **counterfactual', 'conditional tense', 'I\'d rather be', 'So might I'],
                  hint: 'Review relative clause structure and pronoun-antecedent agreement from Class 10 grammar.',
                  misconception: 'Students confuse **grammatical archaism** (outdated forms that follow systematic rules of earlier English) with **poetic license**.' }
          ],
            remediations: { 'students-confuse-grammatical-archaism-outdated': { steps: ['If a student makes this error: (1) Show them a 1611 King James Bible verse ("He knows not what he does") to demonstrate.', '(2) Have them compare "It moves us not" (iambic: da-DUM da-DUM da-DUM) vs "It does not move us" (anapestic/iambic mix.', '(3) Give a mini-lesson on Early Modern English negation rules: main verbs could take "not" directly until "do"-support.', '(4) Ask them to find three more examples in the poem where "archaic" grammar follows a consistent historical rule.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, review c11_eng_w_cbse_13_008 (personification/imagery) and.',
          misconception: 'Students believe inferential questions are "opinion questions" with no right answer, so they write vague feelings ("I.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the phrase "a sordid boon" in line 4 of the poem?', answer: '"A sordid boon" literally means a base, ignoble, or morally degraded gift',
                  options: ['"A sordid boon" literally means a base, ignoble, or morally degraded gift', 'a great gift', 'opinion questions', 'I think the poet is sad'],
                  hint: 'If stuck, review c11_eng_w_cbse_13_008 (personification/imagery) and c11_eng_w_cbse_13_009.',
                  misconception: 'Students believe inferential questions are "opinion questions" with no right answer, so they write vague feelings ("I think the poet.' },
                { id: 'b', prompt: 'Explain in your own words what the poet means by "we are out of tune" in line 8, and identify which two entities are discordant.', answer: 'The poet means human beings have lost harmony with the natural world',
                  options: ['The poet means human beings have lost harmony with the natural world', 'out of tune with society', 'out of tune with God', 'opinion questions'],
                  hint: 'If stuck, review c11_eng_w_cbse_13_008 (personification/imagery) and c11_eng_w_cbse_13_009.',
                  misconception: 'Students believe inferential questions are "opinion questions" with no right answer, so they write vague feelings ("I think the poet.' },
                { id: 'c', prompt: 'Compare the organisation of this sonnet (octave + sestet) with Shakespeare\'s typical sonnet structure (three quatrains + couplet).', answer: 'Wordsworth uses the Petrarchan form: octave (lines 1–8) presents the problem',
                  options: ['Wordsworth uses the Petrarchan form: octave (lines 1–8) presents the problem', 'opinion questions', 'I think the poet is sad', 'the poet is sad") instead of evidence-based deductions'],
                  hint: 'If stuck, review c11_eng_w_cbse_13_008 (personification/imagery) and c11_eng_w_cbse_13_009.',
                  misconception: 'Students believe inferential questions are "opinion questions" with no right answer, so they write vague feelings ("I think the poet.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['Give the student a two-column table: Column A = Literal Question (answer explicitly in text), Column B = Inferential.', 'Provide 5 mixed questions; ask them to sort into columns and justify each placement.', 'For each inferential question, model the 4-step chain: Claim → Quote → Device/Context Analysis → Thematic Link.', 'Practice with the textbook\'s two questions (Understanding the Poem Q1 & Q2) until the chain becomes automatic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
