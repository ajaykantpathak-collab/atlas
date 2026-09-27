import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch01_p3: SimDef = {
    id: 'v3_c11_hin_a_ch01_p3',
    title: 'पाठ 1 · Part 3/3',
    subtitle: 'यह नोड **केवल** विश्लेषण और व्याख्या की *प्रक्रिया* और *उत्तर-लेखन संरचना* सिखाता है.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 1 · Part 3/3',
    chapters: ['c11_hin_a_ch01'],
    nodeIds: ['c11_hin_a_cbse_01_013', 'c11_hin_a_cbse_01_014', 'c11_hin_a_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना करें बोर्ड परीक्षा में प्रश्न आया: *"पाठ में प्रयुक्त \'अंधेरे\' प्रतीक की व्याख्या कीजिए।"* अधिकांश.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक रचना के तत्वों — कथानक, पात्र, भाषा, शिल्प, प्रतीक — को व्यवस्थित ढंग से विखंडित (analyze) कर उनके पारस्परिक संबंध और रचनाकार के अभिप्राय को स्पष्ट.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — आलोचनात्मक', 'पाठ 1 — लेखन', 'पाठ 1 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_01_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 3/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें छात्र किसी दिए गए गद्यांश/पद्यांश का गहन अध्ययन.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक **सहयोगी संप्रेषण कौशल (Collaborative Communication Skill)**.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 1 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक रचना के तत्वों — कथानक.',
          hint: 'यदि किसी युक्ति (जैसे प्रतीक) की पहचान में अटकें, तो c11_hin_a_cbse_01_008 और 01_009.',
          misconception: '**"विश्लेषण का अर्थ है पाठ की कमियाँ निकालना।"** कक्षा 11 के छात्र प्रायः \'आलोचनात्मक\' (critical) शब्द को नकारात्मक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक रचना के तत्वों',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक रचना के तत्वों', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the analytical study', 'कथानक (Plot) कथा की घटनाओं का **कार्य-कारण सम्बन्ध (causal sequence)** पर आधारित तार्किक', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र भौतिक, सामाजिक,'],
                  hint: 'यदि किसी युक्ति (जैसे प्रतीक) की पहचान में अटकें, तो c11_hin_a_cbse_01_008 और 01_009 दोबारा पढ़ें.',
                  misconception: '**"विश्लेषण का अर्थ है पाठ की कमियाँ निकालना।"** कक्षा 11 के छात्र प्रायः \'आलोचनात्मक\' (critical) शब्द को नकारात्मक अर्थ में लेते हैं और.' }
          ],
            remediations: { '11-critical-analytical-evaluative': { steps: ['**शब्दकोश स्पष्टीकरण:** छात्र के साथ बैठकर \'Critical\' के दो अर्थ दिखाएँ — (क) दोष-निरूपण, (ख) सूक्ष्म परीक्षण; साहित्य.', '**मॉडल उत्तर तुलना:** एक ही अंश पर लिखा \'दोष-निरूपण\' उत्तर और \'विश्लेषणात्मक\' उत्तर साथ रखें; छात्र से पूछें: "कौन-सा.', '**अभ्यास:** एक छोटा अनुच्छेद दें और कहें: "इसमें तीन साहित्यिक युक्तियाँ ढूँढ़ो और बताओ प्रत्येक *क्या काम कर रही है*।".', '**फीडबैक लूप:** छात्र का अगला विश्लेषण पढ़कर केवल यह टिप्पणी दें: "तुमने युक्ति पहचानी, अब बताओ यह युक्ति *पाठ के अर्थ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें छात्र किसी दिए गए गद्यांश/पद्यांश का.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_01_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** दोहराएँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"उद्धरण (Quote) जितना लंबा होगा, अंक उतने अधिक मिलेंगे।"** इसके विपरीत, बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें छात्र किसी दिए गए गद्यांश/पद्यांश का गहन अध्ययन',
                  options: ['पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें छात्र किसी दिए गए गद्यांश/पद्यांश का गहन अध्ययन', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the analytical study', 'कथानक (Plot) कथा की घटनाओं का **कार्य-कारण सम्बन्ध (causal sequence)** पर आधारित तार्किक', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र भौतिक, सामाजिक,'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_01_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** दोहराएँ — विशेष रूप.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"उद्धरण (Quote) जितना लंबा होगा, अंक उतने अधिक मिलेंगे।"** इसके विपरीत, बोर्ड परीक्षा में **सटीक.' }
          ],
            remediations: { 'quote': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**उद्धरण काटने का अभ्यास (Quote Trimming Drill):** छात्र को पाठ के 5 प्रसंग दें और कहें: "प्रत्येक से **अधिकतम 8-10.', '**PEEL रंग-कोडिंग (Color-Coding):** छात्र के लिखे उत्तर में चार रंगों से हाइलाइट करवाएँ: Point (नीला), Evidence (हरा).', '**मॉडल उत्तर से तुलना:** बोर्ड के **टॉपर उत्तर पुस्तिका (Model Answer Script)** का एक पैराग्राफ दिखाएँ और छात्र से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक **सहयोगी संप्रेषण कौशल (Collaborative Communication.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_01_012 (बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक)**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ पाठ के \'कठिन शब्दों/प्रसंगों की व्याख्या करना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक **सहयोगी संप्रेषण कौशल (Collaborative Communication Skill)**',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक **सहयोगी संप्रेषण कौशल (Collaborative Communication Skill)**', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the analytical study', 'कथानक (Plot) कथा की घटनाओं का **कार्य-कारण सम्बन्ध (causal sequence)** पर आधारित तार्किक', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र भौतिक, सामाजिक,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_01_012 (बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक)** के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ पाठ के \'कठिन शब्दों/प्रसंगों की व्याख्या करना\' (Explaining Difficult.' }
          ],
            remediations: { 'explaining-difficult-words-passages-doubt': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**\'क्या\' से \'क्यों/कैसे\' की ओर मोड़ें (Shift from What to Why/How):** छात्र से कहें: "जो तुमने समझाया, वह पाठ में.', 'अगर वह इसे सरल भाषा में लिख देता तो क्या फर्क पड़ता?" 2.', '**\'व्याख्या\' को \'तर्क\' में बदलें (Convert Explanation to Argument):** छात्र को एक **दावा (Claim)** बनाने को कहें: "एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
