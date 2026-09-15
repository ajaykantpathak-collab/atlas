import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch05_p2: SimDef = {
    id: 'v3_c11_cs_ch05_p2',
    title: 'Conditional and Iterative Statements · Part 2/3',
    subtitle: 'Control the flow: conditions that decide and loops that repeat, without lying about when they check.',
    classLevel: 11, subject: 'computer_science', topic: 'Conditional and Iterative Statements · Part 2/3',
    chapters: ['c11_cs_ch05'],
    nodeIds: ['c11_cs_cbse_05_007', 'c11_cs_cbse_05_008', 'c11_cs_cbse_05_009', 'c11_cs_cbse_05_010', 'c11_cs_cbse_05_011', 'c11_cs_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer automating a rickshaw fare table', intro: 'One fixed distance, one formula — useless. Real riders go 2 km or 20 km, and your code must bend.', goal: 'Use if/elif/else, while and for to make programs decide and repeat correctly.' },
    discovery: {
        question: 'Halfway through a while loop\'s body, a variable makes the condition false. Does the loop bail out instantly?',
        options: ['No — the condition is only checked at the top; the current iteration finishes first', 'Yes — Python watches the condition like a sensor', 'Yes — but only for numeric conditions', 'No — a while loop never stops once started'],
        answer: 'No — the condition is only checked at the top; the current iteration finishes first',
        hook: 'The condition is a gate at the top of the loop, not a tripwire inside it — mid-body changes wait their turn.',
    },
    teaching: [
        { title: 'Introduction to Iteration and Loops', text: 'Iteration is the process of repeatedly executing a block of statements until a specified condition becomes false, allowing a program to automate repetitive tasks without writing the same code.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Write a countdown loop from 10 to 2, build the even-number sum two ways, then predict what Python does with "10" > 2.',
        labels: ['Introduction to Iteration', 'while Loop: Syntax', 'for Loop and', 'Nested Loops with Examples', 'break and continue Statements', 'else Clause with Loops'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_007', title: 'Introduction to Iteration and Loops',
          caseStudy: { intro: 'Imagine you need to send a personalized Diwali greeting to 500 contacts on your phone. Would you type "Happy Diwali, [Name]!" five hundred times?',
            decisions: [{ prompt: 'What are the three essential components that must be present in every well-formed loop to ensure it terminates correctly?', options: [
                { text: 'The three essential components are: (1) Initialization', outcome: 'The three essential components are: (1) Initialization — setting up the loop control variable.' },
                { text: 'condition and body', outcome: 'Not quite — Students often believe that the loop condition is checked **after** the loop body executes (like.', reveals: 'the-loop-condition-is-checked' },
                { text: 'at least one execution', outcome: 'Not quite — Students often believe that the loop condition is checked **after** the loop body executes (like.', reveals: 'the-loop-condition-is-checked' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_009', title: 'for Loop and the range() Function',
          caseStudy: { intro: 'Imagine you need to print "Happy Birthday" 5 times for a classmate\'s card. Writing `print()` five times is tedious and error-prone.',
            decisions: [{ prompt: 'What is the exact output of the following code snippet? ```python for val in range(2, 10, 3): print(val, end=\' \') ```', options: [
                { text: 'Correct output: `2 5 8 ` (with a trailing space)', outcome: 'Correct output: `2 5 8 ` (with a trailing space). A wrong answer like `2 5 8 11` reveals the.' },
                { text: 'start defaults to 0 even when two arguments are given', outcome: 'Not quite — **Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:**.', reveals: 'misconception-range-n-creates-a' },
                { text: 'the stop value is inclusive', outcome: 'Not quite — **Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:**.', reveals: 'misconception-range-n-creates-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_05_010', title: 'Nested Loops with Examples',
          scaffold: { problem: 'A school has 4 sections (A, B, C, D) and each section has 30 students.',
            steps: [
            { text: 'Identify the two dimensions — sections (4) and students per section (30).' },
            { text: 'Map sections to a list `[\'A\',\'B\',\'C\',\'D\']` for the outer loop.' },
            { text: 'Write the outer loop: `for sec in [\'A\',\'B\',\'C\',\'D\']:`.' },
            { text: 'Inside it, write the inner loop: `for roll in range(1, 31):`.' },
            { text: 'Inside the inner loop, print the combined label using f-string: `print(f"{sec}-{roll}")`.' },
            { text: 'Verify total prints = 4 × 30 = 120. Check first few: A-1, A-2... last few: D-29, D-30.', faded: true, blankAnswer: '120 lines printed, from A-1 to D-30.' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_011', title: 'break and continue Statements',
          caseStudy: { intro: 'Imagine you are scanning a stack of 100 answer sheets looking for the first student who scored above 90%.',
            decisions: [{ prompt: 'What is the output of the following code? ```python for i in range(1, 6): if i == 3: break print(i, end=\' \') ```', options: [
                { text: 'Output: `1 2 ` Explanation: The loop prints 1 and 2', outcome: 'Output: `1 2 ` Explanation: The loop prints 1 and 2. When i becomes 3, the break statement.' },
                { text: 'break completes the current iteration before exiting', outcome: 'Not quite — Students believe `break` exits ALL nested loops, not just the innermost one.', reveals: 'break-exits-all-nested-loops' },
                { text: 'break only skips the print statement', outcome: 'Not quite — Students believe `break` exits ALL nested loops, not just the innermost one.', reveals: 'break-exits-all-nested-loops' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_012', title: 'else Clause with Loops in Python',
          caseStudy: { intro: 'Imagine you are writing a program to check whether a student’s roll number exists in a sorted list of admitted students.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python for i in range(3): print(i) else: print("Loop ended") ```', options: [
                { text: 'Output: ``` 0 1 2 Loop ended ``` The `else` block executes', outcome: 'Output: ``` 0 1 2 Loop ended ``` The `else` block executes because the `for` loop exhausted the.' },
                { text: '`else` runs when the loop is not terminated by `break`', outcome: 'Not quite — Students often believe the `else` block executes when the loop condition is **initially false**.', reveals: 'the-else-block-executes-when' },
                { text: 'not terminated by `break`', outcome: 'Not quite — Students often believe the `else` block executes when the loop condition is **initially false**.', reveals: 'the-else-block-executes-when' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You code a metro-card simulator: `while balance > 0: deduct ₹40; print \'Ride OK\'; if balance hits 0 mid-ride... `. A friend claims: \'The while loop watches the balance like a sensor — the moment balance becomes 0 inside the loop body, it stops instantly, so the last printed ride can\'t happen.\'',
            decisions: [{ prompt: 'When does a while loop actually re-check its condition?', options: [
                { text: 'Only at the start of each iteration — the body always finishes once entered. If `balance` hits 0 mid-body, the remaining statements still run; the loop exits only when control returns to the top and re-evaluates `balance > 0`. To stop mid-iteration you need an explicit `break`.', outcome: 'A while loop is a gate at the loop\'s head, not a live sensor; conditions are sampled once per iteration, not continuously.' },
                { text: 'The friend is right — while conditions are evaluated continuously, so the body halts the instant balance reaches 0.', outcome: 'That mental model predicts the wrong output: Python checks once before each pass; a mid-body change can\'t abort the current pass.', reveals: 'while-is-a-live-sensor' },
                { text: 'The loop exits mid-body only if the condition involves `input()` — external triggers interrupt execution.', outcome: 'Nothing inside the body interrupts it — not input, not value changes; only finishing the body (or break/return) yields control back to the condition check.', reveals: 'input-interrupts-loop' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'Selection chooses a path once; iteration walks it again and again — and only ever checks at the door.',
            decisions: [{ prompt: 'What comes next? Conditional and Iterative Statements · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Conditional and Iterative Statements · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_007', difficulty: 'standard',
          question: 'Iteration is the process of repeatedly executing a block of statements until.',
          hint: 'Revisit `if` statement syntax and Boolean expression evaluation (nodes 003 and 002).',
          misconception: 'Students often believe that the loop condition is checked **after** the loop body executes (like a do-while loop.',
          parts: [
                { id: 'a', prompt: 'What are the three essential components that must be present in every well-formed loop to ensure it terminates correctly?', answer: 'The three essential components are: (1) Initialization',
                  options: ['The three essential components are: (1) Initialization', 'condition and body', 'at least one execution', 'only "condition and body'],
                  hint: 'Revisit `if` statement syntax and Boolean expression evaluation (nodes 003 and 002); practice.',
                  misconception: 'Students often believe that the loop condition is checked **after** the loop body executes (like a do-while loop in other languages).' },
                { id: 'b', prompt: 'Explain in your own words why the following pseudocode would cause an infinite loop, and state which essential component is missing: ``` count = 1 while count.', answer: 'The loop prints `1` endlessly',
                  options: ['The loop prints `1` endlessly', 'the condition is wrong', 'at least one execution', '"at least one execution'],
                  hint: 'Revisit `if` statement syntax and Boolean expression evaluation (nodes 003 and 002); practice.',
                  misconception: 'Students often believe that the loop condition is checked **after** the loop body executes (like a do-while loop in other languages).' },
                { id: 'c', prompt: 'A student wants to calculate the sum of the first 10 even numbers (2 + 4 + 6 + ... + 20) using a loop.', answer: 'Initialization: `i = 1`, `total = 0`',
                  options: ['Initialization: `i = 1`, `total = 0`', 'first n', 'at least one execution', '"at least one execution'],
                  hint: 'Revisit `if` statement syntax and Boolean expression evaluation (nodes 003 and 002); practice.',
                  misconception: 'Students often believe that the loop condition is checked **after** the loop body executes (like a do-while loop in other languages).' }
          ],
            remediations: { 'the-loop-condition-is-checked': { steps: ['Check `5 < 3` → False → Action: skip body, exit loop. Emphasize "Check first, run later." Then contrast with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the loop condition is checked **after** the loop body executes (like a do-while loop.',
          parts: [
                { id: 'a', prompt: 'A classmate claims: "Any `for` loop can be rewritten as a `while` loop, but not every `while` loop can be rewritten as a `for` loop." Evaluate this statement.', answer: 'The statement is **true**',
                  options: ['The statement is **true**', 'at least one execution', '"at least one execution'],
                  hint: 'Revisit `if` statement syntax and Boolean expression evaluation (nodes 003 and 002); practice.',
                  misconception: 'Students often believe that the loop condition is checked **after** the loop body executes (like a do-while loop in other languages).' },
                { id: 'b', prompt: 'Design a loop algorithm (in plain English or pseudocode) to solve this problem: "A ball is dropped from a height of 100 metres.', answer: 'Algorithm: 1',
                  options: ['Algorithm: 1', 'at least one execution', '"at least one execution'],
                  hint: 'Revisit `if` statement syntax and Boolean expression evaluation (nodes 003 and 002); practice.',
                  misconception: 'Students often believe that the loop condition is checked **after** the loop body executes (like a do-while loop in other languages).' }
          ],
            remediations: { 'the-loop-condition-is-checked': { steps: ['Check `5 < 3` → False → Action: skip body, exit loop. Emphasize "Check first, run later." Then contrast with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_008', difficulty: 'standard',
          question: 'A `while` loop in Python is a control flow statement that repeatedly executes.',
          hint: 'Revisit c11_cs_cbse_05_002 (Relational Operators) and c11_cs_cbse_05_003 (if Statement).',
          misconception: '**Misconception:** "The `while` condition is checked continuously *during* the execution of the body, so the loop stops.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the following loop prints `0 1 2` and then stops, and what would happen if the line `i = i + 1` were removed.', answer: '**Correct answer:** The loop prints the current value of `i` then increments it',
                  options: ['**Correct answer:** The loop prints the current value of `i` then increments it', 'the loop stops after a fixed number of prints regardless of the variable update'],
                  hint: 'Revisit c11_cs_cbse_05_002 (Relational Operators) and c11_cs_cbse_05_003 (if Statement) — practice.',
                  misconception: '**Misconception:** "The `while` condition is checked continuously *during* the execution of the body, so the loop stops the instant the.' }
          ],
            remediations: { 'misconception-the-while-condition-is': { steps: ['**Visualize with a trace table:** Draw a table with columns `Iteration`, `Condition Check`, `Variable Values`, `Body.', 'Walk through the misconception example row by row.', '**Contrast with `if`:** Remind the student that `if` checks once; `while` re-checks *only* after the entire indented.', '**Practice "mid-body update" exercises:** Give loops where the variable crosses the threshold inside the body and ask.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_009', difficulty: 'standard',
          question: 'A `for` loop in Python is a definite iteration construct that executes a block.',
          hint: 'Revisit the `while` loop pattern for counting (c11_cs_cbse_05_008).',
          misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()`.',
          parts: [
                { id: 'a', prompt: 'What is the exact output of the following code snippet? ```python for val in range(2, 10, 3): print(val, end=\' \') ```', answer: 'Correct output: `2 5 8 ` (with a trailing space)',
                  options: ['Correct output: `2 5 8 ` (with a trailing space)', 'start defaults to 0 even when two arguments are given', 'the stop value is inclusive', '`range` allocates a huge list for large `lst`'],
                  hint: 'Revisit the `while` loop pattern for counting (c11_cs_cbse_05_008).',
                  misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()` returned a list.' },
                { id: 'b', prompt: 'Explain in your own words why `list(range(5))` produces `[0, 1, 2, 3, 4]` but `list(range(1, 5))` produces `[1, 2, 3, 4]`.', answer: 'The `stop` parameter is **exclusive**',
                  options: ['The `stop` parameter is **exclusive**', 'it stops at 5', 'the last number is 5', '`range` allocates a huge list for large `lst`'],
                  hint: 'Revisit the `while` loop pattern for counting (c11_cs_cbse_05_008).',
                  misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()` returned a list.' },
                { id: 'c', prompt: 'Write a `for` loop using `range()` to calculate the sum of the first 10 even natural numbers (2 + 4 + ... + 20).', answer: '```python total = 0 for num in range(2, 21, 2): # 2, 4, ..., 20 total += num',
                  options: ['```python total = 0 for num in range(2, 21, 2): # 2, 4, ..., 20 total += num', '`range` allocates a huge list for large `lst`'],
                  hint: 'Revisit the `while` loop pattern for counting (c11_cs_cbse_05_008).',
                  misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()` returned a list.' },
                { id: 'd', prompt: 'Compare the following two loops. Do they produce the same output? If not, explain the difference in the sequence of values taken by the loop variable. ```python', answer: 'Yes, both produce `1 2 3 4 5 `',
                  options: ['Yes, both produce `1 2 3 4 5 `', 'they are exactly the same', '`range` allocates a huge list for large `lst`'],
                  hint: 'Revisit the `while` loop pattern for counting (c11_cs_cbse_05_008).',
                  misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()` returned a list.' }
          ],
            remediations: { 'misconception-range-n-creates-a': { steps: ['**Clarify Python 3 behavior:** Explicitly state: "In Python 3 (CBSE syllabus), `range` is a *sequence type* (like.', 'It stores only `start`, `stop`, `step` and computes values on demand." 2.', '**Demonstrate memory efficiency:** Show `import sys; r = range(10**9); print(sys.getsizeof(r))` (outputs ~48 bytes).', '**Practice indexing:** Have students run `r = range(10, 20); print(r[5])` (outputs 15) and explain `range` supports.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_010', difficulty: 'standard',
          question: 'A nested loop is a loop structure where one loop (the inner loop) is placed.',
          hint: 'If stuck, revisit `c11_cs_cbse_05_009` and practice writing three `for` loops: one with.',
          misconception: 'Students believe the inner loop "pauses" and resumes when the outer loop continues, like a bookmark.',
          parts: [
                { id: 'a', prompt: 'What is the total number of times the statement `print(i, j)` will execute in the following code?', answer: 'The statement executes 12 times',
                  options: ['The statement executes 12 times', 'pauses', 'loops run sequentially rather than multiplicatively', 'only one loop runs'],
                  hint: 'If stuck, revisit `c11_cs_cbse_05_009` and practice writing three `for` loops: one with `range(5)`.',
                  misconception: 'Students believe the inner loop "pauses" and resumes when the outer loop continues, like a bookmark.' },
                { id: 'b', prompt: 'Compare the total iterations and the sequence of `(i, j)` pairs produced by these two snippets. Are they equivalent? Why or why not?', answer: 'Both produce 6 iterations but the **order of pairs differs**',
                  options: ['Both produce 6 iterations but the **order of pairs differs**', 'pauses'],
                  hint: 'If stuck, revisit `c11_cs_cbse_05_009` and practice writing three `for` loops: one with `range(5)`.',
                  misconception: 'Students believe the inner loop "pauses" and resumes when the outer loop continues, like a bookmark.' }
          ],
            remediations: { 'the-inner-loop-pauses-and': { steps: ['Have the student manually trace a 2×3 nested loop on paper, writing a table with columns: `outer_iteration`.', 'Force them to say aloud: "For i=0, j goes 0,1,2.', 'The inner loop STARTS OVER: j goes 0,1,2 again." 3.', 'Use a debugger or print statements showing "Starting inner loop for i=..." to visualize re-initialization.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_011', difficulty: 'standard',
          question: 'The `break` statement immediately terminates the nearest enclosing loop (while.',
          hint: 'Review c11_cs_cbse_05_008 (while loop) and c11_cs_cbse_05_009 (for loop) — specifically.',
          misconception: 'Students believe `break` exits ALL nested loops, not just the innermost one.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code? ```python for i in range(1, 6): if i == 3: break print(i, end=\' \') ```', answer: 'Output: `1 2 ` Explanation: The loop prints 1 and 2',
                  options: ['Output: `1 2 ` Explanation: The loop prints 1 and 2', 'break completes the current iteration before exiting', 'break only skips the print statement', '`break` exits ALL nested loops, not just the innermost one'],
                  hint: 'Review c11_cs_cbse_05_008 (while loop) and c11_cs_cbse_05_009 (for loop) — specifically trace 3-4.',
                  misconception: 'Students believe `break` exits ALL nested loops, not just the innermost one.' },
                { id: 'b', prompt: 'Compare the final value of `count` in these two snippets: ```python', answer: 'Snippet A: count = 5 (odd numbers 1,3,5,7,9 increment count)',
                  options: ['Snippet A: count = 5 (odd numbers 1,3,5,7,9 increment count)', '`break` exits ALL nested loops, not just the innermost one'],
                  hint: 'Review c11_cs_cbse_05_008 (while loop) and c11_cs_cbse_05_009 (for loop) — specifically trace 3-4.',
                  misconception: 'Students believe `break` exits ALL nested loops, not just the innermost one.' }
          ],
            remediations: { 'break-exits-all-nested-loops': { steps: ['Draw a flowchart of nested loops with break/continue, physically trace with finger showing which loop each statement.', 'Write a minimal 3-line while loop: `i=0; while i<5: i+=1; if i==3: continue; print(i)` — predict output, run, observe 3.', 'Then move `i+=1` AFTER continue — observe infinite loop.', 'This concrete demo fixes the "continue skips increment" error.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_012', difficulty: 'standard',
          question: 'In Python, the `else` clause attached to a `for` or `while` loop executes.',
          hint: 'If confused, revisit `break` and `continue` (node c11_cs_cbse_05_011) and trace a loop.',
          misconception: 'Students often believe the `else` block executes when the loop condition is **initially false** (i.e., zero.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python for i in range(3): print(i) else: print("Loop ended") ```', answer: 'Output: ``` 0 1 2 Loop ended ``` The `else` block executes',
                  options: ['Output: ``` 0 1 2 Loop ended ``` The `else` block executes', '`else` runs when the loop is not terminated by `break`', 'not terminated by `break`', '`else` never runs or runs only if the loop body never executes'],
                  hint: 'If confused, revisit `break` and `continue` (node c11_cs_cbse_05_011) and trace a loop with `break`.',
                  misconception: 'Students often believe the `else` block executes when the loop condition is **initially false** (i.e., zero iterations).' }
          ],
            remediations: { 'the-else-block-executes-when': { steps: ['**Concrete tracing**: Have the student manually trace three cases on paper: (a) loop runs zero times, (b) loop runs and.', 'Use a table with columns: Iteration, Condition, Break?, Else executes?.', '**Indentation drill**: Give them 5 snippets where `else` is mis‑indented (aligned with `if` vs `for`).', 'Ask them to predict output, then run.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
