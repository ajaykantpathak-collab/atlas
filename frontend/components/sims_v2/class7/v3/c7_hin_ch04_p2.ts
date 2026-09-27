import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch04_p2: SimDef = {
    id: 'v3_c7_hin_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'This node covers identification, evidence-based analysis, and thematic linking.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c7_hin_ch04'],
    nodeIds: ['c7_hin_cbse_04_007', 'c7_hin_cbse_04_008', 'c7_hin_cbse_04_009', 'c7_hin_cbse_04_010', 'c7_hin_cbse_04_011', 'c7_hin_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Think of a family dinner where everyone\'s talking about the main event — say, a cousin\'s wedding — but side.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — गौण विषय', text: 'गौण विषय (Sub-theme) refers to the secondary ideas, concerns, or motifs in a literary text that run parallel to the main theme, enriching it by adding layers of meaning, social context, or emotional.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — गौण', 'पाठ 4 — साहित्यिक', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 2/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दों, पदों, वाक्य-रचना, काल.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता है और.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) refers to the secondary ideas, concerns, or motifs in.',
          hint: 'If stuck, review **c7_hin_cbse_04_006 (मुख्य विषय और संदेश)** — specifically, practice.',
          misconception: 'Students confuse *gōṇ viṣay* (sub-theme) with *upakathā* (sub-plot) or *vivaraṇ* (description).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) refers to the secondary ideas, concerns, or motifs in a literary',
                  options: ['गौण विषय (Sub-theme) refers to the secondary ideas, concerns, or motifs in a literary', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'If stuck, review **c7_hin_cbse_04_006 (मुख्य विषय और संदेश)** — specifically, practice converting.',
                  misconception: 'Students confuse *gōṇ viṣay* (sub-theme) with *upakathā* (sub-plot) or *vivaraṇ* (description).' }
          ],
            remediations: { 'students-confuse-g-vi-ay': { steps: ['** Give the student a 3-column table: Column A = Recurring detail (e.g., "bullocks"), Column B = Abstract idea (e.g.', '** Ask them to fill Column B and C for 3 details from the text. 3. **', '** Show how Column C statements *connect* to the main theme — e.g., "This sub-theme shows the \'struggle\' part.', '** Have them write one paragraph explaining one sub-theme using: "The text shows [evidence] → This reveals [sub-theme].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक के मन.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 के पाठ 1, 4, 7, 10 के बिंब/रूपक अभ्यास.',
          misconception: 'छात्र **उपमा (Simile) और रूपक (Metaphor)** को एक ही समझ लेते हैं क्योंकि दोनों में \'तुलना\' होती है। वे \'जैसे/वैसे/समान\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक के मन में',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक के मन में', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 के पाठ 1, 4, 7, 10 के बिंब/रूपक अभ्यास (c6_hin_cbse_01_008.',
                  misconception: 'छात्र **उपमा (Simile) और रूपक (Metaphor)** को एक ही समझ लेते हैं क्योंकि दोनों में \'तुलना\' होती है। वे \'जैसे/वैसे/समान\' शब्दों को.' }
          ],
            remediations: { 'simile-metaphor': { steps: ['**चरण 1**: छात्र को दो वाक्य लिखने को दो — एक में \'जैसे\' का प्रयोग, दूसरे में बिना \'जैसे\' के उसी तुलना को। (उदाहरण.', '**चरण 2**: पूछो — "दूसरे वाक्य में क्या हुआ?', 'क्या चेहरा सचमुच चाँद बन गया?" — इस **अतार्किकता** पर चर्चा करो कि रूपक **भावात्मक सत्य** बोलता है, तथ्यात्मक नहीं। 3.', '**चरण 3**: तीन पंक्तियाँ दो जिनमें रूपक हो, छात्र से उपमेय/उपमान अलग करवाओ और **प्रभाव** लिखवाओ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में असंगत या विरोधी.',
          hint: 'यदि अटका हुआ लगे, तो **कक्षा 6 के पाठ 1, 4, 7, 10 के \'साहित्यिक युक्तियाँ: विरोधाभास और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **विरोधाभास** को **ऑक्सीमोरॉन** (Oxymoron) समझ बैठते हैं और दोनों को "दो विपरीत शब्दों का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में असंगत या विरोधी लगता है,',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में असंगत या विरोधी लगता है,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटका हुआ लगे, तो **कक्षा 6 के पाठ 1, 4, 7, 10 के \'साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **विरोधाभास** को **ऑक्सीमोरॉन** (Oxymoron) समझ बैठते हैं और दोनों को "दो विपरीत शब्दों का मेल" मान लेते हैं।.' }
          ],
            remediations: { 'oxymoron-sweet-sorrow-6': { steps: ['**चरण 1 — भेद स्पष्ट करें:** दो कार्ड बनाएं — एक पर लिखें "ऑक्सीमोरॉन = दो शब्द (विशेषण+संज्ञा)" जैसे "असह्य सुख".', '**चरण 2 — कार्य दिखाएं:** पूछें: "ऑक्सीमोरॉन क्या करता है?', '(चित्र बनाता है) विरोधाभास क्या करता है?', '(सोचने पर मजबूर करता है, गहरा सत्य खोलता है)" — इस **कार्य-आधारित परिभाषा** से भेद स्थायी होता है। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_010', difficulty: 'standard',
          question: '\'पदावली: मुख्य शब्द\' किसी पाठ के वे विशिष्ट, महत्वपूर्ण और प्रसंग-निर्धारक शब्द.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 की \'पदावली: मुख्य शब्द\' (c6_hin_cbse_04_010)** के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' का अर्थ केवल उसका \'शब्दकोशीय विलोम/पर्याय\' लिखना है। वे यह नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पदावली: मुख्य शब्द\' किसी पाठ के वे विशिष्ट, महत्वपूर्ण और प्रसंग-निर्धारक शब्द होते हैं',
                  options: ['\'पदावली: मुख्य शब्द\' किसी पाठ के वे विशिष्ट, महत्वपूर्ण और प्रसंग-निर्धारक शब्द होते हैं', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 की \'पदावली: मुख्य शब्द\' (c6_hin_cbse_04_010)** के अभ्यास.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' का अर्थ केवल उसका \'शब्दकोशीय विलोम/पर्याय\' लिखना है। वे यह नहीं समझते कि **एक ही शब्द.' }
          ],
            remediations: { 'literal-meaning-suggestive-meaning': { steps: ['**चरण 1 (Concrete):** छात्र को पाठ का एक छोटा अंश दें और कहें: "इस शब्द पर उँगली रखो। अब आँख बंद करो और बताओ तुम्हारे.', '**चरण 2 (Comparative):** उस शब्द के 3 पर्याय बोर्ड पर लिखें। पूछें: "लेखक ने इनमें से \'यही\' शब्द क्यों चुना?', 'बाकी क्यों नहीं?" (Word Choice Analysis)। 3.', '**चरण 3 (Context Shift):** वही शब्द लेकर रोजमर्रा के 2 अलग वाक्य बनवाएँ (जैसे \'भार\' - "सामान का भार" vs "जिम्मेदारी का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दों, पदों, वाक्य-रचना.',
          hint: 'यदि अटका हुआ लगे: कक्षा 6 के व्याकरण अभ्यास (c6_hin_cbse_04_011) से \'क्रिया पहचान →.',
          misconception: 'छात्र समझते हैं कि व्याकरणिक विश्लेषण का अर्थ केवल \'पद-परिचय\' करना है — संज्ञा, सर्वनाम, क्रिया आदि छांटकर उनके नाम लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दों, पदों, वाक्य-रचना, काल,',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दों, पदों, वाक्य-रचना, काल,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटका हुआ लगे: कक्षा 6 के व्याकरण अभ्यास (c6_hin_cbse_04_011) से \'क्रिया पहचान → काल/वाच्य बताना.',
                  misconception: 'छात्र समझते हैं कि व्याकरणिक विश्लेषण का अर्थ केवल \'पद-परिचय\' करना है — संज्ञा, सर्वनाम, क्रिया आदि छांटकर उनके नाम लिख देना। वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक ही वाक्य के 3-4 व्याकरणिक रूपांतर लिखवाएं (कर्तृ/कर्मणी/भाव वाच्य; विभिन्न काल; विशेषण/क्रिया-विशेषण.', 'प्रत्येक रूपांतर को जोर से पढ़वाएं और पूछें: "अब किस पर जोर है?', 'कौन जिम्मेदार लग रहा है?" 3.', 'फिर पाठ 4 का एक छोटा अंश दें और कहें: "यहाँ लेखक ने X चुना, Y नहीं — अगर Y होता तो क्या बदलता?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_04_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता.',
          hint: 'यदि अटके, तो **कक्षा 6 के बोध-प्रश्न (c6_hin_cbse_04_012)** के अभ्यास दोहराएँ और **पाठ 4.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **आशय-सूचक प्रश्न (Inferential Questions)** का उत्तर "अपनी मर्जी का" या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता है और',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता है और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है उस लेखक के जीवन, समय, समाज और अनुभवों को समझना', 'कथानक (Plot) is the logical sequence of events in a story arranged by cause-and-effect', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का भौतिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटके, तो **कक्षा 6 के बोध-प्रश्न (c6_hin_cbse_04_012)** के अभ्यास दोहराएँ और **पाठ 4 के कथानक.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **आशय-सूचक प्रश्न (Inferential Questions)** का उत्तर "अपनी मर्जी का" या "कल्पना" होता है, क्योंकि.' }
          ],
            remediations: { 'inferential-questions': { steps: ['**साक्ष्य खोज खेल (Evidence Hunt)**: छात्र को एक छोटा अनुच्छेद देकर कहें — "यहाँ 3 तथ्य (Facts) ढूँढो और उनसे 1.', 'कौन से दो तथ्य जुड़े?" (तर्क की श्रृंखला दृश्य बनाएँ)। 2.', 'Therefore Frame)**: हर आशय-सूचक उत्तर के लिए यह वाक्य-ढाँचा अनिवार्य करें — "मेरा उत्तर **___** है, **क्योंकि** पाठ में.', '**गलत उत्तर विश्लेषण (Wrong Answer Analysis)**: एक जानबूझकर गलत (मनमाना) उत्तर दिखाएँ और पूछें — "यहाँ कौन-सा तथ्य गायब.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
