import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch08_p1: SimDef = {
    id: 'v3_c12_hin_a_ch08_p1',
    title: 'वद्यिापति · Part 1/3',
    subtitle: 'A weaver taught God to speak the market\'s language',
    classLevel: 12, subject: 'hin_a', topic: 'वद्यिापति · Part 1/3',
    chapters: ['c12_hin_a_ch08'],
    nodeIds: ['c12_hin_a_cbse_08_001', 'c12_hin_a_cbse_08_002', 'c12_hin_a_cbse_08_003', 'c12_hin_a_cbse_08_004', 'c12_hin_a_cbse_08_005', 'c12_hin_a_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Nirgun Bhakti reader', intro: 'In Kashi\'s weaving lanes, a poet stitched four tongues into one — and aimed it at both temples and mosques.', goal: 'Read Kabir through Nirgun Bhakti, Sadhukkari language and the weaver\'s world as spiritual metaphor.' },
    discovery: {
        question: 'A weaver from Kashi writes verses in Sadhukkari — a mongrel tongue mixing Braj, Avadhi, Persian and Arabic — while priests guarded Sanskrit. What was Kabir really refusing?',
        options: ['The gatekeeping itself — his mixed lingua franca spoke past Sanskrit and Persian elites straight to artisans and mystics; the language was the rebellion', 'Elite languages are hard', 'He only knew dialect', 'Nothing — language is neutral'],
        answer: 'The gatekeeping itself — his mixed lingua franca spoke past Sanskrit and Persian elites straight to artisans and mystics; the language was the rebellion',
        hook: 'Don\'t confuse simple words with simple thought — his loom, his market, his courtyard are dense metaphysics in a worker\'s vocabulary. Life is cloth on the loom of time; see the weaving before it\'s finished. The weaver\'s craft is the epistemology.',
    },
    teaching: [
        { title: 'वद्यिापति — कवि परिचय और पृष्ठभूमि', text: 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के वैदिक-भावनात्मक कवि वद्यिापति के व्यक्तिगत जीवन, सामाजिक-धार्मिक परिदृश्य, भाषा प्रभाव और रचनात्मक प्रेरणा के स्रोतों.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sit at Kabir\'s loom: trace how a julaha\'s tools became metaphysical vocabulary, weigh Nirgun devotion against both orthodoxies, and hear a marketplace tongue carry the sublime.',
        labels: ['वद्यिापति — कवि परिचय', 'वद्यिापति — पद्यांश-वार भावार्थ', 'वद्यिापति — काव्य-संरचना और', 'वद्यिापति — केंद्रीय भाव', 'वद्यिापति — छंद और', 'वद्यिापति — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend\'s mother has been sinking into helpless waiting since her husband\'s posting abroad — she watches the gate all day and does nothing else. In the chapter\'s three-stanza poem, the separated woman ends by turning to the lamp and commanding it to stay lit so he can find his way home.',
            decisions: [{ prompt: 'What does that final stanza suggest your friend could offer her?', options: [
                { text: 'A ritual of agency — the poem\'s turn is from passive watching (the path) to doing something (keeping the lamp); helping her convert waiting into a nightly act — a lit lamp, a call scheduled, a task kept — changes despair into participation.', outcome: 'The stanza\'s climax is the moment she stops describing pain and acts on the world she can reach; the lamp becomes a collaborator, not just a symbol.' },
                { text: 'Reassure her that waiting itself is love enough — she shouldn\'t need to do anything.', outcome: 'The poem shows static watching is the anguish, not the answer — stanza 2 is exactly that passive night; the relief arrives only when she takes hold of a ritual.', reveals: 'waiting-is-enough' },
                { text: 'Distract her entirely — get her to stop thinking about him altogether.', outcome: 'The poem neither abandons the longing nor dissolves it in distraction — it channels it into a small commanded act; forgetting isn\'t the resolution, agency within the wait is.', reveals: 'distraction-equals-relief' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Kabir\'s \'simple\' words as surgical philosophy — and see language choice as the heart of his defiance.',
            decisions: [{ prompt: 'What comes next? वद्यिापति · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — वद्यिापति · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_001', difficulty: 'standard',
          question: 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी.',
          hint: 'यदि छात्र फंसे महसूस करे तो उसे कक्षा 11 के c11_hin_a_cbse_01_001 नोड (पाठ 1 — पृष्ठभूमि.',
          misconception: 'छात्र अक्सर सोचते हैं कि वद्यिापति के पृष्ठभूमि का अर्थ केवल उनके जन्म तिथि, पिता का नाम, और居住地 को याद करना है — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के',
                  options: ['वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के', 'पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान से पढ़कर', 'काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण', 'केंद्रीय भाव किसी काव्य-रचना का वह मूल सार या मुख्य संदेश होता है जो समस्त पंक्तियों,'],
                  hint: 'यदि छात्र फंसे महसूस करे तो उसे कक्षा 11 के c11_hin_a_cbse_01_001 नोड (पाठ 1 — पृष्ठभूमि और रचनाकार.',
                  misconception: 'छात्र अक्सर सोचते हैं कि वद्यिापति के पृष्ठभूमि का अर्थ केवल उनके जन्म तिथि, पिता का नाम, और居住地 को याद करना है — जैसे "वद्यिापति 1350 में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताइए कि आज हम एक छोटा प्रयोग करेंगे: ले लीजिए कोई सामान्य हिंदी दोहा (जैसे "पानी रे पानी") और पूछिए कि यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान.',
          hint: 'यदि भावार्थ समझने में कठिनाई हो, तो छात्र को वद्यिापति के पद्य में प्रयुक्त प्रमुख.',
          misconception: 'छात्र अक्सर मानते हैं कि पद्यांश-वार भावार्थ का मतलब है प्रत्येक पंक्ति का शब्दशः हिन्दी में अनुवाद करना — जैसे कि "जल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान से पढ़कर',
                  options: ['पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान से पढ़कर', 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के', 'काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण', 'केंद्रीय भाव किसी काव्य-रचना का वह मूल सार या मुख्य संदेश होता है जो समस्त पंक्तियों,'],
                  hint: 'यदि भावार्थ समझने में कठिनाई हो, तो छात्र को वद्यिापति के पद्य में प्रयुक्त प्रमुख प्रतीकों (जैसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि पद्यांश-वार भावार्थ का मतलब है प्रत्येक पंक्ति का शब्दशः हिन्दी में अनुवाद करना — जैसे कि "जल थल राहु केसरि" को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र पद्यांश का शब्दशः अनुवाद करके भावार्थ समझ रहा है, तो उसे इस प्रकार सुधारें: पहले उसे पद्यांश को आवाज़ में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_003', difficulty: 'standard',
          question: 'काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण — स्टांजा की संख्या.',
          hint: 'यदि stuck हों, तो c12_hin_a_cbse_08_002 (पद्यांश-वार भावार्थ) पर वापस जाएँ और कविता के.',
          misconception: 'छात्र अक्सर मानते हैं कि कविता के भाव को समझने के लिए केवल शब्दों के अर्थ पर्याप्त हैं और पद्य-विन्यास या छंद जैसी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण',
                  options: ['काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण', 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के', 'पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान से पढ़कर', 'केंद्रीय भाव किसी काव्य-रचना का वह मूल सार या मुख्य संदेश होता है जो समस्त पंक्तियों,'],
                  hint: 'यदि stuck हों, तो c12_hin_a_cbse_08_002 (पद्यांश-वार भावार्थ) पर वापस जाएँ और कविता के अर्थ को.',
                  misconception: 'छात्र अक्सर मानते हैं कि कविता के भाव को समझने के लिए केवल शब्दों के अर्थ पर्याप्त हैं और पद्य-विन्यास या छंद जैसी तकनीकी बातें केवल.' }
          ],
            remediations: { 'role-prose': { steps: ['छात्र से कहिए कि वह कविता को धीरे-धीरे आवाज़ में पढ़े और हर stanza के बाद रुककर पूछे: "मेरी आवाज़ की गति यहाँ बढ़ी या.', 'क्या कुछ शब्द विशेष रूप से बलित हुए?" फिर इन अवलोकनों को भाव से जोड़ने का अभ्यास करवाएँ — जैसे कि धीमी लय को शोक से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_004', difficulty: 'standard',
          question: 'केंद्रीय भाव किसी काव्य-रचना का वह मूल सार या मुख्य संदेश होता है जो समस्त.',
          hint: 'यदि रस-सूत्र (विभाव/अनुभाव/संचारी) स्पष्ट न हो तो **c11_hin_a_cbse_13_004** या.',
          misconception: '**सटीक भ्रम**: "विद्यापति के हर पद में एक ही रस होता है — या तो शृंगार या करुण" — क्योंकि छात्र **पारंपरिक रस-सिद्धांत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव किसी काव्य-रचना का वह मूल सार या मुख्य संदेश होता है जो समस्त पंक्तियों,',
                  options: ['केंद्रीय भाव किसी काव्य-रचना का वह मूल सार या मुख्य संदेश होता है जो समस्त पंक्तियों,', 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के', 'पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान से पढ़कर', 'काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण'],
                  hint: 'यदि रस-सूत्र (विभाव/अनुभाव/संचारी) स्पष्ट न हो तो **c11_hin_a_cbse_13_004** या.',
                  misconception: '**सटीक भ्रम**: "विद्यापति के हर पद में एक ही रस होता है — या तो शृंगार या करुण" — क्योंकि छात्र **पारंपरिक रस-सिद्धांत (भरत मुनि: एक काव्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **भरत मुनि के रस-सूत्र (विभावानुभावव्यभिचारिसंयोगाद्रसनिष्पत्तिः)** लिखवाओ और फिर विद्यापति के एक पद (जैसे.', 'फिर **दूसरे पद ("भजु रे मना")** पर यही प्रक्रिया दोहराओ — अब वीर+शांत पहचानवाओ। 3.', 'अंत में **तुलनात्मक चार्ट** बनवाओ: पद 1 में रस-यात्रा क्या थी?', 'इससे **रस-संवलन की गतिशीलता** समझ आएगी। **पुनः निदान**: "विद्यापति के किन्हीं दो पदों में रस-परिवर्तन का क्रम लिखो".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_005', difficulty: 'standard',
          question: 'छंद पदों में मात्राओं की गणना और उनके समूहन का नियमित पैटर्न है, जबकि लय-विधान.',
          hint: 'यदि मात्रा गणना में कठिनाई हो, तो c11_hin_a_cbse_15_005 ("हस्तक्षेप" से मात्रा गणना का.',
          misconception: 'छात्र अक्सर मानते हैं कि छंद केवल मात्राओं की कुल संख्या से निर्धारित होता है, जैसे कि "8 मात्राएँ = चौपाई", बिना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद पदों में मात्राओं की गणना और उनके समूहन का नियमित पैटर्न है, जबकि लय-विधान उस पैटर्न',
                  options: ['छंद पदों में मात्राओं की गणना और उनके समूहन का नियमित पैटर्न है, जबकि लय-विधान उस पैटर्न', 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के', 'पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान से पढ़कर', 'काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण'],
                  hint: 'यदि मात्रा गणना में कठिनाई हो, तो c11_hin_a_cbse_15_005 ("हस्तक्षेप" से मात्रा गणना का अभ्यास) पर.',
                  misconception: 'छात्र अक्सर मानते हैं कि छंद केवल मात्राओं की कुल संख्या से निर्धारित होता है, जैसे कि "8 मात्राएँ = चौपाई", बिना मात्राओं के क्रम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो पंक्तियाँ दें जिनमें समान मात्राएँ हों लेकिन अलग छंद हों (जैसे दोहा: "रामायण महाबharत" - 6+2, और सोरठा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_006', difficulty: 'standard',
          question: 'अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा को सजावट, प्रभाव और गहराई प्रदान करने.',
          hint: 'ध्वनि के दोहराव के प्रकार (व्यंजन vs स्वर) की समीक्षा करने के लिए c12_hin_a_cbse_08_005.',
          misconception: 'छात्र अक्सर अनुप्रास और असonנס (vowel दोहराव) को भ्रमित करते हैं — वे किसी भी दोहराव को अनुप्रास मान लेते हैं, चाहे वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा को सजावट, प्रभाव और गहराई प्रदान करने के लिए',
                  options: ['अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा को सजावट, प्रभाव और गहराई प्रदान करने के लिए', 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के', 'पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान से पढ़कर', 'काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण'],
                  hint: 'ध्वनि के दोहराव के प्रकार (व्यंजन vs स्वर) की समीक्षा करने के लिए c12_hin_a_cbse_08_005 पर लौटें।',
                  misconception: 'छात्र अक्सर अनुप्रास और असonנס (vowel दोहराव) को भ्रमित करते हैं — वे किसी भी दोहराव को अनुप्रास मान लेते हैं, चाहे वह स्वर हो या व्यंजन।.' }
          ],
            remediations: { 'on-vowel': { steps: ['छात्र को eerst देvanagari वर्णमाला दिखाइए और व्यंजन (क, ख, ग, घ...) और स्वर (अ, आ, इ, ई...) को अलग करके बताइए। फिर दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
