import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch05_p3: SimDef = {
    id: 'v3_c6_hin_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'यह नोड कक्षा 6 के स्तर पर पाठ के गहन विश्लेषण (गहरे अर्थ, लेखक का दृष्टिकोण, युक्तियों का.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c6_hin_ch05'],
    nodeIds: ['c6_hin_cbse_05_013', 'c6_hin_cbse_05_014', 'c6_hin_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो तुमने एक नई फिल्म देखी और दोस्त पूछता है "कैसी लगी?" — तुम सिर्फ कहानी नहीं सुनाते, तुम कहते हो.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) का अर्थ है पाठ के स्पष्ट अर्थ से आगे जाकर उसके अंतर्निहित अर्थ, लेखक के उद्देश्य, साहित्यिक युक्तियों के प्रभाव और विषयगत गहराई का विश्लेषण (Analysis) और व्याख्या.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_05_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 3/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी पढ़े हुए पाठ (कहानी, कविता, निबंध) से **सबूत.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — **वाचन-श्रवण: चर्चा-बिंदु** एक सहयोगी भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर या.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 5 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) का अर्थ है पाठ के स्पष्ट अर्थ से आगे जाकर.',
          hint: 'यदि अटके: c6_hin_cbse_05_008 (बिंब/रूपक) और c6_hin_cbse_05_009 (प्रतीक/विरोधाभास) दोहराएँ.',
          misconception: 'छात्र मानते हैं कि "विश्लेषण" का अर्थ है पाठ में से "महत्वपूर्ण बातें छाँटना" (जैसे: मुख्य पात्र, मुख्य घटना, कठिन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) का अर्थ है पाठ के स्पष्ट अर्थ से आगे जाकर उसके',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) का अर्थ है पाठ के स्पष्ट अर्थ से आगे जाकर उसके', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'यदि अटके: c6_hin_cbse_05_008 (बिंब/रूपक) और c6_hin_cbse_05_009 (प्रतीक/विरोधाभास) दोहराएँ — ये.',
                  misconception: 'छात्र मानते हैं कि "विश्लेषण" का अर्थ है पाठ में से "महत्वपूर्ण बातें छाँटना" (जैसे: मुख्य पात्र, मुख्य घटना, कठिन शब्द) और "व्याख्या" का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को एक छोटा अनुच्छेद (4-5 पंक्तियाँ) दें जिसमें एक स्पष्ट प्रतीक हो (जैसे: "सूखा पत्ता हवा में उड़ता रहा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी पढ़े हुए पाठ (कहानी, कविता, निबंध) से.',
          hint: 'यदि अटके तो **c6_hin_cbse_05_012 (बोध-प्रश्न)** और **c6_hin_cbse_05_013 (आलोचनात्मक.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"पाठ से एक-दो वाक्य कॉपी कर देना" ही Evidence देना है**, और उसके बाद वही बात.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी पढ़े हुए पाठ (कहानी, कविता, निबंध) से **सबूत',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी पढ़े हुए पाठ (कहानी, कविता, निबंध) से **सबूत', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'यदि अटके तो **c6_hin_cbse_05_012 (बोध-प्रश्न)** और **c6_hin_cbse_05_013 (आलोचनात्मक चिंतन)**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"पाठ से एक-दो वाक्य कॉपी कर देना" ही Evidence देना है**, और उसके बाद वही बात अपने शब्दों में दोहरा.' }
          ],
            remediations: { 'evidence': { steps: ['**मॉडलिंग:** शिक्षक बोर्ड पर एक कमजोर उत्तर लिखे, फिर कक्षा के साथ मिलकर उसे PEEL में **चरण-दर-चरण** बदले — छात्रों से.', 'वह वाक्य कैसे सिद्ध करता है?', 'बड़े विषय से कैसे जुड़े?" 2.', '**रंग-कोडिंग:** छात्रों को चार रंग दें (लाल=Point, नीला=Evidence, हरा=Explanation, पीला=Link) और अपने/सहपाठी के उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_015', difficulty: 'standard',
          question: '**वाचन-श्रवण: चर्चा-बिंदु** एक सहयोगी भाषा कौशल है जिसमें छात्र किसी पाठ को.',
          hint: 'यदि अटका हुआ लगे तो **c6_hin_cbse_05_013 (आलोचनात्मक चिंतन)** और **c6_hin_cbse_05_012.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा\' का अर्थ है \'बारी-बारी से बोलना\' या \'अपनी राय देना\'** — वे चर्चा को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वाचन-श्रवण: चर्चा-बिंदु** एक सहयोगी भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर या',
                  options: ['**वाचन-श्रवण: चर्चा-बिंदु** एक सहयोगी भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर या', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'यदि अटका हुआ लगे तो **c6_hin_cbse_05_013 (आलोचनात्मक चिंतन)** और **c6_hin_cbse_05_012.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा\' का अर्थ है \'बारी-बारी से बोलना\' या \'अपनी राय देना\'** — वे चर्चा को **एकतरफा अभिव्यक्ति**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग:** शिक्षक दो छात्रों के साथ **लाइव चर्चा प्रदर्शित करे** — एक विचार रखे, दूसरा उससे सहमत/असहमत होकर.', '**संकेत कार्ड दें:** प्रत्येक छात्र को 3 कार्ड दें: **"सहमत हूँ क्योंकि..."**, **"असहमत हूँ क्योंकि..."**, **"जोड़ना.', '**\'सुनकर दोहराओ\' नियम लागू करें:** बोलने से पहले प्रत्येक छात्र को **पिछले वक्ता का मुख्य विचार अपने शब्दों में.', '**चर्चा के बाद \'संश्लेषण लेखन\' करवाएं:** 3 वाक्यों में लिखो: "चर्चा से पहले मैं सोचता था..., चर्चा के दौरान ...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
