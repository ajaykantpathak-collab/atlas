import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch26_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch26_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch26_p3',
    title: 'तीसरी कसम के शल्पिकार शैलेंद्र · Part 3/3',
    subtitle: 'यह नोड **केवल** \'तीसरी कसम के शिल्पकार शैलेंद्र\' पाठ पर केंद्रित आलोचनात्मक विश्लेषण और.',
    classLevel: 10, subject: 'hin_sp', topic: 'तीसरी कसम के शल्पिकार शैलेंद्र · Part 3/3',
    chapters: ['c10_hin_sp_ch26'],
    nodeIds: ['c10_hin_sp_cbse_26_013', 'c10_hin_sp_cbse_26_014', 'c10_hin_sp_cbse_26_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'आपने कभी सोचा है कि शैलेंद्र ने हीरामन को \'तीसरी कसम\' खाते ही क्यों दिखाया — पहली या दूसरी क्यों नहीं?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तीसरी कसम के शल्पिकार शैलेंद्र — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक रचना के गहन विश्लेषण और व्याख्या की वह प्रक्रिया है जिसमें पाठ के तथ्यों, साहित्यिक युक्तियों, पात्रों के मनोविज्ञान, विषय-वस्तु और रचनाकार के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_26_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तीसरी कसम के शल्पिकार'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_26_015', title: 'You made it',
          caseStudy: { intro: 'You finished तीसरी कसम के शल्पिकार शैलेंद्र — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक रचना के गहन विश्लेषण और.',
          hint: 'अगर फंसें तो: c10_hin_sp_cbse_26_006 (मुख्य विषय) पर लौटें — हर आलोचनात्मक विश्लेषण अंततः.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' = **\'कमियाँ निकालना\' या \'नकारात्मक टिप्पणी करना\'**। उदाहरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक रचना के गहन विश्लेषण और व्याख्या की',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक रचना के गहन विश्लेषण और व्याख्या की', '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी', 'कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत क्रम है,', '**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित भौगोलिक'],
                  hint: 'अगर फंसें तो: c10_hin_sp_cbse_26_006 (मुख्य विषय) पर लौटें — हर आलोचनात्मक विश्लेषण अंततः विषय की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' = **\'कमियाँ निकालना\' या \'नकारात्मक टिप्पणी करना\'**। उदाहरण: "शैलेंद्र ने हीराबाई.' }
          ],
            remediations: { 'choices': { steps: ['**मॉडल दिखाएं:** बोर्ड परीक्षा के एक उत्कृत्त उत्तर (3-5 अंक) और एक कमजोर उत्तर को साथ रखें — छात्र से पूछें: "दूसरे.', '**\'क्यों\' सीढ़ी (Why Ladder) अभ्यास:** किसी एक वाक्य/प्रतीक पर 3 बार \'क्यों\' पूछें — जैसे: "हीरामन ने तीसरी कसम क्यों.', '**PEEL संरचना लागू करें:** Point (दावा) → Evidence (पाठ संदर्भ) → Explanation (युक्ति/प्रभाव विश्लेषण) → Link.', '**साप्ताहिक \'माइक्रो-विश्लेषण\':** पाठ के एक छोटे अंश (2-3 वाक्य) पर केवल 100 शब्दों में आलोचनात्मक टिप्पणी लिखने का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी.',
          hint: 'यदि अटके: c10_hin_sp_cbse_26_004 (हीरामन का चरित्र) और c10_hin_sp_cbse_26_006 (मुख्य.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पाठ-आधारित लेखन" का अर्थ है **पाठ का अनुवाद/सारांश (summary/paraphrase).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए', '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी', 'कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत क्रम है,', '**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित भौगोलिक'],
                  hint: 'यदि अटके: c10_hin_sp_cbse_26_004 (हीरामन का चरित्र) और c10_hin_sp_cbse_26_006 (मुख्य विषय) को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पाठ-आधारित लेखन" का अर्थ है **पाठ का अनुवाद/सारांश (summary/paraphrase) लिखना** — वे प्रश्न का.' }
          ],
            remediations: { 'summary-paraphrase-6-9-comprehension': { steps: ['**चरणबद्ध उपचार (Step-by-step Remediation):** 1.', '**अंतर स्पष्ट करें:** छात्र को दो उत्तर दिखाएँ — एक **सारांश-आधारित**, एक **विश्लेषण-आधारित** (ऊपर दिए गए उदाहरण की.', 'कौन-सा केवल कहानी सुनाता है?"* 2.', '**\'क्यों?\' का अभ्यास कराएँ:** हर दावे (claim) के बाद पूछें — *"पाठ में कहाँ लिखा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_015', difficulty: 'standard',
          question: '**वाचन-श्रवण: चर्चा-बिंदु** एक शैक्षिक प्रक्रिया है जिसमें शिक्षक और छात्र.',
          hint: 'यदि अटके: **c10_hin_sp_cbse_26_013 (आलोचनात्मक चिंतन)** के \'तर्क-निर्माण\' और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **"चर्चा में बोलना = अच्छा प्रदर्शन"** — इसलिए वे **जोर से, लंबे समय तक, बिना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वाचन-श्रवण: चर्चा-बिंदु** एक शैक्षिक प्रक्रिया है जिसमें शिक्षक और छात्र मिलकर किसी पाठ',
                  options: ['**वाचन-श्रवण: चर्चा-बिंदु** एक शैक्षिक प्रक्रिया है जिसमें शिक्षक और छात्र मिलकर किसी पाठ', '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी', 'कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत क्रम है,', '**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित भौगोलिक'],
                  hint: 'यदि अटके: **c10_hin_sp_cbse_26_013 (आलोचनात्मक चिंतन)** के \'तर्क-निर्माण\' और \'साक्ष्य-आधारित.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **"चर्चा में बोलना = अच्छा प्रदर्शन"** — इसलिए वे **जोर से, लंबे समय तक, बिना साक्ष्य के** बोलने की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — **"तुम्हारी बात सही हो सकती है, लेकिन पाठ में वह पंक्ति कहाँ है जो तुम्हारा समर्थन करे?', 'उँगली रखकर दिखाओ।"** (साक्ष्य माँगना) **चरण 2**: यदि वह न ढूँढ़ पाए, तो **शिक्षक स्वयं पाठ खोलकर** वह प्रसंग पढ़वाएँ और.', 'समझाओ।"** (तर्क जोड़ना) **चरण 3**: फिर कहें — **"अब यही बात एक वाक्य में, साक्ष्य सहित, लिखकर दो।"** (लेखन में ढालना).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
