import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch08_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch08_p2: SimDef = {
    id: 'v3_c6_physics_ch08_p2',
    title: 'Measurement of Time and Motion · Part 2/2',
    subtitle: 'This node covers the basic definition of a pendulum, its role in time measurement, and.',
    classLevel: 6, subject: 'physics', topic: 'Measurement of Time and Motion · Part 2/2',
    chapters: ['c6_physics_ch08'],
    nodeIds: ['c6_physics_ch08_033', 'c6_physics_ch08_027'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever noticed how a swing in a park moves forward and backward repeatedly?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A stick in the ground tells perfect time all sunny afternoon — its shadow crawling like a clock hand. But at midnight it is completely useless. Why?',
        options: ['A sundial needs sunlight to cast a shadow — and the shadow moves only because the sun appears to shift as Earth rotates', 'The stick gets tired and stops working at night', 'Moonlight is too weak to ever make any shadow', 'Sundials need to be wound up every evening'],
        answer: 'A sundial needs sunlight to cast a shadow — and the shadow moves only because the sun appears to shift as Earth rotates',
        hook: 'The stick never moves — Earth does. The sun only appears to travel across the sky because our planet spins, and it is that shifting light angle that drags the shadow around the dial.',
    },
    teaching: [
        { title: 'The Pendulum and Time Measurement', text: 'A simple pendulum is a device consisting of a small weight (bob) suspended from a fixed point by a thread, which repeats its to-and-fro motion in equal intervals of time.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch08_033', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'Plant a stick in open ground, mark its shadow tip with a pebble every hour, and figure out why a cloudy day defeats your homemade clock.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch08_033', title: 'The Pendulum and Time Measurement',
          caseStudy: { intro: 'Have you ever noticed how a swing in a park moves forward and backward repeatedly?',
            decisions: [{ prompt: 'What do we call the motion of a pendulum where it moves to and fro about a fixed position?', options: [
                { text: 'This is called oscillatory motion', outcome: 'This is called oscillatory motion. A wrong answer like "linear motion" suggests the student does.' },
                { text: 'linear motion', outcome: 'Not quite — Students often believe that the "heavier the bob, the faster it swings" or that "the harder you.', reveals: 'the-heavier-the-bob' },
                { text: 'to and fro', outcome: 'Not quite — Students often believe that the "heavier the bob, the faster it swings" or that "the harder you.', reveals: 'the-heavier-the-bob' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch08_034', title: 'Units of Time and Their Conversions',
          scaffold: { problem: 'A student takes 2 hours and 15 minutes to complete their homework. How many minutes did they spend in total?',
            steps: [
            { text: 'Identify given time: 2 hours and 15 minutes.' },
            { text: 'Convert hours to minutes using the rule 1 hour = 60 minutes.' },
            { text: 'Calculate: 2 hours × 60 minutes/hour = 120 minutes.' },
            { text: 'Add the extra minutes: 120 minutes + 15 minutes = 135 minutes.' },
            { text: 'Conclude the total time is 135 minutes.', faded: true, blankAnswer: '135 minutes' }
            ] } },
        { type: 'case', nodeId: 'c6_physics_ch08_033', title: 'Use it in the wild',
          caseStudy: { intro: 'The school garden club builds a sundial to time their plants\' watering schedule. It works beautifully — until a cloudy week and an early-evening session leave them staring at a shadowless dial. \'The sundial is broken,\' someone says.',
            decisions: [{ prompt: 'Is the sundial broken — and why did people invent water clocks at all?', options: [
                { text: 'It is working exactly as designed — a sundial can only read time while the sun shines on it, so clouds and nights blind it completely. That is precisely why ancient civilisations added water clocks and sand clocks: those keep ticking in the dark, indoors, and in any weather. The sundial\'s limits, not its failure, are on display.', outcome: 'Each timekeeping tool covers the others\' gaps — the sundial\'s dependence on sunlight is the reason other clocks were invented to work without the sky.' },
                { text: 'The sundial is broken — a properly built sundial works at any hour in any weather.', outcome: 'No sundial works without a shadow — sunlight is its input, so cloud cover and night are not malfunctions but the design\'s limit.', reveals: 'sundial-works-anytime' },
                { text: 'They should have built a bigger sundial — a larger shadow works even without much sun.', outcome: 'Size does not create light — with no sun there is no shadow at any scale, which is why the ancients switched to dripping water or falling sand.', reveals: 'bigger-sundial-fixes-night' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch08_034', title: 'You made it',
          caseStudy: { intro: 'The first clock was a shadow. It worked beautifully — as long as the biggest light in the sky was switched on.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch08_033', difficulty: 'standard',
          question: 'A simple pendulum is a device consisting of a small weight (bob) suspended from.',
          hint: 'Review the definitions of oscillatory vs linear motion in the previous chapter.',
          misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the.',
          parts: [
                { id: 'a', prompt: 'What do we call the motion of a pendulum where it moves to and fro about a fixed position?', answer: 'This is called oscillatory motion',
                  options: ['This is called oscillatory motion', 'linear motion', 'to and fro', 'heavier the bob, the faster it swings'],
                  hint: 'Review the definitions of oscillatory vs linear motion in the previous chapter.',
                  misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the period must be." This.' },
                { id: 'b', prompt: 'If you pull a pendulum bob a little further to the side than before, does the time taken for one full swing change significantly?', answer: 'No, the time (period) remains the same',
                  options: ['No, the time (period) remains the same', 'isochronism', 'heavier the bob, the faster it swings', 'the harder you push, the longer the period must be'],
                  hint: 'Review the definitions of oscillatory vs linear motion in the previous chapter.',
                  misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the period must be." This.' },
                { id: 'c', prompt: 'A pendulum has a string of a certain length. If you replace the bob with a heavier one but keep the string length the same, what happens to the time for one.', answer: 'The time remains unchanged',
                  options: ['The time remains unchanged', 'heavier the bob, the faster it swings', 'the harder you push, the longer the period must be'],
                  hint: 'Review the definitions of oscillatory vs linear motion in the previous chapter.',
                  misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the period must be." This.' }
          ],
            remediations: { 'the-heavier-the-bob': { steps: ['Ask the student to perform a "Pendulum Race." Have them use two strings of the same length, one with a paperclip and.', 'Ask them to count how many swings both make in 30 seconds.', 'When they see the counts are the same, explain that the "rhythm" is set by the string length, not the weight.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_033', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the.',
          parts: [
                { id: 'a', prompt: 'If two pendulums have different string lengths, will they have the same time period?', answer: 'No, the longer pendulum will take more time for a full swing',
                  options: ['No, the longer pendulum will take more time for a full swing', 'heavier the bob, the faster it swings', 'the harder you push, the longer the period must be'],
                  hint: 'Review the definitions of oscillatory vs linear motion in the previous chapter.',
                  misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the period must be." This.' }
          ],
            remediations: { 'the-heavier-the-bob': { steps: ['Ask the student to perform a "Pendulum Race." Have them use two strings of the same length, one with a paperclip and.', 'Ask them to count how many swings both make in 30 seconds.', 'When they see the counts are the same, explain that the "rhythm" is set by the string length, not the weight.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_034', difficulty: 'standard',
          question: 'Time is a physical quantity used to measure the duration of events or the.',
          hint: 'Review basic multiplication tables for 6.',
          misconception: 'Students often assume that all time conversions use a factor of 10, similar to the metric system for length (10 mm = 1.',
          parts: [
                { id: 'a', prompt: 'What is the basic SI unit of time? Answer: The second. Wrong answer reveals: The student is confusing the SI unit of length (metre) with the SI unit of time.', answer: 'The basic SI unit of time is the second',
                  options: ['The basic SI unit of time is the second', 'minute'],
                  hint: 'Review basic multiplication tables for 6.',
                  misconception: 'Students often assume that all time conversions use a factor of 10, similar to the metric system for length (10 mm = 1 cm).' }
          ],
            remediations: { 'all-time-conversions-use-a': { steps: ['Remind the student that time is special and does not follow the base-10 pattern.', 'Have them write out a table: "1 minute = 60 seconds", "1 hour = 60 minutes".', 'Ask them to physically count 60 seconds with a stopwatch to see that it takes a "full minute," reinforcing that the.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
