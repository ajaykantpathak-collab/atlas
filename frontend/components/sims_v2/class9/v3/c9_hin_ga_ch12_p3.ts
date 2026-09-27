import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch12_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch12_p3',
    title: 'पाठ 12 · Part 3/3',
    subtitle: 'यह नोड पाठ 12 के संदर्भ में विश्लेषण (घटकों का विघटन) और व्याख्या (अर्थ-निर्माण) की.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 12 · Part 3/3',
    chapters: ['c9_hin_ga_ch12'],
    nodeIds: ['c9_hin_ga_cbse_12_013', 'c9_hin_ga_cbse_12_014', 'c9_hin_ga_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'क्या आपने कभी कोई फिल्म दोबारा देखी है और पहली बार में जो \'सिर्फ कहानी\' लगी थी, दूसरी बार में आपको बैकग्राउंड.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के घटकों (कथानक, पात्र, भाषा, शिल्प) को अलग-अलग करके उनकी आंतरिक कार्यप्रणाली समझी जाती है (विश्लेषण/Analysis) और फिर.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — आलोचनात्मक', 'पाठ 12 — लेखन', 'पाठ 12 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_12_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 3/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए.', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु refers to the structured process of reading a text closely.', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_12_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो नोड 008 (बिंब/रूपक) और 009 (विरोधाभास/प्रतीक) के \'पहचान\' अभ्यास.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है पाठ में **कमियाँ निकालना** (Fault-finding) या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान,'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड 008 (बिंब/रूपक) और 009 (विरोधाभास/प्रतीक) के \'पहचान\' अभ्यास दोहराएं.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है पाठ में **कमियाँ निकालना** (Fault-finding) या लेखक से **असहमत होना**.' }
          ],
            remediations: { 'fault-finding-disagreement': { steps: ['**शब्दावली स्पष्टीकरण:** छात्र से पूछें: "यदि डॉक्टर आपकी \'क्रिटिकल कंडीशन\' कहे, तो क्या वह आपकी बुराई कर रहा है?" →.', '**मॉडलिंग:** पाठ 12 का एक छोटा अंश लें। शिक्षक **गलत उदाहरण** दें: "लेखक ने बिंब खराब चुना।" फिर **सही उदाहरण** दें.', '**अभ्यास:** छात्र को केवल **\'लेखक ने X चुना, Y नहीं — क्योंकि...\'** वाक्य-ढांचे में 3 विश्लेषणात्मक वाक्य लिखने को दें।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी.',
          hint: 'यदि अटकें तो c9_hin_ga_cbse_12_004 (पात्र-चित्रण) और c9_hin_ga_cbse_12_006 (मुख्य विषय).',
          misconception: 'छात्र समझते हैं कि \'पाठ-आधारित लेखन\' का अर्थ पाठ का **अनुवाद** या **सारांश** लिखना है। वे प्रश्न "नायक का चरित्र-चित्रण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान,'],
                  hint: 'यदि अटकें तो c9_hin_ga_cbse_12_004 (पात्र-चित्रण) और c9_hin_ga_cbse_12_006 (मुख्य विषय) को दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'पाठ-आधारित लेखन\' का अर्थ पाठ का **अनुवाद** या **सारांश** लिखना है। वे प्रश्न "नायक का चरित्र-चित्रण कीजिए" को "नायक ने.' }
          ],
            remediations: { 'plot-summary-6-8': { steps: ['**पहचान:** छात्र से पूछें: "प्रश्न क्या पूछ रहा है - \'क्या हुआ\' या \'क्यों/कैसे हुआ\'?" यदि वह \'क्या हुआ\' बताए, तो उसे.', '**मॉडलिंग:** उसी प्रश्न का एक कमजोर उत्तर (सारांश) और एक मजबूत उत्तर (PEEL विश्लेषण) साथ-साथ दिखाएँ; अंतर स्पष्ट करें।.', '**अभ्यास:** छात्र को केवल **Evidence ढूंढने** का कार्य दें (लिखने को न कहें); 3 प्रमाण छाँटने पर ही अगला चरण दें। 4.', '**सcaffold:** PEEL का खाका (Template) दें: Point: ______; Evidence: "______"; Explanation: यह दर्शाता है कि ______.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु refers to the structured process of reading a text.',
          hint: 'यदि अटके तो c9_hin_ga_cbse_12_012 (बोध-प्रश्न) के \'आशय-सूचक प्रश्न\' दोहराएं — वे.',
          misconception: 'विद्यार्थी अक्सर समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है — पाठ का सारांश देना या अपनी पसंद/नापसंद बताना। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु refers to the structured process of reading a text closely,',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु refers to the structured process of reading a text closely,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान,'],
                  hint: 'यदि अटके तो c9_hin_ga_cbse_12_012 (बोध-प्रश्न) के \'आशय-सूचक प्रश्न\' दोहराएं — वे चर्चा-बिंदु.',
                  misconception: 'विद्यार्थी अक्सर समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है — पाठ का सारांश देना या अपनी पसंद/नापसंद बताना। वे लिखते हैं: "मुझे यह प्रसंग अच्छा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: विद्यार्थी को एक छोटा अनदेखा पैराग्राफ दें और कहें: "केवल वे वाक्य रेखांकित करो जिन पर तुम \'क्यों?\' या \'कैसे?\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
