import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch12_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch12_p1',
    title: 'पाठ 12 · Part 1/3',
    subtitle: 'Follow a village postman who delivers an argument instead of a letter.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 12 · Part 1/3',
    chapters: ['c11_hin_ar_ch12'],
    nodeIds: ['c11_hin_ar_cbse_12_001', 'c11_hin_ar_cbse_12_002', 'c11_hin_ar_cbse_12_003', 'c11_hin_ar_cbse_12_004', 'c11_hin_ar_cbse_12_005', 'c11_hin_ar_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a villager deciding whether \'पढ़ ले\' is an order or an invitation', intro: 'A postman calls at the door and finds the letters useless to the woman inside — so he tries to hand her the alphabet itself.', goal: 'Read the poem as a narrative of persuasion and evaluate its open, imperative ending.' },
    discovery: {
        question: 'A postman urges an illiterate villager to learn letters; the poem ends on \'पढ़ ले!\' — does the villager learn to read by the end?',
        options: ['No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader', 'Yes — she reads her letter in the final stanza', 'Yes — literacy is achieved by stanza six', 'No — the postman gives up instead'],
        answer: 'No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader',
        hook: 'Agyeya the linguist wrote in the people\'s dialect on purpose — the poem isn\'t about letters, it\'s about reclaiming agency.',
    },
    teaching: [
        { title: 'पाठ 12 — पृष्ठभूमि और रचनाकार परिचय', text: '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिस्थितियों का वह समुच्चय है जो रचना के विषय, चरित्र और संवेदना को आकार देता है। **रचनाकार परिचय** लेखक के जीवन.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the postman\'s arrival to the command \'पढ़ ले!\' as a narrative arc, then argue whether a revolutionary poet\'s literacy poem can be called propaganda.',
        labels: ['पाठ 12 — पृष्ठभूमि', 'पाठ 12 — कथानक', 'पाठ 12 — पाठ्य-परिवेश', 'पाठ 12 — पात्र-चित्रण', 'पाठ 12 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 1/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — **कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो.', answer: '12 -', options: ['12 -', '12 -'] },
            { id: 's2', label: '12 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और.', answer: '12 -', options: ['12 -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is adapting Agyeya\'s poem — a postman urging an illiterate villager to read — for a street play. The adapter wants to add a narrator to \'explain the poet\'s sadness about illiteracy\' and soften the postman\'s command \'पढ़ ले!\' into polite persuasion.',
            decisions: [{ prompt: 'Why do both changes miss the poem\'s design?', options: [
                { text: 'Keep it narrative and keep the force: this isn\'t a lyric about sadness — it\'s a performed confrontation carried entirely in dialogue, no narrator needed. The structure runs exposition (postman\'s arrival) through rising action (the villager\'s shame, the persuasion) to the climax \'पढ़ ले!\' and resolves in a vision of empowerment. Softening the command defuses the turning point — and context sharpens it: an experimentalist poet in the literacy-campaign era making language itself a tool of liberation.', outcome: 'The play preserves the poem\'s engine: dialogue as structure, the command as climax — oral culture crossing into literacy onstage.' },
                { text: 'Add the narrator — an audience needs someone to state the theme clearly.', outcome: 'The poem deliberately works without narration: the two voices carry the whole arc, and a narrator converts performance into summary.', reveals: 'narrator-needed-for-theme' },
                { text: 'Soften the command — \'please try reading\' is kinder and more realistic persuasion.', outcome: 'The imperative is the climax — the moment agency is handed over; softening it turns a demand for liberation into a suggestion.', reveals: 'soften-the-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'The poem never shows her reading — the last word is a command left open, because the literacy it imagines was still unfinished business.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_001', difficulty: 'standard',
          question: '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं.',
          hint: 'यदि अटके तो **\'यथार्थवाद और व्यंग्य का अंतर\' (कक्षा 10 की पाठ्यपुस्तक \'कृतिका/स्पर्श\' के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"पृष्ठभूमि और रचनाकार परिचय" केवल \'तथ्यात्मक जानकारी\' (Factual Information).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक',
                  options: ['**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और', 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें कहानी के प्रमुख'],
                  hint: 'यदि अटके तो **\'यथार्थवाद और व्यंग्य का अंतर\' (कक्षा 10 की पाठ्यपुस्तक \'कृतिका/स्पर्श\' के संबंधित.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"पृष्ठभूमि और रचनाकार परिचय" केवल \'तथ्यात्मक जानकारी\' (Factual Information) है जिसे परीक्षा में.' }
          ],
            remediations: { 'factual-information-1-2': { steps: ['**चरण 1 (संबंध जोड़ो):** छात्र से कहें: *"रचनाकार की जीवनी की एक घटना चुनो (जैसे: पहली पोस्टिंग किसी पिछड़े ब्लॉक में).', '**चरण 2 (तुलना करो):** दो कॉलम बनवाएँ: **कॉलम A — पृष्ठभूमि का तथ्य** (जैसे: 1952 में पंचायती राज लागू) **कॉलम B — पाठ.', '**चरण 3 (व्यंग्य की जरूरत):** पूछें: *"यही बात अगर लेखक सीधे-सीधे \'भ्रष्टाचार बुरा है\' लिखकर कह देते, तो क्या फर्क.', '**चरण 4 (आधुनिक जोड़):** छात्र से कहें कि अपने गाँव/शहर/मोहल्ले की एक वर्तमान समस्या (कूड़ा, पानी, रिश्वत) पर श्रीलाल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_002', difficulty: 'standard',
          question: '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological).',
          hint: 'यदि अटके तो **\'कथा-तत्व (Elements of Fiction)\'** की कक्षा 9-10 की परिभाषाएँ (कथानक.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि **\'फ्लैशबैक\' केवल अतीत में जाने की तकनीक है**, और उसका एकमात्र उद्देश्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो',
                  options: ['**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और', 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें कहानी के प्रमुख'],
                  hint: 'यदि अटके तो **\'कथा-तत्व (Elements of Fiction)\'** की कक्षा 9-10 की परिभाषाएँ (कथानक, पात्र, संवाद.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि **\'फ्लैशबैक\' केवल अतीत में जाने की तकनीक है**, और उसका एकमात्र उद्देश्य \'पृष्ठभूमि जानकारी देना\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**चरण 1 — सूक्ष्म पाठ (Close Reading):** छात्र को एक छोटा अंश दें जिसमें फ्लैशबैक **वर्तमान क्रिया द्वारा ट्रिगर** होता.', 'यदि यह 10 पन्ने बाद आती तो क्या फर्क पड़ता?" 2.', '**चरण 2 — तुलनात्मक विश्लेषण:** उसी घटना को दो तरह से लिखवाएँ — (अ) रैखिक वर्णन, (ब) फ्लैशबैक के रूप में। छात्र से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक.',
          hint: 'यदि अटके तो \'बिंब और रूपक\' (c11_hin_ar_cbse_12_008) के बिंब-प्रकार (दृश्य, श्रव्य आदि).',
          misconception: 'छात्र समझते हैं कि \'परिवेश\' केवल स्थान/समय बताना है (जैसे: "कहानी गाँव में होती है") और \'वातावरण\' केवल विशेषण लगाना है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और',
                  options: ['पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें कहानी के प्रमुख'],
                  hint: 'यदि अटके तो \'बिंब और रूपक\' (c11_hin_ar_cbse_12_008) के बिंब-प्रकार (दृश्य, श्रव्य आदि) दोहराएँ और.',
                  misconception: 'छात्र समझते हैं कि \'परिवेश\' केवल स्थान/समय बताना है (जैसे: "कहानी गाँव में होती है") और \'वातावरण\' केवल विशेषण लगाना है (जैसे: "माहौल डरावना.' }
          ],
            remediations: { 'selection-of-details-pacing-rhythm': { steps: ['चरण 1: छात्र को एक ही स्थान (जैसे: रेलवे स्टेशन) के दो छोटे पैराग्राफ दें — एक \'उत्साह/प्रतीक्षा\' का वातावरण रचता हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें कहानी के.',
          hint: 'यदि अटके: **कथानक-मानचित्र (plot map)** दोबारा बनाओ — हर अध्याय के लिए एक पंक्ति में.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि नायक के **गुणों (traits) की लंबी सूची** बनाना ही अच्छा चित्रण है — जैसे "वह साहसी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें कहानी के प्रमुख',
                  options: ['पात्र-चित्रण (Character Sketch) एक विश्लेषणात्मक प्रक्रिया है जिसमें कहानी के प्रमुख', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि अटके: **कथानक-मानचित्र (plot map)** दोबारा बनाओ — हर अध्याय के लिए एक पंक्ति में लिखो: "इस.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि नायक के **गुणों (traits) की लंबी सूची** बनाना ही अच्छा चित्रण है — जैसे "वह साहसी, दयालु, बुद्धिमान.' }
          ],
            remediations: { 'traits': { steps: ['**चरण 1:** छात्र से कहो: "अपना लिखा चित्रण पढ़ो और हर वाक्य के आगे पूछो — **यह मुझे पाठ की किस पंक्ति/घटना से पता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_005', difficulty: 'standard',
          question: 'सहायक पात्र वे चरित्र होते हैं जो नायक/प्रमुख पात्र के समानांतर या पृष्ठभूमि.',
          hint: 'यदि अटका हुआ महसूस करें, तो **c11_hin_ar_cbse_12_004 (पात्र-चित्रण: नायक)** के \'कार्यित.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "सहायक पात्र = नायक का मित्र/सहयोगी"। वे **शत्रु/विरोधी (Antagonist)** और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे चरित्र होते हैं जो नायक/प्रमुख पात्र के समानांतर या पृष्ठभूमि में रहकर',
                  options: ['सहायक पात्र वे चरित्र होते हैं जो नायक/प्रमुख पात्र के समानांतर या पृष्ठभूमि में रहकर', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि अटका हुआ महसूस करें, तो **c11_hin_ar_cbse_12_004 (पात्र-चित्रण: नायक)** के \'कार्यित उदाहरण\'.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "सहायक पात्र = नायक का मित्र/सहयोगी"। वे **शत्रु/विरोधी (Antagonist)** और **निष्क्रिय/तटस्थ पात्रों**.' }
          ],
            remediations: { 'antagonist': { steps: ['**शब्दार्थ सुधार**: छात्र से कहें: "साहित्य में \'सहायक\' का अर्थ \'हेल्पर\' नहीं, \'कथानक/नायक/विषय की सहायता करने वाला.', '**वर्गीकरण अभ्यास**: 5 ज्ञात पाठों से 1-1 पात्र चुनवाएं और उन्हें केवल **कार्य**.', '**पाठ्य-साक्ष्य अनिवार्य**: हर वर्गीकरण के लिए एक संवाद/घटना उद्धृत करवाएं जो उस कार्य को सिद्ध करे। 4.', '**पुनर्लेखन**: छात्र से एक पैरा लिखवाएं: "पात्र X (जो शत्रु/तटस्थ है) नायक के Y गुण को Z प्रकार उजागर करता है।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) is the fundamental, universal idea or conflict that.',
          hint: 'अगर अटका हुआ महसूस हो तो: कथानक संरचना (c11_hin_ar_cbse_12_002) के \'मोड़\' वाले खंड को.',
          misconception: 'विद्यार्थी प्रायः \'मुख्य विषय\' को एक शब्द (जैसे \'अन्याय\', \'गरीबी\', \'भ्रष्टाचार\') में समेट देते हैं और समझते हैं कि विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) is the fundamental, universal idea or conflict that structures',
                  options: ['मुख्य विषय (Central Theme) is the fundamental, universal idea or conflict that structures', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'अगर अटका हुआ महसूस हो तो: कथानक संरचना (c11_hin_ar_cbse_12_002) के \'मोड़\' वाले खंड को दोबारा पढ़ें.',
                  misconception: 'विद्यार्थी प्रायः \'मुख्य विषय\' को एक शब्द (जैसे \'अन्याय\', \'गरीबी\', \'भ्रष्टाचार\') में समेट देते हैं और समझते हैं कि विषय मिल गया। वास्तव में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['विद्यार्थी से कहें: "पाठ के तीन मोड़ (turning points) चुनो जहाँ नायक के सामने विकल्प था — प्रत्येक में उसने क्या चुना.', 'उन तीन विकल्पों को कागज़ पर अगल-बगल लिखवाएं। 3.', 'पूछें: "इन तीनों चुनावों में कॉमन (common) तनाव क्या है?', 'उसे एक वाक्य में लिखो जिसमें दो विरोधी शक्तियों के नाम हों (जैसे: \'सुरक्षा बनाम स्वाभिमान\')।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
