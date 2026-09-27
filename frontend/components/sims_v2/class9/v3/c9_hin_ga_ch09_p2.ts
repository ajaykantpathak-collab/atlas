import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch09_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch09_p2',
    title: 'पाठ 9 · Part 2/3',
    subtitle: 'यह नोड केवल \'गौण विषय\' की पहचान, वर्गीकरण (समांतर/विपरीत/पूरक) और मुख्य विषय से उसके.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 9 · Part 2/3',
    chapters: ['c9_hin_ga_ch09'],
    nodeIds: ['c9_hin_ga_cbse_09_007', 'c9_hin_ga_cbse_09_008', 'c9_hin_ga_cbse_09_009', 'c9_hin_ga_cbse_09_010', 'c9_hin_ga_cbse_09_011', 'c9_hin_ga_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'क्या तुमने कभी ध्यान दिया है कि जब तुम अपनी बोर्ड परीक्षा की तैयारी (मुख्य लक्ष्य) कर रहे होते हो, तब साथ-साथ.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — गौण विषय', text: 'गौण विषय (Sub-theme) कथानक में मुख्य विषय के समानांतर चलने वाला वह विषय है जो मुख्य विषय को विस्तार, गहराई, विरोधाभास या संदर्भ प्रदान करता है और पात्रों के जीवन की बहुआयामी वास्तविकता को उजागर करता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        labels: ['पाठ 9 — गौण', 'पाठ 9 — साहित्यिक', 'पाठ 9 — पदावली', 'पाठ 9 — व्याकरण', 'पाठ 9 — बोध-प्रश्न'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 2/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — भाषा-प्रयोग (Language Usage) वह कौशल है जिसमें लेखक या वक्ता **संदर्भ (context), प्रयोजन.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्टतः (Explicitly) दिया होता.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कथानक में मुख्य विषय के समानांतर चलने वाला वह विषय है जो.',
          hint: 'यदि अटका हुआ महसूस हो तो \'मुख्य विषय और संदेश\' (नोड 006) के \'WORKED_EXAMPLE_1\' को दोहराएं.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर \'गौण विषय\' (sub-theme) और \'प्रसंग/घटना\' (episode/incident) को एक मान लेते हैं। **ठोस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कथानक में मुख्य विषय के समानांतर चलने वाला वह विषय है जो मुख्य विषय',
                  options: ['गौण विषय (Sub-theme) कथानक में मुख्य विषय के समानांतर चलने वाला वह विषय है जो मुख्य विषय', '"पृष्ठभूमि और रचनाकार परिचय" refers to the contextual framework of a literary text,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तर्कसंगत क्रम है', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'मुख्य विषय और संदेश\' (नोड 006) के \'WORKED_EXAMPLE_1\' को दोहराएं जहां.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर \'गौण विषय\' (sub-theme) और \'प्रसंग/घटना\' (episode/incident) को एक मान लेते हैं। **ठोस उदाहरण:** पाठ 9 में.' }
          ],
            remediations: { 'sub-theme-episode-incident-9': { steps: ['**चरण 1 (पृथक्करण):** छात्र से कहो — "पाठ से 5 प्रसंग (घटनाएं/विवरण) लिखो जो मुख्य कहानी को सीधे न बढ़ाते हों।" फिर.', '**चरण 2 (अमूर्तीकरण):** प्रत्येक प्रसंग के आगे वह अमूर्त अनुभव लिखवाओ। यही गौण विषय है। 3.', '**चरण 3 (कार्य परीक्षण):** प्रत्येक गौण विषय के लिए पूछो — "यदि यह प्रसंग हटा दिया जाए, तो मुख्य विषय की समझ में क्या.', '**चरण 4 (अभ्यास):** इस विधि से 3-4 पाठों पर अभ्यास कराओ; फिर छात्र स्वयं अंतर करने लगेगा।'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की.',
          hint: 'यदि अटके तो \'उपमा और रूपक का अंतर\' (कक्षा 7-8 व्याकरण) दोहराएँ — विशेषकर \'जैसे/सा\' की.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **रूपक केवल संज्ञाओं (Nouns) के बीच होता है** — जैसे "वह शेर है"। वे क्रियापदों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की इंद्रियों',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की इंद्रियों', '"पृष्ठभूमि और रचनाकार परिचय" refers to the contextual framework of a literary text,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तर्कसंगत क्रम है', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो \'उपमा और रूपक का अंतर\' (कक्षा 7-8 व्याकरण) दोहराएँ — विशेषकर \'जैसे/सा\' की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **रूपक केवल संज्ञाओं (Nouns) के बीच होता है** — जैसे "वह शेर है"। वे क्रियापदों (Verbs), विशेषणों.' }
          ],
            remediations: { 'nouns-verbs': { steps: ['**चरण 1:** छात्र को 5 वाक्य दें जिनमें क्रियापद/विशेषण रूपक हों (उदा: "समय उड़ गया", "उसने दिल चुरा लिया", "बातें कड़वी.', 'वह शब्द किस भौतिक क्रिया से आया है?', 'उस भौतिक क्रिया के गुण अमूर्त विषय पर कैसे आरोपित हुए?" **चरण 3:** छात्र से कहें: "हर वाक्य में रूपक वाले शब्द को घेरो.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_009', difficulty: 'standard',
          question: '**विरोधाभास** एक साहित्यिक युक्ति है जिसमें कथन या स्थिति में दो विरोधी तत्व एक.',
          hint: 'यदि अटके तो c9_hin_ga_cbse_09_008 के \'बिंब के प्रकार\' और \'रूपक के भेद\' अनुभाग दोहराएँ.',
          misconception: 'विद्यार्थी प्रायः **प्रतीक को बिंब (इमेजरी) समझ लेते हैं** — वे लिखते हैं "लेखक ने फूल का बिंब दिया है" जबकि प्रश्न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** एक साहित्यिक युक्ति है जिसमें कथन या स्थिति में दो विरोधी तत्व एक साथ',
                  options: ['**विरोधाभास** एक साहित्यिक युक्ति है जिसमें कथन या स्थिति में दो विरोधी तत्व एक साथ', '"पृष्ठभूमि और रचनाकार परिचय" refers to the contextual framework of a literary text,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तर्कसंगत क्रम है', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो c9_hin_ga_cbse_09_008 के \'बिंब के प्रकार\' और \'रूपक के भेद\' अनुभाग दोहराएँ — विशेषतः.',
                  misconception: 'विद्यार्थी प्रायः **प्रतीक को बिंब (इमेजरी) समझ लेते हैं** — वे लिखते हैं "लेखक ने फूल का बिंब दिया है" जबकि प्रश्न प्रतीक का हो। भेद: बिंब.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** विद्यार्थी को एक ठोस वस्तु (कलम) दें और पूछें: "यह क्या है?" → "कलम।" फिर पूछें: "यह क्या *भी* हो सकती है?".', '**चरण 2:** दो वाक्य दें: "आग ठंडी होती है" (विरोधाभास) और "दमकल की गाड़ी ही जल गई" (विडंबना) — अंतर स्पष्ट करें: पहला.', '**चरण 3:** पाठ से एक प्रतीक चुनकर (जैसे \'दीया\') तीन स्तरों पर लिखवाएँ: भौतिक रूप → संवेदनात्मक बिंब → प्रतीकार्थ। इससे.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_010', difficulty: 'standard',
          question: 'पदावली से तात्पर्य किसी रचना में प्रयुक्त शब्दों के समुच्चय से है, और \'मुख्य.',
          hint: 'यदि अटका हुआ महसूस हो, तो **\'शब्द-शक्ति: अभिधा, लक्षणा, व्यंजना\' (Word-powers: Primary.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"मुख्य शब्द = पाठ में दिए गए \'कठिन शब्द\' (Difficult words given in textbook.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली से तात्पर्य किसी रचना में प्रयुक्त शब्दों के समुच्चय से है, और \'मुख्य शब्द\' वे',
                  options: ['पदावली से तात्पर्य किसी रचना में प्रयुक्त शब्दों के समुच्चय से है, और \'मुख्य शब्द\' वे', '"पृष्ठभूमि और रचनाकार परिचय" refers to the contextual framework of a literary text,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तर्कसंगत क्रम है', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **\'शब्द-शक्ति: अभिधा, लक्षणा, व्यंजना\' (Word-powers: Primary, Secondary.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"मुख्य शब्द = पाठ में दिए गए \'कठिन शब्द\' (Difficult words given in textbook margin) अथवा.' }
          ],
            remediations: { 'difficult-words-given-in-textbook': { steps: ['**लक्षित उपचार (Targeted Remediation — 4 चरण):** 1.', '**\'शब्द-चयन प्रयोग\' (Word Choice Experiment) करवाएँ:** छात्र को एक सरल वाक्य दें: *"वह रोया।"* कहें: "इसे 5 तरह से लिखो.', '**\'प्रतिस्थापन परीक्षण\' (Substitution Test) सिखाएँ:** पाठ से कोई वाक्य लें, मुख्य शब्द हटाएँ, 3 पर्यायवाची रखकर पढ़वाएँ.', '**\'ध्वनि-अर्थ संबंध\' (Phonaesthetics) दिखाएँ:** "झनक", "झंकार", "टंकार", "गूँज" — सब \'आवाज\' हैं पर ध्वनि-अनुकरण.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग (Language Usage) वह कौशल है जिसमें लेखक या वक्ता **संदर्भ.',
          hint: 'यदि छात्र अटक जाए तो **पदावली: मुख्य शब्द (c9_hin_ga_cbse_09_010)** पर वापस जाएँ.',
          misconception: '**विशिष्ट भ्रांति:** "भाषा-प्रयोग का विश्लेषण करने का अर्थ है पाठ में आए **कठिन/तत्सम शब्दों की सूची बनाना** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग (Language Usage) वह कौशल है जिसमें लेखक या वक्ता **संदर्भ (context), प्रयोजन',
                  options: ['भाषा-प्रयोग (Language Usage) वह कौशल है जिसमें लेखक या वक्ता **संदर्भ (context), प्रयोजन', '"पृष्ठभूमि और रचनाकार परिचय" refers to the contextual framework of a literary text,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तर्कसंगत क्रम है', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि छात्र अटक जाए तो **पदावली: मुख्य शब्द (c9_hin_ga_cbse_09_010)** पर वापस जाएँ — विशेषकर उन.',
                  misconception: '**विशिष्ट भ्रांति:** "भाषा-प्रयोग का विश्लेषण करने का अर्थ है पाठ में आए **कठिन/तत्सम शब्दों की सूची बनाना** या **व्याकरणिक त्रुटियाँ.' }
          ],
            remediations: { '6-8': { steps: ['**चरण 1:** छात्र को पाठ 9 के दो अंश साथ रखकर दिखाएँ — एक वर्णन (मानक हिंदी), एक संवाद (बोली) — और पूछें: *"दोनों सही.', 'दोनों एक जैसे क्यों नहीं लगे?"* — इससे **शैलीगत चेतना** जागेगी। **चरण 2:** एक ही वाक्य को तीन संदर्भों में बोलकर.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्टतः (Explicitly).',
          hint: 'यदि फँस जाएँ तो **कथानक (c9_hin_ga_cbse_09_002)** और **पात्र-चित्रण.',
          misconception: '**सबसे घातक भ्रांति:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर = मेरी राय / मेरा अनुमान / मुझे क्या लगता है"। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्टतः (Explicitly) दिया होता',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्टतः (Explicitly) दिया होता', '"पृष्ठभूमि और रचनाकार परिचय" refers to the contextual framework of a literary text,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तर्कसंगत क्रम है', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि फँस जाएँ तो **कथानक (c9_hin_ga_cbse_09_002)** और **पात्र-चित्रण (c9_hin_ga_cbse_09_004.',
                  misconception: '**सबसे घातक भ्रांति:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर = मेरी राय / मेरा अनुमान / मुझे क्या लगता है"। वे लिखते हैं: "मुझे लगता.' }
          ],
            remediations: { 'text-based-logical-deduction': { steps: ['**चरण 1 — अंतर स्पष्ट करो:** छात्र को दो प्रश्न दो — एक वस्तुनिष्ठ ("नायक का नाम?"), एक आशय-सूचक ("नायक दुखी क्यों.', 'दूसरे का?" — जब वह कहे "दूसरे का नहीं मिलेगा", तब समझाओ: "तब तुम उत्तर *बनाओगे* पाठ के टुकड़ों से, न कि मन से।" 2.', '**चरण 2 — \'हाइलाइटर तकनीक\' सिखाओ:** पाठ पढ़ते समय हर उस वाक्य को हाइलाइट करो जो प्रश्न के कीवर्ड (जैसे \'क्यों\', \'कैसे\'.', '**चरण 3 — \'मैं सोचता हूँ\' पर प्रतिबंध:** अभ्यास कराओ जहाँ उत्तर की पहली पंक्ति हो "पाठ के अनुसार..." या "पाठ में लिखा.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
