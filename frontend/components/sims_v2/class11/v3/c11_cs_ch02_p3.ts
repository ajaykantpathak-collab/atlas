import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch02_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch02_p3: SimDef = {
    id: 'v3_c11_cs_ch02_p3',
    title: 'Boolean Logic and Logic Gates · Part 3/3',
    subtitle: 'Map real-world and/or decisions onto Boolean variables that only know 0 and 1.',
    classLevel: 11, subject: 'computer_science', topic: 'Boolean Logic and Logic Gates · Part 3/3',
    chapters: ['c11_cs_ch02'],
    nodeIds: ['c11_cs_cbse_02_013', 'c11_cs_cbse_02_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a logic designer wiring a home security rule', intro: 'An alarm should fire only if the door opens AND the system is armed — turn that sentence into algebra.', goal: 'Represent two-state conditions as Boolean variables and combine them with AND, OR and NOT.' },
    discovery: {
        question: 'A logic expression reads 1 + 1. Arithmetic says 2, binary says 10 — what does a digital circuit say, and why?',
        options: ['1 — in Boolean algebra \'+\' means OR, and true-OR-true is true', '10 — circuits work in binary so it must carry', '2 — the symbol keeps its arithmetic meaning everywhere', '0 — two identical inputs cancel out'],
        answer: '1 — in Boolean algebra \'+\' means OR, and true-OR-true is true',
        hook: 'Same symbol, different algebra — in logic, \'+\' is a doorway (OR), not a sum.',
    },
    teaching: [
        { title: 'Realisation of Basic Gates Using Universal Gates', text: 'Realisation of basic gates using universal gates is the systematic implementation of AND, OR, and NOT logic functions using exclusively NAND gates or exclusively NOR gates, leveraging the functional.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build truth tables for a smart light that needs motion AND night, and a phone that unlocks with fingerprint OR PIN.',
        labels: ['Realisation of Basic Gates', 'XOR and XNOR Gates'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_02_013', title: 'Realisation of Basic Gates Using Universal Gates',
          scaffold: { problem: 'Implement the Boolean function F = A·B + C·D using only NAND gates.',
            steps: [
            { text: 'Write the given expression in SOP form: F = (A·B) + (C·D) — already in sum-of-products form.' },
            { text: 'Apply double complementation: F = ((A·B) + (C·D))\'\' — this preserves logical equivalence.' },
            { text: 'Apply De Morgan\'s first theorem to the outer complement: (X + Y)\' = X\'·Y\' where X = A·B, Y = C·D.' },
            { text: 'Recognize each term: (A·B)\' is a NAND gate output, (C·D)\' is a NAND gate output, and the final (·)\' is another NAND.' },
            { text: 'Draw circuit: Gate 1 (NAND): inputs A, B → output W1 = (A·B)\'. Gate 2 (NAND): inputs C, D → output W2 = (C·D)\'.' },
            { text: 'Verify for A=1, B=1, C=0, D=1: W1 = (1·1)\' = 0; W2 = (0·1)\' = 1; F = (0·1)\' = 1.', faded: true, blankAnswer: '3 NAND gates required. Circuit: NAND(A,B) → W1; NAND(C,D) →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_02_014', title: 'XOR and XNOR Gates and their Applications',
          scaffold: { problem: 'Design a 2-input XOR gate using only 2-input NAND gates. Show the circuit diagram and verify its truth table.',
            steps: [
            { text: 'Recall XOR Boolean expression: Y = A\'B + AB\'.' },
            { text: 'Apply De Morgan\'s theorem to express in NAND form. Note that A\'B = (A + B\')\'?' },
            { text: 'Derive N2: N2 = (A·(AB)\')\' = A\' + (AB) = A\' + B (by absorption?' },
            { text: 'Then Y = (N2·N3)\' = ((A\'+B)(A+B\'))\' = (A\'A + A\'B\' + AB + BB\')\' = (0 + A\'B\' + AB + 0)\' = (A\'B\' + AB)\' = (A⊙B)\' = A⊕B.' },
            { text: 'Draw circuit: four NAND gates connected as described. Verify truth table by simulating all four input combinations.', faded: true, blankAnswer: 'Circuit with 4 NAND gates; truth table matches XOR.' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re designing the school lab\'s entry alarm: it should sound only when the door opens AND the alarm is armed. A teammate writes the rule as \'open + armed\', then computes \'if door open (1) and armed (1), output = 1+1 = 2 — wait, that can\'t be right, there\'s no 2 in a circuit.\'',
            decisions: [{ prompt: 'What\'s the correct reading of \'1 + 1\' here?', options: [
                { text: 'In Boolean algebra \'+\' means logical OR, not arithmetic addition: 1+1 = 1 (\'TRUE OR TRUE is TRUE\'). The alarm rule actually needs AND: Sound = Open · Armed. Variables are two-state truth values, not quantities — digital circuits are built from exactly these logical decisions.', outcome: 'Same symbols, different algebra: \'+\' is OR and \'·\' is AND; reading them as arithmetic breaks the whole circuit logic.' },
                { text: '1+1 = 10 in binary, so the output should just be read as binary 2.', outcome: 'That mixes binary arithmetic with Boolean logic; a Boolean variable holds only 0 or 1 — \'2\' is a category error, not an answer.', reveals: 'boolean-plus-is-addition' },
                { text: 'Write the alarm as Open OR Armed — any activity should trip it to be safe.', outcome: 'OR fires when the door opens while disarmed too — false alarms all day; the spec said BOTH conditions, which is AND.', reveals: 'and-or-swapped' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_02_014', title: 'You made it',
          caseStudy: { intro: 'Every decision a computer makes — from alarms to unlock screens — is just two-state variables and three little operations.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_013', difficulty: 'standard',
          question: 'Realisation of basic gates using universal gates is the systematic.',
          hint: 'If stuck, revisit c11_cs_cbse_02_009 (De Morgan\'s Theorems) and c11_cs_cbse_02_012.',
          misconception: 'Students believe that "universal gate" means they can replace every gate in a circuit one-to-one with a NAND or NOR.',
          parts: [
                { id: 'a', prompt: 'What is the Boolean expression for a NOT gate implemented using a single NAND gate, and why does tying both inputs of a NAND gate together produce a NOT.', answer: 'The Boolean expression is Y = (A·A)\' = A\'',
                  options: ['The Boolean expression is Y = (A·A)\' = A\'', 'universal gate'],
                  hint: 'If stuck, revisit c11_cs_cbse_02_009 (De Morgan\'s Theorems) and c11_cs_cbse_02_012 (Universal.',
                  misconception: 'Students believe that "universal gate" means they can replace every gate in a circuit one-to-one with a NAND or NOR gate.' },
                { id: 'b', prompt: 'Using De Morgan\'s theorem, derive the Boolean expression for an OR gate implemented using only NAND gates.', answer: 'Starting with Y = A + B, apply double complementation: Y = ((A + B)\')\'',
                  options: ['Starting with Y = A + B, apply double complementation: Y = ((A + B)\')\'', 'universal gate'],
                  hint: 'If stuck, revisit c11_cs_cbse_02_009 (De Morgan\'s Theorems) and c11_cs_cbse_02_012 (Universal.',
                  misconception: 'Students believe that "universal gate" means they can replace every gate in a circuit one-to-one with a NAND or NOR gate.' },
                { id: 'c', prompt: 'Draw the circuit diagram for implementing an AND gate using only NOR gates.', answer: 'Three NOR gates are required',
                  options: ['Three NOR gates are required', 'NAND makes AND with two gates', 'universal gate'],
                  hint: 'If stuck, revisit c11_cs_cbse_02_009 (De Morgan\'s Theorems) and c11_cs_cbse_02_012 (Universal.',
                  misconception: 'Students believe that "universal gate" means they can replace every gate in a circuit one-to-one with a NAND or NOR gate.' },
                { id: 'd', prompt: 'Compare the number of gates required to implement an XOR gate using only NAND gates versus only NOR gates. Which implementation is more efficient and why?', answer: 'XOR requires 4 NAND gates in its minimal form (using the structure: NAND(NAND(A,',
                  options: ['XOR requires 4 NAND gates in its minimal form (using the structure: NAND(NAND(A,', 'universal gate'],
                  hint: 'If stuck, revisit c11_cs_cbse_02_009 (De Morgan\'s Theorems) and c11_cs_cbse_02_012 (Universal.',
                  misconception: 'Students believe that "universal gate" means they can replace every gate in a circuit one-to-one with a NAND or NOR gate.' }
          ],
            remediations: { 'universal-gate-means-they-can': { steps: ['If a student shows this misconception, immediately return to De Morgan\'s theorems (node 009) and have them prove: (A·B).', 'Then have them build the 2-NAND AND gate and 3-NOR AND gate on a breadboard or simulator, measuring outputs for all 4.', 'Force them to write the Boolean expression at each gate output.', 'Only after they see the algebraic derivation match the physical circuit should they attempt new implementations.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "universal gate" means they can replace every gate in a circuit one-to-one with a NAND or NOR.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since NAND and NOR are both universal, any circuit built with NAND gates can be directly converted to NOR gates by simply replacing each.', answer: 'The claim is false',
                  options: ['The claim is false', 'can implement any function', 'gate-for-gate substitutable', 'universal gate'],
                  hint: 'If stuck, revisit c11_cs_cbse_02_009 (De Morgan\'s Theorems) and c11_cs_cbse_02_012 (Universal.',
                  misconception: 'Students believe that "universal gate" means they can replace every gate in a circuit one-to-one with a NAND or NOR gate.' },
                { id: 'b', prompt: 'Design a circuit that implements the Boolean function F = (A + B)·(C + D) using only NAND gates.', answer: 'Step 1: Apply double complementation: F = ((A + B)·(C + D))\'\'',
                  options: ['Step 1: Apply double complementation: F = ((A + B)·(C + D))\'\'', 'universal gate'],
                  hint: 'If stuck, revisit c11_cs_cbse_02_009 (De Morgan\'s Theorems) and c11_cs_cbse_02_012 (Universal.',
                  misconception: 'Students believe that "universal gate" means they can replace every gate in a circuit one-to-one with a NAND or NOR gate.' }
          ],
            remediations: { 'universal-gate-means-they-can': { steps: ['If a student shows this misconception, immediately return to De Morgan\'s theorems (node 009) and have them prove: (A·B).', 'Then have them build the 2-NAND AND gate and 3-NOR AND gate on a breadboard or simulator, measuring outputs for all 4.', 'Force them to write the Boolean expression at each gate output.', 'Only after they see the algebraic derivation match the physical circuit should they attempt new implementations.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_014', difficulty: 'standard',
          question: 'The XOR (Exclusive OR) gate outputs 1 only when the number of 1\'s in its inputs.',
          hint: 'If stuck, revisit De Morgan\'s theorems (c11_cs_cbse_02_009) and practice converting.',
          misconception: 'Students often believe XOR and XNOR are just "OR with a twist" and that a 3-input XOR outputs 1 only when exactly one.',
          parts: [
                { id: 'a', prompt: 'Draw the logic symbol for a 2-input XOR gate and write its truth table.', answer: 'The logic symbol is an OR gate with an additional curved line on the input side',
                  options: ['The logic symbol is an OR gate with an additional curved line on the input side', 'one or both', 'exactly one', 'OR with a twist'],
                  hint: 'If stuck, revisit De Morgan\'s theorems (c11_cs_cbse_02_009) and practice converting a simple.',
                  misconception: 'Students often believe XOR and XNOR are just "OR with a twist" and that a 3-input XOR outputs 1 only when exactly one input is 1 (like.' },
                { id: 'b', prompt: 'Using only 2-input NAND gates, design a circuit that implements a 2-input XOR gate. Draw the circuit diagram and write the Boolean expression at each stage.', answer: 'Step 1: XOR = A\'B + AB\'',
                  options: ['Step 1: XOR = A\'B + AB\'', 'OR with a twist'],
                  hint: 'If stuck, revisit De Morgan\'s theorems (c11_cs_cbse_02_009) and practice converting a simple.',
                  misconception: 'Students often believe XOR and XNOR are just "OR with a twist" and that a 3-input XOR outputs 1 only when exactly one input is 1 (like.' },
                { id: 'c', prompt: 'Compare the truth tables of a 3-input XOR and a 3-input XNOR. What pattern do you observe about the number of 1\'s in the input?', answer: 'For 3-input XOR, output is 1 when the number of 1\'s is odd (1 or 3)',
                  options: ['For 3-input XOR, output is 1 when the number of 1\'s is odd (1 or 3)', 'OR with a twist'],
                  hint: 'If stuck, revisit De Morgan\'s theorems (c11_cs_cbse_02_009) and practice converting a simple.',
                  misconception: 'Students often believe XOR and XNOR are just "OR with a twist" and that a 3-input XOR outputs 1 only when exactly one input is 1 (like.' }
          ],
            remediations: { 'xor-and-xnor-are-just': { steps: ['Have the student write the truth table for 3-input XOR by cascading two 2-input XORs: first compute X = A⊕B, then.', 'Ask them to count the number of 1\'s in each row and observe the pattern (odd → 1).', 'Contrast with the "exactly one 1" truth table (which has only three 1\'s).', 'Finally, derive the Boolean expression for both and show they are different: parity gives A⊕B⊕C = A\'B\'C + A\'BC\' + AB\'C.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
