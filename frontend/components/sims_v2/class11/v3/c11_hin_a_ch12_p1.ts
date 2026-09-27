import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch12_p1: SimDef = {
    id: 'v3_c11_hin_a_ch12_p1',
    title: 'पाठ 12 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 12 के रचनाकार (श्रीलाल शुक्ल) के जीवन के प्रासंगिक प्रसंगों, उनकी.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 12 · Part 1/3',
    chapters: ['c11_hin_a_ch12'],
    nodeIds: ['c11_hin_a_cbse_12_001', 'c11_hin_a_cbse_12_002', 'c11_hin_a_cbse_12_003', 'c11_hin_a_cbse_12_004', 'c11_hin_a_cbse_12_005', 'c11_hin_a_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना करें कि आपको एक ऐसे गाँव की कहानी पढ़नी है जहाँ पंचायत चुनाव चल रहे हैं और एक बाहरी अधिकारी वहाँ की.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-कालीन सामाजिक, सांस्कृतिक, राजनीतिक परिवेश तथा रचनाकार के व्यक्तिगत जीवनानुभवों, विचारधारा एवं साहित्यिक योगदान का वह समग्र विवेचन है जो कृति.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — पृष्ठभूमि', 'पाठ 12 — कथानक', 'पाठ 12 — पाठ्य-परिवेश', 'पाठ 12 — पात्र-चित्रण', 'पाठ 12 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 1/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — **कथानक (Plot)** किसी रचना में घटनाओं का वह सुव्यवस्थित, कारण-कार्य-आधारित क्रम है जो.', answer: '12 -', options: ['12 -', '12 -'] },
            { id: 's2', label: '12 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Textual Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है.', answer: '12 -', options: ['12 -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 12 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-कालीन सामाजिक.',
          hint: 'यदि अटका महसूस हो तो \'व्यंग्य की परिभाषा, प्रकार (होरेशियन/जुवेनालियन) और प्रमुख.',
          misconception: 'छात्र अक्सर \'रचनाकार परिचय\' को \'जीवनी के तथ्यों की सूची\' (जन्म, शिक्षा, नौकरी, पुरस्कार, मृत्यु) मानकर रट लेते हैं और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-कालीन सामाजिक, सांस्कृतिक,',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-कालीन सामाजिक, सांस्कृतिक,', '**कथानक (Plot)** किसी रचना में घटनाओं का वह सुव्यवस्थित, कारण-कार्य-आधारित क्रम है जो', 'पाठ्य-परिवेश (Textual Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र के'],
                  hint: 'यदि अटका महसूस हो तो \'व्यंग्य की परिभाषा, प्रकार (होरेशियन/जुवेनालियन) और प्रमुख युक्तियाँ.',
                  misconception: 'छात्र अक्सर \'रचनाकार परिचय\' को \'जीवनी के तथ्यों की सूची\' (जन्म, शिक्षा, नौकरी, पुरस्कार, मृत्यु) मानकर रट लेते हैं और परीक्षा में वही.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "रचनाकार की जीवनी से तीन तथ्य चुनो जो तुम्हें सबसे \'रोचक\' या \'आश्चर्यजनक\' लगे (जैसे: वे आईएएस थे पर.', 'अब प्रत्येक तथ्य के लिए पूछें: "इस तथ्य ने उनके लिखने का *तरीका* (शिल्प) या *विषय* (कथ्य) कैसे बदला?', 'एक ठोस उदाहरण पाठ से दो।" 3.', 'छात्र को एक टेबल बनाने को कहें: कॉलम 1 — जीवनी-तथ्य, कॉलम 2 — पाठ में झलक (संदर्भ सहित), कॉलम 3 — प्रभाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_002', difficulty: 'standard',
          question: '**कथानक (Plot)** किसी रचना में घटनाओं का वह सुव्यवस्थित, कारण-कार्य-आधारित क्रम.',
          hint: 'यदि अटका हुआ महसूस हो तो: **\'कहानी बनाम कथानक\' (Story vs Plot)** का अंतर E.M.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'कथानक\' (plot)** और **\'कहानी/कथावस्तु\' (story/fabula)** को समानार्थी मानते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक (Plot)** किसी रचना में घटनाओं का वह सुव्यवस्थित, कारण-कार्य-आधारित क्रम है जो',
                  options: ['**कथानक (Plot)** किसी रचना में घटनाओं का वह सुव्यवस्थित, कारण-कार्य-आधारित क्रम है जो', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-कालीन सामाजिक, सांस्कृतिक,', 'पाठ्य-परिवेश (Textual Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो: **\'कहानी बनाम कथानक\' (Story vs Plot)** का अंतर E.M.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'कथानक\' (plot)** और **\'कहानी/कथावस्तु\' (story/fabula)** को समानार्थी मानते हैं। वे सोचते हैं: "जो हुआ, वही.' }
          ],
            remediations: { 'plot-story-fabula': { steps: ['**अवधारणा स्पष्ट करो:** एक ही कथा (जैसे *सिंडरेला*) को दो तरह से लिखवाओ — पहले कालक्रम में (कहानी), फिर फ्लैशबैक से.', 'पाठक का अनुभव कैसे बदला?" 2.', '**दृश्य सहायता (Visual Aid):** फ्रेटैग पिरामिड का चित्र बनवाओ और उस पर **तीर (arrows)** से दिखाओ: \'कहानी = आधार रेखा.', '**अभ्यास:** एक छोटा गद्यांश दो जिसमें फ्लैशबैक हो। छात्र से कहो: (अ) घटनाओं का वास्तविक कालक्रम लिखो, (ब).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Textual Setting) किसी रचना में घटनाओं के घटित होने का समग्र.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_12_001** के \'रचनाकार परिचय\' खंड को दोबारा पढ़ें — विशेषकर.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'पाठ्य-परिवेश\' का वर्णन लेखक केवल **सजावट (decoration)** या \'माहौल बनाने\' के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Textual Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है',
                  options: ['पाठ्य-परिवेश (Textual Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-कालीन सामाजिक, सांस्कृतिक,', '**कथानक (Plot)** किसी रचना में घटनाओं का वह सुव्यवस्थित, कारण-कार्य-आधारित क्रम है जो', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र के'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_12_001** के \'रचनाकार परिचय\' खंड को दोबारा पढ़ें — विशेषकर रचनाकार का.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'पाठ्य-परिवेश\' का वर्णन लेखक केवल **सजावट (decoration)** या \'माहौल बनाने\' के लिए करता है, और.' }
          ],
            remediations: { 'decoration': { steps: ['**चरण 1**: छात्र से कहें — "किसी एक पाठ (जैसे \'नमक का दारोगा\' या \'उपन्यास के अंश\') का एक पृष्ठ खोलो और केवल वे वाक्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र.',
          hint: 'यदि अटका हुआ महसूस करें तो **c11_hin_a_cbse_12_002 (कथानक और आख्यान-संरचना)** पर लौटकर.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि नायक का पात्र-चित्रण लिखने का अर्थ है **उसके गुणों की सूची बनाना** (listing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-कालीन सामाजिक, सांस्कृतिक,', '**कथानक (Plot)** किसी रचना में घटनाओं का वह सुव्यवस्थित, कारण-कार्य-आधारित क्रम है जो', 'पाठ्य-परिवेश (Textual Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है'],
                  hint: 'यदि अटका हुआ महसूस करें तो **c11_hin_a_cbse_12_002 (कथानक और आख्यान-संरचना)** पर लौटकर नायक के.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि नायक का पात्र-चित्रण लिखने का अर्थ है **उसके गुणों की सूची बनाना** (listing traits: ईमानदार, साहसी.' }
          ],
            remediations: { 'listing-traits': { steps: ['**चरणबद्ध उपचार (Targeted Remediation)**: 1.', '**साक्ष्य-आधारित सोच (Evidence-based thinking) सिखाएं**: छात्र से कहें — "पाठ खोलें और नायक के **केवल 3 संवाद/कार्य**.', '**PEEL टेम्पलेट दें**: एक कार्यपत्रक (worksheet) दें जिसमें चार कॉलम हों: Point | Quote/Paraphrase | Explanation | Link.', '**चरित्र-परिवर्तन चार्ट (Character Arc Chart) बनवाएं**: X-अक्ष: कथानक के चरण (आरंभ/मध्य/अंत), Y-अक्ष: केंद्रीय गुण की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो कथानक में नायक/प्रमुख.',
          hint: 'यदि अटका हुआ महसूस हो, तो नोड 004 के \'कार्य उदाहरण 1\' को दोबारा पढ़ें और उसी **PEEL.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'सहायक पात्र का चरित्र-चित्रण\' का अर्थ है — **पात्र का परिचय देना** (नाम, आयु.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो कथानक में नायक/प्रमुख पात्र के',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो कथानक में नायक/प्रमुख पात्र के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-कालीन सामाजिक, सांस्कृतिक,', '**कथानक (Plot)** किसी रचना में घटनाओं का वह सुव्यवस्थित, कारण-कार्य-आधारित क्रम है जो', 'पाठ्य-परिवेश (Textual Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है'],
                  hint: 'यदि अटका हुआ महसूस हो, तो नोड 004 के \'कार्य उदाहरण 1\' को दोबारा पढ़ें और उसी **PEEL संरचना.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'सहायक पात्र का चरित्र-चित्रण\' का अर्थ है — **पात्र का परिचय देना** (नाम, आयु, रूप, परिवार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 - टेम्पलेट तोड़ें:** छात्र से कहें: "भूल जाओ कि तुमने कक्षा 10 में कैसे लिखा था। आज हम \'पात्र\' नहीं.', '**चरण 2 - तीन प्रश्न पूछें:** (क) यह पात्र नायक के **कौन-से गुण को छूता/बदलता** है?', '(ख) इसके **बिना कथानक रुक/बिगड़** जाता?', '(ग) इसका **अपना क्या दाँव (Stake)** है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) किसी साहित्यिक कृति का वह केंद्रीय, सार्वभौमिक विचार.',
          hint: 'अगर अटके तो c11_hin_a_cbse_12_002 (कथानक संरचना) और c11_hin_a_cbse_12_004 (नायक चित्रण).',
          misconception: 'छात्र अक्सर \'मुख्य विषय\' को \'नैतिक शिक्षा\' (Moral Lesson) या \'संदेश\' (Message) के साथ घुला-मिला देते हैं — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) किसी साहित्यिक कृति का वह केंद्रीय, सार्वभौमिक विचार या सत्य',
                  options: ['मुख्य विषय (Central Theme) किसी साहित्यिक कृति का वह केंद्रीय, सार्वभौमिक विचार या सत्य', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के सृजन-कालीन सामाजिक, सांस्कृतिक,', '**कथानक (Plot)** किसी रचना में घटनाओं का वह सुव्यवस्थित, कारण-कार्य-आधारित क्रम है जो', 'पाठ्य-परिवेश (Textual Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है'],
                  hint: 'अगर अटके तो c11_hin_a_cbse_12_002 (कथानक संरचना) और c11_hin_a_cbse_12_004 (नायक चित्रण) को दोबारा.',
                  misconception: 'छात्र अक्सर \'मुख्य विषय\' को \'नैतिक शिक्षा\' (Moral Lesson) या \'संदेश\' (Message) के साथ घुला-मिला देते हैं — जैसे "ईमानदारी सबसे अच्छी नीति.' }
          ],
            remediations: { 'moral-lesson-message-theme': { steps: ['छात्र से कहें: "पाठ की कोई एक पंक्ति चुनो जो तुम्हें सबसे ज्यादा झकझोरती हो — वही विषय की कुंजी है।" 2.', 'फिर पूछें: "यह पंक्ति किस मानवीय अनुभव की ओर इशारा करती है?', '— उसे एक संज्ञा-वाक्यांश में लिखो (जैसे: \'अकेलापन\', \'विश्वासघात\', \'आशा\')।" 3.', 'अब पाठ के तीन प्रसंग ढूंढो जहाँ यह अनुभव अलग-अलग रूप में आए — उन्हें जोड़कर Theme Statement बनाओ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
