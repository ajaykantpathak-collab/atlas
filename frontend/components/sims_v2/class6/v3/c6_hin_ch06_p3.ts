import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch06_p3: SimDef = {
    id: 'v3_c6_hin_ch06_p3',
    title: 'पाठ 6 · Part 3/3',
    subtitle: 'यह नोड कक्षा 6 के स्तर पर पाठ के गहन विश्लेषण (गहराई में जाकर कारण-परिणाम, प्रतीकात्मकता.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 6 · Part 3/3',
    chapters: ['c6_hin_ch06'],
    nodeIds: ['c6_hin_cbse_06_013', 'c6_hin_cbse_06_014', 'c6_hin_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या तुमने कभी कोई फिल्म देखी है और अंत में सोचा कि \'अरे, वह पात्र ऐसा क्यों बोला था?\' या \'वह लाल रंग का.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को गहराई से पढ़कर, उसके तथ्यों, तर्कों, साहित्यिक युक्तियों और अंतर्निहित अर्थों को अलग-अलग करके (विश्लेषण/Analysis) और फिर उन्हें जोड़कर अपना सुविचारित.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — आलोचनात्मक', 'पाठ 6 — लेखन', 'पाठ 6 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_06_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 3/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (कहानी, कविता, निबंध) को पढ़कर, उसमें से.', answer: '6 -', options: ['6 -', '6 - -'] },
            { id: 's2', label: '6 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर या सुनकर उसके.', answer: '6 - -', options: ['6 - -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 6 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को गहराई से पढ़कर, उसके तथ्यों.',
          hint: 'यदि फँस जाएँ तो **\'मुख्य विषय और संदेश\' (c6_hin_cbse_06_006)** और **\'साहित्यिक युक्तियाँ.',
          misconception: '**भ्रांति:** "आलोचनात्मक चिंतन का अर्थ है पाठ में कमियाँ निकालना (Criticize करना) या लेखक से असहमत होना।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को गहराई से पढ़कर, उसके तथ्यों, तर्कों,',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को गहराई से पढ़कर, उसके तथ्यों, तर्कों,', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'यदि फँस जाएँ तो **\'मुख्य विषय और संदेश\' (c6_hin_cbse_06_006)** और **\'साहित्यिक युक्तियाँ.',
                  misconception: '**भ्रांति:** "आलोचनात्मक चिंतन का अर्थ है पाठ में कमियाँ निकालना (Criticize करना) या लेखक से असहमत होना।" **वास्तविकता:** \'Critical\' यहाँ.' }
          ],
            remediations: { 'criticize-critical-criticize': { steps: ['**चरण 1 (भाषा सुधार):** छात्र को समझाओ: "Critical Thinking का हिंदी \'आलोचनात्मक\' शब्द भ्रमित करता है। इसे \'विवेचनात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (कहानी, कविता, निबंध) को पढ़कर.',
          hint: 'यदि अटके तो **c6_hin_cbse_06_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' दोबारा हल करें — वही.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'Evidence\' (प्रमाण)** का अर्थ है कहानी की उस घटना को अपने शब्दों में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (कहानी, कविता, निबंध) को पढ़कर, उसमें से',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (कहानी, कविता, निबंध) को पढ़कर, उसमें से', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'यदि अटके तो **c6_hin_cbse_06_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' दोबारा हल करें — वही.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'Evidence\' (प्रमाण)** का अर्थ है कहानी की उस घटना को अपने शब्दों में **दोहराना.' }
          ],
            remediations: { 'evidence-paraphrasing-summarizing': { steps: ['**चरण 1 (मॉडलिंग):** छात्र के सामने एक छोटा पाठ (3-4 वाक्य) रखें। उससे एक सरल प्रश्न पूछें (जैसे "नायक दयालु है?")।.', 'यहाँ पंक्ति 2 में लिखा है \'उसने भूखे कुत्ते को रोटी दी\' — यही मेरा Evidence है। अब Explanation: इसका मतलब वह जानवरों से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर या सुनकर.',
          hint: 'अगर अटके तो **c6_hin_cbse_06_012 (बोध-प्रश्न)** और **c6_hin_cbse_06_006 (मुख्य विषय)**.',
          misconception: 'छात्र अक्सर समझते हैं कि **\'चर्चा\' का अर्थ है \'जोर से और ज्यादा बोलना\'**। वे सोचते हैं कि जो सबसे ज्यादा बोले, वही.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर या सुनकर उसके',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर या सुनकर उसके', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'अगर अटके तो **c6_hin_cbse_06_012 (बोध-प्रश्न)** और **c6_hin_cbse_06_006 (मुख्य विषय)** दोहराएं.',
                  misconception: 'छात्र अक्सर समझते हैं कि **\'चर्चा\' का अर्थ है \'जोर से और ज्यादा बोलना\'**। वे सोचते हैं कि जो सबसे ज्यादा बोले, वही जीता। असल में चर्चा का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक छोटा पाठ (5-6 पंक्तियाँ) पढ़वाएं और कहें: "पहले केवल सुनो/पढ़ो, फिर मुझे तीन बातें बताओ जो तुम्हें याद रहीं.', 'फिर कहें: "अब अपनी राय दो: तुम सहमत हो या नहीं, और **क्यों**?" (यह **तर्क देना** सिखाता है)। 3.', 'जोड़ी में अभ्यास करवाएं: एक बोले, दूसरा उसकी बात अपने शब्दों में दोहराए ("तो तुम कह रहे हो कि..."), फिर भूमिका बदलें।.', 'अंत में पूरी कक्षा में \'विचार-चक्र\' (idea circle) चलाएं जहां हर बच्चे को एक वाक्य बोलना अनिवार्य हो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
