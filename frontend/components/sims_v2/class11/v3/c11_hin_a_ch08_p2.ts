import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch08_p2: SimDef = {
    id: 'v3_c11_hin_a_ch08_p2',
    title: 'पाठ 8 · Part 2/3',
    subtitle: 'This node covers the identification, classification, and analytical explanation.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 8 · Part 2/3',
    chapters: ['c11_hin_a_ch08'],
    nodeIds: ['c11_hin_a_cbse_08_007', 'c11_hin_a_cbse_08_008', 'c11_hin_a_cbse_08_009', 'c11_hin_a_cbse_08_010', 'c11_hin_a_cbse_08_011', 'c11_hin_a_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'व्यक्तित्व-निर्माण\' में व्यक्तित्व-निर्माण जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — गौण विषय', text: '\'व्यक्तित्व-निर्माण\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — गौण', 'पाठ 8 — साहित्यिक', 'पाठ 8 — पदावली', 'पाठ 8 — व्याकरण', 'पाठ 8 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_08_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 2/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — \'व्यक्तित्व-निर्माण\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — \'व्यक्तित्व-निर्माण\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_007', difficulty: 'standard',
          question: '\'व्यक्तित्व-निर्माण\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review **node c11_hin_a_cbse_08_006 (मुख्य विषय और संदेश)** — specifically.',
          misconception: 'छात्र अक्सर मानते हैं कि **गौण विषय = सहायक पात्रों की कहानी**। उदाहरण: वे नायक के दोस्त की प्रेम-कहानी को गौण विषय समझ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व-निर्माण\' के गौण विषय',
                  options: ['\'व्यक्तित्व-निर्माण\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व-निर्माण\' का कथानक', '\'व्यक्तित्व-निर्माण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **node c11_hin_a_cbse_08_006 (मुख्य विषय और संदेश)** — specifically, rewrite the.',
                  misconception: 'छात्र अक्सर मानते हैं कि **गौण विषय = सहायक पात्रों की कहानी**। उदाहरण: वे नायक के दोस्त की प्रेम-कहानी को गौण विषय समझ लेते हैं। वास्तव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "पाठ के किसी सहायक पात्र को चुनो (जैसे नायक का दोस्त)। अब बताओ: उस पात्र के माध्यम से लेखक.', '**चरण 2:** उस विचार के **तीन प्रसंग** पाठ में ढूंढने को कहें जहां वह पात्र के बिना भी प्रकट होता हो (जैसे वर्णन में.', '**चरण 3:** समझाएं: "वह विचार जो पात्र से स्वतंत्र रूप से भी प्रकट होता है, वही **गौण विषय** है। पात्र केवल उसका \'वाहक\'.', '**चरण 4:** अभ्यास: मुख्य विषय लिखवाएं, फिर गौण विषय, फिर दोनों को जोड़ने वाला तीर (→) खींचकर लिखवाएं: "यह गौण विषय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_008', difficulty: 'standard',
          question: '\'व्यक्तित्व-निर्माण\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फँस जाएँ तो **c11_hin_a_cbse_08_006 (मुख्य विषय और संदेश)** दोहराएँ — कथ्य स्पष्ट.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **रूपक केवल "सुंदर लिखने" के लिए होता है** और **बिंब केवल "वर्णन सजाने" के लिए**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व-निर्माण\' में बिंब (imagery)',
                  options: ['\'व्यक्तित्व-निर्माण\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व-निर्माण\' का कथानक', '\'व्यक्तित्व-निर्माण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_a_cbse_08_006 (मुख्य विषय और संदेश)** दोहराएँ — कथ्य स्पष्ट होते ही.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **रूपक केवल "सुंदर लिखने" के लिए होता है** और **बिंब केवल "वर्णन सजाने" के लिए**। वे यह नहीं देख पाते.' }
          ],
            remediations: { 'cognitive-tool-conceptual-metaphor-theory': { steps: ['**पहला कदम:** छात्र से कहो — **"किसी एक अमूर्त संवेदना (जैसे: दुःख, क्रोध, आशा) को लो और उसे किसी मूर्त वस्तु (जैसे.', '**दूसरा कदम:** अब पूछो — **"इस रूपक में कौन-से बिंब छिपे हैं?', '(रंग, गंध, स्पर्श, स्वाद, ध्वनि)"** — छात्र को प्रत्येक बिंब को इंद्रिय-वार अलग करने को कहो। 3.', '**तीसरा कदम:** दोनों को जोड़ो — **"बताओ कि \'भीगा कोयला\' का स्पर्श/रंग/गंध दुःख के किस पहलू को खोलता है जो केवल \'दुःख.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_009', difficulty: 'standard',
          question: '\'व्यक्तित्व-निर्माण\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_08_008 (बिंब और रूपक)** के \'रूपक विश्लेषण\' वाले.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'प्रतीक\' (Symbol) और \'रूपक\' (Metaphor)** को एक ही समझते हैं और दोनों में अंतर नहीं कर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व-निर्माण\' में विरोधाभास',
                  options: ['\'व्यक्तित्व-निर्माण\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व-निर्माण\' का कथानक', '\'व्यक्तित्व-निर्माण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_08_008 (बिंब और रूपक)** के \'रूपक विश्लेषण\' वाले खंड को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'प्रतीक\' (Symbol) और \'रूपक\' (Metaphor)** को एक ही समझते हैं और दोनों में अंतर नहीं कर पाते। **गलत तर्क:**.' }
          ],
            remediations: { 'symbol-metaphor': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**चरण 1 - भेद स्पष्टीकरण:** छात्र को दो वाक्य दें: (क) "जीवन एक रंगमंच है" (रूपक)। (ख) एक कहानी सुनाएँ जहाँ एक पात्र.', '**चरण 2 - \'पुनरावृत्ति\' का अभ्यास:** पाठ से 3-4 ऐसे शब्द/चित्र चुनवाएँ जो **बार-बार** आए हों। छात्र से पूछें: "लेखक.', 'क्या ये केवल वस्तु हैं या कुछ और कहना चाहते हैं?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_010', difficulty: 'standard',
          question: '\'व्यक्तित्व-निर्माण\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **\'शब्द-शक्ति निरूपण\' (Class 10 व्याकरण, पाठ: शब्द विचार)** और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'मुख्य शब्द\' वे होते हैं जो **पाठ में बार-बार आएँ** (आवृत्ति-आधारित) या जो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व-निर्माण\' की पदावली',
                  options: ['\'व्यक्तित्व-निर्माण\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व-निर्माण\' का कथानक', '\'व्यक्तित्व-निर्माण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **\'शब्द-शक्ति निरूपण\' (Class 10 व्याकरण, पाठ: शब्द विचार)** और **\'शब्द-रचना/शब्द-भेद\'.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'मुख्य शब्द\' वे होते हैं जो **पाठ में बार-बार आएँ** (आवृत्ति-आधारित) या जो **शब्दकोश में \'कठिन\'.' }
          ],
            remediations: { '8': { steps: ['**पुनर्प्रवेश**: छात्र से कहें — "पाठ का कोई एक पन्ना खोलो। 5 मिनट में **केवल 3 शब्द** छाँटो जो तुम्हें लगे कि **लेखक.', '**तुलनात्मक अभ्यास**: उन 3 शब्दों में से प्रत्येक के लिए **3-3 समानार्थी** लिखवाएँ (तत्सम, तद्भव, उर्दू, अंग्रेजी)। फिर.', 'बाकी तीनों क्यों नहीं?" लिखित तर्क माँगें। 3.', '**व्यंजना-मानचित्रण**: एक शब्द लें (जैसे \'किवाड़\')। बोर्ड पर तीन वृत्त बनाएँ: **अभिधा** (भौतिक द्वार), **लाक्षणिक**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_011', difficulty: 'standard',
          question: '\'व्यक्तित्व-निर्माण\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_08_010 (पदावली)** दोहराएँ — विशेषकर व्यंजना.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है **अलंकार/शब्दार्थ पहचानना** (जैसे "यहाँ रूपक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व-निर्माण\' में भाषा-प्रयोग',
                  options: ['\'व्यक्तित्व-निर्माण\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व-निर्माण\' का कथानक', '\'व्यक्तित्व-निर्माण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_08_010 (पदावली)** दोहराएँ — विशेषकर व्यंजना शक्ति के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है **अलंकार/शब्दार्थ पहचानना** (जैसे "यहाँ रूपक है", "यहाँ अनुप्रास.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — सूक्ष्म व्याकरण पुनरीक्षण:** छात्र से कहें: "पाठ 8 के किसी एक पैराग्राफ के **हर वाक्य का कर्ता, क्रिया, काल.', 'अपने चयन का कारण लिखो।" **चरण 4 — सूत्रीकरण:** अंत में छात्र स्वयं लिखे: "भाषा-प्रयोग = संरचना + प्रसंग + उद्देश्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_08_012', difficulty: 'standard',
          question: '\'व्यक्तित्व-निर्माण\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके: **c11_hin_a_cbse_08_002 (कथानक संरचना)** और **c11_hin_a_cbse_08_006 (मुख्य.',
          misconception: '**विशिष्ट भ्रांति:** "आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (My Opinion) होता है क्योंकि हर व्यक्ति का अलग दृष्टिकोण होता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'व्यक्तित्व-निर्माण\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'व्यक्तित्व-निर्माण\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'व्यक्तित्व-निर्माण\' का कथानक', '\'व्यक्तित्व-निर्माण\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **c11_hin_a_cbse_08_002 (कथानक संरचना)** और **c11_hin_a_cbse_08_006 (मुख्य विषय)** को.',
                  misconception: '**विशिष्ट भ्रांति:** "आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (My Opinion) होता है क्योंकि हर व्यक्ति का अलग दृष्टिकोण होता है।" **गलत तर्क का.' }
          ],
            remediations: { 'my-opinion-not-mcq-any': { steps: ['**चरण 1 (Identify):** छात्र से कहें: "प्रश्न में संचालक शब्द (Operator Word) गोला लगाओ — \'क्या/कौन/कब\' है या.', '**चरण 2 (Categorize):** यदि \'क्या/कौन/कब\' → **वस्तुनिष्ठ** → पाठ में कीवर्ड खोजो, उत्तर लिखो। यदि \'क्यों/कैसे/आशय\' →.', '**चरण 3 (Scaffold - The \'Evidence Hunt\'):** आशय-सूचक के लिए: "पाठ से **तीन वाक्य** निकालो जो तुम्हारे उत्तर का समर्थन.', '**चरण 4 (PEEL Draft):** अब PEEL शीट भरो: Point (1 पंक्ति), Evidence (उद्धरण), Explanation (2-3 पंक्ति), Link (थीम से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
