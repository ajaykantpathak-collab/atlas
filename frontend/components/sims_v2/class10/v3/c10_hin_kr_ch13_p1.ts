import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_kr_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_kr_ch13_p1: SimDef = {
    id: 'v3_c10_hin_kr_ch13_p1',
    title: 'माता का अँचल · Part 1/3',
    subtitle: 'इस नोड में **केवल** लेखक परिचय (जीवन, रचनाएँ, शैली) और कहानी की पृष्ठभूमि (ग्रामीण.',
    classLevel: 10, subject: 'hin_kr', topic: 'माता का अँचल · Part 1/3',
    chapters: ['c10_hin_kr_ch13'],
    nodeIds: ['c10_hin_kr_cbse_13_001', 'c10_hin_kr_cbse_13_002', 'c10_hin_kr_cbse_13_003', 'c10_hin_kr_cbse_13_004', 'c10_hin_kr_cbse_13_005', 'c10_hin_kr_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कृतिका के पाठ \'माता का अँचल\' के आरंभ में दिए लेखक-परिचय खंड को पढ़िए और चार तथ्य नोट कीजिए — जन्म व.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'माता का अँचल — पृष्ठभूमि और रचनाकार परिचय', text: '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है — कहानीकार शिवप्रसाद सिंह के जीवन के प्रमुख पड़ाव, उनकी भाषा-शैली की विशेषताएँ, तथा कहानी का सामाजिक-भौगोलिक परिवेश (नदी किनारे का गाँव.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_kr_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['माता का अँचल —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through माता का अँचल like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? माता का अँचल · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — माता का अँचल · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_001', difficulty: 'standard',
          question: '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है — कहानीकार शिवप्रसाद.',
          hint: 'अगर फँसें तो कक्षा 9 की हिंदी पाठ्यपुस्तक (कृतिका/स्पर्श) के किसी गद्य पाठ का \'रचनाकार.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"पृष्ठभूमि" का अर्थ केवल \'कहानी कब और कहाँ घटित हुई\' (time & place) बताना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है',
                  options: ['\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का पाठ्य-परिवेश (setting)', '\'माता का अँचल\' का पात्र-चित्रण'],
                  hint: 'अगर फँसें तो कक्षा 9 की हिंदी पाठ्यपुस्तक (कृतिका/स्पर्श) के किसी गद्य पाठ का \'रचनाकार परिचय\' और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"पृष्ठभूमि" का अर्थ केवल \'कहानी कब और कहाँ घटित हुई\' (time & place) बताना है।** वे लिख देते हैं.' }
          ],
            remediations: { 'time-place-20-background': { steps: ['**पुनर्पाठ (Re-read):** पाठ्यपुस्तक के **\'रचनाकार परिचय\' बॉक्स** और पाठ के **प्रथम दो पैराग्राफ** को पेंसिल से रेखांकित.', '**सारणी बनाएँ (Make a table):** दो कॉलम — **\'लेखक का जीवन/अनुभव\'** और **\'कहानी की पृष्ठभूमि का तत्व\'**। पंक्तियाँ भरें.', '**शैली-शब्दकोश (Style glossary):** पाठ से 5 आंचलिक शब्द छाँटें, उनका मानक हिंदी अर्थ लिखें, फिर सोचें — "अगर लेखक मानक.', '**मौखिक अभ्यास:** किसी साथी को 2 मिनट में समझाएँ — "पृष्ठभूमि केवल स्थान-काल नहीं, वह **संपूर्ण पारिस्थितिकी (total.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_002', difficulty: 'standard',
          question: '\'माता का अँचल\' का कथानक — \'माता का अँचल\' — कृतिका भाग-2 का पाठ। पाठ का कथानक.',
          hint: 'यदि अटका हो तो: **\'कथावाचक कौन? कब बोल रहा है? किसे संबोधित कर रहा है?\'** — इन तीन.',
          misconception: 'छात्र **\'कथानक\' (plot) और \'कथावस्तु\' (story)** को समान मानते हैं। वे लिखते हैं: "कहानी माँ के प्यार की है" — यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' का कथानक',
                  options: ['\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का पाठ्य-परिवेश (setting)', '\'माता का अँचल\' का पात्र-चित्रण'],
                  hint: 'यदि अटका हो तो: **\'कथावाचक कौन? कब बोल रहा है? किसे संबोधित कर रहा है?\'** — इन तीन प्रश्नों पर.',
                  misconception: 'छात्र **\'कथानक\' (plot) और \'कथावस्तु\' (story)** को समान मानते हैं। वे लिखते हैं: "कहानी माँ के प्यार की है" — यह **कथावस्तु** है। **कथानक**.' }
          ],
            remediations: { 'plot-story': { steps: ['छात्र से कहो: "कहानी की 5 बड़ी घटनाएँ **कालानुक्रम** में लिखो (story order)।" 2.', 'फिर पूछो: "पाठ में वे किस क्रम में आती हैं?', 'दोनों सूचियों को साथ रखकर **अंतर (gap)** दिखाओ — वही **संरचना** है। 4.', 'अंत में कहो: "अब लिखो: लेखक ने इस अंतर को क्यों रखा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_003', difficulty: 'standard',
          question: '\'माता का अँचल\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि अटके तो \'पृष्ठभूमि और रचनाकार परिचय\' (c10_hin_kr_cbse_13_001) में लेखक के बचपन के.',
          misconception: 'छात्र अक्सर \'परिवेश\' और \'वातावरण\' को केवल भौतिक स्थान (गाँव, घर) और मौसम (वर्षा, धूप) तक सीमित समझते हैं। वे नहीं देख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' का पाठ्य-परिवेश (setting)',
                  options: ['\'माता का अँचल\' का पाठ्य-परिवेश (setting)', '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो \'पृष्ठभूमि और रचनाकार परिचय\' (c10_hin_kr_cbse_13_001) में लेखक के बचपन के विवरण और.',
                  misconception: 'छात्र अक्सर \'परिवेश\' और \'वातावरण\' को केवल भौतिक स्थान (गाँव, घर) और मौसम (वर्षा, धूप) तक सीमित समझते हैं। वे नहीं देख पाते कि परिवेश में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कहानी के तीन विशिष्ट दृश्य चुनने को कहें (जैसे: आँगन में तुलसी पूजा, खेत में फसल कटाई, बरसात में अँचल में.', 'प्रत्येक दृश्य के लिए पूछें: यहाँ कौन-से सामाजिक/सांस्कृतिक तत्व सक्रिय हैं?', 'फिर एक टेबल बनाएँ: स्तंभ 1 - भौतिक विवरण, स्तंभ 2 - सामाजिक/सांस्कृतिक अर्थ, स्तंभ 3 - भावनात्मक प्रभाव। 4.', 'अंत में छात्र से कहें: "अब बताओ कि यदि यही दृश्य शहर के फ्लैट में होता तो माँ का व्यवहार कैसे बदलता?" यह परिवेश की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_004', difficulty: 'standard',
          question: '\'माता का अँचल\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि कठिनाई महसूस हो तो नोड c10_hin_kr_cbse_13_003 (पाठ्य‑परिवेश और वातावरण) की.',
          misconception: 'छात्र अक्सर सोचते हैं कि पात्र‑चित्रण में केवल पात्र के बाहरी लक्षण (जैसे उम्र, पोशाक, दिखावे) लिख देने से काम चल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' का पात्र-चित्रण',
                  options: ['\'माता का अँचल\' का पात्र-चित्रण', '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि कठिनाई महसूस हो तो नोड c10_hin_kr_cbse_13_003 (पाठ्य‑परिवेश और वातावरण) की सेटिंग‑विवरण को पुनः.',
                  misconception: 'छात्र अक्सर सोचते हैं कि पात्र‑चित्रण में केवल पात्र के बाहरी लक्षण (जैसे उम्र, पोशाक, दिखावे) लिख देने से काम चल जाएगा, जबकि बोर्ड परीक्षा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि पात्र‑चित्रण के चार आयाम हैं: (1) बाह्य दिखावे, (2) कार्य, (3) संवाद/विचार, (4) संबंध। फिर पाठ से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_005', difficulty: 'standard',
          question: '\'माता का अँचल\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटके: **c10_hin_kr_cbse_13_004 (नायक/प्रमुख पात्र चित्रण)** दोहराएँ — विशेष रूप से.',
          misconception: '**विशिष्ट भ्रम**: छात्र सहायक पात्रों का चित्रण करते समय **केवल उनके गुण (अच्छे/बुरे) गिनाते हैं** — जैसे "पिता सख्त.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' के सहायक पात्र',
                  options: ['\'माता का अँचल\' के सहायक पात्र', '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **c10_hin_kr_cbse_13_004 (नायक/प्रमुख पात्र चित्रण)** दोहराएँ — विशेष रूप से PEEL संरचना.',
                  misconception: '**विशिष्ट भ्रम**: छात्र सहायक पात्रों का चित्रण करते समय **केवल उनके गुण (अच्छे/बुरे) गिनाते हैं** — जैसे "पिता सख्त थे, भाई शरारती थे".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ खोलो, पिता/भाई/ग्रामीणों के **हर प्रसंग को पेंसिल से घेरो** जहाँ वे बोलते या कार्य करते हैं।" 2.', 'प्रत्येक घेरे के आगे लिखें: **क्या गुण पता चलता है?** (उदाहरण: "पिता ने डाँटा → अनुशासनप्रिय")। 3.', 'फिर लिखें: **इससे माँ/बालक की छवि कैसे बदलती है?** (उदाहरण: "पिता की डाँट से माँ का अँचल अधिक सुरक्षित लगा")। 4.', 'अंत में **PEEL संरचना** में उत्तर लिखने का अभ्यास कराएँ: Point → Evidence → Explanation → Link।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_006', difficulty: 'standard',
          question: '\'माता का अँचल\' का मुख्य विषय — \'माता का अँचल\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अटके तो c10_hin_kr_cbse_13_004 और 005 के \'पात्र-व्यवहार सारणी\' (character behavior.',
          misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'मुख्य विषय\' (main theme)** और **\'कथानक का सार\' (plot summary)** को एक समझ लेते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' का मुख्य विषय',
                  options: ['\'माता का अँचल\' का मुख्य विषय', '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_kr_cbse_13_004 और 005 के \'पात्र-व्यवहार सारणी\' (character behavior chart) की.',
                  misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'मुख्य विषय\' (main theme)** और **\'कथानक का सार\' (plot summary)** को एक समझ लेते हैं। वे लिखते हैं: "लेखक.' }
          ],
            remediations: { 'main-theme-plot-summary': { steps: ['**चरण 1**: छात्र से कहो — "पाठ की 5 प्रमुख घटनाएँ लिखो।" (वह लिखेगा)। **चरण 2**: अब पूछो — "इन पाँचों में **क्या समान.', 'माँ क्या **कर रही है** हर बार?" (वह कहेगा — "प्यार/रक्षा")। **चरण 3**: कहो — "उसी समानता को **एक वाक्य में** बिना किसी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
