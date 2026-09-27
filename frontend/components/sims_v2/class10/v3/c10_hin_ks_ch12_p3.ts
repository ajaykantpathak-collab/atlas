import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch12_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch12_p3',
    title: 'पाठ 12 · Part 3/3',
    subtitle: 'यह नोड **केवल** कक्षा 10 क्षितिज पाठ 12 के पद्यांशों के लिए आशय-स्पष्टीकरण लेखन की.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 12 · Part 3/3',
    chapters: ['c10_hin_ks_ch12'],
    nodeIds: ['c10_hin_ks_cbse_12_013', 'c10_hin_ks_cbse_12_014', 'c10_hin_ks_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना करो कि परीक्षा में तुम्हें पाठ 12 का एक पद्यांश दिया गया है और लिखा है — *"आशय स्पष्ट कीजिए"*। सबसे.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण एक संरचित लेखन कौशल है जिसमें किसी पद्यांश/गद्यांश के दिए गए अंश का **संदर्भ (प्रसंग), भावार्थ (शाब्दिक अर्थ), और गहन विश्लेषण (केंद्रीय भाव, शैलीगत विशेषताएँ, कलात्मकता)** को क्रमबद्ध.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — आशय-स्पष्टीकरण', 'पाठ 12 — परीक्षा-उत्तर', 'पाठ 12 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_12_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 3/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — आशय-स्पष्टीकरण एक संरचित लेखन कौशल है जिसमें किसी पद्यांश/गद्यांश के दिए गए अंश का.', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — \'वाचन-पाठ और चर्चा-बिंदु\' वह सहयोगात्मक अधिगम प्रक्रिया है जिसमें छात्र कविता को लय, भाव.', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 12 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण एक संरचित लेखन कौशल है जिसमें किसी पद्यांश/गद्यांश के दिए गए अंश.',
          hint: 'यदि अटके तो **c10_hin_ks_cbse_12_006 (अलंकार)** और **c10_hin_ks_cbse_12_007.',
          misconception: '**सबसे घातक भ्रम:** "आशय-स्पष्टीकरण का अर्थ है पद्यांश का हिंदी अनुवाद (भावार्थ) लिख देना।" छात्र ऐसा इसलिए करते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण एक संरचित लेखन कौशल है जिसमें किसी पद्यांश/गद्यांश के दिए गए अंश का',
                  options: ['आशय-स्पष्टीकरण एक संरचित लेखन कौशल है जिसमें किसी पद्यांश/गद्यांश के दिए गए अंश का', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (बंध) को अलग-अलग पढ़कर उसके', 'काव्य-संरचना कविता के बाहरी ढाँचे (छंद, पद, चरण, मात्रा, गति, यति, विराम) और आंतरिक'],
                  hint: 'यदि अटके तो **c10_hin_ks_cbse_12_006 (अलंकार)** और **c10_hin_ks_cbse_12_007 (प्रतीक/बिंब)** के.',
                  misconception: '**सबसे घातक भ्रम:** "आशय-स्पष्टीकरण का अर्थ है पद्यांश का हिंदी अनुवाद (भावार्थ) लिख देना।" छात्र ऐसा इसलिए करते हैं क्योंकि कक्षा 9 तक.' }
          ],
            remediations: { '9-10-12': { steps: ['**चरण 1:** छात्र से कहो — "पहले केवल भावार्थ लिखो, फिर मुझसे पूछो: \'इस पंक्ति में कवि ने *ऐसा क्यों कहा*?\' जब तक तुम.', '**चरण 2:** एक मॉडल उत्तर दिखाओ जिसमें PEEL संरचना हो — छात्र को प्रत्येक चरण (Point, Evidence, Explanation, Link) को.', '**चरण 3:** रोज़ एक पद्यांश का 5-मिनट टाइम्ड अभ्यास करवाओ; केवल विश्लेषण भाग पर फीडबैक दो। 4.', '**चरण 4:** पिछले 3 वर्षों के CBSE टॉपर्स के उत्तर दिखाओ — उनमें भावार्थ 20% और विश्लेषण 80% होता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल वह व्यवस्थित प्रक्रिया है जिसमें छात्र प्रश्न की मांग.',
          hint: 'यदि अटके: **c10_hin_ks_cbse_12_013 (आशय-स्पष्टीकरण अभ्यास)** पर लौटें — वही Explanation.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"उत्तर में कठिन शब्द, लंबे वाक्य और शुद्ध हिंदी लिखने से अंक मिलते हैं"**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल वह व्यवस्थित प्रक्रिया है जिसमें छात्र प्रश्न की मांग को समझकर,',
                  options: ['परीक्षा-उत्तर लेखन कौशल वह व्यवस्थित प्रक्रिया है जिसमें छात्र प्रश्न की मांग को समझकर,', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (बंध) को अलग-अलग पढ़कर उसके', 'काव्य-संरचना कविता के बाहरी ढाँचे (छंद, पद, चरण, मात्रा, गति, यति, विराम) और आंतरिक'],
                  hint: 'यदि अटके: **c10_hin_ks_cbse_12_013 (आशय-स्पष्टीकरण अभ्यास)** पर लौटें — वही Explanation लिखने का.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"उत्तर में कठिन शब्द, लंबे वाक्य और शुद्ध हिंदी लिखने से अंक मिलते हैं"**। वास्तविकता: CBSE हिंदी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**निदान:** छात्र से 3-अंक का एक प्रश्न हल करवाएं और उसका उत्तर **PEEL चिह्नक (P, E, E, L) लगाकर** दिखाने को कहें — जहां.', '**मॉडलिंग:** उसी प्रश्न का **आदर्श उत्तर** बोर्ड अंकन योजना के साथ दिखाएं — प्रत्येक चरण के आगे **(1 अंक)** लिखें। 3.', '**अभ्यास:** छात्र को **केवल Explanation चरण** लिखने का अभ्यास कराएं — 5 अलग-अलग उद्धरणों पर, क्योंकि यही वह चरण है जहां.', '**फीडबैक लूप:** प्रत्येक अभ्यास के बाद छात्र स्वयं जांचे: "क्या मैंने बताया **कैसे/क्यों**?" — यदि नहीं, तो पुनः लिखें।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_015', difficulty: 'standard',
          question: '\'वाचन-पाठ और चर्चा-बिंदु\' वह सहयोगात्मक अधिगम प्रक्रिया है जिसमें छात्र कविता.',
          hint: 'यदि अटके तो c10_hin_ks_cbse_12_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_12_007.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'वाचन-पाठ\' का अर्थ है कविता को **याद करके सुना देना** (recitation from memory).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-पाठ और चर्चा-बिंदु\' वह सहयोगात्मक अधिगम प्रक्रिया है जिसमें छात्र कविता को लय, भाव',
                  options: ['\'वाचन-पाठ और चर्चा-बिंदु\' वह सहयोगात्मक अधिगम प्रक्रिया है जिसमें छात्र कविता को लय, भाव', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (बंध) को अलग-अलग पढ़कर उसके', 'काव्य-संरचना कविता के बाहरी ढाँचे (छंद, पद, चरण, मात्रा, गति, यति, विराम) और आंतरिक'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_12_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_12_007 (प्रतीक और बिंब).',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'वाचन-पाठ\' का अर्थ है कविता को **याद करके सुना देना** (recitation from memory) और \'चर्चा\' का अर्थ.' }
          ],
            remediations: { 'recitation-from-memory': { steps: ['**पहला कदम — वाचन का विघटन (Deconstruct Reading):** छात्र को एक छोटी पंक्ति दें (जैसे: "धूप खिली, मन खिला")। कहें: "इसे.', '**दूसरा कदम — चर्चा का पुनर्निर्माण:** एक विवादास्पद कथन दें (जैसे: "कविता का नायक कायर है")। कहें: "पाठ से **दो प्रमाण.', '**तीसरा कदम — मेटाकॉग्निटिव प्रॉम्प्ट:** चर्चा के बाद पूछें: "तुम्हारा विचार **शुरू में क्या था** और **अब क्या है**?', 'किस सहपाठी की बात ने बदला?" यह चर्चा को **चिंतन-प्रक्रिया** बनाता है, **निष्कर्ष-उत्पाद** नहीं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
