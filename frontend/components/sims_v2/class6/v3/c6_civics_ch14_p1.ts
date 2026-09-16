import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch14_p1: SimDef = {
    id: 'v3_c6_civics_ch14_p1',
    title: 'Diversity in Indian Society · Part 1/2',
    subtitle: 'Many lunchboxes, one table — how difference holds a country together',
    classLevel: 6, subject: 'civics', topic: 'Diversity in Indian Society · Part 1/2',
    chapters: ['c6_civics_ch14'],
    nodeIds: ['c6_civics_ch14_033'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'curator of a school Diversity Fair', intro: 'Your classmates speak five languages at home and bring five different lunches — yet share one classroom and one flag. Your job: turn that variety into a fair.', goal: 'See diversity as richness to celebrate, not a problem to solve.' },
    discovery: {
        question: 'A student sighs, \'Indians speak different languages, eat different food, pray differently — how can a country this different ever hold together?\' What\'s the flaw in the worry?',
        options: ['Difference isn\'t division — people can live differently and still share one country and its rules', 'No flaw — countries must make everyone identical to survive', 'India holds together only because everyone secretly eats the same food', 'Different people get along only when they never meet each other'],
        answer: 'Difference isn\'t division — people can live differently and still share one country and its rules',
        hook: 'Diversity means many ways of living under one roof — like different lunchboxes at one table. Difference is the menu, not the fight.',
    },
    teaching: [
        { title: 'What is Diversity and Why It Matters', text: 'Diversity is the presence of a wide variety of differences among people, including their languages, religions, food, clothing, and traditions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch14_028', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Curate a school Diversity Fair — group languages, foods, festivals and dress into exhibits that show many lives adding up to one nation.',
        labels: ['What is Diversity', 'Linguistic Diversity: Languages', 'Religious Diversity: Many Faiths,', 'Cultural Diversity: Food, Dress,', 'Unity in Diversity: What', 'Challenges of Diversity: Inequality'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch14_028', title: 'What is Diversity and Why It Matters',
          caseStudy: { intro: 'Start by looking at your lunch box and your classmates\' lunch boxes; do you notice that everyone brings different types of food?',
            decisions: [{ prompt: 'What are two examples of diversity found in Indian society?', options: [
                { text: 'Two examples are the different languages spoken (like Hindi, Tamil, or Bengali) and the', outcome: 'Two examples are the different languages spoken (like Hindi, Tamil, or Bengali) and the variety.' },
                { text: 'diversity', outcome: 'Not quite — Students often think "diversity" means "division" or that if people are different, they cannot get.', reveals: 'diversity-means-division-or-that' },
                { text: 'division', outcome: 'Not quite — Students often think "diversity" means "division" or that if people are different, they cannot get.', reveals: 'diversity-means-division-or-that' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch14_029', title: 'Linguistic Diversity: Languages of India',
          caseStudy: { intro: 'Have you ever noticed that your friend might speak one language at home with their grandparents but a completely different one with you at school?',
            decisions: [{ prompt: 'How many languages are officially recognized by the Indian Constitution?', options: [
                { text: 'The Constitution recognizes 22 official languages', outcome: 'The Constitution recognizes 22 official languages. A wrong answer here suggests the student.' },
                { text: 'official', outcome: 'Not quite — Students often think that because there are so many languages, India must be "divided".', reveals: 'because-there-are-so-many' },
                { text: 'divided', outcome: 'Not quite — Students often think that because there are so many languages, India must be "divided".', reveals: 'because-there-are-so-many' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch14_031', title: 'Cultural Diversity: Food, Dress, Festivals, Customs',
          caseStudy: { intro: 'Imagine you are at a train station in India—what do you see? You might notice someone wearing a lungi, another in a salwar kameez, and someone else in a saree.',
            decisions: [{ prompt: 'Name three different traditional Indian dishes from three different states mentioned in the chapter.', options: [
                { text: 'Example: Biryani (Hyderabad), Dhokla (Gujarat), and Rosgulla (Bengal)', outcome: 'Example: Biryani (Hyderabad), Dhokla (Gujarat), and Rosgulla (Bengal).' },
                { text: 'diversity', outcome: 'Not quite — Students often confuse "diversity" with "division." They believe that because people eat different.', reveals: 'students-often-confuse-diversity-with' },
                { text: 'division', outcome: 'Not quite — Students often confuse "diversity" with "division." They believe that because people eat different.', reveals: 'students-often-confuse-diversity-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch14_032', title: 'Unity in Diversity: What Holds India Together',
          caseStudy: { intro: 'Think about your favourite meal—maybe your family makes a special dal or vegetable curry. Does your neighbour make the same dish exactly the same way?',
            decisions: [{ prompt: 'What are two examples of "staple grains" that are commonly eaten in most parts of India?', options: [
                { text: 'Rice and wheat (or millets like jowar/bajra)', outcome: 'Rice and wheat (or millets like jowar/bajra). If a student names only one or lists something like.' },
                { text: 'Unity in Diversity', outcome: 'Not quite — Students often think "Unity in Diversity" means that we must eventually become the same (melting.', reveals: 'unity-in-diversity-means-that' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch14_033', title: 'Challenges of Diversity: Inequality and Discrimination',
          caseStudy: { intro: 'Imagine you are at a school sports day and some students are given expensive shoes while others are told they cannot participate because of where they live.',
            decisions: [{ prompt: 'What is the difference between diversity and inequality?', options: [
                { text: 'Diversity refers to the variety of cultures, languages, and traditions, whereas', outcome: 'Diversity refers to the variety of cultures, languages, and traditions, whereas inequality is the.' },
                { text: 'being different', outcome: 'Not quite — Students often think "diversity" is a negative thing because it causes inequality.', reveals: 'diversity-is-a-negative-thing' },
                { text: 'being treated unfairly', outcome: 'Not quite — Students often think "diversity" is a negative thing because it causes inequality.', reveals: 'diversity-is-a-negative-thing' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch14_028', title: 'Use it in the wild',
          caseStudy: { intro: 'On the class video call with a partner school abroad, a classmate is embarrassed: \'India has so many languages and foods and festivals — honestly, are we even one country?\'',
            decisions: [{ prompt: 'How would you answer her using the idea of unity in diversity?', options: [
                { text: 'One country does not mean one culture — India\'s diversity is held together by shared things: harvest festivals celebrated under different names across regions, stories like the Panchatantra that travelled every language, one constitution and common institutions. Many voices, one conversation — the variety is the unity, not a crack in it.', outcome: 'Unity in diversity means the bond is shared life — festivals, stories, institutions and citizenship — not sameness of language or custom.' },
                { text: 'She is right — a real country needs everyone to speak one language and follow one custom.', outcome: 'That confuses uniformity with unity — India is one nation precisely through its many languages and traditions being woven into shared institutions and festivals.', reveals: 'unity-needs-uniformity' },
                { text: 'India is actually many separate countries that only share a border on the map.', outcome: 'Shared citizenship, one constitution, common markets and festivals celebrated across states make it one nation — a map line is the least of what holds it together.', reveals: 'india-is-many-countries' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch14_033', title: 'The bigger picture',
          caseStudy: { intro: 'Different languages, different lunches — same classroom, same rules, same country. Diversity isn\'t a crack in India\'s wall; it\'s the design.',
            decisions: [{ prompt: 'What comes next? Diversity in Indian Society · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Diversity in Indian Society · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch14_028', difficulty: 'standard',
          question: 'Diversity is the presence of a wide variety of differences among people.',
          hint: 'Review the map of India and identify the different states and their unique languages.',
          misconception: 'Students often think "diversity" means "division" or that if people are different, they cannot get along.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Diversity is the presence of a wide variety of differences among people, including their',
                  options: ['Diversity is the presence of a wide variety of differences among people, including their', 'Linguistic diversity refers to the existence of a wide variety of languages and dialects', 'Religious diversity refers to the presence of multiple different faiths and belief', 'Cultural diversity refers to the existence of a wide variety of customs, languages,'],
                  hint: 'Review the map of India and identify the different states and their unique languages.',
                  misconception: 'Students often think "diversity" means "division" or that if people are different, they cannot get along.' }
          ],
            remediations: { 'diversity-means-division-or-that': { steps: ['First, ask the student to identify one thing they have in common with a friend who is different (e.g., "Do you both.', 'Then, explain that diversity is like a color palette; a painting is more beautiful with many colors than with just one.', 'Finally, help them list three shared traits (like being Indian citizens) to show that unity exists alongside variety.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch14_028', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "diversity" means "division" or that if people are different, they cannot get along.',
          parts: [
                { id: 'a', prompt: 'Is it better for a country to have only one language and one religion? Why or why not?', answer: 'No, because having only one would make the culture much less rich and vibrant',
                  options: ['No, because having only one would make the culture much less rich and vibrant', 'diversity', 'division'],
                  hint: 'Review the map of India and identify the different states and their unique languages.',
                  misconception: 'Students often think "diversity" means "division" or that if people are different, they cannot get along.' }
          ],
            remediations: { 'diversity-means-division-or-that': { steps: ['First, ask the student to identify one thing they have in common with a friend who is different (e.g., "Do you both.', 'Then, explain that diversity is like a color palette; a painting is more beautiful with many colors than with just one.', 'Finally, help them list three shared traits (like being Indian citizens) to show that unity exists alongside variety.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch14_029', difficulty: 'standard',
          question: 'Linguistic diversity refers to the existence of a wide variety of languages and.',
          hint: 'Review the "Rich Diversity" section of the NCERT textbook.',
          misconception: 'Students often think that because there are so many languages, India must be "divided" or "confused." They fail.',
          parts: [
                { id: 'a', prompt: 'How many languages are officially recognized by the Indian Constitution?', answer: 'The Constitution recognizes 22 official languages',
                  options: ['The Constitution recognizes 22 official languages', 'official', 'divided', 'confused'],
                  hint: 'Review the "Rich Diversity" section of the NCERT textbook.',
                  misconception: 'Students often think that because there are so many languages, India must be "divided" or "confused." They fail to realize that being.' },
                { id: 'b', prompt: 'If India has thousands of languages, why do people in different states not find it impossible to communicate?', answer: 'Because most Indians are multilingual',
                  options: ['Because most Indians are multilingual', 'correct', 'divided', 'confused'],
                  hint: 'Review the "Rich Diversity" section of the NCERT textbook.',
                  misconception: 'Students often think that because there are so many languages, India must be "divided" or "confused." They fail to realize that being.' }
          ],
            remediations: { 'because-there-are-so-many': { steps: ['Ask the student to list all the languages they hear in a single day at home, on TV, or at school.', 'Then, have them realize that they already understand parts of several languages, proving that linguistic diversity is.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch14_030', difficulty: 'standard',
          question: 'Religious diversity refers to the presence of multiple different faiths and.',
          hint: 'Review the section on \'A Rich Diversity\' in the textbook to understand that variations.',
          misconception: 'Students often mistake "diversity" for "division." They assume that because people have different beliefs, they cannot.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Religious diversity refers to the presence of multiple different faiths and belief',
                  options: ['Religious diversity refers to the presence of multiple different faiths and belief', 'Diversity is the presence of a wide variety of differences among people, including their', 'Linguistic diversity refers to the existence of a wide variety of languages and dialects', 'Cultural diversity refers to the existence of a wide variety of customs, languages,'],
                  hint: 'Review the section on \'A Rich Diversity\' in the textbook to understand that variations in language.',
                  misconception: 'Students often mistake "diversity" for "division." They assume that because people have different beliefs, they cannot be part of the same.' }
          ],
            remediations: { 'students-often-mistake-diversity-for': { steps: ['First, ask the student to think of a fruit salad; explain that it is "one" salad, even though it contains "many".', 'Then, ask them to list their friends\' favorite foods and note that even if they like different things, they are all.', 'Finally, apply this to religion: different ways of worship are like different ingredients in the same Indian "salad".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch14_031', difficulty: 'standard',
          question: 'Cultural diversity refers to the existence of a wide variety of customs.',
          hint: 'Review the map of India and identify the states mentioned in the textbook examples (Tamil.',
          misconception: 'Students often confuse "diversity" with "division." They believe that because people eat different foods or wear.',
          parts: [
                { id: 'a', prompt: 'Name three different traditional Indian dishes from three different states mentioned in the chapter.', answer: 'Example: Biryani (Hyderabad), Dhokla (Gujarat), and Rosgulla (Bengal)',
                  options: ['Example: Biryani (Hyderabad), Dhokla (Gujarat), and Rosgulla (Bengal)', 'diversity', 'division'],
                  hint: 'Review the map of India and identify the states mentioned in the textbook examples (Tamil Nadu.',
                  misconception: 'Students often confuse "diversity" with "division." They believe that because people eat different foods or wear different clothes, they.' }
          ],
            remediations: { 'students-often-confuse-diversity-with': { steps: ['Ask the student to list three things they have in common with a friend who is culturally different (e.g., they both.', 'Explain that "unity" doesn\'t mean "sameness" (like a uniform), but "togetherness" (like a bouquet of different flowers).', 'Use the analogy of a "thali" meal: different items on one plate make a complete, delicious meal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch14_032', difficulty: 'standard',
          question: '"Unity in Diversity" is the concept that despite India\'s massive differences.',
          hint: 'Review the chapters on geography and regional food habits.',
          misconception: 'Students often think "Unity in Diversity" means that we must eventually become the same (melting pot) to be united.',
          parts: [
                { id: 'a', prompt: 'What are two examples of "staple grains" that are commonly eaten in most parts of India?', answer: 'Rice and wheat (or millets like jowar/bajra)',
                  options: ['Rice and wheat (or millets like jowar/bajra)', 'Unity in Diversity'],
                  hint: 'Review the chapters on geography and regional food habits.',
                  misconception: 'Students often think "Unity in Diversity" means that we must eventually become the same (melting pot) to be united.' },
                { id: 'b', prompt: 'If India has hundreds of languages and thousands of food dishes, how can we say it is "one nation"?', answer: 'We are one nation',
                  options: ['We are one nation', 'means everyone must be exactly the same'],
                  hint: 'Review the chapters on geography and regional food habits.',
                  misconception: 'Students often think "Unity in Diversity" means that we must eventually become the same (melting pot) to be united.' },
                { id: 'c', prompt: 'A friend says, "Since I speak Tamil and you speak Hindi, we are from two different countries." How do you use the concept of the Constitution to correct them?', answer: 'First, identify that both people are Indian citizens',
                  options: ['First, identify that both people are Indian citizens', 'Unity in Diversity'],
                  hint: 'Review the chapters on geography and regional food habits.',
                  misconception: 'Students often think "Unity in Diversity" means that we must eventually become the same (melting pot) to be united.' },
                { id: 'd', prompt: 'Compare the way a festival like "Makara Sankranti" is celebrated across different states. Why is this an example of "Many in the One"?', answer: 'It is the "Many"',
                  options: ['It is the "Many"', 'Unity in Diversity'],
                  hint: 'Review the chapters on geography and regional food habits.',
                  misconception: 'Students often think "Unity in Diversity" means that we must eventually become the same (melting pot) to be united.' }
          ],
            remediations: { 'unity-in-diversity-means-that': { steps: ['Ask the student to look at a bouquet of different flowers.', 'Ask: "Are the flowers the same?" (No).', '"Is it still one bouquet?" (Yes).', 'Explain that just like the bouquet, India stays united because we value the different \'flowers\' (cultures) held.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch14_033', difficulty: 'standard',
          question: 'Inequality refers to the unfair distribution of resources and opportunities.',
          hint: 'Review the chapter section on "A Rich Diversity" to see how different groups are.',
          misconception: 'Students often think "diversity" is a negative thing because it causes inequality.',
          parts: [
                { id: 'a', prompt: 'What is the difference between diversity and inequality?', answer: 'Diversity refers to the variety of cultures, languages, and traditions, whereas',
                  options: ['Diversity refers to the variety of cultures, languages, and traditions, whereas', 'being different', 'being treated unfairly', 'diversity'],
                  hint: 'Review the chapter section on "A Rich Diversity" to see how different groups are naturally.',
                  misconception: 'Students often think "diversity" is a negative thing because it causes inequality.' },
                { id: 'b', prompt: 'Why does discrimination still happen in India even though there are laws against it?', answer: 'Laws can stop official actions, but discrimination often hides in social habits,',
                  options: ['Laws can stop official actions, but discrimination often hides in social habits,', 'diversity', 'laws automatically change human behavior instantly', '"diversity" is a negative thing'],
                  hint: 'Review the chapter section on "A Rich Diversity" to see how different groups are naturally.',
                  misconception: 'Students often think "diversity" is a negative thing because it causes inequality.' },
                { id: 'c', prompt: 'If a student is excluded from a game because of their caste, which concept does this illustrate?', answer: 'This illustrates discrimination',
                  options: ['This illustrates discrimination', 'diversity', '"diversity" is a negative thing'],
                  hint: 'Review the chapter section on "A Rich Diversity" to see how different groups are naturally.',
                  misconception: 'Students often think "diversity" is a negative thing because it causes inequality.' },
                { id: 'd', prompt: 'How does inequality create a challenge for a country that values unity in diversity?', answer: 'It creates a challenge',
                  options: ['It creates a challenge', 'diversity', 'inequality doesn\'t affect national unity at all', '"diversity" is a negative thing'],
                  hint: 'Review the chapter section on "A Rich Diversity" to see how different groups are naturally.',
                  misconception: 'Students often think "diversity" is a negative thing because it causes inequality.' }
          ],
            remediations: { 'diversity-is-a-negative-thing': { steps: ['First, clarify that diversity is about our rich variety (like having many festivals or languages).', 'Second, explain that inequality is a choice or a habit people have made, not a natural result of being different.', 'Use the analogy: "Having many different colors in a box of crayons is diversity; deciding only to use one color because.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
