import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch06_p2: SimDef = {
    id: 'v3_c12_app_ch06_p2',
    title: 'Probability Distributions · Part 2/2',
    subtitle: 'This node covers the definition, distinction, and classification of discrete vs.',
    classLevel: 12, subject: 'app', topic: 'Probability Distributions · Part 2/2',
    chapters: ['c12_app_ch06'],
    nodeIds: ['c12_app_cbse_06_007', 'c12_app_cbse_06_008', 'c12_app_cbse_06_009', 'c12_app_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: "You\'re waiting for a Delhi Metro train.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student says: "The number of customers entering a shop in a day is a continuous random variable because there is no upper limit — it could be 100, 1000.',
        options: ['The student is **incorrect**', 'unbounded', 'continuous'],
        answer: 'The student is **incorrect**',
        hook: '**The "decimal values = continuous" trap**: Students see a variable taking values like 0.1, 0.2, 0.3...',
    },
    teaching: [
        { title: 'Discrete and Continous Random Variables', text: 'A **discrete random variable** is a real-valued function defined on a sample space that takes distinct, countable values (finite or countably infinite) with gaps between possible outcomes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_app_cbse_06_007', title: 'Discrete and Continous Random Variables',
          caseStudy: { intro: 'Start with a relatable scenario: "You\'re waiting for a Delhi Metro train. The number of trains arriving in the next 30 minutes is countable — 0, 1, 2...',
            decisions: [{ prompt: 'Define a random variable in your own words and give one example each of a discrete and a continuous random variable from a real-life.', options: [
                { text: 'A random variable is a function that assigns a real number to each outcome in the sample', outcome: 'A random variable is a function that assigns a real number to each outcome in the sample space of.' },
                { text: 'random variable is just a variable that changes randomly', outcome: 'Not quite — **The "decimal values = continuous" trap**: Students see a variable taking values like 0.1, 0.2.', reveals: 'the-decimal-values-continuous-trap' },
                { text: 'time is discrete', outcome: 'Not quite — **The "decimal values = continuous" trap**: Students see a variable taking values like 0.1, 0.2.', reveals: 'the-decimal-values-continuous-trap' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_06_008', title: 'Probability Distribution of Discrete Random Variable',
          caseStudy: { intro: 'Start with a relatable scenario: "A food delivery app shows that 20% of orders are delayed. If you place 3 orders today, let X be the number of delayed orders.',
            decisions: [{ prompt: 'A random variable X has the following probability distribution: | X | -2 | 0 | 3 | 5 | |---|---|---|---|---| | P(X) | 0.2 | k | 0.3 | 0.1 |.', options: [
                { text: '**Answer:** Yes, it can be valid', outcome: '**Answer:** Yes, it can be valid. For a valid distribution, ΣP(x) = 1.' },
                { text: 'k = 0.4', outcome: 'Not quite — **The "Equiprobability Trap":** Students assume that if a random variable X can take n distinct.', reveals: 'the-equiprobability-trap-students-assume' },
                { text: 'invalid because k is unknown', outcome: 'Not quite — **The "Equiprobability Trap":** Students assume that if a random variable X can take n distinct.', reveals: 'the-equiprobability-trap-students-assume' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_06_009', title: 'MATHEMATICAL EXPECTATION OF DISCRETE PROBABILITY DISTRIBUTION',
          scaffold: { problem: 'A bag contains 4 red and 6 blue marbles. Two marbles are drawn at random *without replacement*. Let X be the number of red marbles drawn.',
            steps: [
            { text: 'Identify possible values of X. Since we draw 2 marbles without replacement, X can be 0, 1, or 2 red marbles.' },
            { text: 'Compute probabilities using combinations (hypergeometric). Total ways = $^{10}C_2 = 45$.' },
            { text: 'Verify $\\sum p_i = 1/3 + 8/15 + 2/15 = 5/15 + 8/15 + 2/15 = 15/15 = 1$. ✓' },
            { text: 'Build distribution table and compute E(X).' },
            { text: 'Interpret: "If we repeat this two-draw experiment many times, the average number of red marbles per experiment will.', faded: true, blankAnswer: 'E(X) = 0.8 red marbles per two-draw experiment (long-run.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_06_010', title: 'VARIANCE OF DISCRETE PROBABILITY DISTRIBUTION',
          scaffold: { problem: 'In a quality control check, a factory tests batches of 5 light bulbs.',
            steps: [
            { text: 'Identify given values and what is asked: Values xᵢ = 0,1,2; probabilities P(xᵢ) = 0.5,0.3,0.2; need Var(X).' },
            { text: 'Recall variance formula: Var(X) = E(X²) - [E(X)]², so compute E(X) and E(X²) first.' },
            { text: 'Calculate E(X) = ΣxᵢP(xᵢ) = (0)(0.5) + (1)(0.3) + (2)(0.2) = 0 + 0.3 + 0.4 = 0.7.' },
            { text: 'Calculate E(X²) = Σxᵢ²P(xᵢ) = (0²)(0.5) + (1²)(0.3) + (2²)(0.2) = 0 + 0.3 + 0.8 = 1.1.' },
            { text: 'Compute Var(X) = E(X²) - [E(X)]² = 1.1 - (0.7)² = 1.1 - 0.49 = 0.61.', faded: true, blankAnswer: 'Variance = 0.61 (defective bulbs)²' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'You finished Probability Distributions — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_06_007', difficulty: 'standard',
          question: 'A **discrete random variable** is a real-valued function defined on a sample.',
          hint: 'If stuck, review c11_app_cbse_03_008 (Intervals as Subsets of R) to grasp countable vs.',
          misconception: '**The "decimal values = continuous" trap**: Students see a variable taking values like 0.1, 0.2, 0.3...',
          parts: [
                { id: 'a', prompt: 'A student says: "The number of customers entering a shop in a day is a continuous random variable because there is no upper limit — it could be 100, 1000.', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'unbounded', 'continuous', 'it\'s not integers'],
                  hint: 'If stuck, review c11_app_cbse_03_008 (Intervals as Subsets of R) to grasp countable vs.',
                  misconception: '**The "decimal values = continuous" trap**: Students see a variable taking values like 0.1, 0.2, 0.3...' },
                { id: 'b', prompt: 'Consider two random variables: X = number of heads in 10 tosses of a fair coin Y = proportion of heads in 10 tosses of a fair coin (i.e., Y = X/10) Are X and.', answer: 'Both are **discrete**',
                  options: ['Both are **discrete**', 'it takes decimal values', 'it\'s a proportion between 0 and 1', 'it\'s not integers'],
                  hint: 'If stuck, review c11_app_cbse_03_008 (Intervals as Subsets of R) to grasp countable vs.',
                  misconception: '**The "decimal values = continuous" trap**: Students see a variable taking values like 0.1, 0.2, 0.3...' }
          ],
            remediations: { 'the-decimal-values-continuous-trap': { steps: ['If a student exhibits the "decimals = continuous" misconception: 1.', '**Concrete counterexample**: Ask: "A digital stopwatch shows time to 2 decimals: 12.34s, 12.35s...', 'Is time discrete?" Student says no.', 'Then: "But the stopwatch only shows countable values — does that make time discrete?" This exposes the confusion.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "decimal values = continuous" trap**: Students see a variable taking values like 0.1, 0.2, 0.3...',
          parts: [
                { id: 'a', prompt: 'A textbook states: "For a continuous random variable, the probability of taking any specific value is zero." A student argues: "But if P(X = x) = 0 for every.', answer: 'The student\'s argument is **incorrect**',
                  options: ['The student\'s argument is **incorrect**', 'it\'s not integers'],
                  hint: 'If stuck, review c11_app_cbse_03_008 (Intervals as Subsets of R) to grasp countable vs.',
                  misconception: '**The "decimal values = continuous" trap**: Students see a variable taking values like 0.1, 0.2, 0.3...' },
                { id: 'b', prompt: 'Create a real-life scenario (Indian context) involving BOTH a discrete and a continuous random variable that are naturally related.', answer: '**Scenario**: A Zomato delivery partner in Bengaluru',
                  options: ['**Scenario**: A Zomato delivery partner in Bengaluru', 'it\'s not integers'],
                  hint: 'If stuck, review c11_app_cbse_03_008 (Intervals as Subsets of R) to grasp countable vs.',
                  misconception: '**The "decimal values = continuous" trap**: Students see a variable taking values like 0.1, 0.2, 0.3...' }
          ],
            remediations: { 'the-decimal-values-continuous-trap': { steps: ['If a student exhibits the "decimals = continuous" misconception: 1.', '**Concrete counterexample**: Ask: "A digital stopwatch shows time to 2 decimals: 12.34s, 12.35s...', 'Is time discrete?" Student says no.', 'Then: "But the stopwatch only shows countable values — does that make time discrete?" This exposes the confusion.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_06_008', difficulty: 'standard',
          question: 'The probability distribution of a discrete random variable **X** is.',
          hint: 'If stuck, review **c11_app_cbse_09_003 (Event and its probability)** for P(E).',
          misconception: '**The "Equiprobability Trap":** Students assume that if a random variable X can take n distinct values, then each value.',
          parts: [
                { id: 'a', prompt: 'A random variable X has the following probability distribution: | X | -2 | 0 | 3 | 5 | |---|---|---|---|---| | P(X) | 0.2 | k | 0.3 | 0.1 | Is this a valid.', answer: '**Answer:** Yes, it can be valid',
                  options: ['**Answer:** Yes, it can be valid', 'k = 0.4', 'invalid because k is unknown', 'unknown constant'],
                  hint: 'If stuck, review **c11_app_cbse_09_003 (Event and its probability)** for P(E) = n(E)/n(S), and.',
                  misconception: '**The "Equiprobability Trap":** Students assume that if a random variable X can take n distinct values, then each value has probability.' },
                { id: 'b', prompt: 'A student writes the probability distribution for "number of heads in 2 tosses of a fair coin" as: | X | 0 | 1 | 2 | |---|---|---|---| | P(X) | 1/3 | 1/3 | 1/3.', answer: '**Answer:** The student assumed all 3 outcomes (0,1,2 heads) are equally likely',
                  options: ['**Answer:** The student assumed all 3 outcomes (0,1,2 heads) are equally likely', 'sum is 1 so it\'s fine', 'Equiprobability Trap'],
                  hint: 'If stuck, review **c11_app_cbse_09_003 (Event and its probability)** for P(E) = n(E)/n(S), and.',
                  misconception: '**The "Equiprobability Trap":** Students assume that if a random variable X can take n distinct values, then each value has probability.' },
                { id: 'c', prompt: 'A bag contains 4 red and 6 blue balls. Two balls are drawn **with replacement**. Let X = number of red balls drawn.', answer: '**Answer:** Step 1: X can be 0, 1, 2',
                  options: ['**Answer:** Step 1: X can be 0, 1, 2', 'without replacement', 'with replacement', 'Equiprobability Trap'],
                  hint: 'If stuck, review **c11_app_cbse_09_003 (Event and its probability)** for P(E) = n(E)/n(S), and.',
                  misconception: '**The "Equiprobability Trap":** Students assume that if a random variable X can take n distinct values, then each value has probability.' },
                { id: 'd', prompt: 'Two probability distributions for discrete random variables X and Y are given below: | X | 1 | 2 | 3 | 4 | |---|---|---|---|---| | P(X) | 0.1 | 0.3 | 0.4 | 0.2.', answer: '**Answer:** Y has higher spread',
                  options: ['**Answer:** Y has higher spread', 'cannot tell without calculating variance', 'X has higher spread', 'Equiprobability Trap'],
                  hint: 'If stuck, review **c11_app_cbse_09_003 (Event and its probability)** for P(E) = n(E)/n(S), and.',
                  misconception: '**The "Equiprobability Trap":** Students assume that if a random variable X can take n distinct values, then each value has probability.' }
          ],
            remediations: { 'the-equiprobability-trap-students-assume': { steps: ['**Revisit the sample space:** Ask the student to write the *full sample space* of the underlying experiment (e.g., all.', '**Map each outcome to X:** For each outcome, compute the value of X (number of heads).', '**Count frequencies:** Count how many outcomes give X=0, X=1, X=2, X=3.', '**Divide by total outcomes:** P(X=k) = (favorable outcomes) / (total outcomes).'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_06_009', difficulty: 'standard',
          question: 'For a discrete random variable X taking values $x_1, x_2, ..., x_n$ with.',
          hint: 'If stuck, review "Probability Distribution of Discrete Random Variable".',
          misconception: '**Misconception:** "E(X) is the most likely value of X" or "E(X) must be one of the possible values of X." **Why.',
          parts: [
                { id: 'a', prompt: 'State the formula for the mathematical expectation $E(X)$ of a discrete random variable X taking values $x_1, x_2, ..., x_n$ with probabilities $p_1, p_2, ...', answer: '$E(X) = \\sum_{i=1}^n x_i p_i$ with the condition $\\sum_{i=1}^n p_i = 1$',
                  options: ['$E(X) = \\sum_{i=1}^n x_i p_i$ with the condition $\\sum_{i=1}^n p_i = 1$', 'E(X) is the most likely value of X', 'E(X) must be one of the possible values of X'],
                  hint: 'If stuck, review "Probability Distribution of Discrete Random Variable" (c12_app_cbse_06_008).',
                  misconception: '**Misconception:** "E(X) is the most likely value of X" or "E(X) must be one of the possible values of X." **Why it happens:** Students.' },
                { id: 'b', prompt: 'A random variable X has the following probability distribution: | X | 0 | 1 | 2 | 3 | |---|---|---|---|---| | P(X) | 0.2 | k | 0.3 | 0.1 | Find the value of.', answer: 'The probabilities must sum to 1: $0.2 + k + 0.3 + 0.1 = 1 \\Rightarrow k = 0.4$',
                  options: ['The probabilities must sum to 1: $0.2 + k + 0.3 + 0.1 = 1 \\Rightarrow k = 0.4$', 'E(X) is the most likely value of X', 'E(X) must be one of the possible values of X'],
                  hint: 'If stuck, review "Probability Distribution of Discrete Random Variable" (c12_app_cbse_06_008).',
                  misconception: '**Misconception:** "E(X) is the most likely value of X" or "E(X) must be one of the possible values of X." **Why it happens:** Students.' },
                { id: 'c', prompt: 'In a game, you toss two fair coins. You win ₹10 for each head. Let X be your total winnings. Construct the probability distribution of X and find E(X).', answer: 'Sample space: {HH, HT, TH, TT}',
                  options: ['Sample space: {HH, HT, TH, TT}', 'E(X) is the most likely value of X', 'E(X) must be one of the possible values of X'],
                  hint: 'If stuck, review "Probability Distribution of Discrete Random Variable" (c12_app_cbse_06_008).',
                  misconception: '**Misconception:** "E(X) is the most likely value of X" or "E(X) must be one of the possible values of X." **Why it happens:** Students.' },
                { id: 'd', prompt: 'Two different random variables X and Y have the following distributions: X: values 1,2,3,4 with probabilities 1/7, 3/7, 2/7, 1/7 Y: values -1,0,4,5 with.', answer: '$E(X) = 1(1/7)+2(3/7)+3(2/7)+4(1/7) = 17/7$',
                  options: ['$E(X) = 1(1/7)+2(3/7)+3(2/7)+4(1/7) = 17/7$', 'yes, same distribution', 'E(X) is the most likely value of X', 'E(X) must be one of the possible values of X'],
                  hint: 'If stuck, review "Probability Distribution of Discrete Random Variable" (c12_app_cbse_06_008).',
                  misconception: '**Misconception:** "E(X) is the most likely value of X" or "E(X) must be one of the possible values of X." **Why it happens:** Students.' }
          ],
            remediations: { 'misconception-e-x-is-the': { steps: ['**Revisit c12_app_cbse_06_008** (Probability Distribution of Discrete Random Variable): Reconstruct 3 distributions.', '**Do this diagnostic**: "X takes values 2, 5, 8 with probs 0.3, 0.5, 0.2.', '**If stuck on interpretation**: Watch a 5-min video on "Law of Large Numbers simulation" (coin tosses converging.', '**Re-attempt**: Create your own 4-outcome distribution where E(X) is not a possible value and explain why it\'s still.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_06_010', difficulty: 'standard',
          question: 'The variance of a discrete random variable X, denoted Var(X) or σₓ², is the.',
          hint: 'Review how to calculate mathematical expectation from c12_app_cbse_06_009 if struggling.',
          misconception: 'Students often believe Var(X) = [E(X)]² - E(X²), reversing the correct formula Var(X) = E(X²) - [E(X)]².',
          parts: [
                { id: 'a', prompt: 'What is the variance of a discrete random variable? A) The average of the values B) The average of the squared deviations from the mean C) The square root.', answer: 'B) The average of the squared deviations from the mean',
                  options: ['B) The average of the squared deviations from the mean', 'Var(X) = [E(X)]² - E(X²), reversing the correct formula Var(X) = E(X²) - [E(X)]²'],
                  hint: 'Review how to calculate mathematical expectation from c12_app_cbse_06_009 if struggling to find.',
                  misconception: 'Students often believe Var(X) = [E(X)]² - E(X²), reversing the correct formula Var(X) = E(X²) - [E(X)]².' },
                { id: 'b', prompt: 'A student claims that if two random variables have the same mean, they must have the same variance. Is this correct? Explain.', answer: 'B) No, because variance depends on how values are distributed around the mean',
                  options: ['B) No, because variance depends on how values are distributed around the mean', 'Var(X) = [E(X)]² - E(X²), reversing the correct formula Var(X) = E(X²) - [E(X)]²'],
                  hint: 'Review how to calculate mathematical expectation from c12_app_cbse_06_009 if struggling to find.',
                  misconception: 'Students often believe Var(X) = [E(X)]² - E(X²), reversing the correct formula Var(X) = E(X²) - [E(X)]².' },
                { id: 'c', prompt: 'For a discrete random variable, if all probabilities are doubled while keeping values the same, what happens to the variance?', answer: 'C) Variance becomes invalid (probabilities don\'t sum to 1)',
                  options: ['C) Variance becomes invalid (probabilities don\'t sum to 1)', 'Var(X) = [E(X)]² - E(X²), reversing the correct formula Var(X) = E(X²) - [E(X)]²'],
                  hint: 'Review how to calculate mathematical expectation from c12_app_cbse_06_009 if struggling to find.',
                  misconception: 'Students often believe Var(X) = [E(X)]² - E(X²), reversing the correct formula Var(X) = E(X²) - [E(X)]².' }
          ],
            remediations: { 'var-x-e-x-e': { steps: ['To fix this, have the student compute both E(X²) and [E(X)]² for a simple distribution (e.g., X: 0,1 with P=0.5 each).', 'Show E(X)=0.5, [E(X)]²=0.25, E(X²)=0.5, so E(X²) - [E(X)]² = 0.25 ≥ 0.', 'Then reverse the formula: [E(X)]² - E(X²) = -0.25 < 0, which is impossible for variance.', 'Emphasize that squaring increases spread, so E(X²) must exceed [E(X)]² unless X is constant.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
