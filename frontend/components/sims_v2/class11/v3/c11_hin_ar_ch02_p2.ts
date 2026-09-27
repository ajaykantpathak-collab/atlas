import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch02_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'Watch a quiet cook defeat his master without ever raising his voice.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c11_hin_ar_ch02'],
    nodeIds: ['c11_hin_ar_cbse_02_007', 'c11_hin_ar_cbse_02_008', 'c11_hin_ar_cbse_02_009', 'c11_hin_ar_cbse_02_010', 'c11_hin_ar_cbse_02_011', 'c11_hin_ar_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener piecing together a servant\'s hidden past', intro: 'Puris puff on the stove while a nickname — \'उल्हनिहु\' — opens a trapdoor into a whole colonial history.', goal: 'Analyse the story\'s flashback structure and read its silent ending as resistance.' },
    discovery: {
        question: 'The cook Phenku ends the story serving puris in silence — the narrator learned nothing, so the ending resolves nothing?',
        options: ['Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history', 'Right — an open ending is a narrative failure', 'Right — the colonial anecdote deserved a dramatic payoff', 'Wrong — he actually resigns at the end'],
        answer: 'Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history',
        hook: 'The story hides its oldest event two-thirds of the way in — a flashback that only lands because we met the dignified cook first.',
    },
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय (Central Theme) के समानांतर चलकर उसे विस्तार, गहराई और विश्वसनीयता प्रदान करता है, बिना कथानक का केंद्रीय फोकस बने।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reorder the five scenes by narrative logic rather than chronology, and argue why the colonial-officer flashback lands where it does.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है — रचनाकार द्वारा कथ्य (विषय) के अनुरूप शब्द-चयन (पदावली).', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective Questions) वे होते हैं जिनका उत्तर पाठ में स्पष्टतः लिखित.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a regional-literature seminar you present Renu\'s anchalik katha and Yashpal\'s \'Phenku\' story. A classmate objects: \'These dialect words and folk songs are local colour — decoration. And the Phenku story is simple: master questions cook, cook answers, done in order.\'',
            decisions: [{ prompt: 'What\'s the better analysis?', options: [
                { text: 'Show the machinery: in anchalik fiction the dialect, folk songs and agrarian rituals aren\'t colour — they carry the meaning and the tension between tradition and modernity. And Yashpal\'s structure is the argument: the colonial-officer anecdote arrives as a flashback two-thirds in, so we meet Phenku\'s present dignity BEFORE learning his past — the quiet \'simple\' cook becomes the moral centre while the talkative master shrinks.', outcome: 'Both corrections land: form is meaning — dialect is the story\'s engine, and narrative sequencing is how the servant outwits the master without raising his voice.' },
                { text: 'Agree dialect is decoration — translate it into standard Hindi so the \'real\' story shows clearly.', outcome: 'Removing the regional register removes the story: anchalik katha locates meaning in the specific soil, speech and ritual of the region.', reveals: 'dialect-is-decoration' },
                { text: 'Retell Phenku chronologically — put the officer anecdote first so events run in order.', outcome: 'Chronological retelling destroys the irony: the flashback\'s late placement is what lets present dignity precede past humiliation.', reveals: 'reorder-flashback-chronologically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'A servant who never raises his voice outwits everyone — the structure does the same to the reader.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय (Central Theme) के.',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) पर वापस जाएँ — मुख्य विषय को 3 अलग-अलग कोणों से.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय = कम अंक वाला विषय\' या \'गौण विषय = प्रसंग मात्र\'। वास्तव में बोर्ड परीक्षा में 3-4 अंक के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय (Central Theme) के समानांतर चलकर',
                  options: ['गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय (Central Theme) के समानांतर चलकर', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) पर वापस जाएँ — मुख्य विषय को 3 अलग-अलग कोणों से लिखकर.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय = कम अंक वाला विषय\' या \'गौण विषय = प्रसंग मात्र\'। वास्तव में बोर्ड परीक्षा में 3-4 अंक के प्रश्न प्रायः गौण.' }
          ],
            remediations: { '3-4-functional-relationship': { steps: ['छात्र को नोड 006 (मुख्य विषय) पर वापस ले जाएँ — पहले मुख्य विषय को एक वाक्य में लिखवाएँ। 2.', 'पाठ के 5-6 प्रमुख प्रसंग चुनवाएँ, प्रत्येक से पूछें: "यह प्रसंग मुख्य विषय को क्या नई जानकारी/कोण देता है?" 3.', 'उत्तरों को तीन कॉलम में लिखवाएँ: प्रसंग | देता जानकारी | गौण विषय का नाम। 4.', 'फिर PEEL संरचना में एक उत्तर लिखवाएँ: Point (गौण विषय का नाम), Evidence (प्रसंग/संवाद), Explanation (कैसे मुख्य विषय को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_008', difficulty: 'standard',
          question: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक.',
          hint: 'यदि अटके तो **\'शब्द-शक्ति: व्यंजना\'** (कक्षा 10/11 व्याकरण) दोहराएं — रूपक व्यंजना का ही.',
          misconception: 'छात्र समझते हैं कि **हर तीव्र या सुंदर तुलना रूपक होती है**, जबकि रूपक की शर्त है — उपमेय को उपमान **कह देना** (पहचान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक की पांचों',
                  options: ['बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक की पांचों', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि अटके तो **\'शब्द-शक्ति: व्यंजना\'** (कक्षा 10/11 व्याकरण) दोहराएं — रूपक व्यंजना का ही एक सुगठित.',
                  misconception: 'छात्र समझते हैं कि **हर तीव्र या सुंदर तुलना रूपक होती है**, जबकि रूपक की शर्त है — उपमेय को उपमान **कह देना** (पहचान स्थापित करना), न कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पांच वाक्य दें: दो में \'जैसे/वैसे/समान\', तीन बिना सहायक शब्द के। 2.', 'उससे कहें: "जिनमें \'जैसे\' हो उन्हें **उपमा** लिखो, बाकी **रूपक**।" 3.', 'फिर प्रत्येक रूपक-वाक्य में उपमेय और उपमान अलग-अलग रंग से रेखांकित करवाएं। 4.', 'अंत में पूछें: "अगर \'जैसे\' डाल दें तो अर्थ में क्या फर्क पड़ेगा?" — इससे अभेद/सादृश्य का भेद स्पष्ट हो जाता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में स्वयं का खंडन.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 008 के WORKED_EXAMPLE_2** (रूपक विश्लेषण) को दोहराएँ और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **प्रतीक (Symbol)** को **रूपक (Metaphor)** या **बिंब (Image)** समझ बैठते हैं और लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में स्वयं का खंडन करता',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में स्वयं का खंडन करता', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 008 के WORKED_EXAMPLE_2** (रूपक विश्लेषण) को दोहराएँ और फिर इसी.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **प्रतीक (Symbol)** को **रूपक (Metaphor)** या **बिंब (Image)** समझ बैठते हैं और लिखते हैं: "लेखक ने नदी.' }
          ],
            remediations: { 'symbol-metaphor-image-1': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र को तीन कॉलम बनवाएँ: **बिंब / रूपक / प्रतीक**। प्रत्येक में पाठ से एक-एक उदाहरण.', 'क्या *बार-बार* आकर *अर्थ विस्तार* पा रहा है?" 2.', '**चरण 2 — विरोधाभास का \'सत्य-परीक्षण\':** हर विरोधाभासी वाक्य के लिए पूछें: "सतह पर क्या विरोध है?', 'गहरे में कौन-सा सत्य खुल रहा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_010', difficulty: 'standard',
          question: 'पदावली के **मुख्य शब्द** वे विशिष्ट शब्द या पद होते हैं जिन्हें रचनाकार पाठ में.',
          hint: 'यदि अटका हुआ लगे तो **c11_hin_ar_cbse_02_002 (कथानक)** और **c11_hin_ar_cbse_02_006 (मुख्य.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य शब्द = सबसे अधिक बार आने वाला शब्द\' (highest frequency word)**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के **मुख्य शब्द** वे विशिष्ट शब्द या पद होते हैं जिन्हें रचनाकार पाठ में **सायास',
                  options: ['पदावली के **मुख्य शब्द** वे विशिष्ट शब्द या पद होते हैं जिन्हें रचनाकार पाठ में **सायास', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि अटका हुआ लगे तो **c11_hin_ar_cbse_02_002 (कथानक)** और **c11_hin_ar_cbse_02_006 (मुख्य विषय)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य शब्द = सबसे अधिक बार आने वाला शब्द\' (highest frequency word)**। **वास्तविकता:** पाठ में.' }
          ],
            remediations: { 'highest-frequency-word': { steps: ['**चरण १:** छात्र को एक छोटा अनुच्छेद (५० शब्द) दें जहाँ **"पानी"** ३ बार, **"प्यास"** २ बार, **"है"** ६ बार आए। **चरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है — रचनाकार द्वारा कथ्य (विषय) के अनुरूप शब्द-चयन.',
          hint: 'यदि फँसें तो c11_hin_ar_cbse_02_010 (पदावली) के \'शब्द-वर्गीकरण अभ्यास\' और कक्षा 10 के.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **कठिन/तत्सम/संस्कृतनिष्ठ शब्दों का प्रयोग** है। वे सरल तद्भव शब्दों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि फँसें तो c11_hin_ar_cbse_02_010 (पदावली) के \'शब्द-वर्गीकरण अभ्यास\' और कक्षा 10 के \'वाक्य-विचार\'.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **कठिन/तत्सम/संस्कृतनिष्ठ शब्दों का प्रयोग** है। वे सरल तद्भव शब्दों, आंचलिक प्रयोगों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ-2 का कोई एक पृष्ठ खोलो और **लाल पेन** से केवल **क्रिया-पद** (verbs) घेरो।" 2.', 'फिर पूछो: "क्या सभी क्रियाएँ एक ही कोटि की हैं?', '(कर्तृवाच्य/कर्मवाच्य/भाववाच्य, साधारण/सम्मानसूचक)।" 3.', 'अब **नीले पेन** से **संज्ञा/सर्वनाम** घेरवाओ: "कितने तत्सम?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे होते हैं जिनका उत्तर पाठ में.',
          hint: 'यदि फँसें तो **c11_hin_ar_cbse_02_002 (कथानक)** और **c11_hin_ar_cbse_02_008/009.',
          misconception: '**भ्रांति:** "आशय-सूचक प्रश्नों का उत्तर \'मेरे विचार से\' या \'मेरा अनुमान है\' से शुरू होता है क्योंकि ये तो राय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे होते हैं जिनका उत्तर पाठ में स्पष्टतः लिखित',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे होते हैं जिनका उत्तर पाठ में स्पष्टतः लिखित', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि फँसें तो **c11_hin_ar_cbse_02_002 (कथानक)** और **c11_hin_ar_cbse_02_008/009.',
                  misconception: '**भ्रांति:** "आशय-सूचक प्रश्नों का उत्तर \'मेरे विचार से\' या \'मेरा अनुमान है\' से शुरू होता है क्योंकि ये तो राय (opinion) माँगते हैं।".' }
          ],
            remediations: { 'opinion': { steps: ['**पहचान चरण:** छात्र से कहें — "पाठ का वह **सटीक वाक्य/शब्द/बिंब** दिखाओ जिससे तुमने यह निष्कर्ष निकाला।" यदि वह नहीं.', '**मॉडलिंग चरण:** उसी प्रश्न का **दो संस्करण** लिखकर दिखाएँ — एक कमजोर ("मुझे लगता है लेखक दुखी था") और एक सशक्त.', '**अभ्यास चरण:** 3-4 छोटे प्रसंग दें; प्रत्येक के लिए छात्र से **एक वस्तुनिष्ठ तथ्य** और **एक आशय-सूचक निष्कर्ष**.', '**आदत निर्माण:** हर आशय-सूचक उत्तर के लिए **"पाठ में सबूत कहाँ है?"** पूछने की आदत डालें — स्वयं छात्र भी, शिक्षक भी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
