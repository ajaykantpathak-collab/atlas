import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch10_p1: SimDef = {
    id: 'v3_c7_hin_ch10_p1',
    title: 'मीरा के पद · Part 1/3',
    subtitle: 'यह नोड केवल मीरा का जीवन-परिचय, ऐतिहासिक पृष्ठभूमि (राजपूताना समाज, भक्ति आंदोलन) और उनके.',
    classLevel: 7, subject: 'hin', topic: 'मीरा के पद · Part 1/3',
    chapters: ['c7_hin_ch10'],
    nodeIds: ['c7_hin_cbse_10_001', 'c7_hin_cbse_10_002', 'c7_hin_cbse_10_003', 'c7_hin_cbse_10_004', 'c7_hin_cbse_10_005', 'c7_hin_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो: तुम 12 साल के हो, तुम्हें कोई खिलौना इतना प्यारा लग जाए कि तुम खाना-पीना भूल जाओ — मीरा को बचपन.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'नीचे दिए गए पदांश को पढ़कर बताइए कि इसमें केंद्रीय भाव और रस कैसे प्रकट हो रहे हैं — "मेरे तो गिरधर गोपाल, दूसरो न कोई। जाके सिर मोर मुकुट, मेरो पति सोई।।"',
        options: ['**Correct answer with steps**: 1', 'मोर मुकुट से शृंगार रस बनता है', 'भक्ति रस'],
        answer: '**Correct answer with steps**: 1',
        hook: '**Specific error**: Students believe that because Mira uses romantic imagery (पिय, मिलन, आलिंगन, सेज, श्रृंगार), her.',
    },
    teaching: [
        { title: 'मीरा के पद — कवि परिचय और पृष्ठभूमि', text: 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को अपना जीवन समर्पित किया; उनकी रचनाएँ \'पद\' शैली में ब्रजभाषा-राजस्थानी मिश्रित भाषा में हैं, जिनमें प्रेम-भक्ति.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['मीरा के पद —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_hin_cbse_10_004', title: 'मीरा के पद — केंद्रीय भाव और रस',
          caseStudy: { intro: 'Have you ever noticed how a lullaby makes you feel sleepy and safe, while a patriotic song gives you goosebumps? That\'s रस at work — the emotional flavor.',
            decisions: [{ prompt: 'मीरा के पदों का केंद्रीय भाव क्या है? एक वाक्य में लिखिए।', options: [
                { text: '**Correct answer**: मीरा के पदों का केंद्रीय भाव कृष्ण के प्रति अनन्य भक्ति, पूर्ण समर्पण', outcome: '**Correct answer**: मीरा के पदों का केंद्रीय भाव कृष्ण के प्रति अनन्य भक्ति, पूर्ण समर्पण और.' },
                { text: 'कृष्ण से प्रेम', outcome: 'Not quite — **Specific error**: Students believe that because Mira uses romantic imagery (पिय, मिलन, आलिंगन.', reveals: 'specific-error-students-believe-that' },
                { text: 'भक्ति रस', outcome: 'Not quite — **Specific error**: Students believe that because Mira uses romantic imagery (पिय, मिलन, आलिंगन.', reveals: 'specific-error-students-believe-that' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hin_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through मीरा के पद like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? मीरा के पद · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — मीरा के पद · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_001', difficulty: 'standard',
          question: 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने.',
          hint: 'अगर अटके तो कक्षा 6 के \'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय\' (c6_hin_cbse_01_001) और.',
          misconception: 'छात्र मानते हैं कि मीरा का विद्रोह **\'धार्मिक\'** था (वे कृष्ण को मानती थीं, परिवार शिव/देवी को)। असल में मीरा के परिवार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को',
                  options: ['मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)', 'केंद्रीय भाव (Central Theme) is the core philosophical or emotional idea that runs'],
                  hint: 'अगर अटके तो कक्षा 6 के \'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय\' (c6_hin_cbse_01_001) और इतिहास की.',
                  misconception: 'छात्र मानते हैं कि मीरा का विद्रोह **\'धार्मिक\'** था (वे कृष्ण को मानती थीं, परिवार शिव/देवी को)। असल में मीरा के परिवार और ससुराल **दोनों**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पूछो — "अगर मीरा के पति भी कृष्ण-भक्त होते, तो क्या मीरा विद्रोह करती?" (उत्तर: हाँ, क्योंकि पति-भक्त.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है — कविता के प्रत्येक पद्यांश (stanza) के **गहरे.',
          hint: 'यदि अटका हुआ लगे: **c7_hin_cbse_10_001 (कवि परिचय)** दोहराएँ — विशेषकर "विष का प्याला" और.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **भावार्थ = शब्दार्थ + प्रसंग की एक पंक्ति**। उदाहरण: "मेरे तो गिरधर गोपाल" का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)', 'केंद्रीय भाव (Central Theme) is the core philosophical or emotional idea that runs'],
                  hint: 'यदि अटका हुआ लगे: **c7_hin_cbse_10_001 (कवि परिचय)** दोहराएँ — विशेषकर "विष का प्याला" और "चलती.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **भावार्थ = शब्दार्थ + प्रसंग की एक पंक्ति**। उदाहरण: "मेरे तो गिरधर गोपाल" का भावार्थ लिखते समय लिखते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्प्रशिक्षण चरण**: छात्र को एक **ज्ञात पद** (जैसे "झूठे सुख को सुख कहे मानव" — कबीर) दें और कहें: "इसका शब्दार्थ.', '\'मानव\' क्यों कहते हैं \'मनुष्य\' नहीं?" — इससे **शब्द-चयन की सूक्ष्मता** पकड़ में आएगी। 2.', '**संरचित अभ्यास**: एक टेबल दें: | पंक्ति | शब्दार्थ | **कवि ने यह शब्द क्यों चुना?** | **क्या अस्वीकार किया?** | **क्या.', '**प्रतिपुष्टि (feedback)**: प्रत्येक भावार्थ पर पूछें: "यहाँ मीरा की **आवाज़** सुनाई देती है या केवल **जानकारी**?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी.',
          hint: 'अगर फँस जाएँ तो कक्षा 6 के \'साहित्यिक युक्तियाँ: बिंब और रूपक\' (c6_hin_cbse_01_008).',
          misconception: 'छात्र अक्सर समझते हैं कि \'पद\' और \'दोहा/चौपाई\' एक ही चीज हैं क्योंकि दोनों पद्य हैं। वे पद की संरचना (स्थायी-अंतरा) को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)',
                  options: ['काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'केंद्रीय भाव (Central Theme) is the core philosophical or emotional idea that runs'],
                  hint: 'अगर फँस जाएँ तो कक्षा 6 के \'साहित्यिक युक्तियाँ: बिंब और रूपक\' (c6_hin_cbse_01_008) दोहराएँ — वहाँ.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'पद\' और \'दोहा/चौपाई\' एक ही चीज हैं क्योंकि दोनों पद्य हैं। वे पद की संरचना (स्थायी-अंतरा) को छंद के निश्चित.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को मीरा का कोई एक पद जोर से गवाएँ (या सुनवाएँ) — पहले केवल \'धुन\' पर ध्यान दिलाएँ: \'कौन-सी लाइन बार-बार लौट रही.', 'फिर कागज पर पद लिखवाएँ और स्थायी को लाल पेन से, अंतरे को नीले से घिरवाएँ। गिनवाएँ: स्थायी में कितनी पंक्तियाँ?', 'अब पूछो: \'अगर स्थायी न दोहराया जाता तो पद का असर कैसा होता?\' — छात्र खुद बोलेगा: \'भक्त की जिद/आस्था कम लगती\'। इसी से.', 'अंत में दोहा/चौपाई का उदाहरण देकर दिखाओ: वहाँ स्थायी नहीं होता, निश्चित मात्रा होती है — मीरा का पद उससे अलग है, इसीलिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) is the core philosophical or emotional idea that.',
          hint: 'अगर अटके तो दोहराएँ: कक्षा 6 का \'साहित्यिक युक्तियाँ: बिंब और रूपक\' (c6_hin_cbse_01_008).',
          misconception: '**Specific error**: Students believe that because Mira uses romantic imagery (पिय, मिलन, आलिंगन, सेज, श्रृंगार), her.',
          parts: [
                { id: 'a', prompt: 'नीचे दिए गए पदांश को पढ़कर बताइए कि इसमें केंद्रीय भाव और रस कैसे प्रकट हो रहे हैं — "मेरे तो गिरधर गोपाल, दूसरो न कोई। जाके सिर मोर मुकुट, मेरो पति सोई।।"', answer: '**Correct answer with steps**: 1',
                  options: ['**Correct answer with steps**: 1', 'मोर मुकुट से शृंगार रस बनता है', 'भक्ति रस'],
                  hint: 'अगर अटके तो दोहराएँ: कक्षा 6 का \'साहित्यिक युक्तियाँ: बिंब और रूपक\' (c6_hin_cbse_01_008) — क्योंकि.',
                  misconception: '**Specific error**: Students believe that because Mira uses romantic imagery (पिय, मिलन, आलिंगन, सेज, श्रृंगार), her pads are *literally*.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Targeted remediation steps**: 1.', '**Show the rasa formula visually**: Write on board — *रस = स्थायी भाव (रति) + विभाव (कृष्ण as परमात्मा) + अनुभाव (मीरा.', '**Contrast two texts side-by-side**: A film song ("तुम्हीं हो बंधु, सखा तुम्हीं") vs Mira\'s "मेरे तो गिरधर गोपाल".', 'Ask: "What makes one लौकिक and the other आध्यात्मिक?" Answer: *The referent of the pronoun* (who is \'तुम\'?).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_005', difficulty: 'standard',
          question: 'छंद कविता की पंक्तियों में मात्राओं, गणों और विराम का निश्चित नियम-बद्ध विन्यास.',
          hint: 'अगर मात्रा गिनने में अटके, तो कक्षा 6 के "पदावली: मुख्य शब्द" (c6_hin_cbse_01_010) और.',
          misconception: 'छात्र **मात्रा गिनते समय संयुक्त व्यंजन (जैसे \'ध्र\', \'त्र\', \'श्य\') को एक मात्रा गिन लेते हैं**, जबकि वे दो मात्राएँ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता की पंक्तियों में मात्राओं, गणों और विराम का निश्चित नियम-बद्ध विन्यास है, जबकि',
                  options: ['छंद कविता की पंक्तियों में मात्राओं, गणों और विराम का निश्चित नियम-बद्ध विन्यास है, जबकि', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)'],
                  hint: 'अगर मात्रा गिनने में अटके, तो कक्षा 6 के "पदावली: मुख्य शब्द" (c6_hin_cbse_01_010) और "व्याकरण: पाठ.',
                  misconception: 'छात्र **मात्रा गिनते समय संयुक्त व्यंजन (जैसे \'ध्र\', \'त्र\', \'श्य\') को एक मात्रा गिन लेते हैं**, जबकि वे दो मात्राएँ होते हैं (उदाहरण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को 5-5 शब्दों के 10 उदाहरण देकर संयुक्त व्यंजन वाले शब्दों की मात्रा गिनने का अभ्यास कराएँ (जैसे: पत्र=2.', 'फिर भी गेय क्यों?" पर चर्चा कराएँ। चरण 4: फिर से मात्रा-गणना और यति-निर्धारण का अभ्यास कराएँ, अबकी बार सही नियमों के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_006', difficulty: 'standard',
          question: 'अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष प्रयोग से काव्य.',
          hint: 'अगर अटके तो कक्षा 6 के पाठ 1, 2, 3, 4 के \'साहित्यिक युक्तियाँ\' नोड्स (c6_hin_cbse_01_008.',
          misconception: 'छात्र समझते हैं कि अलंकार केवल **पहचानने की चीज़** है — परीक्षा में "यह अनुप्रास है" लिख दो और नंबर मिल जाएँगे। वे नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष प्रयोग से काव्य में',
                  options: ['अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष प्रयोग से काव्य में', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)'],
                  hint: 'अगर अटके तो कक्षा 6 के पाठ 1, 2, 3, 4 के \'साहित्यिक युक्तियाँ\' नोड्स (c6_hin_cbse_01_008, 01_009.',
                  misconception: 'छात्र समझते हैं कि अलंकार केवल **पहचानने की चीज़** है — परीक्षा में "यह अनुप्रास है" लिख दो और नंबर मिल जाएँगे। वे नहीं समझते कि मीरा के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल वाक्य दो: "तुम बहुत सुंदर हो" — फिर पूछो: "इसे अलंकार से कैसे कहोगे?" वह कहेगा: "तुम चाँद सी सुंदर हो".', 'मीरा के पद "मेरे तो गिरधर गोपाल" को पढ़वाओ — पहले केवल अर्थ समझाओ, फिर \'ग-ग\' ध्वनि सुनाओ, फिर \'गिरधर=पर्वत धारक\' रूपक.', 'एक तालिका बनवाओ: अलंकार | प्रकार | पदांश | भाव-कार्य — इससे वह **पहचान → वर्गीकरण → विश्लेषण** का क्रम सीखेगा। 4.', 'अंत में कहो: "अलंकार पहचानना **सीढ़ी** है, भाव समझना **मंज़िल**।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
