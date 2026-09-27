import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch09 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch09: SimDef = {
    id: 'v3_c11_app_ch09',
    title: 'Probability',
    subtitle: 'This node covers the foundational concepts of probability: random experiments, sample.',
    classLevel: 11, subject: 'app', topic: 'Probability',
    chapters: ['c11_app_ch09'],
    nodeIds: ['c11_app_cbse_09_001', 'c11_app_cbse_09_002', 'c11_app_cbse_09_003', 'c11_app_cbse_09_004', 'c11_app_cbse_09_005', 'c11_app_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with a real question: "Your friend claims they can predict whether a coin will land heads or tails.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student writes the sample space for "tossing a coin three times" as S = {H, T}.',
        options: ['The sample space must contain ALL possible outcomes of the experiment as defined', 'mutually exclusive', 'independent'],
        answer: 'The sample space must contain ALL possible outcomes of the experiment as defined',
        hook: 'Students often believe that "mutually exclusive" and "independent" mean the same thing — that if two events can\'t.',
    },
    teaching: [
        { title: 'Introduction', text: 'Probability is a numerical measure between 0 and 1 that quantifies the likelihood of an event occurring in a random experiment, where 0 indicates impossibility and 1 indicates certainty.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_09_001', title: 'Introduction',
          scaffold: { problem: 'A software company tests a new app feature. They select 3 users at random from a pool of 10 (6 experienced, 4 beginners).',
            steps: [
            { text: 'Identify the experiment — ordered selection of 3 users from 10 without replacement, but we only track type (E/B), not.' },
            { text: 'Determine sample space — each position has 2 possibilities (E or B), so 2³ = 8 ordered triples: S = {EEE, EEB, EBE.' },
            { text: 'Identify the event — "first experienced, third beginner" means first = E, third = B. Middle can be E or B.' },
            { text: 'Check equally likely assumption — the problem states "all ordered selections are equally likely." But wait: there are.' },
            { text: 'Correct approach — total ways to choose ordered 3 from 10: 10P3 = 720.', faded: true, blankAnswer: 'Sample space of user identities has 720 ordered triples.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_09_002', title: 'Random experiment and sample space:',
          caseStudy: { intro: 'Start with a relatable scenario: "You\'re waiting for an OTP on your phone — it could be any 6-digit number from 000000 to 999999.',
            decisions: [{ prompt: 'State the two necessary and sufficient conditions for a process to be classified as a random experiment.', options: [
                { text: 'A process is a random experiment if and only if: (1) it has more than one possible', outcome: 'A process is a random experiment if and only if: (1) it has more than one possible outcome, and (2).' },
                { text: 'it involves chance', outcome: 'Not quite — Students believe the sample space is an inherent property of the physical objects involved (e.g.', reveals: 'the-sample-space-is-an' },
                { text: 'it can be repeated', outcome: 'Not quite — Students believe the sample space is an inherent property of the physical objects involved (e.g.', reveals: 'the-sample-space-is-an' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_09_003', title: 'Event and its probability:',
          scaffold: { problem: 'A committee of 2 is to be selected from 3 men (M1, M2, M3) and 2 women (W1, W2).',
            steps: [
            { text: 'Identify the random experiment and sample space. Experiment: select 2 people from 5.' },
            { text: 'Define events. (a) E₁ = exactly one woman = {M1W1, M1W2, M2W1, M2W2, M3W1, M3W2}. n(E₁) = 6.' },
            { text: 'Apply classical formula P(E) = n(E)/n(S). P(E₁) = 6/10 = 3/5. P(E₂) = 9/10.' },
            { text: 'Verify using complement rule for (b): P(no man) = P({W1W2}) = 1/10 → P(at least one man) = 1 - 1/10 = 9/10. Consistent.' },
            { text: 'Interpret. There\'s a 60% chance of exactly one woman, 90% chance of at least one man.', faded: true, blankAnswer: '(a) 3/5, (b) 9/10' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_09_004', title: 'Conditional Probability',
          scaffold: { problem: 'A bag contains 5 red, 4 blue, and 3 green balls. Two balls are drawn at random without replacement.',
            steps: [
            { text: 'Identify the events. Let B1 = "first ball is blue", R2 = "second ball is red". We need P(R2 | B1).' },
            { text: 'Understand the condition. "Given first ball is blue" means we only consider outcomes where the first draw is blue.' },
            { text: 'Apply the reduced sample space logic. In this new scenario (condition B1 has occurred), the probability that the second.' },
            { text: 'Verify using the formula. P(B1) = 4/12 = 1/3. P(B1 ∩ R2) = P(B1) × P(R2|B1) = (4/12) × (5/11) = 20/132 = 5/33.' },
            { text: 'Interpret. The condition "first ball blue" removes one blue ball from the bag, changing the composition for the second.', faded: true, blankAnswer: '5/11' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_09_005', title: 'Theorem of Total Probability',
          scaffold: { problem: 'A Delhi-based electronics manufacturer sources microchips from three vendors: Vendor A (50% supply, 2% defect rate), Vendor B (30% supply.',
            steps: [
            { text: 'Identify the partitioning events. Let A₁ = "chip from Vendor A", A₂ = "chip from Vendor B", A₃ = "chip from Vendor C".' },
            { text: 'Identify the target event. Let D = "chip is defective". We need P(D).' },
            { text: 'Extract given probabilities. Priors: P(A₁) = 0.50, P(A₂) = 0.30, P(A₃) = 0.20.' },
            { text: 'Apply the Theorem of Total Probability formula. P(D) = P(D|A₁)P(A₁) + P(D|A₂)P(A₂) + P(D|A₃)P(A₃) = (0.02 × 0.50).' },
            { text: 'Compute and interpret. P(D) = 0.010 + 0.015 + 0.006 = 0.031. So, 3.1% of all microchips in inventory are expected to.', faded: true, blankAnswer: '0.031 or 3.1%' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_09_006', title: 'Bayes’ theorem',
          scaffold: { problem: 'An insurance company classifies policyholders into three risk categories: Low-risk (40% of policyholders, 5% annual claim probability).',
            steps: [
            { text: 'Identify the partition events (hypotheses): L = Low-risk, M = Medium-risk, H = High-risk.' },
            { text: 'Extract given probabilities: Priors P(L) = 0.40, P(M) = 0.35, P(H) = 0.25.' },
            { text: 'Compute total probability of claim P(C) using Theorem of Total Probability: P(C) = P(L)P(C|L) + P(M)P(C|M) + P(H)P(C|H).' },
            { text: 'Apply Bayes\' theorem for posterior P(H|C): P(H|C) = P(H)P(C|H) / P(C) = (0.25 × 0.30) / 0.1475 = 0.075 / 0.1475 ≈.' },
            { text: 'Interpret: Despite being only 25% of the population, High-risk policyholders constitute ~51% of claim filers.', faded: true, blankAnswer: 'The probability that the policyholder is High-risk given.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_09_006', title: 'You made it',
          caseStudy: { intro: 'You finished Probability — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_09_001', difficulty: 'standard',
          question: 'Probability is a numerical measure between 0 and 1 that quantifies the.',
          hint: 'Review set operations — especially intersection (∩) for "and" and union (∪) for "or".',
          misconception: 'Students often believe that "mutually exclusive" and "independent" mean the same thing — that if two events can\'t.',
          parts: [
                { id: 'a', prompt: 'A student writes the sample space for "tossing a coin three times" as S = {H, T}.', answer: 'The sample space must contain ALL possible outcomes of the experiment as defined',
                  options: ['The sample space must contain ALL possible outcomes of the experiment as defined', 'mutually exclusive', 'independent', 'separate'],
                  hint: 'Review set operations — especially intersection (∩) for "and" and union (∪) for "or" — and practice.',
                  misconception: 'Students often believe that "mutually exclusive" and "independent" mean the same thing — that if two events can\'t happen together, they.' },
                { id: 'b', prompt: 'Consider the experiment: "A family has two children. The gender of each child is observed in birth order." Let E = {both children are boys} and F = {at least.', answer: 'Sample space: S = {(b,b), (b,g), (g,b), (g,g)}',
                  options: ['Sample space: S = {(b,b), (b,g), (g,b), (g,g)}', 'yes, mutually exclusive', 'mutually exclusive', 'complementary'],
                  hint: 'Review set operations — especially intersection (∩) for "and" and union (∪) for "or" — and practice.',
                  misconception: 'Students often believe that "mutually exclusive" and "independent" mean the same thing — that if two events can\'t happen together, they.' }
          ],
            remediations: { 'mutually-exclusive-and-independent-mean': { steps: ['Draw a Venn diagram with two non-overlapping circles (mutually exclusive) inside a rectangle (sample space).', 'Label probabilities — e.g., P(E) = 0.3, P(F) = 0.2.', 'Ask: "If I tell you F happened, what is P(E)?" Student must answer 0.', 'Compare to original P(E) = 0.3.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "mutually exclusive" and "independent" mean the same thing — that if two events can\'t.',
          parts: [
                { id: 'a', prompt: 'In a medical test for a disease, 95% of people with the disease test positive (sensitivity), and 90% of people without the disease test negative (specificity).', answer: 'The 95% is P(positive test | disease), but we need P(disease | positive test)',
                  options: ['The 95% is P(positive test | disease), but we need P(disease | positive test)', 'base rate fallacy', 'it\'s 95% because the test is 95% accurate', 'mutually exclusive'],
                  hint: 'Review set operations — especially intersection (∩) for "and" and union (∪) for "or" — and practice.',
                  misconception: 'Students often believe that "mutually exclusive" and "independent" mean the same thing — that if two events can\'t happen together, they.' }
          ],
            remediations: { 'mutually-exclusive-and-independent-mean': { steps: ['Draw a Venn diagram with two non-overlapping circles (mutually exclusive) inside a rectangle (sample space).', 'Label probabilities — e.g., P(E) = 0.3, P(F) = 0.2.', 'Ask: "If I tell you F happened, what is P(E)?" Student must answer 0.', 'Compare to original P(E) = 0.3.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_09_002', difficulty: 'standard',
          question: 'A **random experiment** is a process or action that yields one of several.',
          hint: 'If stuck, review the difference between "predictable with certainty" and "unpredictable.',
          misconception: 'Students believe the sample space is an inherent property of the physical objects involved (e.g., "a die *has* sample.',
          parts: [
                { id: 'a', prompt: 'A student says: "Tossing a coin once and tossing a coin three times are the same random experiment because both involve a coin." Explain why this is incorrect.', answer: 'The two experiments are different',
                  options: ['The two experiments are different', 'a die *has* sample space {1,2,3,4,5,6}', 'the sample space is an inherent property of the physical objects involved (e'],
                  hint: 'If stuck, review the difference between "predictable with certainty" and "unpredictable.',
                  misconception: 'Students believe the sample space is an inherent property of the physical objects involved (e.g., "a die *has* sample space.' },
                { id: 'b', prompt: 'A bag contains 4 red balls (R1, R2, R3, R4) and 3 blue balls (B1, B2, B3). Two balls are drawn one after the other *without replacement*.', answer: 'S = {(R,R), (R,B), (B,R), (B,B)}',
                  options: ['S = {(R,R), (R,B), (B,R), (B,B)}', 'a die *has* sample space {1,2,3,4,5,6}', 'the sample space is an inherent property of the physical objects involved (e'],
                  hint: 'If stuck, review the difference between "predictable with certainty" and "unpredictable.',
                  misconception: 'Students believe the sample space is an inherent property of the physical objects involved (e.g., "a die *has* sample space.' },
                { id: 'c', prompt: 'Compare the sample spaces for these two experiments: Experiment A: Roll a die and observe the number.', answer: 'No, they are not the same random experiment',
                  options: ['No, they are not the same random experiment', 'yes, same experiment', 'a die *has* sample space {1,2,3,4,5,6}', 'the sample space is an inherent property of the physical objects involved (e'],
                  hint: 'If stuck, review the difference between "predictable with certainty" and "unpredictable.',
                  misconception: 'Students believe the sample space is an inherent property of the physical objects involved (e.g., "a die *has* sample space.' }
          ],
            remediations: { 'the-sample-space-is-an': { steps: ['Ask the student to read the NCERT definition again: "The sample space is defined based on how you define the outcome.', 'Give two experiments with identical physical setup but different outcome definitions (e.g., "toss a coin twice: (a).', 'Have them write both sample spaces side-by-side and explain why they differ.', 'Assign 3 practice problems where the *same* physical scenario (e.g., drawing 2 cards) has *different* outcome.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_09_003', difficulty: 'standard',
          question: 'An **event** is any subset of the sample space S associated with a random.',
          hint: 'If stuck, review c11_app_cbse_09_002: practice writing sample spaces for multi-stage.',
          misconception: '**The "Equally Likely Trap":** Students universally assume that if a sample space has n outcomes, each has probability.',
          parts: [
                { id: 'a', prompt: 'In the experiment of tossing two fair coins simultaneously, a student writes the sample space as S = {HH, HT, TH, TT} and defines event E = "at least one.', answer: 'Yes, the reasoning is valid',
                  options: ['Yes, the reasoning is valid', 'it\'s invalid because order doesn\'t matter'],
                  hint: 'If stuck, review c11_app_cbse_09_002: practice writing sample spaces for multi-stage experiments.',
                  misconception: '**The "Equally Likely Trap":** Students universally assume that if a sample space has n outcomes, each has probability 1/n.' },
                { id: 'b', prompt: 'An urn contains 5 tickets numbered 1 to 5. Two tickets are drawn at random **with replacement**. Define the sample space S as ordered pairs.', answer: 'S has 25 equally likely ordered pairs',
                  options: ['S has 25 equally likely ordered pairs', 'with replacement'],
                  hint: 'If stuck, review c11_app_cbse_09_002: practice writing sample spaces for multi-stage experiments.',
                  misconception: '**The "Equally Likely Trap":** Students universally assume that if a sample space has n outcomes, each has probability 1/n.' },
                { id: 'c', prompt: 'Consider the experiment: "A family has two children. The sample space is S = {BB, BG, GB, GG} (ordered by birth), assumed equally likely." Event E = "at least.', answer: 'The student incorrectly redefines E in the reduced space',
                  options: ['The student incorrectly redefines E in the reduced space', 'E becomes {BB,BG}'],
                  hint: 'If stuck, review c11_app_cbse_09_002: practice writing sample spaces for multi-stage experiments.',
                  misconception: '**The "Equally Likely Trap":** Students universally assume that if a sample space has n outcomes, each has probability 1/n.' }
          ],
            remediations: { 'the-equally-likely-trap-students': { steps: ['**Confront the assumption:** Give the student a biased die problem: "A die is loaded so P(6)=1/2, and.', 'Find P(even)." If they say 3/6=1/2, stop them.', '**Trace the axiom:** Write P(even) = P(2)+P(4)+P(6) = 1/10 + 1/10 + 1/2 = 7/10.', 'Ask: "Which step used \'equally likely\'?" None — we used additivity.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_09_004', difficulty: 'standard',
          question: 'If E and F are two events associated with the same sample space of a random.',
          hint: 'If stuck, review c11_app_cbse_09_003 (Event and its probability) — specifically the.',
          misconception: 'Students consistently confuse P(E|F) with P(F|E) — the **reversal fallacy**.',
          parts: [
                { id: 'a', prompt: 'A die is rolled. Let E be the event "number is even" and F be the event "number is greater than 3". Find P(E|F) and P(F|E). Are they equal?', answer: 'Sample space S = {1,2,3,4,5,6}',
                  options: ['Sample space S = {1,2,3,4,5,6}', 'they are always equal', 'P(E|F) = P(F|E) generally'],
                  hint: 'If stuck, review c11_app_cbse_09_003 (Event and its probability) — specifically the examples.',
                  misconception: 'Students consistently confuse P(E|F) with P(F|E) — the **reversal fallacy**.' },
                { id: 'b', prompt: 'In a class of 50 students, 30 play cricket, 25 play football, and 10 play both. A student is selected at random.', answer: 'Let C = plays cricket, F = plays football',
                  options: ['Let C = plays cricket, F = plays football', 'given football, probability of cricket', 'given cricket, probability of football'],
                  hint: 'If stuck, review c11_app_cbse_09_003 (Event and its probability) — specifically the examples.',
                  misconception: 'Students consistently confuse P(E|F) with P(F|E) — the **reversal fallacy**.' },
                { id: 'c', prompt: 'Two cards are drawn successively without replacement from a well-shuffled deck of 52 cards.', answer: 'Let K1 = first card is king, K2 = second card is king',
                  options: ['Let K1 = first card is king, K2 = second card is king', 'without replacement'],
                  hint: 'If stuck, review c11_app_cbse_09_003 (Event and its probability) — specifically the examples.',
                  misconception: 'Students consistently confuse P(E|F) with P(F|E) — the **reversal fallacy**.' }
          ],
            remediations: { 'students-consistently-confuse-p-e': { steps: ['Draw a Venn diagram with sample space S, events E and F overlapping. Shade F — say "This is our new universe.', 'Shade E∩F — say "Only this part of E survives in the new universe."', 'Write P(E|F) = (Area of E∩F) / (Area of F).', 'Contrast with P(F|E) by shading E as the new universe.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_09_005', difficulty: 'standard',
          question: 'The Theorem of Total Probability states that if {A₁, A₂, ..., Aₙ} is.',
          hint: 'Review conditional probability (c11_app_cbse_09_004) focusing on the multiplication rule.',
          misconception: 'Students often believe that **any set of conditional probabilities P(B|Aᵢ) can be averaged or summed directly** to get.',
          parts: [
                { id: 'a', prompt: 'State the three necessary and sufficient conditions for a collection of events {A₁, A₂, ..., Aₙ} to form a partition of the sample space S.', answer: 'The three conditions are: (1) Exhaustiveness: A₁ ∪ A₂ ∪',
                  options: ['The three conditions are: (1) Exhaustiveness: A₁ ∪ A₂ ∪', 'exhaustive events', 'only mutual exclusivity or confusing partition with just "exhaustive events"'],
                  hint: 'Review conditional probability (c11_app_cbse_09_004) focusing on the multiplication rule P(A∩B).',
                  misconception: 'Students often believe that **any set of conditional probabilities P(B|Aᵢ) can be averaged or summed directly** to get P(B), ignoring the.' },
                { id: 'b', prompt: 'Consider two events A and B in a sample space S. A student claims: "Since A and B are mutually exclusive and P(A) + P(B) = 1, they form a partition, so I can.', answer: 'The claim is **incorrect**',
                  options: ['The claim is **incorrect**', 'probabilities sum to 1', 'events are non-empty'],
                  hint: 'Review conditional probability (c11_app_cbse_09_004) focusing on the multiplication rule P(A∩B).',
                  misconception: 'Students often believe that **any set of conditional probabilities P(B|Aᵢ) can be averaged or summed directly** to get P(B), ignoring the.' }
          ],
            remediations: { 'any-set-of-conditional-probabilities': { steps: ['**Revisit the partition definition**: Draw a Venn diagram of S with 3 overlapping circles labeled A₁, A₂, A₃.', 'Ask: "Can an outcome be in two circles?', 'If yes, is it a partition?', 'If we sum P(B|Aᵢ)P(Aᵢ), what gets double-counted?" 2.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_09_006', difficulty: 'standard',
          question: 'Bayes\' theorem provides a mathematical framework for updating the probability.',
          hint: 'Review the Theorem of Total Probability (c11_app_cbse_09_005) — specifically, practice.',
          misconception: 'Students consistently confuse the "likelihood" P(B|A_i) with the "posterior" P(A_i|B), treating Bayes\' theorem.',
          parts: [
                { id: 'a', prompt: 'A diagnostic test for a disease has 95% sensitivity (true positive rate) and 90% specificity (true negative rate).', answer: 'Let D = has disease, T+ = tests positive',
                  options: ['Let D = has disease, T+ = tests positive', 'likelihood', 'posterior'],
                  hint: 'Review the Theorem of Total Probability (c11_app_cbse_09_005) — specifically, practice identifying.',
                  misconception: 'Students consistently confuse the "likelihood" P(B|A_i) with the "posterior" P(A_i|B), treating Bayes\' theorem as merely plugging numbers.' },
                { id: 'b', prompt: 'Compare and contrast the Theorem of Total Probability and Bayes\' theorem. In what sense are they "inverses" of each other?', answer: 'The Theorem of Total Probability computes P(B) = Σ P(A_i)P(B|A_i)',
                  options: ['The Theorem of Total Probability computes P(B) = Σ P(A_i)P(B|A_i)', 'likelihood', 'posterior'],
                  hint: 'Review the Theorem of Total Probability (c11_app_cbse_09_005) — specifically, practice identifying.',
                  misconception: 'Students consistently confuse the "likelihood" P(B|A_i) with the "posterior" P(A_i|B), treating Bayes\' theorem as merely plugging numbers.' }
          ],
            remediations: { 'students-consistently-confuse-the-likelihood': { steps: ['Have the student draw a tree diagram with the partition events (A_1, A_2, ...) as first branches and the evidence (B.', 'Label each branch with the given probabilities (priors on first level, likelihoods on second).', 'Compute joint probabilities P(A_i ∩ B) = P(A_i)P(B|A_i) for all i.', 'Show that P(B) is the sum of these joint probabilities along the B-branches.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
