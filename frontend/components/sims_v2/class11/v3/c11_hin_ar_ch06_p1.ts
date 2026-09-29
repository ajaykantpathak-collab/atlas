import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch06_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch06_p1',
    title: 'पाठ 6 · Part 1/3',
    subtitle: 'Watch a tuition room become the whole education system in miniature.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 6 · Part 1/3',
    chapters: ['c11_hin_ar_ch06'],
    nodeIds: ['c11_hin_ar_cbse_06_001', 'c11_hin_ar_cbse_06_002', 'c11_hin_ar_cbse_06_003', 'c11_hin_ar_cbse_06_004', 'c11_hin_ar_cbse_06_005', 'c11_hin_ar_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a spectator trapped in one room with the exam machine', intro: 'A mother sweeping, a teacher collecting fees, a student drowning — and a one-act play that won\'t open a window.', goal: 'Analyse the one-act form\'s unity and compression as a critique of tuition culture.' },
    discovery: {
        question: 'Usha Priyamvada\'s one-act play ends with जटुह deciding to start a movement — no tidy solution. Is that a weak ending?',
        options: ['No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself', 'Yes — a play must resolve its conflict', 'Yes — starting a movement solves nothing for the boy', 'No — but only because sequels were planned'],
        answer: 'No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself',
        hook: 'One room, one act, no exits — the form itself is the argument: students and parents have nowhere to step out to.',
    },
    teaching: [
        { title: 'पाठ 6 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the entrances and exits as French scenes, place the climax where the tuition teacher confronts the principal, and defend the unresolved close.',
        labels: ['पाठ 6 — पृष्ठभूमि', 'पाठ 6 — कथानक', 'पाठ 6 — पाठ्य-परिवेश', 'पाठ 6 — पात्र-चित्रण', 'पाठ 6 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_001', title: 'पाठ 6 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 06 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of the play *jtuh* and which literary movement is she associated with?', options: [
                { text: 'The author is Usha Priyamvada (eUuw HkaMkjh), a prominent writer of the Nayi Kahani (New', outcome: 'The author is Usha Priyamvada (eUuw HkaMkjh), a prominent writer of the Nayi Kahani (New Story).' },
                { text: 'context and background', outcome: 'Not quite — Students often think "context and background" means memorizing the author\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' },
                { text: 'Premchand or associating her with Chhayavad', outcome: 'Not quite — Students often think "context and background" means memorizing the author\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your drama club is rehearsing Usha Priyamvada\'s one-act play about a family fighting over a son\'s tuition fees. The student director plans to \'break it into three scenes for variety\' and end with an uplifting speech where the parents renounce tuition.',
            decisions: [{ prompt: 'Why do both changes betray the play\'s design?', options: [
                { text: 'Hold the form: it\'s a one-act play — a single continuous act where every entrance and exit (French scenes) turns the same screw tighter. Splitting it into \'scenes\' breaks the compression that mirrors the student\'s inescapable pressure. And the happy ending kills the point: the Nayi Kahani one-acter refuses easy solutions, forcing the audience to sit with a system that commodifies childhood.', outcome: 'The production keeps its claustrophobia: one unbroken space, one unbroken pressure — discomfort is the playwright\'s method, not a flaw to fix.' },
                { text: 'Allow the scene breaks — entrances and exits are just like act divisions anyway.', outcome: 'French scenes are character shifts inside one continuous act, not act breaks; treating them as divisions imports a multi-act logic the form deliberately refuses.', reveals: 'french-scenes-are-acts' },
                { text: 'Keep the uplifting finale — audiences prefer resolution, and it gives the play a message.', outcome: 'The resolution would lie: the play\'s power is making the tuition trap felt without an exit — solving it on stage lets the audience off the hook.', reveals: 'happy-ending-improves-it' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'The play compresses everything a novel would spread out — that\'s why the pressure on one student\'s homework feels inescapable.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review the Class 10 chapter on "Hindi Sahitya ka Itihas" focusing on the Nayi.',
          misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and a list of works.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, review the Class 10 chapter on "Hindi Sahitya ka Itihas" focusing on the Nayi Kahani.',
                  misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and a list of works.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['If a student reduces context to biography, guide them through this 3-step remediation: 1.', '**Map the movement**: Have them list 3 Nayi Kahani stories they know (e.g., *Usne Kaha Tha*, *Parinde*) and identify.', '**Connect to material history**: Show a 1960s college fee receipt (or recreated image) and a coaching ad from the same.', '**Form-function link**: Give them a 2-page excerpt from a full-length play and the opening of *jtuh*; ask "What can.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and a list of works.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of using a one-act play form to critique the education system.', answer: 'The one-act form *strengthens* the critique',
                  options: ['The one-act form *strengthens* the critique', 'it\'s too short to show everything', 'context and background'],
                  hint: 'If stuck, review the Class 10 chapter on "Hindi Sahitya ka Itihas" focusing on the Nayi Kahani.',
                  misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and a list of works.' },
                { id: 'b', prompt: 'Create a brief (4–5 line) imaginary stage direction for a modern adaptation of *jtuh* set in a present-day coaching hub (e.g., Kota).', answer: '**Stage Direction**: "A cramped Kota hostel room, 2 AM',
                  options: ['**Stage Direction**: "A cramped Kota hostel room, 2 AM', 'context and background'],
                  hint: 'If stuck, review the Class 10 chapter on "Hindi Sahitya ka Itihas" focusing on the Nayi Kahani.',
                  misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and a list of works.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['If a student reduces context to biography, guide them through this 3-step remediation: 1.', '**Map the movement**: Have them list 3 Nayi Kahani stories they know (e.g., *Usne Kaha Tha*, *Parinde*) and identify.', '**Connect to material history**: Show a 1960s college fee receipt (or recreated image) and a coaching ad from the same.', '**Form-function link**: Give them a 2-page excerpt from a full-length play and the opening of *jtuh*; ask "What can.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_002', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ.',
          hint: 'यदि फँसें तो **\'कहानी बनाम कथानक\'** (E.M. फॉर्स्टर, *Aspects of the Novel*) और **फ्रेटैग.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'फ्लैशबैक\' को \'अरेखीय संरचना\' का पर्याय मान लेते हैं**, जबकि फ्लैशबैक एक **स्थानीय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,',
                  options: ['\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि फँसें तो **\'कहानी बनाम कथानक\'** (E.M. फॉर्स्टर, *Aspects of the Novel*) और **फ्रेटैग पिरामिड**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'फ्लैशबैक\' को \'अरेखीय संरचना\' का पर्याय मान लेते हैं**, जबकि फ्लैशबैक एक **स्थानीय युक्ति (local device)**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "किसी भी परिचित फिल्म (जैसे *दृश्यम*, *अंधाधुन*) की घटनाएँ कागज़ पर **कालानुक्रम में** लिखो.', '**चरण 2:** फिर पूछें: "फिल्म में घटनाएँ **किस क्रम में दिखाई गईं**?', 'तीर (→) से जोड़ो — यह \'आख्यान-संरचना\' है।" 3.', '**चरण 3:** दोनों की तुलना करवाएं: "कहाँ-कहाँ क्रम बदला?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_003', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटका लगे तो c11_hin_ar_cbse_06_002 के \'कथानक के सोपान\' खंड को दोबारा पढ़ें — देखें कि.',
          misconception: 'विद्यार्थी प्रायः समझते हैं कि \'वातावरण\' लेखक सीधे-सीधे विशेषणों (उदास, भयानक, सुंदर) से *बताता* है, जबकि वास्तव में वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटका लगे तो c11_hin_ar_cbse_06_002 के \'कथानक के सोपान\' खंड को दोबारा पढ़ें — देखें कि परिवेश.',
                  misconception: 'विद्यार्थी प्रायः समझते हैं कि \'वातावरण\' लेखक सीधे-सीधे विशेषणों (उदास, भयानक, सुंदर) से *बताता* है, जबकि वास्तव में वह **ठोस ब्योरों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के किसी एक पैराग्राफ में केवल **संज्ञा-सर्वनाम-विशेषण** छाँटो जो इंद्रियों को संबोधित करते हों.', 'उन शब्दों को दो कॉलम में लिखवाएँ: बायाँ — \'परिवेश का ब्योरा\', दायाँ — \'मेरे मन पर असर\'। 3.', 'फिर पूछें: "बाएँ कॉलम के कौन-से तीन ब्योरे मिलकर दाएँ कॉलम का \'भय\' बना रहे हैं?" 4.', 'अंत में छात्र स्वयं एक वाक्य लिखे: "लेखक ने X, Y, Z ब्योरे चुनकर भय का वातावरण रचा।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_004', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'Review "narrative point of view" in c11_hin_ar_cbse_06_002 - specifically the difference.',
          misconception: 'Students consistently confuse Jatuh\'s *professional ethics* with *personal affection* for Vfer.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'आरोह भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'Review "narrative point of view" in c11_hin_ar_cbse_06_002 - specifically the difference between.',
                  misconception: 'Students consistently confuse Jatuh\'s *professional ethics* with *personal affection* for Vfer.' }
          ],
            remediations: { 'students-consistently-confuse-jatuh-s': { steps: ['Have the student list every interaction between Jatuh and Vfer in a two-column table: Column A = Action/Dialogue.', 'Show the Principal scene where Jatuh says "eSFl esa ges\'kk lsaV&ijlsaV uacj ysrk jgk gSA bl lky Hkh mlus iwjk isij Bhd.', 'Ask: "If she favored him personally, would she demand the same rights for *all* students in the public hearing?"', 'Rewrite one board answer paragraph replacing "Vfer" with "any student" to test if the argument holds.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_005', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_06_004 के \'नायक विश्लेषण\' खंड को दोहराएं.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'सहायक पात्र = नायक का मित्र/परिवार वाला\' — जबकि सहायक पात्र **शत्रु, अजनबी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'आरोह भाग-1 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_06_004 के \'नायक विश्लेषण\' खंड को दोहराएं, विशेषकर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'सहायक पात्र = नायक का मित्र/परिवार वाला\' — जबकि सहायक पात्र **शत्रु, अजनबी, प्रकृति, पशु, या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "किसी फिल्म/सीरियल का एक दृश्य याद करो जहां हीरो अकेला है — अब सोचो, अगर उसका दोस्त/दुश्मन/मां वहां होता.', 'फिर कहानी से एक सहायक पात्र चुनकर **\'अनुपस्थिति परीक्षण\' (absence test)** करवाएं: "अगर यह पात्र न होता तो नायक क्या.', 'कथानक कैसे बदलता?" — लिखित में 3 बिंदु मांगें। 3.', 'फॉरस्टर के \'गोल/समतल पात्र\' (round/flat character) भेद को 2 उदाहरणों सहित समझाएं — इससे \'अस्तित्वहीन पात्र\' का भ्रम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_006', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 6\' का केंद्रीय भाव और.',
          hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो, तो पाठ में दोहराई जाने वाली स्थितियों, पात्रों के.',
          misconception: 'छात्र अक्सर मुख्य विषय को पाठ की स्पष्ट घटना या पात्र के एक विशिष्ट कार्य से जोड़ लेते हैं, मानकर चलते हैं कि अगर कोई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 6\' का केंद्रीय भाव और संदेश',
                  options: ['\'आरोह भाग-1 — पाठ 6\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 6\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो, तो पाठ में दोहराई जाने वाली स्थितियों, पात्रों के संघर्षों या.',
                  misconception: 'छात्र अक्सर मुख्य विषय को पाठ की स्पष्ट घटना या पात्र के एक विशिष्ट कार्य से जोड़ लेते हैं, मानकर चलते हैं कि अगर कोई पात्र ईमानदारी से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वह पाठ में कौन सी स्थिति या संवाद दो या अधिक बार आता है — जैसे कि क्या कोई पात्र बार-बार चुनाव के.', 'फिर उन दोहराव वाली स्थितियों के परिणामों को तुलना कीजिए — क्या हर बार ईमानदारी बोलने पर inizialmente कठिनाई होती है.', 'इस पैटर्न को पहचानने पर कहिए कि यही दोहराव वाला विचार मुख्य विषय है — न कि कोई單一 घटना। इससे वे घटना से विचार की ओर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
