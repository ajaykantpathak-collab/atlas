import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch01_p3: SimDef = {
    id: 'v3_c11_cs_ch01_p3',
    title: 'Computer System and Organisation · Part 3/3',
    subtitle: 'Draw the line between calculators and computers, and between memory and storage.',
    classLevel: 11, subject: 'computer_science', topic: 'Computer System and Organisation · Part 3/3',
    chapters: ['c11_cs_ch01'],
    nodeIds: ['c11_cs_cbse_01_013', 'c11_cs_cbse_01_014', 'c11_cs_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a systems archivist sorting devices and data formats', intro: 'A museum labels every calculating gadget a \'computer.\' Your job is to correct the record.', goal: 'Identify the components of a computer system and classify data and software correctly.' },
    discovery: {
        question: 'An abacus, Pascal\'s Pascaline and Babbage\'s Analytical Engine all perform calculations. Only one is a true ancestor of the computer — which, and what\'s the dividing line?',
        options: ['The Analytical Engine — it was programmable via punched cards, with input, store, mill and output', 'The abacus — it is the oldest, so everything descends from it', 'The Pascaline — gears make it a real machine, unlike the others', 'All three — calculation alone makes a device a computer'],
        answer: 'The Analytical Engine — it was programmable via punched cards, with input, store, mill and output',
        hook: 'Calculating isn\'t computing — the line is programmability: stored instructions driving automatic execution.',
    },
    teaching: [
        { title: 'Binary Arithmetic: Addition and Subtraction', text: 'Binary arithmetic is the set of rules for performing addition and subtraction operations on binary numbers (base-2), using only digits 0 and 1, where addition follows carry rules (1+1=10) and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort a school\'s attendance data into structured, unstructured and semi-structured, then separate the hardware from the software that boots a laptop.',
        labels: ['Binary Arithmetic: Addition', 'Boolean Algebra: Basic Operations', 'Logic Gates: AND, OR,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_01_013', title: 'Binary Arithmetic: Addition and Subtraction',
          scaffold: { problem: 'A microcontroller reads two 8-bit sensor values: 01011011 (91 in decimal) and 00100101 (37 in decimal). Add them using binary addition.',
            steps: [
            { text: 'Write both 8-bit numbers aligned by LSB (rightmost bit). Identify that we add column by column from right (2⁰) to left.' },
            { text: 'Apply binary addition rules per column: 0+0=0 (carry 0), 0+1=1 (carry 0), 1+0=1 (carry 0), 1+1=0 (carry 1).' },
            { text: 'Perform the addition:' },
            { text: 'Convert result 10000000₂ to decimal: 1×2⁷ = 128.' },
            { text: 'Verify: 91 + 37 = 128 ✓. No overflow in unsigned 8-bit (max 255).', faded: true, blankAnswer: '10000000₂ (128₁₀)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_01_014', title: 'Boolean Algebra: Basic Operations and De Morgan\'s Laws',
          scaffold: { problem: 'Simplify the Boolean expression F = (A + B\')·(A + C) using Boolean laws. Show each step with the law name.',
            steps: [
            { text: 'Apply Distributive Law (OR over AND): (A + B\')·(A + C) = A + (B\'·C). [Law: A + (B·C) = (A+B)·(A+C) in reverse]' },
            { text: 'Expression is now A + B\'·C. Check for further simplification: No common factors, no absorption possible (A does not.' },
            { text: 'Verify with truth table for A=0,B=1,C=0: Original: (0+0)·(0+0)=0·0=0. Simplified: 0 + (0·0)=0. Match.' },
            { text: 'Verify for A=0,B=0,C=1: Original: (0+1)·(0+1)=1·1=1. Simplified: 0 + (1·1)=1. Match.' },
            { text: 'Final simplified expression: F = A + B\'·C.', faded: true, blankAnswer: 'F = A + B\'·C' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_01_015', title: 'Logic Gates: AND, OR, NOT, NAND, NOR, XOR',
          scaffold: { problem: 'Design a logic circuit for a water pump controller. The pump (output P) should turn ON if: (i) the reservoir level is LOW (L=1) AND the.',
            steps: [
            { text: 'Identify inputs and output. Inputs: L (reservoir low), M (manual override), F (fire alarm). Output: P (pump ON).' },
            { text: 'Translate conditions into Boolean sub-expressions. Condition (i): L=1 AND M=0 → L · M\'. Condition (ii): F=1 → F.' },
            { text: 'Combine with OR because either condition activates the pump: P = (L · M\') + F.' },
            { text: 'Draw the circuit. (a) NOT gate for M → M\'. (b) AND gate with inputs L and M\' → output X = L·M\'.' },
            { text: 'Verify with a truth table for all 8 combinations of L, M, F. Check that P=1 exactly when (L=1,M=0) or (F=1).' },
            { text: 'Interpret result. The circuit meets the specification. Note that if F=1, pump runs regardless of L and M (fire safety.', faded: true, blankAnswer: 'Boolean expression: P = L·M\' + F. Circuit: NOT gate on.' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'The school computer lab is upgrading. The budget sheet from a vendor lists: \'Intel i5 CPU, 16 GB memory, 512 GB memory, monitor, keyboard, mouse.\' A junior intern asks why \'memory\' appears twice with different numbers, and whether the monitor is \'part of the computer or just an accessory\'.',
            decisions: [{ prompt: 'Explain the listing correctly.', options: [
                { text: 'The two \'memory\' lines are different things: 16 GB is RAM — volatile primary memory the CPU works in directly, wiped at power-off; 512 GB is secondary storage (SSD) — non-volatile, keeps files permanently but isn\'t accessed directly by the CPU. And the monitor is an output device: the computer system = hardware (CPU, memory, I/O, storage) + software, not just the CPU box.', outcome: 'Every computer system = four hardware blocks (CPU, memory, input, output) plus software; \'memory\' in ads conflates RAM with storage.' },
                { text: 'It\'s a typo — memory is memory; 16 GB and 512 GB are the same thing listed twice.', outcome: 'RAM and storage serve different roles: one is the CPU\'s volatile workbench, the other the permanent filing cabinet — speed, volatility and CPU access all differ.', reveals: 'memory-equals-storage' },
                { text: 'The monitor and keyboard ARE the computer — the box inside just does processing.', outcome: 'That inverts it: input/output devices are peripherals serving the CPU; the computer is the whole input→process→output system, not any single component.', reveals: 'peripherals-are-the-computer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'A computer isn\'t a clever calculator — it\'s a machine that runs stored instructions on whatever data you feed it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_013', difficulty: 'standard',
          question: 'Binary arithmetic is the set of rules for performing addition and subtraction.',
          hint: 'Revisit c11_cs_cbse_01_011 (binary place values) and c11_cs_cbse_01_012 (conversion.',
          misconception: 'Students believe binary subtraction "is just like decimal subtraction" and try to apply decimal borrow rules (e.g.',
          parts: [
                { id: 'a', prompt: 'Compare the direct subtraction method and the 2\'s complement method for computing 1010 - 0110. Which method is preferred in computer hardware and why?', answer: 'Direct: 1010 - 0110 = 0100 (requires borrow logic, variable-time propagation)',
                  options: ['Direct: 1010 - 0110 = 0100 (requires borrow logic, variable-time propagation)', 'direct is easier for humans', 'is just like decimal subtraction'],
                  hint: 'Revisit c11_cs_cbse_01_011 (binary place values) and c11_cs_cbse_01_012 (conversion methods).',
                  misconception: 'Students believe binary subtraction "is just like decimal subtraction" and try to apply decimal borrow rules (e.g., borrowing 10 instead.' }
          ],
            remediations: { 'binary-subtraction-is-just-like': { steps: ['Have the student physically model borrowing with base-2 blocks: use 1×1×1 cubes for 1s, 1×1×2 rods for 2s (10₂), 1×2×2.', 'For 1000₂ - 0001₂, show one 8-block (1000₂).', 'To subtract one 1-block, break the 8-block into two 4-blocks (100₂), break one 4-block into two 2-blocks (10₂), break.', 'Remaining: one 4-block + one 2-block + one 1-block = 0111₂.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe binary subtraction "is just like decimal subtraction" and try to apply decimal borrow rules (e.g.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "In 8-bit 2\'s complement arithmetic, adding 01111111 (+127) and 00000001 (+1) gives 10000000, which correctly represents +128." Is this.', answer: 'The claim is FALSE',
                  options: ['The claim is FALSE', 'it\'s correct because binary addition works', 'is just like decimal subtraction'],
                  hint: 'Revisit c11_cs_cbse_01_011 (binary place values) and c11_cs_cbse_01_012 (conversion methods).',
                  misconception: 'Students believe binary subtraction "is just like decimal subtraction" and try to apply decimal borrow rules (e.g., borrowing 10 instead.' },
                { id: 'b', prompt: 'Design a 4-bit binary subtraction problem where the direct borrow method requires borrowing across three consecutive zeros, and the 2\'s complement method.', answer: 'Problem: 1000 - 0001 (8 - 1 = 7)',
                  options: ['Problem: 1000 - 0001 (8 - 1 = 7)', 'is just like decimal subtraction'],
                  hint: 'Revisit c11_cs_cbse_01_011 (binary place values) and c11_cs_cbse_01_012 (conversion methods).',
                  misconception: 'Students believe binary subtraction "is just like decimal subtraction" and try to apply decimal borrow rules (e.g., borrowing 10 instead.' }
          ],
            remediations: { 'binary-subtraction-is-just-like': { steps: ['Have the student physically model borrowing with base-2 blocks: use 1×1×1 cubes for 1s, 1×1×2 rods for 2s (10₂), 1×2×2.', 'For 1000₂ - 0001₂, show one 8-block (1000₂).', 'To subtract one 1-block, break the 8-block into two 4-blocks (100₂), break one 4-block into two 2-blocks (10₂), break.', 'Remaining: one 4-block + one 2-block + one 1-block = 0111₂.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_014', difficulty: 'standard',
          question: 'Boolean Algebra is a mathematical system for logical reasoning where variables.',
          hint: 'Revisit Class 7 Algebraic Expressions (c7_math_ch02_005, c7_math_ch02_006) for bracket.',
          misconception: 'Students often treat the \'+\' operator as arithmetic addition and \'·\' as multiplication, leading to errors like "A +.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the expression A + A\'·B simplifies to A + B. Use the concept of "absorption" or "redundancy" in your explanation.', answer: 'A + A\'·B = (A + A\')·(A + B) by distributive law = 1·(A + B) = A + B',
                  options: ['A + A\'·B = (A + A\')·(A + B) by distributive law = 1·(A + B) = A + B', 'A and A\' cancel out'],
                  hint: 'Revisit Class 7 Algebraic Expressions (c7_math_ch02_005, c7_math_ch02_006) for bracket handling and.',
                  misconception: 'Students often treat the \'+\' operator as arithmetic addition and \'·\' as multiplication, leading to errors like "A + A = 2A" or "A\' = 1/A".' },
                { id: 'b', prompt: 'Compare the truth tables of (A + B)\' and A\'·B\'. Then analyse: if a student claims (A + B)\' = A\' + B\', which specific row(s) in the truth table would expose.', answer: 'Truth table for (A+B)\': (0,0)->1, (0,1)->0, (1,0)->0, (1,1)->0',
                  options: ['Truth table for (A+B)\': (0,0)->1, (0,1)->0, (1,0)->0, (1,1)->0', 'all rows match'],
                  hint: 'Revisit Class 7 Algebraic Expressions (c7_math_ch02_005, c7_math_ch02_006) for bracket handling and.',
                  misconception: 'Students often treat the \'+\' operator as arithmetic addition and \'·\' as multiplication, leading to errors like "A + A = 2A" or "A\' = 1/A".' }
          ],
            remediations: { 'students-often-treat-the-operator': { steps: ['Have the student build a 2-variable truth table for AND, OR, NOT from scratch using only the definitions (0=False.', 'Ask them to compute (A+B)\' and A\'·B\' side-by-side for all 4 rows to visually prove De Morgan\'s.', 'Give them the expression A + A·B and ask them to evaluate for A=0,B=1 and A=1,B=0 using the truth table definitions.', 'Explicitly contrast with arithmetic: "In Boolean, 1+1=1 because TRUE OR TRUE is TRUE.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_01_015', difficulty: 'standard',
          question: 'A logic gate is an elementary electronic circuit that implements a Boolean.',
          hint: 'Revisit node c11_cs_cbse_01_014 (Boolean Algebra) and practice drawing truth tables for.',
          misconception: 'Students often treat the XOR gate as "OR with a twist" and write its Boolean expression as A + B (same as OR).',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the XOR gate is called "exclusive" OR, and give a real-life example where XOR logic is naturally used.', answer: 'XOR is "exclusive"',
                  options: ['XOR is "exclusive"', 'this input is active low'],
                  hint: 'Revisit node c11_cs_cbse_01_014 (Boolean Algebra) and practice drawing truth tables for expressions.',
                  misconception: 'Students often treat the XOR gate as "OR with a twist" and write its Boolean expression as A + B (same as OR), forgetting the exclusion.' },
                { id: 'b', prompt: 'A safety system uses two sensors A and B. The alarm (output Y) should sound if sensor A is active (1) AND sensor B is inactive (0).', answer: 'Expression: Y = A · B\' (where B\' is NOT B)',
                  options: ['Expression: Y = A · B\' (where B\' is NOT B)', 'this input is active low'],
                  hint: 'Revisit node c11_cs_cbse_01_014 (Boolean Algebra) and practice drawing truth tables for expressions.',
                  misconception: 'Students often treat the XOR gate as "OR with a twist" and write its Boolean expression as A + B (same as OR), forgetting the exclusion.' },
                { id: 'c', prompt: 'Compare the truth tables of NOR and XOR gates. For which input combinations do they produce the same output?', answer: 'NOR truth table: (0,0)→1, (0,1)→0, (1,0)→0, (1,1)→0',
                  options: ['NOR truth table: (0,0)→1, (0,1)→0, (1,0)→0, (1,1)→0', 'they are the same for three rows', 'NOR is just inverted XOR', 'this input is active low'],
                  hint: 'Revisit node c11_cs_cbse_01_014 (Boolean Algebra) and practice drawing truth tables for expressions.',
                  misconception: 'Students often treat the XOR gate as "OR with a twist" and write its Boolean expression as A + B (same as OR), forgetting the exclusion.' }
          ],
            remediations: { 'students-often-treat-the-xor': { steps: ['Have the student physically build each gate\'s truth table on paper using 0/1 cards for inputs, reinforcing the.', 'Use color-coding: red for inversion bubbles on outputs, blue for active-low inputs; practice converting between "bubble.', 'Give a side-by-side comparison: implement Y = A+B using (a) one OR gate, (b) three NAND gates (via De Morgan).', 'Count gates and measure propagation delay conceptually.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
