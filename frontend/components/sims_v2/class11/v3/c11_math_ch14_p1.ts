import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch14_p1: SimDef = {
    id: 'v3_c11_math_ch14_p1',
    title: 'Mathematical Reasoning · Part 1/2',
    subtitle: 'Learn that a false sentence is still a statement — and how to negate one honestly.',
    classLevel: 11, subject: 'mathematics', topic: 'Mathematical Reasoning · Part 1/2',
    chapters: ['c11_math_ch14'],
    nodeIds: ['c11_math_cbse_14_001', 'c11_math_cbse_14_002', 'c11_math_cbse_14_003', 'c11_math_cbse_14_004', 'c11_math_cbse_14_005', 'c11_math_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a logician checking whether sentences carry a truth value', intro: '\'Solve 2x + 3 = 7\' is a command; \'π is rational\' is a statement — one has a truth value, the other never could.', goal: 'Identify mathematical statements and form correct negations across quantifiers and connectives.' },
    discovery: {
        question: '\'All prime numbers are odd\' — is it even a mathematical statement, given that it\'s false?',
        options: ['Yes — a statement is anything with a definite truth value; false ones count, and its negation is \'some prime is not odd\'', 'No — only true sentences are statements', 'No — it contains a category error', 'Yes — but its negation is \'all primes are even\''],
        answer: 'Yes — a statement is anything with a definite truth value; false ones count, and its negation is \'some prime is not odd\'',
        hook: '\'x > 5\' isn\'t a statement, but \'for all real x, x > 5\' is — the quantifier binds the variable and the sentence gets a verdict: false.',
    },
    teaching: [
        { title: 'Statements: Mathematical Logic Basics', text: 'A mathematical statement is a declarative sentence that is either true or false, but not both simultaneously.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_14_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Sort commands, open sentences and claims into statement-or-not, then negate \'x is even and x > 10\' without forgetting to flip the \'and.\'',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_14_001', title: 'Statements: Mathematical Logic Basics',
          caseStudy: { intro: 'Imagine your friend says: "The square of any integer is always positive." You wonder: Is this a sentence we can definitively label as true or false?',
            decisions: [{ prompt: 'Which of the following is a mathematical statement? (a) "Please open the window." (b) "The sum of interior angles of a triangle is 180°.".', options: [
                { text: '(b) "The sum of interior angles of a triangle is 180°."', outcome: '(b) "The sum of interior angles of a triangle is 180°." This is a declarative sentence with.' },
                { text: 'statement', outcome: 'Not quite — Students often believe that a false sentence is not a statement.', reveals: 'a-false-sentence-is-not' },
                { text: 'a false sentence is not a statement', outcome: 'Not quite — Students often believe that a false sentence is not a statement.', reveals: 'a-false-sentence-is-not' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_14_002', title: 'Negation of a Statement',
          scaffold: { problem: 'Write the negation of the following statements and state the truth value of each negation: (i) "The sum of interior angles of a triangle.',
            steps: [
            { text: 'Identify the logical structure of each statement. (i) is a simple declarative statement p.' },
            { text: 'Apply negation rules. (i) ∼p: "It is not the case that the sum of interior angles of a triangle is 180°" or "The sum.' },
            { text: 'Determine truth values of original statements. (i) True (Euclidean geometry). (ii) False (1 has no predecessor in ℕ).' },
            { text: 'Flip truth values for negations. (i) Negation is False. (ii) Negation is True. (iii) Negation is True.' },
            { text: 'Write final answers clearly with truth values.', faded: true, blankAnswer: '(i) "The sum of interior angles of a triangle is not 180°.".' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_14_003', title: 'Compound Statements: And, Or',
          scaffold: { problem: 'A student must qualify for a scholarship. The rules state: "The applicant must have scored ≥ 90% in Class 10 AND have family income ≤ ₹8.',
            steps: [
            { text: 'Identify component statements p and q and the connective "AND" → compound statement is p ∧ q.' },
            { text: 'Recall truth table for conjunction: p ∧ q is TRUE only when p=T AND q=T; FALSE otherwise.' },
            { text: 'For Anjali: p = "92% ≥ 90%" = TRUE; q = "₹7 lakh ≤ ₹8 lakh" = TRUE. p ∧ q = T ∧ T = TRUE → Eligible.' },
            { text: 'For Rohan: p = "88% ≥ 90%" = FALSE; q = "₹6 lakh ≤ ₹8 lakh" = TRUE. p ∧ q = F ∧ T = FALSE → Not eligible.' },
            { text: 'For Priya: p = "95% ≥ 90%" = TRUE; q = "₹9 lakh ≤ ₹8 lakh" = FALSE. p ∧ q = T ∧ F = FALSE → Not eligible.' },
            { text: 'For Amit: p = "85% ≥ 90%" = FALSE; q = "₹10 lakh ≤ ₹8 lakh" = FALSE. p ∧ q = F ∧ F = FALSE → Not eligible.', faded: true, blankAnswer: 'Only Anjali is eligible (p ∧ q = TRUE). Rohan, Priya, Amit.' }
            ] } },
        { type: 'case', nodeId: 'c11_math_cbse_14_004', title: 'Implications: If-Then Statements',
          caseStudy: { intro: 'Imagine your mathematics teacher says: "If you score above 90% in the Class 11 final exam, then I will gift you a scientific calculator." You want to know.',
            decisions: [{ prompt: 'Write the truth table for the implication p → q. In which row(s) is the implication false?', options: [
                { text: 'The truth table for p → q: | p | q | p → q | |---|---|-------| | T | T | T | | T | F | F', outcome: 'The truth table for p → q: | p | q | p → q | |---|---|-------| | T | T | T | | T | F | F | | F |.' },
                { text: 'false hypothesis makes implication false', outcome: 'Not quite — Students treat "p only if q" as "if q then p" (reversing the implication).', reveals: 'students-treat-p-only-if' },
                { text: 'if it rains, the ground gets wet', outcome: 'Not quite — Students treat "p only if q" as "if q then p" (reversing the implication).', reveals: 'students-treat-p-only-if' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_14_005', title: 'Contrapositive and Converse',
          caseStudy: { intro: 'Imagine your teacher says: "If you score above 90% in the board exam, then you will get a scholarship." You wonder: "Does getting a scholarship guarantee.',
            decisions: [{ prompt: 'Write the converse and contrapositive of the implication: "If a number is divisible by 6, then it is divisible by 3."', options: [
                { text: 'Converse: "If a number is divisible by 3, then it is divisible by 6." Contrapositive: "If', outcome: 'Converse: "If a number is divisible by 3, then it is divisible by 6." Contrapositive: "If a number.' },
                { text: 'If a number is divisible by 3, then it is divisible by 6', outcome: 'Not quite — Students confuse **contrapositive** (¬q → ¬p) with **inverse** (¬p → ¬q).', reveals: 'students-confuse-contrapositive-q-p' },
                { text: 'If a number is not divisible by 3, then it is not divisible by 6', outcome: 'Not quite — Students confuse **contrapositive** (¬q → ¬p) with **inverse** (¬p → ¬q).', reveals: 'students-confuse-contrapositive-q-p' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_14_006', title: 'Validating Statements: Methods',
          caseStudy: { intro: 'Imagine you are given a claim: "If a natural number n is divisible by 6, then it is divisible by 3." How do you prove this is always true?',
            decisions: [{ prompt: 'State the four standard methods for validating a mathematical statement as per NCERT Class 11 Mathematical Reasoning.', options: [
                { text: 'The four methods are: (1) Direct Method, (2) Contrapositive Method, (3) Method of', outcome: 'The four methods are: (1) Direct Method, (2) Contrapositive Method, (3) Method of Contradiction.' },
                { text: 'induction', outcome: 'Not quite — Students often think that proving an implication p⇒q by contradiction means assuming p is false and.', reveals: 'proving-an-implication-p-q' },
                { text: 'verification by examples', outcome: 'Not quite — Students often think that proving an implication p⇒q by contradiction means assuming p is false and.', reveals: 'proving-an-implication-p-q' }
            ] }] } },
        { type: 'drill', nodeId: 'c11_math_cbse_14_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a logic warm-up, a student claims: \'\'All prime numbers are odd\' isn\'t a statement because it\'s false.\' Asked to negate it, he writes \'All prime numbers are even.\'',
            decisions: [{ prompt: 'What do the definitions of statement and negation require?', options: [
                { text: 'Apply both definitions cleanly: a statement is any sentence with a definite truth value — false sentences are still statements (this one is false because 2 is prime and even). And negating \'All A are B\' flips the quantifier: ~p is \'Some A are not B\' — the existence of one counterexample (2) — not the universal opposite \'All A are not B.\'', outcome: 'He gets the two pillars: truth-value determines statementhood, and negation of a universal is an existential — one counterexample, not a flipped universal.' },
                { text: 'Agree it\'s not a statement — statements are true claims by definition.', outcome: 'That confuses \'statement\' with \'true statement\': false declaratives have a truth value, so they qualify — falsity doesn\'t disqualify.', reveals: 'false-isnt-statement' },
                { text: 'Accept the negation — \'all primes even\' is the natural opposite of \'all primes odd\'.', outcome: 'The opposite of a universal isn\'t another universal: negation needs only one exception — \'some prime is not odd\' — which 2 supplies.', reveals: 'negate-all-as-all-not' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'Negate \'some are\' with \'none are\'; negate \'all are\' with \'some aren\'t\' — the quantifier flips before the predicate does.',
            decisions: [{ prompt: 'What comes next? Mathematical Reasoning · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mathematical Reasoning · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_14_001', difficulty: 'standard',
          question: 'A mathematical statement is a declarative sentence that is either true.',
          hint: 'Review the concept of open sentences vs. closed sentences from algebra (e.g.',
          misconception: 'Students often believe that a false sentence is not a statement.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a mathematical statement? (a) "Please open the window." (b) "The sum of interior angles of a triangle is 180°." (c) "How beautiful.', answer: '"The sum of interior angles of a triangle is 180°." (',
                  options: ['"The sum of interior angles of a triangle is 180°." (', 'statement', 'a false sentence is not a statement'],
                  hint: 'Review the concept of open sentences vs. closed sentences from algebra (e.g., c8_math_ch5_11) and.',
                  misconception: 'Students often believe that a false sentence is not a statement.' },
                { id: 'b', prompt: 'Determine whether each is a statement. If yes, give its truth value.', answer: '(i) Statement, false (2 is prime and even)',
                  options: ['(i) Statement, false (2 is prime and even)', 'statement', 'a false sentence is not a statement'],
                  hint: 'Review the concept of open sentences vs. closed sentences from algebra (e.g., c8_math_ch5_11) and.',
                  misconception: 'Students often believe that a false sentence is not a statement.' },
                { id: 'c', prompt: 'Consider the sentences: P: "n + 5 = 10" and Q: "There exists an integer n such that n + 5 = 10." Which is a statement?', answer: 'Q is a statement (true, n=5 works)',
                  options: ['Q is a statement (true, n=5 works)', 'statement', 'a false sentence is not a statement'],
                  hint: 'Review the concept of open sentences vs. closed sentences from algebra (e.g., c8_math_ch5_11) and.',
                  misconception: 'Students often believe that a false sentence is not a statement.' }
          ],
            remediations: { 'a-false-sentence-is-not': { steps: ['Remind the student of the definition: "A statement is a sentence that is either true or false." Emphasize the "either.', 'or" includes both possibilities.', 'Show a clear false mathematical statement like "2 + 2 = 5" and ask: "Can we decide if this is true or false?" Yes, it\'s.', 'Contrast with "x + 2 = 5" where we cannot decide without knowing x.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that a false sentence is not a statement.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since \'x > 5\' is not a statement, \'For all real x, x > 5\' is also not a statement because it still contains x." Evaluate this claim and.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'statement', 'a false sentence is not a statement'],
                  hint: 'Review the concept of open sentences vs. closed sentences from algebra (e.g., c8_math_ch5_11) and.',
                  misconception: 'Students often believe that a false sentence is not a statement.' },
                { id: 'b', prompt: 'Create your own example of a sentence that looks like a statement but is not, due to a hidden ambiguity or subjectivity. Explain why it fails the definition.', answer: 'Example: "This triangle is large." It fails',
                  options: ['Example: "This triangle is large." It fails', 'statement', 'a false sentence is not a statement'],
                  hint: 'Review the concept of open sentences vs. closed sentences from algebra (e.g., c8_math_ch5_11) and.',
                  misconception: 'Students often believe that a false sentence is not a statement.' }
          ],
            remediations: { 'a-false-sentence-is-not': { steps: ['Remind the student of the definition: "A statement is a sentence that is either true or false." Emphasize the "either.', 'or" includes both possibilities.', 'Show a clear false mathematical statement like "2 + 2 = 5" and ask: "Can we decide if this is true or false?" Yes, it\'s.', 'Contrast with "x + 2 = 5" where we cannot decide without knowing x.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_14_002', difficulty: 'standard',
          question: 'The negation of a statement p, denoted by ∼p (read as "not p"), is a new.',
          hint: 'Revisit c11_math_cbse_14_001 to practice identifying statements and their truth values.',
          misconception: 'Students often negate "All A are B" as "All A are not B" (i.e., no A is B) instead of the correct "Some A are not B".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The negation of a statement p, denoted by ∼p (read as "not p"), is a new statement whose',
                  options: ['The negation of a statement p, denoted by ∼p (read as "not p"), is a new statement whose', 'A mathematical statement is a declarative sentence that is either true or false, but not', 'A compound statement is formed by combining two or more simple statements using logical', 'An implication (if-then statement) is a compound statement of the form "If p, then q"'],
                  hint: 'Revisit c11_math_cbse_14_001 to practice identifying statements and their truth values; then.',
                  misconception: 'Students often negate "All A are B" as "All A are not B" (i.e., no A is B) instead of the correct "Some A are not B" (there exists an.' }
          ],
            remediations: { 'students-often-negate-all-a': { steps: ['If a student makes this error, first ask them to write the statement in symbolic form: ∀x (P(x) → Q(x)).', 'Then show step-by-step: negation is ∼∀x (P(x) → Q(x)) ≡ ∃x ∼(P(x) → Q(x)) ≡ ∃x (P(x) ∧ ∼Q(x)).', 'Translate back: "There exists an x such that P(x) is true and Q(x) is false." Practice with 3 examples: "All birds fly".'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_14_003', difficulty: 'standard',
          question: 'A compound statement is formed by combining two or more simple statements using.',
          hint: 'Revisit c11_math_cbse_14_001 (identifying statements) and c11_math_cbse_14_002 (negation.',
          misconception: 'Students treat mathematical "or" as exclusive (exactly one true) because everyday language often implies exclusivity.',
          parts: [
                { id: 'a', prompt: 'What is the truth value of the compound statement "2 + 2 = 4 and 3 × 3 = 10"? Identify the component statements and explain your reasoning.', answer: 'The compound statement is FALSE',
                  options: ['The compound statement is FALSE', 'it\'s true because the first part is true', '"and" only needs one true component, confusing it with "or"'],
                  hint: 'Revisit c11_math_cbse_14_001 (identifying statements) and c11_math_cbse_14_002 (negation truth.',
                  misconception: 'Students treat mathematical "or" as exclusive (exactly one true) because everyday language often implies exclusivity ("tea or coffee?").' },
                { id: 'b', prompt: 'Consider the statement: "x > 5 or x < 3". For which real values of x is this statement true? Explain why the inclusive "or" matters here.', answer: 'The statement is true for x ∈ (-∞, 3) ∪ (5, ∞)',
                  options: ['The statement is true for x ∈ (-∞, 3) ∪ (5, ∞)', 'all real numbers', 'x ≠ 3,5', '(union) or thinks'],
                  hint: 'Revisit c11_math_cbse_14_001 (identifying statements) and c11_math_cbse_14_002 (negation truth.',
                  misconception: 'Students treat mathematical "or" as exclusive (exactly one true) because everyday language often implies exclusivity ("tea or coffee?").' },
                { id: 'c', prompt: 'Compare the truth tables of p ∧ q and p ∨ q. For which rows do they give the same truth value?', answer: 'Truth table rows (p, q): (T,T)→both T',
                  options: ['Truth table rows (p, q): (T,T)→both T', 'they never match', 'they match when one is true', 'same truth value'],
                  hint: 'Revisit c11_math_cbse_14_001 (identifying statements) and c11_math_cbse_14_002 (negation truth.',
                  misconception: 'Students treat mathematical "or" as exclusive (exactly one true) because everyday language often implies exclusivity ("tea or coffee?").' }
          ],
            remediations: { 'students-treat-mathematical-or-as': { steps: ['Have student build truth table for "tea or coffee" in real life (usually exclusive) vs mathematical "or".', 'Explicitly write 4 rows for p, q with T/T, T/F, F/T, F/F.', 'For each row, ask "Is p true? Is q true? Is \'p or q\' true?" Emphasize: row 1 (both true) → "or" is TRUE.', 'For negation, use concrete example: "Raining and cold" → negation "NOT(raining and cold)" = "Not raining OR not cold".'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_14_004', difficulty: 'standard',
          question: 'An implication (if-then statement) is a compound statement of the form "If.',
          hint: 'If stuck, revisit c11_math_cbse_14_001 (identifying statements and truth values) and.',
          misconception: 'Students treat "p only if q" as "if q then p" (reversing the implication).',
          parts: [
                { id: 'a', prompt: 'Rewrite each statement in the form "If p, then q" and identify p and q: (a) "You can access the internet only if you have a password." (b) "A quadrilateral.', answer: '(a) p: You have a password, q: You can access the internet',
                  options: ['(a) p: You have a password, q: You can access the internet', 'sufficient', 'necessary', 'p is sufficient for q'],
                  hint: 'If stuck, revisit c11_math_cbse_14_001 (identifying statements and truth values) and.',
                  misconception: 'Students treat "p only if q" as "if q then p" (reversing the implication).' },
                { id: 'b', prompt: 'Given p: "x is a prime number greater than 2" and q: "x is odd".', answer: 'For any x: - p → q: "If x is prime >2, then x is odd"',
                  options: ['For any x: - p → q: "If x is prime >2, then x is odd"', 'p is sufficient for q', 'p is necessary for q'],
                  hint: 'If stuck, revisit c11_math_cbse_14_001 (identifying statements and truth values) and.',
                  misconception: 'Students treat "p only if q" as "if q then p" (reversing the implication).' }
          ],
            remediations: { 'students-treat-p-only-if': { steps: ['Give the student 5 "only if" statements from daily life (e.g., "You get distinction only if you score 75%", "The train.', 'For each, ask: "Which part is the promise/condition? Which part is the guaranteed outcome?"', 'Show that "A only if B" means A cannot happen WITHOUT B, so A → B.', 'Practice the "sufficient/necessary" translation drill: "p is sufficient for q" = p → q (p guarantees q); "p.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_14_005', difficulty: 'standard',
          question: 'For an implication "If p, then q" (symbolically p → q), the **converse** is "If.',
          hint: 'If stuck, revisit c11_math_cbse_14_002 (Negation of a Statement) to practice negating.',
          misconception: 'Students confuse **contrapositive** (¬q → ¬p) with **inverse** (¬p → ¬q).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For an implication "If p, then q" (symbolically p → q), the **converse** is "If q, then',
                  options: ['For an implication "If p, then q" (symbolically p → q), the **converse** is "If q, then', 'A mathematical statement is a declarative sentence that is either true or false, but not', 'The negation of a statement p, denoted by ∼p (read as "not p"), is a new statement whose', 'A compound statement is formed by combining two or more simple statements using logical'],
                  hint: 'If stuck, revisit c11_math_cbse_14_002 (Negation of a Statement) to practice negating compound.',
                  misconception: 'Students confuse **contrapositive** (¬q → ¬p) with **inverse** (¬p → ¬q).' }
          ],
            remediations: { 'students-confuse-contrapositive-q-p': { steps: ['Have the student write the implication in symbolic form p → q.', 'Explicitly write "Contrapositive = (¬q) → (¬p)" — note the SWAP in order.', 'Practice with 5 examples where they must first write the inverse (¬p → ¬q) and contrapositive (¬q → ¬p) side by side.', 'Use the mnemonic "Contrapositive = Flip AND Negate" (flip the order, negate both) vs "Inverse = Only Negate".'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_14_006', difficulty: 'standard',
          question: 'Validating a statement means determining its truth value (true or false) using.',
          hint: 'Revisit c11_math_cbse_14_005 (Contrapositive and Converse) and c11_math_cbse_14_002.',
          misconception: 'Students often think that proving an implication p⇒q by contradiction means assuming p is false and deriving.',
          parts: [
                { id: 'a', prompt: 'Explain why the statement "For every real number x, x² ≥ x" is false, and identify which validation method you are using.', answer: 'The statement is false',
                  options: ['The statement is false', 'it\'s true for x=2 so it\'s true'],
                  hint: 'Revisit c11_math_cbse_14_005 (Contrapositive and Converse) and c11_math_cbse_14_002 (Negation of.',
                  misconception: 'Students often think that proving an implication p⇒q by contradiction means assuming p is false and deriving a contradiction.' },
                { id: 'b', prompt: 'Compare the contrapositive method and the contradiction method for validating an implication p⇒q. When would you prefer one over the other?', answer: 'Contrapositive proves p⇒q by proving ¬q⇒¬p (logically equivalent)',
                  options: ['Contrapositive proves p⇒q by proving ¬q⇒¬p (logically equivalent)', 'they are the same', 'the negation of the whole implication'],
                  hint: 'Revisit c11_math_cbse_14_005 (Contrapositive and Converse) and c11_math_cbse_14_002 (Negation of.',
                  misconception: 'Students often think that proving an implication p⇒q by contradiction means assuming p is false and deriving a contradiction.' }
          ],
            remediations: { 'proving-an-implication-p-q': { steps: ['If a student makes this error, guide them through the truth table of implication: p⇒q is false only when p=T and q=F.', 'Therefore, to contradict the implication, we must assume that exact scenario (p true, q false).', 'Have them write the negation of p⇒q explicitly: ¬(p⇒q) ≡ p∧¬q.', 'Then practice with 3-4 implications: identify p and q, write the contradiction assumption p∧¬q, and derive the.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
