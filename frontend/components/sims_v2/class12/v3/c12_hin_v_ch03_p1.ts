import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch03_p1: SimDef = {
    id: 'v3_c12_hin_v_ch03_p1',
    title: 'अतीत में दबे पाँव · Part 1/3',
    subtitle: 'Fifteen years of glory, five centuries of silence',
    classLevel: 12, subject: 'hin_v', topic: 'अतीत में दबे पाँव · Part 1/3',
    chapters: ['c12_hin_v_ch03'],
    nodeIds: ['c12_hin_v_cbse_03_001', 'c12_hin_v_cbse_03_002', 'c12_hin_v_cbse_03_003', 'c12_hin_v_cbse_03_004', 'c12_hin_v_cbse_03_005', 'c12_hin_v_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Historical travelogue reader', intro: 'A writer stands among red-sandstone ruins and rebuilds Akbar\'s abandoned capital in prose.', goal: 'Read the chapter as reconstruction — architectural evidence, urban planning and the paradox of a city built to last that didn\'t.' },
    discovery: {
        question: 'Fatehpur Sikri was built for eternity — then abandoned within fifteen years, its silence loud under the Buland Darwaza. What makes the ruin worth reconstructing?',
        options: ['The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone', 'Tourist value', 'Mughal nostalgia', 'Pretty sandstone'],
        answer: 'The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone',
        hook: 'Don\'t mistake it for a romantic travelogue — the writer records workers\' quarters, graded housing and cheap labour inside the glory. \'Prachin\' signals reconstruction: read the architecture as evidence for a lost urban order, caste-free craft zoning and planned water — not just ornament.',
    },
    teaching: [
        { title: 'अतीत में दबे पाँव — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the ghost capital like an archaeologist: cluster the proper nouns into rulers, monuments and events, weigh the planned-city claim against the labour it cost, and measure ruins against the boast.',
        labels: ['अतीत में दबे पाँव'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_v_cbse_03_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['List the three strongest evaluative claims: (A) "lcls.', 'Read paragraphs 1-4 slowly. Mark every sentence that makes.', 'Synthesize: The author\'s frame is not "look at beautiful.', 'For each claim, hunt backward/forward 2 sentences for the.', 'Verify each evidence fragment directly supports its claim.'], answer: 'Read paragraphs 1-4 slowly. Mark every sentence that makes. List the three strongest evaluative claims: (A) "lcls. For each claim, hunt backward/forward 2 sentences for the. Verify each evidence fragment directly supports its claim. Synthesize: The author\'s frame is not "look at beautiful.' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a smart-city meeting in your town, a planner pitches clearing an old quarter for a parking complex: \'It\'s just decayed walls — real progress is glass and concrete, not ruins.\'',
            decisions: [{ prompt: 'How does the Rajgir chapter answer that pitch?', options: [
                { text: 'Ancient Rajgir\'s ruins document a city with planned streets, drains and housing without caste barriers — a \'society-governed\' civilisation; the author contrasts its civic wisdom with today\'s chaotic neglect precisely to show modernity excavated the history but didn\'t learn it.', outcome: 'The chapter\'s argument: the ruins aren\'t the opposite of progress but a rebuke to it — the \'decayed walls\' hold urban planning and social ethics the glass-and-concrete pitch hasn\'t matched.' },
                { text: 'Side with the planner — sentimentality about ruins can\'t run a modern city.', outcome: 'The chapter isn\'t nostalgia — it\'s a comparison of civic competence: the ancient city governed itself socially where the modern one only manages to excavate; dismissing the walls discards the evidence, not the sentiment.', reveals: 'ruins-equal-stagnation' },
                { text: 'Propose freezing the whole quarter as a museum — heritage must be untouched.', outcome: 'The author\'s point is that Rajgir was lived-in and socially governed, not embalmed; turning it into a sealed exhibit repeats the mistake of treating civic life as a monument instead of a model to inhabit.', reveals: 'heritage-means-freeze' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a travelogue as urban history — where a dead city\'s plan still argues what a city could be.',
            decisions: [{ prompt: 'What comes next? अतीत में दबे पाँव · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — अतीत में दबे पाँव · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck on historical references: Review Class 11 History Chapter 8 (Mughal Empire).',
          misconception: 'Students treat "Before You Read" as optional skimming rather than a strategic frame-building exercise.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पात्र-चित्रण'],
                  hint: 'If stuck on historical references: Review Class 11 History Chapter 8 (Mughal Empire) sections.',
                  misconception: 'Students treat "Before You Read" as optional skimming rather than a strategic frame-building exercise.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Have the student re-read ONLY the first three paragraphs aloud, pausing after each sentence to answer: "What claim.', 'Give them a 3-column template: Claim | Textual Evidence | My Prediction.', 'Student completes rows 2-3 independently for "most planned city" and "society-governed not king-governed."', 'Re-diagnostic — ask them to state the chapter\'s central argument in one sentence using their template.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_002', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक — \'वखत खि अगवत्स-नमकस और गालिब.',
          hint: 'Work step by step.',
          misconception: 'A wrong answer names आरोह or अंतरा as the source book; the "v" in the subject code hin_v specifically marks वितान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक',
                  options: ['\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पात्र-चित्रण'],
                  hint: 'Recall the definition.',
                  misconception: 'A wrong answer names आरोह or अंतरा as the source book; the "v" in the subject code hin_v specifically marks वितान — this misconception.' }
          ],
            remediations: { 'a-wrong-answer-names-or': { steps: ['Re-read the WALKTHROUGH above, then retry the diagnostic.', 'If it still feels unclear, open the prerequisite lesson linked on this page.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_003', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting) — पाठ किस.',
          hint: 'यदि अटका महसूस हो तो c11_hin_v_cbse_03_003 (कक्षा 11 वितान पाठ 3 का परिवेश-वातावरण) का.',
          misconception: 'छात्र अक्सर \'परिवेश\' को केवल स्थान (जहाँ) और समय (कब) तक सीमित कर देते हैं, जबकि NCERT में परिवेश में सामाजिक संरचना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)',
                  options: ['\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पात्र-चित्रण'],
                  hint: 'यदि अटका महसूस हो तो c11_hin_v_cbse_03_003 (कक्षा 11 वितान पाठ 3 का परिवेश-वातावरण) का.',
                  misconception: 'छात्र अक्सर \'परिवेश\' को केवल स्थान (जहाँ) और समय (कब) तक सीमित कर देते हैं, जबकि NCERT में परिवेश में सामाजिक संरचना (जाति, वर्ग, लिंग).' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पाठ के पहले पृष्ठ के केवल संज्ञा-शब्द (स्थान, वस्तु, व्यक्ति) छाँटने को कहें — ये \'परिवेश\' के बिल्डिंग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_004', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पात्र-चित्रण — मुख्य पात्र की.',
          hint: 'यदि फँस जाएँ तो **कक्षा ११ आरोह पाठ १ या २ के नायक-चरित्र-चित्रण (c11_hin_a_cbse_01_004.',
          misconception: '**विशिष्ट भ्रांति:** *"बड़े बाबू का मौन = उदासीनता / अवसाद / संवादहीनता"* **क्यों गलत है:** पाठ स्पष्ट करता है कि उनका.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पात्र-चित्रण',
                  options: ['\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **कक्षा ११ आरोह पाठ १ या २ के नायक-चरित्र-चित्रण (c11_hin_a_cbse_01_004.',
                  misconception: '**विशिष्ट भ्रांति:** *"बड़े बाबू का मौन = उदासीनता / अवसाद / संवादहीनता"* **क्यों गलत है:** पाठ स्पष्ट करता है कि उनका मौन **\'भाषा की सीमा\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (३ चरणों में):** 1.', '**पुनर्पाठ (Re-read) विशिष्ट प्रसंग:** छात्र से कहें — *"पाठ के वे ३ प्रसंग ढूँढ़ो जहाँ बड़े बाबू कुछ नहीं बोलते, फिर.', '**तुलनात्मक विश्लेषण:** उनसे पूछें — *"अगर बड़े बाबू यहाँ बोल देते (\'मालती, तुम्हारे हाथ कितने खुरदुरे हैं\'), तो चरित्र.', '**लेखन अभ्यास:** **PEEL संरचना** में एक पैराग्राफ लिखवाएँ: **Point:** "बड़े बाबू का मौन सक्रिय प्रतिरोध है।".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_005', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के सहायक पात्र — वे चरित्र जो मुख्य.',
          hint: 'यदि फँस जाएँ तो c12_hin_v_cbse_03_004 (नायक चित्रण) के \'कार्यात्मक विश्लेषण\' खंड को.',
          misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों का चित्रण लिखते समय उनकी **\'विशेषताओं\' (traits) की सूची** बना देते हैं — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के सहायक पात्र',
                  options: ['\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो c12_hin_v_cbse_03_004 (नायक चित्रण) के \'कार्यात्मक विश्लेषण\' खंड को दोहराएँ — वही.',
                  misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों का चित्रण लिखते समय उनकी **\'विशेषताओं\' (traits) की सूची** बना देते हैं — जैसे "माँ दयालु है, दाई.' }
          ],
            remediations: { 'traits': { steps: ['**चरण 1:** छात्र को c12_hin_v_cbse_03_004 (नायक चित्रण) पुनः पढ़ने को कहें — वहाँ नायक के गुणों को कथानक-कार्य से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_006', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का मुख्य विषय — \'वखत खि अगवत्स-नमकस और.',
          hint: 'यदि अटक जाएँ तो **c12_hin_v_cbse_03_002 (कथानक)** के "प्रमुख मोड़" खंड को दोबारा पढ़ें और.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मान लेते हैं कि "मुख्य विषय" = "कहानी का सारांश" या "लेखक क्या कहना चाहता है"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का मुख्य विषय',
                  options: ['\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटक जाएँ तो **c12_hin_v_cbse_03_002 (कथानक)** के "प्रमुख मोड़" खंड को दोबारा पढ़ें और वहाँ से.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मान लेते हैं कि "मुख्य विषय" = "कहानी का सारांश" या "लेखक क्या कहना चाहता है"। **वास्तविकता:** विषय (theme).' }
          ],
            remediations: { 'theme': { steps: ['**चरण 1:** छात्र से कहें: "पाठ के तीन प्रसंग चुनो जहाँ अतीत अचानक वर्तमान में घुसा। प्रत्येक के लिए लिखो: (क) अतीत का.', '(ख) वह वर्तमान में कैसे घुसा?', '(ग) नायक पर तत्काल प्रभाव क्या पड़ा?" **चरण 2:** इन तीनों को मिलाकर एक वाक्य में **पैटर्न** लिखवाएँ: "हर बार अतीत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
