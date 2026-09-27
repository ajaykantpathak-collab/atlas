import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch03_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'This node covers *only* the skill of writing structured *aashay-spashtikaran* and.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c10_hin_ks_ch03'],
    nodeIds: ['c10_hin_ks_cbse_03_013', 'c10_hin_ks_cbse_03_014', 'c10_hin_ks_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'You open the CBSE sample paper and see: "निम्नलिखित पंक्तियों का आशय स्पष्ट कीजिए" followed by four lines.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'दिए गए पदांश में "चंद्रवदन" शब्द आया है। केवल अलंकार का नाम लिखना पर्याप्त क्यों नहीं है? बोर्ड परीक्षा की दृष्टि से समझाइए।',
        options: ['**Correct answer:** केवल "उपमा अलंकार" लिखने से 1 में से 0.5 अंक मिलते हैं', 'उपमा अलंकार', '**What a wrong answer reveals:** If the student says'],
        answer: '**Correct answer:** केवल "उपमा अलंकार" लिखने से 1 में से 0.5 अंक मिलते हैं',
        hook: '**Exact error:** Students treat *aashay-spashtikaran* as "write the bhaavarth in difficult Hindi" — they replace simple.',
    },
    teaching: [
        { title: 'पाठ 3 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '**आशय-स्पष्टीकरण** (Explanation of purport/intent) is a structured written response where the student (1) states the literal meaning of the given lines, (2) identifies the central thought/emotion the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — आशय-स्पष्टीकरण', 'पाठ 3 — परीक्षा-उत्तर', 'पाठ 3 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_03_013', title: 'पाठ 3 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास',
          caseStudy: { intro: 'You open the CBSE sample paper and see: "निम्नलिखित पंक्तियों का आशय स्पष्ट कीजिए" followed by four lines from the Dev savaiya.',
            decisions: [{ prompt: '"आशय-स्पष्टीकरण" और "भावार्थ" में क्या अंतर है? एक वाक्य में लिखिए।', options: [
                { text: '**Correct answer:** भावार्थ केवल शब्दों का शाब्दिक अर्थ देता है, जबकि आशय-स्पष्टीकरण कवि', outcome: '**Correct answer:** भावार्थ केवल शब्दों का शाब्दिक अर्थ देता है, जबकि आशय-स्पष्टीकरण कवि के गहन.' },
                { text: 'दोनों एक ही हैं', outcome: 'Not quite — **Exact error:** Students treat *aashay-spashtikaran* as "write the bhaavarth in difficult Hindi".', reveals: 'exact-error-students-treat-aashay' },
                { text: 'भावार्थ सरल भाषा में अर्थ है', outcome: 'Not quite — **Exact error:** Students treat *aashay-spashtikaran* as "write the bhaavarth in difficult Hindi".', reveals: 'exact-error-students-treat-aashay' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 3 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_013', difficulty: 'standard',
          question: '**आशय-स्पष्टीकरण** (Explanation of purport/intent) is a structured written.',
          hint: 'If stuck, review **c10_hin_ks_cbse_03_004** (केंद्रीय भाव और रस) for ras/sthayi bhava and.',
          misconception: '**Exact error:** Students treat *aashay-spashtikaran* as "write the bhaavarth in difficult Hindi" — they replace simple.',
          parts: [
                { id: 'a', prompt: 'दिए गए पदांश में "चंद्रवदन" शब्द आया है। केवल अलंकार का नाम लिखना पर्याप्त क्यों नहीं है? बोर्ड परीक्षा की दृष्टि से समझाइए।', answer: '**Correct answer:** केवल "उपमा अलंकार" लिखने से 1 में से 0.5 अंक मिलते हैं',
                  options: ['**Correct answer:** केवल "उपमा अलंकार" लिखने से 1 में से 0.5 अंक मिलते हैं', 'उपमा अलंकार', '**What a wrong answer reveals:** If the student says'],
                  hint: 'If stuck, review **c10_hin_ks_cbse_03_004** (केंद्रीय भाव और रस) for ras/sthayi bhava and.',
                  misconception: '**Exact error:** Students treat *aashay-spashtikaran* as "write the bhaavarth in difficult Hindi" — they replace simple words with Tatsama.' },
                { id: 'b', prompt: 'एक पदांश दिया गया है जिसमें "अनुप्रास अलंकार" और "वीर रस" दोनों विद्यमान हैं। आप 60 शब्दों में आशय-स्पष्टीकरण कैसे लिखेंगे? चरणबद्ध लिखिए।', answer: '**Correct steps:** 1',
                  options: ['**Correct steps:** 1', 'उत्साह स्थायी भाव है, विभाव- अनुभाव-संचारी भाव से सिद्ध होता है।', 'अनुप्रास और वीर रस से कविता सुंदर लगती है'],
                  hint: 'If stuck, review **c10_hin_ks_cbse_03_004** (केंद्रीय भाव और रस) for ras/sthayi bhava and.',
                  misconception: '**Exact error:** Students treat *aashay-spashtikaran* as "write the bhaavarth in difficult Hindi" — they replace simple words with Tatsama.' }
          ],
            remediations: { 'exact-error-students-treat-aashay': { steps: ['**Diagnose:** Ask the student to write *aashay* for a 2-line stanza.', 'If they produce only paraphrase, say: "यह भावार्थ है, आशय नहीं।" 2.', '**Model:** Show the 4-move template (literal → intent → device1+effect → device2+effect) on the *same* stanza.', '**Scaffold:** Give a fill-in-the-blank frame: "शाब्दिक अर्थ: ______.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल वह व्यवस्थित प्रक्रिया है जिसमें छात्र प्रश्न की मांग.',
          hint: 'यदि अटका हुआ महसूस हो तो c10_hin_ks_cbse_03_013 (आशय-स्पष्टीकरण अभ्यास) पर लौटें — वहाँ.',
          misconception: 'छात्र समझते हैं कि "उत्तर लिखना = पाठ की बातें याद करके लिख देना" — इसलिए वे कविता की पंक्तियाँ रटते हैं और परीक्षा में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल वह व्यवस्थित प्रक्रिया है जिसमें छात्र प्रश्न की मांग पहचानता है,',
                  options: ['परीक्षा-उत्तर लेखन कौशल वह व्यवस्थित प्रक्रिया है जिसमें छात्र प्रश्न की मांग पहचानता है,', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक संदर्भ,', 'पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक पद्यांश', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है: पदों/बंधों'],
                  hint: 'यदि अटका हुआ महसूस हो तो c10_hin_ks_cbse_03_013 (आशय-स्पष्टीकरण अभ्यास) पर लौटें — वहाँ एक पंक्ति.',
                  misconception: 'छात्र समझते हैं कि "उत्तर लिखना = पाठ की बातें याद करके लिख देना" — इसलिए वे कविता की पंक्तियाँ रटते हैं और परीक्षा में वही उगल देते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से एक 3-अंक का पुराना उत्तर मांगें और साथ बैठकर PEEL रंगों से हाइलाइट करवाएँ — Point (लाल), Evidence.', 'इसे जोड़ने के लिए पाठ से कौन-सी पंक्ति लाएंगे?" चरण 3: एक नया समान प्रश्न दें और केवल 10 मिनट में PEEL लिखने को कहें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_015', difficulty: 'standard',
          question: 'वाचन-पाठ का अर्थ है कविता/गद्य को सही उच्चारण, विराम चिह्न, लय और भाव के साथ.',
          hint: 'यदि अटकें तो c10_hin_ks_cbse_03_002 (भावार्थ) और c10_hin_ks_cbse_03_007 (प्रतीक-बिंब) को.',
          misconception: 'छात्र समझते हैं कि "वाचन-पाठ" का अर्थ केवल जोर से पढ़ना है और "चर्चा-बिंदु" का अर्थ पुस्तक के पीछे दिए प्रश्नों को याद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ का अर्थ है कविता/गद्य को सही उच्चारण, विराम चिह्न, लय और भाव के साथ जोर से पढ़ना',
                  options: ['वाचन-पाठ का अर्थ है कविता/गद्य को सही उच्चारण, विराम चिह्न, लय और भाव के साथ जोर से पढ़ना', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक संदर्भ,', 'पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक पद्यांश', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है: पदों/बंधों'],
                  hint: 'यदि अटकें तो c10_hin_ks_cbse_03_002 (भावार्थ) और c10_hin_ks_cbse_03_007 (प्रतीक-बिंब) को दोबारा.',
                  misconception: 'छात्र समझते हैं कि "वाचन-पाठ" का अर्थ केवल जोर से पढ़ना है और "चर्चा-बिंदु" का अर्थ पुस्तक के पीछे दिए प्रश्नों को याद करना है। वे कविता के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को कविता की किसी एक पंक्ति को तीन तरह से पढ़ने को कहें — (क) सपाट, (क) केवल अर्थ पर जोर, (ग) भाव+लय+विराम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
