import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch07_p2: SimDef = {
    id: 'v3_c7_hin_ch07_p2',
    title: 'पाठ 7 · Part 2/3',
    subtitle: 'यह नोड केवल गौण विषयों की पहचान, विश्लेषण और मुख्य विषय से उनके संबंध तक सीमित है। इसमें.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 7 · Part 2/3',
    chapters: ['c7_hin_ch07'],
    nodeIds: ['c7_hin_cbse_07_007', 'c7_hin_cbse_07_008', 'c7_hin_cbse_07_009', 'c7_hin_cbse_07_010', 'c7_hin_cbse_07_011', 'c7_hin_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'क्या तुमने कभी ध्यान दिया है कि तुम्हारी पसंदीदा कहानी या फिल्म में हीरो के अलावा दूसरे किरदारों की अपनी.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक कथावस्तु या विचार है जो पाठ के मुख्य विषय के समानांतर चलता है, उसे पूरक बनाता है, और कथा को बहुआयामी एवं यथार्थपरक बनाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — गौण', 'पाठ 7 — साहित्यिक', 'पाठ 7 — पदावली', 'पाठ 7 — व्याकरण', 'पाठ 7 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 2/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है: दिए गए संदर्भ (context) के अनुसार उपयुक्त शब्द-भंडार.', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा.', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक कथावस्तु या विचार है जो पाठ के मुख्य विषय के.',
          hint: 'यदि अटके, तो **c7_hin_cbse_07_006 (मुख्य विषय और संदेश)** दोहराएँ — मुख्य विषय अस्पष्ट.',
          misconception: '**विशिष्ट भ्रम:** छात्र गौण विषय को **\'मुख्य विषय का उप-विभाजन\' (sub-division)** समझते हैं — जैसे मुख्य विषय \'शिक्षा\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक कथावस्तु या विचार है जो पाठ के मुख्य विषय के समानांतर चलता',
                  options: ['गौण विषय (Sub-theme) वह सहायक कथावस्तु या विचार है जो पाठ के मुख्य विषय के समानांतर चलता', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके, तो **c7_hin_cbse_07_006 (मुख्य विषय और संदेश)** दोहराएँ — मुख्य विषय अस्पष्ट होगा तो गौण.',
                  misconception: '**विशिष्ट भ्रम:** छात्र गौण विषय को **\'मुख्य विषय का उप-विभाजन\' (sub-division)** समझते हैं — जैसे मुख्य विषय \'शिक्षा\' है तो गौण विषय.' }
          ],
            remediations: { 'sub-division': { steps: ['**पुनर्परिभाषित करो:** छात्र से कहो — "गौण विषय का अर्थ \'छोटा विषय\' नहीं, \'सहायक कथावस्तु\' है। जैसे मुख्य नदी में सहायक.', '**दृश्य साधन बनवाओ:** एक वृक्ष बनवाओ — तना = मुख्य विषय, शाखाएँ = गौण विषय। पूछो: "क्या शाखा तने का टुकड़ा है?', 'नहीं, वह अलग है पर तने से जुड़ी है।" 3.', '**पाठ से खोज करवाओ:** पाठ 7 के 3 पैराग्राफ देकर पूछो — "यहाँ मुख्य विषय (करुणा) की सीधी बात नहीं हो रही, फिर भी करुणा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 के किसी भी पाठ (जैसे c6_hin_cbse_07_008) के बिंब/रूपक.',
          misconception: '**सटीक गलती:** छात्र समझते हैं कि **कोई भी तुलना रूपक है** — इसलिए "वह शेर जैसा बहादुर है" को रूपक बता देते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक की',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक की', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 के किसी भी पाठ (जैसे c6_hin_cbse_07_008) के बिंब/रूपक उदाहरण**.',
                  misconception: '**सटीक गलती:** छात्र समझते हैं कि **कोई भी तुलना रूपक है** — इसलिए "वह शेर जैसा बहादुर है" को रूपक बता देते हैं। **क्यों होती है:** कक्षा 6.' }
          ],
            remediations: { '6': { steps: ['**चरण 1 (तत्काल):** छात्र के सामने दो वाक्य रखो — "वह **सिंह** है" और "वह **सिंह जैसा** है" — पूछो: "पहले में वह.', 'दूसरे में वह **कैसा** है?" — जब छात्र बोले "पहले में वह सिंह **बन गया**, दूसरे में केवल **तुलना** है", तब लिखवाओ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_009', difficulty: 'standard',
          question: '**विरोधाभास** एक साहित्यिक युक्ति है जहाँ कथन का शाब्दिक अर्थ वास्तविक स्थिति.',
          hint: 'यदि अटका हुआ लगे, तो कक्षा 6 के किसी भी पाठ (जैसे c6_hin_cbse_04_009) का वह अंश फिर से.',
          misconception: 'छात्र अक्सर **विरोधाभास** को केवल "व्यंग्य" या "कटाक्ष" समझ लेते हैं और **प्रतीक** को "रूपक" (metaphor) मान बैठते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** एक साहित्यिक युक्ति है जहाँ कथन का शाब्दिक अर्थ वास्तविक स्थिति या आशय के',
                  options: ['**विरोधाभास** एक साहित्यिक युक्ति है जहाँ कथन का शाब्दिक अर्थ वास्तविक स्थिति या आशय के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका हुआ लगे, तो कक्षा 6 के किसी भी पाठ (जैसे c6_hin_cbse_04_009) का वह अंश फिर से पढ़ो जहाँ.',
                  misconception: 'छात्र अक्सर **विरोधाभास** को केवल "व्यंग्य" या "कटाक्ष" समझ लेते हैं और **प्रतीक** को "रूपक" (metaphor) मान बैठते हैं। विशेषतः: (1) वे.' }
          ],
            remediations: { 'metaphor-1': { steps: ['**विरोधाभास के लिए:** छात्र को तीन वाक्य दो — एक साधारण कथन, एक व्यंग्य, एक विरोधाभास — और उससे पूछो: "किसमें वक्ता.', '**प्रतीक के लिए:** एक वस्तु (चाबी, दरवाज़ा, छाया) दो और कहो: "यह अपने आप में क्या है?', 'और क्या *बन सकती* है?" — पहली भौतिक सत्ता, दूसरी प्रतीकात्मक सत्ता; जब दूसरी पहली से स्वतंत्र अर्थ ले ले, तब प्रतीक.', 'पाठ के एक अंश में दोनों युक्तियाँ मिलकर काम करती हैं — उन्हें अलग-अलग रंग से रेखांकित करवाओ और प्रत्येक का स्वतंत्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वे **महत्वपूर्ण शब्द** हैं जो पाठ के **केंद्रीय विषय, प्रमुख.',
          hint: 'यदि अटके तो **c7_hin_cbse_07_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विषय स्पष्ट होते.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **जो शब्द पाठ में सबसे ज्यादा बार आया** या **जिसका शब्दकोश अर्थ सबसे कठिन** है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वे **महत्वपूर्ण शब्द** हैं जो पाठ के **केंद्रीय विषय, प्रमुख भाव,',
                  options: ['पदावली: मुख्य शब्द वे **महत्वपूर्ण शब्द** हैं जो पाठ के **केंद्रीय विषय, प्रमुख भाव,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो **c7_hin_cbse_07_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विषय स्पष्ट होते ही मुख्य.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **जो शब्द पाठ में सबसे ज्यादा बार आया** या **जिसका शब्दकोश अर्थ सबसे कठिन** है, वही मुख्य शब्द है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: **"पाठ का एक वाक्य में सार लिखो — बिना किसी संज्ञा (वस्तु/व्यक्ति) के, केवल भाव/क्रिया शब्दों में।"** 2.', 'उस सार में आए **3-4 भाव-शब्दों** को रेखांकित करो — वही **मुख्य शब्द** हैं। 3.', 'अब पाठ खोलकर देखो: ये शब्द कहाँ आए हैं?', 'उन प्रसंगों को पढ़ो — समझो कि **यही प्रसंग पाठ का दिल हैं**। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है: दिए गए संदर्भ (context) के अनुसार उपयुक्त.',
          hint: 'अगर छात्र अटक जाए तो **कक्षा 6 के व्याकरण अभ्यास (c6_hin_cbse_07_011)** के.',
          misconception: 'छात्र मानते हैं कि व्याकरण में भाषा-प्रयोग का अर्थ है **\'नियम याद करके सही वाक्य बनाना\'** — जैसे: "भूतकाल में \'ने\' लगता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है: दिए गए संदर्भ (context) के अनुसार उपयुक्त शब्द-भंडार',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है: दिए गए संदर्भ (context) के अनुसार उपयुक्त शब्द-भंडार', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'अगर छात्र अटक जाए तो **कक्षा 6 के व्याकरण अभ्यास (c6_hin_cbse_07_011)** के \'वाक्य-परिवर्तन\' प्रश्न.',
                  misconception: 'छात्र मानते हैं कि व्याकरण में भाषा-प्रयोग का अर्थ है **\'नियम याद करके सही वाक्य बनाना\'** — जैसे: "भूतकाल में \'ने\' लगता है, इसलिए लगा दो।".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 7 से **एक छोटा अंश (3-4 वाक्य)** दें और कहें: "हर वाक्य में एक व्याकरणिक तत्व (काल/वाच्य/कारक/विराम) बदलो.', 'फिर उससे पूछो: "लेखक ने मूल रूप क्यों चुना होगा?" — यदि वह न बता पाए, तो **तुम स्वयं दो विकल्प देकर** पूछो: "विकल्प अ.', 'अंत में उसे **अपना एक वाक्य** लिखने को कहो जहाँ वह **जानबूझकर** किसी नियम का उल्लंघन/चयन करे (जैसे: कर्मणि वाच्य चुनकर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप.',
          hint: 'यदि अटका हुआ लगे तो c7_hin_cbse_07_002 (कथानक) और c7_hin_cbse_07_006 (मुख्य विषय) दोबारा.',
          misconception: 'छात्र समझते हैं कि आशय-सूचक प्रश्न का उत्तर "अपनी राय" या "अनुमान" होता है, जबकि सही यह है कि आशय-सूचक उत्तर भी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका हुआ लगे तो c7_hin_cbse_07_002 (कथानक) और c7_hin_cbse_07_006 (मुख्य विषय) दोबारा पढ़े — ये.',
                  misconception: 'छात्र समझते हैं कि आशय-सूचक प्रश्न का उत्तर "अपनी राय" या "अनुमान" होता है, जबकि सही यह है कि आशय-सूचक उत्तर भी पाठ-आधारित प्रमाणों पर टिका.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को एक छोटा गद्यांश दो (4-5 वाक्य) और केवल वस्तुनिष्ठ प्रश्न पूछो — उसे पाठ में वाक्य ढूँढकर दिखाने को कहो।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
