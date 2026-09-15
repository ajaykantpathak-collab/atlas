import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch08_p2: SimDef = {
    id: 'v3_c11_cs_ch08_p2',
    title: 'Functions in Python · Part 2/3',
    subtitle: 'Package logic into named, reusable blocks — and learn why defining runs nothing.',
    classLevel: 11, subject: 'computer_science', topic: 'Functions in Python · Part 2/3',
    chapters: ['c11_cs_ch08'],
    nodeIds: ['c11_cs_cbse_08_007', 'c11_cs_cbse_08_008', 'c11_cs_cbse_08_009', 'c11_cs_cbse_08_010', 'c11_cs_cbse_08_011', 'c11_cs_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer modularising a library system', intro: 'Three teammates, three features, one duplicated check. Refactor it into a function they can all call.', goal: 'Define and call functions with parameters, and explain reusability and maintainability.' },
    discovery: {
        question: 'A module loads, reaching a def block that contains a print — yet nothing appears on screen. Is the code broken?',
        options: ['No — def only stores the recipe; nothing inside runs until the function is called', 'Yes — print inside a function always runs at load', 'No — but only because print is ignored inside functions', 'Yes — the colon after the parameter list was missing'],
        answer: 'No — def only stores the recipe; nothing inside runs until the function is called',
        hook: 'Definition is a stored recipe, not a cooked meal — Python reads the def, shelves it, and waits for a call.',
    },
    teaching: [
        { title: 'Variable Number of Arguments: *args and **kwargs', text: '*args and **kwargs are special parameter syntaxes in Python that allow a function to accept a variable number of positional arguments and keyword arguments respectively.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Write calculate_fine(days_late, rate) for a library, then give two teammates a shared book_exists() helper instead of duplicated checks.',
        labels: ['Variable Number of Arguments', 'Scope of Variables: Local', 'The global Keyword', 'Returning Multiple Values from', 'Recursive Functions: Concept', 'Lambda Functions (Anonymous Functions)'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_007', title: 'Variable Number of Arguments: *args and **kwargs',
          caseStudy: { intro: 'Imagine you are building a billing system for a small shop where customers buy different numbers of items each time.',
            decisions: [{ prompt: 'What is the data type of the object that collects the extra positional arguments when *args is used in a function definition?', options: [
                { text: 'The extra positional arguments are collected into a tuple', outcome: 'The extra positional arguments are collected into a tuple. A wrong answer (e.g., list.' },
                { text: 'kwargs', outcome: 'Not quite — Students often believe that *args and **kwargs are variable names that must be spelled exactly.', reveals: 'args-and-kwargs-are-variable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_008', title: 'Scope of Variables: Local and Global',
          caseStudy: { intro: 'Imagine you have a notebook (global scope) where you write your total savings.',
            decisions: [{ prompt: 'What is the output of the following code? ```python x = 10 def show(): print(x) show() print(x) ```', options: [
                { text: 'Output: `10` then `10`', outcome: 'Output: `10` then `10`. The function `show()` reads the global variable `x` because no local `x`.' },
                { text: '`x` is not accessible inside the function', outcome: 'Not quite — Students believe that if a variable is declared globally, any function can both read AND write.', reveals: 'if-a-variable-is-declared' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_009', title: 'The global Keyword',
          caseStudy: { intro: 'Imagine you are writing a program to track the total score in a game. You have a variable `total_score = 0` at the top of your script.',
            decisions: [{ prompt: 'What happens if you assign a value to a variable inside a function without declaring it `global`, when a variable with the same name exists.', options: [
                { text: 'Python creates a new local variable that shadows the global variable', outcome: 'Python creates a new local variable that shadows the global variable; the global variable remains.' },
                { text: 'it modifies the global variable', outcome: 'Not quite — Students often believe that the `global` keyword is required to *access* (read) a global variable.', reveals: 'the-global-keyword-is-required' },
                { text: 'using a variable', outcome: 'Not quite — Students often believe that the `global` keyword is required to *access* (read) a global variable.', reveals: 'the-global-keyword-is-required' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_010', title: 'Returning Multiple Values from a Function',
          caseStudy: { intro: 'Imagine you are writing a program for a school canteen that calculates both the total cost and the number of items in a student\'s order.',
            decisions: [{ prompt: 'What is the actual data type of the object returned by the statement `return 10, 20, 30` in a Python function?', options: [
                { text: 'The returned object is a **tuple** `(10, 20, 30)`', outcome: 'The returned object is a **tuple** `(10, 20, 30)`. A wrong answer (e.g., "list", "three separate.' },
                { text: 'three separate integers', outcome: 'Not quite — Students often believe that `return a, b, c` sends three separate values back to the caller, and.', reveals: 'return-a' },
                { text: 'a special multiple-return object', outcome: 'Not quite — Students often believe that `return a, b, c` sends three separate values back to the caller, and.', reveals: 'return-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_011', title: 'Recursive Functions: Concept and Examples',
          caseStudy: { intro: 'Imagine you need to calculate the factorial of 5 (5!). You know 5! = 5 × 4 × 3 × 2 × 1.',
            decisions: [{ prompt: 'What are the two essential components that every recursive function must have to work correctly?', options: [
                { text: 'Every recursive function must have a **base case** (a condition that stops the recursion', outcome: 'Every recursive function must have a **base case** (a condition that stops the recursion.' },
                { text: 'only a recursive call', outcome: 'Not quite — Students often think recursion is just "a function that calls itself" and forget that the recursive.', reveals: 'recursion-is-just-a-function' },
                { text: 'a loop inside the function', outcome: 'Not quite — Students often think recursion is just "a function that calls itself" and forget that the recursive.', reveals: 'recursion-is-just-a-function' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_012', title: 'Lambda Functions (Anonymous Functions)',
          caseStudy: { intro: 'Imagine you have a list of item prices in rupees and you quickly want to add GST (18%) to each price without writing a full named function.',
            decisions: [{ prompt: 'Write the exact syntax for a lambda function that takes two numbers as arguments and returns their product.', options: [
                { text: 'Correct answer: `lambda x, y: x * y`', outcome: 'Correct answer: `lambda x, y: x * y`. A wrong answer (e.g., `lambda x, y: return x * y` or `def.' },
                { text: 'a `return` keyword is needed', outcome: 'Not quite — Students often believe lambda functions can contain multiple statements, loops, or conditional.', reveals: 'lambda-functions-can-contain-multiple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You inherit a 90-line Python program for the school library — it reads a member\'s details, validates the card ID format, computes the fine, and prints a receipt, all in one flat sequence. Nothing is duplicated, so a teammate says: \'No point adding functions — functions are only for avoiding copy-paste.\'',
            decisions: [{ prompt: 'Is he right that functions would add nothing here?', options: [
                { text: 'No — functions package meaning, not just repetition: validate_card(), compute_fine() and print_receipt() each become named, testable units even if called once. The 90-line blob becomes a readable pipeline, bugs get isolated to one unit, and a rule change (new fine rate) edits one function.', outcome: 'Abstraction and maintainability are the primary wins of functions; deduplication is only the most visible one.' },
                { text: 'He\'s right — with no repeated code, functions would just add boilerplate.', outcome: 'That equates functions with copy-paste avoidance; a flat sequence that does five jobs still hides intent, resists testing, and makes every change risky.', reveals: 'functions-only-for-duplication' },
                { text: 'Split it — but only into functions that get called at least twice.', outcome: 'Call count isn\'t the criterion; a conceptual unit (validation, computation, output) deserves its own function even at one call site.', reveals: 'single-use-functions-worthless' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'Functions aren\'t just copy-paste insurance — they\'re named decisions you can call, test and fix in one place.',
            decisions: [{ prompt: 'What comes next? Functions in Python · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Functions in Python · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_007', difficulty: 'standard',
          question: '*args and **kwargs are special parameter syntaxes in Python that allow.',
          hint: 'Revisit "Parameters and Arguments: Positional" (c11_cs_cbse_08_004) and "Keyword.',
          misconception: 'Students often believe that *args and **kwargs are variable names that must be spelled exactly as "args" and "kwargs".',
          parts: [
                { id: 'a', prompt: 'What is the data type of the object that collects the extra positional arguments when *args is used in a function definition?', answer: 'The extra positional arguments are collected into a tuple',
                  options: ['The extra positional arguments are collected into a tuple', 'kwargs'],
                  hint: 'Revisit "Parameters and Arguments: Positional" (c11_cs_cbse_08_004) and "Keyword Arguments.',
                  misconception: 'Students often believe that *args and **kwargs are variable names that must be spelled exactly as "args" and "kwargs".' },
                { id: 'b', prompt: 'Consider `def func(a, b, *args, **kwargs):`. If called as `func(1, 2, 3, 4, x=10, y=20)`, what are the values of `a`, `b`, `args`, and `kwargs` inside the.', answer: '`a=1`, `b=2`, `args=(3, 4)`, `kwargs={\'x\': 10, \'y\': 20}`',
                  options: ['`a=1`, `b=2`, `args=(3, 4)`, `kwargs={\'x\': 10, \'y\': 20}`', 'kwargs'],
                  hint: 'Revisit "Parameters and Arguments: Positional" (c11_cs_cbse_08_004) and "Keyword Arguments.',
                  misconception: 'Students often believe that *args and **kwargs are variable names that must be spelled exactly as "args" and "kwargs".' }
          ],
            remediations: { 'args-and-kwargs-are-variable': { steps: ['If a student shows this misconception, first show them a function defined as `def demo(*values, **options):` and call.', 'Ask them to print `values` and `options` and observe the output.', 'Then explicitly state: "The asterisk (*) is the packing operator; the word after it is just a parameter name you choose.', 'You could write `def f(*items, **kw):` and it works identically." Have them rename the parameters in a working example.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_008', difficulty: 'standard',
          question: 'Variable scope defines the region of a program where a variable is accessible.',
          hint: 'Revisit "Parameters and Arguments: Positional" (c11_cs_cbse_08_004) and trace a function.',
          misconception: 'Students believe that if a variable is declared globally, any function can both read AND write to it by default.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code? ```python x = 10 def show(): print(x) show() print(x) ```', answer: 'Output: `10` then `10`',
                  options: ['Output: `10` then `10`', '`x` is not accessible inside the function'],
                  hint: 'Revisit "Parameters and Arguments: Positional" (c11_cs_cbse_08_004) and trace a function call.',
                  misconception: 'Students believe that if a variable is declared globally, any function can both read AND write to it by default.' },
                { id: 'b', prompt: 'Predict the output of this code: ```python value = 100 def outer(): value = 50 def inner(): print(value) inner() outer() print(value) ```', answer: 'Output: `50` then `100`',
                  options: ['Output: `50` then `100`', 'global', 'any outer scope'],
                  hint: 'Revisit "Parameters and Arguments: Positional" (c11_cs_cbse_08_004) and trace a function call.',
                  misconception: 'Students believe that if a variable is declared globally, any function can both read AND write to it by default.' }
          ],
            remediations: { 'if-a-variable-is-declared': { steps: ['Show the exact error: `UnboundLocalError: local variable \'x\' referenced before assignment`.', 'Explain: "Python scans the function body for assignments.', 'Seeing `x = ...`, it marks `x` as local.', 'Then when it sees `x + 1` on the right, it looks for local `x` — which hasn\'t been assigned yet." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_009', difficulty: 'standard',
          question: 'The `global` keyword in Python is used inside a function to declare that.',
          hint: 'If stuck, revisit the concept of variable scope (local vs global) from node.',
          misconception: 'Students often believe that the `global` keyword is required to *access* (read) a global variable inside a function.',
          parts: [
                { id: 'a', prompt: 'What happens if you assign a value to a variable inside a function without declaring it `global`, when a variable with the same name exists in the global scope?', answer: 'Python creates a new local variable that shadows the global variable',
                  options: ['Python creates a new local variable that shadows the global variable', 'it modifies the global variable', 'using a variable', 'assigning to a variable'],
                  hint: 'If stuck, revisit the concept of variable scope (local vs global) from node c11_cs_cbse_08_008 and.',
                  misconception: 'Students often believe that the `global` keyword is required to *access* (read) a global variable inside a function.' },
                { id: 'b', prompt: 'Explain why the following code raises an `UnboundLocalError`: ```python count = 10 def increment(): count = count + 1 increment() ```', answer: 'Inside `increment`, `count` is treated as a local variable',
                  options: ['Inside `increment`, `count` is treated as a local variable', 'it should work because count is global', 'using a variable', 'assigning to a variable'],
                  hint: 'If stuck, revisit the concept of variable scope (local vs global) from node c11_cs_cbse_08_008 and.',
                  misconception: 'Students often believe that the `global` keyword is required to *access* (read) a global variable inside a function.' },
                { id: 'c', prompt: 'Compare the behavior of the following two functions when called. The global variable `data` is a list `[1, 2, 3]`.', answer: '`modify1` changes the global `data`',
                  options: ['`modify1` changes the global `data`', 'using a variable', 'assigning to a variable'],
                  hint: 'If stuck, revisit the concept of variable scope (local vs global) from node c11_cs_cbse_08_008 and.',
                  misconception: 'Students often believe that the `global` keyword is required to *access* (read) a global variable inside a function.' }
          ],
            remediations: { 'the-global-keyword-is-required': { steps: ['If a student insists `global` is needed for reading, first show a minimal example: `x = 10; def f(): print(x); f()` and.', 'Then explain the rule: "Assignment makes a variable local by default.', '`global` tells Python: \'This assignment should target the global variable.\' If there is no assignment, there is no need.', 'Reinforce with the mnemonic: "Global is for **G**iving a new value to a global name."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the `global` keyword is required to *access* (read) a global variable inside a function.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The `global` keyword is never needed if you only read a global variable, not write to it." Is this statement correct? Justify your answer.', answer: 'Yes, the statement is correct',
                  options: ['Yes, the statement is correct', 'using a variable', 'assigning to a variable'],
                  hint: 'If stuck, revisit the concept of variable scope (local vs global) from node c11_cs_cbse_08_008 and.',
                  misconception: 'Students often believe that the `global` keyword is required to *access* (read) a global variable inside a function.' },
                { id: 'b', prompt: 'Design a small program that uses a global variable `balance` to simulate a simple bank account.', answer: '```python balance = 0 def deposit(amount): global balance balance += amount def',
                  options: ['```python balance = 0 def deposit(amount): global balance balance += amount def', 'using a variable', 'assigning to a variable'],
                  hint: 'If stuck, revisit the concept of variable scope (local vs global) from node c11_cs_cbse_08_008 and.',
                  misconception: 'Students often believe that the `global` keyword is required to *access* (read) a global variable inside a function.' }
          ],
            remediations: { 'the-global-keyword-is-required': { steps: ['If a student insists `global` is needed for reading, first show a minimal example: `x = 10; def f(): print(x); f()` and.', 'Then explain the rule: "Assignment makes a variable local by default.', '`global` tells Python: \'This assignment should target the global variable.\' If there is no assignment, there is no need.', 'Reinforce with the mnemonic: "Global is for **G**iving a new value to a global name."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_010', difficulty: 'standard',
          question: 'In Python, a function can return multiple values by separating them with commas.',
          hint: 'Revisit function definition and return statement mechanics (c11_cs_cbse_08_002 and.',
          misconception: 'Students often believe that `return a, b, c` sends three separate values back to the caller, and that the caller.',
          parts: [
                { id: 'a', prompt: 'What is the actual data type of the object returned by the statement `return 10, 20, 30` in a Python function?', answer: 'The returned object is a **tuple** `(10, 20, 30)`',
                  options: ['The returned object is a **tuple** `(10, 20, 30)`', 'three separate integers', 'a special multiple-return object'],
                  hint: 'Revisit function definition and return statement mechanics (c11_cs_cbse_08_002 and.',
                  misconception: 'Students often believe that `return a, b, c` sends three separate values back to the caller, and that the caller receives them as three.' },
                { id: 'b', prompt: 'Consider the function: ```python def stats(data): return min(data), max(data), sum(data)/len(data) ``` If you call `result = stats([1,2,3,4,5])`, what will.', answer: '`result` will be the tuple `(1, 5, 3.0)`',
                  options: ['`result` will be the tuple `(1, 5, 3.0)`', '`result` holds only the minimum, or that `result.min('],
                  hint: 'Revisit function definition and return statement mechanics (c11_cs_cbse_08_002 and.',
                  misconception: 'Students often believe that `return a, b, c` sends three separate values back to the caller, and that the caller receives them as three.' }
          ],
            remediations: { 'return-a': { steps: ['Show the student the tuple explicitly: `def f(): return 1, 2; print(type(f()))` → `<class \'tuple\'>`.', 'Demonstrate that `x = f()` assigns the whole tuple to `x`, then `x[0]` and `x[1]` access elements.', 'Contrast with `x, y = f()` which unpacks.', 'Give a mini-exercise: "Write a function that returns the quotient and remainder of two integers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_011', difficulty: 'standard',
          question: 'A recursive function is a function that solves a problem by calling itself with.',
          hint: 'If stuck, revisit function definition (c11_cs_cbse_08_002) and function calling with.',
          misconception: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on.',
          parts: [
                { id: 'a', prompt: 'Consider the following recursive function: ```python def mystery(n): if n == 0: return 1 else: return n * mystery(n-1) ``` Explain in your own words what this.', answer: 'This function computes the factorial of n (n!)',
                  options: ['This function computes the factorial of n (n!)', 'it computes the sum of numbers', 'base case should be n==1', 'a function that calls itself'],
                  hint: 'If stuck, revisit function definition (c11_cs_cbse_08_002) and function calling with return values.',
                  misconception: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on a **smaller**.' },
                { id: 'b', prompt: 'Compare the recursive and iterative implementations of factorial in terms of memory usage (call stack) and readability.', answer: 'Recursive factorial uses O(n) call stack space',
                  options: ['Recursive factorial uses O(n) call stack space', 'recursion is always faster', 'iteration uses more memory', 'a function that calls itself'],
                  hint: 'If stuck, revisit function definition (c11_cs_cbse_08_002) and function calling with return values.',
                  misconception: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on a **smaller**.' }
          ],
            remediations: { 'recursion-is-just-a-function': { steps: ['Ask the student to write the mathematical definition of factorial (n!', 'Have them manually trace `fact(3)` on paper, drawing each call as a separate box with its own `n` value and return.', 'Emphasize: "Each call gets its own `n`.', 'The function doesn\'t resume until the inner call returns." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_012', difficulty: 'standard',
          question: 'A lambda function (anonymous function) in Python is a function defined without.',
          hint: 'Review the syntax of `def` functions, parameter passing, and the `return` statement.',
          misconception: 'Students often believe lambda functions can contain multiple statements, loops, or conditional blocks just like a `def`.',
          parts: [
                { id: 'a', prompt: 'Write the exact syntax for a lambda function that takes two numbers as arguments and returns their product.', answer: 'Correct answer: `lambda x, y: x * y`',
                  options: ['Correct answer: `lambda x, y: x * y`', 'a `return` keyword is needed'],
                  hint: 'Review the syntax of `def` functions, parameter passing, and the `return` statement in nodes.',
                  misconception: 'Students often believe lambda functions can contain multiple statements, loops, or conditional blocks just like a `def` function.' }
          ],
            remediations: { 'lambda-functions-can-contain-multiple': { steps: ['Explicitly state the rule: "A lambda body is exactly one expression — no statements, no `return`, no loops." 2.', 'Show side-by-side comparison: a `def` function with an `if-else` block vs.', 'the equivalent lambda using a ternary expression.', 'Give the student three simple `def` functions (e.g., square, max of two, even check) and ask them to convert each to.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
