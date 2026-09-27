import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch01_p1: SimDef = {
    id: 'v3_c6_hin_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'इस नोड में केवल लेखक परिचय, रचनाकाल की पृष्ठभूमि, और लेखक की प्रमुख रचनाएँ/शैली शामिल.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c6_hin_ch01'],
    nodeIds: ['c6_hin_cbse_01_001', 'c6_hin_cbse_01_002', 'c6_hin_cbse_01_003', 'c6_hin_cbse_01_004', 'c6_hin_cbse_01_005', 'c6_hin_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'मान लो तुम्हें एक नए दोस्त के बारे में समझना है — तुम सबसे पहले उसका नाम, उसके परिवार, उसके शौक, और वह कहाँ.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी पाठ के लेखक का जीवन परिचय, उनकी लेखन शैली, रचनाकाल की सामाजिक-सांस्कृतिक परिस्थितियाँ, और उन प्रेरणाओं को जानना जिनसे वह रचना उत्पन्न हुई।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 1/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के.', answer: '1 -', options: ['1 -', '1 -'] },
            { id: 's2', label: '1 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक.', answer: '1 -', options: ['1 -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी पाठ के लेखक का जीवन परिचय, उनकी.',
          hint: 'अगर अटका हुआ लगे, तो \'लेखक भी एक साधारण मनुष्य है\' — इस सरल तथ्य पर लौटें और अपने किसी.',
          misconception: 'छात्र समझते हैं कि \'रचनाकार परिचय\' का मतलब केवल लेखक का नाम, जन्मतिथि, मृत्यु तिथि, और प्रसिद्ध पुस्तकों की सूची रटना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें हम कहानी के प्रमुख पात्र'],
                  hint: 'अगर अटका हुआ लगे, तो \'लेखक भी एक साधारण मनुष्य है\' — इस सरल तथ्य पर लौटें और अपने किसी प्रिय लेखक.',
                  misconception: 'छात्र समझते हैं कि \'रचनाकार परिचय\' का मतलब केवल लेखक का नाम, जन्मतिथि, मृत्यु तिथि, और प्रसिद्ध पुस्तकों की सूची रटना है। वे यह नहीं देख.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पूछो — "अगर तुम कोई कहानी लिखोगे, तो अपने जीवन की कौन-सी बात उसमें डालोगे?" इससे वह लेखक-जीवन-लेखन का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो.',
          hint: 'अगर अटका हुआ महसूस हो तो: **"कहानी के तीन भाग (आरंभ, मध्य, अंत)"** की कक्षा 4-5 की.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'उत्थान\' (rising action) को \'कई घटनाएँ घटना\' (many things happening) समझ लेते हैं** — वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के',
                  options: ['कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें हम कहानी के प्रमुख पात्र'],
                  hint: 'अगर अटका हुआ महसूस हो तो: **"कहानी के तीन भाग (आरंभ, मध्य, अंत)"** की कक्षा 4-5 की अवधारणा दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'उत्थान\' (rising action) को \'कई घटनाएँ घटना\' (many things happening) समझ लेते हैं** — वे गिनते हैं: "पहले यह हुआ.' }
          ],
            remediations: { 'rising-action-many-things-happening': { steps: ['**दृश्य सहारा (Visual Anchor):** छात्र के सामने **Freytag\'s Pyramid का सरल चित्र** बनाओ — पाँच बिंदु चिह्नित करो.', '**हाथ से गतिविधि (Hands-on):** एक परिचित कहानी (जैसे \'लालची कुत्ता\') के **घटना-कार्ड (event cards)** बनाओ — प्रत्येक.', '**मौखिक जाँच (Oral Check):** हर तीर पर पूछो: *"यह घटना पिछली घटना का **परिणाम** क्यों है?', 'अगर पिछली न होती, तो क्या यह होती?"* — जब तक छात्र प्रत्येक कड़ी के लिए कारण न बता दे, आगे न बढ़ो। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक.',
          hint: 'यदि अटकें तो "कथानक और आख्यान-संरचना" (नोड 002) के \'आरंभ/उत्प्रेरक घटना\' भाग को दोबारा.',
          misconception: 'छात्र समझते हैं कि परिवेश का वर्णन केवल **सजावट** (decoration) के लिए होता है — "लेखक ने सुंदर दृश्य लिखा ताकि कहानी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें हम कहानी के प्रमुख पात्र'],
                  hint: 'यदि अटकें तो "कथानक और आख्यान-संरचना" (नोड 002) के \'आरंभ/उत्प्रेरक घटना\' भाग को दोबारा देखें.',
                  misconception: 'छात्र समझते हैं कि परिवेश का वर्णन केवल **सजावट** (decoration) के लिए होता है — "लेखक ने सुंदर दृश्य लिखा ताकि कहानी अच्छी लगे।" वे नहीं.' }
          ],
            remediations: { 'decoration-cause': { steps: ['**दृश्य-श्रव्य व्यायाम:** छात्र को आँखें बंद करवा कर कक्षा का वर्तमान वातावरण 30 सेकंड सुनने/सूँघने/स्पर्श करने को.', '**बिंब-शल्यक्रिया:** किसी परिचित अंश से 3 बिंब निकालें और पूछें: "अगर यह बिंब हटा दें तो पात्र का निर्णय कैसे बदलेगा?".', '**तुलना-चार्ट:** दो विपरीत परिवेश (जैसे अस्पताल का वार्ड vs मेले का झूला) साथ रखकर पूछें: "एक ही पात्र यहाँ कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें हम कहानी के प्रमुख.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'पाठ्य-परिवेश और वातावरण\' (नोड 003)** दोहराएँ — विशेषकर.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि पात्र-चित्रण = **विशेषणों की सूची** (जैसे: "नायक बहादुर, ईमानदार, दयालु, बुद्धिमान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें हम कहानी के प्रमुख पात्र',
                  options: ['पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें हम कहानी के प्रमुख पात्र', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'पाठ्य-परिवेश और वातावरण\' (नोड 003)** दोहराएँ — विशेषकर \'परिवेश → पात्र\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि पात्र-चित्रण = **विशेषणों की सूची** (जैसे: "नायक बहादुर, ईमानदार, दयालु, बुद्धिमान है")। **गलत तर्क:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग (2 मिनट):** एक परिचित पात्र (जैसे: \'तारक मेहता\' के जेठालाल) का २-मिनट का मौखिक चित्रण करो — **केवल प्रमाण.', '**संयुक्त अभ्यास (5 मिनट):** छात्र से कहो, "अपनी माँ/पिता का एक गुण बताओ और **एक घटना** सुनाओ जो उसे सिद्ध करे।" शिक्षक.', '**स्वतंत्र प्रयास (10 मिनट):** पाठ्यपुस्तक के किसी पात्र पर यही प्रक्रिया दोहराने को कहो — पहले **एक गुण + एक प्रमाण**.', '**फीडबैक लूप:** हर प्रयास के बाद पूछो, "यहाँ प्रमाण कहाँ है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_005', difficulty: 'standard',
          question: 'सहायक पात्र वे चरित्र होते हैं जो प्रमुख पात्र (नायक) के साथ रहकर कथानक को आगे.',
          hint: 'यदि अटके तो c6_hin_cbse_01_004 (पात्र-चित्रण: नायक/प्रमुख पात्र) के \'चरित्र-चित्रण के 5.',
          misconception: 'छात्र समझते हैं कि \'सहायक पात्र = नायक का दोस्त/सेवक/भाई\' — यानी रिश्ते के नाम से भूमिका तय करते हैं। असल में भूमिका.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे चरित्र होते हैं जो प्रमुख पात्र (नायक) के साथ रहकर कथानक को आगे बढ़ाते',
                  options: ['सहायक पात्र वे चरित्र होते हैं जो प्रमुख पात्र (नायक) के साथ रहकर कथानक को आगे बढ़ाते', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटके तो c6_hin_cbse_01_004 (पात्र-चित्रण: नायक/प्रमुख पात्र) के \'चरित्र-चित्रण के 5 आधार\'.',
                  misconception: 'छात्र समझते हैं कि \'सहायक पात्र = नायक का दोस्त/सेवक/भाई\' — यानी रिश्ते के नाम से भूमिका तय करते हैं। असल में भूमिका \'कथानक में कार्य\' से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "पात्र का नाम और रिश्ता भूल जाओ। केवल यह देखो: इसके आने से नायक क्या करता/सोचता/महसूस करता है जो इसके.', 'एक ही कहानी के दो दृश्य दिखाओ: एक जहाँ सहायक पात्र नायक को डाँटता है, दूसरा जहाँ साथ देता है — पूछो: "दोनों में नायक.', 'छात्र से कहानी का एक दृश्य फिर से लिखने को कहो जहाँ सहायक पात्र न हो — फिर दोनों की तुलना करवाओ। 4.', 'अंत में नियम दोहराओ: "सहायक पात्र = नायक का दर्पण। दर्पण कैसा भी हो (टेढ़ा, साफ, टूटा), काम वही — चेहरा दिखाना।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_006', difficulty: 'standard',
          question: 'The **मुख्य विषय (main theme)** is the central topic or idea that the text.',
          hint: 'If stuck, review "कथानक और आख्यान-संरचना" (c6_hin_cbse_01_002) to practice identifying.',
          misconception: 'विद्यार्थी अक्सर **\'मुख्य विषय\' को \'कथानक का सारांश\' (plot summary) मान लेते हैं** और **\'संदेश\' को \'कोई भी अच्छी सीख\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The **मुख्य विषय (main theme)** is the central topic or idea that the text revolves',
                  options: ['The **मुख्य विषय (main theme)** is the central topic or idea that the text revolves', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'If stuck, review "कथानक और आख्यान-संरचना" (c6_hin_cbse_01_002) to practice identifying the chain.',
                  misconception: 'विद्यार्थी अक्सर **\'मुख्य विषय\' को \'कथानक का सारांश\' (plot summary) मान लेते हैं** और **\'संदेश\' को \'कोई भी अच्छी सीख\' (generic moral) मान.' }
          ],
            remediations: { 'plot-summary-generic-moral': { steps: ['**पहचान कराएँ:** विद्यार्थी से कहें — "कहानी की 3 मुख्य घटनाएँ लिखो। अब बताओ: इन सबमें कौन-सी एक बात कॉमन है?', '**साक्ष्य माँगें:** "जो संदेश तुमने लिखा, उसके लिए कहानी से दो उदाहरण दो जहाँ वह सिद्ध होता हो।" यदि उदाहरण न दे पाए.', '**तुलना कराएँ:** दो कहानियाँ दें जिनका विषय एक जैसा लगे (जैसे \'मेहनत\') लेकिन संदेश अलग हो। उनसे अंतर स्पष्ट करने को.', '**अभ्यास दें:** रोज़ एक छोटा अनुच्छेद दें और केवल विषय/संदेश पहचानने का अभ्यास कराएँ — पूरा उत्तर लिखने का नहीं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
