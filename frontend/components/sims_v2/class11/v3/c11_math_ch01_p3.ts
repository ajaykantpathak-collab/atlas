import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch01_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch01_p3: SimDef = {
    id: 'v3_c11_math_ch01_p3',
    title: 'Sets · Part 3/3',
    subtitle: 'Learn why \'well-defined\' is the whole definition — and why {0} is never empty.',
    classLevel: 11, subject: 'mathematics', topic: 'Sets · Part 3/3',
    chapters: ['c11_math_ch01'],
    nodeIds: ['c11_math_cbse_01_013', 'c11_math_cbse_01_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a set-builder separating the countable from the uncountable', intro: '\'Students above 90%\' is a set; \'talented students\' is not — the difference is whether membership can be decided at all.', goal: 'Apply the well-defined criterion, distinct elements, and the empty/finite/infinite classification.' },
    discovery: {
        question: 'Is the collection of \'all tall students\' a set? Think carefully.',
        options: ['No — \'tall\' is not well-defined, so membership is ambiguous', 'Yes — any collection is a set', 'Yes — if the students agree', 'Only if you measure them first'],
        answer: 'No — \'tall\' is not well-defined, so membership is ambiguous',
        hook: 'Sets demand one ruthless rule: you must always be able to say yes or no. Vagueness is not allowed in.',
    },
    teaching: [
        { title: 'De Morgan\'s Laws: Statement and Proof', text: 'De Morgan\'s Laws state that for any two subsets A and B of a universal set U: (i) The complement of the union of A and B equals the intersection of their complements: (A ∪ B)\' = A\' ∩ B\'.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_01_013', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Classify {x² ≤ 4 over ℤ}, {x² = −1 over ℝ} and {multiples of 7} into empty, finite or infinite — then flip between roster and set-builder fluently.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_013', title: 'De Morgan\'s Laws: Statement and Proof',
          scaffold: { problem: 'In a survey of 200 Class 11 students in a Delhi school, 120 students use Instagram (set I), 90 use WhatsApp (set W), and 40 use both.',
            steps: [
            { text: 'Identify given: n(U) = 200, n(I) = 120, n(W) = 90, n(I ∩ W) = 40. We want n((I ∪ W)\') — students using neither.' },
            { text: 'Apply De Morgan\'s first law: (I ∪ W)\' = I\' ∩ W\'. So n((I ∪ W)\') = n(I\' ∩ W\').' },
            { text: 'Compute n(I ∪ W) using inclusion-exclusion: n(I ∪ W) = n(I) + n(W) - n(I ∩ W) = 120 + 90 - 40 = 170.' },
            { text: 'Then n((I ∪ W)\') = n(U) - n(I ∪ W) = 200 - 170 = 30. This is the direct answer.' },
            { text: 'Now verify via De Morgan\'s law using complements: n(I\') = 200 - 120 = 80, n(W\') = 200 - 90 = 110.' },
            { text: 'We need n(I\' ∩ W\'). Note that I\' ∩ W\' = (I ∪ W)\' so n(I\' ∩ W\') = 30.', faded: true, blankAnswer: '30 students use neither Instagram nor WhatsApp.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_014', title: 'Word Problems: Applications of Set Operations',
          scaffold: { problem: 'In a survey of 500 families in a Mumbai apartment complex, 220 read The Times of India, 180 read The Hindu, 150 read Hindustan Times.',
            steps: [
            { text: 'Identify the universal set U = all 500 families. Define sets: T = Times of India readers, H = Hindu readers,.' },
            { text: 'Draw a three-circle Venn diagram. Fill the centre region (all three) with 30.' },
            { text: 'Compute pairwise-only regions: T∩H only = 80-30=50; H∩S only = 60-30=30; T∩S only = 50-30=20.' },
            { text: 'Compute single-only regions: Only T = 220 - (50+20+30) = 120; Only H = 180 - (50+30+30) = 70; Only S = 150 - (30+20+30).' },
            { text: '(i) At least one = sum of all 7 regions = 120+70+70+50+30+20+30 = 390.' },
            { text: '(ii) Exactly one = only T + only H + only S = 120+70+70 = 260.' },
            { text: '(iii) None = n(U) - n(T∪H∪S) = 500 - 390 = 110.' },
            { text: 'Verify: Sum of all 8 regions (7 inside + none) = 390 + 110 = 500 = n(U). Consistent.', faded: true, blankAnswer: '(i) 390 families, (ii) 260 families, (iii) 110 families.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_01_014', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'As class representative you must compile \'the set of talented students\' for a honours list. A teammate writes {Ravi, Ravi, Meena} arguing order and repetition matter, and for the empty set writes {0} \'since it has zero elements.\'',
            decisions: [{ prompt: 'What does \'set\' demand that this list violates?', options: [
                { text: 'Fix the definition three ways: \'talented\' isn\'t well-defined — a set needs an objective yes/no membership test (e.g., \'scored above 90%\'), not subjective judgement. Repetition and order are noise: {Ravi, Ravi, Meena} = {Ravi, Meena}. And the empty set is φ or { } — {0} is a singleton containing zero, and {φ} is a singleton containing the empty set.', outcome: 'The list becomes a set: a precise defining property, distinct elements, order irrelevant — and \'no members\' written as φ, not {0}.' },
                { text: 'Keep \'talented students\' — everyone knows roughly who\'s talented.', outcome: '\'Roughly\' isn\'t membership: without a definitive yes/no criterion, it\'s a vague collection, not a set — the well-defined test is the entry ticket.', reveals: 'subjective-collections-are-sets' },
                { text: 'Accept {0} as the empty set — it literally contains \'zero\'.', outcome: 'That confuses the symbol with the count: {0} has ONE element (the number 0); the empty set has none, written φ or { }.', reveals: 'set-of-zero-is-empty' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_01_014', title: 'You made it',
          caseStudy: { intro: 'Well-defined, ordered, unioned, intersected — you now speak the language all of modern math is written in.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_01_013', difficulty: 'standard',
          question: 'De Morgan\'s Laws state that for any two subsets A and B of a universal set.',
          hint: 'Revisit complement of a set (c11_math_cbse_01_012) and practice writing "x ∉ A ∪ B" as "x.',
          misconception: 'Students write (A ∪ B)\' = A\' ∪ B\' instead of A\' ∩ B\', and (A ∩ B)\' = A\' ∩ B\' instead of A\' ∪ B\'.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why (A ∪ B)\' = A\' ∩ B\' is true, using the logical meaning of "or" and "and".', answer: 'An element x belongs to (A ∪ B)\' means x is NOT in A ∪ B',
                  options: ['An element x belongs to (A ∪ B)\' means x is NOT in A ∪ B', 'x is not in A or not in B', '¬(P ∨ Q) = ¬P ∨ ¬Q instead of the correct ¬P ∧ ¬Q'],
                  hint: 'Revisit complement of a set (c11_math_cbse_01_012) and practice writing "x ∉ A ∪ B" as "x ∉ A and.',
                  misconception: 'Students write (A ∪ B)\' = A\' ∪ B\' instead of A\' ∩ B\', and (A ∩ B)\' = A\' ∩ B\' instead of A\' ∪ B\'.' }
          ],
            remediations: { 'students-write-a-b-a': { steps: ['Have the student write the logical statement: "x ∈ (A ∪ B)\' means x ∉ A ∪ B".', 'Ask "What does x ∉ A ∪ B mean in terms of A and B separately?" Guide them to: "x is not in A AND x is not in B".', 'Translate: "x ∉ A means x ∈ A\'" and "x ∉ B means x ∈ B\'".', 'Combine: "x ∈ A\' AND x ∈ B\' means x ∈ A\' ∩ B\'".'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write (A ∪ B)\' = A\' ∪ B\' instead of A\' ∩ B\', and (A ∩ B)\' = A\' ∩ B\' instead of A\' ∪ B\'.',
          parts: [
                { id: 'a', prompt: 'A student proves (A ∩ B)\' = A\' ∪ B\' as follows: "Let x ∈ (A ∩ B)\'. Then x ∉ A ∩ B. So x ∉ A or x ∉ B.', answer: 'The proof is INCOMPLETE',
                  options: ['The proof is INCOMPLETE', 'the proof is correct'],
                  hint: 'Revisit complement of a set (c11_math_cbse_01_012) and practice writing "x ∉ A ∪ B" as "x ∉ A and.',
                  misconception: 'Students write (A ∪ B)\' = A\' ∪ B\' instead of A\' ∩ B\', and (A ∩ B)\' = A\' ∩ B\' instead of A\' ∪ B\'.' }
          ],
            remediations: { 'students-write-a-b-a': { steps: ['Have the student write the logical statement: "x ∈ (A ∪ B)\' means x ∉ A ∪ B".', 'Ask "What does x ∉ A ∪ B mean in terms of A and B separately?" Guide them to: "x is not in A AND x is not in B".', 'Translate: "x ∉ A means x ∈ A\'" and "x ∉ B means x ∈ B\'".', 'Combine: "x ∈ A\' AND x ∈ B\' means x ∈ A\' ∩ B\'".'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_014', difficulty: 'standard',
          question: 'Word problems on set operations involve translating real-world scenarios.',
          hint: 'Review the Venn diagram region-filling technique from c11_math_cbse_01_008 and the.',
          misconception: 'Students often treat "A or B" in word problems as exclusive or (either A or B but not both) instead of inclusive or (A.',
          parts: [
                { id: 'a', prompt: 'A class has 50 students. 30 play Cricket, 25 play Football, 15 play Hockey.', answer: 'Step 1: Draw Venn diagram, fill centre = 3',
                  options: ['Step 1: Draw Venn diagram, fill centre = 3', 'exactly two'],
                  hint: 'Review the Venn diagram region-filling technique from c11_math_cbse_01_008 and the cardinality.',
                  misconception: 'Students often treat "A or B" in word problems as exclusive or (either A or B but not both) instead of inclusive or (A ∪ B).' },
                { id: 'b', prompt: 'Compare the two statements: (i) "Students who study Math or Physics" and (ii) "Students who study Math or Physics but not both".', answer: '(i) \\(M \\cup P\\), cardinality \\(n(M) + n(P) - n(M \\cap P)\\)',
                  options: ['(i) \\(M \\cup P\\), cardinality \\(n(M) + n(P) - n(M \\cap P)\\)', '(union) with exclusive'],
                  hint: 'Review the Venn diagram region-filling technique from c11_math_cbse_01_008 and the cardinality.',
                  misconception: 'Students often treat "A or B" in word problems as exclusive or (either A or B but not both) instead of inclusive or (A ∪ B).' }
          ],
            remediations: { 'students-often-treat-a-or': { steps: ['If a student makes the exclusive-or error: 1) Ask them to list the elements of {1,2,3} ∪ {3,4,5} and confirm 3.', '2) Show that "or" in mathematics means "at least one of".', '3) Have them re-read the problem and identify if "but not both" is stated; if not, use inclusive union.', 'For the triple-intersection error: 1) Draw a 3-circle Venn diagram and label the centre region as \\(x = n(A \\cap B \\cap.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
