import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch06_p3: SimDef = {
    id: 'v3_c12_eng_f_ch06_p3',
    title: 'Poets and Pancakes · Part 3/3',
    subtitle: 'Truckloads of make-up and a poet nobody understood',
    classLevel: 12, subject: 'eng_f', topic: 'Poets and Pancakes · Part 3/3',
    chapters: ['c12_eng_f_ch06'],
    nodeIds: ['c12_eng_f_cbse_06_013', 'c12_eng_f_cbse_06_014', 'c12_eng_f_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cultural satirist', intro: 'A clerk files newspaper cuttings at India\'s biggest film studio — and quietly writes its sharpest satire.', goal: 'Situate Poets and Pancakes in its 1950s film-studio world and decode its irony-laden portrait of literary pretension.' },
    discovery: {
        question: 'Gemini Studios\' make-up room was run by a Bengali, a Maharashtrian, a Kannadiga, an Andhra, a Christian, an Anglo-Burmese and Tamils — \'national integration,\' the author says, in a department that turns people into \'hideous crimson monsters.\' What\'s the joke really doing?',
        options: ['Satirising idealism — unity achieved not by policy but inside a department whose job is disguise; the satire lands through the contrast', 'Praising the government\'s integration programmes', 'Just describing staff diversity factually', 'Mocking South Indian actors specifically'],
        answer: 'Satirising idealism — unity achieved not by policy but inside a department whose job is disguise; the satire lands through the contrast',
        hook: 'Every detail in this memoir is irony under a flat tone — a failed-actor office boy lecturing a real writer about \'wasted talent\', truckloads of Pancake, a visiting English poet nobody understood. Context turns confusion into comedy; miss the era and the jokes evaporate.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Poets and Pancakes\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_06_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Go behind the scenes of 1950s Gemini Studios: place the Pancake make-up, the MRA visit and the office boy\'s ambitions in their Congress-era, khadi-clad milieu — and read Asokamitran\'s straight-faced satire.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Poets and Pancakes\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the narrative style of "Poets and Pancakes" as explicitly described in the NCERT textbook\'s "Noticing transitions" section?', options: [
                { text: 'The narrative style is described as "a chatty, rambling style', outcome: 'The narrative style is described as "a chatty, rambling style.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often equate "critical thinking" with finding faults or writing a negative review of the.', reveals: 'students-often-equate-critical-thinking' },
                { text: 'strictly chronological', outcome: 'Not quite — Students often equate "critical thinking" with finding faults or writing a negative review of the.', reveals: 'students-often-equate-critical-thinking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Poets and Pancakes\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the primary structural feature of Asokamitran\'s "chatty, rambling style" as described in the "Noticing transitions" section of the.', options: [
                { text: 'The primary structural feature is associative transitions: one thought leads to another', outcome: 'The primary structural feature is associative transitions: one thought leads to another which.' },
                { text: 'chronological order', outcome: 'Not quite — Students think "rambling style" means *unstructured* or *random* writing.', reveals: 'rambling-style-means-unstructured-or' },
                { text: 'logical argument', outcome: 'Not quite — Students think "rambling style" means *unstructured* or *random* writing.', reveals: 'rambling-style-means-unstructured-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Poets and Pancakes\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the three discussion topics explicitly listed in the NCERT "Talking about the text" section for "Poets and Pancakes"?', options: [
                { text: 'The three topics are: (1) Film-production today has come a long way from the early days', outcome: 'The three topics are: (1) Film-production today has come a long way from the early days of the.' },
                { text: 'character analysis', outcome: 'Not quite — Students think "Speaking and Listening: Discussion Points" means memorising answers to the three.', reveals: 'speaking-and-listening-discussion-points' },
                { text: 'theme identification', outcome: 'Not quite — Students think "Speaking and Listening: Discussion Points" means memorising answers to the three.', reveals: 'speaking-and-listening-discussion-points' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'On a film-set internship you watch one staffer quietly solve everyone\'s crises — scripts, schedules, egos — while credits and praise flow to others. As the team lead you can act.',
            decisions: [{ prompt: 'What\'s the fair call?', options: [
                { text: 'Name his contribution and formalise the role — Subbu at Gemini Studios in \'Poets and Pancakes\' shows how indispensable problem-solvers get consumed while staying invisible.', outcome: 'Asokamitran\'s satire lands here: institutions run on unacknowledged fixers, and fairness means making that labour seen.' },
                { text: 'Keep loading him — someone that useful doesn\'t need titles.', outcome: 'That\'s exactly how studios spent Subbu; usefulness without recognition is quiet exploitation.', reveals: 'utility-equals-value' },
                { text: 'Resent him — he must be angling for the boss\'s chair.', outcome: 'The office-poet jealousy in the story shows how suspicion of a capable colleague says more about the insecure observer.', reveals: 'competence-read-as-threat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You can now hear the joke under the deadpan — context is the punchline. This chapter trains the rarest reading skill: detecting irony without a single wink.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_013', difficulty: 'standard',
          question: 'Critical thinking on \'Poets and Pancakes\' — analysing the text to reach.',
          hint: 'If stuck, review the "Noticing transitions" section in the NCERT textbook and the.',
          misconception: 'Students often equate "critical thinking" with finding faults or writing a negative review of the text.',
          parts: [
                { id: 'a', prompt: 'What is the narrative style of "Poets and Pancakes" as explicitly described in the NCERT textbook\'s "Noticing transitions" section?', answer: 'The narrative style is described as "a chatty, rambling style',
                  options: ['The narrative style is described as "a chatty, rambling style', 'A wrong answer (e.g', 'strictly chronological'],
                  hint: 'If stuck, review the "Noticing transitions" section in the NCERT textbook and the author\'s comment.',
                  misconception: 'Students often equate "critical thinking" with finding faults or writing a negative review of the text.' }
          ],
            remediations: { 'students-often-equate-critical-thinking': { steps: ['If the student falls into this misconception, direct them to the NCERT "Understanding the text" Question 1: "The author.', 'Pick out instances..." Have them list three humorous passages and for each write: (a) what is the surface joke, (b).', 'Then re-attempt Diagnostic Question 3 with this three-step framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_014', difficulty: 'standard',
          question: 'Writing skills from \'Poets and Pancakes\' — using the text as a model.',
          hint: 'If stuck on transitions, re-read the "Noticing transitions" box and the first two.',
          misconception: 'Students think "rambling style" means *unstructured* or *random* writing.',
          parts: [
                { id: 'a', prompt: 'Explain how the author uses "gentle humour" to criticize the office boy\'s frustration without making him a villain.', answer: 'The author frames the office boy\'s lectures as "epics" he prays to avoid via',
                  options: ['The author frames the office boy\'s lectures as "epics" he prays to avoid via', 'the office boy is jealous', 'Nothing short of it could save me', 'rambling style'],
                  hint: 'If stuck on transitions, re-read the "Noticing transitions" box and the first two paragraphs of the.',
                  misconception: 'Students think "rambling style" means *unstructured* or *random* writing.' }
          ],
            remediations: { 'rambling-style-means-unstructured-or': { steps: ['Re-read the "Noticing transitions" box in the textbook; map the exact chain: Make-up dept → Office-boy → Subbu → Legal.', 'Practice *one* transition drill: Take a character trait (e.g., "collects calendar art") → free-associate 3 links.', 'Revisit **c12_eng_f_cbse_06_009** (Irony and Symbolism) to distinguish gentle irony from sarcasm.', 'Re-diagnostic: Write a 100-word sketch of a "Tuition Teacher Uncle" using the mapped chain technique; check for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "rambling style" means *unstructured* or *random* writing.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student sentence for a rambling-style sketch: "My neighbour Mrs.', answer: 'It fails because: (1) It uses a flat "but" instead of a digressive transition',
                  options: ['It fails because: (1) It uses a flat "but" instead of a digressive transition', 'rambling style', 'I was praying for crowd-shooting', '"rambling style" means *unstructured* or *random* writing'],
                  hint: 'If stuck on transitions, re-read the "Noticing transitions" box and the first two paragraphs of the.',
                  misconception: 'Students think "rambling style" means *unstructured* or *random* writing.' },
                { id: 'b', prompt: 'Create a 4-sentence rambling paragraph about a fictional "Yoga Auntie" who teaches "Laughter Yoga" but screams at her maid for breaking a cup.', answer: '**Criteria for good answer:** 1',
                  options: ['**Criteria for good answer:** 1', 'rambling style', 'I was praying for crowd-shooting', '"rambling style" means *unstructured* or *random* writing'],
                  hint: 'If stuck on transitions, re-read the "Noticing transitions" box and the first two paragraphs of the.',
                  misconception: 'Students think "rambling style" means *unstructured* or *random* writing.' }
          ],
            remediations: { 'rambling-style-means-unstructured-or': { steps: ['Re-read the "Noticing transitions" box in the textbook; map the exact chain: Make-up dept → Office-boy → Subbu → Legal.', 'Practice *one* transition drill: Take a character trait (e.g., "collects calendar art") → free-associate 3 links.', 'Revisit **c12_eng_f_cbse_06_009** (Irony and Symbolism) to distinguish gentle irony from sarcasm.', 'Re-diagnostic: Write a 100-word sketch of a "Tuition Teacher Uncle" using the mapped chain technique; check for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_015', difficulty: 'standard',
          question: 'Discussion points on \'Poets and Pancakes\' — speaking and listening around the.',
          hint: 'If stuck, review the "Talking about the text" section in the textbook and the critical.',
          misconception: 'Students think "Speaking and Listening: Discussion Points" means memorising answers to the three NCERT questions and.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the author calls the Gemini Studios "the favourite haunt of poets" and how this relates to the discussion point "Poetry and.', answer: 'The author describes Gemini Studios as a place where poets like S.D.S',
                  options: ['The author describes Gemini Studios as a place where poets like S.D.S', 'poets visited the studio', 'Speaking and Listening: Discussion Points'],
                  hint: 'If stuck, review the "Talking about the text" section in the textbook and the critical thinking.',
                  misconception: 'Students think "Speaking and Listening: Discussion Points" means memorising answers to the three NCERT questions and reciting them.' },
                { id: 'b', prompt: 'You are leading a group discussion on "Humour and criticism." A peer says, "The chapter is just funny; there\'s no real criticism." Using two specific examples.', answer: 'Step 1: Identify the claim',
                  options: ['Step 1: Identify the claim', 'Speaking and Listening: Discussion Points'],
                  hint: 'If stuck, review the "Talking about the text" section in the textbook and the critical thinking.',
                  misconception: 'Students think "Speaking and Listening: Discussion Points" means memorising answers to the three NCERT questions and reciting them.' },
                { id: 'c', prompt: 'Compare the film-production technology described in the chapter (incandescent lights, pancake make-up, indoor shooting, hierarchy in make-up department) with.', answer: 'Step 1: List two old practices',
                  options: ['Step 1: List two old practices', 'Speaking and Listening: Discussion Points'],
                  hint: 'If stuck, review the "Talking about the text" section in the textbook and the critical thinking.',
                  misconception: 'Students think "Speaking and Listening: Discussion Points" means memorising answers to the three NCERT questions and reciting them.' }
          ],
            remediations: { 'speaking-and-listening-discussion-points': { steps: ['Revisit the "Talking about the text" section in the textbook and identify the three discussion points.', 'Watch a 5-minute video of a model ASL group discussion (search "CBSE ASL group discussion sample") and note how.', 'Practice with a peer: set a timer for 4 minutes, discuss one point, then swap roles and summarise each other\'s.', 'If stuck on textual evidence, return to nodes c12_eng_f_cbse_06_002 (Plot) and c12_eng_f_cbse_06_006 (Primary Theme).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
