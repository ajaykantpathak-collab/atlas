import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch07 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch07: SimDef = {
    id: 'v3_c11_app_ch07',
    title: 'Math Logical Reasoning',
    subtitle: 'This node covers the definition and identification of mathematically acceptable.',
    classLevel: 11, subject: 'app', topic: 'Math Logical Reasoning',
    chapters: ['c11_app_ch07'],
    nodeIds: ['c11_app_cbse_07_001', 'c11_app_cbse_07_002', 'c11_app_cbse_07_003', 'c11_app_cbse_07_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'You\'re scrolling through a WhatsApp forward claiming "All prime numbers are odd." Before you hit forward, you.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student claims: "The sentence \'x² - 5x + 6 = 0\' is a statement because it is either true or false for any given x." Explain why this reasoning is incorrect.',
        options: ['The sentence \'x² - 5x + 6 = 0\' is an **open sentence**, not a statement', 'it becomes true or false once x is given', 'it *is* true or false right now'],
        answer: 'The sentence \'x² - 5x + 6 = 0\' is an **open sentence**, not a statement',
        hook: 'Students often believe that **any sentence with "is" or "equals" is a statement**, especially algebraic equations like.',
    },
    teaching: [
        { title: 'Math Logical Reasoning', text: 'A mathematically acceptable statement is a declarative sentence that is either definitively true or definitively false, but not both simultaneously.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_app_cbse_07_001', title: 'Math Logical Reasoning',
          caseStudy: { intro: 'You\'re scrolling through a WhatsApp forward claiming "All prime numbers are odd." Before you hit forward, you pause: is this a claim we can definitively label.',
            decisions: [{ prompt: 'Which of the following is a mathematically acceptable statement?', options: [
                { text: '(b) "The square root of 16 is 4." is the only mathematically acceptable statement', outcome: '(b) "The square root of 16 is 4." is the only mathematically acceptable statement because it is.' },
                { text: 'equals', outcome: 'Not quite — Students often believe that **any sentence with "is" or "equals" is a statement**, especially.', reveals: 'any-sentence-with-is-or' },
                { text: '2x + 3 = 7', outcome: 'Not quite — Students often believe that **any sentence with "is" or "equals" is a statement**, especially.', reveals: 'any-sentence-with-is-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_07_002', title: 'Quantifiers set the scope of a.',
          caseStudy: { intro: '1. Find the scope word first — \'all\', \'every\', \'none\' (universal) or \'some\', \'there exists\', \'at least one\' (existential). 2.',
            decisions: [{ prompt: '\'All squares are rectangles, but all rectangles are not squares\' — analyse.', options: [
                { text: 'Both halves correct', outcome: 'Both halves correct — ∀-square→rectangle is true (every square has 4 right angles).' },
                { text: 'one true example proves an \'all\' statement', outcome: 'Not quite — Students think one true example proves an \'all\' statement — \'3 is odd and prime, so all primes are.', reveals: 'one-true-example-proves-an' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_07_002', title: 'Quantifiers set the scope of a.',
          caseStudy: { intro: '1. Find the scope word first — \'all\', \'every\', \'none\' (universal) or \'some\', \'there exists\', \'at least one\' (existential). 2.',
            decisions: [{ prompt: '\'All squares are rectangles, but all rectangles are not squares\' — analyse.', options: [
                { text: 'Both halves correct', outcome: 'Both halves correct — ∀-square→rectangle is true (every square has 4 right angles).' },
                { text: 'one true example proves an \'all\' statement', outcome: 'Not quite — Students think one true example proves an \'all\' statement — \'3 is odd and prime, so all primes are.', reveals: 'one-true-example-proves-an' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_app_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Math Logical Reasoning', spots: [
            { id: 's1', label: 'Math Logical Reasoning', prompt: 'Which idea is this? — A mathematically acceptable statement is a declarative sentence that is either.', answer: 'Math Logical Reasoning', options: ['Math Logical Reasoning', 'Quantifiers set the scope of', 'Negation p is the denial', 'An implication p q'] },
            { id: 's2', label: 'Quantifiers set the scope of', prompt: 'Which idea is this? — Quantifiers set the scope of a mathematical statement: the universal quantifier \'for.', answer: 'Quantifiers set the scope of', options: ['Quantifiers set the scope of', 'Math Logical Reasoning', 'Negation p is the denial', 'An implication p q'] },
            { id: 's3', label: 'Negation p is the denial', prompt: 'Which idea is this? — Negation (~p) is the denial that makes a true statement false and a false one true.', answer: 'Negation p is the denial', options: ['Negation p is the denial', 'Math Logical Reasoning', 'Quantifiers set the scope of', 'An implication p q'] },
            { id: 's4', label: 'An implication p q', prompt: 'Which idea is this? — An implication p → q (\'if p then q\') asserts that whenever p holds, q must follow.', answer: 'An implication p q', options: ['An implication p q', 'Math Logical Reasoning', 'Quantifiers set the scope of', 'Negation p is the denial'] }
          ] } },
        { type: 'case', nodeId: 'c11_app_cbse_07_004', title: 'You made it',
          caseStudy: { intro: 'You finished Math Logical Reasoning — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_07_001', difficulty: 'standard',
          question: 'A mathematically acceptable statement is a declarative sentence that is either.',
          hint: 'If stuck, review the definition of "declarative sentence" and "open sentence (predicate)".',
          misconception: 'Students often believe that **any sentence with "is" or "equals" is a statement**, especially algebraic equations like.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The sentence \'x² - 5x + 6 = 0\' is a statement because it is either true or false for any given x." Explain why this reasoning is incorrect.', answer: 'The sentence \'x² - 5x + 6 = 0\' is an **open sentence**, not a statement',
                  options: ['The sentence \'x² - 5x + 6 = 0\' is an **open sentence**, not a statement', 'it becomes true or false once x is given', 'it *is* true or false right now', 'equals'],
                  hint: 'If stuck, review the definition of "declarative sentence" and "open sentence (predicate)" from.',
                  misconception: 'Students often believe that **any sentence with "is" or "equals" is a statement**, especially algebraic equations like "2x + 3 = 7" or "x².' }
          ],
            remediations: { 'any-sentence-with-is-or': { steps: ['Ask the student to evaluate "2x + 3 = 7" as true/false *right now*. They will hesitate.', 'Ask: "What would you need to know to decide?" They\'ll say "the value of x."', 'State the rule: *If you need extra information to assign true/false, it\'s not a statement.*', 'Contrast with "There exists a real number x such that 2x + 3 = 7" — now it\'s a statement (true).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **any sentence with "is" or "equals" is a statement**, especially algebraic equations like.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The negation of \'All integers are rational numbers\' is \'All integers are irrational numbers\'." Is the claim correct?', answer: 'The claim is **incorrect**',
                  options: ['The claim is **incorrect**', 'equals', '2x + 3 = 7', 'x² = 4'],
                  hint: 'If stuck, review the definition of "declarative sentence" and "open sentence (predicate)" from.',
                  misconception: 'Students often believe that **any sentence with "is" or "equals" is a statement**, especially algebraic equations like "2x + 3 = 7" or "x².' },
                { id: 'b', prompt: 'Create an original example of a sentence that *looks* like a statement but is NOT a mathematical statement, and explain exactly which criterion it fails.', answer: 'Example: "This sentence is false." Explanation',
                  options: ['Example: "This sentence is false." Explanation', 'equals', '2x + 3 = 7', 'x² = 4'],
                  hint: 'If stuck, review the definition of "declarative sentence" and "open sentence (predicate)" from.',
                  misconception: 'Students often believe that **any sentence with "is" or "equals" is a statement**, especially algebraic equations like "2x + 3 = 7" or "x².' }
          ],
            remediations: { 'any-sentence-with-is-or': { steps: ['Ask the student to evaluate "2x + 3 = 7" as true/false *right now*. They will hesitate.', 'Ask: "What would you need to know to decide?" They\'ll say "the value of x."', 'State the rule: *If you need extra information to assign true/false, it\'s not a statement.*', 'Contrast with "There exists a real number x such that 2x + 3 = 7" — now it\'s a statement (true).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_07_002', difficulty: 'standard',
          question: 'Quantifiers set the scope of a mathematical statement: the universal quantifier.',
          hint: 'Work step by step.',
          misconception: 'Students think one true example proves an \'all\' statement — \'3 is odd and prime, so all primes are odd\'.',
          parts: [
                { id: 'a', prompt: '\'All squares are rectangles, but all rectangles are not squares\' — analyse.', answer: 'Both halves correct',
                  options: ['Both halves correct', 'one true example proves an \'all\' statement'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think one true example proves an \'all\' statement — \'3 is odd and prime, so all primes are odd\'.' },
                { id: 'b', prompt: 'To disprove \'All prime numbers are odd\', what is enough?', answer: 'One counterexample',
                  options: ['One counterexample', 'one true example proves an \'all\' statement'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think one true example proves an \'all\' statement — \'3 is odd and prime, so all primes are odd\'.' },
                { id: 'c', prompt: 'To prove \'There exists an even prime\', what is enough?', answer: 'One example — the number 2 — existential claims need just one witness',
                  options: ['One example — the number 2 — existential claims need just one witness', 'one true example proves an \'all\' statement'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think one true example proves an \'all\' statement — \'3 is odd and prime, so all primes are odd\'.' },
                { id: 'd', prompt: 'Why does a single counterexample kill a ∀ statement but a single example can\'t prove one?', answer: '∀ claims EVERY member',
                  options: ['∀ claims EVERY member', 'one true example proves an \'all\' statement'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think one true example proves an \'all\' statement — \'3 is odd and prime, so all primes are odd\'.' }
          ],
            remediations: { 'one-true-example-proves-an': { steps: ['Label the quantifier first.', '∀ → hunt a counterexample (one breaks it) or build a general argument.', '∃ → find one witness or show none can exist.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_07_003', difficulty: 'standard',
          question: 'Negation (~p) is the denial that makes a true statement false and a false one.',
          hint: 'Work step by step.',
          misconception: 'Students negate by inserting \'not\' anywhere or flipping to the opposite extreme — \'all are\' → \'all are not\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Negation (~p) is the denial that makes a true statement false and a false one true:',
                  options: ['Negation (~p) is the denial that makes a true statement false and a false one true:', 'A mathematically acceptable statement is a declarative sentence that is either', 'Quantifiers set the scope of a mathematical statement: the universal quantifier \'for', 'An implication p → q (\'if p then q\') asserts that whenever p holds, q must follow'],
                  hint: 'Recall the definition.',
                  misconception: 'Students negate by inserting \'not\' anywhere or flipping to the opposite extreme — \'all are\' → \'all are not\'.' }
          ],
            remediations: { 'students-negate-by-inserting-not': { steps: ['Swap the quantifier first (all ↔ exists), then negate the predicate.', 'For compounds, De Morgan\'s law: distribute the \'not\' and swap and/or.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_07_004', difficulty: 'standard',
          question: 'An implication p → q (\'if p then q\') asserts that whenever p holds, q must.',
          hint: 'Work step by step.',
          misconception: 'Students swap the arrow freely — \'p → q, so q → p\' — confusing an implication with its converse.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An implication p → q (\'if p then q\') asserts that whenever p holds, q must follow',
                  options: ['An implication p → q (\'if p then q\') asserts that whenever p holds, q must follow', 'A mathematically acceptable statement is a declarative sentence that is either', 'Quantifiers set the scope of a mathematical statement: the universal quantifier \'for', 'Negation (~p) is the denial that makes a true statement false and a false one true:'],
                  hint: 'Recall the definition.',
                  misconception: 'Students swap the arrow freely — \'p → q, so q → p\' — confusing an implication with its converse.' }
          ],
            remediations: { 'students-swap-the-arrow-freely': { steps: ['Write p and q explicitly, then build the three relatives systematically: contrapositive (flip both + negate both).', 'Test each with a counterexample hunt.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
