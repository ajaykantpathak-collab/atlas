import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch13_p1: SimDef = {
    id: 'v3_c12_math_ch13_p1',
    title: 'Probability · Part 1/2',
    subtitle: 'The denominator shrank — that\'s the whole trick',
    classLevel: 12, subject: 'mathematics', topic: 'Probability · Part 1/2',
    chapters: ['c12_math_ch13'],
    nodeIds: ['c12_math_cbse_13_001', 'c12_math_cbse_13_002', 'c12_math_cbse_13_003', 'c12_math_cbse_13_004', 'c12_math_cbse_13_005', 'c12_math_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Probability updater', intro: '\'Given that...\' is the most powerful two words in probability — it redraws the entire sample space.', goal: 'Compute conditional probability by renormalising to the condition — and keep P(A|B) ≠ P(B|A) straight.' },
    discovery: {
        question: 'Of 500 students, 200 study Physics and 100 study both. Told a student takes Physics, the chance they also take Math isn\'t 100/500 — why not?',
        options: ['The condition shrank the sample space — only the 200 Physics students count now, so it\'s 100/200; P(E|F) divides by P(F), renormalising to a world where F already happened', 'Because half took both', 'Math is harder', 'Random rounding'],
        answer: 'The condition shrank the sample space — only the 200 Physics students count now, so it\'s 100/200; P(E|F) divides by P(F), renormalising to a world where F already happened',
        hook: 'P(A|B) and P(B|A) aren\'t twins — same numerator, different denominators. And \'P(E|F) = P(E)·P(F)\' is an independence formula smuggled into a conditional problem; the right answer can be numerically lucky while the reasoning is wrong.',
    },
    teaching: [
        { title: 'Conditional Probability: Definition and Formula', text: 'Conditional probability of an event E given that event F has already occurred, denoted P(E|F), is the probability of E under the condition that the sample space is restricted to outcomes in F.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_13_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Condition a probability correctly: redraw the sample space after the given event, compute the renormalised ratio, and keep the direction of conditioning straight.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_001', title: 'Conditional Probability: Definition and Formula',
          scaffold: { problem: 'In a Class 12 section of 60 students, 35 study Mathematics, 25 study Physics, and 15 study both. A student is selected at random.',
            steps: [
            { text: 'Identify the events. Let M = "studies Mathematics", P = "studies Physics". We need P(M|P).' },
            { text: 'Write down the given data. Total students = 60. n(M) = 35, n(P) = 25, n(M ∩ P) = 15.' },
            { text: 'Compute the required probabilities. P(P) = n(P)/60 = 25/60 = 5/12. P(M ∩ P) = n(M ∩ P)/60 = 15/60 = 1/4.' },
            { text: 'Apply the conditional probability formula. P(M|P) = P(M ∩ P) / P(P) = (1/4) / (5/12) = (1/4) × (12/5) = 3/5.' },
            { text: 'Interpret the result. Given the student studies Physics (25 students), 15 of them also study Mathematics, so the.', faded: true, blankAnswer: '3/5 or 0.6' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_002', title: 'Properties of Conditional Probability',
          scaffold: { problem: 'In a factory producing LED bulbs, 2% of bulbs have a filament defect (F), 3% have a coating defect (C), and 1% have both defects.',
            steps: [
            { text: 'Identify events and given probabilities. Let F = filament defect, C = coating defect.' },
            { text: 'Define the conditioning event. The bulb has at least one defect → event D = F ∪ C. We need P(F | D).' },
            { text: 'Use the definition of conditional probability: P(F | D) = P(F ∩ D) / P(D).' },
            { text: 'Compute P(D) = P(F ∪ C) = P(F) + P(C) − P(F ∩ C) = 0.02 + 0.03 − 0.01 = 0.04.' },
            { text: 'Divide: P(F | D) = 0.02 / 0.04 = 0.5.', faded: true, blankAnswer: '0.5 (or 1/2)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_003', title: 'Multiplication Theorem on Probability',
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_004', title: 'Independent Events: Definition and Properties',
          scaffold: { problem: 'A company has two factories, Factory X and Factory Y, producing light bulbs. Factory X produces 60% of total output with a 2% defect rate.',
            steps: [
            { text: 'Identify given probabilities: P(X) = 0.60, P(Y) = 0.40, P(D|X) = 0.02, P(D|Y) = 0.05.' },
            { text: 'Compute total probability of defect using law of total probability (from upcoming node c12_math_cbse_13_006): P(D).' },
            { text: 'Compute joint probability P(D ∩ X) using multiplication rule: P(D ∩ X) = P(X)P(D|X) = (0.60)(0.02) = 0.012.' },
            { text: 'Compute product of marginals: P(D) × P(X) = (0.032)(0.60) = 0.0192.' },
            { text: 'Compare: P(D ∩ X) = 0.012 ≠ 0.0192 = P(D)P(X). Therefore D and X are NOT independent.' },
            { text: 'Interpret: Knowing the bulb is from Factory X changes the probability of defect from 0.032 to 0.02 — so the events are.', faded: true, blankAnswer: 'D and X are dependent events. P(D ∩ X) = 0.012, P(D)P(X).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_005', title: 'Bayes\' Theorem: Statement and Proof',
          scaffold: { problem: 'A bag contains 4 red and 6 black balls. Another bag contains 3 red and 7 black balls.',
            steps: [
            { text: 'Define events. Let \\(E_1\\) = first bag chosen, \\(E_2\\) = second bag chosen.' },
            { text: 'Determine likelihoods. \\(P(A|E_1)=\\frac{4}{10}=0.4\\) (4 red out of 10 in bag 1).' },
            { text: 'Compute total probability of red using Theorem of Total Probability.' },
            { text: 'Apply Bayes\' Theorem for \\(E_1\\): \\(P(E_1|A)=\\frac{P(E_1)P(A|E_1)}{P(A)}=\\frac{0.2}{0.35}=\\frac{4}{7}\\).' },
            { text: 'Interpret: Given a red ball was drawn, the probability it came from the first bag is \\(\\frac{4}{7}\\approx 0.571\\).', faded: true, blankAnswer: '\\(\\frac{4}{7}\\) or approximately 0.571.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_006', title: 'Total Probability Theorem',
          scaffold: { problem: 'A company has two plants manufacturing scooters. Plant I manufactures 70% of the scooters and Plant II manufactures 30%.',
            steps: [
            { text: 'Identify the partition. Let E₁ = scooter from Plant I, E₂ = scooter from Plant II.' },
            { text: 'Define event A = scooter is of standard quality. Given conditional probabilities: P(A|E₁) = 0.8, P(A|E₂) = 0.9.' },
            { text: 'Verify conditions: P(E₁) > 0, P(E₂) > 0, E₁ ∩ E₂ = ∅, E₁ ∪ E₂ = S. All satisfied.' },
            { text: 'Apply total probability formula: P(A) = P(E₁)P(A|E₁) + P(E₂)P(A|E₂).' },
            { text: 'Substitute and compute: P(A) = (0.7 × 0.8) + (0.3 × 0.9) = 0.56 + 0.27 = 0.83.', faded: true, blankAnswer: '0.83 or 83%' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_13_006', title: 'Rapid check',
          drill: { kind: 'linear2', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_13_001', title: 'A real-world call',
          caseStudy: { intro: 'Probability powers insurance — a pool where everyone pays a little so nobody loses everything. The same math powers gambling apps — engineered to make the house win while feeling fair.',
            decisions: [{ prompt: 'Is the math responsible for how it\'s used?', options: [
                { text: 'No — probability is a tool, not an intent', outcome: 'True of the math itself; the app designer\'s intent is a different question the math doesn\'t answer.' },
                { text: 'Yes — understanding it means seeing the exploitation', outcome: 'The literacy answer — whoever can compute expected value can see the game is rigged; teaching the math is itself a defense.' },
                { text: 'Regulate the use, not the math', outcome: 'The policy answer — probability stays free; gambling apps get odds-disclosure requirements most users never read.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A QC dashboard at a snack factory flags \'packet is defective.\' A trainee asks: \'If the chance it\'s a sealing defect is 40%, is the chance it\'s NOT a sealing defect still 60% — or does being a defective packet change the maths?\'',
            decisions: [{ prompt: 'What does conditional probability say?', options: [
                { text: 'The complement rule survives conditioning — inside the defective-packet universe, P(E′|F) = 1 − P(E|F), so yes, 60% — but only because conditioning restricted the sample space to defective packets first; the unconditional numbers would be different.', outcome: 'The chapter\'s point: conditioning doesn\'t break probability\'s algebra, it relocates it — all the rules work, but they work inside F\'s shrunken universe, not the original one.' },
                { text: 'It\'s not 60% — conditioning breaks the complement rule, so you\'d need the raw numbers again.', outcome: 'Conditional probability inherits every ordinary rule within the conditioned space — P(E′|F) = 1 − P(E|F) follows straight from the definition; the rule isn\'t broken, the denominator changed.', reveals: 'conditioning-breaks-rules' },
                { text: 'It\'s 60% because the overall defect rate never changed.', outcome: 'Right answer, wrong reason — the complement holds inside F, but the \'overall rate\' is irrelevant; what changed is the sample space, and forgetting that is how conditional answers get quietly replaced by unconditional ones.', reveals: 'right-answer-wrong-space' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now update probability on new information — and see why the denominator, not the question, is what changed.',
            decisions: [{ prompt: 'What comes next? Probability · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Probability · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_13_001', difficulty: 'standard',
          question: 'Conditional probability of an event E given that event F has already occurred.',
          hint: 'If stuck, revisit Class 11 Sets (c11_math_cbse_01_010) for intersection and Class 10.',
          misconception: 'Students often write P(E|F) = P(E) × P(F) / P(F) = P(E), incorrectly assuming P(E ∩ F) = P(E)P(F) for *any* events.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Conditional probability of an event E given that event F has already occurred, denoted',
                  options: ['Conditional probability of an event E given that event F has already occurred, denoted', 'The properties of conditional probability are rules that allow us to manipulate', 'The Multiplication Theorem on Probability states that for any two events E and F', 'Two events E and F associated with the same random experiment are said to be'],
                  hint: 'If stuck, revisit Class 11 Sets (c11_math_cbse_01_010) for intersection and Class 10 Probability.',
                  misconception: 'Students often write P(E|F) = P(E) × P(F) / P(F) = P(E), incorrectly assuming P(E ∩ F) = P(E)P(F) for *any* events E and F.' }
          ],
            remediations: { 'students-often-write-p-e': { steps: ['If a student makes this error, immediately ask: "Under what condition does P(E ∩ F) = P(E)P(F) hold?" Guide them.', 'If not, have them compute P(E∩F) directly from given data (e.g., using a Venn diagram or counting outcomes) and then.', 'Assign a remedial exercise: "For events with P(A)=0.5, P(B)=0.4, P(A∩B)=0.15, compute P(A|B) and P(B|A).', 'Justify." This forces confrontation with the difference between general and independent cases.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_002', difficulty: 'standard',
          question: 'The properties of conditional probability are rules that allow us to manipulate.',
          hint: 'Revisit c12_math_cbse_13_001 to practice computing conditional probabilities from raw.',
          misconception: 'Students often treat conditional probability as a separate "new" probability measure and forget that it obeys the same.',
          parts: [
                { id: 'a', prompt: 'Explain why Property 2 requires the condition P(F) ≠ 0, and give a concrete example where ignoring this condition would lead to a division-by-zero error.', answer: 'Property 2 is derived from P((A ∪ B)|F) = P((A ∪ B) ∩ F)/P(F)',
                  options: ['Property 2 is derived from P((A ∪ B)|F) = P((A ∪ B) ∩ F)/P(F)', 'P(F) ≠ 0 is only for the definition, not for the properties'],
                  hint: 'Revisit c12_math_cbse_13_001 to practice computing conditional probabilities from raw.',
                  misconception: 'Students often treat conditional probability as a separate "new" probability measure and forget that it obeys the same axioms as ordinary.' }
          ],
            remediations: { 'students-often-treat-conditional-probability': { steps: ['If a student makes the disjoint-error, take them back to the Venn diagram: draw F as a rectangle, then A and B.', 'Shade A ∪ B and show that the intersection A ∩ B is counted twice if we just add areas.', 'Then write P((A ∪ B) ∩ F) = P((A ∩ F) ∪ (B ∩ F)) = P(A ∩ F) + P(B ∩ F) − P(A ∩ B ∩ F).', 'Divide by P(F) to get Property 2.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat conditional probability as a separate "new" probability measure and forget that it obeys the same.',
          parts: [
                { id: 'a', prompt: 'A student writes: "P((A ∪ B)|F) = P(A|F) + P(B|F) always, because conditioning on F makes A and B disjoint." Identify the error and give a counterexample with.', answer: 'The error: Conditioning on F does not make arbitrary events A and B disjoint',
                  options: ['The error: Conditioning on F does not make arbitrary events A and B disjoint', 'it\'s not always true'],
                  hint: 'Revisit c12_math_cbse_13_001 to practice computing conditional probabilities from raw.',
                  misconception: 'Students often treat conditional probability as a separate "new" probability measure and forget that it obeys the same axioms as ordinary.' }
          ],
            remediations: { 'students-often-treat-conditional-probability': { steps: ['If a student makes the disjoint-error, take them back to the Venn diagram: draw F as a rectangle, then A and B.', 'Shade A ∪ B and show that the intersection A ∩ B is counted twice if we just add areas.', 'Then write P((A ∪ B) ∩ F) = P((A ∩ F) ∪ (B ∩ F)) = P(A ∩ F) + P(B ∩ F) − P(A ∩ B ∩ F).', 'Divide by P(F) to get Property 2.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_003', difficulty: 'standard',
          question: 'The Multiplication Theorem on Probability states that for any two events E and.',
          hint: 'Revisit c12_math_cbse_13_001 (Conditional Probability) and practice identifying the.',
          misconception: 'The most pervasive error is writing P(E ∩ F) = P(E) × P(F) for sequential draws without replacement — i.e., using the.',
          parts: [
                { id: 'a', prompt: 'A bag contains 5 red and 7 blue balls. Two balls are drawn one after another without replacement.', answer: 'The probability changes',
                  options: ['The probability changes', 'it\'s still 5/12 because symmetry', 'it\'s 4/11 or 5/11 depending on first draw'],
                  hint: 'Revisit c12_math_cbse_13_001 (Conditional Probability) and practice identifying the reduced sample.',
                  misconception: 'The most pervasive error is writing P(E ∩ F) = P(E) × P(F) for sequential draws without replacement — i.e., using the original probability.' },
                { id: 'b', prompt: 'Compare the probability of drawing two aces from a 52-card deck (a) with replacement and (b) without replacement. Which is larger?', answer: 'With replacement: (4/52) × (4/52) = 1/169 ≈ 0.00592',
                  options: ['With replacement: (4/52) × (4/52) = 1/169 ≈ 0.00592', 'without replacement is larger'],
                  hint: 'Revisit c12_math_cbse_13_001 (Conditional Probability) and practice identifying the reduced sample.',
                  misconception: 'The most pervasive error is writing P(E ∩ F) = P(E) × P(F) for sequential draws without replacement — i.e., using the original probability.' }
          ],
            remediations: { 'the-most-pervasive-error-is': { steps: ['If a student makes the above error: Step 1 — Make them physically simulate with counters: "Put 10 black and 5 white.', 'Write the fraction." Step 2 — Have them complete this table for a 3-draw problem: Draw 1: P(B) = ___/___; Draw 2 given.', 'Step 3 — Ask: "Why is the second denominator 14 not 15?', 'Why is the second numerator 9 not 10?" Step 4 — Give a fresh problem: "Bag: 6 red, 4 blue.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_004', difficulty: 'standard',
          question: 'Two events E and F associated with the same random experiment are said to.',
          hint: 'If stuck, revisit c12_math_cbse_13_003 (Multiplication Theorem) and practice 5 problems.',
          misconception: '**The "Mutually Exclusive = Independent" confusion:** Students repeatedly write: "Since A and B are independent, P(A ∩.',
          parts: [
                { id: 'a', prompt: 'A student argues: "If two events are independent, they cannot happen together, so \\( P(E \\cap F) = 0 \\)." Is this correct?', answer: '**Correct answer:** The student is incorrect',
                  options: ['**Correct answer:** The student is incorrect', 'independent', 'mutually exclusive', 'Mutually Exclusive = Independent'],
                  hint: 'If stuck, revisit c12_math_cbse_13_003 (Multiplication Theorem) and practice 5 problems computing.',
                  misconception: '**The "Mutually Exclusive = Independent" confusion:** Students repeatedly write: "Since A and B are independent, P(A ∩ B) = 0" or "Since.' },
                { id: 'b', prompt: 'Two cards are drawn successively **with replacement** from a well-shuffled deck of 52 cards.', answer: '**Correct answer with steps:** Step 1',
                  options: ['**Correct answer with steps:** Step 1', 'with replacement', 'Mutually Exclusive = Independent', 'Since A and B are independent, P(A ∩ B) = 0'],
                  hint: 'If stuck, revisit c12_math_cbse_13_003 (Multiplication Theorem) and practice 5 problems computing.',
                  misconception: '**The "Mutually Exclusive = Independent" confusion:** Students repeatedly write: "Since A and B are independent, P(A ∩ B) = 0" or "Since.' }
          ],
            remediations: { 'the-mutually-exclusive-independent-confusion': { steps: ['Have them draw a Venn diagram of two mutually exclusive events with non-zero probability — two non-overlapping circles.', 'Write the theorem: **If A and B are mutually exclusive and P(A) > 0, P(B) > 0, then they are DEPENDENT.** Prove it: P(A.', 'Give the "litmus test" phrase to memorize: **"Mutually exclusive means they CAN\'T happen together.', 'Re-attempt Diagnostic Question 2. If they still err, revisit c12_math_cbse_13_001 (conditional probability definition).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_005', difficulty: 'standard',
          question: 'Bayes\' Theorem provides a way to update the probability of a hypothesis (cause).',
          hint: 'If stuck, review the definition of conditional probability (c12_math_cbse_13_001) and the.',
          misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.',
          parts: [
                { id: 'a', prompt: 'State Bayes\' Theorem for a partition \\(E_1,E_2,\\dots,E_n\\) of the sample space and an event \\(A\\) with \\(P(A)>0\\).', answer: 'Bayes\' Theorem: \\(P(E_i|A)=\\frac{P(E_i)P(A|E_i)}{\\sum_{j=1}^n P(E_j)P(A|E_j)}\\)',
                  options: ['Bayes\' Theorem: \\(P(E_i|A)=\\frac{P(E_i)P(A|E_i)}{\\sum_{j=1}^n P(E_j)P(A|E_j)}\\)', 'Bayes\' Theorem says \\(P(E_i|A)=P(A|E_i)\\)'],
                  hint: 'If stuck, review the definition of conditional probability (c12_math_cbse_13_001) and the Theorem.',
                  misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.' },
                { id: 'b', prompt: 'Explain why the denominator in Bayes\' Theorem is exactly \\(P(A)\\), the total probability of the evidence.', answer: 'By the Theorem of Total Probability',
                  options: ['By the Theorem of Total Probability', 'Bayes\' Theorem says \\(P(E_i|A)=P(A|E_i)\\)'],
                  hint: 'If stuck, review the definition of conditional probability (c12_math_cbse_13_001) and the Theorem.',
                  misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.' },
                { id: 'c', prompt: 'A factory has two machines, M1 and M2. M1 produces 60% of the output, M2 produces 40%. M1\'s defect rate is 2%, M2\'s defect rate is 5%.', answer: 'Let \\(E_1\\): item from M1, \\(E_2\\): item from M2, \\(A\\): item defective',
                  options: ['Let \\(E_1\\): item from M1, \\(E_2\\): item from M2, \\(A\\): item defective', 'swaps prior and likelihood (e', 'Bayes\' Theorem says \\(P(E_i|A)=P(A|E_i)\\)'],
                  hint: 'If stuck, review the definition of conditional probability (c12_math_cbse_13_001) and the Theorem.',
                  misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.' },
                { id: 'd', prompt: 'Suppose a student attempts to use Bayes\' Theorem with events \\(E_1,E_2\\) that are not mutually exclusive (they overlap).', answer: 'If \\(E_1\\) and \\(E_2\\) overlap, then \\(E_1\\cap E_2\\neq\\emptyset\\)',
                  options: ['If \\(E_1\\) and \\(E_2\\) overlap, then \\(E_1\\cap E_2\\neq\\emptyset\\)', 'Bayes\' Theorem says \\(P(E_i|A)=P(A|E_i)\\)'],
                  hint: 'If stuck, review the definition of conditional probability (c12_math_cbse_13_001) and the Theorem.',
                  misconception: 'Students often confuse the prior \\(P(E_i)\\) with the posterior \\(P(E_i|A)\\) and mistakenly believe Bayes\' Theorem says.' }
          ],
            remediations: { 'students-often-confuse-the-prior': { steps: ['If a student exhibits the above misconceptions, take these steps: (1) Revisit the definition of a partition using.', '(2) Re‑derive the Theorem of Total Probability from \\(A = A\\cap S = \\bigcup (A\\cap E_i)\\) emphasizing disjointness.', '(3) Work through a simple two‑cause example (e.g., two boxes with different colored balls) where the student manually.', '(4) Practice identifying priors and likelihoods in word problems by labeling each probability as "prior".'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_006', difficulty: 'standard',
          question: 'If {E₁, E₂, ..., Eₙ} is a partition of the sample space S (i.e., the events are.',
          hint: 'If stuck, revisit conditional probability definition (c12_math_cbse_13_001) and.',
          misconception: 'Students often treat the Total Probability Theorem as a simple weighted average and forget to verify that the events.',
          parts: [
                { id: 'a', prompt: 'A bag contains 4 red and 6 black balls. A second bag contains 3 red and 7 black balls.', answer: 'Let E₁ = choose bag 1, E₂ = choose bag 2',
                  options: ['Let E₁ = choose bag 1, E₂ = choose bag 2', 'rainy day', 'cloudy day', 'reverse probability'],
                  hint: 'If stuck, revisit conditional probability definition (c12_math_cbse_13_001) and multiplication.',
                  misconception: 'Students often treat the Total Probability Theorem as a simple weighted average and forget to verify that the events form a valid.' },
                { id: 'b', prompt: 'A student argues: "The events E₁ = {1,2}, E₂ = {2,3}, E₃ = {3,4} form a partition of S = {1,2,3,4} because their union is S." Is the student correct?', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'rainy day', 'cloudy day', 'reverse probability'],
                  hint: 'If stuck, revisit conditional probability definition (c12_math_cbse_13_001) and multiplication.',
                  misconception: 'Students often treat the Total Probability Theorem as a simple weighted average and forget to verify that the events form a valid.' }
          ],
            remediations: { 'students-often-treat-the-total': { steps: ['Name partitions.', 'Check disjoint and exhaustive.', 'Write priors.', 'Write conditionals.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
