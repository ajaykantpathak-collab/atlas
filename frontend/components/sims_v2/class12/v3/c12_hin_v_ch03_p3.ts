import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch03_p3: SimDef = {
    id: 'v3_c12_hin_v_ch03_p3',
    title: 'अतीत में दबे पाँव · Part 3/3',
    subtitle: 'Fifteen years of glory, five centuries of silence',
    classLevel: 12, subject: 'hin_v', topic: 'अतीत में दबे पाँव · Part 3/3',
    chapters: ['c12_hin_v_ch03'],
    nodeIds: ['c12_hin_v_cbse_03_013', 'c12_hin_v_cbse_03_014', 'c12_hin_v_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Historical travelogue reader', intro: 'A writer stands among red-sandstone ruins and rebuilds Akbar\'s abandoned capital in prose.', goal: 'Read the chapter as reconstruction — architectural evidence, urban planning and the paradox of a city built to last that didn\'t.' },
    discovery: {
        question: 'Fatehpur Sikri was built for eternity — then abandoned within fifteen years, its silence loud under the Buland Darwaza. What makes the ruin worth reconstructing?',
        options: ['The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone', 'Tourist value', 'Mughal nostalgia', 'Pretty sandstone'],
        answer: 'The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone',
        hook: 'Don\'t mistake it for a romantic travelogue — the writer records workers\' quarters, graded housing and cheap labour inside the glory. \'Prachin\' signals reconstruction: read the architecture as evidence for a lost urban order, caste-free craft zoning and planned water — not just ornament.',
    },
    teaching: [
        { title: 'अतीत में दबे पाँव — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the ghost capital like an archaeologist: cluster the proper nouns into rulers, monuments and events, weigh the planned-city claim against the labour it cost, and measure ruins against the boast.',
        labels: ['अतीत में दबे पाँव'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_013', title: 'अतीत में दबे पाँव — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या',
          caseStudy: { intro: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'What is the primary difference between literal comprehension and critical analysis of this chapter?', options: [
                { text: 'Literal comprehension retrieves facts stated in the text (e.g., "The wall is 33 feet', outcome: 'Literal comprehension retrieves facts stated in the text (e.g., "The wall is 33 feet thick"), while.' },
                { text: 'giving your opinion about the text', outcome: 'Not quite — Students often believe critical analysis means "giving your opinion about the text." In this.', reveals: 'critical-analysis-means-giving-your' },
                { text: 'I think the author loves Ujjain', outcome: 'Not quite — Students often believe critical analysis means "giving your opinion about the text." In this.', reveals: 'critical-analysis-means-giving-your' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_015', title: 'अतीत में दबे पाँव — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of \'Discussion Points\' in the Speaking and Listening assessment for this chapter?', options: [
                { text: 'The primary purpose is to assess the student\'s ability to articulate textual', outcome: 'The primary purpose is to assess the student\'s ability to articulate textual understanding orally.' },
                { text: 'to check if the student read the chapter', outcome: 'Not quite — Students believe a good discussion contribution is a *mini-essay*: a pre-prepared, uninterrupted.', reveals: 'a-good-discussion-contribution-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a smart-city meeting in your town, a planner pitches clearing an old quarter for a parking complex: \'It\'s just decayed walls — real progress is glass and concrete, not ruins.\'',
            decisions: [{ prompt: 'How does the Rajgir chapter answer that pitch?', options: [
                { text: 'Ancient Rajgir\'s ruins document a city with planned streets, drains and housing without caste barriers — a \'society-governed\' civilisation; the author contrasts its civic wisdom with today\'s chaotic neglect precisely to show modernity excavated the history but didn\'t learn it.', outcome: 'The chapter\'s argument: the ruins aren\'t the opposite of progress but a rebuke to it — the \'decayed walls\' hold urban planning and social ethics the glass-and-concrete pitch hasn\'t matched.' },
                { text: 'Side with the planner — sentimentality about ruins can\'t run a modern city.', outcome: 'The chapter isn\'t nostalgia — it\'s a comparison of civic competence: the ancient city governed itself socially where the modern one only manages to excavate; dismissing the walls discards the evidence, not the sentiment.', reveals: 'ruins-equal-stagnation' },
                { text: 'Propose freezing the whole quarter as a museum — heritage must be untouched.', outcome: 'The author\'s point is that Rajgir was lived-in and socially governed, not embalmed; turning it into a sealed exhibit repeats the mistake of treating civic life as a monument instead of a model to inhabit.', reveals: 'heritage-means-freeze' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a travelogue as urban history — where a dead city\'s plan still argues what a city could be.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_013', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का आलोचनात्मक चिंतन — विश्लेषण करके.',
          hint: 'If stuck, return to node c12_hin_v_cbse_03_012 (Comprehension) and re-read the chapter.',
          misconception: 'Students often believe critical analysis means "giving your opinion about the text." In this chapter, they might write.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "unreliable narrator" to the author\'s claim that "there was no king, no ruler" in ancient Ujjain\'s governance.', answer: 'To test the claim, examine: (1) the author\'s sources',
                  options: ['To test the claim, examine: (1) the author\'s sources', 'giving your opinion about the text', 'I think the author loves Ujjain', 'filth and squalor'],
                  hint: 'If stuck, return to node c12_hin_v_cbse_03_012 (Comprehension) and re-read the chapter with a focus.',
                  misconception: 'Students often believe critical analysis means "giving your opinion about the text." In this chapter, they might write: "I think the author.' }
          ],
            remediations: { 'critical-analysis-means-giving-your': { steps: ['If a student conflates opinion with analysis: (1) Have them reread the last three paragraphs of the chapter and.', '(2) Ask: "Which of these are the author\'s explicit judgments, and which are your inferences?" (3) Assign a micro-task.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe critical analysis means "giving your opinion about the text." In this chapter, they might write.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s assertion that ancient Ujjain\'s governance was "socially controlled" rather than politically controlled.', answer: 'It is a defensible but partial interpretation',
                  options: ['It is a defensible but partial interpretation', 'giving your opinion about the text', 'I think the author loves Ujjain', 'filth and squalor'],
                  hint: 'If stuck, return to node c12_hin_v_cbse_03_012 (Comprehension) and re-read the chapter with a focus.',
                  misconception: 'Students often believe critical analysis means "giving your opinion about the text." In this chapter, they might write: "I think the author.' }
          ],
            remediations: { 'critical-analysis-means-giving-your': { steps: ['If a student conflates opinion with analysis: (1) Have them reread the last three paragraphs of the chapter and.', '(2) Ask: "Which of these are the author\'s explicit judgments, and which are your inferences?" (3) Assign a micro-task.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_014', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर.',
          hint: 'If stuck on finding evidence, review **c12_hin_v_cbse_03_002** (कथानक और आख्यान-संरचना).',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर का अर्थ है पाठ से लंबे-लंबे उद्धरण (quotes) कॉपी करना।" **वास्तविकता:** CBSE.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' पर पाठ-आधारित लेखन',
                  options: ['\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on finding evidence, review **c12_hin_v_cbse_03_002** (कथानक और आख्यान-संरचना) for.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर का अर्थ है पाठ से लंबे-लंबे उद्धरण (quotes) कॉपी करना।" **वास्तविकता:** CBSE हिंदी कोर में 60-80.' }
          ],
            remediations: { 'quotes-cbse-60-80-2': { steps: ['**निदान:** छात्र से 50 शब्दों में एक उत्तर लिखवाएं। यदि उसमें >15 शब्द सीधे पाठ से उठे हैं → \'उद्धरण-निर्भरता\' (Quote.', '**अभ्यास:** उसी उत्तर को \'एम्बेडिंग\' (embedding) तकनीक से पुनर्लिखवाएं: पाठ के शब्दों को अपने वाक्य के अंदर फिट करें.', '**पुनः निदान:** अगले दिन एक नए विषय पर उत्तर लिखवाएं और **लाल पेन से** हर उद्धृत शब्द गिनें। लक्ष्य: **प्रति उत्तर.', '**संदर्भ:** यदि कठिनाई बने, तो **c11_hin_v_cbse_03_014** (कक्षा 11 का समान लेखन कौशल नोड) पर वापस जाएं और वहाँ दिए गए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_015', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने.',
          hint: 'If stuck generating discussion points, return to **c12_hin_v_cbse_03_006** (Primary.',
          misconception: 'Students believe a good discussion contribution is a *mini-essay*: a pre-prepared, uninterrupted 2-minute speech.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of \'Discussion Points\' in the Speaking and Listening assessment for this chapter?', answer: 'The primary purpose is to assess the student\'s ability to articulate textual',
                  options: ['The primary purpose is to assess the student\'s ability to articulate textual', 'to check if the student read the chapter'],
                  hint: 'If stuck generating discussion points, return to **c12_hin_v_cbse_03_006** (Primary Theme) and.',
                  misconception: 'Students believe a good discussion contribution is a *mini-essay*: a pre-prepared, uninterrupted 2-minute speech covering all themes.' }
          ],
            remediations: { 'a-good-discussion-contribution-is': { steps: ['If a student dominates with monologues or freezes when interrupted: (1) Practice **\'Think-Pair-Share\'** with a timer.', '(2) Use a **\'Discussion Sentence Stems\'** card: "I agree with X because...", "The text supports this on page.', 'Target: ≥2 textual refs, ≥3 peer responses, 50/50 speak-listen ratio.', 'Revisit sibling node **c12_hin_v_cbse_03_013** (Critical Thinking) to sharpen analytical anchors.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
