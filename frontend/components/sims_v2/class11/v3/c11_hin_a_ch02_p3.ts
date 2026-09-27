import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch02_p3: SimDef = {
    id: 'v3_c11_hin_a_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'This node covers the *process* and *methodology* of critical analysis and interpretation.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c11_hin_a_ch02'],
    nodeIds: ['c11_hin_a_cbse_02_013', 'c11_hin_a_cbse_02_014', 'c11_hin_a_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Think of the last time you argued with a friend about a movie\'s ending — you didn\'t just say "it was good,".', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के विभिन्न अवयवों (शिल्प, भाषा, संरचना, प्रसंग) का सूक्ष्म विश्लेषण करके उनके पारस्परिक संबंधों एवं निहितार्थों की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_02_013', title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या',
          caseStudy: { intro: 'Think of the last time you argued with a friend about a movie\'s ending — you didn\'t just say "it was good," you pointed to *specific scenes*, *dialogues*, and.',
            decisions: [{ prompt: 'पाठ्य विश्लेषण (Textual Analysis) और व्याख्या (Interpretation) में मूलभूत अंतर क्या है? एक-एक उदाहरण देकर स्पष्ट कीजिए।', options: [
                { text: '**Correct Answer:** विश्लेषण पाठ को उसके अवयवों (शब्द, वाक्य, बिंब, प्रतीक, संरचना) में', outcome: '**Correct Answer:** विश्लेषण पाठ को उसके अवयवों (शब्द, वाक्य, बिंब, प्रतीक, संरचना) में विघटित करके.' },
                { text: 'both mean explaining the text', outcome: 'Not quite — **"अच्छी व्याख्या वही है जिसमें अधिक से अधिक अलंकार/युक्तियाँ गिनाई जाएँ।"** यह Class 11 का सबसे.', reveals: 'class-11-listing-analysing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_02_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें.',
          hint: 'If stuck, immediately revisit **c11_hin_a_cbse_02_008** and **c11_hin_a_cbse_02_009** for.',
          misconception: '**"अच्छी व्याख्या वही है जिसमें अधिक से अधिक अलंकार/युक्तियाँ गिनाई जाएँ।"** यह Class 11 का सबसे घातक भ्रम है। छात्र.',
          parts: [
                { id: 'a', prompt: 'निम्नलिखित अंश का विश्लेषण करके बताइए कि वाक्य-विन्यास (Syntax) यहाँ अर्थ-निर्माण में कैसे सहायक है? *"वह आया। देखा। चुपचाप चला गया।"*', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'sentences are short'],
                  hint: 'If stuck, immediately revisit **c11_hin_a_cbse_02_008** and **c11_hin_a_cbse_02_009** for device.',
                  misconception: '**"अच्छी व्याख्या वही है जिसमें अधिक से अधिक अलंकार/युक्तियाँ गिनाई जाएँ।"** यह Class 11 का सबसे घातक भ्रम है। छात्र मानते हैं कि **सूची.' }
          ],
            remediations: { 'class-11-listing-analysing': { steps: ['**चरणबद्ध उपचार (Targeted Remediation):** 1.', '**मॉडलिंग (Modeling):** शिक्षक एक ही अंश के दो उत्तर दिखाए — एक \'सूची-प्रकार\' (2/5 अंक), एक \'विश्लेषण-प्रकार\' (5/5 अंक).', '**संस्करण अभ्यास (Scaffolding):** "क्यों?" का **तीन बार** अभ्यास करवाए: - युक्ति क्या है?', '→ रूपक - यह यहाँ क्या *कर* रही है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या.',
          hint: 'यदि फंसे हों, तो **c11_hin_a_cbse_02_013 (आलोचनात्मक चिंतन)** के \'विश्लेषण चरण\' को.',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर में पाठ की **कहानी/सारांश** लिखने से अंक मिलते हैं क्योंकि इससे पता चलता है कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या पद्यांश का गहन',
                  options: ['पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या पद्यांश का गहन', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'यदि फंसे हों, तो **c11_hin_a_cbse_02_013 (आलोचनात्मक चिंतन)** के \'विश्लेषण चरण\' को दोहराएं.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर में पाठ की **कहानी/सारांश** लिखने से अंक मिलते हैं क्योंकि इससे पता चलता है कि हमने पाठ पढ़ा है।".' }
          ],
            remediations: { 'cbse-class-11-marking-scheme': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पहचान:** छात्र से कहें — "अपना लिखा उत्तर पढ़ो और हर वाक्य के आगे लिखो: यह **बिंदु** है, यह **साक्ष्य** है, यह.', '**मॉडलिंग:** उसी प्रश्न का एक **उत्कृष्ट नमूना उत्तर** दिखाएं (शिक्षक द्वारा लिखित) और साथ में PEEL लेबलिंग करें। छात्र.', '**अभ्यास:** एक **अति-लघु पाठांश (50 शब्द)** दें और केवल **एक PEEL पैराग्राफ** लिखने को कहें — विषय: "इस पाठांश में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित साहित्यिक कौशल है जिसमें शिक्षार्थी किसी पाठ.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_02_013 (आलोचनात्मक चिंतन)** दोहराएँ — विशेष रूप से.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि चर्चा-बिंदु बनाने के लिए पाठ का **सारांश (summary)** पता होना पर्याप्त है। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित साहित्यिक कौशल है जिसमें शिक्षार्थी किसी पाठ का मौन',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक संरचित साहित्यिक कौशल है जिसमें शिक्षार्थी किसी पाठ का मौन', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_02_013 (आलोचनात्मक चिंतन)** दोहराएँ — विशेष रूप से \'पाठ्य-साक्ष्य से.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि चर्चा-बिंदु बनाने के लिए पाठ का **सारांश (summary)** पता होना पर्याप्त है। वे **कथानक-घटनाएँ (plot.' }
          ],
            remediations: { 'summary-plot-events-10': { steps: ['**मॉडलिंग**: शिक्षक एक छोटे अंश (3-4 पंक्तियाँ) पढ़कर **दो संस्करण** दिखाए — (क) घटना-आधारित वर्णन, (ख) विश्लेषणात्मक.', '**संयुक्त अभ्यास**: शिक्षक एक प्रसंग दे, छात्र **केवल पाठ्य-साक्ष्य** ढूँढ़ें (व्याख्या न करें) — फिर शिक्षक व्याख्या.', '**स्वतंत्र प्रयास**: छात्र नया प्रसंग लेकर **साक्ष्य + व्याख्या** का युग्म बनाएँ — सहपाठी से **प्रतिप्रश्न.', '**फीडबैक लूप**: हर प्रयास पर शिक्षक बताएँ: "तुमने \'क्या हुआ\' बताया, \'क्या अर्थ है\' नहीं — अगली बार **\'इसका अर्थ है...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
