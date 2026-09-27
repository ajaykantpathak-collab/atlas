import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch01_p3: SimDef = {
    id: 'v3_c7_hin_ch01_p3',
    title: 'पाठ 1 · Part 3/3',
    subtitle: 'यह नोड **पाठ 1 के आधार पर** आलोचनात्मक विश्लेषण और व्याख्या के **उन्नत चरण** को कवर करता.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 1 · Part 3/3',
    chapters: ['c7_hin_ch01'],
    nodeIds: ['c7_hin_cbse_01_013', 'c7_hin_cbse_01_014', 'c7_hin_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'मान लो तुमने अभी-अभी एक **विज्ञापन** देखा जिसमें लिखा है: *"यह साबुन 99.9% कीटाणु मारता है — माँओं की पहली.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) वह कौशल है जिसमें छात्र पाठ को **सतही अर्थ से आगे जाकर** परखते हैं — लेखक का **उद्देश्य, दृष्टिकोण, पूर्वाग्रह, तर्क-श्रृंखला, साहित्यिक युक्तियों का प्रभाव** और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — आलोचनात्मक', 'पाठ 1 — लेखन', 'पाठ 1 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_01_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 3/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उससे **सबूत लेकर**.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी पाठ को पढ़कर या सुनकर उसके मुख्य विचार, भावना या.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_01_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) वह कौशल है जिसमें छात्र पाठ को **सतही अर्थ.',
          hint: 'यदि फँस जाएँ तो **c7_hin_cbse_01_012 (बोध-प्रश्न: आशय-सूचक)** के अभ्यास दोहराएँ — विशेषकर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना (fault-finding)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) वह कौशल है जिसमें छात्र पाठ को **सतही अर्थ से आगे',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) वह कौशल है जिसमें छात्र पाठ को **सतही अर्थ से आगे', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि फँस जाएँ तो **c7_hin_cbse_01_012 (बोध-प्रश्न: आशय-सूचक)** के अभ्यास दोहराएँ — विशेषकर वे प्रश्न.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना (fault-finding)** या **लेखक से असहमत होना**।.' }
          ],
            remediations: { 'fault-finding': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**शब्द स्पष्टीकरण:** कक्षा में "Critical" का अर्थ **"महत्वपूर्ण/निर्णायक/सूक्ष्म परीक्षण करने वाला"** समझाएँ.', '**मॉडलिंग:** पाठ 1 के एक छोटे अंश पर **दो प्रतिक्रियाएँ** दिखाएँ — (क) नकारात्मक: "यह बोरिंग है।" (ख) विश्लेषणात्मक.', '**अभ्यास:** एक **तटस्थ अंश** (जैसे मौसम रिपोर्ट) दें और कहें: "इसमें **क्या रणनीति** अपनाई गई है?" — इससे \'पसंद/नापसंद\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उससे **सबूत.',
          hint: 'यदि अटके: **कक्षा 6 के \'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक\' (c6_hin_cbse_01_012)** के.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'Evidence\' को \'घटना का सारांश\' समझ लेते हैं**। उदाहरण: प्रश्न — "हरी सिंह ने अनिल को क्यों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उससे **सबूत लेकर**,',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उससे **सबूत लेकर**,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके: **कक्षा 6 के \'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक\' (c6_hin_cbse_01_012)** के अभ्यास.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'Evidence\' को \'घटना का सारांश\' समझ लेते हैं**। उदाहरण: प्रश्न — "हरी सिंह ने अनिल को क्यों नहीं लूटा?" कमज़ोर.' }
          ],
            remediations: { 'evidence-evidence': { steps: ['**मॉडलिंग (Modeling):** छात्र के सामने एक कमज़ोर उत्तर (बिना Evidence) और एक मज़बूत उत्तर (सटीक Evidence सहित) रखें।.', '**हाइलाइटिंग अभ्यास:** पाठ की फोटोकॉपी दें। प्रश्न दें। कहें: "**केवल उन वाक्यों को हाइलाइट करो जो उत्तर देते हैं**।".', '**सेंटेंस स्टार्टर दें:** "पाठ में लिखा है...", "लेखक ने कहा है...", "पंक्ति ...', 'से स्पष्ट है..." — इनका उपयोग अनिवार्य करें जब तक आदत न पड़ जाए। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी पाठ को पढ़कर या सुनकर उसके मुख्य विचार.',
          hint: 'यदि छात्र चर्चा-बिंदु विकसित करने में कठिनाई महसूस कर रहा है, तो उसे पहले पाठ के.',
          misconception: 'छात्र अक्सर सोचते हैं कि चर्चा-बिंदु का अर्थ है पाठ की किसी भी रोचक पंक्ति को याद करके दोहराना, जैसे "राजा बहुत दुखी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी पाठ को पढ़कर या सुनकर उसके मुख्य विचार, भावना या',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी पाठ को पढ़कर या सुनकर उसके मुख्य विचार, भावना या', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि छात्र चर्चा-बिंदु विकसित करने में कठिनाई महसूस कर रहा है, तो उसे पहले पाठ के बोध-प्रश्न.',
                  misconception: 'छात्र अक्सर सोचते हैं कि चर्चा-बिंदु का अर्थ है पाठ की किसी भी रोचक पंक्ति को याद करके दोहराना, जैसे "राजा बहुत दुखी था" कह देना, बिना इसके.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक पंक्ति जैसे "राजा बहुत दुखी था" को कैसे चर्चा-बिंदु बनाया जा सकता है: पहले पूछिए कि राजा क्यों.', 'फिर सोचिए कि उसकी दुख की क्या वजह हो सकती है (जैसे खोया हुआ धन, अलग हुआ परिवार)। फिर पूछिए कि इस दुख से हमें क्या सीख.', 'अंत में छात्र से कहिए कि वह अपने शब्दों में कहे: "राजा का दुख हमें बताता है कि धन खोने से मन को अधिक दुख होता है, इसलिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
