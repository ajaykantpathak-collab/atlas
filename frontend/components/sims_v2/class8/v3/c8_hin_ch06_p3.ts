import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch06_p3: SimDef = {
    id: 'v3_c8_hin_ch06_p3',
    title: 'एक टोकरी भर मट्टिी · Part 3/3',
    subtitle: 'This node covers deep textual analysis and interpretation of "Ek Tokri Bhar Mitti".',
    classLevel: 8, subject: 'hin', topic: 'एक टोकरी भर मट्टिी · Part 3/3',
    chapters: ['c8_hin_ch06'],
    nodeIds: ['c8_hin_cbse_06_013', 'c8_hin_cbse_06_014', 'c8_hin_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'Have you ever watched a movie a second time and noticed details — a background object, a character\'s.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'एक टोकरी भर मट्टिी — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) in literature is the process of actively analyzing, interpreting, and evaluating a text by questioning the author\'s choices — structure, language, perspective.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['एक टोकरी भर मट्टिी'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_06_014', title: 'एक टोकरी भर मट्टिी — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: 'Think about the last time you tried to convince your parents to let you go to a friend\'s house — you didn\'t just say "please," you gave reasons: "I finished.',
            decisions: [{ prompt: 'पाठ-आधारित लेखन में \'PEEL\' विधि के चार चरणों के नाम हिंदी में लिखिए।', options: [
                { text: 'PEEL के चार चरण हैं: 1', outcome: 'PEEL के चार चरण हैं: 1. बिंदु (Point) — मुख्य बात, 2. प्रमाण (Evidence) — पाठ से विशिष्ट विवरण, 3.' },
                { text: 'text-based writing', outcome: 'Not quite — Students believe that "text-based writing" means **retelling the story in their own words** — they.', reveals: 'text-based-writing-means-retelling' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You finished एक टोकरी भर मट्टिी — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) in literature is the process of actively.',
          hint: 'यदि फँस जाएँ तो c8_hin_cbse_06_006 (मुख्य विषय) और c8_hin_cbse_06_009 (विरोधाभास) दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है कहानी में \'कमियाँ निकालना\' (finding faults) या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) in literature is the process of actively analyzing,',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) in literature is the process of actively analyzing,', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान'],
                  hint: 'यदि फँस जाएँ तो c8_hin_cbse_06_006 (मुख्य विषय) और c8_hin_cbse_06_009 (विरोधाभास) दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है कहानी में \'कमियाँ निकालना\' (finding faults) या लेखक से \'असहमत होना\'।.' }
          ],
            remediations: { 'finding-faults-critical-crucial-analytical': { steps: ['**शब्द स्पष्टीकरण:** कक्षा में \'Critical Thinking\' का हिंदी अनुवाद \'आलोचनात्मक चिंतन\' लिखें और पूछें: "क्या \'Critical\'.', '\'Critical condition\' का क्या मतलब है?" (गंभीर/नाजुक स्थिति — जहाँ गहरी जाँच चाहिए)। 2.', '**मॉडलिंग:** पाठ का एक छोटा अंश लें (जैसे सेठ का संवाद) और दिखाएँ: "मैं इसका विश्लेषण कर रहा हूँ, निंदा नहीं — देखो.', '**अभ्यास:** छात्रों से कहें: "एक वाक्य लिखो जो \'निंदा\' हो, और एक जो \'विश्लेषण\' हो — उसी पात्र के लिए।" फिर तुलना करें।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_014', difficulty: 'standard',
          question: 'Text-based writing skill (पाठ-आधारित लेखन कौशल) is the ability to construct.',
          hint: 'If stuck, return to c8_hin_cbse_06_004 (पात्र-चित्रण) and c8_hin_cbse_06_006 (मुख्य विषय).',
          misconception: 'Students believe that "text-based writing" means **retelling the story in their own words** — they write a mini-summary.',
          parts: [
                { id: 'a', prompt: 'पाठ-आधारित लेखन में \'PEEL\' विधि के चार चरणों के नाम हिंदी में लिखिए।', answer: 'PEEL के चार चरण हैं: 1',
                  options: ['PEEL के चार चरण हैं: 1', 'text-based writing'],
                  hint: 'If stuck, return to c8_hin_cbse_06_004 (पात्र-चित्रण) and c8_hin_cbse_06_006 (मुख्य विषय).',
                  misconception: 'Students believe that "text-based writing" means **retelling the story in their own words** — they write a mini-summary of the chapter and.' },
                { id: 'b', prompt: '"एक टोकरी भर मिट्टी" पाठ में कुम्हार के चरित्र का विश्लेषण करते समय, निम्न में से कौन-सा वाक्य \'प्रमाण\' (Evidence) चरण का सही उदाहरण है?', answer: 'सही उत्तर: **ख**',
                  options: ['सही उत्तर: **ख**', 'text-based writing'],
                  hint: 'If stuck, return to c8_hin_cbse_06_004 (पात्र-चित्रण) and c8_hin_cbse_06_006 (मुख्य विषय).',
                  misconception: 'Students believe that "text-based writing" means **retelling the story in their own words** — they write a mini-summary of the chapter and.' }
          ],
            remediations: { 'text-based-writing-means-retelling': { steps: ['**Show the contrast:** Take the student\'s summary answer and a model PEEL answer side by side.', 'Highlight: "Here you told me *what happened*; here the model shows *why it matters* using the text\'s own words." 2.', '**Color-code the PEEL:** Give the student 4 colored pencils — blue for Point, green for Evidence, orange for.', 'Ask them to mark each sentence in their answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "text-based writing" means **retelling the story in their own words** — they write a mini-summary.',
          parts: [
                { id: 'a', prompt: 'एक छात्र ने "एक टोकरी भर मिट्टी" पर इस प्रश्न का उत्तर लिखा: "पाठ का मुख्य संदेश है कि हमें परंपरागत शिल्प का सम्मान करना चाहिए।" क्या यह उत्तर पूर्ण है?', answer: 'नहीं, यह उत्तर **अपूर्ण** है। **क्या है:** एक स्पष्ट बिंदु (Point)',
                  options: ['नहीं, यह उत्तर **अपूर्ण** है। **क्या है:** एक स्पष्ट बिंदु (Point)', 'text-based writing'],
                  hint: 'If stuck, return to c8_hin_cbse_06_004 (पात्र-चित्रण) and c8_hin_cbse_06_006 (मुख्य विषय).',
                  misconception: 'Students believe that "text-based writing" means **retelling the story in their own words** — they write a mini-summary of the chapter and.' },
                { id: 'b', prompt: '"एक टोकरी भर मिट्टी" पाठ के आधार पर एक नया प्रश्न बनाइए जिसका उत्तर PEEL विधि से दिया जा सके, और उसका आदर्श उत्तर भी लिखिए। (प्रश्न विश्लेषणात्मक होना चाहिए.', answer: '**प्रश्न:** "पाठ में कथावाचक की दृष्टि में परिवर्तन कैसे आता है?',
                  options: ['**प्रश्न:** "पाठ में कथावाचक की दृष्टि में परिवर्तन कैसे आता है?', 'text-based writing'],
                  hint: 'If stuck, return to c8_hin_cbse_06_004 (पात्र-चित्रण) and c8_hin_cbse_06_006 (मुख्य विषय).',
                  misconception: 'Students believe that "text-based writing" means **retelling the story in their own words** — they write a mini-summary of the chapter and.' }
          ],
            remediations: { 'text-based-writing-means-retelling': { steps: ['**Show the contrast:** Take the student\'s summary answer and a model PEEL answer side by side.', 'Highlight: "Here you told me *what happened*; here the model shows *why it matters* using the text\'s own words." 2.', '**Color-code the PEEL:** Give the student 4 colored pencils — blue for Point, green for Evidence, orange for.', 'Ask them to mark each sentence in their answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_015', difficulty: 'standard',
          question: '"वाचन-श्रवण: चर्चा-बिंदु" वह शैक्षिक प्रक्रिया है जिसमें विद्यार्थी पाठ को.',
          hint: 'अगर अटके तो c8_hin_cbse_06_002 (कथानक) और c8_hin_cbse_06_006 (मुख्य विषय) दोबारा पढ़ें.',
          misconception: 'विद्यार्थी समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है — शिक्षक प्रश्न पूछे, विद्यार्थी उत्तर दें, और सही उत्तर वाला \'जीत\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"वाचन-श्रवण: चर्चा-बिंदु" वह शैक्षिक प्रक्रिया है जिसमें विद्यार्थी पाठ को पढ़कर या सुनकर',
                  options: ['"वाचन-श्रवण: चर्चा-बिंदु" वह शैक्षिक प्रक्रिया है जिसमें विद्यार्थी पाठ को पढ़कर या सुनकर', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान'],
                  hint: 'अगर अटके तो c8_hin_cbse_06_002 (कथानक) और c8_hin_cbse_06_006 (मुख्य विषय) दोबारा पढ़ें — चर्चा के.',
                  misconception: 'विद्यार्थी समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है — शिक्षक प्रश्न पूछे, विद्यार्थी उत्तर दें, और सही उत्तर वाला \'जीत\' जाए। वास्तव में यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: कक्षा को दो भागों में बाँटो — एक पक्ष कहे "नायक भावुक है", दूसरा कहे "नायक व्यावहारिक है"। चरण 2: प्रत्येक पक्ष.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
