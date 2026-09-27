import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch02_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'This node covers Tulsidas\'s biography (birth, early life, guru, major works), historical.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c10_hin_ks_ch02'],
    nodeIds: ['c10_hin_ks_cbse_02_001', 'c10_hin_ks_cbse_02_002', 'c10_hin_ks_cbse_02_003', 'c10_hin_ks_cbse_02_004', 'c10_hin_ks_cbse_02_005', 'c10_hin_ks_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'Think of meeting a new classmate — you\'d ask "Where are you from? What do you like?" to understand them.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है — रचनाकार (कवि/लेखक) का जीवन परिचय, ऐतिहासिक काल, सामाजिक-सांस्कृतिक परिवेश, प्रमुख रचनाएँ, साहित्यिक योगदान, और उनकी विचारधारा को समझना ताकि रचना के भावों को गहराई.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — कवि', 'पाठ 2 — पद्यांश-वार', 'पाठ 2 — काव्य-संरचना', 'पाठ 2 — केंद्रीय', 'पाठ 2 — छंद', 'पाठ 2 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 1/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों.', answer: '2 -', options: ['2 -', '2 - -', '2 -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — काव्य-संरचना (Poetic Structure) कविता के अवयवों — पद/छंद, स्त्रोत (stanza), तुक (rhyme).', answer: '2 - -', options: ['2 - -', '2 -', '2 -'] },
            { id: 's3', label: '2 -', prompt: 'Which idea is this? — छंद (meter) poesía में अक्षरों के गुरु‑लघु क्रम की दोहराव वाली संरचना है, जबकि लय‑विधान.', answer: '2 -', options: ['2 -', '2 -', '2 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है — रचनाकार (कवि/लेखक) का जीवन परिचय, ऐतिहासिक.',
          hint: 'Review Class 9 Hindi Kshitij Chapter "सूरदास" and History chapter "Bhakti-Sufi.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "कवि परिचय" केवल **तथ्यों की सूची** (जन्म-तिथि, मृत्यु-तिथि, रचनाएँ) याद करना है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों', '**केंद्रीय भाव (Central Theme)** is the core universal idea or message the poet conveys'],
                  hint: 'Review Class 9 Hindi Kshitij Chapter "सूरदास" and History chapter "Bhakti-Sufi Traditions" for.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "कवि परिचय" केवल **तथ्यों की सूची** (जन्म-तिथि, मृत्यु-तिथि, रचनाएँ) याद करना है। वे यह नहीं देखते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "तुलसीदास के जीवन की तीन घटनाएँ लिखो जो तुम्हें लगता है उनके लेखन को प्रभावित करती हैं।".', '**चरण 2:** फिर पूछें: "इनमें से कौन-सी घटना \'राम-लक्ष्मण-परशुराम संवाद\' में दिखती है?', 'कैसे?" (गुरु-भक्ति → राम का परशुराम को गुरु मानना; विरोध सहना → राम का क्रोध न करना; अवधी → संवाद की सरल भाषा)। 3.', '**चरण 3:** पाठ्यपुस्तक के "कवि परिचय" बॉक्स को दोबारा पढ़वाएँ, इस बार **तीर (→) खींचकर** जीवन-घटना को रचना-विशेषता से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों.',
          hint: 'यदि प्रसंग पहचानने में अटकें, तो **कवि परिचय नोड (c10_hin_ks_cbse_02_001) के \'रचनात्मक.',
          misconception: '**विशिष्ट भ्रांति**: *"भावार्थ का अर्थ है पद्यांश का हिंदी अनुवाद लिख देना।"* **क्यों होती है**: कक्षा 6-8 तक छात्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों', '**केंद्रीय भाव (Central Theme)** is the core universal idea or message the poet conveys'],
                  hint: 'यदि प्रसंग पहचानने में अटकें, तो **कवि परिचय नोड (c10_hin_ks_cbse_02_001) के \'रचनात्मक उद्देश्य\'.',
                  misconception: '**विशिष्ट भ्रांति**: *"भावार्थ का अर्थ है पद्यांश का हिंदी अनुवाद लिख देना।"* **क्यों होती है**: कक्षा 6-8 तक छात्र \'अनुवाद\' और \'भावार्थ\'.' }
          ],
            remediations: { '6-8': { steps: ['**पहला सत्र**: छात्र को एक सरल पद्यांश दें (जैसे \'पुष्प की अभिलाषा\' का पहला पद्यांश) और कहें — *"केवल शब्दार्थ मत लिखो.', '**दूसरा सत्र**: दो विपरीत प्रसंगों में समान बिंब (जैसे \'आग\') दें — छात्र से **तुलनात्मक भावार्थ** लिखवाएँ; अंतर स्पष्ट.', '**तीसरा सत्र**: बोर्ड के **मार्किंग स्कीम** का नमूना दिखाएँ — जहाँ \'बिंब व्याख्या\', \'प्रसंग\', \'केंद्रीय भाव से संबंध\'.', '**नियम**: अब से हर भावार्थ में **4 अनिवार्य तत्व** होंगे — (क) प्रसंग, (ख) प्रमुख बिंब/प्रतीक, (ग) कवि का आशय, (घ).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_003', difficulty: 'standard',
          question: 'काव्य-संरचना (Poetic Structure) कविता के अवयवों — पद/छंद, स्त्रोत (stanza), तुक.',
          hint: 'यदि अटके: **Class 9 हिंदी (कृतिका/क्षितिज) का \'छंद-परिचय\' पाठ** दोहराएँ — विशेषकर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "काव्य-संरचना" = "कविता को पैराग्राफ में बाँटना" (स्टैंजा गिनना)। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना (Poetic Structure) कविता के अवयवों',
                  options: ['काव्य-संरचना (Poetic Structure) कविता के अवयवों', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', '**केंद्रीय भाव (Central Theme)** is the core universal idea or message the poet conveys'],
                  hint: 'यदि अटके: **Class 9 हिंदी (कृतिका/क्षितिज) का \'छंद-परिचय\' पाठ** दोहराएँ — विशेषकर मात्रा-गणना के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "काव्य-संरचना" = "कविता को पैराग्राफ में बाँटना" (स्टैंजा गिनना)। वे **छंद-विधान (meter).' }
          ],
            remediations: { 'meter': { steps: ['**पुनः पढ़ाएँ:** छात्र को एक **ज्ञात दोहा** (जैसे "रहिमन देखि बड़ेन को...") और एक **ज्ञात चौपाई** (हनुमान चालीसा की).', '**तुलना करवाएँ:** वही भाव (जैसे \'वीरता\') पहले दोहे में, फिर चौपाई में लिखवाएँ — पूछें: "कौन सा छंद *अधिक असरदार* लगा और.', '**पाठ-आधारित अभ्यास:** पाठ 2 के **एक प्रसंग** (जैसे परशुराम का पहला दोहा) लेकर पूछें: "यही बात चौपाई में लिखी होती तो.', '**फीडबैक लूप:** उसके उत्तर में **\'क्या छूटा\'** (कार्यात्मक विश्लेषण) लाल पेन से मार्क करें, फिर सही मॉडल उत्तर साथ में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_004', difficulty: 'standard',
          question: '**केंद्रीय भाव (Central Theme)** is the core universal idea or message the poet.',
          hint: 'अगर अटके तो **c10_hin_ks_cbse_02_002 (पद्यांश-वार भावार्थ)** के अपने नोट्स दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि **केंद्रीय भाव = कविता का सारांश (summary)** और **रस = कविता में आया कोई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**केंद्रीय भाव (Central Theme)** is the core universal idea or message the poet conveys',
                  options: ['**केंद्रीय भाव (Central Theme)** is the core universal idea or message the poet conveys', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'अगर अटके तो **c10_hin_ks_cbse_02_002 (पद्यांश-वार भावार्थ)** के अपने नोट्स दोबारा पढ़ें और हर.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि **केंद्रीय भाव = कविता का सारांश (summary)** और **रस = कविता में आया कोई एक भाव (जैसे क्रोध.' }
          ],
            remediations: { 'summary': { steps: ['**चरण 1 — अंतर स्पष्ट करें:** विद्यार्थी से कहें — "कहानी सुनाओ" (वह सारांश देगा) फिर पूछें — "लेखक *क्यों* सुनाना.', '**चरण 2 — रस-घटक मिलान करवाएं:** एक पद्यांश दें और तीन कॉलम बनवाएँ — **क्या हुआ (विभाव)**, **क्या दिखा (अनुभाव)**, **मन.', '**चरण 3 — प्रतिमान उत्तर दिखाएं:** बोर्ड के मॉडल उत्तर (Marking Scheme) से एक \'केंद्रीय भाव\' और एक \'रस-निरूपण\' उत्तर.', '**चरण 4 — अभ्यास:** रोज एक अनदेखा पद्यांश देकर केवल **केंद्रीय भाव (1 वाक्य)** और **प्रमुख रस (नाम + 2 साक्ष्य)** लिखने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_005', difficulty: 'standard',
          question: 'छंद (meter) poesía में अक्षरों के गुरु‑लघु क्रम की दोहराव वाली संरचना है, जबकि.',
          hint: 'गुरु‑लघu निर्धारण के नियमों की समीक्षा करें।',
          misconception: 'छात्र अक्सर सोचते हैं कि लय‑विधान का अर्थ केवल पाठ की पढ़ने की चाल (तेज‑धीमा) है और इसे गुरु‑लघu pattern से अलग रखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद (meter) poesía में अक्षरों के गुरु‑लघु क्रम की दोहराव वाली संरचना है, जबकि लय‑विधान',
                  options: ['छंद (meter) poesía में अक्षरों के गुरु‑लघु क्रम की दोहराव वाली संरचना है, जबकि लय‑विधान', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'गुरु‑लघu निर्धारण के नियमों की समीक्षा करें।',
                  misconception: 'छात्र अक्सर सोचते हैं कि लय‑विधान का अर्थ केवल पाठ की पढ़ने की चाल (तेज‑धीमा) है और इसे गुरु‑लघu pattern से अलग रखते हैं, जबकि वास्तव में.' }
          ],
            remediations: { 'u-pattern': { steps: ['छात्र को सबसे पहले पंक्ति को धीरे‑धीरे पढ़ने के लिए कहिए और प्रत्येक अक्षर पर टैप करके समय की अनुभव कराइए। फिर प्रत्येक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_006', difficulty: 'standard',
          question: 'अलंकार (Figure of Speech) काव्य में शब्दों अथवा अर्थों की विशिष्ट व्यवस्था है.',
          hint: 'यदि अलंकार पहचानने में अटके, तो पहले **पद्यांश-वार भावार्थ** (c10_hin_ks_cbse_02_002).',
          misconception: 'छात्र **उपमा और रूपक** को केवल \'जैसे/सा\' शब्द की उपस्थिति/अनुपस्थिति से पहचानते हैं, जबकि तुलना के **आधार (साधारण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Figure of Speech) काव्य में शब्दों अथवा अर्थों की विशिष्ट व्यवस्था है जो',
                  options: ['अलंकार (Figure of Speech) काव्य में शब्दों अथवा अर्थों की विशिष्ट व्यवस्था है जो', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'यदि अलंकार पहचानने में अटके, तो पहले **पद्यांश-वार भावार्थ** (c10_hin_ks_cbse_02_002) दोबारा पढ़ें.',
                  misconception: 'छात्र **उपमा और रूपक** को केवल \'जैसे/सा\' शब्द की उपस्थिति/अनुपस्थिति से पहचानते हैं, जबकि तुलना के **आधार (साधारण धर्म)** पर ध्यान नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के 5-6 संवाद देकर कहें: "हर संवाद में तुलना खोजो — उपमेय, उपमान, साधारण धर्म, और संबंध-सूचक अव्यय अलग-अलग.', 'फिर पूछें: "जहां अव्यय न हो, वहां तुलना कैसे सिद्ध हुई?" — इससे रूपक की अवधारणा स्पष्ट होगी। 3.', 'अंत में 3-3 उदाहरण उपमा, रूपक, उत्प्रेक्षा के लिखवाएं और प्रत्येक में \'साधारण धर्म\' लिखवाएं — यही बोर्ड उत्तर-लेखन की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
