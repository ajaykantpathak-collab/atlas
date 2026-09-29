import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch17_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch17_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch17_p3',
    title: 'पद · Part 3/3',
    subtitle: 'यह नोड **केवल** \'पद\' कविता (सूरदास/मीराबाई/कबीर आदि NCERT स्पर्श भाग-2 में संकलित) के.',
    classLevel: 10, subject: 'hin_sp', topic: 'पद · Part 3/3',
    chapters: ['c10_hin_sp_ch17'],
    nodeIds: ['c10_hin_sp_cbse_17_013', 'c10_hin_sp_cbse_17_014', 'c10_hin_sp_cbse_17_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'स्पर्श भाग-2 — पाठ 17\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पद — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'स्पर्श भाग-2 — पाठ 17\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_17_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पद — आशय-स्पष्टीकरण और', 'पद — परीक्षा-उत्तर लेखन', 'पद — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_17_015', title: 'You made it',
          caseStudy: { intro: 'You finished पद — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_013', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 17\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि **प्रसंग पहचानने** में अटके → नोड 002 (पद्यांश-वार भावार्थ) के \'प्रसंग\' खंड को.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **आशय-स्पष्टीकरण = प्रत्येक शब्द का अर्थ + पंक्ति का अनुवाद**। **वास्तविकता**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 17\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'स्पर्श भाग-2 — पाठ 17\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रैदास का जीवन-वृत्त (पंद्रहवीं-सोलहवीं सदी, बनारस,', '\'स्पर्श भाग-2 — पाठ 17\' का कथानक — \'स्पर्श भाग-2 — पाठ 17\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि **प्रसंग पहचानने** में अटके → नोड 002 (पद्यांश-वार भावार्थ) के \'प्रसंग\' खंड को दोहराएँ; यदि.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **आशय-स्पष्टीकरण = प्रत्येक शब्द का अर्थ + पंक्ति का अनुवाद**। **वास्तविकता**: बोर्ड मार्किंग स्कीम.' }
          ],
            remediations: { 'cbse-2023-24-20': { steps: ['**चरणबद्ध उपचार (3 दिन का माइक्रो-प्लान)**: **दिन 1 — संरचना आंतरिकरण**: NCERT स्पर्श के किन्हीं **2 पदों** के.', 'बढ़ाता/गहरा करता/मोड़ देता है" — **संयोजक पदबंधों** (अतः, इस प्रकार, यहाँ तक कि, विपरीततः) का प्रयोग करें। **मूल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_014', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 17\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटके: c10_hin_sp_cbse_17_002 (भावार्थ), c10_hin_sp_cbse_17_004 (केंद्रीय भाव).',
          misconception: '**विशिष्ट भ्रांति:** "मुझे कविता का भावार्थ, अलंकार, छंद सब याद है — परीक्षा में वही लिख दूंगा, अंक मिल जाएंगे।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 17\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'स्पर्श भाग-2 — पाठ 17\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रैदास का जीवन-वृत्त (पंद्रहवीं-सोलहवीं सदी, बनारस,', '\'स्पर्श भाग-2 — पाठ 17\' का कथानक — \'स्पर्श भाग-2 — पाठ 17\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके: c10_hin_sp_cbse_17_002 (भावार्थ), c10_hin_sp_cbse_17_004 (केंद्रीय भाव).',
                  misconception: '**विशिष्ट भ्रांति:** "मुझे कविता का भावार्थ, अलंकार, छंद सब याद है — परीक्षा में वही लिख दूंगा, अंक मिल जाएंगे।" **वास्तविकता:** बोर्ड.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित सुधार (4 चरण):** 1.', '**\'कमजोर उत्तर → मजबूत उत्तर\' परिवर्तन अभ्यास:** कक्षा में 3 कमजोर उत्तर (केवल तथ्य/सूची) दिखाओ, छात्रों से PEEL लागू.', '**माइक्रो-लेखन ड्रिल:** रोज 1 प्रश्न (3 अंक), 7 मिनट टाइमर, केवल PEEL संरचना पर फोकस — कंटेंट नहीं, **संरचना** जांचो। 3.', '**मार्किंग-स्कीम अनुकरण:** CBSE सैंपल पेपर की मार्किंग स्कीम देकर छात्रों से अपने साथी का उत्तर जंचवाओ — \'परीक्षक की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_015', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 17\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि विद्यार्थी ब्रज-भाषा के शब्दार्थ या छंद-लय में अटके, तो **c10_hin_sp_cbse_17_010.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि **\'वाचन-पाठ\' का अर्थ केवल \'ज़ोर से पढ़ना\' (reading aloud) है**, और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 17\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का',
                  options: ['\'स्पर्श भाग-2 — पाठ 17\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रैदास का जीवन-वृत्त (पंद्रहवीं-सोलहवीं सदी, बनारस,', '\'स्पर्श भाग-2 — पाठ 17\' का कथानक — \'स्पर्श भाग-2 — पाठ 17\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि विद्यार्थी ब्रज-भाषा के शब्दार्थ या छंद-लय में अटके, तो **c10_hin_sp_cbse_17_010 (पदावली: कठिन.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि **\'वाचन-पाठ\' का अर्थ केवल \'ज़ोर से पढ़ना\' (reading aloud) है**, और \'चर्चा-बिंदु\' का अर्थ \'शिक्षक.' }
          ],
            remediations: { 'reading-aloud': { steps: ['**चरण 1 (निदान):** विद्यार्थी से एक पद सस्वर पढ़ने को कहें — यदि वह **एकरस (monotone), तेज़ गति से, विराम बिना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
