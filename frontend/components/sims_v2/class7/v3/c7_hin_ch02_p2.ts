import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch02_p2: SimDef = {
    id: 'v3_c7_hin_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'यह नोड केवल कक्षा 7 के पाठ 2 के **गौण विषयों** की पहचान, विश्लेषण और मुख्य विषय से संबंध.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c7_hin_ch02'],
    nodeIds: ['c7_hin_cbse_02_007', 'c7_hin_cbse_02_008', 'c7_hin_cbse_02_009', 'c7_hin_cbse_02_010', 'c7_hin_cbse_02_011', 'c7_hin_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुमने एक फिल्म देखी जिसका मुख्य संदेश था "परिवार सबसे बड़ा सहारा है" — लेकिन तुम्हें यह भी लगा कि.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: 'गौण विषय (Sub-themes) वे सहायक केंद्रीय विचार होते हैं जो पाठ के मुख्य विषय को विस्तार देते हैं, उसे पुष्ट करते हैं और कहानी/कविता के विभिन्न आयामों (पात्र, परिवेश, घटनाएँ) के माध्यम से उभरते हैं; ये.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — भाषा-प्रयोग (Language Use) refers to the deliberate choices an author makes in vocabulary.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है और जिनका.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-themes) वे सहायक केंद्रीय विचार होते हैं जो पाठ के मुख्य विषय को.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 के पाठ 2 (c6_hin_cbse_02_007) के गौण विषयों** को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'गौण विषय\' को \'उपकथानक (sub-plot)\' या \'सहायक पात्र की कहानी\' समझ लेते हैं**। **गलत तर्क:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-themes) वे सहायक केंद्रीय विचार होते हैं जो पाठ के मुख्य विषय को विस्तार',
                  options: ['गौण विषय (Sub-themes) वे सहायक केंद्रीय विचार होते हैं जो पाठ के मुख्य विषय को विस्तार', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 के पाठ 2 (c6_hin_cbse_02_007) के गौण विषयों** को दोहराएँ और वहाँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'गौण विषय\' को \'उपकथानक (sub-plot)\' या \'सहायक पात्र की कहानी\' समझ लेते हैं**। **गलत तर्क:** "पाठ 2 में नायक का.' }
          ],
            remediations: { 'sub-plot-2-6': { steps: ['**चरण 1 — घटना vs विचार अलग करना:** छात्र को पाठ के 5 प्रसंग दें; प्रत्येक से पूछें: "यहाँ **क्या हुआ**?', '(एक वाक्य) — यहाँ **क्या विचार** उभरता है?', '(एक वाक्य)"। तब तक अभ्यास कराएँ जब तक वह दोनों कॉलम अलग न कर ले। 2.', '**चरण 2 — मुख्य विषय से जोड़ना:** नोड 006 से मुख्य विषय लिखवाएँ। फिर प्रत्येक विचार के आगे पूछें: "क्या यह मुख्य विषय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों के माध्यम से पाठक की इंद्रियों (देखना, सुनना, सूंघना.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 6 पाठ 1/2/4 के बिंब-रूपक अभ्यास (c6_hin_cbse_01_008.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'उपमा\' (Simile) को \'रूपक\' (Metaphor) मान लेते हैं** क्योंकि दोनों तुलना करते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों के माध्यम से पाठक की इंद्रियों (देखना, सुनना, सूंघना, छूना,',
                  options: ['**बिंब (Imagery)** शब्दों के माध्यम से पाठक की इंद्रियों (देखना, सुनना, सूंघना, छूना,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 6 पाठ 1/2/4 के बिंब-रूपक अभ्यास (c6_hin_cbse_01_008.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'उपमा\' (Simile) को \'रूपक\' (Metaphor) मान लेते हैं** क्योंकि दोनों तुलना करते हैं। वे "वह शेर जैसा बहादुर.' }
          ],
            remediations: { 'simile-metaphor': { steps: ['**चरण 1 — भेद स्पष्ट करो:** दो वाक्य साथ रखो: "वह सिंह जैसा वीर है" (उपमा) vs "वह सिंह है" (रूपक)। पूछो: "पहले में वह.', '**चरण 2 — \'जैसे/वैसे\' प्रतिबंध अभ्यास:** छात्र से कहो: "अगले 5 मिनट में 3 रूपक बनाओ **बिना** \'जैसे/वैसे/समान/तुल्य\'.', '**चरण 3 — उपमेय/उपमान लेबलिंग:** उसके बनाए रूपकों में से प्रत्येक में उपमेय और उपमान अलग-अलग रंग से गोला लगवाओ। 4.', '**चरण 4 — बिंब जोड़ो:** अब प्रत्येक रूपक में एक बिंब डालने को कहो: "परीक्षा एक पहाड़ है जिसकी चढ़ाई साँस फुला देती है".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ.',
          hint: 'यदि अटके तो c6_hin_cbse_01_009 (कक्षा 6 पाठ 1 विरोधाभास/प्रतीक) के उदाहरणों पर लौटें और.',
          misconception: 'छात्र अक्सर **विरोधाभास को \'विरोधाभासी स्थिति\' (कंट्राडिक्शन/गलती)** समझ लेते हैं — जैसे "वह आया भी और नहीं भी आया" को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ आकर एक गहरा',
                  options: ['**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ आकर एक गहरा', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटके तो c6_hin_cbse_01_009 (कक्षा 6 पाठ 1 विरोधाभास/प्रतीक) के उदाहरणों पर लौटें और प्रत्येक के.',
                  misconception: 'छात्र अक्सर **विरोधाभास को \'विरोधाभासी स्थिति\' (कंट्राडिक्शन/गलती)** समझ लेते हैं — जैसे "वह आया भी और नहीं भी आया" को तर्क-भूल मानते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को दो वाक्य दो — एक तर्क-भूल वाला ("वह झूठा है, सच बोलता है"), एक साहित्यिक विरोधाभास वाला ("उसका झूठ ही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द (Key Vocabulary) refers to the curated set of significant.',
          hint: 'If stuck, review "भावार्थ vs अर्थ" using 5 everyday word pairs (e.g., घर/मकान, माँ/जननी.',
          misconception: '**विशिष्ट भ्रांति:** "मुख्य शब्द वही हैं जो कठिन हों, लंबे हों, या परीक्षा में पूछे जाएँ।" **गलत तर्क:** छात्र \'मुख्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द (Key Vocabulary) refers to the curated set of significant words in a',
                  options: ['पदावली: मुख्य शब्द (Key Vocabulary) refers to the curated set of significant words in a', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'If stuck, review "भावार्थ vs अर्थ" using 5 everyday word pairs (e.g., घर/मकान, माँ/जननी.',
                  misconception: '**विशिष्ट भ्रांति:** "मुख्य शब्द वही हैं जो कठिन हों, लंबे हों, या परीक्षा में पूछे जाएँ।" **गलत तर्क:** छात्र \'मुख्य शब्द\' को \'कठिन शब्द\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पकड़ो:** छात्र से कहो — "पाठ से 5 शब्द चुनो जो तुम्हें \'आसान\' लगते हैं लेकिन अगर हटा दिए जाएँ तो वाक्य का \'स्वाद\' बदल.', '**तुलना करो:** प्रत्येक शब्द के लिए — "इसकी जगह कोई और सरल शब्द रखो। अब वाक्य पढ़ो। क्या फर्क पड़ा?" (उदाहरण: \'चुप\' →.', '**नाम दो:** इस फर्क को नाम दो — "यह \'भावार्थ का अंतर\' है।" 4.', '**लागू करो:** अब छात्र से कहो — "पाठ का कोई भी \'कठिन\' शब्द लो और वही प्रक्रिया दोहराओ।" 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग (Language Use) refers to the deliberate choices an author makes.',
          hint: 'Review "वाक्य के प्रकार" (Sentence Types) and "वाच्य" (Voice) from Class 6 grammar.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पाठ में भाषा-प्रयोग" का अर्थ है **व्याकरण की त्रुटियाँ ढूँढना (Finding Grammar.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग (Language Use) refers to the deliberate choices an author makes in vocabulary',
                  options: ['भाषा-प्रयोग (Language Use) refers to the deliberate choices an author makes in vocabulary', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'Review "वाक्य के प्रकार" (Sentence Types) and "वाच्य" (Voice) from Class 6 grammar exercises.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पाठ में भाषा-प्रयोग" का अर्थ है **व्याकरण की त्रुटियाँ ढूँढना (Finding Grammar Errors)** या.' }
          ],
            remediations: { 'finding-grammar-errors-memorizing-definitions': { steps: ['**पहला कदम:** छात्र को पाठ से **एक वाक्य चुनने** को कहें जो उसे \'अजीब\' या \'प्रभावशाली\' लगा। 2.', '**दूसरा कदम:** उससे पूछें: *"इसे बोलने का कोई और तरीका सोचो (कम से कम 2 तरीके)।"* 3.', '**तीसरा कदम:** दोनों तरीके आमने-सामने रखकर पूछें: *"कौन-सा तरीका पात्र को कमजोर दिखाता है?', '**चौथा कदम:** फिर बताएँ: *"यही \'भाषा-प्रयोग\' है — लेखक ने जानबूझकर **एक** तरीका चुना ताकि तुम **वही** महसूस करो जो वह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है.',
          hint: 'यदि छात्र अटका हो, तो **\'प्रमाण → निष्कर्ष\' दो-कॉलम टेबल** (c6_hin_cbse_06_012 में सिखाया.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का उत्तर अपनी मनपसंद कहानी गढ़ देना है\'**। वे सोचते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है और जिनका',
                  options: ['वस्तुनिष्ठ प्रश्न वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है और जिनका', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि छात्र अटका हो, तो **\'प्रमाण → निष्कर्ष\' दो-कॉलम टेबल** (c6_hin_cbse_06_012 में सिखाया गया) पर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का उत्तर अपनी मनपसंद कहानी गढ़ देना है\'**। वे सोचते हैं: "चूँकि उत्तर पाठ में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**स्पष्ट अंतर दिखाओ:** एक ही पाठ से दो प्रश्न साथ रखो — एक वस्तुनिष्ठ ("राम ने दरवाज़ा कैसे पीटा?"), एक आशय-सूचक ("इससे.', 'दूसरे का उत्तर किस लाइन में है?" जब वह दूसरे के लिए लाइन न ढूंढ पाए, तब समझाओ: "दूसरे का उत्तर पाठ में **नहीं** लिखा.', '**\'प्रमाण → निष्कर्ष\' टेम्पलेट दो:** कागज पर दो कॉलम बनवाओ: | पाठ का प्रमाण (Evidence) | मेरा निष्कर्ष (Inference) |।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
