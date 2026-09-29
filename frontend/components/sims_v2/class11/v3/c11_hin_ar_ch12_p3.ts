import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch12_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch12_p3',
    title: 'पाठ 12 · Part 3/3',
    subtitle: 'Follow a village postman who delivers an argument instead of a letter.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 12 · Part 3/3',
    chapters: ['c11_hin_ar_ch12'],
    nodeIds: ['c11_hin_ar_cbse_12_013', 'c11_hin_ar_cbse_12_014', 'c11_hin_ar_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a villager deciding whether \'पढ़ ले\' is an order or an invitation', intro: 'A postman calls at the door and finds the letters useless to the woman inside — so he tries to hand her the alphabet itself.', goal: 'Read the poem as a narrative of persuasion and evaluate its open, imperative ending.' },
    discovery: {
        question: 'A postman urges an illiterate villager to learn letters; the poem ends on \'पढ़ ले!\' — does the villager learn to read by the end?',
        options: ['No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader', 'Yes — she reads her letter in the final stanza', 'Yes — literacy is achieved by stanza six', 'No — the postman gives up instead'],
        answer: 'No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader',
        hook: 'Agyeya the linguist wrote in the people\'s dialect on purpose — the poem isn\'t about letters, it\'s about reclaiming agency.',
    },
    teaching: [
        { title: 'पाठ 12 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'पैक डकस डकस वपंजु न पुखरह\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the postman\'s arrival to the command \'पढ़ ले!\' as a narrative arc, then argue whether a revolutionary poet\'s literacy poem can be called propaganda.',
        labels: ['पाठ 12 — आलोचनात्मक', 'पाठ 12 — लेखन', 'पाठ 12 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_12_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 3/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — \'पैक डकस डकस वपंजु न पुखरह\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — \'पैक डकस डकस वपंजु न पुखरह\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श.', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is adapting Agyeya\'s poem — a postman urging an illiterate villager to read — for a street play. The adapter wants to add a narrator to \'explain the poet\'s sadness about illiteracy\' and soften the postman\'s command \'पढ़ ले!\' into polite persuasion.',
            decisions: [{ prompt: 'Why do both changes miss the poem\'s design?', options: [
                { text: 'Keep it narrative and keep the force: this isn\'t a lyric about sadness — it\'s a performed confrontation carried entirely in dialogue, no narrator needed. The structure runs exposition (postman\'s arrival) through rising action (the villager\'s shame, the persuasion) to the climax \'पढ़ ले!\' and resolves in a vision of empowerment. Softening the command defuses the turning point — and context sharpens it: an experimentalist poet in the literacy-campaign era making language itself a tool of liberation.', outcome: 'The play preserves the poem\'s engine: dialogue as structure, the command as climax — oral culture crossing into literacy onstage.' },
                { text: 'Add the narrator — an audience needs someone to state the theme clearly.', outcome: 'The poem deliberately works without narration: the two voices carry the whole arc, and a narrator converts performance into summary.', reveals: 'narrator-needed-for-theme' },
                { text: 'Soften the command — \'please try reading\' is kinder and more realistic persuasion.', outcome: 'The imperative is the climax — the moment agency is handed over; softening it turns a demand for liberation into a suggestion.', reveals: 'soften-the-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'The poem never shows her reading — the last word is a command left open, because the literacy it imagines was still unfinished business.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_013', difficulty: 'standard',
          question: '\'पैक डकस डकस वपंजु न पुखरह\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_12_008 और c11_hin_ar_cbse_12_009 (साहित्यिक.',
          misconception: 'छात्र मानते हैं कि आलोचनात्मक चिंतन का अर्थ \'कमियाँ निकालना\' या \'लेखक से असहमत होना\' है, जबकि वास्तव में यह पाठ की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पैक डकस डकस वपंजु न पुखरह\' का आलोचनात्मक चिंतन',
                  options: ['\'पैक डकस डकस वपंजु न पुखरह\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'पैक डकस डकस वपंजु न पुखरह\' का कथानक', '\'पैक डकस डकस वपंजु न पुखरह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_12_008 और c11_hin_ar_cbse_12_009 (साहित्यिक युक्तियाँ) को.',
                  misconception: 'छात्र मानते हैं कि आलोचनात्मक चिंतन का अर्थ \'कमियाँ निकालना\' या \'लेखक से असहमत होना\' है, जबकि वास्तव में यह पाठ की आंतरिक सांगठनिकता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें कि वह पाठ का कोई एक छोटा अंश (5-6 पंक्तियाँ) चुने और केवल यह लिखे: \'लेखक यहाँ क्या कर रहा है?\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_014', difficulty: 'standard',
          question: '\'पैक डकस डकस वपंजु न पुखरह\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की.',
          hint: 'यदि PEEL के Explanation चरण में फंसें, तो नोड c11_hin_ar_cbse_12_006 से मुख्य विषय की.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर लिखने का अर्थ है केवल पाठ की पंक्तियों को कॉपी करके उत्तर में डाल देना, बिना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पैक डकस डकस वपंजु न पुखरह\' पर पाठ-आधारित लेखन',
                  options: ['\'पैक डकस डकस वपंजु न पुखरह\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'पैक डकस डकस वपंजु न पुखरह\' का कथानक', '\'पैक डकस डकस वपंजु न पुखरह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि PEEL के Explanation चरण में फंसें, तो नोड c11_hin_ar_cbse_12_006 से मुख्य विषय की पहचान करने की.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर लिखने का अर्थ है केवल पाठ की पंक्तियों को कॉपी करके उत्तर में डाल देना, बिना उनके अर्थ की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "ठीक है, आपने पाठ से एक वाक्य लिया। अब मैं आपसे एक सवाल पूछता हूँ: इस वाक्य के बाद क्या होता है?', 'इस वाक्य से हमें पात्र के बारे में क्या नया पता चलता है जिसे हम पहले नहीं जानते थे?" फिर उन्हें निर्देश दें कि वे वाक्य.', 'क्या यह केवल sadness है या कुछ गहरा जैसे निराशा या अकेलापन?" इस प्रक्रिया से वे fact और analysis के बीच का अंतर देखना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_015', difficulty: 'standard',
          question: '\'पैक डकस डकस वपंजु न पुखरह\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, return to c11_hin_ar_cbse_12_010 (Vocabulary in Context) and rebuild the.',
          misconception: 'Students often treat the father\'s illiteracy as a deficit to be fixed, mirroring the son\'s initial view.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पैक डकस डकस वपंजु न पुखरह\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'पैक डकस डकस वपंजु न पुखरह\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'पैक डकस डकस वपंजु न पुखरह\' का कथानक', '\'पैक डकस डकस वपंजु न पुखरह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_12_010 (Vocabulary in Context) and rebuild the Bundelkhandi.',
                  misconception: 'Students often treat the father\'s illiteracy as a deficit to be fixed, mirroring the son\'s initial view.' }
          ],
            remediations: { 'students-often-treat-the-father': { steps: ['If a student insists the father is \'backward\', do not lecture.', 'Instead: (1) Ask them to list five things the father knows without reading (farming cycles, folk medicine, oral.', '(2) Have them re-read stanza 3 where the father predicts the son\'s future betrayal (\'त्क ड्यडक्क्स से कह द्गा...', 'त्क ड्यडक्क्स इज क्त्ज फ्क्जस\').'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
