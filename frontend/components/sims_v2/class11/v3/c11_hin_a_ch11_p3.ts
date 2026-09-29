import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch11_p3: SimDef = {
    id: 'v3_c11_hin_a_ch11_p3',
    title: 'पाठ 11 · Part 3/3',
    subtitle: 'यह नोड कक्षा 11 के \'अंतरा\' भाग-1 के पाठ 11 पर केंद्रित है; इसमें पाठ के **विश्लेषण.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 11 · Part 3/3',
    chapters: ['c11_hin_a_ch11'],
    nodeIds: ['c11_hin_a_cbse_11_013', 'c11_hin_a_cbse_11_014', 'c11_hin_a_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'अंतरा भाग-1 — पाठ 11\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'अंतरा भाग-1 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — आलोचनात्मक', 'पाठ 11 — लेखन', 'पाठ 11 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_11_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 3/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 11\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 11\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 11 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_013', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि फँस जाएँ तो **नोड 009 (विरोधाभास और प्रतीक)** और **नोड 006 (मुख्य विषय)** पर वापस.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन का अर्थ है पाठ में **कमियाँ निकालना (Finding Faults)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'अंतरा भाग-1 — पाठ 11\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 11\' का कथानक — \'अंतरा भाग-1 — पाठ 11\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ तो **नोड 009 (विरोधाभास और प्रतीक)** और **नोड 006 (मुख्य विषय)** पर वापस जाएँ — ये दो.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन का अर्थ है पाठ में **कमियाँ निकालना (Finding Faults)** या **लेखक से असहमत.' }
          ],
            remediations: { 'finding-faults': { steps: ['**चरण 1 (भेद स्पष्ट करें):** छात्र को दो छोटे अंश दें — एक \'समीक्षा/राय\' (Opinion Piece) और एक \'आलोचनात्मक विश्लेषण\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_014', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 11\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटके: **c11_hin_a_cbse_11_008 (बिंब/रूपक) और c11_hin_a_cbse_11_009.',
          misconception: '**भ्रांति:** *"पाठ-आधारित उत्तर लिखने का अर्थ है पाठ की मुख्य घटनाओं को क्रमबद्ध लिख देना (Summary Writing)।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 11\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'अंतरा भाग-1 — पाठ 11\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 11\' का कथानक — \'अंतरा भाग-1 — पाठ 11\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके: **c11_hin_a_cbse_11_008 (बिंब/रूपक) और c11_hin_a_cbse_11_009 (विरोधाभास/प्रतीक)** दोहराएँ.',
                  misconception: '**भ्रांति:** *"पाठ-आधारित उत्तर लिखने का अर्थ है पाठ की मुख्य घटनाओं को क्रमबद्ध लिख देना (Summary Writing)।"* **वास्तविक त्रुटि का कारण:**.' }
          ],
            remediations: { 'summary-writing-class-10-plot': { steps: ['**लक्षित उपचार (3-चरणीय):** 1.', '**\'क्या\' बनाम \'क्यों/कैसे\' अभ्यास:** छात्र को पाठ के 5 वाक्य दें; प्रत्येक के लिए पूछें — "यह **क्या** कहता है?".', '**PEEL टेम्पलेट भरवाना:** रिक्त PEEL शीट दें (Point: ____ | Evidence: "____" | Explanation: ____ | Link: ____); पहले 5.', '**\'खराब उत्तर सुधार\' सत्र:** बोर्ड के नमूना उत्तरों (Sample Answers) में से 2 कमजोर उत्तर दें; छात्र से कहें: "इनमें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_015', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 11\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि अटका हुआ लगे तो **c11_hin_a_cbse_11_013 (आलोचनात्मक चिंतन)** के "तर्क-मानचित्रण".',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "चर्चा-बिंदु = पाठ का सारांश पूछने वाले प्रश्न"। **गलत तर्क का स्रोत:** कक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 11\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का',
                  options: ['\'अंतरा भाग-1 — पाठ 11\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 11\' का कथानक — \'अंतरा भाग-1 — पाठ 11\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ लगे तो **c11_hin_a_cbse_11_013 (आलोचनात्मक चिंतन)** के "तर्क-मानचित्रण" (argument.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "चर्चा-बिंदु = पाठ का सारांश पूछने वाले प्रश्न"। **गलत तर्क का स्रोत:** कक्षा 10 तक "बोध-प्रश्न".' }
          ],
            remediations: { '10-comprehension-questions-fact-based': { steps: ['**चरण 1 — अंतर स्पष्ट करें:** छात्र के सामने **दो प्रश्न** रखें: (क) "नायक ने पत्र कब लिखा?" (तथ्य-प्रश्न) — (ख) "पत्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
