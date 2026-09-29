import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch06_p3: SimDef = {
    id: 'v3_c12_hin_a_ch06_p3',
    title: 'तुलसीदास · Part 3/3',
    subtitle: 'A Muslim poet heard one verse — and walked to Braj',
    classLevel: 12, subject: 'hin_a', topic: 'तुलसीदास · Part 3/3',
    chapters: ['c12_hin_a_ch06'],
    nodeIds: ['c12_hin_a_cbse_06_013', 'c12_hin_a_cbse_06_014', 'c12_hin_a_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bhakti-tradition scholar', intro: 'He was born into one faith and sang himself into another\'s heart — the Bhakti movement\'s boldest proof.', goal: 'Situate Raskhan in syncretic Bhakti and distinguish virah from vatsalya across the chapter\'s texts.' },
    discovery: {
        question: 'A 16th-century Muslim leaves court life for Vrindavan and writes Krishna-bhakti in Braj Bhasha. Why does Raskhan matter beyond his poems?',
        options: ['He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper', 'He converted religions', 'His poetry is prettier than Surdas\'s', 'Courts were boring'],
        answer: 'He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper',
        hook: 'One chapter holds two flavours of prem: Radha\'s virah — love through separation — and Yashoda\'s vatsalya — a mother\'s tenderness. Reading both as just \'love\' flattens Bhakti\'s emotional precision; each is a different road to the divine.',
    },
    teaching: [
        { title: 'तुलसीदास — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'हजारी-जइके\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Braj through an outsider who became its own: trace Raskhan\'s turn from worldly life to Krishna, then weigh longing against maternal love as two bhakti grammars.',
        labels: ['तुलसीदास — आशय-स्पष्टीकरण और', 'तुलसीदास — परीक्षा-उत्तर लेखन', 'तुलसीदास — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_013', title: 'तुलसीदास — आशय-स्पष्टीकरण और विश्लेषण अभ्यास',
          caseStudy: { intro: '\'हजारी-जइके\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'Define \'critical interpretation\' in the context of Hindi literature and distinguish it from \'literal comprehension\'.', options: [
                { text: 'Critical interpretation goes beyond retrieving facts (who, what, where) to analyzing how', outcome: 'Critical interpretation goes beyond retrieving facts (who, what, where) to analyzing how language.' },
                { text: 'A wrong answer that merely summarizes the poem (', outcome: 'Not quite — Students believe "critical analysis" means criticizing the text (finding faults) or offering.', reveals: 'critical-analysis-means-criticizing-the' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means criticizing the text (finding faults) or offering.', reveals: 'critical-analysis-means-criticizing-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A student society is profiling a beloved classical-music teacher who converted faiths midlife and then devoted himself to Krishna-bhakti poetry. A committee member wants his early Persian-Arabic training cut from the bio: \'it muddies the devotional image.\'',
            decisions: [{ prompt: 'How does the structure of the Raskhan sketch answer that edit?', options: [
                { text: 'Keep it exactly where the sketch keeps it — the biography deliberately establishes his Islamic scholarly background before the Gita Govinda turning point, so the devotion reads as a boundary crossed, not a brand polished; cutting the \'before\' guts the \'after\'.', outcome: 'The chapter shows those details are thematic scaffolding, not trivia: the juxtaposition is what proves divine love transcends religious identity — remove the contrast and Raskhan becomes a generic saint.' },
                { text: 'Cut it — the committee is right that a devotional profile should foreground only the devotional life.', outcome: 'That inverts the sketch\'s design: the earlier identity is what makes the transformation legible as transformation; without it, there\'s no crossing, only a career.', reveals: 'background-muddies-message' },
                { text: 'Keep the training but move it to a footnote so it doesn\'t interrupt the devotional arc.', outcome: 'Placement is the argument — the sketch sequences background before the turning point so readers feel the leap; demoting it to a footnote keeps the fact but kills the contrast that gives it meaning.', reveals: 'order-doesnt-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You can now read Bhakti as lived synthesis — and separate virah from vatsalya like the tradition itself does.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_013', difficulty: 'standard',
          question: '\'हजारी-जइके\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'If stuck, review "Imagery and Metaphor" (c12_hin_a_cbse_06_008) and "Grammar: Language.',
          misconception: 'Students believe "critical analysis" means criticizing the text (finding faults) or offering personal opinions.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of \'syncretism\' (fusion of Hindu-Muslim cultural elements) to analyze the opening stanza of "Hajar Jake ka Izse".', answer: 'Markers: (1) "jkepfjrekul"',
                  options: ['Markers: (1) "jkepfjrekul"', 'he writes about Krishna', 'critical analysis', 'criticism'],
                  hint: 'If stuck, review "Imagery and Metaphor" (c12_hin_a_cbse_06_008) and "Grammar: Language Usage".',
                  misconception: 'Students believe "critical analysis" means criticizing the text (finding faults) or offering personal opinions unsupported by the text.' }
          ],
            remediations: { 'critical-analysis-means-criticizing-the': { steps: ['Revisit node c12_hin_a_cbse_06_008 (Imagery and Metaphor) and 009 (Irony and Symbolism) to rebuild.', 'Practice the "Quote–Effect–Link" drill: pick one line, write its literal meaning, name the device, explain its.', 'Do this for five lines from the chapter.', 'Re-attempt Diagnostic Question 3 and 4; if still unable to produce textual evidence, review Class 11 node.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means criticizing the text (finding faults) or offering personal opinions.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Raskhan\'s use of simple, colloquial Brajbhasha (e.g., \'Bk<+s\', \'dksg\', \'fel\') makes his poetry accessible but limits its philosophical.', answer: 'Refute',
                  options: ['Refute', 'critical analysis', 'criticism', 'critique'],
                  hint: 'If stuck, review "Imagery and Metaphor" (c12_hin_a_cbse_06_008) and "Grammar: Language Usage".',
                  misconception: 'Students believe "critical analysis" means criticizing the text (finding faults) or offering personal opinions unsupported by the text.' }
          ],
            remediations: { 'critical-analysis-means-criticizing-the': { steps: ['Revisit node c12_hin_a_cbse_06_008 (Imagery and Metaphor) and 009 (Irony and Symbolism) to rebuild.', 'Practice the "Quote–Effect–Link" drill: pick one line, write its literal meaning, name the device, explain its.', 'Do this for five lines from the chapter.', 'Re-attempt Diagnostic Question 3 and 4; if still unable to produce textual evidence, review Class 11 node.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_014', difficulty: 'standard',
          question: '\'हजारी-जइके\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, revisit c12_hin_a_cbse_06_012 (Comprehension) to re-extract textual evidence.',
          misconception: 'छात्र अक्सर समझते हैं कि \'लेखन कौशल\' का अर्थ है पाठ का सारांश लिखना या पात्र का जीवन-परिचय देना। वे PEEL संरचना को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हजारी-जइके\' पर पाठ-आधारित लेखन',
                  options: ['\'हजारी-जइके\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हजारी-जइके\' का कथानक', '\'हजारी-जइके\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_06_012 (Comprehension) to re-extract textual evidence, and.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'लेखन कौशल\' का अर्थ है पाठ का सारांश लिखना या पात्र का जीवन-परिचय देना। वे PEEL संरचना को \'पहले परिचय, फिर मध्य.' }
          ],
            remediations: { 'peel': { steps: ['छात्र को c12_hin_a_cbse_06_012 (बोधगम्यता) और c12_hin_a_cbse_06_013 (आलोचनात्मक चिंतन) नोड्स पर वापस भेजें: उनसे कहें.', 'फिर PEEL शीट दें: चार कॉलम (Point, Evidence, Explanation, Link) — उन्हें एक प्रश्न पर पूरा करने को कहें। 3.', 'पुनः निदान: वही प्रश्न दें जो पहले गलत हुआ था, और जाँचें कि क्या अब उत्तर में चारों चरण स्पष्ट हैं। यदि नहीं, तो चरण 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_015', difficulty: 'standard',
          question: '\'हजारी-जइके\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'यदि अटकें तो c12_hin_a_cbse_06_013 (Critical Thinking) के \'दावा-प्रमाण\' अभ्यास और.',
          misconception: 'छात्र अक्सर समझते हैं कि \'Speaking and Listening\' में केवल पाठ का सारांश बोलना होता है। वे उद्धरण नहीं देते, अलंकार/छंद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हजारी-जइके\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'हजारी-जइके\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हजारी-जइके\' का कथानक', '\'हजारी-जइके\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटकें तो c12_hin_a_cbse_06_013 (Critical Thinking) के \'दावा-प्रमाण\' अभ्यास और.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'Speaking and Listening\' में केवल पाठ का सारांश बोलना होता है। वे उद्धरण नहीं देते, अलंकार/छंद का नाम नहीं लेते.' }
          ],
            remediations: { 'speaking-and-listening': { steps: ['चरण 1: छात्र को पाठ के किन्हीं दो पद/कवित्त पढ़कर *रिकॉर्ड* करने को कहें (मोबाइल पर)। चरण 2: रिकॉर्डिंग सुनकर स्वयं.', 'कहाँ अलंकार/छंद का नाम नहीं लिया?', 'चरण 3: उसी विषय पर 2 मिनट का *नया* रिकॉर्डिंग करें, इस बार PEEL संरचना (Point, Evidence, Explanation, Link) का पालन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
