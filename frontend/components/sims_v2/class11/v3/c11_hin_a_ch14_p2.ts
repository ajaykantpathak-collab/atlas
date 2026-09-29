import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch14_p2: SimDef = {
    id: 'v3_c11_hin_a_ch14_p2',
    title: 'बादल को घरिते देखा है · Part 2/3',
    subtitle: 'This node covers the identification, classification, and functional analysis of **प्रतीक.',
    classLevel: 11, subject: 'hin_a', topic: 'बादल को घरिते देखा है · Part 2/3',
    chapters: ['c11_hin_a_ch14'],
    nodeIds: ['c11_hin_a_cbse_14_007', 'c11_hin_a_cbse_14_008', 'c11_hin_a_cbse_14_009', 'c11_hin_a_cbse_14_010', 'c11_hin_a_cbse_14_011', 'c11_hin_a_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'बादल को घिरते देखा है\' में बादल-को-घिरते-देखा-है जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'बादल को घरिते देखा है — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'बादल को घिरते देखा है\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['बादल को घरिते देखा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through बादल को घरिते देखा है like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? बादल को घरिते देखा है · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बादल को घरिते देखा है · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_007', difficulty: 'standard',
          question: '\'बादल को घिरते देखा है\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review **व्यंजना वृत्ति (Suggestive Function)** from Class 10 Hindi grammar.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'प्रतीक\' का अर्थ है \'छिपा हुआ अर्थ\' (Hidden Meaning) जिसे \'डिकोड\' (Decode).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बादल को घिरते देखा है\' के गौण विषय',
                  options: ['\'बादल को घिरते देखा है\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'बादल को घिरते देखा है\' का कथानक', '\'बादल को घिरते देखा है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **व्यंजना वृत्ति (Suggestive Function)** from Class 10 Hindi grammar.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'प्रतीक\' का अर्थ है \'छिपा हुआ अर्थ\' (Hidden Meaning) जिसे \'डिकोड\' (Decode) करके निकालना पड़ता.' }
          ],
            remediations: { 'hidden-meaning-decode': { steps: ['**चरण 1 (वापसी):** छात्र को कविता के **प्रथम दो पद** केवल **बिंब-शोधन (Image Hunting)** के लिए पढ़वाएं — निर्देश: "हर.', '**चरण 2 (सेतु):** अब उन्हीं घिरे शब्दों से पूछो: *"कवि ने \'श्वेत चादर\' क्यों कहा, \'सफेद कपड़ा\' क्यों नहीं?', '\'वक्षस्थल\' क्यों कहा, \'सीना\' या \'छाती\' क्यों नहीं?"* — इससे **शब्द-चयन (Diction)** और **बिंब-निर्माण** की बारीकी.', '**चरण 3 (प्रतीक-उत्पत्ति):** अब दिखाओ: *"देखो, \'श्वेत चादर\' (बिंब) ने बादल को \'पवित्र/निर्भार\' बनाया; \'वक्षस्थल\' (बिंब).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_008', difficulty: 'standard',
          question: '\'बादल को घिरते देखा है\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_14_007 (प्रतीक विवेचन)** दोबारा पढ़ें और.',
          misconception: 'छात्र समझते हैं कि कविता **\'बादल = दुख\' और \'सूरज = सुख\'** का सरल द्वैत (binary) रचती है, इसलिए वे उत्तर में लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बादल को घिरते देखा है\' में बिंब (imagery)',
                  options: ['\'बादल को घिरते देखा है\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'बादल को घिरते देखा है\' का कथानक', '\'बादल को घिरते देखा है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_14_007 (प्रतीक विवेचन)** दोबारा पढ़ें और प्रत्येक प्रतीक.',
                  misconception: 'छात्र समझते हैं कि कविता **\'बादल = दुख\' और \'सूरज = सुख\'** का सरल द्वैत (binary) रचती है, इसलिए वे उत्तर में लिखते हैं: *"कवि कहता है दुख के.' }
          ],
            remediations: { 'binary': { steps: ['छात्र को कविता के **पहले तीन पद** जोर से पढ़वाएं और पूछें: *"कवि बादल से डरने को कह रहा है या उसे समझने को?"* 2.', 'बोर्ड पर लिखें: **घिरना → बरसना → धुलना → चमकना** — यह एक **श्रृंखला** है, चार अलग घटनाएँ नहीं। 3.', 'छात्र से कहें: *"अपने जीवन का एक क्षण याद करो जब कोई बुरी घटना (घिरना) बाद में तुम्हारे लिए सबक/ताकत (बरसना/धुलना).', 'फिर कविता के अंतिम दो पद पढ़कर पूछें: *"अब बताओ, बादल खलनायक है या सहायक?"* — इससे **प्रतीक की द्विधा (ambivalence)**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_009', difficulty: 'standard',
          question: '\'बादल को घिरते देखा है\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि मुख्य भाव अस्पष्ट है, तो c11_hin_a_cbse_14_004 (केंद्रीय भाव और रस) और.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'वर्णनात्मक विस्तार\' (descriptive elaboration)** को **\'विषयांतर\' (digression)** समझ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बादल को घिरते देखा है\' में विरोधाभास',
                  options: ['\'बादल को घिरते देखा है\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'बादल को घिरते देखा है\' का कथानक', '\'बादल को घिरते देखा है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मुख्य भाव अस्पष्ट है, तो c11_hin_a_cbse_14_004 (केंद्रीय भाव और रस) और c11_hin_a_cbse_14_008.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'वर्णनात्मक विस्तार\' (descriptive elaboration)** को **\'विषयांतर\' (digression)** समझ लेते हैं। **उदाहरण:**.' }
          ],
            remediations: { 'descriptive-elaboration-digression': { steps: ['**पहचान अभ्यास:** कविता के 3 स्टैंजा चुनें — छात्र से कहें: "हर स्टैंजा में **काल** (वर्तमान/अतीत/भविष्य), **व्यक्ति**.', '**तुलना सारणी:** बोर्ड पर दो कॉलम बनाएँ — **गौण भाव** (काल: वर्तमान, व्यक्ति: तृतीय पुरुष, क्रिया: मुख्य भाव से सीधा.', '**लागू करना:** छात्र से कहें: "स्टैंजा 2 और स्टैंजा 4 में से कौन गौण भाव है और कौन विषयांतर?', 'अपने चिह्नित काल-व्यक्ति-क्रिया से सिद्ध करो।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_010', difficulty: 'standard',
          question: '\'बादल को घिरते देखा है\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी.',
          hint: 'अगर फंसे हों तो c11_hin_a_cbse_14_001 (कवि परिचय) के \'ब्रजभाषा और सूरदास\' खंड को दोबारा.',
          misconception: 'छात्र समझते हैं कि \'कठिन शब्दों के अर्थ\' लिखने का अर्थ है शब्दकोश से अर्थ नकल करना। वे नहीं देख पाते कि सूरदास जैसे कवि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बादल को घिरते देखा है\' की पदावली',
                  options: ['\'बादल को घिरते देखा है\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'बादल को घिरते देखा है\' का कथानक', '\'बादल को घिरते देखा है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर फंसे हों तो c11_hin_a_cbse_14_001 (कवि परिचय) के \'ब्रजभाषा और सूरदास\' खंड को दोबारा पढ़ें — वही.',
                  misconception: 'छात्र समझते हैं कि \'कठिन शब्दों के अर्थ\' लिखने का अर्थ है शब्दकोश से अर्थ नकल करना। वे नहीं देख पाते कि सूरदास जैसे कवि ब्रजभाषा के शब्दों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता की वह पंक्ति जोर से पढ़वाएं जहां शब्द आया है; पूछें: "यहां कवि क्या *दिखा* रहा है और क्या *सुना* रहा.', 'शब्द का तत्सम मूल और तद्भव परिवर्तन एक तालिका में लिखवाएं (मूल → प्राकृत → ब्रज → आधुनिक हिंदी)। 3.', 'उसी शब्द का आधुनिक हिंदी विकल्प लिखवाएं और दोनों वाक्यों को जोर से पढ़कर अंतर सुनने को कहें (गेयता, लय, भाव)। 4.', 'अंत में पूछें: "कवि ने यही शब्द क्यों चुना?" — उत्तर में \'सांस्कृतिक संदर्भ\', \'ध्वनि-योजना\', \'बिम्ब-विधान\' जैसे पद आने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_011', difficulty: 'standard',
          question: '\'बादल को घिरते देखा है\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि अटके तो c11_hin_a_cbse_14_010 (पदावली) और c11_hin_a_cbse_14_006 (अलंकार) को दोबारा.',
          misconception: 'छात्र समझते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ है **कठिन/तत्सम शब्दों का भरमार करना** या \'अलंकारों की पहचान भर कर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बादल को घिरते देखा है\' में भाषा-प्रयोग',
                  options: ['\'बादल को घिरते देखा है\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'बादल को घिरते देखा है\' का कथानक', '\'बादल को घिरते देखा है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_14_010 (पदावली) और c11_hin_a_cbse_14_006 (अलंकार) को दोबारा देखें.',
                  misconception: 'छात्र समझते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ है **कठिन/तत्सम शब्दों का भरमार करना** या \'अलंकारों की पहचान भर कर लेना\'। वे नहीं देख.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता की **एक पंक्ति** दें (जैसे "पयोद अमल-धवल शशि सो")। 2.', 'कहें: "हर शब्द को **माइक्रोस्कोप** से देखो — (अ) इसकी ध्वनि क्या करती है?', '(ब) इसका मूल अर्थ क्या है?', '(स) यह यहाँ क्या *सुझा* रहा है जो दूसरा शब्द न सुझा पाता?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_012', difficulty: 'standard',
          question: '\'बादल को घिरते देखा है\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो c11_hin_a_cbse_14_002 (पद्यांश-वार भावार्थ) और c11_hin_a_cbse_14_010 (कठिन.',
          misconception: 'छात्र अक्सर मानते हैं कि आशय-सूचक प्रश्न का उत्तर \'कविता का सारांश\' लिख देना है। उदाहरण: प्रश्न — "कवि ने बादल को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बादल को घिरते देखा है\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'बादल को घिरते देखा है\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'बादल को घिरते देखा है\' का कथानक', '\'बादल को घिरते देखा है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_14_002 (पद्यांश-वार भावार्थ) और c11_hin_a_cbse_14_010 (कठिन शब्द) पर.',
                  misconception: 'छात्र अक्सर मानते हैं कि आशय-सूचक प्रश्न का उत्तर \'कविता का सारांश\' लिख देना है। उदाहरण: प्रश्न — "कवि ने बादल को \'घिरते\' क्यों कहा?" छात्र.' }
          ],
            remediations: { '1-choice': { steps: ['चरण 1: छात्र से कहें — "पहले केवल वह पंक्ति बोलो जिस पर प्रश्न पूछा गया है, फिर बताओ कवि ने *ठीक वही शब्द* क्यों चुना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
