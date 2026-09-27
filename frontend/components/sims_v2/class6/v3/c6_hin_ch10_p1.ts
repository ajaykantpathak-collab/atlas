import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch10_p1: SimDef = {
    id: 'v3_c6_hin_ch10_p1',
    title: 'पाठ 10 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 10 के लेखक और उसकी रचना-पृष्ठभूमि से संबंधित आधारभूत जानकारी तक सीमित है.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 10 · Part 1/3',
    chapters: ['c6_hin_ch10'],
    nodeIds: ['c6_hin_cbse_10_001', 'c6_hin_cbse_10_002', 'c6_hin_cbse_10_003', 'c6_hin_cbse_10_004', 'c6_hin_cbse_10_005', 'c6_hin_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'मान लीजिए आपको एक पुराना पत्र मिलता है जिस पर पता नहीं लिखा, सिर्फ़ लिखा है "तुम्हारा दोस्त"। क्या आप समझ.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — पृष्ठभूमि और रचनाकार परिचय', text: '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है जिसमें रचना का जन्म हुआ, जबकि **रचनाकार परिचय** में लेखक का जीवन-परिचय, उनकी साहित्यिक यात्रा, प्रमुख कृतियाँ और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — पृष्ठभूमि', 'पाठ 10 — कथानक', 'पाठ 10 — पाठ्य-परिवेश', 'पाठ 10 — पात्र-चित्रण', 'पाठ 10 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 1/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**.', answer: '10 -', options: ['10 -', '10 -'] },
            { id: 's2', label: '10 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण का अर्थ है — कहानी या कविता में दर्शाया गया वह सम्पूर्ण भौतिक.', answer: '10 -', options: ['10 -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 10 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 10 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 10 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_001', difficulty: 'standard',
          question: '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश.',
          hint: 'यदि अटके, तो कक्षा 5 की \'कहानी पढ़कर प्रश्नोत्तर\' वाली कॉपी देखें और पहचानें: वहाँ आपने.',
          misconception: '**भ्रम:** "रचनाकार परिचय का मतलब है — लेखक का जन्म-वर्ष, मृत्यु-वर्ष, शिक्षा, पुरस्कार और पुस्तकों की सूची रट लेना।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है',
                  options: ['**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटके, तो कक्षा 5 की \'कहानी पढ़कर प्रश्नोत्तर\' वाली कॉपी देखें और पहचानें: वहाँ आपने \'क्या हुआ\'.',
                  misconception: '**भ्रम:** "रचनाकार परिचय का मतलब है — लेखक का जन्म-वर्ष, मृत्यु-वर्ष, शिक्षा, पुरस्कार और पुस्तकों की सूची रट लेना।" **वास्तविकता:** यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**तथ्य से तर्क तक:** छात्र से कहें — "लेखक की एक घटना चुनो (जैसे: बचपन में माँ का देहांत)। अब बताओ: इस घटना ने लेखक को.', 'वही भाव पाठ के किस पात्र/प्रसंग में दिखता है?" — यह \'जीवनी\' को \'पाठ-साक्ष्य\' से जोड़ता है। 2.', '**समय-रेखा बनवाएँ:** एक चार्ट बनाएँ — बाएँ कॉलम में \'लेखक के जीवन की 3 बड़ी घटनाएँ\', दाएँ में \'पाठ के 3 प्रसंग\'। तीर.', '**प्रश्न बदलें:** "लेखक कौन थे?" के बजाय पूछें — "लेखक ने यह कहानी *क्यों* लिखी होगी?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित.',
          hint: 'यदि अटका लगे: \'कहानी के तीन भाग\' (आरंभ-मध्य-अंत) को दोहराएँ और फिर पूछें — "मध्य भाग में.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'चरमोत्कर्ष (Climax) = सबसे रोमांचक/हिंसक दृश्य\'**। **गलत तर्क:** वे एक्शन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**',
                  options: ['कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'पाठ्य-परिवेश और वातावरण का अर्थ है', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटका लगे: \'कहानी के तीन भाग\' (आरंभ-मध्य-अंत) को दोहराएँ और फिर पूछें — "मध्य भाग में हर घटना.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'चरमोत्कर्ष (Climax) = सबसे रोमांचक/हिंसक दृश्य\'**। **गलत तर्क:** वे एक्शन (लड़ाई, विस्फोट, पीछा) को.' }
          ],
            remediations: { 'climax': { steps: ['**दृश्य बनाम मोड़:** छात्र से कहो — "फिल्म का वह दृश्य बताओ जहाँ नायक का *मन* बदलता है, न कि जहाँ सबसे ज्यादा मार-धाड़.', '**निर्णय-मानचित्र:** कहानी की 3 मुख्य घटनाएँ लिखवाओ और हर घटना के आगे पूछो — **"यहाँ नायक ने क्या *चुना*?"** यदि उत्तर.', '**पुनर्लेखन अभ्यास:** किसी परीकथा का अंत जबरन \'नायक के चुनाव\' से लिखवाओ (Diagnostic Q6 दोहराओ)। प्रतिपुष्टि दो: "क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण का अर्थ है — कहानी या कविता में दर्शाया गया वह सम्पूर्ण.',
          hint: 'यदि अटका हुआ महसूस हो, तो "पाठ 10 — कथानक और आख्यान-संरचना" (c6_hin_cbse_10_002) के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "परिवेश" = **केवल स्थान (setting/place)** होता है। **गलत तर्क का उदाहरण:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण का अर्थ है',
                  options: ['पाठ्य-परिवेश और वातावरण का अर्थ है', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो "पाठ 10 — कथानक और आख्यान-संरचना" (c6_hin_cbse_10_002) के "घटना-शृंखला".',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "परिवेश" = **केवल स्थान (setting/place)** होता है। **गलत तर्क का उदाहरण:** "कहानी गाँव में घटती है.' }
          ],
            remediations: { 'setting-place': { steps: ['**दृश्य-आधारित अभ्यास:** छात्र को अपने घर के बाहर का दृश्य 5 मिनट देखना है और फिर लिखना है — स्थान, समय, मौसम, लोग क्या.', '**तुलना चार्ट:** दो विपरीत परिवेश (जैसे "शहर का मॉल" vs "गाँव का हाट") के लिए 5-घटक तालिका भरवाएँ: स्थान | काल | मौसम |.', '**पाठ से जोड़ना:** पाठ 10 के किसी अंश में पीले/नीले पेन से परिवेश के अलग-अलग घटक अंडरलाइन करवाएँ और पूछें: "अगर यह घटक.', '**मौखिक पुनर्कथन:** छात्र अपने शब्दों में समझाए कि परिवेश पात्र का "दूसरा चरित्र" क्यों है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख.',
          hint: 'यदि अटके, तो **कथानक के प्रमुख मोड़ (Turning Points)** दोबारा पढ़ें और पूछें: *"इस मोड़.',
          misconception: '**विशिष्ट भ्रांति:** *"नायक का चित्रण करते समय उसके \'अच्छे गुणों\' को बढ़ा-चढ़ाकर लिखना चाहिए और \'बुरे गुणों/कमजोरियों\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि अटके, तो **कथानक के प्रमुख मोड़ (Turning Points)** दोबारा पढ़ें और पूछें: *"इस मोड़ पर नायक ने.',
                  misconception: '**विशिष्ट भ्रांति:** *"नायक का चित्रण करते समय उसके \'अच्छे गुणों\' को बढ़ा-चढ़ाकर लिखना चाहिए और \'बुरे गुणों/कमजोरियों\' को छुपाना चाहिए.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**प्रतिमान तोड़ो:** कक्षा में पूछो — *"क्या तुमने कभी गलती की?', 'फिर भी तुम \'बुरे\' नहीं हो न?', '**उदाहरण दो:** पाठ्यपुस्तक के किसी नायक (जैसे \'वह चिड़िया जो\' का नायक या \'संसार पुस्तक है\' का बालक) की **एक कमजोरी**.', '**अभ्यास कराओ:** छात्रों से कहो: *"अपनी किसी कमजोरी (आलस, गुस्सा, डर) को लिखो और बताओ कि तुमने उससे कैसे पार पाया — यही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) are fictional figures in a narrative who.',
          hint: 'Review Node 004 (पात्र-चित्रण: नायक/प्रमुख पात्र) and re-read the story focusing only.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि "सहायक पात्र = नायक का दोस्त/भाई/सेवक" (यानी केवल सकारात्मक संबंध)। वे यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) are fictional figures in a narrative who interact',
                  options: ['सहायक पात्र (Supporting Characters) are fictional figures in a narrative who interact', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'Review Node 004 (पात्र-चित्रण: नायक/प्रमुख पात्र) and re-read the story focusing only on the.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि "सहायक पात्र = नायक का दोस्त/भाई/सेवक" (यानी केवल सकारात्मक संबंध)। वे यह नहीं देख पाते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**शब्द-अर्थ स्पष्ट करें:** बोर्ड पर लिखें — \'सहायक पात्र\' ≠ \'मित्र\'। \'सहायक\' = कथानक/नायक के विकास में **कार्यात्मक.', '**वर्गीकरण चार्ट बनाएं:** चार कॉलम: **प्रकार (Type)** | **कार्य (Function)** | **नायक पर प्रभाव (Effect on Hero)** |.', '**\'हटाओ और देखो\' खेल:** कहानी के एक दृश्य से सहायक पात्र को मानसिक रूप से हटाएँ। पूछें: "अब नायक क्या करेगा?', 'क्या दृश्य वही रहेगा?" — इससे कार्यात्मक समझ आएगी। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या अंतर्निहित संदेश है जिसे लेखक.',
          hint: 'अगर अटके तो **कथानक के चरमोत्कर्ष (Climax) और परिणाम (Resolution)** पर वापस जाएँ — विषय.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'मुख्य विषय\' को \'नैतिक सूक्ति\' (Moral/Proverb) समझ लेते हैं** — जैसे कहानी पढ़कर तुरंत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या अंतर्निहित संदेश है जिसे लेखक पूरी रचना',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या अंतर्निहित संदेश है जिसे लेखक पूरी रचना', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'अगर अटके तो **कथानक के चरमोत्कर्ष (Climax) और परिणाम (Resolution)** पर वापस जाएँ — विषय प्रायः.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'मुख्य विषय\' को \'नैतिक सूक्ति\' (Moral/Proverb) समझ लेते हैं** — जैसे कहानी पढ़कर तुरंत "सच बोलना चाहिए".' }
          ],
            remediations: { 'moral-proverb': { steps: ['**\'क्या हुआ बनाम क्या मतलब\' टेबल बनवाएँ:** कहानी की 3 प्रमुख घटनाएँ बाएँ कॉलम में लिखवाएँ, दाएँ कॉलम में पूछें "इससे.', '**\'सूक्ति मिलान\' खेल खेलें:** 5 कहानियों के विषय और 5 सूक्तियाँ मिलाएँ — फिर पूछें "कौन सी सूक्ति किस कहानी से *निकली*.', '**\'विषय शब्द\' बैंक बनाएँ:** लालच, त्याग, न्याय, साहस, अहंकार — ये एक-शब्द विषय हैं; इन्हें कहानियों से जोड़कर वाक्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
