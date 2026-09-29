import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch22_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch22_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch22_p2',
    title: 'आत्मत्राण · Part 2/3',
    subtitle: 'यह नोड केवल \'आत्मत्राण\' कविता में प्रयुक्त **प्रतीक और बिंब** के विश्लेषण तक सीमित है.',
    classLevel: 10, subject: 'hin_sp', topic: 'आत्मत्राण · Part 2/3',
    chapters: ['c10_hin_sp_ch22'],
    nodeIds: ['c10_hin_sp_cbse_22_007', 'c10_hin_sp_cbse_22_008', 'c10_hin_sp_cbse_22_009', 'c10_hin_sp_cbse_22_010', 'c10_hin_sp_cbse_22_011', 'c10_hin_sp_cbse_22_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'आत्मत्राण\' में आत्मत्राण जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'आत्मत्राण — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'आत्मत्राण\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_22_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['आत्मत्राण — साहित्यिक युक्तियाँ', 'आत्मत्राण — मुख्य भाव', 'आत्मत्राण — गौण भाव', 'आत्मत्राण — पदावली: कठिन', 'आत्मत्राण — व्याकरण: पद्य', 'आत्मत्राण — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_22_008', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Recall the concept from c10_hin_sp_cbse_22_007 — these are.', 'Identify the key terms in the question — \'कवच\', \'ढाल\'.', 'Synthesize: The rejection of external shields proves that.', 'Contrast with what the poet *affirms* — \'अपनी अग्नि\', \'अपनी.', 'Frame the answer in CBSE 3-mark structure: (i) Point.'], answer: 'Identify the key terms in the question — \'कवच\', \'ढाल\'. Recall the concept from c10_hin_sp_cbse_22_007 — these are. Contrast with what the poet *affirms* — \'अपनी अग्नि\', \'अपनी. Synthesize: The rejection of external shields proves that. Frame the answer in CBSE 3-mark structure: (i) Point.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_22_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through आत्मत्राण like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? आत्मत्राण · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आत्मत्राण · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_007', difficulty: 'standard',
          question: '\'आत्मत्राण\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो **नोड 002 (पद्यांश-वार भावार्थ)** और **नोड 006 (अलंकार)** दोहराएँ — विशेषतः.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **हर रूपक (Metaphor) प्रतीक (Symbol) होता है**। उदाहरण: कविता में "जीवन एक नदी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आत्मत्राण\' के गौण विषय',
                  options: ['\'आत्मत्राण\' के गौण विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = मूल कवि रवींद्रनाथ ठाकुर का संक्षिप्त परिचय', '\'आत्मत्राण\' का कथानक', '\'आत्मत्राण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **नोड 002 (पद्यांश-वार भावार्थ)** और **नोड 006 (अलंकार)** दोहराएँ — विशेषतः रूपक की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **हर रूपक (Metaphor) प्रतीक (Symbol) होता है**। उदाहरण: कविता में "जीवन एक नदी है" — छात्र तुरंत.' }
          ],
            remediations: { 'metaphor-symbol': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**स्पष्ट करो:** "बेटा, रूपक = **एक बार की तुलना** (उपमा बिना \'जैसे\' के)। प्रतीक = **बार-बार आकर बना स्थायी संकेतक**।".', '**अभ्यास कराओ:** \'आत्मत्राण\' कविता से ५ शब्द चुनो (जैसे: दीपक, अंधेरा, रक्त, पत्थर, पथ)। प्रत्येक के लिए पूछो: "कितनी.', 'हर बार अर्थ समान रहा या बदला?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_008', difficulty: 'standard',
          question: '\'आत्मत्राण\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, review c10_hin_sp_cbse_22_007 (प्रतीक और बिंब) — focus on the distinction.',
          misconception: '**विशिष्ट भ्रम:** छात्र "आत्मत्राण" को "आत्मरक्षा" (self-defense) या "स्वार्थपरता" (selfishness) समझ बैठते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आत्मत्राण\' में बिंब (imagery)',
                  options: ['\'आत्मत्राण\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = मूल कवि रवींद्रनाथ ठाकुर का संक्षिप्त परिचय', '\'आत्मत्राण\' का कथानक', '\'आत्मत्राण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review c10_hin_sp_cbse_22_007 (प्रतीक और बिंब) — focus on the distinction between.',
                  misconception: '**विशिष्ट भ्रम:** छात्र "आत्मत्राण" को "आत्मरक्षा" (self-defense) या "स्वार्थपरता" (selfishness) समझ बैठते हैं। वे कविता में आए \'अपना.' }
          ],
            remediations: { 'self-defense-selfishness': { steps: ['**चरणबद्ध उपचार (Step-by-step Remediation):** 1.', '**प्रतीक पुनः स्पष्ट करें:** कक्षा में \'अग्नि\', \'ज्योति\', \'पथ\' — इन तीन प्रतीकों को बोर्ड पर लिखें और पूछें: "क्या.', 'क्या ज्योति केवल अपने लिए चमकती है?', 'क्या पथ केवल एक व्यक्ति के लिए बनता है?" — छात्रों से उत्तर लेकर *सही अर्थ* (शुद्धि, मार्गदर्शन, सर्वहित) लिखवाएँ। 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_009', difficulty: 'standard',
          question: '\'आत्मत्राण\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका हुआ महसूस हो, तो c10_hin_sp_cbse_22_004 (केंद्रीय भाव) और c10_hin_sp_cbse_22_007.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'गौण भाव\' का अर्थ \'कम महत्व का भाव\' या \'सजावटी प्रसंग\' होता है**, इसलिए वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आत्मत्राण\' में विरोधाभास',
                  options: ['\'आत्मत्राण\' में विरोधाभास', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = मूल कवि रवींद्रनाथ ठाकुर का संक्षिप्त परिचय', '\'आत्मत्राण\' का कथानक', '\'आत्मत्राण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो c10_hin_sp_cbse_22_004 (केंद्रीय भाव) और c10_hin_sp_cbse_22_007 (प्रतीक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'गौण भाव\' का अर्थ \'कम महत्व का भाव\' या \'सजावटी प्रसंग\' होता है**, इसलिए वे परीक्षा में लिख देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**शब्द-भेद स्पष्ट करो:** कक्षा में \'गौण\' शब्द के दो अर्थ लिखवाओ — (अ) दैनिक: कम महत्व का, (ब) साहित्यिक: मुख्य का.', 'नहीं, वह मुख्य दीवार का **आधार** है। गौण भाव भी नींव जैसा है।" 2.', '**कार्यात्मक परीक्षण (Functional Test) सिखाओ:** किसी भी प्रसंग के लिए तीन प्रश्न पूछने का अभ्यास कराओ — (i) क्या यह.', '(ii) क्या यह मुख्य भाव को स्पष्ट/मजबूत करता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_010', difficulty: 'standard',
          question: '\'आत्मत्राण\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, return to **c10_hin_sp_cbse_22_002 (पद्यांश-वार भावार्थ)** and re-read the.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"पदावली याद करना" = "कठिन शब्दों के शब्दकोश अर्थ रट लेना"**। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आत्मत्राण\' की पदावली',
                  options: ['\'आत्मत्राण\' की पदावली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = मूल कवि रवींद्रनाथ ठाकुर का संक्षिप्त परिचय', '\'आत्मत्राण\' का कथानक', '\'आत्मत्राण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, return to **c10_hin_sp_cbse_22_002 (पद्यांश-वार भावार्थ)** and re-read the specific.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"पदावली याद करना" = "कठिन शब्दों के शब्दकोश अर्थ रट लेना"**। **वास्तविकता:** बोर्ड परीक्षा में.' }
          ],
            remediations: { '30-40': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**मूल कारण पहचानें:** छात्र से पूछें — "कविता की इस पंक्ति में \'निर्झर\' शब्द हटाकर \'झरना\' लिख दें तो क्या फर्क पड़ेगा?".', '**तुलनात्मक अभ्यास कराएँ:** एक शीट पर 5 कठिन शब्द लें (दुर्निवार, अनवरत, प्राणपण, निर्झर, फुफकार)। तीन कॉलम बनाएँ: (क).', '**\'क्यों?\' का अभ्यास:** हर शब्द के लिए छात्र को **एक वाक्य में** लिखना होगा: *"कवि ने \'फुफकारता\' चुना क्योंकि वह ______.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_011', difficulty: 'standard',
          question: '\'आत्मत्राण\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'यदि फंसें तो: **कक्षा 9 हिंदी व्याकरण — \'शब्द विचार\' और \'वाक्य विचार\' अध्याय** दोहराएं.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ केवल \'कठिन शब्दों की पहचान\' या \'अलंकार ढूंढना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आत्मत्राण\' में भाषा-प्रयोग',
                  options: ['\'आत्मत्राण\' में भाषा-प्रयोग', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = मूल कवि रवींद्रनाथ ठाकुर का संक्षिप्त परिचय', '\'आत्मत्राण\' का कथानक', '\'आत्मत्राण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसें तो: **कक्षा 9 हिंदी व्याकरण — \'शब्द विचार\' और \'वाक्य विचार\' अध्याय** दोहराएं, विशेषकर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ केवल \'कठिन शब्दों की पहचान\' या \'अलंकार ढूंढना\' है। वे **शब्द-चयन के.' }
          ],
            remediations: { 'functional-reason': { steps: ['**पुनर्पाठ (Re-read) करें:** कविता के किसी एक पद को चुनें (जैसे पहला पद)। हर शब्द को रेखांकित करें और पूछें: "यह शब्द.', 'इसका पर्यायवाची (Synonym) क्यों नहीं?" 2.', '**वर्गीकरण तालिका बनाएं:** एक कागज पर 4 कॉलम बनाएं: तत्सम, तद्भव, देशज, विदेशी। कविता के 20 शब्द भरें। फिर देखें: किस.', 'किस भाव के साथ कौन-सा वर्ग जुड़ा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_012', difficulty: 'standard',
          question: '\'आत्मत्राण\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो c10_hin_sp_cbse_22_002 (पद्यांश-वार भावार्थ) और c10_hin_sp_cbse_22_007.',
          misconception: 'छात्रों की सबसे बड़ी भ्रांति यह है कि **\'आशय-सूचक\' और \'भावार्थ/सरलार्थ\' एक ही चीज़ हैं** — वे मानते हैं कि पंक्तियों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आत्मत्राण\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'आत्मत्राण\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = मूल कवि रवींद्रनाथ ठाकुर का संक्षिप्त परिचय', '\'आत्मत्राण\' का कथानक', '\'आत्मत्राण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_22_002 (पद्यांश-वार भावार्थ) और c10_hin_sp_cbse_22_007 (प्रतीक और बिंब).',
                  misconception: 'छात्रों की सबसे बड़ी भ्रांति यह है कि **\'आशय-सूचक\' और \'भावार्थ/सरलार्थ\' एक ही चीज़ हैं** — वे मानते हैं कि पंक्तियों को आसान भाषा में लिख.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **\'भावार्थ\' और \'आशय\' के दो कॉलम वाला चार्ट** बनाने को कहें — बाईं ओर 5 पंक्तियों के भावार्थ, दाईं ओर उन्हीं के.', 'हर आशय-सूचक उत्तर के लिए **PEEL संरचना** सिखाएँ: **P**oint (कवि का अभिप्राय एक वाक्य में), **E**vidence (पंक्ति/शब्द.', 'बोर्ड के गत 5 वर्षों के **आशय-सूचक प्रश्न** निकालकर छात्र से पहचान करवाएँ — \'क्यों\', \'कैसे\', \'स्पष्ट कीजिए\', \'विवेचना.', 'अभ्यास हेतु प्रतिदिन एक पद्यांश देकर **दोनों प्रकार के 2-2 प्रश्न** बनाने और हल करने को कहें — 7 दिन में स्वतः भेद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
