import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch08_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch08_p3',
    title: 'पाठ 8 · Part 3/3',
    subtitle: 'Read a prisoner\'s India — episodic, argumentative, and allergic to uniformity.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 8 · Part 3/3',
    chapters: ['c11_hin_ar_ch08'],
    nodeIds: ['c11_hin_ar_cbse_08_013', 'c11_hin_ar_cbse_08_014', 'c11_hin_ar_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a prisoner composing a nation from memory', intro: 'From a cell, Nehru walks the whole country — and every conversation with a peasant becomes a meditation on what \'India\' even is.', goal: 'Analyse the episodic-reflective structure and the theme of unity built from diversity.' },
    discovery: {
        question: 'Nehru\'s chapter jumps from the Himalaya to a peasant\'s face to a Vedic hymn to a Kanpur factory — is the disorder a structural weakness?',
        options: ['No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity', 'Yes — history must run in dates', 'Yes — prison made him ramble', 'No — but only because it\'s a travelogue'],
        answer: 'No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity',
        hook: 'Written in a 1942-46 prison cell, \'Bharat Mata\' argues that India\'s unity lives in shared labour and suffering — not in cultural sameness.',
    },
    teaching: [
        { title: 'पाठ 8 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'फागुन की कहानी\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate the journey\'s episodes from its reflective digressions, then defend whether diversity can ground unity without uniformity.',
        labels: ['पाठ 8 — आलोचनात्मक', 'पाठ 8 — लेखन', 'पाठ 8 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_014', title: 'पाठ 8 — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'फागुन की कहानी\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature questions?', options: [
                { text: 'PEEL stands for Point (topic sentence stating the argument), Evidence (specific textual', outcome: 'PEEL stands for Point (topic sentence stating the argument), Evidence (specific textual.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe that "writing skills" for literature means memorizing model answers or writing.', reveals: 'writing-skills-for-literature-means' },
                { text: 'writing skills', outcome: 'Not quite — Students believe that "writing skills" for literature means memorizing model answers or writing.', reveals: 'writing-skills-for-literature-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_015', title: 'पाठ 8 — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'फागुन की कहानी\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion in Class 11 Hindi as per CBSE guidelines?', options: [
                { text: 'The primary purpose is to demonstrate analytical engagement with the text by exchanging', outcome: 'The primary purpose is to demonstrate analytical engagement with the text by exchanging.' },
                { text: 'to retell the story', outcome: 'Not quite — Students believe "discussion" means taking turns giving speeches summarizing the chapter.', reveals: 'discussion-means-taking-turns-giving' },
                { text: 'discussion', outcome: 'Not quite — Students believe "discussion" means taking turns giving speeches summarizing the chapter.', reveals: 'discussion-means-taking-turns-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For Independence Day, a student proposes a poster quoting Nehru\'s \'Bharat Mata\' essay beside a calendar image of the goddess Bharat Mata with a flag. Another teammate says the essay \'has no structure — it just rambles from mountains to peasants to philosophy.\'',
            decisions: [{ prompt: 'What do both get wrong about the text?', options: [
                { text: 'Separate symbol from argument: Nehru, writing in Ahmednagar Fort prison in Discovery of India, deliberately redefines Bharat Mata — not a goddess of land but \'the millions of individuals\', the people themselves. And the structure is the argument: an episodic travelogue where physical journey is the spine, encounters are self-contained units, and reflective digressions build the idea — fragments joined like the diverse-yet-united nation.', outcome: 'The poster gets redesigned — people, not iconography — and the \'rambling\' resolves into a deliberate episodic architecture mirroring India\'s unity-in-diversity.' },
                { text: 'Keep the goddess image — Bharat Mata is Bharat Mata, and the picture makes the poster devotional.', outcome: 'That projects external iconography onto the text: Nehru explicitly rejects goddess imagery for a secular, humanist definition — the people constitute the nation.', reveals: 'bharat-mata-is-goddess' },
                { text: 'Agree it has no structure — it\'s a prison diary, so wandering is natural.', outcome: 'Non-fiction has structure too: the journey spine, episodes, digressions and synthesis form an intellectual arc — the \'plot\' is the idea developing.', reveals: 'essay-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'The journey ends but the argument doesn\'t — the \'Bharat Mata\' Nehru finds is the people themselves, not a goddess on a map.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_013', difficulty: 'standard',
          question: '\'फागुन की कहानी\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_08_002 (कथानक संरचना)** और.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आलोचनात्मक विश्लेषण में **"छिपा हुआ अर्थ" (hidden meaning) ढूँढना** होता है जो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फागुन की कहानी\' का आलोचनात्मक चिंतन',
                  options: ['\'फागुन की कहानी\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फागुन की कहानी\' का कथानक', '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_08_002 (कथानक संरचना)** और **c11_hin_ar_cbse_08_008/009.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आलोचनात्मक विश्लेषण में **"छिपा हुआ अर्थ" (hidden meaning) ढूँढना** होता है जो लेखक ने जानबूझकर गुप्त.' }
          ],
            remediations: { 'hidden-meaning-riddle-answer-key': { steps: ['**चरण 1 — \'छिपा अर्थ\' मिथक तोड़ें:** छात्र से कहें: *"मान लो लेखक यहाँ बैठा है और तुमसे पूछता है: \'तुमने क्या समझा?\'.', 'क्यों?" **चरण 4 — मेटाकॉग्निटिव प्रतिबिंब:** अंत में पूछें: *"विश्लेषण करते समय तुम्हारे मन में पहला विचार क्या आया?', 'क्या तुमने कोई अन्य संभावना खारिज की?', 'क्यों?"* — यह चिंतन-प्रक्रिया (thinking process) को दृश्यमान बनाता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_014', difficulty: 'standard',
          question: '\'फागुन की कहानी\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, return to c11_hin_ar_cbse_08_006 (Primary Theme) and c11_hin_ar_cbse_08_008.',
          misconception: 'Students believe that "writing skills" for literature means memorizing model answers or writing long summaries.',
          parts: [
                { id: 'a', prompt: 'Compare two approaches to answering "Discuss the role of irony in Nehru\'s portrayal of \'Bharat Mata\'." Approach A: Lists three ironic statements from the text.', answer: 'Approach B demonstrates analysis (Bloom\'s Level 4)',
                  options: ['Approach B demonstrates analysis (Bloom\'s Level 4)', 'writing skills'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_08_006 (Primary Theme) and c11_hin_ar_cbse_08_008.',
                  misconception: 'Students believe that "writing skills" for literature means memorizing model answers or writing long summaries.' }
          ],
            remediations: { 'writing-skills-for-literature-means': { steps: ['**Diagnose:** Give the student a 3-mark question and ask them to highlight their Point, Evidence, Explanation, Link.', 'If they can\'t, they lack structural awareness.', '**Model:** Show a side-by-side comparison: a 40-word summary (1/3) vs.', 'a 60-word PEEL answer (3/3) for the same question.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "writing skills" for literature means memorizing model answers or writing long summaries.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "For a 6-mark question on Chapter 8, writing a 300-word detailed summary of Nehru\'s travels guarantees full marks because it shows.', answer: 'The claim is false',
                  options: ['The claim is false', 'content knowledge', 'answer writing skill', 'writing skills'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_08_006 (Primary Theme) and c11_hin_ar_cbse_08_008.',
                  misconception: 'Students believe that "writing skills" for literature means memorizing model answers or writing long summaries.' }
          ],
            remediations: { 'writing-skills-for-literature-means': { steps: ['**Diagnose:** Give the student a 3-mark question and ask them to highlight their Point, Evidence, Explanation, Link.', 'If they can\'t, they lack structural awareness.', '**Model:** Show a side-by-side comparison: a 40-word summary (1/3) vs.', 'a 60-word PEEL answer (3/3) for the same question.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_015', difficulty: 'standard',
          question: '\'फागुन की कहानी\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_08_013).',
          misconception: 'Students believe "discussion" means taking turns giving speeches summarizing the chapter.',
          parts: [
                { id: 'a', prompt: 'In "Hkkjr ekrk", Nehru writes that when he asked people "Who is Bharat Mata?", a peasant replied "The earth/land (dharti)".', answer: 'The peasant\'s answer is only one perspective Nehru presents',
                  options: ['The peasant\'s answer is only one perspective Nehru presents', 'discussion', '"discussion" means taking turns giving speeches summarizing the chapter'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_08_013) — specifically the.',
                  misconception: 'Students believe "discussion" means taking turns giving speeches summarizing the chapter.' },
                { id: 'b', prompt: 'During a discussion on "unity in diversity" in this chapter, a peer claims: "Nehru only describes diversity (different religions, regions) but never explains.', answer: '"Actually, in the passage where Nehru describes traveling from the Himalayas to',
                  options: ['"Actually, in the passage where Nehru describes traveling from the Himalayas to', 'discussion', '"discussion" means taking turns giving speeches summarizing the chapter'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_08_013) — specifically the.',
                  misconception: 'Students believe "discussion" means taking turns giving speeches summarizing the chapter.' },
                { id: 'c', prompt: 'Compare the discussion potential of these two questions about the chapter: (A) "Did you like Nehru\'s description of India?" (B) "How does Nehru use the.', answer: 'Question (B) enables deeper analysis',
                  options: ['Question (B) enables deeper analysis', 'discussion', '"discussion" means taking turns giving speeches summarizing the chapter'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_08_013) — specifically the.',
                  misconception: 'Students believe "discussion" means taking turns giving speeches summarizing the chapter.' }
          ],
            remediations: { 'discussion-means-taking-turns-giving': { steps: ['Stop the student mid-monologue and say: "That\'s a good summary.', 'Now, *respond* to what Rohan just said about the peasant\'s answer — do you agree or disagree, and *which line* supports.', 'Give a "Discussion Frame" card: "सहमत हूँ क्योंकि पाठ में...', '/ असहमत हूँ क्योंकि नेहरू लिखते हैं...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
