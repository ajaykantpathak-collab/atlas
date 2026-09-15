import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch03_p1: SimDef = {
    id: 'v3_c11_ip_ch03_p1',
    title: 'Conditional and Iterative Statements · Part 1/2',
    subtitle: 'Learn that whitespace is grammar and `and` outranks `or`.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Conditional and Iterative Statements · Part 1/2',
    chapters: ['c11_ip_ch03'],
    nodeIds: ['c11_ip_cbse_03_001', 'c11_ip_cbse_03_002', 'c11_ip_cbse_03_003', 'c11_ip_cbse_03_004', 'c11_ip_cbse_03_005', 'c11_ip_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer whose bugs live in the left margin', intro: 'Directions to a friend: \'go straight, IF the main road\'s crowded take the service lane\' — control flow is just that, typed.', goal: 'Use indentation-defined blocks, relational operators and Boolean precedence correctly.' },
    discovery: {
        question: 'Evaluate in your head: `True or False and False` — what does Python actually compute?',
        options: ['True — `and` binds tighter than `or`, so it\'s `True or (False and False)`', 'False — left to right gives `True or False` then `and False`', 'False — `or` always wins over `and`', 'An error — mixed operators can\'t combine'],
        answer: 'True — `and` binds tighter than `or`, so it\'s `True or (False and False)`',
        hook: 'And indentation isn\'t decoration — dedent `print(fact)` one level and it escapes the loop entirely; in Python the whitespace is the syntax.',
    },
    teaching: [
        { title: 'Introduction to Control Flow and Statement Blocks', text: 'Control flow refers to the order in which individual statements, instructions, or function calls are executed or evaluated in a program.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Convert \'if score ≥ 50 print Pass and set grade\' into correctly indented blocks, then trace a factorial loop to see what escapes the indentation.',
        labels: ['Introduction to Control Flow', 'Relational Operators and Boolean', 'The if Statement: Syntax,', 'The if-else Statement with', 'Nested if and', 'Conditional Expression (Ternary Operator)'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_001', title: 'Introduction to Control Flow and Statement Blocks',
          caseStudy: { intro: 'Imagine you are giving directions to a friend to reach your house from school.',
            decisions: [{ prompt: 'What is the default control flow mechanism in a Python program when no conditional or looping statements are used?', options: [
                { text: 'The default control flow is **sequential execution**: statements are executed one after', outcome: 'The default control flow is **sequential execution**: statements are executed one after another.' },
                { text: 'random order', outcome: 'Not quite — **Misconception:** "Indentation in Python is just a style convention like in C++ or Java; the.', reveals: 'misconception-indentation-in-python-is' },
                { text: 'alphabetical order', outcome: 'Not quite — **Misconception:** "Indentation in Python is just a style convention like in C++ or Java; the.', reveals: 'misconception-indentation-in-python-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_002', title: 'Relational Operators and Boolean Expressions in Python',
          caseStudy: { intro: 'Imagine you\'re building a student eligibility checker for a scholarship: a student must have marks ≥ 85 AND attendance ≥ 75% OR be a sports champion.',
            decisions: [{ prompt: 'What is the result of the expression `\'Apple\' < \'Banana\'` in Python, and why does Python give this result?', options: [
                { text: 'The result is `True`', outcome: 'The result is `True`. Python compares strings lexicographically using Unicode code points.' },
                { text: '`and` and `or` have equal precedence and evaluate left-to-right', outcome: 'Not quite — Students believe `and` and `or` have equal precedence and evaluate left-to-right.', reveals: 'and-and-or-have-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_005', title: 'Nested if and the if-elif-else Ladder',
          caseStudy: { intro: 'Imagine you are writing a program for a metro ticket kiosk: the fare depends on the zone (1, 2, or 3) *and* the passenger type (student, senior citizen,.',
            decisions: [{ prompt: 'What is the exact output of the following code snippet when the user enters `15`?', options: [
                { text: 'The output is `B`', outcome: 'The output is `B`. The outer condition `num > 10` is true (15 > 10), so the inner `if` executes.' },
                { text: 'the inner condition is true', outcome: 'Not quite — Students often believe that `elif` is merely a syntactic shortcut for `else: if` and that.', reveals: 'elif-is-merely-a-syntactic' },
                { text: 'the outer condition is false or that indentation does not nest the inner `if`', outcome: 'Not quite — Students often believe that `elif` is merely a syntactic shortcut for `else: if` and that.', reveals: 'elif-is-merely-a-syntactic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate\'s scholarship checker prints \'Congratulations\' for every student, pass or fail. He also wrote `if marks == 33 or 40:` expecting it to test \'marks equals 33 or 40\' — it always passes. He insists \'indentation is just style\' and \'and/or evaluate left to right.\'',
            decisions: [{ prompt: 'Which Python rules is he breaking?', options: [
                { text: 'Explain all three: indentation IS syntax — a dedented `print` leaves the if-block and runs unconditionally. `marks == 33 or 40` parses as `(marks == 33) or 40` — and 40 is truthy, so it\'s always True; the fix is `marks == 33 or marks == 40`. And precedence is not > and > or — `and` binds before `or`, it isn\'t left-to-right.', outcome: 'He learns that whitespace groups statements, truthiness isn\'t comparison, and Boolean operators have a BODMAS-like order.' },
                { text: 'Let the indentation slide — Python ignores extra spaces like C++ does.', outcome: 'In Python indentation defines the block: inconsistent or dedented lines change what executes — it\'s structure, not style.', reveals: 'indentation-is-just-style' },
                { text: 'Keep `marks == 33 or 40` — the English reading is what Python intends.', outcome: 'Python reads it as two separate expressions: a comparison OR a number — and a nonzero number is truthy, so the condition never fails.', reveals: 'or-40-tests-equality' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Write `33 <= marks <= 100` — Python reads logic like mathematics, but only if you respect the precedence and the tabs.',
            decisions: [{ prompt: 'What comes next? Conditional and Iterative Statements · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Conditional and Iterative Statements · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_001', difficulty: 'standard',
          question: 'Control flow refers to the order in which individual statements, instructions.',
          hint: 'If stuck, revisit the "Variables" and "Input/Output" sections of Chapter 3 (NCERT) and.',
          misconception: '**Misconception:** "Indentation in Python is just a style convention like in C++ or Java; the interpreter ignores extra.',
          parts: [
                { id: 'a', prompt: 'Compare the block structure of Python with a language like C++ or Java that uses curly braces `{}`.', answer: 'In brace-delimited languages, whitespace is insignificant',
                  options: ['In brace-delimited languages, whitespace is insignificant', 'indentation is just for readability', ') print(', ') # Student thinks'],
                  hint: 'If stuck, revisit the "Variables" and "Input/Output" sections of Chapter 3 (NCERT) and practice.',
                  misconception: '**Misconception:** "Indentation in Python is just a style convention like in C++ or Java; the interpreter ignores extra spaces." **Why.' }
          ],
            remediations: { 'misconception-indentation-in-python-is': { steps: ['**Visual Block Mapping:** Give the student a printed code snippet with 3-4 nested blocks.', 'Ask them to draw vertical lines connecting each line to its block level using a ruler.', 'Physically tracing the indentation columns makes the block structure tangible.', '**Indentation Error Surgery:** Provide a deliberately broken script with 5 indentation errors (mixed tabs/spaces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Indentation in Python is just a style convention like in C++ or Java; the interpreter ignores extra.',
          parts: [
                { id: 'a', prompt: 'A student writes the following code to calculate the factorial of 5 using a loop. They claim the output will be 120.', answer: 'The student is **correct**',
                  options: ['The student is **correct**', ') print(', ') # Student thinks'],
                  hint: 'If stuck, revisit the "Variables" and "Input/Output" sections of Chapter 3 (NCERT) and practice.',
                  misconception: '**Misconception:** "Indentation in Python is just a style convention like in C++ or Java; the interpreter ignores extra spaces." **Why.' },
                { id: 'b', prompt: 'Design a small Python program (5-7 lines) that uses **all three** fundamental control flows: sequential, conditional, and iterative.', answer: '```python correct_pass = "ip123" for attempt in range(3): # iterative flow pwd =',
                  options: ['```python correct_pass = "ip123" for attempt in range(3): # iterative flow pwd =', ') print(', ') # Student thinks'],
                  hint: 'If stuck, revisit the "Variables" and "Input/Output" sections of Chapter 3 (NCERT) and practice.',
                  misconception: '**Misconception:** "Indentation in Python is just a style convention like in C++ or Java; the interpreter ignores extra spaces." **Why.' }
          ],
            remediations: { 'misconception-indentation-in-python-is': { steps: ['**Visual Block Mapping:** Give the student a printed code snippet with 3-4 nested blocks.', 'Ask them to draw vertical lines connecting each line to its block level using a ruler.', 'Physically tracing the indentation columns makes the block structure tangible.', '**Indentation Error Surgery:** Provide a deliberately broken script with 5 indentation errors (mixed tabs/spaces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_002', difficulty: 'standard',
          question: 'Relational operators in Python (==, !=, >, <, >=, <=) compare two operands and.',
          hint: 'Revisit Class 7 Math: "Comparing Expressions Using <, > and = Signs" (c7_math_ch02_003).',
          misconception: 'Students believe `and` and `or` have equal precedence and evaluate left-to-right.',
          parts: [
                { id: 'a', prompt: 'What is the result of the expression `\'Apple\' < \'Banana\'` in Python, and why does Python give this result?', answer: 'The result is `True`',
                  options: ['The result is `True`', '`and` and `or` have equal precedence and evaluate left-to-right'],
                  hint: 'Revisit Class 7 Math: "Comparing Expressions Using <, > and = Signs" (c7_math_ch02_003) and Class 8.',
                  misconception: 'Students believe `and` and `or` have equal precedence and evaluate left-to-right.' },
                { id: 'b', prompt: 'Evaluate the expression: `not (5 >= 5) and (3 != 3 or 7 <= 7)`. Show each step.', answer: 'Step 1: Parentheses first',
                  options: ['Step 1: Parentheses first', '`and` and `or` have equal precedence and evaluate left-to-right'],
                  hint: 'Revisit Class 7 Math: "Comparing Expressions Using <, > and = Signs" (c7_math_ch02_003) and Class 8.',
                  misconception: 'Students believe `and` and `or` have equal precedence and evaluate left-to-right.' },
                { id: 'c', prompt: 'Compare the expressions `5 > 3 > 1` and `(5 > 3) > 1`. Are they equivalent in Python? Why or why not?', answer: 'No, they are not equivalent',
                  options: ['No, they are not equivalent', '`and` and `or` have equal precedence and evaluate left-to-right'],
                  hint: 'Revisit Class 7 Math: "Comparing Expressions Using <, > and = Signs" (c7_math_ch02_003) and Class 8.',
                  misconception: 'Students believe `and` and `or` have equal precedence and evaluate left-to-right.' }
          ],
            remediations: { 'and-and-or-have-equal': { steps: ['`2<1`→False, `4==4`→True.', '`False and True`→False.', '`5>3`→True, `True or False`→True. 5. Contrast with left-to-right wrong evaluation. 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_003', difficulty: 'standard',
          question: 'The `if` statement is a conditional control structure that executes a block.',
          hint: 'Revisit c11_ip_cbse_03_002 (Relational Operators and Boolean Expressions) and practice.',
          misconception: 'Students often write `if (x > 10):` with parentheses around the condition, mimicking C/C++/Java syntax.',
          parts: [
                { id: 'a', prompt: 'Given the code snippet below, what will be the output when `marks = 75`? Trace the execution step by step.', answer: 'Correct answer: Output is two lines: "Pass" followed by "Result declared"',
                  options: ['Correct answer: Output is two lines: "Pass" followed by "Result declared"', 'Result declared'],
                  hint: 'Revisit c11_ip_cbse_03_002 (Relational Operators and Boolean Expressions) and practice writing.',
                  misconception: 'Students often write `if (x > 10):` with parentheses around the condition, mimicking C/C++/Java syntax.' }
          ],
            remediations: { 'students-often-write-if-x': { steps: ['Show the student the exact `SyntaxError` message for `if x = 10:` and explain: "Python forbids assignment inside `if`.', 'Have them type three correct `if` conditions using `==`, `>`, and `in` without parentheses.', 'Ask them to deliberately omit the colon and observe the `SyntaxError: expected \':\'` — reinforce that colon is the block.', 'Give a 2-line code snippet with inconsistent indentation (mix of tabs and spaces) and have them fix it using 4 spaces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_004', difficulty: 'standard',
          question: 'The if-else statement is a two-way branching control structure that executes.',
          hint: 'Revisit relational and logical operators (node c11_ip_cbse_03_002) and practice writing.',
          misconception: 'Students often treat `else` as "if the condition is false, do this; otherwise continue" and mistakenly believe they can.',
          parts: [
                { id: 'a', prompt: 'Compare the following two code snippets. Do they produce the same output for every possible input? Justify your answer.', answer: 'Yes, they produce identical output for all inputs',
                  options: ['Yes, they produce identical output for all inputs', 'they differ when x=0'],
                  hint: 'Revisit relational and logical operators (node c11_ip_cbse_03_002) and practice writing conditions.',
                  misconception: 'Students often treat `else` as "if the condition is false, do this; otherwise continue" and mistakenly believe they can write multiple.' }
          ],
            remediations: { 'students-often-treat-else-as': { steps: ['Have the student trace a truth table: list 5 test inputs (e.g., -5, 0, 3, 10, 33) and manually write which block.', 'Ask them to rewrite the logic using two separate `if` statements with complementary conditions (`if marks > 33:` and.', 'Then show the `if-else` as a shorthand that guarantees mutual exclusion.', 'Finally, give a boundary-value exercise: "Modify the pass/fail program so that exactly 33 prints \'Borderline\' — can you.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_005', difficulty: 'standard',
          question: 'A **nested if** statement is an `if` or `if-else` construct placed entirely.',
          hint: 'Revisit the `if-else` syntax and flowchart from c11_ip_cbse_03_004, and practice tracing.',
          misconception: 'Students often believe that `elif` is merely a syntactic shortcut for `else: if` and that indentation does not affect.',
          parts: [
                { id: 'a', prompt: 'What is the exact output of the following code snippet when the user enters `15`?', answer: 'The output is `B`',
                  options: ['The output is `B`', 'the inner condition is true', 'the outer condition is false or that indentation does not nest the inner `if`'],
                  hint: 'Revisit the `if-else` syntax and flowchart from c11_ip_cbse_03_004, and practice tracing.',
                  misconception: 'Students often believe that `elif` is merely a syntactic shortcut for `else: if` and that indentation does not affect logic.' }
          ],
            remediations: { 'elif-is-merely-a-syntactic': { steps: ['Ask the student to draw a flowchart with diamonds and rectangles for a three-condition ladder (e.g., marks grading).', 'Emphasize that every diamond has exactly two exits (True/False) and that the "False" exit of one diamond goes to the.', 'Have them physically trace the code with a finger on paper for three boundary values (e.g., 75, 74, 60) using.', 'Show that after a block executes, the flow jumps to the statement *after* the entire ladder.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_03_006', difficulty: 'standard',
          question: 'The conditional expression (ternary operator) in Python is a single-line.',
          hint: 'Revisit node c11_ip_cbse_03_004 (if-else statement) and practice converting three if-else.',
          misconception: 'Students often write `if condition: value_if_true else: value_if_false` (mimicking the statement syntax) or place the.',
          parts: [
                { id: 'a', prompt: 'Compare the two snippets below. Are they functionally identical? Justify. ```python', answer: 'Yes, they are functionally identical for this simple assignment',
                  options: ['Yes, they are functionally identical for this simple assignment', 'B is faster', 'A allows multiple statements'],
                  hint: 'Revisit node c11_ip_cbse_03_004 (if-else statement) and practice converting three if-else.',
                  misconception: 'Students often write `if condition: value_if_true else: value_if_false` (mimicking the statement syntax) or place the condition at the.' }
          ],
            remediations: { 'students-often-write-if-condition': { steps: ['Write the correct syntax template on a card: `RESULT = TRUE_VAL if CONDITION else FALSE_VAL`.', 'Trace `x = "A" if 5>3 else "B"` aloud: "First check 5>3 → True → pick \'A\' → assign to x".', 'Contrast with statement form: `if 5>3: x="A" else: x="B"` — note the colon, indentation, and that it doesn\'t return.', 'Practice converting 3 simple if-else assignments to ternary form, then 2 nested ones.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
