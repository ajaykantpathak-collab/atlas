import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch07_p2: SimDef = {
    id: 'v3_c12_cs_ch07_p2',
    title: 'Boolean Algebra · Part 2/2',
    subtitle: '1 + 1 = 1 — the algebra where arithmetic\'s rules break',
    classLevel: 12, subject: 'computer_science', topic: 'Boolean Algebra · Part 2/2',
    chapters: ['c12_cs_ch07'],
    nodeIds: ['c12_cs_cbse_07_007', 'c12_cs_cbse_07_008', 'c12_cs_cbse_07_009', 'c12_cs_cbse_07_010', 'c12_cs_cbse_07_011', 'c12_cs_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Logic designer', intro: 'Every decision a computer makes is a tiny logical sentence. Boolean algebra is how we write those sentences precisely.', goal: 'Map real-world conditions to Boolean variables and operations, and apply the laws that simplify logical expressions.' },
    discovery: {
        question: 'A student evaluates the Boolean expression 1 + 1 and writes 2 — \'addition is addition.\' On a logic gate, what did they just invent that can\'t exist?',
        options: ['A voltage level \'2\' — Boolean + is OR, so TRUE OR TRUE is still TRUE; the system is closed in {0,1}', 'Nothing — 1+1=2 everywhere', 'A faster circuit', 'A new gate called PLUS'],
        answer: 'A voltage level \'2\' — Boolean + is OR, so TRUE OR TRUE is still TRUE; the system is closed in {0,1}',
        hook: 'Boolean algebra borrows arithmetic\'s symbols, not its rules. 1+1=1, A+A=A, A+A\'=1 — laws no calculator knows. Treating them as arithmetic is the root of every botched truth table and broken circuit design.',
    },
    teaching: [
        { title: 'De Morgan\'s Theorems with Proofs', text: 'De Morgan\'s Theorems are two fundamental rules in Boolean Algebra that describe the equivalence between the complement of a sum (OR) and the product (AND) of complements, and the complement of.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Turn real rules into logic: encode a bank vault (two keycards AND working hours) and a library policy as Boolean expressions, then simplify circuits with the laws that make silicon cheap.',
        labels: ['De Morgan\'s Theorems with', 'Principle of Duality', 'Canonical Forms: Minterm', 'K-Map: Simplification of Boolean', 'Logic Gates: AND, OR,', 'Universal Gates: NAND'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_007', title: 'De Morgan\'s Theorems with Proofs',
          scaffold: { problem: 'Prove De Morgan\'s First Theorem (A + B)\' = A\' · B\' using a truth table. Show all 4 rows and explain why matching columns prove the theorem.',
            steps: [
            { text: 'List all possible combinations of A and B (00, 01, 10, 11) in the first two columns.' },
            { text: 'Compute A + B (OR) for each row → column 3.' },
            { text: 'Compute (A + B)\' (NOT of column 3) → column 4. This is the LHS.' },
            { text: 'Compute A\' (NOT A) and B\' (NOT B) → columns 5 and 6.' },
            { text: 'Compute A\' · B\' (AND of columns 5 and 6) → column 7. This is the RHS.' },
            { text: 'Compare column 4 (LHS) and column 7 (RHS). They are identical for all 4 rows: 1,0,0,0.', faded: true, blankAnswer: '| A | B | A+B | (A+B)\' | A\' | B\' | A\'·B\' |' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_009', title: 'Canonical Forms: Minterm and Maxterm (SOP and POS)',
          scaffold: { problem: 'A security system uses three sensors A, B, C. The alarm triggers (F=1) when exactly one sensor is active (1) or when all three are active.',
            steps: [
            { text: 'List all 8 rows of the truth table for A,B,C. Identify rows where exactly one sensor is 1 (001, 010, 100) and where all.' },
            { text: 'For each 1-row, write the minterm. Row 001 (index1): A\'B\'C. Row 010 (index2): A\'BC\'. Row 100 (index4): AB\'C\'.' },
            { text: 'OR all minterms for canonical SOP: F = Σm(1,2,4,7) = A\'B\'C + A\'BC\' + AB\'C\' + ABC.' },
            { text: 'The 0-rows are indices 0,3,5,6. For each, write the maxterm. Row 000 (index0): A+B+C. Row 011 (index3): A+B\'+C\'.' },
            { text: 'AND all maxterms for canonical POS: F = ΠM(0,3,5,6) = (A+B+C)(A+B\'+C\')(A\'+B+C\')(A\'+B\'+C).' },
            { text: 'Verify equivalence by checking one row, e.g., 001: SOP gives A\'B\'C = 1·1·1=1; POS gives (A+B+C)=1, (A+B\'+C\')=0+0+0=0?', faded: true, blankAnswer: 'SOP = Σm(1,2,4,7) = A\'B\'C + A\'BC\' + AB\'C\' + ABC; POS.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_010', title: 'K-Map: Simplification of Boolean Expressions',
          scaffold: { problem: 'A security system activates an alarm (F=1) when: (i) the main door is open (D=1) AND the system is armed (A=1), OR (ii) a window is broken.',
            steps: [
            { text: 'Identify the number of variables = 4 (A,B,C,D). Draw a 4×4 K-map with 16 cells.' },
            { text: 'Fill 1s in cells corresponding to minterms 0,1,2,3,8,9,10,11. Minterms 0-3 have A=0,B=0 (row 00); minterms 8-11 have.' },
            { text: 'Identify the largest possible groups. The first two rows (row 00 and row 01) together form an octet (8 cells) because.' },
            { text: 'Read the simplified term for the octet. Variables that change within the group are eliminated: A changes (0→1), C and.' },
            { text: 'Verify no other 1s remain ungrouped. All 8 minterms are covered by the single octet. The minimal SOP is F = B\'.' },
            { text: 'Verify by Boolean algebra: Original Σm(0,1,2,3,8,9,10,11) = A\'B\'(C\'D\' + C\'D + CD + CD\') + AB\'(C\'D\' + C\'D + CD + CD\').', faded: true, blankAnswer: 'F = B\' (minimal SOP: 1 term, 1 literal)' }
            ] } },
        { type: 'case', nodeId: 'c12_cs_cbse_07_011', title: 'Logic Gates: AND, OR, NOT, NAND, NOR, XOR',
          caseStudy: { intro: 'Imagine you\'re designing a security system for a locker that opens only when two conditions are met: a correct keycard is presented (input A = 1) AND a valid.',
            decisions: [{ prompt: 'Draw the standard ANSI/IEEE symbol for a 2-input NAND gate and write its truth table.', options: [
                { text: 'The NAND gate symbol is an AND gate symbol (D-shaped) with a small circle (inversion', outcome: 'The NAND gate symbol is an AND gate symbol (D-shaped) with a small circle (inversion bubble) at the.' },
                { text: 'OR with inverted inputs', outcome: 'Not quite — Students memorize gate symbols and truth tables as isolated facts but fail to connect them to.', reveals: 'students-memorize-gate-symbols-and' },
                { text: 'inverted OR output', outcome: 'Not quite — Students memorize gate symbols and truth tables as isolated facts but fail to connect them to.', reveals: 'students-memorize-gate-symbols-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_012', title: 'Universal Gates: NAND and NOR Realisation of Other Gates',
          scaffold: { problem: 'Implement a 2-input XOR gate (Y = A⊕B = A\'B + AB\') using only 2-input NAND gates.',
            steps: [
            { text: 'Write XOR in SOP form: Y = A\'B + AB\'.' },
            { text: 'Apply double complement: Y = ((A\'B + AB\')\')\'.' },
            { text: 'Apply De Morgan\'s theorem to the inner complement: (A\'B + AB\')\' = (A\'B)\' · (AB\')\' (product of complements).' },
            { text: 'Recognize each term (A\'B)\' and (AB\')\' as NAND outputs: NAND1(A\', B) and NAND2(A, B\').' },
            { text: 'Generate A\' and B\' using NAND-as-inverter: NAND3(A,A) = A\', NAND4(B,B) = B\'.' },
            { text: 'Final output Y = NAND5( NAND1(A\',B), NAND2(A,B\') ) = ((A\'B)\' · (AB\')\')\' = A\'B + AB\'.' },
            { text: 'Total gate count = 4 NAND gates (standard optimized XOR uses 4; the above uses 5 if inverters are separate, but.' },
            { text: 'Verify truth table: for (A,B)=(0,0): C=1, D=1, E=1, Y=0; (0,1): C=1, D=1, E=0, Y=1; (1,0): C=1, D=0, E=1, Y=1; (1,1).', faded: true, blankAnswer: '4 NAND gates; circuit: C=NAND(A,B), D=NAND(A,C).' }
            ] } },
        { type: 'case', nodeId: 'c12_cs_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A hospital alert rule reads: notify the doctor if heart rate is high OR blood pressure is low AND oxygen is low. A nurse implementing it says the parentheses don\'t matter — \'it\'s just three conditions with OR and AND\'.',
            decisions: [{ prompt: 'Is the nurse right about the logic?', options: [
                { text: 'No — H + (B·O) and (H + B)·O are different rules: with H high, B normal, O normal they give opposite answers, so the AND/OR grouping changes who gets alerted.', outcome: 'Boolean grouping is clinical here — one reading alarms on high heart rate alone, the other demands low oxygen too.' },
                { text: 'Yes — OR and AND are interchangeable connectives, so any reading of the sentence works.', outcome: 'They aren\'t interchangeable: \'any one true\' versus \'all required\' is exactly the difference between + and ·.', reveals: 'or-and-interchangeable' },
                { text: 'Yes — and anyway 1 + 1 = 2 in Boolean, so the counts always sort it out.', outcome: 'Boolean values are truth states, not tallies: 1 OR 1 = 1 — the {0,1} system is closed and arithmetic intuition misfires.', reveals: 'boolean-plus-is-arithmetic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_07_012', title: 'You made it',
          caseStudy: { intro: 'You can now translate human \'if-and-only-if\' rules into algebra a machine runs. Boolean logic is the language every chip in your phone was written in first.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_007', difficulty: 'standard',
          question: 'De Morgan\'s Theorems are two fundamental rules in Boolean Algebra that describe.',
          hint: 'If stuck, immediately review c12_cs_cbse_07_004 (Truth Tables) for 2-variable tables and.',
          misconception: 'Students mechanically "break the bar and change the sign" but forget that every variable under the bar must.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why (A · B)\' is not equal to A\' · B\'. Use a concrete example with A=1, B=0 to illustrate.', answer: 'Correct explanation: (A·B)\' means "NOT (A AND B)"',
                  options: ['Correct explanation: (A·B)\' means "NOT (A AND B)"', 'distribute the bar'],
                  hint: 'If stuck, immediately review c12_cs_cbse_07_004 (Truth Tables) for 2-variable tables and.',
                  misconception: 'Students mechanically "break the bar and change the sign" but forget that every variable under the bar must be complemented individually.' },
                { id: 'b', prompt: 'Compare the algebraic proof of (A + B)\' = A\' · B\' using Boolean laws with the truth-table proof. Which proof is more general and why?', answer: 'The algebraic proof is more general',
                  options: ['The algebraic proof is more general', 'truth table is more general'],
                  hint: 'If stuck, immediately review c12_cs_cbse_07_004 (Truth Tables) for 2-variable tables and.',
                  misconception: 'Students mechanically "break the bar and change the sign" but forget that every variable under the bar must be complemented individually.' }
          ],
            remediations: { 'students-mechanically-break-the-bar': { steps: ['Revisit c12_cs_cbse_07_004 (Truth Tables) and construct the truth table for (A + B·C)\' and A\'·(B\' + C\') side-by-side.', 'Revisit c12_cs_cbse_07_006 (Laws of Boolean Algebra) and practice the Involution Law (X\')\' = X until double complements.', 'Draw the expression tree for (A + B·C)\', put a bar at the root, and push it down level by level: at each node, flip the.', 'Re-attempt Diagnostic Question 3 and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_008', difficulty: 'standard',
          question: 'The Principle of Duality states that every valid Boolean expression remains.',
          hint: 'If stuck, revisit c12_cs_cbse_07_006 (Laws of Boolean Algebra) and write down all axioms.',
          misconception: 'Students consistently confuse **duality** with **complementation (De Morgan\'s theorem)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Principle of Duality states that every valid Boolean expression remains valid if we',
                  options: ['The Principle of Duality states that every valid Boolean expression remains valid if we', 'Boolean Algebra is a mathematical system for representing and manipulating logical', 'A Boolean variable is a symbol that represents a logical quantity and can take only two', 'The three fundamental Boolean operations are AND (logical conjunction, denoted by · or'],
                  hint: 'If stuck, revisit c12_cs_cbse_07_006 (Laws of Boolean Algebra) and write down all axioms in two.',
                  misconception: 'Students consistently confuse **duality** with **complementation (De Morgan\'s theorem)**.' }
          ],
            remediations: { 'students-consistently-confuse-duality-with': { steps: ['If a student writes the dual by complementing variables: 1.', 'Ask them to write the dual of A + 0 = A.', 'Correct answer: A · 1 = A.', 'Their method would give A\' · 1 = A\' (wrong).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_009', difficulty: 'standard',
          question: 'A **minterm** is a product (AND) term in a Boolean function of n variables.',
          hint: 'If stuck, revisit c12_cs_cbse_07_004 (Truth Tables) to practice writing all rows for 3-4.',
          misconception: 'Students often write the maxterm for a 0-row by complementing the variables that are 1 in that row (e.g., for row 011.',
          parts: [
                { id: 'a', prompt: 'Given the truth table for F(A,B) below, write both canonical SOP and canonical POS expressions.', answer: 'SOP: F = Σm(0,3) = A\'B\' + AB',
                  options: ['SOP: F = Σm(0,3) = A\'B\' + AB', 'SOP uses 1-rows', 'POS uses 0-rows'],
                  hint: 'If stuck, revisit c12_cs_cbse_07_004 (Truth Tables) to practice writing all rows for 3-4 variables.',
                  misconception: 'Students often write the maxterm for a 0-row by complementing the variables that are 1 in that row (e.g., for row 011 they write A\'+B\'+C).' }
          ],
            remediations: { 'students-often-write-the-maxterm': { steps: ['Have the student write the truth table for a 2-variable function (e.g., XOR).', 'For each row, explicitly write the minterm (product) and maxterm (sum) using the rule: minterm → variable is true.', 'Ask them to explain why the maxterm for row 01 is A + B\'.', 'Re-do diagnostic question 2 and 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_010', difficulty: 'standard',
          question: 'A Karnaugh Map (K-Map) is a graphical method for simplifying Boolean.',
          hint: 'Revisit c12_cs_cbse_07_009 (Canonical Forms) — practice writing Σm and ΠM for 3-variable.',
          misconception: '**Misconception:** "Diagonal cells in a K-map are adjacent because they touch at the corners." **Why it\'s wrong:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Karnaugh Map (K-Map) is a graphical method for simplifying Boolean expressions by',
                  options: ['A Karnaugh Map (K-Map) is a graphical method for simplifying Boolean expressions by', 'Boolean Algebra is a mathematical system for representing and manipulating logical', 'A Boolean variable is a symbol that represents a logical quantity and can take only two', 'The three fundamental Boolean operations are AND (logical conjunction, denoted by · or'],
                  hint: 'Revisit c12_cs_cbse_07_009 (Canonical Forms) — practice writing Σm and ΠM for 3-variable functions.',
                  misconception: '**Misconception:** "Diagonal cells in a K-map are adjacent because they touch at the corners." **Why it\'s wrong:** K-map adjacency.' }
          ],
            remediations: { 'misconception-diagonal-cells-in-a': { steps: ['If a student forms diagonal groups or misses wrap-around groups: (1) Have them re-write the variable combinations for.', '(2) Re-draw the 4-variable K-map with explicit Gray code labels on rows (00,01,11,10) and columns (00,01,11,10), then.', '(3) Re-attempt Diagnostic Question 3 — if they now form the octet correctly, the misconception is resolved.', 'If not, revisit c12_cs_cbse_07_009 (Canonical Forms) to reinforce minterm indexing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_011', difficulty: 'standard',
          question: 'A logic gate is an electronic circuit that implements a Boolean function.',
          hint: 'Revisit c12_cs_cbse_07_004 (Truth Tables) and practice writing truth tables for.',
          misconception: 'Students memorize gate symbols and truth tables as isolated facts but fail to connect them to IC pinouts and voltage.',
          parts: [
                { id: 'a', prompt: 'A student writes the Boolean expression for a 2-input XOR gate as Y = A + B. Explain why this is incorrect and give the correct expression.', answer: 'Y = A + B represents OR gate (output 1 if at least one input is 1)',
                  options: ['Y = A + B represents OR gate (output 1 if at least one input is 1)', 'OR with inverted inputs', 'inverted OR output'],
                  hint: 'Revisit c12_cs_cbse_07_004 (Truth Tables) and practice writing truth tables for 3-variable.',
                  misconception: 'Students memorize gate symbols and truth tables as isolated facts but fail to connect them to IC pinouts and voltage levels.' },
                { id: 'b', prompt: 'You have a 74LS00 IC (quad 2-input NAND gate). Pins 1 and 2 are inputs to the first gate, pin 3 is its output. Pin 14 is Vcc (+5V), pin 7 is GND.', answer: 'Pin 1 = logic 1 (+5V), pin 2 = logic 0 (0V)',
                  options: ['Pin 1 = logic 1 (+5V), pin 2 = logic 0 (0V)', 'OR with inverted inputs', 'inverted OR output'],
                  hint: 'Revisit c12_cs_cbse_07_004 (Truth Tables) and practice writing truth tables for 3-variable.',
                  misconception: 'Students memorize gate symbols and truth tables as isolated facts but fail to connect them to IC pinouts and voltage levels.' },
                { id: 'c', prompt: 'Compare the truth tables of NOR and XOR gates. For which input combinations do they produce the SAME output? For which do they produce DIFFERENT outputs?', answer: 'Same output for: (0,0) → NOR=1, XOR=0?',
                  options: ['Same output for: (0,0) → NOR=1, XOR=0?', 'they\'re similar because both have bubbles', 'XOR is like OR with a bubble', 'OR with inverted inputs'],
                  hint: 'Revisit c12_cs_cbse_07_004 (Truth Tables) and practice writing truth tables for 3-variable.',
                  misconception: 'Students memorize gate symbols and truth tables as isolated facts but fail to connect them to IC pinouts and voltage levels.' }
          ],
            remediations: { 'students-memorize-gate-symbols-and': { steps: ['If a student cannot map truth tables to IC pinouts: (1) Have them physically breadboard a 74LS00 with LEDs on outputs.', '(2) Revisit c12_cs_cbse_07_004 (Truth Tables) and c12_cs_cbse_07_003 (Basic Operations) to reinforce Boolean.', '(3) Practice: "Given this IC pinout diagram, write the Boolean expression at pin X when pins Y,Z are connected.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_3 — they must get the voltage reading correct and explain why.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students memorize gate symbols and truth tables as isolated facts but fail to connect them to IC pinouts and voltage.',
          parts: [
                { id: 'a', prompt: 'Design a 2-input "equivalence" gate (output 1 when both inputs are same: 00→1, 01→0, 10→0, 11→1) using ONLY 2-input NAND gates (74LS00).', answer: 'Equivalence = XNOR = (A ⊕ B)\' = AB + A\'B\'',
                  options: ['Equivalence = XNOR = (A ⊕ B)\' = AB + A\'B\'', 'OR with inverted inputs', 'inverted OR output'],
                  hint: 'Revisit c12_cs_cbse_07_004 (Truth Tables) and practice writing truth tables for 3-variable.',
                  misconception: 'Students memorize gate symbols and truth tables as isolated facts but fail to connect them to IC pinouts and voltage levels.' }
          ],
            remediations: { 'students-memorize-gate-symbols-and': { steps: ['If a student cannot map truth tables to IC pinouts: (1) Have them physically breadboard a 74LS00 with LEDs on outputs.', '(2) Revisit c12_cs_cbse_07_004 (Truth Tables) and c12_cs_cbse_07_003 (Basic Operations) to reinforce Boolean.', '(3) Practice: "Given this IC pinout diagram, write the Boolean expression at pin X when pins Y,Z are connected.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_3 — they must get the voltage reading correct and explain why.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_012', difficulty: 'standard',
          question: 'A universal gate is a logic gate that can be used to implement any Boolean.',
          hint: 'Revisit c12_cs_cbse_07_007 (De Morgan\'s Theorems with Proofs) and practice converting 3-4.',
          misconception: 'Students often believe that "universal gate" means a single NAND or NOR gate can perform any logic function by itself.',
          parts: [
                { id: 'a', prompt: 'What is the minimum number of 2-input NAND gates required to implement a 2-input AND gate, and what is the configuration?', answer: 'Two NAND gates: the first NAND gate takes inputs A and B and produces (A·B)\'',
                  options: ['Two NAND gates: the first NAND gate takes inputs A and B and produces (A·B)\'', 'one NAND gate', 'three or more', 'universal gate'],
                  hint: 'Revisit c12_cs_cbse_07_007 (De Morgan\'s Theorems with Proofs) and practice converting 3-4 SOP.',
                  misconception: 'Students often believe that "universal gate" means a single NAND or NOR gate can perform any logic function by itself, leading them.' },
                { id: 'b', prompt: 'Using only 2-input NAND gates, draw the circuit and write the Boolean expression for a 2-input OR gate. Show each De Morgan step.', answer: 'OR gate: Y = A + B',
                  options: ['OR gate: Y = A + B', 'universal gate', '1 gate'],
                  hint: 'Revisit c12_cs_cbse_07_007 (De Morgan\'s Theorems with Proofs) and practice converting 3-4 SOP.',
                  misconception: 'Students often believe that "universal gate" means a single NAND or NOR gate can perform any logic function by itself, leading them.' },
                { id: 'c', prompt: 'Compare the NAND-only and NOR-only implementations of a 2-input XOR gate in terms of gate count and circuit depth. Which is more efficient and why?', answer: 'XOR = A\'B + AB\'',
                  options: ['XOR = A\'B + AB\'', 'universal gate', '1 gate'],
                  hint: 'Revisit c12_cs_cbse_07_007 (De Morgan\'s Theorems with Proofs) and practice converting 3-4 SOP.',
                  misconception: 'Students often believe that "universal gate" means a single NAND or NOR gate can perform any logic function by itself, leading them.' }
          ],
            remediations: { 'universal-gate-means-a-single': { steps: ['If a student cannot derive the NAND-only OR gate (Diagnostic Q3), have them revisit c12_cs_cbse_07_007 (De Morgan\'s.', 'Then re-attempt Diagnostic Q3 with this scaffolded procedure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
