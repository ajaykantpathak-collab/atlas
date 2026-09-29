import type { SimDef } from '../../engine/types';
import C10_MathematicsProbabilitySim from '../../../simulations/c6_12/C10_MathematicsProbabilitySim';

/** v3 wrapped master — C10_MathematicsProbabilitySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicsprobabilitysim: SimDef = {
    id: 'v3w_c10_mathematicsprobabilitysim',
    title: 'Classical Definition of Probability: Equally Likely Outcomes',
    subtitle: 'This node covers the classical definition of probability with equally likely outcomes and.',
    classLevel: 10, subject: 'mathematics', topic: 'Classical Definition of Probability: Equally Likely Outcomes',
    chapters: [],
    nodeIds: ['c10_math_cbse_14_001', 'c10_math_cbse_14_002', 'c10_math_cbse_14_003', 'c10_math_cbse_14_004', 'c10_math_cbse_14_005', 'c10_math_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine tossing a fair coin. There are two possible outcomes: Heads (H) and Tails (T).', goal: 'Master Classical Definition of Probability: Equally Likely Outcomes.' },
    discovery: {
        question: 'When rolling a single die, a student defines event E = {2, 4, 6} and event F = {1, 3, 5}. The student claims E and F are complementary events.',
        options: ['Yes, the claim is correct', 'complementary', 'equally likely'],
        answer: 'Yes, the claim is correct',
        hook: 'Students often treat unordered pairs as outcomes in multi-trial experiments.',
    },
    teaching: [
        { title: 'The classical definition of probability.', text: 'The classical definition of probability states that if an experiment has n equally likely outcomes and m of them are favourable to an event E, then the probability of event E is P(E) = m/n, where 0 ≤.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_001', title: 'The classical definition of probability.',
          scaffold: { problem: 'A fair die is rolled once. Find the probability of getting (a) a prime number, (b) a number divisible by 3, (c) an odd number.',
            steps: [
            { text: 'Sample space S = {1, 2, 3, 4, 5, 6}, n = 6. All outcomes equally likely.' },
            { text: '(a) Prime numbers in S: {2, 3, 5}, m = 3. P(prime) = 3/6 = 1/2.' },
            { text: '(b) Numbers divisible by 3: {3, 6}, m = 2. P(divisible by 3) = 2/6 = 1/3.' },
            { text: '(c) Odd numbers: {1, 3, 5}, m = 3. P(odd) = 3/6 = 1/2.' },
            { text: 'Verify: All probabilities are between 0 and 1. ✓', faded: true, blankAnswer: '(a) P(prime) = 1/2. (b) P(divisible by 3) = 1/3. (c) P(odd).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_002', title: 'The sample space of a random experiment.',
          scaffold: { problem: 'A game at a school fair uses a spinner divided into 4 equal sectors coloured Red, Blue, Green, Yellow and a standard six-faced die numbered.',
            steps: [
            { text: 'Identify the two independent trials: Trial 1 = spin spinner (4 outcomes: R, B, G, Y).' },
            { text: 'Determine the total number of outcomes using the counting principle: 4 × 6 = 24 outcomes.' },
            { text: 'Construct the sample space systematically by pairing each spinner outcome with each die outcome.' },
            { text: 'Identify the event E: "Spinner shows primary colour (R, B, Y) AND die shows even number (2,4,6)".' },
            { text: 'Form all ordered pairs combining {R, B, Y} with {2, 4, 6}. E = {(R,2), (R,4), (R,6), (B,2), (B,4), (B,6), (Y,2), (Y,4),.', faded: true, blankAnswer: 'Sample space S has 24 outcomes as listed. Event E = {(R,2),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_003', title: 'The probability of an event E, denoted.',
          scaffold: { problem: 'A box contains 12 red marbles, 8 blue marbles, and 5 green marbles. One marble is drawn at random.',
            steps: [
            { text: 'Identify the total number of marbles. Total = 12 red + 8 blue + 5 green = 25 marbles. So n(S) = 25.' },
            { text: 'For (i) event E1 = "marble is red". Favourable outcomes = number of red marbles = 12. So n(E1) = 12.' },
            { text: 'Apply formula P(E1) = n(E1)/n(S) = 12/25. This fraction is already in simplest form (HCF of 12 and 25 is 1).' },
            { text: 'For (ii) event E2 = "marble is not blue". Favourable outcomes = marbles that are not blue = red + green = 12 + 5 = 17.' },
            { text: 'Apply formula P(E2) = n(E2)/n(S) = 17/25. Check: P(blue) = 8/25, so P(not blue) = 1 - 8/25 = 17/25. Matches.', faded: true, blankAnswer: '(i) 12/25 (ii) 17/25' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_004', title: 'An elementary event is an event that.',
          scaffold: { problem: 'A game uses a spinner with 10 equal sectors numbered 1 to 10. The spinner is spun once. (a) List all elementary events.',
            steps: [
            { text: 'Identify the experiment — spinning a numbered spinner once. The outcomes are the numbers 1 through 10.' },
            { text: 'Write the sample space S = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}. Each outcome is an elementary event: e1={1}, e2={2}, ...,.' },
            { text: 'For a fair spinner, outcomes are equally likely. Probability of each elementary event = 1/n = 1/10 = 0.1.' },
            { text: 'Sum of probabilities = 10 × (1/10) = 1. Verified.' },
            { text: 'For the biased spinner: P(e10) = 0.3. Let x be the probability of each of the other 9 elementary events.', faded: true, blankAnswer: '(a) Elementary events:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_005', title: 'For any event E in a random experiment.',
          scaffold: { problem: 'A bag contains 3 red balls, 5 white balls, and 7 black balls. A ball is drawn at random from the bag.',
            steps: [
            { text: 'Find the total number of balls in the bag. Total = 3 (red) + 5 (white) + 7 (black) = 15 balls.' },
            { text: 'For (i) not red, first find P(red). Number of red balls = 3. P(red) = 3/15 = 1/5.' },
            { text: 'Apply the complement rule: P(not red) = 1 - P(red) = 1 - 1/5 = 4/5.' },
            { text: 'For (ii) not white, P(white) = 5/15 = 1/3. P(not white) = 1 - 1/3 = 2/3.' },
            { text: 'For (iii) not black, P(black) = 7/15. P(not black) = 1 - 7/15 = 8/15.' },
            { text: 'Verify each answer by direct counting: non-red = 5+7=12 → 12/15=4/5; non-white = 3+7=10 → 10/15=2/3; non-black = 3+5=8.', faded: true, blankAnswer: '(i) 4/5, (ii) 2/3, (iii) 8/15' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_006', title: 'An impossible event has probability 0 —.',
          scaffold: { problem: 'A die is rolled once. Classify each of the following events as impossible, certain, or probable, and give the probability: (a) rolling a.',
            steps: [
            { text: 'Sample space S = {1, 2, 3, 4, 5, 6}, n = 6.' },
            { text: '(a) Numbers less than 7: {1, 2, 3, 4, 5, 6}, m = 6. P = 6/6 = 1. CERTAIN event.' },
            { text: '(b) Numbers greater than 7: none, m = 0. P = 0/6 = 0. IMPOSSIBLE event.' },
            { text: '(c) Even numbers: {2, 4, 6}, m = 3. P = 3/6 = 1/2. PROBABLE event.' },
            { text: 'Verify: 0 ≤ 1/2 ≤ 1 ✓. All classifications consistent with the formula.', faded: true, blankAnswer: '(a) Certain, P = 1. (b) Impossible, P = 0. (c) Probable, P.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_14_002', title: 'Identify each idea',
          dissect: { specimen: 'Classical Definition of Probability: Equally Likely Outcomes', spots: [
            { id: 's1', label: 'The classical definition of probability', prompt: 'Which idea is this? — The classical definition of probability states that if an experiment has n equally likely.', answer: 'The classical definition of probability', options: ['The classical definition of probability', 'The sample space of a', 'The probability of an event', 'An elementary event is an'] },
            { id: 's2', label: 'The sample space of a', prompt: 'Which idea is this? — The sample space of a random experiment is the set of all possible outcomes of that.', answer: 'The sample space of a', options: ['The sample space of a', 'The classical definition of probability', 'The probability of an event', 'An elementary event is an'] },
            { id: 's3', label: 'The probability of an event', prompt: 'Which idea is this? — The probability of an event E, denoted P(E), is defined as the ratio of the number of.', answer: 'The probability of an event', options: ['The probability of an event', 'The classical definition of probability', 'The sample space of a', 'An elementary event is an'] },
            { id: 's4', label: 'An elementary event is an', prompt: 'Which idea is this? — An elementary event is an event that consists of exactly one outcome of a random.', answer: 'An elementary event is an', options: ['An elementary event is an', 'The classical definition of probability', 'The sample space of a', 'The probability of an event'] },
            { id: 's5', label: 'For any event E in', prompt: 'Which idea is this? — For any event E in a random experiment with equally likely outcomes, the complementary.', answer: 'For any event E in', options: ['For any event E in', 'The classical definition of probability', 'The sample space of a', 'The probability of an event'] },
            { id: 's6', label: 'An impossible event has probability', prompt: 'Which idea is this? — An impossible event has probability 0 — it can never occur under any circumstances.', answer: 'An impossible event has probability', options: ['An impossible event has probability', 'The classical definition of probability', 'The sample space of a', 'The probability of an event'] }
          ] } }
    ],
    explore: { component: C10_MathematicsProbabilitySim, prompt: 'Explore the interactive — Classical Definition of Probability: Equally Likely Outcomes' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_14_001', difficulty: 'standard',
          question: 'The classical definition of probability states that if an experiment has n.',
          hint: 'Review basic probability experiments (c9_math_ch7_1). Practice listing all outcomes of.',
          misconception: 'Students often forget the "equally likely" condition and apply the classical formula to biased experiments.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The classical definition of probability states that if an experiment has n equally likely',
                  options: ['The classical definition of probability states that if an experiment has n equally likely', 'The sample space of a random experiment is the set of all possible outcomes of that', 'The probability of an event E, denoted P(E), is defined as the ratio of the number of', 'An elementary event is an event that consists of exactly one outcome of a random'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget the "equally likely" condition and apply the classical formula to biased experiments.' }
          ],
            remediations: { 'students-often-forget-the-equally': { steps: ['List all possible outcomes of the experiment before counting favourable ones.', 'Verify that outcomes are equally likely (fair coin, fair die, well-shuffled deck, well-mixed bag).', 'Check: P(E) = m/n where m ≤ n, so the fraction should be ≤ 1.', 'If it\'s > 1, something is wrong.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_002', difficulty: 'standard',
          question: 'The sample space of a random experiment is the set of all possible outcomes of.',
          hint: 'If stuck, revisit Class 9 node c9_math_ch7_5 (Sample Space: Listing All Possible.',
          misconception: 'Students often treat unordered pairs as outcomes in multi-trial experiments.',
          parts: [
                { id: 'a', prompt: 'When rolling a single die, a student defines event E = {2, 4, 6} and event F = {1, 3, 5}. The student claims E and F are complementary events.', answer: 'Yes, the claim is correct',
                  options: ['Yes, the claim is correct', 'complementary', 'equally likely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat unordered pairs as outcomes in multi-trial experiments.' }
          ],
            remediations: { 'students-often-treat-unordered-pairs': { steps: ['Remediation: 1) Use two differently coloured dice (red and blue) to physically demonstrate that (Red=2, Blue=5) and.', '2) Have the student roll the pair 36 times and tally each ordered pair; they will see each occurs roughly equally often.', '3) Then tally unordered pairs; they will see "2 and 5" occurs about twice as often as "3 and 3".', '4) Explicitly state the rule: "When trials are sequential or objects are distinct, outcomes are ordered tuples.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_003', difficulty: 'standard',
          question: 'The probability of an event E, denoted P(E), is defined as the ratio of the.',
          hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space and Events) to practice writing.',
          misconception: 'Students often write the denominator as the number of unfavourable outcomes instead of the total outcomes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The probability of an event E, denoted P(E), is defined as the ratio of the number of',
                  options: ['The probability of an event E, denoted P(E), is defined as the ratio of the number of', 'The classical definition of probability states that if an experiment has n equally likely', 'The sample space of a random experiment is the set of all possible outcomes of that', 'An elementary event is an event that consists of exactly one outcome of a random'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the denominator as the number of unfavourable outcomes instead of the total outcomes.' }
          ],
            remediations: { 'students-often-write-the-denominator': { steps: ['If a student makes the denominator error, have them physically list all outcomes on paper: "Write every single outcome.', 'Ask: "Does each outcome have the same chance?" If not, the sample space is wrong.', 'For simplification, remind them of the fraction reduction rule from Class 6 (c6_math_ch03_031): divide numerator and.', 'Practice with 5-10 similar problems until they consistently write n(S) correctly and simplify.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the denominator as the number of unfavourable outcomes instead of the total outcomes.',
          parts: [
                { id: 'a', prompt: 'A teacher claims: "In a class of 40 students, 25 like cricket and 15 like football.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'odds in favour', 'probability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the denominator as the number of unfavourable outcomes instead of the total outcomes.' }
          ],
            remediations: { 'students-often-write-the-denominator': { steps: ['If a student makes the denominator error, have them physically list all outcomes on paper: "Write every single outcome.', 'Ask: "Does each outcome have the same chance?" If not, the sample space is wrong.', 'For simplification, remind them of the fraction reduction rule from Class 6 (c6_math_ch03_031): divide numerator and.', 'Practice with 5-10 similar problems until they consistently write n(S) correctly and simplify.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_004', difficulty: 'standard',
          question: 'An elementary event is an event that consists of exactly one outcome of a.',
          hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space and Events) and practice writing.',
          misconception: 'Students often confuse "elementary event" with "any event that seems simple".',
          parts: [
                { id: 'a', prompt: 'In a random experiment of tossing two coins simultaneously, list all elementary events and state the probability of each elementary event.', answer: 'The sample space is S = {HH, HT, TH, TT}',
                  options: ['The sample space is S = {HH, HT, TH, TT}', 'elementary event', 'any event that seems simple'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "elementary event" with "any event that seems simple".' },
                { id: 'b', prompt: 'A bag contains 3 red balls, 4 blue balls, and 5 green balls. One ball is drawn at random.', answer: 'The elementary events are the individual balls, not the colours',
                  options: ['The elementary events are the individual balls, not the colours', 'elementary event', 'any event that seems simple'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "elementary event" with "any event that seems simple".' },
                { id: 'c', prompt: 'A fair die is rolled once. Let E1 be the event "getting a prime number", E2 be "getting an even number", and E3 be "getting a number less than 3".', answer: 'Sample space S = {1,2,3,4,5,6}',
                  options: ['Sample space S = {1,2,3,4,5,6}', 'elementary event', 'any event that seems simple'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "elementary event" with "any event that seems simple".' }
          ],
            remediations: { 'students-often-confuse-elementary-event': { steps: ['If a student makes this error, immediately have them write the sample space as a set of individual outcomes (not.', 'Use a concrete manipulative: lay out 52 actual cards or 12 numbered balls.', 'Ask: "If I pick one object, what are the distinct things I could pick?" Each distinct object is an elementary event.', 'Then group them into categories (suits, colours) to show those are unions of elementary events.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "elementary event" with "any event that seems simple".',
          parts: [
                { id: 'a', prompt: 'A student solves: "A box contains 10 cards numbered 1 to 10. One card is drawn.', answer: 'The second approach is more aligned',
                  options: ['The second approach is more aligned', 'elementary event', 'any event that seems simple'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "elementary event" with "any event that seems simple".' },
                { id: 'b', prompt: 'Construct a random experiment with exactly 6 elementary events that are NOT equally likely.', answer: 'Example: A biased die where faces 1-5 have probability 0.1 each and face 6 has',
                  options: ['Example: A biased die where faces 1-5 have probability 0.1 each and face 6 has', 'elementary events', 'elementary event', 'any event that seems simple'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "elementary event" with "any event that seems simple".' }
          ],
            remediations: { 'students-often-confuse-elementary-event': { steps: ['If a student makes this error, immediately have them write the sample space as a set of individual outcomes (not.', 'Use a concrete manipulative: lay out 52 actual cards or 12 numbered balls.', 'Ask: "If I pick one object, what are the distinct things I could pick?" Each distinct object is an elementary event.', 'Then group them into categories (suits, colours) to show those are unions of elementary events.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_005', difficulty: 'standard',
          question: 'For any event E in a random experiment with equally likely outcomes, the.',
          hint: 'Revisit c10_math_cbse_14_002 (Sample Space and Events) and c10_math_cbse_14_003.',
          misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are.',
          parts: [
                { id: 'a', prompt: 'State the formula that relates the probability of an event E and the probability of its complementary event \'not E\'.', answer: 'The formula is P(E) + P(not E) = 1, or equivalently P(not E) = 1 - P(E)',
                  options: ['The formula is P(E) + P(not E) = 1, or equivalently P(not E) = 1 - P(E)', 'opposites', 'sunshine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are complementary in.' },
                { id: 'b', prompt: 'A student says: "If the probability of rain tomorrow is 0.3, then the probability of no rain is 0.7.', answer: 'Yes, the student is correct',
                  options: ['Yes, the student is correct', 'it only works for 0.3 and 0.7', 'opposites'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are complementary in.' },
                { id: 'c', prompt: 'A box contains 5 red, 8 blue, and 7 green marbles. One marble is drawn at random. Find the probability that the marble drawn is NOT blue.', answer: 'Total marbles = 5 + 8 + 7 = 20',
                  options: ['Total marbles = 5 + 8 + 7 = 20', 'opposites', 'sunshine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are complementary in.' }
          ],
            remediations: { 'any-two-events-that-are': { steps: ['If a student incorrectly identifies complementary events, first have them list the sample space S.', 'Then list outcomes of E and outcomes of the proposed complement F.', 'Check two conditions: (1) E ∩ F = ∅ (no common outcomes) and (2) E ∪ F = S (together they cover all outcomes).', 'If either fails, they are not complements.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are.',
          parts: [
                { id: 'a', prompt: 'A student solves: "A card is drawn from a well-shuffled deck of 52 cards.', answer: 'Yes, the student\'s answer is correct',
                  options: ['Yes, the student\'s answer is correct', 'opposites', 'sunshine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are complementary in.' },
                { id: 'b', prompt: 'Create a real-life word problem (Indian context) where using the complement rule P(not E) = 1 - P(E) is much easier than directly counting favourable outcomes.', answer: 'Example problem: "A bag contains 100 lottery tickets numbered 1 to 100',
                  options: ['Example problem: "A bag contains 100 lottery tickets numbered 1 to 100', 'opposites', 'sunshine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any two events that are "opposites" in everyday language (like "rain" and "sunshine") are complementary in.' }
          ],
            remediations: { 'any-two-events-that-are': { steps: ['If a student incorrectly identifies complementary events, first have them list the sample space S.', 'Then list outcomes of E and outcomes of the proposed complement F.', 'Check two conditions: (1) E ∩ F = ∅ (no common outcomes) and (2) E ∪ F = S (together they cover all outcomes).', 'If either fails, they are not complements.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_006', difficulty: 'standard',
          question: 'An impossible event has probability 0 — it can never occur under any.',
          hint: 'Review the classical definition (c10_math_cbse_14_001). Practice listing sample spaces.',
          misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes in.',
          parts: [
                { id: 'a', prompt: 'Define an impossible event and a certain event in terms of probability.', answer: 'An impossible event has P(E) = 0 (no favourable outcomes, m = 0)',
                  options: ['An impossible event has P(E) = 0 (no favourable outcomes, m = 0)', 'impossible means P < 0', 'the event happens every time in any context'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes in the given sample.' },
                { id: 'b', prompt: 'When rolling a die, what is the probability of rolling a number greater than 6?', answer: 'P(number > 6) = 0 (impossible event)',
                  options: ['P(number > 6) = 0 (impossible event)', 'the event happens every time in any context'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes in the given sample.' },
                { id: 'c', prompt: 'When drawing a card from a standard 52-card deck, what is the probability of drawing a card that is either red or black?', answer: 'Every card is either red or black, so all 52 outcomes are favourable',
                  options: ['Every card is either red or black, so all 52 outcomes are favourable', 'the event happens every time in any context'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes in the given sample.' }
          ],
            remediations: { 'students-sometimes-think-p-e': { steps: ['List the full sample space before classifying an event.', 'Count favourable outcomes: if m = 0, the event is impossible (P = 0); if m = n, it is certain (P = 1).', 'Check: is the answer between 0 and 1?', 'If not, recheck the counting.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes in.',
          parts: [
                { id: 'a', prompt: 'A bag contains only red balls. What is the probability of drawing a blue ball?', answer: 'P(blue) = 0 (impossible)',
                  options: ['P(blue) = 0 (impossible)', 'cannot be determined', 'the event happens every time in any context'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes in the given sample.' },
                { id: 'b', prompt: 'Give one example each of an impossible event and a certain event when tossing two coins.', answer: 'Impossible: Getting three heads (the sample space is {HH, HT, TH, TT}',
                  options: ['Impossible: Getting three heads (the sample space is {HH, HT, TH, TT}', 'certain: getting two heads', 'the event happens every time in any context'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students sometimes think P(E) = 0 means the event "cannot even be conceived" rather than "has no favourable outcomes in the given sample.' }
          ],
            remediations: { 'students-sometimes-think-p-e': { steps: ['List the full sample space before classifying an event.', 'Count favourable outcomes: if m = 0, the event is impossible (P = 0); if m = n, it is certain (P = 1).', 'Check: is the answer between 0 and 1?', 'If not, recheck the counting.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
