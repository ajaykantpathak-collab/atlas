import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch03_p1: SimDef = {
    id: 'v3_c11_cs_ch03_p1',
    title: 'Introduction to Problem Solving · Part 1/2',
    subtitle: 'Analyse before you code: inputs, process and output, pinned down to data types.',
    classLevel: 11, subject: 'computer_science', topic: 'Introduction to Problem Solving · Part 1/2',
    chapters: ['c11_cs_ch03'],
    nodeIds: ['c11_cs_cbse_03_001', 'c11_cs_cbse_03_002', 'c11_cs_cbse_03_003', 'c11_cs_cbse_03_004', 'c11_cs_cbse_03_005', 'c11_cs_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior developer scoping a shop-billing app', intro: 'The shopkeeper wants a billing app by Friday. The fastest route starts with a pen, not a keyboard.', goal: 'Break a problem into input-process-output and design a testable algorithm before coding.' },
    discovery: {
        question: 'A student codes a kirana bill — 10% discount above ₹500, then 5% GST — and the code runs. Yet the bill is wrong. What did skipping the analysis step hide?',
        options: ['Whether GST applies to the original total or the discounted total was never decided', 'Python cannot compute percentages without a library', 'The discount should legally be applied after GST', 'input() always returns numbers, so no checking was needed'],
        answer: 'Whether GST applies to the original total or the discounted total was never decided',
        hook: 'Code is a translation — the ambiguity that breaks it was born upstream, in the analysis nobody did.',
    },
    teaching: [
        { title: 'Introduction to Problem Solving: Steps Involved', text: 'Problem solving in computer science is a systematic process of identifying a problem, analyzing its requirements, designing a step-by-step solution (algorithm), implementing it in a programming.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Draw the full IPO table for a canteen bill — inputs with data types, a conditional discount, a formatted output — then test the boundary values 499, 500 and 501.',
        labels: ['Introduction to Problem Solving', 'Analysing a Problem: Input,', 'Algorithm: Definition and Characteristics', 'Writing Algorithms for Simple', 'Representation of Algorithms: Flowcharts', 'Flowchart Symbols and Conventions'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_001', title: 'Introduction to Problem Solving: Steps Involved',
          caseStudy: { intro: 'Imagine you are building a mobile app for a local kirana store to automatically calculate the final bill after applying a 10% discount on purchases above ₹500.',
            decisions: [{ prompt: 'What are the four main steps of problem solving in computer science, in the correct order?', options: [
                { text: 'The four main steps in order are: 1) Problem Analysis (understanding inputs, outputs, and', outcome: 'The four main steps in order are: 1) Problem Analysis (understanding inputs, outputs, and.' },
                { text: 'coding first or skipping analysis', outcome: 'Not quite — Students believe problem solving equals coding. They open a Python editor immediately, write.', reveals: 'problem-solving-equals-coding' },
                { text: 'problem solving equals coding', outcome: 'Not quite — Students believe problem solving equals coding. They open a Python editor immediately, write.', reveals: 'problem-solving-equals-coding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_002', title: 'Analysing a Problem: Input, Process, Output',
          caseStudy: { intro: 'Imagine you are designing a program for your school canteen: "Calculate the total bill for a student\'s lunch order." Most students jump straight to coding, but.',
            decisions: [{ prompt: 'Define the three components of the IPO model and give one example of each for the problem: "Compute the area of a rectangle given its.', options: [
                { text: '**Correct answer:** Input – length and breadth (numeric values provided by user)', outcome: '**Correct answer:** Input – length and breadth (numeric values provided by user).' },
                { text: 'formula', outcome: 'Not quite — Students treat IPO as a *linear* fill-in-the-blanks exercise: they list inputs, then write one.', reveals: 'students-treat-ipo-as-a' },
                { text: 'calculation', outcome: 'Not quite — Students treat IPO as a *linear* fill-in-the-blanks exercise: they list inputs, then write one.', reveals: 'students-treat-ipo-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_003', title: 'Algorithm: Definition and Characteristics',
          caseStudy: { intro: 'Imagine you\'re giving directions to a friend to reach your house from school: "Walk straight, turn left at the big banyan tree, then right at the tea stall.',
            decisions: [{ prompt: 'What are the five essential characteristics that a set of instructions must satisfy to be considered an algorithm?', options: [
                { text: 'The five characteristics are: (1) Finiteness - terminates after a finite number of steps,', outcome: 'The five characteristics are: (1) Finiteness - terminates after a finite number of steps, (2).' },
                { text: 'variables', outcome: 'Not quite — Students often confuse "algorithm" with "program/code". They think an algorithm must be written.', reveals: 'students-often-confuse-algorithm-with' },
                { text: 'programming syntax', outcome: 'Not quite — Students often confuse "algorithm" with "program/code". They think an algorithm must be written.', reveals: 'students-often-confuse-algorithm-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_004', title: 'Writing Algorithms for Simple Problems',
          caseStudy: { intro: 'Imagine you\'re explaining to a younger sibling how to calculate the total bill at a stationary shop: 3 notebooks at ₹45 each, 2 pens at ₹10 each, and 1.',
            decisions: [{ prompt: 'What are the five essential structural components that every algorithm for a simple problem must contain, in the correct order?', options: [
                { text: 'The five essential components in order are: **Start**, **Input** (reading all required', outcome: 'The five essential components in order are: **Start**, **Input** (reading all required data).' },
                { text: 'Start/Stop', outcome: 'Not quite — Students treat algorithm writing as "writing the formula" – they write `SI = P*R*T/100` and call.', reveals: 'students-treat-algorithm-writing-as' },
                { text: 'math steps', outcome: 'Not quite — Students treat algorithm writing as "writing the formula" – they write `SI = P*R*T/100` and call.', reveals: 'students-treat-algorithm-writing-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_005', title: 'Representation of Algorithms: Flowcharts',
          caseStudy: { intro: 'Imagine you are giving directions to a friend to reach your house from the school gate.',
            decisions: [{ prompt: 'What is the primary purpose of using a flowchart to represent an algorithm instead of writing the steps in plain English?', options: [
                { text: 'The primary purpose is to provide a **visual representation of the control flow** that', outcome: 'The primary purpose is to provide a **visual representation of the control flow** that makes the.' },
                { text: 'flowcharts are easier to write than English', outcome: 'Not quite — **Misconception**: "Every flowchart must have at least one diamond (decision) symbol, otherwise.', reveals: 'misconception-every-flowchart-must-have' },
                { text: 'Calculate simple interest', outcome: 'Not quite — **Misconception**: "Every flowchart must have at least one diamond (decision) symbol, otherwise.', reveals: 'misconception-every-flowchart-must-have' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your club is building a billing app for the school fête: 10% discount above ₹500, then 5% GST on the payable amount. A teammate opens Python immediately and types `total*0.9*1.05`, only to ship a bill that charges a ₹400 customer the discount too — because nobody listed the conditions first.',
            decisions: [{ prompt: 'What step was skipped, and how does skipping it cause bugs?', options: [
                { text: 'Problem analysis and algorithm design were skipped: inputs (each item\'s price, quantity), processes (subtotal → check discount condition → GST on discounted amount) and outputs (itemised bill, savings, total) were never written down, so the discount condition never made it into code. A dry-run of pseudocode on ₹400 and ₹600 cases catches the bug before a line of Python exists.', outcome: 'Analysis clarifies WHAT, algorithm plans HOW, code implements, testing verifies — jumping to code merges all four into guesswork.' },
                { text: 'Nothing was skipped — coding IS problem-solving; you discover the rules as you type.', outcome: 'That\'s how the ₹400 discount bug shipped: without an explicit input/process/output list, edge conditions surface only in production.', reveals: 'coding-is-problem-solving' },
                { text: 'The only miss was testing — write code first, then just test more cases.', outcome: 'Testing finds bugs; analysis prevents them — the missing discount *condition* was a requirements gap that tests alone may never think to probe.', reveals: 'testing-replaces-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Solve on paper first; the algorithm that survives a flowchart rarely dies in an editor.',
            decisions: [{ prompt: 'What comes next? Introduction to Problem Solving · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Problem Solving · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_001', difficulty: 'standard',
          question: 'Problem solving in computer science is a systematic process of identifying.',
          hint: 'If stuck, revisit Class 8-10 word problems (c8_math_ch13_10, c10_math_cbse_03_009) and.',
          misconception: 'Students believe problem solving equals coding. They open a Python editor immediately, write `input()` statements, and.',
          parts: [
                { id: 'a', prompt: 'Compare the roles of pseudocode and flowchart in algorithm design.', answer: 'Pseudocode uses structured English-like statements to describe logic linearly',
                  options: ['Pseudocode uses structured English-like statements to describe logic linearly', 'always use flowchart', 'problem solving equals coding'],
                  hint: 'If stuck, revisit Class 8-10 word problems (c8_math_ch13_10, c10_math_cbse_03_009) and practice.',
                  misconception: 'Students believe problem solving equals coding. They open a Python editor immediately, write `input()` statements, and try to figure out.' }
          ],
            remediations: { 'problem-solving-equals-coding': { steps: ['If a student jumps to coding: 1) Close the editor.', '3) Write "INPUTS:" and list every data item the problem mentions or implies (e.g., "number of items", "price per item".', '4) Write "OUTPUTS:" and list every required result (e.g., "subtotal", "discount amount", "GST amount", "final total").', '5) Write "PROCESS:" and describe in plain English how to get from inputs to outputs, step by step.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe problem solving equals coding. They open a Python editor immediately, write `input()` statements, and.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Testing is only needed after the full program is written; debugging can be done at the end." Justify your answer with reference.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'problem solving equals coding'],
                  hint: 'If stuck, revisit Class 8-10 word problems (c8_math_ch13_10, c10_math_cbse_03_009) and practice.',
                  misconception: 'Students believe problem solving equals coding. They open a Python editor immediately, write `input()` statements, and try to figure out.' },
                { id: 'b', prompt: 'Create a new real-world problem (different from billing) that requires all four problem-solving steps.', answer: 'Example problem: "A school needs a program to determine if',
                  options: ['Example problem: "A school needs a program to determine if', 'problem solving equals coding'],
                  hint: 'If stuck, revisit Class 8-10 word problems (c8_math_ch13_10, c10_math_cbse_03_009) and practice.',
                  misconception: 'Students believe problem solving equals coding. They open a Python editor immediately, write `input()` statements, and try to figure out.' }
          ],
            remediations: { 'problem-solving-equals-coding': { steps: ['If a student jumps to coding: 1) Close the editor.', '3) Write "INPUTS:" and list every data item the problem mentions or implies (e.g., "number of items", "price per item".', '4) Write "OUTPUTS:" and list every required result (e.g., "subtotal", "discount amount", "GST amount", "final total").', '5) Write "PROCESS:" and describe in plain English how to get from inputs to outputs, step by step.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_002', difficulty: 'standard',
          question: 'The Input-Process-Output (IPO) model is a systematic framework for problem.',
          hint: 'If stuck, revisit c7_math_ch04_001 (variables in algebra) and c6_math_ch05_056 (forming.',
          misconception: 'Students treat IPO as a *linear* fill-in-the-blanks exercise: they list inputs, then write one formula in Process, then.',
          parts: [
                { id: 'a', prompt: 'Define the three components of the IPO model and give one example of each for the problem: "Compute the area of a rectangle given its length and breadth."', answer: '**Correct answer:** Input – length and breadth (numeric values provided by user)',
                  options: ['**Correct answer:** Input – length and breadth (numeric values provided by user)', 'formula', 'calculation'],
                  hint: 'If stuck, revisit c7_math_ch04_001 (variables in algebra) and c6_math_ch05_056 (forming linear.',
                  misconception: 'Students treat IPO as a *linear* fill-in-the-blanks exercise: they list inputs, then write one formula in Process, then one output.' },
                { id: 'b', prompt: 'For the problem: "A shopkeeper gives 10% discount on purchases above ₹1000.', answer: '**Correct answer:** Input: purchase_amount (float, ₹) Process: 1',
                  options: ['**Correct answer:** Input: purchase_amount (float, ₹) Process: 1', 'Net Payable: ₹XXX.XX'],
                  hint: 'If stuck, revisit c7_math_ch04_001 (variables in algebra) and c6_math_ch05_056 (forming linear.',
                  misconception: 'Students treat IPO as a *linear* fill-in-the-blanks exercise: they list inputs, then write one formula in Process, then one output.' },
                { id: 'c', prompt: 'Compare the IPO models for these two problems: (A) "Convert temperature from Celsius to Fahrenheit" (B) "Convert temperature from Celsius to Fahrenheit AND.', answer: '**Correct answer:** (A) Input: celsius (float)',
                  options: ['**Correct answer:** (A) Input: celsius (float)', 'boiling point'],
                  hint: 'If stuck, revisit c7_math_ch04_001 (variables in algebra) and c6_math_ch05_056 (forming linear.',
                  misconception: 'Students treat IPO as a *linear* fill-in-the-blanks exercise: they list inputs, then write one formula in Process, then one output.' }
          ],
            remediations: { 'students-treat-ipo-as-a': { steps: ['**Revisit the definition**: Ask the student to physically separate a recipe into "ingredients" (Input), "cooking steps".', 'Emphasise that salt (constant) is part of cooking steps, not an ingredient you buy each time.', '**Trace-back exercise**: Give a completed IPO with an error (e.g., π as input).', 'Have the student trace each output back to its source input through each process step.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_003', difficulty: 'standard',
          question: 'An algorithm is a finite sequence of well-defined, unambiguous instructions.',
          hint: 'Review the substitution method for solving linear equations (c10_math_cbse_03_005).',
          misconception: 'Students often confuse "algorithm" with "program/code". They think an algorithm must be written in a programming.',
          parts: [
                { id: 'a', prompt: 'Consider this instruction set: "To find the largest of three numbers: Step 1: Input three numbers. Step 2: Compare them. Step 3: Output the largest.', answer: 'No, it fails the Definiteness characteristic',
                  options: ['No, it fails the Definiteness characteristic', 'algorithm', 'program/code'],
                  hint: 'Review the substitution method for solving linear equations (c10_math_cbse_03_005) - identify how.',
                  misconception: 'Students often confuse "algorithm" with "program/code". They think an algorithm must be written in a programming language (Python, C++),.' },
                { id: 'b', prompt: 'Write an algorithm to calculate the simple interest given principal (P), rate (R), and time (T). Ensure your algorithm satisfies all five characteristics.', answer: 'Algorithm: 1',
                  options: ['Algorithm: 1', 'calculate interest', 'algorithm', 'program/code'],
                  hint: 'Review the substitution method for solving linear equations (c10_math_cbse_03_005) - identify how.',
                  misconception: 'Students often confuse "algorithm" with "program/code". They think an algorithm must be written in a programming language (Python, C++),.' }
          ],
            remediations: { 'students-often-confuse-algorithm-with': { steps: ['Ask student to write instructions for tying shoelaces in 5 steps.', 'Have another student follow them EXACTLY without prior knowledge.', 'When ambiguity causes failure (e.g., "make a loop" - which lace? how big?), point out: "This failed Definiteness."', 'Show the same task as a proper algorithm with precise steps (e.g., "Hold left lace end between left thumb and index.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_004', difficulty: 'standard',
          question: 'Writing algorithms for simple problems is the process of expressing a solution.',
          hint: 'Revisit node c11_cs_cbse_03_002 (Analysing a Problem: Input, Process, Output) and.',
          misconception: 'Students treat algorithm writing as "writing the formula" – they write `SI = P*R*T/100` and call it an algorithm.',
          parts: [
                { id: 'a', prompt: 'A student writes this algorithm for finding the area of a rectangle: "Step 1: Multiply length and breadth. Step 2: Read length and breadth. Step 3: Print area.', answer: 'The algorithm fails',
                  options: ['The algorithm fails', 'Algorithm: Simple Interest = Principal × Rate × Time / 100'],
                  hint: 'Revisit node c11_cs_cbse_03_002 (Analysing a Problem: Input, Process, Output) and practice IPO.',
                  misconception: 'Students treat algorithm writing as "writing the formula" – they write `SI = P*R*T/100` and call it an algorithm, omitting Start, Input.' },
                { id: 'b', prompt: 'Write a complete algorithm to calculate the total amount payable for a purchase of `n` items where each item costs ₹`p`, given a discount of `d%` on the total.', answer: '**Algorithm:** 1',
                  options: ['**Algorithm:** 1', 'Algorithm: Simple Interest = Principal × Rate × Time / 100'],
                  hint: 'Revisit node c11_cs_cbse_03_002 (Analysing a Problem: Input, Process, Output) and practice IPO.',
                  misconception: 'Students treat algorithm writing as "writing the formula" – they write `SI = P*R*T/100` and call it an algorithm, omitting Start, Input.' },
                { id: 'c', prompt: 'Two algorithms are proposed to swap values of variables A and B: **Algo X:** `temp = A; A = B; B = temp` **Algo Y:** `A = B; B = A` Analyze both and explain.', answer: '**Algo X trace:** temp=5, A=10, B=5 → Final A=10, B=5 ✓ Swapped',
                  options: ['**Algo X trace:** temp=5, A=10, B=5 → Final A=10, B=5 ✓ Swapped', 'Algorithm: Simple Interest = Principal × Rate × Time / 100'],
                  hint: 'Revisit node c11_cs_cbse_03_002 (Analysing a Problem: Input, Process, Output) and practice IPO.',
                  misconception: 'Students treat algorithm writing as "writing the formula" – they write `SI = P*R*T/100` and call it an algorithm, omitting Start, Input.' }
          ],
            remediations: { 'students-treat-algorithm-writing-as': { steps: ['**Revisit IPO table:** Have student fill a 3-column table (Input | Process | Output) for 5 simple problems (area.', '**Enforce template:** Provide a fill-in-the-blank skeleton: ``` Start Input ______, ______ ______ = ______ (calculation.', '**Practice "variable speak":** Drill reading `A = B + 5` as "Assign to A the value of B plus 5" – never "A equals.', 'Do this for 10 assignments daily until automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_005', difficulty: 'standard',
          question: 'A flowchart is a diagrammatic representation of an algorithm that uses.',
          hint: 'Revisit c11_cs_cbse_03_004: practice writing 5 sequential algorithms (e.g., area.',
          misconception: '**Misconception**: "Every flowchart must have at least one diamond (decision) symbol, otherwise it\'s not a real.',
          parts: [
                { id: 'a', prompt: 'A student draws a flowchart for "Calculate the total cost of 5 pens at ₹10 each" and uses a **rectangle** for the step "Input number of pens and price per.', answer: 'The rectangle represents a **process/computation** (e.g., multiplication), while',
                  options: ['The rectangle represents a **process/computation** (e.g., multiplication), while', 'Calculate simple interest', 'Is SI calculated?'],
                  hint: 'Revisit c11_cs_cbse_03_004: practice writing 5 sequential algorithms (e.g., area of triangle.',
                  misconception: '**Misconception**: "Every flowchart must have at least one diamond (decision) symbol, otherwise it\'s not a real flowchart." **Why.' }
          ],
            remediations: { 'misconception-every-flowchart-must-have': { steps: ['**Show a side-by-side comparison**: Take the simple interest algorithm.', 'Draw two flowcharts — one with only sequential symbols (correct), one with a forced diamond (incorrect).', 'Ask: "What question does the diamond actually ask?', '**Explicitly define the rule**: "A decision symbol is used **only when the next step depends on a condition with two.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_006', difficulty: 'standard',
          question: 'Flowchart symbols are standardized geometric shapes used to visually represent.',
          hint: 'Revisit c11_cs_cbse_03_004 (Writing Algorithms for Simple Problems) and practice writing.',
          misconception: 'Students believe the **diamond decision symbol can have more than two outgoing arrows** for multi-way choices (e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Flowchart symbols are standardized geometric shapes used to visually represent the',
                  options: ['Flowchart symbols are standardized geometric shapes used to visually represent the', 'Problem solving in computer science is a systematic process of identifying a problem,', 'The Input-Process-Output (IPO) model is a systematic framework for problem analysis that', 'An algorithm is a finite sequence of well-defined, unambiguous instructions that, given a'],
                  hint: 'Revisit c11_cs_cbse_03_004 (Writing Algorithms for Simple Problems) and practice writing 3-4.',
                  misconception: 'Students believe the **diamond decision symbol can have more than two outgoing arrows** for multi-way choices (e.g., menu: 1, 2, 3, 4).' }
          ],
            remediations: { 'the-diamond-decision-symbol-can': { steps: ['Ask: "How does the computer check this?', 'Does it ask one question with four answers?" 3.', 'Demonstrate: Computer asks "Is choice == 1?" (Diamond 1).', 'If No → "Is choice == 2?" (Diamond 2).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
