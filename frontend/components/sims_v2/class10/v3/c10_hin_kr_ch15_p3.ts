import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_kr_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_kr_ch15_p3: SimDef = {
    id: 'v3_c10_hin_kr_ch15_p3',
    title: 'साना-साना हाथ जोड़ि · Part 3/3',
    subtitle: 'यह नोड केवल "साना-साना हाथ जोड़ि" पाठ के आंतरिक साक्ष्य (internal evidence) पर आधारित.',
    classLevel: 10, subject: 'hin_kr', topic: 'साना-साना हाथ जोड़ि · Part 3/3',
    chapters: ['c10_hin_kr_ch15'],
    nodeIds: ['c10_hin_kr_cbse_15_013', 'c10_hin_kr_cbse_15_014', 'c10_hin_kr_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'शिक्षा ही मुक्ति का मार्ग है\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'शिक्षा ही मुक्ति का मार्ग है\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_kr_cbse_15_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_kr_cbse_15_014', title: 'Identify each idea',
          dissect: { specimen: 'साना-साना हाथ जोड़ि · Part 3/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — \'शिक्षा ही मुक्ति का मार्ग है\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — \'शिक्षा ही मुक्ति का मार्ग है\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'You finished साना-साना हाथ जोड़ि — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_013', difficulty: 'standard',
          question: '\'शिक्षा ही मुक्ति का मार्ग है\' का आलोचनात्मक चिंतन — विश्लेषण करके.',
          hint: 'अगर फँस जाएँ तो "बिंब और रूपक" (नोड 008) तथा "विरोधाभास और प्रतीक" (नोड 009) को दोबारा.',
          misconception: 'छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ पाठ में कमियाँ निकालना या नकारात्मक टिप्पणी करना है। वास्तव में यह पाठ की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'शिक्षा ही मुक्ति का मार्ग है\' का आलोचनात्मक चिंतन',
                  options: ['\'शिक्षा ही मुक्ति का मार्ग है\' का आलोचनात्मक चिंतन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि-अध्ययन का अर्थ है', '\'शिक्षा ही मुक्ति का मार्ग है\' का कथानक', '\'शिक्षा ही मुक्ति का मार्ग है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर फँस जाएँ तो "बिंब और रूपक" (नोड 008) तथा "विरोधाभास और प्रतीक" (नोड 009) को दोबारा देखें — ये.',
                  misconception: 'छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ पाठ में कमियाँ निकालना या नकारात्मक टिप्पणी करना है। वास्तव में यह पाठ की बहु-स्तरीय संरचना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक छोटा अंश (3-4 पंक्तियाँ) देकर पूछो: "यहाँ लेखक क्या *नहीं* कह रहा, लेकिन इशारा कर रहा है?" — इससे.', 'फिर उसी अंश के दो भिन्न पाठकीय प्रमाण ढूँढ़ने को कहो जो विरोधाभासी लगें (जैसे: परंपरा का गौरव बनाम परंपरा का बोझ) और.', 'अंत में, बोर्ड के विगत वर्षों के 2-3 विश्लेषण-आधारित प्रश्नों के मॉडल उत्तर दिखाकर PEEL संरचना (Point, Evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_014', difficulty: 'standard',
          question: '\'शिक्षा ही मुक्ति का मार्ग है\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की.',
          hint: 'यदि अटके: **c10_hin_kr_cbse_15_012 (बोध-प्रश्न)** दोहराएं — विशेषकर \'आशय-सूचक\' प्रश्नों.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ से उद्धरण (कोट) डाल देना ही साक्ष्य (Evidence) है; व्याख्या (Explanation) की जरूरत नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'शिक्षा ही मुक्ति का मार्ग है\' पर पाठ-आधारित लेखन',
                  options: ['\'शिक्षा ही मुक्ति का मार्ग है\' पर पाठ-आधारित लेखन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि-अध्ययन का अर्थ है', '\'शिक्षा ही मुक्ति का मार्ग है\' का कथानक', '\'शिक्षा ही मुक्ति का मार्ग है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **c10_hin_kr_cbse_15_012 (बोध-प्रश्न)** दोहराएं — विशेषकर \'आशय-सूचक\' प्रश्नों का अभ्यास.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ से उद्धरण (कोट) डाल देना ही साक्ष्य (Evidence) है; व्याख्या (Explanation) की जरूरत नहीं क्योंकि उद्धरण स्वयं.' }
          ],
            remediations: { 'evidence': { steps: ['**चरण 1:** छात्र से कहें — *"तुम्हारे उत्तर में उद्धरण तो है, लेकिन मैं (परीक्षक) नहीं समझ पाया कि यह उद्धरण तुम्हारे.', '**चरण 2:** एक **मॉडल Explanation वाक्य** दें: *"उद्धरण + \'इससे स्पष्ट होता है कि\' + बिंदु से जुड़ा विशेषण"* — उदा.', '*" \'वह शेर से लड़ा\' इससे स्पष्ट होता है कि वह प्राणों की परवाह नहीं करता = साहसी।"* 3.', '**चरण 3:** छात्र से **तीन अलग-अलग प्रश्नों** पर केवल Explanation वाक्य लिखवाएं (बिंदु/साक्ष्य आप दें)। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_015', difficulty: 'standard',
          question: '\'शिक्षा ही मुक्ति का मार्ग है\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि कठिनाई हो तो c10_hin_kr_cbse_15_012 (बोध‑प्रश्न: वस्तुनिष्ठ और आशय‑सूचक) के प्रश्नों.',
          misconception: 'छात्र अक्सर सोचते हैं कि वाचन‑श्रवण: चर्चा‑बिंदु में केवल कहानी का सार या पात्रों के नाम दोहराने से काम चल जाएगा, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'शिक्षा ही मुक्ति का मार्ग है\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'शिक्षा ही मुक्ति का मार्ग है\' पर वाचन-श्रवण और चर्चा-बिंदु', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि-अध्ययन का अर्थ है', '\'शिक्षा ही मुक्ति का मार्ग है\' का कथानक', '\'शिक्षा ही मुक्ति का मार्ग है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि कठिनाई हो तो c10_hin_kr_cbse_15_012 (बोध‑प्रश्न: वस्तुनिष्ठ और आशय‑सूचक) के प्रश्नों को दोबारा.',
                  misconception: 'छात्र अक्सर सोचते हैं कि वाचन‑श्रवण: चर्चा‑बिंदु में केवल कहानी का सार या पात्रों के नाम दोहराने से काम चल जाएगा, जबकि वास्तव में बोर्ड.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र केवल सार दोहरा रहा हो, तो उसे इस तीन‑चरणीय अभ्यास से गुज़रें: 1) पाठ से एक वाक्य चुनें जिसे वह महत्वपूर्ण.', '2) खुद से पूछें: इस वाक्य में कौन‑सी भावना या मूल्य छिपा हो सकता है?', '(उत्तर: शांतिपूर्ण समर्पण)। 3) अब उसी भावना को अपने जीवन के एक उदाहरण से जोड़कर लिखें: “जैसे परीक्षा के पहले मैं भी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
