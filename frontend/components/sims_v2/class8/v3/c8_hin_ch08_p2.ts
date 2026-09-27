import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch08_p2: SimDef = {
    id: 'v3_c8_hin_ch08_p2',
    title: 'पाठ 8 · Part 2/3',
    subtitle: 'इस नोड में केवल गौण विषयों की पहचान, प्रमाण-आधारित विश्लेषण, और मुख्य विषय से उनके संबंध.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 8 · Part 2/3',
    chapters: ['c8_hin_ch08'],
    nodeIds: ['c8_hin_cbse_08_007', 'c8_hin_cbse_08_008', 'c8_hin_cbse_08_009', 'c8_hin_cbse_08_010', 'c8_hin_cbse_08_011', 'c8_hin_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'आपने कभी गौर किया है कि किसी फिल्म में हीरो का मुख्य लक्ष्य (जैसे: खजाना ढूंढना) होता है, लेकिन साथ-साथ उसकी.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — गौण विषय', text: 'गौण विषय (Sub-theme) वे सहायक विचार या प्रसंग हैं जो पाठ के मुख्य विषय को सहारा देते हैं, उसे गहराई देते हैं, और पात्रों या स्थितियों के विभिन्न आयाम उजागर करते हैं; ये मुख्य विषय से अलग स्वतंत्र.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — गौण', 'पाठ 8 — साहित्यिक', 'पाठ 8 — पदावली', 'पाठ 8 — व्याकरण', 'पाठ 8 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_08_012', title: 'पाठ 8 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'You\'ve just finished reading a chapter from Malhar and your teacher asks, "What happened to the protagonist?" — easy, you recall the event.',
            decisions: [{ prompt: 'पाठ में दिए गए किसी विशिष्ट तथ्य (जैसे: पात्र का नाम, घटना का वर्ष, स्थान) को पहचानने वाले प्रश्न किस श्रेणी में आते हैं?', options: [
                { text: 'ये वस्तुनिष्ठ प्रश्न (objective questions) की श्रेणी में आते हैं क्योंकि इनका उत्तर पाठ', outcome: 'ये वस्तुनिष्ठ प्रश्न (objective questions) की श्रेणी में आते हैं क्योंकि इनका उत्तर पाठ में स्पष्ट.' },
                { text: 'opinion questions', outcome: 'Not quite — Students believe interpretive questions (आशय-सूचक) are "opinion questions" where any answer.', reveals: 'interpretive-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वे सहायक विचार या प्रसंग हैं जो पाठ के मुख्य विषय को सहारा.',
          hint: 'यदि अटके तो नोड c8_hin_cbse_08_006 (मुख्य विषय और संदेश) पर लौटें और मुख्य विषय को एक.',
          misconception: 'छात्र अक्सर **कथानक की उप-घटनाओं (sub-plots) को गौण विषय मान लेते हैं** — जैसे "नायक का बीमार पड़ना" या "गाँव में मेला.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वे सहायक विचार या प्रसंग हैं जो पाठ के मुख्य विषय को सहारा देते हैं,',
                  options: ['गौण विषय (Sub-theme) वे सहायक विचार या प्रसंग हैं जो पाठ के मुख्य विषय को सहारा देते हैं,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'यदि अटके तो नोड c8_hin_cbse_08_006 (मुख्य विषय और संदेश) पर लौटें और मुख्य विषय को एक वाक्य में.',
                  misconception: 'छात्र अक्सर **कथानक की उप-घटनाओं (sub-plots) को गौण विषय मान लेते हैं** — जैसे "नायक का बीमार पड़ना" या "गाँव में मेला लगना"। वे भूल जाते.' }
          ],
            remediations: { 'sub-plots': { steps: ['छात्र को पाठ के **तीन प्रमुख दृश्य** चुनने को कहें (शुरुआत, मध्य, अंत)। 2.', 'प्रत्येक दृश्य में पूछें: *"यहाँ मुख्य विषय (जैसे संघर्ष) के अलावा कौन-सा **मूल्य या भाव** काम कर रहा है?"* — उत्तर एक.', 'उन शब्दों को गिनें: जो **कम से कम दो दृश्यों में** आए, वही गौण विषय के दावेदार हैं। 4.', 'फिर प्रत्येक दावेदार के लिए पूछें: *"यह मुख्य विषय को कैसे बदलता/बढ़ाता है?"* — लिखित उत्तर लें। यही चरण गौण विषय को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_008', difficulty: 'standard',
          question: '**बिंब** शब्दों द्वारा पाठक के मन में किसी दृश्य, ध्वनि, गंध, स्पर्श या स्वाद.',
          hint: 'यदि अटके तो कक्षा 7 के किसी भी पाठ (c7_hin_cbse_01_008 से c7_hin_cbse_08_008) के \'बिंब और.',
          misconception: 'छात्र अक्सर **\'जैसे/वैसे/सा/सी\' वाले पदबंध को रूपक मान लेते हैं** (उदाहरण: "वह शेर जैसा बहादुर है" को रूपक कहना)।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब** शब्दों द्वारा पाठक के मन में किसी दृश्य, ध्वनि, गंध, स्पर्श या स्वाद का सजीव',
                  options: ['**बिंब** शब्दों द्वारा पाठक के मन में किसी दृश्य, ध्वनि, गंध, स्पर्श या स्वाद का सजीव', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'यदि अटके तो कक्षा 7 के किसी भी पाठ (c7_hin_cbse_01_008 से c7_hin_cbse_08_008) के \'बिंब और रूपक\' खंड.',
                  misconception: 'छात्र अक्सर **\'जैसे/वैसे/सा/सी\' वाले पदबंध को रूपक मान लेते हैं** (उदाहरण: "वह शेर जैसा बहादुर है" को रूपक कहना)। वास्तव में यह **उपमा**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — इंद्रिय-अभ्यास:** छात्र को आँख बंद कराकर एक वस्तु (आम, बारिश, रसोई की गंध) दें और पाँचों इंद्रियों के शब्द.', '**चरण 2 — रूपक-शल्यक्रिया:** 5 उपमा-वाक्य दें ("चाँद चाँदी जैसा है") और छात्र से \'जैसे\' हटाकर रूपक बनाने को कहें ("चाँद.', '**चरण 3 — सूक्ष्म विश्लेषण:** पाठ्यपुस्तक के एक काव्यांश में 2 बिंब और 1 रूपक चिह्नित करवाएँ, फिर लिखवाएँ: "कवि ने X की.', '**चरण 4 — सृजन:** छात्र स्वयं एक रूपक गढ़ें और समझाएँ कि वह नया अर्थ कैसे रचता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_009', difficulty: 'standard',
          question: '**विरोधाभास** एक साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन या विचार एक.',
          hint: 'यदि अटका हुआ लगे तो कक्षा ७ के पाठ ८ (c7_hin_cbse_08_009) के विरोधाभास/प्रतीक उदाहरणों को.',
          misconception: 'छात्र विरोधाभास को "विरोधाभासी कथन" मात्र समझते हैं और उसे तर्क-दोष (logical fallacy) मान बैठते हैं, जबकि साहित्य में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** एक साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन या विचार एक साथ रखे जाते',
                  options: ['**विरोधाभास** एक साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन या विचार एक साथ रखे जाते', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा ७ के पाठ ८ (c7_hin_cbse_08_009) के विरोधाभास/प्रतीक उदाहरणों को दोबारा.',
                  misconception: 'छात्र विरोधाभास को "विरोधाभासी कथन" मात्र समझते हैं और उसे तर्क-दोष (logical fallacy) मान बैठते हैं, जबकि साहित्य में वह **सार्थक.' }
          ],
            remediations: { 'logical-fallacy': { steps: ['चरण 1: छात्र को दो वाक्य दो — एक साधारण विरोधी वाक्य ("वह आया और नहीं आया") और एक साहित्यिक विरोधाभास ("उसकी अनुपस्थिति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत **मुख्य शब्द** वे विशिष्ट शब्द/पद होते हैं जो पाठ के केंद्रीय.',
          hint: 'यदि अटके तो **c8_hin_cbse_08_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विषय स्पष्ट होते.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य शब्द = कठिन/क्लिष्ट शब्द\'**। इसलिए वे केवल उन शब्दों को चुनते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत **मुख्य शब्द** वे विशिष्ट शब्द/पद होते हैं जो पाठ के केंद्रीय भाव,',
                  options: ['पदावली के अंतर्गत **मुख्य शब्द** वे विशिष्ट शब्द/पद होते हैं जो पाठ के केंद्रीय भाव,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'यदि अटके तो **c8_hin_cbse_08_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विषय स्पष्ट होते ही.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य शब्द = कठिन/क्लिष्ट शब्द\'**। इसलिए वे केवल उन शब्दों को चुनते हैं जिनका उच्चारण कठिन हो या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़वाएँ** — छात्र से कहें: "पाठ 8 का वह अंश पढ़ो जहाँ पात्र सबसे अधिक व्याकुल/उत्साहित/निर्णायक है; वहाँ आए.', '**\'सरल शब्द, गहरा अर्थ\' अभ्यास** — \'आँसू\' शब्द लो: शब्दकोश अर्थ लिखवाओ, फिर पाठ-प्रसंग अर्थ पूछो, फिर पूछो: "कवि ने.', '**तुलना चार्ट बनवाएँ** — तीन स्तंभ: शब्द | शब्दकोश अर्थ | पाठ-प्रसंग अर्थ + भाव-चित्र। 5 शब्दों के लिए भरवाएँ। 4.', '**फीडबैक लूप** — अगले दिन वही 5 शब्द देकर मौखिक पूछें: "इस शब्द ने पाठ में क्या **काम** किया?" — यदि \'काम\' (function).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दों, पदों.',
          hint: 'यदि अटका हुआ लगे तो **कक्षा 7 के व्याकरण नोड (c7_hin_cbse_07_011) के \'वाच्य-परिवर्तन\' और.',
          misconception: 'छात्र मानते हैं कि **व्याकरणिक रूप (काल, वाच्य, पद, वाक्य-रचना) केवल \'नियम\' हैं जिनका पालन करना होता है**, जबकि सच यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दों, पदों, वाक्य-रचनाओं, काल,',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दों, पदों, वाक्य-रचनाओं, काल,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'यदि अटका हुआ लगे तो **कक्षा 7 के व्याकरण नोड (c7_hin_cbse_07_011) के \'वाच्य-परिवर्तन\' और.',
                  misconception: 'छात्र मानते हैं कि **व्याकरणिक रूप (काल, वाच्य, पद, वाक्य-रचना) केवल \'नियम\' हैं जिनका पालन करना होता है**, जबकि सच यह है कि **प्रत्येक रूप.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 8 के **केवल 3 वाक्य** दें जिनमें स्पष्ट व्याकरणिक विशेषता हो (जैसे: एक कर्मवाच्य, एक अपूर्ण काल, एक.', 'प्रत्येक के लिए पूछें: **"अगर लेखक इसे बदल दे (कर्तृवाच्य/सामान्य काल/सरल वाक्य), तो क्या बदलेगा?"** — छात्र को.', 'उसके उत्तर में यदि वह केवल \'अर्थ वही रहेगा\' लिखे, तो **दोनों वाक्य जोर से पढ़वाएँ** और पूछें: **"कौन-सा वाक्य ज्यादा.', 'अंत में **सूत्र दें**: *व्याकरणिक रूप + संदर्भ = प्रभाव* — इसे कॉपी में लिखवाकर 3 नए वाक्यों पर आजमाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (objective questions) test factual recall of explicit details.',
          hint: 'If stuck, review c8_hin_cbse_08_002 (कथानक) for event sequencing and c8_hin_cbse_08_004.',
          misconception: 'Students believe interpretive questions (आशय-सूचक) are "opinion questions" where any answer is acceptable if justified.',
          parts: [
                { id: 'a', prompt: 'नीचे दिए गए अंश को पढ़कर वस्तुनिष्ठ और आशय-सूचक — दोनों प्रकार का एक-एक प्रश्न बनाइए: "रमेश ने दरवाज़ा खोला। बाहर तूफ़ान था। उसने बिना कुछ कहे दरवाज़ा बंद कर.', answer: 'वस्तुनिष्ठ: "रमेश ने दरवाज़ा खोलने के बाद क्या किया?"',
                  options: ['वस्तुनिष्ठ: "रमेश ने दरवाज़ा खोलने के बाद क्या किया?"', 'opinion questions'],
                  hint: 'If stuck, review c8_hin_cbse_08_002 (कथानक) for event sequencing and c8_hin_cbse_08_004.',
                  misconception: 'Students believe interpretive questions (आशय-सूचक) are "opinion questions" where any answer is acceptable if justified vaguely.' }
          ],
            remediations: { 'interpretive-questions-are-opinion-questions': { steps: ['Give the student a 3-line passage and ask: "Find ONE word that proves the character is angry." — force them to locate.', 'Model the PEEL structure aloud: "Point: He is angry. Evidence: \'उसके हाथ काँप रहे थे\' (line 4).', 'Practice with 3 more passages — each time, student must highlight evidence before writing.', 'Show a weak answer (opinion-only) vs strong answer (evidence-based) side-by-side; ask student to grade both using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe interpretive questions (आशय-सूचक) are "opinion questions" where any answer is acceptable if justified.',
          parts: [
                { id: 'a', prompt: 'कथन: "आशय-सूचक प्रश्नों के उत्तर पाठ में नहीं होते, वे छात्र की कल्पना पर निर्भर करते हैं।" — इस कथन का मूल्यांकन कीजिए। सहमत हैं या असहमत? कारण सहित समझाइए।', answer: 'असहमत। आशय-सूचक प्रश्नों के उत्तर पाठ में \'छिपे\' होते हैं',
                  options: ['असहमत। आशय-सूचक प्रश्नों के उत्तर पाठ में \'छिपे\' होते हैं', 'opinion questions'],
                  hint: 'If stuck, review c8_hin_cbse_08_002 (कथानक) for event sequencing and c8_hin_cbse_08_004.',
                  misconception: 'Students believe interpretive questions (आशय-सूचक) are "opinion questions" where any answer is acceptable if justified vaguely.' }
          ],
            remediations: { 'interpretive-questions-are-opinion-questions': { steps: ['Give the student a 3-line passage and ask: "Find ONE word that proves the character is angry." — force them to locate.', 'Model the PEEL structure aloud: "Point: He is angry. Evidence: \'उसके हाथ काँप रहे थे\' (line 4).', 'Practice with 3 more passages — each time, student must highlight evidence before writing.', 'Show a weak answer (opinion-only) vs strong answer (evidence-based) side-by-side; ask student to grade both using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
