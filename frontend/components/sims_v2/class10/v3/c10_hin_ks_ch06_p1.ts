import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch06_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch06_p1',
    title: 'पाठ 6 · Part 1/3',
    subtitle: 'इस नोड में कवि के जीवन व पृष्ठभूमि का परिचय, प्रभाव एवं रचनात्मक संदर्भ शामिल है; कविता.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 6 · Part 1/3',
    chapters: ['c10_hin_ks_ch06'],
    nodeIds: ['c10_hin_ks_cbse_06_001', 'c10_hin_ks_cbse_06_002', 'c10_hin_ks_cbse_06_003', 'c10_hin_ks_cbse_06_004', 'c10_hin_ks_cbse_06_005', 'c10_hin_ks_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'क्षितिज भाग-2 खोलिए और पाठ 06 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — कवि', 'पाठ 6 — पद्यांश-वार', 'पाठ 6 — काव्य-संरचना', 'पाठ 6 — केंद्रीय', 'पाठ 6 — छंद', 'पाठ 6 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 1/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 6\' का कथानक — \'क्षितिज भाग-2 — पाठ 6\' — क्षितिज भाग-2 का पाठ। पाठ का.', answer: '6 -', options: ['6 -', '6 - -', '6 -'] },
            { id: 's2', label: '6 - -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.', answer: '6 - -', options: ['6 - -', '6 -', '6 -'] },
            { id: 's3', label: '6 -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.', answer: '6 -', options: ['6 -', '6 -', '6 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'यदि कठिनाई हो तो कक्षा‑9 हिन्दी पाठ्यक्रम के ‘कविता परिचय’ अध्याय (यदि उपलब्ध हो) या किसी.',
          misconception: 'छात्र अक्सर मानते हैं कि कवि के परिचय में सिर्फ जन्म‑मृत्यु तिथियाँ और प्रकाशित रचनाओं की सूची पर्याप्त है, जबकि बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 6\' का कथानक — \'क्षितिज भाग-2 — पाठ 6\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', '\'क्षितिज भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि कठिनाई हो तो कक्षा‑9 हिन्दी पाठ्यक्रम के ‘कविता परिचय’ अध्याय (यदि उपलब्ध हो) या किसी मानक.',
                  misconception: 'छात्र अक्सर मानते हैं कि कवि के परिचय में सिर्फ जन्म‑मृत्यु तिथियाँ और प्रकाशित रचनाओं की सूची पर्याप्त है, जबकि बोर्ड परीक्षा में अपेक्षित.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाएँ कि एक अच्छा परिचय कैसे बनता है: पहले कवि के जीवन की घटनाओं की टाइमलाइन बनाएँ; फिर उन घटनाओं को चुनें जो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_002', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 6\' का कथानक — \'क्षितिज भाग-2 — पाठ 6\' — क्षितिज भाग-2 का.',
          hint: 'अगर फँस जाएँ तो कक्षा 9 की \'पदावली\' और \'भावार्थ\' लिखने के अभ्यास (NCERT कृतिका/क्षितिज के.',
          misconception: 'विद्यार्थी समझते हैं कि पद्यांश-वार भावार्थ का अर्थ है प्रत्येक पंक्ति का शब्द-दर-शब्द अनुवाद करना। वे \'प्रसंग\' और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 6\' का कथानक — \'क्षितिज भाग-2 — पाठ 6\' — क्षितिज भाग-2 का पाठ। पाठ का',
                  options: ['\'क्षितिज भाग-2 — पाठ 6\' का कथानक — \'क्षितिज भाग-2 — पाठ 6\' — क्षितिज भाग-2 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', '\'क्षितिज भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'अगर फँस जाएँ तो कक्षा 9 की \'पदावली\' और \'भावार्थ\' लिखने के अभ्यास (NCERT कृतिका/क्षितिज के अभ्यास.',
                  misconception: 'विद्यार्थी समझते हैं कि पद्यांश-वार भावार्थ का अर्थ है प्रत्येक पंक्ति का शब्द-दर-शब्द अनुवाद करना। वे \'प्रसंग\' और \'स्वतंत्र भाव\' छोड़ देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['विद्यार्थी को एक छोटी कविता (4-5 बंद) दें और केवल पहले बंद का \'प्रसंग\', \'कठिन शब्द\', \'भाव\' अलग-अलग कॉलम में लिखवाएं। 2.', 'फिर पूछें: "अगर प्रसंग न लिखें तो पाठक क्या नहीं समझेगा?" — इससे प्रसंग का महत्व स्पष्ट होगा। 3.', 'अगले चरण में दो बंदों की तुलना करवाएं: "पहले बंद में बादल सुंदर हैं, दूसरे में भयावह — कवि ने ऐसा क्यों किया?" — इससे.', 'अंत में CBSE सैंपल पेपर का एक \'आशय स्पष्ट कीजिए\' प्रश्न हल करवाएं और मार्किंग स्कीम से मिलान करवाएं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_003', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'यदि अटका लगे तो **कक्षा 9 की कविता "साखी" या "पद" के पद-विभाजन** को दोबारा देखें — NCERT.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **तुक (राइम) ही छंद (मीटर) है**। उदाहरण: वे `abab` तुक वाली कविता को "चौपाई छंद".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में',
                  options: ['\'क्षितिज भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 6\' का कथानक — \'क्षितिज भाग-2 — पाठ 6\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटका लगे तो **कक्षा 9 की कविता "साखी" या "पद" के पद-विभाजन** को दोबारा देखें — NCERT कक्षा 9.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **तुक (राइम) ही छंद (मीटर) है**। उदाहरण: वे `abab` तुक वाली कविता को "चौपाई छंद" कह देते हैं क्योंकि.' }
          ],
            remediations: { 'abab-9': { steps: ['**चरण 1:** छात्र से कहो: "केवल अंतिम शब्द न देखो, पूरी पंक्ति की **मात्राएँ गिनो**।" 2.', '**चरण 2:** दोहा/चौपाई के **लक्षण-चार्ट** (मात्रा, यति, गुरु-लघु) सामने रखकर **एक साथ** मिलान करवाओ। 3.', '**चरण 3:** 5-5 पंक्तियों का **अभ्यास सेट** दो — पहले तुक पहचानने को कहो, फिर छंद; अंतर स्पष्ट होने तक दोहराओ। 4.', '**चरण 4:** बोर्ड के गत वर्ष के प्रश्न दिखाओ जहाँ तुक लिखने पर अंक कटे — **मार्किंग स्कीम** से जोड़ो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_004', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'यदि कठिनाई आए तो c10_hin_ks_cbse_06_003 (काव्य‑संरचना और पद्य‑विन्यास) की स्टैंजा और लय.',
          misconception: 'छात्र अक्सर केंद्रीय भाव और रस को एक ही मान लेते हैं और लिखते हैं कि “वीर भाव वीर rasa है” जैसा कि दोनों शब्दों का अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'क्षितिज भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 6\' का कथानक — \'क्षितिज भाग-2 — पाठ 6\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि कठिनाई आए तो c10_hin_ks_cbse_06_003 (काव्य‑संरचना और पद्य‑विन्यास) की स्टैंजा और लय संबंधी.',
                  misconception: 'छात्र अक्सर केंद्रीय भाव और रस को एक ही मान लेते हैं और लिखते हैं कि “वीर भाव वीर rasa है” जैसा कि दोनों शब्दों का अर्थ समान होता है। वे यह.' }
          ],
            remediations: { 'rasa-rasa': { steps: ['छात्र को दो वाक्य दें: एक में केवल भाव का नाम (भय) और दूसरे में उससे उत्पन्न रस का नाम (भयानक rasa) लिखवाएँ। 2.', 'फिर एक छोटा पद्यांश दिखाएँ जहाँ एक ही भावना (भय) दो अलग‑अलग रूप में आए—एक में खतरनाक घने जंगल से भय (अद्भुत रस) और.', 'छात्र से पूछें कि भाव समान है पर रस क्यों बदला और किस शब्द या चित्र ने परिवर्तन लाया। 4.', 'अंत में उसे एक सारणी बनवाएँ: स्तंभ 1‑भाव, स्तंभ 2‑दृष्टांत शब्द, स्तंभ 3‑उत्पन्न रस। इस प्रक्रिया से उसे स्पष्ट हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_005', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि लघु/गुरु पहचानने में अटके, तो **वर्णमाला के ह्रस्व/दीर्घ स्वर** और **संयुक्त व्यंजन**.',
          misconception: '**छात्र मानते हैं: "छंद = मात्रा गिनना"।** वे मात्रा गिनकर छंद पहचान लेते हैं, लेकिन **यति (विराम), गति (चाल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे',
                  options: ['\'क्षितिज भाग-2 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 6\' का कथानक — \'क्षितिज भाग-2 — पाठ 6\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि लघु/गुरु पहचानने में अटके, तो **वर्णमाला के ह्रस्व/दीर्घ स्वर** और **संयुक्त व्यंजन** दोहराएँ.',
                  misconception: '**छात्र मानते हैं: "छंद = मात्रा गिनना"।** वे मात्रा गिनकर छंद पहचान लेते हैं, लेकिन **यति (विराम), गति (चाल: द्रुत/मंद/मध्यम), और लय-भाव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "कविता को **ताली बजाकर पढ़ो**। जहाँ ताली स्वाभाविक लगे, वहाँ यति मार्क करो।" **चरण 2**: उसी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_006', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 6\' का मुख्य विषय — \'क्षितिज भाग-2 — पाठ 6\' का केंद्रीय भाव.',
          hint: 'यदि अलंकार पहचानने में कठिनाई हो तो छंद और लय‑विधान (c10_hin_ks_cbse_06_005) का दोहराव.',
          misconception: 'छात्र अक्सर सोचते हैं कि कोई भी कठिन या सजावटी शब्द अलंकार है; उदाहरण के लिए, वे “सुनहरी धूप” वाक्य में “सुनहरी” को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 6\' का मुख्य विषय — \'क्षितिज भाग-2 — पाठ 6\' का केंद्रीय भाव और संदेश',
                  options: ['\'क्षितिज भाग-2 — पाठ 6\' का मुख्य विषय — \'क्षितिज भाग-2 — पाठ 6\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 6\' का कथानक — \'क्षितिज भाग-2 — पाठ 6\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अलंकार पहचानने में कठिनाई हो तो छंद और लय‑विधान (c10_hin_ks_cbse_06_005) का दोहराव करें, विशेष.',
                  misconception: 'छात्र अक्सर सोचते हैं कि कोई भी कठिन या सजावटी शब्द अलंकार है; उदाहरण के लिए, वे “सुनहरी धूप” वाक्य में “सुनहरी” को रूपक मान लेते हैं, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि अलंकार पहचानने के तीन प्रश्न पूछिए: (1) क्या यहाँ कोई दो वस्तुओं या विचारों की तुलना है?', 'यदि हाँ तो “जैसी/जैसा” देखें — उपमा। (2) क्या किसी non‑human को human गुण दिया गया है?', 'यदि हाँ तो मानवीकरण। (3) क्या किसी consonants की दोहराव है?', 'यदि हाँ तो अनुप्रास। प्रत्येक प्रश्न का उत्तर “हाँ” होने पर संबंधित अलंकार की पहचान करें और फिर पूछिए कि इससे भाव या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
