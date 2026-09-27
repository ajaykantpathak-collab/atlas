import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch11_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch11_p1',
    title: 'पाठ 11 · Part 1/3',
    subtitle: 'इस नोड में कवि के जीवन के तथ्यों, ऐतिहासिक संदर्भ और साहित्यिक प्रभावों का अध्ययन किया.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 11 · Part 1/3',
    chapters: ['c10_hin_ks_ch11'],
    nodeIds: ['c10_hin_ks_cbse_11_001', 'c10_hin_ks_cbse_11_002', 'c10_hin_ks_cbse_11_003', 'c10_hin_ks_cbse_11_004', 'c10_hin_ks_cbse_11_005', 'c10_hin_ks_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए कि आप अपने दोस्त को एक नई फिल्म दिखा रहे हैं और वह पूछता है कि हीरो क्यों इतना गुस्से में है.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य, साहित्यिक प्रभावों और व्यक्तिगत अनुभवों का अध्ययन करना है, जो उसकी रचना को आकार देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — कवि', 'पाठ 11 — पद्यांश-वार', 'पाठ 11 — काव्य-संरचना', 'पाठ 11 — केंद्रीय', 'पाठ 11 — छंद', 'पाठ 11 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 1/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का.', answer: '11 -', options: ['11 -', '11 - -', '11 -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि.', answer: '11 - -', options: ['11 - -', '11 -', '11 -'] },
            { id: 's3', label: '11 -', prompt: 'Which idea is this? — **छंद** कविता की पंक्तियों में वर्णों या मात्राओं की निश्चित संख्या, क्रम और गुरु-लघु के.', answer: '11 -', options: ['11 -', '11 -', '11 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 11 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक.',
          hint: 'कविता पढ़ने की आधारभूत कौशल — यदि इसमें कठिनाई हो, तो कक्षा 9 के पाठ्यपुस्तक में दिए गए簡単.',
          misconception: 'छात्र अक्सर मानते हैं कि कवि परिचय का मतलब सिर्फ कवि का नाम, जन्म-स्थान, और एक-два प्रसिद्ध रचनाएँ याद करना है — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि', 'केंद्रीय भाव कविता की मुख्य मनोदशा या भावना है जिसे कवि पूरी कविता के माध्यम से व्यक्त'],
                  hint: 'कविता पढ़ने की आधारभूत कौशल — यदि इसमें कठिनाई हो, तो कक्षा 9 के पाठ्यपुस्तक में दिए गए簡単 कविताओं.',
                  misconception: 'छात्र अक्सर मानते हैं कि कवि परिचय का मतलब सिर्फ कवि का नाम, जन्म-स्थान, और एक-два प्रसिद्ध रचनाएँ याद करना है — जैसे कि "सूरदास ने सूरसागर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले एक बहुत ही सरल उदाहरण दें: मान लीजिए आपके दोस्त ने आज स्कूल में रोया — आप पूछेंगे क्यों?', 'अगर वह कहता है कि उसकी साइकिल चोरी हो गई, तो आप समझते हैं कि उसका रोना साइकिल से जुड़ा है। ठीक वैसे ही, कवि की कविता.', 'उन्हें बताएं कि पृष्ठभूमि सिर्फ नाम नहीं — वह कारण है जिसके बिना शब्द अधूरे हैं। इस अभ्यास को दोहराकर वे देखेंगे कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और.',
          hint: 'शब्दार्थ vs भावार्थ का अंतर — यदि भ्रम हो तो शब्दकोश से शब्द का अर्थ निकालकर फिर उसके.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि एक पद्यांश में "सूरज" या "फूल" जैसे सकारात्मक शब्द आएं, तो उसका भावार्थ अनिवार्य रूप से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का',
                  options: ['पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि', 'केंद्रीय भाव कविता की मुख्य मनोदशा या भावना है जिसे कवि पूरी कविता के माध्यम से व्यक्त'],
                  hint: 'शब्दार्थ vs भावार्थ का अंतर — यदि भ्रम हो तो शब्दकोश से शब्द का अर्थ निकालकर फिर उसके संदर्भ में.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि एक पद्यांश में "सूरज" या "फूल" जैसे सकारात्मक शब्द आएं, तो उसका भावार्थ अनिवार्य रूप से खुशी या आशा ही होगा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['"फूल खिले हैं, लेकिन कोई उन्हें देखने नहीं आया।" पूछें: पहले में क्या भाव है?', 'दूसरे में क्या बदल गया और क्यों?', 'फिर बताएं कि समान शब्द ("फूल खिले हैं") के आसपास के शब्द ("लेकिन कोई नहीं आया") भाव को पूरी तरह बदल देते हैं — यह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_003', difficulty: 'standard',
          question: 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते.',
          hint: 'यदि छात्र stanza पहचानने में कठिनाई महसूस कर रहा है, तो उसे पाठ 11 — पद्यांश-वार भावार्थ.',
          misconception: 'छात्र अक्सर मान लेते हैं कि यदि दो पंक्तियों के अंतिम शब्द तुकबंदी करते हैं तो पूरी पंक्तियों की लय समान होती है — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि',
                  options: ['काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'केंद्रीय भाव कविता की मुख्य मनोदशा या भावना है जिसे कवि पूरी कविता के माध्यम से व्यक्त'],
                  hint: 'यदि छात्र stanza पहचानने में कठिनाई महसूस कर रहा है, तो उसे पाठ 11 — पद्यांश-वार भावार्थ.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि यदि दो पंक्तियों के अंतिम शब्द तुकबंदी करते हैं तो पूरी पंक्तियों की लय समान होती है — जैसे "घोड़ा दौड़ता" और.' }
          ],
            remediations: { 'syllables': { steps: ['पहले छात्र से एक सरल शब्द जैसे "दौड़ता" बोलने को कहिए और उससे पूछिए कि किस syllable पर अधिक बल लगता है — "दौ" पर या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_004', difficulty: 'standard',
          question: 'केंद्रीय भाव कविता की मुख्य मनोदशा या भावना है जिसे कवि पूरी कविता के माध्यम से.',
          hint: 'यदि फँसें तो c10_hin_ks_cbse_11_002 (पद्यांश-वार भावार्थ) की समीक्षा करें।',
          misconception: 'छात्र अक्सर कविता के केंद्रीय भाव को उसके प्रारंभिक या अंतिम stanza के भाव के समान मान लेते हैं, बिना पूरे कविता के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव कविता की मुख्य मनोदशा या भावना है जिसे कवि पूरी कविता के माध्यम से व्यक्त',
                  options: ['केंद्रीय भाव कविता की मुख्य मनोदशा या भावना है जिसे कवि पूरी कविता के माध्यम से व्यक्त', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि'],
                  hint: 'यदि फँसें तो c10_hin_ks_cbse_11_002 (पद्यांश-वार भावार्थ) की समीक्षा करें।',
                  misconception: 'छात्र अक्सर कविता के केंद्रीय भाव को उसके प्रारंभिक या अंतिम stanza के भाव के समान मान लेते हैं, बिना पूरे कविता के भावात्मक विकास को देखे।.' }
          ],
            remediations: { 'stanza': { steps: ['छात्र को बताइए कि कविता पढ़ते समय उसे प्रत्येक stanza के बाद एक शब्द लिखना है जो उस stanza के भाव को दर्शाता हो (जैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_005', difficulty: 'standard',
          question: '**छंद** कविता की पंक्तियों में वर्णों या मात्राओं की निश्चित संख्या, क्रम और.',
          hint: 'यदि गुरु-लघु पहचान में अटके तो **\'मात्रा-ज्ञान\' चार्ट** (NCERT व्याकरण पाठ) दोहराएं.',
          misconception: '**विशिष्ट भ्रांति:** *"छंद का अर्थ केवल मात्रा/वर्ण गिनना है; लय तो अपने-आप बन जाती है।"* **वास्तविकता:** बोर्ड परीक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**छंद** कविता की पंक्तियों में वर्णों या मात्राओं की निश्चित संख्या, क्रम और गुरु-लघु के',
                  options: ['**छंद** कविता की पंक्तियों में वर्णों या मात्राओं की निश्चित संख्या, क्रम और गुरु-लघु के', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि'],
                  hint: 'यदि गुरु-लघु पहचान में अटके तो **\'मात्रा-ज्ञान\' चार्ट** (NCERT व्याकरण पाठ) दोहराएं — विशेषकर.',
                  misconception: '**विशिष्ट भ्रांति:** *"छंद का अर्थ केवल मात्रा/वर्ण गिनना है; लय तो अपने-आप बन जाती है।"* **वास्तविकता:** बोर्ड परीक्षा में 60% छात्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कोई परिचित दोहा (जैसे "रहिमन देखि बड़ेन को...") **ताली बजाकर** पढ़वाएं — हर ताली पर मात्रा.', '**दूसरा कदम:** यति-स्थान पर रुकने का अभ्यास कराएं: "रहिमन देखि बड़ेन को, **|** लघु न दीजिए त्याग" — बताएं कि `|` पर.', '**तीसरा कदम:** वही दोहा **द्रुत** फिर **विलम्बित** गति से पढ़वाएं — पूछें: "कौन-सी गति करुणा बढ़ाती है?" 4.', '**चौथा कदम:** अब अपरिचित पंक्ति दें और **मात्रा+यति+गति** तीनों लिखने को कहें — चेकलिस्ट दें: (मात्रा✓, यति✓, गति✓.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_006', difficulty: 'standard',
          question: 'अलंकार वे साहित्यिक युक्तियाँ हैं जो शब्दों की विशेष व्यवस्था या अर्थ के.',
          hint: '\'काव्य-संरचना\' (नोड 003) और \'छंद\' (नोड 005) के कार्यपत्रक दोबारा हल करें।',
          misconception: '**विशिष्ट भ्रम:** छात्र **उपमा और रूपक** को केवल "तुलना" मानकर एक समझ लेते हैं और परीक्षा में "उपमा/रूपक" लिखकर छोड़.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वे साहित्यिक युक्तियाँ हैं जो शब्दों की विशेष व्यवस्था या अर्थ के वैशिष्ट्य द्वारा',
                  options: ['अलंकार वे साहित्यिक युक्तियाँ हैं जो शब्दों की विशेष व्यवस्था या अर्थ के वैशिष्ट्य द्वारा', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि'],
                  hint: '\'काव्य-संरचना\' (नोड 003) और \'छंद\' (नोड 005) के कार्यपत्रक दोबारा हल करें।',
                  misconception: '**विशिष्ट भ्रम:** छात्र **उपमा और रूपक** को केवल "तुलना" मानकर एक समझ लेते हैं और परीक्षा में "उपमा/रूपक" लिखकर छोड़ देते हैं। **कारण:**.' }
          ],
            remediations: { '9': { steps: ['**तालिका बनवाएँ:** दो कॉलम — "साधक शब्द मौजूद" (उपमा) और "साधक शब्द अनुपस्थित" (रूपक); 10-10 उदाहरण भरवाएँ। 2.', '**रंगीन हाइलाइट:** किसी कविता की फोटोकॉपी दें; साधक शब्दों को पीले, उपमान को हरे, उपमेय को गुलाबी से मार्क करवाएँ। 3.', '**मौखिक ड्रिल:** आप पंक्ति बोलें (बिना साधक), छात्र तुरंत बोले "रूपक"; साधक सहित बोलें तो "उपमा" — 2 मिनट रोज़। 4.', '**बोर्ड-उत्तर अभ्यास:** "पंक्ति में ___ अलंकार है क्योंकि साधक शब्द \'___\' ___ है, इससे ___ प्रभाव पड़ता है" — यह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
