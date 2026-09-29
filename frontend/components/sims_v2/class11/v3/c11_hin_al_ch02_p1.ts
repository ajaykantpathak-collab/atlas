import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_al_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_al_ch02_p1: SimDef = {
    id: 'v3_c11_hin_al_ch02_p1',
    title: 'आवारा मसीहा · Part 1/3',
    subtitle: 'इस नोड में लेखक जॉन स्टीनबेक के जीवन, 1930 के दशक के अमेरिका में आर्थिक मंदी का प्रभाव.',
    classLevel: 11, subject: 'hin_al', topic: 'आवारा मसीहा · Part 1/3',
    chapters: ['c11_hin_al_ch02'],
    nodeIds: ['c11_hin_al_cbse_02_001', 'c11_hin_al_cbse_02_002', 'c11_hin_al_cbse_02_003', 'c11_hin_al_cbse_02_004', 'c11_hin_al_cbse_02_005', 'c11_hin_al_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'अंतराल भाग-1 खोलिए और पाठ 02 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'आवारा मसीहा — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_al_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['आवारा मसीहा — पृष्ठभूमि', 'आवारा मसीहा — कथानक', 'आवारा मसीहा — पाठ्य-परिवेश', 'आवारा मसीहा — पात्र-चित्रण', 'आवारा मसीहा — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_al_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through आवारा मसीहा like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? आवारा मसीहा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आवारा मसीहा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review the basic plot of "Awaara Masihah" from Class 10 supplementary readings.',
          misconception: 'छात्र अक्सर मानते हैं कि "आवारा मसीहा" शीर्षक केवल लैनी के शारीरिक रूप से घूमने-फिरने से संबंधित है, जैसे कि वह बिना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आवारा मसीहा\' का कथानक', '\'आवारा मसीहा\' का पाठ्य-परिवेश (setting)', '\'आवारा मसीहा\' का पात्र-चित्रण'],
                  hint: 'If stuck, review the basic plot of "Awaara Masihah" from Class 10 supplementary readings or summary.',
                  misconception: 'छात्र अक्सर मानते हैं कि "आवारा मसीहा" शीर्षक केवल लैनी के शारीरिक रूप से घूमने-फिरने से संबंधित है, जैसे कि वह बिना लक्ष्य के इधर-उधर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि क्या एक अमीर आदमी जो लगातार यात्रा करता है, उसे \'आवारा\' कहा जाएगा?', 'जब वे कहेंगे नहीं, तो समझाइए कि \'आवारा\' का अर्थ केवल शारीरिक गति नहीं, बल्कि सुरक्षा, स्थिरता, और सामाजिक संबद्धता की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_002', difficulty: 'standard',
          question: '\'आवारा मसीहा\' का कथानक — \'आवारा मसीहा\' — अंतराल भाग-1 का पाठ। पाठ का कथानक.',
          hint: 'अगर फँस जाएँ तो **\'फ्रेम नैरेटिव\' (Frame Narrative)** और **\'फ्लैशबैक\'.',
          misconception: 'छात्र अक्सर समझते हैं कि **\'कथानक\' और \'आख्यान-संरचना\' एक ही चीज़ के दो नाम हैं** — वे परीक्षा में पूछे जाने पर घटनाओं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आवारा मसीहा\' का कथानक',
                  options: ['\'आवारा मसीहा\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आवारा मसीहा\' का पाठ्य-परिवेश (setting)', '\'आवारा मसीहा\' का पात्र-चित्रण'],
                  hint: 'अगर फँस जाएँ तो **\'फ्रेम नैरेटिव\' (Frame Narrative)** और **\'फ्लैशबैक\' (Flashback/Analepsis)** की.',
                  misconception: 'छात्र अक्सर समझते हैं कि **\'कथानक\' और \'आख्यान-संरचना\' एक ही चीज़ के दो नाम हैं** — वे परीक्षा में पूछे जाने पर घटनाओं का सारांश (Summary).' }
          ],
            remediations: { 'summary': { steps: ['**चरण 1 (अवधारणा स्पष्टीकरण):** छात्र के साथ बैठकर एक सरल उदाहरण लें — फिल्म *शोले* या *बाहुबली* का। पूछें: "फिल्म का.', '(गब्बर का ठहाका / महिष्मती का झरना)। क्या कहानी यहीं से शुरू हुई थी?" — इससे **\'घटनाक्रम\' vs \'प्रस्तुति-क्रम\'** का भेद.', '**चरण 2 (पाठ पर लागू करें):** \'आवारा मसीहा\' के **अध्याय 1 और अध्याय 4** साथ खोलें। छात्र से कहें: "दोनों में समय और.', '**चरण 3 (लिखित अभ्यास):** छात्र से कहें: "शरतचंद्र के जीवन की 3 घटनाएँ कालानुक्रम में लिखो, फिर बताओ उपन्यास में वे किस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_003', difficulty: 'standard',
          question: '\'आवारा मसीहा\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि अटके तो **c11_hin_al_cbse_02_002 (कथानक और आख्यान-संरचना)** के \'प्रमुख घटना-चक्र\' को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आवारा मसीहा\' में परिवेश **स्थैतिक पृष्ठभूमि (static backdrop)** है — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आवारा मसीहा\' का पाठ्य-परिवेश (setting)',
                  options: ['\'आवारा मसीहा\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आवारा मसीहा\' का कथानक', '\'आवारा मसीहा\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **c11_hin_al_cbse_02_002 (कथानक और आख्यान-संरचना)** के \'प्रमुख घटना-चक्र\' को दोहराएं और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आवारा मसीहा\' में परिवेश **स्थैतिक पृष्ठभूमि (static backdrop)** है — जैसे स्टेज पर लगा पर्दा.' }
          ],
            remediations: { 'static-backdrop-dynamic-force': { steps: ['**चरणबद्ध उपचार:** (1) छात्र से कहें: **"उपन्यास के किसी एक अध्याय (जैसे: \'शांतिनिकेतन\' या \'अकाल\') को चुनें और केवल.', 'क्यों/क्यों नहीं?"** (3) अब **कारण-कार्य तालिका** बनाएं: *परिवेश तत्व → शरत की प्रतिक्रिया → दीर्घकालिक प्रभाव*। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_004', difficulty: 'standard',
          question: '\'आवारा मसीहा\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि फँसें तो: **c11_hin_al_cbse_02_002 (कथानक)** के \'प्रमुख मोड़\' खंड को दोहराएँ और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र शरतचंद्र के \'आवारा\' शब्द को **नकारात्मक/शाब्दिक अर्थ** (बेकार, उद्देश्यहीन भटकने वाला) में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आवारा मसीहा\' का पात्र-चित्रण',
                  options: ['\'आवारा मसीहा\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आवारा मसीहा\' का कथानक', '\'आवारा मसीहा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो: **c11_hin_al_cbse_02_002 (कथानक)** के \'प्रमुख मोड़\' खंड को दोहराएँ और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र शरतचंद्र के \'आवारा\' शब्द को **नकारात्मक/शाब्दिक अर्थ** (बेकार, उद्देश्यहीन भटकने वाला) में ले लेते हैं और उनके.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**शीर्षक-विमर्श (5 मिनट):** छात्र से पूछें — "यदि कोई डॉक्टर अच्छी नौकरी छोड़कर झुग्गियों में मुफ्त इलाज करे, तो क्या.', 'क्यों/क्यों नहीं?" → \'आवारा\' की परिभाषा सामाजिक मानदंड से हटाकर **मूल्य-आधारित** करें। 2.', '**पाठ्य-साक्ष्य मिलान (10 मिनट):** पाठ से 3 प्रसंग दें जहाँ शरतचंद्र \'सुरक्षित रास्ता\' छोड़कर \'कठिन रास्ता\' चुनते हैं।.', 'कौन-सा मूल्य सधा?" → तालिका बनवाएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_005', difficulty: 'standard',
          question: '\'आवारा मसीहा\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटका हुआ महसूस हो तो नोड 002 (कथानक) के \'पात्र-प्रवेश तालिका\' (character entry log).',
          misconception: 'छात्र प्रायः सहायक पात्रों को \'कथानक के सहारे\' (plot devices) मानकर उनके \'व्यक्तिगत संघर्ष\' और \'प्रतीकात्मक अर्थ\' की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आवारा मसीहा\' के सहायक पात्र',
                  options: ['\'आवारा मसीहा\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आवारा मसीहा\' का कथानक', '\'आवारा मसीहा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड 002 (कथानक) के \'पात्र-प्रवेश तालिका\' (character entry log) को दोबारा.',
                  misconception: 'छात्र प्रायः सहायक पात्रों को \'कथानक के सहारे\' (plot devices) मानकर उनके \'व्यक्तिगत संघर्ष\' और \'प्रतीकात्मक अर्थ\' की उपेक्षा करते हैं।.' }
          ],
            remediations: { 'plot-devices': { steps: ['छात्र से कहें: "पाठ से उस एक प्रसंग को ढूंढ़ो जहाँ यह पात्र शरत की अनुपस्थिति में भी अपने आप में पूर्ण लगता हो—उसके.', 'फिर पूछें: "यह पात्र उस युग के किस सामाजिक समूह/वर्ग/लिंग का प्रतिनिधित्व करता है?', 'महादेवी ने इसे क्यों चुना?" 3.', 'अंत में, छात्र से एक T-चार्ट बनवाएँ: बाएँ कॉलम में \'पात्र के कृत्य/संवाद\', दाएँ में \'शरत पर प्रभाव\' और \'प्रतीकात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_006', difficulty: 'standard',
          question: '\'आवारा मसीहा\' का मुख्य विषय — \'आवारा मसीहा\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_al_cbse_02_002 (कथानक और आख्यान-संरचना)** के \'प्रमुख.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आवारा मसीहा\' का मुख्य विषय **\'शरतचंद्र का महान व्यक्तित्व\'** या **\'उनकी जीवनीय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आवारा मसीहा\' का मुख्य विषय',
                  options: ['\'आवारा मसीहा\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आवारा मसीहा\' का कथानक', '\'आवारा मसीहा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_al_cbse_02_002 (कथानक और आख्यान-संरचना)** के \'प्रमुख मोड़\' खंड.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आवारा मसीहा\' का मुख्य विषय **\'शरतचंद्र का महान व्यक्तित्व\'** या **\'उनकी जीवनीय संघर्ष-गाथा\'** है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**शीर्षक-विमर्श (10 मिनट):** छात्र से पूछें — "यदि शीर्षक केवल \'शरतचंद्र\' होता, तो विषय क्या होता?', '\'आवारा मसीहा\' क्यों रखा गया?" — उन्हें **\'व्यक्ति\' बनाम \'प्रतीक\'** का अंतर लिखवाएं। 2.', '**विषय-निष्कर्षण अभ्यास (15 मिनट):** पाठ के 5 प्रमुख प्रसंग दें (जैसे: शरतचंद्र का घर छोड़ना, \'चरित्रहीन\' लेखन.', '**PEEL-मॉडलिंग (10 मिनट):** एक कमजोर उत्तर ("शरतचंद्र अच्छे लेखक थे क्योंकि उन्होंने स्त्रियों पर लिखा") और एक सशक्त.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
