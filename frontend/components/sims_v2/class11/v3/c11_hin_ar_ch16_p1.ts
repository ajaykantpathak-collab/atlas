import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch16_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch16_p1',
    title: 'आओ, मलिकर बचाएँ · Part 1/3',
    subtitle: 'Enter a poem that shelters the village inside language itself.',
    classLevel: 11, subject: 'hin_ar', topic: 'आओ, मलिकर बचाएँ · Part 1/3',
    chapters: ['c11_hin_ar_ch16'],
    nodeIds: ['c11_hin_ar_cbse_16_001', 'c11_hin_ar_cbse_16_002', 'c11_hin_ar_cbse_16_003', 'c11_hin_ar_cbse_16_004', 'c11_hin_ar_cbse_16_005', 'c11_hin_ar_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village-born poet writing back to his own roots', intro: 'Rural hunger and city alienation share one poem — and the poet who left the village must decide whether to expose it or protect it.', goal: 'Analyse dialect as aesthetic choice and the poem\'s three-part protective structure.' },
    discovery: {
        question: 'A Nagpuri-speaking poet chooses \'tyok;q\' over standard Hindi \'tyok\' — just dialect flavour?',
        options: ['No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act', 'Yes — it means the same thing either way', 'Yes — he just didn\'t know standard Hindi', 'No — because Nagpuri is actually a different language entirely'],
        answer: 'No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act',
        hook: 'The poem\'s \'let\'s hide/save\' means both conceal and protect — the insider-outsider poet wraps language around wounds so they can be witnessed without being exposed.',
    },
    teaching: [
        { title: 'आओ, मलिकर बचाएँ — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ, साहित्यिक योगदान) तथा कविता लिखे जाने के ऐतिहासिक, सामाजिक, सांस्कृतिक एवं व्यक्तिगत संदर्भ (पृष्ठभूमि) का व्यवस्थित.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_16_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the three-stanza arc — invitation, catalog of burdens, quiet resistance — and test whether the shape is inevitable or arbitrary.',
        labels: ['आओ, मलिकर बचाएँ —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_004', title: 'आओ, मलिकर बचाएँ — केंद्रीय भाव और रस',
          caseStudy: { intro: 'Have you ever listened to an old folk song your grandmother sings and felt a sudden, sharp ache — not just nostalgia, but a panic that *you* might be the last.',
            decisions: [{ prompt: 'केंद्रीय भाव (Central Emotion) और विषय (Theme/Subject) में मूलभूत अंतर क्या है?', options: [
                { text: '**Correct Answer:** विषय (Theme) कविता का *विषय-वस्तु* है', outcome: '**Correct Answer:** विषय (Theme) कविता का *विषय-वस्तु* है — यहाँ "मलिकर नामक लोककला/वाद्य का.' },
                { text: 'मलिकर नामक लोककला/वाद्य का संरक्षण', outcome: 'Not quite — **Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव").', reveals: 'specific-error-students-mechanically-apply' },
                { text: '। **Wrong Answer Reveals:** If', outcome: 'Not quite — **Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव").', reveals: 'specific-error-students-mechanically-apply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A translation club discusses a Nagpur-born poet who writes in Marathi and translates himself into Hindi, with a poem that begins \'come, let us hide\' and ends in quiet resistance. A member says: \'Pick either the village reading or the city reading — a poem can\'t be both. And the second stanza\'s long list is just imagery.\'',
            decisions: [{ prompt: 'What do both claims miss?', options: [
                { text: 'Hold the fracture: the poem speaks from inside the split between two Indias — the village with its caste, hunger and oral tradition versus the city with alienation and broken promises; the poet\'s self-translation embodies that crossing. And the list IS structure: stanza one commands (\'hide\'), stanza two stacks the burdens of modernity as rhythmic accumulation, stanza three turns declarative — \'even in this night, there\'s still much to hide.\' The form performs the hiding.', outcome: 'Both corrections land: the doubleness is the poem\'s subject, and the stanza pattern — imperative, catalogue, declaration — is the argument enacted, not ornament.' },
                { text: 'Choose the city reading — the poem lists modern burdens, so it\'s about urban alienation only.', outcome: 'Halving it destroys the tension: the poem\'s meaning lives in the contrast between village and city, agrarian memory and urban displacement.', reveals: 'pick-one-world-reading' },
                { text: 'Treat the middle stanza\'s list as decorative imagery to be sampled, not analysed.', outcome: 'The accumulation is structural enactment — the burdens pile up rhythmically so the reader feels the weight the speaker hides from.', reveals: 'list-is-just-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'Invitation → enumeration → affirmation: a three-beat arc where each stanza tucks the reader deeper into what the modern world erodes.',
            decisions: [{ prompt: 'What comes next? आओ, मलिकर बचाएँ · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आओ, मलिकर बचाएँ · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख.',
          hint: 'If stuck, review Class 10 Hindi \'काव्य सौंदर्य\' or \'साहित्य परिचय\' chapters covering.',
          misconception: '**विशिष्ट भ्रांति:** "कवि परिचय = जन्मतिथि, मृत्युतिथि, प्रसिद्ध रचनाओं की सूची रट लेना।" **क्यों होती है:** कक्षा 10.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद', '**केंद्रीय भाव (Central Emotion)** is the poet\'s core, synthesized attitude toward the'],
                  hint: 'If stuck, review Class 10 Hindi \'काव्य सौंदर्य\' or \'साहित्य परिचय\' chapters covering प्रगतिशील.',
                  misconception: '**विशिष्ट भ्रांति:** "कवि परिचय = जन्मतिथि, मृत्युतिथि, प्रसिद्ध रचनाओं की सूची रट लेना।" **क्यों होती है:** कक्षा 10 तक \'जीवन परिचय\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "कवि की **तीन प्रमुख जीवन-घटनाएँ** लिखो जो तुम्हें **भावनात्मक रूप से उद्वेलित (emotionally.', 'संबोधन?" **चरण 3:** अब कविता खोलें और **एक-एक पंक्ति** के आगे वही तीर खींचें: "यह पंक्ति किस घटना से निकली?" **चरण 4:**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार.',
          hint: 'यदि प्रसंग या प्रतीक समझ न आएँ तो नोड 16_001 (कवि परिचय) और नोड 16_007 (प्रतीक और बिंब).',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि भावार्थ लिखने का अर्थ है **प्रत्येक शब्द का समानार्थी लिख देना** या **पंक्तियों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और',
                  options: ['पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद', '**केंद्रीय भाव (Central Emotion)** is the poet\'s core, synthesized attitude toward the'],
                  hint: 'यदि प्रसंग या प्रतीक समझ न आएँ तो नोड 16_001 (कवि परिचय) और नोड 16_007 (प्रतीक और बिंब) दोबारा.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि भावार्थ लिखने का अर्थ है **प्रत्येक शब्द का समानार्थी लिख देना** या **पंक्तियों का क्रमशः हिंदी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "कविता की कोई एक पंक्ति लो और बताओ — कवि ने *यही शब्द क्यों चुना*, उसकी जगह दूसरा शब्द क्यों नहीं?".', 'उसी पंक्ति का **शब्दार्थ → प्रसंगार्थ → भावार्थ** तीन कॉलम में लिखवाएँ — अंतर स्पष्ट होगा। 3.', 'कक्षा में **दो नमूने** दिखाएँ: (क) कमजोर भावार्थ (केवल अनुवाद) और (ख) सशक्त भावार्थ (प्रसंग+व्यंजना+अलंकार+केंद्रीय.', 'गृहकार्य: प्रतिदिन एक पद्यांश का भावार्थ लिखें और सहपाठी से जँचवाएँ — \'क्या इसमें कवि की वेदना/आह्वान झलक रहा है?\' इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_003', difficulty: 'standard',
          question: 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_16_002 and create a 4-row table: Stanza | Core Meaning.',
          misconception: 'विद्यार्थी अक्सर समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल \'पद गिनना\' या \'तुक मिलाना\' है। वे यह नहीं देखते कि कवि ने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद',
                  options: ['काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', '**केंद्रीय भाव (Central Emotion)** is the poet\'s core, synthesized attitude toward the'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_16_002 and create a 4-row table: Stanza | Core Meaning | Key.',
                  misconception: 'विद्यार्थी अक्सर समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल \'पद गिनना\' या \'तुक मिलाना\' है। वे यह नहीं देखते कि कवि ने *क्यों* तीसरे पद को 4.' }
          ],
            remediations: { '4-6-structural-silence-structural': { steps: ['चरण 1: विद्यार्थी से कहें — "कविता को फिर से पढ़ो, लेकिन इस बार आँखें बंद करके केवल *सुनो*: कहाँ तुम्हारी साँस.', 'वहीं पद-भंग (stanza break) है।" चरण 2: प्रत्येक पद की अंतिम पंक्ति को रेखांकित करो और पूछो: "यह पंक्ति अगले पद की पहली.', 'विरोध?" चरण 3: एक टेबल बनाओ: स्तंभ 1 = पद संख्या, स्तंभ 2 = पंक्ति संख्या, स्तंभ 3 = भाव-कार्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_004', difficulty: 'standard',
          question: '**केंद्रीय भाव (Central Emotion)** is the poet\'s core, synthesized attitude.',
          hint: 'If stuck, review **Class 10 Hindi (Kshitij/Kritika) Chapter on "रस और उसके भेद"**.',
          misconception: '**Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव") and Veer Rasa.',
          parts: [
                { id: 'a', prompt: 'केंद्रीय भाव (Central Emotion) और विषय (Theme/Subject) में मूलभूत अंतर क्या है? "आओ, मलिकर बचाएँ" कविता के संदर्भ में उदाहरण देकर स्पष्ट कीजिए।', answer: '**Correct Answer:** विषय (Theme) कविता का *विषय-वस्तु* है',
                  options: ['**Correct Answer:** विषय (Theme) कविता का *विषय-वस्तु* है', 'मलिकर नामक लोककला/वाद्य का संरक्षण', '। **Wrong Answer Reveals:** If', 'sadness'],
                  hint: 'If stuck, review **Class 10 Hindi (Kshitij/Kritika) Chapter on "रस और उसके भेद"** — specifically.',
                  misconception: '**Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव") and Veer Rasa ("ऊत्साह स्थायी भाव").' },
                { id: 'b', prompt: 'भरत के रस-सूत्र "विभावानुभावव्यभिचारिसंयोगाद्रसनिर्माणः" को इस कविता के **प्रथम दो पद्यांशों** पर लागू करके दिखाइए कि करुण रस की निष्पत्ति कैसे होती है। विभाव.', answer: '**Correct Answer:** * **आलम्बन विभाव:** मलिकर (वाद्य/कला)',
                  options: ['**Correct Answer:** * **आलम्बन विभाव:** मलिकर (वाद्य/कला)', 'फटे बही', 'टूटी तान', 'मौन पड़े साज'],
                  hint: 'If stuck, review **Class 10 Hindi (Kshitij/Kritika) Chapter on "रस और उसके भेद"** — specifically.',
                  misconception: '**Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव") and Veer Rasa ("ऊत्साह स्थायी भाव").' },
                { id: 'c', prompt: 'कविता के अंतिम पद्यांश में "आओ, मलिकर बचाएँ" की पुनरावृत्ति (अनुप्रास/अनुप्रासात्मक लय के साथ) करुण रस को वीर रस में कैसे परिवर्तित/संशोधित करती है?', answer: '**Correct Answer:** प्रारंभिक संचारी भाव',
                  options: ['**Correct Answer:** प्रारंभिक संचारी भाव', '(आह्वान)', '(संकल्प/कर्म)', 'को दबा नहीं देता, बल्कि उसे **वीर रस के स्थायी भाव'],
                  hint: 'If stuck, review **Class 10 Hindi (Kshitij/Kritika) Chapter on "रस और उसके भेद"** — specifically.',
                  misconception: '**Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव") and Veer Rasa ("ऊत्साह स्थायी भाव").' }
          ],
            remediations: { 'specific-error-students-mechanically-apply': { steps: ['**Step-by-Step Remediation:** 1.', '**Concrete Re-enactment:** Ask the student to recall a *personal* moment where grief turned into determined action.', 'Have them label their *own* shifting संचारी भाव: विषाद → चिंता → निश्चय → उत्साह। This grounds the abstract theory.', '**Text Mapping with Arrows:** Print the poem.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_005', difficulty: 'standard',
          question: 'छंद कविता का वह निश्चित छंदोबद्ध रूप है जिसमें प्रत्येक चरण (पंक्ति) की.',
          hint: 'यदि मात्रा गिनने में अटकें तो **\'मात्रा-गणना नियम कार्ड\'** (Guru-Laghu Rule Card) बनाकर.',
          misconception: 'छात्र समझते हैं कि **छंद = तुकबंदी (Rhyme)**। वे पंक्ति के अंतिम शब्दों का मिलान (जैसे \'बचाएँ/बताएँ\') देखकर छंद पहचान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता का वह निश्चित छंदोबद्ध रूप है जिसमें प्रत्येक चरण (पंक्ति) की मात्राओं की',
                  options: ['छंद कविता का वह निश्चित छंदोबद्ध रूप है जिसमें प्रत्येक चरण (पंक्ति) की मात्राओं की', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'यदि मात्रा गिनने में अटकें तो **\'मात्रा-गणना नियम कार्ड\'** (Guru-Laghu Rule Card) बनाकर रखें: दीर्घ.',
                  misconception: 'छात्र समझते हैं कि **छंद = तुकबंदी (Rhyme)**। वे पंक्ति के अंतिम शब्दों का मिलान (जैसे \'बचाएँ/बताएँ\') देखकर छंद पहचान लेते हैं और मात्रिक.' }
          ],
            remediations: { 'rhyme': { steps: ['**मात्रा-गणना अभ्यास**: छात्र को प्रतिदिन 5 पंक्तियाँ (पाठ्यपुस्तक से) देकर गुरु-लघु चिह्नित करवाएँ: दीर्घ स्वर (आ, ई.', '**छंद-लक्षण चार्ट** बनवाएँ: मत्तगयंद/रोला/हरिगीतिका/दोहा के लक्षण (मात्रा, यति, गति) एक टेबल में भरवाएँ। 3.', '**तुलनात्मक पठन**: उसी भाव को दो छंदों में पढ़वाएँ (मत्तगयंद vs रोला) और पूछें — "कौन-सा छंद आंदोलन का आह्वान लगता है?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_006', difficulty: 'standard',
          question: 'अलंकार (Alankar) काव्य की वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों की.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_16_002 and write a one-sentence summary of each stanza.',
          misconception: 'Students treat alankar identification as a "labeling game" — they memorize definitions (e.g., "upama uses jaise") and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Alankar) काव्य की वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों की विशेष रचना',
                  options: ['अलंकार (Alankar) काव्य की वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों की विशेष रचना', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_16_002 and write a one-sentence summary of each stanza in your.',
                  misconception: 'Students treat alankar identification as a "labeling game" — they memorize definitions (e.g., "upama uses jaise") and hunt for keywords.' }
          ],
            remediations: { 'students-treat-alankar-identification-as': { steps: ['Take any 3 lines from the poem where alankar occurs.', 'Force the student to rewrite the line *literally* (without alankar) — e.g., "मलिकर सूख रहे हैं" instead of "मलिकर रो.', 'Ask: "What did we lose? What feeling vanished?"', 'Have them write the answer in this template: "अलंकार: X | शाब्दिक रूप: Y | खोया हुआ भाव: Z | इसलिए कवि ने X चुना।".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
