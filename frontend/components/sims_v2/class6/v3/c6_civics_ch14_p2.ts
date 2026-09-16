import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch14_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch14_p2: SimDef = {
    id: 'v3_c6_civics_ch14_p2',
    title: 'Diversity in Indian Society · Part 2/2',
    subtitle: 'Many lunchboxes, one table — how difference holds a country together',
    classLevel: 6, subject: 'civics', topic: 'Diversity in Indian Society · Part 2/2',
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
        { title: 'Promoting Harmony and Respect for Diversity', text: 'Promoting harmony and respect for diversity is the intentional practice of valuing different cultures, languages, and traditions while working together to create a peaceful society.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch14_034', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Curate a school Diversity Fair — group languages, foods, festivals and dress into exhibits that show many lives adding up to one nation.',
        labels: ['Promoting Harmony and Respect'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch14_034', title: 'Promoting Harmony and Respect for Diversity',
          caseStudy: { intro: 'Have you ever noticed how your friends bring different types of food in their lunchboxes, or how you might celebrate different festivals at home?',
            decisions: [{ prompt: 'What is one way schools can help students respect different cultures?', options: [
                { text: 'Schools can celebrate festivals of different faiths and teach multiple languages', outcome: 'Schools can celebrate festivals of different faiths and teach multiple languages.' },
                { text: 'Schools should make everyone follow the same rules', outcome: 'Not quite — Students often think that "Unity" means everyone must act, speak, and eat the same way (forced.', reveals: 'unity-means-everyone-must-act' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch14_034', title: 'Use it in the wild',
          caseStudy: { intro: 'On the class video call with a partner school abroad, a classmate is embarrassed: \'India has so many languages and foods and festivals — honestly, are we even one country?\'',
            decisions: [{ prompt: 'How would you answer her using the idea of unity in diversity?', options: [
                { text: 'One country does not mean one culture — India\'s diversity is held together by shared things: harvest festivals celebrated under different names across regions, stories like the Panchatantra that travelled every language, one constitution and common institutions. Many voices, one conversation — the variety is the unity, not a crack in it.', outcome: 'Unity in diversity means the bond is shared life — festivals, stories, institutions and citizenship — not sameness of language or custom.' },
                { text: 'She is right — a real country needs everyone to speak one language and follow one custom.', outcome: 'That confuses uniformity with unity — India is one nation precisely through its many languages and traditions being woven into shared institutions and festivals.', reveals: 'unity-needs-uniformity' },
                { text: 'India is actually many separate countries that only share a border on the map.', outcome: 'Shared citizenship, one constitution, common markets and festivals celebrated across states make it one nation — a map line is the least of what holds it together.', reveals: 'india-is-many-countries' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch14_034', title: 'You made it',
          caseStudy: { intro: 'Different languages, different lunches — same classroom, same rules, same country. Diversity isn\'t a crack in India\'s wall; it\'s the design.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch14_034', difficulty: 'standard',
          question: 'Promoting harmony and respect for diversity is the intentional practice.',
          hint: 'Review the section on "A Rich Diversity" in the textbook regarding languages and.',
          misconception: 'Students often think that "Unity" means everyone must act, speak, and eat the same way (forced assimilation).',
          parts: [
                { id: 'a', prompt: 'What is one way schools can help students respect different cultures?', answer: 'Schools can celebrate festivals of different faiths and teach multiple languages',
                  options: ['Schools can celebrate festivals of different faiths and teach multiple languages', 'Schools should make everyone follow the same rules'],
                  hint: 'Review the section on "A Rich Diversity" in the textbook regarding languages and traditions.',
                  misconception: 'Students often think that "Unity" means everyone must act, speak, and eat the same way (forced assimilation).' },
                { id: 'b', prompt: 'Why is it important for people of different backgrounds to talk and work together?', answer: 'It helps break down stereotypes and builds trust between people',
                  options: ['It helps break down stereotypes and builds trust between people', 'It is important so everyone becomes the same'],
                  hint: 'Review the section on "A Rich Diversity" in the textbook regarding languages and traditions.',
                  misconception: 'Students often think that "Unity" means everyone must act, speak, and eat the same way (forced assimilation).' }
          ],
            remediations: { 'unity-means-everyone-must-act': { steps: ['Explain that a puzzle is only complete because the pieces have different shapes; if they were all identical, they.', 'Ask the student: "If every student in class liked the same color and food, would our school be more or less.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
