import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch03_p2: SimDef = {
    id: 'v3_c11_app_ch03_p2',
    title: 'Sets · Part 2/2',
    subtitle: 'This node covers the definition, notation (U), context-dependence, and the superset.',
    classLevel: 11, subject: 'app', topic: 'Sets · Part 2/2',
    chapters: ['c11_app_ch03'],
    nodeIds: ['c11_app_cbse_03_007', 'c11_app_cbse_03_008', 'c11_app_cbse_03_009', 'c11_app_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: *"If I say \'All students who scored above 90%\', what is the \'Universe\' I am picking from?"*.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Write the interval notation for the set **{x : x ∈ R, -5 ≤ x < 3}** and state whether the endpoints -5 and 3 are included or excluded.',
        options: ['**Answer: [-5, 3)', 'include', 'Endpoint Symmetry'],
        answer: '**Answer: [-5, 3)',
        hook: '**The "Endpoint Symmetry" Fallacy:** Students assume that if an interval includes one endpoint, it must include the.',
    },
    teaching: [
        { title: 'Universal Set', text: 'A **Universal Set** (denoted by **U**) is the set that contains all the objects or elements under consideration in a particular context or discussion; every other set in that context is a subset of U.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_app_cbse_03_007', title: 'Universal Set',
          caseStudy: { intro: 'Start by asking: *"If I say \'All students who scored above 90%\', what is the \'Universe\' I am picking from?"* The answer is not "everyone in the world" — it\'s.',
            decisions: [{ prompt: 'State the definition of a Universal Set and its standard notation.', options: [
                { text: 'A Universal Set (U) is the set containing all elements under consideration in a specific', outcome: 'A Universal Set (U) is the set containing all elements under consideration in a specific context.' },
                { text: 'U is always R', outcome: 'Not quite — **Misconception:** "The Universal Set is always the set of Real Numbers (R) or Natural Numbers.', reveals: 'misconception-the-universal-set-is' },
                { text: 'U is always infinite', outcome: 'Not quite — **Misconception:** "The Universal Set is always the set of Real Numbers (R) or Natural Numbers.', reveals: 'misconception-the-universal-set-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_03_008', title: 'Intervals as Subset of the set of Real Numbers R',
          scaffold: { problem: 'A chemical reaction requires the temperature **T** (in °C) to satisfy **-10 ≤ T < 50** for optimal yield.',
            steps: [
            { text: 'Identify the variable (T), the lower bound (-10), the upper bound (50), and the inequality types (≤ at lower, <.' },
            { text: 'Map inequalities to brackets: ≤ → square bracket [ ], < → round bracket ( ). Since -10 is included, use [ at left.' },
            { text: 'Write set-builder form directly from inequalities: **{T : T ∈ R, -10 ≤ T < 50}**.' },
            { text: 'Draw number line. Mark -10 and 50. Place **filled circle** at -10 (included), **open circle** at 50 (excluded).' },
            { text: 'Compute length: b - a = 50 - (-10) = **60°C**. Verify: the range spans 60 degrees, from -10 up to but not including 50.', faded: true, blankAnswer: '(i) [-10, 50) (ii) {T : T ∈ R, -10 ≤ T < 50} (iii) Number.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_03_009', title: 'Types of Intervals',
          scaffold: { problem: 'The Delhi Metro Blue Line operates from 5:30 AM to 11:30 PM. Let $t$ represent the time in hours on a 24-hour clock (e.g., 5:30 AM = 5.5.',
            steps: [
            { text: 'Identify the endpoints from the real-world context. Start time = 5:30 AM = 5.5 hours. End time = 11:30 PM = 23.5 hours.' },
            { text: 'Determine inclusion/exclusion. The metro operates *at* 5:30 AM (first train departs) and *at* 11:30 PM (last train.' },
            { text: 'Write the interval notation. Since both endpoints are included, use square brackets: $[5.5, 23.5]$.' },
            { text: 'Write the set-builder notation. Translate inclusion to $\\le$: $\\{t : t \\in \\mathbb{R}, 5.5 \\le t \\le 23.5\\}$.' },
            { text: 'Graphical representation. Draw a number line. Mark 5.5 and 23.5.' },
            { text: 'Calculate length. Length $= b - a = 23.5 - 5.5 = 18$ hours.', faded: true, blankAnswer: '(i) $[5.5, 23.5]$ (ii) $\\{t : t \\in \\mathbb{R}, 5.5 \\le.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_03_010', title: 'Venn Diagrams',
          caseStudy: { intro: 'Think about organizing your Class 11 timetable: you have "Science Stream" students and "Commerce Stream" students.',
            decisions: [{ prompt: 'Define the term "Universal Set" in the context of a Venn diagram and state how it is represented geometrically.', options: [
                { text: 'The Universal Set ($U$) is the set containing all objects or elements under consideration', outcome: 'The Universal Set ($U$) is the set containing all objects or elements under consideration in.' },
                { text: 'Universal Set is the union of all subsets', outcome: 'Not quite — **The "Empty Center = Disjoint Circles" Error:** Students see $A \\cap B \\cap C = \\phi$ (or "no one.', reveals: 'the-empty-center-disjoint-circles' },
                { text: 'represented by a large circle', outcome: 'Not quite — **The "Empty Center = Disjoint Circles" Error:** Students see $A \\cap B \\cap C = \\phi$ (or "no one.', reveals: 'the-empty-center-disjoint-circles' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'You finished Sets — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_03_007', difficulty: 'standard',
          question: 'A **Universal Set** (denoted by **U**) is the set that contains all the objects.',
          hint: 'If stuck, review the definition of subset (c11_app_cbse_03_005) and practice checking.',
          misconception: '**Misconception:** "The Universal Set is always the set of Real Numbers (R) or Natural Numbers (N)." **Why.',
          parts: [
                { id: 'a', prompt: 'Let A = {x : x is a prime number less than 10} and B = {x : x is an even number less than 10}. Propose **two different** valid Universal Sets for A and B.', answer: 'A = {2, 3, 5, 7}, B = {2, 4, 6, 8}, so A ∪ B = {2, 3, 4, 5, 6, 7, 8}',
                  options: ['A = {2, 3, 5, 7}, B = {2, 4, 6, 8}, so A ∪ B = {2, 3, 4, 5, 6, 7, 8}', 'U must equal the union, missing that U can be larger'],
                  hint: 'If stuck, review the definition of subset (c11_app_cbse_03_005) and practice checking whether Set.',
                  misconception: '**Misconception:** "The Universal Set is always the set of Real Numbers (R) or Natural Numbers (N)." **Why it happens:** Students see N ⊆.' }
          ],
            remediations: { 'misconception-the-universal-set-is': { steps: ['**Re-anchor with context:** Ask the student: "If the problem is about \'months of the year\', what is the biggest.', '**Contrast with Union:** Write A = {1,2}, B = {2,3}.', 'Ask: "Is A ∪ B = {1,2,3} the Universal Set?" Show that U = {1,2,3,4} also works — so U ≠ Union.', '**Practice "Identify U" drills:** Give 5 word problems (e.g., "outcomes of a die roll", "students in Class 11A", "prime.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "The Universal Set is always the set of Real Numbers (R) or Natural Numbers (N)." **Why.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If U = {1, 2, 3, 4, 5} is the Universal Set, then the set of all even integers is a subset of U." Evaluate this claim.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'Yes, because 2 and 4 are in U'],
                  hint: 'If stuck, review the definition of subset (c11_app_cbse_03_005) and practice checking whether Set.',
                  misconception: '**Misconception:** "The Universal Set is always the set of Real Numbers (R) or Natural Numbers (N)." **Why it happens:** Students see N ⊆.' }
          ],
            remediations: { 'misconception-the-universal-set-is': { steps: ['**Re-anchor with context:** Ask the student: "If the problem is about \'months of the year\', what is the biggest.', '**Contrast with Union:** Write A = {1,2}, B = {2,3}.', 'Ask: "Is A ∪ B = {1,2,3} the Universal Set?" Show that U = {1,2,3,4} also works — so U ≠ Union.', '**Practice "Identify U" drills:** Give 5 word problems (e.g., "outcomes of a die roll", "students in Class 11A", "prime.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_03_008', difficulty: 'standard',
          question: 'An interval is a subset of the set of real numbers **R** consisting of all real.',
          hint: 'If stuck, review **set-builder notation** (c11_app_cbse_03_003) and **subset definition**.',
          misconception: '**The "Endpoint Symmetry" Fallacy:** Students assume that if an interval includes one endpoint, it must include the.',
          parts: [
                { id: 'a', prompt: 'Write the interval notation for the set **{x : x ∈ R, -5 ≤ x < 3}** and state whether the endpoints -5 and 3 are included or excluded.', answer: '**Answer: [-5, 3)',
                  options: ['**Answer: [-5, 3)', 'include', 'Endpoint Symmetry', 'if an interval includes one endpoint, it must include the other (i'],
                  hint: 'If stuck, review **set-builder notation** (c11_app_cbse_03_003) and **subset definition**.',
                  misconception: '**The "Endpoint Symmetry" Fallacy:** Students assume that if an interval includes one endpoint, it must include the other (i.e., only **[a.' },
                { id: 'b', prompt: 'The interval **(2, 7]** is given. A student claims: "The number 2 belongs to this interval because it\'s the starting point." Is the student correct?', answer: '**Answer: The student is incorrect',
                  options: ['**Answer: The student is incorrect', 'Yes, 2 is included', 'starting point', 'Endpoint Symmetry'],
                  hint: 'If stuck, review **set-builder notation** (c11_app_cbse_03_003) and **subset definition**.',
                  misconception: '**The "Endpoint Symmetry" Fallacy:** Students assume that if an interval includes one endpoint, it must include the other (i.e., only **[a.' },
                { id: 'c', prompt: 'Convert the interval **[-4, ∞)** into set-builder notation and sketch its graphical representation on a number line. What is the length of this interval?', answer: '**Answer: Set-builder: {x : x ∈ R, x ≥ -4}',
                  options: ['**Answer: Set-builder: {x : x ∈ R, x ≥ -4}', 'Endpoint Symmetry', 'if an interval includes one endpoint, it must include the other (i'],
                  hint: 'If stuck, review **set-builder notation** (c11_app_cbse_03_003) and **subset definition**.',
                  misconception: '**The "Endpoint Symmetry" Fallacy:** Students assume that if an interval includes one endpoint, it must include the other (i.e., only **[a.' },
                { id: 'd', prompt: 'Consider the intervals **A = [1, 5)** and **B = (1, 5]**. Are A and B equal sets?', answer: '**Answer: A ≠ B',
                  options: ['**Answer: A ≠ B', 'Yes, they are equal', 'Endpoint Symmetry', 'if an interval includes one endpoint, it must include the other (i'],
                  hint: 'If stuck, review **set-builder notation** (c11_app_cbse_03_003) and **subset definition**.',
                  misconception: '**The "Endpoint Symmetry" Fallacy:** Students assume that if an interval includes one endpoint, it must include the other (i.e., only **[a.' }
          ],
            remediations: { 'the-endpoint-symmetry-fallacy-students': { steps: ['**Concrete Number Line Drill:** Draw a large number line on paper.', 'Is 1 in **(1, 5]**?" Force the student to point to the bracket symbol and say aloud: "Square bracket at 1 means include.', 'Round bracket at 1 means exclude → 1 is out." 2.', '**Inequality Translation Practice:** Give 5 mixed intervals (e.g., **[-2, 3), (0, 4], [-1, 1), (2, 5]**).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_03_009', difficulty: 'standard',
          question: 'An interval is a subset of the set of real numbers $\\mathbb{R}$ consisting.',
          hint: 'If stuck, review solving linear and absolute value inequalities (Class 11 Algebra/NCERT.',
          misconception: 'Students consistently believe that **round brackets `( )` mean "including the endpoint" because parentheses "hug" the.',
          parts: [
                { id: 'a', prompt: 'Compare the intervals $I_1 = (0, 1)$ and $I_2 = [0, 1]$. Are they equal sets? Justify your answer by identifying a specific element that distinguishes them.', answer: 'No, they are not equal',
                  options: ['No, they are not equal', 'both have infinite elements between 0 and 1'],
                  hint: 'If stuck, review solving linear and absolute value inequalities (Class 11 Algebra/NCERT Ch.',
                  misconception: 'Students consistently believe that **round brackets `( )` mean "including the endpoint" because parentheses "hug" the number**, while.' }
          ],
            remediations: { 'students-consistently-believe-that-round': { steps: ['**Anchor with a physical gesture**: Hold up your hand with fingers together — "This is a square bracket `[ ]`, a solid.', 'The number *hits* the wall and stays *inside*." Then make a circle with thumb/index finger — "This is a round bracket.', 'The number *passes through* the hoop and stays *outside*." 2.', '**Drill the translation table**: Make a 3-column cheat sheet: Inequality ($\\le$ / $<$) $\\leftrightarrow$ Bracket (`[`.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_03_010', difficulty: 'standard',
          question: 'A Venn diagram is a pictorial representation of the relationships between sets.',
          hint: 'Review "Subsets" (c11_app_cbse_03_005) for containment logic and "Universal Set".',
          misconception: '**The "Empty Center = Disjoint Circles" Error:** Students see $A \\cap B \\cap C = \\phi$ (or "no one likes all three").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Venn diagram is a pictorial representation of the relationships between sets, where the',
                  options: ['A Venn diagram is a pictorial representation of the relationships between sets, where the', 'A set is a well-defined collection of distinct objects where the criterion for membership', 'A set is a well-defined collection of distinct objects where the term "well-defined"', 'A set can be represented in two standard ways: (1) **Roster (Tabular) Form**, where all'],
                  hint: 'Review "Subsets" (c11_app_cbse_03_005) for containment logic and "Universal Set".',
                  misconception: '**The "Empty Center = Disjoint Circles" Error:** Students see $A \\cap B \\cap C = \\phi$ (or "no one likes all three") and draw three.' }
          ],
            remediations: { 'the-empty-center-disjoint-circles': { steps: ['**Concrete Manipulative:** Give the student 3 transparent colored sheets (Red, Blue, Yellow).', 'Overlap Red+Blue (makes Purple lens), Blue+Yellow (Green lens), Red+Yellow (Orange lens).', 'Overlap all three (Brown center).', '**Peel off the center Brown piece only.** Ask: "Are the Purple, Green, Orange lenses still there?" Yes.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
