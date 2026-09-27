import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch12_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch12_p2',
    title: 'पाठ 12 · Part 2/3',
    subtitle: 'यह नोड केवल **प्रतीक** और **बिंब** की पहचान, भेद, कार्यविधि और काव्य में उनके प्रभाव तक.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 12 · Part 2/3',
    chapters: ['c10_hin_ks_ch12'],
    nodeIds: ['c10_hin_ks_cbse_12_007', 'c10_hin_ks_cbse_12_008', 'c10_hin_ks_cbse_12_009', 'c10_hin_ks_cbse_12_010', 'c10_hin_ks_cbse_12_011', 'c10_hin_ks_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप बरसात की शाम खिड़की पर बैठे हैं — बाहर बूँदें टपक रही हैं, मिट्टी की सौंधी गंध उठ रही है, दूर.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**प्रतीक** वह शब्द या वाक्यांश है जो अपने शाब्दिक अर्थ के अतिरिक्त किसी गहन, अमूर्त या व्यापक भाव/विचार/सत्य को संकेतित करता है। **बिंब** वह शब्द-योजना है जो पाठक की इंद्रियों (दृश्य, श्रवण, घ्राण.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — साहित्यिक', 'पाठ 12 — मुख्य', 'पाठ 12 — गौण', 'पाठ 12 — पदावली', 'पाठ 12 — व्याकरण', 'पाठ 12 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_12_008', title: 'पाठ 12 — मुख्य भाव और संदेश',
          caseStudy: { intro: 'Have you ever tried explaining a song\'s *real meaning* to a friend who only hears the tune?',
            decisions: [{ prompt: 'पाठ 12 की कविता का \'मुख्य भाव\' और \'संदेश\' में क्या मूल अंतर है? एक वाक्य में लिखिए।', options: [
                { text: 'मुख्य भाव कविता की आंतरिक भावनात्मक अनुभूति है (जैसे: आशा, करुणा), जबकि संदेश वह बाह्य', outcome: 'मुख्य भाव कविता की आंतरिक भावनात्मक अनुभूति है (जैसे: आशा, करुणा), जबकि संदेश वह बाह्य सीख है जो.' },
                { text: 'कवि ने बताया कि रास्ता कठिन था पर वह चलता रहा', outcome: 'Not quite — Students confuse **मुख्य भाव** with **कथावस्तु (plot summary)** — they write "कवि ने बताया कि.', reveals: 'students-confuse-with-plot-summary' },
                { text: 'कविता जीवन के संघर्षों के प्रति अदम्य आशा और जिजीविषा का भाव जगाती है', outcome: 'Not quite — Students confuse **मुख्य भाव** with **कथावस्तु (plot summary)** — they write "कवि ने बताया कि.', reveals: 'students-confuse-with-plot-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 12 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_007', difficulty: 'standard',
          question: '**प्रतीक** वह शब्द या वाक्यांश है जो अपने शाब्दिक अर्थ के अतिरिक्त किसी गहन.',
          hint: 'यदि अटके तो c10_hin_ks_cbse_12_002 (पद्यांश-वार भावार्थ) दोहराएँ — वहाँ शब्दों के.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **हर रूपक (Metaphor) प्रतीक है और हर बिंब अलंकार है**। उदाहरण: "वह सिंह है".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**प्रतीक** वह शब्द या वाक्यांश है जो अपने शाब्दिक अर्थ के अतिरिक्त किसी गहन, अमूर्त या',
                  options: ['**प्रतीक** वह शब्द या वाक्यांश है जो अपने शाब्दिक अर्थ के अतिरिक्त किसी गहन, अमूर्त या', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (बंध) को अलग-अलग पढ़कर उसके', 'काव्य-संरचना कविता के बाहरी ढाँचे (छंद, पद, चरण, मात्रा, गति, यति, विराम) और आंतरिक'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_12_002 (पद्यांश-वार भावार्थ) दोहराएँ — वहाँ शब्दों के प्रसंगानुकूल अर्थ.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **हर रूपक (Metaphor) प्रतीक है और हर बिंब अलंकार है**। उदाहरण: "वह सिंह है" — यहाँ \'सिंह\' रूपक है.' }
          ],
            remediations: { 'metaphor': { steps: ['छात्र से कहें: "आँख बंद करो, मैं \'तपती रेत\' कहूँ — तुम्हें क्या महसूस हुआ?" (गरमी/चुभन = स्पर्श बिंब)। 2.', 'फिर कहें: "अब \'तपती रेत\' को \'कठिन जीवन\' का प्रतीक मानो — अब क्या बदला?" (अर्थ विस्तार = प्रतीक)। 3.', 'दो कॉलम बनवाएँ: बाएँ — इंद्रिय शब्द (बिंब), दाएँ — संकेतित भाव (प्रतीक)। 4.', 'पाठ्यपुस्तक के किसी एक पद में दोनों कॉलम भरवाएँ। 3-4 अभ्यास के बाद भेद स्पष्ट हो जाएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_008', difficulty: 'standard',
          question: 'मुख्य भाव (Central Idea) कविता का वह सार्वभौमिक सत्य या मूल भावना है जो कवि.',
          hint: 'Review प्रतीक और बिंब (c10_hin_ks_cbse_12_007) — practice converting each image into.',
          misconception: 'Students confuse **मुख्य भाव** with **कथावस्तु (plot summary)** — they write "कवि ने बताया कि रास्ता कठिन था पर वह चलता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव (Central Idea) कविता का वह सार्वभौमिक सत्य या मूल भावना है जो कवि अपने संपूर्ण',
                  options: ['मुख्य भाव (Central Idea) कविता का वह सार्वभौमिक सत्य या मूल भावना है जो कवि अपने संपूर्ण', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (बंध) को अलग-अलग पढ़कर उसके', 'काव्य-संरचना कविता के बाहरी ढाँचे (छंद, पद, चरण, मात्रा, गति, यति, विराम) और आंतरिक'],
                  hint: 'Review प्रतीक और बिंब (c10_hin_ks_cbse_12_007) — practice converting each image into an abstract.',
                  misconception: 'Students confuse **मुख्य भाव** with **कथावस्तु (plot summary)** — they write "कवि ने बताया कि रास्ता कठिन था पर वह चलता रहा" (what.' }
          ],
            remediations: { 'students-confuse-with-plot-summary': { steps: ['Give the student two one-paragraph texts: one a *summary* of a film, one a *theme statement* of the same film.', 'Return to the poem: have them highlight every concrete noun (दीप, राह, अंधेरा) and write the *abstract feeling* each.', 'Practice the sentence frame: "The poem makes me feel ______ because it shows ______ (image) doing ______ (action)." 4.', 'Only then ask them to write the मुख्य भाव in one sentence using an abstract noun (आशा, करुणा, विद्रोह, शांति).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_009', difficulty: 'standard',
          question: 'गौण भाव (Subsidiary Theme) वह सहायक भाव है जो काव्य के मुख्य भाव को पुष्ट.',
          hint: 'यदि अटके तो c10_hin_ks_cbse_12_008 (मुख्य भाव और संदेश) और c10_hin_ks_cbse_12_002.',
          misconception: 'छात्र समझते हैं कि \'मुख्य विषय से हटकर जो भी आए, वह विषयांतर है\' — इसलिए वे हर प्रकृति-वर्णन, ऋतु-चित्रण, या पौराणिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव (Subsidiary Theme) वह सहायक भाव है जो काव्य के मुख्य भाव को पुष्ट, स्पष्ट या',
                  options: ['गौण भाव (Subsidiary Theme) वह सहायक भाव है जो काव्य के मुख्य भाव को पुष्ट, स्पष्ट या', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (बंध) को अलग-अलग पढ़कर उसके', 'काव्य-संरचना कविता के बाहरी ढाँचे (छंद, पद, चरण, मात्रा, गति, यति, विराम) और आंतरिक'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_12_008 (मुख्य भाव और संदेश) और c10_hin_ks_cbse_12_002 (पद्यांश-वार.',
                  misconception: 'छात्र समझते हैं कि \'मुख्य विषय से हटकर जो भी आए, वह विषयांतर है\' — इसलिए वे हर प्रकृति-वर्णन, ऋतु-चित्रण, या पौराणिक संदर्भ को विषयांतर मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को एक सरल कविता (जैसे बाल-गीत) दो जिसमें मुख्य भाव स्पष्ट हो और एक सहायक प्रसंग हो — उससे पूछो: "यह प्रसंग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_010', difficulty: 'standard',
          question: 'पदावली का अर्थ है कविता में प्रयुक्त शब्दों का समूह, जिसमें कठिन शब्दों के.',
          hint: 'अगर अटके तो "पाठ 12 — केंद्रीय भाव और रस" (c10_hin_ks_cbse_12_004) दोबारा पढ़ें।',
          misconception: 'छात्र कठिन शब्द का अर्थ शब्दकोश से उठाकर लिख देते हैं (जैसे "ब्रज" = मथुरा जिला) जबकि कविता में "ब्रज" = कृष्ण-लीला.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली का अर्थ है कविता में प्रयुक्त शब्दों का समूह, जिसमें कठिन शब्दों के प्रसंगानुकूल',
                  options: ['पदावली का अर्थ है कविता में प्रयुक्त शब्दों का समूह, जिसमें कठिन शब्दों के प्रसंगानुकूल', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (बंध) को अलग-अलग पढ़कर उसके', 'काव्य-संरचना कविता के बाहरी ढाँचे (छंद, पद, चरण, मात्रा, गति, यति, विराम) और आंतरिक'],
                  hint: 'अगर अटके तो "पाठ 12 — केंद्रीय भाव और रस" (c10_hin_ks_cbse_12_004) दोबारा पढ़ें।',
                  misconception: 'छात्र कठिन शब्द का अर्थ शब्दकोश से उठाकर लिख देते हैं (जैसे "ब्रज" = मथुरा जिला) जबकि कविता में "ब्रज" = कृष्ण-लीला स्थली, प्रेम-भक्ति का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: कविता की उस पंक्ति को दोबारा पढ़ें जहां शब्द आया है। चरण 2: पूछें — "कवि यहाँ क्या भाव व्यक्त करना चाहता है?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है कविता में प्रयुक्त शब्दों की प्रकृति (तत्सम.',
          hint: 'यदि अटके तो **c10_hin_ks_cbse_12_006 (अलंकार)** और **कक्षा 9 व्याकरण: शब्द-भेद** को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "भाषा-प्रयोग" प्रश्न का उत्तर देने के लिए केवल **अलंकारों के नाम** लिखने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है कविता में प्रयुक्त शब्दों की प्रकृति (तत्सम, तद्भव, देशज,',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है कविता में प्रयुक्त शब्दों की प्रकृति (तत्सम, तद्भव, देशज,', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (बंध) को अलग-अलग पढ़कर उसके', 'काव्य-संरचना कविता के बाहरी ढाँचे (छंद, पद, चरण, मात्रा, गति, यति, विराम) और आंतरिक'],
                  hint: 'यदि अटके तो **c10_hin_ks_cbse_12_006 (अलंकार)** और **कक्षा 9 व्याकरण: शब्द-भेद** को दोहराएँ — विशेष.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "भाषा-प्रयोग" प्रश्न का उत्तर देने के लिए केवल **अलंकारों के नाम** लिखने पर्याप्त हैं (जैसे: "यहाँ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुन: पढ़ाई (Re-learn):** छात्र से कहें — "किसी भी पद्यांश के 3 शब्द चुनो और प्रत्येक के लिए लिखो: (क) शब्द का प्रकार.', '(ग) अगर समानार्थी दूसरा शब्द रख दें तो प्रभाव कैसे बदलेगा?" 2.', '**तुलना अभ्यास:** दो समानार्थी पंक्तियाँ दें (जैसे: "वह रोया" बनाम "अश्रु ढुलके") और पूछें: "दूसरी पंक्ति काव्यात्मक.', '**मॉडल उत्तर दिखाएँ:** बोर्ड के टॉपर उत्तर की फोटोकॉपी दें जहाँ \'पद-चयन → प्रभाव\' तीर (→) से दिखाया गया हो; छात्र को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न (Objective Questions)** test direct factual recall.',
          hint: 'If stuck, review **c10_hin_ks_cbse_12_002 (पद्यांश-वार भावार्थ)** to ensure.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आशय-सूचक प्रश्न" का उत्तर देने के लिए उन्हें कविता का **सारांश (Summary)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न (Objective Questions)** test direct factual recall or explicit',
                  options: ['**वस्तुनिष्ठ प्रश्न (Objective Questions)** test direct factual recall or explicit', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (बंध) को अलग-अलग पढ़कर उसके', 'काव्य-संरचना कविता के बाहरी ढाँचे (छंद, पद, चरण, मात्रा, गति, यति, विराम) और आंतरिक'],
                  hint: 'If stuck, review **c10_hin_ks_cbse_12_002 (पद्यांश-वार भावार्थ)** to ensure stanza-by-stanza.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आशय-सूचक प्रश्न" का उत्तर देने के लिए उन्हें कविता का **सारांश (Summary)** लिखना होता है या.' }
          ],
            remediations: { 'summary': { steps: ['**चरणबद्ध उपचार:** 1) **पहचान अभ्यास:** छात्र को 5 मिश्रित प्रश्न दें (वस्तुनिष्ठ + आशय-सूचक)। उससे कहें: "प्रश्न में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
