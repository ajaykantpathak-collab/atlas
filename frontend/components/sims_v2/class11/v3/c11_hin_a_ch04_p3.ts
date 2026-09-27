import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch04_p3: SimDef = {
    id: 'v3_c11_hin_a_ch04_p3',
    title: 'पाठ 4 · Part 3/3',
    subtitle: 'यह नोड पाठ 4 के सन्दर्भ में विश्लेषण और व्याख्या की प्रविधि सिखाता है — पाठगत साक्ष्य से.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 4 · Part 3/3',
    chapters: ['c11_hin_a_ch04'],
    nodeIds: ['c11_hin_a_cbse_04_013', 'c11_hin_a_cbse_04_014', 'c11_hin_a_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना करो: परीक्षा में पूछा गया — "पाठ 4 में लेखक ने \'अंधेरे\' को केवल भौतिक नहीं, मानसिक अवस्था की तरह कैसे.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तत्वों — कथानक, पात्र, भाषा, शैली, प्रतीक, बिंब — को सूक्ष्मता से परखकर, उनके पारस्परिक संबंध और गहरे अर्थ निकालने की बौद्धिक प्रक्रिया है, जिससे पाठ की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — आलोचनात्मक', 'पाठ 4 — लेखन', 'पाठ 4 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_04_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 3/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें किसी दिए गए.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — **वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक रणनीति है जिसमें पाठ के मौन वाचन या श्रवण.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 4 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तत्वों — कथानक, पात्र, भाषा, शैली.',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय) और नोड 009 (प्रतीक/विरोधाभास) को दोहराएँ — विशेषकर.',
          misconception: 'छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ पाठ में कमियाँ निकालना या नकारात्मक टिप्पणी करना है (शब्द \'आलोचना\' के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तत्वों',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के तत्वों', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य परक क्रम है जो संघर्ष (conflict) से प्रारंभ', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का समग्र'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय) और नोड 009 (प्रतीक/विरोधाभास) को दोहराएँ — विशेषकर प्रतीक की.',
                  misconception: 'छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ पाठ में कमियाँ निकालना या नकारात्मक टिप्पणी करना है (शब्द \'आलोचना\' के दैनिक प्रयोग से भ्रम)।.' }
          ],
            remediations: { 'discerning-analytical': { steps: ['चरण १: छात्र से पूछें — "तुम्हें पाठ में सबसे अधिक क्या अटपटा/रोचक/उलझनभरा लगा?" — उस स्थल को चिह्नित करवाएँ। चरण २: उस.', 'क्या Explanation भाषा/युक्ति की बात करता है?', 'क्या Link थीम तक पहुँचता है?', '— कमी जहाँ हो, वहीं रोककर समझाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें किसी दिए.',
          hint: 'यदि छात्र अटके, तो उसे **c11_hin_a_cbse_04_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)**.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर में \'अपनी भाषा में उत्तर दीजिए\' का अर्थ है पाठ के शब्दों का प्रयोग **बिल्कुल न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें किसी दिए गए',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें किसी दिए गए', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य परक क्रम है जो संघर्ष (conflict) से प्रारंभ', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का समग्र'],
                  hint: 'यदि छात्र अटके, तो उसे **c11_hin_a_cbse_04_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** पर लौटकर.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर में \'अपनी भाषा में उत्तर दीजिए\' का अर्थ है पाठ के शब्दों का प्रयोग **बिल्कुल न करना** और पूरी कहानी.' }
          ],
            remediations: { 'paraphrasing': { steps: ['**चरण 1 — निदान:** छात्र से एक छोटा प्रश्न पूछें: *"पाठ \'नमक का दारोगा\' से एक वाक्य ढूंढकर बताओ जो वंशीधर की ईमानदारी.', 'साक्ष्य से क्या संबंध है?"* — इससे वह **व्याख्या (Explanation) और पुनर्कथन (Retelling)** का अंतर समझेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_015', difficulty: 'standard',
          question: '**वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक रणनीति है जिसमें पाठ के मौन वाचन.',
          hint: 'यदि फँसें तो **नोड c11_hin_a_cbse_04_013 (आलोचनात्मक चिंतन)** के "व्याख्या के चरण" पुनः.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि चर्चा-बिंदु पर "सही उत्तर" तक पहुँचना लक्ष्य है, इसलिए वे पाठ के **उन अंशों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक रणनीति है जिसमें पाठ के मौन वाचन या श्रवण',
                  options: ['**वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक रणनीति है जिसमें पाठ के मौन वाचन या श्रवण', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य परक क्रम है जो संघर्ष (conflict) से प्रारंभ', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का समग्र'],
                  hint: 'यदि फँसें तो **नोड c11_hin_a_cbse_04_013 (आलोचनात्मक चिंतन)** के "व्याख्या के चरण" पुनः पढ़ें और एक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि चर्चा-बिंदु पर "सही उत्तर" तक पहुँचना लक्ष्य है, इसलिए वे पाठ के **उन अंशों को अनदेखा करते हैं जो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**स्पष्ट घोषणा:** "इस चर्चा में कोई \'सही उत्तर\' नहीं; लक्ष्य है पाठ के **अंतर्विरोधों (contradictions)** को उजागर.', '**मॉडलिंग:** शिक्षक स्वयं एक बिंदु पर **दो विरोधी तर्क** पाठ-साक्ष्य सहित प्रस्तुत करे (जैसे: "नायक स्वतंत्र है".', '**अभ्यास कार्य:** प्रत्येक समूह को **एक ही बिंदु पर दो विपरीत पैराग्राफ** लिखने को कहें, दोनों साक्ष्य-आधारित। 4.', '**पुनर्चर्चा:** दोनों पैराग्राफ पढ़वाकर पूछें: "पाठ कौन-सा पक्ष अधिक बल देता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
