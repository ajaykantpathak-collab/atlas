import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch05_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch05_p1',
    title: 'lw;Zdkar f=ikBh ^fujkyk · Part 1/3',
    subtitle: 'The poem is the plough — and inequality is the field',
    classLevel: 12, subject: 'hin_ar', topic: 'lw;Zdkar f=ikBh ^fujkyk · Part 1/3',
    chapters: ['c12_hin_ar_ch05'],
    nodeIds: ['c12_hin_ar_cbse_05_001', 'c12_hin_ar_cbse_05_002', 'c12_hin_ar_cbse_05_003', 'c12_hin_ar_cbse_05_004', 'c12_hin_ar_cbse_05_005', 'c12_hin_ar_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Symbolic poetry reader', intro: 'A folk tale about a cornfield becomes, in a symbolist\'s hands, a field report on inequality.', goal: 'Read Makka through Kedarnath Singh\'s post-1943 symbolic method — folk tale into social allegory.' },
    discovery: {
        question: 'Kedarnath Singh says the poet isn\'t a spectator of inequality but wants to touch it \'with the plough of poetry.\' What\'s being claimed about the poem itself?',
        options: ['The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield', 'Farmers should write poems', 'Poetry is hard labour literally', 'Agriculture needs poets'],
        answer: 'The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield',
        hook: 'After 1943 his images stopped describing and started symbolising — the maize field is a rural world, the dark night its weight, the plough the poet\'s intervention. \'Makka\' grows from a folk tale: read the field as a symbolic landscape, not a sketch.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'This node covers the "Before You Read" section which provides essential context about the poet (Kedarnath Singh), his literary style, the background of the poem \'Makka\' (based on a folk tale), and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Work the symbolic field: trace folk-tale roots into the poem\'s images, decode what maize, night and plough each stand for, and judge a poet who ploughs inequality rather than just watching it.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a movie but you don\'t know the director, the genre, or the backstory — you might miss the deeper layers.',
            decisions: [{ prompt: 'Who is the poet of the poem \'Makka\' and what is his significance in Hindi literature?', options: [
                { text: 'The poet is Kedarnath Singh (1911–1993), a major modern Hindi poet known for his symbolic', outcome: 'The poet is Kedarnath Singh (1911–1993), a major modern Hindi poet known for his symbolic and.' },
                { text: 'another poet like Nirala or Muktibodh', outcome: 'Not quite — Students often treat the \'Before You Read\' section as optional background to skip, thinking the.', reveals: 'students-often-treat-the-before' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are watching a potter at the wheel: the clay seems shapeless at first, then gradually rises into a curve, and finally the potter cuts it off — each.',
            decisions: [{ prompt: 'How many stanzas does the poem "मक्क" have, and what is the primary focus of its opening stanza?', options: [
                { text: 'The poem "मक्क" consists of two stanzas', outcome: 'The poem "मक्क" consists of two stanzas. The opening stanza focuses on a static, visual description.' },
                { text: 'three stanzas', outcome: 'Not quite — Students often treat "plot" and "narrative structure" as synonyms borrowed from fiction, expecting.', reveals: 'students-often-treat-plot-and' },
                { text: 'the opening stanza talks about the poet\'s childhood', outcome: 'Not quite — Students often treat "plot" and "narrative structure" as synonyms borrowed from fiction, expecting.', reveals: 'students-often-treat-plot-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re describing a winter morning in your village to a friend who has never experienced one — you\'d mention the biting cold that makes your fingers.',
            decisions: [{ prompt: 'What are the three core components of \'setting\' in a literary text, and which component is most prominently established in the opening.', options: [
                { text: 'The three core components are time (temporal), place (spatial), and physical environment', outcome: 'The three core components are time (temporal), place (spatial), and physical environment.' },
                { text: 'time and place', outcome: 'Not quite — Students often treat setting as a static label ("village, winter, morning") and atmosphere as.', reveals: 'students-often-treat-setting-as' },
                { text: 'characters', outcome: 'Not quite — Students often treat setting as a static label ("village, winter, morning") and atmosphere as.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are standing before an old mud house in a village.',
            decisions: [{ prompt: 'List all the supporting characters/elements explicitly present in the poem "मकक" as described in the NCERT text.', options: [
                { text: 'The supporting characters are: the tree (हकसज), the bird (जकक), the bird\'s nest, the', outcome: 'The supporting characters are: the tree (हकसज), the bird (जकक), the bird\'s nest, the children.' },
                { text: 'includes the mud house itself confuses protagonist with supporting cast', outcome: 'Not quite — Students often treat supporting characters in a poem as static background images—"the tree is there.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are standing at a bus stop on a December morning in Delhi at 6:30 AM — the air bites your fingers, your breath makes clouds, and the streetlights.',
            decisions: [{ prompt: 'What is the difference between a \'topic\' (subject) and a \'theme\' in poetry? Give a one-sentence answer using "mkk" as an example.', options: [
                { text: 'A topic is the literal subject (e.g., \'a frosty morning\')', outcome: 'A topic is the literal subject (e.g., \'a frosty morning\'); a theme is the universal insight about.' },
                { text: 'izLrqr dfork m\'kk lw;ksZn', outcome: 'Not quite — Students consistently write: "The theme of \'mkk\' is the beauty of winter" or "The message is that.', reveals: 'students-consistently-write-the-theme' },
                { text: 'yhik gqvk pkSdk', outcome: 'Not quite — Students consistently write: "The theme of \'mkk\' is the beauty of winter" or "The message is that.', reveals: 'students-consistently-write-the-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a photo-story assignment, your partner wants to scrap shots of a foggy winter field — \'nothing happens in them; we need drama.\' You suspect the quiet frames are the story.',
            decisions: [{ prompt: 'How does Nirala\'s \'मक्क\' settle the argument?', options: [
                { text: 'Keep them — the poem opens on a still, frost-covered morning and ends by realising the morning itself has become the poem; the ordinary observed fully is the subject, not the preface to one.', outcome: 'The structure — observation widening into realisation — is the claim: poetic weight isn\'t imported through drama but uncovered by attention, so \'nothing happens\' frames can carry the whole piece.' },
                { text: 'Scrap them — a subject must be dramatic for the art to be strong; description without event is filler.', outcome: 'That reads the poem\'s opening stanza as waiting-room material; the chapter shows the jump from scene to insight is the poem\'s spine — cutting the \'uneventful\' images cuts the argument.', reveals: 'drama-equals-subject' },
                { text: 'Keep them but add a dramatic climax shot so the essay has a proper arc.', outcome: 'That grafts a foreign arc onto the form: \'मक्क\' resolves by deepening the view, not by injecting an event — the epiphany is that nothing needed to happen.', reveals: 'arc-needs-a-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a poem\'s images as instruments of change — symbolism that works the soil instead of framing it.',
            decisions: [{ prompt: 'What comes next? lw;Zdkar f=ikBh ^fujkyk · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — lw;Zdkar f=ikBh ^fujkyk · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_001', difficulty: 'standard',
          question: 'This node covers the "Before You Read" section which provides essential context.',
          hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_08_001 (Imagery and Metaphor) and.',
          misconception: 'Students often treat the \'Before You Read\' section as optional background to skip, thinking the poem speaks for itself.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node covers the "Before You Read" section',
                  options: ['This node covers the "Before You Read" section', 'In poetry, narrative structure refers to the deliberate organization of images, ideas,', 'Setting refers to the time, place, and physical environment in', 'In a poem, the protagonist is the central figure'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_08_001 (Imagery and Metaphor) and.',
                  misconception: 'Students often treat the \'Before You Read\' section as optional background to skip, thinking the poem speaks for itself.' }
          ],
            remediations: { 'students-often-treat-the-before': { steps: ['If a student cannot articulate the poet\'s symbolic method or the folk tale connection, do NOT have them re-read the.', 'Instead: (1) Give them a 2-minute oral summary: \'Kedarnath Singh = symbolic poet; "Makka" = folk tale turned symbolic.', '(3) Re-diagnose with Diagnostic Question 4 — if they can now explain the metaphor, they\'ve grasped the core.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_002', difficulty: 'standard',
          question: 'In poetry, narrative structure refers to the deliberate organization of images.',
          hint: 'Review Class 11 node **c11_hin_ar_cbse_01_002** (Plot and Narrative Structure).',
          misconception: 'Students often treat "plot" and "narrative structure" as synonyms borrowed from fiction, expecting a poem to have.',
          parts: [
                { id: 'a', prompt: 'How many stanzas does the poem "मक्क" have, and what is the primary focus of its opening stanza?', answer: 'The poem "मक्क" consists of two stanzas',
                  options: ['The poem "मक्क" consists of two stanzas', 'three stanzas', 'the opening stanza talks about the poet\'s childhood'],
                  hint: 'Review Class 11 node **c11_hin_ar_cbse_01_002** (Plot and Narrative Structure) — specifically the.',
                  misconception: 'Students often treat "plot" and "narrative structure" as synonyms borrowed from fiction, expecting a poem to have characters, conflict, and.' },
                { id: 'b', prompt: 'In your own words, explain how the poem "मक्क" moves from a concrete scene to an abstract idea. What is the turning point?', answer: 'The poem begins with sensory details',
                  options: ['The poem begins with sensory details', 'it describes fog then sun', 'merely lists images without naming the shift (e'],
                  hint: 'Review Class 11 node **c11_hin_ar_cbse_01_002** (Plot and Narrative Structure) — specifically the.',
                  misconception: 'Students often treat "plot" and "narrative structure" as synonyms borrowed from fiction, expecting a poem to have characters, conflict, and.' },
                { id: 'c', prompt: 'Divide the poem "हककज वगसज्ह" into three structural segments based on the shift in focus. Label each segment with a one-phrase descriptor.', answer: 'Segment 1 (Lines 1–8): **सूर्योदय का दृश्य-चित्रण**',
                  options: ['Segment 1 (Lines 1–8): **सूर्योदय का दृश्य-चित्रण**', 'it\'s all about the morning'],
                  hint: 'Review Class 11 node **c11_hin_ar_cbse_01_002** (Plot and Narrative Structure) — specifically the.',
                  misconception: 'Students often treat "plot" and "narrative structure" as synonyms borrowed from fiction, expecting a poem to have characters, conflict, and.' }
          ],
            remediations: { 'students-often-treat-plot-and': { steps: ['Have the student re-read both poems *aloud* with a pencil, marking every stanza break and circling the first and last.', 'Ask: "What is the *difference* between what the first stanza shows and what the last stanza says?" Write the answer.', 'Provide a 3-column table: Stanza | Dominant Image | Shift in Focus.', 'Student fills it for both poems.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "plot" and "narrative structure" as synonyms borrowed from fiction, expecting a poem to have.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The structure of \'मक्क\' is weak because it just describes a morning and then suddenly jumps to a big idea." Evaluate this claim using.', answer: 'The claim is **invalid**',
                  options: ['The claim is **invalid**', 'yes, it\'s abrupt'],
                  hint: 'Review Class 11 node **c11_hin_ar_cbse_01_002** (Plot and Narrative Structure) — specifically the.',
                  misconception: 'Students often treat "plot" and "narrative structure" as synonyms borrowed from fiction, expecting a poem to have characters, conflict, and.' }
          ],
            remediations: { 'students-often-treat-plot-and': { steps: ['Have the student re-read both poems *aloud* with a pencil, marking every stanza break and circling the first and last.', 'Ask: "What is the *difference* between what the first stanza shows and what the last stanza says?" Write the answer.', 'Provide a 3-column table: Stanza | Dominant Image | Shift in Focus.', 'Student fills it for both poems.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which a literary.',
          hint: 'If stuck, review "इमेजरी के प्रकार" (types of imagery) in c11_hin_ar_cbse_05_008 and.',
          misconception: 'Students often treat setting as a static label ("village, winter, morning") and atmosphere as a single adjective.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and physical environment in',
                  options: ['Setting refers to the time, place, and physical environment in', 'This node covers the "Before You Read" section', 'In poetry, narrative structure refers to the deliberate organization of images, ideas,', 'In a poem, the protagonist is the central figure'],
                  hint: 'If stuck, review "इमेजरी के प्रकार" (types of imagery) in c11_hin_ar_cbse_05_008 and practice.',
                  misconception: 'Students often treat setting as a static label ("village, winter, morning") and atmosphere as a single adjective ("cold", "peaceful").' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Re-read the poem aloud, marking every sensory word (visual, tactile, auditory, olfactory) with a coloured pencil.', 'Group these by stanza and ask: "What does this cluster make me *feel*?" — write one mood word per stanza.', 'final stanza mood; articulate the shift in one sentence.', 'Revisit c11_hin_ar_cbse_05_003 (Class 11 Setting and Atmosphere) and redo its Worked Example 2 on atmospheric.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_004', difficulty: 'standard',
          question: 'In a poem, the protagonist is the central figure — whether a personified.',
          hint: 'If stuck on "who is protagonist?", return to c12_hin_ar_cbse_05_003 and list every image.',
          misconception: '**Misconception:** "The protagonist of a poem is always the speaker (\'I\')." **Why it\'s wrong:** In \'मिट्टी\', there.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words *how* the poet establishes मिट्टी as a living protagonist rather than just a setting. Use two specific poetic devices from the poem.', answer: 'The poet uses **personification** ("मिट्टी क उहक',
                  options: ['The poet uses **personification** ("मिट्टी क उहक', 'imagery'],
                  hint: 'If stuck on "who is protagonist?", return to c12_hin_ar_cbse_05_003 and list every image — then.',
                  misconception: '**Misconception:** "The protagonist of a poem is always the speaker (\'I\')." **Why it\'s wrong:** In \'मिट्टी\', there is **no "I" in the.' }
          ],
            remediations: { 'misconception-the-protagonist-of-a': { steps: ['**Re-read the poem aloud** — mark every noun/pronoun referring to मिट्टी (उहक, मिट्टी, वक, लव;कसण;).', '**Revisit node c12_hin_ar_cbse_05_003 (Setting and Atmosphere)** — identify which "setting details" are actually.', '**Do a 5-minute write:** "If मिट्टी could speak, what would she say to the farmer?" — forces personification.', '**Re-attempt Diagnostic Q3** with the PEEL template, this time using only poem lines as Evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_005', difficulty: 'standard',
          question: 'Supporting characters in a poem are the secondary figures—human, natural,.',
          hint: 'If stuck, return to c12_hin_ar_cbse_05_004 and re-do the "Protagonist Profile" exercise.',
          misconception: 'Students often treat supporting characters in a poem as static background images—"the tree is there for shade," "the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in a poem are the secondary figures—human, natural, or',
                  options: ['Supporting characters in a poem are the secondary figures—human, natural, or', 'This node covers the "Before You Read" section', 'In poetry, narrative structure refers to the deliberate organization of images, ideas,', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, return to c12_hin_ar_cbse_05_004 and re-do the "Protagonist Profile" exercise; then.',
                  misconception: 'Students often treat supporting characters in a poem as static background images—"the tree is there for shade," "the children are there for.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student cannot move beyond listing supporting characters, do this 3-step remediation: (1) Have them re-read the.', '(2) For each underlined noun, ask: "What is this thing *doing* in the poem?', 'What verb would you give it?" (e.g., the plaster *erodes*, the children *nest/play*, the tree *shades/witnesses*).', '(3) Then ask: "How does that action change your understanding of the mud house?" Guide them to write one sentence per.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If unable to write a theme statement, revisit the \'theme statement template\'.',
          misconception: 'Students consistently write: "The theme of \'mkk\' is the beauty of winter" or "The message is that we should enjoy.',
          parts: [
                { id: 'a', prompt: 'What is the difference between a \'topic\' (subject) and a \'theme\' in poetry? Give a one-sentence answer using "mkk" as an example.', answer: 'A topic is the literal subject (e.g., \'a frosty morning\')',
                  options: ['A topic is the literal subject (e.g., \'a frosty morning\')', 'izLrqr dfork m\'kk lw;ksZn', 'yhik gqvk pkSdk'],
                  hint: 'If unable to write a theme statement, revisit the \'theme statement template\'.',
                  misconception: 'Students consistently write: "The theme of \'mkk\' is the beauty of winter" or "The message is that we should enjoy nature." This is a Class.' }
          ],
            remediations: { 'students-consistently-write-the-theme': { steps: ['If a student cannot move beyond \'winter is beautiful\', do this 3-step remediation: 1.', 'Re-read node c12_hin_ar_cbse_05_003 (Setting and Atmosphere) and list 5 words the poet uses for \'cold\' and 5 for.', 'Re-read node c12_hin_ar_cbse_05_004 (Protagonist — here, the observing \'I\') and answer: "What does the speaker DO.', 'What does the speaker FEEL at the start vs the end?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
