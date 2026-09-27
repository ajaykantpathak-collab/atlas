import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch04_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'इस नोड में केवल \'गौण विषय\' की पहचान, वर्गीकरण (सामाजिक/मनोवैज्ञानिक/प्रतीकात्मक), मुख्य.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c9_hin_ga_ch04'],
    nodeIds: ['c9_hin_ga_cbse_04_007', 'c9_hin_ga_cbse_04_008', 'c9_hin_ga_cbse_04_009', 'c9_hin_ga_cbse_04_010', 'c9_hin_ga_cbse_04_011', 'c9_hin_ga_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'क्या तुमने कभी गौर किया कि किसी उपन्यास/कहानी में हीरो की मुख्य लड़ाई के साथ-साथ उसकी बहन की शादी की चिंता.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ उसे विस्तार, गहराई, विरोधाभास या सामाजिक-सांस्कृतिक संदर्भ प्रदान करता है, किंतु पाठ का केंद्रीय विचार नहीं होता।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — गौण', 'पाठ 4 — साहित्यिक', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 2/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — "पाठ में भाषा-प्रयोग" से तात्पर्य है — किसी रचना में प्रयुक्त **शब्दावली (पदावली).', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective Questions) वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से.', answer: '4 - -', options: ['4 - -', '4 -'] }
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
          question: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ.',
          hint: 'यदि अटके: नोड 006 (मुख्य विषय) के \'WORKED_EXAMPLE_1\' को दोहराएँ — मुख्य विषय को 4-चरणीय.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय\' = \'कम महत्वपूर्ण प्रसंग\'। वास्तव में, गौण विषय प्रायः मुख्य विषय से अधिक जटिल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ उसे',
                  options: ['गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ उसे', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें'],
                  hint: 'यदि अटके: नोड 006 (मुख्य विषय) के \'WORKED_EXAMPLE_1\' को दोहराएँ — मुख्य विषय को 4-चरणीय PEEL संरचना.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय\' = \'कम महत्वपूर्ण प्रसंग\'। वास्तव में, गौण विषय प्रायः मुख्य विषय से अधिक जटिल, सामाजिक-राजनीतिक रूप से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "पाठ के 3 प्रसंग चुनो जो नायक की मुख्य लड़ाई से सीधे न जुड़े हों। प्रत्येक के लिए लिखो: (क) क्या हो रहा.', 'फिर पूछो: "इनमें से कौन-सा प्रसंग मुख्य विषय को और बड़ा/जटिल बनाता है?', 'अब समझाओ: "जो प्रसंग मुख्य विषय को बड़ा/जटिल बनाता है, वही गौण विषय है — \'कम महत्वपूर्ण\' नहीं, \'अलग कोण\'।" 4.', 'अंत में: एक मॉडल उत्तर दिखाओ जहाँ गौण विषय का नाम, प्रमाण, और मुख्य विषय से संबंध — तीनों हों।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_008', difficulty: 'standard',
          question: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक.',
          hint: 'यदि "उपमा vs रूपक" का भेद धुंधला है, तो कक्षा 8 की हिंदी व्याकरण पुस्तक का **अलंकार.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **हर तुलना रूपक है** और **"जैसे/वैसे/सा/तुल्य" वाले पदबंध भी रूपक ही हैं**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक की पाँचों',
                  options: ['बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक की पाँचों', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें'],
                  hint: 'यदि "उपमा vs रूपक" का भेद धुंधला है, तो कक्षा 8 की हिंदी व्याकरण पुस्तक का **अलंकार अध्याय (उपमा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **हर तुलना रूपक है** और **"जैसे/वैसे/सा/तुल्य" वाले पदबंध भी रूपक ही हैं**। वे "रूपक = तुलना" का.' }
          ],
            remediations: { 'identification-equation-similarity': { steps: ['**चरण 1:** छात्र को दो वाक्य दें — "चाँद **जैसा** सुंदर मुख" और "मुख **चाँद है**" — और पूछें: "पहले में चाँद और मुख.', 'दूसरे में?" — जब वह बोले "दूसरे में एक हो गए", तब कहें: "यही **आरोप** है, यही रूपक की परिभाषा है।" 2.', '**चरण 2:** उसे 5 वाक्य दें (मिश्रित: उपमा, रूपक, उत्प्रेक्षा) और कहें: "केवल वही छाँटो जहाँ \'है/था/थी/हैं\' से **सीधा.', '**चरण 3:** उससे कहें: "अब एक रूपक खुद बनाओ जहाँ तुम किसी भावना (डर/खुशी/गुस्सा) को कोई वस्तु/जीव **कह दो** (जैसे: डर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें कथन या स्थिति पहली.',
          hint: 'यदि अटका लगे तो c9_hin_ga_cbse_04_008 के \'रूपक का विस्तारित अर्थ\' वाले भाग को दोहराएँ.',
          misconception: 'छात्र समझते हैं कि **हर विरोधी कथन विरोधाभास है** (जैसे "दिन को रात कहना") — जबकि विरोधाभास के लिए **आंतरिक तर्कसंगति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें कथन या स्थिति पहली नज़र में',
                  options: ['**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें कथन या स्थिति पहली नज़र में', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें'],
                  hint: 'यदि अटका लगे तो c9_hin_ga_cbse_04_008 के \'रूपक का विस्तारित अर्थ\' वाले भाग को दोहराएँ — वही सोच.',
                  misconception: 'छात्र समझते हैं कि **हर विरोधी कथन विरोधाभास है** (जैसे "दिन को रात कहना") — जबकि विरोधाभास के लिए **आंतरिक तर्कसंगति (internal logic)**.' }
          ],
            remediations: { 'internal-logic': { steps: ['छात्र को दो वाक्य दें: एक साधारण विरोधी कथन ("वह अमीर है पर गरीब लगता है") और एक वास्तविक विरोधाभास ("उसकी गरीबी ही.', 'पाठ से तीन प्रसंग निकालें जहाँ एक ही वस्तु (जैसे नदी, दीया, पुराना पत्र) आई हो — छात्र से कहें: "हर बार इसका अर्थ लिखो".', 'बोर्ड उत्तर ढाँचा दें: **पॉइंट → पाठ-साक्ष्य → व्याख्या → विषय से जुड़ाव** — दो-तीन बार अभ्यास कराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वे विशिष्ट, अर्थ-गर्भित शब्द होते हैं जो किसी रचना के.',
          hint: 'यदि अटके तो नोड 04_006 (मुख्य विषय और संदेश) पर लौटें — विषय स्पष्ट होते ही विषय-वाहक.',
          misconception: 'छात्र मानते हैं कि \'मुख्य शब्द\' वही हैं जो पाठ में सबसे अधिक बार आए हैं (आवृत्ति/ frequency के आधार पर)। जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वे विशिष्ट, अर्थ-गर्भित शब्द होते हैं जो किसी रचना के केंद्रीय विषय,',
                  options: ['पदावली: मुख्य शब्द वे विशिष्ट, अर्थ-गर्भित शब्द होते हैं जो किसी रचना के केंद्रीय विषय,', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें'],
                  hint: 'यदि अटके तो नोड 04_006 (मुख्य विषय और संदेश) पर लौटें — विषय स्पष्ट होते ही विषय-वाहक शब्द दिखने.',
                  misconception: 'छात्र मानते हैं कि \'मुख्य शब्द\' वही हैं जो पाठ में सबसे अधिक बार आए हैं (आवृत्ति/ frequency के आधार पर)। जबकि वास्तविकता यह है कि कई बार एक.' }
          ],
            remediations: { 'frequency': { steps: ['चरण 1: छात्र को पाठ का एक छोटा अंश (5-6 वाक्य) दें और कहें: \'केवल 3 शब्द चुनो जिन्हें हटाने से इस अंश का अर्थ सबसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_011', difficulty: 'standard',
          question: '"पाठ में भाषा-प्रयोग" से तात्पर्य है — किसी रचना में प्रयुक्त **शब्दावली.',
          hint: 'यदि छात्र अटक जाए तो **कक्षा 8 के "भाषा और व्याकरण" अध्याय** के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है — **पाठ से कठिन शब्द छाँटकर उनके अर्थ/पर्यायवाची.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ में भाषा-प्रयोग" से तात्पर्य है',
                  options: ['"पाठ में भाषा-प्रयोग" से तात्पर्य है', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें'],
                  hint: 'यदि छात्र अटक जाए तो **कक्षा 8 के "भाषा और व्याकरण" अध्याय** के मुहावरा/लोकोक्ति/अलंकार/वाक्य-रचना.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है — **पाठ से कठिन शब्द छाँटकर उनके अर्थ/पर्यायवाची लिख देना** या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**छोटे अंश (2-3 पंक्तियाँ) दें** — छात्र से कहें: "यहाँ कौन-से शब्द/वाक्य तुम्हें \'विशेष/सुंदर/अजीब\' लगे?', 'रेखांकित करो।" (पहचान का आत्मविश्वास)। 2.', '**प्रत्येक रेखांकित अंश के लिए तीन प्रश्न पूछें:** (अ) यह सामान्य शब्द/वाक्य से कैसे अलग है?', '(मुहावरा/अलंकार/वाक्य-रचना)। (स) यदि लेखक इसकी जगह साधारण शब्द रख देता तो क्या अंतर पड़ता?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे प्रश्न हैं जिनका उत्तर पाठ में.',
          hint: 'यदि फंसे हों, तो **कथानक-सार (Plot Summary) बिंदुवार लिखें** और प्रत्येक घटना के आगे.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आशय-सूचक प्रश्न का उत्तर मेरी **व्यक्तिगत राय (Personal Opinion)** है" और लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें'],
                  hint: 'यदि फंसे हों, तो **कथानक-सार (Plot Summary) बिंदुवार लिखें** और प्रत्येक घटना के आगे लिखें: "यह.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आशय-सूचक प्रश्न का उत्तर मेरी **व्यक्तिगत राय (Personal Opinion)** है" और लिख देते हैं "मुझे लगता.' }
          ],
            remediations: { 'personal-opinion': { steps: ['**चरण 1 (पहचान):** छात्र को 5 प्रश्न दो — 3 वस्तुनिष्ठ, 2 आशय-सूचक। उससे पूछो: "कौन सा किस प्रकार का है और क्यों?" यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
