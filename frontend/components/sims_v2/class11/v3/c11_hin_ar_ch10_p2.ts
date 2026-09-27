import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch10_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch10_p2',
    title: 'पाठ 10 · Part 2/3',
    subtitle: 'Read a devotional poem as a plot of the soul, not a description of love.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 10 · Part 2/3',
    chapters: ['c11_hin_ar_ch10'],
    nodeIds: ['c11_hin_ar_cbse_10_007', 'c11_hin_ar_cbse_10_008', 'c11_hin_ar_cbse_10_009', 'c11_hin_ar_cbse_10_010', 'c11_hin_ar_cbse_10_011', 'c11_hin_ar_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sakhi listening to Meera narrate her undoing', intro: 'Eyes rolling in trance, love-fever, body wasting, ornaments off — a whole renunciation compressed into a few stanzas.', goal: 'Analyse the poem\'s internal narrative progression from devotion to total renunciation.' },
    discovery: {
        question: '\'Nothing happens in Meera\'s poem — she just says she loves Krishna.\' Is that a fair critique?',
        options: ['No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union', 'Yes — a poem needs visible action to have a plot', 'Yes — devotion is a state, not a story', 'No — because she physically dances in stanza two'],
        answer: 'No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union',
        hook: 'Bhakti verse plots the soul\'s trajectory, not the body\'s — \'discarding jewellery\' is the poem\'s rising action, abandonment is its climax.',
    },
    teaching: [
        { title: 'पाठ 10 — गौण विषय', text: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ, उसे समृद्ध, विस्तृत या जटिल बनाता है, तथा पात्रों के जीवन की बहु-आयामिता (multidimensionality) को उजागर करता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Meera\'s stanzas from a mind fixed on Giridhar to the shedding of every social marker, and defend the poem\'s narrative arc against \'nothing happens.\'',
        labels: ['पाठ 10 — गौण', 'पाठ 10 — साहित्यिक', 'पाठ 10 — पदावली', 'पाठ 10 — व्याकरण', 'पाठ 10 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_012', title: 'पाठ 10 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'You open your Hindi exam paper and see Question 2: "लेखक ने बाजार का वर्णन क्यों किया है?" and Question 3: "बाजार में कौन-सी दुकानें थीं?" Your heart races.',
            decisions: [{ prompt: 'पाठ 10 के संदर्भ में, \'वस्तुनिष्ठ प्रश्न\' की परिभाषा लिखिए और एक उदाहरण दीजिए जो पाठ से सीधे तथ्य पूछता हो।', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ प्रश्न वह है जिसका उत्तर पाठ में स्पष्ट रूप से लिखित तथ्य,', outcome: '**Correct Answer:** वस्तुनिष्ठ प्रश्न वह है जिसका उत्तर पाठ में स्पष्ट रूप से लिखित तथ्य, विवरण.' },
                { text: 'पाठ के अनुसार, नायक ने सुबह क्या खाया?', outcome: 'Not quite — **Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं — बस ध्यान.', reveals: 'specific-error-students-believe-this' },
                { text: 'नायक ने सुबह दूध और रोटी खाई', outcome: 'Not quite — **Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं — बस ध्यान.', reveals: 'specific-error-students-believe-this' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a poetry-analysis session, a student presents Meera\'s bhajan and concludes: \'Nothing happens — Meera just describes her feelings. No events, no plot, so there\'s no structure to analyse.\'',
            decisions: [{ prompt: 'How do you show the poem\'s narrative architecture?', options: [
                { text: 'Trace the soul\'s trajectory: the bhakti \'plot\' is internal progression — stanza 1 establishes the mind fixed on Giridhar, stanza 2 shows the enacted consequences (body wasting, ornaments discarded — a real social rupture, not description), stanza 3 climaxes in the direct plea to stop worldly questioning. Each stanza escalates the renunciation — structure as spiritual arc from devotion to surrender.', outcome: 'The poem gains its plot: discarding ornaments isn\'t imagery but an enacted climax — bhakti narrative maps the devotee\'s journey, not external events.' },
                { text: 'Concede the point — lyric poems express emotion, they don\'t tell stories, so skip structure.', outcome: 'Lyric isn\'t structureless: emotional escalation with deliberate ordering is a narrative arc — \'no events\' confuses external action with inner plot.', reveals: 'lyric-has-no-plot' },
                { text: 'Invent a plot instead — narrate Meera\'s biography (marriage, leaving the palace) as the poem\'s storyline.', outcome: 'That\'s biography, not this text\'s structure: the poem compresses a whole renunciation into inner beats; importing her life story replaces analysis with anecdote.', reveals: 'biography-is-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'The stanza that wastes the body and drops the ornaments *is* the plot — renunciation told as a sequence of irreversible acts.',
            decisions: [{ prompt: 'What comes next? पाठ 10 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 10 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_10_006 (मुख्य विषय और संदेश) को दोबारा पढ़ें और पाठ के 3.',
          misconception: 'छात्र अक्सर \'गौण विषय\' को \'उपकथानक\' (sub-plot) या \'विवरण\' (detail) मान लेते हैं। उदाहरण: पाठ 10 में \'नायक का गाँव जाना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ, उसे',
                  options: ['गौण विषय (Sub-theme) वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ, उसे', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_10_006 (मुख्य विषय और संदेश) को दोबारा पढ़ें और पाठ के 3 केंद्रीय.',
                  misconception: 'छात्र अक्सर \'गौण विषय\' को \'उपकथानक\' (sub-plot) या \'विवरण\' (detail) मान लेते हैं। उदाहरण: पाठ 10 में \'नायक का गाँव जाना\' एक घटना/प्रसंग है.' }
          ],
            remediations: { 'sub-plot-detail-10': { steps: ['चरण 1: छात्र से कहें — "पाठ के 5 प्रमुख प्रसंग लिखो। अब हर प्रसंग के सामने लिखो: \'यह प्रसंग किस विचार को आगे बढ़ाता.', 'कैसे?" चरण 4: जो दावेदार यह परीक्षा पास करें, उन्हें \'गौण विषय\' मानें। यह प्रक्रिया \'घटना\' और \'विचार-प्रवाह\' का भेद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** काव्यभाषा की वह शक्ति है जिसके द्वारा कवि शब्दों के माध्यम.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_10_006 (मुख्य विषय और संदेश) दोहराएँ — विशेष रूप से \'भाव.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'प्रतीक (Symbol)\' और \'रूपक (Metaphor)\' को एक मान लेते हैं**। उदाहरण: "कविता में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** काव्यभाषा की वह शक्ति है जिसके द्वारा कवि शब्दों के माध्यम से पाठक के',
                  options: ['**बिंब (Imagery)** काव्यभाषा की वह शक्ति है जिसके द्वारा कवि शब्दों के माध्यम से पाठक के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_10_006 (मुख्य विषय और संदेश) दोहराएँ — विशेष रूप से \'भाव पहचान\' और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'प्रतीक (Symbol)\' और \'रूपक (Metaphor)\' को एक मान लेते हैं**। उदाहरण: "कविता में \'कबूतर शांति का प्रतीक.' }
          ],
            remediations: { 'symbol-metaphor-local-global': { steps: ['**चरण 1:** छात्र को दो वाक्य दें — (अ) "वह शेर है" (रूपक) और (ब) "कविता में बार-बार आने वाला \'टूटा पिंजरा\' स्वतंत्रता.', 'दूसरा कहाँ तक फैला है?" **चरण 2:** समझाएँ — रूपक = **एक प्रसंग, एक आरोप**; प्रतीक = **पूरी रचना, बहु-अर्थी उपस्थिति**।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में तर्क-विरुद्ध.',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_10_008 के \'रूपक के प्रकार\' और \'बिंब के वर्गीकरण\'.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि **\'प्रतीक\' और \'रूपक (Metaphor)\' एक ही हैं** क्योंकि दोनों में \'एक वस्तु.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में तर्क-विरुद्ध, असंगत या',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में तर्क-विरुद्ध, असंगत या', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_10_008 के \'रूपक के प्रकार\' और \'बिंब के वर्गीकरण\' खंड को.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि **\'प्रतीक\' और \'रूपक (Metaphor)\' एक ही हैं** क्योंकि दोनों में \'एक वस्तु दूसरी वस्तु के लिए.' }
          ],
            remediations: { 'metaphor-9-10-x-is': { steps: ['**चरण 1:** विद्यार्थी से कहें: "एक वाक्य में रूपक लिखो (उदाहरण: \'कक्षा एक चिड़ियाघर है\')। अब उसी \'चिड़ियाघर\' को लेकर 5.', 'दूसरे में कहाँ तक फैला?" — इससे **सीमा (Scope) और बहु-अर्थता (Polyvalence)** का भेद स्पष्ट होगा। **चरण 3:** अब.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_010', difficulty: 'standard',
          question: 'पदावली के मुख्य शब्द वे **महत्वपूर्ण शब्द** होते हैं जो किसी रचना के विषय, भाव.',
          hint: 'यदि अटके तो **\'अपठित गद्यांश/पद्यांश में शब्दों के प्रसंगगत अर्थ निकालने\'** का अभ्यास.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **मुख्य शब्द = कठिन/क्लिष्ट शब्द** (difficult/obscure words)। **गलत तर्क**: वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के मुख्य शब्द वे **महत्वपूर्ण शब्द** होते हैं जो किसी रचना के विषय, भाव, या कथ्य',
                  options: ['पदावली के मुख्य शब्द वे **महत्वपूर्ण शब्द** होते हैं जो किसी रचना के विषय, भाव, या कथ्य', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'यदि अटके तो **\'अपठित गद्यांश/पद्यांश में शब्दों के प्रसंगगत अर्थ निकालने\'** का अभ्यास दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **मुख्य शब्द = कठिन/क्लिष्ट शब्द** (difficult/obscure words)। **गलत तर्क**: वे सोचते हैं "अनुभूति".' }
          ],
            remediations: { 'difficult-obscure-words': { steps: ['छात्र से कहें: **"कोई भी सरल शब्द लो — जैसे \'चाय\' — और 3 अलग-अलग स्थितियाँ लिखो जहाँ इसका अर्थ पूरी तरह बदल जाए"**.', 'फिर पूछें: **"कौन-सी स्थिति में \'चाय\' मुख्य शब्द बनेगा और क्यों?"** — इससे प्रसंगगत अर्थ-निर्माण स्पष्ट होगा। 3.', 'अंत में: **आरोह के किसी पाठ का एक पैराग्राफ दें** और कहें: **"यहाँ 3 सरल शब्द ढूँढो जो मुख्य शब्द की तरह काम कर रहे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के उद्देश्य, पात्र-चरित्र.',
          hint: 'यदि अटके तो नोड 004 (नायक पात्र-चित्रण) और नोड 003 (पाठ्य-परिवेश) दोबारा पढ़ें — भाषा का.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ **कठिन/सजावटी शब्दों** का प्रयोग है, जबकि पाठ 10 में लेखक सरलतम तद्भव/देशज.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के उद्देश्य, पात्र-चरित्र, परिवेश और',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के उद्देश्य, पात्र-चरित्र, परिवेश और', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'यदि अटके तो नोड 004 (नायक पात्र-चित्रण) और नोड 003 (पाठ्य-परिवेश) दोबारा पढ़ें — भाषा का \'कौन\' और.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ **कठिन/सजावटी शब्दों** का प्रयोग है, जबकि पाठ 10 में लेखक सरलतम तद्भव/देशज शब्दों ("भौजी".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ का कोई एक पृष्ठ खोलो और **लाल पेन** से हर सर्वनाम घेरो; फिर **नीले पेन** से हर क्रिया-रूप रेखांकित.', 'अब पूछें: "लाल/नीले निशानों का पैटर्न क्या बताता है पात्र के बारे में?" 3.', 'यदि फिर भी अटके, तो **दो वाक्य** लिखवाएँ — एक "मैं" से शुरू, दूसरा "हम" से — और दोनों का भावात्मक अंतर बोलकर बताने को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ बोध-प्रश्न (Objective Comprehension Questions)** test literal.',
          hint: 'If stuck, review **c11_hin_ar_cbse_10_010 (पदावली: मुख्य शब्द)** and.',
          misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं — बस ध्यान से पढ़ना है।" This.',
          parts: [
                { id: 'a', prompt: '\'आशय-सूचक प्रश्न\' और \'वस्तुनिष्ठ प्रश्न\' में मूल अंतर समझाते हुए बताइए कि "लेखक ने शीर्षक \'XYZ\' क्यों चुना?" किस श्रेणी में आएगा और क्यों?', answer: '**Correct Answer:** मूल अंतर: वस्तुनिष्ठ प्रश्न *पाठ में क्या लिखा है* पूछता है',
                  options: ['**Correct Answer:** मूल अंतर: वस्तुनिष्ठ प्रश्न *पाठ में क्या लिखा है* पूछता है', 'लेखक ने शीर्षक \'XYZ\' क्यों चुना?', 'title is in the text', 'आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_10_010 (पदावली: मुख्य शब्द)** and **c11_hin_ar_cbse_10_011.',
                  misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं — बस ध्यान से पढ़ना है।" This is **wrong** because.' },
                { id: 'b', prompt: 'निम्नलिखित प्रश्नों को वस्तुनिष्ठ/आशय-सूचक में वर्गीकृत कीजिए और प्रत्येक के लिए *पाठगत साक्ष्य का प्रकार* बताइए जो उत्तर में चाहिए: (क) "नायक का नाम क्या है?".', answer: '**Correct Answer:** (क) वस्तुनिष्ठ',
                  options: ['**Correct Answer:** (क) वस्तुनिष्ठ', 'meaning', 'character', 'आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_10_010 (पदावली: मुख्य शब्द)** and **c11_hin_ar_cbse_10_011.',
                  misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं — बस ध्यान से पढ़ना है।" This is **wrong** because.' }
          ],
            remediations: { 'specific-error-students-believe-this': { steps: ['**Step-by-Step Remediation:** 1.', '**Contrast Drill:** Give the student 5 questions (mixed types).', 'Ask them to *only* label each as "Locate" (वस्तुनिष्ठ) or "Build" (आशय-सूचक) — no answering.', 'Discuss *why* each label fits using the "Can I point to one sentence?" test.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
