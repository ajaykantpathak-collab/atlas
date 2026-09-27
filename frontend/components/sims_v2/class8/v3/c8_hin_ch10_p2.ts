import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch10_p2: SimDef = {
    id: 'v3_c8_hin_ch10_p2',
    title: 'तरुण के स्वप्न · Part 2/3',
    subtitle: 'This node covers identification, tracing, and analytical explanation of sub-themes.',
    classLevel: 8, subject: 'hin', topic: 'तरुण के स्वप्न · Part 2/3',
    chapters: ['c8_hin_ch10'],
    nodeIds: ['c8_hin_cbse_10_007', 'c8_hin_cbse_10_008', 'c8_hin_cbse_10_009', 'c8_hin_cbse_10_010', 'c8_hin_cbse_10_011', 'c8_hin_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'Think about the last time you watched a family wedding — the main event is the marriage, but you also notice.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तरुण के स्वप्न — गौण विषय', text: 'गौण विषय (sub-themes) are secondary ideas or minor themes in a literary work that run parallel to the main theme, enrich the narrative texture, and often reflect broader social, emotional,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तरुण के स्वप्न —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_10_007', title: 'तरुण के स्वप्न — गौण विषय',
          caseStudy: { intro: 'Think about the last time you watched a family wedding — the main event is the marriage, but you also notice the nervous cousin fixing his turban, the aunt.',
            decisions: [{ prompt: '\'तरुण के स्वप्न\' में गौण विषय की परिभाषा अपने शब्दों में लिखिए।', options: [
                { text: 'गौण विषय वे छोटे-छोटे विषय या विचार हैं जो मुख्य विषय के साथ-साथ चलते हैं, कहानी को गहराई', outcome: 'गौण विषय वे छोटे-छोटे विषय या विचार हैं जो मुख्य विषय के साथ-साथ चलते हैं, कहानी को गहराई देते हैं.' },
                { text: 'छोटी बात = गौण विषय', outcome: 'Not quite — Students confuse **incidental details** (एक बार आने वाली छोटी बातें) with **sub-themes**.', reveals: 'students-confuse-incidental-details-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_10_012', title: 'तरुण के स्वप्न — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Think about the last time you texted a friend "I\'m fine" but you were actually upset — they had to *infer* your real feelings from your short replies and late.',
            decisions: [{ prompt: 'पाठ \'तरुण के स्वप्न\' में तरुण के पिता का व्यवसाय क्या है? (यह एक वस्तुनिष्ठ प्रश्न है — उत्तर पाठ में स्पष्ट लिखा है।)', options: [
                { text: 'तरुण के पिता एक साधारण क्लर्क (clerk) हैं जो दफ्तर में काम करते हैं। **गलत उत्तर का', outcome: 'तरुण के पिता एक साधारण क्लर्क (clerk) हैं जो दफ्तर में काम करते हैं। **गलत उत्तर का संकेत:** यदि.' },
                { text: 'आशय-सूचक', outcome: 'Not quite — Students believe "आशय-सूचक" means "give your personal opinion" — they write "मुझे लगता है तरुण आलसी.', reveals: 'means-give-your-personal-opinion' },
                { text: 'give your personal opinion', outcome: 'Not quite — Students believe "आशय-सूचक" means "give your personal opinion" — they write "मुझे लगता है तरुण आलसी.', reveals: 'means-give-your-personal-opinion' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through तरुण के स्वप्न like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? तरुण के स्वप्न · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तरुण के स्वप्न · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_007', difficulty: 'standard',
          question: 'गौण विषय (sub-themes) are secondary ideas or minor themes in a literary work.',
          hint: 'Review c8_hin_cbse_10_006 (मुख्य विषय और संदेश) — specifically the worked example.',
          misconception: 'Students confuse **incidental details** (एक बार आने वाली छोटी बातें) with **sub-themes** (पुनरावृत्त, विकसित, मुख्य.',
          parts: [
                { id: 'a', prompt: 'पाठ में तरुण के पिता की आर्थिक चिंता को गौण विषय क्यों माना जाए?', answer: 'पिता की आर्थिक चिंता एक गौण विषय है क्योंकि: (1) इसका अपना कथानक है',
                  options: ['पिता की आर्थिक चिंता एक गौण विषय है क्योंकि: (1) इसका अपना कथानक है', 'छोटी बात = गौण विषय'],
                  hint: 'Review c8_hin_cbse_10_006 (मुख्य विषय और संदेश) — specifically the worked example on tracing the.',
                  misconception: 'Students confuse **incidental details** (एक बार आने वाली छोटी बातें) with **sub-themes** (पुनरावृत्त, विकसित, मुख्य विषय से जुड़े लघु.' }
          ],
            remediations: { 'students-confuse-incidental-details-with': { steps: ['**पुनरावृत्ति खोज अभ्यास:** छात्र को पाठ के 10 पन्ने दें और कहें: "हर उस विचार/चिंता/संवाद को हाइलाइट करो जो 2+ बार आता.', '**चाप (arc) मैपिंग:** प्रत्येक उम्मीदवार के लिए 3 कॉलम बनाएँ: पहली बार, मध्य में, अंत में — क्या बदला?', 'अगर कोई बदलाव नहीं, तो गौण विषय नहीं। 3.', '**मुख्य विषय से लिंक टेस्ट:** पूछें: "अगर यह गौण विषय हटा दें, तो तरुण के सपने की कहानी कितनी बदलेगी?" अगर उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse **incidental details** (एक बार आने वाली छोटी बातें) with **sub-themes** (पुनरावृत्त, विकसित, मुख्य.',
          parts: [
                { id: 'a', prompt: 'क्या \'तरुण के स्वप्न\' में सहपाठियों का मजाक उड़ाना (peer mockery) एक गौण विषय है या केवल प्रसंगिक विवरण (incidental detail)?', answer: 'यह एक **गौण विषय** है, क्योंकि: (1) यह 3+ बार आता है',
                  options: ['यह एक **गौण विषय** है, क्योंकि: (1) यह 3+ बार आता है', 'छोटी बात = गौण विषय'],
                  hint: 'Review c8_hin_cbse_10_006 (मुख्य विषय और संदेश) — specifically the worked example on tracing the.',
                  misconception: 'Students confuse **incidental details** (एक बार आने वाली छोटी बातें) with **sub-themes** (पुनरावृत्त, विकसित, मुख्य विषय से जुड़े लघु.' }
          ],
            remediations: { 'students-confuse-incidental-details-with': { steps: ['**पुनरावृत्ति खोज अभ्यास:** छात्र को पाठ के 10 पन्ने दें और कहें: "हर उस विचार/चिंता/संवाद को हाइलाइट करो जो 2+ बार आता.', '**चाप (arc) मैपिंग:** प्रत्येक उम्मीदवार के लिए 3 कॉलम बनाएँ: पहली बार, मध्य में, अंत में — क्या बदला?', 'अगर कोई बदलाव नहीं, तो गौण विषय नहीं। 3.', '**मुख्य विषय से लिंक टेस्ट:** पूछें: "अगर यह गौण विषय हटा दें, तो तरुण के सपने की कहानी कितनी बदलेगी?" अगर उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** वह साहित्यिक युक्ति जिसमें शब्दों के माध्यम से पाठक की.',
          hint: 'यदि फँस जाएँ तो **कक्षा 7 के बिंब-रूपक नोड्स (c7_hin_cbse_XX_008)** का "पहचान अभ्यास" भाग.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **बिंब = केवल दृश्य वर्णन (visual description)** और **रूपक = फैंसी तुलना (fancy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** वह साहित्यिक युक्ति जिसमें शब्दों के माध्यम से पाठक की इंद्रियों',
                  options: ['**बिंब (Imagery):** वह साहित्यिक युक्ति जिसमें शब्दों के माध्यम से पाठक की इंद्रियों', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'यदि फँस जाएँ तो **कक्षा 7 के बिंब-रूपक नोड्स (c7_hin_cbse_XX_008)** का "पहचान अभ्यास" भाग दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **बिंब = केवल दृश्य वर्णन (visual description)** और **रूपक = फैंसी तुलना (fancy comparison)**।.' }
          ],
            remediations: { 'visual-description-fancy-comparison': { steps: ['**इंद्रीय-जागरूकता अभ्यास:** छात्र को आँखें बंद कराकर कहो: "अपने कमरे में अभी क्या **सूँघ** रहे हो?', 'त्वचा पर क्या **महसूस** हो रहा है?" — प्रत्येक संवेदना के लिए **एक शब्द/वाक्यांश** लिखवाओ। फिर कहो: "यही बिंब है — लेखक.', '**रूपक-शल्यक्रिया (metaphor surgery):** पाठ से एक रूपक लो (जैसे "यथार्थ एक हथौड़ा है")। छात्र से कहो: "हथौड़े के **पाँच.', 'कौन-से नहीं?" — इससे **गुण-स्थानांतरण (quality transfer)** स्पष्ट होगा। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_009', difficulty: 'standard',
          question: '**विरोधाभास** वह साहित्यिक युक्ति है जहाँ कथन का प्रत्यक्ष अर्थ और निहित अर्थ.',
          hint: 'यदि अटका हो तो c8_hin_cbse_10_008 (बिंब और रूपक) के \'चिह्नित करो → अर्थ निकालो → विषय से.',
          misconception: 'छात्र अक्सर **विरोधाभास** को केवल \'वाक्य में उल्टा अर्थ\' (जैसे "वह बुद्धिमान मूर्ख है") तक सीमित कर देते हैं, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** वह साहित्यिक युक्ति है जहाँ कथन का प्रत्यक्ष अर्थ और निहित अर्थ या',
                  options: ['**विरोधाभास** वह साहित्यिक युक्ति है जहाँ कथन का प्रत्यक्ष अर्थ और निहित अर्थ या', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'यदि अटका हो तो c8_hin_cbse_10_008 (बिंब और रूपक) के \'चिह्नित करो → अर्थ निकालो → विषय से जोड़ो\' चरण.',
                  misconception: 'छात्र अक्सर **विरोधाभास** को केवल \'वाक्य में उल्टा अर्थ\' (जैसे "वह बुद्धिमान मूर्ख है") तक सीमित कर देते हैं, जबकि \'तरुण के स्वप्न\' में यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के दो विशिष्ट अंश दें: एक जहाँ तरुण सोचता कुछ है/करता कुछ (विरोधाभास), दूसरा जहाँ कोई वस्तु बार-बार आती है.', 'पूछें: "यहाँ शब्द और कर्म में क्या अंतर है?" → विरोधाभास स्पष्ट होगा। 3.', 'फिर पूछें: "यह वस्तु (जैसे घड़ी/कैलेंडर) केवल घड़ी है या कुछ और बताती है?', 'क्या हर बार एक-सा अर्थ देती है?" → प्रतीक की पुनरावृत्ति और अर्थ-विस्तार समझ आएगा। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द होते हैं जो पाठ के केंद्रीय भाव.',
          hint: 'अगर अटके तो कक्षा 7 के किसी भी पाठ की पदावली (जैसे c7_hin_cbse_03_010) खोलकर.',
          misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' = \'कठिन शब्द जिनके अर्थ परीक्षा में पूछे जाते हैं\'। इसलिए वे केवल शब्दकोश अर्थ रट लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द होते हैं जो पाठ के केंद्रीय भाव, पात्र की',
                  options: ['पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द होते हैं जो पाठ के केंद्रीय भाव, पात्र की', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'अगर अटके तो कक्षा 7 के किसी भी पाठ की पदावली (जैसे c7_hin_cbse_03_010) खोलकर \'शब्द-प्रसंग-भावार्थ\'.',
                  misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' = \'कठिन शब्द जिनके अर्थ परीक्षा में पूछे जाते हैं\'। इसलिए वे केवल शब्दकोश अर्थ रट लेते हैं। **असल भ्रम:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "पाठ खोलो, वह वाक्य ढूंढो जहां \'जिजीविषा\' आया है। वाक्य जोर से पढ़ो — कौन-सा शब्द इसकी जगह ले सकता है.', 'जब वह \'आशा/इच्छा\' बोले, लिखवाओ: \'जिजीविषा = जीने की *तीव्र* लालसा\'। 3.', 'पूछो: "तीव्रता हटने से तरुण का चित्र कैसे बदलता है?" 4.', 'फिर दोहराओ: हर मुख्य शब्द के साथ — **प्रसंग ढूंढो, विकल्प आजमाओ, भाव-हानि नापो**।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्द चयन, वाक्य संरचना, शैलीगत.',
          hint: 'यदि अटके तो c8_hin_cbse_10_010 (पदावली) और कक्षा 7 के व्याकरण नोड्स (c7_hin_cbse_01_011).',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का विश्लेषण करने का अर्थ है पाठ में आए कठिन शब्दों के अर्थ लिखना या व्याकरण के नियम.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्द चयन, वाक्य संरचना, शैलीगत उपकरणों (जैसे',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्द चयन, वाक्य संरचना, शैलीगत उपकरणों (जैसे', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'यदि अटके तो c8_hin_cbse_10_010 (पदावली) और कक्षा 7 के व्याकरण नोड्स (c7_hin_cbse_01_011) पर वापस.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का विश्लेषण करने का अर्थ है पाठ में आए कठिन शब्दों के अर्थ लिखना या व्याकरण के नियम (संधि, समास, कारक).' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से पाठ के दो विपरीत प्रसंग (जैसे प्रारंभ और अंत) पढ़वाएँ और पूछें — "तुम्हें क्या *महसूस* होता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न (Objective questions)** test factual recall directly stated.',
          hint: 'If stuck, review **c8_hin_cbse_10_002 (कथानक)** for plot clarity and **c8_hin_cbse_10_006.',
          misconception: 'Students believe "आशय-सूचक" means "give your personal opinion" — they write "मुझे लगता है तरुण आलसी था" (I think Tarun.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न (Objective questions)** test factual recall directly stated in the',
                  options: ['**वस्तुनिष्ठ प्रश्न (Objective questions)** test factual recall directly stated in the', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'If stuck, review **c8_hin_cbse_10_002 (कथानक)** for plot clarity and **c8_hin_cbse_10_006 (मुख्य.',
                  misconception: 'Students believe "आशय-सूचक" means "give your personal opinion" — they write "मुझे लगता है तरुण आलसी था" (I think Tarun was lazy) instead.' }
          ],
            remediations: { 'means-give-your-personal-opinion': { steps: ['**Model the difference:** Show two answers to "Why did Tarun dream of a bungalow?" — Weak: "Because he wanted money.".', '**Color-code practice:** Give 5 questions; student highlights objective stems (क्या, कौन, कब) in BLUE, inference stems.', '**Evidence hunt:** For one inference question, student must find 3 exact lines (with page/para ref) before writing.', '**Peer review:** Swap answers; partner checks: "Does every claim have a text reference?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
