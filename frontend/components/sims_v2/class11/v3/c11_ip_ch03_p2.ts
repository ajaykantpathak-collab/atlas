import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch03_p2: SimDef = {
    id: 'v3_c11_ip_ch03_p2',
    title: 'Conditional and Iterative Statements · Part 2/2',
    subtitle: 'Learn that whitespace is grammar and `and` outranks `or`.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Conditional and Iterative Statements · Part 2/2',
    chapters: ['c11_ip_ch03'],
    nodeIds: ['c11_ip_cbse_03_007', 'c11_ip_cbse_03_008', 'c11_ip_cbse_03_009', 'c11_ip_cbse_03_010', 'c11_ip_cbse_03_011', 'c11_ip_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer whose bugs live in the left margin', intro: 'Directions to a friend: \'go straight, IF the main road\'s crowded take the service lane\' — control flow is just that, typed.', goal: 'Use indentation-defined blocks, relational operators and Boolean precedence correctly.' },
    discovery: {
        question: 'Evaluate in your head: `True or False and False` — what does Python actually compute?',
        options: ['True — `and` binds tighter than `or`, so it\'s `True or (False and False)`', 'False — left to right gives `True or False` then `and False`', 'False — `or` always wins over `and`', 'An error — mixed operators can\'t combine'],
        answer: 'True — `and` binds tighter than `or`, so it\'s `True or (False and False)`',
        hook: 'And indentation isn\'t decoration — dedent `print(fact)` one level and it escapes the loop entirely; in Python the whitespace is the syntax.',
    },
    teaching: [
        { title: 'Introduction to Iteration and Need for Loops', text: 'Iteration is the process of repeating a set of instructions until a specific condition is met, and a loop is the programming construct that implements this repetition by executing a block of code.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Convert \'if score ≥ 50 print Pass and set grade\' into correctly indented blocks, then trace a factorial loop to see what escapes the indentation.',
        labels: ['Introduction to Iteration', 'The while Loop: Syntax,', 'The for Loop', 'Nested Loops: Patterns', 'break and continue Statements', 'Common Loop Errors: Infinite'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_007', title: 'Introduction to Iteration and Need for Loops',
          caseStudy: { intro: 'Imagine you need to print the roll numbers of all 40 students in your class for attendance.',
            decisions: [{ prompt: 'What is the primary purpose of a loop in programming, and how does it differ from writing the same statement multiple times?', options: [
                { text: 'A loop automates repetition by executing a block of code multiple times with a changing', outcome: 'A loop automates repetition by executing a block of code multiple times with a changing state (loop.' },
                { text: 'loops make code faster', outcome: 'Not quite — Students believe a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1.', reveals: 'a-loop-variable-must-be' },
                { text: 'a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1', outcome: 'Not quite — Students believe a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1.', reveals: 'a-loop-variable-must-be' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_008', title: 'The while Loop: Syntax, Flowchart and Working',
          caseStudy: { intro: 'Imagine you are a cashier at a grocery store scanning items until the customer says "stop" — you don\'t know in advance how many items there are, but you keep.',
            decisions: [{ prompt: 'Write the exact syntax of a while loop in Python, including the colon and indentation requirements. What happens if the colon is omitted?', options: [
                { text: 'Correct syntax: `while condition:\\n statement(s)`', outcome: 'Correct syntax: `while condition:\\n statement(s)`. The colon is mandatory; omitting it raises.' },
                { text: 'the loop stops the instant the condition becomes False mid-body', outcome: 'Not quite — Students often believe the while loop condition is checked continuously during body execution (like.', reveals: 'the-while-loop-condition-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_009', title: 'The for Loop and the range() Function',
          caseStudy: { intro: 'Imagine you need to print the roll numbers of 40 students in your class for attendance, but only the even-numbered rolls (2, 4, 6... 40).',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python for val in range(5, 0, -1): print(val, end=\' \') ```', options: [
                { text: '**Correct Output:** `5 4 3 2 1 ` **Explanation:** `range(5, 0, -1)` generates integers', outcome: '**Correct Output:** `5 4 3 2 1 ` **Explanation:** `range(5, 0, -1)` generates integers starting.' },
                { text: 'count from 1 to 10', outcome: 'Not quite — **Misconception:** "The `stop` value in `range(start, stop, step)` is always included in the.', reveals: 'misconception-the-stop-value-in' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_03_010', title: 'Nested Loops: Patterns and Number Series Generation',
          scaffold: { problem: 'Write a Python program to print a right-angled triangle pattern of stars with 6 rows, where row 1 has 1 star, row 2 has 2 stars, ..., row 6.',
            steps: [
            { text: 'Identify that we need an outer loop for rows (1 to 6) and an inner loop for stars per row (1 to current row number).' },
            { text: 'Choose `for i in range(1, 7):` for outer loop (rows 1–6). For each row i, inner loop runs i times: `for j in range(i):`.' },
            { text: 'Inside inner loop, print star with space using `print("*", end=" ")` to stay on same line.' },
            { text: 'After inner loop completes, print newline with `print()` to move to next row.' },
            { text: 'Verify by tracing: i=1 → inner runs 1 time → "* "; i=2 → inner runs 2 times → "* * "; ... i=6 → 6 stars.', faded: true, blankAnswer: '```' }
            ] } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_011', title: 'break and continue Statements in Loops',
          caseStudy: { intro: 'Imagine you are scanning a shelf of 50 books to find the first one authored by "R.K. Narayan" — once found, you stop searching immediately.',
            decisions: [{ prompt: 'What is the exact effect of the `break` statement when encountered inside a `while` loop?', options: [
                { text: 'The `break` statement immediately terminates the `while` loop entirely', outcome: 'The `break` statement immediately terminates the `while` loop entirely; control jumps to the first.' },
                { text: 'it skips to the next iteration', outcome: 'Not quite — Students believe `break` exits *all* nested loops at once. Example: In a double `for` loop.', reveals: 'break-exits-all-nested-loops' },
                { text: '`break` behaves like `continue`', outcome: 'Not quite — Students believe `break` exits *all* nested loops at once. Example: In a double `for` loop.', reveals: 'break-exits-all-nested-loops' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_012', title: 'Common Loop Errors: Infinite Loops and Off-by-One Errors',
          caseStudy: { intro: 'Imagine you write a program to calculate the sum of first 10 natural numbers, but your output is 55 instead of 55? Wait, that\'s correct.',
            decisions: [{ prompt: 'What is the defining characteristic of an infinite loop in a `while` statement?', options: [
                { text: 'An infinite loop occurs when the loop condition remains true indefinitely', outcome: 'An infinite loop occurs when the loop condition remains true indefinitely because the loop control.' },
                { text: 'it runs for a very long time', outcome: 'Not quite — Students believe that `range(n)` produces n numbers starting from 1 (i.e., 1 to n) because they.', reveals: 'range-n-produces-n-numbers' },
                { text: '`range(n)` produces n numbers starting from 1 (i', outcome: 'Not quite — Students believe that `range(n)` produces n numbers starting from 1 (i.e., 1 to n) because they.', reveals: 'range-n-produces-n-numbers' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate\'s scholarship checker prints \'Congratulations\' for every student, pass or fail. He also wrote `if marks == 33 or 40:` expecting it to test \'marks equals 33 or 40\' — it always passes. He insists \'indentation is just style\' and \'and/or evaluate left to right.\'',
            decisions: [{ prompt: 'Which Python rules is he breaking?', options: [
                { text: 'Explain all three: indentation IS syntax — a dedented `print` leaves the if-block and runs unconditionally. `marks == 33 or 40` parses as `(marks == 33) or 40` — and 40 is truthy, so it\'s always True; the fix is `marks == 33 or marks == 40`. And precedence is not > and > or — `and` binds before `or`, it isn\'t left-to-right.', outcome: 'He learns that whitespace groups statements, truthiness isn\'t comparison, and Boolean operators have a BODMAS-like order.' },
                { text: 'Let the indentation slide — Python ignores extra spaces like C++ does.', outcome: 'In Python indentation defines the block: inconsistent or dedented lines change what executes — it\'s structure, not style.', reveals: 'indentation-is-just-style' },
                { text: 'Keep `marks == 33 or 40` — the English reading is what Python intends.', outcome: 'Python reads it as two separate expressions: a comparison OR a number — and a nonzero number is truthy, so the condition never fails.', reveals: 'or-40-tests-equality' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_012', title: 'You made it',
          caseStudy: { intro: 'Write `33 <= marks <= 100` — Python reads logic like mathematics, but only if you respect the precedence and the tabs.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_007', difficulty: 'standard',
          question: 'Iteration is the process of repeating a set of instructions until a specific.',
          hint: 'Revisit `if` statement syntax and boolean expression evaluation (nodes c11_ip_cbse_03_003.',
          misconception: 'Students believe a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1.',
          parts: [
                { id: 'a', prompt: 'In the attendance example (printing roll numbers 1 to 40), a student writes: `roll = 1; print(roll); roll = 2; print(roll); ...` up to 40.', answer: 'This is manual unrolling, not iteration',
                  options: ['This is manual unrolling, not iteration', 'a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1'],
                  hint: 'Revisit `if` statement syntax and boolean expression evaluation (nodes c11_ip_cbse_03_003 and.',
                  misconception: 'Students believe a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1.' },
                { id: 'b', prompt: 'A program must calculate the sum of all even numbers between 1 and 100.', answer: 'the loop variable, (',
                  options: ['the loop variable, (', 'a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1'],
                  hint: 'Revisit `if` statement syntax and boolean expression evaluation (nodes c11_ip_cbse_03_003 and.',
                  misconception: 'Students believe a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1.' },
                { id: 'c', prompt: 'Compare definite iteration (e.g., `for i in range(10)`) and indefinite iteration (e.g., `while user_input != \'quit\'`).', answer: 'Definite: "Print \'Hello\' 5 times"',
                  options: ['Definite: "Print \'Hello\' 5 times"', 'both can do everything', 'a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1'],
                  hint: 'Revisit `if` statement syntax and boolean expression evaluation (nodes c11_ip_cbse_03_003 and.',
                  misconception: 'Students believe a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1.' }
          ],
            remediations: { 'a-loop-variable-must-be': { steps: ['Show a loop over a list of strings: `for fruit in [\'apple\', \'banana\', \'mango\']: print(fruit)`.', 'Where is the increment?" 2.', 'Contrast with `for i in range(len(fruits)): print(fruits[i])` — highlight the extra mental steps (index → access).', 'Give a task: "Print each character of your name." Force them to write both versions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1.',
          parts: [
                { id: 'a', prompt: 'Create a novel real-world problem (not from textbooks) that *requires* indefinite iteration and cannot be easily converted to definite iteration.', answer: 'Example: "A weather station records temperature every minute',
                  options: ['Example: "A weather station records temperature every minute', 'a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1'],
                  hint: 'Revisit `if` statement syntax and boolean expression evaluation (nodes c11_ip_cbse_03_003 and.',
                  misconception: 'Students believe a loop variable *must* be named `i`, `j`, or `k` and *must* increment by 1.' }
          ],
            remediations: { 'a-loop-variable-must-be': { steps: ['Show a loop over a list of strings: `for fruit in [\'apple\', \'banana\', \'mango\']: print(fruit)`.', 'Where is the increment?" 2.', 'Contrast with `for i in range(len(fruits)): print(fruits[i])` — highlight the extra mental steps (index → access).', 'Give a task: "Print each character of your name." Force them to write both versions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_008', difficulty: 'standard',
          question: 'A while loop is an entry-controlled iteration construct that repeatedly.',
          hint: 'If stuck, revisit c11_ip_cbse_03_002 (Relational Operators and Boolean Expressions).',
          misconception: 'Students often believe the while loop condition is checked continuously during body execution (like a sensor), so they.',
          parts: [
                { id: 'a', prompt: 'Write the exact syntax of a while loop in Python, including the colon and indentation requirements. What happens if the colon is omitted?', answer: 'Correct syntax: `while condition:\\n statement(s)`',
                  options: ['Correct syntax: `while condition:\\n statement(s)`', 'the loop stops the instant the condition becomes False mid-body'],
                  hint: 'If stuck, revisit c11_ip_cbse_03_002 (Relational Operators and Boolean Expressions) to practice.',
                  misconception: 'Students often believe the while loop condition is checked continuously during body execution (like a sensor), so they think the loop stops.' }
          ],
            remediations: { 'the-while-loop-condition-is': { steps: ['Draw a two-column dry-run table: left column "Condition Check", right column "Body Execution".', 'For the example `x=3; while x>0: x=x-2; print(x)`, fill rows: Check 3>0→T, Body: x=1, print 1; Check 1>0→T, Body: x=-1.', 'Emphasize: "The condition is a gate at the loop entrance, not a monitor inside." 3.', 'Have the student add `print("Condition checked")` before the while and `print("Body done")` inside to see the actual.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_009', difficulty: 'standard',
          question: 'The `for` loop in Python is a definite iteration construct that executes.',
          hint: 'If stuck, revisit the `while` loop tracing exercise (c11_ip_cbse_03_008) for counting 1.',
          misconception: '**Misconception:** "The `stop` value in `range(start, stop, step)` is always included in the generated sequence." **Why.',
          parts: [
                { id: 'a', prompt: 'A student writes `range(10, 1, -2)` expecting the sequence `10, 8, 6, 4, 2`. They claim the `stop` value 1 is not reached, so 2 should be the last value.', answer: '**Correct Answer:** Yes, the student is correct',
                  options: ['**Correct Answer:** Yes, the student is correct', 'count from 1 to 10'],
                  hint: 'If stuck, revisit the `while` loop tracing exercise (c11_ip_cbse_03_008) for counting 1 to 5, then.',
                  misconception: '**Misconception:** "The `stop` value in `range(start, stop, step)` is always included in the generated sequence." **Why it happens:**.' },
                { id: 'b', prompt: 'Compare the memory usage and execution speed of these two snippets for summing integers 1 to 1,00,00,000 (1 Crore). Which is better and why? ```python', answer: '**Correct Analysis:** Snippet A is significantly better',
                  options: ['**Correct Analysis:** Snippet A is significantly better', 'count from 1 to 10'],
                  hint: 'If stuck, revisit the `while` loop tracing exercise (c11_ip_cbse_03_008) for counting 1 to 5, then.',
                  misconception: '**Misconception:** "The `stop` value in `range(start, stop, step)` is always included in the generated sequence." **Why it happens:**.' }
          ],
            remediations: { 'misconception-the-stop-value-in': { steps: ['**Visualize the Half-Open Interval:** Draw a number line.', 'Mark `start` with a **solid dot** (included) and `stop` with a **hollow circle** (excluded).', 'Show arrows for step direction.', '**Trace Table Drill:** Have the student manually trace `range(1, 5)`, `range(5, 1, -1)`, `range(0, 10, 3)` writing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_010', difficulty: 'standard',
          question: 'A nested loop is a programming construct where one loop (the inner loop).',
          hint: 'Revisit `c11_ip_cbse_03_009` — practice writing `for i in range(start, stop, step)` loops.',
          misconception: 'Students believe the inner loop "restarts from scratch" independently each time, so they reinitialize counters or flags.',
          parts: [
                { id: 'a', prompt: 'What is the total number of times the inner loop body executes in the following code snippet? ```python for i in range(3): for j in range(4): print(i, j) ```', answer: 'The inner loop executes 12 times (3 × 4)',
                  options: ['The inner loop executes 12 times (3 × 4)', 'restarts from scratch', 're-execution of loop body', 're-initialization of variables'],
                  hint: 'Revisit `c11_ip_cbse_03_009` — practice writing `for i in range(start, stop, step)` loops and.',
                  misconception: 'Students believe the inner loop "restarts from scratch" independently each time, so they reinitialize counters or flags inside the outer.' },
                { id: 'b', prompt: 'Compare the output of these two code fragments. Are they equivalent? Justify.', answer: 'No, they are not equivalent',
                  options: ['No, they are not equivalent', 'they print the same pairs', 'restarts from scratch', 're-execution of loop body'],
                  hint: 'Revisit `c11_ip_cbse_03_009` — practice writing `for i in range(start, stop, step)` loops and.',
                  misconception: 'Students believe the inner loop "restarts from scratch" independently each time, so they reinitialize counters or flags inside the outer.' }
          ],
            remediations: { 'the-inner-loop-restarts-from': { steps: ['Have the student trace a 2×3 nested loop on paper with a table: columns for outer_i, inner_j, and a shared variable.', 'Force them to write the value of `count` after each inner iteration, showing it does not reset unless explicitly coded.', 'Ask: "Where is `count = 1` written?', 'If it\'s inside the outer loop, it runs every outer iteration.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_011', difficulty: 'standard',
          question: 'The `break` statement immediately terminates the innermost loop it is placed.',
          hint: 'Revisit `for` loop tracing (c11_ip_cbse_03_009) and `if` condition placement.',
          misconception: 'Students believe `break` exits *all* nested loops at once. Example: In a double `for` loop iterating rows and columns.',
          parts: [
                { id: 'a', prompt: 'What is the exact effect of the `break` statement when encountered inside a `while` loop?', answer: 'The `break` statement immediately terminates the `while` loop entirely',
                  options: ['The `break` statement immediately terminates the `while` loop entirely', 'it skips to the next iteration', '`break` behaves like `continue`', '`break` exits *all* nested loops at once'],
                  hint: 'Revisit `for` loop tracing (c11_ip_cbse_03_009) and `if` condition placement (c11_ip_cbse_03_005).',
                  misconception: 'Students believe `break` exits *all* nested loops at once. Example: In a double `for` loop iterating rows and columns of a 3×3 matrix.' },
                { id: 'b', prompt: 'In a nested `for` loop structure, if `break` is executed in the inner loop, which loop(s) terminate?', answer: 'Only the innermost loop (the one containing the `break` statement) terminates',
                  options: ['Only the innermost loop (the one containing the `break` statement) terminates', 'both loops stop', '`break` exits *all* nested loops at once'],
                  hint: 'Revisit `for` loop tracing (c11_ip_cbse_03_009) and `if` condition placement (c11_ip_cbse_03_005).',
                  misconception: 'Students believe `break` exits *all* nested loops at once. Example: In a double `for` loop iterating rows and columns of a 3×3 matrix.' },
                { id: 'c', prompt: 'Compare the final value of `count` in these two snippets. Explain the difference. ```python', answer: 'Snippet A: `count = 2` (iterations for i=0,1 execute fully',
                  options: ['Snippet A: `count = 2` (iterations for i=0,1 execute fully', '`break` exits *all* nested loops at once'],
                  hint: 'Revisit `for` loop tracing (c11_ip_cbse_03_009) and `if` condition placement (c11_ip_cbse_03_005).',
                  misconception: 'Students believe `break` exits *all* nested loops at once. Example: In a double `for` loop iterating rows and columns of a 3×3 matrix.' }
          ],
            remediations: { 'break-exits-all-nested-loops': { steps: ['Draw a nested loop flowchart with two rectangles (outer, inner).', 'Place `break` inside inner rectangle.', 'Trace with finger: when `break` hits, arrow goes *out of inner rectangle only* to the next iteration of outer rectangle.', 'Write a 3×3 matrix search in IDLE.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_012', difficulty: 'standard',
          question: 'An infinite loop occurs when a loop\'s termination condition never becomes false.',
          hint: 'Revisit the `while` loop flowchart (condition check → body → update → back to condition).',
          misconception: 'Students believe that `range(n)` produces n numbers starting from 1 (i.e., 1 to n) because they count from 1.',
          parts: [
                { id: 'a', prompt: 'What is the defining characteristic of an infinite loop in a `while` statement?', answer: 'An infinite loop occurs when the loop condition remains true indefinitely',
                  options: ['An infinite loop occurs when the loop condition remains true indefinitely', 'it runs for a very long time', '`range(n)` produces n numbers starting from 1 (i'],
                  hint: 'Revisit the `while` loop flowchart (condition check → body → update → back to condition) and the.',
                  misconception: 'Students believe that `range(n)` produces n numbers starting from 1 (i.e., 1 to n) because they count from 1 in mathematics.' },
                { id: 'b', prompt: 'The following code intends to sum the first 5 even numbers (2+4+6+8+10=30). Identify the error and correct it.', answer: 'The code outputs 20 (2+4+6+8)',
                  options: ['The code outputs 20 (2+4+6+8)', '`range(n)` produces n numbers starting from 1 (i'],
                  hint: 'Revisit the `while` loop flowchart (condition check → body → update → back to condition) and the.',
                  misconception: 'Students believe that `range(n)` produces n numbers starting from 1 (i.e., 1 to n) because they count from 1 in mathematics.' },
                { id: 'c', prompt: 'Compare these two loops. Which has an infinite loop risk and which has an off-by-one error? Explain. ```python', answer: 'Loop A has an infinite loop risk',
                  options: ['Loop A has an infinite loop risk', 'Loop B misses 5', '`range(n)` produces n numbers starting from 1 (i'],
                  hint: 'Revisit the `while` loop flowchart (condition check → body → update → back to condition) and the.',
                  misconception: 'Students believe that `range(n)` produces n numbers starting from 1 (i.e., 1 to n) because they count from 1 in mathematics.' }
          ],
            remediations: { 'range-n-produces-n-numbers': { steps: ['Have the student write out the sequence generated by `range(1,5)`, `range(5)`, `range(1,6)` on paper.', 'Ask them to count the items in each list and compare with the stop value.', 'Trace a `while` loop with a table: columns for iteration, variable value, condition evaluation, and action.', 'Explicitly highlight: "The condition is checked BEFORE each iteration.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
