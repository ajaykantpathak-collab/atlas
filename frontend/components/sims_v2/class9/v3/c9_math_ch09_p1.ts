import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch09_p1: SimDef = {
    id: 'v3_c9_math_ch09_p1',
    title: 'Introduction to Euclid\'s Geometry · Part 1/2',
    subtitle: 'This node covers Euclid\'s original definitions of point, line, and surface as presented.',
    classLevel: 9, subject: 'mathematics', topic: 'Introduction to Euclid\'s Geometry · Part 1/2',
    chapters: ['c9_math_ch09'],
    nodeIds: ['c9_math_ch9_1', 'c9_math_ch9_2', 'c9_math_ch9_3', 'c9_math_ch9_4', 'c9_math_ch9_5', 'c9_math_ch9_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Have you ever tried to draw a perfectly straight line on paper?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'State Euclid\'s definition of a point, a line, and a surface (plane) in your own words. Do not use the words "undefined" or "primitive" in your answer.',
        options: ['A point is that which has no part (no length, breadth, or thickness)', 'a point is a dot', 'a line is a straight mark'],
        answer: 'A point is that which has no part (no length, breadth, or thickness)',
        hook: 'Students treat Euclid\'s definitions as descriptions of drawings: they say "a point is a dot" and "a line is a straight.',
    },
    teaching: [
        { title: 'Euclid\'s Definitions: Point, Line, Surface', text: 'In Euclidean geometry, a **point** is an undefined term representing an exact location in space with zero dimensions (no length, width, or height).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch9_1', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c9_math_ch9_1', title: 'Euclid\'s Definitions: Point, Line, Surface',
          caseStudy: { intro: 'Have you ever tried to draw a perfectly straight line on paper?',
            decisions: [{ prompt: 'State Euclid\'s definition of a point, a line, and a surface (plane) in your own words.', options: [
                { text: 'A point is that which has no part (no length, breadth, or thickness)', outcome: 'A point is that which has no part (no length, breadth, or thickness). A line is breadthless length.' },
                { text: 'a point is a dot', outcome: 'Not quite — Students treat Euclid\'s definitions as descriptions of drawings: they say "a point is a dot" and "a.', reveals: 'students-treat-euclid-s-definitions' },
                { text: 'a line is a straight mark', outcome: 'Not quite — Students treat Euclid\'s definitions as descriptions of drawings: they say "a point is a dot" and "a.', reveals: 'students-treat-euclid-s-definitions' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch9_2', title: 'Euclid\'s Axioms (Common Notions)',
          caseStudy: { intro: 'Suppose you are designing a rangoli pattern using two identical square tiles of side 20 cm.',
            decisions: [{ prompt: 'State Euclid\'s Axiom 1 in your own words and give a geometric example using line segments where this axiom is used to conclude that two.', options: [
                { text: 'Correct answer: Axiom 1', outcome: 'Correct answer: Axiom 1 — "Things which are equal to the same thing are equal to one another.".' },
                { text: 'if equals are added to equals', outcome: 'Not quite — Students treat Euclid\'s axioms as algebraic rules for numbers (e.g., "if a = b then a + c = b + c").', reveals: 'students-treat-euclid-s-axioms' },
                { text: 'if equals are added to equals..." or giving a numerical example like 5 = 5', outcome: 'Not quite — Students treat Euclid\'s axioms as algebraic rules for numbers (e.g., "if a = b then a + c = b + c").', reveals: 'students-treat-euclid-s-axioms' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_math_ch9_3', title: 'Euclid\'s Five Postulates',
          scaffold: { problem: 'A railway engineer is designing a track crossing. Two straight tracks *m* and *n* are crossed by a connecting track *l* (transversal).',
            steps: [
            { text: 'Identify the given interior angles on the same side of transversal *l*: ∠1 = 75°, ∠2 = 65°.' },
            { text: 'Recall Euclid\'s Fifth Postulate: If a straight line falling on two straight lines makes the interior angles on the same.' },
            { text: 'Calculate the sum of the given angles: 75° + 65° = 140°.' },
            { text: 'Compare the sum to 180°: 140° < 180°, so the condition "less than two right angles" is satisfied.' },
            { text: 'Apply the postulate: Since the sum is less than 180°, tracks *m* and *n* will meet on the side of *l* where these.', faded: true, blankAnswer: 'Yes, tracks *m* and *n* will meet on the side.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch9_4', title: 'Equivalent Versions of the Fifth Postulate (Playfair)',
          scaffold: { problem: 'In a rectangular agricultural field ABCD in Punjab, the farmer wants to build an irrigation channel EF parallel to side AB, passing through.',
            steps: [
            { text: 'Identify the given elements — line AB (one side of the rectangle), point E on AD (not on AB).' },
            { text: 'Recall Playfair\'s Axiom: Through a point not on a given line, exactly one parallel line can be drawn.' },
            { text: 'Existence — Construct line EF through E such that ∠AEF = ∠EAB (alternate interior angles).' },
            { text: 'Uniqueness — Suppose another line EG through E is also parallel to AB.' },
            { text: 'Conclusion — The irrigation channel must be placed exactly along EF; no other position through E will be parallel.', faded: true, blankAnswer: 'The irrigation channel EF is uniquely determined as the.' }
            ] } },
        { type: 'case', nodeId: 'c9_math_ch9_5', title: 'Axioms vs Postulates vs Theorems',
          caseStudy: { intro: 'Imagine your Class 9 teacher draws a triangle on the board and claims, "The angles inside always add up to 180°." You ask, "How do you *know*?',
            decisions: [{ prompt: 'State Euclid\'s First Axiom ("Things which are equal to the same thing are equal to one another") and give one example where it is used.', options: [
                { text: '**Answer:** Euclid\'s First Axiom: If a = c and b = c, then a = b', outcome: '**Answer:** Euclid\'s First Axiom: If a = c and b = c, then a = b.' },
                { text: 'Theorems are just \'harder\' Postulates', outcome: 'Not quite — Students believe **"Theorems are just \'harder\' Postulates"** — i.e., that the difference.', reveals: 'theorems-are-just-harder-postulates' },
                { text: '**"Theorems are just \'harder\' Postulates"**', outcome: 'Not quite — Students believe **"Theorems are just \'harder\' Postulates"** — i.e., that the difference.', reveals: 'theorems-are-just-harder-postulates' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_math_ch9_6', title: 'Building Proofs from Axioms: First Steps',
          scaffold: { problem: 'In a field in Punjab, a farmer marks a straight irrigation channel AC. He places a stone at B between A and C.',
            steps: [
            { text: 'Identify given: B is between A and C; E is between D and F. AB = 12 m, BC = 8 m, DE = 12 m, EF = 8 m. (Given)' },
            { text: 'State segment addition: Since B is between A and C, AB + BC = AC. Since E is between D and F, DE + EF = DF.' },
            { text: 'Establish equalities of parts: AB = DE (both 12 m, given). BC = EF (both 8 m, given). (Given)' },
            { text: 'Apply Axiom 2: "If equals are added to equals, the wholes are equal." Here, AB and DE are equals; BC and EF are equals.' },
            { text: 'Conclude AC = DF. (From Step 2 and Step 4 by substitution)' },
            { text: 'Interpret: The two irrigation channels have equal total length (20 m). (Conclusion with units)', faded: true, blankAnswer: 'AC = DF = 20 m. Proved in 6 steps using Axiom 2.' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch9_6', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch9_6', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Introduction to Euclid\'s Geometry like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Introduction to Euclid\'s Geometry · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Euclid\'s Geometry · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch9_1', difficulty: 'standard',
          question: 'In Euclidean geometry, a **point** is an undefined term representing an exact.',
          hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and.',
          misconception: 'Students treat Euclid\'s definitions as descriptions of drawings: they say "a point is a dot" and "a line is a straight.',
          parts: [
                { id: 'a', prompt: 'State Euclid\'s definition of a point, a line, and a surface (plane) in your own words. Do not use the words "undefined" or "primitive" in your answer.', answer: 'A point is that which has no part (no length, breadth, or thickness)',
                  options: ['A point is that which has no part (no length, breadth, or thickness)', 'a point is a dot', 'a line is a straight mark'],
                  hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and practice.',
                  misconception: 'Students treat Euclid\'s definitions as descriptions of drawings: they say "a point is a dot" and "a line is a straight line drawn with.' },
                { id: 'b', prompt: 'Why did Euclid define a point as "that which has no part" instead of saying "a point is a location"? Explain the logical reason for this phrasing.', answer: '"That which has no part" emphasizes the *absence of magnitude*',
                  options: ['"That which has no part" emphasizes the *absence of magnitude*', 'both mean the same thing'],
                  hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and practice.',
                  misconception: 'Students treat Euclid\'s definitions as descriptions of drawings: they say "a point is a dot" and "a line is a straight line drawn with.' },
                { id: 'c', prompt: 'A student draws a 2 cm line segment on paper and labels it AB.', answer: 'Error 1: A line extends infinitely in both directions',
                  options: ['Error 1: A line extends infinitely in both directions', 'breadthless', 'no thickness', 'it\'s not infinite'],
                  hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and practice.',
                  misconception: 'Students treat Euclid\'s definitions as descriptions of drawings: they say "a point is a dot" and "a line is a straight line drawn with.' },
                { id: 'd', prompt: 'Compare Euclid\'s definition of a surface ("that which has length and breadth only") with the Class 6 definition of a plane figure.', answer: 'Class 6 treated plane figures as shapes drawn on paper (bounded, with area)',
                  options: ['Class 6 treated plane figures as shapes drawn on paper (bounded, with area)', 'both are flat'],
                  hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and practice.',
                  misconception: 'Students treat Euclid\'s definitions as descriptions of drawings: they say "a point is a dot" and "a line is a straight line drawn with.' }
          ],
            remediations: { 'students-treat-euclid-s-definitions': { steps: ['Ask the student to draw a point, then ask "How wide is your dot?" Measure it (e.g., 0.5 mm).', 'Say "Now imagine shrinking it to half the width, then half again, forever.', 'Repeat for line: draw a line, measure its width, then imagine the limit as width → 0 and length → ∞.', 'Have them write: "My drawing is a *model*; Euclid\'s definition is the *ideal* it approaches but never reaches."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch9_2', difficulty: 'standard',
          question: 'Euclid\'s Axioms (Common Notions) are self-evident truths about equality and.',
          hint: 'Revisit c6_math_ch07_083 (congruence of shapes) and c7_math_ch09_001 (congruent figures).',
          misconception: 'Students treat Euclid\'s axioms as algebraic rules for numbers (e.g., "if a = b then a + c = b + c") and apply them.',
          parts: [
                { id: 'a', prompt: 'State Euclid\'s Axiom 1 in your own words and give a geometric example using line segments where this axiom is used to conclude that two segments are equal.', answer: 'Correct answer: Axiom 1',
                  options: ['Correct answer: Axiom 1', 'if equals are added to equals', 'if equals are added to equals..." or giving a numerical example like 5 = 5'],
                  hint: 'Revisit c6_math_ch07_083 (congruence of shapes) and c7_math_ch09_001 (congruent figures) to rebuild.',
                  misconception: 'Students treat Euclid\'s axioms as algebraic rules for numbers (e.g., "if a = b then a + c = b + c") and apply them mechanically without.' },
                { id: 'b', prompt: 'In the figure, PQ = RS and RS = TU. A student writes: "Therefore PQ = TU by Axiom 2 (if equals are added to equals...)." Is the student correct?', answer: 'Correct answer: The student is incorrect',
                  options: ['Correct answer: The student is incorrect', 'equality rules'],
                  hint: 'Revisit c6_math_ch07_083 (congruence of shapes) and c7_math_ch09_001 (congruent figures) to rebuild.',
                  misconception: 'Students treat Euclid\'s axioms as algebraic rules for numbers (e.g., "if a = b then a + c = b + c") and apply them mechanically without.' }
          ],
            remediations: { 'students-treat-euclid-s-axioms': { steps: ['If a student makes this error, do not just re-state the axioms.', 'Instead, use a physical model: give two straws of length 5 cm (AB and CD) and two of length 3 cm (BC and DE).', 'Ask: "Is AB equal to BC?" (No — 5 ≠ 3).', '"But both equal CD?" No — CD is only one straw.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch9_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat Euclid\'s axioms as algebraic rules for numbers (e.g., "if a = b then a + c = b + c") and apply them.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Euclid\'s axioms are only about numbers. In geometry, we use postulates, not axioms." Evaluate this statement.', answer: 'Correct answer: The statement is false',
                  options: ['Correct answer: The statement is false', 'if AB = CD and CD = EF then AB = EF'],
                  hint: 'Revisit c6_math_ch07_083 (congruence of shapes) and c7_math_ch09_001 (congruent figures) to rebuild.',
                  misconception: 'Students treat Euclid\'s axioms as algebraic rules for numbers (e.g., "if a = b then a + c = b + c") and apply them mechanically without.' }
          ],
            remediations: { 'students-treat-euclid-s-axioms': { steps: ['If a student makes this error, do not just re-state the axioms.', 'Instead, use a physical model: give two straws of length 5 cm (AB and CD) and two of length 3 cm (BC and DE).', 'Ask: "Is AB equal to BC?" (No — 5 ≠ 3).', '"But both equal CD?" No — CD is only one straw.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch9_3', difficulty: 'standard',
          question: 'Euclid\'s Five Postulates are the foundational geometric assumptions specific.',
          hint: 'Revisit Class 7 Chapter 5 (Lines and Angles), specifically the nodes on transversals.',
          misconception: '**Specific error:** Students treat Postulate 5 as "If two lines are parallel, then interior angles sum to 180°" — i.e.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Euclid\'s Five Postulates are the foundational geometric assumptions specific to geometry',
                  options: ['Euclid\'s Five Postulates are the foundational geometric assumptions specific to geometry', 'In Euclidean geometry, a **point** is an undefined term representing an exact location in', 'Euclid\'s Axioms (Common Notions) are self-evident truths about equality and magnitude', 'Playfair\'s Axiom states: Given a line and a point not on that line, there exists exactly'],
                  hint: 'Revisit Class 7 Chapter 5 (Lines and Angles), specifically the nodes on transversals.',
                  misconception: '**Specific error:** Students treat Postulate 5 as "If two lines are parallel, then interior angles sum to 180°" — i.e., they reverse the.' }
          ],
            remediations: { 'specific-error-students-treat-postulate': { steps: ['**Step-by-step remediation:** 1.', 'Draw two lines *m*, *n* and a transversal *l*.', 'Label interior angles *α*, *β* on one side.', 'Ask: "What does Postulate 5 *actually* say?" → "If *α* + *β* < 180°, then *m* and *n* meet on this side." 3.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch9_4', difficulty: 'standard',
          question: 'Playfair\'s Axiom states: Given a line and a point not on that line, there.',
          hint: 'If stuck, revisit Class 7 "Alternate Angles Formed by a Transversal" (c7_math_ch05_008).',
          misconception: 'Students think "Playfair\'s Axiom and Euclid\'s Fifth Postulate are the same statement" and write them interchangeably.',
          parts: [
                { id: 'a', prompt: 'Given line l and point P not on l, you construct line m through P such that alternate interior angles with a transversal are equal.', answer: 'Step 1: Let l be the given line, P a point not on l',
                  options: ['Step 1: Let l be the given line, P a point not on l', 'exactly one', 'Playfair\'s Axiom and Euclid\'s Fifth Postulate are the same statement'],
                  hint: 'If stuck, revisit Class 7 "Alternate Angles Formed by a Transversal" (c7_math_ch05_008) and.',
                  misconception: 'Students think "Playfair\'s Axiom and Euclid\'s Fifth Postulate are the same statement" and write them interchangeably in proofs.' },
                { id: 'b', prompt: 'Compare the logical structure of proving "Playfair ⇒ Euclid\'s Fifth" versus "Euclid\'s Fifth ⇒ Playfair." Which direction uses the fact that the sum of angles.', answer: 'Proving "Euclid\'s Fifth ⇒ Playfair" uses the angle sum of a triangle (180°)',
                  options: ['Proving "Euclid\'s Fifth ⇒ Playfair" uses the angle sum of a triangle (180°)', 'they\'re equivalent', 'Playfair\'s Axiom and Euclid\'s Fifth Postulate are the same statement'],
                  hint: 'If stuck, revisit Class 7 "Alternate Angles Formed by a Transversal" (c7_math_ch05_008) and.',
                  misconception: 'Students think "Playfair\'s Axiom and Euclid\'s Fifth Postulate are the same statement" and write them interchangeably in proofs.' }
          ],
            remediations: { 'playfair-s-axiom-and-euclid': { steps: ['Ask the student to write both statements side by side.', 'Identify the primitive terms in each: Euclid uses "line," "angle," "meet"; Playfair uses "parallel" (a defined term).', 'Show the proof chain: Euclid\'s Fifth → Alternate Interior Angle Theorem → Playfair\'s Axiom → Triangle Angle Sum = 180°.', 'Give a fill-in-the-blank proof where they must cite the correct justification at each step: "∠1 = ∠2 (Alternate.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch9_5', difficulty: 'standard',
          question: 'An **Axiom** (Common Notion) is a self-evident truth assumed without proof that.',
          hint: 'Revisit c7_math_ch15_003 (Solving Linear Equations: Systematic Method) — trace how each.',
          misconception: 'Students believe **"Theorems are just \'harder\' Postulates"** — i.e., that the difference is difficulty or obviousness.',
          parts: [
                { id: 'a', prompt: 'State Euclid\'s First Axiom ("Things which are equal to the same thing are equal to one another") and give one example where it is used in *algebra* (not.', answer: '**Answer:** Euclid\'s First Axiom: If a = c and b = c, then a = b',
                  options: ['**Answer:** Euclid\'s First Axiom: If a = c and b = c, then a = b', 'Theorems are just \'harder\' Postulates', '**"Theorems are just \'harder\' Postulates"**'],
                  hint: 'Revisit c7_math_ch15_003 (Solving Linear Equations: Systematic Method) — trace how each algebraic.',
                  misconception: 'Students believe **"Theorems are just \'harder\' Postulates"** — i.e., that the difference is difficulty or obviousness.' },
                { id: 'b', prompt: 'Why is "A straight line can be drawn from any point to any other point" a **Postulate** and not an **Axiom**? Explain using the definition of each.', answer: '**Answer:** It is a Postulate',
                  options: ['**Answer:** It is a Postulate', 'Postulates are less obvious', 'Axioms are more basic', 'Theorems are just \'harder\' Postulates'],
                  hint: 'Revisit c7_math_ch15_003 (Solving Linear Equations: Systematic Method) — trace how each algebraic.',
                  misconception: 'Students believe **"Theorems are just \'harder\' Postulates"** — i.e., that the difference is difficulty or obviousness.' },
                { id: 'c', prompt: 'Classify each statement and justify your classification in one sentence: (a) "If equals are added to equals, the wholes are equal." (b) "All right angles are.', answer: '**Answer:** (a) **Axiom**',
                  options: ['**Answer:** (a) **Axiom**', 'Theorems are just \'harder\' Postulates', '**"Theorems are just \'harder\' Postulates"**'],
                  hint: 'Revisit c7_math_ch15_003 (Solving Linear Equations: Systematic Method) — trace how each algebraic.',
                  misconception: 'Students believe **"Theorems are just \'harder\' Postulates"** — i.e., that the difference is difficulty or obviousness.' },
                { id: 'd', prompt: 'A student argues: "Since we accept Postulates without proof, we could just *add* \'The sum of angles of a triangle is 180°\' as a sixth Postulate and skip the.', answer: '**Answer:** Logically, *any* consistent statement can be added as a Postulate',
                  options: ['**Answer:** Logically, *any* consistent statement can be added as a Postulate', 'It would be wrong', 'Theorems are just \'harder\' Postulates', '**"Theorems are just \'harder\' Postulates"**'],
                  hint: 'Revisit c7_math_ch15_003 (Solving Linear Equations: Systematic Method) — trace how each algebraic.',
                  misconception: 'Students believe **"Theorems are just \'harder\' Postulates"** — i.e., that the difference is difficulty or obviousness.' }
          ],
            remediations: { 'theorems-are-just-harder-postulates': { steps: ['**Confront the misconception directly:** Write on board: "Obvious ≠ Postulate.', '**Use a non-geometric analogy:** In a board game, the *rules* (how pieces move) are Postulates; a *winning strategy*.', '**Practice classification drill:** Give 10 statements (mix of algebra, arithmetic, geometry).', 'Student must label each Axiom/Postulate/Theorem *and* cite the specific Euclid Axiom/Postulate or prior Theorem.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch9_6', difficulty: 'standard',
          question: 'A geometric proof is a logical argument that uses a sequence of statements.',
          hint: 'Revisit c9_math_ch9_2 (axioms) and c9_math_ch9_5 (axiom vs postulate vs theorem).',
          misconception: 'Students treat geometric proofs as algebraic derivations: they write "AB = CD ⇒ AB + EF = CD + EF" and call it "adding.',
          parts: [
                { id: 'a', prompt: 'Why can we not simply say "AB = CD because they look the same length" in a formal proof? Explain the role of axioms in replacing visual intuition.', answer: '**Answer:** Visual appearance is not a valid justification in deductive geometry',
                  options: ['**Answer:** Visual appearance is not a valid justification in deductive geometry', 'we can trust the diagram if drawn carefully'],
                  hint: 'Revisit c9_math_ch9_2 (axioms) and c9_math_ch9_5 (axiom vs postulate vs theorem) — practice.',
                  misconception: 'Students treat geometric proofs as algebraic derivations: they write "AB = CD ⇒ AB + EF = CD + EF" and call it "adding EF to both sides.".' },
                { id: 'b', prompt: 'Given: Point B lies between A and C on line AC. Point E lies between D and F on line DF. AB = DE and BC = EF. Prove that AC = DF.', answer: '**Answer:** 1',
                  options: ['**Answer:** 1', 'AC = AB + BC', 'Axiom 1'],
                  hint: 'Revisit c9_math_ch9_2 (axioms) and c9_math_ch9_5 (axiom vs postulate vs theorem) — practice.',
                  misconception: 'Students treat geometric proofs as algebraic derivations: they write "AB = CD ⇒ AB + EF = CD + EF" and call it "adding EF to both sides.".' }
          ],
            remediations: { 'students-treat-geometric-proofs-as': { steps: ['If a student writes algebraic-style steps, stop them and ask: "Draw the figure.', 'Where is point E relative to B and F?', 'Does B lie between A and the endpoint of EF?" Make them physically place segment cut-outs on a line: show that "adding.', 'Then have them rewrite the proof with three columns: Statement | Reason (Axiom/Postulate/Def) | Diagram Reference.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
