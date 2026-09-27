import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch16_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch16_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch16_p3',
    title: 'साखी · Part 3/3',
    subtitle: 'यह नोड **केवल** कबीर की साखियों के **आशय-स्पष्टीकरण और विश्लेषण लेखन कौशल** पर केंद्रित.',
    classLevel: 10, subject: 'hin_sp', topic: 'साखी · Part 3/3',
    chapters: ['c10_hin_sp_ch16'],
    nodeIds: ['c10_hin_sp_cbse_16_013', 'c10_hin_sp_cbse_16_014', 'c10_hin_sp_cbse_16_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'बोर्ड परीक्षा में जब प्रश्न आता है: "निम्नलिखित पंक्तियों का आशय स्पष्ट कीजिए — \'धीरे-धीरे रे मना, धीरे सब.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'साखी — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण किसी पद्यांश/पंक्ति के **अंतर्निहित गूढ़ार्थ, प्रसंगानुकूल अभिप्राय, और कवि के उद्देश्य** को सप्रमाण (पंक्तियों के आधार पर) स्पष्ट करने की प्रक्रिया है; विश्लेषण उस अर्थ की **संरचना.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_16_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['साखी — आशय-स्पष्टीकरण और', 'साखी — परीक्षा-उत्तर लेखन', 'साखी — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_16_015', title: 'You made it',
          caseStudy: { intro: 'You finished साखी — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण किसी पद्यांश/पंक्ति के **अंतर्निहित गूढ़ार्थ, प्रसंगानुकूल.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_16_002 (भावार्थ)** और **c10_hin_sp_cbse_16_007.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **आशय-स्पष्टीकरण = भावार्थ + एक-दो प्रतीक**। वे **प्रसंग (कौन, किससे, कब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण किसी पद्यांश/पंक्ति के **अंतर्निहित गूढ़ार्थ, प्रसंगानुकूल अभिप्राय, और',
                  options: ['आशय-स्पष्टीकरण किसी पद्यांश/पंक्ति के **अंतर्निहित गूढ़ार्थ, प्रसंगानुकूल अभिप्राय, और', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_16_002 (भावार्थ)** और **c10_hin_sp_cbse_16_007 (प्रतीक/बिंब)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **आशय-स्पष्टीकरण = भावार्थ + एक-दो प्रतीक**। वे **प्रसंग (कौन, किससे, कब, क्यों)** और **केंद्रीय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडल उत्तर दिखाएँ:** बोर्ड के **नमूना उत्तर (Sample Answer)** और **टॉपर उत्तर** साथ रखें — अंतर चिह्नित करें (प्रसंग.', '**टेम्पलेट दें:** एक **4-कॉलम शीट** दें: पंक्ति | प्रसंग | गूढ़ार्थ+प्रतीक | केंद्रीय भाव/अलंकार — 5 साखियों पर अभ्यास.', '**लाइव मॉडलिंग:** कक्षा में एक पंक्ति लें, **सोचते हुए बोलकर** चारों चरण लिखें — छात्र देखें कि शिक्षक **कैसे सोचता.', '**पीयर रिव्यू:** छात्र एक-दूसरे के उत्तर जाँचें — **चेकलिस्ट** दें: "क्या प्रसंग है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_014', difficulty: 'standard',
          question: 'साखी — परीक्षा-उत्तर लेखन कौशल का अर्थ है कविता के विश्लेषण पर आधारित संरचित.',
          hint: 'यदि छात्र फंसें तो c10_hin_sp_cbse_16_004 (साखी — केंद्रीय भाव और रस) और.',
          misconception: 'छात्र अक्सर साखी के उत्तर में केवल कविता की भावधारा लिख देते हैं (जैसे "शांति दिखाती है") लेकिन प्रश्न के विशिष्ट घटक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'साखी — परीक्षा-उत्तर लेखन कौशल का अर्थ है कविता के विश्लेषण पर आधारित संरचित उत्तर लिखने',
                  options: ['साखी — परीक्षा-उत्तर लेखन कौशल का अर्थ है कविता के विश्लेषण पर आधारित संरचित उत्तर लिखने', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'यदि छात्र फंसें तो c10_hin_sp_cbse_16_004 (साखी — केंद्रीय भाव और रस) और c10_hin_sp_cbse_16_006.',
                  misconception: 'छात्र अक्सर साखी के उत्तर में केवल कविता की भावधारा लिख देते हैं (जैसे "शांति दिखाती है") लेकिन प्रश्न के विशिष्ट घटक (जैसे अलंकार की पहचान.' }
          ],
            remediations: { 'effect': { steps: ['छात्र को दिखाइए कि एक प्रश्न के सभी घटकों को कैसे पहचाना जाए: पहले प्रश्न को शब्द-शब्द तोड़िए (जैसे "रूपक अलंकार".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_015', difficulty: 'standard',
          question: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है — कविता/पाठ को सही उच्चारण, लय और भाव के साथ.',
          hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_16_002 (भावार्थ) और c10_hin_sp_cbse_16_007.',
          misconception: 'विद्यार्थी समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल \'जोर से पढ़ना\' है और \'चर्चा\' का अर्थ \'शिक्षक के प्रश्नों का उत्तर देना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है',
                  options: ['वाचन-पाठ और चर्चा-बिंदु का अर्थ है', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_16_002 (भावार्थ) और c10_hin_sp_cbse_16_007 (प्रतीक-बिंब).',
                  misconception: 'विद्यार्थी समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल \'जोर से पढ़ना\' है और \'चर्चा\' का अर्थ \'शिक्षक के प्रश्नों का उत्तर देना\' है। वास्तव में वाचन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: विद्यार्थी से कहो — \'पद को तीन तरह से पढ़ो: (क) केवल शब्द, (ख) अर्थ पर बल देकर, (ग) भाव में डूबकर। अंतर महसूस.', 'क्यों?\' चरण 3: चर्चा के लिए \'प्रश्न-त्रिकोण\' दो — शब्दार्थ, भावार्थ, प्रसंगिकता — और कहो: \'प्रत्येक कोने से एक प्रश्न.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
