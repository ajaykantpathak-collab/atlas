import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch08_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch08_p3',
    title: 'पाठ 8 · Part 3/3',
    subtitle: 'Read a prisoner\'s India — episodic, argumentative, and allergic to uniformity.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 8 · Part 3/3',
    chapters: ['c11_hin_ar_ch08'],
    nodeIds: ['c11_hin_ar_cbse_08_013', 'c11_hin_ar_cbse_08_014', 'c11_hin_ar_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a prisoner composing a nation from memory', intro: 'From a cell, Nehru walks the whole country — and every conversation with a peasant becomes a meditation on what \'India\' even is.', goal: 'Analyse the episodic-reflective structure and the theme of unity built from diversity.' },
    discovery: {
        question: 'Nehru\'s chapter jumps from the Himalaya to a peasant\'s face to a Vedic hymn to a Kanpur factory — is the disorder a structural weakness?',
        options: ['No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity', 'Yes — history must run in dates', 'Yes — prison made him ramble', 'No — but only because it\'s a travelogue'],
        answer: 'No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity',
        hook: 'Written in a 1942-46 prison cell, \'Bharat Mata\' argues that India\'s unity lives in shared labour and suffering — not in cultural sameness.',
    },
    teaching: [
        { title: 'पाठ 8 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ (text) के सतही अर्थ से आगे जाकर उसकी आंतरिक संरचना, भाषा-प्रयोग, पूर्वधारणाओं (assumptions) और निहितार्थों.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate the journey\'s episodes from its reflective digressions, then defend whether diversity can ground unity without uniformity.',
        labels: ['पाठ 8 — आलोचनात्मक', 'पाठ 8 — लेखन', 'पाठ 8 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_08_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 3/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skills) refers to the ability to compose.', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक **साहित्यिक संवाद कौशल** है जिसमें पाठ के **कथ्य, शिल्प, भाषा.', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For Independence Day, a student proposes a poster quoting Nehru\'s \'Bharat Mata\' essay beside a calendar image of the goddess Bharat Mata with a flag. Another teammate says the essay \'has no structure — it just rambles from mountains to peasants to philosophy.\'',
            decisions: [{ prompt: 'What do both get wrong about the text?', options: [
                { text: 'Separate symbol from argument: Nehru, writing in Ahmednagar Fort prison in Discovery of India, deliberately redefines Bharat Mata — not a goddess of land but \'the millions of individuals\', the people themselves. And the structure is the argument: an episodic travelogue where physical journey is the spine, encounters are self-contained units, and reflective digressions build the idea — fragments joined like the diverse-yet-united nation.', outcome: 'The poster gets redesigned — people, not iconography — and the \'rambling\' resolves into a deliberate episodic architecture mirroring India\'s unity-in-diversity.' },
                { text: 'Keep the goddess image — Bharat Mata is Bharat Mata, and the picture makes the poster devotional.', outcome: 'That projects external iconography onto the text: Nehru explicitly rejects goddess imagery for a secular, humanist definition — the people constitute the nation.', reveals: 'bharat-mata-is-goddess' },
                { text: 'Agree it has no structure — it\'s a prison diary, so wandering is natural.', outcome: 'Non-fiction has structure too: the journey spine, episodes, digressions and synthesis form an intellectual arc — the \'plot\' is the idea developing.', reveals: 'essay-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'The journey ends but the argument doesn\'t — the \'Bharat Mata\' Nehru finds is the people themselves, not a goddess on a map.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_08_002 (कथानक संरचना)** और.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आलोचनात्मक विश्लेषण में **"छिपा हुआ अर्थ" (hidden meaning) ढूँढना** होता है जो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ (text)',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ (text)', 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें', 'कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_08_002 (कथानक संरचना)** और **c11_hin_ar_cbse_08_008/009.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आलोचनात्मक विश्लेषण में **"छिपा हुआ अर्थ" (hidden meaning) ढूँढना** होता है जो लेखक ने जानबूझकर गुप्त.' }
          ],
            remediations: { 'hidden-meaning-riddle-answer-key': { steps: ['**चरण 1 — \'छिपा अर्थ\' मिथक तोड़ें:** छात्र से कहें: *"मान लो लेखक यहाँ बैठा है और तुमसे पूछता है: \'तुमने क्या समझा?\'.', 'क्यों?" **चरण 4 — मेटाकॉग्निटिव प्रतिबिंब:** अंत में पूछें: *"विश्लेषण करते समय तुम्हारे मन में पहला विचार क्या आया?', 'क्या तुमने कोई अन्य संभावना खारिज की?', 'क्यों?"* — यह चिंतन-प्रक्रिया (thinking process) को दृश्यमान बनाता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skills) refers to the ability.',
          hint: 'If stuck, review **Critical Thinking: Analysis and Interpretation.',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित लेखन में अच्छे अंक लाने के लिए पाठ के लंबे-लंबे उद्धरण (Long quotes) उद्धृत करने चाहिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skills) refers to the ability to compose',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skills) refers to the ability to compose', 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें', 'कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'If stuck, review **Critical Thinking: Analysis and Interpretation (c11_hin_ar_cbse_08_013)**.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित लेखन में अच्छे अंक लाने के लिए पाठ के लंबे-लंबे उद्धरण (Long quotes) उद्धृत करने चाहिए और कठिन साहित्यिक.' }
          ],
            remediations: { 'long-quotes-jargon-3-4': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**उद्धरण आहार (Quote Diet):** छात्र को अगले 3 अभ्यासों के लिए **कुल 15 शब्दों से अधिक उद्धरण न देने** का नियम दें।.', '**PEEL रंग-कोडिंग (Color-coding):** छात्र को अपना उत्तर लिखने के बाद चार रंगों से हाइलाइट करने को कहें: **हरा** = Point.', '**\'तो क्या?\' परीक्षण (So What?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक **साहित्यिक संवाद कौशल** है जिसमें पाठ के **कथ्य.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_08_012 (बोध-प्रश्न)** और **c11_hin_ar_cbse_08_013.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **चर्चा-बिंदु = पाठ का सारांश + व्यक्तिगत राय**। **गलत तर्क**: "मैंने पढ़ लिया.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक **साहित्यिक संवाद कौशल** है जिसमें पाठ के **कथ्य, शिल्प, भाषा,',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक **साहित्यिक संवाद कौशल** है जिसमें पाठ के **कथ्य, शिल्प, भाषा,', 'पृष्ठभूमि से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिवेश से है जिसमें', 'कथानक (Plot) घटनाओं का वह तार्किक और कलात्मक क्रम है जो कारण-कार्य संबंध (Causality) से', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_08_012 (बोध-प्रश्न)** और **c11_hin_ar_cbse_08_013 (आलोचनात्मक.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **चर्चा-बिंदु = पाठ का सारांश + व्यक्तिगत राय**। **गलत तर्क**: "मैंने पढ़ लिया, अब मुझे जो महसूस.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (चरणबद्ध)**: 1.', '**पृथक्करण अभ्यास**: छात्र को **दो कॉलम** बनाने को कहें — बाएँ: "मेरी भावना/राय", दाएँ: "पाठ का वाक्य जो इसका आधार है"।.', '**प्रश्न-परिवर्तन**: हर "मुझे लगता है" को **"पाठ दर्शाता है कि..."** में बदलने का अभ्यास कराएँ — ५ वाक्यों पर दैनिक। 3.', '**साक्षी-आधारित मॉडलिंग**: शिक्षक एक **कमजोर बिंदु** ले, कक्षा के सामने **लाइव पुनर्लेखन** करे — "यहाँ \'अच्छा लगा\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
