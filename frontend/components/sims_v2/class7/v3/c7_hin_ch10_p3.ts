import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch10_p3: SimDef = {
    id: 'v3_c7_hin_ch10_p3',
    title: 'मीरा के पद · Part 3/3',
    subtitle: 'इस नोड में **मीरा के पदों के विशिष्ट पद्यांशों** का सूक्ष्म विश्लेषण (अलंकार, बिंब.',
    classLevel: 7, subject: 'hin', topic: 'मीरा के पद · Part 3/3',
    chapters: ['c7_hin_ch10'],
    nodeIds: ['c7_hin_cbse_10_013', 'c7_hin_cbse_10_014', 'c7_hin_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुम एक **जासूस** हो और मीरा का पद एक **सुराग भरा पत्र** है जिसे पढ़कर तुम्हें मीरा के मन की हालत.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'मीरा के पद — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण और विश्लेषण अभ्यास वह प्रक्रिया है जिसमें पद्यांश के शब्दार्थ से आगे बढ़कर उसके **गहन भाव, प्रतीकात्मक अर्थ, काव्यात्मक युक्तियों का प्रभाव, और कवि के मनोभावों की व्याख्या** की जाती.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['मीरा के पद —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_hin_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You finished मीरा के पद — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण और विश्लेषण अभ्यास वह प्रक्रिया है जिसमें पद्यांश के शब्दार्थ से.',
          hint: 'यदि फँस जाएँ तो **c7_hin_cbse_10_007 (प्रतीक और बिंब)** और **c7_hin_cbse_10_006.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'आशय स्पष्टीकरण\' का अर्थ है \'भावार्थ लिखना\'** और **\'विश्लेषण\' का अर्थ है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण और विश्लेषण अभ्यास वह प्रक्रिया है जिसमें पद्यांश के शब्दार्थ से आगे बढ़कर',
                  options: ['आशय-स्पष्टीकरण और विश्लेषण अभ्यास वह प्रक्रिया है जिसमें पद्यांश के शब्दार्थ से आगे बढ़कर', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)'],
                  hint: 'यदि फँस जाएँ तो **c7_hin_cbse_10_007 (प्रतीक और बिंब)** और **c7_hin_cbse_10_006 (अलंकार)** दोबारा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'आशय स्पष्टीकरण\' का अर्थ है \'भावार्थ लिखना\'** और **\'विश्लेषण\' का अर्थ है \'अलंकारों के नाम गिनाना\'**।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग (Modeling):** शिक्षक एक छोटा पद्यांश (2 पंक्तियाँ) ले और **सोचते हुए (Think-Aloud)** बोले: "मैं देख रहा हूँ.', 'क्योंकि अहंकार धीरे-धीरे जाता है।" छात्र देखें कि **विश्लेषण कैसे सोचा जाता है**। 2.', '**संयुक्त अभ्यास (Guided Practice):** अगले पद्यांश में छात्रों से पूछें: "यहाँ \'आग\' शब्द आया - यह जलाने वाली आग है या.', 'प्रमाण दो पद से।" शिक्षक **PEEL ढांचे** में उत्तर लिखवाए। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है NCERT पाठ्यक्रम के अनुसार, किसी भी पद्यांश.',
          hint: 'यदि अटके: c7_hin_cbse_10_013 (आशय-स्पष्टीकरण अभ्यास) पर लौटें — वहाँ एक पद का.',
          misconception: 'विद्यार्थी समझते हैं कि **"उद्धरण (कोटेशन) लिख देना ही सबूत (Evidence) है"**। वे पंक्ति नकल कर लेते हैं (जैसे: "पग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है NCERT पाठ्यक्रम के अनुसार, किसी भी पद्यांश या गद्यांश',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है NCERT पाठ्यक्रम के अनुसार, किसी भी पद्यांश या गद्यांश', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)'],
                  hint: 'यदि अटके: c7_hin_cbse_10_013 (आशय-स्पष्टीकरण अभ्यास) पर लौटें — वहाँ एक पद का वाक्य-दर-वाक्य अर्थ.',
                  misconception: 'विद्यार्थी समझते हैं कि **"उद्धरण (कोटेशन) लिख देना ही सबूत (Evidence) है"**। वे पंक्ति नकल कर लेते हैं (जैसे: "पग घूँघरू बाँध मीरा नाची.' }
          ],
            remediations: { 'evidence': { steps: ['**चरण 1:** विद्यार्थी को एक कमज़ोर उत्तर दिखाओ जहाँ केवल उद्धरण हो, व्याख्या न हो। पूछो: "क्या परीक्षक को पता चलेगा कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_015', difficulty: 'standard',
          question: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है मीरा के पदों को सही उच्चारण, लय, भाव और गति.',
          hint: 'अगर फँस जाएँ तो c7_hin_cbse_10_002 (भावार्थ) और c7_hin_cbse_10_010 (कठिन शब्द/मुहावरे).',
          misconception: 'छात्र समझते हैं कि मीरा के पद **सिर्फ भजन/धार्मिक गीत** हैं जिन्हें मंदिर में गाया जाता है, इसलिए वे इन्हें **भावहीन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है मीरा के पदों को सही उच्चारण, लय, भाव और गति के साथ',
                  options: ['वाचन-पाठ और चर्चा-बिंदु का अर्थ है मीरा के पदों को सही उच्चारण, लय, भाव और गति के साथ', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)'],
                  hint: 'अगर फँस जाएँ तो c7_hin_cbse_10_002 (भावार्थ) और c7_hin_cbse_10_010 (कठिन शब्द/मुहावरे) दोबारा पढ़ें.',
                  misconception: 'छात्र समझते हैं कि मीरा के पद **सिर्फ भजन/धार्मिक गीत** हैं जिन्हें मंदिर में गाया जाता है, इसलिए वे इन्हें **भावहीन रटंत (mechanical.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम**: छात्र को अकेले ले जाकर पद की **पहली दो पंक्तियाँ ढोलक/तबले/मोबाइल ऐप की थाप पर** गवाएँ — केवल लय पकड़ने.', '**दूसरा कदम**: उनसे पूछें — "जब तुम नाचते हो खुशी में, तो पैर अपने-आप थिरकते हैं या सोचकर चलते हो?" — फिर बताएँ: मीरा.', '**तीसरा कदम**: एक प्रतीक (जैसे \'घुंघरू\') चुनकर पूछें — "तुम्हारे जीवन में \'घुंघरू\' क्या है जो तुम्हें नचाता है?".', '**चौथा कदम**: कक्षा में **सामूहिक वाचन (choral reading)** कराएँ जहाँ शिक्षक लय देता हो, छात्र पीछे-पीछे दोहराएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
