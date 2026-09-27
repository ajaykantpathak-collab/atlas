import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch06_p1: SimDef = {
    id: 'v3_c12_app_ch06_p1',
    title: 'Probability Distributions · Part 1/2',
    subtitle: 'This node covers the foundational concept of probability distribution for discrete random.',
    classLevel: 12, subject: 'app', topic: 'Probability Distributions · Part 1/2',
    chapters: ['c12_app_ch06'],
    nodeIds: ['c12_app_cbse_06_001', 'c12_app_cbse_06_002', 'c12_app_cbse_06_003', 'c12_app_cbse_06_004', 'c12_app_cbse_06_005', 'c12_app_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: "You\'re playing a game where you draw two cards from a standard deck *with.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Compare the probability distributions of X = number of heads in 3 tosses of a fair coin, and Y = number of heads in 3 tosses of a biased coin with P(H) = 0.7.',
        options: ['Both distributions have the same support: {0, 1, 2, 3}', 'they\'re the same', 'probability distribution'],
        answer: 'Both distributions have the same support: {0, 1, 2, 3}',
        hook: 'Students often believe that "probability distribution" means just listing probabilities, ignoring that the random.',
    },
    teaching: [
        { title: 'Probability Distribution', text: 'A probability distribution of a discrete random variable X is a systematic presentation of all possible values of X (x₁, x₂, ..., xₙ) along with their corresponding probabilities (p₁, p₂, ..., pₙ).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_app_cbse_06_001', title: 'Probability Distribution',
          caseStudy: { intro: 'Start with a relatable scenario: "You\'re playing a game where you draw two cards from a standard deck *with replacement*. Let X be the number of aces drawn.',
            decisions: [{ prompt: 'Define a discrete random variable and state the two necessary conditions for a valid probability distribution of a discrete random variable.', options: [
                { text: 'A discrete random variable is a real-valued function defined on the sample space of a', outcome: 'A discrete random variable is a real-valued function defined on the sample space of a random.' },
                { text: 'probabilities sum to 100%', outcome: 'Not quite — Students often believe that "probability distribution" means just listing probabilities, ignoring.', reveals: 'probability-distribution-means-just-listing' },
                { text: 'probability distribution', outcome: 'Not quite — Students often believe that "probability distribution" means just listing probabilities, ignoring.', reveals: 'probability-distribution-means-just-listing' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_06_003', title: 'BEFORE YOU START, YOU SHOULD KNOW',
          scaffold: { problem: 'In a lucky draw, a box contains 5 green and 3 red tickets. One ticket is drawn at random.',
            steps: [
            { text: 'Identify the values of X and their given probabilities.' },
            { text: 'Check if each probability is between 0 and 1.' },
            { text: 'Calculate the sum of all probabilities.' },
            { text: 'Verify if the sum equals 1.' },
            { text: 'Conclude validity based on both conditions.', faded: true, blankAnswer: 'Each probability (0.6, 0.3) is between 0 and 1. Sum = 0.6.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_06_004', title: 'Applied Mathematics',
          scaffold: { problem: 'The daily milk delivery (in liters) to a housing society follows a normal distribution with mean 500 L and standard deviation 40 L.',
            steps: [
            { text: 'Identify distribution and parameters: X ~ N(500, 40²). "Exceeds storage" means X > 560.' },
            { text: 'Standardize for current capacity: Z = (560 - 500) / 40 = 60/40 = 1.5.' },
            { text: 'Use Z-table for P(Z > 1.5). Table gives P(Z < 1.5) = 0.9332. So P(Z > 1.5) = 1 - 0.9332 = 0.0668 ≈ 6.68%.' },
            { text: 'For the inverse problem (find capacity C such that P(X > C) < 0.05), we need P(X ≤ C) > 0.95.' },
            { text: 'Convert back to X: C = μ + z·σ = 500 + 1.645 × 40 = 500 + 65.8 = 565.8 ≈ 566 L.', faded: true, blankAnswer: 'Current overflow probability = 6.68%. Minimum storage.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_06_006', title: 'INTRODUCTION',
          caseStudy: { intro: 'Start with a relatable scenario: "You\'re packing for a trip and randomly pick 2 shirts from a drawer containing 3 striped and 2 plain shirts.',
            decisions: [{ prompt: 'In a random experiment, a coin is tossed twice. The sample space is S = {HH, HT, TH, TT}.', options: [
                { text: 'No, Y is not a valid random variable', outcome: 'No, Y is not a valid random variable. A random variable must assign a **real number** to each.' },
                { text: 'Outcome = Value', outcome: 'Not quite — **The "Outcome = Value" Confusion:** Students consistently treat the outcome itself (e.g., "HTH".', reveals: 'the-outcome-value-confusion-students' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Probability Distributions like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Probability Distributions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Probability Distributions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_06_001', difficulty: 'standard',
          question: 'A probability distribution of a discrete random variable X is a systematic.',
          hint: 'If stuck on computing probabilities, review **c11_app_cbse_09_003** (Event and its.',
          misconception: 'Students often believe that "probability distribution" means just listing probabilities, ignoring that the random.',
          parts: [
                { id: 'a', prompt: 'A student writes the following as a probability distribution for a random variable X: X: 1, 2, 3; P(X): 0.3, 0.5, 0.3.', answer: 'The distribution is invalid',
                  options: ['The distribution is invalid', 'probability distribution'],
                  hint: 'If stuck on computing probabilities, review **c11_app_cbse_09_003** (Event and its probability) and.',
                  misconception: 'Students often believe that "probability distribution" means just listing probabilities, ignoring that the random variable\'s *values* must.' },
                { id: 'b', prompt: 'A bag contains 4 red and 6 blue balls. Two balls are drawn at random *without replacement*. Let X be the number of red balls drawn.', answer: 'Sample space: 10 balls, draw 2 without replacement → total outcomes = ¹⁰C₂ = 45',
                  options: ['Sample space: 10 balls, draw 2 without replacement → total outcomes = ¹⁰C₂ = 45', 'probability distribution'],
                  hint: 'If stuck on computing probabilities, review **c11_app_cbse_09_003** (Event and its probability) and.',
                  misconception: 'Students often believe that "probability distribution" means just listing probabilities, ignoring that the random variable\'s *values* must.' },
                { id: 'c', prompt: 'Compare the probability distributions of X = number of heads in 3 tosses of a fair coin, and Y = number of heads in 3 tosses of a biased coin with P(H) = 0.7.', answer: 'Both distributions have the same support: {0, 1, 2, 3}',
                  options: ['Both distributions have the same support: {0, 1, 2, 3}', 'they\'re the same', 'probability distribution'],
                  hint: 'If stuck on computing probabilities, review **c11_app_cbse_09_003** (Event and its probability) and.',
                  misconception: 'Students often believe that "probability distribution" means just listing probabilities, ignoring that the random variable\'s *values* must.' }
          ],
            remediations: { 'probability-distribution-means-just-listing': { steps: ['If a student cannot construct a distribution table: (1) Have them revisit **c11_app_cbse_09_003** (Event and its.', 'The re-diagnostic: Give them a bag with 3 red, 5 green balls; draw 2 without replacement; ask for distribution of.', 'They must get the table exactly right with ΣP=1 verified.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "probability distribution" means just listing probabilities, ignoring that the random.',
          parts: [
                { id: 'a', prompt: 'A teacher gives a multiple-choice test with 5 questions, each having 4 options (only 1 correct). A student guesses randomly.', answer: 'The claim is false',
                  options: ['The claim is false', 'probability distribution'],
                  hint: 'If stuck on computing probabilities, review **c11_app_cbse_09_003** (Event and its probability) and.',
                  misconception: 'Students often believe that "probability distribution" means just listing probabilities, ignoring that the random variable\'s *values* must.' },
                { id: 'b', prompt: 'Create a real-world scenario (Indian context) involving a discrete random variable with exactly 4 possible values.', answer: 'Scenario: A Delhi Metro train has 4 doors',
                  options: ['Scenario: A Delhi Metro train has 4 doors', 'probability distribution'],
                  hint: 'If stuck on computing probabilities, review **c11_app_cbse_09_003** (Event and its probability) and.',
                  misconception: 'Students often believe that "probability distribution" means just listing probabilities, ignoring that the random variable\'s *values* must.' }
          ],
            remediations: { 'probability-distribution-means-just-listing': { steps: ['If a student cannot construct a distribution table: (1) Have them revisit **c11_app_cbse_09_003** (Event and its.', 'The re-diagnostic: Give them a bag with 3 red, 5 green balls; draw 2 without replacement; ask for distribution of.', 'They must get the table exactly right with ΣP=1 verified.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_06_002', difficulty: 'standard',
          question: 'Learning Outcomes are the officially prescribed competency statements that.',
          hint: 'If stuck on "random variable as a function," revisit c11_app_cbse_09_002 (sample space).',
          misconception: '**Misconception:** "Learning Outcomes are just a summary at the start of the chapter — I\'ll read them once and move.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Learning Outcomes are the officially prescribed competency statements that define exactly',
                  options: ['Learning Outcomes are the officially prescribed competency statements that define exactly', 'A probability distribution of a discrete random variable X is a systematic presentation', 'A probability distribution is a mathematical function that describes the likelihood of', 'A continuous random variable X follows a Normal Distribution with parameters mean (μ) and'],
                  hint: 'If stuck on "random variable as a function," revisit c11_app_cbse_09_002 (sample space) and.',
                  misconception: '**Misconception:** "Learning Outcomes are just a summary at the start of the chapter — I\'ll read them once and move to the \'real content.\'".' }
          ],
            remediations: { 'misconception-learning-outcomes-are-just': { steps: ['If a student cannot map a practice problem to its Learning Outcome within 10 seconds: 1.', '**Print the 10 outcomes** on an A5 card (use the student-friendly versions from Diagnostic Answer 6).', '**Take 5 past-year questions** (CBSE + CUET) and physically write the outcome number next to each sub-question.', '**Identify the "ghost outcomes"** — outcomes with zero practice questions mapped.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_06_003', difficulty: 'standard',
          question: 'A probability distribution is a mathematical function that describes the.',
          hint: 'If stuck, review the definition of sample space and how to construct it for multi-step.',
          misconception: 'Students often believe that if two events are independent, they cannot be mutually exclusive, or vice versa, and think.',
          parts: [
                { id: 'a', prompt: 'What is the sample space when two coins are tossed simultaneously?', answer: 'The sample space is {HH, HT, TH, TT}',
                  options: ['The sample space is {HH, HT, TH, TT}', 'mutual exclusivity implies independence'],
                  hint: 'If stuck, review the definition of sample space and how to construct it for multi-step experiments.',
                  misconception: 'Students often believe that if two events are independent, they cannot be mutually exclusive, or vice versa, and think that mutual.' },
                { id: 'b', prompt: 'Explain why getting a head and getting a tail in a single coin toss are mutually exclusive events.', answer: 'They are mutually exclusive',
                  options: ['They are mutually exclusive', 'mutual exclusivity implies independence'],
                  hint: 'If stuck, review the definition of sample space and how to construct it for multi-step experiments.',
                  misconception: 'Students often believe that if two events are independent, they cannot be mutually exclusive, or vice versa, and think that mutual.' },
                { id: 'c', prompt: 'In a box, there are 3 red and 2 blue balls. Two balls are drawn one after the other without replacement.', answer: 'Probability first ball is red: 3/5',
                  options: ['Probability first ball is red: 3/5', 'mutual exclusivity implies independence'],
                  hint: 'If stuck, review the definition of sample space and how to construct it for multi-step experiments.',
                  misconception: 'Students often believe that if two events are independent, they cannot be mutually exclusive, or vice versa, and think that mutual.' },
                { id: 'd', prompt: 'A student says: "If two events A and B are independent, then P(A and B) = P(A) + P(B)." Is this correct? Explain.', answer: 'No, this is incorrect',
                  options: ['No, this is incorrect', 'mutual exclusivity implies independence'],
                  hint: 'If stuck, review the definition of sample space and how to construct it for multi-step experiments.',
                  misconception: 'Students often believe that if two events are independent, they cannot be mutually exclusive, or vice versa, and think that mutual.' }
          ],
            remediations: { 'if-two-events-are-independent': { steps: ['To address this, first ask: "Can both events happen at the same time?" If yes, they are not mutually exclusive.', 'Then ask: "Does knowing one event occurred change the probability of the other?" If not, they are independent.', 'Use a die roll: let A = even number ({2,4,6}), B = >4 ({5,6}).', 'A and B both contain 6 → not mutually exclusive.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_06_004', difficulty: 'standard',
          question: 'A continuous random variable X follows a Normal Distribution with parameters.',
          hint: 'If stuck on "area vs height" confusion, review the PDF definition in NCERT Section 4.7.',
          misconception: '**Misconception:** "P(Z < z) from the table is the probability of *exactly* that Z-score." **Reality:** For continuous.',
          parts: [
                { id: 'a', prompt: 'The life of a ceiling fan (in days) is normally distributed with mean 300 and SD 50.', answer: 'X ~ N(300, 50²)',
                  options: ['X ~ N(300, 50²)', 'area from 0 to Z', 'cumulative from -∞'],
                  hint: 'If stuck on "area vs height" confusion, review the PDF definition in NCERT Section 4.7: "f(x) ≥ 0.',
                  misconception: '**Misconception:** "P(Z < z) from the table is the probability of *exactly* that Z-score." **Reality:** For continuous distributions, P(Z.' }
          ],
            remediations: { 'misconception-p-z-z-from': { steps: ['Revisit **c12_app_cbse_06_007** (Discrete vs Continuous Random Variables) — specifically the "wristwatch with seconds".', 'Re-read the PDF definition in this node: "f(x) ≥ 0, ∫f(x)dx = 1" — probability is *area under curve*, not f(x) value.', 'Do a targeted drill: For X ~ N(0,1), write "P(Z = 0) = 0" and "P(Z < 0) = 0.5" side-by-side 5 times.', 'Re-attempt Diagnostic Q3 and Q4 focusing *only* on the standardization step and table lookup direction (left-tail.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_06_005', difficulty: 'standard',
          question: 'A concept map is a visual organizer that represents the hierarchical structure.',
          hint: 'If stuck, revisit Class 11 Bayes\' theorem (c11_app_cbse_09_006) — it forces the "update.',
          misconception: 'Students treat the concept map as a static "summary poster" to glance at before exams, rather than a dynamic **decision.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A concept map is a visual organizer that represents the hierarchical structure of a',
                  options: ['A concept map is a visual organizer that represents the hierarchical structure of a', 'A probability distribution of a discrete random variable X is a systematic presentation', 'Learning Outcomes are the officially prescribed competency statements that define exactly', 'A probability distribution is a mathematical function that describes the likelihood of'],
                  hint: 'If stuck, revisit Class 11 Bayes\' theorem (c11_app_cbse_09_006) — it forces the "update probability.',
                  misconception: 'Students treat the concept map as a static "summary poster" to glance at before exams, rather than a dynamic **decision algorithm**.' }
          ],
            remediations: { 'students-treat-the-concept-map': { steps: ['Redraw the concept map on a blank A4 sheet *without looking* — only nodes, no arrows.', 'For each pair of adjacent nodes, write the **condition label** on the connecting arrow (e.g., "constant p".', 'Take the textbook\'s Example 4 (without replacement) and Example 9 (with replacement).', 'Create a 3x3 table: Rows = {Binomial, Poisson, Normal}, Columns = {Random Var Type, Key Condition, Variance Formula}.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_06_006', difficulty: 'standard',
          question: 'A random variable is a real-valued function whose domain is the sample space.',
          hint: 'If stuck, review "Functions" (c11_app_cbse_08_002) focusing on "many-to-one" mappings and.',
          misconception: '**The "Outcome = Value" Confusion:** Students consistently treat the outcome itself (e.g., "HTH" in coin tosses) as the.',
          parts: [
                { id: 'a', prompt: 'In a random experiment, a coin is tossed twice. The sample space is S = {HH, HT, TH, TT}. A student defines a random variable Y as "the outcome of the tosses".', answer: 'No, Y is not a valid random variable',
                  options: ['No, Y is not a valid random variable', 'Outcome = Value'],
                  hint: 'If stuck, review "Functions" (c11_app_cbse_08_002) focusing on "many-to-one" mappings and.',
                  misconception: '**The "Outcome = Value" Confusion:** Students consistently treat the outcome itself (e.g., "HTH" in coin tosses) as the value of the random.' },
                { id: 'b', prompt: 'Two random variables X and Y are defined on the same sample space S = {1, 2, 3, 4, 5, 6} (rolling a fair die).', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'Outcome = Value'],
                  hint: 'If stuck, review "Functions" (c11_app_cbse_08_002) focusing on "many-to-one" mappings and.',
                  misconception: '**The "Outcome = Value" Confusion:** Students consistently treat the outcome itself (e.g., "HTH" in coin tosses) as the value of the random.' },
                { id: 'c', prompt: 'Consider the experiment: "Roll a die until a 6 appears." The sample space is infinite: S = {6, (1,6), (2,6), ..., (1,1,6), ...}.', answer: 'X is a **discrete random variable**',
                  options: ['X is a **discrete random variable**', 'infinite possible values', 'uncountable/measured values', 'Outcome = Value'],
                  hint: 'If stuck, review "Functions" (c11_app_cbse_08_002) focusing on "many-to-one" mappings and.',
                  misconception: '**The "Outcome = Value" Confusion:** Students consistently treat the outcome itself (e.g., "HTH" in coin tosses) as the value of the random.' }
          ],
            remediations: { 'the-outcome-value-confusion-students': { steps: ['**Revisit Function Concept (Class 11):** Review c11_app_cbse_04_004 (Relations) and c11_app_cbse_08_002 (Functions).', '**Concrete Drill:** Take a tiny sample space S = {a, b, c}.', 'Define 3 random variables: X₁(a)=1, X₁(b)=1, X₁(c)=2; X₂(a)=0, X₂(b)=5, X₂(c)=-3; X₃(a)=10, X₃(b)=10, X₃(c)=10.', 'Verify each is a function (many-to-one allowed, constant allowed).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
