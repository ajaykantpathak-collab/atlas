import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch02_p3: SimDef = {
    id: 'v3_c12_hin_a_ch02_p3',
    title: 'सरोज स्मृति · Part 3/3',
    subtitle: 'He lost everything — and gained every register of the language',
    classLevel: 12, subject: 'hin_a', topic: 'सरोज स्मृति · Part 3/3',
    chapters: ['c12_hin_a_ch02'],
    nodeIds: ['c12_hin_a_cbse_02_013', 'c12_hin_a_cbse_02_014', 'c12_hin_a_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poet\'s biographer', intro: 'Three tragedies before forty — and a poetic range no one else matched. The biography explains the voice.', goal: 'Connect Nirala\'s losses and editorial life to his stylistic range and evolution beyond Chhayavad.' },
    discovery: {
        question: 'Orphaned young, widowed early, alone in a Kolkata boarding house — yet Nirala\'s poems celebrate life\'s fleeting beauty. How does grief become craft?',
        options: ['Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice', 'He suppressed the grief', 'Poetry was his therapy only', 'Luck and talent'],
        answer: 'Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice',
        hook: 'Nirala outgrew Chhayavad\'s self-centred lyricism — from subjective romance to epic history, satire and metaphysical inquiry. His language had \'many forms and levels\': the same pen wrote high-Sanskrit prayer and village-cornfield satire. Grief was the fuel; craft was the engine.',
    },
    teaching: [
        { title: 'सरोज स्मृति — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'अंतरा भाग-2 — पाठ 2\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a poet\'s alchemy: follow the losses that forged him, map his leap beyond Chhayavad\'s bounds, and hear one voice speak in epic Sanskrit and village Avadhi both.',
        labels: ['सरोज स्मृति — आशय-स्पष्टीकरण', 'सरोज स्मृति — परीक्षा-उत्तर', 'सरोज स्मृति — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_014', title: 'सरोज स्मृति — परीक्षा-उत्तर लेखन कौशल',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 2\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing skills" means memorizing model answers for predicted questions.', reveals: 'writing-skills-means-memorizing-model' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means memorizing model answers for predicted questions.', reveals: 'writing-skills-means-memorizing-model' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_015', title: 'सरोज स्मृति — वाचन-पाठ और चर्चा-बिंदु',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 2\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of a structured literary discussion in a Class 12 Hindi classroom?', options: [
                { text: 'The primary purpose is to develop students\' ability to articulate evidence‑based', outcome: 'The primary purpose is to develop students\' ability to articulate evidence‑based interpretations.' },
                { text: 'to memorize the poem', outcome: 'Not quite — Students often treat speaking and listening as "just talking" and believe that sharing personal.', reveals: 'students-often-treat-speaking-and' },
                { text: 'It was sad', outcome: 'Not quite — Students often treat speaking and listening as "just talking" and believe that sharing personal.', reveals: 'students-often-treat-speaking-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re making a memorial film for a departed grandparent. The editor wants strict chronology — birth, childhood, marriage, death — \'so it\'s clear.\' Your best asset is a single fading photograph of her as a young woman.',
            decisions: [{ prompt: 'What does the structure of Agyeya\'s \'लज्जत लेखा\' advise?', options: [
                { text: 'Open on the photograph — let the frame\'s mystery pull the viewer back through fragments of her life and return to the portrait at the end; the non-linear circle enacts how memory actually holds the dead, and makes impermanence felt rather than stated.', outcome: 'The poem begins with a portrait because the trace is all that survives — starting there gives the viewer the poet\'s own shock of discovery; chronology would flatten the loss into a record.' },
                { text: 'Go chronological — clarity is respect, and audiences shouldn\'t have to piece a life together.', outcome: 'The chapter\'s counter is that order is meaning: the circular frame mimics the mind returning to a fixed image; a straight birth-to-death line dilutes the irony that only the image remains.', reveals: 'clarity-demands-chronology' },
                { text: 'Drop the photograph and structure the film around interviews with people who knew her.', outcome: 'That trades the anchor for testimony: the poem\'s power is the single surviving image holding a whole life — without it, the memories float unattached.', reveals: 'testimony-beats-image' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a life into its poetry — and see how Nirala turned personal catastrophe into the widest range in modern Hindi verse.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_013', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि फंसे हों तो पद्यांश-वार भावार्थ (c12_hin_a_cbse_02_002) की दोबारा समीक्षा करें और.',
          misconception: 'छात्र अक्सर आशय-स्पष्टीकरण में केवल पद्यांश के शब्दार्थ का अनुवाद करके भाव-विश्लेषण को छोड़ देते हैं, जैसे "फूलों की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 2\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'अंतरा भाग-2 — पाठ 2\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे हों तो पद्यांश-वार भावार्थ (c12_hin_a_cbse_02_002) की दोबारा समीक्षा करें और विशेष रूप से.',
                  misconception: 'छात्र अक्सर आशय-स्पष्टीकरण में केवल पद्यांश के शब्दार्थ का अनुवाद करके भाव-विश्लेषण को छोड़ देते हैं, जैसे "फूलों की चादर" को बस "फूलों से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताइए कि पहले पद्यांश को दो बार पढ़िए: पहली बार सिर्फ शब्दों को समझने के लिए, दूसरी बार भाव महसूस करने के लिए।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_014', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If the student cannot generate a Point for a given question, they should re-read the.',
          misconception: 'Students believe "writing skills" means memorizing model answers for predicted questions.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'writing skills', '"writing skills" means memorizing model answers for predicted questions'],
                  hint: 'If the student cannot generate a Point for a given question, they should re-read the Critical.',
                  misconception: 'Students believe "writing skills" means memorizing model answers for predicted questions.' },
                { id: 'b', prompt: 'A student writes: "In the poem, the father misses his daughter. He sees her in the rainbow.', answer: 'Weaknesses: (1) No textual evidence',
                  options: ['Weaknesses: (1) No textual evidence', 'writing skills', '"writing skills" means memorizing model answers for predicted questions'],
                  hint: 'If the student cannot generate a Point for a given question, they should re-read the Critical.',
                  misconception: 'Students believe "writing skills" means memorizing model answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-means-memorizing-model': { steps: ['Have the student take one past board question (e.g., 2023: "ljkst osQ uo&oèkw :i dk o.kZu dhft,") and write a fresh.', 'Together, highlight each PEEL component in their answer using four coloured pens.', 'Identify missing components (usually Explanation and Link).', 'Rewrite only the weak paragraphs, keeping the strong Point and Evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills" means memorizing model answers for predicted questions.',
          parts: [
                { id: 'a', prompt: 'Write a 50-word diary entry dated the day after the rainbow scene, from the father\'s perspective in "ljkst Le`fr", using first-person voice, sensory detail.', answer: 'A strong entry captures the father\'s raw voice: "aj fir vkewy uoy ns[kk',
                  options: ['A strong entry captures the father\'s raw voice: "aj fir vkewy uoy ns[kk', 'writing skills', '"writing skills" means memorizing model answers for predicted questions'],
                  hint: 'If the student cannot generate a Point for a given question, they should re-read the Critical.',
                  misconception: 'Students believe "writing skills" means memorizing model answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-means-memorizing-model': { steps: ['Have the student take one past board question (e.g., 2023: "ljkst osQ uo&oèkw :i dk o.kZu dhft,") and write a fresh.', 'Together, highlight each PEEL component in their answer using four coloured pens.', 'Identify missing components (usually Explanation and Link).', 'Rewrite only the weak paragraphs, keeping the strong Point and Evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_015', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" (c12_hin_a_cbse_02_008) and.',
          misconception: 'Students often treat speaking and listening as "just talking" and believe that sharing personal feelings without.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a structured literary discussion in a Class 12 Hindi classroom?', answer: 'The primary purpose is to develop students\' ability to articulate evidence‑based',
                  options: ['The primary purpose is to develop students\' ability to articulate evidence‑based', 'to memorize the poem', 'It was sad'],
                  hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" (c12_hin_a_cbse_02_008) and "Critical.',
                  misconception: 'Students often treat speaking and listening as "just talking" and believe that sharing personal feelings without textual anchoring.' },
                { id: 'b', prompt: 'During a discussion on the metaphor "nq[k gh thou dh dFkk jgh", a peer says, "This means life is short." How would you apply the concept of metaphor analysis.', answer: 'Step 1: Identify the tenor (life) and vehicle (unfinished story)',
                  options: ['Step 1: Identify the tenor (life) and vehicle (unfinished story)', 'life is short', 'It was sad'],
                  hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" (c12_hin_a_cbse_02_008) and "Critical.',
                  misconception: 'Students often treat speaking and listening as "just talking" and believe that sharing personal feelings without textual anchoring.' },
                { id: 'c', prompt: 'Compare two possible discussion openings: (A) "I felt sad reading this poem." (B) "The repetition of \'Fkj&Fkj&Fkj\' in stanza 2 creates a rhythmic echo of the.', answer: 'Opening B is more productive',
                  options: ['Opening B is more productive', 'It was sad'],
                  hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" (c12_hin_a_cbse_02_008) and "Critical.',
                  misconception: 'Students often treat speaking and listening as "just talking" and believe that sharing personal feelings without textual anchoring.' }
          ],
            remediations: { 'students-often-treat-speaking-and': { steps: ['Revisit the poem with a highlighter: mark every image, metaphor, and sound device.', 'Practice the "Quote‑Analyse‑Question" routine: pick one marked line, write a two‑sentence analysis, then frame an open.', 'Record a 1‑minute solo response, playback, and check for textual evidence and analytical vocabulary.', 'Pair with a peer and do a timed 2‑minute exchange using the routine; give each other feedback on evidence use.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
