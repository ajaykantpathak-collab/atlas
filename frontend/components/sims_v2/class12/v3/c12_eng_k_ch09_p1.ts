import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch09_p1: SimDef = {
    id: 'v3_c12_eng_k_ch09_p1',
    title: 'Poems by Wordsworth (Poem) · Part 1/3',
    subtitle: '300 lines dreamed, a knock at the door, and a poem left unfinished on purpose',
    classLevel: 12, subject: 'eng_k', topic: 'Poems by Wordsworth (Poem) · Part 1/3',
    chapters: ['c12_eng_k_ch09'],
    nodeIds: ['c12_eng_k_cbse_09_001', 'c12_eng_k_cbse_09_002', 'c12_eng_k_cbse_09_003', 'c12_eng_k_cbse_09_004', 'c12_eng_k_cbse_09_005', 'c12_eng_k_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Romantic poetry critic', intro: 'An emperor\'s pleasure-dome, an opium dream, one ill-timed visitor — and English literature\'s most famous fragment.', goal: 'Read Kubla Khan through its dream composition, Romantic aims and the power of the unfinished fragment.' },
    discovery: {
        question: 'Coleridge dreams 300 perfect lines of Kubla Khan, wakes, writes — and a \'person from Porlock\' knocks. The rest vanishes forever. Is that a tragedy for literature?',
        options: ['Maybe the opposite — the fragment perfectly performs the Romantic idea that imagination outruns any page; its incompleteness is the aesthetic', 'Pure tragedy — half a masterpiece lost', 'It was never a real dream anyway', 'He should have locked the door'],
        answer: 'Maybe the opposite — the fragment perfectly performs the Romantic idea that imagination outruns any page; its incompleteness is the aesthetic',
        hook: 'Coleridge\'s aim was \'presenting the supernatural as real\' — Xanadu\'s dome, the sacred river, the demon-lover told flat as fact. Where Wordsworth made the ordinary strange, Coleridge made the strange ordinary. The fragment isn\'t broken; it\'s a glimpse of infinity the page couldn\'t hold.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" for *Kubla Khan* provides the essential biographical, historical, and compositional framework needed to interpret the poem: Coleridge’s role in the Romantic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter Xanadu as a Romantic: place the real Mongol emperor beside the dream palace, weigh the Porlock knock as loss or gift, and read how the supernatural gets narrated like a news report.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you open your textbook and see a poem titled *Kubla Khan* with a subtitle *A Vision in a Dream: A Fragment*. You wonder: *Why is it called a fragment?',
            decisions: [{ prompt: 'Who was the historical Kubla Khan, and what is his significance in world history as referenced in the NCERT background note?', options: [
                { text: 'Kubla Khan (also spelled Kublai Khan) was the grandson of Genghis Khan and the founder of', outcome: 'Kubla Khan (also spelled Kublai Khan) was the grandson of Genghis Khan and the founder of the.' },
                { text: 'a fictional king from a fairy tale', outcome: 'Not quite — Students often believe **Coleridge intentionally left the poem unfinished as an artistic.', reveals: 'coleridge-intentionally-left-the-poem' },
                { text: 'a Persian poet', outcome: 'Not quite — Students often believe **Coleridge intentionally left the poem unfinished as an artistic.', reveals: 'coleridge-intentionally-left-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you wake from a vivid dream and try to tell a friend: the scenes jump, logic bends, and the ending feels cut off.',
            decisions: [{ prompt: 'What is the primary narrative frame of *Kubla Khan* — i.e., who is speaking in the first three stanzas, and how does that change in the.', options: [
                { text: 'The first three stanzas use a third-person omniscient narrator describing Kubla Khan’s', outcome: 'The first three stanzas use a third-person omniscient narrator describing Kubla Khan’s decree and.' },
                { text: 'the poet speaks throughout', outcome: 'Not quite — Students often say “*Kubla Khan* has no plot because it’s a fragment.” They confuse *plot* (a.', reveals: 'students-often-say-kubla-khan' },
                { text: '*Kubla Khan* has no plot', outcome: 'Not quite — Students often say “*Kubla Khan* has no plot because it’s a fragment.” They confuse *plot* (a.', reveals: 'students-often-say-kubla-khan' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into an ancient fort at sunset — the stone walls glow gold, the air smells of dust and jasmine, and you feel both peace and a shiver of the.',
            decisions: [{ prompt: 'What are the three distinct physical settings presented in "Kubla Khan," and what single phrase from the text best identifies each?', options: [
                { text: 'The three settings are: (1) Xanadu\'s pleasure-dome grounds', outcome: 'The three settings are: (1) Xanadu\'s pleasure-dome grounds — "stately pleasure-dome decree".' },
                { text: 'stately pleasure-dome decree', outcome: 'Not quite — Students treat setting as a static list of places ("Xanadu, chasm, river, ocean") and atmosphere.', reveals: 'students-treat-setting-as-a' },
                { text: 'twice five miles of fertile ground', outcome: 'Not quite — Students treat setting as a static list of places ("Xanadu, chasm, river, ocean") and atmosphere.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are a historian who finds a poet\'s dream-vision about a real emperor. How would you separate the historical ruler from the poetic creation?',
            decisions: [{ prompt: 'What is the only direct action attributed to Kubla Khan in the poem, and in which line does it occur?', options: [
                { text: 'The only direct action is "decree" in line 2: "In Xanadu did Kubla Khan / A stately', outcome: 'The only direct action is "decree" in line 2: "In Xanadu did Kubla Khan / A stately pleasure-dome.' },
                { text: 'decree', outcome: 'Not quite — Students often conflate the historical Kubla Khan (13th-century Mongol emperor, founder of the Yuan.', reveals: 'students-often-conflate-the-historical' },
                { text: 'In Xanadu did Kubla Khan / A stately pleasure-dome decree', outcome: 'Not quite — Students often conflate the historical Kubla Khan (13th-century Mongol emperor, founder of the Yuan.', reveals: 'students-often-conflate-the-historical' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a surreal film where the main character falls into a trance and sees a king building a pleasure dome, a haunted chasm with a wailing.',
            decisions: [{ prompt: 'List the four supporting characters in "Kubla Khan" and give the stanza number where each first appears.', options: [
                { text: 'The four supporting characters are: (1) Kubla Khan – Stanza 1', outcome: 'The four supporting characters are: (1) Kubla Khan – Stanza 1; (2) The woman wailing for her.' },
                { text: 'sunless sea', outcome: 'Not quite — Students often treat the supporting characters in "Kubla Khan" as decorative pictures — "Coleridge.', reveals: 'students-often-treat-the-supporting' },
                { text: 'caves of ice', outcome: 'Not quite — Students often treat the supporting characters in "Kubla Khan" as decorative pictures — "Coleridge.', reveals: 'students-often-treat-the-supporting' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are asked in the board exam: "What is the central theme of *Kubla Khan*?" Many students panic and start retelling the \'story\' of the pleasure dome.',
            decisions: [{ prompt: '**REMEMBER:** State the primary theme of *Kubla Khan* in a single thematic sentence (not a summary of events).', options: [
                { text: '**Correct answer:** The primary theme is the transcendent power of poetic imagination to', outcome: '**Correct answer:** The primary theme is the transcendent power of poetic imagination to create.' },
                { text: 'The poem is about Kubla Khan building a pleasure dome', outcome: 'Not quite — **Misconception:** "The primary theme is the *fragmentary nature of the poem* or *the supernatural*.', reveals: 'misconception-the-primary-theme-is' },
                { text: 'It\'s about a dream Coleridge had', outcome: 'Not quite — **Misconception:** "The primary theme is the *fragmentary nature of the poem* or *the supernatural*.', reveals: 'misconception-the-primary-theme-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A writer is mid-flow on a dazzling draft when a \'person from Porlock\' — a routine visitor — breaks the trance; the vision never fully returns.',
            decisions: [{ prompt: 'What does the Kubla Khan story teach a team managing creative work?', options: [
                { text: 'Protect uninterrupted flow — Coleridge\'s lost dream shows a vision in motion can\'t simply be \'resumed later\'; guard creative trance and capture what\'s salvageable rather than demanding instant re-entry.', outcome: 'The fragment is a wound, not a design: interruption destroyed the vision, and the surviving piece is still worth keeping.' },
                { text: 'No protection needed — you can always pick a thought back up where you left it.', outcome: 'Coleridge tried for hours and got only fragments; vision in flow is not a parked car.', reveals: 'flow-is-resumable' },
                { text: 'Discard the fragment — unfinished work is failed work.', outcome: 'Kubla Khan became a touchstone precisely as a fragment; incompleteness can still be monumental.', reveals: 'incomplete-means-worthless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend a fragment as a finished statement — and tell vision from fancy. The dome in air was never meant to be completed.',
            decisions: [{ prompt: 'What comes next? Poems by Wordsworth (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Poems by Wordsworth (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" for *Kubla Khan* provides the.',
          hint: 'Review the "Introduction to Romantic Poetry" section in Class 11 NCERT *Woven Words* (or.',
          misconception: 'Students often believe **Coleridge intentionally left the poem unfinished as an artistic statement** (like a modernist.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why *Kubla Khan* is subtitled "A Fragment." What specific event interrupted Coleridge’s writing process?', answer: 'The poem is a fragment',
                  options: ['The poem is a fragment', 'Coleridge chose to leave it incomplete for artistic effect', 'he forgot the dream'],
                  hint: 'Review the "Introduction to Romantic Poetry" section in Class 11 NCERT *Woven Words* (or Hornbill).',
                  misconception: 'Students often believe **Coleridge intentionally left the poem unfinished as an artistic statement** (like a modernist fragment).' }
          ],
            remediations: { 'coleridge-intentionally-left-the-poem': { steps: ['If a student holds this misconception: 1.', 'Re-read the NCERT "Before You Read" box aloud, highlighting the phrases "an interruption caused an irreparable break".', 'Ask: "Does the text say Coleridge *chose* to stop?', 'What word shows it was accidental?" (Answer: "interruption," "chance visitor.") 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to the deliberate arrangement.',
          hint: 'If segmentation is difficult, revisit “stanza-by-stanza summary” practice.',
          misconception: 'Students often say “*Kubla Khan* has no plot because it’s a fragment.” They confuse *plot* (a linear cause-effect.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of *in media res* to the opening lines: “In Xanadu did Kubla Khan / A stately pleasure-dome decree.” What effect does starting with the.', answer: 'Starting *in media res* plunges the reader directly into the act of creation',
                  options: ['Starting *in media res* plunges the reader directly into the act of creation', 'it introduces the setting', '*Kubla Khan* has no plot'],
                  hint: 'If segmentation is difficult, revisit “stanza-by-stanza summary” practice in c7_engl_ch01_011 and.',
                  misconception: 'Students often say “*Kubla Khan* has no plot because it’s a fragment.” They confuse *plot* (a linear cause-effect chain) with *narrative.' },
                { id: 'b', prompt: 'Analyze the discordant note (“Ancestral voices prophesying war”) at the end of the third stanza.', answer: 'The “sunny pleasure dome with caves of ice” is a “miracle of rare device”',
                  options: ['The “sunny pleasure dome with caves of ice” is a “miracle of rare device”', 'just a sound effect', '*Kubla Khan* has no plot'],
                  hint: 'If segmentation is difficult, revisit “stanza-by-stanza summary” practice in c7_engl_ch01_011 and.',
                  misconception: 'Students often say “*Kubla Khan* has no plot because it’s a fragment.” They confuse *plot* (a linear cause-effect chain) with *narrative.' }
          ],
            remediations: { 'students-often-say-kubla-khan': { steps: ['Re-read the poem aloud, physically drawing a line between each stanza and labelling the setting/voice (e.g., “Stanza 1.', 'Trace the river Alph on a rough map: Xanadu → chasm → fountain → meander → caverns → ocean.', 'Write one sentence for each segment summarizing its narrative function (e.g., “The chasm stanza introduces supernatural.', 'Re-attempt Diagnostic Question 4; if still stuck, review narrative poetry basics in c6_english_u1_006 and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often say “*Kubla Khan* has no plot because it’s a fragment.” They confuse *plot* (a linear cause-effect.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: “The poem’s fragmentary form is its meaning.” Use the shift from the damsel’s song to the poet’s ambition (“I would build that dome.', answer: 'The claim is defensible',
                  options: ['The claim is defensible', '*Kubla Khan* has no plot'],
                  hint: 'If segmentation is difficult, revisit “stanza-by-stanza summary” practice in c7_engl_ch01_011 and.',
                  misconception: 'Students often say “*Kubla Khan* has no plot because it’s a fragment.” They confuse *plot* (a linear cause-effect chain) with *narrative.' }
          ],
            remediations: { 'students-often-say-kubla-khan': { steps: ['Re-read the poem aloud, physically drawing a line between each stanza and labelling the setting/voice (e.g., “Stanza 1.', 'Trace the river Alph on a rough map: Xanadu → chasm → fountain → meander → caverns → ocean.', 'Write one sentence for each segment summarizing its narrative function (e.g., “The chasm stanza introduces supernatural.', 'Re-attempt Diagnostic Question 4; if still stuck, review narrative poetry basics in c6_english_u1_006 and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and social environment where the.',
          hint: 'Review c11_eng_h_cbse_01_008 (Imagery and Metaphor) worked examples on sensory.',
          misconception: 'Students treat setting as a static list of places ("Xanadu, chasm, river, ocean") and atmosphere as a single adjective.',
          parts: [
                { id: 'a', prompt: 'What are the three distinct physical settings presented in "Kubla Khan," and what single phrase from the text best identifies each?', answer: 'The three settings are: (1) Xanadu\'s pleasure-dome grounds',
                  options: ['The three settings are: (1) Xanadu\'s pleasure-dome grounds', 'stately pleasure-dome decree', 'twice five miles of fertile ground', 'deep romantic chasm'],
                  hint: 'Review c11_eng_h_cbse_01_008 (Imagery and Metaphor) worked examples on sensory classification, then.',
                  misconception: 'Students treat setting as a static list of places ("Xanadu, chasm, river, ocean") and atmosphere as a single adjective ("magical," "scary,".' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have the student re-read only stanzas 1-2 aloud, circling every noun and verb.', 'Ask: "Which words belong to the dome\'s world?', 'Which belong to the chasm\'s world?', 'Then: "Read the chasm column aloud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a poem involves examining the central.',
          hint: 'If stuck, re-read Stanza 1 and Stanza 3 side-by-side: the first shows Kubla Khan\'s.',
          misconception: 'Students often conflate the historical Kubla Khan (13th-century Mongol emperor, founder of the Yuan dynasty) with.',
          parts: [
                { id: 'a', prompt: 'Analyze how the poem\'s fragmentary structure (the interruption by the "person from Porlock") affects our understanding of Kubla Khan as a protagonist.', answer: 'The fragmentary form mirrors Kubla Khan\'s own incomplete dominion',
                  options: ['The fragmentary form mirrors Kubla Khan\'s own incomplete dominion', 'mistake', 'accident'],
                  hint: 'If stuck, re-read Stanza 1 and Stanza 3 side-by-side: the first shows Kubla Khan\'s outward command.',
                  misconception: 'Students often conflate the historical Kubla Khan (13th-century Mongol emperor, founder of the Yuan dynasty) with Coleridge\'s poetic.' }
          ],
            remediations: { 'students-often-conflate-the-historical': { steps: ['If a student persists in using historical facts, assign this remediation: 1) Re-read the preface and the poem.', '2) Write a two-column table: "Historical Fact (from preface/outside knowledge)" vs.', '"Poetic Portrayal (from poem lines)." 3) Re-attempt Diagnostic Question 1 and 2, citing only poem lines.', '4) Discuss with teacher: "Why does Coleridge choose to show only these two actions?" This isolates the textual Kubla.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_005', difficulty: 'standard',
          question: 'Supporting characters in a poem are figures who appear alongside the.',
          hint: 'If stuck, review the protagonist analysis and the poem\'s summary (c12_eng_k_cbse_09_001).',
          misconception: 'Students often treat the supporting characters in "Kubla Khan" as decorative pictures — "Coleridge put in a king,.',
          parts: [
                { id: 'a', prompt: 'List the four supporting characters in "Kubla Khan" and give the stanza number where each first appears.', answer: 'The four supporting characters are: (1) Kubla Khan – Stanza 1',
                  options: ['The four supporting characters are: (1) Kubla Khan – Stanza 1', 'sunless sea', 'caves of ice', 'the "sunless sea" or "caves of ice" as characters'],
                  hint: 'If stuck, review the protagonist analysis and the poem\'s summary (c12_eng_k_cbse_09_001) to recall.',
                  misconception: 'Students often treat the supporting characters in "Kubla Khan" as decorative pictures — "Coleridge put in a king, a ghost woman, some.' },
                { id: 'b', prompt: 'Apply the concept of "historical vs. poetic truth" to Kubla Khan: How does Coleridge transform the historical Mongol emperor into a symbol of the imagination?', answer: 'Step 1: Recall the historical Kubla Khan (13th‑century Mongol ruler of China)',
                  options: ['Step 1: Recall the historical Kubla Khan (13th‑century Mongol ruler of China)', 'he built a palace in China'],
                  hint: 'If stuck, review the protagonist analysis and the poem\'s summary (c12_eng_k_cbse_09_001) to recall.',
                  misconception: 'Students often treat the supporting characters in "Kubla Khan" as decorative pictures — "Coleridge put in a king, a ghost woman, some.' }
          ],
            remediations: { 'students-often-treat-the-supporting': { steps: ['Have the student re‑read only Stanzas 2‑4, underlining every proper noun and personified figure.', 'Create a two‑column table: Column A = Character, Column B = Key Lines + Associated Images.', 'For each row, ask: "What abstract idea does this cluster of images suggest?" (e.g., "caves of ice" + "sunny dome" →.', 'Return to the Class 11 poetry node on supporting characters (c11_eng_w_cbse_01_005) and review the distinction between.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea or insight about.',
          hint: 'If stuck, return to **c12_eng_k_cbse_09_002 (Plot/Narrative Structure)** and physically.',
          misconception: '**Misconception:** "The primary theme is the *fragmentary nature of the poem* or *the supernatural* or *the Orient*.".',
          parts: [
                { id: 'a', prompt: '**ANALYZE:** Compare the \'mighty fountain\' (lines 19–28) and the \'Abyssinian maid\'s symphony\' (lines 37–42) as metaphors for the creative source.', answer: '**Correct answer:** The fountain is **chaotic, violent, involuntary**',
                  options: ['**Correct answer:** The fountain is **chaotic, violent, involuntary**', 'both are sources of inspiration'],
                  hint: 'If stuck, return to **c12_eng_k_cbse_09_002 (Plot/Narrative Structure)** and physically draw the.',
                  misconception: '**Misconception:** "The primary theme is the *fragmentary nature of the poem* or *the supernatural* or *the Orient*." **Why students make.' }
          ],
            remediations: { 'misconception-the-primary-theme-is': { steps: ['**Remediation path (3 steps):** 1.', '**Revisit node c12_eng_k_cbse_09_002 (Plot/Narrative Structure):** Re-map the poem\'s two movements (Kubla\'s decree →.', 'Draw a two-column table: Column A = Kubla\'s actions/images; Column B = Poet\'s actions/images.', '**Revisit node c12_eng_k_cbse_09_003 (Setting/Atmosphere):** Identify how the \'chasm\' and \'fountain\' function.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
