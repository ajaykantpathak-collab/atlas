import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch10_p2: SimDef = {
    id: 'v3_c11_hin_a_ch10_p2',
    title: 'पाठ 10 · Part 2/3',
    subtitle: 'This node covers identification, classification, and analytical explanation of sub-themes.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 10 · Part 2/3',
    chapters: ['c11_hin_a_ch10'],
    nodeIds: ['c11_hin_a_cbse_10_007', 'c11_hin_a_cbse_10_008', 'c11_hin_a_cbse_10_009', 'c11_hin_a_cbse_10_010', 'c11_hin_a_cbse_10_011', 'c11_hin_a_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'वह सिंह है\' में वह-सिंह-है जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — गौण विषय', text: '\'वह सिंह है\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — गौण', 'पाठ 10 — साहित्यिक', 'पाठ 10 — पदावली', 'पाठ 10 — व्याकरण', 'पाठ 10 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 2/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — \'वह सिंह है\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '10 -', options: ['10 -', '10 - -'] },
            { id: 's2', label: '10 - -', prompt: 'Which idea is this? — \'वह सिंह है\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '10 - -', options: ['10 - -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 10 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 10 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 10 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_007', difficulty: 'standard',
          question: '\'वह सिंह है\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'Review the difference between \'कथानक (Plot)\' and \'विषय (Theme)\' using node.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी प्रायः **\'गौण विषय\' (Sub-theme)** को **\'उपकथानक\' (Sub-plot)** समझ लेते हैं। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वह सिंह है\' के गौण विषय',
                  options: ['\'वह सिंह है\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वह सिंह है\' का कथानक', '\'वह सिंह है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review the difference between \'कथानक (Plot)\' and \'विषय (Theme)\' using node `c11_hin_a_cbse_10_002`.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी प्रायः **\'गौण विषय\' (Sub-theme)** को **\'उपकथानक\' (Sub-plot)** समझ लेते हैं। वे लिखते हैं: "गौण विषय वह है जब.' }
          ],
            remediations: { 'sub-theme-sub-plot-sub': { steps: ['**पहला कदम:** विद्यार्थी से कहें: "पाठ 10 के 3 प्रमुख पात्र चुनो। प्रत्येक के लिए एक वाक्य में लिखो: \'इस पात्र के.', '**दूसरा कदम:** उनसे पूछें: "क्या यह विचार पाठ के आरंभ, मध्य, अंत — तीनों में किसी न किसी रूप में आता है?" यदि हाँ → गौण.', '**तीसरा कदम:** बोर्ड परीक्षा के 2-3 विगत वर्षों के प्रश्न दिखाएँ जहाँ \'गौण विषय\' पूछा गया हो। उनके मॉडल उत्तर में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_008', difficulty: 'standard',
          question: '\'वह सिंह है\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि **उपमेय-उपमान अलग करने** में अटके → कक्षा 10 की अलंकार अभ्यास पुस्तिका के **रूपक वाले.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **रूपक** को **उपमा का संक्षिप्त रूप** मात्र समझते हैं ("बस \'जैसे\' हटा दो") और मानते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वह सिंह है\' में बिंब (imagery)',
                  options: ['\'वह सिंह है\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वह सिंह है\' का कथानक', '\'वह सिंह है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि **उपमेय-उपमान अलग करने** में अटके → कक्षा 10 की अलंकार अभ्यास पुस्तिका के **रूपक वाले 10.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **रूपक** को **उपमा का संक्षिप्त रूप** मात्र समझते हैं ("बस \'जैसे\' हटा दो") और मानते हैं कि दोनों का **अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**दृश्यीकरण अभ्यास (Visualization Drill):** छात्र को दो वाक्य दें — "वह शेर जैसा बहादुर है" (उपमा) व "वह शेर है".', '**गुण-मानचित्रण (Attribute Mapping):** रूपक "जीवन नदी है" लें। बोर्ड पर दो कॉलम बनाएँ: नदी के गुण (बहना, मोड़, गहराई.', '**पुनर्लेखन (Rewriting):** किसी कविता के 2 रूपकों को उपमा में बदलवाएँ और पूछें: "क्या **अर्थ/प्रभाव** वही रहा?" — अंतर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_009', difficulty: 'standard',
          question: '\'वह सिंह है\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो c11_hin_a_cbse_10_008 (बिंब और रूपक) के \'रूपक के प्रकार\' और \'बिंब के.',
          misconception: 'छात्र अक्सर मान लेते हैं कि हर रूपक (Metaphor) प्रतीक (Symbol) होता है, और हर विरोधाभासी वाक्य विरोधाभास (Paradox) होता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वह सिंह है\' में विरोधाभास',
                  options: ['\'वह सिंह है\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वह सिंह है\' का कथानक', '\'वह सिंह है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_10_008 (बिंब और रूपक) के \'रूपक के प्रकार\' और \'बिंब के इंद्रियगत.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि हर रूपक (Metaphor) प्रतीक (Symbol) होता है, और हर विरोधाभासी वाक्य विरोधाभास (Paradox) होता है। उदाहरण: "वह शेर.' }
          ],
            remediations: { 'metaphor-symbol': { steps: ['चरण 1: छात्र से कहें कि वह पाठ से तीन वाक्य चुने — एक रूपक, एक प्रतीक, एक विरोधाभास — और तीनों को अगल-बगल रखकर लिखे।.', 'कौन-सा सांस्कृतिक अर्थ रखता है?', 'कौन-सा पहली नज़र में गलत लगकर भी सोचने पर सही लगता है?" चरण 3: एक तालिका बनवाएँ: स्तंभ — युक्ति / शाब्दिक अर्थ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_010', difficulty: 'standard',
          question: '\'वह सिंह है\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि छात्र मुख्य शब्द पहचानने में कठिनाई महसूस कर रहा है, तो उन्हें पाठ के मुख्य विषय और.',
          misconception: 'छात्र अक्सर मानते हैं कि पदावली में दिए गए शब्दों के पर्यायवाची और विलोम को किसी भी वाक्य में interchangeably प्रयोग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वह सिंह है\' की पदावली',
                  options: ['\'वह सिंह है\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वह सिंह है\' का कथानक', '\'वह सिंह है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र मुख्य शब्द पहचानने में कठिनाई महसूस कर रहा है, तो उन्हें पाठ के मुख्य विषय और संदेश (नोड.',
                  misconception: 'छात्र अक्सर मानते हैं कि पदावली में दिए गए शब्दों के पर्यायवाची और विलोम को किसी भी वाक्य में interchangeably प्रयोग किया जा सकता है, जैसे.' }
          ],
            remediations: { 'interchangeably': { steps: ['छात्र को दो वाक्य दिखाइए: "पिता ने अपने सपनों का त्याग किया।" और "पिता ने अपने सपनों का बलिदान किया।" फिर पूछिए कि क्या.', 'फिर स्पष्ट कीजिए कि "त्याग" सामान्य परित्याग है, जबकि "बलिदान" अक्सर भावनात्मक या आध्यात्मिक मूल्य जुड़ा होता है। अंत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_011', difficulty: 'standard',
          question: '\'वह सिंह है\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_10_008 (बिंब और रूपक)** और **c11_hin_a_cbse_10_010.',
          misconception: '**विशिष्ट भ्रांति:** "भाषा-प्रयोग का विश्लेषण = अलंकारों की सूची बनाना।" **गलत तर्क:** छात्र पाठ में रूपक, उपमा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वह सिंह है\' में भाषा-प्रयोग',
                  options: ['\'वह सिंह है\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वह सिंह है\' का कथानक', '\'वह सिंह है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_10_008 (बिंब और रूपक)** और **c11_hin_a_cbse_10_010 (पदावली)** पर लौटें.',
                  misconception: '**विशिष्ट भ्रांति:** "भाषा-प्रयोग का विश्लेषण = अलंकारों की सूची बनाना।" **गलत तर्क:** छात्र पाठ में रूपक, उपमा, अनुप्रास गिन लेते हैं और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पृथक्करण अभ्यास:** छात्र को पाठ 10 के 5 छोटे अंश दें — प्रत्येक में **एक ही अलंकार** (जैसे रूपक) अलग-अलग प्रसंग में.', '**अलंकारेतर खोज:** उसी पाठ से 3 अंश चुनें जहाँ **कोई अलंकार न हो** लेकिन भाषा असरदार हो (वाक्य-लंबाई, शब्द-चयन, बोली.', '**PEEL पुनर्लेखन:** छात्र के पिछले उत्तर लें, उन्हें PEEL संरचना में ढालने को कहें — विशेषकर **Explanation** और.', '**तुलनात्मक मिनी-निबंध:** 150 शब्दों में लिखवाएँ: "पाठ 10 में भाषा-प्रयोग कथावस्तु का सहायक मात्र नहीं, स्वयं कथावस्तु.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_10_012', difficulty: 'standard',
          question: '\'वह सिंह है\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि छात्र मुख्य विषय पहचानने में कठिनाई महसूस कर रहा है, तो उसे पाठ 10 — मुख्य विषय और.',
          misconception: 'छात्र अक्सर सोचते हैं कि आशय-सूचक प्रश्नों का उत्तर देने के लिए उन्हें पाठ की अतिरिक्त पंक्तियों को याद करके या सामान्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वह सिंह है\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'वह सिंह है\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वह सिंह है\' का कथानक', '\'वह सिंह है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र मुख्य विषय पहचानने में कठिनाई महसूस कर रहा है, तो उसे पाठ 10 — मुख्य विषय और संदेश (नोड.',
                  misconception: 'छात्र अक्सर सोचते हैं कि आशय-सूचक प्रश्नों का उत्तर देने के लिए उन्हें पाठ की अतिरिक्त पंक्तियों को याद करके या सामान्य ज्ञान का उपयोग करके.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस गलती को सुधारने के लिए, छात्र को बताइए कि वह पहले पाठ को दो बार पढ़े - पहली बार सिर्फ समझने के लिए और दूसरी बार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
