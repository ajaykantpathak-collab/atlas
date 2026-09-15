import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch02_p2: SimDef = {
    id: 'v3_c11_cs_ch02_p2',
    title: 'Boolean Logic and Logic Gates · Part 2/3',
    subtitle: 'Map real-world and/or decisions onto Boolean variables that only know 0 and 1.',
    classLevel: 11, subject: 'computer_science', topic: 'Boolean Logic and Logic Gates · Part 2/3',
    chapters: ['c11_cs_ch02'],
    nodeIds: ['c11_cs_cbse_02_007', 'c11_cs_cbse_02_008', 'c11_cs_cbse_02_009', 'c11_cs_cbse_02_010', 'c11_cs_cbse_02_011', 'c11_cs_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a logic designer wiring a home security rule', intro: 'An alarm should fire only if the door opens AND the system is armed — turn that sentence into algebra.', goal: 'Represent two-state conditions as Boolean variables and combine them with AND, OR and NOT.' },
    discovery: {
        question: 'A logic expression reads 1 + 1. Arithmetic says 2, binary says 10 — what does a digital circuit say, and why?',
        options: ['1 — in Boolean algebra \'+\' means OR, and true-OR-true is true', '10 — circuits work in binary so it must carry', '2 — the symbol keeps its arithmetic meaning everywhere', '0 — two identical inputs cancel out'],
        answer: '1 — in Boolean algebra \'+\' means OR, and true-OR-true is true',
        hook: 'Same symbol, different algebra — in logic, \'+\' is a doorway (OR), not a sum.',
    },
    teaching: [
        { title: 'Distributive and Identity Laws in Boolean Algebra', text: 'The Distributive Laws in Boolean Algebra state that OR distributes over AND as A + (B · C) = (A + B) · (A + C), and AND distributes over OR as A · (B + C) = (A · B) + (A · C).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build truth tables for a smart light that needs motion AND night, and a phone that unlocks with fingerprint OR PIN.',
        labels: ['Distributive and Identity Laws', 'Complement and Idempotent Laws', 'De Morgan\'s Theorems with', 'Simplification of Boolean Expressions', 'Logic Gates: Construction', 'Universal Gates: NAND'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_02_007', title: 'Distributive and Identity Laws in Boolean Algebra',
          scaffold: { problem: 'A traffic light controller uses the Boolean logic: Green = (Sensor_A AND Sensor_B) OR (Sensor_A AND Timer) OR (Sensor_B AND Timer).',
            steps: [
            { text: 'Identify the given expression: G = (A·B) + (A·T) + (B·T) where A=Sensor_A, B=Sensor_B, T=Timer.' },
            { text: 'Group the first two terms to factor out A: G = A·(B + T) + (B·T) [Distributive Law: A·B + A·T = A·(B+T)].' },
            { text: 'Recognise that to apply the dual distributive law, we need a sum-of-products form that matches (X+Y)(X+Z) = X + Y·Z.' },
            { text: 'Apply the distributive law in reverse (factoring to POS): G = (A+B)(A+T)(B+T).' },
            { text: 'Check if further simplification is possible using identity laws.' },
            { text: 'Final simplified expression: G = (A + B) · (A + T) · (B + T). This is the minimal product-of-sums form.', faded: true, blankAnswer: 'G = (A + B) · (A + T) · (B + T)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_02_008', title: 'Complement and Idempotent Laws',
          scaffold: { problem: 'A safety system uses two sensors: S (smoke) and H (heat). The alarm triggers if (S AND NOT S) OR (H AND H).',
            steps: [
            { text: 'Write the Boolean expression: (S · S\') + (H · H).' },
            { text: 'Identify S · S\' as Complement Law (AND form) → equals 0.' },
            { text: 'Identify H · H as Idempotent Law (AND form) → equals H.' },
            { text: 'Substitute: 0 + H.' },
            { text: 'Apply Identity Law (0 + X = X) → H.' },
            { text: 'Interpret: The alarm depends ONLY on heat sensor H; the smoke sensor part is a contradiction (always false) and the.', faded: true, blankAnswer: 'Simplified expression = H. The alarm triggers iff heat.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_02_009', title: 'De Morgan\'s Theorems with Examples',
          scaffold: { problem: 'A safety system activates an alarm (output = 1) when either temperature sensor T1 OR pressure sensor T2 fails.',
            steps: [
            { text: 'Alarm activates when T1=0 OR T2=0. Working sensors = 1, so failed = T1\' and T2\'. Expression: F = T1\' + T2\'' },
            { text: 'We need to implement using only NAND gates. NAND = (A·B)\'. Notice F = T1\' + T2\' matches the right side of Theorem 2.' },
            { text: 'By Theorem 2, A\' + B\' = (A·B)\'. Let A = T1, B = T2. Then F = (T1·T2)\'' },
            { text: 'This is exactly a single NAND gate with inputs T1 and T2. No further simplification needed.' },
            { text: 'Verify with truth table: T1=1,T2=1 → (1·1)\'=0 (no alarm, both working); T1=0,T2=1 → (0·1)\'=1 (alarm); T1=1,T2=0 →.', faded: true, blankAnswer: 'F = (T1 · T2)\' — implemented with a single NAND gate.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_02_010', title: 'Simplification of Boolean Expressions',
          scaffold: { problem: 'A smart irrigation system activates the pump (P) when the soil is dry (D) AND the tank has water (W), OR when the soil is dry (D) AND it.',
            steps: [
            { text: 'Identify the common literal D in both product terms: D·W + D·R\'.' },
            { text: 'Apply the distributive law in reverse (factoring): D·(W + R\').' },
            { text: 'Recognise that no further Boolean laws apply (W + R\' cannot be simplified without additional information).' },
            { text: 'Verify equivalence by constructing a truth table for both original and simplified expressions for all 8 combinations.' },
            { text: 'Interpret the result: The simplified expression requires one AND gate and one OR gate (2 gates) instead of two AND.', faded: true, blankAnswer: 'P = D·(W + R\')' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_02_011', title: 'Logic Gates: Construction and Symbols',
          caseStudy: { intro: 'Start by asking: "How does a computer decide whether to turn on a pixel on your screen?',
            decisions: [{ prompt: 'What is the standard symbol for a two-input AND gate, and how many rows will its truth table have?', options: [
                { text: 'The standard symbol for a two-input AND gate is a D-shaped symbol with two inputs on the', outcome: 'The standard symbol for a two-input AND gate is a D-shaped symbol with two inputs on the left and.' },
                { text: 'active low', outcome: 'Not quite — Students often confuse the bubble (inversion) on gate symbols: they think a bubble on the input.', reveals: 'students-often-confuse-the-bubble' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_02_012', title: 'Universal Gates: NAND and NOR',
          scaffold: { problem: 'Implement the Boolean function F = (A + B) · C using only 2-input NAND gates. Draw the circuit and show the intermediate signals.',
            steps: [
            { text: 'Write the target function: F = (A + B) · C.' },
            { text: 'Apply double complementation: F = \\overline{\\overline{(A + B) · C}}.' },
            { text: 'Use De Morgan on the inner complement: \\overline{(A + B) · C} = \\overline{A + B} + \\overline{C}.' },
            { text: 'Recognise \\overline{A + B} = A\' · B\' (De Morgan again) and \\overline{C} = C\'. So F = \\overline{A\' · B\' + C\'}.' },
            { text: 'Implement A\' and B\' using two NAND gates with tied inputs. Implement C\' using a third NAND with tied inputs.' },
            { text: 'Feed A\' and B\' into a NAND gate to get (A\' · B\')\' = A + B. Then feed (A + B) and C into a NAND gate to get \\overline{(A.' },
            { text: 'Count gates: 3 inverters + 1 NAND for (A\'·B\')\' + 1 NAND for \\overline{(A+B)·C} + 1 final inverter = 6 NAND gates.', faded: true, blankAnswer: '6 NAND gates; circuit diagram with labeled intermediate.' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re designing the school lab\'s entry alarm: it should sound only when the door opens AND the alarm is armed. A teammate writes the rule as \'open + armed\', then computes \'if door open (1) and armed (1), output = 1+1 = 2 — wait, that can\'t be right, there\'s no 2 in a circuit.\'',
            decisions: [{ prompt: 'What\'s the correct reading of \'1 + 1\' here?', options: [
                { text: 'In Boolean algebra \'+\' means logical OR, not arithmetic addition: 1+1 = 1 (\'TRUE OR TRUE is TRUE\'). The alarm rule actually needs AND: Sound = Open · Armed. Variables are two-state truth values, not quantities — digital circuits are built from exactly these logical decisions.', outcome: 'Same symbols, different algebra: \'+\' is OR and \'·\' is AND; reading them as arithmetic breaks the whole circuit logic.' },
                { text: '1+1 = 10 in binary, so the output should just be read as binary 2.', outcome: 'That mixes binary arithmetic with Boolean logic; a Boolean variable holds only 0 or 1 — \'2\' is a category error, not an answer.', reveals: 'boolean-plus-is-addition' },
                { text: 'Write the alarm as Open OR Armed — any activity should trip it to be safe.', outcome: 'OR fires when the door opens while disarmed too — false alarms all day; the spec said BOTH conditions, which is AND.', reveals: 'and-or-swapped' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'Every decision a computer makes — from alarms to unlock screens — is just two-state variables and three little operations.',
            decisions: [{ prompt: 'What comes next? Boolean Logic and Logic Gates · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Boolean Logic and Logic Gates · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_007', difficulty: 'standard',
          question: 'The Distributive Laws in Boolean Algebra state that OR distributes over AND.',
          hint: 'If stuck, revisit truth table construction for 3 variables (c11_cs_cbse_02_004) and.',
          misconception: 'Students believe the distributive law works only one way: A·(B+C) = A·B + A·C (like regular algebra), and either forget.',
          parts: [
                { id: 'a', prompt: 'Explain why the distributive law A + (B · C) = (A + B) · (A + C) is valid in Boolean algebra but the analogous expression a + (b × c) = (a + b) × (a + c).', answer: 'In arithmetic, let a=2, b=3, c=4: LHS = 2 + (3×4) = 2+12 = 14',
                  options: ['In arithmetic, let a=2, b=3, c=4: LHS = 2 + (3×4) = 2+12 = 14', 'A+(B·C) = (A+B)·(A+C) is also valid'],
                  hint: 'If stuck, revisit truth table construction for 3 variables (c11_cs_cbse_02_004) and practice.',
                  misconception: 'Students believe the distributive law works only one way: A·(B+C) = A·B + A·C (like regular algebra), and either forget or disbelieve that.' },
                { id: 'b', prompt: 'Simplify the Boolean expression (X + Y) · (X + Z) · (X + 0) using distributive and identity laws. Show each step with the law name used.', answer: 'Step 1: (X + Y) · (X + Z) · (X + 0)',
                  options: ['Step 1: (X + Y) · (X + Z) · (X + 0)', 'A+(B·C) = (A+B)·(A+C) is also valid'],
                  hint: 'If stuck, revisit truth table construction for 3 variables (c11_cs_cbse_02_004) and practice.',
                  misconception: 'Students believe the distributive law works only one way: A·(B+C) = A·B + A·C (like regular algebra), and either forget or disbelieve that.' },
                { id: 'c', prompt: 'Given the Boolean expression F = A·B + A·C + B·C, use the distributive law to factor it into a product-of-sums form.', answer: 'Factoring: F = A·B + A·C + B·C = A·(B+C) + B·C [Distributive: A·B+A·C=A(B+C)]',
                  options: ['Factoring: F = A·B + A·C + B·C = A·(B+C) + B·C [Distributive: A·B+A·C=A(B+C)]', 'A+(B·C) = (A+B)·(A+C) is also valid'],
                  hint: 'If stuck, revisit truth table construction for 3 variables (c11_cs_cbse_02_004) and practice.',
                  misconception: 'Students believe the distributive law works only one way: A·(B+C) = A·B + A·C (like regular algebra), and either forget or disbelieve that.' }
          ],
            remediations: { 'the-distributive-law-works-only': { steps: ['Have the student build a complete truth table for A+(B·C) and (A+B)·(A+C) side-by-side for all 8 combinations of A,B,C.', 'Ask them to circle rows where A=1 and observe both sides equal 1; then circle rows where A=0 and observe both sides.', 'Contrast with arithmetic: pick a=2,b=3,c=4 and compute both sides to show 14≠30.', 'Give 5 practice expressions where they must identify which distributive law applies: e.g., P+(Q·R), (M+N)(M+P).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the distributive law works only one way: A·(B+C) = A·B + A·C (like regular algebra), and either forget.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since A + 0 = A and A · 1 = A, then A + 1 = A and A · 0 = A must also be true by symmetry." Evaluate this claim. Is the student correct?', answer: 'The student is INCORRECT',
                  options: ['The student is INCORRECT', 'A+(B·C) = (A+B)·(A+C) is also valid'],
                  hint: 'If stuck, revisit truth table construction for 3 variables (c11_cs_cbse_02_004) and practice.',
                  misconception: 'Students believe the distributive law works only one way: A·(B+C) = A·B + A·C (like regular algebra), and either forget or disbelieve that.' },
                { id: 'b', prompt: 'Design a Boolean expression with 4 variables (W, X, Y, Z) that requires BOTH distributive laws AND both identity laws to simplify to a single variable.', answer: 'Expression: F = (W + X·Y) · (W + 0) · (W + Z) · 1 Simplification: 1',
                  options: ['Expression: F = (W + X·Y) · (W + 0) · (W + Z) · 1 Simplification: 1', 'A+(B·C) = (A+B)·(A+C) is also valid'],
                  hint: 'If stuck, revisit truth table construction for 3 variables (c11_cs_cbse_02_004) and practice.',
                  misconception: 'Students believe the distributive law works only one way: A·(B+C) = A·B + A·C (like regular algebra), and either forget or disbelieve that.' }
          ],
            remediations: { 'the-distributive-law-works-only': { steps: ['Have the student build a complete truth table for A+(B·C) and (A+B)·(A+C) side-by-side for all 8 combinations of A,B,C.', 'Ask them to circle rows where A=1 and observe both sides equal 1; then circle rows where A=0 and observe both sides.', 'Contrast with arithmetic: pick a=2,b=3,c=4 and compute both sides to show 14≠30.', 'Give 5 practice expressions where they must identify which distributive law applies: e.g., P+(Q·R), (M+N)(M+P).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_008', difficulty: 'standard',
          question: 'The Complement Laws state that for any Boolean variable A: A + A\' = 1 (OR with.',
          hint: 'Revisit truth tables for basic operations (node c11_cs_cbse_02_004) and practice writing.',
          misconception: 'Students often confuse Complement Law (A + A\' = 1) with Idempotent Law (A + A = A) because both involve "A combined.',
          parts: [
                { id: 'a', prompt: 'State the four laws (two Complement, two Idempotent) using Boolean algebra notation with a variable A and its complement A\'.', answer: 'Complement Laws: A + A\' = 1 and A · A\' = 0',
                  options: ['Complement Laws: A + A\' = 1 and A · A\' = 0', 'opposite', 'exclusive partner', 'A combined with something'],
                  hint: 'Revisit truth tables for basic operations (node c11_cs_cbse_02_004) and practice writing the 2-row.',
                  misconception: 'Students often confuse Complement Law (A + A\' = 1) with Idempotent Law (A + A = A) because both involve "A combined with something".' },
                { id: 'b', prompt: 'Explain in your own words why A + A\' must equal 1 and A · A\' must equal 0, using the concept of a variable and its complement covering all possibilities.', answer: 'A and A\' are exhaustive and mutually exclusive: exactly one is 1, the other 0',
                  options: ['A and A\' are exhaustive and mutually exclusive: exactly one is 1, the other 0', 'because they cancel out', 'A combined with something'],
                  hint: 'Revisit truth tables for basic operations (node c11_cs_cbse_02_004) and practice writing the 2-row.',
                  misconception: 'Students often confuse Complement Law (A + A\' = 1) with Idempotent Law (A + A = A) because both involve "A combined with something".' },
                { id: 'c', prompt: 'Simplify the expression (P + Q) · (P + Q)\' using only the laws covered in this node. Show each step and name the law used.', answer: 'Step 1: Let X = (P + Q)',
                  options: ['Step 1: Let X = (P + Q)', 'A combined with something'],
                  hint: 'Revisit truth tables for basic operations (node c11_cs_cbse_02_004) and practice writing the 2-row.',
                  misconception: 'Students often confuse Complement Law (A + A\' = 1) with Idempotent Law (A + A = A) because both involve "A combined with something".' },
                { id: 'd', prompt: 'Compare the Idempotent Law A + A = A with the arithmetic statement x + x = 2x. Why does the Boolean version not produce a coefficient 2?', answer: 'Boolean algebra has no coefficients',
                  options: ['Boolean algebra has no coefficients', 'because Boolean is different', 'A combined with something'],
                  hint: 'Revisit truth tables for basic operations (node c11_cs_cbse_02_004) and practice writing the 2-row.',
                  misconception: 'Students often confuse Complement Law (A + A\' = 1) with Idempotent Law (A + A = A) because both involve "A combined with something".' }
          ],
            remediations: { 'students-often-confuse-complement-law': { steps: ['Have the student write the 2-row truth table for A and A\' side by side.', 'Ask: "In every row, what is A+A\'?', 'Then write truth table for A and A (same column twice).', 'Explicitly contrast: "Complement pairs give constant 1/0; self-pairs give the variable back." 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_009', difficulty: 'standard',
          question: 'De Morgan\'s Theorems are two fundamental transformation rules in Boolean.',
          hint: 'If stuck, revisit c11_cs_cbse_02_004 (Truth Tables) and build the truth table for (A+B)\'.',
          misconception: 'Students often write (A + B)\' = A\' + B\' (keeping the +) or (A · B)\' = A\' · B\' (keeping the ·), forgetting that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'De Morgan\'s Theorems are two fundamental transformation rules in Boolean algebra that',
                  options: ['De Morgan\'s Theorems are two fundamental transformation rules in Boolean algebra that', 'Boolean algebra is a mathematical system that deals with binary variables (having only', 'A Boolean variable is a symbolic representation of a logical quantity that can take', 'The three fundamental Boolean operations are AND (logical conjunction), OR (logical'],
                  hint: 'If stuck, revisit c11_cs_cbse_02_004 (Truth Tables) and build the truth table for (A+B)\' and A\'·B\'.',
                  misconception: 'Students often write (A + B)\' = A\' + B\' (keeping the +) or (A · B)\' = A\' · B\' (keeping the ·), forgetting that the operator MUST flip.' }
          ],
            remediations: { 'students-often-write-a-b': { steps: ['Have the student build a truth table for (A+B)\' and A\'+B\' side-by-side for all 4 combinations — the mismatch in row 2.', 'Use the "break the bar, change the operator" mnemonic with physical gesture: draw a bar over A+B, then "break" it into.', 'Practice 5 expressions where the only difference is the operator after complementation (e.g., (A+B)\' vs (A·B)\') until.', 'Connect to set theory: (A ∪ B)\' = A\' ∩ B\' (De Morgan in sets) — the same operator flip occurs, reinforcing the concept.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_010', difficulty: 'standard',
          question: 'Simplification of Boolean expressions is the systematic process of reducing.',
          hint: 'If stuck, immediately revisit De Morgan\'s theorems (c11_cs_cbse_02_009) and practice the.',
          misconception: 'Students frequently treat Boolean algebra exactly like ordinary algebra and attempt to "cancel" terms.',
          parts: [
                { id: 'a', prompt: 'State the absorption law in Boolean algebra and give one example of its application in simplifying an expression.', answer: 'The absorption law states: A + A·B = A and A·(A + B) = A',
                  options: ['The absorption law states: A + A·B = A and A·(A + B) = A', 'A AND (A OR B)', 'A OR (A AND B)', 'A + B = A or confusing it with idempotent law'],
                  hint: 'If stuck, immediately revisit De Morgan\'s theorems (c11_cs_cbse_02_009) and practice the "break the.',
                  misconception: 'Students frequently treat Boolean algebra exactly like ordinary algebra and attempt to "cancel" terms.' }
          ],
            remediations: { 'students-frequently-treat-boolean-algebra': { steps: ['Have the student build a truth table for both the original and their incorrectly simplified expression to see they.', 'Use the "break the bar, change the operator" mnemonic: physically draw the bar breaking and the operator flipping (·.', 'Practice the "no cancellation" rule: give 5 examples where arithmetic cancellation would give a wrong Boolean result.', 'Require the student to write the name of the law beside every step for the next 10 simplifications until the habit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_011', difficulty: 'standard',
          question: 'A logic gate is an elementary building block of a digital circuit that performs.',
          hint: 'Revisit truth tables for basic Boolean operations (node c11_cs_cbse_02_004) and practice.',
          misconception: 'Students often confuse the bubble (inversion) on gate symbols: they think a bubble on the input means the input.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the NOT gate is also called an inverter, and draw its symbol.', answer: 'The NOT gate is called an inverter',
                  options: ['The NOT gate is called an inverter', 'active low', 'it amplifies the signal or drawing a gate with two inputs'],
                  hint: 'Revisit truth tables for basic Boolean operations (node c11_cs_cbse_02_004) and practice.',
                  misconception: 'Students often confuse the bubble (inversion) on gate symbols: they think a bubble on the input means the input is "active low" and treat.' },
                { id: 'b', prompt: 'Given a 2-input OR gate and a 2-input AND gate, both with inputs A=1, B=0, determine the output of each gate and write the Boolean expression for the combined.', answer: 'OR gate output = 1+0 = 1',
                  options: ['OR gate output = 1+0 = 1', 'active low'],
                  hint: 'Revisit truth tables for basic Boolean operations (node c11_cs_cbse_02_004) and practice.',
                  misconception: 'Students often confuse the bubble (inversion) on gate symbols: they think a bubble on the input means the input is "active low" and treat.' },
                { id: 'c', prompt: 'Compare the symbols of the NAND gate and the AND gate. What is the significance of the small circle (bubble) at the output of the NAND gate, and how does.', answer: 'The NAND gate symbol is an AND gate with a bubble at the output',
                  options: ['The NAND gate symbol is an AND gate with a bubble at the output', 'active low', 'the bubble'],
                  hint: 'Revisit truth tables for basic Boolean operations (node c11_cs_cbse_02_004) and practice.',
                  misconception: 'Students often confuse the bubble (inversion) on gate symbols: they think a bubble on the input means the input is "active low" and treat.' }
          ],
            remediations: { 'students-often-confuse-the-bubble': { steps: ['To remediate, first review the meaning of the bubble as a NOT operation at that point.', 'Have the student practice: (1) Draw a NOT gate symbol and label it "inverter".', '(2) Take an AND gate symbol, add a bubble on the output, and write its truth table side-by-side with AND to see the.', '(3) Take an AND gate, add bubbles on both inputs, and derive its truth table; then compare with NOR truth table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_012', difficulty: 'standard',
          question: 'A universal gate is a logic gate that can implement any Boolean function.',
          hint: 'Review De Morgan\'s theorems (c11_cs_cbse_02_009) and practice converting AND/OR.',
          misconception: 'Students often think "universal" means a single NAND gate can directly replace any other gate without extra gates.',
          parts: [
                { id: 'a', prompt: 'State the truth table of a 2-input NAND gate and write its Boolean expression.', answer: 'Truth table: A=0,B=0→Y=1',
                  options: ['Truth table: A=0,B=0→Y=1', 'universal'],
                  hint: 'Review De Morgan\'s theorems (c11_cs_cbse_02_009) and practice converting AND/OR expressions.',
                  misconception: 'Students often think "universal" means a single NAND gate can directly replace any other gate without extra gates.' },
                { id: 'b', prompt: 'Using only 2-input NAND gates, draw the circuit that implements the Boolean function F = A + B (OR operation). Label all gate outputs.', answer: 'Step 1: Generate A\' and B\' using two NAND gates with tied inputs',
                  options: ['Step 1: Generate A\' and B\' using two NAND gates with tied inputs', 'universal'],
                  hint: 'Review De Morgan\'s theorems (c11_cs_cbse_02_009) and practice converting AND/OR expressions.',
                  misconception: 'Students often think "universal" means a single NAND gate can directly replace any other gate without extra gates.' },
                { id: 'c', prompt: 'Compare the number of NAND gates required to implement (i) NOT, (ii) AND, (iii) OR.', answer: 'NOT: 1 NAND; AND: 2 NANDs (NAND + NOT); OR: 3 NANDs (two NOTs + one NAND)',
                  options: ['NOT: 1 NAND; AND: 2 NANDs (NAND + NOT); OR: 3 NANDs (two NOTs + one NAND)', 'universal'],
                  hint: 'Review De Morgan\'s theorems (c11_cs_cbse_02_009) and practice converting AND/OR expressions.',
                  misconception: 'Students often think "universal" means a single NAND gate can directly replace any other gate without extra gates.' }
          ],
            remediations: { 'universal-means-a-single-nand': { steps: ['Ask the student to build NOT from NAND on a breadboard simulator (or paper) by tying inputs together.', 'Then have them build AND by adding a second NAND as an inverter after the first.', 'Finally, guide them to derive OR using De Morgan: (A+B) = (A\'·B\')\' and implement with three NANDs.', 'Count gates at each step to reinforce that universality requires multiple gates.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
