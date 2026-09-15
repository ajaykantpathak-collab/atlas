import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch02_p3: SimDef = {
    id: 'v3_c12_hin_al_ch02_p3',
    title: 'fcLdksgj dh ekVh · Part 3/3',
    subtitle: 'One clay bowl holding a whole childhood',
    classLevel: 12, subject: 'hin_al', topic: 'fcLdksgj dh ekVh · Part 3/3',
    chapters: ['c12_hin_al_ch02'],
    nodeIds: ['c12_hin_al_cbse_02_013', 'c12_hin_al_cbse_02_014', 'c12_hin_al_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi memoir reader', intro: 'A writer returns to his mother\'s wheel — where pots were shaped and so was he.', goal: 'Read Fulchand ki Ekawah as an autobiographical sketch — where genre turns memory into art.' },
    discovery: {
        question: 'Ashk remembers his potter mother shaping clay at dawn — one bowl, one breath, one life. Why does a short \'sketch\' hit harder than a full autobiography?',
        options: ['Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it', 'It\'s shorter, so easier', 'Autobiographies are boring', 'Sketches are more factual'],
        answer: 'Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it',
        hook: 'Don\'t read it as a diary — it\'s craft: the potter\'s wheel, the mother\'s hands, the smell of wet earth chosen to carry loss and a vanishing craft. Genre is the message; biography alone is just a record.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the disciplined process of examining a literary text beyond its literal meaning to uncover underlying themes, evaluate authorial choices, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Step into the potter\'s village at first light: weigh how genre shapes memory, trace the mother-child bond through small acts, and read the wheel as a disappearing world.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you sit in the exam hall and see: "Analyze how the author uses sensory imagery to recreate the village atmosphere in \'fcLdksgj dh ekVh\'." Your mind.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature?', options: [
                { text: 'PEEL stands for **Point, Evidence, Explanation, Link**', outcome: 'PEEL stands for **Point, Evidence, Explanation, Link**. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — **"Good writing means using difficult Hindi words (tatsam/shuddh) and long sentences."** Students.', reveals: 'good-writing-means-using-difficult' },
                { text: 'formal register', outcome: 'Not quite — **"Good writing means using difficult Hindi words (tatsam/shuddh) and long sentences."** Students.', reveals: 'good-writing-means-using-difficult' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a literature circle where your group must discuss: "How does the author\'s portrayal of his mother reflect the changing role of women.',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a Class 12 Hindi speaking and listening assessment?', options: [
                { text: 'A discussion point is an open-ended, text-anchored prompt designed to initiate analytical', outcome: 'A discussion point is an open-ended, text-anchored prompt designed to initiate analytical dialogue.' },
                { text: 'to test if students remember the plot', outcome: 'Not quite — Students believe "discussion" means taking turns stating opinions ("I feel the mother was strong").', reveals: 'discussion-means-taking-turns-stating' },
                { text: 'discussion', outcome: 'Not quite — Students believe "discussion" means taking turns stating opinions ("I feel the mother was strong").', reveals: 'discussion-means-taking-turns-stating' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a college-magazine memoir about the writer\'s grandmother in a potters\' village. The draft is a flat factual list — born here, made pots, died there — and the writer insists \'it\'s autobiographical, so it must record everything exactly.\'',
            decisions: [{ prompt: 'What does the रेखाचित्र (sketch) genre of Ashk\'s \'फुलचंद की एकवह\' teach the edit?', options: [
                { text: 'Cut and shape — a रेखाचित्र selects one memory or figure and artistically intensifies it; the bond lives in sensory details like dawn on the potter\'s wheel and small acts of care, not in a complete chronology of facts.', outcome: 'The genre\'s power is selectivity: an autobiographical sketch is life transformed into art through emphasis, so \'record everything\' produces a register, not a remembrance.' },
                { text: 'Leave it — autobiography\'s contract with the reader is factual completeness, so selection would be dishonest.', outcome: 'That confuses the sketch with the full autobiography or a diary; the रेखाचित्र makes no such contract — its truth is thematic unity, and completeness is the wrong measure for it.', reveals: 'memoir-means-complete-facts' },
                { text: 'Improve it by adding the author\'s biography — more background facts will supply the missing depth.', outcome: 'That\'s the \'life equals text\' fallacy: the emotional force comes from craft — imagery and shaped memory — not from appending more verified biography.', reveals: 'biography-adds-depth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a sketch as deliberate art — one memory holding an entire childhood, a mother and a craft on the wheel.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the disciplined process.',
          hint: 'If stuck, re-read the opening paragraph of the NCERT text ("ikB ifjp;") which explicitly.',
          misconception: 'Students treat "fcLdksgj dh ekVh" as a straightforward nostalgic memoir where the author *recovers* her past.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical Thinking: Analysis and Interpretation is the disciplined process of examining a',
                  options: ['Critical Thinking: Analysis and Interpretation is the disciplined process of examining a', '"Before You Read: Context and Background" for Chapter 2 (फुलचंद की एकवह) prepares', 'Plot refers to the sequence of events that make up a story, while narrative structure is', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, re-read the opening paragraph of the NCERT text ("ikB ifjp;") which explicitly states.',
                  misconception: 'Students treat "fcLdksgj dh ekVh" as a straightforward nostalgic memoir where the author *recovers* her past.' }
          ],
            remediations: { 'students-treat-fcldksgj-dh-ekvh': { steps: ['If a student cannot distinguish the narrator\'s construction from the character\'s reality: Step 1 — Have them highlight.', 'Step 2 — Ask: "Who knows Phuluk\'s mother\'s grief — the child or the adult?" (Answer: The adult imposes the.', 'Step 3 — Assign a micro-writing task: Rewrite the turmeric-mark episode *only* from the child\'s limited perspective (no.', 'Step 4 — Compare both versions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter refers to the ability to construct.',
          hint: 'If stuck on Evidence: Revisit **c12_hin_al_cbse_02_012 (Comprehension)** and.',
          misconception: '**"Good writing means using difficult Hindi words (tatsam/shuddh) and long sentences."** Students believe board.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature?', answer: 'PEEL stands for **Point, Evidence, Explanation, Link**',
                  options: ['PEEL stands for **Point, Evidence, Explanation, Link**', 'Paragraph, Example, Explain, Line', 'formal register', 'Sanskritized vocabulary'],
                  hint: 'If stuck on Evidence: Revisit **c12_hin_al_cbse_02_012 (Comprehension)** and.',
                  misconception: '**"Good writing means using difficult Hindi words (tatsam/shuddh) and long sentences."** Students believe board examiners reward ornamental.' },
                { id: 'b', prompt: 'A student writes: "The author describes many smells in the village like curd and cow dung.', answer: 'The **Explanation** step is missing (and Link is weak)',
                  options: ['The **Explanation** step is missing (and Link is weak)', 'retelling', 'analyzing', 'formal register'],
                  hint: 'If stuck on Evidence: Revisit **c12_hin_al_cbse_02_012 (Comprehension)** and.',
                  misconception: '**"Good writing means using difficult Hindi words (tatsam/shuddh) and long sentences."** Students believe board examiners reward ornamental.' },
                { id: 'c', prompt: 'Compare two answer openings for the question "Discuss the significance of the *iwQy* (sounds) in the chapter." Opening A: "There are many sounds in the chapter.', answer: 'Opening B demonstrates **analysis** (Bloom\'s level 4) by identifying a *pattern*',
                  options: ['Opening B demonstrates **analysis** (Bloom\'s level 4) by identifying a *pattern*', 'formal register', 'Sanskritized vocabulary', 'board examiners reward ornamental vocabulary'],
                  hint: 'If stuck on Evidence: Revisit **c12_hin_al_cbse_02_012 (Comprehension)** and.',
                  misconception: '**"Good writing means using difficult Hindi words (tatsam/shuddh) and long sentences."** Students believe board examiners reward ornamental.' }
          ],
            remediations: { 'good-writing-means-using-difficult': { steps: ['**Identify the gap:** Ask the student to write a 50-word answer to "Describe the narrator\'s mother." Time them (5 mins).', '**Diagnose:** If the answer is a list of adjectives ("kind, loving, hardworking") → they lack **Evidence/Explanation**.', 'If it\'s a story summary → they lack **Point/Link**.', '**Remediate:** Give a model PEEL paragraph for the same question.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Good writing means using difficult Hindi words (tatsam/shuddh) and long sentences."** Students believe board.',
          parts: [
                { id: 'a', prompt: 'Create a 50-word diary entry dated the night *fclukFk* dies, written from the narrator\'s perspective as an adult looking back.', answer: '*Night, 19XX',
                  options: ['*Night, 19XX', 'formal register', 'Sanskritized vocabulary', 'board examiners reward ornamental vocabulary'],
                  hint: 'If stuck on Evidence: Revisit **c12_hin_al_cbse_02_012 (Comprehension)** and.',
                  misconception: '**"Good writing means using difficult Hindi words (tatsam/shuddh) and long sentences."** Students believe board examiners reward ornamental.' }
          ],
            remediations: { 'good-writing-means-using-difficult': { steps: ['**Identify the gap:** Ask the student to write a 50-word answer to "Describe the narrator\'s mother." Time them (5 mins).', '**Diagnose:** If the answer is a list of adjectives ("kind, loving, hardworking") → they lack **Evidence/Explanation**.', 'If it\'s a story summary → they lack **Point/Link**.', '**Remediate:** Give a model PEEL paragraph for the same question.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points are structured conversation prompts.',
          hint: 'If stuck, revisit c12_hin_al_cbse_02_013 (Critical Thinking) for analytical frameworks.',
          misconception: 'Students believe "discussion" means taking turns stating opinions ("I feel the mother was strong") without textual.',
          parts: [
                { id: 'a', prompt: 'Compare the discussion potential of these two prompts: (A) "List the festivals mentioned in the chapter." (B) "How do the festivals of Holi and Diwali function.', answer: 'Prompt B is superior',
                  options: ['Prompt B is superior', 'discussion', 'I feel the mother was strong'],
                  hint: 'If stuck, revisit c12_hin_al_cbse_02_013 (Critical Thinking) for analytical frameworks and.',
                  misconception: 'Students believe "discussion" means taking turns stating opinions ("I feel the mother was strong") without textual evidence or responding.' }
          ],
            remediations: { 'discussion-means-taking-turns-stating': { steps: ['If a student cannot move beyond opinion-sharing: (1) Give them a 2-column template: "Textual Evidence (quote/para ref)".', '(2) Practice with a 3-minute "Evidence-Only" rule: every speaker must open with "On page X, the author writes...".', '(3) Model active listening: after a peer speaks, the next student *must* start with "Adding to [Name]\'s point about...".', 'Re-assess using a peer-feedback checklist focused on these two behaviors.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
