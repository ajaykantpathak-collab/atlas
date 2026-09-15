import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch04_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch04_p3: SimDef = {
    id: 'v3_c11_cs_ch04_p3',
    title: 'Getting Started with Python · Part 3/3',
    subtitle: 'Get Python running, know shell from editor, and see why interpreted means instant feedback.',
    classLevel: 11, subject: 'computer_science', topic: 'Getting Started with Python · Part 3/3',
    chapters: ['c11_cs_ch04'],
    nodeIds: ['c11_cs_cbse_04_013', 'c11_cs_cbse_04_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developer setting up a first Python workspace', intro: 'The installer finished, but `python` \'is not recognized.\' Diagnose the machine before writing a line.', goal: 'Set up Python and IDLE, distinguish the interactive shell from script mode, and run a first program.' },
    discovery: {
        question: 'A student types a 20-line program into the >>> shell, closes the window and loses everything. What did they confuse?',
        options: ['The interactive shell, which runs lines and forgets them, with the editor that saves scripts', 'Python with the operating system\'s notepad', 'The interpreter with the compiler — the code needed compiling first', 'Save with run — F5 saves files automatically'],
        answer: 'The interactive shell, which runs lines and forgets them, with the editor that saves scripts',
        hook: 'The >>> prompt is a conversation, not a document — scripts live in files, and files need saving.',
    },
    teaching: [
        { title: 'Errors in Python: Syntax, Runtime and Logical', text: 'In Python, errors are classified into three categories: **Syntax errors** occur when code violates Python\'s grammatical rules and prevent the program from running; **Runtime errors** (exceptions).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Install Python, recover from a forgotten \'Add to PATH\' checkbox, then write and run a cost.py script from IDLE\'s editor.',
        labels: ['Errors in Python: Syntax,', 'Debugging Techniques in Python'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_013', title: 'Errors in Python: Syntax, Runtime and Logical',
          caseStudy: { intro: 'Imagine you\'re writing a program to calculate your monthly savings: you type `savings = income - expenses` but accidentally write `savings = income - expense`.',
            decisions: [{ prompt: 'What is the fundamental difference between a syntax error and a runtime error in terms of when Python detects them?', options: [
                { text: 'A syntax error is detected during the parsing phase **before** any code executes', outcome: 'A syntax error is detected during the parsing phase **before** any code executes — Python reads the.' },
                { text: 'error detection time', outcome: 'Not quite — Students believe **"if the program runs without a red error message, it is correct."** They equate.', reveals: 'if-the-program-runs-without' },
                { text: 'error severity', outcome: 'Not quite — Students believe **"if the program runs without a red error message, it is correct."** They equate.', reveals: 'if-the-program-runs-without' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_014', title: 'Debugging Techniques in Python',
          caseStudy: { intro: 'Imagine you wrote a program to calculate the total bill with GST for a restaurant order, but the output shows ₹0.00 tax for a ₹500 meal.',
            decisions: [{ prompt: 'What information does a Python traceback provide, and in what order are the function calls listed?', options: [
                { text: 'A traceback shows the error type (e.g., ZeroDivisionError), error message, and the call', outcome: 'A traceback shows the error type (e.g., ZeroDivisionError), error message, and the call stack.' },
                { text: 'top to bottom', outcome: 'Not quite — **Misconception:** "Debugging means adding print statements until it works." **Why it\'s wrong:**.', reveals: 'misconception-debugging-means-adding-print' },
                { text: 'only the error line', outcome: 'Not quite — **Misconception:** "Debugging means adding print statements until it works." **Why it\'s wrong:**.', reveals: 'misconception-debugging-means-adding-print' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate who\'s written JavaScript pastes this into a Python program for the school fest registration app: `fee = \'200\' + 50` and expects `250`. Python throws a TypeError. He complains: \'Python is dynamically typed, so it should just figure out the types — this proves Python is weak and broken.\'',
            decisions: [{ prompt: 'What does the TypeError actually demonstrate?', options: [
                { text: 'Dynamic typing ≠ weak typing: Python lets a variable change type without declaration (x=5 then x=\'hi\' is legal), but it is strongly typed — it refuses silent coercion between str and int, so \'200\'+50 errors instead of guessing \'20050\' or 250. Fix explicitly: int(\'200\')+50.', outcome: 'Python\'s \'dynamic\' refers to when types bind to names, not whether types convert silently; strong typing catches the bug JavaScript would hide.' },
                { text: 'He\'s right — a dynamically typed language should coerce types automatically; the TypeError is Python failing.', outcome: 'Automatic coercion is weak typing, not dynamic typing; Python deliberately errors rather than silently corrupting data.', reveals: 'dynamic-means-weak-typing' },
                { text: 'The error proves Python is a toy scripting language not meant for real apps.', outcome: 'The same strictness guards Instagram-scale codebases; type errors surface bugs early — a feature, not a limitation.', reveals: 'python-is-just-scripting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_04_014', title: 'You made it',
          caseStudy: { intro: 'Python trades raw speed for speed of thought — you can fix and re-run a line faster than most languages compile.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_013', difficulty: 'standard',
          question: 'In Python, errors are classified into three categories: **Syntax errors** occur.',
          hint: 'Revisit operator precedence table (c11_cs_cbse_04_011) and practice evaluating 10 complex.',
          misconception: 'Students believe **"if the program runs without a red error message, it is correct."** They equate "no crash" with.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between a syntax error and a runtime error in terms of when Python detects them?', answer: 'A syntax error is detected during the parsing phase **before** any code executes',
                  options: ['A syntax error is detected during the parsing phase **before** any code executes', 'error detection time', 'error severity', 'if the program runs without a red error message, it is correct'],
                  hint: 'Revisit operator precedence table (c11_cs_cbse_04_011) and practice evaluating 10 complex.',
                  misconception: 'Students believe **"if the program runs without a red error message, it is correct."** They equate "no crash" with "correct output." For.' },
                { id: 'b', prompt: 'A student writes `for i in range(5)` (missing colon) and gets `SyntaxError: expected \':\'`.', answer: 'Python\'s interpreter works in two phases: **parsing** (checking grammar) then',
                  options: ['Python\'s interpreter works in two phases: **parsing** (checking grammar) then', 'runs until the error line', 'if the program runs without a red error message, it is correct', 'no crash'],
                  hint: 'Revisit operator precedence table (c11_cs_cbse_04_011) and practice evaluating 10 complex.',
                  misconception: 'Students believe **"if the program runs without a red error message, it is correct."** They equate "no crash" with "correct output." For.' },
                { id: 'c', prompt: 'Given this code snippet, identify the error type and the exact line causing it: ```python principal = float(input("Enter principal: ")) rate.', answer: '**Runtime error**',
                  options: ['**Runtime error**', 'if the program runs without a red error message, it is correct', 'no crash', 'correct output'],
                  hint: 'Revisit operator precedence table (c11_cs_cbse_04_011) and practice evaluating 10 complex.',
                  misconception: 'Students believe **"if the program runs without a red error message, it is correct."** They equate "no crash" with "correct output." For.' }
          ],
            remediations: { 'if-the-program-runs-without': { steps: ['**Force verification habit**: Give the student a 5-line program with a logical error (e.g., wrong operator precedence).', 'Ask: "What should the output be for input X?', '**Trace table exercise**: Have them manually execute each line with sample values, writing variable states in a table.', '**Connect to math**: Show how `a + b * c` vs `(a + b) * c` differs in algebra (c7_math_ch04_006) — the same precedence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"if the program runs without a red error message, it is correct."** They equate "no crash" with.',
          parts: [
                { id: 'a', prompt: 'A programmer argues: "Logical errors are the most dangerous because they don\'t crash the program." Evaluate this claim with a real-world example where.', answer: '**Claim is valid.** A runtime error (e.g., `ZeroDivisionError` during interest',
                  options: ['**Claim is valid.** A runtime error (e.g., `ZeroDivisionError` during interest', 'if the program runs without a red error message, it is correct', 'no crash', 'correct output'],
                  hint: 'Revisit operator precedence table (c11_cs_cbse_04_011) and practice evaluating 10 complex.',
                  misconception: 'Students believe **"if the program runs without a red error message, it is correct."** They equate "no crash" with "correct output." For.' }
          ],
            remediations: { 'if-the-program-runs-without': { steps: ['**Force verification habit**: Give the student a 5-line program with a logical error (e.g., wrong operator precedence).', 'Ask: "What should the output be for input X?', '**Trace table exercise**: Have them manually execute each line with sample values, writing variable states in a table.', '**Connect to math**: Show how `a + b * c` vs `(a + b) * c` differs in algebra (c7_math_ch04_006) — the same precedence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_04_014', difficulty: 'standard',
          question: 'Debugging is the systematic process of identifying, isolating, and correcting.',
          hint: 'Revisit c11_cs_cbse_04_013 (Errors in Python) and practice classifying 10 sample error.',
          misconception: '**Misconception:** "Debugging means adding print statements until it works." **Why it\'s wrong:** This treats debugging.',
          parts: [
                { id: 'a', prompt: 'A student writes `for i in range(5): print(i); print("Done")` and sees `0 1 2 3 4 Done` but expected `Done` to print after each number.', answer: 'The loop works correctly',
                  options: ['The loop works correctly', 'range(5) is wrong'],
                  hint: 'Revisit c11_cs_cbse_04_013 (Errors in Python) and practice classifying 10 sample error messages.',
                  misconception: '**Misconception:** "Debugging means adding print statements until it works." **Why it\'s wrong:** This treats debugging as trial-and-error.' }
          ],
            remediations: { 'misconception-debugging-means-adding-print': { steps: ['**Re-teach traceback reading:** Give a 3-function call stack traceback.', 'Ask: "Which function *caused* the error?', 'Which *called* it?" Have them label each frame.', '**Model strategic print placement:** Show a 10-line function with a logical error.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
