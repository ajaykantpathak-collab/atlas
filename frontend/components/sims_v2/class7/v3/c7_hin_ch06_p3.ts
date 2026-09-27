import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch06_p3: SimDef = {
    id: 'v3_c7_hin_ch06_p3',
    title: 'पाठ 6 · Part 3/3',
    subtitle: 'यह नोड पाठ 6 के **विश्लेषण और व्याख्या** कौशल पर केंद्रित है — जिसमें बिंब/रूपक/प्रतीक की.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 6 · Part 3/3',
    chapters: ['c7_hin_ch06'],
    nodeIds: ['c7_hin_cbse_06_013', 'c7_hin_cbse_06_014', 'c7_hin_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'तुम्हारे सामने पाठ 6 का कोई महत्वपूर्ण अंश रख दो — जैसे वह दृश्य जहाँ नायक एक कठिन निर्णय लेता है। पूछो.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के **सतही अर्थ** से आगे जाकर उसके **अंतर्निहित अर्थ, लेखकीय उद्देश्य, संरचनात्मक चुनाव और सामाजिक-सांस्कृतिक संदर्भ** को तर्कसंगत ढंग से विश्लेषण और व्याख्या.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — आलोचनात्मक', 'पाठ 6 — लेखन', 'पाठ 6 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_06_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 3/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) के प्रमाणों का उपयोग करके.', answer: '6 -', options: ['6 -', '6 - -'] },
            { id: 's2', label: '6 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) वे खुले, विचारोत्तेजक प्रश्न या विषय होते हैं जो पाठ के.', answer: '6 - -', options: ['6 - -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_06_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के **सतही अर्थ** से आगे जाकर उसके.',
          hint: 'यदि फँस जाएँ तो **नोड 008, 009 (बिंब/रूपक/प्रतीक)** और **नोड 012 (बोध-प्रश्न: साक्ष्य.',
          misconception: 'छात्र **\'विश्लेषण\'** को **\'सारांश\'** या **\'भावार्थ\'** समझ बैठते हैं। वे लिखते हैं: "लेखक ने बताया कि नायक दुखी था" — यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के **सतही अर्थ** से आगे जाकर उसके **अंतर्निहित',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के **सतही अर्थ** से आगे जाकर उसके **अंतर्निहित', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'यदि फँस जाएँ तो **नोड 008, 009 (बिंब/रूपक/प्रतीक)** और **नोड 012 (बोध-प्रश्न: साक्ष्य ढूँढ़ना)**.',
                  misconception: 'छात्र **\'विश्लेषण\'** को **\'सारांश\'** या **\'भावार्थ\'** समझ बैठते हैं। वे लिखते हैं: "लेखक ने बताया कि नायक दुखी था" — यह **वर्णन** है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग**: शिक्षक एक छोटे अंश (3-4 पंक्तियाँ) ले और **सोच-बोल (think-aloud)** करके दिखाए: "मैं देख रहा हूँ यहाँ \'सूखा.', 'यह नायक की **असहायता** दिखाता है क्योंकि पत्ता हवा के अधीन है...', 'लेखक ने \'सूखा\' विशेषण क्यों चुना?', '**संयुक्त अभ्यास**: छात्रों को **दो संस्करण** दो — एक वर्णनात्मक, एक विश्लेषणात्मक — और अंतर पहचानने को कहो। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) के प्रमाणों का.',
          hint: 'यदि फँस जाएँ तो कक्षा 6 की PEEL शीट (c6_hin_cbse_01_014) और \'बोध-प्रश्न\'.',
          misconception: 'छात्र मानते हैं कि \'पाठ-आधारित उत्तर\' का अर्थ है पाठ के बड़े हिस्से नकल करना या कहानी का क्रमवार सारांश लिखना। वे नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) के प्रमाणों का उपयोग करके',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) के प्रमाणों का उपयोग करके', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'यदि फँस जाएँ तो कक्षा 6 की PEEL शीट (c6_hin_cbse_01_014) और \'बोध-प्रश्न\' (c7_hin_cbse_06_012).',
                  misconception: 'छात्र मानते हैं कि \'पाठ-आधारित उत्तर\' का अर्थ है पाठ के बड़े हिस्से नकल करना या कहानी का क्रमवार सारांश लिखना। वे नहीं समझते कि प्रश्न एक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक छोटा अंश (4-5 पंक्तियाँ) दो और एक संकीर्ण प्रश्न पूछो (जैसे: "इस अंश में क्रोध कैसे दिखता है?")। 2.', 'उसे केवल 1-2 पंक्तियाँ चुनने को कहो जो सीधे क्रोध दिखाएँ। 3.', 'फिर PEEL शीट पर लिखवाओ: बिंदु, चुना प्रमाण, व्याख्या (क्यों यह क्रोध है), संबंध। 4.', 'तुलना करो: पहले उसने क्या लिखा था (सारांश) और अब क्या लिखा (तर्क) — अंतर स्पष्ट करो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) वे खुले, विचारोत्तेजक प्रश्न या विषय होते हैं.',
          hint: 'यदि फँसें: **पाठ 6 के पैरा 7-10 (केंद्रीय द्वंद्व वाले अंश) को फिर से पढ़ें** और पूछें.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि चर्चा-बिंदु में **"जो मन में आए बोल दो"** — कोई तैयारी नहीं, कोई साक्ष्य नहीं, कोई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) वे खुले, विचारोत्तेजक प्रश्न या विषय होते हैं जो पाठ के',
                  options: ['चर्चा-बिंदु (Discussion Points) वे खुले, विचारोत्तेजक प्रश्न या विषय होते हैं जो पाठ के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'यदि फँसें: **पाठ 6 के पैरा 7-10 (केंद्रीय द्वंद्व वाले अंश) को फिर से पढ़ें** और पूछें: "यहाँ क्या.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि चर्चा-बिंदु में **"जो मन में आए बोल दो"** — कोई तैयारी नहीं, कोई साक्ष्य नहीं, कोई तर्क नहीं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — मॉडलिंग (Modeling):** शिक्षक एक चर्चा-बिंदु ले और **सोच-ज़ोर से (think-aloud)** दिखाए: "पहले मैं पाठ में सबूत.', 'फिर अपना दावा बनाता हूँ...', 'फिर विपक्षी तर्क सोचता हूँ..." **चरण 2 — संरचना देना (Scaffolding):** छात्रों को **चर्चा-टेम्पलेट** दो: "मेरा दावा.', 'कैसे?" — यह **बौद्धिक विनम्रता (intellectual humility)** विकसित करता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
