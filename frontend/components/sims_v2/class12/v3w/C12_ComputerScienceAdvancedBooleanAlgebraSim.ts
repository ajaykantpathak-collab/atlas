import type { SimDef } from '../../engine/types';
import C12_ComputerScienceAdvancedBooleanAlgebraSim from '../../../simulations/c6_12/C12_ComputerScienceAdvancedBooleanAlgebraSim';

/** v3 wrapped master — C12_ComputerScienceAdvancedBooleanAlgebraSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computerscienceadvancedbooleanalgebrasim: SimDef = {
    id: 'v3w_c12_computerscienceadvancedbooleanalgebrasim',
    title: 'Advanced Boolean Algebra',
    subtitle: 'This node introduces the concept, motivation, and basic vocabulary of Boolean Algebra.',
    classLevel: 12, subject: 'computer_science', topic: 'Introduction to Boolean Algebra and Logic',
    chapters: [],
    nodeIds: ['c12_cs_cbse_07_001', 'c12_cs_cbse_07_002', 'c12_cs_cbse_07_006', 'c12_cs_cbse_07_007', 'c12_cs_cbse_04_003', 'c12_cs_cbse_07_003', 'c12_cs_cbse_07_004', 'c12_cs_cbse_07_005', 'c12_cs_cbse_07_008', 'c12_cs_cbse_07_009', 'c12_cs_cbse_07_010', 'c12_cs_cbse_07_011', 'c12_cs_cbse_07_012', 'c12_cs_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are designing a security system for a bank vault: the vault opens ONLY if (the manager inserts.', goal: 'Master Advanced Boolean Algebra.' },
    discovery: {
        question: 'What are the only two values a Boolean variable can take?',
        options: ['A Boolean variable can take only the values 0 (False) and 1 (True)', '0, 1, and 2', 'any number'],
        answer: 'A Boolean variable can take only the values 0 (False) and 1 (True)',
        hook: 'Students often treat Boolean variables exactly like algebraic variables from middle-school math.',
    },
    teaching: [
        { title: 'Boolean Algebra is a mathematical system for.', text: 'Boolean Algebra is a mathematical system for representing and manipulating logical statements using variables that take only two values: TRUE (1) and FALSE (0).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_001', title: 'Boolean Algebra is a mathematical.',
          scaffold: { problem: 'A company gives a bonus to an employee if (the employee has worked for 5+ years) AND (the employee\'s performance rating is \'Excellent\' OR.',
            steps: [
            { text: 'Identify the atomic conditions: (a) Worked 5+ years, (b) Rating is Excellent, (c) Rating is Outstanding.' },
            { text: 'Assign Boolean variables: Y = TRUE if worked 5+ years, else FALSE; E = TRUE if rating Excellent, else FALSE; O = TRUE.' },
            { text: 'Note the logical structure: Bonus = Y AND (E OR O).' },
            { text: 'Translate to Boolean notation: AND becomes · (or implied multiplication), OR becomes +. Expression: B = Y · (E + O).' },
            { text: 'Verify: If Y=1, E=1, O=0 → B = 1·(1+0) = 1·1 = 1 (bonus given). If Y=0, E=1, O=1 → B = 0·(1+1) = 0·1 = 0 (no bonus).', faded: true, blankAnswer: 'B = Y · (E + O) where Y=worked 5+ years, E=Excellent.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_002', title: 'A Boolean variable is a symbol that.',
          scaffold: { problem: 'A security system uses a sensor that outputs 1 when motion is detected and 0 otherwise. Represent the sensor output as a Boolean variable.',
            steps: [
            { text: 'Identify the two possible states of the sensor: motion detected (1) and no motion (0).' },
            { text: 'Define a Boolean variable, say `M`, to represent the sensor output.' },
            { text: 'State that `M` can only be 0 or 1.' },
            { text: 'Interpret `M = 1` as motion detected, `M = 0` as no motion.' },
            { text: 'Verify that no other values are possible for `M`.', faded: true, blankAnswer: '`M` is a Boolean variable. `M = 1` indicates motion.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_006', title: 'The commutative, associative, and.',
          scaffold: { problem: 'A security system activates an alarm (output 1) when either (sensor A AND sensor B) OR (sensor A AND sensor C) is triggered.',
            steps: [
            { text: 'Identify the given condition: (A·B) + (A·C). This is the sum of two product terms.' },
            { text: 'Recognize the pattern matches the first distributive law: A·(B+C) = A·B + A·C.' },
            { text: 'Apply the law in reverse: (A·B) + (A·C) = A·(B+C).' },
            { text: 'Interpret: The alarm sounds when sensor A is triggered AND (sensor B OR sensor C) is triggered.' },
            { text: 'Verify with a truth table for both expressions to confirm equivalence (optional but recommended).', faded: true, blankAnswer: 'Simplified expression: A·(B+C). Condition: Alarm activates.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_007', title: 'De Morgan\'s Theorems are two.',
          scaffold: { problem: 'Prove De Morgan\'s First Theorem (A + B)\' = A\' · B\' using a truth table. Show all 4 rows and explain why matching columns prove the theorem.',
            steps: [
            { text: 'List all possible combinations of A and B (00, 01, 10, 11) in the first two columns.' },
            { text: 'Compute A + B (OR) for each row → column 3.' },
            { text: 'Compute (A + B)\' (NOT of column 3) → column 4. This is the LHS.' },
            { text: 'Compute A\' (NOT A) and B\' (NOT B) → columns 5 and 6.' },
            { text: 'Compute A\' · B\' (AND of columns 5 and 6) → column 7. This is the RHS.' },
            { text: 'Compare column 4 (LHS) and column 7 (RHS). They are identical for all 4 rows: 1,0,0,0.', faded: true, blankAnswer: '| A | B | A+B | (A+B)\' | A\' | B\' | A\'·B\' |' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_04_003', title: 'A database model defines the logical.',
          scaffold: { problem: 'A school has Students and Clubs. Each student can join multiple clubs; each club has multiple students.',
            steps: [
            { text: 'Identify the two entities (Student, Club) and the many‑to‑many relationship (Membership).' },
            { text: 'In hierarchical model, choose a root — either Student or Club. Suppose we choose Student as root.' },
            { text: 'Under each Student record, create child Club records for every club the student joins.' },
            { text: 'To find all members of a club, you must scan every Student subtree and collect matching Club records — inefficient.' },
            { text: 'Conclude: Hierarchical model forces redundancy (Club data repeated) and makes reverse queries (club → students).', faded: true, blankAnswer: 'Structure: Student (root) → Club (child, repeated per.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_003', title: 'The three fundamental Boolean.',
          scaffold: { problem: 'A home security system arms itself only when the master switch is ON (M=1) AND the front door is closed (D=1) AND the back door is closed.',
            steps: [
            { text: 'Identify the condition: all three must be true simultaneously → AND operation across three variables.' },
            { text: 'Write the expression: S = M · D · B (AND is associative, so grouping does not matter).' },
            { text: 'Substitute given values: M=1, D=1, B=0 → S = 1 · 1 · 0.' },
            { text: 'Evaluate left to right: 1 · 1 = 1; then 1 · 0 = 0.' },
            { text: 'Interpret: S=0 means system is NOT armed because back door is open.', faded: true, blankAnswer: 'S = M · D · B; for M=1, D=1, B=0, S = 0 (system not armed).' }
            ] } },
        { type: 'dissect', nodeId: 'c12_cs_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Advanced Boolean Algebra', spots: [
            { id: 's1', label: 'Boolean Algebra is a mathematical', prompt: 'Which idea is this? — Boolean Algebra is a mathematical system for representing and manipulating logical.', answer: 'Boolean Algebra is a mathematical', options: ['Boolean Algebra is a mathematical', 'A Boolean variable is a', 'The commutative associative and distributive', 'De Morgans Theorems are two'] },
            { id: 's2', label: 'A Boolean variable is a', prompt: 'Which idea is this? — A Boolean variable is a symbol that represents a logical quantity and can take only two.', answer: 'A Boolean variable is a', options: ['A Boolean variable is a', 'Boolean Algebra is a mathematical', 'The commutative associative and distributive', 'De Morgans Theorems are two'] },
            { id: 's3', label: 'The commutative associative and distributive', prompt: 'Which idea is this? — The commutative, associative, and distributive laws in Boolean algebra govern how Boolean.', answer: 'The commutative associative and distributive', options: ['The commutative associative and distributive', 'Boolean Algebra is a mathematical', 'A Boolean variable is a', 'De Morgans Theorems are two'] },
            { id: 's4', label: 'De Morgans Theorems are two', prompt: 'Which idea is this? — De Morgan\'s Theorems are two fundamental rules in Boolean Algebra that describe the.', answer: 'De Morgans Theorems are two', options: ['De Morgans Theorems are two', 'Boolean Algebra is a mathematical', 'A Boolean variable is a', 'The commutative associative and distributive'] },
            { id: 's5', label: 'A database model defines the', prompt: 'Which idea is this? — A database model defines the logical structure of a database, specifying how data is.', answer: 'A database model defines the', options: ['A database model defines the', 'Boolean Algebra is a mathematical', 'A Boolean variable is a', 'The commutative associative and distributive'] },
            { id: 's6', label: 'The three fundamental Boolean operations', prompt: 'Which idea is this? — The three fundamental Boolean operations are AND (logical conjunction, denoted by · or.', answer: 'The three fundamental Boolean operations', options: ['The three fundamental Boolean operations', 'Boolean Algebra is a mathematical', 'A Boolean variable is a', 'The commutative associative and distributive'] }
          ] } }
    ],
    explore: { component: C12_ComputerScienceAdvancedBooleanAlgebraSim, prompt: 'Explore the interactive — Advanced Boolean Algebra' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_001', difficulty: 'standard',
          question: 'Boolean Algebra is a mathematical system for representing and manipulating.',
          hint: 'Revisit Class 11 Maths Chapter 14 (Mathematical Reasoning), specifically nodes.',
          misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why ordinary algebra (with variables like x, y that can be any real number) cannot directly model a decision like "If it is raining.', answer: 'Ordinary algebra deals with continuous numerical quantities and operations like',
                  options: ['Ordinary algebra deals with continuous numerical quantities and operations like', 'we can use 1 for rain and 2 for umbrella'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' },
                { id: 'b', prompt: 'A school library allows a student to borrow a reference book ONLY if (the student is in Class 12) OR (the student has a teacher\'s permission slip).', answer: 'Allowed = S + P (using + for OR)',
                  options: ['Allowed = S + P (using + for OR)', 'Allowed = S * P'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' },
                { id: 'c', prompt: 'Compare the Boolean expression A + B (OR) with the arithmetic expression a + b (addition) when A, B, a, b are all 1.', answer: 'In Boolean Algebra, 1 + 1 = 1 (TRUE OR TRUE = TRUE)',
                  options: ['In Boolean Algebra, 1 + 1 = 1 (TRUE OR TRUE = TRUE)', 'both give 2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' }
          ],
            remediations: { 'students-often-treat-boolean-and': { steps: ['If a student shows this misconception: (1) Have them build a truth table for A+B with all four input pairs (0,0),.', '(2) Contrast with arithmetic: compute 1+1 on a calculator vs.', '(3) Revisit the definition: "Boolean values are truth states, not counts." (4) Assign a simple exercise: "Write the.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since Boolean Algebra only has 0 and 1, it\'s just a subset of arithmetic, so all arithmetic laws (like distributive a*(b+c)=a*b+a*c) must.', answer: 'The claim is partially correct but dangerously incomplete',
                  options: ['The claim is partially correct but dangerously incomplete', 'fully correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' }
          ],
            remediations: { 'students-often-treat-boolean-and': { steps: ['If a student shows this misconception: (1) Have them build a truth table for A+B with all four input pairs (0,0),.', '(2) Contrast with arithmetic: compute 1+1 on a calculator vs.', '(3) Revisit the definition: "Boolean values are truth states, not counts." (4) Assign a simple exercise: "Write the.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_002', difficulty: 'standard',
          question: 'A Boolean variable is a symbol that represents a logical quantity and can take.',
          hint: 'If stuck, revisit the concept of a variable in algebra (c6_math_ch05_052) and the concept.',
          misconception: 'Students often treat Boolean variables exactly like algebraic variables from middle-school math.',
          parts: [
                { id: 'a', prompt: 'What are the only two values a Boolean variable can take?', answer: 'A Boolean variable can take only the values 0 (False) and 1 (True)',
                  options: ['A Boolean variable can take only the values 0 (False) and 1 (True)', '0, 1, and 2', 'any number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Boolean variables exactly like algebraic variables from middle-school math.' }
          ],
            remediations: { 'students-often-treat-boolean-variables': { steps: ['**Revisit the physical metaphor**: Use a toggle switch (ON/OFF) or a push-button (pressed/released).', 'Physically show there are only two positions.', '**Map to symbols**: Label the two positions as 0 and 1.', 'Write a symbol `X` on a sticky note and place it on the switch.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_006', difficulty: 'standard',
          question: 'The commutative, associative, and distributive laws in Boolean algebra govern.',
          hint: 'If stuck, go back to node c12_cs_cbse_07_004 (Truth Tables) and practice building truth.',
          misconception: 'Students often believe the distributive law in Boolean algebra works exactly like ordinary algebra: they write A(B + C).',
          parts: [
                { id: 'a', prompt: 'State the commutative law for Boolean OR and Boolean AND using variables A and B.', answer: 'Correct answer: A + B = B + A (OR) and A · B = B · A (AND)',
                  options: ['Correct answer: A + B = B + A (OR) and A · B = B · A (AND)', 'A + BC = (A+B)(A+C) is false'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the distributive law in Boolean algebra works exactly like ordinary algebra: they write A(B + C) = AB + AC (correct).' },
                { id: 'b', prompt: 'Compare the distributive law in Boolean algebra (A + BC = (A+B)(A+C)) with the distributive law in ordinary algebra (a + bc = (a+b)(a+c)?).', answer: 'Correct analysis: In ordinary algebra, a + bc ≠ (a+b)(a+c) in general',
                  options: ['Correct analysis: In ordinary algebra, a + bc ≠ (a+b)(a+c) in general', 'A + BC = (A+B)(A+C) is false'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the distributive law in Boolean algebra works exactly like ordinary algebra: they write A(B + C) = AB + AC (correct).' }
          ],
            remediations: { 'the-distributive-law-in-boolean': { steps: ['Revisit truth tables for AND and OR (node c12_cs_cbse_07_004) to verify each law by exhaustive enumeration for 2.', 'Practice identifying the law used in each step of a given simplification (use worked examples below).', 'Construct a 3-variable truth table for (A+B)(A+C) and A+BC to prove equivalence concretely.', 'If confusion persists, review the arithmetic distributive property (node c8_math_ch6_1) and explicitly list the.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the distributive law in Boolean algebra works exactly like ordinary algebra: they write A(B + C).',
          parts: [
                { id: 'a', prompt: 'A student simplifies (X + Y) · (X + Z) to X + YZ and then further to X + Y + Z. Evaluate whether the second step is valid.', answer: 'The second step is invalid',
                  options: ['The second step is invalid', 'A + BC = (A+B)(A+C) is false'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the distributive law in Boolean algebra works exactly like ordinary algebra: they write A(B + C) = AB + AC (correct).' },
                { id: 'b', prompt: 'Create a Boolean expression with three variables that uses all three laws (commutative, associative, distributive) in a non-trivial way.', answer: 'Example expression: (A + B) · (C + A)',
                  options: ['Example expression: (A + B) · (C + A)', 'A + BC = (A+B)(A+C) is false'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the distributive law in Boolean algebra works exactly like ordinary algebra: they write A(B + C) = AB + AC (correct).' },
                { id: 'c', prompt: 'Compare the distributive law in Boolean algebra (A + BC = (A+B)(A+C)) with the distributive law in ordinary algebra (a + bc = (a+b)(a+c)?).', answer: 'Correct analysis: In ordinary algebra, a + bc ≠ (a+b)(a+c) in general',
                  options: ['Correct analysis: In ordinary algebra, a + bc ≠ (a+b)(a+c) in general', 'A + BC = (A+B)(A+C) is false'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the distributive law in Boolean algebra works exactly like ordinary algebra: they write A(B + C) = AB + AC (correct).' }
          ],
            remediations: { 'the-distributive-law-in-boolean': { steps: ['Revisit truth tables for AND and OR (node c12_cs_cbse_07_004) to verify each law by exhaustive enumeration for 2.', 'Practice identifying the law used in each step of a given simplification (use worked examples below).', 'Construct a 3-variable truth table for (A+B)(A+C) and A+BC to prove equivalence concretely.', 'If confusion persists, review the arithmetic distributive property (node c8_math_ch6_1) and explicitly list the.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_007', difficulty: 'standard',
          question: 'De Morgan\'s Theorems are two fundamental rules in Boolean Algebra that describe.',
          hint: 'If stuck, immediately review c12_cs_cbse_07_004 (Truth Tables) for 2-variable tables and.',
          misconception: 'Students mechanically "break the bar and change the sign" but forget that every variable under the bar must be.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why (A · B)\' is not equal to A\' · B\'. Use a concrete example with A=1, B=0 to illustrate.', answer: 'Correct explanation: (A·B)\' means "NOT (A AND B)"',
                  options: ['Correct explanation: (A·B)\' means "NOT (A AND B)"', 'distribute the bar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically "break the bar and change the sign" but forget that every variable under the bar must be complemented individually.' },
                { id: 'b', prompt: 'Compare the algebraic proof of (A + B)\' = A\' · B\' using Boolean laws with the truth-table proof. Which proof is more general and why?', answer: 'The algebraic proof is more general',
                  options: ['The algebraic proof is more general', 'truth table is more general'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically "break the bar and change the sign" but forget that every variable under the bar must be complemented individually.' }
          ],
            remediations: { 'students-mechanically-break-the-bar': { steps: ['Revisit c12_cs_cbse_07_004 (Truth Tables) and construct the truth table for (A + B·C)\' and A\'·(B\' + C\') side-by-side to.', 'Revisit c12_cs_cbse_07_006 (Laws of Boolean Algebra) and practice the Involution Law (X\')\' = X until double complements.', 'Draw the expression tree for (A + B·C)\', put a bar at the root, and push it down level by level: at each node, flip the.', 'Re-attempt Diagnostic Question 3 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students mechanically "break the bar and change the sign" but forget that every variable under the bar must be.',
          parts: [
                { id: 'a', prompt: 'Compare the algebraic proof of (A + B)\' = A\' · B\' using Boolean laws with the truth-table proof. Which proof is more general and why?', answer: 'The algebraic proof is more general',
                  options: ['The algebraic proof is more general', 'truth table is more general'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically "break the bar and change the sign" but forget that every variable under the bar must be complemented individually.' }
          ],
            remediations: { 'students-mechanically-break-the-bar': { steps: ['Revisit c12_cs_cbse_07_004 (Truth Tables) and construct the truth table for (A + B·C)\' and A\'·(B\' + C\') side-by-side to.', 'Revisit c12_cs_cbse_07_006 (Laws of Boolean Algebra) and practice the Involution Law (X\')\' = X until double complements.', 'Draw the expression tree for (A + B·C)\', put a bar at the root, and push it down level by level: at each node, flip the.', 'Re-attempt Diagnostic Question 3 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_003', difficulty: 'standard',
          question: 'A database model defines the logical structure of a database, specifying how.',
          hint: 'If stuck, review the file‑system vs DBMS comparison (c12_cs_cbse_04_002) and the.',
          misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.',
          parts: [
                { id: 'a', prompt: 'Name the three classical database models and give one real‑world analogy for each (e.g., hierarchical = organization chart).', answer: 'The three models are Hierarchical (analogy: file‑system directory tree), Network',
                  options: ['The three models are Hierarchical (analogy: file‑system directory tree), Network', 'obsolete', 'hierarchical and network models are "obsolete" and only of historical interest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' },
                { id: 'b', prompt: 'Explain why the hierarchical model cannot naturally represent a many‑to‑many relationship (e.g., Student‑Club) without data redundancy.', answer: 'In a hierarchical model, each child has exactly one parent',
                  options: ['In a hierarchical model, each child has exactly one parent', 'it can using pointers', 'obsolete'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' },
                { id: 'c', prompt: 'Given a small network‑model diagram with two record types (Owner: Department, Member: Employee) and a set linking them, write the steps to find all employees.', answer: 'Steps: (1) Locate the \'CS\' department record (owner)',
                  options: ['Steps: (1) Locate the \'CS\' department record (owner)', 'SELECT * FROM Employee WHERE dept=\'CS\'', 'obsolete'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' }
          ],
            remediations: { 'hierarchical-and-network-models-are': { steps: ['Revisit the concept of "relationship degree" (one‑to‑many vs many‑to‑many) using c12_cs_cbse_04_001 (Intro to DBMS).', 'Draw the same Student‑Club scenario on paper for each model, physically tracing pointers (network) or foreign keys.', 'Re‑attempt Diagnostic Question 3 and 6, focusing on the procedural steps required in network vs.', 'declarative query in relational.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.',
          parts: [
                { id: 'a', prompt: '"Relational model is always superior to hierarchical and network models." Evaluate this statement with two arguments for and two against.', answer: 'For: (1) Relational provides high data independence and simple querying via SQL',
                  options: ['For: (1) Relational provides high data independence and simple querying via SQL', 'obsolete', 'hierarchical and network models are "obsolete" and only of historical interest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' },
                { id: 'b', prompt: 'Design a tiny database for a "Library Book‑Loan" system using each model. Show the structure (records/sets/tables) for: Book, Member, Loan (with due date).', answer: 'Hierarchical: Two separate trees',
                  options: ['Hierarchical: Two separate trees', 'obsolete', 'hierarchical and network models are "obsolete" and only of historical interest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' }
          ],
            remediations: { 'hierarchical-and-network-models-are': { steps: ['Revisit the concept of "relationship degree" (one‑to‑many vs many‑to‑many) using c12_cs_cbse_04_001 (Intro to DBMS).', 'Draw the same Student‑Club scenario on paper for each model, physically tracing pointers (network) or foreign keys.', 'Re‑attempt Diagnostic Question 3 and 6, focusing on the procedural steps required in network vs.', 'declarative query in relational.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_003', difficulty: 'standard',
          question: 'The three fundamental Boolean operations are AND (logical conjunction, denoted.',
          hint: 'Review the definition of Boolean variables and constants (c12_cs_cbse_07_002) and.',
          misconception: 'Students often treat Boolean OR as exclusive OR (XOR), believing 1+1=0.',
          parts: [
                { id: 'a', prompt: 'What is the output of the Boolean expression (A AND B) when A = 1 and B = 0?', answer: 'The output is 0',
                  options: ['The output is 0', 'at least one is 1', 'undefined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Boolean OR as exclusive OR (XOR), believing 1+1=0.' }
          ],
            remediations: { 'students-often-treat-boolean-or': { steps: ['Revisit the definitions: write the three truth tables (AND, OR, NOT) from memory on paper.', 'For the exclusive-OR confusion, explicitly compute 1+1 in Boolean OR and compare with XOR; say aloud "Boolean OR means.', 'For NOT misapplication, take a concrete expression like NOT (A AND B) with A=1,B=0: compute inside first (1 AND 0 = 0),.', 'Then compute (NOT A) AND (NOT B) = 0 AND 1 = 0.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
