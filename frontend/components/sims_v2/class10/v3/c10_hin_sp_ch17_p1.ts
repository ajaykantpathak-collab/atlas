import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch17_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch17_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch17_p1',
    title: 'पद · Part 1/3',
    subtitle: 'यह नोड **केवल** कवि (रैदास) का संक्षिप्त जीवन-परिचय, उनकी भक्ति-धारा (निर्गुण/सगुण).',
    classLevel: 10, subject: 'hin_sp', topic: 'पद · Part 1/3',
    chapters: ['c10_hin_sp_ch17'],
    nodeIds: ['c10_hin_sp_cbse_17_001', 'c10_hin_sp_cbse_17_002', 'c10_hin_sp_cbse_17_003', 'c10_hin_sp_cbse_17_004', 'c10_hin_sp_cbse_17_005', 'c10_hin_sp_cbse_17_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'मान लो तुम्हें किसी दोस्त ने एक गुमनाम चिट्ठी दी और पूछा — "बताओ इसे किसने लिखा होगा?" तुम सबसे पहले क्या.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पद — कवि परिचय और पृष्ठभूमि', text: '**कवि परिचय और पृष्ठभूमि** का अर्थ है — कवि के जीवन की प्रमुख घटनाओं, उनकी साहित्यिक यात्रा, रचनाधर्मिता, तथा उस ऐतिहासिक-सामाजिक-सांस्कृतिक परिवेश का संक्षिप्त विवेचन जिसने कविता के केंद्रीय भाव को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_17_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पद — कवि परिचय', 'पद — पद्यांश-वार भावार्थ', 'पद — काव्य-संरचना और', 'पद — केंद्रीय भाव', 'पद — छंद और', 'पद — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_17_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पद like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पद · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पद · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_001', difficulty: 'standard',
          question: '**कवि परिचय और पृष्ठभूमि** का अर्थ है — कवि के जीवन की प्रमुख घटनाओं, उनकी.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 9 हिंदी स्पर्श/क्षितिज के \'भक्ति काव्य\' अध्याय** या.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि **\'कवि परिचय\' = \'कवि का बायोडाटा\' (जन्म-तिथि, मृत्यु-तिथि, पिता का नाम.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कवि परिचय और पृष्ठभूमि** का अर्थ है',
                  options: ['**कवि परिचय और पृष्ठभूमि** का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (पद्यांश) के गहन भाव को स्पष्ट करना,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढाँचे का विश्लेषण', 'केंद्रीय भाव (Central Theme) पद का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना चाहता है'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 9 हिंदी स्पर्श/क्षितिज के \'भक्ति काव्य\' अध्याय** या **कक्षा 10.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि **\'कवि परिचय\' = \'कवि का बायोडाटा\' (जन्म-तिथि, मृत्यु-तिथि, पिता का नाम, गुरु का नाम, प्रमुख.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पहला कदम:** विद्यार्थी से कहो — *"रैदास के जीवन की **तीन घटनाएँ** लिखो जिन्होंने उन्हें सबसे अधिक आहत या प्रेरित किया.', '**दूसरा कदम:** प्रत्येक घटना के सामने लिखवाओ — *"इस घटना का असर कविता की किस पंक्ति/भाव में दिखता है?"* (उदाहरण: मंदिर.', '**तीसरा कदम:** एक **माइंड-मैप (Mind Map)** बनवाओ — केंद्र में \'रैदास का जीवन\', शाखाओं में \'घटनाएँ\', उप-शाखाओं में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (पद्यांश) के गहन भाव को.',
          hint: 'यदि फँसें तो: c10_hin_sp_cbse_17_001 (कवि परिचय और पृष्ठभूमि) को दोबारा पढ़ें — विशेषकर.',
          misconception: 'छात्र समझते हैं कि **पद्यांश-वार भावार्थ = प्रत्येक पंक्ति का हिंदी अनुवाद + कठिन शब्दों के अर्थ**। वे ब्रजभाषा शब्दों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (पद्यांश) के गहन भाव को स्पष्ट करना,',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (पद्यांश) के गहन भाव को स्पष्ट करना,', '**कवि परिचय और पृष्ठभूमि** का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढाँचे का विश्लेषण', 'केंद्रीय भाव (Central Theme) पद का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना चाहता है'],
                  hint: 'यदि फँसें तो: c10_hin_sp_cbse_17_001 (कवि परिचय और पृष्ठभूमि) को दोबारा पढ़ें — विशेषकर \'भाषा और.',
                  misconception: 'छात्र समझते हैं कि **पद्यांश-वार भावार्थ = प्रत्येक पंक्ति का हिंदी अनुवाद + कठिन शब्दों के अर्थ**। वे ब्रजभाषा शब्दों के शब्दकोश अर्थ रट.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें — लय में**: छात्र से कहें कि पद को बिना अर्थ सोचे, केवल लय/ताल में 3 बार पढ़े; फिर पूछें — "क्या महसूस.', '**शब्द नहीं, प्रसंग पकड़ें**: 3-4 कठिन शब्द चुनें; छात्र से पूछें — "कवि ने *यही* शब्द *यहाँ* क्यों चुना?', 'दूसरा समानार्थी शब्द क्यों नहीं?" — इससे प्रसंगानुकूल अर्थ खुलेगा। 3.', '**बिंब-शल्यक्रिया (Imagery Dissection)**: एक बिंब लें (जैसे \'चकोर चाँद\'); छात्र से कहें — "चकोर के गुण गिनो, फिर बताओ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढाँचे का विश्लेषण.',
          hint: 'अगर मात्रा गिनने में अटके तो कक्षा 9 के \'छंद परिचय\' नोड (c9_hin_sp_cbse_छंद_परिचय) के.',
          misconception: 'छात्र समझते हैं कि \'छंद\' और \'लय\' एक ही चीज हैं — जबकि **छंद = निश्चित नियमबद्ध ढाँचा** (मात्रिक/वर्णिक गणना), **लय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढाँचे का विश्लेषण',
                  options: ['काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढाँचे का विश्लेषण', '**कवि परिचय और पृष्ठभूमि** का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (पद्यांश) के गहन भाव को स्पष्ट करना,', 'केंद्रीय भाव (Central Theme) पद का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना चाहता है'],
                  hint: 'अगर मात्रा गिनने में अटके तो कक्षा 9 के \'छंद परिचय\' नोड (c9_hin_sp_cbse_छंद_परिचय) के मात्रिक गणना.',
                  misconception: 'छात्र समझते हैं कि \'छंद\' और \'लय\' एक ही चीज हैं — जबकि **छंद = निश्चित नियमबद्ध ढाँचा** (मात्रिक/वर्णिक गणना), **लय = पढ़ते समय स्वाभाविक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "कविता की एक पंक्ति लो, पैर से ताल दो, बोलकर पढ़ो — जहाँ पैर स्वाभाविक रुके, वहाँ निशान लगाओ। यह **लय**.', 'फिर कहो: "अब उसी पंक्ति की मात्राएँ गिनो (ह्रस्व=1, दीर्घ=2), देखो कि क्या यह किसी ज्ञात छंद (दोहा, चौपाई, रोला) से मेल.', 'दोनों की तुलना करो: जहाँ लय रुकी पर छंद नहीं टूटा — वही कवि का कौशल है। 4.', 'अभ्यास: रैदास के पद की 3 पंक्तियों पर यह प्रक्रिया दोहराओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) पद का वह मूल संदेश या सार है जिसे कवि संप्रेषित.',
          hint: 'यदि अटके तो नोड 002 (पद्यांश-वार भावार्थ) दोहराएं — विशेषकर \'गिरधर नागर\', \'प्रणाम\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'केंद्रीय भाव\' और \'रस\' एक ही चीज़ हैं — जैसे "पद का भाव भक्ति रस है" लिख देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) पद का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना चाहता है',
                  options: ['केंद्रीय भाव (Central Theme) पद का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना चाहता है', '**कवि परिचय और पृष्ठभूमि** का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (पद्यांश) के गहन भाव को स्पष्ट करना,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढाँचे का विश्लेषण'],
                  hint: 'यदि अटके तो नोड 002 (पद्यांश-वार भावार्थ) दोहराएं — विशेषकर \'गिरधर नागर\', \'प्रणाम\', \'शरण\', \'पिय\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'केंद्रीय भाव\' और \'रस\' एक ही चीज़ हैं — जैसे "पद का भाव भक्ति रस है" लिख देते हैं। **वास्तविकता:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से पूछें: "कवि क्या कहना चाहता है?', '(भाव) — तुम पढ़कर क्या महसूस करते हो?', '(रस)" — दोनों के उत्तर अलग-अलग लिखवाएं। **चरण 2:** पद से 3-3 शब्द छाँटें: भाव-सूचक (प्रणाम, शरण, दासी) और रस-सूचक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_005', difficulty: 'standard',
          question: 'छंद कविता में स्वर और व्यंजन की लयबद्ध पुनरावृत्ति का पैटर्न है, जिसे मात्रा की.',
          hint: 'यदि मात्रा गिनने में गलती हो तो \'हिन्दी व्याकरण: स्वर की मात्रा\' (कक्षा 8) को पुनः देखें.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि दो पंक्तियों में मात्राओं की कुल संख्या समान है तो उनका छंद एक ही होगा — जैसे दोहा और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता में स्वर और व्यंजन की लयबद्ध पुनरावृत्ति का पैटर्न है, जिसे मात्रा की गिनती',
                  options: ['छंद कविता में स्वर और व्यंजन की लयबद्ध पुनरावृत्ति का पैटर्न है, जिसे मात्रा की गिनती', '**कवि परिचय और पृष्ठभूमि** का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (पद्यांश) के गहन भाव को स्पष्ट करना,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढाँचे का विश्लेषण'],
                  hint: 'यदि मात्रा गिनने में गलती हो तो \'हिन्दी व्याकरण: स्वर की मात्रा\' (कक्षा 8) को पुनः देखें — विशेष.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि दो पंक्तियों में मात्राओं की कुल संख्या समान है तो उनका छंद एक ही होगा — जैसे दोहा और सोरठा दोनों में 16.' }
          ],
            remediations: { '16': { steps: ['छात्र को दिखाएँ कि दोहा की एक पंक्ति लें (जैसे "कर्मणी द्वारा होइ सो पहिचान") और उसके प्रत्येक भाग की मात्राएँ अलग-अलग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_006', difficulty: 'standard',
          question: 'अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष विन्यास से काव्य.',
          hint: 'यदि अटके तो **कक्षा 9 की \'अलंकार\' पाठ्य-सामग्री (पाठ्यपुस्तक स्पर्श भाग-1, पाठ-उपयुक्त)**.',
          misconception: '**सबसे घातक भ्रम:** *"अलंकार पहचानना = नाम बता देना (जैसे: यह उपमा है)।"* **वास्तविकता:** CBSE बोर्ड **नाम मात्र से 1.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष विन्यास से काव्य को',
                  options: ['अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष विन्यास से काव्य को', '**कवि परिचय और पृष्ठभूमि** का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (पद्यांश) के गहन भाव को स्पष्ट करना,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढाँचे का विश्लेषण'],
                  hint: 'यदि अटके तो **कक्षा 9 की \'अलंकार\' पाठ्य-सामग्री (पाठ्यपुस्तक स्पर्श भाग-1, पाठ-उपयुक्त)** के.',
                  misconception: '**सबसे घातक भ्रम:** *"अलंकार पहचानना = नाम बता देना (जैसे: यह उपमा है)।"* **वास्तविकता:** CBSE बोर्ड **नाम मात्र से 1 अंक** देता है.' }
          ],
            remediations: { 'cbse-1': { steps: ['**पुनः पढ़ें:** पद के **उसी पद्यांश** को लय में पढ़ें जहाँ अलंकार छूटा था; **ध्वनि (शब्दालंकार)** और **चित्र/तुलना.', '**तालिका बनाएँ:** कागज पर तीन कॉलम बनाएँ — **पंक्ति | अलंकार नाम+भेद | प्रभाव (क्या चित्र/ध्वनि/भाव उभरा)** — पद के 5-6.', '**मॉडल उत्तर देखें:** CBSE मार्किंग स्कीम के **नमूना उत्तरों** में देखें कि प्रभाव-व्याख्या **कितने शब्दों/वाक्यों**.', '**अभ्यास:** रोज़ एक पद्यांश लें, **केवल प्रभाव-व्याख्या** लिखने का 5-मिनट टाइमर लगाएँ — **नाम लिखने में समय न गँवाएँ**।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
