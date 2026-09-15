import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch04_p3: SimDef = {
    id: 'v3_c11_hin_v_ch04_p3',
    title: 'Hkkjrh; xkf;dkvksa esa cstksM+yrk · Part 3/3',
    subtitle: 'Test the claim that the most local art travels the farthest.',
    classLevel: 11, subject: 'hin_v', topic: 'Hkkjrh; xkf;dkvksa esa cstksM+yrk · Part 3/3',
    chapters: ['c11_hin_v_ch04'],
    nodeIds: ['c11_hin_v_cbse_04_013', 'c11_hin_v_cbse_04_014', 'c11_hin_v_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader mapping Indian art\'s hidden continuum', intro: 'Mandana on a mud wall in a village, Kathak in a Jaipur auditorium — the essay asks what these share, not what divides them.', goal: 'Analyse the folk-classical continuum and the essay\'s classification-driven structure.' },
    discovery: {
        question: '\'The more local an art is in its expression, the more universal it becomes\' — can that paradox actually hold?',
        options: ['Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes', 'No — local art stays local by definition', 'Yes — but only after foreigners validate it', 'No — universality requires abandoning the local'],
        answer: 'Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes',
        hook: 'Folk and classical aren\'t two boxes — Kathak grew out of kathavachaks and temple dances sank back into villages; the continuum never stops trading.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the cognitive process of examining the text\'s arguments, evidence, and perspectives to form reasoned judgments about the relationship between Indian.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace how the essay runs every art form through the same folk→classical→living-continuity arc, and judge what that repeated pattern proves.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re sitting in the exam hall and the question asks: "Compare the origins and development of folk painting and classical painting in India using.',
            decisions: [{ prompt: 'Define the PEEL structure for answer writing and state its four components in the correct order.', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. Point = the main claim or topic sentence.' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" for literature chapters means *summarizing* the text in their own.', reveals: 'writing-skills-for-literature-chapters' },
                { text: 'components out of order or confusing Evidence with Explanation', outcome: 'Not quite — Students believe "writing skills" for literature chapters means *summarizing* the text in their own.', reveals: 'writing-skills-for-literature-chapters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine your teacher asks: "Why does the textbook say Indian art cannot be separated from rituals and seasons?',
            decisions: [{ prompt: 'What is the primary purpose of a text-based discussion in a literature classroom?', options: [
                { text: 'The primary purpose is to collaboratively construct meaning by sharing interpretations', outcome: 'The primary purpose is to collaboratively construct meaning by sharing interpretations grounded.' },
                { text: 'to share what you feel about the story', outcome: 'Not quite — Students believe a "good discussion" means speaking frequently and loudly, often repeating personal.', reveals: 'a-good-discussion-means-speaking' },
                { text: 'good discussion', outcome: 'Not quite — Students believe a "good discussion" means speaking frequently and loudly, often repeating personal.', reveals: 'a-good-discussion-means-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school exhibition on \'Indian Arts\', a student sorts every item into two rigid boxes — \'folk/tribal\' (Mandana, Warli, Madhubani) and \'classical\' (Kathak, Mughal miniatures) — insisting the categories never mix, \'like traditional vs modern.\'',
            decisions: [{ prompt: 'What does the chapter say about that border?', options: [
                { text: 'Show the continuum: the chapter argues folk and classical are endpoints in constant संवाद — folk forms get codified into classical (Kathak rising from the kathavachak tradition), classical forms dissolve back into folk (temple dance becoming village ritual), and both root in the Natya Shastra. Crucially, Indian arts were never museum objects — they lived inside births, harvests and worship.', outcome: 'The exhibition gets a third section — \'the dialogue\': Kathak\'s folk origins, Madhubani\'s codification — proving the categories are porous by design.' },
                { text: 'Keep the two boxes — separate categories make the exhibition clearer for visitors.', outcome: 'Clarity here falsifies: the text\'s central claim is fluidity, and a rigid folk/classical wall hides exactly the unity-in-diversity the chapter demonstrates.', reveals: 'folk-classical-are-fixed-boxes' },
                { text: 'Treat the art list as the structure — painting, then music, then dance is just a table of contents.', outcome: 'The sequence is argumentative: each art form follows the same folk→classical→modern trajectory to prove the thesis that arts are rooted in life.', reveals: 'structure-is-topic-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'Bhimbetka\'s cave lines, a Rajasthani wall at Diwali, a Tanjore court repertoire — one argument repeated until it becomes evidence.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the cognitive process.',
          hint: 'If stuck, return to c11_hin_v_cbse_04_012 and practice writing 3-sentence summaries.',
          misconception: 'Students treat "critical analysis" as finding faults or disagreeing with the author.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical Thinking: Analysis and Interpretation is the cognitive process of examining the',
                  options: ['Critical Thinking: Analysis and Interpretation is the cognitive process of examining the', 'The "Before You Read: Context and Background" section provides the historical, cultural,', 'Plot and narrative structure in an expository text refers to the logical organization of', 'In an expository text like "Hkkjrh; dyk,¡", **setting** refers to the historical period,'],
                  hint: 'If stuck, return to c11_hin_v_cbse_04_012 and practice writing 3-sentence summaries of each major.',
                  misconception: 'Students treat "critical analysis" as finding faults or disagreeing with the author.' }
          ],
            remediations: { 'students-treat-critical-analysis-as': { steps: ['Have the student create a two-column table: "Author\'s Claims" (left) vs "Textual Evidence" (right) for each major.', 'Ask them to identify which claims have strong evidence (multiple examples across art forms) and which rely on single.', 'Practice "steel-manning" - restate the author\'s strongest argument in their own words before offering any critique.', 'Only then introduce counter-perspectives using the chapter\'s own conceptual tools (e.g., using \'laokn\' to discuss.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "Hkkjrh; xkf;dkvksa esa cstksM+yrk" refers.',
          hint: 'Review c11_hin_v_cbse_04_012 (Comprehension) for evidence-extraction practice and.',
          misconception: 'Students believe "writing skills" for literature chapters means *summarizing* the text in their own words.',
          parts: [
                { id: 'a', prompt: 'Define the PEEL structure for answer writing and state its four components in the correct order.', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'writing skills', 'components out of order or confusing Evidence with Explanation', 'lose marks for coherence'],
                  hint: 'Review c11_hin_v_cbse_04_012 (Comprehension) for evidence-extraction practice and.',
                  misconception: 'Students believe "writing skills" for literature chapters means *summarizing* the text in their own words.' },
                { id: 'b', prompt: 'A student writes: "Folk paintings are old and classical paintings are also old. Both use natural colors.', answer: 'Weakness 1: The answer lists isolated facts without a comparative *argument*',
                  options: ['Weakness 1: The answer lists isolated facts without a comparative *argument*', 'writing skills'],
                  hint: 'Review c11_hin_v_cbse_04_012 (Comprehension) for evidence-extraction practice and.',
                  misconception: 'Students believe "writing skills" for literature chapters means *summarizing* the text in their own words.' }
          ],
            remediations: { 'writing-skills-for-literature-chapters': { steps: ['Show the student a side-by-side comparison — a 2/5 summary answer vs a 5/5 analytical answer on the *same* question.', 'Give them a "PEEL template" with sentence starters: "The text suggests that... [Point] For instance...', 'Practice with one sub-topic (e.g., "materials in folk painting") — have them write four sentences using the template.', 'Provide a checklist: "Does every paragraph have a comparative verb (differs, parallels, evolves from)?" until.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills" for literature chapters means *summarizing* the text in their own words.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim using chapter evidence: "The distinction between folk and classical arts in India is rigid and absolute." Defend or refute in 3-4 sentences.', answer: 'Refute',
                  options: ['Refute', 'writing skills'],
                  hint: 'Review c11_hin_v_cbse_04_012 (Comprehension) for evidence-extraction practice and.',
                  misconception: 'Students believe "writing skills" for literature chapters means *summarizing* the text in their own words.' }
          ],
            remediations: { 'writing-skills-for-literature-chapters': { steps: ['Show the student a side-by-side comparison — a 2/5 summary answer vs a 5/5 analytical answer on the *same* question.', 'Give them a "PEEL template" with sentence starters: "The text suggests that... [Point] For instance...', 'Practice with one sub-topic (e.g., "materials in folk painting") — have them write four sentences using the template.', 'Provide a checklist: "Does every paragraph have a comparative verb (differs, parallels, evolves from)?" until.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, re-read the "vH;kl" (Exercise) questions on page 70 — they are ready-made.',
          misconception: 'Students believe a "good discussion" means speaking frequently and loudly, often repeating personal likes/dislikes ("I.',
          parts: [
                { id: 'a', prompt: 'During a discussion on "Art and Seasons," a peer says: "Madhubani paintings are only for weddings." Using the chapter, formulate a response that corrects this.', answer: 'Step 1: Identify the claim',
                  options: ['Step 1: Identify the claim', 'A wrong answer giving only personal knowledge (', ') shows failure to use textual evidence', 'means speaking frequently and loudly, often repeating personal likes/dislikes ('],
                  hint: 'If stuck, re-read the "vH;kl" (Exercise) questions on page 70 — they are ready-made discussion.',
                  misconception: 'Students believe a "good discussion" means speaking frequently and loudly, often repeating personal likes/dislikes ("I like Warli art.' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['Model a 2-minute "fishbowl" discussion with two strong students using the PEEL method (Point, Evidence, Explanation.', 'Freeze-frame and label each move: "See how Anjali cited page 64?', 'Give the stuck student a "Discussion Cheat Card" with sentence stems: "The text says...", "Building on X\'s point.', 'Practice in triads with a specific textual question, rotating roles: Speaker, Listener (paraphrases), Evidence-Checker.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
