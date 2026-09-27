import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch03_p2: SimDef = {
    id: 'v3_c11_hin_v_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'Watch a domestic worker cross the line from serving stories to writing one.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c11_hin_v_ch03'],
    nodeIds: ['c11_hin_v_cbse_03_007', 'c11_hin_v_cbse_03_008', 'c11_hin_v_cbse_03_009', 'c11_hin_v_cbse_03_010', 'c11_hin_v_cbse_03_011', 'c11_hin_v_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader inside a Partition-displaced woman\'s first-person voice', intro: 'A widowed domestic worker in a lawyer\'s Delhi household gets a notebook — and the household\'s power arrangement quietly inverts.', goal: 'Analyse autobiographical fiction\'s blurred boundaries and the story\'s arc toward self-expression.' },
    discovery: {
        question: '\'Sobti wrote this to show how hard life was for poor women in the 1950s\' — what does that reading miss?',
        options: ['That autobiographical fiction is crafted, not documented — blurred author-narrator lines, fragmented memory, and tactical silence are the strategy', 'Nothing — it\'s plain social reporting', 'That she invented the suffering entirely', 'That domestic work was actually easy then'],
        answer: 'That autobiographical fiction is crafted, not documented — blurred author-narrator lines, fragmented memory, and tactical silence are the strategy',
        hook: 'The protagonist performs the \'good servant\' when it suits her and refuses questions when it doesn\'t — resistance here is tactical, not absolute.',
    },
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: 'गौण विषय (Sub-theme) किसी साहित्यिक कृति में वह द्वितीयक केंद्रीय विचार या भाव-धारा है जो मुख्य विषय (Main Theme) के समानांतर चलती है, उसे विस्तार देती है, उसके विभिन्न आयामों को उजागर करती है और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the inciting incident — the lawyer\'s wife handing over a notebook — and defend the climax where a servant reads her own story aloud.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_012', title: 'पाठ 3 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'You open your Board exam paper and see Question 2: "Why did the protagonist refuse the job offer?" (आशय-सूचक) and Question 1: "What was the name of the.',
            decisions: [{ prompt: 'पाठ 3 के आधार पर: "लेखक ने जिस गाँव का वर्णन किया है, उसका नाम क्या है?" — यह किस प्रकार का प्रश्न है? अपने उत्तर का कारण स्पष्ट कीजिए।', options: [
                { text: '**Correct Answer:** यह **वस्तुनिष्ठ प्रश्न (Objective Question)** है। कारण: इसका उत्तर', outcome: '**Correct Answer:** यह **वस्तुनिष्ठ प्रश्न (Objective Question)** है। कारण: इसका उत्तर पाठ में एक.' },
                { text: 'आशय-सूचक', outcome: 'Not quite — **विशिष्ट भ्रांति:** "आशय-सूचक प्रश्नों का उत्तर पाठ में *कहीं न कहीं छिपा* होता है, बस सही.', reveals: 'wrong-idea' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading group discusses Krishna Sobti\'s \'व्यक्ति\' — a widowed domestic worker in a lawyer\'s household narrating her own life. A member says: \'It\'s a simple sad life story — husband left, children grew, mother died. Nothing literary about it.\'',
            decisions: [{ prompt: 'What makes the text a literary act, not just a sad story?', options: [
                { text: 'Locate the conditions of possibility: a Partition-displaced Punjabi woman writing first-person domestic labour in 1950s Hindi — when few women published such narratives — is itself the claim: voice claimed where the tradition erased working-class women. And the structure mirrors the theme: external events (gaining literacy, writing her story) run parallel to the internal arc of finding her voice — the first-person \'मैं\' is the point.', outcome: 'The group sees it: the \'simple\' plot is deliberately arranged so that learning to write IS the climax — testimony becoming literature.' },
                { text: 'Agree it\'s just a life story — summarise the events and move on.', outcome: 'Event-listing confuses story with plot: the husband\'s death is backstory, literacy is the causal spine — selection and arrangement are the authorial design.', reveals: 'just-a-sad-life-story' },
                { text: 'Call it autobiography — Sobti is describing her own life in a lawyer\'s house.', outcome: 'First-person voice isn\'t autobiography: Sobti constructs a persona — a domestic worker narrating — and the act of writing within the story dramatises that construction.', reveals: 'first-person-means-autobiography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'The notebook and pen turn a worker into an author — the climax isn\'t publication, it\'s being heard by the person who gave them.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) किसी साहित्यिक कृति में वह द्वितीयक केंद्रीय विचार या.',
          hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो नोड c11_hin_v_cbse_03_006 (मुख्य विषय और संदेश) पर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि गौण विषय = \'कहानी में आने वाले अन्य प्रसंग/सब-प्लॉट\' (sub-plots)। **गलत तर्क:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) किसी साहित्यिक कृति में वह द्वितीयक केंद्रीय विचार या भाव-धारा है जो',
                  options: ['गौण विषय (Sub-theme) किसी साहित्यिक कृति में वह द्वितीयक केंद्रीय विचार या भाव-धारा है जो', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो नोड c11_hin_v_cbse_03_006 (मुख्य विषय और संदेश) पर लौटकर \'थीम.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि गौण विषय = \'कहानी में आने वाले अन्य प्रसंग/सब-प्लॉट\' (sub-plots)। **गलत तर्क:** "मेले का वर्णन एक.' }
          ],
            remediations: { 'sub-plots-event': { steps: ['**लक्षित उपचार (3 चरण):** 1.', '**भेद स्पष्ट करें:** छात्र से कहें — "पाठ से 3 घटनाएँ लिखो (क्या हुआ)। फिर प्रत्येक घटना से पूछो: \'यह घटना किस बड़े.', '**मुख्य विषय से जोड़ने का अभ्यास:** प्रत्येक पहचाने गए विचार के लिए पूछें — "यह विचार \'बाजारवाद vs मानवीयता\' मुख्य विषय.', 'समानांतर चलता है?" लिखित उत्तर लें। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_008', difficulty: 'standard',
          question: 'बिंब (Imagery) शब्दों के माध्यम से पाठक की पांचों इंद्रियों (दृश्य, श्रव्य.',
          hint: 'यदि अटके तो कक्षा 10 की \'अलंकार\' पाठ्यसामग्री के \'उपमा-रूपक भेद\' भाग को दोहराएं, विशेषकर.',
          misconception: 'छात्र प्रायः बिंब (Imagery) को \'चित्रात्मक वर्णन\' (Descriptive writing) मान लेते हैं और केवल दृश्य बिंब (Visual.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Imagery) शब्दों के माध्यम से पाठक की पांचों इंद्रियों (दृश्य, श्रव्य, घ्राण,',
                  options: ['बिंब (Imagery) शब्दों के माध्यम से पाठक की पांचों इंद्रियों (दृश्य, श्रव्य, घ्राण,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि अटके तो कक्षा 10 की \'अलंकार\' पाठ्यसामग्री के \'उपमा-रूपक भेद\' भाग को दोहराएं, विशेषकर \'रूपक में.',
                  misconception: 'छात्र प्रायः बिंब (Imagery) को \'चित्रात्मक वर्णन\' (Descriptive writing) मान लेते हैं और केवल दृश्य बिंब (Visual imagery) पहचान पाते हैं.' }
          ],
            remediations: { 'imagery-descriptive-writing-visual-imagery': { steps: ['छात्र को 5 इंद्रियों के नाम लिखवाएं और प्रत्येक के लिए एक-एक शब्द दें जो केवल उस इंद्रिय को जगाता हो (जैसे: दृश्य-लाल.', 'फिर 3 सरल वाक्य दें: "वह फूल जैसा सुंदर है" (उपमा), "वह फूल है" (रूपक), "फूल खिला है" (साधारण कथन) — छात्र से अंतर.', 'पाठ के एक छोटे अंश में बिंब/रूपक मिलकर चिह्नित करवाएं, फिर छात्र से पूछें: "अगर यह बिंब/रूपक हटा दें तो बात कितनी कमजोर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली दृष्टि में असंगत.',
          hint: 'यदि अटका हुआ लगे: नोड 008 (बिंब और रूपक) के \'अन्यार्थ\' विश्लेषण चरण पर लौटें — वही कौशल.',
          misconception: 'छात्र प्रायः **विरोधाभास को \'विरोधाभासी शब्द-युग्म\' (oxymoron) समझ लेते हैं** — जैसे "मधुर कड़वाहट" — जबकि विरोधाभास.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली दृष्टि में असंगत, बेतुका या स्वयं',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली दृष्टि में असंगत, बेतुका या स्वयं', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि अटका हुआ लगे: नोड 008 (बिंब और रूपक) के \'अन्यार्थ\' विश्लेषण चरण पर लौटें — वही कौशल यहाँ गहरे.',
                  misconception: 'छात्र प्रायः **विरोधाभास को \'विरोधाभासी शब्द-युग्म\' (oxymoron) समझ लेते हैं** — जैसे "मधुर कड़वाहट" — जबकि विरोधाभास पूरा **वाक्य या.' }
          ],
            remediations: { 'oxymoron': { steps: ['छात्र को **विरोधाभास** समझाने के लिए: पाठ से एक विरोधाभास कथन लें → पूछें "पहली बार पढ़कर आपको क्या लगा?', 'क्यों?" → फिर पूछें "लेखक ने ऐसा *क्यों* लिखा होगा?', 'पात्र/स्थिति के बारे में क्या नया पता चलता है?" → इस प्रक्रिया को 3-4 उदाहरणों पर दोहराएं जब तक छात्र स्वयं \'शाब्दिक.', '**प्रतीक** के लिए: पाठ की एक प्रमुख वस्तु लें → तीन कॉलम बनाएं: \'यह क्या है?\' (शाब्दिक), \'पाठ में क्या करती है?\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द — किसी साहित्यिक कृति में प्रयुक्त वे **महत्वपूर्ण शब्द/पद**.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'शब्द-शक्ति (अभिधा/लक्षणा/व्यंजना)\'** की अवधारणा को **कक्षा.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"मुख्य शब्द = कठिन/अपरिचित शब्द"** और उन्हें केवल **शब्दकोश अर्थ (डिक्शनरी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द',
                  options: ['पदावली: मुख्य शब्द', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'शब्द-शक्ति (अभिधा/लक्षणा/व्यंजना)\'** की अवधारणा को **कक्षा 9-10 की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"मुख्य शब्द = कठिन/अपरिचित शब्द"** और उन्हें केवल **शब्दकोश अर्थ (डिक्शनरी मीनिंग)** याद करना है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पुनः पाठ-पठन (Re-reading):** छात्र से कहें — *"पाठ का वह अंश जोर से पढ़ो जहाँ यह शब्द आया है। आसपास के 3-4 वाक्य.', 'किस मनःस्थिति में?"* — **प्रसंग (context) सुनिश्चित करें।** 2.', '**शब्द-शक्ति पहचान (Identify semantic power):** पूछें — *"क्या शब्द अपने सामान्य अर्थ में है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा रचना के उद्देश्य, परिवेश और पात्रों.',
          hint: 'यदि फँसें तो **\'वाच्य परिवर्तन के अर्थ-परिवर्तन\' (Semantic shift in voice alternation)**.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'पाठ में भाषा-प्रयोग\' का अर्थ **\'कठिन/तत्सम शब्दों का प्रयोग\'** या **\'अलंकारों की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा रचना के उद्देश्य, परिवेश और पात्रों के अनुरूप',
                  options: ['पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा रचना के उद्देश्य, परिवेश और पात्रों के अनुरूप', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि फँसें तो **\'वाच्य परिवर्तन के अर्थ-परिवर्तन\' (Semantic shift in voice alternation)** और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'पाठ में भाषा-प्रयोग\' का अर्थ **\'कठिन/तत्सम शब्दों का प्रयोग\'** या **\'अलंकारों की भरमार\'** है। **गलत.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**विपरीत उदाहरण दें:** पाठ 3 के दो प्रसंग रखें — एक जहाँ सरल/बोली-भाषा प्रभावी है (जैसे ग्रामीण पात्र का विलाप), दूसरा.', '**\'क्यों\' पर जोर दें:** हर पहचाने गए भाषिक लक्षण (शब्द/वाक्य/वाच्य) के लिए छात्र से **"लेखक ने *यही* रूप क्यों चुना?', '*अन्य* विकल्प क्यों नहीं?"** पूछें — जब तक वह **कार्यात्मक औचित्य (Functional justification)** न दे दे। 3.', '**लघु पुनर्लेखन करवाएँ:** एक वाक्य दें (जैसे "वह गुस्सा था") और कहें: *"इसे तीन तरह से लिखो — (क) नैदानिक/तथ्यात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) पाठ में स्पष्टतः लिखित तथ्यात्मक.',
          hint: 'If stuck, review **c11_hin_v_cbse_03_009 (विरोधाभास और प्रतीक)** and.',
          misconception: '**विशिष्ट भ्रांति:** "आशय-सूचक प्रश्नों का उत्तर पाठ में *कहीं न कहीं छिपा* होता है, बस सही पैराग्राफ ढूँढ़ना पड़ता.',
          parts: [
                { id: 'a', prompt: 'पाठ 3 में एक प्रसंग है जहाँ नायक चुपचाप खिड़की से बाहर देख रहा है। प्रश्न: "इस प्रसंग में नायक की चुप्पी उसके किस आंतरिक द्वंद्व की ओर संकेत करती है?" — एक.', answer: '**Correct Answer:** छात्र ने **पाठ का पुनर्कथन (Retelling)** किया है, **व्याख्या',
                  options: ['**Correct Answer:** छात्र ने **पाठ का पुनर्कथन (Retelling)** किया है, **व्याख्या', 'किस आंतरिक द्वंद्व की ओर संकेत करती है'],
                  hint: 'If stuck, review **c11_hin_v_cbse_03_009 (विरोधाभास और प्रतीक)** and **c11_hin_v_cbse_03_006 (मुख्य.',
                  misconception: '**विशिष्ट भ्रांति:** "आशय-सूचक प्रश्नों का उत्तर पाठ में *कहीं न कहीं छिपा* होता है, बस सही पैराग्राफ ढूँढ़ना पड़ता है।" **गलत तर्क (Wrong.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (Targeted Remediation — 4 Steps):** 1.', '**Trigger Word Mapping (15 मिनट):** छात्र को 10 प्रश्न दें (मिश्रित: वस्तुनिष्ठ + आशय-सूचक)। उसे **केवल ट्रिगर शब्द.', 'Inference T-Chart (20 मिनट):** एक आशय-सूचक प्रश्न लें। बाएँ कॉलम में लिखें: "पाठ में क्या लिखा है?', '(Direct Quote/Paraphrase)"। दाएँ कॉलम में: "इससे क्या निष्कर्ष निकलता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
