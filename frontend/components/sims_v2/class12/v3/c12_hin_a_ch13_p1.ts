import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch13_p1: SimDef = {
    id: 'v3_c12_hin_a_ch13_p1',
    title: 'गांधी, नेहरू और यासरि अराफ़ात · Part 1/3',
    subtitle: '1938: the revolutionaries who still knew how to laugh',
    classLevel: 12, subject: 'hin_a', topic: 'गांधी, नेहरू और यासरि अराफ़ात · Part 1/3',
    chapters: ['c12_hin_a_ch13'],
    nodeIds: ['c12_hin_a_cbse_13_001', 'c12_hin_a_cbse_13_002', 'c12_hin_a_cbse_13_003', 'c12_hin_a_cbse_13_004', 'c12_hin_a_cbse_13_005', 'c12_hin_a_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Freedom-era memoir reader', intro: 'Before Quit India, there were the quiet years — and a memoirist who remembered the people inside the movement.', goal: 'Read the memoir through its 1938 setting — nationalism as lived relationship, not marble statue.' },
    discovery: {
        question: 'Nagpur, 1938: a revolutionary editor jokes through clandestine work while a provisional government forms in shadow. What makes this memoir different from a freedom-fighter hagiography?',
        options: ['Humanity beside heroism — the note gives Sakharam a rule of humour and a smiling gaze; the memoir records people, not icons', 'It names real people', 'It\'s more recent', 'Memoirs are always accurate'],
        answer: 'Humanity beside heroism — the note gives Sakharam a rule of humour and a smiling gaze; the memoir records people, not icons',
        hook: 'The year is precise — 1938, pre-Quit India, not the famous 1942. And the language carries the era: Marathi-inflected Hindi, short colloquial sentences, dialogue over description. Personal memory and national history are woven on the same loom.',
    },
    teaching: [
        { title: 'गांधी, नेहरू और यासरि अराफ़ात — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और व्यक्तिगत अनुभवों का अध्ययन करना जो उनकी रचना को प्रभावित करते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sit in a 1938 Nagpur room: weigh Sakharam\'s warmth against his revolution, separate the provisional government\'s claim from the British one, and hear how colloquial prose carries lived history.',
        labels: ['गांधी, नेहरू और यासरि'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A senior who documented a student protest movement now calls it \'my movement, my story\' — editing out the grassroots workers whose songs and sacrifices built it, and ending every retelling on his own reflection.',
            decisions: [{ prompt: 'What does Bhisham Sahni\'s memoir structure say to that?', options: [
                { text: 'Hand the ending to the collective — the chapter deliberately closes on the revolutionary\'s \'they are not just yours, they are ours too,\' surrendering the writer\'s \'I\' to the movement\'s \'we\'; a witness holds the story in trust, not ownership.', outcome: 'The memoir\'s architecture is the argument: embedded voices — Nehru\'s sparrow tale, the child\'s song — exist so the writer never owns history, only testifies to it.' },
                { text: 'Let him own it — he wrote it down, so the narrative is his by right.', outcome: 'The chapter\'s ending exists to refute that claim: the narrator who steps back for the revolutionary\'s voice enacts the truth that recording isn\'t owning — the movement\'s people are co-owners of its telling.', reveals: 'writer-owns-the-story' },
                { text: 'Cut the folk and domestic episodes from the retelling — keep only the political events so it stays \'serious.\'', outcome: 'The memoir\'s power is the weave — the sparrow story and the child\'s song structurally foreshadow sacrifice; stripping them leaves a chronology without the argument that private life feeds public courage.', reveals: 'politics-over-domestic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a memoir as national history told in a personal voice — where revolutionaries joke, worry and persist.',
            decisions: [{ prompt: 'What comes next? गांधी, नेहरू और यासरि अराफ़ात · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — गांधी, नेहरू और यासरि अराफ़ात · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक.',
          hint: 'यदि छात्र पृष्ठभूमि को सिर्फ तथ्यों के रूप में देख रहा है, तो उसे कक्षा 11 के किसी भी पाठ.',
          misconception: 'छात्र अक्सर पृष्ठभूमि को बस एक तथ्यात्मक परिचय मानते हैं—जैसे गांधी का जन्म पोरबंदर में हुआ, नेहरू ने हार्वर्ड से पढ़ाई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ', 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी साहित्यिक पाठ में केंद्रीय पात्र के'],
                  hint: 'यदि छात्र पृष्ठभूमि को सिर्फ तथ्यों के रूप में देख रहा है, तो उसे कक्षा 11 के किसी भी पाठ की.',
                  misconception: 'छात्र अक्सर पृष्ठभूमि को बस एक तथ्यात्मक परिचय मानते हैं—जैसे गांधी का जन्म पोरबंदर में हुआ, नेहरू ने हार्वर्ड से पढ़ाई की, यासरि अराफ़ात.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कैसे प्रत्येक तथ्य को एक कारण-परिणाम प्रश्न में बदला जा सकता है: उदाहरण के लिए, "गांधी का जन्म.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_002', difficulty: 'standard',
          question: 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा.',
          hint: 'यदि छात्र कथानक और आख्यान-संरचना के बीच अंतर नहीं समझ पा रहा है, तो उसे कक्षा 11 के नोड.',
          misconception: 'छात्र अक्सर कथानक और आख्यान-संरचना को समान मानकर चलते हैं और दोनों को केवल \'कहानी क्या होती है\' के रूप में परिभाषित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें',
                  options: ['कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ', 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी साहित्यिक पाठ में केंद्रीय पात्र के'],
                  hint: 'यदि छात्र कथानक और आख्यान-संरचना के बीच अंतर नहीं समझ पा रहा है, तो उसे कक्षा 11 के नोड.',
                  misconception: 'छात्र अक्सर कथानक और आख्यान-संरचना को समान मानकर चलते हैं और दोनों को केवल \'कहानी क्या होती है\' के रूप में परिभाषित करते हैं। वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल कहानी (जैसे \'खरगोश और कछुआ\') सुनाइए और पूछिए: \'घटनाएँ क्या थीं?\' (इसका उत्तर कथानक होगा: दौड़ शुरू.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है.',
          hint: 'यदि छात्र फंस जाए, तो कक्षा 11 के किसी भी पाठ का पाठ्य-परिवेश विश्लेषण (जैसे.',
          misconception: 'छात्र अक्सर पाठ्य-परिवेश को केवल \'इतिहास की पृष्ठभूमि\' मान लेते हैं और सोचते हैं कि यह सिर्फ तारीखें और घटनाएँ याद रखने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ',
                  options: ['पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी साहित्यिक पाठ में केंद्रीय पात्र के'],
                  hint: 'यदि छात्र फंस जाए, तो कक्षा 11 के किसी भी पाठ का पाठ्य-परिवेश विश्लेषण (जैसे c11_hin_a_cbse_03_003).',
                  misconception: 'छात्र अक्सर पाठ्य-परिवेश को केवल \'इतिहास की पृष्ठभूमि\' मान लेते हैं और सोचते हैं कि यह सिर्फ तारीखें और घटनाएँ याद रखने का मामला है, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले दिए गए पाठ से एक वाक्य चुनने को कहिए जिसमें कोई सामाजिक या राजनीतिक संकेत हो (जैसे "ब्रिटिश अधिकारी".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_004', difficulty: 'standard',
          question: 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी साहित्यिक पाठ में केंद्रीय.',
          hint: 'यदि फंसा हो तो वर्ग 11 के किसी भी पाठ में पात्र-चित्रण: नायक/प्रमुख पात्र (जैसे.',
          misconception: 'विद्यार्थी अक्सर गांधी, नेहरू और यासरि अराफ़ात के नायकत्व को केवल उनके ऐतिहासिक उपलब्धियों (जैसे गांधीजी का दांडी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी साहित्यिक पाठ में केंद्रीय पात्र के',
                  options: ['पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी साहित्यिक पाठ में केंद्रीय पात्र के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'यदि फंसा हो तो वर्ग 11 के किसी भी पाठ में पात्र-चित्रण: नायक/प्रमुख पात्र (जैसे.',
                  misconception: 'विद्यार्थी अक्सर गांधी, नेहरू और यासरि अराफ़ात के नायकत्व को केवल उनके ऐतिहासिक उपलब्धियों (जैसे गांधीजी का दांडी मार्च, नेहरूजी का पहला.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस भूल में फंसा है, तो उसे पाठ से तीन विशिष्ट उदाहरण निकालने के लिए कहें जहाँ प्रत्येक नायक के कार्यों का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो मुख्य पात्र के साथ मिलकर कहानी को आगे बढ़ाते.',
          hint: 'यदि फंसे हुए हों तो c12_hin_a_cbse_13_004 (पात्र-चित्रण: नायक) को दोबारा पढ़िए, क्योंकि.',
          misconception: 'छात्र अक्सर सोचते हैं कि सहायक पात्र केवल इसलिए महत्वपूर्ण हैं क्योंकि वे मुख्य पात्र के करीब हैं या उनकी सेवा करते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो मुख्य पात्र के साथ मिलकर कहानी को आगे बढ़ाते हैं, उनके',
                  options: ['सहायक पात्र वे पात्र होते हैं जो मुख्य पात्र के साथ मिलकर कहानी को आगे बढ़ाते हैं, उनके', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'यदि फंसे हुए हों तो c12_hin_a_cbse_13_004 (पात्र-चित्रण: नायक) को दोबारा पढ़िए, क्योंकि सहायक पात्र.',
                  misconception: 'छात्र अक्सर सोचते हैं कि सहायक पात्र केवल इसलिए महत्वपूर्ण हैं क्योंकि वे मुख्य पात्र के करीब हैं या उनकी सेवा करते हैं — जैसे कि कस्तूरबा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले उस अंश को दोबारा पढ़ने के लिए कहिए जहां सहायक पात्र मुख्य पात्र के साथ संवाद कर रहे हों। फिर पूछिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_006', difficulty: 'standard',
          question: 'मुख्य विषय वह केंद्रीय विचार या संदेश है जिसे लेखक अपने पात्रों, घटनाओं और.',
          hint: 'पात्र-चित्रण (c12_hin_a_cbse_13_004 और c12_hin_a_cbse_13_005) की अवधारणा को दोबारा देखें.',
          misconception: 'छात्र अक्सर मुख्य विषय को पात्रों के नाम या प्रमुख घटनाओं से जोड़कर मान लेते हैं कि "इस पाठ का मुख्य विषय गांधी, नेहरू.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय वह केंद्रीय विचार या संदेश है जिसे लेखक अपने पात्रों, घटनाओं और संवादों के',
                  options: ['मुख्य विषय वह केंद्रीय विचार या संदेश है जिसे लेखक अपने पात्रों, घटनाओं और संवादों के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'पात्र-चित्रण (c12_hin_a_cbse_13_004 और c12_hin_a_cbse_13_005) की अवधारणा को दोबारा देखें कि पात्र.',
                  misconception: 'छात्र अक्सर मुख्य विषय को पात्रों के नाम या प्रमुख घटनाओं से जोड़कर मान लेते हैं कि "इस पाठ का मुख्य विषय गांधी, नेहरू और यासरि अराफ़ात.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ में दोहराए जा रहे शब्दों या विचारों पर ध्यान देने के लिए कहें (जैसे शांति, बातचीत, एकता)। फिर पूछें: "ये.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
