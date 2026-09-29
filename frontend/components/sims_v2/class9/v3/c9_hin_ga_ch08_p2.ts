import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch08_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch08_p2',
    title: 'पाठ 8 · Part 2/3',
    subtitle: 'This node covers identification, analysis, and evidence-based explanation of sub-themes.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 8 · Part 2/3',
    chapters: ['c9_hin_ga_ch08'],
    nodeIds: ['c9_hin_ga_cbse_08_007', 'c9_hin_ga_cbse_08_008', 'c9_hin_ga_cbse_08_009', 'c9_hin_ga_cbse_08_010', 'c9_hin_ga_cbse_08_011', 'c9_hin_ga_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'रैदास के पद\' में रैदास, पद, भक्ति, समानता जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पाठ 8 में एक प्रसंग है जहाँ कोई पात्र झूठ बोलता है, लेकिन पाठ में कहीं भी "उसने झूठ बोला" वाक्य नहीं आया। बोर्ड परीक्षा में पूछे गए प्रश्न "पात्र ने झूठ क्यों.',
        options: ['**Correct Answer:** 1', 'Keywords = Answer', 'उसके चेहरे पर मुस्कान थी, पर आँखें नम थीं।'],
        answer: '**Correct Answer:** 1',
        hook: '**The "Keywords = Answer" Trap:** Students believe that for आशय-सूचक questions, finding a \'keyword\' (like \'दुख\'.',
    },
    teaching: [
        { title: 'पाठ 8 — गौण विषय', text: '\'रैदास के पद\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — गौण', 'पाठ 8 — साहित्यिक', 'पाठ 8 — पदावली', 'पाठ 8 — व्याकरण', 'पाठ 8 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_08_012', title: 'पाठ 8 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'रैदास के पद\' के तथ्य: रचनाकार संत रविदास (रैदास), विषय रैदास के पद।',
            decisions: [{ prompt: 'पाठ 8 में \'वस्तुनिष्ठ प्रश्न\' की पहचान करने का सबसे सरल मानदंड (Criterion) क्या है?', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ प्रश्न का उत्तर पाठ में **स्पष्ट, शब्दशः (Verbatim) या', outcome: '**Correct Answer:** वस्तुनिष्ठ प्रश्न का उत्तर पाठ में **स्पष्ट, शब्दशः (Verbatim) या सीधे.' },
                { text: 'Short answer', outcome: 'Not quite — **The "Keywords = Answer" Trap:** Students believe that for आशय-सूचक questions, finding a \'keyword\'.', reveals: 'the-keywords-answer-trap-students' },
                { text: 'One-word answer', outcome: 'Not quite — **The "Keywords = Answer" Trap:** Students believe that for आशय-सूचक questions, finding a \'keyword\'.', reveals: 'the-keywords-answer-trap-students' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_08_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_007', difficulty: 'standard',
          question: '\'रैदास के पद\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'Review node c9_hin_ga_cbse_08_006 (मुख्य विषय और संदेश) — specifically the worked.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'गौण विषय\' को \'सहायक पात्र की व्यक्तिगत कहानी\' या \'उपकथानक\' (sub-plot) समझ लेते हैं। **गलत तर्क.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रैदास के पद\' के गौण विषय',
                  options: ['\'रैदास के पद\' के गौण विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का कथानक', '\'रैदास के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review node c9_hin_ga_cbse_08_006 (मुख्य विषय और संदेश) — specifically the worked examples on theme.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'गौण विषय\' को \'सहायक पात्र की व्यक्तिगत कहानी\' या \'उपकथानक\' (sub-plot) समझ लेते हैं। **गलत तर्क का उदाहरण:** "पाठ 8.' }
          ],
            remediations: { 'sub-plot-8': { steps: ['**स्पष्टीकरण:** छात्र के साथ बैठकर पाठ के एक पैराग्राफ को पढ़ें और पूछें: "यहाँ क्या *हो रहा है* (घटना) और क्या *झलक.', '**अभ्यास:** पाठ से 5 वाक्य चुनें, प्रत्येक के आगे लिखवाएँ: \'घटना\' या \'भाव/विचार\'। फिर केवल \'भाव/विचार\' वाले वाक्यों को.', '**सुदृढ़ीकरण:** एक परिचित फिल्म (जैसे \'लगान\') लें — मुख्य विषय: \'एकता से विजय\'; गौण विषय: \'जाति-प्रथा की जकड़न\' (घटना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_008', difficulty: 'standard',
          question: '\'रैदास के पद\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि बिंब-रूपक के अर्थ में confusion हो तो पाठ 6 (मुख्य विषय और संदेश) की अवधारणा दोबारा.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द भावनात्मक या वर्णनात्मक लगे (जैसे \'अँधेरा\', \'आग\', \'फूल\') तो वह स्वयं रूपक है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रैदास के पद\' में बिंब (imagery)',
                  options: ['\'रैदास के पद\' में बिंब (imagery)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का कथानक', '\'रैदास के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि बिंब-रूपक के अर्थ में confusion हो तो पाठ 6 (मुख्य विषय और संदेश) की अवधारणा दोबारा review करें.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द भावनात्मक या वर्णनात्मक लगे (जैसे \'अँधेरा\', \'आग\', \'फूल\') तो वह स्वयं रूपक है, जबकि वास्तव में वह बिंब.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए कि वह सबसे पहले वाक्य में वह शब्दunderline करे जो उसे दिखाई या कल्पना में आ रहा हो (जैसे आँख बंद करके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_009', difficulty: 'standard',
          question: '\'रैदास के पद\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 008 (बिंब और रूपक)** के \'रूपक बनाम प्रतीक\' तुलना चार्ट को.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को **विरोधाभास अलंकार (Oxymoron)** समझ लेते हैं — जैसे "मधुर कड़वाहट", "जीवित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रैदास के पद\' में विरोधाभास',
                  options: ['\'रैदास के पद\' में विरोधाभास', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का कथानक', '\'रैदास के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 008 (बिंब और रूपक)** के \'रूपक बनाम प्रतीक\' तुलना चार्ट को दोहराएँ और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को **विरोधाभास अलंकार (Oxymoron)** समझ लेते हैं — जैसे "मधुर कड़वाहट", "जीवित मृत" — और सोचते हैं कि.' }
          ],
            remediations: { 'oxymoron': { steps: ['**चरण 1:** छात्र को दो वाक्य दें — एक ऑक्सीमोरॉन ("कड़वी मिठास"), एक पैराडॉक्स ("चुप्पी बोलती है") — पूछें: "कौन सा.', 'कौन सा केवल दो शब्द जोड़ रहा है?" **चरण 2:** प्रतीक के लिए: पाठ से एक चित्र (जैसे \'पुराना पेड़\') लें, पूछें: "यह पेड़.', 'पाठ में यह कितनी बार, किन प्रसंगों में, किन भावों के साथ आया?" — एक टेबल बनवाएँ: प्रसंग | भाव | संभावित अर्थ। **चरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_010', difficulty: 'standard',
          question: '\'रैदास के पद\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **पाठ 8 का पुनर्पाठ (re-reading)** करें — विशेषकर वे अंश जहाँ **भाव घना** हो.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **"मुख्य शब्द = पाठ में आए सभी कठिन/तत्सम/संस्कृतनिष्ठ शब्द"**। **गलत तर्क का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रैदास के पद\' की पदावली',
                  options: ['\'रैदास के पद\' की पदावली', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का कथानक', '\'रैदास के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **पाठ 8 का पुनर्पाठ (re-reading)** करें — विशेषकर वे अंश जहाँ **भाव घना** हो (विरह.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **"मुख्य शब्द = पाठ में आए सभी कठिन/तत्सम/संस्कृतनिष्ठ शब्द"**। **गलत तर्क का स्रोत**: कक्षा 6-8 में.' }
          ],
            remediations: { '6-8': { steps: ['**प्रतिस्थापन गतिविधि (Substitution Activity)**: पाठ 8 के 5 वाक्य लें, प्रत्येक में एक संभावित मुख्य शब्द रेखांकित.', '**तुलनात्मक तालिका**: बोर्ड पर दो स्तंभ बनाएँ — "कठिन पर मुख्य नहीं" vs "मुख्य शब्द"। उदाहरण: "प्रतिपल" (कठिन, पर मुख्य.', '**लेखक-मनन (Authorial Intent)**: पूछें — "लेखक ने \'पिया\' क्यों लिखा, \'प्रियतम\' या \'पति\' क्यों नहीं?" — उत्तर में.', '**अभ्यास**: छात्र स्वयं 3 शब्द छाँटें और 4-चरणीय विश्लेषण (चयन → अर्थ → प्रतिस्थापन → निष्कर्ष) लिखें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_011', difficulty: 'standard',
          question: '\'रैदास के पद\' में भाषा-प्रयोग — संत रविदास (रैदास) ने कैसे शब्द, वाक्य और शैली.',
          hint: 'यदि अटके: **c9_hin_ga_cbse_08_004 (पात्र-चित्रण: नायक)** दोबारा पढ़ें और नायक की.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "भाषा-प्रयोग" का अर्थ केवल **कठिन/तत्सम शब्दों की पहचान करना** है (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रैदास के पद\' में भाषा-प्रयोग',
                  options: ['\'रैदास के पद\' में भाषा-प्रयोग', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का कथानक', '\'रैदास के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **c9_hin_ga_cbse_08_004 (पात्र-चित्रण: नायक)** दोबारा पढ़ें और नायक की \'प्रोफाइल\' (उम्र.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "भाषा-प्रयोग" का अर्थ केवल **कठिन/तत्सम शब्दों की पहचान करना** है (जैसे "उन्होंने \'प्रस्थान\' लिखा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (सुधार):** छात्र से कहें: "पाठ से 5 सबसे \'सरल/बोली वाले\' शब्द छांटो (जैसे: काका, भैया, का, नाहीं, चले)।" 2.', '**चरण 2 (विश्लेषण):** प्रत्येक शब्द के लिए पूछें: "अगर लेखक यहाँ \'चाचा\', \'भ्राता\', \'क्या\', \'नहीं\', \'गया\' लिख देता तो.', '**चरण 3 (सामान्यीकरण):** समझाएं: "भाषा-प्रयोग का विश्लेषण = **\'क्यों यह शब्द, यहाँ, अभी?\'** पूछना। कठिन शब्द भी एक.', '**चरण 4 (अभ्यास):** उन्हें एक औपचारिक पत्र और एक दोस्त को चिट्ठी लिखने को कहें; फिर दोनों के \'भाषा-प्रयोग\' की तुलना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_012', difficulty: 'standard',
          question: '\'रैदास के पद\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, re-read **Node 004 (पात्र-चित्रण: नायक)** focusing on the "Actions vs.',
          misconception: '**The "Keywords = Answer" Trap:** Students believe that for आशय-सूचक questions, finding a \'keyword\' (like \'दुख\'.',
          parts: [
                { id: 'a', prompt: 'पाठ 8 में एक प्रसंग है जहाँ कोई पात्र झूठ बोलता है, लेकिन पाठ में कहीं भी "उसने झूठ बोला" वाक्य नहीं आया। बोर्ड परीक्षा में पूछे गए प्रश्न "पात्र ने झूठ क्यों.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'Keywords = Answer', 'उसके चेहरे पर मुस्कान थी, पर आँखें नम थीं।', 'मुस्कान का आशय समझाइए।'],
                  hint: 'If stuck, re-read **Node 004 (पात्र-चित्रण: नायक)** focusing on the "Actions vs.',
                  misconception: '**The "Keywords = Answer" Trap:** Students believe that for आशय-सूचक questions, finding a \'keyword\' (like \'दुख\', \'क्रोध\', \'त्याग\') in the.' }
          ],
            remediations: { 'the-keywords-answer-trap-students': { steps: ['**Isolate the Skill:** Give the student **only 5 lines** from Chapter 8 (a dialogue + action).', 'Ask: "Write 1 वस्तुनिष्ठ Q & 1 आशय-सूचक Q on *just these lines*." This removes whole-chapter overwhelm.', '**Color-Code the Text:** Print the 5 lines.', '**Highlighter 1 (Yellow):** Facts (Names, objects, actions) → Label "वस्तुनिष्ठ खजाना".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
