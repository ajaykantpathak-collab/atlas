import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch03_p2: SimDef = {
    id: 'v3_c11_cs_ch03_p2',
    title: 'Introduction to Problem Solving · Part 2/2',
    subtitle: 'Analyse before you code: inputs, process and output, pinned down to data types.',
    classLevel: 11, subject: 'computer_science', topic: 'Introduction to Problem Solving · Part 2/2',
    chapters: ['c11_cs_ch03'],
    nodeIds: ['c11_cs_cbse_03_007', 'c11_cs_cbse_03_008', 'c11_cs_cbse_03_009', 'c11_cs_cbse_03_010', 'c11_cs_cbse_03_011', 'c11_cs_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior developer scoping a shop-billing app', intro: 'The shopkeeper wants a billing app by Friday. The fastest route starts with a pen, not a keyboard.', goal: 'Break a problem into input-process-output and design a testable algorithm before coding.' },
    discovery: {
        question: 'A student codes a kirana bill — 10% discount above ₹500, then 5% GST — and the code runs. Yet the bill is wrong. What did skipping the analysis step hide?',
        options: ['Whether GST applies to the original total or the discounted total was never decided', 'Python cannot compute percentages without a library', 'The discount should legally be applied after GST', 'input() always returns numbers, so no checking was needed'],
        answer: 'Whether GST applies to the original total or the discounted total was never decided',
        hook: 'Code is a translation — the ambiguity that breaks it was born upstream, in the analysis nobody did.',
    },
    teaching: [
        { title: 'Pseudocode: Writing and Conventions', text: 'Pseudocode is a structured, high-level description of an algorithm that uses natural language mixed with programming-like constructs (keywords, indentation, control structures) to express logic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Draw the full IPO table for a canteen bill — inputs with data types, a conditional discount, a formatted output — then test the boundary values 499, 500 and 501.',
        labels: ['Pseudocode: Writing and Conventions', 'Decision Making in Algorithms', 'Iteration and Loops', 'Tracing an Algorithm with', 'Decomposition: Breaking a Problem', 'Efficiency of Algorithms: Time'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_007', title: 'Pseudocode: Writing and Conventions',
          caseStudy: { intro: 'Imagine you are explaining to a friend how to calculate the total cost of items in a shopping cart including GST, but your friend doesn\'t know Python or C++.',
            decisions: [{ prompt: 'What is the primary purpose of using indentation in pseudocode?', options: [
                { text: 'Indentation visually represents the block structure of control statements (IF, WHILE,', outcome: 'Indentation visually represents the block structure of control statements (IF, WHILE, FOR), showing.' },
                { text: 'indentation is optional', outcome: 'Not quite — Students often write pseudocode that is essentially Python code with missing colons and parentheses.', reveals: 'students-often-write-pseudocode-that' },
                { text: 'it makes the code look pretty', outcome: 'Not quite — Students often write pseudocode that is essentially Python code with missing colons and parentheses.', reveals: 'students-often-write-pseudocode-that' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_008', title: 'Decision Making in Algorithms: Branching',
          caseStudy: { intro: 'Imagine you are designing an algorithm for an automatic railway ticket vending machine.',
            decisions: [{ prompt: 'What is the primary purpose of a decision diamond in a flowchart, and how many outgoing flow lines can it have?', options: [
                { text: 'A decision diamond represents a condition that evaluates to true or false', outcome: 'A decision diamond represents a condition that evaluates to true or false; it must have exactly two.' },
                { text: 'it can have multiple outgoing lines for multiple conditions', outcome: 'Not quite — Students often believe that in an else-if ladder (multiple mutually exclusive conditions), the.', reveals: 'in-an-else-if-ladder' },
                { text: 'a single diamond can handle an else-if ladder without nesting', outcome: 'Not quite — Students often believe that in an else-if ladder (multiple mutually exclusive conditions), the.', reveals: 'in-an-else-if-ladder' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_009', title: 'Iteration and Loops in Algorithms',
          caseStudy: { intro: 'Imagine you need to calculate the total electricity bill for an apartment complex with 50 flats — each flat\'s bill depends on its meter reading.',
            decisions: [{ prompt: 'Define the three essential components of a loop structure and state the purpose of each component in one sentence.', options: [
                { text: 'The three components are: (1) Initialisation', outcome: 'The three components are: (1) Initialisation — sets the starting value of the loop control variable.' },
                { text: 'update', outcome: 'Not quite — Students believe the loop condition is checked AFTER the loop body executes in a while loop.', reveals: 'the-loop-condition-is-checked' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_010', title: 'Tracing an Algorithm with Dry Run',
          caseStudy: { intro: 'Imagine you wrote a recipe for "Perfect Masala Chai" with steps like "boil water, add tea leaves, simmer for 2 minutes, add milk, boil once more." Before.',
            decisions: [{ prompt: 'What is the primary purpose of performing a dry run on an algorithm before coding it?', options: [
                { text: 'The primary purpose is to verify the algorithm\'s logical correctness by manually', outcome: 'The primary purpose is to verify the algorithm\'s logical correctness by manually executing it with.' },
                { text: 'to check syntax errors', outcome: 'Not quite — Students treat dry run as "mental execution" without writing a trace table, believing they can.', reveals: 'students-treat-dry-run-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_011', title: 'Decomposition: Breaking a Problem into Sub-problems',
          caseStudy: { intro: 'Start by asking: "Imagine you have to organize a school event for 500 students.',
            decisions: [{ prompt: 'What is the primary purpose of decomposition in problem solving?', options: [
                { text: 'The primary purpose of decomposition is to break a complex problem into smaller, more', outcome: 'The primary purpose of decomposition is to break a complex problem into smaller, more manageable.' },
                { text: 'to write code faster', outcome: 'Not quite — Students often think decomposition means simply listing the steps of a solution in order (like.', reveals: 'decomposition-means-simply-listing-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_03_012', title: 'Efficiency of Algorithms: Time and Space Considerations',
          scaffold: { problem: 'Analyse the exact time complexity T(n) and space complexity S(n) of the following algorithm that finds the maximum element in a 2D matrix.',
            steps: [
            { text: 'Identify the basic operation — the comparison `A[i][j] > max_val` executes most frequently and dominates runtime.' },
            { text: 'Count executions — outer loop runs m times, inner loop runs n times per outer iteration, so comparison executes m ×.' },
            { text: 'Account for other operations — initial assignment (1), loop index updates (m + m×n), return (1) — all are lower-order.' },
            { text: 'Write exact T(n,m) = m·n + (m + m·n) + 2 = 2mn + m + 2 operations.' },
            { text: 'Simplify to asymptotic form — dominant term is mn, so T(m,n) = Θ(mn) = O(mn). Since m,n → ∞ together, we write O(mn).' },
            { text: 'Space complexity — input matrix A[m][n] is given (not counted in auxiliary space).', faded: true, blankAnswer: 'Time Complexity: Θ(mn) or O(mn); Auxiliary Space.' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your club is building a billing app for the school fête: 10% discount above ₹500, then 5% GST on the payable amount. A teammate opens Python immediately and types `total*0.9*1.05`, only to ship a bill that charges a ₹400 customer the discount too — because nobody listed the conditions first.',
            decisions: [{ prompt: 'What step was skipped, and how does skipping it cause bugs?', options: [
                { text: 'Problem analysis and algorithm design were skipped: inputs (each item\'s price, quantity), processes (subtotal → check discount condition → GST on discounted amount) and outputs (itemised bill, savings, total) were never written down, so the discount condition never made it into code. A dry-run of pseudocode on ₹400 and ₹600 cases catches the bug before a line of Python exists.', outcome: 'Analysis clarifies WHAT, algorithm plans HOW, code implements, testing verifies — jumping to code merges all four into guesswork.' },
                { text: 'Nothing was skipped — coding IS problem-solving; you discover the rules as you type.', outcome: 'That\'s how the ₹400 discount bug shipped: without an explicit input/process/output list, edge conditions surface only in production.', reveals: 'coding-is-problem-solving' },
                { text: 'The only miss was testing — write code first, then just test more cases.', outcome: 'Testing finds bugs; analysis prevents them — the missing discount *condition* was a requirements gap that tests alone may never think to probe.', reveals: 'testing-replaces-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_03_012', title: 'You made it',
          caseStudy: { intro: 'Solve on paper first; the algorithm that survives a flowchart rarely dies in an editor.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_007', difficulty: 'standard',
          question: 'Pseudocode is a structured, high-level description of an algorithm that uses.',
          hint: 'Revisit flowchart symbols and conventions (c11_cs_cbse_03_006) and practice converting.',
          misconception: 'Students often write pseudocode that is essentially Python code with missing colons and parentheses (e.g., `if x > 0.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Pseudocode is a structured, high-level description of an algorithm that uses natural',
                  options: ['Pseudocode is a structured, high-level description of an algorithm that uses natural', 'Problem solving in computer science is a systematic process of identifying a problem,', 'The Input-Process-Output (IPO) model is a systematic framework for problem analysis that', 'An algorithm is a finite sequence of well-defined, unambiguous instructions that, given a'],
                  hint: 'Revisit flowchart symbols and conventions (c11_cs_cbse_03_006) and practice converting each symbol.',
                  misconception: 'Students often write pseudocode that is essentially Python code with missing colons and parentheses (e.g., `if x > 0: print(x)`).' }
          ],
            remediations: { 'students-often-write-pseudocode-that': { steps: ['Show side-by-side comparison: a Python snippet vs.', 'correct pseudocode for the same logic.', 'Highlight every syntax difference (keywords, assignment, block delimiters).', 'Give the student a flowchart (from c11_cs_cbse_03_006) and ask them to convert each symbol to its pseudocode keyword.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_008', difficulty: 'standard',
          question: 'Decision making in algorithms (branching) is a control structure that allows.',
          hint: 'If stuck, revisit c11_cs_cbse_03_007 (Pseudocode conventions) and c11_cs_cbse_03_006.',
          misconception: 'Students often believe that in an else-if ladder (multiple mutually exclusive conditions), the conditions are evaluated.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a decision diamond in a flowchart, and how many outgoing flow lines can it have?', answer: 'A decision diamond represents a condition that evaluates to true or false',
                  options: ['A decision diamond represents a condition that evaluates to true or false', 'it can have multiple outgoing lines for multiple conditions', 'a single diamond can handle an else-if ladder without nesting'],
                  hint: 'If stuck, revisit c11_cs_cbse_03_007 (Pseudocode conventions) and c11_cs_cbse_03_006 (Flowchart.',
                  misconception: 'Students often believe that in an else-if ladder (multiple mutually exclusive conditions), the conditions are evaluated simultaneously.' },
                { id: 'b', prompt: 'Compare the following two pseudocode fragments for checking if a number `n` is positive, negative, or zero. Are they logically equivalent? Justify.', answer: 'No, they are not logically equivalent for all inputs',
                  options: ['No, they are not logically equivalent for all inputs', 'yes they are equivalent'],
                  hint: 'If stuck, revisit c11_cs_cbse_03_007 (Pseudocode conventions) and c11_cs_cbse_03_006 (Flowchart.',
                  misconception: 'Students often believe that in an else-if ladder (multiple mutually exclusive conditions), the conditions are evaluated simultaneously.' }
          ],
            remediations: { 'in-an-else-if-ladder': { steps: ['To remediate: (1) Have the student trace both versions of the grade algorithm with marks=95 using a dry-run table.', '(2) Ask them to articulate in words: "The algorithm checks conditions from top to bottom and stops at the first true.', '(4) Emphasise that the most restrictive (highest threshold) condition must come first.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_009', difficulty: 'standard',
          question: 'Iteration in algorithms is a control structure that repeats a sequence.',
          hint: 'Review c11_cs_cbse_03_008 (Decision Making in Algorithms: Branching) — specifically.',
          misconception: 'Students believe the loop condition is checked AFTER the loop body executes in a while loop (confusing it with.',
          parts: [
                { id: 'a', prompt: 'Define the three essential components of a loop structure and state the purpose of each component in one sentence.', answer: 'The three components are: (1) Initialisation',
                  options: ['The three components are: (1) Initialisation', 'update'],
                  hint: 'Review c11_cs_cbse_03_008 (Decision Making in Algorithms: Branching) — specifically practice.',
                  misconception: 'Students believe the loop condition is checked AFTER the loop body executes in a while loop (confusing it with repeat-until).' },
                { id: 'b', prompt: 'Explain in your own words the difference between a pre-test loop (while) and a post-test loop (repeat-until/do-while) using a real-life analogy.', answer: 'A pre-test loop (while) checks the condition BEFORE executing the body',
                  options: ['A pre-test loop (while) checks the condition BEFORE executing the body', 'they are functionally identical', 'post-test is always better'],
                  hint: 'Review c11_cs_cbse_03_008 (Decision Making in Algorithms: Branching) — specifically practice.',
                  misconception: 'Students believe the loop condition is checked AFTER the loop body executes in a while loop (confusing it with repeat-until).' },
                { id: 'c', prompt: 'Compare the following two loop fragments. Do they produce the same output? Justify your answer by tracing both with n = 5.', answer: 'Yes, both produce identical output: 1 2 3 4 5',
                  options: ['Yes, both produce identical output: 1 2 3 4 5', 'Fragment B prints 6', 'Fragment A misses 1', 'continue while i > n'],
                  hint: 'Review c11_cs_cbse_03_008 (Decision Making in Algorithms: Branching) — specifically practice.',
                  misconception: 'Students believe the loop condition is checked AFTER the loop body executes in a while loop (confusing it with repeat-until).' }
          ],
            remediations: { 'the-loop-condition-is-checked': { steps: ['Draw a flowchart of the while loop showing the decision diamond BEFORE the process box.', 'Have the student physically trace with a finger: "Start → Check condition → If TRUE → Body → Update → Back to Check →.', 'Give a minimal example: `i ← 5; while i ≤ 3 do output i; i ← i + 1 end while` — ask "How many times does output.', 'Contrast with repeat-until flowchart where decision diamond is AFTER process box.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the loop condition is checked AFTER the loop body executes in a while loop (confusing it with.',
          parts: [
                { id: 'a', prompt: 'A student writes this loop to compute the sum of first 10 even numbers: `sum ← 0; i ← 2; while i ≤ 20 do sum ← sum + i; i ← i + 1 end while`.', answer: 'The algorithm is INCORRECT',
                  options: ['The algorithm is INCORRECT', 'it\'s correct'],
                  hint: 'Review c11_cs_cbse_03_008 (Decision Making in Algorithms: Branching) — specifically practice.',
                  misconception: 'Students believe the loop condition is checked AFTER the loop body executes in a while loop (confusing it with repeat-until).' }
          ],
            remediations: { 'the-loop-condition-is-checked': { steps: ['Draw a flowchart of the while loop showing the decision diamond BEFORE the process box.', 'Have the student physically trace with a finger: "Start → Check condition → If TRUE → Body → Update → Back to Check →.', 'Give a minimal example: `i ← 5; while i ≤ 3 do output i; i ← i + 1 end while` — ask "How many times does output.', 'Contrast with repeat-until flowchart where decision diamond is AFTER process box.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_010', difficulty: 'standard',
          question: 'A dry run is the systematic manual simulation of an algorithm\'s execution using.',
          hint: 'Revisit c11_cs_cbse_03_007 (pseudocode conventions) and c7_math_ch04_009 (substitution.',
          misconception: 'Students treat dry run as "mental execution" without writing a trace table, believing they can track variables in their.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of performing a dry run on an algorithm before coding it?', answer: 'The primary purpose is to verify the algorithm\'s logical correctness by manually',
                  options: ['The primary purpose is to verify the algorithm\'s logical correctness by manually', 'to check syntax errors'],
                  hint: 'Revisit c11_cs_cbse_03_007 (pseudocode conventions) and c7_math_ch04_009 (substitution into.',
                  misconception: 'Students treat dry run as "mental execution" without writing a trace table, believing they can track variables in their head.' }
          ],
            remediations: { 'students-treat-dry-run-as': { steps: ['**Enforce trace table discipline**: Require a ruled table with columns: Step#, Line#, every variable, every condition.', 'No mental tracing allowed for first 10 problems.', '**Boundary-first testing**: For every loop, make the student trace N=0, N=1, N=2 before "typical" N=5.', 'Ask: "How many times does line X execute when N=0?" This exposes off-by-one immediately.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_011', difficulty: 'standard',
          question: 'Decomposition is the problem-solving technique of breaking down a complex.',
          hint: 'If stuck, revisit "Analysing a Problem: Input, Process, Output" (c11_cs_cbse_03_002) and.',
          misconception: 'Students often think decomposition means simply listing the steps of a solution in order (like a sequential algorithm).',
          parts: [
                { id: 'a', prompt: 'Given the problem: "Find the average of three numbers entered by the user." Decompose this into at least three sub-problems, specifying the input and output.', answer: 'Sub-problem 1: Input three numbers (input: user entries, output: three numbers)',
                  options: ['Sub-problem 1: Input three numbers (input: user entries, output: three numbers)', 'input and compute sum together', 'merges steps (e'],
                  hint: 'If stuck, revisit "Analysing a Problem: Input, Process, Output" (c11_cs_cbse_03_002) and practice.',
                  misconception: 'Students often think decomposition means simply listing the steps of a solution in order (like a sequential algorithm).' }
          ],
            remediations: { 'decomposition-means-simply-listing-the': { steps: ['To address this, first show the difference between a sequential algorithm and a decomposed structure.', 'Use a familiar math example: solving a multi-step word problem by defining separate functions for each calculation.', 'Then have the student practice by taking a simple algorithm (like finding max of three) and extracting a reusable.', 'Ask: "If you needed to compare two numbers in another program, could you copy this part?" This highlights modularity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_03_012', difficulty: 'standard',
          question: 'Algorithm efficiency measures the computational resources an algorithm consumes.',
          hint: 'Revisit Class 9 Math Chapter 8 (Arithmetic Progressions) for summation formulas and Class.',
          misconception: 'Students believe "time complexity is the actual running time in seconds" and "space complexity is the total memory used.',
          parts: [
                { id: 'a', prompt: 'State the formal definition of Big-O notation: f(n) = O(g(n)) if and only if there exist positive constants c and n₀ such that... (complete the definition).', answer: 'f(n) = O(g(n)) iff ∃ c > 0, n₀ > 0 such that 0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀',
                  options: ['f(n) = O(g(n)) iff ∃ c > 0, n₀ > 0 such that 0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀', 'f(n) ≤ g(n) for all n', 'eventually', 'time complexity is the actual running time in seconds'],
                  hint: 'Revisit Class 9 Math Chapter 8 (Arithmetic Progressions) for summation formulas and Class 8 Math.',
                  misconception: 'Students believe "time complexity is the actual running time in seconds" and "space complexity is the total memory used by the program.' },
                { id: 'b', prompt: 'Explain why the statement "Algorithm A with time complexity 100n + 5 is faster than Algorithm B with time complexity 0.01n² for all input sizes" is false, and.', answer: 'For small n (n < 10,000), 100n + 5 < 0.01n², so A is actually faster initially',
                  options: ['For small n (n < 10,000), 100n + 5 < 0.01n², so A is actually faster initially', 'time complexity is the actual running time in seconds', 'space complexity is the total memory used by the program including input array'],
                  hint: 'Revisit Class 9 Math Chapter 8 (Arithmetic Progressions) for summation formulas and Class 8 Math.',
                  misconception: 'Students believe "time complexity is the actual running time in seconds" and "space complexity is the total memory used by the program.' },
                { id: 'c', prompt: 'Analyse the time complexity of the following pseudocode fragment in terms of n. Show your counting of basic operations.', answer: 'The inner loop runs i times for each i from 1 to n',
                  options: ['The inner loop runs i times for each i from 1 to n', 'time complexity is the actual running time in seconds', 'space complexity is the total memory used by the program including input array'],
                  hint: 'Revisit Class 9 Math Chapter 8 (Arithmetic Progressions) for summation formulas and Class 8 Math.',
                  misconception: 'Students believe "time complexity is the actual running time in seconds" and "space complexity is the total memory used by the program.' }
          ],
            remediations: { 'time-complexity-is-the-actual': { steps: ['Ask the student to trace both algorithms on n=5 with a stopwatch (real time) and count operations (abstract time).', 'Have them list every variable in memory during merge sort execution, including the temporary merge array — highlight.', 'Re-define time complexity as "number of basic operations as a function of n" and space complexity as "extra memory.', 'Practice classifying 5 algorithms: label each variable as "input", "auxiliary", or "loop counter" to build the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
