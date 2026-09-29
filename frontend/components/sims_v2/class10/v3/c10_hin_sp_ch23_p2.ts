import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch23_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch23_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch23_p2',
    title: 'बड़े भाई साहब · Part 2/3',
    subtitle: 'इस नोड में **केवल "बड़े भाई साहब" कहानी के गौण विषयों** (पारिवारिक दायित्व, ग्रामीण.',
    classLevel: 10, subject: 'hin_sp', topic: 'बड़े भाई साहब · Part 2/3',
    chapters: ['c10_hin_sp_ch23'],
    nodeIds: ['c10_hin_sp_cbse_23_007', 'c10_hin_sp_cbse_23_008', 'c10_hin_sp_cbse_23_009', 'c10_hin_sp_cbse_23_010', 'c10_hin_sp_cbse_23_011', 'c10_hin_sp_cbse_23_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'बड़े भाई साहब\' में बड़े-भाई-साहब जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'बड़े भाई साहब — गौण विषय', text: '\'बड़े भाई साहब\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_23_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['बड़े भाई साहब —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_23_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through बड़े भाई साहब like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? बड़े भाई साहब · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बड़े भाई साहब · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_007', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_23_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — गौण विषय.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "गौण विषय = कहानी में कम आने वाला विषय" या "गौण विषय = उपकथानक (sub-plot)"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' के गौण विषय',
                  options: ['\'बड़े भाई साहब\' के गौण विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_23_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — गौण विषय मुख्य विषय की.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "गौण विषय = कहानी में कम आने वाला विषय" या "गौण विषय = उपकथानक (sub-plot)"। **वास्तविकता**: "बड़े भाई.' }
          ],
            remediations: { 'sub-plot': { steps: ['**पुनः पठन (Re-read)**: कहानी के **केवल गैर-पढ़ाई वाले प्रसंग** छाँटो (कपड़े धोना, गाँव की बातें, पतंग उड़ाना, खाना.', '**वर्गीकरण (Categorize)**: प्रत्येक प्रसंग के आगे लिखो — यह कौन-सा गौण विषय दिखाता है?', '(सूची: पारिवारिक दायित्व / ग्रामीण स्मृति / परीक्षा-व्यंग्य / मौन स्नेह)। 3.', '**सेतु बनाओ (Bridge)**: हर प्रसंग के लिए एक वाक्य लिखो — "यह प्रसंग मुख्य विषय (अनुभव > किताब) को कैसे मजबूत करता है?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_008', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **कक्षा 9 की अलंकार परिभाषाएँ (उपमा, रूपक, उत्प्रेक्षा)** दोहराएँ और **पाठ के.',
          misconception: '**सटीक भ्रम:** छात्र मानते हैं कि **हर तुलना रूपक है** और **हर वर्णन बिंब है**। **वास्तविकता:** (1) रूपक के लिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' में बिंब (imagery)',
                  options: ['\'बड़े भाई साहब\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **कक्षा 9 की अलंकार परिभाषाएँ (उपमा, रूपक, उत्प्रेक्षा)** दोहराएँ और **पाठ के 3-4.',
                  misconception: '**सटीक भ्रम:** छात्र मानते हैं कि **हर तुलना रूपक है** और **हर वर्णन बिंब है**। **वास्तविकता:** (1) रूपक के लिए **उपमान-सूचक शब्द (जैसे.' }
          ],
            remediations: { '1': { steps: ['**चरण 1:** छात्र से कहें: "पाठ खोलो, कोई 5 वाक्य छाँटो जहाँ तुम्हें **कुछ दिखे/सुने/महकेँ/छुए/स्वाद आए** — वही बिंब.', '**चरण 2:** उनसे पूछें: "इनमें से किस वाक्य में \'जैसे/वत्\' **नहीं** है पर एक चीज़ दूसरी **बन गई** है?" — वही रूपक है। 3.', '**चरण 3:** एक तालिका बनवाएँ: **वाक्य | इंद्रिय/अलंकार प्रकार | उपमेय-उपमान (यदि रूपक) | पात्र/विषय पर प्रभाव**। 4.', '**चरण 4:** बोर्ड उत्तर का नमूना दिखाएँ: "बिंब/रूपक → उद्धरण → इंद्रिय/उपमेय-उपमान → प्रभाव" — इसी **4-चरण संरचना** में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_009', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो c10_hin_sp_cbse_23_008 के WORKED_EXAMPLE_2 (रूपक विश्लेषण) को दोहराएँ — वही.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को "दो विपरीत बातों का मेल" मात्र मान लेते हैं (जैसे "दिन-रात", "सुख-दुख") और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' में विरोधाभास',
                  options: ['\'बड़े भाई साहब\' में विरोधाभास', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_23_008 के WORKED_EXAMPLE_2 (रूपक विश्लेषण) को दोहराएँ — वही चरण प्रतीक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को "दो विपरीत बातों का मेल" मात्र मान लेते हैं (जैसे "दिन-रात", "सुख-दुख") और **प्रतीक** को "किसी चीज.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read):** कहानी के 3-4 संवाद छाँटें जहाँ भैया उपदेश देते हैं (पृष्ठ 132-133)। प्रत्येक के सामने उनका.', '**प्रतीक-मानचित्रण:** लालटेन, चश्मा, किताब, टाइम-टेबल — प्रत्येक के लिए दो कॉलम बनाएँ: **स्थूल अर्थ** (क्या है) और.', '**लघु-लेखन:** 50 शब्दों में लिखें — "बड़े भाई साहब का चश्मा उनके व्यक्तित्व का आईना कैसे है?" — इससे प्रतीक विश्लेषण की.', '**बोर्ड-शैली अभ्यास:** विगत 3 वर्षों के CBSE प्रश्नपत्रों से \'विरोधाभास/प्रतीक\' आधारित प्रश्न हल करें; उत्तर में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_010', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_23_002 (कथानक)** और **c10_hin_sp_cbse_23_004 (पात्र-चित्रण.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य शब्द\' का अर्थ है \'कठिन शब्दों की सूची बनाकर शब्दकोश अर्थ रट लेना\'**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' की पदावली',
                  options: ['\'बड़े भाई साहब\' की पदावली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_23_002 (कथानक)** और **c10_hin_sp_cbse_23_004 (पात्र-चित्रण: नायक)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य शब्द\' का अर्थ है \'कठिन शब्दों की सूची बनाकर शब्दकोश अर्थ रट लेना\'**। **वास्तविकता:** बोर्ड.' }
          ],
            remediations: { 'x-usage-in-context': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पाठ का वह अंश खोलें** जहां शब्द आया है (उदाहरण: \'तम्बाकू\' वाला पैराग्राफ) — **जोर से पढ़ें** और पूछें: *"यहां कौन बोल.', 'आसपास क्या हो रहा है?"* 2.', '**शब्द को घेरकर** तीन प्रश्न लिखवाएं: (क) शाब्दिक अर्थ?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_011', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'c10_hin_sp_cbse_23_010 (पदावली: मुख्य शब्द) — वहाँ दिए गए शब्द-अर्थ, मुहावरे, लोकोक्तियाँ.',
          misconception: 'छात्र समझते हैं कि \'बड़े भाई साहब\' की भाषा **\'सरल हिंदी\' मात्र है** क्योंकि उसमें क्लिष्ट संस्कृतनिष्ठ शब्द कम हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' में भाषा-प्रयोग',
                  options: ['\'बड़े भाई साहब\' में भाषा-प्रयोग', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)'],
                  hint: 'c10_hin_sp_cbse_23_010 (पदावली: मुख्य शब्द) — वहाँ दिए गए शब्द-अर्थ, मुहावरे, लोकोक्तियाँ दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'बड़े भाई साहब\' की भाषा **\'सरल हिंदी\' मात्र है** क्योंकि उसमें क्लिष्ट संस्कृतनिष्ठ शब्द कम हैं। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पाठ के तीन प्रसंग चुनें** (उपदेश, रोना, पतंग) और प्रत्येक के 3-3 संवाद अलग कागज पर लिखें। 2.', '**रंगीन पेन से चिह्नित करें**: लाल — मुहावरे/लोकोक्तियाँ, नीला — तत्सम शब्द, हरा — तद्भव/देशज शब्द, पेंसिल — वाक्य.', '**तालिका बनाएं**: प्रसंग | शब्द-प्रकृति | वाक्य-प्रकार | पात्र की मनःस्थिति। 4.', '**लिखित अभ्यास**: "भाषा कैसे पात्र का अंतर्द्वंद्व खोलती है?" — 80 शब्दों में उत्तर लिखें, फिर शिक्षक/सहपाठी से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_012', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_23_006 (मुख्य विषय और संदेश) और c10_hin_sp_cbse_23_004.',
          misconception: '**सबसे घातक भ्रम:** विद्यार्थी मानते हैं कि "आशय-सूचक प्रश्न का उत्तर लंबा लिखने से पूरे अंक मिल जाते हैं।" वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'बड़े भाई साहब\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_23_006 (मुख्य विषय और संदेश) और c10_hin_sp_cbse_23_004.',
                  misconception: '**सबसे घातक भ्रम:** विद्यार्थी मानते हैं कि "आशय-सूचक प्रश्न का उत्तर लंबा लिखने से पूरे अंक मिल जाते हैं।" वास्तव में CBSE मार्किंग स्कीम.' }
          ],
            remediations: { 'cbse-value-points-2-2': { steps: ['**चरण 1:** विद्यार्थी से कहें — "पिछले वर्ष के CBSE प्रश्न-पत्र (2023, 2024) से 5 आशय-सूचक प्रश्न निकालो और उनके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
