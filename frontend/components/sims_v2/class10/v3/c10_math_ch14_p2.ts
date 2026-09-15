import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch14_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch14_p2: SimDef = {
    id: 'v3_c10_math_ch14_p2',
    title: 'Probability · Part 2/2',
    subtitle: 'Learn why \'it happens or it doesn\'t\' is bad maths',
    classLevel: 10, subject: 'mathematics', topic: 'Probability · Part 2/2',
    chapters: ['c10_math_ch14'],
    nodeIds: ['c10_math_cbse_14_007', 'c10_math_cbse_14_008', 'c10_math_cbse_14_009', 'c10_math_cbse_14_010', 'c10_math_cbse_14_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a game analyst rating fair chances', intro: 'A friend insists the lottery is 50-50: \'either I win or I don\'t.\' Tonight you learn to count outcomes honestly — and see why casinos, card games and weather forecasts all run on favourable-over-total.', goal: 'Apply the classical probability formula to simple experiments and reason correctly about equally likely outcomes.' },
    discovery: {
        question: 'A coin lands heads 5 times in a row. What is the chance of heads on flip six?',
        options: ['Still 1/2 — the coin has no memory', 'Less than 1/2 — tails is \'due\'', 'More than 1/2 — heads is \'hot\'', 'It depends on the coin\'s weight'],
        answer: 'Still 1/2 — the coin has no memory',
        hook: 'The gambler\'s fallacy has bankrupted real people. Probability does not keep score.',
    },
    teaching: [
        { title: 'Probability of Complement: Finding P(not E)', text: 'The complement of an event E, denoted E\' or "not E", is the event that E does NOT occur. The probability of the complement is P(not E) = 1 − P(E).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_14_007', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Assign honest probabilities to cards, coins, dice and coloured balls — count sample spaces carefully, and catch the trap where \'happens or doesn\'t\' is not the same as 50–50.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_007', title: 'Probability of Complement: Finding P(not E)',
          scaffold: { problem: 'A die is rolled. Find the probability of NOT getting a number divisible by 3.',
            steps: [
            { text: 'Sample space S = {1, 2, 3, 4, 5, 6}, n = 6.' },
            { text: 'Event E = "divisible by 3" = {3, 6}, m = 2. P(E) = 2/6 = 1/3.' },
            { text: 'Complement "not E" = "not divisible by 3" = {1, 2, 4, 5}, m = 4.' },
            { text: 'P(not E) = 1 − P(E) = 1 − 1/3 = 2/3. (Direct: 4/6 = 2/3. ✓)', faded: true, blankAnswer: 'P(not divisible by 3) = 2/3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_008', title: 'Word Problems: Probability with Dice',
          scaffold: { problem: 'In a board game, Ravi needs a sum of 9 or more on two dice to reach the finish line. What is the probability that Ravi wins on this turn?',
            steps: [
            { text: 'Identify the experiment — rolling two fair six-faced dice simultaneously.' },
            { text: 'Define the event E = "sum of numbers on the two dice is 9 or more". This means sum ∈ {9, 10, 11, 12}.' },
            { text: 'Systematically list favourable ordered pairs using the 6×6 grid method:' },
            { text: 'Apply the probability formula P(E) = n(E)/n(S) = 10/36.' },
            { text: 'Simplify the fraction by dividing numerator and denominator by HCF(10,36)=2. P(E) = 5/18.' },
            { text: 'Verify: 5/18 ≈ 0.278. Since sums 9-12 are the higher sums, probability should be less than 0.5.', faded: true, blankAnswer: '5/18' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_009', title: 'Word Problems: Probability with Playing Cards',
          scaffold: { problem: 'A card is drawn at random from a well-shuffled standard deck of 52 playing cards.',
            steps: [
            { text: 'Identify the sample space. A standard deck has 52 cards: 4 suits (Hearts ♥, Diamonds ♦, Clubs ♣, Spades ♠), each with.' },
            { text: 'For (i) red king — red suits are Hearts and Diamonds. Kings in red suits: King of Hearts, King of Diamonds = 2 cards.' },
            { text: 'For (ii) face card — face cards are Jack, Queen, King of each suit. 3 face cards × 4 suits = 12 cards. n(E₂) = 12.' },
            { text: 'For (iii) black number card >5 and <10 — black suits: Clubs, Spades.' },
            { text: 'Apply P(E) = n(E)/52 for each. (i) P(red king) = 2/52 = 1/26. (ii) P(face card) = 12/52 = 3/13.' },
            { text: 'Verify each probability is between 0 and 1, fractions are simplified, and answers make sense (red king is rare, face.', faded: true, blankAnswer: '(i) 1/26, (ii) 3/13, (iii) 2/13' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_14_010', title: 'Word Problems: Probability with Coins (Tossing One and Two)',
          scaffold: { problem: 'At a school fair in Mumbai, a game stall has a "Double Coin Toss" game. You toss two fair coins simultaneously.',
            steps: [
            { text: 'Identify the experiment — tossing two fair coins simultaneously. Write down the sample space S.' },
            { text: 'Identify the event E — "at least one head". This means 1 head or 2 heads.' },
            { text: 'Apply the probability formula P(E) = n(E) / n(S) = 3/4.' },
            { text: 'Calculate expected winners out of 200 students. Expected number = Probability × Total trials = (3/4) × 200 = 150.' },
            { text: 'Interpret the result — probability of winning is 3/4 or 0.75. Out of 200 students, about 150 are expected to win.', faded: true, blankAnswer: 'Probability of winning = 3/4. Expected winners out of 200.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_14_011', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school fair, a game stall offers: draw one marble blindfolded from a bag of 20 — 8 green, 7 yellow, 5 blue — and win a prize only on blue. The stallholder calls it \'a fair game, one-in-three colours.\'',
            decisions: [{ prompt: 'Is the game fair?', options: [
                { text: 'No — probability counts marbles, not colour names. P(blue) = 5/20 = 1/4, so a player wins only one draw in four while the stall keeps the other three quarters. \'Three colours\' does not mean three equal chances — the counts of each colour decide the odds.', outcome: 'This is the core of probability: each marble is equally likely, so uneven counts make the colours uneven — a classic way \'fair-looking\' games are tilted.' },
                { text: 'The stallholder is right — with three colours the chance of any one is one in three, so the game is fair.', outcome: 'Colours are not outcomes — marbles are. With only 5 blue among 20, blue\'s chance is 1/4, not 1/3, and the stall quietly profits from the difference.', reveals: 'equal-colours-equal-chance' },
                { text: 'The game is unfair only if marbles are removed mid-game — with a fixed bag the stated odds must be true.', outcome: 'A fixed bag still hides uneven counts; the fairness depends on how many blue marbles there are, not on whether the bag changes.', reveals: 'fixed-bag-means-fair' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_14_011', title: 'You made it',
          caseStudy: { intro: 'Sample spaces, events, odds — you now think in likelihoods, not gut feelings. That is a life skill disguised as math.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_14_007', difficulty: 'standard',
          question: 'The complement of an event E, denoted E\' or "not E", is the event that E does.',
          hint: 'Review the classical definition (c10_math_cbse_14_001). Practice identifying the.',
          misconception: 'Students often try to directly count favourable outcomes for "at least one" problems, which is tedious and error-prone.',
          parts: [
                { id: 'a', prompt: 'State the complement rule for probability.', answer: 'P(not E) = 1 − P(E), where "not E" is the complement of event E',
                  options: ['P(not E) = 1 − P(E), where "not E" is the complement of event E', 'P(not E) = P(E)', 'with the opposite outcome —', 'is not'],
                  hint: 'Review the classical definition (c10_math_cbse_14_001). Practice identifying the complement of.',
                  misconception: 'Students often try to directly count favourable outcomes for "at least one" problems, which is tedious and error-prone.' },
                { id: 'b', prompt: 'If P(E) = 0.3, find P(not E).', answer: 'P(not E) = 1 − 0.3 = 0.7',
                  options: ['P(not E) = 1 − 0.3 = 0.7', 'with the opposite outcome —', 'is not'],
                  hint: 'Review the classical definition (c10_math_cbse_14_001). Practice identifying the complement of.',
                  misconception: 'Students often try to directly count favourable outcomes for "at least one" problems, which is tedious and error-prone.' },
                { id: 'c', prompt: 'A die is rolled. What is the probability of NOT getting a prime number?', answer: 'P(prime) = 3/6 = 1/2 (primes: 2, 3, 5)',
                  options: ['P(prime) = 3/6 = 1/2 (primes: 2, 3, 5)', 'with the opposite outcome —', 'is not'],
                  hint: 'Review the classical definition (c10_math_cbse_14_001). Practice identifying the complement of.',
                  misconception: 'Students often try to directly count favourable outcomes for "at least one" problems, which is tedious and error-prone.' }
          ],
            remediations: { 'students-often-try-to-directly': { steps: ['Practice the complement trick: for "at least one" problems, compute P(none) and subtract from 1.', 'Verify: P(E) + P(not E) should always equal 1.', 'Emphasise: "not E" includes ALL outcomes not in E, not just one alternative.', 'Practice 10 problems using both direct counting and the complement rule to see the efficiency.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often try to directly count favourable outcomes for "at least one" problems, which is tedious and error-prone.',
          parts: [
                { id: 'a', prompt: 'A bag has 10 balls, 4 of which are defective. What is the probability of drawing a non-defective ball?', answer: 'P(defective) = 4/10 = 2/5',
                  options: ['P(defective) = 4/10 = 2/5', 'with the opposite outcome —', 'is not'],
                  hint: 'Review the classical definition (c10_math_cbse_14_001). Practice identifying the complement of.',
                  misconception: 'Students often try to directly count favourable outcomes for "at least one" problems, which is tedious and error-prone.' },
                { id: 'b', prompt: 'Three coins are tossed. Use the complement rule to find the probability of getting at least one head.', answer: 'P(at least one head) = 1 − P(no heads) = 1 − P(TTT) = 1 − 1/8 = 7/8',
                  options: ['P(at least one head) = 1 − P(no heads) = 1 − P(TTT) = 1 − 1/8 = 7/8', 'with the opposite outcome —', 'is not', 'all 7 favourable outcomes and getting 7/8 without using the complement'],
                  hint: 'Review the classical definition (c10_math_cbse_14_001). Practice identifying the complement of.',
                  misconception: 'Students often try to directly count favourable outcomes for "at least one" problems, which is tedious and error-prone.' }
          ],
            remediations: { 'students-often-try-to-directly': { steps: ['Practice the complement trick: for "at least one" problems, compute P(none) and subtract from 1.', 'Verify: P(E) + P(not E) should always equal 1.', 'Emphasise: "not E" includes ALL outcomes not in E, not just one alternative.', 'Practice 10 problems using both direct counting and the complement rule to see the efficiency.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_008', difficulty: 'standard',
          question: 'In dice probability word problems, the sample space consists of all possible.',
          hint: 'If stuck, immediately revisit c10_math_cbse_14_002 (Sample Space and Events) and practice.',
          misconception: 'The most pervasive board exam error is treating the set of possible sums {2,3,...,12} as the sample space with 11.',
          parts: [
                { id: 'a', prompt: 'Two dice are rolled simultaneously. Find the probability that the product of the numbers appearing on the top faces is a perfect square.', answer: 'Step 1: Sample space = 36 ordered pairs (i, j), i,j ∈ {1..6}',
                  options: ['Step 1: Sample space = 36 ordered pairs (i, j), i,j ∈ {1..6}', 'product is square', 'both numbers are squares'],
                  hint: 'If stuck, immediately revisit c10_math_cbse_14_002 (Sample Space and Events) and practice drawing.',
                  misconception: 'The most pervasive board exam error is treating the set of possible sums {2,3,...,12} as the sample space with 11 equally likely outcomes.' }
          ],
            remediations: { 'the-most-pervasive-board-exam': { steps: ['If a student uses sums as sample space: 1) Make them physically roll two different-colored dice (red and blue) 20 times.', '2) Have them tally how many times each sum appears — they\'ll see 7 appears far more than 2.', '3) Explicitly write the 6×6 grid on paper: rows = die 1, columns = die 2.', '4) For any event, they must shade cells in this grid, not just write sums.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_009', difficulty: 'standard',
          question: 'Word problems on probability with playing cards involve calculating the.',
          hint: 'Revisit c10_math_cbse_14_003 for probability formula and c10_math_cbse_14_005 for.',
          misconception: 'Students treat "king or queen" as 4 + 4 = 8 favourable outcomes correctly, but for "spade or ace" they write 13 + 4.',
          parts: [
                { id: 'a', prompt: 'How many cards are there in a standard deck, and how many of them are face cards? Write the probability of drawing a face card in simplest form.', answer: 'A standard deck has 52 cards',
                  options: ['A standard deck has 52 cards', 'face card', 'picture card'],
                  hint: 'Revisit c10_math_cbse_14_003 for probability formula and c10_math_cbse_14_005 for complement rule.',
                  misconception: 'Students treat "king or queen" as 4 + 4 = 8 favourable outcomes correctly, but for "spade or ace" they write 13 + 4 = 17 instead of 13 + 4.' },
                { id: 'b', prompt: 'A student calculates the probability of drawing a "red face card" as 6/52 = 3/26.', answer: 'The first student is correct',
                  options: ['The first student is correct', 'face card', 'red face card', 'picture card'],
                  hint: 'Revisit c10_math_cbse_14_003 for probability formula and c10_math_cbse_14_005 for complement rule.',
                  misconception: 'Students treat "king or queen" as 4 + 4 = 8 favourable outcomes correctly, but for "spade or ace" they write 13 + 4 = 17 instead of 13 + 4.' },
                { id: 'c', prompt: 'A card is drawn at random from a well-shuffled deck of 52 cards.', answer: '(i) Black queens = Queen of Clubs, Queen of Spades = 2 cards',
                  options: ['(i) Black queens = Queen of Clubs, Queen of Spades = 2 cards', '(2 cards)'],
                  hint: 'Revisit c10_math_cbse_14_003 for probability formula and c10_math_cbse_14_005 for complement rule.',
                  misconception: 'Students treat "king or queen" as 4 + 4 = 8 favourable outcomes correctly, but for "spade or ace" they write 13 + 4 = 17 instead of 13 + 4.' },
                { id: 'd', prompt: 'Compare the probabilities: P(drawing a king) vs P(drawing a red card) vs P(drawing a king OR a red card). Which is largest? Which is smallest?', answer: 'P(king) = 4/52 = 1/13 ≈ 0.077',
                  options: ['P(king) = 4/52 = 1/13 ≈ 0.077', 'face card', 'picture card'],
                  hint: 'Revisit c10_math_cbse_14_003 for probability formula and c10_math_cbse_14_005 for complement rule.',
                  misconception: 'Students treat "king or queen" as 4 + 4 = 8 favourable outcomes correctly, but for "spade or ace" they write 13 + 4 = 17 instead of 13 + 4.' }
          ],
            remediations: { 'students-treat-king-or-queen': { steps: ['Draw a 2×2 table: rows = suits (♠, ♥, ♦, ♣), columns = ranks (A, 2-10, J, Q, K).', 'For "spade or ace", shade all spades (13 cells) and all aces (4 cells).', 'Count shaded cells — Ace of Spades shaded twice, so total unique = 13 + 4 - 1 = 16.', 'Practice 5 problems: "club or king", "diamond or queen", "heart or jack", "spade or 10", "red card or ace".'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_010', difficulty: 'standard',
          question: 'Coin tossing probability problems involve calculating the likelihood.',
          hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space) and c9_math_ch7_10 (Tree Diagrams).',
          misconception: 'The most pervasive error: treating HT and TH as a single outcome "one head one tail", reducing the sample space to 3.',
          parts: [
                { id: 'a', prompt: 'What is the sample space when two fair coins are tossed simultaneously? List all outcomes.', answer: 'The sample space is {HH, HT, TH, TT} with 4 equally likely outcomes',
                  options: ['The sample space is {HH, HT, TH, TT} with 4 equally likely outcomes', 'at most one tail', 'exactly one tail'],
                  hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space) and c9_math_ch7_10 (Tree Diagrams).',
                  misconception: 'The most pervasive error: treating HT and TH as a single outcome "one head one tail", reducing the sample space to 3 outcomes {HH, HT, TT}.' },
                { id: 'b', prompt: 'Explain why the probability of getting "at least one head" when two coins are tossed is 3/4, not 2/3.', answer: '"At least one head" means {HH, HT, TH}',
                  options: ['"At least one head" means {HH, HT, TH}', 'at most one tail', 'exactly one tail'],
                  hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space) and c9_math_ch7_10 (Tree Diagrams).',
                  misconception: 'The most pervasive error: treating HT and TH as a single outcome "one head one tail", reducing the sample space to 3 outcomes {HH, HT, TT}.' },
                { id: 'c', prompt: 'Two fair coins are tossed. Find the probability of getting: (i) exactly one head, (ii) at most one tail, (iii) no head.', answer: 'Sample space S = {HH, HT, TH, TT}, n(S) = 4',
                  options: ['Sample space S = {HH, HT, TH, TT}, n(S) = 4', 'at most one tail', 'exactly one tail'],
                  hint: 'If stuck, revisit c10_math_cbse_14_002 (Sample Space) and c9_math_ch7_10 (Tree Diagrams).',
                  misconception: 'The most pervasive error: treating HT and TH as a single outcome "one head one tail", reducing the sample space to 3 outcomes {HH, HT, TT}.' }
          ],
            remediations: { 'the-most-pervasive-error-treating': { steps: ['Physically demonstrate with two different coins (₹1 and ₹2). Toss them 20 times, record each outcome as ordered pair.', 'Draw a tree diagram: first coin branches to H/T, second coin branches to H/T from each. Count 4 end branches.', 'For any event, make a table: Event → Favourable outcomes (list explicitly) → Count → Probability.', 'Practice converting phrases: "at least one head" = {HH, HT, TH}; "at most one tail" = {HH, HT, TH}; "exactly one head".'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_14_011', difficulty: 'standard',
          question: 'Probability in real-life situations applies the classical definition P(E) = m/n.',
          hint: 'Review the classical definition (c10_math_cbse_14_001) and complement rule.',
          misconception: 'Students often confuse the favourable count with the total, especially in multi-category problems.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Probability in real-life situations applies the classical definition P(E) = m/n to',
                  options: ['Probability in real-life situations applies the classical definition P(E) = m/n to', 'The classical definition of probability states that if an experiment has n equally likely', 'The sample space of a random experiment is the set of all possible outcomes of that', 'The probability of an event E, denoted P(E), is defined as the ratio of the number of'],
                  hint: 'Review the classical definition (c10_math_cbse_14_001) and complement rule (c10_math_cbse_14_007).',
                  misconception: 'Students often confuse the favourable count with the total, especially in multi-category problems.' }
          ],
            remediations: { 'students-often-confuse-the-favourable': { steps: ['Always identify n (total) and m (favourable) before computing P = m/n.', 'For "at least one" problems, use P(at least one) = 1 − P(none).', 'For "not" problems, use P(not E) = 1 − P(E).', 'Practice translating English descriptions into counts: "defective", "non-defective", "at least one", "at most".'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
