import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch01_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch01_p1',
    title: 'आत्मपरचिय, एक गीत · Part 1/3',
    subtitle: '\'I am pulp\' — the intellectual who saw the machine from inside',
    classLevel: 12, subject: 'hin_ar', topic: 'आत्मपरचिय, एक गीत · Part 1/3',
    chapters: ['c12_hin_ar_ch01'],
    nodeIds: ['c12_hin_ar_cbse_01_001', 'c12_hin_ar_cbse_01_002', 'c12_hin_ar_cbse_01_003', 'c12_hin_ar_cbse_01_004', 'c12_hin_ar_cbse_01_005', 'c12_hin_ar_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi modern-poetry reader', intro: 'A Progressive poet who served both university and ministry writes about being ground to pulp. Context is the key.', goal: 'Situate Muktibodh\'s Vartmaan in the Progressive movement and post-1947 disillusionment.' },
    discovery: {
        question: 'Freedom came in 1947 — yet by the 1950s a professor-poet wrote \'मैं लुगदी हूँ\' — I am pulp. What turned independence into existential dread?',
        options: ['The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system', 'The poet was personally ill', 'Romanticism just ended', 'Poetry was unfashionable'],
        answer: 'The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system',
        hook: 'Muktibodh wasn\'t a छायावादी dreamer — he was Progressive: class, institutions, the writer\'s complicity. As academic and state functionary both, his \'I\' is lived conflict — self-pity becomes a calculated indictment of the intellectual inside the machine.',
    },
    teaching: [
        { title: 'आत्मपरचिय, एक गीत — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read \'वर्तमान\' inside its decade: map the छायावाद-to-प्रगतिवाद shift, weigh the intellectual\'s self-deception against his conscience, and hear what \'pulp\' means from a man who served the state.',
        labels: ['आत्मपरचिय, एक गीत —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_001', title: 'आत्मपरचिय, एक गीत — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 01 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of the poem "वर्तमान" prescribed in Class 12 Hindi Aroh Chapter 1, and what literary movement is he associated with?', options: [
                { text: 'The author is गजानन माधव मुक्तिबोध (Gajanan Madhav Muktibodh, 1907–1964), a central', outcome: 'The author is गजानन माधव मुक्तिबोध (Gajanan Madhav Muktibodh, 1907–1964), a central figure of the.' },
                { text: 'निराला, अज्ञेय, or calling him a छायावादी कवि', outcome: 'Not quite — **Misconception:** "Context is just background trivia — dates, birthplace, awards.', reveals: 'misconception-context-is-just-background' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_005', title: 'आत्मपरचिय, एक गीत — छंद और लय-विधान',
          caseStudy: { intro: '\'विराम चिह्न\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'Identify the three supporting characters explicitly named or directly addressed in the poem \'vkyksd èkUok\'.', options: [
                { text: 'The three supporting characters are: (1) the revolutionary leader addressed as', outcome: 'The three supporting characters are: (1) the revolutionary leader addressed as \'fnys&nkxnkj\'.' },
                { text: 'the poet \'cgknqj\'kkg ”kI\' or the British', outcome: 'Not quite — Students believe \'character analysis\' only applies to stories with named, speaking characters.', reveals: 'character-analysis-only-applies-to' },
                { text: '\'character analysis\' only applies to stories with named, speaking characters', outcome: 'Not quite — Students believe \'character analysis\' only applies to stories with named, speaking characters.', reveals: 'character-analysis-only-applies-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your poem is accepted by the college magazine, but the editor returns it blood-red with corrections, insisting every comma and full stop sit exactly where the rulebook demands. Your gut says the rules are flattening the voice.',
            decisions: [{ prompt: 'What would Nirala\'s \'विराम चिह्न\' tell both sides?', options: [
                { text: 'Let the punctuation marks argue their case — but don\'t let them own the poem; Nirala personifies them, hears them out, then refuses to be their slave, and finally hands the judgment to the reader.', outcome: 'The poem\'s structure is the lesson: rules speak (rising action), the poet resists (climax), and the verdict is democratically opened (\'you decide\') — craft serves voice, not the reverse.' },
                { text: 'Delete every mark — if rules are tyranny, true freedom is a poem with no punctuation at all.', outcome: 'Nirala refuses slavery, not punctuation — the marks stay in the poem as characters with a hearing; abolishing them confuses liberation with vandalism.', reveals: 'freedom-means-no-rules' },
                { text: 'Accept every correction — punctuation exists to discipline expression, and the editor\'s word is final.', outcome: 'That\'s precisely the gulami the poet rejects at the climax; the poem stages the marks\' claims so the poet — and finally the reader — can overrule them.', reveals: 'rules-outrank-voice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now place a poem in its movement — and hear post-independence disillusion speaking as first-person dread.',
            decisions: [{ prompt: 'What comes next? आत्मपरचिय, एक गीत · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आत्मपरचिय, एक गीत · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 11 Hindi Aroh Chapter 1 "Before You Read" and Theme nodes.',
          misconception: '**Misconception:** "Context is just background trivia — dates, birthplace, awards.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why knowing that Muktibodh taught at Nagpur University (1942–1952) and later worked in the Ministry of Information matters for.', answer: 'His dual role — academic intellectual and state functionary — places him at the',
                  options: ['His dual role — academic intellectual and state functionary — places him at the', 'it doesn\'t matter, only the poem matters', '(I) reflects a man who witnessed bureaucracy up close, making lines like'],
                  hint: 'If stuck, review Class 11 Hindi Aroh Chapter 1 "Before You Read" and Theme nodes.',
                  misconception: '**Misconception:** "Context is just background trivia — dates, birthplace, awards.' }
          ],
            remediations: { 'misconception-context-is-just-background': { steps: ['If a student cannot articulate Muktibodh\'s Progressive stance or link it to the poem: 1.', '**Re-read** the NCERT "Before You Read" box (page 1–2 of chapter) and underline 5 factual claims.', '**Revisit** Class 11 node `c11_hin_ar_cbse_01_001` (प्रगतिवाद का परिचय) — watch a 10-min YouTube summary of "प्रगतिशील.', '**Do a 5-minute write:** "How does a poet employed by the government write against the establishment?" — this forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_002', difficulty: 'standard',
          question: '\'विराम चिह्न\' का कथानक — \'विराम चिह्न\' — आरोह भाग-2 का पाठ। पाठ का कथानक, पात्र.',
          hint: 'यदि अटके, तो कक्षा 11 के "आओ, मलिकर बचाएँ" (c11_hin_ar_cbse_16_002) या "जाग तुझको दूर.',
          misconception: 'छात्र अक्सर प्रत्येक पद्यांश को स्वतंत्र (independent) अर्थ इकाई मानते हैं — जैसे पहले पद्यांश का अर्थ "बाहरी पहचान".',
          parts: [
                { id: 'a', prompt: 'तीसरे पद्यांश में "मैं हूँ एक प्रश्न" वाक्य में "प्रश्न" शब्द का लाक्षणिक अर्थ (implied meaning) क्या है? इसे कवि की मनःस्थिति से जोड़कर लिखें।', answer: '"प्रश्न" यहाँ कवि की अनिश्चितता (uncertainty), जिज्ञासा (curiosity), और आत्म-खोज',
                  options: ['"प्रश्न" यहाँ कवि की अनिश्चितता (uncertainty), जिज्ञासा (curiosity), और आत्म-खोज', 'प्रश्न', 'मैं कौन हूँ?', 'कवि उलझन में है'],
                  hint: 'यदि अटके, तो कक्षा 11 के "आओ, मलिकर बचाएँ" (c11_hin_ar_cbse_16_002) या "जाग तुझको दूर जाना".',
                  misconception: 'छात्र अक्सर प्रत्येक पद्यांश को स्वतंत्र (independent) अर्थ इकाई मानते हैं — जैसे पहले पद्यांश का अर्थ "बाहरी पहचान", दूसरे का "अस्वीकृति".' }
          ],
            remediations: { 'independent': { steps: ['छात्र को कविता के **पहले दो पद्यांश साथ-साथ** पढ़वाएँ और पूछें: "दूसरा पद्यांश पहले का जवाब कैसे दे रहा है?" — इसे.', 'फिर तीसरे पद्यांश पर जाएँ: "यह दूसरे से कैसे निकला?" — इसे लिखवाएँ। 3.', 'इस "कारण-कार्य श्रृंखला" (cause-effect chain) को सभी 6 पद्यांशों के लिए दोहराएँ। 4.', 'अंत में छात्र से कहें: "अब पूरी कविता को एक वाक्य में बताओ — यह किसी व्यक्ति के बारे में है या किसी प्रक्रिया के बारे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_003', difficulty: 'standard',
          question: '\'विराम चिह्न\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि अटके तो c12_hin_ar_cbse_01_002 (पद्यांश-वार भावार्थ) पर लौटें और प्रत्येक पद्यांश का.',
          misconception: 'छात्र समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल छंद गिनना या छंद-नाम बताना है; वे यह नहीं देखते कि कवि ने *क्यों* इस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'विराम चिह्न\' का पाठ्य-परिवेश (setting)',
                  options: ['\'विराम चिह्न\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'विराम चिह्न\' का कथानक', '\'विराम चिह्न\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_01_002 (पद्यांश-वार भावार्थ) पर लौटें और प्रत्येक पद्यांश का भावार्थ.',
                  misconception: 'छात्र समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल छंद गिनना या छंद-नाम बताना है; वे यह नहीं देखते कि कवि ने *क्यों* इस क्रम में, *इतनी*.' }
          ],
            remediations: { 'wrong-idea': { steps: ['कविता को फिर से जोर से पढ़ें, केवल लय सुनने के लिए। 2.', 'पेंसिल से हर छंद के आगे कोष्ठक में पंक्ति-संख्या लिखें। 3.', 'हर छंद के पहले शब्द को घेरें — पैटर्न दिखेगा। 4.', 'अब लिखें: "छंद 1-3 क्या करते हैं?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_004', difficulty: 'standard',
          question: '\'विराम चिह्न\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटके तो: कक्षा 11 के नोड्स c11_hin_a_cbse_13_004, 14_004, 16_004 में दी गई.',
          misconception: '**सबसे घातक गलतफहमी:** छात्र समझते हैं कि \'केंद्रीय भाव = विषय (subject)\' और \'रस = मनोदशा (mood)\'। उदाहरण: वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'विराम चिह्न\' का पात्र-चित्रण',
                  options: ['\'विराम चिह्न\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'विराम चिह्न\' का कथानक', '\'विराम चिह्न\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो: कक्षा 11 के नोड्स c11_hin_a_cbse_13_004, 14_004, 16_004 में दी गई रस-निष्पत्ति की.',
                  misconception: '**सबसे घातक गलतफहमी:** छात्र समझते हैं कि \'केंद्रीय भाव = विषय (subject)\' और \'रस = मनोदशा (mood)\'। उदाहरण: वे लिखते हैं — "केंद्रीय भाव.' }
          ],
            remediations: { 'subject-mood-1': { steps: ['**पहला कदम:** कविता को फिर से पढ़ो और **तीन रंगों के पेन** से चिह्नित करो: लाल = आलम्बन/उद्दीपन विभाव (वस्तुएँ/स्थान).', '**दूसरा कदम:** एक टेबल बनाओ — स्तंभ: पद संख्या | विभाव | अनुभाव | संचारी भाव | रस पर प्रभाव। हर पद के लिए भरो। 3.', '**तीसरा कदम:** अब लिखो: "करुण रस की निष्पत्ति होती है क्योंकि [आलम्बन] के प्रति [स्थायी भाव] जागृत होता है जिसे.', '**पुनर्निदान:** उपरोक्त DIAGNOSTIC_QUESTION_2 और 3 को दोबारा हल करो — यदि अब सही उत्तर दे पाते हो, तो अवधारणा स्पष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_005', difficulty: 'standard',
          question: '\'विराम चिह्न\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'If stuck, revisit c12_hin_ar_cbse_01_004 (Protagonist) and practice the \'Who speaks?',
          misconception: 'Students believe \'character analysis\' only applies to stories with named, speaking characters.',
          parts: [
                { id: 'a', prompt: 'Identify the three supporting characters explicitly named or directly addressed in the poem \'vkyksd èkUok\'.', answer: 'The three supporting characters are: (1) the revolutionary leader addressed as',
                  options: ['The three supporting characters are: (1) the revolutionary leader addressed as', 'the poet \'cgknqj\'kkg ”kI\' or the British', '\'character analysis\' only applies to stories with named, speaking characters'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_01_004 (Protagonist) and practice the \'Who speaks? To whom?',
                  misconception: 'Students believe \'character analysis\' only applies to stories with named, speaking characters.' }
          ],
            remediations: { 'character-analysis-only-applies-to': { steps: ['If a student cannot identify supporting characters, do NOT re-teach the poem.', 'Instead: (1) Give them a 4-line dialogue poem (e.g., a mother calling a child).', 'Who is spoken about?\' (2) Map those three roles onto \'vkyksd èkUok\' using coloured pencils: red for speaker, blue for.', '(3) Have them write one sentence per colour using the frame: \'The [role] is [entity] because the text says [quote].\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe \'character analysis\' only applies to stories with named, speaking characters.',
          parts: [
                { id: 'a', prompt: 'Evaluate the critical claim: \'The revolutionary leader (fnys&nkxnkj) is the only supporting character who matters; the motherland and children are just.', answer: 'Refute',
                  options: ['Refute', '\'character analysis\' only applies to stories with named, speaking characters'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_01_004 (Protagonist) and practice the \'Who speaks? To whom?',
                  misconception: 'Students believe \'character analysis\' only applies to stories with named, speaking characters.' }
          ],
            remediations: { 'character-analysis-only-applies-to': { steps: ['If a student cannot identify supporting characters, do NOT re-teach the poem.', 'Instead: (1) Give them a 4-line dialogue poem (e.g., a mother calling a child).', 'Who is spoken about?\' (2) Map those three roles onto \'vkyksd èkUok\' using coloured pencils: red for speaker, blue for.', '(3) Have them write one sentence per colour using the frame: \'The [role] is [entity] because the text says [quote].\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_006', difficulty: 'standard',
          question: '\'विराम चिह्न\' का मुख्य विषय — \'विराम चिह्न\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अलंकार पहचान में अटकें तो **कक्षा 11 की कविताओं (c11_hin_a_cbse_13_006, 14_006.',
          misconception: '**छात्र समझते हैं: "अलंकार पहचानना = पंक्ति पढ़कर नाम बता देना।"** **वास्तविकता:** बोर्ड परीक्षा में **पहचान + वर्गीकरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'विराम चिह्न\' का मुख्य विषय',
                  options: ['\'विराम चिह्न\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'विराम चिह्न\' का कथानक', '\'विराम चिह्न\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अलंकार पहचान में अटकें तो **कक्षा 11 की कविताओं (c11_hin_a_cbse_13_006, 14_006, 15_006, 16_006).',
                  misconception: '**छात्र समझते हैं: "अलंकार पहचानना = पंक्ति पढ़कर नाम बता देना।"** **वास्तविकता:** बोर्ड परीक्षा में **पहचान + वर्गीकरण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** c12_hin_ar_cbse_01_002 (पद्यांश-वार भावार्थ) — उन पंक्तियों को चिह्नित करें जहाँ तुलना, अतिशयोक्ति.', '**तालिका बनाएं:** 3 कॉलम — **पंक्ति | अलंकार नाम + प्रकार | भाव/सौंदर्य पर प्रभाव** — कविता की 10 प्रमुख पंक्तियों के.', '**स्व-परीक्षण:** किसी सहपाठी को तालिका दें; उससे पूछें: *"यहाँ रूपक क्यों नहीं उपमा?"* — यदि आप तर्क न दे सकें, तो.', '**पुनः निदान:** इस नोड के Diagnostic Q3 और Q4 फिर से हल करें — अब व्याख्या सहित।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
