import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch13_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch13_p2: SimDef = {
    id: 'v3_c12_math_ch13_p2',
    title: 'Probability · Part 2/2',
    subtitle: 'The denominator shrank — that\'s the whole trick',
    classLevel: 12, subject: 'mathematics', topic: 'Probability · Part 2/2',
    chapters: ['c12_math_ch13'],
    nodeIds: ['c12_math_cbse_13_007', 'c12_math_cbse_13_008', 'c12_math_cbse_13_009', 'c12_math_cbse_13_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Probability updater', intro: '\'Given that...\' is the most powerful two words in probability — it redraws the entire sample space.', goal: 'Compute conditional probability by renormalising to the condition — and keep P(A|B) ≠ P(B|A) straight.' },
    discovery: {
        question: 'Of 500 students, 200 study Physics and 100 study both. Told a student takes Physics, the chance they also take Math isn\'t 100/500 — why not?',
        options: ['The condition shrank the sample space — only the 200 Physics students count now, so it\'s 100/200; P(E|F) divides by P(F), renormalising to a world where F already happened', 'Because half took both', 'Math is harder', 'Random rounding'],
        answer: 'The condition shrank the sample space — only the 200 Physics students count now, so it\'s 100/200; P(E|F) divides by P(F), renormalising to a world where F already happened',
        hook: 'P(A|B) and P(B|A) aren\'t twins — same numerator, different denominators. And \'P(E|F) = P(E)·P(F)\' is an independence formula smuggled into a conditional problem; the right answer can be numerically lucky while the reasoning is wrong.',
    },
    teaching: [
        { title: 'Random Variables and Probability Distribution', text: 'A random variable is a real-valued function whose domain is the sample space of a random experiment. It assigns a unique real number to each outcome in the sample space.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_13_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Condition a probability correctly: redraw the sample space after the given event, compute the renormalised ratio, and keep the direction of conditioning straight.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_007', title: 'Random Variables and Probability Distribution',
          scaffold: { problem: 'A game at a school fair involves drawing two cards successively without replacement from a well-shuffled deck of 52 cards.',
            steps: [
            { text: 'Identify the possible values of X. Since two cards are drawn, X can be 0, 1, or 2.' },
            { text: 'Compute P(X=0) = probability both cards are non-aces. There are 48 non-aces. P = (48/52) * (47/51) = 188/221.' },
            { text: 'Compute P(X=2) = probability both cards are aces. There are 4 aces. P = (4/52) * (3/51) = 1/221.' },
            { text: 'Compute P(X=1) = 1 - P(X=0) - P(X=2) = 1 - 188/221 - 1/221 = 32/221.' },
            { text: 'Verify sum = 188/221 + 32/221 + 1/221 = 221/221 = 1.', faded: true, blankAnswer: 'X: 0, 1, 2; P(X): 188/221, 32/221, 1/221.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_008', title: 'Mean and Variance of Random Variable',
          scaffold: { problem: 'A vegetable vendor sells tomatoes at ₹40/kg. On a given day, the demand (in kg) is a random variable X with distribution: P(X=10)=0.1.',
            steps: [
            { text: 'Identify the random variable for revenue. Let R = 40X (since price is ₹40/kg).' },
            { text: 'Compute E(R) using E(R) = Σ r_i P(R=r_i) = 400×0.1 + 800×0.3 + 1200×0.4 + 1600×0.2.' },
            { text: 'Calculate: 40 + 240 + 480 + 320 = 1080. So mean revenue = ₹1080.' },
            { text: 'Compute E(R²) = Σ r_i² P(R=r_i) = 400²×0.1 + 800²×0.3 + 1200²×0.4 + 1600²×0.2 = 160000×0.1 + 640000×0.3 + 1440000×0.4.' },
            { text: 'Var(R) = E(R²) - [E(R)]² = 1,296,000 - (1080)² = 1,296,000 - 1,166,400 = 129,600. Variance = 129,600 rupees².', faded: true, blankAnswer: 'Mean revenue = ₹1080, Variance = 129,600 rupees².' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_009', title: 'Binomial Distribution: Definition and Properties',
          scaffold: { problem: 'A bag contains 5 red and 7 blue balls. Four balls are drawn one by one with replacement. Find the probability that exactly 2 balls are red.',
            steps: [
            { text: 'Identify the experiment: drawing a ball 4 times with replacement.' },
            { text: 'Define random variable \\(X\\) = number of red balls in 4 draws. \\(X \\sim B(4, 5/12)\\).' },
            { text: 'Write the binomial formula for \\(r=2\\): \\(P(X=2) = \\binom{4}{2} (5/12)^2 (7/12)^2\\).' },
            { text: 'Compute \\(\\binom{4}{2} = \\frac{4 \\times 3}{2} = 6\\). \\((5/12)^2 = 25/144\\), \\((7/12)^2 = 49/144\\).' },
            { text: 'Mean \\(\\mu = np = 4 \\times \\frac{5}{12} = \\frac{5}{3} \\approx 1.667\\).', faded: true, blankAnswer: '\\(P(\\text{exactly 2 red}) = \\frac{1225}{3456} \\approx.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_010', title: 'Bernoulli Trials and Binomial Distribution',
          scaffold: { problem: 'In a multiple-choice test with 20 questions, each question has 4 options with exactly one correct answer.',
            steps: [
            { text: 'Verify Bernoulli conditions: fixed \\(n=20\\) trials (questions); two outcomes per trial (correct/incorrect); constant.' },
            { text: 'Identify parameters: \\(n = 20\\), \\(p = 0.25\\), \\(q = 1-p = 0.75\\), \\(k = 5\\).' },
            { text: 'Write binomial PMF: \\(P(X=5) = \\binom{20}{5} (0.25)^5 (0.75)^{15}\\).' },
            { text: 'Compute \\(\\binom{20}{5} = \\frac{20 \\times 19 \\times 18 \\times 17 \\times 16}{5 \\times 4 \\times 3 \\times 2 \\times 1}.' },
            { text: 'Mean \\(\\mu = np = 20 \\times 0.25 = 5\\). Variance \\(\\sigma^2 = npq = 20 \\times 0.25 \\times 0.75 = 3.75\\).', faded: true, blankAnswer: '\\(P(X=5) \\approx 0.2023\\); Expected correct answers = 5.' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_13_010', title: 'Rapid check',
          drill: { kind: 'linear2', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_13_007', title: 'A real-world call',
          caseStudy: { intro: 'Probability powers insurance — a pool where everyone pays a little so nobody loses everything. The same math powers gambling apps — engineered to make the house win while feeling fair.',
            decisions: [{ prompt: 'Is the math responsible for how it\'s used?', options: [
                { text: 'No — probability is a tool, not an intent', outcome: 'True of the math itself; the app designer\'s intent is a different question the math doesn\'t answer.' },
                { text: 'Yes — understanding it means seeing the exploitation', outcome: 'The literacy answer — whoever can compute expected value can see the game is rigged; teaching the math is itself a defense.' },
                { text: 'Regulate the use, not the math', outcome: 'The policy answer — probability stays free; gambling apps get odds-disclosure requirements most users never read.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A QC dashboard at a snack factory flags \'packet is defective.\' A trainee asks: \'If the chance it\'s a sealing defect is 40%, is the chance it\'s NOT a sealing defect still 60% — or does being a defective packet change the maths?\'',
            decisions: [{ prompt: 'What does conditional probability say?', options: [
                { text: 'The complement rule survives conditioning — inside the defective-packet universe, P(E′|F) = 1 − P(E|F), so yes, 60% — but only because conditioning restricted the sample space to defective packets first; the unconditional numbers would be different.', outcome: 'The chapter\'s point: conditioning doesn\'t break probability\'s algebra, it relocates it — all the rules work, but they work inside F\'s shrunken universe, not the original one.' },
                { text: 'It\'s not 60% — conditioning breaks the complement rule, so you\'d need the raw numbers again.', outcome: 'Conditional probability inherits every ordinary rule within the conditioned space — P(E′|F) = 1 − P(E|F) follows straight from the definition; the rule isn\'t broken, the denominator changed.', reveals: 'conditioning-breaks-rules' },
                { text: 'It\'s 60% because the overall defect rate never changed.', outcome: 'Right answer, wrong reason — the complement holds inside F, but the \'overall rate\' is irrelevant; what changed is the sample space, and forgetting that is how conditional answers get quietly replaced by unconditional ones.', reveals: 'right-answer-wrong-space' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_13_010', title: 'You made it',
          caseStudy: { intro: 'You can now update probability on new information — and see why the denominator, not the question, is what changed.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_13_007', difficulty: 'standard',
          question: 'A random variable is a real-valued function whose domain is the sample space.',
          hint: 'If stuck, revisit c9_math_ch7_5 (Sample Space) and c12_math_cbse_13_003 (Multiplication.',
          misconception: 'Students often confuse the random variable (the function mapping outcomes to numbers) with its values (the numbers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A random variable is a real-valued function whose domain is the sample space of a random',
                  options: ['A random variable is a real-valued function whose domain is the sample space of a random', 'Conditional probability of an event E given that event F has already occurred, denoted', 'The properties of conditional probability are rules that allow us to manipulate', 'The Multiplication Theorem on Probability states that for any two events E and F'],
                  hint: 'If stuck, revisit c9_math_ch7_5 (Sample Space) and c12_math_cbse_13_003 (Multiplication Theorem).',
                  misconception: 'Students often confuse the random variable (the function mapping outcomes to numbers) with its values (the numbers themselves).' }
          ],
            remediations: { 'students-often-confuse-the-random': { steps: ['If the student cannot construct a probability distribution, first revisit the definition of a random variable as.', 'Then compute the probability of each value by summing the probabilities of the outcomes that map to that value.', 'Verify the two conditions.', 'Practice with c11_math_cbse_07_001 (counting principles) and c12_math_cbse_13_003 (multiplication theorem for.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the random variable (the function mapping outcomes to numbers) with its values (the numbers.',
          parts: [
                { id: 'a', prompt: 'A student writes the following probability distribution for the number of heads \\(X\\) in 3 tosses of a fair coin: \\(P(X=0)=\\frac{1}{8}, P(X=1)=\\frac{3}{8}.', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'probabilities are \\(\\frac{1}{4}\\'],
                  hint: 'If stuck, revisit c9_math_ch7_5 (Sample Space) and c12_math_cbse_13_003 (Multiplication Theorem).',
                  misconception: 'Students often confuse the random variable (the function mapping outcomes to numbers) with its values (the numbers themselves).' }
          ],
            remediations: { 'students-often-confuse-the-random': { steps: ['If the student cannot construct a probability distribution, first revisit the definition of a random variable as.', 'Then compute the probability of each value by summing the probabilities of the outcomes that map to that value.', 'Verify the two conditions.', 'Practice with c11_math_cbse_07_001 (counting principles) and c12_math_cbse_13_003 (multiplication theorem for.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_008', difficulty: 'standard',
          question: 'The mean (or expected value) of a discrete random variable X is the weighted.',
          hint: 'Revisit c12_math_cbse_13_007 (Random Variables and Probability Distribution) and practice.',
          misconception: 'Students often confuse the formula for variance: they compute E(X²) - E(X) instead of E(X²) - [E(X)]², forgetting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mean (or expected value) of a discrete random variable X is the weighted average of',
                  options: ['The mean (or expected value) of a discrete random variable X is the weighted average of', 'Conditional probability of an event E given that event F has already occurred, denoted', 'The properties of conditional probability are rules that allow us to manipulate', 'The Multiplication Theorem on Probability states that for any two events E and F'],
                  hint: 'Revisit c12_math_cbse_13_007 (Random Variables and Probability Distribution) and practice writing.',
                  misconception: 'Students often confuse the formula for variance: they compute E(X²) - E(X) instead of E(X²) - [E(X)]², forgetting to square the mean.' }
          ],
            remediations: { 'students-often-confuse-the-formula': { steps: ['If a student makes the "forget to square" error, have them write the definition Var(X) = E[(X-μ)²] and expand it step.', 'Then take expectation: E(X²) - 2μE(X) + μ² = E(X²) - 2μ² + μ² = E(X²) - μ².', 'Emphasize that μ = E(X) so μ² = [E(X)]².', 'Practice with a simple distribution (e.g., X=1,2 with equal prob) where the difference is obvious.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_009', difficulty: 'standard',
          question: 'A binomial distribution is the probability distribution of the number.',
          hint: 'If stuck, revisit c11_math_cbse_07_007 for combinations and c12_math_cbse_13_007 for.',
          misconception: 'Students often confuse the binomial coefficient \\(\\binom{n}{r}\\) with \\(n^r\\) or \\(n \\times r\\), especially when \\(r\\).',
          parts: [
                { id: 'a', prompt: 'In a factory, 5% of items produced are defective. A quality control inspector selects 20 items at random.', answer: '\\(n=20\\), \\(p=0.05\\), \\(q=0.95\\), \\(r=2\\)',
                  options: ['\\(n=20\\), \\(p=0.05\\), \\(q=0.95\\), \\(r=2\\)', 'computes \\(\\binom{20}{2}=380\\) (forgetting to divide by 2) or uses \\(p=0'],
                  hint: 'If stuck, revisit c11_math_cbse_07_007 for combinations and c12_math_cbse_13_007 for random.',
                  misconception: 'Students often confuse the binomial coefficient \\(\\binom{n}{r}\\) with \\(n^r\\) or \\(n \\times r\\), especially when \\(r\\) is small.' },
                { id: 'b', prompt: 'For a binomial distribution \\(B(n,p)\\), the mean is 8 and the variance is 4.8. Find \\(n\\) and \\(p\\).', answer: 'Given \\(\\mu = np = 8\\) and \\(\\sigma^2 = npq = 4.8\\)',
                  options: ['Given \\(\\mu = np = 8\\) and \\(\\sigma^2 = npq = 4.8\\)', 'nice numbers', 'sets \\(q = 4'],
                  hint: 'If stuck, revisit c11_math_cbse_07_007 for combinations and c12_math_cbse_13_007 for random.',
                  misconception: 'Students often confuse the binomial coefficient \\(\\binom{n}{r}\\) with \\(n^r\\) or \\(n \\times r\\), especially when \\(r\\) is small.' }
          ],
            remediations: { 'students-often-confuse-the-binomial': { steps: ['If a student makes the combinatorial error, immediately revisit c11_math_cbse_07_007 (Combinations: Definition and.', 'Use the visual "choose positions for successes" argument: "Out of 10 trials, choose which 2 are successes — that\'s.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_010', difficulty: 'standard',
          question: 'A Bernoulli trial is a random experiment with exactly two possible outcomes.',
          hint: 'If stuck, revisit Class 11 Permutations and Combinations (c11_math_cbse_07_007) for.',
          misconception: 'Students incorrectly apply the binomial formula to sampling **without replacement** from a finite population.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Bernoulli trial is a random experiment with exactly two possible outcomes',
                  options: ['A Bernoulli trial is a random experiment with exactly two possible outcomes', 'Conditional probability of an event E given that event F has already occurred, denoted', 'The properties of conditional probability are rules that allow us to manipulate', 'The Multiplication Theorem on Probability states that for any two events E and F'],
                  hint: 'If stuck, revisit Class 11 Permutations and Combinations (c11_math_cbse_07_007) for.',
                  misconception: 'Students incorrectly apply the binomial formula to sampling **without replacement** from a finite population.' }
          ],
            remediations: { 'students-incorrectly-apply-the-binomial': { steps: ['If a student uses binomial for without-replacement problems: 1.', 'Ask them to list the four Bernoulli conditions and check each for the problem.', 'Explicitly track how the composition changes: after drawing 1 defective, the box has 3 defectives out of 19, so \\(p\\).', 'Show the tree diagram for the first two draws to visualize dependence.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
