import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch04_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch04_p1',
    title: 'f\'k{kk · Part 1/3',
    subtitle: 'Read a bureaucratic \'order\' as parody — and a soldier\'s letter as an accusation.',
    classLevel: 11, subject: 'hin_ar', topic: 'f\'k{kk · Part 1/3',
    chapters: ['c11_hin_ar_ch04'],
    nodeIds: ['c11_hin_ar_cbse_04_001', 'c11_hin_ar_cbse_04_002', 'c11_hin_ar_cbse_04_003', 'c11_hin_ar_cbse_04_004', 'c11_hin_ar_cbse_04_005', 'c11_hin_ar_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader unmasking a ridiculous official letter', intro: 'A letter reaches the king from his own soldier — part chronicle of past glory, part folk tale, part indictment.', goal: 'Decode Guleri\'s linguistic satire and analyse the letter\'s fragmented narrative structure.' },
    discovery: {
        question: 'A British officer\'s order arrives dressed in legal English, dead Sanskrit and bazaar Hindi — is the absurdity just clumsy writing?',
        options: ['No — the linguistic mess is the satire: colonial authority is shown as performance, not competence', 'Yes — the officer simply couldn\'t write Hindi', 'No — it\'s actually a translation error by the editor', 'Yes — satire requires elegant language'],
        answer: 'No — the linguistic mess is the satire: colonial authority is shown as performance, not competence',
        hook: 'Guleri edited a paper through the 1899 famine that killed crores while grain was exported — the mock-bureaucratic \'order\' is a weapon, not a joke.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the historical, biographical, and literary framework necessary to interpret Chandradhar Sharma Guleri\'s satirical sketch.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Break a soldier\'s letter into its blocks — past glory, present misery, the snake-and-two-women folktale — and ask what the broken structure does to the ruler reading it.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are handed a letter written in a mix of legal English, archaic Sanskrit, and colloquial Hindi—would you trust its authority or suspect a trap?',
            decisions: [{ prompt: 'What specific editorial role did Chandradhar Sharma Guleri hold between 1899–1905, and which two publications are explicitly named in the.', options: [
                { text: 'Guleri served as संपादक (editor) of भारतमित्र (1899–1904) and सरस्वती (1904–1905)', outcome: 'Guleri served as संपादक (editor) of भारतमित्र (1899–1904) and सरस्वती (1904–1905).' },
                { text: 'he was a poet', outcome: 'Not quite — Students treat "context" as a list of dates (1865 birth, 1907 death, 1899–1905 editorship) rather.', reveals: 'students-treat-context-as-a' },
                { text: 'he wrote for हिंदी मिलाप', outcome: 'Not quite — Students treat "context" as a list of dates (1865 birth, 1907 death, 1899–1905 editorship) rather.', reveals: 'students-treat-context-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re watching a historical drama where the director uses dim lighting, colonial architecture, and tense background music to make you feel the.',
            decisions: [{ prompt: 'Identify the specific historical period and political context that forms the setting of "फोन्कब्ज़-लाहकक.क" as established in the opening.', options: [
                { text: 'The setting is India during Lord Curzon\'s viceroyalty (1899-1905), a period marked by', outcome: 'The setting is India during Lord Curzon\'s viceroyalty (1899-1905), a period marked by aggressive.' },
                { text: 'British rule generally', outcome: 'Not quite — Students often treat setting as a static backdrop (time/place labels) and atmosphere as a single.', reveals: 'students-often-treat-setting-as' },
                { text: 'post-1857', outcome: 'Not quite — Students often treat setting as a static backdrop (time/place labels) and atmosphere as a single.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a play where the main actor delivers powerful monologues, but the story makes no sense without the reactions of the people around him.',
            decisions: [{ prompt: 'Identify the two supporting characters in \'f\'k{kk\' who are sisters and describe the key difference in their fate as presented in the.', options: [
                { text: 'The two sisters are the daughters of the snake-charmer (sapera)', outcome: 'The two sisters are the daughters of the snake-charmer (sapera).' },
                { text: 'character trait', outcome: 'Not quite — Students treat supporting characters as "background decoration" and write generic descriptions like.', reveals: 'students-treat-supporting-characters-as' },
                { text: 'character function', outcome: 'Not quite — Students treat supporting characters as "background decoration" and write generic descriptions like.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are handed a long, itemized bill for "services rendered" that you never asked for and that actually ruined your business – that is the narrator’s.',
            decisions: [{ prompt: 'What is the primary theme of the chapter "फोनबूथ" as revealed through the narrator’s monologue?', options: [
                { text: 'The primary theme is a comprehensive satirical critique of British colonial rule in', outcome: 'The primary theme is a comprehensive satirical critique of British colonial rule in India, exposing.' },
                { text: 'a conversation in a phone booth', outcome: 'Not quite — Students often conflate the *setting* (a phone booth, a final conversation) with the *theme*.', reveals: 'students-often-conflate-the-setting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a satire-writing workshop you take Guleri\'s sketch — a soldier\'s letter to his ruler mixing Sanskrit, Persian officialese and folk tale. A participant says: \'The mixed language is sloppy writing, and the snake-and-two-women folk tale is a pointless digression from the letter\'s complaint.\'',
            decisions: [{ prompt: 'How do you defend the text\'s design?', options: [
                { text: 'Decode the hybridity: the officer\'s mangled officialese (vakil, daftar, hukm) parodies the Persianised bureaucratic register — colonial power as performative language — while the elder sister\'s brave Sanskritised speech vs the younger\'s fearful fragments allegorise indigenous tradition vs colonised psyche. And the folk tale isn\'t digression: it\'s a parallel symbolic sub-plot doing the work of satire and allegory inside the letter form.', outcome: 'The workshop sees context as decoder: Guleri\'s famine-era journalism weaponised language — every register switch and the embedded tale are the critique.' },
                { text: 'Agree the language is sloppy — clean it into uniform modern Hindi for the exercise.', outcome: 'Uniforming the register erases the satire: the collision of Sanskrit, Persian and colloquial speech is precisely how colonial authority gets mocked.', reveals: 'hybrid-language-is-sloppy' },
                { text: 'Cut the folk tale — a letter should stick to its complaint.', outcome: 'The sub-plot carries the allegorical weight: it mirrors and sharpens the main letter\'s charge, so cutting it removes the satire\'s core.', reveals: 'folk-tale-is-digression' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Two sisters face the same officer — one answers in courage and Sanskritised rebuke, one in fear; both are true, and that refusal of a clean binary is the honesty.',
            decisions: [{ prompt: 'What comes next? f\'k{kk · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — f\'k{kk · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the.',
          hint: 'Review Class 10 History "The Making of a Nation" (print culture section) and Hindi "हिंदी.',
          misconception: 'Students treat "context" as a list of dates (1865 birth, 1907 death, 1899–1905 editorship) rather than a hermeneutic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the historical,',
                  options: ['"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the historical,', 'कथावस्तु (Plot) किसी रचना में घटनाओं का तार्किक और कारण-परिणाम संबंध से बुना गया क्रम है,', 'Setting refers to the time, place, and historical context in', 'Character analysis of the protagonist involves a systematic examination of the central'],
                  hint: 'Review Class 10 History "The Making of a Nation" (print culture section) and Hindi "हिंदी भाषा का.',
                  misconception: 'Students treat "context" as a list of dates (1865 birth, 1907 death, 1899–1905 editorship) rather than a hermeneutic tool.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['Have the student read the NCERT introduction\'s third paragraph ("फोंकबज-लहक्कड.क...', 'लोकसेवा") aloud, circling every तत्सम word.', 'Ask: "Which of these words would a 1900 British official NOT understand?" (Answer: लोकसेवा, स्वाधीनता, न्याय).', 'Connect: Guleri chose words the coloniser couldn\'t co-opt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_002', difficulty: 'standard',
          question: 'कथावस्तु (Plot) किसी रचना में घटनाओं का तार्किक और कारण-परिणाम संबंध से बुना.',
          hint: 'यदि अटका हुआ महसूस हो तो \'पत्र-शैली\' और \'फ्लैशबैक\' की परिभाषा व उदाहरण (कक्षा 10 की.',
          misconception: 'छात्र प्रायः \'कथावस्तु\' (Plot) और \'आख्यान संरचना\' (Narrative Structure) को समानार्थी मान लेते हैं। वे सोचते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथावस्तु (Plot) किसी रचना में घटनाओं का तार्किक और कारण-परिणाम संबंध से बुना गया क्रम है,',
                  options: ['कथावस्तु (Plot) किसी रचना में घटनाओं का तार्किक और कारण-परिणाम संबंध से बुना गया क्रम है,', '"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the historical,', 'Setting refers to the time, place, and historical context in', 'Character analysis of the protagonist involves a systematic examination of the central'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'पत्र-शैली\' और \'फ्लैशबैक\' की परिभाषा व उदाहरण (कक्षा 10 की कहानियों से).',
                  misconception: 'छात्र प्रायः \'कथावस्तु\' (Plot) और \'आख्यान संरचना\' (Narrative Structure) को समानार्थी मान लेते हैं। वे सोचते हैं कि घटनाओं का क्रम ही संरचना.' }
          ],
            remediations: { 'plot-narrative-structure': { steps: ['चरण 1: छात्र से कहें—\'घटनाएँ लिखो जो पत्र में घटीं\' (कथावस्तु)। चरण 2: पूछें—\'लेखक ने इन्हें किस क्रम में रखा है?', 'क्या समय सीधा चलता है?\' (संरचना)। चरण 3: ननद-भाभी प्रसंग पर लौटें—\'यह मुख्य फौजी की कहानी है या अलग?', 'यदि अलग, तो क्यों डाली गई?\' चरण 4: द्वितीय पुरुष संबोधन के वाक्य छाँटने को कहें—\'तुम्हारे\', \'तुम्हें\' वाले वाक्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and historical context in which a narrative.',
          hint: 'If stuck, review c11_hin_ar_cbse_04_001 (Context and Background) for Curzon\'s policies.',
          misconception: 'Students often treat setting as a static backdrop (time/place labels) and atmosphere as a single mood label ("sad,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and historical context in',
                  options: ['Setting refers to the time, place, and historical context in', '"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the historical,', 'कथावस्तु (Plot) किसी रचना में घटनाओं का तार्किक और कारण-परिणाम संबंध से बुना गया क्रम है,', 'Character analysis of the protagonist involves a systematic examination of the central'],
                  hint: 'If stuck, review c11_hin_ar_cbse_04_001 (Context and Background) for Curzon\'s policies and.',
                  misconception: 'Students often treat setting as a static backdrop (time/place labels) and atmosphere as a single mood label ("sad," "angry").' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student list every location named in the text (Delhi, Bengal, universities, municipalities, Calcutta, London).', 'Create a two-column chart: Column A = Curzon\'s words (e.g., "शिक्षा का प्रसार"), Column B = India\'s counter-vocabulary.', 'Read aloud only Curzon\'s paragraphs, then only India\'s paragraphs - hear the tonal shift.', 'Write one paragraph explaining: "The atmosphere is not one mood but a collision between two vocabularies fighting over.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves a systematic examination of the.',
          hint: 'Review c11_hin_ar_cbse_04_002 (Plot and Narrative Structure) focusing on \'dramatic.',
          misconception: 'Students often conflate the protagonist\'s *satirical persona* with his *authentic self*, treating every hyperbolic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves a systematic examination of the central',
                  options: ['Character analysis of the protagonist involves a systematic examination of the central', '"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the historical,', 'कथावस्तु (Plot) किसी रचना में घटनाओं का तार्किक और कारण-परिणाम संबंध से बुना गया क्रम है,', 'Setting refers to the time, place, and historical context in'],
                  hint: 'Review c11_hin_ar_cbse_04_002 (Plot and Narrative Structure) focusing on \'dramatic monologue\' and.',
                  misconception: 'Students often conflate the protagonist\'s *satirical persona* with his *authentic self*, treating every hyperbolic accusation (e.g., \'vkius.' }
          ],
            remediations: { 'students-often-conflate-the-protagonist': { steps: ['Re-read the opening descriptive passage (page 44-45) to distinguish authorial voice from character voice.', 'Mark every instance of \'ekb ykWMZ\' and the narrator\'s self-references (\'vkxs\', \'esjs\', \'vkiosQ\') in two colors.', 'For each colored pair, ask: \'Is the narrator stating a fact or performing an accusation?\' 4.', 'Write one sentence explaining the difference for three pairs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the traits.',
          hint: 'If stuck, review the magistrate\'s "confession scene" (page 50-51) and list every.',
          misconception: 'Students treat supporting characters as "background decoration" and write generic descriptions like "the sister was.',
          parts: [
                { id: 'a', prompt: 'Identify the two supporting characters in \'f\'k{kk\' who are sisters and describe the key difference in their fate as presented in the narrative.', answer: 'The two sisters are the daughters of the snake-charmer (sapera)',
                  options: ['The two sisters are the daughters of the snake-charmer (sapera)', 'character trait', 'character function'],
                  hint: 'If stuck, review the magistrate\'s "confession scene" (page 50-51) and list every supporting.',
                  misconception: 'Students treat supporting characters as "background decoration" and write generic descriptions like "the sister was sad" or "the father was.' },
                { id: 'b', prompt: 'Explain in your own words why the snake-charmer father refuses to let the magistrate\'s men kill his performing snake, and what this refusal reveals about his.', answer: 'The snake-charmer refuses',
                  options: ['The snake-charmer refuses', 'he liked the snake', 'character trait', 'character function'],
                  hint: 'If stuck, review the magistrate\'s "confession scene" (page 50-51) and list every supporting.',
                  misconception: 'Students treat supporting characters as "background decoration" and write generic descriptions like "the sister was sad" or "the father was.' },
                { id: 'c', prompt: 'Analyze the narrative function of the younger sister\'s death scene (denial of water).', answer: '**Plot**: Triggers the father\'s curse ("esjk iz.kke ys")',
                  options: ['**Plot**: Triggers the father\'s curse ("esjk iz.kke ys")', 'a sad event', 'character trait', 'character function'],
                  hint: 'If stuck, review the magistrate\'s "confession scene" (page 50-51) and list every supporting.',
                  misconception: 'Students treat supporting characters as "background decoration" and write generic descriptions like "the sister was sad" or "the father was.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['**Re-read with a lens**: Assign the student to re-read ONLY the scenes with the snake-charmer family (pages 46-48.', '**Function-first table**: Create a 3-column table: Character | Key Action/Dialogue | What This Proves About.', '**Oral defense**: Ask the student to explain *why* Guleri gave the dying girl no name but gave the father a curse.', '**Connect to protagonist node**: Review node 004\'s analysis of the magistrate\'s guilt; map each supporting character.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat supporting characters as "background decoration" and write generic descriptions like "the sister was.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to make the *juktoqekj* (the cursed official) the husband of the elder sister rather than a random victim.', answer: '**Defense**: It creates dramatic irony',
                  options: ['**Defense**: It creates dramatic irony', 'character trait', 'character function'],
                  hint: 'If stuck, review the magistrate\'s "confession scene" (page 50-51) and list every supporting.',
                  misconception: 'Students treat supporting characters as "background decoration" and write generic descriptions like "the sister was sad" or "the father was.' },
                { id: 'b', prompt: 'Create a 50-word monologue for the *snake* (as a silent witness) summarizing its observation of the magistrate\'s transformation from arrogant ruler to broken.', answer: '**Sample**: "Mainne dekha: sahib ka *d#.kksRiknd* andaaz, jab usne pani roka',
                  options: ['**Sample**: "Mainne dekha: sahib ka *d#.kksRiknd* andaaz, jab usne pani roka', 'character trait', 'character function'],
                  hint: 'If stuck, review the magistrate\'s "confession scene" (page 50-51) and list every supporting.',
                  misconception: 'Students treat supporting characters as "background decoration" and write generic descriptions like "the sister was sad" or "the father was.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['**Re-read with a lens**: Assign the student to re-read ONLY the scenes with the snake-charmer family (pages 46-48.', '**Function-first table**: Create a 3-column table: Character | Key Action/Dialogue | What This Proves About.', '**Oral defense**: Ask the student to explain *why* Guleri gave the dying girl no name but gave the father a curse.', '**Connect to protagonist node**: Review node 004\'s analysis of the magistrate\'s guilt; map each supporting character.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_006', difficulty: 'standard',
          question: 'The primary theme is the central, unifying idea that the author develops.',
          hint: 'If stuck, review the list of accusations in the plot summary (node 002) and the.',
          misconception: 'Students often conflate the *setting* (a phone booth, a final conversation) with the *theme*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme is the central, unifying idea that the author develops through the',
                  options: ['The primary theme is the central, unifying idea that the author develops through the', '"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the historical,', 'कथावस्तु (Plot) किसी रचना में घटनाओं का तार्किक और कारण-परिणाम संबंध से बुना गया क्रम है,', 'Setting refers to the time, place, and historical context in'],
                  hint: 'If stuck, review the list of accusations in the plot summary (node 002) and the narrator’s tone.',
                  misconception: 'Students often conflate the *setting* (a phone booth, a final conversation) with the *theme*.' }
          ],
            remediations: { 'students-often-conflate-the-setting': { steps: ['1) Have the student list five concrete accusations from the plot summary (node 002).', '2) Ask them to sort these into three buckets: Economic, Cultural, Political.', '3) Guide them to write a single sentence: "The narrator argues that British rule was a system of ______, ______, and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
