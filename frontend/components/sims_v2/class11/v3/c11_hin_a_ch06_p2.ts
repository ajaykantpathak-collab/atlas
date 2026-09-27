import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch06_p2: SimDef = {
    id: 'v3_c11_hin_a_ch06_p2',
    title: 'पाठ 6 · Part 2/3',
    subtitle: 'यह नोड केवल **\'गौण विषय\' की पहचान, विश्लेषण और मुख्य विषय से उसके अंतर्संबंध** पर.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 6 · Part 2/3',
    chapters: ['c11_hin_a_ch06'],
    nodeIds: ['c11_hin_a_cbse_06_007', 'c11_hin_a_cbse_06_008', 'c11_hin_a_cbse_06_009', 'c11_hin_a_cbse_06_010', 'c11_hin_a_cbse_06_011', 'c11_hin_a_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना करें कि आप अपने प्रिय नाटक का मंचन देख रहे हैं: मुख्य पात्र संवाद बोल रहा है (मुख्य विषय), लेकिन मंच.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — गौण विषय', text: 'गौण विषय (Sub-theme) कहानी/पाठ का वह **द्वितीयक केंद्रीय विचार** है जो मुख्य विषय के समानांतर चलता हुआ उसे विस्तार, गहराई, संदर्भ और जटिलता प्रदान करता है, तथा पात्रों के आंतरिक द्वंद्व या सामाजिक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — गौण', 'पाठ 6 — साहित्यिक', 'पाठ 6 — पदावली', 'पाठ 6 — व्याकरण', 'पाठ 6 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 2/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का आशय रचनाकार द्वारा कथ्य, पात्र, परिवेश और उद्देश्य के अनुरूप.', answer: '6 -', options: ['6 -', '6 - -'] },
            { id: 's2', label: '6 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखित.', answer: '6 - -', options: ['6 - -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कहानी/पाठ का वह **द्वितीयक केंद्रीय विचार** है जो मुख्य.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_06_006 (मुख्य विषय और संदेश)** के \'WORKED_EXAMPLE_1\' को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'उपकथानक\' (Sub-plot)** और **\'गौण विषय\' (Sub-theme)** को एक ही समझ लेते हैं। वे मानते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कहानी/पाठ का वह **द्वितीयक केंद्रीय विचार** है जो मुख्य विषय के',
                  options: ['गौण विषय (Sub-theme) कहानी/पाठ का वह **द्वितीयक केंद्रीय विचार** है जो मुख्य विषय के', '**पृष्ठभूमि (Context)** किसी रचना के लिखे जाने का **ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी कथा में घटित घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का भौतिक,'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_06_006 (मुख्य विषय और संदेश)** के \'WORKED_EXAMPLE_1\' को दोहराएं जहां.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'उपकथानक\' (Sub-plot)** और **\'गौण विषय\' (Sub-theme)** को एक ही समझ लेते हैं। वे मानते हैं कि कोई भी छोटी.' }
          ],
            remediations: { 'sub-plot-sub-theme': { steps: ['**भेद स्पष्ट करें:** छात्र से कहें — "पाठ से 3 घटनाएं (Events) लिखो, फिर उनसे निकलने वाले 3 विचार (Ideas) लिखो। अब बताओ.', '**मैपिंग एक्सरसाइज:** एक टेबल बनवाएं: **कॉलम 1: प्रसंग/घटना | कॉलम 2: उभरता विचार (गौण विषय) | कॉलम 3: मुख्य विषय से.', '**की-वर्ड ट्रैकिंग:** पाठ में से उन शब्दों/वाक्यांशों को हाईलाइट करवाएं जो बार-बार आते हैं और मुख्य विषय से अलग भाव लिए.', '**मौखिक ड्रिल:** छात्र से कहें — "एक वाक्य में बताओ: यह गौण विषय मुख्य विषय को कैसे बदलता है?" — इससे \'अंतर्संबंध\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** इंद्रियों को संबोधित करने वाला ऐसा शब्द-चित्रण है जो पाठक के.',
          hint: 'If stuck, review **इंद्रिय-बोधक शब्द (Sensory vocabulary)** listing: create a 5-column.',
          misconception: '**विशिष्ट भ्रम:** छात्र **रूपक** और **उपमा** को केवल \'तुलना\' के आधार पर अलग करते हैं, पर **\'आरोपण\' (Superimposition)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** इंद्रियों को संबोधित करने वाला ऐसा शब्द-चित्रण है जो पाठक के मन में',
                  options: ['**बिंब (Imagery)** इंद्रियों को संबोधित करने वाला ऐसा शब्द-चित्रण है जो पाठक के मन में', '**पृष्ठभूमि (Context)** किसी रचना के लिखे जाने का **ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी कथा में घटित घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का भौतिक,'],
                  hint: 'If stuck, review **इंद्रिय-बोधक शब्द (Sensory vocabulary)** listing: create a 5-column chart.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **रूपक** और **उपमा** को केवल \'तुलना\' के आधार पर अलग करते हैं, पर **\'आरोपण\' (Superimposition)** की अवधारणा नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — ठोस उदाहरण से शुरू करें:** छात्र को दो वाक्य दें: "चाँद *जैसे* चमकता है" (उपमा) और "चाँद *चाँदी का थाल है*".', 'दूसरे में चाँद क्या *बन गया*?" 2.', '**चरण 2 — \'है\' क्रिया पर जोर दें:** रूपक में \'है/हैं/था/थी\' क्रिया **पहचान स्थापित करती है**, वर्णन नहीं। छात्र से 5.', '**चरण 3 — उपमान को बिंब से जोड़ें:** दिखाएँ कि रूपक का उपमान (चाँदी का थाल) स्वयं एक **दृश्य बिंब** है। बिंब पहचानने का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_009', difficulty: 'standard',
          question: '**विरोधाभास** (Paradox) वह साहित्यिक युक्ति है जहाँ कोई कथन या स्थिति पहली.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_06_006 (मुख्य विषय और संदेश)** और **c11_hin_a_cbse_06_008.',
          misconception: 'छात्र प्रायः **विरोधाभास को \'विरोधाभास अलंकार\' (Oxymoron) समझ लेते हैं** — जैसे "मधुर कड़वाहट", "जीवित मृत" — और समझते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** (Paradox) वह साहित्यिक युक्ति है जहाँ कोई कथन या स्थिति पहली दृष्टि में',
                  options: ['**विरोधाभास** (Paradox) वह साहित्यिक युक्ति है जहाँ कोई कथन या स्थिति पहली दृष्टि में', '**पृष्ठभूमि (Context)** किसी रचना के लिखे जाने का **ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी कथा में घटित घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का भौतिक,'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_06_006 (मुख्य विषय और संदेश)** और **c11_hin_a_cbse_06_008 (बिंब और.',
                  misconception: 'छात्र प्रायः **विरोधाभास को \'विरोधाभास अलंकार\' (Oxymoron) समझ लेते हैं** — जैसे "मधुर कड़वाहट", "जीवित मृत" — और समझते हैं कि बस दो विपरीत.' }
          ],
            remediations: { 'oxymoron': { steps: ['**चरण 1:** छात्र से कहें — "पाठ से कोई एक वाक्य चुनो जो तुम्हें \'उल्टा\' लगे; उसे कॉपी में लिखो।" **चरण 2:** पूछें — "इस.', 'और लेखक असल में क्या कहना चाहता है?', 'दोनों को अगल-बगल लिखो।" — यह **द्वैत-अर्थ (Dual meaning)** स्पष्ट करेगा। **चरण 3:** प्रतीक के लिए — "पाठ से कोई एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत **मुख्य शब्द** वे महत्वपूर्ण शब्दावली होते हैं जो किसी रचना.',
          hint: 'यदि फँसें तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 008-009 (बिंब/प्रतीक/विरोधाभास)**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **जो शब्द पाठ में सबसे अधिक बार आए (highest frequency), वही मुख्य शब्द है।**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत **मुख्य शब्द** वे महत्वपूर्ण शब्दावली होते हैं जो किसी रचना के केंद्रीय',
                  options: ['पदावली के अंतर्गत **मुख्य शब्द** वे महत्वपूर्ण शब्दावली होते हैं जो किसी रचना के केंद्रीय', '**पृष्ठभूमि (Context)** किसी रचना के लिखे जाने का **ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी कथा में घटित घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का भौतिक,'],
                  hint: 'यदि फँसें तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 008-009 (बिंब/प्रतीक/विरोधाभास)** को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **जो शब्द पाठ में सबसे अधिक बार आए (highest frequency), वही मुख्य शब्द है।** **गलत तर्क का स्रोत:**.' }
          ],
            remediations: { 'highest-frequency': { steps: ['**चरण 1 — ठोस प्रतिउदाहरण दें:** छात्र को एक छोटा अनुच्छेद दें जहाँ \'पेड़\' शब्द 5 बार आया हो किंतु \'तना\' शब्द एक बार आए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का आशय रचनाकार द्वारा कथ्य, पात्र, परिवेश और उद्देश्य के.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'शब्द-भेद पहचान\' (तत्सम/तद्भव/देशज/विदेशी)** और **\'वाक्य-रचना.',
          misconception: 'विद्यार्थी समझते हैं कि **\'भाषा-प्रयोग\' = कठिन शब्दों के अर्थ लिखना या संधि/समास विग्रह करना**। वास्तव में बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का आशय रचनाकार द्वारा कथ्य, पात्र, परिवेश और उद्देश्य के अनुरूप',
                  options: ['पाठ में भाषा-प्रयोग का आशय रचनाकार द्वारा कथ्य, पात्र, परिवेश और उद्देश्य के अनुरूप', '**पृष्ठभूमि (Context)** किसी रचना के लिखे जाने का **ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी कथा में घटित घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का भौतिक,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'शब्द-भेद पहचान\' (तत्सम/तद्भव/देशज/विदेशी)** और **\'वाक्य-रचना के भेद\'.',
                  misconception: 'विद्यार्थी समझते हैं कि **\'भाषा-प्रयोग\' = कठिन शब्दों के अर्थ लिखना या संधि/समास विग्रह करना**। वास्तव में बोर्ड परीक्षा में पूछा जाता है.' }
          ],
            remediations: { '10': { steps: ['चरण 1: विद्यार्थी से कहें — "पाठ 6 के किसी एक पृष्ठ के 5 वाक्य चुनो और प्रत्येक के लिए बताओ: (क) यह लेखक की आवाज़ है या.', '(ख) इसमें कौन-सा शब्द सबसे महत्त्वपूर्ण है और क्यों?', '(ग) यदि यह शब्द बदल दिया जाए तो प्रभाव कैसे बदलेगा?" चरण 2: उनके उत्तरों की तुलना **\'प्रयोजन-केंद्रित व्याख्या\'** से.', 'दूसरा समानार्थी क्यों नहीं?"** चरण 3: एक **तुलनात्मक सारणी** बनवाएँ: स्तंभ 1 — शब्द/वाक्य, स्तंभ 2 — प्रसंग, स्तंभ 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप.',
          hint: 'If stuck, review **c11_hin_a_cbse_06_008 (बिंब और रूपक)** to practice extracting implicit.',
          misconception: '**विशिष्ट भ्रांति:** "आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (Personal Opinion) होता है, इसलिए जो मन आए लिख दो; वस्तुनिष्ठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखित',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखित', '**पृष्ठभूमि (Context)** किसी रचना के लिखे जाने का **ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी कथा में घटित घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का भौतिक,'],
                  hint: 'If stuck, review **c11_hin_a_cbse_06_008 (बिंब और रूपक)** to practice extracting implicit meaning.',
                  misconception: '**विशिष्ट भ्रांति:** "आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (Personal Opinion) होता है, इसलिए जो मन आए लिख दो; वस्तुनिष्ठ प्रश्न के लिए.' }
          ],
            remediations: { 'personal-opinion': { steps: ['**चरण 1 — प्रश्न का \'कमांड वर्ड\' चिह्नित करें:** विद्यार्थी को 10 प्रश्न दें (मिश्रित: कौन, क्या, कब, क्यों, कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
