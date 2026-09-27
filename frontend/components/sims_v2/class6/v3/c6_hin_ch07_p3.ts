import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch07_p3: SimDef = {
    id: 'v3_c6_hin_ch07_p3',
    title: 'पाठ 7 · Part 3/3',
    subtitle: 'यह नोड **पाठ 7** के आधार पर **विश्लेषण (Analysis)** और **व्याख्या (Interpretation)**.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 7 · Part 3/3',
    chapters: ['c6_hin_ch07'],
    nodeIds: ['c6_hin_cbse_07_013', 'c6_hin_cbse_07_014', 'c6_hin_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'मान लो तुमने पाठ 7 में एक दृश्य पढ़ा जहाँ नायक गुस्से में अपना कीमती सामान तोड़ देता है — पहला सवाल पूछो.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) का अर्थ है किसी पाठ को केवल पढ़कर समझना नहीं, बल्कि उसके **तर्कों, प्रमाणों, मान्यताओं और निष्कर्षों की जाँच करना** — फिर तर्कसंगत ढंग से अपनी व्याख्या.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_07_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — आलोचनात्मक', 'पाठ 7 — लेखन', 'पाठ 7 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_07_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 3/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (कहानी, कविता, लेख) को पढ़कर उससे संबंधित.', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) are structured prompts or open-ended questions designed.', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 7 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) का अर्थ है किसी पाठ को केवल पढ़कर समझना.',
          hint: 'अगर फँस जाएँ तो **c6_hin_cbse_07_012 (बोध-प्रश्न)** के उत्तरों को दोबारा देखें — वहाँ से.',
          misconception: '**विशिष्ट भ्रम:** Class 6 के छात्र अक्सर समझते हैं कि "आलोचनात्मक चिंतन" का मतलब है **पाठ में कमियाँ निकालना** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) का अर्थ है किसी पाठ को केवल पढ़कर समझना नहीं, बल्कि',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) का अर्थ है किसी पाठ को केवल पढ़कर समझना नहीं, बल्कि', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'अगर फँस जाएँ तो **c6_hin_cbse_07_012 (बोध-प्रश्न)** के उत्तरों को दोबारा देखें — वहाँ से "क्या.',
                  misconception: '**विशिष्ट भ्रम:** Class 6 के छात्र अक्सर समझते हैं कि "आलोचनात्मक चिंतन" का मतलब है **पाठ में कमियाँ निकालना** या **लेखक से असहमत होना**।.' }
          ],
            remediations: { 'class-6-7': { steps: ['**मॉडल दिखाओ:** एक ही प्रसंग पर दो उत्तर लिखवाओ — (क) "मुझे पसंद नहीं आया" (राय), (ख) "लेखक नायक की वापसी को साहस.', 'और पंक्ति 9 में नायक मुस्कुराता है" (विश्लेषण)। पूछो: "कौन सा उत्तर पाठ का सहारा लेता है?" 2.', '**रंगीन हाइलाइटिंग करवाओ:** छात्र अपने उत्तर में **दावा (Claim)** को लाल, **प्रमाण (Evidence)** को पीला, **व्याख्या.', '**वाक्य-स्टार्टर दो:** "लेखक दर्शाता है कि...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (कहानी, कविता, लेख) को पढ़कर उससे.',
          hint: 'यदि अटके: c6_hin_cbse_07_012 (बोध-प्रश्न) के अभ्यास दोहराएं — विशेषकर \'आशय-सूचक\' प्रश्न.',
          misconception: '**सबसे आम गलतफहमी:** छात्र समझते हैं कि "पाठ-आधारित लेखन" का अर्थ है **पाठ की घटनाओं को अपने शब्दों में दोहराना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (कहानी, कविता, लेख) को पढ़कर उससे संबंधित',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (कहानी, कविता, लेख) को पढ़कर उससे संबंधित', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'यदि अटके: c6_hin_cbse_07_012 (बोध-प्रश्न) के अभ्यास दोहराएं — विशेषकर \'आशय-सूचक\' प्रश्न जहां.',
                  misconception: '**सबसे आम गलतफहमी:** छात्र समझते हैं कि "पाठ-आधारित लेखन" का अर्थ है **पाठ की घटनाओं को अपने शब्दों में दोहराना.' }
          ],
            remediations: { 'paraphrasing-summarizing-point-evidence': { steps: ['**मॉडलिंग:** शिक्षक एक ही प्रश्न के दो उत्तर दिखाए — एक कमजोर (केवल वर्णन), एक सशक्त (PEEL)। छात्र से पूछें: "दूसरा.', 'इसमें क्या अतिरिक्त है?" 2.', '**रंग-कोडिंग अभ्यास:** छात्र अपने उत्तर में P, E, E, L को अलग-अलग रंग से रेखांकित करे। यदि कोई रंग गायब है, तो वह चरण.', '**संयुक्त लेखन:** शिक्षक बोर्ड पर Point लिखे, छात्र Evidence ढूंढे, फिर साथ मिलकर Explanation लिखें, अंत में Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) are structured prompts or open-ended questions.',
          hint: 'If stuck, review "बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक" (c6_hin_cbse_07_012) to practice.',
          misconception: 'छात्र अक्सर मानते हैं कि \'चर्चा-बिंदु\' का अर्थ है — "अपनी राय दो, चाहे पाठ से संबंध हो या न हो"। वे सोचते हैं कि चर्चा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) are structured prompts or open-ended questions designed',
                  options: ['चर्चा-बिंदु (Discussion Points) are structured prompts or open-ended questions designed', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'If stuck, review "बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक" (c6_hin_cbse_07_012) to practice finding text.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'चर्चा-बिंदु\' का अर्थ है — "अपनी राय दो, चाहे पाठ से संबंध हो या न हो"। वे सोचते हैं कि चर्चा में \'सही उत्तर\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक छोटा अनुच्छेद (50 शब्द) दें और कहें: "इसमें से एक वाक्य चुनो जो तुम्हें अजीब/रोचक लगा। अब उससे एक \'क्यों\'.', 'फिर दो छात्रों को जोड़ी में रखें: एक प्रश्न पूछे, दूसरा केवल पाठ से उद्धरण देकर उत्तर दे — बिना अपनी राय दिए। फिर.', 'अंत में पूछें: "तुम्हारा पहला विचार क्या था?', 'एक वाक्य में लिखो।" — यह \'चिंतन-परिवर्तन\' (Metacognition) को दृश्य बनाता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
