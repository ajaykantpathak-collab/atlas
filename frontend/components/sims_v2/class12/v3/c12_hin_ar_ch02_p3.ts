import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch02_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch02_p3',
    title: 'पतंग · Part 3/3',
    subtitle: 'A poem that mourns without ever complaining',
    classLevel: 12, subject: 'hin_ar', topic: 'पतंग · Part 3/3',
    chapters: ['c12_hin_ar_ch02'],
    nodeIds: ['c12_hin_ar_cbse_02_013', 'c12_hin_ar_cbse_02_014', 'c12_hin_ar_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Contemporary Hindi poetry reader', intro: 'A book-length poem built to hold a vanishing world — one precise image at a time.', goal: 'Read Patang inside Alok Dhanva\'s long poem — science-trained observation as elegy for a disappearing rural world.' },
    discovery: {
        question: 'A poet watches the village world of his childhood dissolve — yet never once writes in complaint. How does a poem protest without protesting?',
        options: ['Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique', 'By staying silent', 'By blaming politicians', 'It can\'t — complaint is required'],
        answer: 'Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique',
        hook: '\'No tone of complaint\' doesn\'t mean no criticism — the poet is also a science communicator, so the poem works like field notes: concrete, sensory, exact. It\'s one movement of a single book-length poem, an architecture of memory against erasure.',
    },
    teaching: [
        { title: 'पतंग — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'इराक्स\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the long poem as preservation work: follow childhood idyll into encroaching modernity, weigh what the three-part textbook split gains and costs, and hear critique inside pure description.',
        labels: ['पतंग — आशय-स्पष्टीकरण और', 'पतंग — परीक्षा-उत्तर लेखन', 'पतंग — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Curating a farewell exhibit, a teammate dismisses a photo essay of childhood monsoons — paper boats, wet gullies — as \'cute nostalgia with no real content.\' You think it\'s the strongest piece submitted.',
            decisions: [{ prompt: 'How does Kunwar Narain\'s poem structure defend the piece?', options: [
                { text: 'Point to the architecture — the poem moves from a concrete childhood scene to an adult meditation, showing memory isn\'t a discarded past but a layer still alive under the present; the essay\'s small wet moments are the vessel for a universal claim.', outcome: 'The poem proves that juxtaposing then and now is how memory actually works — the \'content\' is the endurance of childhood, not the boats themselves.' },
                { text: 'Concede — childhood images are sentimental raw material until they\'re processed into a serious argument.', outcome: 'That inverts the poem\'s method: the concrete scene is what earns the abstract reflection; stripping the sensory ground leaves the \'argument\' with nothing to stand on.', reveals: 'nostalgia-is-not-content' },
                { text: 'Defend it only as emotion — \'it feels true\' is enough without needing structure talk.', outcome: 'Feeling without structure undersells the piece: the chapter\'s point is that the arrangement — present tense scene widening into reflection — is what converts one person\'s memory into everyone\'s.', reveals: 'emotion-needs-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You can now hear a poem argue without ever accusing — the nayi kavita way of making images carry the whole weight.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_013', difficulty: 'standard',
          question: '\'इराक्स\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'अगर फँस जाएँ तो c12_hin_ar_cbse_02_007 (प्रतीक और बिंब) दोहराएँ — \'डोर=बंधन, हवा=मुक्ति.',
          misconception: 'छात्र समझते हैं कि आशय-स्पष्टीकरण = \'पंक्तियों का हिंदी अनुवाद\'। वे लिखते हैं: "कवि कहता है पतंग उड़ती है डोर के सहारे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'इराक्स\' का आलोचनात्मक चिंतन',
                  options: ['\'इराक्स\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'इराक्स\' का कथानक', '\'इराक्स\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर फँस जाएँ तो c12_hin_ar_cbse_02_007 (प्रतीक और बिंब) दोहराएँ — \'डोर=बंधन, हवा=मुक्ति, आकाश=असीम.',
                  misconception: 'छात्र समझते हैं कि आशय-स्पष्टीकरण = \'पंक्तियों का हिंदी अनुवाद\'। वे लिखते हैं: "कवि कहता है पतंग उड़ती है डोर के सहारे आकाश में" — यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "पहले c12_hin_ar_cbse_02_002 (पद्यांश-वार भावार्थ) दोहराओ — हर पंक्ति का शाब्दिक अर्थ लिखो।" 2.', 'फिर c12_hin_ar_cbse_02_007 (प्रतीक और बिंब) देखो — प्रत्येक बिंब का प्रतीकात्मक अर्थ नोट करो। 3.', 'अब c12_hin_ar_cbse_02_004 (केंद्रीय भाव) पढ़ो — कविता का मुख्य संदेश एक वाक्य में लिखो। 4.', 'अंत में इस नोड के WORKED_EXAMPLE_1 को देखकर 4-चरणीय ढाँचा (प्रसंग → शब्दार्थ → प्रतीक → केंद्रीय भाव) अपनाकर पुनः.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_014', difficulty: 'standard',
          question: '\'इराक्स\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि PEEL संरचना भूल गए हों तो कक्षा 11 के नोड c11_hin_ar_cbse_13_014 (जाग तुझको दूर जाना.',
          misconception: 'सबसे घातक भ्रांति: "अच्छा उत्तर = अधिक ज्ञान/लंबाई"। छात्र सोचते हैं कि कविता की पूरी कहानी, कवि का जीवन परिचय, सभी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'इराक्स\' पर पाठ-आधारित लेखन',
                  options: ['\'इराक्स\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'इराक्स\' का कथानक', '\'इराक्स\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि PEEL संरचना भूल गए हों तो कक्षा 11 के नोड c11_hin_ar_cbse_13_014 (जाग तुझको दूर जाना.',
                  misconception: 'सबसे घातक भ्रांति: "अच्छा उत्तर = अधिक ज्ञान/लंबाई"। छात्र सोचते हैं कि कविता की पूरी कहानी, कवि का जीवन परिचय, सभी अलंकार गिनाने से पूरे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को 3 पुराने बोर्ड प्रश्नपत्र (2022, 2023, 2024) दें और केवल \'पतंग\' कविता के प्रश्न छाँटने को कहें। 2.', 'प्रत्येक प्रश्न के लिए मार्किंग स्कीम (CBSE वेबसाइट से) खोलें और मिलान करें: कितने वैल्यू पॉइंट्स थे?', 'छात्र से कहें: "अब तुम परीक्षक हो — इस कमज़ोर उत्तर को मार्किंग स्कीम से जाँचो और बताओ कहाँ-कहाँ अंक कटेंगे।" 4.', 'फिर छात्र स्वयं वही प्रश्न PEEL संरचना में दोबारा लिखे। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_015', difficulty: 'standard',
          question: '\'इराक्स\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।',
          hint: 'यदि छंद-लय न पकड़ में आए तो c12_hin_ar_cbse_02_005 के \'मात्रिक छंद पहचान\' अभ्यास दुहराएँ.',
          misconception: 'छात्र समझते हैं कि \'वाचन-पाठ\' = \'तेज़-तेज़ पढ़ देना\' और \'चर्चा\' = \'सबकी राय सुन लेना\'। वास्तव में: (1) वाचन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'इराक्स\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'इराक्स\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'इराक्स\' का कथानक', '\'इराक्स\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छंद-लय न पकड़ में आए तो c12_hin_ar_cbse_02_005 के \'मात्रिक छंद पहचान\' अभ्यास दुहराएँ; यदि.',
                  misconception: 'छात्र समझते हैं कि \'वाचन-पाठ\' = \'तेज़-तेज़ पढ़ देना\' और \'चर्चा\' = \'सबकी राय सुन लेना\'। वास्तव में: (1) वाचन **छंद-लय-अर्थ की त्रिवेणी** है.' }
          ],
            remediations: { '1-vs-2': { steps: ['**चरण 1:** छात्र से कहें — "कविता की पहली चार पंक्तियाँ **ताली बजाते हुए** पढ़ो" — इससे छंद-लय (मात्रिक छंद) देह में.', '\'डोर\' से क्या भेद है?"* — छात्र को पंक्ति दिखाकर उत्तर देने को कहें। **चरण 4:** यदि फिर कठिनाई हो तो पूर्व नोड.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
