import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch09_p3: SimDef = {
    id: 'v3_c6_hin_ch09_p3',
    title: 'पाठ 9 · Part 3/3',
    subtitle: 'यह नोड पाठ 9 के संदर्भ में विश्लेषण (analysis: विवरणों को तोड़कर देखना) और व्याख्या.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 9 · Part 3/3',
    chapters: ['c6_hin_ch09'],
    nodeIds: ['c6_hin_cbse_09_013', 'c6_hin_cbse_09_014', 'c6_hin_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो तुमने अपने दोस्त को मुस्कुराते देखा, पर उसकी आँखें नम थीं — तुम तुरंत समझ गए कि वह खुश नहीं, दुख.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के विवरणों (शब्दों, घटनाओं, पात्रों के व्यवहार) को देखकर उनके गहरे अर्थ, संबंध और लेखक के उद्देश्य को समझने और व्याख्या करने की प्रक्रिया है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — आलोचनात्मक', 'पाठ 9 — लेखन', 'पाठ 9 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_09_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 3/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए पाठ.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) वे विशिष्ट विषय, प्रश्न या मुद्दे होते हैं जिन पर समूह.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 9 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के विवरणों (शब्दों, घटनाओं, पात्रों के.',
          hint: 'यदि फँसे तो c6_hin_cbse_09_008 (बिंब/रूपक) और c6_hin_cbse_09_009 (विरोधाभास/प्रतीक).',
          misconception: 'छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **पाठ में कमियाँ निकालना** या **लेखक से असहमत होना**। उदाहरण: "लेखक ने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के विवरणों (शब्दों, घटनाओं, पात्रों के व्यवहार)',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के विवरणों (शब्दों, घटनाओं, पात्रों के व्यवहार)', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि फँसे तो c6_hin_cbse_09_008 (बिंब/रूपक) और c6_hin_cbse_09_009 (विरोधाभास/प्रतीक) दोबारा देखें.',
                  misconception: 'छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **पाठ में कमियाँ निकालना** या **लेखक से असहमत होना**। उदाहरण: "लेखक ने नायक को कमज़ोर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "चलो \'आलोचना\' शब्द को किनारे रखते हैं; हम आज **\'जासूस\'** बनेंगे।" 2.', 'एक छोटा अंश दें (2-3 वाक्य) और तीन प्रश्न पूछें: (क) यहाँ कौन-से शब्द बार-बार आए?', '(ख) कौन-सा बिंब/प्रतीक दिखा?', '(ग) ये दोनों मिलकर क्या *संकेत* देते हैं?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी.',
          hint: 'यदि अटकें तो \'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक\' (c6_hin_cbse_09_012) के \'कीवर्ड खोज\'.',
          misconception: 'छात्र समझते हैं कि पाठ-आधारित उत्तर का अर्थ है पाठ का अनुवाद या सारांश अपने शब्दों में लिख देना — वे प्रमाण (Evidence).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए पाठ',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी दिए गए पाठ', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटकें तो \'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक\' (c6_hin_cbse_09_012) के \'कीवर्ड खोज\' अभ्यास और.',
                  misconception: 'छात्र समझते हैं कि पाठ-आधारित उत्तर का अर्थ है पाठ का अनुवाद या सारांश अपने शब्दों में लिख देना — वे प्रमाण (Evidence) और व्याख्या.' }
          ],
            remediations: { 'evidence-explanation': { steps: ['छात्र को एक छोटा अंश (४-५ पंक्तियाँ) दें और पूछें: "यहाँ कौन-सी तीन बातें तथ्य (Fact) के रूप में लिखी हैं?" — उसे.', 'फिर पूछें: "इनमें से कौन-सी बात प्रश्न \'पात्र मेहनती है\' का उत्तर देती है?" — केवल उसी को चुनवाएं। 3.', 'अब कहें: "यह तुम्हारा Evidence है। अब अपने शब्दों में लिखो: यह बात मेहनत कैसे सिद्ध करती है?" — यही Explanation है। 4.', 'अंत में दोनों को जोड़कर PEEL में लिखवाएं। ३-४ अभ्यास के बाद वह अंतर समझ जाएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) वे विशिष्ट विषय, प्रश्न या मुद्दे होते हैं जिन.',
          hint: 'यदि अटका महसूस हो तो **c6_hin_cbse_09_002 (कथानक)** और **c6_hin_cbse_09_006 (मुख्य.',
          misconception: '**भ्रांति:** "चर्चा-बिंदु का मतलब है पाठ से 5-6 प्रश्न *तैयार करके लाना* और कक्षा में *पढ़कर सुना देना*।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) वे विशिष्ट विषय, प्रश्न या मुद्दे होते हैं जिन पर समूह',
                  options: ['चर्चा-बिंदु (Discussion Points) वे विशिष्ट विषय, प्रश्न या मुद्दे होते हैं जिन पर समूह', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका महसूस हो तो **c6_hin_cbse_09_002 (कथानक)** और **c6_hin_cbse_09_006 (मुख्य विषय)** दोबारा.',
                  misconception: '**भ्रांति:** "चर्चा-बिंदु का मतलब है पाठ से 5-6 प्रश्न *तैयार करके लाना* और कक्षा में *पढ़कर सुना देना*।" **वास्तविकता:** चर्चा-बिंदु.' }
          ],
            remediations: { '5-6': { steps: ['**मॉडलिंग:** शिक्षक स्वयं एक खराब बिंदु ("पात्र का नाम?") और एक अच्छा बिंदु ("पात्र ने ऐसा क्यों किया?") बोले, फिर.', '**सुनने का अभ्यास:** जोड़ियों में 1 मिनट बोलने/सुनने का खेल — बोलने वाला अपनी बात कहे, सुनने वाला *बिना राय दिए* दोहराए.', '**वाक्य-शुरुआत (Sentence Starters) कार्ड बाँटो:** "मैं सहमत हूँ क्योंकि...", "मैं असहमत हूँ क्योंकि...", "क्या आप समझा.', '**चर्चा के बाद 2 मिनट का मौन लेखन:** "आज मैंने क्या नया सुना जो मैं नहीं जानता था?" — यह मेटाकॉग्निशन विकसित करता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
