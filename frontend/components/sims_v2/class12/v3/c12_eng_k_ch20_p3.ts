import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch20_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch20_p3: SimDef = {
    id: 'v3_c12_eng_k_ch20_p3',
    title: 'The Open Window (Drama) · Part 3/3',
    subtitle: 'She was told she was human — and tried to own the man who said it',
    classLevel: 12, subject: 'eng_k', topic: 'The Open Window (Drama) · Part 3/3',
    chapters: ['c12_eng_k_ch20'],
    nodeIds: ['c12_eng_k_cbse_20_013', 'c12_eng_k_cbse_20_014', 'c12_eng_k_cbse_20_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Drama scholar', intro: 'A Buddhist legend, a Nobel poet\'s scalpel, and a question nobody asks: what happens the day after liberation?', goal: 'Read Chandalika as a tragedy of awakened selfhood — where liberation overshoots into possessiveness.' },
    discovery: {
        question: 'Ananda asks an \'untouchable\' girl for water; she tastes equality for the first time — then uses her mother\'s magic to bind him. Is Chandalika a social reform play?',
        options: ['It\'s a tragedy of self-consciousness — Prakriti\'s liberation is real, but a newly awakened self can\'t yet tell love from possession', 'Yes — caste is wrong, end of story', 'No — it\'s a romance', 'It\'s about Buddhist magic'],
        answer: 'It\'s a tragedy of self-consciousness — Prakriti\'s liberation is real, but a newly awakened self can\'t yet tell love from possession',
        hook: 'Tagore rewrote a crude legend of magic and lust into \'a psychological drama of intense spiritual conflict.\' Prakriti — named for nature\'s raw life-force — gets her humanity in Act I; Act II is the danger: freedom that hasn\'t learned to love without grasping. Self-humiliation, he wrote, is a sin worse than self-murder.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis refers to the disciplined process of actively examining, questioning, and evaluating a dramatic text to uncover deeper meanings, assess authorial choices, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_20_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stage the collision: weigh the earth-spell against the monk\'s sadhana, track how gratitude curdles into possession, and judge who pays the price of a consciousness that overreached.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re watching Chandalika performed on stage: Prakriti sits by the well, the Mother chants spells, a mirror reflects a monk\'s agony miles away.',
            decisions: [{ prompt: 'What is the central dramatic irony in Act I of Chandalika regarding Prakriti\'s understanding of Ananda\'s "Give me water"?', options: [
                { text: 'The dramatic irony is that Prakriti interprets Ananda\'s request for water as a personal', outcome: 'The dramatic irony is that Prakriti interprets Ananda\'s request for water as a personal call and.' },
                { text: 'his word was given', outcome: 'Not quite — Students often read Prakriti\'s desire for Ananda as simple romantic/sexual lust, citing lines like.', reveals: 'students-often-read-prakriti-s' },
                { text: 'passes by without recognising her', outcome: 'Not quite — Students often read Prakriti\'s desire for Ananda as simple romantic/sexual lust, citing lines like.', reveals: 'students-often-read-prakriti-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you face this board question: *"How does Tagore use the mirror as a dramatic device to reveal Prakriti’s inner turmoil?"* Most students freeze because.',
            decisions: [{ prompt: 'Identify the four components of the PEEL structure used for writing analytical answers in Class 12 English.', options: [
                { text: 'PEEL stands for Point (topic sentence stating the argument), Evidence (textual quote or', outcome: 'PEEL stands for Point (topic sentence stating the argument), Evidence (textual quote or reference).' },
                { text: 'Plot, Event, Emotion, Lesson', outcome: 'Not quite — Students believe a "good answer" for *Chandalika* means quoting long passages from the play.', reveals: 'a-good-answer-for-chandalika' },
                { text: 'good answer', outcome: 'Not quite — Students believe a "good answer" for *Chandalika* means quoting long passages from the play.', reveals: 'a-good-answer-for-chandalika' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a college seminar where everyone has read "Chandalika" and the professor asks: "Why does Prakriti\'s \'new birth\' lead to tragedy?" You need.',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion in a Class 12 English classroom?', options: [
                { text: 'The primary purpose is to collaboratively explore the text\'s meanings by sharing', outcome: 'The primary purpose is to collaboratively explore the text\'s meanings by sharing interpretations.' },
                { text: 'to prove the teacher\'s interpretation is correct', outcome: 'Not quite — Students often think a literary discussion is about sharing personal opinions ("I feel Prakriti was.', reveals: 'a-literary-discussion-is-about' },
                { text: 'I feel Prakriti was wrong to use magic', outcome: 'Not quite — Students often think a literary discussion is about sharing personal opinions ("I feel Prakriti was.', reveals: 'a-literary-discussion-is-about' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A long-excluded teammate is suddenly given real authority on the project — and immediately uses it to control and belittle the others.',
            decisions: [{ prompt: 'What does Tagore\'s Chandalika caution?', options: [
                { text: 'That being recognised as human and learning to wield freedom are different steps — Prakriti\'s awakening curdles into possessive power because liberation arrived without maturity; coach her, don\'t just crown or strip her.', outcome: 'The play\'s tragedy is the gap between dignity granted and self-command learned — neither pure empowerment nor revoked authority is the answer.' },
                { text: 'Empowerment alone was the fix — oppression ends the moment power changes hands.', outcome: 'Act II exists precisely to disprove that; freedom without maturity can reproduce the very domination it escaped.', reveals: 'recognition-equals-maturity' },
                { text: 'Take the authority back — this proves the marginalised can\'t handle power.', outcome: 'Tagore\'s point is the opposite: it\'s the long denial of humanity that deforms the first use of it, not unfitness.', reveals: 'failure-proves-unfitness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_015', title: 'You made it',
          caseStudy: { intro: 'You can now read the play past its \'caste reform\' surface into Tagore\'s real subject — the dangerous adolescence of a newly freed self.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis refers to the disciplined process.',
          hint: 'If stuck, return to c12_eng_k_cbse_20_009 (Irony and Symbolism) and re-analyse the.',
          misconception: 'Students often read Prakriti\'s desire for Ananda as simple romantic/sexual lust, citing lines like "I want him beyond.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Prakriti says "A religion that insults is a false religion" and how this statement redefines her relationship to caste hierarchy.', answer: 'Prakriti rejects the religious sanction of untouchability',
                  options: ['Prakriti rejects the religious sanction of untouchability', 'She becomes an atheist', 'even my service will count with the God who guides the world'],
                  hint: 'If stuck, return to c12_eng_k_cbse_20_009 (Irony and Symbolism) and re-analyse the well-water and.',
                  misconception: 'Students often read Prakriti\'s desire for Ananda as simple romantic/sexual lust, citing lines like "I want him beyond all measure" and the.' },
                { id: 'b', prompt: 'Apply the concept of "tragic flaw" (hamartia) to Prakriti: identify her flaw, trace its origin in her social conditioning, and show how it drives the.', answer: 'Step 1: Identify flaw',
                  options: ['Step 1: Identify flaw', 'Her flaw is lust', 'it was inevitable that it should be so'],
                  hint: 'If stuck, return to c12_eng_k_cbse_20_009 (Irony and Symbolism) and re-analyse the well-water and.',
                  misconception: 'Students often read Prakriti\'s desire for Ananda as simple romantic/sexual lust, citing lines like "I want him beyond all measure" and the.' }
          ],
            remediations: { 'students-often-read-prakriti-s': { steps: ['If a student reduces Prakriti\'s desire to lust: (1) Have them re-read the Introduction\'s transformation statement.', 'transformed into a psychological drama of intense spiritual conflict").', '(2) Ask: "Why does Prakriti call Ananda \'my redeemer\' and \'my creator\' — what did he *create*?" (3) Direct them.', '(4) Assign a comparative writing task: "Contrast the Buddhist legend\'s \'lust of a chandal girl\' with Tagore\'s \'tragedy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_014', difficulty: 'standard',
          question: 'Writing skills for *Chandalika* refer to the ability to compose structured.',
          hint: 'If stuck, revisit c12_eng_k_cbse_20_013 (Critical Thinking) to refresh theme/device.',
          misconception: 'Students believe a "good answer" for *Chandalika* means quoting long passages from the play.',
          parts: [
                { id: 'a', prompt: 'Compare the dramatic function of the *chant* (Buddhist mantra) and the *spell* (Mother’s magic) in *Chandalika*.', answer: 'The Buddhist chant ("*Buddho Susuddho karuna mahannvo...*") represents ordered,',
                  options: ['The Buddhist chant ("*Buddho Susuddho karuna mahannvo...*") represents ordered,', 'good answer', 'a "good answer" for *Chandalika* means quoting long passages from the play'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_20_013 (Critical Thinking) to refresh theme/device inventory, then.',
                  misconception: 'Students believe a "good answer" for *Chandalika* means quoting long passages from the play.' }
          ],
            remediations: { 'a-good-answer-for-chandalika': { steps: ['If a student cannot distinguish summary from analysis, do this 15-minute drill: (1) Give them a 5-sentence plot summary.', '(2) Ask them to highlight every sentence that *interprets* rather than *narrates* — there will be zero.', '(3) Show a model PEEL paragraph on the same scene.', '(4) Have them convert one summary sentence into a Point+Evidence+Explanation triplet.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a "good answer" for *Chandalika* means quoting long passages from the play.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: *"Prakriti’s final words \'Victory, victory to thee, O Lord!\' show she has completely overcome her ego and achieved true.', answer: 'The claim is partially true but oversimplified',
                  options: ['The claim is partially true but oversimplified', 'good answer', 'a "good answer" for *Chandalika* means quoting long passages from the play'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_20_013 (Critical Thinking) to refresh theme/device inventory, then.',
                  misconception: 'Students believe a "good answer" for *Chandalika* means quoting long passages from the play.' }
          ],
            remediations: { 'a-good-answer-for-chandalika': { steps: ['If a student cannot distinguish summary from analysis, do this 15-minute drill: (1) Give them a 5-sentence plot summary.', '(2) Ask them to highlight every sentence that *interprets* rather than *narrates* — there will be zero.', '(3) Show a model PEEL paragraph on the same scene.', '(4) Have them convert one summary sentence into a Point+Evidence+Explanation triplet.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to structured oral activities.',
          hint: 'If stuck, revisit c12_eng_k_cbse_20_013 (Critical Thinking) for analytical frameworks and.',
          misconception: 'Students often think a literary discussion is about sharing personal opinions ("I feel Prakriti was wrong to use.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a literary discussion in a Class 12 English classroom?', answer: 'The primary purpose is to collaboratively explore the text\'s meanings by sharing',
                  options: ['The primary purpose is to collaboratively explore the text\'s meanings by sharing', 'to prove the teacher\'s interpretation is correct', 'I feel Prakriti was wrong to use magic', 'expressing feelings'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_20_013 (Critical Thinking) for analytical frameworks and.',
                  misconception: 'Students often think a literary discussion is about sharing personal opinions ("I feel Prakriti was wrong to use magic") without anchoring.' },
                { id: 'b', prompt: 'During a discussion, a classmate claims: "The mother\'s magic is just a plot device to bring Ananda to the house." Using two specific textual details, how would.', answer: 'Step 1: Acknowledge the classmate\'s point',
                  options: ['Step 1: Acknowledge the classmate\'s point', 'I disagree', 'I feel Prakriti was wrong to use magic', 'expressing feelings'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_20_013 (Critical Thinking) for analytical frameworks and.',
                  misconception: 'Students often think a literary discussion is about sharing personal opinions ("I feel Prakriti was wrong to use magic") without anchoring.' }
          ],
            remediations: { 'a-literary-discussion-is-about': { steps: ['If a student falls into this misconception, do this 3-step remediation: 1) Show a 2-minute video of a model literary.', '2) Give the student a "Discussion Evidence Card" with three columns: My Point | Textual Quote | Page/Act.', 'Have them fill it for one theme before the next discussion.', '3) In the next practice discussion, assign them the role of "Evidence Monitor" — they must note whether each speaker.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
