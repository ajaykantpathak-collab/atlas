import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch04_p2: SimDef = {
    id: 'v3_c11_cs_ch04_p2',
    title: 'Getting Started with Python · Part 2/3',
    subtitle: 'Get Python running, know shell from editor, and see why interpreted means instant feedback.',
    classLevel: 11, subject: 'computer_science', topic: 'Getting Started with Python · Part 2/3',
    chapters: ['c11_cs_ch04'],
    nodeIds: ['c11_cs_cbse_04_007', 'c11_cs_cbse_04_008', 'c11_cs_cbse_04_009', 'c11_cs_cbse_04_010', 'c11_cs_cbse_04_011', 'c11_cs_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developer setting up a first Python workspace', intro: 'The installer finished, but `python` \'is not recognized.\' Diagnose the machine before writing a line.', goal: 'Set up Python and IDLE, distinguish the interactive shell from script mode, and run a first program.' },
    discovery: {
        question: 'A student types a 20-line program into the >>> shell, closes the window and loses everything. What did they confuse?',
        options: ['The interactive shell, which runs lines and forgets them, with the editor that saves scripts', 'Python with the operating system\'s notepad', 'The interpreter with the compiler — the code needed compiling first', 'Save with run — F5 saves files automatically'],
        answer: 'The interactive shell, which runs lines and forgets them, with the editor that saves scripts',
        hook: 'The >>> prompt is a conversation, not a document — scripts live in files, and files need saving.',
    },
    teaching: [
        { title: 'Variables and Assignment Statement', text: 'A variable in Python is a named reference to a memory location that stores a value of a specific data type, created through an assignment statement (variable_name = expression) which evaluates the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Install Python, recover from a forgotten \'Add to PATH\' checkbox, then write and run a cost.py script from IDLE\'s editor.',
        labels: ['Variables and Assignment Statement', 'Input and Output: input()', 'Data Types in Python', 'Mutable and Immutable Data', 'Expressions and Operator Precedence', 'Type Conversion: Implicit'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_007', title: 'Variables and Assignment Statement',
          caseStudy: { intro: 'Imagine you\'re building a simple calculator app for a kirana store owner who needs to track daily sales.',
            decisions: [{ prompt: 'What does the assignment statement `x = 10` actually do in Python?', options: [
                { text: 'The statement `x = 10` creates an integer object with value 10 in memory and makes the', outcome: 'The statement `x = 10` creates an integer object with value 10 in memory and makes the name `x`.' },
                { text: 'x becomes 10', outcome: 'Not quite — Students believe the assignment operator `=` means mathematical equality ("x equals 5") rather than.', reveals: 'the-assignment-operator-means-mathematical' },
                { text: 'x stores 10', outcome: 'Not quite — Students believe the assignment operator `=` means mathematical equality ("x equals 5") rather than.', reveals: 'the-assignment-operator-means-mathematical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_008', title: 'Input and Output: input() and print() Functions',
          caseStudy: { intro: 'Imagine you are building a simple "Grocery Bill Calculator" for a local kirana store.',
            decisions: [{ prompt: 'What is the data type of the value returned by `input()` when the user types `42` and presses Enter?', options: [
                { text: 'The data type is `str` (string)', outcome: 'The data type is `str` (string). A wrong answer (e.g., `int` or `float`) reveals that the student.' },
                { text: 'Enter a number', outcome: 'Not quite — Students often believe that `input("Enter a number: ")` automatically gives them an `int`.', reveals: 'input-enter-a-number-automatically' },
                { text: 'number', outcome: 'Not quite — Students often believe that `input("Enter a number: ")` automatically gives them an `int`.', reveals: 'input-enter-a-number-automatically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_009', title: 'Data Types in Python: int, float, str, bool',
          caseStudy: { intro: 'Imagine you are building a simple billing program for a kirana store.',
            decisions: [{ prompt: 'What is the output of `type(3.0)` and `type(3)` in Python? Are they the same data type?', options: [
                { text: '`type(3.0)` returns `<class \'float\'>` and `type(3)` returns `<class \'int\'>`', outcome: '`type(3.0)` returns `<class \'float\'>` and `type(3)` returns `<class \'int\'>` — they are different.' },
                { text: '**`input()` returns `int` or `float` when the user types a number**, e', outcome: 'Not quite — Students believe **`input()` returns `int` or `float` when the user types a number**, e.g., `age.', reveals: 'input-returns-int-or-float' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_010', title: 'Mutable and Immutable Data Types',
          caseStudy: { intro: 'Imagine you have a notebook (list) where you can erase and rewrite entries, versus a printed certificate (tuple) where any correction requires reprinting the.',
            decisions: [{ prompt: 'What is the fundamental difference between a mutable and an immutable object in Python with respect to memory and identity?', options: [
                { text: 'A mutable object allows in-place modification of its contents while retaining the same', outcome: 'A mutable object allows in-place modification of its contents while retaining the same `id()`.' },
                { text: 'mutable means you can reassign the variable', outcome: 'Not quite — Students often think "immutable means the variable cannot change" and "mutable means the variable.', reveals: 'immutable-means-the-variable-cannot' },
                { text: 'immutable means the variable cannot change', outcome: 'Not quite — Students often think "immutable means the variable cannot change" and "mutable means the variable.', reveals: 'immutable-means-the-variable-cannot' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_04_011', title: 'Expressions and Operator Precedence',
          scaffold: { problem: 'Calculate the total cost of 3 notebooks at ₹45 each, 2 pens at ₹15 each, with a 10% discount on the total, plus ₹20 shipping.',
            steps: [
            { text: 'Identify sub-expressions: notebook_cost = 3 * 45, pen_cost = 2 * 15' },
            { text: 'Compute subtotal: subtotal = notebook_cost + pen_cost' },
            { text: 'Apply discount: discount = subtotal * 0.10 (10% = 0.10)' },
            { text: 'Compute discounted total: discounted = subtotal - discount' },
            { text: 'Add shipping: total = discounted + 20' },
            { text: 'Evaluate stepwise: 3*45=135, 2*15=30, 135+30=165, 165*0.10=16.5, 165-16.5=148.5, 148.5+20=168.5', faded: true, blankAnswer: '₹168.5' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_012', title: 'Type Conversion: Implicit and Explicit',
          caseStudy: { intro: 'Imagine you\'re building a program to calculate the total cost of items in a shopping cart.',
            decisions: [{ prompt: 'What is the data type of the result of the expression `10 + 3.14` in Python, and why does Python choose this type?', options: [
                { text: 'The result is of type float', outcome: 'The result is of type float. Python implicitly converts the int 10 to float 10.0 before addition.' },
                { text: 'int or string', outcome: 'Not quite — Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with.', reveals: 'int-3' },
                { text: '`int(3', outcome: 'Not quite — Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with.', reveals: 'int-3' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate who\'s written JavaScript pastes this into a Python program for the school fest registration app: `fee = \'200\' + 50` and expects `250`. Python throws a TypeError. He complains: \'Python is dynamically typed, so it should just figure out the types — this proves Python is weak and broken.\'',
            decisions: [{ prompt: 'What does the TypeError actually demonstrate?', options: [
                { text: 'Dynamic typing ≠ weak typing: Python lets a variable change type without declaration (x=5 then x=\'hi\' is legal), but it is strongly typed — it refuses silent coercion between str and int, so \'200\'+50 errors instead of guessing \'20050\' or 250. Fix explicitly: int(\'200\')+50.', outcome: 'Python\'s \'dynamic\' refers to when types bind to names, not whether types convert silently; strong typing catches the bug JavaScript would hide.' },
                { text: 'He\'s right — a dynamically typed language should coerce types automatically; the TypeError is Python failing.', outcome: 'Automatic coercion is weak typing, not dynamic typing; Python deliberately errors rather than silently corrupting data.', reveals: 'dynamic-means-weak-typing' },
                { text: 'The error proves Python is a toy scripting language not meant for real apps.', outcome: 'The same strictness guards Instagram-scale codebases; type errors surface bugs early — a feature, not a limitation.', reveals: 'python-is-just-scripting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'Python trades raw speed for speed of thought — you can fix and re-run a line faster than most languages compile.',
            decisions: [{ prompt: 'What comes next? Getting Started with Python · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Getting Started with Python · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_007', difficulty: 'standard',
          question: 'A variable in Python is a named reference to a memory location that stores.',
          hint: 'Revisit c7_math_ch04_009 (Substituting Values into Algebraic Expressions) to practice.',
          misconception: 'Students believe the assignment operator `=` means mathematical equality ("x equals 5") rather than binding ("make.',
          parts: [
                { id: 'a', prompt: 'After executing the following code, what are the values of `a`, `b`, and `c`? Explain why. ```python a = 5 b = a a = 7 c = b ```', answer: 'After execution: `a = 7`, `b = 5`, `c = 5`',
                  options: ['After execution: `a = 7`, `b = 5`, `c = 5`', 'x equals 5', 'make x refer to 5'],
                  hint: 'Revisit c7_math_ch04_009 (Substituting Values into Algebraic Expressions) to practice evaluation.',
                  misconception: 'Students believe the assignment operator `=` means mathematical equality ("x equals 5") rather than binding ("make x refer to 5").' },
                { id: 'b', prompt: 'Write a single Python statement that creates three variables `length`, `breadth`, `height` and assigns them the values 10, 20, 30 respectively.', answer: 'Multiple assignment: `length, breadth, height = 10, 20, 30`',
                  options: ['Multiple assignment: `length, breadth, height = 10, 20, 30`', 'x equals 5', 'make x refer to 5'],
                  hint: 'Revisit c7_math_ch04_009 (Substituting Values into Algebraic Expressions) to practice evaluation.',
                  misconception: 'Students believe the assignment operator `=` means mathematical equality ("x equals 5") rather than binding ("make x refer to 5").' },
                { id: 'c', prompt: 'Analyze the following code and predict the output. Explain the type of each variable after each line.', answer: 'Output: `hello hello 13.5 <class \'str\'> <class \'str\'> <class \'float\'>`',
                  options: ['Output: `hello hello 13.5 <class \'str\'> <class \'str\'> <class \'float\'>`', 'x equals 5', 'make x refer to 5'],
                  hint: 'Revisit c7_math_ch04_009 (Substituting Values into Algebraic Expressions) to practice evaluation.',
                  misconception: 'Students believe the assignment operator `=` means mathematical equality ("x equals 5") rather than binding ("make x refer to 5").' }
          ],
            remediations: { 'the-assignment-operator-means-mathematical': { steps: ['**Concrete analogy**: Use the "sticky note" metaphor — write `x` on a sticky note and place it on a box labeled `10`.', 'For `y = x`, write `y` on another sticky note and place it on the SAME box.', 'For `x = 7`, move the `x` sticky note to a new box `7` — the `y` note stays on `10`.', 'Physically demonstrate this with paper notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the assignment operator `=` means mathematical equality ("x equals 5") rather than binding ("make.',
          parts: [
                { id: 'a', prompt: 'Design a real-world scenario (Indian context) where a student would need to use chained assignment, multiple assignment, and reassignment with type change in.', answer: 'Scenario: Railway ticket booking system',
                  options: ['Scenario: Railway ticket booking system', 'x equals 5', 'make x refer to 5'],
                  hint: 'Revisit c7_math_ch04_009 (Substituting Values into Algebraic Expressions) to practice evaluation.',
                  misconception: 'Students believe the assignment operator `=` means mathematical equality ("x equals 5") rather than binding ("make x refer to 5").' }
          ],
            remediations: { 'the-assignment-operator-means-mathematical': { steps: ['**Concrete analogy**: Use the "sticky note" metaphor — write `x` on a sticky note and place it on a box labeled `10`.', 'For `y = x`, write `y` on another sticky note and place it on the SAME box.', 'For `x = 7`, move the `x` sticky note to a new box `7` — the `y` note stays on `10`.', 'Physically demonstrate this with paper notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_008', difficulty: 'standard',
          question: 'The `input()` function reads a line of text from standard input (keyboard).',
          hint: 'Revisit variable assignment and the concept that the right-hand side is evaluated first.',
          misconception: 'Students often believe that `input("Enter a number: ")` automatically gives them an `int` or `float` because the prompt.',
          parts: [
                { id: 'a', prompt: 'What is the data type of the value returned by `input()` when the user types `42` and presses Enter?', answer: 'The data type is `str` (string)',
                  options: ['The data type is `str` (string)', 'Enter a number', 'number'],
                  hint: 'Revisit variable assignment and the concept that the right-hand side is evaluated first — here.',
                  misconception: 'Students often believe that `input("Enter a number: ")` automatically gives them an `int` or `float` because the prompt says "number".' },
                { id: 'b', prompt: 'Compare the output of these two `print()` calls when `x = 10` and `y = 20`: ```python print(x, y) print(x, y, sep=\'-\', end=\'!\') ``` What does each parameter.', answer: 'First call prints `10 20` followed by a newline (default `sep=\' \'`, `end=\'\\n\'`)',
                  options: ['First call prints `10 20` followed by a newline (default `sep=\' \'`, `end=\'\\n\'`)', 'Enter a number', 'number'],
                  hint: 'Revisit variable assignment and the concept that the right-hand side is evaluated first — here.',
                  misconception: 'Students often believe that `input("Enter a number: ")` automatically gives them an `int` or `float` because the prompt says "number".' }
          ],
            remediations: { 'input-enter-a-number-automatically': { steps: ['Have the student type `type(input("Test: "))` in the interactive shell and observe `<class \'str\'>` regardless of what.', 'Ask them to predict the output of `print(10 + 20)` vs `print("10" + "20")` and explain the difference.', 'Give a tiny exercise: "Read two integers, print their sum." Force them to write `int(input(...))` twice and verify with.', 'Finally, ask them to articulate in one sentence: "What does `input()` return, and what must you do before arithmetic?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_009', difficulty: 'standard',
          question: 'In Python, data types classify the kind of value a variable holds, determining.',
          hint: 'Revisit c11_cs_cbse_04_007 (assignment) and c11_cs_cbse_04_008 (input/output) — run.',
          misconception: 'Students believe **`input()` returns `int` or `float` when the user types a number**, e.g., `age = input("Age: ")` and.',
          parts: [
                { id: 'a', prompt: 'What is the output of `type(3.0)` and `type(3)` in Python? Are they the same data type?', answer: '`type(3.0)` returns `<class \'float\'>` and `type(3)` returns `<class \'int\'>`',
                  options: ['`type(3.0)` returns `<class \'float\'>` and `type(3)` returns `<class \'int\'>`', '**`input()` returns `int` or `float` when the user types a number**, e'],
                  hint: 'Revisit c11_cs_cbse_04_007 (assignment) and c11_cs_cbse_04_008 (input/output) — run `type()`.',
                  misconception: 'Students believe **`input()` returns `int` or `float` when the user types a number**, e.g., `age = input("Age: ")` and then `age + 5`.' },
                { id: 'b', prompt: 'Given `x = "42"` and `y = 42`, what is the result of `x + y`? If it raises an error, explain why and write the minimal fix to concatenate them as `"4242"`.', answer: '`x + y` raises `TypeError: can only concatenate str (not "int") to str`',
                  options: ['`x + y` raises `TypeError: can only concatenate str (not "int") to str`', '**`input()` returns `int` or `float` when the user types a number**, e'],
                  hint: 'Revisit c11_cs_cbse_04_007 (assignment) and c11_cs_cbse_04_008 (input/output) — run `type()`.',
                  misconception: 'Students believe **`input()` returns `int` or `float` when the user types a number**, e.g., `age = input("Age: ")` and then `age + 5`.' }
          ],
            remediations: { 'input-returns-int-or-float': { steps: ['**Immediate demo**: Run `x = input("Enter: "); print(type(x))` with inputs `42`, `3.14`, `hello`, `True`.', 'Show all output `<class \'str\'>`.', '**Explicit conversion drill**: Write three lines converting that `x` to `int`, `float`, `bool` using constructors, and.', '**Trace the error**: Give the broken snippet `age = input("Age: "); print(age + 5)` and ask student to predict the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_010', difficulty: 'standard',
          question: 'In Python, a **mutable data type** allows modification of its internal state.',
          hint: 'Review "Variables and Assignment Statement" (c11_cs_cbse_04_007) focusing on the.',
          misconception: 'Students often think "immutable means the variable cannot change" and "mutable means the variable can change." They.',
          parts: [
                { id: 'a', prompt: 'Consider the code: `x = 10; y = x; x = 20`. Now consider: `a = [1,2]; b = a; a.append(3)`. Explain why `y` remains 10 but `b` becomes `[1,2,3]`.', answer: 'Integers are immutable: `x = 20` rebinds `x` to a new integer object `20`',
                  options: ['Integers are immutable: `x = 20` rebinds `x` to a new integer object `20`', 'both change because they are the same variable', 'immutable means the variable cannot change', 'mutable means the variable can change'],
                  hint: 'Review "Variables and Assignment Statement" (c11_cs_cbse_04_007) focusing on the reference model.',
                  misconception: 'Students often think "immutable means the variable cannot change" and "mutable means the variable can change." They confuse **variable.' },
                { id: 'b', prompt: 'Write a function `modify(data)` that attempts to change its argument.', answer: 'For list: `data = data + [99]` creates a *new* list and rebinds local `data`',
                  options: ['For list: `data = data + [99]` creates a *new* list and rebinds local `data`', 'list changes', 'immutable means the variable cannot change', 'mutable means the variable can change'],
                  hint: 'Review "Variables and Assignment Statement" (c11_cs_cbse_04_007) focusing on the reference model.',
                  misconception: 'Students often think "immutable means the variable cannot change" and "mutable means the variable can change." They confuse **variable.' },
                { id: 'c', prompt: 'A student writes: `def add_item(item, shopping_list=[]): shopping_list.append(item); return shopping_list`.', answer: 'The default list `[]` is created *once* at function definition time',
                  options: ['The default list `[]` is created *once* at function definition time', 'immutable means the variable cannot change', 'mutable means the variable can change'],
                  hint: 'Review "Variables and Assignment Statement" (c11_cs_cbse_04_007) focusing on the reference model.',
                  misconception: 'Students often think "immutable means the variable cannot change" and "mutable means the variable can change." They confuse **variable.' }
          ],
            remediations: { 'immutable-means-the-variable-cannot': { steps: ['In IDLE, run `a = 10; print(id(a)); a = 20; print(id(a))` and `b = [1]; print(id(b)); b.append(2); print(id(b))`.', 'Point out: integer `id` changes (new object), list `id` stays same (same object mutated).', 'Draw two diagrams: (i) variable → object (immutable: arrow moves to new object); (ii) variable → object (mutable: arrow.', 'Have student write a function that mutates a list parameter and another that rebinds it; print `id` before/after inside.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_011', difficulty: 'standard',
          question: 'An expression in Python is a combination of values, variables, operators, and.',
          hint: 'Revisit Class 7 math node c7_math_ch02_002 "Evaluating Arithmetic Expressions: Order.',
          misconception: 'Students believe multiplication always happens before division because "M comes before D in BODMAS/PEMDAS".',
          parts: [
                { id: 'a', prompt: 'What is the result of the Python expression `2 + 3 * 4 ** 2 // 5 - 1`?', answer: 'Correct answer: 10',
                  options: ['Correct answer: 10', 'M comes before D in BODMAS/PEMDAS', 'multiplication always happens before division'],
                  hint: 'Revisit Class 7 math node c7_math_ch02_002 "Evaluating Arithmetic Expressions: Order of Operations".',
                  misconception: 'Students believe multiplication always happens before division because "M comes before D in BODMAS/PEMDAS".' },
                { id: 'b', prompt: 'Evaluate the expression `x = 7; y = 3; result = x ** 2 % y + x // y * 2` step by step and give the final value of `result`.', answer: 'Correct answer: 8',
                  options: ['Correct answer: 8', 'M comes before D in BODMAS/PEMDAS', 'multiplication always happens before division'],
                  hint: 'Revisit Class 7 math node c7_math_ch02_002 "Evaluating Arithmetic Expressions: Order of Operations".',
                  misconception: 'Students believe multiplication always happens before division because "M comes before D in BODMAS/PEMDAS".' },
                { id: 'c', prompt: 'Compare the expressions `-(3 ** 2)` and `(-3) ** 2`. Why do they produce different results? Which operator has higher precedence: unary minus or exponentiation?', answer: 'Correct answer: `-(3**2)` = -9',
                  options: ['Correct answer: `-(3**2)` = -9', 'M comes before D in BODMAS/PEMDAS', 'multiplication always happens before division'],
                  hint: 'Revisit Class 7 math node c7_math_ch02_002 "Evaluating Arithmetic Expressions: Order of Operations".',
                  misconception: 'Students believe multiplication always happens before division because "M comes before D in BODMAS/PEMDAS".' }
          ],
            remediations: { 'multiplication-always-happens-before-division': { steps: ['Write `20 / 5 * 2` on paper and ask student to evaluate left-to-right: "20 divided by 5 is 4, times 2 is 8".', 'Then ask: "If multiplication came first, what would 5*2 be?', 'Run both in IDLE to show 8.0.', 'Create a precedence table on a sticky note: ** → *,/,//,% → +,- with left-right arrows for equal precedence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_012', difficulty: 'standard',
          question: 'Type conversion in Python is the process of converting a value from one data.',
          hint: 'Revisit c11_cs_cbse_04_009 (Data Types) and practice writing literals of each type and.',
          misconception: 'Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with rounding.',
          parts: [
                { id: 'a', prompt: 'What is the data type of the result of the expression `10 + 3.14` in Python, and why does Python choose this type?', answer: 'The result is of type float',
                  options: ['The result is of type float', 'int or string', '`int(3'],
                  hint: 'Revisit c11_cs_cbse_04_009 (Data Types) and practice writing literals of each type and using.',
                  misconception: 'Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with rounding.' },
                { id: 'b', prompt: 'Given the code snippet below, what will be printed? Explain each conversion step. ```python x = "True" y = bool(x) z = int(y) print(type(z), z) ```', answer: 'Output: `<class \'int\'> 1`',
                  options: ['Output: `<class \'int\'> 1`', 'bool("True', '`int(3'],
                  hint: 'Revisit c11_cs_cbse_04_009 (Data Types) and practice writing literals of each type and using.',
                  misconception: 'Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with rounding.' },
                { id: 'c', prompt: 'Compare the results of `10 / 4`, `10 // 4`, and `int(10 / 4)`. Are they the same value? Same type? Justify.', answer: '`10 / 4` → 2.5 (float)',
                  options: ['`10 / 4` → 2.5 (float)', '`int(3'],
                  hint: 'Revisit c11_cs_cbse_04_009 (Data Types) and practice writing literals of each type and using.',
                  misconception: 'Students believe that `int(3.9)` rounds to 4 (like round()) because they confuse truncation with rounding.' }
          ],
            remediations: { 'int-3': { steps: ['Show the student the Python docs for int(): "If x is not a number or if base is given, then x must be a string, bytes.', 'Demonstrate in IDLE: `int("3.14")` → ValueError, then `float("3.14")` → 3.14, then `int(3.14)` → 3.', 'For bool: test `bool("")`, `bool("False")`, `bool("0")` — all True.', 'Explain: bool() checks emptiness, not semantic meaning.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
