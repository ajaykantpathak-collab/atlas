import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch15_p1: SimDef = {
    id: 'v3_c11_hin_a_ch15_p1',
    title: 'हस्तक्षेप · Part 1/3',
    subtitle: 'यह नोड केवल \'हस्तक्षेप\' कविता के कवि (कुमार विकल) के जीवन-संघर्ष, प्रगतिशील काव्य-धारा से.',
    classLevel: 11, subject: 'hin_a', topic: 'हस्तक्षेप · Part 1/3',
    chapters: ['c11_hin_a_ch15'],
    nodeIds: ['c11_hin_a_cbse_15_001', 'c11_hin_a_cbse_15_002', 'c11_hin_a_cbse_15_003', 'c11_hin_a_cbse_15_004', 'c11_hin_a_cbse_15_005', 'c11_hin_a_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना करें आप एक पुराना पत्र पढ़ रहे हैं जिसमें कोई लिखता है: "आज फिर पुलिस आई थी, पड़ोसी को उठा ले गई, किसी.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'हस्तक्षेप — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है — रचनाकार के जीवन-वृत्त (जीवन-यात्रा, संघर्ष, विचारधारा), उसके रचनाकाल की सामाजिक-राजनीतिक-सांस्कृतिक परिस्थितियाँ, और उसकी साहित्यिक परंपरा/धारा का वह समग्र अध्ययन.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_15_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['हस्तक्षेप — कवि परिचय', 'हस्तक्षेप — पद्यांश-वार भावार्थ', 'हस्तक्षेप — काव्य-संरचना और', 'हस्तक्षेप — केंद्रीय भाव', 'हस्तक्षेप — छंद और', 'हस्तक्षेप — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through हस्तक्षेप like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? हस्तक्षेप · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — हस्तक्षेप · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है — रचनाकार के जीवन-वृत्त (जीवन-यात्रा, संघर्ष.',
          hint: 'अगर अटके तो **\'प्रगतिशील लेखक संघ\' (Progressive Writers\' Association)** का उद्देश्य और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'कवि परिचय\' का अर्थ है — कवि की **जन्म-तिथि, मृत्यु-तिथि, प्रमुख रचनाएँ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है', '**पद्यांश-वार भावार्थ** काव्य-विश्लेषण की वह विधि है जिसमें कविता के प्रत्येक पद्यांश', 'काव्य-संरचना और पद्य-विन्यास का तात्पर्य कविता के बाह्य रूप (छंद, पद-योजना, तुक-योजना,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसके चारों ओर संपूर्ण'],
                  hint: 'अगर अटके तो **\'प्रगतिशील लेखक संघ\' (Progressive Writers\' Association)** का उद्देश्य और **आपातकाल.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'कवि परिचय\' का अर्थ है — कवि की **जन्म-तिथि, मृत्यु-तिथि, प्रमुख रचनाएँ, पुरस्कार, शिक्षा** जैसी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "कुमार विकल की **तीन ऐसी घटनाएँ बताओ जहाँ उन्होंने \'चुप रहने के बजाय बोलना चुना\'** (जैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_002', difficulty: 'standard',
          question: '**पद्यांश-वार भावार्थ** काव्य-विश्लेषण की वह विधि है जिसमें कविता के प्रत्येक.',
          hint: 'यदि प्रसंग समझ न आए तो c11_hin_a_cbse_15_001 (कवि परिचय और पृष्ठभूमि) के \'रचनाकालीन.',
          misconception: 'छात्र समझते हैं कि **\'भावार्थ = शब्दार्थ + सरल अनुवाद\'**। वे प्रत्येक पद का समानार्थी लिखकर समझते हैं कि भावार्थ हो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पद्यांश-वार भावार्थ** काव्य-विश्लेषण की वह विधि है जिसमें कविता के प्रत्येक पद्यांश',
                  options: ['**पद्यांश-वार भावार्थ** काव्य-विश्लेषण की वह विधि है जिसमें कविता के प्रत्येक पद्यांश', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का तात्पर्य कविता के बाह्य रूप (छंद, पद-योजना, तुक-योजना,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसके चारों ओर संपूर्ण'],
                  hint: 'यदि प्रसंग समझ न आए तो c11_hin_a_cbse_15_001 (कवि परिचय और पृष्ठभूमि) के \'रचनाकालीन परिस्थितियाँ\'.',
                  misconception: 'छात्र समझते हैं कि **\'भावार्थ = शब्दार्थ + सरल अनुवाद\'**। वे प्रत्येक पद का समानार्थी लिखकर समझते हैं कि भावार्थ हो गया। **वास्तविकता**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक पद्यांश दो — पहले उससे **केवल प्रसंग** लिखवाओ (बोलकर)। 2.', 'फिर **कठिन शब्दों के अर्थ** पदावली नोड (15_010) से ढूँढ़ने को कहो। 3.', 'अब **एक-एक पंक्ति का सरल गद्य रूपांतरण** करवाओ। 4.', 'अंत में पूछो: "इस पद्यांश में कौन-सा चित्र (बिंब) उभरता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का तात्पर्य कविता के बाह्य रूप (छंद, पद-योजना.',
          hint: 'यदि भावार्थ अस्पष्ट हो तो c11_hin_a_cbse_15_002 (पद्यांश-वार भावार्थ) दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल **छंद का नाम बताना** (जैसे \'मुक्तछंद\', \'दोहा\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का तात्पर्य कविता के बाह्य रूप (छंद, पद-योजना, तुक-योजना,',
                  options: ['काव्य-संरचना और पद्य-विन्यास का तात्पर्य कविता के बाह्य रूप (छंद, पद-योजना, तुक-योजना,', 'कवि परिचय और पृष्ठभूमि का अर्थ है', '**पद्यांश-वार भावार्थ** काव्य-विश्लेषण की वह विधि है जिसमें कविता के प्रत्येक पद्यांश', 'केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसके चारों ओर संपूर्ण'],
                  hint: 'यदि भावार्थ अस्पष्ट हो तो c11_hin_a_cbse_15_002 (पद्यांश-वार भावार्थ) दोबारा पढ़ें, विशेषकर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल **छंद का नाम बताना** (जैसे \'मुक्तछंद\', \'दोहा\', \'चौपाई\') या **तुक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: *"कविता को दोबारा पढ़ो, लेकिन इस बार **अर्थ भूल जाओ**, केवल **ध्वनि, रुकावट, गति, लंबाई**.', 'क्या यह अंतर जानबूझकर लगता है?"* **चरण 4:** अंत में: *"अब अर्थ जोड़ो — संरचना ने अर्थ को कैसे ढाला?"* यह \'संरचना-पहले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसके चारों ओर.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_15_002 (पद्यांश-वार भावार्थ)** दोबारा पढ़ें और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि **\'केंद्रीय भाव\' और \'प्रमुख रस\' एक ही बात है** — जैसे "कविता का भाव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसके चारों ओर संपूर्ण',
                  options: ['केंद्रीय भाव (Central Theme) कविता का वह मूल विचार या संदेश है जिसके चारों ओर संपूर्ण', 'कवि परिचय और पृष्ठभूमि का अर्थ है', '**पद्यांश-वार भावार्थ** काव्य-विश्लेषण की वह विधि है जिसमें कविता के प्रत्येक पद्यांश', 'काव्य-संरचना और पद्य-विन्यास का तात्पर्य कविता के बाह्य रूप (छंद, पद-योजना, तुक-योजना,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_15_002 (पद्यांश-वार भावार्थ)** दोबारा पढ़ें और प्रत्येक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि **\'केंद्रीय भाव\' और \'प्रमुख रस\' एक ही बात है** — जैसे "कविता का भाव वीर रस है"। यह गलत.' }
          ],
            remediations: { 'what': { steps: ['**चरण 1:** छात्र से कहें — "कविता का **एक वाक्य में सार** लिखो (यह भाव है)। फिर पूछो — **इसे पढ़कर तुम्हें क्या महसूस.', 'जोश, दुख, शांति, भक्ति?** (यह रस है)।" **चरण 2:** एक ही कविता के दो अलग-अलग पाठ करवाएं — एक **सपाट स्वर में** (भाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_005', difficulty: 'standard',
          question: 'छंद कविता की पंक्तियों में स्वर और व्यंजन के नियत अनुक्रम को संदर्भित करता है.',
          hint: 'If stuck, review the concept of मात्रा (matra) in Hindi pronunciation — specifically how.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि दो कविताओं में समान छंद है (जैसे दोहा), तो उनकी लय आवश्यक रूप से समान होगी, जैसे संगीत में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता की पंक्तियों में स्वर और व्यंजन के नियत अनुक्रम को संदर्भित करता है, जो लयात्मक',
                  options: ['छंद कविता की पंक्तियों में स्वर और व्यंजन के नियत अनुक्रम को संदर्भित करता है, जो लयात्मक', 'कवि परिचय और पृष्ठभूमि का अर्थ है', '**पद्यांश-वार भावार्थ** काव्य-विश्लेषण की वह विधि है जिसमें कविता के प्रत्येक पद्यांश', 'काव्य-संरचना और पद्य-विन्यास का तात्पर्य कविता के बाह्य रूप (छंद, पद-योजना, तुक-योजना,'],
                  hint: 'If stuck, review the concept of मात्रा (matra) in Hindi pronunciation — specifically how vowels.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि दो कविताओं में समान छंद है (जैसे दोहा), तो उनकी लय आवश्यक रूप से समान होगी, जैसे संगीत में समान टाइम सिग्नचर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो समान छंद वाली कविताओं (उदाहरण: तुलसीदास और कबीर के दोहे) दें और उनसे पूछें कि प्रत्येक पंक्ति को声を出して読むとき.', 'इस प्रकार छात्र को समझना चाहिए कि छंद संरचना प्रदान करता है, लेकिन लय-विधान अभिव्यक्तिशील है और पढ़ने वाले के इरादे पर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_006', difficulty: 'standard',
          question: 'अलंकार वे साहित्यिक युक्तियाँ हैं जिनके माध्यम से कवि साधारण अर्थ को असाधारण.',
          hint: 'यदि अटके तो **NCERT कक्षा 10 \'कृतिका/स्पर्श\' के अलंकार संबंधी पाठ** (पद-परिचय/अलंकार) के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'अलंकार पहचानना\' ही अलंकार-विश्लेषण है**। वे पंक्ति देखते ही चिल्लाते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वे साहित्यिक युक्तियाँ हैं जिनके माध्यम से कवि साधारण अर्थ को असाधारण, सजीव,',
                  options: ['अलंकार वे साहित्यिक युक्तियाँ हैं जिनके माध्यम से कवि साधारण अर्थ को असाधारण, सजीव,', 'कवि परिचय और पृष्ठभूमि का अर्थ है', '**पद्यांश-वार भावार्थ** काव्य-विश्लेषण की वह विधि है जिसमें कविता के प्रत्येक पद्यांश', 'काव्य-संरचना और पद्य-विन्यास का तात्पर्य कविता के बाह्य रूप (छंद, पद-योजना, तुक-योजना,'],
                  hint: 'यदि अटके तो **NCERT कक्षा 10 \'कृतिका/स्पर्श\' के अलंकार संबंधी पाठ** (पद-परिचय/अलंकार) के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'अलंकार पहचानना\' ही अलंकार-विश्लेषण है**। वे पंक्ति देखते ही चिल्लाते हैं — "उपमा!", "रूपक!" — और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read):** छात्र से कहें — कविता की वह पंक्ति **तीन बार जोर से पढ़ो** जहाँ अलंकार है; हर बार एक नया.', '**विलोपन परीक्षण (Deletion test):** कहें — "अलंकार वाले शब्द/वाक्यांश को **हटाकर** पंक्ति पढ़ो। अर्थ/प्रभाव में क्या.', '**विकल्प-तुलना (Alternative comparison):** कहें — "कवि ने \'अंधा कुआँ\' चुना; तुम \'गहरी खाई\', \'बंद कमरा\', \'भूलभुलैया\' में.', '**भाव-संयोजन (Emotion mapping):** एक तालिका बनवाएँ — कॉलम 1: अलंकार, कॉलम 2: उत्पन्न बिंब, कॉलम 3: केंद्रीय भाव से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
