import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch04_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'Read a bureaucratic \'order\' as parody — and a soldier\'s letter as an accusation.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c11_hin_ar_ch04'],
    nodeIds: ['c11_hin_ar_cbse_04_007', 'c11_hin_ar_cbse_04_008', 'c11_hin_ar_cbse_04_009', 'c11_hin_ar_cbse_04_010', 'c11_hin_ar_cbse_04_011', 'c11_hin_ar_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader unmasking a ridiculous official letter', intro: 'A letter reaches the king from his own soldier — part chronicle of past glory, part folk tale, part indictment.', goal: 'Decode Guleri\'s linguistic satire and analyse the letter\'s fragmented narrative structure.' },
    discovery: {
        question: 'A British officer\'s order arrives dressed in legal English, dead Sanskrit and bazaar Hindi — is the absurdity just clumsy writing?',
        options: ['No — the linguistic mess is the satire: colonial authority is shown as performance, not competence', 'Yes — the officer simply couldn\'t write Hindi', 'No — it\'s actually a translation error by the editor', 'Yes — satire requires elegant language'],
        answer: 'No — the linguistic mess is the satire: colonial authority is shown as performance, not competence',
        hook: 'Guleri edited a paper through the 1899 famine that killed crores while grain was exported — the mock-bureaucratic \'order\' is a weapon, not a joke.',
    },
    teaching: [
        { title: 'पाठ 4 — गौण विषय', text: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य या प्रसंग है जो मुख्य विषय के समानांतर चलकर उसे विस्तार, गहराई, संदर्भ या विरोधाभास प्रदान करता है तथा कथानक को बहुआयामी बनाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Break a soldier\'s letter into its blocks — past glory, present misery, the snake-and-two-women folktale — and ask what the broken structure does to the ruler reading it.',
        labels: ['पाठ 4 — गौण', 'पाठ 4 — साहित्यिक', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_012', title: 'पाठ 4 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'You open your Hindi board paper and see Question 2: "लेखक ने किस घटना का वर्णन किया है?" (Objective) and Question 3: "लेखक के मन में उस घटना के प्रति क्या भाव.',
            decisions: [{ prompt: 'पाठ 4 में वस्तुनिष्ठ और आशय-सूचक प्रश्नों के मूल अंतर को एक वाक्य में स्पष्ट कीजिए।', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ प्रश्नों का उत्तर पाठ में स्पष्ट रूप से लिखा होता है', outcome: '**Correct Answer:** वस्तुनिष्ठ प्रश्नों का उत्तर पाठ में स्पष्ट रूप से लिखा होता है (तथ्य/विवरण).' },
                { text: 'दोनों पाठ पर आधारित हैं', outcome: 'Not quite — **Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में \'छिपे\' होते हैं — बस.', reveals: 'specific-error-students-believe-they' },
                { text: 'आशय-सूचक में अपनी राय लिखनी होती है', outcome: 'Not quite — **Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में \'छिपे\' होते हैं — बस.', reveals: 'specific-error-students-believe-they' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a satire-writing workshop you take Guleri\'s sketch — a soldier\'s letter to his ruler mixing Sanskrit, Persian officialese and folk tale. A participant says: \'The mixed language is sloppy writing, and the snake-and-two-women folk tale is a pointless digression from the letter\'s complaint.\'',
            decisions: [{ prompt: 'How do you defend the text\'s design?', options: [
                { text: 'Decode the hybridity: the officer\'s mangled officialese (vakil, daftar, hukm) parodies the Persianised bureaucratic register — colonial power as performative language — while the elder sister\'s brave Sanskritised speech vs the younger\'s fearful fragments allegorise indigenous tradition vs colonised psyche. And the folk tale isn\'t digression: it\'s a parallel symbolic sub-plot doing the work of satire and allegory inside the letter form.', outcome: 'The workshop sees context as decoder: Guleri\'s famine-era journalism weaponised language — every register switch and the embedded tale are the critique.' },
                { text: 'Agree the language is sloppy — clean it into uniform modern Hindi for the exercise.', outcome: 'Uniforming the register erases the satire: the collision of Sanskrit, Persian and colloquial speech is precisely how colonial authority gets mocked.', reveals: 'hybrid-language-is-sloppy' },
                { text: 'Cut the folk tale — a letter should stick to its complaint.', outcome: 'The sub-plot carries the allegorical weight: it mirrors and sharpens the main letter\'s charge, so cutting it removes the satire\'s core.', reveals: 'folk-tale-is-digression' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'Two sisters face the same officer — one answers in courage and Sanskritised rebuke, one in fear; both are true, and that refusal of a clean binary is the honesty.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य या प्रसंग है जो मुख्य विषय के समानांतर.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_04_006 (मुख्य विषय और संदेश)** नोड पर लौटें और मुख्य विषय.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'गौण विषय\' का अर्थ है **\'कम शब्दों में निपटा दिया गया विषय\'** या **\'कम.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य या प्रसंग है जो मुख्य विषय के समानांतर चलकर उसे',
                  options: ['गौण विषय (Sub-theme) वह द्वितीयक कथ्य या प्रसंग है जो मुख्य विषय के समानांतर चलकर उसे', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_04_006 (मुख्य विषय और संदेश)** नोड पर लौटें और मुख्य विषय के 3-4.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'गौण विषय\' का अर्थ है **\'कम शब्दों में निपटा दिया गया विषय\'** या **\'कम महत्वपूर्ण विषय\'**, इसलिए वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुन: पठन (Re-read) कार्य:** छात्र को पाठ 4 के केवल वे अंश पढ़ने को कहें जहाँ मुख्य विषय (नायक का केंद्रीय संघर्ष).', '**तालिका निर्माण:** दो कॉलम बनवाएँ — बाएँ: "मुख्य विषय का प्रसंग", दाएँ: "समानांतर चल रहा प्रसंग"। हर अध्याय/खंड के लिए.', '**प्रश्न पूछें:** "यदि दायाँ कॉलम हटा दें, तो बायाँ कॉलम क्या खो देगा?" — इस प्रश्न का लिखित उत्तर माँगें। यही गौण विषय.', '**फीडबैक:** यदि छात्र अब भी \'घटना\' को \'विषय\' लिखे, तो उसे **\'आवर्ती पैटर्न\' (recurring pattern)** और **\'एकबारगी घटना\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** is the use of vivid, sensory language (दृश्य, श्रवण, घ्राण.',
          hint: 'Review **\'लाक्षणिकता (Figurativeness)\'** and **\'अलंकार की परिभाषा\'** from Class 9-10.',
          misconception: '**Specific Error**: Students treat **रूपक (Metaphor)** as merely a "fancy synonym" or "condensed simile" (संक्षिप्त.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** is the use of vivid, sensory language (दृश्य, श्रवण, घ्राण, स्पर्श,',
                  options: ['**बिंब (Imagery)** is the use of vivid, sensory language (दृश्य, श्रवण, घ्राण, स्पर्श,', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'Review **\'लाक्षणिकता (Figurativeness)\'** and **\'अलंकार की परिभाषा\'** from Class 9-10 Hindi Vyakaran.',
                  misconception: '**Specific Error**: Students treat **रूपक (Metaphor)** as merely a "fancy synonym" or "condensed simile" (संक्षिप्त उपमा), focusing only.' }
          ],
            remediations: { 'specific-error-students-treat-metaphor': { steps: ['**Step 1**: Give the student a **"Quality Transfer Table"**: Column A = उपमान (e.g., दीमक, सिक्का, समुद्र, ज्वालामुखी).', 'Ask them to list **5 physical/biological traits of Column A** and **tick only those 1-2 traits that logically map.', '**Step 2**: Use a **"Failed Metaphor" exercise**: "क्रोध एक सेब है" — ask *why* this fails (no shared semantic ground).', 'Then fix it: "क्रोध पका सेब है जो हाथ लगाते ही कुचल जाता है" (selective mapping: fragility, sudden burst, mess).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_009', difficulty: 'standard',
          question: '**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जहाँ कथन का शाब्दिक अर्थ उसके वास्तविक.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_04_008 (बिंब और रूपक)** पर लौटें — वहाँ सीखी गई "मूर्त से.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **विरोधाभास (irony)** को **विरोधाभास अलंकार (paradox as figure of speech)** समझ लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जहाँ कथन का शाब्दिक अर्थ उसके वास्तविक आशय या',
                  options: ['**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जहाँ कथन का शाब्दिक अर्थ उसके वास्तविक आशय या', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_04_008 (बिंब और रूपक)** पर लौटें — वहाँ सीखी गई "मूर्त से अमूर्त की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **विरोधाभास (irony)** को **विरोधाभास अलंकार (paradox as figure of speech)** समझ लेते हैं — जैसे "मृत्यु.' }
          ],
            remediations: { 'irony-paradox-as-figure-of': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें — "भूल जाओ कि विरोधाभास अलंकार क्या है। केवल यह देखो: *क्या कहा गया* बनाम *क्या.', 'यदि हाँ, तो विरोधाभास युक्ति है।" 2.', '**माइक्रो-टास्क दें:** पाठ से 3 संवाद चुनवाएँ जहाँ बोलने वाले के चेहरे/हाव-भाव उसके शब्दों से मेल न खाएँ; प्रत्येक के.', '**प्रतीक के लिए:** "वस्तु उठाओ, अर्थ जोड़ो" अभ्यास करवाएँ — एक साधारण वस्तु (चाभी, जूता, पत्र) लेकर 3 भिन्न अर्थों में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वह शब्द है जो पाठ के केंद्रीय विषय, भावना या संदेश को व्यक्त.',
          hint: 'यदि फंसे हुए महसूस हो तो "मुख्य विषय और संदेश" (c11_hin_ar_cbse_04_006) नोड की समीक्षा.',
          misconception: 'छात्र अक्सर मानते हैं कि मुख्य शब्द वह शब्द है जो पाठ में सबसे अधिक बार दोहराया जाता है—उदाहरण के लिए, यदि "प्यार" शब्द.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वह शब्द है जो पाठ के केंद्रीय विषय, भावना या संदेश को व्यक्त करने में',
                  options: ['पदावली: मुख्य शब्द वह शब्द है जो पाठ के केंद्रीय विषय, भावना या संदेश को व्यक्त करने में', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'यदि फंसे हुए महसूस हो तो "मुख्य विषय और संदेश" (c11_hin_ar_cbse_04_006) नोड की समीक्षा करें—यहाँ.',
                  misconception: 'छात्र अक्सर मानते हैं कि मुख्य शब्द वह शब्द है जो पाठ में सबसे अधिक बार दोहराया जाता है—उदाहरण के लिए, यदि "प्यार" शब्द 10 बार आया है तो वह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र मुख्य शब्द की पहचान में केवल आवृत्ति पर निर्भर कर रहा है, तो उसे निम्नलिखित चरणों से मार्गदर्शित करें: - चरण.', 'क्या यह पाठ के केंद्र में है?', 'क्या यह भावना या विचार को धारण कर रहा है?" आवृत्ति केवल एक संकेत हो सकती है, लेकिन निर्णायक कारक नहीं। - चरण 4: अंत में.', 'क्यों?" इससे उसे आवृत्ति से बाहर सोचने की आदत बनेगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_011', difficulty: 'standard',
          question: '"पाठ में भाषा-प्रयोग" refers to the analytical study of linguistic choices.',
          hint: 'Revise Class 10 "पद-परिचय" and "वाक्य-विचार" chapters — specifically practice classifying.',
          misconception: 'Students treat "भाषा-प्रयोग" as a labelling exercise — "ye tatsam hai, ye karak hai" — and stop there.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ में भाषा-प्रयोग" refers to the analytical study of linguistic choices',
                  options: ['"पाठ में भाषा-प्रयोग" refers to the analytical study of linguistic choices', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'Revise Class 10 "पद-परिचय" and "वाक्य-विचार" chapters — specifically practice classifying 20 random.',
                  misconception: 'Students treat "भाषा-प्रयोग" as a labelling exercise — "ye tatsam hai, ye karak hai" — and stop there.' }
          ],
            remediations: { 'students-treat-as-a-labelling': { steps: ['Pick ONE sentence from the chapter.', 'Change ONE grammatical feature (tense / voice / word / sentence type).', 'Read both versions aloud.', 'Write two lines: "Original effect: ___. Changed effect: ___."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective questions) test literal comprehension by asking.',
          hint: 'If stuck, return to c11_hin_ar_cbse_04_011 (भाषा-प्रयोग) and c11_hin_ar_cbse_04_009.',
          misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में \'छिपे\' होते हैं — बस ढूँढ़ने की देर है।" They.',
          parts: [
                { id: 'a', prompt: 'निम्नलिखित में से कौन-सा प्रश्न आशय-सूचक है? कारण सहित बताइए। (क) पाठ में नायक का नाम क्या है? (ख) नायक ने विपत्ति में धैर्य क्यों नहीं खोया?', answer: '**Correct Answer:** (ख) नायक ने विपत्ति में धैर्य क्यों नहीं खोया?',
                  options: ['**Correct Answer:** (ख) नायक ने विपत्ति में धैर्य क्यों नहीं खोया?', 'question is inferential', 'may have a direct textual answer ('],
                  hint: 'If stuck, return to c11_hin_ar_cbse_04_011 (भाषा-प्रयोग) and c11_hin_ar_cbse_04_009 (विरोधाभास और.',
                  misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में \'छिपे\' होते हैं — बस ढूँढ़ने की देर है।" They scan the text for.' },
                { id: 'b', prompt: 'पाठ 4 के किसी एक प्रसंग से एक वस्तुनिष्ठ प्रश्न और एक आशय-सूचक प्रश्न बनाइए। दोनों के उत्तर लिखते समय आप किन-किन चरणों का पालन करेंगे?', answer: '**Correct Answer (Steps for Objective):** 1',
                  options: ['**Correct Answer (Steps for Objective):** 1', 'पाठ में ढूँढ़ो', 'आशय-सूचक प्रश्नों के उत्तर पाठ में \'छिपे\' होते हैं', 'contains the answer'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_04_011 (भाषा-प्रयोग) and c11_hin_ar_cbse_04_009 (विरोधाभास और.',
                  misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में \'छिपे\' होते हैं — बस ढूँढ़ने की देर है।" They scan the text for.' }
          ],
            remediations: { 'specific-error-students-believe-they': { steps: ['**Demonstrate the non-existence:** Pick a real inferential Q from पाठ 4.', 'Show the student: "Read these 5 relevant paragraphs.', 'Is the answer written *anywhere* verbatim?', 'Now watch me *build* it." 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
