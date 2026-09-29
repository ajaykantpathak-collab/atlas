import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch13_p2: SimDef = {
    id: 'v3_c11_hin_a_ch13_p2',
    title: 'जाग तुझको दूर जाना · Part 2/3',
    subtitle: 'यह नोड \'जाग तुझको दूर जाना\' कविता में प्रयुक्त **प्रतीक** (जैसे: पंथ, प्रातःकाल, दीपक.',
    classLevel: 11, subject: 'hin_a', topic: 'जाग तुझको दूर जाना · Part 2/3',
    chapters: ['c11_hin_a_ch13'],
    nodeIds: ['c11_hin_a_cbse_13_007', 'c11_hin_a_cbse_13_008', 'c11_hin_a_cbse_13_009', 'c11_hin_a_cbse_13_010', 'c11_hin_a_cbse_13_011', 'c11_hin_a_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'जाग तुझको दूर जाना\' में जाग-तुझको-दूर-जाना जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'जाग तुझको दूर जाना — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'जाग तुझको दूर जाना\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['जाग तुझको दूर जाना'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through जाग तुझको दूर जाना like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? जाग तुझको दूर जाना · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — जाग तुझको दूर जाना · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_007', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि फंसे हों तो **c11_hin_a_cbse_13_006 (अलंकार: रूपक vs प्रतीक भेद)** दोबारा पढ़ें — यही.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि **\'प्रतीक\' और \'रूपक\' (Metaphor) एक ही हैं** — क्योंकि दोनों में \'एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जाग तुझको दूर जाना\' के गौण विषय',
                  options: ['\'जाग तुझको दूर जाना\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का कथानक', '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हों तो **c11_hin_a_cbse_13_006 (अलंकार: रूपक vs प्रतीक भेद)** दोबारा पढ़ें — यही भ्रांति.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि **\'प्रतीक\' और \'रूपक\' (Metaphor) एक ही हैं** — क्योंकि दोनों में \'एक वस्तु दूसरी वस्तु के.' }
          ],
            remediations: { 'metaphor': { steps: ['**भेद स्पष्ट करें:** छात्र से कहें — "रूपक में A *है* B (समय *है* धन); प्रतीक में A *की ओर संकेत करता है* B (ध्वज.', '**कविता से उदाहरण:** \'पंथ\' पद को अलग करके पूछें — "क्या कवि कह रहा है \'जीवन पंथ है\' (रूपक)?', 'या \'पंथ चलते हुए जीवन की याद दिलाता है\' (प्रतीक)?" 3.', '**अभ्यास:** तीन शब्द दें (ध्वज, दीपक, सागर) — प्रत्येक के लिए एक रूपक वाक्य और एक प्रतीक प्रयोग लिखवाएं। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_008', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो c11_hin_a_cbse_13_002 (पद्यांश-वार भावार्थ) और c11_hin_a_cbse_13_007 (प्रतीक.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः इस कविता को **"प्रातःकालीन जागरण का वर्णन"** या **"नींद भगाने का उपदेश"** मान लेते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जाग तुझको दूर जाना\' में बिंब (imagery)',
                  options: ['\'जाग तुझको दूर जाना\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का कथानक', '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_13_002 (पद्यांश-वार भावार्थ) और c11_hin_a_cbse_13_007 (प्रतीक और बिंब).',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः इस कविता को **"प्रातःकालीन जागरण का वर्णन"** या **"नींद भगाने का उपदेश"** मान लेते हैं क्योंकि शीर्षक में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**प्रतीक-डीकोडिंग अभ्यास (Symbol Decoding Drill):** छात्र से कहें — "कविता के 5 प्रमुख शब्द चुनो (पथिक, रजनी, प्रभात.', '**शीर्षक-परीक्षण (Title Test):** पूछें — "अगर कविता का शीर्षक \'सुबह की सैर\' होता तो भाव बदल जाता?', 'कैसे?" — इससे शीर्षक \'जाग तुझको दूर जाना\' में निहित **आदेशात्मकता (Imperative)** और **दूरगामी लक्ष्य (Long-term Goal)**.', '**तुलनात्मक अध्ययन:** कक्षा 10 की कविता **"कर्मवीर" (अयोध्या सिंह उपाध्याय \'हरिऔध\')** या **"चरैवेति चरैवेति" (वैदिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_009', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो c11_hin_a_cbse_13_008 (मुख्य भाव) और c11_hin_a_cbse_13_002 (पद्यानुसार.',
          misconception: 'छात्र प्राय: **हर विवरण/वर्णन को गौण भाव** मान लेते हैं और **हर संबोधन/स्मृति को विषयांतर**। वास्तव में, गौण भाव वही है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जाग तुझको दूर जाना\' में विरोधाभास',
                  options: ['\'जाग तुझको दूर जाना\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का कथानक', '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_13_008 (मुख्य भाव) और c11_hin_a_cbse_13_002 (पद्यानुसार भावार्थ) दोबारा.',
                  misconception: 'छात्र प्राय: **हर विवरण/वर्णन को गौण भाव** मान लेते हैं और **हर संबोधन/स्मृति को विषयांतर**। वास्तव में, गौण भाव वही है जो केंद्रीय भाव के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['कविता के 3-4 पद्यों को क्रम से पढ़ो और प्रत्येक के आगे लिखो: **मुख्य/गौण/विषयांतर**। 2.', 'जहाँ \'विषयांतर\' लिखा, वहाँ जाँचो: क्या कवि **जानबूझकर** भटका और **सचेत** लौटा?', 'जहाँ \'गौण भाव\' लिखा, वहाँ पूछो: \'यह केंद्रीय भाव को **कौन-सा नया कोण/बल** देता है?\' उत्तर न मिले → पुनर्विचार करो। 4.', 'शिक्षक/सहपाठी से अपने चिह्नन की तुलना करो और असहमति के बिंदुओं पर बहस करो — यही विश्लेषण कौशल बनेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_010', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **c11_hin_a_cbse_13_002 (पद्यांश-वार भावार्थ)** दोबारा पढ़ें, विशेषकर उन.',
          misconception: 'छात्र समझते हैं कि \'कठिन शब्द\' का अर्थ केवल **शब्दकोश से अर्थ लिखकर रट लेना** है। वे \'चिरंतन\' का अर्थ \'बहुत पुराना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जाग तुझको दूर जाना\' की पदावली',
                  options: ['\'जाग तुझको दूर जाना\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का कथानक', '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_13_002 (पद्यांश-वार भावार्थ)** दोबारा पढ़ें, विशेषकर उन पंक्तियों को.',
                  misconception: 'छात्र समझते हैं कि \'कठिन शब्द\' का अर्थ केवल **शब्दकोश से अर्थ लिखकर रट लेना** है। वे \'चिरंतन\' का अर्थ \'बहुत पुराना\' लिखकर संतुष्ट हो जाते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "कविता की 5 पंक्तियाँ चुनो जहाँ शब्द \'भारी\' लगें। प्रत्येक के लिए लिखो: (क) शब्दकोश अर्थ, (ख) कविता में.', 'फिर समझाएँ: "मुहावरा वह है जिसका अर्थ उसके शब्दों के योग से *अलग* हो (जैसे \'नाक कटना\' = अपमान)। कविता में \'पथ का अंत.', 'अभ्यास दें: कक्षा 10 की किसी कविता (जैसे \'मीरा के पद\') से 3 तत्सम शब्द चुनकर उनका \'शब्दकोश vs संदर्भ\' अंतर लिखवाएँ। 4.', 'अंत में: "शब्द कवि के \'ईंट\' हैं — ईंट बदलोगे तो इमारत (काव्य-संरचना) बदल जाएगी।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_011', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'यदि **वाक्य-विन्यास विचलन (syntactic deviation)** पहचानने में अटके, तो **गद्य-अनुवाद.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **पद्य में व्याकरण के नियम \'टूटते\' (break) हैं** — जैसे "कवि को छूट है, वह कुछ भी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जाग तुझको दूर जाना\' में भाषा-प्रयोग',
                  options: ['\'जाग तुझको दूर जाना\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का कथानक', '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि **वाक्य-विन्यास विचलन (syntactic deviation)** पहचानने में अटके, तो **गद्य-अनुवाद (prose.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **पद्य में व्याकरण के नियम \'टूटते\' (break) हैं** — जैसे "कवि को छूट है, वह कुछ भी लिख सकता है"।.' }
          ],
            remediations: { 'break': { steps: ['**चरण 1:** छात्र से कहें — "एक वाक्य लिखो: \'राम फल खाता है।\' अब इसे **काव्यात्मक** बनाओ **बिना शब्द जोड़े/घटाए** — केवल.', '\'खाता\' पर?" — इससे **वाक्य-विन्यास (word order) = अर्थ-निर्धारण (meaning-making)** सिद्ध होगा। **चरण 3:** कविता की एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_012', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँसें तो नोड 007 (प्रतीक और बिंब) और नोड 004 (केंद्रीय भाव) दोबारा पढ़ें — वहाँ से.',
          misconception: 'छात्र मानते हैं कि आशय-सूचक प्रश्नों का उत्तर \'अनुमान\' (guess) होता है और उसमें पाठ्य साक्ष्य (textual evidence) की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जाग तुझको दूर जाना\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'जाग तुझको दूर जाना\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का कथानक', '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो नोड 007 (प्रतीक और बिंब) और नोड 004 (केंद्रीय भाव) दोबारा पढ़ें — वहाँ से प्रतीक-सूची.',
                  misconception: 'छात्र मानते हैं कि आशय-सूचक प्रश्नों का उत्तर \'अनुमान\' (guess) होता है और उसमें पाठ्य साक्ष्य (textual evidence) की आवश्यकता नहीं होती। वे.' }
          ],
            remediations: { 'guess-textual-evidence': { steps: ['छात्र को एक छोटा पद्यांश (4 पंक्तियाँ) दें और कहें: "केवल एक वस्तुनिष्ठ और एक आशय-सूचक प्रश्न बनाओ।" 2.', 'उसके बनाए प्रश्नों को लेबल करो: O (वस्तुनिष्ठ) / I (आशय-सूचक)। 3.', 'अब I-प्रश्न का उत्तर PEEL ढाँचे में लिखने को कहें: Point (एक वाक्य में उत्तर), Evidence (पंक्ति उद्धृत), Explanation.', 'साथ में बैठकर उसके उत्तर की तुलना मॉडल उत्तर से करें — जहाँ Evidence या Link छूटा हो, वहाँ लाल कलम से चिह्नित करें। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
