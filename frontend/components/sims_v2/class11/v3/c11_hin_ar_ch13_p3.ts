import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch13_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch13_p3',
    title: 'पाठ 13 · Part 3/3',
    subtitle: 'Read a protest poem that never once explains its own violence.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 13 · Part 3/3',
    chapters: ['c11_hin_ar_ch13'],
    nodeIds: ['c11_hin_ar_cbse_13_013', 'c11_hin_ar_cbse_13_014', 'c11_hin_ar_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a filmmaker cutting three reels of the same dark hour', intro: 'A folk idiom (\'लकड़ी का लक्खा\'), a Marxist poet, a street on fire — the poem shows you the footage and trusts you to name the crime.', goal: 'Analyse montage structure and the stanza-wise stacking of public violence, private fear and universal law.' },
    discovery: {
        question: 'Smoldering stakes, barefoot fleeing children, a police jeep — three images stacked with no connecting line. Sloppy writing?',
        options: ['No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment', 'Yes — a poem must state its causes', 'Yes — images without links are just a list', 'No — the jeep is clearly chasing the children in the text'],
        answer: 'No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment',
        hook: 'The three stanzas aren\'t consecutive scenes — public chaos, private terror and eternal law are stacked as simultaneous faces of one Emergency-era moment.',
    },
    teaching: [
        { title: 'पाठ 13 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के गहन परीक्षण की वह प्रक्रिया है जिसमें पाठ की संरचना, भाषा-प्रयोग, अंतर्निहित मान्यताओं, लेखकीय दृष्टिकोण और सामाजिक-सांस्कृतिक संदर्भों को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_13_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the pronouns across the three stanzas to separate street, self and moral law, then defend why the poem refuses a linear plot.',
        labels: ['पाठ 13 — आलोचनात्मक', 'पाठ 13 — लेखन', 'पाठ 13 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_13_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 13 · Part 3/3', spots: [
            { id: 's1', label: '13 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन एक कौशल है जिसमें छात्र दिए गए पाठ्यांश से साक्ष्य का उपयोग करके स्पष्ट.', answer: '13 -', options: ['13 -', '13 - -'] },
            { id: 's2', label: '13 - -', prompt: 'Which idea is this? — \'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगात्मक भाषा कौशल है जिसमें शिक्षार्थी किसी साहित्यिक पाठ.', answer: '13 - -', options: ['13 - -', '13 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a protest-poetry evening, a student reads Nagarjun\'s poem and interprets it as a literal street scene: \'Police burn stakes, children run, the poet hides, then calls himself a king — confusing sequence, honestly.\'',
            decisions: [{ prompt: 'What\'s the better structural reading?', options: [
                { text: 'Read the three stanzas as simultaneous realities, not a sequence: Stanza 1 is public chaos, Stanza 2 the poet\'s private terror, Stanza 3 a universal moral law — stacked so that state violence, individual fear and enduring truth coexist in one totalitarian moment. And context sharpens it: a peasant-movement poet writing political satire in rustic imagery — the stake (लकड़ी) is a symbol of resistance, not firewood.', outcome: 'The \'confusing sequence\' resolves into deliberate design: structure is the argument — the poem forces three contradictory perspectives to be held at once.' },
                { text: 'Keep the story reading — find the causal links, like whether the police spotted the poet.', outcome: 'Hunting cause-and-effect across stanzas imports prose logic into a modernist poem: the stanzas are facets of one moment, not consecutive scenes.', reveals: 'stanzas-as-consecutive-scenes' },
                { text: 'Reclassify it as a nature poem — stakes, smoke and sunlight are rustic imagery.', outcome: 'The rustic surface is the disguise: a poet of peasant movements uses folk simplicity for political satire — nature imagery carries ideology.', reveals: 'satire-read-as-nature-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'Nagarjun stacks terror, conscience and law without explaining them — the reader assembling the causal chain is the poem\'s argument.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के गहन परीक्षण की वह.',
          hint: 'यदि फँस जाएँ तो **पाठ 13 के बिंब-प्रतीक (c11_hin_ar_cbse_13_008, 009) और मुख्य पदावली.',
          misconception: '**विशिष्ट भ्रांति:** "आलोचनात्मक चिंतन का अर्थ है पाठ में \'कमियाँ निकालना\' या लेखक से \'असहमत होना\'।" **गलत तर्क का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के गहन परीक्षण की वह प्रक्रिया है',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के गहन परीक्षण की वह प्रक्रिया है', 'पृष्ठभूमि (Background) किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में कथानक के घटित होने वाला समग्र भौतिक,'],
                  hint: 'यदि फँस जाएँ तो **पाठ 13 के बिंब-प्रतीक (c11_hin_ar_cbse_13_008, 009) और मुख्य पदावली.',
                  misconception: '**विशिष्ट भ्रांति:** "आलोचनात्मक चिंतन का अर्थ है पाठ में \'कमियाँ निकालना\' या लेखक से \'असहमत होना\'।" **गलत तर्क का स्रोत:** \'आलोचना\' शब्द.' }
          ],
            remediations: { 'critical-analytical-reading': { steps: ['**चरण 1:** छात्र से कहें: "पाठ का कोई एक वाक्य चुनो जो तुम्हें \'सामान्य\' लगे। अब उस वाक्य के **हर शब्द** से पूछो: \'तुम.', 'तुम्हारी जगह कोई और शब्द होता तो अर्थ कैसे बदलता?\'" **चरण 2:** छात्र को **\'क्या\' (What) → \'कैसे\' (How) → \'क्यों\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन एक कौशल है जिसमें छात्र दिए गए पाठ्यांश से साक्ष्य का उपयोग.',
          hint: 'यदि छात्र फंस जाए, तो पहले पाठ के मुख्य विषय (c11_hin_ar_cbse_13_006) और पात्र-चित्रण.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में जितने अधिक उद्धरण डालेंगे, उतना ही मजबूत उत्तर होगा, इसलिए वे पंक्तियों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन एक कौशल है जिसमें छात्र दिए गए पाठ्यांश से साक्ष्य का उपयोग करके स्पष्ट,',
                  options: ['पाठ-आधारित लेखन एक कौशल है जिसमें छात्र दिए गए पाठ्यांश से साक्ष्य का उपयोग करके स्पष्ट,', 'पृष्ठभूमि (Background) किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में कथानक के घटित होने वाला समग्र भौतिक,'],
                  hint: 'यदि छात्र फंस जाए, तो पहले पाठ के मुख्य विषय (c11_hin_ar_cbse_13_006) और पात्र-चित्रण.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में जितने अधिक उद्धरण डालेंगे, उतना ही मजबूत उत्तर होगा, इसलिए वे पंक्तियों को बिना सोचे-समझे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['पहले छात्र से कहिए कि वह अपने उत्तर में सभी उद्धरणों को चिह्नित करके देखे कि क्या प्रत्येक के बाद उसका अपना स्पष्टीकरण.', 'यह किस भाव, लक्षण, या विषय की ओर इशारा करता है?" इस प्रश्न के उत्तर को लिखवाकर दिखाइए कि यही स्पष्टीकरण है। अंत में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगात्मक भाषा कौशल है जिसमें शिक्षार्थी किसी.',
          hint: 'यदि अटके तो \'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या\' (c11_hin_ar_cbse_13_013) के.',
          misconception: 'छात्र अक्सर समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है पाठ के \'मुख्य विषय\' या \'संदेश\' को दोहराना — वे पाठ को एक निश्चित अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगात्मक भाषा कौशल है जिसमें शिक्षार्थी किसी साहित्यिक पाठ',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगात्मक भाषा कौशल है जिसमें शिक्षार्थी किसी साहित्यिक पाठ', 'पृष्ठभूमि (Background) किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में कथानक के घटित होने वाला समग्र भौतिक,'],
                  hint: 'यदि अटके तो \'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या\' (c11_hin_ar_cbse_13_013) के \'बहुअर्थकता\' खंड.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है पाठ के \'मुख्य विषय\' या \'संदेश\' को दोहराना — वे पाठ को एक निश्चित अर्थ वाला दस्तावेज मानते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 13 का कोई एक विवादास्पद प्रसंग (जैसे नायक का अंतिम निर्णय) दें और पूछें: "यदि तुम नायक की जगह होते, तो.', 'और यदि तुम उसकी माँ होते?" — दो भूमिकाएँ निभवाएँ। 2.', 'फिर दोनों उत्तरों को आमने-सामने रखकर पूछें: "दोनों सही कैसे हो सकते हैं?" — यहीं \'चर्चा-बिंदु\' जन्मता है। 3.', 'अब पाठ से दो-दो वाक्य ढूँढ़ने को कहें जो प्रत्येक भूमिका का समर्थन करें। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
