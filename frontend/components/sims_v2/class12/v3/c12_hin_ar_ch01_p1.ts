import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch01_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch01_p1',
    title: 'vkyksd èkUok · Part 1/3',
    subtitle: '\'I am pulp\' — the intellectual who saw the machine from inside',
    classLevel: 12, subject: 'hin_ar', topic: 'vkyksd èkUok · Part 1/3',
    chapters: ['c12_hin_ar_ch01'],
    nodeIds: ['c12_hin_ar_cbse_01_001', 'c12_hin_ar_cbse_01_002', 'c12_hin_ar_cbse_01_003', 'c12_hin_ar_cbse_01_004', 'c12_hin_ar_cbse_01_005', 'c12_hin_ar_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi modern-poetry reader', intro: 'A Progressive poet who served both university and ministry writes about being ground to pulp. Context is the key.', goal: 'Situate Muktibodh\'s Vartmaan in the Progressive movement and post-1947 disillusionment.' },
    discovery: {
        question: 'Freedom came in 1947 — yet by the 1950s a professor-poet wrote \'मैं लुगदी हूँ\' — I am pulp. What turned independence into existential dread?',
        options: ['The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system', 'The poet was personally ill', 'Romanticism just ended', 'Poetry was unfashionable'],
        answer: 'The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system',
        hook: 'Muktibodh wasn\'t a छायावादी dreamer — he was Progressive: class, institutions, the writer\'s complicity. As academic and state functionary both, his \'I\' is lived conflict — self-pity becomes a calculated indictment of the intellectual inside the machine.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is the preparatory step where students gather essential information about the author\'s life, historical period, literary movement, and cultural milieu.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read \'वर्तमान\' inside its decade: map the छायावाद-to-प्रगतिवाद shift, weigh the intellectual\'s self-deception against his conscience, and hear what \'pulp\' means from a man who served the state.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re handed a letter written in 1960 by a stranger — you\'d want to know who wrote it, what was happening in their world, and why they wrote it before.',
            decisions: [{ prompt: 'Who is the author of the poem "वर्तमान" prescribed in Class 12 Hindi Aroh Chapter 1, and what literary movement is he associated with?', options: [
                { text: 'The author is गजानन माधव मुक्तिबोध (Gajanan Madhav Muktibodh, 1907–1964), a central', outcome: 'The author is गजानन माधव मुक्तिबोध (Gajanan Madhav Muktibodh, 1907–1964), a central figure of the.' },
                { text: 'निराला, अज्ञेय, or calling him a छायावादी कवि', outcome: 'Not quite — **Misconception:** "Context is just background trivia — dates, birthplace, awards.', reveals: 'misconception-context-is-just-background' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a street play where the narrator suddenly hands the microphone to a comma, then a full stop, then a question mark — each arguing why.',
            decisions: [{ prompt: 'Identify the **four stages of narrative arc** (exposition, rising action, climax, resolution) and match each to the correct stanza range.', options: [
                { text: 'Correct mapping: Exposition = Stanzas 1-3 (poet introduces himself and his craft)', outcome: 'Correct mapping: Exposition = Stanzas 1-3 (poet introduces himself and his craft); Rising Action.' },
                { text: 'narrative structure = plot summary', outcome: 'Not quite — Students believe **"narrative structure = plot summary"** — they list "what happens" in each stanza.', reveals: 'narrative-structure-plot-summary-they' },
                { text: 'what happens', outcome: 'Not quite — Students believe **"narrative structure = plot summary"** — they list "what happens" in each stanza.', reveals: 'narrative-structure-plot-summary-they' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into a room where a protest song is being sung — you instantly feel the tension, the hope, the collective anger.',
            decisions: [{ prompt: 'What is the primary physical setting invoked in the opening stanza of "vkReifjp;" and which two words establish it?', options: [
                { text: 'The primary physical setting is the rural agrarian landscape, established by the words', outcome: 'The primary physical setting is the rural agrarian landscape, established by the words "खेत".' },
                { text: 'city street', outcome: 'Not quite — Students often treat "setting" as only the geographical location mentioned in the first line (e.g.', reveals: 'students-often-treat-setting-as' },
                { text: 'temple', outcome: 'Not quite — Students often treat "setting" as only the geographical location mentioned in the first line (e.g.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you meet someone new — you listen to their words, notice their tone, watch their gestures, and gradually form a picture of who they are.',
            decisions: [{ prompt: 'In the poem "व्यक्तित्व", the line "मैं लसग-लज्जा का इकु नद करता हूँ" uses a metaphor.', options: [
                { text: 'Correct answer: The seed metaphor suggests the speaker sees themselves as a small but', outcome: 'Correct answer: The seed metaphor suggests the speaker sees themselves as a small but potent source.' },
                { text: 'The speaker feels small and insignificant', outcome: 'Not quite — Students consistently treat the poetic "I" as the poet\'s autobiography.', reveals: 'students-consistently-treat-the-poetic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are directing a play where the poet is the lead actor.',
            decisions: [{ prompt: 'Identify the three supporting characters explicitly named or directly addressed in the poem \'vkyksd èkUok\'.', options: [
                { text: 'The three supporting characters are: (1) the revolutionary leader addressed as', outcome: 'The three supporting characters are: (1) the revolutionary leader addressed as \'fnys&nkxnkj\'.' },
                { text: 'the poet \'cgknqj\'kkg ”kI\' or the British', outcome: 'Not quite — Students believe \'character analysis\' only applies to stories with named, speaking characters.', reveals: 'character-analysis-only-applies-to' },
                { text: '\'character analysis\' only applies to stories with named, speaking characters', outcome: 'Not quite — Students believe \'character analysis\' only applies to stories with named, speaking characters.', reveals: 'character-analysis-only-applies-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re asked in the board exam: "What is the central theme of \'vkReifjp;\' and how does the poet convey it?" Most students freeze because they try.',
            decisions: [{ prompt: 'What is the difference between a poem\'s \'subject\' and its \'theme\'? Answer in one sentence.', options: [
                { text: 'The subject is the literal topic (e.g., \'the poet\'s self-introduction\'), while the theme', outcome: 'The subject is the literal topic (e.g., \'the poet\'s self-introduction\'), while the theme is the.' },
                { text: 'The theme is self-confidence', outcome: 'Not quite — Students believe the theme is a single sentence they can memorize ("The theme is self-confidence".', reveals: 'the-theme-is-a-single' },
                { text: 'The theme is fighting for justice', outcome: 'Not quite — Students believe the theme is a single sentence they can memorize ("The theme is self-confidence".', reveals: 'the-theme-is-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your poem is accepted by the college magazine, but the editor returns it blood-red with corrections, insisting every comma and full stop sit exactly where the rulebook demands. Your gut says the rules are flattening the voice.',
            decisions: [{ prompt: 'What would Nirala\'s \'विराम चिह्न\' tell both sides?', options: [
                { text: 'Let the punctuation marks argue their case — but don\'t let them own the poem; Nirala personifies them, hears them out, then refuses to be their slave, and finally hands the judgment to the reader.', outcome: 'The poem\'s structure is the lesson: rules speak (rising action), the poet resists (climax), and the verdict is democratically opened (\'you decide\') — craft serves voice, not the reverse.' },
                { text: 'Delete every mark — if rules are tyranny, true freedom is a poem with no punctuation at all.', outcome: 'Nirala refuses slavery, not punctuation — the marks stay in the poem as characters with a hearing; abolishing them confuses liberation with vandalism.', reveals: 'freedom-means-no-rules' },
                { text: 'Accept every correction — punctuation exists to discipline expression, and the editor\'s word is final.', outcome: 'That\'s precisely the gulami the poet rejects at the climax; the poem stages the marks\' claims so the poet — and finally the reader — can overrule them.', reveals: 'rules-outrank-voice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now place a poem in its movement — and hear post-independence disillusion speaking as first-person dread.',
            decisions: [{ prompt: 'What comes next? vkyksd èkUok · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — vkyksd èkUok · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is the preparatory step where.',
          hint: 'If stuck, review Class 11 Hindi Aroh Chapter 1 "Before You Read" and Theme nodes.',
          misconception: '**Misconception:** "Context is just background trivia — dates, birthplace, awards.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why knowing that Muktibodh taught at Nagpur University (1942–1952) and later worked in the Ministry of Information matters for.', answer: 'His dual role — academic intellectual and state functionary — places him at the',
                  options: ['His dual role — academic intellectual and state functionary — places him at the', 'it doesn\'t matter, only the poem matters', '(I) reflects a man who witnessed bureaucracy up close, making lines like'],
                  hint: 'If stuck, review Class 11 Hindi Aroh Chapter 1 "Before You Read" and Theme nodes.',
                  misconception: '**Misconception:** "Context is just background trivia — dates, birthplace, awards.' }
          ],
            remediations: { 'misconception-context-is-just-background': { steps: ['If a student cannot articulate Muktibodh\'s Progressive stance or link it to the poem: 1.', '**Re-read** the NCERT "Before You Read" box (page 1–2 of chapter) and underline 5 factual claims.', '**Revisit** Class 11 node `c11_hin_ar_cbse_01_001` (प्रगतिवाद का परिचय) — watch a 10-min YouTube summary of "प्रगतिशील.', '**Do a 5-minute write:** "How does a poet employed by the government write against the establishment?" — this forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_002', difficulty: 'standard',
          question: 'Narrative structure in poetry refers to the deliberate organization of events.',
          hint: 'If stuck, review "story mountain" (exposition-rising-climax-resolution) from Class 11.',
          misconception: 'Students believe **"narrative structure = plot summary"** — they list "what happens" in each stanza (e.g., "First poet.',
          parts: [
                { id: 'a', prompt: 'In "विराम चिह्न", Nirala uses **direct speech** for both the poet and the punctuation marks.', answer: 'Direct speech creates **immediacy and dramatic confrontation**',
                  options: ['Direct speech creates **immediacy and dramatic confrontation**', 'It makes the poem more poetic', 'narrative structure = plot summary', 'what happens'],
                  hint: 'If stuck, review "story mountain" (exposition-rising-climax-resolution) from Class 11 Hindi node.',
                  misconception: 'Students believe **"narrative structure = plot summary"** — they list "what happens" in each stanza (e.g., "First poet talks, then comma.' },
                { id: 'b', prompt: '**Apply** the concept of "narrative hook" to the opening stanza of "विराम चिह्न": "व्याख्यान एकौक / कविता की एकौक / ..." (paraphrased).', answer: '**Hook**: The poet\'s paradoxical self-definition',
                  options: ['**Hook**: The poet\'s paradoxical self-definition', 'narrative structure = plot summary', 'what happens', 'First poet talks, then comma talks, then poet gets angry'],
                  hint: 'If stuck, review "story mountain" (exposition-rising-climax-resolution) from Class 11 Hindi node.',
                  misconception: 'Students believe **"narrative structure = plot summary"** — they list "what happens" in each stanza (e.g., "First poet talks, then comma.' }
          ],
            remediations: { 'narrative-structure-plot-summary-they': { steps: ['**Revisit Class 11 node c11_hin_ar_cbse_01_002** (Plot and Narrative Structure) — re-do the "story mountain" exercise.', '**Do a "Voice Shift Audit" on "विराम चिह्न"**: Photocopy the poem, use 3 highlighters: Poet (yellow), Punctuation.', 'This forces **structural seeing** over content reading.', '**Re-diagnostic**: Give the student a new 4-stanza narrative poem (e.g., Dhumil\'s "मोचीराम") and ask: "Map the voice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"narrative structure = plot summary"** — they list "what happens" in each stanza (e.g., "First poet.',
          parts: [
                { id: 'a', prompt: '**Evaluate** this claim: "The resolution of \'विराम चिह्न\' fails because the poet doesn\'t defeat the punctuation marks — he just appeals to the reader." Defend.', answer: '**Refute**',
                  options: ['**Refute**', 'narrative structure = plot summary', 'what happens', 'First poet talks, then comma talks, then poet gets angry'],
                  hint: 'If stuck, review "story mountain" (exposition-rising-climax-resolution) from Class 11 Hindi node.',
                  misconception: 'Students believe **"narrative structure = plot summary"** — they list "what happens" in each stanza (e.g., "First poet talks, then comma.' }
          ],
            remediations: { 'narrative-structure-plot-summary-they': { steps: ['**Revisit Class 11 node c11_hin_ar_cbse_01_002** (Plot and Narrative Structure) — re-do the "story mountain" exercise.', '**Do a "Voice Shift Audit" on "विराम चिह्न"**: Photocopy the poem, use 3 highlighters: Poet (yellow), Punctuation.', 'This forces **structural seeing** over content reading.', '**Re-diagnostic**: Give the student a new 4-stanza narrative poem (e.g., Dhumil\'s "मोचीराम") and ask: "Map the voice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the temporal, spatial, and socio-cultural backdrop.',
          hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_01_003 (Setting and Atmosphere) and re-do.',
          misconception: 'Students often treat "setting" as only the geographical location mentioned in the first line (e.g., "village") and.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "atmosphere" to the line "फाँसी का तख्ता मेरा मंच है" — what mood does it create and which two sound devices amplify it?', answer: 'The line creates an atmosphere of defiant courage mixed with grim acceptance',
                  options: ['The line creates an atmosphere of defiant courage mixed with grim acceptance', 'bravery'],
                  hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_01_003 (Setting and Atmosphere) and re-do the.',
                  misconception: 'Students often treat "setting" as only the geographical location mentioned in the first line (e.g., "village") and "atmosphere" as a single.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot map the spatial trajectory, have them physically draw a "setting map" on paper: draw four boxes.', 'Then ask them to connect the boxes with arrows and label each arrow with the transition word from the poem (e.g.', 'This visual-spatial scaffold converts abstract analysis into concrete steps.', 'Re-diagnose with Question 2 after the activity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves identifying and.',
          hint: 'If stuck, revisit `c11_hin_ar_cbse_02_004` Worked Example 2 where Muktibodh\'s "मैं".',
          misconception: 'Students consistently treat the poetic "I" as the poet\'s autobiography.',
          parts: [
                { id: 'a', prompt: 'Compare the protagonist of Chandrakant Deotale\'s 1857 poem ("यहrk ugha gS fny esjk...") with the protagonist of "व्यक्तित्व".', answer: 'Correct answer: Deotale\'s speaker ("नक्स वकसकी कुद है"',
                  options: ['Correct answer: Deotale\'s speaker ("नक्स वकसकी कुद है"', 'Both speakers feel helpless', 'नद करता हूँ', 'फेंकता हूँ'],
                  hint: 'If stuck, revisit `c11_hin_ar_cbse_02_004` Worked Example 2 where Muktibodh\'s "मैं" is mapped.',
                  misconception: 'Students consistently treat the poetic "I" as the poet\'s autobiography.' }
          ],
            remediations: { 'students-consistently-treat-the-poetic': { steps: ['If a student persists in poet=persona confusion: 1.', '**Isolate the gap**: Give two short poems — one autobiographical (e.g., Nirala\'s "सरोज स्मृति"), one persona-driven.', 'Ask: "Which poet *could* have written the other\'s poem?', '**Micro-drill**: Highlight every "मैं" in "व्यक्तित्व".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_005', difficulty: 'standard',
          question: 'Supporting characters in a poem are the secondary voices, entities, or personas.',
          hint: 'If stuck, revisit c12_hin_ar_cbse_01_004 (Protagonist) and practice the \'Who speaks?',
          misconception: 'Students believe \'character analysis\' only applies to stories with named, speaking characters.',
          parts: [
                { id: 'a', prompt: 'Identify the three supporting characters explicitly named or directly addressed in the poem \'vkyksd èkUok\'.', answer: 'The three supporting characters are: (1) the revolutionary leader addressed as',
                  options: ['The three supporting characters are: (1) the revolutionary leader addressed as', 'the poet \'cgknqj\'kkg ”kI\' or the British', '\'character analysis\' only applies to stories with named, speaking characters'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_01_004 (Protagonist) and practice the \'Who speaks? To whom?',
                  misconception: 'Students believe \'character analysis\' only applies to stories with named, speaking characters.' }
          ],
            remediations: { 'character-analysis-only-applies-to': { steps: ['If a student cannot identify supporting characters, do NOT re-teach the poem.', 'Instead: (1) Give them a 4-line dialogue poem (e.g., a mother calling a child).', 'Who is spoken about?\' (2) Map those three roles onto \'vkyksd èkUok\' using coloured pencils: red for speaker, blue for.', '(3) Have them write one sentence per colour using the frame: \'The [role] is [entity] because the text says [quote].\'.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea or insight about.',
          hint: 'If stuck, review Class 11 Chapter 6 "eèkq\'kkyk" theme analysis (c11_hin_ar_cbse_06_006).',
          misconception: 'Students believe the theme is a single sentence they can memorize ("The theme is self-confidence" or "The theme.',
          parts: [
                { id: 'a', prompt: 'The refrain "fnu tYnh&tYnh <yrk gS" appears four times. Apply the concept of \'refrain as thematic anchor\' to explain how this repetition shapes the poem\'s.', answer: 'Step 1: Identify the refrain\'s literal meaning',
                  options: ['Step 1: Identify the refrain\'s literal meaning', 'The theme is self-confidence', 'The theme is fighting for justice'],
                  hint: 'If stuck, review Class 11 Chapter 6 "eèkq\'kkyk" theme analysis (c11_hin_ar_cbse_06_006) — it uses.',
                  misconception: 'Students believe the theme is a single sentence they can memorize ("The theme is self-confidence" or "The theme is fighting for justice").' },
                { id: 'b', prompt: 'Compare the speaker\'s stance in stanza 2 ("eSa Lusg&lqjk dk iku fd;k djrk gw¡] eSa dHkh u tx dk è;ku fd;k djrk gw¡") with stanza 5 ("eSa jks;k] bldks rqe dgrs.', answer: 'Stanza 2 asserts radical individuality',
                  options: ['Stanza 2 asserts radical individuality', 'The theme is self-confidence', 'The theme is fighting for justice'],
                  hint: 'If stuck, review Class 11 Chapter 6 "eèkq\'kkyk" theme analysis (c11_hin_ar_cbse_06_006) — it uses.',
                  misconception: 'Students believe the theme is a single sentence they can memorize ("The theme is self-confidence" or "The theme is fighting for justice").' }
          ],
            remediations: { 'the-theme-is-a-single': { steps: ['Have the student re-read the poem aloud, marking every "eSa ... fy, fiQjrk gw¡" declaration with a highlighter.', 'List all 7-8 declarations on paper.', 'Group them: which are about *self*? Which about *others*? Which about *truth/time*?', 'Ask: "What single insight connects *all* these groups?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
