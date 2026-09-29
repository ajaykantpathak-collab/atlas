import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch12_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch12_p2',
    title: 'पाठ 12 · Part 2/3',
    subtitle: 'This node covers identification, analysis, and answer-writing for sub-themes in the.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 12 · Part 2/3',
    chapters: ['c9_hin_ga_ch12'],
    nodeIds: ['c9_hin_ga_cbse_12_007', 'c9_hin_ga_cbse_12_008', 'c9_hin_ga_cbse_12_009', 'c9_hin_ga_cbse_12_010', 'c9_hin_ga_cbse_12_011', 'c9_hin_ga_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'व्यक्तित्व का सौंदर्य\' में भवानीप्रसाद मिश्र, व्यक्तित्व, सौंदर्य जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — गौण विषय', text: '\'व्यक्तित्व का सौंदर्य\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — गौण', 'पाठ 12 — साहित्यिक', 'पाठ 12 — पदावली', 'पाठ 12 — व्याकरण', 'पाठ 12 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_12_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 2/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — \'व्यक्तित्व का सौंदर्य\' में भाषा-प्रयोग — भवानीप्रसाद मिश्र ने कैसे शब्द, वाक्य और शैली.', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — \'व्यक्तित्व का सौंदर्य\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 12 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_007', difficulty: 'standard',
          question: '\'व्यक्तित्व का सौंदर्य\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो **c9_hin_ga_cbse_12_006 (मुख्य विषय और संदेश)** दोहराएँ — विशेष रूप से \'मुख्य.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'विषय\' (topic)** और **\'गौण विषय\' (sub-theme)** को एक मान लेते हैं। उदाहरण: पाठ में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व का सौंदर्य\' के गौण विषय',
                  options: ['\'व्यक्तित्व का सौंदर्य\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व का सौंदर्य\' का कथानक', '\'व्यक्तित्व का सौंदर्य\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c9_hin_ga_cbse_12_006 (मुख्य विषय और संदेश)** दोहराएँ — विशेष रूप से \'मुख्य विषय की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'विषय\' (topic)** और **\'गौण विषय\' (sub-theme)** को एक मान लेते हैं। उदाहरण: पाठ में \'गरीबी\' का उल्लेख है.' }
          ],
            remediations: { 'topic-sub-theme': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें: "गरीबी एक तथ्य है। थीम वह *विचार* है जो लेखक गरीबी के बारे में व्यक्त करता है।.', '**वाक्य-परिवर्तन अभ्यास:** छात्र से 5 तथ्य वाक्य (गरीबी है, बेरोजगारी है) लें और प्रत्येक को थीम-वाक्य में बदलवाएँ.', '**पाठ से जोड़ें:** पाठ 12 के एक प्रसंग पर लागू करें — "यहाँ लेखक क्या *दिखा* रहा है, केवल क्या *बता* नहीं रहा?" 4.', '**PEEL ढांचे में लिखवाएँ:** Point (गौण विषय का नाम), Evidence (प्रसंग), Explanation (यह विचार कैसे उभरता है), Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_008', difficulty: 'standard',
          question: '\'व्यक्तित्व का सौंदर्य\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका हुआ महसूस हो तो **उपमा के 5 उदाहरण लिखकर प्रत्येक को रूपक में बदलने** का अभ्यास.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **हर तुलना रूपक है** और **बिंब केवल \'सुंदर दृश्य वर्णन\' है**। **ठीक-ठीक गलती:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व का सौंदर्य\' में बिंब (imagery)',
                  options: ['\'व्यक्तित्व का सौंदर्य\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व का सौंदर्य\' का कथानक', '\'व्यक्तित्व का सौंदर्य\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **उपमा के 5 उदाहरण लिखकर प्रत्येक को रूपक में बदलने** का अभ्यास करें — भेद.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **हर तुलना रूपक है** और **बिंब केवल \'सुंदर दृश्य वर्णन\' है**। **ठीक-ठीक गलती:** (1) "चाँद जैसा मुखड़ा".' }
          ],
            remediations: { '1-2': { steps: ['**इंद्रिय-मानचित्रण अभ्यास:** छात्र को 5 कॉलम बनाने को कहें (दृश्य, श्रव्य, घ्राण, स्पर्श, स्वाद)। रोज़ एक पैराग्राफ.', '**रूपक-शल्यक्रिया (Metaphor Surgery):** 10 वाक्य दें जिनमें \'जैसे/वैसा\' हो। छात्र उन्हें **बिना \'जैसे\' के पुनर्लिखे**.', '**प्रभाव-लेखन:** प्रत्येक रूपांतरण के बाद एक पंक्ति लिखवाएँ: "अब पाठक को क्या **अलग** लगता है?" — इससे भाव-प्रभाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_009', difficulty: 'standard',
          question: '\'व्यक्तित्व का सौंदर्य\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'अगर अटके तो **c9_hin_ga_cbse_12_008 (बिंब और रूपक)** के कार्य उदाहरण दोहराओ और.',
          misconception: 'छात्र समझते हैं कि **विरोधाभास = केवल दो विरोधी शब्दों का मेल** (जैसे "जीवन-मृत्यु") और **प्रतीक = केवल कोई एक वस्तु जो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व का सौंदर्य\' में विरोधाभास',
                  options: ['\'व्यक्तित्व का सौंदर्य\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व का सौंदर्य\' का कथानक', '\'व्यक्तित्व का सौंदर्य\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर अटके तो **c9_hin_ga_cbse_12_008 (बिंब और रूपक)** के कार्य उदाहरण दोहराओ और.',
                  misconception: 'छात्र समझते हैं कि **विरोधाभास = केवल दो विरोधी शब्दों का मेल** (जैसे "जीवन-मृत्यु") और **प्रतीक = केवल कोई एक वस्तु जो दूसरी के लिए खड़ी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के दो छोटे अंश दो: एक में स्पष्ट विरोधाभास, दूसरे में स्पष्ट प्रतीक। 2.', 'उससे पूछो: "पहले वाक्य को जोर से पढ़ो — क्या अटपटा लगा?', 'वही विरोधाभास का प्रवेश द्वार है।" 3.', 'दूसरे अंश के लिए: "यह शब्द अपने आप में क्या है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_010', difficulty: 'standard',
          question: '\'व्यक्तित्व का सौंदर्य\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी.',
          hint: 'यदि अटके तो **नोड 006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विषय से जुड़े शब्द ही मुख्य.',
          misconception: 'छात्र समझते हैं कि **\'मुख्य शब्द = पाठ में आए कठिन/लंबे/संस्कृतनिष्ठ शब्द\'**。 वास्तव में **\'मैं\', \'तुम\', \'क्यों\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व का सौंदर्य\' की पदावली',
                  options: ['\'व्यक्तित्व का सौंदर्य\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व का सौंदर्य\' का कथानक', '\'व्यक्तित्व का सौंदर्य\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **नोड 006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विषय से जुड़े शब्द ही मुख्य शब्द.',
                  misconception: 'छात्र समझते हैं कि **\'मुख्य शब्द = पाठ में आए कठिन/लंबे/संस्कृतनिष्ठ शब्द\'**。 वास्तव में **\'मैं\', \'तुम\', \'क्यों\', \'नहीं\' जैसे सरल शब्द भी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ का **कोई एक छोटा अंश (5-6 पंक्तियाँ)** दें और कहें — "केवल **तीन शब्द** छाँटो जिनके बिना यह अंश.', 'फिर पूछें — "इन तीनों में से **कौन-सा शब्द किस भाव** (दुःख/साहस/विरोध/प्रेम) को ले जा रहा है?" 3.', 'अब उसी अंश से एक **सामान्य शब्द (जैसे \'और\', \'तो\', \'घर\')** उठाकर पूछें — "इसे हटाने से क्या भाव बदलता है?" — अंतर स्पष्ट.', 'अंत में बोर्ड-शैली में लिखवाएँ: **शब्द → प्रसंग → भाव → प्रभाव** — चार कॉलम की सारणी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_011', difficulty: 'standard',
          question: '\'व्यक्तित्व का सौंदर्य\' में भाषा-प्रयोग — भवानीप्रसाद मिश्र ने कैसे शब्द, वाक्य.',
          hint: 'यदि अटका हुआ लगे तो \'पदावली: मुख्य शब्द\' (c9_hin_ga_cbse_12_010) के शब्द-शक्ति अभ्यास.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल \'कठिन शब्दों के अर्थ लिखना\' या \'अलंकारों के नाम पहचानना\' है; वे यह नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व का सौंदर्य\' में भाषा-प्रयोग',
                  options: ['\'व्यक्तित्व का सौंदर्य\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व का सौंदर्य\' का कथानक', '\'व्यक्तित्व का सौंदर्य\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ लगे तो \'पदावली: मुख्य शब्द\' (c9_hin_ga_cbse_12_010) के शब्द-शक्ति अभ्यास दोहराएँ और.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल \'कठिन शब्दों के अर्थ लिखना\' या \'अलंकारों के नाम पहचानना\' है; वे यह नहीं देखते कि एक ही अलंकार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को एक ही वाक्य के तीन भिन्न प्रसंग दें (वीरता/क्रूरता/हास्य) और पूछें "प्रत्येक में \'वह सिंह है\' का प्रभाव.', 'प्रभाव में क्या कमी आती?" — इस तुलनात्मक अभ्यास से वह \'पहचान\' से \'विश्लेषण\' पर आएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_012', difficulty: 'standard',
          question: '\'व्यक्तित्व का सौंदर्य\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँस जाएँ तो **c9_hin_ga_cbse_12_002 (कथानक)** और **c9_hin_ga_cbse_12_010 (पदावली)**.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'आशय-सूचक\' का अर्थ है "अपनी मर्जी का कोई भी जवाब लिख दो" (Subjective Guessing)। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व का सौंदर्य\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'व्यक्तित्व का सौंदर्य\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व का सौंदर्य\' का कथानक', '\'व्यक्तित्व का सौंदर्य\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **c9_hin_ga_cbse_12_002 (कथानक)** और **c9_hin_ga_cbse_12_010 (पदावली)** दोबारा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'आशय-सूचक\' का अर्थ है "अपनी मर्जी का कोई भी जवाब लिख दो" (Subjective Guessing)। वे **\'निहितार्थ\'.' }
          ],
            remediations: { 'subjective-guessing-implication-imagination': { steps: ['**चरण 1 (तत्काल):** छात्र को एक छोटा पैराग्राफ दें और कहें: "यहाँ **कोई भावना शब्द (emotion word) नहीं है** — जैसे खुश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
