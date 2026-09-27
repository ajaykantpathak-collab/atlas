import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch05_p2: SimDef = {
    id: 'v3_c6_hin_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'यह नोड केवल गौण विषय की पहचान, मुख्य विषय से उसका संबंध, और पाठ में उसकी भूमिका समझने तक.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c6_hin_ch05'],
    nodeIds: ['c6_hin_cbse_05_007', 'c6_hin_cbse_05_008', 'c6_hin_cbse_05_009', 'c6_hin_cbse_05_010', 'c6_hin_cbse_05_011', 'c6_hin_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या तुमने कभी कोई खेल खेला है जहाँ मुख्य लक्ष्य जीतना हो, लेकिन रास्ते में तुम दोस्त बनाते हो, नियम सीखते.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: 'गौण विषय (उप-विषय) वे सहायक विचार या प्रसंग होते हैं जो पाठ के मुख्य विषय को पूरक करते हैं, उसे विस्तार देते हैं, और पात्रों या परिवेश की गहराई दिखाते हैं, परन्तु स्वयं कहानी का केंद्रीय संदेश नहीं.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 2/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — "पाठ में भाषा-प्रयोग" means studying how an author purposefully selects and arranges.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ (Objective) प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में **स्पष्ट रूप से.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_007', difficulty: 'standard',
          question: 'गौण विषय (उप-विषय) वे सहायक विचार या प्रसंग होते हैं जो पाठ के मुख्य विषय को.',
          hint: 'यदि अटके, तो c6_hin_cbse_05_006 (मुख्य विषय और संदेश) पर लौटें और \'विषय निष्कर्षण की.',
          misconception: 'छात्र अक्सर **पृष्ठभूमि विवरण (setting details)** या **पात्रों की व्यक्तिगत विशेषताओं** को गौण विषय मान लेते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (उप-विषय) वे सहायक विचार या प्रसंग होते हैं जो पाठ के मुख्य विषय को पूरक करते',
                  options: ['गौण विषय (उप-विषय) वे सहायक विचार या प्रसंग होते हैं जो पाठ के मुख्य विषय को पूरक करते', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'यदि अटके, तो c6_hin_cbse_05_006 (मुख्य विषय और संदेश) पर लौटें और \'विषय निष्कर्षण की 3-चरण विधि\'.',
                  misconception: 'छात्र अक्सर **पृष्ठभूमि विवरण (setting details)** या **पात्रों की व्यक्तिगत विशेषताओं** को गौण विषय मान लेते हैं। उदाहरण: यदि कहानी किसी.' }
          ],
            remediations: { 'setting-details': { steps: ['छात्र को एक परिचित कहानी (जैसे \'पंच परमेश्वर\' या \'बड़े भाई साहब\') दें और मुख्य विषय बताएं। 2.', 'फिर पूछें: "कौन-से दो प्रसंग/विचार इस मुख्य विषय को गहराई देते हैं?" 3.', 'प्रत्येक प्रसंग के लिए पूछें: "अगर यह प्रसंग हटा दें, तो मुख्य विषय पर क्या असर पड़ेगा?" 4.', 'यदि असर स्पष्ट है → गौण विषय; यदि नहीं → केवल विवरण। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_008', difficulty: 'standard',
          question: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की.',
          hint: 'यदि अटका हो तो \'विशेषण पहचानना\' और \'तुलना वाले वाक्य बनाना\' (जैसे "सेब मीठा है" -> "सेब.',
          misconception: 'छात्र अक्सर समझते हैं कि रूपक (Metaphor) और उपमा (Simile) एक ही चीज़ हैं क्योंकि दोनों तुलना करते हैं। वे "जैसे/सा".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की इंद्रियों',
                  options: ['बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की इंद्रियों', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'यदि अटका हो तो \'विशेषण पहचानना\' और \'तुलना वाले वाक्य बनाना\' (जैसे "सेब मीठा है" -> "सेब शहद जैसा.',
                  misconception: 'छात्र अक्सर समझते हैं कि रूपक (Metaphor) और उपमा (Simile) एक ही चीज़ हैं क्योंकि दोनों तुलना करते हैं। वे "जैसे/सा" शब्द को ही तुलना का.' }
          ],
            remediations: { 'metaphor-simile': { steps: ['**इंद्रिय-कार्ड खेल:** पाँच कार्ड बनाएँ जिन पर आँख, कान, हाथ, नाक, जीभ बने हों। छात्र को वाक्य दें (जैसे "गरम समोसे की.', '**रूपक-अनुवाद अभ्यास:** उपमा वाले वाक्य दें ("वह चीते सा दौड़ा") और छात्र से रूपक में बदलवाएँ ("वह चीता है")। फिर उल्टा.', '**विशेषता-मानचित्रण:** रूपक "कक्षा एक मछलीघर है" दें। बोर्ड पर दो कॉलम बनाएँ: \'कक्षा की विशेषताएँ\' और \'मछलीघर की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_009', difficulty: 'standard',
          question: 'विरोधाभास (Paradox) एक ऐसा कथन है जो पहली नज़र में असंगत या असंभव लगता है.',
          hint: 'If stuck, review **c6_hin_cbse_05_008** — specifically the worked examples where.',
          misconception: 'Students often confuse **विरोधाभास (Paradox)** with **यमक/ऑक्सीमोरॉन (Oxymoron)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास (Paradox) एक ऐसा कथन है जो पहली नज़र में असंगत या असंभव लगता है, लेकिन गहराई से',
                  options: ['विरोधाभास (Paradox) एक ऐसा कथन है जो पहली नज़र में असंगत या असंभव लगता है, लेकिन गहराई से', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'If stuck, review **c6_hin_cbse_05_008** — specifically the worked examples where a metaphor (रूपक).',
                  misconception: 'Students often confuse **विरोधाभास (Paradox)** with **यमक/ऑक्सीमोरॉन (Oxymoron)**.' }
          ],
            remediations: { 'students-often-confuse-paradox-with': { steps: ['**Isolate the device:** Give the student two columns — Column A: Oxymorons (दो शब्द: "मधुर विष", "स्थिर गति"), Column.', 'Ask them to sort 10 examples.', '**Add the "So What?" test:** For each paradox in Column B, ask: "यह वाक्य पहली नज़र में झूठा क्यों लगता है?', 'असल में कौन-सा सत्य खुलता है?" Force them to articulate the *insight*, not just the contradiction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_010', difficulty: 'standard',
          question: 'पदावली (Glossary/Key Vocabulary) पाठ के उन चुनिंदा मुख्य शब्दों (keywords) का.',
          hint: 'यदि अटके तो c6_hin_cbse_05_006 (मुख्य विषय और संदेश) दोबारा पढ़ें — विषय स्पष्ट होते ही.',
          misconception: 'छात्र समझते हैं कि पदावली का अर्थ है \'पाठ के सभी कठिन शब्दों की सूची बनाना और शब्दकोश अर्थ लिखना\'। वास्तव में पदावली.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Glossary/Key Vocabulary) पाठ के उन चुनिंदा मुख्य शब्दों (keywords) का संग्रह है',
                  options: ['पदावली (Glossary/Key Vocabulary) पाठ के उन चुनिंदा मुख्य शब्दों (keywords) का संग्रह है', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'यदि अटके तो c6_hin_cbse_05_006 (मुख्य विषय और संदेश) दोबारा पढ़ें — विषय स्पष्ट होते ही मुख्य शब्द.',
                  misconception: 'छात्र समझते हैं कि पदावली का अर्थ है \'पाठ के सभी कठिन शब्दों की सूची बनाना और शब्दकोश अर्थ लिखना\'। वास्तव में पदावली केवल उन 5-7 शब्दों तक.' }
          ],
            remediations: { '5-7-backbone': { steps: ['चरण 1: छात्र को पाठ का एक छोटा अंश (5-6 पंक्तियाँ) दें और पूछें: \'यहाँ कौन-सा एक शब्द है जिसे हटाने से पूरा अर्थ बदल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_011', difficulty: 'standard',
          question: '"पाठ में भाषा-प्रयोग" means studying how an author purposefully selects and.',
          hint: 'Review "क्रिया और काल पहचान" (verb & tense identification) using Class 5 grammar.',
          misconception: 'छात्र समझते हैं कि \'व्याकरण विश्लेषण\' का अर्थ है हर शब्द का नाम बताना (संज्ञा, सर्वनाम, क्रिया…)। असल में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ में भाषा-प्रयोग" means studying how an author purposefully selects and arranges words',
                  options: ['"पाठ में भाषा-प्रयोग" means studying how an author purposefully selects and arranges words', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'Review "क्रिया और काल पहचान" (verb & tense identification) using Class 5 grammar exercises or the.',
                  misconception: 'छात्र समझते हैं कि \'व्याकरण विश्लेषण\' का अर्थ है हर शब्द का नाम बताना (संज्ञा, सर्वनाम, क्रिया…)। असल में परीक्षा/पाठ्यक्रम माँगता है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को एक छोटा वाक्य दें ("बिल्ली दूध पीती है") — पूछें: "अगर \'पीती है\' की जगह \'पी गई\' लिख दें तो क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ (Objective) प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में **स्पष्ट.',
          hint: 'If stuck, review **literal comprehension strategies** (scanning for keywords, identifying.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी मानते हैं कि **"यदि उत्तर पाठ में कहीं भी मिल जाए, तो वह वस्तुनिष्ठ है"**। **गलत तर्क का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ (Objective) प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में **स्पष्ट रूप से',
                  options: ['**वस्तुनिष्ठ (Objective) प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में **स्पष्ट रूप से', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'If stuck, review **literal comprehension strategies** (scanning for keywords, identifying explicit.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी मानते हैं कि **"यदि उत्तर पाठ में कहीं भी मिल जाए, तो वह वस्तुनिष्ठ है"**। **गलत तर्क का उदाहरण:** प्रश्न.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध सुधार (Targeted Remediation):** 1.', '**दृश्य विभाजन (Visual Sort):** विद्यार्थी को 10 मिश्रित प्रश्न दें (5 वस्तुनिष्ठ, 5 आशय-सूचक)। दो रंग के हाइलाइटर दें.', '**मौखिक तर्क (Verbal Justification):** प्रत्येक प्रश्न के लिए विद्यार्थी से पूछें: *"तुम्हें कैसे पता कि यह पीला/नीला.', 'पाठ की कौन-सी लाइनें दिखा रहे हो?"* — इससे वह **प्रमाण-आधारित सोच** विकसित करेगा। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
