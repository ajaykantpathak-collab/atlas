import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch02_p1: SimDef = {
    id: 'v3_c12_hin_a_ch02_p1',
    title: 'सरोज स्मृति · Part 1/3',
    subtitle: 'He lost everything — and gained every register of the language',
    classLevel: 12, subject: 'hin_a', topic: 'सरोज स्मृति · Part 1/3',
    chapters: ['c12_hin_a_ch02'],
    nodeIds: ['c12_hin_a_cbse_02_001', 'c12_hin_a_cbse_02_002', 'c12_hin_a_cbse_02_003', 'c12_hin_a_cbse_02_004', 'c12_hin_a_cbse_02_005', 'c12_hin_a_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poet\'s biographer', intro: 'Three tragedies before forty — and a poetic range no one else matched. The biography explains the voice.', goal: 'Connect Nirala\'s losses and editorial life to his stylistic range and evolution beyond Chhayavad.' },
    discovery: {
        question: 'Orphaned young, widowed early, alone in a Kolkata boarding house — yet Nirala\'s poems celebrate life\'s fleeting beauty. How does grief become craft?',
        options: ['Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice', 'He suppressed the grief', 'Poetry was his therapy only', 'Luck and talent'],
        answer: 'Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice',
        hook: 'Nirala outgrew Chhayavad\'s self-centred lyricism — from subjective romance to epic history, satire and metaphysical inquiry. His language had \'many forms and levels\': the same pen wrote high-Sanskrit prayer and village-cornfield satire. Grief was the fuel; craft was the engine.',
    },
    teaching: [
        { title: 'सरोज स्मृति — कवि परिचय और पृष्ठभूमि', text: 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों, राष्ट्रभक्ति और सामाजिक चेतना को दर्शाता है, जिसमें काव्यात्मक सौंदर्य और गहरे भावनात्मक संदेश समाहित हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a poet\'s alchemy: follow the losses that forged him, map his leap beyond Chhayavad\'s bounds, and hear one voice speak in epic Sanskrit and village Avadhi both.',
        labels: ['सरोज स्मृति — कवि', 'सरोज स्मृति — पद्यांश-वार', 'सरोज स्मृति — काव्य-संरचना', 'सरोज स्मृति — केंद्रीय', 'सरोज स्मृति — छंद', 'सरोज स्मृति — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re making a memorial film for a departed grandparent. The editor wants strict chronology — birth, childhood, marriage, death — \'so it\'s clear.\' Your best asset is a single fading photograph of her as a young woman.',
            decisions: [{ prompt: 'What does the structure of Agyeya\'s \'लज्जत लेखा\' advise?', options: [
                { text: 'Open on the photograph — let the frame\'s mystery pull the viewer back through fragments of her life and return to the portrait at the end; the non-linear circle enacts how memory actually holds the dead, and makes impermanence felt rather than stated.', outcome: 'The poem begins with a portrait because the trace is all that survives — starting there gives the viewer the poet\'s own shock of discovery; chronology would flatten the loss into a record.' },
                { text: 'Go chronological — clarity is respect, and audiences shouldn\'t have to piece a life together.', outcome: 'The chapter\'s counter is that order is meaning: the circular frame mimics the mind returning to a fixed image; a straight birth-to-death line dilutes the irony that only the image remains.', reveals: 'clarity-demands-chronology' },
                { text: 'Drop the photograph and structure the film around interviews with people who knew her.', outcome: 'That trades the anchor for testimony: the poem\'s power is the single surviving image holding a whole life — without it, the memories float unattached.', reveals: 'testimony-beats-image' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a life into its poetry — and see how Nirala turned personal catastrophe into the widest range in modern Hindi verse.',
            decisions: [{ prompt: 'What comes next? सरोज स्मृति · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सरोज स्मृति · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_001', difficulty: 'standard',
          question: 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों.',
          hint: 'यदि फंसे हुए महसूस हो रहे हैं, तो कक्षा 11 के इतिहास नोड c11_his_cbse_03_001 (स्वतंत्रता.',
          misconception: 'छात्र अक्सर मानते हैं कि सरोज स्मृति केवल सरोजिनी नायडू की व्यक्तिगत भावनाओं का अभिव्यक्ति है और इसका राष्ट्रीय या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,',
                  options: ['सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय', 'केंद्रीय भाव वह मुख्य विचार या अनुभव है जो कविता के सभी छंदों में एकजुट होकर व्यक्त होता'],
                  hint: 'यदि फंसे हुए महसूस हो रहे हैं, तो कक्षा 11 के इतिहास नोड c11_his_cbse_03_001 (स्वतंत्रता आंदोलन) को.',
                  misconception: 'छात्र अक्सर मानते हैं कि सरोज स्मृति केवल सरोजिनी नायडू की व्यक्तिगत भावनाओं का अभिव्यक्ति है और इसका राष्ट्रीय या सामाजिक आयाम नहीं है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस误解 को दूर करने के लिए, छात्र से पूछिए कि वे सरोज स्मृति की कोई भी कविता पढ़ें और दो कॉलम बनाएँ: एक में व्यक्तिगत भाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का.',
          hint: 'यदि छात्र भावार्थ निकालने में फंस जाए तो उसे कक्षा 11 के पाठ 3 के साहित्यिक युक्तियाँ.',
          misconception: 'छात्र अक्सर सरोज स्मृति के पद्यांश में किसी भी भावपूर्ण शब्द (जैसे "अकेला", "रोया", "भुला") को पढ़कर तुरंत मान लेते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय', 'केंद्रीय भाव वह मुख्य विचार या अनुभव है जो कविता के सभी छंदों में एकजुट होकर व्यक्त होता'],
                  hint: 'यदि छात्र भावार्थ निकालने में फंस जाए तो उसे कक्षा 11 के पाठ 3 के साहित्यिक युक्तियाँ: बिंब और रूपक.',
                  misconception: 'छात्र अक्सर सरोज स्मृति के पद्यांश में किसी भी भावपूर्ण शब्द (जैसे "अकेला", "रोया", "भुला") को पढ़कर तुरंत मान लेते हैं कि कवि दुखी है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताइए कि भावार्थ निकालना किसी जासूस की तरह काम करना है: पहले पद्यांश को पढ़ें और उन 2-3 शब्दों को घेरे जो आपको.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों.',
          hint: 'यदि मुक्तछंद की आंतरिक लय समझ न आए, तो c11_hin_a_cbse_13_005 (जाग तुझको दूर जाना — छंद और.',
          misconception: '**\'मुक्तछंद का अर्थ है बिना नियम की कविता\'** — यह सबसे घातक भ्रम है। छात्र समझते हैं कि निराला ने \'मनमाने ढंग से\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय',
                  options: ['काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'केंद्रीय भाव वह मुख्य विचार या अनुभव है जो कविता के सभी छंदों में एकजुट होकर व्यक्त होता'],
                  hint: 'यदि मुक्तछंद की आंतरिक लय समझ न आए, तो c11_hin_a_cbse_13_005 (जाग तुझको दूर जाना — छंद और लय-विधान).',
                  misconception: '**\'मुक्तछंद का अर्थ है बिना नियम की कविता\'** — यह सबसे घातक भ्रम है। छात्र समझते हैं कि निराला ने \'मनमाने ढंग से\' पंक्तियाँ तोड़ी हैं, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **पद 10-12 जोर से पढ़वाएँ** — उससे पूछें: "कहाँ तुम्हारी साँस स्वाभाविक रूप से रुकती है?" फिर दिखाएँ कि निराला.', '**दो संस्करण लिखवाएँ**: एक निराला का मूल, दूसरा उसी भाव को गद्य-अनुच्छेद (prose paragraph) में — फिर दोनों का पाठकीय.', 'यदि फिर भी न समझे, तो **c11_hin_a_cbse_13_003 (जाग तुझको दूर जाना — काव्य-संरचना)** और **c11_hin_a_cbse_14_003 (बादल को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_004', difficulty: 'standard',
          question: 'केंद्रीय भाव वह मुख्य विचार या अनुभव है जो कविता के सभी छंदों में एकजुट होकर.',
          hint: 'यदि छात्र केंद्रीय भाव और रस को जोड़ने में कठिनाई महसूस कर रहे हैं, तो उन्हें.',
          misconception: 'छात्र अक्सर मानते हैं कि केंद्रीय भाव और रस एक ही बात हैं — जैसे यदि कविता दुखी है तो उसका रस automatisch करुण हो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव वह मुख्य विचार या अनुभव है जो कविता के सभी छंदों में एकजुट होकर व्यक्त होता',
                  options: ['केंद्रीय भाव वह मुख्य विचार या अनुभव है जो कविता के सभी छंदों में एकजुट होकर व्यक्त होता', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय'],
                  hint: 'यदि छात्र केंद्रीय भाव और रस को जोड़ने में कठिनाई महसूस कर रहे हैं, तो उन्हें c12_hin_a_cbse_02_003.',
                  misconception: 'छात्र अक्सर मानते हैं कि केंद्रीय भाव और रस एक ही बात हैं — जैसे यदि कविता दुखी है तो उसका रस automatisch करुण हो जाएगा। वे यह नहीं समझते.' }
          ],
            remediations: { 'automatisch': { steps: ['यदि छात्र केंद्रीय भाव और रस को एक ही मान रहे हैं, तो उन्हें दो अलग-अलग कविताएँ दें जिनका विषय एक ही हो (जैसे बिछोह).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_005', difficulty: 'standard',
          question: 'सरोज स्मृति में निराला जी ने **मुक्त छंद (Free Verse)** का प्रयोग किया है.',
          hint: 'अगर अटका लगे तो कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_005) का छंद-विश्लेषण.',
          misconception: 'छात्र समझते हैं कि \'मुक्त छंद\' का अर्थ है **\'कुछ भी लिख दो, पंक्तियाँ तोड़ दो\'** — वे मात्रा-गणना न होने को \'नियमहीनता\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सरोज स्मृति में निराला जी ने **मुक्त छंद (Free Verse)** का प्रयोग किया है जिसमें निश्चित',
                  options: ['सरोज स्मृति में निराला जी ने **मुक्त छंद (Free Verse)** का प्रयोग किया है जिसमें निश्चित', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय'],
                  hint: 'अगर अटका लगे तो कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_005) का छंद-विश्लेषण दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'मुक्त छंद\' का अर्थ है **\'कुछ भी लिख दो, पंक्तियाँ तोड़ दो\'** — वे मात्रा-गणना न होने को \'नियमहीनता\' मान लेते हैं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता के **केवल पहले और अंतिम पद** जोर से पढ़वाएँ, साँस-रोक (breath-hold) अंतर महसूस करवाएँ। 2.', 'फिर उनसे पूछें: "कहाँ साँस लंबी खिंची?', 'कहाँ बार-बार अटकी?" — इसे लय-गति से जोड़ें। 3.', 'अब **कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_005)** या \'बादल को घरिते देखा है\' (c11_hin_a_cbse_14_005) के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_006', difficulty: 'standard',
          question: 'अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा में सजावट के साथ-साथ अर्थ को गहरा.',
          hint: 'यदि stuck हो तो c11_hin_a_cbse_01_008 और c11_hin_a_cbse_02_008 पर रूपक और उपमा की आधारभूत.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द दोहराया गया है तो वह अनुप्रास है, जैसे "मन मन करता है" में "मन" का दोहराव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा में सजावट के साथ-साथ अर्थ को गहरा करती हैं, भाव',
                  options: ['अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा में सजावट के साथ-साथ अर्थ को गहरा करती हैं, भाव', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय'],
                  hint: 'यदि stuck हो तो c11_hin_a_cbse_01_008 और c11_hin_a_cbse_02_008 पर रूपक और उपमा की आधारभूत पहचान की.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द दोहराया गया है तो वह अनुप्रास है, जैसे "मन मन करता है" में "मन" का दोहराव अनुप्रास होना। यह गलत है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले ध्वनि पर ध्यान देने के लिए कहिए: शब्द बंद आँखों से पढ़िए और शुरुआती अक्षर की ध्वनि पर ध्यान दीजिए - यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
