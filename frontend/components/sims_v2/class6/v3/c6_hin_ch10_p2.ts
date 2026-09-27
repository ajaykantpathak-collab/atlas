import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch10_p2: SimDef = {
    id: 'v3_c6_hin_ch10_p2',
    title: 'पाठ 10 · Part 2/3',
    subtitle: 'यह नोड केवल \'गौण विषय\' की पहचान, मुख्य विषय से उसका संबंध, और पाठ-आधारित प्रमाण से उसकी.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 10 · Part 2/3',
    chapters: ['c6_hin_ch10'],
    nodeIds: ['c6_hin_cbse_10_007', 'c6_hin_cbse_10_008', 'c6_hin_cbse_10_009', 'c6_hin_cbse_10_010', 'c6_hin_cbse_10_011', 'c6_hin_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो तुमने एक फिल्म देखी जहाँ हीरो अपने गाँव को बचाने के लिए लड़ता है (मुख्य विषय)। लेकिन साथ-साथ उसकी.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — गौण विषय', text: 'गौण विषय (Sub-theme) कहानी या कविता में वह सहायक विचार या प्रसंग है जो मुख्य विषय के साथ समानांतर चलता है, उसे सहारा देता है, उसके अर्थ को विस्तार देता है, लेकिन स्वयं स्वतंत्र रूप से कथा का केंद्रीय.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — गौण', 'पाठ 10 — साहित्यिक', 'पाठ 10 — पदावली', 'पाठ 10 — व्याकरण', 'पाठ 10 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 2/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा वाक्य-रचना, सर्वनाम, विशेषण, क्रिया-काल और.', answer: '10 -', options: ['10 -', '10 - -'] },
            { id: 's2', label: '10 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है और.', answer: '10 - -', options: ['10 - -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 10 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 10 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 10 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कहानी या कविता में वह सहायक विचार या प्रसंग है जो मुख्य.',
          hint: 'अगर अटके तो \'मुख्य विषय और संदेश\' (c6_hin_cbse_10_006) के \'कार्येड उदाहरण\' दोबारा देखो.',
          misconception: 'छात्र अक्सर \'गौण विषय\' को \'कम महत्वपूर्ण विषय\' या \'साइड स्टोरी\' समझते हैं जो कहानी से हटाया जा सके। वास्तव में गौण विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कहानी या कविता में वह सहायक विचार या प्रसंग है जो मुख्य विषय के साथ',
                  options: ['गौण विषय (Sub-theme) कहानी या कविता में वह सहायक विचार या प्रसंग है जो मुख्य विषय के साथ', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'अगर अटके तो \'मुख्य विषय और संदेश\' (c6_hin_cbse_10_006) के \'कार्येड उदाहरण\' दोबारा देखो — मुख्य विषय.',
                  misconception: 'छात्र अक्सर \'गौण विषय\' को \'कम महत्वपूर्ण विषय\' या \'साइड स्टोरी\' समझते हैं जो कहानी से हटाया जा सके। वास्तव में गौण विषय कथा की \'संरचनात्मक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को \'गौण\' शब्द का दैनिक अर्थ (द्वितीयक) और साहित्यिक अर्थ (सहायक/पूरक) लिखवाओ, अंतर स्पष्ट करो। चरण 2: एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की.',
          hint: 'यदि छात्र अटका हो तो उसे **उपमा और रूपक के भेद** (उपमान सूचक शब्द की उपस्थिति/अनुपस्थिति).',
          misconception: 'छात्र अक्सर समझते हैं कि **हर तुलना रूपक होती है** और **हर सुंदर वर्णन बिंब होता है**। विशेष रूप से: (1) वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की इंद्रियों',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की इंद्रियों', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि छात्र अटका हो तो उसे **उपमा और रूपक के भेद** (उपमान सूचक शब्द की उपस्थिति/अनुपस्थिति) पर दोबारा.',
                  misconception: 'छात्र अक्सर समझते हैं कि **हर तुलना रूपक होती है** और **हर सुंदर वर्णन बिंब होता है**। विशेष रूप से: (1) वे \'जैसे/वैसे/सी/तुल्य\' वाले.' }
          ],
            remediations: { '1': { steps: ['**चरण 1:** छात्र को 5 कार्ड दें जिन पर 5 इंद्रियों के चिह्न हों (आँख, कान, नाक, हाथ, जीभ)। उसे 10 वाक्य दें (मिश्रित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_009', difficulty: 'standard',
          question: '**विरोधाभास** एक साहित्यिक युक्ति है जहाँ कथन पहली नज़र में स्वयं का खंडन करता.',
          hint: 'यदि अटका लगे तो c6_hin_cbse_10_008 के "बिंब पहचान अभ्यास" और "रूपक विश्लेषण चरण" दोहराएँ।',
          misconception: 'छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति** (situational irony) या साधारण **विरोधी शब्दों** (ऑक्सीमोरॉन) से मिला.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** एक साहित्यिक युक्ति है जहाँ कथन पहली नज़र में स्वयं का खंडन करता प्रतीत',
                  options: ['**विरोधाभास** एक साहित्यिक युक्ति है जहाँ कथन पहली नज़र में स्वयं का खंडन करता प्रतीत', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि अटका लगे तो c6_hin_cbse_10_008 के "बिंब पहचान अभ्यास" और "रूपक विश्लेषण चरण" दोहराएँ।',
                  misconception: 'छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति** (situational irony) या साधारण **विरोधी शब्दों** (ऑक्सीमोरॉन) से मिला देते हैं। उदाहरण.' }
          ],
            remediations: { 'situational-irony': { steps: ['**विरोधाभास हेतु:** छात्र को तीन वाक्य दो — एक साधारण विरोधी शब्द युग्म (ऑक्सीमोरॉन), एक स्थितिजन्य विडंबना, एक.', '**प्रतीक हेतु:** पाठ से कोई एक वस्तु (जैसे नदी, दरवाज़ा, चिट्ठी) चुनो। दो कॉलम बनवाओ: "दिखता क्या है?" / "कहानी में.', 'दोनों युक्तियों को जोड़ने के लिए: "क्या कोई प्रतीक विरोधाभास भी रच रहा है?" — ऐसा संयुक्त प्रश्न देकर चिंतन गहरा करो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत **मुख्य शब्द** वे महत्वपूर्ण शब्द होते हैं जो किसी पाठ.',
          hint: 'यदि अटके तो **c6_hin_cbse_10_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें और "विषय→मुख्य.',
          misconception: 'छात्र **बार-बार आने वाले शब्द** (frequency) को ही मुख्य शब्द मान लेते हैं, भले ही वह शब्द केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत **मुख्य शब्द** वे महत्वपूर्ण शब्द होते हैं जो किसी पाठ (कहानी, कविता,',
                  options: ['पदावली के अंतर्गत **मुख्य शब्द** वे महत्वपूर्ण शब्द होते हैं जो किसी पाठ (कहानी, कविता,', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि अटके तो **c6_hin_cbse_10_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें और "विषय→मुख्य शब्द" मैपिंग.',
                  misconception: 'छात्र **बार-बार आने वाले शब्द** (frequency) को ही मुख्य शब्द मान लेते हैं, भले ही वह शब्द केवल **संयोजक/सर्वनाम/क्रिया** हो (जैसे: "और".' }
          ],
            remediations: { 'frequency': { steps: ['**दृश्य सहायता:** छात्र को एक छोटा पैराग्राफ दो और कहो: "हर **संज्ञा** को घेरे में लो, हर **भाव-सूचक शब्द** (जो मन की.', '**तुलना तालिका:** बोर्ड पर दो कॉलम बनाओ — "बार-बार आए शब्द" vs "अर्थ बदलने वाले शब्द" — और छात्र से 3-3 उदाहरण भरवाओ। 3.', '**हटाओ-जाँचो खेल:** एक वाक्य से एक-एक शब्द हटाओ और पूछो: "अब वाक्य का **मर्म** बचा?" — जिस शब्द के हटने से मर्म जाए.', '**अमूर्त शब्द बैंक:** कक्षा में "भाव-सूचक शब्दों" की दीवार बनाओ (साहस, करुणा, संघर्ष, आशा, बलिदान…) ताकि छात्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा वाक्य-रचना, सर्वनाम, विशेषण.',
          hint: 'अगर अटके तो कक्षा 5 की व्याकरण पुस्तक के \'सर्वनाम और उसके भेद\', \'विशेषण और उसके भेद\'.',
          misconception: 'छात्र समझते हैं कि सर्वनाम केवल \'संज्ञा के बदले आने वाला शब्द\' है — इसलिए वे \'वह\', \'यह\', \'कौन\', \'अपना\' सबको एक ही.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा वाक्य-रचना, सर्वनाम, विशेषण, क्रिया-काल और',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा वाक्य-रचना, सर्वनाम, विशेषण, क्रिया-काल और', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'अगर अटके तो कक्षा 5 की व्याकरण पुस्तक के \'सर्वनाम और उसके भेद\', \'विशेषण और उसके भेद\', \'क्रिया और.',
                  misconception: 'छात्र समझते हैं कि सर्वनाम केवल \'संज्ञा के बदले आने वाला शब्द\' है — इसलिए वे \'वह\', \'यह\', \'कौन\', \'अपना\' सबको एक ही डिब्बे में डाल देते हैं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — \'अपनी स्कूल की डायरी खोलो, कल का पेज पढ़ो और हर सर्वनाम को घेरो। फिर बताओ: कौन-सा सर्वनाम किसके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता.',
          hint: 'If stuck, review **c6_hin_cbse_10_002 (कथानक और आख्यान-संरचना)** to re-establish the.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का उत्तर भी पाठ में कहीं न कहीं छिपा होता है, बस ढूंढना पड़ता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है और',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है और', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'If stuck, review **c6_hin_cbse_10_002 (कथानक और आख्यान-संरचना)** to re-establish the event.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का उत्तर भी पाठ में कहीं न कहीं छिपा होता है, बस ढूंढना पड़ता है।\'** वे "क्यों".' }
          ],
            remediations: { 'wrong-idea': { steps: ['**स्पष्ट अंतर दिखाएं:** दो छोटे कार्ड बनाएं — एक पर "पाठ में लिखा है" (हरा), दूसरे पर "पाठ से समझना है" (नीला)। 5-5.', '**\'सुराग़ ढूंढो\' खेल:** एक वाक्य दें ("रोहन ने मिठाई देखी पर नहीं खाई")। पूछें: "क्या लिखा है?" (तथ्य) बनाम "क्यों नहीं.', '**उत्तर संरचना सिखाएं:** आशय-सूचक उत्तर के लिए टेम्पलेट दें: "पाठ में लिखा है [साक्ष्य]। इससे पता चलता है कि.', '**अभ्यास:** प्रतिदिन एक छोटा अनुच्छेद पढ़कर 1 वस्तुनिष्ठ + 1 आशय-सूचक प्रश्न बनवाएं और उत्तर दिलवाएं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
