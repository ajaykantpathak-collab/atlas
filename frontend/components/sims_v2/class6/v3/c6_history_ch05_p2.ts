import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch05_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch05_p2: SimDef = {
    id: 'v3_c6_history_ch05_p2',
    title: 'Empires and Kingdoms · Part 2/2',
    subtitle: 'This node covers the rise and achievements of the Gupta Empire including key rulers;.',
    classLevel: 6, subject: 'history', topic: 'Empires and Kingdoms · Part 2/2',
    chapters: ['c6_history_ch05'],
    nodeIds: ['c6_history_ch05_013', 'c6_history_ch05_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever noticed how some school years feel like everything goes right—you make new friends, do well.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Picture a school where every student is an independent king making their own rules. Around 321 BCE, Chandragupta Maurya and his advisor Chanakya did something like turning all those rulers into one team. How?',
        options: ['Through conquest and diplomacy — small mahajanapadas were merged under a single central authority', 'By asking nicely once and hoping for the best', 'By building a giant wall around each kingdom', 'By moving everyone to a new empty land'],
        answer: 'Through conquest and diplomacy — small mahajanapadas were merged under a single central authority',
        hook: 'The empire did not rise in an empty land. The subcontinent was already full of organized mahajanapadas — Chandragupta united pieces that already existed rather than starting from scratch.',
    },
    teaching: [
        { title: 'The Gupta Empire: The Golden Age', text: 'The Gupta Empire was a powerful Indian dynasty founded by Chandragupta I in 320 CE that brought about a "Golden Age" of stability, growth, and cultural achievement in northern India.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch05_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take charge beside Chandragupta and Chanakya — decide when to fight and when to make an alliance as you fold rival mahajanapadas into one empire.',
        labels: ['The Gupta Empire', 'Harshavardhana: The Last Great'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch05_013', title: 'The Gupta Empire: The Golden Age',
          caseStudy: { intro: 'Have you ever noticed how some school years feel like everything goes right—you make new friends, do well in sports, and learn new things easily?',
            decisions: [{ prompt: 'Who was the founder of the Gupta Empire and in what year did he begin his rule?', options: [
                { text: 'The founder was Chandragupta I, who began his rule around 320 CE', outcome: 'The founder was Chandragupta I, who began his rule around 320 CE.' },
                { text: 'Chandragupta', outcome: 'Not quite — Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named.', reveals: 'students-often-confuse-the-gupta' },
                { text: 'they are the same time period', outcome: 'Not quite — Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named.', reveals: 'students-often-confuse-the-gupta' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_014', title: 'Harshavardhana: The Last Great Ancient Ruler',
          caseStudy: { intro: 'Have you ever had to step up and take responsibility when things were going wrong at home or in a group project?',
            decisions: [{ prompt: 'Who was Harshavardhana and where was his capital city located?', options: [
                { text: 'Harshavardhana was a 7th-century ruler of northern India', outcome: 'Harshavardhana was a 7th-century ruler of northern India. His capital was at Kanauj.' },
                { text: 'great kings', outcome: 'Not quite — Students often assume Harsha was an ancient king from the same time as the Buddha or Ashoka.', reveals: 'harsha-was-an-ancient-king' },
                { text: 'ancient', outcome: 'Not quite — Students often assume Harsha was an ancient king from the same time as the Buddha or Ashoka.', reveals: 'harsha-was-an-ancient-king' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate on how empires grow, one side declares: \'Empires are built by war, period — kings win territory or they don\'t.\' The other side has just read about Chandragupta\'s empire and the small kingdoms around it.',
            decisions: [{ prompt: 'What does the Mauryan story say about how empires actually grow?', options: [
                { text: 'By war and diplomacy together — Chandragupta conquered some kingdoms but others joined through alliances, and a small kingdom often preferred joining willingly for protection over being crushed in battle. The empire covered most of the subcontinent because smaller states were absorbed by both force and negotiation — and even that needed a strategist like Chanakya, not just soldiers.', outcome: 'Empires were assembled through mixed tools — battles, treaties, advisors and voluntary unions — which is also why \'a great leader\' is really a great team.' },
                { text: 'The first side is right — territory only changes hands through conquest, so alliances are just decoration.', outcome: 'Alliances moved borders too — kingdoms that joined willingly became part of the empire without a single battle.', reveals: 'empire-equals-conquest' },
                { text: 'Neither — empires grew mainly by trade, with armies and diplomacy playing only minor roles.', outcome: 'Trade enriched kingdoms but did not annex them — conquest and alliance did the absorbing, and trade followed the flag.', reveals: 'empire-is-trade-network' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch05_014', title: 'You made it',
          caseStudy: { intro: 'An empire is a puzzle solved with both sword and treaty. Many small kingdoms became one power for the first time.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch05_013', difficulty: 'standard',
          question: 'The Gupta Empire was a powerful Indian dynasty founded by Chandragupta I in 320.',
          hint: 'Review the definition of an "Empire" in the previous chapter to understand the scale.',
          misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They.',
          parts: [
                { id: 'a', prompt: 'Who was the founder of the Gupta Empire and in what year did he begin his rule?', answer: 'The founder was Chandragupta I, who began his rule around 320 CE',
                  options: ['The founder was Chandragupta I, who began his rule around 320 CE', 'Chandragupta', 'they are the same time period'],
                  hint: 'Review the definition of an "Empire" in the previous chapter to understand the scale of the Gupta.',
                  misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They think they are the same.' },
                { id: 'b', prompt: 'Why do historians refer to the Gupta period as the "Golden Age"?', answer: 'It is called the Golden Age',
                  options: ['It is called the Golden Age', 'Golden Age', 'Chandragupta', 'they are the same time period'],
                  hint: 'Review the definition of an "Empire" in the previous chapter to understand the scale of the Gupta.',
                  misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They think they are the same.' },
                { id: 'c', prompt: 'If you were a trader in the Gupta Empire, how would the "political stability" mentioned in the text help your business?', answer: 'Identify that stability means fewer wars and safer roads',
                  options: ['Identify that stability means fewer wars and safer roads', 'Chandragupta', 'they are the same time period'],
                  hint: 'Review the definition of an "Empire" in the previous chapter to understand the scale of the Gupta.',
                  misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They think they are the same.' },
                { id: 'd', prompt: 'Compare the roles of Samudragupta and Chandragupta II in the development of the empire.', answer: 'Samudragupta is known for expanding the empire through military conquest, while',
                  options: ['Samudragupta is known for expanding the empire through military conquest, while', 'conquest', 'reaching a peak', 'Chandragupta'],
                  hint: 'Review the definition of an "Empire" in the previous chapter to understand the scale of the Gupta.',
                  misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They think they are the same.' }
          ],
            remediations: { 'students-often-confuse-the-gupta': { steps: ['Look at the timeline provided in your textbook.', 'Ask the student: "Which came first—the Mauryan Empire or the Gupta Empire?" If they are unsure, have them draw a line.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to say the Gupta Empire was only successful because of its kings? Why or why not?', answer: 'It is not entirely accurate',
                  options: ['It is not entirely accurate', 'top-down', 'Chandragupta', 'they are the same time period'],
                  hint: 'Review the definition of an "Empire" in the previous chapter to understand the scale of the Gupta.',
                  misconception: 'Students often confuse the Gupta Empire with the Mauryan Empire because both have kings named "Chandragupta." They think they are the same.' }
          ],
            remediations: { 'students-often-confuse-the-gupta': { steps: ['Look at the timeline provided in your textbook.', 'Ask the student: "Which came first—the Mauryan Empire or the Gupta Empire?" If they are unsure, have them draw a line.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch05_014', difficulty: 'standard',
          question: 'Harshavardhana was a prominent 7th-century ruler who unified much of northern.',
          hint: 'Review the concept of "Dynastic Rule" and "Inheritance."',
          misconception: 'Students often assume Harsha was an ancient king from the same time as the Buddha or Ashoka.',
          parts: [
                { id: 'a', prompt: 'Who was Harshavardhana and where was his capital city located?', answer: 'Harshavardhana was a 7th-century ruler of northern India',
                  options: ['Harshavardhana was a 7th-century ruler of northern India', 'great kings', 'ancient', 'Harsha was an ancient king from the same time as the Buddha or Ashoka'],
                  hint: 'Review the concept of "Dynastic Rule" and "Inheritance."',
                  misconception: 'Students often assume Harsha was an ancient king from the same time as the Buddha or Ashoka.' },
                { id: 'b', prompt: 'If you were a poet living in Harsha’s kingdom, why would you feel supported by him?', answer: 'Identify Harsha’s traits (patron of arts)',
                  options: ['Identify Harsha’s traits (patron of arts)', 'great kings', 'ancient', 'Harsha was an ancient king from the same time as the Buddha or Ashoka'],
                  hint: 'Review the concept of "Dynastic Rule" and "Inheritance."',
                  misconception: 'Students often assume Harsha was an ancient king from the same time as the Buddha or Ashoka.' },
                { id: 'c', prompt: 'How does being a "patron of learning" differ from being a "conqueror"?', answer: 'A conqueror focuses on territorial expansion, while a patron invests in schools,',
                  options: ['A conqueror focuses on territorial expansion, while a patron invests in schools,', 'great kings', 'ancient', 'Harsha was an ancient king from the same time as the Buddha or Ashoka'],
                  hint: 'Review the concept of "Dynastic Rule" and "Inheritance."',
                  misconception: 'Students often assume Harsha was an ancient king from the same time as the Buddha or Ashoka.' }
          ],
            remediations: { 'harsha-was-an-ancient-king': { steps: ['Ask the student to draw a simple timeline with the Buddha (c.', 'Point out that these are over 1,000 years apart.', 'Explain that Harsha is the "last great ruler of ancient India," meaning he is at the very end of the period we are.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
