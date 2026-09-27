import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch22_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch22_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch22_p1',
    title: 'आत्मत्राण · Part 1/3',
    subtitle: 'इस नोड में केवल कवि परिचय (जीवन-यात्रा, प्रमुख रचनाएँ, साहित्यिक स्थान) और.',
    classLevel: 10, subject: 'hin_sp', topic: 'आत्मत्राण · Part 1/3',
    chapters: ['c10_hin_sp_ch22'],
    nodeIds: ['c10_hin_sp_cbse_22_001', 'c10_hin_sp_cbse_22_002', 'c10_hin_sp_cbse_22_003', 'c10_hin_sp_cbse_22_004', 'c10_hin_sp_cbse_22_005', 'c10_hin_sp_cbse_22_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए: आपकी प्रिय नोटबुक परीक्षा से एक दिन पहले खो जाती है — क्या आप रोकर बैठ जाएंगे या पुराने कागजों.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'आत्मत्राण — कवि परिचय और पृष्ठभूमि', text: '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम परिस्थितियों में आत्मबल और सृजनशक्ति के माध्यम से आत्मरक्षा का संकल्प व्यक्त किया है। यह कवि के जीवन-दर्शन — "जूझने.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_22_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['आत्मत्राण — कवि परिचय', 'आत्मत्राण — पद्यांश-वार भावार्थ', 'आत्मत्राण — काव्य-संरचना और', 'आत्मत्राण — केंद्रीय भाव', 'आत्मत्राण — छंद और', 'आत्मत्राण — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_22_005', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['यति-स्थान जांचें — यदि मध्य-विराम की मात्रा-संख्या बदलती.', 'दोनों पदांशों की पंक्तियाँ अलग-अलग लिखें और प्रत्येक की.', 'प्रत्येक पंक्ति की कुल मात्रा लिखें और तुलना करें — यदि.', 'गण-विभाजन करें (यगण/रगण/तगण/नगण) — यदि गण-अनुक्रम निश्चित न.', 'निष्कर्ष लिखें: "मात्रा, गण, यति — तीनों असमान/अनिश्चित →.'], answer: 'दोनों पदांशों की पंक्तियाँ अलग-अलग लिखें और प्रत्येक की. प्रत्येक पंक्ति की कुल मात्रा लिखें और तुलना करें — यदि. गण-विभाजन करें (यगण/रगण/तगण/नगण) — यदि गण-अनुक्रम निश्चित न. यति-स्थान जांचें — यदि मध्य-विराम की मात्रा-संख्या बदलती. निष्कर्ष लिखें: "मात्रा, गण, यति — तीनों असमान/अनिश्चित →.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_22_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through आत्मत्राण like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? आत्मत्राण · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आत्मत्राण · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_001', difficulty: 'standard',
          question: '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत.',
          hint: 'यदि अटके तो कक्षा 9 की \'हिंदी साहित्य का इतिहास — छायावाद\' पाठ दोहराएँ, विशेषकर निराला के.',
          misconception: '**विशिष्ट भ्रांति**: विद्यार्थी \'आत्मत्राण\' को \'आत्महत्या\', \'संन्यास\', \'पलायन\' या \'ईश्वर-शरणागति\' समझ लेते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम',
                  options: ['\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम', '"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process of decoding', 'काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices a poet', 'केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसे कवि संपूर्ण रचना के'],
                  hint: 'यदि अटके तो कक्षा 9 की \'हिंदी साहित्य का इतिहास — छायावाद\' पाठ दोहराएँ, विशेषकर निराला के कॉलम को।',
                  misconception: '**विशिष्ट भ्रांति**: विद्यार्थी \'आत्मत्राण\' को \'आत्महत्या\', \'संन्यास\', \'पलायन\' या \'ईश्वर-शरणागति\' समझ लेते हैं। **कारण**: \'त्राण\' शब्द का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार**: (1) विद्यार्थी से \'त्राण\' शब्द के तीन पर्याय हिंदी में लिखवाएँ — *रक्षा, बचाव, आड़*। (2) शब्दकोश से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_002', difficulty: 'standard',
          question: '"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process.',
          hint: 'यदि पद-छेदन या अन्वय में अटके, तो **कक्षा 9-10 हिंदी व्याकरण के \'पद-परिचय\' और.',
          misconception: '**विशिष्ट भ्रांति:** *"भावार्थ का अर्थ है पद्यांश का \'सारांश\' या \'संदेश\' लिख देना — शब्दों का विस्तार जरूरी नहीं।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process of decoding',
                  options: ['"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process of decoding', '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम', 'काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices a poet', 'केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसे कवि संपूर्ण रचना के'],
                  hint: 'यदि पद-छेदन या अन्वय में अटके, तो **कक्षा 9-10 हिंदी व्याकरण के \'पद-परिचय\' और \'वाक्य-रचना\' अध्याय**.',
                  misconception: '**विशिष्ट भ्रांति:** *"भावार्थ का अर्थ है पद्यांश का \'सारांश\' या \'संदेश\' लिख देना — शब्दों का विस्तार जरूरी नहीं।"* **यह क्यों होता है:**.' }
          ],
            remediations: { '9-summary-writing-10-literal': { steps: ['**चरणबद्ध उपचार (Targeted Remediation):** 1.', '**शब्द-स्तरीय अभ्यास (Word-level drill):** कविता के 5-6 कठिन शब्द/बिंब (जैसे: बीज, अंधेरा, पत्थर, ज्वाला, सोना, दीपक.', '**अन्वय-लेखन अभ्यास (Prose-order writing):** एक पद्यांश दें। छात्र को **पद-छेदन (word segmentation)** → **काव्य-वाक्य →.', '**तुलनात्मक तालिका (Comparative table):** दो कॉलम बनाएँ: **"पद्यांश का शाब्दिक भावार्थ"** vs **"पद्यांश का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_003', difficulty: 'standard',
          question: 'काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices.',
          hint: 'If stuck, review **c10_hin_sp_cbse_22_002 (पद्यांश-वार भावार्थ)** to re-establish meaning.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल **\'कविता कैसी दिखती है\' (visual layout)** है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices a poet',
                  options: ['काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices a poet', '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम', '"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process of decoding', 'केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसे कवि संपूर्ण रचना के'],
                  hint: 'If stuck, review **c10_hin_sp_cbse_22_002 (पद्यांश-वार भावार्थ)** to re-establish meaning of each.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल **\'कविता कैसी दिखती है\' (visual layout)** है — पदों की गिनती.' }
          ],
            remediations: { 'visual-layout': { steps: ['**पुनः पठन (Re-reading):** विद्यार्थी से कहें — कविता को **तीन बार** पढ़ें: (क) केवल अर्थ के लिए (गद्य की तरह), (ख).', '**दृश्य मानचित्रण (Visual Mapping):** A4 शीट पर कविता का **स्केलेटन बनवाएँ** — 6 बक्से (पद), प्रत्येक में 4 रेखाएँ.', '**PEEL लेखन अभ्यास:** एक संरचनात्मक तथ्य (जैसे: \'AABB तुक\') लेकर PEEL पैराग्राफ लिखवाएँ — **P:** तुक-योजना AABB है.', '**तुलनात्मक अभ्यास:** किसी अन्य कविता (जैसे \'साखी\' या \'गीत\') की संरचना से तुलना करवाएँ — समानता/भिन्नता और उसके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसे कवि संपूर्ण.',
          hint: 'यदि अटके तो **कक्षा 9 की हिंदी पाठ्यपुस्तक (स्पर्श/संचयन) का \'रस\' अध्याय** दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'केंद्रीय भाव\' = \'कविता का सारांश (summary)\'** और **\'रस\' = \'कविता का विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसे कवि संपूर्ण रचना के',
                  options: ['केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसे कवि संपूर्ण रचना के', '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम', '"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process of decoding', 'काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices a poet'],
                  hint: 'यदि अटके तो **कक्षा 9 की हिंदी पाठ्यपुस्तक (स्पर्श/संचयन) का \'रस\' अध्याय** दोबारा पढ़ें — विशेषतः.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'केंद्रीय भाव\' = \'कविता का सारांश (summary)\'** और **\'रस\' = \'कविता का विषय (topic)\'**। **ठीक.' }
          ],
            remediations: { 'summary-topic': { steps: ['**पहला चरण:** छात्र से कहें — "कविता की कोई **एक पंक्ति** चुनो जो तुम्हें सबसे ज्यादा \'झकझोरती\' (moves) है। उसे लिखो और.', '(वीरता/करुणा/गर्व/शोक)" — यह **स्थायी भाव की पहचान** कराता है। 2.', '**दूसरा चरण:** उसी पंक्ति के लिए पूछें — "यह भाव **किसके प्रति** जागा?', '(आलंबन) और **किस कारण/उत्तेजना** से?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_005', difficulty: 'standard',
          question: 'छंद (meter) is the fixed structural framework of a verse defined by specific.',
          hint: 'यदि मात्रा गिनने में अटके → Class 9 "छंद परिचय" नोट्स देखें: ह्रस्व (अ, इ, उ) = 0.5.',
          misconception: '**विशिष्ट भ्रान्ति:** छात्र मानते हैं कि "मुक्त छंद = बिना लय की कविता" या "मुक्त छंद में मात्रा गिनने की जरूरत नहीं"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद (meter) is the fixed structural framework of a verse defined by specific rules of',
                  options: ['छंद (meter) is the fixed structural framework of a verse defined by specific rules of', '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम', '"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process of decoding', 'काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices a poet'],
                  hint: 'यदि मात्रा गिनने में अटके → Class 9 "छंद परिचय" नोट्स देखें: ह्रस्व (अ, इ, उ) = 0.5, दीर्घ (आ, ई.',
                  misconception: '**विशिष्ट भ्रान्ति:** छात्र मानते हैं कि "मुक्त छंद = बिना लय की कविता" या "मुक्त छंद में मात्रा गिनने की जरूरत नहीं"। **वास्तविकता:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्अभ्यास:** छात्र से कहें — "किसी भी दो पंक्तियों की मात्राएँ गिनो और लिखो: \'पंक्ति 1: X मात्रा, पंक्ति 2:.', 'नहीं। तो यह निश्चित छंद नहीं।\'" — इसे 3 अलग पदांशों पर करवाएँ। 2.', '**श्रवण-अभ्यास:** कविता का ऑडियो चलवाएँ (या स्वयं पढ़ें) और छात्र से कहें — "हाथ से बीट (beat) मारो जहाँ तुम्हें.', 'वही लय है बिना छंद के।" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_006', difficulty: 'standard',
          question: 'अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष प्रयोग से काव्य.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_22_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_22_003.',
          misconception: '**विशिष्ट भ्रम:** छात्र **यमक** और **श्लेष** को एक मान लेते हैं क्योंकि दोनों में "एक शब्द, अनेक अर्थ/रूप" आता है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष प्रयोग से काव्य की शोभा',
                  options: ['अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष प्रयोग से काव्य की शोभा', '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम', '"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process of decoding', 'काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices a poet'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_22_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_22_003.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **यमक** और **श्लेष** को एक मान लेते हैं क्योंकि दोनों में "एक शब्द, अनेक अर्थ/रूप" आता है। **सटीक अंतर:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**दो कॉलम बनाएँ:** बाएँ "यमक", दाएँ "श्लेष"। 2.', '**यमक के लिए:** कविता से कोई शब्द चुनें जो **दो बार आया हो** (जैसे "ज्योति ज्योति") — लिखें: पहली बार अर्थ X, दूसरी बार.', '**श्लेष के लिए:** कोई शब्द चुनें जो **एक बार आया हो** पर **दो अर्थ एक साथ** देता हो (जैसे "कमल" = फूल भी, नेत्र भी).', '**नियम याद करें:** "बार-बार आए तो यमक, एक बार में दो अर्थ तो श्लेष।" 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
