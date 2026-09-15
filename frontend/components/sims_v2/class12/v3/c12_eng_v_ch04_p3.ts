import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch04_p3: SimDef = {
    id: 'v3_c12_eng_v_ch04_p3',
    title: 'The Enemy · Part 3/3',
    subtitle: 'The scalpel or the state — a doctor\'s wartime third option',
    classLevel: 12, subject: 'eng_v', topic: 'The Enemy · Part 3/3',
    chapters: ['c12_eng_v_ch04'],
    nodeIds: ['c12_eng_v_cbse_04_013', 'c12_eng_v_cbse_04_014', 'c12_eng_v_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'War-fiction analyst', intro: 'An enemy soldier bleeds on a Japanese doorstep. Everything the doctor knows says save him; everything his nation demands says hand him over.', goal: 'Read The Enemy inside its WWII context — medical ethics versus treason, and the moral agency that escapes the binary.' },
    discovery: {
        question: '1944 Japan: a wounded American POW washes up at Dr. Sadao\'s door. Treating him is treason under military law — yet the Geneva Convention requires it. The \'doctor or patriot\' framing hides what?',
        options: ['A third path — humanity transcending both roles; Sadao operates, then helps him escape, answering neither duty fully and a higher one completely', 'Nothing — it\'s genuinely two options', 'Treason is always wrong', 'Medicine outranks everything'],
        answer: 'A third path — humanity transcending both roles; Sadao operates, then helps him escape, answering neither duty fully and a higher one completely',
        hook: 'Pearl S. Buck wrote this DURING the war — an American raised in China who could see both sides without caricature. Judging Sadao by peacetime logic (\'just call the police\') misses that the police meant execution; the dilemma only works inside its history.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves evaluating a text by questioning assumptions, examining evidence, interpreting authorial choices, and synthesizing multiple perspectives to form.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_04_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stand in Sadao\'s surgery under wartime law: weigh the oath against the statute, watch Hana and the servants choose sides, and test whether a man can be patriot, doctor and human at once.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a judge hearing Dr. Sadao\'s case: he saved an enemy soldier, violating wartime law, but upheld his medical oath.',
            decisions: [{ prompt: 'What is the central ethical dilemma Dr. Sadao faces in "The Enemy," and which two roles are in direct conflict?', options: [
                { text: 'The central dilemma is whether to save a wounded enemy soldier (duty as a doctor) or hand', outcome: 'The central dilemma is whether to save a wounded enemy soldier (duty as a doctor) or hand him over.' },
                { text: 'healer', outcome: 'Not quite — Students often treat "The Enemy" as a simple "humanity wins" story, writing that Sadao\'s choice.', reveals: 'students-often-treat-the-enemy' },
                { text: 'patriot', outcome: 'Not quite — Students often treat "The Enemy" as a simple "humanity wins" story, writing that Sadao\'s choice.', reveals: 'students-often-treat-the-enemy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: "Dr.',
            decisions: [{ prompt: 'Define the PEEL framework and state the purpose of each component in a literature-based writing task.', options: [
                { text: 'PEEL stands for Point (topic sentence stating the argument), Evidence (specific textual', outcome: 'PEEL stands for Point (topic sentence stating the argument), Evidence (specific textual reference.' },
                { text: 'PEEL is for paragraph formatting', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the story in essay/formal.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the story in essay/formal.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a literature circle discussing whether Dr. Sadao betrayed his country or upheld a higher moral law.',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' activity in the context of studying "The Enemy"?', options: [
                { text: 'The primary purpose is to explore multiple perspectives on the story\'s ethical dilemmas', outcome: 'The primary purpose is to explore multiple perspectives on the story\'s ethical dilemmas (e.g.' },
                { text: 'to memorize the plot', outcome: 'Not quite — Students think a discussion point is just "sharing opinions" and speak without textual evidence.', reveals: 'a-discussion-point-is-just' },
                { text: 'sharing opinions', outcome: 'Not quite — Students think a discussion point is just "sharing opinions" and speak without textual evidence.', reveals: 'a-discussion-point-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re a first-aid volunteer at a zonal tournament. An opposing team\'s player — who earlier got your teammate fouled out and is widely hated by your side — collapses near your post, bleeding and alone. Your teammates mutter \'let their own people handle him.\'',
            decisions: [{ prompt: 'What would Sadao\'s choice in \'The Enemy\' prescribe?', options: [
                { text: 'Treat him first and quietly — Sadao operates on the American POW because the surgeon\'s duty to a bleeding human overrides the wartime label \'enemy\'; afterwards you can let the officials sort out the politics, as Sadao lets the General\'s system handle the rest.', outcome: 'The story\'s climax is the surgery itself — \'My friend\' murmured to an enemy under the knife — and its resolution is deliberately quiet: doing the human thing without needing to be seen as a hero or a traitor.' },
                { text: 'Call his side\'s medical tent and wait — he\'s their responsibility.', outcome: 'That\'s the servants\' and Yumi\'s position in the story — the refusal that makes Sadao act alone; the chapter treats deferring to the group as the failure, not the safe middle path.', reveals: 'their-problem-not-mine' },
                { text: 'Treat him but report him to the organisers afterwards to stay safe.', outcome: 'That reverses the story\'s architecture — Sadao provides the boat and signal code instead of the General\'s assassins; the chapter\'s point is that professional mercy isn\'t complete until the person is out of danger, not merely bandaged.', reveals: 'mercy-then-report' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You can now hold an ethical dilemma inside its historical moment — and spot when a binary question is built to exclude the answer that matters.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves evaluating a text.',
          hint: 'If stuck, return to c12_eng_v_cbse_04_012 and practice writing three PEEL paragraphs.',
          misconception: 'Students often treat "The Enemy" as a simple "humanity wins" story, writing that Sadao\'s choice is obviously right.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis involves evaluating a text by questioning',
                  options: ['Critical thinking in literary analysis involves evaluating a text by questioning', 'The "Before You Read" context provides the historical, cultural, and ethical framework', 'Plot and narrative structure refers to the deliberate arrangement of story events', 'Setting in "The Enemy" refers to the specific time (World War II), place (Japanese'],
                  hint: 'If stuck, return to c12_eng_v_cbse_04_012 and practice writing three PEEL paragraphs linking.',
                  misconception: 'Students often treat "The Enemy" as a simple "humanity wins" story, writing that Sadao\'s choice is obviously right because saving life.' }
          ],
            remediations: { 'students-often-treat-the-enemy': { steps: ['If a student defaults to "humanity wins" simplification: (1) Have them re-read Sadao\'s internal monologue during the.', '(2) Ask: "If Sadao is so humanitarian, why does he call the prisoner \'my enemy\' and \'a common fellow\'?" (3) Assign.', '(4) Re-diagnose with Question 4: "Does the text support a clear moral victory, or does it document a man doing his job.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "The Enemy" as a simple "humanity wins" story, writing that Sadao\'s choice is obviously right.',
          parts: [
                { id: 'a', prompt: 'Evaluate the General\'s decision to send assassins rather than arrest Sadao. Is this an act of patriotism, self-preservation, or both?', answer: 'It is primarily self-preservation disguised as patriotism',
                  options: ['It is primarily self-preservation disguised as patriotism', 'patriotism'],
                  hint: 'If stuck, return to c12_eng_v_cbse_04_012 and practice writing three PEEL paragraphs linking.',
                  misconception: 'Students often treat "The Enemy" as a simple "humanity wins" story, writing that Sadao\'s choice is obviously right because saving life.' }
          ],
            remediations: { 'students-often-treat-the-enemy': { steps: ['If a student defaults to "humanity wins" simplification: (1) Have them re-read Sadao\'s internal monologue during the.', '(2) Ask: "If Sadao is so humanitarian, why does he call the prisoner \'my enemy\' and \'a common fellow\'?" (3) Assign.', '(4) Re-diagnose with Question 4: "Does the text support a clear moral victory, or does it document a man doing his job.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_014', difficulty: 'standard',
          question: 'Writing Skills based on "The Enemy" involves crafting structured.',
          hint: 'If unable to separate narration from analysis, revisit Class 11 Writing Skills nodes.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the story in essay/formal letter format.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Dr. Sadao is a good doctor because he saves the American soldier. He operates on him and removes the bullet.', answer: 'The response lacks PEEL structure',
                  options: ['The response lacks PEEL structure', 'writing skills based on the chapter'],
                  hint: 'If unable to separate narration from analysis, revisit Class 11 Writing Skills nodes.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the story in essay/formal letter format.' },
                { id: 'b', prompt: 'Compare two thesis statements for an essay on "The Enemy": (A) "Dr. Sadao saves an American soldier during WWII." (B) "In \'The Enemy,\' Pearl S.', answer: 'Thesis (B) is exam-appropriate',
                  options: ['Thesis (B) is exam-appropriate', 'writing skills based on the chapter'],
                  hint: 'If unable to separate narration from analysis, revisit Class 11 Writing Skills nodes.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the story in essay/formal letter format.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits plot summary instead of analysis: (1) Return the answer with two highlighters — yellow for "plot.', '(2) Give a 3-sentence model PEEL paragraph on the same point (e.g., Sadao\'s dilemma).', '(3) Have them rewrite *only one paragraph* using PEEL, swapping narration for analysis.', '(4) Assign a 150-word "theme + evidence" drill: pick one theme (prejudice, duty, humanity), find 3 textual moments.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to structured oral activities.',
          hint: 'If stuck, review c12_eng_v_cbse_04_013 (Critical Thinking) for modeled analytical.',
          misconception: 'Students think a discussion point is just "sharing opinions" and speak without textual evidence, treating the story.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Hana initially supports turning the soldier over but later helps wash and care for him.', answer: 'Hana shifts from fear of treason to compassion',
                  options: ['Hana shifts from fear of treason to compassion', 'she was forced by Sadao', 'sharing opinions'],
                  hint: 'If stuck, review c12_eng_v_cbse_04_013 (Critical Thinking) for modeled analytical paragraphs, then.',
                  misconception: 'Students think a discussion point is just "sharing opinions" and speak without textual evidence, treating the story as a debate topic.' }
          ],
            remediations: { 'a-discussion-point-is-just': { steps: ['If a student cannot anchor comments in the text: (1) Assign a specific passage (e.g., Sadao\'s conversation with the.', '(2) Practice "evidence sandwich" orally: Claim → Quote → Explanation.', '(3) Revisit c12_eng_v_cbse_04_013 (Critical Thinking) for interpretive models.', '(4) Re-diagnose with a focused question: "What line shows Sadao\'s internal conflict?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
