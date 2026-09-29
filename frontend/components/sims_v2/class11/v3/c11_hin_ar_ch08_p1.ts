import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch08_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch08_p1',
    title: 'पाठ 8 · Part 1/3',
    subtitle: 'Read a prisoner\'s India — episodic, argumentative, and allergic to uniformity.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 8 · Part 1/3',
    chapters: ['c11_hin_ar_ch08'],
    nodeIds: ['c11_hin_ar_cbse_08_001', 'c11_hin_ar_cbse_08_002', 'c11_hin_ar_cbse_08_003', 'c11_hin_ar_cbse_08_004', 'c11_hin_ar_cbse_08_005', 'c11_hin_ar_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a prisoner composing a nation from memory', intro: 'From a cell, Nehru walks the whole country — and every conversation with a peasant becomes a meditation on what \'India\' even is.', goal: 'Analyse the episodic-reflective structure and the theme of unity built from diversity.' },
    discovery: {
        question: 'Nehru\'s chapter jumps from the Himalaya to a peasant\'s face to a Vedic hymn to a Kanpur factory — is the disorder a structural weakness?',
        options: ['No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity', 'Yes — history must run in dates', 'Yes — prison made him ramble', 'No — but only because it\'s a travelogue'],
        answer: 'No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity',
        hook: 'Written in a 1942-46 prison cell, \'Bharat Mata\' argues that India\'s unity lives in shared labour and suffering — not in cultural sameness.',
    },
    teaching: [
        { title: 'पाठ 8 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate the journey\'s episodes from its reflective digressions, then defend whether diversity can ground unity without uniformity.',
        labels: ['पाठ 8 — पृष्ठभूमि', 'पाठ 8 — कथानक', 'पाठ 8 — पाठ्य-परिवेश', 'पाठ 8 — पात्र-चित्रण', 'पाठ 8 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_001', title: 'पाठ 8 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 08 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "Bharat Mata" and what significant historical position did he hold in independent India?', options: [
                { text: 'The author is Jawaharlal Nehru (1889–1964), who served as India\'s first Prime Minister', outcome: 'The author is Jawaharlal Nehru (1889–1964), who served as India\'s first Prime Minister from 1947.' },
                { text: 'another freedom fighter or misidentifying his role', outcome: 'Not quite — Students often treat "Bharat Mata" as a religious or mythological concept (equating it with Bharat.', reveals: 'students-often-treat-bharat-mata' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_003', title: 'पाठ 8 — पाठ्य-परिवेश और वातावरण',
          caseStudy: { intro: '\'फागुन की कहानी\' का परिवेश: \'फागुन की कहानी\' — आरोह भाग-1 का पाठ। पाठ का कथानक, पात्र और केंद्रीय भाव पाठ्यपुस्तक के अ — स्थान और समय मिलकर माहौल बनाते हैं।',
            decisions: [{ prompt: 'In Nehru\'s essay, which geographical regions does he explicitly mention while describing his travels across India to establish the physical.', options: [
                { text: 'Nehru mentions the Himalayan region ("pahadon se lekar maidon tak"), the plains from', outcome: 'Nehru mentions the Himalayan region ("pahadon se lekar maidon tak"), the plains from Punjab.' },
                { text: 'villages and cities', outcome: 'Not quite — Students often treat setting as mere "where and when" backdrop and atmosphere as a single static.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_004', title: 'पाठ 8 — पात्र-चित्रण: नायक/प्रमुख पात्र',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'फागुन की कहानी\' में फागुन-की-कहानी से पात्र उभरता है।',
            decisions: [{ prompt: 'Who is the protagonist of the chapter "Bharat Mata" and what is his primary role in the narrative?', options: [
                { text: 'The protagonist is Jawaharlal Nehru, who serves as the first-person narrator traveling', outcome: 'The protagonist is Jawaharlal Nehru, who serves as the first-person narrator traveling across.' },
                { text: 'Bharat Mata', outcome: 'Not quite — Students conflate "Bharat Mata" (the symbol) with the protagonist, treating the chapter as.', reveals: 'students-conflate-bharat-mata-the' },
                { text: 'Bharat Mata is the protagonist', outcome: 'Not quite — Students conflate "Bharat Mata" (the symbol) with the protagonist, treating the chapter as.', reveals: 'students-conflate-bharat-mata-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_006', title: 'पाठ 8 — मुख्य विषय और संदेश',
          caseStudy: { intro: 'सब घटनाएँ \'फागुन की कहानी\' में \'फागुन की कहानी\' का केंद्रीय भाव और संदेश की ओर ले जाती हैं — यही मुख्य विषय है।',
            decisions: [{ prompt: 'What is the difference between a "topic" and a "theme" in literary analysis? Give an example from "Bharat Mata" to illustrate.', options: [
                { text: 'A topic is a subject or noun phrase (e.g., "India," "freedom struggle," "geography")', outcome: 'A topic is a subject or noun phrase (e.g., "India," "freedom struggle," "geography").' },
                { text: 'Bharat Mata', outcome: 'Not quite — Students often confuse the *refrain* "Bharat Mata ki Jai" (a slogan) with the *theme* (an argued.', reveals: 'students-often-confuse-the-refrain' },
                { text: 'Bharat Mata is the millions of people who constitute the nation', outcome: 'Not quite — Students often confuse the *refrain* "Bharat Mata ki Jai" (a slogan) with the *theme* (an argued.', reveals: 'students-often-confuse-the-refrain' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For Independence Day, a student proposes a poster quoting Nehru\'s \'Bharat Mata\' essay beside a calendar image of the goddess Bharat Mata with a flag. Another teammate says the essay \'has no structure — it just rambles from mountains to peasants to philosophy.\'',
            decisions: [{ prompt: 'What do both get wrong about the text?', options: [
                { text: 'Separate symbol from argument: Nehru, writing in Ahmednagar Fort prison in Discovery of India, deliberately redefines Bharat Mata — not a goddess of land but \'the millions of individuals\', the people themselves. And the structure is the argument: an episodic travelogue where physical journey is the spine, encounters are self-contained units, and reflective digressions build the idea — fragments joined like the diverse-yet-united nation.', outcome: 'The poster gets redesigned — people, not iconography — and the \'rambling\' resolves into a deliberate episodic architecture mirroring India\'s unity-in-diversity.' },
                { text: 'Keep the goddess image — Bharat Mata is Bharat Mata, and the picture makes the poster devotional.', outcome: 'That projects external iconography onto the text: Nehru explicitly rejects goddess imagery for a secular, humanist definition — the people constitute the nation.', reveals: 'bharat-mata-is-goddess' },
                { text: 'Agree it has no structure — it\'s a prison diary, so wandering is natural.', outcome: 'Non-fiction has structure too: the journey spine, episodes, digressions and synthesis form an intellectual arc — the \'plot\' is the idea developing.', reveals: 'essay-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'The journey ends but the argument doesn\'t — the \'Bharat Mata\' Nehru finds is the people themselves, not a goddess on a map.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'Review "authorial intent vs. reader response" from Class 10 prose chapters (e.g., "The.',
          misconception: 'Students often treat "Bharat Mata" as a religious or mythological concept (equating it with Bharat Mata iconography.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फागुन की कहानी\' का कथानक', '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting)', '\'फागुन की कहानी\' का पात्र-चित्रण'],
                  hint: 'Review "authorial intent vs. reader response" from Class 10 prose chapters (e.g., "The Letter".',
                  misconception: 'Students often treat "Bharat Mata" as a religious or mythological concept (equating it with Bharat Mata iconography in temples.' }
          ],
            remediations: { 'students-often-treat-bharat-mata': { steps: ['Show the student the exact passage where Nehru says: "Bharat Mata...', 'is essentially these millions of people" and contrast it with a calendar art image of Bharat Mata as a goddess.', 'Ask: "Whose voice speaks in each?', 'What is the political purpose of each reप्रस्तुति?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_002', difficulty: 'standard',
          question: '\'फागुन की कहानी\' का कथानक — \'फागुन की कहानी\' — आरोह भाग-1 का पाठ। पाठ का कथानक.',
          hint: 'यदि उलझन हो तो E.M. फॉर्स्टर का उदाहरण ("राजा मरा, फिर रानी मरी" बनाम "राजा मरा, शोक से.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'घटना-क्रम\' (Sequence of Events)** को ही \'कथानक\' (Plot) मान लेते हैं और **\'फ्लैशबैक\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फागुन की कहानी\' का कथानक',
                  options: ['\'फागुन की कहानी\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting)', '\'फागुन की कहानी\' का पात्र-चित्रण'],
                  hint: 'यदि उलझन हो तो E.M. फॉर्स्टर का उदाहरण ("राजा मरा, फिर रानी मरी" बनाम "राजा मरा, शोक से रानी मरी").',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'घटना-क्रम\' (Sequence of Events)** को ही \'कथानक\' (Plot) मान लेते हैं और **\'फ्लैशबैक\' (Flashback)** को केवल \'अतीत.' }
          ],
            remediations: { 'sequence-of-events-plot-flashback': { steps: ['**चरण 1:** छात्र से कहें—"पाठ की ५ प्रमुख घटनाएँ **कालानुक्रम में** लिखो।" (यह \'कहानी\' बनेगी)। **चरण 2:** फिर कहें—"अब.', 'जहाँ क्रम टूटा है, वहाँ निशान लगाओ।" (यह \'कथानक/संरचना\' दिखाएगा)। **चरण 3:** हर टूटे क्रम पर पूछो—"लेखक ने यहाँ क्रम.', 'पाठक को क्या महसूस कराना चाहता था?" (यह **संरचनात्मक कार्य** सिखाएगा)। **चरण 4:** एक छोटा पैराग्राफ लिखवाएँ: "इस पाठ की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_003', difficulty: 'standard',
          question: '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'Review the "travelogue structure" explanation in c11_hin_ar_cbse_08_002 — specifically.',
          misconception: 'Students often treat setting as mere "where and when" backdrop and atmosphere as a single static mood (e.g.',
          parts: [
                { id: 'a', prompt: 'Explain how the temporal setting (historical period) influences the atmosphere in the passage where Nehru describes the economic depression after 1929.', answer: 'The 1930s depression setting creates an atmosphere of despair and helplessness',
                  options: ['The 1930s depression setting creates an atmosphere of despair and helplessness', 'it makes the story sad'],
                  hint: 'Review the "travelogue structure" explanation in c11_hin_ar_cbse_08_002 — specifically how each leg.',
                  misconception: 'Students often treat setting as mere "where and when" backdrop and atmosphere as a single static mood (e.g., "patriotic").' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot distinguish setting from atmosphere: (1) Have them list 5 physical details from the text (rivers.', '(2) Have them name the feeling each detail evokes (awe, pity, solidarity) — these are atmosphere.', '(3) Ask: "Does the feeling change when Nehru moves from describing a famine-stricken village to a Congress rally?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_004', difficulty: 'standard',
          question: '\'फागुन की कहानी\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'Review "first-person narrative voice" (कथावाचक की दृष्टि) from Class 10.',
          misconception: 'Students conflate "Bharat Mata" (the symbol) with the protagonist, treating the chapter as a description of a goddess.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फागुन की कहानी\' का पात्र-चित्रण',
                  options: ['\'फागुन की कहानी\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फागुन की कहानी\' का कथानक', '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review "first-person narrative voice" (कथावाचक की दृष्टि) from Class 10 Hindi—specifically how.',
                  misconception: 'Students conflate "Bharat Mata" (the symbol) with the protagonist, treating the chapter as a description of a goddess rather than.' }
          ],
            remediations: { 'students-conflate-bharat-mata-the': { steps: ['Have the student highlight every sentence beginning with "मैं" (I) in the chapter—there are 15+.', 'Ask: "Who is doing the seeing, asking, traveling, understanding in each?"', 'Create a two-column table: Column A = Nehru\'s action/statement; Column B = What it reveals about him.', 'Guide them to see the pattern: the "I" is the constant consciousness; Bharat Mata is the variable he\'s solving for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "Bharat Mata" (the symbol) with the protagonist, treating the chapter as a description of a goddess.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether Nehru\'s final conclusion—"Bharat Mata is essentially these millions of people"—is a genuine discovery or a rhetorical strategy to forge.', answer: 'It is a genuine discovery grounded in lived encounter, not mere rhetoric',
                  options: ['It is a genuine discovery grounded in lived encounter, not mere rhetoric', 'मेरी समझ में नहीं आता था', 'एक गँवार किसान ने'],
                  hint: 'Review "first-person narrative voice" (कथावाचक की दृष्टि) from Class 10 Hindi—specifically how.',
                  misconception: 'Students conflate "Bharat Mata" (the symbol) with the protagonist, treating the chapter as a description of a goddess rather than.' }
          ],
            remediations: { 'students-conflate-bharat-mata-the': { steps: ['Have the student highlight every sentence beginning with "मैं" (I) in the chapter—there are 15+.', 'Ask: "Who is doing the seeing, asking, traveling, understanding in each?"', 'Create a two-column table: Column A = Nehru\'s action/statement; Column B = What it reveals about him.', 'Guide them to see the pattern: the "I" is the constant consciousness; Bharat Mata is the variable he\'s solving for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_005', difficulty: 'standard',
          question: '\'फागुन की कहानी\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटका हुआ महसूस हो, तो **\'नायक का चरित्र-चाप\' (Protagonist\'s Character Arc)**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "सहायक पात्र का विश्लेषण करने का अर्थ है उसका अलग से चरित्र-चित्रण लिख देना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फागुन की कहानी\' के सहायक पात्र',
                  options: ['\'फागुन की कहानी\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फागुन की कहानी\' का कथानक', '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **\'नायक का चरित्र-चाप\' (Protagonist\'s Character Arc)** — विशेषकर नायक के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "सहायक पात्र का विश्लेषण करने का अर्थ है उसका अलग से चरित्र-चित्रण लिख देना — उसका स्वभाव, रूप-रंग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पृथक्करण अभ्यास (Isolation Drill):** छात्र को पाठ से 5 सहायक पात्रों की सूची बनाने को कहें। फिर प्रत्येक के लिए.', '**संबंध-मानचित्रण (Relationship Mapping):** एक तीर-आरेख (arrow diagram) बनवाएं: नायक → (क्या देता है/लेता है) → सहायक.', '**PEEL पुनर्लेखन (PEEL Rewriting):** छात्र के कमजोर उत्तर ("रामू अच्छा नौकर था") को लेकर, शिक्षक मिलकर PEEL में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_006', difficulty: 'standard',
          question: '\'फागुन की कहानी\' का मुख्य विषय — \'फागुन की कहानी\' का केंद्रीय भाव और संदेश',
          hint: 'If stuck, review "Plot and Narrative Structure" (node 002) to map the journey\'s episodes.',
          misconception: 'Students often confuse the *refrain* "Bharat Mata ki Jai" (a slogan) with the *theme* (an argued concept).',
          parts: [
                { id: 'a', prompt: 'Nehru writes that when he asked people "Who is Bharat Mata?", a farmer replied "The earth, the fields." Why does Nehru reject this answer as incomplete, and.', answer: 'Nehru rejects the farmer\'s answer',
                  options: ['Nehru rejects the farmer\'s answer', 'Nehru liked the farmer\'s answer', 'Nehru wanted a more poetic answer', 'Bharat Mata ki Jai'],
                  hint: 'If stuck, review "Plot and Narrative Structure" (node 002) to map the journey\'s episodes, then.',
                  misconception: 'Students often confuse the *refrain* "Bharat Mata ki Jai" (a slogan) with the *theme* (an argued concept).' },
                { id: 'b', prompt: 'Apply the "theme tracing" method: Find three distinct passages in the text where Nehru moves from describing physical India to describing human India.', answer: 'Passage 1: "From the snow-capped Himalayas to Cape Comorin" (physical geography)',
                  options: ['Passage 1: "From the snow-capped Himalayas to Cape Comorin" (physical geography)', 'Bharat Mata ki Jai'],
                  hint: 'If stuck, review "Plot and Narrative Structure" (node 002) to map the journey\'s episodes, then.',
                  misconception: 'Students often confuse the *refrain* "Bharat Mata ki Jai" (a slogan) with the *theme* (an argued concept).' }
          ],
            remediations: { 'students-often-confuse-the-refrain': { steps: ['If a student gives the slogan-based answer: (1) Ask them to find the exact paragraph where Nehru says "I would tell.', '(2) Have them underline every group of people Nehru lists (peasants, workers, city-dwellers, etc.).', '(3) Ask: "If Bharat Mata is just the land, why does Nehru spend 80% of the essay describing *people*?" (4) Guide them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
