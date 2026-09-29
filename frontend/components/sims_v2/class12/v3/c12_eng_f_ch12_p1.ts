import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch12_p1: SimDef = {
    id: 'v3_c12_eng_f_ch12_p1',
    title: 'A Thing of Beauty (Poem) · Part 1/3',
    subtitle: 'Written by a dying man — beauty as a lifeline, not a luxury',
    classLevel: 12, subject: 'eng_f', topic: 'A Thing of Beauty (Poem) · Part 1/3',
    chapters: ['c12_eng_f_ch12'],
    nodeIds: ['c12_eng_f_cbse_12_001', 'c12_eng_f_cbse_12_002', 'c12_eng_f_cbse_12_003', 'c12_eng_f_cbse_12_004', 'c12_eng_f_cbse_12_005', 'c12_eng_f_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Romantic poetry scholar', intro: 'A shepherd dreams of the moon and wanders the earth for her. Keats turned that myth into a survival manual.', goal: 'Read A Thing of Beauty through its Romantic frame: the Endymion myth, nature as healing force, and beauty as answer to suffering.' },
    discovery: {
        question: 'A student reads Keats and shrugs: \'beauty makes us happy — it\'s a poem about pretty things.\' Written by a dying 25-year-old, what did they skip?',
        options: ['The suffering the beauty is fighting — despondence, gloomy days, dearth of noble natures; beauty doesn\'t erase the pall, it lifts it so we endure', 'Nothing — pretty things, happy poem', 'Keats hated nature', 'It\'s a love poem to a real woman'],
        answer: 'The suffering the beauty is fighting — despondence, gloomy days, dearth of noble natures; beauty doesn\'t erase the pall, it lifts it so we endure',
        hook: 'For the Romantics beauty isn\'t decoration — it\'s survival equipment. Keats, a surgeon who abandoned medicine and was dying of TB, builds his case on Endymion\'s endless quest: a thing of beauty is \'an endless fountain of immortal drink\' precisely because life is short and dark.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'A Roadside Stand\' (Flamingo, ch. 12) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_12_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Argue beauty\'s case like a Romantic: decode the Endymion myth as the engine, weigh the \'flowery band\' that binds us to earth despite everything, and test whether a gulmohar at noon can do what Keats claims.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'A Roadside Stand\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is the poet of "A Roadside Stand" and what is he best known for in American literature?', options: [
                { text: 'Robert Frost (1874–1963), a four-time Pulitzer Prize winner, known for poems like', outcome: 'Robert Frost (1874–1963), a four-time Pulitzer Prize winner, known for poems like "Stopping.' },
                { text: 'About the poet', outcome: 'Not quite — Students often think "context and background" means memorising the poet\'s birth/death dates and.', reveals: 'context-and-background-means-memorising' },
                { text: 'context and background', outcome: 'Not quite — Students often think "context and background" means memorising the poet\'s birth/death dates and.', reveals: 'context-and-background-means-memorising' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'A Roadside Stand\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in "A Roadside Stand"?', options: [
                { text: 'The poem is narrated in the first person by a speaker who observes the roadside stand and', outcome: 'The poem is narrated in the first person by a speaker who observes the roadside stand and reflects.' },
                { text: 'it\'s third-person throughout', outcome: 'Not quite — Students often think "plot" only applies to stories and novels, not poems.', reveals: 'plot-only-applies-to-stories' },
                { text: '"plot" only applies to stories and novels, not poems', outcome: 'Not quite — Students often think "plot" only applies to stories and novels, not poems.', reveals: 'plot-only-applies-to-stories' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'A Roadside Stand\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the physical setting of the roadside stand as described in the first stanza of the poem?', options: [
                { text: 'The physical setting is a little old house with a new shed at the edge of a road where', outcome: 'The physical setting is a little old house with a new shed at the edge of a road where traffic.' },
                { text: 'a busy city market', outcome: 'Not quite — Students often think "setting" in poetry means only the physical location (the shed, the road) and.', reveals: 'setting-in-poetry-means-only' },
                { text: 'a well-maintained shop', outcome: 'Not quite — Students often think "setting" in poetry means only the physical location (the shed, the road) and.', reveals: 'setting-in-poetry-means-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'A Roadside Stand\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Who is the protagonist of "A Roadside Stand"? Answer in one sentence.', options: [
                { text: 'The protagonist is the collective group of rural poor who run the roadside stand', outcome: 'The protagonist is the collective group of rural poor who run the roadside stand — the "pitiful.' },
                { text: 'the poet', outcome: 'Not quite — Students often think the *poet* (Robert Frost) is the protagonist because he says "I" in the last.', reveals: 'the-poet-robert-frost-is' },
                { text: 'the city folk', outcome: 'Not quite — Students often think the *poet* (Robert Frost) is the protagonist because he says "I" in the last.', reveals: 'the-poet-robert-frost-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'A Roadside Stand\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Name the three distinct groups of supporting characters in "A Roadside Stand" and give one line of evidence for each group\'s attitude.', options: [
                { text: 'The three groups are: (1) the city folk/polished traffic', outcome: 'The three groups are: (1) the city folk/polished traffic — "The polished traffic passed with a mind.' },
                { text: '; (2) the government/social agents —', outcome: 'Not quite — Students often think the "greedy good-doers" are simply corrupt officials stealing money.', reveals: 'the-greedy-good-doers-are' },
                { text: '; (3) the poet-speaker —', outcome: 'Not quite — Students often think the "greedy good-doers" are simply corrupt officials stealing money.', reveals: 'the-greedy-good-doers-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'A Roadside Stand\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the central plea of the roadside stand owners, as stated in the poem?', options: [
                { text: 'The stand owners plead for "some city money to feel in hand / To try if it will not make', outcome: 'The stand owners plead for "some city money to feel in hand / To try if it will not make our being.' },
                { text: 'they want charity', outcome: 'Not quite — Students often think the "primary theme" is simply "poverty is bad" or "the government should help.', reveals: 'the-primary-theme-is-simply' },
                { text: 'they want the government to give them houses', outcome: 'Not quite — Students often think the "primary theme" is simply "poverty is bad" or "the government should help.', reveals: 'the-primary-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend, worn down by exams and bad news, dismisses your suggestion to sit in the park or watch the sunset: \'pretty things don\'t fix real problems\'.',
            decisions: [{ prompt: 'What would Keats answer?', options: [
                { text: 'Beauty is a resource, not a remedy — \'a joy forever\' doesn\'t solve the problem but it loosens despair\'s \'pall\' and keeps the spirit capable of facing it.', outcome: 'Keats, writing through grief, argued beauty is how humans endure suffering — survival equipment, not decoration.' },
                { text: 'He\'s right — sunsets are escapism, and only solutions matter.', outcome: 'The poem\'s claim is precisely that despair itself is the deeper problem; beauty restores the will that solving requires.', reveals: 'beauty-is-escapism' },
                { text: 'Sort of — but only if the sunset actually removes the problem.', outcome: 'That demands of beauty a job it never claimed; its power is renewing the sufferer, not deleting the suffering.', reveals: 'beauty-must-solve' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend beauty as necessity, not luxury — and read the mythology as argument, not ornament. This poem is where imagery becomes philosophy.',
            decisions: [{ prompt: 'What comes next? A Thing of Beauty (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Thing of Beauty (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_001', difficulty: 'standard',
          question: '\'A Roadside Stand\' (Flamingo, ch. 12) — the context and background to this.',
          hint: 'If stuck, review Class 11 Hornbill Chapter 1 node c11_eng_h_cbse_01_001 and Class 10.',
          misconception: 'Students often think "context and background" means memorising the poet\'s birth/death dates and a list of famous poems.',
          parts: [
                { id: 'a', prompt: 'The pre-reading question asks: "Have you ever stopped at a roadside stand?', answer: 'On NH-48 near Jaipur, a family sells guavas from a bamboo shed',
                  options: ['On NH-48 near Jaipur, a family sells guavas from a bamboo shed', 'context and background'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1 node c11_eng_h_cbse_01_001 and Class 10 History.',
                  misconception: 'Students often think "context and background" means memorising the poet\'s birth/death dates and a list of famous poems.' },
                { id: 'b', prompt: 'Compare the government\'s proposed solution in the poem ("bought out and mercifully gathered in / To live in villages, next to the theatre and the store") with.', answer: 'Frost exposes "greedy good-doers, beneficent beasts of prey" who impose top-down',
                  options: ['Frost exposes "greedy good-doers, beneficent beasts of prey" who impose top-down', 'context and background'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1 node c11_eng_h_cbse_01_001 and Class 10 History.',
                  misconception: 'Students often think "context and background" means memorising the poet\'s birth/death dates and a list of famous poems.' }
          ],
            remediations: { 'context-and-background-means-memorising': { steps: ['Re-read the "About the poet" box and underline phrases linked to economic hardship ("human tragedies," "burdens,".', 'Watch a 5-minute video on the Great Depression\'s impact on American farmers (search "Dust Bowl farmers 1930s").', 'Revisit Class 11 node c11_eng_h_cbse_01_001 (Before You Read: Context and Background) to see how context was built for.', 'Re-attempt Diagnostic Question 2 and 4, this time explicitly connecting Frost\'s biography to the poem\'s specific.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context and background" means memorising the poet\'s birth/death dates and a list of famous poems.',
          parts: [
                { id: 'a', prompt: 'Create a 4-line free-verse snippet from the perspective of a roadside vendor in India today, using one image from Frost\'s poem (e.g., "squeal of brakes,".', answer: 'Example: "The squeal of brakes',
                  options: ['Example: "The squeal of brakes', 'context and background'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1 node c11_eng_h_cbse_01_001 and Class 10 History.',
                  misconception: 'Students often think "context and background" means memorising the poet\'s birth/death dates and a list of famous poems.' }
          ],
            remediations: { 'context-and-background-means-memorising': { steps: ['Re-read the "About the poet" box and underline phrases linked to economic hardship ("human tragedies," "burdens,".', 'Watch a 5-minute video on the Great Depression\'s impact on American farmers (search "Dust Bowl farmers 1930s").', 'Revisit Class 11 node c11_eng_h_cbse_01_001 (Before You Read: Context and Background) to see how context was built for.', 'Re-attempt Diagnostic Question 2 and 4, this time explicitly connecting Frost\'s biography to the poem\'s specific.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'A Roadside Stand\' — what happens, in what order, and.',
          hint: 'Review the narrative structure of "King Bruce and the Spider" (c7_engl_ch01_011) and the.',
          misconception: 'Students often think "plot" only applies to stories and novels, not poems.',
          parts: [
                { id: 'a', prompt: 'Analyze how the poem\'s stanza divisions correspond to shifts in narrative focus.', answer: 'Stanza 1: Exposition',
                  options: ['Stanza 1: Exposition', '"plot" only applies to stories and novels, not poems'],
                  hint: 'Review the narrative structure of "King Bruce and the Spider" (c7_engl_ch01_011) and the Class 11.',
                  misconception: 'Students often think "plot" only applies to stories and novels, not poems.' }
          ],
            remediations: { 'plot-only-applies-to-stories': { steps: ['If the student cannot identify the narrative progression, have them reread the poem and physically draw a storyboard.', 'Then ask them to connect the boxes with arrows labeled "leads to" or "contrasts with".', 'This visual mapping forces them to see the poem as a sequence.', 'Then revisit the diagnostic questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_003', difficulty: 'standard',
          question: 'The setting of \'A Roadside Stand\' — the place, time and atmosphere the text.',
          hint: 'If stuck, review c11_eng_h_cbse_01_003 (Class 11 Hornbill Chapter 1 Setting and.',
          misconception: 'Students often think "setting" in poetry means only the physical location (the shed, the road) and "atmosphere" means.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'A Roadside Stand\'',
                  options: ['The setting of \'A Roadside Stand\'', '\'A Roadside Stand\' (Flamingo, ch', 'The plot/narrative arc of \'A Roadside Stand\'', 'Character analysis in \'A Roadside Stand\''],
                  hint: 'If stuck, review c11_eng_h_cbse_01_003 (Class 11 Hornbill Chapter 1 Setting and Atmosphere) for the.',
                  misconception: 'Students often think "setting" in poetry means only the physical location (the shed, the road) and "atmosphere" means only the weather.' }
          ],
            remediations: { 'setting-in-poetry-means-only': { steps: ['Have the student re-read only the first and last stanzas aloud, circling every word that indicates *social class*.', 'Ask: "Who has power in this setting?', 'How does the poet *feel* about each group?" 3.', 'Have them complete a two-column table: Column A = Physical details of the stand (from stanza 1); Column B = What each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_004', difficulty: 'standard',
          question: 'Character analysis in \'A Roadside Stand\' — the central figure(s), their traits.',
          hint: 'Review "speaker vs. protagonist" in c11_eng_h_cbse_12_004 and practice on a short lyric.',
          misconception: 'Students often think the *poet* (Robert Frost) is the protagonist because he says "I" in the last stanza.',
          parts: [
                { id: 'a', prompt: 'Who is the protagonist of "A Roadside Stand"? Answer in one sentence.', answer: 'The protagonist is the collective group of rural poor who run the roadside stand',
                  options: ['The protagonist is the collective group of rural poor who run the roadside stand', 'the poet', 'the city folk', 'the *poet* (Robert Frost) is the protagonist'],
                  hint: 'Review "speaker vs. protagonist" in c11_eng_h_cbse_12_004 and practice on a short lyric (e.g., "The.',
                  misconception: 'Students often think the *poet* (Robert Frost) is the protagonist because he says "I" in the last stanza.' }
          ],
            remediations: { 'the-poet-robert-frost-is': { steps: ['Re-read stanza 1 aloud; underline every noun/verb belonging to the stand/owners (house, shed, stand, pled, berries.', 'List three things the *stand-owners* do/want (plead, sell, ask for money, expand being).', 'List three things the *speaker* does (observes, feels, confesses, wonders).', 'Compare: which list drives the poem\'s conflict?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_005', difficulty: 'standard',
          question: 'Supporting characters in \'A Roadside Stand\' — the secondary figures who move.',
          hint: 'If stuck, review c11_eng_h_cbse_02_005 (supporting characters in "A Photograph") for.',
          misconception: 'Students often think the "greedy good-doers" are simply corrupt officials stealing money.',
          parts: [
                { id: 'a', prompt: 'Name the three distinct groups of supporting characters in "A Roadside Stand" and give one line of evidence for each group\'s attitude toward the roadside stand.', answer: 'The three groups are: (1) the city folk/polished traffic',
                  options: ['The three groups are: (1) the city folk/polished traffic', '; (2) the government/social agents —', '; (3) the poet-speaker —', 'greedy good-doers'],
                  hint: 'If stuck, review c11_eng_h_cbse_02_005 (supporting characters in "A Photograph") for practice.',
                  misconception: 'Students often think the "greedy good-doers" are simply corrupt officials stealing money.' },
                { id: 'b', prompt: 'Explain in your own words why the poet calls the government agents "greedy good-doers" and "beneficent beasts of prey." What does this oxymoronic phrasing.', answer: 'The phrases combine contradictory terms: "greedy" (selfish) with "good-doers"',
                  options: ['The phrases combine contradictory terms: "greedy" (selfish) with "good-doers"', 'they are good because they are good-doers', 'greedy good-doers', 'takes the labels at face value (e'],
                  hint: 'If stuck, review c11_eng_h_cbse_02_005 (supporting characters in "A Photograph") for practice.',
                  misconception: 'Students often think the "greedy good-doers" are simply corrupt officials stealing money.' },
                { id: 'c', prompt: 'In stanza 3, three cars stop at the stand. For each, state the reason they stop and explain what that reason shows about urban attitudes toward rural.', answer: 'Car 1: "to plow up grass / In using the yard to back and turn around"',
                  options: ['Car 1: "to plow up grass / In using the yard to back and turn around"', 'greedy good-doers', 'the "greedy good-doers" are simply corrupt officials stealing money'],
                  hint: 'If stuck, review c11_eng_h_cbse_02_005 (supporting characters in "A Photograph") for practice.',
                  misconception: 'Students often think the "greedy good-doers" are simply corrupt officials stealing money.' }
          ],
            remediations: { 'the-greedy-good-doers-are': { steps: ['Re-read stanza 4 aloud, circling every verb applied to the "good-doers" (swarm, enforcing, calculated, soothe, destroy.', 'Ask: "Do these verbs sound like theft or like a takeover of daily life?" 3.', 'Revisit c12_eng_f_cbse_12_003 (Setting and Atmosphere) to recall how the poem contrasts "city money" and "country scale.', 'Write a two-sentence explanation of why "beneficent beasts of prey" is an oxymoron that captures the agents\' dual.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_006', difficulty: 'standard',
          question: 'The primary theme of \'A Roadside Stand\' — the central idea the whole text.',
          hint: 'If stuck, review "How to annotate a poem for theme" from c11_eng_h_cbse_12_006.',
          misconception: 'Students often think the "primary theme" is simply "poverty is bad" or "the government should help the poor." They miss.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "economic divide" to a new context: A farmer in your district sets up a stall selling organic millets on the highway.', answer: 'The farmer feels the "trusting sorrow of what is unsaid"',
                  options: ['The farmer feels the "trusting sorrow of what is unsaid"', 'primary theme', 'poverty is bad', 'the government should help the poor'],
                  hint: 'If stuck, review "How to annotate a poem for theme" from c11_eng_h_cbse_12_006 — specifically the.',
                  misconception: 'Students often think the "primary theme" is simply "poverty is bad" or "the government should help the poor." They miss that Frost.' }
          ],
            remediations: { 'the-primary-theme-is-simply': { steps: ['If a student cannot distinguish the owners\' plea from the government\'s "benefits," have them re-read Stanza 1 (owners\'.', 'Ask: "Who says \'we make our roadside stand\'?', 'Who says \'they won\'t have to think for themselves\'?" Then have them write two diary entries: one from a stand owner.', 'Compare the verbs: "ask," "try," "expand" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
