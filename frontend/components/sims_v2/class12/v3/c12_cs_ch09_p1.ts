import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch09_p1: SimDef = {
    id: 'v3_c12_cs_ch09_p1',
    title: 'Python Functions and Modules · Part 1/2',
    subtitle: 'Twenty copies of one formula — and the day the tax rate changed',
    classLevel: 12, subject: 'computer_science', topic: 'Python Functions and Modules · Part 1/2',
    chapters: ['c12_cs_ch09'],
    nodeIds: ['c12_cs_cbse_09_001', 'c12_cs_cbse_09_002', 'c12_cs_cbse_09_003', 'c12_cs_cbse_09_004', 'c12_cs_cbse_09_005', 'c12_cs_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Python developer', intro: 'Every big program is small programs stitched together. Functions are the stitches — name a task once, call it anywhere.', goal: 'Explain what functions are, why modularity wins, and when a task deserves its own named block.' },
    discovery: {
        question: 'A bakery calculates price + 18% GST in twenty places in its code. The rate changes to 12% — and five places get missed. What single design decision prevents this?',
        options: ['One function written once and called everywhere — the rate lives in one place, so one edit updates all twenty calculations', 'A bigger spreadsheet of prices', 'Twenty more copies of the code', 'Hard-coding 18% permanently so it never needs a change'],
        answer: 'One function written once and called everywhere — the rate lives in one place, so one edit updates all twenty calculations',
        hook: 'A function isn\'t just \'math with brackets\' — it\'s a named recipe for any repeatable task: printing menus, writing files, sending mail. It may return nothing at all. Reuse is the headline; single-point-of-change is the superpower.',
    },
    teaching: [
        { title: 'Functions in Python: Definition and Advantages', text: 'A function in Python is a named, reusable block of code that performs a specific task, accepts zero or more input values (parameters), and optionally returns a result; it enables modular programming.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Refactor a 50-line monolith into clean functions: give each one job, design signatures with the right parameters, and prove to a teammate why modularity beats the giant run_everything().',
        labels: ['Functions in Python: Definition', 'Defining and Calling Functions', 'Parameters and Arguments: Positional', 'Keyword Arguments and *args,', 'Scope of Variables: Local,', 'The global and nonlocal'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_001', title: 'Functions in Python: Definition and Advantages',
          caseStudy: { intro: 'Imagine you run a small bakery and need to calculate the final price (base price + 18% GST) for 20 different items every day.',
            decisions: [{ prompt: 'What is the primary purpose of a function in Python, and how does it differ from simply writing the same code multiple times?', options: [
                { text: 'A function encapsulates a specific task into a named, reusable unit that can be called', outcome: 'A function encapsulates a specific task into a named, reusable unit that can be called with.' },
                { text: 'functions make code run faster', outcome: 'Not quite — Students think a function is **only** for mathematical calculations (like `f(x) = x²`) because math.', reveals: 'a-function-is-only-for' },
                { text: 'functions are only for math', outcome: 'Not quite — Students think a function is **only** for mathematical calculations (like `f(x) = x²`) because math.', reveals: 'a-function-is-only-for' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_002', title: 'Defining and Calling Functions Using def',
          caseStudy: { intro: 'Imagine you\'re building a program to calculate GST for different products in a shop.',
            decisions: [{ prompt: 'What is the exact syntax to define a function named `calculate_gst` that takes no parameters and has a docstring "Calculate GST at 18%"?', options: [
                { text: 'Correct answer: ```python def calculate_gst(): """Calculate GST at 18%""" # function body', outcome: 'Correct answer: ```python def calculate_gst(): """Calculate GST at 18%""" # function body here ```.' },
                { text: 'Calculate GST at 18%', outcome: 'Not quite — Students believe that writing `def my_func():` automatically executes the indented code.', reveals: 'writing-def-my-func-automatically' },
                { text: 'the function didn\'t work', outcome: 'Not quite — Students believe that writing `def my_func():` automatically executes the indented code.', reveals: 'writing-def-my-func-automatically' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_004', title: 'Keyword Arguments and *args, **kwargs',
          caseStudy: { intro: 'Imagine you\'re building a pizza ordering system where customers can choose any number of toppings, specify special instructions by name (like.',
            decisions: [{ prompt: 'What is the output of the following code? ```python def demo(a, b=10, *args, **kwargs): print(f"a={a}, b={b}, args={args}.', options: [
                { text: 'Correct output: `a=1, b=2, args=(3, 4), kwargs={\'x\': 5, \'y\': 6}`', outcome: 'Correct output: `a=1, b=2, args=(3, 4), kwargs={\'x\': 5, \'y\': 6}`.' },
                { text: 'the names `args` and `kwargs` are mandatory', outcome: 'Not quite — Students believe `*args` and `**kwargs` are special keywords — they think the names `args` and.', reveals: 'args-and-kwargs-are-special' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_005', title: 'Scope of Variables: Local, Global and Nonlocal',
          caseStudy: { intro: 'Imagine you are writing a banking app: a global variable `bank_name` is visible everywhere, a function `calculate_interest()` has a local variable `rate` that.',
            decisions: [{ prompt: 'What is the output of the following code? ```python x = 10 def outer(): x = 20 def inner(): print(x) inner() outer() ```', options: [
                { text: 'Output: `20`', outcome: 'Output: `20`. The `inner` function has no local `x`, so Python looks in the enclosing scope.' },
                { text: '**reading** a variable from an outer scope requires `global`/`nonlocal`', outcome: 'Not quite — Students believe that **reading** a variable from an outer scope requires `global`/`nonlocal`.', reveals: 'reading-a-variable-from-an' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_006', title: 'The global and nonlocal Keywords',
          caseStudy: { intro: 'Imagine you are writing a game where a `score` variable is defined at the top of your script (global).',
            decisions: [{ prompt: 'What is the exact rule for where the `global` or `nonlocal` statement must appear in a function body?', options: [
                { text: 'The `global` or `nonlocal` statement must appear **before the first use** (read or write)', outcome: 'The `global` or `nonlocal` statement must appear **before the first use** (read or write) of the.' },
                { text: 'anywhere in the function', outcome: 'Not quite — **Misconception:** "I can use `global` and `nonlocal` interchangeably; they both let me modify.', reveals: 'misconception-i-can-use-global' },
                { text: 'only before assignment', outcome: 'Not quite — **Misconception:** "I can use `global` and `nonlocal` interchangeably; they both let me modify.', reveals: 'misconception-i-can-use-global' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A canteen-billing script computes base price plus 18% GST in twenty separate places. When GST changes, the student sighs and prepares to edit all twenty spots.',
            decisions: [{ prompt: 'What\'s the better design?', options: [
                { text: 'Wrap the pricing rule in one function — calculate_final_price(base) — so the rate change is a single edit and every caller picks it up automatically.', outcome: 'Functions centralise a rule: reuse for each item, one fix propagates everywhere, and the main script reads as intent rather than arithmetic.' },
                { text: 'Keep the twenty copies — the code works, and functions are really just for mathematical formulas anyway.', outcome: 'Functions name any repeated task — printing menus, writing files, sending bills — not just math; twenty copies mean twenty chances to miss one.', reveals: 'functions-are-math-only' },
                { text: 'Put everything, billing included, inside one giant run_shop() function so the code is \'modular\'.', outcome: 'One monolith isn\'t modularity — no reuse, hard to test, and one bug sinks the whole flow; modularity means small single-job functions.', reveals: 'one-big-function-is-modular' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now write code once and spend it forever — the habit that separates programmers from typists. Functions are the unit everything else in Python builds on.',
            decisions: [{ prompt: 'What comes next? Python Functions and Modules · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Python Functions and Modules · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_001', difficulty: 'standard',
          question: 'A function in Python is a named, reusable block of code that performs.',
          hint: 'If unclear on "input → rule → output", revisit Class 11 Math Chapter 2 (Relations and.',
          misconception: 'Students think a function is **only** for mathematical calculations (like `f(x) = x²`) because math classes use that.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why "modularity" is an advantage of functions, using a real-life analogy (not a coding example).', answer: 'Modularity means breaking a complex problem into independent, manageable pieces',
                  options: ['Modularity means breaking a complex problem into independent, manageable pieces', 'code becomes shorter'],
                  hint: 'If unclear on "input → rule → output", revisit Class 11 Math Chapter 2 (Relations and Functions).',
                  misconception: 'Students think a function is **only** for mathematical calculations (like `f(x) = x²`) because math classes use that terminology.' }
          ],
            remediations: { 'a-function-is-only-for': { steps: ['Revisit the bakery analogy: list 3 non-math tasks a bakery does daily (e.g., `print_receipt()`, `check_inventory()`.', 'For each, identify inputs and whether it returns a value.', 'Write the function signature for each.', 'Explain why copying the code each time is risky.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_002', difficulty: 'standard',
          question: 'A Python function is a named block of reusable code defined using the `def`.',
          hint: 'Revisit the "recipe vs cooking" analogy in c12_cs_cbse_09_001 and trace a simple function.',
          misconception: 'Students believe that writing `def my_func():` automatically executes the indented code.',
          parts: [
                { id: 'a', prompt: 'Compare these two code snippets. What is the difference in behavior, and why? ```python', answer: 'Correct analysis: Snippet A prints "Hello"',
                  options: ['Correct analysis: Snippet A prints "Hello"', 'both print Hello', 'Snippet B gives an error', 'the function didn\'t work'],
                  hint: 'Revisit the "recipe vs cooking" analogy in c12_cs_cbse_09_001 and trace a simple function call.',
                  misconception: 'Students believe that writing `def my_func():` automatically executes the indented code.' }
          ],
            remediations: { 'writing-def-my-func-automatically': { steps: ['If a student shows this misconception: (1) Show them a side-by-side trace: run Snippet A and Snippet B from Diagnostic.', '(2) Have them add a `print("Inside function")` as the first line of the body and a `print("After call")` after the call.', '(3) Give them a 2-minute exercise: "Write a function that prints your name.', 'Now delete the call lines — what happens?" (4) Revisit node `c12_cs_cbse_09_001` (Functions in Python: Definition and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that writing `def my_func():` automatically executes the indented code.',
          parts: [
                { id: 'a', prompt: 'A student writes this code to calculate the area of a rectangle: ```python def area(): length = 10 width = 5 print(length * width) area ``` They run it and see.', answer: 'Correct evaluation: The error is `area` (missing parentheses) on the last line',
                  options: ['Correct evaluation: The error is `area` (missing parentheses) on the last line', 'indentation error', 'missing return', 'the function didn\'t work'],
                  hint: 'Revisit the "recipe vs cooking" analogy in c12_cs_cbse_09_001 and trace a simple function call.',
                  misconception: 'Students believe that writing `def my_func():` automatically executes the indented code.' },
                { id: 'b', prompt: 'Create a new real-world scenario (different from invoices or GST) where defining and calling a function with `def` is useful.', answer: 'Example scenario: A school library system needs to print book checkout receipts',
                  options: ['Example scenario: A school library system needs to print book checkout receipts', 'the function didn\'t work', 'writing `def my_func():` automatically executes the indented code', '"the function didn\'t work'],
                  hint: 'Revisit the "recipe vs cooking" analogy in c12_cs_cbse_09_001 and trace a simple function call.',
                  misconception: 'Students believe that writing `def my_func():` automatically executes the indented code.' }
          ],
            remediations: { 'writing-def-my-func-automatically': { steps: ['If a student shows this misconception: (1) Show them a side-by-side trace: run Snippet A and Snippet B from Diagnostic.', '(2) Have them add a `print("Inside function")` as the first line of the body and a `print("After call")` after the call.', '(3) Give them a 2-minute exercise: "Write a function that prints your name.', 'Now delete the call lines — what happens?" (4) Revisit node `c12_cs_cbse_09_001` (Functions in Python: Definition and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_003', difficulty: 'standard',
          question: 'In Python, a **parameter** is a variable listed in the function definition that.',
          hint: 'If stuck, review **c12_cs_cbse_09_002** (Defining and Calling Functions Using def) and.',
          misconception: '**Misconception:** "Default parameters are re‑initialized to their default value on every function call." **Why it’s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In Python, a **parameter** is a variable listed in the function definition that receives',
                  options: ['In Python, a **parameter** is a variable listed in the function definition that receives', 'A function in Python is a named, reusable block of code that performs a specific task,', 'A Python function is a named block of reusable code defined using the `def` keyword', 'Keyword arguments allow passing values to a function by explicitly naming the parameter'],
                  hint: 'If stuck, review **c12_cs_cbse_09_002** (Defining and Calling Functions Using def) and practice.',
                  misconception: '**Misconception:** "Default parameters are re‑initialized to their default value on every function call." **Why it’s wrong:** In Python.' }
          ],
            remediations: { 'misconception-default-parameters-are-re': { steps: ['**Revisit the definition‑time evaluation** concept: show the student the bytecode or simply print `id(default_list)`.', '**Practice the correct pattern**: replace mutable defaults with `N/A` and create the mutable inside the function.', '**Re‑diagnose** with a fresh example: `def log(msg, log_list=[]):` vs `def log(msg, log_list=N/A):` and ask the student.', 'If the error is about parameter ordering, have them write three function headers — one correct, two with `SyntaxError`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_004', difficulty: 'standard',
          question: 'Keyword arguments allow passing values to a function by explicitly naming the.',
          hint: 'If stuck, revisit c12_cs_cbse_09_003 and trace 5 calls to `def f(a, b=10, *rest):` with.',
          misconception: 'Students believe `*args` and `**kwargs` are special keywords — they think the names `args` and `kwargs` are mandatory.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code? ```python def demo(a, b=10, *args, **kwargs): print(f"a={a}, b={b}, args={args}, kwargs={kwargs}") demo(1, 2, 3, 4.', answer: 'Correct output: `a=1, b=2, args=(3, 4), kwargs={\'x\': 5, \'y\': 6}`',
                  options: ['Correct output: `a=1, b=2, args=(3, 4), kwargs={\'x\': 5, \'y\': 6}`', 'the names `args` and `kwargs` are mandatory'],
                  hint: 'If stuck, revisit c12_cs_cbse_09_003 and trace 5 calls to `def f(a, b=10, *rest):` with mixed.',
                  misconception: 'Students believe `*args` and `**kwargs` are special keywords — they think the names `args` and `kwargs` are mandatory.' },
                { id: 'b', prompt: 'Explain in your own words why the following function definition raises a SyntaxError, and rewrite it correctly: ```python def bad_func(*args, a, b=5.', answer: 'Python requires parameters after `*args` (or `*`) to be keyword-only',
                  options: ['Python requires parameters after `*args` (or `*`) to be keyword-only', 'the names `args` and `kwargs` are mandatory'],
                  hint: 'If stuck, revisit c12_cs_cbse_09_003 and trace 5 calls to `def f(a, b=10, *rest):` with mixed.',
                  misconception: 'Students believe `*args` and `**kwargs` are special keywords — they think the names `args` and `kwargs` are mandatory.' },
                { id: 'c', prompt: 'Compare these two calls and explain the difference in what `args` and `kwargs` receive inside the function: ```python def f(*args, **kwargs): print(args.', answer: 'Both calls produce identical output: `(1, 2) {\'a\': 3, \'b\': 4}`',
                  options: ['Both calls produce identical output: `(1, 2) {\'a\': 3, \'b\': 4}`', 'Call B gives args=((1,2),), kwargs={\'a\':3,\'b\':4}', 'passing a tuple', 'unpacking a tuple'],
                  hint: 'If stuck, revisit c12_cs_cbse_09_003 and trace 5 calls to `def f(a, b=10, *rest):` with mixed.',
                  misconception: 'Students believe `*args` and `**kwargs` are special keywords — they think the names `args` and `kwargs` are mandatory.' }
          ],
            remediations: { 'args-and-kwargs-are-special': { steps: ['Revisit c12_cs_cbse_09_003 (Parameters and Arguments: Positional and Default) — ensure you can trace how `def f(a.', 'Practice the "parameter matching order" rule: write 5 function definitions mixing all types, then call each with 3-4.', 'Specific drill: define `def test(p, *args, kw, **kwargs): pass` and call it as `test(1, 2, 3, kw=4, x=5)` — verify.', 'If this fails, re-read the Python docs section "Function definitions" → "Parameter lists" focusing on the `*identifier`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_005', difficulty: 'standard',
          question: 'Variable scope in Python defines the region of a program where a variable.',
          hint: 'If unsure about local vs global, re-read the function definition node.',
          misconception: 'Students believe that **reading** a variable from an outer scope requires `global`/`nonlocal`.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code? ```python x = 10 def outer(): x = 20 def inner(): print(x) inner() outer() ```', answer: 'Output: `20`',
                  options: ['Output: `20`', '**reading** a variable from an outer scope requires `global`/`nonlocal`'],
                  hint: 'If unsure about local vs global, re-read the function definition node (c12_cs_cbse_09_002) and.',
                  misconception: 'Students believe that **reading** a variable from an outer scope requires `global`/`nonlocal`.' }
          ],
            remediations: { 'reading-a-variable-from-an': { steps: ['Revisit **c12_cs_cbse_09_002** (defining functions) and **c12_cs_cbse_09_003** (parameters) to reinforce that.', 'Draw the LEGB diagram on paper; place each variable name in the scope where it is *assigned*.', 'Run the diagnostic code snippets in a Python shell, then deliberately remove `nonlocal`/`global` to see the exact error.', 'Re-attempt Diagnostic Questions 2 and 3 until you can explain the error in your own words.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_006', difficulty: 'standard',
          question: 'The `global` keyword in Python declares that a variable inside a function.',
          hint: 'If stuck, revisit the LEGB rule (Local → Enclosing → Global → Built-in) from node.',
          misconception: '**Misconception:** "I can use `global` and `nonlocal` interchangeably; they both let me modify outer variables." **Why.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The `global` keyword in Python declares that a variable inside a function refers to a',
                  options: ['The `global` keyword in Python declares that a variable inside a function refers to a', 'A function in Python is a named, reusable block of code that performs a specific task,', 'A Python function is a named block of reusable code defined using the `def` keyword', 'In Python, a **parameter** is a variable listed in the function definition that receives'],
                  hint: 'If stuck, revisit the LEGB rule (Local → Enclosing → Global → Built-in) from node.',
                  misconception: '**Misconception:** "I can use `global` and `nonlocal` interchangeably; they both let me modify outer variables." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-i-can-use-global': { steps: ['If a student confuses `global` vs `nonlocal`: 1.', '**Revisit node `c12_cs_cbse_09_005` (Scope of Variables)** — draw the scope chain: Module → outer function → inner.', 'Label each variable with its scope.', '**Do a targeted trace exercise:** Take Diagnostic Question 4, run both snippets in a Python shell, and annotate each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
