import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch05_p1: SimDef = {
    id: 'v3_c11_ip_ch05_p1',
    title: 'Functions and Modules · Part 1/2',
    subtitle: 'Catch the call that never happened — and why reuse beats speed as the reason for functions.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Functions and Modules · Part 1/2',
    chapters: ['c11_ip_ch05'],
    nodeIds: ['c11_ip_cbse_05_001', 'c11_ip_cbse_05_002', 'c11_ip_cbse_05_003', 'c11_ip_cbse_05_004', 'c11_ip_cbse_05_005', 'c11_ip_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developer shrinking a copy-paste monster', intro: 'GST and discount logic rewritten for every canteen order — one rate change and twenty places to fix. There is a better shape.', goal: 'Separate function definition from invocation and justify modularity by maintainability, not speed.' },
    discovery: {
        question: 'The program runs without error and prints nothing. The last line reads `calculate` — where\'s the bug?',
        options: ['Missing parentheses — `calculate` only references the function object; `calculate()` is what invokes it', 'Python refused to run the function silently', 'The variables a and b went out of scope', 'The function needs a return statement to print'],
        answer: 'Missing parentheses — `calculate` only references the function object; `calculate()` is what invokes it',
        hook: 'And `def` alone never executes anything — definition is a recipe, the call is the cooking; also, functions organise code, they don\'t speed it up.',
    },
    teaching: [
        { title: 'Introduction to Functions and Advantages of Modular Programming', text: 'A function is a named, reusable block of code that performs a specific task and optionally returns a value.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Refactor a 20-shape if-elif into named functions, expose the maintenance and reuse failures of copy-paste, then call print_line() three times correctly.',
        labels: ['Introduction to Functions', 'Defining a Function Using', 'Parameters and Arguments: Positional', 'Functions Returning Values', 'Scope of Variables: Local', 'The global Keyword'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_001', title: 'Introduction to Functions and Advantages of Modular Programming',
          caseStudy: { intro: 'Imagine you are writing a program for a school canteen that calculates the total bill for multiple students.',
            decisions: [{ prompt: 'What is the primary purpose of a function in programming?', options: [
                { text: 'A function is a named block of code that performs a specific task and can be reused', outcome: 'A function is a named block of code that performs a specific task and can be reused multiple times.' },
                { text: 'functions are used to store data', outcome: 'Not quite — Students often believe that **functions are only useful when the exact same code is repeated.', reveals: 'functions-are-only-useful-when' },
                { text: 'functions make programs run faster', outcome: 'Not quite — Students often believe that **functions are only useful when the exact same code is repeated.', reveals: 'functions-are-only-useful-when' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_002', title: 'Defining a Function Using the def Keyword and Calling It',
          caseStudy: { intro: 'Imagine you are writing a program to calculate the area of a circle multiple times for different radii.',
            decisions: [{ prompt: 'What is the exact syntax to define a function named `greet` that takes no parameters and prints "Hello"?', options: [
                { text: 'The correct syntax is: ``` def greet(): print("Hello") ```', outcome: 'The correct syntax is: ``` def greet(): print("Hello") ``` A wrong answer (e.g., missing colon.' },
                { text: 'writing `def myfunc():` automatically runs the code inside the function', outcome: 'Not quite — Students often think that writing `def myfunc():` automatically runs the code inside the function.', reveals: 'writing-def-myfunc-automatically-runs' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_003', title: 'Parameters and Arguments: Positional and Default Arguments',
          caseStudy: { intro: 'Imagine you are designing a function to calculate the total cost of a mobile recharge plan.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python def greet(name, greeting="Hello"): print(greeting, name) greet("Aman").', options: [
                { text: 'The output is: ``` Hello Aman Namaste Priya ``` A wrong answer (e.g., swapping the order', outcome: 'The output is: ``` Hello Aman Namaste Priya ``` A wrong answer (e.g., swapping the order or missing.' },
                { text: 'positional arguments cannot follow keyword arguments', outcome: 'Not quite — Students believe default argument values are re-evaluated fresh on every function call.', reveals: 'default-argument-values-are-re' },
                { text: 'non-default parameters cannot follow default parameters', outcome: 'Not quite — Students believe default argument values are re-evaluated fresh on every function call.', reveals: 'default-argument-values-are-re' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_004', title: 'Functions Returning Values and the return Statement',
          caseStudy: { intro: 'Imagine you\'re building a billing system for a kirana store: you need a function that calculates the total price after GST for any item.',
            decisions: [{ prompt: 'What is the value of the expression `result = greet()` if `greet` is defined as `def greet(): print("Namaste")` and the function is called?', options: [
                { text: 'The value of `result` is `None`', outcome: 'The value of `result` is `None`. The function `greet` prints "Namaste" but has no `return`.' },
                { text: 'Namaste', outcome: 'Not quite — Students believe `print` and `return` are interchangeable — that printing a value inside a function.', reveals: 'print-and-return-are-interchangeable' },
                { text: 'sends it back', outcome: 'Not quite — Students believe `print` and `return` are interchangeable — that printing a value inside a function.', reveals: 'print-and-return-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_005', title: 'Scope of Variables: Local and Global Variables',
          caseStudy: { intro: 'Imagine you write a diary (global variable) that everyone in the house can read.',
            decisions: [{ prompt: 'What is the output of the following code? ```python x = 10 def show(): print(x) show() print(x) ```', options: [
                { text: 'Output: ``` 10 10 ```', outcome: 'Output: ``` 10 10 ``` A wrong answer (e.g., thinking the second print fails) reveals the student.' },
                { text: 'the second print fails', outcome: 'Not quite — Students believe that if a variable is defined globally, any function can **modify** it simply.', reveals: 'if-a-variable-is-defined' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_006', title: 'The global Keyword and Modifying Global Variables',
          caseStudy: { intro: 'Imagine you are building a simple banking simulator where a global variable `account_balance = 5000` represents the user\'s savings.',
            decisions: [{ prompt: 'What is the exact syntax to declare a global variable `counter` inside a function so that assignments to `counter` modify the global.', options: [
                { text: 'Correct answer: `global counter` placed at the beginning of the function body before any', outcome: 'Correct answer: `global counter` placed at the beginning of the function body before any use.' },
                { text: 'global', outcome: 'Not quite — Students often believe that `global` makes a variable "global" for the entire program permanently.', reveals: 'global-makes-a-variable-global' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a canteen-billing program, a teammate pastes the GST-and-discount code for every item. When you suggest functions, he says: \'Functions are only for code repeated verbatim — a once-used step like validating input doesn\'t deserve one.\'',
            decisions: [{ prompt: 'What do functions really offer beyond copy-paste removal?', options: [
                { text: 'Name the deeper benefit: functions create abstraction boundaries — `calculate_gst()` or `validate_input()` let readers see WHAT happens without wading through HOW, even if called once. Modular programming decomposes the program into single-responsibility blocks that can be developed, tested and updated separately — change the GST rate in one place.', outcome: 'The program restructures: reuse is one payoff, but readability, testability and single-point updates are why one-time steps also deserve functions.' },
                { text: 'Agree — one-time logic can stay inline; functions exist to kill duplication only.', outcome: 'Monolithic \'one-time\' code hides intent: naming a step is documentation, and isolating it is what makes the program debuggable.', reveals: 'functions-only-for-repetition' },
                { text: 'Define functions but call them inside their own bodies to \'keep everything together.\'', outcome: 'A call inside the body is recursion — unintended, it recurses forever; definitions only execute when invoked from outside.', reveals: 'call-inside-definition' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Write the logic once, name it, call it anywhere — the function\'s real payoff is a program you can change without fear.',
            decisions: [{ prompt: 'What comes next? Functions and Modules · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Functions and Modules · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_001', difficulty: 'standard',
          question: 'A function is a named, reusable block of code that performs a specific task and.',
          hint: 'Revisit algebraic expressions and substitution (Class 7 Math: c7_math_ch04_001 and.',
          misconception: 'Students often believe that **functions are only useful when the exact same code is repeated verbatim**.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast a function and a module in Python. Give one example of when you would create a module instead of just a function.', answer: 'A **function** is a single reusable block of code within a file',
                  options: ['A **function** is a single reusable block of code within a file', 'modules are just bigger functions', '**functions are only useful when the exact same code is repeated verbatim**'],
                  hint: 'Revisit algebraic expressions and substitution (Class 7 Math: c7_math_ch04_001 and c8_math_ch13_5).',
                  misconception: 'Students often believe that **functions are only useful when the exact same code is repeated verbatim**.' }
          ],
            remediations: { 'functions-are-only-useful-when': { steps: ['Show a 30-line program that reads a CSV, cleans data, computes average, and prints a report — all in one block.', 'Ask the student: "If the CSV format changes tomorrow, which lines do you need to change?" They will struggle to isolate.', 'Then refactor live: extract `read_csv()`, `clean_data()`, `compute_average()`, `print_report()`.', 'Ask: "Now if the CSV format changes, which function do you touch?" 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **functions are only useful when the exact same code is repeated verbatim**.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Using functions always makes a program run faster because the code is reused." Defend your position with reasoning.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', '**functions are only useful when the exact same code is repeated verbatim**'],
                  hint: 'Revisit algebraic expressions and substitution (Class 7 Math: c7_math_ch04_001 and c8_math_ch13_5).',
                  misconception: 'Students often believe that **functions are only useful when the exact same code is repeated verbatim**.' },
                { id: 'b', prompt: 'Design a modular structure (list the functions/modules) for a "Library Management System" that handles book issue, return, fine calculation, and member.', answer: 'Good answer includes at least 4 functions: `register_member()`, `issue_book()`,',
                  options: ['Good answer includes at least 4 functions: `register_member()`, `issue_book()`,', '**functions are only useful when the exact same code is repeated verbatim**'],
                  hint: 'Revisit algebraic expressions and substitution (Class 7 Math: c7_math_ch04_001 and c8_math_ch13_5).',
                  misconception: 'Students often believe that **functions are only useful when the exact same code is repeated verbatim**.' }
          ],
            remediations: { 'functions-are-only-useful-when': { steps: ['Show a 30-line program that reads a CSV, cleans data, computes average, and prints a report — all in one block.', 'Ask the student: "If the CSV format changes tomorrow, which lines do you need to change?" They will struggle to isolate.', 'Then refactor live: extract `read_csv()`, `clean_data()`, `compute_average()`, `print_report()`.', 'Ask: "Now if the CSV format changes, which function do you touch?" 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_002', difficulty: 'standard',
          question: 'A function in Python is a named block of reusable code that performs a specific.',
          hint: 'If stuck, revisit the concept of "modular programming" and "function" from.',
          misconception: 'Students often think that writing `def myfunc():` automatically runs the code inside the function.',
          parts: [
                { id: 'a', prompt: 'What is the exact syntax to define a function named `greet` that takes no parameters and prints "Hello"?', answer: 'The correct syntax is: ``` def greet(): print("Hello") ```',
                  options: ['The correct syntax is: ``` def greet(): print("Hello") ```', 'writing `def myfunc():` automatically runs the code inside the function'],
                  hint: 'If stuck, revisit the concept of "modular programming" and "function" from c11_ip_cbse_05_001, and.',
                  misconception: 'Students often think that writing `def myfunc():` automatically runs the code inside the function.' },
                { id: 'b', prompt: 'Consider the following code: ```python def show(): print("A") print("B") show() print("C") ``` Predict the exact output and explain the order of execution.', answer: 'Output: ``` B A C ``` Explanation: The definition of `show` is skipped initially',
                  options: ['Output: ``` B A C ``` Explanation: The definition of `show` is skipped initially', 'writing `def myfunc():` automatically runs the code inside the function'],
                  hint: 'If stuck, revisit the concept of "modular programming" and "function" from c11_ip_cbse_05_001, and.',
                  misconception: 'Students often think that writing `def myfunc():` automatically runs the code inside the function.' }
          ],
            remediations: { 'writing-def-myfunc-automatically-runs': { steps: ['If the student exhibits the above misconception, do the following: 1.', 'Show a side-by-side comparison: a function definition block (with `def`) and a separate call statement.', 'Use a highlighter to mark the indentation level.', 'Ask the student to trace the code line by line with a pencil, marking which lines execute and in what order.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_003', difficulty: 'standard',
          question: 'Parameters are variables declared in a function definition that act.',
          hint: 'If stuck, revisit c11_ip_cbse_05_002 (function definition and call syntax) and.',
          misconception: 'Students believe default argument values are re-evaluated fresh on every function call.',
          parts: [
                { id: 'a', prompt: 'Given the function: ```python def book_ticket(destination, source="Delhi", class_type="Sleeper"): print(f"Booking {class_type} ticket from {source}.', answer: '`book_ticket("Chennai", "Mumbai", "AC")` OR `book_ticket(destination="Chennai",',
                  options: ['`book_ticket("Chennai", "Mumbai", "AC")` OR `book_ticket(destination="Chennai",', 'Chennai', 'Mumbai', 'positional arguments cannot follow keyword arguments'],
                  hint: 'If stuck, revisit c11_ip_cbse_05_002 (function definition and call syntax) and c7_math_ch04_009.',
                  misconception: 'Students believe default argument values are re-evaluated fresh on every function call.' },
                { id: 'b', prompt: 'Compare the behaviour of these two functions when called as `func()` with no arguments: ```python', answer: 'Function A returns `[1]`, then `[1, 1]`, then `[1, 1, 1]`',
                  options: ['Function A returns `[1]`, then `[1, 1]`, then `[1, 1, 1]`', 'positional arguments cannot follow keyword arguments', 'non-default parameters cannot follow default parameters', 'default argument values are re-evaluated fresh on every function call'],
                  hint: 'If stuck, revisit c11_ip_cbse_05_002 (function definition and call syntax) and c7_math_ch04_009.',
                  misconception: 'Students believe default argument values are re-evaluated fresh on every function call.' }
          ],
            remediations: { 'default-argument-values-are-re': { steps: ['Write a minimal function `def f(x=[]): x.append(1); print(x)` and call it three times in the shell.', 'Observe the output `[1]`, `[1, 1]`, `[1, 1, 1]`.', 'Explain: "The empty list `[]` is created ONCE when Python reads the `def` line, not each time you call `f()`.', 'All calls share that SAME list object." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_004', difficulty: 'standard',
          question: 'A function that uses the `return` statement sends a computed value back to the.',
          hint: 'Revisit "Defining a Function Using the def Keyword and Call" (c11_ip_cbse_05_002) and.',
          misconception: 'Students believe `print` and `return` are interchangeable — that printing a value inside a function "sends it back".',
          parts: [
                { id: 'a', prompt: 'What is the value of the expression `result = greet()` if `greet` is defined as `def greet(): print("Namaste")` and the function is called?', answer: 'The value of `result` is `None`',
                  options: ['The value of `result` is `None`', 'Namaste', 'sends it back'],
                  hint: 'Revisit "Defining a Function Using the def Keyword and Call" (c11_ip_cbse_05_002) and "Parameters.',
                  misconception: 'Students believe `print` and `return` are interchangeable — that printing a value inside a function "sends it back" to the caller.' }
          ],
            remediations: { 'print-and-return-are-interchangeable': { steps: ['Show the student a side-by-side trace: `def f1(): return 10` vs `def f2(): print(10)`.', 'Call each and assign: `x = f1(); y = f2()`.', 'Print `x` and `y` — they see `10` and `None`.', 'Ask: "If you want to use the result in another calculation, like `total = area(5) + 100`, which version works?" — only.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_005', difficulty: 'standard',
          question: 'The scope of a variable defines the region of a program where that variable.',
          hint: 'Revisit c11_ip_cbse_05_003 (Parameters) and trace how parameter variables disappear after.',
          misconception: 'Students believe that if a variable is defined globally, any function can **modify** it simply by assigning to.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code? ```python x = 10 def show(): print(x) show() print(x) ```', answer: 'Output: ``` 10 10 ```',
                  options: ['Output: ``` 10 10 ```', 'the second print fails'],
                  hint: 'Revisit c11_ip_cbse_05_003 (Parameters) and trace how parameter variables disappear after the.',
                  misconception: 'Students believe that if a variable is defined globally, any function can **modify** it simply by assigning to it (e.g., `x = x + 1` inside.' }
          ],
            remediations: { 'if-a-variable-is-defined': { steps: ['Show the `UnboundLocalError` example live.', 'Use the "variable as a label" analogy: assignment sticks a new label on a new box; without `global`, Python assumes you.', 'Have the student add `global x` at the top of the function and re-run.', 'Give a tracing exercise where they label each variable as L (local) or G (global) before execution.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_006', difficulty: 'standard',
          question: 'The `global` keyword in Python is a declaration statement used inside.',
          hint: 'Revisit the scope rules from c11_ip_cbse_05_005: trace a function that assigns to.',
          misconception: 'Students often believe that `global` makes a variable "global" for the entire program permanently, or that it\'s needed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The `global` keyword in Python is a declaration statement used inside a function to',
                  options: ['The `global` keyword in Python is a declaration statement used inside a function to', 'A function is a named, reusable block of code that performs a specific task and', 'A function in Python is a named block of reusable code that performs a specific task,', 'Parameters are variables declared in a function definition that act as placeholders for'],
                  hint: 'Revisit the scope rules from c11_ip_cbse_05_005: trace a function that assigns to a variable with.',
                  misconception: 'Students often believe that `global` makes a variable "global" for the entire program permanently, or that it\'s needed to *read* a global.' }
          ],
            remediations: { 'global-makes-a-variable-global': { steps: ['Show the student the exact syntax error `global x = 10` and ask "What does Python expect after `global`?" (Answer:.', 'Demonstrate with a minimal example: `x=1; def f(): print(x); f()` works without `global` — prove reading globals.', 'Then show `x=1; def f(): x=2; f(); print(x)` prints 1 — prove assignment creates local.', 'Add `global x` inside `f` and show it prints 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
