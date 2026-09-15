import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch01_p1: SimDef = {
    id: 'v3_c12_hin_a_ch01_p1',
    title: 'lw;Zdkar f=kikBh ^fujkyk · Part 1/3',
    subtitle: 'Same god, different century — context is the lens',
    classLevel: 12, subject: 'hin_a', topic: 'lw;Zdkar f=kikBh ^fujkyk · Part 1/3',
    chapters: ['c12_hin_a_ch01'],
    nodeIds: ['c12_hin_a_cbse_01_001', 'c12_hin_a_cbse_01_002', 'c12_hin_a_cbse_01_003', 'c12_hin_a_cbse_01_004', 'c12_hin_a_cbse_01_005', 'c12_hin_a_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi poetry scholar', intro: 'Before a single line of Tulsidas, there\'s a world to rebuild — the Bhakti age that made his poems possible.', goal: 'Use contextual reading — author, era, movement, language — to situate Tulsidas\'s poems in the Bhakti tradition.' },
    discovery: {
        question: 'Same poet Tulsidas, same devotion — but read him beside Nirala and the poems could be from different universes. What separates them?',
        options: ['Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does', 'Just personal taste', 'Only the language differs', 'Nothing — poetry is timeless'],
        answer: 'Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does',
        hook: '\'Before You Read\' isn\'t optional décor — without it, Tulsidas\'s Rama reads as just mythology instead of a personal god open to every caste. Three questions unlock any poem: whose life, which movement, what tongue.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" refers to the preparatory step of understanding the author\'s life, historical period, social milieu, literary movement, and key themes before engaging with.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Build the lens before the poem: reconstruct Tulsidas\'s Bhakti world — Mughal era, Awadhi, devotion for all — and test how context changes what a single word can mean.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a historical movie without knowing the era, the key figures, or the events depicted. You would miss crucial nuances.',
            decisions: [{ prompt: 'What is the primary purpose of the "Before You Read" section in a literature textbook?', options: [
                { text: 'The primary purpose is to provide the reader with essential background information about', outcome: 'The primary purpose is to provide the reader with essential background information about the.' },
                { text: 'to summarize the story', outcome: 'Not quite — Students often treat "Before You Read" as a passive reading of the author\'s birth/death dates and.', reveals: 'students-often-treat-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are listening to a friend describe a vivid dream — they don’t tell it chronologically but in fragments of feeling and image.',
            decisions: [{ prompt: 'What is the primary difference between a narrative poem with a conventional plot (like a ballad) and the lyrical narrative structure found.', options: [
                { text: 'A conventional narrative poem follows a sequence of external events (exposition, rising', outcome: 'A conventional narrative poem follows a sequence of external events (exposition, rising action.' },
                { text: 'both have a beginning, middle, and end', outcome: 'Not quite — Students often think “plot” only means “what happens next” in a story.', reveals: 'plot-only-means-what-happens' },
                { text: 'what happens next', outcome: 'Not quite — Students often think “plot” only means “what happens next” in a story.', reveals: 'plot-only-means-what-happens' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re standing in a parched village field during a brutal drought — the cracked earth, the silent huts, the desperate eyes.',
            decisions: [{ prompt: 'In the excerpt "nsolsuk dk xhr" from *LoaQnxqIr*, which specific physical details establish the setting as a village suffering from severe.', options: [
                { text: 'Correct details include: (1) "gw.kksa osQ vkØe.k ls vk;kZorZ ladV esa gSA" (village', outcome: 'Correct details include: (1) "gw.kksa osQ vkØe.k ls vk;kZorZ ladV esa gSA" (village isolated due.' },
                { text: 'village', outcome: 'Not quite — Students treat "setting" and "atmosphere" as synonyms or sequential (first setting, then.', reveals: 'students-treat-setting-and-atmosphere' },
                { text: 'drought', outcome: 'Not quite — Students treat "setting" and "atmosphere" as synonyms or sequential (first setting, then.', reveals: 'students-treat-setting-and-atmosphere' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are reading a poem where the speaker pours out their heart about lost love or love for the motherland.',
            decisions: [{ prompt: 'What is the primary difference between analyzing a protagonist in a short story versus analyzing the poetic speaker in a lyric poem?', options: [
                { text: 'In a short story, the protagonist is a constructed character with external actions,', outcome: 'In a short story, the protagonist is a constructed character with external actions, dialogue, and.' },
                { text: 'actions', outcome: 'Not quite — Students often treat the poetic speaker as the poet themselves (Tulsidas, 1889–1937) and write.', reveals: 'students-often-treat-the-poetic' },
                { text: 'utterances', outcome: 'Not quite — Students often treat the poetic speaker as the poet themselves (Tulsidas, 1889–1937) and write.', reveals: 'students-often-treat-the-poetic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your batch wants a song for the annual day honouring the school\'s retiring matron. The lyricist drafts a literal timeline — joined in this year, served in that year — and it reads like a résumé set to music.',
            decisions: [{ prompt: 'How does Nirala\'s structuring of \'देवसेना का गीत\' and \'कानेसरिया का गीत\' suggest fixing it?', options: [
                { text: 'Rebuild it as an emotional arc, not a résumé — open inside one personal moment of hers, let the feeling turn from private memory to collective debt, and end on the batch\'s open pledge — the way the poems move from private grief to an appeal the listener must carry.', outcome: 'The chapter\'s insight is that a lyric\'s plot is the journey of the speaker\'s consciousness — emotional beats do the narrative work events do in prose.' },
                { text: 'Keep the timeline — a tribute should record the facts of her service accurately.', outcome: 'That\'s the event-plot assumption the chapter corrects: a list of dates documents a career but never becomes a song — without an emotional pivot the audience is informed, not moved.', reveals: 'facts-make-a-song' },
                { text: 'Make it fully abstract — drop her story and write only grand verses about service.', outcome: 'The poems earn their collective ending by starting inside a specific grief; pure abstraction skips the concrete wound that makes the final appeal land.', reveals: 'abstract-is-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now approach any Hindi text with the reader\'s toolkit — biography, movement and milieu as the keys that turn \'old verse\' into argument.',
            decisions: [{ prompt: 'What comes next? lw;Zdkar f=kikBh ^fujkyk · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — lw;Zdkar f=kikBh ^fujkyk · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" refers to the preparatory step.',
          hint: 'If stuck, review the "Before You Read" section of any Class 11 Aroh chapter (e.g.',
          misconception: 'Students often treat "Before You Read" as a passive reading of the author\'s birth/death dates and a list of works.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" refers to the preparatory step of understanding',
                  options: ['"Before You Read: Context and Background" refers to the preparatory step of understanding', 'Plot and Narrative Structure in poetry refers to the organized sequence of emotions,', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist in poetry involves examining the speaker\'s'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Aroh chapter (e.g.',
                  misconception: 'Students often treat "Before You Read" as a passive reading of the author\'s birth/death dates and a list of works, memorizing them for.' }
          ],
            remediations: { 'students-often-treat-before-you': { steps: ['If a student cannot connect context to text, guide them through a three-step exercise: (1) Pick one fact from the.', '(2) Find one line in the poem that shows Sanskrit influence (e.g., a tatsama word or complex compound).', '(3) Write one sentence explaining the link.', 'Repeat with two more facts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure in poetry refers to the organized sequence.',
          hint: 'Review Class 11 Antra Chapter 1 poem analysis (c11_hin_ar_cbse_01_002) — specifically the.',
          misconception: 'Students often think “plot” only means “what happens next” in a story.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of ‘emotional plot points’ to the first stanza of "dkusZfy;k dk xhr".', answer: 'Beat 1: Pride and ownership (“vjQ.k ;g eèkqe; ns\'k gekjk!”)',
                  options: ['Beat 1: Pride and ownership (“vjQ.k ;g eèkqe; ns\'k gekjk!”)', 'what happens next', '“plot” only means “what happens next” in a story'],
                  hint: 'Review Class 11 Antra Chapter 1 poem analysis (c11_hin_ar_cbse_01_002) — specifically the worked.',
                  misconception: 'Students often think “plot” only means “what happens next” in a story.' }
          ],
            remediations: { 'plot-only-means-what-happens': { steps: ['Have the student reread "nsolsuk dk xhr" and highlight every line where the speaker uses “I” (eSaus, esjh, eq>ls).', 'Ask them to label the emotion in each highlighted line (grief, pride, anger, resolve, plea).', 'Draw arrows between the labels to visualize the emotional sequence.', 'Repeat for "dkusZfy;k dk xhr" using “we/our” (gekjk, esjs, losjs) to trace the collective voice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think “plot” only means “what happens next” in a story.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: “The narrative structure of these poems is weak because they lack clear events.” Defend or refute using evidence from both poems.', answer: 'Refute',
                  options: ['Refute', 'what happens next', '“plot” only means “what happens next” in a story'],
                  hint: 'Review Class 11 Antra Chapter 1 poem analysis (c11_hin_ar_cbse_01_002) — specifically the worked.',
                  misconception: 'Students often think “plot” only means “what happens next” in a story.' }
          ],
            remediations: { 'plot-only-means-what-happens': { steps: ['Have the student reread "nsolsuk dk xhr" and highlight every line where the speaker uses “I” (eSaus, esjh, eq>ls).', 'Ask them to label the emotion in each highlighted line (grief, pride, anger, resolve, plea).', 'Draw arrows between the labels to visualize the emotional sequence.', 'Repeat for "dkusZfy;k dk xhr" using “we/our” (gekjk, esjs, losjs) to trace the collective voice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a narrative.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_01_003 "Text: Setting and Atmosphere" worked examples.',
          misconception: 'Students treat "setting" and "atmosphere" as synonyms or sequential (first setting, then atmosphere).',
          parts: [
                { id: 'a', prompt: 'Apply the PEEL structure to write a 4-sentence answer analyzing how the line "eSaus Hkzeo\'k thou lafpr] eèkqdfj;ksa dh Hkh[k yqVkbZ" from "nsolsuk dk xhr" uses.', answer: 'PEEL response: Point',
                  options: ['PEEL response: Point', 'It shows he is sad', 'paraphrases without the PEEL structure (e'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_01_003 "Text: Setting and Atmosphere" worked examples — practice.',
                  misconception: 'Students treat "setting" and "atmosphere" as synonyms or sequential (first setting, then atmosphere).' }
          ],
            remediations: { 'students-treat-setting-and-atmosphere': { steps: ['If a student cannot integrate setting and atmosphere, assign this 3-step remediation: (1) Re-read.', '(2) Take the first excerpt ("nsolsuk dk xhr") and create a two-column table: Column A = every setting detail (quote).', '(3) Write three PEEL paragraphs using only this table.', 'Re-diagnose with Diagnostic Question 3 — if PEEL structure holds with textual evidence, the misconception is resolved.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves examining the.',
          hint: 'Review Class 11 node c11_hin_ar_cbse_01_004 (Character Analysis: Protagonist) for the.',
          misconception: 'Students often treat the poetic speaker as the poet themselves (Tulsidas, 1889–1937) and write biographical details.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in poetry involves examining the speaker\'s',
                  options: ['Character analysis of the protagonist in poetry involves examining the speaker\'s', '"Before You Read: Context and Background" refers to the preparatory step of understanding', 'Plot and Narrative Structure in poetry refers to the organized sequence of emotions,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review Class 11 node c11_hin_ar_cbse_01_004 (Character Analysis: Protagonist) for the PEEL.',
                  misconception: 'Students often treat the poetic speaker as the poet themselves (Tulsidas, 1889–1937) and write biographical details instead of analyzing.' }
          ],
            remediations: { 'students-often-treat-the-poetic': { steps: ['If a student conflates poet and speaker, have them: (1) Re-read the biographical note and underline facts about the.', '(2) Re-read the poem and underline every "I/my/me" statement.', '(3) Make a two-column table: "Poet\'s Life" vs.', '(4) Identify three details in the poem that have no basis in the bio (e.g., the speaker in poem 2 says "I stand on the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_005', difficulty: 'standard',
          question: 'Supporting character analysis examines how secondary figures in a narrative.',
          hint: 'If confused, review c11_hin_ar_cbse_01_005 (Class 11 Antra Ch1 supporting characters).',
          misconception: 'Students treat nsolsuk and dkusZfy;k as "examples of themes" rather than *characters with distinct consciousness*.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why nsolsuk addresses her poem to "vk\'kk" (pain/suffering) as "ckoyh" (deceptive/betrayer) in the line "esjh vk\'kk vkg! ckoyh".', answer: 'nsolsuk calls suffering "ckoyh"',
                  options: ['nsolsuk calls suffering "ckoyh"', 'as merely'],
                  hint: 'If confused, review c11_hin_ar_cbse_01_005 (Class 11 Antra Ch1 supporting characters) — it models.',
                  misconception: 'Students treat nsolsuk and dkusZfy;k as "examples of themes" rather than *characters with distinct consciousness*.' },
                { id: 'b', prompt: 'Compare the central metaphor in nsolsuk\'s "nqcZy in cy ij gkjh gksM+ yxkbZ" with dkusZfy;k\'s "mM+rs [kx ftl vksj eq¡g fd,".', answer: 'nsolsuk\'s metaphor (thorns on a tender stem) conveys *vulnerability violated*',
                  options: ['nsolsuk\'s metaphor (thorns on a tender stem) conveys *vulnerability violated*', 'nature imagery'],
                  hint: 'If confused, review c11_hin_ar_cbse_01_005 (Class 11 Antra Ch1 supporting characters) — it models.',
                  misconception: 'Students treat nsolsuk and dkusZfy;k as "examples of themes" rather than *characters with distinct consciousness*.' }
          ],
            remediations: { 'students-treat-nsolsuk-and-dkuszfy': { steps: ['If a student writes thematic labels instead of character analysis: (1) Have them re-read nsolsuk\'s xhr and underline.', 'Ask: "Whose pain is this?" (2) Have them re-read dkusZfy;k\'s xhr and circle every collective pronoun ("gekjk".', 'Ask: "Whose vision is this?" (3) Assign a 3-sentence rewrite: "nsolsuk is not \'suffering.\' She is a young woman who.', 'dkusZfy;k is not \'patriotism.\' He is a learned elder who ______." (4) Re-diagnose using DIAGNOSTIC_QUESTION_4 — if they.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_006', difficulty: 'standard',
          question: 'The primary theme is the central, unifying idea or insight about human.',
          hint: 'If stuck, re-read the "Before You Read" (node 001) and "Character Analysis" (nodes.',
          misconception: '**Misconception:** "The theme of a poem is the moral lesson at the end, like \'child marriage is bad\' or \'love your.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme is the central, unifying idea or insight about human experience that a',
                  options: ['The primary theme is the central, unifying idea or insight about human experience that a', '"Before You Read: Context and Background" refers to the preparatory step of understanding', 'Plot and Narrative Structure in poetry refers to the organized sequence of emotions,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, re-read the "Before You Read" (node 001) and "Character Analysis" (nodes 004–005).',
                  misconception: '**Misconception:** "The theme of a poem is the moral lesson at the end, like \'child marriage is bad\' or \'love your country\'." **Why it\'s.' }
          ],
            remediations: { 'misconception-the-theme-of-a': { steps: ['**Revisit prerequisite:** Go to `c12_hin_a_cbse_01_004` (Character Analysis: Protagonist) and `c12_hin_a_cbse_01_005`.', '**Re-diagnostic:** Take Diagnostic Question 2 again, but this time write a full thematic statement using the template.', '**Scaffolded practice:** Use the PEEL worksheet (available in node 014) to analyze *one* image from each poem, forcing.', '**Peer check:** Exchange answers with a partner; each must identify whether the other\'s theme statement is a *topic*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
