import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch06_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch06_p2',
    title: 'पाठ 6 · Part 2/3',
    subtitle: 'Watch a tuition room become the whole education system in miniature.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 6 · Part 2/3',
    chapters: ['c11_hin_ar_ch06'],
    nodeIds: ['c11_hin_ar_cbse_06_007', 'c11_hin_ar_cbse_06_008', 'c11_hin_ar_cbse_06_009', 'c11_hin_ar_cbse_06_010', 'c11_hin_ar_cbse_06_011', 'c11_hin_ar_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a spectator trapped in one room with the exam machine', intro: 'A mother sweeping, a teacher collecting fees, a student drowning — and a one-act play that won\'t open a window.', goal: 'Analyse the one-act form\'s unity and compression as a critique of tuition culture.' },
    discovery: {
        question: 'Usha Priyamvada\'s one-act play ends with जटुह deciding to start a movement — no tidy solution. Is that a weak ending?',
        options: ['No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself', 'Yes — a play must resolve its conflict', 'Yes — starting a movement solves nothing for the boy', 'No — but only because sequels were planned'],
        answer: 'No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself',
        hook: 'One room, one act, no exits — the form itself is the argument: students and parents have nowhere to step out to.',
    },
    teaching: [
        { title: 'पाठ 6 — गौण विषय', text: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य है जो पाठ के मुख्य विषय के समानांतर चलता है, उसे पूरक बनाता है, विस्तार देता है या उसका विरोधाभास प्रस्तुत कर गहराई उत्पन्न करता है। यह मुख्य विषय से स्वतंत्र.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the entrances and exits as French scenes, place the climax where the tuition teacher confronts the principal, and defend the unresolved close.',
        labels: ['पाठ 6 — गौण', 'पाठ 6 — साहित्यिक', 'पाठ 6 — पदावली', 'पाठ 6 — व्याकरण', 'पाठ 6 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_009', title: 'पाठ 6 — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: 'You’ve just finished reading the chapter and feel the story’s ending left you uneasy — the character who seemed weakest made the strongest choice, and a simple.',
            decisions: [{ prompt: 'पाठ 6 के प्रसंग में \'विरोधाभास\' की परिभाषा लिखिए और बताइए कि यह सामान्य विरोधाभास (logical contradiction) से कैसे भिन्न है।', options: [
                { text: '**Correct Answer:** साहित्यिक विरोधाभास (विरोधाभास अलंकार/युक्ति) वह है जहाँ दो विरोधी', outcome: '**Correct Answer:** साहित्यिक विरोधाभास (विरोधाभास अलंकार/युक्ति) वह है जहाँ दो विरोधी बातें एक साथ.' },
                { text: 'मृत्यु ही जीवन है', outcome: 'Not quite — **Specific Error:** Students identify *any* recurring object as a symbol and *any* surprising turn.', reveals: 'specific-error-students-identify-any' },
                { text: 'यह कथन झूठा है', outcome: 'Not quite — **Specific Error:** Students identify *any* recurring object as a symbol and *any* surprising turn.', reveals: 'specific-error-students-identify-any' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your drama club is rehearsing Usha Priyamvada\'s one-act play about a family fighting over a son\'s tuition fees. The student director plans to \'break it into three scenes for variety\' and end with an uplifting speech where the parents renounce tuition.',
            decisions: [{ prompt: 'Why do both changes betray the play\'s design?', options: [
                { text: 'Hold the form: it\'s a one-act play — a single continuous act where every entrance and exit (French scenes) turns the same screw tighter. Splitting it into \'scenes\' breaks the compression that mirrors the student\'s inescapable pressure. And the happy ending kills the point: the Nayi Kahani one-acter refuses easy solutions, forcing the audience to sit with a system that commodifies childhood.', outcome: 'The production keeps its claustrophobia: one unbroken space, one unbroken pressure — discomfort is the playwright\'s method, not a flaw to fix.' },
                { text: 'Allow the scene breaks — entrances and exits are just like act divisions anyway.', outcome: 'French scenes are character shifts inside one continuous act, not act breaks; treating them as divisions imports a multi-act logic the form deliberately refuses.', reveals: 'french-scenes-are-acts' },
                { text: 'Keep the uplifting finale — audiences prefer resolution, and it gives the play a message.', outcome: 'The resolution would lie: the play\'s power is making the tuition trap felt without an exit — solving it on stage lets the audience off the hook.', reveals: 'happy-ending-improves-it' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'The play compresses everything a novel would spread out — that\'s why the pressure on one student\'s homework feels inescapable.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य है जो पाठ के मुख्य विषय के समानांतर चलता.',
          hint: 'यदि मुख्य विषय स्पष्ट न हो तो नोड 006 (मुख्य विषय और संदेश) पर लौटें — विशेषकर \'मुख्य.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'गौण विषय\' को \'पक्ष कथा\' (sub-plot) समझकर केवल **घटनाओं की सूची** बना देते हैं (जैसे: \'नायिका.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य है जो पाठ के मुख्य विषय के समानांतर चलता है, उसे',
                  options: ['गौण विषय (Sub-theme) वह द्वितीयक कथ्य है जो पाठ के मुख्य विषय के समानांतर चलता है, उसे', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'यदि मुख्य विषय स्पष्ट न हो तो नोड 006 (मुख्य विषय और संदेश) पर लौटें — विशेषकर \'मुख्य विषय कैसे.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'गौण विषय\' को \'पक्ष कथा\' (sub-plot) समझकर केवल **घटनाओं की सूची** बना देते हैं (जैसे: \'नायिका का बीमार पड़ना\'.' }
          ],
            remediations: { 'sub-plot': { steps: ['**अवधारणा स्पष्ट करें:** छात्र से कहें — \'घटना = कैमरे से दिखने वाला दृश्य; गौण विषय = उस दृश्य का अर्थ/संदेश। जैसे.', '**अभ्यास दें:** पाठ 6 के 5 प्रसंग दें; प्रत्येक के लिए पूछें — \'यहाँ क्या हो रहा है?\' (घटना) → \'यह क्या कहना चाहता है?\'.', '**संबंध जोड़ें:** प्रत्येक पहचाने गए गौण विषय के लिए पूछें — \'यह मुख्य विषय को कैसे आगे बढ़ाता है?\' — लिखित में.', '**उत्तर-लेखन ढाँचा दें:** तालिका प्रारूप (गौण विषय | प्रसंग/साक्ष्य | मुख्य विषय से संबंध) में 2 उदाहरण हल करवाएँ। फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** काव्य/गद्य में प्रयुक्त वे शब्द-युग्म या पद जो पाठक की.',
          hint: 'यदि भ्रम हो तो **कक्षा 10 हिंदी व्याकरण (अलंकार अध्याय)** के \'उपमा और रूपक\' खंड को 15.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'बिंब\' को \'चित्रात्मक वर्णन\' (descriptive writing) का पर्याय मान लेते हैं** और समझते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** काव्य/गद्य में प्रयुक्त वे शब्द-युग्म या पद जो पाठक की इंद्रियों',
                  options: ['**बिंब (Imagery):** काव्य/गद्य में प्रयुक्त वे शब्द-युग्म या पद जो पाठक की इंद्रियों', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'यदि भ्रम हो तो **कक्षा 10 हिंदी व्याकरण (अलंकार अध्याय)** के \'उपमा और रूपक\' खंड को 15 मिनट दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'बिंब\' को \'चित्रात्मक वर्णन\' (descriptive writing) का पर्याय मान लेते हैं** और समझते हैं कि जहाँ भी विशेषण अधिक.' }
          ],
            remediations: { 'descriptive-writing': { steps: ['**चरणबद्ध सुधार:** (1) छात्र को पाठ 6 से **कोई 5 वाक्य** चुनने को कहें जिनमें विशेषण हों। (2) प्रत्येक वाक्य के लिए.', 'यदि \'सुंधी\' हटा दें तो क्या प्रभाव बदलेगा?" (4) अंत में छात्र से कहें: **"बिंब = इंद्रिय का क्रिया-व्यापार, विशेषण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन.',
          hint: 'If stuck, review **c11_hin_ar_cbse_06_008 (बिंब और रूपक)** — specifically the worked.',
          misconception: '**Specific Error:** Students identify *any* recurring object as a symbol and *any* surprising turn as a paradox.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन या',
                  options: ['**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन या', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_06_008 (बिंब और रूपक)** — specifically the worked example.',
                  misconception: '**Specific Error:** Students identify *any* recurring object as a symbol and *any* surprising turn as a paradox.' }
          ],
            remediations: { 'specific-error-students-identify-any': { steps: ['**Concrete → Abstract Drill:** Pick a concrete object from the student’s room (e.g., a cracked phone screen).', 'Ask: "What does it *literally* mean?', 'Now, if this were in a story about \'broken communication\', what could it mean at the start (carelessness)?', 'At the climax (irreparable rift)?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_010', difficulty: 'standard',
          question: 'पदावली के मुख्य शब्द वे विशिष्ट शब्दावली हैं जो पाठ के केंद्रीय विषय, भावभूमि.',
          hint: 'If stuck, review **\'प्रतीक और विरोधाभास\' (node 009)** — because most मुख्य शब्द in this.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "मुख्य शब्द = पाठ में आए कठिन/अनजान शब्द जिनके अर्थ शब्दकोश से ढूँढ़ने हैं।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के मुख्य शब्द वे विशिष्ट शब्दावली हैं जो पाठ के केंद्रीय विषय, भावभूमि और रचनाकार',
                  options: ['पदावली के मुख्य शब्द वे विशिष्ट शब्दावली हैं जो पाठ के केंद्रीय विषय, भावभूमि और रचनाकार', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'If stuck, review **\'प्रतीक और विरोधाभास\' (node 009)** — because most मुख्य शब्द in this chapter.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "मुख्य शब्द = पाठ में आए कठिन/अनजान शब्द जिनके अर्थ शब्दकोश से ढूँढ़ने हैं।" **क्यों होती है:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें** केवल मुख्य शब्दों को घेरते हुए — अर्थ नहीं, **स्थिति** (position) नोट करें: किस संवाद में?', '**एक शब्द चुनें** (जो सबसे ज्यादा बार आया हो)। उसके **सभी प्रसंग** एक कॉलम में लिखें। दूसरे कॉलम में प्रत्येक प्रसंग का.', '**तीसरे कॉलम में** लिखें: "यह अर्थ पिछले प्रसंग से कैसे अलग/आगे है?" 4.', 'शिक्षक से पूछें: "क्या इस शब्द का अर्थ-परिवर्तन पाठ के **विषय-परिवर्तन** (thematic shift) को दर्शाता है?" — यही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है — रचनाकार द्वारा विषय, प्रसंग, पात्र और भाव के.',
          hint: 'यदि अटके तो \'पदावली: मुख्य शब्द\' (c11_hin_ar_cbse_06_010) दोहराएं और पाठ के 15 शब्दों की.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ है पाठ में आए \'कठिन शब्दों के अर्थ लिखना\' या \'मुहावरों की सूची बनाना\'। वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'यदि अटके तो \'पदावली: मुख्य शब्द\' (c11_hin_ar_cbse_06_010) दोहराएं और पाठ के 15 शब्दों की सूची बनाकर.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ है पाठ में आए \'कठिन शब्दों के अर्थ लिखना\' या \'मुहावरों की सूची बनाना\'। वास्तव में भाषा-प्रयोग का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "पाठ का कोई एक पैराग्राफ चुनो और उसमें आए 5 शब्दों को घेरो जो तुम्हें \'विशेष\' लगते हैं (सामान्य.', 'पढ़कर देखो।" चरण 3: समझाओ — "भाषा-प्रयोग का विश्लेषण = विकल्पों की तुलना + प्रभाव की व्याख्या।" चरण 4: अभ्यास कराओ — एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर पाठ में स्पष्टतः लिखा होता है और.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_06_002 (कथानक संरचना) और c11_hin_ar_cbse_06_006 (मुख्य विषय).',
          misconception: 'छात्रों की सबसे गहरी भ्रांति यह है कि \'आशय-सूचक प्रश्न का उत्तर लंबा लिखने से अंक मिलते हैं\' — इसलिए वे पाठ के बड़े अंश.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर पाठ में स्पष्टतः लिखा होता है और जिसमें एक ही',
                  options: ['वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर पाठ में स्पष्टतः लिखा होता है और जिसमें एक ही', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_06_002 (कथानक संरचना) और c11_hin_ar_cbse_06_006 (मुख्य विषय) को दोहराएँ.',
                  misconception: 'छात्रों की सबसे गहरी भ्रांति यह है कि \'आशय-सूचक प्रश्न का उत्तर लंबा लिखने से अंक मिलते हैं\' — इसलिए वे पाठ के बड़े अंश नकल कर देते हैं या.' }
          ],
            remediations: { 'point-wise-analysis': { steps: ['चरण 1: छात्र को एक छोटा गद्यांश (5-6 वाक्य) दें और कहें: "इसमें से तीन तथ्य निकालो जो कोई भी पढ़कर बता सकता है" — यह.', '\'दुखी\' या \'निराश\' क्यों नहीं?" — यह आशय-सूचक सोच की शुरुआत है। चरण 3: छात्र को दोनों प्रकार के 5-5 प्रश्न बनाने को कहें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
