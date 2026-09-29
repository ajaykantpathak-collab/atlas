import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch07_p2: SimDef = {
    id: 'v3_c11_hin_a_ch07_p2',
    title: 'पाठ 7 · Part 2/3',
    subtitle: 'This node covers the identification, analysis, and textual substantiation of **Secondary.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 7 · Part 2/3',
    chapters: ['c11_hin_a_ch07'],
    nodeIds: ['c11_hin_a_cbse_07_007', 'c11_hin_a_cbse_07_008', 'c11_hin_a_cbse_07_009', 'c11_hin_a_cbse_07_010', 'c11_hin_a_cbse_07_011', 'c11_hin_a_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'जीवन एक रंगमंच है\' में जीवन-एक-रंगमंच-है जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — गौण विषय', text: '\'जीवन एक रंगमंच है\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — गौण', 'पाठ 7 — साहित्यिक', 'पाठ 7 — पदावली', 'पाठ 7 — व्याकरण', 'पाठ 7 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 2/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — \'जीवन एक रंगमंच है\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — \'जीवन एक रंगमंच है\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_007', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review **c11_hin_a_cbse_07_006 (मुख्य विषय और संदेश)** — specifically the.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **\'उपकथानक (Sub-plot)\'** और **\'गौण विषय (Secondary Theme)\'** को समानार्थी मान लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' के गौण विषय',
                  options: ['\'जीवन एक रंगमंच है\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **c11_hin_a_cbse_07_006 (मुख्य विषय और संदेश)** — specifically the worked examples.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **\'उपकथानक (Sub-plot)\'** और **\'गौण विषय (Secondary Theme)\'** को समानार्थी मान लेते हैं। वे मानते हैं कि.' }
          ],
            remediations: { 'sub-plot-secondary-theme': { steps: ['**संकल्पना स्पष्टीकरण (Concept Clarification):** छात्र के साथ बैठकर एक परिचित फिल्म (जैसे *बागबान* या *पीकू*) का उदाहरण.', '(माता-पिता की उपेक्षा)। अब बताओ, वह कौन-सा *विचार* है जो बेटे-बहू के व्यवहार, पिता के पत्रों, और पड़ोसियों की बातचीत.', '**अभ्यास ड्रिल (Practice Drill):** पाठ 7 के 3-4 प्रमुख प्रसंग दें। प्रत्येक के लिए दो कॉलम बनवाएँ: **कॉलम A: क्या हुआ?', '(उपकथानक/घटना)** और **कॉलम B: इसका क्या मतलब निकला?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_008', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **कक्षा 10 की हिंदी पाठ्यपुस्तक (क्षितिज/कृतिका) के अलंकार संबंधी अध्याय** या.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'बिंब\' को \'चित्रात्मक वर्णन\' मात्र मानते हैं** और **\'रूपक\' को \'सजावटी तुलना\' समझते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' में बिंब (imagery)',
                  options: ['\'जीवन एक रंगमंच है\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **कक्षा 10 की हिंदी पाठ्यपुस्तक (क्षितिज/कृतिका) के अलंकार संबंधी अध्याय** या **NCERT.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'बिंब\' को \'चित्रात्मक वर्णन\' मात्र मानते हैं** और **\'रूपक\' को \'सजावटी तुलना\' समझते हैं**। वे यह नहीं देख.' }
          ],
            remediations: { 'sensory-evidence': { steps: ['**संवेदी अलगाव अभ्यास (Sensory Isolation Drill):** छात्र को 5 वाक्य दें, प्रत्येक केवल एक इंद्री को लक्षित करता हो.', 'क्या *सूँघा*?" — जब तक वे इंद्रियों को अलग-अलग पहचान न लें, मिश्रित बिंबों पर न बढ़ें। 2.', '**रूपक शल्य-क्रिया (Metaphor Surgery):** एक रूपक लें (जैसे "समय चोर है")। बोर्ड पर लिखें: उपमेय = समय, उपमान = चोर.', '**संयुक्त विश्लेषण (Joint Analysis):** एक छोटी कविता (4-5 पंक्ति) दें जहाँ बिंब और रूपक साथ हों। पहले केवल बिंब छाँटें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_009', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि फँसें तो **c11_hin_a_cbse_07_008 (बिंब और रूपक)** के \'बिंब-प्रकार पहचान\' और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **प्रतीक (Symbol) और रूपक (Metaphor) एक ही हैं** क्योंकि दोनों "किसी और चीज़ को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' में विरोधाभास',
                  options: ['\'जीवन एक रंगमंच है\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **c11_hin_a_cbse_07_008 (बिंब और रूपक)** के \'बिंब-प्रकार पहचान\' और \'रूपक-विश्लेषण\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **प्रतीक (Symbol) और रूपक (Metaphor) एक ही हैं** क्योंकि दोनों "किसी और चीज़ को दर्शाते हैं"। वे.' }
          ],
            remediations: { 'symbol-metaphor-10-11': { steps: ['**चरण 1 – भेद स्पष्ट करें:** छात्र से कहें: "एक वाक्य में रूपक लिखो (जीवन नदी है)। अब उसी नदी को लेकर 4 पंक्तियाँ लिखो.', 'अर्थ कैसे बदला?" — एक टेबल बनवाएँ: प्रसंग | शाब्दिक अर्थ | प्रतीकात्मक अर्थ। **चरण 3 – विरोधाभास हेतु:** "वाक्य पूरा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_010', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके: **पाठ 7 के मुख्य विषय (c11_hin_a_cbse_07_006)** को दोबारा पढ़ें और पूछें: "इस.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' का अर्थ है — **पाठ में सबसे ज्यादा बार आने वाले शब्द (high.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' की पदावली',
                  options: ['\'जीवन एक रंगमंच है\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **पाठ 7 के मुख्य विषय (c11_hin_a_cbse_07_006)** को दोबारा पढ़ें और पूछें: "इस विषय को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' का अर्थ है — **पाठ में सबसे ज्यादा बार आने वाले शब्द (high frequency words)**। **गलत.' }
          ],
            remediations: { 'high-frequency-words-frequency-count': { steps: ['**चरण 1:** छात्र को पाठ का एक छोटा अंश (5-6 पंक्तियाँ) दें और कहें: "यहाँ **संज्ञा, सर्वनाम, क्रिया, विशेषण** छांटकर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_011', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'यदि फँसें तो **\'वाच्य परिवर्तन का अर्थ-प्रभाव\' (कर्तृ vs कर्मणी vs भाववाच्य)** और.',
          misconception: 'छात्र प्रायः मानते हैं कि **\'भाषा-प्रयोग\' = \'अलंकार पहचानना\' या \'शब्दार्थ बताना\'**। वे पाठ में रूपक/उपमा ढूँढ़कर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' में भाषा-प्रयोग',
                  options: ['\'जीवन एक रंगमंच है\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **\'वाच्य परिवर्तन का अर्थ-प्रभाव\' (कर्तृ vs कर्मणी vs भाववाच्य)** और **\'विशेषण क्रम का.',
                  misconception: 'छात्र प्रायः मानते हैं कि **\'भाषा-प्रयोग\' = \'अलंकार पहचानना\' या \'शब्दार्थ बताना\'**। वे पाठ में रूपक/उपमा ढूँढ़कर संतुष्ट हो जाते हैं, पर यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र को पाठ 7 के **दो विपरीत प्रसंग** (जैसे: संवाद vs वर्णन) दें। कहें: *"दोनों में समान अर्थ वाले दो शब्द.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_07_012', difficulty: 'standard',
          question: '\'जीवन एक रंगमंच है\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँसें तो **c11_hin_a_cbse_07_006 (मुख्य विषय और संदेश)** और **c11_hin_a_cbse_07_002.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"क्या" (What) से शुरू होने वाला हर प्रश्न वस्तुनिष्ठ होता है और "क्यों/कैसे".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जीवन एक रंगमंच है\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'जीवन एक रंगमंच है\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जीवन एक रंगमंच है\' का कथानक', '\'जीवन एक रंगमंच है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **c11_hin_a_cbse_07_006 (मुख्य विषय और संदेश)** और **c11_hin_a_cbse_07_002 (कथानक और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"क्या" (What) से शुरू होने वाला हर प्रश्न वस्तुनिष्ठ होता है और "क्यों/कैसे" (Why/How) से शुरू होने.' }
          ],
            remediations: { 'what-why-how': { steps: ['**चरण 1 (निदान):** छात्र को 5 मिश्रित प्रश्न दें (3 वस्तुनिष्ठ, 2 आशय-सूचक) और कहें: "प्रश्न पढ़कर बताओ — उत्तर पाठ में.', 'तुम्हारे उत्तर में प्रमाण कहाँ है?" — मेटाकॉग्निशन (metacognition) विकसित करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
