import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch12_p1: SimDef = {
    id: 'v3_c11_eng_w_ch12_p1',
    title: 'Telephone Conversation (Poem) · Part 1/3',
    subtitle: 'Hear a rental call become a colour inspection — answered with devastating politeness.',
    classLevel: 11, subject: 'eng_w', topic: 'Telephone Conversation (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch12'],
    nodeIds: ['c11_eng_w_cbse_12_001', 'c11_eng_w_cbse_12_002', 'c11_eng_w_cbse_12_003', 'c11_eng_w_cbse_12_004', 'c11_eng_w_cbse_12_005', 'c11_eng_w_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a caller pricing a flat in 1960s London', intro: 'Price, location — agreed. Then one confession turns a transaction into an interrogation about melanin.', goal: 'Analyse the poem\'s dramatic structure and evaluate satire as a response to racism.' },
    discovery: {
        question: 'Asked \'HOW DARK?\' on a phone call about a flat, the speaker answers with jokes — \'plain or milk chocolate?\' Does the wit weaken the protest?',
        options: ['It amplifies it — humour refuses victimhood and exposes racism\'s \'clinical, crushing\' absurdity', 'It weakens it — jokes trivialise discrimination', 'Neither — the humour is separate from the politics', 'It weakens it — satire can\'t confront real prejudice'],
        answer: 'It amplifies it — humour refuses victimhood and exposes racism\'s \'clinical, crushing\' absurdity',
        hook: 'The telephone strips away everything but voice — so the only place racism can operate is a question about shade, and the poem dismantles it there.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Before You Read: Context and Background provides essential historical, biographical, and cultural information about the poet Wole Soyinka and the socio-political landscape of 1960s Britain that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the pivot where a housing call becomes a racial negotiation, read the silences and capitals as structure, and judge the open ending.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a film set in 1960s London—what would you need to know about that world to understand why a Black man calling about a flat gets.',
            decisions: [{ prompt: 'Who is Wole Soyinka, and what historic distinction does he hold in African literature?', options: [
                { text: 'Wole Soyinka (born 1934) is a Nigerian poet, playwright, and political activist who', outcome: 'Wole Soyinka (born 1934) is a Nigerian poet, playwright, and political activist who became the.' },
                { text: 'context', outcome: 'Not quite — Students often think "context" means only the poet\'s biography, and they miss that the poem\'s power.', reveals: 'context-means-only-the-poet' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are watching a one-minute video call where someone\'s face freezes after you mention your ethnicity — that awkward silence is a structural hinge.',
            decisions: [{ prompt: 'What are the five conventional stages of narrative structure in a literary work?', options: [
                { text: 'The five stages are exposition, rising action, climax, falling action, and resolution', outcome: 'The five stages are exposition, rising action, climax, falling action, and resolution.' },
                { text: 'in a poem means merely summarising what happens (', outcome: 'Not quite — Students often think "plot" in a poem means merely summarising what happens ("a man calls about.', reveals: 'plot-in-a-poem-means' },
                { text: 'only beginning, middle, end', outcome: 'Not quite — Students often think "plot" in a poem means merely summarising what happens ("a man calls about.', reveals: 'plot-in-a-poem-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are standing in a red London phone booth in the 1960s, the smell of damp tar and cigarette smoke around you, hearing only the hum of the line and.',
            decisions: [{ prompt: 'What is the primary physical setting of the poem "Telephone Conversation" and which three colour images dominate its visual landscape?', options: [
                { text: 'The primary physical setting is a red public telephone booth on a London street, with the', outcome: 'The primary physical setting is a red public telephone booth on a London street, with the dominant.' },
                { text: 'the landlady\'s house', outcome: 'Not quite — Students often think "setting" in a poem is just the background location (e.g., "London") and.', reveals: 'setting-in-a-poem-is' },
                { text: 'an apartment', outcome: 'Not quite — Students often think "setting" in a poem is just the background location (e.g., "London") and.', reveals: 'setting-in-a-poem-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re renting a flat and the landlord suddenly asks, "But exactly how brown are you?" before even discussing rent.',
            decisions: [{ prompt: 'Identify the only two direct questions the landlady asks in the poem and state what specific information she is seeking.', options: [
                { text: 'The landlady asks "HOW DARK?" and then "ARE YOU LIGHT OR VERY DARK?" She is seeking to', outcome: 'The landlady asks "HOW DARK?" and then "ARE YOU LIGHT OR VERY DARK?" She is seeking to categorise.' },
                { text: 'She asks about his nationality', outcome: 'Not quite — Students often read the landlady as simply "rude" or "ignorant" and write character sketches.', reveals: 'students-often-read-the-landlady' },
                { text: 'I am African', outcome: 'Not quite — Students often read the landlady as simply "rude" or "ignorant" and write character sketches.', reveals: 'students-often-read-the-landlady' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are calling a landlord about a flat you saw online.',
            decisions: [{ prompt: 'What is the primary theme of Wole Soyinka\'s poem "Telephone Conversation"?', options: [
                { text: 'The primary theme is racial prejudice and the dehumanizing absurdity of judging a', outcome: 'The primary theme is racial prejudice and the dehumanizing absurdity of judging a person\'s worth.' },
                { text: 'the difficulty of finding housing', outcome: 'Not quite — Students often think the primary theme is "the difficulty of being African in England".', reveals: 'the-primary-theme-is-the' },
                { text: 'miscommunication on the phone', outcome: 'Not quite — Students often think the primary theme is "the difficulty of being African in England".', reveals: 'the-primary-theme-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a class debate on \'Does racism still exist in polite society?\', a teammate wants to use Soyinka\'s \'Telephone Conversation\' but plans to present it as \'a true story about one rude landlady in Africa.\' You suspect both parts of that framing are wrong.',
            decisions: [{ prompt: 'What\'s the strongest way to deploy the poem in the debate?', options: [
                { text: 'Present it as a 1960s London incident — legal \'No Blacks\' rental ads, pre-Race Relations Act Britain — where the telephone strips away everything but voice, so racism must operate through a single question: \'HOW DARK?\' The poem\'s power is how a Nobel laureate\'s intellect gets reduced to a colour swatch, and how the silences and capitalised words turn prejudice\'s absurdity into structure.', outcome: 'Setting plus form become your evidence: systemic racism in \'polite\' Britain, exposed line by line until the speaker seizes control — \'wouldn\'t you rather see for yourself?\'' },
                { text: 'Go with the teammate\'s version — it\'s about one landlady\'s bad manners, so treat it as an anecdote about individual rudeness.', outcome: 'Individualising it loses the argument: the poem documents a legal, systemic rental market where \'HOW DARK?\' was a normal question to ask.', reveals: 'racism-is-one-rude-person' },
                { text: 'Use it as an \'African literature\' example since Soyinka is Nigerian — the landlady represents colonial attitudes back home.', outcome: 'The setting is London, not Africa; misplacing it geographically hides that the poem targets British racism experienced by an African abroad.', reveals: 'nigerian-poet-means-africa-setting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: '\'Wouldn\'t you rather see for yourself?\' — he ends the call by refusing the category, leaving the door open and the verdict with her.',
            decisions: [{ prompt: 'What comes next? Telephone Conversation (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Telephone Conversation (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_001', difficulty: 'standard',
          question: 'Before You Read: Context and Background provides essential historical.',
          hint: 'If stuck, review the 1948 British Nationality Act and the 1962 Commonwealth Immigrants.',
          misconception: 'Students often think "context" means only the poet\'s biography, and they miss that the poem\'s power comes from the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Before You Read: Context and Background provides essential historical, biographical, and',
                  options: ['Before You Read: Context and Background provides essential historical, biographical, and', 'Plot and narrative structure in poetry refers to the organized sequence of events and the', 'Setting in poetry refers to the time, place, and physical environment where the poetic', 'Character analysis of the protagonist in a poem involves examining the speaker\'s persona,'],
                  hint: 'If stuck, review the 1948 British Nationality Act and the 1962 Commonwealth Immigrants Act—the.',
                  misconception: 'Students often think "context" means only the poet\'s biography, and they miss that the poem\'s power comes from the collision between.' }
          ],
            remediations: { 'context-means-only-the-poet': { steps: ['If a student conflates the poet\'s nationality with the poem\'s setting, have them locate the poem\'s physical details.', 'Red double-tiered / Omnibus squelching tar." These are unmistakably British (pillar-box, omnibus).', 'Then ask: "Who holds the power in this conversation—the person with the flat or the person needing it?" This redirects.', 'Finally, assign a 5-minute research task: "Find one image of a 1960s UK \'To Let\' sign with a colour bar" to make the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to the organized sequence.',
          hint: 'Review Freytag\'s pyramid using a familiar Class 10 story, then practice mapping a simple.',
          misconception: 'Students often think "plot" in a poem means merely summarising what happens ("a man calls about a flat, the landlady.',
          parts: [
                { id: 'a', prompt: 'Identify the exact moment in the poem where the exposition ends and the rising action begins.', answer: 'The pivot is "‘Madam,’ I warned, / ‘I hate a wasted journey—I am African.’" This',
                  options: ['The pivot is "‘Madam,’ I warned, / ‘I hate a wasted journey—I am African.’" This', 'HOW DARK?', 'in a poem means merely summarising what happens ('],
                  hint: 'Review Freytag\'s pyramid using a familiar Class 10 story, then practice mapping a simple nursery.',
                  misconception: 'Students often think "plot" in a poem means merely summarising what happens ("a man calls about a flat, the landlady asks his skin colour.' },
                { id: 'b', prompt: 'The poem uses three distinct silences. Compare their narrative functions: how does each silence advance the plot differently?', answer: 'First silence ("Silence',
                  options: ['First silence ("Silence', 'in a poem means merely summarising what happens ('],
                  hint: 'Review Freytag\'s pyramid using a familiar Class 10 story, then practice mapping a simple nursery.',
                  misconception: 'Students often think "plot" in a poem means merely summarising what happens ("a man calls about a flat, the landlady asks his skin colour.' }
          ],
            remediations: { 'plot-in-a-poem-means': { steps: ['Have the student read the poem aloud while another student times each silence with a stopwatch — physicalising the.', 'Ask the student to draw a "narrative heartbeat" graph: x-axis = line numbers, y-axis = tension (1-10), plotting each.', 'Compare this graph to a standard Freytag pyramid — the student will see the poem\'s climax occurs *before* the midpoint.', 'Finally, have them rewrite the poem as a prose paragraph — the loss of tension will prove the structure *is* the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "plot" in a poem means merely summarising what happens ("a man calls about a flat, the landlady.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the poem\'s resolution ("wouldn\'t you rather see for yourself?") is an open or closed ending. Justify with reference to the narrative arc.', answer: 'It is an open ending',
                  options: ['It is an open ending', 'closed because the conversation ends', 'in a poem means merely summarising what happens ('],
                  hint: 'Review Freytag\'s pyramid using a familiar Class 10 story, then practice mapping a simple nursery.',
                  misconception: 'Students often think "plot" in a poem means merely summarising what happens ("a man calls about a flat, the landlady asks his skin colour.' }
          ],
            remediations: { 'plot-in-a-poem-means': { steps: ['Have the student read the poem aloud while another student times each silence with a stopwatch — physicalising the.', 'Ask the student to draw a "narrative heartbeat" graph: x-axis = line numbers, y-axis = tension (1-10), plotting each.', 'Compare this graph to a standard Freytag pyramid — the student will see the poem\'s climax occurs *before* the midpoint.', 'Finally, have them rewrite the poem as a prose paragraph — the loss of tension will prove the structure *is* the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and physical environment where the.',
          hint: 'If stuck, review c7_engl_ch04_005 (jungle atmosphere through silence/heat) and.',
          misconception: 'Students often think "setting" in a poem is just the background location (e.g., "London") and "atmosphere" is just the.',
          parts: [
                { id: 'a', prompt: 'Explain how the phrase "Silenced transmission of / Pressurised good-breeding" establishes the initial atmosphere before the landlady\'s question about skin.', answer: 'The phrase creates an atmosphere of stifling, performative politeness where the',
                  options: ['The phrase creates an atmosphere of stifling, performative politeness where the', 'politeness', 'silence', 'setting'],
                  hint: 'If stuck, review c7_engl_ch04_005 (jungle atmosphere through silence/heat) and c8_engl_ch4_7.',
                  misconception: 'Students often think "setting" in a poem is just the background location (e.g., "London") and "atmosphere" is just the general mood (e.g.' },
                { id: 'b', prompt: 'Apply the concept of "sensory imagery" to identify one auditory, one olfactory, and one tactile detail in the poem that grounds the speaker in the telephone.', answer: 'Auditory: "Silence" / "thunderclap" (receiver sound)',
                  options: ['Auditory: "Silence" / "thunderclap" (receiver sound)', 'imagery', 'setting', 'London'],
                  hint: 'If stuck, review c7_engl_ch04_005 (jungle atmosphere through silence/heat) and c8_engl_ch4_7.',
                  misconception: 'Students often think "setting" in a poem is just the background location (e.g., "London") and "atmosphere" is just the general mood (e.g.' },
                { id: 'c', prompt: 'Analyze how the repetition of "Red" (booth, pillar-box, omnibus) functions atmospherically beyond mere visual description.', answer: 'The triple repetition of "Red" creates a claustrophobic, oppressive atmosphere',
                  options: ['The triple repetition of "Red" creates a claustrophobic, oppressive atmosphere', 'it\'s London, things are red', 'setting', 'London'],
                  hint: 'If stuck, review c7_engl_ch04_005 (jungle atmosphere through silence/heat) and c8_engl_ch4_7.',
                  misconception: 'Students often think "setting" in a poem is just the background location (e.g., "London") and "atmosphere" is just the general mood (e.g.' }
          ],
            remediations: { 'setting-in-a-poem-is': { steps: ['If a student cannot distinguish the speaker\'s physical booth from the landlady\'s absent presence, have them draw.', 'Column B = every detail of the landlady (voice, lipstick, questions, silence).', 'Then ask: "Which column is the SETTING?', 'Which is the ATMOSPHERE created by the interaction?" This visual separation forces recognition that setting is the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a poem involves examining the.',
          hint: 'Work step by step.',
          misconception: 'Students often interpret the protagonist\'s initial "Silence" and "shamed / By ill-mannered silence" as evidence that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in a poem involves examining the speaker\'s persona,',
                  options: ['Character analysis of the protagonist in a poem involves examining the speaker\'s persona,', 'Before You Read: Context and Background provides essential historical, biographical, and', 'Plot and narrative structure in poetry refers to the organized sequence of events and the', 'Setting in poetry refers to the time, place, and physical environment where the poetic'],
                  hint: 'Recall the definition.',
                  misconception: 'Students often interpret the protagonist\'s initial "Silence" and "shamed / By ill-mannered silence" as evidence that he is humiliated and.' }
          ],
            remediations: { 'students-often-interpret-the-protagonist': { steps: ['Re-read stanzas 3-4 aloud with emphasis on the caesuras (pauses) after "Silence." Ask: "Who is silent?', 'Highlight the shift from "I warned" (line 4) to "I chose" (line 18) — circle the verbs to show agency.', 'Have the student physically act out the phone call: first as the landlady (rigid, loud), then as the protagonist.', 'Ask: "If he were truly defeated, would he invent \'peroxide blonde\' and \'raven black\'?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_005', difficulty: 'standard',
          question: 'Supporting character analysis examines how secondary figures (like the.',
          hint: 'Review the definition of "satire" and the distinction between "character" (realist) and.',
          misconception: 'Students often read the landlady as simply "rude" or "ignorant" and write character sketches listing her negative.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting character analysis examines how secondary figures (like the landlady) function',
                  options: ['Supporting character analysis examines how secondary figures (like the landlady) function', 'Before You Read: Context and Background provides essential historical, biographical, and', 'Plot and narrative structure in poetry refers to the organized sequence of events and the', 'Setting in poetry refers to the time, place, and physical environment where the poetic'],
                  hint: 'Review the definition of "satire" and the distinction between "character" (realist) and "type".',
                  misconception: 'Students often read the landlady as simply "rude" or "ignorant" and write character sketches listing her negative traits.' }
          ],
            remediations: { 'students-often-read-the-landlady': { steps: ['Re-read the poem marking ONLY the landlady\'s words and the speaker\'s descriptions of her (ignore the speaker\'s.', 'List the abstract nouns associated with her: "good-breeding," "assent," "impersonality," "clinical." 3.', 'Ask: "If this were a government form, what box is she ticking?" 4.', 'Write one sentence: "The landlady represents ______." Use the word "systemic" or "institutional." This shifts focus.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea that the.',
          hint: 'If stuck, review the "Subject vs. Theme" mini-lesson from Class 10 (c10_engl_cbse_01_006).',
          misconception: 'Students often think the primary theme is "the difficulty of being African in England" or "telephone awkwardness." This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea that the author',
                  options: ['The primary theme of a literary work is its central, unifying idea that the author', 'Before You Read: Context and Background provides essential historical, biographical, and', 'Plot and narrative structure in poetry refers to the organized sequence of events and the', 'Setting in poetry refers to the time, place, and physical environment where the poetic'],
                  hint: 'If stuck, review the "Subject vs. Theme" mini-lesson from Class 10 (c10_engl_cbse_01_006) and.',
                  misconception: 'Students often think the primary theme is "the difficulty of being African in England" or "telephone awkwardness." This happens because.' }
          ],
            remediations: { 'the-primary-theme-is-the': { steps: ['If a student conflates topic with theme, do this 3-step remediation: (1) Give two one-sentence summaries: "A man tries.', '"Racism makes a mockery of human dignity" (theme).', 'Ask which is *about the story* and which is *about life*.', '(2) Use the "So what?" ladder: "Landlady asks how dark" → "So what?" → "She reduces him to a colour" → "So what?" →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
