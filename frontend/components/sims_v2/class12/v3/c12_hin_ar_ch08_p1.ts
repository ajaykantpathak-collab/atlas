import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch08_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch08_p1',
    title: 'रुबाइयाँ · Part 1/3',
    subtitle: 'The village finally spoke — in its own voice',
    classLevel: 12, subject: 'hin_ar', topic: 'रुबाइयाँ · Part 1/3',
    chapters: ['c12_hin_ar_ch08'],
    nodeIds: ['c12_hin_ar_cbse_08_001', 'c12_hin_ar_cbse_08_002', 'c12_hin_ar_cbse_08_003', 'c12_hin_ar_cbse_08_004', 'c12_hin_ar_cbse_08_005', 'c12_hin_ar_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-language poetry reader', intro: 'A freedom fighter from Araria refused to translate the village for the city. The dialect is the poem\'s argument.', goal: 'Read Renu\'s poem through lok-bhasha politics, body-as-knowing and post-Quit India longing.' },
    discovery: {
        question: 'Premchand wrote about villages in standard Hindi; Renu wrote from inside the village in its own folk speech. Why is the difference more than style?',
        options: ['Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature', 'Renu couldn\'t write proper Hindi', 'Dialect is just local colour', 'No real difference'],
        answer: 'Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature',
        hook: 'Renu\'s philosophy erased the body-mind split — mud on knees IS knowing the world. A Quit India prisoner writing children\'s free play isn\'t just nostalgic: that village is the autonomous world he fought for, reclaimed in folk speech.',
    },
    teaching: [
        { title: 'रुबाइयाँ — कवि परिचय और पृष्ठभूमि', text: 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका छंद विधान AABA या AAAA होता है और जो प्रायः दर्शन, प्रेम, विरह, क्षणभंगुरता और अस्तित्ववाद जैसे गूढ़ विषयों को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hear a poem in lok-bhasha: weigh dialect as political choice, read bodily play as a way of knowing, and connect a freedom fighter\'s childhood to the freedom he couldn\'t finish.',
        labels: ['रुबाइयाँ — कवि परिचय', 'रुबाइयाँ — पद्यांश-वार भावार्थ', 'रुबाइयाँ — काव्य-संरचना और', 'रुबाइयाँ — केंद्रीय भाव', 'रुबाइयाँ — छंद और', 'रुबाइयाँ — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend selected for a national poetry fest wants to strip the dialect words from her village poems — \'real Hindi shouldn\'t smell of fields.\' The poems\' best lines are built from exactly those folk words and her grandmother\'s sayings.',
            decisions: [{ prompt: 'What does Renu\'s poem with the vine refrain say to her plan?', options: [
                { text: 'Keep the dialect — the poem builds from village scenes to the claim that script clings to language and language to life like a vine to a tree; cutting the folk idiom severs the very root the refrain keeps reaffirming.', outcome: 'The refrain isn\'t decoration: each stanza\'s memory ends by clinging back to the soil, so her \'impure\' words are the structural backbone of what makes the poems live.' },
                { text: 'Support the polish — standard literary Hindi is the tree; dialect is a creeper that needs pruning to grow upward.', outcome: 'The poem reverses that hierarchy — the vine survives because it clings; dialect isn\'t a parasite on standard language but the living connection that keeps the whole organism fed.', reveals: 'standard-above-dialect' },
                { text: 'Suggest writing two versions: a dialect draft for home and a cleaned-up one for the fest.', outcome: 'The poem\'s fourth stanza universalises the personal — the folk voice is the argument, not a first draft to be translated away; the split treats rootedness as a private habit to hide in public.', reveals: 'dialect-is-private-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear regional speech as literature\'s politics — and read a child\'s muddy play as reclaimed freedom.',
            decisions: [{ prompt: 'What comes next? रुबाइयाँ · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — रुबाइयाँ · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_001', difficulty: 'standard',
          question: 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती.',
          hint: 'यदि कवि-परिचय का ढांचा याद न हो तो कक्षा 11 के किसी भी कवि-परिचय नोड (जैसे.',
          misconception: 'छात्र समझते हैं कि \'खय्याम = शराबी शायर\' और \'रुबाई = शराबखाने के गीत\'। यह भूल दो स्रोतों से आती है: (1) फिट्जेराल्ड के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका',
                  options: ['रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जो सभी पंक्तियों, बिंबों और'],
                  hint: 'यदि कवि-परिचय का ढांचा याद न हो तो कक्षा 11 के किसी भी कवि-परिचय नोड (जैसे c11_hin_ar_cbse_16_001).',
                  misconception: 'छात्र समझते हैं कि \'खय्याम = शराबी शायर\' और \'रुबाई = शराबखाने के गीत\'। यह भूल दो स्रोतों से आती है: (1) फिट्जेराल्ड के अंग्रेजी अनुवाद का.' }
          ],
            remediations: { '1': { steps: ['चरण 1: छात्र से पूछें — "यदि कोई कहे \'गीता केवल युद्ध की पुस्तक है\', तो आप क्या कहेंगे?" (प्रतीक/रूपक की ओर ध्यान जाए)।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के.',
          hint: 'यदि अटकें तो कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_002) या \'बादल को घरिते.',
          misconception: 'विद्यार्थी समझते हैं कि \'भावार्थ\' = \'शब्दार्थ + सरल भाषा में अनुवाद\'। वे प्रत्येक पंक्ति का शब्दशः हिंदी अनुवाद लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जो सभी पंक्तियों, बिंबों और'],
                  hint: 'यदि अटकें तो कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_002) या \'बादल को घरिते देखा है\'.',
                  misconception: 'विद्यार्थी समझते हैं कि \'भावार्थ\' = \'शब्दार्थ + सरल भाषा में अनुवाद\'। वे प्रत्येक पंक्ति का शब्दशः हिंदी अनुवाद लिख देते हैं (जैसे "बुलबुला.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पहली रुबाई की पहली पंक्ति उठाओ, केवल उसका शब्दार्थ मत दो, मुझे बताओ: कवि यहाँ कौन-सा दृश्य दिखा.', 'कौन-सा भाव जगा रहा है?" चरण 2: यदि अटकें, तो पूछें — "अच्छा, \'खेल\' शब्द सुनते ही तुम्हारे मन में क्या आता है?', 'अब कवि ने जीवन को \'खेल\' क्यों कहा?" चरण 3: उनके उत्तर से \'लीला\', \'नियति\', \'अनासक्ति\' जैसे भाव निकलवाएँ और बोर्ड पर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_003', difficulty: 'standard',
          question: 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)**.',
          hint: 'यदि तुक पहचानने में अटके: **कक्षा 11 आरोह — \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_003).',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **रुबाई = कोई भी चार पंक्ति की कविता (चौपाई/मुक्तक/कवित्त)**। वे **तुक-अनुक्रम की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं',
                  options: ['रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जो सभी पंक्तियों, बिंबों और'],
                  hint: 'यदि तुक पहचानने में अटके: **कक्षा 11 आरोह — \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_003) का.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **रुबाई = कोई भी चार पंक्ति की कविता (चौपाई/मुक्तक/कवित्त)**। वे **तुक-अनुक्रम की अनिवार्यता (AABA)**.' }
          ],
            remediations: { 'aaba-volta-turn-liberalized-aaaa': { steps: ['**चरण 1:** छात्र को **फारसी रुबाई के 3-4 मौलिक उदाहरण** (उमर खय्याम/हाफ़िज़ के अनुवाद) दिखाओ — हर में AABA और तीसरी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जो सभी पंक्तियों.',
          hint: 'यदि रस-सूत्र या विभाव-अनुभाव-संचारी भाव स्पष्ट न हों, तो कक्षा 11 के नोड्स.',
          misconception: 'छात्र समझते हैं कि **रस केवल स्थायी भाव का नाम है** (जैसे: शृंगार = रति, करुण = शोक) — इसलिए वे रुबाई पढ़ते ही पहला.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जो सभी पंक्तियों, बिंबों और',
                  options: ['केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जो सभी पंक्तियों, बिंबों और', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि रस-सूत्र या विभाव-अनुभाव-संचारी भाव स्पष्ट न हों, तो कक्षा 11 के नोड्स c11_hin_a_cbse_13_004.',
                  misconception: 'छात्र समझते हैं कि **रस केवल स्थायी भाव का नाम है** (जैसे: शृंगार = रति, करुण = शोक) — इसलिए वे रुबाई पढ़ते ही पहला दिखने वाला भाव (जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['1) छात्र को NCERT की **रुबाई संख्या 1-2** दें और कहें: "पहले केवल **चौथी पंक्ति** पढ़ो — कवि अंत में क्या कहना चाहता है?', 'वही केंद्रीय भाव है।" 2) फिर पूछें: "इस अंतिम बात को पहुँचाने के लिए पहली तीन पंक्तियों ने कौन-सा दृश्य (विभाव) रचा?', 'कौन-सी क्रिया/भाव (अनुभाव) दिखाए?', 'कौन-से सहायक भाव (संचारी) साथ आए?" — इसे **तालिका** में भरवाएँ। 3) अब रस का नाम पूछें — यदि अभी भी गलत हो, तो **भरत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_005', difficulty: 'standard',
          question: 'रुबाइयाँ छंद एक विशिष्ट फारसी मूल का चौपाई-प्रकार है जिसमें प्रत्येक रुबाई.',
          hint: 'यदि मात्रा-गणना में अटकें: प्रत्येक शब्द को उच्चारित करें, संयुक्त व्यंजन (जैसे \'फूलों\'.',
          misconception: 'छात्र मानते हैं कि \'छंद विश्लेषण\' का अर्थ केवल मात्राएँ गिनकर छंद-नाम बता देना है — वे भूल जाते हैं कि बोर्ड परीक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रुबाइयाँ छंद एक विशिष्ट फारसी मूल का चौपाई-प्रकार है जिसमें प्रत्येक रुबाई (चतुष्पदी) की',
                  options: ['रुबाइयाँ छंद एक विशिष्ट फारसी मूल का चौपाई-प्रकार है जिसमें प्रत्येक रुबाई (चतुष्पदी) की', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि मात्रा-गणना में अटकें: प्रत्येक शब्द को उच्चारित करें, संयुक्त व्यंजन (जैसे \'फूलों\' में \'ल्\').',
                  misconception: 'छात्र मानते हैं कि \'छंद विश्लेषण\' का अर्थ केवल मात्राएँ गिनकर छंद-नाम बता देना है — वे भूल जाते हैं कि बोर्ड परीक्षा (और CUET) में पूछा.' }
          ],
            remediations: { 'cuet-b': { steps: ['चरण 1: c12_hin_ar_cbse_08_003 (काव्य-संरचना) दोबारा पढ़ें — वहाँ पंक्ति-वार मात्रा गणना का अभ्यास है। चरण 2: एक रुबाई.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_006', difficulty: 'standard',
          question: 'अलंकार काव्य की वह रसायनिक क्रिया है जिसमें शब्दों के माध्यम से अर्थ की विशेष.',
          hint: 'यदि अलंकार पहचानने में अटकें तो कक्षा 11 के नोड **c11_hin_a_cbse_13_006** के कार्यित.',
          misconception: '**सबसे घातक गलतफहमी**: छात्र अलंकार को **सजावटी उपकरण** (decoration) मानते हैं, **अर्थ-व्यंजना की प्रक्रिया**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार काव्य की वह रसायनिक क्रिया है जिसमें शब्दों के माध्यम से अर्थ की विशेष व्यंजना,',
                  options: ['अलंकार काव्य की वह रसायनिक क्रिया है जिसमें शब्दों के माध्यम से अर्थ की विशेष व्यंजना,', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि अलंकार पहचानने में अटकें तो कक्षा 11 के नोड **c11_hin_a_cbse_13_006** के कार्यित उदाहरण 1-2.',
                  misconception: '**सबसे घातक गलतफहमी**: छात्र अलंकार को **सजावटी उपकरण** (decoration) मानते हैं, **अर्थ-व्यंजना की प्रक्रिया** (meaning-making process).' }
          ],
            remediations: { 'decoration': { steps: ['**पुनरावृत्ति चरण**: नोड **c11_hin_a_cbse_13_006** (जाग तुझको दूर जाना — अलंकार) और **c11_hin_a_cbse_14_006** (बादल को.', '**अभ्यास चरण**: रुबाइयों के 5 पद्यांश लीजिए (नोड 002 से), प्रत्येक में **केवल एक अलंकार** पहचानिए, फिर उसकी **व्यंजना.', '**परीक्षण चरण**: नोड **007 (प्रतीक-बिंब)** के डायग्नोस्टिक प्रश्न 3-4 हल कीजिए — वहाँ अलंकार और प्रतीक का अंतर स्पष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
