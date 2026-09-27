import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch07_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch07_p1',
    title: 'पाठ 7 · Part 1/3',
    subtitle: 'इस नोड में कवि के जीवन का परिचय, ऐतिहासिक एवं सामाजिक पृष्ठभूमि, प्रमुख प्रभाव और इनके.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 7 · Part 1/3',
    chapters: ['c10_hin_ks_ch07'],
    nodeIds: ['c10_hin_ks_cbse_07_001', 'c10_hin_ks_cbse_07_002', 'c10_hin_ks_cbse_07_003', 'c10_hin_ks_cbse_07_004', 'c10_hin_ks_cbse_07_005', 'c10_hin_ks_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप एक नए पड़ोसी से मिलते हैं और 궁금 हैं कि वह क्यों कुछ विशेष तरीके से बात करता है—आप पहले उसके.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा, प्रभावित करने वाली घटनाओं और रचनात्मक यात्रा का संक्षिप्त विवरण, जिससे उनकी रचनाओं के संदर्भ को समझना आसान हो जाता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — कवि', 'पाठ 7 — पद्यांश-वार', 'पाठ 7 — काव्य-संरचना', 'पाठ 7 — केंद्रीय', 'पाठ 7 — छंद', 'पाठ 7 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 1/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ.', answer: '7 -', options: ['7 -', '7 - -', '7 -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों — stanza की संख्या.', answer: '7 - -', options: ['7 - -', '7 -', '7 -'] },
            { id: 's3', label: '7 -', prompt: 'Which idea is this? — **छंद** कविता की वह निश्चित संरचना है जिसमें प्रत्येक पंक्ति की मात्राओं की संख्या, गण.', answer: '7 -', options: ['7 -', '7 -', '7 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण.',
          hint: 'यदि कठिनाई हो तो कक्षा 9 के ‘साहित्यिक परिचय’ और ‘पाठ‑संदर्भ समझ’ के अध्यायों की समीक्षा.',
          misconception: 'छात्र अक्सर यह मान लेते हैं कि कविता में व्यक्त की गई प्रत्येक भावना या घटना कवि की स्वयं की जीवनी है—उदाहरण के लिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों', '**केंद्रीय भाव** काव्य का वह मूल विचार या संदेश है जिसे कवि समस्त कलात्मक युक्तियों'],
                  hint: 'यदि कठिनाई हो तो कक्षा 9 के ‘साहित्यिक परिचय’ और ‘पाठ‑संदर्भ समझ’ के अध्यायों की समीक्षा करें.',
                  misconception: 'छात्र अक्सर यह मान लेते हैं कि कविता में व्यक्त की गई प्रत्येक भावना या घटना कवि की स्वयं की जीवनी है—उदाहरण के लिए, यदि एक कविता में वियोग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['सबसे पहले छात्र से उस कविता की ऐसी पंक्तियों को पहचानने को कहिए जहाँ स्पष्ट रूप से कोई तीसरे व्यक्ति का पात्र या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा.',
          hint: 'यदि stanza के संदर्भ में भ्रम हो तो c10_hin_ks_cbse_07_001 (कवि परिचय और पृष्ठभूमि) को.',
          misconception: 'विद्यार्थी अक्सर stanza-wise अर्थ लिखते समय प्रत्येक stanza का अर्थ एक ही तरह से लिख देते हैं, मानकर चलते हैं कि कविता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों', '**केंद्रीय भाव** काव्य का वह मूल विचार या संदेश है जिसे कवि समस्त कलात्मक युक्तियों'],
                  hint: 'यदि stanza के संदर्भ में भ्रम हो तो c10_hin_ks_cbse_07_001 (कवि परिचय और पृष्ठभूमि) को दोबारा पढ़कर.',
                  misconception: 'विद्यार्थी अक्सर stanza-wise अर्थ लिखते समय प्रत्येक stanza का अर्थ एक ही तरह से लिख देते हैं, मानकर चलते हैं कि कविता में भाव एक समान रहता.' }
          ],
            remediations: { 'stanza-wise-stanza': { steps: ['विद्यार्थी को बताइए कि हर stanza पढ़ने के बाद वह दो बातें नोट करे: (1) उसमें कौनसे नए शब्द या चित्र आए हैं जो पहले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_003', difficulty: 'standard',
          question: 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों — stanza की.',
          hint: 'यदि छात्र तुकबंदी योजना निर्धारित करने में उलझ रहा है, तो पहले “अंतिम शब्द का अंतिम स्वर.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कविता की पंक्तियों में समान शब्द दोहराए जा रहे हैं (जैसे “राम” हर पंक्ति में आता है) तो यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों',
                  options: ['काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', '**केंद्रीय भाव** काव्य का वह मूल विचार या संदेश है जिसे कवि समस्त कलात्मक युक्तियों'],
                  hint: 'यदि छात्र तुकबंदी योजना निर्धारित करने में उलझ रहा है, तो पहले “अंतिम शब्द का अंतिम स्वर बोलकर.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कविता की पंक्तियों में समान शब्द दोहराए जा रहे हैं (जैसे “राम” हर पंक्ति में आता है) तो यह तुकबंदी है। वास्तव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो पंक्तियाँ दें जहाँ अंतिम शब्दों की ध्वनि समान हो लेकिन शब्द अलग हों (जैसे “घर‑सफर”, “दीप‑नीप”) और पूछें कि.', 'फिर दो पंक्तियाँ दें जहाँ पूरा शब्द समान हो लेकिन अंतिम स्वर अलग हो (जैसे “बाल‑बाल”, “काल‑काल”) और स्पष्ट करें कि ये.', 'अंत में एक short stanza देकर अंतिम शब्दों को बोलकर सुनवाएँ और छात्र को बोल‑बोलकर तुक समूह (A, B…) निर्देशित करें। इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_004', difficulty: 'standard',
          question: '**केंद्रीय भाव** काव्य का वह मूल विचार या संदेश है जिसे कवि समस्त कलात्मक.',
          hint: 'यदि अटके तो **c10_hin_ks_cbse_07_002 (पद्यांश-वार भावार्थ)** पर लौटकर प्रत्येक पद का अर्थ.',
          misconception: '**सटीक भ्रांति:** "रस और केंद्रीय भाव एक ही चीज़ हैं — दोनों का मतलब कविता का \'मूड\' या \'थीम\' है।" **क्यों होती है:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**केंद्रीय भाव** काव्य का वह मूल विचार या संदेश है जिसे कवि समस्त कलात्मक युक्तियों',
                  options: ['**केंद्रीय भाव** काव्य का वह मूल विचार या संदेश है जिसे कवि समस्त कलात्मक युक्तियों', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि अटके तो **c10_hin_ks_cbse_07_002 (पद्यांश-वार भावार्थ)** पर लौटकर प्रत्येक पद का अर्थ पुनः.',
                  misconception: '**सटीक भ्रांति:** "रस और केंद्रीय भाव एक ही चीज़ हैं — दोनों का मतलब कविता का \'मूड\' या \'थीम\' है।" **क्यों होती है:** छात्र NCERT की सरल.' }
          ],
            remediations: { 'ncert': { steps: ['**चरण 1 — विभेद स्पष्ट करो:** दो कॉलम बनाओ: बाएँ "रस (क्या महसूस हुआ?)" — उदा: करुण, वीर, शांत; दाएँ "केंद्रीय भाव.', '**चरण 2 — सूत्र-आधारित अभ्यास:** भरतमुनि सूत्र (स्थायी भाव + विभाव + अनुभाव + संचारी = रस) को एक टेम्पलेट की तरह.', '**चरण 3 — केंद्रीय भाव के लिए \'क्यों\' पूछो:** रस पहचानने के बाद पूछो: "कवि ने यह रस *क्यों* जगाया?', 'क्या संदेश देना चाहता था?" — उत्तर ही केंद्रीय भाव बनेगा। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_005', difficulty: 'standard',
          question: '**छंद** कविता की वह निश्चित संरचना है जिसमें प्रत्येक पंक्ति की मात्राओं की.',
          hint: 'यदि मात्रा-गणना में अटकें तो **\'मात्रा-गणना अभ्यास शीट\'** (वर्णमाला के प्रत्येक अक्षर की.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'छंद = तुक (राइम)\'** और **\'मुक्त छंद = बिना लय का गद्य\'**। **वास्तविकता:** छंद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**छंद** कविता की वह निश्चित संरचना है जिसमें प्रत्येक पंक्ति की मात्राओं की संख्या, गण',
                  options: ['**छंद** कविता की वह निश्चित संरचना है जिसमें प्रत्येक पंक्ति की मात्राओं की संख्या, गण', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि मात्रा-गणना में अटकें तो **\'मात्रा-गणना अभ्यास शीट\'** (वर्णमाला के प्रत्येक अक्षर की मात्रा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'छंद = तुक (राइम)\'** और **\'मुक्त छंद = बिना लय का गद्य\'**। **वास्तविकता:** छंद का आधार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहो — "एक दोहा लिखो बिना तुक के" (उदाहरण: "काम क्रोध मद लोभ की / जो लखै निज कोय / ता पुरुष का.', '**दूसरा कदम:** \'आत्मकथ्य\' की कोई 2 पंक्तियाँ पढ़वाओ और पूछो — "तुम्हारी साँस कहाँ रुकी?', 'आवाज़ कहाँ ऊँची/नीची हुई?" — उन बिंदुओं को बोर्ड पर लिखो: यही लय के स्रोत हैं। 3.', '**तीसरा कदम:** छात्र से एक ही भाव को पहले दोहे में, फिर मुक्त छंद में लिखवाओ — दोनों पढ़कर अंतर महसूस करवाओ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_006', difficulty: 'standard',
          question: 'अलंकार काव्य की वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों की विशेष.',
          hint: 'यदि अटके: कक्षा 9 की \'काव्य सौंदर्य\' इकाई (अलंकार परिचय) दोहराएँ, विशेषकर उपमा-रूपक भेद.',
          misconception: 'छात्र मानते हैं कि अलंकार पहचानना केवल \'नाम बताना\' है (जैसे "यह उपमा है")। बोर्ड परीक्षा में 2-3 अंक के प्रश्नों में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार काव्य की वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों की विशेष व्यवस्था द्वारा',
                  options: ['अलंकार काव्य की वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों की विशेष व्यवस्था द्वारा', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि अटके: कक्षा 9 की \'काव्य सौंदर्य\' इकाई (अलंकार परिचय) दोहराएँ, विशेषकर उपमा-रूपक भेद और अनुप्रास.',
                  misconception: 'छात्र मानते हैं कि अलंकार पहचानना केवल \'नाम बताना\' है (जैसे "यह उपमा है")। बोर्ड परीक्षा में 2-3 अंक के प्रश्नों में **अलंकार का नाम.' }
          ],
            remediations: { '2-3': { steps: ['**चरण 1:** छात्र से कहें: "पहले केवल तुलना-सूचक शब्द खोजो — \'जैसे, वत्, समान, सदृश, इव\' — यदि मिले तो उपमा, नहीं तो आगे.', '**चरण 2:** "अब देखो: क्या एक वस्तु को दूसरी वस्तु *बताया* गया है?', '(वह सिंह है) — तो रूपक। क्या \'मानो/मानों/ज्यों\' से कल्पना की गई है?', '**चरण 3:** प्रत्येक पहचाने गए अलंकार के लिए टेम्पलेट भरवाएँ: "अलंकार: ___ | उपमान: ___ | उपमेय: ___ | भाव: ___ |.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
