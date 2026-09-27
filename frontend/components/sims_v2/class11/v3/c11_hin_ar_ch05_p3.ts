import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch05_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'See a modern institution carrying an old hierarchy in its walls.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c11_hin_ar_ch05'],
    nodeIds: ['c11_hin_ar_cbse_05_013', 'c11_hin_ar_cbse_05_014', 'c11_hin_ar_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader testing a cantonment\'s promise of equality', intro: 'A new nation, a cantonment town, an old ladder of caste — the story asks who the new order is really for.', goal: 'Analyse caste and education in a post-independence cantonment setting through Nayi Kahani realism.' },
    discovery: {
        question: 'Post-1947 India promised a modern, equal cantonment — did the new order actually erase caste?',
        options: ['No — the cantonment\'s modern surface hides intact caste hierarchy, and education becomes the contested route to dignity', 'Yes — the army\'s discipline abolished caste overnight', 'Yes — independence legally ended all discrimination', 'No — because cantonments don\'t exist anymore'],
        answer: 'No — the cantonment\'s modern surface hides intact caste hierarchy, and education becomes the contested route to dignity',
        hook: 'Nayi Kahani\'s rule: no heroes, no easy rescue — just middle-class realism where dignity must be fought for inside an unequal system.',
    },
    teaching: [
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या, किसी साहित्यिक पाठ के घटकों (कथानक, पात्र, भाषा, शिल्प) को तार्किक ढंग से विखंडित करके (विश्लेषण), उनके पारस्परिक संबंधों एवं गहन अर्थों को उद्घाटित करना.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map the cantonment\'s social structure, trace how education collides with caste, and argue whether the story\'s resolution is hope or realism.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_05_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 3/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्य/पद्य अंश से साक्ष्य.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — **वाचन-श्रवण: चर्चा-बिंदु** का अर्थ है — किसी साहित्यिक पाठ (गद्य/पद्य) के **सस्वर वाचन**.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class debates a story set in an army cantonment where a Dalit boy\'s education is his only escape. One student calls it \'a sad tale about one cruel officer and a lucky boy — the quarters, the school, the floods are just background.\'',
            decisions: [{ prompt: 'What\'s missing from that reading?', options: [
                { text: 'Reframe through context and structure: Shukla/Shivprasad Singh write in the Nayi Kahani mode — the cantonment is a designed microcosm where quarters are allotted by rank and caste and the school is the only porous boundary, so institutions, not one villain, reproduce caste. And the elliptical structure — childhood, flood, clerkship with years skipped — enacts how change for a lower-caste life isn\'t a smooth climb but rare visible breakthroughs between invisible struggle.', outcome: 'The debate shifts from pity to analysis: \'Low Quarter vs Officer Quarter\' reads as structural evidence, and the gaps in time become the argument.' },
                { text: 'Keep the individual-villain reading — the story works as a warning about cruel officers.', outcome: 'Personalising it hides the target: the story dissects how school, army and family as systems reproduce caste — replacing one officer changes nothing.', reveals: 'caste-is-one-bad-officer' },
                { text: 'Fill in the missing years in your summary — schooling and job-hunting must have happened, so narrate them.', outcome: 'The ellipsis is deliberate: making struggle invisible between breakthroughs is how the structure mirrors the theme — summarising the gaps erases the design.', reveals: 'gaps-are-just-missing-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'The story refuses both cynicism and fantasy — dignity is possible, but only through struggle the system makes necessary.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या, किसी साहित्यिक पाठ के घटकों (कथानक.',
          hint: 'यदि फँस जाएँ तो c11_hin_ar_cbse_05_008 (बिंब और रूपक) और c11_hin_ar_cbse_05_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आलोचनात्मक चिंतन\' का अर्थ \'नकारात्मक आलोचना\' (Fault-finding) करना है।** वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या, किसी साहित्यिक पाठ के घटकों (कथानक, पात्र, भाषा,',
                  options: ['आलोचनात्मक चिंतन: विश्लेषण और व्याख्या, किसी साहित्यिक पाठ के घटकों (कथानक, पात्र, भाषा,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि फँस जाएँ तो c11_hin_ar_cbse_05_008 (बिंब और रूपक) और c11_hin_ar_cbse_05_009 (विरोधाभास और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आलोचनात्मक चिंतन\' का अर्थ \'नकारात्मक आलोचना\' (Fault-finding) करना है।** वे सोचते हैं कि विश्लेषण.' }
          ],
            remediations: { 'fault-finding': { steps: ['**शब्दावली स्पष्टीकरण:** छात्र से कहें: "आलोचनात्मक का अर्थ \'निंदा\' नहीं, \'विवेकपूर्ण परीक्षण\' (Discerning Examination).', '**मॉडलिंग (Modeling):** पाठ 5 के एक छोटे अंश पर **\'थिंक-अलाउड\' (Think-Aloud)** करें: "मैं देख रहा हूँ लेखक ने यहाँ छोटे.', 'इससे तनाव बढ़ता है (व्याख्या)...', 'यह पाठ के विषय \'आतंक\' को सशक्त बनाता है (मूल्यांकन)।" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्य/पद्य अंश से.',
          hint: 'यदि अटके: **c11_hin_ar_cbse_05_012 (बोध-प्रश्न)** पर लौटें — वहाँ \'पाठ से उत्तर ढूँढना\'.',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर लिखने का अर्थ है पाठ के महत्त्वपूर्ण अंश **उद्धृत कर देना** — जितने लंबे उद्धरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्य/पद्य अंश से साक्ष्य',
                  options: ['पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्य/पद्य अंश से साक्ष्य', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटके: **c11_hin_ar_cbse_05_012 (बोध-प्रश्न)** पर लौटें — वहाँ \'पाठ से उत्तर ढूँढना\' चरण-दर-चरण.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर लिखने का अर्थ है पाठ के महत्त्वपूर्ण अंश **उद्धृत कर देना** — जितने लंबे उद्धरण, उतने ज्यादा अंक।".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक **मॉडल उत्तर** दें जिसमें **लाल रंग से Point, हरे से Evidence, नीले से Explanation, बैंगनी से Link**.', 'फिर उसी प्रश्न का **एक खराब उत्तर** (केवल उद्धरणों का ढेर) दें — पूछें: "कहाँ अटके?" 3.', 'अब उसे **केवल 2 वाक्यों में** वही उत्तर **PEEL में पुनर्लिखने** को कहें — समय सीमा: 3 मिनट। 4.', 'अंत में: "तुम्हारे दूसरे वाक्य में Evidence कहाँ है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_015', difficulty: 'standard',
          question: '**वाचन-श्रवण: चर्चा-बिंदु** का अर्थ है — किसी साहित्यिक पाठ (गद्य/पद्य) के.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_05_013 (आलोचनात्मक चिंतन: विश्लेषण और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ है — पाठ पर अपने \'विचार/फीलिंग्स\' बोल देना**। वे **पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वाचन-श्रवण: चर्चा-बिंदु** का अर्थ है',
                  options: ['**वाचन-श्रवण: चर्चा-बिंदु** का अर्थ है', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_05_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ है — पाठ पर अपने \'विचार/फीलिंग्स\' बोल देना**। वे **पाठ के भाषिक साक्ष्य.' }
          ],
            remediations: { 'linguistic-evidence-decoration': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**मॉडलिंग (Modelling):** शिक्षक पाठ-5 के एक छोटे अंश (3-4 पंक्तियाँ) पढ़कर **सोचते हुए (think-aloud)** दिखाए: "यहां.', '\'Y\' शब्द होता तो अर्थ कैसे बदलता?', 'यह बिंब पात्र की मनःस्थिति से कैसे जुड़ता है?" — इससे छात्र देखते हैं कि **चर्चा-बिंदु कैसे \'पैदा\' किया जाता है**। 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
