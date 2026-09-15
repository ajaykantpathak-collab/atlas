import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch13_p1: SimDef = {
    id: 'v3_c10_engl_ch13_p1',
    title: 'A Question of Trust · Part 1/2',
    subtitle: 'Pull off a careful robbery, then lose it all to a better liar',
    classLevel: 10, subject: 'engl', topic: 'A Question of Trust · Part 1/2',
    chapters: ['c10_engl_ch13'],
    nodeIds: ['c10_engl_cbse_13_001', 'c10_engl_cbse_13_002', 'c10_engl_cbse_13_003', 'c10_engl_cbse_13_004', 'c10_engl_cbse_13_005', 'c10_engl_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a gentleman thief with a passion for rare books', intro: 'Once a year you stop being a respectable locksmith and become a careful, solitary burglar — not for greed, but for beautiful rare books. This year\'s job at Shotover Grange is going perfectly. Almost.', goal: 'Trace how a single misplaced trust undid months of meticulous planning, and weigh the irony of a thief being out-thieved.' },
    discovery: {
        question: 'Horace Danby is a respectable locksmith who robs one safe a year to buy rare books. At Shotover Grange, a charming young woman catches him mid-robbery, sweet-talks him into opening the safe \'for her jewellery\' — and he goes to prison while she walks free. What was the twist?',
        options: ['She was a fellow thief who tricked him into leaving his fingerprints all over the safe', 'She was an undercover police officer gathering evidence', 'She was the house owner\'s wife setting a trap for him', 'She hypnotised him into confessing to the owners'],
        answer: 'She was a fellow thief who tricked him into leaving his fingerprints all over the safe',
        hook: 'The man who believed in \'honour among thieves\' met a thief who didn\'t. His careful gloves came off the moment he trusted the wrong person.',
    },
    teaching: [
        { title: 'Horace Danby: A Respectable Locksmith Who Steals Once a Year', text: 'Horace Danby is the protagonist of "A Question of Trust" — a fifty-year-old unmarried locksmith who appears respectable and honest but secretly commits one carefully planned burglary each year.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Plan a \'perfect\' annual burglary as a meticulous, honest-in-public thief — then discover mid-heist that the most dangerous person in the house isn\'t carrying a weapon but a smile.',
        labels: ['Horace Danby: A Respectable', 'Horace\'s Motive: Stealing', 'The Shotover Grange Heist', 'The Woman in Red', 'Horace\'s Mistake: Believing', 'Theme: Honour Among Thieves'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_001', title: 'Horace Danby: A Respectable Locksmith Who Steals Once a Year',
          caseStudy: { intro: 'Imagine you see a well-dressed locksmith fixing your neighbour\'s door — polite, skilled, and trusted by everyone.',
            decisions: [{ prompt: 'What are the two contrasting sides of Horace Danby\'s character introduced in the opening paragraphs of the story?', options: [
                { text: 'Correct answer: Horace Danby is introduced as a respectable, successful locksmith who is', outcome: 'Correct answer: Horace Danby is introduced as a respectable, successful locksmith who is "good and.' },
                { text: 'He is a thief who pretends to be a locksmith', outcome: 'Not quite — Students often write: "Horace Danby is a thief who pretends to be a locksmith." This reverses the.', reveals: 'students-often-write-horace-danby' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_002', title: 'Horace\'s Motive: Stealing to Buy Rare and Expensive Books',
          caseStudy: { intro: 'Imagine you save pocket money for months to buy a special edition of your favourite novel — now imagine you need a new rare book every year, but your honest.',
            decisions: [{ prompt: 'What is Horace Danby\'s primary motive for committing burglary once a year?', options: [
                { text: 'Horace Danby steals once a year to buy rare and expensive books that he loves but cannot', outcome: 'Horace Danby steals once a year to buy rare and expensive books that he loves but cannot afford.' },
                { text: 'for money', outcome: 'Not quite — Students often think Horace steals because he is poor or greedy for money in general.', reveals: 'horace-steals-because-he-is' },
                { text: 'for thrill', outcome: 'Not quite — Students often think Horace steals because he is poor or greedy for money in general.', reveals: 'horace-steals-because-he-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_003', title: 'The Shotover Grange Heist: Horace\'s Careful Planning',
          caseStudy: { intro: 'Imagine you are planning a surprise birthday party for a friend who follows a strict routine — you\'d note when they leave for work, which door they use, where.',
            decisions: [{ prompt: 'List three specific details Horace Danby observed about Shotover Grange during his two-week surveillance before the heist.', options: [
                { text: 'Correct answer: (1) The two servants went to the market on the day of the robbery,', outcome: 'Correct answer: (1) The two servants went to the market on the day of the robbery, leaving the.' },
                { text: 'he watched the house', outcome: 'Not quite — Students often think Horace\'s planning failed because he was careless or forgot something.', reveals: 'horace-s-planning-failed-because' },
                { text: 'thorough planning', outcome: 'Not quite — Students often think Horace\'s planning failed because he was careless or forgot something.', reveals: 'horace-s-planning-failed-because' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_004', title: 'The Woman in Red: The Mysterious Thief Who Tricks Horace',
          caseStudy: { intro: 'Imagine you\'re watching a heist movie where the master thief, after months of planning, gets tricked by someone pretending to be the homeowner.',
            decisions: [{ prompt: 'What does the woman in red claim to be when she first confronts Horace in the safe room at Shotover Grange?', options: [
                { text: 'She claims to be the wife of the owner of Shotover Grange, returning unexpectedly to', outcome: 'She claims to be the wife of the owner of Shotover Grange, returning unexpectedly to retrieve her.' },
                { text: 'she says she is a police officer', outcome: 'Not quite — Students often think the woman in red is actually the lady of the house who catches Horace.', reveals: 'the-woman-in-red-is' },
                { text: 'she says she is the maid', outcome: 'Not quite — Students often think the woman in red is actually the lady of the house who catches Horace.', reveals: 'the-woman-in-red-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_005', title: 'Horace\'s Mistake: Believing the Woman and Removing His Gloves',
          caseStudy: { intro: 'Imagine you are Horace Danby: you\'ve planned a perfect burglary, worn gloves to leave no prints, and suddenly a charming woman appears claiming to be the.',
            decisions: [{ prompt: 'What specific action does Horace take at the woman\'s request that directly leads to his fingerprints being left on the safe?', options: [
                { text: 'Horace removes his gloves and opens the safe with bare hands', outcome: 'Horace removes his gloves and opens the safe with bare hands. A wrong answer (e.g., "he forgets.' },
                { text: 'he forgets to wear gloves', outcome: 'Not quite — Students often think Horace removes his gloves because he is careless or forgetful.', reveals: 'horace-removes-his-gloves-because' },
                { text: 'he leaves his gloves behind', outcome: 'Not quite — Students often think Horace removes his gloves because he is careless or forgetful.', reveals: 'horace-removes-his-gloves-because' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_006', title: 'Theme: Honour Among Thieves and the Irony of Being Outsmarted',
          caseStudy: { intro: 'Imagine you hear the saying "There is honour among thieves." You might think criminals protect each other.',
            decisions: [{ prompt: 'What is the literal meaning of the proverb "honour among thieves"?', options: [
                { text: 'The proverb means that even criminals have a code of loyalty and do not betray each other', outcome: 'The proverb means that even criminals have a code of loyalty and do not betray each other.' },
                { text: 'thieves are honourable people', outcome: 'Not quite — Students often think Horace is purely a victim of the woman\'s deception and overlook that his own.', reveals: 'horace-is-purely-a-victim' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student copies homework daily but insists, \'I\'m basically honest — I only copy because I have no time, and I\'d never actually steal anything.\' His friend is reminded of Horace Danby, the respectable locksmith who robbed one safe a year to buy rare books.',
            decisions: [{ prompt: 'What does \'A Question of Trust\' suggest about this kind of self-image?', options: [
                { text: 'That \'not completely honest\' is still dishonest — Horace too saw himself as good and respectable, stealing only for books he loved, yet the story strips that excuse: he is outwitted by someone even less honest and ends up in prison. A good reason for a dishonest act does not make it honest.', outcome: 'The chapter\'s irony is aimed exactly at this self-deception — Horace\'s hobby-theft felt civilised to him, but the law and a cleverer criminal treated it as plain theft.' },
                { text: 'The student\'s self-image is accurate — copying homework is nothing like real theft, so the comparison fails completely.', outcome: 'The scale differs but the pattern is identical — both excuse a small dishonesty with a reasonable-sounding story, which is precisely the habit the story warns about.', reveals: 'small-dishonesty-is-harmless' },
                { text: 'Horace was actually honest, since he stole only to buy books rather than for greed.', outcome: 'The purpose of a theft does not change the act — he took what was not his, and his taste for books made the irony sharper, not the crime cleaner.', reveals: 'theft-for-good-reason-is-ok' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'Horace planned for locks, alarms and dogs — everything except another thief. Charm turned out to be the only safe he couldn\'t crack.',
            decisions: [{ prompt: 'What comes next? A Question of Trust · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Question of Trust · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_13_001', difficulty: 'standard',
          question: 'Horace Danby is the protagonist of "A Question of Trust" — a fifty-year-old.',
          hint: 'If stuck, review c9_engl_ch1_2 (Grandmother character analysis) and c9_engl_ch2_2.',
          misconception: 'Students often write: "Horace Danby is a thief who pretends to be a locksmith." This reverses the textual hierarchy.',
          parts: [
                { id: 'a', prompt: 'Why does Horace Danby steal only once a year, and what does this detail reveal about his attitude toward crime?', answer: 'Correct answer: He steals once a year',
                  options: ['Correct answer: He steals once a year', 'He steals once a year'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother character analysis) and c9_engl_ch2_2 (Sentila.',
                  misconception: 'Students often write: "Horace Danby is a thief who pretends to be a locksmith." This reverses the textual hierarchy — the story establishes.' },
                { id: 'b', prompt: 'Find two pieces of textual evidence that show Horace Danby plans his burglaries with professional precision, and explain how each evidence reflects his.', answer: 'Correct answer: Evidence 1: "He studied the house',
                  options: ['Correct answer: Evidence 1: "He studied the house', 'he planned carefully'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother character analysis) and c9_engl_ch2_2 (Sentila.',
                  misconception: 'Students often write: "Horace Danby is a thief who pretends to be a locksmith." This reverses the textual hierarchy — the story establishes.' }
          ],
            remediations: { 'students-often-write-horace-danby': { steps: ['Ask the student to re-read the first three paragraphs and highlight every phrase describing Horace\'s locksmith work.', 'Have them highlight every phrase about theft (e.g., "not completely honest," "stole every year").', 'Guide them to see the *chronology*: locksmith description comes first, spans more sentences, and includes concrete.', 'Practice writing one PEEL paragraph where the Point acknowledges both identities as real, Evidence quotes from both.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write: "Horace Danby is a thief who pretends to be a locksmith." This reverses the textual hierarchy.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether Horace Danby can be considered a "professional thief." Support your judgment with two reasons from the text.', answer: 'Correct answer: No, he is not a professional thief',
                  options: ['Correct answer: No, he is not a professional thief', 'Yes, because he plans carefully'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother character analysis) and c9_engl_ch2_2 (Sentila.',
                  misconception: 'Students often write: "Horace Danby is a thief who pretends to be a locksmith." This reverses the textual hierarchy — the story establishes.' }
          ],
            remediations: { 'students-often-write-horace-danby': { steps: ['Ask the student to re-read the first three paragraphs and highlight every phrase describing Horace\'s locksmith work.', 'Have them highlight every phrase about theft (e.g., "not completely honest," "stole every year").', 'Guide them to see the *chronology*: locksmith description comes first, spans more sentences, and includes concrete.', 'Practice writing one PEEL paragraph where the Point acknowledges both identities as real, Evidence quotes from both.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_13_002', difficulty: 'standard',
          question: 'Horace Danby\'s motive for stealing is his passionate desire to acquire rare and.',
          hint: 'Review "Character Analysis: The Grandmother (Krishtakka)" (c9_engl_ch1_2) to practice.',
          misconception: 'Students often think Horace steals because he is poor or greedy for money in general.',
          parts: [
                { id: 'a', prompt: 'Using the PEEL structure, write a short paragraph that proves Horace\'s motive is books, not wealth.', answer: 'Point: Horace steals solely to fund his book collection',
                  options: ['Point: Horace steals solely to fund his book collection', 'Horace steals because he is poor or greedy for money in general'],
                  hint: 'Review "Character Analysis: The Grandmother (Krishtakka)" (c9_engl_ch1_2) to practice inferring.',
                  misconception: 'Students often think Horace steals because he is poor or greedy for money in general.' }
          ],
            remediations: { 'horace-steals-because-he-is': { steps: ['Re-read the opening paragraphs of the story where the narrator describes Horace\'s background and his "only passion." 2.', 'Highlight every sentence that mentions books, agents, or the cost of books.', 'Write a two-column list: "What Horace steals" vs.', '"What Horace spends it on." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_13_003', difficulty: 'standard',
          question: 'The Shotover Grange heist refers to Horace Danby\'s meticulously planned annual.',
          hint: 'If stuck, review c10_engl_cbse_13_001 (Horace\'s dual nature) and c10_engl_cbse_13_002.',
          misconception: 'Students often think Horace\'s planning failed because he was careless or forgot something.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Horace chose to rob Shotover Grange on the day the servants went to the market.', answer: 'Correct answer: Horace chose that day',
                  options: ['Correct answer: Horace chose that day', 'because it was easy', 'explain', 'thorough planning'],
                  hint: 'If stuck, review c10_engl_cbse_13_001 (Horace\'s dual nature) and c10_engl_cbse_13_002 (motive).',
                  misconception: 'Students often think Horace\'s planning failed because he was careless or forgot something.' }
          ],
            remediations: { 'horace-s-planning-failed-because': { steps: ['Ask the student to re-read the two paragraphs describing Horace\'s surveillance (text lines: "For two weeks he had.', 'Have them list each observation as a bullet point.', 'Ask: "Which of these did he use during the robbery? Which did he not need?"', 'Guide them to see that every physical detail was used — the failure came from a human variable he couldn\'t plan for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_13_004', difficulty: 'standard',
          question: 'The woman in red is a young, sharp-witted thief who impersonates the lady.',
          hint: 'Review character analysis techniques from c9_engl_ch1_2 and the heist details from.',
          misconception: 'Students often think the woman in red is actually the lady of the house who catches Horace red-handed, missing that she.',
          parts: [
                { id: 'a', prompt: 'Why does Horace believe the woman in red is the genuine lady of the house? Give two reasons from the text.', answer: 'Horace believes her',
                  options: ['Horace believes her', 'she looked rich'],
                  hint: 'Review character analysis techniques from c9_engl_ch1_2 and the heist details from.',
                  misconception: 'Students often think the woman in red is actually the lady of the house who catches Horace red-handed, missing that she is a thief herself.' }
          ],
            remediations: { 'the-woman-in-red-is': { steps: ['Re-read the safe-room scene aloud.', 'Pause at every line the woman speaks and ask: "Would the real lady of the house say this?', 'Would she ask a burglar to open her own safe?" 2.', 'Highlight the moment she says, "I\'ll let you go if you open the safe for me." Ask: "Does a homeowner bargain with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_13_005', difficulty: 'standard',
          question: 'Horace\'s Mistake refers to the critical moment in "A Question of Trust" when.',
          hint: 'Review Horace\'s preparation in node 003 and the woman\'s first appearance in node 004.',
          misconception: 'Students often think Horace removes his gloves because he is careless or forgetful.',
          parts: [
                { id: 'a', prompt: 'What specific action does Horace take at the woman\'s request that directly leads to his fingerprints being left on the safe?', answer: 'Horace removes his gloves and opens the safe with bare hands',
                  options: ['Horace removes his gloves and opens the safe with bare hands', 'he forgets to wear gloves', 'he leaves his gloves behind', 'Horace removes his gloves'],
                  hint: 'Review Horace\'s preparation in node 003 and the woman\'s first appearance in node 004.',
                  misconception: 'Students often think Horace removes his gloves because he is careless or forgetful.' },
                { id: 'b', prompt: 'Apply the concept of "situational irony" to this scene: Horace is a thief who prides himself on careful planning.', answer: 'Horace always wears gloves to avoid fingerprints',
                  options: ['Horace always wears gloves to avoid fingerprints', 'it\'s ironic because he gets caught', 'Horace removes his gloves'],
                  hint: 'Review Horace\'s preparation in node 003 and the woman\'s first appearance in node 004.',
                  misconception: 'Students often think Horace removes his gloves because he is careless or forgetful.' }
          ],
            remediations: { 'horace-removes-his-gloves-because': { steps: ['If a student holds this misconception, re-read the dialogue where the woman says, "You\'ll have to take off your.', 'the safe\'s mechanism is very sensitive." Ask: "Does Horace believe her?', 'Why?" Then highlight Horace\'s internal thought: "He hesitated, but then he took them off." Guide the student to see the.', 'Finally, contrast with Horace\'s earlier preparation (gloves, tools, studying the house) to prove he is not normally.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_13_006', difficulty: 'standard',
          question: 'The theme "Honour Among Thieves" refers to the proverbial idea that criminals.',
          hint: 'Review the plot summary node (c10_engl_cbse_13_003) and the woman\'s deception node.',
          misconception: 'Students often think Horace is purely a victim of the woman\'s deception and overlook that his own criminal intent makes.',
          parts: [
                { id: 'a', prompt: 'Compare Horace Danby and the woman in red as thieves. How does their interaction demonstrate the absence of honour among thieves?', answer: 'Horace is a meticulous, once-a-year thief who steals for books',
                  options: ['Horace is a meticulous, once-a-year thief who steals for books', 'both thieves'],
                  hint: 'Review the plot summary node (c10_engl_cbse_13_003) and the woman\'s deception node.',
                  misconception: 'Students often think Horace is purely a victim of the woman\'s deception and overlook that his own criminal intent makes him vulnerable.' }
          ],
            remediations: { 'horace-is-purely-a-victim': { steps: ['Re-read the scene where Horace meets the woman (paragraphs 10-15 in the textbook).', 'Highlight every line where Horace assumes she is the lady of the house.', 'Ask: "Would a real lady ask a stranger to open her safe and give her the jewels?" 4.', 'Write two sentences: one stating the proverb, one stating the story\'s reality.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
