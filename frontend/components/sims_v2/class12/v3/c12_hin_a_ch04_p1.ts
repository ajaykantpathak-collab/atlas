import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch04_p1: SimDef = {
    id: 'v3_c12_hin_a_ch04_p1',
    title: 'बनारस, दशिा · Part 1/3',
    subtitle: 'Not the ghats — the lane where the city actually lives',
    classLevel: 12, subject: 'hin_a', topic: 'बनारस, दशिा · Part 1/3',
    chapters: ['c12_hin_a_ch04'],
    nodeIds: ['c12_hin_a_cbse_04_001', 'c12_hin_a_cbse_04_002', 'c12_hin_a_cbse_04_003', 'c12_hin_a_cbse_04_004', 'c12_hin_a_cbse_04_005', 'c12_hin_a_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist poetry reader', intro: 'A post-independence poet picks the narrowest space in the city and makes it speak.', goal: 'Read Banaras through Nayi Kavita\'s experimental lens — title as thesis, image over statement.' },
    discovery: {
        question: 'The poem is titled \'Banaras\' — not a highway or a plaza but a narrow lane, a cul-de-sac. What has the title already decided before line one?',
        options: ['The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre', 'Banaras is small', 'Lanes are pretty', 'Nothing — it\'s just a name'],
        answer: 'The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre',
        hook: 'A poet born in 1934 writes under Nayi Kavita\'s contract already broken — no fixed metre, image over statement, ambiguity as value. Where Bhakti verse transmits truth, this poetry enacts the search for it; context isn\'t a crutch, it\'s the knowledge the poem presupposes.',
    },
    teaching: [
        { title: 'बनारस, दशिा — कवि परिचय और पृष्ठभूमि', text: 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि कौन है, उसने कहाँ पढ़ाई की, उसके जीवन की कौन-सी घटनाएँ इस कविता को प्रभावित करती हैं, और उसका.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the cul-de-sac of modernist verse: predict imagery from title and era, weigh ambiguity as method, and feel how the poem speaks from beneath the flyover, not from its span.',
        labels: ['बनारस, दशिा — कवि', 'बनारस, दशिा — पद्यांश-वार', 'बनारस, दशिा — काव्य-संरचना', 'बनारस, दशिा — केंद्रीय', 'बनारस, दशिा — छंद', 'बनारस, दशिा — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A short-film jury member rejects your submission about a child calling \'Papa — Papa\' toward a father who never comes, saying \'nothing happens — no climax, no arrival, no story.\'',
            decisions: [{ prompt: 'How does the structure of \'फ्नेक\' answer that verdict?', options: [
                { text: 'The climax is internal — the repeated \'पिता-पिता\' at widening intervals spirals the child\'s urgency upward while the father\'s absence grows more total; the non-arrival IS the event, and the final cry is the peak the film was building toward.', outcome: 'The chapter separates external event from structural peak: repetition placed at lengthening intervals propels time and loss forward — \'nothing happening\' is precisely what\'s happening.' },
                { text: 'The juror is right — a climax requires the awaited person to appear or definitively not appear on screen.', outcome: 'That demands an external resolution the poem refuses on purpose: the spiral structure makes absence itself the accumulating force, so an arrival would release the tension the film exists to hold.', reveals: 'climax-needs-arrival' },
                { text: 'Compromise — add a montage of the father elsewhere so the audience at least sees him.', outcome: 'Cutting away breaks the one-point perspective that makes the waiting legible; the poem never leaves the child\'s call because the structure\'s power is that we stay inside the unanswered side.', reveals: 'show-both-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now decode a title before the first line — and read Nayi Kavita\'s broken forms as the broken world\'s true shape.',
            decisions: [{ prompt: 'What comes next? बनारस, दशिा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बनारस, दशिा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_001', difficulty: 'standard',
          question: 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते.',
          hint: 'यदि फँसें तो कक्षा 11 के किसी भी पाठ के "कवि परिचय और पृष्ठभूमि" नोड (जैसे.',
          misconception: 'छात्र अक्सर इस गलती में पड़ते हैं कि वे बनारस, दशिा कविता को केवल एक भक्ति या यात्रा वर्णन मान लेते हैं और कवि के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि',
                  options: ['बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s', 'केंद्रीय भाव (Central Theme) कविता का वह **मूल सार** है जो समस्त बिंबों, प्रतीकों और'],
                  hint: 'यदि फँसें तो कक्षा 11 के किसी भी पाठ के "कवि परिचय और पृष्ठभूमि" नोड (जैसे c11_hin_a_cbse_01_001).',
                  misconception: 'छात्र अक्सर इस गलती में पड़ते हैं कि वे बनारस, दशिा कविता को केवल एक भक्ति या यात्रा वर्णन मान लेते हैं और कवि के सामाजिक-राजनीतिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस गलती को दोहरा रहा है, तो पहले उसे कविता की दो पंक्तियों पर ध्यान केंद्रित करवाएँ जो स्पष्ट रूप से सामाजिक.', 'क्या केवल धार्मिक वर्णन में इन दोनों का उल्लेख आएगा?" इस चर्चा के माध्यम से उसे समझाएँ कि कवि विपरीत चित्रों को रखकर एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति.',
          hint: 'यदि कवि के परिचय याद नहीं आ रहा है, तो c12_hin_a_cbse_04_001 नोड को दोबारा देखिए जहाँ.',
          misconception: 'छात्र अक्सर पद्यांश-वार भावार्थ निकालते समय प्रत्येक पद्यांश को अलग-अलग व्याख्या करते हैं और उनमें आने वाले भावात्मक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s', 'केंद्रीय भाव (Central Theme) कविता का वह **मूल सार** है जो समस्त बिंबों, प्रतीकों और'],
                  hint: 'यदि कवि के परिचय याद नहीं आ रहा है, तो c12_hin_a_cbse_04_001 नोड को दोबारा देखिए जहाँ कविव के जीवन.',
                  misconception: 'छात्र अक्सर पद्यांश-वार भावार्थ निकालते समय प्रत्येक पद्यांश को अलग-अलग व्याख्या करते हैं और उनमें आने वाले भावात्मक परिवर्तन या प्रगति को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र पद्यांशों के बीच संबंध नहीं देख पा रहा है, तो उसे कविता को पढ़ते समय प्रत्येक पद्यांश के अंत में एक शब्द.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_003', difficulty: 'standard',
          question: 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of.',
          hint: 'यदि एनजैम्बमेंट/केशिया स्पष्ट नहीं, तो c11_hin_a_cbse_13_003 (जाग तुझको दूर जाना.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि "काव्य-संरचना" = "पदों की गिनती + पंक्तियों की गिनती"। वे एनजैम्बमेंट को केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s',
                  options: ['काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'केंद्रीय भाव (Central Theme) कविता का वह **मूल सार** है जो समस्त बिंबों, प्रतीकों और'],
                  hint: 'यदि एनजैम्बमेंट/केशिया स्पष्ट नहीं, तो c11_hin_a_cbse_13_003 (जाग तुझको दूर जाना — काव्य-संरचना) के.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि "काव्य-संरचना" = "पदों की गिनती + पंक्तियों की गिनती"। वे एनजैम्बमेंट को केवल \'पंक्ति बिना विराम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें — केवल सुनें नहीं:** कविता को जोर से पढ़ें, हर पंक्ति-अंत पर 2 सेकंड रुकें, फिर बिना रुके पढ़ें — अंतर.', '**पेंसिल से चिह्नित करें:** हर एनजैम्बमेंट (→), हर केशिया (|), हर पद-रिक्ति (//) को मार्क करें। 3.', '**एक पद को \'हटाकर\' देखें:** पद 4 हटा दें — कविता का भाव कैसे बदलता है?', '**पुनः-निदान:** DIAGNOSTIC_QUESTION_4 को दोबारा हल करें — अब चरणों में \'कार्य\' (function) लिखें, केवल \'विषय\' नहीं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) कविता का वह **मूल सार** है जो समस्त बिंबों.',
          hint: 'अगर अटके: **c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय भाव और रस)** पर लौटें.',
          misconception: '**सबसे आम भ्रम**: छात्र समझते हैं कि **\'करुण रस\' = केवल दुःख/रोना**। वे लिखते हैं: "कवि रो रहा है इसलिए करुण रस है।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) कविता का वह **मूल सार** है जो समस्त बिंबों, प्रतीकों और',
                  options: ['केंद्रीय भाव (Central Theme) कविता का वह **मूल सार** है जो समस्त बिंबों, प्रतीकों और', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'अगर अटके: **c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय भाव और रस)** पर लौटें — वहाँ.',
                  misconception: '**सबसे आम भ्रम**: छात्र समझते हैं कि **\'करुण रस\' = केवल दुःख/रोना**। वे लिखते हैं: "कवि रो रहा है इसलिए करुण रस है।" **क्यों गलत है**: करुण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहो — कविता की **कोई 5 पंक्तियाँ** चुनो जहाँ कवि \'पहले\' और \'अब\' की तुलना करता हो। उन्हें कागज पर.', '**चरण 2**: प्रत्येक पंक्ति के लिए पूछो — "यहाँ कवि को क्या **महसूस** हो रहा है?', '(अनुभाव) उसके मन में कौन-से **भाव** आ-जा रहे हैं?', '**चरण 3**: अब **रस-निष्पत्ति का चार्ट** बनवाओ: आलम्बन → उद्दीपन → अनुभाव → संचारी → स्थायी भाव → **रस**। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_005', difficulty: 'standard',
          question: 'छंद काव्य-पंक्तियों का वह निश्चित मापदंड है जो मात्राओं/अक्षरों की संख्या, क्रम.',
          hint: 'यदि मात्रा-गणना में अटके तो c11_hin_a_cbse_13_005 के \'मात्रा-गणना चेकलिस्ट\' और \'गुरु-लघु.',
          misconception: 'छात्र समझते हैं कि \'छंद पहचानना\' = \'तुक ढूँढना\' (अंत्य-अक्षर मिलान)। असल में हिंदी के मात्रिक छंदों में तुक अनिवार्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद काव्य-पंक्तियों का वह निश्चित मापदंड है जो मात्राओं/अक्षरों की संख्या, क्रम और',
                  options: ['छंद काव्य-पंक्तियों का वह निश्चित मापदंड है जो मात्राओं/अक्षरों की संख्या, क्रम और', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'यदि मात्रा-गणना में अटके तो c11_hin_a_cbse_13_005 के \'मात्रा-गणना चेकलिस्ट\' और \'गुरु-लघु अभ्यास.',
                  misconception: 'छात्र समझते हैं कि \'छंद पहचानना\' = \'तुक ढूँढना\' (अंत्य-अक्षर मिलान)। असल में हिंदी के मात्रिक छंदों में तुक अनिवार्य नहीं; गुरु-लघु क्रम और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को c11_hin_a_cbse_13_005 (जाग तुझको दूर जाना — छंद और लय-विधान) और c11_hin_a_cbse_14_005 (बादल को घरिते देखा है.', 'उससे 5 सरल पंक्तियों की मात्रा-गणना करवाएँ (अनुस्वार/दीर्घ/ह्रस्व नियम चेकलिस्ट के साथ)। 3.', 'फिर \'बनारस, दशिा\' की पहली दो पंक्तियों पर वही प्रक्रिया दुहराएँ। 4.', 'अंत में यति-स्थल बोलकर पढ़कर चिह्नित करने का अभ्यास कराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_006', difficulty: 'standard',
          question: 'अलंकार वे भाषाई युक्तियाँ हैं जिनमें शब्दों के सामान्य अर्थ से हटकर नए.',
          hint: 'यदि छात्र अलंकार की पहचान में फँस रहा है, तो उसे सामान्य भाषा के वाक्य (जैसे "सूर्य उग.',
          misconception: 'छात्र अक्सर अलंकार को केवल "कविता को सुंदर बनाने वाले कठिन शब्द" मानते हैं, और इसलिए वे किसी भी अभिव्यक्तिपूर्ण शब्द.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वे भाषाई युक्तियाँ हैं जिनमें शब्दों के सामान्य अर्थ से हटकर नए, प्रभावशाली अर्थ',
                  options: ['अलंकार वे भाषाई युक्तियाँ हैं जिनमें शब्दों के सामान्य अर्थ से हटकर नए, प्रभावशाली अर्थ', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'यदि छात्र अलंकार की पहचान में फँस रहा है, तो उसे सामान्य भाषा के वाक्य (जैसे "सूर्य उग रहा था") और.',
                  misconception: 'छात्र अक्सर अलंकार को केवल "कविता को सुंदर बनाने वाले कठिन शब्द" मानते हैं, और इसलिए वे किसी भी अभिव्यक्तिपूर्ण शब्द (जैसे "चमकता".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो वाक्य दिए जाएँ: (1) "गंगा की लहरें चमक रही थीं" और (2) "गंगा की लहरें चांदनी की तरह चमक रही थीं"। पहला.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
