import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch16_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch16_p2: SimDef = {
    id: 'v3_c12_hin_a_ch16_p2',
    title: 'दूसरा देवदास · Part 2/3',
    subtitle: 'The elephant saw everything — from inside the chain',
    classLevel: 12, subject: 'hin_a', topic: 'दूसरा देवदास · Part 2/3',
    chapters: ['c12_hin_a_ch16'],
    nodeIds: ['c12_hin_a_cbse_16_007', 'c12_hin_a_cbse_16_008', 'c12_hin_a_cbse_16_009', 'c12_hin_a_cbse_16_010', 'c12_hin_a_cbse_16_011', 'c12_hin_a_cbse_16_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A Sanskrit scholar who ran institutions writes the most radical thing — a story where the animal has more presence than the people.', goal: 'Read the story\'s circus as a microcosm of captivity — the elephant\'s chain beside the girl\'s invisibility.' },
    discovery: {
        question: 'A circus elephant in chains, a girl nobody sees — a story that takes the elephant out of the cage and gives it \'a permanent, definite human form.\' Why pair the two silences?',
        options: ['Parallel captivity — the elephant\'s chains mirror the girl\'s social invisibility; the circus is a microcosm where freedom\'s fragility is staged', 'Circuses have both', 'To entertain children', 'Animals are sympathetic'],
        answer: 'Parallel captivity — the elephant\'s chains mirror the girl\'s social invisibility; the circus is a microcosm where freedom\'s fragility is staged',
        hook: 'This is \'navlekhan\' — new writing — where the elephant isn\'t spectacle but witness, granted agency while humans look away. The Sanskrit-scholar author engineers words for emotional precision: the craft is the empathy.',
    },
    teaching: [
        { title: 'दूसरा देवदास — गौण विषय', text: 'गौण विषय वह अवधारणा या सन्देश है जो कहानी के मुख्य विषय को समर्थन देता है लेकिन वह कथानक का केन्द्र नहीं होता।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_16_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the travelling circus as an anatomy of captivity: weigh the elephant\'s chain against the girl\'s silence, and test how experimental form carries feeling without breaking it.',
        labels: ['दूसरा देवदास — गौण', 'दूसरा देवदास — साहित्यिक', 'दूसरा देवदास — पदावली', 'दूसरा देवदास — व्याकरण', 'दूसरा देवदास — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your uncle visits his widowed mother after years, hands over a cheque, and is back at the station by evening. She tells the family simply: \'I will stay here.\' Relatives declare the matter \'resolved — she\'s decided.\'',
            decisions: [{ prompt: 'How does the story\'s ending read her \'मैं यहीं रहूँगी\'?', options: [
                { text: 'As an open ending, not a resolution — her staying asserts agency but settles nothing between her and the son who offered money instead of himself; the family calling it \'resolved\' mistakes her decision for the conflict\'s settlement.', outcome: 'The chapter separates a character\'s decision from the story\'s closure: the son leaves, she stays, no reconciliation occurs — the sentence is her autonomy speaking, not peace made.' },
                { text: 'As closure — she made a choice, so the conflict between duty and autonomy is over.', outcome: 'That\'s the confusion the chapter names: a character\'s resolve isn\'t the same as resolved conflict — his money-versus-presence failure stands exactly as unanswered as before.', reveals: 'decision-equals-resolution' },
                { text: 'As surrender — she stayed because she had no other option left.', outcome: 'The flashbacks exist to prove the opposite: the house holds her whole married life and the son\'s childhood — her staying is chosen rootedness, and reading it as helplessness misses the agency the final line asserts.', reveals: 'staying-is-surrender' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the circus as a freedom allegory — and see how one chained animal can indict every human arrangement around it.',
            decisions: [{ prompt: 'What comes next? दूसरा देवदास · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — दूसरा देवदास · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_007', difficulty: 'standard',
          question: 'गौण विषय वह अवधारणा या सन्देश है जो कहानी के मुख्य विषय को समर्थन देता है लेकिन.',
          hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो तो c12_hin_a_cbse_16_006 (मुख्य विषय और संदेश) को.',
          misconception: 'छात्र अक्सर गौण विषय को मुख्य विषय का विस्तार मानते हैं और उदाहरण के लिए शराब पीने की आदत को कहानी का मुख्य सन्देश.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वह अवधारणा या सन्देश है जो कहानी के मुख्य विषय को समर्थन देता है लेकिन वह कथानक',
                  options: ['गौण विषय वह अवधारणा या सन्देश है जो कहानी के मुख्य विषय को समर्थन देता है लेकिन वह कथानक', '"दूसरा देवदास" मन्नू भंडारी द्वारा लिखित एक आधुनिक हिंदी कहानी है जो शरतचंद्र', 'कथानक (Plot) घटनाओं का तार्किक-कारणात्मक क्रम है जो कहानी बनाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो तो c12_hin_a_cbse_16_006 (मुख्य विषय और संदेश) को दोबारा.',
                  misconception: 'छात्र अक्सर गौण विषय को मुख्य विषय का विस्तार मानते हैं और उदाहरण के लिए शराब पीने की आदत को कहानी का मुख्य सन्देश बताने लगते हैं क्योंकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि यदि कहानी से शराब पीने के दृश्य पूरी तरह हटा दिए जाएँ तो क्या कहानी का मूल अर्थ बदल जाएगा?', 'फिर पूछिए कि यदि प्रेम की विफलता को हटा दिया जाए तो क्या बचेगा। इस तुलना से उन्हें समझ आएगा कि मुख्य विषय वह है जिसकी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_008', difficulty: 'standard',
          question: 'बिंब वह संक्षिप्त चित्र या विवरण है जो किसी गहरे भाव, अवधारणा या अनुभव को संकेत.',
          hint: 'छात्र को बिंब और रूपक के बीच के अंतर की स्पष्ट समझ के लिए कक्षा 11 के साहित्यिक.',
          misconception: 'छात्र अक्सर बिंब और रूपक को एक ही चीज़ समझते हैं और किसी भी तुलनात्मक या चित्रात्मक भाषा को रूपक कहते हैं, जैसे "उसका.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह संक्षिप्त चित्र या विवरण है जो किसी गहरे भाव, अवधारणा या अनुभव को संकेत करता है,',
                  options: ['बिंब वह संक्षिप्त चित्र या विवरण है जो किसी गहरे भाव, अवधारणा या अनुभव को संकेत करता है,', '"दूसरा देवदास" मन्नू भंडारी द्वारा लिखित एक आधुनिक हिंदी कहानी है जो शरतचंद्र', 'कथानक (Plot) घटनाओं का तार्किक-कारणात्मक क्रम है जो कहानी बनाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'छात्र को बिंब और रूपक के बीच के अंतर की स्पष्ट समझ के लिए कक्षा 11 के साहित्यिक युक्तियाँ: बिंब और.',
                  misconception: 'छात्र अक्सर बिंब और रूपक को एक ही चीज़ समझते हैं और किसी भी तुलनात्मक या चित्रात्मक भाषा को रूपक कहते हैं, जैसे "उसका चेहरा चाँद जैसा था".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि तीन वाक्य लाइए: (1) "उसकी मुस्कान एक फूल थी" (रूपक — identity), (2) "उसकी मुस्कान फूल जैसी थी" (उपमा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_009', difficulty: 'standard',
          question: 'विरोधाभास (इरोनी) वह स्थिति है जब अपेक्षित परिणाम और वास्तविक परिणाम विपरीत.',
          hint: 'यदि छात्र प्रतीक और बिंब में भ्रमित हो, तो उसे c12_hin_a_cbse_16_008 नोड पर वापस जाना.',
          misconception: 'छात्र अक्सर विरोधाभास को 단순히 \'विपरीत बात कहना\' या \'ताना मारना\' समझते हैं, जैसे कि कोई कहे "वाह, बहुत सुंदर बनी हो!" जब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास (इरोनी) वह स्थिति है जब अपेक्षित परिणाम और वास्तविक परिणाम विपरीत होते हैं,',
                  options: ['विरोधाभास (इरोनी) वह स्थिति है जब अपेक्षित परिणाम और वास्तविक परिणाम विपरीत होते हैं,', '"दूसरा देवदास" मन्नू भंडारी द्वारा लिखित एक आधुनिक हिंदी कहानी है जो शरतचंद्र', 'कथानक (Plot) घटनाओं का तार्किक-कारणात्मक क्रम है जो कहानी बनाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि छात्र प्रतीक और बिंब में भ्रमित हो, तो उसे c12_hin_a_cbse_16_008 नोड पर वापस जाना चाहिए और याद.',
                  misconception: 'छात्र अक्सर विरोधाभास को 단순히 \'विपरीत बात कहना\' या \'ताना मारना\' समझते हैं, जैसे कि कोई कहे "वाह, बहुत सुंदर बनी हो!" जब कपड़े फटे हों — यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले दो वाक्य दिए जाइए: एक जिसमें स्पष्ट व्यंग्य हो (जैसे "अरे, आज बहुत देर से आए हो, बधाई हो!") और एक जिसमें.', 'फिर दूसरे में परिणाम क्या हुआ और क्या अपेक्षित था?', 'इस तुलना से स्पष्ट करिए कि विरोधाभास बोलने के इरादे में नहीं, बल्कि घटना के परिणाम और अपेक्षा के बीच के अंतर में है।.', 'समाज क्या अपेक्षा करता था?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_010', difficulty: 'standard',
          question: 'दूसरा देवदास पाठ के पदावली अनुभाग में मुख्य शब्द वे शब्द हैं जो पात्रों के भाव.',
          hint: 'यदि फंसे हुए महसूस हो तो पाठ के कथानक और आख्यान-संरचना (c12_hin_a_cbse_16_002) को दोबारा.',
          misconception: 'छात्र अक्सर मुख्य शब्दों के शब्दकोश अर्थ को याद करके सोचते हैं कि उनका पाठ्यात्मक अर्थ भी वही है — जैसे \'बंदिश\' को केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'दूसरा देवदास पाठ के पदावली अनुभाग में मुख्य शब्द वे शब्द हैं जो पात्रों के भाव, सामाजिक',
                  options: ['दूसरा देवदास पाठ के पदावली अनुभाग में मुख्य शब्द वे शब्द हैं जो पात्रों के भाव, सामाजिक', '"दूसरा देवदास" मन्नू भंडारी द्वारा लिखित एक आधुनिक हिंदी कहानी है जो शरतचंद्र', 'कथानक (Plot) घटनाओं का तार्किक-कारणात्मक क्रम है जो कहानी बनाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फंसे हुए महसूस हो तो पाठ के कथानक और आख्यान-संरचना (c12_hin_a_cbse_16_002) को दोबारा देखें.',
                  misconception: 'छात्र अक्सर मुख्य शब्दों के शब्दकोश अर्थ को याद करके सोचते हैं कि उनका पाठ्यात्मक अर्थ भी वही है — जैसे \'बंदिश\' को केवल \' नियम \' समझकर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले पाठ से तीन ऐसे वाक्य बताने के लिए कहें जहाँ \'बंदिश\' शब्द आया हो — फिर प्रत्येक वाक्य में पूछें: किसने कहा?', 'इससे शब्द के संदर्भिक उपयोग पर ध्यान जाएगा। फिर एक टेबल बनाकर दो कॉलम बनाएँ: एक में शब्दकोश अर्थ, दूसरे में पाठ्यात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_011', difficulty: 'standard',
          question: 'दूसरा देवदास पाठ में भाषा-प्रयोग से तात्पर्य उस विविध वाक्य संरचना, विराम.',
          hint: 'यदि फँसें तो कक्षा 11 के किसी भी पाठ के "व्याकरण: पाठ में भाषा-प्रयोग" नोड (जैसे.',
          misconception: 'छात्र अक्सर मानते हैं कि "दूसरा देवदास" पाठ में भाषा-प्रयोग का अर्थ केवल कठिन शब्दों या मुहावरों की पहचान से है — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'दूसरा देवदास पाठ में भाषा-प्रयोग से तात्पर्य उस विविध वाक्य संरचना, विराम चिह्नों के',
                  options: ['दूसरा देवदास पाठ में भाषा-प्रयोग से तात्पर्य उस विविध वाक्य संरचना, विराम चिह्नों के', '"दूसरा देवदास" मन्नू भंडारी द्वारा लिखित एक आधुनिक हिंदी कहानी है जो शरतचंद्र', 'कथानक (Plot) घटनाओं का तार्किक-कारणात्मक क्रम है जो कहानी बनाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फँसें तो कक्षा 11 के किसी भी पाठ के "व्याकरण: पाठ में भाषा-प्रयोग" नोड (जैसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि "दूसरा देवदास" पाठ में भाषा-प्रयोग का अर्थ केवल कठिन शब्दों या मुहावरों की पहचान से है — जैसे कि वे "अनुचित".' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र भाषा-प्रयोग को केवल शब्दार्थ से जोड़ रहा है, तो उसे निम्नलिखित चरण-दर-चरण सुधार दें: - चरण 1: पाठ से एक छोटा.', 'क्या यह विचार बदल रहा है, भावना रुक रही है, या अनिश्चितता दिखा रहा है?" - चरण 3: फिर वाक्य की लंबाई पर ध्यान दीजिए.', 'क्या छोटे वाक्य निर्णय या तनाव दिखा रहे हैं?', '- चरण 4: अंत में दोहराव वाले शब्दों या वाक्यांशों को पहिए और पूछिए: "इस दोहराव से क्या बल मिल रहा है — आशा, डर, या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर टेक्स्ट में स्पष्ट रूप से दिया गया.',
          hint: 'पाठ पढ़ने की आधारभूत कौशल (c11_hin_a_cbse_01_012) की समीक्षा करें, जहाँ टेक्स्ट में.',
          misconception: 'छात्र अक्सर वस्तुनिष्ठ प्रश्नों के उत्तर देते समय टेक्स्ट में स्पष्ट रूप से लिखित तथ्य को खोजने की बजाय अपनी याद या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर टेक्स्ट में स्पष्ट रूप से दिया गया होता है और',
                  options: ['वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर टेक्स्ट में स्पष्ट रूप से दिया गया होता है और', '"दूसरा देवदास" मन्नू भंडारी द्वारा लिखित एक आधुनिक हिंदी कहानी है जो शरतचंद्र', 'कथानक (Plot) घटनाओं का तार्किक-कारणात्मक क्रम है जो कहानी बनाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'पाठ पढ़ने की आधारभूत कौशल (c11_hin_a_cbse_01_012) की समीक्षा करें, जहाँ टेक्स्ट में स्पष्ट रूप से.',
                  misconception: 'छात्र अक्सर वस्तुनिष्ठ प्रश्नों के उत्तर देते समय टेक्स्ट में स्पष्ट रूप से लिखित तथ्य को खोजने की बजाय अपनी याद या सामान्य ज्ञान पर भरोसा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['अगर छात्र वस्तुनिष्ठ प्रश्नों में गलती कर रहा है, तो उसे टेक्स्ट में एक पेंसिल से हल्का सा underline करके दिखाएं कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
