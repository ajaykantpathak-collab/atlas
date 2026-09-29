import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch03_p1: SimDef = {
    id: 'v3_c11_hin_v_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'Watch a domestic worker cross the line from serving stories to writing one.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c11_hin_v_ch03'],
    nodeIds: ['c11_hin_v_cbse_03_001', 'c11_hin_v_cbse_03_002', 'c11_hin_v_cbse_03_003', 'c11_hin_v_cbse_03_004', 'c11_hin_v_cbse_03_005', 'c11_hin_v_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader inside a Partition-displaced woman\'s first-person voice', intro: 'A widowed domestic worker in a lawyer\'s Delhi household gets a notebook — and the household\'s power arrangement quietly inverts.', goal: 'Analyse autobiographical fiction\'s blurred boundaries and the story\'s arc toward self-expression.' },
    discovery: {
        question: '\'Sobti wrote this to show how hard life was for poor women in the 1950s\' — what does that reading miss?',
        options: ['That autobiographical fiction is crafted, not documented — blurred author-narrator lines, fragmented memory, and tactical silence are the strategy', 'Nothing — it\'s plain social reporting', 'That she invented the suffering entirely', 'That domestic work was actually easy then'],
        answer: 'That autobiographical fiction is crafted, not documented — blurred author-narrator lines, fragmented memory, and tactical silence are the strategy',
        hook: 'The protagonist performs the \'good servant\' when it suits her and refuses questions when it doesn\'t — resistance here is tactical, not absolute.',
    },
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the inciting incident — the lawyer\'s wife handing over a notebook — and defend the climax where a servant reads her own story aloud.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_001', title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'वितान भाग-1 खोलिए और पाठ 03 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Krishna Sobti\'s "व्यक्ति" is considered a landmark text in Hindi literature primarily because it:', options: [
                { text: 'Correct answer: It centers a domestic worker\'s first-person narrative, challenging the', outcome: 'Correct answer: It centers a domestic worker\'s first-person narrative, challenging the middle-class.' },
                { text: 'it uses beautiful language', outcome: 'Not quite — Students often confuse \'context\' with \'summary\'—they retell the story\'s events (husband left.', reveals: 'students-often-confuse-context-with' },
                { text: 'it describes Partition', outcome: 'Not quite — Students often confuse \'context\' with \'summary\'—they retell the story\'s events (husband left.', reveals: 'students-often-confuse-context-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_003', title: 'पाठ 3 — पाठ्य-परिवेश और वातावरण',
          caseStudy: { intro: '\'वक़्स-वहाँ\' का परिवेश: \'वक़्स-वहाँ\' — वितान भाग-1 का पाठ। पाठ का कथानक, पात्र और केंद्रीय भाव पाठ्यपुस्तक के अनुर — स्थान और समय मिलकर माहौल बनाते हैं।',
            decisions: [{ prompt: 'Identify the three primary physical settings in "vkyks&vk¡èkkfj" and state one distinctive physical detail for each that establishes its.', options: [
                { text: 'The three primary settings are: (1) lquhy\'s household', outcome: 'The three primary settings are: (1) lquhy\'s household — distinctive detail: "V^h&is\'kkc osQ.' },
                { text: 'big house', outcome: 'Not quite — Students treat setting as "where the story happens" and atmosphere as "mood words like sad.', reveals: 'students-treat-setting-as-where' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_004', title: 'पाठ 3 — पात्र-चित्रण: नायक/प्रमुख पात्र',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'वक़्स-वहाँ\' में वक़्स-वहाँ से पात्र उभरता है।',
            decisions: [{ prompt: 'What is the name of the protagonist in "वकील की बेटी" and what is her primary occupation at the start of the story?', options: [
                { text: 'The protagonist is the unnamed narrator (a woman), and her primary occupation is domestic', outcome: 'The protagonist is the unnamed narrator (a woman), and her primary occupation is domestic work.' },
                { text: 'वकील की बेटी', outcome: 'Not quite — Students often confuse the protagonist (the narrator/domestic worker) with the title character.', reveals: 'students-often-confuse-the-protagonist' },
                { text: 'the lawyer\'s daughter as protagonist', outcome: 'Not quite — Students often confuse the protagonist (the narrator/domestic worker) with the title character.', reveals: 'students-often-confuse-the-protagonist' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_006', title: 'पाठ 3 — मुख्य विषय और संदेश',
          caseStudy: { intro: 'सब घटनाएँ \'वक़्स-वहाँ\' में \'वक़्स-वहाँ\' का केंद्रीय भाव और संदेश की ओर ले जाती हैं — यही मुख्य विषय है।',
            decisions: [{ prompt: 'What is the definition of \'primary theme\' in a literary text, and how does it differ from a \'subject\' or \'topic\'?', options: [
                { text: 'The primary theme is the central insight about life or human nature that the author', outcome: 'The primary theme is the central insight about life or human nature that the author conveys through.' },
                { text: 'The theme is domestic work', outcome: 'Not quite — Students consistently confuse the *primary theme* with the *social issue* depicted in the text.', reveals: 'students-consistently-confuse-the-primary' },
                { text: 'confuses theme with topic (e', outcome: 'Not quite — Students consistently confuse the *primary theme* with the *social issue* depicted in the text.', reveals: 'students-consistently-confuse-the-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading group discusses Krishna Sobti\'s \'व्यक्ति\' — a widowed domestic worker in a lawyer\'s household narrating her own life. A member says: \'It\'s a simple sad life story — husband left, children grew, mother died. Nothing literary about it.\'',
            decisions: [{ prompt: 'What makes the text a literary act, not just a sad story?', options: [
                { text: 'Locate the conditions of possibility: a Partition-displaced Punjabi woman writing first-person domestic labour in 1950s Hindi — when few women published such narratives — is itself the claim: voice claimed where the tradition erased working-class women. And the structure mirrors the theme: external events (gaining literacy, writing her story) run parallel to the internal arc of finding her voice — the first-person \'मैं\' is the point.', outcome: 'The group sees it: the \'simple\' plot is deliberately arranged so that learning to write IS the climax — testimony becoming literature.' },
                { text: 'Agree it\'s just a life story — summarise the events and move on.', outcome: 'Event-listing confuses story with plot: the husband\'s death is backstory, literacy is the causal spine — selection and arrangement are the authorial design.', reveals: 'just-a-sad-life-story' },
                { text: 'Call it autobiography — Sobti is describing her own life in a lawyer\'s house.', outcome: 'First-person voice isn\'t autobiography: Sobti constructs a persona — a domestic worker narrating — and the act of writing within the story dramatises that construction.', reveals: 'first-person-means-autobiography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'The notebook and pen turn a worker into an author — the climax isn\'t publication, it\'s being heard by the person who gave them.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 10 Hindi "डायरी का एक पन्ना" (Diary of Anne Frank) — practice.',
          misconception: 'Students often confuse \'context\' with \'summary\'—they retell the story\'s events (husband left, children grew up, mother.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक़्स-वहाँ\' का कथानक', '\'वक़्स-वहाँ\' का पाठ्य-परिवेश (setting)', '\'वक़्स-वहाँ\' का पात्र-चित्रण'],
                  hint: 'If stuck, review Class 10 Hindi "डायरी का एक पन्ना" (Diary of Anne Frank) — practice separating.',
                  misconception: 'Students often confuse \'context\' with \'summary\'—they retell the story\'s events (husband left, children grew up, mother died) instead.' }
          ],
            remediations: { 'students-often-confuse-context-with': { steps: ['If a student conflates context with summary: (1) Give them two columns—label one "Inside the Story" (characters.', '(2) Have them place 10 items (e.g., "Partition 1947," "Protagonist\'s husband leaves," "Sobti wins Jnanpith 2017,".', '(3) Ask: "Which column helps you understand *why* Sobti chose first-person narration?" (4) Assign: write 3 sentences.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_002', difficulty: 'standard',
          question: '\'वक़्स-वहाँ\' का कथानक — \'वक़्स-वहाँ\' — वितान भाग-1 का पाठ। पाठ का कथानक, पात्र.',
          hint: 'If unable to summarize, revisit the \'Before You Read\' node (c11_hin_v_cbse_03_001) and.',
          misconception: 'Students often equate \'plot\' with a simple chronological summary of *all* events (story).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक़्स-वहाँ\' का कथानक',
                  options: ['\'वक़्स-वहाँ\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक़्स-वहाँ\' का पाठ्य-परिवेश (setting)', '\'वक़्स-वहाँ\' का पात्र-चित्रण'],
                  hint: 'If unable to summarize, revisit the \'Before You Read\' node (c11_hin_v_cbse_03_001) and re-read the.',
                  misconception: 'Students often equate \'plot\' with a simple chronological summary of *all* events (story).' }
          ],
            remediations: { 'students-often-equate-plot-with': { steps: ['Plot**: Use a परिचित folktale (e.g., "The Thirsty Crow").', 'Story = crow drops pebbles, water rises, drinks.', 'Plot = crow is thirsty (exposition) → tries to reach water but fails (rising action) → gets idea to drop pebbles.', '**Timeline Activity**: Have student draw a horizontal timeline of the narrator\'s *life* (birth, marriage, widowhood.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_003', difficulty: 'standard',
          question: '\'वक़्स-वहाँ\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित.',
          hint: 'Review c11_hin_v_cbse_03_002 (Plot and Narrative Structure) focusing on the "movement.',
          misconception: 'Students treat setting as "where the story happens" and atmosphere as "mood words like sad or happy.".',
          parts: [
                { id: 'a', prompt: 'Identify the three primary physical settings in "vkyks&vk¡èkkfj" and state one distinctive physical detail for each that establishes its atmosphere.', answer: 'The three primary settings are: (1) lquhy\'s household',
                  options: ['The three primary settings are: (1) lquhy\'s household', 'big house'],
                  hint: 'Review c11_hin_v_cbse_03_002 (Plot and Narrative Structure) focusing on the "movement across.',
                  misconception: 'Students treat setting as "where the story happens" and atmosphere as "mood words like sad or happy." In "vkyks&vk¡èkkfj," they miss how.' },
                { id: 'b', prompt: 'Trace how the atmosphere shifts when the narrator moves from lquhy\'s house to rkrq\'k\'s house to her own home.', answer: 'The progression: (1) lquhy\'s house',
                  options: ['The progression: (1) lquhy\'s house', 'improvement'],
                  hint: 'Review c11_hin_v_cbse_03_002 (Plot and Narrative Structure) focusing on the "movement across.',
                  misconception: 'Students treat setting as "where the story happens" and atmosphere as "mood words like sad or happy." In "vkyks&vk¡èkkfj," they miss how.' }
          ],
            remediations: { 'students-treat-setting-as-where': { steps: ['Have the student reread the lquhy household section (pages 21-22) and list every verb describing what the narrator DOES.', 'Repeat for rkrq\'k\'s household (writes, reads, learns, resists, complies).', 'Compare the verb lists — first setting = survival verbs; second = negotiation verbs.', 'Ask: "If setting were just background, why do her verbs change?" This makes visible how setting shapes agency.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_004', difficulty: 'standard',
          question: '\'वक़्स-वहाँ\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If confused about who the protagonist is, review c11_hin_v_cbse_03_002 (Plot and.',
          misconception: 'Students often confuse the protagonist (the narrator/domestic worker) with the title character "वकील की बेटी" (the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक़्स-वहाँ\' का पात्र-चित्रण',
                  options: ['\'वक़्स-वहाँ\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक़्स-वहाँ\' का कथानक', '\'वक़्स-वहाँ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If confused about who the protagonist is, review c11_hin_v_cbse_03_002 (Plot and Narrative.',
                  misconception: 'Students often confuse the protagonist (the narrator/domestic worker) with the title character "वकील की बेटी" (the lawyer\'s daughter.' }
          ],
            remediations: { 'students-often-confuse-the-protagonist': { steps: ['Have student re-read the first 3 pages identifying every "eSa" (I) statement—this establishes the narrative voice.', 'Create a two-column chart: "Title Character (वकील की बेटी)" vs "Narrator/Protagonist" with textual evidence for each.', 'Ask: "Whose thoughts do we hear?', 'Whose life spans the whole story?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the protagonist (the narrator/domestic worker) with the title character "वकील की बेटी" (the.',
          parts: [
                { id: 'a', prompt: 'Critique the author\'s choice to keep the protagonist unnamed throughout the story.', answer: 'Strengthens: The anonymity universalizes her experience—she represents countless',
                  options: ['Strengthens: The anonymity universalizes her experience—she represents countless', 'वकील की बेटी'],
                  hint: 'If confused about who the protagonist is, review c11_hin_v_cbse_03_002 (Plot and Narrative.',
                  misconception: 'Students often confuse the protagonist (the narrator/domestic worker) with the title character "वकील की बेटी" (the lawyer\'s daughter.' }
          ],
            remediations: { 'students-often-confuse-the-protagonist': { steps: ['Have student re-read the first 3 pages identifying every "eSa" (I) statement—this establishes the narrative voice.', 'Create a two-column chart: "Title Character (वकील की बेटी)" vs "Narrator/Protagonist" with textual evidence for each.', 'Ask: "Whose thoughts do we hear?', 'Whose life spans the whole story?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_005', difficulty: 'standard',
          question: '\'वक़्स-वहाँ\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 004 (नायक चित्रण)** के \'चरित्र-चाप\' और \'आंतरिक संघर्ष\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों को **\'कम महत्वपूर्ण\' (less important)** मानते हैं क्योंकि शब्द में \'सहायक\' लगा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक़्स-वहाँ\' के सहायक पात्र',
                  options: ['\'वक़्स-वहाँ\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक़्स-वहाँ\' का कथानक', '\'वक़्स-वहाँ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 004 (नायक चित्रण)** के \'चरित्र-चाप\' और \'आंतरिक संघर्ष\' अनुभाग को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों को **\'कम महत्वपूर्ण\' (less important)** मानते हैं क्योंकि शब्द में \'सहायक\' लगा है। वे सोचते हैं कि.' }
          ],
            remediations: { 'less-important-1-2-3': { steps: ['**पुनर्नामकरण अभ्यास:** छात्र से कहें — "आज से इन्हें \'सहायक पात्र\' नहीं, **\'संरचनात्मक पात्र\' (Structural.', '**विलोपन परीक्षण (Deletion Test):** पाठ का एक दृश्य लें, एक सहायक पात्र को मानसिक रूप से हटाएँ और पूछें — "अब नायक का.', 'कथानक में क्या छूटेगा?" लिखित में 3 अंतर नोट करवाएँ। 3.', '**कार्य-सारणी (Function Table) बनवाएँ:** स्तंभ — पात्र नाम | प्रकार (फॉयल/कॉन्फिडेंट/एंटागोनिस्ट/चोरस) | नायक पर प्रभाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_006', difficulty: 'standard',
          question: '\'वक़्स-वहाँ\' का मुख्य विषय — \'वक़्स-वहाँ\' का केंद्रीय भाव और संदेश',
          hint: 'Review the protagonist\'s diary entries and letters in the text—these are the clearest.',
          misconception: 'Students consistently confuse the *primary theme* with the *social issue* depicted in the text.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक़्स-वहाँ\' का मुख्य विषय',
                  options: ['\'वक़्स-वहाँ\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक़्स-वहाँ\' का कथानक', '\'वक़्स-वहाँ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review the protagonist\'s diary entries and letters in the text—these are the clearest markers.',
                  misconception: 'Students consistently confuse the *primary theme* with the *social issue* depicted in the text.' }
          ],
            remediations: { 'students-consistently-confuse-the-primary': { steps: ['Ask the student to write the *last paragraph* of the chapter in their own words.', 'Ask: "What does the narrator *have* at the end that she didn\'t have at the start?" (Answer: a published book,.', 'Guide them to complete this sentence: "The book argues that ______ is the way out of ______."', 'Have them replace the blanks with abstract nouns (literacy/dignity; invisibility/silence).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
