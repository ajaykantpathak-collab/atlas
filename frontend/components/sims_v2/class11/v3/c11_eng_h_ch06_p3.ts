import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch06_p3: SimDef = {
    id: 'v3_c11_eng_h_ch06_p3',
    title: 'The Browning Version · Part 3/3',
    subtitle: 'Unpack a title that names both a translation and a teacher\'s hardened soul.',
    classLevel: 11, subject: 'eng_h', topic: 'The Browning Version · Part 3/3',
    chapters: ['c11_eng_h_ch06'],
    nodeIds: ['c11_eng_h_cbse_06_013', 'c11_eng_h_cbse_06_014', 'c11_eng_h_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a director staging a one-act play in one room', intro: 'A boy waits for a master who will never arrive — and forty compressed minutes expose twenty years of disappointment.', goal: 'Interpret the play\'s layered title and analyse how dramatic structure works through speech acts.' },
    discovery: {
        question: 'Why is the play called \'The Browning Version\'? It can\'t only be about a Greek translation.',
        options: ['It works three ways — Browning\'s Agamemnon is Crocker-Harris\'s project, and he himself is a \'browned\' version of a teacher, dried hard by disappointment', 'It refers only to the book Taplow gifts him', 'Browning wrote the play under a pseudonym', 'It is the school\'s motto, borrowed from Browning'],
        answer: 'It works three ways — Browning\'s Agamemnon is Crocker-Harris\'s project, and he himself is a \'browned\' version of a teacher, dried hard by disappointment',
        hook: 'The gift lands because the title was always about him — a man translated into a harder version of himself, finally read kindly.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Browning Version\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_06_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track how a single room, a few visitors and some dialogue build a lifetime of failure — then place the true climax: the gift, or the final speech.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Browning Version\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the primary function of dramatic irony in *The Browning Version*?', options: [
                { text: 'Dramatic irony occurs when the audience knows more than a character—here, we understand', outcome: 'Dramatic irony occurs when the audience knows more than a character—here, we understand.' },
                { text: 'it makes the play funny', outcome: 'Not quite — Students often treat Crocker-Harris as a one-dimensional "strict teacher" caricature, citing his.', reveals: 'students-often-treat-crocker-harris' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Browning Version\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the PEEL structure and why is it used in writing analytical answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. It is used to structure analytical paragraphs.' },
                { text: 'PEEL is a fruit', outcome: 'Not quite — Students often think "writing skills based on the chapter" means summarizing the plot or writing.', reveals: 'writing-skills-based-on-the' },
                { text: 'It means writing a summary', outcome: 'Not quite — Students often think "writing skills based on the chapter" means summarizing the plot or writing.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Browning Version\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of a structured group discussion on a literary text like *The Browning Version* in the CBSE Class 11 speaking.', options: [
                { text: 'The primary purpose is to evaluate', outcome: 'The primary purpose is to evaluate a student\'s ability to collaboratively construct meaning.' },
                { text: 'to prove who read the play', outcome: 'Not quite — Students believe a "good discussion" means speaking the most, using sophisticated vocabulary,.', reveals: 'a-good-discussion-means-speaking' },
                { text: 'to summarise the plot', outcome: 'Not quite — Students believe a "good discussion" means speaking the most, using sophisticated vocabulary,.', reveals: 'a-good-discussion-means-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For the school\'s drama fest you\'re directing a scene from \'The Browning Version\'. The actor playing Crocker-Harris asks: \'Why should I care that this is a 1940s British public school or that Rattigan lived a double life? Lines are lines — just tell me where to stand.\'',
            decisions: [{ prompt: 'Why does that context matter to the performance?', options: [
                { text: 'Because context is the interpretive lens, not trivia: 1940s public-school hierarchy explains why the classics master must perform emotional armour, and Rattigan\'s own repressed life in a criminalising era illuminates why Crocker-Harris cannot accept Taplow\'s small act of affection. The facts answer \'so what does he hide and why\'.', outcome: 'Learn context FOR the play, not ABOUT it: every fact earns its place only when it changes how a line is played.' },
                { text: 'The actor is right — biography and period details are exam trivia, irrelevant to delivering lines.', outcome: 'Flat delivery results: without the era\'s emotional repression, Taplow\'s gift reads as a minor prop instead of the play\'s seismic moment of being \'seen\'.', reveals: 'context-is-trivia' },
                { text: 'Update the scene to a modern Indian school — context is replaceable and the emotion stays identical.', outcome: 'The emotional logic isn\'t portable: forced retirement, classics\' decline and institutional coldness in 1948 Britain are the machinery producing his despair.', reveals: 'context-is-replaceable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'In a one-act play, structure is character — every entrance forces someone to reveal what they\'d rather hide.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Browning Version\' — analysing the text to reach.',
          hint: 'Review the "off-stage presence" technique in *The Proposal* (c10_engl_cbse_09_001) and.',
          misconception: 'Students often treat Crocker-Harris as a one-dimensional "strict teacher" caricature, citing his classical references.',
          parts: [
                { id: 'a', prompt: 'Compare the two "versions" of Agamemnon in the play: Taplow\'s enthusiastic Greek reading versus Crocker-Harris\'s literal translation.', answer: 'Taplow engages emotionally with the original—feeling the "terrific" rhythm—while',
                  options: ['Taplow engages emotionally with the original—feeling the "terrific" rhythm—while', 'teaching methods'],
                  hint: 'Review the "off-stage presence" technique in *The Proposal* (c10_engl_cbse_09_001) and *The Book.',
                  misconception: 'Students often treat Crocker-Harris as a one-dimensional "strict teacher" caricature, citing his classical references and rigid rules.' }
          ],
            remediations: { 'students-often-treat-crocker-harris': { steps: ['Re-read the aspirin scene (Crocker-Harris taking pills with trembling hands) and ask: "What does this physical detail.', 'List every time a character *describes* Crocker-Harris vs.', 'every time he *speaks for himself*—note the gap.', 'Watch a 5-minute clip of a staged production (YouTube: "The Browning Version 1994 Ian Holm") focusing on the actor\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_014', difficulty: 'standard',
          question: 'Writing skills from \'The Browning Version\' — using the text as a model.',
          hint: 'If stuck, review c11_eng_h_cbse_06_004 (Character Analysis: Protagonist) and.',
          misconception: 'Students often think "writing skills based on the chapter" means summarizing the plot or writing a book review.',
          parts: [
                { id: 'a', prompt: 'What is the PEEL structure and why is it used in writing analytical answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'PEEL is a fruit', 'It means writing a summary', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_h_cbse_06_004 (Character Analysis: Protagonist) and c11_eng_h_cbse_06_006.',
                  misconception: 'Students often think "writing skills based on the chapter" means summarizing the plot or writing a book review.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student produces a summary or personal narrative instead of an analytical response: (1) Show them a side-by-side.', 'a PEEL paragraph on the same trait.', '(2) Highlight the three missing components: Evidence (quote), Explanation (analysis), Link (theme).', '(3) Give them a trait (e.g., "Crocker-Harris is principled") and ask them to find ONE quote from the play that proves.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "writing skills based on the chapter" means summarizing the plot or writing a book review.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Writing a formal letter from Taplow to the headmaster complaining about Crocker-Harris would be an appropriate writing task for this.', answer: 'Inappropriate',
                  options: ['Inappropriate', 'yes, because it\'s a formal letter practice', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_h_cbse_06_004 (Character Analysis: Protagonist) and c11_eng_h_cbse_06_006.',
                  misconception: 'Students often think "writing skills based on the chapter" means summarizing the plot or writing a book review.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student produces a summary or personal narrative instead of an analytical response: (1) Show them a side-by-side.', 'a PEEL paragraph on the same trait.', '(2) Highlight the three missing components: Evidence (quote), Explanation (analysis), Link (theme).', '(3) Give them a trait (e.g., "Crocker-Harris is principled") and ask them to find ONE quote from the play that proves.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_015', difficulty: 'standard',
          question: 'Discussion points on \'The Browning Version\' — speaking and listening around the.',
          hint: 'If stuck, revisit c11_eng_h_cbse_06_013 (Critical Thinking) to rebuild interpretive.',
          misconception: 'Students believe a "good discussion" means speaking the most, using sophisticated vocabulary, or reaching a single.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a structured group discussion on a literary text like *The Browning Version* in the CBSE Class 11 speaking and listening.', answer: 'The primary purpose is to evaluate',
                  options: ['The primary purpose is to evaluate', 'to prove who read the play', 'to summarise the plot', 'good discussion'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_06_013 (Critical Thinking) to rebuild interpretive claims, and.',
                  misconception: 'Students believe a "good discussion" means speaking the most, using sophisticated vocabulary, or reaching a single correct answer.' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['**Model exploratory talk**: Play a 2-minute audio of a strong student discussion (teacher-recorded or from CBSE.', 'Pause every 30 seconds; ask: "What move did Speaker A just make?', 'How did Speaker B respond?" 2.', '**Micro-practice**: In pairs, give students one prompt ("Why does Taplow return?") and 3 minutes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
