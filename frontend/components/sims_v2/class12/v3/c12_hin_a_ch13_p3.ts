import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch13_p3: SimDef = {
    id: 'v3_c12_hin_a_ch13_p3',
    title: 'गांधी, नेहरू और यासरि अराफ़ात · Part 3/3',
    subtitle: '1938: the revolutionaries who still knew how to laugh',
    classLevel: 12, subject: 'hin_a', topic: 'गांधी, नेहरू और यासरि अराफ़ात · Part 3/3',
    chapters: ['c12_hin_a_ch13'],
    nodeIds: ['c12_hin_a_cbse_13_013', 'c12_hin_a_cbse_13_014', 'c12_hin_a_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Freedom-era memoir reader', intro: 'Before Quit India, there were the quiet years — and a memoirist who remembered the people inside the movement.', goal: 'Read the memoir through its 1938 setting — nationalism as lived relationship, not marble statue.' },
    discovery: {
        question: 'Nagpur, 1938: a revolutionary editor jokes through clandestine work while a provisional government forms in shadow. What makes this memoir different from a freedom-fighter hagiography?',
        options: ['Humanity beside heroism — the note gives Sakharam a rule of humour and a smiling gaze; the memoir records people, not icons', 'It names real people', 'It\'s more recent', 'Memoirs are always accurate'],
        answer: 'Humanity beside heroism — the note gives Sakharam a rule of humour and a smiling gaze; the memoir records people, not icons',
        hook: 'The year is precise — 1938, pre-Quit India, not the famous 1942. And the language carries the era: Marathi-inflected Hindi, short colloquial sentences, dialogue over description. Personal memory and national history are woven on the same loom.',
    },
    teaching: [
        { title: 'गांधी, नेहरू और यासरि अराफ़ात — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें कोई पाठ को पढ़कर उसके विषय, पात्रों, लेखक के दृष्टिकोण और सामाजिक संदर्भ का विश्लेषण करता है, तर्क देता है और अपनी व्याख्या प्रस्तुत करता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_13_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sit in a 1938 Nagpur room: weigh Sakharam\'s warmth against his revolution, separate the provisional government\'s claim from the British one, and hear how colloquial prose carries lived history.',
        labels: ['गांधी, नेहरू और यासरि'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A senior who documented a student protest movement now calls it \'my movement, my story\' — editing out the grassroots workers whose songs and sacrifices built it, and ending every retelling on his own reflection.',
            decisions: [{ prompt: 'What does Bhisham Sahni\'s memoir structure say to that?', options: [
                { text: 'Hand the ending to the collective — the chapter deliberately closes on the revolutionary\'s \'they are not just yours, they are ours too,\' surrendering the writer\'s \'I\' to the movement\'s \'we\'; a witness holds the story in trust, not ownership.', outcome: 'The memoir\'s architecture is the argument: embedded voices — Nehru\'s sparrow tale, the child\'s song — exist so the writer never owns history, only testifies to it.' },
                { text: 'Let him own it — he wrote it down, so the narrative is his by right.', outcome: 'The chapter\'s ending exists to refute that claim: the narrator who steps back for the revolutionary\'s voice enacts the truth that recording isn\'t owning — the movement\'s people are co-owners of its telling.', reveals: 'writer-owns-the-story' },
                { text: 'Cut the folk and domestic episodes from the retelling — keep only the political events so it stays \'serious.\'', outcome: 'The memoir\'s power is the weave — the sparrow story and the child\'s song structurally foreshadow sacrifice; stripping them leaves a chronology without the argument that private life feeds public courage.', reveals: 'politics-over-domestic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a memoir as national history told in a personal voice — where revolutionaries joke, worry and persist.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें कोई पाठ को पढ़कर उसके विषय, पात्रों.',
          hint: 'पाठ का सारांश और मुख्य घटनाओं की समीक्षा करें - विशेष रूप से c12_hin_a_cbse_13_002 और.',
          misconception: 'छात्र अक्सर आलोचनात्मक चिंतन को पाठ का केवल सारांश देना या अपने व्यक्तिगत विचार बताना मानते हैं, जैसे कि "मुझे लगता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें कोई पाठ को पढ़कर उसके विषय, पात्रों, लेखक के',
                  options: ['आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें कोई पाठ को पढ़कर उसके विषय, पात्रों, लेखक के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'पाठ का सारांश और मुख्य घटनाओं की समीक्षा करें - विशेष रूप से c12_hin_a_cbse_13_002 और.',
                  misconception: 'छात्र अक्सर आलोचनात्मक चिंतन को पाठ का केवल सारांश देना या अपने व्यक्तिगत विचार बताना मानते हैं, जैसे कि "मुझे लगता है कि गांधी सही थे".' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस गलती को दोहरा रहा है तो उससे कहिए कि वह अपने उत्तर को चार भागों में बाँटे: (1) बिंदु - वह क्या कहना चाहता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र पाठ (काव्य, गद्य, नाटक) से.',
          hint: 'यदि छात्र पाठ से संबंधित मुख्य विचार पहचानने में कठिनाई महसूस कर रहा है, तो उसे.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित लेखन का अर्थ केवल प्रश्न के उत्तर में पाठ से एक वाक्य copy-paste करना है, जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र पाठ (काव्य, गद्य, नाटक) से सीधे उद्धरण',
                  options: ['पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र पाठ (काव्य, गद्य, नाटक) से सीधे उद्धरण', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'यदि छात्र पाठ से संबंधित मुख्य विचार पहचानने में कठिनाई महसूस कर रहा है, तो उसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित लेखन का अर्थ केवल प्रश्न के उत्तर में पाठ से एक वाक्य copy-paste करना है, जैसे "गांधी जी ने कहा.' }
          ],
            remediations: { 'copy-paste': { steps: ['छात्र को दिखाइए कि एक बिंदु कैसे अधूरा रहता है यदि केवल उद्धरण दिया जाए: उदाहरण के लिए, यदि वे लिखते हैं "गांधी जी ने.', 'गांधी जी के बारे में हम क्या नया सीखते हैं?" फिर उन्हें निर्देश दीजिए कि वे इस उद्धरण के बाद जोड़ें: "इससे स्पष्ट होता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है पाठ को ध्यानपूर्वक सुनकर या पढ़कर उसके मुख्य.',
          hint: 'यदि फंसा हो तो कक्षा 11 के किसी भी पाठ के \'पृष्ठभूमि और रचनाकार परिचय\' और \'पाठ्य-परिवेश.',
          misconception: 'छात्र अक्सर मानते हैं कि गांधी, नेहरू और यासिर अराफ़ात के विचार एक जैसे हैं क्योंकि वे सभी \'शांति\' और \'स्वतंत्रता\' के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है पाठ को ध्यानपूर्वक सुनकर या पढ़कर उसके मुख्य विचारों,',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु का अर्थ है पाठ को ध्यानपूर्वक सुनकर या पढ़कर उसके मुख्य विचारों,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'यदि फंसा हो तो कक्षा 11 के किसी भी पाठ के \'पृष्ठभूमि और रचनाकार परिचय\' और \'पाठ्य-परिवेश और वातावरण\'.',
                  misconception: 'छात्र अक्सर मानते हैं कि गांधी, नेहरू और यासिर अराफ़ात के विचार एक जैसे हैं क्योंकि वे सभी \'शांति\' और \'स्वतंत्रता\' के लिए लड़े, और इस.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस भ्रांति में फंसा हो, तो सबसे पहले उसे पाठ में दिए गए प्रत्येक नेता के विचारों को अलग-अलग पंक्तियों में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
