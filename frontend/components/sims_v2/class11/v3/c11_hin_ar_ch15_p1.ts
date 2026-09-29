import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch15_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch15_p1',
    title: 'पाठ 15 · Part 1/3',
    subtitle: 'Watch a poem dismantle your definitions before it offers its own.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 15 · Part 1/3',
    chapters: ['c11_hin_ar_ch15'],
    nodeIds: ['c11_hin_ar_cbse_15_001', 'c11_hin_ar_cbse_15_002', 'c11_hin_ar_cbse_15_003', 'c11_hin_ar_cbse_15_004', 'c11_hin_ar_cbse_15_005', 'c11_hin_ar_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a hill journalist naming the cruelty inside ordinary leaving', intro: 'Men leave Garhwal for Delhi\'s scaffolds and it barely counts as news — the poem asks what \'small\' and \'cruel\' really mean.', goal: 'Analyse the negative-then-positive argumentative structure and the poem\'s migrant-labour context.' },
    discovery: {
        question: 'The poem opens by listing what cruelty is NOT — three whole stanzas of negatives. Cut them and lose nothing?',
        options: ['No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle', 'Yes — a poem should state its thesis upfront', 'Yes — negative definitions are logically empty', 'No — but only because the poem would be too short'],
        answer: 'No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle',
        hook: 'The refrain flips at the fourth stanza — \'not this\' becomes \'this is the most dangerous\' — and the imagery turns from home\'s warmth to a worker\'s weary feet.',
    },
    teaching: [
        { title: 'पाठ 15 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_15_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the stanza where negation flips to assertion, then weigh the title\'s provocation — \'the smallest is not the smallest\' — against 1980s hill migration.',
        labels: ['पाठ 15 — पृष्ठभूमि', 'पाठ 15 — कथानक', 'पाठ 15 — पाठ्य-परिवेश', 'पाठ 15 — पात्र-चित्रण', 'पाठ 15 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_001', title: 'पाठ 15 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 15 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is Viren Dangwal, and which literary movement is he associated with in Hindi literature?', options: [
                { text: 'Viren Dangwal (1950–1988) was a Hindi poet and journalist from Tehri Garhwal,', outcome: 'Viren Dangwal (1950–1988) was a Hindi poet and journalist from Tehri Garhwal, Uttarakhand.' },
                { text: 'him a Chhayavaadi or Nayi Kavita poet', outcome: 'Not quite — Students treat "Before You Read" as optional trivia—memorizing the poet\'s birth/death years and.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_002', title: 'पाठ 15 — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'लघुता सबसे छोटी नहीं होती\' का क्रम: शुरुआत लघुता-सबसे-छोटी-नहीं-होती से, घटनाएँ बढ़ती हैं, अंत \'लघुता सबसे छोटी नहीं होती\' का केंद्रीय भाव और संदेश पर।',
            decisions: [{ prompt: 'What is the basic structural pattern of the poem "lcls [krjukd" in terms of how the stanzas are organized?', options: [
                { text: 'The poem opens with three stanzas that repeatedly deny common assumptions about cruelty', outcome: 'The poem opens with three stanzas that repeatedly deny common assumptions about cruelty (mother\'s.' },
                { text: 'it\'s just a list of sad things', outcome: 'Not quite — Students often believe "plot" and "narrative structure" apply only to stories with characters and.', reveals: 'plot-and-narrative-structure-apply' },
                { text: 'narrative structure', outcome: 'Not quite — Students often believe "plot" and "narrative structure" apply only to stories with characters and.', reveals: 'plot-and-narrative-structure-apply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a kavi sammelan themed on migration, someone offers \'Laguta Sabse Chhoti Nahin Hoti\' but introduces it as \'a gentle poem about how small people also matter — mothers\' love, fathers\' laps, childhood warmth.\'',
            decisions: [{ prompt: 'What is the poem actually arguing, and how is it built?', options: [
                { text: 'Read the title as provocation from a people\'s-advocate journalist of Tehri Garhwal who watched villages empty as men left for Delhi\'s construction sites: \'smallness\' is redefined as the erosion of dignity when survival fractures belonging. Structurally it argues by elimination — the first stanzas keep saying what cruelty is NOT before the positives arrive, climaxing in the weary worker\'s feet — dignity dying slowly in everyday struggle.', outcome: 'The introduction is corrected: it\'s not a warm affirmation of small lives but a reckoning with what migration does to human worth — built like a debate, not a lullaby.' },
                { text: 'Keep the gentle reading — the poem lists tender images of family, so it\'s about the dignity of simple lives.', outcome: 'The early stanzas are negatives — what cruelty is NOT — positioned to be stripped away; reading them as the thesis stops before the poem\'s real answer.', reveals: 'poem-is-gentle-affirmation' },
                { text: 'Present it as having no real structure — it\'s a mood piece on poverty, not an argument.', outcome: 'The argumentative architecture is precise: sequenced denials, a refrain as hinge, and a final image as verdict — structure performs the elimination.', reveals: 'poem-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'Written by a journalist who watched Tehri\'s villages empty to Delhi\'s construction sites — \'small\' was never about size; it\'s about what we\'re trained not to see.',
            decisions: [{ prompt: 'What comes next? पाठ 15 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 15 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'Review Class 10 Hindi literary history chart (साहित्यिक आंदोलन और उनकी विशेषताएं).',
          misconception: 'Students treat "Before You Read" as optional trivia—memorizing the poet\'s birth/death years and major works for.',
          parts: [
                { id: 'a', prompt: 'Who is Viren Dangwal, and which literary movement is he associated with in Hindi literature?', answer: 'Viren Dangwal (1950–1988) was a Hindi poet and journalist from Tehri Garhwal,',
                  options: ['Viren Dangwal (1950–1988) was a Hindi poet and journalist from Tehri Garhwal,', 'him a Chhayavaadi or Nayi Kavita poet'],
                  hint: 'Review Class 10 Hindi literary history chart (साहित्यिक आंदोलन और उनकी विशेषताएं) focusing.',
                  misconception: 'Students treat "Before You Read" as optional trivia—memorizing the poet\'s birth/death years and major works for a 1-mark factual question.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate the poet-context-theme link: Step 1—Have them re-read the textbook\'s introductory note.', 'Step 2—Ask them to convert each adjective into a "prediction question" for the poem (e.g., "जनपक्षधर → Will the poem.', 'Step 3—Have them verify predictions against the poem\'s first stanza when they reach node c11_hin_ar_cbse_15_002.', 'This transforms passive reading into active hypothesis-testing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Before You Read" as optional trivia—memorizing the poet\'s birth/death years and major works for.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Knowing the poet\'s biography before reading a poem limits a student\'s independent interpretation because it imposes a fixed lens." Defend.', answer: 'Challenge',
                  options: ['Challenge', 'simple', 'deliberately accessible as political strategy'],
                  hint: 'Review Class 10 Hindi literary history chart (साहित्यिक आंदोलन और उनकी विशेषताएं) focusing.',
                  misconception: 'Students treat "Before You Read" as optional trivia—memorizing the poet\'s birth/death years and major works for a 1-mark factual question.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate the poet-context-theme link: Step 1—Have them re-read the textbook\'s introductory note.', 'Step 2—Ask them to convert each adjective into a "prediction question" for the poem (e.g., "जनपक्षधर → Will the poem.', 'Step 3—Have them verify predictions against the poem\'s first stanza when they reach node c11_hin_ar_cbse_15_002.', 'This transforms passive reading into active hypothesis-testing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_002', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' का कथानक — \'लघुता सबसे छोटी नहीं होती\' — आरोह भाग-1.',
          hint: 'Review "stanza and refrain identification" from Class 10 poetry chapter.',
          misconception: 'Students often believe "plot" and "narrative structure" apply only to stories with characters and events, so they look.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लघुता सबसे छोटी नहीं होती\' का कथानक',
                  options: ['\'लघुता सबसे छोटी नहीं होती\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting)', '\'लघुता सबसे छोटी नहीं होती\' का पात्र-चित्रण'],
                  hint: 'Review "stanza and refrain identification" from Class 10 poetry chapter.',
                  misconception: 'Students often believe "plot" and "narrative structure" apply only to stories with characters and events, so they look for a storyline.' }
          ],
            remediations: { 'plot-and-narrative-structure-apply': { steps: ['Have the student read the poem aloud twice, marking every occurrence of "lcls [krjukd" with a highlighter.', 'Ask them to draw a simple two‑column table: left column = "What cruelty is NOT (stanzas 1‑3)", right column = "What.', 'Guide them to notice the refrain changes from "ugha gksrh" to "gksrk gS" exactly at the column break.', 'Finally, have them write one sentence explaining why the poet needed the left column before writing the right column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_003', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'Review the distinction between \'setting as backdrop\' and \'setting as active force\' using.',
          misconception: 'Students often treat \'setting\' as a static label (\'rural India\', \'1980s\') and \'atmosphere\' as a single adjective.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting)',
                  options: ['\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लघुता सबसे छोटी नहीं होती\' का कथानक', '\'लघुता सबसे छोटी नहीं होती\' का पात्र-चित्रण'],
                  hint: 'Review the distinction between \'setting as backdrop\' and \'setting as active force\' using a परिचित.',
                  misconception: 'Students often treat \'setting\' as a static label (\'rural India\', \'1980s\') and \'atmosphere\' as a single adjective (\'sad\', \'gloomy\'), missing.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Re-read the poem *only* for place/time words (घर, खेत, पगडंडी, सांझ, रात, दिन) and mark them in one colour; re-read for.', 'Draw a two-column timeline: left column = physical movement (leaving, walking, returning); right column = atmospheric.', 'Write one sentence per stanza: \'In this stanza the setting is ___ and the atmosphere is ___ because ___.\' 4.', 'Compare your sentences with a peer — if your atmosphere words are all synonyms of \'sad\', go back and find the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_004', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_15_002 (कथानक और आख्यान-संरचना)** के.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि पात्र-चित्रण = **गुणों की सूची (list of traits)** जैसे "ईमानदार, बहादुर, भावुक"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लघुता सबसे छोटी नहीं होती\' का पात्र-चित्रण',
                  options: ['\'लघुता सबसे छोटी नहीं होती\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लघुता सबसे छोटी नहीं होती\' का कथानक', '\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_15_002 (कथानक और आख्यान-संरचना)** के "कथानक-चरण पहचान".',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि पात्र-चित्रण = **गुणों की सूची (list of traits)** जैसे "ईमानदार, बहादुर, भावुक"। वे **पात्र को स्थिर.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**चरण 1**: छात्र को एक **परिचित कहानी** (जैसे: \'उपन्यास सम्राट प्रेमचंद की \'बूढ़ी काकी\' या पाठ्यपुस्तक की कोई कहानी).', 'यदि हाँ, तो **क्या बदला** और **क्या स्थिर रहा**?" **चरण 3**: अब **PEEL शीट** दें: Point (गुण), Evidence (उद्धरण).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_005', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ.',
          hint: 'If stuck, review c11_hin_ar_cbse_15_002 (Plot and Narrative Structure) to map the poem\'s.',
          misconception: 'Students often treat the poem\'s figures as literal characters in a story (e.g., "the woman," "the mother," "the hungry.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet rejects "a woman\'s shadow" and "a mother\'s love" as examples of the "smallest" thing, even though both are traditionally.', answer: 'The poet rejects them',
                  options: ['The poet rejects them', 'because women and mothers are important'],
                  hint: 'If stuck, review c11_hin_ar_cbse_15_002 (Plot and Narrative Structure) to map the poem\'s movement.',
                  misconception: 'Students often treat the poem\'s figures as literal characters in a story (e.g., "the woman," "the mother," "the hungry man") and analyze.' },
                { id: 'b', prompt: 'Compare the figure of "the hungry person returning home" (eqnkZ \'kkafr ls Hkj tkuk) with "the one whose dreams die" (gekjs liuksa dk ej tkuk).', answer: 'The hungry returnee represents material deprivation',
                  options: ['The hungry returnee represents material deprivation', 'types of poor people'],
                  hint: 'If stuck, review c11_hin_ar_cbse_15_002 (Plot and Narrative Structure) to map the poem\'s movement.',
                  misconception: 'Students often treat the poem\'s figures as literal characters in a story (e.g., "the woman," "the mother," "the hungry man") and analyze.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['If a student writes a "character sketch" of the hungry man describing his personality, take these steps: (1) Show them.', '(2) Ask: "Does the poem tell us this man\'s name, caste, village, or thoughts?', 'It only tells us what the system does TO him." (3) Have them rewrite the analysis replacing "the hungry man" with "the.', '(4) Practice with the "frog-eyed watcher": identify the structural position (surveillance subject) and the bodily.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_006', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' का मुख्य विषय — \'लघुता सबसे छोटी नहीं होती\' का.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_15_002 (कथानक संरचना) और c11_hin_ar_cbse_15_004 (नायक चित्रण).',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य विषय\' = \'लेखक का संदेश\' = \'कहानी का नैतिक उपदेश\' (Moral of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लघुता सबसे छोटी नहीं होती\' का मुख्य विषय',
                  options: ['\'लघुता सबसे छोटी नहीं होती\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लघुता सबसे छोटी नहीं होती\' का कथानक', '\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_15_002 (कथानक संरचना) और c11_hin_ar_cbse_15_004 (नायक चित्रण) दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य विषय\' = \'लेखक का संदेश\' = \'कहानी का नैतिक उपदेश\' (Moral of the story)** — तीनों एक ही हैं।.' }
          ],
            remediations: { 'moral-of-the-story-theme': { steps: ['**अंतर स्पष्ट करें:** छात्र से कहें — "तीन वाक्य लिखो: (क) कहानी क्या कहती है?', '(ख) प्रेमचंद क्या कहना चाहते हैं?', '(ग) तुम्हें क्या सीख मिली?" — तीनों की तुलना करवाएँ। 2.', '**पाठ-आधारित प्रमाण मांगें:** "वंशीधर के किस संवाद/कृत्य से तुम्हें लगा कि विषय \'ईमानदारी की कीमत\' है?" — जब तक वह 2-3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
