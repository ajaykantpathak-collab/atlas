import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch13_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch13_p1',
    title: 'पहलवान की ढोलक · Part 1/3',
    subtitle: 'The king knew his name; the new order didn\'t',
    classLevel: 12, subject: 'hin_ar', topic: 'पहलवान की ढोलक · Part 1/3',
    chapters: ['c12_hin_ar_ch13'],
    nodeIds: ['c12_hin_ar_cbse_13_001', 'c12_hin_ar_cbse_13_002', 'c12_hin_ar_cbse_13_003', 'c12_hin_ar_cbse_13_004', 'c12_hin_ar_cbse_13_005', 'c12_hin_ar_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A folk singer\'s world ran on patronage and memory. Then the rules changed — and rules don\'t remember anyone.', goal: 'Read Dwivedi\'s story as the collision of feudal patronage and institutional modernity through a folk artist\'s fate.' },
    discovery: {
        question: 'A folk singer thrives under a king\'s patronage — then a new system of laws arrives that recognises neither his art nor his claim. What actually changed?',
        options: ['Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority', 'Just the ruler changed', 'The singer lost his voice', 'Art became free'],
        answer: 'Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority',
        hook: 'Dwivedi pioneered experimental fiction in Hindi — folk speech, oral rhythm, the lives of common people rendered with documentary warmth. The story isn\'t nostalgia for kings; it stages the collision where \'the system\' replaced \'the sovereign\' — and nobody told the artist.',
    },
    teaching: [
        { title: 'पहलवान की ढोलक — पृष्ठभूमि और रचनाकार परिचय', text: '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के लोक-जीवन में रचे-बसे एक ढोलकवादक पहलवान के माध्यम से **लोक-कला की उपेक्षा, कलाकार की सामाजिक-आर्थिक विडंबना और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch a folk artist meet the new order: weigh the king\'s court against bureaucratic law, track how art becomes \'profession\' under pressure, and find where dignity survives the transition.',
        labels: ['पहलवान की ढोलक —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A folk singer from your district gets signed by a big label that drops her dialect, renames her, and reworks her songs into a commercial formula. Two years later she returns to perform in a hometown she barely recognises — and only family gathers to listen.',
            decisions: [{ prompt: 'How does \'युगुक की ढोलकी\' / the flautist\'s tale frame her trajectory?', options: [
                { text: 'As ironic return — the village flautist\'s music was the community\'s lifeblood until court patronage lifted him out; he comes back to a transformed village where his art survives only as a private act for grandchildren — the circle closes but the commons is gone.', outcome: 'The chapter\'s structural point is that the ending mirrors the opening with the centre shifted: patronage didn\'t just elevate the artist, it displaced the audience — her homecoming performance is the same image, emptied.' },
                { text: 'As a success story — she gained a platform the village could never give her, so the arc is upward.', outcome: 'That reads the rise and skips the resolution\'s irony: the flautist also \'rose\' to court, and the story counts what the rise cost — a village waking to sirens instead of music isn\'t the same audience at a new address.', reveals: 'platform-equals-progress' },
                { text: 'As proof she should never have left — artists who take patronage are sellouts.', outcome: 'The story doesn\'t damn the move; it mourns the structural change — the new order that renamed the village and industrialised its rhythm. The artist didn\'t sell the community; the ground under it was sold around both.', reveals: 'patronage-equals-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a period story as a study of systems changing — and spot the person caught between the old legitimacy and the new.',
            decisions: [{ prompt: 'What comes next? पहलवान की ढोलक · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पहलवान की ढोलक · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_001', difficulty: 'standard',
          question: '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण.',
          hint: 'यदि आँचलिकता स्पष्ट न हो, तो कक्षा 11 आरोह पाठ 13 (c11_hin_ar_cbse_13_001) के \'रचनाकार.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि \'पहलवान की ढोलक\' **खेल-कूद या पहलवानी की कहानी** है क्योंकि शीर्षक में \'पहलवान\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के',
                  options: ['\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है जिसमें', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/उपन्यास के'],
                  hint: 'यदि आँचलिकता स्पष्ट न हो, तो कक्षा 11 आरोह पाठ 13 (c11_hin_ar_cbse_13_001) के \'रचनाकार परिचय\' खंड.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि \'पहलवान की ढोलक\' **खेल-कूद या पहलवानी की कहानी** है क्योंकि शीर्षक में \'पहलवान\' है। वे रेणु को केवल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** रेणु की **जीवनी** (जन्म, शिक्षा, पत्रकारिता, राजनीतिक सक्रियता, मैला आँचल का प्रकाशन) को एक पृष्ठ में.', '**दूसरा कदम:** \'मैला आँचल\' के **प्रथम दो पृष्ठ** पढ़ें — केवल भाषा की बनावट देखने के लिए (कितने देशज शब्द, कैसी लय.', '**तीसरा कदम:** शीर्षक \'पहलवान की ढोलक\' पर **5 मिनट चिंतन** करें: \'पहलवान\' और \'ढोलक\' को अलग-अलग प्रतीक मानकर उनके गुण.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_2 और 3 को फिर से हल करें — यदि अब उत्तर सटीक हों, तो आगे बढ़ें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि.',
          hint: 'यदि फंसे: कक्षा 11 के किसी भी गद्य पाठ (जैसे \'नमक का दारोगा\', \'अपना-अपना भाग्य\') का.',
          misconception: 'छात्र अक्सर मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' एक ही हैं — वे घटनाओं की सूची बनाकर समझते हैं कि उन्होंने संरचना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि',
                  options: ['कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि', '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है जिसमें', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/उपन्यास के'],
                  hint: 'यदि फंसे: कक्षा 11 के किसी भी गद्य पाठ (जैसे \'नमक का दारोगा\', \'अपना-अपना भाग्य\') का कथानक-संरचना.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' एक ही हैं — वे घटनाओं की सूची बनाकर समझते हैं कि उन्होंने संरचना विश्लेषण कर लिया।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "कहानी की 5 मुख्य घटनाएँ क्रम से लिखो" (कथानक)। चरण 2: फिर पूछो — "अब बताओ: लेखक ने पहली घटना.', 'पहलवान क्यों नहीं बोलता?" (आख्यान-संरचना)। चरण 3: छात्र को दो कॉलम बनाने को कहो: बाएँ \'घटना\' (क्या), दाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है.',
          hint: 'अगर परिवेश के घटक पहचानने में अटकें तो c11_hin_ar_cbse_13_003 के \'कार्यशाला अभ्यास\' खंड.',
          misconception: 'छात्र अक्सर \'पाठ्य-परिवेश\' को केवल \'कहानी जहाँ होती है वह स्थान\' (सेटिंग) मान लेते हैं और \'वातावरण\' को केवल \'मूड\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है जिसमें',
                  options: ['पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है जिसमें', '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/उपन्यास के'],
                  hint: 'अगर परिवेश के घटक पहचानने में अटकें तो c11_hin_ar_cbse_13_003 के \'कार्यशाला अभ्यास\' खंड को दोहराएँ.',
                  misconception: 'छात्र अक्सर \'पाठ्य-परिवेश\' को केवल \'कहानी जहाँ होती है वह स्थान\' (सेटिंग) मान लेते हैं और \'वातावरण\' को केवल \'मूड\' (उदासी/खुशी) समझते हैं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कहानी के तीन दृश्य (अखाड़ा, मेला, घर) दुबारा पढ़वाएँ और प्रत्येक में \'कौन-सी सामाजिक शक्ति काम कर रही है?\'.', 'फिर पूछें: \'यही पहलवान शहर के कॉलेज में होता तो क्या ढोलक बजा पाता?', 'क्यों/क्यों नहीं?\' — इससे परिवेश का निर्णायक प्रभाव स्पष्ट होगा। 3.', 'अंत में c11_hin_ar_cbse_13_003 (कक्षा 11 का \'पाठ्य-परिवेश और वातावरण\' नोड) दोहराएँ जहाँ \'परिवेश के घटक\' चरणबद्ध ढंग से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी.',
          hint: 'यदि फँस जाएँ तो **c11_hin_ar_cbse_13_004 (कक्षा 11 का पात्र-चित्रण नोड)** या.',
          misconception: '**सबसे घातक भ्रांति:** "पहलवान एक असफल पहलवान है जो बुढ़ापे में ढोलक बजाकर समय काटता है।" **वास्तविकता:** पहलवान ने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/उपन्यास के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/उपन्यास के', '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है जिसमें'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_ar_cbse_13_004 (कक्षा 11 का पात्र-चित्रण नोड)** या.',
                  misconception: '**सबसे घातक भ्रांति:** "पहलवान एक असफल पहलवान है जो बुढ़ापे में ढोलक बजाकर समय काटता है।" **वास्तविकता:** पहलवान ने पहलवानी **नहीं हारी**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read):** कहानी के केवल वे अंश पढ़ें जहाँ पहलवान ढोलक बजा रहा है (पैरा 4-7, 12-15) — उसकी उँगलियों, थाप.', '**तुलना-तालिका (Comparison Table):** दो कॉलम बनाएँ — बाएँ: \'गाँव वाले पहलवान को कैसे देखते हैं\' (बूढ़ा, बेकार, बोझ).', '**लिखित अभ्यास:** 100 शब्दों में लिखें: "पहलवान की ढोलक उसकी देह नहीं, आत्मा है।" 4.', '**पुनर्निदान (Re-diagnostic):** उपरोक्त DIAGNOSTIC_QUESTION_3 और 5 का उत्तर दोबारा दें — अबकी बार \'शरीर\' नहीं, \'कला\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक के चरित्र-चित्रण.',
          hint: 'यदि अटके तो c12_hin_ar_cbse_13_004 के WORKED_EXAMPLE_1 और WORKED_EXAMPLE_2 दोबारा हल करें.',
          misconception: 'छात्र मानते हैं कि सहायक पात्र केवल \'कहानी आगे बढ़ाने\' के लिए होते हैं, जबकि **पहलवान की ढोलक** में हर सहायक पात्र नायक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक के चरित्र-चित्रण,',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक के चरित्र-चित्रण,', '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है जिसमें'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_13_004 के WORKED_EXAMPLE_1 और WORKED_EXAMPLE_2 दोबारा हल करें — नायक के.',
                  misconception: 'छात्र मानते हैं कि सहायक पात्र केवल \'कहानी आगे बढ़ाने\' के लिए होते हैं, जबकि **पहलवान की ढोलक** में हर सहायक पात्र नायक के **द्वंद्व (शक्ति.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: पाठ के उन सभी अंशों को चिह्नित करें जहाँ पहलवान किसी अन्य पात्र से संवाद करता है या कोई उसके बारे में बोलता है।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_006', difficulty: 'standard',
          question: '"पहलवान की ढोलक" का मुख्य विषय **आडंबर बनाम यथार्थ का द्वंद्व** है, जहाँ नायक.',
          hint: 'यदि अटकें: c12_hin_ar_cbse_13_004 के "पहलवान का अंतर्द्वंद्व" खंड को दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि *"पहलवान ढोलक इसलिए फेंकता है क्योंकि वह उसे बजाना नहीं सीख पाया — यह असफलता की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पहलवान की ढोलक" का मुख्य विषय **आडंबर बनाम यथार्थ का द्वंद्व** है, जहाँ नायक अपनी झूठी',
                  options: ['"पहलवान की ढोलक" का मुख्य विषय **आडंबर बनाम यथार्थ का द्वंद्व** है, जहाँ नायक अपनी झूठी', '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है जिसमें'],
                  hint: 'यदि अटकें: c12_hin_ar_cbse_13_004 के "पहलवान का अंतर्द्वंद्व" खंड को दोबारा पढ़ें — विशेषकर वह अंश.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि *"पहलवान ढोलक इसलिए फेंकता है क्योंकि वह उसे बजाना नहीं सीख पाया — यह असफलता की कहानी है।"* **क्यों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** c12_hin_ar_cbse_13_004 (नायक पात्र-चित्रण) — पहलवान के आंतरिक द्वंद्व (पहलवानी vs कलाकार) के नोट्स.', '**महत्वपूर्ण प्रसंग चिह्नित करें:** पाठ में तीन प्रसंग ढूँढ़ें जहाँ पहलवान ढोलक का ज़िक्र करता है — प्रत्येक के सामने.', '**लिखित अभ्यास:** 80 शब्दों में उत्तर लिखें — "ढोलक फेंकना हार नहीं, जीत है" — PEEL संरचना में। 4.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_5 का उत्तर बिना देखे लिखें; फिर DIAGNOSTIC_ANSWER_5 से मिलाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
