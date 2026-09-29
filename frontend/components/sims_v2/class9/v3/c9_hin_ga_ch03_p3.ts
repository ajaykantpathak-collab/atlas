import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch03_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'यह नोड पाठ 3 (गंगा पाठ्यपुस्तक) के संदर्भ में केवल विश्लेषण और व्याख्या की **प्रक्रिया और.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c9_hin_ga_ch03'],
    nodeIds: ['c9_hin_ga_cbse_03_013', 'c9_hin_ga_cbse_03_014', 'c9_hin_ga_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'उपभोक्तावाद की संस्कृति\' का विश्लेषण — (निबंध) का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'उपभोक्तावाद की संस्कृति\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_03_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 3/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — \'उपभोक्तावाद की संस्कृति\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — \'उपभोक्तावाद की संस्कृति\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_03_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_013', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि अटका हुआ महसूस हो तो: **c9_hin_ga_cbse_03_009 (विरोधाभास और प्रतीक) और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **पाठ में कमियाँ निकालना (finding faults)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' का आलोचनात्मक चिंतन',
                  options: ['\'उपभोक्तावाद की संस्कृति\' का आलोचनात्मक चिंतन', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो: **c9_hin_ga_cbse_03_009 (विरोधाभास और प्रतीक) और c9_hin_ga_cbse_03_008.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **पाठ में कमियाँ निकालना (finding faults)** या **लेखक से असहमत होना.' }
          ],
            remediations: { 'finding-faults-disagreeing-with-author': { steps: ['**चरणबद्ध उपचार (Step-by-step Remediation):** 1.', '**शब्द स्पष्टीकरण:** कक्षा में \'आलोचना\' (Criticism) और \'आलोचनात्मक चिंतन\' (Critical Thinking) के दो वाक्य लिखवाएं.', '**मॉडलिंग:** पाठ 3 के एक छोटे अंश (3-4 पंक्तियों) पर **सोचकर बोलें (Think-Aloud)** — "मैं देखता हूँ लेखक ने यहाँ रूपक.', 'यह रूपक पात्र की मनोदशा कैसे खोलता है...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_014', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की.',
          hint: 'यदि फँसें तो: **c9_hin_ga_cbse_03_012 (बोध-प्रश्न)** के वस्तुनिष्ठ प्रश्नों को हल करें—वे.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "पाठ-आधारित लेखन" का अर्थ **पाठ का सारांश (Summary) लिखना** या **पात्र का गुणगान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' पर पाठ-आधारित लेखन',
                  options: ['\'उपभोक्तावाद की संस्कृति\' पर पाठ-आधारित लेखन', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो: **c9_hin_ga_cbse_03_012 (बोध-प्रश्न)** के वस्तुनिष्ठ प्रश्नों को हल करें—वे Evidence.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "पाठ-आधारित लेखन" का अर्थ **पाठ का सारांश (Summary) लिखना** या **पात्र का गुणगान (Glorification).' }
          ],
            remediations: { 'summary-glorification': { steps: ['**चरण १ (मॉडलिंग)**: छात्र को एक कमजोर उत्तर (केवल गुणों की सूची) और एक मजबूत उत्तर (PEEL संरचना में) साथ-साथ दिखाएँ।.', '**चरण २ (संयुक्त अभ्यास)**: एक छोटा पाठ अंश (४-५ पंक्ति) दें। साथ मिलकर एक Point बनाएँ। फिर छात्र से कहें: "पाठ से एक.', '**चरण ३ (स्वतंत्र अभ्यास)**: नया प्रश्न दें। छात्र पहले **रफ में PEEL के चार खाने भरे**, फिर फेयर कॉपी में लिखे।.', 'क्या Explanation में \'क्यों/कैसे\' है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_015', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि अटका हुआ महसूस हो तो **c9_hin_ga_cbse_03_013 (आलोचनात्मक चिंतन)** के \'विश्लेषण चरण\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है **\'पाठ का सारांश (Summary) बोलना\'** या **\'अपनी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'उपभोक्तावाद की संस्कृति\' पर वाचन-श्रवण और चर्चा-बिंदु', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c9_hin_ga_cbse_03_013 (आलोचनात्मक चिंतन)** के \'विश्लेषण चरण\' और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है **\'पाठ का सारांश (Summary) बोलना\'** या **\'अपनी पसंद/नापसंद बताना\'.' }
          ],
            remediations: { 'summary-like-dislike': { steps: ['**चरण 1 (निदान):** छात्र से कहो: "पाठ का वह अंश पढ़कर सुनाओ जिसने तुम्हारा यह विचार बनाया।" यदि वह नहीं बता पाता →.', 'क्या मुख्य विषय से जोड़ा?" — यह **\'मेटाकॉग्निशन\' (Metacognition)** विकसित करता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
