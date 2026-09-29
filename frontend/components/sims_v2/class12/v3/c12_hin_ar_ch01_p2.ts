import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch01_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch01_p2',
    title: 'आत्मपरचिय, एक गीत · Part 2/3',
    subtitle: '\'I am pulp\' — the intellectual who saw the machine from inside',
    classLevel: 12, subject: 'hin_ar', topic: 'आत्मपरचिय, एक गीत · Part 2/3',
    chapters: ['c12_hin_ar_ch01'],
    nodeIds: ['c12_hin_ar_cbse_01_007', 'c12_hin_ar_cbse_01_008', 'c12_hin_ar_cbse_01_009', 'c12_hin_ar_cbse_01_010', 'c12_hin_ar_cbse_01_011', 'c12_hin_ar_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi modern-poetry reader', intro: 'A Progressive poet who served both university and ministry writes about being ground to pulp. Context is the key.', goal: 'Situate Muktibodh\'s Vartmaan in the Progressive movement and post-1947 disillusionment.' },
    discovery: {
        question: 'Freedom came in 1947 — yet by the 1950s a professor-poet wrote \'मैं लुगदी हूँ\' — I am pulp. What turned independence into existential dread?',
        options: ['The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system', 'The poet was personally ill', 'Romanticism just ended', 'Poetry was unfashionable'],
        answer: 'The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system',
        hook: 'Muktibodh wasn\'t a छायावादी dreamer — he was Progressive: class, institutions, the writer\'s complicity. As academic and state functionary both, his \'I\' is lived conflict — self-pity becomes a calculated indictment of the intellectual inside the machine.',
    },
    teaching: [
        { title: 'आत्मपरचिय, एक गीत — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'विराम चिह्न\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read \'वर्तमान\' inside its decade: map the छायावाद-to-प्रगतिवाद shift, weigh the intellectual\'s self-deception against his conscience, and hear what \'pulp\' means from a man who served the state.',
        labels: ['आत्मपरचिय, एक गीत —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_010', title: 'आत्मपरचिय, एक गीत — पदावली: कठिन शब्द और मुहावरे',
          caseStudy: { intro: '\'विराम चिह्न\' के मुख्य शब्द: विराम-चिह्न — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the literal meaning of the word "vkReifjp;" and why is it significant that it appears as the poem\'s title and opening word?', options: [
                { text: '"vkReifjp;" literally means "self-confession" or "speaking one\'s own truth." Its', outcome: '"vkReifjp;" literally means "self-confession" or "speaking one\'s own truth." Its placement as title.' },
                { text: 'it means autobiography', outcome: 'Not quite — Students treat "vocabulary in context" as a dictionary exercise: they write the literal meaning.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_012', title: 'आत्मपरचिय, एक गीत — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'विराम चिह्न\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'विराम चिह्न\' का केंद्रीय भाव और संदेश।',
            decisions: [{ prompt: 'Define the difference between a literal comprehension question and an inferential comprehension question in one sentence each.', options: [
                { text: 'A literal question asks for information explicitly written in the text (e.g., "What does', outcome: 'A literal question asks for information explicitly written in the text (e.g., "What does the poet.' },
                { text: 'no right answer', outcome: 'Not quite — Students believe inferential questions have "no right answer" and write personal opinions (e.g., "I.', reveals: 'inferential-questions-have-no-right' },
                { text: 'I feel the poet is brave', outcome: 'Not quite — Students believe inferential questions have "no right answer" and write personal opinions (e.g., "I.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your poem is accepted by the college magazine, but the editor returns it blood-red with corrections, insisting every comma and full stop sit exactly where the rulebook demands. Your gut says the rules are flattening the voice.',
            decisions: [{ prompt: 'What would Nirala\'s \'विराम चिह्न\' tell both sides?', options: [
                { text: 'Let the punctuation marks argue their case — but don\'t let them own the poem; Nirala personifies them, hears them out, then refuses to be their slave, and finally hands the judgment to the reader.', outcome: 'The poem\'s structure is the lesson: rules speak (rising action), the poet resists (climax), and the verdict is democratically opened (\'you decide\') — craft serves voice, not the reverse.' },
                { text: 'Delete every mark — if rules are tyranny, true freedom is a poem with no punctuation at all.', outcome: 'Nirala refuses slavery, not punctuation — the marks stay in the poem as characters with a hearing; abolishing them confuses liberation with vandalism.', reveals: 'freedom-means-no-rules' },
                { text: 'Accept every correction — punctuation exists to discipline expression, and the editor\'s word is final.', outcome: 'That\'s precisely the gulami the poet rejects at the climax; the poem stages the marks\' claims so the poet — and finally the reader — can overrule them.', reveals: 'rules-outrank-voice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now place a poem in its movement — and hear post-independence disillusion speaking as first-person dread.',
            decisions: [{ prompt: 'What comes next? आत्मपरचिय, एक गीत · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आत्मपरचिय, एक गीत · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_007', difficulty: 'standard',
          question: '\'विराम चिह्न\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि फँस जाएँ तो कक्षा 11 के नोड **c11_hin_ar_cbse_13_009** (जाग तुझको दूर जाना.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **\'बिंब = प्रतीक\'** होता है। वे कविता में आए हर चित्र (जैसे: दीपक, अंधेरा, पथ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'विराम चिह्न\' के गौण विषय',
                  options: ['\'विराम चिह्न\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'विराम चिह्न\' का कथानक', '\'विराम चिह्न\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो कक्षा 11 के नोड **c11_hin_ar_cbse_13_009** (जाग तुझको दूर जाना — विरोधाभास और.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **\'बिंब = प्रतीक\'** होता है। वे कविता में आए हर चित्र (जैसे: दीपक, अंधेरा, पथ, आंसू) को तुरंत प्रतीक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहो: "कविता की कोई 5 पंक्तियाँ चुनो जहाँ तुम्हें चित्र दिखे (बिंब)। उन्हें लिखो।" **चरण 2:** अब.', 'केवल वही प्रतीक है।" **चरण 3:** **तुलना तालिका** बनवाओ: | पंक्ति | बिंब (क्या दिखा?) | प्रतीक (क्या अर्थ?) | प्रतीक है?', '(हाँ/नहीं) | |---|---|---|---| | "जलता दीपक" | लौ, प्रकाश, ताप | आत्मोत्सर्ग, साधना | हाँ | | "चांदनी रात" | चाँद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_008', difficulty: 'standard',
          question: '\'विराम चिह्न\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फंसे हुए महसूस हो, तो कक्षा 11 के किसी भी पाठ के "मुख्य विषय और संदेश" वाले नोड (जैसे.',
          misconception: 'छात्र अक्सर मुख्य भाव को गीत के पहले या अंतिम stanza से निकाल लेते हैं, मानते हैं कि वही कवि का अंतिम उद्देश्य है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'विराम चिह्न\' में बिंब (imagery)',
                  options: ['\'विराम चिह्न\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'विराम चिह्न\' का कथानक', '\'विराम चिह्न\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हुए महसूस हो, तो कक्षा 11 के किसी भी पाठ के "मुख्य विषय और संदेश" वाले नोड (जैसे.',
                  misconception: 'छात्र अक्सर मुख्य भाव को गीत के पहले या अंतिम stanza से निकाल लेते हैं, मानते हैं कि वही कवि का अंतिम उद्देश्य है। उदाहरण के लिए, यदि अंत.' }
          ],
            remediations: { 'stanza': { steps: ['छात्र से पूछिए कि वह गीत को तीन भागों में बाँटे: आरंभ (क्या हो रहा है?), मध्य (क्या बदल रहा है?), अंत (क्या सीख मिली.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_009', difficulty: 'standard',
          question: '\'विराम चिह्न\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका हो तो c12_hin_ar_cbse_01_008 (मुख्य भाव) के \'केंद्रीय भाव पहचान\' चरण को दोहराएँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः समझते हैं कि \'गौण भाव\' = \'कम महत्त्वपूर्ण भाव\' और \'विषयांतर\' = \'लेखक का भटकाव/गलती\'।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'विराम चिह्न\' में विरोधाभास',
                  options: ['\'विराम चिह्न\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'विराम चिह्न\' का कथानक', '\'विराम चिह्न\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हो तो c12_hin_ar_cbse_01_008 (मुख्य भाव) के \'केंद्रीय भाव पहचान\' चरण को दोहराएँ — पहले.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः समझते हैं कि \'गौण भाव\' = \'कम महत्त्वपूर्ण भाव\' और \'विषयांतर\' = \'लेखक का भटकाव/गलती\'। **यथार्थ:** निराला में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** कविता के 5-6 पद चुनें; प्रत्येक के आगे M (मुख्य), G (गौण), V (विषयांतर) लिखें — शिक्षक के साथ मिलान करें।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_010', difficulty: 'standard',
          question: '\'विराम चिह्न\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'Review Class 11 node c11_hin_ar_cbse_01_010 (Vocabulary in Context) and practice the.',
          misconception: 'Students treat "vocabulary in context" as a dictionary exercise: they write the literal meaning of "vkReifjp;".',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the word "vkReifjp;" and why is it significant that it appears as the poem\'s title and opening word?', answer: '"vkReifjp;" literally means "self-confession" or "speaking one\'s own truth." Its',
                  options: ['"vkReifjp;" literally means "self-confession" or "speaking one\'s own truth." Its', 'it means autobiography'],
                  hint: 'Review Class 11 node c11_hin_ar_cbse_01_010 (Vocabulary in Context) and practice the "synonym.',
                  misconception: 'Students treat "vocabulary in context" as a dictionary exercise: they write the literal meaning of "vkReifjp;" as "autobiography" and stop.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Have the student read only the first stanza aloud, circling every word that feels "heavy." 2.', 'For each circled word, ask: "If the poet replaced this with a synonym, what would be lost?" 3.', 'Model this with "Hkkj" vs "ek¡x" — write both versions on paper and compare emotional impact.', 'Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_011', difficulty: 'standard',
          question: '\'विराम चिह्न\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'यदि फँसें तो c11_hin_ar_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में भाषा-प्रयोग).',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि कविता में \'गलत\' व्याकरण (जैसे क्रिया न होना, उल्टा क्रम) कवि की **अज्ञानता** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'विराम चिह्न\' में भाषा-प्रयोग',
                  options: ['\'विराम चिह्न\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'विराम चिह्न\' का कथानक', '\'विराम चिह्न\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो c11_hin_ar_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में भाषा-प्रयोग) पर लौटें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि कविता में \'गलत\' व्याकरण (जैसे क्रिया न होना, उल्टा क्रम) कवि की **अज्ञानता** या **लापरवाही** है, या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पठन:** छात्र को कविता के 3-4 पद मौन पढ़कर फिर जोर से पढ़ने को कहें — पूछें: "कहाँ रुकने का मन करता है?', 'कहाँ बात अधूरी लगती है?" वहीँ लोप/अन्वय है। 2.', '**तुलना अभ्यास:** उसी भाव को गद्य में लिखवाएँ (उदा.', '"मेरा कोई ठिकाना नहीं है") और काव्य-पंक्ति साथ रखें — पूछें: "क्या खोया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_012', difficulty: 'standard',
          question: '\'विराम चिह्न\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If unable to generate textual evidence for an inference, immediately re-read the poem.',
          misconception: 'Students believe inferential questions have "no right answer" and write personal opinions (e.g., "I feel the poet.',
          parts: [
                { id: 'a', prompt: 'Read this line from the poem: "eSa tx&thou dk Hkkj fy, fiQjrk gw¡] fiQj Hkh thou esa I;kj fy, fiQjrk gw¡".', answer: 'This is a literal response',
                  options: ['This is a literal response', 'inferential', 'no right answer', 'I feel the poet is brave'],
                  hint: 'If unable to generate textual evidence for an inference, immediately re-read the poem summary (node.',
                  misconception: 'Students believe inferential questions have "no right answer" and write personal opinions (e.g., "I feel the poet is brave").' },
                { id: 'b', prompt: 'Answer this literal question using the PEEL structure: "According to stanza 3, what two specific roles does the poet want to play in \'volkn\' (celebrations) and.', answer: '**Point:** The poet explicitly states two roles in stanza 3',
                  options: ['**Point:** The poet explicitly states two roles in stanza 3', 'he wants to be happy and sad', 'no right answer', 'I feel the poet is brave'],
                  hint: 'If unable to generate textual evidence for an inference, immediately re-read the poem summary (node.',
                  misconception: 'Students believe inferential questions have "no right answer" and write personal opinions (e.g., "I feel the poet is brave").' },
                { id: 'c', prompt: 'Two students answer the inferential question: "Why does the poet say \'I never gave the message of renunciation\'?" Student A: "Because he likes worldly life.".', answer: 'Student B\'s answer is valid',
                  options: ['Student B\'s answer is valid', 'no right answer', 'I feel the poet is brave', 'inferential questions have "no right answer" and write personal opinions (e'],
                  hint: 'If unable to generate textual evidence for an inference, immediately re-read the poem summary (node.',
                  misconception: 'Students believe inferential questions have "no right answer" and write personal opinions (e.g., "I feel the poet is brave").' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['Give the student 5 mixed questions (literal/inferential) from the poem.', 'Have them label each L/I and highlight the *exact words* in the text that support the answer.', 'For every inferential question, enforce the "It says / I say / And so" scaffold: "The text says ___ (quote).', 'I say this implies ___ (reasoning).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe inferential questions have "no right answer" and write personal opinions (e.g., "I feel the poet.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s inferential answer: "The poet rejects God because he is an atheist." The poem includes: "eSa Lusg&lqjk dk iku fd;k djrk gw¡] eSa dHkh.', answer: 'Unacceptable',
                  options: ['Unacceptable', 'no right answer', 'I feel the poet is brave', 'inferential questions have "no right answer" and write personal opinions (e'],
                  hint: 'If unable to generate textual evidence for an inference, immediately re-read the poem summary (node.',
                  misconception: 'Students believe inferential questions have "no right answer" and write personal opinions (e.g., "I feel the poet is brave").' },
                { id: 'b', prompt: 'Create one literal and one inferential question based on stanza 4 ("eSa fut jksnu esa jkx fy, fiQjrk gw¡..."). Provide a model inferential answer using PEEL.', answer: '**Literal:** "What does the poet want to become in \'jksnu\' (battle) and \'ok.kh\'',
                  options: ['**Literal:** "What does the poet want to become in \'jksnu\' (battle) and \'ok.kh\'', 'no right answer', 'I feel the poet is brave', 'inferential questions have "no right answer" and write personal opinions (e'],
                  hint: 'If unable to generate textual evidence for an inference, immediately re-read the poem summary (node.',
                  misconception: 'Students believe inferential questions have "no right answer" and write personal opinions (e.g., "I feel the poet is brave").' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['Give the student 5 mixed questions (literal/inferential) from the poem.', 'Have them label each L/I and highlight the *exact words* in the text that support the answer.', 'For every inferential question, enforce the "It says / I say / And so" scaffold: "The text says ___ (quote).', 'I say this implies ___ (reasoning).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
