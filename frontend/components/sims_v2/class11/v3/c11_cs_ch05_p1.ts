import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch05_p1: SimDef = {
    id: 'v3_c11_cs_ch05_p1',
    title: 'Conditional and Iterative Statements · Part 1/3',
    subtitle: 'Control the flow: conditions that decide and loops that repeat, without lying about when they check.',
    classLevel: 11, subject: 'computer_science', topic: 'Conditional and Iterative Statements · Part 1/3',
    chapters: ['c11_cs_ch05'],
    nodeIds: ['c11_cs_cbse_05_001', 'c11_cs_cbse_05_002', 'c11_cs_cbse_05_003', 'c11_cs_cbse_05_004', 'c11_cs_cbse_05_005', 'c11_cs_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer automating a rickshaw fare table', intro: 'One fixed distance, one formula — useless. Real riders go 2 km or 20 km, and your code must bend.', goal: 'Use if/elif/else, while and for to make programs decide and repeat correctly.' },
    discovery: {
        question: 'Halfway through a while loop\'s body, a variable makes the condition false. Does the loop bail out instantly?',
        options: ['No — the condition is only checked at the top; the current iteration finishes first', 'Yes — Python watches the condition like a sensor', 'Yes — but only for numeric conditions', 'No — a while loop never stops once started'],
        answer: 'No — the condition is only checked at the top; the current iteration finishes first',
        hook: 'The condition is a gate at the top of the loop, not a tripwire inside it — mid-body changes wait their turn.',
    },
    teaching: [
        { title: 'Introduction to Control Flow in Python', text: 'Control flow refers to the order in which individual statements, instructions, or function calls are executed or evaluated in a program.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Write a countdown loop from 10 to 2, build the even-number sum two ways, then predict what Python does with "10" > 2.',
        labels: ['Introduction to Control Flow', 'Relational Operators and Boolean', 'if Statement: Syntax', 'if-else Statement with Examples', 'Nested if and if-elif-else', 'Conditional Expression (Ternary Operator)'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_001', title: 'Introduction to Control Flow in Python',
          caseStudy: { intro: 'Imagine you are writing a program to calculate the fare for an auto-rickshaw ride in Delhi. The fare is ₹25 for the first 1.5 km, then ₹9.50 per additional km.',
            decisions: [{ prompt: 'What is the default flow of execution in a Python program if no control flow statements are used?', options: [
                { text: 'The default flow is **sequential**: statements execute one after another, from top to', outcome: 'The default flow is **sequential**: statements execute one after another, from top to bottom.' },
                { text: 'random order', outcome: 'Not quite — **Misconception**: "A `while` loop checks the condition continuously in real-time, like a sensor.', reveals: 'misconception-a-while-loop-checks' },
                { text: 'simultaneous', outcome: 'Not quite — **Misconception**: "A `while` loop checks the condition continuously in real-time, like a sensor.', reveals: 'misconception-a-while-loop-checks' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_002', title: 'Relational Operators and Boolean Expressions',
          caseStudy: { intro: 'Imagine you are writing a program for a school canteen that checks if a student\'s prepaid balance (₹150) is sufficient to buy a lunch combo (₹120).',
            decisions: [{ prompt: 'What is the output of the expression `"5" > 5` in Python, and why does Python behave this way?', options: [
                { text: 'The expression raises a TypeError: \'>\' not supported between instances of \'str\' and \'int\'', outcome: 'The expression raises a TypeError: \'>\' not supported between instances of \'str\' and \'int\'.' },
                { text: '> 2` is true due to type coercion, (2) confusion between the string `', outcome: 'Not quite — Students believe that `"10" > 2` compares numerically and returns True because 10 > 2.', reveals: '10-2-compares-numerically-and' },
                { text: '`"10" > 2` compares numerically and returns True', outcome: 'Not quite — Students believe that `"10" > 2` compares numerically and returns True because 10 > 2.', reveals: '10-2-compares-numerically-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_003', title: 'if Statement: Syntax and Execution',
          caseStudy: { intro: 'Imagine you are writing a program for a school library that should print "Book issued" only when a student\'s membership is active.',
            decisions: [{ prompt: 'What is the exact syntax of a simple `if` statement in Python, and what happens if the colon (`:`) is omitted?', options: [
                { text: 'The syntax is `if condition:` followed by an indented block', outcome: 'The syntax is `if condition:` followed by an indented block. Omitting the colon raises.' },
                { text: 'the colon is optional or that parentheses are required around the condition', outcome: 'Not quite — Students often believe that the condition in an `if` statement must be enclosed in parentheses.', reveals: 'the-condition-in-an-if' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_004', title: 'if-else Statement with Examples',
          caseStudy: { intro: 'Imagine you are building a program for a school library: "If a student returns a book on time, fine = ₹0; otherwise fine = ₹5 per day late." Ask the student.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python age = 17 if age >= 18: print("Eligible to vote") else: print("Not eligible.', options: [
                { text: 'Output: `Not eligible to vote`', outcome: 'Output: `Not eligible to vote` because `age >= 18` evaluates to `False` (17 is not ≥ 18), so the.' },
                { text: 'Eligible to vote', outcome: 'Not quite — Students often believe that the `else` block executes **only when the `if` condition.', reveals: 'the-else-block-executes-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_005', title: 'Nested if and if-elif-else Ladder',
          caseStudy: { intro: 'Imagine you are designing a ticket pricing system for Delhi Metro: children under 5 ride free, students (5-18) get 50% discount, seniors (60+) get 30%.',
            decisions: [{ prompt: 'What is the exact output of the following code snippet when `marks = 75`?', options: [
                { text: 'The output is `Grade B`', outcome: 'The output is `Grade B`. The first condition `marks >= 90` is false, so the interpreter checks the.' },
                { text: 'multiple separate `if` statements behave like an `if-elif-else` ladder', outcome: 'Not quite — Students often believe that multiple separate `if` statements behave like an `if-elif-else` ladder.', reveals: 'multiple-separate-if-statements-behave' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_006', title: 'Conditional Expression (Ternary Operator)',
          caseStudy: { intro: 'Imagine you are writing a program for a school canteen: if a student\'s age is 18 or above, they pay the adult price of ₹50 for lunch; otherwise they pay the.',
            decisions: [{ prompt: 'Write the exact syntax of Python\'s ternary operator using the placeholders `condition`, `value_if_true`, and `value_if_false`.', options: [
                { text: 'Correct syntax: `value_if_true if condition else value_if_false`', outcome: 'Correct syntax: `value_if_true if condition else value_if_false`.' },
                { text: 'shorter if-else', outcome: 'Not quite — Students often believe the ternary operator is just a "shorter if-else" and try to use it for.', reveals: 'the-ternary-operator-is-just' },
                { text: ') if age >= 18 else print(', outcome: 'Not quite — Students often believe the ternary operator is just a "shorter if-else" and try to use it for.', reveals: 'the-ternary-operator-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You code a metro-card simulator: `while balance > 0: deduct ₹40; print \'Ride OK\'; if balance hits 0 mid-ride... `. A friend claims: \'The while loop watches the balance like a sensor — the moment balance becomes 0 inside the loop body, it stops instantly, so the last printed ride can\'t happen.\'',
            decisions: [{ prompt: 'When does a while loop actually re-check its condition?', options: [
                { text: 'Only at the start of each iteration — the body always finishes once entered. If `balance` hits 0 mid-body, the remaining statements still run; the loop exits only when control returns to the top and re-evaluates `balance > 0`. To stop mid-iteration you need an explicit `break`.', outcome: 'A while loop is a gate at the loop\'s head, not a live sensor; conditions are sampled once per iteration, not continuously.' },
                { text: 'The friend is right — while conditions are evaluated continuously, so the body halts the instant balance reaches 0.', outcome: 'That mental model predicts the wrong output: Python checks once before each pass; a mid-body change can\'t abort the current pass.', reveals: 'while-is-a-live-sensor' },
                { text: 'The loop exits mid-body only if the condition involves `input()` — external triggers interrupt execution.', outcome: 'Nothing inside the body interrupts it — not input, not value changes; only finishing the body (or break/return) yields control back to the condition check.', reveals: 'input-interrupts-loop' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Selection chooses a path once; iteration walks it again and again — and only ever checks at the door.',
            decisions: [{ prompt: 'What comes next? Conditional and Iterative Statements · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Conditional and Iterative Statements · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_001', difficulty: 'standard',
          question: 'Control flow refers to the order in which individual statements, instructions.',
          hint: 'If stuck, revisit **Chapter 4 (Algorithms)** for the concept of "sequence, selection.',
          misconception: '**Misconception**: "A `while` loop checks the condition continuously in real-time, like a sensor.',
          parts: [
                { id: 'a', prompt: 'A student writes a program to check if a number is positive, negative, or zero using three separate `if` statements (not `if-elif-else`).', answer: 'It works **logically** for this specific problem',
                  options: ['It works **logically** for this specific problem', 'it fails', 'it\'s exactly the same as if-elif-else'],
                  hint: 'If stuck, revisit **Chapter 4 (Algorithms)** for the concept of "sequence, selection, iteration".',
                  misconception: '**Misconception**: "A `while` loop checks the condition continuously in real-time, like a sensor.' },
                { id: 'b', prompt: 'Compare the roles of **indentation** in Python vs. **curly braces `{}`** in C++/Java for defining blocks in control flow.', answer: 'In Python, indentation **is** the block delimiter',
                  options: ['In Python, indentation **is** the block delimiter', 'Python uses braces too', 'indentation doesn\'t matter'],
                  hint: 'If stuck, revisit **Chapter 4 (Algorithms)** for the concept of "sequence, selection, iteration".',
                  misconception: '**Misconception**: "A `while` loop checks the condition continuously in real-time, like a sensor.' }
          ],
            remediations: { 'misconception-a-while-loop-checks': { steps: ['**Step-by-step remediation**: 1.', '**Act out the interpreter**: Use a physical trace table on paper.', 'Write columns: `Iteration`, `Condition Check (T/F)`, `num before body`, `Print`, `num after update`.', '**Highlight the "check points"**: Mark explicitly: "Condition checked HERE → if True, run body → after body, go back.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_002', difficulty: 'standard',
          question: 'Relational operators in Python (==, !=, >, <, >=, <=) compare two operands and.',
          hint: 'If stuck, revisit arithmetic operator precedence (c11_cs_cbse_05_001) and integer.',
          misconception: 'Students believe that `"10" > 2` compares numerically and returns True because 10 > 2.',
          parts: [
                { id: 'a', prompt: 'Given `a = 10`, `b = 3`, `c = 7`, evaluate the expression `a // b > c % b >= a % c` step by step, showing how operator precedence affects the order.', answer: 'Step 1: Arithmetic operators have higher precedence than relational',
                  options: ['Step 1: Arithmetic operators have higher precedence than relational', '> 2` is true due to type coercion, (2) confusion between the string `', '`"10" > 2` compares numerically and returns True'],
                  hint: 'If stuck, revisit arithmetic operator precedence (c11_cs_cbse_05_001) and integer comparison on the.',
                  misconception: 'Students believe that `"10" > 2` compares numerically and returns True because 10 > 2.' },
                { id: 'b', prompt: 'Compare the string comparisons `"Zebra" > "apple"` and `"Zebra" > "Apple"`.', answer: '`"Zebra" > "apple"` is `False` (Z=90, a=97 → 90 < 97)',
                  options: ['`"Zebra" > "apple"` is `False` (Z=90, a=97 → 90 < 97)', '> 2` is true due to type coercion, (2) confusion between the string `', '`"10" > 2` compares numerically and returns True'],
                  hint: 'If stuck, revisit arithmetic operator precedence (c11_cs_cbse_05_001) and integer comparison on the.',
                  misconception: 'Students believe that `"10" > 2` compares numerically and returns True because 10 > 2.' }
          ],
            remediations: { '10-2-compares-numerically-and': { steps: ['If a student struggles: (1) Have them type `type("10")` and `type(10)` in the shell to see `<class \'str\'>` vs `<class.', '(2) Demonstrate `ord(\'1\')` (49) and `ord(\'2\')` (50) to show string comparison uses character codes, not numeric value.', '(3) For chained comparison, trace `5 < 10 < 3` step-by-step: `5 < 10` → True, then `10 < 3` → False, combined with AND.', 'Contrast with `(5 < 10) < 3` → `True < 3` → `1 < 3` → True.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that `"10" > 2` compares numerically and returns True because 10 > 2.',
          parts: [
                { id: 'a', prompt: 'A student writes `if 0 < x < 100:` to check if x is strictly between 0 and 100. Another writes `if 0 < x and x < 100:`. Are these always equivalent?', answer: 'For x=50: both `True`',
                  options: ['For x=50: both `True`', '> 2` is true due to type coercion, (2) confusion between the string `', '`"10" > 2` compares numerically and returns True'],
                  hint: 'If stuck, revisit arithmetic operator precedence (c11_cs_cbse_05_001) and integer comparison on the.',
                  misconception: 'Students believe that `"10" > 2` compares numerically and returns True because 10 > 2.' }
          ],
            remediations: { '10-2-compares-numerically-and': { steps: ['If a student struggles: (1) Have them type `type("10")` and `type(10)` in the shell to see `<class \'str\'>` vs `<class.', '(2) Demonstrate `ord(\'1\')` (49) and `ord(\'2\')` (50) to show string comparison uses character codes, not numeric value.', '(3) For chained comparison, trace `5 < 10 < 3` step-by-step: `5 < 10` → True, then `10 < 3` → False, combined with AND.', 'Contrast with `(5 < 10) < 3` → `True < 3` → `1 < 3` → True.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_003', difficulty: 'standard',
          question: 'The `if` statement in Python is a conditional control structure that executes.',
          hint: 'Revisit relational operators and boolean expressions (node c11_cs_cbse_05_002) and.',
          misconception: 'Students often believe that the condition in an `if` statement must be enclosed in parentheses, writing `if (x > 0):`.',
          parts: [
                { id: 'a', prompt: 'What is the exact syntax of a simple `if` statement in Python, and what happens if the colon (`:`) is omitted?', answer: 'The syntax is `if condition:` followed by an indented block',
                  options: ['The syntax is `if condition:` followed by an indented block', 'the colon is optional or that parentheses are required around the condition'],
                  hint: 'Revisit relational operators and boolean expressions (node c11_cs_cbse_05_002) and practice.',
                  misconception: 'Students often believe that the condition in an `if` statement must be enclosed in parentheses, writing `if (x > 0):` because they have.' },
                { id: 'b', prompt: 'Explain in your own words why the following code prints nothing when `x = 5`: ```python x = 5 if x > 10: print("Greater") print("Done") ```', answer: 'The condition `x > 10` evaluates to `False`',
                  options: ['The condition `x > 10` evaluates to `False`', 'Greater'],
                  hint: 'Revisit relational operators and boolean expressions (node c11_cs_cbse_05_002) and practice.',
                  misconception: 'Students often believe that the condition in an `if` statement must be enclosed in parentheses, writing `if (x > 0):` because they have.' }
          ],
            remediations: { 'the-condition-in-an-if': { steps: ['Have the student write three `if` statements on paper: one with parentheses, one without, and one with `=` by mistake.', 'Ask them to predict which will run and which will error.', 'Run each in the interpreter to confirm: the first two work identically, the third gives `SyntaxError`.', 'Emphasize that Python uses indentation, not braces or parentheses, to define blocks.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_004', difficulty: 'standard',
          question: 'An **if-else statement** is a two-way branching control structure that executes.',
          hint: 'Revisit c11_cs_cbse_05_002 (Relational Operators and Boolean Expressions) and practice.',
          misconception: 'Students often believe that the `else` block executes **only when the `if` condition is syntactically false** but.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python age = 17 if age >= 18: print("Eligible to vote") else: print("Not eligible to vote") ```', answer: 'Output: `Not eligible to vote`',
                  options: ['Output: `Not eligible to vote`', 'Eligible to vote'],
                  hint: 'Revisit c11_cs_cbse_05_002 (Relational Operators and Boolean Expressions) and practice evaluating.',
                  misconception: 'Students often believe that the `else` block executes **only when the `if` condition is syntactically false** but forget that the condition.' }
          ],
            remediations: { 'the-else-block-executes-only': { steps: ['**Trace with a table**: Make the student create a two-column table: "Line executed" vs "Variable values".', 'Step through line-by-line, showing that the `if` condition is evaluated at line 2 and the decision is fixed.', '**Physical analogy**: Use a traffic signal – the light checks traffic once and decides green/red; changing traffic.', '**Fix the code**: Move the `marks = 20` line **before** the `if` and re-trace.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_005', difficulty: 'standard',
          question: 'Nested if statements allow placing one if-else construct inside another.',
          hint: 'Revisit c11_cs_cbse_05_004 (if-else Statement with Examples) and c11_cs_cbse_05_002.',
          misconception: 'Students often believe that multiple separate `if` statements behave like an `if-elif-else` ladder.',
          parts: [
                { id: 'a', prompt: 'What is the exact output of the following code snippet when `marks = 75`?', answer: 'The output is `Grade B`',
                  options: ['The output is `Grade B`', 'multiple separate `if` statements behave like an `if-elif-else` ladder'],
                  hint: 'Revisit c11_cs_cbse_05_004 (if-else Statement with Examples) and c11_cs_cbse_05_002 (Relational.',
                  misconception: 'Students often believe that multiple separate `if` statements behave like an `if-elif-else` ladder.' },
                { id: 'b', prompt: 'Compare the execution flow and readability of these two approaches for a 4-category classification problem. Which is preferable and why?', answer: 'Approach 2 (if-elif-else ladder) is preferable',
                  options: ['Approach 2 (if-elif-else ladder) is preferable', 'multiple separate `if` statements behave like an `if-elif-else` ladder'],
                  hint: 'Revisit c11_cs_cbse_05_004 (if-else Statement with Examples) and c11_cs_cbse_05_002 (Relational.',
                  misconception: 'Students often believe that multiple separate `if` statements behave like an `if-elif-else` ladder.' }
          ],
            remediations: { 'multiple-separate-if-statements-behave': { steps: ['Ask the student to manually trace the "multiple separate if" code with `marks = 95` on paper, writing each condition.', 'Then trace the `if-elif-else` version with the same input.', 'Highlight that in the ladder, after a true condition, the interpreter jumps to the statement after the entire ladder.', 'For indentation errors, use a visual aid: draw vertical lines connecting each `if`, `elif`, `else` at the same.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_006', difficulty: 'standard',
          question: 'A conditional expression (ternary operator) in Python is an expression of the.',
          hint: 'Revisit `if-else` statement syntax (node c11_cs_cbse_05_004) and practice writing 5.',
          misconception: 'Students often believe the ternary operator is just a "shorter if-else" and try to use it for executing multiple.',
          parts: [
                { id: 'a', prompt: 'Write the exact syntax of Python\'s ternary operator using the placeholders `condition`, `value_if_true`, and `value_if_false`.', answer: 'Correct syntax: `value_if_true if condition else value_if_false`',
                  options: ['Correct syntax: `value_if_true if condition else value_if_false`', 'shorter if-else', ') if age >= 18 else print('],
                  hint: 'Revisit `if-else` statement syntax (node c11_cs_cbse_05_004) and practice writing 5.',
                  misconception: 'Students often believe the ternary operator is just a "shorter if-else" and try to use it for executing multiple statements, e.g.' },
                { id: 'b', prompt: 'Explain in your own words why the following code prints `True`: ```python x = 10 result = "Even" if x % 2 == 0 else "Odd" print(result == "Even") ```', answer: 'The condition `x % 2 == 0` evaluates to `True`',
                  options: ['The condition `x % 2 == 0` evaluates to `True`', 'because x is 10', 'shorter if-else', ') if age >= 18 else print('],
                  hint: 'Revisit `if-else` statement syntax (node c11_cs_cbse_05_004) and practice writing 5.',
                  misconception: 'Students often believe the ternary operator is just a "shorter if-else" and try to use it for executing multiple statements, e.g.' },
                { id: 'c', prompt: 'Rewrite the following `if-else` block as a single ternary expression assigned to variable `grade`: ```python marks = 85 if marks >= 90: grade = "A" else: grade.', answer: '`grade = "A" if marks >= 90 else "B"`',
                  options: ['`grade = "A" if marks >= 90 else "B"`', 'shorter if-else', ') if age >= 18 else print(', 'in statement syntax'],
                  hint: 'Revisit `if-else` statement syntax (node c11_cs_cbse_05_004) and practice writing 5.',
                  misconception: 'Students often believe the ternary operator is just a "shorter if-else" and try to use it for executing multiple statements, e.g.' }
          ],
            remediations: { 'the-ternary-operator-is-just': { steps: ['Have the student write a 3-line `if-else` block that assigns a variable based on a condition.', 'Ask them to cover the `if-else` lines and write only the assignment line using the pattern `var = true_val if cond else.', 'Practice with 5 examples where the condition uses relational operators (`>`, `<=`, `==`) and the values are numbers.', 'Explicitly contrast: "Use `if-else` *statements* when you need to *do* things (print, call functions, multiple steps).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
