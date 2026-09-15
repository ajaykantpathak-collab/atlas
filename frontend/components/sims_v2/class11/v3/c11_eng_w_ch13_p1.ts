import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch13_p1: SimDef = {
    id: 'v3_c11_eng_w_ch13_p1',
    title: 'The World is too Much With Us (Poem) · Part 1/3',
    subtitle: 'Read a sonnet\'s turn as the hinge between diagnosis and desperation.',
    classLevel: 11, subject: 'eng_w', topic: 'The World is too Much With Us (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch13'],
    nodeIds: ['c11_eng_w_cbse_13_001', 'c11_eng_w_cbse_13_002', 'c11_eng_w_cbse_13_003', 'c11_eng_w_cbse_13_004', 'c11_eng_w_cbse_13_005', 'c11_eng_w_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Romantic watching a world too busy to see the sea', intro: 'Rush hour on a metro platform, 1802 edition — everyone \'getting and spending,\' nobody feeling the wind.', goal: 'Identify the Petrarchan octave-sestet structure and interpret the pagan wish correctly.' },
    discovery: {
        question: 'Wordsworth cries \'Great God! I\'d rather be / A Pagan suckled in a creed outworn.\' Is he renouncing his faith?',
        options: ['No — it\'s hyperbole against a society that commodifies nature; \'Pagan\' means perceiving divinity in sea and wind, not atheism', 'Yes — he is formally converting to paganism', 'Yes — the sestet rejects all religion equally', 'No — he is only being ironic about mythology'],
        answer: 'No — it\'s hyperbole against a society that commodifies nature; \'Pagan\' means perceiving divinity in sea and wind, not atheism',
        hook: 'He addresses the Christian God while damning the Christian-age marketplace — the creed he\'d swap is \'getting and spending,\' not worship itself.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the historical, biographical, and literary framework necessary to interpret William Wordsworth\'s sonnet "The World is too Much With Us," including.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_13_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the sonnet at the volta — octave as diagnosis, sestet as desperate wish — and test whether the turn could land anywhere but line 9.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are standing on a busy Delhi metro platform at rush hour — everyone staring at phones, rushing to work, buying coffee, checking stocks.',
            decisions: [{ prompt: 'Who was William Wordsworth, and what is his significance in English literary history?', options: [
                { text: 'William Wordsworth (1770–1850) was a major English Romantic poet who, with Samuel Taylor', outcome: 'William Wordsworth (1770–1850) was a major English Romantic poet who, with Samuel Taylor Coleridge.' },
                { text: 'in this poem means', outcome: 'Not quite — Students often think "Pagan" in this poem means "atheist" or "non-religious" in the modern sense.', reveals: 'pagan-in-this-poem-means' },
                { text: 'non-religious', outcome: 'Not quite — Students often think "Pagan" in this poem means "atheist" or "non-religious" in the modern sense.', reveals: 'pagan-in-this-poem-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are reading a poem for the first time and feel lost because it doesn\'t tell a story like a novel.',
            decisions: [{ prompt: 'What is the defining structural feature of a Petrarchan sonnet that distinguishes it from a Shakespearean sonnet?', options: [
                { text: 'A Petrarchan sonnet consists of an octave (8 lines) followed by a sestet (6 lines) with a', outcome: 'A Petrarchan sonnet consists of an octave (8 lines) followed by a sestet (6 lines) with a volta.' },
                { text: 'both have 14 lines so they are the same', outcome: 'Not quite — Students often believe "plot" only applies to stories with characters and events, so they say this.', reveals: 'plot-only-applies-to-stories' },
                { text: 'only applies to stories with characters and events, so they say this poem', outcome: 'Not quite — Students often believe "plot" only applies to stories with characters and events, so they say this.', reveals: 'plot-only-applies-to-stories' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you overhear someone standing at a busy Delhi metro station during rush hour, muttering, "Everyone\'s staring at screens, nobody looks at the sky.',
            decisions: [{ prompt: 'Who is the protagonist in a lyric poem such as "The World is too Much With Us"?', options: [
                { text: 'The protagonist is the **speaker or persona**', outcome: 'The protagonist is the **speaker or persona** — the constructed voice that delivers the poem\'s.' },
                { text: 'William Wordsworth himself', outcome: 'Not quite — Students often treat the speaker as **Wordsworth himself** — assuming every "I" in a poem.', reveals: 'students-often-treat-the-speaker' },
                { text: 'Nature', outcome: 'Not quite — Students often treat the speaker as **Wordsworth himself** — assuming every "I" in a poem.', reveals: 'students-often-treat-the-speaker' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are scrolling through social media and see a post saying "I wish I lived in a time when people believed rivers had gods." That feeling — that.',
            decisions: [{ prompt: 'List the five supporting figures explicitly named or personified in the poem\'s sestet (lines 9-14) and give their mythological or symbolic.', options: [
                { text: 'The five supporting figures are: 1) Sea', outcome: 'The five supporting figures are: 1) Sea — personified female force baring her bosom to the moon; 2).' },
                { text: 'Nature', outcome: 'Not quite — Students often treat Proteus and Triton as mere "Greek mythology references" to be memorized for.', reveals: 'students-often-treat-proteus-and' },
                { text: 'Great God!', outcome: 'Not quite — Students often treat Proteus and Triton as mere "Greek mythology references" to be memorized for.', reveals: 'students-often-treat-proteus-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re scrolling through social media at 11 PM, exhausted after a day of tuition classes and homework, realizing you haven\'t seen the sunset in weeks.',
            decisions: [{ prompt: 'What is the precise definition of "primary theme" in poetry, and how does it differ from a "subject" or "topic"?', options: [
                { text: 'The primary theme is the central insight or argument the poem makes about its subject', outcome: 'The primary theme is the central insight or argument the poem makes about its subject — a complete.' },
                { text: 'the theme is nature', outcome: 'Not quite — Students believe the poem\'s theme is simply "nature is better than cities" or "we should protect.', reveals: 'the-poem-s-theme-is' },
                { text: 'nature is better than cities', outcome: 'Not quite — Students believe the poem\'s theme is simply "nature is better than cities" or "we should protect.', reveals: 'the-poem-s-theme-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a weekend trip to the hills your friends spend the whole time filming stories, checking prices online, and planning purchases. Someone quotes \'the world is too much with us\' and another friend jokes, \'So Wordsworth wanted everyone to become atheists and worship sea gods?\'',
            decisions: [{ prompt: 'How do you explain what the sonnet is really arguing?', options: [
                { text: 'Explain the sonnet\'s turn: the octave diagnoses \'getting and spending\' — modern life wasting our powers and making us \'out of tune\' with sea and wind. At the volta he\'d \'rather be a Pagan\' — meaning a pre-Christian who saw divinity *in* nature (Proteus, Triton) — because even that beats a world that commodifies nature while claiming to be Christian.', outcome: '\'Pagan\' isn\'t atheism — it\'s Wordsworth\'s shocking contrast between a worldview that sacralises nature and a modernity too busy buying to see it.' },
                { text: 'Agree — Wordsworth rejected religion, so \'Pagan\' means he wanted a godless world.', outcome: 'That\'s the common misreading: \'Pagan\' here means a polytheist who perceives the divine within natural forces — the opposite of irreligion.', reveals: 'pagan-means-atheist' },
                { text: 'Say the poem has no real argument — it\'s just fourteen lines of pretty nature description.', outcome: 'The Petrarchan structure is the argument: octave states the problem, sestet offers the desperate alternative — it\'s an intellectual journey, not scenery.', reveals: 'sonnet-has-no-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'Eight lines to convict \'getting and spending,\' six to imagine a creed that still heard the sea — the hinge is the poem\'s whole argument.',
            decisions: [{ prompt: 'What comes next? The World is too Much With Us (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The World is too Much With Us (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the historical.',
          hint: 'If stuck, review the Petrarchan sonnet structure (c8_engl_ch4_14) and the concept.',
          misconception: 'Students often think "Pagan" in this poem means "atheist" or "non-religious" in the modern sense, and therefore.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" provides the historical, biographical, and',
                  options: ['"Before You Read: Context and Background" provides the historical, biographical, and', 'In poetry, "plot and narrative structure" refers to the organized progression of ideas,', 'Setting in poetry refers to the constructed time, place, and social environment evoked', 'In poetry, the protagonist is the **speaker or persona**'],
                  hint: 'If stuck, review the Petrarchan sonnet structure (c8_engl_ch4_14) and the concept of nature.',
                  misconception: 'Students often think "Pagan" in this poem means "atheist" or "non-religious" in the modern sense, and therefore interpret the sestet.' }
          ],
            remediations: { 'pagan-in-this-poem-means': { steps: ['If a student equates "Pagan" with "atheist," do three things: (1) Show the dictionary definition provided in the NCERT.', '(2) Point to the two named figures: Proteus and Triton are *gods* — the pagan "creed" is a theology of nature deities.', '(3) Ask: "If Wordsworth wanted no religion, why would he invoke *gods* rising from the sea and blowing horns?" Guide.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Pagan" in this poem means "atheist" or "non-religious" in the modern sense, and therefore.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of Wordsworth\'s concluding wish: "Great God!', answer: 'It is a rhetorical hyperbole',
                  options: ['It is a rhetorical hyperbole', 'in this poem means', 'non-religious'],
                  hint: 'If stuck, review the Petrarchan sonnet structure (c8_engl_ch4_14) and the concept of nature.',
                  misconception: 'Students often think "Pagan" in this poem means "atheist" or "non-religious" in the modern sense, and therefore interpret the sestet.' }
          ],
            remediations: { 'pagan-in-this-poem-means': { steps: ['If a student equates "Pagan" with "atheist," do three things: (1) Show the dictionary definition provided in the NCERT.', '(2) Point to the two named figures: Proteus and Triton are *gods* — the pagan "creed" is a theology of nature deities.', '(3) Ask: "If Wordsworth wanted no religion, why would he invoke *gods* rising from the sea and blowing horns?" Guide.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_002', difficulty: 'standard',
          question: 'In poetry, "plot and narrative structure" refers to the organized progression.',
          hint: 'Review the sonnet structure lesson from Class 10 (or the "Poetry Form: Narrative Poetry".',
          misconception: 'Students often believe "plot" only applies to stories with characters and events, so they say this poem "has no plot.".',
          parts: [
                { id: 'a', prompt: 'In your own words, explain what the "volta" is and why it matters in "The World is too Much With Us."', answer: 'The volta is the turn in thought or argument that occurs at line 9 ("Great God!',
                  options: ['The volta is the turn in thought or argument that occurs at line 9 ("Great God!', 'a change in rhyme scheme', 'only applies to stories with characters and events, so they say this poem'],
                  hint: 'Review the sonnet structure lesson from Class 10 (or the "Poetry Form: Narrative Poetry" node.',
                  misconception: 'Students often believe "plot" only applies to stories with characters and events, so they say this poem "has no plot." They also confuse.' }
          ],
            remediations: { 'plot-only-applies-to-stories': { steps: ['Have the student reread only lines 1-8 and summarize the speaker\'s complaint in one sentence.', 'Then read lines 9-14 and summarize the speaker\'s wish.', 'Ask: "What single word or phrase marks the switch from complaint to wish?" (Answer: "Great God!").', 'Explain that in lyric poetry, the "plot" is the movement of the speaker\'s mind, and the volta is the hinge.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the constructed time, place, and social environment.',
          hint: 'If stuck, review the sonnet structure explanation in node 002 and the Wordsworth.',
          misconception: 'Students believe the "world" in line 1 means only the physical planet, so they miss that "The World" functions as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting in poetry refers to the constructed time, place, and social environment evoked',
                  options: ['Setting in poetry refers to the constructed time, place, and social environment evoked', '"Before You Read: Context and Background" provides the historical, biographical, and', 'In poetry, "plot and narrative structure" refers to the organized progression of ideas,', 'In poetry, the protagonist is the **speaker or persona**'],
                  hint: 'If stuck, review the sonnet structure explanation in node 002 and the Wordsworth biography in node.',
                  misconception: 'Students believe the "world" in line 1 means only the physical planet, so they miss that "The World" functions as a personified antagonist.' }
          ],
            remediations: { 'the-world-in-line-1': { steps: ['If the student cannot distinguish the two settings: (1) Have them draw a two-column table: "Human World" vs "Natural.', '(2) Ask them to read only the octave aloud — what emotion rises?', 'Then read only the sestet — what changes?', '(3) Give them the definition of "volta" and have them locate the exact word where the turn happens ("Great God!").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_004', difficulty: 'standard',
          question: 'In poetry, the protagonist is the **speaker or persona** — the voice behind the.',
          hint: 'Review the concept of **persona** using a clear counter-example: Robert Browning\'s "My.',
          misconception: 'Students often treat the speaker as **Wordsworth himself** — assuming every "I" in a poem is autobiographical.',
          parts: [
                { id: 'a', prompt: 'Who is the protagonist in a lyric poem such as "The World is too Much With Us"?', answer: 'The protagonist is the **speaker or persona**',
                  options: ['The protagonist is the **speaker or persona**', 'William Wordsworth himself', 'Nature'],
                  hint: 'Review the concept of **persona** using a clear counter-example: Robert Browning\'s "My Last.',
                  misconception: 'Students often treat the speaker as **Wordsworth himself** — assuming every "I" in a poem is autobiographical.' }
          ],
            remediations: { 'students-often-treat-the-speaker': { steps: ['If a student writes "Wordsworth says..." instead of "The speaker says...", do this: (1) Hand them a different poem.', '(2) Ask: "Who is speaking?', 'Is it Browning?" (3) Return to Wordsworth: "Highlight every word that *builds* this speaker — \'sordid\', \'forlorn\'.', 'Did Wordsworth *choose* each?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_005', difficulty: 'standard',
          question: 'In poetry, supporting characters are personified natural forces, mythological.',
          hint: 'Review the definitions and mythological roles of Proteus (prophetic sea-god who changes.',
          misconception: 'Students often treat Proteus and Triton as mere "Greek mythology references" to be memorized for exams, rather than.',
          parts: [
                { id: 'a', prompt: 'List the five supporting figures explicitly named or personified in the poem\'s sestet (lines 9-14) and give their mythological or symbolic identity in one.', answer: 'The five supporting figures are: 1) Sea',
                  options: ['The five supporting figures are: 1) Sea', 'Nature', 'Great God!', 'God" or "Nature" as a supporting figure'],
                  hint: 'Review the definitions and mythological roles of Proteus (prophetic sea-god who changes shape.',
                  misconception: 'Students often treat Proteus and Triton as mere "Greek mythology references" to be memorized for exams, rather than as *strategic symbolic.' }
          ],
            remediations: { 'students-often-treat-proteus-and': { steps: ['Have the student re-read only the sestet (lines 9-14) and underline every verb associated with the supporting figures.', 'Ask: "What *experience* do these verbs promise the speaker?" (Answer: direct sensory communion — glimpses, sight.', 'Provide a two-column table: left column = modern actions ("getting and spending," "lay waste," "given our hearts.', 'Guide the student to articulate: "The supporting characters are not characters in a story; they are *experiences the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea that the poet.',
          hint: 'Review node 13_001 (Romantic context) and 13_002 (sonnet structure) — specifically the.',
          misconception: 'Students believe the poem\'s theme is simply "nature is better than cities" or "we should protect the environment." This.',
          parts: [
                { id: 'a', prompt: 'Analyze how the poem\'s Petrarchan structure (octave-sestet with volta at line 9) enacts the thematic movement from diagnosis to resolution.', answer: 'The octave (abbaabba) accumulates the indictment: each quatrain adds a layer',
                  options: ['The octave (abbaabba) accumulates the indictment: each quatrain adds a layer', 'nature is better than cities', 'we should protect the environment'],
                  hint: 'Review node 13_001 (Romantic context) and 13_002 (sonnet structure) — specifically the volta\'s.',
                  misconception: 'Students believe the poem\'s theme is simply "nature is better than cities" or "we should protect the environment." This reduces.' }
          ],
            remediations: { 'the-poem-s-theme-is': { steps: ['Re-read the poem *only* for economic/commercial vocabulary ("getting," "spending," "powers," "boon," "waste") — circle.', 'Ask: "What human faculty does each word imply is being damaged?" (e.g., "powers" = creative/moral agency).', 'Read the sestet as a *failed* solution: the speaker *wishes* to be Pagan but remains a modern Christian — the tension.', 'Write one paragraph using this sentence frame: "Wordsworth argues that ________ (economic process) causes ________.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
