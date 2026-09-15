import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch09_p2: SimDef = {
    id: 'v3_c12_cs_ch09_p2',
    title: 'Python Functions and Modules · Part 2/2',
    subtitle: 'Twenty copies of one formula — and the day the tax rate changed',
    classLevel: 12, subject: 'computer_science', topic: 'Python Functions and Modules · Part 2/2',
    chapters: ['c12_cs_ch09'],
    nodeIds: ['c12_cs_cbse_09_007', 'c12_cs_cbse_09_008', 'c12_cs_cbse_09_009', 'c12_cs_cbse_09_010', 'c12_cs_cbse_09_011', 'c12_cs_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Python developer', intro: 'Every big program is small programs stitched together. Functions are the stitches — name a task once, call it anywhere.', goal: 'Explain what functions are, why modularity wins, and when a task deserves its own named block.' },
    discovery: {
        question: 'A bakery calculates price + 18% GST in twenty places in its code. The rate changes to 12% — and five places get missed. What single design decision prevents this?',
        options: ['One function written once and called everywhere — the rate lives in one place, so one edit updates all twenty calculations', 'A bigger spreadsheet of prices', 'Twenty more copies of the code', 'Hard-coding 18% permanently so it never needs a change'],
        answer: 'One function written once and called everywhere — the rate lives in one place, so one edit updates all twenty calculations',
        hook: 'A function isn\'t just \'math with brackets\' — it\'s a named recipe for any repeatable task: printing menus, writing files, sending mail. It may return nothing at all. Reuse is the headline; single-point-of-change is the superpower.',
    },
    teaching: [
        { title: 'Returning Values from Functions', text: 'A Python function returns a value to its caller using the `return` statement, which immediately exits the function and passes back a single object (which may be a tuple for multiple values); if.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Refactor a 50-line monolith into clean functions: give each one job, design signatures with the right parameters, and prove to a teammate why modularity beats the giant run_everything().',
        labels: ['Returning Values from Functions', 'Recursive Functions: Concept', 'Lambda Functions (Anonymous Functions)', 'Creating and Importing User-Defined', 'Standard Library Modules: math,', 'Packages in Python'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_007', title: 'Returning Values from Functions',
          caseStudy: { intro: 'Imagine you are building a GST calculator for a shopkeeper: you need a function that takes a price and tax rate, computes the tax, and gives the result back.',
            decisions: [{ prompt: 'What is the exact output of the following code snippet? ```python def demo(): print("Inside function") return 42 result = demo().', options: [
                { text: 'Correct output: ``` Inside function Returned: 42 ```', outcome: 'Correct output: ``` Inside function Returned: 42 ``` A wrong answer (e.g., thinking `result`.' },
                { text: 'sends the answer back', outcome: 'Not quite — Students often believe that `print` inside a function "sends the answer back" to the caller.', reveals: 'print-inside-a-function-sends' },
                { text: '`result` is `N/A` or that the function prints `42`', outcome: 'Not quite — Students often believe that `print` inside a function "sends the answer back" to the caller.', reveals: 'print-inside-a-function-sends' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_008', title: 'Recursive Functions: Concept and Examples',
          caseStudy: { intro: 'Imagine you are standing in a queue and want to know your position from the front.',
            decisions: [{ prompt: 'What is the definition of a recursive function, and what is the role of the base case in recursion?', options: [
                { text: 'A recursive function is a function that calls itself to solve a problem by dividing it', outcome: 'A recursive function is a function that calls itself to solve a problem by dividing it into smaller.' },
                { text: 'the last call', outcome: 'Not quite — Students often treat recursion as a magical loop and write the recursive call without ensuring the.', reveals: 'students-often-treat-recursion-as' },
                { text: 'zero times anything is zero', outcome: 'Not quite — Students often treat recursion as a magical loop and write the recursive call without ensuring the.', reveals: 'students-often-treat-recursion-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_009', title: 'Lambda Functions (Anonymous Functions)',
          caseStudy: { intro: 'Imagine you need to sort a list of student dictionaries by their marks in descending order for a class leaderboard.',
            decisions: [{ prompt: 'What is the correct syntax to define a lambda function that takes two arguments `x` and `y` and returns their sum?', options: [
                { text: '`lambda x, y: x + y`', outcome: '`lambda x, y: x + y` A wrong answer like `lambda x, y { return x + y }` reveals the student thinks.' },
                { text: 'lambdas use block syntax like `def`', outcome: 'Not quite — Students often believe lambda functions can contain multiple statements (assignments, loops.', reveals: 'lambda-functions-can-contain-multiple' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_010', title: 'Creating and Importing User-Defined Modules',
          caseStudy: { intro: 'Imagine you are building a school library management system. You have written functions for calculating late fines, checking book availability, and generating.',
            decisions: [{ prompt: 'What is the exact filename extension required for a Python user-defined module, and what name is used to import it?', options: [
                { text: 'The file must have a `.py` extension (e.g., `utils.py`)', outcome: 'The file must have a `.py` extension (e.g., `utils.py`). The import name is the filename without.' },
                { text: '`.pyc`', outcome: 'Not quite — Students often believe that `import mymodule` imports the *functions* into the current namespace.', reveals: 'import-mymodule-imports-the-functions' },
                { text: 'the folder name', outcome: 'Not quite — Students often believe that `import mymodule` imports the *functions* into the current namespace.', reveals: 'import-mymodule-imports-the-functions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_012', title: 'Packages in Python and __init__.py',
          caseStudy: { intro: 'Imagine you are building a school management system with separate modules for `students`, `teachers`, and `fees`.',
            decisions: [{ prompt: 'What is the minimum requirement for a directory to be considered a Python package?', options: [
                { text: 'The directory must contain a file named `__init__.py` (which can be empty)', outcome: 'The directory must contain a file named `__init__.py` (which can be empty).' },
                { text: 'it must contain at least one .py file', outcome: 'Not quite — Students often think that creating a directory with `.py` files automatically makes it a package.', reveals: 'creating-a-directory-with' },
                { text: 'it must have a setup.py', outcome: 'Not quite — Students often think that creating a directory with `.py` files automatically makes it a package.', reveals: 'creating-a-directory-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A canteen-billing script computes base price plus 18% GST in twenty separate places. When GST changes, the student sighs and prepares to edit all twenty spots.',
            decisions: [{ prompt: 'What\'s the better design?', options: [
                { text: 'Wrap the pricing rule in one function — calculate_final_price(base) — so the rate change is a single edit and every caller picks it up automatically.', outcome: 'Functions centralise a rule: reuse for each item, one fix propagates everywhere, and the main script reads as intent rather than arithmetic.' },
                { text: 'Keep the twenty copies — the code works, and functions are really just for mathematical formulas anyway.', outcome: 'Functions name any repeated task — printing menus, writing files, sending bills — not just math; twenty copies mean twenty chances to miss one.', reveals: 'functions-are-math-only' },
                { text: 'Put everything, billing included, inside one giant run_shop() function so the code is \'modular\'.', outcome: 'One monolith isn\'t modularity — no reuse, hard to test, and one bug sinks the whole flow; modularity means small single-job functions.', reveals: 'one-big-function-is-modular' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_012', title: 'You made it',
          caseStudy: { intro: 'You now write code once and spend it forever — the habit that separates programmers from typists. Functions are the unit everything else in Python builds on.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_007', difficulty: 'standard',
          question: 'A Python function returns a value to its caller using the `return` statement.',
          hint: 'If stuck, revisit the "function call as expression" idea in c12_cs_cbse_09_002 and trace.',
          misconception: 'Students often believe that `print` inside a function "sends the answer back" to the caller.',
          parts: [
                { id: 'a', prompt: 'What is the exact output of the following code snippet? ```python def demo(): print("Inside function") return 42 result = demo() print("Returned:", result) ```', answer: 'Correct output: ``` Inside function Returned: 42 ```',
                  options: ['Correct output: ``` Inside function Returned: 42 ```', 'sends the answer back', '`result` is `N/A` or that the function prints `42`', '`print` inside a function "sends the answer back" to the caller'],
                  hint: 'If stuck, revisit the "function call as expression" idea in c12_cs_cbse_09_002 and trace a call.',
                  misconception: 'Students often believe that `print` inside a function "sends the answer back" to the caller.' },
                { id: 'b', prompt: 'Write a function `divmod_custom(a, b)` that returns both the quotient and remainder of integer division `a // b` and `a % b` as two separate values.', answer: '```python def divmod_custom(a, b): return a // b, a % b # returns a tuple q, r =',
                  options: ['```python def divmod_custom(a, b): return a // b, a % b # returns a tuple q, r =', 'sends the answer back', '`print` inside a function "sends the answer back" to the caller'],
                  hint: 'If stuck, revisit the "function call as expression" idea in c12_cs_cbse_09_002 and trace a call.',
                  misconception: 'Students often believe that `print` inside a function "sends the answer back" to the caller.' },
                { id: 'c', prompt: 'Compare the behavior of these two functions when called with `x = 5`: ```python def f1(x): if x > 0: return x * 2 print("Negative or zero") def f2(x): if x >.', answer: '`f1(5)` returns `10` (the `if` branch executes `return`), so `result = 20`',
                  options: ['`f1(5)` returns `10` (the `if` branch executes `return`), so `result = 20`', 'sends the answer back', '`print` inside a function "sends the answer back" to the caller'],
                  hint: 'If stuck, revisit the "function call as expression" idea in c12_cs_cbse_09_002 and trace a call.',
                  misconception: 'Students often believe that `print` inside a function "sends the answer back" to the caller.' }
          ],
            remediations: { 'print-inside-a-function-sends': { steps: ['Revisit **c12_cs_cbse_09_002** (Defining and Calling Functions) to reinforce that a function call is an expression that.', 'Do a side-by-side trace: write two identical functions, one with `return x+y`, one with `print(x+y)`.', 'Call each and assign to a variable, then print the variable.', 'Practice the "return vs print" worksheet: given 5 functions, predict the value of `result = func(...)`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that `print` inside a function "sends the answer back" to the caller.',
          parts: [
                { id: 'a', prompt: 'Critique this code: a student wants to write a function that returns the square of a number if it\'s even, otherwise returns the cube.', answer: 'The `print("Done")` is **never executed**',
                  options: ['The `print("Done")` is **never executed**', 'sends the answer back', '`print` inside a function "sends the answer back" to the caller'],
                  hint: 'If stuck, revisit the "function call as expression" idea in c12_cs_cbse_09_002 and trace a call.',
                  misconception: 'Students often believe that `print` inside a function "sends the answer back" to the caller.' }
          ],
            remediations: { 'print-inside-a-function-sends': { steps: ['Revisit **c12_cs_cbse_09_002** (Defining and Calling Functions) to reinforce that a function call is an expression that.', 'Do a side-by-side trace: write two identical functions, one with `return x+y`, one with `print(x+y)`.', 'Call each and assign to a variable, then print the variable.', 'Practice the "return vs print" worksheet: given 5 functions, predict the value of `result = func(...)`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_008', difficulty: 'standard',
          question: 'A recursive function in Python is a function that calls itself during its.',
          hint: 'Review function definition and return statements (nodes c12_cs_cbse_09_002 and.',
          misconception: 'Students often treat recursion as a magical loop and write the recursive call without ensuring the argument moves.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why a recursive function must have a base case and why each recursive call must progress toward that base case.', answer: 'The base case provides the stopping condition',
                  options: ['The base case provides the stopping condition', 'efficiency', 'zero times anything is zero', '"zero times anything is zero"'],
                  hint: 'Review function definition and return statements (nodes c12_cs_cbse_09_002 and c12_cs_cbse_09_007).',
                  misconception: 'Students often treat recursion as a magical loop and write the recursive call without ensuring the argument moves toward the base case.' },
                { id: 'b', prompt: 'Compare the recursive and iterative implementations of factorial for `n = 5` in terms of (a) number of function calls, (b) memory usage (call stack), and (c).', answer: 'number of function calls, (',
                  options: ['number of function calls, (', 'zero times anything is zero', '"zero times anything is zero"'],
                  hint: 'Review function definition and return statements (nodes c12_cs_cbse_09_002 and c12_cs_cbse_09_007).',
                  misconception: 'Students often treat recursion as a magical loop and write the recursive call without ensuring the argument moves toward the base case.' }
          ],
            remediations: { 'students-often-treat-recursion-as': { steps: ['Revisit the concept of a base case using a non‑programming analogy: Russian nesting dolls — the smallest doll that.', 'Write a simple countdown function `countdown(n)` that prints `n` and calls `countdown(n-1)` with base case `n==0`.', 'Trace it for `n=3` on paper, drawing each stack frame.', 'Practice converting a simple `for` loop (e.g., sum of 1..n) into recursion: identify what changes each iteration (the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_009', difficulty: 'standard',
          question: 'A lambda function in Python is an anonymous, single-expression function defined.',
          hint: 'If stuck, review `def` function syntax (node c12_cs_cbse_09_002) and practice writing.',
          misconception: 'Students often believe lambda functions can contain multiple statements (assignments, loops, `print`, etc.) because.',
          parts: [
                { id: 'a', prompt: 'What is the correct syntax to define a lambda function that takes two arguments `x` and `y` and returns their sum?', answer: '`lambda x, y: x + y`',
                  options: ['`lambda x, y: x + y`', 'lambdas use block syntax like `def`'],
                  hint: 'If stuck, review `def` function syntax (node c12_cs_cbse_09_002) and practice writing three.',
                  misconception: 'Students often believe lambda functions can contain multiple statements (assignments, loops, `print`, etc.) because they look like.' }
          ],
            remediations: { 'lambda-functions-can-contain-multiple': { steps: ['Revisit the difference between statements and expressions using simple examples: `x = 5` (statement) vs `x + 5`.', 'Practice converting one‑line `def` functions into lambdas: start with `def add(x, y): return x + y` → `lambda x, y:.', 'Write three lambdas that use conditional expressions (`x if cond else y`) to reinforce that branching is possible only.', 'Test each lambda immediately in the REPL to see the SyntaxError when a statement is inserted, then correct it.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_010', difficulty: 'standard',
          question: 'A user-defined module in Python is a `.py` file containing Python definitions.',
          hint: 'If stuck, revisit function definition (`def`), parameter passing, and return statements.',
          misconception: 'Students often believe that `import mymodule` imports the *functions* into the current namespace, so they write `import.',
          parts: [
                { id: 'a', prompt: 'What is the exact filename extension required for a Python user-defined module, and what name is used to import it?', answer: 'The file must have a `.py` extension (e.g., `utils.py`)',
                  options: ['The file must have a `.py` extension (e.g., `utils.py`)', '`.pyc`', 'the folder name'],
                  hint: 'If stuck, revisit function definition (`def`), parameter passing, and return statements.',
                  misconception: 'Students often believe that `import mymodule` imports the *functions* into the current namespace, so they write `import mymodule` followed.' },
                { id: 'b', prompt: 'Compare the following two import styles for a module `geometry` that contains `def area_circle(r): return 3.14 * r * r`: Style A: `import geometry` then `a.', answer: 'Style A is better for large projects',
                  options: ['Style A is better for large projects', 'Style B is shorter so it\'s better'],
                  hint: 'If stuck, revisit function definition (`def`), parameter passing, and return statements.',
                  misconception: 'Students often believe that `import mymodule` imports the *functions* into the current namespace, so they write `import mymodule` followed.' }
          ],
            remediations: { 'import-mymodule-imports-the-functions': { steps: ['Have the student create a file `demo.py` with one function `greet(name): print(f"Hello, {name}")`.', 'In the same folder, create `test.py` with `import demo; demo.greet("Amit")`.', 'Change `test.py` to `from demo import greet; greet("Priya")` — run again.', 'Add `print("demo loaded")` at top of `demo.py` and `if __name__ == "__main__": print("running directly")` at bottom.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_011', difficulty: 'standard',
          question: 'The Python Standard Library provides pre-built modules that extend core.',
          hint: 'If stuck, review `import` syntax and module namespace from **c12_cs_cbse_09_010**.',
          misconception: '**Misconception:** "`math.sin(x)` expects `x` in degrees because that\'s what we use in school trigonometry." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'A student writes `random.seed(42); print(random.randint(1, 10)); random.seed(42); print(random.randint(1, 10))` and gets the same number twice.', answer: 'The student misunderstands *pseudo-randomness*',
                  options: ['The student misunderstands *pseudo-randomness*', 'random', 'non-deterministic'],
                  hint: 'If stuck, review `import` syntax and module namespace from **c12_cs_cbse_09_010** (Creating and.',
                  misconception: '**Misconception:** "`math.sin(x)` expects `x` in degrees because that\'s what we use in school trigonometry." **Why it\'s wrong:** All `math`.' }
          ],
            remediations: { 'misconception-math': { steps: ['Revisit **c12_cs_cbse_09_001** (Functions: Definition) to recall `import` syntax and module namespaces.', 'Revisit **c12_cs_cbse_09_010** (User-Defined Modules) to reinforce `import module` vs `from module import name`.', 'Practice **radian-degree conversion** by writing a tiny function `sin_deg(d): return math.sin(math.radians(d))` and.', 'Re-diagnostic: Run `print(math.sin(30), math.sin(math.radians(30)))` and explain the difference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_012', difficulty: 'standard',
          question: 'A Python package is a directory that contains one or more Python module files.',
          hint: 'If stuck, revisit `c12_cs_cbse_09_010` and practice creating a module `mymod.py` with.',
          misconception: 'Students often think that creating a directory with `.py` files automatically makes it a package, and that `import.',
          parts: [
                { id: 'a', prompt: 'What is the minimum requirement for a directory to be considered a Python package?', answer: 'The directory must contain a file named `__init__.py` (which can be empty)',
                  options: ['The directory must contain a file named `__init__.py` (which can be empty)', 'it must contain at least one .py file', 'it must have a setup.py', 'creating a directory with `'],
                  hint: 'If stuck, revisit `c12_cs_cbse_09_010` and practice creating a module `mymod.py` with a function.',
                  misconception: 'Students often think that creating a directory with `.py` files automatically makes it a package, and that `import package` will.' },
                { id: 'b', prompt: 'Given a package structure: ``` utils/ __init__.py math.py string.py ``` where `math.py` defines `def add(a, b): return a + b`, write the exact import statement.', answer: 'Import statement: `from utils.math import add`',
                  options: ['Import statement: `from utils.math import add`', 'creating a directory with `'],
                  hint: 'If stuck, revisit `c12_cs_cbse_09_010` and practice creating a module `mymod.py` with a function.',
                  misconception: 'Students often think that creating a directory with `.py` files automatically makes it a package, and that `import package` will.' },
                { id: 'c', prompt: 'Compare and contrast the effect of `__all__ = [\'foo\', \'bar\']` in `__init__.py` versus not defining `__all__` at all.', answer: 'With `__all__`, `from package import *` imports only the listed names',
                  options: ['With `__all__`, `from package import *` imports only the listed names', 'creating a directory with `'],
                  hint: 'If stuck, revisit `c12_cs_cbse_09_010` and practice creating a module `mymod.py` with a function.',
                  misconception: 'Students often think that creating a directory with `.py` files automatically makes it a package, and that `import package` will.' }
          ],
            remediations: { 'creating-a-directory-with': { steps: ['Revisit `c12_cs_cbse_09_010` (Creating and Importing User-Defined Modules) to solidify module import mechanics.', 'Create a minimal package: `mkdir mypkg && touch mypkg/__init__.py && echo \'print("init")\' > mypkg/__init__.py && echo.', 'In a separate script outside `mypkg`, test `import mypkg` (observe "init" printed once), then `from mypkg import mod`.', 'Add `from .mod import f` to `__init__.py` and test `from mypkg import f`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
