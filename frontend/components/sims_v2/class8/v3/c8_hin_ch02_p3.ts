import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch02_p3: SimDef = {
    id: 'v3_c8_hin_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'यह नोड पाठ 2 के संदर्भ में विश्लेषण-व्याख्या की प्रक्रिया सिखाता है: प्रमाण-आधारित तर्क.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c8_hin_ch02'],
    nodeIds: ['c8_hin_cbse_02_013', 'c8_hin_cbse_02_014', 'c8_hin_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुमने एक नया मोबाइल गेम खेला और दोस्त पूछे "कैसा लगा?" — तुम केवल "अच्छा था" नहीं कहोगे, बल्कि.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या का अर्थ है किसी पाठ के घटकों (कथानक, पात्र, भाषा, युक्तियाँ) को अलग-अलग करके उनकी पारस्परिक क्रिया समझना, फिर उनसे लेखक का उद्देश्य, गहरा अर्थ और पाठ का प्रभाव.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_02_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 3/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) के प्रमाणों (उद्धरण, घटना.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) are carefully framed, open-ended prompts based on the.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 2 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या का अर्थ है किसी पाठ के घटकों (कथानक.',
          hint: 'यदि फँस जाए तो c8_hin_cbse_02_012 (बोध-प्रश्न) पर लौटकर आशय-सूचक प्रश्नों का अभ्यास करे.',
          misconception: 'छात्र समझते हैं कि "विश्लेषण" का अर्थ है पाठ में से सुंदर वाक्य छाँटकर लिख देना या अलंकारों के नाम गिना देना। वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या का अर्थ है किसी पाठ के घटकों (कथानक, पात्र, भाषा,',
                  options: ['आलोचनात्मक चिंतन: विश्लेषण और व्याख्या का अर्थ है किसी पाठ के घटकों (कथानक, पात्र, भाषा,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'यदि फँस जाए तो c8_hin_cbse_02_012 (बोध-प्रश्न) पर लौटकर आशय-सूचक प्रश्नों का अभ्यास करे — वही.',
                  misconception: 'छात्र समझते हैं कि "विश्लेषण" का अर्थ है पाठ में से सुंदर वाक्य छाँटकर लिख देना या अलंकारों के नाम गिना देना। वास्तव में विश्लेषण का अर्थ.' }
          ],
            remediations: { '2': { steps: ['चरण 1: छात्र को एक ही वाक्य के दो रूप दो — साधारण और साहित्यिक (जैसे "वह डर गया" बनाम "उसके पैर जमीन से चिपक गए")। चरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) के प्रमाणों.',
          hint: 'यदि अटके: c8_hin_cbse_02_013 (आलोचनात्मक चिंतन) के "विश्लेषण-व्याख्या अभ्यास" दोहराएं.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पाठ-आधारित लेखन" का अर्थ **पाठ का अनुवाद या सारांश लिखना** है। वे प्रमाण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) के प्रमाणों (उद्धरण, घटना,',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) के प्रमाणों (उद्धरण, घटना,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'यदि अटके: c8_hin_cbse_02_013 (आलोचनात्मक चिंतन) के "विश्लेषण-व्याख्या अभ्यास" दोहराएं — विशेषकर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पाठ-आधारित लेखन" का अर्थ **पाठ का अनुवाद या सारांश लिखना** है। वे प्रमाण (Evidence) के रूप में.' }
          ],
            remediations: { 'evidence': { steps: ['**मॉडलिंग:** शिक्षक बोर्ड पर एक कमज़ोर उत्तर (केवल सारांश) और एक सशक्त उत्तर (PEEL) साथ-साथ लिखे। छात्रों से पूछे.', '**प्रमाण-छंटनी अभ्यास:** पाठ का एक पैरा दें। प्रश्न दें: "इस पैरा से केवल **एक वाक्य/पंक्ति** चुनो जो \'नायक की.', '**PEEL भरो शीट:** रिक्त PEEL टेम्पलेट दें — Point: ____ ; Evidence: "____" ; Explanation: यह प्रमाण बिंदु को कैसे सिद्ध.', '____ ; Link: यह पाठ के विषय ____ से कैसे जुड़ता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) are carefully framed, open-ended prompts based.',
          hint: 'If stuck, review c8_hin_cbse_02_013 (आलोचनात्मक चिंतन) — specifically the skill of moving.',
          misconception: 'छात्र (और कई बार शिक्षक भी) मानते हैं कि चर्चा-बिंदु का अर्थ है \'पाठ से 5-6 प्रश्न तैयार करना जिनके उत्तर पाठ में मिल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) are carefully framed, open-ended prompts based on the',
                  options: ['चर्चा-बिंदु (Discussion Points) are carefully framed, open-ended prompts based on the', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'If stuck, review c8_hin_cbse_02_013 (आलोचनात्मक चिंतन) — specifically the skill of moving from.',
                  misconception: 'छात्र (और कई बार शिक्षक भी) मानते हैं कि चर्चा-बिंदु का अर्थ है \'पाठ से 5-6 प्रश्न तैयार करना जिनके उत्तर पाठ में मिल जाएं\'। यह भ्रम इसलिए.' }
          ],
            remediations: { '5-6-comprehension-questions-discussion': { steps: ['**पहचान चरण:** छात्र से कहें: "पाठ 2 से एक बोध-प्रश्न और एक चर्चा-बिंदु लिखकर दिखाओ। दोनों को साथ रखो।" 2.', '**तुलना चरण:** पूछें: "पहले प्रश्न का उत्तर एक ही हो सकता है या अनेक?', 'दूसरे का?" — छात्र स्वयं अंतर देखेगा। 3.', '**रूपांतरण चरण:** बोध-प्रश्न को चर्चा-बिंदु में बदलने का अभ्यास कराएं: "नायक ने क्या किया?" → "नायक ने जो किया, क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
