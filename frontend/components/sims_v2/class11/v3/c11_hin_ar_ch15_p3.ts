import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch15_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch15_p3',
    title: 'पाठ 15 · Part 3/3',
    subtitle: 'Watch a poem dismantle your definitions before it offers its own.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 15 · Part 3/3',
    chapters: ['c11_hin_ar_ch15'],
    nodeIds: ['c11_hin_ar_cbse_15_013', 'c11_hin_ar_cbse_15_014', 'c11_hin_ar_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a hill journalist naming the cruelty inside ordinary leaving', intro: 'Men leave Garhwal for Delhi\'s scaffolds and it barely counts as news — the poem asks what \'small\' and \'cruel\' really mean.', goal: 'Analyse the negative-then-positive argumentative structure and the poem\'s migrant-labour context.' },
    discovery: {
        question: 'The poem opens by listing what cruelty is NOT — three whole stanzas of negatives. Cut them and lose nothing?',
        options: ['No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle', 'Yes — a poem should state its thesis upfront', 'Yes — negative definitions are logically empty', 'No — but only because the poem would be too short'],
        answer: 'No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle',
        hook: 'The refrain flips at the fourth stanza — \'not this\' becomes \'this is the most dangerous\' — and the imagery turns from home\'s warmth to a worker\'s weary feet.',
    },
    teaching: [
        { title: 'पाठ 15 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'लघुता सबसे छोटी नहीं होती\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_15_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the stanza where negation flips to assertion, then weigh the title\'s provocation — \'the smallest is not the smallest\' — against 1980s hill migration.',
        labels: ['पाठ 15 — आलोचनात्मक', 'पाठ 15 — लेखन', 'पाठ 15 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_014', title: 'पाठ 15 — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'लघुता सबसे छोटी नहीं होती\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in structured answer writing?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe that writing a detailed summary of the poem with a few quoted lines constitutes.', reveals: 'writing-a-detailed-summary-of' },
                { text: 'lack logical flow', outcome: 'Not quite — Students believe that writing a detailed summary of the poem with a few quoted lines constitutes.', reveals: 'writing-a-detailed-summary-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_015', title: 'पाठ 15 — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'लघुता सबसे छोटी नहीं होती\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion in a Class 11 Hindi classroom?', options: [
                { text: 'The primary purpose is to collaboratively explore multiple interpretations of a text,', outcome: 'The primary purpose is to collaboratively explore multiple interpretations of a text, deepen.' },
                { text: 'to find the single correct meaning the teacher expects', outcome: 'Not quite — Students often think a literary discussion is a debate where they must \'win\' by proving their.', reveals: 'a-literary-discussion-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a kavi sammelan themed on migration, someone offers \'Laguta Sabse Chhoti Nahin Hoti\' but introduces it as \'a gentle poem about how small people also matter — mothers\' love, fathers\' laps, childhood warmth.\'',
            decisions: [{ prompt: 'What is the poem actually arguing, and how is it built?', options: [
                { text: 'Read the title as provocation from a people\'s-advocate journalist of Tehri Garhwal who watched villages empty as men left for Delhi\'s construction sites: \'smallness\' is redefined as the erosion of dignity when survival fractures belonging. Structurally it argues by elimination — the first stanzas keep saying what cruelty is NOT before the positives arrive, climaxing in the weary worker\'s feet — dignity dying slowly in everyday struggle.', outcome: 'The introduction is corrected: it\'s not a warm affirmation of small lives but a reckoning with what migration does to human worth — built like a debate, not a lullaby.' },
                { text: 'Keep the gentle reading — the poem lists tender images of family, so it\'s about the dignity of simple lives.', outcome: 'The early stanzas are negatives — what cruelty is NOT — positioned to be stripped away; reading them as the thesis stops before the poem\'s real answer.', reveals: 'poem-is-gentle-affirmation' },
                { text: 'Present it as having no real structure — it\'s a mood piece on poverty, not an argument.', outcome: 'The argumentative architecture is precise: sequenced denials, a refrain as hinge, and a final image as verdict — structure performs the elimination.', reveals: 'poem-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'Written by a journalist who watched Tehri\'s villages empty to Delhi\'s construction sites — \'small\' was never about size; it\'s about what we\'re trained not to see.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_013', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि अटके तो **नोड 15_008 और 15_009** (बिंब/रूपक व विरोधाभास/प्रतीक) के कार्याभ्यास.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आलोचनात्मक चिंतन = पाठ में कमियाँ निकालना (fault-finding)" या "अपनी निजी राय लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लघुता सबसे छोटी नहीं होती\' का आलोचनात्मक चिंतन',
                  options: ['\'लघुता सबसे छोटी नहीं होती\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लघुता सबसे छोटी नहीं होती\' का कथानक', '\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **नोड 15_008 और 15_009** (बिंब/रूपक व विरोधाभास/प्रतीक) के कार्याभ्यास (worked.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आलोचनात्मक चिंतन = पाठ में कमियाँ निकालना (fault-finding)" या "अपनी निजी राय लिख देना"।.' }
          ],
            remediations: { 'fault-finding': { steps: ['**पुनः परिभाषा स्पष्ट करें:** छात्र से कहें — "आलोचनात्मक चिंतन का अर्थ \'निंदा\' नहीं, \'विवेचन\' है। जैसे डॉक्टर रोगी की.', '**माइक्रो-अभ्यास कराएँ:** पाठ 15 का एक छोटा अंश (3-4 वाक्य) दें और केवल **एक** युक्ति (जैसे: अनुप्रास, विरोधाभास.', '**PEEL ढाँचा जबरन लागू करवाएँ:** हर उत्तर में चार वाक्य अनिवार्य करें — (Point) "लेखक ने X युक्ति प्रयुक्त की है".', '**सहकर्मी समीक्षा (peer review):** दो छात्रों के उत्तर बदलवाएँ और पूछें: "क्या तुम्हारे साथी ने **साक्ष्य से अर्थ तक की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_014', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की.',
          hint: 'Review the Theme nodes (006, 007) and Literary Devices nodes (008, 009) to refresh.',
          misconception: 'Students believe that writing a detailed summary of the poem with a few quoted lines constitutes a good analytical.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in structured answer writing?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'lack logical flow'],
                  hint: 'Review the Theme nodes (006, 007) and Literary Devices nodes (008, 009) to refresh thematic and.',
                  misconception: 'Students believe that writing a detailed summary of the poem with a few quoted lines constitutes a good analytical answer.' }
          ],
            remediations: { 'writing-a-detailed-summary-of': { steps: ['Show the student a model 5-mark answer with each PEEL component highlighted in different colors.', 'Give a new question and ask them to write *only* the Point sentence.', 'Ask them to add two Evidence lines from the poem.', 'Guide them to write Explanation for each evidence: "यह पंक्ति दर्शाती है कि..." 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_015', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, review the imagery and metaphor analysis (c11_hin_ar_cbse_15_008) and theme.',
          misconception: 'Students often think a literary discussion is a debate where they must \'win\' by proving their interpretation.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet says "esgur dh ywV lcls [krjukd ugha gksrh" (the burning of the pyre is not the most terrifying) and what this suggests.', answer: 'The poet rejects conventional fears (death, physical pain) to highlight a deeper',
                  options: ['The poet rejects conventional fears (death, physical pain) to highlight a deeper', 'fire is scary', 'lists literal fears (e'],
                  hint: 'If stuck, review the imagery and metaphor analysis (c11_hin_ar_cbse_15_008) and theme analysis.',
                  misconception: 'Students often think a literary discussion is a debate where they must \'win\' by proving their interpretation is correct.' }
          ],
            remediations: { 'a-literary-discussion-is-a': { steps: ['If a student dominates discussion without listening, pause the activity and model \'building language\': "I heard [peer].', 'That connects to line Y because..." Then assign a \'listener role\' where the student must paraphrase three peers\' points.', 'Practice this in small groups with a structured protocol (e.g., \'Save the Last Word for Me\') to internalize listening.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
