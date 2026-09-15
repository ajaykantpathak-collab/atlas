import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch03_p3: SimDef = {
    id: 'v3_c12_hin_v_ch03_p3',
    title: 'vHkh Hkh eqvutks&nM+ks1 vkSj gM+Iik2 izkphu · Part 3/3',
    subtitle: 'Fifteen years of glory, five centuries of silence',
    classLevel: 12, subject: 'hin_v', topic: 'vHkh Hkh eqvutks&nM+ks1 vkSj gM+Iik2 izkphu · Part 3/3',
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
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the systematic process of examining a text\'s explicit and implicit meanings, evaluating the author\'s perspective and techniques, and synthesizing evidence.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_03_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk the ghost capital like an archaeologist: cluster the proper nouns into rulers, monuments and events, weigh the planned-city claim against the labour it cost, and measure ruins against the boast.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are standing in the narrow lanes of an ancient Indian city where a 2,500-year-old temple wall touches a modern tea stall — you physically feel the.',
            decisions: [{ prompt: 'What is the primary difference between literal comprehension and critical analysis of this chapter?', options: [
                { text: 'Literal comprehension retrieves facts stated in the text (e.g., "The wall is 33 feet', outcome: 'Literal comprehension retrieves facts stated in the text (e.g., "The wall is 33 feet thick"), while.' },
                { text: 'giving your opinion about the text', outcome: 'Not quite — Students often believe critical analysis means "giving your opinion about the text." In this.', reveals: 'critical-analysis-means-giving-your' },
                { text: 'I think the author loves Ujjain', outcome: 'Not quite — Students often believe critical analysis means "giving your opinion about the text." In this.', reveals: 'critical-analysis-means-giving-your' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are asked in the board exam: "How does the author contrast the urban planning of Mohenjo-Daro with modern cities?" You might start by vaguely.',
            decisions: [{ prompt: 'What is the primary purpose of using the PEEL structure when writing answers for this chapter?', options: [
                { text: 'The primary purpose of PEEL (Point, Evidence, Explanation, Link) is to ensure each', outcome: 'The primary purpose of PEEL (Point, Evidence, Explanation, Link) is to ensure each paragraph.' },
                { text: 'to make the answer long', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means summarizing the chapter in their.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means summarizing the chapter in their.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are a tour guide at the *Mahakal* temple in Ujjain explaining the city\'s layered history to a group of Class 12 students.',
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
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the systematic process of examining.',
          hint: 'If stuck, return to node c12_hin_v_cbse_03_012 (Comprehension) and re-read the chapter.',
          misconception: 'Students often believe critical analysis means "giving your opinion about the text." In this chapter, they might write.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "unreliable narrator" to the author\'s claim that "there was no king, no ruler" in ancient Ujjain\'s governance.', answer: 'To test the claim, examine: (1) the author\'s sources',
                  options: ['To test the claim, examine: (1) the author\'s sources', 'giving your opinion about the text', 'I think the author loves Ujjain', 'filth and squalor'],
                  hint: 'If stuck, return to node c12_hin_v_cbse_03_012 (Comprehension) and re-read the chapter with a focus.',
                  misconception: 'Students often believe critical analysis means "giving your opinion about the text." In this chapter, they might write: "I think the author.' }
          ],
            remediations: { 'critical-analysis-means-giving-your': { steps: ['If a student conflates opinion with analysis: (1) Have them reread the last three paragraphs of the chapter and.', '(2) Ask: "Which of these are the author\'s explicit judgments, and which are your inferences?" (3) Assign a micro-task.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
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
            remediations: { 'critical-analysis-means-giving-your': { steps: ['If a student conflates opinion with analysis: (1) Have them reread the last three paragraphs of the chapter and.', '(2) Ask: "Which of these are the author\'s explicit judgments, and which are your inferences?" (3) Assign a micro-task.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "vHkh Hkh eqvutks&nM+ks vkSj gM+Iik izkphu".',
          hint: 'If stuck, revisit c12_hin_v_cbse_03_012 (Comprehension) for evidence-location drills and.',
          misconception: 'Students believe that "writing skills based on the chapter" means summarizing the chapter in their own words.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the author\'s description of the "drainage system" (page 38-39) serves as evidence for the theme of "civilizational continuity".', answer: 'The drainage description shows a sophisticated, standardized system that implies',
                  options: ['The drainage description shows a sophisticated, standardized system that implies', 'they had covered drains', 'writing skills based on the chapter', 'The author went to Mohenjo-Daro and saw wells, drains, and streets'],
                  hint: 'If stuck, revisit c12_hin_v_cbse_03_012 (Comprehension) for evidence-location drills and.',
                  misconception: 'Students believe that "writing skills based on the chapter" means summarizing the chapter in their own words.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Have the student take a 3-mark board question (e.g., "eqvutks&nM+ks dh lH;rk dks \'lekt&iksf"kr\' D;ksa dgk x;k gS?") and.', 'Use a highlighter: mark Point (yellow), Evidence (green), Explanation (blue), Link (pink) in the good version; show the.', 'Practice converting three summary sentences into one PEEL paragraph daily for a week using chapter-specific prompts.', 'Re-diagnose with DIAGNOSTIC_QUESTION_3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points are structured conversational prompts.',
          hint: 'If stuck generating discussion points, return to **c12_hin_v_cbse_03_006** (Primary.',
          misconception: 'Students believe a good discussion contribution is a *mini-essay*: a pre-prepared, uninterrupted 2-minute speech.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of \'Discussion Points\' in the Speaking and Listening assessment for this chapter?', answer: 'The primary purpose is to assess the student\'s ability to articulate textual',
                  options: ['The primary purpose is to assess the student\'s ability to articulate textual', 'to check if the student read the chapter'],
                  hint: 'If stuck generating discussion points, return to **c12_hin_v_cbse_03_006** (Primary Theme) and.',
                  misconception: 'Students believe a good discussion contribution is a *mini-essay*: a pre-prepared, uninterrupted 2-minute speech covering all themes.' }
          ],
            remediations: { 'a-good-discussion-contribution-is': { steps: ['If a student dominates with monologues or freezes when interrupted: (1) Practice **\'Think-Pair-Share\'** with a timer.', '(2) Use a **\'Discussion Sentence Stems\'** card: "I agree with X because...", "The text supports this on page.', 'Target: ≥2 textual refs, ≥3 peer responses, 50/50 speak-listen ratio.', 'Revisit sibling node **c12_hin_v_cbse_03_013** (Critical Thinking) to sharpen analytical anchors.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
