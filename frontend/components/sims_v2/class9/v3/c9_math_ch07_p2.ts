import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch07_p2: SimDef = {
    id: 'v3_c9_math_ch07_p2',
    title: 'Probability · Part 2/2',
    subtitle: 'The maths of \'maybe\'',
    classLevel: 9, subject: 'mathematics', topic: 'Probability · Part 2/2',
    chapters: ['c9_math_ch07'],
    nodeIds: ['c9_math_ch7_5', 'c9_math_ch7_6', 'c9_math_ch7_7', 'c9_math_ch7_8', 'c9_math_ch7_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chance investigator', intro: 'A weather app says 80% rain; a coin flips heads; a die rolls. Learn to describe uncertainty precisely — and to spot the difference between outcomes that can happen and outcomes equally likely to happen.', goal: 'Understand random experiments, possible outcomes and equally likely events — and probability as a 0-to-1 measure of chance rather than a prediction.' },
    discovery: {
        question: 'A bag holds 3 red, 5 blue, 2 green balls — all identical. You pull one blindfolded. Three outcomes: red, blue, green — so each has a 1/3 chance, right?',
        options: ['No — possible outcomes aren\'t automatically equally likely; the counts differ, so blue is likelier than red or green', 'Yes — three options always means a third each', 'Yes — if you pick fast enough', 'No — probability only works with coins'],
        answer: 'No — possible outcomes aren\'t automatically equally likely; the counts differ, so blue is likelier than red or green',
        hook: 'Random doesn\'t mean lawless — a coin can\'t be predicted on one toss, yet lands near 50/50 over a thousand. And probability 0.8 rain still leaves a real 20% dry day; only exactly 1 means \'certain.\'',
    },
    teaching: [
        { title: 'Sample Space: Listing All Possible Outcomes', text: 'The sample space (denoted by S) of a random experiment is the set of all possible outcomes of that experiment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch7_5', title: 'Your mission',
          mission: { widget: 'cycle', validate: 'cycle:heat=60',
            instruction: 'On the lab: add heat to 60 — how does the cycle respond?.',
        context: 'Sort the world into deterministic vs random experiments, list sample spaces for coins, dice and cards, and bust the gambler\'s fallacy: ten heads in a row does NOT make the eleventh toss \'due\' for tails.',
            observePrompt: 'What did the cycle interactive show you?' } },
        { type: 'case', nodeId: 'c9_math_ch7_5', title: 'Sample Space: Listing All Possible Outcomes',
          caseStudy: { intro: 'Imagine you are playing a board game where you must roll a standard die and toss a coin to determine your move.',
            decisions: [{ prompt: 'Define sample space in your own words and give the sample space for tossing a single coin.', options: [
                { text: 'Sample space is the set of all possible outcomes of a random experiment', outcome: 'Sample space is the set of all possible outcomes of a random experiment.' },
                { text: 'sample space is the probability of heads', outcome: 'Not quite — Students treat outcomes of compound experiments as unordered when the objects are identical (e.g.', reveals: 'students-treat-outcomes-of-compound' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_math_ch7_6', title: 'Events: Favourable and Total Outcomes',
          scaffold: { problem: 'A box contains 20 tickets numbered 1 to 20. One ticket is drawn at random.',
            steps: [
            { text: 'Identify the sample space. The tickets are numbered 1,2,3,...,20. Each ticket is equally likely to be drawn.' },
            { text: 'Define the event E: "number divisible by 3 or 5". We need to list numbers from 1 to 20 that satisfy this condition.' },
            { text: 'List multiples of 3 up to 20: 3, 6, 9, 12, 15, 18 → 6 numbers.' },
            { text: 'List multiples of 5 up to 20: 5, 10, 15, 20 → 4 numbers.' },
            { text: 'Notice 15 is in both lists. Using union rule: n(E) = (multiples of 3) + (multiples of 5) - (multiples of both 3 and 5.' },
            { text: 'Verify by explicit listing: {3,5,6,9,10,12,15,18,20} → 9 outcomes. Total outcomes = 20, favourable = 9.', faded: true, blankAnswer: 'Total outcomes = 20, Favourable outcomes = 9' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch7_7', title: 'Probability of an Event: Formula and Calculation',
          scaffold: { problem: 'In a school raffle, 200 tickets are sold numbered 1 to 200. One ticket is drawn at random for the first prize.',
            steps: [
            { text: 'Identify the total number of possible outcomes. Tickets are numbered 1 to 200, so n(S) = 200.' },
            { text: 'Identify the favourable outcomes – perfect squares between 1 and 200.' },
            { text: 'Apply the probability formula: P(E) = n(E) / n(S) = 14 / 200.' },
            { text: 'Simplify the fraction by dividing numerator and denominator by their HCF (2): 14/200 = 7/100.' },
            { text: 'Convert to decimal: 7/100 = 0.07. Verify: 0.07 lies between 0 and 1, and 7/100 is simplified.', faded: true, blankAnswer: '7/100 or 0.07' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch7_8', title: 'Complementary Events and Probability',
          scaffold: { problem: 'A box contains 5 red pens, 8 blue pens, and 7 black pens. One pen is picked at random. Find the probability that the pen is NOT blue.',
            steps: [
            { text: 'Identify the total number of pens. Total = 5 + 8 + 7 = 20 pens.' },
            { text: 'Find the probability of the event "pen is blue". Number of blue pens = 8. P(blue) = 8/20 = 2/5.' },
            { text: 'Recognize that "not blue" is the complement of "blue". Apply the complement rule: P(not blue) = 1 - P(blue).' },
            { text: 'Compute: P(not blue) = 1 - 2/5 = 5/5 - 2/5 = 3/5.' },
            { text: 'Verify by direct counting: Non-blue pens = red + black = 5 + 7 = 12. P(not blue) = 12/20 = 3/5. The answer matches.', faded: true, blankAnswer: '3/5' }
            ] } },
        { type: 'case', nodeId: 'c9_math_ch7_9', title: 'Impossible and Certain Events',
          caseStudy: { intro: 'Imagine rolling a standard six-sided die (faces 1, 2, 3, 4, 5, 6). What is the probability of rolling a 7?',
            decisions: [{ prompt: 'Define an impossible event and give one example.', options: [
                { text: 'An impossible event is an event with probability 0', outcome: 'An impossible event is an event with probability 0 — it has no favorable outcomes in the sample.' },
                { text: 'an event that is unlikely', outcome: 'Not quite — Students confuse "impossible" with "very unlikely" and "certain" with "very likely." The exact.', reveals: 'students-confuse-impossible-with-very' },
                { text: 'unlikely', outcome: 'Not quite — Students confuse "impossible" with "very unlikely" and "certain" with "very likely." The exact.', reveals: 'students-confuse-impossible-with-very' }
            ] }] } },
        { type: 'drill', nodeId: 'c9_math_ch7_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch7_5', title: 'Use it in the wild',
          caseStudy: { intro: 'An app shows \'rain tomorrow: 0.8.\' Neha packs for a picnic anyway, and her friend warns, \'Point eight is basically one — it will definitely rain.\' Neha counters with a coin argument.',
            decisions: [{ prompt: 'What does 0.8 actually promise?', options: [
                { text: 'An 80% chance — likely but not certain; probability 1 alone means certainty, and 0.8 leaves a live 20% for a dry day. It measures likelihood, it does not guarantee an outcome — a fair coin\'s two sides are equally likely precisely because symmetry justifies it.', outcome: 'This reads probability as quantified uncertainty — a number in [0,1] — rather than a disguised prediction.' },
                { text: 'The friend is right — any probability above a half means the event will happen.', outcome: 'Then \'80% chance of rain\' would wrongly forbid the 20% dry outcome; below 1, the complement always stays possible.', reveals: 'high-means-certain' },
                { text: 'Neha\'s coin logic misfires — every coin toss has three outcomes since it could land on its edge, so nothing is ever 50-50.', outcome: 'The edge outcome is vanishingly rare and excluded from the idealised model; \'equally likely\' covers the model\'s outcomes, not every physical possibility.', reveals: 'coin-has-three-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch7_9', title: 'You made it',
          caseStudy: { intro: 'Probability turns \'maybe\' into a number between 0 and 1 — but only when the outcomes are truly equally likely does counting them work. Chance has rules; randomness isn\'t chaos.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cycle', prompt: 'Explore the cycle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cycle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch7_5', difficulty: 'standard',
          question: 'The sample space (denoted by S) of a random experiment is the set of all.',
          hint: 'Revisit c6_math_ch09_103 (Introduction to Probability) to recall what a random experiment.',
          misconception: 'Students treat outcomes of compound experiments as unordered when the objects are identical (e.g., two coins tossed.',
          parts: [
                { id: 'a', prompt: 'Define sample space in your own words and give the sample space for tossing a single coin.', answer: 'Sample space is the set of all possible outcomes of a random experiment',
                  options: ['Sample space is the set of all possible outcomes of a random experiment', 'sample space is the probability of heads'],
                  hint: 'Revisit c6_math_ch09_103 (Introduction to Probability) to recall what a random experiment and.',
                  misconception: 'Students treat outcomes of compound experiments as unordered when the objects are identical (e.g., two coins tossed together).' },
                { id: 'b', prompt: 'Compare the sample space for "rolling one die twice" and "rolling two dice simultaneously." Are they the same or different? Justify.', answer: 'They are the same: both have 36 ordered pairs (1,1) to (6,6)',
                  options: ['They are the same: both have 36 ordered pairs (1,1) to (6,6)', 'different because one is sequential', 'same because both have 36 outcomes'],
                  hint: 'Revisit c6_math_ch09_103 (Introduction to Probability) to recall what a random experiment and.',
                  misconception: 'Students treat outcomes of compound experiments as unordered when the objects are identical (e.g., two coins tossed together).' }
          ],
            remediations: { 'students-treat-outcomes-of-compound': { steps: ['Use a tree diagram. Draw two branches for the first coin (H, T).', 'Trace each path: H→H = HH, H→T = HT, T→H = TH, T→T = TT.', 'Emphasise that even if coins are identical, the tosses are sequential in the diagram — the first branch is "first.', 'Have the student physically toss two different coins (e.g., ₹1 and ₹2) to see that (₹1=H, ₹2=T) differs from (₹1=T.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat outcomes of compound experiments as unordered when the objects are identical (e.g., two coins tossed.',
          parts: [
                { id: 'a', prompt: 'A student writes the sample space for tossing two coins as S = {HH, HT, TT}. Evaluate this answer: is it correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'it\'s correct because order doesn\'t matter'],
                  hint: 'Revisit c6_math_ch09_103 (Introduction to Probability) to recall what a random experiment and.',
                  misconception: 'Students treat outcomes of compound experiments as unordered when the objects are identical (e.g., two coins tossed together).' }
          ],
            remediations: { 'students-treat-outcomes-of-compound': { steps: ['Use a tree diagram. Draw two branches for the first coin (H, T).', 'Trace each path: H→H = HH, H→T = HT, T→H = TH, T→T = TT.', 'Emphasise that even if coins are identical, the tosses are sequential in the diagram — the first branch is "first.', 'Have the student physically toss two different coins (e.g., ₹1 and ₹2) to see that (₹1=H, ₹2=T) differs from (₹1=T.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_6', difficulty: 'standard',
          question: 'An event is a subset of the sample space of a random experiment.',
          hint: 'Revisit c9_math_ch7_5 (Sample Space) and practice listing outcomes for three coins or two.',
          misconception: 'Students treat "total outcomes" as the number of distinct categories (e.g., 3 colours) rather than distinct equally.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An event is a subset of the sample space of a random experiment',
                  options: ['An event is a subset of the sample space of a random experiment', 'Probability is the mathematical study of uncertainty that quantifies the likelihood of an', 'A tree diagram is a graphical representation used to map all possible outcomes of a', 'Probability in real-life contexts quantifies the likelihood of uncertain events using'],
                  hint: 'Revisit c9_math_ch7_5 (Sample Space) and practice listing outcomes for three coins or two dice.',
                  misconception: 'Students treat "total outcomes" as the number of distinct categories (e.g., 3 colours) rather than distinct equally likely objects (12.' }
          ],
            remediations: { 'students-treat-total-outcomes-as': { steps: ['Ask the student to physically list every outcome on paper (e.g., write R1,R2,R3,B1...).', 'Have them circle the favourable ones.', 'Count both sets.', 'For two dice, draw a 6×6 grid to show 36 ordered pairs.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_7', difficulty: 'standard',
          question: 'The theoretical probability of an event E, denoted P(E), is defined as the.',
          hint: 'If stuck, revisit c9_math_ch7_5 (Sample Space listing) and c6_math_ch03_031 (Equivalent.',
          misconception: 'Students often treat the denominator as the number of outcomes of a *different* event rather than the total outcomes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theoretical probability of an event E, denoted P(E), is defined as the ratio of the',
                  options: ['The theoretical probability of an event E, denoted P(E), is defined as the ratio of the', 'Probability is the mathematical study of uncertainty that quantifies the likelihood of an', 'A tree diagram is a graphical representation used to map all possible outcomes of a', 'Probability in real-life contexts quantifies the likelihood of uncertain events using'],
                  hint: 'If stuck, revisit c9_math_ch7_5 (Sample Space listing) and c6_math_ch03_031 (Equivalent Fractions).',
                  misconception: 'Students often treat the denominator as the number of outcomes of a *different* event rather than the total outcomes in the sample space.' }
          ],
            remediations: { 'students-often-treat-the-denominator': { steps: ['If a student makes this error, first ask them to write down the sample space S explicitly for the experiment.', 'Then ask: "Does the problem give a condition that changes the experiment?', 'Or are we drawing from the original bag?" Guide them to circle the total number of outcomes in S.', 'Then ask: "Which of these outcomes are favourable?" Count only those.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_8', difficulty: 'standard',
          question: 'Two events are complementary if one event occurs exactly when the other does.',
          hint: 'If stuck, revisit c9_math_ch7_7 (Probability of an Event: Formula and Calculation).',
          misconception: 'Students often think that any two mutually exclusive events are complementary.',
          parts: [
                { id: 'a', prompt: 'A bag contains 3 red, 4 blue, and 5 green balls. A student says the probability of not drawing a red ball is 3/12 because there are 3 red balls.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'not red', 'any two mutually exclusive events are complementary'],
                  hint: 'If stuck, revisit c9_math_ch7_7 (Probability of an Event: Formula and Calculation) to practice.',
                  misconception: 'Students often think that any two mutually exclusive events are complementary.' },
                { id: 'b', prompt: 'In a survey of 200 students, 120 said they like cricket, 50 like football, and the rest like neither.', answer: 'Step 1: Total students = 200',
                  options: ['Step 1: Total students = 200', 'any two mutually exclusive events are complementary'],
                  hint: 'If stuck, revisit c9_math_ch7_7 (Probability of an Event: Formula and Calculation) to practice.',
                  misconception: 'Students often think that any two mutually exclusive events are complementary.' },
                { id: 'c', prompt: 'Two coins are tossed simultaneously. Event A is "getting at least one head". Event B is "getting exactly one head". Are A and B complementary events?', answer: 'Sample space S = {HH, HT, TH, TT}',
                  options: ['Sample space S = {HH, HT, TH, TT}', 'opposite', 'any two mutually exclusive events are complementary'],
                  hint: 'If stuck, revisit c9_math_ch7_7 (Probability of an Event: Formula and Calculation) to practice.',
                  misconception: 'Students often think that any two mutually exclusive events are complementary.' }
          ],
            remediations: { 'any-two-mutually-exclusive-events': { steps: ['If a student makes this error, first ask them to list the full sample space of the experiment.', 'Then ask: "Does \'Win\' and \'Lose\' together include every possible outcome?" When they see \'Draw\' is missing, explain.', 'Have them write the complement of Win as {Lose, Draw} and compute P(Win) + P(Lose) + P(Draw) = 1.', 'Then show P(not Win) = P(Lose) + P(Draw) = 1 - P(Win).'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_9', difficulty: 'standard',
          question: 'Impossible and certain events are the two extreme cases of probability:.',
          hint: 'Revisit c9_math_ch7_1 (Introduction to Probability) for the basic definition and.',
          misconception: 'Students confuse "impossible" with "very unlikely" and "certain" with "very likely." The exact error: they use.',
          parts: [
                { id: 'a', prompt: 'Define an impossible event and give one example.', answer: 'An impossible event is an event with probability 0',
                  options: ['An impossible event is an event with probability 0', 'an event that is unlikely', 'unlikely', 'impossible'],
                  hint: 'Revisit c9_math_ch7_1 (Introduction to Probability) for the basic definition and c9_math_ch7_2.',
                  misconception: 'Students confuse "impossible" with "very unlikely" and "certain" with "very likely." The exact error: they use "impossible" for events with.' },
                { id: 'b', prompt: 'Define a certain event and give one example.', answer: 'A certain event is an event with probability 1',
                  options: ['A certain event is an event with probability 1', 'an event that is very likely', 'very likely', 'certain'],
                  hint: 'Revisit c9_math_ch7_1 (Introduction to Probability) for the basic definition and c9_math_ch7_2.',
                  misconception: 'Students confuse "impossible" with "very unlikely" and "certain" with "very likely." The exact error: they use "impossible" for events with.' },
                { id: 'c', prompt: 'Classify each of the following as impossible, certain, or neither: (a) Drawing a red ball from a bag containing only blue balls.', answer: 'Drawing a red ball from a bag containing only blue balls',
                  options: ['Drawing a red ball from a bag containing only blue balls', 'certain', 'impossible', 'very unlikely'],
                  hint: 'Revisit c9_math_ch7_1 (Introduction to Probability) for the basic definition and c9_math_ch7_2.',
                  misconception: 'Students confuse "impossible" with "very unlikely" and "certain" with "very likely." The exact error: they use "impossible" for events with.' },
                { id: 'd', prompt: 'Explain why the probability of any event must lie between 0 and 1 inclusive.', answer: 'Probability = (favorable outcomes) / (total outcomes)',
                  options: ['Probability = (favorable outcomes) / (total outcomes)', 'because probability is a percentage', 'impossible', 'very unlikely'],
                  hint: 'Revisit c9_math_ch7_1 (Introduction to Probability) for the basic definition and c9_math_ch7_2.',
                  misconception: 'Students confuse "impossible" with "very unlikely" and "certain" with "very likely." The exact error: they use "impossible" for events with.' }
          ],
            remediations: { 'students-confuse-impossible-with-very': { steps: ['Draw a probability scale from 0 to 1 on the board.', 'Mark: 0 = impossible, 1 = certain, 0.5 = equally likely.', 'Give events and have students place them on the scale: "rolling a 7 on a die" (0), "rolling 1-6 on a die" (1), "rolling.', 'Emphasize: 0 means NO favorable outcomes, 1 means ALL outcomes favorable.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
