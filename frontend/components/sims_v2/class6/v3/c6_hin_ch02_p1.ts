import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch02_p1: SimDef = {
    id: 'v3_c6_hin_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'यह नोड केवल पृष्ठभूमि ज्ञान (ऐतिहासिक/सामाजिक संदर्भ) और रचनाकार परिचय (जीवन-परिचय.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c6_hin_ch02'],
    nodeIds: ['c6_hin_cbse_02_001', 'c6_hin_cbse_02_002', 'c6_hin_cbse_02_003', 'c6_hin_cbse_02_004', 'c6_hin_cbse_02_005', 'c6_hin_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो तुमने एक पुराना पत्र अपने दादाजी के बक्से में पाया — तुम उसे पढ़ना शुरू करोगे या पहले यह जानने की.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — पाठ लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ समझना तथा रचनाकार के जीवन, विचारधारा और लेखन शैली की उन विशेषताओं को पहचानना जो पाठ को समझने में सहायक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 1/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के.', answer: '2 -', options: ['2 -', '2 -'] },
            { id: 's2', label: '2 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय).', answer: '2 -', options: ['2 -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — पाठ लिखे जाने का ऐतिहासिक, सामाजिक.',
          hint: 'अगर अटके तो \'पाठ का केंद्रीय भाव पहचानना\' (कक्षा 5 का कौशल) दोहराएँ — पहले \'क्या लिखा है\'.',
          misconception: 'छात्र समझते हैं कि \'रचनाकार परिचय\' का अर्थ है — लेखक का जन्मतिथि, जन्मस्थान, शिक्षा, मृत्यु तिथि, और प्रमुख रचनाओं की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),', 'पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव, विचारों,'],
                  hint: 'अगर अटके तो \'पाठ का केंद्रीय भाव पहचानना\' (कक्षा 5 का कौशल) दोहराएँ — पहले \'क्या लिखा है\' समझें.',
                  misconception: 'छात्र समझते हैं कि \'रचनाकार परिचय\' का अर्थ है — लेखक का जन्मतिथि, जन्मस्थान, शिक्षा, मृत्यु तिथि, और प्रमुख रचनाओं की सूची रट लेना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "एक कागज पर रचनाकार के 5 तथ्य लिखो (जन्म, शिक्षा, आदि)। फिर दूसरा कागज लो और लिखो: \'इस पाठ में.', 'क्या लेखक ने भी कभी चुप रहकर विरोध किया था?" — यह जोड़ बनाने का अभ्यास कराओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो.',
          hint: 'यदि अटका हुआ लगे तो \'कारण-कार्य श्रृंखला\' (cause-effect chain) का अभ्यास करें: दैनिक जीवन.',
          misconception: 'छात्र मानते हैं कि **\'उत्कर्ष\' (climax) कहानी का \'सबसे रोमांचक/एक्शन वाला दृश्य\' होता है** — जैसे लड़ाई, विस्फोट, या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के',
                  options: ['कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),', 'पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव, विचारों,'],
                  hint: 'यदि अटका हुआ लगे तो \'कारण-कार्य श्रृंखला\' (cause-effect chain) का अभ्यास करें: दैनिक जीवन की छोटी.',
                  misconception: 'छात्र मानते हैं कि **\'उत्कर्ष\' (climax) कहानी का \'सबसे रोमांचक/एक्शन वाला दृश्य\' होता है** — जैसे लड़ाई, विस्फोट, या पीछा। इसलिए वे शांत.' }
          ],
            remediations: { 'climax': { steps: ['छात्र को एक परिचित कहानी (जैसे \'पंचतंत्र की कहानी: शेर और चूहा\') दें और पूछें: \'वह कौन-सा **एक क्षण** है जिसके बाद.', 'फिर पूछें: \'क्या उस क्षण में धमाका/लड़ाई थी?\' — जब वह \'नहीं\' कहे, तब स्पष्ट करें: \'उत्कर्ष = निर्णायक मोड़, एक्शन.', 'दो-तीन और सूक्ष्म उदाहरणों (जैसे: परीक्षा हॉल में प्रश्नपत्र देखना, माँ का मौन आशीर्वाद) से अभ्यास कराएँ जब तक वह \'तनाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल.',
          hint: 'यदि अटके तो c6_hin_cbse_02_002 (कथानक और आख्यान-संरचना) दोहराएँ — विशेष रूप से.',
          misconception: 'छात्र अक्सर "पाठ्य-परिवेश" को केवल "कहानी कहाँ घटी" (स्थान) या "कब घटी" (समय) तक सीमित कर देते हैं — वे भौतिक विवरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),',
                  options: ['पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव, विचारों,'],
                  hint: 'यदि अटके तो c6_hin_cbse_02_002 (कथानक और आख्यान-संरचना) दोहराएँ — विशेष रूप से "घटना-कारण" पहचान का.',
                  misconception: 'छात्र अक्सर "पाठ्य-परिवेश" को केवल "कहानी कहाँ घटी" (स्थान) या "कब घटी" (समय) तक सीमित कर देते हैं — वे भौतिक विवरण (मौसम, इमारतें.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को एक परिचित दृश्य (स्कूल की सुबह की प्रार्थना सभा) दिखाएँ और पूछें: "यहाँ क्या-क्या है?" — सूची बनवाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव.',
          hint: 'यदि अटके: **c6_hin_cbse_02_002 (कथानक)** पर लौटें — नायक के तीन प्रमुख निर्णय पहचानें जो.',
          misconception: '**विशिष्ट भ्रांति:** "पात्र-चित्रण का अर्थ है पात्र के बारे में अच्छी-अच्छी बातें लिखना (गुणों की सूची बनाना), और नायक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव, विचारों,',
                  options: ['पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव, विचारों,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'यदि अटके: **c6_hin_cbse_02_002 (कथानक)** पर लौटें — नायक के तीन प्रमुख निर्णय पहचानें जो कथानक को.',
                  misconception: '**विशिष्ट भ्रांति:** "पात्र-चित्रण का अर्थ है पात्र के बारे में अच्छी-अच्छी बातें लिखना (गुणों की सूची बनाना), और नायक के चित्रण में केवल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**विरोधाभास दिखाएँ:** छात्र से पूछें: "क्या तुमने कभी कोई गलती की है?', 'क्या उससे तुम \'बुरे\' इंसान बन गए?" जब वे \'नहीं\' कहें, तो समझाएँ: "नायक भी इंसान है; उसकी गलतियाँ उसे **वास्तविक.', '**\'दोष-गुण\' तालिका बनाएँ:** दो कॉलम बनाएँ — \'कार्य\' और \'वह क्या दर्शाता है\'। नायक के एक \'नकारात्मक\' कार्य (जैसे झूठ.', '**पुनर्लेखन करवाएँ:** छात्र के लिखे \'केवल गुणों वाले\' चित्रण को लें और पूछें: "यह गुण तुमने कहाँ से जाना?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो प्रमुख पात्र/नायक के.',
          hint: 'यदि अटके, तो पहले नोड 004 (नायक-चित्रण) के कार्यित उदाहरण (WORKED_EXAMPLE) दोबारा करो.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि "सहायक पात्र = नायक का दोस्त" या "सहायक पात्र = कम महत्वपूर्ण पात्र"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो प्रमुख पात्र/नायक के साथ कहानी',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो प्रमुख पात्र/नायक के साथ कहानी', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'यदि अटके, तो पहले नोड 004 (नायक-चित्रण) के कार्यित उदाहरण (WORKED_EXAMPLE) दोबारा करो — विशेष रूप.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि "सहायक पात्र = नायक का दोस्त" या "सहायक पात्र = कम महत्वपूर्ण पात्र"। **वास्तविकता:** सहायक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहो — "किसी भी कहानी/फिल्म के 5 पात्रों के नाम लिखो। अब प्रत्येक के आगे लिखो: नायक से उसका.', 'और **काम** क्या है?" (रिश्ता ≠ काम) 2.', '**दूसरा कदम:** दो पात्र चुनो जिनका रिश्ता एक जैसा हो (जैसे दो मित्र) लेकिन काम अलग हो — चर्चा करो कि लेखक ने दोनों को.', '**तीसरा कदम:** एक कहानी का अंत बदलने को कहो — "अगर यह सहायक पात्र न होता, तो नायक क्या करता?" इससे \'प्रभाव\' समझ में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरी रचना.',
          hint: 'यदि अटका लगे तो **c6_hin_cbse_02_002 (कथानक और आख्यान-संरचना)** दोहराएँ — विशेषकर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'विषय\' को \'शीर्षक\' या \'कथानक-सार\' मान लेते हैं**। उदाहरण: पाठ "पहाड़ टूटा" (काल्पनिक).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरी रचना बुनी जाती',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरी रचना बुनी जाती', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'यदि अटका लगे तो **c6_hin_cbse_02_002 (कथानक और आख्यान-संरचना)** दोहराएँ — विशेषकर \'घटनाक्रम चार्ट\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'विषय\' को \'शीर्षक\' या \'कथानक-सार\' मान लेते हैं**। उदाहरण: पाठ "पहाड़ टूटा" (काल्पनिक) पढ़कर विषय लिखते हैं.' }
          ],
            remediations: { 'abstract-noun': { steps: ['**ठोस से अमूर्त का पुल बनाओ:** छात्र से कहो — "पाठ में जो हुआ (कथानक) उसे एक तरफ लिखो। अब पूछो: \'यह किस बारे में था?\'.', '**\'क्यों?\' की सीढ़ी चढ़ाओ:** हर प्रमुख घटना के बाद पूछो — "लेखक ने यह *क्यों* दिखाया?" — 3-4 बार \'क्यों\' पूछने पर विषय.', '**शीर्षक vs विषय खेल:** 5 कहानियों के शीर्षक दो (जैसे \'टोपीवाला\', \'बंदर और मगरमच्छ\', \'ईदगाह\') और उनके विषय लिखने को कहो.', '**संदेश के लिए \'तो क्या?\' टेस्ट:** विषय मिलने पर पूछो — "तो क्या?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
