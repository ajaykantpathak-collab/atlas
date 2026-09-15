import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch04_p1: SimDef = {
    id: 'v3_c11_cs_ch04_p1',
    title: 'Getting Started with Python · Part 1/3',
    subtitle: 'Get Python running, know shell from editor, and see why interpreted means instant feedback.',
    classLevel: 11, subject: 'computer_science', topic: 'Getting Started with Python · Part 1/3',
    chapters: ['c11_cs_ch04'],
    nodeIds: ['c11_cs_cbse_04_001', 'c11_cs_cbse_04_002', 'c11_cs_cbse_04_003', 'c11_cs_cbse_04_004', 'c11_cs_cbse_04_005', 'c11_cs_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developer setting up a first Python workspace', intro: 'The installer finished, but `python` \'is not recognized.\' Diagnose the machine before writing a line.', goal: 'Set up Python and IDLE, distinguish the interactive shell from script mode, and run a first program.' },
    discovery: {
        question: 'A student types a 20-line program into the >>> shell, closes the window and loses everything. What did they confuse?',
        options: ['The interactive shell, which runs lines and forgets them, with the editor that saves scripts', 'Python with the operating system\'s notepad', 'The interpreter with the compiler — the code needed compiling first', 'Save with run — F5 saves files automatically'],
        answer: 'The interactive shell, which runs lines and forgets them, with the editor that saves scripts',
        hook: 'The >>> prompt is a conversation, not a document — scripts live in files, and files need saving.',
    },
    teaching: [
        { title: 'Introduction to Python and its Features', text: 'Python is a high-level, interpreted, general-purpose programming language known for its readability, dynamic typing, and extensive standard library, supporting multiple programming paradigms.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Install Python, recover from a forgotten \'Add to PATH\' checkbox, then write and run a cost.py script from IDLE\'s editor.',
        labels: ['Introduction to Python', 'Python Installation and IDLE', 'Execution Modes: Interactive', 'Python Character Set', 'Keywords and Identifiers', 'Comments in Python: Single'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_001', title: 'Introduction to Python and its Features',
          caseStudy: { intro: 'Start by asking: "Why do we use Python for solving problems like calculating GST on a restaurant bill or analyzing cricket scores?" Relate to the.',
            decisions: [{ prompt: 'What is the primary characteristic that distinguishes an interpreted language like Python from a compiled language like C++?', options: [
                { text: 'An interpreted language executes code line by line at runtime without a separate', outcome: 'An interpreted language executes code line by line at runtime without a separate compilation step.' },
                { text: 'Python is faster', outcome: 'Not quite — Students often believe Python is "just a scripting language" and not suitable for large.', reveals: 'python-is-just-a-scripting' },
                { text: 'just a scripting language', outcome: 'Not quite — Students often believe Python is "just a scripting language" and not suitable for large.', reveals: 'python-is-just-a-scripting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_002', title: 'Python Installation and IDLE',
          caseStudy: { intro: 'Imagine you want to write your first Python program to calculate the total cost of buying 5 notebooks at ₹40 each.',
            decisions: [{ prompt: 'What is the purpose of checking the "Add Python to PATH" option during installation on Windows?', options: [
                { text: 'The "Add Python to PATH" option adds the Python executable directory to the system\'s PATH', outcome: 'The "Add Python to PATH" option adds the Python executable directory to the system\'s PATH.' },
                { text: 'it installs IDLE', outcome: 'Not quite — Students often think that installing Python automatically creates a desktop shortcut for IDLE and.', reveals: 'installing-python-automatically-creates-a' },
                { text: 'it creates a shortcut', outcome: 'Not quite — Students often think that installing Python automatically creates a desktop shortcut for IDLE and.', reveals: 'installing-python-automatically-creates-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_003', title: 'Execution Modes: Interactive and Script Mode',
          caseStudy: { intro: 'Imagine you want to quickly check the value of `2 ** 10` — you open IDLE, type the expression at the `>>>` prompt, and get the answer instantly.',
            decisions: [{ prompt: 'What is the primary visual indicator that you are in Python\'s interactive mode inside IDLE?', options: [
                { text: 'The primary visual indicator is the `>>>` prompt (three greater-than signs) displayed in', outcome: 'The primary visual indicator is the `>>>` prompt (three greater-than signs) displayed in the IDLE.' },
                { text: 'a blank file window', outcome: 'Not quite — Students often think that code typed in the IDLE Shell (interactive mode) is automatically saved.', reveals: 'code-typed-in-the-idle' },
                { text: 'a `.py` extension', outcome: 'Not quite — Students often think that code typed in the IDLE Shell (interactive mode) is automatically saved.', reveals: 'code-typed-in-the-idle' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_004', title: 'Python Character Set and Tokens',
          caseStudy: { intro: 'Imagine you\'re writing a secret code language where only certain symbols are allowed and words must follow strict formation rules.',
            decisions: [{ prompt: 'What are the five categories of tokens in Python, and give one example of each?', options: [
                { text: 'The five token categories are: (1) Keywords - reserved words like `if`, `else`', outcome: 'The five token categories are: (1) Keywords - reserved words like `if`, `else`; (2) Identifiers.' },
                { text: 'variables', outcome: 'Not quite — Students often confuse "character set" with "tokens", thinking each character is a token.', reveals: 'students-often-confuse-character-set' },
                { text: 'character set', outcome: 'Not quite — Students often confuse "character set" with "tokens", thinking each character is a token.', reveals: 'students-often-confuse-character-set' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_005', title: 'Keywords and Identifiers in Python',
          caseStudy: { intro: 'Imagine you are saving a contact in your phone: you cannot name two contacts "Mom" and "mom" as separate entries if the phone is case-insensitive, but Python.',
            decisions: [{ prompt: 'List all Python keywords that begin with the letter \'f\' or \'w\' and state the total number of keywords in Python 3.10.', options: [
                { text: 'The keywords starting with \'f\' are: `False`, `finally`, `for`, `from`', outcome: 'The keywords starting with \'f\' are: `False`, `finally`, `for`, `from`.' },
                { text: '**capitalising a keyword makes it a valid identifier** (e', outcome: 'Not quite — Students believe that **capitalising a keyword makes it a valid identifier** (e.g., `If = 5`, `For.', reveals: 'capitalising-a-keyword-makes-it' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_006', title: 'Comments in Python: Single and Multi-line',
          caseStudy: { intro: 'Imagine you are writing a Python program to calculate the total cost of ingredients for a Diwali sweet recipe (ladoo) — you have variables for flour (₹40/kg).',
            decisions: [{ prompt: 'What is the exact symbol used to start a single-line comment in Python, and what happens to the text following that symbol on the same line.', options: [
                { text: 'The symbol is `#` (hash)', outcome: 'The symbol is `#` (hash). Everything from `#` to the end of that physical line is ignored by the.' },
                { text: 'it prints as text', outcome: 'Not quite — Students believe that triple-quoted strings (`\'\'\' ... \'\'\'` or `""" ...', reveals: 'triple-quoted-strings' },
                { text: 'comments are string literals', outcome: 'Not quite — Students believe that triple-quoted strings (`\'\'\' ... \'\'\'` or `""" ...', reveals: 'triple-quoted-strings' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate who\'s written JavaScript pastes this into a Python program for the school fest registration app: `fee = \'200\' + 50` and expects `250`. Python throws a TypeError. He complains: \'Python is dynamically typed, so it should just figure out the types — this proves Python is weak and broken.\'',
            decisions: [{ prompt: 'What does the TypeError actually demonstrate?', options: [
                { text: 'Dynamic typing ≠ weak typing: Python lets a variable change type without declaration (x=5 then x=\'hi\' is legal), but it is strongly typed — it refuses silent coercion between str and int, so \'200\'+50 errors instead of guessing \'20050\' or 250. Fix explicitly: int(\'200\')+50.', outcome: 'Python\'s \'dynamic\' refers to when types bind to names, not whether types convert silently; strong typing catches the bug JavaScript would hide.' },
                { text: 'He\'s right — a dynamically typed language should coerce types automatically; the TypeError is Python failing.', outcome: 'Automatic coercion is weak typing, not dynamic typing; Python deliberately errors rather than silently corrupting data.', reveals: 'dynamic-means-weak-typing' },
                { text: 'The error proves Python is a toy scripting language not meant for real apps.', outcome: 'The same strictness guards Instagram-scale codebases; type errors surface bugs early — a feature, not a limitation.', reveals: 'python-is-just-scripting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Python trades raw speed for speed of thought — you can fix and re-run a line faster than most languages compile.',
            decisions: [{ prompt: 'What comes next? Getting Started with Python · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Getting Started with Python · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_001', difficulty: 'standard',
          question: 'Python is a high-level, interpreted, general-purpose programming language known.',
          hint: 'Revisit algebraic expressions and substitution (Class 7 Math: c7_math_ch04_001 and.',
          misconception: 'Students often believe Python is "just a scripting language" and not suitable for large applications, or they think.',
          parts: [
                { id: 'a', prompt: 'What is the primary characteristic that distinguishes an interpreted language like Python from a compiled language like C++?', answer: 'An interpreted language executes code line by line at runtime without a separate',
                  options: ['An interpreted language executes code line by line at runtime without a separate', 'Python is faster', 'just a scripting language', 'interpreted'],
                  hint: 'Revisit algebraic expressions and substitution (Class 7 Math: c7_math_ch04_001 and.',
                  misconception: 'Students often believe Python is "just a scripting language" and not suitable for large applications, or they think "interpreted" means.' },
                { id: 'b', prompt: 'A student writes a Python script to calculate the area of a circle. They run it and get an error.', answer: 'Python\'s interpreted nature allows immediate execution after editing',
                  options: ['Python\'s interpreted nature allows immediate execution after editing', 'dynamic typing', 'just a scripting language', 'interpreted'],
                  hint: 'Revisit algebraic expressions and substitution (Class 7 Math: c7_math_ch04_001 and.',
                  misconception: 'Students often believe Python is "just a scripting language" and not suitable for large applications, or they think "interpreted" means.' }
          ],
            remediations: { 'python-is-just-a-scripting': { steps: ['Show a 2-line Python snippet that changes a variable\'s type and ask the student to predict the output, then run it.', 'Contrast with a C snippet requiring recompilation after a type change, highlighting the interpreted difference.', 'Use the analogy of "Python as a translator who reads line by line" vs.', '"C as a compiler who translates the whole book first" to cement the interpreted concept.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Python is "just a scripting language" and not suitable for large applications, or they think.',
          parts: [
                { id: 'a', prompt: 'Design a simple Python program that showcases at least three distinct features of Python (e.g., dynamic typing, interpreted execution, high-level data.', answer: 'Example: ```python',
                  options: ['Example: ```python', 'just a scripting language', 'interpreted', 'slow for everything'],
                  hint: 'Revisit algebraic expressions and substitution (Class 7 Math: c7_math_ch04_001 and.',
                  misconception: 'Students often believe Python is "just a scripting language" and not suitable for large applications, or they think "interpreted" means.' }
          ],
            remediations: { 'python-is-just-a-scripting': { steps: ['Show a 2-line Python snippet that changes a variable\'s type and ask the student to predict the output, then run it.', 'Contrast with a C snippet requiring recompilation after a type change, highlighting the interpreted difference.', 'Use the analogy of "Python as a translator who reads line by line" vs.', '"C as a compiler who translates the whole book first" to cement the interpreted concept.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_002', difficulty: 'standard',
          question: 'Python Installation and IDLE refers to the process of downloading, installing.',
          hint: 'If stuck, review how to download and install software on your operating system.',
          misconception: 'Students often think that installing Python automatically creates a desktop shortcut for IDLE and that the Shell window.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Python Installation and IDLE refers to the process of downloading, installing, and',
                  options: ['Python Installation and IDLE refers to the process of downloading, installing, and', 'Python is a high-level, interpreted, general-purpose programming language known for its', 'Python provides two distinct execution modes: **Interactive Mode** (REPL -', 'The Python character set is the collection of all valid characters (letters A-Z, a-z,'],
                  hint: 'If stuck, review how to download and install software on your operating system.',
                  misconception: 'Students often think that installing Python automatically creates a desktop shortcut for IDLE and that the Shell window is where you write.' }
          ],
            remediations: { 'installing-python-automatically-creates-a': { steps: ['If a student confuses Shell and Editor, do this: 1) Close IDLE.', '2) Reopen IDLE – note the Shell window with `>>>`.', '3) Press Ctrl+N to open a new Editor window (untitled).', '4) Type `print("Hello")` in the Editor, press Ctrl+S, save as `hello.py`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_003', difficulty: 'standard',
          question: 'Python provides two distinct execution modes: **Interactive Mode** (REPL.',
          hint: 'If stuck, revisit the algebraic idea of a variable (Class 6 Math: Variables and.',
          misconception: 'Students often think that code typed in the IDLE Shell (interactive mode) is automatically saved like a document.',
          parts: [
                { id: 'a', prompt: 'Explain why a variable defined in one interactive session is not available in a new interactive session after closing and reopening IDLE.', answer: 'Interactive mode stores variables only in the current session\'s memory (RAM)',
                  options: ['Interactive mode stores variables only in the current session\'s memory (RAM)', 'variables are saved in the `.py` file', 'interactive mode persists data like script mode does'],
                  hint: 'If stuck, revisit the algebraic idea of a variable (Class 6 Math: Variables and Constants) and.',
                  misconception: 'Students often think that code typed in the IDLE Shell (interactive mode) is automatically saved like a document.' },
                { id: 'b', prompt: 'You have written a 15-line program to compute the average of numbers entered by the user.', answer: 'Use script mode',
                  options: ['Use script mode', 'type all lines at the `>>>` prompt'],
                  hint: 'If stuck, revisit the algebraic idea of a variable (Class 6 Math: Variables and Constants) and.',
                  misconception: 'Students often think that code typed in the IDLE Shell (interactive mode) is automatically saved like a document.' }
          ],
            remediations: { 'code-typed-in-the-idle': { steps: ['If a student exhibits this misconception: (1) Open IDLE and show the Shell window — point out the absence of a "Save".', '(2) Type `x = 10`, close IDLE, reopen it, and ask the student to print `x` — they will get a `NameError`.', '(3) Immediately open a New File, type the same line, save as `demo.py`, run it, close IDLE, reopen, run `demo.py`.', '(4) Explicitly state: "The Shell is for experiments; the Editor is for permanent programs."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_004', difficulty: 'standard',
          question: 'The Python character set is the collection of all valid characters (letters.',
          hint: 'Review the concept of "alphabet" and "words" in formal language theory from Class 9 Math.',
          misconception: 'Students often confuse "character set" with "tokens", thinking each character is a token.',
          parts: [
                { id: 'a', prompt: 'What are the five categories of tokens in Python, and give one example of each?', answer: 'The five token categories are: (1) Keywords - reserved words like `if`, `else`',
                  options: ['The five token categories are: (1) Keywords - reserved words like `if`, `else`', 'variables', 'character set', 'tokens'],
                  hint: 'Review the concept of "alphabet" and "words" in formal language theory from Class 9 Math.',
                  misconception: 'Students often confuse "character set" with "tokens", thinking each character is a token.' },
                { id: 'b', prompt: 'Explain why `2total = 100` is an invalid Python statement in terms of token formation rules, even though all individual characters belong to the Python.', answer: 'The sequence `2total` is scanned as a single token during lexical analysis',
                  options: ['The sequence `2total` is scanned as a single token during lexical analysis', 'variable naming rules', 'token formation rules', 'character set'],
                  hint: 'Review the concept of "alphabet" and "words" in formal language theory from Class 9 Math.',
                  misconception: 'Students often confuse "character set" with "tokens", thinking each character is a token.' },
                { id: 'c', prompt: 'Compare and contrast how the Python lexical analyzer treats `# This is a comment` versus `"# This is not a comment"` in terms of token production.', answer: 'In `# This is a comment`, the `#` token signals the start of a comment',
                  options: ['In `# This is a comment`, the `#` token signals the start of a comment', 'character set', 'tokens'],
                  hint: 'Review the concept of "alphabet" and "words" in formal language theory from Class 9 Math.',
                  misconception: 'Students often confuse "character set" with "tokens", thinking each character is a token.' }
          ],
            remediations: { 'students-often-confuse-character-set': { steps: ['Show the student a line of code and physically cover it, revealing one character at a time.', 'Ask: "At what point does this become a meaningful unit?" Demonstrate that `t` `o` `t` `a` `l` individually are.', 'Use a highlighter to color-code each token category in a printed code snippet (keywords=blue, identifiers=green, etc.).', 'Have them run `import tokenize; tokenize.generate_tokens(...)` on a simple file to see actual token stream output.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_005', difficulty: 'standard',
          question: 'Keywords are reserved words in Python that have predefined meanings and.',
          hint: 'If stuck, revisit **c7_math_ch04_001 (Introduction to Letter-Numbers: Variables.',
          misconception: 'Students believe that **capitalising a keyword makes it a valid identifier** (e.g., `If = 5`, `For = 10`, `Class.',
          parts: [
                { id: 'a', prompt: 'List all Python keywords that begin with the letter \'f\' or \'w\' and state the total number of keywords in Python 3.10.', answer: 'The keywords starting with \'f\' are: `False`, `finally`, `for`, `from`',
                  options: ['The keywords starting with \'f\' are: `False`, `finally`, `for`, `from`', '**capitalising a keyword makes it a valid identifier** (e'],
                  hint: 'If stuck, revisit **c7_math_ch04_001 (Introduction to Letter-Numbers: Variables in Algebra)** and.',
                  misconception: 'Students believe that **capitalising a keyword makes it a valid identifier** (e.g., `If = 5`, `For = 10`, `Class = "XI"`).' },
                { id: 'b', prompt: 'Compare the identifiers `TotalMarks`, `totalMarks`, `total_marks`, and `TOTAL_MARKS`.', answer: '- `total_marks` → snake_case: PEP 8 standard for **variables and functions**',
                  options: ['- `total_marks` → snake_case: PEP 8 standard for **variables and functions**', '`totalMarks` is preferred for variables', '**capitalising a keyword makes it a valid identifier** (e'],
                  hint: 'If stuck, revisit **c7_math_ch04_001 (Introduction to Letter-Numbers: Variables in Algebra)** and.',
                  misconception: 'Students believe that **capitalising a keyword makes it a valid identifier** (e.g., `If = 5`, `For = 10`, `Class = "XI"`).' }
          ],
            remediations: { 'capitalising-a-keyword-makes-it': { steps: ['Show the student `keyword.kwlist` and `dir(__builtins__)` side-by-side in IDLE — highlight that `If`, `For`, `Class`.', 'Write two code snippets: one with `if = 10` (SyntaxError) and one with `If = 10` (runs).', 'Ask: "Why does the second run but make the teacher deduct marks?" 3.', 'Demonstrate a bug: `If = 5; if If > 0: print("positive")` — the condition uses `If` (variable) but looks like keyword.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_006', difficulty: 'standard',
          question: 'Comments in Python are non-executable annotations in the source code that begin.',
          hint: 'If confused about comment syntax, revisit c11_cs_cbse_04_003 (Execution Modes) and.',
          misconception: 'Students believe that triple-quoted strings (`\'\'\' ... \'\'\'` or `""" ...',
          parts: [
                { id: 'a', prompt: 'What is the exact symbol used to start a single-line comment in Python, and what happens to the text following that symbol on the same line during program.', answer: 'The symbol is `#` (hash)',
                  options: ['The symbol is `#` (hash)', 'it prints as text', 'comments are string literals', 'triple-quoted strings (`\'\'\''],
                  hint: 'If confused about comment syntax, revisit c11_cs_cbse_04_003 (Execution Modes) and practice typing.',
                  misconception: 'Students believe that triple-quoted strings (`\'\'\' ... \'\'\'` or `""" ...' },
                { id: 'b', prompt: 'A student writes the following three lines in a Python script and runs it. Explain what will happen and why: ```', answer: 'The program will output `Hello` only',
                  options: ['The program will output `Hello` only', 'syntax error on line 3', 'prints the triple-quoted text', 'triple-quoted strings (`\'\'\''],
                  hint: 'If confused about comment syntax, revisit c11_cs_cbse_04_003 (Execution Modes) and practice typing.',
                  misconception: 'Students believe that triple-quoted strings (`\'\'\' ... \'\'\'` or `""" ...' }
          ],
            remediations: { 'triple-quoted-strings': { steps: ['**Clarify the mechanism**: Open IDLE, type `import dis; dis.dis("""comment""")` and `dis.dis("# comment")` — show that.', '**Demonstrate memory effect**: Write a loop that runs 10⁶ times with a triple-quoted "comment" inside vs.', '`#` comments; use `tracemalloc` to show memory allocation difference.', '**Enforce rule**: "If it\'s not assigned to a variable or used as a docstring (first statement.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
