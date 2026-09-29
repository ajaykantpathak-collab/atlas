import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch04_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'यह नोड 1942-भागदौड़ तक सीमित — मेडल-टाइममशीन नोड 8 में।',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c9_hin_ga_ch04'],
    nodeIds: ['c9_hin_ga_cbse_04_007', 'c9_hin_ga_cbse_04_008', 'c9_hin_ga_cbse_04_009', 'c9_hin_ga_cbse_04_010', 'c9_hin_ga_cbse_04_011', 'c9_hin_ga_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '**तुम्हारे लिए:** इस नोड में तुम 1942-तीन-नुकसान, तीन-स्टूडियो-चक्कर और एकही-सुध-सुरंग सीखोगे। **पुनःस्मरण:**.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — गौण विषय', text: '1942-स्टूडियो-भागदौड़ — टूट-3 + ताने-3 + चक्कर-3 + सुध-3 + नक्शा-3: टूट[\'पिता-+कंपनी-+छत-तीन-नुकसान-1-दिन-तेरह-उम्र-दो-काम\'].', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — गौण', 'पाठ 4 — साहित्यिक', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 2/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — \'साँवले सपनों की याद\' में भाषा-प्रयोग — महात्मा गांधी (आत्मकथा) ने कैसे शब्द, वाक्य और.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — \'साँवले सपनों की याद\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_04_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_007', difficulty: 'standard',
          question: '1942-स्टूडियो-भागदौड़ — टूट-3 + ताने-3 + चक्कर-3 + सुध-3 + नक्शा-3.',
          hint: 'यदि अटका हुआ महसूस हो तो: नुकसान-1 + चक्कर-1 + उल्टा-1 — तीन-नुकसान-एक-दिन.',
          misconception: 'छात्र \'गाना-उसकी-कला-थी-रोटी-नहीं\' समझते हैं — राशन-अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '1942-स्टूडियो-भागदौड़',
                  options: ['1942-स्टूडियो-भागदौड़', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो: नुकसान-1 + चक्कर-1 + उल्टा-1 — तीन-नुकसान-एक-दिन, तीन-स्टूडियो-गोल-दिन.',
                  misconception: 'छात्र \'गाना-उसकी-कला-थी-रोटी-नहीं\' समझते हैं — राशन-अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) नुकसान-1 — तीन-गए-तेरह-उम्र-दो-काम-1-टूट। (2) चक्कर-1 — तीन-स्टूडियो-गोल-दिन-चार-क़ीमत-1-परिक्रमा। (3).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_008', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि "उपमा vs रूपक" का भेद धुंधला है, तो कक्षा 8 की हिंदी व्याकरण पुस्तक का **अलंकार.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **हर तुलना रूपक है** और **"जैसे/वैसे/सा/तुल्य" वाले पदबंध भी रूपक ही हैं**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' में बिंब (imagery)',
                  options: ['\'साँवले सपनों की याद\' में बिंब (imagery)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि "उपमा vs रूपक" का भेद धुंधला है, तो कक्षा 8 की हिंदी व्याकरण पुस्तक का **अलंकार अध्याय (उपमा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **हर तुलना रूपक है** और **"जैसे/वैसे/सा/तुल्य" वाले पदबंध भी रूपक ही हैं**। वे "रूपक = तुलना" का.' }
          ],
            remediations: { 'identification-equation-similarity': { steps: ['**चरण 1:** छात्र को दो वाक्य दें — "चाँद **जैसा** सुंदर मुख" और "मुख **चाँद है**" — और पूछें: "पहले में चाँद और मुख.', 'दूसरे में?" — जब वह बोले "दूसरे में एक हो गए", तब कहें: "यही **आरोप** है, यही रूपक की परिभाषा है।" 2.', '**चरण 2:** उसे 5 वाक्य दें (मिश्रित: उपमा, रूपक, उत्प्रेक्षा) और कहें: "केवल वही छाँटो जहाँ \'है/था/थी/हैं\' से **सीधा.', '**चरण 3:** उससे कहें: "अब एक रूपक खुद बनाओ जहाँ तुम किसी भावना (डर/खुशी/गुस्सा) को कोई वस्तु/जीव **कह दो** (जैसे: डर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_009', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका लगे तो c9_hin_ga_cbse_04_008 के \'रूपक का विस्तारित अर्थ\' वाले भाग को दोहराएँ.',
          misconception: 'छात्र समझते हैं कि **हर विरोधी कथन विरोधाभास है** (जैसे "दिन को रात कहना") — जबकि विरोधाभास के लिए **आंतरिक तर्कसंगति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' में विरोधाभास',
                  options: ['\'साँवले सपनों की याद\' में विरोधाभास', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका लगे तो c9_hin_ga_cbse_04_008 के \'रूपक का विस्तारित अर्थ\' वाले भाग को दोहराएँ — वही सोच.',
                  misconception: 'छात्र समझते हैं कि **हर विरोधी कथन विरोधाभास है** (जैसे "दिन को रात कहना") — जबकि विरोधाभास के लिए **आंतरिक तर्कसंगति (internal logic)**.' }
          ],
            remediations: { 'internal-logic': { steps: ['छात्र को दो वाक्य दें: एक साधारण विरोधी कथन ("वह अमीर है पर गरीब लगता है") और एक वास्तविक विरोधाभास ("उसकी गरीबी ही.', 'पाठ से तीन प्रसंग निकालें जहाँ एक ही वस्तु (जैसे नदी, दीया, पुराना पत्र) आई हो — छात्र से कहें: "हर बार इसका अर्थ लिखो".', 'बोर्ड उत्तर ढाँचा दें: **पॉइंट → पाठ-साक्ष्य → व्याख्या → विषय से जुड़ाव** — दो-तीन बार अभ्यास कराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_010', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो नोड 04_006 (मुख्य विषय और संदेश) पर लौटें — विषय स्पष्ट होते ही विषय-वाहक.',
          misconception: 'छात्र मानते हैं कि \'मुख्य शब्द\' वही हैं जो पाठ में सबसे अधिक बार आए हैं (आवृत्ति/ frequency के आधार पर)। जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' की पदावली',
                  options: ['\'साँवले सपनों की याद\' की पदावली', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो नोड 04_006 (मुख्य विषय और संदेश) पर लौटें — विषय स्पष्ट होते ही विषय-वाहक शब्द दिखने.',
                  misconception: 'छात्र मानते हैं कि \'मुख्य शब्द\' वही हैं जो पाठ में सबसे अधिक बार आए हैं (आवृत्ति/ frequency के आधार पर)। जबकि वास्तविकता यह है कि कई बार एक.' }
          ],
            remediations: { 'frequency': { steps: ['चरण 1: छात्र को पाठ का एक छोटा अंश (5-6 वाक्य) दें और कहें: \'केवल 3 शब्द चुनो जिन्हें हटाने से इस अंश का अर्थ सबसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_011', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' में भाषा-प्रयोग — महात्मा गांधी (आत्मकथा) ने कैसे शब्द.',
          hint: 'यदि छात्र अटक जाए तो **कक्षा 8 के "भाषा और व्याकरण" अध्याय** के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है — **पाठ से कठिन शब्द छाँटकर उनके अर्थ/पर्यायवाची.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' में भाषा-प्रयोग',
                  options: ['\'साँवले सपनों की याद\' में भाषा-प्रयोग', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र अटक जाए तो **कक्षा 8 के "भाषा और व्याकरण" अध्याय** के मुहावरा/लोकोक्ति/अलंकार/वाक्य-रचना.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है — **पाठ से कठिन शब्द छाँटकर उनके अर्थ/पर्यायवाची लिख देना** या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**छोटे अंश (2-3 पंक्तियाँ) दें** — छात्र से कहें: "यहाँ कौन-से शब्द/वाक्य तुम्हें \'विशेष/सुंदर/अजीब\' लगे?', 'रेखांकित करो।" (पहचान का आत्मविश्वास)। 2.', '**प्रत्येक रेखांकित अंश के लिए तीन प्रश्न पूछें:** (अ) यह सामान्य शब्द/वाक्य से कैसे अलग है?', '(मुहावरा/अलंकार/वाक्य-रचना)। (स) यदि लेखक इसकी जगह साधारण शब्द रख देता तो क्या अंतर पड़ता?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_012', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फंसे हों, तो **कथानक-सार (Plot Summary) बिंदुवार लिखें** और प्रत्येक घटना के आगे.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आशय-सूचक प्रश्न का उत्तर मेरी **व्यक्तिगत राय (Personal Opinion)** है" और लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'साँवले सपनों की याद\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हों, तो **कथानक-सार (Plot Summary) बिंदुवार लिखें** और प्रत्येक घटना के आगे लिखें: "यह.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आशय-सूचक प्रश्न का उत्तर मेरी **व्यक्तिगत राय (Personal Opinion)** है" और लिख देते हैं "मुझे लगता.' }
          ],
            remediations: { 'personal-opinion': { steps: ['**चरण 1 (पहचान):** छात्र को 5 प्रश्न दो — 3 वस्तुनिष्ठ, 2 आशय-सूचक। उससे पूछो: "कौन सा किस प्रकार का है और क्यों?" यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
