import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch07_p1: SimDef = {
    id: 'v3_c9_math_ch07_p1',
    title: 'Probability · Part 1/2',
    subtitle: 'The maths of \'maybe\'',
    classLevel: 9, subject: 'mathematics', topic: 'Probability · Part 1/2',
    chapters: ['c9_math_ch07'],
    nodeIds: ['c9_math_ch7_1', 'c9_math_ch7_10', 'c9_math_ch7_11', 'c9_math_ch7_2', 'c9_math_ch7_3', 'c9_math_ch7_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chance investigator', intro: 'A weather app says 80% rain; a coin flips heads; a die rolls. Learn to describe uncertainty precisely — and to spot the difference between outcomes that can happen and outcomes equally likely to happen.', goal: 'Understand random experiments, possible outcomes and equally likely events — and probability as a 0-to-1 measure of chance rather than a prediction.' },
    discovery: {
        question: 'A bag holds 3 red, 5 blue, 2 green balls — all identical. You pull one blindfolded. Three outcomes: red, blue, green — so each has a 1/3 chance, right?',
        options: ['No — possible outcomes aren\'t automatically equally likely; the counts differ, so blue is likelier than red or green', 'Yes — three options always means a third each', 'Yes — if you pick fast enough', 'No — probability only works with coins'],
        answer: 'No — possible outcomes aren\'t automatically equally likely; the counts differ, so blue is likelier than red or green',
        hook: 'Random doesn\'t mean lawless — a coin can\'t be predicted on one toss, yet lands near 50/50 over a thousand. And probability 0.8 rain still leaves a real 20% dry day; only exactly 1 means \'certain.\'',
    },
    teaching: [
        { title: 'Probability: Introduction and Randomness in Everyday Life', text: 'Probability is the mathematical study of uncertainty that quantifies the likelihood of an event occurring, expressed as a number between 0 and 1 where 0 indicates impossibility and 1 indicates.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch7_1', title: 'Your mission',
          mission: { widget: 'cycle', validate: 'cycle:heat=60',
            instruction: 'On the lab: add heat to 60 — how does the cycle respond?.',
        context: 'Sort the world into deterministic vs random experiments, list sample spaces for coins, dice and cards, and bust the gambler\'s fallacy: ten heads in a row does NOT make the eleventh toss \'due\' for tails.',
            observePrompt: 'What did the cycle interactive show you?' } },
        { type: 'case', nodeId: 'c9_math_ch7_1', title: 'Probability: Introduction and Randomness in Everyday Life',
          caseStudy: { intro: 'Imagine you are watching a cricket match and the commentator says "There\'s a 70% chance of rain interrupting play." How did they get that number?',
            decisions: [{ prompt: 'Which of the following is a random experiment? (a) Adding 5 and 7 (b) Measuring the length of your desk with a ruler (c) Rolling a fair.', options: [
                { text: 'Correct answer: (c) Rolling a fair six-sided die', outcome: 'Correct answer: (c) Rolling a fair six-sided die. A wrong answer reveals the student cannot.' },
                { text: 'random', outcome: 'Not quite — Students often believe that "random" means "completely unpredictable with no pattern whatsoever.".', reveals: 'random-means-completely-unpredictable-with' },
                { text: 'completely unpredictable with no pattern whatsoever', outcome: 'Not quite — Students often believe that "random" means "completely unpredictable with no pattern whatsoever.".', reveals: 'random-means-completely-unpredictable-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_math_ch7_10', title: 'Tree Diagrams for Probability Problems',
          scaffold: { problem: 'A box contains 6 good pens and 4 defective pens. Two pens are drawn at random one after the other WITHOUT replacement.',
            steps: [
            { text: 'Identify the experiment: two draws without replacement. First draw: total pens = 10, good = 6, defective = 4.' },
            { text: 'Draw the first level branches: Good (6/10) and Defective (4/10).' },
            { text: 'For each first branch, draw second level branches with updated counts.' },
            { text: 'Identify the target path: Good then Good. Multiply along the branches: P(Good then Good) = (6/10) × (5/9) = 30/90.' },
            { text: 'Simplify the fraction: 30/90 = 1/3. Interpret: There is a 1/3 chance both pens are good.', faded: true, blankAnswer: '1/3' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch7_11', title: 'Probability in Real-Life: Weather, Games and Insurance',
          scaffold: { problem: 'In Delhi, a weather station recorded the following data for the month of July over the past 10 years: It rained on 280 days out of 310 July.',
            steps: [
            { text: 'Identify the total number of trials (July days in 10 years) = 10 years × 31 days = 310 days.' },
            { text: 'Compute experimental probability of rain on a July day: P(rain) = 280/310 = 28/31 ≈ 0.903.' },
            { text: 'Compute complementary probability of no rain: P(no rain) = 1 - 28/31 = 3/31 ≈ 0.097.' },
            { text: 'Calculate expected cost for outdoor venue: Expected loss = P(rain) × loss due to rain + P(no rain) × 0 = (28/31).' },
            { text: 'Calculate expected cost for indoor venue: Extra cost = ₹50,000 (no rain loss because indoor).' },
            { text: 'Compare expected costs: ₹1,80,645 (outdoor) > ₹50,000 (indoor).', faded: true, blankAnswer: '(a) P(rain) = 28/31 ≈ 0.903. (b) Yes, book the indoor venue.' }
            ] } },
        { type: 'case', nodeId: 'c9_math_ch7_2', title: 'Probability Scale: From 0 to 1',
          caseStudy: { intro: 'Imagine you check the weather forecast before a school picnic and it says "30% chance of rain" — what does that number actually tell you about whether you.',
            decisions: [{ prompt: 'What is the range of possible values for the probability of any event? Write your answer as an inequality.', options: [
                { text: '0 ≤ P(E) ≤ 1', outcome: 'The correct answer is 0 ≤ P(E) ≤ 1. A wrong answer like "0 < P(E) < 1" reveals the student does not.' },
                { text: '0 < P(E) < 1', outcome: 'Not quite — Students write probability as "2:3" or "2 out of 5" without converting to a single number between 0.', reveals: 'students-write-probability-as-2' },
                { text: '0 to 100', outcome: 'Not quite — Students write probability as "2:3" or "2 out of 5" without converting to a single number between 0.', reveals: 'students-write-probability-as-2' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_math_ch7_3', title: 'Experimental Probability: Empirical Approach',
          scaffold: { problem: 'In a manufacturing plant, a quality control inspector tests 500 light bulbs and finds 15 defective ones.',
            steps: [
            { text: 'Identify total trials = 500 bulbs tested; favourable outcomes (defective) = 15.' },
            { text: 'Write the experimental probability formula: P(defective) = Number of defective bulbs / Total bulbs tested.' },
            { text: 'Substitute values: P(defective) = 15 / 500.' },
            { text: 'Simplify the fraction: divide numerator and denominator by 5 → 3/100 = 0.03.' },
            { text: 'Expected defective bulbs in 10,000 = 0.03 × 10,000 = 300 bulbs.', faded: true, blankAnswer: 'Experimental probability = 0.03 (or 3/100); Expected.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch7_4', title: 'Theoretical Probability: Classical Definition',
          scaffold: { problem: 'A box contains 12 red, 8 blue, and 5 green balls. One ball is drawn at random.',
            steps: [
            { text: 'Identify the total number of balls (sample space size). Total = 12 red + 8 blue + 5 green = 25 balls. So n(S) = 25.' },
            { text: 'For (i), identify favourable outcomes for "red ball". Number of red balls = 12. So n(E₁) = 12.' },
            { text: 'Apply classical formula: P(red) = n(E₁)/n(S) = 12/25.' },
            { text: 'For (ii), "not green" means red or blue. Favourable outcomes = 12 + 8 = 20. So n(E₂) = 20.' },
            { text: 'P(not green) = 20/25 = 4/5. Verify: P(green) = 5/25 = 1/5, so P(not green) = 1 - 1/5 = 4/5. Consistent.', faded: true, blankAnswer: '(i) 12/25, (ii) 4/5' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch7_4', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch7_1', title: 'Use it in the wild',
          caseStudy: { intro: 'An app shows \'rain tomorrow: 0.8.\' Neha packs for a picnic anyway, and her friend warns, \'Point eight is basically one — it will definitely rain.\' Neha counters with a coin argument.',
            decisions: [{ prompt: 'What does 0.8 actually promise?', options: [
                { text: 'An 80% chance — likely but not certain; probability 1 alone means certainty, and 0.8 leaves a live 20% for a dry day. It measures likelihood, it does not guarantee an outcome — a fair coin\'s two sides are equally likely precisely because symmetry justifies it.', outcome: 'This reads probability as quantified uncertainty — a number in [0,1] — rather than a disguised prediction.' },
                { text: 'The friend is right — any probability above a half means the event will happen.', outcome: 'Then \'80% chance of rain\' would wrongly forbid the 20% dry outcome; below 1, the complement always stays possible.', reveals: 'high-means-certain' },
                { text: 'Neha\'s coin logic misfires — every coin toss has three outcomes since it could land on its edge, so nothing is ever 50-50.', outcome: 'The edge outcome is vanishingly rare and excluded from the idealised model; \'equally likely\' covers the model\'s outcomes, not every physical possibility.', reveals: 'coin-has-three-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch7_4', title: 'The bigger picture',
          caseStudy: { intro: 'Probability turns \'maybe\' into a number between 0 and 1 — but only when the outcomes are truly equally likely does counting them work. Chance has rules; randomness isn\'t chaos.',
            decisions: [{ prompt: 'What comes next? Probability · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Probability · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cycle', prompt: 'Explore the cycle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cycle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch7_1', difficulty: 'standard',
          question: 'Probability is the mathematical study of uncertainty that quantifies the.',
          hint: 'If stuck, revisit c6_math_ch09_103 (Introduction to Probability) and c8_math_ch12_12.',
          misconception: 'Students often believe that "random" means "completely unpredictable with no pattern whatsoever." They think if.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a random experiment? (a) Adding 5 and 7 (b) Measuring the length of your desk with a ruler (c) Rolling a fair six-sided die (d).', answer: 'Correct answer: (c) Rolling a fair six-sided die',
                  options: ['Correct answer: (c) Rolling a fair six-sided die', 'random', 'completely unpredictable with no pattern whatsoever', '"random" means "completely unpredictable with no pattern whatsoever'],
                  hint: 'If stuck, revisit c6_math_ch09_103 (Introduction to Probability) and c8_math_ch12_12 (Line plots.',
                  misconception: 'Students often believe that "random" means "completely unpredictable with no pattern whatsoever." They think if an experiment is random.' },
                { id: 'b', prompt: 'A bag contains 3 red balls, 5 blue balls, and 2 green balls. All balls are identical in size and texture.', answer: 'Possible outcomes: Red (R), Blue (B), Green (G)',
                  options: ['Possible outcomes: Red (R), Blue (B), Green (G)', 'possible outcomes', 'random', 'completely unpredictable with no pattern whatsoever'],
                  hint: 'If stuck, revisit c6_math_ch09_103 (Introduction to Probability) and c8_math_ch12_12 (Line plots.',
                  misconception: 'Students often believe that "random" means "completely unpredictable with no pattern whatsoever." They think if an experiment is random.' },
                { id: 'c', prompt: 'Consider two random experiments: Experiment A: Toss a fair coin twice. Experiment B: Toss two fair coins simultaneously.', answer: 'Yes, the sample spaces are the same: {HH, HT, TH, TT}',
                  options: ['Yes, the sample spaces are the same: {HH, HT, TH, TT}', 'random', 'completely unpredictable with no pattern whatsoever', '"random" means "completely unpredictable with no pattern whatsoever'],
                  hint: 'If stuck, revisit c6_math_ch09_103 (Introduction to Probability) and c8_math_ch12_12 (Line plots.',
                  misconception: 'Students often believe that "random" means "completely unpredictable with no pattern whatsoever." They think if an experiment is random.' }
          ],
            remediations: { 'random-means-completely-unpredictable-with': { steps: ['To address this, conduct a coin-tossing simulation: Have the student toss a coin 20 times and record the sequence.', 'Show that while each individual toss is unpredictable, the proportion of heads stabilizes around 0.5 as the number.', 'Use a spreadsheet or graph to plot cumulative relative frequency.', 'Explicitly state: "Random does not mean lawless; it means the outcome of a single trial is uncertain, but the long-run.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "random" means "completely unpredictable with no pattern whatsoever." They think if.',
          parts: [
                { id: 'a', prompt: 'A weather forecast says "Probability of rain tomorrow is 0.8." A student concludes: "It will definitely rain tomorrow because 0.8 is close to 1." Evaluate this.', answer: 'The conclusion is incorrect',
                  options: ['The conclusion is incorrect', 'random', 'completely unpredictable with no pattern whatsoever', '"random" means "completely unpredictable with no pattern whatsoever'],
                  hint: 'If stuck, revisit c6_math_ch09_103 (Introduction to Probability) and c8_math_ch12_12 (Line plots.',
                  misconception: 'Students often believe that "random" means "completely unpredictable with no pattern whatsoever." They think if an experiment is random.' }
          ],
            remediations: { 'random-means-completely-unpredictable-with': { steps: ['To address this, conduct a coin-tossing simulation: Have the student toss a coin 20 times and record the sequence.', 'Show that while each individual toss is unpredictable, the proportion of heads stabilizes around 0.5 as the number.', 'Use a spreadsheet or graph to plot cumulative relative frequency.', 'Explicitly state: "Random does not mean lawless; it means the outcome of a single trial is uncertain, but the long-run.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_10', difficulty: 'standard',
          question: 'A tree diagram is a graphical representation used to map all possible outcomes.',
          hint: 'If stuck, revisit fraction multiplication (c6_math_ch03_035) and the concept of sample.',
          misconception: 'Students often treat dependent events (without replacement) as independent by keeping the same denominator for the.',
          parts: [
                { id: 'a', prompt: 'Compare the tree diagrams for "tossing a coin twice" and "drawing two balls without replacement from a bag with 1 red and 1 blue ball".', answer: 'Both have two stages with two branches at each stage (four paths total)',
                  options: ['Both have two stages with two branches at each stage (four paths total)', 'they are identical'],
                  hint: 'If stuck, revisit fraction multiplication (c6_math_ch03_035) and the concept of sample space change.',
                  misconception: 'Students often treat dependent events (without replacement) as independent by keeping the same denominator for the second stage.' }
          ],
            remediations: { 'students-often-treat-dependent-events': { steps: ['If a student makes this error, guide them through a physical simulation: use 3 red and 2 blue counters.', 'Have them draw one, set it aside, then draw the second.', 'Ask: "How many balls are left in the bag?', 'How many reds are left?" Write the numbers on the board: first draw total=5, second draw total=4.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_11', difficulty: 'standard',
          question: 'Probability in real-life contexts quantifies the likelihood of uncertain events.',
          hint: 'If stuck, revisit c9_math_ch7_3 (experimental probability) and c9_math_ch7_5 (sample.',
          misconception: 'Students often treat experimental probability as an exact prediction for a single trial.',
          parts: [
                { id: 'a', prompt: 'Compare the following two situations: Situation A: A meteorologist says "There is a 60% chance of rain tomorrow" based on 30 years of historical data for.', answer: 'Situation A uses experimental (empirical) probability based on observed relative',
                  options: ['Situation A uses experimental (empirical) probability based on observed relative', 'just probabilities'],
                  hint: 'If stuck, revisit c9_math_ch7_3 (experimental probability) and c9_math_ch7_5 (sample space for.',
                  misconception: 'Students often treat experimental probability as an exact prediction for a single trial.' }
          ],
            remediations: { 'students-often-treat-experimental-probability': { steps: ['If a student says "0.7 probability means it will rain 7 out of 10 days", ask: "If you flip a fair coin (P=0.5), do you.', 'They will see variation (3,6,4,5,7).', 'Then explain: Probability describes the long-run average over many, many trials, not a guarantee for a small set.', 'For insurance premium error, give a concrete example: Probability of claim = 0.02, average claim = ₹50,000.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_2', difficulty: 'standard',
          question: 'Probability is a numerical measure of the likelihood of an event occurring.',
          hint: 'If stuck, revisit c6_math_ch03_037 (fractions on number line) and c6_math_ch04_044.',
          misconception: 'Students write probability as "2:3" or "2 out of 5" without converting to a single number between 0 and 1.',
          parts: [
                { id: 'a', prompt: 'What is the range of possible values for the probability of any event? Write your answer as an inequality.', answer: '0 ≤ P(E) ≤ 1',
                  options: ['0 ≤ P(E) ≤ 1', '0 < P(E) < 1', '0 to 100'],
                  hint: 'If stuck, revisit c6_math_ch03_037 (fractions on number line) and c6_math_ch04_044 (comparing.',
                  misconception: 'Students write probability as "2:3" or "2 out of 5" without converting to a single number between 0 and 1.' },
                { id: 'b', prompt: 'Two events A and B have probabilities P(A) = 3/8 and P(B) = 5/8.', answer: 'Event B is more likely',
                  options: ['Event B is more likely', 'converts to decimals (0'],
                  hint: 'If stuck, revisit c6_math_ch03_037 (fractions on number line) and c6_math_ch04_044 (comparing.',
                  misconception: 'Students write probability as "2:3" or "2 out of 5" without converting to a single number between 0 and 1.' }
          ],
            remediations: { 'students-write-probability-as-2': { steps: ['If a student writes probability as a ratio with a colon or gives a value > 1: (1) Draw the probability number line 0–1.', 'Since favourable ≤ total always, the division result ≤ 1 always.', '(3) Practice: give 5 experiments (coin, die, cards, bag of balls, spinner), have student write favourable, total, then.', '(4) Explicitly contrast: "Odds in favour = favourable : unfavourable.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_3', difficulty: 'standard',
          question: 'Experimental probability (empirical probability) of an event E is defined.',
          hint: 'If stuck, revisit c8_math_ch12_12 (line plots and bar graphs) and c7_math_ch13_002.',
          misconception: 'Students often use the number of *unfavourable* outcomes as the denominator instead of total trials.',
          parts: [
                { id: 'a', prompt: 'Two students toss a coin 10 times and 1000 times respectively. Student A gets 7 heads (P=0.7), Student B gets 510 heads (P=0.51).', answer: 'Student B\'s result (0.51) is closer to 0.5 than Student A\'s (0.7)',
                  options: ['Student B\'s result (0.51) is closer to 0.5 than Student A\'s (0.7)', 'both are equally close'],
                  hint: 'If stuck, revisit c8_math_ch12_12 (line plots and bar graphs) and c7_math_ch13_002 (frequency.',
                  misconception: 'Students often use the number of *unfavourable* outcomes as the denominator instead of total trials.' }
          ],
            remediations: { 'students-often-use-the-number': { steps: ['If a student uses the wrong denominator, have them physically count: "How many total seeds did you plant?', 'So the fraction is 30 out of 100." Use a two-column table: Trial Number | Outcome.', 'Emphasise that the denominator is the count of rows in the table (total trials).', 'For the stabilisation misconception, simulate coin tosses in a spreadsheet: show how relative frequency jumps wildly.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch7_4', difficulty: 'standard',
          question: 'Theoretical probability (classical definition) states that for an experiment.',
          hint: 'If stuck, revisit c6_math_ch06_062 (ratio) and c6_math_ch09_103 (basic probability.',
          misconception: 'Students often assume that all outcomes in any experiment are equally likely by default.',
          parts: [
                { id: 'a', prompt: 'State the classical definition of probability for an event E in a sample space S with equally likely outcomes. Write the formula and define each symbol.', answer: 'The classical definition: P(E) = n(E)/n(S), where n(E) is the number of outcomes',
                  options: ['The classical definition: P(E) = n(E)/n(S), where n(E) is the number of outcomes', 'equally likely', 'all outcomes in any experiment are equally likely by default'],
                  hint: 'If stuck, revisit c6_math_ch06_062 (ratio) and c6_math_ch09_103 (basic probability vocabulary) and.',
                  misconception: 'Students often assume that all outcomes in any experiment are equally likely by default.' },
                { id: 'b', prompt: 'A student claims: "When I toss two coins, there are three possible outcomes: two heads, two tails, or one head and one tail.', answer: 'The sample space for two coins is {HH, HT, TH, TT}',
                  options: ['The sample space for two coins is {HH, HT, TH, TT}', 'all outcomes in any experiment are equally likely by default'],
                  hint: 'If stuck, revisit c6_math_ch06_062 (ratio) and c6_math_ch09_103 (basic probability vocabulary) and.',
                  misconception: 'Students often assume that all outcomes in any experiment are equally likely by default.' },
                { id: 'c', prompt: 'A bag contains 5 red, 3 blue, and 2 green marbles. One marble is drawn at random.', answer: 'Total marbles = 5+3+2 = 10',
                  options: ['Total marbles = 5+3+2 = 10', 'all outcomes in any experiment are equally likely by default'],
                  hint: 'If stuck, revisit c6_math_ch06_062 (ratio) and c6_math_ch09_103 (basic probability vocabulary) and.',
                  misconception: 'Students often assume that all outcomes in any experiment are equally likely by default.' }
          ],
            remediations: { 'all-outcomes-in-any-experiment': { steps: ['Ask the student to list every single elementary outcome of the experiment (e.g., for a die: 1,2,3,4,5,6).', 'Have them circle the outcomes that satisfy the event.', 'Count the circled outcomes (n(E)) and total outcomes (n(S)).', 'Emphasize that probability is a ratio of counts, not a ratio of "types of events".'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
