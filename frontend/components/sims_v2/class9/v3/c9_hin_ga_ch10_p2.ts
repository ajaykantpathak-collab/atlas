import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch10_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch10_p2',
    title: 'पाठ 10 · Part 2/3',
    subtitle: 'यह नोड केवल \'गौण विषय\' की पहचान, विश्लेषण और मुख्य विषय से उसके कार्यात्मक संबंध तक सीमित.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 10 · Part 2/3',
    chapters: ['c9_hin_ga_ch10'],
    nodeIds: ['c9_hin_ga_cbse_10_007', 'c9_hin_ga_cbse_10_008', 'c9_hin_ga_cbse_10_009', 'c9_hin_ga_cbse_10_010', 'c9_hin_ga_cbse_10_011', 'c9_hin_ga_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'क्या आपने कभी ध्यान दिया है कि किसी शादी में मुख्य कार्यक्रम \'फेरे\' या \'निकाह\' होता है, लेकिन \'हल्दी\'.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'निम्न दो पंक्तियों की तुलना कीजिए और बताइए कि दूसरी पंक्ति में रूपक का प्रभाव अधिक गहरा क्यों है? (क) "वह शेर की तरह लड़ा।" (ख) "वह युद्धक्षेत्र में शेर था।"',
        options: ['**Correct Answer:** (क) **उपमा**', 'Upma without \'jaise/va\'', '*Rupak* (Metaphor) is just "Upma without \'jaise/va\'"'],
        answer: '**Correct Answer:** (क) **उपमा**',
        hook: '**Specific Error:** Students believe *Rupak* (Metaphor) is just "Upma without \'jaise/va\'" — a **syntactic deletion.',
    },
    teaching: [
        { title: 'पाठ 10 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथा को विस्तार, गहराई और यथार्थपरकता प्रदान करता है, पात्रों के विविध आयाम उजागर करता है तथा सामाजिक-सांस्कृतिक परिवेश को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — गौण', 'पाठ 10 — साहित्यिक', 'पाठ 10 — पदावली', 'पाठ 10 — व्याकरण', 'पाठ 10 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_10_008', title: 'पाठ 10 — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: 'Have you ever read a line like "साँझ ढलते ही गाँव ने चादर ओढ़ ली" and felt the quiet darkness settle on *you*?',
            decisions: [{ prompt: '"बिंब" की परिभाषा लिखिए और बताइए कि यह किन पाँच इंद्रियों से संबंधित हो सकता है।', options: [
                { text: '**Correct Answer:** बिंब वह शब्द/पद है जो पाठक के मन में कोई ठोस संवेदना जगाता है। यह', outcome: '**Correct Answer:** बिंब वह शब्द/पद है जो पाठक के मन में कोई ठोस संवेदना जगाता है। यह पाँच.' },
                { text: '(visual) or writes', outcome: 'Not quite — **Specific Error:** Students believe *Rupak* (Metaphor) is just "Upma without \'jaise/va\'" —.', reveals: 'specific-error-students-believe-rupak' },
                { text: 'Upma without \'jaise/va\'', outcome: 'Not quite — **Specific Error:** Students believe *Rupak* (Metaphor) is just "Upma without \'jaise/va\'" —.', reveals: 'specific-error-students-believe-rupak' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_10_012', title: 'पाठ 10 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Have you ever answered a question in class feeling confident, only to lose marks because the teacher said "This answer is incomplete — you didn\'t explain.',
            decisions: [{ prompt: 'पाठ 10 में से एक वस्तुनिष्ठ प्रश्न और एक आशय-सूचक प्रश्न पहचानकर लिखिए। प्रत्येक के लिए बताइए कि आपने उसे उस श्रेणी में क्यों रखा?', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ उदाहरण: "पाठ में नायक का नाम क्या है?"', outcome: '**Correct Answer:** वस्तुनिष्ठ उदाहरण: "पाठ में नायक का नाम क्या है?" — उत्तर पाठ में सीधे लिखा है.' },
                { text: 'पाठ में नायक का नाम क्या है?', outcome: 'Not quite — **Specific Error:** Students believe that for आशय-सूचक questions, "the answer is somewhere in the.', reveals: 'specific-error-students-believe-that' },
                { text: 'नायक के निर्णय से लेखक समाज को क्या संदेश देना चाहता है?', outcome: 'Not quite — **Specific Error:** Students believe that for आशय-सूचक questions, "the answer is somewhere in the.', reveals: 'specific-error-students-believe-that' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_10_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथा.',
          hint: 'यदि अटका हुआ लगे तो c9_hin_ga_cbse_10_006 (मुख्य विषय और संदेश) पर लौटकर मुख्य विषय को.',
          misconception: 'छात्र प्रायः \'गौण विषय\' को \'मुख्य विषय से असंबद्ध प्रसंग\' या \'लेखक का मनोरंजन के लिए डाला गया भराव (filler)\' मान लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथा को विस्तार,',
                  options: ['गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथा को विस्तार,', '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary', 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,'],
                  hint: 'यदि अटका हुआ लगे तो c9_hin_ga_cbse_10_006 (मुख्य विषय और संदेश) पर लौटकर मुख्य विषय को 3-4 वाक्यों.',
                  misconception: 'छात्र प्रायः \'गौण विषय\' को \'मुख्य विषय से असंबद्ध प्रसंग\' या \'लेखक का मनोरंजन के लिए डाला गया भराव (filler)\' मान लेते हैं क्योंकि \'गौण\'.' }
          ],
            remediations: { 'filler-10': { steps: ['चरण 1: छात्र से कहें — "पाठ के 5 प्रमुख प्रसंग लिखो जो मुख्य संघर्ष से सीधे न जुड़े हों।" चरण 2: प्रत्येक प्रसंग के आगे.', 'कौन-सी सामाजिक सच्चाई दिखाता है?" चरण 3: अब पूछें — "यदि यह प्रसंग हटा दें तो मुख्य विषय की समझ पर क्या फर्क पड़ेगा?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_008', difficulty: 'standard',
          question: '**बिंब (Bimb/Image)** इंद्रियों को संबोधित करने वाला वह शब्द या पद है जो पाठक.',
          hint: 'If stuck, review **Class 8 Hindi Grammar: अलंकार परिचय (Alankar Parichay)**.',
          misconception: '**Specific Error:** Students believe *Rupak* (Metaphor) is just "Upma without \'jaise/va\'" — a **syntactic deletion.',
          parts: [
                { id: 'a', prompt: 'निम्न दो पंक्तियों की तुलना कीजिए और बताइए कि दूसरी पंक्ति में रूपक का प्रभाव अधिक गहरा क्यों है? (क) "वह शेर की तरह लड़ा।" (ख) "वह युद्धक्षेत्र में शेर था।"', answer: '**Correct Answer:** (क) **उपमा**',
                  options: ['**Correct Answer:** (क) **उपमा**', 'Upma without \'jaise/va\'', '*Rupak* (Metaphor) is just "Upma without \'jaise/va\'"'],
                  hint: 'If stuck, review **Class 8 Hindi Grammar: अलंकार परिचय (Alankar Parichay)** — specifically the.',
                  misconception: '**Specific Error:** Students believe *Rupak* (Metaphor) is just "Upma without \'jaise/va\'" — a **syntactic deletion rule**.' }
          ],
            remediations: { 'specific-error-students-believe-rupak': { steps: ['**Step-by-Step Remediation:** 1.', '**Concrete Anchor:** Give the student 3 sentences: (अ) "वह फूल जैसा सुंदर है।" (आ) "वह फूल है।" (इ) "उसके गाल गुलाब.', '**Quality Abstraction Drill:** For "क्रोध अग्नि है", make a 2-column table: **Column A: अग्नि के भौतिक गुण** (जलना.', '**Bimb-Rupak Fusion:** Give a *Rupak* without context: "स्मृति एक धुंधला दर्पण है।" Ask: "दो बिंब लिखो जो इस रूपक को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students believe *Rupak* (Metaphor) is just "Upma without \'jaise/va\'" — a **syntactic deletion.',
          parts: [
                { id: 'a', prompt: 'एक कवि लिखता है: "भूख एक आग है जो पेट में जलती है।" आलोचनात्मक दृष्टि से मूल्यांकन कीजिए: क्या यह रूपक प्रभावी है? क्या "भूख आग के समान है" अधिक सटीक होता?', answer: '**Correct Answer:** **हाँ, रूपक प्रभावी है।** कारण: 1',
                  options: ['**Correct Answer:** **हाँ, रूपक प्रभावी है।** कारण: 1', 'Upma without \'jaise/va\'', '*Rupak* (Metaphor) is just "Upma without \'jaise/va\'"'],
                  hint: 'If stuck, review **Class 8 Hindi Grammar: अलंकार परिचय (Alankar Parichay)** — specifically the.',
                  misconception: '**Specific Error:** Students believe *Rupak* (Metaphor) is just "Upma without \'jaise/va\'" — a **syntactic deletion rule**.' },
                { id: 'b', prompt: 'किसी भी परिचित वस्तु (जैसे: पुरानी किताब, बरसात की पहली बूँद, माँ का हाथ) पर 2 पंक्तियों की एक कविता लिखिए जिसमें **कम से कम दो प्रकार के बिंब** और **एक रूपक**.', answer: '**Sample Answer (Criteria for Good Response):** > "माँ का हाथ',
                  options: ['**Sample Answer (Criteria for Good Response):** > "माँ का हाथ', 'Upma without \'jaise/va\'', '*Rupak* (Metaphor) is just "Upma without \'jaise/va\'"'],
                  hint: 'If stuck, review **Class 8 Hindi Grammar: अलंकार परिचय (Alankar Parichay)** — specifically the.',
                  misconception: '**Specific Error:** Students believe *Rupak* (Metaphor) is just "Upma without \'jaise/va\'" — a **syntactic deletion rule**.' }
          ],
            remediations: { 'specific-error-students-believe-rupak': { steps: ['**Step-by-Step Remediation:** 1.', '**Concrete Anchor:** Give the student 3 sentences: (अ) "वह फूल जैसा सुंदर है।" (आ) "वह फूल है।" (इ) "उसके गाल गुलाब.', '**Quality Abstraction Drill:** For "क्रोध अग्नि है", make a 2-column table: **Column A: अग्नि के भौतिक गुण** (जलना.', '**Bimb-Rupak Fusion:** Give a *Rupak* without context: "स्मृति एक धुंधला दर्पण है।" Ask: "दो बिंब लिखो जो इस रूपक को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_009', difficulty: 'standard',
          question: '**विरोधाभास** एक साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी प्रतीत होने वाले.',
          hint: 'यदि अटके तो **c9_hin_ga_cbse_10_008 (बिंब और रूपक)** के \'WORKED_EXAMPLE_2\' और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मानते हैं कि **हर असंगत/विरोधी कथन विरोधाभास है** (जैसे "वह रो रहा था पर खुश था" — यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** एक साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी प्रतीत होने वाले कथनों या',
                  options: ['**विरोधाभास** एक साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी प्रतीत होने वाले कथनों या', '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary', 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,'],
                  hint: 'यदि अटके तो **c9_hin_ga_cbse_10_008 (बिंब और रूपक)** के \'WORKED_EXAMPLE_2\' और \'ON_FAILURE\' को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मानते हैं कि **हर असंगत/विरोधी कथन विरोधाभास है** (जैसे "वह रो रहा था पर खुश था" — यह केवल भावनात्मक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**विरोधाभास बनाम द्वंद्व:** छात्र को तीन वाक्य दें — (अ) "वह गरीब था पर ईमानदार था" (द्वंद्व), (ब) "उसकी गरीबी ही उसकी.', '**प्रतीक बनाम बिंब/रूपक:** उसी वस्तु (जैसे \'दीया\') के तीन प्रयोग दिखाएँ — (अ) "दीया जल रहा था" (बिंब/तथ्य), (ब) "आशा का.', '**पाठ-वापसी:** पाठ के दो चिह्नित अंश दें — एक विरोधाभास, एक प्रतीक — और छात्र से कहें: "पहले बताओ: यहाँ **कथन विरोधी.', '**अभ्यास:** रोज एक दैनिक जीवन का विरोधाभास (जैसे "सबसे शोरगुल चुप्पी होती है") और एक प्रतीक (जैसे "स्कूल की घंटी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द से तात्पर्य उस पाठ के उन **महत्वपूर्ण, बहु-अर्थी.',
          hint: 'यदि फंसे: पाठ 10 के **कथानक (c9_hin_ga_cbse_10_002)** और **मुख्य विषय.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पदावली: मुख्य शब्द\' का अर्थ है **पाठ में आए कठिन/अपरिचित शब्दों की सूची बनाकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द से तात्पर्य उस पाठ के उन **महत्वपूर्ण, बहु-अर्थी, प्रसंग-संवेदनशील',
                  options: ['पदावली: मुख्य शब्द से तात्पर्य उस पाठ के उन **महत्वपूर्ण, बहु-अर्थी, प्रसंग-संवेदनशील', '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary', 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,'],
                  hint: 'यदि फंसे: पाठ 10 के **कथानक (c9_hin_ga_cbse_10_002)** और **मुख्य विषय (c9_hin_ga_cbse_10_006)** को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पदावली: मुख्य शब्द\' का अर्थ है **पाठ में आए कठिन/अपरिचित शब्दों की सूची बनाकर उनके शब्दकोश अर्थ रट.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पाठ से 3 वाक्य चुनें** जिनमें वही शब्द (जैसे \'नियति\') आया हो; छात्र से कहें: "प्रत्येक वाक्य में इस शब्द का अर्थ.', '**शब्दकोश vs प्रसंग टेबल बनवाएं:** दो कॉलम — बायाँ \'शब्दकोश अर्थ\', दायाँ \'इस वाक्य में अर्थ\'। छात्र स्वयं अंतर देखे। 3.', '**\'क्यों यह शब्द?\' खेल खेलें:** "लेखक ने \'नियति\' क्यों लिखा, \'भाग्य\' क्यों नहीं?" — छात्र को शब्द के \'अतिरिक्त भार\'.', '**मिनी-उत्तर लिखवाएं:** 2 अंक के पैटर्न पर: "शब्द X का प्रसंगिक अर्थ लिखिए और बताइए यह विषय Y को कैसे उभारता है?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_011', difficulty: 'standard',
          question: '"पाठ में भाषा-प्रयोग" refers to the analytical study of how linguistic choices.',
          hint: 'If stuck, review **\'वाच्य परिवर्तन\' (Voice Change) and \'काल परिवर्तन\' (Tense Change).',
          misconception: '**विशिष्ट भ्रांति:** "भाषा-प्रयोग के प्रश्न में हमें केवल यह पहचानना होता है कि वाक्य किस काल (Tense) या वाच्य (Voice).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ में भाषा-प्रयोग" refers to the analytical study of how linguistic choices',
                  options: ['"पाठ में भाषा-प्रयोग" refers to the analytical study of how linguistic choices', '"पृष्ठभूमि" (Background/Context) refers to the historical, social, cultural, and literary', 'कथानक (Plot) घटनाओं का कारण-परिणामबद्ध (causal) क्रम है जो कथा को तार्किक गति देता है,', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समय, स्थान,'],
                  hint: 'If stuck, review **\'वाच्य परिवर्तन\' (Voice Change) and \'काल परिवर्तन\' (Tense Change) exercises from.',
                  misconception: '**विशिष्ट भ्रांति:** "भाषा-प्रयोग के प्रश्न में हमें केवल यह पहचानना होता है कि वाक्य किस काल (Tense) या वाच्य (Voice) में है, और शब्द.' }
          ],
            remediations: { 'tense-voice': { steps: ['**चरणबद्ध उपचार (Targeted Remediation):** 1.', '**\'क्यों\' का खेल खेलें (The \'Why\' Game):** छात्र से पाठ के किन्हीं 3 वाक्य लेने को कहें। प्रत्येक के लिए पूछें: *"यदि.', '**\'वाच्य-परिवर्तन\' प्रयोग (Voice-Swap Experiment):** पाठ के एक कर्मवाच्य वाक्य को कर्तृवाच्य में बदलें और **दोनों को.', 'किसमें घटना महत्वपूर्ण लगती है?"* इससे \'एजेंसी\' (Agency) की अवधारणा ठोस बनेगी। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता.',
          hint: 'If stuck, review **c9_hin_ga_cbse_10_006 (मुख्य विषय और संदेश)** for thematic anchor, and.',
          misconception: '**Specific Error:** Students believe that for आशय-सूचक questions, "the answer is somewhere in the text — I just haven\'t.',
          parts: [
                { id: 'a', prompt: 'पाठ 10 में से एक वस्तुनिष्ठ प्रश्न और एक आशय-सूचक प्रश्न पहचानकर लिखिए। प्रत्येक के लिए बताइए कि आपने उसे उस श्रेणी में क्यों रखा?', answer: '**Correct Answer:** वस्तुनिष्ठ उदाहरण: "पाठ में नायक का नाम क्या है?"',
                  options: ['**Correct Answer:** वस्तुनिष्ठ उदाहरण: "पाठ में नायक का नाम क्या है?"', 'पाठ में नायक का नाम क्या है?', 'नायक के निर्णय से लेखक समाज को क्या संदेश देना चाहता है?', 'नायक ने ऐसा क्यों किया?'],
                  hint: 'If stuck, review **c9_hin_ga_cbse_10_006 (मुख्य विषय और संदेश)** for thematic anchor, and.',
                  misconception: '**Specific Error:** Students believe that for आशय-सूचक questions, "the answer is somewhere in the text — I just haven\'t found the right.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Step-by-step remediation:** 1.', '**Make the invisible visible:** Give the student a solved आशय-सूचक answer.', 'Highlight in 4 colors: Point (Yellow), Evidence (Green), Explanation (Blue), Link (Pink).', 'Ask: "Which color comes from the text?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
