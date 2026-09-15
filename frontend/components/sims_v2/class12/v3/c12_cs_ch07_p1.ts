import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch07_p1: SimDef = {
    id: 'v3_c12_cs_ch07_p1',
    title: 'Boolean Algebra · Part 1/2',
    subtitle: '1 + 1 = 1 — the algebra where arithmetic\'s rules break',
    classLevel: 12, subject: 'computer_science', topic: 'Boolean Algebra · Part 1/2',
    chapters: ['c12_cs_ch07'],
    nodeIds: ['c12_cs_cbse_07_001', 'c12_cs_cbse_07_002', 'c12_cs_cbse_07_003', 'c12_cs_cbse_07_004', 'c12_cs_cbse_07_005', 'c12_cs_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Logic designer', intro: 'Every decision a computer makes is a tiny logical sentence. Boolean algebra is how we write those sentences precisely.', goal: 'Map real-world conditions to Boolean variables and operations, and apply the laws that simplify logical expressions.' },
    discovery: {
        question: 'A student evaluates the Boolean expression 1 + 1 and writes 2 — \'addition is addition.\' On a logic gate, what did they just invent that can\'t exist?',
        options: ['A voltage level \'2\' — Boolean + is OR, so TRUE OR TRUE is still TRUE; the system is closed in {0,1}', 'Nothing — 1+1=2 everywhere', 'A faster circuit', 'A new gate called PLUS'],
        answer: 'A voltage level \'2\' — Boolean + is OR, so TRUE OR TRUE is still TRUE; the system is closed in {0,1}',
        hook: 'Boolean algebra borrows arithmetic\'s symbols, not its rules. 1+1=1, A+A=A, A+A\'=1 — laws no calculator knows. Treating them as arithmetic is the root of every botched truth table and broken circuit design.',
    },
    teaching: [
        { title: 'Introduction to Boolean Algebra and Logic', text: 'Boolean Algebra is a mathematical system for representing and manipulating logical statements using variables that take only two values: TRUE (1) and FALSE (0).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Turn real rules into logic: encode a bank vault (two keycards AND working hours) and a library policy as Boolean expressions, then simplify circuits with the laws that make silicon cheap.',
        labels: ['Introduction to Boolean Algebra', 'Boolean Variables and Constants', 'Basic Boolean Operations: AND,', 'Truth Tables for Boolean', 'Boolean Expressions and their', 'Laws of Boolean Algebra'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_07_001', title: 'Introduction to Boolean Algebra and Logic',
          caseStudy: { intro: 'Imagine you are designing a security system for a bank vault: the vault opens ONLY if (the manager inserts their keycard) AND (the deputy manager inserts their.',
            decisions: [{ prompt: 'What are the only two values a Boolean variable can take, and what do they represent in logical terms?', options: [
                { text: 'A Boolean variable can take only two values: 0 (representing FALSE) and 1 (representing', outcome: 'A Boolean variable can take only two values: 0 (representing FALSE) and 1 (representing TRUE).' },
                { text: '0 and 1 are just numbers', outcome: 'Not quite — Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication.', reveals: 'students-often-treat-boolean-and' },
                { text: 'variables can be any integer', outcome: 'Not quite — Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication.', reveals: 'students-often-treat-boolean-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_07_002', title: 'Boolean Variables and Constants',
          caseStudy: { intro: 'Imagine a light switch in your room — it has exactly two states: ON or OFF. In digital systems, we represent ON as 1 and OFF as 0.',
            decisions: [{ prompt: 'What are the only two values a Boolean variable can take?', options: [
                { text: 'A Boolean variable can take only the values 0 (False) and 1 (True)', outcome: 'A Boolean variable can take only the values 0 (False) and 1 (True).' },
                { text: '0, 1, and 2', outcome: 'Not quite — Students often treat Boolean variables exactly like algebraic variables from middle-school math.', reveals: 'students-often-treat-boolean-variables' },
                { text: 'any number', outcome: 'Not quite — Students often treat Boolean variables exactly like algebraic variables from middle-school math.', reveals: 'students-often-treat-boolean-variables' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_07_003', title: 'Basic Boolean Operations: AND, OR, NOT',
          caseStudy: { intro: 'Imagine you are designing a security system for a locker: the locker opens only when a correct keycard is presented AND a correct PIN is entered.',
            decisions: [{ prompt: 'What is the output of the Boolean expression (A AND B) when A = 1 and B = 0?', options: [
                { text: 'The output is 0', outcome: 'The output is 0. AND yields 1 only when both inputs are 1; here B = 0, so the result is 0.' },
                { text: 'at least one is 1', outcome: 'Not quite — Students often treat Boolean OR as exclusive OR (XOR), believing 1+1=0.', reveals: 'students-often-treat-boolean-or' },
                { text: 'undefined', outcome: 'Not quite — Students often treat Boolean OR as exclusive OR (XOR), believing 1+1=0.', reveals: 'students-often-treat-boolean-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_07_004', title: 'Truth Tables for Boolean Operations',
          caseStudy: { intro: 'Imagine designing a smart irrigation system that waters crops only when **both** the soil moisture sensor reads "dry" (0) **AND** the temperature sensor reads.',
            decisions: [{ prompt: 'How many rows will a truth table have for a Boolean expression with 4 distinct variables, and what is the standard order for listing the.', options: [
                { text: 'A 4-variable truth table has 2⁴ = 16 rows', outcome: 'A 4-variable truth table has 2⁴ = 16 rows. The standard order lists input combinations as binary.' },
                { text: '8 rows', outcome: 'Not quite — **Misconception:** "Truth tables are just for simple gates; for complex expressions I can just.', reveals: 'misconception-truth-tables-are-just' },
                { text: 'alphabetical order', outcome: 'Not quite — **Misconception:** "Truth tables are just for simple gates; for complex expressions I can just.', reveals: 'misconception-truth-tables-are-just' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_006', title: 'Laws of Boolean Algebra: Commutative, Associative, Distributive',
          scaffold: { problem: 'A security system activates an alarm (output 1) when either (sensor A AND sensor B) OR (sensor A AND sensor C) is triggered.',
            steps: [
            { text: 'Identify the given condition: (A·B) + (A·C). This is the sum of two product terms.' },
            { text: 'Recognize the pattern matches the first distributive law: A·(B+C) = A·B + A·C.' },
            { text: 'Apply the law in reverse: (A·B) + (A·C) = A·(B+C).' },
            { text: 'Interpret: The alarm sounds when sensor A is triggered AND (sensor B OR sensor C) is triggered.' },
            { text: 'Verify with a truth table for both expressions to confirm equivalence (optional but recommended).', faded: true, blankAnswer: 'Simplified expression: A·(B+C). Condition: Alarm activates.' }
            ] } },
        { type: 'case', nodeId: 'c12_cs_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A hospital alert rule reads: notify the doctor if heart rate is high OR blood pressure is low AND oxygen is low. A nurse implementing it says the parentheses don\'t matter — \'it\'s just three conditions with OR and AND\'.',
            decisions: [{ prompt: 'Is the nurse right about the logic?', options: [
                { text: 'No — H + (B·O) and (H + B)·O are different rules: with H high, B normal, O normal they give opposite answers, so the AND/OR grouping changes who gets alerted.', outcome: 'Boolean grouping is clinical here — one reading alarms on high heart rate alone, the other demands low oxygen too.' },
                { text: 'Yes — OR and AND are interchangeable connectives, so any reading of the sentence works.', outcome: 'They aren\'t interchangeable: \'any one true\' versus \'all required\' is exactly the difference between + and ·.', reveals: 'or-and-interchangeable' },
                { text: 'Yes — and anyway 1 + 1 = 2 in Boolean, so the counts always sort it out.', outcome: 'Boolean values are truth states, not tallies: 1 OR 1 = 1 — the {0,1} system is closed and arithmetic intuition misfires.', reveals: 'boolean-plus-is-arithmetic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now translate human \'if-and-only-if\' rules into algebra a machine runs. Boolean logic is the language every chip in your phone was written in first.',
            decisions: [{ prompt: 'What comes next? Boolean Algebra · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Boolean Algebra · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_001', difficulty: 'standard',
          question: 'Boolean Algebra is a mathematical system for representing and manipulating.',
          hint: 'Revisit Class 11 Maths Chapter 14 (Mathematical Reasoning), specifically nodes.',
          misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why ordinary algebra (with variables like x, y that can be any real number) cannot directly model a decision like "If it is raining.', answer: 'Ordinary algebra deals with continuous numerical quantities and operations like',
                  options: ['Ordinary algebra deals with continuous numerical quantities and operations like', 'we can use 1 for rain and 2 for umbrella'],
                  hint: 'Revisit Class 11 Maths Chapter 14 (Mathematical Reasoning), specifically nodes c11_math_cbse_14_001.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' },
                { id: 'b', prompt: 'A school library allows a student to borrow a reference book ONLY if (the student is in Class 12) OR (the student has a teacher\'s permission slip).', answer: 'Allowed = S + P (using + for OR)',
                  options: ['Allowed = S + P (using + for OR)', 'Allowed = S * P'],
                  hint: 'Revisit Class 11 Maths Chapter 14 (Mathematical Reasoning), specifically nodes c11_math_cbse_14_001.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' },
                { id: 'c', prompt: 'Compare the Boolean expression A + B (OR) with the arithmetic expression a + b (addition) when A, B, a, b are all 1.', answer: 'In Boolean Algebra, 1 + 1 = 1 (TRUE OR TRUE = TRUE)',
                  options: ['In Boolean Algebra, 1 + 1 = 1 (TRUE OR TRUE = TRUE)', 'both give 2'],
                  hint: 'Revisit Class 11 Maths Chapter 14 (Mathematical Reasoning), specifically nodes c11_math_cbse_14_001.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' }
          ],
            remediations: { 'students-often-treat-boolean-and': { steps: ['If a student shows this misconception: (1) Have them build a truth table for A+B with all four input pairs (0,0).', '(2) Contrast with arithmetic: compute 1+1 on a calculator vs.', '(3) Revisit the definition: "Boolean values are truth states, not counts." (4) Assign a simple exercise: "Write the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since Boolean Algebra only has 0 and 1, it\'s just a subset of arithmetic, so all arithmetic laws (like distributive a*(b+c)=a*b+a*c) must.', answer: 'The claim is partially correct but dangerously incomplete',
                  options: ['The claim is partially correct but dangerously incomplete', 'fully correct'],
                  hint: 'Revisit Class 11 Maths Chapter 14 (Mathematical Reasoning), specifically nodes c11_math_cbse_14_001.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' }
          ],
            remediations: { 'students-often-treat-boolean-and': { steps: ['If a student shows this misconception: (1) Have them build a truth table for A+B with all four input pairs (0,0).', '(2) Contrast with arithmetic: compute 1+1 on a calculator vs.', '(3) Revisit the definition: "Boolean values are truth states, not counts." (4) Assign a simple exercise: "Write the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_002', difficulty: 'standard',
          question: 'A Boolean variable is a symbol that represents a logical quantity and can take.',
          hint: 'If stuck, revisit the concept of a variable in algebra (c6_math_ch05_052) and the concept.',
          misconception: 'Students often treat Boolean variables exactly like algebraic variables from middle-school math.',
          parts: [
                { id: 'a', prompt: 'What are the only two values a Boolean variable can take?', answer: 'A Boolean variable can take only the values 0 (False) and 1 (True)',
                  options: ['A Boolean variable can take only the values 0 (False) and 1 (True)', '0, 1, and 2', 'any number'],
                  hint: 'If stuck, revisit the concept of a variable in algebra (c6_math_ch05_052) and the concept of.',
                  misconception: 'Students often treat Boolean variables exactly like algebraic variables from middle-school math.' }
          ],
            remediations: { 'students-often-treat-boolean-variables': { steps: ['**Revisit the physical metaphor**: Use a toggle switch (ON/OFF) or a push-button (pressed/released).', 'Physically show there are only two positions.', '**Map to symbols**: Label the two positions as 0 and 1.', 'Write a symbol `X` on a sticky note and place it on the switch.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_003', difficulty: 'standard',
          question: 'The three fundamental Boolean operations are AND (logical conjunction, denoted.',
          hint: 'Review the definition of Boolean variables and constants (c12_cs_cbse_07_002) and.',
          misconception: 'Students often treat Boolean OR as exclusive OR (XOR), believing 1+1=0.',
          parts: [
                { id: 'a', prompt: 'What is the output of the Boolean expression (A AND B) when A = 1 and B = 0?', answer: 'The output is 0',
                  options: ['The output is 0', 'at least one is 1', 'undefined', 'AND is "at least one is 1" (confusing it with OR)'],
                  hint: 'Review the definition of Boolean variables and constants (c12_cs_cbse_07_002) and practice writing.',
                  misconception: 'Students often treat Boolean OR as exclusive OR (XOR), believing 1+1=0.' }
          ],
            remediations: { 'students-often-treat-boolean-or': { steps: ['Revisit the definitions: write the three truth tables (AND, OR, NOT) from memory on paper.', 'For the exclusive-OR confusion, explicitly compute 1+1 in Boolean OR and compare with XOR; say aloud "Boolean OR means.', 'For NOT misapplication, take a concrete expression like NOT (A AND B) with A=1,B=0: compute inside first (1 AND 0 = 0).', 'Then compute (NOT A) AND (NOT B) = 0 AND 1 = 0.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_004', difficulty: 'standard',
          question: 'A truth table is a complete tabular enumeration of all possible combinations.',
          hint: 'If stuck, revisit binary counting (0 to 7) and the three basic 2-input truth tables from.',
          misconception: '**Misconception:** "Truth tables are just for simple gates; for complex expressions I can just simplify algebraically.',
          parts: [
                { id: 'a', prompt: 'How many rows will a truth table have for a Boolean expression with 4 distinct variables, and what is the standard order for listing the input combinations?', answer: 'A 4-variable truth table has 2⁴ = 16 rows',
                  options: ['A 4-variable truth table has 2⁴ = 16 rows', '8 rows', 'alphabetical order'],
                  hint: 'If stuck, revisit binary counting (0 to 7) and the three basic 2-input truth tables from.',
                  misconception: '**Misconception:** "Truth tables are just for simple gates; for complex expressions I can just simplify algebraically and skip the table.".' },
                { id: 'b', prompt: 'Two students debate: "The truth table for A XOR B is the same as (A AND NOT B) OR (NOT A AND B)." Another says: "No, it\'s the same as (A OR B) AND NOT (A AND.', answer: 'Yes, both are correct',
                  options: ['Yes, both are correct', 'only first is correct', 'neither'],
                  hint: 'If stuck, revisit binary counting (0 to 7) and the three basic 2-input truth tables from.',
                  misconception: '**Misconception:** "Truth tables are just for simple gates; for complex expressions I can just simplify algebraically and skip the table.".' }
          ],
            remediations: { 'misconception-truth-tables-are-just': { steps: ['If a student cannot construct a correct 3-variable truth table: 1.', '**Revisit c12_cs_cbse_07_003** (Basic Boolean Operations) — confirm they can evaluate single AND/OR/NOT for all 4 input.', '**Practice binary counting:** Write 000 to 111 on paper, label columns A,B,C.', 'Drill until ordering is automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_005', difficulty: 'standard',
          question: 'A Boolean expression is a valid combination of Boolean variables (e.g., A, B).',
          hint: 'If stuck, go back to **c12_cs_cbse_07_003** and **c12_cs_cbse_07_004** and rebuild the.',
          misconception: 'Students treat Boolean evaluation like arithmetic left‑to‑right: they see `A + B · C` and compute `(A + B) · C` because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Boolean expression is a valid combination of Boolean variables (e.g., A, B), Boolean',
                  options: ['A Boolean expression is a valid combination of Boolean variables (e.g., A, B), Boolean', 'Boolean Algebra is a mathematical system for representing and manipulating logical', 'A Boolean variable is a symbol that represents a logical quantity and can take only two', 'The three fundamental Boolean operations are AND (logical conjunction, denoted by · or'],
                  hint: 'If stuck, go back to **c12_cs_cbse_07_003** and **c12_cs_cbse_07_004** and rebuild the 2‑variable.',
                  misconception: 'Students treat Boolean evaluation like arithmetic left‑to‑right: they see `A + B · C` and compute `(A + B) · C` because “+ comes before ·.' }
          ],
            remediations: { 'students-treat-boolean-evaluation-like': { steps: ['Revisit **c12_cs_cbse_07_003** (Basic Boolean Operations) and **c12_cs_cbse_07_004** (Truth Tables) to rebuild the.', 'Practice 10 expressions of the form `X + Y·Z` and `X·Y + Z` with all 8 input combos, writing each intermediate column.', 'Use the mnemonic “**N**ot **A**nd **O**r” (NAO) for precedence.', 'Re‑attempt Diagnostic Questions 3 and 5; if still wrong, explicitly write the precedence rule on a sticky note and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_006', difficulty: 'standard',
          question: 'The commutative, associative, and distributive laws in Boolean algebra govern.',
          hint: 'If stuck, go back to node c12_cs_cbse_07_004 (Truth Tables) and practice building truth.',
          misconception: 'Students often believe the distributive law in Boolean algebra works exactly like ordinary algebra: they write A(B + C).',
          parts: [
                { id: 'a', prompt: 'State the commutative law for Boolean OR and Boolean AND using variables A and B.', answer: 'Correct answer: A + B = B + A (OR) and A · B = B · A (AND)',
                  options: ['Correct answer: A + B = B + A (OR) and A · B = B · A (AND)', 'A + BC = (A+B)(A+C) is false'],
                  hint: 'If stuck, go back to node c12_cs_cbse_07_004 (Truth Tables) and practice building truth tables for.',
                  misconception: 'Students often believe the distributive law in Boolean algebra works exactly like ordinary algebra: they write A(B + C) = AB + AC (correct).' },
                { id: 'b', prompt: 'Compare the distributive law in Boolean algebra (A + BC = (A+B)(A+C)) with the distributive law in ordinary algebra (a + bc = (a+b)(a+c)?).', answer: 'Correct analysis: In ordinary algebra, a + bc ≠ (a+b)(a+c) in general',
                  options: ['Correct analysis: In ordinary algebra, a + bc ≠ (a+b)(a+c) in general', 'A + BC = (A+B)(A+C) is false'],
                  hint: 'If stuck, go back to node c12_cs_cbse_07_004 (Truth Tables) and practice building truth tables for.',
                  misconception: 'Students often believe the distributive law in Boolean algebra works exactly like ordinary algebra: they write A(B + C) = AB + AC (correct).' }
          ],
            remediations: { 'the-distributive-law-in-boolean': { steps: ['Revisit truth tables for AND and OR (node c12_cs_cbse_07_004) to verify each law by exhaustive enumeration for 2.', 'Practice identifying the law used in each step of a given simplification (use worked examples below).', 'Construct a 3-variable truth table for (A+B)(A+C) and A+BC to prove equivalence concretely.', 'If confusion persists, review the arithmetic distributive property (node c8_math_ch6_1) and explicitly list the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
