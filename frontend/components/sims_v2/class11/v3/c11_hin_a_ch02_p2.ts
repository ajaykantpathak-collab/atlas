import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch02_p2: SimDef = {
    id: 'v3_c11_hin_a_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'यह नोड केवल **पाठ 2 (अंतराल/अन्य निर्धारित पाठ)** के गौण विषयों की पहचान, वर्गीकरण.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c11_hin_a_ch02'],
    nodeIds: ['c11_hin_a_cbse_02_007', 'c11_hin_a_cbse_02_008', 'c11_hin_a_cbse_02_009', 'c11_hin_a_cbse_02_010', 'c11_hin_a_cbse_02_011', 'c11_hin_a_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना करें आप एक डॉक्यूमेंट्री देख रहे हैं जिसका शीर्षक है "भारत में बेरोजगारी" (मुख्य विषय)। अचानक कैमरा एक.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: 'गौण विषय (Sub-theme) कथा-साहित्य में वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथानक को विस्तार देता है, पात्रों के आंतरिक द्वंद्वों को उजागर करता है तथा सामाजिक-सांस्कृतिक परिवेश को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — "पाठ में भाषा-प्रयोग" refers to the deliberate stylistic selection of vocabulary.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective questions) वे प्रश्न हैं जिनके उत्तर पाठ में स्पष्टतः लिखे.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कथा-साहित्य में वह सहायक कथ्य-तत्व है जो मुख्य विषय के.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_02_006 (मुख्य विषय और संदेश)** पर वापस जाएँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'गौण विषय\' (Sub-theme)** को **\'सहायक पात्र का व्यक्तिगत संघर्ष\' (Supporting Character\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कथा-साहित्य में वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर',
                  options: ['गौण विषय (Sub-theme) कथा-साहित्य में वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_02_006 (मुख्य विषय और संदेश)** पर वापस जाएँ — मुख्य विषय.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'गौण विषय\' (Sub-theme)** को **\'सहायक पात्र का व्यक्तिगत संघर्ष\' (Supporting Character\'s Personal.' }
          ],
            remediations: { 'sub-theme-supporting-character-s': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**अवधारणा स्पष्टीकरण (5 मिनट):** छात्र को एक परिचित फिल्म (जैसे *3 Idiots*) दें — मुख्य विषय: "शिक्षा प्रणाली की.', '**पाठ-आधारित अभ्यास (10 मिनट):** पाठ 2 के 3 पैराग्राफ दें जिनमें गौण विषय निहित हों। छात्र से कहें: (अ) मुख्य विषय.', '**तुलना तालिका बनवाएँ (5 मिनट):** दो कॉलम — \'प्रसंग/घटना\' और \'गौण विषय (अर्थ)\'। छात्र भरे। फिर चर्चा करें कि वही प्रसंग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसके द्वारा कवि/लेखक शब्दों के.',
          hint: 'यदि संयोजक क्रिया (है/हैं) और तुलनात्मक कण (जैसे/सा) में भ्रम हो, तो कक्षा 9-10 के.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **रूपक (Metaphor)** और **उपमा (Simile)** को एक ही मान लेते हैं क्योंकि दोनों "तुलना" करते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसके द्वारा कवि/लेखक शब्दों के माध्यम से पाठक',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसके द्वारा कवि/लेखक शब्दों के माध्यम से पाठक', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'यदि संयोजक क्रिया (है/हैं) और तुलनात्मक कण (जैसे/सा) में भ्रम हो, तो कक्षा 9-10 के **व्याकरण.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **रूपक (Metaphor)** और **उपमा (Simile)** को एक ही मान लेते हैं क्योंकि दोनों "तुलना" करते हैं। वे पंक्ति "वह.' }
          ],
            remediations: { 'metaphor-simile': { steps: ['**स्पष्ट विभाजन:** बोर्ड पर दो कॉलम बनाएँ — "रूपक: X **है** Y" और "उपमा: X **जैसे/सा** Y"। 10-10 उदाहरण लिखवाएँ, हर बार.', '**रूपांतरण अभ्यास:** प्रत्येक उपमा को रूपक में बदलवाएँ ("चाँद *जैसा* मुख" → "मुख चाँद **है**") और विपरीत भी — अंतर.', '**प्रभाव-तुलना:** एक ही भाव के लिए रूपक और उपमा दोनों लिखवाएँ ("जीवन संघर्ष **है**" vs "जीवन संघर्ष *जैसा* **है**").', '**पाठ-आधारित खोज:** पाठ्यपुस्तक के किसी काव्यांश से 3 रूपक और 3 उपमा छाँटने को कहें — स्वतंत्र पहचान पक्की होगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में तर्कसंगत या सत्य.',
          hint: 'यदि अटके तो **नोड 008 (बिंब और रूपक)** के \'रूपक vs प्रतीक\' तुलना चार्ट और \'विरोधाभास.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'विरोधाभास\' को \'विरोधाभासी स्थिति\' (situational irony) या \'विपरीतार्थक कथन\' (oxymoron).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में तर्कसंगत या सत्य प्रतीत',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में तर्कसंगत या सत्य प्रतीत', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'यदि अटके तो **नोड 008 (बिंब और रूपक)** के \'रूपक vs प्रतीक\' तुलना चार्ट और \'विरोधाभास vs ऑक्सीमोरॉन\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'विरोधाभास\' को \'विरोधाभासी स्थिति\' (situational irony) या \'विपरीतार्थक कथन\' (oxymoron) समझ लेते हैं**, और.' }
          ],
            remediations: { 'situational-irony-oxymoron': { steps: ['**चरण 1:** छात्र से कहें: "एक वाक्य लिखो जिसमें दो विरोधी शब्द साथ हों (जैसे \'मीठा ज़हर\') — यह **ऑक्सीमोरॉन** है। अब एक.', 'वह वस्तु अपने अलावा क्या कह रही है?" — यही प्रतीक-खोज की प्रक्रिया है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_010', difficulty: 'standard',
          question: 'पदावली किसी साहित्यिक कृति में प्रयुक्त उन **चयनित, सार्थक और संस्कारित शब्दों.',
          hint: 'यदि अटके तो **नोड 02_008 (बिंब/रूपक) और 02_009 (प्रतीक/विरोधाभास)** के \'प्रतीक विश्लेषण\'.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'पदावली = कठिन/तत्सम शब्दों की सूची + उनके शब्दकोशीय अर्थ\'**। **गलत तर्क का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली किसी साहित्यिक कृति में प्रयुक्त उन **चयनित, सार्थक और संस्कारित शब्दों का',
                  options: ['पदावली किसी साहित्यिक कृति में प्रयुक्त उन **चयनित, सार्थक और संस्कारित शब्दों का', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'यदि अटके तो **नोड 02_008 (बिंब/रूपक) और 02_009 (प्रतीक/विरोधाभास)** के \'प्रतीक विश्लेषण\' खंड को.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'पदावली = कठिन/तत्सम शब्दों की सूची + उनके शब्दकोशीय अर्थ\'**। **गलत तर्क का स्रोत:** कक्षा 10 तक.' }
          ],
            remediations: { '10': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पहला कदम:** छात्र से कहो — **"पाठ से 5 शब्द चुनो जिनका अर्थ तुम्हें \'पता\' है। अब प्रत्येक के आगे लिखो: \'कबीर ने इस.', '**दूसरा कदम:** **\'शब्द-जाल\' (Word-web) बनवाओ** — केंद्र में मुख्य शब्द (जैसे \'हंस\'), शाखाओं पर: मूल अर्थ, कबीर का अर्थ.', '**तीसरा कदम:** **PEEL पैटर्न में एक उत्तर लिखवाओ** — Point: "हंस = विवेकशील आत्मा", Evidence: "हंस मोती चुगै".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_011', difficulty: 'standard',
          question: '"पाठ में भाषा-प्रयोग" refers to the deliberate stylistic selection.',
          hint: 'Review "शब्द-निर्माण" (word formation) from Class 9-10 Hindi grammar and "वाक्य के.',
          misconception: 'Students treat "भाषा-प्रयोग" as a vocabulary listing exercise: they highlight difficult words and label them.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ में भाषा-प्रयोग" refers to the deliberate stylistic selection of vocabulary',
                  options: ['"पाठ में भाषा-प्रयोग" refers to the deliberate stylistic selection of vocabulary', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'Review "शब्द-निर्माण" (word formation) from Class 9-10 Hindi grammar and "वाक्य के प्रकार".',
                  misconception: 'Students treat "भाषा-प्रयोग" as a vocabulary listing exercise: they highlight difficult words and label them Tatsam/Tadbhav.' }
          ],
            remediations: { 'students-treat-as-a-vocabulary': { steps: ['Take the sentence "चिता जली" (Deshaj/Tadbhav).', 'Rewrite it three ways: "दाह संपन्न हुआ" (Tatsam/formal), "आग ने शरीर खा लिया" (Deshaj/visceral), "The pyre burned".', 'Ask the student: "Which version would a priest use? Which a grieving son? Which a police report?"', 'Map each version to a specific paragraph in the text. This forces the student to see register as *situational choice*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_02_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective questions) वे प्रश्न हैं जिनके उत्तर पाठ में.',
          hint: 'यदि फँसें तो **c11_hin_a_cbse_02_002 (कथानक)** और **c11_hin_a_cbse_02_004 (नायक.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि **आशय-सूचक प्रश्न का उत्तर "पाठ से बाहर का ज्ञान" (outside knowledge) या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective questions) वे प्रश्न हैं जिनके उत्तर पाठ में स्पष्टतः लिखे',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective questions) वे प्रश्न हैं जिनके उत्तर पाठ में स्पष्टतः लिखे', '\'पृष्ठभूमि\' का अर्थ है रचना के निर्माण के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-Effect) संबंध से बंधा हुआ तार्किक', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित **काल, स्थान,'],
                  hint: 'यदि फँसें तो **c11_hin_a_cbse_02_002 (कथानक)** और **c11_hin_a_cbse_02_004 (नायक पात्र-चित्रण)**.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि **आशय-सूचक प्रश्न का उत्तर "पाठ से बाहर का ज्ञान" (outside knowledge) या "अपनी राय" (personal.' }
          ],
            remediations: { 'outside-knowledge-personal-opinion': { steps: ['**चरणबद्ध उपचार (Targeted Remediation):** 1.', '**साक्ष्य-टैगिंग अभ्यास (Evidence Tagging Drill):** पाठ के एक अनुच्छेद दें। विद्यार्थी को **हर वाक्य के सामने कोष्ठक.', '**\'क्यों नहीं?\' खेल (Why Not?', 'Game):** विद्यार्थी एक निष्कर्ष देता है (जैसे: "नायक दुखी था")। शिक्षक पूछता है: "पाठ में *कौन-सा शब्द* इसके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
