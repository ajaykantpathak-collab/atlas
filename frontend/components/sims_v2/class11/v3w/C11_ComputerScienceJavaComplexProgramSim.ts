import type { SimDef } from '../../engine/types';
import C11_ComputerScienceJavaComplexProgramSim from '../../../simulations/c6_12/C11_ComputerScienceJavaComplexProgramSim';

/** v3 wrapped master — C11_ComputerScienceJavaComplexProgramSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_computersciencejavacomplexprogramsim: SimDef = {
    id: 'v3w_c11_computersciencejavacomplexprogramsim',
    title: 'Java Complex Program',
    subtitle: 'Covers the four built-in scalar types `int`, `float`, `str`, `bool` — their literal.',
    classLevel: 11, subject: 'computer_science', topic: 'Data Types in Python: int, float, str, bool',
    chapters: [],
    nodeIds: ['c11_cs_cbse_04_009', 'c11_cs_cbse_04_012', 'c11_cs_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are building a simple billing program for a kirana store.', goal: 'Master Java Complex Program.' },
    discovery: {
        question: 'Consider the following recursive function: ```python def mystery(n): if n == 0: return 1 else: return n * mystery(n-1) ``` Explain in your own words what this.',
        options: ['This function computes the factorial of n (n!)', 'it computes the sum of numbers', 'base case should be n==1'],
        answer: 'This function computes the factorial of n (n!)',
        hook: 'Students often think recursion is just "a function that calls itself" and forget that the recursive call must be on a.',
    },
    teaching: [
        { title: 'In Python, data types classify the kind of.', text: 'In Python, data types classify the kind of value a variable holds, determining the operations allowed and the memory representation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_cs_cbse_04_009', title: 'In Python, data types classify the kind.',
          scaffold: { problem: 'A customer buys 3.5 kg of apples at ₹120.75 per kg. The shopkeeper offers a 10% discount if the bill exceeds ₹400.',
            steps: [
            { text: 'Identify inputs — quantity = 3.5 (float), rate = 120.75 (float), discount_threshold = 400 (int), discount_percent = 10.' },
            { text: 'Compute gross = quantity * rate → 3.5 * 120.75 = 422.625 (float because float * float = float).' },
            { text: 'Check condition gross > discount_threshold → 422.625 > 400 → True (bool).' },
            { text: 'Since condition is True, compute discount = gross * discount_percent / 100 → 422.625 * 10 / 100 = 42.2625 (float); net.' },
            { text: 'Convert net to string for printing: bill_str = "Final amount: ₹" + str(round(net, 2)) → "Final amount: ₹380.36" (str).', faded: true, blankAnswer: 'Final amount: ₹380.36 (printed as str); intermediate types:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_04_012', title: 'Type conversion in Python is the.',
          scaffold: { problem: 'A customer buys 2.5 kg of apples at ₹80.50 per kg. The program reads price and weight as strings from input.',
            steps: [
            { text: 'Read price_str = input("Price per kg: ") → user enters "80.50"' },
            { text: 'Read weight_str = input("Weight in kg: ") → user enters "2.5"' },
            { text: 'Convert price = float(price_str) → 80.5 (float)' },
            { text: 'Convert weight = float(weight_str) → 2.5 (float)' },
            { text: 'Compute total = price * weight → 201.25 (float, implicit conversion not needed as both float)' },
            { text: 'Format output using f-string: print(f"Total: ₹{total:.2f}") → Total: ₹201.25', faded: true, blankAnswer: 'Total: ₹201.25' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_08_011', title: 'A recursive function is a function that.',
          scaffold: { problem: 'Write a recursive function to compute the sum of the first n natural numbers (1 + 2 + ... + n).',
            steps: [
            { text: 'Identify the base case. The smallest natural number is 1, so sum of first 1 natural number is 1.' },
            { text: 'Identify the recursive case. The sum of first n numbers is n plus the sum of first (n-1) numbers.' },
            { text: 'Write the function:' },
            { text: 'Trace for n=4:' },
            { text: 'Verify: 1+2+3+4 = 10. Correct.', faded: true, blankAnswer: 'sum_n(4) returns 10.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_cs_cbse_04_012', title: 'Identify each idea',
          dissect: { specimen: 'Java Complex Program', spots: [
            { id: 's1', label: 'In Python data types classify', prompt: 'Which idea is this? — In Python, data types classify the kind of value a variable holds, determining the.', answer: 'In Python data types classify', options: ['In Python data types classify', 'Type conversion in Python is', 'A recursive function is a'] },
            { id: 's2', label: 'Type conversion in Python is', prompt: 'Which idea is this? — Type conversion in Python is the process of converting a value from one data type to.', answer: 'Type conversion in Python is', options: ['Type conversion in Python is', 'In Python data types classify', 'A recursive function is a'] },
            { id: 's3', label: 'A recursive function is a', prompt: 'Which idea is this? — A recursive function is a function that solves a problem by calling itself with a smaller.', answer: 'A recursive function is a', options: ['A recursive function is a', 'In Python data types classify', 'Type conversion in Python is'] }
          ] } }
    ],
    explore: { component: C11_ComputerScienceJavaComplexProgramSim, prompt: 'Explore the interactive — Java Complex Program' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_009', difficulty: 'standard',
          question: 'In Python, data types classify the kind of value a variable holds, determining.',
          hint: 'Revisit c11_cs_cbse_04_007 (assignment) and c11_cs_cbse_04_008 (input/output) — run.',
          misconception: 'Students believe **`input()` returns `int` or `float` when the user types a number**, e.g., `age = input("Age: ")` and.',
          parts: [
                { id: 'a', prompt: 'What is the output of `type(3.0)` and `type(3)` in Python? Are they the same data type?', answer: '`type(3.0)` returns `<class \'float\'>` and `type(3)` returns `<class \'int\'>`',
                  options: ['`type(3.0)` returns `<class \'float\'>` and `type(3)` returns `<class \'int\'>`', '**`input()` returns `int` or `float` when the user types a number**, e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **`input()` returns `int` or `float` when the user types a number**, e.g., `age = input("Age: ")` and then `age + 5`.' },
                { id: 'b', prompt: 'Given `x = "42"` and `y = 42`, what is the result of `x + y`? If it raises an error, explain why and write the minimal fix to concatenate them as `"4242"`.', answer: '`x + y` raises `TypeError: can only concatenate str (not "int") to str`',
                  options: ['`x + y` raises `TypeError: can only concatenate str (not "int") to str`', '**`input()` returns `int` or `float` when the user types a number**, e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **`input()` returns `int` or `float` when the user types a number**, e.g., `age = input("Age: ")` and then `age + 5`.' }
          ],
            remediations: { 'input-returns-int-or-float': { steps: ['**Immediate demo**: Run `x = input("Enter: "); print(type(x))` with inputs `42`, `3.14`, `hello`, `True`.', 'Show all output `<class \'str\'>`.', '**Explicit conversion drill**: Write three lines converting that `x` to `int`, `float`, `bool` using constructors, and.', '**Trace the error**: Give the broken snippet `age = input("Age: "); print(age + 5)` and ask student to predict the.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **`input()` returns `int` or `float` when the user types a number**, e.g., `age = input("Age: ")` and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "`bool` is redundant in Python because `True == 1` and `False == 0`, so we can just use integers for conditions."', answer: 'The claim is false',
                  options: ['The claim is false', '**`input()` returns `int` or `float` when the user types a number**, e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **`input()` returns `int` or `float` when the user types a number**, e.g., `age = input("Age: ")` and then `age + 5`.' }
          ],
            remediations: { 'input-returns-int-or-float': { steps: ['**Immediate demo**: Run `x = input("Enter: "); print(type(x))` with inputs `42`, `3.14`, `hello`, `True`.', 'Show all output `<class \'str\'>`.', '**Explicit conversion drill**: Write three lines converting that `x` to `int`, `float`, `bool` using constructors, and.', '**Trace the error**: Give the broken snippet `age = input("Age: "); print(age + 5)` and ask student to predict the.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_012', difficulty: 'standard',
          question: 'Type conversion in Python is the process of converting a value from one data.',
          hint: 'Revisit c11_cs_cbse_04_009 (Data Types) and practice writing literals of each type and.',
          misconception: 'Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with rounding.',
          parts: [
                { id: 'a', prompt: 'What is the data type of the result of the expression `10 + 3.14` in Python, and why does Python choose this type?', answer: 'The result is of type float',
                  options: ['The result is of type float', '`int(3'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with rounding.' },
                { id: 'b', prompt: 'Given the code snippet below, what will be printed? Explain each conversion step. ```python x = "True" y = bool(x) z = int(y) print(type(z), z) ```', answer: 'Output: `<class \'int\'> 1`',
                  options: ['Output: `<class \'int\'> 1`', '`int(3'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with rounding.' },
                { id: 'c', prompt: 'Compare the results of `10 / 4`, `10 // 4`, and `int(10 / 4)`. Are they the same value? Same type? Justify.', answer: '`10 / 4` → 2.5 (float)',
                  options: ['`10 / 4` → 2.5 (float)', '`int(3'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with rounding.' }
          ],
            remediations: { 'int-3': { steps: ['Show the student the Python docs for int(): "If x is not a number or if base is given, then x must be a string, bytes,.', 'Demonstrate in IDLE: `int("3.14")` → ValueError, then `float("3.14")` → 3.14, then `int(3.14)` → 3.', 'For bool: test `bool("")`, `bool("False")`, `bool("0")` — all True.', 'Explain: bool() checks emptiness, not semantic meaning.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with rounding.',
          parts: [
                { id: 'a', prompt: 'A student writes `age = int(input("Enter age: "))` and claims "this handles all valid age inputs." Critique this statement with two specific counterexamples.', answer: 'Counterexample 1: User enters "18.5" → ValueError',
                  options: ['Counterexample 1: User enters "18.5" → ValueError', '`int(3'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with rounding.' }
          ],
            remediations: { 'int-3': { steps: ['Show the student the Python docs for int(): "If x is not a number or if base is given, then x must be a string, bytes,.', 'Demonstrate in IDLE: `int("3.14")` → ValueError, then `float("3.14")` → 3.14, then `int(3.14)` → 3.', 'For bool: test `bool("")`, `bool("False")`, `bool("0")` — all True.', 'Explain: bool() checks emptiness, not semantic meaning.'] } } },
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
            remediations: { 'recursion-is-just-a-function': { steps: ['Ask the student to write the mathematical definition of factorial (n!', 'Have them manually trace `fact(3)` on paper, drawing each call as a separate box with its own `n` value and return.', 'Emphasize: "Each call gets its own `n`.', 'The function doesn\'t resume until the inner call returns." 4.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
