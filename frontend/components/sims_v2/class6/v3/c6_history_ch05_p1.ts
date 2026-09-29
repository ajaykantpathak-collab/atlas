import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch05_p1: SimDef = {
    id: 'v3_c6_history_ch05_p1',
    title: 'Empires and Kingdoms · Part 1/2',
    subtitle: 'This node covers the founding of the Mauryan Empire and its expansion through conquest.',
    classLevel: 6, subject: 'history', topic: 'Empires and Kingdoms · Part 1/2',
    chapters: ['c6_history_ch05'],
    nodeIds: ['c6_history_ch05_007', 'c6_history_ch05_008', 'c6_history_ch05_009', 'c6_history_ch05_010', 'c6_history_ch05_011', 'c6_history_ch05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why we call India one country today instead of hundreds of tiny pieces?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Picture a school where every student is an independent king making their own rules. Around 321 BCE, Chandragupta Maurya and his advisor Chanakya did something like turning all those rulers into one team. How?',
        options: ['Through conquest and diplomacy — small mahajanapadas were merged under a single central authority', 'By asking nicely once and hoping for the best', 'By building a giant wall around each kingdom', 'By moving everyone to a new empty land'],
        answer: 'Through conquest and diplomacy — small mahajanapadas were merged under a single central authority',
        hook: 'The empire did not rise in an empty land. The subcontinent was already full of organized mahajanapadas — Chandragupta united pieces that already existed rather than starting from scratch.',
    },
    teaching: [
        { title: 'The Rise of the Mauryan Empire', text: 'The Mauryan Empire was the first large-scale, unified political power in the Indian subcontinent, established around 321 BCE by Chandragupta Maurya.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take charge beside Chandragupta and Chanakya — decide when to fight and when to make an alliance as you fold rival mahajanapadas into one empire.',
        labels: ['The Rise of', 'Ashoka: The Emperor Who', 'Ashoka\'s Edicts: Messages', 'The Mauryan Administration', 'The Spread of Buddhism', 'After the Mauryas: Post-Mauryan'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch05_007', title: 'The Rise of the Mauryan Empire',
          caseStudy: { intro: 'Have you ever wondered why we call India one country today instead of hundreds of tiny pieces?',
            decisions: [{ prompt: 'Who was the founder of the Mauryan Empire, and who served as his main advisor?', options: [
                { text: 'Chandragupta Maurya founded the empire, and his advisor was Chanakya (also known as', outcome: 'Chandragupta Maurya founded the empire, and his advisor was Chanakya (also known as Kautilya).' },
                { text: 'the Mauryan Empire appeared suddenly in an empty, uninhabited land', outcome: 'Not quite — Students often assume that the Mauryan Empire appeared suddenly in an empty, uninhabited land.', reveals: 'the-mauryan-empire-appeared-suddenly' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_008', title: 'Ashoka: The Emperor Who Gave Up War',
          caseStudy: { intro: 'Have you ever played a game where winning felt so bad that you didn\'t want to play anymore?',
            decisions: [{ prompt: 'What was the major event that caused Ashoka to change his mind about fighting wars?', options: [
                { text: 'The Kalinga War', outcome: 'The Kalinga War. A student who answers "becoming a Buddhist" or "his father\'s advice" shows they.' },
                { text: 'becoming a Buddhist', outcome: 'Not quite — Students often think Ashoka stopped being a king or lost his empire after he gave up war.', reveals: 'ashoka-stopped-being-a-king' },
                { text: 'his father\'s advice', outcome: 'Not quite — Students often think Ashoka stopped being a king or lost his empire after he gave up war.', reveals: 'ashoka-stopped-being-a-king' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_009', title: 'Ashoka\'s Edicts: Messages on Stone',
          caseStudy: { intro: 'Imagine you are the leader of a massive school and want to make sure every single student follows the same rules, but you don\'t have WhatsApp or notice boards.',
            decisions: [{ prompt: 'What materials did Ashoka use to create his edicts, and why were these choices important?', options: [
                { text: 'He used rock surfaces and sandstone pillars', outcome: 'He used rock surfaces and sandstone pillars. These materials were chosen because they are durable.' },
                { text: 'trophy room', outcome: 'Not quite — Students often think Ashoka carved these edicts only to brag about his victories.', reveals: 'ashoka-carved-these-edicts-only' },
                { text: 'Ashoka carved these edicts only to brag about his victories', outcome: 'Not quite — Students often think Ashoka carved these edicts only to brag about his victories.', reveals: 'ashoka-carved-these-edicts-only' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_010', title: 'The Mauryan Administration',
          caseStudy: { intro: 'If your school had to organize a massive event like an Annual Sports Day, could the Principal do it alone?',
            decisions: [{ prompt: 'Who were the officials responsible for managing specific government departments in the Mauryan Empire?', options: [
                { text: 'They were called *amatyas*', outcome: 'They were called *amatyas*. A wrong answer (like naming a specific king) shows the student.' },
                { text: 'the Emperor personally managed every village and district', outcome: 'Not quite — Students often think the Emperor personally managed every village and district.', reveals: 'the-emperor-personally-managed-every' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_011', title: 'The Spread of Buddhism Under Ashoka',
          caseStudy: { intro: 'Imagine you have a great idea for a community project, but only a few people know about it. How do you make sure the whole country hears about it?',
            decisions: [{ prompt: 'What were the two types of structures Ashoka built to help spread Buddhism?', options: [
                { text: 'Ashoka built stupas (dome-shaped monuments containing relics) and viharas (monasteries)', outcome: 'Ashoka built stupas (dome-shaped monuments containing relics) and viharas (monasteries).' },
                { text: 'forced', outcome: 'Not quite — Students often think Ashoka "forced" people to become Buddhists.', reveals: 'ashoka-forced-people-to-become' },
                { text: 'Ashoka "forced" people to become Buddhists', outcome: 'Not quite — Students often think Ashoka "forced" people to become Buddhists.', reveals: 'ashoka-forced-people-to-become' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_012', title: 'After the Mauryas: Post-Mauryan Kingdoms',
          caseStudy: { intro: 'Imagine your school team, which was once the largest and strongest in the city, suddenly loses its head coach and begins to break into smaller, independent.',
            decisions: [{ prompt: 'Who was the general that ended the Mauryan dynasty and established the Shunga dynasty?', options: [
                { text: 'The general was Pushyamitra Shunga', outcome: 'The general was Pushyamitra Shunga. A wrong answer here suggests the student is confusing the.' },
                { text: 'conquered', outcome: 'Not quite — Students often assume the Mauryan Empire was "conquered" by an outside force, when in fact, the.', reveals: 'the-mauryan-empire-was-conquered' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate on how empires grow, one side declares: \'Empires are built by war, period — kings win territory or they don\'t.\' The other side has just read about Chandragupta\'s empire and the small kingdoms around it.',
            decisions: [{ prompt: 'What does the Mauryan story say about how empires actually grow?', options: [
                { text: 'By war and diplomacy together — Chandragupta conquered some kingdoms but others joined through alliances, and a small kingdom often preferred joining willingly for protection over being crushed in battle. The empire covered most of the subcontinent because smaller states were absorbed by both force and negotiation — and even that needed a strategist like Chanakya, not just soldiers.', outcome: 'Empires were assembled through mixed tools — battles, treaties, advisors and voluntary unions — which is also why \'a great leader\' is really a great team.' },
                { text: 'The first side is right — territory only changes hands through conquest, so alliances are just decoration.', outcome: 'Alliances moved borders too — kingdoms that joined willingly became part of the empire without a single battle.', reveals: 'empire-equals-conquest' },
                { text: 'Neither — empires grew mainly by trade, with armies and diplomacy playing only minor roles.', outcome: 'Trade enriched kingdoms but did not annex them — conquest and alliance did the absorbing, and trade followed the flag.', reveals: 'empire-is-trade-network' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_012', title: 'The bigger picture',
          caseStudy: { intro: 'An empire is a puzzle solved with both sword and treaty. Many small kingdoms became one power for the first time.',
            decisions: [{ prompt: 'What comes next? Empires and Kingdoms · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Empires and Kingdoms · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch05_007', difficulty: 'standard',
          question: 'The Mauryan Empire was the first large-scale, unified political power in the.',
          hint: 'Review the definition of a \'kingdom\' and a \'republic\' within the context of early Indian.',
          misconception: 'Students often assume that the Mauryan Empire appeared suddenly in an empty, uninhabited land.',
          parts: [
                { id: 'a', prompt: 'If Chandragupta Maurya wanted to add a neighboring land to his empire without starting a war, what method could he use?', answer: 'He could use diplomacy, such as making treaties or alliances with local rulers',
                  options: ['He could use diplomacy, such as making treaties or alliances with local rulers', 'the Mauryan Empire appeared suddenly in an empty, uninhabited land', 'conquest (war) is the only way empires grew, missing the role of negotiation'],
                  hint: 'Review the definition of a \'kingdom\' and a \'republic\' within the context of early Indian history.',
                  misconception: 'Students often assume that the Mauryan Empire appeared suddenly in an empty, uninhabited land.' }
          ],
            remediations: { 'the-mauryan-empire-appeared-suddenly': { steps: ['Direct the student to look at a map showing the scattered mahajanapadas before 321 BCE.', 'Ask them: "If these kingdoms already existed, what did Chandragupta actually do to them?" Help them visualize the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_008', difficulty: 'standard',
          question: 'Ashoka was the third emperor of the Mauryan Empire who, after witnessing the.',
          hint: 'Review the definition of the Mauryan Empire and the fact that Ashoka was the third ruler.',
          misconception: 'Students often think Ashoka stopped being a king or lost his empire after he gave up war.',
          parts: [
                { id: 'a', prompt: 'What was the major event that caused Ashoka to change his mind about fighting wars?', answer: 'The Kalinga War',
                  options: ['The Kalinga War', 'becoming a Buddhist', 'his father\'s advice', 'non-violence'],
                  hint: 'Review the definition of the Mauryan Empire and the fact that Ashoka was the third ruler.',
                  misconception: 'Students often think Ashoka stopped being a king or lost his empire after he gave up war.' },
                { id: 'b', prompt: 'Why did Ashoka feel "remorse" after the Kalinga War?', answer: 'He felt deep regret',
                  options: ['He felt deep regret', 'non-violence', 'abdication', 'weakness'],
                  hint: 'Review the definition of the Mauryan Empire and the fact that Ashoka was the third ruler.',
                  misconception: 'Students often think Ashoka stopped being a king or lost his empire after he gave up war.' },
                { id: 'c', prompt: 'If Ashoka were a king today, how might his decision to give up war affect his relationship with his neighbors?', answer: 'Identify his new goal (peace)',
                  options: ['Identify his new goal (peace)', 'giving up war', 'giving up power', 'non-violence'],
                  hint: 'Review the definition of the Mauryan Empire and the fact that Ashoka was the third ruler.',
                  misconception: 'Students often think Ashoka stopped being a king or lost his empire after he gave up war.' },
                { id: 'd', prompt: 'Compare the Ashoka before the Kalinga War to the Ashoka after it.', answer: 'Before, he was a conqueror focused on expansion',
                  options: ['Before, he was a conqueror focused on expansion', 'non-violence', 'abdication', 'weakness'],
                  hint: 'Review the definition of the Mauryan Empire and the fact that Ashoka was the third ruler.',
                  misconception: 'Students often think Ashoka stopped being a king or lost his empire after he gave up war.' }
          ],
            remediations: { 'ashoka-stopped-being-a-king': { steps: ['Clarify that Ashoka remained the Emperor of the Mauryan Empire.', 'Use the analogy of a school captain: if a captain decides to stop bullying others to get their way and instead starts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Ashoka stopped being a king or lost his empire after he gave up war.',
          parts: [
                { id: 'a', prompt: 'Was Ashoka\'s decision to stop fighting a sign of defeat? Justify your answer.', answer: 'No, it was a choice made from a position of strength after winning the war',
                  options: ['No, it was a choice made from a position of strength after winning the war', 'non-violence', 'abdication', 'weakness'],
                  hint: 'Review the definition of the Mauryan Empire and the fact that Ashoka was the third ruler.',
                  misconception: 'Students often think Ashoka stopped being a king or lost his empire after he gave up war.' }
          ],
            remediations: { 'ashoka-stopped-being-a-king': { steps: ['Clarify that Ashoka remained the Emperor of the Mauryan Empire.', 'Use the analogy of a school captain: if a captain decides to stop bullying others to get their way and instead starts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_009', difficulty: 'standard',
          question: 'Ashoka\'s edicts are formal, public messages carved onto stone rocks and pillars.',
          hint: 'Review the concept of "Empires" and why a large territory makes it hard for a king.',
          misconception: 'Students often think Ashoka carved these edicts only to brag about his victories.',
          parts: [
                { id: 'a', prompt: 'What materials did Ashoka use to create his edicts, and why were these choices important?', answer: 'He used rock surfaces and sandstone pillars',
                  options: ['He used rock surfaces and sandstone pillars', 'trophy room', 'Ashoka carved these edicts only to brag about his victories'],
                  hint: 'Review the concept of "Empires" and why a large territory makes it hard for a king to speak.',
                  misconception: 'Students often think Ashoka carved these edicts only to brag about his victories.' },
                { id: 'b', prompt: 'If Ashoka wanted to reach villagers who could not travel to the capital, how did his choice of placing edicts on rocks help him?', answer: 'Identify the location (public spaces/routes)',
                  options: ['Identify the location (public spaces/routes)', 'trophy room', 'messages were only for royal officials', 'Ashoka carved these edicts only to brag about his victories'],
                  hint: 'Review the concept of "Empires" and why a large territory makes it hard for a king to speak.',
                  misconception: 'Students often think Ashoka carved these edicts only to brag about his victories.' }
          ],
            remediations: { 'ashoka-carved-these-edicts-only': { steps: ['If a student thinks the edicts are just bragging, ask them: "If you win a game but then feel bad about how you played.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_010', difficulty: 'standard',
          question: 'The Mauryan administration was a centralized system of government designed.',
          hint: 'Review the concept of "Delegation of Authority" in a simple school context (Principal ->.',
          misconception: 'Students often think the Emperor personally managed every village and district.',
          parts: [
                { id: 'a', prompt: 'Who were the officials responsible for managing specific government departments in the Mauryan Empire?', answer: 'They were called *amatyas*',
                  options: ['They were called *amatyas*', 'the Emperor personally managed every village and district'],
                  hint: 'Review the concept of "Delegation of Authority" in a simple school context (Principal -> Teachers.',
                  misconception: 'Students often think the Emperor personally managed every village and district.' },
                { id: 'b', prompt: 'If the Mauryan Empire needed to build new roads or irrigation canals, which department would likely be involved?', answer: 'The department responsible for public works or infrastructure management',
                  options: ['The department responsible for public works or infrastructure management', 'the Emperor personally managed every village and district'],
                  hint: 'Review the concept of "Delegation of Authority" in a simple school context (Principal -> Teachers.',
                  misconception: 'Students often think the Emperor personally managed every village and district.' }
          ],
            remediations: { 'the-emperor-personally-managed-every': { steps: ['Ask the student to draw a "chain of command" diagram.', 'Start with the Emperor at the top, then draw lines to the Council, and then lines to the *amatyas*.', 'Ask them, "If the Emperor is in the capital, how does he know if the village taxes are collected?" This helps them see.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_011', difficulty: 'standard',
          question: 'The spread of Buddhism under Ashoka refers to the transformation of a small.',
          hint: 'Review the shift in Ashoka’s policy from "Conquest by Force" to "Conquest by Dharma."',
          misconception: 'Students often think Ashoka "forced" people to become Buddhists.',
          parts: [
                { id: 'a', prompt: 'If Ashoka wanted to reach people who could not read, which of his methods would be most effective?', answer: 'He would use stupas and viharas',
                  options: ['He would use stupas and viharas', 'forced', 'Ashoka "forced" people to become Buddhists'],
                  hint: 'Review the shift in Ashoka’s policy from "Conquest by Force" to "Conquest by Dharma."',
                  misconception: 'Students often think Ashoka "forced" people to become Buddhists. However, Ashoka used moral persuasion and public messaging, not violence.' }
          ],
            remediations: { 'ashoka-forced-people-to-become': { steps: ['Explain that after the Kalinga war, Ashoka specifically turned away from war and violence.', 'Point out that "edicts" were about "moral conduct" (Dharma), which are suggestions for how to live, not laws that can.', 'Ask the student: "If you want to be a good person, can someone force you to do it, or do you have to choose?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_012', difficulty: 'standard',
          question: 'The Post-Mauryan period refers to the era following the decline of the Mauryan.',
          hint: 'Review the concept of "Successors" in the Mauryan dynasty.',
          misconception: 'Students often assume the Mauryan Empire was "conquered" by an outside force, when in fact, the text notes it declined.',
          parts: [
                { id: 'a', prompt: 'Who was the general that ended the Mauryan dynasty and established the Shunga dynasty?', answer: 'The general was Pushyamitra Shunga',
                  options: ['The general was Pushyamitra Shunga', 'conquered'],
                  hint: 'Review the concept of "Successors" in the Mauryan dynasty.',
                  misconception: 'Students often assume the Mauryan Empire was "conquered" by an outside force, when in fact, the text notes it declined due to weak.' },
                { id: 'b', prompt: 'If you were a trader living in the northwest after the Mauryans declined, why might you see new people like the Indo-Greeks settling near you?', answer: 'You would see them',
                  options: ['You would see them', 'superpower', 'conquered'],
                  hint: 'Review the concept of "Successors" in the Mauryan dynasty.',
                  misconception: 'Students often assume the Mauryan Empire was "conquered" by an outside force, when in fact, the text notes it declined due to weak.' }
          ],
            remediations: { 'the-mauryan-empire-was-conquered': { steps: ['Direct the student to re-read the transition of power from the last Mauryan emperor to his general.', 'Ask: "If a captain of a ship quits, does the ship get destroyed by a storm, or does the crew start taking different.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
