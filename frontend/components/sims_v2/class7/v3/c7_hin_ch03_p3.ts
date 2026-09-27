import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch03_p3: SimDef = {
    id: 'v3_c7_hin_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'इस नोड में पाठ 3 के संदर्भ में विश्लेषण (तत्वों को अलग करना) और व्याख्या (अर्थ निकालना).',
    classLevel: 7, subject: 'hin', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c7_hin_ch03'],
    nodeIds: ['c7_hin_cbse_03_013', 'c7_hin_cbse_03_014', 'c7_hin_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुमने पाठ 3 पढ़ा और तुम्हें लगा "यह बहुत दुखद अंत था" — अब शिक्षक पूछते हैं: "तुम्हें ऐसा *क्यों*.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या, किसी साहित्यिक पाठ के तथ्यों, युक्तियों, पात्रों और विषयों को तार्किक ढंग से तोड़कर (विश्लेषण) उनके गहरे अर्थ, अंतर्संबंध और लेखक के उद्देश्य को समझना.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_03_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 3/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct structured.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) वे **मुख्य विषय, प्रश्न या मतभेद** होते हैं जो किसी पाठ.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_03_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या, किसी साहित्यिक पाठ के तथ्यों.',
          hint: 'यदि अटके तो c7_hin_cbse_03_008 (बिंब-रूपक) और c7_hin_cbse_03_012 (बोध-प्रश्न) दोहराएँ.',
          misconception: 'छात्र मानते हैं कि \'व्याख्या\' (Interpretation) का अर्थ है "मेरी राय में इसका मतलब यह है" — जबकि साहित्यिक व्याख्या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या, किसी साहित्यिक पाठ के तथ्यों, युक्तियों, पात्रों',
                  options: ['आलोचनात्मक चिंतन: विश्लेषण और व्याख्या, किसी साहित्यिक पाठ के तथ्यों, युक्तियों, पात्रों', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटके तो c7_hin_cbse_03_008 (बिंब-रूपक) और c7_hin_cbse_03_012 (बोध-प्रश्न) दोहराएँ — ये.',
                  misconception: 'छात्र मानते हैं कि \'व्याख्या\' (Interpretation) का अर्थ है "मेरी राय में इसका मतलब यह है" — जबकि साहित्यिक व्याख्या **पाठ-आधारित साक्ष्य**.' }
          ],
            remediations: { 'interpretation-textual-evidence-3': { steps: ['छात्र को पाठ 3 का एक छोटा अंश (4-5 पंक्तियाँ) दोबारा पढ़ने को कहो। 2.', 'पूछो: "यहाँ तुम्हें कौन-सा शब्द/वाक्य सबसे महत्वपूर्ण लगा?', 'फिर पूछो: "यह शब्द *क्या* दर्शाता है?', 'पाठ में ही इसका सबूत ढूँढ़ो।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct.',
          hint: 'यदि अटका हुआ लगे: कक्षा 6 के किसी भी पाठ (c6_hin_cbse_01_014 या c6_hin_cbse_03_014) का एक.',
          misconception: '**विशिष्ट भ्रांति:** "लंबा उत्तर = अच्छा उत्तर।" कक्षा 7 के छात्र मानते हैं कि जितना अधिक लिखेंगे, अंक उतने अधिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct structured,',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct structured,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटका हुआ लगे: कक्षा 6 के किसी भी पाठ (c6_hin_cbse_01_014 या c6_hin_cbse_03_014) का एक हल किया.',
                  misconception: '**विशिष्ट भ्रांति:** "लंबा उत्तर = अच्छा उत्तर।" कक्षा 7 के छात्र मानते हैं कि जितना अधिक लिखेंगे, अंक उतने अधिक मिलेंगे। इसलिए वे 200.' }
          ],
            remediations: { '7': { steps: ['**चरण 1:** छात्र के सामने उसका ही लिखा एक लंबा उत्तर रखें और पूछें: "इसमें तुम्हारा *दावा* (Point) कौन-सा वाक्य है?', 'उस पर पेंसिल से गोला लगाओ।" — प्रायः वह नहीं बता पाएगा। **चरण 2:** उसी उत्तर में पूछें: "पाठ की कौन-सी पंक्ति/प्रसंग.', 'उसे ढूंढकर कोष्ठक में लिखो।" — वह या तो नहीं ढूंढ पाएगा या सामान्य बात लिखेगा। **चरण 3:** एक मॉडल PEEL उत्तर (60 शब्द).', 'किसमें पाठ का प्रमाण है?" **चरण 4:** अब उसे **एक ही प्रश्न** पर दोबारा लिखने दें — इस बार **शब्द सीमा 80 शब्द** तय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) वे **मुख्य विषय, प्रश्न या मतभेद** होते हैं जो.',
          hint: 'यदि अटका हुआ लगे तो **c7_hin_cbse_03_013 (आलोचनात्मक चिंतन)** के \'प्रश्न-निर्माण\' अभ्यास.',
          misconception: '**"चर्चा में वही बोलें जिसे शिक्षक \'सही\' मानें।"** — यह सबसे घातक भ्रम है। छात्र कक्षा ६ में \'बोध-प्रश्नों\' के आदी होते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) वे **मुख्य विषय, प्रश्न या मतभेद** होते हैं जो किसी पाठ',
                  options: ['चर्चा-बिंदु (Discussion Points) वे **मुख्य विषय, प्रश्न या मतभेद** होते हैं जो किसी पाठ', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटका हुआ लगे तो **c7_hin_cbse_03_013 (आलोचनात्मक चिंतन)** के \'प्रश्न-निर्माण\' अभ्यास को दोहराएँ.',
                  misconception: '**"चर्चा में वही बोलें जिसे शिक्षक \'सही\' मानें।"** — यह सबसे घातक भ्रम है। छात्र कक्षा ६ में \'बोध-प्रश्नों\' के आदी होते हैं जहाँ **एक मॉडल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण १ — \'सही/गलत\' का लेबल हटाओ:** छात्र से कहो — *"आज कोई सही उत्तर नहीं है। केवल \'पाठ में लिखा है...', 'इसलिए मुझे लगता है...\' चलेंगे।"* **चरण २ — \'क्यों?\' की श्रृंखला चलाओ:** उसके हर कथन पर पूछो — *"पाठ में कौन-सी पंक्ति.', 'अगर वह पंक्ति न होती तो क्या तुम यह मानते?"* **चरण ३ — विपरीत पक्ष बोलने को कहो:** *"अब तुम वही तर्क दो जो तुम्हारा.', 'पाठ की किस पंक्ति ने सोच बदली?"* — यह **मेटाकॉग्निशन** विकसित करता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
