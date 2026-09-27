import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch15_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch15_p2: SimDef = {
    id: 'v3_c12_hin_a_ch15_p2',
    title: 'जहाँ कोई वापसी नहीं · Part 2/3',
    subtitle: 'The survey line was straight; the damage wasn\'t',
    classLevel: 12, subject: 'hin_a', topic: 'जहाँ कोई वापसी नहीं · Part 2/3',
    chapters: ['c12_hin_a_ch15'],
    nodeIds: ['c12_hin_a_cbse_15_007', 'c12_hin_a_cbse_15_008', 'c12_hin_a_cbse_15_009', 'c12_hin_a_cbse_15_010', 'c12_hin_a_cbse_15_011', 'c12_hin_a_cbse_15_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Displacement-narrative reader', intro: 'A dam was drawn on a map; a hundred villages learned they lived inside a line.', goal: 'Read Tedhi Lakeer through development-induced displacement and Renu\'s reportage-fiction method.' },
    discovery: {
        question: 'A surveyor draws a straight red line for a dam across tribal land — on the earth it becomes a crooked scar. Why did Renu name the story \'The Crooked Line\'?',
        options: ['The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth', 'The terrain was hilly', 'Surveyors make mistakes', 'A meandering river'],
        answer: 'The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth',
        hook: 'This is reportage-fiction about a real wound — the Koel-Karo project threatening 120+ villages. Renu captures the pre-movement moment: resistance raw and leaderless, dismissed as backwardness before it could become an Andolan. The deepest irony — the democratic state itself ran the displacement.',
    },
    teaching: [
        { title: 'जहाँ कोई वापसी नहीं — गौण विषय', text: 'गौण विषय वह अवधारणा है जो मुख्य विषय के साथ चलते हुए एक स्वतंत्र संदेश प्रदान करती है, पात्रों की छोटी कार्रवाइयों, पृष्ठभूमि की घटनाओं या संवादों के माध्यम से व्यक्त होती है और मुख्य कथानक को समृद्ध.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_15_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the Chotanagpur hills before the dam: weigh whose \'development\' submerges whom, compare raw tribal refusal with organised protest, and decode the crooked line\'s triple meaning.',
        labels: ['जहाँ कोई वापसी नहीं'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a piece on your hometown\'s transformation — the river now a drain, fields under a factory — your editor wants it chronological: \'village past, then highway, then industry, then today.\'',
            decisions: [{ prompt: 'What structure does Renu\'s \'जहाँ कोई वापसी नहीं\' use instead, and why?', options: [
                { text: 'Open in the damaged present, then break into flashes of the lost past with your own commentary between them — the fragmented telling enacts the severed bond between people and land, making the reader live the loss rather than read a progress report.', outcome: 'The chapter\'s point: a linear telling makes change look like neutral sequence; the non-linear juxtaposition of what is against what was is where the critique lives.' },
                { text: 'Go chronological — \'village → factory\' order keeps the article clear and fair to both sides.', outcome: 'Chronology launders the verdict into inevitability; the story opens with the polluted present precisely so the reader enters with the damage already done — \'fair\' sequencing is how loss gets normalised.', reveals: 'chronology-is-neutral' },
                { text: 'Skip the past entirely and report only today\'s conditions — nostalgia is bias.', outcome: 'Without the remembered village the present has no baseline; the story\'s commentary works because the reader holds both timeframes at once — past-only is romance, present-only is bookkeeping.', reveals: 'past-is-bias' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a dam story as an invoice for the city\'s electricity — paid in forests, rivers and a people\'s memory.',
            decisions: [{ prompt: 'What comes next? जहाँ कोई वापसी नहीं · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — जहाँ कोई वापसी नहीं · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_007', difficulty: 'standard',
          question: 'गौण विषय वह अवधारणा है जो मुख्य विषय के साथ चलते हुए एक स्वतंत्र संदेश प्रदान.',
          hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो तो c12_hin_a_cbse_15_006 नोड पर वापस जाएँ जहाँ.',
          misconception: 'छात्र अक्सर गौण विषय को बस "मुख्य विषय का एक उदाहरण" मान लेते हैं, जैसे कि यदि मुख्य विषय "त्याग" है तो वे किसी भी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वह अवधारणा है जो मुख्य विषय के साथ चलते हुए एक स्वतंत्र संदेश प्रदान करती है,',
                  options: ['गौण विषय वह अवधारणा है जो मुख्य विषय के साथ चलते हुए एक स्वतंत्र संदेश प्रदान करती है,', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो तो c12_hin_a_cbse_15_006 नोड पर वापस जाएँ जहाँ मुख्य विषय के.',
                  misconception: 'छात्र अक्सर गौण विषय को बस "मुख्य विषय का एक उदाहरण" मान लेते हैं, जैसे कि यदि मुख्य विषय "त्याग" है तो वे किसी भी त्याग की घटना को गौण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस गलती को सुधारने के लिए, छात्र को मुख्य विषय और गौण विषय की दो अलग-अलग सूचियाँ बनाने को कहें: मुख्य विषय के लिए वे वे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_008', difficulty: 'standard',
          question: 'बिंब वह मन में बनने वाली स्पष्ट चित्र है जो शब्दों के माध्यम से संवेदना को.',
          hint: 'यदि छात्र फंस जाए तो उसे Class 11 के किसी भी पाठ में बिंब और रूपक के आधारभूत पहचान.',
          misconception: 'छात्र अक्सर बिंब और रूपक को केवल भाषा का सजावटी तत्व मानते हैं, सोचते हैं कि इनका उद्देश्य केवल वाक्य को काव्यात्मक या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह मन में बनने वाली स्पष्ट चित्र है जो शब्दों के माध्यम से संवेदना को जीवंत बनाता',
                  options: ['बिंब वह मन में बनने वाली स्पष्ट चित्र है जो शब्दों के माध्यम से संवेदना को जीवंत बनाता', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि छात्र फंस जाए तो उसे Class 11 के किसी भी पाठ में बिंब और रूपक के आधारभूत पहचान.',
                  misconception: 'छात्र अक्सर बिंब और रूपक को केवल भाषा का सजावटी तत्व मानते हैं, सोचते हैं कि इनका उद्देश्य केवल वाक्य को काव्यात्मक या आकर्षक बनाना है। इस.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वह अपने पसंदीदा फिल्म के एक सीन को याद करके बताए कि उस सीन में क्या दिखाया गया था जो उसे भावनात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_009', difficulty: 'standard',
          question: 'विरोधाभास एक साहित्यिक युक्ति है जिसमें वास्तविक परिणाम या स्थिति अपेक्षित.',
          hint: 'यदि फंसे हुए महसूस हो तो कक्षा 11 के किसी भी पाठ में विरोधाभास के उदाहरण (जैसे.',
          misconception: 'छात्र अक्सर विरोधाभास को केवल वाक्य में दो विपरीत शब्दों के उपयोग (जैसे \'धूपandi छाया\') के रूप में समझते हैं, जबकि असल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास एक साहित्यिक युक्ति है जिसमें वास्तविक परिणाम या स्थिति अपेक्षित परिणाम से',
                  options: ['विरोधाभास एक साहित्यिक युक्ति है जिसमें वास्तविक परिणाम या स्थिति अपेक्षित परिणाम से', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि फंसे हुए महसूस हो तो कक्षा 11 के किसी भी पाठ में विरोधाभास के उदाहरण (जैसे.',
                  misconception: 'छात्र अक्सर विरोधाभास को केवल वाक्य में दो विपरीत शब्दों के उपयोग (जैसे \'धूपandi छाया\') के रूप में समझते हैं, जबकि असल में विरोधाभास.' }
          ],
            remediations: { 'andi': { steps: ['छात्र को दो वाक्य दीजिए: एक में स्पष्ट विपरीत शब्द (उदाहरण: \'वह खुश थी लेकिन उदास थी\') और एक में स्थितिगत विरोधाभास.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_010', difficulty: 'standard',
          question: '\'पदावली: मुख्य शब्द\' किसी साहित्यिक कृति में प्रयुक्त उन **महत्वपूर्ण.',
          hint: 'यदि फँस जाएँ, तो **c12_hin_a_cbse_15_003 (पाठ्य-परिवेश और वातावरण)** व.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'पदावली: मुख्य शब्द\' का अर्थ केवल \'कठिन शब्दों के अर्थ लिखना\' (Glossary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पदावली: मुख्य शब्द\' किसी साहित्यिक कृति में प्रयुक्त उन **महत्वपूर्ण शब्दों/पदों का',
                  options: ['\'पदावली: मुख्य शब्द\' किसी साहित्यिक कृति में प्रयुक्त उन **महत्वपूर्ण शब्दों/पदों का', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि फँस जाएँ, तो **c12_hin_a_cbse_15_003 (पाठ्य-परिवेश और वातावरण)** व **c12_hin_a_cbse_15_006.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'पदावली: मुख्य शब्द\' का अर्थ केवल \'कठिन शब्दों के अर्थ लिखना\' (Glossary making)** है।.' }
          ],
            remediations: { 'glossary-making-connotations': { steps: ['**पुनः पाठ-पठन (Re-reading):** छात्र से कहें — **"पाठ के केवल वे 3 अनुच्छेद पढ़ो जहाँ \'वापसी\', \'जड़ें\', \'अजनबीयत\' आए.', '**द्वि-स्तरीय सारणी (Two-column Table):** एक कॉलम में **\'शब्दकोशीय अर्थ\'**, दूसरे में **\'कहानी में अर्थ\'** लिखवाएँ।.', '**प्रतिस्थापन परीक्षण (Substitution Test):** पूछें — **"अगर लेखक \'वापसी\' की जगह \'लौटना\' लिख देता, तो क्या फर्क.', '**पुनः निदान (Re-diagnostic):** **Diagnostic Question 2** फिर से पूछें — अब छात्र **प्रसंगानुकूल अर्थ** पाठ-आधारित तर्क.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग वह विश्लेषण है जिसमें हम देखते हैं कि लेखक ने वाक्य रचना.',
          hint: 'यदि छात्र फंसे तो उसे पाठ के मुख्य विषय (c12_hin_a_cbse_15_006) और पात्र-चित्रण.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि किसी वाक्य में अल्पविराम बढ़ गया है, तो इसका मतलब हमेशा है कि पात्र हिचकिचा रहा है या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग वह विश्लेषण है जिसमें हम देखते हैं कि लेखक ने वाक्य रचना, विराम',
                  options: ['पाठ में भाषा-प्रयोग वह विश्लेषण है जिसमें हम देखते हैं कि लेखक ने वाक्य रचना, विराम', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि छात्र फंसे तो उसे पाठ के मुख्य विषय (c12_hin_a_cbse_15_006) और पात्र-चित्रण.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि किसी वाक्य में अल्पविराम बढ़ गया है, तो इसका मतलब हमेशा है कि पात्र हिचकिचा रहा है या अनिश्चित है। यह गलत है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि अल्पविराम के दो मुख्य उपयोग हैं: (1) विराम देना (जैसे "वह थक गई थी, फिर भी वह चली") और (2) सूची या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_012', difficulty: 'standard',
          question: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वे प्रश्न हैं जो पाठ की सत्यात्मक जानकारी.',
          hint: 'यदि छ metáforा पहचानने में फंस जाए, तो c12_hin_a_cbse_15_008 (साहित्यिक युक्तियाँ: बिंब.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर देते समय कविता की पंक्तियों को शाब्दिक रूप से लेते हैं और metáforा या प्रतीकवाद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वे प्रश्न हैं जो पाठ की सत्यात्मक जानकारी (वस्तुनिष्ठ)',
                  options: ['बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वे प्रश्न हैं जो पाठ की सत्यात्मक जानकारी (वस्तुनिष्ठ)', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि छ metáforा पहचानने में फंस जाए, तो c12_hin_a_cbse_15_008 (साहित्यिक युक्तियाँ: बिंब और रूपक) पर.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर देते समय कविता की पंक्तियों को शाब्दिक रूप से लेते हैं और metáforा या प्रतीकवाद की पहचान करने में.' }
          ],
            remediations: { 'met-for': { steps: ['छात्र को पंक्ति "मिट्टी से मैं बोल रहा हूँ" दिखाकर पूछें: "यदि मिट्टी सचमुच बोल रही होती, तो क्या यह कविता के शोकपूर्ण.', 'नहीं — क्योंकि बोलती मिट्टी अजीब लगती है, न कि दुखद। अब पूछें: \'किसकी आवाज़ यहाँ खोई हुई लग रही है?\' इससे उन्हें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
