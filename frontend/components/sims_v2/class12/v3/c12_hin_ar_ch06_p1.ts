import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch06_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch06_p1',
    title: 'xksLokeh rqylhnkl · Part 1/3',
    subtitle: 'Why Nirala chose the moment even Rama knelt',
    classLevel: 12, subject: 'hin_ar', topic: 'xksLokeh rqylhnkl · Part 1/3',
    chapters: ['c12_hin_ar_ch06'],
    nodeIds: ['c12_hin_ar_cbse_06_001', 'c12_hin_ar_cbse_06_002', 'c12_hin_ar_cbse_06_003', 'c12_hin_ar_cbse_06_004', 'c12_hin_ar_cbse_06_005', 'c12_hin_ar_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Epic-poetry analyst', intro: 'A Chhayavad master builds an epic around the one scene where the perfect man admits he isn\'t enough.', goal: 'Read Ram Ki Shakti Puja as Chhayavad epic — personal struggle and national allegory inside a mythic frame.' },
    discovery: {
        question: 'Of every Ramayana moment — birth, exile, coronation — Nirala chose the instant Rama kneels to the Goddess before the final battle. Why that one?',
        options: ['It dramatises human vulnerability against impossible odds — the ideal man needing divine strength mirrors a poet\'s own wars with poverty and loss, and a nation\'s fight to be free', 'It\'s the most exciting scene', 'The battle needed a prayer', 'Random selection'],
        answer: 'It dramatises human vulnerability against impossible odds — the ideal man needing divine strength mirrors a poet\'s own wars with poverty and loss, and a nation\'s fight to be free',
        hook: 'Not a retelling — a re-visioning: an eleven-canto blank-verse epic that claims classical lineage for modern Hindi while encoding a freedom struggle and private grief inside Rama\'s helplessness. Chhayavad\'s interiority scaled to epic architecture.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the essential historical, biographical, and literary framework needed to understand the poet Nirala (Suryakant Tripathi \'Nirala\') and his epic poem.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stand beside Rama before Lanka: weigh why Shakti Puja was the chosen moment, compare epic structure with lyric intensity, and hunt the allegory running beneath the myth.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine opening your Hindi textbook to Chapter 6 and seeing the title "xksLokeh rqylhnkl" — a dense Sanskritized phrase that feels intimidating before you even.',
            decisions: [{ prompt: 'Who is the poet of *Ram Ki Shakti Puja*, and what is his pen name? (Answer in one sentence with both names.)', options: [
                { text: 'The poet is Suryakant Tripathi, known by his pen name **Nirala** (fujkyk)', outcome: 'The poet is Suryakant Tripathi, known by his pen name **Nirala** (fujkyk).' },
                { text: 'Premchand', outcome: 'Not quite — Students treat "Context and Background" as **optional reading** — a few dates and names to memorize.', reveals: 'students-treat-context-and-background' },
                { text: 'Mahadevi Verma', outcome: 'Not quite — Students treat "Context and Background" as **optional reading** — a few dates and names to memorize.', reveals: 'students-treat-context-and-background' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are watching a time‑lapse video of a tree through seasons — first you see the shadow stretching at noon, then leaves trembling in wind, then the.',
            decisions: [{ prompt: 'What is the basic definition of \'narrative structure\' in a poem, and how does it differ from a story\'s plot?', options: [
                { text: 'Narrative structure in a poem is the organized progression of ideas/images across stanzas', outcome: 'Narrative structure in a poem is the organized progression of ideas/images across stanzas that.' },
                { text: 'a poem has no \'plot\'', outcome: 'Not quite — Students often think a poem has no \'plot\' because no characters perform actions.', reveals: 'a-poem-has-no-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are sitting on a charpoy in your ancestral village as the sun sets — the air cools, a single lamp flickers in the courtyard, distant temple bells.',
            decisions: [{ prompt: 'Define \'setting\' and \'atmosphere\' in the context of poetry. Give one example of a setting detail and one example of an atmosphere word from.', options: [
                { text: '**Correct Answer:** Setting is the spatiotemporal backdrop (time, place, physical', outcome: '**Correct Answer:** Setting is the spatiotemporal backdrop (time, place, physical environment).' },
                { text: 'setting is the story', outcome: 'Not quite — Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting.', reveals: 'students-often-treat-setting-and' },
                { text: 'the setting is sad', outcome: 'Not quite — Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting.', reveals: 'students-often-treat-setting-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re describing your most rebellious friend to a stranger — you\'d quote things they\'ve *done*, words they\'ve *said*, choices they\'ve *made*.',
            decisions: [{ prompt: 'Who is the protagonist in Nirala\'s poem "छाया मत छूना" and what single word best captures their core personality as established in the.', options: [
                { text: 'The protagonist is the cloud (मेघ/बादल), and the core personality word is "स्वछंद"', outcome: 'The protagonist is the cloud (मेघ/बादल), and the core personality word is "स्वछंद".' },
                { text: 'there is no protagonist', outcome: 'Not quite — Students believe "character analysis" only applies to human figures in prose narratives.', reveals: 'character-analysis-only-applies-to' },
                { text: 'the poet', outcome: 'Not quite — Students believe "character analysis" only applies to human figures in prose narratives.', reveals: 'character-analysis-only-applies-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are at a family gathering where a baby girl is born. You hear different relatives whispering—some rejoice, some sigh, some stay silent.',
            decisions: [{ prompt: 'List the supporting characters explicitly mentioned in the poem "कन्याजन्म" and give one line reference for each.', options: [
                { text: 'The supporting characters are: mother (tx) – "tx osQ nXèk ân', outcome: 'The supporting characters are: mother (tx) – "tx osQ nXèk ân; ij", father (th.kZ) – "th.kZ ckgq".' },
                { text: 'supporting characters', outcome: 'Not quite — Students often think "supporting characters" in a poem are only those who speak.', reveals: 'supporting-characters-in-a-poem' },
                { text: '"supporting characters" in a poem are only those who speak', outcome: 'Not quite — Students often think "supporting characters" in a poem are only those who speak.', reveals: 'supporting-characters-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are at a Holi celebration where everyone throws bright colors, but someone hands you a handful of rich, dark soil and says, "This is the real color.',
            decisions: [{ prompt: 'What is the central message (primary theme) of Firaq Gorakhpuri\'s poem "काले रंग" in one sentence?', options: [
                { text: 'The poem reclaims the color black as a symbol of fertility, creativity, and the enduring', outcome: 'The poem reclaims the color black as a symbol of fertility, creativity, and the enduring strength.' },
                { text: 'The poem describes the color black in nature', outcome: 'Not quite — **Misconception:** "The primary theme is simply \'Black is beautiful\' or \'Don\'t judge by color\'.".', reveals: 'misconception-the-primary-theme-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior is spiralling after a brutal internship rejection: \'This is who I am now — the guy who fails.\' You remember the Firaq poem where a tree loses its leaves to the season yet the final stanza returns to the same rooted presence.',
            decisions: [{ prompt: 'How do you use the poem\'s structure with him?', options: [
                { text: 'Point out the poem moves through noon shadow, wind, bare winter — then circles back to the rooted tree; a hard season is weather passing through, not the trunk. His rejection is a stanza, not the whole structure.', outcome: 'The poem\'s circular return exists to make exactly this claim: the ending echoes the opening image, but now carrying the endurance the middle proved — the tree that was always rooted.' },
                { text: 'Tell him the seasons prove everything changes, so this failure will soon be replaced by success — wait it out.', outcome: 'That reads only the seasonal half and skips the rootedness the poem insists on; passive waiting isn\'t the tree\'s endurance — the structure pairs change outside with continuity within.', reveals: 'time-heals-passively' },
                { text: 'Tell him to treat the rejection as the final stanza — some stories end bare, and that\'s honest.', outcome: 'That amputates the poem\'s actual resolution: the final stanza deliberately returns to rooted presence, so calling the bare season the ending misreads where the structure chooses to stop.', reveals: 'hard-season-is-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read an epic as both myth and mirror — where a god\'s prayer for strength speaks for a poet, and a people, beseeching power.',
            decisions: [{ prompt: 'What comes next? xksLokeh rqylhnkl · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — xksLokeh rqylhnkl · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the essential historical.',
          hint: 'If stuck on Chhayavad definition, revisit Class 11 "Chhayavad Introduction".',
          misconception: 'Students treat "Context and Background" as **optional reading** — a few dates and names to memorize for a 1-mark.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of *Ram Ki Shakti Puja*, and what is his pen name? (Answer in one sentence with both names.)', answer: 'The poet is Suryakant Tripathi, known by his pen name **Nirala** (fujkyk)',
                  options: ['The poet is Suryakant Tripathi, known by his pen name **Nirala** (fujkyk)', 'Premchand', 'Mahadevi Verma', 'Premchand" or "Mahadevi Verma" —'],
                  hint: 'If stuck on Chhayavad definition, revisit Class 11 "Chhayavad Introduction".',
                  misconception: 'Students treat "Context and Background" as **optional reading** — a few dates and names to memorize for a 1-mark question — instead of the.' },
                { id: 'b', prompt: 'Explain in your own words what "Chhayavad" (छायावाद) means as a literary movement, and name ONE core principle that distinguishes it from the earlier Dwivedi.', answer: 'Chhayavad (Shadowism) is a Romantic-era Hindi literary movement (c',
                  options: ['Chhayavad (Shadowism) is a Romantic-era Hindi literary movement (c', 'Jaishankar Prasad, Nirala, Mahadevi, Pant', 'Chhayavad poets'],
                  hint: 'If stuck on Chhayavad definition, revisit Class 11 "Chhayavad Introduction".',
                  misconception: 'Students treat "Context and Background" as **optional reading** — a few dates and names to memorize for a 1-mark question — instead of the.' }
          ],
            remediations: { 'students-treat-context-and-background': { steps: ['If a student cannot answer Diagnostic Questions 2–4 correctly: (1) Have them re-read the **Class 11 "Chhayavad".', '(2) Assign a 5-minute "Ramayana Episode Mapping" exercise: list 5 major Ramayana episodes and write one sentence on why.', '(3) Re-attempt Diagnostic Question 3 orally — the student must *justify* the choice of Shakti Puja using the phrase.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_002', difficulty: 'standard',
          question: 'Plot and narrative structure in a poem refers to the sequence of ideas, images.',
          hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_06_002 (Plot and Narrative Structure) and.',
          misconception: 'Students often think a poem has no \'plot\' because no characters perform actions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure in a poem refers to the sequence of ideas, images, or events',
                  options: ['Plot and narrative structure in a poem refers to the sequence of ideas, images, or events', '"Before You Read: Context and Background" provides the essential historical,', 'Setting refers to the time, place, and physical environment in', 'Character analysis of the protagonist in poetry involves identifying the central'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_06_002 (Plot and Narrative Structure) and practice.',
                  misconception: 'Students often think a poem has no \'plot\' because no characters perform actions.' }
          ],
            remediations: { 'a-poem-has-no-plot': { steps: ['Have the student number the stanzas 1–5.', 'Ask: "What is the one new thing added in stanza 2 that wasn\'t in stanza 1?" 3.', 'Then ask them to draw a simple flowchart: Stanza 1 → Stanza 2 → ...', '→ Stanza 5, labeling each arrow with the shift (e.g., "shadow → wind", "external → internal").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which a literary.',
          hint: 'If stuck, review the "Sensory Sort" exercise in ON_FAILURE using the first stanza.',
          misconception: 'Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting is melancholic" or "the.',
          parts: [
                { id: 'a', prompt: 'APPLY the PEEL structure to analyze how the auditory imagery in the stanza beginning "v^kfydk ugha gS js" contributes to the poem\'s atmosphere.', answer: '**Correct Answer (Model PEEL):** **Point:** The auditory imagery in this stanza',
                  options: ['**Correct Answer (Model PEEL):** **Point:** The auditory imagery in this stanza', 'flute, drum'],
                  hint: 'If stuck, review the "Sensory Sort" exercise in ON_FAILURE using the first stanza of "ckny jkx".',
                  misconception: 'Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting is melancholic" or "the atmosphere is the.' }
          ],
            remediations: { 'students-often-treat-setting-and': { steps: ['If a student cannot distinguish setting from atmosphere or analyze the construction mechanism: 1.', '**Revisit Class 11 node c11_hin_ar_cbse_06_003** (Text: Setting and Atmosphere) — re-read the worked example there.', '**Do a 10-minute "Sensory Sort" exercise:** Take the first two stanzas of "ckny jkx".', 'Make two columns: "Setting Details (Concrete/Physical)" and "Atmosphere Words (Abstract/Emotional)".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting is melancholic" or "the.',
          parts: [
                { id: 'a', prompt: 'EVALUATE the critic\'s statement: "In \'ckny jkx\', the village setting is merely a backdrop; the real subject is the poet\'s nostalgia." Defend or refute using.', answer: '**Correct Answer:** Refute',
                  options: ['**Correct Answer:** Refute', 'yes, it\'s about memories', 'nostalgia trap'],
                  hint: 'If stuck, review the "Sensory Sort" exercise in ON_FAILURE using the first stanza of "ckny jkx".',
                  misconception: 'Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting is melancholic" or "the atmosphere is the.' }
          ],
            remediations: { 'students-often-treat-setting-and': { steps: ['If a student cannot distinguish setting from atmosphere or analyze the construction mechanism: 1.', '**Revisit Class 11 node c11_hin_ar_cbse_06_003** (Text: Setting and Atmosphere) — re-read the worked example there.', '**Do a 10-minute "Sensory Sort" exercise:** Take the first two stanzas of "ckny jkx".', 'Make two columns: "Setting Details (Concrete/Physical)" and "Atmosphere Words (Abstract/Emotional)".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves identifying the.',
          hint: 'If stuck on "verbs of volition": revisit Class 11 c11_hin_ar_cbse_06_004 worked example.',
          misconception: 'Students believe "character analysis" only applies to human figures in prose narratives.',
          parts: [
                { id: 'a', prompt: 'In stanza 2, the cloud "वक्षस्थल पर सिर रखकर / सो जाता है" (rests its head on the chest [of the mountain] and sleeps).', answer: 'The action reveals *voluntary intimacy without submission*',
                  options: ['The action reveals *voluntary intimacy without submission*', 'it shows the cloud is tired', 'it submits to the mountain', '(places deliberately)'],
                  hint: 'If stuck on "verbs of volition": revisit Class 11 c11_hin_ar_cbse_06_004 worked example where "वह.',
                  misconception: 'Students believe "character analysis" only applies to human figures in prose narratives.' },
                { id: 'b', prompt: 'Analyze how the cloud\'s characterization shifts across the three stanzas: Stanza 1 (movement verbs), Stanza 2 (intimacy/rest), Stanza 3 (defiance/creation).', answer: 'Trajectory: **Wanderer → Guest → Sovereign Creator**',
                  options: ['Trajectory: **Wanderer → Guest → Sovereign Creator**', 'character analysis', '"character analysis" only applies to human figures in prose narratives'],
                  hint: 'If stuck on "verbs of volition": revisit Class 11 c11_hin_ar_cbse_06_004 worked example where "वह.',
                  misconception: 'Students believe "character analysis" only applies to human figures in prose narratives.' }
          ],
            remediations: { 'character-analysis-only-applies-to': { steps: ['If student writes "no character" or describes physical clouds: **Step 1** — Hand them stanza 1 only.', 'Say: "Circle every word showing *action*." (They\'ll circle आते, जाते, गाते, बजाते, नहीं रुकते).', '**Step 2** — Ask: "Who does these?', 'Or a *person*?" **Step 3** — Reveal: "Nirala *makes* the cloud a person *by* giving it these verbs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the roles.',
          hint: 'If stuck, revisit the poem\'s first reading (c12_hin_ar_cbse_06_001) and list every.',
          misconception: 'Students often think "supporting characters" in a poem are only those who speak.',
          parts: [
                { id: 'a', prompt: 'List the supporting characters explicitly mentioned in the poem "कन्याजन्म" and give one line reference for each.', answer: 'The supporting characters are: mother (tx) – "tx osQ nXèk ân',
                  options: ['The supporting characters are: mother (tx) – "tx osQ nXèk ân', 'supporting characters', '"supporting characters" in a poem are only those who speak'],
                  hint: 'If stuck, revisit the poem\'s first reading (c12_hin_ar_cbse_06_001) and list every person/group.',
                  misconception: 'Students often think "supporting characters" in a poem are only those who speak.' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['If a student cannot identify non-speaking characters, guide them: (1) Reread the poem marking every noun that denotes.', '(2) For each, ask: Does this entity act, speak, or get described in relation to the girl?', '(3) Write one sentence on what each represents.', '(4) Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or message.',
          hint: 'If stuck, review "How to find the central image in a stanza" from.',
          misconception: '**Misconception:** "The primary theme is simply \'Black is beautiful\' or \'Don\'t judge by color\'." **Why it\'s wrong:**.',
          parts: [
                { id: 'a', prompt: 'Apply the primary theme to interpret the line: "काले मेघा जल बरसावें / धरती माँ का दुख दूर भगावें" (Black clouds rain / Remove mother earth\'s sorrow).', answer: '**Step 1:** Identify conventional symbol: black clouds = gloom/storms',
                  options: ['**Step 1:** Identify conventional symbol: black clouds = gloom/storms', 'Black clouds bring rain'],
                  hint: 'If stuck, review "How to find the central image in a stanza" from `c12_hin_ar_cbse_06_002` and.',
                  misconception: '**Misconception:** "The primary theme is simply \'Black is beautiful\' or \'Don\'t judge by color\'." **Why it\'s wrong:** This reduces.' }
          ],
            remediations: { 'misconception-the-primary-theme-is': { steps: ['**Re-read Stanza 1 only** (node `c12_hin_ar_cbse_06_002` for plot/narrative structure).', 'Identify *three nouns* linked to काला (मिट्टी, बीज, अंकुर).', 'Write: "काला = इन तीनों का स्रोत".', '**Do the same for Stanzas 2, 3, 4** (night/dreams, clouds/rain, bodies/labor).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
