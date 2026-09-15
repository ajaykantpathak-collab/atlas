import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch02_p1: SimDef = {
    id: 'v3_c11_ip_ch02_p1',
    title: 'Getting Started with Python · Part 1/2',
    subtitle: 'Get from installer checkbox to running code without the usual potholes.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Getting Started with Python · Part 1/2',
    chapters: ['c11_ip_ch02'],
    nodeIds: ['c11_ip_cbse_02_001', 'c11_ip_cbse_02_002', 'c11_ip_cbse_02_003', 'c11_ip_cbse_02_004', 'c11_ip_cbse_02_005', 'c11_ip_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time Python user making the install actually work', intro: 'One unchecked box at install — \'Add Python to PATH\' — decides whether the command line knows your language exists.', goal: 'Explain Python\'s interpreted, portable, dynamic design and set up a working environment.' },
    discovery: {
        question: 'A script written on a Windows laptop runs unmodified on the lab\'s Linux machines. Which Python feature made that trip possible?',
        options: ['Cross-platform portability — each OS has its own interpreter, and modules like os.path abstract the differences', 'Compiled binaries — Windows secretly built a Linux version', 'The code avoided all operating-system calls', 'Luck — it just happened to work'],
        answer: 'Cross-platform portability — each OS has its own interpreter, and modules like os.path abstract the differences',
        hook: '\'Interpreted means too slow for real work\' — tell that to NumPy and TensorFlow, whose heavy lifting is C under a Python hood.',
    },
    teaching: [
        { title: 'Introduction to Python and its Key Features', text: 'Python is a high-level, interpreted, general-purpose programming language characterized by dynamic typing, automatic memory management, and a design philosophy that emphasizes code readability.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Install Python with \'Add to PATH\' ticked, verify with python --version, and judge when IDLE is enough and when a real IDE is owed.',
        labels: ['Introduction to Python', 'Python Installation and Using', 'Execution Modes: Interactive Mode', 'Python Character Set, Tokens', 'Keywords and Identifiers', 'Variables, Assignment Statement'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_001', title: 'Introduction to Python and its Key Features',
          caseStudy: { intro: 'Imagine you want to build a tool that can quickly process your school\'s attendance data stored in CSV files, run on both your Windows laptop and the lab\'s.',
            decisions: [{ prompt: 'What is the primary reason Python is called an "interpreted language"?', options: [
                { text: 'Correct answer: Python source code is executed line by line by an interpreter at runtime,', outcome: 'Correct answer: Python source code is executed line by line by an interpreter at runtime, without.' },
                { text: 'Python is compiled to bytecode', outcome: 'Not quite — Students often believe "Python is slow because it\'s interpreted, so it\'s not used for serious.', reveals: 'python-is-slow-because-it' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_002', title: 'Python Installation and Using the IDLE Editor',
          caseStudy: { intro: 'Imagine you want to write a Python program that calculates the final price of a smartphone after applying 18% GST and a ₹2000 festival discount — but when you.',
            decisions: [{ prompt: 'What does IDLE stand for, and which two distinct windows does it provide when launched?', options: [
                { text: 'IDLE stands for **Integrated Development and Learning Environment**', outcome: 'IDLE stands for **Integrated Development and Learning Environment**.' },
                { text: 'IDLE is just a text editor', outcome: 'Not quite — **Misconception:** *"Installing Python automatically means IDLE works, and the Shell window.', reveals: 'misconception-installing-python-automatically-me' },
                { text: 'it only has one window', outcome: 'Not quite — **Misconception:** *"Installing Python automatically means IDLE works, and the Shell window.', reveals: 'misconception-installing-python-automatically-me' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_003', title: 'Execution Modes: Interactive Mode and Script Mode',
          caseStudy: { intro: 'Imagine you want to quickly check what `2 ** 10` evaluates to — you\'d type it in a calculator and get the answer instantly.',
            decisions: [{ prompt: 'What is the primary visual indicator that you are in Interactive Mode in IDLE?', options: [
                { text: 'The `>>>` prompt (three greater-than signs) indicates Interactive Mode', outcome: 'The `>>>` prompt (three greater-than signs) indicates Interactive Mode.' },
                { text: 'a blank window', outcome: 'Not quite — Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code.', reveals: 'interactive-mode-and-script-mode' },
                { text: 'a .py file tab', outcome: 'Not quite — Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code.', reveals: 'interactive-mode-and-script-mode' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_005', title: 'Keywords and Identifiers in Python',
          caseStudy: { intro: 'Imagine you are writing a Python program to calculate the total cost of items in a shopping cart. You need to name a variable to store the price of an apple.',
            decisions: [{ prompt: 'List any five Python keywords and state whether `True`, `False`, and `None` are keywords or identifiers.', options: [
                { text: 'Five Python keywords: `if`, `else`, `for`, `while`, `def`', outcome: 'Five Python keywords: `if`, `else`, `for`, `while`, `def`. `True`, `False`, and `None` are keywords.' },
                { text: '`print` or `input` as keywords, or saying `True` is an identifier', outcome: 'Not quite — Students often believe that Python keywords are case-insensitive, so they think `For`, `IF`.', reveals: 'python-keywords-are-case-insensitive' },
                { text: '`For`, `IF`, `While` are also keywords and cannot be used as identifiers', outcome: 'Not quite — Students often believe that Python keywords are case-insensitive, so they think `For`, `IF`.', reveals: 'python-keywords-are-case-insensitive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend building her first Python program spent 30 minutes typing a 20-line GST calculator into IDLE\'s Shell, closed the window, and lost everything. She concludes: \'Python doesn\'t save work, and anyway it\'s too slow for serious applications.\'',
            decisions: [{ prompt: 'What two misunderstandings need untangling?', options: [
                { text: 'Separate Shell from Editor: the `>>>` Shell is a transient REPL for exploring — closing it discards everything; multi-line programs go in the Editor (File → New File), saved as .py, run with F5. And \'interpreted = too slow\' is wrong: performance-critical libraries like NumPy are C-backed, JIT options exist, and `sum()` beats a hand-written loop by orders of magnitude — developer productivity is often the real metric.', outcome: 'She rebuilds in the Editor, saves her work, and stops judging the language by a raw loop benchmark.' },
                { text: 'Sympathise and move on — if the Shell loses code, Python is just badly designed.', outcome: 'The Shell is a scratchpad by design, not a defect: the Editor window is a separate process that persists files to disk.', reveals: 'shell-is-where-you-write-programs' },
                { text: 'Agree on speed — interpreted languages can\'t do serious data work.', outcome: 'Interpretation isn\'t the bottleneck it seems: vectorised C-backed libraries and JIT interpreters make Python the standard tool of data science.', reveals: 'interpreted-means-too-slow' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'The interpreter runs your lines the moment you write them — no compile step, no excuses between idea and output.',
            decisions: [{ prompt: 'What comes next? Getting Started with Python · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Getting Started with Python · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_001', difficulty: 'standard',
          question: 'Python is a high-level, interpreted, general-purpose programming language.',
          hint: 'If stuck, revisit Class 7 Algebra (c7_math_ch04_001 to c7_math_ch04_004) to strengthen.',
          misconception: 'Students often believe "Python is slow because it\'s interpreted, so it\'s not used for serious applications." This error.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Python is a high-level, interpreted, general-purpose programming language characterized',
                  options: ['Python is a high-level, interpreted, general-purpose programming language characterized', 'Python installation is the process of downloading the Python interpreter from python.org,', 'Python provides two distinct execution modes: Interactive Mode executes single statements', 'Python\'s character set defines the valid Unicode characters (letters, digits, symbols,'],
                  hint: 'If stuck, revisit Class 7 Algebra (c7_math_ch04_001 to c7_math_ch04_004) to strengthen variable.',
                  misconception: 'Students often believe "Python is slow because it\'s interpreted, so it\'s not used for serious applications." This error arises from.' }
          ],
            remediations: { 'python-is-slow-because-it': { steps: ['Show the student a side-by-side comparison: a pure Python loop summing 10⁷ numbers vs.', '`numpy.arange(10**7).sum()`.', 'Explain that the "slow" label applies only to certain coding patterns, not the language itself.', 'Have them read a case study (e.g., Instagram\'s Django backend handling millions of requests) to see Python.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_002', difficulty: 'standard',
          question: 'Python installation is the process of downloading the Python interpreter from.',
          hint: 'If stuck on variable assignment logic, revisit **c7_math_ch05_001 (Equations: Balance.',
          misconception: '**Misconception:** *"Installing Python automatically means IDLE works, and the Shell window is where I write.',
          parts: [
                { id: 'a', prompt: 'What does IDLE stand for, and which two distinct windows does it provide when launched?', answer: 'IDLE stands for **Integrated Development and Learning Environment**',
                  options: ['IDLE stands for **Integrated Development and Learning Environment**', 'IDLE is just a text editor', 'it only has one window', 'zero-config success'],
                  hint: 'If stuck on variable assignment logic, revisit **c7_math_ch05_001 (Equations: Balance Model)** and.',
                  misconception: '**Misconception:** *"Installing Python automatically means IDLE works, and the Shell window is where I write my programs."* **Why.' },
                { id: 'b', prompt: 'During Python installation on Windows, the checkbox "Add Python to PATH" appears.', answer: '"Add Python to PATH" appends the Python installation directory (e.g.,',
                  options: ['"Add Python to PATH" appends the Python installation directory (e.g.,', 'it makes Python faster', 'it installs IDLE', 'make it work'],
                  hint: 'If stuck on variable assignment logic, revisit **c7_math_ch05_001 (Equations: Balance Model)** and.',
                  misconception: '**Misconception:** *"Installing Python automatically means IDLE works, and the Shell window is where I write my programs."* **Why.' }
          ],
            remediations: { 'misconception-installing-python-automatically-me': { steps: ['**Immediately demonstrate the loss:** Have the student open IDLE Shell, type `x = 42`, close IDLE, reopen, type.', 'Say: *"The Shell forgets everything on close.', 'That\'s by design — it\'s for experiments, not programs."* 2.', '**Side-by-side comparison:** Open Editor (File → New File), type same `x = 42`, save as `demo.py` on Desktop, close.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** *"Installing Python automatically means IDLE works, and the Shell window is where I write.',
          parts: [
                { id: 'a', prompt: 'Design a **step-by-step verification checklist** (8-10 steps) that a Class 11 student can hand to a friend to prove their Python + IDLE installation is fully.', answer: '**Checklist:** 1',
                  options: ['**Checklist:** 1', 'zero-config success'],
                  hint: 'If stuck on variable assignment logic, revisit **c7_math_ch05_001 (Equations: Balance Model)** and.',
                  misconception: '**Misconception:** *"Installing Python automatically means IDLE works, and the Shell window is where I write my programs."* **Why.' }
          ],
            remediations: { 'misconception-installing-python-automatically-me': { steps: ['**Immediately demonstrate the loss:** Have the student open IDLE Shell, type `x = 42`, close IDLE, reopen, type.', 'Say: *"The Shell forgets everything on close.', 'That\'s by design — it\'s for experiments, not programs."* 2.', '**Side-by-side comparison:** Open Editor (File → New File), type same `x = 42`, save as `demo.py` on Desktop, close.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_003', difficulty: 'standard',
          question: 'Python provides two distinct execution modes: Interactive Mode executes single.',
          hint: 'Revisit "Python Installation and Using the IDLE Editor" (c11_ip_cbse_02_002) and practice.',
          misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can.',
          parts: [
                { id: 'a', prompt: 'What is the primary visual indicator that you are in Interactive Mode in IDLE?', answer: 'The `>>>` prompt (three greater-than signs) indicates Interactive Mode',
                  options: ['The `>>>` prompt (three greater-than signs) indicates Interactive Mode', 'a blank window', 'a .py file tab', 'two windows in IDLE'],
                  hint: 'Revisit "Python Installation and Using the IDLE Editor" (c11_ip_cbse_02_002) and practice opening.',
                  misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can be directly copied to the.' },
                { id: 'b', prompt: 'You need to test the behavior of `list.append()` vs `list.extend()` with a nested list.', answer: 'Choose Interactive Mode for quick testing',
                  options: ['Choose Interactive Mode for quick testing', 'two windows in IDLE'],
                  hint: 'Revisit "Python Installation and Using the IDLE Editor" (c11_ip_cbse_02_002) and practice opening.',
                  misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can be directly copied to the.' },
                { id: 'c', prompt: 'Compare the persistence of variables between Interactive Mode and Script Mode.', answer: 'Interactive Mode: `NameError`',
                  options: ['Interactive Mode: `NameError`', 'two windows in IDLE'],
                  hint: 'Revisit "Python Installation and Using the IDLE Editor" (c11_ip_cbse_02_002) and practice opening.',
                  misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can be directly copied to the.' }
          ],
            remediations: { 'interactive-mode-and-script-mode': { steps: ['Have the student open IDLE and explicitly point out the two separate windows: "Shell" (with `>>>`) and "Untitled".', 'In Shell, type `if True:` and press Enter — show the `...` continuation prompt, then type `print("hi")` and press Enter.', 'Then type `else:` — show `SyntaxError` because the `if` block already closed.', 'In editor, write the same `if-else` block correctly indented, save, run — show it works.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_004', difficulty: 'standard',
          question: 'Python\'s character set defines the valid Unicode characters (letters, digits.',
          hint: 'Revisit c11_ip_cbse_02_003 (Execution Modes) and practice writing a 5-line script with.',
          misconception: 'Students often believe that any consistent number of spaces works for indentation, but they overlook that Python treats.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the following code raises a TabError: ```python if True: print("tab") print("spaces") ```', answer: 'The first indented line uses a tab character (`\\t`) while the second uses spaces',
                  options: ['The first indented line uses a tab character (`\\t`) while the second uses spaces', 'indentation is wrong'],
                  hint: 'Revisit c11_ip_cbse_02_003 (Execution Modes) and practice writing a 5-line script with a loop.',
                  misconception: 'Students often believe that any consistent number of spaces works for indentation, but they overlook that Python treats a tab as 8 columns.' },
                { id: 'b', prompt: 'Compare the following two snippets and state which one will execute without IndentationError, and why.', answer: 'Snippet B executes correctly',
                  options: ['Snippet B executes correctly', 'any indentation works as long as it\'s non-zero, missing the consistency rule'],
                  hint: 'Revisit c11_ip_cbse_02_003 (Execution Modes) and practice writing a 5-line script with a loop.',
                  misconception: 'Students often believe that any consistent number of spaces works for indentation, but they overlook that Python treats a tab as 8 columns.' }
          ],
            remediations: { 'any-consistent-number-of-spaces': { steps: ['Show the student the exact byte representation using `cat -A` or `repr()` to make tabs (`^I`) and spaces visible.', 'Have them configure their editor to "show whitespace" and convert tabs to 4 spaces.', 'Practice writing three nested blocks (if → for → if) using only spaces, then deliberately insert a tab to see the.', 'Reinforce that comments are ignored by the tokenizer — they are not part of the token stream.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_005', difficulty: 'standard',
          question: 'Keywords are reserved words in Python that have a predefined meaning and cannot.',
          hint: 'If stuck, revisit c11_ip_cbse_02_004 (Python Character Set, Tokens and Indentation Rules).',
          misconception: 'Students often believe that Python keywords are case-insensitive, so they think `For`, `IF`, `While` are also keywords.',
          parts: [
                { id: 'a', prompt: 'List any five Python keywords and state whether `True`, `False`, and `None` are keywords or identifiers.', answer: 'Five Python keywords: `if`, `else`, `for`, `while`, `def`',
                  options: ['Five Python keywords: `if`, `else`, `for`, `while`, `def`', '`print` or `input` as keywords, or saying `True` is an identifier', '`For`, `IF`, `While` are also keywords and cannot be used as identifiers'],
                  hint: 'If stuck, revisit c11_ip_cbse_02_004 (Python Character Set, Tokens and Indentation Rules) and.',
                  misconception: 'Students often believe that Python keywords are case-insensitive, so they think `For`, `IF`, `While` are also keywords and cannot be used.' },
                { id: 'b', prompt: 'Explain in your own words why `2total` is an invalid identifier but `total2` is valid. Also, why is `for` not allowed as a variable name while `For` is allowed?', answer: '`2total` is invalid',
                  options: ['`2total` is invalid', 'keywords are case-insensitive (e', '`For` is also a keyword)', '`For`, `IF`, `While` are also keywords and cannot be used as identifiers'],
                  hint: 'If stuck, revisit c11_ip_cbse_02_004 (Python Character Set, Tokens and Indentation Rules) and.',
                  misconception: 'Students often believe that Python keywords are case-insensitive, so they think `For`, `IF`, `While` are also keywords and cannot be used.' },
                { id: 'c', prompt: 'A student wants to write a program to compute the area of a rectangle.', answer: 'Valid identifiers: `length`, `breadth`, `area`, `side_1` (follow all rules)',
                  options: ['Valid identifiers: `length`, `breadth`, `area`, `side_1` (follow all rules)', '`For`, `IF`, `While` are also keywords and cannot be used as identifiers'],
                  hint: 'If stuck, revisit c11_ip_cbse_02_004 (Python Character Set, Tokens and Indentation Rules) and.',
                  misconception: 'Students often believe that Python keywords are case-insensitive, so they think `For`, `IF`, `While` are also keywords and cannot be used.' },
                { id: 'd', prompt: 'Compare and contrast the rules for identifiers in Python with the rules for variable names in algebra (e.g., in a mathematical expression like `2x + 3y = 12`).', answer: 'Similarities: Both use letters to represent values',
                  options: ['Similarities: Both use letters to represent values', '`For`, `IF`, `While` are also keywords and cannot be used as identifiers'],
                  hint: 'If stuck, revisit c11_ip_cbse_02_004 (Python Character Set, Tokens and Indentation Rules) and.',
                  misconception: 'Students often believe that Python keywords are case-insensitive, so they think `For`, `IF`, `While` are also keywords and cannot be used.' }
          ],
            remediations: { 'python-keywords-are-case-insensitive': { steps: ['Show the student the official keyword list via `import keyword; print(keyword.kwlist)` in the Python shell.', 'Ask them to test `For = 10` and `for = 10` in interactive mode — the first works, the second raises SyntaxError.', 'Have them write a rule card: "Keywords are exactly as listed — case matters.', 'Only the exact spelling is reserved." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_006', difficulty: 'standard',
          question: 'A variable in Python is a named reference to an object stored in memory;.',
          hint: 'If confused about reference vs value, revisit the "sticky note vs box" analogy and trace.',
          misconception: 'Students treat variables as labelled boxes that *contain* values (container metaphor).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A variable in Python is a named reference to an object stored in memory',
                  options: ['A variable in Python is a named reference to an object stored in memory', 'Python is a high-level, interpreted, general-purpose programming language characterized', 'Python installation is the process of downloading the Python interpreter from python.org,', 'Python provides two distinct execution modes: Interactive Mode executes single statements'],
                  hint: 'If confused about reference vs value, revisit the "sticky note vs box" analogy and trace memory.',
                  misconception: 'Students treat variables as labelled boxes that *contain* values (container metaphor).' }
          ],
            remediations: { 'students-treat-variables-as-labelled': { steps: ['Draw two diagrams side by side: (a) Box with `5` inside, label `x` on box.', '(b) Sticky note `x` stuck on a separate `5` object.', 'Show `y = x`: in (a) draw a second box with `5`; in (b) draw a second sticky note `y` on the *same* `5` object.', 'Show `x = 7`: in (a) erase `5` write `7` in first box; in (b) move sticky note `x` to a new `7` object, `y` stays.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
