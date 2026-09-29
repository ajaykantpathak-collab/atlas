import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch09_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch09_p1',
    title: 'पाठ 9 · Part 1/3',
    subtitle: 'Hear a 15th-century weaver dismantle both temple and mosque in one couplet.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 9 · Part 1/3',
    chapters: ['c11_hin_ar_ch09'],
    nodeIds: ['c11_hin_ar_cbse_09_001', 'c11_hin_ar_cbse_09_002', 'c11_hin_ar_cbse_09_003', 'c11_hin_ar_cbse_09_004', 'c11_hin_ar_cbse_09_005', 'c11_hin_ar_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a disciple watching the loom instead of the scripture', intro: 'A Muslim-weaver saint in Kashi, persecuted by priests of both religions — and his whole theology woven into cloth metaphors.', goal: 'Situate Kabir in the Nirguna Bhakti tradition and read his weaver identity as the engine of his imagery.' },
    discovery: {
        question: 'A student writes \'Kabir rejected all religion.\' Accurate?',
        options: ['No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality', 'Yes — he mocked both temple and mosque, so he rejected both faiths', 'Yes — a weaver couldn\'t be religious', 'No — he actually founded a new organised religion'],
        answer: 'No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality',
        hook: '\'Kabir was a weaver\' is not trivia — every metaphor in his verse is a loom: warp, weft, thread, dye, knot. His caste is his poetics.',
    },
    teaching: [
        { title: 'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch Kabir teach disciples by silently weaving an odd pattern, then map why the lesson lands through action instead of explanation.',
        labels: ['पाठ 9 — पृष्ठभूमि', 'पाठ 9 — कथानक', 'पाठ 9 — पाठ्य-परिवेश', 'पाठ 9 — पात्र-चित्रण', 'पाठ 9 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_001', title: 'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 09 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'State the approximate time period, geographical region, and social identity (caste/profession) of Kabir as presented in the NCERT textbook.', options: [
                { text: 'Correct answer: Kabir lived approximately 1398–1518 CE in the region of Kashi (Varanasi),', outcome: 'Correct answer: Kabir lived approximately 1398–1518 CE in the region of Kashi (Varanasi), and.' },
                { text: 'context', outcome: 'Not quite — Students often think "context" means memorizing dates (1398, 1518) and labels (Nirguna, Julaha).', reveals: 'context-means-memorizing-dates-1398' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_002', title: 'पाठ 9 — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 9\' का क्रम: शुरुआत आरोह-भाग-1-—-पाठ-9 से, घटनाएँ बढ़ती हैं, अंत \'आरोह भाग-1 पर।',
            decisions: [{ prompt: 'What are the five standard stages of a narrative plot in order?', options: [
                { text: 'The five stages are: exposition, rising action, climax, falling action, and resolution', outcome: 'The five stages are: exposition, rising action, climax, falling action, and resolution.' },
                { text: 'only beginning, middle, end', outcome: 'Not quite — Students often think \'plot\' is just a summary of what happens, and they miss that narrative.', reveals: 'plot-is-just-a-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is designing a Kabir exhibit. A teammate\'s panel reads: \'Kabir: 15th-century weaver from Kashi. Born c.1398, died 1518.\' He argues the weaver detail is just a biographical fact — \'the poetry is about God, not looms.\'',
            decisions: [{ prompt: 'Why is the weaver identity the key, not trivia?', options: [
                { text: 'Show the generative matrix: nearly every metaphor in Kabir — warp and weft, thread, dye, knot, unravelling — comes from the loom; \'untying the knot\' (granthi) is weaver\'s knowledge turned theology. Add the rest of the context: a low-caste julaha in Sadhukkadi speech challenging Brahmin and Qazi orthodoxy alike — the poetry\'s radicalism is inseparable from who spoke and in whose language.', outcome: 'The panel is rewritten: context stops being a fact-file and becomes the engine — weaving isn\'t Kabir\'s day job, it\'s his entire metaphor bank.' },
                { text: 'Keep the panel — dates and profession are background; the spiritual message stands alone.', outcome: 'Stripping the weaver identity leaves the images unexplained: the loom metaphors become decoration instead of embodied argument.', reveals: 'weaver-is-trivia' },
                { text: 'Reframe him as a social reformer first — the caste angle matters, the spiritual content is secondary.', outcome: 'That inverts without understanding: Kabir\'s social challenge works THROUGH spiritual metaphor — the poetry fuses the two, so splitting them flattens both.', reveals: 'kabir-is-only-reformer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Neither Brahmin nor Qazi could claim him — the weaver\'s loom measured orthodoxy and found it hollow.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'Review Class 10 History Chapter 8 (Bhakti-Sufi Traditions) sections on "Nirguna Bhakti".',
          misconception: 'Students often think "context" means memorizing dates (1398, 1518) and labels (Nirguna, Julaha) as isolated facts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-1 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'Review Class 10 History Chapter 8 (Bhakti-Sufi Traditions) sections on "Nirguna Bhakti" and "Kabir".',
                  misconception: 'Students often think "context" means memorizing dates (1398, 1518) and labels (Nirguna, Julaha) as isolated facts.' }
          ],
            remediations: { 'context-means-memorizing-dates-1398': { steps: ['Have the student list 5 weaving terms from the textbook\'s Kabir selections (e.g., tana, bana, rang, katana, गांठ).', 'For each, write the literal weaving meaning AND the spiritual meaning Kabir assigns.', 'Ask: "Could a Brahmin scholar or a Sufi pir have invented *this exact metaphor cluster*?', 'Finally, rewrite one couplet replacing the weaving metaphor with a farming metaphor—discuss what is lost.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context" means memorizing dates (1398, 1518) and labels (Nirguna, Julaha) as isolated facts.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Kabir\'s poetry is primarily of historical interest; its radical edge is blunted in modern times because caste and religious orthodoxy have.', answer: 'Strong critique: Kabir\'s edge remains sharp',
                  options: ['Strong critique: Kabir\'s edge remains sharp', 'context'],
                  hint: 'Review Class 10 History Chapter 8 (Bhakti-Sufi Traditions) sections on "Nirguna Bhakti" and "Kabir".',
                  misconception: 'Students often think "context" means memorizing dates (1398, 1518) and labels (Nirguna, Julaha) as isolated facts.' }
          ],
            remediations: { 'context-means-memorizing-dates-1398': { steps: ['Have the student list 5 weaving terms from the textbook\'s Kabir selections (e.g., tana, bana, rang, katana, गांठ).', 'For each, write the literal weaving meaning AND the spiritual meaning Kabir assigns.', 'Ask: "Could a Brahmin scholar or a Sufi pir have invented *this exact metaphor cluster*?', 'Finally, rewrite one couplet replacing the weaving metaphor with a farming metaphor—discuss what is lost.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_002', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ.',
          hint: 'Review the plot diagram (Freytag\'s pyramid) and practice labeling stages in a परिचित.',
          misconception: 'Students often think \'plot\' is just a summary of what happens, and they miss that narrative structure includes the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,',
                  options: ['\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-1 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'Review the plot diagram (Freytag\'s pyramid) and practice labeling stages in a परिचित short story.',
                  misconception: 'Students often think \'plot\' is just a summary of what happens, and they miss that narrative structure includes the author\'s deliberate.' }
          ],
            remediations: { 'plot-is-just-a-summary': { steps: ['If a student confuses plot summary with structure analysis, guide them to: (1) Draw a plot diagram for the passage.', '(2) For each stage, ask: \'What does the author want me to feel/think here?\' (3) Compare the diagram with a simple.', '(4) Practice writing one sentence per stage using the phrase \'The author uses [stage] to...\''], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_003', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटका हुआ महसूस हो तो \'पृष्ठभूमि और रचनाकार परिचय\' (c11_hin_ar_cbse_09_001) दोबारा.',
          misconception: 'छात्र प्रायः \'परिवेश\' (Setting) को केवल भौगोलिक स्थान (गाँव, शहर, नदी, पहाड़) तक सीमित समझ लेते हैं और \'वातावरण\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'पृष्ठभूमि और रचनाकार परिचय\' (c11_hin_ar_cbse_09_001) दोबारा पढ़ें.',
                  misconception: 'छात्र प्रायः \'परिवेश\' (Setting) को केवल भौगोलिक स्थान (गाँव, शहर, नदी, पहाड़) तक सीमित समझ लेते हैं और \'वातावरण\' (Atmosphere) को मौसम.' }
          ],
            remediations: { 'setting': { steps: ['चरण 1: छात्र को एक परिचित दृश्य (स्कूल का कॉरिडोर, बाज़ार, बस स्टॉप) दें और कहें: "इसके केवल भौतिक विवरण लिखो" — फिर.', 'किसे बैठने की जगह मिलती है, किसे नहीं?', 'समय का दबाव कैसा है?" — इससे वह परिवेश के अदृश्य घटक (Social Codes, Power Dynamics) देखेगा। चरण 2: उसी दृश्य के लिए दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_004', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'अगर अटके तो \'पाठ्य-परिवेश और वातावरण\' नोड (c11_hin_ar_cbse_09_003) के \'परिवेश-चरित्र.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'नायक का चरित्र-चित्रण\' = \'नायक के गुणों की सूची बनाना\' (बहादुर, ईमानदार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'आरोह भाग-1 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर अटके तो \'पाठ्य-परिवेश और वातावरण\' नोड (c11_hin_ar_cbse_09_003) के \'परिवेश-चरित्र अंतर्संबंध\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'नायक का चरित्र-चित्रण\' = \'नायक के गुणों की सूची बनाना\' (बहादुर, ईमानदार, संघर्षशील)। वे पाठ से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहें — "नायक के तीन **विशेषण** मत दीजिए; उसके तीन **निर्णायक क्षण** बताइए जहां उसने सक्रिय चुनाव.', '**दूसरा कदम:** हर क्षण के लिए पूछें — "यह चुनाव उसके **किस आंतरिक द्वंद्व** को हल करता है या उजागर करता है?" (डर बनाम.', '**तीसरा कदम:** छात्र को **PEEL पैराग्राफ** लिखने को कहें: Point (चरित्रगत अंतर्दृष्टि), Evidence (पाठ का प्रमाण).', '**चौथा कदम:** दो संस्करण दिखाएं — एक \'गुण-सूची\' उत्तर, एक \'विश्लेषणात्मक\' उत्तर — और छात्र से अंतर पहचानने को कहें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_005', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटके तो नोड 004 के \'कार्य किया गया उदाहरण\' (Worked Example) को दोबारा पढ़ें और वही.',
          misconception: 'छात्र अक्सर मानते हैं कि \'सहायक पात्र\' का विश्लेषण करते समय केवल नायक के संदर्भ में ही बात करनी चाहिए (जैसे "वह नायक की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 9\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'आरोह भाग-1 — पाठ 9\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो नोड 004 के \'कार्य किया गया उदाहरण\' (Worked Example) को दोबारा पढ़ें और वही चरण सहायक.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'सहायक पात्र\' का विश्लेषण करते समय केवल नायक के संदर्भ में ही बात करनी चाहिए (जैसे "वह नायक की मदद करता है"), जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 9 से एक सहायक पात्र चुनकर उसके **केवल 3 संवाद** ढूंढने को कहें जो नायक से **नहीं** बोले गए हों (जैसे किसी.', 'फिर पूछें: "इन संवादों से इस पात्र की **अपनी** कौन-सी चिंता/इच्छा/भय पता चलती है जो नायक से संबंधित नहीं?" 3.', 'छात्र को उस पात्र का **\'डे-इन-द-लाइफ\' (Day in the Life)** पैराग्राफ लिखने को कहें जब नायक दृश्य में न हो। 4.', 'अंत में दोनों विश्लेषणों को जोड़कर दिखाएं: "देखो, यह पात्र नायक के बिना भी \'जीवित\' है — यही स्वतंत्र अस्तित्व तुम्हारे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_006', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 9\' का केंद्रीय भाव और.',
          hint: 'अगर अटके तो **c11_hin_ar_cbse_09_002 (कथानक)** और **c11_hin_ar_cbse_09_004 (नायक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य विषय\' पाठ का \'सारांश (Summary)\' होता है** — इसलिए वे कहानी दोहरा देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 9\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 9\' का केंद्रीय भाव और संदेश',
                  options: ['\'आरोह भाग-1 — पाठ 9\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 9\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर अटके तो **c11_hin_ar_cbse_09_002 (कथानक)** और **c11_hin_ar_cbse_09_004 (नायक चित्रण)** दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य विषय\' पाठ का \'सारांश (Summary)\' होता है** — इसलिए वे कहानी दोहरा देते हैं। **गलत तर्क:**.' }
          ],
            remediations: { 'summary': { steps: ['**चरण 1:** छात्र से कहें — "पाठ का **एक वाक्य में सारांश** लिखो" (यह आसान है)। 2.', '**चरण 2:** फिर पूछें — "इस सारांश से लेखक **क्या कहना चाहता है** जो हर युग/देश पर लागू हो?" — यही **मुख्य विषय** है। 3.', '**चरण 3:** दो कॉलम बनवाएँ: बाएँ **\'क्या हुआ\' (घटनाएँ)**, दाएँ **\'क्या उभरा\' (विचार)** — दायाँ कॉलम ही विषय है। 4.', '**चरण 4:** अभ्यास: तीन अलग कहानियों के विषय एक जैसे (जैसे \'त्याग\') दिखाएँ — विषय की **सार्वभौमिकता** स्पष्ट होगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
