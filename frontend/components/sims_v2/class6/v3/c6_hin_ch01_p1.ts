import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch01_p1: SimDef = {
    id: 'v3_c6_hin_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'यह नोड केवल कवि-परिचय, काल और रचना-उद्देश्य तक सीमित है — पाठ का भावार्थ अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c6_hin_ch01'],
    nodeIds: ['c6_hin_cbse_01_001', 'c6_hin_cbse_01_002', 'c6_hin_cbse_01_003', 'c6_hin_cbse_01_004', 'c6_hin_cbse_01_005', 'c6_hin_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '**तुम्हारे लिए:** इस नोड में तुम कवि को पहचानोगे — उसका नाम, समय और उसका हथियार (लेखनी)। कवि का काल.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: 'सोहनलाल द्विवेदी (1906–1988) — स्वतंत्रता-काल के प्रसिद्ध कवि; अंग्रेज़ी आधिपत्य में उन्होंने \'लेखनी से विरोध\' किया। प्रिय विषय देशभक्ति; अन्य रचनाएँ \'बढ़े चलो, बढ़े चलो\', \'कोशिश करने वालों की हार.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 1/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता; (2).', answer: '1 -', options: ['1 -', '1 -'] },
            { id: 's2', label: '1 -', prompt: 'Which idea is this? — काव्य-परिवेश और छंद-रूप — कविता का आकार (6 छंद-खंड: प्रकृति-खंड 1–4 + विरासत-खंड 5–6) और.', answer: '1 -', options: ['1 -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_001', difficulty: 'standard',
          question: 'सोहनलाल द्विवेदी (1906–1988) — स्वतंत्रता-काल के प्रसिद्ध कवि; अंग्रेज़ी.',
          hint: 'यदि अटका हुआ महसूस हो तो: कवि-परिचय के 3 मुख्य बिंदु (नाम, काल, विषय) लिखिए — काल का.',
          misconception: '1. छात्र \'द्विवेदी\' को \'महाप्रसाद द्विवेदी\' मानते हैं — यहाँ सोहनलाल द्विवेदी हैं; दो अलग कवि। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सोहनलाल द्विवेदी (1906–1988)',
                  options: ['सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप', 'केंद्रीय भाव-वस्तु'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कवि-परिचय के 3 मुख्य बिंदु (नाम, काल, विषय) लिखिए — काल का ज्ञान कविता के.',
                  misconception: '1. छात्र \'द्विवेदी\' को \'महाप्रसाद द्विवेदी\' मानते हैं — यहाँ सोहनलाल द्विवेदी हैं; दो अलग कवि। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) कवि-परिचय दोबारा पढ़वाओ। (2) \'मातृभूमि\' और \'भूमि\' का अंतर स्पष्ट करो। (3) पहली पंक्ति से अंतिम \'भूमि\' तक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_002', difficulty: 'standard',
          question: 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक छंद उठाइए, उसके 4 पंक्तियों का शब्द-अर्थ लिखिए, फिर भाव.',
          misconception: '1. छात्र \'सिंधु\' को \'नदी\' या \'सिंधु नदी\' मानते हैं — यहाँ अर्थ महासागर है; पाठ का MCQ भी यही पूछता है। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता',
                  options: ['कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'सोहनलाल द्विवेदी (1906–1988)', 'काव्य-परिवेश और छंद-रूप', 'केंद्रीय भाव-वस्तु'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक छंद उठाइए, उसके 4 पंक्तियों का शब्द-अर्थ लिखिए, फिर भाव जोड़िए।',
                  misconception: '1. छात्र \'सिंधु\' को \'नदी\' या \'सिंधु नदी\' मानते हैं — यहाँ अर्थ महासागर है; पाठ का MCQ भी यही पूछता है। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) छंद-खंड क्रम से पढ़वाओ। (2) कठिन शब्द (सिंधु, त्रिवेणी, अमराइयाँ) का अर्थ लिखवाओ। (3) पंक्ति का भाव अपने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_003', difficulty: 'standard',
          question: 'काव्य-परिवेश और छंद-रूप — कविता का आकार (6 छंद-खंड: प्रकृति-खंड 1–4.',
          hint: 'यदि अटका हुआ महसूस हो तो: 6 खंडों के लिए एक-एक शब्द लिखिए — हिमालय, नदियाँ, झरने, बाग.',
          misconception: '1. छात्र \'अमराइयाँ\' को \'अमर\' (अमरता) से जोड़ते हैं — \'अमराई\' = आम का बाग; शब्द-सादृश्य मात्र। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-परिवेश और छंद-रूप',
                  options: ['काव्य-परिवेश और छंद-रूप', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'केंद्रीय भाव-वस्तु'],
                  hint: 'यदि अटका हुआ महसूस हो तो: 6 खंडों के लिए एक-एक शब्द लिखिए — हिमालय, नदियाँ, झरने, बाग, राम-कृष्ण.',
                  misconception: '1. छात्र \'अमराइयाँ\' को \'अमर\' (अमरता) से जोड़ते हैं — \'अमराई\' = आम का बाग; शब्द-सादृश्य मात्र। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) 6 खंडों की सूची बनवाओ — हर खंड का एक शब्द। (2) \'अमराई\' = आम का बाग बताओ। (3) \'कालातीत\' का अर्थ समझाओ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_004', difficulty: 'standard',
          question: 'केंद्रीय भाव-वस्तु — मातृभूमि: कविता में कोई मानव \'नायक\' नहीं; केंद्र में भूमि.',
          hint: 'यदि अटका हुआ महसूस हो तो: \'वह मातृभूमि मेरी\' पढ़िए — \'मातृ\' का अर्थ लिखिए; केंद्र स्वयं.',
          misconception: '1. छात्र \'मातृभूमि\' को \'माता की भूमि\' (उत्तराधिकार-संपत्ति) समझते हैं — यह \'माता के समान भूमि\' है; रूपक, स्वामित्व.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव-वस्तु',
                  options: ['केंद्रीय भाव-वस्तु', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: \'वह मातृभूमि मेरी\' पढ़िए — \'मातृ\' का अर्थ लिखिए; केंद्र स्वयं स्पष्ट होगा।',
                  misconception: '1. छात्र \'मातृभूमि\' को \'माता की भूमि\' (उत्तराधिकार-संपत्ति) समझते हैं — यह \'माता के समान भूमि\' है; रूपक, स्वामित्व नहीं। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) \'मातृभूमि\' शब्द तोड़वाओ — मातृ + भूमि। (2) \'वह ____ भूमि मेरी\' दोहराव पढ़वाओ — केंद्र कौन?', '(3) रूपक बनाम उपमा — \'सी\' है या नहीं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_005', difficulty: 'standard',
          question: 'बिंब-सहायक समूह — केंद्रीय भाव-वस्तु (मातृभूमि) के साथ खड़े प्रतीक-समूह.',
          hint: 'यदि अटका हुआ महसूस हो तो: दो सूचियाँ लिखिए — \'प्रकृति\' और \'महापुरुष\'; हर बिंब को एक में.',
          misconception: '1. छात्र \'रघुपति\' को \'रघु\' नाम के व्यक्ति मानते हैं — रघुपति = रघुकुल के पति = भगवान राम; कुल-नाम से पहचान। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब-सहायक समूह — केंद्रीय भाव-वस्तु (मातृभूमि) के साथ खड़े प्रतीक-समूह: प्रकृति-बिंब',
                  options: ['बिंब-सहायक समूह — केंद्रीय भाव-वस्तु (मातृभूमि) के साथ खड़े प्रतीक-समूह: प्रकृति-बिंब', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: दो सूचियाँ लिखिए — \'प्रकृति\' और \'महापुरुष\'; हर बिंब को एक में रखिए।',
                  misconception: '1. छात्र \'रघुपति\' को \'रघु\' नाम के व्यक्ति मानते हैं — रघुपति = रघुकुल के पति = भगवान राम; कुल-नाम से पहचान। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) दो सूचियाँ बनवाओ — प्रकृति-बिंब, विरासत-बिंब। (2) \'रघुपति\' = राम बताओ। (3) \'वंशी\' = बाँसुरी बताओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_006', difficulty: 'standard',
          question: 'मुख्य विषय: मातृभूमि (भारत) की स्तुति — उसकी प्राकृतिक सुंदरता (हिमालय, नदियाँ.',
          hint: 'यदि अटका हुआ महसूस हो तो: पहला और आखिरी छंद पढ़िए — हिमालय से \'मातृभूमि\' तक; विषय वहीं है।',
          misconception: '1. छात्र विषय को \'हिमालय-वर्णन\' मानते हैं — हिमालय प्रारंभ-चित्र है; केंद्रीय भाव मातृभूमि-प्रेम है। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय: मातृभूमि (भारत) की स्तुति',
                  options: ['मुख्य विषय: मातृभूमि (भारत) की स्तुति', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: पहला और आखिरी छंद पढ़िए — हिमालय से \'मातृभूमि\' तक; विषय वहीं है।',
                  misconception: '1. छात्र विषय को \'हिमालय-वर्णन\' मानते हैं — हिमालय प्रारंभ-चित्र है; केंद्रीय भाव मातृभूमि-प्रेम है। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) छंद 1 और छंद 5 पढ़वाओ — हिमालय बनाम राम-जन्म। (2) \'मातृभूमि\' का अर्थ पूछो। (3) विषय = भूमि की स्तुति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
