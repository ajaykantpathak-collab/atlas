import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch08_p1: SimDef = {
    id: 'v3_c11_cs_ch08_p1',
    title: 'Functions in Python · Part 1/3',
    subtitle: 'Package logic into named, reusable blocks — and learn why defining runs nothing.',
    classLevel: 11, subject: 'computer_science', topic: 'Functions in Python · Part 1/3',
    chapters: ['c11_cs_ch08'],
    nodeIds: ['c11_cs_cbse_08_001', 'c11_cs_cbse_08_002', 'c11_cs_cbse_08_003', 'c11_cs_cbse_08_004', 'c11_cs_cbse_08_005', 'c11_cs_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer modularising a library system', intro: 'Three teammates, three features, one duplicated check. Refactor it into a function they can all call.', goal: 'Define and call functions with parameters, and explain reusability and maintainability.' },
    discovery: {
        question: 'A module loads, reaching a def block that contains a print — yet nothing appears on screen. Is the code broken?',
        options: ['No — def only stores the recipe; nothing inside runs until the function is called', 'Yes — print inside a function always runs at load', 'No — but only because print is ignored inside functions', 'Yes — the colon after the parameter list was missing'],
        answer: 'No — def only stores the recipe; nothing inside runs until the function is called',
        hook: 'Definition is a stored recipe, not a cooked meal — Python reads the def, shelves it, and waits for a call.',
    },
    teaching: [
        { title: 'Introduction to Functions and their Advantages', text: 'A function in Python is a named, reusable block of code that performs a specific task, optionally accepts input values (parameters), executes a sequence of statements, and optionally returns.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Write calculate_fine(days_late, rate) for a library, then give two teammates a shared book_exists() helper instead of duplicated checks.',
        labels: ['Introduction to Functions', 'Defining a Function Using', 'Calling a Function', 'Parameters and Arguments: Positional', 'Default Arguments in Functions', 'Keyword Arguments in Functions'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_001', title: 'Introduction to Functions and their Advantages',
          caseStudy: { intro: 'Imagine you are writing a program to calculate GST for hundreds of invoices in a shop—writing the same tax calculation formula repeatedly would make the code.',
            decisions: [{ prompt: 'What is the primary purpose of a function in Python, and how does it differ from writing the same code inline every time it is needed?', options: [
                { text: 'A function encapsulates a specific task into a named, reusable block that can be invoked', outcome: 'A function encapsulates a specific task into a named, reusable block that can be invoked multiple.' },
                { text: 'functions make code shorter', outcome: 'Not quite — Students often believe a function is "just a way to avoid typing the same code twice" and therefore.', reveals: 'a-function-is-just-a' },
                { text: 'just a way to avoid typing the same code twice', outcome: 'Not quite — Students often believe a function is "just a way to avoid typing the same code twice" and therefore.', reveals: 'a-function-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_003', title: 'Calling a Function and Function Return Value',
          caseStudy: { intro: 'Imagine you have a recipe card (function definition) for "make_chai" that lists steps but doesn\'t actually make tea until you follow it.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python def greet(): print("Hello") result = greet() print(result) ```', options: [
                { text: 'The output is: ``` Hello None ```', outcome: 'The output is: ``` Hello None ``` A wrong answer (e.g., thinking `result` stores "Hello") reveals.' },
                { text: 'gives back', outcome: 'Not quite — Students often think that a function "gives back" a value by printing it.', reveals: 'a-function-gives-back-a' },
                { text: '`result` stores "Hello', outcome: 'Not quite — Students often think that a function "gives back" a value by printing it.', reveals: 'a-function-gives-back-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You inherit a 90-line Python program for the school library — it reads a member\'s details, validates the card ID format, computes the fine, and prints a receipt, all in one flat sequence. Nothing is duplicated, so a teammate says: \'No point adding functions — functions are only for avoiding copy-paste.\'',
            decisions: [{ prompt: 'Is he right that functions would add nothing here?', options: [
                { text: 'No — functions package meaning, not just repetition: validate_card(), compute_fine() and print_receipt() each become named, testable units even if called once. The 90-line blob becomes a readable pipeline, bugs get isolated to one unit, and a rule change (new fine rate) edits one function.', outcome: 'Abstraction and maintainability are the primary wins of functions; deduplication is only the most visible one.' },
                { text: 'He\'s right — with no repeated code, functions would just add boilerplate.', outcome: 'That equates functions with copy-paste avoidance; a flat sequence that does five jobs still hides intent, resists testing, and makes every change risky.', reveals: 'functions-only-for-duplication' },
                { text: 'Split it — but only into functions that get called at least twice.', outcome: 'Call count isn\'t the criterion; a conceptual unit (validation, computation, output) deserves its own function even at one call site.', reveals: 'single-use-functions-worthless' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Functions aren\'t just copy-paste insurance — they\'re named decisions you can call, test and fix in one place.',
            decisions: [{ prompt: 'What comes next? Functions in Python · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Functions in Python · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_001', difficulty: 'standard',
          question: 'A function in Python is a named, reusable block of code that performs.',
          hint: 'Revisit Class 9 Mathematics Chapter 2 (Linear Polynomials) and Class 10 Mathematics.',
          misconception: 'Students often believe a function is "just a way to avoid typing the same code twice" and therefore only create.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the following two approaches for calculating the area of a circle for three different radii (5, 7, 10).', answer: 'Approach 2 better embodies abstraction',
                  options: ['Approach 2 better embodies abstraction', 'Approach 2 is shorter', 'just a way to avoid typing the same code twice'],
                  hint: 'Revisit Class 9 Mathematics Chapter 2 (Linear Polynomials) and Class 10 Mathematics Chapter 2.',
                  misconception: 'Students often believe a function is "just a way to avoid typing the same code twice" and therefore only create functions when they.' }
          ],
            remediations: { 'a-function-is-just-a': { steps: ['Ask the student to take their longest single-function program and identify three *logical phases* (e.g., input.', 'Have them extract each phase into a separately named function, even if called only once.', 'Run the program and confirm identical behavior.', 'Discuss: "Did the program change?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe a function is "just a way to avoid typing the same code twice" and therefore only create.',
          parts: [
                { id: 'a', prompt: 'A team of three students is building a library management system.', answer: 'They should create a shared helper function `book_exists(book_id)`',
                  options: ['They should create a shared helper function `book_exists(book_id)`', 'to keep functions independent', 'just a way to avoid typing the same code twice'],
                  hint: 'Revisit Class 9 Mathematics Chapter 2 (Linear Polynomials) and Class 10 Mathematics Chapter 2.',
                  misconception: 'Students often believe a function is "just a way to avoid typing the same code twice" and therefore only create functions when they.' },
                { id: 'b', prompt: 'Design a real-world scenario (Indian context) where a function would be essential, and write a pseudocode function signature (name, parameters, return type).', answer: 'Scenario: A railway ticketing system calculates fare based on distance, class',
                  options: ['Scenario: A railway ticketing system calculates fare based on distance, class', 'just a way to avoid typing the same code twice'],
                  hint: 'Revisit Class 9 Mathematics Chapter 2 (Linear Polynomials) and Class 10 Mathematics Chapter 2.',
                  misconception: 'Students often believe a function is "just a way to avoid typing the same code twice" and therefore only create functions when they.' }
          ],
            remediations: { 'a-function-is-just-a': { steps: ['Ask the student to take their longest single-function program and identify three *logical phases* (e.g., input.', 'Have them extract each phase into a separately named function, even if called only once.', 'Run the program and confirm identical behavior.', 'Discuss: "Did the program change?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_002', difficulty: 'standard',
          question: 'A function in Python is a named, reusable block of code that performs.',
          hint: 'If stuck, revisit the concept of variables and algebraic expressions from Class 6.',
          misconception: 'Students often believe that the code inside a function executes immediately when the `def` statement is encountered.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A function in Python is a named, reusable block of code that performs a specific task,',
                  options: ['A function in Python is a named, reusable block of code that performs a specific task,', 'Calling a function executes the code block defined by that function, transferring control', 'Positional arguments are values passed to a function during a call that are matched to', 'A default argument in a Python function is a parameter that is assigned a specific value'],
                  hint: 'If stuck, revisit the concept of variables and algebraic expressions from Class 6 Mathematics.',
                  misconception: 'Students often believe that the code inside a function executes immediately when the `def` statement is encountered.' }
          ],
            remediations: { 'the-code-inside-a-function': { steps: ['Use a concrete analogy: writing a recipe (definition) vs.', 'Show that reading a recipe does not produce food.', 'In a Python shell, define a function with a `print("Inside function")` statement.', 'Then run the script and observe that the print does not appear until you explicitly call the function.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_003', difficulty: 'standard',
          question: 'Calling a function executes the code block defined by that function.',
          hint: 'Revisit `def` syntax and the idea that the function body runs only when the function.',
          misconception: 'Students often think that a function "gives back" a value by printing it.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python def greet(): print("Hello") result = greet() print(result) ```', answer: 'The output is: ``` Hello None ```',
                  options: ['The output is: ``` Hello None ```', 'gives back', '`result` stores "Hello'],
                  hint: 'Revisit `def` syntax and the idea that the function body runs only when the function is called, not.',
                  misconception: 'Students often think that a function "gives back" a value by printing it.' },
                { id: 'b', prompt: 'Compare the behavior of these two functions when called in an expression: ```python def f1(): return 5 def f2(): print(5) ``` What are the values of `a = f1().', answer: '`a` becomes `8` because `f1()` returns `5`, so `5 + 3 = 8`',
                  options: ['`a` becomes `8` because `f1()` returns `5`, so `5 + 3 = 8`', 'gives back'],
                  hint: 'Revisit `def` syntax and the idea that the function body runs only when the function is called, not.',
                  misconception: 'Students often think that a function "gives back" a value by printing it.' }
          ],
            remediations: { 'a-function-gives-back-a': { steps: ['Show the student the exact code: `def add(a,b): print(a+b)` and `x = add(2,3); print(x)`.', 'Run it and point out `None`.', 'Contrast with `def add(a,b): return a+b` and `x = add(2,3); print(x)` which prints `5`.', 'Explain: `print` sends text to the screen; `return` sends a value to the variable.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_004', difficulty: 'standard',
          question: 'Positional arguments are values passed to a function during a call that are.',
          hint: 'If stuck, revisit the syntax of function definition (c11_cs_cbse_08_002) and the.',
          misconception: 'Students often believe that parameter names create an automatic link to argument values regardless of position.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the following function call produces an incorrect result for calculating the area of a rectangle: ```python def area(length.', answer: 'Although both calls return the same numeric value (50)',
                  options: ['Although both calls return the same numeric value (50)', 'both are correct'],
                  hint: 'If stuck, revisit the syntax of function definition (c11_cs_cbse_08_002) and the mechanics of.',
                  misconception: 'Students often believe that parameter names create an automatic link to argument values regardless of position.' }
          ],
            remediations: { 'parameter-names-create-an-automatic': { steps: ['Ask the student to write a function with two parameters of the same type (e.g., `def subtract(a, b): return a - b`).', 'Have them call it with two different numbers (e.g., `subtract(10, 4)` and `subtract(4, 10)`) and observe the different.', 'Explicitly trace the binding: "First argument → first parameter, second argument → second parameter." 4.', 'Contrast with a keyword call `subtract(b=4, a=10)` to show that names only matter when keywords are used.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_005', difficulty: 'standard',
          question: 'A default argument in a Python function is a parameter that is assigned.',
          hint: 'If stuck, revisit c11_cs_cbse_08_004 (Parameters and Arguments: Positional) and practice.',
          misconception: 'Students often believe that default arguments can be placed anywhere in the parameter list, leading them to write `def.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A default argument in a Python function is a parameter that is assigned a specific value',
                  options: ['A default argument in a Python function is a parameter that is assigned a specific value', 'A function in Python is a named, reusable block of code that performs a specific task,', 'A function in Python is a named, reusable block of code that performs a specific task,', 'Calling a function executes the code block defined by that function, transferring control'],
                  hint: 'If stuck, revisit c11_cs_cbse_08_004 (Parameters and Arguments: Positional) and practice writing.',
                  misconception: 'Students often believe that default arguments can be placed anywhere in the parameter list, leading them to write `def func(a=10, b):`.' }
          ],
            remediations: { 'default-arguments-can-be-placed': { steps: ['If a student writes `def func(a=10, b):`, show them the exact SyntaxError and ask them to swap the parameters.', 'For the "skipping" misconception, demonstrate that `func(, 5)` is invalid syntax, then introduce the need for keyword.', 'For the mutable default trap, have them run the `add_item` example, observe the accumulated list, then rewrite the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_006', difficulty: 'standard',
          question: 'Keyword arguments (or named arguments) in Python allow passing values to.',
          hint: 'Review positional argument passing (c11_cs_cbse_08_004) and practice matching call.',
          misconception: 'Students often believe that keyword arguments can be placed anywhere in the function call, including before positional.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Keyword arguments (or named arguments) in Python allow passing values to a function by',
                  options: ['Keyword arguments (or named arguments) in Python allow passing values to a function by', 'A function in Python is a named, reusable block of code that performs a specific task,', 'A function in Python is a named, reusable block of code that performs a specific task,', 'Calling a function executes the code block defined by that function, transferring control'],
                  hint: 'Review positional argument passing (c11_cs_cbse_08_004) and practice matching call arguments.',
                  misconception: 'Students often believe that keyword arguments can be placed anywhere in the function call, including before positional arguments.' }
          ],
            remediations: { 'keyword-arguments-can-be-placed': { steps: ['If a student makes this error, first show them the exact SyntaxError message: "positional argument follows keyword.', 'Then, have them trace the call left-to-right: write the function definition with parameter names, then the call, and.', 'Emphasize that Python binds positional arguments first by position, then keyword arguments by name — but the call.', 'Practice with 3-4 examples where they deliberately break the rule, see the error, then fix it by moving all positional.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
