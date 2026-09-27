import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch18_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch18_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch18_p2',
    title: 'मनुष्यता · Part 2/3',
    subtitle: 'यह नोड केवल मैथिलीशरण गुप्त की कविता "मनुष्यता" में प्रयुक्त **प्रतीक और बिंब** तक सीमित.',
    classLevel: 10, subject: 'hin_sp', topic: 'मनुष्यता · Part 2/3',
    chapters: ['c10_hin_sp_ch18'],
    nodeIds: ['c10_hin_sp_cbse_18_007', 'c10_hin_sp_cbse_18_008', 'c10_hin_sp_cbse_18_009', 'c10_hin_sp_cbse_18_010', 'c10_hin_sp_cbse_18_011', 'c10_hin_sp_cbse_18_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप परीक्षा हॉल में बैठे हैं और प्रश्न पूछता है: "कविता में \'पथिक\' शब्द प्रतीक है — समझाइए।" आप.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'कविता में **"तृण"** और **"धेनु"** शब्द आए हैं। दोनों की व्युत्पत्ति लिखिए और बताइए कि कवि ने इन **तत्सम शब्दों** का चयन **तद्भव समकक्षों** ("तिनका", "गाय") के.',
        options: ['**Correct Answer:** **व्युत्पत्ति:** - **तृण** = **तृ + ण** (तृण् धातु, अर्थ:', '** में **क्षणभंगुरता, तुच्छता, नश्वरता** का **दार्शनिक भार** है—मनुष्य शरीर को', 'कहना **उपनिषदिक परंपरा** से जोड़ता है।'],
        answer: '**Correct Answer:** **व्युत्पत्ति:** - **तृण** = **तृ + ण** (तृण् धातु, अर्थ:',
        hook: '**विशिष्ट भ्रांति:** *"कठिन शब्दों के अर्थ रट लो, मुहावरों के शाब्दिक अर्थ लिख दो—परीक्षा में चल जाएगा।"*.',
    },
    teaching: [
        { title: 'मनुष्यता — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**प्रतीक** वह शब्द या पद है जो अपने शाब्दिक अर्थ के अतिरिक्त किसी गहन, अमूर्त भाव या विचार को संकेतित करता है (जैसे: दीपक = ज्ञान/आशा)। **बिंब** वह भाषा-रचना है जो पाठक की पाँचों इंद्रियों (दृश्य.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_18_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['मनुष्यता — साहित्यिक युक्तियाँ', 'मनुष्यता — मुख्य भाव', 'मनुष्यता — गौण भाव', 'मनुष्यता — पदावली: कठिन', 'मनुष्यता — व्याकरण: पद्य', 'मनुष्यता — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_18_010', title: 'मनुष्यता — पदावली: कठिन शब्द और मुहावरे',
          caseStudy: { intro: '**Real-world hook:** You open the CBSE Sample Paper 2024 and see Question 9: *"‘अनल-शिखा-सा धधकता रहा’ – ‘अनल’ शब्द का अर्थ लिखिए और बताइए कि कवि ने यहाँ ‘अनल’.',
            decisions: [{ prompt: 'कविता \'मनुष्यता\' में प्रयुक्त शब्द **"विभु"** का शाब्दिक अर्थ लिखिए और इसकी व्युत्पत्ति (derivation) बताइए।', options: [
                { text: '**Correct Answer:** **विभु** = **व्यापक, सर्वव्यापक, विराट, परमात्मा**। व्युत्पत्ति: **वि', outcome: '**Correct Answer:** **विभु** = **व्यापक, सर्वव्यापक, विराट, परमात्मा**। व्युत्पत्ति: **वि + भु (भू.' },
                { text: 'व्युत्पत्ति लिखिए', outcome: 'Not quite — **विशिष्ट भ्रांति:** *"कठिन शब्दों के अर्थ रट लो, मुहावरों के शाब्दिक अर्थ लिख दो—परीक्षा में चल.', reveals: 'wrong-idea' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_18_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through मनुष्यता like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? मनुष्यता · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — मनुष्यता · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_007', difficulty: 'standard',
          question: '**प्रतीक** वह शब्द या पद है जो अपने शाब्दिक अर्थ के अतिरिक्त किसी गहन, अमूर्त.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_18_006 (अलंकार) और c10_hin_sp_cbse_18_002 (पद्यांश-वार.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"हर रूपक प्रतीक होता है और हर बिंब अलंकार होता है"।** उदाहरण: कविता में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**प्रतीक** वह शब्द या पद है जो अपने शाब्दिक अर्थ के अतिरिक्त किसी गहन, अमूर्त भाव या',
                  options: ['**प्रतीक** वह शब्द या पद है जो अपने शाब्दिक अर्थ के अतिरिक्त किसी गहन, अमूर्त भाव या', 'कवि परिचय में कवि का जीवन-परिचय, साहित्यिक योगदान, युग-प्रवृत्तियाँ और रचनाधर्मिता शामिल', 'पद्यांश-वार भावार्थ (Stanza-wise Detailed Meaning) is the analytical process of', 'काव्य-संरचना (poetic structure) कविता के आंतरिक और बाह्य ढाँचे का वह सुनियोजित विन्यास है'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_18_006 (अलंकार) और c10_hin_sp_cbse_18_002 (पद्यांश-वार भावार्थ) दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"हर रूपक प्रतीक होता है और हर बिंब अलंकार होता है"।** उदाहरण: कविता में "पथिक" रूपक भी है (मनुष्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**स्पष्टीकरण (2 मिनट):** छात्र को समझाएँ — "एक शब्द एक साथ कई भूमिकाएँ निभा सकता है: \'पथिक\' रूपक है (तुलना), प्रतीक है.', '**अभ्यास (5 मिनट):** कविता से 3 शब्द चुनवाएँ (जैसे: दीप, ज्योति, पथ) और प्रत्येक के लिए तीन कॉलम बनवाएँ — **अलंकार.', '**पुष्टि (3 मिनट):** पूछें — "क्या एक शब्द दो चीज़ हो सकता है?" — छात्र स्वयं बोले: "हाँ, जैसे \'दीप\' रूपक भी है और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_008', difficulty: 'standard',
          question: '\'मनुष्यता\' कविता का **मुख्य भाव** यह है कि सच्ची मनुष्यता निजी सुख-स्वार्थ में.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_18_004 (केंद्रीय भाव और रस)** और **c10_hin_sp_cbse_18_002.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि कविता का संदेश केवल **"दूसरों की मदद करो"** (do charity) है — यानी **दान/सेवा**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मनुष्यता\' कविता का **मुख्य भाव** यह है कि सच्ची मनुष्यता निजी सुख-स्वार्थ में नहीं,',
                  options: ['\'मनुष्यता\' कविता का **मुख्य भाव** यह है कि सच्ची मनुष्यता निजी सुख-स्वार्थ में नहीं,', 'कवि परिचय में कवि का जीवन-परिचय, साहित्यिक योगदान, युग-प्रवृत्तियाँ और रचनाधर्मिता शामिल', 'पद्यांश-वार भावार्थ (Stanza-wise Detailed Meaning) is the analytical process of', 'काव्य-संरचना (poetic structure) कविता के आंतरिक और बाह्य ढाँचे का वह सुनियोजित विन्यास है'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_18_004 (केंद्रीय भाव और रस)** और **c10_hin_sp_cbse_18_002.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि कविता का संदेश केवल **"दूसरों की मदद करो"** (do charity) है — यानी **दान/सेवा** तक सीमित।.' }
          ],
            remediations: { 'do-charity-self-expansion-empathy': { steps: ['**पुनर्पाठ (Re-read)**: छात्र से कहो — कविता का **अंतिम पद** जोर से पढ़ो। पूछो: "कवि \'वसुधा\' (पृथ्वी) को \'कुटुंब\'.', 'परिवार में दान होता है या साझेदारी?" 2.', '**तुलना कराओ**: दो स्थितियाँ दो — (अ) तुमने भिखारी को ₹10 दिए। (ब) तुमने अपने दोस्त का दुख सुना, उसे गले लगाया, उसके.', '**शब्द-प्रयोग सुधारो**: छात्र से कहो — अगली बार उत्तर में \'दान\', \'दया\', \'भिक्षा\' शब्द **नहीं** लिखोगे; लिखोगे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_009', difficulty: 'standard',
          question: 'गौण भाव (Secondary Theme) कविता का वह सहायक विचार है जो केंद्रीय भाव (Central.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_18_008 (मुख्य भाव और संदेश)** दोबारा पढ़ें — विशेषतः.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि कविता में **मुख्य विषय से हटकर आने वाला हर प्रसंग \'विषयांतर\' ही होता है** — वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव (Secondary Theme) कविता का वह सहायक विचार है जो केंद्रीय भाव (Central Theme) को',
                  options: ['गौण भाव (Secondary Theme) कविता का वह सहायक विचार है जो केंद्रीय भाव (Central Theme) को', 'कवि परिचय में कवि का जीवन-परिचय, साहित्यिक योगदान, युग-प्रवृत्तियाँ और रचनाधर्मिता शामिल', 'पद्यांश-वार भावार्थ (Stanza-wise Detailed Meaning) is the analytical process of', 'काव्य-संरचना (poetic structure) कविता के आंतरिक और बाह्य ढाँचे का वह सुनियोजित विन्यास है'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_18_008 (मुख्य भाव और संदेश)** दोबारा पढ़ें — विशेषतः \'केंद्रीय भाव की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि कविता में **मुख्य विषय से हटकर आने वाला हर प्रसंग \'विषयांतर\' ही होता है** — वे गौण भाव (जो केंद्रीय.' }
          ],
            remediations: { '9': { steps: ['**चरण 1 — दृश्यीकरण (Visual Mapping):** कविता के 8-10 पदों को एक **फ्लोचार्ट** में बनाएँ — प्रत्येक पद के लिए एक बॉक्स.', '(ब) क्या यह **स्वतंत्र प्रसंग** है जिसके बाद कवि को **जानबूझकर लौटना** पड़ता है?', '(स) यदि (अ) हाँ → गौण भाव; यदि (ब) हाँ → विषयांतर। **चरण 3 — लेखन-अभ्यास (Writing Drill):** छात्र से कहें: "एक पद चुनो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_010', difficulty: 'standard',
          question: 'पदावली (Vocabulary Glossary) इस काव्य-खंड में प्रयुक्त **कठिन तत्सम शब्दों.',
          hint: 'अगर फँसे हों तो **c10_hin_sp_cbse_18_002 (पद्यांश-वार भावार्थ)** पर लौटें—प्रत्येक पंक्ति.',
          misconception: '**विशिष्ट भ्रांति:** *"कठिन शब्दों के अर्थ रट लो, मुहावरों के शाब्दिक अर्थ लिख दो—परीक्षा में चल जाएगा।"*.',
          parts: [
                { id: 'a', prompt: 'कविता में **"तृण"** और **"धेनु"** शब्द आए हैं। दोनों की व्युत्पत्ति लिखिए और बताइए कि कवि ने इन **तत्सम शब्दों** का चयन **तद्भव समकक्षों** ("तिनका", "गाय") के.', answer: '**Correct Answer:** **व्युत्पत्ति:** - **तृण** = **तृ + ण** (तृण् धातु, अर्थ:',
                  options: ['**Correct Answer:** **व्युत्पत्ति:** - **तृण** = **तृ + ण** (तृण् धातु, अर्थ:', '** में **क्षणभंगुरता, तुच्छता, नश्वरता** का **दार्शनिक भार** है—मनुष्य शरीर को', 'कहना **उपनिषदिक परंपरा** से जोड़ता है।', 'केवल भौतिक वस्तु है। | | **धेनु** | गाय | **'],
                  hint: 'अगर फँसे हों तो **c10_hin_sp_cbse_18_002 (पद्यांश-वार भावार्थ)** पर लौटें—प्रत्येक पंक्ति का.',
                  misconception: '**विशिष्ट भ्रांति:** *"कठिन शब्दों के अर्थ रट लो, मुहावरों के शाब्दिक अर्थ लिख दो—परीक्षा में चल जाएगा।"* **वास्तविकता:** CBSE 2023-24.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Targeted Remediation):** 1.', '**Word-Autopsy (शब्द-शव-परीक्षा):** छात्र से कहें—**"अगले 3 दिन, रोज़ कविता के 3 कठिन शब्द लो। प्रत्येक के लिए: (क).', '**Idiom-Theater (मुहावरा-नाट्य):** प्रत्येक मुहावरे के लिए **दो वाक्य** बनवाएँ: (क) शाब्दिक (हास्यास्पद), (ख) लाक्षणिक.', '**CBSE Marking Scheme Drill:** गत 5 वर्षों के बोर्ड प्रश्नपत्रों से **\'अर्थ/आशय स्पष्ट कीजिए\' प्रश्न** निकालें और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा काव्यात्मक प्रभाव उत्पन्न करने के.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_18_005 (छंद और लय-विधान)** के \'मात्रा-गणना अभ्यास\' और.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ केवल **अलंकार पहचानना** (अनुप्रास, यमक, उपमा) है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा काव्यात्मक प्रभाव उत्पन्न करने के लिए शब्दों',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा काव्यात्मक प्रभाव उत्पन्न करने के लिए शब्दों', 'कवि परिचय में कवि का जीवन-परिचय, साहित्यिक योगदान, युग-प्रवृत्तियाँ और रचनाधर्मिता शामिल', 'पद्यांश-वार भावार्थ (Stanza-wise Detailed Meaning) is the analytical process of', 'काव्य-संरचना (poetic structure) कविता के आंतरिक और बाह्य ढाँचे का वह सुनियोजित विन्यास है'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_18_005 (छंद और लय-विधान)** के \'मात्रा-गणना अभ्यास\' और.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ केवल **अलंकार पहचानना** (अनुप्रास, यमक, उपमा) है। वे **शब्द-क्रम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला चरण**: छात्र से कविता का **कोई एक पद्यांश जोर से पढ़वाएं** — उससे पूछें: "कहां रुकना स्वाभाविक लगा?', 'कौन-से शब्द कानों में मीठे लगे?', 'वाक्य का क्रम अजीब लगा क्या?" — यह **ध्वनि-बोध** जगाता है। 2.', '**दूसरा चरण**: उसी पद्यांश के **शब्दों को सूचीबद्ध करवाएं** — तत्सम/तद्भव/देशज छांटें, अर्थ-छाया (connotation) बताएं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_012', difficulty: 'standard',
          question: 'बोध-प्रश्न वे प्रश्न हैं जो पाठ (गद्य/पद्य) को पढ़ने के बाद उसकी समझ.',
          hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_18_002 (भावार्थ) और c10_hin_sp_cbse_18_007 (प्रतीक-बिंब).',
          misconception: '**सबसे घातक भ्रम:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर = अपनी राय/भावना/पसंद" — वे लिखते हैं "मुझे यह पंक्ति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न वे प्रश्न हैं जो पाठ (गद्य/पद्य) को पढ़ने के बाद उसकी समझ (comprehension)',
                  options: ['बोध-प्रश्न वे प्रश्न हैं जो पाठ (गद्य/पद्य) को पढ़ने के बाद उसकी समझ (comprehension)', 'कवि परिचय में कवि का जीवन-परिचय, साहित्यिक योगदान, युग-प्रवृत्तियाँ और रचनाधर्मिता शामिल', 'पद्यांश-वार भावार्थ (Stanza-wise Detailed Meaning) is the analytical process of', 'काव्य-संरचना (poetic structure) कविता के आंतरिक और बाह्य ढाँचे का वह सुनियोजित विन्यास है'],
                  hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_18_002 (भावार्थ) और c10_hin_sp_cbse_18_007 (प्रतीक-बिंब) दोबारा.',
                  misconception: '**सबसे घातक भ्रम:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर = अपनी राय/भावना/पसंद" — वे लिखते हैं "मुझे यह पंक्ति अच्छी लगी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को एक ही पद्यांश पर **दो प्रश्न** साथ रखकर दिखाएँ — एक वस्तुनिष्ठ ("क्या लिखा है?"), एक आशय-सूचक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
