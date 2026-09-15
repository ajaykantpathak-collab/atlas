import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch06_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch06_p2: SimDef = {
    id: 'v3_c6_biology_ch06_p2',
    title: 'Adolescence -- A Stage of Growth · Part 2/2',
    subtitle: 'Why do classmates your age look so different from each other?',
    classLevel: 6, subject: 'biology', topic: 'Adolescence -- A Stage of Growth · Part 2/2',
    chapters: ['c6_biology_ch06'],
    nodeIds: ['c6_biology_ch06_007', 'c6_biology_ch06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a growth detective puzzling over a class photo', intro: 'Three friends, all 12, look like they belong in three different grades. Somewhere between birthday candles and shoe sizes, adolescence is running on personal clocks.', goal: 'Explain why growth spurts hit different people at different times — and stop worrying that your body is \'late\'.' },
    discovery: {
        question: 'In your class photo, three friends who all turned 12 this year look wildly different — one looks 15, one looks 12, one still looks 10. A visiting aunt whispers, \'Someone must be lying about their age!\' What\'s really going on?',
        options: ['Nothing is wrong — bodies grow in \'spurts\' on their own schedules during adolescence', 'The tall one is secretly older — everyone grows the same amount each year', 'The shorter ones are sick — equal ages should mean equal heights', 'They look different only because they eat different brands of food'],
        answer: 'Nothing is wrong — bodies grow in \'spurts\' on their own schedules during adolescence',
        hook: 'Same age does not mean same stage. Adolescence has no school-wide timetable — each body starts and finishes on a schedule as unique as a fingerprint.',
    },
    teaching: [
        { title: 'Personal Hygiene and Care During Adolescence', text: 'Personal hygiene during adolescence involves the regular maintenance of cleanliness to manage increased sweat and oil gland activity, which helps prevent body odour and skin irritation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch06_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Follow one student\'s body through a growth spurt — track the changes inside and out — and figure out why their best friend is still waiting for theirs.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch06_007', title: 'Personal Hygiene and Care During Adolescence',
          caseStudy: { intro: 'Have you noticed that you feel "stickier" or more prone to smelling sweaty after a game of football or a long school day compared to when you were younger?',
            decisions: [{ prompt: 'Why do adolescents need to pay more attention to their personal hygiene than they did as children?', options: [
                { text: 'Adolescents have increased activity in their sweat and oil glands', outcome: 'Adolescents have increased activity in their sweat and oil glands, which creates a better.' },
                { text: 'getting dirty', outcome: 'Not quite — Students often believe that "not looking dirty" means they are "clean." They think that if their.', reveals: 'not-looking-dirty-means-they' },
                { text: 'not looking dirty', outcome: 'Not quite — Students often believe that "not looking dirty" means they are "clean." They think that if their.', reveals: 'not-looking-dirty-means-they' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch06_008', title: 'Nutrition and Exercise Needs During Adolescence',
          caseStudy: { intro: 'Have you noticed how you seem to grow out of your clothes much faster than a few years ago?',
            decisions: [{ prompt: 'Name the three nutrients mentioned that are essential for supporting the rapid growth of muscles, bones, and blood during adolescence.', options: [
                { text: 'The three nutrients are protein (for muscle and tissue), calcium (for bones), and iron', outcome: 'The three nutrients are protein (for muscle and tissue), calcium (for bones), and iron (for blood).' },
                { text: 'growth', outcome: 'Not quite — Students often think "growth" only means getting taller and that eating "more" of anything will.', reveals: 'growth-only-means-getting-taller' },
                { text: '"growth" only means getting taller and that eating "more" of anything will help', outcome: 'Not quite — Students often think "growth" only means getting taller and that eating "more" of anything will.', reveals: 'growth-only-means-getting-taller' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_biology_ch06_008', title: 'Identify each idea',
          dissect: { specimen: 'Adolescence -- A Stage of Growth · Part 2/2', spots: [
            { id: 's1', label: 'Personal Hygiene and Care During Adolescence', prompt: 'Which idea is this? — Personal hygiene during adolescence involves the regular maintenance of cleanliness.', answer: 'Personal Hygiene and Care During Adolescence', options: ['Personal Hygiene and Care During Adolescence', 'Nutrition and Exercise Needs During Adolescence'] },
            { id: 's2', label: 'Nutrition and Exercise Needs During Adolescence', prompt: 'Which idea is this? — Adolescence is a specific stage of human growth characterized by rapid physical.', answer: 'Nutrition and Exercise Needs During Adolescence', options: ['Nutrition and Exercise Needs During Adolescence', 'Personal Hygiene and Care During Adolescence'] }
          ] } },
        { type: 'case', nodeId: 'c6_biology_ch06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In the Class 6 photo, three friends who all turned twelve this year look wildly different — one looks fifteen, one looks twelve, one still looks ten. A visiting relative whispers that somebody must be lying about their age.',
            decisions: [{ prompt: 'What is really going on?', options: [
                { text: 'Nothing is wrong — adolescence and its growth spurt start on each body\'s own schedule, somewhere in the early teens, so same-age classmates can look years apart. Bodies are not products off an assembly line with a fixed finish date; each has its own timetable.', outcome: 'The chapter\'s key idea: adolescence is a window, not a birthday — entering it at eleven or thirteen are both normal, and the height differences even out over time.' },
                { text: 'The relative is right — children of the same age should look the same, so someone is lying.', outcome: 'Same age does not mean same stage — growth spurts begin at different ages for different children, which is exactly what the photo shows.', reveals: 'same-age-same-growth' },
                { text: 'The shorter children must be sick or underfed, since healthy children always grow at the same rate.', outcome: 'A later growth spurt is not illness — healthy children simply enter adolescence at different ages within the normal window.', reveals: 'short-means-sick' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch06_008', title: 'You made it',
          caseStudy: { intro: 'Adolescence isn\'t a race with a single start line. Your body is quietly rebuilding you for adulthood — on a schedule that\'s entirely your own.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch06_007', difficulty: 'standard',
          question: 'Personal hygiene during adolescence involves the regular maintenance.',
          hint: 'Review the concept of excretion and skin health from previous biology units.',
          misconception: 'Students often believe that "not looking dirty" means they are "clean." They think that if their clothes don\'t have.',
          parts: [
                { id: 'a', prompt: 'Why do adolescents need to pay more attention to their personal hygiene than they did as children?', answer: 'Adolescents have increased activity in their sweat and oil glands',
                  options: ['Adolescents have increased activity in their sweat and oil glands', 'getting dirty', 'not looking dirty', '"not looking dirty" means they are "clean'],
                  hint: 'Review the concept of excretion and skin health from previous biology units.',
                  misconception: 'Students often believe that "not looking dirty" means they are "clean." They think that if their clothes don\'t have visible stains, they.' }
          ],
            remediations: { 'not-looking-dirty-means-they': { steps: ['First, explain that microbes and sweat are invisible to the naked eye.', 'Ask the student: "If you touch a surface with germs, do you see them?" Then, have them look at the labels of their.', 'Finally, instruct them to notice how their skin feels after a day of wear versus after a shower to physically.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "not looking dirty" means they are "clean." They think that if their clothes don\'t have.',
          parts: [
                { id: 'a', prompt: 'A friend says, "I don\'t need to bathe today because I stayed indoors and didn\'t play." How would you evaluate this statement using the concept of skin health?', answer: 'This is incorrect',
                  options: ['This is incorrect', 'not looking dirty', '"not looking dirty" means they are "clean', 'if their clothes don\'t have visible stains, they don\'t need to be washed'],
                  hint: 'Review the concept of excretion and skin health from previous biology units.',
                  misconception: 'Students often believe that "not looking dirty" means they are "clean." They think that if their clothes don\'t have visible stains, they.' }
          ],
            remediations: { 'not-looking-dirty-means-they': { steps: ['First, explain that microbes and sweat are invisible to the naked eye.', 'Ask the student: "If you touch a surface with germs, do you see them?" Then, have them look at the labels of their.', 'Finally, instruct them to notice how their skin feels after a day of wear versus after a shower to physically.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch06_008', difficulty: 'standard',
          question: 'Adolescence is a specific stage of human growth characterized by rapid.',
          hint: 'Review the "Mindful Eating" chapter to recall why we need different types of nutrients.',
          misconception: 'Students often think "growth" only means getting taller and that eating "more" of anything will help.',
          parts: [
                { id: 'a', prompt: 'If an adolescent eats only one type of food, like only carbohydrates, why might they struggle with their physical growth?', answer: 'Because growth requires building blocks like protein and minerals (calcium/iron)',
                  options: ['Because growth requires building blocks like protein and minerals (calcium/iron)', 'varied', 'growth', '"growth" only means getting taller and that eating "more" of anything will help'],
                  hint: 'Review the "Mindful Eating" chapter to recall why we need different types of nutrients.',
                  misconception: 'Students often think "growth" only means getting taller and that eating "more" of anything will help.' }
          ],
            remediations: { 'growth-only-means-getting-taller': { steps: ['First, ask the student to draw a "Construction Site" model where food types are assigned roles: Protein = Bricks.', 'Then, ask them to identify what happens to the building if you only have bricks but no cement.', 'This visual aid bridges the gap between biological needs and physical growth.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
