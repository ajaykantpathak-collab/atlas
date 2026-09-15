import type { SimDef } from '../../engine/types';
import C12_AppliedMathsRandomVariableProbabilitySim from '../../../simulations/c6_12/C12_AppliedMathsRandomVariableProbabilitySim';

/** v3 wrapped master — C12_AppliedMathsRandomVariableProbabilitySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_appliedmathsrandomvariableprobabilitysim: SimDef = {
    id: 'v3w_c12_appliedmathsrandomvariableprobabilitysim',
    title: 'Applied Maths Random Variable Probability',
    subtitle: 'This node covers discrete random variables and their probability distributions only.',
    classLevel: 12, subject: 'science', topic: 'Random Variables and Probability Distribution',
    chapters: [],
    nodeIds: ['c12_math_cbse_13_007', 'c12_math_cbse_13_008', 'c12_math_cbse_13_004', 'c12_math_cbse_13_005', 'c12_math_cbse_13_009', 'c12_math_cbse_13_010', 'c12_math_cbse_13_001', 'c12_math_cbse_13_002', 'c12_math_cbse_13_003', 'c12_math_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are at a Diwali mela playing a game: you draw two cards without replacement from a well-shuffled.', goal: 'Master Applied Maths Random Variable Probability.' },
    discovery: {
        question: 'A student argues: "If two events are independent, they cannot happen together, so \\( P(E \\cap F) = 0 \\)." Is this correct?',
        options: ['**Correct answer:** The student is incorrect', 'independent', 'mutually exclusive'],
        answer: '**Correct answer:** The student is incorrect',
        hook: '**The "Mutually Exclusive = Independent" confusion:** Students repeatedly write: "Since A and B are independent, P(A ∩.',
    },
    teaching: [
        { title: 'A random variable is a real-valued function.', text: 'A random variable is a real-valued function whose domain is the sample space of a random experiment. It assigns a unique real number to each outcome in the sample space.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_007', title: 'A random variable is a real-valued.',
          scaffold: { problem: 'A game at a school fair involves drawing two cards successively without replacement from a well-shuffled deck of 52 cards.',
            steps: [
            { text: 'Identify the possible values of X. Since two cards are drawn, X can be 0, 1, or 2.' },
            { text: 'Compute P(X=0) = probability both cards are non-aces. There are 48 non-aces. P = (48/52) * (47/51) = 188/221.' },
            { text: 'Compute P(X=2) = probability both cards are aces. There are 4 aces. P = (4/52) * (3/51) = 1/221.' },
            { text: 'Compute P(X=1) = 1 - P(X=0) - P(X=2) = 1 - 188/221 - 1/221 = 32/221.' },
            { text: 'Verify sum = 188/221 + 32/221 + 1/221 = 221/221 = 1.', faded: true, blankAnswer: 'X: 0, 1, 2; P(X): 188/221, 32/221, 1/221.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_008', title: 'The mean (or expected value) of a.',
          scaffold: { problem: 'A vegetable vendor sells tomatoes at ₹40/kg. On a given day, the demand (in kg) is a random variable X with distribution: P(X=10)=0.1,.',
            steps: [
            { text: 'Identify the random variable for revenue. Let R = 40X (since price is ₹40/kg).' },
            { text: 'Compute E(R) using E(R) = Σ r_i P(R=r_i) = 400×0.1 + 800×0.3 + 1200×0.4 + 1600×0.2.' },
            { text: 'Calculate: 40 + 240 + 480 + 320 = 1080. So mean revenue = ₹1080.' },
            { text: 'Compute E(R²) = Σ r_i² P(R=r_i) = 400²×0.1 + 800²×0.3 + 1200²×0.4 + 1600²×0.2 = 160000×0.1 + 640000×0.3 + 1440000×0.4 +.' },
            { text: 'Var(R) = E(R²) - [E(R)]² = 1,296,000 - (1080)² = 1,296,000 - 1,166,400 = 129,600. Variance = 129,600 rupees².', faded: true, blankAnswer: 'Mean revenue = ₹1080, Variance = 129,600 rupees².' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_004', title: 'Two events E and F associated with the.',
          scaffold: { problem: 'A company has two factories, Factory X and Factory Y, producing light bulbs. Factory X produces 60% of total output with a 2% defect rate.',
            steps: [
            { text: 'Identify given probabilities: P(X) = 0.60, P(Y) = 0.40, P(D|X) = 0.02, P(D|Y) = 0.05.' },
            { text: 'Compute total probability of defect using law of total probability (from upcoming node c12_math_cbse_13_006): P(D) =.' },
            { text: 'Compute joint probability P(D ∩ X) using multiplication rule: P(D ∩ X) = P(X)P(D|X) = (0.60)(0.02) = 0.012.' },
            { text: 'Compute product of marginals: P(D) × P(X) = (0.032)(0.60) = 0.0192.' },
            { text: 'Compare: P(D ∩ X) = 0.012 ≠ 0.0192 = P(D)P(X). Therefore D and X are NOT independent.' },
            { text: 'Interpret: Knowing the bulb is from Factory X changes the probability of defect from 0.032 to 0.02 — so the events are.', faded: true, blankAnswer: 'D and X are dependent events. P(D ∩ X) = 0.012, P(D)P(X) =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_005', title: 'Bayes\' Theorem provides a way to update.',
          scaffold: { problem: 'A bag contains 4 red and 6 black balls. Another bag contains 3 red and 7 black balls.',
            steps: [
            { text: 'Define events. Let \\(E_1\\) = first bag chosen, \\(E_2\\) = second bag chosen.' },
            { text: 'Determine likelihoods. \\(P(A|E_1)=\\frac{4}{10}=0.4\\) (4 red out of 10 in bag 1).' },
            { text: 'Compute total probability of red using Theorem of Total Probability:.' },
            { text: 'Apply Bayes\' Theorem for \\(E_1\\): \\(P(E_1|A)=\\frac{P(E_1)P(A|E_1)}{P(A)}=\\frac{0.2}{0.35}=\\frac{4}{7}\\).' },
            { text: 'Interpret: Given a red ball was drawn, the probability it came from the first bag is \\(\\frac{4}{7}\\approx 0.571\\).', faded: true, blankAnswer: '\\(\\frac{4}{7}\\) or approximately 0.571.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_009', title: 'A binomial distribution is the.',
          scaffold: { problem: 'A bag contains 5 red and 7 blue balls. Four balls are drawn one by one with replacement. Find the probability that exactly 2 balls are red.',
            steps: [
            { text: 'Identify the experiment: drawing a ball 4 times with replacement.' },
            { text: 'Define random variable \\(X\\) = number of red balls in 4 draws. \\(X \\sim B(4, 5/12)\\).' },
            { text: 'Write the binomial formula for \\(r=2\\): \\(P(X=2) = \\binom{4}{2} (5/12)^2 (7/12)^2\\).' },
            { text: 'Compute \\(\\binom{4}{2} = \\frac{4 \\times 3}{2} = 6\\). \\((5/12)^2 = 25/144\\), \\((7/12)^2 = 49/144\\).' },
            { text: 'Mean \\(\\mu = np = 4 \\times \\frac{5}{12} = \\frac{5}{3} \\approx 1.667\\).', faded: true, blankAnswer: '\\(P(\\text{exactly 2 red}) = \\frac{1225}{3456} \\approx.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_010', title: 'A Bernoulli trial is a random.',
          scaffold: { problem: 'In a multiple-choice test with 20 questions, each question has 4 options with exactly one correct answer.',
            steps: [
            { text: 'Verify Bernoulli conditions: fixed \\(n=20\\) trials (questions); two outcomes per trial (correct/incorrect); constant.' },
            { text: 'Identify parameters: \\(n = 20\\), \\(p = 0.25\\), \\(q = 1-p = 0.75\\), \\(k = 5\\).' },
            { text: 'Write binomial PMF: \\(P(X=5) = \\binom{20}{5} (0.25)^5 (0.75)^{15}\\).' },
            { text: 'Compute \\(\\binom{20}{5} = \\frac{20 \\times 19 \\times 18 \\times 17 \\times 16}{5 \\times 4 \\times 3 \\times 2 \\times 1} =.' },
            { text: 'Mean \\(\\mu = np = 20 \\times 0.25 = 5\\). Variance \\(\\sigma^2 = npq = 20 \\times 0.25 \\times 0.75 = 3.75\\).', faded: true, blankAnswer: '\\(P(X=5) \\approx 0.2023\\); Expected correct answers = 5;.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_13_008', title: 'Identify each idea',
          dissect: { specimen: 'Applied Maths Random Variable Probability', spots: [
            { id: 's1', label: 'A random variable is a', prompt: 'Which idea is this? — A random variable is a real-valued function whose domain is the sample space of a random.', answer: 'A random variable is a', options: ['A random variable is a', 'The mean or expected value', 'Two events E and F', 'Bayes Theorem provides a way'] },
            { id: 's2', label: 'The mean or expected value', prompt: 'Which idea is this? — The mean (or expected value) of a discrete random variable X is the weighted average of.', answer: 'The mean or expected value', options: ['The mean or expected value', 'A random variable is a', 'Two events E and F', 'Bayes Theorem provides a way'] },
            { id: 's3', label: 'Two events E and F', prompt: 'Which idea is this? — Two events E and F associated with the same random experiment are said to be.', answer: 'Two events E and F', options: ['Two events E and F', 'A random variable is a', 'The mean or expected value', 'Bayes Theorem provides a way'] },
            { id: 's4', label: 'Bayes Theorem provides a way', prompt: 'Which idea is this? — Bayes\' Theorem provides a way to update the probability of a hypothesis (cause) given.', answer: 'Bayes Theorem provides a way', options: ['Bayes Theorem provides a way', 'A random variable is a', 'The mean or expected value', 'Two events E and F'] },
            { id: 's5', label: 'A binomial distribution is the', prompt: 'Which idea is this? — A binomial distribution is the probability distribution of the number of successes \\(X\\).', answer: 'A binomial distribution is the', options: ['A binomial distribution is the', 'A random variable is a', 'The mean or expected value', 'Two events E and F'] },
            { id: 's6', label: 'A Bernoulli trial is a', prompt: 'Which idea is this? — A Bernoulli trial is a random experiment with exactly two possible outcomes — "success".', answer: 'A Bernoulli trial is a', options: ['A Bernoulli trial is a', 'A random variable is a', 'The mean or expected value', 'Two events E and F'] }
          ] } }
    ],
    explore: { component: C12_AppliedMathsRandomVariableProbabilitySim, prompt: 'Explore the interactive — Applied Maths Random Variable Probability' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_13_007', difficulty: 'standard',
          question: 'A random variable is a real-valued function whose domain is the sample space of.',
          hint: 'If stuck, revisit c9_math_ch7_5 (Sample Space) and c12_math_cbse_13_003 (Multiplication.',
          misconception: 'Students often confuse the random variable (the function mapping outcomes to numbers) with its values (the numbers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A random variable is a real-valued function whose domain is the sample space of a random',
                  options: ['A random variable is a real-valued function whose domain is the sample space of a random', 'The mean (or expected value) of a discrete random variable X is the weighted average of', 'Two events E and F associated with the same random experiment are said to be', 'Bayes\' Theorem provides a way to update the probability of a hypothesis (cause) given'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the random variable (the function mapping outcomes to numbers) with its values (the numbers themselves).' }
          ],
            remediations: { 'students-often-confuse-the-random': { steps: ['If the student cannot construct a probability distribution, first revisit the definition of a random variable as a.', 'Then compute the probability of each value by summing the probabilities of the outcomes that map to that value.', 'Verify the two conditions.', 'Practice with c11_math_cbse_07_001 (counting principles) and c12_math_cbse_13_003 (multiplication theorem for.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_008', difficulty: 'standard',
          question: 'The mean (or expected value) of a discrete random variable X is the weighted.',
          hint: 'Revisit c12_math_cbse_13_007 (Random Variables and Probability Distribution) and practice.',
          misconception: 'Students often confuse the formula for variance: they compute E(X²) - E(X) instead of E(X²) - [E(X)]², forgetting to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mean (or expected value) of a discrete random variable X is the weighted average of',
                  options: ['The mean (or expected value) of a discrete random variable X is the weighted average of', 'A random variable is a real-valued function whose domain is the sample space of a random', 'Two events E and F associated with the same random experiment are said to be', 'Bayes\' Theorem provides a way to update the probability of a hypothesis (cause) given'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the formula for variance: they compute E(X²) - E(X) instead of E(X²) - [E(X)]², forgetting to square the mean.' }
          ],
            remediations: { 'students-often-confuse-the-formula': { steps: ['If a student makes the "forget to square" error, have them write the definition Var(X) = E[(X-μ)²] and expand it step.', 'Then take expectation: E(X²) - 2μE(X) + μ² = E(X²) - 2μ² + μ² = E(X²) - μ².', 'Emphasize that μ = E(X) so μ² = [E(X)]².', 'Practice with a simple distribution (e.g., X=1,2 with equal prob) where the difference is obvious.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_004', difficulty: 'standard',
          question: 'Two events E and F associated with the same random experiment are said to be.',
          hint: 'If stuck, revisit c12_math_cbse_13_003 (Multiplication Theorem) and practice 5 problems.',
          misconception: '**The "Mutually Exclusive = Independent" confusion:** Students repeatedly write: "Since A and B are independent, P(A ∩.',
          parts: [
                { id: 'a', prompt: 'A student argues: "If two events are independent, they cannot happen together, so \\( P(E \\cap F) = 0 \\)." Is this correct?', answer: '**Correct answer:** The student is incorrect',
                  options: ['**Correct answer:** The student is incorrect', 'independent', 'mutually exclusive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Mutually Exclusive = Independent" confusion:** Students repeatedly write: "Since A and B are independent, P(A ∩ B) = 0" or "Since A.' },
                { id: 'b', prompt: 'Two cards are drawn successively **with replacement** from a well-shuffled deck of 52 cards.', answer: '**Correct answer with steps:** Step 1',
                  options: ['**Correct answer with steps:** Step 1', 'with replacement', 'Mutually Exclusive = Independent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Mutually Exclusive = Independent" confusion:** Students repeatedly write: "Since A and B are independent, P(A ∩ B) = 0" or "Since A.' }
          ],
            remediations: { 'the-mutually-exclusive-independent-confusion': { steps: ['Have them draw a Venn diagram of two mutually exclusive events with non-zero probability — two non-overlapping circles.', 'Write the theorem: **If A and B are mutually exclusive and P(A) > 0, P(B) > 0, then they are DEPENDENT.** Prove it: P(A.', 'Give the "litmus test" phrase to memorize: **"Mutually exclusive means they CAN\'T happen together.', 'Re-attempt Diagnostic Question 2. If they still err, revisit c12_math_cbse_13_001 (conditional probability definition).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Mutually Exclusive = Independent" confusion:** Students repeatedly write: "Since A and B are independent, P(A ∩.',
          parts: [
                { id: 'a', prompt: 'A solution claims: "Events E and F are independent because P(E) = 0.3, P(F) = 0.4, and P(E ∪ F) = 0.58.', answer: '**Correct answer:** The reasoning is **invalid**',
                  options: ['**Correct answer:** The reasoning is **invalid**', 'yes, the conclusion is correct', 'Mutually Exclusive = Independent', 'Since A and B are independent, P(A ∩ B) = 0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Mutually Exclusive = Independent" confusion:** Students repeatedly write: "Since A and B are independent, P(A ∩ B) = 0" or "Since A.' }
          ],
            remediations: { 'the-mutually-exclusive-independent-confusion': { steps: ['Have them draw a Venn diagram of two mutually exclusive events with non-zero probability — two non-overlapping circles.', 'Write the theorem: **If A and B are mutually exclusive and P(A) > 0, P(B) > 0, then they are DEPENDENT.** Prove it: P(A.', 'Give the "litmus test" phrase to memorize: **"Mutually exclusive means they CAN\'T happen together.', 'Re-attempt Diagnostic Question 2. If they still err, revisit c12_math_cbse_13_001 (conditional probability definition).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_005', difficulty: 'standard',
          question: 'Bayes\' Theorem provides a way to update the probability of a hypothesis (cause).',
          hint: 'If stuck, review the definition of conditional probability (c12_math_cbse_13_001) and the.',
          misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.',
          parts: [
                { id: 'a', prompt: 'State Bayes\' Theorem for a partition \\(E_1,E_2,\\dots,E_n\\) of the sample space and an event \\(A\\) with \\(P(A)>0\\).', answer: 'Bayes\' Theorem: \\(P(E_i|A)=\\frac{P(E_i)P(A|E_i)}{\\sum_{j=1}^n P(E_j)P(A|E_j)}\\)',
                  options: ['Bayes\' Theorem: \\(P(E_i|A)=\\frac{P(E_i)P(A|E_i)}{\\sum_{j=1}^n P(E_j)P(A|E_j)}\\)', 'Bayes\' Theorem says \\(P(E_i|A)=P(A|E_i)\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.' },
                { id: 'b', prompt: 'Explain why the denominator in Bayes\' Theorem is exactly \\(P(A)\\), the total probability of the evidence.', answer: 'By the Theorem of Total Probability',
                  options: ['By the Theorem of Total Probability', 'Bayes\' Theorem says \\(P(E_i|A)=P(A|E_i)\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.' },
                { id: 'c', prompt: 'A factory has two machines, M1 and M2. M1 produces 60% of the output, M2 produces 40%. M1\'s defect rate is 2%, M2\'s defect rate is 5%.', answer: 'Let \\(E_1\\): item from M1, \\(E_2\\): item from M2, \\(A\\): item defective',
                  options: ['Let \\(E_1\\): item from M1, \\(E_2\\): item from M2, \\(A\\): item defective', 'Bayes\' Theorem says \\(P(E_i|A)=P(A|E_i)\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.' }
          ],
            remediations: { 'students-often-confuse-the-prior': { steps: ['If a student exhibits the above misconceptions, take these steps: (1) Revisit the definition of a partition using a.', '(2) Re‑derive the Theorem of Total Probability from \\(A = A\\cap S = \\bigcup (A\\cap E_i)\\) emphasizing disjointness of.', '(3) Work through a simple two‑cause example (e.g., two boxes with different colored balls) where the student manually.', '(4) Practice identifying priors and likelihoods in word problems by labeling each probability as "prior" or.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.',
          parts: [
                { id: 'a', prompt: 'A solution to a Bayes\' Theorem problem gives posterior probabilities \\(P(E_1|A)=0.7\\) and \\(P(E_2|A)=0.4\\).', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'Bayes\' Theorem says \\(P(E_i|A)=P(A|E_i)\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.' },
                { id: 'b', prompt: 'Create a real‑world scenario (different from medical testing or factory defects) that requires Bayes\' Theorem.', answer: 'Example: A spam filter classifies emails',
                  options: ['Example: A spam filter classifies emails', 'Bayes\' Theorem says \\(P(E_i|A)=P(A|E_i)\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.' }
          ],
            remediations: { 'students-often-confuse-the-prior': { steps: ['If a student exhibits the above misconceptions, take these steps: (1) Revisit the definition of a partition using a.', '(2) Re‑derive the Theorem of Total Probability from \\(A = A\\cap S = \\bigcup (A\\cap E_i)\\) emphasizing disjointness of.', '(3) Work through a simple two‑cause example (e.g., two boxes with different colored balls) where the student manually.', '(4) Practice identifying priors and likelihoods in word problems by labeling each probability as "prior" or.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_009', difficulty: 'standard',
          question: 'A binomial distribution is the probability distribution of the number of.',
          hint: 'If stuck, revisit c11_math_cbse_07_007 for combinations and c12_math_cbse_13_007 for.',
          misconception: 'Students often confuse the binomial coefficient \\(\\binom{n}{r}\\) with \\(n^r\\) or \\(n \\times r\\), especially when \\(r\\).',
          parts: [
                { id: 'a', prompt: 'For a binomial distribution \\(B(n,p)\\), the mean is 8 and the variance is 4.8. Find \\(n\\) and \\(p\\).', answer: 'Given \\(\\mu = np = 8\\) and \\(\\sigma^2 = npq = 4.8\\)',
                  options: ['Given \\(\\mu = np = 8\\) and \\(\\sigma^2 = npq = 4.8\\)', 'nice numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the binomial coefficient \\(\\binom{n}{r}\\) with \\(n^r\\) or \\(n \\times r\\), especially when \\(r\\) is small.' }
          ],
            remediations: { 'students-often-confuse-the-binomial': { steps: ['If a student makes the combinatorial error, immediately revisit c11_math_cbse_07_007 (Combinations: Definition and.', 'Use the visual "choose positions for successes" argument: "Out of 10 trials, choose which 2 are successes — that\'s.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the binomial coefficient \\(\\binom{n}{r}\\) with \\(n^r\\) or \\(n \\times r\\), especially when \\(r\\).',
          parts: [
                { id: 'a', prompt: 'For a binomial distribution \\(B(n,p)\\), the mean is 8 and the variance is 4.8. Find \\(n\\) and \\(p\\).', answer: 'Given \\(\\mu = np = 8\\) and \\(\\sigma^2 = npq = 4.8\\)',
                  options: ['Given \\(\\mu = np = 8\\) and \\(\\sigma^2 = npq = 4.8\\)', 'nice numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the binomial coefficient \\(\\binom{n}{r}\\) with \\(n^r\\) or \\(n \\times r\\), especially when \\(r\\) is small.' }
          ],
            remediations: { 'students-often-confuse-the-binomial': { steps: ['If a student makes the combinatorial error, immediately revisit c11_math_cbse_07_007 (Combinations: Definition and.', 'Use the visual "choose positions for successes" argument: "Out of 10 trials, choose which 2 are successes — that\'s.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_010', difficulty: 'standard',
          question: 'A Bernoulli trial is a random experiment with exactly two possible outcomes —.',
          hint: 'If stuck, revisit Class 11 Permutations and Combinations (c11_math_cbse_07_007) for.',
          misconception: 'Students incorrectly apply the binomial formula to sampling **without replacement** from a finite population.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Bernoulli trial is a random experiment with exactly two possible outcomes',
                  options: ['A Bernoulli trial is a random experiment with exactly two possible outcomes', 'A random variable is a real-valued function whose domain is the sample space of a random', 'The mean (or expected value) of a discrete random variable X is the weighted average of', 'Two events E and F associated with the same random experiment are said to be'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the binomial formula to sampling **without replacement** from a finite population.' }
          ],
            remediations: { 'students-incorrectly-apply-the-binomial': { steps: ['If a student uses binomial for without-replacement problems: 1.', 'Ask them to list the four Bernoulli conditions and check each for the problem.', 'Explicitly track how the composition changes: after drawing 1 defective, the box has 3 defectives out of 19, so \\(p\\).', 'Show the tree diagram for the first two draws to visualize dependence.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
