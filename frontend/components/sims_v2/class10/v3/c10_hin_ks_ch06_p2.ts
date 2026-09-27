import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch06_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch06_p2',
    title: 'पाठ 6 · Part 2/3',
    subtitle: 'यह नोड केवल **प्रतीक** और **बिंब** की परिभाषा, प्रकार, पहचान विधि, और काव्य में उनके.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 6 · Part 2/3',
    chapters: ['c10_hin_ks_ch06'],
    nodeIds: ['c10_hin_ks_cbse_06_007', 'c10_hin_ks_cbse_06_008', 'c10_hin_ks_cbse_06_009', 'c10_hin_ks_cbse_06_010', 'c10_hin_ks_cbse_06_011', 'c10_hin_ks_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'आपने कभी गौर किया है कि परीक्षा हॉल में घड़ी की टिक-टिक अचानक बहुत तेज़ सुनाई देने लगती है?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**प्रतीक (Symbol)** एक साहित्यिक युक्ति है जिसमें कोई ठोस वस्तु, व्यक्ति, क्रिया या स्थिति किसी अमूर्त विचार, भावना या अवधारणा का प्रतिनिधित्व करती है। **बिंब (Imagery)** वह शब्द-चित्रण है जो पाँचों.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — साहित्यिक', 'पाठ 6 — मुख्य', 'पाठ 6 — गौण', 'पाठ 6 — पदावली', 'पाठ 6 — व्याकरण', 'पाठ 6 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 2/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — पद्य में भाषा-प्रयोग वह तरीका है जिसमें कवि छंद, लय और भावानुकूलता के अनुसार मानक व्याकरण.', answer: '6 -', options: ['6 -', '6 - -'] },
            { id: 's2', label: '6 - -', prompt: 'Which idea is this? — बोध-प्रश्न वे प्रश्न होते हैं जो पाठ या कविता की समझ को मापते हैं; वस्तुनिष्ठ प्रश्नों.', answer: '6 - -', options: ['6 - -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_007', difficulty: 'standard',
          question: '**प्रतीक (Symbol)** एक साहित्यिक युक्ति है जिसमें कोई ठोस वस्तु, व्यक्ति.',
          hint: 'यदि अटका हुआ महसूस हो तो नोड 006 के "रूपक बनाम प्रतीक" तुलना चार्ट और नोड 003 के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"हर रूपक प्रतीक है और हर बिंब अलंकार है।"** **गलत तर्क:** वे "रूपक = तुलना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**प्रतीक (Symbol)** एक साहित्यिक युक्ति है जिसमें कोई ठोस वस्तु, व्यक्ति, क्रिया या',
                  options: ['**प्रतीक (Symbol)** एक साहित्यिक युक्ति है जिसमें कोई ठोस वस्तु, व्यक्ति, क्रिया या', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन की प्रमुख घटनाएँ, शैक्षिक और सांस्कृतिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक बंद (stanza) के शब्दों, प्रसंग और भाव को', 'काव्य-संरचना कविता के बाह्य रूप-विधान को कहते हैं'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड 006 के "रूपक बनाम प्रतीक" तुलना चार्ट और नोड 003 के "पुनरावृत्ति स्थल".',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"हर रूपक प्रतीक है और हर बिंब अलंकार है।"** **गलत तर्क:** वे "रूपक = तुलना = प्रतीक" और "बिंब.' }
          ],
            remediations: { '006': { steps: ['**चरण 1:** छात्र से कहें: "एक कविता चुनो जहाँ कोई वस्तु 3+ बार आए। हर बार उसके आसपास के शब्द लिखो। पूछो: अर्थ बदल रहा.', '**चरण 2:** पाँच इंद्रियों के कॉलम बनवाएँ। एक काव्यांश से शब्द छाँटकर सही कॉलम में रखवाएँ — **बिंब-प्रकार** स्पष्ट.', '**चरण 3:** एक ही वस्तु (जैसे "दीया") पर दो पंक्तियाँ लिखवाएँ: पहली में केवल बिंब ("टिमटिमाता दीया"), दूसरी में प्रतीक.', '**चरण 4:** बोर्ड के गत वर्षों के 3 अंकों वाले "प्रतीक/बिंब समझाइए" प्रश्नों के उत्तर दिखाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_008', difficulty: 'standard',
          question: 'मुख्य भाव वह मूल भावना है जिस पर कविता आधारित होती है, और संदेश वह विचार या.',
          hint: 'यदि भाव पहचान में कठिनाई हो तो पहले पद्यांश-वार भावार्थ (c10_hin_ks_cbse_06_002) की 복습.',
          misconception: 'छात्र अक्सर मुख्य भाव को कविता के विषय या घटना से समान मान लेते हैं, उदाहरण के लिए यदि कविता "नदी" का वर्णन करती है तो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव वह मूल भावना है जिस पर कविता आधारित होती है, और संदेश वह विचार या शिक्षा है जो',
                  options: ['मुख्य भाव वह मूल भावना है जिस पर कविता आधारित होती है, और संदेश वह विचार या शिक्षा है जो', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन की प्रमुख घटनाएँ, शैक्षिक और सांस्कृतिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक बंद (stanza) के शब्दों, प्रसंग और भाव को', 'काव्य-संरचना कविता के बाह्य रूप-विधान को कहते हैं'],
                  hint: 'यदि भाव पहचान में कठिनाई हो तो पहले पद्यांश-वार भावार्थ (c10_hin_ks_cbse_06_002) की 복습 करें और.',
                  misconception: 'छात्र अक्सर मुख्य भाव को कविता के विषय या घटना से समान मान लेते हैं, उदाहरण के लिए यदि कविता "नदी" का वर्णन करती है तो वे लिखते हैं कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताइए कि पहले कविता के संज्ञा (noun) शब्दों को चिह्नित करें, फिर पूछें कि इन शब्दों से कवि कैसा महसूस कर रहा.', 'फिर इन भावनाओं की तुलना करके सामान्य भाव खोजें और अंत में उस भाव से जुड़े विचार को संदेश के रूप में लिखें। इस प्रक्रिया.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_009', difficulty: 'standard',
          question: 'गौण भाव वहsecondary emotion है जो कविता के मुख्य भाव को समर्थन, विरोध या.',
          hint: 'यदि मुख्य भाव पहचानने में कठिनाई हो तो नोड c10_hin_ks_cbse_06_008 (मुख्य भाव और संदेश) की.',
          misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव का ही एक हिस्सा मान लेते हैं और सोचते हैं कि यदि कोई भाव कविता में आ रहा है तो वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव वहsecondary emotion है जो कविता के मुख्य भाव को समर्थन, विरोध या सूक्ष्मता प्रदान',
                  options: ['गौण भाव वहsecondary emotion है जो कविता के मुख्य भाव को समर्थन, विरोध या सूक्ष्मता प्रदान', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन की प्रमुख घटनाएँ, शैक्षिक और सांस्कृतिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक बंद (stanza) के शब्दों, प्रसंग और भाव को', 'काव्य-संरचना कविता के बाह्य रूप-विधान को कहते हैं'],
                  hint: 'यदि मुख्य भाव पहचानने में कठिनाई हो तो नोड c10_hin_ks_cbse_06_008 (मुख्य भाव और संदेश) की मुख्य भाव.',
                  misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव का ही एक हिस्सा मान लेते हैं और सोचते हैं कि यदि कोई भाव कविता में आ रहा है तो वह मुख्य भाव ही होना चाहिए।.' }
          ],
            remediations: { 'ile': { steps: ['सबसे पहले छात्र से मुख्य भाव की पहचान करने के लिए उपयोग की जाने वाली विधि (नोड 008 से) को दोहराएं: कविता पढ़कर बार-बार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_010', difficulty: 'standard',
          question: 'कठिन शब्द वे शब्द हैं जिनका अर्थ प्रसंग और सांस्कृतिक पृष्ठभूमि जाने बिना समझना.',
          hint: 'If stuck, review "पद्यांश-वार भावार्थ" (c10_hin_ks_cbse_06_002) to see how each line\'s.',
          misconception: 'Students treat every difficult word as a "dictionary lookup" task and every idiom as a "fixed phrase to memorize".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कठिन शब्द वे शब्द हैं जिनका अर्थ प्रसंग और सांस्कृतिक पृष्ठभूमि जाने बिना समझना कठिन होता',
                  options: ['कठिन शब्द वे शब्द हैं जिनका अर्थ प्रसंग और सांस्कृतिक पृष्ठभूमि जाने बिना समझना कठिन होता', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन की प्रमुख घटनाएँ, शैक्षिक और सांस्कृतिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक बंद (stanza) के शब्दों, प्रसंग और भाव को', 'काव्य-संरचना कविता के बाह्य रूप-विधान को कहते हैं'],
                  hint: 'If stuck, review "पद्यांश-वार भावार्थ" (c10_hin_ks_cbse_06_002) to see how each line\'s meaning was.',
                  misconception: 'Students treat every difficult word as a "dictionary lookup" task and every idiom as a "fixed phrase to memorize".' }
          ],
            remediations: { 'students-treat-every-difficult-word': { steps: ['Pick ONE difficult word from the poem (e.g., "बृजभूषण") and ask the student to tell the *story* behind it in 2.', 'Take ONE idiom (e.g., "आँखों का तारा"), have them draw a quick sketch of the literal meaning (eyes with stars) and the.', 'Repeat for 3 words/idioms daily until they auto-connect word → image → context → emotion.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग वह तरीका है जिसमें कवि छंद, लय और भावानुकूलता के अनुसार.',
          hint: 'यदि कठिनाई हो तो छंद और लय‑विधान (Node c10_hin_ks_cbse_06_005) की मात्राएँ और तुक‑बन्धन.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि पद्य में वाक्य के शब्द‑क्रम या विशेष प्रयोग मानक व्याकरण के विपरीत है तो यह अनिवार्य रूप.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग वह तरीका है जिसमें कवि छंद, लय और भावानुकूलता के अनुसार मानक व्याकरण',
                  options: ['पद्य में भाषा-प्रयोग वह तरीका है जिसमें कवि छंद, लय और भावानुकूलता के अनुसार मानक व्याकरण', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन की प्रमुख घटनाएँ, शैक्षिक और सांस्कृतिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक बंद (stanza) के शब्दों, प्रसंग और भाव को', 'काव्य-संरचना कविता के बाह्य रूप-विधान को कहते हैं'],
                  hint: 'यदि कठिनाई हो तो छंद और लय‑विधान (Node c10_hin_ks_cbse_06_005) की मात्राएँ और तुक‑बन्धन की समीक्षा.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि पद्य में वाक्य के शब्द‑क्रम या विशेष प्रयोग मानक व्याकरण के विपरीत है तो यह अनिवार्य रूप से भाषा की गलती है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को स्पष्ट करने के लिए, सबसे पहले दो वाक्य प्रस्तुत करें: मानक वाक्य "राम वन गया" और काव्यात्मक वाक्य "गया राम वन.', 'फिर पूछें: "क्या अर्थ बदल गया?" जब वे कहेंगे कि नहीं, तो स्पष्ट करें कि अर्थ समान रहने पर परिवर्तन केवल शैलीगत या लय‑गत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_012', difficulty: 'standard',
          question: 'बोध-प्रश्न वे प्रश्न होते हैं जो पाठ या कविता की समझ को मापते हैं; वस्तुनिष्ठ.',
          hint: 'If stuck, review node c10_hin_ks_cbse_06_008 (मुख्य भाव और संदेश) and.',
          misconception: 'छात्र अक्सर सोचते हैं कि आशय-सूचक प्रश्नों में केवल अपनी व्यक्तिगत राय लिखना पर्याप्त होता है और पाठ से साक्ष्य देने की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न वे प्रश्न होते हैं जो पाठ या कविता की समझ को मापते हैं',
                  options: ['बोध-प्रश्न वे प्रश्न होते हैं जो पाठ या कविता की समझ को मापते हैं', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन की प्रमुख घटनाएँ, शैक्षिक और सांस्कृतिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक बंद (stanza) के शब्दों, प्रसंग और भाव को', 'काव्य-संरचना कविता के बाह्य रूप-विधान को कहते हैं'],
                  hint: 'If stuck, review node c10_hin_ks_cbse_06_008 (मुख्य भाव और संदेश) and c10_hin_ks_cbse_06_002.',
                  misconception: 'छात्र अक्सर सोचते हैं कि आशय-सूचक प्रश्नों में केवल अपनी व्यक्तिगत राय लिखना पर्याप्त होता है और पाठ से साक्ष्य देने की आवश्यकता नहीं है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को यह दिखाइए कि प्रश्न के मुख्य शब्द (जैसे ‘क्यों’, ‘कैसे’) कोunderline करके पूछे गए तर्क की पहचान कीजिए; फिर पाठ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
