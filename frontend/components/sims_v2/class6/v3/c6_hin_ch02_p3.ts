import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch02_p3: SimDef = {
    id: 'v3_c6_hin_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'यह नोड कक्षा 6 के स्तर पर पाठ के गहन पठन (close reading), साहित्यिक युक्तियों की पहचान.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c6_hin_ch02'],
    nodeIds: ['c6_hin_cbse_02_013', 'c6_hin_cbse_02_014', 'c6_hin_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो कि तुमने एक नई फिल्म देखी और दोस्त पूछता है "कैसी लगी?" — तुम सिर्फ "अच्छी थी" नहीं कहते, बल्कि.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी सोचने की प्रक्रिया है जिसमें हम किसी पाठ को ध्यान से पढ़कर उसके भागों को अलग करते हैं (विश्लेषण/Analysis), फिर उनके अर्थ और महत्त्व को अपने शब्दों में.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_02_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 3/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — लेखन कौशल: पाठ-आधारित का अर्थ है किसी पढ़े गए पाठ (कहानी, कविता, लेख) के आधार पर अपने.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जिन पर समूह में.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_02_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी सोचने की प्रक्रिया है जिसमें हम.',
          hint: 'यदि अटका हुआ लगे तो c6_hin_cbse_02_008 (बिंब और रूपक) और c6_hin_cbse_02_012 (बोध-प्रश्न.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है पाठ में **कमियाँ निकालना** (criticize.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी सोचने की प्रक्रिया है जिसमें हम किसी पाठ को',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी सोचने की प्रक्रिया है जिसमें हम किसी पाठ को', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'यदि अटका हुआ लगे तो c6_hin_cbse_02_008 (बिंब और रूपक) और c6_hin_cbse_02_012 (बोध-प्रश्न: सबूत.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है पाठ में **कमियाँ निकालना** (criticize = fault-finding) या अपनी **निजी.' }
          ],
            remediations: { 'criticize-fault-finding': { steps: ['**शब्द स्पष्टीकरण:** बोर्ड पर लिखें — "आलोचनात्मक = गहराई से जाँच करना (critically examine), न कि बुराई करना।" उदाहरण.', '**मॉडलिंग:** एक छोटा अंश लें (2-3 पंक्तियाँ)। जोर से पढ़ें और **सोचते हुए बोलें (Think-aloud):** "मैं देख रहा हूँ लेखक.', '**निर्देशित अभ्यास:** छात्रों को PEEL शीट दें (चार खाने बने हों)। उन्हीं पंक्तियों पर मिलकर भरें। 4.', '**स्वतंत्र प्रयास:** नया अंश दें, छात्र स्वयं भरें। गलती होने पर पूछें: "तुम्हारे सबूत (Evidence) में कौन से शब्द हैं?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी पढ़े गए पाठ (कहानी, कविता, लेख) के आधार.',
          hint: 'यदि अटके तो **c6_hin_cbse_02_012 (बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक)** के \'पाठ से उत्तर.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'Evidence (सबूत)\' का अर्थ है कहानी की कोई भी घटना बता देना**। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी पढ़े गए पाठ (कहानी, कविता, लेख) के आधार पर अपने',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है किसी पढ़े गए पाठ (कहानी, कविता, लेख) के आधार पर अपने', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'यदि अटके तो **c6_hin_cbse_02_012 (बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक)** के \'पाठ से उत्तर ढूंढना\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'Evidence (सबूत)\' का अर्थ है कहानी की कोई भी घटना बता देना**। वे लिखते हैं: "नायक अच्छा है, क्योंकि.' }
          ],
            remediations: { 'evidence': { steps: ['**पाठ पर लौटें:** छात्र से कहें: "पाठ खोलो और वह **सटीक वाक्य/शब्द** ढूंढो जो तुम्हारे दावे को साबित करता हो। उसे कॉपी.', '**रंगीन हाइलाइटिंग:** तीन रंगों से चिह्नित करो — **पीला** = बिंदु, **हरा** = सबूत (उद्धरण), **नीला** = व्याख्या.', '**मौखिक अभ्यास:** पहले बोलकर समझाओ: "मेरा दावा X है, सबूत Y है (पाठ पढ़कर सुनाओ), इसलिए Z है, यह विषय W से जुड़ता है।".', '**दैनिक अभ्यास:** रोज़ एक छोटा अनुच्छेद पढ़कर एक PEEL उत्तर लिखो (5 मिनट)। शिक्षक/अभिभावक केवल संरचना जाँचें, सामग्री.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जिन पर समूह.',
          hint: 'यदि अटके तो **बोध-प्रश्न (c6_hin_cbse_02_012)** के "आशय-सूचक प्रश्न" दोबारा हल करें — वे.',
          misconception: 'छात्र समझते हैं कि चर्चा-बिंदु बनाने का अर्थ है **"विवादास्पद विषय चुनना"** या **"ऐसा प्रश्न पूछना जिसका उत्तर कोई न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जिन पर समूह में',
                  options: ['चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जिन पर समूह में', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'यदि अटके तो **बोध-प्रश्न (c6_hin_cbse_02_012)** के "आशय-सूचक प्रश्न" दोबारा हल करें — वे.',
                  misconception: 'छात्र समझते हैं कि चर्चा-बिंदु बनाने का अर्थ है **"विवादास्पद विषय चुनना"** या **"ऐसा प्रश्न पूछना जिसका उत्तर कोई न जानता हो"**。 वास्तव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को एक छोटा अनुच्छेद (5-6 वाक्य) पढ़ने को दो — जैसे "पेड़ लगाने का महत्व"। चरण 2: उससे कहो: "इसमें से **तीन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
