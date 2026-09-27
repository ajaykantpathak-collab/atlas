import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch17_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch17_p3: SimDef = {
    id: 'v3_c12_hin_a_ch17_p3',
    title: 'कुटज · Part 3/3',
    subtitle: 'The courtyard is its mornings — not its name',
    classLevel: 12, subject: 'hin_a', topic: 'कुटज · Part 3/3',
    chapters: ['c12_hin_a_ch17'],
    nodeIds: ['c12_hin_a_cbse_17_013', 'c12_hin_a_cbse_17_014', 'c12_hin_a_cbse_17_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Philosophical-essay reader', intro: 'A scholar who ran All India Radio asks whether a word should come from the dictionary or from the courtyard where life happens.', goal: 'Read Aangan through naam-versus-svaroop — social labels against lived essence, tyag as uncelebrated art.' },
    discovery: {
        question: 'An Aadhaar number opens every door — subsidies, banks, travel — yet it isn\'t you. A 1950s essayist said this exact thing about \'naam\' and \'svaroop.\' What\'s the split?',
        options: ['Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth', 'Aadhaar is fake identity', 'Names are always wrong', 'Svaroop means appearance'],
        answer: 'Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth',
        hook: 'Mishra insists on \'aangan\' over the Sanskritised \'angana\' — the lived word carries cow-dung smell and children\'s play; the formal word is sterile. And tyag is redefined: not self-denial or heroic martyrdom but daily, uncelebrated duty — a mother\'s life as art.',
    },
    teaching: [
        { title: 'कुटज — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन पाठ के विश्लेषण और व्याख्या की प्रक्रिया है जिसमें छात्र पाठ के विषय, पात्रों, साहित्यिक युक्तियों, भाषा के प्रयोग और सामाजिक संदर्भ का मूल्यांकन करते हैं ताकि लेखक के गहरे अर्थ और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_17_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand in a courtyard at dawn: watch the space reveal itself as process, not object; weigh name against essence; and test whether sacrifice is suffering or transcendence.',
        labels: ['कुटज — आलोचनात्मक चिंतन', 'कुटज — लेखन कौशल', 'कुटज — वाचन-श्रवण: चर्चा-बिंदु'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a housing-for-all poster contest, a teammate\'s entry shows a glossy apartment block with the line \'shelter = square feet.\' You recall the essay that starts on a mud-walled village lane and ends in a Sanskrit verse on what makes a dwelling a home.',
            decisions: [{ prompt: 'How would the essay \'कुटिर\' reframe the poster?', options: [
                { text: 'Shift the claim from floor area to shelter-as-value — the essay builds from one village lane to etymology to a universal ideal precisely to show a home is protection offered without discrimination, not a purchasable quantity.', outcome: 'The chapter\'s method is the message: digression from concrete scene to philosophy is how the essay lifts \'house\' into \'home\' — the poster needs that ascent, not a bigger number.' },
                { text: 'Keep the poster — for a scheme, square footage is the honest measurable promise.', outcome: 'Measurability isn\'t the essay\'s unit of meaning: the text argues a dwelling earns its name by what it shelters, and a poster that equates home with area repeats the reduction the essay spends its length undoing.', reveals: 'home-equals-area' },
                { text: 'Drop both and show a Sanskrit shloka alone — the philosophical ending is the essay\'s best part.', outcome: 'The verse lands because the village lane came first — the essay\'s frame pairs particular scene with universal ideal; keeping the abstraction without the mud walls cuts the argument\'s root.', reveals: 'abstraction-alone-convinces' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_015', title: 'You made it',
          caseStudy: { intro: 'You can now separate the label from the life — and hear a Sanskrit scholar argue that the truest word is the one that\'s been lived in.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन पाठ के विश्लेषण और व्याख्या की प्रक्रिया है जिसमें छात्र पाठ.',
          hint: 'यदि विश्लेषण में कठिनाई हो, तो पात्र-चित्रण (c12_hin_a_cbse_17_004 और.',
          misconception: 'कक्षा 12 के छात्र अक्सर कुटज उपन्यास के विश्लेषण में पात्रों के नाम, घटनाओं के क्रम, और स्पष्ट रूप से दिए गए विचारों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन पाठ के विश्लेषण और व्याख्या की प्रक्रिया है जिसमें छात्र पाठ के विषय,',
                  options: ['आलोचनात्मक चिंतन पाठ के विश्लेषण और व्याख्या की प्रक्रिया है जिसमें छात्र पाठ के विषय,', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि विश्लेषण में कठिनाई हो, तो पात्र-चित्रण (c12_hin_a_cbse_17_004 और c12_hin_a_cbse_17_005) और.',
                  misconception: 'कक्षा 12 के छात्र अक्सर कुटज उपन्यास के विश्लेषण में पात्रों के नाम, घटनाओं के क्रम, और स्पष्ट रूप से दिए गए विचारों को दोहराकर संतुष्ट हो.' }
          ],
            remediations: { '12': { steps: ['यदि छात्र पात्रों के नाम या घटनाओं को दोहराकर आलोचनात्मक चिंतन मान रहा हो, तो उसे 다음과 같이 सुधारें: 1.', 'पाठ से एक वाक्य चुनें (जैसे "हरी खेत में काम करते समय सोचता रहा कि क्या उसका बच्चा कभी स्वतंत्र हवा में सांस ले.', 'छात्र से पूछें: "यह वाक्य केवल हरी की गरीबी बताता है, या यह कुछ गहरा कहना चाहता है?', 'क्या यह इंसान के मूल अधिकारों (जैसे स्वतंत्रता, सम्मान) के बारे में बात कर रहा है?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र किसी दिए गए गद्यांश/पाठ के आधार.',
          hint: 'यदि PEEL संरचना में उलझें तो कक्षा 11 के लेखन कौशल नोड (c11_hin_a_cbse_01_014) का \'कमज़ोर.',
          misconception: '**सबसे घातक भ्रम:** *"पाठ-आधारित लेखन = पाठ का सारांश (summary) लिखना।"* छात्र सोचते हैं कि पाठ की कहानी/वर्णन विस्तार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र किसी दिए गए गद्यांश/पाठ के आधार पर संरचित,',
                  options: ['पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र किसी दिए गए गद्यांश/पाठ के आधार पर संरचित,', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि PEEL संरचना में उलझें तो कक्षा 11 के लेखन कौशल नोड (c11_hin_a_cbse_01_014) का \'कमज़ोर vs मज़बूत.',
                  misconception: '**सबसे घातक भ्रम:** *"पाठ-आधारित लेखन = पाठ का सारांश (summary) लिखना।"* छात्र सोचते हैं कि पाठ की कहानी/वर्णन विस्तार से लिखने से अंक.' }
          ],
            remediations: { 'summary-narration-0-1': { steps: ['**पहला कदम:** छात्र से कहें — *"पाठ बंद करो। प्रश्न को तीन बार पढ़ो। कीवर्ड (जैसे: सार्थकता, दृष्टिकोण, शिल्प) घेरे में.', '**दूसरा कदम:** एक खाका (outline) बनवाएँ: **थीसिस → 3 PEEL बिंदु → निष्कर्ष** — बिना पाठ खोले। 3.', '**तीसरा कदम:** अब पाठ खोलकर **केवल प्रमाण (Evidence)** ढूँढें — पूरा पैराग्राफ नहीं, केवल 1-2 पंक्तियाँ। 4.', '**चौथा कदम:** प्रत्येक प्रमाण के आगे लिखें: *"यह सिद्ध करता है कि..."* — यही Explanation है। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है कुटज पाठ का सस्वर वाचन करना, दूसरों का.',
          hint: 'यदि चर्चा में बोलते अटकें तो तुरंत **c12_hin_a_cbse_17_002 (कथानक)** और.',
          misconception: 'छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है **पाठ के प्रश्नों के उत्तर रटना** या **शिक्षक के बताए बिंदु दोहराना**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है कुटज पाठ का सस्वर वाचन करना, दूसरों का वाचन सुनना,',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है कुटज पाठ का सस्वर वाचन करना, दूसरों का वाचन सुनना,', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि चर्चा में बोलते अटकें तो तुरंत **c12_hin_a_cbse_17_002 (कथानक)** और **c12_hin_a_cbse_17_006.',
                  misconception: 'छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है **पाठ के प्रश्नों के उत्तर रटना** या **शिक्षक के बताए बिंदु दोहराना**। वास्तव में चर्चा-बिंदु.' }
          ],
            remediations: { 'open-ended-questions': { steps: ['छात्र को पाठ के **एक छोटे अंश (5-6 पंक्तियाँ)** दें और कहें: \'इसमें से तीन प्रश्न बनाओ जिनका उत्तर \'हाँ/नहीं\' में न.', 'फिर उससे कहें: \'अपने ही एक प्रश्न का उत्तर दो पंक्तियाँ उद्धृत करके दो।\' 3.', 'अगले चरण में: \'किसी सहपाठी के विपरीत उत्तर का खंडन करो।\' यह **साक्ष्य-आधारित तर्क-शृंखला** (evidence-based argument.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
