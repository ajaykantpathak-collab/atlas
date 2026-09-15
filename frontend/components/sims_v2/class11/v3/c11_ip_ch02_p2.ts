import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch02_p2: SimDef = {
    id: 'v3_c11_ip_ch02_p2',
    title: 'Getting Started with Python · Part 2/2',
    subtitle: 'Get from installer checkbox to running code without the usual potholes.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Getting Started with Python · Part 2/2',
    chapters: ['c11_ip_ch02'],
    nodeIds: ['c11_ip_cbse_02_007', 'c11_ip_cbse_02_008', 'c11_ip_cbse_02_009', 'c11_ip_cbse_02_010', 'c11_ip_cbse_02_011', 'c11_ip_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time Python user making the install actually work', intro: 'One unchecked box at install — \'Add Python to PATH\' — decides whether the command line knows your language exists.', goal: 'Explain Python\'s interpreted, portable, dynamic design and set up a working environment.' },
    discovery: {
        question: 'A script written on a Windows laptop runs unmodified on the lab\'s Linux machines. Which Python feature made that trip possible?',
        options: ['Cross-platform portability — each OS has its own interpreter, and modules like os.path abstract the differences', 'Compiled binaries — Windows secretly built a Linux version', 'The code avoided all operating-system calls', 'Luck — it just happened to work'],
        answer: 'Cross-platform portability — each OS has its own interpreter, and modules like os.path abstract the differences',
        hook: '\'Interpreted means too slow for real work\' — tell that to NumPy and TensorFlow, whose heavy lifting is C under a Python hood.',
    },
    teaching: [
        { title: 'Input and Output: input() and print() Functions', text: 'The `input()` function reads a line from standard input (keyboard), converts it to a string (stripping the trailing newline), and returns that string.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Install Python with \'Add to PATH\' ticked, verify with python --version, and judge when IDLE is enough and when a real IDE is owed.',
        labels: ['Input and Output: input()', 'Data Types in Python', 'Mutable and Immutable Data', 'Operators in Python: Arithmetic,', 'Type Conversion: Implicit', 'Errors in Python: Syntax,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_008', title: 'Data Types in Python: int, float, str, bool and None',
          caseStudy: { intro: 'Imagine you are writing a program to calculate the total cost of items in a shopping cart.',
            decisions: [{ prompt: 'What is the output of `type(10)` and `type(10.0)` in Python? Explain the difference.', options: [
                { text: '`type(10)` returns `<class \'int\'>` and `type(10.0)` returns `<class \'float\'>`', outcome: '`type(10)` returns `<class \'int\'>` and `type(10.0)` returns `<class \'float\'>`.' },
                { text: '`"123"` (string), `123` (int), and `123', outcome: 'Not quite — Students often believe that `"123"` (string), `123` (int), and `123.0` (float) are "the same thing".', reveals: '123-string' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_009', title: 'Mutable and Immutable Data Types in Python',
          caseStudy: { intro: 'Imagine you write `a = 10` and then `a = a + 1`. Did the integer `10` change into `11`, or did `a` start pointing to a new integer `11`?',
            decisions: [{ prompt: 'What is the output of the following code and why? ```python x = 10 print(id(x)) x = x + 1 print(id(x)) ```', options: [
                { text: 'The two `id()` values will be **different**', outcome: 'The two `id()` values will be **different**. Integers are immutable in Python; `x = x + 1` creates.' },
                { text: 'integers are mutable or that `+=` always mutates in-place', outcome: 'Not quite — **Misconception:** "`+=` always modifies an object in-place." Students see `x += 1` for integers.', reveals: 'misconception-always-modifies-an-object' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_010', title: 'Operators in Python: Arithmetic, Relational and Logical',
          caseStudy: { intro: 'Imagine you are writing a program to calculate whether a student qualifies for a scholarship: they need an average of at least 75% across three subjects AND.',
            decisions: [{ prompt: 'What is the result of the expression `17 // 5` and `17 % 5` in Python, and how do these two results relate to each other mathematically?', options: [
                { text: '`17 // 5` evaluates to `3` (floor division) and `17 % 5` evaluates to `2` (remainder)', outcome: '`17 // 5` evaluates to `3` (floor division) and `17 % 5` evaluates to `2` (remainder).' },
                { text: '`17 // 5` is `3.4` or `17 % 5` is `3`', outcome: 'Not quite — Students believe that `and` and `or` return only `True` or `False`.', reveals: 'and-and-or-return-only' },
                { text: '`and` and `or` return only `True` or `False`', outcome: 'Not quite — Students believe that `and` and `or` return only `True` or `False`.', reveals: 'and-and-or-return-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_011', title: 'Type Conversion: Implicit and Explicit (int, float, str)',
          caseStudy: { intro: 'Imagine you are writing a program to calculate the total price of 3.5 kg of apples at ₹120 per kg and want to display "Total: ₹420.0".',
            decisions: [{ prompt: 'What is the data type of the expression `10 + 3.14` in Python, and why does Python choose that type?', options: [
                { text: 'The data type is `float`', outcome: 'The data type is `float`. Python implicitly converts the `int` (10) to `float` (10.0) before.' },
                { text: 'Python either truncates the decimal or treats numbers as strings', outcome: 'Not quite — Students believe `int(3.9)` rounds to `4` because they confuse truncation with rounding.', reveals: 'int-3' },
                { text: '`int(3', outcome: 'Not quite — Students believe `int(3.9)` rounds to `4` because they confuse truncation with rounding.', reveals: 'int-3' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_012', title: 'Errors in Python: Syntax, Name, Type and Logical Errors',
          caseStudy: { intro: 'Imagine you are writing a program to calculate the total cost of items in a shopping cart. You run the code and see a red error message.',
            decisions: [{ prompt: 'What is the exact error message Python displays when you write `print("Hello)` (missing closing quote) and press Enter in interactive mode?', options: [
                { text: '**Answer:** `SyntaxError: EOL while scanning string literal` **Why wrong answers reveal', outcome: '**Answer:** `SyntaxError: EOL while scanning string literal` **Why wrong answers reveal.' },
                { text: 'NameError', outcome: 'Not quite — **Misconception:** "If my program runs without any red error message, it is correct." **Why.', reveals: 'misconception-if-my-program-runs' },
                { text: 'TypeError', outcome: 'Not quite — **Misconception:** "If my program runs without any red error message, it is correct." **Why.', reveals: 'misconception-if-my-program-runs' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend building her first Python program spent 30 minutes typing a 20-line GST calculator into IDLE\'s Shell, closed the window, and lost everything. She concludes: \'Python doesn\'t save work, and anyway it\'s too slow for serious applications.\'',
            decisions: [{ prompt: 'What two misunderstandings need untangling?', options: [
                { text: 'Separate Shell from Editor: the `>>>` Shell is a transient REPL for exploring — closing it discards everything; multi-line programs go in the Editor (File → New File), saved as .py, run with F5. And \'interpreted = too slow\' is wrong: performance-critical libraries like NumPy are C-backed, JIT options exist, and `sum()` beats a hand-written loop by orders of magnitude — developer productivity is often the real metric.', outcome: 'She rebuilds in the Editor, saves her work, and stops judging the language by a raw loop benchmark.' },
                { text: 'Sympathise and move on — if the Shell loses code, Python is just badly designed.', outcome: 'The Shell is a scratchpad by design, not a defect: the Editor window is a separate process that persists files to disk.', reveals: 'shell-is-where-you-write-programs' },
                { text: 'Agree on speed — interpreted languages can\'t do serious data work.', outcome: 'Interpretation isn\'t the bottleneck it seems: vectorised C-backed libraries and JIT interpreters make Python the standard tool of data science.', reveals: 'interpreted-means-too-slow' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'The interpreter runs your lines the moment you write them — no compile step, no excuses between idea and output.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_007', difficulty: 'standard',
          question: 'The `input()` function reads a line from standard input (keyboard), converts.',
          hint: 'If stuck, revisit "Variables, Assignment Statement and Dynamic Typing".',
          misconception: 'Students believe `input()` returns an integer or float when the user types digits, leading them to write `a = input().',
          parts: [
                { id: 'a', prompt: 'Explain why the following code prints `55` instead of `10` when the user enters `5` for both inputs: ```python a = input("Enter first number: ").', answer: 'Because `input()` returns strings, `a` and `b` are `\'5\'` and `\'5\'`',
                  options: ['Because `input()` returns strings, `a` and `b` are `\'5\'` and `\'5\'`', 'Python adds numbers as strings'],
                  hint: 'If stuck, revisit "Variables, Assignment Statement and Dynamic Typing" (c11_ip_cbse_02_006) and.',
                  misconception: 'Students believe `input()` returns an integer or float when the user types digits, leading them to write `a = input(); b = input(); print(a.' }
          ],
            remediations: { 'input-returns-an-integer-or': { steps: ['**Revisit the type of `input()`**: In IDLE, run `x = input("Test: "); print(type(x))` with inputs `5`, `5.5`, `hello`.', 'Observe all return `<class \'str\'>`.', '**Practice explicit conversion**: Write three lines converting the same input to `int`, `float`, `bool`.', 'Note `bool("False")` is `True` (non-empty string).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_008', difficulty: 'standard',
          question: 'In Python, data types classify the kind of value a variable holds, determining.',
          hint: 'Revisit node c11_ip_cbse_02_006 (Variables, Assignment Statement and Dynamic Typing) and.',
          misconception: 'Students often believe that `"123"` (string), `123` (int), and `123.0` (float) are "the same thing" because they look.',
          parts: [
                { id: 'a', prompt: 'What is the output of `type(10)` and `type(10.0)` in Python? Explain the difference.', answer: '`type(10)` returns `<class \'int\'>` and `type(10.0)` returns `<class \'float\'>`',
                  options: ['`type(10)` returns `<class \'int\'>` and `type(10.0)` returns `<class \'float\'>`', '`"123"` (string), `123` (int), and `123'],
                  hint: 'Revisit node c11_ip_cbse_02_006 (Variables, Assignment Statement and Dynamic Typing) and practice.',
                  misconception: 'Students often believe that `"123"` (string), `123` (int), and `123.0` (float) are "the same thing" because they look similar when printed.' },
                { id: 'b', prompt: 'A student writes `x = "True"` and `y = True`. They claim both are boolean values because they represent "truth". Is the student correct? Justify your answer.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', '`"123"` (string), `123` (int), and `123'],
                  hint: 'Revisit node c11_ip_cbse_02_006 (Variables, Assignment Statement and Dynamic Typing) and practice.',
                  misconception: 'Students often believe that `"123"` (string), `123` (int), and `123.0` (float) are "the same thing" because they look similar when printed.' }
          ],
            remediations: { '123-string': { steps: ['Have the student open the Python shell and type: `5`, `"5"`, `5.0`, `True`, `None` — observe each output and then.', 'Create a table with columns: Literal, Type, Sample Operation, Result.', 'Fill rows for `10`, `10.0`, `"10"`, `True`, `None` with operations like `+ 5`, `* 2`, `and False`.', 'Explicitly test `type(input("Enter: "))` after entering `25` to prove `input()` always returns `str`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that `"123"` (string), `123` (int), and `123.0` (float) are "the same thing" because they look.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "In Python, `None` is the same as `0`, `False`, or an empty string `\'\'` because they all represent \'nothing\'." Defend your.', answer: 'The statement is false',
                  options: ['The statement is false', '`"123"` (string), `123` (int), and `123'],
                  hint: 'Revisit node c11_ip_cbse_02_006 (Variables, Assignment Statement and Dynamic Typing) and practice.',
                  misconception: 'Students often believe that `"123"` (string), `123` (int), and `123.0` (float) are "the same thing" because they look similar when printed.' },
                { id: 'b', prompt: 'Design a real-world scenario (Indian context) where you would need to use all five data types (`int`, `float`, `str`, `bool`, `None`) in a single program.', answer: 'Scenario: A railway ticket booking system',
                  options: ['Scenario: A railway ticket booking system', '`"123"` (string), `123` (int), and `123'],
                  hint: 'Revisit node c11_ip_cbse_02_006 (Variables, Assignment Statement and Dynamic Typing) and practice.',
                  misconception: 'Students often believe that `"123"` (string), `123` (int), and `123.0` (float) are "the same thing" because they look similar when printed.' }
          ],
            remediations: { '123-string': { steps: ['Have the student open the Python shell and type: `5`, `"5"`, `5.0`, `True`, `None` — observe each output and then.', 'Create a table with columns: Literal, Type, Sample Operation, Result.', 'Fill rows for `10`, `10.0`, `"10"`, `True`, `None` with operations like `+ 5`, `* 2`, `and False`.', 'Explicitly test `type(input("Enter: "))` after entering `25` to prove `input()` always returns `str`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_009', difficulty: 'standard',
          question: 'In Python, a data type is **immutable** if its value cannot be changed after.',
          hint: 'Revisit c11_ip_cbse_02_006 (Variables, Assignment Statement and Dynamic Typing) and trace.',
          misconception: '**Misconception:** "`+=` always modifies an object in-place." Students see `x += 1` for integers and `lst += [3]` for.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code and why? ```python x = 10 print(id(x)) x = x + 1 print(id(x)) ```', answer: 'The two `id()` values will be **different**',
                  options: ['The two `id()` values will be **different**', 'integers are mutable or that `+=` always mutates in-place'],
                  hint: 'Revisit c11_ip_cbse_02_006 (Variables, Assignment Statement and Dynamic Typing) and trace memory.',
                  misconception: '**Misconception:** "`+=` always modifies an object in-place." Students see `x += 1` for integers and `lst += [3]` for lists and assume both.' }
          ],
            remediations: { 'misconception-always-modifies-an-object': { steps: ['Ask the student to run `x = 10; print(id(x)); x += 1; print(id(x))` and `lst = [1]; print(id(lst)); lst += [2].', 'Highlight that `id()` changed for `int` but not for `list`.', 'Explain: `+=` on mutable types calls `__iadd__` (in-place add); on immutable types it does `x = x + y` (new object.', 'Have them complete a table: Operation | Type | Mutates?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_010', difficulty: 'standard',
          question: 'Operators in Python are special symbols or keywords that perform specific.',
          hint: 'If stuck, revisit `c11_ip_cbse_02_008` (Data Types) to confirm you can distinguish `int`.',
          misconception: 'Students believe that `and` and `or` return only `True` or `False`.',
          parts: [
                { id: 'a', prompt: 'Explain why the expression `5 > 3 > 4` evaluates to `False` in Python, whereas in mathematics the chained inequality `5 > 3 > 4` would be considered.', answer: 'In Python, chained comparisons are evaluated as `5 > 3 and 3 > 4`',
                  options: ['In Python, chained comparisons are evaluated as `5 > 3 and 3 > 4`', '`and` and `or` return only `True` or `False`'],
                  hint: 'If stuck, revisit `c11_ip_cbse_02_008` (Data Types) to confirm you can distinguish `int`, `float`.',
                  misconception: 'Students believe that `and` and `or` return only `True` or `False`.' },
                { id: 'b', prompt: 'Given `x = 10`, `y = 3`, evaluate the expression: `not (x // y > 2) and (x % y == 1 or y ** 2 > x)`. Show each step.', answer: 'Step 1: `x // y` → `10 // 3` = `3`',
                  options: ['Step 1: `x // y` → `10 // 3` = `3`', '`and` and `or` return only `True` or `False`'],
                  hint: 'If stuck, revisit `c11_ip_cbse_02_008` (Data Types) to confirm you can distinguish `int`, `float`.',
                  misconception: 'Students believe that `and` and `or` return only `True` or `False`.' }
          ],
            remediations: { 'and-and-or-return-only': { steps: ['Show the student the REPL interaction: `>>> 0 or 5` → `5`; `>>> 7 and 0` → `0`; `>>> [] or "default"` → `"default"`.', 'Explain that `and` returns the first falsy operand or the last operand; `or` returns the first truthy operand or the.', 'Have them trace `x = 10; y = 0; z = x and y` and predict `z` (it\'s `0`, not `False`).', 'Give practice: rewrite `if a != 0: result = a else: result = b` using `or` (answer: `result = a or b` only works if `a`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_011', difficulty: 'standard',
          question: 'Type conversion in Python is the process of changing a value from one data type.',
          hint: 'Revisit c11_ip_cbse_02_008 (Data Types) and c11_ip_cbse_02_007 (Input/Output) to practice.',
          misconception: 'Students believe `int(3.9)` rounds to `4` because they confuse truncation with rounding.',
          parts: [
                { id: 'a', prompt: 'What is the data type of the expression `10 + 3.14` in Python, and why does Python choose that type?', answer: 'The data type is `float`',
                  options: ['The data type is `float`', 'Python either truncates the decimal or treats numbers as strings', '`int(3'],
                  hint: 'Revisit c11_ip_cbse_02_008 (Data Types) and c11_ip_cbse_02_007 (Input/Output) to practice `type()`.',
                  misconception: 'Students believe `int(3.9)` rounds to `4` because they confuse truncation with rounding.' },
                { id: 'b', prompt: 'Explain why `print("Age: " + 25)` raises a `TypeError`, but `print("Age: " + str(25))` works. What is the fundamental rule about implicit conversion to `str`?', answer: 'Python never implicitly converts non-string types to `str` during concatenation',
                  options: ['Python never implicitly converts non-string types to `str` during concatenation', 'Python converts numbers to strings automatically', '`int(3'],
                  hint: 'Revisit c11_ip_cbse_02_008 (Data Types) and c11_ip_cbse_02_007 (Input/Output) to practice `type()`.',
                  misconception: 'Students believe `int(3.9)` rounds to `4` because they confuse truncation with rounding.' },
                { id: 'c', prompt: 'Given `x = "100"` and `y = 50`, write a single expression that evaluates to the integer `150` using explicit conversion. Show the steps.', answer: '`int(x) + y` → `int("100")` gives `100` (int), then `100 + 50` gives `150` (int)',
                  options: ['`int(x) + y` → `int("100")` gives `100` (int), then `100 + 50` gives `150` (int)', '`int(3'],
                  hint: 'Revisit c11_ip_cbse_02_008 (Data Types) and c11_ip_cbse_02_007 (Input/Output) to practice `type()`.',
                  misconception: 'Students believe `int(3.9)` rounds to `4` because they confuse truncation with rounding.' }
          ],
            remediations: { 'int-3': { steps: ['Have the student type `int(3.9)`, `int(-3.9)`, `round(3.9)`, `round(-3.9)` in IDLE and record outputs in a table.', 'Ask them to articulate the pattern: "int() always chops off the decimal part, moving toward zero." 3.', 'For string concatenation, make them run `print("a" + 1)` and `print("a" + str(1))` side by side, then write the rule.', 'Give three practice snippets where they must insert the correct explicit conversion to fix a TypeError.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_012', difficulty: 'standard',
          question: 'In Python, errors are classified into four categories: **Syntax Errors** occur.',
          hint: 'Revisit c11_ip_cbse_02_011 (Type Conversion) and practice converting input strings.',
          misconception: '**Misconception:** "If my program runs without any red error message, it is correct." **Why students make this error:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In Python, errors are classified into four categories: **Syntax Errors** occur when code',
                  options: ['In Python, errors are classified into four categories: **Syntax Errors** occur when code', 'Python is a high-level, interpreted, general-purpose programming language characterized', 'Python installation is the process of downloading the Python interpreter from python.org,', 'Python provides two distinct execution modes: Interactive Mode executes single statements'],
                  hint: 'Revisit c11_ip_cbse_02_011 (Type Conversion) and practice converting input strings to numbers.',
                  misconception: '**Misconception:** "If my program runs without any red error message, it is correct." **Why students make this error:** In earlier classes.' }
          ],
            remediations: { 'misconception-if-my-program-runs': { steps: ['**Step-by-step remediation:** 1.', '**Show the disconnect:** Run two programs side-by-side – one with a syntax error (crashes immediately) and one with.', 'Ask: "Which one is more dangerous?', '**Trace table exercise:** Give the logical-error program (e.g., `average = mark1 + mark2 + mark3 / 3`) and a test case.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
