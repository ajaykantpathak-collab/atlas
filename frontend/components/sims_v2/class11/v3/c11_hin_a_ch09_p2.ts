import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch09_p2: SimDef = {
    id: 'v3_c11_hin_a_ch09_p2',
    title: 'पाठ 9 · Part 2/3',
    subtitle: 'इस नोड में केवल गौण विषयों की पहचान, वर्गीकरण, पाठ्य-आधारित साक्ष्य संग्रह और मुख्य विषय.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 9 · Part 2/3',
    chapters: ['c11_hin_a_ch09'],
    nodeIds: ['c11_hin_a_cbse_09_007', 'c11_hin_a_cbse_09_008', 'c11_hin_a_cbse_09_009', 'c11_hin_a_cbse_09_010', 'c11_hin_a_cbse_09_011', 'c11_hin_a_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'अंतरा भाग-1 — पाठ 9\' में अंतरा-भाग-1-—-पाठ-9 जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — गौण विषय', text: '\'अंतरा भाग-1 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — गौण', 'पाठ 9 — साहित्यिक', 'पाठ 9 — पदावली', 'पाठ 9 — व्याकरण', 'पाठ 9 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 2/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 9\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_007', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके, तो नोड 006 (मुख्य विषय) की \'थीम स्टेटमेंट\' लेखन विधि दोहराएँ और नोड 004/005 के.',
          misconception: 'छात्र प्रायः \'गौण विषय\' को \'उपकथानक\' (sub-plot) या \'सहायक पात्र की कहानी\' समझ लेते हैं। उदाहरण: पाठ 9 में नायक के मित्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-1 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 9\' का कथानक — \'अंतरा भाग-1 — पाठ 9\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके, तो नोड 006 (मुख्य विषय) की \'थीम स्टेटमेंट\' लेखन विधि दोहराएँ और नोड 004/005 के \'चरित्र.',
                  misconception: 'छात्र प्रायः \'गौण विषय\' को \'उपकथानक\' (sub-plot) या \'सहायक पात्र की कहानी\' समझ लेते हैं। उदाहरण: पाठ 9 में नायक के मित्र का प्रेम-प्रसंग.' }
          ],
            remediations: { 'sub-plot-9-theme': { steps: ['चरण 1: छात्र से कहें — "पाठ 9 की कोई एक घटना चुनो और बताओ उससे कौन-सा \'बड़ा विचार\' (big idea) निकलता है जो पूरी कहानी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_008', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 9\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फँसें तो **उपमा और रूपक का तुलनात्मक चार्ट** बनाएँ: (1) संयोजक शब्द, (2) भेद/अभेद.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **रूपक केवल \'सुंदरता\' या \'अलंकार\' के लिए प्रयुक्त होता है** और उसका कार्य कथ्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 9\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'अंतरा भाग-1 — पाठ 9\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 9\' का कथानक — \'अंतरा भाग-1 — पाठ 9\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो **उपमा और रूपक का तुलनात्मक चार्ट** बनाएँ: (1) संयोजक शब्द, (2) भेद/अभेद, (3) प्रभाव.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **रूपक केवल \'सुंदरता\' या \'अलंकार\' के लिए प्रयुक्त होता है** और उसका कार्य कथ्य को \'सजाना\' मात्र है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — ठोस अनुभव दें:** छात्र को आँखें बंद कर "नींबू काटने, रस निचोड़ने, चाटने" की कल्पना कराएँ; पूछें — "क्या मुँह.', 'कौन-सी इंद्री जगी?" → **स्वाद/घ्राण बिंब** सिद्ध। **चरण 2 — रूपक का \'भेद-मिटाना\' दिखाएँ:** दो कार्ड लें: एक पर \'समय\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_009', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 9\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो **c11_hin_a_cbse_09_008 (बिंब और रूपक)** के \'कार्य-उदाहरण\' पुनः पढ़ें और 3.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **\'विरोधाभास\' (Paradox) को \'विरोधाभास अलंकार\' (Oxymoron) का पर्याय मान लेते हैं** और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 9\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 9\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 9\' का कथानक — \'अंतरा भाग-1 — पाठ 9\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_09_008 (बिंब और रूपक)** के \'कार्य-उदाहरण\' पुनः पढ़ें और 3 बिंबों को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **\'विरोधाभास\' (Paradox) को \'विरोधाभास अलंकार\' (Oxymoron) का पर्याय मान लेते हैं** और दोनों की व्याख्या.' }
          ],
            remediations: { 'paradox-oxymoron': { steps: ['**चरण 1:** छात्र से कहें: "दो वाक्य लिखो — एक में केवल दो विरोधी शब्द हों (जैसे: \'कड़वा मीठा\'), दूसरे में पूरा वाक्य.', 'पहले में कोई सत्य छिपा है या केवल वर्णन है?', 'दूसरे में क्या सत्य छिपा है?" **चरण 3:** स्पष्ट करें: "पहला **अलंकार (Oxymoron)** है — शब्दों का श्रृंगार; दूसरा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_010', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 9\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि फंसे हों, तो **पात्र-चित्रण: नायक (c11_hin_a_cbse_09_004)** और **मुख्य विषय.',
          misconception: 'छात्र समझते हैं कि \'पदावली विश्लेषण\' का अर्थ **कठिन शब्दों के अर्थ लिखना** या **समानार्थी शब्द ढूंढना** है। वे यह नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 9\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 9\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 9\' का कथानक — \'अंतरा भाग-1 — पाठ 9\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे हों, तो **पात्र-चित्रण: नायक (c11_hin_a_cbse_09_004)** और **मुख्य विषय.',
                  misconception: 'छात्र समझते हैं कि \'पदावली विश्लेषण\' का अर्थ **कठिन शब्दों के अर्थ लिखना** या **समानार्थी शब्द ढूंढना** है। वे यह नहीं देख पाते कि लेखक ने.' }
          ],
            remediations: { '1': { steps: ['**चरण 1:** छात्र से कहें: "पाठ का कोई एक पैरा लो, उसमें से 5 शब्द छांटो जो तुम्हें \'सामान्य\' न लगें।" 2.', '**चरण 2:** प्रत्येक शब्द के लिए पूछें: "अगर लेखक इसकी जगह उसका समानार्थी लिख देता, तो क्या फर्क पड़ता?', 'पात्र की छवि, भाव की तीव्रता, या पाठक की प्रतिक्रिया में क्या बदलता?" 3.', '**चरण 3:** एक टेबल बनवाएं: कॉलम 1 — चुना गया शब्द | कॉलम 2 — संभावित विकल्प | कॉलम 3 — विकल्प से क्या खो जाता/बदलता |.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_011', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 9\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck, review \'शब्द-रचना/शब्द-वर्गीकरण\' (Word formation/Classification) from Class.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि \'भाषा-प्रयोग\' का विश्लेषण करने का अर्थ है पाठ में आए **सभी कठिन/तत्सम.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 9\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-1 — पाठ 9\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 9\' का कथानक — \'अंतरा भाग-1 — पाठ 9\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review \'शब्द-रचना/शब्द-वर्गीकरण\' (Word formation/Classification) from Class 9-10 Hindi.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि \'भाषा-प्रयोग\' का विश्लेषण करने का अर्थ है पाठ में आए **सभी कठिन/तत्सम शब्दों की सूची बनाना**.' }
          ],
            remediations: { 'etymology-class-9-10': { steps: ['**पुनर्अवधारणा (Reconceptualize):** छात्र को समझाएँ: "व्याकरण कक्षा में हम पूछते हैं \'शुद्ध रूप क्या है?\' — साहित्य.', '**सूक्ष्म-अभ्यास (Micro-drill):** पाठ के एक पैराग्राफ से 5 शब्द चुनें (मिश्रित: तत्सम, तद्भव, देशज, विदेशज)। प्रत्येक.', '**तुलनात्मक विश्लेषण:** उसी प्रसंग का एक \'मानक हिंदी अनुवाद\' (अनौपचारिक/औपचारिक) दिखाएँ। छात्र से कहें: "दोनों में.', '**स्मृति-सूत्र (Mnemonic):** **शब्द → छाया → चयन → प्रभाव** (Word → Connotation → Choice → Effect) — इस चक्र को हर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_012', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँसें तो पाठ-परिवेश और वातावरण (c11_hin_a_cbse_09_003) की अवधारणा को दोहराएँ—वहाँ.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि उत्तर पाठ में स्पष्ट शब्दों में नहीं दिया गया है, तो वह गलत है—इसलिए वे आशय-सूचक प्रश्नों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 9\' का कथानक — \'अंतरा भाग-1 — पाठ 9\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो पाठ-परिवेश और वातावरण (c11_hin_a_cbse_09_003) की अवधारणा को दोहराएँ—वहाँ सीखा गया कि.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि उत्तर पाठ में स्पष्ट शब्दों में नहीं दिया गया है, तो वह गलत है—इसलिए वे आशय-सूचक प्रश्नों के उत्तर भी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही वाक्य से दो तरह के प्रश्न कैसे बन सकते हैं—उदाहरण के लिए, वाक्य "शर्मा जी ने आज मंदिर में दान.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
