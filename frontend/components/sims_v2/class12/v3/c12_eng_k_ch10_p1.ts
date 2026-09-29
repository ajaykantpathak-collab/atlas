import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch10_p1: SimDef = {
    id: 'v3_c12_eng_k_ch10_p1',
    title: 'Emily Dickinson (Poem) · Part 1/3',
    subtitle: 'Fewer than a dozen poems published — 1,789 left in a drawer',
    classLevel: 12, subject: 'eng_k', topic: 'Emily Dickinson (Poem) · Part 1/3',
    chapters: ['c12_eng_k_ch10'],
    nodeIds: ['c12_eng_k_cbse_10_001', 'c12_eng_k_cbse_10_002', 'c12_eng_k_cbse_10_003', 'c12_eng_k_cbse_10_004', 'c12_eng_k_cbse_10_005', 'c12_eng_k_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'American poetry reader', intro: 'A recluse in Amherst wrote poems too strange for her century — and they turned out to be built, not broken.', goal: 'Read Dickinson\'s Trees through her signature style — dashes, capitals, compressed imagery — and her observational precision.' },
    discovery: {
        question: 'Dickinson writes \'The Trees like Tassels hit – and – swung –\' with dashes where commas belong and capitals mid-sentence. Error, or instrument?',
        options: ['Instrument — the dashes mime the trees\' jerky swing and the capitals turn Sun and Summer into persons with Estates of Cloud', 'Errors — she needed an editor', 'Random habit', 'Old-fashioned grammar rules'],
        answer: 'Instrument — the dashes mime the trees\' jerky swing and the capitals turn Sun and Summer into persons with Estates of Cloud',
        hook: 'She published barely a dozen poems alive; 1,789 surfaced after — written for herself, never flattened by a publisher. Recluse doesn\'t mean unobservant: \'A Bird sat careless on the fence\' is precision, not fantasy. The strangeness is the point.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Trees\' (Kaleidoscope, ch. 10) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_10_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Decode Dickinson\'s fingerprint: wield her dashes and capitals as reading tools, then prove that a woman at one window watched nature more closely than most travellers.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Trees\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What are three distinctive features of Emily Dickinson’s poetic style mentioned in the textbook’s introductory note?', options: [
                { text: 'The three features are: (1) unconventional capitalization of nouns, (2) extensive use of', outcome: 'The three features are: (1) unconventional capitalization of nouns, (2) extensive use of dashes.' },
                { text: 'rhyming couplets', outcome: 'Not quite — Students often treat Dickinson’s dashes and capitalization as “mistakes” or “old-fashioned grammar”.', reveals: 'students-often-treat-dickinson-s' },
                { text: 'regular meter', outcome: 'Not quite — Students often treat Dickinson’s dashes and capitalization as “mistakes” or “old-fashioned grammar”.', reveals: 'students-often-treat-dickinson-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Trees\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the physical setting (time and place) established in the first stanza of "Trees"?', options: [
                { text: 'The first stanza sets the poem on a summer day in a natural landscape with trees ("Trees', outcome: 'The first stanza sets the poem on a summer day in a natural landscape with trees ("Trees like.' },
                { text: 'the setting is happy', outcome: 'Not quite — Students often treat setting and atmosphere as synonyms, writing "the setting is peaceful" instead.', reveals: 'students-often-treat-setting-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Trees\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List the five personified natural elements in Dickinson\'s "Trees" that function as supporting characters, and for each, quote the specific.', options: [
                { text: 'The five personified elements are: (1) Trees', outcome: 'The five personified elements are: (1) Trees — "like Tassels hit – and – swung"; (2) Sun — "shone.' },
                { text: 'trees and sun', outcome: 'Not quite — Students often think "supporting characters" in a poem *must* be human or animal figures with.', reveals: 'supporting-characters-in-a-poem' },
                { text: 'Miniature Creatures', outcome: 'Not quite — Students often think "supporting characters" in a poem *must* be human or animal figures with.', reveals: 'supporting-characters-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Trees\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of Emily Dickinson\'s poem "Trees" as distinct from its subject matter?', options: [
                { text: 'The primary theme is nature\'s sublime, self-sufficient beauty that transcends and renders', outcome: 'The primary theme is nature\'s sublime, self-sufficient beauty that transcends and renders.' },
                { text: 'nature is beautiful', outcome: 'Not quite — Students often think the primary theme is "nature is beautiful" or "summer is lovely" — generic.', reveals: 'the-primary-theme-is-nature' },
                { text: 'summer is lovely', outcome: 'Not quite — Students often think the primary theme is "nature is beautiful" or "summer is lovely" — generic.', reveals: 'the-primary-theme-is-nature' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Editing a young poet\'s manuscript, a colleague wants to strip out all her odd dashes and strange capitalisations \'to fix the grammar before we publish\'.',
            decisions: [{ prompt: 'Correct the strangeness or keep it?', options: [
                { text: 'Keep it until proven decorative — Dickinson\'s dashes and capitals aren\'t errors but tools that hold pauses and double meanings; \'fixing\' them flattens the poem.', outcome: 'Before editing style into compliance, ask what the oddity is doing — in Dickinson the form carries the meaning.' },
                { text: 'Fix it — standard grammar exists so readers aren\'t confused.', outcome: 'That treats deliberate prosodic choice as a mistake; her compressed strangeness is the precision.', reveals: 'unconventionality-is-error' },
                { text: 'Publish it, but note she\'s a recluse so expect the work to be small and private anyway.', outcome: 'Her window-narrow life produced startlingly universal poems; biography doesn\'t bound imagination.', reveals: 'isolation-means-narrowness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the strangest punctuation in English poetry as deliberate music — and defend private genius against the myth of the madwoman.',
            decisions: [{ prompt: 'What comes next? Emily Dickinson (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Emily Dickinson (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_001', difficulty: 'standard',
          question: '\'Trees\' (Kaleidoscope, ch. 10) — the context and background to this text: who.',
          hint: 'Review “Literary Devices: Imagery and Metaphor” from Class 11 Hornbill.',
          misconception: 'Students often treat Dickinson’s dashes and capitalization as “mistakes” or “old-fashioned grammar” because they are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'Trees\' (Kaleidoscope, ch',
                  options: ['\'Trees\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Trees\'', 'The setting of \'Trees\'', 'Character analysis in \'Trees\''],
                  hint: 'Review “Literary Devices: Imagery and Metaphor” from Class 11 Hornbill (c11_eng_h_cbse_01_008) and.',
                  misconception: 'Students often treat Dickinson’s dashes and capitalization as “mistakes” or “old-fashioned grammar” because they are used to standardized.' }
          ],
            remediations: { 'students-often-treat-dickinson-s': { steps: ['Re-read the introductory note in the textbook aloud, circling every mention of style (capitalization, dashes, imagery).', 'Watch a 5-minute video on Dickinson’s fascicles (handmade booklets) to visualize her private publishing process.', 'Take a familiar nursery rhyme and rewrite it with Dickinson-style dashes and capitalization to feel the effect.', 'Return to the diagnostic questions and re-attempt Q3 and Q4 with the new awareness.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Trees\' — what happens, in what order, and why the.',
          hint: 'If stuck, revisit Class 11 Hornbill/Woven Words "Plot and Narrative Structure" nodes.',
          misconception: 'Students treat "plot" in poetry as a synonym for "what happens" and therefore claim Dickinson\'s poem "has no plot".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'Trees\'',
                  options: ['The plot/narrative arc of \'Trees\'', '\'Trees\' (Kaleidoscope, ch', 'The setting of \'Trees\'', 'Character analysis in \'Trees\''],
                  hint: 'If stuck, revisit Class 11 Hornbill/Woven Words "Plot and Narrative Structure" nodes.',
                  misconception: 'Students treat "plot" in poetry as a synonym for "what happens" and therefore claim Dickinson\'s poem "has no plot" because no characters.' }
          ],
            remediations: { 'students-treat-plot-in-poetry': { steps: ['If a student says "there\'s no plot," do NOT lecture on poetic theory.', 'Instead: (1) Have them number the stanzas 1-4.', '(2) Ask: "What does the speaker look at in stanza 1?', 'Stanza 4?" (3) Write their answers in a column.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "plot" in poetry as a synonym for "what happens" and therefore claim Dickinson\'s poem "has no plot".',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The final stanza\'s reference to Vandyke resolves the poem\'s narrative by declaring the scene unpaintable." Is this a valid reading of the.', answer: 'Partially valid but incomplete',
                  options: ['Partially valid but incomplete', 'conclusion'],
                  hint: 'If stuck, revisit Class 11 Hornbill/Woven Words "Plot and Narrative Structure" nodes.',
                  misconception: 'Students treat "plot" in poetry as a synonym for "what happens" and therefore claim Dickinson\'s poem "has no plot" because no characters.' }
          ],
            remediations: { 'students-treat-plot-in-poetry': { steps: ['If a student says "there\'s no plot," do NOT lecture on poetic theory.', 'Instead: (1) Have them number the stanzas 1-4.', '(2) Ask: "What does the speaker look at in stanza 1?', 'Stanza 4?" (3) Write their answers in a column.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_003', difficulty: 'standard',
          question: 'The setting of \'Trees\' — the place, time and atmosphere the text creates.',
          hint: 'Review Class 11 node c11_eng_h_cbse_01_003 (Setting and Atmosphere) for definitions and.',
          misconception: 'Students often treat setting and atmosphere as synonyms, writing "the setting is peaceful" instead of "the setting is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'Trees\'',
                  options: ['The setting of \'Trees\'', '\'Trees\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Trees\'', 'Character analysis in \'Trees\''],
                  hint: 'Review Class 11 node c11_eng_h_cbse_01_003 (Setting and Atmosphere) for definitions and.',
                  misconception: 'Students often treat setting and atmosphere as synonyms, writing "the setting is peaceful" instead of "the setting is a summer orchard; the.' }
          ],
            remediations: { 'students-often-treat-setting-and': { steps: ['Re-read the poem stanza by stanza with a three-column table: Column A = Setting Details (nouns of place/time), Column.', 'After filling the table, write one sentence per stanza summarizing its atmosphere.', 'Finally, write a paragraph explaining how the shift from Column B (sound) to Column B (sight/smell) drives the change.', 'If stuck, revisit Class 11 node c11_eng_h_cbse_01_003 (Setting and Atmosphere) and c11_eng_h_cbse_01_008 (Imagery and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_004', difficulty: 'standard',
          question: 'Character analysis in \'Trees\' — the central figure(s), their traits, and how.',
          hint: 'Review the concept of "lyric speaker" vs. "narrative protagonist" from Class 11 poetry.',
          misconception: 'Students often think the protagonist in a poem is the most prominent personified object (here, the Sun) because it gets.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis in \'Trees\'',
                  options: ['Character analysis in \'Trees\'', '\'Trees\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Trees\'', 'The setting of \'Trees\''],
                  hint: 'Review the concept of "lyric speaker" vs. "narrative protagonist" from Class 11 poetry analysis.',
                  misconception: 'Students often think the protagonist in a poem is the most prominent personified object (here, the Sun) because it gets the most lines and.' }
          ],
            remediations: { 'the-protagonist-in-a-poem': { steps: ['If a student identifies the Sun as the protagonist, guide them through these steps: (1) Reread the poem and highlight.', '(2) Ask: "Who is doing the seeming, the satisfying, the mentioning, the judging?" (3) Have them write a one-sentence.', '(4) Then re-read the Sun\'s description as something the consciousness *chooses* to portray in a certain way.', 'This shifts focus from the object described to the describing subject.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_005', difficulty: 'standard',
          question: 'Supporting characters in \'Trees\' — the secondary figures who move the story.',
          hint: 'Review "Personification" from Class 10 First Flight (c10_engl_cbse_03_007) or Class 8.',
          misconception: 'Students often think "supporting characters" in a poem *must* be human or animal figures with dialogue.',
          parts: [
                { id: 'a', prompt: 'List the five personified natural elements in Dickinson\'s "Trees" that function as supporting characters, and for each, quote the specific line/phrase that.', answer: 'The five personified elements are: (1) Trees',
                  options: ['The five personified elements are: (1) Trees', 'trees and sun', 'Miniature Creatures', 'Psalteries of Summer'],
                  hint: 'Review "Personification" from Class 10 First Flight (c10_engl_cbse_03_007) or Class 8 Honeydew.',
                  misconception: 'Students often think "supporting characters" in a poem *must* be human or animal figures with dialogue.' },
                { id: 'b', prompt: 'Explain in your own words how the Sun\'s personification ("As if Himself were optional / And had Estates of Cloud / Sufficient to enfold Him / Eternally from.', answer: 'The Trees are described through simile ("like Tassels") performing a repetitive,',
                  options: ['The Trees are described through simile ("like Tassels") performing a repetitive,', 'both are personified similarly', 'Himself', 'Estates'],
                  hint: 'Review "Personification" from Class 10 First Flight (c10_engl_cbse_03_007) or Class 8 Honeydew.',
                  misconception: 'Students often think "supporting characters" in a poem *must* be human or animal figures with dialogue.' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['If a student cannot identify personified agents: Step 1 — Have them list every verb in the poem.', 'Step 2 — Circle verbs whose subject is non-human.', 'Step 3 — For each, ask: "Does this verb describe a human action?', '(e.g., \'gossip,\' \'charm,\' \'hoist,\' \'sign a deed\')." Step 4 — Re-read the poem replacing each natural subject with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_006', difficulty: 'standard',
          question: 'The primary theme of \'Trees\' — the central idea the whole text returns to.',
          hint: 'If stuck, return to c11_eng_h_cbse_10_006 (Class 11 Theme node) and re-do its Worked.',
          misconception: 'Students often think the primary theme is "nature is beautiful" or "summer is lovely" — generic appreciation.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the speaker describes Vandyke\'s delineation of a summer day as "mean" in the final stanza.', answer: '"Mean" here means paltry, inadequate, or poor in comparison',
                  options: ['"Mean" here means paltry, inadequate, or poor in comparison', 'the painting is rude', 'nature is beautiful', 'summer is lovely'],
                  hint: 'If stuck, return to c11_eng_h_cbse_10_006 (Class 11 Theme node) and re-do its Worked Example 1.',
                  misconception: 'Students often think the primary theme is "nature is beautiful" or "summer is lovely" — generic appreciation statements.' },
                { id: 'b', prompt: 'Analyze how the image of "Hindered Flags – Sweet hoisted – / With Spices – in the Hem –" (stanza 3) contributes to the primary theme of nature\'s living.', answer: '"Hindered Flags" suggests flowers struggling upward against gravity',
                  options: ['"Hindered Flags" suggests flowers struggling upward against gravity', 'personification of flowers', 'nature is beautiful', 'summer is lovely'],
                  hint: 'If stuck, return to c11_eng_h_cbse_10_006 (Class 11 Theme node) and re-do its Worked Example 1.',
                  misconception: 'Students often think the primary theme is "nature is beautiful" or "summer is lovely" — generic appreciation statements.' }
          ],
            remediations: { 'the-primary-theme-is-nature': { steps: ['Re-read the poem *only* for the final stanza — ask: "What judgment does the speaker pass on the painting?" 2.', 'Work backward: list every image in stanzas 1-3 that gives nature *agency* (Sun\'s "whim," trees "hit – and – swung,".', 'Complete this sentence frame: "The painting fails because nature ______, but art ______." 4.', 'Revisit node c12_eng_k_cbse_10_008 (Imagery and Metaphor) to see how each device builds the case.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
