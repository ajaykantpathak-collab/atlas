import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch14_p1: SimDef = {
    id: 'v3_c10_math_ch14_p1',
    title: 'Probability · Part 1/2',
    subtitle: 'Learn why \'it happens or it doesn\'t\' is bad maths',
    classLevel: 10, subject: 'mathematics', topic: 'Probability · Part 1/2',
    chapters: ['c10_math_ch14'],
    nodeIds: ['c10_math_cbse_14_001', 'c10_math_cbse_14_002', 'c10_math_cbse_14_003', 'c10_math_cbse_14_004', 'c10_math_cbse_14_005', 'c10_math_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a game analyst rating fair chances', intro: 'A friend insists the lottery is 50-50: \'either I win or I don\'t.\' Tonight you learn to count outcomes honestly — and see why casinos, card games and weather forecasts all run on favourable-over-total.', goal: 'Apply the classical probability formula to simple experiments and reason correctly about equally likely outcomes.' },
    discovery: {
        question: 'A coin lands heads 5 times in a row. What is the chance of heads on flip six?',
        options: ['Still 1/2 — the coin has no memory', 'Less than 1/2 — tails is \'due\'', 'More than 1/2 — heads is \'hot\'', 'It depends on the coin\'s weight'],
        answer: 'Still 1/2 — the coin has no memory',
        hook: 'The gambler\'s fallacy has bankrupted real people. Probability does not keep score.',
    },
    teaching: [
        { title: 'Classical Definition of Probability: Equally Likely Outcomes', text: 'The classical definition of probability states that if an experiment has n equally likely outcomes and m of them are favourable to an event E, then the probability of event E is P(E) = m/n, where 0 ≤.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_14_001', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Assign honest probabilities to cards, coins, dice and coloured balls — count sample spaces carefully, and catch the trap where \'happens or doesn\'t\' is not the same as 50–50.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c10_math_cbse_14_001', title: 'Classical Definition of Probability: Equally Likely Outcomes',
          caseStudy: { intro: 'Imagine tossing a fair coin. There are two possible outcomes: Heads (H) and Tails (T). Both are equally likely — neither is favoured.',
            decisions: [{ prompt: 'State the classical definition of probability.', options: [
                { text: 'If an experiment has n equally likely outcomes and m of them are favourable to event E,', outcome: 'If an experiment has n equally likely outcomes and m of them are favourable to event E, then P(E).' },
                { text: 'equally likely', outcome: 'Not quite — Students often forget the "equally likely" condition and apply the classical formula to biased.', reveals: 'students-often-forget-the-equally' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_003', title: 'Probability of an Event: Formula P(E) = Favourable / Total',
          scaffold: { problem: 'A box contains 12 red marbles, 8 blue marbles, and 5 green marbles. One marble is drawn at random.',
            steps: [
            { text: 'Identify the total number of marbles. Total = 12 red + 8 blue + 5 green = 25 marbles. So n(S) = 25.' },
            { text: 'For (i) event E1 = "marble is red". Favourable outcomes = number of red marbles = 12. So n(E1) = 12.' },
            { text: 'Apply formula P(E1) = n(E1)/n(S) = 12/25. This fraction is already in simplest form (HCF of 12 and 25 is 1).' },
            { text: 'For (ii) event E2 = "marble is not blue". Favourable outcomes = marbles that are not blue = red + green = 12 + 5 = 17.' },
            { text: 'Apply formula P(E2) = n(E2)/n(S) = 17/25. Check: P(blue) = 8/25, so P(not blue) = 1 - 8/25 = 17/25. Matches.', faded: true, blankAnswer: '(i) 12/25 (ii) 17/25' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_004', title: 'Elementary Events and Their Probabilities',
          scaffold: { problem: 'A game uses a spinner with 10 equal sectors numbered 1 to 10. The spinner is spun once. (a) List all elementary events.',
            steps: [
            { text: 'Identify the experiment — spinning a numbered spinner once. The outcomes are the numbers 1 through 10.' },
            { text: 'Write the sample space S = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}. Each outcome is an elementary event: e1={1}, e2={2}, ...' },
            { text: 'For a fair spinner, outcomes are equally likely. Probability of each elementary event = 1/n = 1/10 = 0.1.' },
            { text: 'Sum of probabilities = 10 × (1/10) = 1. Verified.' },
            { text: 'For the biased spinner: P(e10) = 0.3. Let x be the probability of each of the other 9 elementary events.', faded: true, blankAnswer: '(a) Elementary events.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_005', title: 'Complementary Events: P(E) + P(not E) = 1',
          scaffold: { problem: 'A bag contains 3 red balls, 5 white balls, and 7 black balls. A ball is drawn at random from the bag.',
            steps: [
            { text: 'Find the total number of balls in the bag. Total = 3 (red) + 5 (white) + 7 (black) = 15 balls.' },
            { text: 'For (i) not red, first find P(red). Number of red balls = 3. P(red) = 3/15 = 1/5.' },
            { text: 'Apply the complement rule: P(not red) = 1 - P(red) = 1 - 1/5 = 4/5.' },
            { text: 'For (ii) not white, P(white) = 5/15 = 1/3. P(not white) = 1 - 1/3 = 2/3.' },
            { text: 'For (iii) not black, P(black) = 7/15. P(not black) = 1 - 7/15 = 8/15.' },
            { text: 'Verify each answer by direct counting: non-red = 5+7=12 → 12/15=4/5; non-white = 3+7=10 → 10/15=2/3; non-black = 3+5=8.', faded: true, blankAnswer: '(i) 4/5, (ii) 2/3, (iii) 8/15' }
            ] } },
        { type: 'case', nodeId: 'c10_math_cbse_14_006', title: 'Impossible and Certain Events: Probability 0 and 1',
          caseStudy: { intro: 'Roll a standard die numbered 1 to 6. The event "rolling a 7" is impossible — there is no 7 on the die, so m = 0 and P(7) = 0/6 = 0.',
            decisions: [{ prompt: 'Define an impossible event and a certain event in terms of probability.', options: [
                { text: 'An impossible event has P(E) = 0 (no favourable outcomes, m = 0)', outcome: 'An impossible event has P(E) = 0 (no favourable outcomes, m = 0).' },
                { text: 'impossible means P < 0', outcome: 'Not quite — Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has.', reveals: 'students-sometimes-think-p-e' },
                { text: 'the event happens every time in any context', outcome: 'Not quite — Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has.', reveals: 'students-sometimes-think-p-e' }
            ] }] } },
        { type: 'drill', nodeId: 'c10_math_cbse_14_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school fair, a game stall offers: draw one marble blindfolded from a bag of 20 — 8 green, 7 yellow, 5 blue — and win a prize only on blue. The stallholder calls it \'a fair game, one-in-three colours.\'',
            decisions: [{ prompt: 'Is the game fair?', options: [
                { text: 'No — probability counts marbles, not colour names. P(blue) = 5/20 = 1/4, so a player wins only one draw in four while the stall keeps the other three quarters. \'Three colours\' does not mean three equal chances — the counts of each colour decide the odds.', outcome: 'This is the core of probability: each marble is equally likely, so uneven counts make the colours uneven — a classic way \'fair-looking\' games are tilted.' },
                { text: 'The stallholder is right — with three colours the chance of any one is one in three, so the game is fair.', outcome: 'Colours are not outcomes — marbles are. With only 5 blue among 20, blue\'s chance is 1/4, not 1/3, and the stall quietly profits from the difference.', reveals: 'equal-colours-equal-chance' },
                { text: 'The game is unfair only if marbles are removed mid-game — with a fixed bag the stated odds must be true.', outcome: 'A fixed bag still hides uneven counts; the fairness depends on how many blue marbles there are, not on whether the bag changes.', reveals: 'fixed-bag-means-fair' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'Sample spaces, events, odds — you now think in likelihoods, not gut feelings. That is a life skill disguised as math.',
            decisions: [{ prompt: 'What comes next? Probability · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Probability · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_14_001', difficulty: 'standard',
          question: 'The classical definition of probability states that if an experiment has.',
          hint: 'Review basic probability experiments (c9_math_ch7_1). Practice listing all outcomes.',
          misconception: 'Students often forget the "equally likely" condition and apply the classical formula to biased experiments.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The classical definition of probability states that if an experiment has n equally likely',
                  options: ['The classical definition of probability states that if an experiment has n equally likely', 'The sample space of a random experiment is the set of all possible outcomes of that', 'The probability of an event E, denoted P(E), is defined as the ratio of the number of', 'An elementary event is an event that consists of exactly one outcome of a random'],
                  hint: 'Review basic probability experiments (c9_math_ch7_1). Practice listing all outcomes of coin tosses.',
                  misconception: 'Students often forget the "equally likely" condition and apply the classical formula to biased experiments.' }
          ],
            remediations: { 'students-often-forget-the-equally': { steps: ['List all possible outcomes of the experiment before counting favourable ones.', 'Verify that outcomes are equally likely (fair coin, fair die, well-shuffled deck, well-mixed bag).', 'Check: P(E) = m/n where m ≤ n, so the fraction should be ≤ 1.', 'If it\'s > 1, something is wrong.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_002', difficulty: 'standard',
          question: 'The sample space of a random experiment is the set of all possible outcomes.',
          hint: 'If stuck, revisit Class 9 node c9_math_ch7_5 (Sample Space: Listing All Possible.',
          misconception: 'Students often treat unordered pairs as outcomes in multi-trial experiments.',
          parts: [
                { id: 'a', prompt: 'When rolling a single die, a student defines event E = {2, 4, 6} and event F = {1, 3, 5}. The student claims E and F are complementary events.', answer: 'Yes, the claim is correct',
                  options: ['Yes, the claim is correct', 'complementary', 'equally likely'],
                  hint: 'If stuck, revisit Class 9 node c9_math_ch7_5 (Sample Space: Listing All Possible Outcomes) and.',
                  misconception: 'Students often treat unordered pairs as outcomes in multi-trial experiments.' }
          ],
            remediations: { 'students-often-treat-unordered-pairs': { steps: ['Remediation: 1) Use two differently coloured dice (red and blue) to physically demonstrate that (Red=2, Blue=5) and.', '2) Have the student roll the pair 36 times and tally each ordered pair; they will see each occurs roughly equally often.', '3) Then tally unordered pairs; they will see "2 and 5" occurs about twice as often as "3 and 3".', '4) Explicitly state the rule: "When trials are sequential or objects are distinct, outcomes are ordered tuples.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_003', difficulty: 'standard',
          question: 'The probability of an event E, denoted P(E), is defined as the ratio of the.',
          hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space and Events) to practice writing.',
          misconception: 'Students often write the denominator as the number of unfavourable outcomes instead of the total outcomes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The probability of an event E, denoted P(E), is defined as the ratio of the number of',
                  options: ['The probability of an event E, denoted P(E), is defined as the ratio of the number of', 'The classical definition of probability states that if an experiment has n equally likely', 'The sample space of a random experiment is the set of all possible outcomes of that', 'An elementary event is an event that consists of exactly one outcome of a random'],
                  hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space and Events) to practice writing sample spaces.',
                  misconception: 'Students often write the denominator as the number of unfavourable outcomes instead of the total outcomes.' }
          ],
            remediations: { 'students-often-write-the-denominator': { steps: ['If a student makes the denominator error, have them physically list all outcomes on paper: "Write every single outcome.', 'Ask: "Does each outcome have the same chance?" If not, the sample space is wrong.', 'For simplification, remind them of the fraction reduction rule from Class 6 (c6_math_ch03_031): divide numerator and.', 'Practice with 5-10 similar problems until they consistently write n(S) correctly and simplify.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the denominator as the number of unfavourable outcomes instead of the total outcomes.',
          parts: [
                { id: 'a', prompt: 'A teacher claims: "In a class of 40 students, 25 like cricket and 15 like football.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'odds in favour', 'probability'],
                  hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space and Events) to practice writing sample spaces.',
                  misconception: 'Students often write the denominator as the number of unfavourable outcomes instead of the total outcomes.' }
          ],
            remediations: { 'students-often-write-the-denominator': { steps: ['If a student makes the denominator error, have them physically list all outcomes on paper: "Write every single outcome.', 'Ask: "Does each outcome have the same chance?" If not, the sample space is wrong.', 'For simplification, remind them of the fraction reduction rule from Class 6 (c6_math_ch03_031): divide numerator and.', 'Practice with 5-10 similar problems until they consistently write n(S) correctly and simplify.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_004', difficulty: 'standard',
          question: 'An elementary event is an event that consists of exactly one outcome of.',
          hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space and Events) and practice writing.',
          misconception: 'Students often confuse "elementary event" with "any event that seems simple".',
          parts: [
                { id: 'a', prompt: 'In a random experiment of tossing two coins simultaneously, list all elementary events and state the probability of each elementary event.', answer: 'The sample space is S = {HH, HT, TH, TT}',
                  options: ['The sample space is S = {HH, HT, TH, TT}', 'elementary event', 'any event that seems simple', 'only 3 outcomes like {HH, HT, TT} or giving probability 1/3'],
                  hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space and Events) and practice writing sample spaces.',
                  misconception: 'Students often confuse "elementary event" with "any event that seems simple".' },
                { id: 'b', prompt: 'A bag contains 3 red balls, 4 blue balls, and 5 green balls. One ball is drawn at random.', answer: 'The elementary events are the individual balls, not the colours',
                  options: ['The elementary events are the individual balls, not the colours', 'elementary event', 'any event that seems simple'],
                  hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space and Events) and practice writing sample spaces.',
                  misconception: 'Students often confuse "elementary event" with "any event that seems simple".' },
                { id: 'c', prompt: 'A fair die is rolled once. Let E1 be the event "getting a prime number", E2 be "getting an even number", and E3 be "getting a number less than 3".', answer: 'Sample space S = {1,2,3,4,5,6}',
                  options: ['Sample space S = {1,2,3,4,5,6}', 'elementary event', 'any event that seems simple'],
                  hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space and Events) and practice writing sample spaces.',
                  misconception: 'Students often confuse "elementary event" with "any event that seems simple".' },
                { id: 'd', prompt: 'In an experiment, the sample space consists of 5 elementary events: e1, e2, e3, e4, e5. Their probabilities are P(e1)=0.1, P(e2)=0.2, P(e3)=0.3, P(e4)=0.15.', answer: 'Sum of known probabilities = 0.1+0.2+0.3+0.15 = 0.75',
                  options: ['Sum of known probabilities = 0.1+0.2+0.3+0.15 = 0.75', 'elementary event', 'any event that seems simple'],
                  hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space and Events) and practice writing sample spaces.',
                  misconception: 'Students often confuse "elementary event" with "any event that seems simple".' }
          ],
            remediations: { 'students-often-confuse-elementary-event': { steps: ['If a student makes this error, immediately have them write the sample space as a set of individual outcomes (not.', 'Use a concrete manipulative: lay out 52 actual cards or 12 numbered balls.', 'Ask: "If I pick one object, what are the distinct things I could pick?" Each distinct object is an elementary event.', 'Then group them into categories (suits, colours) to show those are unions of elementary events.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_005', difficulty: 'standard',
          question: 'For any event E in a random experiment with equally likely outcomes, the.',
          hint: 'Revisit c10_math_cbse_14_002 (Sample Space and Events) and c10_math_cbse_14_003.',
          misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are.',
          parts: [
                { id: 'a', prompt: 'State the formula that relates the probability of an event E and the probability of its complementary event \'not E\'.', answer: 'The formula is P(E) + P(not E) = 1, or equivalently P(not E) = 1 - P(E)',
                  options: ['The formula is P(E) + P(not E) = 1, or equivalently P(not E) = 1 - P(E)', 'opposites', 'sunshine'],
                  hint: 'Revisit c10_math_cbse_14_002 (Sample Space and Events) and c10_math_cbse_14_003 (Probability.',
                  misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are complementary.' },
                { id: 'b', prompt: 'A student says: "If the probability of rain tomorrow is 0.3, then the probability of no rain is 0.7.', answer: 'Yes, the student is correct',
                  options: ['Yes, the student is correct', 'it only works for 0.3 and 0.7', 'opposites', 'sunshine'],
                  hint: 'Revisit c10_math_cbse_14_002 (Sample Space and Events) and c10_math_cbse_14_003 (Probability.',
                  misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are complementary.' },
                { id: 'c', prompt: 'A box contains 5 red, 8 blue, and 7 green marbles. One marble is drawn at random. Find the probability that the marble drawn is NOT blue.', answer: 'Total marbles = 5 + 8 + 7 = 20',
                  options: ['Total marbles = 5 + 8 + 7 = 20', 'opposites', 'sunshine'],
                  hint: 'Revisit c10_math_cbse_14_002 (Sample Space and Events) and c10_math_cbse_14_003 (Probability.',
                  misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are complementary.' },
                { id: 'd', prompt: 'In a single throw of a die, let E be the event "getting a prime number". Let F be the event "getting an even number". Are E and F complementary events?', answer: 'Sample space S = {1,2,3,4,5,6}',
                  options: ['Sample space S = {1,2,3,4,5,6}', 'yes, because they are different', 'different events', 'complementary events'],
                  hint: 'Revisit c10_math_cbse_14_002 (Sample Space and Events) and c10_math_cbse_14_003 (Probability.',
                  misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are complementary.' }
          ],
            remediations: { 'any-two-events-that-are': { steps: ['If a student incorrectly identifies complementary events, first have them list the sample space S.', 'Then list outcomes of E and outcomes of the proposed complement F.', 'Check two conditions: (1) E ∩ F = ∅ (no common outcomes) and (2) E ∪ F = S (together they cover all outcomes).', 'If either fails, they are not complements.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_006', difficulty: 'standard',
          question: 'An impossible event has probability 0 — it can never occur under any.',
          hint: 'Review the classical definition (c10_math_cbse_14_001). Practice listing sample spaces.',
          misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes.',
          parts: [
                { id: 'a', prompt: 'Define an impossible event and a certain event in terms of probability.', answer: 'An impossible event has P(E) = 0 (no favourable outcomes, m = 0)',
                  options: ['An impossible event has P(E) = 0 (no favourable outcomes, m = 0)', 'impossible means P < 0', 'the event happens every time in any context'],
                  hint: 'Review the classical definition (c10_math_cbse_14_001). Practice listing sample spaces and counting.',
                  misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes in the given sample.' },
                { id: 'b', prompt: 'When rolling a die, what is the probability of rolling a number greater than 6?', answer: 'P(number > 6) = 0 (impossible event)',
                  options: ['P(number > 6) = 0 (impossible event)', 'the event happens every time in any context'],
                  hint: 'Review the classical definition (c10_math_cbse_14_001). Practice listing sample spaces and counting.',
                  misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes in the given sample.' },
                { id: 'c', prompt: 'When drawing a card from a standard 52-card deck, what is the probability of drawing a card that is either red or black?', answer: 'Every card is either red or black, so all 52 outcomes are favourable',
                  options: ['Every card is either red or black, so all 52 outcomes are favourable', 'the event happens every time in any context'],
                  hint: 'Review the classical definition (c10_math_cbse_14_001). Practice listing sample spaces and counting.',
                  misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes in the given sample.' }
          ],
            remediations: { 'students-sometimes-think-p-e': { steps: ['List the full sample space before classifying an event.', 'Count favourable outcomes: if m = 0, the event is impossible (P = 0); if m = n, it is certain (P = 1).', 'Check: is the answer between 0 and 1?', 'If not, recheck the counting.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
