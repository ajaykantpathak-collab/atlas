import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch12_p3: SimDef = {
    id: 'v3_c12_hin_a_ch12_p3',
    title: 'संवदयिा · Part 3/3',
    subtitle: 'A union leader wrote the village in the village\'s own voice',
    classLevel: 12, subject: 'hin_a', topic: 'संवदयिा · Part 3/3',
    chapters: ['c12_hin_a_ch12'],
    nodeIds: ['c12_hin_a_cbse_12_013', 'c12_hin_a_cbse_12_014', 'c12_hin_a_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Socialist-fiction reader', intro: 'He fought the British, organised workers, then sat down to write the village as the village sounds.', goal: 'Read Renu\'s/Phanishwar Nath\'s story through socialist humanism — colloquial voice as the carrier of rural truth.' },
    discovery: {
        question: 'A Quit India activist and trade unionist writes a village story in the village\'s own tongue — why does the colloquial language matter as much as the plot?',
        options: ['Voice is the politics — a socialist eye sees suffering with human warmth, and only the village\'s own speech can carry that truth without the textbook\'s distance', 'Simple language for simple readers', 'Dialect is easier to write', 'Just realism for colour'],
        answer: 'Voice is the politics — a socialist eye sees suffering with human warmth, and only the village\'s own speech can carry that truth without the textbook\'s distance',
        hook: '\'Simple\' isn\'t \'artless\' — colloquial, descriptive, expressive prose immerses you in village life so hardship and tenderness land as lived, not reported. A socialist lens sees both the poverty AND the feeling; the story outlives its decade because the rural-urban divide still argues today.',
    },
    teaching: [
        { title: 'संवदयिा — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'अंतरा भाग-2 — पाठ 12\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the village through its own speech: weigh a freedom fighter\'s lens on rural suffering, test why colloquiality is craft, and ask what a 1950s story still teaches a 2025 reader.',
        labels: ['संवदयिा — आलोचनात्मक चिंतन', 'संवदयिा — लेखन कौशल', 'संवदयिा — वाचन-श्रवण: चर्चा-बिंदु'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_013', title: 'संवदयिा — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 12\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'What is the literal meaning of the term "laofn;k" as established in the opening paragraph of the story, and what social function does the.', options: [
                { text: '"laofn;k" literally means "one who tells/recites stories" (lans\'kokgd)', outcome: '"laofn;k" literally means "one who tells/recites stories" (lans\'kokgd).' },
                { text: 'respected elder', outcome: 'Not quite — Students often treat "critical analysis" as "finding hidden symbols" — e.g., claiming the "xkM+h".', reveals: 'students-often-treat-critical-analysis' },
                { text: 'priest', outcome: 'Not quite — Students often treat "critical analysis" as "finding hidden symbols" — e.g., claiming the "xkM+h".', reveals: 'students-often-treat-critical-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your family wants to shift the ageing grandmother — who has nursed half the village\'s children — into your city flat \'for her own good.\' She refuses flatly, and everyone calls it stubbornness.',
            decisions: [{ prompt: 'How does the climax of \'रेणु\' read her refusal?', options: [
                { text: 'As the story\'s peak of belonging — the nanny refuses the narrator\'s city offer with \'you are my mother, mother of the whole village\' echoing around her; she isn\'t refusing care, she\'s rooted where her care made her everyone\'s.', outcome: 'The story builds to that confrontation precisely so her staying reads as identity, not obstinacy — the village is her life\'s work, and removing her to \'safety\' removes her from herself.' },
                { text: 'Insist on the move — the city\'s facilities objectively outweigh a village attachment.', outcome: 'That\'s the narrator\'s own plan at the climax, and the story gives it no victory: her refusal stands because the measure of her good isn\'t amenities but the web of people who call her mother.', reveals: 'facilities-outweigh-roots' },
                { text: 'Let her stay but stop calling — if she chooses the village, she\'s chosen isolation.', outcome: 'The story\'s flashbacks exist to show she\'s the least alone person in it — the refusal closes the city plan, not the relationship; withdrawing contact punishes her for rootedness.', reveals: 'staying-equals-isolation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'You can now read voice as worldview — where the choice of dialect is itself a statement about whose reality counts.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_013', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 12\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'If stuck, re-read the "iz\'u&vH;kl" (exercise questions) at the end of the NCERT chapter.',
          misconception: 'Students often treat "critical analysis" as "finding hidden symbols" — e.g., claiming the "xkM+h" (cot) *represents*.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the term "laofn;k" as established in the opening paragraph of the story, and what social function does the narrator say.', answer: '"laofn;k" literally means "one who tells/recites stories" (lans\'kokgd)',
                  options: ['"laofn;k" literally means "one who tells/recites stories" (lans\'kokgd)', 'respected elder', 'priest'],
                  hint: 'If stuck, re-read the "iz\'u&vH;kl" (exercise questions) at the end of the NCERT chapter — Questions.',
                  misconception: 'Students often treat "critical analysis" as "finding hidden symbols" — e.g., claiming the "xkM+h" (cot) *represents* the caste system.' },
                { id: 'b', prompt: 'Analyze the significance of the repeated song "gekjks laokn ys tkgq js laofn;k&;k&;k" at three key moments: (a) when gjxksfcu first arrives, (b) when he leaves.', answer: 'when gjxksfcu first arrives, (',
                  options: ['when gjxksfcu first arrives, (', 'background music'],
                  hint: 'If stuck, re-read the "iz\'u&vH;kl" (exercise questions) at the end of the NCERT chapter — Questions.',
                  misconception: 'Students often treat "critical analysis" as "finding hidden symbols" — e.g., claiming the "xkM+h" (cot) *represents* the caste system.' }
          ],
            remediations: { 'students-often-treat-critical-analysis': { steps: ['If the student cannot distinguish analysis from speculation: (1) Have them list 5 physical details about the cot from.', '(2) Ask: "Which of these details does the author *choose* to include, and what does that choice *do* to the reader\'s.', '(4) Re-attempt Diagnostic Question 4 with the song, using only words the author wrote.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "critical analysis" as "finding hidden symbols" — e.g., claiming the "xkM+h" (cot) *represents*.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "gjxksfcu is the villain of the story." Defend your position using at least three specific textual moments.', answer: 'The claim is reductive',
                  options: ['The claim is reductive', 'simply condemns or excuses him fails to engage the story\'s moral complexity'],
                  hint: 'If stuck, re-read the "iz\'u&vH;kl" (exercise questions) at the end of the NCERT chapter — Questions.',
                  misconception: 'Students often treat "critical analysis" as "finding hidden symbols" — e.g., claiming the "xkM+h" (cot) *represents* the caste system.' }
          ],
            remediations: { 'students-often-treat-critical-analysis': { steps: ['If the student cannot distinguish analysis from speculation: (1) Have them list 5 physical details about the cot from.', '(2) Ask: "Which of these details does the author *choose* to include, and what does that choice *do* to the reader\'s.', '(4) Re-attempt Diagnostic Question 4 with the song, using only words the author wrote.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_014', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 12\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि PEEL संरचना स्पष्ट नहीं है, तो कक्षा 11 के लेखन कौशल नोड (c11_hin_ar_cbse_01_014) का.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पाठ्य साक्ष्य\' (textual evidence) का अर्थ है **कहानी के लंबे अंश उद्धृत करना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 12\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'अंतरा भाग-2 — पाठ 12\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 12\' का कथानक — \'अंतरा भाग-2 — पाठ 12\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि PEEL संरचना स्पष्ट नहीं है, तो कक्षा 11 के लेखन कौशल नोड (c11_hin_ar_cbse_01_014) का \'उत्तर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पाठ्य साक्ष्य\' (textual evidence) का अर्थ है **कहानी के लंबे अंश उद्धृत करना (quoting long.' }
          ],
            remediations: { 'textual-evidence-quoting-long-passages': { steps: ['**चरण 1 — निदान:** छात्र से कहें: "अपना अंतिम लिखा उत्तर निकालो। उसमें पीले हाइलाइटर से Point, गुलाबी से Evidence, नीले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_015', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 12\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि चर्चा में बोलते समय संरचना बनाने में कठिनाई हो, तो पहले कागज़ पर PEEL प्रारूप में.',
          misconception: 'छात्र अक्सर मानते हैं कि \'वाचन-श्रवण: चर्चा-बिंदु\' में केवल बोलने का कौशल महत्वपूर्ण है — वे सोचते हैं कि जितना अधिक और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 12\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का',
                  options: ['\'अंतरा भाग-2 — पाठ 12\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 12\' का कथानक — \'अंतरा भाग-2 — पाठ 12\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि चर्चा में बोलते समय संरचना बनाने में कठिनाई हो, तो पहले कागज़ पर PEEL प्रारूप में नोट्स बनाइए.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'वाचन-श्रवण: चर्चा-बिंदु\' में केवल बोलने का कौशल महत्वपूर्ण है — वे सोचते हैं कि जितना अधिक और जितना ज़ोर से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस भ्रम में फंसे हैं, तो पहले उन्हें एक जोड़ी में बैठाइए और 2 मिनट का टाइमर लगाइए — एक व्यक्ति 60 सेकंड तक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
