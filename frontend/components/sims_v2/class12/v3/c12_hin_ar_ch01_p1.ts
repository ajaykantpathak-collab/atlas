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
        { title: 'आत्मपरचिय, एक गीत — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त, सामाजिक-सांस्कृतिक परिवेश, रचनाकालीन परिस्थितियों और वैचारिक पृष्ठभूमि का व्यवस्थित अध्ययन किया जाता है ताकि उसकी रचना के मूल.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read \'वर्तमान\' inside its decade: map the छायावाद-to-प्रगतिवाद shift, weigh the intellectual\'s self-deception against his conscience, and hear what \'pulp\' means from a man who served the state.',
        labels: ['आत्मपरचिय, एक गीत —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_ar_cbse_01_005', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['यति स्थान — अर्थ-पूर्ण विराम "गीतों का | हूँ गायक" पर, जो.', 'पंक्ति को दो चरणों में बाँटें (यति पर) — "मैं निज गीतों का".', 'प्रत्येक चरण की मात्रा गिनें — चरण 1: मैं(2) नि-ज(2).', 'वास्तविक पाठ्य-पंक्ति जाँचें — NCERT पाठ में पंक्ति है.', 'निष्कर्ष — छंद: **मात्रिक (11+11 मात्रा, यति लोचपूर्ण).'], answer: 'पंक्ति को दो चरणों में बाँटें (यति पर) — "मैं निज गीतों का". प्रत्येक चरण की मात्रा गिनें — चरण 1: मैं(2) नि-ज(2). वास्तविक पाठ्य-पंक्ति जाँचें — NCERT पाठ में पंक्ति है. यति स्थान — अर्थ-पूर्ण विराम "गीतों का | हूँ गायक" पर, जो. निष्कर्ष — छंद: **मात्रिक (11+11 मात्रा, यति लोचपूर्ण).' } },
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
          question: 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 11 का नोड c11_hin_ar_cbse_14_001 (बादल को घरिते देखा है.',
          misconception: 'छात्र समझते हैं कि \'कवि परिचय\' का अर्थ केवल जन्मतिथि, जन्मस्थान, प्रमुख रचनाएँ और पुरस्कार रटना है। वे यह नहीं देख पाते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,',
                  options: ['कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर', 'केंद्रीय भाव (Central Theme) वह मूल विचार या अनुभूति है जिसके चारों ओर पूरी कविता बुनी गई'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 11 का नोड c11_hin_ar_cbse_14_001 (बादल को घरिते देखा है — कवि परिचय.',
                  misconception: 'छात्र समझते हैं कि \'कवि परिचय\' का अर्थ केवल जन्मतिथि, जन्मस्थान, प्रमुख रचनाएँ और पुरस्कार रटना है। वे यह नहीं देख पाते कि नागार्जुन का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "नागार्जुन के जीवन की तीन घटनाएँ लिखो जिन्होंने उन्हें सबसे अधिक प्रभावित किया" (अपेक्षित: बौद्ध.', 'कवि इन्हें कैसे जानता था?" चरण 3: छात्र को नागार्जुन की जीवनी (NCERT परिशिष्ट या कोई विश्वसनीय स्रोत) के दो पृष्ठ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line.',
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
          question: 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी.',
          hint: 'यदि अटके तो c12_hin_ar_cbse_01_002 (पद्यांश-वार भावार्थ) पर लौटें और प्रत्येक पद्यांश का.',
          misconception: 'छात्र समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल छंद गिनना या छंद-नाम बताना है; वे यह नहीं देखते कि कवि ने *क्यों* इस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर',
                  options: ['काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर', 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'केंद्रीय भाव (Central Theme) वह मूल विचार या अनुभूति है जिसके चारों ओर पूरी कविता बुनी गई'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_01_002 (पद्यांश-वार भावार्थ) पर लौटें और प्रत्येक पद्यांश का भावार्थ.',
                  misconception: 'छात्र समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल छंद गिनना या छंद-नाम बताना है; वे यह नहीं देखते कि कवि ने *क्यों* इस क्रम में, *इतनी*.' }
          ],
            remediations: { 'wrong-idea': { steps: ['कविता को फिर से जोर से पढ़ें, केवल लय सुनने के लिए। 2.', 'पेंसिल से हर छंद के आगे कोष्ठक में पंक्ति-संख्या लिखें। 3.', 'हर छंद के पहले शब्द को घेरें — पैटर्न दिखेगा। 4.', 'अब लिखें: "छंद 1-3 क्या करते हैं?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) वह मूल विचार या अनुभूति है जिसके चारों ओर पूरी.',
          hint: 'यदि अटके तो: कक्षा 11 के नोड्स c11_hin_a_cbse_13_004, 14_004, 16_004 में दी गई.',
          misconception: '**सबसे घातक गलतफहमी:** छात्र समझते हैं कि \'केंद्रीय भाव = विषय (subject)\' और \'रस = मनोदशा (mood)\'। उदाहरण: वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) वह मूल विचार या अनुभूति है जिसके चारों ओर पूरी कविता बुनी गई',
                  options: ['केंद्रीय भाव (Central Theme) वह मूल विचार या अनुभूति है जिसके चारों ओर पूरी कविता बुनी गई', 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर'],
                  hint: 'यदि अटके तो: कक्षा 11 के नोड्स c11_hin_a_cbse_13_004, 14_004, 16_004 में दी गई रस-निष्पत्ति की.',
                  misconception: '**सबसे घातक गलतफहमी:** छात्र समझते हैं कि \'केंद्रीय भाव = विषय (subject)\' और \'रस = मनोदशा (mood)\'। उदाहरण: वे लिखते हैं — "केंद्रीय भाव.' }
          ],
            remediations: { 'subject-mood-1': { steps: ['**पहला कदम:** कविता को फिर से पढ़ो और **तीन रंगों के पेन** से चिह्नित करो: लाल = आलम्बन/उद्दीपन विभाव (वस्तुएँ/स्थान).', '**दूसरा कदम:** एक टेबल बनाओ — स्तंभ: पद संख्या | विभाव | अनुभाव | संचारी भाव | रस पर प्रभाव। हर पद के लिए भरो। 3.', '**तीसरा कदम:** अब लिखो: "करुण रस की निष्पत्ति होती है क्योंकि [आलम्बन] के प्रति [स्थायी भाव] जागृत होता है जिसे.', '**पुनर्निदान:** उपरोक्त DIAGNOSTIC_QUESTION_2 और 3 को दोबारा हल करो — यदि अब सही उत्तर दे पाते हो, तो अवधारणा स्पष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_005', difficulty: 'standard',
          question: 'छंद (Chhand) is the systematic metrical structure of a verse governed by fixed.',
          hint: 'यदि मात्रा-गणना में अटके → c11_hin_a_cbse_13_005 के \'मात्रा-गणना अभ्यास\' खंड को दोहराएँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "मात्रिक छंद = मुक्त छंद (Free verse)" क्योंकि दोनों में वर्ण-गणना नहीं होती।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद (Chhand) is the systematic metrical structure of a verse governed by fixed rules of',
                  options: ['छंद (Chhand) is the systematic metrical structure of a verse governed by fixed rules of', 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर'],
                  hint: 'यदि मात्रा-गणना में अटके → c11_hin_a_cbse_13_005 के \'मात्रा-गणना अभ्यास\' खंड को दोहराएँ, विशेषकर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "मात्रिक छंद = मुक्त छंद (Free verse)" क्योंकि दोनों में वर्ण-गणना नहीं होती। **क्यों होता है:** Class.' }
          ],
            remediations: { 'free-verse-class-11-c11': { steps: ['**पुनरावृत्ति:** Class 11 के छंद नोड्स (c11_hin_a_cbse_13_005, c11_hin_a_cbse_14_005, c11_hin_a_cbse_15_005.', '**अभ्यास:** NCERT कक्षा 11 \'आरोह\' की किन्हीं 3 कविताओं के 2-2 पदों की मात्रा-गणना करवाएँ, यति चिह्नित करवाएँ, छंद नाम.', '**पुनः निदान:** Diagnostic Question 2 फिर से दें — अब छात्र मात्रा गिनते समय **स्वर-दीर्घता** और **संयुक्त व्यंजन** का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_006', difficulty: 'standard',
          question: 'अलंकार (Alankar) वे साहित्यिक युक्तियाँ हैं जिनके प्रयोग से काव्य-भाषा में.',
          hint: 'यदि अलंकार पहचान में अटकें तो **कक्षा 11 की कविताओं (c11_hin_a_cbse_13_006, 14_006.',
          misconception: '**छात्र समझते हैं: "अलंकार पहचानना = पंक्ति पढ़कर नाम बता देना।"** **वास्तविकता:** बोर्ड परीक्षा में **पहचान + वर्गीकरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Alankar) वे साहित्यिक युक्तियाँ हैं जिनके प्रयोग से काव्य-भाषा में सौंदर्य,',
                  options: ['अलंकार (Alankar) वे साहित्यिक युक्तियाँ हैं जिनके प्रयोग से काव्य-भाषा में सौंदर्य,', 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर'],
                  hint: 'यदि अलंकार पहचान में अटकें तो **कक्षा 11 की कविताओं (c11_hin_a_cbse_13_006, 14_006, 15_006, 16_006).',
                  misconception: '**छात्र समझते हैं: "अलंकार पहचानना = पंक्ति पढ़कर नाम बता देना।"** **वास्तविकता:** बोर्ड परीक्षा में **पहचान + वर्गीकरण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** c12_hin_ar_cbse_01_002 (पद्यांश-वार भावार्थ) — उन पंक्तियों को चिह्नित करें जहाँ तुलना, अतिशयोक्ति.', '**तालिका बनाएं:** 3 कॉलम — **पंक्ति | अलंकार नाम + प्रकार | भाव/सौंदर्य पर प्रभाव** — कविता की 10 प्रमुख पंक्तियों के.', '**स्व-परीक्षण:** किसी सहपाठी को तालिका दें; उससे पूछें: *"यहाँ रूपक क्यों नहीं उपमा?"* — यदि आप तर्क न दे सकें, तो.', '**पुनः निदान:** इस नोड के Diagnostic Q3 और Q4 फिर से हल करें — अब व्याख्या सहित।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
