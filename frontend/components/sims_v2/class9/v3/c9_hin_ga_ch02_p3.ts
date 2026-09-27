import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch02_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'यह नोड पाठ के आलोचनात्मक विश्लेषण और व्याख्या पर केंद्रित है; यह पाठ के शब्दार्थ (शाब्दिक.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c9_hin_ga_ch02'],
    nodeIds: ['c9_hin_ga_cbse_02_013', 'c9_hin_ga_cbse_02_014', 'c9_hin_ga_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'कल्पना कीजिए कि आप अपने दोस्त के साथ एक समाचार लेख पढ़ रहे हैं और वह कहता है, " इस लेख में लिखा है कि.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें कोई पाठ को गहराई से जाँचता है, उसके तर्क, साक्ष्य और छिपे हुए अर्थों का विश्लेषण करता है, और तार्किक निष्कर्ष निकालता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_02_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 3/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह भाषिक क्षमता है जिसमें छात्र किसी दिए.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक सहयोगात्मक भाषा-कौशल है जिसमें शिक्षार्थी किसी पाठ को पढ़कर या.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_02_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें कोई पाठ को गहराई से जाँचता है, उसके.',
          hint: 'पाठ के बोध-प्रश्नों (वस्तुनिष्ठ और आशय-सूचक) की अवधारणा को review करें, विशेषकर उन.',
          misconception: 'छात्र अक्सर मानते हैं कि आलोचनात्मक चिंतन का अर्थ है पाठ में लिखी हर बात पर संदेह करना और लेखक की विश्वसनीयता को हमेशा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें कोई पाठ को गहराई से जाँचता है, उसके तर्क, साक्ष्य',
                  options: ['आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें कोई पाठ को गहराई से जाँचता है, उसके तर्क, साक्ष्य', '"पृष्ठभूमि और रचनाकार परिचय" refers to the contextual study of the socio-historical,', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य-श्रृंखलाबद्ध क्रम है जो आरंभ, विकास,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **भौगोलिक स्थान, ऐतिहासिक'],
                  hint: 'पाठ के बोध-प्रश्नों (वस्तुनिष्ठ और आशय-सूचक) की अवधारणा को review करें, विशेषकर उन प्रश्नों पर जहाँ.',
                  misconception: 'छात्र अक्सर मानते हैं कि आलोचनात्मक चिंतन का अर्थ है पाठ में लिखी हर बात पर संदेह करना और लेखक की विश्वसनीयता को हमेशा चुनौती देना, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाएँ कि एक संतुलित आलोचना कैसी दिखती है: पहले उन्हें कोई ऐसा पाठ दें जिसका तर्क स्पष्ट और साक्ष्य-समर्थित हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह भाषिक क्षमता है जिसमें छात्र.',
          hint: 'यदि फँसें तो **c9_hin_ga_cbse_02_006 (मुख्य विषय), c9_hin_ga_cbse_02_004 (नायक चित्रण).',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित लेखन का अर्थ है पाठ की कहानी अपने शब्दों में दोहरा देना (paraphrase/summary)।"* **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह भाषिक क्षमता है जिसमें छात्र किसी दिए',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह भाषिक क्षमता है जिसमें छात्र किसी दिए', '"पृष्ठभूमि और रचनाकार परिचय" refers to the contextual study of the socio-historical,', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य-श्रृंखलाबद्ध क्रम है जो आरंभ, विकास,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **भौगोलिक स्थान, ऐतिहासिक'],
                  hint: 'यदि फँसें तो **c9_hin_ga_cbse_02_006 (मुख्य विषय), c9_hin_ga_cbse_02_004 (नायक चित्रण).',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित लेखन का अर्थ है पाठ की कहानी अपने शब्दों में दोहरा देना (paraphrase/summary)।"* **गलत तर्क:** छात्र सोचते.' }
          ],
            remediations: { 'paraphrase-summary': { steps: ['**पहचान कराओ:** छात्र को उसका लिखा एक पुराना उत्तर दो और पूछो: *"इसमें Point कहाँ है?', 'Link कहाँ है?"* — उसे स्वयं **PEEL के खाली खाने** दिखने दो। 2.', '**मॉडल दिखाओ:** उसी प्रश्न का **कमजोर उत्तर (केवल वर्णन)** और **मजबूत उत्तर (PEEL)** साथ रखो। उससे पूछो: *"दूसरे में.', '**संयुक्त अभ्यास:** एक छोटा पाठांश दो, एक प्रश्न दो, और **केवल एक PEEL पैराग्राफ** लिखने को कहो — पहले मौखिक रूप से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक सहयोगात्मक भाषा-कौशल है जिसमें शिक्षार्थी किसी पाठ.',
          hint: 'यदि अटके तो c9_hin_ga_cbse_02_002 (कथानक संरचना) और c9_hin_ga_cbse_02_006 (मुख्य विषय).',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "चर्चा-बिंदु" का अर्थ है **पाठ से संबंधित कोई भी रोचक प्रश्न पूछ लेना** (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक सहयोगात्मक भाषा-कौशल है जिसमें शिक्षार्थी किसी पाठ को पढ़कर या',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक सहयोगात्मक भाषा-कौशल है जिसमें शिक्षार्थी किसी पाठ को पढ़कर या', '"पृष्ठभूमि और रचनाकार परिचय" refers to the contextual study of the socio-historical,', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य-श्रृंखलाबद्ध क्रम है जो आरंभ, विकास,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **भौगोलिक स्थान, ऐतिहासिक'],
                  hint: 'यदि अटके तो c9_hin_ga_cbse_02_002 (कथानक संरचना) और c9_hin_ga_cbse_02_006 (मुख्य विषय) दोहराएं.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "चर्चा-बिंदु" का अर्थ है **पाठ से संबंधित कोई भी रोचक प्रश्न पूछ लेना** (जैसे: "लेखक ने यह शब्द क्यों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक परिचित कहानी (जैसे "पंचतंत्र" की कोई कथा) दें और कहें: "इस कहानी में पात्र के सामने **दो मूल्य टकराते हैं**.', 'फिर पूछें: "इन दोनों मूल्यों में से किसे चुनने पर कहानी का परिणाम बदल जाता?" — यही द्वंद्व-बिंदु है। 3.', 'अब उस द्वंद्व को "क्या...?" प्रश्न में बदलने का अभ्यास कराएं। 4.', 'अंत में कहें: "यही प्रक्रिया अपने पाठ्य-पुस्तक के किसी पाठ पर लागू करो।" — इससे वे **तथ्य-प्रश्न** और **द्वंद्व-आधारित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
