import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch01_p2: SimDef = {
    id: 'v3_c6_hin_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'यह नोड केवल गौण विषयों तक सीमित है — बिंब/अलंकार अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c6_hin_ch01'],
    nodeIds: ['c6_hin_cbse_01_007', 'c6_hin_cbse_01_008', 'c6_hin_cbse_01_009', 'c6_hin_cbse_01_010', 'c6_hin_cbse_01_011', 'c6_hin_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '**तुम्हारे लिए:** मुख्य भाव के अलावा तीन छोटे भाव देखो — हर एक की अपनी पंक्ति है। **पुनःस्मरण:** नोड 6 से.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: 'गौण विषय: (1) प्रकृति की निर्मल सुंदरता — \'जगमग छटा निराली\'; (2) अनवरतता — \'नित सिंधु झूमता\'; (3) आध्यात्मिक विरासत — राम-सीता-कृष्ण-बुद्ध; (4) शांति/करुणा — \'जग को दया सिखाई\'।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 2/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — छंद-लय और भाषा — दोहराव-रीति \'वह ____ भूमि मेरी\' से लय-सृष्टि, गति-क्रियाएँ (\'झूमता\'.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न — तथ्य पाठ से सीधे: (1) हिंद महासागर के लिए \'सिंधु\' शब्द; (2) कवि.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_007', difficulty: 'standard',
          question: 'गौण विषय: (1) प्रकृति की निर्मल सुंदरता — \'जगमग छटा निराली\'; (2) अनवरतता — \'नित.',
          hint: 'यदि अटका हुआ महसूस हो तो: मुख्य विषय लिखिए, फिर दो ऐसी पंक्तियाँ जो उससे अलग भाव देती हैं.',
          misconception: '1. छात्र \'दया सिखाई\' को \'दयालुता\' (व्यक्ति-गुण) मानते हैं — यहाँ बुद्ध ने \'जग को\' दया सिखाई; संसार-स्तर की सीख। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय: (1) प्रकृति की निर्मल सुंदरता',
                  options: ['गौण विषय: (1) प्रकृति की निर्मल सुंदरता', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: मुख्य विषय लिखिए, फिर दो ऐसी पंक्तियाँ जो उससे अलग भाव देती हैं — वही गौण.',
                  misconception: '1. छात्र \'दया सिखाई\' को \'दयालुता\' (व्यक्ति-गुण) मानते हैं — यहाँ बुद्ध ने \'जग को\' दया सिखाई; संसार-स्तर की सीख। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) मुख्य विषय (मातृभूमि) से गौण विषय अलग करो। (2) \'दया\' और \'युद्ध\' का विरोध दिखाओ। (3) प्रकृति बनाम विरासत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_008', difficulty: 'standard',
          question: 'बिंब (imagery): \'आकाश चूमता हिमालय\' (ऊँचाई-दृश्य), \'नित सिंधु झूमता\'.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति पढ़िए, आँखें बंद करके देखिए — क्या दिखता है, क्या.',
          misconception: '1. छात्र \'आकाश चूमता\' को शाब्दिक सत्य मानते हैं — यह अतिशयोक्ति-बिंब है; पहाड़ सच में आकाश नहीं चूमता। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (imagery): \'आकाश चूमता हिमालय\' (ऊँचाई-दृश्य), \'नित सिंधु झूमता\' (समुद्र-दृश्य),',
                  options: ['बिंब (imagery): \'आकाश चूमता हिमालय\' (ऊँचाई-दृश्य), \'नित सिंधु झूमता\' (समुद्र-दृश्य),', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति पढ़िए, आँखें बंद करके देखिए — क्या दिखता है, क्या सुनाई देता.',
                  misconception: '1. छात्र \'आकाश चूमता\' को शाब्दिक सत्य मानते हैं — यह अतिशयोक्ति-बिंब है; पहाड़ सच में आकाश नहीं चूमता। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) पाँच इंद्रियों की सूची बनवाओ — दृश्य/श्रवण/स्पर्श/गंध/स्वाद। (2) हर बिंब को इंद्रिय से जोड़ो। (3) पंक्ति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_009', difficulty: 'standard',
          question: 'काव्य-युक्तियाँ और अलंकार — अतिशयोक्ति (\'आकाश चूमता\'), पुनरुक्ति/दोहराव (\'वह.',
          hint: 'यदि अटका हुआ महसूस हो तो: तीन अलंकारों की परिभाषा लिखिए, फिर कविता से उदाहरण खोजिए — \'सी\'.',
          misconception: '1. छात्र \'आकाश चूमता\' को \'उपमा\' कहते हैं — \'सी/समान\' नहीं है, अतिशयोक्ति है; असंभव विस्तार। 2. छात्र \'युद्ध-भूमि...',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-युक्तियाँ और अलंकार',
                  options: ['काव्य-युक्तियाँ और अलंकार', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: तीन अलंकारों की परिभाषा लिखिए, फिर कविता से उदाहरण खोजिए — \'सी\' देखकर.',
                  misconception: '1. छात्र \'आकाश चूमता\' को \'उपमा\' कहते हैं — \'सी/समान\' नहीं है, अतिशयोक्ति है; असंभव विस्तार। 2. छात्र \'युद्ध-भूमि...' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) अतिशयोक्ति बनाम उपमा बनाम रूपक का अंतर स्पष्ट करो। (2) \'दया\'-\'दिया\' लिखकर मात्रा-अंतर दिखाओ। (3) \'सी\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_010', difficulty: 'standard',
          question: 'पदावली — पाठ के मुख्य शब्द: सिंधु (महासागर), त्रिवेणी (तीन नदियों का संगम), छटा.',
          hint: 'यदि अटका हुआ महसूस हो तो: शब्द को टुकड़ों में तोड़िए — \'त्रि-वेणी\', \'सु-यश\', \'अधर\'.',
          misconception: '1. छात्र \'सिंधु\' को \'सिंधु नदी\' मानते हैं — यहाँ \'महासागर\'; पाठ का MCQ इसी पर है। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली — पाठ के मुख्य शब्द: सिंधु (महासागर), त्रिवेणी (तीन नदियों का संगम), छटा',
                  options: ['पदावली — पाठ के मुख्य शब्द: सिंधु (महासागर), त्रिवेणी (तीन नदियों का संगम), छटा', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: शब्द को टुकड़ों में तोड़िए — \'त्रि-वेणी\', \'सु-यश\', \'अधर\' = होंठ; संदर्भ.',
                  misconception: '1. छात्र \'सिंधु\' को \'सिंधु नदी\' मानते हैं — यहाँ \'महासागर\'; पाठ का MCQ इसी पर है। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) कठिन शब्दों की सूची बनवाओ। (2) संदर्भ से अर्थ निकालो (\'त्रिवेणी\' में \'त्रि\' = तीन)। (3) उपसर्ग-प्रत्यय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_011', difficulty: 'standard',
          question: 'छंद-लय और भाषा — दोहराव-रीति \'वह ____ भूमि मेरी\' से लय-सृष्टि, गति-क्रियाएँ.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक छंद पढ़िए, ताली से लय बजाइए — \'वह...मेरी\' की आवृत्ति सुनिए.',
          misconception: '1. छात्र \'दोहराव\' को \'लेखक की गलती\' मानते हैं — यह जानबूझकर लय-अलंकार है; भाव बढ़ाने की युक्ति। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद-लय और भाषा — दोहराव-रीति \'वह ____ भूमि मेरी\' से लय-सृष्टि, गति-क्रियाएँ (\'झूमता\',',
                  options: ['छंद-लय और भाषा — दोहराव-रीति \'वह ____ भूमि मेरी\' से लय-सृष्टि, गति-क्रियाएँ (\'झूमता\',', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक छंद पढ़िए, ताली से लय बजाइए — \'वह...मेरी\' की आवृत्ति सुनिए; भाषा का लय.',
                  misconception: '1. छात्र \'दोहराव\' को \'लेखक की गलती\' मानते हैं — यह जानबूझकर लय-अलंकार है; भाव बढ़ाने की युक्ति। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) छंद-खंड की संरचना दिखाओ (4 पंक्तियाँ)। (2) \'यमुन\' बनाम \'यमुना\' लिखकर मात्रा गिनवाओ। (3) आवृत्ति का कार्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न — तथ्य पाठ से सीधे: (1) हिंद महासागर के लिए \'सिंधु\' शब्द; (2).',
          hint: 'यदि अटका हुआ महसूस हो तो: प्रश्न का मुख्य शब्द (जैसे \'सिंधु\') पाठ में खोजिए — उत्तर वहीं.',
          misconception: '1. छात्र \'सिंधु\' को \'नदी\' मानते हैं — पाठ का वस्तुनिष्ठ प्रश्न \'सिंधु = महासागर\' ही है। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न',
                  options: ['वस्तुनिष्ठ प्रश्न', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: प्रश्न का मुख्य शब्द (जैसे \'सिंधु\') पाठ में खोजिए — उत्तर वहीं है।',
                  misconception: '1. छात्र \'सिंधु\' को \'नदी\' मानते हैं — पाठ का वस्तुनिष्ठ प्रश्न \'सिंधु = महासागर\' ही है। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) तथ्य-प्रश्न पाठ से निकलवाओ। (2) \'सिंधु\' का संदर्भ (चरणों के नीचे) दिखाओ। (3) कवि-नाम, तिथि, शब्द-अर्थ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
