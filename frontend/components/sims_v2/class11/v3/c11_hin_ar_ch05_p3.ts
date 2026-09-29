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
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'आरोह भाग-1 — पाठ 5\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map the cantonment\'s social structure, trace how education collides with caste, and argue whether the story\'s resolution is hope or realism.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_014', title: 'पाठ 5 — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 5\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "using difficult Hindi words" or "writing long paragraphs" earns marks.', reveals: 'using-difficult-hindi-words-or' },
                { text: 'using difficult Hindi words', outcome: 'Not quite — Students believe "using difficult Hindi words" or "writing long paragraphs" earns marks.', reveals: 'using-difficult-hindi-words-or' }
            ] }] } },
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
          question: '\'आरोह भाग-1 — पाठ 5\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि फँस जाएँ तो c11_hin_ar_cbse_05_008 (बिंब और रूपक) और c11_hin_ar_cbse_05_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आलोचनात्मक चिंतन\' का अर्थ \'नकारात्मक आलोचना\' (Fault-finding) करना है।** वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 5\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'आरोह भाग-1 — पाठ 5\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 5\' का कथानक — \'आरोह भाग-1 — पाठ 5\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ तो c11_hin_ar_cbse_05_008 (बिंब और रूपक) और c11_hin_ar_cbse_05_009 (विरोधाभास और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आलोचनात्मक चिंतन\' का अर्थ \'नकारात्मक आलोचना\' (Fault-finding) करना है।** वे सोचते हैं कि विश्लेषण.' }
          ],
            remediations: { 'fault-finding': { steps: ['**शब्दावली स्पष्टीकरण:** छात्र से कहें: "आलोचनात्मक का अर्थ \'निंदा\' नहीं, \'विवेकपूर्ण परीक्षण\' (Discerning Examination).', '**मॉडलिंग (Modeling):** पाठ 5 के एक छोटे अंश पर **\'थिंक-अलाउड\' (Think-Aloud)** करें: "मैं देख रहा हूँ लेखक ने यहाँ छोटे.', 'इससे तनाव बढ़ता है (व्याख्या)...', 'यह पाठ के विषय \'आतंक\' को सशक्त बनाता है (मूल्यांकन)।" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_014', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 5\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c11_hin_ar_cbse_05_006).',
          misconception: 'Students believe "using difficult Hindi words" or "writing long paragraphs" earns marks.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'using difficult Hindi words', 'writing long paragraphs'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c11_hin_ar_cbse_05_006) to recall the.',
                  misconception: 'Students believe "using difficult Hindi words" or "writing long paragraphs" earns marks.' },
                { id: 'b', prompt: 'Explain in your own words why merely summarizing the plot of "xyrk yksgk" does not fetch full marks in a "character sketch of Eksgu" question.', answer: 'A summary narrates events',
                  options: ['A summary narrates events', 'what happens', 'what it means', 'using difficult Hindi words'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c11_hin_ar_cbse_05_006) to recall the.',
                  misconception: 'Students believe "using difficult Hindi words" or "writing long paragraphs" earns marks.' },
                { id: 'c', prompt: 'A student writes: "Eksgu is oppressed because he is low caste. The teacher beats him.', answer: 'Improved PEEL version: Point – Eksgu internalizes caste oppression',
                  options: ['Improved PEEL version: Point – Eksgu internalizes caste oppression', 'teacher beats him', 'using difficult Hindi words', 'writing long paragraphs'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c11_hin_ar_cbse_05_006) to recall the.',
                  misconception: 'Students believe "using difficult Hindi words" or "writing long paragraphs" earns marks.' }
          ],
            remediations: { 'using-difficult-hindi-words-or': { steps: ['Pick one question from the textbook exercise (e.g., Q2: "Is the teacher a ideal teacher?").', 'Force the student to write ONLY the Point sentence.', 'Ask: "Which ONE line from the story proves this?" – they must underline it in the text.', 'Have them write the Explanation sentence starting with "This shows that..." 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "using difficult Hindi words" or "writing long paragraphs" earns marks.',
          parts: [
                { id: 'a', prompt: 'Create a 60-word answer for: "How does the tea-stall setting function as a symbol in \'xyrk yksgk\'?" Use PEEL structure.', answer: 'Point: The tea stall symbolizes the inescapable caste trap',
                  options: ['Point: The tea stall symbolizes the inescapable caste trap', 'using difficult Hindi words', 'writing long paragraphs', '"using difficult Hindi words" or "writing long paragraphs" earns marks'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c11_hin_ar_cbse_05_006) to recall the.',
                  misconception: 'Students believe "using difficult Hindi words" or "writing long paragraphs" earns marks.' }
          ],
            remediations: { 'using-difficult-hindi-words-or': { steps: ['Pick one question from the textbook exercise (e.g., Q2: "Is the teacher a ideal teacher?").', 'Force the student to write ONLY the Point sentence.', 'Ask: "Which ONE line from the story proves this?" – they must underline it in the text.', 'Have them write the Explanation sentence starting with "This shows that..." 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_015', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 5\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_05_013 (आलोचनात्मक चिंतन: विश्लेषण और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ है — पाठ पर अपने \'विचार/फीलिंग्स\' बोल देना**। वे **पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 5\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।',
                  options: ['\'आरोह भाग-1 — पाठ 5\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 5\' का कथानक — \'आरोह भाग-1 — पाठ 5\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_05_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ है — पाठ पर अपने \'विचार/फीलिंग्स\' बोल देना**। वे **पाठ के भाषिक साक्ष्य.' }
          ],
            remediations: { 'linguistic-evidence-decoration': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**मॉडलिंग (Modelling):** शिक्षक पाठ-5 के एक छोटे अंश (3-4 पंक्तियाँ) पढ़कर **सोचते हुए (think-aloud)** दिखाए: "यहां.', '\'Y\' शब्द होता तो अर्थ कैसे बदलता?', 'यह बिंब पात्र की मनःस्थिति से कैसे जुड़ता है?" — इससे छात्र देखते हैं कि **चर्चा-बिंदु कैसे \'पैदा\' किया जाता है**। 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
