import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch11 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch11: SimDef = {
    id: 'v3_c6_history_ch11',
    title: 'The Freedom Struggle',
    subtitle: 'This node covers the emergence of nationalism as a unified consciousness.',
    classLevel: 6, subject: 'history', topic: 'The Freedom Struggle',
    chapters: ['c6_history_ch11'],
    nodeIds: ['c6_history_ch11_045', 'c6_history_ch11_046', 'c6_history_ch11_047', 'c6_history_ch11_048', 'c6_history_ch11_049', 'c6_history_ch11_050'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are part of a team where everyone has different ideas, but you all decide to work together.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The British built railways and spread newspapers to run India more easily — yet those very tools helped Indians unite against British rule. How did the tools backfire?',
        options: ['Trains and newspapers connected people across regions, who discovered they shared the same problems and the same hopes', 'Indians sabotaged the trains to send a message', 'Newspapers printed secret codes only Indians could read', 'The British handed out free tickets to protests'],
        answer: 'Trains and newspapers connected people across regions, who discovered they shared the same problems and the same hopes',
        hook: 'Nationalism did not appear overnight, and not everyone agreed from day one. It grew gradually — and the early Congress, founded in Bombay in 1885, was moderate, asking for fair treatment within the system.',
    },
    teaching: [
        { title: 'The Birth of Indian Nationalism', text: 'The birth of Indian nationalism refers to the late 19th-century process where people across India began to see themselves as a single, united nation against British rule.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch11_045', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow a newspaper and a railway ticket across 1880s India — collect the shared complaints they carry — and deliver them to the first meeting of the Congress in Bombay.',
        labels: ['The Birth of Indian', 'The Non-Cooperation Movement', 'The Civil Disobedience Movement', 'The Quit India Movement', 'Subhas Chandra Bose', 'Independence and Partition'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch11_046', title: 'The Non-Cooperation Movement',
          caseStudy: { intro: 'Imagine your school authorities pass a rule you feel is unfair, but instead of fighting, you and all your friends simply decide to stop attending classes.',
            decisions: [{ prompt: 'In what year did Mahatma Gandhi launch the Non-Cooperation Movement?', options: [
                { text: 'The movement was launched in 1920', outcome: 'The movement was launched in 1920. A wrong answer here suggests the student has not yet grasped the.' },
                { text: 'non-cooperation', outcome: 'Not quite — Students often think Non-Cooperation meant attacking British soldiers.', reveals: 'non-cooperation-meant-attacking-british' },
                { text: 'armed rebellion', outcome: 'Not quite — Students often think Non-Cooperation meant attacking British soldiers.', reveals: 'non-cooperation-meant-attacking-british' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch11_048', title: 'The Quit India Movement',
          caseStudy: { intro: 'Have you ever felt so strongly about a rule that you were willing to take a huge risk to change it?',
            decisions: [{ prompt: 'What was the famous slogan given by Mahatma Gandhi during the launch of the Quit India Movement?', options: [
                { text: 'The slogan was "Do or Die."', outcome: 'The slogan was "Do or Die." A wrong answer suggests the student has not memorized the primary.' },
                { text: 'Do or Die', outcome: 'Not quite — Students often think the Quit India Movement happened because India was already at war with.', reveals: 'the-quit-india-movement-happened' },
                { text: 'the Quit India Movement happened', outcome: 'Not quite — Students often think the Quit India Movement happened because India was already at war with.', reveals: 'the-quit-india-movement-happened' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch11_049', title: 'Subhas Chandra Bose and the INA',
          caseStudy: { intro: 'Imagine you are playing a game where your team decides to ask the referee to change a rule by sitting silently, but you feel that the only way to win is.',
            decisions: [{ prompt: 'What was the primary method Subhas Chandra Bose believed was necessary to gain independence, contrasting with the non-violent approach?', options: [
                { text: 'Bose believed that armed struggle was necessary', outcome: 'Bose believed that armed struggle was necessary. A wrong answer here suggests the student.' },
                { text: 'against', outcome: 'Not quite — Students often think Bose was "against" Gandhi, implying personal hatred.', reveals: 'bose-was-against-gandhi' },
                { text: 'Bose was "against" Gandhi, implying personal hatred', outcome: 'Not quite — Students often think Bose was "against" Gandhi, implying personal hatred.', reveals: 'bose-was-against-gandhi' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch11_050', title: 'Independence and Partition',
          caseStudy: { intro: 'Imagine your school is about to become independent and manage itself, but two groups of students have such different ideas about how to run it that they decide.',
            decisions: [{ prompt: 'On what date did India officially gain its independence from British rule?', options: [
                { text: 'August 15, 1947', outcome: 'August 15, 1947. A wrong answer here suggests a lack of awareness of the most fundamental date.' },
                { text: 'the British government "split" India just to be mean or cause trouble', outcome: 'Not quite — Students often think the British government "split" India just to be mean or cause trouble.', reveals: 'the-british-government-split-india' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch11_045', title: 'Use it in the wild',
          caseStudy: { intro: 'A student argues in class: \'The British built railways and spread English only to help themselves — so it\'s absurd to say those things helped the freedom movement.\'',
            decisions: [{ prompt: 'Can something built for colonial profit still feed nationalism?', options: [
                { text: 'Yes — whatever the motive, trains let Indians from distant regions travel, meet and organise, and English gave them a shared language to exchange grievances. A merchant in Madras and a farmer in Bengal could discover they faced the same unfairness precisely because these tools connected them — an unintended \'positive\' cause of nationalism alongside the \'negative\' ones like heavy taxes.', outcome: 'The nationalist movement needed both the shared complaint and the means to share it — colonial networks of travel and language accidentally supplied the second.' },
                { text: 'The student is right — since the intent was selfish, the effects could only ever harm Indians.', outcome: 'Intent and effect are different — the railways and English were built for empire but ended up binding Indians together into a national conversation.', reveals: 'bad-motive-bad-effects' },
                { text: 'Railways helped only by carrying troops — they had no role in spreading nationalist ideas at all.', outcome: 'They carried ideas too — delegates, newspapers and speakers moved on those trains, turning scattered resentment into a coordinated movement.', reveals: 'trains-carried-only-troops' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch11_050', title: 'You made it',
          caseStudy: { intro: 'A nation is born when strangers discover they share a struggle. Trains carried the people; newspapers carried the idea.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch11_045', difficulty: 'standard',
          question: 'The birth of Indian nationalism refers to the late 19th-century process where.',
          hint: 'Review the "How Foreigners Named India" section to understand India as a large, singular.',
          misconception: 'Students often think nationalism happened instantly or that everyone in India agreed on everything from day one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The birth of Indian nationalism refers to the late 19th-century process where people',
                  options: ['The birth of Indian nationalism refers to the late 19th-century process where people', 'The Non-Cooperation Movement was a nationwide peaceful protest launched by Mahatma Gandhi', 'The Civil Disobedience Movement was a non-violent protest started by Mahatma Gandhi in', 'The Quit India Movement was a historic civil disobedience campaign launched by Mahatma'],
                  hint: 'Review the "How Foreigners Named India" section to understand India as a large, singular region.',
                  misconception: 'Students often think nationalism happened instantly or that everyone in India agreed on everything from day one.' }
          ],
            remediations: { 'nationalism-happened-instantly-or-that': { steps: ['Tell the student: "Think of a school project where different groups finally work together." 2.', 'Explain that before 1885, people identified mostly with their own kingdom or village.', 'Ask them to list two "connectors" (trains, English language, newspapers) that made this union possible.', 'Emphasize that "Nationalism" is a feeling that grows over time.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch11_046', difficulty: 'standard',
          question: 'The Non-Cooperation Movement was a nationwide peaceful protest launched.',
          hint: 'Review the definition of Satyagraha in the provided content.',
          misconception: 'Students often think Non-Cooperation meant attacking British soldiers.',
          parts: [
                { id: 'a', prompt: 'In what year did Mahatma Gandhi launch the Non-Cooperation Movement?', answer: 'The movement was launched in 1920',
                  options: ['The movement was launched in 1920', 'non-cooperation', 'armed rebellion', 'Non-Cooperation meant attacking British soldiers'],
                  hint: 'Review the definition of Satyagraha in the provided content.',
                  misconception: 'Students often think Non-Cooperation meant attacking British soldiers.' },
                { id: 'b', prompt: 'If you were a student in 1920 supporting this movement, what would you do differently in your daily routine?', answer: 'Identify the action (boycotting school)',
                  options: ['Identify the action (boycotting school)', 'non-cooperation', 'armed rebellion', 'the movement was about physical fighting rather than peaceful withdrawal'],
                  hint: 'Review the definition of Satyagraha in the provided content.',
                  misconception: 'Students often think Non-Cooperation meant attacking British soldiers.' },
                { id: 'c', prompt: 'How does "non-violent resistance" differ from a violent revolt?', answer: 'Non-violent resistance uses refusal to participate, whereas a revolt uses force',
                  options: ['Non-violent resistance uses refusal to participate, whereas a revolt uses force', 'satyagraha', 'non-cooperation', 'armed rebellion'],
                  hint: 'Review the definition of Satyagraha in the provided content.',
                  misconception: 'Students often think Non-Cooperation meant attacking British soldiers.' }
          ],
            remediations: { 'non-cooperation-meant-attacking-british': { steps: ['First, clarify that "non-cooperation" means "refusing to help." Use the analogy: "If you stop helping someone who.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch11_046', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Non-Cooperation meant attacking British soldiers.',
          parts: [
                { id: 'a', prompt: 'Was the Non-Cooperation Movement meant to be a regional protest? Why or why not?', answer: 'No, it was an all-India mass movement involving people across the country',
                  options: ['No, it was an all-India mass movement involving people across the country', 'non-cooperation', 'armed rebellion', 'Non-Cooperation meant attacking British soldiers'],
                  hint: 'Review the definition of Satyagraha in the provided content.',
                  misconception: 'Students often think Non-Cooperation meant attacking British soldiers.' }
          ],
            remediations: { 'non-cooperation-meant-attacking-british': { steps: ['First, clarify that "non-cooperation" means "refusing to help." Use the analogy: "If you stop helping someone who.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch11_047', difficulty: 'standard',
          question: 'The Civil Disobedience Movement was a non-violent protest started by Mahatma.',
          hint: 'Review the concept of colonial taxation and why the British wanted to control salt.',
          misconception: 'Students often think the Civil Disobedience Movement was a small, secret group of people sneaking around to make salt.',
          parts: [
                { id: 'a', prompt: 'If you were a villager in 1930, how would you show your support for this movement without using violence?', answer: 'Acknowledge the need for non-violence',
                  options: ['Acknowledge the need for non-violence', '\'disobedience\' must involve fighting or physical harm'],
                  hint: 'Review the concept of colonial taxation and why the British wanted to control salt production.',
                  misconception: 'Students often think the Civil Disobedience Movement was a small, secret group of people sneaking around to make salt.' }
          ],
            remediations: { 'the-civil-disobedience-movement-was': { steps: ['If a student thinks it was a \'secret\' act, ask them: "If Gandhi wanted to change the law for everyone, would it.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch11_048', difficulty: 'standard',
          question: 'The Quit India Movement was a historic civil disobedience campaign launched.',
          hint: 'Review the definition of a colony and why people want to be independent.',
          misconception: 'Students often think the Quit India Movement happened because India was already at war with Britain.',
          parts: [
                { id: 'a', prompt: 'What was the famous slogan given by Mahatma Gandhi during the launch of the Quit India Movement?', answer: 'The slogan was "Do or Die."',
                  options: ['The slogan was "Do or Die."', 'Do or Die', 'the Quit India Movement happened'],
                  hint: 'Review the definition of a colony and why people want to be independent.',
                  misconception: 'Students often think the Quit India Movement happened because India was already at war with Britain.' },
                { id: 'b', prompt: 'Why did the Indian National Congress reject the Cripps Mission, leading to the Quit India Movement?', answer: 'The Congress rejected it',
                  options: ['The Congress rejected it', 'the Quit India Movement happened'],
                  hint: 'Review the definition of a colony and why people want to be independent.',
                  misconception: 'Students often think the Quit India Movement happened because India was already at war with Britain.' },
                { id: 'c', prompt: 'If you were a person living in 1942, how would you interpret the slogan "Do or Die" in the context of the British refusal to leave?', answer: 'Acknowledge the extreme nature of the slogan',
                  options: ['Acknowledge the extreme nature of the slogan', 'the Quit India Movement happened'],
                  hint: 'Review the definition of a colony and why people want to be independent.',
                  misconception: 'Students often think the Quit India Movement happened because India was already at war with Britain.' }
          ],
            remediations: { 'the-quit-india-movement-happened': { steps: ['Explain that the movement was a protest, not a declaration of war.', 'Clarify that Indians were not fighting the British military, but rather refusing to cooperate with the government.', 'Ask the student to identify the "Cripps Mission" as the starting point of the frustration.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch11_049', difficulty: 'standard',
          question: 'Subhas Chandra Bose, known as Netaji, was a key leader in the Indian freedom.',
          hint: 'Review the timeline of the Indian National Congress and key leaders.',
          misconception: 'Students often think Bose was "against" Gandhi, implying personal hatred.',
          parts: [
                { id: 'a', prompt: 'What was the primary method Subhas Chandra Bose believed was necessary to gain independence, contrasting with the non-violent approach?', answer: 'Bose believed that armed struggle was necessary',
                  options: ['Bose believed that armed struggle was necessary', 'against', 'Bose was "against" Gandhi, implying personal hatred'],
                  hint: 'Review the timeline of the Indian National Congress and key leaders.',
                  misconception: 'Students often think Bose was "against" Gandhi, implying personal hatred.' },
                { id: 'b', prompt: 'If you were a leader during WWII, why might you seek help from countries like Germany or Japan to fight against the British in India?', answer: 'You would seek help',
                  options: ['You would seek help', 'the enemy of my enemy is my friend', 'against', 'Bose was "against" Gandhi, implying personal hatred'],
                  hint: 'Review the timeline of the Indian National Congress and key leaders.',
                  misconception: 'Students often think Bose was "against" Gandhi, implying personal hatred.' }
          ],
            remediations: { 'bose-was-against-gandhi': { steps: ['Explain that even in a team, two captains can disagree on the best strategy to win a game while both wanting to win.', 'Tell the student to read about how Bose served as Congress President to see that he was a respected part of the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch11_050', difficulty: 'standard',
          question: 'Independence and Partition refer to the events of August 1947, when India.',
          hint: 'Review the timeline of the Indian National Congress and the rise of the Muslim League.',
          misconception: 'Students often think the British government "split" India just to be mean or cause trouble.',
          parts: [
                { id: 'a', prompt: 'On what date did India officially gain its independence from British rule?', answer: 'August 15, 1947',
                  options: ['August 15, 1947', 'the British government "split" India just to be mean or cause trouble'],
                  hint: 'Review the timeline of the Indian National Congress and the rise of the Muslim League.',
                  misconception: 'Students often think the British government "split" India just to be mean or cause trouble.' },
                { id: 'b', prompt: 'If you were a leader in the Congress party in 1947, how would you explain the decision to accept partition?', answer: 'Acknowledge the goal of freedom',
                  options: ['Acknowledge the goal of freedom', 'compromise', 'the British government "split" India just to be mean or cause trouble'],
                  hint: 'Review the timeline of the Indian National Congress and the rise of the Muslim League.',
                  misconception: 'Students often think the British government "split" India just to be mean or cause trouble.' }
          ],
            remediations: { 'the-british-government-split-india': { steps: ['Ask the student: "Who were the leaders of the Congress and the Muslim League?" 2.', 'Explain that both groups had a say in the final map of the country.', 'Read the chapter content again to note that the Muslim League specifically requested the partition.', 'Clarify that the British were the ones leaving, but the political shape of the exit was heavily influenced by Indian.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
