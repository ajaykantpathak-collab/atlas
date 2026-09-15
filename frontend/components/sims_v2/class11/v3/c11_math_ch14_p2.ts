import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch14_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch14_p2: SimDef = {
    id: 'v3_c11_math_ch14_p2',
    title: 'Mathematical Reasoning · Part 2/2',
    subtitle: 'Learn that a false sentence is still a statement — and how to negate one honestly.',
    classLevel: 11, subject: 'mathematics', topic: 'Mathematical Reasoning · Part 2/2',
    chapters: ['c11_math_ch14'],
    nodeIds: ['c11_math_cbse_14_007', 'c11_math_cbse_14_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a logician checking whether sentences carry a truth value', intro: '\'Solve 2x + 3 = 7\' is a command; \'π is rational\' is a statement — one has a truth value, the other never could.', goal: 'Identify mathematical statements and form correct negations across quantifiers and connectives.' },
    discovery: {
        question: '\'All prime numbers are odd\' — is it even a mathematical statement, given that it\'s false?',
        options: ['Yes — a statement is anything with a definite truth value; false ones count, and its negation is \'some prime is not odd\'', 'No — only true sentences are statements', 'No — it contains a category error', 'Yes — but its negation is \'all primes are even\''],
        answer: 'Yes — a statement is anything with a definite truth value; false ones count, and its negation is \'some prime is not odd\'',
        hook: '\'x > 5\' isn\'t a statement, but \'for all real x, x > 5\' is — the quantifier binds the variable and the sentence gets a verdict: false.',
    },
    teaching: [
        { title: 'Quantifiers: For All, There Exists', text: 'A quantifier is a logical symbol that specifies the quantity of elements in a domain for which a predicate (open statement) holds true.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_14_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Sort commands, open sentences and claims into statement-or-not, then negate \'x is even and x > 10\' without forgetting to flip the \'and.\'',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_14_008', title: 'Applications of Mathematical Reasoning',
          caseStudy: { intro: 'Imagine a shopkeeper in Delhi says: "If you buy more than 5 kg of apples, I will give you a 10% discount." You buy 6 kg but he refuses the discount, claiming.',
            decisions: [{ prompt: 'State the contrapositive of the implication: "If a number is divisible by 6, then it is divisible by 3." Write it in words and in symbolic.', options: [
                { text: 'Contrapositive: "If a number is NOT divisible by 3, then it is NOT divisible by 6."', outcome: 'Contrapositive: "If a number is NOT divisible by 3, then it is NOT divisible by 6." Symbolically.' },
                { text: 'If divisible by 3 then divisible by 6', outcome: 'Not quite — Students often treat "if p then q" as equivalent to "if q then p" (converse) or "if not p then not.', reveals: 'students-often-treat-if-p' }
            ] }] } },
        { type: 'drill', nodeId: 'c11_math_cbse_14_008', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a logic warm-up, a student claims: \'\'All prime numbers are odd\' isn\'t a statement because it\'s false.\' Asked to negate it, he writes \'All prime numbers are even.\'',
            decisions: [{ prompt: 'What do the definitions of statement and negation require?', options: [
                { text: 'Apply both definitions cleanly: a statement is any sentence with a definite truth value — false sentences are still statements (this one is false because 2 is prime and even). And negating \'All A are B\' flips the quantifier: ~p is \'Some A are not B\' — the existence of one counterexample (2) — not the universal opposite \'All A are not B.\'', outcome: 'He gets the two pillars: truth-value determines statementhood, and negation of a universal is an existential — one counterexample, not a flipped universal.' },
                { text: 'Agree it\'s not a statement — statements are true claims by definition.', outcome: 'That confuses \'statement\' with \'true statement\': false declaratives have a truth value, so they qualify — falsity doesn\'t disqualify.', reveals: 'false-isnt-statement' },
                { text: 'Accept the negation — \'all primes even\' is the natural opposite of \'all primes odd\'.', outcome: 'The opposite of a universal isn\'t another universal: negation needs only one exception — \'some prime is not odd\' — which 2 supplies.', reveals: 'negate-all-as-all-not' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_14_008', title: 'You made it',
          caseStudy: { intro: 'Negate \'some are\' with \'none are\'; negate \'all are\' with \'some aren\'t\' — the quantifier flips before the predicate does.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_14_007', difficulty: 'standard',
          question: 'A quantifier is a logical symbol that specifies the quantity of elements in.',
          hint: 'If stuck, revisit c11_math_cbse_14_001 (identifying statements vs open sentences) and.',
          misconception: 'Students treat quantifiers as decorative symbols and ignore their order, writing ∀x∃y and ∃y∀x interchangeably.',
          parts: [
                { id: 'a', prompt: 'Compare the two statements: S₁: ∀x∈ℝ, ∃y∈ℝ, x + y = 0 S₂: ∃y∈ℝ, ∀x∈ℝ, x + y = 0 Are they logically equivalent?', answer: 'They are NOT equivalent',
                  options: ['They are NOT equivalent', 'for each x there\'s a (possibly different) y', 'there\'s one y that works for all x'],
                  hint: 'If stuck, revisit c11_math_cbse_14_001 (identifying statements vs open sentences) and.',
                  misconception: 'Students treat quantifiers as decorative symbols and ignore their order, writing ∀x∃y and ∃y∀x interchangeably.' }
          ],
            remediations: { 'students-treat-quantifiers-as-decorative': { steps: ['Make the student say aloud: "NOT (for ALL) means there EXISTS at least one that does NOT."', 'Use a concrete finite domain like {1,2,3} and predicate "is even".', 'Practice the quantifier flip rule with 5 examples daily until automatic: ¬∀x P(x) → ∃x ¬P(x); ¬∃x P(x) → ∀x ¬P(x).', 'For order confusion, use the "game" analogy: ∀x∃y means "You pick x first, then I pick y depending on your x" vs ∃y∀x.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_14_008', difficulty: 'standard',
          question: 'Applications of Mathematical Reasoning involve using logical.',
          hint: 'Revisit c11_math_cbse_14_005 (Contrapositive and Converse) and c11_math_cbse_14_006.',
          misconception: 'Students often treat "if p then q" as equivalent to "if q then p" (converse) or "if not p then not q" (inverse).',
          parts: [
                { id: 'a', prompt: 'Explain why proving the converse of a true implication does NOT prove the original implication.', answer: 'The implication p → q and its converse q → p are logically independent',
                  options: ['The implication p → q and its converse q → p are logically independent', 'proving converse suffices confuses necessary and sufficient conditions'],
                  hint: 'Revisit c11_math_cbse_14_005 (Contrapositive and Converse) and c11_math_cbse_14_006 (Validating.',
                  misconception: 'Students often treat "if p then q" as equivalent to "if q then p" (converse) or "if not p then not q" (inverse).' }
          ],
            remediations: { 'students-often-treat-if-p': { steps: ['Write the implication p → q and its converse q → p side by side.', 'Construct a truth table for both using a concrete example (e.g., p: "n is multiple of 4", q: "n is even").', 'Show that when p=F, q=T, the implication is true but converse is false.', 'Emphasise that only contrapositive (~q → ~p) is logically equivalent.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
