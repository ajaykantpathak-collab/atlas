import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch08_p2: SimDef = {
    id: 'v3_c6_hin_ch08_p2',
    title: 'पाठ 8 · Part 2/3',
    subtitle: 'This node covers identifying, analyzing, and writing about sub-themes (गौण विषय) in the.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 8 · Part 2/3',
    chapters: ['c6_hin_ch08'],
    nodeIds: ['c6_hin_cbse_08_007', 'c6_hin_cbse_08_008', 'c6_hin_cbse_08_009', 'c6_hin_cbse_08_010', 'c6_hin_cbse_08_011', 'c6_hin_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Think of your favorite TV serial — the main story might be a family dispute, but you also notice how **women.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — गौण विषय', text: 'गौण विषय (Sub-theme) is a secondary idea or message in a literary text that runs parallel to the main theme, enriches it, and often explores a specific aspect of human experience, society, or emotion.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — गौण', 'पाठ 8 — साहित्यिक', 'पाठ 8 — पदावली', 'पाठ 8 — व्याकरण', 'पाठ 8 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_hin_cbse_08_010', title: 'पाठ 8 — पदावली: मुख्य शब्द',
          caseStudy: { intro: 'Have you ever heard a friend say "I\'m fine" but their voice told you they were actually sad?',
            decisions: [{ prompt: 'पाठ 8 में \'पदावली: मुख्य शब्द\' किसे कहते हैं? एक वाक्य में परिभाषा दीजिए।', options: [
                { text: '**Correct Answer:** वे शब्द जो पाठ के मुख्य विषय, भाव या सांस्कृतिक संदर्भ को व्यक्त करने', outcome: '**Correct Answer:** वे शब्द जो पाठ के मुख्य विषय, भाव या सांस्कृतिक संदर्भ को व्यक्त करने के लिए.' },
                { text: 'difficult words', outcome: 'Not quite — Students believe **मुख्य शब्द = कठिन शब्द (difficult words)** or **नए शब्द (new words)**.', reveals: 'difficult-words-or-new-words' },
                { text: 'new words', outcome: 'Not quite — Students believe **मुख्य शब्द = कठिन शब्द (difficult words)** or **नए शब्द (new words)**.', reveals: 'difficult-words-or-new-words' }
            ] }] } },
        { type: 'case', nodeId: 'c6_hin_cbse_08_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) is a secondary idea or message in a literary text that.',
          hint: 'Review **c6_hin_cbse_08_006 (मुख्य विषय और संदेश)** — practice writing the main theme + 3.',
          misconception: 'Students often confuse **\'गौण विषय\' (sub-theme)** with **\'सहायक पात्र\' (supporting character)** or **\'गौण घटना\' (minor.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) is a secondary idea or message in a literary text that runs parallel',
                  options: ['गौण विषय (Sub-theme) is a secondary idea or message in a literary text that runs parallel', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'Review **c6_hin_cbse_08_006 (मुख्य विषय और संदेश)** — practice writing the main theme + 3 evidences.',
                  misconception: 'Students often confuse **\'गौण विषय\' (sub-theme)** with **\'सहायक पात्र\' (supporting character)** or **\'गौण घटना\' (minor event)**.' }
          ],
            remediations: { 'students-often-confuse-sub-theme': { steps: ['**Clarify vocabulary:** Write on board: **विषय = विचार (Idea)**, **घटना = घटना (Event)**, **पात्र = व्यक्ति (Person)**.', 'Give 3 quick examples: "ईमानदारी" (विषय), "राम ने सच बोला" (घटना), "राम" (पात्र).', '**Pattern hunt:** Give a 5-sentence micro-story.', 'Ask: "Which *idea* appears 2+ times?" Mark it in color.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** is the use of descriptive language that appeals to the five.',
          hint: 'If stuck, review **शाब्दिक vs लाक्षणिक अर्थ (Literal vs Figurative meaning)** using.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **"किसी भी तुलना में \'जैसे/सा\' शब्द न हो, तो वह रूपक है।"** इससे वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** is the use of descriptive language that appeals to the five senses',
                  options: ['**बिंब (Imagery)** is the use of descriptive language that appeals to the five senses', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'If stuck, review **शाब्दिक vs लाक्षणिक अर्थ (Literal vs Figurative meaning)** using simple.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **"किसी भी तुलना में \'जैसे/सा\' शब्द न हो, तो वह रूपक है।"** इससे वे **सादृश्य (Analogy)**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (संरचना स्पष्ट करें):** छात्र को दो वाक्य दें: "वह सिंह **जैसा** बहादुर है" (उपमा) और "वह **सिंह** है" (रूपक)।.', 'तो कवि क्या कह रहा है?" — इससे \'शाब्दिक अर्थ\' और \'लाक्षणिक अर्थ\' का भेद खुलेगा। 2.', '**चरण 2 (उपमान-उपमेय तालिका बनवाएं):** 5 वाक्य दें (मिश्रित: उपमा, रूपक, विशेषण)। छात्र से तीन कॉलम भरवाएं: उपमेय.', '**चरण 3 (बिंब से जोड़ें):** रूपक वाले वाक्य में पूछें: "सिंह शब्द से कौन-सा बिंब जगता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_009', difficulty: 'standard',
          question: '**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी बातें या विचार.',
          hint: 'यदि अटके: **बिंब/रूपक के 3-4 उदाहरण** दोबारा देखो और पूछो: "यहाँ दो चीज़ों की तुलना हो.',
          misconception: '**सबसे आम गलती:** छात्र **विरोधाभास** और **प्रतीक** को **"अलंकार" (फिगर ऑफ़ स्पीच) का एक ही प्रकार** मान लेते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी बातें या विचार एक साथ',
                  options: ['**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी बातें या विचार एक साथ', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'यदि अटके: **बिंब/रूपक के 3-4 उदाहरण** दोबारा देखो और पूछो: "यहाँ दो चीज़ों की तुलना हो रही है.',
                  misconception: '**सबसे आम गलती:** छात्र **विरोधाभास** और **प्रतीक** को **"अलंकार" (फिगर ऑफ़ स्पीच) का एक ही प्रकार** मान लेते हैं — जैसे "यह रूपक है" या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को दो कॉलम बनाने को कहो: **विरोधाभास** (विचारों का टकराव) और **प्रतीक** (वस्तु → अर्थ)। **चरण 2:** उसे.', '(प्रतीक) या दो विचार आपस में लड़ रहे हैं?', '(विरोधाभास)" — इस **निर्णय-नियम** से भेद स्पष्ट होगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द refers to the curated list of significant words in a text.',
          hint: 'If stuck, review **\'विषय और संदेश\' (c6_hin_cbse_08_006)** to re-anchor the theme, then.',
          misconception: 'Students believe **मुख्य शब्द = कठिन शब्द (difficult words)** or **नए शब्द (new words)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द refers to the curated list of significant words in a text that are',
                  options: ['पदावली: मुख्य शब्द refers to the curated list of significant words in a text that are', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'If stuck, review **\'विषय और संदेश\' (c6_hin_cbse_08_006)** to re-anchor the theme, then practice the.',
                  misconception: 'Students believe **मुख्य शब्द = कठिन शब्द (difficult words)** or **नए शब्द (new words)**.' }
          ],
            remediations: { 'difficult-words-or-new-words': { steps: ['The "Swap Test" (बदल कर देखो)।** छात्र से कहें: "इस शब्द की जगह कोई सरल समानार्थी शब्द रखो। क्या पाठ का भाव बदल गया?', 'Theme Mapping (विषय मानचित्र)।** पाठ का मुख्य विषय (जैसे \'त्याग\') बोर्ड पर लिखें। छात्र से कहें: "ऐसे 3 शब्द ढूंढो जो.', 'Author\'s Chair (लेखक की कुर्सी)।** छात्र से कहें: "तुम लेखक हो। तुमने \'मिट्टी\' क्यों लिखा, \'ज़मीन\' क्यों नहीं?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **मुख्य शब्द = कठिन शब्द (difficult words)** or **नए शब्द (new words)**.',
          parts: [
                { id: 'a', prompt: 'पाठ 8 के विषय (जैसे: संघर्ष, आशा, परंपरा) को ध्यान में रखते हुए, **अपनी ओर से 3 नए \'मुख्य शब्द\' सुझाइए** जो पाठ में नहीं हैं, लेकिन विषय को और गहराई देंगे।.', answer: '**Correct Answer Criteria:** 1',
                  options: ['**Correct Answer Criteria:** 1', '**मुख्य शब्द = कठिन शब्द (difficult words)** or **नए शब्द (new words)**'],
                  hint: 'If stuck, review **\'विषय और संदेश\' (c6_hin_cbse_08_006)** to re-anchor the theme, then practice the.',
                  misconception: 'Students believe **मुख्य शब्द = कठिन शब्द (difficult words)** or **नए शब्द (new words)**.' }
          ],
            remediations: { 'difficult-words-or-new-words': { steps: ['The "Swap Test" (बदल कर देखो)।** छात्र से कहें: "इस शब्द की जगह कोई सरल समानार्थी शब्द रखो। क्या पाठ का भाव बदल गया?', 'Theme Mapping (विषय मानचित्र)।** पाठ का मुख्य विषय (जैसे \'त्याग\') बोर्ड पर लिखें। छात्र से कहें: "ऐसे 3 शब्द ढूंढो जो.', 'Author\'s Chair (लेखक की कुर्सी)।** छात्र से कहें: "तुम लेखक हो। तुमने \'मिट्टी\' क्यों लिखा, \'ज़मीन\' क्यों नहीं?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग का अर्थ है किसी पाठ में शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों.',
          hint: 'यदि अटके तो c6_hin_cbse_08_010 (पदावली) दोहराएँ — विशेषकर मुहावरे/लोकोक्तियों के अर्थ और.',
          misconception: 'छात्र समझते हैं कि **"पाठ में भाषा-प्रयोग" का मतलब है कठिन शब्दों के अर्थ ढूँढ़ना या व्याकरण की गलतियाँ निकालना**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग का अर्थ है किसी पाठ में शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों और शैलीगत',
                  options: ['भाषा-प्रयोग का अर्थ है किसी पाठ में शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों और शैलीगत', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'यदि अटके तो c6_hin_cbse_08_010 (पदावली) दोहराएँ — विशेषकर मुहावरे/लोकोक्तियों के अर्थ और वाक्य-भेद.',
                  misconception: 'छात्र समझते हैं कि **"पाठ में भाषा-प्रयोग" का मतलब है कठिन शब्दों के अर्थ ढूँढ़ना या व्याकरण की गलतियाँ निकालना**। उदाहरण: पाठ में "अवकाश".' }
          ],
            remediations: { 'vocabulary': { steps: ['**पहला कदम:** छात्र से कहो — "पाठ 8 से कोई एक संवाद चुनो जो तुम्हें \'अजीब\' या \'कठिन\' लगा हो।" 2.', '**दूसरा कदम:** पूछो — "यह संवाद कौन बोल रहा है?', 'किस हालत में?" — पात्र, श्रोता, प्रसंग लिखवाओ। 3.', '**तीसरा कदम:** अब वही बात **अपनी भाषा में** (दोस्त से बात करते हुए) बोलने को कहो। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न (Objective Questions)** have a single, factual answer.',
          hint: 'If stuck, review **c6_hin_cbse_08_002 (कथानक)** to clarify event sequence and.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि आशय-सूचक प्रश्न का उत्तर उनकी "व्यक्तिगत राय" या "कल्पना" होता है, क्योंकि "पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न (Objective Questions)** have a single, factual answer directly stated',
                  options: ['**वस्तुनिष्ठ प्रश्न (Objective Questions)** have a single, factual answer directly stated', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'If stuck, review **c6_hin_cbse_08_002 (कथानक)** to clarify event sequence and **c6_hin_cbse_08_006.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि आशय-सूचक प्रश्न का उत्तर उनकी "व्यक्तिगत राय" या "कल्पना" होता है, क्योंकि "पाठ में लिखा तो नहीं है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**"सबूत ढूँढ़ो" खेल खेलें:** एक छोटा अंश दें (जैसे: "मोहन ने टिफिन नहीं खोला। वह चुपचाप बैठा रहा।")। पूछें: "मोहन ने.', '**T-Chart बनवाएँ:** बाएँ कॉलम में **"पाठ में लिखा है (Evidence)"**, दाएँ में **"मेरा निष्कर्ष (Inference)"**। हर.', 'इसलिए" वाक्य फ्रेम दें:** "पाठ में लिखा है ______, **इसलिए** मुझे लगता है ______।" इससे \'साक्ष्य -> निष्कर्ष\' की कड़ी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
