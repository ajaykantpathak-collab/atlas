import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch10_p2: SimDef = {
    id: 'v3_c12_hin_a_ch10_p2',
    title: 'प्रेमघन की छाया-स्मृति · Part 2/3',
    subtitle: 'The dictionary was also a freedom struggle',
    classLevel: 12, subject: 'hin_a', topic: 'प्रेमघन की छाया-स्मृति · Part 2/3',
    chapters: ['c12_hin_a_ch10'],
    nodeIds: ['c12_hin_a_cbse_10_007', 'c12_hin_a_cbse_10_008', 'c12_hin_a_cbse_10_009', 'c12_hin_a_cbse_10_010', 'c12_hin_a_cbse_10_011', 'c12_hin_a_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary-historical reader', intro: 'A Chhayavad pillar writes a story where making a dictionary is an act of nation-making.', goal: 'Read Prasad\'s story through his linguistic mission — Hindi\'s professionalisation as cultural nationalism.' },
    discovery: {
        question: 'During Non-Cooperation, a lexicographer building a Hindi dictionary could seem a distraction from the freedom fight. Why did Prasad treat it as the fight?',
        options: ['Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott', 'He was apolitical', 'Dictionaries were fashionable', 'Politics bored him'],
        answer: 'Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott',
        hook: 'Prasad\'s story grows from lived ground — his father\'s salon hosted Bharatendu-era greats, but the new circle is journalists, editors and lexicographers earning livelihoods in Hindi: literature shifting from patronage to profession. Chhayavad\'s \'new form\' was engineered through the dictionary as much as through verse.',
    },
    teaching: [
        { title: 'प्रेमघन की छाया-स्मृति — गौण विषय', text: 'गौण विषय वे अंतर्निहित विचार या संदेश होते हैं जो मुख्य विषय के साथ-साथ उपस्थित होते हैं, जो मुख्य कथानक को समृद्ध करते हैं, पात्रों के आंतरिक संघर्ष को उजागर करते हैं, और सामाजिक या मानवीय सत्यों को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the Prayagraj circle of the 1920s: weigh dictionary-making as nationalism, watch literary culture move from royal patrons to professional writers, and trace a life into a story.',
        labels: ['प्रेमघन की छाया-स्मृति —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c12_hin_a_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'प्रेमघन की छाया-स्मृति · Part 2/3', spots: [
            { id: 's1', label: '- -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग से तात्पर्य उन शब्दों, वाक्य संरचनाओं, अलंकारों और शैलीगत चयनों से है.', answer: '- -', options: ['- -', '- - -'] },
            { id: 's2', label: '- - -', prompt: 'Which idea is this? — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वह कौशल है जिसमें छात्र पाठ के स्पष्ट तथ्यों को याद.', answer: '- - -', options: ['- - -', '- -'] }
          ] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college-application mentor tells you to write your \'how I became a writer\' essay as a clean chronology: class 8, class 9, class 10. Your actual formation is messier — a grandfather\'s bookshelf, one teacher, a literary evening that changed everything.',
            decisions: [{ prompt: 'What would the narrative architecture of Kaka Kalelkar\'s memoir chapter say?', options: [
                { text: 'Order it by meaning, not calendar — the chapter moves associatively, putting the defining meeting before the childhood roots so the reader grasps the destination\'s significance before the narrator did; thematic juxtaposition, not chronology, carries \'the making of a writer.\'', outcome: 'The memoir\'s non-linearity mimics how formation actually works — memory is thematic; the gap between life\'s order and the text\'s order is where the portrait lives.' },
                { text: 'Follow the mentor — admissions readers need a clear timeline, and fragments read as carelessness.', outcome: 'The chapter treats fragmentation as design, not disorder — the juxtapositions (classical father vs living literary circle) show formation as contrast and encounter, which a calendar march can\'t perform.', reveals: 'chronology-equals-clarity' },
                { text: 'Drop the formative anecdotes entirely and just state \'I became a writer through reading.\'', outcome: 'The memoir\'s anecdotes aren\'t decoration — the father\'s library and the unknowing visit to Dwivedi\'s house are the evidence the claim needs; assertion without them is a résumé line, not a formation story.', reveals: 'summary-beats-scene' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a lexicographer\'s tale as freedom work — and see how a language was built word by deliberate word.',
            decisions: [{ prompt: 'What comes next? प्रेमघन की छाया-स्मृति · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — प्रेमघन की छाया-स्मृति · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_007', difficulty: 'standard',
          question: 'गौण विषय वे अंतर्निहित विचार या संदेश होते हैं जो मुख्य विषय के साथ-साथ उपस्थित.',
          hint: 'यदि छात्र मुख्य विषय को स्पष्ट रूप से नहीं पहचान पा रहा है, तो c12_hin_a_cbse_10_006.',
          misconception: 'छात्र अक्सर गौण विषयों को केवल कहानी में आने वाले छोटे-छोटे घटनाक्रमों (जैसे कि किसी पात्र का रोना, कोई बातचीत) के रूप.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वे अंतर्निहित विचार या संदेश होते हैं जो मुख्य विषय के साथ-साथ उपस्थित होते हैं,',
                  options: ['गौण विषय वे अंतर्निहित विचार या संदेश होते हैं जो मुख्य विषय के साथ-साथ उपस्थित होते हैं,', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि छात्र मुख्य विषय को स्पष्ट रूप से नहीं पहचान पा रहा है, तो c12_hin_a_cbse_10_006 (मुख्य विषय और.',
                  misconception: 'छात्र अक्सर गौण विषयों को केवल कहानी में आने वाले छोटे-छोटे घटनाक्रमों (जैसे कि किसी पात्र का रोना, कोई बातचीत) के रूप में देखते हैं, बिना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले पाठ से तीन ऐसे क्षण चुनने के लिए कहिए जो भावनात्मक रूप से मजबूत लगे हों — फिर प्रत्येक क्षण के लिए.', 'क्या यह घटना दोहराई गई है?', 'क्या यह मुख्य प्रेम के त्याग के विषय को समझाने में मदद करती है?" यदि छात्र केवल घटना का वर्णन करता है, तो उसे बताइए कि.', 'क्या यह उसके त्याग के निर्णय को दर्शाता है या बस एक प्रतिक्रिया है?" इससे वह घटना से विषय की ओर सोचना सीखेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_008', difficulty: 'standard',
          question: 'बिंब वह संक्षिप्त, संवेदनशील चित्र है जो कविता में किसी भावना, विचार या अनुभव.',
          hint: 'यदि बिंब के भावनात्मक अर्थ को समझने में कठिनाई हो, तो कक्षा 11 के c11_hin_a_cbse_01_008.',
          misconception: 'छात्र अक्सर मानते हैं कि बिंब का अर्थ सार्वभौमिक और स्थिर होता है—जैसे कि "पेड़ हमेशा जीवन का प्रतीक है" या "छाया हमेशा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह संक्षिप्त, संवेदनशील चित्र है जो कविता में किसी भावना, विचार या अनुभव को सीधे',
                  options: ['बिंब वह संक्षिप्त, संवेदनशील चित्र है जो कविता में किसी भावना, विचार या अनुभव को सीधे', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि बिंब के भावनात्मक अर्थ को समझने में कठिनाई हो, तो कक्षा 11 के c11_hin_a_cbse_01_008 और.',
                  misconception: 'छात्र अक्सर मानते हैं कि बिंब का अर्थ सार्वभौमिक और स्थिर होता है—जैसे कि "पेड़ हमेशा जीवन का प्रतीक है" या "छाया हमेशा आशा का प्रतीक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले दो वाक्य दिजिए: "पेड़ की छाया में बैठना अच्छा लगता है" और "घर की खाली छाया में अकेलापन महसूस होता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_009', difficulty: 'standard',
          question: 'विरोधाभास वहliterary युक्ति है जिसमें दो विपरीत या असंगत विचार एक साथ रखे जाते.',
          hint: 'यदि छात्र इन युक्तियों को पहचानने में भ्रमित है, तो कक्षा 11 के किसी भी पाठ के नोड.',
          misconception: 'छात्र अक्सर विरोधाभास और प्रतीक को एक ही मान लेते हैं और किसी भी विपरीत चित्रण को प्रतीक कह देते हैं (जैसे "लाल गुलाब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास वहliterary युक्ति है जिसमें दो विपरीत या असंगत विचार एक साथ रखे जाते हैं ताकि',
                  options: ['विरोधाभास वहliterary युक्ति है जिसमें दो विपरीत या असंगत विचार एक साथ रखे जाते हैं ताकि', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि छात्र इन युक्तियों को पहचानने में भ्रमित है, तो कक्षा 11 के किसी भी पाठ के नोड.',
                  misconception: 'छात्र अक्सर विरोधाभास और प्रतीक को एक ही मान लेते हैं और किसी भी विपरीत चित्रण को प्रतीक कह देते हैं (जैसे "लाल गुलाब = प्रेमी का प्रतीक".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए कि वह पहले वाक्य पढ़े और पूछे: "क्या यहाँ दो शब्द ऐसे हैं जिनके अर्थ एक-दूसरे को नकार रहे हैं?" यदि हाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_010', difficulty: 'standard',
          question: 'पदावली (vocabulary/key terms) refers to the specific set of Braj Bhasha and.',
          hint: 'If stuck on contextual meaning → revisit Class 11 पदावली nodes (c11_hin_a_cbse_10_010.',
          misconception: 'Students treat पदावली as a "difficult word list" to memorize for MCQs — they write dictionary meanings (e.g., छाया.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (vocabulary/key terms) refers to the specific set of Braj Bhasha and Awadhi words,',
                  options: ['पदावली (vocabulary/key terms) refers to the specific set of Braj Bhasha and Awadhi words,', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'If stuck on contextual meaning → revisit Class 11 पदावली nodes (c11_hin_a_cbse_10_010.',
                  misconception: 'Students treat पदावली as a "difficult word list" to memorize for MCQs — they write dictionary meanings (e.g., छाया = shadow) and miss the.' }
          ],
            remediations: { 'students-treat-as-a-difficult': { steps: ['Take the text and highlight every word you\'d struggle to explain to a Class 10 student.', 'For each, check Monier-Williams Sanskrit dictionary (for tatsama) and Platts Hindi dictionary (for tadbhava) — note the.', 'Read any standard Bhakti poetry anthology (e.g., NCERT Class 11 "हिंदी आरोह" Chapter 10-12 पदावली nodes.', 'Re-read प्रेमघन with this convention-lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग से तात्पर्य उन शब्दों, वाक्य संरचनाओं, अलंकारों और शैलीगत.',
          hint: 'यदि फंसे हों तो Class 11 के किसी भी पाठ के \'व्याकरण: पाठ में भाषा-प्रयोग\' नोड (जैसे.',
          misconception: 'छात्र अक्सर मानते हैं कि भाषा-प्रयोग का अर्थ केवल कठिन शब्दों या अलंकारों की पहचान करना है — जैसे कि वे \'रूपक\' या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग से तात्पर्य उन शब्दों, वाक्य संरचनाओं, अलंकारों और शैलीगत चयनों से है',
                  options: ['पाठ में भाषा-प्रयोग से तात्पर्य उन शब्दों, वाक्य संरचनाओं, अलंकारों और शैलीगत चयनों से है', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि फंसे हों तो Class 11 के किसी भी पाठ के \'व्याकरण: पाठ में भाषा-प्रयोग\' नोड (जैसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि भाषा-प्रयोग का अर्थ केवल कठिन शब्दों या अलंकारों की पहचान करना है — जैसे कि वे \'रूपक\' या \'अनुप्रास\' जैसे शब्दों को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले पाठ से पाँच ऐसे वाक्य चुनने को कहिए जहाँ शब्द दोहराए गए हों या विशेषण असामान्य हों (जैसे "तपती धूप".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_012', difficulty: 'standard',
          question: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वह कौशल है जिसमें छात्र पाठ के स्पष्ट तथ्यों.',
          hint: 'यदि फंसें तो कक्षा 11 के बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक नोड (c11_hin_a_cbse_10_012).',
          misconception: 'छात्र अक्सर सोचते हैं कि आशय-सूचक प्रश्नों के लिए पाठ में सीधे लिखे गए वाक्यों की पुनरावृत्ति पर्याप्त है, जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वह कौशल है जिसमें छात्र पाठ के स्पष्ट तथ्यों को याद',
                  options: ['बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वह कौशल है जिसमें छात्र पाठ के स्पष्ट तथ्यों को याद', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि फंसें तो कक्षा 11 के बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक नोड (c11_hin_a_cbse_10_012) की दोबारा.',
                  misconception: 'छात्र अक्सर सोचते हैं कि आशय-सूचक प्रश्नों के लिए पाठ में सीधे लिखे गए वाक्यों की पुनरावृत्ति पर्याप्त है, जैसे "प्रेमघन उदासीन था" लिखकर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि प्रेमघन की चुप्पी, उसके काम न करना, और घर की ओर देखना लेकिन न जाना - ये तीन व्यवहार एक साथ उदासीनता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
