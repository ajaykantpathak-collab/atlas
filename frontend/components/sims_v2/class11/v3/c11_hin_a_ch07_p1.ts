import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch07_p1: SimDef = {
    id: 'v3_c11_hin_a_ch07_p1',
    title: 'पाठ 7 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 7 के **रचनाकार के जीवन के प्रासंगिक प्रसंगों**, उनकी **साहित्यिक.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 7 · Part 1/3',
    chapters: ['c11_hin_a_ch07'],
    nodeIds: ['c11_hin_a_cbse_07_001', 'c11_hin_a_cbse_07_002', 'c11_hin_a_cbse_07_003', 'c11_hin_a_cbse_07_004', 'c11_hin_a_cbse_07_005', 'c11_hin_a_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'अंतरा भाग-1 खोलिए और पाठ 07 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — पृष्ठभूमि', 'पाठ 7 — कथानक', 'पाठ 7 — पाठ्य-परिवेश', 'पाठ 7 — पात्र-चित्रण', 'पाठ 7 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 1/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — \'जीवन एक रंगमंच है\' का कथानक — \'जीवन एक रंगमंच है\' — अंतरा भाग-1 का पाठ। पाठ का कथानक.', answer: '7 -', options: ['7 -', '7 -'] },
            { id: 's2', label: '7 -', prompt: 'Which idea is this? — \'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित है।', answer: '7 -', options: ['7 -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'यदि अटके तो **\'हिंदी साहित्य का इतिहास\' (History of Hindi Literature)** के **\'आधुनिक काल\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"पृष्ठभूमि और रचनाकार परिचय" का अर्थ रचनाकार की **जन्मतिथि, जन्मस्थान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)', '\'जीवन एक रंगमंच है\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **\'हिंदी साहित्य का इतिहास\' (History of Hindi Literature)** के **\'आधुनिक काल\' (Modern.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"पृष्ठभूमि और रचनाकार परिचय" का अर्थ रचनाकार की **जन्मतिथि, जन्मस्थान, शिक्षा, नौकरी, पुरस्कार और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**चरण 1 (सूचना से अंतर्दृष्टि की ओर):** छात्र से कहें: "रचनाकार की जीवनी की **तालिका (Table)** बनाओ: कॉलम 1 — जीवन.', '**चरण 2 (विचारधारा की पहचान):** रचनाकार के **किसी एक साक्षात्कार/आत्मकथ्य/निबंध** का छोटा अंश पढ़वाएँ जहाँ वे अपनी.', '**चरण 3 (युग-संदर्भ जोड़ना):** रचना वर्ष के **समाचार पत्रों के शीर्षक/आंकड़े/घटनाएं** दिखाएँ। कार्य दें: "इनमें से किन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_002', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' का कथानक — \'जीवन एक रंगमंच है\' — अंतरा भाग-1 का पाठ। पाठ का.',
          hint: 'यदि फंसे हों, तो E.M. फॉरस्टर के \'Aspects of the Novel\' का वह अंश पढ़ें जहां वे "The king.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'कथानक\' (Plot) केवल घटनाओं की \'सूची\' (List) या \'सारांश\' (Summary) होता है, और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' का कथानक',
                  options: ['\'जीवन एक रंगमंच है\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)', '\'जीवन एक रंगमंच है\' का पात्र-चित्रण'],
                  hint: 'यदि फंसे हों, तो E.M. फॉरस्टर के \'Aspects of the Novel\' का वह अंश पढ़ें जहां वे "The king died and.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'कथानक\' (Plot) केवल घटनाओं की \'सूची\' (List) या \'सारांश\' (Summary) होता है, और \'आख्यान-संरचना\'.' }
          ],
            remediations: { 'plot-list-summary': { steps: ['**माइक्रो-व्यायाम (5 मिनट):** छात्र को कोई परिचित फिल्म (जैसे *3 Idiots*, *Drishyam*, *Baahubali*) लेने को कहें। पहले.', '**संरचना-प्रभाव मानचित्र (Structure-Effect Map):** एक टेबल बनवाएं: | संरचनात्मक युक्ति (Flashback, Parallel Plot.', '**लेखन अभ्यास:** वही कहानी (जैसे \'कफन\') दो संरचनाओं में लिखवाएं: (अ) रेखीय, (ब) फ्लैशबैक से शुरू। फिर पूछें: "दूसरे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_003', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि छात्र फँस गया है, तो उसे c11_hin_a_cbse_07_002 (कथानक और आख्यान-संरचना) की समीक्षा.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश केवल कहानी के स्पष्ट रूप से उल्लिखित समय और स्थान (जैसे "1947 में दिल्ली") तक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)',
                  options: ['\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पात्र-चित्रण'],
                  hint: 'यदि छात्र फँस गया है, तो उसे c11_hin_a_cbse_07_002 (कथानक और आख्यान-संरचना) की समीक्षा करनी चाहिए.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश केवल कहानी के स्पष्ट रूप से उल्लिखित समय और स्थान (जैसे "1947 में दिल्ली") तक सीमित है और वे सामाजिक.' }
          ],
            remediations: { '1947': { steps: ['छात्र को पहले स्पष्ट रूप से बताएँ कि पाठ्य-परिवेश में "अदृश्य" तत्व भी शामिल होते हैं: आप एक टेबल पर दो कार्ड रखें—एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_004', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 002 (कथानक संरचना)** के \'मोड़ बिंदु\' खंड को दोहराएं — नायक.',
          misconception: '**विशिष्ट भ्रम**: छात्र **\'पात्र-विश्लेषण\' (Character Analysis)** और **\'पात्र-वर्णन\' (Character Description)** को एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' का पात्र-चित्रण',
                  options: ['\'जीवन एक रंगमंच है\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 002 (कथानक संरचना)** के \'मोड़ बिंदु\' खंड को दोहराएं — नायक का.',
                  misconception: '**विशिष्ट भ्रम**: छात्र **\'पात्र-विश्लेषण\' (Character Analysis)** और **\'पात्र-वर्णन\' (Character Description)** को एक मान लेते हैं। वे नायक.' }
          ],
            remediations: { 'character-analysis-character-description-what': { steps: ['छात्र से कहें: "पाठ खोलकर नायक के **तीन प्रसंग** ढूंढो जहाँ उसने **कोई निर्णय लिया** हो — प्रत्येक के लिए लिखो: (क).', 'फिर पूछें: "इन तीनों प्रसंगों को जोड़ने वाला **एक सूत्र (thread)** क्या है?', 'क्या नायक हर बार एक ही मूल्य (जैसे: न्याय, प्रेम, सत्य) के लिए खड़ा हुआ?" 3.', 'अंत में: "अब अपना उत्तर **PEEL संरचना** में लिखो — Point (नायक का केंद्रीय गुण), Evidence (उद्धरण), Explanation (यह गुण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_005', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_a_cbse_07_002 (कथानक और आख्यान-संरचना)** के.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "जो पात्र कम बोले या कम दृश्यों में आए, वह सहायक पात्र है।" **गलत तर्क:** वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' के सहायक पात्र',
                  options: ['\'जीवन एक रंगमंच है\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_a_cbse_07_002 (कथानक और आख्यान-संरचना)** के \'मोड़-बिंदु.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "जो पात्र कम बोले या कम दृश्यों में आए, वह सहायक पात्र है।" **गलत तर्क:** वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से पूछें — "अगर इस पात्र को कहानी से निकाल दें, तो **कौन सा विशिष्ट मोड़** गायब हो जाएगा?" (विशिष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_006', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' का मुख्य विषय — \'जीवन एक रंगमंच है\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अटका हुआ महसूस हो तो: **कथानक के तीन मोड़ (turning points) पुनः पढ़ें और प्रत्येक पर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मानते हैं कि \'मुख्य विषय\' लेखक द्वारा **स्पष्टतः कथन** के रूप में दिया गया एक वाक्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' का मुख्य विषय',
                  options: ['\'जीवन एक रंगमंच है\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो: **कथानक के तीन मोड़ (turning points) पुनः पढ़ें और प्रत्येक पर पूछें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मानते हैं कि \'मुख्य विषय\' लेखक द्वारा **स्पष्टतः कथन** के रूप में दिया गया एक वाक्य होता है (जैसे कहानी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — स्पष्टीकरण:** छात्र को समझाएँ: "विषय लेखक का दिया हुआ उत्तर नहीं, **तुम्हारा पूछा हुआ प्रश्न** है जो पाठ.', '**चरण 2 — मॉडलिंग:** पाठ 7 के एक छोटे अंश (5-6 पंक्तियाँ) लेकर **संयुक्त विश्लेषण** करो: (क) पात्र क्या करता है?', '(ख) कौन सा शब्द/चित्र दोहराया जाता है?', '(ग) यह क्या संकेत देता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
