import type { SimDef } from '../../engine/types';
import C11_ComputerScienceFunctionsCallStackSim from '../../../simulations/c6_12/C11_ComputerScienceFunctionsCallStackSim';

/** v3 wrapped master — C11_ComputerScienceFunctionsCallStackSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_computersciencefunctionscallstacksim: SimDef = {
    id: 'v3w_c11_computersciencefunctionscallstacksim',
    title: 'Recursive Functions: Concept and Examples',
    subtitle: 'This node covers the concept of recursion, structure of recursive functions (base case.',
    classLevel: 11, subject: 'computer_science', topic: 'Recursive Functions: Concept and Examples',
    chapters: [],
    nodeIds: ['c11_cs_cbse_08_011', 'c11_cs_cbse_10_002', 'c11_cs_cbse_08_002', 'c11_cs_cbse_08_003', 'c11_cs_cbse_08_004', 'c11_cs_cbse_08_005', 'c11_cs_cbse_08_006', 'c11_cs_cbse_08_007', 'c11_cs_cbse_08_010', 'c11_cs_cbse_10_004', 'c11_cs_cbse_04_011', 'c11_cs_cbse_07_006', 'c11_cs_cbse_10_001', 'c11_cs_cbse_10_003', 'c11_cs_cbse_10_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you need to calculate the factorial of 5 (5!). You know 5! = 5 × 4 × 3 × 2 × 1.', goal: 'Master Recursive Functions: Concept and Examples.' },
    discovery: {
        question: 'Consider the following recursive function: ```python def mystery(n): if n == 0: return 1 else: return n * mystery(n-1) ``` Explain in your own words what this.',
        options: ['This function computes the factorial of n (n!)', 'it computes the sum of numbers', 'base case should be n==1'],
        answer: 'This function computes the factorial of n (n!)',
        hook: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on a.',
    },
    teaching: [
        { title: 'A recursive function is a function that.', text: 'A recursive function is a function that solves a problem by calling itself with a smaller or simpler version of the same problem, continuing until it reaches a base case that can be solved directly.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_cs_cbse_08_011', title: 'A recursive function is a function that.',
          scaffold: { problem: 'Write a recursive function to compute the sum of the first n natural numbers (1 + 2 + ... + n).',
            steps: [
            { text: 'Identify the base case. The smallest natural number is 1, so sum of first 1 natural number is 1.' },
            { text: 'Identify the recursive case. The sum of first n numbers is n plus the sum of first (n-1) numbers.' },
            { text: 'Write the function:' },
            { text: 'Trace for n=4:' },
            { text: 'Verify: 1+2+3+4 = 10. Correct.', faded: true, blankAnswer: 'sum_n(4) returns 10.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_10_002', title: 'A stack is a linear data structure that.',
          scaffold: { problem: 'A web browser\'s back button uses a stack to store visited URLs. Initially the stack is empty.',
            steps: [
            { text: 'Identify the initial state — empty stack, no current page.' },
            { text: 'Visit "google.com" → push onto stack. Stack: ["google.com"] (top). Current page: google.com.' },
            { text: 'Visit "wikipedia.org" → push onto stack. Stack: ["google.com", "wikipedia.org"] (top). Current page: wikipedia.org.' },
            { text: 'Visit "github.com" → push onto stack. Stack: ["google.com", "wikipedia.org", "github.com"] (top).' },
            { text: 'Click back → pop top URL ("github.com"), new top is "wikipedia.org". Current page: wikipedia.org.' },
            { text: 'Click back again → pop top URL ("wikipedia.org"), new top is "google.com". Current page: google.com.' },
            { text: 'Visit "stackoverflow.com" → push onto stack. Stack: ["google.com", "stackoverflow.com"] (top).' },
            { text: 'Verify final state — stack has 2 URLs, top is stackoverflow.com, which is the displayed page.', faded: true, blankAnswer: 'Final stack (bottom to top): ["google.com",.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_08_002', title: 'A function in Python is a named,.',
          scaffold: { problem: 'A farmer wants to calculate the area of his rectangular field in square metres.',
            steps: [
            { text: 'Identify the task – compute area = length × breadth.' },
            { text: 'Choose a descriptive function name (`calculate_area_rectangle`) and decide on two parameters (`length`, `breadth`).' },
            { text: 'Write the `def` line with parameters and a colon: `def calculate_area_rectangle(length, breadth):`' },
            { text: 'Add a docstring explaining the function, its parameters, and return value.' },
            { text: 'Write the calculation and return statement: `return length * breadth`' },
            { text: 'Call the function with the given values and print the result: `area = calculate_area_rectangle(120, 80); print("Area:",.', faded: true, blankAnswer: '```python' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_08_003', title: 'Calling a function executes the code.',
          scaffold: { problem: 'Write a function `celsius_to_fahrenheit(c)` that takes a temperature in Celsius and returns the equivalent in Fahrenheit.',
            steps: [
            { text: 'Identify the formula: Fahrenheit = (Celsius × 9/5) + 32.' },
            { text: 'Define the function with parameter `c` and use `return (c * 9/5) + 32`.' },
            { text: 'Call the function with argument `25` and assign the returned value to a variable, e.g., `f = celsius_to_fahrenheit(25)`.' },
            { text: 'Use an f-string to print the formatted message: `print(f"{25}°C is {f:.1f}°F")`.' },
            { text: 'Verify by manual calculation: (25 × 9/5) + 32 = 45 + 32 = 77.0.', faded: true, blankAnswer: '```python' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_08_004', title: 'Positional arguments are values passed.',
          scaffold: { problem: 'A stationery shop sells notebooks at ₹40 each and pens at ₹10 each.',
            steps: [
            { text: 'Identify the two inputs needed: quantity of notebooks and quantity of pens. These become the parameters in that order.' },
            { text: 'Define the function: `def bill_amount(notebook_qty, pen_qty): return notebook_qty * 40 + pen_qty * 10`.' },
            { text: 'For the given customer, notebook_qty = 5, pen_qty = 12. The positional call must place 5 first and 12 second.' },
            { text: 'Execute the call: `bill_amount(5, 12)` binds 5 to `notebook_qty` and 12 to `pen_qty`.' },
            { text: 'Verify: 5 notebooks cost ₹200, 12 pens cost ₹120, total ₹320. The function returns 320.', faded: true, blankAnswer: '₹320' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_08_005', title: 'A default argument in a Python function.',
          scaffold: { problem: 'A school charges a base fee of ₹5000 per term. For students who opt for the bus facility, an additional ₹1200 is charged.',
            steps: [
            { text: 'Identify the given values: base term fee is ₹5000 (required), bus fee has a default of ₹1200 (optional).' },
            { text: 'Define the function with two parameters, where the second parameter `bus_fee` has a default value of 1200.' },
            { text: 'Call the function for a non-bus student by passing only the term fee: `calculate_fee(5000)`.' },
            { text: 'Compute the results: non-bus total = 5000, bus total = 6200.' },
            { text: 'Verify that the default argument correctly handles the common case (no bus) without requiring the caller to remember to.', faded: true, blankAnswer: 'Non-bus student fee: ₹5000. Bus student fee: ₹6200.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_cs_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Recursive Functions: Concept and Examples', spots: [
            { id: 's1', label: 'A recursive function is a', prompt: 'Which idea is this? — A recursive function is a function that solves a problem by calling itself with a smaller.', answer: 'A recursive function is a', options: ['A recursive function is a', 'A stack is a linear', 'A function in Python is', 'Calling a function executes the'] },
            { id: 's2', label: 'A stack is a linear', prompt: 'Which idea is this? — A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,.', answer: 'A stack is a linear', options: ['A stack is a linear', 'A recursive function is a', 'A function in Python is', 'Calling a function executes the'] },
            { id: 's3', label: 'A function in Python is', prompt: 'Which idea is this? — A function in Python is a named, reusable block of code that performs a specific task,.', answer: 'A function in Python is', options: ['A function in Python is', 'A recursive function is a', 'A stack is a linear', 'Calling a function executes the'] },
            { id: 's4', label: 'Calling a function executes the', prompt: 'Which idea is this? — Calling a function executes the code block defined by that function, transferring control.', answer: 'Calling a function executes the', options: ['Calling a function executes the', 'A recursive function is a', 'A stack is a linear', 'A function in Python is'] },
            { id: 's5', label: 'Positional arguments are values passed', prompt: 'Which idea is this? — Positional arguments are values passed to a function during a call that are matched to.', answer: 'Positional arguments are values passed', options: ['Positional arguments are values passed', 'A recursive function is a', 'A stack is a linear', 'A function in Python is'] },
            { id: 's6', label: 'A default argument in a', prompt: 'Which idea is this? — A default argument in a Python function is a parameter that is assigned a specific value.', answer: 'A default argument in a', options: ['A default argument in a', 'A recursive function is a', 'A stack is a linear', 'A function in Python is'] }
          ] } }
    ],
    explore: { component: C11_ComputerScienceFunctionsCallStackSim, prompt: 'Explore the interactive — Recursive Functions: Concept and Examples' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_011', difficulty: 'standard',
          question: 'A recursive function is a function that solves a problem by calling itself with.',
          hint: 'If stuck, revisit function definition (c11_cs_cbse_08_002) and function calling with.',
          misconception: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on a.',
          parts: [
                { id: 'a', prompt: 'Consider the following recursive function: ```python def mystery(n): if n == 0: return 1 else: return n * mystery(n-1) ``` Explain in your own words what this.', answer: 'This function computes the factorial of n (n!)',
                  options: ['This function computes the factorial of n (n!)', 'it computes the sum of numbers', 'base case should be n==1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on a **smaller** or.' },
                { id: 'b', prompt: 'Compare the recursive and iterative implementations of factorial in terms of memory usage (call stack) and readability.', answer: 'Recursive factorial uses O(n) call stack space',
                  options: ['Recursive factorial uses O(n) call stack space', 'recursion is always faster', 'iteration uses more memory'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on a **smaller** or.' }
          ],
            remediations: { 'recursion-is-just-a-function': { steps: ['Ask the student to write the mathematical definition of factorial (n!', 'Have them manually trace `fact(3)` on paper, drawing each call as a separate box with its own `n` value and return.', 'Emphasize: "Each call gets its own `n`.', 'The function doesn\'t resume until the inner call returns." 4.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on a.',
          parts: [
                { id: 'a', prompt: 'A student writes the following recursive function to compute the nth Fibonacci number: ```python def fib(n): if n <= 1: return n else: return fib(n-1) +.', answer: 'This implementation is extremely inefficient for n=50',
                  options: ['This implementation is extremely inefficient for n=50', 'it\'s fine for n=50', 'use a loop instead', 'a function that calls itself'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on a **smaller** or.' },
                { id: 'b', prompt: 'Compare the recursive and iterative implementations of factorial in terms of memory usage (call stack) and readability.', answer: 'Recursive factorial uses O(n) call stack space',
                  options: ['Recursive factorial uses O(n) call stack space', 'recursion is always faster', 'iteration uses more memory', 'a function that calls itself'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on a **smaller** or.' }
          ],
            remediations: { 'recursion-is-just-a-function': { steps: ['Ask the student to write the mathematical definition of factorial (n!', 'Have them manually trace `fact(3)` on paper, drawing each call as a separate box with its own `n` value and return.', 'Emphasize: "Each call gets its own `n`.', 'The function doesn\'t resume until the inner call returns." 4.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_002', difficulty: 'standard',
          question: 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO).',
          hint: 'Revisit c11_cs_cbse_10_001 and focus on the distinction between "what a data structure.',
          misconception: 'Students believe that "stack is just a Python list with append and pop" and therefore the underlying list\'s.',
          parts: [
                { id: 'a', prompt: 'Trace the state of a stack after the following sequence of operations on an initially empty stack: push(10), push(20), push(30), pop(), push(40), pop(), pop().', answer: 'Step-by-step trace: 1',
                  options: ['Step-by-step trace: 1', 'stack is just a Python list with append and pop', 'pop removes from bottom (FIFO) or doesn\'t update the top pointer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "stack is just a Python list with append and pop" and therefore the underlying list\'s capabilities (indexing,.' }
          ],
            remediations: { 'stack-is-just-a-python': { steps: ['If the student exhibits this misconception: 1.', '**Draw a clear boundary**: On paper, draw a box labeled "Stack ADT" with only two arrows: push → (into top) and pop ←.', 'Label the box "No other operations allowed".', '**Contrast with list**: Draw another box "Python List" with arrows for append, pop, insert, index, slice, reverse.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "stack is just a Python list with append and pop" and therefore the underlying list\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since a stack only allows access at the top, it is less useful than a list which allows access anywhere.', answer: 'The claim is false',
                  options: ['The claim is false', 'stack is just a Python list with append and pop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "stack is just a Python list with append and pop" and therefore the underlying list\'s capabilities (indexing,.' }
          ],
            remediations: { 'stack-is-just-a-python': { steps: ['If the student exhibits this misconception: 1.', '**Draw a clear boundary**: On paper, draw a box labeled "Stack ADT" with only two arrows: push → (into top) and pop ←.', 'Label the box "No other operations allowed".', '**Contrast with list**: Draw another box "Python List" with arrows for append, pop, insert, index, slice, reverse.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_002', difficulty: 'standard',
          question: 'A function in Python is a named, reusable block of code that performs a.',
          hint: 'If stuck, revisit the concept of variables and algebraic expressions from Class 6.',
          misconception: 'Students often believe that the code inside a function executes immediately when the `def` statement is encountered.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A function in Python is a named, reusable block of code that performs a specific task,',
                  options: ['A function in Python is a named, reusable block of code that performs a specific task,', 'A recursive function is a function that solves a problem by calling itself with a smaller', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'Calling a function executes the code block defined by that function, transferring control'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the code inside a function executes immediately when the `def` statement is encountered.' }
          ],
            remediations: { 'the-code-inside-a-function': { steps: ['Use a concrete analogy: writing a recipe (definition) vs.', 'Show that reading a recipe does not produce food.', 'In a Python shell, define a function with a `print("Inside function")` statement.', 'Then run the script and observe that the print does not appear until you explicitly call the function.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_003', difficulty: 'standard',
          question: 'Calling a function executes the code block defined by that function,.',
          hint: 'Revisit `def` syntax and the idea that the function body runs only when the function is.',
          misconception: 'Students often think that a function "gives back" a value by printing it.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python def greet(): print("Hello") result = greet() print(result) ```', answer: 'The output is: ``` Hello None ```',
                  options: ['The output is: ``` Hello None ```', 'gives back'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a function "gives back" a value by printing it.' },
                { id: 'b', prompt: 'Compare the behavior of these two functions when called in an expression: ```python def f1(): return 5 def f2(): print(5) ``` What are the values of `a = f1().', answer: '`a` becomes `8` because `f1()` returns `5`, so `5 + 3 = 8`',
                  options: ['`a` becomes `8` because `f1()` returns `5`, so `5 + 3 = 8`', 'gives back'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a function "gives back" a value by printing it.' }
          ],
            remediations: { 'a-function-gives-back-a': { steps: ['Show the student the exact code: `def add(a,b): print(a+b)` and `x = add(2,3); print(x)`.', 'Run it and point out `None`.', 'Contrast with `def add(a,b): return a+b` and `x = add(2,3); print(x)` which prints `5`.', 'Explain: `print` sends text to the screen; `return` sends a value to the variable.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that a function "gives back" a value by printing it.',
          parts: [
                { id: 'a', prompt: 'A student writes a function to calculate the area of a circle but forgets the `return` statement.', answer: 'It will not work',
                  options: ['It will not work', 'gives back'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a function "gives back" a value by printing it.' },
                { id: 'b', prompt: 'Compare the behavior of these two functions when called in an expression: ```python def f1(): return 5 def f2(): print(5) ``` What are the values of `a = f1().', answer: '`a` becomes `8` because `f1()` returns `5`, so `5 + 3 = 8`',
                  options: ['`a` becomes `8` because `f1()` returns `5`, so `5 + 3 = 8`', 'gives back'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a function "gives back" a value by printing it.' }
          ],
            remediations: { 'a-function-gives-back-a': { steps: ['Show the student the exact code: `def add(a,b): print(a+b)` and `x = add(2,3); print(x)`.', 'Run it and point out `None`.', 'Contrast with `def add(a,b): return a+b` and `x = add(2,3); print(x)` which prints `5`.', 'Explain: `print` sends text to the screen; `return` sends a value to the variable.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_004', difficulty: 'standard',
          question: 'Positional arguments are values passed to a function during a call that are.',
          hint: 'If stuck, revisit the syntax of function definition (c11_cs_cbse_08_002) and the.',
          misconception: 'Students often believe that parameter names create an automatic link to argument values regardless of position.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the following function call produces an incorrect result for calculating the area of a rectangle: ```python def area(length,.', answer: 'Although both calls return the same numeric value (50)',
                  options: ['Although both calls return the same numeric value (50)', 'both are correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that parameter names create an automatic link to argument values regardless of position.' }
          ],
            remediations: { 'parameter-names-create-an-automatic': { steps: ['Ask the student to write a function with two parameters of the same type (e.g., `def subtract(a, b): return a - b`).', 'Have them call it with two different numbers (e.g., `subtract(10, 4)` and `subtract(4, 10)`) and observe the different.', 'Explicitly trace the binding: "First argument → first parameter, second argument → second parameter." 4.', 'Contrast with a keyword call `subtract(b=4, a=10)` to show that names only matter when keywords are used.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_005', difficulty: 'standard',
          question: 'A default argument in a Python function is a parameter that is assigned a.',
          hint: 'If stuck, revisit c11_cs_cbse_08_004 (Parameters and Arguments: Positional) and practice.',
          misconception: 'Students often believe that default arguments can be placed anywhere in the parameter list, leading them to write `def.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A default argument in a Python function is a parameter that is assigned a specific value',
                  options: ['A default argument in a Python function is a parameter that is assigned a specific value', 'A recursive function is a function that solves a problem by calling itself with a smaller', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'A function in Python is a named, reusable block of code that performs a specific task,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that default arguments can be placed anywhere in the parameter list, leading them to write `def func(a=10, b):`.' }
          ],
            remediations: { 'default-arguments-can-be-placed': { steps: ['If a student writes `def func(a=10, b):`, show them the exact SyntaxError and ask them to swap the parameters.', 'For the "skipping" misconception, demonstrate that `func(, 5)` is invalid syntax, then introduce the need for keyword.', 'For the mutable default trap, have them run the `add_item` example, observe the accumulated list, then rewrite the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
