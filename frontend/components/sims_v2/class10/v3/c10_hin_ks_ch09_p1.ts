import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch09_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch09_p1',
    title: 'पाठ 9 · Part 1/3',
    subtitle: 'यह नोड केवल कवि के जीवन-परिचय, रचनाकाल, साहित्यिक प्रवृत्ति और प्रमुख रचनाओं के परिचय तक.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 9 · Part 1/3',
    chapters: ['c10_hin_ks_ch09'],
    nodeIds: ['c10_hin_ks_cbse_09_001', 'c10_hin_ks_cbse_09_002', 'c10_hin_ks_cbse_09_003', 'c10_hin_ks_cbse_09_004', 'c10_hin_ks_cbse_09_005', 'c10_hin_ks_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना करें कि आप अपने प्रिय गायक का इंटरव्यू देख रहे हैं और वह बताता है कि उसका सुपरहिट गाना दरअसल उसकी माँ.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक प्रवृत्ति और व्यक्तिगत अनुभवों का संक्षिप्त विवेचन जिससे कविता के भाव, भाषा और शिल्प को गहराई से समझा जा सके।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — कवि', 'पाठ 9 — पद्यांश-वार', 'पाठ 9 — काव्य-संरचना', 'पाठ 9 — केंद्रीय', 'पाठ 9 — छंद', 'पाठ 9 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 1/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ.', answer: '9 -', options: ['9 -', '9 - -', '9 -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — काव्य‑संरचना का अर्थ है कविता के रूप के तत्व — stanza, rhyme scheme (यजमानी) और meter.', answer: '9 - -', options: ['9 - -', '9 -', '9 -'] },
            { id: 's3', label: '9 -', prompt: 'Which idea is this? — छंद कविता की metrिक संरचना है जिसमें प्रत्येक पंक्ति में अक्षरों की निश्चित गिनती और.', answer: '9 -', options: ['9 -', '9 -', '9 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश.',
          hint: 'अगर अटका हुआ महसूस हो तो कक्षा 9 की \'हिंदी साहित्य का इतिहास\' अध्याय (छायावाद, प्रगतिवाद.',
          misconception: 'छात्र समझते हैं कि \'कवि परिचय\' का अर्थ है विकिपीडिया-शैली का जीवन-परिचय रट लेना (जन्म, मृत्यु, शिक्षा, पुरस्कार)। बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व', 'केंद्रीय भाव कविता के माध्यम से दोहराया जाने वाला मुख्य विचार या भाव है (जैसे sacrifice,'],
                  hint: 'अगर अटका हुआ महसूस हो तो कक्षा 9 की \'हिंदी साहित्य का इतिहास\' अध्याय (छायावाद, प्रगतिवाद, नई कविता).',
                  misconception: 'छात्र समझते हैं कि \'कवि परिचय\' का अर्थ है विकिपीडिया-शैली का जीवन-परिचय रट लेना (जन्म, मृत्यु, शिक्षा, पुरस्कार)। बोर्ड परीक्षा में पूछा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "कवि के जीवन की तीन घटनाएँ चुनो जो तुम्हें सबसे मार्मिक लगें।" चरण 2: कविता की उन पंक्तियों को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग.',
          hint: 'यदि भावार्थ समझने में कठिनाई हो तो c10_hin_ks_cbse_09_001 (कवि परिचय और पृष्ठभूमि) नोड का.',
          misconception: 'छात्र अक्सर मानते हैं कि पद्यांश-वार भावार्थ का अर्थ केवल प्रत्येक stanza की पहली या अंतिम पंक्ति का अर्थ निकालना है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व', 'केंद्रीय भाव कविता के माध्यम से दोहराया जाने वाला मुख्य विचार या भाव है (जैसे sacrifice,'],
                  hint: 'यदि भावार्थ समझने में कठिनाई हो तो c10_hin_ks_cbse_09_001 (कवि परिचय और पृष्ठभूमि) नोड का पुनः.',
                  misconception: 'छात्र अक्सर मानते हैं कि पद्यांश-वार भावार्थ का अर्थ केवल प्रत्येक stanza की पहली या अंतिम पंक्ति का अर्थ निकालना है, क्योंकि वे मानते हैं.' }
          ],
            remediations: { 'stanza': { steps: ['छात्र को दिखाइए कि किसी stanza की सभी पंक्तियों को एक तालिका में लिखिए और प्रत्येक पंक्ति के प्रमुख शब्द या चित्र को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_003', difficulty: 'standard',
          question: 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व — stanza, rhyme scheme (यजमानी) और.',
          hint: 'यदि छात्र stanza विभाजन में उलझ जाए तो उसे c10_hin_ks_cbse_09_002 (पद्यांश‑वार भावार्थ).',
          misconception: 'छात्र अक्सर rhyme scheme और meter को एक ही मानते हैं, सोचते हैं कि यदि पंक्तियों में समान अंत ध्वनि है तो meter भी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व',
                  options: ['काव्य‑संरचना का अर्थ है कविता के रूप के तत्व', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'केंद्रीय भाव कविता के माध्यम से दोहराया जाने वाला मुख्य विचार या भाव है (जैसे sacrifice,'],
                  hint: 'यदि छात्र stanza विभाजन में उलझ जाए तो उसे c10_hin_ks_cbse_09_002 (पद्यांश‑वार भावार्थ) की पुनः.',
                  misconception: 'छात्र अक्सर rhyme scheme और meter को एक ही मानते हैं, सोचते हैं कि यदि पंक्तियों में समान अंत ध्वनि है तो meter भी अवश्य समान होगा। उदाहरण.' }
          ],
            remediations: { 'rhyme-scheme-meter': { steps: ['छात्र को दो पंक्तियाँ दीजिए जिनके अंत वाले शब्द समान ध्वनि रखते हैं पर मात्राएँ अलग हों — जैसे पहली पंक्ति का अंत शब्द.', '(उत्तर: दोनों में \'अय\')। फिर मात्राएँ गिनने को कहें और बताएँ कि meter में अंतर क्यों आता है, इससे स्पष्ट हो जाएगा कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_004', difficulty: 'standard',
          question: 'केंद्रीय भाव कविता के माध्यम से दोहराया जाने वाला मुख्य विचार या भाव है (जैसे.',
          hint: 'यदि केंद्रीय भाव की पहचान में कठिनाई हो तो पाठ 9 के नोड 002 (पद्यांश-वार भावार्थ) पर वापस.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कविता में दर्द या दुःख का जिक्र है तो वह हमेशा करुण रस ही उत्पन्न करेगा, बिना देखे कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव कविता के माध्यम से दोहराया जाने वाला मुख्य विचार या भाव है (जैसे sacrifice,',
                  options: ['केंद्रीय भाव कविता के माध्यम से दोहराया जाने वाला मुख्य विचार या भाव है (जैसे sacrifice,', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'यदि केंद्रीय भाव की पहचान में कठिनाई हो तो पाठ 9 के नोड 002 (पद्यांश-वार भावार्थ) पर वापस जाएं और.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कविता में दर्द या दुःख का जिक्र है तो वह हमेशा करुण रस ही उत्पन्न करेगा, बिना देखे कि presentation कैसी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो समान शब्दों वाले पद्यांश दीजिए लेकिन不同 presentation के साथ (जैसे एक में " रोना " और दूसरे में " sorriso.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_005', difficulty: 'standard',
          question: 'छंद कविता की metrिक संरचना है जिसमें प्रत्येक पंक्ति में अक्षरों की निश्चित.',
          hint: 'यदि फंसे तो Pada की अवधारणा और अक्षर मात्रा की गिनती (c10_hin_ks_cbse_09_003) पर वापस.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि दो पंक्तियों में अंतिम शब्द तुकबंदी करते हैं (जैसे "घर" और "दर"), तो वे एक ही छंद में हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता की metrिक संरचना है जिसमें प्रत्येक पंक्ति में अक्षरों की निश्चित गिनती और',
                  options: ['छंद कविता की metrिक संरचना है जिसमें प्रत्येक पंक्ति में अक्षरों की निश्चित गिनती और', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'यदि फंसे तो Pada की अवधारणा और अक्षर मात्रा की गिनती (c10_hin_ks_cbse_09_003) पर वापस जाएँ।',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि दो पंक्तियों में अंतिम शब्द तुकबंदी करते हैं (जैसे "घर" और "दर"), तो वे एक ही छंद में हैं। यह गलती इसलिए होती.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो पंक्तियाँ दें जिनमें अंतिम शब्द तुकबंदी करते हैं लेकिन मात्रा अलग हो (जैसे "राम आया है forest में" और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_006', difficulty: 'standard',
          question: 'अलंकार वह रचनात्मक युक्ति है जिसमें शब्द, अर्थ या ध्वनि के वैशिष्ट्य से काव्य.',
          hint: 'यदि अटके तो **कक्षा 9 की हिंदी व्याकरण पुस्तक के \'अलंकार\' अध्याय** के परिभाषा-उदाहरण.',
          misconception: '**विशिष्ट भ्रम:** छात्र **"यमक" और "श्लेष" को एक ही समझते हैं** क्योंकि दोनों में \'एक शब्द, दो अर्थ\' लगता है। **सटीक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वह रचनात्मक युक्ति है जिसमें शब्द, अर्थ या ध्वनि के वैशिष्ट्य से काव्य की शोभा',
                  options: ['अलंकार वह रचनात्मक युक्ति है जिसमें शब्द, अर्थ या ध्वनि के वैशिष्ट्य से काव्य की शोभा', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'यदि अटके तो **कक्षा 9 की हिंदी व्याकरण पुस्तक के \'अलंकार\' अध्याय** के परिभाषा-उदाहरण दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **"यमक" और "श्लेष" को एक ही समझते हैं** क्योंकि दोनों में \'एक शब्द, दो अर्थ\' लगता है। **सटीक अंतर:** - **यमक:** एक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को दो पंक्तियाँ दो — एक यमक वाली, एक श्लेष वाली। 2.', '**चरण 2:** पूछो: "कितनी बार शब्द लिखा है?" — यमक में **दो बार**, श्लेष में **एक बार**। 3.', '**चरण 3:** कहो: "यमक = **दोहराव** (रिपीट), श्लेष = **द्विअर्थी** (डबल मीनिंग इन वन वर्ड)" — यह सूत्र याद कराओ। 4.', '**चरण 4:** पाठ की साखियों से 2-2 उदाहरण ढूँढ़ने को दो — अभ्यास से भ्रम टूटेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
