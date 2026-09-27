import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch02_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'Watch a quiet cook defeat his master without ever raising his voice.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c11_hin_ar_ch02'],
    nodeIds: ['c11_hin_ar_cbse_02_013', 'c11_hin_ar_cbse_02_014', 'c11_hin_ar_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener piecing together a servant\'s hidden past', intro: 'Puris puff on the stove while a nickname — \'उल्हनिहु\' — opens a trapdoor into a whole colonial history.', goal: 'Analyse the story\'s flashback structure and read its silent ending as resistance.' },
    discovery: {
        question: 'The cook Phenku ends the story serving puris in silence — the narrator learned nothing, so the ending resolves nothing?',
        options: ['Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history', 'Right — an open ending is a narrative failure', 'Right — the colonial anecdote deserved a dramatic payoff', 'Wrong — he actually resigns at the end'],
        answer: 'Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history',
        hook: 'The story hides its oldest event two-thirds of the way in — a flashback that only lands because we met the dignified cook first.',
    },
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या (Critical Thinking: Analysis and Interpretation) का अर्थ है — पाठ के विभिन्न अवयवों (कथानक, पात्र, भाषा, युक्तियाँ, विषय) को अलग-अलग करके उनके पारस्परिक संबंध.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reorder the five scenes by narrative logic rather than chronology, and argue why the colonial-officer flashback lands where it does.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_02_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 3/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह विधा है जिसमें छात्र किसी दिए गए गद्यांश या पद्यांश के आधार पर.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु पाठ के वाचन के बाद छात्रों के मौखिक विचारों को संरचित ढंग से.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a regional-literature seminar you present Renu\'s anchalik katha and Yashpal\'s \'Phenku\' story. A classmate objects: \'These dialect words and folk songs are local colour — decoration. And the Phenku story is simple: master questions cook, cook answers, done in order.\'',
            decisions: [{ prompt: 'What\'s the better analysis?', options: [
                { text: 'Show the machinery: in anchalik fiction the dialect, folk songs and agrarian rituals aren\'t colour — they carry the meaning and the tension between tradition and modernity. And Yashpal\'s structure is the argument: the colonial-officer anecdote arrives as a flashback two-thirds in, so we meet Phenku\'s present dignity BEFORE learning his past — the quiet \'simple\' cook becomes the moral centre while the talkative master shrinks.', outcome: 'Both corrections land: form is meaning — dialect is the story\'s engine, and narrative sequencing is how the servant outwits the master without raising his voice.' },
                { text: 'Agree dialect is decoration — translate it into standard Hindi so the \'real\' story shows clearly.', outcome: 'Removing the regional register removes the story: anchalik katha locates meaning in the specific soil, speech and ritual of the region.', reveals: 'dialect-is-decoration' },
                { text: 'Retell Phenku chronologically — put the officer anecdote first so events run in order.', outcome: 'Chronological retelling destroys the irony: the flashback\'s late placement is what lets present dignity precede past humiliation.', reveals: 'reorder-flashback-chronologically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'A servant who never raises his voice outwits everyone — the structure does the same to the reader.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या (Critical Thinking: Analysis and.',
          hint: 'यदि अटके: **पाठ 2 को पुनः पढ़ें** और एक पृष्ठ पर **माइंड-मैप (mind-map)** बनाएँ — केंद्र.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना (finding faults)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या (Critical Thinking: Analysis and Interpretation)',
                  options: ['आलोचनात्मक चिंतन: विश्लेषण और व्याख्या (Critical Thinking: Analysis and Interpretation)', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि अटके: **पाठ 2 को पुनः पढ़ें** और एक पृष्ठ पर **माइंड-मैप (mind-map)** बनाएँ — केंद्र में \'मुख्य.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना (finding faults)** या **अपनी निजी पसंद/नापसंद.' }
          ],
            remediations: { 'finding-faults-personal-likes-dislikes': { steps: ['**चरणबद्ध उपचार (Remediation Steps):** 1.', '**शब्द स्पष्टीकरण:** छात्र से पूछें — "आलोचना" और "विश्लेषण" में क्या अंतर है?', 'दो कॉलम बनवाएँ: आलोचना (निर्णय, भावनात्मक, व्यक्तिगत) vs विश्लेषण (तर्क, साक्ष्य, अवैयक्तिक)। 2.', '**मॉडलिंग:** पाठ 2 का एक छोटा अंश लें। **दो उत्तर दिखाएँ** — (क) व्यक्तिगत प्रतिक्रिया: "यह दृश्य मुझे बोरिंग लगा।" (ख).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह विधा है जिसमें छात्र किसी दिए गए गद्यांश या पद्यांश के.',
          hint: 'यदि छात्र अटका हो तो **c11_hin_ar_cbse_02_012 (बोध-प्रश्न)** और **c11_hin_ar_cbse_02_013.',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर में पाठ की **सारी महत्वपूर्ण बातें** लिख देनी चाहिए ताकि कोई बिंदु न छूटे।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह विधा है जिसमें छात्र किसी दिए गए गद्यांश या पद्यांश के आधार पर,',
                  options: ['पाठ-आधारित लेखन कौशल वह विधा है जिसमें छात्र किसी दिए गए गद्यांश या पद्यांश के आधार पर,', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि छात्र अटका हो तो **c11_hin_ar_cbse_02_012 (बोध-प्रश्न)** और **c11_hin_ar_cbse_02_013.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर में पाठ की **सारी महत्वपूर्ण बातें** लिख देनी चाहिए ताकि कोई बिंदु न छूटे।" **गलत तर्क:** छात्र.' }
          ],
            remediations: { 'coverage': { steps: ['**पहला कदम:** छात्र को एक **कमजोर उत्तर (Summary-heavy)** और एक **सशक्त उत्तर (PEEL-based)** साथ रखकर दिखाएं। पूछें.', '**दूसरा कदम:** एक छोटा गद्यांश दें और कहें: "इसमें से **केवल वही दो वाक्य छांटो** जो इस प्रश्न का उत्तर देते हैं: \'लेखक.', '**तीसरा कदम:** चुने गए साक्ष्य पर पूछें: "यह वाक्य आपके दावे को *कैसे* सिद्ध करता है?', '\'क्या\' नहीं, \'कैसे\' बताओ।" — जब तक वह **Explanation** न लिख दे, आगे न बढ़ें। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु पाठ के वाचन के बाद छात्रों के मौखिक विचारों को संरचित.',
          hint: 'यदि फंसें तो c11_hin_ar_cbse_02_006 (मुख्य विषय और संदेश) की समीक्षा करें, जिसमें पाठ.',
          misconception: 'छात्र अक्सर मानते हैं कि चर्चा-बिंदु में केवल पाठ का सारांश देना या अपने विचार बिना किसी आधार के बताना पर्याप्त है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु पाठ के वाचन के बाद छात्रों के मौखिक विचारों को संरचित ढंग से',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु पाठ के वाचन के बाद छात्रों के मौखिक विचारों को संरचित ढंग से', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि फंसें तो c11_hin_ar_cbse_02_006 (मुख्य विषय और संदेश) की समीक्षा करें, जिसमें पाठ के核心思想 को.',
                  misconception: 'छात्र अक्सर मानते हैं कि चर्चा-बिंदु में केवल पाठ का सारांश देना या अपने विचार बिना किसी आधार के बताना पर्याप्त है, जैसे कहना "मुझे लगता है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "अपने विचार को दो हिस्सों में बाँटें: पहले पाठ से एक具体例子 बताएं (जैसे \'पाठ में मुख्य पात्र ने सुबह 4 बजे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
