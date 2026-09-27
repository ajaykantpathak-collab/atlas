import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch10_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch10_p1',
    title: 'पाठ 10 · Part 1/3',
    subtitle: 'इस नोड में कवि के जीवन के तथ्यों (जन्म, शिक्षा, प्रभाव, युग) और उनकी रचना पर पड़ने वाले.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 10 · Part 1/3',
    chapters: ['c10_hin_ks_ch10'],
    nodeIds: ['c10_hin_ks_cbse_10_001', 'c10_hin_ks_cbse_10_002', 'c10_hin_ks_cbse_10_003', 'c10_hin_ks_cbse_10_004', 'c10_hin_ks_cbse_10_005', 'c10_hin_ks_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप अपने दोस्त के नए शायरी सुन रहे हैं और वह कहता है, "ये शेर मेरे दादाजी के बंटवारे के दिनों की.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, शैक्षणिक योग्यता, सामाजिक-राजनीतिक परिस्थितियों, साहित्यिक प्रभावों और रचनाकाल के बारे में सटीक जानकारी होना, जो उसकी रचना के विषय, शैली और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — कवि', 'पाठ 10 — पद्यांश-वार', 'पाठ 10 — काव्य-संरचना', 'पाठ 10 — केंद्रीय', 'पाठ 10 — छंद', 'पाठ 10 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 1/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) का भावगत अर्थ समझना और बताना है.', answer: '10 -', options: ['10 -', '10 - -', '10 -'] },
            { id: 's2', label: '10 - -', prompt: 'Which idea is this? — पद्य विन्यास कविता की संरचना का विश्लेषण है जिसमें स्टान्ज़ की संख्या, पंक्तियों की.', answer: '10 - -', options: ['10 - -', '10 -', '10 -'] },
            { id: 's3', label: '10 -', prompt: 'Which idea is this? — छंद और लय-विधान कविता में स्वर-व्यंजन के दोहराव द्वारा बनने वाली ध्वनिक लय का प्रणालीबद्ध.', answer: '10 -', options: ['10 -', '10 -', '10 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 10 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 10 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 10 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, शैक्षणिक योग्यता.',
          hint: 'पद्यांश का भावार्थ (c10_hin_ks_cbse_10_002) की समीक्षा करें — यदि आप कविता के.',
          misconception: 'छात्र अक्सर मानते हैं कि कवि के परिचय और पृष्ठभूमि केवल तभी उपयोगी होती है जब कविता स्पष्ट रूप से autobiographical हो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, शैक्षणिक योग्यता,',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, शैक्षणिक योग्यता,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) का भावगत अर्थ समझना और बताना है,', 'पद्य विन्यास कविता की संरचना का विश्लेषण है जिसमें स्टान्ज़ की संख्या, पंक्तियों की', 'केंद्रीय भाव वह मुख्य भावना है जो कविता के पूरे पाठ में बार-बार उभरकर पाठक के मन पर'],
                  hint: 'पद्यांश का भावार्थ (c10_hin_ks_cbse_10_002) की समीक्षा करें — यदि आप कविता के podstawowego meaning.',
                  misconception: 'छात्र अक्सर मानते हैं कि कवि के परिचय और पृष्ठभूमि केवल तभी उपयोगी होती है जब कविता स्पष्ट रूप से autobiographical हो (जैसे "मैं रो रहा.' }
          ],
            remediations: { 'autobiographical-door': { steps: ['छात्र को दिखाइए दो कविताएँ: एक स्पष्ट आत्मकथात्मक (जैसे premchand की एक ग़ज़ल जिसमें वह अपनी गरीबी का जिक्र करता है) और.', 'क्या हो सकता है कि कवि शहर के शोर से तंग आकर गाँव की याद कर रहा हो?" इससे उन्हें समझ में आएगा कि सभी रचना अंततः.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) का भावगत अर्थ समझना और.',
          hint: 'यदि stanza के भाव को समझने में कठिनाई हो तो तुरंत c10_hin_ks_cbse_10_001 (कवि परिचय और.',
          misconception: 'विद्यार्थी अक्सर इस गलती में पड़ते हैं कि वे stanza के भाव को केवल उन शब्दों के आधार पर निर्धारित कर देते हैं जो स्पष्ट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) का भावगत अर्थ समझना और बताना है,',
                  options: ['पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) का भावगत अर्थ समझना और बताना है,', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, शैक्षणिक योग्यता,', 'पद्य विन्यास कविता की संरचना का विश्लेषण है जिसमें स्टान्ज़ की संख्या, पंक्तियों की', 'केंद्रीय भाव वह मुख्य भावना है जो कविता के पूरे पाठ में बार-बार उभरकर पाठक के मन पर'],
                  hint: 'यदि stanza के भाव को समझने में कठिनाई हो तो तुरंत c10_hin_ks_cbse_10_001 (कवि परिचय और पृष्ठभूमि).',
                  misconception: 'विद्यार्थी अक्सर इस गलती में पड़ते हैं कि वे stanza के भाव को केवल उन शब्दों के आधार पर निर्धारित कर देते हैं जो स्पष्ट रूप से emocion शब्द.' }
          ],
            remediations: { 'stanza-emocion': { steps: ['यदि छात्र इस गलती को दोहरा रहा है, तो सबसे पहले उसे एक stanza दें जहाँ भाव स्पष्ट शब्दों में नहीं है—जैसे "समुद्र.', 'अब बताइए, इन शब्दों से आपका मन क्या महसूस कर रहा है?" जब वह उत्तर दे (जैसे "शांति" या "यात्रा का अंत"), तो उसे दिखाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_003', difficulty: 'standard',
          question: 'पद्य विन्यास कविता की संरचना का विश्लेषण है जिसमें स्टान्ज़ की संख्या.',
          hint: 'यदि फंस रहे हैं तो कविता के भावार्थ (c10_hin_ks_cbse_10_002) की समीक्षा करें — क्योंकि.',
          misconception: 'छात्र अक्सर मानते हैं कि पद्य vinyas का अर्थ केवल छंद (तुकबंदी और लय) होता है, इसलिए वे कविता के पद्य vinyas का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य विन्यास कविता की संरचना का विश्लेषण है जिसमें स्टान्ज़ की संख्या, पंक्तियों की',
                  options: ['पद्य विन्यास कविता की संरचना का विश्लेषण है जिसमें स्टान्ज़ की संख्या, पंक्तियों की', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, शैक्षणिक योग्यता,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) का भावगत अर्थ समझना और बताना है,', 'केंद्रीय भाव वह मुख्य भावना है जो कविता के पूरे पाठ में बार-बार उभरकर पाठक के मन पर'],
                  hint: 'यदि फंस रहे हैं तो कविता के भावार्थ (c10_hin_ks_cbse_10_002) की समीक्षा करें — क्योंकि पद्य vinyas.',
                  misconception: 'छात्र अक्सर मानते हैं कि पद्य vinyas का अर्थ केवल छंद (तुकबंदी और लय) होता है, इसलिए वे कविता के पद्य vinyas का विश्लेषण करते समय केवल.' }
          ],
            remediations: { 'vinyas': { steps: ['छात्र को दो कविताएँ दीजिए — एक में समान पंक्तियाँ और तुकबंदी (जैसे श्लोक), दूसरे में असमान पंक्तियाँ लेकिन मुक्त छंद.', 'क्यों?" फिर कविता B के बारे में: "इसकी पंक्तियाँ क्यों टूटी-टूटी लग रही हैं?', 'इस टूटने से क्या भाव आता है?" इससे उन्हें समझ में आएगा कि पद्य vinyas संरचना की बात है, न कि केवल लय की। फिर एक सरल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_004', difficulty: 'standard',
          question: 'केंद्रीय भाव वह मुख्य भावना है जो कविता के पूरे पाठ में बार-बार उभरकर पाठक के.',
          hint: 'यदि फंसें तो पद्यांश-वार भावार्थ (c10_hin_ks_cbse_10_002) की अवधारणा को दोबारा revise.',
          misconception: 'छात्र अक्सर केंद्रीय भाव को कविता के विषय या घटना से समान समझ लेते हैं, जैसे यदि कविता नदी के बारे में है तो वे कहते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव वह मुख्य भावना है जो कविता के पूरे पाठ में बार-बार उभरकर पाठक के मन पर',
                  options: ['केंद्रीय भाव वह मुख्य भावना है जो कविता के पूरे पाठ में बार-बार उभरकर पाठक के मन पर', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, शैक्षणिक योग्यता,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) का भावगत अर्थ समझना और बताना है,', 'पद्य विन्यास कविता की संरचना का विश्लेषण है जिसमें स्टान्ज़ की संख्या, पंक्तियों की'],
                  hint: 'यदि फंसें तो पद्यांश-वार भावार्थ (c10_hin_ks_cbse_10_002) की अवधारणा को दोबारा revise करें, विशेष.',
                  misconception: 'छात्र अक्सर केंद्रीय भाव को कविता के विषय या घटना से समान समझ लेते हैं, जैसे यदि कविता नदी के बारे में है तो वे कहते हैं कि केंद्रीय भाव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कोई वाक्य जैसे "मैं नदी के किनारे बैठा हूँ" में विषय \'नदी\' है, लेकिन भावना शांति या एकाकीपन हो सकती.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_005', difficulty: 'standard',
          question: 'छंद और लय-विधान कविता में स्वर-व्यंजन के दोहराव द्वारा बनने वाली ध्वनिक लय का.',
          hint: 'यदि छात्र छंद पहचानने में कठिनाई महसूस कर रहा है, तो केंद्रीय भाव और रस.',
          misconception: 'छात्र अक्सर छंद को सिर्फ अंताक्षरी से जोड़कर समझते हैं, जैसे कि यदि दो पंक्तियों के अंत के शब्द एक जैसे हैं (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद और लय-विधान कविता में स्वर-व्यंजन के दोहराव द्वारा बनने वाली ध्वनिक लय का प्रणालीबद्ध',
                  options: ['छंद और लय-विधान कविता में स्वर-व्यंजन के दोहराव द्वारा बनने वाली ध्वनिक लय का प्रणालीबद्ध', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, शैक्षणिक योग्यता,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) का भावगत अर्थ समझना और बताना है,', 'पद्य विन्यास कविता की संरचना का विश्लेषण है जिसमें स्टान्ज़ की संख्या, पंक्तियों की'],
                  hint: 'यदि छात्र छंद पहचानने में कठिनाई महसूस कर रहा है, तो केंद्रीय भाव और रस (c10_hin_ks_cbse_10_004) की.',
                  misconception: 'छात्र अक्सर छंद को सिर्फ अंताक्षरी से जोड़कर समझते हैं, जैसे कि यदि दो पंक्तियों के अंत के शब्द एक जैसे हैं (जैसे \'घर-दार\'), तो छंद समान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता की पंक्तियाँ आवाज़ में पढ़ने के लिए कहिए, और प्रत्येक मात्रा को ताली से गिनने को कहिए। उदाहरण: "घर" को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_006', difficulty: 'standard',
          question: 'अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों को.',
          hint: 'यदि अटके तो c10_hin_ks_cbse_10_003 (काव्य-संरचना) दोहराएँ: पंक्ति-चरण पहचान, लय-गति, और.',
          misconception: 'छात्र प्रायः समझते हैं कि अलंकार केवल \'सुंदर शब्दों की सजावट\' है और परीक्षा में केवल नाम लिख देना पर्याप्त है; वे यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों को विशेष ढंग से',
                  options: ['अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों को विशेष ढंग से', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, शैक्षणिक योग्यता,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) का भावगत अर्थ समझना और बताना है,', 'पद्य विन्यास कविता की संरचना का विश्लेषण है जिसमें स्टान्ज़ की संख्या, पंक्तियों की'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_10_003 (काव्य-संरचना) दोहराएँ: पंक्ति-चरण पहचान, लय-गति, और पद-विन्यास.',
                  misconception: 'छात्र प्रायः समझते हैं कि अलंकार केवल \'सुंदर शब्दों की सजावट\' है और परीक्षा में केवल नाम लिख देना पर्याप्त है; वे यह नहीं देख पाते कि CBSE.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक पंक्ति दें (जैसे "बूँद बूँद से सागर भरता") और पूछें: "कौन-सी ध्वनि बार-बार आई?" → अनुप्रास पहचानें। 2.', 'अब पूछें: "इस दोहराव से तुम्हें क्या महसूस हुआ — धीमापन, तेजी, या निरंतरता?" → प्रभाव (निरंतरता/लय) बताएँ। 3.', 'यही प्रक्रिया तीन अलग पंक्तियों पर दोहराएँ; हर बार \'पहचान + प्रभाव\' लिखवाएँ। 4.', 'अंत में बोर्ड मार्किंग स्कीम दिखाएँ: "पहचान 1 अंक, प्रभाव 1 अंक" — इससे वह समझ जाएगा कि अधूरा उत्तर = आधे अंक।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
