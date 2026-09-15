import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch08_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch08_p1',
    title: 'mek\'kadj tks\'kh · Part 1/3',
    subtitle: 'The village finally spoke — in its own voice',
    classLevel: 12, subject: 'hin_ar', topic: 'mek\'kadj tks\'kh · Part 1/3',
    chapters: ['c12_hin_ar_ch08'],
    nodeIds: ['c12_hin_ar_cbse_08_001', 'c12_hin_ar_cbse_08_002', 'c12_hin_ar_cbse_08_003', 'c12_hin_ar_cbse_08_004', 'c12_hin_ar_cbse_08_005', 'c12_hin_ar_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-language poetry reader', intro: 'A freedom fighter from Araria refused to translate the village for the city. The dialect is the poem\'s argument.', goal: 'Read Renu\'s poem through lok-bhasha politics, body-as-knowing and post-Quit India longing.' },
    discovery: {
        question: 'Premchand wrote about villages in standard Hindi; Renu wrote from inside the village in its own folk speech. Why is the difference more than style?',
        options: ['Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature', 'Renu couldn\'t write proper Hindi', 'Dialect is just local colour', 'No real difference'],
        answer: 'Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature',
        hook: 'Renu\'s philosophy erased the body-mind split — mud on knees IS knowing the world. A Quit India prisoner writing children\'s free play isn\'t just nostalgic: that village is the autonomous world he fought for, reclaimed in folk speech.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" for Chapter 8 provides the essential historical, biographical, and literary framework needed to interpret Phanishwar Nath Renu\'s poem — including the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hear a poem in lok-bhasha: weigh dialect as political choice, read bodily play as a way of knowing, and connect a freedom fighter\'s childhood to the freedom he couldn\'t finish.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re handed a letter written in a dialect you barely recognize, from a village you\'ve never visited, describing a childhood that feels both alien and.',
            decisions: [{ prompt: 'Who is the author of the poem in Chapter 8 of Aroh (Class 12), and what is his most recognized contribution to Hindi literature?', options: [
                { text: 'The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), born 1921 in Araria, Bihar', outcome: 'The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), born 1921 in Araria, Bihar.' },
                { text: 'Hindi Sahitya', outcome: 'Not quite — Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list.', reveals: 'students-treat-the-before-you' },
                { text: 'incorrect Hindi', outcome: 'Not quite — Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are listening to a village elder telling a story by the fire — they don\'t just list events; they circle back to a refrain, zoom from a child\'s eye.',
            decisions: [{ prompt: 'Identify the number of stanzas in the poem and describe the structural pattern of the first three stanzas versus the fourth stanza.', options: [
                { text: 'The poem has four stanzas', outcome: 'The poem has four stanzas. The first three stanzas follow a similar pattern: each presents a vivid.' },
                { text: 'all four stanzas end with the refrain', outcome: 'Not quite — Students often treat the poem as a loose collection of village images rather than a tightly.', reveals: 'students-often-treat-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are sitting on a charpoy in a Bihar village during the first monsoon shower — the smell of wet earth (mitti ki khushboo), the sound of rain on tin.',
            decisions: [{ prompt: 'What are the three core components of \'setting\' in a narrative, and which component is most prominent in Renu\'s autobiographical sketches?', options: [
                { text: 'The three core components are geographical location (physical place), temporal context', outcome: 'The three core components are geographical location (physical place), temporal context (time.' },
                { text: 'village', outcome: 'Not quite — Students treat setting as a static "where and when" label (e.g., "village in Bihar, 1920s") and.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a cricket match — the captain (protagonist) gets all the attention, but the match turns because of a fielder\'s stunning catch,.',
            decisions: [{ prompt: 'Define \'foil character\' and give one example from any Class 11 or 12 Hindi prose text you have studied.', options: [
                { text: 'A foil character is a supporting character whose contrasting qualities highlight the', outcome: 'A foil character is a supporting character whose contrasting qualities highlight the protagonist\'s.' },
                { text: 'वह अच्छा दोस्त है', outcome: 'Not quite — Students believe supporting characters are \'easier\' to analyze because they have fewer lines,.', reveals: 'supporting-characters-are-easier-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re listening to your grandmother describe the games she played as a child — spinning tops, flying kites, singing folk songs — and you realize she\'s.',
            decisions: [{ prompt: 'What is the definition of "primary theme" in literary analysis, and how does it differ from a "subject" or "topic" of a text?', options: [
                { text: 'The primary theme is the central insight about life/human experience conveyed through the', outcome: 'The primary theme is the central insight about life/human experience conveyed through the work.' },
                { text: 'the theme is folk songs', outcome: 'Not quite — Students conflate "theme" with "author\'s biography" or "historical context" — e.g., writing "The.', reveals: 'students-conflate-theme-with-author' },
                { text: '"the theme is folk songs"', outcome: 'Not quite — Students conflate "theme" with "author\'s biography" or "historical context" — e.g., writing "The.', reveals: 'students-conflate-theme-with-author' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend selected for a national poetry fest wants to strip the dialect words from her village poems — \'real Hindi shouldn\'t smell of fields.\' The poems\' best lines are built from exactly those folk words and her grandmother\'s sayings.',
            decisions: [{ prompt: 'What does Renu\'s poem with the vine refrain say to her plan?', options: [
                { text: 'Keep the dialect — the poem builds from village scenes to the claim that script clings to language and language to life like a vine to a tree; cutting the folk idiom severs the very root the refrain keeps reaffirming.', outcome: 'The refrain isn\'t decoration: each stanza\'s memory ends by clinging back to the soil, so her \'impure\' words are the structural backbone of what makes the poems live.' },
                { text: 'Support the polish — standard literary Hindi is the tree; dialect is a creeper that needs pruning to grow upward.', outcome: 'The poem reverses that hierarchy — the vine survives because it clings; dialect isn\'t a parasite on standard language but the living connection that keeps the whole organism fed.', reveals: 'standard-above-dialect' },
                { text: 'Suggest writing two versions: a dialect draft for home and a cleaned-up one for the fest.', outcome: 'The poem\'s fourth stanza universalises the personal — the folk voice is the argument, not a first draft to be translated away; the split treats rootedness as a private habit to hide in public.', reveals: 'dialect-is-private-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear regional speech as literature\'s politics — and read a child\'s muddy play as reclaimed freedom.',
            decisions: [{ prompt: 'What comes next? mek\'kadj tks\'kh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — mek\'kadj tks\'kh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" for Chapter 8 provides the essential.',
          hint: 'If stuck, revisit Class 11 Aroh Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
          misconception: 'Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list of awards — and.',
          parts: [
                { id: 'a', prompt: 'Who is the author of the poem in Chapter 8 of Aroh (Class 12), and what is his most recognized contribution to Hindi literature?', answer: 'The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), born 1921 in Araria, Bihar',
                  options: ['The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), born 1921 in Araria, Bihar', 'Hindi Sahitya', 'incorrect Hindi', 'Premchand or Nirala'],
                  hint: 'If stuck, revisit Class 11 Aroh Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and re-do its.',
                  misconception: 'Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list of awards — and jump straight to the.' },
                { id: 'b', prompt: 'Explain in your own words why Renu\'s use of Maithili/Bhojpuri-inflected Hindi in his poetry is considered a literary innovation, not a linguistic deficiency.', answer: 'Renu elevated the spoken language of marginalized rural communities',
                  options: ['Renu elevated the spoken language of marginalized rural communities', 'simple language', 'villagers\' Hindi'],
                  hint: 'If stuck, revisit Class 11 Aroh Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and re-do its.',
                  misconception: 'Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list of awards — and jump straight to the.' },
                { id: 'c', prompt: 'The NCERT introductory note mentions Renu participated in the 1942 Quit India Movement and was imprisoned.', answer: 'Step 1: Note the biographical fact',
                  options: ['Step 1: Note the biographical fact', 'he went to jail'],
                  hint: 'If stuck, revisit Class 11 Aroh Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and re-do its.',
                  misconception: 'Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list of awards — and jump straight to the.' },
                { id: 'd', prompt: 'Compare Renu\'s literary project (as described in the NCERT note) with Premchand\'s.', answer: 'Premchand wrote *about* villages in standardized Khari Boli, adopting an',
                  options: ['Premchand wrote *about* villages in standardized Khari Boli, adopting an', 'both wrote village stories', 'social realism'],
                  hint: 'If stuck, revisit Class 11 Aroh Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and re-do its.',
                  misconception: 'Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list of awards — and jump straight to the.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['Have the student re-read the NCERT introductory note aloud, circling every phrase that links Renu\'s life to his.', 'Assign a 5-minute free-write: "Describe your grandmother\'s kitchen using ONLY words she would use — no \'standard\'.', 'Compare their free-write to Renu\'s approach: both privilege the speaker\'s authentic tongue over the textbook\'s.', 'Re-attempt Diagnostic Question 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure in a narrative poem refers to the sequence.',
          hint: 'If stuck, review "stanza division" and "refrain" in Class 11 Hindi textbook (Aroh Chapter.',
          misconception: 'Students often treat the poem as a loose collection of village images rather than a tightly structured argument.',
          parts: [
                { id: 'a', prompt: 'Identify the number of stanzas in the poem and describe the structural pattern of the first three stanzas versus the fourth stanza.', answer: 'The poem has four stanzas',
                  options: ['The poem has four stanzas', 'all four stanzas end with the refrain'],
                  hint: 'If stuck, review "stanza division" and "refrain" in Class 11 Hindi textbook (Aroh Chapter 1 or 8).',
                  misconception: 'Students often treat the poem as a loose collection of village images rather than a tightly structured argument.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['If a student cannot map the stanza-by-stanza progression, have them: (1) Number the stanzas 1–4 in the textbook.', '(2) Write one sentence summarizing the *core image* of each stanza.', '(3) Circle the refrain in stanzas 1–3 and put an X in stanza 4 where it\'s missing.', '(4) Answer: "What changes in stanza 4?" (5) Re-read the NCERT\'s own structural note: "jQckbZ mnwZ vkSj I+kQkjlh dk ,d.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_003', difficulty: 'standard',
          question: 'Setting and Atmosphere refers to the time, place, physical environment, and.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_08_003\'s worked example on identifying sensory clusters.',
          misconception: 'Students treat setting as a static "where and when" label (e.g., "village in Bihar, 1920s") and atmosphere as a single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting and Atmosphere refers to the time, place, physical environment, and',
                  options: ['Setting and Atmosphere refers to the time, place, physical environment, and', '"Before You Read: Context and Background" for Chapter 8 provides the essential', 'Plot and Narrative Structure in a narrative poem refers to the sequence of events,', 'Character analysis of the protagonist in a poem involves examining the central figure\'s'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_08_003\'s worked example on identifying sensory clusters in.',
                  misconception: 'Students treat setting as a static "where and when" label (e.g., "village in Bihar, 1920s") and atmosphere as a single adjective (e.g.' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have the student re-read the opening paragraphs of the chapter with a highlighter, marking ONLY sensory words (smell.', 'Ask them to group these sensory details into clusters (monsoon, childhood play, domestic space, school/exam).', 'For each cluster, write one sentence: "This cluster makes the reader feel ______ because ______." 4.', 'Finally, compare two clusters: how does the atmosphere shift?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a poem involves examining the central.',
          hint: 'If stuck, review "Identifying Speaker vs Protagonist in Poetry" from.',
          misconception: 'Students often treat the protagonist as a generic "child" without analyzing how specific folk images (मिट्टी के खिलौने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in a poem involves examining the central figure\'s',
                  options: ['Character analysis of the protagonist in a poem involves examining the central figure\'s', '"Before You Read: Context and Background" for Chapter 8 provides the essential', 'Plot and Narrative Structure in a narrative poem refers to the sequence of events,', 'Setting and Atmosphere refers to the time, place, physical environment, and'],
                  hint: 'If stuck, review "Identifying Speaker vs Protagonist in Poetry" from c11_hin_ar_cbse_01_004 and.',
                  misconception: 'Students often treat the protagonist as a generic "child" without analyzing how specific folk images (मिट्टी के खिलौने, चाँद मांगना.' }
          ],
            remediations: { 'students-often-treat-the-protagonist': { steps: ['Re-read the poem aloud, circling every verb associated with the child (खेलता, बनाता, ताकता, मांगता, बैठा).', 'For each verb, write the exact line and the image it creates.', 'Revisit node c12_hin_ar_cbse_08_003 (Setting and Atmosphere) to see how the rural setting shapes these actions.', 'Re-attempt Diagnostic Question 4 with this evidence table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_005', difficulty: 'standard',
          question: 'Supporting characters are secondary figures in a narrative who interact with.',
          hint: 'If stuck on identifying functions, review the \'Character Typology Cheat Sheet\' in Class.',
          misconception: 'Students believe supporting characters are \'easier\' to analyze because they have fewer lines, so they write superficial.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters are secondary figures in a narrative who interact with the',
                  options: ['Supporting characters are secondary figures in a narrative who interact with the', '"Before You Read: Context and Background" for Chapter 8 provides the essential', 'Plot and Narrative Structure in a narrative poem refers to the sequence of events,', 'Setting and Atmosphere refers to the time, place, physical environment, and'],
                  hint: 'If stuck on identifying functions, review the \'Character Typology Cheat Sheet\' in Class 11 node.',
                  misconception: 'Students believe supporting characters are \'easier\' to analyze because they have fewer lines, so they write superficial summaries ("वह.' }
          ],
            remediations: { 'supporting-characters-are-easier-to': { steps: ['If a student cannot move beyond description: 1.', 'Have them list every scene the character appears in (column 1), the character\'s action/dialogue (column 2), the.', 'Use the table to write one PEEL paragraph per character.', 'Re-attempt Diagnostic Question 3 with a different character.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe supporting characters are \'easier\' to analyze because they have fewer lines, so they write superficial.',
          parts: [
                { id: 'a', prompt: 'Critique this student claim: "Supporting characters are only included to make the story realistic; they have no thematic purpose." Defend or refute using.', answer: 'Refute',
                  options: ['Refute', 'वह अच्छा दोस्त है'],
                  hint: 'If stuck on identifying functions, review the \'Character Typology Cheat Sheet\' in Class 11 node.',
                  misconception: 'Students believe supporting characters are \'easier\' to analyze because they have fewer lines, so they write superficial summaries ("वह.' }
          ],
            remediations: { 'supporting-characters-are-easier-to': { steps: ['If a student cannot move beyond description: 1.', 'Have them list every scene the character appears in (column 1), the character\'s action/dialogue (column 2), the.', 'Use the table to write one PEEL paragraph per character.', 'Re-attempt Diagnostic Question 3 with a different character.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea — the.',
          hint: 'If stuck, return to c11_hin_ar_cbse_01_006 (Theme: Primary Theme and Message — Class 11.',
          misconception: 'Students conflate "theme" with "author\'s biography" or "historical context" — e.g., writing "The theme is रेणु\'s life.',
          parts: [
                { id: 'a', prompt: 'Apply the "theme-evidence-link" method: Select ONE stanza from the "झाँकी" poem and show how its imagery (mud pies, kite-flying, spinning tops) supports the.', answer: 'Step 1: Identify stanza',
                  options: ['Step 1: Identify stanza', 'harmony'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_01_006 (Theme: Primary Theme and Message — Class 11 Chapter 1).',
                  misconception: 'Students conflate "theme" with "author\'s biography" or "historical context" — e.g., writing "The theme is रेणु\'s life in Bihar" or "The.' }
          ],
            remediations: { 'students-conflate-theme-with-author': { steps: ['Re-read the "झाँकी" poem *only* — ignore the prose — and list every noun that is a natural object (tree, mud, wind.', 'For each noun, write one sentence: "This object shows children ______." 3.', 'Find the common verb pattern (play, run, fly, float, grow).', 'Formulate: "The theme is childhood ______ nature." 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
