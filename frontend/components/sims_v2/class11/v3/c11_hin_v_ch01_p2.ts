import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch01_p2: SimDef = {
    id: 'v3_c11_hin_v_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'Watch theatre\'s grammar shift from the spoken word to the seen image.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c11_hin_v_ch01'],
    nodeIds: ['c11_hin_v_cbse_01_007', 'c11_hin_v_cbse_01_008', 'c11_hin_v_cbse_01_009', 'c11_hin_v_cbse_01_010', 'c11_hin_v_cbse_01_011', 'c11_hin_v_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theatre-goer learning to watch with new eyes', intro: 'Before the curtain: a voice from a machine, no face attached — Agyeya builds his whole argument about modern theatre from that disembodied sound.', goal: 'Distinguish literary and visual drama and analyse the essay\'s experiential-to-theoretical arc.' },
    discovery: {
        question: 'A play\'s power used to live in its words — then cinema made sound, light and silence do the talking. Did audiences\' eyes actually change?',
        options: ['Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted', 'No — an audience is an audience, whatever the medium', 'No — only critics changed, not viewers', 'Yes — but only because tickets got cheaper'],
        answer: 'Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted',
        hook: 'Agyeya opens by hearing a gramophone before seeing anything — a miniature of his thesis: modern theatre detached sound from sight and rewired the senses.',
    },
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: 'गौण विषय वह विचार या भावना है जो पाठ के मुख्य विषय को स्पष्ट, गहरा या विविध पहलुओं से समृद्ध बनाता है, लेकिन मुख्य विषय का स्थान नहीं लेता; यह मुख्य धारा को किनारे से मजबूत करता है, जैसे नदी की मुख्य.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split classical Sanskrit, Parsi-folk and Mohan Rakesh\'s realism into their governing principles, then judge whether word-dominant and visual-dominant theatre can even be compared.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_v_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 2/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा अपनी अभिव्यक्ति को प्रभावी, सटीक और.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न (Objective Questions):** पाठ में स्पष्टतः लिखित तथ्यों, घटनाओं.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your theatre club is adapting a stage play into a short film. A member says: \'Just film the play — theatre is literature, cinema is just literature with a camera. Agyeya\'s essay on Mohan Rakesh is basically a biography of a playwright.\'',
            decisions: [{ prompt: 'What does Agyeya\'s argument actually say?', options: [
                { text: 'Explain the grammar shift: the essay is a manifesto for रंगमंचीय/चित्रकाव्य as an independent art — a move from शब्द-प्रधान (word-dominant) to दृश्य-श्रव्य-प्रधान (audio-visual dominant) theatre. Silence, light, sound and pause have their own grammar that literary criticism ignores; Mohan Rakesh is the case study of a playwright who bridged both traditions, not merely the subject of a biography.', outcome: 'The adaptation rethink begins: film isn\'t filmed literature — it tells through image and sound, which is precisely the epistemological shift the essay maps.' },
                { text: 'Film the play as written — if the script is strong, the medium doesn\'t matter.', outcome: 'That\'s exactly the assumption the essay dismantles: visual drama has its own aesthetics; a pause on stage and a cut on screen do different work.', reveals: 'film-is-filmed-theatre' },
                { text: 'Treat the essay as Rakesh\'s life story — mine it for biographical details about the playwright.', outcome: 'Rakesh is the evidence, not the argument: the essay is about a shift in theatrical grammar, not a personality profile.', reveals: 'essay-is-playwright-biography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'Comparing classical and cinematic theatre is like comparing poetry to architecture — different substances, different rules, different eyes.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_007', difficulty: 'standard',
          question: 'गौण विषय वह विचार या भावना है जो पाठ के मुख्य विषय को स्पष्ट, गहरा या विविध.',
          hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो तो नोड c11_hin_v_cbse_01_006 की सामग्री पुनःレビュー.',
          misconception: 'छात्र अक्सर गौण विषय को मुख्य विषय का समानार्थी या दोहराव मान लेते हैं, जैसे यदि मुख्य विषय "समाज में बदलाव की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वह विचार या भावना है जो पाठ के मुख्य विषय को स्पष्ट, गहरा या विविध पहलुओं से',
                  options: ['गौण विषय वह विचार या भावना है जो पाठ के मुख्य विषय को स्पष्ट, गहरा या विविध पहलुओं से', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो तो नोड c11_hin_v_cbse_01_006 की सामग्री पुनःレビュー करें—वहाँ.',
                  misconception: 'छात्र अक्सर गौण विषय को मुख्य विषय का समानार्थी या दोहराव मान लेते हैं, जैसे यदि मुख्य विषय "समाज में बदलाव की आवश्यकता" है तो वे किसी भी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो रंग के हाइलाइटर दें—एक मुख्य विषय के लिए (जैसे पीला) और दूसर संभावित गौण विषय के लिए (जैसे नीला)। फिर उनसे.', 'क्यों?" इस अभ्यास से वे सतही मिलान से कार्यात्मक विश्लेषण की ओर बढ़ते हैं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** लेखक द्वारा शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_v_cbse_01_002 (कथानक संरचना)** के \'चरमोत्कर्ष\' खंड को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'रूपक\' और \'उपमा\' को केवल \'तुलना\' मानकर उनका अंतर \'जैसे/मानो शब्द की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** लेखक द्वारा शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण,',
                  options: ['**बिंब (Imagery)** लेखक द्वारा शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_v_cbse_01_002 (कथानक संरचना)** के \'चरमोत्कर्ष\' खंड को दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'रूपक\' और \'उपमा\' को केवल \'तुलना\' मानकर उनका अंतर \'जैसे/मानो शब्द की उपस्थिति/अनुपस्थिति\' तक सीमित कर.' }
          ],
            remediations: { 'a-is-like-b': { steps: ['**चरण 1:** छात्र को **दो वाक्य दें**: (क) *"जीवन एक संघर्ष है"* (रूपक) और (ख) *"जीवन संघर्ष की तरह है"* (उपमा)। पूछें.', 'दूसरे में क्या रहा?" — जब तक वह न कहे: "पहले में जीवन **संघर्ष बन गया**, दूसरे में जीवन **मनुष्य ही रहा** जो संघर्ष.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्ट्या तर्क-विरुद्ध.',
          hint: 'यदि अटके तो c11_hin_v_cbse_01_008 (बिंब और रूपक) के \'रूपक विश्लेषण चरण\' को दोहराएं: तुलना.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **विरोधाभास (Paradox)** को **विरोधाभास अलंकार / ऑक्सीमोरॉन (Oxymoron)** समझ लेते हैं — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्ट्या तर्क-विरुद्ध, असंगत या',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्ट्या तर्क-विरुद्ध, असंगत या', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि अटके तो c11_hin_v_cbse_01_008 (बिंब और रूपक) के \'रूपक विश्लेषण चरण\' को दोहराएं: तुलना के दो.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **विरोधाभास (Paradox)** को **विरोधाभास अलंकार / ऑक्सीमोरॉन (Oxymoron)** समझ लेते हैं — जैसे "जीवित मृतक", "मधुर.' }
          ],
            remediations: { 'paradox-oxymoron': { steps: ['**चरण 1:** छात्र से कहें: "पाठ से कोई एक वाक्य चुनो जो तुम्हें \'गलत\' लगे पर लेखक ने जानबूझकर लिखा हो।" — यह विरोधाभास.', '**चरण 2:** पूछें: "इस वाक्य के दोनों भागों में कौन-सा यथार्थ छिपा है जो साधारण भाषा में नहीं कहा जा सकता?" — इससे.', '**चरण 3:** प्रतीक के लिए: "कहानी में कोई एक वस्तु बताओ जो 3-4 बार अलग-अलग प्रसंगों में आई हो और हर बार उसका अर्थ गहरा.', '**चरण 4:** छात्र से उस वस्तु के **तीन अर्थ-स्तर** लिखवाएं (शाब्दिक, भावनात्मक, दार्शनिक) — इससे प्रतीक की बहु-स्तरीयता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_010', difficulty: 'standard',
          question: 'मुख्य शब्द वे शब्द हैं जो किसी पाठ के central idea, theme या author के प्रमुख.',
          hint: 'यदि कठिनाई हो तो पहले नोड c11_hin_v_cbse_01_006 (मुख्य विषय और संदेश) की अवधारणा को.',
          misconception: 'छात्र अक्सर यह मानते हैं कि मुख्य शब्द वे होते हैं जो पाठ में सबसे पहले आते हैं या जो सबसे कठिन या असामान्य होते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य शब्द वे शब्द हैं जो किसी पाठ के central idea, theme या author के प्रमुख संदेश को',
                  options: ['मुख्य शब्द वे शब्द हैं जो किसी पाठ के central idea, theme या author के प्रमुख संदेश को', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि कठिनाई हो तो पहले नोड c11_hin_v_cbse_01_006 (मुख्य विषय और संदेश) की अवधारणा को दोबारा समझिए.',
                  misconception: 'छात्र अक्सर यह मानते हैं कि मुख्य शब्द वे होते हैं जो पाठ में सबसे पहले आते हैं या जो सबसे कठिन या असामान्य होते हैं, क्योंकि उनका मानना है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को स्पष्ट रूप से बताइए कि मुख्य शब्द की पहचान करने के लिए शब्द की स्थिति नहीं, बल्कि उसकी आवृत्ति और tematice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा अपनी अभिव्यक्ति को प्रभावी, सटीक और.',
          hint: 'यदि अटके तो **\'शब्द-शक्ति (वाच्यार्थ/लक्ष्यार्थ/व्यंग्यार्थ)\'** की कक्षा 10 की व्याकरण.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'भाषा-प्रयोग\' का अर्थ केवल \'कठिन/तत्सम शब्दों का प्रयोग\' या \'अलंकारों की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा अपनी अभिव्यक्ति को प्रभावी, सटीक और',
                  options: ['पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा अपनी अभिव्यक्ति को प्रभावी, सटीक और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि अटके तो **\'शब्द-शक्ति (वाच्यार्थ/लक्ष्यार्थ/व्यंग्यार्थ)\'** की कक्षा 10 की व्याकरण पुस्तिका.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'भाषा-प्रयोग\' का अर्थ केवल \'कठिन/तत्सम शब्दों का प्रयोग\' या \'अलंकारों की भरमार\'** है। **गलत तर्क:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — शब्द-शक्ति स्पष्ट करो:** छात्र को तीन वाक्य दो: (क) "वह रोया।" (ख) "उसकी आँखें बरस पड़ीं।" (ग) "वह फूट-फूटकर.', '**चरण 2 — \'प्रतिस्थापन परीक्षण\' (Substitution Test) कराओ:** पाठ 1 के किसी वाक्य का **महत्वपूर्ण शब्द** हटाकर.', '**चरण 3 — PEEL ढाँचे में एक उत्तर लिखवाओ:** Point (कौन-सा प्रयोग), Evidence (उद्धरण), Explanation (कैसे प्रभाव बना).', '**चरण 4 — फीडबैक लूप:** जहां Explanation कमजोर हो, वहाँ **\'क्यों?\'** पूछकर **कारण-कार्य श्रृंखला** पूरी कराओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न (Objective Questions):** पाठ में स्पष्टतः लिखित तथ्यों.',
          hint: 'यदि फँसें तो **c11_hin_v_cbse_01_004 (नायक का पात्र-चित्रण)** और **c11_hin_v_cbse_01_010.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **आशय-सूचक प्रश्नों के उत्तर "अनुमान" (guesswork) होते हैं** — "जो मन में आए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न (Objective Questions):** पाठ में स्पष्टतः लिखित तथ्यों, घटनाओं,',
                  options: ['**वस्तुनिष्ठ प्रश्न (Objective Questions):** पाठ में स्पष्टतः लिखित तथ्यों, घटनाओं,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि फँसें तो **c11_hin_v_cbse_01_004 (नायक का पात्र-चित्रण)** और **c11_hin_v_cbse_01_010 (मुख्य.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **आशय-सूचक प्रश्नों के उत्तर "अनुमान" (guesswork) होते हैं** — "जो मन में आए लिख दो, कोई गलत नहीं.' }
          ],
            remediations: { 'guesswork': { steps: ['**चरणबद्ध उपचार (3-4 सत्रों में):** 1.', '**पहचान अभ्यास (15 मिनट):** छात्र को 10 मिश्रित प्रश्न दें — प्रत्येक को **O (वस्तुनिष्ठ)** या **A (आशय-सूचक)** लेबल.', '**प्रमाण-खोज खेल (20 मिनट):** एक आशय-सूचक प्रश्न दें (जैसे: "नायक ने ट्रेन की खिड़की से बाहर देखना क्यों बंद कर.', '**PEEL टेम्पलेट लेखन (15 मिनट):** खाली PEEL शीट दें: Point: ____ | Evidence 1: ____ | Evidence 2: ____ | Explanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
