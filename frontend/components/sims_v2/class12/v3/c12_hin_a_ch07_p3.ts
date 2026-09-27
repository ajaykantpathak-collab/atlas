import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch07_p3: SimDef = {
    id: 'v3_c12_hin_a_ch07_p3',
    title: 'बारहमासा · Part 3/3',
    subtitle: 'A walking song where hunger means two hungers',
    classLevel: 12, subject: 'hin_a', topic: 'बारहमासा · Part 3/3',
    chapters: ['c12_hin_a_ch07'],
    nodeIds: ['c12_hin_a_cbse_07_013', 'c12_hin_a_cbse_07_014', 'c12_hin_a_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Varkari-tradition reader', intro: 'On the road to Pandharpur, a saint-poet handed the poorest pilgrims a song — and a subtle verdict on orthodoxy.', goal: 'Read Eknath\'s Abhang through the Varkari tradition — folk form carrying devotion and social critique.' },
    discovery: {
        question: 'A pilgrim woman sings to Vitthal of hunger and thirst on the road to Pandharpur — why does an Abhang carry both at once?',
        options: ['Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together', 'Pilgrims just get hungry', 'Folk songs need simple themes', 'Fasting is the ritual'],
        answer: 'Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together',
        hook: 'Eknath was a Brahmin who wrote for the marginalised — the Abhang\'s plain Marathi, folk rhythm and a woman\'s voice are the reform, not simplification. This is poetry made to be walked and sung, not recited from a throne.',
    },
    teaching: [
        { title: 'बारहमासा — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण का अर्थ है कविता के किसी पद्यांश के भावात्मक और tematischer गहराई को समझकर उसकी व्याख्या करना, जिसमें कवि के भाव, उपयोग किए गए साहित्यिक युक्तियाँ, और केंद्रीय संदेश का विश्लेषण शामिल.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_07_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'March with the Varkaris: learn what makes an Abhang an Abhang, read hunger as both road and spirit, and hear how a saint smuggled equality into a song.',
        labels: ['बारहमासा — आशय-स्पष्टीकरण और', 'बारहमासा — परीक्षा-उत्तर लेखन', 'बारहमासा — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_a_cbse_07_015', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['स्वर मिलान देखें: "आई" का अंतिम स्वर ई है, "छूटा" का अंतिम.', 'व्यंजन मिलान जाँचें: दोनों शब्दों में अंत्य व्यंजन नहीं है.', 'असमान तुक की धीमी,断裂 वाली लय को गर्मी के अचानक, असहज आगमन.', 'प्रत्येक अंतिम शब्द के स्वर-व्यंजन पैटर्न को अलग-अलग बोलकर.', 'पंक्ति को धीरे-धीरे आवाज़ में पढ़कर अंतिम शब्दों "आई" और.'], answer: 'पंक्ति को धीरे-धीरे आवाज़ में पढ़कर अंतिम शब्दों "आई" और. प्रत्येक अंतिम शब्द के स्वर-व्यंजन पैटर्न को अलग-अलग बोलकर. स्वर मिलान देखें: "आई" का अंतिम स्वर ई है, "छूटा" का अंतिम. व्यंजन मिलान जाँचें: दोनों शब्दों में अंत्य व्यंजन नहीं है. असमान तुक की धीमी,断裂 वाली लय को गर्मी के अचानक, असहज आगमन.' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a folk-style music video of a woman waiting through the night for someone who doesn\'t come. A teammate wants to cut the repeated shots — lamp, doorway, her face — because \'repetition is dead screen time.\'',
            decisions: [{ prompt: 'What does Mahadevi Verma\'s \'बारहमासा\'-style waiting poem say?', options: [
                { text: 'Keep the repeats — in the poem each stanza\'s return to lamp, night and call is the waiting itself; repetition isn\'t filler, it\'s the heartbeat, and each recurrence shifts from active seeking to inward endurance as the night deepens.', outcome: 'The chapter\'s point: in folk narrative the structure IS the emotion — time passing is the plot, and only the repeated images let the viewer feel its weight.' },
                { text: 'Cut them — montage it once and move on; viewers understand waiting from a single shot.', outcome: 'One shot conveys \'she waited\' as information; the poem\'s layered returns make the waiting an experience — the difference between being told a night passed and watching it refuse to pass.', reveals: 'repetition-is-filler' },
                { text: 'Keep one repeat at the end for rhythm but tighten the middle.', outcome: 'The poem needs the middle repetitions most — that\'s where \'the day passed, the night didn\'t\' stretches external time into her subjective endurance; trimming there trims the tension\'s source.', reveals: 'repeat-only-at-end' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a pilgrimage song as social reform in folk metre — Bhakti that walks, sings and quietly levels.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण का अर्थ है कविता के किसी पद्यांश के भावात्मक और tematischer.',
          hint: 'यदि छात्र भावगत विश्लेषण में फंसे तो उसे पद्यांश-वार भावार्थ (c12_hin_a_cbse_07_002) पर.',
          misconception: 'छात्र अक्सर बारहमासा की पंक्तियों का भावगत अर्थ बताते समय केवल शब्दार्थ का अनुवाद कर देते हैं, जैसे "सUN पड़ी अगни तपति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण का अर्थ है कविता के किसी पद्यांश के भावात्मक और tematischer गहराई को समझकर',
                  options: ['आशय-स्पष्टीकरण का अर्थ है कविता के किसी पद्यांश के भावात्मक और tematischer गहराई को समझकर', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'यदि छात्र भावगत विश्लेषण में फंसे तो उसे पद्यांश-वार भावार्थ (c12_hin_a_cbse_07_002) पर दोबारा काम.',
                  misconception: 'छात्र अक्सर बारहमासा की पंक्तियों का भावगत अर्थ बताते समय केवल शब्दार्थ का अनुवाद कर देते हैं, जैसे "सUN पड़ी अगни तपति re" को सिर्फ "सूर्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कविता की कोई एक पंक्ति लें (जैसे "बासंती रागु बिनु सोहागन") और पूछिए: "इसमें क्या भाव छिपा हो सकता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल वह 체계िक विधि है जिसके द्वारा छात्र कविता के प्रश्नों के.',
          hint: 'यदि छात्र उत्तर में प्रमाण और स्पष्टीकरण को जोड़ने में कठिनाई महसूस कर रहा है, तो उसे.',
          misconception: 'छात्र अक्सर मानते हैं कि बारहमासा कविता के प्रश्नों के उत्तर में केवल कविता के शब्द-कोश (कठिन शब्दों के अर्थ) लिख देने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल वह 체계िक विधि है जिसके द्वारा छात्र कविता के प्रश्नों के उत्तर को',
                  options: ['परीक्षा-उत्तर लेखन कौशल वह 체계िक विधि है जिसके द्वारा छात्र कविता के प्रश्नों के उत्तर को', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'यदि छात्र उत्तर में प्रमाण और स्पष्टीकरण को जोड़ने में कठिनाई महसूस कर रहा है, तो उसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि बारहमासा कविता के प्रश्नों के उत्तर में केवल कविता के शब्द-कोश (कठिन शब्दों के अर्थ) लिख देने से पूर्ण अंक मिल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर (जैसे: "सुख-संपदा का त्याग means त्याग करना") को कैसे PEEL संरचना में बदलें: पहले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_015', difficulty: 'standard',
          question: 'बारहमासा की वाचन-पाठ और चर्चा-बिंदु वह प्रक्रिया है जिसमें कविता की पंक्तियों.',
          hint: 'यदि छात्र वाचन में लय पहचानने में कठिनाई महसूस कर रहा है, तो उसे ताल बजाकर या हाथ तालि से.',
          misconception: 'बारहमासा की वाचन-पाठ में छात्र अक्सर यह मानते हैं कि यदि वे पंक्तियों को तेज़ी से पढ़ लें तो उनका काम पूरा हो गया है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बारहमासा की वाचन-पाठ और चर्चा-बिंदु वह प्रक्रिया है जिसमें कविता की पंक्तियों को सही',
                  options: ['बारहमासा की वाचन-पाठ और चर्चा-बिंदु वह प्रक्रिया है जिसमें कविता की पंक्तियों को सही', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'यदि छात्र वाचन में लय पहचानने में कठिनाई महसूस कर रहा है, तो उसे ताल बजाकर या हाथ तालि से लय का.',
                  misconception: 'बारहमासा की वाचन-पाठ में छात्र अक्सर यह मानते हैं कि यदि वे पंक्तियों को तेज़ी से पढ़ लें तो उनका काम पूरा हो गया है, और वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस गलती को दोहरा रहा है, तो उसे प्रत्येक पंक्ति को तीन चरणों में पढ़ने के लिए कहें: (1) पहले धीरे-धीरे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
