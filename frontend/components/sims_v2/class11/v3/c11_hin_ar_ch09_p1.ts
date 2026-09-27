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
        { title: 'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के ऐतिहासिक-सामाजिक-सांस्कृतिक संदर्भ (पृष्ठभूमि) तथा रचनाकार के व्यक्तित्व, अनुभवों एवं साहित्यिक दृष्टिकोण (रचनाकार परिचय) का.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch Kabir teach disciples by silently weaving an odd pattern, then map why the lesson lands through action instead of explanation.',
        labels: ['पाठ 9 — पृष्ठभूमि', 'पाठ 9 — कथानक', 'पाठ 9 — पाठ्य-परिवेश', 'पाठ 9 — पात्र-चित्रण', 'पाठ 9 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 1/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — **कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों.', answer: '9 -', options: ['9 -', '9 -'] },
            { id: 's2', label: '9 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल.', answer: '9 -', options: ['9 -', '9 -'] }
          ] } },
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
          question: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के.',
          hint: 'यदि अटका हुआ महसूस करें तो: कक्षा 10 की हिंदी पाठ्यपुस्तक (क्षितिज/कृतिका) के किसी एक.',
          misconception: '**विशिष्ट भ्रांति**: छात्र प्रायः मान लेते हैं कि \'पृष्ठभूमि\' का अर्थ केवल \'ऐतिहासिक तथ्यों की सूची\' (इतिहास, तारीखें.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के',
                  options: ['पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,', 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार किसी पात्र'],
                  hint: 'यदि अटका हुआ महसूस करें तो: कक्षा 10 की हिंदी पाठ्यपुस्तक (क्षितिज/कृतिका) के किसी एक अध्याय का.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र प्रायः मान लेते हैं कि \'पृष्ठभूमि\' का अर्थ केवल \'ऐतिहासिक तथ्यों की सूची\' (इतिहास, तारीखें, घटनाएँ) है और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "श्यामलाल \'शिल्पी\' की किसी एक कहानी (जैसे \'निर्णय\' या \'अंधेरा\') का सार 5 पंक्तियों में लिखो।" 2.', 'फिर पूछें: "इस कहानी का कौन-सा पात्र या प्रसंग आपको अपने स्कूल/गाँव के किसी व्यक्ति/घटना की याद दिलाता है?" 3.', 'अब जोड़ें: "यही \'याद दिलाना\' ही लेखक का जीवन-अनुभव उसकी रचना में प्रवेश करने का मार्ग है — पाठ 9 में इसी प्रक्रिया को.', 'अंत में: एक टेबल बनवाएँ — बायाँ कॉलम: लेखक के जीवन के 3 अनुभव; दायाँ कॉलम: पाठ 9 के 3 संगत प्रसंग/विषय। इससे अमूर्त.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_002', difficulty: 'standard',
          question: '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect).',
          hint: 'यदि अटका हुआ लगे तो **जेरार्ड जेनेट के तीन प्रश्न** दोहराएँ: (1) क्रम (Order) — कालक्रम.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **कथानक (Plot)** को "कहानी का सारांश (Summary)" और **आख्यान-संरचना (Narrative Structure)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों',
                  options: ['**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,', 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार किसी पात्र'],
                  hint: 'यदि अटका हुआ लगे तो **जेरार्ड जेनेट के तीन प्रश्न** दोहराएँ: (1) क्रम (Order) — कालक्रम टूटा कहाँ?',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **कथानक (Plot)** को "कहानी का सारांश (Summary)" और **आख्यान-संरचना (Narrative Structure)** को.' }
          ],
            remediations: { 'plot-summary-narrative-structure': { steps: ['**चरण 1 — भेद स्पष्ट करो:** एक परिचित फिल्म (जैसे *Drishyam*) लो: कथानक = विजय ने लाश छिपाई, पुलिस जाँच करती है, अंत.', '**चरण 2 — शब्दावली दो:** **एनेलिप्सिस (Analepsis/Flashback), प्रोलेप्सिस (Prolepsis/Flashforward), फोकलाइज़ेशन.', '**चरण 3 — तालिका बनाओ:** दो कॉलम: "कथानक में क्रम" vs "पाठ में क्रम" — पंक्ति-दर-पंक्ति मिलान करो। जहाँ मेल न खाए, वहाँ.', '**चरण 4 — प्रभाव लिखो:** प्रत्येक युक्ति के लिए एक पंक्ति: "इससे पाठक को ______ अनुभव होता है क्योंकि ______"।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान.',
          hint: 'यदि अटका हुआ महसूस हो तो \'पृष्ठभूमि और रचनाकार परिचय\' (c11_hin_ar_cbse_09_001) दोबारा.',
          misconception: 'छात्र प्रायः \'परिवेश\' (Setting) को केवल भौगोलिक स्थान (गाँव, शहर, नदी, पहाड़) तक सीमित समझ लेते हैं और \'वातावरण\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,',
                  options: ['पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार किसी पात्र'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'पृष्ठभूमि और रचनाकार परिचय\' (c11_hin_ar_cbse_09_001) दोबारा पढ़ें.',
                  misconception: 'छात्र प्रायः \'परिवेश\' (Setting) को केवल भौगोलिक स्थान (गाँव, शहर, नदी, पहाड़) तक सीमित समझ लेते हैं और \'वातावरण\' (Atmosphere) को मौसम.' }
          ],
            remediations: { 'setting': { steps: ['चरण 1: छात्र को एक परिचित दृश्य (स्कूल का कॉरिडोर, बाज़ार, बस स्टॉप) दें और कहें: "इसके केवल भौतिक विवरण लिखो" — फिर.', 'किसे बैठने की जगह मिलती है, किसे नहीं?', 'समय का दबाव कैसा है?" — इससे वह परिवेश के अदृश्य घटक (Social Codes, Power Dynamics) देखेगा। चरण 2: उसी दृश्य के लिए दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार.',
          hint: 'अगर अटके तो \'पाठ्य-परिवेश और वातावरण\' नोड (c11_hin_ar_cbse_09_003) के \'परिवेश-चरित्र.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'नायक का चरित्र-चित्रण\' = \'नायक के गुणों की सूची बनाना\' (बहादुर, ईमानदार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार किसी पात्र',
                  options: ['पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार किसी पात्र', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'अगर अटके तो \'पाठ्य-परिवेश और वातावरण\' नोड (c11_hin_ar_cbse_09_003) के \'परिवेश-चरित्र अंतर्संबंध\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'नायक का चरित्र-चित्रण\' = \'नायक के गुणों की सूची बनाना\' (बहादुर, ईमानदार, संघर्षशील)। वे पाठ से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहें — "नायक के तीन **विशेषण** मत दीजिए; उसके तीन **निर्णायक क्षण** बताइए जहां उसने सक्रिय चुनाव.', '**दूसरा कदम:** हर क्षण के लिए पूछें — "यह चुनाव उसके **किस आंतरिक द्वंद्व** को हल करता है या उजागर करता है?" (डर बनाम.', '**तीसरा कदम:** छात्र को **PEEL पैराग्राफ** लिखने को कहें: Point (चरित्रगत अंतर्दृष्टि), Evidence (पाठ का प्रमाण).', '**चौथा कदम:** दो संस्करण दिखाएं — एक \'गुण-सूची\' उत्तर, एक \'विश्लेषणात्मक\' उत्तर — और छात्र से अंतर पहचानने को कहें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो प्रमुख पात्र.',
          hint: 'यदि अटके तो नोड 004 के \'कार्य किया गया उदाहरण\' (Worked Example) को दोबारा पढ़ें और वही.',
          misconception: 'छात्र अक्सर मानते हैं कि \'सहायक पात्र\' का विश्लेषण करते समय केवल नायक के संदर्भ में ही बात करनी चाहिए (जैसे "वह नायक की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो प्रमुख पात्र (नायक/नायिका) के',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो प्रमुख पात्र (नायक/नायिका) के', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो नोड 004 के \'कार्य किया गया उदाहरण\' (Worked Example) को दोबारा पढ़ें और वही चरण सहायक.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'सहायक पात्र\' का विश्लेषण करते समय केवल नायक के संदर्भ में ही बात करनी चाहिए (जैसे "वह नायक की मदद करता है"), जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 9 से एक सहायक पात्र चुनकर उसके **केवल 3 संवाद** ढूंढने को कहें जो नायक से **नहीं** बोले गए हों (जैसे किसी.', 'फिर पूछें: "इन संवादों से इस पात्र की **अपनी** कौन-सी चिंता/इच्छा/भय पता चलती है जो नायक से संबंधित नहीं?" 3.', 'छात्र को उस पात्र का **\'डे-इन-द-लाइफ\' (Day in the Life)** पैराग्राफ लिखने को कहें जब नायक दृश्य में न हो। 4.', 'अंत में दोनों विश्लेषणों को जोड़कर दिखाएं: "देखो, यह पात्र नायक के बिना भी \'जीवित\' है — यही स्वतंत्र अस्तित्व तुम्हारे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_006', difficulty: 'standard',
          question: '**मुख्य विषय (Central Theme)** रचना का वह केंद्रीय विचार या भाव है जो संपूर्ण.',
          hint: 'अगर अटके तो **c11_hin_ar_cbse_09_002 (कथानक)** और **c11_hin_ar_cbse_09_004 (नायक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य विषय\' पाठ का \'सारांश (Summary)\' होता है** — इसलिए वे कहानी दोहरा देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Central Theme)** रचना का वह केंद्रीय विचार या भाव है जो संपूर्ण कथानक,',
                  options: ['**मुख्य विषय (Central Theme)** रचना का वह केंद्रीय विचार या भाव है जो संपूर्ण कथानक,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'अगर अटके तो **c11_hin_ar_cbse_09_002 (कथानक)** और **c11_hin_ar_cbse_09_004 (नायक चित्रण)** दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य विषय\' पाठ का \'सारांश (Summary)\' होता है** — इसलिए वे कहानी दोहरा देते हैं। **गलत तर्क:**.' }
          ],
            remediations: { 'summary': { steps: ['**चरण 1:** छात्र से कहें — "पाठ का **एक वाक्य में सारांश** लिखो" (यह आसान है)। 2.', '**चरण 2:** फिर पूछें — "इस सारांश से लेखक **क्या कहना चाहता है** जो हर युग/देश पर लागू हो?" — यही **मुख्य विषय** है। 3.', '**चरण 3:** दो कॉलम बनवाएँ: बाएँ **\'क्या हुआ\' (घटनाएँ)**, दाएँ **\'क्या उभरा\' (विचार)** — दायाँ कॉलम ही विषय है। 4.', '**चरण 4:** अभ्यास: तीन अलग कहानियों के विषय एक जैसे (जैसे \'त्याग\') दिखाएँ — विषय की **सार्वभौमिकता** स्पष्ट होगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
