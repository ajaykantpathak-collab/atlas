import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch05_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch05_p1',
    title: 'पाठ 5 · Part 1/3',
    subtitle: 'See a modern institution carrying an old hierarchy in its walls.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 5 · Part 1/3',
    chapters: ['c11_hin_ar_ch05'],
    nodeIds: ['c11_hin_ar_cbse_05_001', 'c11_hin_ar_cbse_05_002', 'c11_hin_ar_cbse_05_003', 'c11_hin_ar_cbse_05_004', 'c11_hin_ar_cbse_05_005', 'c11_hin_ar_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader testing a cantonment\'s promise of equality', intro: 'A new nation, a cantonment town, an old ladder of caste — the story asks who the new order is really for.', goal: 'Analyse caste and education in a post-independence cantonment setting through Nayi Kahani realism.' },
    discovery: {
        question: 'Post-1947 India promised a modern, equal cantonment — did the new order actually erase caste?',
        options: ['No — the cantonment\'s modern surface hides intact caste hierarchy, and education becomes the contested route to dignity', 'Yes — the army\'s discipline abolished caste overnight', 'Yes — independence legally ended all discrimination', 'No — because cantonments don\'t exist anymore'],
        answer: 'No — the cantonment\'s modern surface hides intact caste hierarchy, and education becomes the contested route to dignity',
        hook: 'Nayi Kahani\'s rule: no heroes, no easy rescue — just middle-class realism where dignity must be fought for inside an unequal system.',
    },
    teaching: [
        { title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ** (पृष्ठभूमि) तथा **लेखक के जीवन, विचारधारा, रचनात्मक यात्रा और शैलीगत विशेषताओं** (रचनाकार.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map the cantonment\'s social structure, trace how education collides with caste, and argue whether the story\'s resolution is hope or realism.',
        labels: ['पाठ 5 — पृष्ठभूमि', 'पाठ 5 — कथानक', 'पाठ 5 — पाठ्य-परिवेश', 'पाठ 5 — पात्र-चित्रण', 'पाठ 5 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 1/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा.', answer: '5 -', options: ['5 -', '5 -'] },
            { id: 's2', label: '5 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल.', answer: '5 -', options: ['5 -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class debates a story set in an army cantonment where a Dalit boy\'s education is his only escape. One student calls it \'a sad tale about one cruel officer and a lucky boy — the quarters, the school, the floods are just background.\'',
            decisions: [{ prompt: 'What\'s missing from that reading?', options: [
                { text: 'Reframe through context and structure: Shukla/Shivprasad Singh write in the Nayi Kahani mode — the cantonment is a designed microcosm where quarters are allotted by rank and caste and the school is the only porous boundary, so institutions, not one villain, reproduce caste. And the elliptical structure — childhood, flood, clerkship with years skipped — enacts how change for a lower-caste life isn\'t a smooth climb but rare visible breakthroughs between invisible struggle.', outcome: 'The debate shifts from pity to analysis: \'Low Quarter vs Officer Quarter\' reads as structural evidence, and the gaps in time become the argument.' },
                { text: 'Keep the individual-villain reading — the story works as a warning about cruel officers.', outcome: 'Personalising it hides the target: the story dissects how school, army and family as systems reproduce caste — replacing one officer changes nothing.', reveals: 'caste-is-one-bad-officer' },
                { text: 'Fill in the missing years in your summary — schooling and job-hunting must have happened, so narrate them.', outcome: 'The ellipsis is deliberate: making struggle invisible between breakthroughs is how the structure mirrors the theme — summarising the gaps erases the design.', reveals: 'gaps-are-just-missing-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'The story refuses both cynicism and fantasy — dignity is possible, but only through struggle the system makes necessary.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक.',
          hint: 'यदि अटका हुआ महसूस हो तो: **\'प्रेमचंद: जीवन और साहित्य\' (NCERT पूरक पाठ्य सामग्री.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — **लेखक की जन्मतिथि, मृत्यु-तिथि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार'],
                  hint: 'यदि अटका हुआ महसूस हो तो: **\'प्रेमचंद: जीवन और साहित्य\' (NCERT पूरक पाठ्य सामग्री / ई-पाठशाला.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — **लेखक की जन्मतिथि, मृत्यु-तिथि, प्रमुख कृतियों की सूची.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (Targeted Remediation) — 4 चरणों में:** **चरण 1 — \'तथ्य बनाम अंतर्दृष्टि\' अभ्यास:** छात्र को प्रेमचंद के.', 'कारण लिखो।" — इससे **कारण-प्रभाव तर्क** बनेगा। **चरण 2 — \'पृष्ठभूमि कीवर्ड मैपिंग\':** एक खाली टेबल दें — कॉलम: (क).', '— गांधीवाद/मार्क्सवाद/मानववाद?" इससे **विचारधारात्मक स्थिति (ideological stance)** स्पष्ट होगी। **चरण 4 — बोर्ड-उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality).',
          hint: 'यदि फँसें तो: E.M. फॉर्स्टर, *Aspects of the Novel*, अध्याय 5 (The Plot) — केवल 2 पृष्ठ.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'आख्यान-संरचना\' को केवल \'फ्लैशबैक की उपस्थिति/अनुपस्थिति\' तक सीमित कर देते हैं। वे मानते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा',
                  options: ['कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार'],
                  hint: 'यदि फँसें तो: E.M. फॉर्स्टर, *Aspects of the Novel*, अध्याय 5 (The Plot) — केवल 2 पृष्ठ पढ़ें; फिर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'आख्यान-संरचना\' को केवल \'फ्लैशबैक की उपस्थिति/अनुपस्थिति\' तक सीमित कर देते हैं। वे मानते हैं: "अगर फ्लैशबैक है →.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — अवधारणा स्पष्टीकरण:** छात्र के साथ बैठकर E.M.', 'फॉर्स्टर का "राजा-रानी" उदाहरण पुनः पढ़वाएँ; पूछें: "दूसरे वाक्य में \'शोक में\' शब्द क्या जोड़ता है?" → कारण-कार्य संबंध.', '**चरण 2 — दृश्यीकरण अभ्यास:** एक जानी-पहचानी फिल्म (जैसे \'दृश्यम\' या \'अंधाधुन\') के 5 प्रमुख दृश्य कार्ड पर लिखवाएँ.', '**चरण 3 — संरचना-प्रयोजन मैपिंग:** एक टेबल बनवाएँ: कॉलम — संरचना प्रकार | उदाहरण (पाठ/फिल्म) | लेखक का संभावित उद्देश्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान.',
          hint: 'यदि अटके तो \'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय\' (c11_hin_ar_cbse_05_001) के.',
          misconception: '**विशिष्ट भ्रांति:** "वातावरण केवल विशेषणों (adjectives) से बनता है — जैसे \'भयानक रात\', \'सुंदर सुबह\'।" **गलत तर्क:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,',
                  options: ['पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार'],
                  hint: 'यदि अटके तो \'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय\' (c11_hin_ar_cbse_05_001) के \'सामाजिक-ऐतिहासिक.',
                  misconception: '**विशिष्ट भ्रांति:** "वातावरण केवल विशेषणों (adjectives) से बनता है — जैसे \'भयानक रात\', \'सुंदर सुबह\'।" **गलत तर्क:** छात्र समझते हैं कि.' }
          ],
            remediations: { 'adjectives': { steps: ['**चरण 1:** छात्र को पाठ 5 के दो विपरीत अनुच्छेद (एक विषादपूर्ण, एक आशापूर्ण) दें; कहें: "कोई विशेषण न इस्तेमाल करते हुए.', '**चरण 2:** एक ही परिवेश (जैसे \'अस्पताल का बरामदा\') पर दो पैराग्राफ लिखवाएँ — एक \'आशा\' का, एक \'निराशा\' का — केवल संज्ञा.', '**चरण 3:** पाठ 5 के किसी दृश्य का \'वातावरण मानचित्र\' (Atmosphere Map) बनवाएँ: बाएँ कॉलम में भौतिक विवरण, दाएँ में उससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार.',
          hint: 'यदि अटके तो **कथानक और आख्यान-संरचना (c11_hin_ar_cbse_05_002)** के \'उत्कर्ष बिंदु.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'पात्र-चित्रण\' का अर्थ नायक के \'अच्छे गुणों\' (virtues) की सूची बनाना है**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार',
                  options: ['पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा रचनाकार', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटके तो **कथानक और आख्यान-संरचना (c11_hin_ar_cbse_05_002)** के \'उत्कर्ष बिंदु (climax)\' और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'पात्र-चित्रण\' का अर्थ नायक के \'अच्छे गुणों\' (virtues) की सूची बनाना है** — जैसे "वह ईमानदार.' }
          ],
            remediations: { 'virtues': { steps: ['**चरणबद्ध उपचार (Targeted Remediation)**: 1.', '**पहला कदम**: छात्र से कहें — "नायक के **तीन दोष (flaws)** ढूंढो जो पाठ में स्पष्ट लिखे हैं" — और उन्हें केवल **पृष्ठ.', '**दूसरा कदम**: प्रत्येक दोष के लिए पूछें — "इस दोष के कारण नायक को **क्या हानि हुई?** और **क्या उसने इससे सीखा?**".', '**तीसरा कदम**: छात्र से कहें — "अब नायक का **\'चरित्र-ग्राफ\' (character graph)** बनाओ: X-अक्ष = कथानक की घटनाएँ, Y-अक्ष.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_005', difficulty: 'standard',
          question: 'सहायक पात्र वे गौण चरित्र होते हैं जिनका निर्माण लेखक नायक के चरित्र को गहराई.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_ar_cbse_05_004 (नायक/प्रमुख पात्र का चित्रण)** के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'सहायक पात्र = नायक का मित्र/सहयोगी\' (Helper/Friend)**। वे \'सहायक\' शब्द के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे गौण चरित्र होते हैं जिनका निर्माण लेखक नायक के चरित्र को गहराई देने, कथानक',
                  options: ['सहायक पात्र वे गौण चरित्र होते हैं जिनका निर्माण लेखक नायक के चरित्र को गहराई देने, कथानक', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_ar_cbse_05_004 (नायक/प्रमुख पात्र का चित्रण)** के \'चरित्र-चाप.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'सहायक पात्र = नायक का मित्र/सहयोगी\' (Helper/Friend)**। वे \'सहायक\' शब्द के दैनिक अर्थ (helper) को.' }
          ],
            remediations: { 'helper-friend-helper-supporting-character': { steps: ['**शब्दावली स्पष्टीकरण (5 मिनट):** बोर्ड पर लिखें: **Supporting Character ≠ Helper**। समझाएँ: \'Support\'.', '**वर्गीकरण अभ्यास (10 मिनट):** किसी ज्ञात पाठ/फिल्म (जैसे \'गोदान\' या \'बाहुबली\') से 5 पात्र चुनें। छात्रों से पूछें.', 'कौन सा **सहायक पात्र** है?', 'अंतर बताओ।" फिर 4 प्रकार के सहायक पात्रों के लेबल दें: **Foil (विपरीत), Confidant (राजदार), Catalyst (उत्प्रेरक).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_006', difficulty: 'standard',
          question: '**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार या भाव है जो.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_05_004 और 005** के \'पात्र-निर्णय विश्लेषण\' खंड को दोहराएँ.',
          misconception: '**विषय = कहानी का सारांश / कथानक** — यह सबसे घातक भ्रम है। छात्र सोचते हैं "क्या हुआ" बताना ही "क्या कहा गया" बताना है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार या भाव है जो समस्त कथानक,',
                  options: ['**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार या भाव है जो समस्त कथानक,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_05_004 और 005** के \'पात्र-निर्णय विश्लेषण\' खंड को दोहराएँ — विशेषकर.',
                  misconception: '**विषय = कहानी का सारांश / कथानक** — यह सबसे घातक भ्रम है। छात्र सोचते हैं "क्या हुआ" बताना ही "क्या कहा गया" बताना है। उदाहरण: पाठ 5 में.' }
          ],
            remediations: { '5': { steps: ['छात्र से कहें: "पाठ की 5 बड़ी घटनाएँ लिखो। अब हर घटना के आगे लिखो: \'इससे लेखक क्या कहना चाहता है?\' — यही विषय निकलेगा।".', 'एक T-चार्ट बनाएँ: बाएँ कॉलम में **घटना/संवाद**, दाएँ में **निहित अर्थ** — 4-5 पंक्तियाँ भरवाएँ। 3.', 'फिर पूछें: "ये सारे अर्थ मिलकर कौन-सा एक बड़ा कथन बनाते हैं?" — वही मुख्य विषय है। 4.', 'अंत में: "इस कथन से हमें क्या सीख मिली?" — वही संदेश है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
