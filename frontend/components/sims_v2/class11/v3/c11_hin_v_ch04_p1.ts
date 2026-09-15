import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch04_p1: SimDef = {
    id: 'v3_c11_hin_v_ch04_p1',
    title: 'Hkkjrh; xkf;dkvksa esa cstksM+yrk · Part 1/3',
    subtitle: 'Test the claim that the most local art travels the farthest.',
    classLevel: 11, subject: 'hin_v', topic: 'Hkkjrh; xkf;dkvksa esa cstksM+yrk · Part 1/3',
    chapters: ['c11_hin_v_ch04'],
    nodeIds: ['c11_hin_v_cbse_04_001', 'c11_hin_v_cbse_04_002', 'c11_hin_v_cbse_04_003', 'c11_hin_v_cbse_04_004', 'c11_hin_v_cbse_04_005', 'c11_hin_v_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader mapping Indian art\'s hidden continuum', intro: 'Mandana on a mud wall in a village, Kathak in a Jaipur auditorium — the essay asks what these share, not what divides them.', goal: 'Analyse the folk-classical continuum and the essay\'s classification-driven structure.' },
    discovery: {
        question: '\'The more local an art is in its expression, the more universal it becomes\' — can that paradox actually hold?',
        options: ['Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes', 'No — local art stays local by definition', 'Yes — but only after foreigners validate it', 'No — universality requires abandoning the local'],
        answer: 'Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes',
        hook: 'Folk and classical aren\'t two boxes — Kathak grew out of kathavachaks and temple dances sank back into villages; the continuum never stops trading.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read: Context and Background" section provides the historical, cultural, and conceptual framework necessary to understand the chapter on Indian arts (Hkkjrh; dyk,¡), establishing the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace how the essay runs every art form through the same folk→classical→living-continuity arc, and judge what that repeated pattern proves.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re given a jigsaw puzzle without the picture on the box — that\'s what reading a long expository text feels like without noticing its structure.',
            decisions: [{ prompt: 'What is the primary organizational pattern used in the first section of the chapter (pages 59-60) before the discussion of specific art.', options: [
                { text: 'The primary pattern is **general-to-specific (deductive)**', outcome: 'The primary pattern is **general-to-specific (deductive)**. The author opens with a universal claim.' },
                { text: 'chronological', outcome: 'Not quite — Students treat "structure" as a list of topics ("first painting, then music, then dance") rather.', reveals: 'students-treat-structure-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are curating a museum exhibition on Indian folk arts.',
            decisions: [{ prompt: 'According to the text, what are the two primary physical locations where the earliest Indian paintings (चित्रकला) are found?', options: [
                { text: 'The text explicitly states the earliest paintings are found in **rock shelters/caves', outcome: 'The text explicitly states the earliest paintings are found in **rock shelters/caves.' },
                { text: 'temples', outcome: 'Not quite — Students often treat **setting** as a static "background" (time/place labels) and **atmosphere**.', reveals: 'students-often-treat-setting-as' },
                { text: 'palaces', outcome: 'Not quite — Students often treat **setting** as a static "background" (time/place labels) and **atmosphere**.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are watching a Madhubani painter in Bihar or a Kathak dancer in Lucknow — both are "protagonists" of this chapter even though no single person.',
            decisions: [{ prompt: 'According to the chapter, what is the primary identity of the protagonist (the Indian artist) in the folk tradition — an individual genius.', options: [
                { text: 'The primary identity is a community representative: the folk artist creates as part of', outcome: 'The primary identity is a community representative: the folk artist creates as part of collective.' },
                { text: 'individual genius', outcome: 'Not quite — Students assume "Character Analysis: Protagonist" requires a named main character (like in a novel).', reveals: 'character-analysis-protagonist-requires-a' },
                { text: 'yksd dykvksa dk laca/ yksd ;k lewg ls gh Fkk', outcome: 'Not quite — Students assume "Character Analysis: Protagonist" requires a named main character (like in a novel).', reveals: 'character-analysis-protagonist-requires-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are curating an exhibition on Indian arts. The main theme is "Art as Life" – that\'s your protagonist.',
            decisions: [{ prompt: 'Identify any three groups or individuals explicitly named in the chapter who serve as supporting figures for the central idea of Indian.', options: [
                { text: 'Correct answer: Mithila folk painters (women painting kohbar/arikpan), Rajasthani', outcome: 'Correct answer: Mithila folk painters (women painting kohbar/arikpan), Rajasthani miniature.' },
                { text: 'painters', outcome: 'Not quite — Students often believe "supporting characters" only exist in fiction and therefore skip this.', reveals: 'supporting-characters-only-exist-in' },
                { text: 'musicians', outcome: 'Not quite — Students often believe "supporting characters" only exist in fiction and therefore skip this.', reveals: 'supporting-characters-only-exist-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re standing in a museum where a Warli painting, a Bharatanatyam posture, and a Baul song are displayed together — what single thread connects them?',
            decisions: [{ prompt: 'What is the primary theme of Chapter 4 "Hkkjrh; dykvksa esa cstksM+yrk" as stated in the NCERT Vitan textbook?', options: [
                { text: 'The primary theme is the organic unity and continuous evolution of Indian arts (painting,', outcome: 'The primary theme is the organic unity and continuous evolution of Indian arts (painting, music.' },
                { text: 'Indian arts are very old', outcome: 'Not quite — Students confuse \'theme\' with \'topic\' or \'subject matter\'. They write: "The theme is Indian arts".', reveals: 'students-confuse-theme-with-topic' },
                { text: 'There are many types of Indian art', outcome: 'Not quite — Students confuse \'theme\' with \'topic\' or \'subject matter\'. They write: "The theme is Indian arts".', reveals: 'students-confuse-theme-with-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school exhibition on \'Indian Arts\', a student sorts every item into two rigid boxes — \'folk/tribal\' (Mandana, Warli, Madhubani) and \'classical\' (Kathak, Mughal miniatures) — insisting the categories never mix, \'like traditional vs modern.\'',
            decisions: [{ prompt: 'What does the chapter say about that border?', options: [
                { text: 'Show the continuum: the chapter argues folk and classical are endpoints in constant संवाद — folk forms get codified into classical (Kathak rising from the kathavachak tradition), classical forms dissolve back into folk (temple dance becoming village ritual), and both root in the Natya Shastra. Crucially, Indian arts were never museum objects — they lived inside births, harvests and worship.', outcome: 'The exhibition gets a third section — \'the dialogue\': Kathak\'s folk origins, Madhubani\'s codification — proving the categories are porous by design.' },
                { text: 'Keep the two boxes — separate categories make the exhibition clearer for visitors.', outcome: 'Clarity here falsifies: the text\'s central claim is fluidity, and a rigid folk/classical wall hides exactly the unity-in-diversity the chapter demonstrates.', reveals: 'folk-classical-are-fixed-boxes' },
                { text: 'Treat the art list as the structure — painting, then music, then dance is just a table of contents.', outcome: 'The sequence is argumentative: each art form follows the same folk→classical→modern trajectory to prove the thesis that arts are rooted in life.', reveals: 'structure-is-topic-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Bhimbetka\'s cave lines, a Rajasthani wall at Diwali, a Tanjore court repertoire — one argument repeated until it becomes evidence.',
            decisions: [{ prompt: 'What comes next? Hkkjrh; xkf;dkvksa esa cstksM+yrk · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Hkkjrh; xkf;dkvksa esa cstksM+yrk · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_001', difficulty: 'standard',
          question: 'The "Before You Read: Context and Background" section provides the historical.',
          hint: 'If stuck, review the Class 10 History chapter "Print Culture and the Modern World".',
          misconception: 'Students treat "folk art" (yksddyk) and "classical art" (\'kkL=kh; dyk) as two separate, fixed categories - like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The "Before You Read: Context and Background" section provides the historical, cultural,',
                  options: ['The "Before You Read: Context and Background" section provides the historical, cultural,', 'Plot and narrative structure in an expository text refers to the logical organization of', 'In an expository text like "Hkkjrh; dyk,¡", **setting** refers to the historical period,', 'Character analysis of the protagonist in this expository chapter involves identifying the'],
                  hint: 'If stuck, review the Class 10 History chapter "Print Culture and the Modern World" (section.',
                  misconception: 'Students treat "folk art" (yksddyk) and "classical art" (\'kkL=kh; dyk) as two separate, fixed categories - like "traditional vs modern.".' }
          ],
            remediations: { 'students-treat-folk-art-yksddyk': { steps: ['Ask the student to list 5 Indian art forms they know.', 'For each, ask "Is this folk or classical?" - they\'ll likely categorize confidently.', 'Show the counter-evidence from text: "Kathak started as temple storytelling (folk) → became court dance (classical) →.', 'Have them re-read the paragraph on page 61: "\'kkL=kh; vkSj yksddykvksa osQ chp dHkh u •Re gksus okyk laokn gh budh rkdr.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_002', difficulty: 'standard',
          question: 'Plot and narrative structure in an expository text refers to the logical.',
          hint: 'If stuck, review the "Before You Read" node (c11_hin_v_cbse_04_001) for the cultural.',
          misconception: 'Students treat "structure" as a list of topics ("first painting, then music, then dance") rather than an *argumentative.',
          parts: [
                { id: 'a', prompt: 'What is the primary organizational pattern used in the first section of the chapter (pages 59-60) before the discussion of specific art forms begins?', answer: 'The primary pattern is **general-to-specific (deductive)**',
                  options: ['The primary pattern is **general-to-specific (deductive)**', 'chronological'],
                  hint: 'If stuck, review the "Before You Read" node (c11_hin_v_cbse_04_001) for the cultural context that.',
                  misconception: 'Students treat "structure" as a list of topics ("first painting, then music, then dance") rather than an *argumentative architecture*.' }
          ],
            remediations: { 'students-treat-structure-as-a': { steps: ['Give the student a blank "structure map" template: Thesis → Category 1 (sub-points) → Category 2 (sub-points) →.', 'Ask them to fill *only* the thesis and the *first sub-point* of each category from memory.', 'Then have them read *only the first and last sentence of each section* to see the parallel trajectory.', 'Finally, ask: "What single sentence could replace all four category sections?" — forcing abstraction from content.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_003', difficulty: 'standard',
          question: 'In an expository text like "Hkkjrh; dyk,¡", **setting** refers to the.',
          hint: 'If stuck, review the **section headings and first/last sentences of each paragraph**.',
          misconception: 'Students often treat **setting** as a static "background" (time/place labels) and **atmosphere** as a vague "feeling,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In an expository text like "Hkkjrh; dyk,¡", **setting** refers to the historical period,',
                  options: ['In an expository text like "Hkkjrh; dyk,¡", **setting** refers to the historical period,', 'The "Before You Read: Context and Background" section provides the historical, cultural,', 'Plot and narrative structure in an expository text refers to the logical organization of', 'Character analysis of the protagonist in this expository chapter involves identifying the'],
                  hint: 'If stuck, review the **section headings and first/last sentences of each paragraph** in the NCERT.',
                  misconception: 'Students often treat **setting** as a static "background" (time/place labels) and **atmosphere** as a vague "feeling," missing that.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['**Re-read with a highlighter:** Mark every **proper noun** (place, period, community, ritual, season) in one colour.', '**Make a two-column table:** Column A = "Setting Detail from Text" (e.g., "मिथिला के आँगन में कोहबर"); Column.', '**Verbalize the link:** For each row, say aloud: "The author puts the art *here* (Column A) so we feel *this* (Column.', '**Write one 3-sentence synthesis:** "In this text, setting is not a backdrop but the *source* of the art.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in this expository chapter involves.',
          hint: 'Review the concept of "agency in structural history" — how texts attribute actions.',
          misconception: 'Students assume "Character Analysis: Protagonist" requires a named main character (like in a novel) and search for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in this expository chapter involves identifying the',
                  options: ['Character analysis of the protagonist in this expository chapter involves identifying the', 'The "Before You Read: Context and Background" section provides the historical, cultural,', 'Plot and narrative structure in an expository text refers to the logical organization of', 'In an expository text like "Hkkjrh; dyk,¡", **setting** refers to the historical period,'],
                  hint: 'Review the concept of "agency in structural history" — how texts attribute actions to groups (e.g.',
                  misconception: 'Students assume "Character Analysis: Protagonist" requires a named main character (like in a novel) and search for a specific person (e.g.' }
          ],
            remediations: { 'character-analysis-protagonist-requires-a': { steps: ['Return to node 002 (Plot and Narrative Structure): identify the "story" the chapter tells — it\'s the biography of.', 'Re-read the painting/music/dance/sculpture sections circling every verb where the artist is the doer (e.g., "fp=kdkjh.', 'Group these verbs into 4-5 trait clusters (e.g., "learner," "ritual-performer," "adapter," "innovator-within-canon").', 'Write one paragraph per cluster using the PEEL structure: Point (trait), Evidence (verb+context), Explanation (what.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students assume "Character Analysis: Protagonist" requires a named main character (like in a novel) and search for.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The chapter portrays the classical artist as superior to the folk artist because classical art has written shastras." Defend or refute.', answer: 'Refute',
                  options: ['Refute', 'Character Analysis: Protagonist', 'Who is the hero of this chapter?'],
                  hint: 'Review the concept of "agency in structural history" — how texts attribute actions to groups (e.g.',
                  misconception: 'Students assume "Character Analysis: Protagonist" requires a named main character (like in a novel) and search for a specific person (e.g.' }
          ],
            remediations: { 'character-analysis-protagonist-requires-a': { steps: ['Return to node 002 (Plot and Narrative Structure): identify the "story" the chapter tells — it\'s the biography of.', 'Re-read the painting/music/dance/sculpture sections circling every verb where the artist is the doer (e.g., "fp=kdkjh.', 'Group these verbs into 4-5 trait clusters (e.g., "learner," "ritual-performer," "adapter," "innovator-within-canon").', 'Write one paragraph per cluster using the PEEL structure: Point (trait), Evidence (verb+context), Explanation (what.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the roles.',
          hint: 'Review the Protagonist Analysis (node 004) notes on the narrator\'s voice and thesis, then.',
          misconception: 'Students often believe "supporting characters" only exist in fiction and therefore skip this analysis for essays.',
          parts: [
                { id: 'a', prompt: 'The chapter states: "fp=kdkjh çkphu dky ls gh gekjs thou dk vfHkUu vax jgk gSA" (The painter has been an integral part of our life since ancient times).', answer: 'Correct answer: The text describes miniature painters working on palace walls,',
                  options: ['Correct answer: The text describes miniature painters working on palace walls,', 'supporting characters'],
                  hint: 'Review the Protagonist Analysis (node 004) notes on the narrator\'s voice and thesis, then re-read.',
                  misconception: 'Students often believe "supporting characters" only exist in fiction and therefore skip this analysis for essays.' }
          ],
            remediations: { 'supporting-characters-only-exist-in': { steps: ['Have the student re-read the chapter with a highlighter, marking every proper noun referring to a person, community,.', 'Create a three-column table: Figure/Group | Textual Description (quote/paraphrase) | Function in Argument.', 'Model one row together: "Mithila women | \'bhitti chitra\', \'kohbar\', \'arikpan\' using rice paste | Proves art as women\'s.', 'Assign the student to complete two more rows independently, then discuss how each row supports the thesis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_006', difficulty: 'standard',
          question: 'The primary theme of a literary text is its central, unifying idea that the.',
          hint: 'Review the \'Topic vs Theme\' distinction using a familiar text (e.g., a Class 10 story).',
          misconception: 'Students confuse \'theme\' with \'topic\' or \'subject matter\'. They write: "The theme is Indian arts" or "The theme.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the chapter establishes the connection between \'yksd dyk\' (folk art) and \'\'kkL=kh; dyk\' (classical art) as part of the primary.', answer: 'The chapter argues that classical arts evolved from folk traditions',
                  options: ['The chapter argues that classical arts evolved from folk traditions', 'folk art is for villagers, classical is for kings'],
                  hint: 'Review the \'Topic vs Theme\' distinction using a familiar text (e.g., a Class 10 story) — write both.',
                  misconception: 'Students confuse \'theme\' with \'topic\' or \'subject matter\'. They write: "The theme is Indian arts" or "The theme is types of Indian.' }
          ],
            remediations: { 'students-confuse-theme-with-topic': { steps: ['Ask the student to re-read the FIRST and LAST paragraphs of the chapter only — these frame the argument.', 'Have them highlight every sentence that makes a CLAIM (uses words like "is", "remains", "reflects", "evolves from") vs.', 'Ask: "If you had to explain this chapter to someone who never saw Indian art, what ONE idea would you want them.', 'Guide them to phrase that one idea as a complete sentence with a verb — that\'s the theme. Do not let them list examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
