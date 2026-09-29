import type { SimDef } from '../../engine/types';
import C12_MathematicsTheoremTotalProbabilitySim from '../../../simulations/c6_12/C12_MathematicsTheoremTotalProbabilitySim';

/** v3 wrapped master — C12_MathematicsTheoremTotalProbabilitySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicstheoremtotalprobabilitysim: SimDef = {
    id: 'v3w_c12_mathematicstheoremtotalprobabilitysim',
    title: 'Conditional Probability: Definition and Formula',
    subtitle: 'This node covers the definition, formula, and direct computation of conditional.',
    classLevel: 12, subject: 'mathematics', topic: 'Conditional Probability: Definition and Formula',
    chapters: [],
    nodeIds: ['c12_math_cbse_13_001', 'c12_math_cbse_13_002', 'c12_math_cbse_13_003', 'c12_math_cbse_13_004', 'c12_math_cbse_13_005', 'c12_math_cbse_13_006', 'c12_math_cbse_13_007', 'c12_math_cbse_13_008', 'c12_math_cbse_13_009', 'c12_math_cbse_13_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a Class 12 student in Delhi preparing for board exams.', goal: 'Master Conditional Probability: Definition and Formula.' },
    discovery: {
        question: 'A bag contains 5 red and 7 blue balls. Two balls are drawn one after another without replacement.',
        options: ['The probability changes', 'it\'s still 5/12 because symmetry', 'it\'s 4/11 or 5/11 depending on first draw'],
        answer: 'The probability changes',
        hook: 'The most pervasive error is writing P(E ∩ F) = P(E) × P(F) for sequential draws without replacement — i.e., using the.',
    },
    teaching: [
        { title: 'Conditional probability of an event E given.', text: 'Conditional probability of an event E given that event F has already occurred, denoted P(E|F), is the probability of E under the condition that the sample space is restricted to outcomes in F.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_001', title: 'Conditional probability of an event E.',
          scaffold: { problem: 'In a Class 12 section of 60 students, 35 study Mathematics, 25 study Physics, and 15 study both. A student is selected at random.',
            steps: [
            { text: 'Identify the events. Let M = "studies Mathematics", P = "studies Physics". We need P(M|P).' },
            { text: 'Write down the given data. Total students = 60. n(M) = 35, n(P) = 25, n(M ∩ P) = 15.' },
            { text: 'Compute the required probabilities. P(P) = n(P)/60 = 25/60 = 5/12. P(M ∩ P) = n(M ∩ P)/60 = 15/60 = 1/4.' },
            { text: 'Apply the conditional probability formula. P(M|P) = P(M ∩ P) / P(P) = (1/4) / (5/12) = (1/4) × (12/5) = 3/5.' },
            { text: 'Interpret the result. Given the student studies Physics (25 students), 15 of them also study Mathematics, so the.', faded: true, blankAnswer: '3/5 or 0.6' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_002', title: 'The properties of conditional.',
          scaffold: { problem: 'In a factory producing LED bulbs, 2% of bulbs have a filament defect (F), 3% have a coating defect (C), and 1% have both defects.',
            steps: [
            { text: 'Identify events and given probabilities. Let F = filament defect, C = coating defect.' },
            { text: 'Define the conditioning event. The bulb has at least one defect → event D = F ∪ C. We need P(F | D).' },
            { text: 'Use the definition of conditional probability: P(F | D) = P(F ∩ D) / P(D).' },
            { text: 'Compute P(D) = P(F ∪ C) = P(F) + P(C) − P(F ∩ C) = 0.02 + 0.03 − 0.01 = 0.04.' },
            { text: 'Divide: P(F | D) = 0.02 / 0.04 = 0.5.', faded: true, blankAnswer: '0.5 (or 1/2)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_003', title: 'The Multiplication Theorem on.',
          scaffold: { problem: 'A bag contains 6 red balls and 4 blue balls. Three balls are drawn one by one without replacement.',
            steps: [
            { text: 'Identify the events in sequence: R₁ = first ball red, B₂ = second ball blue, R₃ = third ball red.' },
            { text: 'Write the multiplication rule for three events: P(R₁ ∩ B₂ ∩ R₃) = P(R₁) × P(B₂|R₁) × P(R₃|R₁ ∩ B₂).' },
            { text: 'Compute P(R₁): Initially 6 red + 4 blue = 10 balls. P(R₁) = 6/10 = 3/5.' },
            { text: 'Compute P(B₂|R₁): After drawing one red, bag has 5 red + 4 blue = 9 balls. P(B₂|R₁) = 4/9.' },
            { text: 'Compute P(R₃|R₁ ∩ B₂): After drawing red then blue, bag has 5 red + 3 blue = 8 balls. P(R₃|R₁ ∩ B₂) = 5/8.' },
            { text: 'Multiply: (3/5) × (4/9) × (5/8) = (3×4×5)/(5×9×8) = 60/360 = 1/6.' },
            { text: 'Verify: 1/6 ≈ 0.1667. Alternative check using combinations: Total ways to choose 3 balls in order = 10×9×8 = 720.', faded: true, blankAnswer: '1/6' }
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_006', title: 'If {E₁, E₂, ..., Eₙ} is a partition of.',
          scaffold: { problem: 'A company has two plants manufacturing scooters. Plant I manufactures 70% of the scooters and Plant II manufactures 30%.',
            steps: [
            { text: 'Identify the partition. Let E₁ = scooter from Plant I, E₂ = scooter from Plant II.' },
            { text: 'Define event A = scooter is of standard quality. Given conditional probabilities: P(A|E₁) = 0.8, P(A|E₂) = 0.9.' },
            { text: 'Verify conditions: P(E₁) > 0, P(E₂) > 0, E₁ ∩ E₂ = ∅, E₁ ∪ E₂ = S. All satisfied.' },
            { text: 'Apply total probability formula: P(A) = P(E₁)P(A|E₁) + P(E₂)P(A|E₂).' },
            { text: 'Substitute and compute: P(A) = (0.7 × 0.8) + (0.3 × 0.9) = 0.56 + 0.27 = 0.83.', faded: true, blankAnswer: '0.83 or 83%' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'Conditional Probability: Definition and Formula', spots: [
            { id: 's1', label: 'Conditional probability of an event', prompt: 'Which idea is this? — Conditional probability of an event E given that event F has already occurred, denoted.', answer: 'Conditional probability of an event', options: ['Conditional probability of an event', 'The properties of conditional probability', 'The Multiplication Theorem on Probability', 'Two events E and F'] },
            { id: 's2', label: 'The properties of conditional probability', prompt: 'Which idea is this? — The properties of conditional probability are rules that allow us to manipulate.', answer: 'The properties of conditional probability', options: ['The properties of conditional probability', 'Conditional probability of an event', 'The Multiplication Theorem on Probability', 'Two events E and F'] },
            { id: 's3', label: 'The Multiplication Theorem on Probability', prompt: 'Which idea is this? — The Multiplication Theorem on Probability states that for any two events E and F.', answer: 'The Multiplication Theorem on Probability', options: ['The Multiplication Theorem on Probability', 'Conditional probability of an event', 'The properties of conditional probability', 'Two events E and F'] },
            { id: 's4', label: 'Two events E and F', prompt: 'Which idea is this? — Two events E and F associated with the same random experiment are said to be.', answer: 'Two events E and F', options: ['Two events E and F', 'Conditional probability of an event', 'The properties of conditional probability', 'The Multiplication Theorem on Probability'] },
            { id: 's5', label: 'Bayes Theorem provides a way', prompt: 'Which idea is this? — Bayes\' Theorem provides a way to update the probability of a hypothesis (cause) given.', answer: 'Bayes Theorem provides a way', options: ['Bayes Theorem provides a way', 'Conditional probability of an event', 'The properties of conditional probability', 'The Multiplication Theorem on Probability'] },
            { id: 's6', label: 'If E E E', prompt: 'Which idea is this? — If {E₁, E₂, ..., Eₙ} is a partition of the sample space S (i.e., the events are pairwise.', answer: 'If E E E', options: ['If E E E', 'Conditional probability of an event', 'The properties of conditional probability', 'The Multiplication Theorem on Probability'] }
          ] } }
    ],
    explore: { component: C12_MathematicsTheoremTotalProbabilitySim, prompt: 'Explore the interactive — Conditional Probability: Definition and Formula' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_13_001', difficulty: 'standard',
          question: 'Conditional probability of an event E given that event F has already occurred,.',
          hint: 'If stuck, revisit Class 11 Sets (c11_math_cbse_01_010) for intersection and Class 10.',
          misconception: 'Students often write P(E|F) = P(E) × P(F) / P(F) = P(E), incorrectly assuming P(E ∩ F) = P(E)P(F) for *any* events E.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Conditional probability of an event E given that event F has already occurred, denoted',
                  options: ['Conditional probability of an event E given that event F has already occurred, denoted', 'The properties of conditional probability are rules that allow us to manipulate', 'The Multiplication Theorem on Probability states that for any two events E and F', 'Two events E and F associated with the same random experiment are said to be'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write P(E|F) = P(E) × P(F) / P(F) = P(E), incorrectly assuming P(E ∩ F) = P(E)P(F) for *any* events E and F.' }
          ],
            remediations: { 'students-often-write-p-e': { steps: ['If a student makes this error, immediately ask: "Under what condition does P(E ∩ F) = P(E)P(F) hold?" Guide them to.', 'If not, have them compute P(E∩F) directly from given data (e.g., using a Venn diagram or counting outcomes) and then.', 'Assign a remedial exercise: "For events with P(A)=0.5, P(B)=0.4, P(A∩B)=0.15, compute P(A|B) and P(B|A).', 'Justify." This forces confrontation with the difference between general and independent cases.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_002', difficulty: 'standard',
          question: 'The properties of conditional probability are rules that allow us to manipulate.',
          hint: 'Revisit c12_math_cbse_13_001 to practice computing conditional probabilities from raw.',
          misconception: 'Students often treat conditional probability as a separate "new" probability measure and forget that it obeys the same.',
          parts: [
                { id: 'a', prompt: 'Explain why Property 2 requires the condition P(F) ≠ 0, and give a concrete example where ignoring this condition would lead to a division-by-zero error.', answer: 'Property 2 is derived from P((A ∪ B)|F) = P((A ∪ B) ∩ F)/P(F)',
                  options: ['Property 2 is derived from P((A ∪ B)|F) = P((A ∪ B) ∩ F)/P(F)', 'P(F) ≠ 0 is only for the definition, not for the properties'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat conditional probability as a separate "new" probability measure and forget that it obeys the same axioms as ordinary.' }
          ],
            remediations: { 'students-often-treat-conditional-probability': { steps: ['If a student makes the disjoint-error, take them back to the Venn diagram: draw F as a rectangle, then A and B as.', 'Shade A ∪ B and show that the intersection A ∩ B is counted twice if we just add areas.', 'Then write P((A ∪ B) ∩ F) = P((A ∩ F) ∪ (B ∩ F)) = P(A ∩ F) + P(B ∩ F) − P(A ∩ B ∩ F).', 'Divide by P(F) to get Property 2.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat conditional probability as a separate "new" probability measure and forget that it obeys the same.',
          parts: [
                { id: 'a', prompt: 'A student writes: "P((A ∪ B)|F) = P(A|F) + P(B|F) always, because conditioning on F makes A and B disjoint." Identify the error and give a counterexample with.', answer: 'The error: Conditioning on F does not make arbitrary events A and B disjoint',
                  options: ['The error: Conditioning on F does not make arbitrary events A and B disjoint', 'it\'s not always true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat conditional probability as a separate "new" probability measure and forget that it obeys the same axioms as ordinary.' }
          ],
            remediations: { 'students-often-treat-conditional-probability': { steps: ['If a student makes the disjoint-error, take them back to the Venn diagram: draw F as a rectangle, then A and B as.', 'Shade A ∪ B and show that the intersection A ∩ B is counted twice if we just add areas.', 'Then write P((A ∪ B) ∩ F) = P((A ∩ F) ∪ (B ∩ F)) = P(A ∩ F) + P(B ∩ F) − P(A ∩ B ∩ F).', 'Divide by P(F) to get Property 2.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_003', difficulty: 'standard',
          question: 'The Multiplication Theorem on Probability states that for any two events E and.',
          hint: 'Revisit c12_math_cbse_13_001 (Conditional Probability) and practice identifying the.',
          misconception: 'The most pervasive error is writing P(E ∩ F) = P(E) × P(F) for sequential draws without replacement — i.e., using the.',
          parts: [
                { id: 'a', prompt: 'A bag contains 5 red and 7 blue balls. Two balls are drawn one after another without replacement.', answer: 'The probability changes',
                  options: ['The probability changes', 'it\'s still 5/12 because symmetry', 'it\'s 4/11 or 5/11 depending on first draw'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most pervasive error is writing P(E ∩ F) = P(E) × P(F) for sequential draws without replacement — i.e., using the original probability.' },
                { id: 'b', prompt: 'Compare the probability of drawing two aces from a 52-card deck (a) with replacement and (b) without replacement. Which is larger?', answer: 'With replacement: (4/52) × (4/52) = 1/169 ≈ 0.00592',
                  options: ['With replacement: (4/52) × (4/52) = 1/169 ≈ 0.00592', 'without replacement is larger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most pervasive error is writing P(E ∩ F) = P(E) × P(F) for sequential draws without replacement — i.e., using the original probability.' }
          ],
            remediations: { 'the-most-pervasive-error-is': { steps: ['If a student makes the above error: Step 1 — Make them physically simulate with counters: "Put 10 black and 5 white.', 'Write the fraction." Step 2 — Have them complete this table for a 3-draw problem: Draw 1: P(B) = ___/___; Draw 2 given.', 'Step 3 — Ask: "Why is the second denominator 14 not 15?', 'Why is the second numerator 9 not 10?" Step 4 — Give a fresh problem: "Bag: 6 red, 4 blue.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'The most pervasive error is writing P(E ∩ F) = P(E) × P(F) for sequential draws without replacement — i.e., using the.',
          parts: [
                { id: 'a', prompt: 'Compare the probability of drawing two aces from a 52-card deck (a) with replacement and (b) without replacement. Which is larger?', answer: 'With replacement: (4/52) × (4/52) = 1/169 ≈ 0.00592',
                  options: ['With replacement: (4/52) × (4/52) = 1/169 ≈ 0.00592', 'without replacement is larger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most pervasive error is writing P(E ∩ F) = P(E) × P(F) for sequential draws without replacement — i.e., using the original probability.' }
          ],
            remediations: { 'the-most-pervasive-error-is': { steps: ['If a student makes the above error: Step 1 — Make them physically simulate with counters: "Put 10 black and 5 white.', 'Write the fraction." Step 2 — Have them complete this table for a 3-draw problem: Draw 1: P(B) = ___/___; Draw 2 given.', 'Step 3 — Ask: "Why is the second denominator 14 not 15?', 'Why is the second numerator 9 not 10?" Step 4 — Give a fresh problem: "Bag: 6 red, 4 blue.'] } } },
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
        { type: 'subpart', nodeId: 'c12_math_cbse_13_006', difficulty: 'standard',
          question: 'If {E₁, E₂, ..., Eₙ} is a partition of the sample space S (i.e., the events are.',
          hint: 'If stuck, revisit conditional probability definition (c12_math_cbse_13_001) and.',
          misconception: 'Students often treat the Total Probability Theorem as a simple weighted average and forget to verify that the events.',
          parts: [
                { id: 'a', prompt: 'A bag contains 4 red and 6 black balls. A second bag contains 3 red and 7 black balls.', answer: 'Let E₁ = choose bag 1, E₂ = choose bag 2',
                  options: ['Let E₁ = choose bag 1, E₂ = choose bag 2', 'rainy day', 'cloudy day'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the Total Probability Theorem as a simple weighted average and forget to verify that the events form a valid.' },
                { id: 'b', prompt: 'A student argues: "The events E₁ = {1,2}, E₂ = {2,3}, E₃ = {3,4} form a partition of S = {1,2,3,4} because their union is S." Is the student correct?', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'rainy day', 'cloudy day'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the Total Probability Theorem as a simple weighted average and forget to verify that the events form a valid.' }
          ],
            remediations: { 'students-often-treat-the-total': { steps: ['Name partitions.', 'Check disjoint and exhaustive.', 'Write priors.', 'Write conditionals.', 'Multiply and add." Finally, re-ask Diagnostic Question 4 to confirm they now catch the disjointness error.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the Total Probability Theorem as a simple weighted average and forget to verify that the events.',
          parts: [
                { id: 'a', prompt: 'A problem gives: P(E₁) = 0.3, P(E₂) = 0.7, P(A|E₁) = 0.4, P(A|E₂) = 0.2. A student computes P(A) = 0.3×0.4 + 0.7×0.2 = 0.12 + 0.14 = 0.26.', answer: 'The computation of P(A) = 0.26 is correct',
                  options: ['The computation of P(A) = 0.26 is correct', 'rainy day', 'cloudy day', 'reverse probability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the Total Probability Theorem as a simple weighted average and forget to verify that the events form a valid.' },
                { id: 'b', prompt: 'A student argues: "The events E₁ = {1,2}, E₂ = {2,3}, E₃ = {3,4} form a partition of S = {1,2,3,4} because their union is S." Is the student correct?', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'rainy day', 'cloudy day', 'reverse probability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the Total Probability Theorem as a simple weighted average and forget to verify that the events form a valid.' }
          ],
            remediations: { 'students-often-treat-the-total': { steps: ['Name partitions.', 'Check disjoint and exhaustive.', 'Write priors.', 'Write conditionals.', 'Multiply and add." Finally, re-ask Diagnostic Question 4 to confirm they now catch the disjointness error.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
