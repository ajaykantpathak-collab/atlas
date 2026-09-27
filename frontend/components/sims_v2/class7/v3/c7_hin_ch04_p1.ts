import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch04_p1: SimDef = {
    id: 'v3_c7_hin_ch04_p1',
    title: 'पाठ 4 · Part 1/3',
    subtitle: 'यह नोड रचनाकार के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ और उनके लेखन पर पड़ने वाले प्रभाव को.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 4 · Part 1/3',
    chapters: ['c7_hin_ch04'],
    nodeIds: ['c7_hin_cbse_04_001', 'c7_hin_cbse_04_002', 'c7_hin_cbse_04_003', 'c7_hin_cbse_04_004', 'c7_hin_cbse_04_005', 'c7_hin_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना कीजिए कि आपकी कक्षा में एक नया विद्यार्थी आया है और आप उससे दोस्ती करना चाहते हैं—सबसे पहले आप उसका.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना जिसने पाठ लिखी है, ताकि हम उसकी कहानी के गहरे अर्थ को समझ सकें।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — पृष्ठभूमि', 'पाठ 4 — कथानक', 'पाठ 4 — पाठ्य-परिवेश', 'पाठ 4 — पात्र-चित्रण', 'पाठ 4 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 1/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect.', answer: '4 -', options: ['4 -', '4 -'] },
            { id: 's2', label: '4 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और.', answer: '4 -', options: ['4 -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को.',
          hint: 'यदि फंसे तो कक्षा 6 के पाठ 1 के पृष्ठभूमि और रचनाकार परिचय (c6_hin_cbse_01_001) की दोबारा.',
          misconception: 'छात्र अक्सर सोचते हैं कि रचनाकार परिचय केवल लेखक का नाम, जन्म तिथि और कुछ पुरस्कार याद रखने की बात है, और वे इस जानकारी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और', 'पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि फंसे तो कक्षा 6 के पाठ 1 के पृष्ठभूमि और रचनाकार परिचय (c6_hin_cbse_01_001) की दोबारा समीक्षा.',
                  misconception: 'छात्र अक्सर सोचते हैं कि रचनाकार परिचय केवल लेखक का नाम, जन्म तिथि और कुछ पुरस्कार याद रखने की बात है, और वे इस जानकारी को पाठ के विश्लेषण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक परिचित कहानी (जैसे "पंचम अनुभव") लें और पूछिए: "आप सोचते हैं कि इस कहानी के पात्र इतना क्यों.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_002', difficulty: 'standard',
          question: 'कथानक (Plot) is the logical sequence of events in a story arranged.',
          hint: 'If stuck, review Class 6 "कथानक और आख्यान-संरचना" (c6_hin_cbse_01_002) — specifically the.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "कथानक के चरण (आरंभ, उत्कर्ष, चरम...)" कहानी में **बराबर लंबाई** के होते हैं या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect',
                  options: ['कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और', 'पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के'],
                  hint: 'If stuck, review Class 6 "कथानक और आख्यान-संरचना" (c6_hin_cbse_01_002) — specifically the.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "कथानक के चरण (आरंभ, उत्कर्ष, चरम...)" कहानी में **बराबर लंबाई** के होते हैं या **हर कहानी में सभी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण-अतिव्यापन (Overlap) दिखाएँ:** एक वाक्य लें — "वह दरवाज़े तक पहुँचा, दिल धड़का, धक्का दिया, दरवाज़ा खुला।" पूछें.', '**रंग-कोडिंग करवाएँ:** कहानी का प्रिंटआउट दें। पाँच रंगों से चिह्नित करने को कहें — भले ही एक पंक्ति में दो रंग आएँ। 3.', '**प्रश्न पूछें:** "अगर लेखक ने चरम को दो पन्ने खींचा होता तो क्या प्रभाव पड़ता?" — इससे चरण की *कार्यात्मक परिभाषा*.', '**Class 6 की कहानी से तुलना करवाएँ:** "वह चिड़िया जो" और वर्तमान पाठ के चरणों की लंबाई 비교 करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक.',
          hint: 'यदि अटक जाएँ तो कक्षा 6 के "पाठ्य-परिवेश और वातावरण" नोड्स (c6_hin_cbse_01_003 आदि).',
          misconception: 'छात्र अक्सर समझते हैं कि "परिवेश = स्थान" (जहाँ कहानी होती है) और "वातावरण = मौसम" (बारिश, धूप, ठंड)। यह गलती इसलिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि अटक जाएँ तो कक्षा 6 के "पाठ्य-परिवेश और वातावरण" नोड्स (c6_hin_cbse_01_003 आदि) दोहराएँ और एक.',
                  misconception: 'छात्र अक्सर समझते हैं कि "परिवेश = स्थान" (जहाँ कहानी होती है) और "वातावरण = मौसम" (बारिश, धूप, ठंड)। यह गलती इसलिए होती है क्योंकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक परिचित दृश्य (अपना कक्षा-कक्ष, स्कूल प्रांगण, घर का बरामदा) चुनने को कहो। 2.', 'उससे कहो: "इस स्थान के पाँच ब्यौरे लिखो जो केवल तुम्हारी इंद्रियाँ पकड़ सकती हैं — गंध, ध्वनि, स्पर्श, दृश्य, स्वाद।" 3.', 'फिर पूछो: "अगर यही स्थान रात 12 बजे हो, या बरसात में, या परीक्षा के दिन, या त्योहार के दिन — तो ये ब्यौरे कैसे बदलेंगे.', 'अंत में समझाओ: "यही परिवेश के तत्व हैं (स्थान+काल+सामाजिक अवसर) और यही वातावरण है (तुम्हारी बदली मनोदशा)। अब पाठ के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के.',
          hint: 'यदि अटके तो **कक्षा 6 के पाठ 4 (c6_hin_cbse_04_004) का पात्र-चित्रण अभ्यास** दोहराएँ.',
          misconception: '**सबसे आम भ्रम:** "पात्र-चित्रण = पात्र का **बायोडाटा (biodata)** लिखना — नाम, उम्र, रंग-रूप, परिवार, शौक।" **क्यों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के',
                  options: ['पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटके तो **कक्षा 6 के पाठ 4 (c6_hin_cbse_04_004) का पात्र-चित्रण अभ्यास** दोहराएँ — वहाँ PEEL.',
                  misconception: '**सबसे आम भ्रम:** "पात्र-चित्रण = पात्र का **बायोडाटा (biodata)** लिखना — नाम, उम्र, रंग-रूप, परिवार, शौक।" **क्यों होता है:** कक्षा 6 तक.' }
          ],
            remediations: { 'biodata': { steps: ['**चरण 1 — \'दिखाओ, मत बताओ\' (Show, Don\'t Tell) अभ्यास:** छात्र को कहो: "राम ईमानदार है — यह **दावा** है। अब पाठ से **वह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ अन्तःक्रिया करके.',
          hint: 'अगर अटका हुआ लगे तो c7_hin_cbse_04_004 (नायक चित्रण) दोबारा पढ़ें — विशेषकर.',
          misconception: 'छात्र समझते हैं कि सहायक पात्र = "कम महत्वपूर्ण पात्र" या "जो कम पन्नों पर आता है"। वास्तव में, महत्व का आधार \'उपस्थिति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ अन्तःक्रिया करके कथानक को आगे',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ अन्तःक्रिया करके कथानक को आगे', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'अगर अटका हुआ लगे तो c7_hin_cbse_04_004 (नायक चित्रण) दोबारा पढ़ें — विशेषकर \'पाठ्य-साक्ष्य से गुण.',
                  misconception: 'छात्र समझते हैं कि सहायक पात्र = "कम महत्वपूर्ण पात्र" या "जो कम पन्नों पर आता है"। वास्तव में, महत्व का आधार \'उपस्थिति की मात्रा\' नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पूछो — "अगर कहानी से इस पात्र को हटा दें, तो क्या बदलेगा?', 'नायक का कौन-सा गुण नहीं दिखेगा?', 'कौन-सा संघर्ष कमज़ोर पड़ेगा?" चरण 2: एक परिचित कहानी (जैसे \'पंचतंत्र\' की कोई कथा) लो, सहायक पात्र हटाकर कहानी फिर से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) पाठ का वह केंद्रीय विचार या भाव है जो पूरी रचना में.',
          hint: 'यदि अटके तो c7_hin_cbse_04_002 (कथानक) और c7_hin_cbse_04_004 (नायक चरित्र) को दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर \'मुख्य विषय\' को \'कहानी का सारांश\' (Summary) या \'नैतिक शिक्षा का एक वाक्य\' (Moralistic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) पाठ का वह केंद्रीय विचार या भाव है जो पूरी रचना में व्याप्त',
                  options: ['मुख्य विषय (Central Theme) पाठ का वह केंद्रीय विचार या भाव है जो पूरी रचना में व्याप्त', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटके तो c7_hin_cbse_04_002 (कथानक) और c7_hin_cbse_04_004 (नायक चरित्र) को दोबारा पढ़ें — विषय.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर \'मुख्य विषय\' को \'कहानी का सारांश\' (Summary) या \'नैतिक शिक्षा का एक वाक्य\' (Moralistic slogan) मान लेते.' }
          ],
            remediations: { 'summary-moralistic-slogan': { steps: ['**चरण 1 - अंतर स्पष्ट करो:** छात्र से कहो: "किसी फिल्म का नाम लो। उसका \'प्लॉट\' (क्या हुआ) बताओ। फिर उसका \'थीम\' (किस.', '**चरण 2 - संज्ञा-खेल खेलो:** पाठ 4 के 5 कीवर्ड (संज्ञाएं) चुनवाओ जो पूरी कहानी में बार-बार आएं (जैसे: विश्वास, धोखा.', '**चरण 3 - \'तो क्या?\' पूछो:** जब छात्र कोई विषय बताए (जैसे \'दोस्ती\'), पूछो: "तो क्या?', 'लेखक दोस्ती के बारे में क्या कह रहा है?" — "सच्ची दोस्ती स्वार्थ नहीं देखती" — यह विषय कथन बनेगा। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
