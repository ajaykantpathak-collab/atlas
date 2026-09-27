import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch11_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch11_p1',
    title: 'पाठ 11 · Part 1/3',
    subtitle: 'Walk through a remembered home that slowly relocates inside the speaker.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 11 · Part 1/3',
    chapters: ['c11_hin_ar_ch11'],
    nodeIds: ['c11_hin_ar_cbse_11_001', 'c11_hin_ar_cbse_11_002', 'c11_hin_ar_cbse_11_003', 'c11_hin_ar_cbse_11_004', 'c11_hin_ar_cbse_11_005', 'c11_hin_ar_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emigrant reconstructing a childhood home from memory', intro: 'A poet of the masses looks back at a mud-walled house — and finds the building was never the point.', goal: 'Analyse the poem\'s refrain-anchored structure and its movement from place to person to identity.' },
    discovery: {
        question: 'Bachchan\'s \'घर की याद\' keeps returning to the same refrain — is the repetition just decoration?',
        options: ['No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker', 'Yes — it\'s a leftover from oral tradition', 'Yes — poets repeat lines to fill stanzas', 'No — the refrain changes meaning each time, so it\'s three different lines'],
        answer: 'No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker',
        hook: 'The poem moves house → people → self: first walls and courtyards, then a father\'s voice and a mother\'s cooking, then the realization the home now lives inside the speaker.',
    },
    teaching: [
        { title: 'पाठ 11 — पृष्ठभूमि और रचनाकार परिचय', text: '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक परिस्थितियों का समुच्चय है, जबकि **रचनाकार परिचय** लेखक के जीवन-वृत्त, साहित्यिक यात्रा, वैचारिक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split the poem into its three phases — physical house, human presence, internal landscape — and test what the circular ending gains.',
        labels: ['पाठ 11 — पृष्ठभूमि', 'पाठ 11 — कथानक', 'पाठ 11 — पाठ्य-परिवेश', 'पाठ 11 — पात्र-चित्रण', 'पाठ 11 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 1/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — **कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s.', answer: '11 -', options: ['11 -', '11 -'] },
            { id: 's2', label: '11 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि.', answer: '11 -', options: ['11 -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a poetry recital rehearsal, a classmate prepares Bachchan\'s \'Ghar ki Yaad\' and announces: \'It\'s a descriptive poem — the poet lists the walls, rooms and courtyard of his old house. I\'ll read it flat, like an estate agent\'s inventory.\'',
            decisions: [{ prompt: 'What should the performance convey instead?', options: [
                { text: 'Rebuild the reading around the arc: the poem moves from physical description to emotional memory — the father\'s voice, the mother\'s silence, the joint family — to philosophical reflection; the \'events\' are mental acts: remembering, comparing, realising. The refrain isn\'t decoration but the anchor pulling wandering memory back to the core truth: home is not a building but a living presence within the speaker.', outcome: 'The recital shifts register: the house outside becomes the house inside — a consciousness-driven journey, not an inventory.' },
                { text: 'Keep the flat reading — it IS a list of rooms and walls; honesty over drama.', outcome: 'Description is the entry, not the destination: the poem\'s structure carries the speaker from architecture to identity — flat reading strands it at the door.', reveals: 'poem-is-house-inventory' },
                { text: 'Add dramatic events instead — act out family scenes so the audience \'sees\' a plot.', outcome: 'Staging external scenes invents what the poem deliberately does internally: the structure is a memory-journey anchored by refrain, not a family drama.', reveals: 'invent-events-for-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'The house that \'stood silent\' in stanza one ends \'living in me\' — the same line, transformed by twelve stanzas of remembering.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_001', difficulty: 'standard',
          question: '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 10 हिंदी (आरोह/कृतिका) के \'साहित्य और समाज\' तथा \'पाठ के.',
          misconception: '**विशिष्ट भ्रांति:** *"पृष्ठभूमि और रचनाकार परिचय परीक्षा में \'एक-दो अंक के वस्तुनिष्ठ प्रश्न\' के लिए ही पढ़ने होते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं',
                  options: ['**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 10 हिंदी (आरोह/कृतिका) के \'साहित्य और समाज\' तथा \'पाठ के बहुआयामी.',
                  misconception: '**विशिष्ट भ्रांति:** *"पृष्ठभूमि और रचनाकार परिचय परीक्षा में \'एक-दो अंक के वस्तुनिष्ठ प्रश्न\' के लिए ही पढ़ने होते हैं; दीर्घउत्तरीय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — निदान:** छात्र से पूछें: *"पाठ 11 में जो सबसे मार्मिक प्रसंग लगा, वह रचनाकार के किस अनुभव से जुड़ता है?"* यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_002', difficulty: 'standard',
          question: '**कथानक (Plot)** is the causal and logical sequence of events that constitute.',
          hint: 'If stuck, review: "घटनाओं का कालानुक्रमिक क्रम (chronological sequence) बनाएं — यही कथानक.',
          misconception: '**Specific Error:** Students conflate *plot summary* (कथासार) with *plot analysis* (कथानक विश्लेषण) and treat.',
          parts: [
                { id: 'a', prompt: '\'अपना-अपना भाग्य\' कहानी में भविष्यवक्ता का कथन कहानी के आरंभ में आता है, लेकिन उसकी पूर्ति अंत में होती है। यह कौन-सा आख्यानिक युक्ति (narrative device) है?', answer: 'यह **प्रोलेप्सिस (prolepsis / flashforward)** है',
                  options: ['यह **प्रोलेप्सिस (prolepsis / flashforward)** है', 'कैसे पूरा होगा?', 'यह फ्लैशबैक है'],
                  hint: 'If stuck, review: "घटनाओं का कालानुक्रमिक क्रम (chronological sequence) बनाएं — यही कथानक (fabula).',
                  misconception: '**Specific Error:** Students conflate *plot summary* (कथासार) with *plot analysis* (कथानक विश्लेषण) and treat *narrative structure*.' }
          ],
            remediations: { 'specific-error-students-conflate-plot': { steps: ['**Isolate the confusion:** Give the student two versions of the same micro-story (3 events: A→B→C).', 'Version 1: Linear (A, then B, then C).', 'Version 2: In media res (B, flashback to A, then C).', 'Effect on reader same?" 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र.',
          hint: 'यदि अटका हुआ महसूस हो तो \'पैथेटिक फेलेसी\' (Pathetic Fallacy) और \'सामाजिक यथार्थवाद\'.',
          misconception: 'छात्र प्रायः \'परिवेश\' को स्थैतिक (स्टैटिक) पृष्ठभूमि मानते हैं - जैसे कोई पेंटिंग की फ्रेम - जबकि पाठ 11 में परिवेश.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि',
                  options: ['पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'पैथेटिक फेलेसी\' (Pathetic Fallacy) और \'सामाजिक यथार्थवाद\' (Social.',
                  misconception: 'छात्र प्रायः \'परिवेश\' को स्थैतिक (स्टैटिक) पृष्ठभूमि मानते हैं - जैसे कोई पेंटिंग की फ्रेम - जबकि पाठ 11 में परिवेश गतिशील (डायनामिक) है.' }
          ],
            remediations: { '11': { steps: ['चरण 1: छात्र से कहें कि पाठ 11 के किसी एक पृष्ठ को पढ़कर केवल संज्ञा (संज्ञा/सर्वनाम) घेरे जो स्थान, समय, मौसम, सामाजिक.', 'नीला हरे को कैसे?\' चरण 4: एक वाक्य में लिखवाएँ: \'भौतिक X ने सामाजिक Y को बाध्य किया जिससे भावनात्मक Z उत्पन्न हुआ।\' यह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_11_002 (कथानक और आख्यान-संरचना)** के \'टर्निंग.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि पात्र-चित्रण = पात्र के गुणों की **वर्णमाला क्रम में सूची** (alphabetical list.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_11_002 (कथानक और आख्यान-संरचना)** के \'टर्निंग पॉइंट्स\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि पात्र-चित्रण = पात्र के गुणों की **वर्णमाला क्रम में सूची** (alphabetical list of traits).' }
          ],
            remediations: { 'alphabetical-list-of-traits-1': { steps: ['**पाठ को \'पात्र-लेंस\' (character lens) से पुनः पढ़ें:** नायक के हर संवाद/क्रिया के आगे लिखें — "यह उसके *कौन-से* गुण को.', '**\'विरोधाभास तालिका\' (Contradiction Table) बनाएँ:** दो कॉलम — "बाहरी व्यवहार" और "आंतरिक वास्तविकता"। हर प्रमुख दृश्य.', '**एक गुण को \'माइक्रोस्कोप\' के नीचे रखें:** केवल एक गुण (जैसे: न्यायप्रियता) लें और पाठ में उसके **तीन रूप** खोजें — (क).', '**बोर्ड उत्तर-लेखन ढाँचा (PEEL) का अभ्यास:** Point → Evidence (उद्धरण) → Explanation (विश्लेषण) → Link (कथानक/विषय से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के समानांतर या उसके.',
          hint: 'यदि अटके तो **नोड 004 (नायक-चित्रण)** के \'आंतरिक द्वंद्व\' और \'चरित्र-चाप\' खंड को दोहराएँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्र को **\'कथानक-उपकरण मात्र\' (mere plot device)** मानते हैं — जैसे कोई संदेशवाहक, कोई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के समानांतर या उसके सहयोग/विरोध में',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के समानांतर या उसके सहयोग/विरोध में', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'यदि अटके तो **नोड 004 (नायक-चित्रण)** के \'आंतरिक द्वंद्व\' और \'चरित्र-चाप\' खंड को दोहराएँ — सहायक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्र को **\'कथानक-उपकरण मात्र\' (mere plot device)** मानते हैं — जैसे कोई संदेशवाहक, कोई सहायक जो केवल सूचना.' }
          ],
            remediations: { 'mere-plot-device': { steps: ['**पुनर्प्रश्नण:** "क्या यह पात्र नायक के बिना भी एक स्वतंत्र कहानी का पात्र हो सकता था?" — यदि हाँ, तो उसके स्वतंत्र.', '**पाठ-मानचित्रण (Text Mapping):** पाठ में उस पात्र के **केवल** संवाद/कृत्य छाँटें — नायक के साथ नहीं, अकेले में। पूछें.', '**तुलनात्मक चार्ट:** दो कॉलम बनाएँ — बायाँ: "नायक के सापेक्ष कार्य", दायाँ: "स्वतंत्र अस्तित्व के प्रमाण"। खाली दायाँ.', '**लघु-लेखन:** उस पात्र की दृष्टि से एक डायरी-प्रविष्टि लिखवाएँ जहाँ नायक का उल्लेख न हो। इससे **आंतरिकता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_006', difficulty: 'standard',
          question: '**मुख्य विषय (Main Theme)** is the central, universal idea or insight about.',
          hint: 'If stuck, review **\'turning point identification\'** in plot structure.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि \'मुख्य विषय\' पाठ में **सबसे अधिक बार आने वाला शब्द या प्रसंग** होता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Main Theme)** is the central, universal idea or insight about human life,',
                  options: ['**मुख्य विषय (Main Theme)** is the central, universal idea or insight about human life,', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'If stuck, review **\'turning point identification\'** in plot structure (c11_hin_ar_cbse_11_002) and.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि \'मुख्य विषय\' पाठ में **सबसे अधिक बार आने वाला शब्द या प्रसंग** होता है (जैसे: यदि \'गरीबी\' शब्द.' }
          ],
            remediations: { '10-subject-matter': { steps: ['**चरण 1 — विषयवस्तु vs विषय का भेद स्पष्ट करें:** छात्र को पाठ 11 के 5 प्रमुख कीवर्ड (जैसे: अन्याय, साहस, चुप्पी.', '**चरण 2 — \'क्यों\' की श्रृंखला चलाएँ:** नायक के हर बड़े फैसले पर पूछें "उसने ऐसा *क्यों* किया?" — 3-4 \'क्यों\' के बाद जो.', '**चरण 3 — संदेश का लिटमस टेस्ट:** पूछें: "यदि लेखक आज जीवित होते और आपसे मिलते, तो वे आपसे *एक* बात क्या कहने को कहते?".', '**चरण 4 — बोर्ड उत्तर लेखन अभ्यास:** उपरोक्त तीनों चरणों के निष्कर्षों को **PEEL संरचना** (Point, Evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
