import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch06_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch06_p3',
    title: 'पाठ 6 · Part 3/3',
    subtitle: 'Covers: Step-by-step method for writing CBSE-style आशय-स्पष्टीकरण answers for नागार्जुन\'s.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 6 · Part 3/3',
    chapters: ['c10_hin_ks_ch06'],
    nodeIds: ['c10_hin_ks_cbse_06_013', 'c10_hin_ks_cbse_06_014', 'c10_hin_ks_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'You\'re staring at a 3-mark question: "निम्नलिखित पंक्तियों का आशय स्पष्ट कीजिए" — and your mind goes blank.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'दोनों कविताओं ("यह दंतुरित मुस्कान" और "फसल") में प्रकृति-चित्रण (प्रकृति बिंब) कैसे भिन्न हैं?',
        options: ['**Correct analysis:** - "यह दंतुरित मुस्कान": प्रकृति **उपमान** के रूप में', 'यह दंतुरित मुस्कान', 'चाँदनी'],
        answer: '**Correct analysis:** - "यह दंतुरित मुस्कान": प्रकृति **उपमान** के रूप में',
        hook: '**"आशय स्पष्टीकरण = पंक्तियों का भावार्थ लिख देना"** — Students treat it as translation.',
    },
    teaching: [
        { title: 'पाठ 6 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण (explanation of meaning) is the structured skill of interpreting a given poetic excerpt by (1) stating its literal meaning, (2) identifying the literary devices (alankar, prateek.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — आशय-स्पष्टीकरण', 'पाठ 6 — परीक्षा-उत्तर', 'पाठ 6 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_06_013', title: 'पाठ 6 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास',
          caseStudy: { intro: 'You\'re staring at a 3-mark question: "निम्नलिखित पंक्तियों का आशय स्पष्ट कीजिए" — and your mind goes blank.',
            decisions: [{ prompt: 'नागार्जुन की कविता "यह दंतुरित मुस्कान" में "दंतुरित" शब्द का शाब्दिक अर्थ क्या है और यह किस अलंकार का उदाहरण है?', options: [
                { text: '**Correct answer:** "दंतुरित" का शाब्दिक अर्थ है "दाँत निकलने की अवस्था में" या "नवजात', outcome: '**Correct answer:** "दंतुरित" का शाब्दिक अर्थ है "दाँत निकलने की अवस्था में" या "नवजात शिशु जिसके.' },
                { text: 'दंतुरित', outcome: 'Not quite — **"आशय स्पष्टीकरण = पंक्तियों का भावार्थ लिख देना"** — Students treat it as translation.', reveals: 'students-treat-it-as-translation' },
                { text: 'दाँत निकलने की अवस्था में', outcome: 'Not quite — **"आशय स्पष्टीकरण = पंक्तियों का भावार्थ लिख देना"** — Students treat it as translation.', reveals: 'students-treat-it-as-translation' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 6 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण (explanation of meaning) is the structured skill of interpreting.',
          hint: 'Return to c10_hin_ks_cbse_06_006 (अलंकार अभ्यास) and c10_hin_ks_cbse_06_007 (बिंब-प्रतीक.',
          misconception: '**"आशय स्पष्टीकरण = पंक्तियों का भावार्थ लिख देना"** — Students treat it as translation.',
          parts: [
                { id: 'a', prompt: '"यह दंतुरित मुस्कान" कविता में कवि ने शिशु की मुस्कान को "कली" कहा है। यदि परीक्षा में पूछा जाए: "कली उपमान से कवि क्या कहना चाहता है?" तो आप 3 चरणों में उत्तर.', answer: '**Correct 3-step answer:** 1',
                  options: ['**Correct 3-step answer:** 1', 'कली मतलब फूल'],
                  hint: 'Return to c10_hin_ks_cbse_06_006 (अलंकार अभ्यास) and c10_hin_ks_cbse_06_007 (बिंब-प्रतीक विश्लेषण).',
                  misconception: '**"आशय स्पष्टीकरण = पंक्तियों का भावार्थ लिख देना"** — Students treat it as translation.' },
                { id: 'b', prompt: 'दोनों कविताओं ("यह दंतुरित मुस्कान" और "फसल") में प्रकृति-चित्रण (प्रकृति बिंब) कैसे भिन्न हैं?', answer: '**Correct analysis:** - "यह दंतुरित मुस्कान": प्रकृति **उपमान** के रूप में',
                  options: ['**Correct analysis:** - "यह दंतुरित मुस्कान": प्रकृति **उपमान** के रूप में', 'यह दंतुरित मुस्कान', 'चाँदनी', ': प्रकृति **कर्मभूमि** के रूप में —'],
                  hint: 'Return to c10_hin_ks_cbse_06_006 (अलंकार अभ्यास) and c10_hin_ks_cbse_06_007 (बिंब-प्रतीक विश्लेषण).',
                  misconception: '**"आशय स्पष्टीकरण = पंक्तियों का भावार्थ लिख देना"** — Students treat it as translation.' }
          ],
            remediations: { 'students-treat-it-as-translation': { steps: ['**Model the 4-part template** on board: (उद्धरण) → (अलंकार नाम) → (बिंब/शब्द का भाव-प्रभाव) → (केंद्रीय भाव से संबंध).', 'Give a **weak answer** ("बच्चा हँस रहा है") and a **strong answer** side-by-side; ask student to label each part in the.', 'Assign **daily 5-minute drill**: Pick 2 lines from the chapter, fill the 4-part template in writing.', '**Feedback loop**: Teacher checks only for *presence of all 4 parts* — not elegance — for first 5 attempts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"आशय स्पष्टीकरण = पंक्तियों का भावार्थ लिख देना"** — Students treat it as translation.',
          parts: [
                { id: 'a', prompt: 'कथन: "नागार्जुन की दोनों कविताओं में \'आशा\' का भाव प्रमुख है, पर उसकी अभिव्यक्ति भिन्न है।" इस कथन का मूल्यांकन कीजिए। क्या आप सहमत हैं?', answer: '**Correct evaluation:** **सहमत, पर भेद स्पष्ट है।** - "यह दंतुरित मुस्कान": आशा',
                  options: ['**Correct evaluation:** **सहमत, पर भेद स्पष्ट है।** - "यह दंतुरित मुस्कान": आशा', 'यह दंतुरित मुस्कान', 'तुम्हारी यह मुस्कान / न भूलूँगा कभी', ': आशा **वर्तमानोन्मुखी, ठोस, श्रम-जनित** —'],
                  hint: 'Return to c10_hin_ks_cbse_06_006 (अलंकार अभ्यास) and c10_hin_ks_cbse_06_007 (बिंब-प्रतीक विश्लेषण).',
                  misconception: '**"आशय स्पष्टीकरण = पंक्तियों का भावार्थ लिख देना"** — Students treat it as translation.' }
          ],
            remediations: { 'students-treat-it-as-translation': { steps: ['**Model the 4-part template** on board: (उद्धरण) → (अलंकार नाम) → (बिंब/शब्द का भाव-प्रभाव) → (केंद्रीय भाव से संबंध).', 'Give a **weak answer** ("बच्चा हँस रहा है") and a **strong answer** side-by-side; ask student to label each part in the.', 'Assign **daily 5-minute drill**: Pick 2 lines from the chapter, fill the 4-part template in writing.', '**Feedback loop**: Teacher checks only for *presence of all 4 parts* — not elegance — for first 5 attempts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल वह क्षमता है जिससे छात्र CBSE बोर्ड परीक्षा के प्रश्नों.',
          hint: 'c10_hin_ks_cbse_06_013 (आशय-स्पष्टीकरण और विश्लेषण अभ्यास) दोहराएं — विशेष रूप से.',
          misconception: '**विशिष्ट भ्रांति:** "ज्यादा लिखने से ज्यादा अंक मिलते हैं।" छात्र 3-अंक के प्रश्न में 150 शब्द लिख डालते हैं — पूरा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल वह क्षमता है जिससे छात्र CBSE बोर्ड परीक्षा के प्रश्नों का उत्तर',
                  options: ['परीक्षा-उत्तर लेखन कौशल वह क्षमता है जिससे छात्र CBSE बोर्ड परीक्षा के प्रश्नों का उत्तर', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन की प्रमुख घटनाएँ, शैक्षिक और सांस्कृतिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक बंद (stanza) के शब्दों, प्रसंग और भाव को', 'काव्य-संरचना कविता के बाह्य रूप-विधान को कहते हैं'],
                  hint: 'c10_hin_ks_cbse_06_013 (आशय-स्पष्टीकरण और विश्लेषण अभ्यास) दोहराएं — विशेष रूप से "साक्ष्य →.',
                  misconception: '**विशिष्ट भ्रांति:** "ज्यादा लिखने से ज्यादा अंक मिलते हैं।" छात्र 3-अंक के प्रश्न में 150 शब्द लिख डालते हैं — पूरा पाठ सारांशित कर देते.' }
          ],
            remediations: { '3-150': { steps: ['**अंकन योजना दिखाएं:** CBSE नमूना पत्र की अंकन योजना खोलें — दर्शाएं कि 3 अंक के लिए 3 पंक्तियाँ.', '**सारांश को PEEL में बदलें:** छात्र का लिखा लंबा उत्तर लें, उसे 3 बिंदुओं में तोड़ें, प्रत्येक में साक्ष्य जोड़ें.', '**समयबद्ध अभ्यास:** पिछले वर्ष के 5 प्रश्न दें, 10 मिनट/प्रश्न — केवल PEEL संरचना में लिखने का अभ्यास। 4.', '**चेकलिस्ट सहकर्मी समीक्षा:** साथी से चेकलिस्ट करवाएं: (☐ बिंदु स्पष्ट?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_06_015', difficulty: 'standard',
          question: 'वाचन-पाठ काव्य/गद्य को शुद्ध उच्चारण, उचित विराम, बलाघात (stress), लय और.',
          hint: 'यदि अटके तो नोड 008 (केंद्रीय भाव) और नोड 005 (छंद/लय) दोहराएँ — ये वाचन और चर्चा की रीढ़.',
          misconception: 'छात्र मानते हैं कि \'वाचन\' का अर्थ केवल शुद्ध उच्चारण (pronunciation) है और \'चर्चा\' का अर्थ कविता का सारांश (summary).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ काव्य/गद्य को शुद्ध उच्चारण, उचित विराम, बलाघात (stress), लय और भावाभिव्यक्ति के',
                  options: ['वाचन-पाठ काव्य/गद्य को शुद्ध उच्चारण, उचित विराम, बलाघात (stress), लय और भावाभिव्यक्ति के', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन की प्रमुख घटनाएँ, शैक्षिक और सांस्कृतिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक बंद (stanza) के शब्दों, प्रसंग और भाव को', 'काव्य-संरचना कविता के बाह्य रूप-विधान को कहते हैं'],
                  hint: 'यदि अटके तो नोड 008 (केंद्रीय भाव) और नोड 005 (छंद/लय) दोहराएँ — ये वाचन और चर्चा की रीढ़ हैं।',
                  misconception: 'छात्र मानते हैं कि \'वाचन\' का अर्थ केवल शुद्ध उच्चारण (pronunciation) है और \'चर्चा\' का अर्थ कविता का सारांश (summary) बताना है। वे विराम.' }
          ],
            remediations: { 'pronunciation-summary': { steps: ['**मॉडल वाचन**: शिक्षक उसी पद को दो बार पढ़े — पहले सपाट, फिर भाव/विराम/बलाघात के साथ; छात्र से अंतर लिखवाएँ। 2.', '**विराम-चिह्न अभ्यास**: बिना विराम चिह्न वाला पद दें; छात्र अर्थ-इकाइयाँ (sense groups) रंगीन पेंसिल से घेरें, फिर.', '**बलाघात-खेल**: एक वाक्य में हर बार अलग शब्द पर बल देकर अर्थ-परिवर्तन दिखाएँ (उदा.', '"मैं कल गया था" — मैं/कल/गया/था)। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
