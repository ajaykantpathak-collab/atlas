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
        { title: 'पाठ 8 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें किसी रचना की रचना हुई हो, तथा रचनाकार परिचय से तात्पर्य लेखक के जीवन-वृत्त, साहित्यिक अवदान, प्रमुख कृतियाँ.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate the journey\'s episodes from its reflective digressions, then defend whether diversity can ground unity without uniformity.',
        labels: ['पाठ 8 — पृष्ठभूमि', 'पाठ 8 — कथानक', 'पाठ 8 — पाठ्य-परिवेश', 'पाठ 8 — पात्र-चित्रण', 'पाठ 8 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 1/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से.', answer: '8 -', options: ['8 -', '8 -'] },
            { id: 's2', label: '8 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक.', answer: '8 -', options: ['8 -', '8 -'] }
          ] } },
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
          question: 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से.',
          hint: 'यदि अटका हुआ महसूस करें तो **\'आंचलिकता बनाम क्षेत्रीयता\'** का अंतर स्पष्ट करने वाले किसी.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — **लेखक की जन्मतिथि, मृत्युतिथि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें',
                  options: ['पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें', 'कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,', 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें किसी कथानक के प्रमुख'],
                  hint: 'यदि अटका हुआ महसूस करें तो **\'आंचलिकता बनाम क्षेत्रीयता\'** का अंतर स्पष्ट करने वाले किसी भी मानक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — **लेखक की जन्मतिथि, मृत्युतिथि, शिक्षा, नौकरी और पुस्तकों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (पृथक्करण):** छात्र से कहें — "लेखक की जीवनी की 5 घटनाएँ बाईं ओर लिखो और दाईं ओर पाठ के 5 प्रसंग/पंक्तियाँ.', '**चरण 2 (सामाजिक मानचित्रण):** एक चार्ट बनवाएँ: **स्तंभ 1:** पाठ में उल्लिखित समस्या (जैसे बाढ़), **स्तंभ 2:** उस समय.', '**चरण 3 (अभ्यास):** छात्र से एक पैराग्राफ लिखवाएँ: *"रेणु के जीवन की घटना X ने पाठ के प्रसंग Y को कैसे आकार दिया?"*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध.',
          hint: 'यदि उलझन हो तो E.M. फॉर्स्टर का उदाहरण ("राजा मरा, फिर रानी मरी" बनाम "राजा मरा, शोक से.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'घटना-क्रम\' (Sequence of Events)** को ही \'कथानक\' (Plot) मान लेते हैं और **\'फ्लैशबैक\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से',
                  options: ['कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से', 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,', 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें किसी कथानक के प्रमुख'],
                  hint: 'यदि उलझन हो तो E.M. फॉर्स्टर का उदाहरण ("राजा मरा, फिर रानी मरी" बनाम "राजा मरा, शोक से रानी मरी").',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'घटना-क्रम\' (Sequence of Events)** को ही \'कथानक\' (Plot) मान लेते हैं और **\'फ्लैशबैक\' (Flashback)** को केवल \'अतीत.' }
          ],
            remediations: { 'sequence-of-events-plot-flashback': { steps: ['**चरण 1:** छात्र से कहें—"पाठ की ५ प्रमुख घटनाएँ **कालानुक्रम में** लिखो।" (यह \'कहानी\' बनेगी)। **चरण 2:** फिर कहें—"अब.', 'जहाँ क्रम टूटा है, वहाँ निशान लगाओ।" (यह \'कथानक/संरचना\' दिखाएगा)। **चरण 3:** हर टूटे क्रम पर पूछो—"लेखक ने यहाँ क्रम.', 'पाठक को क्या महसूस कराना चाहता था?" (यह **संरचनात्मक कार्य** सिखाएगा)। **चरण 4:** एक छोटा पैराग्राफ लिखवाएँ: "इस पाठ की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_08_002 (कथानक) के \'मुख्य मोड़\' खंड को दोहराएँ और.',
          misconception: 'विद्यार्थी प्रायः \'परिवेश\' को कहानी का \'जहाँ-कब\' (स्थान+समय) मात्र मान लेते हैं और \'क्यों-कैसे\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,',
                  options: ['पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,', 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें', 'कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से', 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें किसी कथानक के प्रमुख'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_08_002 (कथानक) के \'मुख्य मोड़\' खंड को दोहराएँ और c11_hin_ar_cbse_08_001.',
                  misconception: 'विद्यार्थी प्रायः \'परिवेश\' को कहानी का \'जहाँ-कब\' (स्थान+समय) मात्र मान लेते हैं और \'क्यों-कैसे\' (सामाजिक-आर्थिक-मनोवैज्ञानिक प्रेरणा) की.' }
          ],
            remediations: { '8': { steps: ['विद्यार्थी से कहें: \'पाठ के पहले पृष्ठ पर लौटें और केवल संज्ञा शब्द (नाउन) घेरें जो स्थान, व्यक्ति-समूह, वस्तु.', 'फिर पूछें: \'इनमें से प्रत्येक स्तंभ का कोई एक शब्द चुनकर बताएँ कि यदि वह शब्द हटा दिया जाए तो नायक का कौन-सा निर्णय.', 'अंत में: \'अब लिखें कि परिवेश पात्र को "धक्का" देता है या "रास्ता" देता है — दोनों के उदाहरण दें।\' यह अभ्यास परिवेश को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें किसी कथानक.',
          hint: 'यदि फँस जाएँ तो: **c11_hin_ar_cbse_08_002 (कथानक संरचना)** के \'टर्निंग पॉइंट्स\' और.',
          misconception: '**सबसे गहरी गलतफहमी:** छात्र समझते हैं कि पात्र-चित्रण = "नायक के गुणों की सूची + अंत में एक वाक्य में उसका महत्व"। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें किसी कथानक के प्रमुख',
                  options: ['पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें किसी कथानक के प्रमुख', 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें', 'कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फँस जाएँ तो: **c11_hin_ar_cbse_08_002 (कथानक संरचना)** के \'टर्निंग पॉइंट्स\' और.',
                  misconception: '**सबसे गहरी गलतफहमी:** छात्र समझते हैं कि पात्र-चित्रण = "नायक के गुणों की सूची + अंत में एक वाक्य में उसका महत्व"। वे **\'क्या\' (what)** को.' }
          ],
            remediations: { 'what': { steps: ['**चरण 1 — ठोस साक्ष्य खोजने का अभ्यास:** छात्र से कहें: "पाठ खोलो, नायक से जुड़े **सिर्फ 5 संवाद/घटनाएँ** ढूँढो जहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो कथा के प्रमुख पात्र.',
          hint: 'यदि अटका हुआ महसूस हो, तो **\'नायक का चरित्र-चाप\' (Protagonist\'s Character Arc)**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "सहायक पात्र का विश्लेषण करने का अर्थ है उसका अलग से चरित्र-चित्रण लिख देना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो कथा के प्रमुख पात्र',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो कथा के प्रमुख पात्र', 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें', 'कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **\'नायक का चरित्र-चाप\' (Protagonist\'s Character Arc)** — विशेषकर नायक के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "सहायक पात्र का विश्लेषण करने का अर्थ है उसका अलग से चरित्र-चित्रण लिख देना — उसका स्वभाव, रूप-रंग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पृथक्करण अभ्यास (Isolation Drill):** छात्र को पाठ से 5 सहायक पात्रों की सूची बनाने को कहें। फिर प्रत्येक के लिए.', '**संबंध-मानचित्रण (Relationship Mapping):** एक तीर-आरेख (arrow diagram) बनवाएं: नायक → (क्या देता है/लेता है) → सहायक.', '**PEEL पुनर्लेखन (PEEL Rewriting):** छात्र के कमजोर उत्तर ("रामू अच्छा नौकर था") को लेकर, शिक्षक मिलकर PEEL में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) किसी रचना का वह केंद्रीय, सार्वभौमिक और गहन विचार या.',
          hint: 'यदि अटके तो \'पात्र-चित्रण: नायक\' (c11_hin_ar_cbse_08_004) के \'अंतर्द्वंद्व विश्लेषण\' भाग.',
          misconception: '**विषय = नैतिक शिक्षा (Moral Lesson)** — छात्र अक्सर लिखते हैं: "पाठ का विषय है: हमें ईमानदार रहना चाहिए।" यह गलत है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) किसी रचना का वह केंद्रीय, सार्वभौमिक और गहन विचार या',
                  options: ['मुख्य विषय (Central Theme) किसी रचना का वह केंद्रीय, सार्वभौमिक और गहन विचार या', 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें', 'कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि अटके तो \'पात्र-चित्रण: नायक\' (c11_hin_ar_cbse_08_004) के \'अंतर्द्वंद्व विश्लेषण\' भाग को दोहराएं.',
                  misconception: '**विषय = नैतिक शिक्षा (Moral Lesson)** — छात्र अक्सर लिखते हैं: "पाठ का विषय है: हमें ईमानदार रहना चाहिए।" यह गलत है क्योंकि: (1) विषय.' }
          ],
            remediations: { 'moral-lesson-1-sermon': { steps: ['**पुनर्पाठ (Re-read) कराएं**: छात्र से कहें — "पाठ के 3 सबसे तनावपूर्ण प्रसंग छाँटो जहाँ नायक को चुनाव करना पड़ा।.', '**तुलना तालिका (Comparison Table) बनवाएं**: दो कॉलम — "कथानक की घटना" vs "उससे उभरता विचार"। जब तक 3 पंक्तियों में एक.', '**सार्वभौमिकता जांच (Universality Test)**: छात्र से पूछें — "यह विषय किसी भी देश, काल, पेशे पर लागू होता है?" यदि हाँ.', '**PEEL पैराग्राफ लिखवाएं**: Point (विषय कथन), Evidence (प्रसंग/संवाद), Explanation (विश्लेषण), Link (संदेश से संबंध).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
