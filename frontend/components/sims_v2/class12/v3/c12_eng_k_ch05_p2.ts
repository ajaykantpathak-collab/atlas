import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch05_p2: SimDef = {
    id: 'v3_c12_eng_k_ch05_p2',
    title: 'One Centimetre (Short Story) · Part 2/3',
    subtitle: 'One centimetre short — and the gatekeeper reached for Paris',
    classLevel: 12, subject: 'eng_k', topic: 'One Centimetre (Short Story) · Part 2/3',
    chapters: ['c12_eng_k_ch05'],
    nodeIds: ['c12_eng_k_cbse_05_007', 'c12_eng_k_cbse_05_008', 'c12_eng_k_cbse_05_009', 'c12_eng_k_cbse_05_010', 'c12_eng_k_cbse_05_011', 'c12_eng_k_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Fiction-in-translation reader', intro: 'A mother keeps every rule perfectly — and a wrongly drawn line on a temple wall still finds a way to shame her.', goal: 'Read One Centimetre through its Chinese blue-collar context and its critique of performative, petty authority.' },
    discovery: {
        question: 'A temple guard invokes the platinum International Standard Metre in Paris to shut down a factory cook over one centimetre. What\'s really happening at that gate?',
        options: ['Authority performing itself — a distant \'standard\' weaponised to win a petty confrontation over a line the wall drew wrong', 'Science keeping order', 'The guard is simply right', 'Tickets must be enforced, always'],
        answer: 'Authority performing itself — a distant \'standard\' weaponised to win a petty confrontation over a line the wall drew wrong',
        hook: 'One centimetre is the gap between a mother\'s dignity and the world\'s crooked rulers — and Bi Shu-min writes it with a doctor\'s clinical eye. Even the old woman\'s dishonest \'fitness scales\' that flatter height are satire: the only character honest about the racket is the one running it.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas or underlying messages in a literary work that complement the primary theme, adding depth and complexity to the narrative.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Measure the measurers: compare the bus\'s peeling paint line and the temple\'s \'earthworm\' mark, weigh Tao Ying\'s flawless motherhood against the system\'s small corruptions, and decide what a centimetre can hold.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are watching a movie where the main plot is a mother trying to do the right thing for her son, but in the background you notice the bus conductor\'s.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in a short story, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that runs alongside the primary theme, adding', outcome: 'A secondary theme is a supporting idea that runs alongside the primary theme, adding layers.' },
                { text: 'secondary themes', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "minor characters." They think any.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'subplots', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "minor characters." They think any.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are watching a film where the camera zooms in on a mother\'s hand pressing a tape measure against her sleeping son\'s head — you hear the faint.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from "One Centimetre" (quote the exact phrase).', options: [
                { text: '**Correct answer:** Imagery = sensory language creating mental pictures/sensations (e.g.,', outcome: '**Correct answer:** Imagery = sensory language creating mental pictures/sensations (e.g., "the flat.' },
                { text: 'like a tent', outcome: 'Not quite — **Misconception:** "Imagery is just \'descriptive writing\' or \'painting a picture\' — any.', reveals: 'misconception-imagery-is-just-descriptive' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you promise your younger sibling a treat if they behave, but the shopkeeper says they\'re "too tall" for the free treat — you know they haven\'t grown.',
            decisions: [{ prompt: 'Define situational irony and give one example from "One Centimetre" where the outcome contradicts what the characters reasonably expect.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is sharply opposite to', outcome: 'Situational irony occurs when the actual outcome of a situation is sharply opposite to what was.' },
                { text: 'Tao Ying not buying a ticket alone is irony', outcome: 'Not quite — Students often confuse **irony** with **coincidence** or **bad luck**.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading a newspaper editorial and encounter the word "flummoxed" in a sentence about a politician facing tough questions.',
            decisions: [{ prompt: 'Define "Vocabulary in Context" in your own words and give one example from "One Centimetre" where the contextual meaning differs from the.', options: [
                { text: '**Correct answer:** Vocabulary in Context is the skill of inferring a word\'s specific', outcome: '**Correct answer:** Vocabulary in Context is the skill of inferring a word\'s specific meaning from.' },
                { text: 'Vocabulary in Context', outcome: 'Not quite — Students believe **"Vocabulary in Context" means guessing a word\'s meaning from the general story.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'vocabulary learning = memorizing dictionary definitions', outcome: 'Not quite — Students believe **"Vocabulary in Context" means guessing a word\'s meaning from the general story.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading "One Centimetre" and notice the jacket "ballooning up **like a tent**" — that *like* signals a simile.',
            decisions: [{ prompt: 'Define **simile** and **metaphor** in your own words. Give one example of each from the story "One Centimetre" (do not use the textbook.', options: [
                { text: '**Simile**: An explicit comparison using *like* or *as* (e.g., "Xiao Ye\'s hair looks **as', outcome: '**Simile**: An explicit comparison using *like* or *as* (e.g., "Xiao Ye\'s hair looks **as fluffy.' },
                { text: 'One Centimetre', outcome: 'Not quite — **Misconception**: "Any comparison in a story is a simile." **Why it happens**: Textbooks often.', reveals: 'misconception-any-comparison-in-a' },
                { text: 'The metaphor \'like a tent\' shows', outcome: 'Not quite — **Misconception**: "Any comparison in a story is a simile." **Why it happens**: Textbooks often.', reveals: 'misconception-any-comparison-in-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re in the exam hall and see a question: "Why did Tao Ying refuse the temple officials\' compensation?" Your first instinct might be to write.',
            decisions: [{ prompt: 'What is the defining difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information explicitly stated in the text (e.g., "What did', outcome: 'A literal question asks for information explicitly stated in the text (e.g., "What did Xiao.' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving your opinion." They write answers like.', reveals: 'inferential-means-guessing-or-giving' },
                { text: 'guessing', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving your opinion." They write answers like.', reveals: 'inferential-means-guessing-or-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a temple counter your daughter measures one centimetre over the free-entry height. The attendant waves you through anyway; she\'s watching you decide.',
            decisions: [{ prompt: 'Pay or take the free pass?', options: [
                { text: 'Pay — \'One Centimetre\' is about integrity measured in millimetres and watched by a child; the ticket is cheap, the lesson about rules and dignity is the real purchase.', outcome: 'Tao Ying\'s struggle shows the smallness of the money and the largeness of what a parent models — the centimetre is where character gets measured.' },
                { text: 'Take the pass — it\'s a centimetre; rules this trivial don\'t bind anyone.', outcome: 'That teaches her that rules apply only when inconvenient to you — the exact erosion the story dissects.', reveals: 'small-cheats-dont-count' },
                { text: 'Take it — money saved is money spent on her later, which is more honest love.', outcome: 'Ends can\'t launder means a child is watching; she\'ll remember the shrug, not the arithmetic.', reveals: 'ends-justify-dishonesty' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a height check as a battle over dignity — and spot how institutions hide behind standards they don\'t even honour.',
            decisions: [{ prompt: 'What comes next? One Centimetre (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — One Centimetre (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas or underlying messages in a literary.',
          hint: 'If stuck, review the "Stop and Think" questions in the NCERT text (pages 73, 76, 81).',
          misconception: 'Students often confuse "secondary themes" with "subplots" or "minor characters." They think any recurring element (like.',
          parts: [
                { id: 'a', prompt: 'In "One Centimetre," the temple guard uses a red line on the wall to measure Xiao Ye\'s height.', answer: 'The red line symbolizes the arbitrariness and rigidity of bureaucratic rules',
                  options: ['The red line symbolizes the arbitrariness and rigidity of bureaucratic rules', 'height marker', 'secondary themes', 'subplots'],
                  hint: 'If stuck, review the "Stop and Think" questions in the NCERT text (pages 73, 76, 81) — they.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor characters." They think any recurring element (like the bus rides.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If the student conflates plot details with themes, do this 3-step remediation: (1) Have them list 5 concrete events.', '(2) For each, ask: "What abstract idea about life/humanity does this event represent?" (e.g., "Sacrificing.', '(3) Group the abstract ideas — the largest group is the primary theme; the others are secondary themes.', 'Revisit node c12_eng_k_cbse_05_006 for primary theme clarity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary themes" with "subplots" or "minor characters." They think any recurring element (like.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following claim: "The secondary theme of childhood innocence in \'One Centimetre\' is more powerful than the primary theme of maternal integrity.', answer: 'Refute',
                  options: ['Refute', 'secondary themes', 'subplots', 'minor characters'],
                  hint: 'If stuck, review the "Stop and Think" questions in the NCERT text (pages 73, 76, 81) — they.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor characters." They think any recurring element (like the bus rides.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If the student conflates plot details with themes, do this 3-step remediation: (1) Have them list 5 concrete events.', '(2) For each, ask: "What abstract idea about life/humanity does this event represent?" (e.g., "Sacrificing.', '(3) Group the abstract ideas — the largest group is the primary theme; the others are secondary themes.', 'Revisit node c12_eng_k_cbse_05_006 for primary theme clarity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck on tenor/vehicle/ground, review Class 11 node c11_eng_h_cbse_05_008 worked.',
          misconception: '**Misconception:** "Imagery is just \'descriptive writing\' or \'painting a picture\' — any adjective-heavy passage counts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery is the use of vivid, sensory language that appeals to the five senses (sight,',
                  options: ['Imagery is the use of vivid, sensory language that appeals to the five senses (sight,', '"Before You Read: Context and Background" is a preparatory literary skill that equips', 'Plot is the sequence of events that make up a story, while narrative structure refers to', 'Setting is the time, place, and social environment in'],
                  hint: 'If stuck on tenor/vehicle/ground, review Class 11 node c11_eng_h_cbse_05_008 worked examples.',
                  misconception: '**Misconception:** "Imagery is just \'descriptive writing\' or \'painting a picture\' — any adjective-heavy passage counts.' }
          ],
            remediations: { 'misconception-imagery-is-just-descriptive': { steps: ['If a student cannot distinguish simile/metaphor or analyze imagery function: 1.', '**Revisit** c11_eng_h_cbse_01_008 / c11_eng_h_cbse_05_008 (Class 11 Imagery and Metaphor nodes) — review definitions.', '**Re-do** Diagnostic Questions 2 and 3 aloud with teacher: explicitly underline "like/as" in similes, circle the.', '**Practice** the "Tenor-Vehicle-Ground" framework on three new quotes from the story: (a) "Xiao Ye is every inch the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_009', difficulty: 'standard',
          question: 'Irony in literature is a contrast between expectation and reality — what.',
          hint: 'If stuck on irony types, review Class 10 "A Letter to God" (situational) and "The.',
          misconception: 'Students often confuse **irony** with **coincidence** or **bad luck**.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of dramatic irony to the temple gate scene (pages 76-78).', answer: 'Dramatic irony arises when the audience possesses knowledge that characters lack',
                  options: ['Dramatic irony arises when the audience possesses knowledge that characters lack', 'The guard knows she\'s lying'],
                  hint: 'If stuck on irony types, review Class 10 "A Letter to God" (situational) and "The Necklace".',
                  misconception: 'Students often confuse **irony** with **coincidence** or **bad luck**.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student cannot distinguish irony types or trace the symbol\'s evolution: 1.', '**Revisit node c12_eng_k_cbse_05_008 (Imagery and Metaphor)** — ensure they can separate *comparison* (metaphor) from.', '**Use a three-column table**: Column A = "What Tao Ying expects/intends", Column B = "What actually happens", Column.', 'Fill for 5 key scenes (bus alone, bus with Xiao Ye, temple gate, fitness scales, home measurement).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If unable to identify clue types, re-do the **Context Clue Classification Exercise** from.',
          misconception: 'Students believe **"Vocabulary in Context" means guessing a word\'s meaning from the general story plot**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the skill of determining the precise meaning,',
                  options: ['Vocabulary in Context refers to the skill of determining the precise meaning,', '"Before You Read: Context and Background" is a preparatory literary skill that equips', 'Plot is the sequence of events that make up a story, while narrative structure refers to', 'Setting is the time, place, and social environment in'],
                  hint: 'If unable to identify clue types, re-do the **Context Clue Classification Exercise** from.',
                  misconception: 'Students believe **"Vocabulary in Context" means guessing a word\'s meaning from the general story plot**.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['**Re-read para 2-3** with a highlighter.', 'Mark every word that describes the conductor\'s behaviour.', '**Make a two-column table**: Column A = clue phrase from text; Column B = what it implies about Tao Ying\'s decision.', '**Write a one-sentence contextual definition** using ONLY Column B words.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_011', difficulty: 'standard',
          question: 'This node covers the analysis of **language usage** in the short story "One.',
          hint: 'If stuck on stress shift: practice with **online dictionary audio** (Oxford/Cambridge).',
          misconception: '**Misconception**: "Any comparison in a story is a simile." **Why it happens**: Textbooks often teach simile first.',
          parts: [
                { id: 'a', prompt: 'Explain why the author writes "The white of the wall looks **like a virgin canvas** and Xiao Ye **a painting filling up the space**" — what two comparisons are.', answer: 'First comparison: wall\'s whiteness → virgin canvas (explicit with *like*)',
                  options: ['First comparison: wall\'s whiteness → virgin canvas (explicit with *like*)', 'understood', 'One Centimetre', 'The metaphor \'like a tent\' shows'],
                  hint: 'If stuck on stress shift: practice with **online dictionary audio** (Oxford/Cambridge) for the six.',
                  misconception: '**Misconception**: "Any comparison in a story is a simile." **Why it happens**: Textbooks often teach simile first (*like/as* = easy.' },
                { id: 'b', prompt: 'In the sentence "The **conduct** of the guard was rude", mark the stress. Then rewrite the sentence using *conduct* as a verb and mark the stress.', answer: 'Noun: **CON-duct** (stress on first syllable)',
                  options: ['Noun: **CON-duct** (stress on first syllable)', 'The **CON-duct** of the guard was rude', 'He will **con-DUCT** the orchestra', 'One Centimetre'],
                  hint: 'If stuck on stress shift: practice with **online dictionary audio** (Oxford/Cambridge) for the six.',
                  misconception: '**Misconception**: "Any comparison in a story is a simile." **Why it happens**: Textbooks often teach simile first (*like/as* = easy.' }
          ],
            remediations: { 'misconception-any-comparison-in-a': { steps: ['**Re-teach definitions**: Use a T-chart: Simile = *like/as* (explicit) | Metaphor = *is/are/was* or apposition.', '**Text hunt**: Give the student 5 minutes to find **three** similes and **three** metaphors in the story (not the.', '**Stress drill**: Use the "hand-tap" method — tap table on stressed syllable while saying *CON-duct / con-DUCT*.', '**Re-diagnostic**: Ask the student to explain the metaphor "ice in her son\'s eyes" in their own words and to read aloud.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_05_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving explicitly stated.',
          hint: 'If stuck, re-read the "Stop and Think" boxes in the NCERT text — they are designed by the.',
          misconception: 'Students believe "inferential" means "guessing" or "giving your opinion." They write answers like "I think Tao Ying was.',
          parts: [
                { id: 'a', prompt: 'In the story, the narrator states: "Tao Ying does not come from a privileged background, and has not read very many books.', answer: 'Literal',
                  options: ['Literal', 'character detail', 'inferential', 'guessing'],
                  hint: 'If stuck, re-read the "Stop and Think" boxes in the NCERT text — they are designed by the textbook.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving your opinion." They write answers like "I think Tao Ying was angry because the.' },
                { id: 'b', prompt: 'Apply the literal/inferential distinction to this question: "Why did Tao Ying decide to buy two tickets on the bus even though the conductor said Xiao Ye was.', answer: 'This is an inferential question',
                  options: ['This is an inferential question', 'inferential', 'guessing', 'giving your opinion'],
                  hint: 'If stuck, re-read the "Stop and Think" boxes in the NCERT text — they are designed by the textbook.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving your opinion." They write answers like "I think Tao Ying was angry because the.' }
          ],
            remediations: { 'inferential-means-guessing-or-giving': { steps: ['If a student cannot distinguish literal from inferential: (1) Give them 5 sentences from the story — 3 explicit facts.', '(2) For each inferential sentence, ask: "Which two words in the text made you conclude that?" (3) Practice converting.', '(4) Revisit c12_eng_k_cbse_05_002 (Plot) to re-sequence events, then c12_eng_k_cbse_05_004 (Protagonist) to re-grasp.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
