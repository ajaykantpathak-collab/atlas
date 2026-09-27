import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch11_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch11_p3',
    title: 'पाठ 11 · Part 3/3',
    subtitle: 'यह नोड पाठ 11 के संदर्भ में विश्लेषण और व्याख्या की **प्रक्रिया** और **उत्तर-लेखन.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 11 · Part 3/3',
    chapters: ['c9_hin_ga_ch11'],
    nodeIds: ['c9_hin_ga_cbse_11_013', 'c9_hin_ga_cbse_11_014', 'c9_hin_ga_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'कल्पना करें कि आपने एक फिल्म देखी और दोस्त पूछता है, "कैसी लगी?" आप कहते हैं, "अच्छी थी।" लेकिन अगर वह पूछे.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ की गहन जांच-परख है जिसमें पाठ के घटकों (कथानक, पात्र, भाषा, शैली) को अलग-अलग करके उनके पारस्परिक संबंध और रचनाकार के उद्देश्य को समझा जाता है.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — आलोचनात्मक', 'पाठ 11 — लेखन', 'पाठ 11 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_11_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 3/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (गद्य/काव्य) के विशिष्ट अंशों.', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक संरचित संवाद कौशल है जिसमें विद्यार्थी किसी पाठ, विषय या.', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 11 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ की गहन जांच-परख है.',
          hint: 'यदि अटका हुआ महसूस हो तो **c9_hin_ga_cbse_11_006 (मुख्य विषय)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ पाठ में **कमियाँ निकालना**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ की गहन जांच-परख है जिसमें पाठ के',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ की गहन जांच-परख है जिसमें पाठ के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c9_hin_ga_cbse_11_006 (मुख्य विषय)** और **c9_hin_ga_cbse_11_008/009.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ पाठ में **कमियाँ निकालना** (Criticizing/Fault-finding) या अपनी.' }
          ],
            remediations: { 'criticizing-fault-finding': { steps: ['**चरण 1:** छात्र को एक छोटा अंश (4-5 पंक्तियाँ) दें और पूछें: "यहाँ लेखक ने *क्या* लिखा है?" (तथ्य)। फिर पूछें: "लेखक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (गद्य/काव्य) के विशिष्ट.',
          hint: 'यदि फँसें तो c9_hin_ga_cbse_11_013 (आलोचनात्मक चिंतन) और c9_hin_ga_cbse_11_012.',
          misconception: 'छात्र मानते हैं कि \'पाठ से उद्धरण देना\' ही प्रमाण देना है — वे 3-4 पंक्तियाँ नकल कर देते हैं और समझते हैं विश्लेषण हो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (गद्य/काव्य) के विशिष्ट अंशों,',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी साहित्यिक पाठ (गद्य/काव्य) के विशिष्ट अंशों,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक'],
                  hint: 'यदि फँसें तो c9_hin_ga_cbse_11_013 (आलोचनात्मक चिंतन) और c9_hin_ga_cbse_11_012 (बोध-प्रश्न) दोहराएँ.',
                  misconception: 'छात्र मानते हैं कि \'पाठ से उद्धरण देना\' ही प्रमाण देना है — वे 3-4 पंक्तियाँ नकल कर देते हैं और समझते हैं विश्लेषण हो गया। वास्तव में.' }
          ],
            remediations: { '3-4-evidence-explanation': { steps: ['चरण 1: छात्र से एक कमजोर उत्तर (केवल उद्धरण वाला) लें और उससे पूछें: "यह पंक्ति तुम्हारे तर्क को कैसे सिद्ध करती है?', 'अपने शब्दों में समझाओ।" चरण 2: उसके मौखिक उत्तर को लिखकर दिखाएँ — वही Explanation है। चरण 3: अब उसे वही उत्तर PEEL में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित संवाद कौशल है जिसमें विद्यार्थी किसी पाठ.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 013 (आलोचनात्मक चिंतन)** पर लौटें — वहाँ विकसित विश्लेषण.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि चर्चा-बिंदु में **"सही उत्तर" देना** होता है — इसलिए वे पाठ का \'सारांश\' रट लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित संवाद कौशल है जिसमें विद्यार्थी किसी पाठ, विषय या',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक संरचित संवाद कौशल है जिसमें विद्यार्थी किसी पाठ, विषय या', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 013 (आलोचनात्मक चिंतन)** पर लौटें — वहाँ विकसित विश्लेषण कौशल ही.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि चर्चा-बिंदु में **"सही उत्तर" देना** होता है — इसलिए वे पाठ का \'सारांश\' रट लेते हैं या शिक्षक की.' }
          ],
            remediations: { 'fact-based': { steps: ['**पाठ से 3 खुले प्रश्न बनवाओ** — "क्या...?", "कैसे...?", "क्यों...?" से शुरू होने वाले, जिनके एक से अधिक उत्तर संभव.', '**प्रत्येक प्रश्न के लिए 2-2 तर्क** लिखवाओ: एक **पक्ष में**, एक **विपक्ष में** — दोनों पाठ के साक्ष्य से। 3.', '**रोल-प्ले करवाओ:** दो छात्र एक ही बिंदु पर विपरीत पक्ष लें, तीसरा **संयोजक (moderator)** बने जो "पाठ में कहाँ लिखा.', '**फीडबैक दें:** "तुम्हारा तर्क मज़बूत होता अगर तुम पंक्ति 12 का हवाला देते" — **व्यक्तिगत राय** और **पाठ-आधारित तर्क**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
