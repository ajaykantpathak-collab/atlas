import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch17_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch17_p1: SimDef = {
    id: 'v3_c12_eng_k_ch17_p1',
    title: 'Why the Novel Matters (Non-fiction) · Part 1/3',
    subtitle: 'The saint gets the soul, the scientist the body — the novelist gets the whole hog',
    classLevel: 12, subject: 'eng_k', topic: 'Why the Novel Matters (Non-fiction) · Part 1/3',
    chapters: ['c12_eng_k_ch17'],
    nodeIds: ['c12_eng_k_cbse_17_001', 'c12_eng_k_cbse_17_002', 'c12_eng_k_cbse_17_003', 'c12_eng_k_cbse_17_004', 'c12_eng_k_cbse_17_005', 'c12_eng_k_cbse_17_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary manifesto reader', intro: 'A miner\'s son with a teacher\'s ambition inside him declares war on everything that chops a human into parts.', goal: 'Grasp Lawrence\'s claim that the novel alone serves the \'whole man alive\' and why aliveness outranks abstraction.' },
    discovery: {
        question: 'Saints feed the soul, scientists probe the body, philosophers sharpen the mind — yet Lawrence crowns the novelist above all of them. On what grounds?',
        options: ['Whole beats part — each specialist masters one fragment of a person; only the novel engages the \'whole man alive,\' body, senses and contradictions together', 'Novels are more popular', 'Novelists are better writers', 'Saints are useless'],
        answer: 'Whole beats part — each specialist masters one fragment of a person; only the novel engages the \'whole man alive,\' body, senses and contradictions together',
        hook: '\'Man alive\' isn\'t a casual phrase — it\'s Lawrence\'s term for the integrated, sensing, contradictory organism, opposed to the \'dead man in life\' who runs on fixed ideas. And books themselves are \'tremulations on the ether\': dead vibrations until a living reader quivers into response.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" prepares students to engage with D.H.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_17_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Fight the fragmenters: pit the novel against soul, mind and mechanism, decode what \'tremulations on the ether\' means for every book you\'ll ever read, and test Lawrence\'s war on absolutes.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re trying to convince a skeptical friend that a video game isn\'t just entertainment but a way to experience a "whole life" in miniature.',
            decisions: [{ prompt: 'What is the central thesis of Lawrence\'s essay "Why the Novel Matters"?', options: [
                { text: 'The central thesis is that the novel is the "one bright book of life"', outcome: 'The central thesis is that the novel is the "one bright book of life" because it alone can make the.' },
                { text: 'the novel is the best form of storytelling', outcome: 'Not quite — Students often believe "plot and narrative structure" applies only to fiction with events.', reveals: 'plot-and-narrative-structure-applies' },
                { text: 'man alive', outcome: 'Not quite — Students often believe "plot and narrative structure" applies only to fiction with events.', reveals: 'plot-and-narrative-structure-applies' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Have you ever read an essay and felt like you were *inside* a particular mental world — not a room or a landscape, but a way of thinking that has its own.',
            decisions: [{ prompt: 'What is the "intellectual setting" of a non-fiction essay, and how does it differ from the physical setting of a novel or short story?', options: [
                { text: 'The intellectual setting is the conceptual landscape', outcome: 'The intellectual setting is the conceptual landscape — the existing ideas, debates, and positions.' },
                { text: 'the setting is England in the 1920s', outcome: 'Not quite — Students believe "setting and atmosphere" only apply to fiction (time, place, weather, mood).', reveals: 'setting-and-atmosphere-only-apply' },
                { text: 'setting and atmosphere', outcome: 'Not quite — Students believe "setting and atmosphere" only apply to fiction (time, place, weather, mood).', reveals: 'setting-and-atmosphere-only-apply' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine reading a passionate opinion article where the writer says, "I know better than priests, scientists, and philosophers because I\'m a novelist." You\'d.',
            decisions: [{ prompt: 'What is the primary identity Lawrence claims for himself in the essay, and which two groups does he explicitly say he considers himself.', options: [
                { text: 'Lawrence identifies himself as a "novelist" and states he considers himself superior to', outcome: 'Lawrence identifies himself as a "novelist" and states he considers himself superior to "the saint.' },
                { text: 'novelist', outcome: 'Not quite — Students often treat Lawrence as a fictional character in a story, looking for "character.', reveals: 'students-often-treat-lawrence-as' },
                { text: 'the saint, the scientist, the philosopher, and the poet', outcome: 'Not quite — Students often treat Lawrence as a fictional character in a story, looking for "character.', reveals: 'students-often-treat-lawrence-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a debate on "What makes us truly human?" — a priest quotes scripture, a scientist shows a brain scan, a philosopher talks about the.',
            decisions: [{ prompt: 'List the five supporting archetypes Lawrence explicitly names in the essay and state the one-word label he gives each (e.g., "parson,".', options: [
                { text: 'The five archetypes are: the Parson, the Philosopher, the Scientist, the Saint', outcome: 'The five archetypes are: the Parson, the Philosopher, the Scientist, the Saint (exemplified by St.' },
                { text: 'the novelist', outcome: 'Not quite — Students often treat these archetypes as **straw men** — unfair caricatures Lawrence knocks down.', reveals: 'students-often-treat-these-archetypes' },
                { text: 'the reader', outcome: 'Not quite — Students often treat these archetypes as **straw men** — unfair caricatures Lawrence knocks down.', reveals: 'students-often-treat-these-archetypes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re scrolling through social media and see a reel titled "Your Body Is Just a Meat Suit for Your Brain." Lawrence would hate that reel.',
            decisions: [{ prompt: 'State Lawrence\'s one-sentence definition of "man alive" as implied in the essay\'s opening paragraphs.', options: [
                { text: '**Correct answer:** "Man alive" is the living, integrated whole of a human being', outcome: '**Correct answer:** "Man alive" is the living, integrated whole of a human being — every cell.' },
                { text: 'man alive means the soul living in the body', outcome: 'Not quite — **Misconception:** "Lawrence is saying the novel is better because it\'s more *emotional*.', reveals: 'misconception-lawrence-is-saying-the' },
                { text: 'the conscious mind', outcome: 'Not quite — **Misconception:** "Lawrence is saying the novel is better because it\'s more *emotional*.', reveals: 'misconception-lawrence-is-saying-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A health app tells a student \'we know you better than you know yourself — your sleep score, glucose and screen time say who you are.\'',
            decisions: [{ prompt: 'What would Lawrence\'s \'man alive\' answer?', options: [
                { text: 'The metrics are parts — useful shadows of him, but the whole living, contradictory, changing person is greater than any dashboard; use the data without being reduced to it.', outcome: 'Lawrence\'s \'I am greater than my soul\' logic applies: the finger, the gland, the score are fragments of \'man alive\', never the sum.' },
                { text: 'True — the numbers are the person, finally measured.', outcome: 'That\'s exactly the reductionism Lawrence attacks: a part claiming to be the whole produces a \'man dead in life\'.', reveals: 'parts-equal-whole' },
                { text: 'Delete it — since no data can capture him, all metrics are worthless.', outcome: 'Anti-reductionism isn\'t anti-data; parts are still informative about the parts.', reveals: 'anti-reduction-is-anti-data' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend the novel as a philosophy of aliveness — not entertainment. Lawrence turns literary preference into an argument about what a human being is.',
            decisions: [{ prompt: 'What comes next? Why the Novel Matters (Non-fiction) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Why the Novel Matters (Non-fiction) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" prepares students to engage with D.H.',
          hint: 'If stuck, revisit c11_eng_w_cbse_01_001 (Before You Read for Woven Words Chapter 1) and.',
          misconception: 'Students consistently misread Lawrence\'s \'man alive\' as a gendered term (\'man\' = male) or a vague synonym for \'human.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" prepares students to engage with D.H',
                  options: ['"Before You Read: Context and Background" prepares students to engage with D.H', 'In the context of D.H', 'In a non-fiction essay, **setting** refers to the intellectual and conceptual landscape', 'Character analysis of the protagonist in a non-fiction essay involves examining the'],
                  hint: 'If stuck, revisit c11_eng_w_cbse_01_001 (Before You Read for Woven Words Chapter 1) and practice.',
                  misconception: 'Students consistently misread Lawrence\'s \'man alive\' as a gendered term (\'man\' = male) or a vague synonym for \'human being.\' In fact, \'man.' }
          ],
            remediations: { 'students-consistently-misread-lawrence-s': { steps: ['If a student cannot articulate the \'man alive\' vs.', '\'parts\' distinction after reading the walkthrough: (1) Have them re-read paragraphs 3-7 aloud, circling every.', '(2) Ask them to draw a quick diagram: a stick figure labeled \'MAN ALIVE\' with arrows pointing to \'hand\', \'nose\'.', '(3) Give them this prompt: \'Lawrence says "I am greater than my soul." Write one sentence explaining how that is *not*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_002', difficulty: 'standard',
          question: 'In the context of D.H. Lawrence\'s argumentative essay "Why the Novel Matters,".',
          hint: 'Review Class 11 non-fiction chapters (e.g., Hornbill "The Portrait of a Lady" structure.',
          misconception: 'Students often believe "plot and narrative structure" applies only to fiction with events, characters, and a timeline.',
          parts: [
                { id: 'a', prompt: 'What is the central thesis of Lawrence\'s essay "Why the Novel Matters"?', answer: 'The central thesis is that the novel is the "one bright book of life"',
                  options: ['The central thesis is that the novel is the "one bright book of life"', 'the novel is the best form of storytelling', 'man alive', 'plot and narrative structure'],
                  hint: 'Review Class 11 non-fiction chapters (e.g., Hornbill "The Portrait of a Lady" structure analysis).',
                  misconception: 'Students often believe "plot and narrative structure" applies only to fiction with events, characters, and a timeline.' },
                { id: 'b', prompt: 'In your own words, explain what Lawrence means by "tremulations on the ether" and how he uses this metaphor to distinguish books from life.', answer: '"Tremulations on the ether" are dead vibrations',
                  options: ['"Tremulations on the ether" are dead vibrations', 'tremulations are the life inside books', 'plot and narrative structure', 'narrative structure'],
                  hint: 'Review Class 11 non-fiction chapters (e.g., Hornbill "The Portrait of a Lady" structure analysis).',
                  misconception: 'Students often believe "plot and narrative structure" applies only to fiction with events, characters, and a timeline.' },
                { id: 'c', prompt: 'How does Lawrence structure the middle section of the essay (from "For this reason I am a novelist" to "Let us learn from the novel") to build his case for the.', answer: 'Three key structural moves: (1) **Declaration & Definition**',
                  options: ['Three key structural moves: (1) **Declaration & Definition**', 'plot and narrative structure', 'narrative structure', 'summary of content'],
                  hint: 'Review Class 11 non-fiction chapters (e.g., Hornbill "The Portrait of a Lady" structure analysis).',
                  misconception: 'Students often believe "plot and narrative structure" applies only to fiction with events, characters, and a timeline.' }
          ],
            remediations: { 'plot-and-narrative-structure-applies': { steps: ['If the student cannot distinguish the essay\'s argumentative structure, have them first outline the essay paragraph.', 'Ask: "What is the *function* of each paragraph?', 'Does it introduce a new idea, give an example, refute an opponent, or draw a conclusion?" Map these functions to.', 'Then re-attempt Diagnostic Question 4 with this diagram.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "plot and narrative structure" applies only to fiction with events, characters, and a timeline.',
          parts: [
                { id: 'a', prompt: 'Lawrence argues that "right and wrong is an instinct of the whole consciousness." Critique this claim using the essay\'s own structure: does the essay itself.', answer: 'The essay *does* use absolute language ("Which is criminal") but frames it as a',
                  options: ['The essay *does* use absolute language ("Which is criminal") but frames it as a', 'plot and narrative structure', 'narrative structure', 'summary of content'],
                  hint: 'Review Class 11 non-fiction chapters (e.g., Hornbill "The Portrait of a Lady" structure analysis).',
                  misconception: 'Students often believe "plot and narrative structure" applies only to fiction with events, characters, and a timeline.' },
                { id: 'b', prompt: 'Write a short paragraph (4–5 sentences) that mimics Lawrence\'s rhetorical structure: start with a concrete physical observation, expand to a philosophical.', answer: 'Example: "I feel the cold metal of the spoon against my lips as I sip tea',
                  options: ['Example: "I feel the cold metal of the spoon against my lips as I sip tea', 'plot and narrative structure', 'narrative structure', 'summary of content'],
                  hint: 'Review Class 11 non-fiction chapters (e.g., Hornbill "The Portrait of a Lady" structure analysis).',
                  misconception: 'Students often believe "plot and narrative structure" applies only to fiction with events, characters, and a timeline.' }
          ],
            remediations: { 'plot-and-narrative-structure-applies': { steps: ['If the student cannot distinguish the essay\'s argumentative structure, have them first outline the essay paragraph.', 'Ask: "What is the *function* of each paragraph?', 'Does it introduce a new idea, give an example, refute an opponent, or draw a conclusion?" Map these functions to.', 'Then re-attempt Diagnostic Question 4 with this diagram.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_003', difficulty: 'standard',
          question: 'In a non-fiction essay, **setting** refers to the intellectual and conceptual.',
          hint: 'If stuck, return to **c11_eng_h_cbse_01_003** and re-do the atmosphere annotation.',
          misconception: 'Students believe "setting and atmosphere" only apply to fiction (time, place, weather, mood).',
          parts: [
                { id: 'a', prompt: 'What is the "intellectual setting" of a non-fiction essay, and how does it differ from the physical setting of a novel or short story?', answer: 'The intellectual setting is the conceptual landscape',
                  options: ['The intellectual setting is the conceptual landscape', 'the setting is England in the 1920s', 'setting and atmosphere', '"setting and atmosphere" only apply to fiction (time, place, weather, mood)'],
                  hint: 'If stuck, return to **c11_eng_h_cbse_01_003** and re-do the atmosphere annotation exercise on.',
                  misconception: 'Students believe "setting and atmosphere" only apply to fiction (time, place, weather, mood).' },
                { id: 'b', prompt: 'Lawrence writes: "My hand is alive, it flickers with a life of its own.', answer: 'The atmosphere is **intimate, sensual, and wonder-struck**',
                  options: ['The atmosphere is **intimate, sensual, and wonder-struck**', 'imagery', 'personification', 'setting and atmosphere'],
                  hint: 'If stuck, return to **c11_eng_h_cbse_01_003** and re-do the atmosphere annotation exercise on.',
                  misconception: 'Students believe "setting and atmosphere" only apply to fiction (time, place, weather, mood).' }
          ],
            remediations: { 'setting-and-atmosphere-only-apply': { steps: ['Revisit **c11_eng_h_cbse_01_003** or **c11_eng_s_cbse_01_003** (Class 11 Setting and Atmosphere) — practice identifying.', 'Do a *rhetorical annotation* of one Lawrence paragraph: underline every verb, circle every sensory noun, mark sentence.', 'Ask: "What does this *feel* like in the mouth/mind?" 3.', 'Re-read the **Walkthrough** above and apply its three steps (debate → voice → metaphorical spaces) to a simpler essay.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a non-fiction essay involves examining.',
          hint: 'Review "narrative voice vs authorial persona" in c11_eng_h_cbse_01_004 and practice on.',
          misconception: 'Students often treat Lawrence as a fictional character in a story, looking for "character development" or "plot arc.".',
          parts: [
                { id: 'a', prompt: 'Apply Lawrence\'s criterion of "wholeness" to evaluate this statement: "A scientist who studies only the brain but ignores the emotions is practicing incomplete.', answer: 'Lawrence would agree',
                  options: ['Lawrence would agree', 'paradise is in the palm of your hand'],
                  hint: 'Review "narrative voice vs authorial persona" in c11_eng_h_cbse_01_004 and practice on a short.',
                  misconception: 'Students often treat Lawrence as a fictional character in a story, looking for "character development" or "plot arc." They miss that this.' },
                { id: 'b', prompt: 'Analyze how Lawrence uses the contrast between "tremulations on the ether" and "man alive" to construct his persona as more authentic than the philosopher.', answer: 'Lawrence portrays philosophers/saints as dealing in dead abstractions',
                  options: ['Lawrence portrays philosophers/saints as dealing in dead abstractions', 'tremulations', 'paradise is in the palm of your hand'],
                  hint: 'Review "narrative voice vs authorial persona" in c11_eng_h_cbse_01_004 and practice on a short.',
                  misconception: 'Students often treat Lawrence as a fictional character in a story, looking for "character development" or "plot arc." They miss that this.' }
          ],
            remediations: { 'students-often-treat-lawrence-as': { steps: ['If the student conflates fictional and non-fictional character analysis: 1) Re-read the essay\'s first three paragraphs.', '2) Create a two-column table: "Fictional Character Traits" vs "Rhetorical Persona Traits" and fill it using the text.', '3) Re-attempt Diagnostic Question 2, focusing on "persona" not "character." 4) Consult c11_eng_h_cbse_01_004 (Class 11.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_005', difficulty: 'standard',
          question: 'In a non-fiction essay, supporting characters are the representative figures.',
          hint: 'If the distinction between "partial truth" and "whole error" is unclear, revisit the.',
          misconception: 'Students often treat these archetypes as **straw men** — unfair caricatures Lawrence knocks down easily.',
          parts: [
                { id: 'a', prompt: 'List the five supporting archetypes Lawrence explicitly names in the essay and state the one-word label he gives each (e.g., "parson," "philosopher").', answer: 'The five archetypes are: the Parson, the Philosopher, the Scientist, the Saint',
                  options: ['The five archetypes are: the Parson, the Philosopher, the Scientist, the Saint', 'the novelist', 'the reader', 'the novelist" or "the reader" as supporting characters'],
                  hint: 'If the distinction between "partial truth" and "whole error" is unclear, revisit the "Scientist".',
                  misconception: 'Students often treat these archetypes as **straw men** — unfair caricatures Lawrence knocks down easily.' },
                { id: 'b', prompt: 'Apply Lawrence\'s criterion of "wholeness" to a modern example: A fitness influencer treats the body as a machine to be optimized (macros, reps, sleep data).', answer: 'The fitness influencer resembles the **Scientist**',
                  options: ['The fitness influencer resembles the **Scientist**', 'the Philosopher'],
                  hint: 'If the distinction between "partial truth" and "whole error" is unclear, revisit the "Scientist".',
                  misconception: 'Students often treat these archetypes as **straw men** — unfair caricatures Lawrence knocks down easily.' }
          ],
            remediations: { 'students-often-treat-these-archetypes': { steps: ['**Re-read the "Stop and Think" sections** in the NCERT text (pp.', '166, 171) — they explicitly ask you to distinguish animate/inanimate and reconcile inconsistency with integrity; these.', '**Make a two-column table**: Column A = Archetype; Column B = "What they get right (partial truth)" / "What they deny.', '**Re-attempt Diagnostic Questions 2 & 4** using this table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_006', difficulty: 'standard',
          question: 'The primary theme of "Why the Novel Matters" is D.H. Lawrence\'s assertion that.',
          hint: 'If stuck on "what is the theme?", return to the **hand passage (para 2)** and the.',
          misconception: '**Misconception:** "Lawrence is saying the novel is better because it\'s more *emotional* or *realistic*." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'State Lawrence\'s one-sentence definition of "man alive" as implied in the essay\'s opening paragraphs.', answer: '**Correct answer:** "Man alive" is the living, integrated whole of a human being',
                  options: ['**Correct answer:** "Man alive" is the living, integrated whole of a human being', 'man alive means the soul living in the body', 'the conscious mind'],
                  hint: 'If stuck on "what is the theme?", return to the **hand passage (para 2)** and the.',
                  misconception: '**Misconception:** "Lawrence is saying the novel is better because it\'s more *emotional* or *realistic*." **Why it\'s wrong:** Lawrence.' }
          ],
            remediations: { 'misconception-lawrence-is-saying-the': { steps: ['If the student conflates "wholeness" with "emotional depth" or "realistic detail": 1.', '**Re-read paragraphs 5–8** aloud.', 'Circle every noun Lawrence uses for the "parts" the rivals master (soul, spirit, infinity, pure spirit, heart, liver.', '**Ask:** "Which of these parts does Lawrence say *he* is?" Answer: *N/A.* He says "I flatly deny that I am a soul, or.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
