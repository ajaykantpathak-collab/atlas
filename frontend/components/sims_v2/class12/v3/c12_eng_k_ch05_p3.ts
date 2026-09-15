import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch05_p3: SimDef = {
    id: 'v3_c12_eng_k_ch05_p3',
    title: 'One Centimetre (Short Story) · Part 3/3',
    subtitle: 'One centimetre short — and the gatekeeper reached for Paris',
    classLevel: 12, subject: 'eng_k', topic: 'One Centimetre (Short Story) · Part 3/3',
    chapters: ['c12_eng_k_ch05'],
    nodeIds: ['c12_eng_k_cbse_05_013', 'c12_eng_k_cbse_05_014', 'c12_eng_k_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Fiction-in-translation reader', intro: 'A mother keeps every rule perfectly — and a wrongly drawn line on a temple wall still finds a way to shame her.', goal: 'Read One Centimetre through its Chinese blue-collar context and its critique of performative, petty authority.' },
    discovery: {
        question: 'A temple guard invokes the platinum International Standard Metre in Paris to shut down a factory cook over one centimetre. What\'s really happening at that gate?',
        options: ['Authority performing itself — a distant \'standard\' weaponised to win a petty confrontation over a line the wall drew wrong', 'Science keeping order', 'The guard is simply right', 'Tickets must be enforced, always'],
        answer: 'Authority performing itself — a distant \'standard\' weaponised to win a petty confrontation over a line the wall drew wrong',
        hook: 'One centimetre is the gap between a mother\'s dignity and the world\'s crooked rulers — and Bi Shu-min writes it with a doctor\'s clinical eye. Even the old woman\'s dishonest \'fitness scales\' that flatter height are satire: the only character honest about the racket is the one running it.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of actively examining a text\'s explicit and implicit meanings, evaluating the author\'s choices (structure, language, perspective).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Measure the measurers: compare the bus\'s peeling paint line and the temple\'s \'earthworm\' mark, weigh Tao Ying\'s flawless motherhood against the system\'s small corruptions, and decide what a centimetre can hold.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a juror in a court where the "defendant" is the temple guard who humiliated Tao Ying and Xiao Ye.',
            decisions: [{ prompt: 'What is the primary function of the "Stop and Think" questions inserted by the textbook editors at pages 72, 76, 81 in the story?', options: [
                { text: 'The "Stop and Think" questions are pedagogical prompts designed to guide readers from', outcome: 'The "Stop and Think" questions are pedagogical prompts designed to guide readers from literal.' },
                { text: 'They are just comprehension check questions', outcome: 'Not quite — Students often think "critical analysis" means finding *one* correct hidden meaning the author.', reveals: 'critical-analysis-means-finding-one' },
                { text: 'critical analysis', outcome: 'Not quite — Students often think "critical analysis" means finding *one* correct hidden meaning the author.', reveals: 'critical-analysis-means-finding-one' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall and the question reads: "How does Bi Shu-min use the \'one centimetre\' as a symbol to explore the gap between parental ideals.',
            decisions: [{ prompt: 'Define the PEEL paragraph structure and state its four components in order.', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. Point: a clear topic sentence stating the.' },
                { text: 'Quote, Analysis, Conclusion', outcome: 'Not quite — Students believe "writing skills based on the chapter" means *retelling the story* in different.', reveals: 'writing-skills-based-on-the' },
                { text: 'analytical reasoning', outcome: 'Not quite — Students believe "writing skills based on the chapter" means *retelling the story* in different.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a book club where someone says, "Tao Ying was wrong to hit Xiao Ye — no excuse." How do you respond?',
            decisions: [{ prompt: 'What are the two discussion topics explicitly listed under "Talking about the Text" in the NCERT textbook for "One Centimetre"?', options: [
                { text: 'The two topics are: (1) "The way a child looks at the world is very different from that', outcome: 'The two topics are: (1) "The way a child looks at the world is very different from that of.' },
                { text: 'The way a child looks at the world is very different from that of an adult', outcome: 'Not quite — Students often treat "discussion" as a series of disconnected opinions ("I think Tao Ying was.', reveals: 'students-often-treat-discussion-as' },
                { text: 'correct answer', outcome: 'Not quite — Students often treat "discussion" as a series of disconnected opinions ("I think Tao Ying was.', reveals: 'students-often-treat-discussion-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a temple counter your daughter measures one centimetre over the free-entry height. The attendant waves you through anyway; she\'s watching you decide.',
            decisions: [{ prompt: 'Pay or take the free pass?', options: [
                { text: 'Pay — \'One Centimetre\' is about integrity measured in millimetres and watched by a child; the ticket is cheap, the lesson about rules and dignity is the real purchase.', outcome: 'Tao Ying\'s struggle shows the smallness of the money and the largeness of what a parent models — the centimetre is where character gets measured.' },
                { text: 'Take the pass — it\'s a centimetre; rules this trivial don\'t bind anyone.', outcome: 'That teaches her that rules apply only when inconvenient to you — the exact erosion the story dissects.', reveals: 'small-cheats-dont-count' },
                { text: 'Take it — money saved is money spent on her later, which is more honest love.', outcome: 'Ends can\'t launder means a child is watching; she\'ll remember the shrug, not the arithmetic.', reveals: 'ends-justify-dishonesty' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a height check as a battle over dignity — and spot how institutions hide behind standards they don\'t even honour.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of actively.',
          hint: 'If stuck, revisit c12_eng_k_cbse_05_012 (Comprehension: Literal and Inferential.',
          misconception: 'Students often think "critical analysis" means finding *one* correct hidden meaning the author intended.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Tao Ying refuses both the money and the tickets offered by the temple officials at the end, even though she is poor and the.', answer: 'Tao Ying refuses',
                  options: ['Tao Ying refuses', 'She is proud / doesn\'t need charity', 'critical analysis'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_05_012 (Comprehension: Literal and Inferential Questions) and.',
                  misconception: 'Students often think "critical analysis" means finding *one* correct hidden meaning the author intended.' },
                { id: 'b', prompt: 'Apply the concept of "free indirect discourse" to analyze the following sentence from the story: "Tao Ying is not working today and is in a really good mood.', answer: 'Step 1: Identify the grammatical subject',
                  options: ['Step 1: Identify the grammatical subject', 'It\'s the narrator describing her mood', 'critical analysis'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_05_012 (Comprehension: Literal and Inferential Questions) and.',
                  misconception: 'Students often think "critical analysis" means finding *one* correct hidden meaning the author intended.' },
                { id: 'c', prompt: 'Compare the two measurement scenes: the bus conductor\'s "pale finger" pointing at 1.10 m and the temple guard\'s "earthworm" red line.', answer: 'Step 1: On the bus, the painted finger is "pale"',
                  options: ['Step 1: On the bus, the painted finger is "pale"', 'Both are just height markers', 'critical analysis'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_05_012 (Comprehension: Literal and Inferential Questions) and.',
                  misconception: 'Students often think "critical analysis" means finding *one* correct hidden meaning the author intended.' }
          ],
            remediations: { 'critical-analysis-means-finding-one': { steps: ['If a student reduces analysis to moral labeling (good/bad characters), do: 1) Assign a "contradiction hunt" — find 3.', '2) Have them write a two-column table: "What the character says/thinks" vs.', '"What the narrative shows".', '3) Ask: "If the guard is the villain, why does the narrator call him \'just doing his job\' and show him nervous?" 4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "critical analysis" means finding *one* correct hidden meaning the author intended.',
          parts: [
                { id: 'a', prompt: 'Evaluate the interpretation: "The old woman\'s \'flattering scales\' are a narrative coincidence — they just happen to reveal the truth." Defend or refute using.', answer: 'Refute',
                  options: ['Refute', 'critical analysis'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_05_012 (Comprehension: Literal and Inferential Questions) and.',
                  misconception: 'Students often think "critical analysis" means finding *one* correct hidden meaning the author intended.' },
                { id: 'b', prompt: 'Create a 3-sentence "missing scene" that could be inserted after the officials leave (page 87) showing Tao Ying\'s internal conflict without using her thoughts.', answer: 'Example: "Tao Ying stared at the empty doorway long after the officials left',
                  options: ['Example: "Tao Ying stared at the empty doorway long after the officials left', 'critical analysis'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_05_012 (Comprehension: Literal and Inferential Questions) and.',
                  misconception: 'Students often think "critical analysis" means finding *one* correct hidden meaning the author intended.' }
          ],
            remediations: { 'critical-analysis-means-finding-one': { steps: ['If a student reduces analysis to moral labeling (good/bad characters), do: 1) Assign a "contradiction hunt" — find 3.', '2) Have them write a two-column table: "What the character says/thinks" vs.', '"What the narrative shows".', '3) Ask: "If the guard is the villain, why does the narrator call him \'just doing his job\' and show him nervous?" 4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "One Centimetre" refers to the ability.',
          hint: 'If stuck, revisit c12_eng_k_cbse_05_013 (Critical Thinking) for analysis practice and.',
          misconception: 'Students believe "writing skills based on the chapter" means *retelling the story* in different formats (e.g., "Write.',
          parts: [
                { id: 'a', prompt: 'Define the PEEL paragraph structure and state its four components in order. Why is each component necessary for a Class 12 board exam analytical response?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Quote, Analysis, Conclusion', 'analytical reasoning', 'writing skills based on the chapter'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_05_013 (Critical Thinking) for analysis practice and.',
                  misconception: 'Students believe "writing skills based on the chapter" means *retelling the story* in different formats (e.g., "Write the story as a diary.' },
                { id: 'b', prompt: 'In "One Centimetre," Tao Ying measures Xiao Ye at home and gets 1.09 m, but the temple guard claims he is 1.10 m.', answer: 'The student\'s response states a fact but offers zero *analysis*',
                  options: ['The student\'s response states a fact but offers zero *analysis*', 'writing skills based on the chapter', 'Write the story as a diary entry'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_05_013 (Critical Thinking) for analysis practice and.',
                  misconception: 'Students believe "writing skills based on the chapter" means *retelling the story* in different formats (e.g., "Write the story as a diary.' },
                { id: 'c', prompt: 'Write a 100-word diary entry from Tao Ying\'s perspective on the night after the temple incident, capturing her internal conflict between protecting Xiao Ye\'s.', answer: 'A strong response: "The yellow tape lies on the table like a poisonous viper',
                  options: ['A strong response: "The yellow tape lies on the table like a poisonous viper', 'writing skills based on the chapter', 'Write the story as a diary entry'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_05_013 (Critical Thinking) for analysis practice and.',
                  misconception: 'Students believe "writing skills based on the chapter" means *retelling the story* in different formats (e.g., "Write the story as a diary.' },
                { id: 'd', prompt: 'Compare the bus conductor episode (where Tao Ying buys two tickets voluntarily) and the temple guard episode (where she refuses to buy a second ticket).', answer: '**Step 1: Identify the parallel**',
                  options: ['**Step 1: Identify the parallel**', 'writing skills based on the chapter', 'Write the story as a diary entry'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_05_013 (Critical Thinking) for analysis practice and.',
                  misconception: 'Students believe "writing skills based on the chapter" means *retelling the story* in different formats (e.g., "Write the story as a diary.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a plot-summary diary entry or a trait-list character sketch: **Step 1** — Show them a side-by-side.', '**Step 2** — Highlight the three differences: (a) thesis-driven opening, (b) embedded evidence with literary terms, (c).', '**Step 3** — Have them rewrite *one paragraph* of their answer using the PEEL template from Worked Example 1.', '**Step 4** — Re-diagnose using Diagnostic Question 3 (diary entry) — they must score "strong response" criteria before.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to structured oral activities.',
          hint: 'If stuck, review c12_eng_k_cbse_05_013 (Critical Thinking) for analytical frameworks and.',
          misconception: 'Students often treat "discussion" as a series of disconnected opinions ("I think Tao Ying was nice," "I think the guard.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the first discussion topic ("child vs adult worldview") is central to the conflict at the temple gate.', answer: 'The child\'s worldview is immediate, trusting, and literal',
                  options: ['The child\'s worldview is immediate, trusting, and literal', 'correct answer', 'gap between real and projected self'],
                  hint: 'If stuck, review c12_eng_k_cbse_05_013 (Critical Thinking) for analytical frameworks and.',
                  misconception: 'Students often treat "discussion" as a series of disconnected opinions ("I think Tao Ying was nice," "I think the guard was mean") rather.' },
                { id: 'b', prompt: 'During a group discussion, a peer claims: "Tao Ying\'s letter to the temple administrators was just about getting a refund." Using the PEEL structure (Point.', answer: 'Point: The letter was primarily about restoring her son\'s trust, not money',
                  options: ['Point: The letter was primarily about restoring her son\'s trust, not money', 'correct answer', 'gap between real and projected self'],
                  hint: 'If stuck, review c12_eng_k_cbse_05_013 (Critical Thinking) for analytical frameworks and.',
                  misconception: 'Students often treat "discussion" as a series of disconnected opinions ("I think Tao Ying was nice," "I think the guard was mean") rather.' },
                { id: 'c', prompt: 'Compare the two measurement scenes: the bus conductor\'s "pale finger" at 1.10 m and the temple guard\'s "earthworm" red line.', answer: 'On the bus, the conductor\'s authority is casual and negotiable',
                  options: ['On the bus, the conductor\'s authority is casual and negotiable', 'correct answer', 'gap between real and projected self'],
                  hint: 'If stuck, review c12_eng_k_cbse_05_013 (Critical Thinking) for analytical frameworks and.',
                  misconception: 'Students often treat "discussion" as a series of disconnected opinions ("I think Tao Ying was nice," "I think the guard was mean") rather.' }
          ],
            remediations: { 'students-often-treat-discussion-as': { steps: ['If a student defaults to opinion-sharing without evidence: (1) Pause the discussion.', '(2) Ask: "Which moment in the text made you think that?', 'Read the line aloud." (3) Model a PEEL response using their opinion as the Point.', '(4) Have them practice with a new prompt: "The Writer\'s advice to Tao Ying was manipulative." (5) Require them to cite.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
