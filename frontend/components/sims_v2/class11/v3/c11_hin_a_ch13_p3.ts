import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch13_p3: SimDef = {
    id: 'v3_c11_hin_a_ch13_p3',
    title: 'जाग तुझको दूर जाना · Part 3/3',
    subtitle: 'This node covers the **methodology and practice of writing high-scoring \'Ashaya.',
    classLevel: 11, subject: 'hin_a', topic: 'जाग तुझको दूर जाना · Part 3/3',
    chapters: ['c11_hin_a_ch13'],
    nodeIds: ['c11_hin_a_cbse_13_013', 'c11_hin_a_cbse_13_014', 'c11_hin_a_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'You sit in the exam hall, staring at a 3-mark question: *"निम्नलिखित पंक्तियों का आशय स्पष्ट कीजिए..."*.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'कविता के तीसरे पद में "पथिक" शब्द का प्रयोग \'राही\' या \'यात्री\' के बजाय क्यों किया गया होगा? वाचन के समय इस शब्द पर आप कैसा ठहराव (पॉज़) लेंगे?',
        options: ['\'पथिक\' में \'पथ\' (मार्ग) + \'इक\' (संबंध) का भाव है', 'reading aloud correctly without mistakes', 'answering the questions given at the end of the chapter'],
        answer: '\'पथिक\' में \'पथ\' (मार्ग) + \'इक\' (संबंध) का भाव है',
        hook: 'Students believe वाचन-पाठ means "reading aloud correctly without mistakes" and चर्चा-बिंदु means "answering the.',
    },
    teaching: [
        { title: 'जाग तुझको दूर जाना — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण (Explanation of Purport) is the critical-exegetical process of interpreting a specific poetic stanza or line by identifying the **context (प्रसंग)**, **literal meaning (शाब्दिक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_13_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['जाग तुझको दूर जाना'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_13_015', title: 'जाग तुझको दूर जाना — वाचन-पाठ और चर्चा-बिंदु',
          caseStudy: { intro: 'Have you ever noticed how a song feels completely different when you hum it yourself versus just hearing it on your phone?',
            decisions: [{ prompt: '"जाग तुझको दूर जाना" कविता का पहला पद पढ़ते समय \'जाग\' शब्द पर बल देने का क्या उद्देश्य है?', options: [
                { text: '\'जाग\' पर बल देने से कविता का आदेशात्मक/उत्साहवर्धक स्वर (imperative/hortative tone) उभरता', outcome: '\'जाग\' पर बल देने से कविता का आदेशात्मक/उत्साहवर्धक स्वर (imperative/hortative tone) उभरता है — यह.' },
                { text: 'reading aloud correctly without mistakes', outcome: 'Not quite — Students believe वाचन-पाठ means "reading aloud correctly without mistakes" and चर्चा-बिंदु means.', reveals: 'means-reading-aloud-correctly-without' },
                { text: 'answering the questions given at the end of the chapter', outcome: 'Not quite — Students believe वाचन-पाठ means "reading aloud correctly without mistakes" and चर्चा-बिंदु means.', reveals: 'means-reading-aloud-correctly-without' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'You finished जाग तुझको दूर जाना — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण (Explanation of Purport) is the critical-exegetical process.',
          hint: 'If stuck on the \'Explanation\' step (E2), immediately revisit **c11_hin_a_cbse_13_006.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-स्पष्टीकरण\' का अर्थ है \'कठिन शब्दों के अर्थ लिखना\' + \'पंक्तियों का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण (Explanation of Purport) is the critical-exegetical process of',
                  options: ['आशय-स्पष्टीकरण (Explanation of Purport) is the critical-exegetical process of', '\'कवि परिचय और पृष्ठभूमि\' वह साहित्यिक विश्लेषण-कौशल है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य है'],
                  hint: 'If stuck on the \'Explanation\' step (E2), immediately revisit **c11_hin_a_cbse_13_006 (Alankar)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-स्पष्टीकरण\' का अर्थ है \'कठिन शब्दों के अर्थ लिखना\' + \'पंक्तियों का क्रमबद्ध अनुवाद करना\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**\'क्या\' vs \'क्यों\' का अभ्यास (5 मिनट):** छात्र को एक पंक्ति दें (जैसे: "जलाकर दीप, तू ज्योति बन जा")। दो कॉलम बनवाएं.', '(उत्तर: सक्रिय त्याग दर्शाने हेतु)। \'दीप\' और \'ज्योति\' में क्रमिकता क्यों?', '(उत्तर: कारण-कार्य भाव)।" जब तक कॉलम B, कॉलम A से लंबा न हो, आशय-स्पष्टीकरण अधूरा है। 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) वह **संरचनात्मक प्रक्रिया**.',
          hint: 'यदि **Point (P) बनाने में अटकें** → **c11_hin_a_cbse_13_004 (केंद्रीय भाव)** और.',
          misconception: '**विशिष्ट भ्रांति**: **"अच्छा उत्तर = अच्छा हिंदी + पाठ का सही ज्ञान"** — छात्र मानते हैं कि यदि उनकी **भाषा शुद्ध.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) वह **संरचनात्मक प्रक्रिया** है जिसमें',
                  options: ['परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) वह **संरचनात्मक प्रक्रिया** है जिसमें', '\'कवि परिचय और पृष्ठभूमि\' वह साहित्यिक विश्लेषण-कौशल है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य है'],
                  hint: 'यदि **Point (P) बनाने में अटकें** → **c11_hin_a_cbse_13_004 (केंद्रीय भाव)** और.',
                  misconception: '**विशिष्ट भ्रांति**: **"अच्छा उत्तर = अच्छा हिंदी + पाठ का सही ज्ञान"** — छात्र मानते हैं कि यदि उनकी **भाषा शुद्ध (Correct Language)** है.' }
          ],
            remediations: { 'correct-language-memorized-text': { steps: ['**चरणबद्ध उपचार (Stepwise Remediation)**: 1.', '**\'कमांड वर्ड मैपिंग\' ड्रिल (Command Word Mapping Drill)**: 10 पूर्व-परीक्षा प्रश्न लें — प्रत्येक में **कमांड वर्ड.', '**\'पीईईएल टेम्पलेट\' पर 5 उत्तर लिखें (Write 5 Answers on PEEL Template)**: एक A4 शीट पर **PEEL के 4 कॉलम (Columns)**.', '**\'उद्धरण एम्बेडिंग\' अभ्यास (Quote Embedding Practice)**: पाठ से **5 प्रमुख पंक्तियाँ चुनें** — प्रत्येक को **अपने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_015', difficulty: 'standard',
          question: 'वाचन-पाठ और चर्चा-बिंदु refers to the integrated pedagogical practice of (1).',
          hint: 'If stuck, return to c11_hin_a_cbse_13_004 (केंद्रीय भाव और रस) and c11_hin_a_cbse_13_005.',
          misconception: 'Students believe वाचन-पाठ means "reading aloud correctly without mistakes" and चर्चा-बिंदु means "answering the.',
          parts: [
                { id: 'a', prompt: 'कविता के तीसरे पद में "पथिक" शब्द का प्रयोग \'राही\' या \'यात्री\' के बजाय क्यों किया गया होगा? वाचन के समय इस शब्द पर आप कैसा ठहराव (पॉज़) लेंगे?', answer: '\'पथिक\' में \'पथ\' (मार्ग) + \'इक\' (संबंध) का भाव है',
                  options: ['\'पथिक\' में \'पथ\' (मार्ग) + \'इक\' (संबंध) का भाव है', 'reading aloud correctly without mistakes', 'answering the questions given at the end of the chapter', 'कवि कौन है?'],
                  hint: 'If stuck, return to c11_hin_a_cbse_13_004 (केंद्रीय भाव और रस) and c11_hin_a_cbse_13_005 (छंद और.',
                  misconception: 'Students believe वाचन-पाठ means "reading aloud correctly without mistakes" and चर्चा-बिंदु means "answering the questions given at the end.' },
                { id: 'b', prompt: 'कविता की किसी एक पंक्ति को चुनकर उसे तीन अलग-अलग भावों (उदासी, उत्साह, चेतावनी) में पढ़कर दिखाएँ — प्रत्येक पाठ में आपने स्वर/गति/विराम में क्या परिवर्तन किए?', answer: 'उदाहरण: "सूरज उग आया है, अब सो मत रहो"',
                  options: ['उदाहरण: "सूरज उग आया है, अब सो मत रहो"', 'reading aloud correctly without mistakes', 'answering the questions given at the end of the chapter', 'कवि कौन है?'],
                  hint: 'If stuck, return to c11_hin_a_cbse_13_004 (केंद्रीय भाव और रस) and c11_hin_a_cbse_13_005 (छंद और.',
                  misconception: 'Students believe वाचन-पाठ means "reading aloud correctly without mistakes" and चर्चा-बिंदु means "answering the questions given at the end.' },
                { id: 'c', prompt: 'कविता के अंतिम दो पदों की तुलना करें: पहले पद में \'जाग\' क्रिया है, अंतिम पद में \'चल\' — इस परिवर्तन का कविता की गति (momentum) और चर्चा-बिंदु निर्माण पर क्या.', answer: '\'जाग\' स्थैतिक → गतिशील संक्रमण है (जागरण), \'चल\' निरंतर गति का आदेश है (प्रस्थान)',
                  options: ['\'जाग\' स्थैतिक → गतिशील संक्रमण है (जागरण), \'चल\' निरंतर गति का आदेश है (प्रस्थान)', 'reading aloud correctly without mistakes', 'answering the questions given at the end of the chapter', 'कवि कौन है?'],
                  hint: 'If stuck, return to c11_hin_a_cbse_13_004 (केंद्रीय भाव और रस) and c11_hin_a_cbse_13_005 (छंद और.',
                  misconception: 'Students believe वाचन-पाठ means "reading aloud correctly without mistakes" and चर्चा-बिंदु means "answering the questions given at the end.' }
          ],
            remediations: { 'means-reading-aloud-correctly-without': { steps: ['Have the student record themselves reading the first stanza twice — once "for marks," once "to wake up a sleeping.', 'Give them the poem with all punctuation removed. Ask them to re-insert pauses/slashes (/) where their *voice* naturally.', 'For चर्चा-बिंदु, use the "Question Storm" protocol: 2 minutes, write 10 questions *no one can answer with a single.', 'Pair students; each must answer partner\'s question using *only a line from the poem* as evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe वाचन-पाठ means "reading aloud correctly without mistakes" and चर्चा-बिंदु means "answering the.',
          parts: [
                { id: 'a', prompt: 'कक्षा में एक छात्र कहता है: "वाचन-पाठ समय की बर्बादी है; चुपचाप पढ़कर भावार्थ समझ लेना बेहतर है।" आप इस तर्क का खंडन करते हुए *दो* ठोस कारण दें जो कक्षा 11 के.', answer: 'कारण 1: कविता मूलतः श्रव्य कला (auditory art) है',
                  options: ['कारण 1: कविता मूलतः श्रव्य कला (auditory art) है', 'reading aloud correctly without mistakes', 'answering the questions given at the end of the chapter', 'कवि कौन है?'],
                  hint: 'If stuck, return to c11_hin_a_cbse_13_004 (केंद्रीय भाव और रस) and c11_hin_a_cbse_13_005 (छंद और.',
                  misconception: 'Students believe वाचन-पाठ means "reading aloud correctly without mistakes" and चर्चा-बिंदु means "answering the questions given at the end.' }
          ],
            remediations: { 'means-reading-aloud-correctly-without': { steps: ['Have the student record themselves reading the first stanza twice — once "for marks," once "to wake up a sleeping.', 'Give them the poem with all punctuation removed. Ask them to re-insert pauses/slashes (/) where their *voice* naturally.', 'For चर्चा-बिंदु, use the "Question Storm" protocol: 2 minutes, write 10 questions *no one can answer with a single.', 'Pair students; each must answer partner\'s question using *only a line from the poem* as evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
