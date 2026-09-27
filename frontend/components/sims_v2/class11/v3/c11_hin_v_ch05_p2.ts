import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch05_p2: SimDef = {
    id: 'v3_c11_hin_v_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'Read Rajasthani folk tales as a people\'s archive of honour codes.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c11_hin_v_ch05'],
    nodeIds: ['c11_hin_v_cbse_05_007', 'c11_hin_v_cbse_05_008', 'c11_hin_v_cbse_05_009', 'c11_hin_v_cbse_05_010', 'c11_hin_v_cbse_05_011', 'c11_hin_v_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archivist cross-checking ballads against records', intro: 'Desert kingdoms, bards, and sacrifices that look irrational — until you learn the code they\'re written in.', goal: 'Decode the cultural rules inside Rajasthani folk narratives and analyse their non-linear structure.' },
    discovery: {
        question: 'A Rajput tale has a widow choose jauhar and a steward bankrupt himself for his lord — madness, or a code you\'re missing?',
        options: ['A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour', 'Madness — no rational person chooses death', 'A code — but only kings followed it', 'Madness — folk tales aren\'t bound by logic'],
        answer: 'A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour',
        hook: 'Vishnu Prabhakar worked the Rajasthan State Archives for decades — these aren\'t fairy tales but itihaas, history as the people witnessed it.',
    },
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: 'गौण विषय (Sub-theme/Minor Theme) वह द्वितीयक केंद्रीय विचार या प्रसंग है जो रचना के मुख्य विषय (Main Theme) के समानांतर चलता हुआ, उसे विस्तार, गहराई, विरोधाभास या संदर्भ प्रदान करता है और रचना के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match archival motifs (jauhar, sakha, bhamashah) to the folk narratives, then weigh why the story\'s trauma stays unresolved at the end.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_010', title: 'पाठ 5 — पदावली: मुख्य शब्द',
          caseStudy: { intro: 'Have you ever noticed how in your grandmother\'s kitchen, she doesn\'t just say "cook the dal" but says "दाल में *बघार* लगाओ" — that single word "बघार" carries.',
            decisions: [{ prompt: '"पदावली: मुख्य शब्द" की परिभाषा देते हुए स्पष्ट कीजिए कि यह सामान्य \'कठिन शब्द\' या \'अधिक प्रयुक्त शब्द\' से किस प्रकार भिन्न है?', options: [
                { text: '**Correct Answer:** मुख्य शब्द वे शब्द हैं जो पाठ के केन्द्रीय विषय, भावभूमि और विचारधारा', outcome: '**Correct Answer:** मुख्य शब्द वे शब्द हैं जो पाठ के केन्द्रीय विषय, भावभूमि और विचारधारा को वहन.' },
                { text: 'difficult words', outcome: 'Not quite — **Specific Error:** Students believe that "मुख्य शब्द" = **words that appear in the textbook\'s.', reveals: 'specific-error-students-believe-that' },
                { text: 'दुष्कर', outcome: 'Not quite — **Specific Error:** Students believe that "मुख्य शब्द" = **words that appear in the textbook\'s.', reveals: 'specific-error-students-believe-that' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your history club presents Vishnu Prabhakar\'s \'Rajasthan ki Jatir Kahaniyan\'. A member dismisses the folk narratives: \'Oral tales aren\'t real history — no dates, no documents, just bards embellishing. And the story jumps around in time, so it\'s badly organised.\'',
            decisions: [{ prompt: 'How do you defend both the form and the history?', options: [
                { text: 'Defend both: these narratives are \'itihaas\' — history as witnessed by the people — which is why Prabhakar, a historian-storyteller in the post-Independence recovery of subaltern histories, documented them; the Rajasthani-infused language carries cultural codes a document can\'t. And the non-linearity is design: time-shifts reveal the protagonist\'s trauma gradually — the climax is an internal realisation, not an external event.', outcome: 'The club reframes: oral tradition is an archive with its own grammar, and the scrambled chronology is how the story performs memory rather than reports it.' },
                { text: 'Concede — oral tales are entertainment; real history needs documents and dates.', outcome: 'That repeats the bias that erased subaltern experience: these tales preserve what archives ignored — the people\'s own witness.', reveals: 'oral-tales-arent-history' },
                { text: 'Rearrange the story chronologically for the presentation — linear order is clearer.', outcome: 'The non-linear order is the meaning: trauma surfaces in fragments; straightening it destroys the emotional architecture built by the flashbacks.', reveals: 'linearize-the-narrative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'The archive and the bard tell the same past in different inks — folk narrative is history that refused to be filed away.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme/Minor Theme) वह द्वितीयक केंद्रीय विचार या प्रसंग है जो.',
          hint: 'यदि मुख्य विषय स्पष्ट न हो, तो c11_hin_v_cbse_05_006 के \'WORKED_EXAMPLE_1\' को दोहराएं.',
          misconception: 'छात्र अक्सर गौण विषय को \'उपकथानक\' (sub-plot) या \'प्रसंगिक विवरण\' (incidental detail) समझ लेते हैं — वे सोचते हैं कि कोई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme/Minor Theme) वह द्वितीयक केंद्रीय विचार या प्रसंग है जो रचना के मुख्य',
                  options: ['गौण विषय (Sub-theme/Minor Theme) वह द्वितीयक केंद्रीय विचार या प्रसंग है जो रचना के मुख्य', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक'],
                  hint: 'यदि मुख्य विषय स्पष्ट न हो, तो c11_hin_v_cbse_05_006 के \'WORKED_EXAMPLE_1\' को दोहराएं जहां मुख्य.',
                  misconception: 'छात्र अक्सर गौण विषय को \'उपकथानक\' (sub-plot) या \'प्रसंगिक विवरण\' (incidental detail) समझ लेते हैं — वे सोचते हैं कि कोई भी छोटी घटना या.' }
          ],
            remediations: { 'sub-plot-incidental-detail': { steps: ['चरण 1: छात्र से कहें — "पाठ के 5 मुख्य प्रसंग लिखो जो तुम्हें याद हैं।" चरण 2: प्रत्येक प्रसंग के आगे लिखवाएं — "इस.', '(घटना नहीं, विचार — जैसे: \'विश्वासघात\', \'आशा\', \'पलायन\')।" चरण 3: अब मुख्य विषय (पिछले नोड से) लिखवाएं और पूछें: "कौन-से.', 'कौन-से समानांतर चल रहे हैं?" चरण 4: समानांतर चलने वाले विचारों में से वे चुनें जो कम से कम दो बार उभरे हों — वही गौण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** साहित्यिक युक्ति है जिसमें लेखक इंद्रिय-अनुभवों (दृश्य.',
          hint: 'यदि अटके तो **c11_hin_v_cbse_05_006 (मुख्य विषय और संदेश)** पर लौटें — विषय के 3-4.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर समझते हैं कि **रूपक केवल \'सजावट\' या \'सुंदरता\' के लिए होता है** — जैसे "आँखें झील हैं".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** साहित्यिक युक्ति है जिसमें लेखक इंद्रिय-अनुभवों (दृश्य, श्रवण, घ्राण,',
                  options: ['**बिंब (Imagery)** साहित्यिक युक्ति है जिसमें लेखक इंद्रिय-अनुभवों (दृश्य, श्रवण, घ्राण,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_05_006 (मुख्य विषय और संदेश)** पर लौटें — विषय के 3-4 की-वर्ड लिखें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर समझते हैं कि **रूपक केवल \'सजावट\' या \'सुंदरता\' के लिए होता है** — जैसे "आँखें झील हैं" केवल काव्यात्मक.' }
          ],
            remediations: { 'conceptualization': { steps: ['**चरण 1:** छात्र से कहें — "किसी भी रूपक को लो (जैसे \'क्रोध आग है\') और **पाँच वाक्य** लिखो जो *केवल* रूपक के आधार पर.', '**चरण 2:** उसी रूपक को **उपमा** में बदलें ("क्रोध आग *जैसा* है") और पूछें — "कौन-से वाक्य अब अस्वाभाविक लगते हैं?".', '**चरण 3:** पाठ से एक रूपक लेकर **उपमेय-उपमान मैपिंग टेबल** बनवाएँ (स्तंभ: उपमान का गुण → उपमेय पर प्रभाव) — बोर्ड उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन जो पहली नज़र में असंगत या आत्म-विरोधी लगता.',
          hint: 'यदि अटके तो **c11_hin_v_cbse_05_008 (बिंब और रूपक)** के कार्यित उदाहरण (worked examples).',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **हर असंगत वाक्य विरोधाभास है** और **हर संज्ञा प्रतीक है**। **गलत तर्क का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन जो पहली नज़र में असंगत या आत्म-विरोधी लगता है, लेकिन',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन जो पहली नज़र में असंगत या आत्म-विरोधी लगता है, लेकिन', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_05_008 (बिंब और रूपक)** के कार्यित उदाहरण (worked examples) दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **हर असंगत वाक्य विरोधाभास है** और **हर संज्ञा प्रतीक है**। **गलत तर्क का उदाहरण:** "वह रोता हुआ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "पाठ से कोई 3 वाक्य छाँटो जो तुम्हें \'अजीब\' या \'उल्टे\' लगें। प्रत्येक के लिए लिखो: (क).', '(ख) रचनाकार क्या कहना चाहता है?', '(ग) क्या यह बात सीधी कही जा सकती थी?', 'क्यों नहीं?" — इससे विरोधाभास की **\'कथन-स्तरीय तनाव → गहन सत्य\' प्रक्रिया** स्पष्ट होगी। **चरण 2:** पाठ में आई 5 ठोस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द (Key Vocabulary/Lexical Items) refers to the **curated set.',
          hint: 'If stuck, review **\'भावार्थ और लक्षणा\' (Connotation and Suggested Meaning)** from Class.',
          misconception: '**Specific Error:** Students believe that "मुख्य शब्द" = **words that appear in the textbook\'s "शब्दार्थ" (glossary).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द (Key Vocabulary/Lexical Items) refers to the **curated set of',
                  options: ['पदावली: मुख्य शब्द (Key Vocabulary/Lexical Items) refers to the **curated set of', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक'],
                  hint: 'If stuck, review **\'भावार्थ और लक्षणा\' (Connotation and Suggested Meaning)** from Class 10 Hindi.',
                  misconception: '**Specific Error:** Students believe that "मुख्य शब्द" = **words that appear in the textbook\'s "शब्दार्थ" (glossary) box** or **words the.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Targeted Remediation (4 Steps):** 1.', '**De-glossary Drill:** Give a 100-word unseen passage *without* a glossary.', 'Ask: "Circle 5 words that, if removed, would make the passage meaningless / change its core argument." Compare circles.', '**Morphological Expansion Exercise:** Take ONE candidate word (e.g., "याद").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students believe that "मुख्य शब्द" = **words that appear in the textbook\'s "शब्दार्थ" (glossary).',
          parts: [
                { id: 'a', prompt: 'कक्षा 11 की बोर्ड परीक्षा में एक प्रश्न आया: "पाठ \'पदावली\' के किन्हीं तीन मुख्य शब्दों का चयन कर उनके माध्यम से पाठ के केन्द्रीय भाव की व्याख्या कीजिए।" एक.', answer: '**Correct Answer & Critique:** **कमियाँ:** (1) **चयन का औचित्य नहीं**',
                  options: ['**Correct Answer & Critique:** **कमियाँ:** (1) **चयन का औचित्य नहीं**', 'विषय जीवन-मरण का संघर्ष है', '**E (Evidence):**', '**E (Explanation):**'],
                  hint: 'If stuck, review **\'भावार्थ और लक्षणा\' (Connotation and Suggested Meaning)** from Class 10 Hindi.',
                  misconception: '**Specific Error:** Students believe that "मुख्य शब्द" = **words that appear in the textbook\'s "शब्दार्थ" (glossary) box** or **words the.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Targeted Remediation (4 Steps):** 1.', '**De-glossary Drill:** Give a 100-word unseen passage *without* a glossary.', 'Ask: "Circle 5 words that, if removed, would make the passage meaningless / change its core argument." Compare circles.', '**Morphological Expansion Exercise:** Take ONE candidate word (e.g., "याद").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है — रचनाकार द्वारा शब्दों, वाक्य-संरचना, मुहावरों.',
          hint: 'यदि फँसें तो c11_hin_v_cbse_05_010 (पदावली: मुख्य शब्द) के \'शब्द-श्रेणी पहचान\' अभ्यास.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'अच्छी भाषा\' = \'शुद्ध मानक हिंदी + अलंकारों की भरमार\'। **वास्तविकता**: पाठ 5.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक'],
                  hint: 'यदि फँसें तो c11_hin_v_cbse_05_010 (पदावली: मुख्य शब्द) के \'शब्द-श्रेणी पहचान\' अभ्यास दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'अच्छी भाषा\' = \'शुद्ध मानक हिंदी + अलंकारों की भरमार\'। **वास्तविकता**: पाठ 5 में लेखक जान-बूझकर.' }
          ],
            remediations: { '5': { steps: ['**पहला कदम**: छात्र से कहें — "पाठ 5 के पृष्ठ X पर नायिका का वह संवाद पढ़ो जहाँ वह रोते-रोते बोलती है। उसमें व्याकरण की.', '**दूसरा कदम**: पूछें — "यही बात शुद्ध हिंदी में लिखो। अब दोनों पढ़ो — कौन-सा अधिक **मार्मिक** लगा?', '**तीसरा कदम**: समझाएँ — "लेखक ने त्रुटियाँ **जान-बूझकर** की हैं; इसे **शैलीगत विचलन** (stylistic deviation) कहते हैं।.', '**चौथा कदम**: छात्र से कहें — "अब पाठ के दो और प्रसंग ढूँढ़ो जहाँ लेखक ने व्याकरण तोड़ा हो और बताओ कौन-सा भाव उभारा गया.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका एक निश्चित, पाठ-आधारित.',
          hint: 'यदि अटके तो पहले नोड 006 (मुख्य विषय) और 008-009 (साहित्यिक युक्तियाँ) दोहराएँ — ये.',
          misconception: 'विद्यार्थी समझते हैं कि \'आशय-सूचक प्रश्न\' का अर्थ है "अपनी मनमर्जी की राय लिख दो" — इसलिए वे पाठ के साक्ष्य दिए बिना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका एक निश्चित, पाठ-आधारित उत्तर होता है',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका एक निश्चित, पाठ-आधारित उत्तर होता है', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'कथानक (Plot) घटनाओं का वह सार्थक और कारण-कार्यबद्ध (causal) क्रम है जो संघर्ष (conflict)', 'पाठ्य-परिवेश (Setting) कथा का वह त्रि-आयामी ढाँचा है जिसमें स्थान (भूगोल), काल (ऐतिहासिक'],
                  hint: 'यदि अटके तो पहले नोड 006 (मुख्य विषय) और 008-009 (साहित्यिक युक्तियाँ) दोहराएँ — ये आशय-सूचक.',
                  misconception: 'विद्यार्थी समझते हैं कि \'आशय-सूचक प्रश्न\' का अर्थ है "अपनी मनमर्जी की राय लिख दो" — इसलिए वे पाठ के साक्ष्य दिए बिना सामान्य ज्ञान या नैतिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: विद्यार्थी को एक छोटा अनुच्छेद दें और कहें — "केवल वही लिखो जो यहाँ लिखा है" (वस्तुनिष्ठ अभ्यास)। चरण 2: उसी.', 'पाठ से दो वाक्य उठाकर सिद्ध करो" (आशय-सूचक अभ्यास)। चरण 3: उसके उत्तर में \'साक्ष्य\' और \'व्याख्या\' अलग-अलग रंग से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
