import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch29_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch29_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch29_p3',
    title: 'कारतूस · Part 3/3',
    subtitle: 'इस नोड में \'कारतूस\' कहानी के गहन विश्लेषण और व्याख्या के कौशल शामिल हैं — जैसे: विरोधाभास.',
    classLevel: 10, subject: 'hin_sp', topic: 'कारतूस · Part 3/3',
    chapters: ['c10_hin_sp_ch29'],
    nodeIds: ['c10_hin_sp_cbse_29_013', 'c10_hin_sp_cbse_29_014', 'c10_hin_sp_cbse_29_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना करो: बोर्ड परीक्षा में पूछा जाता है — "\'कारतूस\' कहानी में कारतूस केवल एक वस्तु नहीं, एक प्रतीक है.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'कारतूस — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के गहन विश्लेषण और व्याख्या की वह प्रक्रिया है जिसमें पाठ के अंतर्निहित अर्थ, लेखकीय उद्देश्य, साहित्यिक युक्तियों की प्रभावशीलता, तथा.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_29_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['कारतूस — आलोचनात्मक चिंतन', 'कारतूस — लेखन कौशल', 'कारतूस — वाचन-श्रवण: चर्चा-बिंदु'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_29_015', title: 'You made it',
          caseStudy: { intro: 'You finished कारतूस — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के गहन विश्लेषण और.',
          hint: 'यदि अटके: c10_hin_sp_cbse_29_009 (विरोधाभास और प्रतीक) तथा c10_hin_sp_cbse_29_006 (मुख्य.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ है — कहानी में कमियाँ निकालना (criticize = find.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के गहन विश्लेषण और व्याख्या की',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के गहन विश्लेषण और व्याख्या की', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'यदि अटके: c10_hin_sp_cbse_29_009 (विरोधाभास और प्रतीक) तथा c10_hin_sp_cbse_29_006 (मुख्य विषय) को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ है — कहानी में कमियाँ निकालना (criticize = find faults) या लेखक से असहमत.' }
          ],
            remediations: { 'criticize-find-faults': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**शब्द-भ्रम दूर करें:** कक्षा में \'Critical\' के दो अर्थ लिखवाएँ — (अ) दैनिक: निंदा करना, (ब) अकादमिक: गहराई से.', '**मॉडलिंग करें:** एक छोटा अंश (2-3 पंक्तियाँ) लें — पहले उसका \'सार\' लिखवाएँ, फिर उसका \'विश्लेषण\' लिखवाएँ। दोनों को साथ.', '**अभ्यास दें:** \'कारतूस\' के किसी एक प्रसंग (जैसे: फौजी का थाने जाना) पर तीन प्रकार के उत्तर लिखवाएँ — (क) सारांश, (ख).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र दिए.',
          hint: 'यदि फँसें तो **c10_hin_sp_cbse_29_012 (बोध-प्रश्न)** और **c10_hin_sp_cbse_29_013.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"पाठ-आधारित उत्तर लिखने का अर्थ है पाठ के वाक्यों को कॉपी-पेस्ट (Copy-Paste).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र दिए गए',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र दिए गए', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'यदि फँसें तो **c10_hin_sp_cbse_29_012 (बोध-प्रश्न)** और **c10_hin_sp_cbse_29_013 (आलोचनात्मक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"पाठ-आधारित उत्तर लिखने का अर्थ है पाठ के वाक्यों को कॉपी-पेस्ट (Copy-Paste) कर देना या लंबे-लंबे.' }
          ],
            remediations: { 'copy-paste-long-quotations': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**मॉडलिंग (Modeling):** छात्र को एक ही प्रश्न के **दो उत्तर** दिखाएँ — एक \'कॉपी-पेस्ट/लंबा उद्धरण\' वाला (कमज़ोर) और एक.', '**साक्ष्य संक्षेपण अभ्यास (Evidence Summarizing Drill):** पाठ के 5 प्रमुख प्रसंग दें। छात्र से कहें: *"प्रत्येक को.', '**PEEL टेम्पलेट अनिवार्य करें:** अगले 3 अभ्यास प्रश्नों के लिए खाली PEEL शीट दें — **P: __ E: __ E: __ L: __** — और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी अधिगम प्रक्रिया है जिसमें विद्यार्थी पाठ का.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_29_006 (मुख्य विषय) और c10_hin_sp_cbse_29_009.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है **कहानी के मुख्य बिंदुओं (plot points) की सूची बनाना**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी अधिगम प्रक्रिया है जिसमें विद्यार्थी पाठ का सस्वर',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी अधिगम प्रक्रिया है जिसमें विद्यार्थी पाठ का सस्वर', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_29_006 (मुख्य विषय) और c10_hin_sp_cbse_29_009 (प्रतीक/विरोधाभास) दोबारा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है **कहानी के मुख्य बिंदुओं (plot points) की सूची बनाना** — जैसे "गंगू चमार था".' }
          ],
            remediations: { 'plot-points': { steps: ['**चरणबद्ध उपचार (Remediation Steps):** 1.', '**अंतर स्पष्ट करें:** छात्र को दो पैराग्राफ दें — एक वर्णनात्मक (गंगू ने कारतूस पकड़ा, ठाकुर ने मना किया, गंगू मरा).', '**\'क्यों\' का अभ्यास:** हर घटना के बाद पूछें — "लेखक ने यह घटना *क्यों* रखी?', 'अगर यह घटना न होती तो कहानी का संदेश कैसे बदलता?" — 5 बार अभ्यास कराएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
