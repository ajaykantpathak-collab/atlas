import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch05_p2: SimDef = {
    id: 'v3_c11_ip_ch05_p2',
    title: 'Functions and Modules · Part 2/2',
    subtitle: 'Catch the call that never happened — and why reuse beats speed as the reason for functions.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Functions and Modules · Part 2/2',
    chapters: ['c11_ip_ch05'],
    nodeIds: ['c11_ip_cbse_05_007', 'c11_ip_cbse_05_008', 'c11_ip_cbse_05_009', 'c11_ip_cbse_05_010', 'c11_ip_cbse_05_011', 'c11_ip_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developer shrinking a copy-paste monster', intro: 'GST and discount logic rewritten for every canteen order — one rate change and twenty places to fix. There is a better shape.', goal: 'Separate function definition from invocation and justify modularity by maintainability, not speed.' },
    discovery: {
        question: 'The program runs without error and prints nothing. The last line reads `calculate` — where\'s the bug?',
        options: ['Missing parentheses — `calculate` only references the function object; `calculate()` is what invokes it', 'Python refused to run the function silently', 'The variables a and b went out of scope', 'The function needs a return statement to print'],
        answer: 'Missing parentheses — `calculate` only references the function object; `calculate()` is what invokes it',
        hook: 'And `def` alone never executes anything — definition is a recipe, the call is the cooking; also, functions organise code, they don\'t speed it up.',
    },
    teaching: [
        { title: 'Introduction to Modules and the import Statement', text: 'A module in Python is a file containing Python definitions and statements (functions, variables, classes) that can be reused in other programs; the `import` statement loads a module into the current.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Refactor a 20-shape if-elif into named functions, expose the maintenance and reuse failures of copy-paste, then call print_line() three times correctly.',
        labels: ['Introduction to Modules', 'Using the math Module', 'Using the random Module', 'Creating and Importing User-Defined', 'The from-import Statement', 'Practical Problem Solving Using'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_007', title: 'Introduction to Modules and the import Statement',
          caseStudy: { intro: 'Imagine you are building a large school management system in Python: you need fee calculation, attendance tracking, and report generation.',
            decisions: [{ prompt: 'What is the exact output of the following code snippet, and why does it behave that way? ```python import math print(math.pi) print(pi) ```', options: [
                { text: 'The first `print(math.pi)` outputs `3.141592653589793`', outcome: 'The first `print(math.pi)` outputs `3.141592653589793` because `math.pi` is accessed through the.' },
                { text: 'save memory', outcome: 'Not quite — Students often believe `import math` loads the entire module code into memory every time it\'s.', reveals: 'import-math-loads-the-entire' },
                { text: 'both print', outcome: 'Not quite — Students often believe `import math` loads the entire module code into memory every time it\'s.', reveals: 'import-math-loads-the-entire' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_008', title: 'Using the math Module: sqrt, ceil, floor, pow, fabs',
          caseStudy: { intro: 'Imagine you are building a billing system for a grocery store where prices come as floats (e.g., ₹45.50 per kg) and you need to calculate total cost for 2.5.',
            decisions: [{ prompt: 'What is the output of `math.ceil(3.0)` and `math.floor(3.0)`? Explain why they are the same or different.', options: [
                { text: 'Both return 3', outcome: 'Both return 3. `ceil` returns the smallest integer ≥ argument, `floor` returns the largest integer.' },
                { text: 'ceiling', outcome: 'Not quite — Students often confuse `math.ceil` and `math.floor` with rounding to nearest integer (like.', reveals: 'students-often-confuse-math' },
                { text: 'round up', outcome: 'Not quite — Students often confuse `math.ceil` and `math.floor` with rounding to nearest integer (like.', reveals: 'students-often-confuse-math' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_009', title: 'Using the random Module: randint, random, choice',
          caseStudy: { intro: 'Imagine you are creating a simple game where a player rolls a die, picks a random card from a deck, or generates a random discount percentage for a shopping.',
            decisions: [{ prompt: 'What does `random.randint(1, 6)` return, and how many possible outcomes are there?', options: [
                { text: '`random.randint(1, 6)` returns a random integer between 1 and 6 inclusive', outcome: '`random.randint(1, 6)` returns a random integer between 1 and 6 inclusive.' },
                { text: '`random', outcome: 'Not quite — Students often think `random.randint(a, b)` excludes the upper bound `b`, because they are used.', reveals: 'random' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_012', title: 'Practical Problem Solving Using Functions and Modules',
          caseStudy: { intro: 'Imagine your school wants to analyze the heights (in cm) of all Class 11 students to compute the mean, median, mode, range, and standard deviation, and then.',
            decisions: [{ prompt: 'What is the primary purpose of creating a user-defined module in Python when solving a practical problem?', options: [
                { text: 'A user-defined module allows you to group related functions and variables into a separate', outcome: 'A user-defined module allows you to group related functions and variables into a separate file.' },
                { text: 'to make the program run faster', outcome: 'Not quite — Students often believe that "modular programming" simply means writing many functions in the same.', reveals: 'modular-programming-simply-means-writing' },
                { text: 'to avoid using built-in modules', outcome: 'Not quite — Students often believe that "modular programming" simply means writing many functions in the same.', reveals: 'modular-programming-simply-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a canteen-billing program, a teammate pastes the GST-and-discount code for every item. When you suggest functions, he says: \'Functions are only for code repeated verbatim — a once-used step like validating input doesn\'t deserve one.\'',
            decisions: [{ prompt: 'What do functions really offer beyond copy-paste removal?', options: [
                { text: 'Name the deeper benefit: functions create abstraction boundaries — `calculate_gst()` or `validate_input()` let readers see WHAT happens without wading through HOW, even if called once. Modular programming decomposes the program into single-responsibility blocks that can be developed, tested and updated separately — change the GST rate in one place.', outcome: 'The program restructures: reuse is one payoff, but readability, testability and single-point updates are why one-time steps also deserve functions.' },
                { text: 'Agree — one-time logic can stay inline; functions exist to kill duplication only.', outcome: 'Monolithic \'one-time\' code hides intent: naming a step is documentation, and isolating it is what makes the program debuggable.', reveals: 'functions-only-for-repetition' },
                { text: 'Define functions but call them inside their own bodies to \'keep everything together.\'', outcome: 'A call inside the body is recursion — unintended, it recurses forever; definitions only execute when invoked from outside.', reveals: 'call-inside-definition' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_05_012', title: 'You made it',
          caseStudy: { intro: 'Write the logic once, name it, call it anywhere — the function\'s real payoff is a program you can change without fear.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_007', difficulty: 'standard',
          question: 'A module in Python is a file containing Python definitions and statements.',
          hint: 'Revisit function definition/calling (node 002) and variable scope (node 005).',
          misconception: 'Students often believe `import math` loads the entire module code into memory every time it\'s called, so they put.',
          parts: [
                { id: 'a', prompt: 'What is the exact output of the following code snippet, and why does it behave that way? ```python import math print(math.pi) print(pi) ```', answer: 'The first `print(math.pi)` outputs `3.141592653589793`',
                  options: ['The first `print(math.pi)` outputs `3.141592653589793`', 'save memory', 'both print'],
                  hint: 'Revisit function definition/calling (node 002) and variable scope (node 005) — specifically, why.',
                  misconception: 'Students often believe `import math` loads the entire module code into memory every time it\'s called, so they put `import math` inside.' },
                { id: 'b', prompt: 'Explain in your own words the difference between `import random` and `from random import randint` in terms of namespace pollution and code readability.', answer: '`import random` keeps the namespace clean',
                  options: ['`import random` keeps the namespace clean', 'the same', 'both import the whole module', 'save memory'],
                  hint: 'Revisit function definition/calling (node 002) and variable scope (node 005) — specifically, why.',
                  misconception: 'Students often believe `import math` loads the entire module code into memory every time it\'s called, so they put `import math` inside.' },
                { id: 'c', prompt: 'Compare the following two import styles for a module `statistics` that contains `mean`, `median`, and `mode`.', answer: 'Style B (`import statistics as st`) is safer',
                  options: ['Style B (`import statistics as st`) is safer', 'save memory'],
                  hint: 'Revisit function definition/calling (node 002) and variable scope (node 005) — specifically, why.',
                  misconception: 'Students often believe `import math` loads the entire module code into memory every time it\'s called, so they put `import math` inside.' }
          ],
            remediations: { 'import-math-loads-the-entire': { steps: ['Show the student `import sys; print(\'math\' in sys.modules)` before and after `import math` to prove caching.', 'Demonstrate the performance difference with `timeit`: `timeit(\'import math\', number=10000)` vs `timeit(\'math.sqrt(4)\'.', 'Enforce the rule: "All imports at the top of the file, zero exceptions for now." 4.', 'Have them refactor a 50-line script with inline imports to top-level imports and run a linter (flake8) to see the E402.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe `import math` loads the entire module code into memory every time it\'s called, so they put.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "`from math import *` is the best import style for beginners because it lets you use `sin`, `cos`, `sqrt` directly without.', answer: 'The statement is dangerous for beginners',
                  options: ['The statement is dangerous for beginners', 'save memory'],
                  hint: 'Revisit function definition/calling (node 002) and variable scope (node 005) — specifically, why.',
                  misconception: 'Students often believe `import math` loads the entire module code into memory every time it\'s called, so they put `import math` inside.' }
          ],
            remediations: { 'import-math-loads-the-entire': { steps: ['Show the student `import sys; print(\'math\' in sys.modules)` before and after `import math` to prove caching.', 'Demonstrate the performance difference with `timeit`: `timeit(\'import math\', number=10000)` vs `timeit(\'math.sqrt(4)\'.', 'Enforce the rule: "All imports at the top of the file, zero exceptions for now." 4.', 'Have them refactor a 50-line script with inline imports to top-level imports and run a linter (flake8) to see the E402.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_008', difficulty: 'standard',
          question: 'The `math` module in Python provides standard mathematical functions for.',
          hint: 'Revisit `c11_ip_cbse_05_007` (import statement) and Class 8 square roots.',
          misconception: 'Students often confuse `math.ceil` and `math.floor` with rounding to nearest integer (like `round`).',
          parts: [
                { id: 'a', prompt: 'What is the output of `math.ceil(3.0)` and `math.floor(3.0)`? Explain why they are the same or different.', answer: 'Both return 3',
                  options: ['Both return 3', 'ceiling', 'round up'],
                  hint: 'Revisit `c11_ip_cbse_05_007` (import statement) and Class 8 square roots (`c8_math_ch1_8`).',
                  misconception: 'Students often confuse `math.ceil` and `math.floor` with rounding to nearest integer (like `round`).' },
                { id: 'b', prompt: 'A student writes `math.sqrt(-4)` and gets a `ValueError`. Why does this happen, and how would you modify the code to handle negative inputs gracefully?', answer: '`math.sqrt` is defined only for non-negative real numbers',
                  options: ['`math.sqrt` is defined only for non-negative real numbers', 'ceiling', 'round up', 'sqrt of negative is allowed or doesn\'t know domain restrictions'],
                  hint: 'Revisit `c11_ip_cbse_05_007` (import statement) and Class 8 square roots (`c8_math_ch1_8`).',
                  misconception: 'Students often confuse `math.ceil` and `math.floor` with rounding to nearest integer (like `round`).' },
                { id: 'c', prompt: 'Write a single expression using math functions to compute the ceiling of the square root of 50.', answer: '`math.ceil(math.sqrt(50))` → sqrt(50) ≈ 7.071, ceil → 8',
                  options: ['`math.ceil(math.sqrt(50))` → sqrt(50) ≈ 7.071, ceil → 8', 'ceiling', 'round up'],
                  hint: 'Revisit `c11_ip_cbse_05_007` (import statement) and Class 8 square roots (`c8_math_ch1_8`).',
                  misconception: 'Students often confuse `math.ceil` and `math.floor` with rounding to nearest integer (like `round`).' },
                { id: 'd', prompt: 'Compare `math.pow(2, 3)` and `2 ** 3`. Are they equivalent in all cases? Give an example where they differ.', answer: '`math.pow(2, 3)` returns float 8.0, while `2 ** 3` returns int 8',
                  options: ['`math.pow(2, 3)` returns float 8.0, while `2 ** 3` returns int 8', 'ceiling', 'round up'],
                  hint: 'Revisit `c11_ip_cbse_05_007` (import statement) and Class 8 square roots (`c8_math_ch1_8`).',
                  misconception: 'Students often confuse `math.ceil` and `math.floor` with rounding to nearest integer (like `round`).' }
          ],
            remediations: { 'students-often-confuse-math': { steps: ['Draw a number line with 2.3 marked; ask "Which integer is the ceiling (roof) above it?" → 3.', '"Which integer is the floor below it?" → 2.', 'Show `type(math.pow(2,3))` vs `type(2**3)` in interactive shell.', 'Give practice: `math.ceil(-1.2)` → -1 (not -2) to reinforce direction for negatives.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_009', difficulty: 'standard',
          question: 'The random module in Python provides functions to generate pseudo-random.',
          hint: 'Review the module import syntax (c11_ip_cbse_05_007) and function return values.',
          misconception: 'Students often think `random.randint(a, b)` excludes the upper bound `b`, because they are used to `range(a, b)` and.',
          parts: [
                { id: 'a', prompt: 'What does `random.randint(1, 6)` return, and how many possible outcomes are there?', answer: '`random.randint(1, 6)` returns a random integer between 1 and 6 inclusive',
                  options: ['`random.randint(1, 6)` returns a random integer between 1 and 6 inclusive', '`random'],
                  hint: 'Review the module import syntax (c11_ip_cbse_05_007) and function return values.',
                  misconception: 'Students often think `random.randint(a, b)` excludes the upper bound `b`, because they are used to `range(a, b)` and `random.randrange(a.' },
                { id: 'b', prompt: 'Compare the use of `random.random()` and `random.uniform(0, 1)` (though `uniform` is not in scope, consider if it were).', answer: '`random.random()` gives a float in `[0.0, 1.0)`',
                  options: ['`random.random()` gives a float in `[0.0, 1.0)`', '`random'],
                  hint: 'Review the module import syntax (c11_ip_cbse_05_007) and function return values.',
                  misconception: 'Students often think `random.randint(a, b)` excludes the upper bound `b`, because they are used to `range(a, b)` and `random.randrange(a.' }
          ],
            remediations: { 'random': { steps: ['If a student exhibits the upper-bound confusion, have them run a quick experiment: call `random.randint(1, 2)` ten.', 'They will see both 1 and 2 appear.', 'Then contrast with `random.randrange(1, 2)` which only returns 1.', 'For `choice`, give them a list and an integer and ask them to predict the error, then run it.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_010', difficulty: 'standard',
          question: 'A user-defined module in Python is a `.py` file containing function.',
          hint: 'Revisit c11_ip_cbse_05_004 (Functions Returning Values) and practice writing 3-4 small.',
          misconception: 'Students often believe that `import mymodule` copies the function definitions into the current script\'s global.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A user-defined module in Python is a `.py` file containing function definitions,',
                  options: ['A user-defined module in Python is a `.py` file containing function definitions,', 'A function is a named, reusable block of code that performs a specific task and', 'A function in Python is a named block of reusable code that performs a specific task,', 'Parameters are variables declared in a function definition that act as placeholders for'],
                  hint: 'Revisit c11_ip_cbse_05_004 (Functions Returning Values) and practice writing 3-4 small functions.',
                  misconception: 'Students often believe that `import mymodule` copies the function definitions into the current script\'s global namespace, so they try.' }
          ],
            remediations: { 'import-mymodule-copies-the-function': { steps: ['Show the student `dir(mymodule)` after `import mymodule` to reveal the module object and its attributes.', 'Demonstrate `mymodule.__file__` to prove Python loads the actual `.py` file.', 'Have them deliberately add a syntax error in the module and observe that the error occurs at import time, confirming.', 'Use a debugger or print statements to trace the flow: run the module directly, then import it, and compare `__name__`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_011', difficulty: 'standard',
          question: 'The `from-import` statement allows importing specific names (functions.',
          hint: 'Revisit `import` statement mechanics (node c11_ip_cbse_05_007) and practice calling.',
          misconception: 'Students believe `from module import name` creates a "copy" of the function that is independent of the module.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The `from-import` statement allows importing specific names (functions, variables,',
                  options: ['The `from-import` statement allows importing specific names (functions, variables,', 'A function is a named, reusable block of code that performs a specific task and', 'A function in Python is a named block of reusable code that performs a specific task,', 'Parameters are variables declared in a function definition that act as placeholders for'],
                  hint: 'Revisit `import` statement mechanics (node c11_ip_cbse_05_007) and practice calling `math.sqrt`.',
                  misconception: 'Students believe `from module import name` creates a "copy" of the function that is independent of the module.' }
          ],
            remediations: { 'from-module-import-name-creates': { steps: ['Show the student: `import math; from math import sqrt; sqrt is math.sqrt` → `True`.', 'Explain: same object, two names.', 'Demonstrate rebinding: `sqrt = 10`; then `math.sqrt(4)` still works.', 'Demonstrate mutation: `from sys import path; path.append(\'new\')`; then `import sys; print(sys.path)` shows the change.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_05_012', difficulty: 'standard',
          question: 'Practical problem solving using functions and modules is the process.',
          hint: 'Revisit function definition with return values (c11_ip_cbse_05_004) and creating.',
          misconception: 'Students often believe that "modular programming" simply means writing many functions in the same file.',
          parts: [
                { id: 'a', prompt: 'Compare the two approaches for organizing a program that computes mean, median, and mode: (A) one function `compute_all_stats(data)` that returns a tuple.', answer: 'Approach (B) is better for reuse and testing',
                  options: ['Approach (B) is better for reuse and testing', 'it\'s fewer lines of code', 'modular programming', '"modular programming" simply means writing many functions in the same file'],
                  hint: 'Revisit function definition with return values (c11_ip_cbse_05_004) and creating a user-defined.',
                  misconception: 'Students often believe that "modular programming" simply means writing many functions in the same file.' }
          ],
            remediations: { 'modular-programming-simply-means-writing': { steps: ['If a student exhibits this misconception, guide them through a refactoring exercise: take their monolithic script.', 'Then ask: "If another project needed just that one function, could you use it without copying code?" This concrete.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
