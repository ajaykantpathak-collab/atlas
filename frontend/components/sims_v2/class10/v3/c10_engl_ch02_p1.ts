import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch02_p1: SimDef = {
    id: 'v3_c10_engl_ch02_p1',
    title: 'Nelson Mandela: Long Walk to Freedom · Part 1/2',
    subtitle: 'Walk out of apartheid\'s cage into a rainbow nation\'s first morning',
    classLevel: 10, subject: 'engl', topic: 'Nelson Mandela: Long Walk to Freedom · Part 1/2',
    chapters: ['c10_engl_ch02'],
    nodeIds: ['c10_engl_cbse_02_001', 'c10_engl_cbse_02_002', 'c10_engl_cbse_02_003', 'c10_engl_cbse_02_004', 'c10_engl_cbse_02_005', 'c10_engl_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a journalist covering 10 May 1994 at the Union Buildings', intro: 'For decades your skin decided your school, your bench, your bus. On one May morning in Pretoria, that entire system bowed to a man it had imprisoned for 27 years.', goal: 'Explain apartheid as a legal-bureaucratic system and read the inauguration as a national ritual of reconciliation.' },
    discovery: {
        question: 'At Mandela\'s 1994 inauguration, the military generals who once would have arrested him now saluted him — and two national anthems played, one for each community. Why sing BOTH anthems?',
        options: ['It was a deliberate act of reconciliation — no group\'s identity was erased in the new nation', 'It was just ceremony — extra songs to fill the program', 'The organisers couldn\'t decide which anthem to keep', 'One anthem was for Mandela, the other for the outgoing president'],
        answer: 'It was a deliberate act of reconciliation — no group\'s identity was erased in the new nation',
        hook: 'That day wasn\'t only about one man\'s freedom — it was a whole country performing a new idea: that the oppressor and the oppressed could belong to the same anthem.',
    },
    teaching: [
        { title: 'Apartheid in South Africa: Background and Racial Segregation', text: 'Apartheid was a system of institutionalized racial segregation and discrimination enforced by the National Party government in South Africa from 1948 to 1994, which classified all inhabitants into.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct the machinery of apartheid — the acts that assigned race, controlled movement, and dictated where people could exist — then weigh what the inauguration dismantled.',
        labels: ['Apartheid in South Africa', 'Mandela\'s Inauguration as South', 'The Rainbow Gathering', 'Mandela\'s Struggle: 30 Years', 'The Twin Obligations: Obligation', 'The Meaning of Freedom'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_001', title: 'Apartheid in South Africa: Background and Racial Segregation',
          caseStudy: { intro: 'Imagine you are a 15-year-old in 1980s South Africa: your school, hospital, park bench, and even the bus you ride are decided not by your choice but by the.',
            decisions: [{ prompt: 'Name the four official racial categories created by the Population Registration Act of 1950 under apartheid.', options: [
                { text: 'The four categories were White, Black (referred to as "Bantu" or "Native" in', outcome: 'The four categories were White, Black (referred to as "Bantu" or "Native" in legislation), Coloured.' },
                { text: 'African', outcome: 'Not quite — Students often think apartheid was only about "separate facilities" (benches, beaches, buses) —.', reveals: 'apartheid-was-only-about-separate' },
                { text: 'separately, or adding', outcome: 'Not quite — Students often think apartheid was only about "separate facilities" (benches, beaches, buses) —.', reveals: 'apartheid-was-only-about-separate' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_002', title: 'Mandela\'s Inauguration as South Africa\'s First Black President',
          caseStudy: { intro: 'Imagine you are a journalist assigned to cover the most important day in South Africa\'s history — 10 May 1994.',
            decisions: [{ prompt: 'What was the exact date and venue of Nelson Mandela\'s inauguration as South Africa\'s first Black President?', options: [
                { text: 'The inauguration took place on **10 May 1994** at the **Union Buildings in Pretoria**', outcome: 'The inauguration took place on **10 May 1994** at the **Union Buildings in Pretoria**.' },
                { text: 'Cape Town', outcome: 'Not quite — **Misconception:** "The inauguration was mainly about Mandela becoming President — the anthems and.', reveals: 'misconception-the-inauguration-was-mainly' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_003', title: 'The Rainbow Gathering of Nations at the Inauguration',
          caseStudy: { intro: 'Imagine you\'re watching a live broadcast of a historic moment — the first time a Black president takes oath in a country that legally oppressed Black people.',
            decisions: [{ prompt: 'What is the literal meaning of "rainbow gathering of nations" in the context of Mandela\'s inauguration?', options: [
                { text: 'The literal meaning is the assembly of leaders and dignitaries from over 140 countries of', outcome: 'The literal meaning is the assembly of leaders and dignitaries from over 140 countries of diverse.' },
                { text: 'it means a colorful parade', outcome: 'Not quite — Students often think "rainbow gathering" only refers to racial diversity among the attendees.', reveals: 'rainbow-gathering-only-refers-to' },
                { text: 'it refers to the ANC flag', outcome: 'Not quite — Students often think "rainbow gathering" only refers to racial diversity among the attendees.', reveals: 'rainbow-gathering-only-refers-to' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_004', title: 'Mandela\'s Struggle: 30 Years in Prison and the ANC Movement',
          caseStudy: { intro: 'Imagine you are a student activist in 1980s South Africa: you\'ve heard Mandela\'s name whispered as a symbol, but you\'ve never seen his face.',
            decisions: [{ prompt: 'What was the name of the trial where Nelson Mandela and other ANC leaders were sentenced to life imprisonment in 1964?', options: [
                { text: 'The Rivonia Trial', outcome: 'The Rivonia Trial. A wrong answer (e.g., "Treason Trial" or "Sharpeville Trial") reveals the.' },
                { text: 'Treason Trial', outcome: 'Not quite — Students often treat Mandela\'s imprisonment as a passive "waiting period" and write answers like.', reveals: 'students-often-treat-mandela-s' },
                { text: 'Sharpeville Trial', outcome: 'Not quite — Students often treat Mandela\'s imprisonment as a passive "waiting period" and write answers like.', reveals: 'students-often-treat-mandela-s' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_005', title: 'The Twin Obligations: Obligation to Family vs Obligation to People',
          caseStudy: { intro: 'Imagine you are a Class 10 student whose parents want you to take over the family shop, but you feel a strong pull to volunteer for a community cleanup drive.',
            decisions: [{ prompt: 'What are the two specific obligations Mandela identifies as the "twin obligations" in the chapter?', options: [
                { text: 'The two obligations are: (1) obligation to family', outcome: 'The two obligations are: (1) obligation to family — parents, wife, and children; (2) obligation.' },
                { text: 'obligation to self', outcome: 'Not quite — Students often believe Mandela "chose" the struggle over his family, framing it as a deliberate.', reveals: 'mandela-chose-the-struggle-over' },
                { text: 'obligation to the ANC', outcome: 'Not quite — Students often believe Mandela "chose" the struggle over his family, framing it as a deliberate.', reveals: 'mandela-chose-the-struggle-over' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_006', title: 'The Meaning of Freedom: Mandela\'s Reflection on Liberty',
          caseStudy: { intro: 'Imagine you\'re sitting in your classroom and the teacher asks: "What does freedom mean to you?" You might say "doing what I want" or "no homework." Now picture.',
            decisions: [{ prompt: 'According to Mandela, what did freedom mean to him as a boy in Qunu, and why does he later call it an "illusion"?', options: [
                { text: 'As a boy, Mandela equated freedom with the ability to run in the fields, swim in the', outcome: 'As a boy, Mandela equated freedom with the ability to run in the fields, swim in the stream, and.' },
                { text: 'he was free because he was happy', outcome: 'Not quite — Students believe Mandela\'s "freedom is indivisible" means "everyone must have exactly the same.', reveals: 'mandela-s-freedom-is-indivisible' },
                { text: 'freedom is indivisible', outcome: 'Not quite — Students believe Mandela\'s "freedom is indivisible" means "everyone must have exactly the same.', reveals: 'mandela-s-freedom-is-indivisible' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a class discussion on Mandela\'s \'Long Walk to Freedom\', a student shrugs: \'Apartheid just meant separate buses and schools — unfair but not that evil. Laws are laws.\' The teacher asks the class to respond.',
            decisions: [{ prompt: 'What is the strongest reply to that student?', options: [
                { text: 'Apartheid was not a few separate queues — it was a legal system that defined your race at birth, dictated where you could live and travel, and decided what work and future were open to you. Mandela\'s point is deeper still: such a system cages the oppressors too, so freedom means dismantling the unjust laws themselves, not just swapping who sits where.', outcome: 'Laws like race classification, the pass system and segregated areas made discrimination the structure of the state itself — \'legal\' and \'just\' are not the same thing.' },
                { text: 'The student is basically right — separation was the real harm, and once separate facilities ended, nothing else about apartheid mattered.', outcome: 'That misses how deep it went: apartheid legally fixed identity, movement, residence and opportunity from birth — ending separate benches alone would not undo it.', reveals: 'segregation-was-only-separate-buses' },
                { text: 'Mandela\'s story shows the opposite — that unjust laws should simply be obeyed patiently until rulers change their minds.', outcome: 'Mandela resisted unjust law and went to prison for it; the chapter\'s whole arc is that freedom had to be fought for, not waited for.', reveals: 'unjust-laws-must-be-obeyed' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Apartheid wasn\'t just separate benches; it was a legal machine that defined who you were at birth. Freedom meant dismantling the machine, not just opening the benches.',
            decisions: [{ prompt: 'What comes next? Nelson Mandela: Long Walk to Freedom · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Nelson Mandela: Long Walk to Freedom · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_001', difficulty: 'standard',
          question: 'Apartheid was a system of institutionalized racial segregation and.',
          hint: 'Review the distinction between "discrimination" (individual acts) and "institutionalized.',
          misconception: 'Students often think apartheid was only about "separate facilities" (benches, beaches, buses) — a visible but.',
          parts: [
                { id: 'a', prompt: 'Name the four official racial categories created by the Population Registration Act of 1950 under apartheid.', answer: 'The four categories were White, Black (referred to as "Bantu" or "Native" in',
                  options: ['The four categories were White, Black (referred to as "Bantu" or "Native" in', 'African', 'separately, or adding', 'separate facilities'],
                  hint: 'Review the distinction between "discrimination" (individual acts) and "institutionalized.',
                  misconception: 'Students often think apartheid was only about "separate facilities" (benches, beaches, buses) — a visible but surface-level understanding.' },
                { id: 'b', prompt: 'A Black South African worker in 1970s Johannesburg holds a "pass book" under the Native Laws Amendment Act. He is stopped by police 5 km from his township job.', answer: 'He has committed the crime of being in a "White" area without authorization',
                  options: ['He has committed the crime of being in a "White" area without authorization', 'he forgot his ID', 'the grim reality of the pass laws', 'separate facilities'],
                  hint: 'Review the distinction between "discrimination" (individual acts) and "institutionalized.',
                  misconception: 'Students often think apartheid was only about "separate facilities" (benches, beaches, buses) — a visible but surface-level understanding.' }
          ],
            remediations: { 'apartheid-was-only-about-separate': { steps: ['Have the student draw a 4-column table: Law | Year | What it did | Human right violated.', 'Fill it for Population Registration Act, Group Areas Act, Pass Laws, Bantu Education Act.', 'Give a 2-sentence scenario (e.g., "A Black nurse cannot live near the White hospital where she works") and ask the.', 'Show a 1960s apartheid map of Johannesburg with townships (Soweto, Alexandra) separated from White suburbs by buffer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think apartheid was only about "separate facilities" (benches, beaches, buses) — a visible but.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Apartheid was essentially the same as racial segregation in the southern USA (Jim Crow laws)." Defend or refute using two specific.', answer: 'Refute',
                  options: ['Refute', 'both were bad', 'both separated races', 'separate facilities'],
                  hint: 'Review the distinction between "discrimination" (individual acts) and "institutionalized.',
                  misconception: 'Students often think apartheid was only about "separate facilities" (benches, beaches, buses) — a visible but surface-level understanding.' }
          ],
            remediations: { 'apartheid-was-only-about-separate': { steps: ['Have the student draw a 4-column table: Law | Year | What it did | Human right violated.', 'Fill it for Population Registration Act, Group Areas Act, Pass Laws, Bantu Education Act.', 'Give a 2-sentence scenario (e.g., "A Black nurse cannot live near the White hospital where she works") and ask the.', 'Show a 1960s apartheid map of Johannesburg with townships (Soweto, Alexandra) separated from White suburbs by buffer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_002', difficulty: 'standard',
          question: 'Mandela\'s inauguration on 10 May 1994 was the historic swearing-in ceremony.',
          hint: 'Review **c10_engl_cbse_02_001** focusing on the "Key Apartheid Laws" and "Daily Life.',
          misconception: '**Misconception:** "The inauguration was mainly about Mandela becoming President — the anthems and military display.',
          parts: [
                { id: 'a', prompt: 'Compare the attitude of the South African defence force generals **before 1994** (as implied by the chapter) and **at the inauguration**.', answer: 'Before 1994, the generals enforced apartheid',
                  options: ['Before 1994, the generals enforced apartheid', 'they respected him now'],
                  hint: 'Review **c10_engl_cbse_02_001** focusing on the "Key Apartheid Laws" and "Daily Life Under.',
                  misconception: '**Misconception:** "The inauguration was mainly about Mandela becoming President — the anthems and military display were just ceremonial.' }
          ],
            remediations: { 'misconception-the-inauguration-was-mainly': { steps: ['**Re-read the inauguration paragraphs (pp.', '18-20 in NCERT) with a highlighter.** Mark every *object, action, or sound* that represents a **change of power**.', '**Create a two-column table:** Column A = "Apartheid Era Symbol", Column B = "Inauguration Day Symbol".', 'Fill it: Whites-only venue → Rainbow crowd; *Die Stem* only → *Die Stem* + *Nkosi Sikelel\' iAfrika*; Generals arrest.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_003', difficulty: 'standard',
          question: 'The "Rainbow Gathering of Nations" refers to the historic inauguration ceremony.',
          hint: 'Review c10_engl_cbse_02_001 (Apartheid background) and c10_engl_cbse_02_002 (Inauguration.',
          misconception: 'Students often think "rainbow gathering" only refers to racial diversity among the attendees.',
          parts: [
                { id: 'a', prompt: 'Why does Mandela describe the gathering as a "rainbow" rather than simply "a large gathering of world leaders"?', answer: 'Mandela chooses "rainbow" to symbolize unity in diversity',
                  options: ['Mandela chooses "rainbow" to symbolize unity in diversity', 'because there were many coloured flags', 'because South Africa is called the Rainbow Nation', 'rainbow gathering'],
                  hint: 'Review c10_engl_cbse_02_001 (Apartheid background) and c10_engl_cbse_02_002 (Inauguration basics).',
                  misconception: 'Students often think "rainbow gathering" only refers to racial diversity among the attendees.' },
                { id: 'b', prompt: 'Analyze how the singing of two national anthems ("Nkosi Sikelel\' iAfrika" and "Die Stem") functions as a structural device in the inauguration scene.', answer: 'The two anthems represent the two fractured identities of South Africa',
                  options: ['The two anthems represent the two fractured identities of South Africa', 'it shows they sang two songs', 'it was to please everyone', 'rainbow gathering'],
                  hint: 'Review c10_engl_cbse_02_001 (Apartheid background) and c10_engl_cbse_02_002 (Inauguration basics).',
                  misconception: 'Students often think "rainbow gathering" only refers to racial diversity among the attendees.' }
          ],
            remediations: { 'rainbow-gathering-only-refers-to': { steps: ['Re-read paragraphs 3-5 of the chapter where Mandela lists the dignitaries (presidents, prime ministers, royalty) and.', 'Create a two-column table: Column A — "Who attended" (list 5+ categories: heads of state, anti-apartheid leaders.', 'Rewrite the definition of "rainbow gathering" in your own words including both domestic racial unity AND international.', 'Practice a 3-mark board question: "Explain the significance of the phrase \'rainbow gathering of nations\' with two.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_004', difficulty: 'standard',
          question: 'This topic examines Nelson Mandela\'s 27-year imprisonment (often referenced.',
          hint: 'If stuck, review c10_engl_cbse_02_001\'s "Apartheid Laws Timeline" and the ANC\'s shift.',
          misconception: 'Students often treat Mandela\'s imprisonment as a passive "waiting period" and write answers like "Mandela waited.',
          parts: [
                { id: 'a', prompt: 'What was the name of the trial where Nelson Mandela and other ANC leaders were sentenced to life imprisonment in 1964?', answer: 'The Rivonia Trial',
                  options: ['The Rivonia Trial', 'Treason Trial', 'Sharpeville Trial'],
                  hint: 'If stuck, review c10_engl_cbse_02_001\'s "Apartheid Laws Timeline" and the ANC\'s shift from.',
                  misconception: 'Students often treat Mandela\'s imprisonment as a passive "waiting period" and write answers like "Mandela waited in jail until the world.' },
                { id: 'b', prompt: 'Compare Mandela\'s leadership style inside prison (Robben Island) with his leadership outside prison (pre-1962). What core principle remains constant?', answer: 'Outside: public oratory, mass mobilization, guerrilla planning',
                  options: ['Outside: public oratory, mass mobilization, guerrilla planning', 'he gave speeches', 'he broke rocks'],
                  hint: 'If stuck, review c10_engl_cbse_02_001\'s "Apartheid Laws Timeline" and the ANC\'s shift from.',
                  misconception: 'Students often treat Mandela\'s imprisonment as a passive "waiting period" and write answers like "Mandela waited in jail until the world.' }
          ],
            remediations: { 'students-often-treat-mandela-s': { steps: ['Re-read the "Robben Island" section with a highlighter: mark every verb showing Mandela *acting* (organized, taught.', 'Create a two-column table: "Action in Prison" vs "Impact on Struggle" (e.g., "Learned Afrikaans" → "Understood.', 'Practice a 3-mark question: "Give two examples of Mandela\'s active leadership on Robben Island." 4.', 'Verify each example has a textual anchor (page/paragraph reference).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_005', difficulty: 'standard',
          question: 'The Twin Obligations refer to Nelson Mandela\'s articulation in "Long Walk.',
          hint: 'If stuck, review c10_engl_cbse_02_004 for the sequence of events that pulled Mandela away.',
          misconception: 'Students often believe Mandela "chose" the struggle over his family, framing it as a deliberate sacrifice of one.',
          parts: [
                { id: 'a', prompt: 'What are the two specific obligations Mandela identifies as the "twin obligations" in the chapter?', answer: 'The two obligations are: (1) obligation to family',
                  options: ['The two obligations are: (1) obligation to family', 'obligation to self', 'obligation to the ANC'],
                  hint: 'If stuck, review c10_engl_cbse_02_004 for the sequence of events that pulled Mandela away from home.',
                  misconception: 'Students often believe Mandela "chose" the struggle over his family, framing it as a deliberate sacrifice of one obligation for the other.' },
                { id: 'b', prompt: 'Apply Mandela\'s framework to a new situation: A young doctor in rural India wants to serve her village (obligation to people) but her aging parents need daily.', answer: 'Step 1: Identify the two obligations',
                  options: ['Step 1: Identify the two obligations', 'I saw that my duty to my people was as important as my duty to my family', 'she must choose one', 'says "she must choose one" misses Mandela\'s synthesis'],
                  hint: 'If stuck, review c10_engl_cbse_02_004 for the sequence of events that pulled Mandela away from home.',
                  misconception: 'Students often believe Mandela "chose" the struggle over his family, framing it as a deliberate sacrifice of one obligation for the other.' }
          ],
            remediations: { 'mandela-chose-the-struggle-over': { steps: ['Re-read the specific paragraphs on twin obligations (usually 2-3 paragraphs after the inauguration description).', 'Create a two-column table: Column A — "What apartheid prevented Mandela from doing for family"; Column B — "What.', 'Rewrite the misconception sentence into a board-style answer: "Apartheid\'s structural violence forced a separation.', 'Practice one PEEL paragraph using this corrected understanding.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_006', difficulty: 'standard',
          question: 'Mandela\'s reflection on freedom in "Long Walk to Freedom" is his evolved.',
          hint: 'If stuck, review the "Twin Obligations" node (c10_engl_cbse_02_005) and the "30 Years.',
          misconception: 'Students believe Mandela\'s "freedom is indivisible" means "everyone must have exactly the same freedoms" — confusing.',
          parts: [
                { id: 'a', prompt: 'Mandela writes: "I am not truly free if I am taking away someone else\'s freedom, just as surely as I am not free when my freedom is taken from me." Explain.', answer: 'Mandela means that freedom is relational',
                  options: ['Mandela means that freedom is relational', 'the oppressor is free', 'freedom is indivisible', 'everyone must have exactly the same freedoms'],
                  hint: 'If stuck, review the "Twin Obligations" node (c10_engl_cbse_02_005) and the "30 Years in Prison".',
                  misconception: 'Students believe Mandela\'s "freedom is indivisible" means "everyone must have exactly the same freedoms" — confusing moral indivisibility.' },
                { id: 'b', prompt: 'Compare Mandela\'s final definition of freedom ("freedom is indivisible") with the concept of "twin obligations" (node 005).', answer: 'The twin obligations',
                  options: ['The twin obligations', 'he chose one over the other', 'freedom is indivisible', 'everyone must have exactly the same freedoms'],
                  hint: 'If stuck, review the "Twin Obligations" node (c10_engl_cbse_02_005) and the "30 Years in Prison".',
                  misconception: 'Students believe Mandela\'s "freedom is indivisible" means "everyone must have exactly the same freedoms" — confusing moral indivisibility.' }
          ],
            remediations: { 'mandela-s-freedom-is-indivisible': { steps: ['If the student equates indivisibility with uniformity: (1) Ask: "Does a thief have the \'freedom\' to steal?', 'If we stop him, is he less free?" — guide them to see that restricting harm is not restricting freedom.', '(2) Return to Mandela\'s exact words: "to be free is not merely to cast off one\'s chains, but to live in a way that.', '(4) Connect to the Constitution (Civics link): fundamental rights are subject to reasonable restrictions — this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
