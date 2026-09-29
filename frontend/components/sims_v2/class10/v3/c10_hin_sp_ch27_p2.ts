import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch27_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch27_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch27_p2',
    title: 'अब कहाँ दूसरे के दुख से दुखी होने वाले · Part 2/3',
    subtitle: 'यह नोड कहानी "अब कहाँ दूसरे के दुख से दुखी होने वाले" के **गौण विषयों** (जैसे: ग्रामीण.',
    classLevel: 10, subject: 'hin_sp', topic: 'अब कहाँ दूसरे के दुख से दुखी होने वाले · Part 2/3',
    chapters: ['c10_hin_sp_ch27'],
    nodeIds: ['c10_hin_sp_cbse_27_007', 'c10_hin_sp_cbse_27_008', 'c10_hin_sp_cbse_27_009', 'c10_hin_sp_cbse_27_010', 'c10_hin_sp_cbse_27_011', 'c10_hin_sp_cbse_27_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में अब-कहाँ-दूसरे-के-दुख-से-दुखी-होने-वाले जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'अब कहाँ दूसरे के दुख से दुखी होने वाले — गौण विषय', text: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_27_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['अब कहाँ दूसरे के'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_27_012', title: 'अब कहाँ दूसरे के दुख से दुखी होने वाले — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का केंद्रीय भाव और संदेश।',
            decisions: [{ prompt: 'पाठ \'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में \'वस्तुनिष्ठ प्रश्न\' (Vastunishtha Prashn) की पहचान क्या है?', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर पाठ्यांश से सीधे एक शब्द,', outcome: '**Correct Answer:** वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर पाठ्यांश से सीधे एक शब्द, एक वाक्यांश.' },
                { text: '2-3 lines', outcome: 'Not quite — **Specific Error:** Students treat **\'स्पष्ट कीजिए\' (Explain)** and **\'उदाहरण दीजिए\' (Give.', reveals: 'specific-error-students-treat-explain' },
                { text: 'explanation needed', outcome: 'Not quite — **Specific Error:** Students treat **\'स्पष्ट कीजिए\' (Explain)** and **\'उदाहरण दीजिए\' (Give.', reveals: 'specific-error-students-treat-explain' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_27_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through अब कहाँ दूसरे के दुख से दुखी होने वाले like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? अब कहाँ दूसरे के दुख से दुखी होने वाले · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — अब कहाँ दूसरे के दुख से दुखी होने वाले · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_007', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के गौण विषय — मुख्य विषय के साथ चलने.',
          hint: 'यदि अटके तो **नोड 006 (मुख्य विषय)** पर लौटें और "मानवीय संवेदना का ह्रास" को 3-4.',
          misconception: '**विशिष्ट भ्रांति**: "गौण विषय का अर्थ है \'कम महत्वपूर्ण विषय\' जिसे परीक्षा के लिए पढ़ने की जरूरत नहीं।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के गौण विषय',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के गौण विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **नोड 006 (मुख्य विषय)** पर लौटें और "मानवीय संवेदना का ह्रास" को 3-4 पंक्तियों में.',
                  misconception: '**विशिष्ट भ्रांति**: "गौण विषय का अर्थ है \'कम महत्वपूर्ण विषय\' जिसे परीक्षा के लिए पढ़ने की जरूरत नहीं।" **वास्तविकता**: CBSE बोर्ड परीक्षा.' }
          ],
            remediations: { 'cbse-3-secondary-minor': { steps: ['**शब्दार्थ स्पष्टीकरण**: छात्र को समझाएँ — "गौण" का अर्थ "दूसरे दर्जे का" नहीं, "मुख्य का सहारा बनने वाला" है। उदाहरण.', '**पाठ-आधारित खोज**: कहानी के 3-4 पन्ने खोलकर पूछें: "दयानंद के अलावा यहाँ और किसका दुख/संघर्ष दिख रहा है?" छात्र स्वयं.', '**संबंध-निर्माण अभ्यास**: प्रत्येक चिह्नित प्रसंग के लिए पूछें: "यह दयानंद की कहानी को कैसे बदलता/गहरा करता है?".', '**बोर्ड-प्रश्न अभ्यास**: पिछले 3 वर्षों के CBSE प्रश्नपत्रों से गौण विषय पर पूछे गए प्रश्न दिखाएँ और मार्किंग स्कीम से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_008', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में बिंब (imagery) — शब्दों से बने.',
          hint: 'यदि अटके: **कक्षा 9 अलंकार नोट्स** (उपमा/रूपक परिभाषा) और **नोड 27_006 (मुख्य विषय)**.',
          misconception: '**विशिष्ट भ्रम**: छात्र **\'बिंब\' को \'चित्रण मात्र\' समझते हैं** और **\'रूपक\' को \'सुंदर तुलना\' मानते हैं**। - **बिंब की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में बिंब (imagery)',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **कक्षा 9 अलंकार नोट्स** (उपमा/रूपक परिभाषा) और **नोड 27_006 (मुख्य विषय)** दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रम**: छात्र **\'बिंब\' को \'चित्रण मात्र\' समझते हैं** और **\'रूपक\' को \'सुंदर तुलना\' मानते हैं**। - **बिंब की त्रुटि**: "लाल गुलाब".' }
          ],
            remediations: { 'wrong-idea': { steps: ['**बिंब के लिए**: छात्र को 5 रंगीन कार्ड दें (👁️ दृश्य, 👂 श्रव्य, 👃 घ्राण, 👅 स्वाद, ✋ स्पर्श)। पाठ की हर पंक्ति.', '**रूपक के लिए**: दो कॉलम बनाएं — बायां: उपमेय (विषय), दायां: उपमान (तुलना)। 10 वाक्य दें (मिश्रित उपमा+रूपक)। छात्र से.', '**संयुक्त अभ्यास**: एक भाव (जैसे: भय) दें। छात्र लिखे: 1 रूपक + 3 बिंब (अलग इंद्रियाँ)। शिक्षक जांचे: क्या रूपक में.', 'क्या बिंब इंद्रिय-विशिष्ट हैं?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_009', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में विरोधाभास — विपरीत बातें मिलकर.',
          hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_27_008 (साहित्यिक युक्तियाँ: सामान्य परिचय).',
          misconception: 'छात्र अक्सर **विरोधाभास** को केवल "विरोधी शब्दों का मेल" (जैसे \'जीवन-मरण\', \'सुख-दुख\') मान लेते हैं और यह भूल जाते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में विरोधाभास',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में विरोधाभास', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_27_008 (साहित्यिक युक्तियाँ: सामान्य परिचय) दोहराएँ और पाठ.',
                  misconception: 'छात्र अक्सर **विरोधाभास** को केवल "विरोधी शब्दों का मेल" (जैसे \'जीवन-मरण\', \'सुख-दुख\') मान लेते हैं और यह भूल जाते हैं कि पाठ में विरोधाभास.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: छात्र को पाठ के दो पैराग्राफ जोर से पढ़ने को कहो और पूछो — "कहीं ऐसा लगा कि लेखक जो कह रहा है, स्थिति उसके उलट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_010', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' की पदावली — मुख्य शब्द और प्रयोग जो.',
          hint: 'यदि अटके तो **शब्द-शक्ति (अभिधा/लक्षणा/व्यंजना) की परिभाषा और उदाहरण** दोहराएँ (कक्षा 9.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **"मुख्य शब्द = कठिन/तत्सम/लंबे शब्द"** या **"मुख्य शब्द = अलंकार वाले शब्द"**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' की पदावली',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' की पदावली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **शब्द-शक्ति (अभिधा/लक्षणा/व्यंजना) की परिभाषा और उदाहरण** दोहराएँ (कक्षा 9 हिंदी.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **"मुख्य शब्द = कठिन/तत्सम/लंबे शब्द"** या **"मुख्य शब्द = अलंकार वाले शब्द"**। **वास्तविकता**: पाठ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "पाठ का कोई एक वाक्य चुनो जिसमें तुम्हें **सबसे ज्यादा चुभन/प्रभाव** लगा हो। उस वाक्य के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_011', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने.',
          hint: 'Review Class 9 Hindi Vyakaran: "वाक्य विचार" (वाच्य, वाक्य-रूपांतरण), "शब्द विचार".',
          misconception: 'Students treat "भाषा-प्रयोग" questions as **vocabulary definition exercises** — they memorize meanings of tough words.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में भाषा-प्रयोग',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' में भाषा-प्रयोग', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review Class 9 Hindi Vyakaran: "वाक्य विचार" (वाच्य, वाक्य-रूपांतरण), "शब्द विचार" (तत्सम/तद्भव.',
                  misconception: 'Students treat "भाषा-प्रयोग" questions as **vocabulary definition exercises** — they memorize meanings of tough words (e.g., "निर्मम.' }
          ],
            remediations: { 'students-treat-questions-as-vocabulary': { steps: ['** Pick ONE sentence from the text that felt powerful. Write it down. **', '** Replace its keywords with simpler synonyms (Tadbhav/Urdu). Read both aloud. **', '** Ask: "What *feeling* died when I swapped the word?" Note that feeling (e.g., "gravity," "permanence," "clinical.', '** Write one line: "लेखक ने ___ शब्द इसलिए चुना क्योंकि वह ___ भाव जगाता है जो ___ शब्द नहीं जगा पाता।" Repeat for 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_012', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में.',
          hint: 'If stuck, review **Node 006 (मुख्य विषय)** to list the 3-4 core themes, and **Node 008.',
          misconception: '**Specific Error:** Students treat **\'स्पष्ट कीजिए\' (Explain)** and **\'उदाहरण दीजिए\' (Give examples)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **Node 006 (मुख्य विषय)** to list the 3-4 core themes, and **Node 008 (साहित्यिक.',
                  misconception: '**Specific Error:** Students treat **\'स्पष्ट कीजिए\' (Explain)** and **\'उदाहरण दीजिए\' (Give examples)** as interchangeable instructions.' }
          ],
            remediations: { 'specific-error-students-treat-explain': { steps: ['**Targeted Fix (3-Step Remediation):** 1.', '**Color-Code Drill:** Take 5 past board Ashay-Suchak questions.', 'Highlight the **Question Word** (क्यों/कैसे/स्पष्ट कीजिए) in **RED**, the **Evidence** quoted in answer in **GREEN**.', 'If BLUE is missing → the answer is incomplete.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
