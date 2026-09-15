import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch09_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch09_p1',
    title: 'mek\'kadj tks\'kh · Part 1/3',
    subtitle: 'Hear a 15th-century weaver dismantle both temple and mosque in one couplet.',
    classLevel: 11, subject: 'hin_ar', topic: 'mek\'kadj tks\'kh · Part 1/3',
    chapters: ['c11_hin_ar_ch09'],
    nodeIds: ['c11_hin_ar_cbse_09_001', 'c11_hin_ar_cbse_09_002', 'c11_hin_ar_cbse_09_003', 'c11_hin_ar_cbse_09_004', 'c11_hin_ar_cbse_09_005', 'c11_hin_ar_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a disciple watching the loom instead of the scripture', intro: 'A Muslim-weaver saint in Kashi, persecuted by priests of both religions — and his whole theology woven into cloth metaphors.', goal: 'Situate Kabir in the Nirguna Bhakti tradition and read his weaver identity as the engine of his imagery.' },
    discovery: {
        question: 'A student writes \'Kabir rejected all religion.\' Accurate?',
        options: ['No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality', 'Yes — he mocked both temple and mosque, so he rejected both faiths', 'Yes — a weaver couldn\'t be religious', 'No — he actually founded a new organised religion'],
        answer: 'No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality',
        hook: '\'Kabir was a weaver\' is not trivia — every metaphor in his verse is a loom: warp, weft, thread, dye, knot. His caste is his poetics.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Context and Background refers to the historical, social, cultural, and biographical circumstances surrounding a literary work that shape its themes, language, and perspective.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Watch Kabir teach disciples by silently weaving an odd pattern, then map why the lesson lands through action instead of explanation.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you hear a song lyric: "The weaver\'s loom sings truth, not the temple bell." Without knowing the singer was a 15th-century Muslim weaver named Kabir.',
            decisions: [{ prompt: 'State the approximate time period, geographical region, and social identity (caste/profession) of Kabir as presented in the NCERT textbook.', options: [
                { text: 'Correct answer: Kabir lived approximately 1398–1518 CE in the region of Kashi (Varanasi),', outcome: 'Correct answer: Kabir lived approximately 1398–1518 CE in the region of Kashi (Varanasi), and.' },
                { text: 'context', outcome: 'Not quite — Students often think "context" means memorizing dates (1398, 1518) and labels (Nirguna, Julaha).', reveals: 'context-means-memorizing-dates-1398' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are asked to summarize the incident where Kabir teaches his disciples a lesson through a practical demonstration.',
            decisions: [{ prompt: 'What are the five standard stages of a narrative plot in order?', options: [
                { text: 'The five stages are: exposition, rising action, climax, falling action, and resolution', outcome: 'The five stages are: exposition, rising action, climax, falling action, and resolution.' },
                { text: 'only beginning, middle, end', outcome: 'Not quite — Students often think \'plot\' is just a summary of what happens, and they miss that narrative.', reveals: 'plot-is-just-a-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into a centuries-old haveli in Rajasthan at dawn — the air is cool, incense lingers, and a voice chants a refrain that seems to slow time.',
            decisions: [{ prompt: 'What is the primary function of the refrain ",Dyk pyks] ,Dyk pyks] ,Dyk pyks jsAA" in establishing the poem\'s atmosphere?', options: [
                { text: 'The refrain creates a hypnotic, meditative atmosphere through sonic repetition that', outcome: 'The refrain creates a hypnotic, meditative atmosphere through sonic repetition that mimics the.' },
                { text: 'it emphasizes the main idea', outcome: 'Not quite — Students often conflate "setting" with only physical place markers (village, temple, forest) and.', reveals: 'students-often-conflate-setting-with' },
                { text: 'it shows the poet\'s style', outcome: 'Not quite — Students often conflate "setting" with only physical place markers (village, temple, forest) and.', reveals: 'students-often-conflate-setting-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are listening to a friend pour their heart out in a diary entry—you instinctively know their fears, hopes, and personality without them listing.',
            decisions: [{ prompt: 'Who is the protagonist (speaker) in Dadu\'s poem presented in Chapter 9, and what is his primary spiritual stance as evident in the opening.', options: [
                { text: 'The protagonist is the poet-devotee Dadu himself (or his poetic persona), a Nirguna', outcome: 'The protagonist is the poet-devotee Dadu himself (or his poetic persona), a Nirguna Bhakta who.' },
                { text: 'Hindu devotee', outcome: 'Not quite — Students conflate the *historical Dadu* (15th-century cotton-carder) with the *poetic protagonist*.', reveals: 'students-conflate-the-historical-dadu' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a street play where the main actor represents a daily-wage worker; the people who hand him tools, deduct his wages, or share his lunch.',
            decisions: [{ prompt: 'In the poem "एक दिन एक दिन दौँका", who is the primary speaker (protagonist) and what collective identity do they represent?', options: [
                { text: 'The primary speaker is the collective "we" (गे), representing daily-wage laborers who', outcome: 'The primary speaker is the collective "we" (गे), representing daily-wage laborers who work from.' },
                { text: 'supporting characters', outcome: 'Not quite — Students often think "supporting characters" in a poem must be named individuals with dialogue.', reveals: 'supporting-characters-in-a-poem' },
                { text: '"supporting characters" in a poem must be named individuals with dialogue', outcome: 'Not quite — Students often think "supporting characters" in a poem must be named individuals with dialogue.', reveals: 'supporting-characters-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is designing a Kabir exhibit. A teammate\'s panel reads: \'Kabir: 15th-century weaver from Kashi. Born c.1398, died 1518.\' He argues the weaver detail is just a biographical fact — \'the poetry is about God, not looms.\'',
            decisions: [{ prompt: 'Why is the weaver identity the key, not trivia?', options: [
                { text: 'Show the generative matrix: nearly every metaphor in Kabir — warp and weft, thread, dye, knot, unravelling — comes from the loom; \'untying the knot\' (granthi) is weaver\'s knowledge turned theology. Add the rest of the context: a low-caste julaha in Sadhukkadi speech challenging Brahmin and Qazi orthodoxy alike — the poetry\'s radicalism is inseparable from who spoke and in whose language.', outcome: 'The panel is rewritten: context stops being a fact-file and becomes the engine — weaving isn\'t Kabir\'s day job, it\'s his entire metaphor bank.' },
                { text: 'Keep the panel — dates and profession are background; the spiritual message stands alone.', outcome: 'Stripping the weaver identity leaves the images unexplained: the loom metaphors become decoration instead of embodied argument.', reveals: 'weaver-is-trivia' },
                { text: 'Reframe him as a social reformer first — the caste angle matters, the spiritual content is secondary.', outcome: 'That inverts without understanding: Kabir\'s social challenge works THROUGH spiritual metaphor — the poetry fuses the two, so splitting them flattens both.', reveals: 'kabir-is-only-reformer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Neither Brahmin nor Qazi could claim him — the weaver\'s loom measured orthodoxy and found it hollow.',
            decisions: [{ prompt: 'What comes next? mek\'kadj tks\'kh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — mek\'kadj tks\'kh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_001', difficulty: 'standard',
          question: 'Context and Background refers to the historical, social, cultural, and.',
          hint: 'Review Class 10 History Chapter 8 (Bhakti-Sufi Traditions) sections on "Nirguna Bhakti".',
          misconception: 'Students often think "context" means memorizing dates (1398, 1518) and labels (Nirguna, Julaha) as isolated facts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Context and Background refers to the historical, social, cultural, and biographical',
                  options: ['Context and Background refers to the historical, social, cultural, and biographical', 'Plot and narrative structure refers to the organization of events in a prose text,', 'Setting in poetry refers to the spatial, temporal, and cultural backdrop against', 'Character analysis of the protagonist in poetry involves examining the speaker\'s'],
                  hint: 'Review Class 10 History Chapter 8 (Bhakti-Sufi Traditions) sections on "Nirguna Bhakti" and "Kabir".',
                  misconception: 'Students often think "context" means memorizing dates (1398, 1518) and labels (Nirguna, Julaha) as isolated facts.' }
          ],
            remediations: { 'context-means-memorizing-dates-1398': { steps: ['Have the student list 5 weaving terms from the textbook\'s Kabir selections (e.g., tana, bana, rang, katana, गांठ).', 'For each, write the literal weaving meaning AND the spiritual meaning Kabir assigns.', 'Ask: "Could a Brahmin scholar or a Sufi pir have invented *this exact metaphor cluster*?', 'Finally, rewrite one couplet replacing the weaving metaphor with a farming metaphor—discuss what is lost.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context" means memorizing dates (1398, 1518) and labels (Nirguna, Julaha) as isolated facts.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Kabir\'s poetry is primarily of historical interest; its radical edge is blunted in modern times because caste and religious orthodoxy have.', answer: 'Strong critique: Kabir\'s edge remains sharp',
                  options: ['Strong critique: Kabir\'s edge remains sharp', 'context'],
                  hint: 'Review Class 10 History Chapter 8 (Bhakti-Sufi Traditions) sections on "Nirguna Bhakti" and "Kabir".',
                  misconception: 'Students often think "context" means memorizing dates (1398, 1518) and labels (Nirguna, Julaha) as isolated facts.' }
          ],
            remediations: { 'context-means-memorizing-dates-1398': { steps: ['Have the student list 5 weaving terms from the textbook\'s Kabir selections (e.g., tana, bana, rang, katana, गांठ).', 'For each, write the literal weaving meaning AND the spiritual meaning Kabir assigns.', 'Ask: "Could a Brahmin scholar or a Sufi pir have invented *this exact metaphor cluster*?', 'Finally, rewrite one couplet replacing the weaving metaphor with a farming metaphor—discuss what is lost.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the organization of events in a prose.',
          hint: 'Review the plot diagram (Freytag\'s pyramid) and practice labeling stages in a familiar.',
          misconception: 'Students often think \'plot\' is just a summary of what happens, and they miss that narrative structure includes the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure refers to the organization of events in a prose text,',
                  options: ['Plot and narrative structure refers to the organization of events in a prose text,', 'Context and Background refers to the historical, social, cultural, and biographical', 'Setting in poetry refers to the spatial, temporal, and cultural backdrop against', 'Character analysis of the protagonist in poetry involves examining the speaker\'s'],
                  hint: 'Review the plot diagram (Freytag\'s pyramid) and practice labeling stages in a familiar short story.',
                  misconception: 'Students often think \'plot\' is just a summary of what happens, and they miss that narrative structure includes the author\'s deliberate.' }
          ],
            remediations: { 'plot-is-just-a-summary': { steps: ['If a student confuses plot summary with structure analysis, guide them to: (1) Draw a plot diagram for the passage.', '(2) For each stage, ask: \'What does the author want me to feel/think here?\' (3) Compare the diagram with a simple.', '(4) Practice writing one sentence per stage using the phrase \'The author uses [stage] to...\''], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the spatial, temporal, and cultural backdrop.',
          hint: 'Review the concept of "cultural setting as activated tradition" from.',
          misconception: 'Students often conflate "setting" with only physical place markers (village, temple, forest) and "atmosphere" with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting in poetry refers to the spatial, temporal, and cultural backdrop against',
                  options: ['Setting in poetry refers to the spatial, temporal, and cultural backdrop against', 'Context and Background refers to the historical, social, cultural, and biographical', 'Plot and narrative structure refers to the organization of events in a prose text,', 'Character analysis of the protagonist in poetry involves examining the speaker\'s'],
                  hint: 'Review the concept of "cultural setting as activated tradition" from c11_hin_ar_cbse_09_001.',
                  misconception: 'Students often conflate "setting" with only physical place markers (village, temple, forest) and "atmosphere" with simple mood labels.' }
          ],
            remediations: { 'students-often-conflate-setting-with': { steps: ['If the student cannot distinguish physical setting from metaphysical setting, have them: (1) List every noun in the.', '(2) List every verb and its mood — they will find imperatives and infinitives denoting inner action.', '(3) Map the image sequence: lamp (ck<+h dk"V) → fire (vosQyk) → burning (fuHkZ;) → awakening (xjckauka).', '(4) Ask: "Where does this happen?" Guide them to answer: "In the practitioner\'s consciousness." (5) Then replay the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves examining the.',
          hint: 'If stuck, re-read the "Before You Read" (node 001) section on "Dadu\'s philosophy" and the.',
          misconception: 'Students conflate the *historical Dadu* (15th-century cotton-carder) with the *poetic protagonist* (the timeless "I".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in poetry involves examining the speaker\'s',
                  options: ['Character analysis of the protagonist in poetry involves examining the speaker\'s', 'Context and Background refers to the historical, social, cultural, and biographical', 'Plot and narrative structure refers to the organization of events in a prose text,', 'Setting in poetry refers to the spatial, temporal, and cultural backdrop against'],
                  hint: 'If stuck, re-read the "Before You Read" (node 001) section on "Dadu\'s philosophy" and the poem\'s.',
                  misconception: 'Students conflate the *historical Dadu* (15th-century cotton-carder) with the *poetic protagonist* (the timeless "I" of the poem), treating.' }
          ],
            remediations: { 'students-conflate-the-historical-dadu': { steps: ['**Separate Poet from Persona**: Have the student draw a two-column table: "Historical Dadu (from bio note)" vs.', '"Poetic Speaker (from poem lines)." Fill with 3 points each.', '**Tone Mapping**: Ask them to read the "mocking" lines aloud in three tones: angry, sarcastic, compassionate.', 'Discuss which fits the Guru-disciple context (compassionate urgency).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_005', difficulty: 'standard',
          question: 'Supporting characters in poetry are figures who interact with the main.',
          hint: 'Review the "Character Analysis: Protagonist" node (c11_hin_ar_cbse_09_004) and the prose.',
          misconception: 'Students often think "supporting characters" in a poem must be named individuals with dialogue.',
          parts: [
                { id: 'a', prompt: 'Compare the function of the "sharp sickle" (ck<+h dk"V) and the "clerk" (O;kid) in the poem.', answer: 'The sickle is the tool of production that the laborer wields but does not own',
                  options: ['The sickle is the tool of production that the laborer wields but does not own', 'supporting characters', '"supporting characters" in a poem must be named individuals with dialogue'],
                  hint: 'Review the "Character Analysis: Protagonist" node (c11_hin_ar_cbse_09_004) and the prose section.',
                  misconception: 'Students often think "supporting characters" in a poem must be named individuals with dialogue.' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['If a student cannot identify supporting characters, guide them: (1) Re-read the poem circling every noun that denotes.', '(2) For each, ask: "Does this figure act upon the protagonist or react to them?" (3) Use the prose background to match.', '(4) Practice writing one-sentence character sketches: "The clerk represents the surveillance of labor."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_006', difficulty: 'standard',
          question: 'The primary theme is the central, unifying idea or universal truth that the.',
          hint: 'Review "narrative arc in poetry" (node 002) — specifically, practice identifying the.',
          misconception: 'Students conflate the *primary theme* with the *most repeated word* or the *first stanza\'s topic*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme is the central, unifying idea or universal truth that the poem explores',
                  options: ['The primary theme is the central, unifying idea or universal truth that the poem explores', 'Context and Background refers to the historical, social, cultural, and biographical', 'Plot and narrative structure refers to the organization of events in a prose text,', 'Setting in poetry refers to the spatial, temporal, and cultural backdrop against'],
                  hint: 'Review "narrative arc in poetry" (node 002) — specifically, practice identifying the *conflict*.',
                  misconception: 'Students conflate the *primary theme* with the *most repeated word* or the *first stanza\'s topic*.' }
          ],
            remediations: { 'students-conflate-the-primary-theme': { steps: ['Give the student a two-column template: "बाह्य साधन (External Means)" and "आंतरिक साधन (Internal Means)." 2.', 'Ask them to fill it using *only* concrete nouns/verbs from the poem (e.g., मंदिर, माला, जप → outside; साँस, सुरति, सहज.', 'Have them write one sentence starting: "The poem argues that ________ is superior to ________ because ________." 4.', 'Verify the \'because\' clause uses a *metaphor* from the poem (e.g., "because the body is the true temple").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
