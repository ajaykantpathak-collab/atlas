import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch02_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'इस नोड में प्रतीक (Symbol) और बिंब (Image) की परिभाषा, पहचान, विश्लेषण, और काव्य में उनके.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c10_hin_ks_ch02'],
    nodeIds: ['c10_hin_ks_cbse_02_007', 'c10_hin_ks_cbse_02_008', 'c10_hin_ks_cbse_02_009', 'c10_hin_ks_cbse_02_010', 'c10_hin_ks_cbse_02_011', 'c10_hin_ks_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप अपने दोस्त के साथ चाय की दुकान पर बैठे हैं और वह कहता है, "आज की सुबह का सूरज मेरे दिल में.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक: कोई शब्द, वस्तु, या कार्य जो अपने प्रत्यक्ष अर्थ से परे किसी सांस्कृतिक, भावनात्मक, या सार्वभौमिक अवधारणा को दर्शाता है (जैसे ध्वज = देशभक्ति)। बिंब: कविता में ऐसा वर्णन जो पाठक की किसी एक या.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — साहित्यिक', 'पाठ 2 — मुख्य', 'पाठ 2 — गौण', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पद्य में भाषा-प्रयोग (Language Usage in Poetry) refers to the deliberate deviations from.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ बोध‑प्रश्न** वे होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_02_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_007', difficulty: 'standard',
          question: 'प्रतीक: कोई शब्द, वस्तु, या कार्य जो अपने प्रत्यक्ष अर्थ से परे किसी.',
          hint: 'अलंकार की समीक्षा करें—विशेष रूप से रूपक और उपमा, क्योंकि प्रतीक अक्सर इनके माध्यम से.',
          misconception: 'छात्र अक्सर प्रतीक को किसी specific अलंकार (जैसे रूपक: "जीवन एक यात्रा है") के समान मान लेते हैं, जबकि प्रतीक व्यापक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक: कोई शब्द, वस्तु, या कार्य जो अपने प्रत्यक्ष अर्थ से परे किसी सांस्कृतिक,',
                  options: ['प्रतीक: कोई शब्द, वस्तु, या कार्य जो अपने प्रत्यक्ष अर्थ से परे किसी सांस्कृतिक,', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'अलंकार की समीक्षा करें—विशेष रूप से रूपक और उपमा, क्योंकि प्रतीक अक्सर इनके माध्यम से प्रकट होता है.',
                  misconception: 'छात्र अक्सर प्रतीक को किसी specific अलंकार (जैसे रूपक: "जीवन एक यात्रा है") के समान मान लेते हैं, जबकि प्रतीक व्यापक सांस्कृतिक अर्थ रखता.' }
          ],
            remediations: { 'specific': { steps: ['छात्र को दो कॉलम वाली तालिका बनाकर सुधाराइए:左 में "प्रतीक के उदाहरण" (जैसे ध्वज, lotus flower, बंदी बना पक्षी) और右 में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_008', difficulty: 'standard',
          question: 'मुख्य भाव (Central Theme) कविता का वह **केंद्रीय विचार** है जो पूरी रचना को एक.',
          hint: 'यदि अटके तो **c10_hin_ks_cbse_02_002 (पद्यांश-वार भावार्थ)** और **c10_hin_ks_cbse_02_007.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'मुख्य भाव\' को \'कवि का व्यक्तिगत मत (personal opinion)\' मान लेते हैं** और लिखते हैं: "कवि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव (Central Theme) कविता का वह **केंद्रीय विचार** है जो पूरी रचना को एक सूत्र में',
                  options: ['मुख्य भाव (Central Theme) कविता का वह **केंद्रीय विचार** है जो पूरी रचना को एक सूत्र में', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'यदि अटके तो **c10_hin_ks_cbse_02_002 (पद्यांश-वार भावार्थ)** और **c10_hin_ks_cbse_02_007 (प्रतीक और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'मुख्य भाव\' को \'कवि का व्यक्तिगत मत (personal opinion)\' मान लेते हैं** और लिखते हैं: "कवि कहता है कि हमें ईमानदार.' }
          ],
            remediations: { 'personal-opinion-impersonal-universal-9': { steps: ['छात्र से कहें: **"कविता के 3 मुख्य शब्द चुनो जो पूरी कविता में बार-बार आए या जिन पर बल दिया गया हो।"** (यह **की-वर्ड्स.', 'फिर पूछें: **"इन शब्दों को जोड़कर एक वाक्य बनाओ जिसमें \'कवि\' शब्द न आए।"** (यह **अवैयक्तिकरण (depersonalization)**.', 'अब कहें: **"इस वाक्य को \'जीवन के लिए सीख\' में बदलो — जैसे \'ईमानदारी सफलता की कुंजी है\'।"** (यह **संदेश (message)**.', 'अंत में: **दोनों वाक्यों की तुलना** कराएं — पहला **मुख्य भाव**, दूसरा **संदेश**। इस **3-चरणीय ड्रिल (3-step drill)** को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_009', difficulty: 'standard',
          question: '**गौण भाव** वे द्वितीयक भाव हैं जो काव्य के मुख्य रस को पुष्ट करते हैं, जबकि.',
          hint: 'अगर अटके तो **केंद्रीय भाव और रस** (c10_hin_ks_cbse_02_004) का पुनराभ्यास करें।',
          misconception: 'छात्र अक्सर **गौण भाव** को **मुख्य रस** का पर्याय मान लेते हैं क्योंकि दोनों भावनाएँ हैं; वे नहीं देखते कि गौण भाव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**गौण भाव** वे द्वितीयक भाव हैं जो काव्य के मुख्य रस को पुष्ट करते हैं, जबकि **विषयांतर**',
                  options: ['**गौण भाव** वे द्वितीयक भाव हैं जो काव्य के मुख्य रस को पुष्ट करते हैं, जबकि **विषयांतर**', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'अगर अटके तो **केंद्रीय भाव और रस** (c10_hin_ks_cbse_02_004) का पुनराभ्यास करें।',
                  misconception: 'छात्र अक्सर **गौण भाव** को **मुख्य रस** का पर्याय मान लेते हैं क्योंकि दोनों भावनाएँ हैं; वे नहीं देखते कि गौण भाव मुख्य रस का *सहायक* है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: “मुख्य रस लिखो, फिर हर पद के आगे पूछो — ‘यह मुख्य रस को कैसे बढ़ा रहा है?’” 2.', 'एक काव्यांश में विषयांतर वाले भाग को हाइलाइट करवाएँ और पूछें: “अगर यह भाग हटा दें तो मुख्य भाव पर क्या असर पड़ेगा?” 3.', 'दो कविताएँ साथ रखें — एक में स्पष्ट विषयांतर, दूसरी में नहीं — और तुलना करवाएँ। 4.', 'बोर्ड के पिछले वर्षों के प्रश्न (जैसे “विषयांतर का औचित्य बताइए”) हल करवाएँ ताकि पैटर्न समझ आए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_010', difficulty: 'standard',
          question: 'पदावली (वोकैबुलरी) किसी काव्य-खंड में प्रयुक्त कठिन शब्दों के सटीक अर्थ, उनके.',
          hint: 'अगर अर्थ न खुल रहा हो, तो तुरंत पदांश-वार भावार्थ (c10_hin_ks_cbse_02_002) दोबारा पढ़ें.',
          misconception: 'छात्र समझते हैं कि मुहावरों का अर्थ उनके घटक शब्दों के अर्थों का योग होता है (जैसे "नाक कटना" = नाक + कटना)। वे "नाक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (वोकैबुलरी) किसी काव्य-खंड में प्रयुक्त कठिन शब्दों के सटीक अर्थ, उनके',
                  options: ['पदावली (वोकैबुलरी) किसी काव्य-खंड में प्रयुक्त कठिन शब्दों के सटीक अर्थ, उनके', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'अगर अर्थ न खुल रहा हो, तो तुरंत पदांश-वार भावार्थ (c10_hin_ks_cbse_02_002) दोबारा पढ़ें — वहाँ कवि.',
                  misconception: 'छात्र समझते हैं कि मुहावरों का अर्थ उनके घटक शब्दों के अर्थों का योग होता है (जैसे "नाक कटना" = नाक + कटना)। वे "नाक कटना" को शारीरिक चोट.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को 5 सामान्य मुहावरे दें (जैसे "हाथ धोना", "कान भरना") और कहें कि पहले शाब्दिक चित्र बनाएँ, फिर वास्तविक अर्थ.', 'सूरदास के पद का वह पदांश दें जहाँ मुहावरा आया है; छात्र से पूछें: "कवि ने \'नीर\' क्यों लिखा, \'आँसू\' क्यों नहीं?" 3.', 'छात्र को स्वयं का एक वाक्य बनाकर मुहावरे का प्रयोग करने को कहें। 4.', 'अंत में, पद के केंद्रीय भाव से जोड़कर पूछें: "यह मुहावरा भक्ति-भाव को कैसे तीव्र करता है?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग (Language Usage in Poetry) refers to the deliberate.',
          hint: 'Review Class 9 Hindi Vyakaran: \'वाक्य शुद्धि\' (Sentence Correction) and \'पद परिचय\' (Parts.',
          misconception: 'Students treat poetic grammar deviations as **mistakes to be corrected** rather than **craft choices to be analysed**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग (Language Usage in Poetry) refers to the deliberate deviations from',
                  options: ['पद्य में भाषा-प्रयोग (Language Usage in Poetry) refers to the deliberate deviations from', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'Review Class 9 Hindi Vyakaran: \'वाक्य शुद्धि\' (Sentence Correction) and \'पद परिचय\' (Parts.',
                  misconception: 'Students treat poetic grammar deviations as **mistakes to be corrected** rather than **craft choices to be analysed**.' }
          ],
            remediations: { 'students-treat-poetic-grammar-deviations': { steps: ['**Contrast Exercise:** Give the student a prose sentence and its poetic transformation (e.g., "मैं तुम्हें याद करता.', 'Why would a poet choose the second?" 2.', '**Label the Function:** Provide 5 poetic lines with deviations marked.', 'Student matches each to: [Rhythm] [Rhyme] [Imagery] [Emphasis] [Archaic Flavour].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ बोध‑प्रश्न** वे होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया.',
          hint: 'यदि छात्र अटका हो, तो **‘प्रश्न‑शब्द सूची’** (कौन/क्या/कब/कहाँ/कितना vs क्यों/कैसे/क्या.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **‘क्यों’** शब्द वाले प्रश्न को भी वस्तुनिष्ठ मान लेते हैं जब उत्तर पाठ में सीधे लिखा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ बोध‑प्रश्न** वे होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है',
                  options: ['**वस्तुनिष्ठ बोध‑प्रश्न** वे होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'यदि छात्र अटका हो, तो **‘प्रश्न‑शब्द सूची’** (कौन/क्या/कब/कहाँ/कितना vs क्यों/कैसे/क्या उद्देश्य).',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **‘क्यों’** शब्द वाले प्रश्न को भी वस्तुनिष्ठ मान लेते हैं जब उत्तर पाठ में सीधे लिखा होता है (उदाहरण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को 10 प्रश्नों की सूची दें (मिश्रित) और प्रत्येक के सामने ‘प्रश्न‑शब्द’ रेखांकित करवाएँ। 2.', '**चरण 2:** साथ में एक टेबल बनाएँ — कॉलम: प्रश्न‑शब्द, प्रकार (वस्तुनिष्ठ/आशय‑सूचक), अपेक्षित क्रिया (याद करना/विश्लेषण.', '**चरण 3:** छात्र से प्रत्येक प्रश्न का प्रकार बताने को कहें; गलत होने पर तुरंत समझाएँ कि ‘क्यों/कैसे/क्या उद्देश्य’ →.', '**चरण 4:** दो‑तीन अभ्यास अंशों पर यही प्रक्रिया दोहराएँ जब तक छात्र 90% सही न कर ले।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
