import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch02_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'Watch a quiet cook defeat his master without ever raising his voice.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c11_hin_ar_ch02'],
    nodeIds: ['c11_hin_ar_cbse_02_001', 'c11_hin_ar_cbse_02_002', 'c11_hin_ar_cbse_02_003', 'c11_hin_ar_cbse_02_004', 'c11_hin_ar_cbse_02_005', 'c11_hin_ar_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener piecing together a servant\'s hidden past', intro: 'Puris puff on the stove while a nickname — \'उल्हनिहु\' — opens a trapdoor into a whole colonial history.', goal: 'Analyse the story\'s flashback structure and read its silent ending as resistance.' },
    discovery: {
        question: 'The cook Phenku ends the story serving puris in silence — the narrator learned nothing, so the ending resolves nothing?',
        options: ['Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history', 'Right — an open ending is a narrative failure', 'Right — the colonial anecdote deserved a dramatic payoff', 'Wrong — he actually resigns at the end'],
        answer: 'Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history',
        hook: 'The story hides its oldest event two-thirds of the way in — a flashback that only lands because we met the dignified cook first.',
    },
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reorder the five scenes by narrative logic rather than chronology, and argue why the colonial-officer flashback lands where it does.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_001', title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 02 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is Phanishwar Nath Renu and what is his primary contribution to Hindi literature?', options: [
                { text: 'Phanishwar Nath Renu (1925-2019) is a seminal Hindi writer known as the pioneer of', outcome: 'Phanishwar Nath Renu (1925-2019) is a seminal Hindi writer known as the pioneer of \'Anchalik.' },
                { text: 'him only as a poet or confusing him with Premchand', outcome: 'Not quite — Students often treat \'Context and Background\' as a list of static facts to memorize (author\'s.', reveals: 'students-often-treat-context-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_002', title: 'पाठ 2 — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'फेंकू उल्हनिहु\' का क्रम: शुरुआत फेंकू-उल्हनिहु से, घटनाएँ बढ़ती हैं, अंत \'फेंकू उल्हनिहु\' का केंद्रीय भाव और संदेश पर।',
            decisions: [{ prompt: 'Identify the inciting incident in "फेंकू उल्हनिहु" that sets the narrator\'s investigation into Phenku\'s past in motion.', options: [
                { text: 'The inciting incident is the narrator noticing Phenku\'s unusual method of making', outcome: 'The inciting incident is the narrator noticing Phenku\'s unusual method of making puris—flinging.' },
                { text: 'the narrator hiring Phenku', outcome: 'Not quite — Students treat "plot" as "what happened in chronological order" and "narrative structure".', reveals: 'students-treat-plot-as-what' },
                { text: 'the colonial officer anecdote', outcome: 'Not quite — Students treat "plot" as "what happened in chronological order" and "narrative structure".', reveals: 'students-treat-plot-as-what' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_005', title: 'पाठ 2 — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'फेंकू उल्हनिहु\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'List three supporting characters from \'Fe;k¡ ulh#íhu\' and state their primary narrative role in one sentence each.', options: [
                { text: 'Correct answer: (1) ckn\'kkg lyker', outcome: 'Correct answer: (1) ckn\'kkg lyker — the bureaucratic clerk who demands written identity.' },
                { text: 'what the character does', outcome: 'Not quite — Students treat supporting characters as "background information" and list their actions (he asked.', reveals: 'students-treat-supporting-characters-as' },
                { text: 'what the character REPRESENTS', outcome: 'Not quite — Students treat supporting characters as "background information" and list their actions (he asked.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_006', title: 'पाठ 2 — मुख्य विषय और संदेश',
          caseStudy: { intro: 'सब घटनाएँ \'फेंकू उल्हनिहु\' में \'फेंकू उल्हनिहु\' का केंद्रीय भाव और संदेश की ओर ले जाती हैं — यही मुख्य विषय है।',
            decisions: [{ prompt: 'What is the definition of \'primary theme\' in a prose narrative?', options: [
                { text: 'The primary theme is the central, unifying idea that runs through the entire narrative', outcome: 'The primary theme is the central, unifying idea that runs through the entire narrative and.' },
                { text: 'education', outcome: 'Not quite — Students often think the primary theme is "respect for elders" or "importance of education" because.', reveals: 'the-primary-theme-is-respect' },
                { text: 'respect for elders', outcome: 'Not quite — Students often think the primary theme is "respect for elders" or "importance of education" because.', reveals: 'the-primary-theme-is-respect' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a regional-literature seminar you present Renu\'s anchalik katha and Yashpal\'s \'Phenku\' story. A classmate objects: \'These dialect words and folk songs are local colour — decoration. And the Phenku story is simple: master questions cook, cook answers, done in order.\'',
            decisions: [{ prompt: 'What\'s the better analysis?', options: [
                { text: 'Show the machinery: in anchalik fiction the dialect, folk songs and agrarian rituals aren\'t colour — they carry the meaning and the tension between tradition and modernity. And Yashpal\'s structure is the argument: the colonial-officer anecdote arrives as a flashback two-thirds in, so we meet Phenku\'s present dignity BEFORE learning his past — the quiet \'simple\' cook becomes the moral centre while the talkative master shrinks.', outcome: 'Both corrections land: form is meaning — dialect is the story\'s engine, and narrative sequencing is how the servant outwits the master without raising his voice.' },
                { text: 'Agree dialect is decoration — translate it into standard Hindi so the \'real\' story shows clearly.', outcome: 'Removing the regional register removes the story: anchalik katha locates meaning in the specific soil, speech and ritual of the region.', reveals: 'dialect-is-decoration' },
                { text: 'Retell Phenku chronologically — put the officer anecdote first so events run in order.', outcome: 'Chronological retelling destroys the irony: the flashback\'s late placement is what lets present dignity precede past humiliation.', reveals: 'reorder-flashback-chronologically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'A servant who never raises his voice outwits everyone — the structure does the same to the reader.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'Review the concept of \'Anchalik Katha\' (Regional Fiction) and the map of linguistic.',
          misconception: 'Students often treat \'Context and Background\' as a list of static facts to memorize (author\'s birth/death dates.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फेंकू उल्हनिहु\' का कथानक', '\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting)', '\'फेंकू उल्हनिहु\' का पात्र-चित्रण'],
                  hint: 'Review the concept of \'Anchalik Katha\' (Regional Fiction) and the map of linguistic regions.',
                  misconception: 'Students often treat \'Context and Background\' as a list of static facts to memorize (author\'s birth/death dates, awards, one-line summary.' }
          ],
            remediations: { 'students-often-treat-context-and': { steps: ['**Re-frame the task**: Ask the student: "If you removed all the Bhojpuri/Maithili words and folk references from this.', 'Why or why not?" This forces confrontation with the functional role of context.', '**Mini-research activity**: Assign a 15-minute search for "Renu Anchalik Katha features" and "Bihar 1950s land reforms".', 'Have them write three specific connections they find between the historical facts and textual details in the first two.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_002', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' का कथानक — \'फेंकू उल्हनिहु\' — आरोह भाग-1 का पाठ। पाठ का कथानक.',
          hint: 'Review "flashback vs. chronological order" and "first-person narrator reliability" from.',
          misconception: 'Students treat "plot" as "what happened in chronological order" and "narrative structure" as "beginning, middle, end.".',
          parts: [
                { id: 'a', prompt: 'Identify the inciting incident in "फेंकू उल्हनिहु" that sets the narrator\'s investigation into Phenku\'s past in motion.', answer: 'The inciting incident is the narrator noticing Phenku\'s unusual method of making',
                  options: ['The inciting incident is the narrator noticing Phenku\'s unusual method of making', 'the narrator hiring Phenku', 'the colonial officer anecdote'],
                  hint: 'Review "flashback vs. chronological order" and "first-person narrator reliability" from Class 10.',
                  misconception: 'Students treat "plot" as "what happened in chronological order" and "narrative structure" as "beginning, middle, end." In "फेंकू उल्हनिहु,".' }
          ],
            remediations: { 'students-treat-plot-as-what': { steps: ['If a student cannot separate chronological from narrative order: (1) Give them 5 event cards from the story; ask them.', '(2) For each displacement, ask: "What does the reader know at this narrative moment that they wouldn\'t if this came.', '(4) Practice with a 3-sentence micro-fiction: write it in narrative order, then reorder chronologically, compare.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_003', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'अगर अटका हुआ महसूस हो तो **\'कथानक और आख्यान-संरचना\' (c11_hin_ar_cbse_02_002)** के.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **\'वातावरण केवल विशेषणों (Adjectives) से बनता है\'** — जैसे \'डरावना जंगल\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting)',
                  options: ['\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फेंकू उल्हनिहु\' का कथानक', '\'फेंकू उल्हनिहु\' का पात्र-चित्रण'],
                  hint: 'अगर अटका हुआ महसूस हो तो **\'कथानक और आख्यान-संरचना\' (c11_hin_ar_cbse_02_002)** के \'चरमोत्कर्ष.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **\'वातावरण केवल विशेषणों (Adjectives) से बनता है\'** — जैसे \'डरावना जंगल\', \'सुंदर बगीचा\', \'उदास.' }
          ],
            remediations: { 'adjectives': { steps: ['**माइक्रो-एनालिसिस अभ्यास**: छात्र को एक छोटा अनुच्छेद (५० शब्द) दें — उसे **हर विशेषण को काटकर** केवल **क्रियाओं.', '**तुलनात्मक सारणी बनवाएँ**: दो कॉलम — बायाँ: \'लेखक ने क्या लिखा (पद/पदबंध)\', दायाँ: \'पाठक पर क्या असर हुआ (संवेदना)\'।.', '**\'क्यों\' का पीछा करें**: हर पहचाने गए शब्द/युक्ति के लिए पूछें — "अगर लेखक यहाँ \'चल रहा था\' के बजाय \'घिसट रहा था\'.', '**बोर्ड-उत्तर संरचना सिखाएँ**: (बिंदु) → (उद्धरण/संदर्भ) → (युक्ति का नाम) → (वातावरण पर प्रभाव) → (कथानक/पात्र से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_004', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_02_002 (कथानक संरचना)** के \'प्रमुख मोड़\' खंड को दोहराएँ और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण का अर्थ है पात्र के **गुणों की सूची (list of traits)** बनाना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फेंकू उल्हनिहु\' का पात्र-चित्रण',
                  options: ['\'फेंकू उल्हनिहु\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फेंकू उल्हनिहु\' का कथानक', '\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_02_002 (कथानक संरचना)** के \'प्रमुख मोड़\' खंड को दोहराएँ और पाठ में.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण का अर्थ है पात्र के **गुणों की सूची (list of traits)** बनाना — जैसे "नायक ईमानदार.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**मॉडलिंग (Modeling):** शिक्षक एक छोटे ज्ञात पात्र (जैसे \'पंचतंत्र का शेर\' या \'मुंशी प्रेमचंद की \'ईदगाह\' का हामिद) लेकर.', '**सैफोल्डिंग (Scaffolding):** छात्र को **\'पात्र-चित्रण ग्राफिक ऑर्गनाइज़र\'** दें जिसमें चार कॉलम हों: *प्रसंग/घटना →.', '**तुलनात्मक अभ्यास:** दो कमज़ोर और एक मजबूत नमूना उत्तर दिखाएँ; छात्रों से कहें **\'कमज़ोर उत्तर में क्या गायब है?\'**.', '**माइक्रो-लेखन:** पूरे चित्रण के बजाय, केवल **एक प्रसंग पर एक पैराग्राफ** लिखने को कहें, सख्त शब्द-सीमा (50 शब्द) में।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_005', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'Review the protagonist\'s three defining scenes: the name-giving episode (refusing clerk\'s.',
          misconception: 'Students treat supporting characters as "background information" and list their actions (he asked for name, she made.',
          parts: [
                { id: 'a', prompt: 'List three supporting characters from \'Fe;k¡ ulh#íhu\' and state their primary narrative role in one sentence each.', answer: 'Correct answer: (1) ckn\'kkg lyker',
                  options: ['Correct answer: (1) ckn\'kkg lyker', 'what the character does', 'what the character REPRESENTS', 'ge Hkêòh cukuk u lh[krs'],
                  hint: 'Review the protagonist\'s three defining scenes: the name-giving episode (refusing clerk\'s.',
                  misconception: 'Students treat supporting characters as "background information" and list their actions (he asked for name, she made tea, he wrote report).' },
                { id: 'b', prompt: 'Explain how the clerk (ckn\'kkg lyker) and the woman (flj fgykuk) differently represent the modern bureaucratic world\'s challenge to the tailor\'s oral identity.', answer: 'Correct answer: The clerk represents institutional power',
                  options: ['Correct answer: The clerk represents institutional power', 'villains', 'what the character does', 'what the character REPRESENTS'],
                  hint: 'Review the protagonist\'s three defining scenes: the name-giving episode (refusing clerk\'s.',
                  misconception: 'Students treat supporting characters as "background information" and list their actions (he asked for name, she made tea, he wrote report).' },
                { id: 'c', prompt: 'The journalist (v[kckjuohl) asks the tailor for a "new angle" (ubZ ph"k) on his life.', answer: 'Correct answer: The tailor would reject being made into a "story" or "angle"',
                  options: ['Correct answer: The tailor would reject being made into a "story" or "angle"', 'what the character does', 'what the character REPRESENTS', 'ge Hkêòh cukuk u lh[krs'],
                  hint: 'Review the protagonist\'s three defining scenes: the name-giving episode (refusing clerk\'s.',
                  misconception: 'Students treat supporting characters as "background information" and list their actions (he asked for name, she made tea, he wrote report).' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student lists actions without analysis: (1) Pick ONE supporting character — say, the clerk.', '(2) Find TWO specific dialogues he speaks.', '(3) Ask: "What does this REVEAL about the tailor OR about the society the tailor lives in?" (4) Write one sentence.', 'Do not proceed until each character has a "mirror statement" backed by a quote.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat supporting characters as "background information" and list their actions (he asked for name, she made.',
          parts: [
                { id: 'a', prompt: 'Write a 4-line dialogue between the tailor (fe;k¡ ulh#íhu) and a NEW supporting character — a young village schoolteacher — that reveals the tailor\'s.', answer: 'Criteria for a strong answer: (1) Teacher speaks from institutional knowledge',
                  options: ['Criteria for a strong answer: (1) Teacher speaks from institutional knowledge', 'what the character does', 'what the character REPRESENTS', 'ge Hkêòh cukuk u lh[krs'],
                  hint: 'Review the protagonist\'s three defining scenes: the name-giving episode (refusing clerk\'s.',
                  misconception: 'Students treat supporting characters as "background information" and list their actions (he asked for name, she made tea, he wrote report).' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student lists actions without analysis: (1) Pick ONE supporting character — say, the clerk.', '(2) Find TWO specific dialogues he speaks.', '(3) Ask: "What does this REVEAL about the tailor OR about the society the tailor lives in?" (4) Write one sentence.', 'Do not proceed until each character has a "mirror statement" backed by a quote.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_006', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' का मुख्य विषय — \'फेंकू उल्हनिहु\' का केंद्रीय भाव और संदेश',
          hint: 'Review the difference between subject and theme using a परिचित fable (e.g., "The Tortoise.',
          misconception: 'Students often think the primary theme is "respect for elders" or "importance of education" because these are परिचित.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of \'theme vs. subject\' to this story: state the subject and then the primary theme in one sentence each.', answer: 'Subject: The encounter between a literate teacher and an illiterate potter',
                  options: ['Subject: The encounter between a literate teacher and an illiterate potter', 'We should respect elders', 'respect for elders', 'importance of education'],
                  hint: 'Review the difference between subject and theme using a परिचित fable (e.g., "The Tortoise and the.',
                  misconception: 'Students often think the primary theme is "respect for elders" or "importance of education" because these are परिचित moral lessons.' },
                { id: 'b', prompt: 'Analyze how the author uses the recurring motif of \'hands\' (Phool Ulaghu\'s clay-stained hands vs. the teacher\'s pen-holding hands) to develop the primary theme.', answer: 'The clay-stained hands symbolize practical, embodied knowledge',
                  options: ['The clay-stained hands symbolize practical, embodied knowledge', 'respect for elders', 'importance of education'],
                  hint: 'Review the difference between subject and theme using a परिचित fable (e.g., "The Tortoise and the.',
                  misconception: 'Students often think the primary theme is "respect for elders" or "importance of education" because these are परिचित moral lessons.' }
          ],
            remediations: { 'the-primary-theme-is-respect': { steps: ['If a student states a generic moral, ask them to list three moments where the teacher learns something from Phool.', 'Then have them write a one-sentence theme that includes both directions of learning.', 'Finally, have them compare their sentence with the definition of primary theme to see if it captures the central.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
