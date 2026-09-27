import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch09_p1: SimDef = {
    id: 'v3_c6_hin_ch09_p1',
    title: 'पाठ 9 · Part 1/3',
    subtitle: 'This node covers identifying the author (रचनाकार), their literary style/era, and the.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 9 · Part 1/3',
    chapters: ['c6_hin_ch09'],
    nodeIds: ['c6_hin_cbse_09_001', 'c6_hin_cbse_09_002', 'c6_hin_cbse_09_003', 'c6_hin_cbse_09_004', 'c6_hin_cbse_09_005', 'c6_hin_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Think about your favorite cartoon or movie — do you know who created it and *when*?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय', text: '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the historical, social, and cultural context in which a literary work was written, along with the biographical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — पृष्ठभूमि', 'पाठ 9 — कथानक', 'पाठ 9 — पाठ्य-परिवेश', 'पाठ 9 — पात्र-चित्रण', 'पाठ 9 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 1/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित.', answer: '9 -', options: ['9 -', '9 -'] },
            { id: 's2', label: '9 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक.', answer: '9 -', options: ['9 -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_001', difficulty: 'standard',
          question: '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study.',
          hint: 'If stuck, review the Class 5 skill of \'लेखक/कवि परिचय\' (Author/Poet Introduction).',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर सोचते हैं कि "पृष्ठभूमि" का अर्थ केवल **इतिहास की तारीखें और घटनाएँ** (जैसे 1857, 1942.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the',
                  options: ['"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के **नायक/प्रमुख'],
                  hint: 'If stuck, review the Class 5 skill of \'लेखक/कवि परिचय\' (Author/Poet Introduction) — specifically.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर सोचते हैं कि "पृष्ठभूमि" का अर्थ केवल **इतिहास की तारीखें और घटनाएँ** (जैसे 1857, 1942, 1947) रटना है, और.' }
          ],
            remediations: { '1857': { steps: ['**पहला कदम:** छात्र के साथ पाठ्यपुस्तक का \'रचनाकार परिचय\' बॉक्स खोलें और पूछें: "यहाँ लिखी किन 3 बातों से लगता है कि.', '**दूसरा कदम:** पाठ से **एक वाक्य/प्रसंग** चुनें जो उसी दुख/संघर्ष को दर्शाता हो। छात्र से कहें: "लेखक ने यह वाक्य.', 'कैसे पता चलेगा?" — शब्दों की बारीकी (जैसे विशेषण, क्रिया) पर ध्यान दिलाएँ। 3.', '**तीसरा कदम:** एक **माइंड-मैप** बनाएँ: केंद्र में \'रचनाकार का अनुभव\' → शाखाओं में \'पाठ के तत्व\' (पात्र, संवाद, विषय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में.',
          hint: 'यदि कारण-परिणाम कड़ी पहचानने में अटके, तो "क्यों?" खेल खेलो: हर घटना के बाद पूछो "यह.',
          misconception: 'छात्र मानते हैं कि कथानक का अर्थ केवल "कहानी में क्या-क्या हुआ" की सूची बनाना है, और चरमोत्कर्ष का अर्थ "सबसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित',
                  options: ['कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के **नायक/प्रमुख'],
                  hint: 'यदि कारण-परिणाम कड़ी पहचानने में अटके, तो "क्यों?" खेल खेलो: हर घटना के बाद पूछो "यह क्यों हुआ?" और.',
                  misconception: 'छात्र मानते हैं कि कथानक का अर्थ केवल "कहानी में क्या-क्या हुआ" की सूची बनाना है, और चरमोत्कर्ष का अर्थ "सबसे बड़ी/रोमांचक घटना" है। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "अपनी कल की दिनचर्या को दो तरह से लिखो: (अ) सुबह से शाम तक क्रम में, (ब) सबसे मज़ेदार घटना पहले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय.',
          hint: 'यदि अटके तो "कथानक और आख्यान-संरचना" (c6_hin_cbse_09_002) दोहराएँ — विशेषकर घटना-शृंखला.',
          misconception: 'छात्र अक्सर "परिवेश" को कहानी के "बैकड्रॉप" (पृष्ठभूमि चित्र) जैसा निष्क्रिय तत्व मानते हैं — जैसे थिएटर में टंगा एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक',
                  options: ['पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के **नायक/प्रमुख'],
                  hint: 'यदि अटके तो "कथानक और आख्यान-संरचना" (c6_hin_cbse_09_002) दोहराएँ — विशेषकर घटना-शृंखला और.',
                  misconception: 'छात्र अक्सर "परिवेश" को कहानी के "बैकड्रॉप" (पृष्ठभूमि चित्र) जैसा निष्क्रिय तत्व मानते हैं — जैसे थिएटर में टंगा एक पर्दा जिसे बदल दो तो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "अपनी पसंदीदा फिल्म/कहानी का क्लाइमेक्स याद करो। अब कल्पना करो वही क्लाइमेक्स किसी बिल्कुल अलग.', 'क्या परिणाम वही होगा?" चरण 2: दो कॉलम बनाएँ — "मूल परिवेश" और "बदला हुआ परिवेश", और हर कॉलम में लिखें: पात्र का संभावित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के.',
          hint: 'कथानक-संरचना (c6_hin_cbse_09_002) के \'मुख्य घटना-चक्र\' और \'नायक के निर्णय-बिंदु\' दोबारा.',
          misconception: '**विशिष्ट भ्रांति**: "पात्र-चित्रण = नायक की **सूची (list)** बनाना — नाम, उम्र, कद, रंग, कपड़े, शौक, पसंद-नापसंद।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के **नायक/प्रमुख',
                  options: ['पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के **नायक/प्रमुख', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक'],
                  hint: 'कथानक-संरचना (c6_hin_cbse_09_002) के \'मुख्य घटना-चक्र\' और \'नायक के निर्णय-बिंदु\' दोबारा देखें।',
                  misconception: '**विशिष्ट भ्रांति**: "पात्र-चित्रण = नायक की **सूची (list)** बनाना — नाम, उम्र, कद, रंग, कपड़े, शौक, पसंद-नापसंद।" **गलत तर्क**: छात्र.' }
          ],
            remediations: { 'list': { steps: ['**मॉडलिंग**: एक छोटे अंश (3-4 वाक्य) से **लाइव PEEL** दिखाओ — सोचते हुए बोलो: "मैंने \'बहादुर\' शब्द नहीं देखा, पर उसने.', '**संयुक्त अभ्यास**: छात्र के साथ मिलकर **दूसरे गुण** का PEEL लिखो; छात्र को **Evidence ढूँढ़ने** दो, तुम.', '**स्वतंत्र प्रयास**: छात्र अकेले **तीसरा गुण** निकाले; तुम केवल पूछो: "प्रमाण कौन-सा वाक्य है?" "यह गुण कहानी को कैसे.', '**फीडबैक चक्र**: लिखे हुए PEEL पर **लाल/हरे पेन** से चिह्नित करो — **हरा** = प्रमाण सही, **लाल** = व्याख्या अधूरी।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के साथ.',
          hint: 'यदि अटके तो **c6_hin_cbse_09_004 (नायक चित्रण)** दोहराएँ — उसी विधि (संवाद/कर्म/विचार से.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "सहायक पात्र = नायक का दोस्त/भाई/माँ" — यानी केवल **सकारात्मक/पारिवारिक**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के साथ कहानी में',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के साथ कहानी में', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटके तो **c6_hin_cbse_09_004 (नायक चित्रण)** दोहराएँ — उसी विधि (संवाद/कर्म/विचार से गुण.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "सहायक पात्र = नायक का दोस्त/भाई/माँ" — यानी केवल **सकारात्मक/पारिवारिक** भूमिकाएँ। वे **विरोधी.' }
          ],
            remediations: { 'antagonistic-supporters': { steps: ['**पहला कदम:** छात्र से पूछो — "किसी कहानी में ऐसा पात्र बताओ जो नायक की मदद न करे, फिर भी कहानी के लिए जरूरी हो।" यदि न.', '**दूसरा कदम:** एक टेबल बनाओ — स्तंभ: पात्र नाम | नायक से संबंध | मदद करता है?', '(हाँ/नहीं) | कथानक में योगदान। 3-4 पात्रों से भरवाओ। 3.', '**तीसरा कदम:** समझाओ — "सहायक = कथानक का सहायक, नायक का नहीं।" इस परिभाषा को दीवार पर लगाओ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_006', difficulty: 'standard',
          question: '**मुख्य विषय** वह केंद्रीय विचार या थीम है जिसके इर्द-गिर्द पूरी कहानी बुनी गई.',
          hint: 'यदि अटका हुआ लगे, तो **कथानक संरचना (c6_hin_cbse_09_002)** और **नायक का चरित्र-चित्रण.',
          misconception: '**सबसे आम भ्रम:** छात्र **कथानक (plot)** को **मुख्य विषय (theme)** मान लेते हैं। *उदाहरण:* कहानी "कछुआ और खरगोश" के लिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय** वह केंद्रीय विचार या थीम है जिसके इर्द-गिर्द पूरी कहानी बुनी गई होती है',
                  options: ['**मुख्य विषय** वह केंद्रीय विचार या थीम है जिसके इर्द-गिर्द पूरी कहानी बुनी गई होती है', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ लगे, तो **कथानक संरचना (c6_hin_cbse_09_002)** और **नायक का चरित्र-चित्रण.',
                  misconception: '**सबसे आम भ्रम:** छात्र **कथानक (plot)** को **मुख्य विषय (theme)** मान लेते हैं। *उदाहरण:* कहानी "कछुआ और खरगोश" के लिए छात्र लिखते हैं.' }
          ],
            remediations: { 'plot-theme': { steps: ['**कथानक vs विषय अभ्यास:** छात्र को 3 परिचित कहानियाँ (पंचतंत्र, अकबर-बीरबल) दें। प्रत्येक के लिए दो कॉलम बनवाएँ: "क्या.', '**\'तो क्या?\' तकनीक सिखाएँ:** विषय बताने के बाद पूछें — "तो क्या?', 'इससे क्या सीख मिली?" — यही संदेश बनेगा। 3.', '**प्रमाण ढूंढना:** कहानी के 3 खंडों (आरंभ, मध्य, अंत) से एक-एक वाक्य/प्रसंग छाँटने को कहें जो विषय/संदेश को **साबित**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
