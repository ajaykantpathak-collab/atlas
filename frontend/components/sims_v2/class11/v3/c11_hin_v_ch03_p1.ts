import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch03_p1: SimDef = {
    id: 'v3_c11_hin_v_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'Watch a domestic worker cross the line from serving stories to writing one.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c11_hin_v_ch03'],
    nodeIds: ['c11_hin_v_cbse_03_001', 'c11_hin_v_cbse_03_002', 'c11_hin_v_cbse_03_003', 'c11_hin_v_cbse_03_004', 'c11_hin_v_cbse_03_005', 'c11_hin_v_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader inside a Partition-displaced woman\'s first-person voice', intro: 'A widowed domestic worker in a lawyer\'s Delhi household gets a notebook — and the household\'s power arrangement quietly inverts.', goal: 'Analyse autobiographical fiction\'s blurred boundaries and the story\'s arc toward self-expression.' },
    discovery: {
        question: '\'Sobti wrote this to show how hard life was for poor women in the 1950s\' — what does that reading miss?',
        options: ['That autobiographical fiction is crafted, not documented — blurred author-narrator lines, fragmented memory, and tactical silence are the strategy', 'Nothing — it\'s plain social reporting', 'That she invented the suffering entirely', 'That domestic work was actually easy then'],
        answer: 'That autobiographical fiction is crafted, not documented — blurred author-narrator lines, fragmented memory, and tactical silence are the strategy',
        hook: 'The protagonist performs the \'good servant\' when it suits her and refuses questions when it doesn\'t — resistance here is tactical, not absolute.',
    },
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त (Biography), रचनाकालीन सामाजिक-ऐतिहासिक-राजनीतिक परिस्थितियाँ (Socio-historical context), रचनाकार की साहित्यिक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the inciting incident — the lawyer\'s wife handing over a notebook — and defend the climax where a servant reads her own story aloud.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_v_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 1/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे.', answer: '3 -', options: ['3 -', '3 -'] },
            { id: 's2', label: '3 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है.', answer: '3 -', options: ['3 -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading group discusses Krishna Sobti\'s \'व्यक्ति\' — a widowed domestic worker in a lawyer\'s household narrating her own life. A member says: \'It\'s a simple sad life story — husband left, children grew, mother died. Nothing literary about it.\'',
            decisions: [{ prompt: 'What makes the text a literary act, not just a sad story?', options: [
                { text: 'Locate the conditions of possibility: a Partition-displaced Punjabi woman writing first-person domestic labour in 1950s Hindi — when few women published such narratives — is itself the claim: voice claimed where the tradition erased working-class women. And the structure mirrors the theme: external events (gaining literacy, writing her story) run parallel to the internal arc of finding her voice — the first-person \'मैं\' is the point.', outcome: 'The group sees it: the \'simple\' plot is deliberately arranged so that learning to write IS the climax — testimony becoming literature.' },
                { text: 'Agree it\'s just a life story — summarise the events and move on.', outcome: 'Event-listing confuses story with plot: the husband\'s death is backstory, literacy is the causal spine — selection and arrangement are the authorial design.', reveals: 'just-a-sad-life-story' },
                { text: 'Call it autobiography — Sobti is describing her own life in a lawyer\'s house.', outcome: 'First-person voice isn\'t autobiography: Sobti constructs a persona — a domestic worker narrating — and the act of writing within the story dramatises that construction.', reveals: 'first-person-means-autobiography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'The notebook and pen turn a worker into an author — the climax isn\'t publication, it\'s being heard by the person who gave them.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के.',
          hint: 'यदि छात्र अज्ञेय के जीवन-क्रम में उलझें, तो **NCERT पाठ्यपुस्तक \'वितान\' भाग-1 के पाठ 3 के.',
          misconception: '**विशिष्ट भ्रांति:** "पृष्ठभूमि और रचनाकार परिचय का अर्थ है — लेखक का जन्म, मृत्यु, शिक्षा, प्रमुख रचनाएँ और पुरस्कारों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त',
                  options: ['पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें प्रमुख पात्र (नायक)'],
                  hint: 'यदि छात्र अज्ञेय के जीवन-क्रम में उलझें, तो **NCERT पाठ्यपुस्तक \'वितान\' भाग-1 के पाठ 3 के आरंभ में.',
                  misconception: '**विशिष्ट भ्रांति:** "पृष्ठभूमि और रचनाकार परिचय का अर्थ है — लेखक का जन्म, मृत्यु, शिक्षा, प्रमुख रचनाएँ और पुरस्कारों की सूची रट लेना।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1: भ्रांति तोड़ना (5 मिनट):** छात्र से पूछें — "अगर मुझे तुम्हारी जन्मतिथि, स्कूल और प्रिय विषय पता चल जाए, तो.', '→ यातना जानी, एकांत मिला, आत्म-संवाद हुआ → पाठ में नायक का आंतरिक द्वंद्व यहीं से आया।" **चरण 3: मैट्रिक्स बनाना (15.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_002', difficulty: 'standard',
          question: 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है.',
          hint: 'यदि छात्र कथानक और आख्यान में अंतर करने में कठिनाई महसूस कर रहा है, तो उसे "घटनाओं की.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कथानक में घटनाएँ समय के अनुसार नहीं हैं (जैसे फ्लैशबैक या फॉरवर्ड), तो इसका मतलब है कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे',
                  options: ['कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें प्रमुख पात्र (नायक)'],
                  hint: 'यदि छात्र कथानक और आख्यान में अंतर करने में कठिनाई महसूस कर रहा है, तो उसे "घटनाओं की सूची बनाना".',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कथानक में घटनाएँ समय के अनुसार नहीं हैं (जैसे फ्लैशबैक या फॉरवर्ड), तो इसका मतलब है कि कथानक स्वयं टूटा हुआ या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "क्या आपने कभी ऐसा देखा कि कोई फिल्म ट्रेलर में क्लाइमैक्स दिखाती है, फिर कहती है \'इस तक कैसे.', 'नहीं—केवल हम उनका अनुभव बदलता है।" फिर एक सरल कथानक दें (जैसे: बच्चा स्कूल जाता है → परीक्षा में फेल हो जाता है → घर.', 'नहीं—हमने केवल आख्यान बदल दिया। अब, इस क्रम से क्या भाव बदलता है?', 'शायद अब हमें लगता है कि बच्चा गलत नहीं, systém गलत है।" इस प्रकार, कथानक को स्थिर (लेखक द्वारा चुनी गई घटनाओं का सेट).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र.',
          hint: 'यदि अटका हुआ महसूस हो तो **कथानक-सारांश (Plot Summary)** दोबारा लिखें और प्रत्येक घटना के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र \'पाठ्य-परिवेश\' को **स्थिर पृष्ठभूमि (Static Backdrop)** मानते हैं जिसे लेखक कहानी शुरू होने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है',
                  options: ['पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कथानक-सारांश (Plot Summary)** दोबारा लिखें और प्रत्येक घटना के आगे.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र \'पाठ्य-परिवेश\' को **स्थिर पृष्ठभूमि (Static Backdrop)** मानते हैं जिसे लेखक कहानी शुरू होने से पहले \'सेट\' कर.' }
          ],
            remediations: { 'static-backdrop-dynamic': { steps: ['**चरण 1:** छात्र को एक छोटा गद्यांश दें (5-6 वाक्य) और कहें: *"केवल वे शब्द/वाक्यांश रेखांकित करो जो तुम्हें बताते हैं.', '**चरण 2:** पूछें: *"यदि काल बदल जाए (दिन→रात), तो कौन-से शब्द बदलेंगे?', 'यदि सामाजिक स्थिति बदल जाए (ऊँची जाति→दलित), तो मनोदशा कैसे बदलेगी?"* — **काउंटरफैक्टुअल तर्क (Counterfactual.', '**चरण 3:** छात्र से कहें: *"अब इसी स्थान का परिवेश-चित्रण दो अलग-अलग काल/मनोदशा में लिखो।"* — इससे परिवेश की गतिशीलता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें प्रमुख.',
          hint: 'यदि अटके तो **c11_hin_v_cbse_03_002 (कथानक और आख्यान-संरचना)** दोहराएँ — विशेषकर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'पात्र-चित्रण\' = \'गुणों की सूची (List of Traits) + प्रशंसा/निंदा\'**। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें प्रमुख पात्र (नायक)',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें प्रमुख पात्र (नायक)', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_03_002 (कथानक और आख्यान-संरचना)** दोहराएँ — विशेषकर **\'उत्कर्ष.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'पात्र-चित्रण\' = \'गुणों की सूची (List of Traits) + प्रशंसा/निंदा\'**। **गलत तर्क का उदाहरण:**.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**चरणबद्ध सुधार (Remediation):** 1.', '**पहला चरण:** छात्र से कहें — "पाठ खोलो और नायक के **किसी एक गुण** के लिए **ठीक 3 साक्ष्य** ढूँढ़ो: एक संवाद, एक कार्य.', '**दूसरा चरण:** प्रत्येक साक्ष्य के आगे लिखवाएँ: **"यह साक्ष्य इस गुण को कैसे सिद्ध करता है?"** — उत्तर **एक वाक्य** में.', '**तीसरा चरण:** अब कहें — "इन तीनों को जोड़कर **एक अनुच्छेद** लिखो जो **PEEL** संरचना में हो।" (संरचना देना सिखाता है)।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 004 (नायक चित्रण)** के \'चरित्र-चाप\' और \'आंतरिक संघर्ष\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों को **\'कम महत्वपूर्ण\' (less important)** मानते हैं क्योंकि शब्द में \'सहायक\' लगा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 004 (नायक चित्रण)** के \'चरित्र-चाप\' और \'आंतरिक संघर्ष\' अनुभाग को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों को **\'कम महत्वपूर्ण\' (less important)** मानते हैं क्योंकि शब्द में \'सहायक\' लगा है। वे सोचते हैं कि.' }
          ],
            remediations: { 'less-important-1-2-3': { steps: ['**पुनर्नामकरण अभ्यास:** छात्र से कहें — "आज से इन्हें \'सहायक पात्र\' नहीं, **\'संरचनात्मक पात्र\' (Structural.', '**विलोपन परीक्षण (Deletion Test):** पाठ का एक दृश्य लें, एक सहायक पात्र को मानसिक रूप से हटाएँ और पूछें — "अब नायक का.', 'कथानक में क्या छूटेगा?" लिखित में 3 अंतर नोट करवाएँ। 3.', '**कार्य-सारणी (Function Table) बनवाएँ:** स्तंभ — पात्र नाम | प्रकार (फॉयल/कॉन्फिडेंट/एंटागोनिस्ट/चोरस) | नायक पर प्रभाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जो संपूर्ण रचना में.',
          hint: 'यदि अटके, तो node 004 (पात्र-चित्रण: नायक) के \'आंतरिक संघर्ष\' खंड को दोहराएँ — वही विषय.',
          misconception: '**विषय = संदेश = नीति-वाक्य (Moral)** — यह सबसे घातक भ्रांति है। छात्र पाठ 3 पढ़कर लिखते हैं: "मुख्य विषय: ईमानदारी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जो संपूर्ण रचना में सूत्र की',
                  options: ['मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जो संपूर्ण रचना में सूत्र की', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि अटके, तो node 004 (पात्र-चित्रण: नायक) के \'आंतरिक संघर्ष\' खंड को दोहराएँ — वही विषय की कुंजी है।',
                  misconception: '**विषय = संदेश = नीति-वाक्य (Moral)** — यह सबसे घातक भ्रांति है। छात्र पाठ 3 पढ़कर लिखते हैं: "मुख्य विषय: ईमानदारी सर्वोत्तम नीति है" या.' }
          ],
            remediations: { 'moral-3-class-10-3': { steps: ['**चरण 1:** छात्र से कहें: "पाठ के तीन निर्णायक क्षण (turning points) लिखो जहाँ नायक के पास दो रास्ते थे।" — यदि वह केवल.', '**चरण 2:** प्रत्येक क्षण पर पूछें: "नायक ने *क्यों* चुना?', 'सिद्धांत से?" — उत्तर \'सिद्धांत\' हो तो विषय की ओर संकेत करता है। 3.', '**चरण 3:** अब कहें: "इन तीनों चुनावों को जोड़ने वाला एक *संज्ञा-वाक्यांश* लिखो (क्रिया नहीं, विशेषण नहीं)।" — यही विषय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
