import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch01_p3: SimDef = {
    id: 'v3_c11_eng_h_ch01_p3',
    title: 'The Portrait of a Lady · Part 3/3',
    subtitle: 'Read the grandmother as a vanishing world, not a quirky old woman.',
    classLevel: 11, subject: 'eng_h', topic: 'The Portrait of a Lady · Part 3/3',
    chapters: ['c11_eng_h_ch01'],
    nodeIds: ['c11_eng_h_cbse_01_013', 'c11_eng_h_cbse_01_014', 'c11_eng_h_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader tracing a relationship across two Indias', intro: 'Village temple school to English city classroom — watch a bond dissolve not in anger but in syllabi.', goal: 'Use context and narrative phases to interpret the grandmother\'s values and the story\'s ending.' },
    discovery: {
        question: 'The narrator\'s grandmother declares music \'the monopoly of harlots and beggars.\' Is this just one old woman\'s prejudice?',
        options: ['No — it encodes a broader class attitude of her era, when professional musicians came from communities respectable families shunned', 'Yes — a purely personal quirk with no cultural basis', 'No — she objected because music distracted from prayer, nothing more', 'Yes — she simply disliked the instrument the boy played'],
        answer: 'No — it encodes a broader class attitude of her era, when professional musicians came from communities respectable families shunned',
        hook: 'She isn\'t \'backward\' — she\'s a representative figure of a vanishing world, and her silences carry a whole generation\'s rules.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Portrait of a Lady\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_01_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the narrative into its three phases of companionship, separation and loss — then defend why the story ends with silent sparrows, not a funeral.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Portrait of a Lady\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point (topic sentence), Evidence (textual detail/quote), Explanation', outcome: 'PEEL stands for Point (topic sentence), Evidence (textual detail/quote), Explanation (analysis.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe "writing based on the chapter" means retelling the story in their own words.', reveals: 'writing-based-on-the-chapter' },
                { text: 'writing based on the chapter', outcome: 'Not quite — Students believe "writing based on the chapter" means retelling the story in their own words.', reveals: 'writing-based-on-the-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Portrait of a Lady\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of using textual evidence in a literature discussion?', options: [
                { text: 'The primary purpose is to ground interpretive claims in verifiable details from the text', outcome: 'The primary purpose is to ground interpretive claims in verifiable details from the text so that.' },
                { text: 'to prove you read the chapter', outcome: 'Not quite — Students believe a "good discussion" means speaking frequently, sharing personal feelings,.', reveals: 'a-good-discussion-means-speaking' },
                { text: 'to impress the teacher', outcome: 'Not quite — Students believe a "good discussion" means speaking frequently, sharing personal feelings,.', reveals: 'a-good-discussion-means-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school\'s heritage club is collecting elders\' memories. After reading \'The Portrait of a Lady\', a member drafts an exhibit label: \'The grandmother was simply a backward old woman who hated music and English schools — a personal quirk, nothing more.\'',
            decisions: [{ prompt: 'What\'s missing from that label?', options: [
                { text: 'Context: born around the 1880s into a pre-independence Punjabi joint-family world, her views (music associated with \'harlots and beggars\', temple school versus English motor-bus school) are the values of a specific generation — not quirks. She represents a vanishing way of life where religion, routine and community were one fabric; her silence is a tragic defence of identity, not mere backwardness.', outcome: 'Reading her through her era\'s values turns \'old-fashioned\' into a portrait of a disappearing world — exactly what context work is for.' },
                { text: 'The label is accurate — context is just summary and difficult words; judge the character on her choices alone.', outcome: 'Context isn\'t trivia: each detail (temple school, spinning wheel, sparrows) is a cultural marker; stripping them makes her a caricature instead of a representative figure.', reveals: 'context-is-just-trivia' },
                { text: 'Fix it by judging her harshly — modern readers should condemn her refusal of music outright.', outcome: 'Presentism isn\'t analysis; the text invites you to understand why those beliefs existed, which makes her estrangement moving rather than merely wrong.', reveals: 'judge-by-todays-values' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'The sparrows refusing their crumbs say what the family couldn\'t — her world mourned her in its own tongue.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Portrait of a Lady\' — analysing the text to reach.',
          hint: 'If stuck, reconstruct the three-phase timeline from node 002 and the theme evidence from.',
          misconception: 'Students equate "critical analysis" with theme-listing (identifying "old age," "tradition," "death") and treat the.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "silence as strategic communication" to analyze three specific moments where the grandmother\'s silence performs distinct rhetorical.', answer: 'Three moments with distinct functions: (1) Post music-lesson announcement',
                  options: ['Three moments with distinct functions: (1) Post music-lesson announcement', 'quietness'],
                  hint: 'If stuck, reconstruct the three-phase timeline from node 002 and the theme evidence from node 006.',
                  misconception: 'Students equate "critical analysis" with theme-listing (identifying "old age," "tradition," "death") and treat the grandmother as a static.' }
          ],
            remediations: { 'students-equate-critical-analysis-with': { steps: ['Have student create a two-column table: Column A = every explicit action the grandmother takes (not author\'s.', 'Color-code actions by phase (village/city/university).', 'Ask: "Which actions are responses to marginalization?', 'Which create new centers of meaning?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "critical analysis" with theme-listing (identifying "old age," "tradition," "death") and treat the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The grandmother\'s final celebration (singing, drumming) represents a regression to childishness." Defend or refute using three textual.', answer: 'Refute',
                  options: ['Refute', 'childishness'],
                  hint: 'If stuck, reconstruct the three-phase timeline from node 002 and the theme evidence from node 006.',
                  misconception: 'Students equate "critical analysis" with theme-listing (identifying "old age," "tradition," "death") and treat the grandmother as a static.' },
                { id: 'b', prompt: 'Compose a 120-word interior monologue for the grandmother on the evening she sings with the drum, using only sensory impressions and fragmented prayer-thoughts.', answer: 'Strong response: "Drum skin slack under palms',
                  options: ['Strong response: "Drum skin slack under palms', 'Weak response uses coherent sentences (', ') or references author directly ('],
                  hint: 'If stuck, reconstruct the three-phase timeline from node 002 and the theme evidence from node 006.',
                  misconception: 'Students equate "critical analysis" with theme-listing (identifying "old age," "tradition," "death") and treat the grandmother as a static.' }
          ],
            remediations: { 'students-equate-critical-analysis-with': { steps: ['Have student create a two-column table: Column A = every explicit action the grandmother takes (not author\'s.', 'Color-code actions by phase (village/city/university).', 'Ask: "Which actions are responses to marginalization?', 'Which create new centers of meaning?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_014', difficulty: 'standard',
          question: 'Writing skills from \'The Portrait of a Lady\' — using the text as a model.',
          hint: 'If stuck, return to c11_eng_h_cbse_01_004 (Character Analysis: Protagonist) and re-do the.',
          misconception: 'Students believe "writing based on the chapter" means retelling the story in their own words.',
          parts: [
                { id: 'a', prompt: 'Why is it insufficient to write "The grandmother was very religious" without adding "She sat by her wheel spinning and reciting prayers from sunrise to sunset"?', answer: 'The first statement is a claim',
                  options: ['The first statement is a claim', 'writing based on the chapter', '"writing based on the chapter" means retelling the story in their own words'],
                  hint: 'If stuck, return to c11_eng_h_cbse_01_004 (Character Analysis: Protagonist) and re-do the.',
                  misconception: 'Students believe "writing based on the chapter" means retelling the story in their own words.' },
                { id: 'b', prompt: 'Prompt: "Describe the grandmother\'s daily routine in the village." Write a 4-sentence PEEL paragraph using two specific details from the text.', answer: 'Point: The grandmother\'s village routine reflects her devotion and care',
                  options: ['Point: The grandmother\'s village routine reflects her devotion and care', 'writing based on the chapter', '"writing based on the chapter" means retelling the story in their own words'],
                  hint: 'If stuck, return to c11_eng_h_cbse_01_004 (Character Analysis: Protagonist) and re-do the.',
                  misconception: 'Students believe "writing based on the chapter" means retelling the story in their own words.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['Have the student highlight every detail about the grandmother in the text using three colors: physical description.', 'Give a prompt like "Grandmother\'s spirituality" and ask them to pick only the highlighted details that fit.', 'Practice writing one PEEL paragraph together using just those details.', 'Gradually release to independent writing with a new prompt ("Grandmother\'s relationship with nature"), insisting on the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_015', difficulty: 'standard',
          question: 'Discussion points on \'The Portrait of a Lady\' — speaking and listening around.',
          hint: 'If stuck, review c11_eng_h_cbse_01_004 (grandmother\'s character traits) and.',
          misconception: 'Students believe a "good discussion" means speaking frequently, sharing personal feelings, or agreeing with peers to.',
          parts: [
                { id: 'a', prompt: 'A student says in discussion: "The grandmother didn\'t like the city school because she was old-fashioned." Why is this an incomplete discussion contribution.', answer: 'The claim "old-fashioned" is an unsubstantiated label that shuts down analysis',
                  options: ['The claim "old-fashioned" is an unsubstantiated label that shuts down analysis', 'A wrong answer that merely adds another opinion (', 'good discussion'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_004 (grandmother\'s character traits) and c11_eng_h_cbse_01_006.',
                  misconception: 'Students believe a "good discussion" means speaking frequently, sharing personal feelings, or agreeing with peers to be polite.' },
                { id: 'b', prompt: 'Compare two discussion approaches for the question "Is the grandmother a strong character?" Approach A: "Yes, she\'s strong because she survives alone.".', answer: 'Approach B meets the standard',
                  options: ['Approach B meets the standard', 'good discussion'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_004 (grandmother\'s character traits) and c11_eng_h_cbse_01_006.',
                  misconception: 'Students believe a "good discussion" means speaking frequently, sharing personal feelings, or agreeing with peers to be polite.' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['**Diagnose the gap:** Ask the student to write one discussion point as a complete sentence starting with "The text.', '**Model the conversion:** Take their personal response ("I felt sad") and co-construct the analytical version: "The.', '**Drill the move:** Give three textual details (rosary, spinning wheel, sparrows) and have the student generate one.', '**Scaffold the response:** Provide sentence stems: "The evidence for this is..." / "This connects to the theme of...".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
