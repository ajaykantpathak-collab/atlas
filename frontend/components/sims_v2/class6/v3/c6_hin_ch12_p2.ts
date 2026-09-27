import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch12_p2: SimDef = {
    id: 'v3_c6_hin_ch12_p2',
    title: 'पाठ 12 · Part 2/3',
    subtitle: 'इस नोड में केवल गौण विषय की पहचान, उनका मुख्य विषय से संबंध, और पाठ में उनकी भूमिका शामिल.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 12 · Part 2/3',
    chapters: ['c6_hin_ch12'],
    nodeIds: ['c6_hin_cbse_12_007', 'c6_hin_cbse_12_008', 'c6_hin_cbse_12_009', 'c6_hin_cbse_12_010', 'c6_hin_cbse_12_011', 'c6_hin_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या तुमने कभी देखा है कि दादी की मुख्य कहानी (राजा का साहस) के बीच में वे छोटी-सी बात डाल देती हैं — जैसे.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक विचार या प्रसंग है जो पाठ के मुख्य विषय को स्पष्ट करने, उसे गहराई देने या पात्रों के जीवन को वास्तविक बनाने के लिए साथ-साथ चलता है, परंतु पाठ का केंद्रीय संदेश नहीं होता।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — गौण', 'पाठ 12 — साहित्यिक', 'पाठ 12 — पदावली', 'पाठ 12 — व्याकरण', 'पाठ 12 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_12_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 2/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — भाषा-प्रयोग (Language Use) का अर्थ है किसी पाठ में लेखक द्वारा शब्दों, वाक्य-संरचना.', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective questions) वे प्रश्न हैं जिनके उत्तर पाठ में स्पष्ट रूप से.', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 12 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक विचार या प्रसंग है जो पाठ के मुख्य विषय को स्पष्ट.',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) दोहराएँ — मुख्य विषय के 2-3 कीवर्ड लिखें, फिर.',
          misconception: 'छात्र अक्सर **गौण विषय को \'पक्ष-कथानक\' (sub-plot) या \'घटना\' समझ लेते हैं**। वे सोचते हैं: "जो छोटी घटना मुख्य कहानी से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक विचार या प्रसंग है जो पाठ के मुख्य विषय को स्पष्ट करने, उसे',
                  options: ['गौण विषय (Sub-theme) वह सहायक विचार या प्रसंग है जो पाठ के मुख्य विषय को स्पष्ट करने, उसे', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) दोहराएँ — मुख्य विषय के 2-3 कीवर्ड लिखें, फिर पाठ में उन.',
                  misconception: 'छात्र अक्सर **गौण विषय को \'पक्ष-कथानक\' (sub-plot) या \'घटना\' समझ लेते हैं**। वे सोचते हैं: "जो छोटी घटना मुख्य कहानी से अलग चल रही है, वही.' }
          ],
            remediations: { 'sub-plot': { steps: ['चरण 1: छात्र से कहो — "पाठ की कोई एक छोटी घटना बताओ जो तुम्हें याद रही।" (जैसे: नायक का चिट्ठी लिखना) चरण 2: पूछो — "इस.', 'कौन-सी बात उभरती है?" (उत्तर: अपनों से दूर रहकर भी जुड़ाव रखना / संवाद की ताकत) चरण 3: लिखवाओ — "घटना = नायक ने चिट्ठी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** शब्दों द्वारा पाँचों इंद्रियों (देखना, सुनना, सूंघना, छूना.',
          hint: 'यदि अटका हो तो **उपमा से रूपक रूपांतरण** का अभ्यास करो: "चाँद जैसा मुख" → "चाँद मुख है".',
          misconception: '**सटीक भ्रम:** बच्चे मानते हैं कि **"बिंब = दृश्य वर्णन" और "रूपक = उपमा का छोटा रूप"**। **क्यों होता है:** कक्षा 5 में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** शब्दों द्वारा पाँचों इंद्रियों (देखना, सुनना, सूंघना, छूना, चखना) को',
                  options: ['**बिंब (Imagery):** शब्दों द्वारा पाँचों इंद्रियों (देखना, सुनना, सूंघना, छूना, चखना) को', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'यदि अटका हो तो **उपमा से रूपक रूपांतरण** का अभ्यास करो: "चाँद जैसा मुख" → "चाँद मुख है" — फिर पूछो.',
                  misconception: '**सटीक भ्रम:** बच्चे मानते हैं कि **"बिंब = दृश्य वर्णन" और "रूपक = उपमा का छोटा रूप"**। **क्यों होता है:** कक्षा 5 में चित्र-वर्णन.' }
          ],
            remediations: { '5-picture-description': { steps: ['**बिंब के लिए:** बच्चे को आँख बंद करवाओ, एक संतरा दो — छूने, सूंघने, चखने को कहो। हर क्रिया के बाद पूछो: "कौन-सी इंद्री.', '**रूपक के लिए:** दो कार्ड बनाओ — एक पर "समय" (उपमा), दूसरे पर "धन" (रूपक)। जोड़ो और पूछो: "अब समय क्या बन गया?" → "धन"।.', 'अभ्यास: रोज एक वाक्य में रूपक ढूँढ़ो, उसकी उपमा/रूपक अलग करो, और एक वाक्य में **बिना "जैसे" के** वही बात कहो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_009', difficulty: 'standard',
          question: '**विरोधाभास** वह साहित्यिक युक्ति है जिसमें शब्दों या वाक्यों का प्रत्यक्ष अर्थ.',
          hint: 'यदि अटके तो **रूपक और बिंब (c6_hin_cbse_12_008)** दोहराएँ — विशेषकर यह पहचानना कि कोई.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति** (paradoxical situation) समझ लेते हैं — जैसे "गरीब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** वह साहित्यिक युक्ति है जिसमें शब्दों या वाक्यों का प्रत्यक्ष अर्थ उनके',
                  options: ['**विरोधाभास** वह साहित्यिक युक्ति है जिसमें शब्दों या वाक्यों का प्रत्यक्ष अर्थ उनके', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'यदि अटके तो **रूपक और बिंब (c6_hin_cbse_12_008)** दोहराएँ — विशेषकर यह पहचानना कि कोई चित्र/तुलना.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति** (paradoxical situation) समझ लेते हैं — जैसे "गरीब अमीर से ज्यादा खुश.' }
          ],
            remediations: { 'paradoxical-situation': { steps: ['**चरणबद्ध उपचार:** (1) छात्र से कहो: "कोई ऐसी बात बताओ जो तुमने कही हो पर मतलब उसका उल्टा हो" — उसका उदाहरण लेकर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_010', difficulty: 'standard',
          question: 'पदावली (शब्दावली) किसी पाठ में प्रयुक्त उन **मुख्य शब्दों का समूह** है जो पाठ.',
          hint: 'यदि अटके तो **पाठ 12 — मुख्य विषय और संदेश (c6_hin_cbse_12_006)** दोबारा पढ़ें; विषय.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "मुख्य शब्द = कठिन शब्द" या "मुख्य शब्द = जिनके अर्थ पूछे जाएँगे परीक्षा में"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (शब्दावली) किसी पाठ में प्रयुक्त उन **मुख्य शब्दों का समूह** है जो पाठ के विषय,',
                  options: ['पदावली (शब्दावली) किसी पाठ में प्रयुक्त उन **मुख्य शब्दों का समूह** है जो पाठ के विषय,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'यदि अटके तो **पाठ 12 — मुख्य विषय और संदेश (c6_hin_cbse_12_006)** दोबारा पढ़ें; विषय स्पष्ट होते ही.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "मुख्य शब्द = कठिन शब्द" या "मुख्य शब्द = जिनके अर्थ पूछे जाएँगे परीक्षा में"। **वास्तविकता:**.' }
          ],
            remediations: { 'core': { steps: ['**पुनः पठन (Re-reading):** छात्र से कहो — "पाठ को **केवल उन शब्दों के लिए पढ़ो** जो तुम्हें **महत्वपूर्ण लगते हैं**.', '**शब्द-मानचित्र (Word Mapping):** एक मुख्य शब्द (जैसे \'संघर्ष\') को केंद्र में रखकर उसके **आस-पास आए शब्दों** (संघर्षरत.', '**प्रतिस्थापन परीक्षण (Substitution Test):** उस शब्द को उसके सरल पर्याय से बदलकर पढ़वाओ — "क्या बात वही रही?" — अंतर.', '**लेखक की डायरी:** छात्र से कहो — "लेखक की डायरी का एक पन्ना लिखो जहाँ वह बताए कि उसने फलाँ शब्द क्यों चुना।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग (Language Use) का अर्थ है किसी पाठ में लेखक द्वारा शब्दों.',
          hint: 'अगर अटके तो **c6_hin_cbse_12_008 (बिंब और रूपक)** और **c6_hin_cbse_12_010 (पदावली)**.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "भाषा-प्रयोग" का प्रश्न आने पर उन्हें **शब्दों के अर्थ** लिखने हैं या **अलंकारों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग (Language Use) का अर्थ है किसी पाठ में लेखक द्वारा शब्दों, वाक्य-संरचना,',
                  options: ['भाषा-प्रयोग (Language Use) का अर्थ है किसी पाठ में लेखक द्वारा शब्दों, वाक्य-संरचना,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'अगर अटके तो **c6_hin_cbse_12_008 (बिंब और रूपक)** और **c6_hin_cbse_12_010 (पदावली)** दोहराएँ — ये.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "भाषा-प्रयोग" का प्रश्न आने पर उन्हें **शब्दों के अर्थ** लिखने हैं या **अलंकारों के नाम** गिनाने हैं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान से आगे बढ़ाओ**: छात्र से कहो — "ठीक है, उपमा पहचान ली। अब बताओ: अगर लेखक लिखता \'वह खूब हँसा\', तो क्या फर्क.', 'पाठक के मन में क्या **अलग** चित्र बनता?" 2.', '**तुलना कराओ**: दो संस्करण साथ रखो — साधारण और अलंकारिक। पूछो: "कौन-सा अधिक देर तक याद रहता है?', '**खुद लिखवाओ**: एक साधारण वाक्य दो ("बारिश हुई") — कहो "इसे तीन तरह से लिखो ताकि तीन अलग मूड बने: खुशी, दुख, डर।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective questions) वे प्रश्न हैं जिनके उत्तर पाठ में.',
          hint: 'If stuck, review **\'कथानक और आख्यान-संरचना\' (c6_hin_cbse_12_002)** to practice locating.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न\' का उत्तर \'अपनी कल्पना से कहानी बनाना\' होता है।** **गलत तर्क.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective questions) वे प्रश्न हैं जिनके उत्तर पाठ में स्पष्ट रूप से',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective questions) वे प्रश्न हैं जिनके उत्तर पाठ में स्पष्ट रूप से', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'If stuck, review **\'कथानक और आख्यान-संरचना\' (c6_hin_cbse_12_002)** to practice locating specific.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न\' का उत्तर \'अपनी कल्पना से कहानी बनाना\' होता है।** **गलत तर्क का उदाहरण:** पाठ.' }
          ],
            remediations: { 'implication-wishful-thinking-outside-knowledge': { steps: ['**चरणबद्ध सुधार (Remediation):** 1.', '**साक्ष्य-खोज खेल (Evidence Hunt):** छात्र को एक छोटा पैराग्राफ दें। कहें: "पहले **केवल वही वाक्य अंडरलाइन करो** जो इस.', '**\'क्यों?\' की श्रृंखला (Why Chain):** हर अंडरलाइन किए वाक्य के लिए पूछें: "यह वाक्य क्या बताता है?', '→ कीचड़ में धँसना = कठिनाई/फँसना। काँपना = ठंड/भय।" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
